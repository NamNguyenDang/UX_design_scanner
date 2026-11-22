import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {Workbook,SpreadsheetFile} from '@oai/artifact-tool';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const dataDir=path.resolve(process.argv[2]||`${root}/reports/PR_1_2026-11-22`);
const out=path.resolve(process.argv[3]||dataDir);
const jobs=JSON.parse(await fs.readFile(`${dataDir}/screening_records.json`,'utf8'));
const shortlist=JSON.parse(await fs.readFile(`${dataDir}/shortlist.json`,'utf8'));
const wb=Workbook.create();
const navy='#24364B', amber='#FFF1CE';
function sheet(name,title,headers,rows,widths,height=64){
 const s=wb.worksheets.add(name);s.showGridLines=false;
 const bottom=6+rows.length, n=headers.length;
 s.getRangeByIndexes(0,0,bottom,n).format.font={name:'Arial',size:11,color:'#24364B'};
 s.getRangeByIndexes(0,0,bottom,n).format.verticalAlignment='top';
 s.getRange('A2').values=[[title]];s.getRange('A2').format.font={name:'Arial',size:16,bold:true};
 s.getRange('A2').format.rowHeight=28;
 s.getRangeByIndexes(5,0,1,n).values=[headers];
 s.getRangeByIndexes(6,0,rows.length,n).values=rows;
 s.tables.add(s.getRangeByIndexes(5,0,rows.length+1,n),true,name.replace(/[^a-z]/gi,'')+'Table').style='TableStyleLight9';
 s.getRangeByIndexes(5,0,1,n).format={fill:navy,font:{name:'Arial',size:11,bold:true,color:'#FFFFFF'},wrapText:true,rowHeight:36,verticalAlignment:'center',horizontalAlignment:'center'};
 s.getRangeByIndexes(6,0,rows.length,n).format.wrapText=true;
 s.getRangeByIndexes(6,0,rows.length,n).format.rowHeight=height;
 widths.forEach((w,i)=>s.getCell(0,i).format.columnWidth=w);
 s.freezePanes.freezeRows(6);s.tabColor=navy;
 return s;
}
function note(s,row,text){s.getCell(row-1,0).values=[[text]];s.getCell(row-1,0).format.rowHeight=20;}
function link(s,r,c,url,label='Open source'){s.getCell(r,c).formulas=[['=HYPERLINK("'+url.replaceAll('"','""')+'","'+label+'")']];s.getCell(r,c).format.font={name:'Arial',size:11,color:'#175A9C',underline:'single'};}
const open=sheet('Open jobs','UX opportunities — 22 November 2026',
 ['Company','Role','Location / arrangement','CV fit','Next action','Application status','Compensation / duration','Deadline','Employer source','Checked on','Posting evidence','Availability evidence'],
 shortlist.map(s=>[s.company,s.role,s.location.replace(' • ','; '),s.fit,s.action,s.status,s.pay,s.deadline?new Date(s.deadline+'T12:00:00Z'):null,null,new Date('2026-11-22T12:00:00Z'),s.posting,s.evidence]),
 [19,31,29,23,48,23,35,16,22,16,38,43],58);
note(open,3,'Five employer-advertised opportunities. Eligibility remains conditional; no applications sent.');
note(open,4,'Amber status cells are editable. Blank deadline means not stated. PR_1_2026-11-22.');
open.getRange('F7:F11').format.fill=amber;
open.getRange('F7:F11').dataValidation={rule:{type:'list',values:['Not started','Check eligibility','Preparing','Applied','Interview','Offer','Not pursuing']}};
open.getRange('H7:H11').setNumberFormat('yyyy-mm-dd');open.getRange('J7:J11').setNumberFormat('yyyy-mm-dd');
shortlist.forEach((s,i)=>link(open,i+6,8,s.url,'Employer advert'));
open.freezePanes.freezeColumns(2);
const cv=sheet('CV and portfolio','Tailored CV wording and three improvement points',
 ['Company','Ready-to-use CV wording','Knowledge / evidence gaps — exactly 3','Eligibility / practical check'],
 shortlist.map(s=>[s.company,s.profile+'\n\n'+s.bullets.map(x=>'• '+x).join('\n'),s.gaps.map(x=>'• '+x).join('\n\n'),s.action]),
 [19,89,90,44],150);
note(cv,3,'Original CV used. Missing evidence is not proof of missing ability. Full tailored drafts are in docs/v1.1/.');
note(cv,4,'Pomodoro Platform remains work in progress. LinkedIn: https://www.linkedin.com/in/ngoc-le-ngo/');
const review=sheet('Review 100','100 advertised roles screened — Sweden and EMEA remote',
 ['Rank','Company','Role','Location','Seniority','Source date','Decision / reason','CV evidence','JD topics','Review depth','Apply','Source','Stable job ID'],
 jobs.map(j=>[j.rank,j.company,j.role,j.location,j.seniority,j.source_date?new Date(j.source_date):null,j.decision,j.cv_evidence,j.jd_topics,j.review_depth,null,null,j.id]),
 [8,23,39,34,23,17,52,52,32,30,17,17,40],62);
