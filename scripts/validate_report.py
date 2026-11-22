"""Read-only checks for the 22 November report and source baseline."""
from pathlib import Path
import hashlib, json, zipfile, xml.etree.ElementTree as ET

root=Path(__file__).resolve().parents[1]
report=root/'reports/PR_1_2026-11-22'
jobs=json.loads((report/'screening_records.json').read_text())
short=json.loads((report/'shortlist.json').read_text())
assert len(jobs)==100 and len({j['id'] for j in jobs})==100
assert [j['rank'] for j in jobs]==list(range(1,101))
assert all(j['source_date']>=jobs[i+1]['source_date'] for i,j in enumerate(jobs[:-1]))
assert len(short)==5 and all(len(s['gaps'])==3 for s in short)
for j in jobs:
    assert j['source_url'].startswith('https://') and j['apply_url'].startswith('https://')
manifest=json.loads((root/'docs/v1.0/manifest.json').read_text())
for name,meta in manifest['files'].items():
    p=root/'docs/v1.0'/name
    assert hashlib.sha256(p.read_bytes()).hexdigest()==meta['sha256'], name
ns={'s':'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
with zipfile.ZipFile(report/'UX_design_job_scanning_PR_1_2026-11-22.xlsx') as z:
    sheets=[n for n in z.namelist() if n.startswith('xl/worksheets/sheet') and n.endswith('.xml')]
    assert len(sheets)==4
    counts=[]
    links=0
    for n in sheets:
        xml=ET.fromstring(z.read(n))
        errors=xml.findall('.//s:c[@t="e"]',ns)
        assert not errors,(n,[e.attrib for e in errors])
        forms=xml.findall('.//s:f',ns)
        links+=sum('HYPERLINK(' in (f.text or '') for f in forms)
        counts.append({'sheet':n,'rows':len(xml.findall('.//s:sheetData/s:row',ns)),'panes':len(xml.findall('.//s:pane',ns))})
    assert links==225, links
    assert len([n for n in z.namelist() if n.startswith('xl/tables/table') and n.endswith('.xml')])==4
    s1=ET.fromstring(z.read('xl/worksheets/sheet1.xml'))
    assert s1.find('.//s:dataValidation',ns) is not None
print(json.dumps({'records':100,'shortlist':5,'gap_bullets':15,'hyperlinks':links,'baseline_hashes':'verified','xlsx_errors':0,'sheets':counts},indent=2))
