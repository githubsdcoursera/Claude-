// @description RC04 Deadline Tracker & Escalator: apply the escalation ladder to every open obligation as of a date (50% elapsed reminder, internal due -2 working days CX2, internal due passed to manager, statutory -1 working day to Head, statutory passed CX3 with Head + CAIO report). Never extends a deadline.
// @effect side_effect
// @in as_of:string "Date YYYY-MM-DD"
// @out count actions
const d = String(input.as_of || R.today); const acts = [];
R.obligations.forEach(o => {
  if (/C7|C8|C6/.test(o.status)) return;
  const name = u => R.users[u].name;
  const total = (new Date(o.due) - new Date(o.assigned)) / 864e5, gone = (new Date(d) - new Date(o.assigned)) / 864e5;
  if (d > o.due) acts.push(o.id + ": statutory due " + longDate(o.due) + " passed: CX3 Overdue; escalated to Head, Regulatory and the CAIO governance report; reason to be recorded");
  else if (d >= minusWorking(o.due, 1)) acts.push(o.id + ": statutory due " + longDate(o.due) + " is within 1 working day and not approved: escalated to Head, Regulatory; red on dashboard");
  else if (d > o.internal_due) acts.push(o.id + ": internal due " + longDate(o.internal_due) + " passed: escalated to reporting manager " + name(R.users[o.owner].manager));
  else if (d >= minusWorking(o.internal_due, 2) && !/C4/.test(o.status)) acts.push(o.id + ": internal due " + longDate(o.internal_due) + " is within 2 working days and the item is not in progress: CX2 Deadline at risk; reminder to " + name(o.owner) + " and " + name(o.deputy));
  else if (gone >= total / 2 && o.last_update <= o.assigned) acts.push(o.id + ": 50% of time elapsed with no status update: reminder to " + name(o.owner));
});
return { count: acts.length, actions: acts.join(". ") || "No escalations due." };
