# Schedule Builder to ICS

This is a simple script that converts Schedule Builder (CUNY) courses to ICS format so you can easily import them into your calendar. It includes the course name, time, location, and teachers. This script does not take holidays into account yet.

**WARNING: This script does not take into account daylight savings (will be fixed in the future)**

## Usage

1. Go to the Schedule Builder page with your courses for the semester. ![Schedule Builder page](https://github.com/jonerrr/sb-to-ics/blob/main/image.png?raw=true)
2. Inspect element (right click and select Inspect) and click on the Console tab (located by default on the top right).
3. Copy the script below (source code is in `script.js`, you should always be cautious of running scripts in your browser and verify it is safe).
4. Paste the script into the browser console and hit enter. This will download a file called `class_schedule.ics` containing your schedule.
5. Upload the file to your calendar.

```js
!function(){function t(t){let e=Math.floor(4*(t-1)/1461);let n=t-365*e-Math.floor((e+3)/4);e+=2008;const r=e%4==0?1:0;let a=0;return n<=31?a=0:(n-=31,n<=28+r?a=1:(n-=28+r,n<=31?a=2:(n-=31,n<=30?a=3:(n-=30,n<=31?a=4:(n-=31,n<=30?a=5:(n-=30,n<=31?a=6:(n-=31,n<=31?a=7:(n-=31,n<=30?a=8:(n-=30,n<=31?a=9:(n-=31,n<=30?a=10:(n-=30,n<=31&&(a=11)))))))))))),{year:e,month:a,day:n}}function e(t){switch(t){case 0:return"SU";case 1:return"MO";case 2:return"TU";case 3:return"WE";case 4:return"TH";case 5:return"FR";case 6:return"SA"}}function n(t){const e=Math.floor(t/60);let n=t-60*e;return n<=9&&(n="0 "+n.toString()),{hour:e,minute:parseInt(n)}}function r(t,e=!0){return`${e?t.getUTCFullYear():t.getFullYear()}${String(e?t.getUTCMonth()+1:t.getMonth()+1).padStart(2,"0")}${String(e?t.getUTCDate():t.getDate()).padStart(2,"0")}T${String(e?t.getUTCHours():t.getHours()).padStart(2,"0")}${String(e?t.getUTCMinutes():t.getMinutes()).padStart(2,"0")}${String(e?t.getUTCSeconds():t.getSeconds()).padStart(2,"0")}${e?"Z":""}`}const a=[];BB.activeState.results[0].selPros.forEach((o=>{if(o.isChosen()){const c=o.cn.key,s=o.sel.classes[0];s.timeblocks.forEach((o=>{const u=s.getLocForTimeBlock(o.id),i=o.day-1,l=t(o.d1),d=n(o.t1),h=t(o.d2),g=n(o.t2),m=new Date(l.year,l.month,l.day,d.hour,d.minute),y=new Date(l.year,l.month,l.day,g.hour,g.minute).getTime()-m.getTime(),p=m.getDay()===i?m:function(t,e){const n=(e+7-t.getDay())%7||7,r=new Date(t);return r.setDate(t.getDate()+n),r}(m,i),S=new Date(h.year,h.month,h.day,g.hour,g.minute),T={title:c,description:s.teacher,location:u,startInputType:"local",recurrenceRule:`FREQ=WEEKLY;BYDAY=${e(i)};INTERVAL=1;UNTIL=${r(S,!1)}`,start:p.getTime(),duration:{hours:Math.floor(y/36e5),minutes:Math.floor(y%36e5/6e4)}};a.push(T)}))}})),import("https://cdn.skypack.dev/ics").then((({createEvents:t})=>{const{value:e}=t(a),n=new File([e],"class_schedule.ics",{type:"text/calendar"}),r=URL.createObjectURL(n),o=document.createElement("a");o.href=r,o.download="class_schedule.ics",document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(r)}))}();
```
