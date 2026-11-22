# Task requirements

Version: 1.1 | Updated: 2026-11-22

Review the 100 most recent distinct advertised design roles discoverable in the Sweden and EMEA-remote search pool, ordered by source-reported date. This is a bounded discovery set, not the 100 newest jobs across the entire internet. Preserve posting-date provenance and distinguish provider-verified status from direct employer verification. Never pad the count with duplicates, expired ads or talent pools. Report any shortfall.

Prioritize entry-level/junior UI/UX, interaction and product-design roles and internships: onsite/hybrid/remote in Skåne, or fully remote work explicitly eligible from Sweden elsewhere. Keep broader-market screening separate from the qualifying shortlist. Check employer sources for shortlisted roles, required education, languages, location, compensation and deadlines. Missing CV evidence is not proof of missing knowledge.

Produce a clean Excel workbook with a concise Open jobs sheet, a Review 100 audit table, CV and portfolio actions, and compact coverage notes. Use filterable tables, frozen headers, readable widths, typed dates, clickable links and editable application status. Avoid blank formatted columns and duplicate rows. Keep closed jobs out of Open jobs.

For each shortlisted role provide ready-to-use truthful tailored CV wording and exactly three main knowledge/evidence-gap bullets, without sub-bullets. Keep engineering and UX experience distinct. Pomodoro Platform is the sole ongoing UX case study; do not claim it is shipped or validated.

Version control: preserve originals under docs/v1.0/ with a manifest and SHA-256 hashes. Record unavailable originals honestly. Never label generated text or a live URL as an original cover letter or a full portfolio archive. Keep exactly two document directories: `docs/v1.0/` preserves originals unchanged; `docs/v1.1/` contains the current working documents and is updated in place. Git commits and PRs retain revision history. Do not create additional document-version directories unless the user requests them. Dated scan reports continue to use `reports/PR_<number>_YYYY-MM-DD/`. Maintain requirement.md, memory.md, CV improve.md, CHANGELOG.md and a names-only company_list.txt.

Each weekly run creates a branch and a pull request. After GitHub assigns its number, use PR_<number>_YYYY-MM-DD for the PR title and reports directory, with Europe/Stockholm date. Commit CSV/JSON alongside Excel so changes are reviewable. Preserve prior reports and application statuses by stable job ID. Merge only after validation; user authorized repository management on 2026-11-22. Never apply for jobs or contact employers.

Schedule: Friday 09:00 Europe/Stockholm, no end date. ChatGPT automation executes the scan; this repository is the versioned destination, not an independently running GitHub Actions scraper. Verify task run state, commit, PR and workbook before reporting success. On failure, report the stage and actual error, preserve progress, and never fabricate output.
