// @description RC06 Dashboard & Reporting: permission-trimmed live view of open obligations with statutory and internal due, countdown, priority colour (Red overdue or <=1 day, Amber <=3 days or at risk, Green on track), status and owner. Views: all, my_items, overdue, due_this_week, awaiting_approval.
// @effect read_only
// @in user:string "Viewing user id"
// @in view:string "all, my_items, overdue, due_this_week, awaiting_approval"
// @out count rows
const u = R.users[input.user]; if (!u) return { count: 0, rows: "Unknown user." };
const days = o => Math.round((new Date(o.due) - new Date(R.today)) / 864e5);
let list = R.obligations.filter(o => !o.restricted || u.groups.indexOf(o.group) >= 0);
const v = input.view || "all";
if (v === "my_items") list = list.filter(o => o.owner === input.user);
if (v === "overdue") list = list.filter(o => days(o) < 0);
if (v === "due_this_week") list = list.filter(o => days(o) >= 0 && days(o) <= 7);
if (v === "awaiting_approval") list = list.filter(o => /C5/.test(o.status));
const col = o => days(o) <= 1 ? "Red" : (days(o) <= 3 || R.today > o.internal_due) ? "Amber" : "Green";
return { count: list.length, rows: list.map(o => o.id + " | " + o.action + " | owner " + R.users[o.owner].name + " | statutory " + longDate(o.due) + " | internal " + longDate(o.internal_due) + " | " + (days(o) < 0 ? Math.abs(days(o)) + " days overdue" : days(o) + " days left") + " | " + col(o) + " | " + o.status).join(" || ") || "No items in this view." };
