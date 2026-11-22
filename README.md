# UX design scanner

Weekly UX job reviews and versioned application documents for Ngoc Le, based in Lund.

## Latest report

[PR_1_2026-11-22](reports/PR_1_2026-11-22/README.md) reviews 100 provider-verified advertised roles and five separately employer-checked opportunities. [Download Excel](reports/PR_1_2026-11-22/UX_design_job_scanning_PR_1_2026-11-22.xlsx). [Review PR #1](https://github.com/NamNguyenDang/UX_design_scanner/pull/1).

The 100-role review is a bounded Sweden/EMEA-remote discovery set, not 100 suitable junior roles or an exhaustive internet ranking. Employer verification and conditional eligibility are labeled.

## Documents

| File | Purpose |
| --- | --- |
| [requirement.md](requirement.md) | Task scope, verification and delivery rules |
| [profile.md](profile.md) | Candidate facts, LinkedIn and search preferences |
| [memory.md](memory.md) | Lessons, failure evidence and next-run notes |
| [CV improve.md](CV%20improve.md) | Three main improvement priorities |
| [docs/v1.0](docs/v1.0) | Unmodified original CV and available portfolio baseline |
| [docs/v1.1](docs/v1.1) | Five tailored CV drafts and role-specific three-point gaps |
| [CHANGELOG.md](CHANGELOG.md) | Document version history |
| [company_list.txt](company_list.txt) | Cumulative names, not current vacancies |

Keep exactly two document directories: `docs/v1.0/` preserves originals unchanged; `docs/v1.1/` contains the current working documents and is updated in place. Git commits and PRs retain revision history. Do not create additional document-version directories unless the user requests them. Dated scan reports continue to use `reports/PR_<number>_YYYY-MM-DD/`.

Original cover letter and full portfolio export were unavailable. Their absence is documented rather than reconstructed as originals. LinkedIn: https://www.linkedin.com/in/ngoc-le-ngo/ . Live profile content was not reviewed in this run.

## Schedule and PR convention

Every Friday at 09:00 Europe/Stockholm, with no end date. Next configured run: 27 November 2026. ChatGPT's scheduled task runs the work; this repository does not contain an independently executing GitHub Actions scanner. [Prompt](automation/prompt.md) and [schedule record](automation/schedule.json).

Each run opens a PR, then uses the assigned number and local date as `PR_<number>_YYYY-MM-DD`. Validated changes may be merged to main under the user's authorization. Reports remain immutable historical snapshots. No applications or employer messages are sent.

The 20 November run was recorded failed with a generic error. Its technical cause is unknown. A successful manual report does not prove future scheduled execution.

## Rebuilding the workbook

`scripts/build_report.mjs` uses the preinstalled `@oai/artifact-tool` library in the Codex primary runtime. Run from this repository with `CODEX_PRIMARY_RUNTIME_NODE`, with the package available through the runtime's node_modules. The default input is `reports/PR_1_2026-11-22`; optional arguments select another input directory and output directory. This builder uses saved reviewed data and does not rescan jobs.

Source attribution: UX Jobs — https://jobs.uxjobs.io . Individual employer and source links are stored with every record.
