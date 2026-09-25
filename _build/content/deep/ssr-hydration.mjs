/* ==================================================================
   SSR and hydration, name by name — the deep dive after the SSR topic.
   One running example (a blog article at /blog/:slug, prerendered on
   the server and hydrated in the browser) followed through every file.
   Model: content/deep/inputs-outputs.mjs.
   ================================================================== */

const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

export default {
  topic: 'ssr-hydration',
  tab: 'SSR and hydration, name by name — The Angular Signal',
  title: { en: 'SSR and hydration, name by name', ar: 'الـ SSR والـ hydration، اسم اسم' },
  say: {
    en: 'The page for when SSR files and function names blur together. One blog article followed from the route to the server and back into the browser, every name coloured: <b>Angular’s</b>, <b>yours</b>, or <b>yours but shared</b>. Then which spelling three files must agree on, and the mistakes that only show up in the server’s terminal.',
    ar: 'الصفحة دي للي ملفات الـ SSR وأسماء الـ functions بتاعته بتدخل في بعض عنده. مقال واحد ماشيين وراه من الـ route للسيرفر ورجوعًا للمتصفح، وكل اسم ملوّن: <b>بتاع أنجولار</b>، ولا <b>بتاعك</b>، ولا <b>بتاعك بس متشارك</b>. وبعدين أنهي اسم لازم تلات ملفات يتفقوا عليه، والغلطات اللي مابتظهرش غير في الترمينال بتاع السيرفر.'
  },
  lead: {
    en: 'The idea of SSR is simple: <b>the server runs your components once and sends finished HTML; the browser shows it, then Angular wakes up and adopts it.</b> The confusing part is the names. There are four new files, a dozen <code>provide…</code> and <code>with…</code> functions, and one little word, <code>slug</code>, that has to be spelled the same in three places. This page tells you which names are Angular’s, which are yours, and which ones must match.',
    ar: 'فكرة الـ SSR بسيطة: <b>السيرفر بيشغّل الـ components بتاعتك مرة وبيبعت HTML جاهز؛ المتصفح بيعرضه، وبعدين أنجولار بيصحى ويتبنّاه.</b> اللي بيلخبط هو الأسماء. فيه أربع ملفات جداد، وييجي دستة functions بتبدأ بـ <code>provide…</code> و<code>with…</code>، وكلمة صغيرة، <code>slug</code>، لازم تتكتب زي بعض في تلات أماكن. الصفحة دي بتقولك أنهي أسماء بتاعة أنجولار، وأنهي بتاعتك، وأنهي لازم تطابق بعض.'
  },

  names: {
    note: {
      en: 'Read the orange rows first. <code>slug</code> is the one that bites: it is written in the client route, the server route and the component’s input, and nothing checks that the three agree. Almost every blue word is Angular’s, the browser’s or Express’s, and the green ones are private to one file.',
      ar: 'اقرا الصفوف البرتقاني الأول. <code>slug</code> هو اللي بيعض: مكتوب في الـ route بتاع المتصفح، والـ route بتاع السيرفر، والـ input بتاع الـ component، ومحدش بيتأكد إن التلاتة زي بعض. تقريبًا كل كلمة زرقا بتاعة أنجولار أو المتصفح أو Express، والخضرا خاصة بملف واحد.'
    },
    names: [
      /* --- shared: two files must agree --- */
      { n:'slug', k:'pub',
        w:{ en:'The route parameter. <code>:slug</code> in both route files, the <code>slug:</code> key returned by <code>getPrerenderParams</code>, and the component’s input must all be spelled the same. Nothing gives a compile error if they differ.',
            ar:'الـ route parameter. <code>:slug</code> في ملفين الـ routes، والمفتاح <code>slug:</code> اللي <code>getPrerenderParams</code> بترجّعه، والـ input بتاع الـ component، لازم كلهم يتكتبوا زي بعض. ومفيش compile error لو اختلفوا.' } },
      { n:'routes', k:'pub', re:'(?<![\\w$.-])routes(?![\\w$.\'-])',
        w:{ en:'Your client route list, exported from <code>app.routes.ts</code> and imported by <code>app.config.ts</code>.',
            ar:'ليستة الـ routes بتاعة المتصفح، بتتعمل export من <code>app.routes.ts</code> و<code>app.config.ts</code> بيعملها import.' } },
      { n:'serverRoutes', k:'pub',
        w:{ en:'Your server route list, exported from <code>app.routes.server.ts</code> and handed to <code>withRoutes</code>.',
            ar:'ليستة الـ routes بتاعة السيرفر، بتتعمل export من <code>app.routes.server.ts</code> وبتتدّى لـ <code>withRoutes</code>.' } },
      { n:'appConfig', k:'pub',
        w:{ en:'The shared config. <code>main.ts</code> imports it, and so does <code>app.config.server.ts</code>.',
            ar:'الإعدادات المشتركة. <code>main.ts</code> بيعملها import، و<code>app.config.server.ts</code> برضه.' } },
      { n:'config', k:'pub', re:'(?<![\\w$.-])config(?![\\w$.\'-])',
        w:{ en:'The merged server config. <code>main.server.ts</code> imports it by this name.',
            ar:'إعدادات السيرفر بعد الدمج. <code>main.server.ts</code> بيعملها import بالاسم ده.' } },
      { n:'Article', k:'pub',
        w:{ en:'The page’s class. The client route points at it.', ar:'كلاس الصفحة. الـ route بتاع المتصفح بيشاور عليه.' } },
      { n:'Post', k:'pub',
        w:{ en:'Your data type, imported by the page.', ar:'نوع الداتا بتاعك، والصفحة بتعمله import.' } },
      { n:'title', k:'pub',
        w:{ en:'A field on your data. The API’s JSON must use the same key, and the template reads it.',
            ar:'field في الداتا بتاعتك. الـ JSON اللي جاي من الـ API لازم يستخدم نفس المفتاح، والتمبلت بيقراه.' } },
      { n:'bodyHtml', k:'pub',
        w:{ en:'A field on your data, holding HTML. Same rule: the API’s key and the template must agree.',
            ar:'field في الداتا بتاعتك شايل HTML. نفس القاعدة: مفتاح الـ API والتمبلت لازم يتفقوا.' } },
      { n:'isBrowser', k:'pub',
        w:{ en:'Your exported helper. Every file that imports it follows a rename.', ar:'الـ helper بتاعك اللي بيتعمله export. أي ملف بيعمله import بيتغير معاه.' } },
      { n:'app-comment-form', k:'pub',
        w:{ en:'A child component’s selector, typed in the article’s template.', ar:'الـ selector بتاع component ابن، مكتوب في تمبلت المقال.' } },
      { n:'articleSlug', k:'pub',
        w:{ en:'The comment form’s input. Its own name, not tied to the route.', ar:'الـ input بتاع فورم الكومنتات. اسمه هو، ومالوش علاقة بالـ route.' } },
      { n:'app-share-bar', k:'pub',
        w:{ en:'A third-party-style widget’s selector.', ar:'الـ selector بتاع ويدجت شبه الخارجية.' } },

      /* --- yours, private to one file --- */
      { n:'post', k:'mine', re:'(?<![\\w$\\/.-])post(?![\\w$-])',
        w:{ en:'The page’s own resource, read by its own template.', ar:'الـ resource بتاع الصفحة نفسها، والتمبلت بتاعها بيقراه.' } },
      { n:'p', k:'mine', re:'(?<=as )p(?=\\))|(?<![\\w$.<\\/-])p(?=\\.)',
        w:{ en:'The name <code>@if (…; as p)</code> gives the loaded post. Only that block sees it.', ar:'الاسم اللي <code>@if (…; as p)</code> بيدّيه للمقال بعد ما يتحمّل. البلوك ده بس اللي شايفه.' } },
      { n:'app-article', k:'mine',
        w:{ en:'The page’s selector. A routed page is never typed as a tag, so nothing else uses it.', ar:'الـ selector بتاع الصفحة. صفحة جاية من الـ router عمرها ما بتتكتب كتاج، فمحدش تاني بيستخدمه.' } },
      { n:'lastRead', k:'mine',
        w:{ en:'Your <code>localStorage</code> key. Any other code that reads it must type the same string, and a typo is not an error.',
            ar:'المفتاح بتاعك في <code>localStorage</code>. أي كود تاني بيقراه لازم يكتب نفس النص، والغلطة الإملائية مش error.' } },
      { n:'slugs', k:'mine', re:'(?<![\\w$\\/-])slugs(?![\\w$-])', w:{ en:'A local list.', ar:'ليستة محلية.' } },
      { n:'s', k:'mine', re:'(?<![\\w$.-])s(?=\\s*=>|\\s*\\})',
        w:{ en:'The arrow function’s parameter. Local.', ar:'الـ parameter بتاع الـ arrow function. محلي.' } },
      { n:'cmsReply', k:'mine', w:{ en:'A local name for the CMS’s response.', ar:'اسم محلي للرد اللي جاي من الـ CMS.' } },
      { n:'serverConfig', k:'mine', w:{ en:'A local name, merged into <code>config</code>.', ar:'اسم محلي، بيتدمج في <code>config</code>.' } },
      { n:'app', k:'mine', only:['server.ts'], re:'(?<![\\w$.\\/\'-])app(?![\\w$\'-])',
        w:{ en:'The Express app’s local name.', ar:'الاسم المحلي لتطبيق الـ Express.' } },
      { n:'angularApp', k:'mine', w:{ en:'The generated file’s local name for Angular’s engine.', ar:'الاسم المحلي للـ engine بتاع أنجولار في الملف المتولّد.' } },
      { n:'browserDistFolder', k:'mine', w:{ en:'A local constant: where the browser files are.', ar:'constant محلي: مكان ملفات المتصفح.' } },
      { n:'req', k:'mine', w:{ en:'The request. Express passes it by position, so the name is yours.', ar:'الطلب. Express بيبعته حسب مكانه، فالاسم بتاعك.' } },
      { n:'res', k:'mine', w:{ en:'The response, passed by position.', ar:'الرد، بيتبعت حسب مكانه.' } },
      { n:'next', k:'mine', w:{ en:'Express’s “pass it on” callback, passed by position.', ar:'الـ callback بتاع Express «عدّيها للي بعده»، بيتبعت حسب مكانه.' } },
      { n:'response', k:'mine', w:{ en:'A local name for the rendered page.', ar:'اسم محلي للصفحة المرسومة.' } },
      { n:'platformId', k:'mine', w:{ en:'Your field in the older style. <code>PLATFORM_ID</code> is the token; this is just where you keep it.', ar:'الـ field بتاعك في الأسلوب القديم. <code>PLATFORM_ID</code> هو الـ token؛ ده بس المكان اللي بتحطه فيه.' } },
      { n:'postSlug', k:'mine', w:{ en:'The input after a one-sided rename. It no longer matches <code>:slug</code>.', ar:'الـ input بعد ما اتغيّر من ناحية واحدة. مبقاش مطابق لـ <code>:slug</code>.' } },
      { n:'lastSlug', k:'mine', w:{ en:'A signal on the page.', ar:'signal في الصفحة.' } },
      { n:'shownAt', k:'mine', w:{ en:'A property on the page.', ar:'property في الصفحة.' } },
      { n:'browser', k:'mine', not:['json'], re:'(?<![\\w$\'\\/-])browser(?![\\w$\'-])',
        w:{ en:'A field holding the answer of <code>isBrowser()</code>.', ar:'field شايل نتيجة <code>isBrowser()</code>.' } },

      /* --- Angular's, the browser's, Express's --- */
      { n:'provideClientHydration', k:'ng', w:{ en:'Angular’s switch: reuse the server’s HTML instead of redrawing it.', ar:'مفتاح أنجولار: استخدم الـ HTML بتاع السيرفر بدل ما ترسمه تاني.' } },
      { n:'withEventReplay', k:'ng', w:{ en:'Replays clicks made before the app woke up.', ar:'بيعيد الكليكات اللي حصلت قبل ما التطبيق يصحى.' } },
      { n:'withIncrementalHydration', k:'ng', w:{ en:'Turns on <code>@defer (hydrate …)</code>.', ar:'بيشغّل <code>@defer (hydrate …)</code>.' } },
      { n:'provideHttpClient', k:'ng', w:{ en:'Angular’s HTTP client provider.', ar:'الـ provider بتاع الـ HTTP client من أنجولار.' } },
      { n:'withFetch', k:'ng', w:{ en:'Makes <code>HttpClient</code> use <code>fetch</code>, which Angular recommends for SSR.', ar:'بيخلي <code>HttpClient</code> يستخدم <code>fetch</code>، وده اللي أنجولار بينصح بيه مع الـ SSR.' } },
      { n:'provideRouter', k:'ng', w:{ en:'Angular’s router provider.', ar:'الـ provider بتاع الـ router.' } },
      { n:'withComponentInputBinding', k:'ng', w:{ en:'Copies route parameters into inputs <b>with the same name</b>.', ar:'بينسخ الـ route parameters في الـ inputs اللي <b>ليها نفس الاسم</b>.' } },
      { n:'ApplicationConfig', k:'ng', w:{ en:'Angular’s type for a config object.', ar:'النوع بتاع أنجولار لأوبجكت الإعدادات.' } },
      { n:'providers', k:'ng', re:'(?<![\\w$-])providers(?=:)', w:{ en:'An option key Angular reads.', ar:'مفتاح إعداد أنجولار بيقراه.' } },
      { n:'mergeApplicationConfig', k:'ng', w:{ en:'Angular’s helper that adds the server-only providers to the shared ones.', ar:'helper من أنجولار بيضيف الـ providers بتاعة السيرفر على المشتركة.' } },
      { n:'provideServerRendering', k:'ng', w:{ en:'Angular’s server-side provider.', ar:'الـ provider بتاع أنجولار على السيرفر.' } },
      { n:'withRoutes', k:'ng', w:{ en:'Hands your server routes to <code>provideServerRendering</code>.', ar:'بيدّي الـ server routes بتاعتك لـ <code>provideServerRendering</code>.' } },
      { n:'Routes', k:'ng', w:{ en:'Angular’s type for a route list.', ar:'النوع بتاع أنجولار لليستة routes.' } },
      { n:'path', k:'ng', re:'(?<![\\w$-])path(?=:)', w:{ en:'A route key. The text after it is yours.', ar:'مفتاح route. النص اللي بعده بتاعك.' } },
      { n:'component', k:'ng', re:'(?<![\\w$-])component(?=:)', w:{ en:'A route key.', ar:'مفتاح route.' } },
      { n:'ServerRoute', k:'ng', w:{ en:'Angular’s type for one server route.', ar:'النوع بتاع أنجولار لـ server route واحد.' } },
      { n:'renderMode', k:'ng', w:{ en:'A server-route key: how this route is rendered.', ar:'مفتاح في الـ server route: الـ route ده بيترسم إزاي.' } },
      { n:'RenderMode', k:'ng', w:{ en:'Angular’s enum.', ar:'الـ enum بتاع أنجولار.' } },
      { n:'Prerender', k:'ng', w:{ en:'Render once, at build time.', ar:'ارسمه مرة، وقت الـ build.' } },
      { n:'Server', k:'ng', w:{ en:'Render on the server for every request.', ar:'ارسمه على السيرفر مع كل طلب.' } },
      { n:'Client', k:'ng', w:{ en:'Render in the browser only.', ar:'ارسمه في المتصفح بس.' } },
      { n:'getPrerenderParams', k:'ng', w:{ en:'The method name Angular calls at build time. Spelled exactly like this.', ar:'اسم الميثود اللي أنجولار بيناديها وقت الـ build. بتتكتب كده بالظبط.' } },
      { n:'fetch', k:'ng', w:{ en:'The standard web function for HTTP.', ar:'الـ function القياسية في الويب للـ HTTP.' } },
      { n:'input', k:'ng', re:'(?<![\\w$<(-])input(?=[.(<,])', w:{ en:'Angular’s function that creates an input.', ar:'الـ function بتاعة أنجولار اللي بتعمل input.' } },
      { n:'required', k:'ng', w:{ en:'Part of <code>input.required</code>.', ar:'جزء من <code>input.required</code>.' } },
      { n:'httpResource', k:'ng', w:{ en:'Angular’s signal-based request. Its answer on the server is sent along with the HTML.', ar:'طلب أنجولار المبني على الـ signals. رده على السيرفر بيتبعت مع الـ HTML.' } },
      { n:'afterNextRender', k:'ng', w:{ en:'Angular’s hook that runs only in the browser, after rendering.', ar:'hook من أنجولار بيشتغل في المتصفح بس، بعد الرسم.' } },
      { n:'localStorage', k:'ng', w:{ en:'The browser’s storage. It does not exist on the server.', ar:'التخزين بتاع المتصفح. مش موجود على السيرفر.' } },
      { n:'setItem', k:'ng', w:{ en:'A <code>localStorage</code> method.', ar:'ميثود في <code>localStorage</code>.' } },
      { n:'getItem', k:'ng', w:{ en:'A <code>localStorage</code> method. Returns <code>null</code> for an unknown key.', ar:'ميثود في <code>localStorage</code>. بترجّع <code>null</code> لو المفتاح مش موجود.' } },
      { n:'window', k:'ng', w:{ en:'The browser’s global object. Not on the server.', ar:'الأوبجكت العام بتاع المتصفح. مش موجود على السيرفر.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator.', ar:'الـ decorator بتاع أنجولار.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The string after it is yours.', ar:'مفتاح إعداد. النص اللي بعده بتاعك.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key.', ar:'مفتاح إعداد.' } },
      { n:'@if', k:'ng', w:{ en:'Angular’s condition block.', ar:'بلوك الشرط بتاع أنجولار.' } },
      { n:'value', k:'ng', re:'(?<=\\.)value(?=\\()', w:{ en:'A resource’s current value, as a signal.', ar:'القيمة الحالية بتاعة الـ resource، كـ signal.' } },
      { n:'isLoading', k:'ng', w:{ en:'A resource signal.', ar:'signal في الـ resource.' } },
      { n:'innerHTML', k:'ng', w:{ en:'The DOM property. Angular sanitizes what you bind to it.', ar:'property في الـ DOM. أنجولار بينضّف اللي بتربطه بيها.' } },
      { n:'AngularNodeAppEngine', k:'ng', w:{ en:'Angular’s engine that renders inside Node.', ar:'الـ engine بتاع أنجولار اللي بيرسم جوه Node.' } },
      { n:'handle', k:'ng', w:{ en:'The engine’s method: render this request.', ar:'ميثود الـ engine: ارسم الطلب ده.' } },
      { n:'writeResponseToNodeResponse', k:'ng', w:{ en:'Angular’s helper that sends the result through Express.', ar:'helper من أنجولار بيبعت النتيجة من خلال Express.' } },
      { n:'createNodeRequestHandler', k:'ng', w:{ en:'Angular’s wrapper around your Express app.', ar:'الغلاف بتاع أنجولار حوالين تطبيق الـ Express بتاعك.' } },
      { n:'isMainModule', k:'ng', w:{ en:'Angular’s check: is this file being run directly?', ar:'تشييك من أنجولار: الملف ده بيتشغّل مباشرة؟' } },
      { n:'express', k:'ng', re:'(?<![\\w$.\'-])express(?![\\w$\'-])', w:{ en:'The Express library.', ar:'مكتبة Express.' } },
      { n:'use', k:'ng', re:'(?<=\\.)use(?=\\()', w:{ en:'Express’s method for adding a handler.', ar:'ميثود Express لإضافة handler.' } },
      { n:'listen', k:'ng', w:{ en:'Express’s method that opens the port.', ar:'ميثود Express اللي بتفتح البورت.' } },
      { n:'reqHandler', k:'ng', w:{ en:'Looks like your name, but the Angular CLI looks for an export with exactly this name. Leave it.', ar:'شكله اسمك، بس الـ Angular CLI بيدوّر على export بالاسم ده بالظبط. سيبه.' } },
      { n:'inject', k:'ng', w:{ en:'Angular’s function. Only works in an injection context: a field, a constructor, a factory.', ar:'function من أنجولار. بتشتغل بس في injection context: field أو constructor أو factory.' } },
      { n:'@Inject', k:'ng', w:{ en:'The older decorator for injecting by token.', ar:'الـ decorator القديم للـ inject بالـ token.' } },
      { n:'PLATFORM_ID', k:'ng', w:{ en:'Angular’s token that says where the code runs.', ar:'الـ token بتاع أنجولار اللي بيقول الكود شغال فين.' } },
      { n:'isPlatformBrowser', k:'ng', w:{ en:'Angular’s helper: <code>true</code> in the browser.', ar:'helper من أنجولار: <code>true</code> في المتصفح.' } },
      { n:'ngOnInit', k:'ng', w:{ en:'Angular’s lifecycle method name.', ar:'اسم ميثود الـ lifecycle بتاعة أنجولار.' } },
      { n:'@defer', k:'ng', w:{ en:'Angular’s deferred block.', ar:'البلوك المتأجل بتاع أنجولار.' } },
      { n:'hydrate', k:'ng', re:'(?<=\\()hydrate(?= )', w:{ en:'Angular’s keyword: when the browser wakes this part up.', ar:'كلمة أنجولار: إمتى المتصفح يصحّي الجزء ده.' } },
      { n:'on', k:'ng', re:'(?<=hydrate )on(?= )', w:{ en:'Introduces a trigger.', ar:'بتبدأ بيها الـ trigger.' } },
      { n:'interaction', k:'ng', re:'(?<=hydrate on )interaction(?![\\w$-])', w:{ en:'A trigger: the first click or key press.', ar:'trigger: أول كليك أو زرار كيبورد.' } },
      { n:'@placeholder', k:'ng', w:{ en:'Angular’s block shown before the deferred part is ready.', ar:'البلوك اللي بيظهر قبل ما الجزء المتأجل يجهز.' } },
      { n:'ngSkipHydration', k:'ng', w:{ en:'Angular’s attribute: do not hydrate this component, rebuild it in the browser instead.', ar:'attribute من أنجولار: ماتعملش hydration للـ component ده، ابنيه من الأول في المتصفح.' } },
      { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
      { n:'set', k:'ng', re:'(?<=\\.)set(?=\\()', w:{ en:'A signal method.', ar:'ميثود في الـ signal.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One URL, six stops', ar: 'URL واحد، ست محطات' },
    lead: {
      en: 'A blog. Someone opens <code>/blog/hello-ssr</code>. The page was already drawn on the server, so text appears at once; then the browser takes over. Follow the URL through the files:',
      ar: 'مدونة. حد فتح <code>/blog/hello-ssr</code>. الصفحة اترسمت خلاص على السيرفر، فالكلام بيظهر على طول؛ وبعدين المتصفح بيستلم. امشي ورا الـ URL في الملفات:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'app.routes.ts', lang: 'ts', who: { en: 'both sides · the URL', ar: 'الناحيتين · الـ URL' },
          code: ["{ path: 'blog/:slug', component: Article },"],
          say: { en: `You name the changing part of the URL. ${ng('path')} and ${ng('component')} are Angular’s keys. ${pub('slug')} is a word you chose, and from here on it has to be spelled the same everywhere.`,
                 ar: `انت بتسمّي الجزء اللي بيتغير في الـ URL. ${ng('path')} و${ng('component')} مفاتيح أنجولار. و${pub('slug')} كلمة انت اخترتها، ومن هنا ورايح لازم تتكتب زي ما هي في كل حتة.` } },
        { file: 'app.routes.server.ts', lang: 'ts', who: { en: 'server · build time', ar: 'السيرفر · وقت الـ build' },
          code: ["path: 'blog/:slug',", 'renderMode: RenderMode.Prerender,', 'async getPrerenderParams() {', '  // … read the slugs from the CMS …', '  return slugs.map(s => ({ slug: s }));', '},'],
          say: { en: `The server-side twin of that route. ${ng('RenderMode')}.${ng('Prerender')} says “draw every article at build time”. ${ng('getPrerenderParams')} is a method name Angular calls, so it is fixed. The key ${pub('slug')} you return must match ${pub('slug')} in the path.`,
                 ar: `ده توأم الـ route ده على ناحية السيرفر. ${ng('RenderMode')}.${ng('Prerender')} معناها «ارسم كل مقال وقت الـ build». و${ng('getPrerenderParams')} اسم ميثود أنجولار بيناديها، فهو ثابت. والمفتاح ${pub('slug')} اللي بترجّعه لازم يطابق ${pub('slug')} اللي في المسار.` } },
        { file: 'article.ts', lang: 'ts', who: { en: 'both sides · the input', ar: 'الناحيتين · الـ input' },
          code: ['readonly slug = input.required<string>();'],
          say: { en: `${ng('withComponentInputBinding')} copies the route parameter into the input <b>with the same name</b>. That is the third place ${pub('slug')} is typed.`,
                 ar: `${ng('withComponentInputBinding')} بينسخ الـ route parameter في الـ input اللي <b>ليه نفس الاسم</b>. ودي تالت مرة ${pub('slug')} بيتكتب فيها.` } },
        { file: 'article.ts', lang: 'ts', who: { en: 'server first, then browser', ar: 'السيرفر الأول، وبعدين المتصفح' },
          code: ['readonly post = httpResource<Post>(() => `/api/posts/${this.slug()}`);'],
          say: { en: `This same line runs on the server. ${ng('httpResource')} fetches the post there, and the answer is packed into the HTML so the browser does not ask again. ${mine('post')} is your own name.`,
                 ar: `نفس السطر ده بيشتغل على السيرفر. ${ng('httpResource')} بيجيب المقال هناك، والرد بيتحط جوه الـ HTML عشان المتصفح مايطلبوش تاني. و${mine('post')} اسم بتاعك.` } },
        { file: 'app.config.ts', lang: 'ts', who: { en: 'browser · wakes up', ar: 'المتصفح · بيصحى' },
          code: ['provideClientHydration(withEventReplay(), withIncrementalHydration()),'],
          say: { en: `All Angular’s. ${ng('provideClientHydration')} means “adopt the DOM that is already there”. Without it Angular throws the server’s HTML away and draws the page again.`,
                 ar: `كلها بتاعة أنجولار. ${ng('provideClientHydration')} معناها «اتبنّى الـ DOM اللي موجود». من غيرها أنجولار بيرمي الـ HTML بتاع السيرفر ويرسم الصفحة من الأول.` } },
        { file: 'article.ts', lang: 'ts', who: { en: 'browser only', ar: 'المتصفح بس' },
          code: ['afterNextRender(() => {', "  localStorage.setItem('lastRead', this.slug());", '});'],
          say: { en: `${ng('localStorage')} does not exist on the server. ${ng('afterNextRender')} only ever runs in the browser, so this is safe. The key ${mine('lastRead')} is a string you chose.`,
                 ar: `${ng('localStorage')} مش موجود على السيرفر. و${ng('afterNextRender')} عمره ما بيشتغل غير في المتصفح، فكده أمان. والمفتاح ${mine('lastRead')} نص انت اخترته.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'Your component code runs twice, once on the server and once in the browser. Almost every name is Angular’s. The one you own and must keep in sync is the route parameter: <code>:slug</code> → <code>{ slug: … }</code> → <code>slug = input()</code>.',
        ar: 'كود الـ component بتاعك بيشتغل مرتين، مرة على السيرفر ومرة في المتصفح. تقريبًا كل الأسماء بتاعة أنجولار. الاسم اللي بتاعك ولازم تخليه متطابق هو الـ route parameter: <code>:slug</code> ← <code>{ slug: … }</code> ← <code>slug = input()</code>.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Server or browser?', ar: 'السيرفر ولا المتصفح؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'Most SSR confusion is “which file is the server one?” Only four files are. Everything else, your components included, runs on both sides.',
      ar: 'أغلب لخبطة الـ SSR هي «أنهي ملف ده بتاع السيرفر؟». أربع ملفات بس هما اللي كده. أي حاجة تانية، والـ components بتاعتك منهم، بتشتغل في الناحيتين.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ["<code>path: 'blog/:slug'</code>", '<code>app.routes.ts</code> (both sides)', 'you', `you pick ${pub('slug')}; ${ng('path')} is Angular’s`],
            ar: ["<code>path: 'blog/:slug'</code>", '<code>app.routes.ts</code> (الناحيتين)', 'انت', `انت بتختار ${pub('slug')}؛ و${ng('path')} بتاع أنجولار`] },
          { en: ['<code>renderMode</code>, <code>getPrerenderParams</code>', '<code>app.routes.server.ts</code> (server only)', 'you; the CLI creates the file', `the path copies the client route; the returned key copies ${pub('slug')}; the rest is Angular’s`],
            ar: ['<code>renderMode</code> و<code>getPrerenderParams</code>', '<code>app.routes.server.ts</code> (السيرفر بس)', 'انت؛ والـ CLI بيعمل الملف', `المسار بينسخ route المتصفح؛ والمفتاح اللي بترجّعه بينسخ ${pub('slug')}؛ والباقي بتاع أنجولار`] },
          { en: ['<code>slug = input.required()</code>', '<code>article.ts</code> (both sides)', 'you', `must copy ${pub('slug')}`],
            ar: ['<code>slug = input.required()</code>', '<code>article.ts</code> (الناحيتين)', 'انت', `لازم ينسخ ${pub('slug')}`] },
          { en: ['<code>provideClientHydration(…)</code>', '<code>app.config.ts</code> (both sides)', 'the CLI adds it', 'all Angular’s'],
            ar: ['<code>provideClientHydration(…)</code>', '<code>app.config.ts</code> (الناحيتين)', 'الـ CLI بيضيفها', 'كلها بتاعة أنجولار'] },
          { en: ['<code>provideServerRendering(withRoutes(…))</code>', '<code>app.config.server.ts</code> (server only)', 'the CLI', `Angular’s, plus your ${pub('serverRoutes')}`],
            ar: ['<code>provideServerRendering(withRoutes(…))</code>', '<code>app.config.server.ts</code> (السيرفر بس)', 'الـ CLI', `بتاعة أنجولار، ومعاها ${pub('serverRoutes')} بتاعك`] },
          { en: ['<code>angularApp</code>, <code>req</code>, <code>res</code>', '<code>server.ts</code> (server only)', 'the CLI', `yours to rename, except ${ng('reqHandler')}`],
            ar: ['<code>angularApp</code> و<code>req</code> و<code>res</code>', '<code>server.ts</code> (السيرفر بس)', 'الـ CLI', `تقدر تغيّرهم، ما عدا ${ng('reqHandler')}`] },
          { en: ['<code>afterNextRender(() => …)</code>', '<code>article.ts</code>', 'you', 'Angular’s function; what is inside is yours'],
            ar: ['<code>afterNextRender(() => …)</code>', '<code>article.ts</code>', 'انت', 'الـ function بتاعة أنجولار؛ واللي جواها بتاعك'] },
        ] },
      { t: 'ul',
        en: ['<b>There is no “server version” of your component.</b> The same class runs on the server first, then again in the browser. That is why browser-only code needs a guard.',
             '<b>Only files with <code>server</code> in their name run only on the server:</b> <code>server.ts</code>, <code>main.server.ts</code>, <code>app.config.server.ts</code>, <code>app.routes.server.ts</code>. They never reach the browser.',
             '<b>A name you put in the URL travels.</b> <code>:slug</code> is typed in the client route, the server route and the input. Change one, change all three.'],
        ar: ['<b>مفيش «نسخة سيرفر» من الـ component بتاعك.</b> نفس الكلاس بيشتغل على السيرفر الأول، وبعدين تاني في المتصفح. وعشان كده كود المتصفح محتاج حماية.',
             '<b>الملفات اللي في اسمها <code>server</code> بس هي اللي بتشتغل على السيرفر لوحده:</b> <code>server.ts</code> و<code>main.server.ts</code> و<code>app.config.server.ts</code> و<code>app.routes.server.ts</code>. ودول عمرهم ما بيوصلوا للمتصفح.',
             '<b>الاسم اللي بتحطه في الـ URL بيسافر.</b> <code>:slug</code> مكتوب في route المتصفح، وroute السيرفر، والـ input. غيّر واحد، غيّر التلاتة.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All eight files, every name coloured', ar: 'التمن ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same blog, complete. Hover a coloured name to light up everywhere else it appears. Then press <b>Rename test</b>: every name you own becomes a made-up word, Angular’s words stay put, and the code still works.',
      ar: 'نفس المدونة، كاملة. قف بالماوس على أي اسم ملوّن وهتنوّر كل الأماكن التانية اللي هو فيها. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: كل اسم بتاعك هيبقى كلمة عشوائية، وكلمات أنجولار هتفضل مكانها، والكود لسه شغال.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'post.ts', lang: 'ts', tag: { en: 'the data', ar: 'الداتا' }, code: [
        'export interface Post {',
        '  title: string;',
        '  bodyHtml: string;',
        '}' ] },
      { t: 'code', name: 'app.routes.ts', lang: 'ts', tag: { en: 'both sides', ar: 'الناحيتين' }, code: [
        "import { Routes } from '@angular/router';",
        "import { Article } from './article';",
        '',
        'export const routes: Routes = [',
        "  { path: 'blog/:slug', component: Article },",
        '];' ] },
      { t: 'code', name: 'app.config.ts', lang: 'ts', tag: { en: 'both sides', ar: 'الناحيتين' }, code: [
        "import { ApplicationConfig } from '@angular/core';",
        "import { provideRouter, withComponentInputBinding } from '@angular/router';",
        "import { provideHttpClient, withFetch } from '@angular/common/http';",
        "import { provideClientHydration, withEventReplay,",
        "         withIncrementalHydration } from '@angular/platform-browser';",
        "import { routes } from './app.routes';",
        '',
        'export const appConfig: ApplicationConfig = {',
        '  providers: [',
        '    provideRouter(routes, withComponentInputBinding()),',
        '    provideHttpClient(withFetch()),',
        '    provideClientHydration(withEventReplay(), withIncrementalHydration()),',
        '  ],',
        '};' ] },
      { t: 'code', name: 'app.routes.server.ts', lang: 'ts', tag: { en: 'server only', ar: 'السيرفر بس' }, code: [
        "import { RenderMode, ServerRoute } from '@angular/ssr';",
        '',
        'export const serverRoutes: ServerRoute[] = [',
        '  {',
        "    path: 'blog/:slug',",
        '    renderMode: RenderMode.Prerender,',
        '    async getPrerenderParams() {',
        "      const cmsReply = await fetch('https://cms.example.com/api/slugs');",
        '      const slugs: string[] = await cmsReply.json();',
        '      return slugs.map(s => ({ slug: s }));',
        '    },',
        '  },',
        "  { path: 'account', renderMode: RenderMode.Client },",
        "  { path: '**', renderMode: RenderMode.Server },",
        '];' ] },
      { t: 'code', name: 'app.config.server.ts', lang: 'ts', tag: { en: 'server only', ar: 'السيرفر بس' }, code: [
        "import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';",
        "import { provideServerRendering, withRoutes } from '@angular/ssr';",
        "import { appConfig } from './app.config';",
        "import { serverRoutes } from './app.routes.server';",
        '',
        'const serverConfig: ApplicationConfig = {',
        '  providers: [provideServerRendering(withRoutes(serverRoutes))],',
        '};',
        '',
        'export const config = mergeApplicationConfig(appConfig, serverConfig);' ] },
      { t: 'code', name: 'article.ts', lang: 'ts', tag: { en: 'the page, both sides', ar: 'الصفحة، الناحيتين' }, code: [
        "import { Component, afterNextRender, input } from '@angular/core';",
        "import { httpResource } from '@angular/common/http';",
        "import { Post } from './post';",
        '',
        '@Component({',
        "  selector: 'app-article',",
        "  templateUrl: './article.html',",
        '})',
        'export class Article {',
        '  readonly slug = input.required<string>();',
        '  readonly post = httpResource<Post>(() => `/api/posts/${this.slug()}`);',
        '',
        '  constructor() {',
        '    afterNextRender(() => {',
        "      localStorage.setItem('lastRead', this.slug());",
        '    });',
        '  }',
        '}' ] },
      { t: 'code', name: 'article.html', lang: 'html', tag: { en: 'the page, both sides', ar: 'الصفحة، الناحيتين' }, code: [
        '@if (post.value(); as p) {',
        '  <h1>{{ p.title }}</h1>',
        '  <article [innerHTML]="p.bodyHtml"></article>',
        '} @else if (post.isLoading()) {',
        '  <p>Loading…</p>',
        '}' ] },
      { t: 'code', name: 'server.ts', lang: 'ts', tag: { en: 'server only, generated', ar: 'السيرفر بس، متولّد' }, code: [
        'import {',
        '  AngularNodeAppEngine,',
        '  createNodeRequestHandler,',
        '  isMainModule,',
        '  writeResponseToNodeResponse,',
        "} from '@angular/ssr/node';",
        "import express from 'express';",
        "import { join } from 'node:path';",
        '',
        "const browserDistFolder = join(import.meta.dirname, '../browser');",
        '',
        'const app = express();',
        'const angularApp = new AngularNodeAppEngine();',
        '',
        'app.use(express.static(browserDistFolder, { maxAge: \'1y\', index: false }));',
        '',
        'app.use((req, res, next) => {',
        '  angularApp',
        '    .handle(req)',
        '    .then(response => response ? writeResponseToNodeResponse(response, res) : next())',
        '    .catch(next);',
        '});',
        '',
        'if (isMainModule(import.meta.url)) {',
        '  app.listen(4000);',
        '}',
        '',
        'export const reqHandler = createNodeRequestHandler(app);' ] },
      { t: 'nmtable' }
    ]
  },

  /* ------------------------------------------------------------ 4 */
  {
    id: 'rename',
    kicker: { en: 'Is it OK to change it?', ar: 'ينفع أغيّره؟' },
    title: { en: 'What breaks when you rename each name', ar: 'إيه اللي بيبوظ لما تغيّر كل اسم' },
    lead: {
      en: 'Most of these give you a compile error, which is the good case. The route parameter does not: it is a string in two files and a property in a third, and TypeScript does not connect them.',
      ar: 'أغلب دول بيدّوك compile error، وده الحال الكويس. الـ route parameter لأ: هو نص في ملفين وproperty في ملف تالت، وTypeScript مش بيربط بينهم.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [pub('slug') + ' in the input', '<code>:slug</code> in both route files and the key in <code>getPrerenderParams</code>', '<b>No compile error.</b> The router finds no parameter with the new name, the input ends up <code>undefined</code>, and the page asks for <code>/api/posts/undefined</code>.'],
            ar: [pub('slug') + ' في الـ input', '<code>:slug</code> في ملفين الـ routes والمفتاح في <code>getPrerenderParams</code>', '<b>مفيش compile error.</b> الـ router مش هيلاقي parameter بالاسم الجديد، والـ input هيبقى <code>undefined</code>، والصفحة هتطلب <code>/api/posts/undefined</code>.'] },
          { en: [pub('slug') + ' in the path only', 'the returned key <code>{ slug: … }</code> and the input', 'The prerender step fails for that route: the params you return have no value for the new name.'],
            ar: [pub('slug') + ' في المسار بس', 'المفتاح اللي بترجّعه <code>{ slug: … }</code> والـ input', 'خطوة الـ prerender بتفشل للـ route ده: الـ params اللي بترجّعها مفيهاش قيمة للاسم الجديد.'] },
          { en: ['the text of a client <code>path</code>', 'the matching server route’s <code>path</code>', 'Angular reports that the server route matches no client route.'],
            ar: ['نص <code>path</code> في route المتصفح', 'الـ <code>path</code> بتاع الـ server route اللي قصاده', 'أنجولار بيقولك إن الـ server route مش مطابق لأي route في المتصفح.'] },
          { en: [pub('serverRoutes'), '<code>app.config.server.ts</code>: the import and <code>withRoutes(…)</code>', 'Compile error on the import.'],
            ar: [pub('serverRoutes'), '<code>app.config.server.ts</code>: الـ import و<code>withRoutes(…)</code>', 'Compile error في الـ import.'] },
          { en: [`${pub('routes')}, ${pub('appConfig')}, ${pub('config')}`, 'the file that imports it (<code>app.config.ts</code>, <code>main.ts</code>, <code>app.config.server.ts</code>, <code>main.server.ts</code>)', 'Compile error on the import.'],
            ar: [`${pub('routes')} و${pub('appConfig')} و${pub('config')}`, 'الملف اللي بيعمله import (<code>app.config.ts</code> أو <code>main.ts</code> أو <code>app.config.server.ts</code> أو <code>main.server.ts</code>)', 'Compile error في الـ import.'] },
          { en: [`${pub('Article')}, ${pub('Post')}`, 'every <code>import</code> of it', 'Compile error.'],
            ar: [`${pub('Article')} و${pub('Post')}`, 'كل <code>import</code> ليه', 'Compile error.'] },
          { en: [`${pub('title')}, ${pub('bodyHtml')}`, 'the template, <b>and the API</b> that sends the JSON', 'The template gives a compile error. But if the API still sends the old key, nothing fails: the field is just empty on screen.'],
            ar: [`${pub('title')} و${pub('bodyHtml')}`, 'التمبلت، <b>والـ API</b> اللي بيبعت الـ JSON', 'التمبلت هيدّيك compile error. بس لو الـ API لسه بيبعت المفتاح القديم، مفيش حاجة هتفشل: الحقل هيبان فاضي وخلاص.'] },
          { en: [mine('post'), 'the page’s template', 'Compile error in the template.'],
            ar: [mine('post'), 'تمبلت الصفحة', 'Compile error في التمبلت.'] },
          { en: [mine('lastRead'), 'any other code that reads that key', 'No error. <code>getItem</code> just returns <code>null</code>.'],
            ar: [mine('lastRead'), 'أي كود تاني بيقرا المفتاح ده', 'مفيش error. <code>getItem</code> بترجّع <code>null</code> وخلاص.'] },
          { en: [`${mine('app')}, ${mine('angularApp')}, ${mine('req')}, ${mine('res')}, ${mine('next')}`, 'only inside <code>server.ts</code>', 'Compile error inside the file.'],
            ar: [`${mine('app')} و${mine('angularApp')} و${mine('req')} و${mine('res')} و${mine('next')}`, 'جوه <code>server.ts</code> بس', 'Compile error جوه الملف.'] },
          { en: [`${ng('reqHandler')}, ${ng('getPrerenderParams')}, ${ng('provideClientHydration')}, …`, 'nothing: these are not yours', 'They are Angular’s names, looked up by Angular or the CLI.'],
            ar: [`${ng('reqHandler')} و${ng('getPrerenderParams')} و${ng('provideClientHydration')} و…`, 'ولا حاجة: دول مش بتوعك', 'دي أسماء أنجولار، وأنجولار أو الـ CLI بيدوّروا عليها.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b> above the files. Watch <code>slug</code>: it changes in the client route, the server route, the returned key and the input, all at once. That is the rename you must do by hand.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b> فوق الملفات. بص على <code>slug</code>: بيتغير في route المتصفح، وroute السيرفر، والمفتاح اللي بيرجع، والـ input، كلهم مرة واحدة. ده التغيير اللي لازم تعمله بإيدك.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتوعك' },
    title: { en: 'The fixed names, and whose they are', ar: 'الأسماء الثابتة، وبتاعة مين' },
    lead: {
      en: 'SSR brings three owners into one app: Angular, the browser and Express. The browser’s names are the dangerous ones, because on the server they simply do not exist.',
      ar: 'الـ SSR بيجيب تلات أصحاب في تطبيق واحد: أنجولار، والمتصفح، وExpress. أسماء المتصفح هي الخطيرة، لإنها على السيرفر مش موجودة أصلًا.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Names', 'Whose', 'What to know'], ar: ['الأسماء', 'بتاعة مين', 'تعرف إيه'] },
        rows: [
          { en: [`${ng('provideClientHydration')}, ${ng('withEventReplay')}, ${ng('withIncrementalHydration')}, ${ng('provideServerRendering')}, ${ng('withRoutes')}`, 'Angular', 'Type them exactly. They are imported, so a typo is a compile error.'],
            ar: [`${ng('provideClientHydration')} و${ng('withEventReplay')} و${ng('withIncrementalHydration')} و${ng('provideServerRendering')} و${ng('withRoutes')}`, 'أنجولار', 'اكتبهم زي ما هما. بيتعملهم import، فالغلطة الإملائية compile error.'] },
          { en: [`${ng('RenderMode')}.${ng('Prerender')} / ${ng('Server')} / ${ng('Client')}, ${ng('renderMode')}, ${ng('getPrerenderParams')}`, 'Angular', 'Keys and a method name Angular reads from your object.'],
            ar: [`${ng('RenderMode')}.${ng('Prerender')} / ${ng('Server')} / ${ng('Client')} و${ng('renderMode')} و${ng('getPrerenderParams')}`, 'أنجولار', 'مفاتيح واسم ميثود أنجولار بيقراهم من الأوبجكت بتاعك.'] },
          { en: [`${ng('afterNextRender')}, ${ng('PLATFORM_ID')}, ${ng('isPlatformBrowser')}`, 'Angular', 'Your tools for browser-only code.'],
            ar: [`${ng('afterNextRender')} و${ng('PLATFORM_ID')} و${ng('isPlatformBrowser')}`, 'أنجولار', 'أدواتك لكود المتصفح بس.'] },
          { en: [`${ng('hydrate')} ${ng('on')} ${ng('interaction')}, ${ng('ngSkipHydration')}`, 'Angular template words', 'Keywords inside <code>@defer ( )</code>, and an attribute.'],
            ar: [`${ng('hydrate')} ${ng('on')} ${ng('interaction')} و${ng('ngSkipHydration')}`, 'كلمات تمبلت أنجولار', 'كلمات جوه <code>@defer ( )</code>، وattribute.'] },
          { en: [`${ng('window')}, ${ng('localStorage')}, <code>document</code>, <code>navigator</code>`, 'the browser', '<b>Missing on the server.</b> Using them while rendering throws <code>ReferenceError</code> there.'],
            ar: [`${ng('window')} و${ng('localStorage')} و<code>document</code> و<code>navigator</code>`, 'المتصفح', '<b>مش موجودين على السيرفر.</b> لو استخدمتهم وانت بترسم هيطلع <code>ReferenceError</code> هناك.'] },
          { en: [`${ng('express')}, ${ng('use')}, ${ng('listen')}`, 'Express', `Its API. But ${mine('req')}, ${mine('res')}, ${mine('next')} are passed by position, so those names are yours.`],
            ar: [`${ng('express')} و${ng('use')} و${ng('listen')}`, 'Express', `الـ API بتاعه. بس ${mine('req')} و${mine('res')} و${mine('next')} بيتبعتوا حسب مكانهم، فالأسماء دي بتاعتك.`] },
        ] },
      { t: 'p',
        en: `If you need to ask “am I in the browser?” in more than one place, wrap Angular’s names in a helper of your own. ${ng('PLATFORM_ID')} and ${ng('isPlatformBrowser')} are fixed; ${pub('isBrowser')} is yours.`,
        ar: `لو محتاج تسأل «أنا في المتصفح؟» في أكتر من مكان، لف أسماء أنجولار في helper بتاعك. ${ng('PLATFORM_ID')} و${ng('isPlatformBrowser')} ثابتين؛ و${pub('isBrowser')} بتاعك.` },
      { t: 'code', name: 'platform.ts', lang: 'ts', tag: { en: 'your helper', ar: 'الـ helper بتاعك' }, code: [
        "import { PLATFORM_ID, inject } from '@angular/core';",
        "import { isPlatformBrowser } from '@angular/common';",
        '',
        '// call it where inject() is allowed: a field or the constructor',
        'export function isBrowser() {',
        '  return isPlatformBrowser(inject(PLATFORM_ID));',
        '}' ] },
      { t: 'p',
        en: 'The template has its own fixed words. Everything else in these two blocks is yours or a child component’s:',
        ar: 'التمبلت ليه كلماته الثابتة برضه. وأي حاجة تانية في البلوكين دول بتاعتك أو بتاعة component ابن:' },
      { t: 'code', name: 'article.html · extras', lang: 'html', tag: { en: 'fixed words in the template', ar: 'كلمات ثابتة في التمبلت' }, code: [
        '<!-- drawn on the server, woken up only on the first click -->',
        '@defer (hydrate on interaction) {',
        '  <app-comment-form [articleSlug]="slug()" />',
        '} @placeholder {',
        '  <p>Comments</p>',
        '}',
        '',
        '<!-- a widget that edits the DOM itself: rebuild it in the browser -->',
        '<app-share-bar ngSkipHydration />' ] }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'Angular does not care what you call these. The habits below just make the one fragile name easy to find, and keep the server files recognisable.',
      ar: 'أنجولار مش فارق معاه بتسمّي دول إيه. العادات دي بس بتخلي الاسم الوحيد الهش سهل تلاقيه، وبتخلي ملفات السيرفر باينة.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['a route parameter', '<code>slug</code>, <code>id</code>, <code>postId</code>', '<code>param</code>, <code>p1</code>, <code>x</code>', 'It is typed in three files. Say what is in the URL, and search for it before renaming.'],
            ar: ['route parameter', '<code>slug</code> و<code>id</code> و<code>postId</code>', '<code>param</code> و<code>p1</code> و<code>x</code>', 'بيتكتب في تلات ملفات. قول إيه اللي في الـ URL، ودوّر عليه قبل ما تغيّره.'] },
          { en: ['the input that receives it', 'exactly the parameter’s name', 'a “nicer” name like <code>postSlug</code>', 'Here it is more than a habit: the router matches by name.'],
            ar: ['الـ input اللي بيستقبله', 'نفس اسم الـ parameter بالظبط', 'اسم «أشيك» زي <code>postSlug</code>', 'هنا دي أكتر من عادة: الـ router بيطابق بالاسم.'] },
          { en: ['a <code>localStorage</code> key', 'one constant, e.g. <code>LAST_READ_KEY</code>, if two files use it', 'retyping the string', 'A misspelled key is not an error; you just read <code>null</code>.'],
            ar: ['مفتاح في <code>localStorage</code>', 'constant واحد، زي <code>LAST_READ_KEY</code>، لو ملفين بيستخدموه', 'إنك تكتب النص تاني', 'المفتاح المكتوب غلط مش error؛ هتقرا <code>null</code> وخلاص.'] },
          { en: ['the server files', 'keep the CLI’s names: <code>server.ts</code>, <code>main.server.ts</code>, <code>app.config.server.ts</code>, <code>app.routes.server.ts</code>', 'moving them around for taste', '<code>angular.json</code> and imports point at them, and <code>.server</code> tells a reader the file never ships to the browser.'],
            ar: ['ملفات السيرفر', 'سيب أسماء الـ CLI: <code>server.ts</code> و<code>main.server.ts</code> و<code>app.config.server.ts</code> و<code>app.routes.server.ts</code>', 'إنك تنقلهم على مزاجك', '<code>angular.json</code> والـ imports بيشاوروا عليهم، و<code>.server</code> بتقول للي بيقرا إن الملف عمره ما بيوصل للمتصفح.'] },
          { en: ['a browser check helper', '<code>isBrowser</code>', '<code>check</code>, <code>env</code>', 'Name the question it answers.'],
            ar: ['helper بيشيّك على المتصفح', '<code>isBrowser</code>', '<code>check</code> و<code>env</code>', 'سمّيه بالسؤال اللي بيجاوب عليه.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Four places where the name is not free', ar: 'أربع أماكن الاسم فيهم مش براحتك' },
    lead: {
      en: 'Some names look like yours but are read by Angular, the router or the CLI. Get them wrong and the thing quietly stops being connected.',
      ar: 'فيه أسماء شكلها بتاعتك، بس أنجولار أو الـ router أو الـ CLI بيقروها. لو كتبتها غلط الحاجة بتفصل من غير صوت.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'The route parameter, three times', ar: 'الـ route parameter، تلات مرات' }, blocks: [
        { t: 'p',
          en: `You choose the word ${pub('slug')} once, in the client route. After that, two rules copy it: ${ng('getPrerenderParams')} must return objects with that key, and ${ng('withComponentInputBinding')} fills only an input with that name. None of the three is checked against the others at compile time.`,
          ar: `انت بتختار كلمة ${pub('slug')} مرة واحدة، في route المتصفح. بعد كده فيه قاعدتين بينسخوها: ${ng('getPrerenderParams')} لازم ترجّع objects فيها المفتاح ده، و${ng('withComponentInputBinding')} بيملا بس الـ input اللي بالاسم ده. ومفيش واحد من التلاتة بيتشيّك على التانيين وقت الـ compile.` }
      ]},
      { t: 'step', n: 'B', title: { en: 'Keys and method names Angular reads', ar: 'مفاتيح وأسماء ميثودز أنجولار بيقراها' }, blocks: [
        { t: 'p',
          en: `${ng('path')}, ${ng('renderMode')} and ${ng('getPrerenderParams')} are read from your object by name. Because the array is typed <code>ServerRoute[]</code>, TypeScript usually catches a misspelled key. Keep the type annotation; it is what protects you.`,
          ar: `${ng('path')} و${ng('renderMode')} و${ng('getPrerenderParams')} أنجولار بيقراهم من الأوبجكت بتاعك بالاسم. وعشان الـ array متعرّفة كـ <code>ServerRoute[]</code>، TypeScript غالبًا بيمسك المفتاح المكتوب غلط. سيب الـ type ده؛ هو اللي بيحميك.` }
      ]},
      { t: 'step', n: 'C', title: { en: '<code>reqHandler</code> in server.ts', ar: '<code>reqHandler</code> في server.ts' }, blocks: [
        { t: 'p',
          en: `Every other name in ${'<code>server.ts</code>'} is yours, but the generated comment above ${ng('reqHandler')} says the Angular CLI uses it (for the dev server and the build). The CLI looks for that export by name, so leave it exactly as generated.`,
          ar: `كل الأسماء التانية في <code>server.ts</code> بتاعتك، بس الكومنت المتولّد فوق ${ng('reqHandler')} بيقول إن الـ Angular CLI بيستخدمه (للـ dev server وللـ build). الـ CLI بيدوّر على الـ export ده بالاسم، فسيبه زي ما اتولّد بالظبط.` }
      ]},
      { t: 'step', n: 'D', title: { en: 'File names that angular.json points at', ar: 'أسماء ملفات <code>angular.json</code> بيشاور عليها' }, blocks: [
        { t: 'code', name: 'angular.json', lang: 'json', tag: { en: 'part of the build options', ar: 'جزء من إعدادات الـ build' }, code: [
          '"options": {',
          '  "browser": "src/main.ts",',
          '  "server": "src/main.server.ts",',
          '  "outputMode": "server",',
          '  "ssr": { "entry": "src/server.ts" }',
          '}' ] },
        { t: 'p',
          en: 'Rename <code>main.server.ts</code> or <code>server.ts</code> and this file must follow, or the build cannot find its entry points. The other two server files are only reached through imports.',
          ar: 'لو غيّرت اسم <code>main.server.ts</code> أو <code>server.ts</code> الملف ده لازم يتغير معاه، وإلا الـ build مش هيلاقي نقط البداية بتاعته. والملفين التانيين بتوع السيرفر بيتوصلّهم من خلال الـ imports بس.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: 'The older guard uses the same fixed names', ar: 'الحماية القديمة بتستخدم نفس الأسماء الثابتة' },
    lead: {
      en: 'Tutorials often guard browser code with a constructor-injected <code>PLATFORM_ID</code>. It still works. Only where the token comes from, and when the code runs, change.',
      ar: 'الشروحات كتير بتحمي كود المتصفح بـ <code>PLATFORM_ID</code> جاي من الـ constructor. ولسه شغال. اللي بيتغير بس هو الـ token جاي منين، والكود بيشتغل إمتى.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'article.ts — older style', lang: 'ts', code: [
          "import { Inject, PLATFORM_ID } from '@angular/core';",
          "import { isPlatformBrowser } from '@angular/common';",
          '',
          'constructor(@Inject(PLATFORM_ID) private platformId: object) {}',
          '',
          'ngOnInit() {',
          '  if (isPlatformBrowser(this.platformId)) {',
          "    localStorage.setItem('lastRead', this.slug());",
          '  }',
          '}' ] },
        good: { name: 'article.ts — today', lang: 'ts', code: [
          "import { afterNextRender } from '@angular/core';",
          '',
          '',
          'constructor() {',
          '  afterNextRender(() => {',
          "    localStorage.setItem('lastRead', this.slug());",
          '  });',
          '}' ] } },
      { t: 'p',
        en: `${ng('PLATFORM_ID')}, ${ng('isPlatformBrowser')} and ${ng('ngOnInit')} are Angular’s. ${mine('platformId')} is only the field you keep the token in; call it anything.`,
        ar: `${ng('PLATFORM_ID')} و${ng('isPlatformBrowser')} و${ng('ngOnInit')} بتوع أنجولار. و${mine('platformId')} ده بس الـ field اللي بتحط فيه الـ token؛ سمّيه أي حاجة.` },
      { t: 'p',
        en: 'Projects from before Angular 19 have no <code>app.routes.server.ts</code> and use <code>CommonEngine</code> in <code>server.ts</code>. Some v19 projects register the server routes with <code>provideServerRouting(serverRoutes)</code>. Different Angular function names, same idea, and your <code>serverRoutes</code> is still yours.',
        ar: 'المشاريع اللي قبل أنجولار 19 مفيهاش <code>app.routes.server.ts</code> وبتستخدم <code>CommonEngine</code> في <code>server.ts</code>. وشوية مشاريع v19 بتسجّل الـ server routes بـ <code>provideServerRouting(serverRoutes)</code>. أسماء functions مختلفة من أنجولار، ونفس الفكرة، و<code>serverRoutes</code> لسه بتاعك.' }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'Quiet, or in the wrong place', ar: 'ساكتة، أو في المكان الغلط' },
    title: { en: 'Mistakes that fail silently or confusingly', ar: 'غلطات بتفشل في صمت أو بشكل ملخبط' },
    lead: {
      en: 'SSR errors have a habit of showing up where you are not looking: in the server’s terminal, in the build log, or as a flicker with no message at all.',
      ar: 'أخطاء الـ SSR ليها عادة إنها تظهر في المكان اللي مش باصص فيه: في ترمينال السيرفر، أو في لوج الـ build، أو كرعشة في الصفحة من غير أي رسالة.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'Browser globals in a field', ar: 'حاجات المتصفح في field' }, blocks: [
        { t: 'pair',
          bad:  { name: 'article.ts', lang: 'ts', code: [
            "readonly lastSlug = localStorage.getItem('lastRead');" ] },
          good: { name: 'article.ts', lang: 'ts', code: [
            'readonly lastSlug = signal<string | null>(null);',
            '',
            'constructor() {',
            "  afterNextRender(() => this.lastSlug.set(localStorage.getItem('lastRead')));",
            '}' ] } },
        { t: 'p', en: 'On the server this throws <code>ReferenceError: localStorage is not defined</code>. The message lands in the terminal running the server or the build, not in the browser console, which is why it is easy to miss.',
                  ar: 'على السيرفر ده بيرمي <code>ReferenceError: localStorage is not defined</code>. والرسالة بتظهر في الترمينال اللي شغّال فيه السيرفر أو الـ build، مش في console المتصفح، وعشان كده سهل ماتاخدش بالك منها.' }
      ]},
      { t: 'step', n: '2', title: { en: 'Renaming the input but not the route', ar: 'تغيّر الـ input ومش الـ route' }, blocks: [
        { t: 'pair',
          bad:  { name: 'article.ts', lang: 'ts', code: [
            "// app.routes.ts says  path: 'blog/:slug'",
            'readonly postSlug = input.required<string>();' ] },
          good: { name: 'article.ts', lang: 'ts', code: [
            "// app.routes.ts says  path: 'blog/:slug'",
            'readonly slug = input.required<string>();' ] } },
        { t: 'p', en: 'The router copies <code>:slug</code> into an input called <code>slug</code>. There is none, so <code>postSlug</code> gets no value. No compile error; the page asks for <code>/api/posts/undefined</code>.',
                  ar: 'الـ router بينسخ <code>:slug</code> في input اسمه <code>slug</code>. ومفيش، فـ<code>postSlug</code> مش بياخد قيمة. مفيش compile error؛ والصفحة بتطلب <code>/api/posts/undefined</code>.' }
      ]},
      { t: 'step', n: '3', title: { en: 'A value that differs on each side', ar: 'قيمة بتختلف في كل ناحية' }, blocks: [
        { t: 'pair',
          bad:  { name: 'article.ts', lang: 'ts', code: [
            'readonly shownAt = new Date().toLocaleTimeString();' ] },
          good: { name: 'article.ts', lang: 'ts', code: [
            "readonly shownAt = signal('');",
            '',
            'constructor() {',
            '  afterNextRender(() => this.shownAt.set(new Date().toLocaleTimeString()));',
            '}' ] } },
        { t: 'p', en: 'The server prints its time, then the browser computes another one. Often there is no error at all: the text simply changes when the page wakes up. The same goes for <code>Math.random()</code>. Compute such values in the browser only.',
                  ar: 'السيرفر بيطبع الوقت بتاعه، وبعدين المتصفح بيحسب وقت تاني. وغالبًا مفيش أي error: الكلام بيتغير وخلاص أول ما الصفحة تصحى. ونفس الكلام لـ <code>Math.random()</code>. احسب القيم دي في المتصفح بس.' }
      ]},
      { t: 'step', n: '4', title: { en: 'HTML the browser rewrites', ar: 'HTML المتصفح بيعيد كتابته' }, blocks: [
        { t: 'pair',
          bad:  { name: 'article.html', lang: 'html', code: [
            '<p>',
            '  <div [innerHTML]="p.bodyHtml"></div>',
            '</p>' ] },
          good: { name: 'article.html', lang: 'html', code: [
            '<div>',
            '  <div [innerHTML]="p.bodyHtml"></div>',
            '</div>' ] } },
        { t: 'p', en: 'A <code>&lt;div&gt;</code> is not allowed inside a <code>&lt;p&gt;</code>, so the browser closes the paragraph early. The DOM it builds no longer matches what the server sent, and Angular reports a hydration mismatch error (NG0500) in the console.',
                  ar: '<code>&lt;div&gt;</code> مش مسموح جوه <code>&lt;p&gt;</code>، فالمتصفح بيقفل الفقرة بدري. والـ DOM اللي بيبنيه مبقاش مطابق للي السيرفر بعته، وأنجولار بيطلّع error بتاع hydration mismatch (NG0500) في الـ console.' }
      ]},
      { t: 'step', n: '5', title: { en: 'Calling your helper in the wrong place', ar: 'تنادي الـ helper بتاعك في المكان الغلط' }, blocks: [
        { t: 'pair',
          bad:  { name: 'article.ts', lang: 'ts', code: [
            'ngOnInit() {',
            '  if (isBrowser()) {',
            "    console.log('width', window.innerWidth);",
            '  }',
            '}' ] },
          good: { name: 'article.ts', lang: 'ts', code: [
            'private readonly browser = isBrowser();',
            '',
            'ngOnInit() {',
            '  if (this.browser) {',
            "    console.log('width', window.innerWidth);",
            '  }',
            '}' ] } },
        { t: 'p', en: '<code>isBrowser</code> is your name, but inside it is Angular’s <code>inject()</code>, and <code>inject()</code> only works in a field or the constructor. Called from <code>ngOnInit</code> it throws NG0203. The error names <code>inject()</code>, not your helper, which is what makes it confusing.',
                  ar: '<code>isBrowser</code> اسمك، بس جواه <code>inject()</code> بتاعة أنجولار، و<code>inject()</code> بتشتغل بس في field أو في الـ constructor. لو ناديتها من <code>ngOnInit</code> هترمي NG0203. والـ error بيذكر <code>inject()</code> مش الـ helper بتاعك، وده اللي بيلخبط.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it does nothing', ar: 'لما مايعملش حاجة' },
    title: { en: 'Six questions, in this order', ar: 'ست أسئلة، بالترتيب ده' },
    lead: {
      en: 'Your SSR page is blank, wrong, or flickers. Ask these first.',
      ar: 'صفحة الـ SSR بتاعتك فاضية، أو غلط، أو بترعش. اسأل دول الأول.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Did you look at the terminal running the server or the build, not just the browser console? A <code>ReferenceError</code> about <code>window</code>, <code>document</code> or <code>localStorage</code> means browser code ran on the server.',
                  ar: '<b>1.</b> بصيت في الترمينال اللي شغّال فيه السيرفر أو الـ build، مش console المتصفح بس؟ <code>ReferenceError</code> عن <code>window</code> أو <code>document</code> أو <code>localStorage</code> معناه إن كود متصفح اشتغل على السيرفر.' },
      { t: 'chk', en: '<b>2.</b> Is the route parameter spelled the same in <code>app.routes.ts</code>, in <code>app.routes.server.ts</code> (path and returned key), and as the input name?',
                  ar: '<b>2.</b> الـ route parameter مكتوب زي بعض في <code>app.routes.ts</code>، وفي <code>app.routes.server.ts</code> (المسار والمفتاح اللي بيرجع)، وكاسم الـ input؟' },
      { t: 'chk', en: '<b>3.</b> Is <code>withComponentInputBinding()</code> passed to <code>provideRouter</code>? Without it no route parameter reaches any input.',
                  ar: '<b>3.</b> <code>withComponentInputBinding()</code> متبعتة لـ <code>provideRouter</code>؟ من غيرها ولا route parameter بيوصل لأي input.' },
      { t: 'chk', en: '<b>4.</b> A hydration error in the browser console? Look for invalid nesting, or code that edits the DOM directly.',
                  ar: '<b>4.</b> فيه error بتاع hydration في console المتصفح؟ دوّر على HTML متداخل غلط، أو كود بيعدّل في الـ DOM بإيده.' },
      { t: 'chk', en: '<b>5.</b> Text that changes when the page wakes up? Look for dates, random numbers, or anything read from the browser during rendering.',
                  ar: '<b>5.</b> كلام بيتغير أول ما الصفحة تصحى؟ دوّر على تواريخ، أو أرقام عشوائية، أو أي حاجة بتتقري من المتصفح وقت الرسم.' },
      { t: 'chk', en: '<b>6.</b> Is <code>provideClientHydration()</code> in <code>app.config.ts</code>? Without it the page is drawn twice instead of adopted.',
                  ar: '<b>6.</b> <code>provideClientHydration()</code> موجودة في <code>app.config.ts</code>؟ من غيرها الصفحة بتترسم مرتين بدل ما تتبنّى.' }
    ]
  }
  ]
};
