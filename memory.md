# Lessons learned

Version 1.1 | 2026-11-22

## Scheduling

The old daily rule contained an UNTIL date of 8 November 2026. That explains why it ceased scheduling; the record does not establish who added the end date. The 20 November weekly run was recorded failed, with only the generic message "There was a problem with your scheduled task." No technical root cause was exposed. Do not invent one or claim that changing the prompt repairs execution infrastructure. Next scheduled run observed: 27 November 2026 at 09:00 Europe/Stockholm.

## Verification

An aggregator's verified flag is not the same as an independently inspected employer application. Source dates may reflect ingestion. Preserve their provenance. The EMEA remote filter can return country-restricted jobs; Sweden eligibility needs its own check. A source's mid-level label can be wrong: 20four7VA's employer JD states senior tier. Airship's UI Artist page is a talent pool, not a current vacancy, and was replaced in the 100-role set.

Recheck prior leads. Kjell & Company and the checked Revive, Nordic Valley and Trustyou pages are inactive. The old Canonical URL returned 404, so its current availability was not established. KAN autumn 2027 was already present in the 8 November workbook; today's recheck confirms it, not a new discovery. Earlier commentary suggesting it was newly discovered was imprecise.

## Candidate evidence

Use the original PDF when available. Never turn six years of engineering into six years of UX experience, or completed short courses into a design bachelor's degree. A missing case study in the CV is an evidence gap, not proof the person cannot do the work. Preserve English B2 and Swedish B1. LinkedIn URL confirmed by user: https://www.linkedin.com/in/ngoc-le-ngo/ . Live profile content remains unreviewed.

## Delivery

Keep all 100 screened records in a compact audit table and only employer-checked relevant opportunities in Open jobs. Do not imply 100 suitable jobs exist in Skåne. Preserve application statuses by stable ID. Archive originals once under v1.0 with checksums; unavailable cover letters and full portfolio exports must stay explicitly missing. Update generated drafts in docs/v1.1/ in place; do not create additional version folders unless requested. Git commits and PR numbers provide the change history. A GitHub repository alone does not run a scheduled scan.

## Next run

Read requirement.md and profile.md. Recheck the shortlist and search for newer roles. Update the report and lessons using observed results. If a tool or scheduled run fails, report the exact stage and keep the last successful report intact.

Validate file signatures before archiving: the historical PNG filename actually contained an HTML error page. Exclude it and record the missing screenshot. Exclude the manifest itself from its hash inventory.

## Document-folder preference — 2026-11-22

Keep exactly two document directories: `docs/v1.0/` preserves originals unchanged; `docs/v1.1/` contains the current working documents and is updated in place. Git commits and PRs retain revision history. Do not create additional document-version directories unless the user requests them. Dated scan reports continue to use `reports/PR_<number>_YYYY-MM-DD/`.
