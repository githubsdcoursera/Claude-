// @description A31 EB Bill Validation: look up which sites use an electricity consumer number; a number used by more than one site is reported so its EB lines are held for verification.
// @effect read_only
// @in consumer_no?:string "EB consumer number, e.g. CONS-SYN-00014, or empty to use the site's"
// @in site_id:string "Site id, or none"
// @out consumer sites reused finding
const s = /^none$/i.test(String(input.site_id || "")) ? "" : normSite(input.site_id);
const c = String(input.consumer_no || "").toUpperCase() || (T.sites[s] ? T.sites[s].consumer : "");
const sites = Object.keys(T.sites).filter(k => T.sites[k].consumer === c);
const reused = sites.length > 1;
return { consumer: c, sites: sites.join(" and "), reused: reused,
  finding: reused ? "EB consumer number " + c + " is mapped to " + sites.length + " sites (" + sites.join(" and ") + "). EB lines on this consumer are held for verification and are not auto-approved." : (c ? "EB consumer number " + c + " maps only to " + (sites[0] || "no site") + "." : "") };
