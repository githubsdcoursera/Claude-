// Keeps one arch-mcp-tools server alive; POST {"name","arguments"} to http://127.0.0.1:7777/call
import { spawn } from 'node:child_process';
import http from 'node:http';
const dir = new URL('.', import.meta.url).pathname;
const env = { ...process.env, AGENTS_URL: 'https://ind-agents.kore.ai', NODE_USE_ENV_PROXY: '1',
  NODE_OPTIONS: `--require ${dir}proxy-preload.cjs --no-warnings` };
const p = spawn('npx', ['-y', '@koreai/arch-mcp-tools'], { env, stdio: ['pipe', 'pipe', 'inherit'] });
let buf = '', id = 0; const pending = {};
p.stdout.on('data', d => { buf += d; let i; while ((i = buf.indexOf('\n')) >= 0) { const line = buf.slice(0, i); buf = buf.slice(i + 1);
  try { const m = JSON.parse(line); if (m.id && pending[m.id]) { pending[m.id](m); delete pending[m.id]; } } catch {} } });
p.on('exit', c => { console.error(`[bridge] server exited ${c}`); process.exit(1); });
const rpc = (method, params) => new Promise(r => { const i = ++id; pending[i] = r; p.stdin.write(JSON.stringify({ jsonrpc: '2.0', id: i, method, params }) + '\n'); });
await rpc('initialize', { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'bridge', version: '1' } });
p.stdin.write(JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) + '\n');
http.createServer(async (req, res) => {
  let body = ''; for await (const c of req) body += c;
  res.setHeader('content-type', 'application/json');
  try {
    const { name, arguments: args } = JSON.parse(body || '{}');
    const out = name === 'list' ? await rpc('tools/list', {}) : await rpc('tools/call', { name, arguments: args || {} });
    res.end(JSON.stringify(out));
  } catch (e) { res.statusCode = 400; res.end(JSON.stringify({ error: String(e.message || e) })); }
}).listen(7777, '127.0.0.1', () => console.error('[bridge] ready on 127.0.0.1:7777'));
