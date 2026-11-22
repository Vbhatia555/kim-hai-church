/* Kim Hải courtyard visit: original scene geometry, no tracking or user data sent. */
(() => {
'use strict';
const $ = id => document.getElementById(id);
const DATA = window.KIM_HAI_CONTENT || {prayers:{},dailyThemes:[]};
const STORE = {get(k,f=null){try{const v=localStorage.getItem('kh2_'+k);return v===null?f:JSON.parse(v)}catch{return f}},set(k,v){try{localStorage.setItem('kh2_'+k,JSON.stringify(v))}catch{}}};
const COPY={
 vi:{subtitle:'Một chốn bình yên',welcome:'Chạm một nơi để bắt đầu hành trình.',exploreHint:'Chạm để đi · Mũi tên để di chuyển',places:'Địa điểm',altar:'Bàn thờ',candle:'Thắp nến',garden:'Vườn Mân Côi',notice:'Giờ lễ',gate:'Cổng giáo xứ',door:'Cửa nhà thờ',headGate:'Bước vào bình an',headDoor:'Cánh cửa luôn mở',headAltar:'Một phút bên Chúa',headCandle:'Thắp một ánh sáng',headGarden:'Bước từng hạt kinh',headBoard:'Lịch lễ giáo xứ',hintGate:'Nhà thờ đang đợi chúng mình.',hintDoor:'Đi tiếp vào bên trong để cầu nguyện.',hintAltar:'Dành một khoảnh khắc thật yên tĩnh.',hintCandle:'Thắp nến và cầu cho người thân.',hintGarden:'Cùng đọc một chục kinh Mân Côi.',hintBoard:'Lịch thường lệ và thông tin xác nhận.',today:'Lời nguyện hôm nay',read:'Cầu nguyện',listen:'Nghe lời kinh',stop:'Dừng',short:'Một lời cầu nguyện mỗi ngày',prayerSpecial:'Ý nguyện đặc biệt',prayHint:'Thảo và Varun cùng hướng lòng về Chúa.',candleIntro:'Chạm vào một ngọn nến chưa sáng để thắp lên cho người bạn nhớ đến.',intentLabel:'Tên hoặc ý nguyện (chỉ lưu trên thiết bị này)',intentPlaceholder:'Xin cầu nguyện cho…',save:'Lưu riêng tư',saved:'Đã lưu trên thiết bị này.',lit:'Đã thắp sáng',unlit:'Thắp nến',resetCandles:'Thắp lại từ đầu',privacy:'Không có tên hoặc ý nguyện nào được gửi lên máy chủ.',rosaryIntro:'Một chục kinh Mân Côi gồm Kinh Lạy Cha, 10 Kinh Kính Mừng, rồi Kinh Sáng Danh.',rosaryNext:'Hạt tiếp theo',rosaryBack:'Hạt trước',rosaryReset:'Bắt đầu lại',rosaryDone:'Con đã hoàn tất một chục kinh. Amen.',rosaryStep:'Hạt',week:'Giờ lễ thường lệ trong tuần',noConfirmed:'Chưa có giờ lễ được xác nhận riêng cho ngày này.',regular:'Theo lịch thường lệ',notConfirmed:'Lịch thường lệ chưa phải xác nhận cho ngày cụ thể. Các lễ đặc biệt có thể thay đổi.',scheduleUnavailable:'Không có lịch giờ lễ đáng tin cậy cho ngày này.',scheduleStale:'Nguồn lịch chưa được kiểm tra gần đây; vui lòng xác nhận trực tiếp với giáo xứ.',lastChecked:'Lần kiểm tra nguồn:',source:'Nguồn giáo phận',confirmed:'Đã xác nhận cho ngày này',bell:'Tiếng chuông',soundOn:'Âm thanh bật',soundOff:'Âm thanh tắt',viewArt:'Đang xem tranh minh họa',view3D:'Đang xem không gian 3D',coming:'Đang đi tới',arrived:'Đã đến nơi',fallback:'Chế độ minh họa hoạt động trên mọi thiết bị.',prayerBook:'Các kinh khác',ourFather:'Kinh Lạy Cha',hailMary:'Kinh Kính Mừng',glory:'Kinh Sáng Danh',todayMass:'Giờ lễ hôm nay',noTimes:'Chưa có xác nhận',noSpeak:'Thiết bị này không hỗ trợ giọng đọc.',timeVietnam:'Giờ Việt Nam',massDetail:'Lịch Giờ lễ · Kim Hải',close:'Đóng'},
 en:{subtitle:'A little place of peace',welcome:'Tap somewhere to begin your visit.',exploreHint:'Tap to walk · Arrow keys to move',places:'Places',altar:'Altar',candle:'Candles',garden:'Rosary garden',notice:'Mass times',gate:'Parish gate',door:'Church doorway',headGate:'Enter in peace',headDoor:'The door is always open',headAltar:'A moment with God',headCandle:'Light a little hope',headGarden:'One bead at a time',headBoard:'Parish noticeboard',hintGate:'The church is waiting for us.',hintDoor:'Continue inside to pray.',hintAltar:'Take a quiet moment.',hintCandle:'Light a candle for someone dear.',hintGarden:'Pray one decade of the rosary.',hintBoard:'Regular timetable and confirmation information.',today:'Today’s Prayer',read:'Pray together',listen:'Listen to prayer',stop:'Stop',short:'A new prayer each day',prayerSpecial:'Special intention',prayHint:'Thảo and Varun turn their hearts toward God together.',candleIntro:'Tap an unlit candle to light it for someone on your mind.',intentLabel:'Name or intention (saved only on this device)',intentPlaceholder:'Please pray for…',save:'Save privately',saved:'Saved on this device.',lit:'Candle lit',unlit:'Light candle',resetCandles:'Begin again',privacy:'No names or intentions are sent to any server.',rosaryIntro:'One decade of the rosary: the Our Father, ten Hail Marys, then Glory Be.',rosaryNext:'Next bead',rosaryBack:'Previous bead',rosaryReset:'Start again',rosaryDone:'You have completed one decade. Amen.',rosaryStep:'Bead',week:'Regular weekly Mass times',noConfirmed:'No Mass schedule has been confirmed for this specific date.',regular:'Regular weekly listing',notConfirmed:'These are regular weekly times, not a confirmation for today. Special services may differ.',scheduleUnavailable:'No reliable Mass times are available for this date.',scheduleStale:'The source has not been checked recently; please confirm directly with the parish.',lastChecked:'Source last checked:',source:'Diocese source',confirmed:'Confirmed for this date',bell:'Church bell',soundOn:'Sound on',soundOff:'Sound off',viewArt:'Illustrated view',view3D:'3D view',coming:'Walking to',arrived:'Arrived at',fallback:'Illustrated mode works on every device.',prayerBook:'Other prayers',ourFather:'Our Father',hailMary:'Hail Mary',glory:'Glory Be',todayMass:'Today’s Mass',noTimes:'Not confirmed',noSpeak:'Speech is not available on this device.',timeVietnam:'Vietnam time',massDetail:'Mass times · Kim Hải',close:'Close'}
};
let lang=STORE.get('lang','vi')==='en'?'en':'vi', soundOn=false, soundContext=null, chirpTimer=null, currentPlace='gate', currentPanel=null, moving=false, illustrationOnly=STORE.get('illustration',false), m3=null;
let schedule=null, dateOverrides={}, datedIntents={'2026-11-16':'workToday','2026-11-17':'memorialCatTien'}, candleState=STORE.get('candles',[false,false,false,false,false]), rosaryStep=Math.max(0,Math.min(11,Number(STORE.get('rosary',0))||0));
let prayerCacheKey='', lastVNDate='', toastTimeout=0, lastFocus=null;
const PLACES={gate:{x:0,z:17,head:'headGate',hint:'hintGate'},door:{x:0,z:-6.4,head:'headDoor',hint:'hintDoor'},altar:{x:0,z:-17.4,head:'headAltar',hint:'hintAltar'},candle:{x:-3.1,z:-14.7,head:'headCandle',hint:'hintCandle'},garden:{x:9,z:-3.5,head:'headGarden',hint:'hintGarden'},board:{x:-8,z:4.2,head:'headBoard',hint:'hintBoard'}};
const pos={x:0,z:17}, goal={x:0,z:17,place:'gate'}, fallbackPos={gate:[50,91],door:[50,43],altar:[50,76],candle:[50,80],garden:[79,67],board:[21,67]};
const dayNameVi=['Chủ nhật','Thứ hai','Thứ ba','Thứ tư','Thứ năm','Thứ sáu','Thứ bảy'];
const dayNameEn=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
function tr(k){return COPY[lang][k] || k}
function safe(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','"':'&quot;'}[c]))}
function vn(){const d=new Date();const parts=Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Ho_Chi_Minh',year:'numeric',month:'2-digit',day:'2-digit',weekday:'short'}).formatToParts(d).filter(p=>p.type!=='literal').map(p=>[p.type,p.value]));const year=+parts.year,month=+parts.month,day=+parts.day;const weekday=new Date(Date.UTC(year,month-1,day)).getUTCDay();return {year,month,day,weekday,key:year+'-'+String(month).padStart(2,'0')+'-'+String(day).padStart(2,'0')}}
function fmtTime(m){return String(Math.floor(m/60)).padStart(2,'0')+':'+String(m%60).padStart(2,'0')}
function todaySchedule(){
 const d=vn(), override=dateOverrides[d.key], weekly=schedule&&schedule.weekly;
 if(override?.confirmed===true && Array.isArray(override.times))return {times:override.times,confirmed:true,source:override.source||null};
 if(weekly&&Array.isArray(weekly[String(d.weekday)]))return {times:weekly[String(d.weekday)],confirmed:false};
 return {times:[],confirmed:false};
}
function stale(){if(!schedule?.last_checked_at)return true;return Date.now()-new Date(schedule.last_checked_at).getTime()>72*3600000}
function dayPrayer(){
 const d=vn(), key=datedIntents[d.key], matched=key&&DATA.prayers[key]?.[lang];if(matched)return {...matched,special:true};
 const themes=DATA.dailyThemes || [], theme=themes[d.day-1]?.[lang];
 if(theme){return {title:(lang==='vi'?'Lời nguyện ngày ':'Prayer for ')+d.day+'/'+d.month+' · '+theme.title,body:(lang==='vi'?'Lạy Chúa Giêsu,\n':'Dear Lord Jesus,\n')+theme.body+(lang==='vi'?'\nXin ở bên chúng con hôm nay và luôn mãi.\nAmen.':'\nStay with us today and always.\nAmen.'),special:false}}
 return DATA.prayers.together?.[lang] || {title:tr('today'),body:'Amen.'};
}
function toast(msg){const t=$('toast');t.textContent=msg;t.classList.add('show');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>t.classList.remove('show'),2600)}
function updateLocale(){
 document.documentElement.lang=lang;
 document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=tr(el.dataset.i18n));
 $('langVi').setAttribute('aria-pressed',String(lang==='vi'));$('langEn').setAttribute('aria-pressed',String(lang==='en'));
 $('audioBtn').setAttribute('aria-label',soundOn?tr('soundOn'):tr('soundOff'));$('audioBtn').setAttribute('aria-pressed',String(soundOn));
 $('viewBtn').setAttribute('aria-label',m3?.active?tr('view3D'):tr('viewArt'));
 renderHeading();renderScheduleChip();
 if(currentPanel)renderPanel(currentPanel);
}
function renderHeading(){const place=PLACES[currentPlace];$('locationTag').textContent=(lang==='vi'?'GIÁO XỨ KIM HẢI · ':'KIM HẢI PARISH · ')+tr(currentPlace).toUpperCase();$('sceneHeading').textContent=tr(place.head);$('sceneSubtitle').textContent=tr(place.hint);}
function renderScheduleChip(){
 const m=todaySchedule(), times=m.times.filter(x=>Number.isInteger(x)&&x>=0&&x<1440);
 $('entranceMassLabel').textContent=tr('todayMass')+' · '+tr('timeVietnam');
 $('entranceMassTimes').textContent=times.length?times.map(fmtTime).join(' · '):tr('noTimes');
 $('entranceMassNotice').textContent=m.confirmed?tr('confirmed'):tr('noConfirmed');
}
async function loadSchedules(){
 try{const [s,o,i]=await Promise.all([fetch('mass-schedule.json?ts='+Math.floor(Date.now()/1800000),{cache:'no-store'}).then(x=>{if(!x.ok)throw Error('schedule');return x.json()}),fetch('mass-date-overrides.json',{cache:'no-store'}).then(x=>x.ok?x.json():{}),fetch('special-intentions.json',{cache:'no-store'}).then(x=>x.ok?x.json():{})]);if(s.weekly&&s.timezone==='Asia/Ho_Chi_Minh')schedule=s;
 if(o&&typeof o==='object')dateOverrides=o;
 if(i&&typeof i==='object')datedIntents={...datedIntents,...i};
 }catch(e){console.warn('Schedule unavailable; not inventing Mass times.',e)}renderScheduleChip();if(currentPanel==='board')renderPanel('board');
}
function setPlace(place){if(!PLACES[place])return;currentPlace=place;renderHeading();document.querySelectorAll('[data-go]').forEach(el=>el.classList.toggle('is-current',el.dataset.go===place))}
function openPanel(place){
 if(!['altar','candle','garden','board'].includes(place))return;
 stopSpeech();lastFocus=document.activeElement;currentPanel=place;renderPanel(place);
 $('scrim').hidden=false;$('app').classList.add('has-sheet');$('sheet').classList.add('is-open');$('sheet').setAttribute('aria-hidden','false');$('sheetClose').focus();$('placesMenu').hidden=true;$('placesBtn').setAttribute('aria-expanded','false');
}
function closePanel(){currentPanel=null;stopSpeech();$('sheet').classList.remove('is-open');$('app').classList.remove('has-sheet');$('sheet').setAttribute('aria-hidden','true');$('scrim').hidden=true;lastFocus?.focus?.()}
function el(tag,html='',cls=''){const x=document.createElement(tag);x.className=cls;x.innerHTML=html;return x}
function renderPanel(place){
 $('sheetEyebrow').textContent=place==='altar'?'✝ · '+tr('today'):place==='candle'?'🕯 · '+tr('candle'):place==='garden'?'✿ · '+tr('garden'):'▤ · '+tr('notice');
 $('sheetTitle').textContent=tr(place==='altar'?'today':place==='board'?'massDetail':place);
 const area=$('sheetContent');area.innerHTML='';
 if(place==='altar')renderPrayer(area);
 if(place==='candle')renderCandles(area);
 if(place==='garden')renderRosary(area);
 if(place==='board')renderBoard(area);
}
function renderPrayer(area){
 const p=dayPrayer(), desc=el('p','', 'subtle');desc.textContent=p.special?tr('prayerSpecial'):tr('short');area.append(desc);
 const title=el('h3','', 'prayer-title');title.textContent=p.title;title.style.font='600 17px Georgia,serif';title.style.margin='20px 0 0';area.append(title);
 const paper=el('div','','prayer-sheet');paper.textContent=p.body;area.append(paper);
 const row=el('div','','actions'),listen=el('button','🔊 '+tr('listen'),'button-primary'),stop=el('button',tr('stop'),'button-quiet');
 listen.type='button';stop.type='button';listen.onclick=()=>speak(p.body);stop.onclick=stopSpeech;row.append(listen,stop);area.append(row);
 const note=el('p','','subtle');note.textContent=tr('prayHint');area.append(note);
 const other=el('details');const summary=el('summary','', 'other-summary');summary.textContent=tr('prayerBook');other.append(summary);
 ['together','ourfather','hailmary','glory','communion','memorialCatTien','workToday'].forEach(k=>{const q=DATA.prayers[k]?.[lang];if(!q)return;const b=el('button','', 'button-quiet');b.type='button';b.style.margin='5px';b.style.padding='9px 12px';b.textContent=q.title;b.onclick=()=>{paper.textContent=q.body;title.textContent=q.title;listen.onclick=()=>speak(q.body)};other.append(b)});area.append(other);
}
function renderCandles(area){
 area.replaceChildren();
 const intro=el('p');intro.textContent=tr('candleIntro');area.append(intro);
 const rack=el('div','','candles');rack.setAttribute('role','group');rack.setAttribute('aria-label',tr('candle'));
 for(let i=0;i<5;i++){const b=el('button','','candle-unit'+(candleState[i]?' lit':''));b.type='button';b.setAttribute('aria-label',(candleState[i]?tr('lit'):tr('unlit'))+' '+(i+1));b.innerHTML='<span class="wax"><span class="flame"></span></span><span>'+(i+1)+'</span>';b.onclick=()=>{if(!candleState[i]){candleState[i]=true;STORE.set('candles',candleState);renderCandles(area);chime(550);toast(tr('lit'))}};rack.append(b)}area.append(rack);
 const label=el('label');label.textContent=tr('intentLabel');label.htmlFor='intention';area.append(label);
 const input=el('textarea');input.id='intention';input.maxLength=400;input.placeholder=tr('intentPlaceholder');input.value=STORE.get('intention','');area.append(input);
 const actions=el('div','','actions'),save=el('button',tr('save'),'button-primary'),reset=el('button',tr('resetCandles'),'button-quiet');
 save.type='button';reset.type='button';save.onclick=()=>{STORE.set('intention',input.value);toast(tr('saved'))};reset.onclick=()=>{candleState=[false,false,false,false,false];STORE.set('candles',candleState);renderCandles(area)};actions.append(save,reset);area.append(actions);
 const note=el('p','','subtle');note.textContent='🔒 '+tr('privacy');area.append(note);
}
function rosaryPrayer(){
 const key=rosaryStep===0?'ourfather':rosaryStep===11?'glory':'hailmary';
 return DATA.prayers[key]?.[lang] || {title:tr(key),body:'Amen.'};
}
function renderRosary(area){
 area.replaceChildren();
 const intro=el('p');intro.textContent=tr('rosaryIntro');area.append(intro);
 const wrap=el('div','','rosary-beads');for(let i=0;i<12;i++){const b=el('button',String(i===0?'✝':i===11?'✣':i),'bead'+(i<rosaryStep?' done':'')+(i===rosaryStep?' active':''));b.type='button';b.setAttribute('aria-label',tr('rosaryStep')+' '+(i+1));b.setAttribute('aria-current',String(i===rosaryStep));b.onclick=()=>{rosaryStep=i;STORE.set('rosary',rosaryStep);renderRosary(area)};wrap.append(b)}area.append(wrap);
 const q=rosaryPrayer(),label=el('p','','subtle');label.textContent=(rosaryStep+1)+'/12 · '+q.title;area.append(label);
 const paper=el('div','','prayer-sheet');paper.textContent=q.body;area.append(paper);
 const actions=el('div','','actions'),prev=el('button','‹ '+tr('rosaryBack'),'button-quiet'),next=el('button',tr('rosaryNext')+' ›','button-primary'),reset=el('button',tr('rosaryReset'),'button-quiet');
 prev.type=next.type=reset.type='button';prev.disabled=rosaryStep===0;next.disabled=rosaryStep===11;
 prev.onclick=()=>{rosaryStep=Math.max(0,rosaryStep-1);STORE.set('rosary',rosaryStep);renderRosary(area)};
 next.onclick=()=>{rosaryStep=Math.min(11,rosaryStep+1);STORE.set('rosary',rosaryStep);renderRosary(area);if(rosaryStep===11)toast(tr('rosaryDone'))};
 reset.onclick=()=>{rosaryStep=0;STORE.set('rosary',rosaryStep);renderRosary(area)};
 actions.append(prev,next,reset);area.append(actions);
}
function renderBoard(area){
 const d=vn(),m=todaySchedule(),p=el('p','','subtle');p.textContent=d.key+' · '+tr('timeVietnam');area.append(p);
 const box=el('div','','schedule-day');const heading=el('strong');heading.textContent=m.times.length?m.times.map(fmtTime).join(' · '):tr('noTimes');const caption=el('small');caption.textContent=m.confirmed?tr('confirmed'):tr('noConfirmed');box.append(heading,caption);area.append(box);
 if(!m.confirmed){const warn=el('p','','notice-warning');warn.textContent=tr('notConfirmed');area.append(warn)}
 if(stale()){const warn=el('p','','notice-warning');warn.textContent=tr('scheduleStale');area.append(warn)}
 const h=el('h3');h.textContent=tr('week');area.append(h);const rows=el('div','','week-rows');
 for(let day=0;day<7;day++){const row=el('div','','week-row'+(day===d.weekday?' today':'')),n=el('span');n.textContent=(lang==='vi'?dayNameVi:dayNameEn)[day];const time=el('span');time.textContent=(schedule?.weekly?.[String(day)]||[]).map(fmtTime).join(' · ') || '—';row.append(n,time);rows.append(row)}area.append(rows);
 if(schedule?.last_checked_at){const checked=el('p','','subtle');checked.textContent=tr('lastChecked')+' '+new Intl.DateTimeFormat(lang==='vi'?'vi-VN':'en-GB',{timeZone:'Asia/Ho_Chi_Minh',dateStyle:'medium',timeStyle:'short'}).format(new Date(schedule.last_checked_at));area.append(checked)}
 const link=el('a');link.href=schedule?.source_url||'https://www.giaophanbaria.org/';link.target='_blank';link.rel='noopener noreferrer';link.textContent=tr('source')+' ↗';area.append(link);
}
function speak(str){if(!('speechSynthesis'in window)){toast(tr('noSpeak'));return}stopSpeech();const u=new SpeechSynthesisUtterance(str);u.lang=lang==='vi'?'vi-VN':'en-US';u.rate=.86;const voice=speechSynthesis.getVoices().find(v=>v.lang.toLowerCase().startsWith(lang));if(voice)u.voice=voice;speechSynthesis.speak(u)}
function stopSpeech(){if('speechSynthesis'in window)speechSynthesis.cancel()}
function chime(freq=610){if(!soundOn)return;try{soundContext ||= new (window.AudioContext||window.webkitAudioContext)();soundContext.resume();const o=soundContext.createOscillator(),g=soundContext.createGain(),t=soundContext.currentTime;o.type='sine';o.frequency.setValueAtTime(freq,t);o.frequency.exponentialRampToValueAtTime(freq*.84,t+.7);g.gain.setValueAtTime(.001,t);g.gain.exponentialRampToValueAtTime(.045,t+.03);g.gain.exponentialRampToValueAtTime(.001,t+1.5);o.connect(g).connect(soundContext.destination);o.start(t);o.stop(t+1.6)}catch{}}
function bird(){if(!soundOn)return;try{soundContext ||= new(window.AudioContext||window.webkitAudioContext)();soundContext.resume();const t=soundContext.currentTime;for(let n=0;n<3;n++){const o=soundContext.createOscillator(),g=soundContext.createGain();o.type='sine';o.frequency.setValueAtTime(1500+n*140,t+n*.18);o.frequency.exponentialRampToValueAtTime(2650+n*100,t+n*.25);o.frequency.exponentialRampToValueAtTime(1300,t+n*.35);g.gain.setValueAtTime(.001,t+n*.18);g.gain.linearRampToValueAtTime(.018,t+n*.21);g.gain.exponentialRampToValueAtTime(.001,t+n*.37);o.connect(g).connect(soundContext.destination);o.start(t+n*.18);o.stop(t+n*.39)}}catch{}}
function toggleSound(){soundOn=!soundOn;clearInterval(chirpTimer);if(soundOn){chime(540);setTimeout(bird,700);chirpTimer=setInterval(bird,6600)}else{soundContext?.suspend?.()}updateLocale()}
function navigate(place){if(!PLACES[place])return;closePlaces();if(currentPanel)closePanel();setPlace(place);goal.x=PLACES[place].x;goal.z=PLACES[place].z;goal.place=place;moving=true;toast(tr('coming')+' '+tr(place));
 if(!m3?.active){paintFallback(place);if(['altar','candle','garden','board'].includes(place))setTimeout(()=>openPanel(place),450);moving=false;return}
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){pos.x=goal.x;pos.z=goal.z;moving=false;m3?.onArrival?.(place);if(['altar','candle','garden','board'].includes(place))openPanel(place)}
}
function closePlaces(){$('placesMenu').hidden=true;$('placesBtn').setAttribute('aria-expanded','false')}
function paintFallback(place){
 $('fallbackInterior').style.display=place==='altar'?'':'none';
 const el=$('fallbackPeople'),coords=fallbackPos[place]||fallbackPos.gate;el.setAttribute('transform','translate('+coords[0]*9+' '+coords[1]*9.2+')');
}
function makeMarkers(){const holder=$('sceneMarkers');const points=['door','altar','candle','garden','board'];points.forEach(id=>{const b=el('button','','scene-marker');b.type='button';b.dataset.marker=id;b.dataset.go=id;b.textContent=(id==='altar'?'✝ ':id==='candle'?'🕯 ':id==='garden'?'✿ ':id==='board'?'▤ ':'⌂ ')+tr(id);b.onclick=()=>navigate(id);holder.append(b)});updateMarkers()}
function updateMarkers(){
 document.querySelectorAll('[data-marker]').forEach(b=>{const id=b.dataset.marker;const x=PLACES[id].x,z=PLACES[id].z;
 b.textContent=(id==='altar'?'✝ ':id==='candle'?'🕯 ':id==='garden'?'✿ ':id==='board'?'▤ ':'⌂ ')+tr(id);
 if(m3?.active&&m3.project){const xy=m3.project(x,z);b.hidden=!xy||!xy.visible;if(xy){b.style.left=xy.x+'px';b.style.top=xy.y+'px'}}else{const [xp,yp]=fallbackPos[id];b.hidden=false;b.style.left=xp+'%';b.style.top=yp+'%'}b.classList.toggle('is-near',id===currentPlace)
 });
}
function checkVietnamMidnight(){const date=vn().key;if(date!==lastVNDate){lastVNDate=date;renderScheduleChip();if(currentPanel==='altar'||currentPanel==='board')renderPanel(currentPanel)}}
function bindUI(){
 $('langVi').onclick=()=>{lang='vi';STORE.set('lang',lang);updateLocale();updateMarkers()};
 $('langEn').onclick=()=>{lang='en';STORE.set('lang',lang);updateLocale();updateMarkers()};
 $('audioBtn').onclick=toggleSound;
 $('viewBtn').onclick=()=>{illustrationOnly=!illustrationOnly;STORE.set('illustration',illustrationOnly);if(m3){m3.active=!illustrationOnly;$('webglStage').hidden=illustrationOnly;$('illustrationStage').hidden=!illustrationOnly}else{$('webglStage').hidden=true;$('illustrationStage').hidden=false;illustrationOnly=true}updateLocale();updateMarkers();toast(m3?.active?tr('view3D'):tr('viewArt'))};
 $('placesBtn').onclick=()=>{const next=$('placesMenu').hidden;$('placesMenu').hidden=!next;$('placesBtn').setAttribute('aria-expanded',String(next))};
 $('closePlaces').onclick=closePlaces;
 document.querySelectorAll('[data-go]:not([data-marker])').forEach(b=>b.onclick=()=>navigate(b.dataset.go));
 $('entranceMassOpen').onclick=()=>navigate('board');
 $('sheetClose').onclick=closePanel;$('scrim').onclick=closePanel;
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(currentPanel)closePanel();else closePlaces();return}if(currentPanel||['INPUT','TEXTAREA','BUTTON'].includes(document.activeElement?.tagName))return;if(!m3?.active)return;const dir={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0]}[e.key];if(dir){e.preventDefault();pos.x=Math.max(-13,Math.min(13,pos.x+dir[0]*1.5));pos.z=Math.max(-22,Math.min(19,pos.z+dir[1]*1.5));goal.x=pos.x;goal.z=pos.z;moving=false}});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stopSpeech();else checkVietnamMidnight()});
}
async function init3D(){
 if(illustrationOnly || !window.WebGLRenderingContext)return;
 try{const c=document.createElement('canvas'),gl=c.getContext('webgl2',{antialias:false})||c.getContext('webgl',{antialias:false});if(!gl)return;gl.getExtension?.('WEBGL_lose_context')?.loseContext?.();}catch{return}
 let THREE;
 try{THREE=await import('https://cdn.jsdelivr.net/npm/three@0.170.0/build/three.module.js')}catch(e){console.warn('Using illustrated scene; 3D library unavailable.',e);return}
 if(illustrationOnly)return;
 try {
 const stage=$('webglStage'),width=stage.clientWidth,height=stage.clientHeight,scene=new THREE.Scene();scene.background=new THREE.Color(0xb4c8c0);scene.fog=new THREE.FogExp2(0xb4c8c0,.016);
 const renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.7));renderer.setSize(width,height);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;renderer.shadowMap.enabled=false;stage.appendChild(renderer.domElement);
 const camera=new THREE.PerspectiveCamera(width<700?53:48,width/height,.1,150);camera.position.set(8,13,32);camera.lookAt(0,1,4);
 const hemisphere=new THREE.HemisphereLight(0xfff2d8,0x516c60,2);scene.add(hemisphere);
 const sun=new THREE.DirectionalLight(0xffcb8f,2.1);sun.position.set(-11,24,-13);scene.add(sun);
 const mat=(color,roughness=1)=>new THREE.MeshStandardMaterial({color,roughness});
 const ground=mat(0x7c9c78),stone=mat(0xd7c5a6),stoneEdge=mat(0xb5ad96),wall=mat(0xe6cfaa),trim=mat(0xf7e4bf),roof=mat(0x966458),timber=mat(0x5e4a3f),doorMat=mat(0x3d4f44),glass=mat(0x7da8a3,.35),dark=mat(0x3d504c),green=mat(0x486b53),green2=mat(0x6a906c),gold=mat(0xc49c5c),wax=mat(0xf6ecd4),flameMat=new THREE.MeshBasicMaterial({color:0xffbd68}),bronze=mat(0x947c62);
 const box=(w,h,d,x,y,z,m,group=scene)=>{const o=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);group.add(o);return o};
 const sph=(r,x,y,z,m,group=scene)=>{const o=new THREE.Mesh(new THREE.IcosahedronGeometry(r,1),m);o.position.set(x,y,z);group.add(o);return o};
 const cyl=(top,bottom,h,x,y,z,m,group=scene)=>{const o=new THREE.Mesh(new THREE.CylinderGeometry(top,bottom,h,8),m);o.position.set(x,y,z);group.add(o);return o};
 const cone=(r,h,x,y,z,m,group=scene)=>{const o=new THREE.Mesh(new THREE.ConeGeometry(r,h,5),m);o.position.set(x,y,z);group.add(o);return o};
 box(90,.13,90,0,-.15,-2,ground);
 // Courtyard paving and central stone walkway.
 for(let z=-7;z<19;z+=1.65){for(let x=-1.65;x<1.9;x+=1.45){const j=Math.sin(z*3+x*11)*.08;box(1.38,.045,1.52,x+j,-.065,z,Math.abs(Math.floor(z*1.7+x))%3===0?stoneEdge:stone)}}
 for(let i=0;i<9;i++){const zz=10-i*3.2;for(const side of [-1,1]){cyl(.12,.16,.55,side*2.6,.22,zz,bronze);sph(.23,side*2.6,.61,zz,mat(0xf4d9aa));}}
 // Forest trees.
 function tree(x,z,s=1){cyl(.17*s,.25*s,2.2*s,x,1.05*s,z,timber);sph(1.25*s,x,2.7*s,z,green);sph(1.05*s,x-.65*s,2.1*s,z+.2*s,green2);sph(.86*s,x+.61*s,2.26*s,z-.36*s,green)}
 [-13,-10,-7,7,10,13].forEach((x,i)=>{tree(x,13-(i%3)*5,.75+(i%2)*.3);tree(x,0-(i%2)*6,.85)});
 // Church foundation and entrance: interpretation, not claimed exact measured architecture.
 box(14,.3,19,0,.01,-16,stoneEdge);
 const frontPieces=[];
 frontPieces.push(box(1.1,5.7,.6,-6.45,2.9,-7.05,wall),box(1.1,5.7,.6,6.45,2.9,-7.05,wall));
 frontPieces.push(box(4.6,5.7,.65,-3.65,2.9,-7.05,wall),box(4.6,5.7,.65,3.65,2.9,-7.05,wall));
 frontPieces.push(box(3,1.8,.7,0,5.15,-7.05,wall));const eaves=box(14,1,19,0,6.15,-16,trim);
 box(.7,5.6,19,-6.65,2.8,-16,wall);box(.7,5.6,19,6.65,2.8,-16,wall);box(14,5.8,.65,0,2.9,-25.35,wall);
 // Sculpted roof planes can fade out indoors to keep altar and characters visible.
 const roofs=[];
 for(const side of [-1,1]){const r=box(7.6,.45,19,side*3.5,8.15,-16,roof);r.rotation.z=side*-.37;roofs.push(r)}
 const belfry=box(2.7,4.4,3.0,0,9.7,-7.0,wall);const cap=cone(2.5,2.5,0,13.2,-7.0,roof);roofs.push(cap,belfry,eaves);
 roofs.push(box(.12,1.6,.12,0,15.2,-7,bronze),box(1.15,.12,.12,0,15.58,-7,bronze));
 // Front pointed arch, open door and decorative windows.
 for(let side of [-1,1]){frontPieces.push(box(.16,3.65,.16,side*1.62,1.85,-6.61,trim),box(.55,2.6,.11,side*4.6,2.7,-6.68,glass),box(.69,.12,.14,side*4.6,4.08,-6.6,trim));
 for(let z of [-12,-18,-22]){box(.13,2.3,.85,side*6.23,3.6,z,glass)}}
 frontPieces.push(box(3.3,.14,.2,0,3.76,-6.65,trim));box(.22,3.4,.2,0,1.7,-25.03,gold);box(1.7,.24,.2,0,2.5,-25.02,gold);
 // Interior altar, benches, open Bible and permanent votive flames.
 box(3.7,.17,1.55,0,1.25,-22,stone);for(const x of [-1.5,1.5])box(.25,1.2,1.15,x,.62,-22,trim);
 box(.7,.05,.48,-.1,1.38,-21.7,wax);box(.67,.04,.47,.55,1.4,-21.7,wax);
 for(const x of [-1.58,1.58]){cyl(.09,.1,.52,x,1.58,-21.78,wax);sph(.12,x,1.94,-21.78,flameMat)}
 for(const z of [-12,-15.5,-18.5])for(const x of [-3.1,3.1]){box(2.25,.25,.72,x,.74,z,timber);box(2.25,.24,.17,x,1.24,z-.4,timber)}
 const crucifix=box(.23,3.5,.24,0,4.25,-25.05,bronze);box(2.1,.2,.24,0,4.65,-25.05,bronze);
 // Candle stand.
 box(1.85,.16,.7,-3.7,.85,-19,bronze);for(let i=0;i<4;i++){const x=-4.35+i*.45;cyl(.10,.12,.44,x,1.16,-19,wax);sph(.11,x,1.52,-19,flameMat)}
 // Garden arch, blue Mary sculpture, and flowers.
 const mary=mat(0xa8c8cf);cyl(.6,.8,1.5,9,.7,-3,mary);sph(.39,9,1.65,-3,mary);cone(.9,1.75,9,1.3,-3,mary);
 for(let i=0;i<15;i++){const a=i*2.4;const rr=2.7+(i%3)*.38;let xx=9+Math.cos(a)*rr,zz=-3+Math.sin(a)*rr;cyl(.03,.03,.32,xx,.16,zz,green2);sph(.17,xx,.39,zz,i%2?mat(0xd3ac94):mat(0xf2d8aa))}
 // Wooden schedule board.
 for(const x of [-8.9,-7.1])box(.19,2.25,.19,x,1.11,4.5,timber);
 box(2.5,1.6,.22,-8,2.08,4.5,bronze);box(2.17,1.31,.06,-8,2.08,4.67,stone);
 // Entrance iron gate and corner pillars.
 for(const x of [-3.3,3.3])box(.57,2.4,.57,x,1.2,19,trim);
 for(let x=-2.8;x<2.9;x+=.53)box(.055,1.15,.08,x,.6,19,dark);
 // Two small original walking characters.
 function figure(color,hair){const g=new THREE.Group();sph(.27,0,1.4,0,mat(0xc99a79),g);sph(.29,0,1.61,-.06,mat(hair),g);box(.5,.68,.3,0,.87,0,mat(color),g);for(const x of [-.14,.14])box(.15,.48,.16,x,.28,0,dark,g);for(const x of [-.38,.38])box(.12,.53,.15,x,.85,0,mat(0xc99a79),g);scene.add(g);return g}
 const a=figure(0xf5f0de,0x292e32),b=figure(0xb9867e,0x322825);
 // Lightly animated steps, not an exact likeness.
 const plane=new THREE.Plane(new THREE.Vector3(0,1,0),0),ray=new THREE.Raycaster(),pointer=new THREE.Vector2(),vec=new THREE.Vector3();
 const clock=new THREE.Clock();let last=performance.now();
 function resize(){const w=stage.clientWidth,h=stage.clientHeight;if(w<=0||h<=0)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.fov=w<700?56:48;camera.updateProjectionMatrix();updateMarkers()}window.addEventListener('resize',resize,{passive:true});
 renderer.domElement.addEventListener('pointerup',e=>{if(currentPanel||Math.abs(e.movementX)>10)return;const rect=renderer.domElement.getBoundingClientRect();pointer.set((e.clientX-rect.left)/rect.width*2-1,-(e.clientY-rect.top)/rect.height*2+1);ray.setFromCamera(pointer,camera);const hit=ray.ray.intersectPlane(plane,vec);if(hit){goal.x=Math.max(-12,Math.min(12,vec.x));goal.z=Math.max(-22,Math.min(18,vec.z));goal.place='';moving=true}});
 function project(x,z){const p=new THREE.Vector3(x,2.5,z).project(camera);return{x:(p.x*.5+.5)*stage.clientWidth,y:(-p.y*.5+.5)*stage.clientHeight,visible:p.z>-1&&p.z<1&&p.x>-1.3&&p.x<1.3&&p.y>-1.3&&p.y<1.3}}
 let lastMarker=0;
 function frame(){
  if(!document.body.contains(renderer.domElement))return;
  requestAnimationFrame(frame);
  const now=performance.now(),dt=Math.min(.06,(now-last)/1000||.016);last=now;
  if(!m3.active)return;
  if(moving){const dx=goal.x-pos.x,dz=goal.z-pos.z,dist=Math.hypot(dx,dz);if(dist<.18){pos.x=goal.x;pos.z=goal.z;moving=false;const place=goal.place;if(place){setPlace(place);if(['altar','candle','garden','board'].includes(place)&&!currentPanel)openPanel(place);if(place==='door')toast(tr('hintDoor'))}}else{const step=Math.min(dist,dt*9);pos.x+=dx/dist*step;pos.z+=dz/dist*step}}
  const bob=moving?Math.sin(now*.015)*.07:Math.sin(now*.0013)*.017;
  a.position.set(pos.x-.31,bob,pos.z);b.position.set(pos.x+.31,bob,pos.z+.2);
  if(moving){const theta=Math.atan2(goal.x-pos.x,-(goal.z-pos.z));a.rotation.y=b.rotation.y=theta}
  const indoor=pos.z<-8.2;roofs.forEach(r=>r.visible=!indoor);frontPieces.forEach(r=>r.visible=!indoor);
  const targetCam=new THREE.Vector3(pos.x+(indoor?2.5:5.8),indoor?4.3:10.4,pos.z+(indoor?3.0:15));camera.position.lerp(targetCam,1-Math.pow(.018,dt*4.8));
  const aim=new THREE.Vector3(pos.x,indoor?2.15:1.7,pos.z-(indoor?4.2:9));camera.lookAt(aim);
  renderer.render(scene,camera);
  if(now-lastMarker>180){lastMarker=now;updateMarkers()}
 }
 m3={active:true,project,onArrival:(place)=>{if(['altar','candle','garden','board'].includes(place))openPanel(place)}};
 $('webglStage').hidden=false;$('illustrationStage').hidden=true;
 updateLocale();updateMarkers();resize();frame();
 }
catch(e){console.error('3D unavailable; keeping illustration.',e);$('webglStage').hidden=true;$('illustrationStage').hidden=false}
}
function init(){
 bindUI();makeMarkers();updateLocale();paintFallback('gate');lastVNDate=vn().key;loadSchedules();
 setInterval(checkVietnamMidnight,12000);setInterval(loadSchedules,30*60*1000);
 init3D();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
