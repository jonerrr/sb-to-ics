# Schedule Builder to ICS

This is a simple script that converts Schedule Builder (CUNY) courses to ICS format so you can easily import them into your calendar. It includes the course name, time, location, and teachers. It also takes holidays into account.

## Usage

1. Go to the Schedule Builder page with your courses for the semester. ![Schedule Builder page](https://github.com/jonerrr/sb-to-ics/blob/main/image.png?raw=true)
2. Inspect element (right click and select Inspect) and click on the Console tab (located by default on the top right).
3. Copy the script below (source code is in `script.js`, you should always be cautious of running scripts in your browser and verify it is safe).
4. Paste the script into the browser console and hit enter. This will download a file called `class_schedule.ics` containing your schedule.
5. Upload the file to your calendar.

```js
!function(){function T(T){let n=Math.floor(4*(T-1)/1461);let e=T-365*n-Math.floor((n+3)/4);n+=2008;const t=n%4==0?1:0;let E=0;return e<=31?E=0:(e-=31,e<=28+t?E=1:(e-=28+t,e<=31?E=2:(e-=31,e<=30?E=3:(e-=30,e<=31?E=4:(e-=31,e<=30?E=5:(e-=30,e<=31?E=6:(e-=31,e<=31?E=7:(e-=31,e<=30?E=8:(e-=30,e<=31?E=9:(e-=31,e<=30?E=10:(e-=30,e<=31&&(E=11)))))))))))),{year:n,month:E,day:e}}function n(T){switch(T){case 0:return"SU";case 1:return"MO";case 2:return"TU";case 3:return"WE";case 4:return"TH";case 5:return"FR";case 6:return"SA"}}function e(T){const n=Math.floor(T/60);let e=T-60*n;return e<=9&&(e="0 "+e.toString()),{hour:n,minute:parseInt(e)}}function t(T,n=!0){return`${n?T.getUTCFullYear():T.getFullYear()}${String(n?T.getUTCMonth()+1:T.getMonth()+1).padStart(2,"0")}${String(n?T.getUTCDate():T.getDate()).padStart(2,"0")}T${String(n?T.getUTCHours():T.getHours()).padStart(2,"0")}${String(n?T.getUTCMinutes():T.getMinutes()).padStart(2,"0")}${String(n?T.getUTCSeconds():T.getSeconds()).padStart(2,"0")}${n?"Z":""}`}const E=[],D=Object.values(MM.termBundle[BB.activeState.term].holidayschedules).flatMap((({holidays:n})=>Object.keys(n).map((n=>{const e=T(n);return new Date(e.year,e.month,e.day)}))));BB.activeState.results[0].selPros.forEach((A=>{if(A.isChosen()){const R=A.cn.key,S=A.sel.classes[0];S.timeblocks.forEach((A=>{const F=S.getLocForTimeBlock(A.id),N=A.day-1,r=T(A.d1),O=e(A.t1),a=T(A.d2),Y=e(A.t2),o=new Date(r.year,r.month,r.day,O.hour,O.minute),c=new Date(r.year,r.month,r.day,Y.hour,Y.minute).getTime()-o.getTime(),s=o.getDay()===N?o:function(T,n){const e=(n+7-T.getDay())%7||7,t=new Date(T);return t.setDate(T.getDate()+e),t}(o,N),L=new Date(a.year,a.month,a.day,Y.hour,Y.minute),Z={title:R,description:S.teacher,location:F,exclusionDates:D.map((T=>(T.setHours(s.getHours(),s.getMinutes(),s.getSeconds()),t(T,!1)))),startInputType:"utc",startOutputType:"local",recurrenceRule:`FREQ=WEEKLY;BYDAY=${n(N)};INTERVAL=1;UNTIL=${t(L,!1)}`,start:s.getTime(),duration:{hours:Math.floor(c/36e5),minutes:Math.floor(c%36e5/6e4)}};E.push(Z)}))}})),import("https://cdn.skypack.dev/ics").then((({createEvents:T})=>{let{value:n}=T(E);n=n.replace("METHOD:PUBLISH","METHOD:PUBLISH\nBEGIN:VTIMEZONE\nTZID:America/New_York\nLAST-MODIFIED:20240422T053450Z\nTZURL:https://www.tzurl.org/zoneinfo/America/New_York\nX-LIC-LOCATION:America/New_York\nX-PROLEPTIC-TZNAME:LMT\nBEGIN:STANDARD\nTZNAME:EST\nTZOFFSETFROM:-045602\nTZOFFSETTO:-0500\nDTSTART:18831118T120358\nEND:STANDARD\nBEGIN:DAYLIGHT\nTZNAME:EDT\nTZOFFSETFROM:-0500\nTZOFFSETTO:-0400\nDTSTART:19180331T020000\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU;UNTIL=19200328T070000Z\nEND:DAYLIGHT\nBEGIN:STANDARD\nTZNAME:EST\nTZOFFSETFROM:-0400\nTZOFFSETTO:-0500\nDTSTART:19181027T020000\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU;UNTIL=19201031T060000Z\nEND:STANDARD\nBEGIN:DAYLIGHT\nTZNAME:EDT\nTZOFFSETFROM:-0500\nTZOFFSETTO:-0400\nDTSTART:19210424T020000\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=-1SU;UNTIL=19410427T070000Z\nEND:DAYLIGHT\nBEGIN:STANDARD\nTZNAME:EST\nTZOFFSETFROM:-0400\nTZOFFSETTO:-0500\nDTSTART:19210925T020000\nRRULE:FREQ=YEARLY;BYMONTH=9;BYDAY=-1SU;UNTIL=19410928T060000Z\nEND:STANDARD\nBEGIN:DAYLIGHT\nTZNAME:EWT\nTZOFFSETFROM:-0500\nTZOFFSETTO:-0400\nDTSTART:19420209T020000\nEND:DAYLIGHT\nBEGIN:DAYLIGHT\nTZNAME:EPT\nTZOFFSETFROM:-0400\nTZOFFSETTO:-0400\nDTSTART:19450814T190000\nEND:DAYLIGHT\nBEGIN:STANDARD\nTZNAME:EST\nTZOFFSETFROM:-0400\nTZOFFSETTO:-0500\nDTSTART:19450930T020000\nEND:STANDARD\nBEGIN:DAYLIGHT\nTZNAME:EDT\nTZOFFSETFROM:-0500\nTZOFFSETTO:-0400\nDTSTART:19460428T020000\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=-1SU;UNTIL=19730429T070000Z\nEND:DAYLIGHT\nBEGIN:STANDARD\nTZNAME:EST\nTZOFFSETFROM:-0400\nTZOFFSETTO:-0500\nDTSTART:19460929T020000\nRRULE:FREQ=YEARLY;BYMONTH=9;BYDAY=-1SU;UNTIL=19540926T060000Z\nEND:STANDARD\nBEGIN:STANDARD\nTZNAME:EST\nTZOFFSETFROM:-0400\nTZOFFSETTO:-0500\nDTSTART:19551030T020000\nRRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU;UNTIL=20061029T060000Z\nEND:STANDARD\nBEGIN:DAYLIGHT\nTZNAME:EDT\nTZOFFSETFROM:-0500\nTZOFFSETTO:-0400\nDTSTART:19740106T020000\nRDATE:19750223T020000\nEND:DAYLIGHT\nBEGIN:DAYLIGHT\nTZNAME:EDT\nTZOFFSETFROM:-0500\nTZOFFSETTO:-0400\nDTSTART:19760425T020000\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=-1SU;UNTIL=19860427T070000Z\nEND:DAYLIGHT\nBEGIN:DAYLIGHT\nTZNAME:EDT\nTZOFFSETFROM:-0500\nTZOFFSETTO:-0400\nDTSTART:19870405T020000\nRRULE:FREQ=YEARLY;BYMONTH=4;BYDAY=1SU;UNTIL=20060402T070000Z\nEND:DAYLIGHT\nBEGIN:DAYLIGHT\nTZNAME:EDT\nTZOFFSETFROM:-0500\nTZOFFSETTO:-0400\nDTSTART:20070311T020000\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\nEND:DAYLIGHT\nBEGIN:STANDARD\nTZNAME:EST\nTZOFFSETFROM:-0400\nTZOFFSETTO:-0500\nDTSTART:20071104T020000\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\nEND:STANDARD\nEND:VTIMEZONE"),n=n.replaceAll("DTSTART:","DTSTART;TZID=America/New_York:");const e=new File([n],"class_schedule.ics",{type:"text/calendar"}),t=URL.createObjectURL(e),D=document.createElement("a");D.href=t,D.download="class_schedule.ics",document.body.appendChild(D),D.click(),document.body.removeChild(D),URL.revokeObjectURL(t)}))}();
```
