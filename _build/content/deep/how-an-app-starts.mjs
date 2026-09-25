/* ==================================================================
   The startup files, name by name — the deep dive after "How an
   Angular page actually appears". One running example (the my-shop
   project) followed from index.html to the first component, every
   name coloured by who owns it. Model: content/deep/inputs-outputs.mjs.
   ================================================================== */

/* a name in running text, coloured like the code and linked on hover */
const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

const IDX = 'src/index.html', MAIN = 'src/main.ts', CFG = 'src/app/app.config.ts',
      RTS = 'src/app/app.routes.ts', APP = 'src/app/app.ts', APPH = 'src/app/app.html';

export default {
  topic: 'how-an-app-starts',
  tab: 'The startup files, name by name — The Angular Signal',
  title: { en: 'The startup files, name by name', ar: 'ملفات التشغيل، اسم اسم' },
  say: {
    en: 'The page for when <code>main.ts</code>, <code>app.config.ts</code> and <code>&lt;app-root&gt;</code> feel like magic words. One page load followed through six files, every name coloured: <b>Angular’s</b>, <b>yours</b>, or <b>yours but shared</b>. Then what breaks when you rename each one.',
    ar: 'الصفحة دي للي حاسس إن <code>main.ts</code> و<code>app.config.ts</code> و<code>&lt;app-root&gt;</code> كلمات سحرية. تحميل صفحة واحد ماشيين وراه في ست ملفات، وكل اسم ملوّن: <b>بتاع أنجولار</b>، ولا <b>بتاعك</b>، ولا <b>بتاعك بس متشارك</b>. وبعدين إيه اللي بيبوظ لما تغيّر كل واحد.'
  },
  lead: {
    en: 'The idea is simple: <b>the browser loads one almost-empty page, and Angular fills one tag in it.</b> The confusing part is the names. The CLI wrote six files full of words like <code>bootstrapApplication</code>, <code>appConfig</code>, <code>App</code> and <code>app-root</code>, and nobody told you which ones you are allowed to touch, and which ones have to match another file. This page answers exactly that.',
    ar: 'الفكرة بسيطة: <b>المتصفح بيحمّل صفحة واحدة شبه فاضية، وأنجولار بيملا تاج واحد فيها.</b> اللي بيلخبط هو الأسماء. الـ CLI كتبلك ست ملفات مليانين كلمات زي <code>bootstrapApplication</code> و<code>appConfig</code> و<code>App</code> و<code>app-root</code>، ومحدش قالك مين فيهم مسموحلك تلمسه، ومين لازم يبقى زي حاجة في ملف تاني. الصفحة دي بتجاوب على ده بالظبط.'
  },

  names: {
    note: {
      en: 'Almost every word in these startup files is Angular’s. Read the orange rows first: <code>app-root</code>, <code>App</code>, <code>appConfig</code> and <code>routes</code> are each a promise between two files. Green names live in one file only.',
      ar: 'تقريبًا كل كلمة في ملفات التشغيل دي بتاعة أنجولار. اقرا الصفوف البرتقاني الأول: <code>app-root</code> و<code>App</code> و<code>appConfig</code> و<code>routes</code> كل واحد فيهم وعد بين ملفين. والأسماء الخضرا عايشة في ملف واحد بس.'
    },
    names: [
      /* --- shared: two files must agree --- */
      { n:'app-root', k:'pub',
        w:{ en:'The root component’s selector. The tag in <code>index.html</code> and the <code>selector</code> string in <code>app.ts</code> must match, or the page stays blank.',
            ar:'الـ selector بتاع الـ component الرئيسي. التاج في <code>index.html</code> والنص في <code>selector</code> في <code>app.ts</code> لازم يبقوا زي بعض، وإلا الصفحة هتفضل فاضية.' } },
      { n:'App', k:'pub',
        w:{ en:'Your root component’s class. <code>main.ts</code> imports it by this name, so both files change together.',
            ar:'كلاس الـ component الرئيسي بتاعك. <code>main.ts</code> بيعمله import بالاسم ده، فالملفين بيتغيروا مع بعض.' } },
      { n:'appConfig', k:'pub',
        w:{ en:'Your settings object. Exported from <code>app.config.ts</code>, imported by name in <code>main.ts</code>.',
            ar:'أوبجكت الإعدادات بتاعك. بيطلع export من <code>app.config.ts</code> وبيدخل import بالاسم في <code>main.ts</code>.' } },
      { n:'routes', k:'pub', re:'(?<![\\w$.-])routes(?![\\w$-])',
        w:{ en:'Your routes array. Exported from <code>app.routes.ts</code>, imported by name in <code>app.config.ts</code>.',
            ar:'الـ array بتاع الـ routes بتاعتك. بيطلع export من <code>app.routes.ts</code> وبيدخل import بالاسم في <code>app.config.ts</code>.' } },
      { n:'AppComponent', k:'pub',
        w:{ en:'The older name of the root class. Same promise as <code>App</code>: whoever imports it types this name.',
            ar:'الاسم القديم لكلاس الـ component الرئيسي. نفس وعد <code>App</code>: أي حد بيعمله import بيكتب الاسم ده.' } },
      { n:'AppModule', k:'pub',
        w:{ en:'The older root NgModule. <code>main.ts</code> starts the app from it by this name.',
            ar:'الـ NgModule الرئيسي القديم. <code>main.ts</code> بيشغّل التطبيق منه بالاسم ده.' } },

      /* --- yours, private to one file --- */
      { n:'title', k:'mine', only:[APP, APPH],
        w:{ en:'The root component’s own signal, read by its own template. The <code>&lt;title&gt;</code> tag in <code>index.html</code> is the browser’s and has nothing to do with it.',
            ar:'الـ signal بتاعة الـ component الرئيسي، والتمبلت بتاعه بيقراها. تاج <code>&lt;title&gt;</code> اللي في <code>index.html</code> بتاع المتصفح وملوش أي علاقة بيها.' } },
      { n:'MyShop', k:'mine',
        w:{ en:'The text of the browser tab. Only <code>index.html</code> has it; change it freely.',
            ar:'الكلام اللي بيظهر على تاب المتصفح. موجود في <code>index.html</code> بس؛ غيّره براحتك.' } },
      { n:'err', k:'mine',
        w:{ en:'The name you give the error inside the arrow function. Any name works.',
            ar:'الاسم اللي بتدّيه للـ error جوه الـ arrow function. أي اسم ينفع.' } },

      /* --- Angular's, TypeScript's, the browser's --- */
      { n:'bootstrapApplication', k:'ng',
        w:{ en:'Angular’s function that starts the app from one root component.',
            ar:'الـ function بتاعة أنجولار اللي بتشغّل التطبيق من component رئيسي واحد.' } },
      { n:'ApplicationConfig', k:'ng',
        w:{ en:'Angular’s type for the settings object. The variable name on its left is yours.',
            ar:'الـ type بتاع أنجولار لأوبجكت الإعدادات. اسم المتغير اللي على شماله بس هو بتاعك.' } },
      { n:'providers', k:'ng',
        w:{ en:'An option key Angular reads: the list of app-wide features.',
            ar:'مفتاح إعداد أنجولار بيقراه: ليستة المميزات اللي على مستوى التطبيق كله.' } },
      { n:'provideBrowserGlobalErrorListeners', k:'ng',
        w:{ en:'An Angular function that reports errors the browser catches.',
            ar:'function من أنجولار بتبلّغ عن الأخطاء اللي المتصفح بيمسكها.' } },
      { n:'provideZonelessChangeDetection', k:'ng',
        w:{ en:'An Angular function that switches on change detection without zone.js.',
            ar:'function من أنجولار بتشغّل الـ change detection من غير zone.js.' } },
      { n:'provideRouter', k:'ng',
        w:{ en:'An Angular function that switches the router on, with your routes.',
            ar:'function من أنجولار بتشغّل الـ router بالـ routes بتاعتك.' } },
      { n:'Routes', k:'ng',
        w:{ en:'Angular’s type for a routes array.', ar:'الـ type بتاع أنجولار لـ array الـ routes.' } },
      { n:'@Component', k:'ng',
        w:{ en:'Angular’s decorator: the label that turns a class into a component.',
            ar:'الـ decorator بتاع أنجولار: اللافتة اللي بتحوّل الكلاس لـ component.' } },
      { n:'selector', k:'ng',
        w:{ en:'An option key Angular reads. The tag name you give it is yours.',
            ar:'مفتاح إعداد أنجولار بيقراه. اسم التاج اللي بتحطه فيه بتاعك.' } },
      { n:'imports', k:'ng',
        w:{ en:'An option key Angular reads: what this component’s template may use.',
            ar:'مفتاح إعداد أنجولار بيقراه: الحاجات اللي التمبلت بتاع الـ component ده مسموح له يستخدمها.' } },
      { n:'templateUrl', k:'ng',
        w:{ en:'An option key Angular reads. The path after it must match the real file name.',
            ar:'مفتاح إعداد أنجولار بيقراه. المسار اللي بعده لازم يبقى زي اسم الملف الحقيقي.' } },
      { n:'styleUrl', k:'ng',
        w:{ en:'An option key Angular reads, for the component’s CSS file.',
            ar:'مفتاح إعداد أنجولار بيقراه، لملف الـ CSS بتاع الـ component.' } },
      { n:'RouterOutlet', k:'ng',
        w:{ en:'Angular’s router class. Listing it in <code>imports</code> is what makes the <code>&lt;router-outlet&gt;</code> tag work.',
            ar:'كلاس الـ router بتاع أنجولار. لما تحطه في <code>imports</code> التاج <code>&lt;router-outlet&gt;</code> بيشتغل.' } },
      { n:'router-outlet', k:'ng',
        w:{ en:'Angular’s tag: the spot where the router shows the current page.',
            ar:'تاج أنجولار: المكان اللي الـ router بيعرض فيه الصفحة الحالية.' } },
      { n:'signal', k:'ng',
        w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
      { n:'catch', k:'ng',
        w:{ en:'JavaScript’s Promise method: runs if starting the app fails.',
            ar:'ميثود الـ Promise بتاعة JavaScript: بتشتغل لو تشغيل التطبيق فشل.' } },
      { n:'console.error', k:'ng',
        w:{ en:'The browser’s way to print an error in the console.', ar:'طريقة المتصفح إنه يطبع error في الـ console.' } },
      { n:'base', k:'ng', re:'(?<=<)base(?= )', only:['html'],
        w:{ en:'An HTML tag. <code>&lt;base href="/"&gt;</code> tells the browser where relative URLs start; the router and the script tags rely on it.',
            ar:'تاج HTML. <code>&lt;base href="/"&gt;</code> بيقول للمتصفح الروابط النسبية بتبدأ منين؛ والـ router وتاجات الـ script معتمدين عليه.' } },
      { n:'browser', k:'ng', only:['json'], re:'(?<=")browser(?=")',
        w:{ en:'An option key in <code>angular.json</code>: which file starts the app.',
            ar:'مفتاح إعداد في <code>angular.json</code>: أنهي ملف بيشغّل التطبيق.' } },
      { n:'platformBrowserDynamic', k:'ng',
        w:{ en:'The older way to start an NgModule app.', ar:'الطريقة القديمة لتشغيل تطبيق مبني على NgModule.' } },
      { n:'bootstrapModule', k:'ng',
        w:{ en:'The older method that starts the app from a module.', ar:'الميثود القديمة اللي بتشغّل التطبيق من module.' } },
      { n:'@NgModule', k:'ng',
        w:{ en:'The older decorator for a module.', ar:'الـ decorator القديم بتاع الـ module.' } },
      { n:'declarations', k:'ng',
        w:{ en:'An NgModule key: the components that belong to the module.', ar:'مفتاح في الـ NgModule: الـ components اللي تبع الـ module ده.' } },
      { n:'bootstrap', k:'ng',
        w:{ en:'An NgModule key: which component to put in the page first.', ar:'مفتاح في الـ NgModule: أنهي component يتحط في الصفحة الأول.' } },
      { n:'BrowserModule', k:'ng',
        w:{ en:'Angular’s module that the older root module had to import.', ar:'الـ module بتاع أنجولار اللي الـ module الرئيسي القديم كان لازم يعمله import.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One page load, five stops', ar: 'تحميل صفحة واحد، خمس محطات' },
    lead: {
      en: 'You type <code>localhost:4200</code> and press Enter. A second later your app is on the screen. In between, five files hand the job to each other, and each hand-over happens <b>by name</b>. Follow it:',
      ar: 'بتكتب <code>localhost:4200</code> وتدوس Enter. بعد ثانية التطبيق بتاعك قدامك على الشاشة. في النص، خمس ملفات بيسلّموا الشغلانة لبعض، وكل تسليمة بتحصل <b>بالاسم</b>. امشي وراها:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: IDX, lang: 'html', who: { en: 'the browser · loads', ar: 'المتصفح · بيحمّل' },
          code: ['<body>', '  <app-root></app-root>', '</body>'],
          say: { en: `The browser gets this page and shows… nothing. ${pub('app-root')} is an empty tag with a name you chose. It is a placeholder: <i>“the app goes here”</i>. The build also slips a <code>&lt;script&gt;</code> tag in, and you never write that one.`,
                 ar: `المتصفح بياخد الصفحة دي ويعرض… ولا حاجة. ${pub('app-root')} تاج فاضي باسم انت اللي اخترته. ده مكان محجوز: <i>«التطبيق هيتحط هنا»</i>. والـ build بيزوّد تاج <code>&lt;script&gt;</code> من عنده، وده عمرك ما بتكتبه.` } },
        { file: MAIN, lang: 'ts', who: { en: 'your code · first line', ar: 'كودك · أول سطر' },
          code: ['bootstrapApplication(App, appConfig)', '  .catch((err) => console.error(err));'],
          say: { en: `That script runs <code>main.ts</code>. ${ng('bootstrapApplication')} is Angular’s. The two names inside the brackets are yours, and <b>both are imported</b> from other files: ${pub('App')} is the first component, ${pub('appConfig')} is the settings.`,
                 ar: `السكريبت ده بيشغّل <code>main.ts</code>. ${ng('bootstrapApplication')} بتاعة أنجولار. والاسمين اللي جوه القوسين بتوعك، و<b>الاتنين جايين بـ import</b> من ملفات تانية: ${pub('App')} هو أول component، و${pub('appConfig')} هو الإعدادات.` } },
        { file: CFG, lang: 'ts', who: { en: 'settings · switched on', ar: 'الإعدادات · بتتفتح' },
          code: ['export const appConfig: ApplicationConfig = {', '  providers: [provideRouter(routes)],', '};'],
          say: { en: `Here ${pub('appConfig')} is born. The name is yours; ${ng('ApplicationConfig')} and ${ng('providers')} are Angular’s and must be typed exactly. Every <code>provide…()</code> in that array switches on a feature for the whole app. ${pub('routes')} comes from yet another file.`,
                 ar: `هنا ${pub('appConfig')} بيتولد. الاسم بتاعك؛ لكن ${ng('ApplicationConfig')} و${ng('providers')} بتوع أنجولار ولازم يتكتبوا بالظبط. كل <code>provide…()</code> في الـ array دي بتفتح ميزة للتطبيق كله. و${pub('routes')} جاية من ملف تالت.` } },
        { file: APP, lang: 'ts', who: { en: 'first component · answers', ar: 'أول component · بيرد' },
          code: ['@Component({', "  selector: 'app-root',", '  imports: [RouterOutlet],', "  templateUrl: './app.html',", '})', 'export class App {', "  protected readonly title = signal('my-shop');", '}'],
          say: { en: `Angular now looks inside ${pub('App')} and reads its ${ng('selector')}: ${pub('app-root')}. That string is the whole link back to <code>index.html</code>. Angular searches the page for that tag, and finds it.`,
                 ar: `أنجولار دلوقتي بيبص جوه ${pub('App')} ويقرا الـ ${ng('selector')} بتاعه: ${pub('app-root')}. النص ده هو الرابط الوحيد اللي بيرجّعك لـ <code>index.html</code>. أنجولار بيدوّر في الصفحة على التاج ده، ويلاقيه.` } },
        { file: APPH, lang: 'html', who: { en: 'first component · draws', ar: 'أول component · بيرسم' },
          code: ['<h1>{{ title() }}</h1>', '', '<router-outlet />'],
          say: { en: `The template is drawn <b>inside</b> <code>&lt;app-root&gt;</code>, and the page appears. ${mine('title')} is the component’s own signal. ${ng('router-outlet')} is Angular’s tag, and it only works because ${ng('RouterOutlet')} is in ${ng('imports')}.`,
                 ar: `التمبلت بيترسم <b>جوه</b> <code>&lt;app-root&gt;</code>، والصفحة بتظهر. ${mine('title')} الـ signal بتاعة الـ component نفسه. و${ng('router-outlet')} تاج أنجولار، وبيشتغل بس عشان ${ng('RouterOutlet')} موجود في ${ng('imports')}.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: '<code>index.html</code> has <code>&lt;app-root&gt;</code>. <code>main.ts</code> says <code>bootstrapApplication(App, appConfig)</code>. <code>App</code> says <code>selector: \'app-root\'</code>. Four names of yours carry the whole start-up: <b>app-root</b>, <b>App</b>, <b>appConfig</b>, <b>routes</b>. Everything else is Angular’s.',
        ar: '<code>index.html</code> فيه <code>&lt;app-root&gt;</code>. و<code>main.ts</code> بيقول <code>bootstrapApplication(App, appConfig)</code>. و<code>App</code> بيقول <code>selector: \'app-root\'</code>. أربع أسماء بتوعك شايلين التشغيل كله: <b>app-root</b> و<b>App</b> و<b>appConfig</b> و<b>routes</b>. وكل حاجة تانية بتاعة أنجولار.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Which file?', ar: 'أنهي ملف؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'The CLI wrote all of these for you once. After that, each piece has one home, and each name was picked by exactly one side.',
      ar: 'الـ CLI كتبلك كل دول مرة واحدة. بعد كده، كل حتة ليها بيت واحد، وكل اسم اختارته ناحية واحدة بس.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>&lt;app-root&gt;&lt;/app-root&gt;</code>', '<code>index.html</code>', 'the CLI, once', `you pick ${pub('app-root')}, and it must equal the root selector`],
            ar: ['<code>&lt;app-root&gt;&lt;/app-root&gt;</code>', '<code>index.html</code>', 'الـ CLI، مرة واحدة', `انت بتختار ${pub('app-root')}، ولازم يبقى زي الـ selector الرئيسي`] },
          { en: ['<code>&lt;script src="main-….js"&gt;</code>', 'the built <code>index.html</code>', 'the build, every time', 'the build. Never write it yourself'],
            ar: ['<code>&lt;script src="main-….js"&gt;</code>', '<code>index.html</code> بعد الـ build', 'الـ build، كل مرة', 'الـ build. عمرك ما تكتبه بإيدك'] },
          { en: ['<code>bootstrapApplication(App, appConfig)</code>', '<code>main.ts</code>', 'the CLI, once', `${ng('bootstrapApplication')} is Angular’s; ${pub('App')} and ${pub('appConfig')} are named in their own files`],
            ar: ['<code>bootstrapApplication(App, appConfig)</code>', '<code>main.ts</code>', 'الـ CLI، مرة واحدة', `${ng('bootstrapApplication')} بتاعة أنجولار؛ و${pub('App')} و${pub('appConfig')} اسمهم بيتحدد في ملفاتهم`] },
          { en: ['<code>export const appConfig = { providers: […] }</code>', '<code>app.config.ts</code>', 'you, whenever you add a feature', `you pick ${pub('appConfig')}; ${ng('providers')} and every <code>provide…()</code> are Angular’s`],
            ar: ['<code>export const appConfig = { providers: […] }</code>', '<code>app.config.ts</code>', 'انت، كل ما تضيف ميزة', `انت بتختار ${pub('appConfig')}؛ و${ng('providers')} وكل <code>provide…()</code> بتوع أنجولار`] },
          { en: ['<code>export const routes: Routes = []</code>', '<code>app.routes.ts</code>', 'you, for every page', `you pick ${pub('routes')}; ${ng('Routes')} is Angular’s`],
            ar: ['<code>export const routes: Routes = []</code>', '<code>app.routes.ts</code>', 'انت، مع كل صفحة', `انت بتختار ${pub('routes')}؛ و${ng('Routes')} بتاع أنجولار`] },
          { en: [`<code>selector: 'app-root'</code> and <code>class App</code>`, '<code>app.ts</code>', 'the CLI, then you', `you pick both ${pub('app-root')} and ${pub('App')}; ${ng('selector')} is Angular’s`],
            ar: [`<code>selector: 'app-root'</code> و<code>class App</code>`, '<code>app.ts</code>', 'الـ CLI، وبعدين انت', `انت بتختار ${pub('app-root')} و${pub('App')} الاتنين؛ و${ng('selector')} بتاع أنجولار`] },
          { en: ['<code>title = signal(…)</code>', '<code>app.ts</code>, read in <code>app.html</code>', 'you', `you pick ${mine('title')}; only this component uses it`],
            ar: ['<code>title = signal(…)</code>', '<code>app.ts</code>، وبيتقري في <code>app.html</code>', 'انت', `انت بتختار ${mine('title')}؛ والـ component ده بس اللي بيستخدمه`] },
        ] },
      { t: 'ul',
        en: ['<b><code>main.ts</code> invents nothing.</b> Every name in it is either Angular’s or imported from another file. So a rename never starts in <code>main.ts</code>; it starts in the file that exports the name, and <code>main.ts</code> follows.',
             '<b><code>index.html</code> knows exactly one of your names:</b> the root selector. It does not know your class, your config or your routes. That tag is its only link to Angular.',
             '<b>App-wide goes in <code>providers</code>, template-only goes in <code>imports</code>.</b> A <code>provide…()</code> function in <code>appConfig</code> is on for the whole app. A class in a component’s <code>imports</code> is only usable in that one template.'],
        ar: ['<b><code>main.ts</code> مش بيألّف أي اسم.</b> كل اسم فيه يا إما بتاع أنجولار يا إما جاي بـ import من ملف تاني. فأي تغيير اسم عمره ما بيبدأ من <code>main.ts</code>؛ بيبدأ من الملف اللي عامل export للاسم، و<code>main.ts</code> بيمشي وراه.',
             '<b><code>index.html</code> يعرف اسم واحد بس من أسماءك:</b> الـ selector الرئيسي. ميعرفش الكلاس ولا الإعدادات ولا الـ routes. التاج ده هو الرابط الوحيد بينه وبين أنجولار.',
             '<b>اللي للتطبيق كله يتحط في <code>providers</code>، واللي للتمبلت بس يتحط في <code>imports</code>.</b> أي <code>provide…()</code> في <code>appConfig</code> شغالة للتطبيق كله. وأي كلاس في <code>imports</code> بتاعة component بيتستخدم في التمبلت ده بس.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All six files, every name coloured', ar: 'الست ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'This is what <code>ng new my-shop</code> gives you, complete. Hover a coloured name to light up everywhere else it appears. Then press <b>Rename test</b>: every name you own turns into a made-up word, Angular’s words stay put, and the app still starts.',
      ar: 'ده اللي <code>ng new my-shop</code> بيدّيهولك، كامل. قف بالماوس على أي اسم ملوّن وهتنوّر كل الأماكن التانية اللي هو فيها. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: كل اسم بتاعك هيبقى كلمة عشوائية، وكلمات أنجولار هتفضل مكانها، والتطبيق لسه بيشتغل.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: IDX, lang: 'html', tag: { en: 'the only page', ar: 'الصفحة الوحيدة' }, code: [
        '<!doctype html>',
        '<html lang="en">',
        '<head>',
        '  <meta charset="utf-8">',
        '  <title>MyShop</title>',
        '  <base href="/">',
        '  <meta name="viewport" content="width=device-width, initial-scale=1">',
        '</head>',
        '<body>',
        '  <app-root></app-root>',
        '</body>',
        '</html>' ] },
      { t: 'code', name: MAIN, lang: 'ts', tag: { en: 'the ignition', ar: 'مفتاح التشغيل' }, code: [
        "import { bootstrapApplication } from '@angular/platform-browser';",
        "import { appConfig } from './app/app.config';",
        "import { App } from './app/app';",
        '',
        'bootstrapApplication(App, appConfig)',
        '  .catch((err) => console.error(err));' ] },
      { t: 'code', name: CFG, lang: 'ts', tag: { en: 'app-wide settings', ar: 'إعدادات التطبيق كله' }, code: [
        'import {',
        '  ApplicationConfig,',
        '  provideBrowserGlobalErrorListeners,',
        '  provideZonelessChangeDetection,',
        "} from '@angular/core';",
        "import { provideRouter } from '@angular/router';",
        "import { routes } from './app.routes';",
        '',
        'export const appConfig: ApplicationConfig = {',
        '  providers: [',
        '    provideBrowserGlobalErrorListeners(),',
        '    provideZonelessChangeDetection(),',
        '    provideRouter(routes),',
        '  ],',
        '};' ] },
      { t: 'code', name: RTS, lang: 'ts', tag: { en: 'the pages, empty for now', ar: 'الصفحات، فاضية دلوقتي' }, code: [
        "import { Routes } from '@angular/router';",
        '',
        'export const routes: Routes = [];' ] },
      { t: 'code', name: APP, lang: 'ts', tag: { en: 'the first component', ar: 'أول component' }, code: [
        "import { Component, signal } from '@angular/core';",
        "import { RouterOutlet } from '@angular/router';",
        '',
        '@Component({',
        "  selector: 'app-root',",
        '  imports: [RouterOutlet],',
        "  templateUrl: './app.html',",
        "  styleUrl: './app.css',",
        '})',
        'export class App {',
        "  protected readonly title = signal('my-shop');",
        '}' ] },
      { t: 'code', name: APPH, lang: 'html', tag: { en: 'what you see', ar: 'اللي بتشوفه' }, code: [
        '<h1>{{ title() }}</h1>',
        '',
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
      en: 'Every name you own can be renamed. Most mistakes stop the build with a red error in the terminal, which is the good case. One does not: the root selector. The terminal stays happy and the page stays blank.',
      ar: 'أي اسم بتاعك ينفع يتغير. أغلب الغلطات بتوقف الـ build بـ error أحمر في الترمينال، ودي الحالة الكويسة. غلطة واحدة لأ: الـ selector الرئيسي. الترمينال بيفضل مبسوط والصفحة بتفضل فاضية.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [pub('app-root') + ' (the selector)', 'the tag in <code>index.html</code>', '<b>The build passes.</b> The page is blank, and only the <b>browser console</b> says: <i>The selector "…" did not match any elements</i>.'],
            ar: [pub('app-root') + ' (الـ selector)', 'التاج في <code>index.html</code>', '<b>الـ build بيعدّي.</b> الصفحة فاضية، والـ <b>console بتاع المتصفح</b> بس هو اللي بيقول: <i>The selector "…" did not match any elements</i>.'] },
          { en: [pub('App') + ' (the class)', 'the <code>import</code> line and the call in <code>main.ts</code>', 'Compile error in <code>main.ts</code>.'],
            ar: [pub('App') + ' (الكلاس)', 'سطر الـ <code>import</code> والنداء في <code>main.ts</code>', 'Compile error في <code>main.ts</code>.'] },
          { en: [pub('appConfig'), 'the <code>import</code> line and the call in <code>main.ts</code>', 'Compile error in <code>main.ts</code>.'],
            ar: [pub('appConfig'), 'سطر الـ <code>import</code> والنداء في <code>main.ts</code>', 'Compile error في <code>main.ts</code>.'] },
          { en: [pub('routes'), 'the <code>import</code> line and <code>provideRouter(routes)</code> in <code>app.config.ts</code>', 'Compile error in <code>app.config.ts</code>.'],
            ar: [pub('routes'), 'سطر الـ <code>import</code> و<code>provideRouter(routes)</code> في <code>app.config.ts</code>', 'Compile error في <code>app.config.ts</code>.'] },
          { en: [mine('title') + ' (the signal)', '<code>{{ title() }}</code> in <code>app.html</code>', 'Compile error in the template.'],
            ar: [mine('title') + ' (الـ signal)', '<code>{{ title() }}</code> في <code>app.html</code>', 'Compile error في التمبلت.'] },
          { en: [mine('err'), 'the same arrow function', 'Compile error on that line.'],
            ar: [mine('err'), 'نفس الـ arrow function', 'Compile error في السطر ده.'] },
          { en: [mine('MyShop'), 'nothing', 'Nothing to forget. Only the browser tab changes.'],
            ar: [mine('MyShop'), 'ولا حاجة', 'مفيش حاجة تنساها. تاب المتصفح بس اللي بيتغير.'] },
          { en: ['a file name, e.g. <code>app.html</code>', 'the path that points at it: <code>templateUrl</code>, or the <code>import</code> path', 'Compile error: the file cannot be found.'],
            ar: ['اسم ملف، زي <code>app.html</code>', 'المسار اللي بيشاور عليه: <code>templateUrl</code>، أو مسار الـ <code>import</code>', 'Compile error: الملف مش لاقيه.'] },
          { en: [`${ng('bootstrapApplication')}, ${ng('providers')}, ${ng('selector')}, ${ng('RouterOutlet')}`, 'nothing: you cannot rename these', 'They are Angular’s words.'],
            ar: [`${ng('bootstrapApplication')} و${ng('providers')} و${ng('selector')} و${ng('RouterOutlet')}`, 'ولا حاجة: دول مينفعش يتغيروا', 'دي كلمات أنجولار.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b> in the bar above the files. <code>app-root</code> changes in <code>index.html</code> and in <code>app.ts</code> at the same time; <code>App</code> and <code>appConfig</code> change in their file and in <code>main.ts</code> at the same time. That is exactly what a correct rename looks like.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b> في الشريط اللي فوق الملفات. <code>app-root</code> بيتغير في <code>index.html</code> وفي <code>app.ts</code> في نفس الوقت؛ و<code>App</code> و<code>appConfig</code> بيتغيروا في ملفهم وفي <code>main.ts</code> في نفس الوقت. وده بالظبط شكل التغيير الصح.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتوعك' },
    title: { en: 'The fixed names, and whose they are', ar: 'الأسماء الثابتة، وبتوع مين' },
    lead: {
      en: 'Blue names are words somebody else defined. You type them exactly, or the thing that reads them does not recognise them. In these files there are three owners.',
      ar: 'الأسماء الزرقا كلمات حد تاني هو اللي عرّفها. بتكتبها بالظبط، وإلا اللي بيقراها مش هيعرفها. في الملفات دي فيه تلات أصحاب.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Owner', 'Names', 'What that means for you'],
                ar: ['صاحبها', 'الأسماء', 'ده معناه إيه بالنسبة لك'] },
        rows: [
          { en: ['<b>The browser</b> (HTML)', `<code>&lt;!doctype&gt;</code>, <code>&lt;title&gt;</code>, ${ng('base')}, <code>href</code>, <code>&lt;meta&gt;</code>`, 'Standard HTML. <code>index.html</code> is a normal web page; only the <code>&lt;app-root&gt;</code> tag inside it is yours.'],
            ar: ['<b>المتصفح</b> (HTML)', `<code>&lt;!doctype&gt;</code> و<code>&lt;title&gt;</code> و${ng('base')} و<code>href</code> و<code>&lt;meta&gt;</code>`, 'HTML عادي. <code>index.html</code> صفحة ويب عادية؛ التاج <code>&lt;app-root&gt;</code> اللي جواها بس هو بتاعك.'] },
          { en: ['<b>Angular</b>', `${ng('bootstrapApplication')}, ${ng('ApplicationConfig')}, ${ng('providers')}, ${ng('provideRouter')}, ${ng('Routes')}, ${ng('@Component')}, ${ng('selector')}, ${ng('imports')}, ${ng('templateUrl')}, ${ng('signal')}`, 'Imported from <code>@angular/…</code>. Autocomplete writes them for you; a typo is a compile error.'],
            ar: ['<b>أنجولار</b>', `${ng('bootstrapApplication')} و${ng('ApplicationConfig')} و${ng('providers')} و${ng('provideRouter')} و${ng('Routes')} و${ng('@Component')} و${ng('selector')} و${ng('imports')} و${ng('templateUrl')} و${ng('signal')}`, 'جايين بـ import من <code>@angular/…</code>. الـ autocomplete بيكتبهم لك؛ وأي غلطة إملائية compile error.'] },
          { en: ['<b>JavaScript</b>', `${ng('catch')}, ${ng('console.error')}`, 'Plain JavaScript that has nothing to do with Angular.'],
            ar: ['<b>JavaScript</b>', `${ng('catch')} و${ng('console.error')}`, 'JavaScript عادي ملوش علاقة بأنجولار.'] },
        ] },
      { t: 'p',
        en: `Look at ${ng('RouterOutlet')} and ${ng('router-outlet')}. It is the same pattern as your own ${pub('App')} and ${pub('app-root')}: <b>a class you list in <code>imports</code>, and a selector you type as a tag.</b> The only difference is that Angular picked both of those names, so you type them exactly.`,
        ar: `بص على ${ng('RouterOutlet')} و${ng('router-outlet')}. ده نفس شكل ${pub('App')} و${pub('app-root')} بتوعك بالظبط: <b>كلاس بتحطه في <code>imports</code>، وselector بتكتبه كتاج.</b> الفرق الوحيد إن أنجولار هو اللي اختار الاسمين دول، فبتكتبهم زي ما هما.` },
      { t: 'note', label: { en: 'Two titles, no relation', ar: 'اتنين title، ملهمش علاقة ببعض' },
        en: `The <code>&lt;title&gt;</code> tag in <code>index.html</code> is the browser’s: it is the text on the tab, here ${mine('MyShop')}. The ${mine('title')} signal in <code>app.ts</code> is yours: it is printed in the <code>&lt;h1&gt;</code>. They share a word by coincidence. Changing one never changes the other.`,
        ar: `تاج <code>&lt;title&gt;</code> اللي في <code>index.html</code> بتاع المتصفح: ده الكلام اللي على التاب، هنا ${mine('MyShop')}. والـ signal ${mine('title')} اللي في <code>app.ts</code> بتاعتك: بتتطبع في الـ <code>&lt;h1&gt;</code>. الاتنين شبه بعض في الاسم بالصدفة. تغيير واحد عمره ما بيغيّر التاني.` }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names here', ar: 'تختار أسماء كويسة هنا إزاي' },
    lead: {
      en: 'In the startup files the best habit is mostly <b>leave the CLI’s names alone</b>. Every tutorial and every teammate expects them.',
      ar: 'في ملفات التشغيل أحسن عادة غالبًا هي <b>سيب أسماء الـ CLI زي ما هي</b>. كل شرح وكل زميل في الفريق متوقعهم.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['the root selector', '<code>app-root</code>', '<code>root</code>, <code>main</code>, <code>app</code>', 'Everybody recognises <code>app-root</code>. A prefix with a dash also keeps your tags apart from real HTML tags.'],
            ar: ['الـ selector الرئيسي', '<code>app-root</code>', '<code>root</code>، <code>main</code>، <code>app</code>', 'الكل عارف <code>app-root</code>. والبادئة اللي فيها شَرطة بتخلي التاجات بتاعتك بعيدة عن تاجات HTML الحقيقية.'] },
          { en: ['the root class', '<code>App</code> (new projects) or <code>AppComponent</code> (older ones)', 'mixing both styles in one project', 'Recent CLI versions generate <code>App</code> in <code>app.ts</code>. Older ones generated <code>AppComponent</code> in <code>app.component.ts</code>. Both are correct; pick the one your project already uses.'],
            ar: ['الكلاس الرئيسي', '<code>App</code> (المشاريع الجديدة) أو <code>AppComponent</code> (القديمة)', 'إنك تخلط الأسلوبين في مشروع واحد', 'إصدارات الـ CLI الجديدة بتولّد <code>App</code> في <code>app.ts</code>. والقديمة كانت بتولّد <code>AppComponent</code> في <code>app.component.ts</code>. الاتنين صح؛ امشي على اللي مشروعك ماشي عليه.'] },
          { en: ['the settings object', '<code>appConfig</code>', '<code>config</code>, <code>settings</code>', 'Short, but everyone knows where <code>appConfig</code> lives. A vague name is hard to search for.'],
            ar: ['أوبجكت الإعدادات', '<code>appConfig</code>', '<code>config</code>، <code>settings</code>', 'قصير، والكل عارف <code>appConfig</code> عايش فين. والاسم الغامض صعب تدوّر عليه.'] },
          { en: ['the routes array', '<code>routes</code> in <code>app.routes.ts</code>', 'defining routes inside <code>app.config.ts</code>', 'One file per job. You will edit routes constantly, and the config almost never.'],
            ar: ['array الـ routes', '<code>routes</code> في <code>app.routes.ts</code>', 'إنك تعرّف الـ routes جوه <code>app.config.ts</code>', 'ملف لكل شغلانة. هتعدّل الـ routes على طول، والإعدادات تقريبًا أبدًا.'] },
          { en: ['the error parameter', '<code>err</code>, <code>error</code>, <code>e</code>', '—', 'An ordinary arrow-function parameter. Anything works.'],
            ar: ['الـ parameter بتاع الـ error', '<code>err</code>، <code>error</code>، <code>e</code>', '—', 'parameter عادي في arrow function. أي اسم ينفع.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Names that look free but are not', ar: 'أسماء شكلها براحتك بس هي مش كده' },
    lead: {
      en: 'Some names in these files look like the CLI’s choice, but a setting somewhere else points at them.',
      ar: 'فيه أسماء في الملفات دي شكلها اختيار الـ CLI، بس فيه إعداد في مكان تاني بيشاور عليها.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'main.ts is named in angular.json', ar: 'main.ts اسمه مكتوب في angular.json' }, blocks: [
        { t: 'code', name: 'angular.json (a few lines of it)', lang: 'json', tag: { en: 'build settings', ar: 'إعدادات الـ build' }, code: [
          '"options": {',
          '  "browser": "src/main.ts",',
          '  "tsConfig": "tsconfig.app.json",',
          '  "styles": ["src/styles.css"]',
          '}' ] },
        { t: 'p',
          en: `The file that starts the app is whatever ${ng('browser')} points at. You <i>could</i> rename <code>main.ts</code>, but then you must change this line too, or the build stops because it cannot find the file. Nobody does this. Leave it as <code>main.ts</code>.`,
          ar: `الملف اللي بيشغّل التطبيق هو أي ملف ${ng('browser')} بيشاور عليه. <i>ممكن</i> تغيّر اسم <code>main.ts</code>، بس ساعتها لازم تغيّر السطر ده كمان، وإلا الـ build هيقف عشان مش لاقي الملف. محدش بيعمل كده. خليه <code>main.ts</code>.` }
      ]},
      { t: 'step', n: 'B', title: { en: 'The variable is free, its shape is not', ar: 'اسم المتغير براحتك، شكله لأ' }, blocks: [
        { t: 'p',
          en: `You can call ${pub('appConfig')} anything, as long as <code>main.ts</code> imports the new name. But the object must have the key ${ng('providers')}, spelled exactly, because that is the key ${ng('ApplicationConfig')} defines. <code>provider</code> or <code>Providers</code> is a compile error.`,
          ar: `تقدر تسمّي ${pub('appConfig')} أي اسم، طالما <code>main.ts</code> بيعمل import للاسم الجديد. بس الأوبجكت لازم يبقى فيه المفتاح ${ng('providers')}، مكتوب بالظبط، عشان ده المفتاح اللي ${ng('ApplicationConfig')} معرّفه. <code>provider</code> أو <code>Providers</code> يبقى compile error.` }
      ]},
      { t: 'step', n: 'C', title: { en: 'File names are a habit; paths are the rule', ar: 'أسماء الملفات عادة؛ المسارات هي القاعدة' }, blocks: [
        { t: 'p',
          en: 'Angular does not care that the files are called <code>app.ts</code>, <code>app.config.ts</code> or <code>app.routes.ts</code>. The <code>.config</code> and <code>.routes</code> parts are conventions. What must match is every <b>path</b> that points at a file: <code>\'./app/app\'</code> in <code>main.ts</code>, <code>\'./app.routes\'</code> in the config, <code>\'./app.html\'</code> in <code>templateUrl</code>. Paths leave out <code>.ts</code> in imports, but keep <code>.html</code> and <code>.css</code> in <code>templateUrl</code> and <code>styleUrl</code>.',
          ar: 'أنجولار ميفرقش معاه إن الملفات اسمها <code>app.ts</code> أو <code>app.config.ts</code> أو <code>app.routes.ts</code>. حتة <code>.config</code> و<code>.routes</code> دي عادات. اللي لازم يطابق هو كل <b>مسار</b> بيشاور على ملف: <code>\'./app/app\'</code> في <code>main.ts</code>، و<code>\'./app.routes\'</code> في الإعدادات، و<code>\'./app.html\'</code> في <code>templateUrl</code>. المسارات بتشيل <code>.ts</code> في الـ imports، بس بتسيب <code>.html</code> و<code>.css</code> في <code>templateUrl</code> و<code>styleUrl</code>.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: 'The old <code>AppModule</code> start-up', ar: 'التشغيل القديم بـ <code>AppModule</code>' },
    lead: {
      en: 'Older projects and many tutorials start the app from a module instead of a component. Two of your names change (<code>AppModule</code>, <code>AppComponent</code>). The selector <code>app-root</code> and the tag in <code>index.html</code> are exactly the same.',
      ar: 'المشاريع الأقدم وشروحات كتير بتشغّل التطبيق من module بدل component. اسمين من أسماءك بيتغيروا (<code>AppModule</code> و<code>AppComponent</code>). لكن الـ selector <code>app-root</code> والتاج في <code>index.html</code> زي ما هما بالظبط.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'main.ts + app.module.ts — older style', lang: 'ts', code: [
          '// main.ts',
          'platformBrowserDynamic().bootstrapModule(AppModule)',
          '  .catch((err) => console.error(err));',
          '',
          '// app.module.ts',
          '@NgModule({',
          '  declarations: [AppComponent],',
          '  imports: [BrowserModule],',
          '  bootstrap: [AppComponent],',
          '})',
          'export class AppModule {}' ] },
        good: { name: 'main.ts — today', lang: 'ts', code: [
          'bootstrapApplication(App, appConfig)',
          '  .catch((err) => console.error(err));' ] } },
      { t: 'p',
        en: `In the old style, ${ng('bootstrap')} inside the module did the job that the first argument of ${ng('bootstrapApplication')} does today: it named the root component. The app-wide features that now go in ${ng('providers')} were then modules in ${ng('imports')}. If you open a project and see ${pub('AppModule')}, you are reading this older style.`,
        ar: `في الأسلوب القديم، ${ng('bootstrap')} اللي جوه الـ module كان بيعمل شغل أول argument في ${ng('bootstrapApplication')} النهارده: بيسمّي الـ component الرئيسي. والمميزات اللي على مستوى التطبيق، اللي بتتحط النهارده في ${ng('providers')}، كانت ساعتها modules في ${ng('imports')}. لو فتحت مشروع ولقيت ${pub('AppModule')}، يبقى انت بتقرا الأسلوب القديم ده.` }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'The terminal says nothing', ar: 'الترمينال مش بيقول حاجة' },
    title: { en: 'Mistakes that fail silently', ar: 'غلطات بتفشل في صمت' },
    lead: {
      en: 'Start-up mistakes are sneaky because the build usually passes. The problem only shows up in the browser, and often only in the browser console.',
      ar: 'غلطات التشغيل خبيثة عشان الـ build غالبًا بيعدّي. المشكلة بتظهر في المتصفح بس، وكتير في الـ console بتاع المتصفح بس.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'The selector and the tag disagree', ar: 'الـ selector والتاج مش زي بعض' }, blocks: [
        { t: 'pair',
          bad:  { name: 'src/app/app.ts', lang: 'ts', code: ["  selector: 'app-shop',"] },
          good: { name: 'src/app/app.ts', lang: 'ts', code: ["  selector: 'app-root',"] } },
        { t: 'p', en: 'The terminal says everything compiled. The browser shows a white page. Only the browser console explains: <i>The selector "app-shop" did not match any elements</i>. If you rename the selector, rename the tag in <code>index.html</code> in the same minute.',
                  ar: 'الترمينال بيقول كل حاجة اتعملت compile. والمتصفح بيوريك صفحة بيضا. الـ console بتاع المتصفح بس هو اللي بيشرح: <i>The selector "app-shop" did not match any elements</i>. لو غيّرت الـ selector، غيّر التاج في <code>index.html</code> في نفس الدقيقة.' }
      ]},
      { t: 'step', n: '2', title: { en: 'A second component tag in index.html', ar: 'تاج component تاني في index.html' }, blocks: [
        { t: 'pair',
          bad:  { name: 'src/index.html', lang: 'html', code: [
            '<body>',
            '  <app-header></app-header>',
            '  <app-root></app-root>',
            '</body>' ] },
          good: { name: 'src/app/app.html', lang: 'html', code: [
            '<app-header />',
            '<h1>{{ title() }}</h1>',
            '<router-outlet />' ] } },
        { t: 'p', en: 'Angular only fills the <b>one</b> tag that matches the root selector. Any other tag in <code>index.html</code> is left alone, as an empty unknown element. No error. Put every other component inside the root component’s template, and add its class to <code>imports</code>.',
                  ar: 'أنجولار بيملا تاج <b>واحد</b> بس، اللي بيطابق الـ selector الرئيسي. أي تاج تاني في <code>index.html</code> بيتساب زي ما هو، عنصر فاضي مجهول. من غير أي error. حط أي component تاني جوه تمبلت الـ component الرئيسي، وضيف الكلاس بتاعه في <code>imports</code>.' }
      ]},
      { t: 'step', n: '3', title: { en: 'Changing the wrong title', ar: 'إنك تغيّر الـ title الغلط' }, blocks: [
        { t: 'pair',
          bad:  { name: 'src/app/app.ts', lang: 'ts', code: ["  protected readonly title = signal('My Shop');   // tab unchanged"] },
          good: { name: 'src/index.html', lang: 'html', code: ['  <title>My Shop</title>'] } },
        { t: 'p', en: 'The signal is only a property that happens to be called <code>title</code>. Angular never connects it to the browser tab. The tab text lives in <code>index.html</code>. For a tab title that changes per page, routes have their own <code>title</code> option.',
                  ar: 'الـ signal دي مجرد property صادف إن اسمها <code>title</code>. أنجولار عمره ما بيربطها بتاب المتصفح. كلام التاب عايش في <code>index.html</code>. ولو عايز title للتاب بيتغير مع كل صفحة، الـ routes ليها option <code>title</code> خاص بيها.' }
      ]},
      { t: 'step', n: '4', title: { en: 'Deleting the base tag', ar: 'إنك تمسح تاج الـ base' }, blocks: [
        { t: 'pair',
          bad:  { name: 'src/index.html', lang: 'html', code: ['<head>', '  <title>MyShop</title>', '</head>'] },
          good: { name: 'src/index.html', lang: 'html', code: ['<head>', '  <title>MyShop</title>', '  <base href="/">', '</head>'] } },
        { t: 'p', en: 'It looks like boilerplate, so people delete it. The home page may still work. But the router and the script tags use it to work out URLs, so deeper links, or a reload on a URL like <code>/products/5</code>, can break in confusing ways. Keep it.',
                  ar: 'شكله كود زيادة، فالناس بتمسحه. الصفحة الرئيسية ممكن تفضل شغالة. بس الـ router وتاجات الـ script بيستخدموه عشان يحسبوا الـ URLs، فاللينكات الأعمق، أو إنك تعمل reload على URL زي <code>/products/5</code>، ممكن يبوظوا بطرق ملخبطة. سيبه.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When nothing shows up', ar: 'لما مفيش حاجة بتظهر' },
    title: { en: 'Six questions, in this order', ar: 'ست أسئلة، بالترتيب ده' },
    lead: {
      en: 'Blank page? Ask these before anything else. One of them is almost always the answer.',
      ar: 'صفحة فاضية؟ اسأل الأسئلة دي قبل أي حاجة. واحد منهم تقريبًا دايمًا هو الإجابة.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Did you open the <b>browser console</b>, not just the terminal? Start-up errors are printed there.',
                  ar: '<b>1.</b> فتحت الـ <b>console بتاع المتصفح</b>، مش الترمينال بس؟ أخطاء التشغيل بتتطبع هناك.' },
      { t: 'chk', en: '<b>2.</b> Is the tag in <code>index.html</code> spelled exactly like the root component’s <code>selector</code>?',
                  ar: '<b>2.</b> التاج اللي في <code>index.html</code> مكتوب بالظبط زي الـ <code>selector</code> بتاع الـ component الرئيسي؟' },
      { t: 'chk', en: '<b>3.</b> Does <code>main.ts</code> pass the class you think it does, and <code>appConfig</code>?',
                  ar: '<b>3.</b> <code>main.ts</code> بيبعت الكلاس اللي انت فاكره فعلًا، ومعاه <code>appConfig</code>؟' },
      { t: 'chk', en: '<b>4.</b> Is the feature you need switched on with a <code>provide…()</code> in <code>appConfig.providers</code>?',
                  ar: '<b>4.</b> الميزة اللي محتاجها متفتحة بـ <code>provide…()</code> في <code>appConfig.providers</code>؟' },
      { t: 'chk', en: '<b>5.</b> Is every tag in <code>app.html</code> backed by a class in <code>imports</code>, like <code>RouterOutlet</code> for <code>&lt;router-outlet&gt;</code>?',
                  ar: '<b>5.</b> كل تاج في <code>app.html</code> وراه كلاس في <code>imports</code>، زي <code>RouterOutlet</code> عشان <code>&lt;router-outlet&gt;</code>؟' },
      { t: 'chk', en: '<b>6.</b> Is <code>&lt;base href="/"&gt;</code> still in <code>index.html</code>?',
                  ar: '<b>6.</b> <code>&lt;base href="/"&gt;</code> لسه موجود في <code>index.html</code>؟' }
    ]
  }
  ]
};
