/* ---------------------------------------------------------------
   Plain words for the wires.

   Every arrow in the animated diagram already carries the real code
   (`label`). This file adds the second, smaller line underneath it:
   what that arrow means said in ordinary language, so the picture
   can be read before any of the code is understood.

   Keys are the *base* slug (no number), then the edge id used in
   beginner/intermediate/advanced.mjs. Keep both languages short —
   a wire drawn straight across a row has only the gap between two
   boxes to write in, and build.mjs wraps or shrinks anything longer.
   --------------------------------------------------------------- */
export default {

/* ============================ beginner ============================ */

'how-an-app-starts': {
  e1: {en:'the browser runs it', ar:'المتصفح بيشغّله'},
  e2: {en:'reads the settings',  ar:'بيقرا الإعدادات'},
  e3: {en:'hands over the app',  ar:'بيسلّم التطبيق'},
  e4: {en:'fills the empty tag', ar:'بيملا التاج الفاضي'},
},

'cli-and-project-files': {
  e1: {en:'the logic file',   ar:'ملف المنطق'},
  e2: {en:'the picture file', ar:'ملف الشكل'},
  e3: {en:'the test file',    ar:'ملف الاختبار'},
},

'components': {
  e1: {en:'lets the tag exist', ar:'بيسمح للتاج يشتغل'},
  e2: {en:'hands a value down', ar:'بينزّل قيمة'},
  e3: {en:'prints it',          ar:'بيطبعها'},
},

'control-flow': {
  e1: {en:'the list of data',  ar:'قائمة البيانات'},
  e2: {en:'one row per item',  ar:'صف لكل عنصر'},
},

'signals': {
  e1: {en:'reads the value', ar:'بيقرا القيمة'},
  e2: {en:'draws the total', ar:'بيرسم الإجمالي'},
  e3: {en:'the click writes', ar:'الكليك بيكتب'},
},

'inputs-outputs': {
  e1: {en:'data goes down',   ar:'البيانات بتنزل'},
  e2: {en:'the child draws',  ar:'الابن بيرسم'},
  e3: {en:'the event goes up', ar:'الحدث بيطلع'},
},

'services-di': {
  e1: {en:'one side writes',  ar:'طرف بيكتب'},
  e2: {en:'another reads',    ar:'وطرف بيقرا'},
  e3: {en:'so does the guard', ar:'والحارس كمان'},
},

'lifecycle': {
  e1: {en:'born, then drawn',  ar:'بيتولد وبيترسم'},
  e2: {en:'now the DOM exists', ar:'الـ DOM بقى موجود'},
  e3: {en:'clean up on the way out', ar:'نضّف وإنت خارج'},
},

'directives-and-pipes': {
  e1: {en:'both must be imported', ar:'الاتنين لازم import'},
  e2: {en:'changes the element',   ar:'بتغيّر العنصر'},
  e3: {en:'changes the text',      ar:'بيغيّر النص'},
},

'content-projection': {
  e1: {en:'your markup goes in', ar:'الماركب بيدخل'},
  e2: {en:'each slot by name',   ar:'كل فتحة باسمها'},
},

'component-styles': {
  e1: {en:'this file only',   ar:'الملف ده بس'},
  e2: {en:'the whole app',    ar:'التطبيق كله'},
  e3: {en:'a class on / off', ar:'كلاس يشتغل ويقف'},
},

'template-syntax': {
  e1: {en:'the value is read', ar:'القيمة بتتقرا'},
  e2: {en:'real HTML comes out', ar:'HTML حقيقي بيخرج'},
},

'data-binding': {
  e1: {en:'value goes to the box', ar:'القيمة بتروح للخانة'},
  e2: {en:'the browser shows it',  ar:'المتصفح بيعرضها'},
  e3: {en:'typing comes back',     ar:'الكتابة بترجع'},
},

'built-in-directives': {
  e1: {en:'the old way', ar:'الطريقة القديمة'},
  e2: {en:'the new way', ar:'الطريقة الجديدة'},
},

'built-in-pipes': {
  e1: {en:'the raw number',  ar:'الرقم الخام'},
  e2: {en:'dressed for people', ar:'مظبّط للبشر'},
},

'basic-routing': {
  e1: {en:'a click asks for a URL', ar:'كليك بيطلب URL'},
  e2: {en:'the page is fetched',    ar:'الصفحة بتتحمّل'},
  e3: {en:'or you go in code',      ar:'أو بتروح بالكود'},
},

'template-driven-forms': {
  e1: {en:'the form is watched', ar:'الفورم بيتراقب'},
  e2: {en:'typing lands here',   ar:'الكتابة بتوصل هنا'},
  e3: {en:'submit runs this',    ar:'الإرسال بينفّذ ده'},
},

'http-basics': {
  e1: {en:'switched on once', ar:'بيتشغّل مرة واحدة'},
  e2: {en:'asks for the data', ar:'بيطلب البيانات'},
  e3: {en:'the list is drawn', ar:'القائمة بتترسم'},
},

/* ========================== intermediate ========================== */

'routing': {
  e1: {en:'the routes are handed over', ar:'المسارات بتتسلّم'},
  e2: {en:'may I enter?',   ar:'ينفع أدخل؟'},
  e3: {en:'only then load', ar:'وساعتها بس نحمّل'},
},

'http': {
  e1: {en:'every request passes through', ar:'كل طلب بيعدّي منه'},
  e2: {en:'the token is added',  ar:'التوكن بيتضاف'},
  e3: {en:'the answer renders', ar:'الرد بيترسم'},
},

'forms': {
  e1: {en:'the rules of the form', ar:'قواعد الفورم'},
  e2: {en:'wired to the inputs',   ar:'موصولة بالخانات'},
  e3: {en:'submit, if it is valid', ar:'إرسال لو سليم'},
},

'effects-vs-computed': {
  e1: {en:'gives back a value', ar:'بيرجّع قيمة'},
  e2: {en:'does a side job',    ar:'بيعمل شغل جانبي'},
  e3: {en:'this makes a loop',  ar:'ده بيعمل لفة لا نهائية'},
},

'change-detection': {
  e1: {en:'check everything', ar:'شيّك على كله'},
  e2: {en:'only new inputs',  ar:'الجديد بس'},
  e3: {en:'a signal marks the path', ar:'الـ signal بيعلّم الطريق'},
},

'queries': {
  e1: {en:'an element of my own', ar:'عنصر من عندي'},
  e2: {en:'a child component',    ar:'component ابن'},
  e3: {en:'call a method on it',  ar:'نادي method عليه'},
},

'rxjs-operators': {
  e1: {en:'a new event arrives', ar:'حدث جديد بيوصل'},
  e2: {en:'keep, cancel or queue', ar:'خلّي، ألغي، أو صُف'},
},

'testing': {
  e1: {en:'swap in a fake',    ar:'حُط بديل مزيّف'},
  e2: {en:'build the component', ar:'ابني الـ component'},
  e3: {en:'read the real DOM',  ar:'اقرا الـ DOM الحقيقي'},
},

'error-handling': {
  e1: {en:'expected failures', ar:'أخطاء متوقّعة'},
  e2: {en:'and the rest',      ar:'والباقي'},
  e3: {en:'the user is told',  ar:'المستخدم بيعرف'},
},

'rxjs-fundamentals': {
  e1: {en:'nothing runs until you ask', ar:'مفيش حاجة تشتغل غير لما تطلب'},
  e2: {en:'then values arrive', ar:'وبعدها القيم بتوصل'},
  e3: {en:'you can push too',   ar:'وإنت كمان بتدفع'},
},

'ui-libraries': {
  e1: {en:'finished components', ar:'components جاهزة'},
  e2: {en:'the parts underneath', ar:'القطع اللي تحتيها'},
},

/* =========================== advanced ============================ */

'zoneless': {
  e1: {en:'no more zone', ar:'مفيش zone خلاص'},
  e2: {en:'a signal asks for a redraw', ar:'الـ signal بيطلب رسم'},
  e3: {en:'a plain field asks for nothing', ar:'المتغيّر العادي مبيطلبش'},
},

'defer': {
  e1: {en:'show something cheap first', ar:'اعرض حاجة رخيصة الأول'},
  e2: {en:'when it is nearly seen', ar:'لما يقرب يتشاف'},
  e3: {en:'then the real thing',   ar:'وبعدها الحقيقي'},
},

'ssr-hydration': {
  e1: {en:'HTML built on the server', ar:'HTML متبني على السيرفر'},
  e2: {en:'reused, not rebuilt',      ar:'بيستخدم تاني مش بيتبني'},
  e3: {en:'window does not exist yet', ar:'window لسه مش موجود'},
},

'rxjs-interop': {
  e1: {en:'signal to stream', ar:'من signal لـ stream'},
  e2: {en:'wait, then ask',   ar:'استنى، وبعدين اسأل'},
  e3: {en:'stream to signal', ar:'من stream لـ signal'},
},

'di-host-directives': {
  e1: {en:'a value, not a class', ar:'قيمة، مش كلاس'},
  e2: {en:'behaviour glued on',   ar:'سلوك ملزوق عليه'},
  e3: {en:'a copy for this branch', ar:'نسخة للفرع ده'},
},

'rxjs-combination': {
  e1: {en:'one source', ar:'مصدر'},
  e2: {en:'another source', ar:'مصدر تاني'},
  e3: {en:'one value out',  ar:'قيمة واحدة بتخرج'},
},

'signal-state': {
  e1: {en:'derived, never stored', ar:'محسوبة، مش مخزّنة'},
  e2: {en:'the view reads it',     ar:'الشاشة بتقراها'},
  e3: {en:'and writes go back in', ar:'والكتابة بترجع جوه'},
},

'global-state': {
  e1: {en:'I want this to happen', ar:'عايز الحاجة دي تحصل'},
  e2: {en:'something does the work', ar:'حاجة بتعمل الشغل'},
  e3: {en:'and reports the result',  ar:'وبتبلّغ بالنتيجة'},
},

'dynamic-components': {
  e1: {en:'a type picks a class', ar:'النوع بيختار الكلاس'},
  e2: {en:'built at runtime',     ar:'بيتبني وقت التشغيل'},
  e3: {en:'inputs set by hand',   ar:'الـ inputs بالإيد'},
},

'control-value-accessor': {
  e1: {en:'the form pushes in', ar:'الفورم بيدفع جوه'},
  e2: {en:'the widget shows it', ar:'الويدجت بيعرضها'},
  e3: {en:'the click reports back', ar:'الكليك بيبلّغ'},
},

'security': {
  e1: {en:'escaped, always safe', ar:'مأمّن دايماً'},
  e2: {en:'your job to sanitise', ar:'التنظيف مسؤوليتك'},
},

'performance': {
  e1: {en:'what shipped', ar:'اللي اتنزّل'},
  e2: {en:'what it does', ar:'اللي بيحصل'},
},

'lazy-loading': {
  e1: {en:'a plan for later', ar:'خطة لبعدين'},
  e2: {en:'fetched while idle', ar:'بيتحمّل وقت الفراغ'},
  e3: {en:'so the click is instant', ar:'فالكليك يبقى فوري'},
},

'renderer2': {
  e1: {en:'works anywhere', ar:'بيشتغل في أي مكان'},
  e2: {en:'browser only',   ar:'المتصفح بس'},
},

'e2e-testing': {
  e1: {en:'the test names the steps', ar:'الاختبار بيسمّي الخطوات'},
  e2: {en:'a real browser acts',      ar:'متصفح حقيقي بيتصرّف'},
  e3: {en:'and the result is checked', ar:'والنتيجة بتتأكّد'},
},

'aot-tree-shaking': {
  e1: {en:'compiled before shipping', ar:'بيتترجم قبل النشر'},
  e2: {en:'plain JavaScript out',      ar:'جافاسكريبت عادي بيخرج'},
},

'pwa': {
  e1: {en:'the request is caught', ar:'الطلب بيتلقّط'},
  e2: {en:'what are the rules?',   ar:'إيه القواعد؟'},
  e3: {en:'from disk or the network', ar:'من الديسك أو الشبكة'},
},

'schematics': {
  e1: {en:'the command finds the code', ar:'الأمر بيلاقي الكود'},
  e2: {en:'files from a stencil',       ar:'ملفات من قالب'},
},

'micro-frontends': {
  e1: {en:'a team ships its own', ar:'كل فريق بينشر بنفسه'},
  e2: {en:'loaded at runtime',    ar:'بيتحمّل وقت التشغيل'},
},

};
