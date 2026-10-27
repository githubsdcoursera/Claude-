// Route https.request calls that bypass agents (e.g. `ws`) through the HTTPS_PROXY via CONNECT.
const http = require('node:http');
const https = require('node:https');
const tls = require('node:tls');

const proxy = new URL(process.env.HTTPS_PROXY || process.env.https_proxy);
const noProxy = (process.env.NO_PROXY || process.env.no_proxy || '').split(',').map(s => s.trim()).filter(Boolean);
const bypass = host => noProxy.some(p => host === p || (p.startsWith('.') && host.endsWith(p)) || (p.startsWith('*.') && host.endsWith(p.slice(1))));

class ConnectAgent extends https.Agent {
  createConnection(options, cb) {
    const host = options.host || options.hostname;
    const port = options.port || 443;
    const req = http.request({ host: proxy.hostname, port: proxy.port, method: 'CONNECT', path: `${host}:${port}`, headers: { host: `${host}:${port}` } });
    req.on('connect', (res, socket) => {
      if (res.statusCode !== 200) { socket.destroy(); return cb(new Error(`Proxy CONNECT to ${host}:${port} failed: ${res.statusCode}`)); }
      const tlsSocket = tls.connect({ ...options, socket, servername: options.servername || host });
      tlsSocket.once('secureConnect', () => cb(null, tlsSocket));
      tlsSocket.once('error', cb);
    });
    req.on('error', cb);
    req.end();
  }
}
const agent = new ConnectAgent({ keepAlive: false });

const origRequest = https.request;
https.request = function (options, ...rest) {
  if (options && typeof options === 'object' && !(options instanceof URL) && !options.agent) {
    const host = options.host || options.hostname;
    if (host && !bypass(host)) options = { ...options, agent };
  }
  return origRequest.call(this, options, ...rest);
};
