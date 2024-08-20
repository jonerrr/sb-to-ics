# Schedule Builder to ICS

This is a simple script that converts Schedule Builder (CUNY) courses to ICS format so you can easily import them into your calendar. It includes the course name, time, location, and teachers. This script does not yet take into holidays into account.

## Usage

1. Go to the Schedule Builder page with your courses for the semester. <!-- ![Schedule Builder page](https://github.com/jonerrr/blob/[branch]/image.jpg?raw=true) -->
2. Inspect element (right click and click Inspect) and go to the console tab on the top right (by default).
3. Copy the script below (source code is in `script.js`, you should always be cautious of running scripts in your browser and verify it is safe).
4. Paste the script into the browser console and hit enter. This will download a file called `class_schedule.ics` containing your schedule.
5. Upload the file to your calendar.

```js
!function(){function e(e){let t=Math.floor(4*(e-1)/1461);let n=e-365*t-Math.floor((t+3)/4);t+=2008;const r=t%4==0?1:0;let c=0;return n<=31?c=0:(n-=31,n<=28+r?c=1:(n-=28+r,n<=31?c=2:(n-=31,n<=30?c=3:(n-=30,n<=31?c=4:(n-=31,n<=30?c=5:(n-=30,n<=31?c=6:(n-=31,n<=31?c=7:(n-=31,n<=30?c=8:(n-=30,n<=31?c=9:(n-=31,n<=30?c=10:(n-=30,n<=31&&(c=11)))))))))))),{year:t,month:c,day:n}}function t(e){switch(e){case 0:return"SU";case 1:return"MO";case 2:return"TU";case 3:return"WE";case 4:return"TH";case 5:return"FR";case 6:return"SA"}}function n(e){const t=Math.floor(e/60);let n=e-60*t;return n<=9&&(n="0 "+n.toString()),{hour:t,minute:parseInt(n)}}const r=[];BB.activeState.results[0].selPros.forEach((c=>{if(c.isChosen()){const o=c.cn.key,a=c.sel.classes[0];a.timeblocks.forEach((c=>{const s=a.getLocForTimeBlock(c.id),u=c.day-1,i=e(c.d1),l=n(c.t1),h=e(c.d2),d=n(c.t2),m=new Date(i.year,i.month,i.day,l.hour,l.minute),y=new Date(i.year,i.month,i.day,d.hour,d.minute).getTime()-m.getTime(),f=m.getDay()===u?m:function(e,t){const n=(t+7-e.getDay())%7||7,r=new Date(e);return r.setDate(e.getDate()+n),r}(m,u),p={title:o,description:a.teacher,location:s,startInputType:"local",recurrenceRule:`FREQ=WEEKLY;BYDAY=${t(u)};INTERVAL=1;UNTIL=${h.year}${h.month+1}${h.day}`,start:f.getTime(),duration:{hours:Math.floor(y/36e5),minutes:Math.floor(y%36e5/6e4)}};r.push(p)}))}})),import("https://cdn.skypack.dev/ics").then((({createEvents:e})=>{const{value:t}=e(r),n=new File([t],"class_schedule.ics",{type:"text/calendar"}),c=URL.createObjectURL(n),o=document.createElement("a");o.href=c,o.download="class_schedule.ics",document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(c)}))}();
```