note(review,3,'UX Jobs — jobs.uxjobs.io. Source marks these open; employer acceptance was not checked for every row.');
note(review,4,'Newest by source-reported date, not verified original posting date. This broad pool is not a shortlist.');
review.getRange('F7:F106').setNumberFormat('yyyy-mm-dd');
jobs.forEach((j,i)=>{link(review,i+6,10,j.apply_url,'Application');link(review,i+6,11,j.source_url,'UX Jobs');});
review.freezePanes.freezeColumns(2);
const coverageRows=[
 ['100-role method','39 Sweden results + first 100 EMEA-remote results; deduplicate, sort by reported date, keep 100 provider-verified records.','Source dates can be ingestion dates; no claim of globally exhaustive latest 100.','https://jobs.uxjobs.io'],
 ['Review depth','Metadata and available description excerpts; no full JD available for some records.','100 provider flags do not mean 100 independent employer checks.','https://jobs.uxjobs.io'],
 ['Gaddr','Employer advert visible with sign-in application.','Unpaid, 20h/week, at least 3 months. User acceptance unconfirmed.','https://jobs.gaddr.com/opportunities/26'],
 ['Learnpoint','Spring 2027 remote intake advertised.','Requires at least one co-applicant; AI-agent workflows expected.','https://learnpoint.se/jobs/2027/spring/ux-designer-internship.html'],
 ['Nordhealth','Employer advert and Apply button visible.','Current degree pursuit expected; Sweden contract to confirm.','https://careers.nordhealth.com/jobs/8632668-ux-intern'],
 ['Hemkodat','Employer design internship page and current portal listing surfaced.','Study-based placement; specific availability and pay to confirm.','https://hemkodat.se/jobb/praktik-grafisk-design'],
 ['KAN','Autumn 2027 advertised, deadline 16 April 2027.','Ongoing post-secondary education required; spring intake closed.','https://jobb.kan.se/jobs/8655686-praktikplats-host-2027'],
 ['Mero','Employer Lund role checked; not in junior shortlist.','At least 3 years of digital UX required, despite useful engineering overlap.','https://jobs.mero.se/jobs/8745689-ux-ui-designer-till-internationellt-teknikbolag-i-lund'],
 ['Kjell & Company','Previous role inactive.','Removed from open results.','https://career.kjell.com/sv/jobs/8339136-praktik-var-med-och-utveckla-vart-nya-intranat'],
 ['Revive / Nordic Valley / Trustyou','Checked Hub pages inactive.','No longer treated as current vacancies.','https://thehub.io/jobs/69e7a3ce0ca1457025a40bd8'],
 ['Canonical','Previous employer URL returned 404.','Current availability not established; omitted.','https://job-boards.greenhouse.io/canonicaljobs/jobs/7461585'],
 ['Animals AI','UX internship appeared in Indeed results.','Employer acceptance unresolved; omitted from shortlist.','https://se.indeed.com/cmp/Animals-Ai/jobs'],
 ['Qlik','Research co-op appeared in older portal records.','Employer availability not established; omitted.','https://jobbsafari.se/lediga-jobb?sok=qlik'],
 ['20four7VA','Full employer JD read; senior tier stated.','Corrected provider mid-level classification.','https://20four7va.breezy.hr/p/723ae2d57b9d-s-cpt-0047-user-interface-ui-designer'],
 ['Airship','JD explicitly describes a freelance pool.','Replaced in the 100-role set; not a specific vacancy.','https://jobs.uxjobs.io'],
 ['Portal coverage','Indexed discovery across the ten configured portals; shortlisted employers checked separately.','Search coverage is limited; no exhaustive portal traversal claimed.','https://arbetsformedlingen.se/platsbanken/'],
 ['Automation','20 November attempt recorded failed; only generic error exposed.','Next scheduled run 27 November 09:00 Stockholm. Technical cause unknown.','https://github.com/NamNguyenDang/UX_design_scanner/pull/1'],
 ['Baseline','Original CV and historical Pomodoro screenshot preserved as v1.0.','Original cover letter and full portfolio export unavailable.','https://github.com/NamNguyenDang/UX_design_scanner/tree/main/docs/v1.0'],
 ['LinkedIn','User-confirmed exact profile URL, 22 November 2026.','Live content not reviewed or used as new qualification evidence.','https://www.linkedin.com/in/ngoc-le-ngo/'],
 ['Pomodoro Platform','Sole ongoing UX case-study project.','No new design-quality or validation claim in this run.','https://www.figma.com/design/BNuVT7Xsa40cCz2NEBt9BG/Pomodoro-Platform_GPT_suggestion?node-id=255-2308']
];
const cover=sheet('Coverage','Scope, verification and known limitations',
 ['Source / item','Observed result','Limit / next check','Link'],coverageRows.map(x=>[x[0],x[1],x[2],null]),[25,72,72,22],44);
note(cover,3,'Checked 22 November 2026. Source links identify evidence; public routes do not prove acceptance.');
note(cover,4,'company_list.txt is cumulative employer coverage, not a list of employers currently hiring.');
coverageRows.forEach((x,i)=>link(cover,i+6,3,x[3]));
wb.recalculate();
console.log((await wb.inspect({kind:'table',range:'Open jobs!A6:F11',include:'values,formulas',tableMaxRows:6,tableMaxCols:6,maxChars:2200})).ndjson);
console.log((await wb.inspect({kind:'match',searchTerm:'#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!',options:{useRegex:true,maxResults:30},maxChars:1000})).ndjson);
await fs.mkdir(out,{recursive:true});
for(const [name,range,file] of [['Open jobs','A1:F11','open'],['CV and portfolio','A1:D11','cv'],['Review 100','A1:G12','review'],['Coverage','A1:D12','coverage']]){
 const img=await wb.render({sheetName:name,range,scale:1,format:'png'});await fs.writeFile(`${out}/${file}.png`,new Uint8Array(await img.arrayBuffer()));
}
await(await SpreadsheetFile.exportXlsx(wb)).save(`${out}/UX_design_job_scanning_PR_1_2026-11-22.xlsx`);
if(out!==dataDir) await fs.copyFile(`${out}/UX_design_job_scanning_PR_1_2026-11-22.xlsx`,`${dataDir}/UX_design_job_scanning_PR_1_2026-11-22.xlsx`);
console.log('Workbook exported');
