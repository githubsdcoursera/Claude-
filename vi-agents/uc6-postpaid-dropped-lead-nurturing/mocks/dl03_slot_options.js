// @description UC6-DL03 Blocker Resolver: the missed doorstep visit and the next two available KYC visit slots for the lead's address.
// @effect read_only
// @in msisdn:string "10-digit mobile number of the lead"
// @out found missed_slot slot_1 slot_2
const c = customer(input.msisdn);
const l = c && c.uc6;
if (!l || !l.slots) return { found: false, missed_slot: "", slot_1: "", slot_2: "" };
return { found: true, missed_slot: l.missed_slot || "", slot_1: l.slots[0], slot_2: l.slots[1] };
