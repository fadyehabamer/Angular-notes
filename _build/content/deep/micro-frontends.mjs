/* ==================================================================
   Micro frontends, name by name — the companion page after the
   micro-frontends topic. One running example (a shell that loads a
   checkout remote with Native Federation) followed across two apps that
   are built and deployed separately, every name coloured by who owns it.
   ================================================================== */

/* a name in running text, coloured like the code and linked on hover */
const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

const R_CFG = 'checkout · federation.config.js';
const R_ROUTES = 'checkout · checkout.routes.ts';
const S_MAIN = 'shell · main.ts';
const S_BOOT = 'shell · bootstrap.ts';
const S_ROUTES = 'shell · app.routes.ts';
const S_MANIFEST = 'shell · federation.manifest.json';

export default {
  topic: 'micro-frontends',
  tab: 'Micro frontends, name by name — The Angular Signal',
  title: { en: 'Micro frontends, name by name', ar: 'الـ micro frontends، اسم اسم' },
  say: {
    en: 'Two apps, two teams, two deployments, held together by a handful of strings that no compiler checks. One shell loading one checkout remote, every name coloured, and exactly which strings both teams must agree on.',
    ar: 'تطبيقين، وفريقين، واتنين deploy، ماسكهم في بعض شوية strings مفيش كومبايلر بيشيّكها. shell واحد بيحمّل remote واحد للـ checkout، وكل اسم ملوّن، وبالظبط أنهي strings الفريقين لازم يتفقوا عليها.'
  },
  lead: {
    en: 'The idea fits in a line: <b>the shell asks for a remote by name at runtime, and the remote hands over whatever it exposed under an agreed key.</b> The confusing part is the names. The word <code>checkout</code> appears as a remote name, a URL path, a folder and a file, and only one of those is the link between the two apps. Worse, a mismatch is never a build error: each app builds fine on its own. This page shows which names cross the boundary.',
    ar: 'الفكرة في سطر: <b>الـ shell بيطلب الـ remote باسمه وقت التشغيل، والـ remote بيسلّم اللي هو عارضه تحت مفتاح متفقين عليه.</b> اللي بيلخبط هو الأسماء. كلمة <code>checkout</code> بتظهر كاسم remote، وكمسار URL، وكفولدر، وكملف، وواحدة بس فيهم هي الرابط بين التطبيقين. والأوحش إن أي اختلاف عمره ما بيبقى build error: كل تطبيق بيتبني تمام لوحده. الصفحة دي بتوريك أنهي أسماء بتعدّي الحدود.'
  },

  names: {
    note: {
      en: 'The orange names are the contract between two teams. They are plain strings (a remote name, an exposed key, an exported constant), and because the two apps are built separately, <b>no compiler ever sees both sides</b>. A mismatch shows up at runtime, when a user opens the page. Everything from <code>@angular-architects/native-federation</code> is fixed.',
      ar: 'الأسماء البرتقاني هي العقد بين فريقين. هي strings عادية (اسم remote، ومفتاح معروض، وconstant متعمله export)، وعشان التطبيقين بيتبنوا كل واحد لوحده، <b>مفيش كومبايلر بيشوف الناحيتين أبدًا</b>. أي اختلاف بيظهر وقت التشغيل، لما يوزر يفتح الصفحة. وأي حاجة جاية من <code>@angular-architects/native-federation</code> ثابتة.'
    },
    names: [
      /* --- shared across the two apps: the contract --- */
      { n:'checkout', k:'pub', re:"(?<=(?:name|remoteName): ')checkout(?=')|(?<=\")checkout(?=\":)",
        w:{ en:'The remote’s name. The shell’s manifest key and <code>remoteName</code> must be exactly this; keep the remote’s own <code>name</code> the same. (The URL path <code>\'checkout\'</code> and the folder are different names.)',
            ar:'اسم الـ remote. المفتاح في الـ manifest بتاع الـ shell و<code>remoteName</code> لازم يبقوا ده بالظبط؛ وخلّي <code>name</code> بتاع الـ remote نفسه زيهم. (ومسار الـ URL <code>\'checkout\'</code> والفولدر أسماء تانية.)' } },
      { n:'./routes', k:'pub', as:'./entry',
        w:{ en:'The exposed key. The remote declares it in <code>exposes</code>; the shell types it again as <code>exposedModule</code>.',
            ar:'المفتاح المعروض. الـ remote بيعلنه في <code>exposes</code>؛ والـ shell بيكتبه تاني في <code>exposedModule</code>.' } },
      { n:'CHECKOUT_ROUTES', k:'pub', as:'PICKUP_ROUTES',
        w:{ en:'The constant exported from the exposed file. The shell reads <code>m.CHECKOUT_ROUTES</code>, and <code>m</code> is untyped, so TypeScript cannot catch a typo.',
            ar:'الـ constant المتعمله export من الملف المعروض. الـ shell بيقرا <code>m.CHECKOUT_ROUTES</code>، و<code>m</code> مالوش type، فـ TypeScript مايقدرش يمسك أي غلطة إملائية.' } },
      { n:'federation.manifest.json', k:'pub', as:'remotes.json',
        w:{ en:'The shell’s manifest file. <code>initFederation</code> names it, so the file and that string change together.', ar:'ملف الـ manifest بتاع الـ shell. <code>initFederation</code> بيكتب اسمه، فالملف والنص ده بيتغيروا مع بعض.' } },
      { n:'bootstrap', k:'pub', as:'start', re:"(?<=\\./)bootstrap(?=')",
        w:{ en:'The file that starts Angular. <code>main.ts</code> imports it by this path, after federation is ready.', ar:'الملف اللي بيشغّل أنجولار. <code>main.ts</code> بيعمله import بالمسار ده، بعد ما الـ federation يجهز.' } },
      { n:'scope:checkout', k:'pub', as:'scope:pickup',
        w:{ en:'A tag you invented. Each project declares its tags, and the lint rule must type them the same way.', ar:'tag انت اخترعته. كل مشروع بيعلن الـ tags بتاعته، وقاعدة الـ lint لازم تكتبها بنفس الشكل.' } },
      { n:'scope:shared', k:'pub', as:'scope:common',
        w:{ en:'Another tag you invented, shared between project configs and the lint rule.', ar:'tag تاني انت اخترعته، متشارك بين إعدادات المشاريع وقاعدة الـ lint.' } },

      /* --- yours, private to one app --- */
      { n:'shell', k:'mine', re:"(?<=name: ')shell(?=')",
        w:{ en:'The shell’s own federation name. Nothing else refers to it.', ar:'اسم الـ federation بتاع الـ shell نفسه. مفيش حاجة تانية بتشاور عليه.' } },
      { n:'CheckoutPage', k:'mine',
        w:{ en:'The remote’s component. Only the remote’s own files know it; the shell never imports it.', ar:'الـ component بتاع الـ remote. ملفات الـ remote بس اللي تعرفه؛ والـ shell عمره ما بيعمله import.' } },
      { n:'RemoteDown', k:'mine',
        w:{ en:'The shell’s fallback component, shown when the remote cannot load.', ar:'الـ component الاحتياطي بتاع الـ shell، بيظهر لما الـ remote مايعرفش يتحمّل.' } },
      { n:'m', k:'mine', only:[S_ROUTES, 'shell · app.routes.ts — older', 'shell · app.routes.ts — today', 'app.routes.ts · no fallback', 'app.routes.ts · fallback', 'shell · runtime load'],
        w:{ en:'The loaded module. Call it anything; its type is <code>any</code>.', ar:'الـ module اللي اتحمّل. سمّيه أي حاجة؛ والـ type بتاعه <code>any</code>.' } },
      { n:'err', k:'mine', only:[S_MAIN, S_BOOT], w:{ en:'A parameter name for the error.', ar:'اسم parameter للـ error.' } },

      /* --- Native Federation and its config --- */
      { n:'require', k:'ng', w:{ en:'Node’s CommonJS import.', ar:'الـ import بتاع Node (CommonJS).' } },
      { n:'module.exports', k:'ng', w:{ en:'Node’s CommonJS way to export the config object.', ar:'طريقة Node (CommonJS) إنك تعمل export لأوبجكت الإعدادات.' } },
      { n:'withNativeFederation', k:'ng', w:{ en:'Native Federation’s config helper.', ar:'الـ helper بتاع Native Federation للإعدادات.' } },
      { n:'withModuleFederationPlugin', k:'ng', w:{ en:'The older webpack-based helper.', ar:'الـ helper القديم المبني على webpack.' } },
      { n:'name', k:'ng', re:"(?<![\\w$.-])name(?=: ')", w:{ en:'A config key the federation tools read. The value is yours.', ar:'مفتاح إعداد أدوات الـ federation بتقراه. والقيمة بتاعتك.' } },
      { n:'exposes', k:'ng', w:{ en:'A config key: what this remote offers. The keys inside it are yours.', ar:'مفتاح إعداد: الحاجات اللي الـ remote ده بيقدّمها. والمفاتيح اللي جواه بتاعتك.' } },
      { n:'shared', k:'ng', only:['ts'], w:{ en:'A config key: which packages the apps share instead of each bringing its own copy.', ar:'مفتاح إعداد: أنهي باكدجات التطبيقات بتتشاركها بدل ما كل واحد يجيب نسخته.' } },
      { n:'shareAll', k:'ng', w:{ en:'A helper: share every dependency in <code>package.json</code>.', ar:'helper: شارك كل الـ dependencies اللي في <code>package.json</code>.' } },
      { n:'singleton', k:'ng', w:{ en:'A sharing option: exactly one copy at runtime.', ar:'option للمشاركة: نسخة واحدة بس وقت التشغيل.' } },
      { n:'strictVersion', k:'ng', w:{ en:'A sharing option: fail if the versions do not match.', ar:'option للمشاركة: افشل لو الفيرجنز مش متطابقة.' } },
      { n:'requiredVersion', k:'ng', w:{ en:'A sharing option.', ar:'option للمشاركة.' } },
      { n:'\'auto\'', k:'ng', w:{ en:'The value “read the version from <code>package.json</code>”.', ar:'القيمة اللي معناها «اقرا الفيرجن من <code>package.json</code>».' } },
      { n:'initFederation', k:'ng', w:{ en:'Native Federation’s start-up function. It reads the manifest before Angular loads.', ar:'function البداية في Native Federation. بتقرا الـ manifest قبل ما أنجولار يتحمّل.' } },
      { n:'loadRemoteModule', k:'ng', w:{ en:'The function that fetches a remote at runtime.', ar:'الـ function اللي بتجيب الـ remote وقت التشغيل.' } },
      { n:'remoteName', k:'ng', w:{ en:'An option key <code>loadRemoteModule</code> reads.', ar:'مفتاح إعداد <code>loadRemoteModule</code> بيقراه.' } },
      { n:'exposedModule', k:'ng', w:{ en:'An option key <code>loadRemoteModule</code> reads.', ar:'مفتاح إعداد <code>loadRemoteModule</code> بيقراه.' } },
      { n:'remoteEntry.json', k:'ng', w:{ en:'The file every Native Federation remote’s build writes. You do not name it.', ar:'الملف اللي الـ build بتاع أي remote في Native Federation بيكتبه. انت مش بتسمّيه.' } },
      { n:'remoteEntry.js', k:'ng', w:{ en:'The older webpack equivalent.', ar:'المقابل القديم بتاع webpack.' } },
      { n:'remoteEntry', k:'ng', re:'(?<![\\w$-])remoteEntry(?=:)', w:{ en:'An option key in the older <code>loadRemoteModule</code>.', ar:'مفتاح إعداد في <code>loadRemoteModule</code> القديمة.' } },
      { n:'type', k:'ng', re:"(?<![\\w$-])type(?=: ')", w:{ en:'An option key in the older <code>loadRemoteModule</code>.', ar:'مفتاح إعداد في <code>loadRemoteModule</code> القديمة.' } },

      /* --- Angular and the browser --- */
      { n:'Routes', k:'ng', re:'(?<![\\w$./-])Routes(?![\\w$-])', w:{ en:'Angular’s type for a route list.', ar:'الـ type بتاع أنجولار لقايمة routes.' } },
      { n:'path', k:'ng', only:['ts'], w:{ en:'A route key Angular reads. The URL text after it is yours, and separate from the remote’s name.', ar:'مفتاح route أنجولار بيقراه. نص الـ URL اللي بعده بتاعك، ومنفصل عن اسم الـ remote.' } },
      { n:'component', k:'ng', only:['ts'], w:{ en:'A route key Angular reads.', ar:'مفتاح route أنجولار بيقراه.' } },
      { n:'loadChildren', k:'ng', w:{ en:'A route key: load these child routes lazily. It accepts a promise of routes.', ar:'مفتاح route: حمّل الـ routes الفرعية دي lazy. وبياخد promise فيها routes.' } },
      { n:'bootstrapApplication', k:'ng', w:{ en:'Angular’s function that starts a standalone app.', ar:'الـ function بتاعة أنجولار اللي بتشغّل تطبيق standalone.' } },
      { n:'console.error', k:'ng', w:{ en:'The browser’s console.', ar:'الكونسول بتاع المتصفح.' } },

      /* --- Nx boundaries --- */
      { n:'tags', k:'ng', w:{ en:'An Nx project config key.', ar:'مفتاح في إعدادات مشروع Nx.' } },
      { n:'depConstraints', k:'ng', w:{ en:'A key the Nx boundaries lint rule reads.', ar:'مفتاح قاعدة الـ lint بتاعة Nx للحدود بتقراه.' } },
      { n:'sourceTag', k:'ng', w:{ en:'A key the Nx boundaries lint rule reads.', ar:'مفتاح قاعدة الـ lint بتاعة Nx للحدود بتقراه.' } },
      { n:'onlyDependOnLibsWithTags', k:'ng', w:{ en:'A key the Nx boundaries lint rule reads.', ar:'مفتاح قاعدة الـ lint بتاعة Nx للحدود بتقراه.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One click on Checkout, six stops', ar: 'كليك واحدة على Checkout، ست محطات' },
    lead: {
      en: 'The shop is a <b>shell</b> app. The checkout is a separate <b>remote</b> app, built and deployed by another team. A user clicks “Checkout”. Follow the request from one app into the other and back:',
      ar: 'الـ shop عبارة عن تطبيق <b>shell</b>. والـ checkout تطبيق <b>remote</b> منفصل، فريق تاني بيبنيه ويعمله deploy. يوزر داس «Checkout». امشي ورا الطلب من تطبيق للتاني وراجع:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: S_MAIN, lang: 'ts', who: { en: 'shell · at start-up', ar: 'الـ shell · أول ما يبدأ' },
          code: ["initFederation('federation.manifest.json')", "  .then(_ => import('./bootstrap'));"],
          say: { en: `Before Angular even loads, the shell reads its list of remotes from ${pub('federation.manifest.json')}. ${ng('initFederation')} is Native Federation’s. Only then does it import ${pub('bootstrap')}, which starts Angular.`,
                 ar: `قبل ما أنجولار يتحمّل أصلًا، الـ shell بيقرا ليستة الـ remotes بتاعته من ${pub('federation.manifest.json')}. و${ng('initFederation')} بتاعة Native Federation. وبعدها بس بيعمل import لـ ${pub('bootstrap')}، اللي بيشغّل أنجولار.` } },
        { file: S_MANIFEST, lang: 'json', who: { en: 'shell · where remotes live', ar: 'الـ shell · الـ remotes فين' },
          code: ['"checkout": "http://localhost:4201/remoteEntry.json"'],
          say: { en: `The key ${pub('checkout')} is the remote’s name. The value is where that remote is deployed, ending in ${ng('remoteEntry.json')}, a file the remote’s build writes for you.`,
                 ar: `المفتاح ${pub('checkout')} هو اسم الـ remote. والقيمة هي مكان الـ deploy بتاعه، وآخرها ${ng('remoteEntry.json')}، ملف الـ build بتاع الـ remote بيكتبه لوحده.` } },
        { file: S_ROUTES, lang: 'ts', who: { en: 'shell · asks', ar: 'الـ shell · بيطلب' },
          code: ["loadRemoteModule({ remoteName: 'checkout', exposedModule: './routes' })"],
          say: { en: `The user goes to <code>/checkout</code>. The shell asks for the remote named ${pub('checkout')} (must equal the manifest key) and for the piece called ${pub('./routes')}. ${ng('remoteName')} and ${ng('exposedModule')} are the library’s keys; both values are the contract.`,
                 ar: `اليوزر راح لـ <code>/checkout</code>. الـ shell بيطلب الـ remote اللي اسمه ${pub('checkout')} (لازم يساوي المفتاح اللي في الـ manifest) والحتة اللي اسمها ${pub('./routes')}. و${ng('remoteName')} و${ng('exposedModule')} مفاتيح المكتبة؛ والقيمتين هما العقد.` } },
        { file: R_CFG, lang: 'ts', who: { en: 'remote · offers', ar: 'الـ remote · بيعرض' },
          code: ["name: 'checkout',", 'exposes: {', "  './routes': './src/app/checkout/checkout.routes.ts',", '},'],
          say: { en: `In the other team’s repo, the remote calls itself ${pub('checkout')} and offers one key, ${pub('./routes')}, which points at a real file. The key is public; the file path behind it is the remote’s private business.`,
                 ar: `في الـ repo بتاع الفريق التاني، الـ remote بيسمّي نفسه ${pub('checkout')} وبيعرض مفتاح واحد، ${pub('./routes')}، بيشاور على ملف حقيقي. المفتاح ده عام؛ ومسار الملف اللي وراه شغل الـ remote لوحده.` } },
        { file: R_ROUTES, lang: 'ts', who: { en: 'remote · exports', ar: 'الـ remote · بيعمل export' },
          code: ['export const CHECKOUT_ROUTES: Routes = [', "  { path: '', component: CheckoutPage },", '];'],
          say: { en: `That file exports ${pub('CHECKOUT_ROUTES')}. The shell will read it by name. ${mine('CheckoutPage')} stays inside the remote: the shell never sees it.`,
                 ar: `الملف ده بيعمل export لـ ${pub('CHECKOUT_ROUTES')}. والـ shell هيقراه بالاسم. و${mine('CheckoutPage')} بيفضل جوه الـ remote: الـ shell عمره ما بيشوفه.` } },
        { file: S_ROUTES, lang: 'ts', who: { en: 'shell · takes it', ar: 'الـ shell · بياخده' },
          code: ['  .then(m => m.CHECKOUT_ROUTES)', '  .catch(() => [{ path: \'**\', component: RemoteDown }]),'],
          say: { en: `Back in the shell, ${mine('m')} is the loaded file, typed <code>any</code>. <code>m.CHECKOUT_ROUTES</code> must copy the remote’s export exactly, and nothing checks it. The ${ng('loadChildren')} route then uses those routes, or ${mine('RemoteDown')} if the remote could not be loaded.`,
                 ar: `رجوعًا للـ shell، ${mine('m')} هو الملف اللي اتحمّل، ونوعه <code>any</code>. و<code>m.CHECKOUT_ROUTES</code> لازم ينسخ الـ export بتاع الـ remote بالظبط، ومفيش حاجة بتشيّكه. وبعدين الـ route اللي فيها ${ng('loadChildren')} بتستخدم الـ routes دي، أو ${mine('RemoteDown')} لو الـ remote ماعرفش يتحمّل.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'Three strings cross the boundary: the remote name <code>checkout</code>, the exposed key <code>./routes</code>, and the export <code>CHECKOUT_ROUTES</code>. Both teams must spell them identically, and neither build will tell you if they do not.',
        ar: 'تلات strings بس بيعدّوا الحدود: اسم الـ remote <code>checkout</code>، والمفتاح المعروض <code>./routes</code>، والـ export <code>CHECKOUT_ROUTES</code>. الفريقين لازم يكتبوهم بالظبط زي بعض، ولا build فيهم هيقولك لو مش كده.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Which app? Which team?', ar: 'أنهي تطبيق؟ وأنهي فريق؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'In ordinary Angular, “which side?” means parent or child. Here it means which <b>repository</b>, which <b>team</b>, and which <b>deployment</b>.',
      ar: 'في أنجولار العادي، «أنهي ناحية؟» معناها الأب ولا الابن. هنا معناها أنهي <b>repo</b>، وأنهي <b>فريق</b>، وأنهي <b>deploy</b>.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: [`<code>name: 'checkout'</code>, <code>exposes</code>`, 'remote: <code>federation.config.js</code>', 'checkout team', `they pick ${pub('checkout')} and ${pub('./routes')}; the shell must copy both`],
            ar: [`<code>name: 'checkout'</code>، <code>exposes</code>`, 'الـ remote: <code>federation.config.js</code>', 'فريق الـ checkout', `هما بيختاروا ${pub('checkout')} و${pub('./routes')}؛ والـ shell لازم ينسخ الاتنين`] },
          { en: ['<code>export const CHECKOUT_ROUTES</code>', 'remote: <code>checkout.routes.ts</code>', 'checkout team', `they pick ${pub('CHECKOUT_ROUTES')}; the shell must copy it`],
            ar: ['<code>export const CHECKOUT_ROUTES</code>', 'الـ remote: <code>checkout.routes.ts</code>', 'فريق الـ checkout', `هما بيختاروا ${pub('CHECKOUT_ROUTES')}؛ والـ shell لازم ينسخه`] },
          { en: ['the page components', 'remote', 'checkout team', `private: ${mine('CheckoutPage')}`],
            ar: ['الـ components بتاعة الصفحات', 'الـ remote', 'فريق الـ checkout', `خاص: ${mine('CheckoutPage')}`] },
          { en: ['<code>"checkout": "…/remoteEntry.json"</code>', 'shell: <code>federation.manifest.json</code>', 'shell team (or the deploy pipeline)', `key copies ${pub('checkout')}; the URL is wherever the remote is deployed`],
            ar: ['<code>"checkout": "…/remoteEntry.json"</code>', 'الـ shell: <code>federation.manifest.json</code>', 'فريق الـ shell (أو الـ deploy pipeline)', `المفتاح بينسخ ${pub('checkout')}؛ والـ URL هو مكان الـ deploy بتاع الـ remote`] },
          { en: ['<code>loadRemoteModule({ … })</code>', 'shell: <code>app.routes.ts</code>', 'shell team', `${ng('remoteName')}, ${ng('exposedModule')} are fixed; their values copy the remote`],
            ar: ['<code>loadRemoteModule({ … })</code>', 'الـ shell: <code>app.routes.ts</code>', 'فريق الـ shell', `${ng('remoteName')} و${ng('exposedModule')} ثابتين؛ وقيمهم بتنسخ الـ remote`] },
          { en: ['<code>path: \'checkout\'</code>', 'shell: <code>app.routes.ts</code>', 'shell team', 'the shell alone: it is just the URL, not the remote’s name'],
            ar: ['<code>path: \'checkout\'</code>', 'الـ shell: <code>app.routes.ts</code>', 'فريق الـ shell', 'الـ shell لوحده: ده مجرد الـ URL، مش اسم الـ remote'] },
        ] },
      { t: 'ul',
        en: ['<b>The remote decides the names; the shell copies them.</b> Like an output name in a child component, the side that offers something names it.',
             '<b>The shell never imports the remote’s files.</b> It only knows three strings. If you find an <code>import … from \'../checkout/…\'</code> in the shell, the two apps are no longer independent.',
             '<b>The URL and the remote name are separate.</b> They are both <code>checkout</code> here out of habit. You could serve the remote at <code>/pay</code> without touching the remote at all.'],
        ar: ['<b>الـ remote هو اللي بيختار الأسماء؛ والـ shell بينسخها.</b> زي اسم الـ output في component ابن، الناحية اللي بتعرض الحاجة هي اللي بتسمّيها.',
             '<b>الـ shell عمره ما بيعمل import لملفات الـ remote.</b> هو يعرف تلات strings وبس. لو لقيت <code>import … from \'../checkout/…\'</code> في الـ shell، يبقى التطبيقين مابقوش مستقلين.',
             '<b>الـ URL واسم الـ remote حاجتين منفصلين.</b> الاتنين <code>checkout</code> هنا من باب العادة. تقدر تعرض الـ remote على <code>/pay</code> من غير ما تلمس الـ remote خالص.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'Both apps, every name coloured', ar: 'التطبيقين، وكل اسم ملوّن' },
    lead: {
      en: 'The same example, complete. Each file’s label says which app it belongs to. Hover a name to see it light up on both sides of the boundary. Then press <b>Rename test</b>: the contract names change in both apps at once, which is exactly the coordination a real rename needs.',
      ar: 'نفس المثال، كامل. عنوان كل ملف بيقولك تبع أنهي تطبيق. قف بالماوس على أي اسم وهتشوفه بينوّر في الناحيتين. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: أسماء العقد بتتغير في التطبيقين مرة واحدة، وده بالظبط التنسيق اللي أي تغيير حقيقي محتاجه.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'terminal', lang: 'bash', tag: { en: 'setting up', ar: 'التجهيز' }, code: [
        'ng add @angular-architects/native-federation --project shell --type dynamic-host',
        'ng add @angular-architects/native-federation --project checkout --type remote --port 4201' ] },
      { t: 'code', name: R_CFG, lang: 'ts', tag: { en: 'remote', ar: 'الـ remote' }, code: [
        "const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');",
        '',
        'module.exports = withNativeFederation({',
        "  name: 'checkout',",
        '  exposes: {',
        "    './routes': './src/app/checkout/checkout.routes.ts',",
        '  },',
        '  shared: {',
        "    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),",
        '  },',
        '});' ] },
      { t: 'code', name: R_ROUTES, lang: 'ts', tag: { en: 'remote', ar: 'الـ remote' }, code: [
        "import { Routes } from '@angular/router';",
        "import { CheckoutPage } from './checkout-page';",
        '',
        'export const CHECKOUT_ROUTES: Routes = [',
        "  { path: '', component: CheckoutPage },",
        '];' ] },
      { t: 'code', name: 'shell · federation.config.js', lang: 'ts', tag: { en: 'shell', ar: 'الـ shell' }, code: [
        "const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');",
        '',
        'module.exports = withNativeFederation({',
        "  name: 'shell',",
        '  shared: {',
        "    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),",
        '  },',
        '});' ] },
      { t: 'code', name: S_MANIFEST, lang: 'json', tag: { en: 'shell, in public/', ar: 'الـ shell، في public/' }, code: [
        '{',
        '  "checkout": "http://localhost:4201/remoteEntry.json"',
        '}' ] },
      { t: 'code', name: S_MAIN, lang: 'ts', tag: { en: 'shell', ar: 'الـ shell' }, code: [
        "import { initFederation } from '@angular-architects/native-federation';",
        '',
        "initFederation('federation.manifest.json')",
        '  .catch(err => console.error(err))',
        "  .then(_ => import('./bootstrap'))",
        '  .catch(err => console.error(err));' ] },
      { t: 'code', name: S_BOOT, lang: 'ts', tag: { en: 'shell', ar: 'الـ shell' }, code: [
        "import { bootstrapApplication } from '@angular/platform-browser';",
        "import { App } from './app/app';",
        "import { appConfig } from './app/app.config';",
        '',
        'bootstrapApplication(App, appConfig).catch(err => console.error(err));' ] },
      { t: 'code', name: S_ROUTES, lang: 'ts', tag: { en: 'shell', ar: 'الـ shell' }, code: [
        "import { Routes } from '@angular/router';",
        "import { loadRemoteModule } from '@angular-architects/native-federation';",
        "import { Home } from './home';",
        "import { RemoteDown } from './remote-down';",
        '',
        'export const routes: Routes = [',
        "  { path: '', component: Home },",
        '  {',
        "    path: 'checkout',",
        '    loadChildren: () =>',
        "      loadRemoteModule({ remoteName: 'checkout', exposedModule: './routes' })",
        '        .then(m => m.CHECKOUT_ROUTES)',
        "        .catch(() => [{ path: '**', component: RemoteDown }]),",
        '  },',
        '];' ] },
      { t: 'nmtable' }
    ]
  },

  /* ------------------------------------------------------------ 4 */
  {
    id: 'rename',
    kicker: { en: 'Is it OK to change it?', ar: 'ينفع أغيّره؟' },
    title: { en: 'What breaks when you rename each name', ar: 'إيه اللي بيبوظ لما تغيّر كل اسم' },
    lead: {
      en: 'Inside one app, renames behave normally: compile errors. Across the boundary there is no compiler, and the remote and the shell are deployed at different times. A contract rename is a <b>release plan</b>, not an edit.',
      ar: 'جوه تطبيق واحد، تغيير الأسماء بيتصرف عادي: compile errors. لكن بين التطبيقين مفيش كومبايلر، والـ remote والـ shell بيتعملهم deploy في أوقات مختلفة. تغيير اسم في العقد ده <b>خطة release</b>، مش تعديل.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [pub('checkout') + ' (the remote name)', 'the manifest key and <code>remoteName</code> in the shell, and the remote’s own <code>name</code>', '<b>Both builds pass.</b> When a user opens the route, the shell cannot find a remote by that name: a runtime error, or your fallback.'],
            ar: [pub('checkout') + ' (اسم الـ remote)', 'المفتاح في الـ manifest و<code>remoteName</code> في الـ shell، و<code>name</code> بتاع الـ remote نفسه', '<b>الـ build بتاع الاتنين بيعدّي.</b> لما يوزر يفتح الـ route، الـ shell مش هيلاقي remote بالاسم ده: runtime error، أو الـ fallback بتاعك.'] },
          { en: [pub('./routes') + ' (the exposed key)', '<code>exposedModule</code> in the shell', '<b>Both builds pass.</b> Loading fails at runtime when the route is opened.'],
            ar: [pub('./routes') + ' (المفتاح المعروض)', '<code>exposedModule</code> في الـ shell', '<b>الـ build بتاع الاتنين بيعدّي.</b> التحميل بيفشل وقت التشغيل لما الـ route تتفتح.'] },
          { en: [pub('CHECKOUT_ROUTES') + ' (the export)', '<code>m.CHECKOUT_ROUTES</code> in the shell', '<b>Both builds pass</b>, because <code>m</code> is <code>any</code>. The shell gets <code>undefined</code> instead of routes, and the route breaks at runtime.'],
            ar: [pub('CHECKOUT_ROUTES') + ' (الـ export)', '<code>m.CHECKOUT_ROUTES</code> في الـ shell', '<b>الـ build بتاع الاتنين بيعدّي</b>، عشان <code>m</code> نوعه <code>any</code>. الـ shell بياخد <code>undefined</code> بدل الـ routes، والـ route بتبوظ وقت التشغيل.'] },
          { en: ['the file behind <code>./routes</code>', 'the path in <code>exposes</code> (remote only)', 'The remote’s build fails: the file it should expose does not exist. The shell is unaffected.'],
            ar: ['الملف اللي ورا <code>./routes</code>', 'المسار في <code>exposes</code> (الـ remote بس)', 'الـ build بتاع الـ remote بيفشل: الملف اللي المفروض يعرضه مش موجود. والـ shell مالوش دعوة.'] },
          { en: [pub('federation.manifest.json') + ' (the file)', 'the string in <code>initFederation</code>', 'No build error. At start-up the fetch fails; <code>main.ts</code> logs it and still starts Angular, but no remote is known.'],
            ar: [pub('federation.manifest.json') + ' (الملف)', 'النص اللي في <code>initFederation</code>', 'مفيش build error. أول ما يبدأ، الـ fetch بيفشل؛ و<code>main.ts</code> بيكتبه في الكونسول وبرضه بيشغّل أنجولار، بس مفيش ولا remote معروف.'] },
          { en: [pub('bootstrap') + ' (the file)', "<code>import('./bootstrap')</code> in <code>main.ts</code>", 'Build error: the dynamic import points at a file that does not exist.'],
            ar: [pub('bootstrap') + ' (الملف)', "<code>import('./bootstrap')</code> في <code>main.ts</code>", 'Build error: الـ import الديناميكي بيشاور على ملف مش موجود.'] },
          { en: [mine('CheckoutPage') + ', ' + mine('RemoteDown') + ', ' + mine('m'), 'only inside their own app', 'Compile error inside that app. The ordinary case.'],
            ar: [mine('CheckoutPage') + '، ' + mine('RemoteDown') + '، ' + mine('m'), 'جوه التطبيق بتاعهم بس', 'Compile error جوه التطبيق ده. الحالة العادية.'] },
          { en: ['the URL <code>path: \'checkout\'</code>', 'links in the shell that go there', 'The remote does not care. Only the shell’s own links need updating.'],
            ar: ['الـ URL <code>path: \'checkout\'</code>', 'اللينكات في الـ shell اللي بتروح هناك', 'الـ remote مالوش دعوة. لينكات الـ shell بس هي اللي محتاجة تتحدّث.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b>. <code>checkout</code>, <code>./routes</code> and <code>CHECKOUT_ROUTES</code> change in the remote’s files and the shell’s files together. In real life those are two pull requests in two repositories, and the remote must keep the old names until the shell has switched.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b>. <code>checkout</code> و<code>./routes</code> و<code>CHECKOUT_ROUTES</code> بيتغيروا في ملفات الـ remote وملفات الـ shell مع بعض. في الحقيقة دول اتنين pull requests في اتنين repos، والـ remote لازم يفضل محتفظ بالأسماء القديمة لحد ما الـ shell يتنقل.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتاعتك' },
    title: { en: 'The fixed names, by owner', ar: 'الأسماء الثابتة، حسب صاحبها' },
    lead: {
      en: 'Four owners. Knowing which one a name belongs to tells you where its documentation lives.',
      ar: 'أربع أصحاب. لما تعرف الاسم تبع مين، هتعرف الـ documentation بتاعته فين.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Owner', 'Names', 'What to know'], ar: ['صاحبه', 'الأسماء', 'تعرف إيه'] },
        rows: [
          { en: ['Native Federation', `${ng('withNativeFederation')}, ${ng('shareAll')}, ${ng('initFederation')}, ${ng('loadRemoteModule')}, ${ng('remoteName')}, ${ng('exposedModule')}, ${ng('remoteEntry.json')}`, 'From <code>@angular-architects/native-federation</code>. <code>remoteEntry.json</code> is written by the remote’s build.'],
            ar: ['Native Federation', `${ng('withNativeFederation')}، ${ng('shareAll')}، ${ng('initFederation')}، ${ng('loadRemoteModule')}، ${ng('remoteName')}، ${ng('exposedModule')}، ${ng('remoteEntry.json')}`, 'جايين من <code>@angular-architects/native-federation</code>. و<code>remoteEntry.json</code> الـ build بتاع الـ remote هو اللي بيكتبه.'] },
          { en: ['The federation config', `${ng('name')}, ${ng('exposes')}, ${ng('shared')}, ${ng('singleton')}, ${ng('strictVersion')}, ${ng('requiredVersion')}, ${ng("'auto'")}`, 'Fixed keys. The values after <code>name</code> and the keys inside <code>exposes</code> are yours.'],
            ar: ['إعدادات الـ federation', `${ng('name')}، ${ng('exposes')}، ${ng('shared')}، ${ng('singleton')}، ${ng('strictVersion')}، ${ng('requiredVersion')}، ${ng("'auto'")}`, 'مفاتيح ثابتة. والقيم اللي بعد <code>name</code> والمفاتيح اللي جوه <code>exposes</code> بتاعتك.'] },
          { en: ['Angular', `${ng('Routes')}, ${ng('path')}, ${ng('component')}, ${ng('loadChildren')}, ${ng('bootstrapApplication')}`, 'The router does not know about federation at all. <code>loadChildren</code> just waits for a promise of routes.'],
            ar: ['أنجولار', `${ng('Routes')}، ${ng('path')}، ${ng('component')}، ${ng('loadChildren')}، ${ng('bootstrapApplication')}`, 'الـ router مايعرفش حاجة عن الـ federation خالص. <code>loadChildren</code> بتستنى promise فيها routes وبس.'] },
          { en: ['Node and the browser', `${ng('require')}, ${ng('module.exports')}, ${ng('console.error')}`, 'The config file is a Node script, which is why it uses <code>require</code> instead of <code>import</code>.'],
            ar: ['Node والمتصفح', `${ng('require')}، ${ng('module.exports')}، ${ng('console.error')}`, 'ملف الإعدادات ده سكريبت Node، وعشان كده بيستخدم <code>require</code> بدل <code>import</code>.'] },
        ] },
      { t: 'p',
        en: 'Inside <code>shareAll</code>, the packages being shared are named by their npm names, like <code>@angular/core</code>. Those are fixed too: they come from <code>package.json</code>, and both apps must list compatible versions of them.',
        ar: 'جوه <code>shareAll</code>، الباكدجات اللي بتتشارك متسمّية بأسماء npm بتاعتها، زي <code>@angular/core</code>. ودي ثابتة برضه: جاية من <code>package.json</code>، والتطبيقين لازم يبقى عندهم فيرجنز متوافقة منها.' }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick names two teams can live with', ar: 'تختار أسماء فريقين يقدروا يعيشوا بيها إزاي' },
    lead: {
      en: 'Contract names are expensive to change later, so choose them as carefully as a public API.',
      ar: 'أسماء العقد غالية تتغير بعدين، فاختارها بنفس الحرص بتاع API عام.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['the remote', '<code>checkout</code>: the same as its project name', '<code>mfe1</code>, <code>remoteApp</code>', 'People read it in the manifest, in logs and in the Network tab. It should say which team to call.'],
            ar: ['الـ remote', '<code>checkout</code>: نفس اسم المشروع بتاعه', '<code>mfe1</code>، <code>remoteApp</code>', 'الناس بتقراه في الـ manifest وفي الـ logs وفي تاب Network. لازم يقول تكلّم أنهي فريق.'] },
          { en: ['the exposed key', '<code>./routes</code>: what it is', "<code>./src/app/checkout/checkout.routes.ts</code> as the key", 'The key is the public promise; the file path is an internal detail the remote should be free to move.'],
            ar: ['المفتاح المعروض', '<code>./routes</code>: هو إيه', "<code>./src/app/checkout/checkout.routes.ts</code> كمفتاح", 'المفتاح ده الوعد العام؛ ومسار الملف تفصيلة داخلية الـ remote المفروض يبقى حر ينقلها.'] },
          { en: ['the exported constant', '<code>CHECKOUT_ROUTES</code>', '<code>routes</code>', 'A shell may load several remotes. A prefixed name cannot be confused with the shell’s own <code>routes</code>.'],
            ar: ['الـ constant المتعمله export', '<code>CHECKOUT_ROUTES</code>', '<code>routes</code>', 'الـ shell ممكن يحمّل كذا remote. الاسم اللي فيه prefix مايتلخبطش مع <code>routes</code> بتاعة الـ shell نفسه.'] },
          { en: ['the fallback', '<code>RemoteDown</code>, <code>RemoteUnavailable</code>', 'no fallback at all', 'The name reminds everyone that this screen exists for a reason: the remote will be down someday.'],
            ar: ['الـ fallback', '<code>RemoteDown</code>، <code>RemoteUnavailable</code>', 'مفيش fallback خالص', 'الاسم بيفكّر الكل إن الشاشة دي موجودة لسبب: الـ remote هيقع في يوم.'] },
          { en: ['the URL path', 'whatever reads well to users', 'assuming it must equal the remote name', 'It only has to match the shell’s own links.'],
            ar: ['مسار الـ URL', 'أي حاجة شكلها كويس لليوزر', 'إنك تفترض إنه لازم يساوي اسم الـ remote', 'هو لازم يطابق لينكات الـ shell بس.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Three places where the name is not free', ar: 'تلات أماكن الاسم فيهم مش براحتك' },
    lead: {
      en: 'Some names here look like your choice but are dictated by the tooling.',
      ar: 'فيه أسماء هنا شكلها اختيارك، بس الأدوات هي اللي فارضاها.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'main.ts must not start Angular itself', ar: 'main.ts مينفعش يشغّل أنجولار بنفسه' }, blocks: [
        { t: 'p',
          en: `The shell’s ${ng('initFederation')} has to finish before any Angular code is loaded, so the shared packages can be set up first. That is why the start-up is split: <code>main.ts</code> only initialises federation, and ${pub('bootstrap')} does what <code>main.ts</code> used to do. The name <code>bootstrap.ts</code> is what the schematic generates; you could rename it, but the dynamic <code>import(\'./bootstrap\')</code> must follow, and the split itself is not optional.`,
          ar: `${ng('initFederation')} بتاعة الـ shell لازم تخلص قبل ما أي كود أنجولار يتحمّل، عشان الباكدجات المتشاركة تتجهز الأول. وعشان كده البداية متقسمة: <code>main.ts</code> بيجهّز الـ federation بس، و${pub('bootstrap')} بيعمل اللي <code>main.ts</code> كان بيعمله. واسم <code>bootstrap.ts</code> هو اللي الـ schematic بيطلّعه؛ تقدر تغيّره، بس الـ <code>import(\'./bootstrap\')</code> الديناميكي لازم يمشي وراه، والتقسيمة نفسها مش اختيارية.` }
      ]},
      { t: 'step', n: 'B', title: { en: 'The remote’s entry file is named by its build', ar: 'ملف الدخول بتاع الـ remote الـ build هو اللي بيسمّيه' }, blocks: [
        { t: 'p',
          en: `The remote’s build writes ${ng('remoteEntry.json')}, listing what it exposes and shares. The manifest URL must end in exactly that file. The only parts of the URL you control are the host and port, which must match where the remote really runs (<code>--port 4201</code> locally, the real domain in production).`,
          ar: `الـ build بتاع الـ remote بيكتب ${ng('remoteEntry.json')}، وفيه اللي هو عارضه واللي بيشاركه. والـ URL اللي في الـ manifest لازم يخلص بالملف ده بالظبط. والحتت الوحيدة اللي في إيدك من الـ URL هي الـ host والـ port، ولازم يطابقوا المكان اللي الـ remote شغال فيه فعلًا (<code>--port 4201</code> على جهازك، والـ domain الحقيقي في الإنتاج).` }
      ]},
      { t: 'step', n: 'C', title: { en: 'The cheaper option runs on strings too', ar: 'الحل الأرخص كمان ماشي بـ strings' }, blocks: [
        { t: 'p',
          en: 'The topic’s advice is to try a monorepo with enforced boundaries first. That setup has its own shared names: tags you invent, declared on each project and repeated in the lint rule.',
          ar: 'نصيحة الموضوع إنك تجرّب monorepo بحدود مفروضة الأول. والإعداد ده ليه أسماء متشاركة بتاعته: tags انت بتخترعها، متعلنة على كل مشروع ومتكررة في قاعدة الـ lint.' },
        { t: 'code', name: 'libs/checkout/project.json', lang: 'json', tag: { en: 'a project declares its tag', ar: 'المشروع بيعلن الـ tag بتاعه' }, code: [
          '{',
          '  "tags": ["scope:checkout"]',
          '}' ] },
        { t: 'code', name: 'lint rule options (excerpt)', lang: 'json', tag: { en: '@nx/enforce-module-boundaries', ar: '@nx/enforce-module-boundaries' }, code: [
          '"depConstraints": [',
          '  { "sourceTag": "scope:checkout", "onlyDependOnLibsWithTags": ["scope:checkout", "scope:shared"] },',
          '  { "sourceTag": "scope:shared", "onlyDependOnLibsWithTags": ["scope:shared"] }',
          ']' ] },
        { t: 'p',
          en: `${ng('tags')}, ${ng('depConstraints')}, ${ng('sourceTag')} and ${ng('onlyDependOnLibsWithTags')} are Nx’s. ${pub('scope:checkout')} and ${pub('scope:shared')} are yours. The <code>scope:</code> prefix is a common convention, not a rule. The rule compares the strings exactly, so a typo means the constraint you meant does not apply to that project.`,
          ar: `${ng('tags')} و${ng('depConstraints')} و${ng('sourceTag')} و${ng('onlyDependOnLibsWithTags')} بتوع Nx. و${pub('scope:checkout')} و${pub('scope:shared')} بتوعك. والـ prefix <code>scope:</code> عادة منتشرة، مش قاعدة. والقاعدة بتقارن النصوص بالظبط، فأي غلطة إملائية معناها إن القيد اللي انت قاصده مش بيتطبّق على المشروع ده.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: 'Webpack Module Federation uses the same names', ar: 'Module Federation بتاع webpack بيستخدم نفس الأسماء' },
    lead: {
      en: 'Before Native Federation, Angular projects used webpack Module Federation through <code>@angular-architects/module-federation</code>. You will meet it in existing codebases. The contract names are identical.',
      ar: 'قبل Native Federation، مشاريع أنجولار كانت بتستخدم Module Federation بتاع webpack عن طريق <code>@angular-architects/module-federation</code>. هتقابله في مشاريع موجودة. وأسماء العقد هي هي.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'checkout · webpack.config.js — older', lang: 'ts', code: [
          "const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');",
          '',
          'module.exports = withModuleFederationPlugin({',
          "  name: 'checkout',",
          "  exposes: { './routes': './src/app/checkout/checkout.routes.ts' },",
          "  shared: { ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }) },",
          '});' ] },
        good: { name: 'checkout · federation.config.js — today', lang: 'ts', code: [
          "const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');",
          '',
          'module.exports = withNativeFederation({',
          "  name: 'checkout',",
          "  exposes: { './routes': './src/app/checkout/checkout.routes.ts' },",
          "  shared: { ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }) },",
          '});' ] } },
      { t: 'pair',
        bad:  { name: 'shell · app.routes.ts — older', lang: 'ts', code: [
          'loadRemoteModule({',
          "  type: 'module',",
          "  remoteEntry: 'http://localhost:4201/remoteEntry.js',",
          "  exposedModule: './routes',",
          '}).then(m => m.CHECKOUT_ROUTES)' ] },
        good: { name: 'shell · app.routes.ts — today', lang: 'ts', code: [
          "loadRemoteModule({ remoteName: 'checkout', exposedModule: './routes' })",
          '  .then(m => m.CHECKOUT_ROUTES)' ] } },
      { t: 'p',
        en: 'The older shell often pointed straight at the remote’s URL with <code>remoteEntry</code>, and the file was <code>remoteEntry.js</code>. Native Federation looks the remote up by name in the manifest instead. Either way, <code>./routes</code> and <code>CHECKOUT_ROUTES</code> are the same agreement.',
        ar: 'الـ shell القديم كان غالبًا بيشاور على URL الـ remote على طول بـ <code>remoteEntry</code>، والملف كان اسمه <code>remoteEntry.js</code>. أما Native Federation بيدوّر على الـ remote باسمه في الـ manifest. وفي الحالتين، <code>./routes</code> و<code>CHECKOUT_ROUTES</code> هما نفس الاتفاق.' }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'Fine in CI, broken for users', ar: 'تمام في الـ CI، بايظ عند اليوزرز' },
    title: { en: 'Mistakes that fail silently, or late', ar: 'غلطات بتفشل في صمت، أو متأخر' },
    lead: {
      en: 'Every one of these passes both builds. That is the defining risk of runtime composition.',
      ar: 'كل واحدة من دول بتعدّي من الـ build بتاع الاتنين. ودي الخطورة الأساسية في التركيب وقت التشغيل.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'No failure path', ar: 'مفيش مسار للفشل' }, blocks: [
        { t: 'pair',
          bad:  { name: 'app.routes.ts · no fallback', lang: 'ts', code: [
            'loadChildren: () =>',
            "  loadRemoteModule({ remoteName: 'checkout', exposedModule: './routes' })",
            '    .then(m => m.CHECKOUT_ROUTES),' ] },
          good: { name: 'app.routes.ts · fallback', lang: 'ts', code: [
            'loadChildren: () =>',
            "  loadRemoteModule({ remoteName: 'checkout', exposedModule: './routes' })",
            '    .then(m => m.CHECKOUT_ROUTES)',
            "    .catch(() => [{ path: '**', component: RemoteDown }]),"] } },
        { t: 'p', en: 'When the remote is down, the lazy load fails and the router cancels the navigation. For the user, clicking “Checkout” simply does nothing; the error is only in the console. With the fallback, the route loads a screen that says what happened.',
                  ar: 'لما الـ remote يبقى واقع، التحميل الـ lazy بيفشل والـ router بيلغي التنقل. بالنسبة لليوزر، الدوس على «Checkout» مابيعملش حاجة وخلاص؛ والـ error في الكونسول بس. مع الـ fallback، الـ route بتحمّل شاشة بتقول إيه اللي حصل.' }
      ]},
      { t: 'step', n: '2', title: { en: 'Importing the remote’s code directly', ar: 'إنك تعمل import لكود الـ remote على طول' }, blocks: [
        { t: 'pair',
          bad:  { name: 'shell · direct import', lang: 'ts', code: [
            "import { CHECKOUT_ROUTES } from '../../../checkout/src/app/checkout/checkout.routes';",
            '',
            "{ path: 'checkout', children: CHECKOUT_ROUTES }" ] },
          good: { name: 'shell · runtime load', lang: 'ts', code: [
            "{ path: 'checkout', loadChildren: () =>",
            "    loadRemoteModule({ remoteName: 'checkout', exposedModule: './routes' })",
            '      .then(m => m.CHECKOUT_ROUTES) }' ] } },
        { t: 'p', en: 'In a monorepo the left version compiles and even works. But the checkout code is now built into the shell’s bundle, so a checkout deploy no longer reaches users until the shell is rebuilt. The independence you paid for is gone, and nothing warns you.',
                  ar: 'في monorepo النسخة اللي على الشمال بتتكومبايل وكمان بتشتغل. بس كود الـ checkout بقى متبني جوه الـ bundle بتاع الـ shell، فأي deploy للـ checkout مابقاش يوصل لليوزرز غير لما الـ shell يتبني من جديد. الاستقلال اللي دفعت تمنه راح، ومحدش بينبّهك.' }
      ]},
      { t: 'step', n: '3', title: { en: 'A localhost URL in production', ar: 'URL فيه localhost في الإنتاج' }, blocks: [
        { t: 'pair',
          bad:  { name: 'federation.manifest.json · shipped as-is', lang: 'json', code: ['{', '  "checkout": "http://localhost:4201/remoteEntry.json"', '}'] },
          good: { name: 'federation.manifest.json · per environment', lang: 'json', code: ['{', '  "checkout": "https://checkout.shop.example/remoteEntry.json"', '}'] } },
        { t: 'p', en: 'On your machine the remote runs on port 4201, so everything works. Deployed unchanged, every user’s browser asks <i>their own</i> computer for the remote. Most teams write the manifest per environment during deployment. The key must still be exactly <code>checkout</code>.',
                  ar: 'على جهازك الـ remote شغال على port 4201، فكل حاجة شغالة. لو اتعمله deploy زي ما هو، متصفح كل يوزر هيطلب الـ remote من جهازه <i>هو</i>. أغلب الفرق بتكتب الـ manifest لكل environment وقت الـ deploy. والمفتاح لازم يفضل <code>checkout</code> بالظبط.' }
      ]},
      { t: 'step', n: '4', title: { en: 'A letter off in the exposed key', ar: 'حرف غلط في المفتاح المعروض' }, blocks: [
        { t: 'pair',
          bad:  { name: 'shell · app.routes.ts · typo', lang: 'ts', code: ["loadRemoteModule({ remoteName: 'checkout', exposedModule: './Routes' })"] },
          good: { name: 'shell · app.routes.ts · exact', lang: 'ts', code: ["loadRemoteModule({ remoteName: 'checkout', exposedModule: './routes' })"] } },
        { t: 'p', en: 'Keys are compared exactly, capitals and the <code>./</code> included. This one does throw, but only when a user opens the route, and only in the shell’s console, far from the remote’s code where the key was defined. Copy the key from the remote’s config instead of typing it.',
                  ar: 'المفاتيح بتتقارن بالظبط، بالحروف الكابيتال والـ <code>./</code> كمان. دي بترمي error فعلًا، بس لما يوزر يفتح الـ route، وبس في كونسول الـ shell، بعيد عن كود الـ remote اللي المفتاح اتعرّف فيه. انسخ المفتاح من إعدادات الـ remote بدل ما تكتبه.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When the remote does not show', ar: 'لما الـ remote مايظهرش' },
    title: { en: 'Six questions, in this order', ar: 'ست أسئلة، بالترتيب ده' },
    lead: {
      en: 'Walk the chain from the shell to the remote. Each question checks one link.',
      ar: 'امشي على السلسلة من الـ shell للـ remote. كل سؤال بيشيّك رابط واحد.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Open the remote’s URL from the manifest in the browser. Does <code>remoteEntry.json</code> load, from the right host and port?',
                  ar: '<b>1.</b> افتح الـ URL بتاع الـ remote اللي في الـ manifest في المتصفح. <code>remoteEntry.json</code> بيتحمّل، من الـ host والـ port الصح؟' },
      { t: 'chk', en: '<b>2.</b> Is the manifest key spelled exactly like <code>remoteName</code>?',
                  ar: '<b>2.</b> المفتاح اللي في الـ manifest مكتوب بالظبط زي <code>remoteName</code>؟' },
      { t: 'chk', en: '<b>3.</b> Is <code>exposedModule</code> exactly a key in the remote’s <code>exposes</code>, <code>./</code> and capitals included?',
                  ar: '<b>3.</b> <code>exposedModule</code> بالظبط مفتاح في <code>exposes</code> بتاع الـ remote، بالـ <code>./</code> والحروف الكابيتال؟' },
      { t: 'chk', en: '<b>4.</b> Does the name after <code>m.</code> match what the exposed file really exports? Log <code>m</code> to see.',
                  ar: '<b>4.</b> الاسم اللي بعد <code>m.</code> بيطابق اللي الملف المعروض بيعمله export فعلًا؟ اطبع <code>m</code> وشوف.' },
      { t: 'chk', en: '<b>5.</b> Do both apps share Angular as a <code>singleton</code>, with compatible versions? Check the console for version warnings.',
                  ar: '<b>5.</b> التطبيقين بيشاركوا أنجولار كـ <code>singleton</code>، بفيرجنز متوافقة؟ بص في الكونسول على تحذيرات الفيرجنز.' },
      { t: 'chk', en: '<b>6.</b> Does the route have a <code>.catch</code>, so a failure shows a screen instead of a click that does nothing?',
                  ar: '<b>6.</b> الـ route فيها <code>.catch</code>، عشان الفشل يظهر شاشة بدل كليك مابتعملش حاجة؟' }
    ]
  }
  ]
};
