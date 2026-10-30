"""ABL step builders for documents: read the user's uploaded file, and hand back a generated file.

The platform stores uploads with the session and does not give them to FLOW reasoning steps, so the agent
reads them with the built-in attachment tools (list_attachments, get_attachment) and passes the extracted
text to the model in its GOAL. Generated files are saved to the session with upload_attachment and handed
back as a download link from get_attachment_url (the FILE card does not interpolate its url, reply text does).
"""

DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

ATTACH_TOOLS = """  list_attachments(limit?: number, offset?: number) -> object
    description: "List the files the user shared in this conversation, oldest first."
    effect: read_only
    confirm: never
    params:
      limit:
        description: "Maximum number of files to return"
      offset:
        description: "Number of files to skip"
  get_attachment(attachment_id: string) -> object
    description: "Read one shared file; returns its extracted text in content."
    effect: read_only
    confirm: never
    params:
      attachment_id:
        description: "File id from list_attachments"
  upload_attachment(filename: string, content_base64: string, mime_type: string) -> object
    description: "Save a generated file to this conversation so the user can download it."
    effect: side_effect
    confirm: never
    params:
      filename:
        description: "File name, e.g. report.docx"
      content_base64:
        description: "File content, base64-encoded"
      mime_type:
        description: "File type"
  get_attachment_url(attachment_id: string, expires_in_seconds?: number) -> object
    description: "Short-lived download link for one file in this conversation."
    effect: read_only
    confirm: never
    params:
      attachment_id:
        description: "File id"
      expires_in_seconds:
        description: "Link lifetime in seconds, up to 86400"
"""

MEMORY_VARS = ["files", "lastf", "last_offset", "att_id", "got", "doc_text", "doc_name", "upf", "dl_id", "lnk"]

DOC_GOAL_TEXT = """Text extracted from the most recently uploaded file ({{doc_name}}):
<<<
{{doc_text}}
>>>
If that text is "none", the user did not upload a file in this conversation: use any document text pasted in
their message instead. If it is "UNREADABLE", the platform could not extract the file's text: say so and ask the
user to paste the text or upload a text-based PDF or Word file. If there is no document text at all, say so in
one sentence. Never describe, summarise or review a document you cannot see."""


def fetch_chain(p, nxt):
    """Steps {p}f1..{p}f4: read the newest uploaded file into doc_text / doc_name, then go to nxt."""
    return f"""  {p}f1_list:
    REASONING: false
    CALL: list_attachments
      AS: files
    ON_RESULT:
      - IF: files.total > 0
        SET: last_offset = ADD(files.total, -1)
        THEN: {p}f2_last
      - ELSE:
        THEN: {nxt}

  {p}f2_last:
    REASONING: false
    CALL: list_attachments
      WITH:
        limit: 1
        offset: last_offset
      AS: lastf
    THEN: {p}f3_pick

  {p}f3_pick:
    REASONING: false
    SET:
      att_id = lastf.attachments[0].id
      doc_name = lastf.attachments[0].filename
    THEN: {p}f4_get

  {p}f4_get:
    REASONING: false
    CALL: get_attachment
      WITH:
        attachment_id: att_id
      AS: got
    ON_RESULT:
      - IF: got.processingStatus == "completed"
        SET: doc_text = got.content
        THEN: {nxt}
      - ELSE:
        SET: doc_text = "UNREADABLE"
        THEN: {nxt}
"""


def download_chain(p, gen, ready_text, after, failed):
    """Steps {p}d1..{p}d4: save the generated file (gen.output.b64) to the session and reply with its link."""
    return f"""  {p}d1_upload:
    REASONING: false
    CALL: upload_attachment
      WITH:
        filename: {gen}.output.filename
        content_base64: {gen}.output.b64
        mime_type: "{DOCX}"
      AS: upf
    ON_RESULT:
      - IF: upf.success == true
        SET: dl_id = upf.data.attachmentId
        THEN: {p}d2_link
      - ELSE:
        THEN: {failed}

  {p}d2_link:
    REASONING: false
    CALL: get_attachment_url
      WITH:
        attachment_id: dl_id
        expires_in_seconds: 3600
      AS: lnk
    ON_RESULT:
      - IF: lnk.success == true
        THEN: {p}d3_ready
      - ELSE:
        THEN: {failed}

  {p}d3_ready:
    REASONING: false
    RESPOND: "{{{{{gen}.output.message}}}} [Download {{{{{gen}.output.filename}}}}]({{{{lnk.data.url}}}}) (the link works for about an hour; the file also stays in this conversation's files). {ready_text}"
    THEN: {after}
"""


def add_memory(s, names):
    import re
    for var in names:
        if not re.search(rf"^\s+- {var}\s*$", s, re.M):
            s = re.sub(r"(MEMORY:\n  session:\n)", rf"\1    - {var}\n", s, count=1)
    return s


def add_attach_tools(s):
    if "  list_attachments(" in s:
        return s
    i = s.index("\nTOOLS:\n") + len("\nTOOLS:\n")
    return s[:i] + ATTACH_TOOLS + s[i:]


def init_doc_vars(s):
    import re
    if 'doc_text = "none"' in s:
        return s
    m = re.search(r"(  s0[a-z_]*:\n    REASONING: false\n    SET:\n)", s)
    return s[:m.end()] + '      doc_text = "none"\n      doc_name = "none"\n' + s[m.end():]
