/* ==================================================================
   The Angular service worker, name by name — the companion page after
   the pwa topic. One running example (a small shop app with an update
   banner and an offline bar) followed through the config files and the
   TypeScript, every name coloured by who owns it.
   ================================================================== */

/* a name in running text, coloured like the code and linked on hover */
const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

const CFG = 'ngsw-config.json';

export default {
  topic: 'pwa',
  tab: 'The service worker, name by name — The Angular Signal',
  title: { en: 'The service worker, name by name', ar: 'الـ service worker، اسم اسم' },
  say: {
    en: 'A PWA is mostly JSON keys and a few service methods, and almost none of the names are yours. One shop app followed from <code>angular.json</code> to the “new version” banner, every name coloured, plus the typos that fail without a word.',
    ar: 'الـ PWA أغلبها مفاتيح JSON وشوية ميثودز في service، وتقريبًا ولا اسم فيهم بتاعك. تطبيق shop واحد ماشيين وراه من <code>angular.json</code> لحد شريط «فيه نسخة جديدة»، وكل اسم ملوّن، ومعاهم الغلطات الإملائية اللي بتفشل من غير ولا كلمة.'
  },
  lead: {
    en: 'The idea is simple: <b>a script sits between your app and the network, and you tell it what to cache in a JSON file.</b> The confusing part is the names. They are spread over five files and three formats, most of them belong to Angular or to the browser, and a misspelt key usually does not fail: it just is not read. This page shows which few names are yours, and which ones must match across files.',
    ar: 'الفكرة بسيطة: <b>سكريبت بيقعد بين تطبيقك والشبكة، وانت بتقوله يكاش إيه في ملف JSON.</b> اللي بيلخبط هو الأسماء. متوزعة على خمس ملفات وتلات أنواع، وأغلبها بتاع أنجولار أو المتصفح، والمفتاح المكتوب غلط غالبًا مابيفشلش: هو بس مابيتقريش. الصفحة دي بتوريك أنهي أسماء قليلة بتاعتك، وأنهي أسماء لازم تبقى زي بعض في كذا ملف.'
  },

  names: {
    note: {
      en: 'Blue dominates this page, and that is the lesson. Every key in <code>ngsw-config.json</code> and <code>manifest.webmanifest</code> is fixed; only the values are yours. In the TypeScript, <code>SwUpdate</code> and everything on it is Angular’s. The orange names are the few that link your own files together.',
      ar: 'الأزرق هو الغالب في الصفحة دي، ودي الفكرة. كل مفتاح في <code>ngsw-config.json</code> و<code>manifest.webmanifest</code> ثابت؛ القيم بس هي اللي بتاعتك. وفي الـ TypeScript، <code>SwUpdate</code> وكل اللي فيه بتاع أنجولار. والأسماء البرتقاني هي القليلة اللي بتربط ملفاتك ببعض.'
    },
    names: [
      /* --- shared: two files must agree --- */
      { n:'ngsw-config.json', k:'pub', as:'cache-policy.json',
        w:{ en:'Your config file’s name. <code>angular.json</code> points at it with <code>serviceWorker</code>. Rename the file and that line together.',
            ar:'اسم ملف الإعدادات بتاعك. <code>angular.json</code> بيشاور عليه بـ <code>serviceWorker</code>. غيّر اسم الملف والسطر ده مع بعض.' } },
      { n:'manifest.webmanifest', k:'pub', as:'shop.webmanifest',
        w:{ en:'The manifest file’s name. <code>index.html</code> links to it. Rename both, or the app silently stops being installable.',
            ar:'اسم ملف الـ manifest. <code>index.html</code> بيعمله link. غيّر الاتنين، وإلا التطبيق هيبطل ينفع يتسطّب من غير ما حد يقولك.' } },
      { n:'Updates', k:'pub',
        w:{ en:'Your service class. <code>app.ts</code> imports and injects it by this name.', ar:'كلاس الـ service بتاعك. <code>app.ts</code> بيعمله import وinject بالاسم ده.' } },
      { n:'ready', k:'pub',
        w:{ en:'Your signal on <code>Updates</code>. The root template reads <code>updates.ready()</code>, so both files change together.',
            ar:'الـ signal بتاعتك في <code>Updates</code>. التمبلت الرئيسي بيقرا <code>updates.ready()</code>، فالملفين بيتغيروا مع بعض.' } },
      { n:'reload', k:'pub', re:'(?<!location\\.)(?<![\\w$-])reload(?![\\w$-])',
        w:{ en:'Your method on <code>Updates</code>, called by the template’s button. (<code>location.reload</code> is the browser’s, a different name.)',
            ar:'الميثود بتاعتك في <code>Updates</code>، وزرار التمبلت هو اللي بيناديها. (و<code>location.reload</code> بتاعة المتصفح، اسم تاني.)' } },
      { n:'Network', k:'pub',
        w:{ en:'Your service class, injected by <code>app.ts</code>.', ar:'كلاس الـ service بتاعك، و<code>app.ts</code> بيعمله inject.' } },
      { n:'online', k:'pub', re:'(?<![\\w$\'-])online(?![\\w$\'-])',
        w:{ en:'Your signal on <code>Network</code>. The template reads <code>network.online()</code>. <code>\'online\'</code> in quotes is the browser’s event, a different name.',
            ar:'الـ signal بتاعتك في <code>Network</code>. التمبلت بيقرا <code>network.online()</code>. و<code>\'online\'</code> اللي بين علامات التنصيص ده الـ event بتاع المتصفح، اسم تاني.' } },

      /* --- yours, private to one file --- */
      { n:'app', k:'mine', only:[CFG], re:'(?<=")app(?=")',
        w:{ en:'An asset group name you chose. It only labels the group and its cache.', ar:'اسم جروب assets انت اخترته. مجرد اسم للجروب والكاش بتاعه.' } },
      { n:'assets', k:'mine', only:[CFG], re:'(?<=")assets(?=")',
        w:{ en:'Another asset group name you chose.', ar:'اسم جروب assets تاني انت اخترته.' } },
      { n:'api-fresh', k:'mine', only:[CFG],
        w:{ en:'A data group name you chose. Renaming it starts that group’s cache from empty.', ar:'اسم جروب داتا انت اخترته. لو غيّرته، الكاش بتاع الجروب ده بيبدأ فاضي.' } },
      { n:'api-static', k:'mine', only:[CFG],
        w:{ en:'Another data group name you chose.', ar:'اسم جروب داتا تاني انت اخترته.' } },
      { n:'updates', k:'mine', re:'(?<![\\w$/-])updates(?![\\w$-])',
        w:{ en:'The root component’s field holding <code>Updates</code>. Its class and its template use it.', ar:'الـ field في الـ component الرئيسي اللي شايل <code>Updates</code>. الكلاس والتمبلت بتوعه بيستخدموه.' } },
      { n:'network', k:'mine', re:'(?<![\\w$/-])network(?![\\w$-])',
        w:{ en:'The root component’s field holding <code>Network</code>.', ar:'الـ field في الـ component الرئيسي اللي شايل <code>Network</code>.' } },
      { n:'sw', k:'mine', only:['ts'],
        w:{ en:'Your name for the injected <code>SwUpdate</code>. Only <code>updates.ts</code> uses it.', ar:'اسمك للـ <code>SwUpdate</code> اللي عملته inject. <code>updates.ts</code> بس اللي بيستخدمه.' } },
      { n:'e', k:'mine', only:['updates.ts', 'updates.ts — today'],
        w:{ en:'The arrow function’s parameter: one update event. Call it anything.', ar:'الـ parameter بتاع الـ arrow function: event تحديث واحد. سمّيه أي حاجة.' } },
      { n:'on', k:'mine', only:['network.ts', 'network.ts · inline'],
        w:{ en:'Your name for the handler. Add and remove must pass this same function.', ar:'اسمك للـ handler. الـ add والـ remove لازم ياخدوا نفس الـ function دي.' } },
      { n:'off', k:'mine', only:['network.ts', 'network.ts · inline'],
        w:{ en:'Your name for the other handler.', ar:'اسمك للـ handler التاني.' } },

      /* --- ngsw-config.json: Angular's keys and values --- */
      { n:'$schema', k:'ng', w:{ en:'A standard JSON key: where your editor finds the rules for this file.', ar:'مفتاح JSON معروف: المكان اللي الإديتور بيلاقي فيه قواعد الملف ده.' } },
      { n:'index', k:'ng', re:'(?<=")index(?=")', w:{ en:'A service-worker config key: the page to serve for navigations.', ar:'مفتاح في إعدادات الـ service worker: الصفحة اللي بتتقدّم لما حد يفتح URL.' } },
      { n:'assetGroups', k:'ng', w:{ en:'A service-worker config key: files that belong to this version of the app.', ar:'مفتاح في إعدادات الـ service worker: الملفات اللي تبع النسخة دي من التطبيق.' } },
      { n:'dataGroups', k:'ng', w:{ en:'A service-worker config key: API responses to cache.', ar:'مفتاح في إعدادات الـ service worker: ردود الـ API اللي هتتكاش.' } },
      { n:'name', k:'ng', only:['json'], re:'(?<=")name(?=")',
        w:{ en:'A fixed key, in both JSON files. The value after it is yours.', ar:'مفتاح ثابت، في ملفين الـ JSON. القيمة اللي بعده بتاعتك.' } },
      { n:'installMode', k:'ng', w:{ en:'A service-worker config key: when to download the group.', ar:'مفتاح في إعدادات الـ service worker: امتى الجروب يتنزّل.' } },
      { n:'updateMode', k:'ng', w:{ en:'A service-worker config key: what to do with the group on a new version.', ar:'مفتاح في إعدادات الـ service worker: يعمل إيه في الجروب لما تيجي نسخة جديدة.' } },
      { n:'resources', k:'ng', w:{ en:'A service-worker config key.', ar:'مفتاح في إعدادات الـ service worker.' } },
      { n:'files', k:'ng', re:'(?<=")files(?=")', w:{ en:'A service-worker config key: glob patterns for your own files.', ar:'مفتاح في إعدادات الـ service worker: patterns لملفاتك انت.' } },
      { n:'urls', k:'ng', w:{ en:'A service-worker config key: the request URLs this group covers.', ar:'مفتاح في إعدادات الـ service worker: الـ URLs اللي الجروب ده بيغطيها.' } },
      { n:'cacheConfig', k:'ng', w:{ en:'A service-worker config key.', ar:'مفتاح في إعدادات الـ service worker.' } },
      { n:'strategy', k:'ng', w:{ en:'A service-worker config key: network first or cache first.', ar:'مفتاح في إعدادات الـ service worker: الشبكة الأول ولا الكاش الأول.' } },
      { n:'maxSize', k:'ng', w:{ en:'A service-worker config key: how many responses to keep.', ar:'مفتاح في إعدادات الـ service worker: يحتفظ بكام رد.' } },
      { n:'maxAge', k:'ng', w:{ en:'A service-worker config key: how old a cached response may get.', ar:'مفتاح في إعدادات الـ service worker: الرد المتكاش يفضل صالح قد إيه.' } },
      { n:'timeout', k:'ng', w:{ en:'A service-worker config key: how long to wait for the network before using the cache.', ar:'مفتاح في إعدادات الـ service worker: يستنى الشبكة قد إيه قبل ما يستخدم الكاش.' } },
      { n:'prefetch', k:'ng', w:{ en:'Angular’s value: download now, before anyone asks.', ar:'قيمة من أنجولار: نزّل دلوقتي، قبل ما حد يطلب.' } },
      { n:'lazy', k:'ng', w:{ en:'Angular’s value: cache a file the first time it is used.', ar:'قيمة من أنجولار: كاش الملف أول مرة يتستخدم.' } },
      { n:'freshness', k:'ng', w:{ en:'Angular’s value: network first, cache as the fallback.', ar:'قيمة من أنجولار: الشبكة الأول، والكاش لو فشلت.' } },
      { n:'performance', k:'ng', only:['json'], w:{ en:'Angular’s value: cache first.', ar:'قيمة من أنجولار: الكاش الأول.' } },

      /* --- angular.json, the manifest, index.html --- */
      { n:'serviceWorker', k:'ng', only:['json'], w:{ en:'A build option in <code>angular.json</code>: the path of your service-worker config.', ar:'option في الـ build جوه <code>angular.json</code>: مسار إعدادات الـ service worker بتاعتك.' } },
      { n:'ngswConfigPath', k:'ng', w:{ en:'The older build option that held the config path.', ar:'الـ option القديم اللي كان شايل مسار الإعدادات.' } },
      { n:'short_name', k:'ng', w:{ en:'A Web App Manifest key: the name under the home-screen icon.', ar:'مفتاح في الـ Web App Manifest: الاسم اللي تحت الأيقونة.' } },
      { n:'display', k:'ng', w:{ en:'A Web App Manifest key.', ar:'مفتاح في الـ Web App Manifest.' } },
      { n:'start_url', k:'ng', w:{ en:'A Web App Manifest key: the page the installed app opens.', ar:'مفتاح في الـ Web App Manifest: الصفحة اللي التطبيق المتسطّب بيفتحها.' } },
      { n:'theme_color', k:'ng', w:{ en:'A Web App Manifest key. Note the underscore.', ar:'مفتاح في الـ Web App Manifest. خد بالك من الـ underscore.' } },
      { n:'icons', k:'ng', re:'(?<=")icons(?=")', w:{ en:'A Web App Manifest key: the list of icons.', ar:'مفتاح في الـ Web App Manifest: ليستة الأيقونات.' } },
      { n:'manifest', k:'ng', re:'(?<=rel=")manifest(?=")', w:{ en:'The browser’s <code>rel</code> value that says “this link is the app manifest”.', ar:'قيمة <code>rel</code> بتاعة المتصفح اللي معناها «اللينك ده هو الـ manifest».' } },
      { n:'theme-color', k:'ng', w:{ en:'The browser’s meta name. Note the dash, unlike <code>theme_color</code>.', ar:'اسم الـ meta بتاع المتصفح. خد بالك من الشَرطة، عكس <code>theme_color</code>.' } },

      /* --- app.config.ts --- */
      { n:'provideServiceWorker', k:'ng', w:{ en:'Angular’s function that registers the worker.', ar:'الـ function بتاعة أنجولار اللي بتسجّل الـ worker.' } },
      { n:'ServiceWorkerModule', k:'ng', w:{ en:'The older NgModule that did the same.', ar:'الـ NgModule القديم اللي كان بيعمل نفس الحاجة.' } },
      { n:'ngsw-worker.js', k:'ng', w:{ en:'The worker file the build copies into <code>dist</code>. The string must match it; you do not pick it.', ar:'ملف الـ worker اللي الـ build بينسخه في <code>dist</code>. النص لازم يطابقه؛ انت مش بتختاره.' } },
      { n:'enabled', k:'ng', w:{ en:'An option key <code>provideServiceWorker</code> reads.', ar:'مفتاح إعداد <code>provideServiceWorker</code> بيقراه.' } },
      { n:'isDevMode', k:'ng', w:{ en:'Angular’s function: true under <code>ng serve</code> and development builds.', ar:'function من أنجولار: بترجع true مع <code>ng serve</code> والـ builds بتاعة التطوير.' } },
      { n:'registrationStrategy', k:'ng', w:{ en:'An option key: when to register the worker.', ar:'مفتاح إعداد: امتى يتسجّل الـ worker.' } },
      { n:'registerWhenStable:30000', k:'ng', w:{ en:'Angular’s value format: register when the app is stable, or after 30 seconds at most.', ar:'شكل قيمة من أنجولار: سجّل لما التطبيق يستقر، أو بعد 30 ثانية بالكتير.' } },

      /* --- updates.ts: SwUpdate and friends --- */
      { n:'SwUpdate', k:'ng', w:{ en:'Angular’s service for service-worker updates.', ar:'الـ service بتاعة أنجولار لتحديثات الـ service worker.' } },
      { n:'VersionReadyEvent', k:'ng', w:{ en:'Angular’s type for “a new version is downloaded and waiting”.', ar:'الـ type بتاع أنجولار لـ «فيه نسخة جديدة نزلت ومستنية».' } },
      { n:'VERSION_READY', k:'ng', w:{ en:'Angular’s event type string. TypeScript rejects a misspelling, because it knows every allowed value.', ar:'نص نوع الـ event بتاع أنجولار. TypeScript بيرفض أي غلطة إملائية فيه، عشان عارف كل القيم المسموحة.' } },
      { n:'isEnabled', k:'ng', w:{ en:'A <code>SwUpdate</code> property: false when the worker is not running (for example under <code>ng serve</code>).', ar:'property في <code>SwUpdate</code>: بتبقى false لما الـ worker مش شغال (زي مع <code>ng serve</code>).' } },
      { n:'versionUpdates', k:'ng', w:{ en:'A <code>SwUpdate</code> stream of update events.', ar:'stream في <code>SwUpdate</code> فيه أحداث التحديث.' } },
      { n:'available', k:'ng', w:{ en:'The older, deprecated <code>SwUpdate</code> stream.', ar:'الـ stream القديم في <code>SwUpdate</code>، وهو deprecated.' } },
      { n:'activateUpdate', k:'ng', w:{ en:'A <code>SwUpdate</code> method: switch to the waiting version.', ar:'ميثود في <code>SwUpdate</code>: اتنقل للنسخة المستنية.' } },
      { n:'checkForUpdate', k:'ng', w:{ en:'A <code>SwUpdate</code> method: ask the server now.', ar:'ميثود في <code>SwUpdate</code>: اسأل السيرفر دلوقتي.' } },
      { n:'type', k:'ng', only:['ts'], w:{ en:'A property every update event has.', ar:'property موجودة في أي event تحديث.' } },
      { n:'pipe', k:'ng', w:{ en:'RxJS’s method for chaining operators.', ar:'ميثود RxJS لتوصيل الـ operators ورا بعض.' } },
      { n:'filter', k:'ng', only:['ts'], w:{ en:'RxJS’s operator: let only matching events through.', ar:'operator من RxJS: عدّي بس الأحداث اللي بتطابق.' } },
      { n:'subscribe', k:'ng', w:{ en:'RxJS’s method that starts listening.', ar:'ميثود RxJS اللي بتبدأ تسمع.' } },
      { n:'takeUntilDestroyed', k:'ng', w:{ en:'Angular’s RxJS operator that unsubscribes when the owner is destroyed.', ar:'operator من أنجولار للـ RxJS بيعمل unsubscribe لما صاحبه يتشال.' } },
      { n:'location.reload', k:'ng', w:{ en:'The browser’s page reload.', ar:'الـ reload بتاع الصفحة من المتصفح.' } },

      /* --- network.ts: the browser --- */
      { n:'\'online\'', k:'ng', w:{ en:'The browser’s event name for “the connection is back”.', ar:'اسم الـ event بتاع المتصفح لـ «النت رجع».' } },
      { n:'\'offline\'', k:'ng', w:{ en:'The browser’s event name for “the connection dropped”.', ar:'اسم الـ event بتاع المتصفح لـ «النت قطع».' } },
      { n:'navigator.onLine', k:'ng', w:{ en:'The browser’s current connection state. Note the capital L.', ar:'حالة الاتصال الحالية من المتصفح. خد بالك من الـ L الكابيتال.' } },
      { n:'addEventListener', k:'ng', w:{ en:'The browser’s way to listen for an event.', ar:'طريقة المتصفح إنك تسمع لـ event.' } },
      { n:'removeEventListener', k:'ng', w:{ en:'The browser’s way to stop listening. It needs the same function you added.', ar:'طريقة المتصفح إنك تبطّل تسمع. محتاجة نفس الـ function اللي ضفتها.' } },
      { n:'DestroyRef', k:'ng', w:{ en:'Angular’s handle for “when this is destroyed”.', ar:'المسكة بتاعة أنجولار لـ «لما ده يتشال».' } },
      { n:'onDestroy', k:'ng', w:{ en:'A <code>DestroyRef</code> method.', ar:'ميثود في <code>DestroyRef</code>.' } },

      /* --- Angular's everyday words --- */
      { n:'@Injectable', k:'ng', w:{ en:'Angular’s decorator for a service.', ar:'الـ decorator بتاع أنجولار للـ service.' } },
      { n:'providedIn', k:'ng', w:{ en:'An option key Angular reads.', ar:'مفتاح إعداد أنجولار بيقراه.' } },
      { n:'inject', k:'ng', only:['ts'], w:{ en:'Angular’s function that hands you a service.', ar:'الـ function بتاعة أنجولار اللي بتديك service.' } },
      { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
      { n:'set', k:'ng', only:['ts'], w:{ en:'A signal method.', ar:'ميثود بتاعة الـ signal.' } },
      { n:'@if', k:'ng', w:{ en:'Angular’s conditional block.', ar:'بلوك الشرط بتاع أنجولار.' } },
      { n:'click', k:'ng', w:{ en:'The browser’s event name.', ar:'اسم الـ event بتاع المتصفح.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One deploy, six stops', ar: 'deploy واحد، ست محطات' },
    lead: {
      en: 'You deploy a new version. Someone has had the shop open since yesterday. Follow the new version from the build until it reaches their screen:',
      ar: 'انت عملت deploy لنسخة جديدة. فيه حد فاتح الـ shop من امبارح. امشي ورا النسخة الجديدة من الـ build لحد ما توصل لشاشته:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'angular.json', lang: 'json', who: { en: 'the build · reads', ar: 'الـ build · بيقرا' },
          code: ['"serviceWorker": "ngsw-config.json"'],
          say: { en: `The build option ${ng('serviceWorker')} is Angular’s. Its value is the name of <b>your</b> config file, ${pub('ngsw-config.json')}. The two must match. The build then copies ${ng('ngsw-worker.js')} into <code>dist</code> and writes a file list for the worker.`,
                 ar: `الـ option ${ng('serviceWorker')} بتاع أنجولار. وقيمته اسم ملف الإعدادات <b>بتاعك</b>، ${pub('ngsw-config.json')}. الاتنين لازم يبقوا زي بعض. وبعدين الـ build بينسخ ${ng('ngsw-worker.js')} في <code>dist</code> وبيكتب ليستة ملفات للـ worker.` } },
        { file: CFG, lang: 'json', who: { en: 'you · the policy', ar: 'انت · السياسة' },
          code: ['"name": "api-fresh",', '"urls": ["/api/**"],', '"cacheConfig": { "strategy": "freshness", "timeout": "3s" }'],
          say: { en: `Every key here is Angular’s: ${ng('urls')}, ${ng('cacheConfig')}, ${ng('strategy')}. So is the value ${ng('freshness')}. The only word you invented is the group name ${mine('api-fresh')}, and nothing else in the app refers to it.`,
                 ar: `كل مفتاح هنا بتاع أنجولار: ${ng('urls')}، ${ng('cacheConfig')}، ${ng('strategy')}. والقيمة ${ng('freshness')} كمان. الكلمة الوحيدة اللي انت ألّفتها هي اسم الجروب ${mine('api-fresh')}، ومفيش حاجة تانية في التطبيق بتشاور عليه.` } },
        { file: 'app.config.ts', lang: 'ts', who: { en: 'the app · registers', ar: 'التطبيق · بيسجّل' },
          code: ["provideServiceWorker('ngsw-worker.js', {", '  enabled: !isDevMode(),', '})'],
          say: { en: `The app registers the worker file by its fixed name. ${ng('enabled')}: <code>!isDevMode()</code> means the worker never runs under <code>ng serve</code>. Remember that before you decide it is broken.`,
                 ar: `التطبيق بيسجّل ملف الـ worker باسمه الثابت. و${ng('enabled')}: <code>!isDevMode()</code> معناها إن الـ worker عمره ما بيشتغل مع <code>ng serve</code>. افتكر ده قبل ما تقرر إنه بايظ.` } },
        { file: 'updates.ts', lang: 'ts', who: { en: 'your service · hears', ar: 'الـ service بتاعتك · بتسمع' },
          code: ['this.sw.versionUpdates', "  .pipe(filter((e): e is VersionReadyEvent => e.type === 'VERSION_READY'))", '  .subscribe(() => this.ready.set(true));'],
          say: { en: `The worker downloaded the new version and is holding it. ${ng('versionUpdates')}, ${ng('VersionReadyEvent')} and ${ng('VERSION_READY')} are Angular’s. ${mine('sw')} and ${mine('e')} are your local names. ${pub('ready')} is your signal, and another file reads it.`,
                 ar: `الـ worker نزّل النسخة الجديدة وماسكها. ${ng('versionUpdates')} و${ng('VersionReadyEvent')} و${ng('VERSION_READY')} بتوع أنجولار. و${mine('sw')} و${mine('e')} أسماء محلية بتاعتك. و${pub('ready')} الـ signal بتاعتك، وفيه ملف تاني بيقراها.` } },
        { file: 'app.html', lang: 'html', who: { en: 'the root template · shows', ar: 'التمبلت الرئيسي · بيعرض' },
          code: ['@if (updates.ready()) {', '  <button (click)="updates.reload()">Reload</button>', '}'],
          say: { en: `The template types ${pub('ready')} and ${pub('reload')} again, so they must match the service. ${mine('updates')} is the root component’s own field name for the service.`,
                 ar: `التمبلت بيكتب ${pub('ready')} و${pub('reload')} تاني، فلازم يبقوا زي الـ service. و${mine('updates')} اسم الـ field اللي الـ component الرئيسي مسمّي بيه الـ service.` } },
        { file: 'updates.ts', lang: 'ts', who: { en: 'your service · switches', ar: 'الـ service بتاعتك · بتبدّل' },
          code: ['async reload() {', '  await this.sw.activateUpdate();', '  location.reload();', '}'],
          say: { en: `${ng('activateUpdate')} is Angular’s: switch to the waiting version. ${ng('location.reload')} is the browser’s. Your method is also called ${pub('reload')}, which is allowed; they are different names on different objects.`,
                 ar: `${ng('activateUpdate')} بتاعة أنجولار: اتنقل للنسخة المستنية. و${ng('location.reload')} بتاعة المتصفح. والميثود بتاعتك اسمها ${pub('reload')} برضه، وده مسموح؛ دول أسماء مختلفة على objects مختلفة.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'Config: Angular’s keys, your values. Code: Angular’s <code>SwUpdate</code>, your service around it. The only names that must match across <i>your</i> files are the config file name, the manifest file name, and the members your template reads (<code>ready</code>, <code>reload</code>, <code>online</code>).',
        ar: 'الإعدادات: مفاتيح أنجولار، وقيمك انت. الكود: <code>SwUpdate</code> بتاع أنجولار، والـ service بتاعتك حواليه. والأسماء الوحيدة اللي لازم تبقى زي بعض بين ملفاتك <i>انت</i> هي اسم ملف الإعدادات، واسم ملف الـ manifest، والحاجات اللي التمبلت بتاعك بيقراها (<code>ready</code>، <code>reload</code>، <code>online</code>).' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Which file?', ar: 'أنهي ملف؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'Five kinds of file, three formats. Each piece lives in exactly one of them.',
      ar: 'خمس أنواع ملفات، وتلات أشكال. كل حتة ليها مكان واحد بس.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['which config to use', '<code>angular.json</code>', '<code>ng add @angular/pwa</code>, then you', `${ng('serviceWorker')} is Angular’s; the file name ${pub('ngsw-config.json')} is yours`],
            ar: ['أنهي ملف إعدادات', '<code>angular.json</code>', '<code>ng add @angular/pwa</code>، وبعدين انت', `${ng('serviceWorker')} بتاع أنجولار؛ واسم الملف ${pub('ngsw-config.json')} بتاعك`] },
          { en: ['what to cache', '<code>ngsw-config.json</code>', 'you', `every key is Angular’s; group names like ${mine('api-fresh')} are yours`],
            ar: ['تكاش إيه', '<code>ngsw-config.json</code>', 'انت', `كل مفتاح بتاع أنجولار؛ وأسماء الجروبات زي ${mine('api-fresh')} بتاعتك`] },
          { en: ['how the installed app looks', '<code>manifest.webmanifest</code>', 'you', 'every key is from the Web App Manifest standard; the values are yours'],
            ar: ['شكل التطبيق المتسطّب', '<code>manifest.webmanifest</code>', 'انت', 'كل مفتاح من standard الـ Web App Manifest؛ والقيم بتاعتك'] },
          { en: ['registering the worker', '<code>app.config.ts</code>', '<code>ng add</code>', `all Angular’s, including the file name ${ng('ngsw-worker.js')}`],
            ar: ['تسجيل الـ worker', '<code>app.config.ts</code>', '<code>ng add</code>', `كله بتاع أنجولار، حتى اسم الملف ${ng('ngsw-worker.js')}`] },
          { en: ['noticing a new version', '<code>updates.ts</code>', 'you', `${ng('SwUpdate')} and its members are Angular’s; ${pub('Updates')}, ${pub('ready')}, ${pub('reload')} are yours`],
            ar: ['ملاحظة النسخة الجديدة', '<code>updates.ts</code>', 'انت', `${ng('SwUpdate')} واللي فيه بتاع أنجولار؛ و${pub('Updates')} و${pub('ready')} و${pub('reload')} بتوعك`] },
          { en: ['showing the banners', '<code>app.ts</code>, <code>app.html</code>', 'you', `you pick ${mine('updates')} and ${mine('network')}; the members after the dot must copy the services`],
            ar: ['عرض الشرايط', '<code>app.ts</code>، <code>app.html</code>', 'انت', `انت بتختار ${mine('updates')} و${mine('network')}؛ والحاجات اللي بعد النقطة لازم تنسخ الـ services`] },
        ] },
      { t: 'ul',
        en: ['<b>JSON files have no names of yours in the keys.</b> If you are about to invent a key in <code>ngsw-config.json</code> or the manifest, stop: it will simply be ignored.',
             '<b><code>ng add @angular/pwa</code> writes the registration for you.</b> You do not create <code>ngsw-worker.js</code>, and you do not rename it.',
             '<b>Your own code starts at your service.</b> <code>SwUpdate</code> is Angular’s; wrapping it in a service of yours is what gives your template names like <code>ready</code> to read.'],
        ar: ['<b>ملفات الـ JSON مافيهاش أسماء بتاعتك في المفاتيح.</b> لو هتألّف مفتاح في <code>ngsw-config.json</code> أو الـ manifest، استنى: هيتجاهل وخلاص.',
             '<b><code>ng add @angular/pwa</code> بيكتبلك التسجيل.</b> انت مش بتعمل <code>ngsw-worker.js</code>، ومش بتغيّر اسمه.',
             '<b>كودك انت بيبدأ من الـ service بتاعتك.</b> <code>SwUpdate</code> بتاع أنجولار؛ ولما تلفّه في service بتاعتك، ده اللي بيدّي التمبلت أسماء زي <code>ready</code> يقراها.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'Every file, every name coloured', ar: 'كل الملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same shop app, complete. Hover a name to light it up everywhere. Then press <b>Rename test</b>: very little changes, and that is the point. Almost everything here is Angular’s or the browser’s.',
      ar: 'نفس تطبيق الـ shop، كامل. قف بالماوس على أي اسم وهينوّر في كل مكان. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: حاجات قليلة جدًا هتتغير، ودي الفكرة. تقريبًا كل حاجة هنا بتاعة أنجولار أو المتصفح.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'angular.json', lang: 'json', tag: { en: 'the build (excerpt)', ar: 'الـ build (جزء)' }, code: [
        '"build": {',
        '  "builder": "@angular/build:application",',
        '  "options": {',
        '    "serviceWorker": "ngsw-config.json"',
        '  }',
        '}' ] },
      { t: 'code', name: CFG, lang: 'json', tag: { en: 'the cache policy', ar: 'سياسة الكاش' }, code: [
        '{',
        '  "$schema": "./node_modules/@angular/service-worker/config/schema.json",',
        '  "index": "/index.html",',
        '  "assetGroups": [',
        '    {',
        '      "name": "app",',
        '      "installMode": "prefetch",',
        '      "resources": { "files": ["/favicon.ico", "/index.html", "/*.css", "/*.js"] }',
        '    },',
        '    {',
        '      "name": "assets",',
        '      "installMode": "lazy",',
        '      "updateMode": "prefetch",',
        '      "resources": { "files": ["/**/*.(svg|jpg|png|webp|woff2)"] }',
        '    }',
        '  ],',
        '  "dataGroups": [',
        '    {',
        '      "name": "api-fresh",',
        '      "urls": ["/api/**"],',
        '      "cacheConfig": { "strategy": "freshness", "maxSize": 100, "maxAge": "1h", "timeout": "3s" }',
        '    },',
        '    {',
        '      "name": "api-static",',
        '      "urls": ["/api/countries"],',
        '      "cacheConfig": { "strategy": "performance", "maxSize": 20, "maxAge": "7d" }',
        '    }',
        '  ]',
        '}' ] },
      { t: 'code', name: 'manifest.webmanifest', lang: 'json', tag: { en: 'the installable app', ar: 'التطبيق اللي بيتسطّب' }, code: [
        '{',
        '  "name": "Shop",',
        '  "short_name": "Shop",',
        '  "display": "standalone",',
        '  "start_url": "./",',
        '  "theme_color": "#1976d2",',
        '  "icons": [',
        '    { "src": "icons/icon-192x192.png", "sizes": "192x192", "type": "image/png" }',
        '  ]',
        '}' ] },
      { t: 'code', name: 'index.html', lang: 'html', tag: { en: 'in the head', ar: 'جوه الـ head' }, code: [
        '<link rel="manifest" href="manifest.webmanifest">',
        '<meta name="theme-color" content="#1976d2">' ] },
      { t: 'code', name: 'app.config.ts', lang: 'ts', tag: { en: 'written by ng add', ar: 'ng add كتبه' }, code: [
        "import { ApplicationConfig, isDevMode } from '@angular/core';",
        "import { provideServiceWorker } from '@angular/service-worker';",
        '',
        'export const appConfig: ApplicationConfig = {',
        '  providers: [',
        "    provideServiceWorker('ngsw-worker.js', {",
        '      enabled: !isDevMode(),',
        "      registrationStrategy: 'registerWhenStable:30000',",
        '    }),',
        '  ],',
        '};' ] },
      { t: 'code', name: 'updates.ts', lang: 'ts', tag: { en: 'your service', ar: 'الـ service بتاعتك' }, code: [
        "import { Injectable, inject, signal } from '@angular/core';",
        "import { takeUntilDestroyed } from '@angular/core/rxjs-interop';",
        "import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';",
        "import { filter } from 'rxjs';",
        '',
        "@Injectable({ providedIn: 'root' })",
        'export class Updates {',
        '  private readonly sw = inject(SwUpdate);',
        '  readonly ready = signal(false);',
        '',
        '  constructor() {',
        '    if (!this.sw.isEnabled) return;',
        '    this.sw.versionUpdates',
        "      .pipe(filter((e): e is VersionReadyEvent => e.type === 'VERSION_READY'), takeUntilDestroyed())",
        '      .subscribe(() => this.ready.set(true));',
        '    setInterval(() => this.sw.checkForUpdate(), 6 * 60 * 60 * 1000);',
        '  }',
        '',
        '  async reload() {',
        '    await this.sw.activateUpdate();',
        '    location.reload();',
        '  }',
        '}' ] },
      { t: 'code', name: 'network.ts', lang: 'ts', tag: { en: 'your service', ar: 'الـ service بتاعتك' }, code: [
        "import { DestroyRef, Injectable, inject, signal } from '@angular/core';",
        '',
        "@Injectable({ providedIn: 'root' })",
        'export class Network {',
        '  readonly online = signal(navigator.onLine);',
        '',
        '  constructor() {',
        '    const on = () => this.online.set(true);',
        '    const off = () => this.online.set(false);',
        "    addEventListener('online', on);",
        "    addEventListener('offline', off);",
        '    inject(DestroyRef).onDestroy(() => {',
        "      removeEventListener('online', on);",
        "      removeEventListener('offline', off);",
        '    });',
        '  }',
        '}' ] },
      { t: 'code', name: 'app.ts', lang: 'ts', tag: { en: 'the root component', ar: 'الـ component الرئيسي' }, code: [
        "import { Component, inject } from '@angular/core';",
        "import { Updates } from './updates';",
        "import { Network } from './network';",
        '',
        '@Component({',
        "  selector: 'app-root',",
        "  templateUrl: './app.html',",
        '})',
        'export class App {',
        '  readonly updates = inject(Updates);',
        '  readonly network = inject(Network);',
        '}' ] },
      { t: 'code', name: 'app.html', lang: 'html', tag: { en: 'the root template', ar: 'التمبلت الرئيسي' }, code: [
        '@if (updates.ready()) {',
        '  <div class="update-bar" role="status">',
        '    A new version is waiting.',
        '    <button (click)="updates.reload()">Reload</button>',
        '  </div>',
        '}',
        '@if (!network.online()) {',
        '  <div class="offline-bar" role="status">You are offline. Showing saved data.</div>',
        '}' ] },
      { t: 'nmtable' }
    ]
  },

  /* ------------------------------------------------------------ 4 */
  {
    id: 'rename',
    kicker: { en: 'Is it OK to change it?', ar: 'ينفع أغيّره؟' },
    title: { en: 'What breaks when you rename each name', ar: 'إيه اللي بيبوظ لما تغيّر كل اسم' },
    lead: {
      en: 'The TypeScript names behave like everywhere else: a missed rename is a compile or build error. The file names and JSON values are different. The compiler never reads them, so a mistake there shows up at runtime, or not at all.',
      ar: 'أسماء الـ TypeScript بتتصرف زي أي حتة تانية: لو نسيت تغيّر اسم، هتاخد compile أو build error. لكن أسماء الملفات وقيم الـ JSON حاجة تانية. الكومبايلر عمره ما بيقراها، فالغلطة فيها بتظهر وقت التشغيل، أو مابتظهرش خالص.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [pub('ngsw-config.json') + ' (the file)', '<code>"serviceWorker"</code> in <code>angular.json</code>', 'The production build fails: it cannot find the config.'],
            ar: [pub('ngsw-config.json') + ' (الملف)', '<code>"serviceWorker"</code> في <code>angular.json</code>', 'build الإنتاج بيفشل: مش لاقي ملف الإعدادات.'] },
          { en: [pub('manifest.webmanifest') + ' (the file)', 'the <code>href</code> in <code>index.html</code>', '<b>No build error.</b> The browser gets a 404 for the manifest (visible in the Network tab), and the app is no longer installable.'],
            ar: [pub('manifest.webmanifest') + ' (الملف)', 'الـ <code>href</code> في <code>index.html</code>', '<b>مفيش build error.</b> المتصفح بياخد 404 للـ manifest (هتشوفه في تاب Network)، والتطبيق بيبطل ينفع يتسطّب.'] },
          { en: [mine('api-fresh') + ' (a group name)', 'nothing', '<b>No error.</b> The worker treats it as a new group, so responses cached under the old name are not used. The cache starts empty.'],
            ar: [mine('api-fresh') + ' (اسم جروب)', 'ولا حاجة', '<b>مفيش error.</b> الـ worker بيعامله كجروب جديد، فالردود اللي اتكاشت بالاسم القديم مش هتتستخدم. الكاش بيبدأ فاضي.'] },
          { en: [pub('Updates') + ' or ' + pub('Network') + ' (a class)', 'the import and <code>inject()</code> in <code>app.ts</code>', 'Compile error.'],
            ar: [pub('Updates') + ' أو ' + pub('Network') + ' (كلاس)', 'الـ import والـ <code>inject()</code> في <code>app.ts</code>', 'Compile error.'] },
          { en: [pub('ready') + ', ' + pub('reload') + ', ' + pub('online'), 'every read in <code>app.html</code>', 'Build error: the template is type-checked against the service.'],
            ar: [pub('ready') + '، ' + pub('reload') + '، ' + pub('online'), 'كل مكان بيقراهم في <code>app.html</code>', 'Error في الـ build: التمبلت بيتعمله type-check قصاد الـ service.'] },
          { en: [mine('updates') + ', ' + mine('network') + ' (fields)', 'the same component’s template', 'Build error.'],
            ar: [mine('updates') + '، ' + mine('network') + ' (fields)', 'تمبلت نفس الـ component', 'Error في الـ build.'] },
          { en: [mine('sw') + ', ' + mine('e') + ', ' + mine('on') + ', ' + mine('off'), 'only inside that one file', 'Compile error inside the file.'],
            ar: [mine('sw') + '، ' + mine('e') + '، ' + mine('on') + '، ' + mine('off'), 'جوه الملف ده بس', 'Compile error جوه الملف.'] },
          { en: [ng('ngsw-worker.js'), 'you cannot: the build names this file', 'Change the string anyway and registration fails at runtime: a console error, and the app runs with no worker.'],
            ar: [ng('ngsw-worker.js'), 'مينفعش: الـ build هو اللي بيسمّي الملف ده', 'لو غيّرت النص برضه، التسجيل هيفشل وقت التشغيل: error في الكونسول، والتطبيق شغال من غير worker.'] },
          { en: [ng('VERSION_READY'), 'you cannot rename it; you can only misspell it', 'Compile error: TypeScript knows every allowed event type and says the comparison can never be true.'],
            ar: [ng('VERSION_READY'), 'مينفعش تغيّره؛ ممكن بس تكتبه غلط', 'Compile error: TypeScript عارف كل أنواع الـ events المسموحة وبيقولك إن المقارنة دي عمرها ما هتبقى true.'] },
          { en: [`a config key like ${ng('strategy')} or ${ng('theme_color')}`, 'you cannot rename these; you can only misspell them', '<b>Do not count on an error.</b> Keep the <code>$schema</code> line so your editor checks the file against Angular’s schema.'],
            ar: [`مفتاح إعداد زي ${ng('strategy')} أو ${ng('theme_color')}`, 'دول مينفعش يتغيروا؛ ممكن بس تكتبهم غلط', '<b>متعتمدش إن هيطلع error.</b> سيب سطر <code>$schema</code> عشان الإديتور يشيّك الملف على الـ schema بتاعة أنجولار.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b>. In <code>ngsw-config.json</code> only the four group names change. In the TypeScript, <code>SwUpdate</code>, <code>versionUpdates</code> and <code>activateUpdate</code> do not move; only the names around them do.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b>. في <code>ngsw-config.json</code> أسماء الجروبات الأربعة بس هي اللي هتتغير. وفي الـ TypeScript، <code>SwUpdate</code> و<code>versionUpdates</code> و<code>activateUpdate</code> مش هيتحركوا؛ الأسماء اللي حواليهم بس هي اللي بتتغير.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتاعتك' },
    title: { en: 'The fixed names, by owner', ar: 'الأسماء الثابتة، حسب صاحبها' },
    lead: {
      en: 'Four owners share this topic. When a name is not yours, knowing whose it is tells you which documentation to open.',
      ar: 'فيه أربع أصحاب متشاركين في الموضوع ده. لما الاسم مايبقاش بتاعك، معرفتك صاحبه مين بتقولك تفتح أنهي documentation.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Owner', 'Names', 'What to know'], ar: ['صاحبه', 'الأسماء', 'تعرف إيه'] },
        rows: [
          { en: ['Angular’s service worker config', `${ng('assetGroups')}, ${ng('dataGroups')}, ${ng('installMode')}, ${ng('updateMode')}, ${ng('urls')}, ${ng('cacheConfig')}, ${ng('strategy')}, ${ng('timeout')}; values ${ng('prefetch')}, ${ng('lazy')}, ${ng('freshness')}, ${ng('performance')}`, 'camelCase keys. The values are a closed list: there is no strategy called <code>"network-first"</code>.'],
            ar: ['إعدادات الـ service worker بتاعة أنجولار', `${ng('assetGroups')}، ${ng('dataGroups')}، ${ng('installMode')}، ${ng('updateMode')}، ${ng('urls')}، ${ng('cacheConfig')}، ${ng('strategy')}، ${ng('timeout')}؛ والقيم ${ng('prefetch')}، ${ng('lazy')}، ${ng('freshness')}، ${ng('performance')}`, 'مفاتيح camelCase. والقيم ليستة مقفولة: مفيش strategy اسمها <code>"network-first"</code>.'] },
          { en: ['The Web App Manifest standard', `${ng('short_name')}, ${ng('start_url')}, ${ng('theme_color')}, ${ng('display')}, ${ng('icons')}`, 'snake_case, because the web standard says so. Browsers ignore members they do not know.'],
            ar: ['standard الـ Web App Manifest', `${ng('short_name')}، ${ng('start_url')}، ${ng('theme_color')}، ${ng('display')}، ${ng('icons')}`, 'snake_case، عشان الـ standard بتاع الويب بيقول كده. والمتصفحات بتتجاهل أي حاجة ماتعرفهاش.'] },
          { en: ['Angular’s TypeScript API', `${ng('provideServiceWorker')}, ${ng('SwUpdate')}, ${ng('isEnabled')}, ${ng('versionUpdates')}, ${ng('VERSION_READY')}, ${ng('activateUpdate')}, ${ng('checkForUpdate')}`, 'Imported from <code>@angular/service-worker</code>. Your editor autocompletes all of them.'],
            ar: ['الـ API بتاع أنجولار في TypeScript', `${ng('provideServiceWorker')}، ${ng('SwUpdate')}، ${ng('isEnabled')}، ${ng('versionUpdates')}، ${ng('VERSION_READY')}، ${ng('activateUpdate')}، ${ng('checkForUpdate')}`, 'جايين من <code>@angular/service-worker</code>. والإديتور بيكمّلهم كلهم لوحده.'] },
          { en: ['The browser', `${ng('navigator.onLine')}, ${ng("'online'")}, ${ng("'offline'")}, ${ng('addEventListener')}, ${ng('location.reload')}, ${ng('manifest')}, ${ng('theme-color')}`, 'Watch the spelling: <code>onLine</code> with a capital L, the events all lower case, <code>theme-color</code> with a dash.'],
            ar: ['المتصفح', `${ng('navigator.onLine')}، ${ng("'online'")}، ${ng("'offline'")}، ${ng('addEventListener')}، ${ng('location.reload')}، ${ng('manifest')}، ${ng('theme-color')}`, 'خد بالك من الإملا: <code>onLine</code> بـ L كابيتال، والـ events كلها small، و<code>theme-color</code> بشَرطة.'] },
        ] },
      { t: 'p',
        en: 'Three spellings of the same colour setting in three places, <code>theme_color</code>, <code>theme-color</code> and (in a CSS file) <code>--theme-color</code> if you add one, are a good reminder: the format decides the spelling, not you.',
        ar: 'تلات طرق لكتابة نفس إعداد اللون في تلات أماكن، <code>theme_color</code> و<code>theme-color</code> و(في ملف CSS) <code>--theme-color</code> لو عملت واحد، دي فكرة كويسة تفضل فاكرها: شكل الملف هو اللي بيحدد الإملا، مش انت.' }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick the few names that are yours', ar: 'تختار الأسماء القليلة اللي بتاعتك إزاي' },
    lead: {
      en: 'You own very few names here, so make each one say something.',
      ar: 'الأسماء اللي بتاعتك هنا قليلة جدًا، فخلّي كل واحد فيهم يقول حاجة.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['a data group', '<code>api-fresh</code>, <code>api-static</code>', '<code>group1</code>, <code>cache</code>', 'When you debug the cache in DevTools, the group name tells you which rule applied.'],
            ar: ['جروب داتا', '<code>api-fresh</code>، <code>api-static</code>', '<code>group1</code>، <code>cache</code>', 'لما تدوّر على مشكلة في الكاش من DevTools، اسم الجروب بيقولك أنهي قاعدة اتطبقت.'] },
          { en: ['the update service', '<code>Updates</code>, <code>AppUpdates</code>', '<code>SwUpdate</code>, <code>SwUpdateService</code>', 'Do not reuse Angular’s class name. Two <code>SwUpdate</code>s in one import list is a real confusion.'],
            ar: ['service التحديثات', '<code>Updates</code>، <code>AppUpdates</code>', '<code>SwUpdate</code>، <code>SwUpdateService</code>', 'متستخدمش اسم الكلاس بتاع أنجولار تاني. اتنين <code>SwUpdate</code> في نفس ليستة الـ import لخبطة حقيقية.'] },
          { en: ['the “new version” signal', '<code>ready</code>, <code>updateReady</code>', '<code>available</code>', 'It matches the event you listen for, <code>VERSION_READY</code>. <code>available</code> was the name of the old, deprecated stream.'],
            ar: ['الـ signal بتاعة «فيه نسخة جديدة»', '<code>ready</code>، <code>updateReady</code>', '<code>available</code>', 'بيطابق الـ event اللي بتسمعه، <code>VERSION_READY</code>. و<code>available</code> كان اسم الـ stream القديم اللي بقى deprecated.'] },
          { en: ['the connection signal', '<code>online</code>, <code>isOnline</code>', '<code>onLine</code>', 'One letter away from the browser’s <code>navigator.onLine</code>. Pick a spelling nobody will confuse with it.'],
            ar: ['الـ signal بتاعة الاتصال', '<code>online</code>، <code>isOnline</code>', '<code>onLine</code>', 'حرف واحد بعيد عن <code>navigator.onLine</code> بتاع المتصفح. اختار كتابة محدش هيلخبطها بيه.'] },
          { en: ['the config file', 'keep <code>ngsw-config.json</code>', 'renaming it for style', 'Every guide and every teammate expects this name. Renaming it only costs you.'],
            ar: ['ملف الإعدادات', 'سيبه <code>ngsw-config.json</code>', 'إنك تغيّره عشان الشكل', 'كل شرح وكل زميل متوقع الاسم ده. تغييره بيكلّفك وبس.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Three places where the name is not free', ar: 'تلات أماكن الاسم فيهم مش براحتك' },
    lead: {
      en: 'These look like strings you typed, so they look like yours. Each one is dictated by something else.',
      ar: 'دول شكلهم نصوص انت كتبتها، فشكلهم بتوعك. بس كل واحد فيهم حاجة تانية هي اللي بتفرضه.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'The worker file name comes from the build', ar: 'اسم ملف الـ worker جاي من الـ build' }, blocks: [
        { t: 'p',
          en: `The build copies Angular’s worker into <code>dist</code> as ${ng('ngsw-worker.js')}, next to a generated <code>ngsw.json</code> that lists your files and their hashes. The string in <code>provideServiceWorker</code> is a URL for that file. It is a string only because the browser needs a URL, not because you get to choose it.`,
          ar: `الـ build بينسخ الـ worker بتاع أنجولار في <code>dist</code> باسم ${ng('ngsw-worker.js')}، جنب ملف متولّد اسمه <code>ngsw.json</code> فيه ليستة ملفاتك والـ hashes بتاعتها. والنص اللي في <code>provideServiceWorker</code> ده URL للملف ده. هو نص بس عشان المتصفح محتاج URL، مش عشان انت اللي تختاره.` }
      ]},
      { t: 'step', n: 'B', title: { en: 'The event type is a closed list', ar: 'نوع الـ event ليستة مقفولة' }, blocks: [
        { t: 'code', name: 'updates.ts', lang: 'ts', tag: { en: 'the filter', ar: 'الفلتر' }, code: [
          "filter((e): e is VersionReadyEvent => e.type === 'VERSION_READY')" ] },
        { t: 'p',
          en: `${ng('VERSION_READY')} is one of a few fixed values Angular sends. The parameter name ${mine('e')} is yours; <code>e is VersionReadyEvent</code> tells TypeScript that after this filter, the event has the ready-event fields. The string must match Angular’s list exactly, and TypeScript checks it for you.`,
          ar: `${ng('VERSION_READY')} واحدة من شوية قيم ثابتة أنجولار بيبعتها. واسم الـ parameter ${mine('e')} بتاعك؛ و<code>e is VersionReadyEvent</code> بتقول لـ TypeScript إن بعد الفلتر ده، الـ event فيه الحقول بتاعة ready. والنص لازم يطابق ليستة أنجولار بالظبط، وTypeScript بيشيّكه عنك.` }
      ]},
      { t: 'step', n: 'C', title: { en: 'The manifest uses the web’s spelling, not JavaScript’s', ar: 'الـ manifest بيستخدم إملا الويب، مش إملا جافاسكريبت' }, blocks: [
        { t: 'pair',
          bad:  { name: 'manifest.webmanifest · camelCase', lang: 'json', code: ['{', '  "shortName": "Shop",', '  "themeColor": "#1976d2"', '}'] },
          good: { name: 'manifest.webmanifest · the standard', lang: 'json', code: ['{', '  "short_name": "Shop",', '  "theme_color": "#1976d2"', '}'] } },
        { t: 'p',
          en: 'Everywhere else in an Angular project you write camelCase, so your fingers will type <code>shortName</code>. The manifest standard uses snake_case, and browsers skip members they do not recognise. No error; the icon label just falls back to the long name.',
          ar: 'في أي حتة تانية في مشروع أنجولار بتكتب camelCase، فصوابعك هتكتب <code>shortName</code> لوحدها. لكن الـ standard بتاع الـ manifest بيستخدم snake_case، والمتصفحات بتعدّي أي حاجة ماتعرفهاش. مفيش error؛ الاسم اللي تحت الأيقونة بيرجع للاسم الطويل وخلاص.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: 'Older setups, same idea, different names', ar: 'إعدادات أقدم، نفس الفكرة، أسماء مختلفة' },
    lead: {
      en: 'You will meet three older spellings in existing projects. Each one does the same job as today’s version.',
      ar: 'هتقابل تلات كتابات أقدم في المشاريع الموجودة. كل واحدة بتعمل نفس شغل النسخة بتاعة النهارده.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'app.module.ts — older style', lang: 'ts', code: [
          '@NgModule({',
          '  imports: [',
          "    ServiceWorkerModule.register('ngsw-worker.js', {",
          '      enabled: !isDevMode(),',
          "      registrationStrategy: 'registerWhenStable:30000',",
          '    }),',
          '  ],',
          '})',
          'export class AppModule {}' ] },
        good: { name: 'app.config.ts — today', lang: 'ts', code: [
          'export const appConfig: ApplicationConfig = {',
          '  providers: [',
          "    provideServiceWorker('ngsw-worker.js', {",
          '      enabled: !isDevMode(),',
          "      registrationStrategy: 'registerWhenStable:30000',",
          '    }),',
          '  ],',
          '};' ] } },
      { t: 'p',
        en: 'Same file name, same options, same values. Only the wrapper changed.',
        ar: 'نفس اسم الملف، ونفس الـ options، ونفس القيم. اللي اتغير بس هو اللي حواليهم.' },
      { t: 'pair',
        bad:  { name: 'updates.ts — older style', lang: 'ts', code: [
          'this.sw.available.subscribe(() => this.ready.set(true));' ] },
        good: { name: 'updates.ts — today', lang: 'ts', code: [
          'this.sw.versionUpdates',
          "  .pipe(filter((e): e is VersionReadyEvent => e.type === 'VERSION_READY'))",
          '  .subscribe(() => this.ready.set(true));' ] } },
      { t: 'p',
        en: '<code>available</code> has been deprecated since Angular 13. Do not use it in new code. <code>versionUpdates</code> sends every kind of update event, which is why you filter for the one you want.',
        ar: '<code>available</code> بقى deprecated من أنجولار 13. متستخدمهوش في كود جديد. و<code>versionUpdates</code> بيبعت كل أنواع أحداث التحديث، وعشان كده بتفلتر على اللي انت عايزه.' },
      { t: 'pair',
        bad:  { name: 'angular.json — older builder', lang: 'json', code: [
          '"options": {',
          '  "serviceWorker": true,',
          '  "ngswConfigPath": "ngsw-config.json"',
          '}' ] },
        good: { name: 'angular.json — application builder', lang: 'json', code: [
          '"options": {',
          '  "serviceWorker": "ngsw-config.json"',
          '}' ] } },
      { t: 'p',
        en: 'With the older browser builder, <code>serviceWorker</code> was a true/false switch and the path lived in <code>ngswConfigPath</code>. With the application builder, <code>serviceWorker</code> holds the path itself. Either way, the path must match your file name.',
        ar: 'مع الـ browser builder القديم، <code>serviceWorker</code> كان مفتاح true/false والمسار كان في <code>ngswConfigPath</code>. مع الـ application builder، <code>serviceWorker</code> نفسه شايل المسار. وفي الحالتين، المسار لازم يطابق اسم ملفك.' }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, and says nothing', ar: 'مش بيعمل حاجة، ومش بيقول حاجة' },
    title: { en: 'Mistakes that fail silently', ar: 'غلطات بتفشل في صمت' },
    lead: {
      en: 'A service worker that is not doing its job looks exactly like an app without one. The page loads, the data shows. That is why these mistakes survive so long.',
      ar: 'الـ service worker اللي مش بيعمل شغله شكله بالظبط زي تطبيق مافيهوش واحد. الصفحة بتحمّل، والداتا بتظهر. وعشان كده الغلطات دي بتعيش فترة طويلة.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'Nobody injects the update service', ar: 'محدش بيعمل inject لـ service التحديثات' }, blocks: [
        { t: 'pair',
          bad:  { name: 'app.ts · forgot it', lang: 'ts', code: [
            'export class App {',
            '  readonly network = inject(Network);',
            '}' ] },
          good: { name: 'app.ts · injects it', lang: 'ts', code: [
            'export class App {',
            '  readonly updates = inject(Updates);',
            '  readonly network = inject(Network);',
            '}' ] } },
        { t: 'p', en: 'A <code>providedIn: \'root\'</code> service is created the first time something injects it. If nothing does, its constructor never runs, nobody subscribes to <code>versionUpdates</code>, and the banner never appears. Users keep the old version. No error anywhere.',
                  ar: 'الـ service اللي <code>providedIn: \'root\'</code> بيتعمل أول مرة حد يعمله inject. لو محدش عمل، الـ constructor بتاعه عمره ما هيشتغل، ومحدش هيعمل subscribe لـ <code>versionUpdates</code>، والشريط عمره ما هيظهر. والناس هتفضل على النسخة القديمة. ومفيش أي error.' }
      ]},
      { t: 'step', n: '2', title: { en: 'Testing under ng serve', ar: 'إنك تجرّب بـ ng serve' }, blocks: [
        { t: 'pair',
          bad:  { name: 'terminal · dev server', lang: 'bash', code: ['ng serve'] },
          good: { name: 'terminal · real build', lang: 'bash', code: ['ng build', 'npx http-server dist/shop/browser -p 4200'] } },
        { t: 'p', en: '<code>enabled: !isDevMode()</code> turns the worker off in development, so <code>sw.isEnabled</code> is false and your constructor returns straight away. Nothing is wrong with your code. Serve a production build and check DevTools → Application → Service Workers.',
                  ar: '<code>enabled: !isDevMode()</code> بتقفل الـ worker في التطوير، فـ <code>sw.isEnabled</code> بتبقى false والـ constructor بتاعك بيرجع على طول. مفيش حاجة غلط في كودك. شغّل build إنتاج وبص في DevTools ← Application ← Service Workers.' }
      ]},
      { t: 'step', n: '3', title: { en: 'Removing a listener you never added', ar: 'إنك تشيل listener عمرك ما ضفته' }, blocks: [
        { t: 'pair',
          bad:  { name: 'network.ts · inline', lang: 'ts', code: [
            "addEventListener('online', () => this.online.set(true));",
            '// later:',
            "removeEventListener('online', () => this.online.set(true));" ] },
          good: { name: 'network.ts', lang: 'ts', code: [
            'const on = () => this.online.set(true);',
            "addEventListener('online', on);",
            '// later:',
            "removeEventListener('online', on);" ] } },
        { t: 'p', en: 'The browser removes a listener by comparing the <b>function itself</b>, not its text. Two arrow functions that look the same are two different functions, so the left version removes nothing. Giving the handler a name, <code>on</code>, is what lets you pass the same one twice.',
                  ar: 'المتصفح بيشيل الـ listener بإنه يقارن <b>الـ function نفسها</b>، مش الكلام المكتوب. اتنين arrow functions شكلهم زي بعض يبقوا اتنين functions مختلفين، فالنسخة اللي على الشمال مابتشيلش حاجة. إنك تدّي الـ handler اسم، <code>on</code>، هو اللي بيخليك تبعت نفس الواحدة مرتين.' }
      ]},
      { t: 'step', n: '4', title: { en: 'A URL pattern that never matches', ar: 'pattern للـ URL عمره ما بيطابق' }, blocks: [
        { t: 'pair',
          bad:  { name: 'ngsw-config.json · wrong origin', lang: 'json', code: ['"urls": ["/api/**"]'] },
          good: { name: 'ngsw-config.json · full address', lang: 'json', code: ['"urls": ["https://api.shop.example/**"]'] } },
        { t: 'p', en: 'If your API lives on another domain, a pattern that starts with <code>/api</code> only covers your own origin. The requests go straight to the network, nothing is cached, and offline the list is simply empty. Write the address the app really calls.',
                  ar: 'لو الـ API بتاعك على domain تاني، الـ pattern اللي بيبدأ بـ <code>/api</code> بيغطي الـ origin بتاعك بس. الريكويستات بتروح للشبكة على طول، ومفيش حاجة بتتكاش، ومن غير نت الليستة بتبقى فاضية وخلاص. اكتب العنوان اللي التطبيق بينادي عليه فعلًا.' }
      ]},
      { t: 'step', n: '5', title: { en: 'Cache-first on data that changes', ar: 'الكاش الأول على داتا بتتغير' }, blocks: [
        { t: 'pair',
          bad:  { name: 'ngsw-config.json · prices', lang: 'json', code: ['"urls": ["/api/prices"],', '"cacheConfig": { "strategy": "performance", "maxAge": "7d" }'] },
          good: { name: 'ngsw-config.json · prices', lang: 'json', code: ['"urls": ["/api/prices"],', '"cacheConfig": { "strategy": "freshness", "maxAge": "1h", "timeout": "3s" }'] } },
        { t: 'p', en: '<code>performance</code> answers from the cache without asking the server while the entry is younger than <code>maxAge</code>. The prices look perfectly normal, they are just a week old. Use <code>freshness</code> unless the data really is static.',
                  ar: '<code>performance</code> بيرد من الكاش من غير ما يسأل السيرفر طول ما الرد أصغر من <code>maxAge</code>. الأسعار شكلها طبيعي خالص، بس عمرها أسبوع. استخدم <code>freshness</code> إلا لو الداتا ثابتة فعلًا.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it does nothing', ar: 'لما مايعملش حاجة' },
    title: { en: 'Six questions, in this order', ar: 'ست أسئلة، بالترتيب ده' },
    lead: {
      en: 'No banner, no offline data, no install button. Ask these before changing any code.',
      ar: 'مفيش شريط، ولا داتا من غير نت، ولا زرار تسطيب. اسأل دول قبل ما تغيّر أي كود.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Am I running a production build from a static server, not <code>ng serve</code>? Does DevTools → Application → Service Workers show it activated?',
                  ar: '<b>1.</b> أنا مشغّل build إنتاج من سيرفر ثابت، مش <code>ng serve</code>؟ وDevTools ← Application ← Service Workers بيوريه activated؟' },
      { t: 'chk', en: '<b>2.</b> Does <code>"serviceWorker"</code> in <code>angular.json</code> name my config file exactly?',
                  ar: '<b>2.</b> <code>"serviceWorker"</code> في <code>angular.json</code> مكتوب فيه اسم ملف الإعدادات بتاعي بالظبط؟' },
      { t: 'chk', en: '<b>3.</b> Does something inject my update service, so its constructor actually runs?',
                  ar: '<b>3.</b> فيه حاجة بتعمل inject لـ service التحديثات بتاعتي، عشان الـ constructor بتاعها يشتغل فعلًا؟' },
      { t: 'chk', en: '<b>4.</b> Does the request URL in the Network tab match a <code>urls</code> pattern, origin included?',
                  ar: '<b>4.</b> الـ URL بتاع الريكويست في تاب Network بيطابق pattern في <code>urls</code>، بالـ origin كمان؟' },
      { t: 'chk', en: '<b>5.</b> Are the config and manifest keys spelled exactly as Angular and the standard spell them? Does my editor flag anything against <code>$schema</code>?',
                  ar: '<b>5.</b> مفاتيح الإعدادات والـ manifest مكتوبة بالظبط زي ما أنجولار والـ standard بيكتبوها؟ والإديتور معلّم على أي حاجة بسبب <code>$schema</code>؟' },
      { t: 'chk', en: '<b>6.</b> Is the tab still on the old version because the new one is waiting? Close every tab of the site, or use “Update on reload” in DevTools while developing.',
                  ar: '<b>6.</b> التاب لسه على النسخة القديمة عشان الجديدة مستنية؟ اقفل كل تابات الموقع، أو استخدم «Update on reload» في DevTools وانت بتطوّر.' }
    ]
  }
  ]
};
