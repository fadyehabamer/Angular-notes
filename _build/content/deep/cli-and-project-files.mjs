/* ==================================================================
   The CLI's names, name by name — the deep dive after "The CLI, and
   what every file is for". One running example (my-shop, with a cart
   component and an about page) followed from the terminal to the
   screen, every name coloured by who owns it.
   Model: content/deep/inputs-outputs.mjs.
   ================================================================== */

/* a name in running text, coloured like the code and linked on hover */
const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

const TERM = 'terminal', OUT = 'what the CLI prints',
      CART = 'src/app/cart/cart.ts', CARTH = 'src/app/cart/cart.html', SPEC = 'src/app/cart/cart.spec.ts',
      APP = 'src/app/app.ts', APPH = 'src/app/app.html', RTS = 'src/app/app.routes.ts',
      CFG = 'src/app/app.config.ts', ABOUT = 'src/app/pages/about/about.ts';

export default {
  topic: 'cli-and-project-files',
  tab: 'ng generate, name by name — The Angular Signal',
  title: { en: '<code>ng generate</code>, name by name', ar: '<code>ng generate</code>، اسم اسم' },
  say: {
    en: 'The page for when you are not sure which part of a CLI command is yours. One word typed in the terminal followed into folders, file names, a class and a selector, every name coloured: <b>Angular’s</b>, <b>yours</b>, or <b>yours but shared</b>. Then what breaks when you rename each one.',
    ar: 'الصفحة دي للي مش متأكد أنهي حتة في أمر الـ CLI بتاعته. كلمة واحدة بتكتبها في الترمينال ماشيين وراها لحد الفولدرات وأسماء الملفات والكلاس والـ selector، وكل اسم ملوّن: <b>بتاع أنجولار</b>، ولا <b>بتاعك</b>، ولا <b>بتاعك بس متشارك</b>. وبعدين إيه اللي بيبوظ لما تغيّر كل واحد.'
  },
  lead: {
    en: 'The idea is simple: <b>you type one word, and the CLI writes the files for you.</b> The confusing part is the names. From <code>cart</code> you suddenly have a folder, four files, a class called <code>Cart</code> and a tag called <code>app-cart</code>, and nobody told you which of those you may change, which ones other files depend on, and what the CLI did <i>not</i> do for you. This page answers exactly that.',
    ar: 'الفكرة بسيطة: <b>بتكتب كلمة واحدة، والـ CLI بيكتبلك الملفات.</b> اللي بيلخبط هو الأسماء. من كلمة <code>cart</code> فجأة بقى عندك فولدر، وأربع ملفات، وكلاس اسمه <code>Cart</code>، وتاج اسمه <code>app-cart</code>، ومحدش قالك مين فيهم ينفع تغيّره، ومين الملفات التانية معتمدة عليه، والـ CLI <i>معملش</i> إيه. الصفحة دي بتجاوب على ده بالظبط.'
  },

  names: {
    note: {
      en: 'In <code>ng generate component cart</code>, only <code>cart</code> is yours. The CLI turns it into the folder, the file names, the class <code>Cart</code> and the selector <code>app-cart</code>. Other files then type all of those, which is why they are orange: a later rename touches every one.',
      ar: 'في <code>ng generate component cart</code>، <code>cart</code> بس هي بتاعتك. الـ CLI بيحوّلها للفولدر وأسماء الملفات والكلاس <code>Cart</code> والـ selector <code>app-cart</code>. وبعد كده ملفات تانية بتكتب كل دول، وعشان كده هما برتقاني: لو غيّرت الاسم بعدين هتلف عليهم كلهم.'
    },
    names: [
      /* --- shared: two files must agree --- */
      { n:'cart', k:'pub', as:'avocado',
        w:{ en:'The word you gave the CLI. It became the folder, the file names that <code>templateUrl</code>, <code>styleUrl</code> and the import path point at, and even the placeholder text. Renaming later means renaming the files and every path that points at them.',
            ar:'الكلمة اللي ادّيتها للـ CLI. بقت اسم الفولدر، وأسماء الملفات اللي <code>templateUrl</code> و<code>styleUrl</code> ومسار الـ import بيشاوروا عليها، وحتى الكلام اللي في التمبلت. لو غيّرتها بعدين لازم تغيّر أسماء الملفات وكل مسار بيشاور عليها.' } },
      { n:'Cart', k:'pub', as:'Avocado',
        w:{ en:'The class the CLI made from <code>cart</code>. The parent imports it and lists it in <code>imports</code>; the test imports it too.',
            ar:'الكلاس اللي الـ CLI عمله من <code>cart</code>. الأب بيعمله import وبيحطه في <code>imports</code>؛ والـ test بيعمله import برضه.' } },
      { n:'app-cart', k:'pub', as:'app-avocado',
        w:{ en:'The selector the CLI made: your prefix <code>app</code> plus <code>cart</code>. The tag in any parent template must match it.',
            ar:'الـ selector اللي الـ CLI عمله: البادئة بتاعتك <code>app</code> زائد <code>cart</code>. التاج في أي تمبلت أب لازم يبقى زيه.' } },
      { n:'about', k:'pub', as:'sesame',
        w:{ en:'Two promises that share a spelling. It is the folder and file names, so the lazy <code>import()</code> path must match them. It is also the URL: <code>path: \'about\'</code> and <code>routerLink="/about"</code> must match.',
            ar:'وعدين ليهم نفس الكتابة. هو اسم الفولدر والملفات، فمسار الـ <code>import()</code> لازم يبقى زيهم. وهو كمان الـ URL: <code>path: \'about\'</code> و<code>routerLink="/about"</code> لازم يبقوا زي بعض.' } },
      { n:'About', k:'pub', as:'Sesame', only:[RTS, ABOUT],
        w:{ en:'The class the CLI made from <code>about</code>. The route picks it by name with <code>m.About</code>.',
            ar:'الكلاس اللي الـ CLI عمله من <code>about</code>. الـ route بيختاره بالاسم بـ <code>m.About</code>.' } },
      { n:'pages', k:'pub',
        w:{ en:'A folder name you typed in the command. The import path in the routes file types it again.',
            ar:'اسم فولدر انت كتبته في الأمر. ومسار الـ import في ملف الـ routes بيكتبه تاني.' } },
      { n:'my-shop', k:'pub',
        w:{ en:'Your project’s name. The CLI writes it into the folder, <code>package.json</code> and <code>angular.json</code>. Only the <code>angular.json</code> copies must agree with each other.',
            ar:'اسم المشروع بتاعك. الـ CLI بيكتبه في الفولدر و<code>package.json</code> و<code>angular.json</code>. النسخ اللي في <code>angular.json</code> بس هي اللي لازم تبقى زي بعض.' } },
      { n:'routes', k:'pub', re:'(?<![\\w$.-])routes(?![\\w$-])',
        w:{ en:'Your routes array. <code>app.config.ts</code> imports it by this name.',
            ar:'الـ array بتاع الـ routes بتاعتك. <code>app.config.ts</code> بيعمله import بالاسم ده.' } },
      { n:'appConfig', k:'pub',
        w:{ en:'Your settings object. <code>main.ts</code> imports it by this name.', ar:'أوبجكت الإعدادات بتاعك. <code>main.ts</code> بيعمله import بالاسم ده.' } },
      { n:'App', k:'pub',
        w:{ en:'The root component’s class. <code>main.ts</code> imports it by this name.', ar:'كلاس الـ component الرئيسي. <code>main.ts</code> بيعمله import بالاسم ده.' } },
      { n:'app-root', k:'pub',
        w:{ en:'The root selector, typed as a tag in <code>index.html</code>.', ar:'الـ selector الرئيسي، ومكتوب كتاج في <code>index.html</code>.' } },
      { n:'CartComponent', k:'pub', as:'AvocadoComponent',
        w:{ en:'What older CLI versions called the class. Same promise as <code>Cart</code>.', ar:'الاسم اللي إصدارات الـ CLI القديمة كانت بتدّيه للكلاس. نفس وعد <code>Cart</code>.' } },

      /* --- yours, private to one file --- */
      { n:'app-about', k:'mine',
        w:{ en:'The about page’s selector. The router creates this component, so no template types the tag. Renaming it breaks nothing.',
            ar:'الـ selector بتاع صفحة about. الـ router هو اللي بيعمل الـ component ده، فمفيش تمبلت بيكتب التاج. تغييره مش بيبوّظ حاجة.' } },
      { n:'m', k:'mine', only:[RTS],
        w:{ en:'The name you give the loaded file inside the arrow function. Any name works.',
            ar:'الاسم اللي بتدّيه للملف اللي اتحمّل جوه الـ arrow function. أي اسم ينفع.' } },
      { n:'fixture', k:'mine',
        w:{ en:'A local variable in the test. Any name works.', ar:'متغير محلي في الـ test. أي اسم ينفع.' } },
      { n:'app', k:'mine', only:['json'], re:'(?<="prefix": ")app(?=")',
        w:{ en:'Your selector prefix. The CLI reads it only when it generates something new; changing it does not rename selectors you already have.',
            ar:'البادئة بتاعة الـ selectors بتاعتك. الـ CLI بيقراها بس لما يولّد حاجة جديدة؛ وتغييرها مش بيغيّر الـ selectors اللي عندك أصلًا.' } },

      /* --- the CLI's, Angular's, the test runner's --- */
      { n:'ng', k:'ng',
        w:{ en:'The Angular CLI’s command name. Every CLI command starts with it.', ar:'اسم أمر الـ Angular CLI. كل أوامر الـ CLI بتبدأ بيه.' } },
      { n:'new', k:'ng', re:'(?<=\\bng )new(?![\\w$-])',
        w:{ en:'A CLI command: create a whole new project.', ar:'أمر من الـ CLI: اعمل مشروع جديد خالص.' } },
      { n:'serve', k:'ng', re:'(?<=\\bng )serve(?![\\w$-])',
        w:{ en:'A CLI command: build and run the app while you work.', ar:'أمر من الـ CLI: ابني التطبيق وشغّله وانت شغال.' } },
      { n:'generate', k:'ng', re:'(?<=\\bng )(?:generate|g)(?![\\w$-])',
        w:{ en:'A CLI command, short form <code>g</code>: create files for you.', ar:'أمر من الـ CLI، واختصاره <code>g</code>: بيعملك الملفات.' } },
      { n:'component', k:'ng', re:'(?<=\\bng (?:generate|g) )(?:component|c)(?![\\w$-])',
        w:{ en:'What to generate, short form <code>c</code>. The CLI knows this word; the name after it is yours.',
            ar:'نوع الحاجة اللي هتتعمل، واختصارها <code>c</code>. الـ CLI عارف الكلمة دي؛ والاسم اللي بعدها بتاعك.' } },
      { n:'build', k:'ng', re:'(?<=\\bng )build(?![\\w$-])',
        w:{ en:'A CLI command: the production build.', ar:'أمر من الـ CLI: الـ build بتاع الـ production.' } },
      { n:'test', k:'ng', re:'(?<=\\bng )test(?![\\w$-])',
        w:{ en:'A CLI command: run the unit tests.', ar:'أمر من الـ CLI: شغّل الـ unit tests.' } },
      { n:'prefix', k:'ng', only:['json'], re:'(?<=")prefix(?=")',
        w:{ en:'A key in <code>angular.json</code>: the start of every selector the CLI generates.', ar:'مفتاح في <code>angular.json</code>: أول حتة في كل selector الـ CLI بيولّده.' } },
      { n:'buildTarget', k:'ng', only:['json'],
        w:{ en:'A key in <code>angular.json</code>. Its value names your project, so it must follow a project rename.', ar:'مفتاح في <code>angular.json</code>. القيمة بتاعته فيها اسم مشروعك، فلازم تتغير لو غيّرت اسم المشروع.' } },
      { n:'@Component', k:'ng',
        w:{ en:'Angular’s decorator: the label that turns a class into a component.', ar:'الـ decorator بتاع أنجولار: اللافتة اللي بتحوّل الكلاس لـ component.' } },
      { n:'selector', k:'ng',
        w:{ en:'An option key Angular reads. The tag name you give it is yours.', ar:'مفتاح إعداد أنجولار بيقراه. اسم التاج اللي بتحطه فيه بتاعك.' } },
      { n:'imports', k:'ng',
        w:{ en:'An option key Angular reads: what this template may use. The CLI never fills it for you.', ar:'مفتاح إعداد أنجولار بيقراه: الحاجات اللي التمبلت ده مسموح له يستخدمها. الـ CLI عمره ما بيملاه لك.' } },
      { n:'templateUrl', k:'ng',
        w:{ en:'An option key Angular reads. The path after it must match the real file name.', ar:'مفتاح إعداد أنجولار بيقراه. المسار اللي بعده لازم يبقى زي اسم الملف الحقيقي.' } },
      { n:'styleUrl', k:'ng',
        w:{ en:'An option key Angular reads, for the component’s CSS file.', ar:'مفتاح إعداد أنجولار بيقراه، لملف الـ CSS بتاع الـ component.' } },
      { n:'Routes', k:'ng',
        w:{ en:'Angular’s type for a routes array.', ar:'الـ type بتاع أنجولار لـ array الـ routes.' } },
      { n:'path', k:'ng',
        w:{ en:'A route key Angular reads. The URL text you give it is yours.', ar:'مفتاح في الـ route أنجولار بيقراه. نص الـ URL اللي بتحطه فيه بتاعك.' } },
      { n:'loadComponent', k:'ng',
        w:{ en:'A route key Angular reads: load this page’s code only when someone visits it.', ar:'مفتاح في الـ route أنجولار بيقراه: حمّل كود الصفحة دي بس لما حد يزورها.' } },
      { n:'then', k:'ng',
        w:{ en:'JavaScript’s Promise method: runs once the file has loaded.', ar:'ميثود الـ Promise بتاعة JavaScript: بتشتغل أول ما الملف يتحمّل.' } },
      { n:'ApplicationConfig', k:'ng',
        w:{ en:'Angular’s type for the settings object.', ar:'الـ type بتاع أنجولار لأوبجكت الإعدادات.' } },
      { n:'providers', k:'ng',
        w:{ en:'An option key Angular reads: app-wide features.', ar:'مفتاح إعداد أنجولار بيقراه: المميزات اللي للتطبيق كله.' } },
      { n:'provideRouter', k:'ng',
        w:{ en:'Angular’s function that switches the router on with your routes.', ar:'الـ function بتاعة أنجولار اللي بتشغّل الـ router بالـ routes بتاعتك.' } },
      { n:'RouterLink', k:'ng',
        w:{ en:'Angular’s link directive class. Without it in <code>imports</code>, <code>routerLink</code> is just an ignored attribute.', ar:'كلاس الـ directive بتاع اللينكات من أنجولار. من غيره في <code>imports</code>، <code>routerLink</code> بتبقى attribute متجاهلة.' } },
      { n:'routerLink', k:'ng',
        w:{ en:'Angular’s link attribute. The URL in the quotes is yours.', ar:'الـ attribute بتاعة أنجولار للينكات. الـ URL اللي بين العلامات بتاعك.' } },
      { n:'RouterOutlet', k:'ng',
        w:{ en:'Angular’s router class behind the <code>&lt;router-outlet&gt;</code> tag.', ar:'كلاس الـ router بتاع أنجولار اللي ورا تاج <code>&lt;router-outlet&gt;</code>.' } },
      { n:'router-outlet', k:'ng',
        w:{ en:'Angular’s tag: the spot where the router shows the current page.', ar:'تاج أنجولار: المكان اللي الـ router بيعرض فيه الصفحة الحالية.' } },
      { n:'describe', k:'ng',
        w:{ en:'The test runner’s function that groups tests. The text in quotes is yours.', ar:'الـ function بتاعة الـ test runner اللي بتجمّع الـ tests. الكلام اللي بين العلامات بتاعك.' } },
      { n:'it', k:'ng', only:[SPEC],
        w:{ en:'The test runner’s function for one test.', ar:'الـ function بتاعة الـ test runner لـ test واحد.' } },
      { n:'expect', k:'ng',
        w:{ en:'The test runner’s function for checking a value.', ar:'الـ function بتاعة الـ test runner اللي بتتأكد من قيمة.' } },
      { n:'toBeTruthy', k:'ng',
        w:{ en:'A test-runner check: the value exists.', ar:'فحص من الـ test runner: القيمة موجودة.' } },
      { n:'TestBed', k:'ng',
        w:{ en:'Angular’s testing tool that builds a component for a test.', ar:'أداة الاختبار بتاعة أنجولار اللي بتبني component عشان الـ test.' } },
      { n:'configureTestingModule', k:'ng',
        w:{ en:'A <code>TestBed</code> method.', ar:'ميثود في <code>TestBed</code>.' } },
      { n:'compileComponents', k:'ng',
        w:{ en:'A <code>TestBed</code> method.', ar:'ميثود في <code>TestBed</code>.' } },
      { n:'createComponent', k:'ng',
        w:{ en:'A <code>TestBed</code> method.', ar:'ميثود في <code>TestBed</code>.' } },
      { n:'componentInstance', k:'ng',
        w:{ en:'The fixture’s property: the component object itself.', ar:'property في الـ fixture: الـ component نفسه.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One word, five stops', ar: 'كلمة واحدة، خمس محطات' },
    lead: {
      en: 'You want a shopping cart on the home page. You type one command, make two small edits, and it is on screen. Follow the word <code>cart</code>:',
      ar: 'عايز سلة مشتريات في الصفحة الرئيسية. بتكتب أمر واحد، وتعمل تعديلين صغيرين، وتلاقيها على الشاشة. امشي ورا كلمة <code>cart</code>:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: TERM, lang: 'bash', who: { en: 'you · type', ar: 'انت · بتكتب' },
          code: ['ng generate component cart'],
          say: { en: `${ng('ng')}, ${ng('generate')} and ${ng('component')} are the CLI’s vocabulary: type them exactly, or use the short forms <code>g</code> and <code>c</code>. The <b>last word</b>, ${pub('cart')}, is the only one you invent.`,
                 ar: `${ng('ng')} و${ng('generate')} و${ng('component')} دول مفردات الـ CLI: اكتبهم بالظبط، أو استخدم الاختصارات <code>g</code> و<code>c</code>. <b>آخر كلمة</b>، ${pub('cart')}، هي الوحيدة اللي انت بتألفها.` } },
        { file: OUT, lang: 'bash', who: { en: 'the CLI · creates', ar: 'الـ CLI · بيعمل' },
          code: ['CREATE src/app/cart/cart.ts', 'CREATE src/app/cart/cart.html', 'CREATE src/app/cart/cart.css', 'CREATE src/app/cart/cart.spec.ts'],
          say: { en: `Your one word became a folder and four file names. Every ${pub('cart')} you see here is now a promise: other files will point at these paths.`,
                 ar: `كلمتك الواحدة بقت فولدر وأربع أسماء ملفات. كل ${pub('cart')} شايفها هنا بقت وعد: ملفات تانية هتشاور على المسارات دي.` } },
        { file: CART, lang: 'ts', who: { en: 'the CLI · names things', ar: 'الـ CLI · بيسمّي' },
          code: ['@Component({', "  selector: 'app-cart',", "  templateUrl: './cart.html',", '})', 'export class Cart {}'],
          say: { en: `The CLI derived two more names from yours: the class ${pub('Cart')} (capital C) and the selector ${pub('app-cart')} (your project’s prefix plus your word). ${ng('selector')} and ${ng('templateUrl')} are Angular’s keys.`,
                 ar: `الـ CLI طلّع اسمين كمان من اسمك: الكلاس ${pub('Cart')} (بـ C كابيتال) والـ selector ${pub('app-cart')} (بادئة مشروعك زائد كلمتك). و${ng('selector')} و${ng('templateUrl')} مفاتيح أنجولار.` } },
        { file: APP, lang: 'ts', who: { en: 'you · wire it', ar: 'انت · بتوصّله' },
          code: ["import { Cart } from './cart/cart';", '', '  imports: [RouterOutlet, RouterLink, Cart],'],
          say: { en: `<b>The CLI stops here.</b> It never touches the parent. You import ${pub('Cart')} by its class name and list it in ${ng('imports')}. The path <code>'./cart/cart'</code> is the folder and the file name, without <code>.ts</code>.`,
                 ar: `<b>الـ CLI بيقف هنا.</b> عمره ما بيلمس الأب. انت اللي بتعمل import لـ ${pub('Cart')} باسم الكلاس وبتحطه في ${ng('imports')}. والمسار <code>'./cart/cart'</code> هو الفولدر واسم الملف، من غير <code>.ts</code>.` } },
        { file: APPH, lang: 'html', who: { en: 'you · place it', ar: 'انت · بتحطه' },
          code: ['<app-cart />'],
          say: { en: `And you type the tag, spelled exactly like the selector string ${pub('app-cart')}. Save, and <code>ng serve</code> shows <i>“cart works!”</i> on the page.`,
                 ar: `وانت بتكتب التاج، بالظبط زي نص الـ selector ${pub('app-cart')}. احفظ، و<code>ng serve</code> هيعرض <i>«cart works!»</i> في الصفحة.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'You type <code>cart</code>. The CLI makes <code>cart/cart.ts</code>, <code>Cart</code> and <code>app-cart</code>. You write <code>import { Cart }</code>, <code>imports: [Cart]</code> and <code>&lt;app-cart /&gt;</code>. The CLI creates files; <b>it never wires them.</b>',
        ar: 'انت بتكتب <code>cart</code>. الـ CLI بيعمل <code>cart/cart.ts</code> و<code>Cart</code> و<code>app-cart</code>. وانت بتكتب <code>import { Cart }</code> و<code>imports: [Cart]</code> و<code>&lt;app-cart /&gt;</code>. الـ CLI بيعمل الملفات؛ <b>عمره ما بيوصّلها.</b>' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'You or the CLI?', ar: 'انت ولا الـ CLI؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'Most of the “why doesn’t my new component show up?” confusion disappears once you see where the CLI’s job ends and yours begins.',
      ar: 'أغلب لخبطة «ليه الـ component الجديد مش ظاهر؟» بتختفي أول ما تشوف شغل الـ CLI بيخلص فين وشغلك بيبدأ منين.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>ng generate component cart</code>', 'the terminal', 'you', `${ng('ng')}, ${ng('generate')}, ${ng('component')} are the CLI’s; you pick ${pub('cart')}`],
            ar: ['<code>ng generate component cart</code>', 'الترمينال', 'انت', `${ng('ng')} و${ng('generate')} و${ng('component')} بتوع الـ CLI؛ وانت بتختار ${pub('cart')}`] },
          { en: ['the folder and <code>cart.ts</code>, <code>.html</code>, <code>.css</code>, <code>.spec.ts</code>', '<code>src/app/cart/</code>', 'the CLI', 'the CLI, from your word. The endings are fixed'],
            ar: ['الفولدر و<code>cart.ts</code> و<code>.html</code> و<code>.css</code> و<code>.spec.ts</code>', '<code>src/app/cart/</code>', 'الـ CLI', 'الـ CLI، من كلمتك. والنهايات ثابتة'] },
          { en: ['<code>export class Cart</code>', '<code>cart.ts</code>', 'the CLI', `the CLI: your word with a capital letter, ${pub('Cart')}`],
            ar: ['<code>export class Cart</code>', '<code>cart.ts</code>', 'الـ CLI', `الـ CLI: كلمتك بحرف كابيتال، ${pub('Cart')}`] },
          { en: [`<code>selector: 'app-cart'</code>`, '<code>cart.ts</code>', 'the CLI', `the CLI: the prefix from <code>angular.json</code> plus your word, ${pub('app-cart')}`],
            ar: [`<code>selector: 'app-cart'</code>`, '<code>cart.ts</code>', 'الـ CLI', `الـ CLI: البادئة من <code>angular.json</code> زائد كلمتك، ${pub('app-cart')}`] },
          { en: ['<code>import { Cart }</code> and <code>imports: [Cart]</code>', 'the parent’s <code>.ts</code>', '<b>you</b>, always', `you copy ${pub('Cart')} exactly`],
            ar: ['<code>import { Cart }</code> و<code>imports: [Cart]</code>', '<code>.ts</code> الأب', '<b>انت</b>، دايمًا', `انت بتنسخ ${pub('Cart')} بالظبط`] },
          { en: ['<code>&lt;app-cart /&gt;</code>', 'the parent’s <code>.html</code>', '<b>you</b>, always', `you copy ${pub('app-cart')} exactly`],
            ar: ['<code>&lt;app-cart /&gt;</code>', '<code>.html</code> الأب', '<b>انت</b>، دايمًا', `انت بتنسخ ${pub('app-cart')} بالظبط`] },
          { en: [`<code>path: 'about'</code> and <code>routerLink="/about"</code>`, '<code>app.routes.ts</code> and a template', '<b>you</b>, always', `you pick ${pub('about')} once and type it in both`],
            ar: [`<code>path: 'about'</code> و<code>routerLink="/about"</code>`, '<code>app.routes.ts</code> وتمبلت', '<b>انت</b>، دايمًا', `انت بتختار ${pub('about')} مرة وبتكتبه في الاتنين`] },
        ] },
      { t: 'ul',
        en: ['<b>You type one word; the CLI makes four names from it.</b> Folder and files <code>cart</code>, class <code>Cart</code>, selector <code>app-cart</code>. Type the word in lowercase with dashes: <code>ng g c product-card</code> gives <code>product-card.ts</code>, <code>ProductCard</code> and <code>app-product-card</code>.',
             '<b>The CLI creates, you connect.</b> It never adds your component to anyone’s <code>imports</code>, never writes the tag, never adds a route. Every connection between two files is typed by you.',
             '<b>In a command, only the end is yours.</b> <code>ng</code>, <code>new</code>, <code>generate</code>, <code>component</code>, <code>serve</code> are the CLI’s words. What comes after them (a project name, a component name, a folder) is yours.'],
        ar: ['<b>انت بتكتب كلمة؛ والـ CLI بيعمل منها أربع أسماء.</b> فولدر وملفات <code>cart</code>، وكلاس <code>Cart</code>، وselector <code>app-cart</code>. اكتب الكلمة حروف صغيرة وبشَرط: <code>ng g c product-card</code> بتدّيك <code>product-card.ts</code> و<code>ProductCard</code> و<code>app-product-card</code>.',
             '<b>الـ CLI بيعمل، وانت بتوصّل.</b> عمره ما بيضيف الـ component بتاعك لـ <code>imports</code> حد، ولا بيكتب التاج، ولا بيضيف route. كل وصلة بين ملفين انت اللي بتكتبها.',
             '<b>في أي أمر، الآخر بس هو بتاعك.</b> <code>ng</code> و<code>new</code> و<code>generate</code> و<code>component</code> و<code>serve</code> كلمات الـ CLI. واللي بعدهم (اسم مشروع، اسم component، فولدر) بتاعك.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'A cart and an about page, every name coloured', ar: 'سلة وصفحة about، وكل اسم ملوّن' },
    lead: {
      en: 'The same project after two <code>ng generate</code> commands and the edits you make by hand. Hover a coloured name to light up everywhere else it appears. Then press <b>Rename test</b>: every name you own turns into a made-up word, the CLI’s and Angular’s words stay put, and the paths still point at the right files.',
      ar: 'نفس المشروع بعد أمرين <code>ng generate</code> والتعديلات اللي بتعملها بإيدك. قف بالماوس على أي اسم ملوّن وهتنوّر كل الأماكن التانية اللي هو فيها. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: كل اسم بتاعك هيبقى كلمة عشوائية، وكلمات الـ CLI وأنجولار هتفضل مكانها، والمسارات لسه بتشاور على الملفات الصح.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: TERM, lang: 'bash', tag: { en: 'what you type', ar: 'اللي بتكتبه' }, code: [
        'ng new my-shop',
        'cd my-shop',
        'ng generate component cart',
        'ng g c pages/about',
        'ng serve',
        'ng test',
        'ng build' ] },
      { t: 'code', name: CART, lang: 'ts', tag: { en: 'generated', ar: 'اتولّد' }, code: [
        "import { Component } from '@angular/core';",
        '',
        '@Component({',
        "  selector: 'app-cart',",
        '  imports: [],',
        "  templateUrl: './cart.html',",
        "  styleUrl: './cart.css'",
        '})',
        'export class Cart {',
        '',
        '}' ] },
      { t: 'code', name: CARTH, lang: 'html', tag: { en: 'generated', ar: 'اتولّد' }, code: [
        '<p>cart works!</p>' ] },
      { t: 'code', name: ABOUT, lang: 'ts', tag: { en: 'generated', ar: 'اتولّد' }, code: [
        "import { Component } from '@angular/core';",
        '',
        '@Component({',
        "  selector: 'app-about',",
        '  imports: [],',
        "  templateUrl: './about.html',",
        "  styleUrl: './about.css'",
        '})',
        'export class About {',
        '',
        '}' ] },
      { t: 'code', name: RTS, lang: 'ts', tag: { en: 'you wrote this', ar: 'انت كتبت ده' }, code: [
        "import { Routes } from '@angular/router';",
        '',
        'export const routes: Routes = [',
        '  {',
        "    path: 'about',",
        "    loadComponent: () => import('./pages/about/about').then(m => m.About),",
        '  },',
        '];' ] },
      { t: 'code', name: CFG, lang: 'ts', tag: { en: 'shortened', ar: 'مختصر' }, code: [
        "import { ApplicationConfig } from '@angular/core';",
        "import { provideRouter } from '@angular/router';",
        "import { routes } from './app.routes';",
        '',
        'export const appConfig: ApplicationConfig = {',
        '  providers: [provideRouter(routes)],',
        '};' ] },
      { t: 'code', name: APP, lang: 'ts', tag: { en: 'you edited this', ar: 'انت عدّلت ده' }, code: [
        "import { Component } from '@angular/core';",
        "import { RouterLink, RouterOutlet } from '@angular/router';",
        "import { Cart } from './cart/cart';",
        '',
        '@Component({',
        "  selector: 'app-root',",
        '  imports: [RouterOutlet, RouterLink, Cart],',
        "  templateUrl: './app.html',",
        "  styleUrl: './app.css'",
        '})',
        'export class App {}' ] },
      { t: 'code', name: APPH, lang: 'html', tag: { en: 'you edited this', ar: 'انت عدّلت ده' }, code: [
        '<nav>',
        '  <a routerLink="/">Home</a>',
        '  <a routerLink="/about">About</a>',
        '</nav>',
        '',
        '<app-cart />',
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
      en: 'The CLI picked these names once, at generate time. It will not rename anything later: that is your job. Most misses give you a compile error. The URL does not.',
      ar: 'الـ CLI اختار الأسماء دي مرة واحدة، وقت الـ generate. بعد كده مش هيغيّر أي حاجة: دي شغلتك انت. أغلب الحاجات اللي بتنساها بتديك compile error. الـ URL لأ.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [pub('about') + ' (the URL)', 'both <code>path: \'about\'</code> and every <code>routerLink="/about"</code>', '<b>No compile error.</b> Clicking the link does nothing, and only the browser console says <i>Cannot match any routes</i>.'],
            ar: [pub('about') + ' (الـ URL)', '<code>path: \'about\'</code> وكل <code>routerLink="/about"</code> الاتنين', '<b>مفيش compile error.</b> الدوس على اللينك مش بيعمل حاجة، والـ console بتاع المتصفح بس هو اللي بيقول <i>Cannot match any routes</i>.'] },
          { en: [pub('cart') + ' (files and folder)', 'the four file names, <code>templateUrl</code>, <code>styleUrl</code>, and the parent’s import path <code>\'./cart/cart\'</code>', 'Compile error: a file or module cannot be found.'],
            ar: [pub('cart') + ' (الملفات والفولدر)', 'أسماء الأربع ملفات، و<code>templateUrl</code>، و<code>styleUrl</code>، ومسار الـ import عند الأب <code>\'./cart/cart\'</code>', 'Compile error: ملف أو module مش لاقيه.'] },
          { en: [pub('Cart') + ' (the class)', 'the parent’s <code>import</code> line, its <code>imports: [ ]</code>, and the spec file', 'Compile error on the import.'],
            ar: [pub('Cart') + ' (الكلاس)', 'سطر الـ <code>import</code> عند الأب، و<code>imports: [ ]</code> بتاعته، وملف الـ spec', 'Compile error في الـ import.'] },
          { en: [pub('app-cart') + ' (the selector)', 'the tag in every parent template', 'Compile error: “is not a known element”.'],
            ar: [pub('app-cart') + ' (الـ selector)', 'التاج في كل تمبلت أب', 'Compile error: «is not a known element».'] },
          { en: [pub('pages') + ' or ' + pub('about') + ' (as a folder)', 'the path in <code>import(\'./pages/about/about\')</code>', 'Compile error: the module cannot be found.'],
            ar: [pub('pages') + ' أو ' + pub('about') + ' (كفولدر)', 'المسار في <code>import(\'./pages/about/about\')</code>', 'Compile error: الـ module مش لاقيه.'] },
          { en: [pub('About') + ' (the class)', '<code>m.About</code> in the route', 'Compile error in <code>app.routes.ts</code>.'],
            ar: [pub('About') + ' (الكلاس)', '<code>m.About</code> في الـ route', 'Compile error في <code>app.routes.ts</code>.'] },
          { en: [mine('app-about'), 'nothing, unless you typed that tag somewhere', 'Nothing. The router creates this component, so no template uses its tag.'],
            ar: [mine('app-about'), 'ولا حاجة، إلا لو كتبت التاج ده في حتة', 'ولا حاجة. الـ router هو اللي بيعمل الـ component ده، فمفيش تمبلت بيستخدم التاج بتاعه.'] },
          { en: [pub('my-shop'), 'every <code>my-shop</code> inside <code>angular.json</code>', 'Renaming the folder or the <code>package.json</code> name breaks nothing. A half-renamed <code>angular.json</code> makes <code>ng serve</code> fail with an error about the project.'],
            ar: [pub('my-shop'), 'كل <code>my-shop</code> جوه <code>angular.json</code>', 'تغيير اسم الفولدر أو الاسم في <code>package.json</code> مش بيبوّظ حاجة. لكن <code>angular.json</code> متغيّر نصه بس بيخلي <code>ng serve</code> يفشل بـ error عن المشروع.'] },
          { en: [mine('m'), 'the same arrow function', 'Compile error on that line.'],
            ar: [mine('m'), 'نفس الـ arrow function', 'Compile error في السطر ده.'] },
          { en: [`${ng('ng')}, ${ng('generate')}, ${ng('component')}, ${ng('selector')}, ${ng('routerLink')}`, 'nothing: you cannot rename these', 'They are the CLI’s and Angular’s words.'],
            ar: [`${ng('ng')} و${ng('generate')} و${ng('component')} و${ng('selector')} و${ng('routerLink')}`, 'ولا حاجة: دول مينفعش يتغيروا', 'دي كلمات الـ CLI وأنجولار.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b> above the files. Watch <code>cart</code>: it changes in the command, in <code>./cart.html</code>, in <code>\'./cart/cart\'</code> and even in <i>“cart works!”</i>, all at once. In a real project, your editor’s <b>rename file</b> and <b>rename symbol</b> commands do most of this for you. The URL <code>about</code> they will not catch.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b> اللي فوق الملفات. بص على <code>cart</code>: بتتغير في الأمر، وفي <code>./cart.html</code>، وفي <code>\'./cart/cart\'</code>، وحتى في <i>«cart works!»</i>، كله مرة واحدة. في مشروع حقيقي، أوامر <b>rename file</b> و<b>rename symbol</b> في الإديتور بتعمل أغلب ده بدالك. لكن الـ URL <code>about</code> مش هيمسكوه.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتوعك' },
    title: { en: 'The fixed names: the CLI’s vocabulary', ar: 'الأسماء الثابتة: مفردات الـ CLI' },
    lead: {
      en: 'The CLI is a program with its own words. Type them exactly, or it tells you the command is unknown.',
      ar: 'الـ CLI برنامج ليه كلماته. اكتبها بالظبط، وإلا هيقولك إن الأمر مش معروف.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['You type', 'Short form', 'What it does'], ar: ['بتكتب', 'الاختصار', 'بيعمل إيه'] },
        rows: [
          { en: ['<code>ng new my-shop</code>', '—', 'Creates a whole project folder. The name after <code>new</code> is yours.'],
            ar: ['<code>ng new my-shop</code>', '—', 'بيعمل فولدر مشروع كامل. الاسم اللي بعد <code>new</code> بتاعك.'] },
          { en: ['<code>ng serve</code>', '—', 'Builds and runs the app at <code>localhost:4200</code>, and rebuilds when you save.'],
            ar: ['<code>ng serve</code>', '—', 'بيبني التطبيق ويشغّله على <code>localhost:4200</code>، ويعيد البناء لما تحفظ.'] },
          { en: ['<code>ng generate component cart</code>', '<code>ng g c cart</code>', 'Creates a component. The name after <code>component</code> is yours.'],
            ar: ['<code>ng generate component cart</code>', '<code>ng g c cart</code>', 'بيعمل component. الاسم اللي بعد <code>component</code> بتاعك.'] },
          { en: ['<code>ng generate service cart-store</code>', '<code>ng g s cart-store</code>', 'Creates a service. The name after <code>service</code> is yours.'],
            ar: ['<code>ng generate service cart-store</code>', '<code>ng g s cart-store</code>', 'بيعمل service. الاسم اللي بعد <code>service</code> بتاعك.'] },
          { en: ['<code>ng build</code>', '—', 'The production build, written into <code>dist/</code>.'],
            ar: ['<code>ng build</code>', '—', 'الـ build بتاع الـ production، بيتكتب في <code>dist/</code>.'] },
          { en: ['<code>ng test</code>', '—', 'Runs the unit tests: the <code>.spec.ts</code> files.'],
            ar: ['<code>ng test</code>', '—', 'بيشغّل الـ unit tests: ملفات الـ <code>.spec.ts</code>.'] },
        ] },
      { t: 'p',
        en: 'Some <b>file names</b> are fixed too, because a tool looks for them by name: <code>angular.json</code> (the CLI), <code>package.json</code> and <code>node_modules/</code> (npm), <code>tsconfig.json</code> (TypeScript). Never rename those.',
        ar: 'فيه <b>أسماء ملفات</b> ثابتة برضه، عشان في أداة بتدوّر عليها بالاسم: <code>angular.json</code> (الـ CLI)، و<code>package.json</code> و<code>node_modules/</code> (npm)، و<code>tsconfig.json</code> (TypeScript). عمرك ما تغيّر أسماء دول.' },
      { t: 'p',
        en: `In the templates, ${ng('routerLink')}, ${ng('router-outlet')}, ${ng('RouterLink')} and ${ng('RouterOutlet')} are Angular’s. In the routes, ${ng('path')} and ${ng('loadComponent')} are keys Angular reads; the values after them are yours.`,
        ar: `في التمبلتس، ${ng('routerLink')} و${ng('router-outlet')} و${ng('RouterLink')} و${ng('RouterOutlet')} بتوع أنجولار. وفي الـ routes، ${ng('path')} و${ng('loadComponent')} مفاتيح أنجولار بيقراها؛ والقيم اللي بعدها بتاعتك.` }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'What to type after ng generate', ar: 'تكتب إيه بعد ng generate' },
    lead: {
      en: 'The CLI accepts almost any name. These habits just make the names it derives read well.',
      ar: 'الـ CLI بيقبل أي اسم تقريبًا. العادات دي بس بتخلي الأسماء اللي بيطلّعها تتقري كويس.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['a component', '<code>cart</code>, <code>product-card</code>', '<code>cart-component</code>, <code>ProductCard</code>', 'Lowercase with dashes. The CLI adds the capitals for the class. Adding “component” to the word gives you <code>app-cart-component</code> as a tag.'],
            ar: ['component', '<code>cart</code>، <code>product-card</code>', '<code>cart-component</code>، <code>ProductCard</code>', 'حروف صغيرة وشَرط. الـ CLI بيحط الكابيتال للكلاس بنفسه. ولو زوّدت «component» في الكلمة هيبقى التاج <code>app-cart-component</code>.'] },
          { en: ['a folder', '<code>pages/about</code>, <code>features/cart</code>', 'everything flat in <code>src/app/</code>', 'Put the folder in the command. The CLI creates it if it does not exist.'],
            ar: ['فولدر', '<code>pages/about</code>، <code>features/cart</code>', 'كل حاجة مرمية في <code>src/app/</code>', 'حط الفولدر في الأمر. الـ CLI بيعمله لو مش موجود.'] },
          { en: ['a service', '<code>cart-store</code>, <code>product-api</code>', '<code>cart</code> (same as the component)', 'Recent CLI versions do not add a <code>Service</code> suffix, so pick a word that says what it is. Two classes called <code>Cart</code> is confusing.'],
            ar: ['service', '<code>cart-store</code>، <code>product-api</code>', '<code>cart</code> (نفس اسم الـ component)', 'إصدارات الـ CLI الجديدة مش بتزوّد <code>Service</code> في الآخر، فاختار كلمة بتقول هي إيه. اتنين كلاس اسمهم <code>Cart</code> حاجة ملخبطة.'] },
          { en: ['the project', '<code>my-shop</code>', 'spaces, capitals', 'It becomes a folder and a package name. Lowercase with dashes is safe everywhere.'],
            ar: ['المشروع', '<code>my-shop</code>', 'مسافات، كابيتال', 'بيبقى اسم فولدر واسم package. الحروف الصغيرة والشَرط آمنين في كل حتة.'] },
          { en: ['a URL', '<code>about</code>, <code>products</code>', '<code>About</code>, <code>about-page</code>', 'URLs are for users: short, lowercase. The URL does not have to match the folder name; it just often does.'],
            ar: ['URL', '<code>about</code>، <code>products</code>', '<code>About</code>، <code>about-page</code>', 'الـ URLs للمستخدمين: قصيرة وحروف صغيرة. الـ URL مش لازم يبقى زي اسم الفولدر؛ هو بس غالبًا بيبقى كده.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Four places where the name is not free', ar: 'أربع أماكن الاسم فيهم مش براحتك' },
    lead: {
      en: 'Some parts of the generated names come from settings or rules, not from you.',
      ar: 'فيه حتت من الأسماء اللي اتولدت جاية من إعدادات أو قواعد، مش منك.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'The app- prefix comes from angular.json', ar: 'بادئة app- جاية من angular.json' }, blocks: [
        { t: 'code', name: 'angular.json (a few lines of it)', lang: 'json', tag: { en: 'project settings', ar: 'إعدادات المشروع' }, code: [
          '{',
          '  "projects": {',
          '    "my-shop": {',
          '      "projectType": "application",',
          '      "prefix": "app",',
          '      "architect": {',
          '        "serve": {',
          '          "configurations": {',
          '            "development": {',
          '              "buildTarget": "my-shop:build:development"',
          '            }',
          '          }',
          '        }',
          '      }',
          '    }',
          '  }',
          '}' ] },
        { t: 'p',
          en: `The CLI builds every selector as ${ng('prefix')} + dash + your word. You can choose another prefix when you create the project (<code>ng new my-shop --prefix=shop</code>). Changing ${mine('app')} later only affects components generated afterwards. Notice ${pub('my-shop')} twice here: the project key and inside ${ng('buildTarget')}. Those two must agree.`,
          ar: `الـ CLI بيعمل كل selector كده: ${ng('prefix')} + شَرطة + كلمتك. تقدر تختار بادئة تانية وانت بتعمل المشروع (<code>ng new my-shop --prefix=shop</code>). وتغيير ${mine('app')} بعدين بيأثر بس على الـ components اللي هتتولد بعد كده. وخد بالك إن ${pub('my-shop')} موجود هنا مرتين: مفتاح المشروع وجوه ${ng('buildTarget')}. الاتنين دول لازم يبقوا زي بعض.` }
      ]},
      { t: 'step', n: 'B', title: { en: 'Tests must end in .spec.ts', ar: 'الـ tests لازم تخلص بـ .spec.ts' }, blocks: [
        { t: 'code', name: SPEC, lang: 'ts', tag: { en: 'generated', ar: 'اتولّد' }, code: [
          "import { TestBed } from '@angular/core/testing';",
          "import { Cart } from './cart';",
          '',
          "describe('Cart', () => {",
          "  it('should create', async () => {",
          '    await TestBed.configureTestingModule({ imports: [Cart] }).compileComponents();',
          '    const fixture = TestBed.createComponent(Cart);',
          '    expect(fixture.componentInstance).toBeTruthy();',
          '  });',
          '});' ] },
        { t: 'p',
          en: `With the default settings, <code>ng test</code> looks for files whose names end in <code>.spec.ts</code>. The <code>cart</code> part is yours; the <code>.spec.ts</code> ending is not. Inside, the text in <code>'Cart'</code> and <code>'should create'</code> is only a label for the test report. ${mine('fixture')} is a local variable.`,
          ar: `بالإعدادات الافتراضية، <code>ng test</code> بيدوّر على الملفات اللي أسماءها بتخلص بـ <code>.spec.ts</code>. حتة <code>cart</code> بتاعتك؛ لكن النهاية <code>.spec.ts</code> لأ. وجوه الملف، الكلام اللي في <code>'Cart'</code> و<code>'should create'</code> مجرد عنوان في تقرير الـ tests. و${mine('fixture')} متغير محلي.` }
      ]},
      { t: 'step', n: 'C', title: { en: 'path has no slash, routerLink has one', ar: 'path من غير شَرطة مايلة، وrouterLink بيها' }, blocks: [
        { t: 'pair',
          bad:  { name: 'src/app/app.routes.ts', lang: 'ts', code: ["    path: '/about',"] },
          good: { name: 'src/app/app.routes.ts', lang: 'ts', code: ["    path: 'about',"] } },
        { t: 'p',
          en: `The same word ${pub('about')} is written two ways. In ${ng('path')} there is <b>no</b> leading <code>/</code>; Angular rejects <code>'/about'</code> with an error when the app starts. In ${ng('routerLink')} you write <code>"/about"</code>, with the slash, meaning “from the root of the site”.`,
          ar: `نفس الكلمة ${pub('about')} بتتكتب بطريقتين. في ${ng('path')} <b>مفيش</b> <code>/</code> في الأول؛ وأنجولار بيرفض <code>'/about'</code> بـ error أول ما التطبيق يشتغل. وفي ${ng('routerLink')} بتكتب <code>"/about"</code>، بالشَرطة، يعني «من أول الموقع».` }
      ]},
      { t: 'step', n: 'D', title: { en: 'm.About must be the exported class name', ar: 'm.About لازم يبقى اسم الكلاس اللي عليه export' }, blocks: [
        { t: 'p',
          en: `${mine('m')} is any name you like: it is the loaded file. But what comes after the dot must be exactly the name the file exports, ${pub('About')}. TypeScript checks it, so a typo is a compile error.`,
          ar: `${mine('m')} أي اسم يعجبك: ده الملف اللي اتحمّل. بس اللي بعد النقطة لازم يبقى بالظبط الاسم اللي الملف عامله export، ${pub('About')}. الـ TypeScript بيتأكد منه، فأي غلطة إملائية compile error.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: 'The older CLI added <code>.component</code>', ar: 'الـ CLI القديم كان بيزوّد <code>.component</code>' },
    lead: {
      en: 'Tutorials and older projects show <code>cart.component.ts</code> and <code>CartComponent</code>. Same command, same word; older CLI versions just added a suffix to the file and the class. The selector is the same.',
      ar: 'الشروحات والمشاريع الأقدم بتوريك <code>cart.component.ts</code> و<code>CartComponent</code>. نفس الأمر، ونفس الكلمة؛ إصدارات الـ CLI القديمة بس كانت بتزوّد لاحقة للملف وللكلاس. والـ selector هو هو.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'cart.component.ts — older CLI', lang: 'ts', code: [
          '@Component({',
          "  selector: 'app-cart',",
          "  templateUrl: './cart.component.html',",
          "  styleUrl: './cart.component.css'",
          '})',
          'export class CartComponent {}' ] },
        good: { name: 'cart.ts — today', lang: 'ts', code: [
          '@Component({',
          "  selector: 'app-cart',",
          "  templateUrl: './cart.html',",
          "  styleUrl: './cart.css'",
          '})',
          'export class Cart {}' ] } },
      { t: 'p',
        en: `Neither is wrong. The parent imports whichever class name the file exports, ${pub('CartComponent')} or ${pub('Cart')}, and the tag ${pub('app-cart')} is identical. Just do not mix both styles in one project. Very old projects also had the CLI add each new component to an NgModule’s <code>declarations</code> for you; with standalone components, you add it to <code>imports</code> yourself.`,
        ar: `ولا واحد فيهم غلط. الأب بيعمل import لأي اسم كلاس الملف عامله export، ${pub('CartComponent')} أو ${pub('Cart')}، والتاج ${pub('app-cart')} هو هو. بس متخلطش الأسلوبين في مشروع واحد. والمشاريع القديمة أوي كان الـ CLI فيها بيضيف كل component جديد لـ <code>declarations</code> بتاعة NgModule بدالك؛ مع الـ standalone components، انت اللي بتضيفه لـ <code>imports</code>.` }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, and says nothing', ar: 'مش بيعمل حاجة، ومش بيقول حاجة' },
    title: { en: 'Mistakes that fail silently', ar: 'غلطات بتفشل في صمت' },
    lead: {
      en: 'After <code>ng generate</code>, the next five minutes are where beginners get stuck. Most of these give no error in the terminal.',
      ar: 'بعد <code>ng generate</code>، الخمس دقايق اللي بعدها هما اللي المبتدئين بيقفوا فيهم. أغلب دول مش بيدّوا أي error في الترمينال.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'routerLink without RouterLink in imports', ar: 'routerLink من غير RouterLink في imports' }, blocks: [
        { t: 'pair',
          bad:  { name: 'src/app/app.ts', lang: 'ts', code: ['  imports: [RouterOutlet, Cart],'] },
          good: { name: 'src/app/app.ts', lang: 'ts', code: ['  imports: [RouterOutlet, RouterLink, Cart],'] } },
        { t: 'p', en: 'Without <code>RouterLink</code>, <code>routerLink="/about"</code> is just an unknown HTML attribute on an <code>&lt;a&gt;</code> with no <code>href</code>. The browser ignores it. No error, and the link does nothing.',
                  ar: 'من غير <code>RouterLink</code>، <code>routerLink="/about"</code> مجرد attribute مجهولة على <code>&lt;a&gt;</code> ملهاش <code>href</code>. المتصفح بيتجاهلها. لا error، واللينك مش بيعمل حاجة.' }
      ]},
      { t: 'step', n: '2', title: { en: 'href instead of routerLink', ar: 'href بدل routerLink' }, blocks: [
        { t: 'pair',
          bad:  { name: 'src/app/app.html', lang: 'html', code: ['<a href="/about">About</a>'] },
          good: { name: 'src/app/app.html', lang: 'html', code: ['<a routerLink="/about">About</a>'] } },
        { t: 'p', en: 'The page does change, so it looks right. But <code>href</code> reloads the whole app from <code>index.html</code>, and everything in memory (the cart contents, a logged-in user) is gone.',
                  ar: 'الصفحة بتتغير فعلًا، فشكلها صح. بس <code>href</code> بيعيد تحميل التطبيق كله من <code>index.html</code>، وكل حاجة في الذاكرة (محتويات السلة، اليوزر اللي عامل login) بتضيع.' }
      ]},
      { t: 'step', n: '3', title: { en: 'The link and the path disagree', ar: 'اللينك والـ path مش زي بعض' }, blocks: [
        { t: 'pair',
          bad:  { name: 'src/app/app.html', lang: 'html', code: ['<a routerLink="/about-us">About</a>'] },
          good: { name: 'src/app/app.html', lang: 'html', code: ['<a routerLink="/about">About</a>'] } },
        { t: 'p', en: 'URLs are plain strings, so nothing checks them at build time. Clicking goes nowhere, and only the browser console says <i>Cannot match any routes</i>. Copy the URL from <code>app.routes.ts</code>.',
                  ar: 'الـ URLs مجرد نصوص، فمحدش بيتأكد منها وقت الـ build. الدوس مش بيودّي في حتة، والـ console بتاع المتصفح بس هو اللي بيقول <i>Cannot match any routes</i>. انسخ الـ URL من <code>app.routes.ts</code>.' }
      ]},
      { t: 'step', n: '4', title: { en: 'Generated, but never imported', ar: 'اتولّد، بس عمره ما اتعمله import' }, blocks: [
        { t: 'pair',
          bad:  { name: 'src/app/app.ts', lang: 'ts', code: ['  imports: [RouterOutlet, RouterLink],'] },
          good: { name: 'src/app/app.ts', lang: 'ts', code: ['  imports: [RouterOutlet, RouterLink, Cart],'] } },
        { t: 'p', en: 'This one does give an error, but it confuses people: <i>“\'app-cart\' is not a known element”</i>. You generated it, so it must exist? It exists as a file. The parent still has to list it in <code>imports</code>.',
                  ar: 'دي بتدي error، بس بيلخبط الناس: <i>«\'app-cart\' is not a known element»</i>. انت ولّدته، يبقى أكيد موجود؟ موجود كملف. بس الأب لسه لازم يحطه في <code>imports</code>.' }
      ]},
      { t: 'step', n: '5', title: { en: 'Running ng generate outside the project', ar: 'إنك تشغّل ng generate برّه المشروع' }, blocks: [
        { t: 'pair',
          bad:  { name: 'terminal · in your home folder', lang: 'bash', code: ['ng generate component cart'] },
          good: { name: 'terminal · inside the project', lang: 'bash', code: ['cd my-shop', 'ng generate component cart'] } },
        { t: 'p', en: 'The CLI needs <code>angular.json</code> to know where to put files and which prefix to use. Outside the project folder it refuses, with a message saying the command is not available outside a workspace.',
                  ar: 'الـ CLI محتاج <code>angular.json</code> عشان يعرف يحط الملفات فين ويستخدم أنهي بادئة. برّه فولدر المشروع بيرفض، برسالة بتقول إن الأمر مش متاح برّه الـ workspace.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When the new thing does not show', ar: 'لما الحاجة الجديدة مش بتظهر' },
    title: { en: 'Six questions, in this order', ar: 'ست أسئلة، بالترتيب ده' },
    lead: {
      en: 'You generated something and it is not on the screen. Ask these before anything else.',
      ar: 'ولّدت حاجة ومش ظاهرة على الشاشة. اسأل الأسئلة دي قبل أي حاجة.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Did the CLI print <code>CREATE</code> lines, in the folder you expected?',
                  ar: '<b>1.</b> الـ CLI طبع سطور <code>CREATE</code>، في الفولدر اللي انت متوقعه؟' },
      { t: 'chk', en: '<b>2.</b> Does the parent <code>import</code> the class and list it in <code>imports: [ ]</code>?',
                  ar: '<b>2.</b> الأب عامل <code>import</code> للكلاس وحاطه في <code>imports: [ ]</code>؟' },
      { t: 'chk', en: '<b>3.</b> Is the tag spelled exactly like the <code>selector</code> string?',
                  ar: '<b>3.</b> التاج مكتوب بالظبط زي نص الـ <code>selector</code>؟' },
      { t: 'chk', en: '<b>4.</b> For links: are <code>RouterLink</code> and <code>RouterOutlet</code> in <code>imports</code>?',
                  ar: '<b>4.</b> للينكات: <code>RouterLink</code> و<code>RouterOutlet</code> موجودين في <code>imports</code>؟' },
      { t: 'chk', en: '<b>5.</b> Does every <code>routerLink</code> match a <code>path</code> (slash in the link, none in the path)?',
                  ar: '<b>5.</b> كل <code>routerLink</code> بيطابق <code>path</code> (بشَرطة في اللينك، ومن غيرها في الـ path)؟' },
      { t: 'chk', en: '<b>6.</b> After renaming anything, does every path still point at a real file: <code>templateUrl</code>, <code>styleUrl</code>, each <code>import</code>?',
                  ar: '<b>6.</b> بعد ما غيّرت أي اسم، كل مسار لسه بيشاور على ملف حقيقي: <code>templateUrl</code> و<code>styleUrl</code> وكل <code>import</code>؟' }
    ]
  }
  ]
};
