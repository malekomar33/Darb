'use strict';
const dictionary = {
  skip:['انتقل للمحتوى','Skip to content'],home:['الرئيسية','Home'],planner:['مخطط رحلتي','My itinerary'],passport:['جوازي الرقمي','My passport'],start:['ابدأ حكايتك','Start exploring'],eyebrow:['ليست مجرد رحلة، إنها حكايتك','MORE THAN A JOURNEY. YOUR STORY.'],heroTitle:['للأردن حكايات أخرى.<br>اكتشف دربك إليها.','There is more to Jordan.<br>Find your own way.'],heroText:['خلف كل وجهة مشهورة، مكان ينتظر أن تكتشفه. اصنع رحلة تشبهك، واتبع فضولك إلى الأردن الذي لم تعرفه بعد.','Beyond every famous landmark, another discovery awaits. Make a journey your own, and follow your curiosity into a different Jordan.'],heroFoot:['من أهل المكان، إلى قلب الحكاية','Local roots. Unforgettable stories.'],yourTrip:['خطوتك الأولى','YOUR FIRST STEP'],formTitle:['أي درب يشبهك؟','Where will curiosity take you?'],formText:['بضع تفاصيل، والكثير من الاكتشافات.','A few details. A world of discoveries.'],duration:['مدة رحلتك','Trip length'],oneDay:['يوم واحد','1 day'],threeDays:['٣ أيام','3 days'],fiveDays:['٥ أيام','5 days'],budget:['ميزانية الأنشطة للشخص','Activity budget per person'],interests:['ما الذي يوقظ فضولك؟','What sparks your curiosity?'],adventure:['↗ مغامرة وطبيعة','↗ Nature & adventure'],history:['⌑ تاريخ وحكايات','⌑ History & stories'],local:['☕ تجارب محلية','☕ Local experiences'],build:['اكتشف دربي الخاص ←','Build my journey →'],noAccount:['بلا تسجيل. رحلتك محفوظة على هذا المتصفح.','No sign-up. Your journey stays in this browser.'],petra:['البتراء، الأردن','Petra, Jordan'],strip1:['✧ أماكن تستحق أن تُروى','✧ Places with a story'],strip2:['⌁ دروب على مقاس فضولك','⌁ Follow your curiosity'],strip3:['♡ تجارب بروح أهلها','♡ Experiences with local soul'],beyond:['بعيدًا عن المألوف','BEYOND THE FAMILIAR'],destTitle:['أماكن صغيرة. حكايات كبيرة.','Hidden places. Remarkable stories.'],destText:['اترك زحام الوجهات المعتادة، وامنح فضولك مساحة.','Take the quieter road. Make room for discovery.'],discover:['اكتشف','DISCOVER'],all:['كل الدروب','All places'],nature:['طبيعة ومغامرة','Nature'],heritage:['تاريخ وتراث','Heritage'],localShort:['حياة محلية','Local life'],saved:['المفضلة ♡','Saved ♡'],threads:['خيوط المكان','CONNECTED STORIES'],storyTitle:['كل مكان، بداية لحكاية أخرى.','Every place leads to another story.'],storyText:['اتبع خيط الماء من قنوات البتراء إلى واحة الأزرق. روابط موضوعية تفتح لك أبوابًا جديدة للاستكشاف.','Follow the theme of water from Petra’s channels to Azraq’s oasis. Discover places through the stories they share.'],follow:['اتبع الخيط ←','Follow the thread →'],madeForYou:['مساحة للاكتشاف','ROOM FOR DISCOVERY'],planTitle:['دربك القادم يبدأ هنا.','Your next journey starts here.'],planIntro:['اقتراح أولي حسب اهتماماتك وميزانية الأنشطة. رتّب التنقل والمبيت قبل الانطلاق.','An initial suggestion based on your interests and activity budget. Arrange transport and accommodation before you go.'],edit:['تعديل رحلتي','Edit my trip'],memories:['أماكن تزورها، وحكايات تبقى','PLACES YOU VISIT. STORIES YOU KEEP.'],passportTitle:['جوازك إلى الاكتشاف.','Your passport to discovery.'],passportIntro:['سجّل زياراتك يدويًا واجمع ذكريات دربك. هذه الأختام شخصية وليست إثبات حضور موثقًا.','Log visits manually and collect memories. These personal stamps are not verified proof of attendance.'],footer:['صُنع بشغف للأردن، ولكل من يسلك دربًا جديدًا.','Made with love for Jordan, and everyone taking a new path.'],localData:['بياناتك محفوظة في هذا المتصفح فقط.','Your data is stored only in this browser.']
};
const places = [
 {id:'dana',name:['ضانا · على حافة الحكاية','Dana · On the edge of wonder'],region:['الطفيلة، الجنوب','Tafilah · South'],type:'adventure',cost:15,icon:'❋',image:'photo-1454496522488-7a8e488e8606',desc:['قرية حجرية وإطلالات واسعة تدعوك إلى التمهّل واكتشاف دروب الطبيعة.','A stone village and wide horizons invite you to slow down and explore.'],thread:['الطبيعة والتكيّف مع شح المياه يجمعان ضانا والأزرق ووادي رم.','Dana, Azraq and Wadi Rum share a story of nature adapting to scarce water.'],related:['azraq','rum']},
 {id:'umm',name:['أم قيس · ملتقى الأفق والحضارات','Umm Qais · Horizons & history'],region:['إربد، الشمال','Irbid · North'],type:'history',cost:8,icon:'⌑',image:'photo-1699303784329-9d95b2fbf54f',desc:['بين حجارة البازلت والمشاهد المفتوحة، مساحة لحكايات الشمال وتاريخه.','Discover northern Jordan through basalt ruins and sweeping landscapes.'],thread:['من أم قيس إلى السلط: طرق مختلفة لقراءة العمارة وحياة الناس عبر الزمن.','From Umm Qais to As-Salt: explore architecture and everyday life across time.'],related:['salt','azraq']},
 {id:'salt',name:['السلط · حكاية في كل زقاق','As-Salt · A story in every lane'],region:['البلقاء، الوسط','Balqa · Central'],type:'local',cost:12,icon:'☕',image:'photo-1548786811-dd6e453ccca7',desc:['تمشَّ بين البيوت القديمة، وتوقف لتذوق شيء محلي والتعرف إلى روح المدينة.','Wander old streets, try a local bite and discover the spirit of the city.'],thread:['حكايات الناس جزء من المكان؛ أكمل رحلتك بين عمارة أم قيس وقرية ضانا.','People shape a place. Continue through Umm Qais and the village of Dana.'],related:['umm','dana']},
 {id:'azraq',name:['الأزرق · حكاية الماء في الصحراء','Azraq · Water in the desert'],region:['الزرقاء، الشرق','Zarqa · East'],type:'adventure',cost:10,icon:'≈',image:'photo-1501785888041-af3ef285b470',desc:['اكتشف كيف يصنع الماء حياة مختلفة وسط الصحراء، وافتح نافذة على الطبيعة.','Explore how water creates a different world amid a desert landscape.'],thread:['خيط موضوعي عن الماء: من واحة الأزرق إلى قنوات البتراء وبيئة وادي رم.','A thematic water trail: from Azraq’s oasis to Petra’s channels and Wadi Rum’s desert.'],related:['petra','rum']},
 {id:'rum',name:['وادي رم · ما وراء المشهد','Wadi Rum · Beyond the view'],region:['العقبة، الجنوب','Aqaba · South'],type:'adventure',cost:20,icon:'△',image:'photo-1509316785289-025f5b846b35',desc:['صخور ورمال وسماء واسعة؛ انطلق برفقة دليل محلي لاكتشاف تفاصيل الصحراء.','Rock, sand and open skies. Explore the desert’s details with a local guide.'],thread:['قصة التكيّف مع الصحراء تقودك إلى ضانا وإلى حكاية الماء في الأزرق.','The story of adapting to the desert leads to Dana and the waters of Azraq.'],related:['dana','azraq']},
 {id:'petra',name:['البتراء · اتبع خيط الماء','Petra · Follow the water'],region:['معان، الجنوب','Ma’an · South'],type:'history',cost:50,icon:'◇',image:'photo-1579606032821-4e6161c81bd3',desc:['تأمل ما وراء الواجهات الشهيرة: تفاصيل إدارة المياه تفتح بابًا لقراءة أخرى للمكان.','Look beyond the famous facades: water management reveals another side of Petra.'],thread:['كيف يمنح الماء الحياة؟ استكشف هذا السؤال في واحة الأزرق وطبيعة ضانا.','How does water sustain life? Explore that question in Azraq and Dana.'],related:['azraq','dana']}
];
const $ = selector => document.querySelector(selector);
const read = (key,fallback) => {try {const value=JSON.parse(localStorage.getItem(key));return value??fallback;}catch{return fallback;}};
let lang=read('darb-language','ar')==='en'?'en':'ar';
let saved=read('darb-saved',[]), visited=read('darb-visits',[]), plan=read('darb-plan',null);
saved=Array.isArray(saved)?saved.filter(id=>places.some(p=>p.id===id)):[];
visited=Array.isArray(visited)?visited.filter(id=>places.some(p=>p.id===id)):[];
if(!plan || !Array.isArray(plan.ids) || !Number.isFinite(plan.budget) || ![1,3,5].includes(plan.days)) plan=null;
if(plan) plan.ids=plan.ids.filter(id=>places.some(p=>p.id===id));
let filter='all',toastTimer;
const t=(ar,en)=>lang==='ar'?ar:en;
const local=values=>values[lang==='ar'?0:1];
function persist(key,value){if(window.darbAccount?.ownsData() && key!=='darb-language'){window.darbAccount.save(key,value);return;}try{localStorage.setItem(key,JSON.stringify(value));}catch{notify(t('تعذر الحفظ الدائم. بياناتك متاحة لهذه الجلسة فقط.','Persistent storage unavailable. Data is kept for this session.'));}}
function notify(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),3500);}
function photo(place){return `https://images.unsplash.com/${place.image}?auto=format&fit=crop&w=800&q=80`;}
function renderCards(){const query=$('#search').value.trim().toLocaleLowerCase();const list=places.filter(p=>(filter==='all'||(filter==='saved'?saved.includes(p.id):p.type===filter))&&[...p.name,...p.region].some(s=>s.toLocaleLowerCase().includes(query)));$('#destinations').innerHTML=list.length?list.map(p=>`<div class="col-md-6 col-lg-4"><article class="destination-card"><div class="card-image"><img src="${photo(p)}" alt="${t('صورة تعبيرية للوجهة','Illustrative destination image')}" loading="lazy"><span class="image-label">${local(p.region)}</span><button class="save-btn" data-save="${p.id}" aria-pressed="${saved.includes(p.id)}" aria-label="${t('حفظ','Save')} ${local(p.name)}">${saved.includes(p.id)?'♥':'♡'}</button></div><div class="card-body-custom"><div class="card-meta"><span>${local(dictionary[p.type==='adventure'?'nature':p.type==='history'?'heritage':'localShort'])}</span><span>⌖ ${t('الأردن','Jordan')}</span></div><h3>${local(p.name)}</h3><p>${local(p.desc)}</p><div class="card-bottom"><span>${t('مخصص نشاط تقريبي','Sample activity allowance')} · ${p.cost} JOD</span><button class="text-button" data-open="${p.id}">${t('اكتشف الحكاية ←','Explore →')}</button></div></div></article></div>`).join(''):`<div class="col-12"><div class="empty-state">${t('لا توجد أماكن مطابقة. جرّب بحثًا آخر أو احفظ بعض الوجهات.','No matching places. Try another search or save a destination.')}</div></div>`;}
function renderPlan(){if(!plan||!plan.ids.length){$('#planContent').innerHTML=`<div class="empty-state"><h2>${t('كل رحلة تبدأ بخطوة','Every journey starts with a step')}</h2><p>${t('حدد مدة الرحلة وميزانيتك واهتماماتك من الرئيسية.','Choose your duration, budget and interests on the home page.')}</p><a class="btn btn-olive" href="#home">${t('خطط دربك','Plan your journey')}</a></div>`;return;}const itinerary=plan.ids.map(id=>places.find(p=>p.id===id));const total=itinerary.reduce((sum,p)=>sum+p.cost,0);$('#planContent').innerHTML=`<div class="plan-summary"><span>◷ ${plan.days} ${t('أيام','day(s)')}</span><span>${t('مخصص الأنشطة المقترح','Suggested activity allowance')}: ${total} / ${plan.budget} JOD</span><span>${t('بدون النقل والإقامة والطعام','Excludes transport, lodging and meals')}</span></div><p class="small muted">${t('التكاليف أمثلة تخطيطية وليست أسعارًا مؤكدة. تحقق من المواعيد والأسعار ومتطلبات الدخول والمسارات محليًا. الصور تعبيرية.','Costs are planning examples, not confirmed prices. Check opening hours, prices, entry requirements and routes locally. Images are illustrative.')}</p>${itinerary.map((p,i)=>`<article class="day-card"><div class="day-number">${t('اليوم','DAY')} ${i+1} · ${local(p.region)}</div><h2>${local(p.name)}</h2><p>${local(p.desc)}</p><div class="d-flex gap-4 flex-wrap"><button class="text-button" data-open="${p.id}">${t('تفاصيل وخيوط المكان ←','Details & connected stories →')}</button><a class="text-button" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name[1].split(' · ')[0]+', Jordan')}" target="_blank" rel="noopener noreferrer">${t('افتح على الخريطة ↗','Open in Maps ↗')}</a></div></article>`).join('')}${itinerary.length<plan.days?`<p class="passport-note">${t('الأيام المتبقية حرة: الميزانية أو الاهتمامات المحددة لا تغطي وجهات إضافية في بيانات النسخة الحالية.','Remaining days are free: this demo has no additional destinations within your budget and interests.')}</p>`:''}<button class="btn btn-outline-olive" id="downloadPlan">${t('تنزيل خطة الرحلة ↓','Download itinerary ↓')}</button>`;}
function renderPassport(){$('#passportContent').innerHTML=`<div class="passport-grid"><aside class="profile-card"><div class="passport-icon">▤</div><span class="eyebrow">DARB / ${t('جواز المستكشف','EXPLORER PASSPORT')}</span><h2>${t('لكل درب أثر','Every journey leaves a mark')}</h2><strong>${visited.length} / ${places.length}</strong><p class="small muted">${t('أختام في حكايتك','stamps in your story')}</p><progress value="${visited.length}" max="${places.length}" aria-label="${t('تقدم الاكتشاف','Discovery progress')}" style="width:100%;accent-color:var(--olive)"></progress></aside><div><div class="stamps-grid">${places.map(p=>`<article class="stamp ${visited.includes(p.id)?'earned':''}"><div class="stamp-symbol">${p.icon}</div><h3>${local(p.name).split(' · ')[0]}</h3><small>${visited.includes(p.id)?t('تم تسجيل زيارتك يدويًا','Visit logged manually'):t('حكاية تنتظر زيارتك','A story awaits')}</small><button class="text-button" data-visit="${p.id}">${visited.includes(p.id)?t('إلغاء الختم','Remove stamp'):t('زرت هذا المكان +','I visited this place +')}</button></article>`).join('')}</div><p class="passport-note">${t('الأختام محفوظة محليًا؛ مسح بيانات المتصفح يحذفها. لا يتضمن هذا الإصدار تحقق GPS أو QR.','Stamps are stored locally and are removed when browser data is cleared. This version does not verify GPS or QR attendance.')}</p></div></div>`;}
function openPlace(id){const p=places.find(p=>p.id===id);if(!p)return;$('#dialogContent').innerHTML=`<img class="dialog-image" src="${photo(p)}" alt="${t('صورة تعبيرية','Illustrative image')}"><div class="dialog-body"><span class="eyebrow">${local(p.region)}</span><h2>${local(p.name)}</h2><p>${local(p.desc)}</p><div class="thread-box"><h3>${local(dictionary.threads)}</h3><p>${local(p.thread)}</p>${p.related.map(id=>`<button class="text-button" data-open="${id}">${local(places.find(x=>x.id===id).name).split(' · ')[0]} ↗</button>`).join('')}</div><p class="small">${t('الصورة تعبيرية. مخصص النشاط تقديري؛ تحقق من التفاصيل محليًا قبل الزيارة.','Image is illustrative. Activity allowance is a sample; confirm details locally before visiting.')}</p><a class="btn btn-olive" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name[1].split(' · ')[0]+', Jordan')}" target="_blank" rel="noopener noreferrer">${t('استكشف الموقع على الخريطة ↗','Explore on Maps ↗')}</a></div>`;if(!$('#placeDialog').open)$('#placeDialog').showModal();}
function route(){const page=['home','planner','passport'].includes(location.hash.slice(1))?location.hash.slice(1):'home';document.querySelectorAll('.page').forEach(el=>el.hidden=el.id!==page);document.querySelectorAll('[data-page]').forEach(el=>{el.classList.toggle('active',el.dataset.page===page);if(el.dataset.page===page)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');});window.scrollTo({top:0,behavior:'instant'});}
function setLanguage(){document.documentElement.lang=lang;document.documentElement.dir=lang==='ar'?'rtl':'ltr';$('#bootstrapStyle').href=`https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap${lang==='ar'?'.rtl':''}.min.css`;document.querySelectorAll('[data-i18n]').forEach(el=>{el.innerHTML=local(dictionary[el.dataset.i18n]);});$('#language').textContent=lang==='ar'?'EN ↗':'العربية ↗';$('#search').placeholder=t('ابحث عن حكاية أو مكان…','Search for a place or story…');$('#search').ariaLabel=t('البحث عن الوجهات','Search destinations');$('#closeDialog').ariaLabel=t('إغلاق','Close');document.title=t('درب | الأردن، أبعد من المألوف','Darb | Jordan, beyond the familiar');renderCards();renderPlan();renderPassport();}
$('#tripForm').addEventListener('submit',e=>{e.preventDefault();const interests=[...document.querySelectorAll('.interest-options input:checked')].map(el=>el.value);if(!interests.length){notify(t('اختر اهتمامًا واحدًا على الأقل.','Choose at least one interest.'));return;}const days=Number($('#days').value),budget=Number($('#budget').value);let remaining=budget;const candidates=places.filter(p=>interests.includes(p.type));const selected=[];for(const p of candidates){if(selected.length<days&&p.cost<=remaining){selected.push(p.id);remaining-=p.cost;}}plan={days,budget,interests,ids:selected};persist('darb-plan',plan);renderPlan();location.hash='planner';});
$('#budget').addEventListener('input',()=>$('#budgetValue').textContent=`${$('#budget').value} JOD`);
$('#language').addEventListener('click',()=>{lang=lang==='ar'?'en':'ar';persist('darb-language',lang);setLanguage();});
$('#search').addEventListener('input',renderCards);
$('#filters').addEventListener('click',e=>{const button=e.target.closest('[data-filter]');if(!button)return;filter=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(el=>el.classList.toggle('active',el===button));renderCards();});
document.addEventListener('click',e=>{const save=e.target.closest('[data-save]'),open=e.target.closest('[data-open]'),visit=e.target.closest('[data-visit]');if(save){const id=save.dataset.save;saved=saved.includes(id)?saved.filter(x=>x!==id):[...saved,id];persist('darb-saved',saved);renderCards();}if(open)openPlace(open.dataset.open);if(visit){const id=visit.dataset.visit;visited=visited.includes(id)?visited.filter(x=>x!==id):[...visited,id];persist('darb-visits',visited);renderPassport();}if(e.target.closest('#downloadPlan')&&plan){const content=[t('رحلتي مع درب','My Darb journey'),`${plan.days} ${t('أيام','days')} | ${plan.budget} JOD`,t('التكاليف تقديرية ولا تشمل النقل والإقامة والطعام.','Illustrative costs exclude transport, accommodation and meals.'),...plan.ids.map((id,i)=>`${i+1}. ${local(places.find(p=>p.id===id).name)}`)].join('\n');const url=URL.createObjectURL(new Blob(['\ufeff'+content],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='darb-itinerary.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}});
$('#closeDialog').addEventListener('click',()=>$('#placeDialog').close());
$('#placeDialog').addEventListener('click',e=>{if(e.target===$('#placeDialog')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.target.close();}});
$('#storyButton').addEventListener('click',()=>openPlace('azraq'));
window.addEventListener('hashchange',route);
if(plan){$('#days').value=plan.days;$('#budget').value=plan.budget;$('#budgetValue').textContent=`${plan.budget} JOD`;if(Array.isArray(plan.interests))document.querySelectorAll('.interest-options input').forEach(el=>el.checked=plan.interests.includes(el.value));}
setLanguage();route();

window.darbData = {
  apply(data) {
    const ids = value => Array.isArray(value) ? [...new Set(value.filter(id => places.some(p => p.id === id)))] : [];
    saved = ids(data.saved);
    visited = ids(data.visited);
    const next = data.plan;
    plan = next && [1,3,5].includes(next.days) && Number.isFinite(next.budget) && next.budget >= 30 && next.budget <= 300 && Array.isArray(next.ids)
      ? { days: next.days, budget: next.budget, ids: ids(next.ids).slice(0,next.days), interests: Array.isArray(next.interests) ? next.interests.filter(x => ['adventure','history','local'].includes(x)) : [] } : null;
    $('#days').value = plan?.days || 3;
    $('#budget').value = plan?.budget || 120;
    $('#budgetValue').textContent = `${$('#budget').value} JOD`;
    document.querySelectorAll('.interest-options input').forEach(el => el.checked = (plan?.interests || ['adventure','history']).includes(el.value));
    renderCards(); renderPlan(); renderPassport();
  },
  guest() { this.apply({saved:read('darb-saved',[]),visited:read('darb-visits',[]),plan:read('darb-plan',null)}); }
};

// Animate visible content once, including cards rebuilt by filters or language changes.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionSelector = '.hero-copy, .trip-card, .section-heading, .destination-card, .story-banner, .day-card, .plan-summary, .profile-card, .stamp, .empty-state';
const revealedElements = new WeakSet();
const pendingElements = new Set();
const runningAnimations = new Set();
function playEntrance(element, delay = 0) {
  if (motionPreference.matches || typeof element.animate !== 'function') return;
  const animation = element.animate([
    { opacity: 0, translate: '0 22px' },
    { opacity: 1, translate: '0 0' }
  ], { duration: 560, delay, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' });
  runningAnimations.add(animation);
  animation.onfinish = animation.oncancel = () => runningAnimations.delete(animation);
}
const entranceObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  let stagger = 0;
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entranceObserver.unobserve(entry.target);
    pendingElements.delete(entry.target);
    revealedElements.add(entry.target);
    playEntrance(entry.target, Math.min(stagger++ * 65, 195));
  });
}, { threshold: 0.08 }) : null;
function prepareEntrances() {
  if (!entranceObserver) return;
  for (const element of pendingElements) {
    if (!element.isConnected) {
      entranceObserver.unobserve(element);
      pendingElements.delete(element);
    }
  }
  if (motionPreference.matches) return;
  document.querySelectorAll(motionSelector).forEach(element => {
    if (revealedElements.has(element) || pendingElements.has(element)) return;
    pendingElements.add(element);
    entranceObserver.observe(element);
  });
}
let motionFrame = 0;
new MutationObserver(() => {
  if (motionFrame) return;
  motionFrame = requestAnimationFrame(() => {
    motionFrame = 0;
    prepareEntrances();
  });
}).observe($('#main'), { childList: true, subtree: true });
motionPreference.addEventListener('change', () => {
  if (motionPreference.matches) {
    runningAnimations.forEach(animation => animation.cancel());
    entranceObserver?.disconnect();
    pendingElements.clear();
  } else prepareEntrances();
});
prepareEntrances();
