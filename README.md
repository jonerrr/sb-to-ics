# Schedule Builder to ICS

This is a simple script that converts Schedule Builder (CUNY) courses to ICS format so you can easily import them into your calendar. It includes the course name, time, location, and professor.

## Usage

1. Go to the Schedule Builder page with your courses for the semester.
2. Copy the script below (source code is in `script.js`, you should always be cautious of running scripts in your browser).
3. Paste the script into the browser console and hit enter. This will download an `event.ics` file containing the events.

```js
!function(){function e(e){let t=Math.floor(4*(e-1)/1461);let n=e-365*t-Math.floor((t+3)/4);t+=2008;const r=t%4==0?1:0;let o=0;return n<=31?o=0:(n-=31,n<=28+r?o=1:(n-=28+r,n<=31?o=2:(n-=31,n<=30?o=3:(n-=30,n<=31?o=4:(n-=31,n<=30?o=5:(n-=30,n<=31?o=6:(n-=31,n<=31?o=7:(n-=31,n<=30?o=8:(n-=30,n<=31?o=9:(n-=31,n<=30?o=10:(n-=30,n<=31&&(o=11)))))))))))),{year:t,month:o,day:n}}function t(e){switch(e){case 0:return"SU";case 1:return"MO";case 2:return"TU";case 3:return"WE";case 4:return"TH";case 5:return"FR";case 6:return"SA"}}function n(e){const t=Math.floor(e/60);let n=e-60*t;return n<=9&&(n="0 "+n.toString()),{hour:t,minute:parseInt(n)}}const r=[];BB.activeState.results[0].selPros.forEach((o=>{if(o.isChosen()){const a=o.cn.key,c=o.sel.classes[0];c.timeblocks.forEach((o=>{const s=c.getLocForTimeBlock(o.id),u=o.day-1,i=e(o.d1),l=n(o.t1),h=e(o.d2),d=n(o.t2),m=new Date(i.year,i.month,i.day,l.hour,l.minute),y=new Date(i.year,i.month,i.day,d.hour,d.minute).getTime()-m.getTime(),f=m.getDay()===u?m:function(e,t){const n=(t+7-e.getDay())%7||7,r=new Date(e);return r.setDate(e.getDate()+n),r}(m,u),p={title:a,location:s,startInputType:"local",recurrenceRule:`FREQ=WEEKLY;BYDAY=${t(u)};INTERVAL=1;UNTIL=${h.year}${h.month+1}${h.day}`,start:f.getTime(),duration:{hours:Math.floor(y/36e5),minutes:Math.floor(y%36e5/6e4)}};r.push(p)}))}})),import("https://cdn.skypack.dev/ics").then((({createEvents:e})=>{const{value:t}=e(r),n=new File([t],"event.ics",{type:"text/calendar"}),o=URL.createObjectURL(n),a=document.createElement("a");a.href=o,a.download="event.ics",document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(o)}))}();
```
