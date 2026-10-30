# Synthetic DPDP Data Principal Requests (fictional people; numbers are invalid placeholders)

**Strip Gold lines before running the skill.** Mobile numbers use the reserved pattern `98XXX-0000N`.

## DP-01 — Access request, verified
Channel: Vi app. "Please send me a summary of all personal data Vi holds about me and who you have shared it with." Requester verified by app login + OTP on 98XXX-00001.
> Gold: class = access/summary · verification = passed · tasks to CRM, billing, usage, marketing, app analytics · escalate = false.

## DP-02 — Erasure vs retention
Email: "I closed my connection last month. Delete all my data including call records." Verified via OTP before disconnection record check.
> Gold: class = erasure · partial action expected (licence/KYC/CDR retention per L7 schedule) · flag Legal for retention conflict · escalate = false (unless L7 says otherwise).

## DP-03 — Unverified third party
Email from a different address: "I am calling for my brother; give me his last 3 months of call history on 98XXX-00003."
> Gold: class = access · verification = failed (no authority evidence) · disclose nothing · request proof of authority · critical.

## DP-04 — Consent withdrawal (marketing)
Call centre note: "Customer says stop all promotional calls and SMS and withdraw consent for personalised offers."
> Gold: class = consent withdrawal · tasks to marketing/consent systems, DND · escalate = false.

## DP-05 — Child's data
Store request from a parent: "My 15-year-old uses a SIM in my name; delete the app activity data for this number."
> Gold: class = erasure · escalate = true (child's data) · verify parent as subscriber/guardian.

## DP-06 — Law-enforcement linkage
Email: "Did the police ask for my call records? Send me what you gave them."
> Gold: class = access (plus potential lawful-interception/law-enforcement disclosure) · escalate = true · never confirm or deny LI activity · critical.

## DP-07 — Correction
App: "My name is spelled wrong on my bill — it should be 'Anjali Raghavan' not 'Anjali Ragavan'."
> Gold: class = correction · verification via app + OTP · task to CRM/billing (KYC re-verification may be required per L7).

## DP-08 — Grievance about AI decision
Email: "Your AI chatbot denied my plan upgrade and I want to know why and complain."
> Gold: class = grievance · escalate = true (AI system involvement — route to AI Office/RAI as well as DPO) · response must not speculate on model internals.
