/* ==================================================================
   Routing, name by name — the companion page after the basic-routing
   topic. One running example (a product list and a product page)
   followed from a click on a link to the page that appears, with every
   name coloured by who owns it. Names list: inline below.
   ================================================================== */

/* a name in running text, coloured like the code and linked on hover */
const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

const OLDPAGE = 'product-detail.ts — older style';
const MISMATCH = 'product-detail.ts · wrong name';

export default {
  topic: 'basic-routing',
  tab: 'Routing, name by name — The Angular Signal',
  title: { en: 'Routing, name by name', ar: 'الـ routing، اسم اسم' },
  say: {
    en: 'The page for when routes, links and params feel like a guessing game. One product list and one product page, followed from the click to the page that appears, every name coloured: the router’s words, your URL words, and the names that must match across files with nothing to check them.',
    ar: 'الصفحة دي للي حاسس إن الـ routes واللينكات والـ params لعبة تخمين. ليستة منتجات وصفحة منتج، ماشيين وراهم من الكليك لحد الصفحة اللي بتظهر، وكل اسم ملوّن: كلمات الراوتر، وكلمات الـ URL بتاعتك، والأسماء اللي لازم تطابق بين الملفات ومحدش بيتأكد منها.'
  },
  lead: {
    en: 'Routing has one idea: <b>a URL picks a component, and the router draws it in a hole in your page.</b> The confusing part is the names. The word <code>products</code> is typed in the route table, in every link and in every <code>navigate()</code>, sometimes with a slash and sometimes without. A <code>:productId</code> in a path must equal an input in another file. And almost none of it is checked by the compiler. This page shows which words are the router’s, which are yours, and which must match.',
    ar: 'الـ routing فيه فكرة واحدة: <b>الـ URL بيختار component، والراوتر بيرسمه في فتحة في صفحتك.</b> اللي بيلخبط هو الأسماء. كلمة <code>products</code> بتتكتب في جدول الـ routes، وفي كل لينك، وفي كل <code>navigate()</code>، مرة بشرطة ومرة من غير. و<code>:productId</code> في مسار لازم يساوي input في ملف تاني. وتقريبًا ولا حاجة من دول الـ compiler بيتأكد منها. الصفحة دي بتوريك أنهي كلمات بتاعة الراوتر، وأنهي بتاعتك، وأنهي لازم تطابق.'
  },

  names: {
    note: {
      en: 'Most orange names on this page are <b>strings</b>: URL words, the param name, the CSS class. TypeScript does not read strings, so a mismatch is usually not a compile error. It shows up as the wrong page, an empty input, or a link that does nothing.',
      ar: 'أغلب الأسماء البرتقاني في الصفحة دي <b>نصوص</b>: كلمات الـ URL، واسم الـ param، والـ CSS class. TypeScript مش بيقرا النصوص، فعدم التطابق غالبًا مش compile error. بيظهر كصفحة غلط، أو input فاضي، أو لينك مش بيعمل حاجة.'
    },
    names: [
      /* --- shared: two files must agree --- */
      { n:'products', k:'pub', re:'(?<=[\'"]\\/?)products(?=[\\/\'"])',
        w:{ en:'A URL word you invented. The route <code>path</code>, <code>redirectTo</code>, every <code>routerLink</code> and every <code>navigate()</code> must spell it the same. The file <code>./pages/products</code> and the class <code>Products</code> are different names.',
            ar:'كلمة URL انت اخترعتها. الـ <code>path</code> في الـ route، و<code>redirectTo</code>، وكل <code>routerLink</code>، وكل <code>navigate()</code> لازم يكتبوها زي بعض. والملف <code>./pages/products</code> والكلاس <code>Products</code> أسماء تانية.' } },
      { n:'productId', k:'pub',
        w:{ en:'The route parameter. With <code>withComponentInputBinding()</code> the page’s input must have exactly this name. In the older style, the string in <code>params.get(\'productId\')</code> must match it.',
            ar:'الـ parameter بتاع الـ route. مع <code>withComponentInputBinding()</code> الـ input بتاع الصفحة لازم يبقى بالاسم ده بالظبط. وفي الأسلوب القديم، النص في <code>params.get(\'productId\')</code> لازم يطابقه.' } },
      { n:'order', k:'pub',
        w:{ en:'A query parameter (<code>?order=price</code>). The link’s <code>queryParams</code> key and the page’s input must use the same word.',
            ar:'query parameter (<code>?order=price</code>). مفتاح الـ <code>queryParams</code> في اللينك والـ input في الصفحة لازم يستخدموا نفس الكلمة.' } },
      { n:'Products', k:'pub', re:'(?<=\\.|class )Products(?![\\w$-])',
        w:{ en:'The list page’s class. The lazy import picks it out by name: <code>m.Products</code>.', ar:'كلاس صفحة الليستة. الـ lazy import بياخده بالاسم: <code>m.Products</code>.' } },
      { n:'ProductDetail', k:'pub',
        w:{ en:'The product page’s class, picked out of the lazy import by name.', ar:'كلاس صفحة المنتج، بيتاخد من الـ lazy import بالاسم.' } },
      { n:'NotFound', k:'pub',
        w:{ en:'The “not found” page’s class, picked out of the lazy import by name.', ar:'كلاس صفحة «مش موجود»، بيتاخد من الـ lazy import بالاسم.' } },
      { n:'routes', k:'pub', re:'(?<![\\w$.-])routes(?![\\w$.-])',
        w:{ en:'Your route table. <code>app.config.ts</code> imports it by this name. (<code>Routes</code> with a capital R is Angular’s type.)',
            ar:'جدول الـ routes بتاعك. <code>app.config.ts</code> بيعمله import بالاسم ده. (<code>Routes</code> بـ R كابيتال ده الـ type بتاع أنجولار.)' } },
      { n:'appConfig', k:'pub', w:{ en:'Your app’s config object. <code>main.ts</code> imports it by this name.', ar:'object الإعدادات بتاع تطبيقك. <code>main.ts</code> بيعمله import بالاسم ده.' } },
      { n:'App', k:'pub', w:{ en:'The root component’s class. <code>main.ts</code> starts the app with it.', ar:'كلاس الـ component الأساسي. <code>main.ts</code> بيشغّل التطبيق بيه.' } },
      { n:'app-root', k:'pub', w:{ en:'The root selector. <code>index.html</code> contains this tag.', ar:'الـ selector الأساسي. <code>index.html</code> فيه التاج ده.' } },
      { n:'active', k:'pub',
        w:{ en:'Your CSS class name. <code>routerLinkActive</code> adds it; the stylesheet must style the same word.', ar:'اسم الـ CSS class بتاعك. <code>routerLinkActive</code> بيحطه؛ والـ stylesheet لازم يستايل نفس الكلمة.' } },
      { n:'PRODUCTS', k:'pub', w:{ en:'Your data. Both pages import it by this name.', ar:'الداتا بتاعتك. الصفحتين بيعملوها import بالاسم ده.' } },
      { n:'Product', k:'pub', w:{ en:'Your data type.', ar:'نوع الداتا بتاعك.' } },
      { n:'id', k:'pub', not:[MISMATCH], w:{ en:'A field on your data. Not the route param: that one is <code>productId</code>.', ar:'field في الداتا بتاعتك. مش الـ param بتاع الـ route: ده اسمه <code>productId</code>.' } },
      { n:'name', k:'pub', w:{ en:'A field on your data.', ar:'field في الداتا بتاعتك.' } },
      { n:'price', k:'pub', re:"(?<![\\w$'-])price(?![\\w$'-])", w:{ en:'A field on your data.', ar:'field في الداتا بتاعتك.' } },

      /* --- yours, private to one component --- */
      { n:'app-products', k:'mine',
        w:{ en:'A routed page’s selector. The router creates the page itself, so no template ever types this tag.', ar:'selector صفحة بيجيبها الراوتر. الراوتر هو اللي بيعمل الصفحة، فمفيش تمبلت بيكتب التاج ده خالص.' } },
      { n:'app-product-detail', k:'mine', w:{ en:'A routed page’s selector, typed nowhere else.', ar:'selector صفحة بيجيبها الراوتر، ومش مكتوب في أي حتة تانية.' } },
      { n:'app-not-found', k:'mine', w:{ en:'A routed page’s selector, typed nowhere else.', ar:'selector صفحة بيجيبها الراوتر، ومش مكتوب في أي حتة تانية.' } },
      { n:'items', k:'mine', w:{ en:'The list page’s own field, read by its own template.', ar:'الـ field بتاع صفحة الليستة، والتمبلت بتاعها بيقراه.' } },
      { n:'product', k:'mine', re:"(?<![\\w$'\\/-])product(?![\\w$-])", w:{ en:'The product page’s own computed.', ar:'الـ computed بتاع صفحة المنتج.' } },
      { n:'router', k:'mine', re:'(?<![\\w$\\/-])router(?![\\w$-])',
        w:{ en:'The field you store the injected <code>Router</code> in.', ar:'الـ field اللي بتحط فيه الـ <code>Router</code> اللي اتعمله inject.' } },
      { n:'showNext', k:'mine', w:{ en:'The product page’s own method.', ar:'ميثود صفحة المنتج نفسها.' } },
      { n:'p', k:'mine', re:'(?<![\\w$<\\/-])p(?![\\w$-])', w:{ en:'A loop variable, an <code>@if … as</code> alias, or an arrow parameter. All local.', ar:'متغير لوب، أو alias في <code>@if … as</code>، أو parameter في arrow. كلهم محليين.' } },
      { n:'m', k:'mine', w:{ en:'The arrow parameter holding the loaded file. Any name works.', ar:'الـ parameter بتاع الـ arrow اللي شايل الملف اللي اتحمّل. أي اسم ينفع.' } },
      { n:'route', k:'mine', only:[OLDPAGE], w:{ en:'The field you store <code>ActivatedRoute</code> in.', ar:'الـ field اللي بتحط فيه <code>ActivatedRoute</code>.' } },
      { n:'params', k:'mine', only:[OLDPAGE], w:{ en:'The arrow parameter holding the param map. Any name works.', ar:'الـ parameter بتاع الـ arrow اللي شايل الـ params. أي اسم ينفع.' } },
      { n:'wanted', k:'mine', w:{ en:'A local variable.', ar:'متغير محلي.' } },

      /* --- the router's, Angular's, the browser's --- */
      { n:'Routes', k:'ng', w:{ en:'Angular’s type for a route table.', ar:'الـ type بتاع أنجولار لجدول الـ routes.' } },
      { n:'path', k:'ng', w:{ en:'A route key the router reads. The string after it is yours.', ar:'مفتاح route الراوتر بيقراه. النص اللي بعده بتاعك.' } },
      { n:'pathMatch', k:'ng', w:{ en:'A route key the router reads.', ar:'مفتاح route الراوتر بيقراه.' } },
      { n:'full', k:'ng', w:{ en:'One of the two values <code>pathMatch</code> accepts (the other is <code>prefix</code>).', ar:'واحدة من القيمتين اللي <code>pathMatch</code> بيقبلهم (التانية <code>prefix</code>).' } },
      { n:'redirectTo', k:'ng', w:{ en:'A route key the router reads.', ar:'مفتاح route الراوتر بيقراه.' } },
      { n:'title', k:'ng', w:{ en:'A route key: the router puts its value in the browser tab.', ar:'مفتاح route: الراوتر بيحط قيمته في تاب المتصفح.' } },
      { n:'loadComponent', k:'ng', w:{ en:'A route key for a page loaded only when needed.', ar:'مفتاح route لصفحة بتتحمّل بس لما تتطلب.' } },
      { n:'**', k:'ng', w:{ en:'The router’s wildcard: any URL nothing above it matched.', ar:'الـ wildcard بتاع الراوتر: أي URL محدش فوقه طابقه.' } },
      { n:'routerLink', k:'ng', w:{ en:'Angular’s directive that navigates without reloading the page.', ar:'الـ directive بتاع أنجولار اللي بيتنقل من غير reload للصفحة.' } },
      { n:'routerLinkActive', k:'ng', w:{ en:'Angular’s directive that adds your CSS class while the link is the current page.', ar:'الـ directive بتاع أنجولار اللي بيحط الـ CSS class بتاعك طول ما اللينك هو الصفحة الحالية.' } },
      { n:'queryParams', k:'ng', w:{ en:'Angular’s name for the <code>?key=value</code> part. The keys inside are yours.', ar:'اسم أنجولار لجزء <code>?key=value</code>. المفاتيح اللي جواه بتاعتك.' } },
      { n:'router-outlet', k:'ng', w:{ en:'Angular’s tag: the hole the matched page is drawn into.', ar:'تاج أنجولار: الفتحة اللي الصفحة المطابقة بتترسم فيها.' } },
      { n:'RouterOutlet', k:'ng', w:{ en:'The class behind <code>&lt;router-outlet&gt;</code>. Must be in <code>imports</code>.', ar:'الكلاس اللي ورا <code>&lt;router-outlet&gt;</code>. لازم يبقى في <code>imports</code>.' } },
      { n:'RouterLink', k:'ng', w:{ en:'The class behind <code>routerLink</code>. Must be in <code>imports</code>.', ar:'الكلاس اللي ورا <code>routerLink</code>. لازم يبقى في <code>imports</code>.' } },
      { n:'RouterLinkActive', k:'ng', w:{ en:'The class behind <code>routerLinkActive</code>.', ar:'الكلاس اللي ورا <code>routerLinkActive</code>.' } },
      { n:'provideRouter', k:'ng', w:{ en:'Angular’s function that switches the router on.', ar:'الـ function بتاعة أنجولار اللي بتشغّل الراوتر.' } },
      { n:'withComponentInputBinding', k:'ng', w:{ en:'The router feature that copies URL values into inputs <b>with the same name</b>.', ar:'ميزة في الراوتر بتنسخ قيم الـ URL في الـ inputs <b>اللي ليها نفس الاسم</b>.' } },
      { n:'Router', k:'ng', w:{ en:'Angular’s router service.', ar:'الـ service بتاعة الراوتر في أنجولار.' } },
      { n:'navigate', k:'ng', w:{ en:'A <code>Router</code> method that takes the URL in parts.', ar:'ميثود في الـ <code>Router</code> بتاخد الـ URL أجزاء.' } },
      { n:'ActivatedRoute', k:'ng', w:{ en:'Angular’s service describing the current route (older style).', ar:'الـ service بتاعة أنجولار اللي بتوصف الـ route الحالي (الأسلوب القديم).' } },
      { n:'paramMap', k:'ng', w:{ en:'An <code>ActivatedRoute</code> property.', ar:'property في <code>ActivatedRoute</code>.' } },
      { n:'get', k:'ng', w:{ en:'A method of the param map. The string you pass must be the param’s name.', ar:'ميثود في الـ param map. النص اللي بتبعته لازم يبقى اسم الـ param.' } },
      { n:'inject', k:'ng', w:{ en:'Angular’s function that hands you a service.', ar:'الـ function بتاعة أنجولار اللي بتديك service.' } },
      { n:'input', k:'ng', re:'(?<![\\w$<(-])input(?=[.(<,]|\\s*\\})', w:{ en:'Angular’s function that creates an input.', ar:'الـ function بتاعة أنجولار اللي بتعمل input.' } },
      { n:'required', k:'ng', w:{ en:'Part of <code>input.required</code>.', ar:'جزء من <code>input.required</code>.' } },
      { n:'computed', k:'ng', w:{ en:'Angular’s derived signal.', ar:'الـ signal المشتقة بتاعة أنجولار.' } },
      { n:'ApplicationConfig', k:'ng', w:{ en:'Angular’s type for the app config.', ar:'الـ type بتاع أنجولار لإعدادات التطبيق.' } },
      { n:'providers', k:'ng', w:{ en:'A config key Angular reads.', ar:'مفتاح إعداد أنجولار بيقراه.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator.', ar:'الـ decorator بتاع أنجولار.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The string after it is yours.', ar:'مفتاح إعداد. النص اللي بعده بتاعك.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key pointing at your template file.', ar:'مفتاح إعداد بيشاور على ملف التمبلت بتاعك.' } },
      { n:'template', k:'ng', w:{ en:'An option key for an inline template.', ar:'مفتاح إعداد لتمبلت مكتوب جوه الملف.' } },
      { n:'styleUrl', k:'ng', w:{ en:'An option key pointing at your stylesheet.', ar:'مفتاح إعداد بيشاور على الـ stylesheet بتاعك.' } },
      { n:'imports', k:'ng', w:{ en:'An option key: what this template uses.', ar:'مفتاح إعداد: الحاجات اللي التمبلت ده بيستخدمها.' } },
      { n:'@for', k:'ng', w:{ en:'Angular’s loop block.', ar:'بلوك اللوب بتاع أنجولار.' } },
      { n:'track', k:'ng', w:{ en:'Part of <code>@for</code>.', ar:'جزء من <code>@for</code>.' } },
      { n:'@if', k:'ng', w:{ en:'Angular’s condition block.', ar:'بلوك الشرط بتاع أنجولار.' } },
      { n:'click', k:'ng', w:{ en:'The browser’s event name.', ar:'اسم الـ event بتاع المتصفح.' } },
      { n:'ngOnInit', k:'ng', w:{ en:'The classic “inputs are ready” hook.', ar:'الـ hook الكلاسيكي بتاع «الـ inputs جاهزة».' } },
      { n:'OnInit', k:'ng', w:{ en:'The interface for <code>ngOnInit</code>.', ar:'الـ interface بتاع <code>ngOnInit</code>.' } },
      { n:'subscribe', k:'ng', w:{ en:'RxJS’s method: “tell me every new value”.', ar:'ميثود RxJS: «قولّي على كل قيمة جديدة».' } },
      { n:'then', k:'ng', w:{ en:'JavaScript’s Promise method: “when the file has loaded”.', ar:'ميثود الـ Promise في JavaScript: «لما الملف يخلص تحميل».' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One click, five stops', ar: 'كليك واحدة، خمس محطات' },
    lead: {
      en: 'A shop. The list page shows every product as a link. Clicking one opens that product’s page, and a button on it jumps to the next product. Follow the click:',
      ar: 'محل. صفحة الليستة بتعرض كل منتج كلينك. الكليك على واحد بيفتح صفحة المنتج ده، وفيها زرار بينقلك للمنتج اللي بعده. امشي ورا الكليك:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'products.html', lang: 'html', who: { en: 'list page · the link', ar: 'صفحة الليستة · اللينك' },
          code: ['<a [routerLink]="[\'/products\', p.id]">{{ p.name }}</a>'],
          say: { en: `The user clicks <b>Kettle</b>. ${ng('routerLink')} is Angular’s; it builds <code>/products/1</code> and changes the URL without reloading. ${pub('products')} is a URL word you invented, and ${pub('id')} is a field on your data.`,
                 ar: `المستخدم بيدوس على <b>Kettle</b>. ${ng('routerLink')} بتاع أنجولار؛ بيبني <code>/products/1</code> ويغيّر الـ URL من غير reload. ${pub('products')} كلمة URL انت اخترعتها، و${pub('id')} field في الداتا بتاعتك.` } },
        { file: 'app.routes.ts', lang: 'ts', who: { en: 'route table · the match', ar: 'جدول الـ routes · المطابقة' },
          code: ["{ path: 'products/:productId',", "  loadComponent: () => import('./pages/product-detail').then(m => m.ProductDetail) },"],
          say: { en: `The router looks for a ${ng('path')} that fits. ${pub('products')} here has <b>no</b> leading slash, but it is the same word as the link. The colon is the router’s syntax; ${pub('productId')} after it is a name you invented, and <code>1</code> goes into it.`,
                 ar: `الراوتر بيدوّر على ${ng('path')} يناسب. ${pub('products')} هنا <b>من غير</b> شرطة في الأول، بس هي نفس كلمة اللينك. النقطتين دول syntax الراوتر؛ و${pub('productId')} اللي بعدهم اسم انت اخترعته، و<code>1</code> بيتحط فيه.` } },
        { file: 'app.routes.ts', lang: 'ts', who: { en: 'route table · loads the page', ar: 'جدول الـ routes · بيحمّل الصفحة' },
          code: ["import('./pages/product-detail').then(m => m.ProductDetail)"],
          say: { en: `The page’s file is downloaded only now. ${mine('m')} is the loaded file (call it anything), and ${pub('ProductDetail')} must be exactly the class name that file exports.`,
                 ar: `ملف الصفحة بيتنزل دلوقتي بس. ${mine('m')} هو الملف اللي اتحمّل (سمّيه أي حاجة)، و${pub('ProductDetail')} لازم يبقى بالظبط اسم الكلاس اللي الملف ده بيعمله export.` } },
        { file: 'product-detail.ts', lang: 'ts', who: { en: 'product page · reads the URL', ar: 'صفحة المنتج · بتقرا الـ URL' },
          code: ['readonly productId = input.required<string>();'],
          say: { en: `Because <code>app.config.ts</code> turned on ${ng('withComponentInputBinding')}, the router copies <code>:productId</code> into the input <b>with the same name</b>. Same spelling in two files, and nothing checks it. The value is a string, because URLs are text.`,
                 ar: `عشان <code>app.config.ts</code> شغّل ${ng('withComponentInputBinding')}، الراوتر بينسخ <code>:productId</code> في الـ input <b>اللي ليه نفس الاسم</b>. نفس الكتابة في ملفين، ومحدش بيتأكد. والقيمة string، عشان الـ URLs نص.` } },
        { file: 'app.html', lang: 'html', who: { en: 'the layout · the hole', ar: 'التخطيط · الفتحة' },
          code: ['<router-outlet />'],
          say: { en: `The router draws the product page right here. ${ng('router-outlet')} is Angular’s tag. The nav bar around it stays on screen. The page’s own selector, ${mine('app-product-detail')}, is never typed anywhere: the router creates the page, not a tag.`,
                 ar: `الراوتر بيرسم صفحة المنتج هنا بالظبط. ${ng('router-outlet')} تاج أنجولار. والـ nav اللي حواليه بيفضل على الشاشة. والـ selector بتاع الصفحة نفسها، ${mine('app-product-detail')}، مش مكتوب في أي حتة: الراوتر هو اللي بيعمل الصفحة، مش تاج.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: `Link: <code>['/products', p.id]</code>. Route: <code>'products/:productId'</code>. Page: <code>productId = input()</code>. The words that must match are <b>products</b> (link and path) and <b>productId</b> (path and input). Both are yours, both are strings, and the compiler checks neither.`,
        ar: `اللينك: <code>['/products', p.id]</code>. الـ route: <code>'products/:productId'</code>. الصفحة: <code>productId = input()</code>. الكلمات اللي لازم تطابق هي <b>products</b> (اللينك والمسار) و<b>productId</b> (المسار والـ input). الاتنين بتوعك، والاتنين نصوص، والـ compiler مش بيتأكد من ولا واحد فيهم.` }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Which file?', ar: 'أنهي ملف؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'Routing spreads one feature over many files. Each piece still has exactly one home.',
      ar: 'الـ routing بيوزّع ميزة واحدة على ملفات كتير. بس كل حتة ليها بيت واحد برضه.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>{ path: \'products/:productId\', … }</code>', '<code>app.routes.ts</code>', 'you', `you pick ${pub('products')} and ${pub('productId')}; ${ng('path')} is the router’s`],
            ar: ['<code>{ path: \'products/:productId\', … }</code>', '<code>app.routes.ts</code>', 'انت', `انت بتختار ${pub('products')} و${pub('productId')}؛ و${ng('path')} بتاع الراوتر`] },
          { en: ['<code>provideRouter(routes, withComponentInputBinding())</code>', '<code>app.config.ts</code>', 'you, once', `you pick ${pub('routes')}; the rest is Angular’s`],
            ar: ['<code>provideRouter(routes, withComponentInputBinding())</code>', '<code>app.config.ts</code>', 'انت، مرة واحدة', `انت بتختار ${pub('routes')}؛ والباقي بتاع أنجولار`] },
          { en: ['<code>&lt;router-outlet /&gt;</code>', '<code>app.html</code> (the layout)', 'you, once', `Angular: ${ng('router-outlet')}`],
            ar: ['<code>&lt;router-outlet /&gt;</code>', '<code>app.html</code> (التخطيط)', 'انت، مرة واحدة', `أنجولار: ${ng('router-outlet')}`] },
          { en: ['<code>[routerLink]="[\'/products\', p.id]"</code>', 'any template with a link', 'whoever links', `${ng('routerLink')} is Angular’s; ${pub('products')} must copy the path`],
            ar: ['<code>[routerLink]="[\'/products\', p.id]"</code>', 'أي تمبلت فيه لينك', 'اللي بيعمل اللينك', `${ng('routerLink')} بتاع أنجولار؛ و${pub('products')} لازم ينسخ المسار`] },
          { en: ['<code>this.router.navigate([\'/products\', …])</code>', 'any class that navigates', 'whoever navigates', `you pick ${mine('router')}; ${ng('navigate')} is Angular’s; ${pub('products')} must copy the path`],
            ar: ['<code>this.router.navigate([\'/products\', …])</code>', 'أي كلاس بيتنقل', 'اللي بيتنقل', `انت بتختار ${mine('router')}؛ و${ng('navigate')} بتاعة أنجولار؛ و${pub('products')} لازم ينسخ المسار`] },
          { en: ['<code>readonly productId = input.required&lt;string&gt;()</code>', 'the page’s <code>.ts</code>', 'the page', `${pub('productId')} must copy the path’s <code>:productId</code>`],
            ar: ['<code>readonly productId = input.required&lt;string&gt;()</code>', '<code>.ts</code> الصفحة', 'الصفحة', `${pub('productId')} لازم ينسخ <code>:productId</code> اللي في المسار`] },
        ] },
      { t: 'ul',
        en: ['<b>The route table owns the URL words.</b> Links and <code>navigate()</code> only repeat them. When in doubt, copy the word from <code>app.routes.ts</code>.',
             '<b>A routed page is never written as a tag.</b> You do not type <code>&lt;app-product-detail&gt;</code> anywhere. The router creates it inside <code>&lt;router-outlet&gt;</code>, and hands it values through inputs.',
             '<b>Slash rule:</b> paths in the table have <b>no</b> leading slash (<code>\'products\'</code>). Links usually start with one (<code>\'/products\'</code>), which means “from the root”. Same word, different slash.'],
        ar: ['<b>جدول الـ routes هو صاحب كلمات الـ URL.</b> اللينكات و<code>navigate()</code> بيكرروها وبس. لو محتار، انسخ الكلمة من <code>app.routes.ts</code>.',
             '<b>الصفحة اللي بيجيبها الراوتر عمرها ما بتتكتب كتاج.</b> انت مش بتكتب <code>&lt;app-product-detail&gt;</code> في أي حتة. الراوتر بيعملها جوه <code>&lt;router-outlet&gt;</code>، وبيديها القيم عن طريق الـ inputs.',
             '<b>قاعدة الشرطة:</b> المسارات في الجدول <b>من غير</b> شرطة في الأول (<code>\'products\'</code>). واللينكات غالبًا بتبدأ بواحدة (<code>\'/products\'</code>)، ومعناها «من الأول خالص». نفس الكلمة، والشرطة مختلفة.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All the files, every name coloured', ar: 'كل الملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same shop, complete. Hover <code>products</code> or <code>productId</code> to see every file that has to agree. Then press <b>Rename test</b>: the URL words and the param change everywhere at once, and the router’s keys do not move.',
      ar: 'نفس المحل، كامل. قف بالماوس على <code>products</code> أو <code>productId</code> وشوف كل ملف لازم يتفق. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: كلمات الـ URL والـ param بيتغيروا في كل حتة مرة واحدة، ومفاتيح الراوتر مش بتتحرك.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'products-data.ts', lang: 'ts', tag: { en: 'the data', ar: 'الداتا' }, code: [
        'export interface Product {',
        '  id: number;',
        '  name: string;',
        '  price: number;',
        '}',
        '',
        'export const PRODUCTS: Product[] = [',
        "  { id: 1, name: 'Kettle', price: 900 },",
        "  { id: 2, name: 'Toaster', price: 1200 },",
        '];' ] },
      { t: 'code', name: 'app.routes.ts', lang: 'ts', tag: { en: 'the URL map', ar: 'خريطة الـ URL' }, code: [
        "import { Routes } from '@angular/router';",
        '',
        'export const routes: Routes = [',
        "  { path: '', pathMatch: 'full', redirectTo: 'products' },",
        '  {',
        "    path: 'products',",
        "    title: 'Products',",
        "    loadComponent: () => import('./pages/products').then(m => m.Products),",
        '  },',
        '  {',
        "    path: 'products/:productId',",
        "    loadComponent: () => import('./pages/product-detail').then(m => m.ProductDetail),",
        '  },',
        "  { path: '**', loadComponent: () => import('./pages/not-found').then(m => m.NotFound) },",
        '];' ] },
      { t: 'code', name: 'app.config.ts', lang: 'ts', tag: { en: 'switch it on', ar: 'التشغيل' }, code: [
        "import { ApplicationConfig } from '@angular/core';",
        "import { provideRouter, withComponentInputBinding } from '@angular/router';",
        "import { routes } from './app.routes';",
        '',
        'export const appConfig: ApplicationConfig = {',
        '  providers: [provideRouter(routes, withComponentInputBinding())],',
        '};' ] },
      { t: 'code', name: 'app.ts', lang: 'ts', tag: { en: 'the layout', ar: 'التخطيط' }, code: [
        "import { Component } from '@angular/core';",
        "import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';",
        '',
        '@Component({',
        "  selector: 'app-root',",
        '  imports: [RouterOutlet, RouterLink, RouterLinkActive],',
        "  templateUrl: './app.html',",
        "  styleUrl: './app.css',",
        '})',
        'export class App {}' ] },
      { t: 'code', name: 'app.html', lang: 'html', tag: { en: 'the layout', ar: 'التخطيط' }, code: [
        '<nav>',
        '  <a routerLink="/products" routerLinkActive="active">All products</a>',
        '</nav>',
        '',
        '<router-outlet />' ] },
      { t: 'code', name: 'app.css', lang: 'css', tag: { en: 'the layout', ar: 'التخطيط' }, code: [
        'a.active {',
        '  font-weight: 700;',
        '}' ] },
      { t: 'code', name: 'products.ts', lang: 'ts', tag: { en: 'list page', ar: 'صفحة الليستة' }, code: [
        "import { Component } from '@angular/core';",
        "import { RouterLink } from '@angular/router';",
        "import { PRODUCTS } from '../products-data';",
        '',
        '@Component({',
        "  selector: 'app-products',",
        '  imports: [RouterLink],',
        "  templateUrl: './products.html',",
        '})',
        'export class Products {',
        '  readonly items = PRODUCTS;',
        '}' ] },
      { t: 'code', name: 'products.html', lang: 'html', tag: { en: 'list page', ar: 'صفحة الليستة' }, code: [
        '@for (p of items; track p.id) {',
        '  <a [routerLink]="[\'/products\', p.id]">{{ p.name }}</a>',
        '}' ] },
      { t: 'code', name: 'product-detail.ts', lang: 'ts', tag: { en: 'product page', ar: 'صفحة المنتج' }, code: [
        "import { Component, computed, inject, input } from '@angular/core';",
        "import { Router, RouterLink } from '@angular/router';",
        "import { PRODUCTS } from '../products-data';",
        '',
        '@Component({',
        "  selector: 'app-product-detail',",
        '  imports: [RouterLink],',
        "  templateUrl: './product-detail.html',",
        '})',
        'export class ProductDetail {',
        '  private readonly router = inject(Router);',
        '',
        '  readonly productId = input.required<string>();   // from /products/:productId',
        '  readonly product = computed(() =>',
        '    PRODUCTS.find(p => p.id === Number(this.productId())));',
        '',
        '  showNext() {',
        "    this.router.navigate(['/products', Number(this.productId()) + 1]);",
        '  }',
        '}' ] },
      { t: 'code', name: 'product-detail.html', lang: 'html', tag: { en: 'product page', ar: 'صفحة المنتج' }, code: [
        '@if (product(); as p) {',
        '  <h1>{{ p.name }}</h1>',
        '  <p>{{ p.price }} EGP</p>',
        '} @else {',
        '  <p>Unknown id.</p>',
        '}',
        '<button (click)="showNext()">Next</button>',
        '<a routerLink="/products">Back to the list</a>' ] },
      { t: 'code', name: 'not-found.ts', lang: 'ts', tag: { en: 'the ** page', ar: 'صفحة الـ **' }, code: [
        "import { Component } from '@angular/core';",
        "import { RouterLink } from '@angular/router';",
        '',
        '@Component({',
        "  selector: 'app-not-found',",
        '  imports: [RouterLink],',
        '  template: `<p>Nothing here. <a routerLink="/products">See the products</a></p>`,',
        '})',
        'export class NotFound {}' ] },
      { t: 'nmtable' }
    ]
  },

  /* ------------------------------------------------------------ 4 */
  {
    id: 'rename',
    kicker: { en: 'Is it OK to change it?', ar: 'ينفع أغيّره؟' },
    title: { en: 'What breaks when you rename each name', ar: 'إيه اللي بيبوظ لما تغيّر كل اسم' },
    lead: {
      en: 'Class names and fields are checked by TypeScript. URL words, the param name and the CSS class are strings, and they are not. That split decides whether a forgotten rename is a red error or a quiet wrong page.',
      ar: 'أسماء الكلاسات والـ fields بيتأكد منها TypeScript. أما كلمات الـ URL واسم الـ param والـ CSS class فنصوص، ومش بيتأكد منها. والتقسيمة دي هي اللي بتحدد التغيير اللي نسيته هيبقى error أحمر ولا صفحة غلط في هدوء.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [pub('products') + ' (a URL word)', 'the path, <code>redirectTo</code>, every <code>routerLink</code> and every <code>navigate()</code>', '<b>No compile error.</b> The old link lands on the <code>**</code> page. Without a <code>**</code> route, the navigation fails with a “Cannot match any routes” error in the console.'],
            ar: [pub('products') + ' (كلمة URL)', 'المسار، و<code>redirectTo</code>، وكل <code>routerLink</code>، وكل <code>navigate()</code>', '<b>مفيش compile error.</b> اللينك القديم بيوديك على صفحة الـ <code>**</code>. ومن غير route <code>**</code>، التنقل بيفشل بـ error «Cannot match any routes» في الـ console.'] },
          { en: [pub('productId') + ' (the param)', 'the page’s input with the same name', '<b>No error.</b> The input never gets the URL’s value, so the page shows “Unknown id”.'],
            ar: [pub('productId') + ' (الـ param)', 'الـ input اللي في الصفحة بنفس الاسم', '<b>مفيش error.</b> الـ input عمره ما بياخد القيمة من الـ URL، فالصفحة بتقول «Unknown id».'] },
          { en: [pub('active') + ' (the CSS class)', 'the stylesheet', '<b>No error.</b> The current link just stops being highlighted.'],
            ar: [pub('active') + ' (الـ CSS class)', 'الـ stylesheet', '<b>مفيش error.</b> اللينك الحالي بس بيبطل يتنوّر.'] },
          { en: [`${pub('ProductDetail')}, ${pub('Products')}, ${pub('NotFound')}`, 'the <code>m.…</code> in the lazy import', 'Compile error: the loaded file has no export with the old name.'],
            ar: [`${pub('ProductDetail')}، ${pub('Products')}، ${pub('NotFound')}`, 'الـ <code>m.…</code> في الـ lazy import', 'Compile error: الملف اللي اتحمّل معندوش export بالاسم القديم.'] },
          { en: ['the file <code>pages/product-detail.ts</code>', 'the path in <code>import(\'./pages/product-detail\')</code>', 'Compile error: cannot find the module.'],
            ar: ['الملف <code>pages/product-detail.ts</code>', 'المسار في <code>import(\'./pages/product-detail\')</code>', 'Compile error: مش لاقي الـ module.'] },
          { en: [pub('routes') + ' (the table)', 'the import in <code>app.config.ts</code>', 'Compile error on the import.'],
            ar: [pub('routes') + ' (الجدول)', 'الـ import في <code>app.config.ts</code>', 'Compile error في الـ import.'] },
          { en: [`${mine('product')}, ${mine('items')}, ${mine('showNext')}`, 'the same component’s template', 'Compile error in that template.'],
            ar: [`${mine('product')}، ${mine('items')}، ${mine('showNext')}`, 'تمبلت نفس الـ component', 'Compile error في التمبلت ده.'] },
          { en: [`${mine('app-product-detail')} (a routed page’s selector)`, 'nothing: no template types it', 'Nothing breaks.'],
            ar: [`${mine('app-product-detail')} (selector صفحة بيجيبها الراوتر)`, 'ولا حاجة: مفيش تمبلت بيكتبه', 'مفيش حاجة بتبوظ.'] },
          { en: [`${ng('path')}, ${ng('loadComponent')}, ${ng('routerLink')}, ${ng('router-outlet')}, ${ng('**')}`, 'nothing: you cannot rename these', 'They are the router’s words.'],
            ar: [`${ng('path')}، ${ng('loadComponent')}، ${ng('routerLink')}، ${ng('router-outlet')}، ${ng('**')}`, 'ولا حاجة: دول مينفعش يتغيروا', 'دي كلمات الراوتر.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b>. Watch <code>products</code> change in the route table, the nav link, the list link, the Back link, the not-found link and <code>navigate()</code>, all together. Any one you would have missed by hand is a link that quietly goes to the wrong page.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b>. بص على <code>products</code> وهي بتتغير في جدول الـ routes، ولينك الـ nav، ولينك الليستة، ولينك الرجوع، ولينك صفحة not-found، و<code>navigate()</code>، كلهم مع بعض. أي واحد كنت هتنساه بإيدك هو لينك بيروح للصفحة الغلط في هدوء.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتوعك' },
    title: { en: 'The router’s words', ar: 'كلمات الراوتر' },
    lead: {
      en: 'A route is a plain object, so it is easy to think every key in it is yours. It is the other way round: the <b>keys</b> are the router’s, and the <b>values</b> are yours.',
      ar: 'الـ route مجرد object عادي، فسهل تفتكر إن كل مفتاح فيه بتاعك. الحقيقة العكس: <b>المفاتيح</b> بتاعة الراوتر، و<b>القيم</b> بتاعتك.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['The router’s word', 'What it means', 'Yours next to it'],
                ar: ['كلمة الراوتر', 'معناها', 'اللي بتاعك جنبها'] },
        rows: [
          { en: [`${ng('path')}`, 'the URL words this route matches', `the string: <code>'products/:productId'</code>`],
            ar: [`${ng('path')}`, 'كلمات الـ URL اللي الـ route ده بيطابقها', `النص: <code>'products/:productId'</code>`] },
          { en: ['<code>:</code> in a path', '“this segment is a parameter”', `the name after it: ${pub('productId')}`],
            ar: ['<code>:</code> في المسار', '«الجزء ده parameter»', `الاسم اللي بعدها: ${pub('productId')}`] },
          { en: [`${ng('**')} and <code>''</code>`, 'anything left over; the empty (home) URL', 'nothing: both are fixed'],
            ar: [`${ng('**')} و<code>''</code>`, 'أي حاجة فاضلة؛ والـ URL الفاضي (الرئيسية)', 'ولا حاجة: الاتنين ثابتين'] },
          { en: [`${ng('pathMatch')}: ${ng('full')}`, 'match the whole URL, not just its start', 'nothing: <code>full</code> or <code>prefix</code> only'],
            ar: [`${ng('pathMatch')}: ${ng('full')}`, 'طابق الـ URL كله، مش أوله بس', 'ولا حاجة: <code>full</code> أو <code>prefix</code> بس'] },
          { en: [`${ng('redirectTo')}, ${ng('title')}, ${ng('loadComponent')}`, 'redirect; browser tab text; the page to load', 'the URL word, the tab text, the file path'],
            ar: [`${ng('redirectTo')}، ${ng('title')}، ${ng('loadComponent')}`, 'تحويل؛ نص تاب المتصفح؛ الصفحة اللي تتحمّل', 'كلمة الـ URL، ونص التاب، ومسار الملف'] },
          { en: [`${ng('routerLink')}, ${ng('routerLinkActive')}, ${ng('queryParams')}`, 'a link; a class while active; the <code>?…</code> part', 'the URL, the class name, the query keys'],
            ar: [`${ng('routerLink')}، ${ng('routerLinkActive')}، ${ng('queryParams')}`, 'لينك؛ class طول ما هو active؛ جزء الـ <code>?…</code>', 'الـ URL، واسم الـ class، ومفاتيح الـ query'] },
          { en: [`${ng('Router')}, ${ng('navigate')}`, 'navigate from code', `the field name: ${mine('router')}`],
            ar: [`${ng('Router')}، ${ng('navigate')}`, 'تتنقل من الكود', `اسم الـ field: ${mine('router')}`] },
        ] },
      { t: 'p',
        en: `Two JavaScript words hide in every lazy route: <code>import()</code> loads a file, and ${ng('then')} runs when it arrives. The arrow parameter ${mine('m')} is yours; the class name after the dot is not free, because the file already exported it.`,
        ar: `فيه كلمتين JavaScript مستخبيين في كل route بيتحمّل وقت الطلب: <code>import()</code> بتحمّل ملف، و${ng('then')} بتشتغل لما يوصل. الـ parameter ${mine('m')} بتاعك؛ لكن اسم الكلاس اللي بعد النقطة مش حر، عشان الملف عامله export خلاص.` },
      { t: 'note', label: { en: 'Remember', ar: 'افتكر' },
        en: '<code>Routes</code> (capital R) is Angular’s type. <code>routes</code> (small r) is your variable, and <code>app.routes.ts</code> is just the file name the CLI chose. Three spellings, three different things.',
        ar: '<code>Routes</code> (بـ R كابيتال) الـ type بتاع أنجولار. و<code>routes</code> (بـ r صغيرة) المتغير بتاعك، و<code>app.routes.ts</code> مجرد اسم الملف اللي الـ CLI اختاره. تلات كتابات، وتلات حاجات مختلفة.' }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'The router accepts any URL word and any param name. These habits make URLs readable and stop params from colliding.',
      ar: 'الراوتر بيقبل أي كلمة URL وأي اسم param. العادات دي بتخلي الـ URLs مقروءة وبتمنع الـ params إنها تتلخبط في بعض.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['a URL word', '<code>products</code>, <code>order-history</code>', '<code>Products</code>, <code>orderHistory</code>', 'People read and share URLs. Lower case with hyphens is what most sites use.'],
            ar: ['كلمة URL', '<code>products</code>، <code>order-history</code>', '<code>Products</code>، <code>orderHistory</code>', 'الناس بتقرا الـ URLs وبتبعتها لبعض. حروف صغيرة وشرطات هو اللي أغلب المواقع بتستخدمه.'] },
          { en: ['a route param', '<code>:productId</code>, <code>:shopId</code>', '<code>:id</code> when a page could have two ids', 'The input must carry the same name. <code>productId</code> also stops you confusing it with the data’s own <code>id</code> field.'],
            ar: ['route param', '<code>:productId</code>، <code>:shopId</code>', '<code>:id</code> لما الصفحة ممكن يبقى فيها اتنين id', 'الـ input لازم ياخد نفس الاسم. و<code>productId</code> كمان بتمنعك تلخبطه مع الـ field <code>id</code> بتاع الداتا.'] },
          { en: ['a page class', '<code>ProductDetail</code> in <code>product-detail.ts</code>', '<code>ProductDetailPageComponentClass</code>', 'The current CLI generates this shape: a plain name, and a file named after it.'],
            ar: ['كلاس صفحة', '<code>ProductDetail</code> في <code>product-detail.ts</code>', '<code>ProductDetailPageComponentClass</code>', 'الـ CLI الحالي بيعمل الشكل ده: اسم بسيط، وملف متسمّي على اسمه.'] },
          { en: ['the active class', '<code>active</code>', 'a different word on every link', 'One class, styled once.'],
            ar: ['الـ class بتاعة الـ active', '<code>active</code>', 'كلمة مختلفة على كل لينك', 'class واحدة، بتستايلها مرة واحدة.'] },
          { en: ['the injected router', '<code>router</code>', '<code>r</code>, <code>nav</code>', 'Everyone reading Angular code expects <code>this.router.navigate</code>.'],
            ar: ['الراوتر اللي اتعمله inject', '<code>router</code>', '<code>r</code>، <code>nav</code>', 'أي حد بيقرا كود أنجولار متوقع <code>this.router.navigate</code>.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Three places where a name must copy another', ar: 'تلات أماكن الاسم فيها لازم ينسخ اسم تاني' },
    lead: {
      en: 'You invent the first spelling. After that, a rule forces every other place to copy it.',
      ar: 'انت بتخترع أول كتابة. وبعد كده، فيه قاعدة بتجبر كل الأماكن التانية تنسخها.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'Route param = input name', ar: 'الـ route param = اسم الـ input' }, blocks: [
        { t: 'p',
          en: `${ng('withComponentInputBinding')} matches <b>by name</b>. <code>:productId</code> in the path fills the input called ${pub('productId')}, and nothing else. Call the input <code>id</code> and it stays empty.`,
          ar: `${ng('withComponentInputBinding')} بيطابق <b>بالاسم</b>. <code>:productId</code> في المسار بيملا الـ input اللي اسمه ${pub('productId')}، ومفيش غيره. لو سمّيت الـ input <code>id</code> هيفضل فاضي.` }
      ]},
      { t: 'step', n: 'B', title: { en: 'Query key = input name', ar: 'مفتاح الـ query = اسم الـ input' }, blocks: [
        { t: 'code', name: 'app.html · with ?order', lang: 'html', tag: { en: 'the link', ar: 'اللينك' }, code: [
          '<a routerLink="/products" [queryParams]="{ order: \'price\' }">Cheapest first</a>' ] },
        { t: 'code', name: 'products.ts · with ?order', lang: 'ts', tag: { en: 'the list page', ar: 'صفحة الليستة' }, code: [
          'readonly order = input<string>();   // from ?order=price',
          'readonly items = computed(() =>',
          "  this.order() === 'price' ? [...PRODUCTS].sort((a, b) => a.price - b.price) : PRODUCTS);" ] },
        { t: 'p',
          en: `The same binding also fills inputs from the <code>?…</code> part. The key inside ${ng('queryParams')} and the input must both be ${pub('order')}. The value <code>'price'</code> is yours too, and the page compares against it.`,
          ar: `نفس الربط بيملا الـ inputs من جزء الـ <code>?…</code> كمان. المفتاح اللي جوه ${ng('queryParams')} والـ input لازم الاتنين يبقوا ${pub('order')}. والقيمة <code>'price'</code> بتاعتك برضه، والصفحة بتقارن بيها.` }
      ]},
      { t: 'step', n: 'C', title: { en: 'Lazy import = export name', ar: 'الـ lazy import = اسم الـ export' }, blocks: [
        { t: 'p',
          en: `In <code>.then(m => m.ProductDetail)</code>, ${pub('ProductDetail')} is whatever <code>product-detail.ts</code> exports. You picked it once, in the class; the route copies it. This one is checked: a mismatch is a compile error.`,
          ar: `في <code>.then(m => m.ProductDetail)</code>، ${pub('ProductDetail')} هو أي حاجة <code>product-detail.ts</code> بيعملها export. انت اخترته مرة واحدة، في الكلاس؛ والـ route بينسخه. ودي بيتأكد منها: عدم التطابق compile error.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: 'Reading the param with <code>ActivatedRoute</code>', ar: 'قراية الـ param بـ <code>ActivatedRoute</code>' },
    lead: {
      en: 'Before input binding, pages read params from <code>ActivatedRoute</code>. You will see this everywhere, and it still works. The param name is the same; it just moves into a string.',
      ar: 'قبل ربط الـ inputs، الصفحات كانت بتقرا الـ params من <code>ActivatedRoute</code>. هتشوف ده في كل حتة، ولسه شغال. اسم الـ param هو هو؛ بس بيتنقل جوه نص.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: OLDPAGE, lang: 'ts', code: [
          'export class ProductDetail implements OnInit {',
          '  product?: Product;',
          '',
          '  constructor(private route: ActivatedRoute) {}',
          '',
          '  ngOnInit() {',
          '    this.route.paramMap.subscribe(params => {',
          "      const wanted = Number(params.get('productId'));",
          '      this.product = PRODUCTS.find(p => p.id === wanted);',
          '    });',
          '  }',
          '}' ] },
        good: { name: 'product-detail.ts — today', lang: 'ts', code: [
          'export class ProductDetail {',
          '  readonly productId = input.required<string>();',
          '',
          '  readonly product = computed(() =>',
          '    PRODUCTS.find(p => p.id === Number(this.productId())));',
          '}' ] } },
      { t: 'p',
        en: `In the old version ${pub('productId')} appears as <code>params.get('productId')</code>. A typo there returns <code>null</code> silently. ${mine('route')} and ${mine('params')} are yours; ${ng('ActivatedRoute')}, ${ng('paramMap')} and ${ng('get')} are Angular’s. Old apps also switch the router on with <code>RouterModule.forRoot(routes)</code> in an NgModule instead of <code>provideRouter(routes)</code>; your <code>routes</code> array is identical.`,
        ar: `في النسخة القديمة ${pub('productId')} بيظهر كـ <code>params.get('productId')</code>. وأي غلطة إملائية هناك بترجّع <code>null</code> في صمت. ${mine('route')} و${mine('params')} بتوعك؛ و${ng('ActivatedRoute')} و${ng('paramMap')} و${ng('get')} بتوع أنجولار. والتطبيقات القديمة كمان بتشغّل الراوتر بـ <code>RouterModule.forRoot(routes)</code> في NgModule بدل <code>provideRouter(routes)</code>؛ والـ array <code>routes</code> بتاعك زي ما هي.` }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, and says nothing', ar: 'مش بيعمل حاجة، ومش بيقول حاجة' },
    title: { en: 'Mistakes that fail silently or confusingly', ar: 'غلطات بتفشل في صمت أو بشكل ملخبط' },
    lead: {
      en: 'Most routing mistakes are a string that does not match another string. The app still runs; you just end up somewhere else.',
      ar: 'أغلب غلطات الـ routing نص مش مطابق لنص تاني. التطبيق لسه شغال؛ انت بس بتلاقي نفسك في حتة تانية.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'The link and the path disagree', ar: 'اللينك والمسار مش متفقين' }, blocks: [
        { t: 'pair',
          bad:  { name: 'products.html', lang: 'html', code: ['<a [routerLink]="[\'/product\', p.id]">{{ p.name }}</a>'] },
          good: { name: 'products.html', lang: 'html', code: ['<a [routerLink]="[\'/products\', p.id]">{{ p.name }}</a>'] } },
        { t: 'p', en: 'The table says <code>products</code>; the link says <code>product</code>. No route matches, so <code>**</code> catches it and you see “Nothing here”. Copy the word from <code>app.routes.ts</code>.',
                  ar: 'الجدول بيقول <code>products</code>؛ واللينك بيقول <code>product</code>. مفيش route بيطابق، فالـ <code>**</code> بيمسكه وبتشوف «Nothing here». انسخ الكلمة من <code>app.routes.ts</code>.' }
      ]},
      { t: 'step', n: '2', title: { en: 'The input name does not match the param', ar: 'اسم الـ input مش مطابق للـ param' }, blocks: [
        { t: 'pair',
          bad:  { name: MISMATCH, lang: 'ts', code: ['readonly id = input<string>();   // the path says :productId'] },
          good: { name: 'product-detail.ts', lang: 'ts', code: ['readonly productId = input.required<string>();'] } },
        { t: 'p', en: 'The page opens, but the input is never filled from the URL, because the router looks for an input called <code>productId</code>. No error; the page shows “Unknown id” for every product.',
                  ar: 'الصفحة بتفتح، بس الـ input عمره ما بيتملي من الـ URL، عشان الراوتر بيدوّر على input اسمه <code>productId</code>. مفيش error؛ والصفحة بتقول «Unknown id» لكل منتج.' }
      ]},
      { t: 'step', n: '3', title: { en: 'A leading slash in the route table', ar: 'شرطة في أول المسار في جدول الـ routes' }, blocks: [
        { t: 'pair',
          bad:  { name: 'app.routes.ts', lang: 'ts', code: ["{ path: '/products', loadComponent: () => import('./pages/products').then(m => m.Products) },"] },
          good: { name: 'app.routes.ts', lang: 'ts', code: ["{ path: 'products', loadComponent: () => import('./pages/products').then(m => m.Products) },"] } },
        { t: 'p', en: 'This one does complain, but at runtime and in router language: in development the app stops with an invalid route configuration error saying a path cannot start with a slash. Slashes belong in links, not in paths.',
                  ar: 'دي بتشتكي فعلًا، بس وقت التشغيل وبلغة الراوتر: في الـ development التطبيق بيقف بـ error إن إعداد الـ route غلط وإن المسار مينفعش يبدأ بشرطة. الشرطات مكانها اللينكات، مش المسارات.' }
      ]},
      { t: 'step', n: '4', title: { en: '<code>RouterLink</code> missing from <code>imports</code>', ar: '<code>RouterLink</code> مش موجود في <code>imports</code>' }, blocks: [
        { t: 'pair',
          bad:  { name: 'product-detail.ts', lang: 'ts', code: ['imports: [],   // template has <a routerLink="/products">'] },
          good: { name: 'product-detail.ts', lang: 'ts', code: ['imports: [RouterLink],'] } },
        { t: 'p', en: 'Written as a plain attribute, <code>routerLink="/products"</code> is just text on the tag when <code>RouterLink</code> is not imported. The link renders and clicking it does nothing. (The bracket form <code>[routerLink]</code> does give a compile error, because Angular cannot bind to an unknown property.)',
                  ar: 'لما يتكتب كـ attribute عادي، <code>routerLink="/products"</code> مجرد نص على التاج لو <code>RouterLink</code> مش متعمله import. اللينك بيترسم والكليك عليه مش بيعمل حاجة. (أما شكل الأقواس <code>[routerLink]</code> فبيدي compile error، عشان أنجولار مايقدرش يربط property مش معروفة.)' }
      ]},
      { t: 'step', n: '5', title: { en: '<code>**</code> is not last', ar: '<code>**</code> مش آخر واحد' }, blocks: [
        { t: 'pair',
          bad:  { name: 'app.routes.ts', lang: 'ts', code: [
            "{ path: '**', loadComponent: () => import('./pages/not-found').then(m => m.NotFound) },",
            "{ path: 'products', loadComponent: () => import('./pages/products').then(m => m.Products) }," ] },
          good: { name: 'app.routes.ts', lang: 'ts', code: [
            "{ path: 'products', loadComponent: () => import('./pages/products').then(m => m.Products) },",
            "{ path: '**', loadComponent: () => import('./pages/not-found').then(m => m.NotFound) }," ] } },
        { t: 'p', en: 'The router tries routes top to bottom and stops at the first match. <code>**</code> matches everything, so nothing below it is ever reached.',
                  ar: 'الراوتر بيجرب الـ routes من فوق لتحت وبيقف عند أول مطابقة. و<code>**</code> بيطابق أي حاجة، فأي حاجة تحته عمرها ما بتتوصل.' }
      ]},
      { t: 'step', n: '6', title: { en: 'A relative link where you meant an absolute one', ar: 'لينك نسبي وانت قاصد لينك من الأول' }, blocks: [
        { t: 'pair',
          bad:  { name: 'product-detail.html', lang: 'html', code: ['<a routerLink="products">Back to the list</a>'] },
          good: { name: 'product-detail.html', lang: 'html', code: ['<a routerLink="/products">Back to the list</a>'] } },
        { t: 'p', en: 'Without the leading slash, a link inside a routed page is relative to that page: from <code>/products/1</code> it goes to <code>/products/1/products</code>, which is the <code>**</code> page. The slash means “start from the root”.',
                  ar: 'من غير الشرطة اللي في الأول، اللينك جوه صفحة جاية من الراوتر بيبقى نسبي للصفحة دي: من <code>/products/1</code> بيروح <code>/products/1/products</code>، ودي صفحة الـ <code>**</code>. الشرطة معناها «ابدأ من الأول خالص».' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it does nothing', ar: 'لما مايعملش حاجة' },
    title: { en: 'Six questions, in this order', ar: 'ست أسئلة، بالترتيب ده' },
    lead: {
      en: 'Your link “does not work”, or the page is empty. Ask these before anything else.',
      ar: 'اللينك بتاعك «مش شغال»، أو الصفحة فاضية. اسأل الأسئلة دي قبل أي حاجة.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Look at the address bar. Is the URL exactly what you expected, including the <code>/</code>s?',
                  ar: '<b>1.</b> بص على شريط العنوان. الـ URL هو بالظبط اللي كنت متوقعه، بالـ <code>/</code> بتاعته؟' },
      { t: 'chk', en: '<b>2.</b> Does a path in <code>app.routes.ts</code> spell the same words, with no leading slash, and is <code>**</code> the last route?',
                  ar: '<b>2.</b> فيه مسار في <code>app.routes.ts</code> مكتوب بنفس الكلمات، من غير شرطة في الأول، و<code>**</code> آخر route؟' },
      { t: 'chk', en: '<b>3.</b> Are <code>RouterOutlet</code> and <code>RouterLink</code> in the <code>imports</code> of the component whose template uses them?',
                  ar: '<b>3.</b> <code>RouterOutlet</code> و<code>RouterLink</code> موجودين في <code>imports</code> بتاعة الـ component اللي التمبلت بتاعه بيستخدمهم؟' },
      { t: 'chk', en: '<b>4.</b> Is the input named exactly like the <code>:param</code> (or the query key), and is <code>withComponentInputBinding()</code> inside <code>provideRouter()</code>? Without it, a required input throws when read.',
                  ar: '<b>4.</b> الـ input اسمه بالظبط زي الـ <code>:param</code> (أو مفتاح الـ query)، و<code>withComponentInputBinding()</code> جوه <code>provideRouter()</code>؟ من غيره، الـ input الـ required بيضرب لما يتقري.' },
      { t: 'chk', en: '<b>5.</b> Does the link start with <code>/</code>? If not, it is relative to the current page. Is that what you meant?',
                  ar: '<b>5.</b> اللينك بيبدأ بـ <code>/</code>؟ لو لأ، يبقى نسبي للصفحة الحالية. هو ده اللي كنت قاصده؟' },
      { t: 'chk', en: '<b>6.</b> Is the class stylesheet using the same word you gave <code>routerLinkActive</code>?',
                  ar: '<b>6.</b> الـ stylesheet بيستخدم نفس الكلمة اللي اديتها لـ <code>routerLinkActive</code>؟' }
    ]
  }
  ]
};
