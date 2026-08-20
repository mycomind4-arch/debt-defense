# Execution Decision

Status: CATALOG / ARCHITECTURE DECISION

Do not build a parallel dispute engine yet.

## Intended workflow

Collection notice → secure ingest → extract claims/account facts → provenance → validation/evidence → dispute strategy → draft → validation → human review → authorized mailing → tracking → proof.

## Ownership

- Dispute Mail owns generic dispute correspondence and evidence workflow primitives.
- MailMyPDF Platform owns document, provenance, workflow, validation, fulfillment, tracking, and proof infrastructure.
- Debt Defense owns debt-collection-specific taxonomy, claim extraction, validation-request patterns, and debt-specific drafting requirements.

## Gate

First prove that Debt Defense adds materially distinct domain intelligence. Never assert legal invalidity, liability, or unsupported deadlines; authoritative sources are required for jurisdiction-specific rules.
