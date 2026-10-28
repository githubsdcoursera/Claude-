"""Add an uploaded-document path to a FLOW agent.

The platform gives uploaded files only to the model, so scripted steps never see them. This inserts:
  u0 audit -> u1 model review -> u2 router (follow-up, Word download, new command, done)
  u3 model follow-up, u4 model writes the Word content to session fields -> u5 doc_docx -> u6 FILE reply
and routes the parser's "uploaded" intent to it. Re-running replaces a block inserted earlier.

Usage: python3 add_upload_path.py <agent.abl> <spec.json>
spec: {prefix, intent (default "uploaded"), audit_tool, disposition, review_goal, followup_goal, doc_goal, doc_footer, exit_regex,
       insert_before (step name), parse_step (step whose ON_RESULT gets the route), parse_var (e.g. req)}
"""
import json
import re
import sys

def markers(prefix):
    return (f"  # ---- BEGIN generated document path '{prefix}' (build/add_upload_path.py) ----",
            f"  # ---- END generated document path '{prefix}' ----")


def indent(text, n):
    return "\n".join((" " * n + ln) if ln.strip() else "" for ln in text.strip("\n").split("\n"))


def block(sp):
    p = sp["prefix"]
    BEGIN, END = markers(p)
    mime = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    return f"""{BEGIN}
  {p}0_audit:
    REASONING: false
    CALL: {sp['audit_tool']}
      WITH:
        user: user
        disposition: "{sp['disposition']}"
        object: "uploaded document"
        detail: "{sp.get('audit_detail', 'Model review of an uploaded or pasted document')}"
      AS: audit
    THEN: {p}1_review

  {p}1_review:
    REASONING: true
    GOAL: |
{indent(sp['review_goal'], 6)}
      End by offering: follow-up questions on this document, or say Word to download it as a .docx.
    STEP_CONSTRAINTS:
{indent(chr(10).join('- "' + c + '"' for c in sp['constraints']), 6)}
    MAX_TURNS: 2
    THEN: {p}2_route

  # The zone hands over on the user's next message: follow-ups stay with the document, Word builds a
  # .docx, a new command goes back to the parser
  {p}2_route:
    REASONING: false
    ON_INPUT:
      - IF: input matches "^[^a-z]*(done|exit|thanks|thank you|that's all|thats all)([^a-z]|$)"
        THEN: s9_end
      - IF: input matches "(word|docx|download|as a file|document file)"
        SET: followup = input
        THEN: {p}4_doc_prepare
      - IF: input matches "{sp['exit_regex']}"
        SET: request = input
        THEN: {sp['parse_step']}
      - ELSE:
        SET: followup = input
        THEN: {p}3_followup

  {p}3_followup:
    REASONING: true
    GOAL: |
      The user is following up on the document they uploaded or pasted earlier in this conversation and your
      earlier answer. Their message: "{{{{followup}}}}".
{indent(sp['followup_goal'], 6)}
      End by asking whether anything else is needed on this document, or say Word to download it.
    STEP_CONSTRAINTS:
{indent(chr(10).join('- "' + c + '"' for c in sp['constraints']), 6)}
    MAX_TURNS: 2
    THEN: {p}2_route

  {p}4_doc_prepare:
    REASONING: true
    GOAL: |
      The user wants a downloadable Word document ("{{{{followup}}}}"). Do not write it in your reply. Set these session
      fields in a single update:
      doc_title: a short title.
      doc_md: the full document body in simple markdown: # and ## headings, plain paragraphs, - bullets, and tables
      as | col | col | rows with a header row. Use real line breaks.
{indent(sp['doc_goal'], 6)}
      Then reply with one short sentence: "Preparing the Word document."
    AVAILABLE_TOOLS: [{sp['audit_tool']}]
    CONTEXT_UPDATES: [doc_title, doc_md]
    STEP_CONSTRAINTS:
{indent(chr(10).join('- "' + c + '"' for c in sp['constraints']), 6)}
    EXIT_WHEN: always
    MAX_TURNS: 4
    THEN: {p}5_doc_build

  {p}5_doc_build:
    REASONING: false
    CALL: doc_docx
      WITH:
        title: doc_title
        markdown: doc_md
        footer_note: "{sp['doc_footer']}"
      AS: udoc
    ON_RESULT:
      - IF: udoc.output.ok == true
        THEN: {p}6_doc_ready
      - ELSE:
        THEN: {p}7_doc_failed

  {p}6_doc_ready:
    REASONING: false
    RESPOND: "{{{{udoc.output.message}}}} It is an AI draft for review; nothing has been sent. Anything else on this document, or a new request?"
      FORMATS:
        FILE:
          url: "{{{{udoc.output.url}}}}"
          filename: "{{{{udoc.output.filename}}}}"
          mime_type: "{mime}"
    THEN: {p}2_route

  {p}7_doc_failed:
    REASONING: false
    RESPOND: "I couldn't build the Word document this time. Ask for Word again, or I can answer in the chat."
    THEN: {p}2_route

{END}
"""


def main():
    path, spec = sys.argv[1], json.load(open(sys.argv[2]))
    s = open(path).read()
    BEGIN, END = markers(spec["prefix"])
    if BEGIN in s:
        s = s[:s.index(BEGIN)] + s[s.index(END) + len(END) + 1:].lstrip("\n")
    p, v = spec["prefix"], spec["parse_var"]
    # memory
    for var in ("followup", "doc_title", "doc_md", "udoc"):
        if not re.search(rf"^\s+- {var}\s*$", s, re.M):
            s = re.sub(r"(MEMORY:\n  session:\n)", rf"\1    - {var}\n", s, count=1)
    # initial values in s0_start
    m = re.search(r"(  s0_start:\n    REASONING: false\n    SET:\n)", s)
    if "doc_md = \"none\"" not in s:
        s = s[:m.end()] + '      doc_title = "none"\n      doc_md = "none"\n' + s[m.end():]
    # route the parser intent
    route = f'      - IF: {v}.output.intent == "{spec.get("intent", "uploaded")}"\n        THEN: {p}0_audit\n'
    if f"THEN: {p}0_audit" not in s:
        ps = s.index(f"  {spec['parse_step']}:\n")
        el = s.index("      - ELSE:\n", ps)
        s = s[:el] + route + s[el:]
    # doc_docx tool
    s = re.sub(r"(#include-tools: [^\n]*?)(, doc_docx)?\n", lambda mm: mm[1] + ", doc_docx\n", s, count=1)
    ins = s.index(f"  {spec['insert_before']}:\n")
    s = s[:ins] + block(spec) + "\n" + s[ins:]
    open(path, "w").write(s)
    print("ok", path)


if __name__ == "__main__":
    main()
