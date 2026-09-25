/* ==================================================================
   Lazy loading, name by name — a companion page after the
   lazy-loading topic. One running example (an app with an eager home
   page, a lazy About page and a lazy, guarded admin area, plus a
   custom preloading strategy) followed through every file, with every
   name coloured by who owns it. Names list: inline, below.
   ================================================================== */

/* a name in running text, coloured like the code and linked on hover */
const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

/* code blocks that need their own names */
const DEF_ABOUT = 'about.ts · default export';
const DEF_ROUTES = 'app.routes.ts · default export';

export default {
  topic: 'lazy-loading',
  tab: 'Lazy loading, name by name — The Angular Signal',
  title: { en: 'Lazy loading, name by name', ar: 'الـ lazy loading، اسم اسم' },
  say: {
    en: 'One app with a lazy About page, a lazy guarded admin area and a custom preloading strategy, followed through all eight files. Every name coloured by who owns it: <b>Angular’s</b>, <b>yours</b>, or <b>yours but shared</b>. Then what breaks when you rename each one.',
    ar: 'تطبيق واحد فيه صفحة About بتتحمّل lazy، ومنطقة admin lazy ومحمية، واستراتيجية preloading بتاعتك، ماشيين وراه في التمن ملفات. كل اسم ملوّن حسب صاحبه: <b>بتاع أنجولار</b>، ولا <b>بتاعك</b>، ولا <b>بتاعك بس متشارك</b>. وبعدين إيه اللي بيبوظ لما تغيّر كل واحد.'
  },
  lead: {
    en: 'The idea is simple: <b>do not download a page’s code until somebody needs it</b>, then fetch it quietly in the background before they click. The confusing part is the names. The single line <code>import(\'./about\').then(m => m.About)</code> holds a file path, a parameter you can call anything, and a class name that must match another file exactly. Next to it sit a URL that every link must copy, route keys that are Angular’s, and a method name the router calls for you. This page sorts them out.',
    ar: 'الفكرة بسيطة: <b>متنزّلش كود صفحة غير لما حد يحتاجها</b>، وبعدين هاتها بهدوء في الخلفية قبل ما يدوس. اللي بيلخبط هو الأسماء. السطر الواحد <code>import(\'./about\').then(m => m.About)</code> جواه مسار ملف، وparameter تسمّيه أي حاجة، واسم كلاس لازم يطابق ملف تاني بالظبط. وجنبه URL كل لينك لازم ينسخه، ومفاتيح route بتاعة أنجولار، واسم ميثود الـ router بيناديها بنفسه. الصفحة دي بتفرزهم.'
  },

  names: {
    note: {
      en: 'Read the orange rows first. Lazy loading is full of promises between files: the URL in <code>path</code> and every <code>routerLink</code>, the class name after <code>m.</code> and the <code>export</code> in the other file, the <code>data</code> key in the routes and the key your strategy reads. The route keys themselves (<code>path</code>, <code>loadComponent</code>, <code>loadChildren</code>, <code>canMatch</code>, <code>data</code>) are Angular’s.',
      ar: 'اقرا الصفوف البرتقاني الأول. الـ lazy loading مليان وعود بين الملفات: الـ URL اللي في <code>path</code> وكل <code>routerLink</code>، واسم الكلاس اللي بعد <code>m.</code> والـ <code>export</code> اللي في الملف التاني، ومفتاح <code>data</code> في الـ routes والمفتاح اللي الاستراتيجية بتاعتك بتقراه. ومفاتيح الـ route نفسها (<code>path</code> و<code>loadComponent</code> و<code>loadChildren</code> و<code>canMatch</code> و<code>data</code>) بتاعة أنجولار.'
    },
    names: [
      /* --- shared: another file types it too --- */
      { n:'about', k:'pub', re:'(?<=path: \')about(?=\')|(?<=routerLink="\\/)about(?=")',
        w:{ en:'The URL segment. The route’s <code>path</code> and every <code>routerLink</code> must agree. Not the same thing as the file <code>./about</code>.',
            ar:'جزء الـ URL. الـ <code>path</code> بتاع الـ route وكل <code>routerLink</code> لازم يتفقوا. ومش هو نفس الملف <code>./about</code>.' } },
      { n:'admin', k:'pub', re:'(?<=path: \')admin(?=\')|(?<=routerLink="\\/)admin(?=[/"])',
        w:{ en:'The URL segment of the admin area, typed by the route and the links.', ar:'جزء الـ URL بتاع منطقة الـ admin، مكتوب في الـ route وفي اللينكات.' } },
      { n:'users', k:'pub', re:'(?<=path: \')users(?=\')|(?<=\\/admin\\/)users(?=")',
        w:{ en:'A child URL segment inside the admin routes. The link types <code>/admin/users</code>.', ar:'جزء URL ابن جوه routes الـ admin. واللينك بيكتب <code>/admin/users</code>.' } },
      { n:'routes', k:'pub', re:'(?<![\\w$./-])routes(?![\\w$-])',
        w:{ en:'Your exported route list. <code>app.config.ts</code> imports it by this name.', ar:'ليستة الـ routes بتاعتك اللي بتتعمل export. و<code>app.config.ts</code> بيعملها import بالاسم ده.' } },
      { n:'appConfig', k:'pub', w:{ en:'Your app configuration. <code>main.ts</code> imports it by this name.', ar:'إعدادات التطبيق بتاعتك. <code>main.ts</code> بيعملها import بالاسم ده.' } },
      { n:'About', k:'pub', only:['ts'], not:[DEF_ABOUT, DEF_ROUTES],
        w:{ en:'The class <code>about.ts</code> exports. <code>m.About</code> must spell it exactly, or it does not compile.',
            ar:'الكلاس اللي <code>about.ts</code> بيعمله export. و<code>m.About</code> لازم يكتبه بالظبط، وإلا مش هيعمل compile.' } },
      { n:'ADMIN_ROUTES', k:'pub', w:{ en:'The constant <code>admin.routes.ts</code> exports. <code>m.ADMIN_ROUTES</code> must match it.', ar:'الثابت اللي <code>admin.routes.ts</code> بيعمله export. و<code>m.ADMIN_ROUTES</code> لازم يطابقه.' } },
      { n:'AdminDashboard', k:'pub', w:{ en:'An admin page class, imported by the admin routes. Import it anywhere else statically and the admin code lands in the main bundle.', ar:'كلاس صفحة admin، بيتعمله import في routes الـ admin. لو اتعمله import عادي في أي حتة تانية، كود الـ admin بيقع في الـ bundle الأساسي.' } },
      { n:'AdminUsers', k:'pub', w:{ en:'Another admin page class.', ar:'كلاس صفحة admin تانية.' } },
      { n:'app-admin-dashboard', k:'pub', w:{ en:'The admin dashboard’s selector, typed by a template that shows it.', ar:'الـ selector بتاع داشبورد الـ admin، بيكتبه أي تمبلت بيعرضه.' } },
      { n:'Home', k:'pub', only:['ts'], w:{ en:'The home page class. It is imported normally, so it ships in the main bundle, which is right for the first page.', ar:'كلاس الصفحة الرئيسية. بيتعمله import عادي، فبيتشحن في الـ bundle الأساسي، وده الصح لأول صفحة.' } },
      { n:'isAdmin', k:'pub', w:{ en:'Your guard, exported from <code>is-admin.ts</code> and listed in <code>canMatch</code>.', ar:'الـ guard بتاعك، بيتعمله export من <code>is-admin.ts</code> وبيتكتب في <code>canMatch</code>.' } },
      { n:'Auth', k:'pub', only:['ts'], w:{ en:'Your auth service, imported by the guard.', ar:'الـ service بتاعة الـ auth بتاعتك، والـ guard بيعملها import.' } },
      { n:'role', k:'pub', re:'(?<=\\.)role(?=\\()', w:{ en:'A signal on your <code>Auth</code> service. The guard reads it.', ar:'signal في الـ service <code>Auth</code> بتاعتك. والـ guard بيقراها.' } },
      { n:'SelectivePreload', k:'pub', w:{ en:'Your strategy class. <code>app.config.ts</code> passes it to <code>withPreloading</code>.', ar:'كلاس الاستراتيجية بتاعك. <code>app.config.ts</code> بيبعته لـ <code>withPreloading</code>.' } },
      { n:'\'preload\'', k:'pub', re:'(?<=\\[\')preload(?=\'\\])|(?<=[{,] )preload(?=:)',
        w:{ en:'A key <b>you</b> invented inside <code>data</code>. The routes file writes it, your strategy reads it. A typo on either side is silent. The method <code>preload(…)</code> is a different name, and Angular’s.',
            ar:'مفتاح <b>انت</b> اخترعته جوه <code>data</code>. ملف الـ routes بيكتبه، والاستراتيجية بتاعتك بتقراه. وغلطة إملائية في أي ناحية مش بتقول حاجة. والميثود <code>preload(…)</code> اسم تاني، وبتاع أنجولار.' } },
      { n:'App', k:'pub', only:['ts'], w:{ en:'The root component. <code>main.ts</code> bootstraps it by this name.', ar:'الـ component الرئيسي. <code>main.ts</code> بيشغّله بالاسم ده.' } },
      { n:'app-root', k:'pub', w:{ en:'The root selector. <code>index.html</code> types this tag.', ar:'الـ selector الرئيسي. <code>index.html</code> بيكتب التاج ده.' } },
      { n:'AdminModule', k:'pub', w:{ en:'The older style: an NgModule class the route pointed at.', ar:'الأسلوب القديم: كلاس NgModule الـ route كان بيشاور عليه.' } },
      { n:'AppRoutingModule', k:'pub', w:{ en:'The older style’s routing module, imported by the app module.', ar:'الـ routing module في الأسلوب القديم، والـ app module بيعمله import.' } },

      /* --- yours, private to one file --- */
      { n:'About', k:'mine', only:[DEF_ABOUT],
        w:{ en:'With a default export, nobody else types the class name. The importer does not name it at all.', ar:'مع الـ default export، محدش تاني بيكتب اسم الكلاس. اللي بيعمل import مش بيسمّيه أصلًا.' } },
      { n:'m', k:'mine', only:['ts'], re:'(?<![\\w$.\'-])m(?![\\w$\'-])',
        w:{ en:'The arrow function’s parameter: the downloaded file’s exports. <code>m</code> is just a habit (for “module”); any name works.',
            ar:'الـ parameter بتاع الـ arrow function: الحاجات اللي الملف اللي اتنزّل بيعملها export. <code>m</code> مجرد عادة (من «module»)؛ أي اسم ينفع.' } },
      { n:'route', k:'mine', only:['ts'], w:{ en:'The first parameter of <code>preload</code>. The router passes the route; you pick the name.', ar:'أول parameter في <code>preload</code>. الـ router بيدّيك الـ route؛ وانت بتختار الاسم.' } },
      { n:'load', k:'mine', only:['ts'], w:{ en:'The second parameter: call it to start the download. Any name works; the position is what matters.', ar:'تاني parameter: ناديه عشان التحميل يبدأ. أي اسم ينفع؛ المهم مكانه.' } },
      { n:'app-about', k:'mine', w:{ en:'The About page’s selector. The router creates the page, so no template ever types this tag.', ar:'الـ selector بتاع صفحة About. الـ router هو اللي بيعمل الصفحة، فمفيش تمبلت بيكتب التاج ده.' } },
      { n:'app-home', k:'mine', w:{ en:'The home page’s selector, also only used by the router.', ar:'الـ selector بتاع الصفحة الرئيسية، وبرضه الـ router بس اللي بيستخدمه.' } },

      /* --- Angular's, JavaScript's, RxJS's --- */
      { n:'Routes', k:'ng', w:{ en:'Angular’s type for a list of routes.', ar:'النوع بتاع أنجولار لليستة routes.' } },
      { n:'Route', k:'ng', w:{ en:'Angular’s type for one route.', ar:'النوع بتاع أنجولار لـ route واحد.' } },
      { n:'path', k:'ng', w:{ en:'A route key. The URL text after it is yours.', ar:'مفتاح route. نص الـ URL اللي بعده بتاعك.' } },
      { n:'component', k:'ng', w:{ en:'A route key for an eager component: it ships in the main bundle.', ar:'مفتاح route لـ component بيتحمّل على طول: بيتشحن في الـ bundle الأساسي.' } },
      { n:'loadComponent', k:'ng', w:{ en:'A route key: download this one component when the route is first needed.', ar:'مفتاح route: نزّل الـ component ده بس أول ما الـ route يتطلب.' } },
      { n:'loadChildren', k:'ng', w:{ en:'A route key: download a whole list of child routes when first needed.', ar:'مفتاح route: نزّل ليستة routes أبناء كاملة أول ما تتطلب.' } },
      { n:'canMatch', k:'ng', w:{ en:'A route key for guards that run <b>before</b> the lazy code is downloaded on navigation.', ar:'مفتاح route للـ guards اللي بتشتغل <b>قبل</b> ما الكود الـ lazy يتنزّل وقت التنقل.' } },
      { n:'canActivate', k:'ng', w:{ en:'A route key for guards that run after the route, and its lazy code, are resolved.', ar:'مفتاح route للـ guards اللي بتشتغل بعد ما الـ route، والكود الـ lazy بتاعه، يتحلّوا.' } },
      { n:'data', k:'ng', only:['ts'], w:{ en:'A route key for extra information. The keys <b>inside</b> it are yours.', ar:'مفتاح route لمعلومات زيادة. المفاتيح اللي <b>جواه</b> بتاعتك.' } },
      { n:'then', k:'ng', w:{ en:'JavaScript’s Promise method: runs once the file has downloaded.', ar:'ميثود الـ Promise في JavaScript: بتشتغل أول ما الملف يخلص تحميل.' } },
      { n:'provideRouter', k:'ng', w:{ en:'Angular’s function that switches the router on.', ar:'الـ function بتاعة أنجولار اللي بتشغّل الـ router.' } },
      { n:'withPreloading', k:'ng', w:{ en:'Angular’s router feature that picks a preloading strategy.', ar:'ميزة في الـ router بتاع أنجولار بتختار استراتيجية الـ preloading.' } },
      { n:'NoPreloading', k:'ng', w:{ en:'Angular’s built-in strategy: never preload. Same as not using <code>withPreloading</code>.', ar:'استراتيجية جاهزة من أنجولار: متعملش preload أبدًا. زي بالظبط إنك متستخدمش <code>withPreloading</code>.' } },
      { n:'PreloadAllModules', k:'ng', w:{ en:'Angular’s built-in strategy: preload every lazy route once the app has started.', ar:'استراتيجية جاهزة من أنجولار: اعمل preload لكل route lazy أول ما التطبيق يبدأ.' } },
      { n:'PreloadingStrategy', k:'ng', w:{ en:'Angular’s interface for your own strategy. It requires one method, <code>preload</code>.', ar:'الـ interface بتاع أنجولار لاستراتيجيتك. بيطلب ميثود واحدة، <code>preload</code>.' } },
      { n:'preload', k:'ng', re:'(?<![\\w$.\'-])preload(?=\\()',
        w:{ en:'The method <code>PreloadingStrategy</code> requires. The router calls it by this exact name, once per lazy route.', ar:'الميثود اللي <code>PreloadingStrategy</code> بيطلبها. الـ router بيناديها بالاسم ده بالظبط، مرة لكل route lazy.' } },
      { n:'Observable', k:'ng', w:{ en:'RxJS’s stream type.', ar:'نوع الـ stream بتاع RxJS.' } },
      { n:'EMPTY', k:'ng', w:{ en:'RxJS’s stream that ends at once. Returned from <code>preload</code>, it means “do not preload this one”.', ar:'stream من RxJS بتخلص على طول. لو رجعت من <code>preload</code> معناها «متعملش preload للـ route ده».' } },
      { n:'timer', k:'ng', w:{ en:'An RxJS function: wait, then emit once.', ar:'function من RxJS: استنى، وبعدين طلّع قيمة مرة واحدة.' } },
      { n:'switchMap', k:'ng', w:{ en:'An RxJS operator.', ar:'operator من RxJS.' } },
      { n:'pipe', k:'ng', w:{ en:'The RxJS method that chains operators.', ar:'الميثود بتاعة RxJS اللي بتسلسل الـ operators.' } },
      { n:'@Injectable', k:'ng', w:{ en:'Angular’s decorator that makes a class a service.', ar:'الـ decorator بتاع أنجولار اللي بيخلي الكلاس service.' } },
      { n:'providedIn', k:'ng', w:{ en:'An option key Angular reads.', ar:'مفتاح إعداد أنجولار بيقراه.' } },
      { n:'ApplicationConfig', k:'ng', w:{ en:'Angular’s type for the app configuration object.', ar:'النوع بتاع أنجولار لأوبجكت إعدادات التطبيق.' } },
      { n:'providers', k:'ng', w:{ en:'A config key: the list of providers.', ar:'مفتاح إعداد: ليستة الـ providers.' } },
      { n:'CanMatchFn', k:'ng', w:{ en:'Angular’s type for a functional <code>canMatch</code> guard.', ar:'النوع بتاع أنجولار لـ guard من نوع function بيتحط في <code>canMatch</code>.' } },
      { n:'inject', k:'ng', w:{ en:'Angular’s function that hands you a service.', ar:'الـ function بتاعة أنجولار اللي بتجيبلك service.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator for a component.', ar:'الـ decorator بتاع أنجولار للـ component.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The string after it is yours.', ar:'مفتاح إعداد. النص اللي بعده بتاعك.' } },
      { n:'template', k:'ng', w:{ en:'An option key: the template, written inline.', ar:'مفتاح إعداد: التمبلت، مكتوب في نفس الملف.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key. The path after it points at your file.', ar:'مفتاح إعداد. المسار اللي بعده بيشاور على ملفك.' } },
      { n:'imports', k:'ng', w:{ en:'An option key: what this template uses.', ar:'مفتاح إعداد: الحاجات اللي التمبلت ده بيستخدمها.' } },
      { n:'routerLink', k:'ng', w:{ en:'Angular’s link directive. Only works if <code>RouterLink</code> is in <code>imports</code>.', ar:'الـ directive بتاع أنجولار للينكات. بيشتغل بس لو <code>RouterLink</code> موجود في <code>imports</code>.' } },
      { n:'RouterLink', k:'ng', w:{ en:'The class behind <code>routerLink</code>.', ar:'الكلاس اللي ورا <code>routerLink</code>.' } },
      { n:'RouterOutlet', k:'ng', w:{ en:'The class behind <code>&lt;router-outlet&gt;</code>.', ar:'الكلاس اللي ورا <code>&lt;router-outlet&gt;</code>.' } },
      { n:'router-outlet', k:'ng', w:{ en:'Angular’s tag where the current page appears.', ar:'التاج بتاع أنجولار اللي الصفحة الحالية بتظهر فيه.' } },
      { n:'@NgModule', k:'ng', w:{ en:'The older decorator for a module.', ar:'الـ decorator القديم للـ module.' } },
      { n:'RouterModule', k:'ng', w:{ en:'The older router module.', ar:'الـ router module القديم.' } },
      { n:'forRoot', k:'ng', w:{ en:'The older way to set up the app’s routes.', ar:'الطريقة القديمة لإعداد routes التطبيق.' } },
      { n:'preloadingStrategy', k:'ng', w:{ en:'The older option key for the strategy.', ar:'مفتاح الإعداد القديم للاستراتيجية.' } },
      { n:'exports', k:'ng', w:{ en:'An NgModule option key.', ar:'مفتاح إعداد في الـ NgModule.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'From start-up to one click, six stops', ar: 'من تشغيل التطبيق لكليك واحدة، ست محطات' },
    lead: {
      en: 'An app with three pages. Home is in the main bundle. About and the admin area are lazy: their code is a separate file. After start-up, a strategy fetches About in the background, but skips admin. Then the user clicks About. Follow it:',
      ar: 'تطبيق فيه تلات صفحات. Home في الـ bundle الأساسي. وAbout ومنطقة الـ admin lazy: الكود بتاعهم ملف لوحده. بعد ما التطبيق يشتغل، استراتيجية بتجيب About في الخلفية، بس بتعدّي الـ admin. وبعدين المستخدم بيدوس على About. امشي وراها:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'app.config.ts', lang: 'ts', who: { en: 'start-up · config', ar: 'التشغيل · الإعدادات' },
          code: ['providers: [provideRouter(routes, withPreloading(SelectivePreload))],'],
          say: { en: `The app starts. ${ng('provideRouter')} and ${ng('withPreloading')} are Angular’s. ${pub('routes')} is your exported route list, and ${pub('SelectivePreload')} is your own strategy class. Both are imported from other files by those names.`,
                 ar: `التطبيق بيشتغل. ${ng('provideRouter')} و${ng('withPreloading')} بتوع أنجولار. و${pub('routes')} ليستة الـ routes بتاعتك اللي عاملها export، و${pub('SelectivePreload')} كلاس الاستراتيجية بتاعك. الاتنين بيتعملهم import من ملفات تانية بالأسماء دي.` } },
        { file: 'app.routes.ts', lang: 'ts', who: { en: 'routes · a lazy page', ar: 'الـ routes · صفحة lazy' },
          code: ['{', "  path: 'about',", "  loadComponent: () => import('./about').then(m => m.About),", '},'],
          say: { en: `${ng('path')} and ${ng('loadComponent')} are Angular’s keys. ${pub('about')} is <b>your</b> URL. <code>import('./about')</code> is JavaScript’s dynamic import of <b>the file</b> <code>about.ts</code>; it tells the bundler to cut here. ${mine('m')} is whatever that file exports, and ${pub('About')} must be the exact name it exports.`,
                 ar: `${ng('path')} و${ng('loadComponent')} مفاتيح أنجولار. و${pub('about')} الـ URL <b>بتاعك</b>. و<code>import('./about')</code> ده الـ dynamic import بتاع JavaScript لـ<b>لملف</b> <code>about.ts</code>؛ وبيقول للـ bundler اقطع هنا. و${mine('m')} هو كل اللي الملف ده بيعمله export، و${pub('About')} لازم يبقى الاسم اللي بيعمله export بالظبط.` } },
        { file: 'selective-preload.ts', lang: 'ts', who: { en: 'strategy · asked by the router', ar: 'الاستراتيجية · الـ router بيسألها' },
          code: ['preload(route: Route, load: () => Observable<unknown>): Observable<unknown> {', "  if (route.data?.['preload'] === false) return EMPTY;", '  return timer(2000).pipe(switchMap(() => load()));', '}'],
          say: { en: `Once the app is running, the router calls ${ng('preload')} for every lazy route. That method name is forced by ${ng('PreloadingStrategy')}. The parameters ${mine('route')} and ${mine('load')} are yours to name. Return ${ng('EMPTY')} to skip; call ${mine('load')} to download.`,
                 ar: `أول ما التطبيق يشتغل، الـ router بينادي ${ng('preload')} لكل route lazy. اسم الميثود ده مفروض من ${ng('PreloadingStrategy')}. والـ parameters ${mine('route')} و${mine('load')} انت اللي بتسمّيهم. رجّع ${ng('EMPTY')} عشان تعدّي؛ ونادي ${mine('load')} عشان يتنزّل.` } },
        { file: 'app.routes.ts', lang: 'ts', who: { en: 'routes · a guarded area', ar: 'الـ routes · منطقة محمية' },
          code: ['canMatch: [isAdmin],', "loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES),", 'data: { preload: false },'],
          say: { en: `The admin area. ${ng('canMatch')}, ${ng('loadChildren')} and ${ng('data')} are Angular’s keys. ${pub('isAdmin')} and ${pub('ADMIN_ROUTES')} come from other files. The key ${pub("'preload'")} inside ${ng('data')} is <b>yours</b>: you invented it, and your strategy reads it back. So admin is never preloaded.`,
                 ar: `منطقة الـ admin. ${ng('canMatch')} و${ng('loadChildren')} و${ng('data')} مفاتيح أنجولار. و${pub('isAdmin')} و${pub('ADMIN_ROUTES')} جايين من ملفات تانية. والمفتاح ${pub("'preload'")} اللي جوه ${ng('data')} <b>بتاعك</b>: انت اخترعته، والاستراتيجية بتاعتك بتقراه تاني. فالـ admin عمره ما بيتعمله preload.` } },
        { file: 'app.html', lang: 'html', who: { en: 'the click', ar: 'الكليك' },
          code: ['<a routerLink="/about">About</a>'],
          say: { en: `The user clicks. ${ng('routerLink')} is Angular’s. The text after the slash, ${pub('about')}, must match the route’s ${ng('path')}. The chunk was preloaded, so the page appears at once.`,
                 ar: `المستخدم بيدوس. ${ng('routerLink')} بتاع أنجولار. والكلام اللي بعد الشرطة، ${pub('about')}، لازم يطابق الـ ${ng('path')} بتاع الـ route. والـ chunk اتعمله preload، فالصفحة بتظهر على طول.` } },
        { file: 'about.ts', lang: 'ts', who: { en: 'the lazy file', ar: 'الملف الـ lazy' },
          code: ['export class About {}'],
          say: { en: `The file that was cut out. It exports ${pub('About')}, which is exactly what <code>m.About</code> picked up. Nothing else in the app imports this file, and that is what keeps it lazy.`,
                 ar: `الملف اللي اتقطع لوحده. بيعمل export لـ ${pub('About')}، وده بالظبط اللي <code>m.About</code> مسكه. ومفيش حاجة تانية في التطبيق بتعمل import للملف ده، وده اللي مخليه lazy.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'Route: <code>path: \'about\'</code> + <code>import(\'./about\').then(m => m.About)</code>. Link: <code>routerLink="/about"</code>. Three different “abouts”: the <b>URL</b> (shared with every link), the <b>file</b> (shared with the import path), the <b>class</b> (shared with <code>m.About</code>). They only look alike because you chose to name them alike.',
        ar: 'الـ route: <code>path: \'about\'</code> + <code>import(\'./about\').then(m => m.About)</code>. اللينك: <code>routerLink="/about"</code>. تلاتة «about» مختلفين: الـ <b>URL</b> (متشارك مع كل لينك)، والـ <b>ملف</b> (متشارك مع مسار الـ import)، والـ <b>كلاس</b> (متشارك مع <code>m.About</code>). شكلهم شبه بعض بس عشان انت اخترت تسمّيهم كده.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Which file?', ar: 'أنهي ملف؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'Lazy loading spreads one feature over several small files. Each piece still has exactly one home.',
      ar: 'الـ lazy loading بيوزّع الميزة الواحدة على كذا ملف صغير. وكل حتة برضه ليها بيت واحد بس.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>path: \'about\'</code>', '<code>app.routes.ts</code>', 'you', `you pick ${pub('about')}; every link copies it`],
            ar: ['<code>path: \'about\'</code>', '<code>app.routes.ts</code>', 'انت', `انت بتختار ${pub('about')}؛ وكل لينك بينسخه`] },
          { en: ['<code>import(\'./about\')</code>', '<code>app.routes.ts</code>', 'you', 'the file on disk picks it: the path must lead to a real file'],
            ar: ['<code>import(\'./about\')</code>', '<code>app.routes.ts</code>', 'انت', 'الملف اللي على الديسك هو اللي بيختاره: المسار لازم يوصل لملف موجود'] },
          { en: ['<code>.then(m => m.About)</code>', '<code>app.routes.ts</code>', 'you', `you pick ${mine('m')}; ${pub('About')} copies the other file’s export`],
            ar: ['<code>.then(m => m.About)</code>', '<code>app.routes.ts</code>', 'انت', `انت بتختار ${mine('m')}؛ و${pub('About')} بينسخ الـ export بتاع الملف التاني`] },
          { en: ['<code>export class About</code>', '<code>about.ts</code>', 'the lazy page', `you pick ${pub('About')}`],
            ar: ['<code>export class About</code>', '<code>about.ts</code>', 'الصفحة الـ lazy', `انت بتختار ${pub('About')}`] },
          { en: ['<code>data: { preload: false }</code>', '<code>app.routes.ts</code>', 'you', `${ng('data')} is Angular’s; you invent ${pub("'preload'")}`],
            ar: ['<code>data: { preload: false }</code>', '<code>app.routes.ts</code>', 'انت', `${ng('data')} بتاع أنجولار؛ وانت اللي بتخترع ${pub("'preload'")}`] },
          { en: ['<code>route.data?.[\'preload\']</code>', '<code>selective-preload.ts</code>', 'your strategy', `copies ${pub("'preload'")} exactly`],
            ar: ['<code>route.data?.[\'preload\']</code>', '<code>selective-preload.ts</code>', 'الاستراتيجية بتاعتك', `بتنسخ ${pub("'preload'")} بالظبط`] },
          { en: ['<code>preload(route, load)</code>', '<code>selective-preload.ts</code>', 'your strategy, called by the router', `${ng('preload')} is forced; ${mine('route')} and ${mine('load')} are yours`],
            ar: ['<code>preload(route, load)</code>', '<code>selective-preload.ts</code>', 'الاستراتيجية بتاعتك، والـ router بيناديها', `${ng('preload')} مفروضة؛ و${mine('route')} و${mine('load')} بتوعك`] },
          { en: ['<code>routerLink="/about"</code>', '<code>app.html</code>', 'any template', `copies ${pub('about')}`],
            ar: ['<code>routerLink="/about"</code>', '<code>app.html</code>', 'أي تمبلت', `بينسخ ${pub('about')}`] },
        ] },
      { t: 'ul',
        en: ['<b>You never call the lazy page yourself.</b> No template types <code>&lt;app-about&gt;</code>. The router creates it when the URL matches.',
             '<b>You never call <code>preload()</code> either.</b> You write it; the router calls it once for each lazy route.',
             '<b>The routes file never imports the lazy class at the top.</b> It only names it inside <code>import(…)</code>. A normal <code>import { About }</code> at the top would put it back in the main bundle.'],
        ar: ['<b>عمرك ما بتنادي الصفحة الـ lazy بنفسك.</b> مفيش تمبلت بيكتب <code>&lt;app-about&gt;</code>. الـ router هو اللي بيعملها لما الـ URL يطابق.',
             '<b>وعمرك ما بتنادي <code>preload()</code> برضه.</b> انت بتكتبها؛ والـ router بيناديها مرة لكل route lazy.',
             '<b>ملف الـ routes عمره ما بيعمل import للكلاس الـ lazy فوق.</b> بيذكره بس جوه <code>import(…)</code>. أي <code>import { About }</code> عادي فوق هيرجّعه للـ bundle الأساسي.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All eight files, every name coloured', ar: 'التمن ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same example, complete. Hover a coloured name to light up everywhere else it appears. Then press <b>Rename test</b>: the URLs, the exports and the <code>data</code> key all change together, and the route keys stay put.',
      ar: 'نفس المثال، كامل. قف بالماوس على أي اسم ملوّن وهتنوّر كل الأماكن التانية اللي هو فيها. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: الـ URLs والـ exports ومفتاح <code>data</code> بيتغيروا مع بعض، ومفاتيح الـ route بتفضل مكانها.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'app.routes.ts', lang: 'ts', tag: { en: 'the split points', ar: 'أماكن التقطيع' }, code: [
        "import { Routes } from '@angular/router';",
        "import { Home } from './home';",
        "import { isAdmin } from './is-admin';",
        '',
        'export const routes: Routes = [',
        "  { path: '', component: Home },            // eager: the first page",
        '  {',
        "    path: 'about',",
        "    loadComponent: () => import('./about').then(m => m.About),",
        '  },',
        '  {',
        "    path: 'admin',",
        '    canMatch: [isAdmin],',
        "    loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES),",
        '    data: { preload: false },',
        '  },',
        '];' ] },
      { t: 'code', name: 'about.ts', lang: 'ts', tag: { en: 'one lazy component', ar: 'component واحد lazy' }, code: [
        "import { Component } from '@angular/core';",
        '',
        '@Component({',
        "  selector: 'app-about',",
        "  template: '<h1>Who we are</h1>',",
        '})',
        'export class About {}' ] },
      { t: 'code', name: 'admin/admin.routes.ts', lang: 'ts', tag: { en: 'a lazy feature', ar: 'ميزة lazy' }, code: [
        "import { Routes } from '@angular/router';",
        "import { AdminDashboard } from './admin-dashboard';",
        "import { AdminUsers } from './admin-users';",
        '',
        'export const ADMIN_ROUTES: Routes = [',
        "  { path: '', component: AdminDashboard },",
        "  { path: 'users', component: AdminUsers },",
        '];' ] },
      { t: 'code', name: 'is-admin.ts', lang: 'ts', tag: { en: 'the guard', ar: 'الـ guard' }, code: [
        "import { inject } from '@angular/core';",
        "import { CanMatchFn } from '@angular/router';",
        "import { Auth } from './auth';",
        '',
        "export const isAdmin: CanMatchFn = () => inject(Auth).role() === 'admin';" ] },
      { t: 'code', name: 'selective-preload.ts', lang: 'ts', tag: { en: 'the strategy', ar: 'الاستراتيجية' }, code: [
        "import { Injectable } from '@angular/core';",
        "import { PreloadingStrategy, Route } from '@angular/router';",
        "import { Observable, EMPTY, timer, switchMap } from 'rxjs';",
        '',
        "@Injectable({ providedIn: 'root' })",
        'export class SelectivePreload implements PreloadingStrategy {',
        '  preload(route: Route, load: () => Observable<unknown>): Observable<unknown> {',
        "    if (route.data?.['preload'] === false) return EMPTY;",
        '    // wait a moment, so preloading never competes with the first paint',
        '    return timer(2000).pipe(switchMap(() => load()));',
        '  }',
        '}' ] },
      { t: 'code', name: 'app.config.ts', lang: 'ts', tag: { en: 'switches it on', ar: 'بيشغّله' }, code: [
        "import { ApplicationConfig } from '@angular/core';",
        "import { provideRouter, withPreloading } from '@angular/router';",
        "import { routes } from './app.routes';",
        "import { SelectivePreload } from './selective-preload';",
        '',
        'export const appConfig: ApplicationConfig = {',
        '  providers: [provideRouter(routes, withPreloading(SelectivePreload))],',
        '};' ] },
      { t: 'code', name: 'app.ts', lang: 'ts', tag: { en: 'the shell', ar: 'الغلاف' }, code: [
        "import { Component } from '@angular/core';",
        "import { RouterLink, RouterOutlet } from '@angular/router';",
        '',
        '@Component({',
        "  selector: 'app-root',",
        '  imports: [RouterLink, RouterOutlet],',
        "  templateUrl: './app.html',",
        '})',
        'export class App {}' ] },
      { t: 'code', name: 'app.html', lang: 'html', tag: { en: 'the links', ar: 'اللينكات' }, code: [
        '<nav>',
        '  <a routerLink="/">Home</a>',
        '  <a routerLink="/about">About</a>',
        '  <a routerLink="/admin/users">Users</a>',
        '</nav>',
        '<router-outlet />' ] },
      { t: 'nmtable' }
    ]
  },

  /* ------------------------------------------------------------ 4 */
  {
    id: 'rename',
    kicker: { en: 'Is it OK to change it?', ar: 'ينفع أغيّره؟' },
    title: { en: 'What breaks when you rename each name', ar: 'إيه اللي بيبوظ لما تغيّر كل اسم' },
    lead: {
      en: 'The good news: TypeScript checks dynamic imports, so a wrong file path or a wrong export name is a compile error. The bad news: URLs and <code>data</code> keys are plain strings.',
      ar: 'الخبر الحلو: TypeScript بيشيّك على الـ dynamic imports، فمسار ملف غلط أو اسم export غلط يبقى compile error. والخبر الوحش: الـ URLs ومفاتيح <code>data</code> مجرد strings.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [pub('about') + ' (the URL)', 'every <code>routerLink</code> and <code>navigate…()</code> call', 'The link still renders. Clicking it gives a runtime error in the console (“Cannot match any routes”), or your <code>**</code> page if you have one.'],
            ar: [pub('about') + ' (الـ URL)', 'كل <code>routerLink</code> وكل نداء <code>navigate…()</code>', 'اللينك لسه بيظهر. ولما تدوس عليه بييجي runtime error في الـ console («Cannot match any routes»)، أو صفحة الـ <code>**</code> بتاعتك لو عندك واحدة.'] },
          { en: ['the file <code>about.ts</code>', 'the path in <code>import(\'./about\')</code>', 'Compile error: cannot find module. (Your editor usually updates it for you.)'],
            ar: ['الملف <code>about.ts</code>', 'المسار في <code>import(\'./about\')</code>', 'Compile error: مش لاقي الـ module. (الـ editor غالبًا بيغيّره لوحده.)'] },
          { en: [pub('About') + ' (the class)', '<code>m.About</code> in the routes', 'Compile error: the property does not exist on the imported module.'],
            ar: [pub('About') + ' (الكلاس)', '<code>m.About</code> في الـ routes', 'Compile error: الـ property مش موجودة في الـ module اللي اتعمله import.'] },
          { en: [pub('ADMIN_ROUTES'), '<code>m.ADMIN_ROUTES</code>', 'Compile error, same reason.'],
            ar: [pub('ADMIN_ROUTES'), '<code>m.ADMIN_ROUTES</code>', 'Compile error، لنفس السبب.'] },
          { en: [pub("'preload'") + ' (the data key)', 'the key your strategy reads', '<b>No error at all.</b> The strategy never sees the opt-out and preloads admin for everybody.'],
            ar: [pub("'preload'") + ' (مفتاح الـ data)', 'المفتاح اللي الاستراتيجية بتقراه', '<b>مفيش أي error.</b> الاستراتيجية مش بتشوف طلب الاستثناء وبتعمل preload للـ admin لكل الناس.'] },
          { en: [`${pub('routes')}, ${pub('isAdmin')}, ${pub('SelectivePreload')}, ${pub('Home')}`, 'the file that imports it', 'Compile error on the import.'],
            ar: [`${pub('routes')} و${pub('isAdmin')} و${pub('SelectivePreload')} و${pub('Home')}`, 'الملف اللي بيعمله import', 'Compile error في الـ import.'] },
          { en: [`${mine('m')}, ${mine('route')}, ${mine('load')}`, 'only the lines of that one function', 'Compile error inside the function.'],
            ar: [`${mine('m')} و${mine('route')} و${mine('load')}`, 'السطور بتاعة الـ function دي بس', 'Compile error جوه الـ function.'] },
          { en: [mine('app-about') + ' (a routed selector)', 'nothing, unless global CSS targets that tag', 'Nothing breaks. The router creates the element with whatever tag you choose.'],
            ar: [mine('app-about') + ' (selector لصفحة route)', 'ولا حاجة، إلا لو فيه CSS عام بيستهدف التاج ده', 'مفيش حاجة بتبوظ. الـ router بيعمل الـ element بأي تاج تختاره.'] },
          { en: [`${ng('preload')}, ${ng('loadComponent')}, ${ng('canMatch')}, ${ng('data')}`, 'nothing: you cannot rename these', 'Renaming <code>preload</code> is a compile error (the class no longer fits <code>PreloadingStrategy</code>). A misspelled route key is a compile error too, because <code>Routes</code> is typed.'],
            ar: [`${ng('preload')} و${ng('loadComponent')} و${ng('canMatch')} و${ng('data')}`, 'ولا حاجة: دول مينفعش يتغيروا', 'لو غيّرت <code>preload</code> يبقى compile error (الكلاس مبقاش مناسب لـ <code>PreloadingStrategy</code>). ومفتاح route مكتوب غلط compile error برضه، عشان <code>Routes</code> ليه نوع.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b>. Watch <code>path: \'about\'</code> and <code>routerLink="/about"</code> change to the same word, while <code>import(\'./about\')</code>, a file path, stays put. That is the difference between a URL and a file.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b>. بص على <code>path: \'about\'</code> و<code>routerLink="/about"</code> وهما بيتغيروا لنفس الكلمة، و<code>import(\'./about\')</code>، اللي هو مسار ملف، فاضل مكانه. ده الفرق بين الـ URL والملف.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتاعتك' },
    title: { en: 'The fixed names: route keys, JavaScript and RxJS', ar: 'الأسماء الثابتة: مفاتيح الـ route وJavaScript وRxJS' },
    lead: {
      en: 'Most of what you type here belongs to three owners. None of these can be renamed.',
      ar: 'أغلب اللي بتكتبه هنا بتاع تلات أصحاب. ومفيش حاجة فيهم ينفع تتغير.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Owner', 'Names', 'Note'], ar: ['صاحبها', 'الأسماء', 'ملحوظة'] },
        rows: [
          { en: ['Angular’s route keys', `${ng('path')}, ${ng('component')}, ${ng('loadComponent')}, ${ng('loadChildren')}, ${ng('canMatch')}, ${ng('data')}`, '<code>Routes</code> is typed, so a misspelled key is a compile error.'],
            ar: ['مفاتيح الـ route بتاعة أنجولار', `${ng('path')} و${ng('component')} و${ng('loadComponent')} و${ng('loadChildren')} و${ng('canMatch')} و${ng('data')}`, '<code>Routes</code> ليه نوع، فمفتاح مكتوب غلط يبقى compile error.'] },
          { en: ['JavaScript', '<code>import(…)</code>, ' + ng('then'), '<code>import()</code> with brackets is the dynamic import. It returns a Promise of the file’s exports.'],
            ar: ['JavaScript', '<code>import(…)</code> و' + ng('then'), '<code>import()</code> بالأقواس ده الـ dynamic import. بيرجّع Promise فيه الحاجات اللي الملف بيعملها export.'] },
          { en: ['Angular’s router API', `${ng('provideRouter')}, ${ng('withPreloading')}, ${ng('PreloadingStrategy')}, ${ng('preload')}, ${ng('NoPreloading')}, ${ng('PreloadAllModules')}`, 'Two built-in strategies, or your own class.'],
            ar: ['الـ API بتاعة الـ router', `${ng('provideRouter')} و${ng('withPreloading')} و${ng('PreloadingStrategy')} و${ng('preload')} و${ng('NoPreloading')} و${ng('PreloadAllModules')}`, 'استراتيجيتين جاهزين، أو كلاس بتاعك.'] },
          { en: ['RxJS', `${ng('Observable')}, ${ng('EMPTY')}, ${ng('timer')}, ${ng('switchMap')}`, '<code>preload</code> must return an Observable; <code>EMPTY</code> means “skip”.'],
            ar: ['RxJS', `${ng('Observable')} و${ng('EMPTY')} و${ng('timer')} و${ng('switchMap')}`, '<code>preload</code> لازم ترجّع Observable؛ و<code>EMPTY</code> معناها «عدّي».'] },
        ] },
      { t: 'code', name: 'app.config.ts · the three choices', lang: 'ts', tag: { en: 'pick one', ar: 'اختار واحدة' }, code: [
        'provideRouter(routes, withPreloading(NoPreloading))        // nothing is preloaded (the default)',
        'provideRouter(routes, withPreloading(PreloadAllModules))   // every lazy route, soon after start-up',
        'provideRouter(routes, withPreloading(SelectivePreload))    // your class decides, route by route' ] },
      { t: 'note', label: { en: 'The name that sounds wrong', ar: 'الاسم اللي شكله غلط' },
        en: `${ng('PreloadAllModules')} still says “Modules”, from the NgModule days. It preloads standalone lazy routes too. The name is old; the behaviour is current.`,
        ar: `${ng('PreloadAllModules')} لسه مكتوب فيها «Modules»، من أيام الـ NgModules. بس هي بتعمل preload للـ routes الـ standalone الـ lazy كمان. الاسم قديم؛ لكن الشغل حديث.` }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'Angular accepts any of these names. These habits keep URLs predictable and make the routes file easy to scan.',
      ar: 'أنجولار بيقبل أي اسم من دول. العادات دي بتخلي الـ URLs متوقعة وبتخلي ملف الـ routes سهل تبص فيه.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['a URL segment', '<code>about</code>, <code>order-history</code>', '<code>About</code>, <code>orderHistory</code>', 'People type and share URLs. Lower case with dashes is what they expect, and route matching is case-sensitive.'],
            ar: ['جزء URL', '<code>about</code>، <code>order-history</code>', '<code>About</code>، <code>orderHistory</code>', 'الناس بتكتب الـ URLs وبتبعتها لبعض. الحروف الصغيرة والشرط هي اللي متوقعة، ومطابقة الـ routes حساسة لحالة الحروف.'] },
          { en: ['a feature’s routes', '<code>ADMIN_ROUTES</code>, <code>adminRoutes</code>', '<code>routes</code> in every feature', 'When two of them meet in one file you would need <code>as</code> to tell them apart.'],
            ar: ['routes ميزة', '<code>ADMIN_ROUTES</code>، <code>adminRoutes</code>', '<code>routes</code> في كل ميزة', 'لما اتنين منهم يتقابلوا في ملف واحد هتحتاج <code>as</code> عشان تفرّق بينهم.'] },
          { en: ['the file', '<code>about.ts</code> for <code>About</code>', '<code>page2.ts</code>', 'When the file and the class share a name, <code>import(\'./about\').then(m => m.About)</code> reads naturally.'],
            ar: ['الملف', '<code>about.ts</code> لـ <code>About</code>', '<code>page2.ts</code>', 'لما الملف والكلاس يبقى ليهم نفس الاسم، <code>import(\'./about\').then(m => m.About)</code> بيتقري بسهولة.'] },
          { en: ['the <code>then</code> parameter', '<code>m</code>', '—', 'A universal habit, short for “module”. Anything works.'],
            ar: ['الـ parameter بتاع <code>then</code>', '<code>m</code>', '—', 'عادة منتشرة في كل حتة، اختصار «module». أي حاجة تنفع.'] },
          { en: ['a <code>data</code> key', '<code>preload</code>, <code>title</code>', '<code>p</code>, <code>flag</code>', 'Two files must agree on it. A clear word is harder to misspell.'],
            ar: ['مفتاح في <code>data</code>', '<code>preload</code>، <code>title</code>', '<code>p</code>، <code>flag</code>', 'ملفين لازم يتفقوا عليه. والكلمة الواضحة أصعب إنها تتكتب غلط.'] },
          { en: ['the strategy class', '<code>SelectivePreload</code>, <code>NetworkAwarePreload</code>', '<code>MyStrategy</code>', 'Say what it decides.'],
            ar: ['كلاس الاستراتيجية', '<code>SelectivePreload</code>، <code>NetworkAwarePreload</code>', '<code>MyStrategy</code>', 'قول هي بتقرر إيه.'] },
          { en: ['the guard', '<code>isAdmin</code>, <code>adminGuard</code>', '<code>guard1</code>', 'Both styles are common. <code>canMatch: [isAdmin]</code> reads as a sentence.'],
            ar: ['الـ guard', '<code>isAdmin</code>، <code>adminGuard</code>', '<code>guard1</code>', 'الأسلوبين منتشرين. و<code>canMatch: [isAdmin]</code> بيتقري زي جملة.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Three places where the name is not free', ar: 'تلات أماكن الاسم فيهم مش براحتك' },
    lead: {
      en: 'These names look like your choice, but something else decides them.',
      ar: 'الأسماء دي شكلها اختيارك، بس فيه حاجة تانية هي اللي بتحددها.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'After <code>m.</code>, the other file decides', ar: 'بعد <code>m.</code>، الملف التاني هو اللي بيقرر' }, blocks: [
        { t: 'p',
          en: `${mine('m')} holds everything the lazy file exports, so the name after the dot must be one of its exports. If the file uses a <b>default export</b>, you can drop the <code>.then</code> entirely: Angular picks up the default for you, and the class name becomes private to its own file.`,
          ar: `${mine('m')} شايل كل حاجة الملف الـ lazy بيعملها export، فالاسم اللي بعد النقطة لازم يبقى واحد من الـ exports بتوعه. ولو الملف بيستخدم <b>default export</b>، تقدر تشيل الـ <code>.then</code> خالص: أنجولار بياخد الـ default بنفسه، واسم الكلاس بيبقى خاص بملفه.` },
        { t: 'code', name: DEF_ABOUT, lang: 'ts', tag: { en: 'the lazy file', ar: 'الملف الـ lazy' }, code: [
          "@Component({ selector: 'app-about', template: '<h1>Who we are</h1>' })",
          'export default class About {}' ] },
        { t: 'code', name: DEF_ROUTES, lang: 'ts', tag: { en: 'no .then needed', ar: 'مش محتاج .then' }, code: [
          "{ path: 'about', loadComponent: () => import('./about') },",
          "{ path: 'admin', loadChildren: () => import('./admin/admin.routes') },   // if that file has export default [...]" ] }
      ]},
      { t: 'step', n: 'B', title: { en: 'The router calls <code>preload</code>', ar: 'الـ router هو اللي بينادي <code>preload</code>' }, blocks: [
        { t: 'p',
          en: `A strategy is a class the router calls, so it must have a method named exactly ${ng('preload')}, taking a route and a load function and returning an Observable. The class name, ${pub('SelectivePreload')}, is free; the method name is not.`,
          ar: `الاستراتيجية كلاس الـ router بيناديه، فلازم يبقى فيها ميثود اسمها ${ng('preload')} بالظبط، بتاخد route وfunction للتحميل وبترجّع Observable. اسم الكلاس، ${pub('SelectivePreload')}، براحتك؛ لكن اسم الميثود لأ.` }
      ]},
      { t: 'step', n: 'C', title: { en: 'Links copy the path', ar: 'اللينكات بتنسخ الـ path' }, blocks: [
        { t: 'p',
          en: `The ${ng('path')} of a lazy route is yours, but it becomes public the moment a link, a bookmark or a search engine uses it. Inside the app, every ${ng('routerLink')} must copy it. Outside the app, people’s saved links do too, so renaming a URL has a cost you cannot see in the code.`,
          ar: `الـ ${ng('path')} بتاع الـ route الـ lazy بتاعك، بس بيبقى عام أول ما لينك أو bookmark أو محرك بحث يستخدمه. جوه التطبيق، كل ${ng('routerLink')} لازم ينسخه. وبرّه التطبيق، اللينكات اللي الناس حافظاها برضه، فتغيير الـ URL ليه تمن مش باين في الكود.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: 'Lazy NgModules use the same idea', ar: 'الـ NgModules الـ lazy بتستخدم نفس الفكرة' },
    lead: {
      en: 'Older projects lazy-load an NgModule instead of a routes array, and configure preloading through <code>RouterModule.forRoot</code>. The dynamic import, <code>m.</code> and the strategy class are the same.',
      ar: 'المشاريع الأقدم بتعمل lazy load لـ NgModule بدل ليستة routes، وبتظبط الـ preloading عن طريق <code>RouterModule.forRoot</code>. الـ dynamic import و<code>m.</code> وكلاس الاستراتيجية زي ما هما.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'app-routing.module.ts — older style', lang: 'ts', code: [
          'const routes: Routes = [',
          '  {',
          "    path: 'admin',",
          "    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),",
          '  },',
          '];',
          '',
          '@NgModule({',
          '  imports: [RouterModule.forRoot(routes, { preloadingStrategy: SelectivePreload })],',
          '  exports: [RouterModule],',
          '})',
          'export class AppRoutingModule {}' ] },
        good: { name: 'app.routes.ts + app.config.ts — today', lang: 'ts', code: [
          'export const routes: Routes = [',
          '  {',
          "    path: 'admin',",
          "    loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES),",
          '  },',
          '];',
          '',
          '',
          'provideRouter(routes, withPreloading(SelectivePreload))' ] } },
      { t: 'p',
        en: 'In the old style the name after <code>m.</code> is the module class, <code>AdminModule</code>, and that module lists its own routes inside with <code>RouterModule.forChild</code>. Very old code wrote <code>loadChildren: \'./admin/admin.module#AdminModule\'</code> as a string; that form was removed from Angular long ago.',
        ar: 'في الأسلوب القديم الاسم اللي بعد <code>m.</code> هو كلاس الـ module، <code>AdminModule</code>، والـ module ده بيكتب الـ routes بتاعته جواه بـ <code>RouterModule.forChild</code>. والكود القديم أوي كان بيكتب <code>loadChildren: \'./admin/admin.module#AdminModule\'</code> كـ string؛ والشكل ده اتشال من أنجولار من زمان.' }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, and says nothing', ar: 'مش بيعمل حاجة، ومش بيقول حاجة' },
    title: { en: 'Mistakes that fail silently', ar: 'غلطات بتفشل في صمت' },
    lead: {
      en: 'The worst lazy-loading bugs do not break anything. The app works; it just is not lazy any more, or it preloads what it should not. You only find out by looking at the build output.',
      ar: 'أسوأ bugs الـ lazy loading مش بتكسر حاجة. التطبيق شغال؛ بس مبقاش lazy، أو بيعمل preload لحاجة مكانش المفروض. ومش هتعرف غير لما تبص على نتيجة الـ build.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'One normal import undoes the split', ar: 'import عادي واحد بيلغي التقسيم' }, blocks: [
        { t: 'pair',
          bad:  { name: 'home.ts', lang: 'ts', code: [
            "import { AdminDashboard } from './admin/admin-dashboard';",
            '',
            '@Component({',
            "  selector: 'app-home',",
            '  imports: [AdminDashboard],',
            "  template: '<app-admin-dashboard />',",
            '})',
            'export class Home {}' ] },
          good: { name: 'home.ts', lang: 'ts', code: [
            "import { RouterLink } from '@angular/router';",
            '',
            '@Component({',
            "  selector: 'app-home',",
            '  imports: [RouterLink],',
            `  template: '<a routerLink="/admin">Go to admin</a>',`,
            '})',
            'export class Home {}' ] } },
        { t: 'p', en: `${pub('Home')} is in the main bundle. A normal <code>import</code> of ${pub('AdminDashboard')} there pulls the dashboard, and everything it imports, into the main bundle too. The routes still say <code>loadChildren</code>, everything works, and nothing warns you. Link to the page instead, or wrap the widget in <code>@defer</code>.`,
                  ar: `${pub('Home')} في الـ bundle الأساسي. و<code>import</code> عادي لـ ${pub('AdminDashboard')} هناك بيسحب الداشبورد، وكل حاجة هو بيعملها import، للـ bundle الأساسي هو كمان. والـ routes لسه كاتبة <code>loadChildren</code>، وكل حاجة شغالة، ومحدش بينبّهك. اعمل لينك للصفحة بدل كده، أو لف الـ widget في <code>@defer</code>.` }
      ]},
      { t: 'step', n: '2', title: { en: 'A typo in the <code>data</code> key', ar: 'غلطة إملائية في مفتاح <code>data</code>' }, blocks: [
        { t: 'pair',
          bad:  { name: 'app.routes.ts', lang: 'ts', code: ['data: { prelaod: false },'] },
          good: { name: 'app.routes.ts', lang: 'ts', code: ['data: { preload: false },'] } },
        { t: 'p', en: 'The inside of <code>data</code> is not type-checked against your strategy. The strategy reads <code>preload</code>, gets <code>undefined</code>, and preloads the admin area for every visitor.',
                  ar: 'اللي جوه <code>data</code> مش بيتشيّك على الاستراتيجية بتاعتك. الاستراتيجية بتقرا <code>preload</code>، بتلاقيه <code>undefined</code>، وبتعمل preload لمنطقة الـ admin لكل زائر.' }
      ]},
      { t: 'step', n: '3', title: { en: '<code>canActivate</code> where you meant <code>canMatch</code>', ar: '<code>canActivate</code> وانت قصدك <code>canMatch</code>' }, blocks: [
        { t: 'pair',
          bad:  { name: 'app.routes.ts', lang: 'ts', code: ['canActivate: [isAdmin],'] },
          good: { name: 'app.routes.ts', lang: 'ts', code: ['canMatch: [isAdmin],'] } },
        { t: 'p', en: 'Both keep non-admins out of the page. But for a lazy <code>loadChildren</code> route, the router has to load the child routes before <code>canActivate</code> can run, so the admin code is still downloaded. <code>canMatch</code> runs first. Remember too that a preloading strategy does not run your guards, which is why the admin route also opts out of preloading.',
                  ar: 'الاتنين بيمنعوا اللي مش admin من الصفحة. بس في route lazy بـ <code>loadChildren</code>، الـ router لازم يحمّل الـ routes الأبناء قبل ما <code>canActivate</code> تشتغل، فكود الـ admin بيتنزّل برضه. أما <code>canMatch</code> فبتشتغل الأول. وافتكر كمان إن استراتيجية الـ preloading مش بتشغّل الـ guards بتاعتك، وعشان كده route الـ admin كمان طالب إنه ميتعملوش preload.' }
      ]},
      { t: 'step', n: '4', title: { en: 'Forgetting <code>RouterLink</code> in <code>imports</code>', ar: 'نسيان <code>RouterLink</code> في <code>imports</code>' }, blocks: [
        { t: 'pair',
          bad:  { name: 'app.ts', lang: 'ts', code: ['imports: [RouterOutlet],'] },
          good: { name: 'app.ts', lang: 'ts', code: ['imports: [RouterLink, RouterOutlet],'] } },
        { t: 'p', en: 'Without the directive, <code>routerLink="/about"</code> is a plain attribute. The <code>&lt;a&gt;</code> gets no <code>href</code>, so clicking it does nothing, and there is no error.',
                  ar: 'من غير الـ directive، <code>routerLink="/about"</code> بيبقى attribute عادي. والـ <code>&lt;a&gt;</code> مش بياخد <code>href</code>، فالكليك مش بيعمل حاجة، ومفيش error.' }
      ]},
      { t: 'step', n: '5', title: { en: '<code>loadChildren</code> pointed at a component', ar: '<code>loadChildren</code> بيشاور على component' }, blocks: [
        { t: 'pair',
          bad:  { name: 'app.routes.ts', lang: 'ts', code: ["{ path: 'about', loadChildren: () => import('./about').then(m => m.About) },"] },
          good: { name: 'app.routes.ts', lang: 'ts', code: ["{ path: 'about', loadComponent: () => import('./about').then(m => m.About) },"] } },
        { t: 'p', en: '<code>loadChildren</code> expects a list of routes (or an NgModule). A component class still type-checks, because the old NgModule form also accepts a class, so the mistake compiles and only fails with an error when someone navigates there. One component: <code>loadComponent</code>. A list of routes: <code>loadChildren</code>.',
                  ar: '<code>loadChildren</code> مستني ليستة routes (أو NgModule). وكلاس الـ component بيعدّي من الـ type check، عشان الشكل القديم بتاع الـ NgModule بيقبل كلاس برضه، فالغلطة بتعمل compile ومش بتفشل بـ error غير لما حد يروح للصفحة. component واحد: <code>loadComponent</code>. ليستة routes: <code>loadChildren</code>.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it is not lazy, or does not load', ar: 'لما مايبقاش lazy، أو مايتحمّلش' },
    title: { en: 'Six questions, in this order', ar: 'ست أسئلة، بالترتيب ده' },
    lead: {
      en: 'Run a production build first. <code>ng build</code> prints two tables: <b>Initial chunk files</b> and <b>Lazy chunk files</b>. Most answers are in there.',
      ar: 'اعمل build إنتاج الأول. <code>ng build</code> بيطبع جدولين: <b>Initial chunk files</b> و<b>Lazy chunk files</b>. أغلب الإجابات موجودة هناك.'
    },
    blocks: [
      { t: 'code', name: 'terminal', lang: 'bash', tag: { en: 'look for your page', ar: 'دوّر على صفحتك' }, code: [
        'ng build',
        '',
        'Initial chunk files   | Names          | Raw size',
        'main-4KQ2P.js         | main           | 214.60 kB',
        '',
        'Lazy chunk files      | Names          | Raw size',
        'chunk-7FQ3.js         | admin-routes   | 186.20 kB',
        'chunk-B2LM.js         | about          |  12.10 kB' ] },
      { t: 'chk', en: '<b>1.</b> Is your page listed under <b>Lazy chunk files</b>? If not, some file imports it normally. Search the project for the class name.',
                  ar: '<b>1.</b> صفحتك موجودة تحت <b>Lazy chunk files</b>؟ لو لأ، يبقى فيه ملف بيعملها import عادي. دوّر في المشروع على اسم الكلاس.' },
      { t: 'chk', en: '<b>2.</b> Does the name after <code>m.</code> match the file’s export exactly, or does the file use <code>export default</code>?',
                  ar: '<b>2.</b> الاسم اللي بعد <code>m.</code> مطابق للـ export بتاع الملف بالظبط، ولا الملف بيستخدم <code>export default</code>؟' },
      { t: 'chk', en: '<b>3.</b> One component or a list of routes? <code>loadComponent</code> for the first, <code>loadChildren</code> for the second.',
                  ar: '<b>3.</b> component واحد ولا ليستة routes؟ <code>loadComponent</code> للأولى، و<code>loadChildren</code> للتانية.' },
      { t: 'chk', en: '<b>4.</b> Does every <code>routerLink</code> copy the <code>path</code> exactly, and is <code>RouterLink</code> in <code>imports</code>?',
                  ar: '<b>4.</b> كل <code>routerLink</code> ناسخ الـ <code>path</code> بالظبط، و<code>RouterLink</code> موجود في <code>imports</code>؟' },
      { t: 'chk', en: '<b>5.</b> Nothing preloads? Check that your strategy is passed to <code>withPreloading</code> and that its method is named <code>preload</code>.',
                  ar: '<b>5.</b> مفيش حاجة بتتعملها preload؟ اتأكد إن الاستراتيجية بتاعتك متبعتة لـ <code>withPreloading</code> وإن الميثود بتاعتها اسمها <code>preload</code>.' },
      { t: 'chk', en: '<b>6.</b> Something preloads that should not? Compare the <code>data</code> key in the routes with the key the strategy reads, letter by letter.',
                  ar: '<b>6.</b> فيه حاجة بتتعملها preload مكانش المفروض؟ قارن مفتاح <code>data</code> اللي في الـ routes بالمفتاح اللي الاستراتيجية بتقراه، حرف حرف.' }
    ]
  }
  ]
};
