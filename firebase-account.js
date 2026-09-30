'use strict';
(() => {
  const text = (ar,en) => document.documentElement.lang === 'ar' ? ar : en;
  const config = {
    apiKey: 'AIzaSyCkvIst_QIUUcTdg8rZV-D7etGkSm0NxTw',
    authDomain: 'darb-d3595.firebaseapp.com', projectId: 'darb-d3595',
    storageBucket: 'darb-d3595.firebasestorage.app', messagingSenderId: '796934985283',
    appId: '1:796934985283:web:37fca0e5e988e8f535a6f6', measurementId: 'G-FX5NEVJ10C'
  };
  const panel = document.createElement('dialog');
  panel.id = 'accountDialog';
  panel.setAttribute('aria-labelledby','accountTitle');
  panel.innerHTML = `<div class="dialog-body account-body">
    <button type="button" class="dialog-close" id="closeAccount">×</button>
    <span class="eyebrow">DARB / ACCOUNT</span><h2 id="accountTitle"></h2>
    <p id="accountIntro"></p><p id="accountEmail" dir="ltr"></p>
    <div id="accountTabs" class="d-flex gap-2 mb-3"><button type="button" class="filter" id="loginTab"></button><button type="button" class="filter" id="registerTab"></button></div>
    <form id="accountForm"><fieldset id="accountFields">
      <label for="authEmail" id="emailLabel"></label><input class="form-control mb-3" id="authEmail" type="email" required autocomplete="email" maxlength="254" dir="ltr">
      <label for="authPassword" id="passwordLabel"></label><input class="form-control mb-3" id="authPassword" type="password" required autocomplete="current-password" maxlength="128" dir="ltr">
      <div id="confirmGroup" hidden><label for="authConfirm" id="confirmLabel"></label><input class="form-control mb-3" id="authConfirm" type="password" autocomplete="new-password" maxlength="128" dir="ltr"></div>
      <button class="btn btn-olive w-100" id="authSubmit" type="submit"></button>
      <button class="text-button mt-3" id="resetPassword" type="button"></button>
    </fieldset></form>
    <p id="accountFeedback" class="account-feedback" role="status" aria-live="polite"></p>
    <div id="signedInActions" hidden><button type="button" class="btn btn-outline-olive" id="retryCloud"></button><button type="button" class="btn btn-clay" id="logoutButton"></button></div>
  </div>`;
  document.body.append(panel);
  const get = id => document.getElementById(id);
  const entry = document.createElement('button');
  entry.type = 'button'; entry.id = 'accountButton'; entry.className = 'btn btn-outline-olive btn-sm';
  get('language').parentElement.prepend(entry);
  const banner = document.createElement('div');
  banner.className = 'cloud-status'; banner.setAttribute('role','status'); banner.setAttribute('aria-live','polite');
  document.querySelector('.site-header').append(banner);
  let api, auth, db, user = null, ready = false, loading = false, busy = false, mode = 'login';
  let unsubscribe, generation = 0, status = 'connecting', feedback = null, writeCount = 0;
  let failedFields = {};
  const fields = {'darb-saved':'saved','darb-visits':'visited','darb-plan':'plan'};
  function refresh() {
    const logged = !!user;
    entry.textContent = logged ? text('حسابي','My account') : text('تسجيل الدخول','Sign in');
    get('closeAccount').ariaLabel = text('إغلاق','Close');
    get('accountTitle').textContent = logged ? text('حساب المستكشف','Explorer account') : text('حكايتك تسافر معك','Take your story with you');
    get('accountIntro').textContent = logged ? text('رحلتك ومفضلتك وأختامك مرتبطة بحسابك. بيانات الزائر منفصلة ولا تُنقل تلقائيًا.','Your journey, favorites and stamps belong to your account. Guest data stays separate and is not imported automatically.') : text('سجّل الدخول لحفظ اكتشافاتك عبر الأجهزة، أو أكمل التصفح كزائر.','Sign in to save discoveries across devices, or continue as a guest.');
    get('accountEmail').textContent = user?.email || '';
    get('accountTabs').hidden = logged;
    get('accountForm').hidden = logged;
    get('signedInActions').hidden = !logged;
    get('loginTab').textContent = text('تسجيل الدخول','Sign in');
    get('registerTab').textContent = text('حساب جديد','Create account');
    get('loginTab').classList.toggle('active',mode==='login');
    get('registerTab').classList.toggle('active',mode==='register');
    get('loginTab').disabled = get('registerTab').disabled = busy;
    get('emailLabel').textContent = text('البريد الإلكتروني','Email');
    get('passwordLabel').textContent = text('كلمة المرور','Password');
    get('confirmLabel').textContent = text('تأكيد كلمة المرور','Confirm password');
    get('confirmGroup').hidden = mode!=='register';
    get('authConfirm').required = mode==='register';
    get('authPassword').minLength = mode==='register' ? 8 : 1;
    get('authPassword').autocomplete = mode==='register' ? 'new-password' : 'current-password';
    get('authSubmit').textContent = busy ? text('جارٍ التنفيذ…','Please wait…') : mode==='register' ? text('إنشاء حساب','Create account') : text('دخول','Sign in');
    get('accountFields').disabled = busy || !ready;
    get('resetPassword').textContent = text('نسيت كلمة المرور؟','Forgot password?');
    get('resetPassword').hidden = mode==='register';
    get('logoutButton').textContent = text('تسجيل الخروج','Sign out');
    get('logoutButton').disabled = busy || writeCount > 0;
    get('retryCloud').textContent = text('إعادة محاولة المزامنة','Retry sync');
    get('retryCloud').hidden = !['error','offline'].includes(status);
    get('retryCloud').disabled = busy || writeCount > 0;
    const messages = {
      connecting:['جارٍ الاتصال بالحساب…','Connecting to account…'],
      guest:['وضع الزائر · الحفظ على هذا المتصفح','Guest mode · saved in this browser'],
      local:['لتسجيل الدخول، افتح الموقع عبر استضافة أو Live Server.','For sign-in, open the site through hosting or Live Server.'],
      unavailable:['خدمة الحساب غير متاحة. حدّث الصفحة لإعادة المحاولة؛ وضع الزائر متاح.','Account service unavailable. Reload to retry; guest mode is available.'],
      loading:['جارٍ تحميل بيانات حسابك…','Loading your account data…'],
      synced:['تمت المزامنة مع حسابك ✓','Synced to your account ✓'],
      saving:['جارٍ حفظ التغييرات… لا تغلق الصفحة.','Saving changes… keep this page open.'],
      offline:['بانتظار الاتصال — لم تتأكد المزامنة. أبقِ الصفحة مفتوحة.','Waiting for connection — sync is unconfirmed. Keep this page open.'],
      error:['تعذرت المزامنة. افتح حسابي لإعادة المحاولة؛ تغييراتك غير مؤكدة الحفظ.','Sync failed. Open My account to retry; changes are not confirmed saved.']
    };
    banner.textContent = text(...messages[status]);
    get('accountFeedback').textContent = feedback ? text(...feedback) : '';
    document.querySelectorAll('[data-i18n="localData"], [data-i18n="noAccount"]').forEach(el => el.textContent = logged ? text('حفظ مرتبط بحسابك؛ راجع حالة المزامنة أعلى الصفحة.','Account storage; check the sync status above.') : text('كزائر، تُحفظ بياناتك على هذا المتصفح فقط.','As a guest, data is saved only in this browser.'));
    const note = document.querySelector('#passportContent .passport-note');
    if(note) note.textContent = logged ? text('أختام يدوية محفوظة في حسابك عند اكتمال المزامنة. لا يوجد تحقق GPS أو QR.','Manual stamps are saved to your account when synced. No GPS or QR verification.') : text('الأختام محفوظة محليًا؛ مسح بيانات المتصفح يحذفها. لا يوجد تحقق GPS أو QR.','Stamps are local; clearing browser data removes them. No GPS or QR verification.');
  }
  function errorMessage(error) {
    switch(error?.code) {
      case 'auth/invalid-credential': case 'auth/user-not-found': case 'auth/wrong-password': return ['تعذر الدخول. تحقق من البريد وكلمة المرور.','Sign-in failed. Check your email and password.'];
      case 'auth/email-already-in-use': return ['هذا البريد مستخدم. سجّل الدخول أو استعد كلمة المرور.','Email already in use. Sign in or reset your password.'];
      case 'auth/invalid-email': return ['أدخل بريدًا إلكترونيًا صحيحًا.','Enter a valid email address.'];
      case 'auth/weak-password': case 'auth/password-does-not-meet-requirements': return ['كلمة المرور لا تحقق متطلبات الحساب. استخدم كلمة أطول وأقوى.','Password does not meet account requirements. Use a longer, stronger password.'];
      case 'auth/too-many-requests': return ['محاولات كثيرة. انتظر ثم أعد المحاولة.','Too many attempts. Please try again later.'];
      case 'auth/operation-not-allowed': case 'auth/configuration-not-found': return ['الدخول بالبريد غير مفعّل في إعدادات Firebase للمشروع.','Email sign-in is not enabled in this Firebase project.'];
      case 'permission-denied': return ['قاعدة البيانات رفضت الطلب. تحقق من نشر قواعد Firestore المرفقة.','Database access denied. Check the supplied Firestore rules are published.'];
      default: return ['تعذر إتمام الطلب. تحقق من الاتصال وإعدادات Firebase ثم أعد المحاولة.','Unable to complete the request. Check your connection and Firebase setup, then retry.'];
    }
  }
  function connectData(current) {
    unsubscribe?.(); const token = ++generation;
    loading = true; status = 'loading'; refresh();
    const ref = api.doc(db,'users',current.uid);
    unsubscribe = api.onSnapshot(ref,{includeMetadataChanges:true},snapshot => {
      if(token!==generation) return;
      if(snapshot.metadata.fromCache && !snapshot.exists()) { status='offline'; refresh(); return; }
      // Failed edits stay in memory for explicit retry instead of being silently discarded.
      if(Object.keys(failedFields).length) return;
      window.darbData.apply(snapshot.exists() ? snapshot.data() : {});
      loading = false;
      status = snapshot.metadata.hasPendingWrites ? 'saving' : snapshot.metadata.fromCache ? 'offline' : 'synced';
      refresh();
    },error => { if(token!==generation)return; status='error'; loading=true; feedback=errorMessage(error); refresh(); });
  }
  async function writeField(field,value) {
    if(!user || !ready) return;
    const token=generation, uid=user.uid;
    failedFields[field]=value; writeCount++; status='saving'; refresh();
    try {
      await api.setDoc(api.doc(db,'users',uid),{[field]:value,updatedAt:api.serverTimestamp()},{merge:true});
      if(token!==generation) return;
      if(failedFields[field]===value) delete failedFields[field];
      status=Object.keys(failedFields).length?'saving':'synced'; feedback=null;
    } catch(error) { if(token===generation){status='error'; feedback=errorMessage(error);} }
    finally { if(token===generation){writeCount--; refresh();} }
  }
  window.darbAccount = { ownsData:()=>!!user, save(key,value){if(fields[key]) void writeField(fields[key],value);} };
  // Prevent edits during account restoration, so guest data cannot leak into an account.
  function guard(event) {
    const target=event.target;
    const mutation=event.type==='submit' ? target.id==='tripForm' : target.closest('[data-save],[data-visit]');
    if(mutation && (loading || status==='connecting')) {
      event.preventDefault(); event.stopImmediatePropagation();
      feedback=['انتظر تحميل الحساب أو افتح حسابي لإعادة المحاولة أو الخروج.','Wait for your account to load, or open My account to retry or sign out.'];
      refresh(); panel.showModal();
    }
  }
  document.addEventListener('click',guard,true); document.addEventListener('submit',guard,true);
  entry.addEventListener('click',()=>{refresh();panel.showModal();});
  get('closeAccount').addEventListener('click',()=>panel.close());
  panel.addEventListener('close',()=>{get('authPassword').value='';get('authConfirm').value='';});
  for(const [id,next] of [['loginTab','login'],['registerTab','register']]) get(id).addEventListener('click',()=>{mode=next;feedback=null;refresh();});
  get('accountForm').addEventListener('submit',async event=>{
    event.preventDefault(); if(!ready||busy)return;
    if(mode==='register'&&get('authPassword').value!==get('authConfirm').value){feedback=['كلمتا المرور غير متطابقتين.','Passwords do not match.'];refresh();return;}
    busy=true;feedback=null;refresh();
    try {
      const action=mode==='register'?api.createUserWithEmailAndPassword:api.signInWithEmailAndPassword;
      await action(auth,get('authEmail').value.trim(),get('authPassword').value);
      get('accountForm').reset(); panel.close();
    } catch(error){feedback=errorMessage(error);}
    finally{busy=false;refresh();}
  });
  get('resetPassword').addEventListener('click',async()=>{
    if(!ready||busy||!get('authEmail').reportValidity())return;
    busy=true;feedback=null;refresh();
    try{await api.sendPasswordResetEmail(auth,get('authEmail').value.trim());feedback=['إذا كان البريد مسجّلًا فستصلك رسالة لاستعادة كلمة المرور.','If this email is registered, you will receive a password reset email.'];}
    catch(error){feedback=errorMessage(error);}finally{busy=false;refresh();}
  });
  get('logoutButton').addEventListener('click',async()=>{
    if(busy||writeCount)return;
    if(Object.keys(failedFields).length&&!confirm(text('هناك تغييرات لم تُحفظ. هل تريد الخروج وفقدانها؟','Some changes are unsaved. Sign out and discard them?')))return;
    busy=true;refresh();try{await api.signOut(auth);panel.close();}catch(error){feedback=errorMessage(error);}finally{busy=false;refresh();}
  });
  get('retryCloud').addEventListener('click',async()=>{
    if(!user||busy||writeCount)return;
    const entries=Object.entries(failedFields);
    if(entries.length){for(const [field,value] of entries)await writeField(field,value);}
    if(!Object.keys(failedFields).length)connectData(user);
  });
  new MutationObserver(refresh).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
  new MutationObserver(refresh).observe(get('passportContent'),{childList:true});
  window.addEventListener('beforeunload',event=>{if(writeCount||Object.keys(failedFields).length){event.preventDefault();event.returnValue='';}});
  window.addEventListener('offline',()=>{if(user){status='offline';refresh();}});
  refresh();
  async function initialize() {
    if(!['https:','http:'].includes(location.protocol)){status='local';refresh();return;}
    try {
      const [core,authSDK,firestoreSDK]=await Promise.all([
        import('https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js'),
        import('https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js'),
        import('https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js')
      ]);
      api={...authSDK,...firestoreSDK};
      const app=core.initializeApp(config); auth=api.getAuth(app); db=api.getFirestore(app);
      await api.setPersistence(auth,api.browserSessionPersistence);
      api.onAuthStateChanged(auth,current=>{
        unsubscribe?.(); generation++; writeCount=0;failedFields={};feedback=null;
        user=current;ready=true;loading=!!current;
        if(current){window.darbData.apply({});connectData(current);}
        else{status='guest';window.darbData.guest();refresh();}
      },()=>{status='unavailable';ready=false;loading=false;refresh();});
      import('https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js').then(async analytics=>{if(await analytics.isSupported())analytics.getAnalytics(app);}).catch(()=>{});
    } catch(error){status='unavailable';feedback=errorMessage(error);loading=false;refresh();}
  }
  void initialize();
})();
