# Debt Defense

**Status: Planned vertical — validate against Dispute Mail before building.**

## Product thesis

Help people organize debt-collection correspondence, request/track validation information, document disputes, and prepare factual responses with a defensible evidence trail.

Core journey:

**Collection Notice → Account/Documents → Validation → Evidence → Dispute → Review → Mail/Proof**

## Primary search intent

- debt validation letter
- respond to debt collector
- debt collection dispute
- debt verification request
- collection account dispute
- debt collector response letter

## MVP candidate

1. Upload collection correspondence and account records.
2. Extract collector, account/reference number, dates, amounts, and stated claims.
3. Organize validation/dispute evidence.
4. Track correspondence and deadlines without inventing legal deadlines.
5. Draft a factual validation/dispute request for review.
6. Preserve delivery and mailing records through MailMyPDF.

## Architecture decision

First compare this product against Dispute Mail. If the workflows and evidence model are substantially shared, implement Debt Defense as a specialized workflow inside Dispute Mail rather than creating a second platform.

## Reuse

Use shared document, evidence, provenance, correspondence, and mailing infrastructure.

## Guardrails

Do not assert that a debt is invalid, determine legal liability, or promise a legal outcome. Jurisdiction-specific rights/deadlines require authoritative sources and careful versioning.
