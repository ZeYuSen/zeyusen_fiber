# Content tracker

## 2026-08-18 — Refresh: Chopped Strand Mat vs Woven Roving

- **Status:** Refresh implemented in the working tree; English technical review and native review for `zh`, `ko`, `es`, and `pt` required before publication. Outcome is not yet observable.
- **Page task:** Give production, engineering, and purchasing teams comparing fiberglass reinforcement the ability to choose CSM, woven roving, both, or another architecture from load, geometry, resin/process, surface, and evidence gates, then prepare a comparable RFQ or contact ZeYuSen Fiber.
- **Market / intent evidence:** English-language global SERP sample on 2026-08-18. The observed result set was dominated by commercial comparison guides promising differences, use cases, relative strength, conformability, and combined layups. No country-specific demand, search volume, ranking, GSC, or conversion data was available; all destination-market variants remain locale-unverified.
- **Coverage gap / information gain:** Replaced a generic two-way comparison with a four-route decision table (`CSM / woven roving / both / neither`), four sequential validation gates, geometry-trial observations, example decision records, and RFQ/trial fields. The page now explains why dry-roll GSM and category-level “strength” claims are insufficient for part selection.
- **Corrected evidence boundary:** Removed the blanket implication that CSM is categorically unsuitable for epoxy. The page now requires product-specific binder/sizing evidence and cites 3B EM 1011 only as one explicitly UP/VE/EP-compatible CSM example. Owens Corning and Jushi product ranges support the narrower conclusion that process and behavior vary by product code; they do not prove ZeYuSen product performance.
- **Internal path:** Added task-relevant links to sizing/resin compatibility, UD versus woven, multiaxial fabric, surface tissue, laminate layers, the RFQ checklist, product families, and contact. The existing local cover and product images were retained; no new third-party media dependency was added.
- **Reader questions:** Retained four visible, localized FAQs because they resolve selection blockers (relative strength, epoxy compatibility, interleaving, and equal-GSM comparison). The current site parser emits FAQPage for this section; this is an implementation artifact, not a rich-result or ranking promise.
- **Adversarial review:** Intent/page type, originality, claim/source mapping, buyer usability, and English-language editing passed the content gate. No invented product test, numerical performance, search volume, rank, or conversion claim remains. Publication state is `needs-expert-review` plus native-language review, not `ready`.
- **Files:** `content/blog/{en,zh,ko,es,pt}/fiberglass-chopped-strand-mat-vs-woven-roving.md`.
- **Artifact verification:** `npm run build` passed on 2026-08-18 (438 static pages generated). All five localized article routes returned HTTP 200 with the localized H1, `dateModified`, canonical URL, and FAQ output; all internal links in the five article files resolved to HTTP 200 in the local production build. This verifies the artifact, not indexing or search impact.
- **Outcome observation:** After publication and recrawl, compare page-level GSC queries/impressions/clicks and organic landing-page qualified-RFQ progression against a pre-update comparable window. Query-to-person conversion must not be inferred; observation window depends on crawl and traffic maturity.

## 2026-08-15 — Dry Fiber Reinforcement Receiving and Storage Checklist

- **Status:** Draft complete; technical and destination-market review required before publication.
- **Page task:** Help production, quality, and purchasing teams decide whether to release, hold, or quarantine a shipment of dry carbon-fiber or fiberglass reinforcement, then guide them to relevant product and contact pages.
- **Audience / decision:** B2B receiving, quality, and purchasing roles; material-release and traceability decision.
- **Information gain:** A three-state release model, a receiving-record template, and a clear dry-reinforcement versus prepreg boundary. Existing articles focus on fiber selection, construction, compatibility, and RFQs rather than post-delivery control.
- **SERP sample:** English-language sampling on 2026-08-15 for dry-fiber storage and handling returned broad vendor guidance and prepreg-focused content. This page avoids unsupported generic temperature, humidity, and life claims; localized query intent has not been independently validated.
- **Evidence boundary:** Supplier TDS, SDS, approved purchase specification, customer requirements, and site quality procedures govern actual handling and acceptance. OSHA Appendix D establishes SDS handling-and-storage content; CKN provides open manufacturing-storage context. Neither source is treated as product-specific acceptance authority.
- **Files:** `content/blog/{en,zh,ko,es,pt}/dry-fiber-reinforcement-receiving-storage-checklist.md`; `public/images/blog/dry-fiber-receiving-storage-cover.png`.
- **Media:** Original image generated in Codex on 2026-08-15; no third-party license dependency.
- **Reader Q&A:** Added visible, localized common-receiving questions without the reserved `## FAQ` heading, so this post does not emit FAQPage schema.
