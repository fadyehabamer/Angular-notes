/* ==================================================================
   HttpClient, name by name — the companion page after the http-basics
   topic. One running example (a product list loaded from a server,
   with add and delete) followed from the config line to the screen,
   with every name coloured by who owns it. The twist on this page is a
   third owner besides Angular and you: the server.
   Names list: inline below.
   ================================================================== */

/* a name in running text, coloured like the code and linked on hover */
const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

const OLDSVC = 'product.service.ts — older style';
const DTO = 'product.service.ts · renaming a server field';

export default {
  topic: 'http-basics',
  tab: 'HttpClient, name by name — The Angular Signal',
  title: { en: '<code>HttpClient</code>, name by name', ar: '<code>HttpClient</code>، اسم اسم' },
  say: {
    en: 'The page for when a request “does nothing” and you cannot tell whose name is whose. One product list followed from the config line to the screen, every name coloured: Angular’s, yours, and a third owner that surprises people, the server.',
    ar: 'الصفحة دي لما الريكويست «مش بيعمل حاجة» ومش عارف كل اسم بتاع مين. ليستة منتجات واحدة ماشيين وراها من سطر الإعدادات لحد الشاشة، وكل اسم ملوّن: بتاع أنجولار، وبتاعك، وصاحب تالت بيفاجئ الناس، السيرفر.'
  },
  lead: {
    en: 'The idea is simple: <b>a service asks the server, the component subscribes, the answer arrives later.</b> The confusing part is the names. <code>get</code> is Angular’s, <code>getAll</code> is yours, <code>subscribe</code> and <code>next</code> belong to RxJS, and the field names in your <code>Product</code> interface are not really yours at all: the server picked them. This page sorts every name by its owner.',
    ar: 'الفكرة بسيطة: <b>الـ service بتسأل السيرفر، والـ component بيعمل subscribe، والإجابة بتوصل بعدين.</b> اللي بيلخبط هو الأسماء. <code>get</code> بتاعة أنجولار، و<code>getAll</code> بتاعتك، و<code>subscribe</code> و<code>next</code> بتوع RxJS، وأسماء الـ fields في الـ interface <code>Product</code> بتاعك مش بتاعتك أصلًا: السيرفر هو اللي اختارها. الصفحة دي بتفرز كل اسم حسب صاحبه.'
  },

  names: {
    note: {
      en: 'The blue group on this page has a new member: <b>the server</b>. The JSON field names, the query parameter <code>q</code> and the URL are the backend’s choice. TypeScript cannot check them, so a mismatch compiles fine and shows up as an empty screen.',
      ar: 'المجموعة الزرقا في الصفحة دي فيها عضو جديد: <b>السيرفر</b>. أسماء الـ fields في الـ JSON، والـ query parameter <code>q</code>، والـ URL، كلها اختيار الـ backend. وTypeScript مايقدرش يتأكد منها، فعدم التطابق بيعمل compile عادي وبيظهر كشاشة فاضية.'
    },
    names: [
      /* --- shared: two files must agree --- */
      { n:'ProductService', k:'pub', w:{ en:'The service’s class. Every component that injects it types this name.', ar:'كلاس الـ service. أي component بيعملها inject بيكتب الاسم ده.' } },
      { n:'getAll', k:'pub', w:{ en:'Your service method. It wraps <code>http.get</code>; the name is free, but every caller types it.', ar:'ميثود الـ service بتاعتك. بتلف <code>http.get</code>؛ والاسم حر، بس كل اللي بيناديها بيكتبه.' } },
      { n:'create', k:'pub', w:{ en:'Your service method wrapping <code>http.post</code>.', ar:'ميثود الـ service بتاعتك اللي بتلف <code>http.post</code>.' } },
      { n:'remove', k:'pub', w:{ en:'Your service method wrapping <code>http.delete</code>.', ar:'ميثود الـ service بتاعتك اللي بتلف <code>http.delete</code>.' } },
      { n:'Product', k:'pub', re:"(?<![\\w$'-])Product(?![\\w$-])", w:{ en:'Your type for one product. Every file that imports it follows a rename. Its <b>fields</b> are the server’s.', ar:'الـ type بتاعك لمنتج واحد. أي ملف بيعمله import بيتغير معاه. أما الـ <b>fields</b> بتاعته فبتاعة السيرفر.' } },
      { n:'NewProduct', k:'pub', w:{ en:'Your type for a product that has no id yet.', ar:'الـ type بتاعك لمنتج لسه مالوش id.' } },
      { n:'Products', k:'pub', w:{ en:'The list component’s class.', ar:'كلاس الـ component بتاع الليستة.' } },
      { n:'app-products', k:'pub', w:{ en:'The list component’s selector.', ar:'الـ selector بتاع component الليستة.' } },
      { n:'appConfig', k:'pub', w:{ en:'Your app config object. <code>main.ts</code> imports it by this name.', ar:'object إعدادات تطبيقك. <code>main.ts</code> بيعمله import بالاسم ده.' } },

      /* --- yours, private to one file --- */
      { n:'http', k:'mine', re:'(?<![\\w$\\/-])http(?![\\w$-])', w:{ en:'The field you store <code>HttpClient</code> in. <code>@angular/common/http</code> is a package path, not this.', ar:'الـ field اللي بتحط فيه <code>HttpClient</code>. و<code>@angular/common/http</code> مسار package، مش ده.' } },
      { n:'base', k:'mine', w:{ en:'The service’s private field holding the URL.', ar:'الـ field الخاص بتاع الـ service اللي شايل الـ URL.' } },
      { n:'search', k:'mine', re:"(?<![\\w$'-])search(?![\\w$'-])", w:{ en:'A parameter. The component and the service each have their own; they only share the spelling.', ar:'parameter. الـ component والـ service كل واحد ليه بتاعه؛ هما بس بيشتركوا في الكتابة.' } },
      { n:'draft', k:'mine', w:{ en:'The <code>create</code> method’s parameter.', ar:'الـ parameter بتاع ميثود <code>create</code>.' } },
      { n:'productId', k:'mine', w:{ en:'A parameter, separately in the service and in the component.', ar:'parameter، في الـ service وفي الـ component كل واحد لوحده.' } },
      { n:'api', k:'mine', re:'(?<![\\w$\\/-])api(?![\\w$\\/-])', w:{ en:'The field the component stores <code>ProductService</code> in. <code>/api/</code> in the URL is the server’s path, not this.', ar:'الـ field اللي الـ component بيحط فيه <code>ProductService</code>. و<code>/api/</code> في الـ URL مسار السيرفر، مش ده.' } },
      { n:'products', k:'mine', re:'(?<![\\w$\\/-])products(?![\\w$-])', w:{ en:'The component’s signal holding the list. The <code>products</code> inside <code>/api/products</code> is the server’s.', ar:'الـ signal بتاعة الـ component اللي شايلة الليستة. و<code>products</code> اللي جوه <code>/api/products</code> بتاعة السيرفر.' } },
      { n:'failed', k:'mine', w:{ en:'The component’s signal for “the request went wrong”.', ar:'الـ signal بتاعة الـ component لـ «الطلب باظ».' } },
      { n:'load', k:'mine', w:{ en:'The component’s own method.', ar:'ميثود الـ component نفسه.' } },
      { n:'add', k:'mine', w:{ en:'The component’s own method.', ar:'ميثود الـ component نفسه.' } },
      { n:'deleteProduct', k:'mine', w:{ en:'The component’s own method. It calls the service’s <code>remove</code>.', ar:'ميثود الـ component نفسه. بتنادي <code>remove</code> بتاعة الـ service.' } },
      { n:'newName', k:'mine', w:{ en:'A parameter holding what was typed.', ar:'parameter شايل اللي اتكتب.' } },
      { n:'list', k:'mine', w:{ en:'An arrow parameter: the array that arrived, or the current array.', ar:'parameter في arrow: الـ array اللي وصلت، أو الـ array الحالية.' } },
      { n:'created', k:'mine', w:{ en:'An arrow parameter: the product the server sent back.', ar:'parameter في arrow: المنتج اللي السيرفر رجّعه.' } },
      { n:'p', k:'mine', re:'(?<![\\w$<\\/-])p(?![\\w$-])', w:{ en:'A loop variable or an arrow parameter: one product.', ar:'متغير لوب أو parameter في arrow: منتج واحد.' } },
      { n:'searchBox', k:'mine', w:{ en:'A template reference to the search input.', ar:'template reference لخانة البحث.' } },
      { n:'nameBox', k:'mine', w:{ en:'A template reference to the “new product” input.', ar:'template reference لخانة «منتج جديد».' } },
      { n:'request', k:'mine', w:{ en:'A local variable holding an observable.', ar:'متغير محلي شايل observable.' } },
      { n:'ProductDto', k:'mine', w:{ en:'A type that copies the server’s exact shape, used only inside the service.', ar:'type بينسخ شكل السيرفر بالظبط، ومستخدم جوه الـ service بس.' } },
      { n:'d', k:'mine', w:{ en:'An arrow parameter: one item as the server sent it.', ar:'parameter في arrow: عنصر واحد زي ما السيرفر بعته.' } },

      /* --- the server's --- */
      { n:'id', k:'ng', re:"(?<![\\w$-])id(?![\\w$-])", w:{ en:'<b>The server’s</b> JSON key. Not Angular’s, but not yours either: your interface must copy the server’s spelling.', ar:'مفتاح JSON <b>بتاع السيرفر</b>. مش بتاع أنجولار، بس برضه مش بتاعك: الـ interface بتاعك لازم ينسخ كتابة السيرفر.' } },
      { n:'name', k:'ng', w:{ en:'<b>The server’s</b> JSON key.', ar:'مفتاح JSON <b>بتاع السيرفر</b>.' } },
      { n:'price', k:'ng', w:{ en:'<b>The server’s</b> JSON key.', ar:'مفتاح JSON <b>بتاع السيرفر</b>.' } },
      { n:'product_name', k:'ng', w:{ en:'<b>The server’s</b> JSON key, in the server’s own style.', ar:'مفتاح JSON <b>بتاع السيرفر</b>، بأسلوب السيرفر نفسه.' } },
      { n:'q', k:'ng', w:{ en:'<b>The server’s</b> query parameter name. The backend decided it is called <code>q</code>.', ar:'اسم الـ query parameter <b>بتاع السيرفر</b>. الـ backend هو اللي قرر اسمه <code>q</code>.' } },
      { n:'/api/products', k:'ng', w:{ en:'<b>The server’s</b> address for products.', ar:'العنوان <b>بتاع السيرفر</b> للمنتجات.' } },

      /* --- Angular's, RxJS's, TypeScript's, the browser's --- */
      { n:'provideHttpClient', k:'ng', w:{ en:'Angular’s function that makes <code>HttpClient</code> injectable. Without it, injecting fails with NG0201.', ar:'الـ function بتاعة أنجولار اللي بتخلّي <code>HttpClient</code> ينفع يتعمله inject. من غيرها، الـ inject بيفشل بـ NG0201.' } },
      { n:'withFetch', k:'ng', w:{ en:'Angular’s option: send requests with the browser’s <code>fetch</code>.', ar:'إعداد من أنجولار: ابعت الطلبات بـ <code>fetch</code> بتاع المتصفح.' } },
      { n:'HttpClient', k:'ng', w:{ en:'Angular’s HTTP service.', ar:'الـ service بتاعة أنجولار للـ HTTP.' } },
      { n:'HttpParams', k:'ng', w:{ en:'Angular’s class for building a query string safely.', ar:'الكلاس بتاع أنجولار لبناء الـ query string بأمان.' } },
      { n:'get', k:'ng', w:{ en:'An <code>HttpClient</code> method: an HTTP GET.', ar:'ميثود في <code>HttpClient</code>: طلب HTTP GET.' } },
      { n:'post', k:'ng', w:{ en:'An <code>HttpClient</code> method: an HTTP POST.', ar:'ميثود في <code>HttpClient</code>: طلب HTTP POST.' } },
      { n:'delete', k:'ng', w:{ en:'An <code>HttpClient</code> method: an HTTP DELETE.', ar:'ميثود في <code>HttpClient</code>: طلب HTTP DELETE.' } },
      { n:'params', k:'ng', w:{ en:'The option key <code>HttpClient</code> reads. Because <code>{ params }</code> is shorthand for <code>{ params: params }</code>, the variable is forced to share the name.', ar:'مفتاح الإعداد اللي <code>HttpClient</code> بيقراه. وعشان <code>{ params }</code> اختصار لـ <code>{ params: params }</code>، المتغير مجبور ياخد نفس الاسم.' } },
      { n:'set', k:'ng', w:{ en:'A method of <code>HttpParams</code>, and of signals. Neither is yours.', ar:'ميثود في <code>HttpParams</code>، وفي الـ signals. ولا واحدة بتاعتك.' } },
      { n:'subscribe', k:'ng', w:{ en:'RxJS’s method. The request is sent only when something subscribes.', ar:'ميثود RxJS. الطلب بيتبعت بس لما حاجة تعمل subscribe.' } },
      { n:'next', k:'ng', w:{ en:'An observer key RxJS reads: “here is the value”.', ar:'مفتاح observer بيقراه RxJS: «خد القيمة».' } },
      { n:'error', k:'ng', re:'(?<![\\w$-])error(?=\\s*:)', w:{ en:'An observer key RxJS reads: “it failed”.', ar:'مفتاح observer بيقراه RxJS: «فشل».' } },
      { n:'pipe', k:'ng', w:{ en:'RxJS’s method for adding operators.', ar:'ميثود RxJS لإضافة operators.' } },
      { n:'map', k:'ng', w:{ en:'Two owners, neither is you: RxJS’s <code>map</code> operator and JavaScript’s array <code>map</code>.', ar:'ليها صاحبين، ومفيش فيهم انت: الـ operator <code>map</code> بتاع RxJS، و<code>map</code> بتاعة الـ array في JavaScript.' } },
      { n:'inject', k:'ng', w:{ en:'Angular’s function that hands you a service.', ar:'الـ function بتاعة أنجولار اللي بتديك service.' } },
      { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
      { n:'update', k:'ng', w:{ en:'A signal method.', ar:'ميثود بتاعة الـ signal.' } },
      { n:'filter', k:'ng', w:{ en:'JavaScript’s array method.', ar:'ميثود الـ array بتاعة JavaScript.' } },
      { n:'Omit', k:'ng', w:{ en:'TypeScript’s helper type: “this type without these keys”.', ar:'helper type من TypeScript: «الـ type ده من غير المفاتيح دي».' } },
      { n:'value', k:'ng', w:{ en:'The browser’s property on an input: what is typed in it.', ar:'الـ property بتاعة المتصفح في الـ input: اللي مكتوب فيه.' } },
      { n:'@Injectable', k:'ng', w:{ en:'Angular’s decorator for a service.', ar:'الـ decorator بتاع أنجولار للـ service.' } },
      { n:'providedIn', k:'ng', w:{ en:'An option key Angular reads.', ar:'مفتاح إعداد أنجولار بيقراه.' } },
      { n:'ApplicationConfig', k:'ng', w:{ en:'Angular’s type for the app config.', ar:'الـ type بتاع أنجولار لإعدادات التطبيق.' } },
      { n:'providers', k:'ng', w:{ en:'A config key Angular reads.', ar:'مفتاح إعداد أنجولار بيقراه.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator.', ar:'الـ decorator بتاع أنجولار.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The string after it is yours.', ar:'مفتاح إعداد. النص اللي بعده بتاعك.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key pointing at your template.', ar:'مفتاح إعداد بيشاور على التمبلت بتاعك.' } },
      { n:'@for', k:'ng', w:{ en:'Angular’s loop block.', ar:'بلوك اللوب بتاع أنجولار.' } },
      { n:'track', k:'ng', w:{ en:'Part of <code>@for</code>.', ar:'جزء من <code>@for</code>.' } },
      { n:'@empty', k:'ng', w:{ en:'Part of <code>@for</code>: shown when the list is empty.', ar:'جزء من <code>@for</code>: بيظهر لما الليستة فاضية.' } },
      { n:'@if', k:'ng', w:{ en:'Angular’s condition block.', ar:'بلوك الشرط بتاع أنجولار.' } },
      { n:'click', k:'ng', w:{ en:'The browser’s event name.', ar:'اسم الـ event بتاع المتصفح.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One search, five stops', ar: 'بحث واحد، خمس محطات' },
    lead: {
      en: 'A product list that comes from a server. The user types “kettle” and presses Search. Follow the request out and the answer back:',
      ar: 'ليستة منتجات جاية من سيرفر. المستخدم بيكتب «kettle» ويدوس Search. امشي ورا الطلب وهو خارج والإجابة وهي راجعة:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'app.config.ts', lang: 'ts', who: { en: 'once · switch it on', ar: 'مرة واحدة · التشغيل' },
          code: ['providers: [provideHttpClient(withFetch())],'],
          say: { en: `Before any of this can work, the app must provide ${ng('HttpClient')}. Every word on this line is Angular’s. You write it once and forget it.`,
                 ar: `قبل أي حاجة من دي ما تشتغل، التطبيق لازم يوفّر ${ng('HttpClient')}. كل كلمة في السطر ده بتاعة أنجولار. بتكتبه مرة وتنساه.` } },
        { file: 'product.service.ts', lang: 'ts', who: { en: 'service · builds the request', ar: 'الـ service · بتبني الطلب' },
          code: ['getAll(search: string) {', "  const params = new HttpParams().set('q', search);", '  return this.http.get<Product[]>(this.base, { params });', '}'],
          say: { en: `${pub('getAll')} is your method name; components will type it. ${ng('get')} is Angular’s. ${ng('q')} is the <b>server’s</b> name for the search text. ${mine('http')} and ${mine('base')} are your fields. And nothing has been sent yet: this only returns a <b>recipe</b> for a request.`,
                 ar: `${pub('getAll')} اسم الميثود بتاعتك؛ والـ components هتكتبه. و${ng('get')} بتاعة أنجولار. و${ng('q')} اسم <b>السيرفر</b> لنص البحث. و${mine('http')} و${mine('base')} fields بتوعك. ولسه مفيش حاجة اتبعتت: ده بيرجّع <b>وصفة</b> لطلب وبس.` } },
        { file: 'products.ts', lang: 'ts', who: { en: 'component · subscribes', ar: 'الـ component · بيعمل subscribe' },
          code: ['this.api.getAll(search).subscribe({', '  next: list => this.products.set(list),', '  error: () => this.failed.set(true),', '});'],
          say: { en: `Now the request leaves, because of ${ng('subscribe')}. ${ng('next')} and ${ng('error')} are keys RxJS looks for, so they are fixed. ${mine('list')} is whatever you want to call the answer.`,
                 ar: `دلوقتي الطلب بيخرج، بسبب ${ng('subscribe')}. و${ng('next')} و${ng('error')} مفاتيح RxJS بيدوّر عليها، فهي ثابتة. و${mine('list')} أي اسم عايز تسمّي بيه الإجابة.` } },
        { file: 'server reply (JSON)', lang: 'json', who: { en: 'the server · answers', ar: 'السيرفر · بيرد' },
          code: ['[', '  { "id": 1, "name": "Kettle", "price": 900 }', ']'],
          say: { en: `The server answers in JSON. ${ng('id')}, ${ng('name')} and ${ng('price')} are the <b>server’s</b> names. Your ${pub('Product')} interface only promises TypeScript that the answer looks like this; it cannot make the server agree.`,
                 ar: `السيرفر بيرد بـ JSON. و${ng('id')} و${ng('name')} و${ng('price')} أسماء <b>السيرفر</b>. والـ interface ${pub('Product')} بتاعك بيوعد TypeScript بس إن الإجابة شكلها كده؛ مايقدرش يخلي السيرفر يوافق.` } },
        { file: 'products.html', lang: 'html', who: { en: 'template · shows it', ar: 'التمبلت · بيعرضها' },
          code: ['@for (p of products(); track p.id) {', '  <li>{{ p.name }}: {{ p.price }} EGP</li>', '}'],
          say: { en: `The signal changed, so the list redraws. ${mine('p')} and ${mine('products')} are yours. <code>.name</code> must be the server’s spelling, or it shows nothing.`,
                 ar: `الـ signal اتغيرت، فالليستة بتترسم تاني. ${mine('p')} و${mine('products')} بتوعك. و<code>.name</code> لازم تبقى كتابة السيرفر، وإلا مش هتعرض حاجة.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'Service: <code>getAll()</code> wraps <code>http.get()</code>. Component: <code>getAll().subscribe({ next })</code>. The names two of <b>your</b> files share are the service’s class and method names. The JSON field names are shared with the <b>server</b>, and only the server can change them.',
        ar: 'الـ service: <code>getAll()</code> بتلف <code>http.get()</code>. والـ component: <code>getAll().subscribe({ next })</code>. الأسماء اللي ملفين من <b>ملفاتك</b> بيتشاركوا فيها هي اسم كلاس الـ service وأسماء الميثودز. أما أسماء الـ fields في الـ JSON فمتشاركة مع <b>السيرفر</b>، والسيرفر بس اللي يقدر يغيّرها.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Service or component?', ar: 'الـ service ولا الـ component؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'Three owners share every request: Angular (and RxJS), you, and the server. Each piece of code has one home.',
      ar: 'تلات أصحاب بيتشاركوا في كل طلب: أنجولار (وRxJS)، وانت، والسيرفر. وكل حتة كود ليها بيت واحد.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>provideHttpClient(withFetch())</code>', '<code>app.config.ts</code>', 'you, once', 'Angular'],
            ar: ['<code>provideHttpClient(withFetch())</code>', '<code>app.config.ts</code>', 'انت، مرة واحدة', 'أنجولار'] },
          { en: ['<code>getAll(search) { return this.http.get(…) }</code>', 'the service', 'you', `you pick ${pub('getAll')}, ${mine('search')}, ${mine('http')}; ${ng('get')} is Angular’s`],
            ar: ['<code>getAll(search) { return this.http.get(…) }</code>', 'الـ service', 'انت', `انت بتختار ${pub('getAll')} و${mine('search')} و${mine('http')}؛ و${ng('get')} بتاعة أنجولار`] },
          { en: ['<code>\'/api/products\'</code>, <code>\'q\'</code>', 'the service', 'you type them', `<b>the server</b>: ${ng('/api/products')}, ${ng('q')}`],
            ar: ['<code>\'/api/products\'</code>، <code>\'q\'</code>', 'الـ service', 'انت بتكتبهم', `<b>السيرفر</b>: ${ng('/api/products')}، ${ng('q')}`] },
          { en: ['<code>interface Product { id; name; price }</code>', '<code>product.ts</code>', 'you', `you pick ${pub('Product')}; <b>the server</b> picks the fields`],
            ar: ['<code>interface Product { id; name; price }</code>', '<code>product.ts</code>', 'انت', `انت بتختار ${pub('Product')}؛ و<b>السيرفر</b> بيختار الـ fields`] },
          { en: ['<code>.subscribe({ next, error })</code>', 'the component', 'you', `RxJS: ${ng('subscribe')}, ${ng('next')}, ${ng('error')}`],
            ar: ['<code>.subscribe({ next, error })</code>', 'الـ component', 'انت', `RxJS: ${ng('subscribe')} و${ng('next')} و${ng('error')}`] },
          { en: ['<code>products</code>, <code>failed</code>, <code>load()</code>', 'the component', 'you', 'you'],
            ar: ['<code>products</code>، <code>failed</code>، <code>load()</code>', 'الـ component', 'انت', 'انت'] },
        ] },
      { t: 'ul',
        en: ['<b>The service owns every URL.</b> Components never type <code>/api/…</code>; they call your method names. When the backend moves, you edit one file.',
             '<b>The service returns, the component subscribes.</b> A service method that calls <code>subscribe</code> itself leaves the component with nothing to react to.',
             '<b>The interface describes the server; it does not control it.</b> Renaming a field in <code>Product</code> does not rename it in the JSON.'],
        ar: ['<b>الـ service هي صاحبة كل URL.</b> الـ components عمرها ما بتكتب <code>/api/…</code>؛ هي بتنادي أسماء الميثودز بتاعتك. ولما الـ backend يتنقل، بتعدّل ملف واحد.',
             '<b>الـ service بترجّع، والـ component بيعمل subscribe.</b> ميثود في الـ service بتعمل <code>subscribe</code> بنفسها بتسيب الـ component من غير حاجة يتفاعل معاها.',
             '<b>الـ interface بيوصف السيرفر؛ مش بيتحكم فيه.</b> تغيير اسم field في <code>Product</code> مش بيغيّره في الـ JSON.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All five files, every name coloured', ar: 'الخمس ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same list, complete, with search, add and delete. Hover <code>getAll</code> to see it cross from service to component. Then press <b>Rename test</b> and notice what does not move: Angular’s words, RxJS’s keys, and the server’s field names.',
      ar: 'نفس الليستة، كاملة، فيها بحث وإضافة ومسح. قف بالماوس على <code>getAll</code> وشوفها بتعدّي من الـ service للـ component. وبعدين دوس <b>جرّب تغيّر الأسماء</b> وخد بالك من اللي مش بيتحرك: كلمات أنجولار، ومفاتيح RxJS، وأسماء fields السيرفر.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'app.config.ts', lang: 'ts', tag: { en: 'once', ar: 'مرة واحدة' }, code: [
        "import { ApplicationConfig } from '@angular/core';",
        "import { provideHttpClient, withFetch } from '@angular/common/http';",
        '',
        'export const appConfig: ApplicationConfig = {',
        '  providers: [provideHttpClient(withFetch())],',
        '};' ] },
      { t: 'code', name: 'product.ts', lang: 'ts', tag: { en: 'the server’s shape', ar: 'شكل السيرفر' }, code: [
        '// the field names copy the JSON the server sends',
        'export interface Product {',
        '  id: number;',
        '  name: string;',
        '  price: number;',
        '}',
        '',
        '// what you send to create one: everything except the id',
        "export type NewProduct = Omit<Product, 'id'>;" ] },
      { t: 'code', name: 'product.service.ts', lang: 'ts', tag: { en: 'the service', ar: 'الـ service' }, code: [
        "import { Injectable, inject } from '@angular/core';",
        "import { HttpClient, HttpParams } from '@angular/common/http';",
        "import { NewProduct, Product } from './product';",
        '',
        "@Injectable({ providedIn: 'root' })",
        'export class ProductService {',
        '  private readonly http = inject(HttpClient);',
        "  private readonly base = '/api/products';",
        '',
        '  getAll(search: string) {',
        "    const params = new HttpParams().set('q', search);",
        '    return this.http.get<Product[]>(this.base, { params });',
        '  }',
        '',
        '  create(draft: NewProduct) {',
        '    return this.http.post<Product>(this.base, draft);',
        '  }',
        '',
        '  remove(productId: number) {',
        "    return this.http.delete<void>(`${this.base}/${productId}`);",
        '  }',
        '}' ] },
      { t: 'code', name: 'products.ts', lang: 'ts', tag: { en: 'the component', ar: 'الـ component' }, code: [
        "import { Component, inject, signal } from '@angular/core';",
        "import { Product } from './product';",
        "import { ProductService } from './product.service';",
        '',
        '@Component({',
        "  selector: 'app-products',",
        "  templateUrl: './products.html',",
        '})',
        'export class Products {',
        '  private readonly api = inject(ProductService);',
        '',
        '  readonly products = signal<Product[]>([]);',
        '  readonly failed = signal(false);',
        '',
        '  constructor() {',
        "    this.load('');",
        '  }',
        '',
        '  load(search: string) {',
        '    this.failed.set(false);',
        '    this.api.getAll(search).subscribe({',
        '      next: list => this.products.set(list),',
        '      error: () => this.failed.set(true),',
        '    });',
        '  }',
        '',
        '  add(newName: string) {',
        '    this.api.create({ name: newName, price: 0 }).subscribe(created =>',
        '      this.products.update(list => [created, ...list]));',
        '  }',
        '',
        '  deleteProduct(productId: number) {',
        '    this.api.remove(productId).subscribe(() =>',
        '      this.products.update(list => list.filter(p => p.id !== productId)));',
        '  }',
        '}' ] },
      { t: 'code', name: 'products.html', lang: 'html', tag: { en: 'the template', ar: 'التمبلت' }, code: [
        '<input #searchBox placeholder="Search">',
        '<button (click)="load(searchBox.value)">Search</button>',
        '',
        '<input #nameBox placeholder="New product">',
        '<button (click)="add(nameBox.value)">Add</button>',
        '',
        '@if (failed()) {',
        '  <p>Something went wrong. Try again.</p>',
        '}',
        '<ul>',
        '  @for (p of products(); track p.id) {',
        '    <li>',
        '      {{ p.name }}: {{ p.price }} EGP',
        '      <button (click)="deleteProduct(p.id)">Delete</button>',
        '    </li>',
        '  } @empty {',
        '    <li>Nothing found.</li>',
        '  }',
        '</ul>' ] },
      { t: 'nmtable' }
    ]
  },

  /* ------------------------------------------------------------ 4 */
  {
    id: 'rename',
    kicker: { en: 'Is it OK to change it?', ar: 'ينفع أغيّره؟' },
    title: { en: 'What breaks when you rename each name', ar: 'إيه اللي بيبوظ لما تغيّر كل اسم' },
    lead: {
      en: 'Your own names are safe: TypeScript follows every one of them. The server’s names are the danger, because TypeScript cannot see the server.',
      ar: 'أسماءك انت في أمان: TypeScript بيتابع كل واحد فيهم. الخطر في أسماء السيرفر، عشان TypeScript مش شايف السيرفر.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [`${pub('getAll')}, ${pub('create')}, ${pub('remove')}`, 'every component that calls them', 'Compile error in the caller.'],
            ar: [`${pub('getAll')}، ${pub('create')}، ${pub('remove')}`, 'كل component بيناديهم', 'Compile error عند اللي بينادي.'] },
          { en: [pub('ProductService'), 'every <code>inject(ProductService)</code> and import', 'Compile error on the import.'],
            ar: [pub('ProductService'), 'كل <code>inject(ProductService)</code> وكل import', 'Compile error في الـ import.'] },
          { en: [`${pub('Product')}, ${pub('NewProduct')}`, 'every file that imports the type', 'Compile error on the import.'],
            ar: [`${pub('Product')}، ${pub('NewProduct')}`, 'كل ملف بيعمل import للـ type', 'Compile error في الـ import.'] },
          { en: [`a field: ${ng('id')}, ${ng('name')}, ${ng('price')}`, 'the <b>server</b> must change too, and it usually cannot', '<b>Compiles fine once your files agree.</b> At runtime the server still sends the old key, so the new one is <code>undefined</code> and the screen shows blanks.'],
            ar: [`field: ${ng('id')}، ${ng('name')}، ${ng('price')}`, '<b>السيرفر</b> لازم يتغير هو كمان، وغالبًا مش هيقدر', '<b>بيعمل compile عادي أول ما ملفاتك تتفق.</b> ووقت التشغيل السيرفر لسه بيبعت المفتاح القديم، فالجديد بيبقى <code>undefined</code> والشاشة بتعرض فراغات.'] },
          { en: [`the query name ${ng('q')}`, 'nothing on your side: the server decides', '<b>No error.</b> Most servers ignore a parameter they do not know, so you get the unfiltered list.'],
            ar: [`اسم الـ query ${ng('q')}`, 'ولا حاجة عندك: السيرفر هو اللي بيقرر', '<b>مفيش error.</b> أغلب السيرفرات بتتجاهل parameter مش عارفاه، فبترجعلك الليستة كلها من غير فلترة.'] },
          { en: [`the URL ${ng('/api/products')}`, 'nothing on your side: the server decides', 'A runtime error from the server, usually 404. Your <code>error</code> callback runs.'],
            ar: [`الـ URL ${ng('/api/products')}`, 'ولا حاجة عندك: السيرفر هو اللي بيقرر', 'runtime error من السيرفر، غالبًا 404. والـ callback بتاع <code>error</code> بيشتغل.'] },
          { en: [`${mine('http')}, ${mine('base')}, ${mine('api')}`, 'every <code>this.…</code> in the same class', 'Compile error inside the class.'],
            ar: [`${mine('http')}، ${mine('base')}، ${mine('api')}`, 'كل <code>this.…</code> في نفس الكلاس', 'Compile error جوه الكلاس.'] },
          { en: [`${mine('products')}, ${mine('failed')}, ${mine('load')}, ${mine('add')}, ${mine('deleteProduct')}`, 'the component’s template', 'Compile error in the template.'],
            ar: [`${mine('products')}، ${mine('failed')}، ${mine('load')}، ${mine('add')}، ${mine('deleteProduct')}`, 'تمبلت الـ component', 'Compile error في التمبلت.'] },
          { en: [`the variable ${ng('params')}`, '<code>{ params }</code> must become <code>{ params: yourName }</code>', 'Compile error: no value in scope for the shorthand property.'],
            ar: [`المتغير ${ng('params')}`, '<code>{ params }</code> لازم تبقى <code>{ params: yourName }</code>', 'Compile error: مفيش قيمة للـ shorthand property.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b>. <code>getAll</code> changes in both the service and the component. <code>id</code>, <code>name</code> and <code>price</code> do not move, and neither does <code>q</code>: they are the server’s, so a real rename has to start on the backend.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b>. <code>getAll</code> بتتغير في الـ service وفي الـ component الاتنين. أما <code>id</code> و<code>name</code> و<code>price</code> فمش بيتحركوا، ولا <code>q</code>: دول بتوع السيرفر، فأي تغيير حقيقي لازم يبدأ من الـ backend.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتوعك' },
    title: { en: 'The fixed names: Angular, RxJS and the server', ar: 'الأسماء الثابتة: أنجولار وRxJS والسيرفر' },
    lead: {
      en: 'Three different owners, three different reasons a name cannot change.',
      ar: 'تلات أصحاب مختلفين، وتلات أسباب مختلفة إن الاسم مايتغيرش.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Owner', 'Names', 'Why you cannot rename them'], ar: ['الصاحب', 'الأسماء', 'ليه متقدرش تغيّرهم'] },
        rows: [
          { en: ['Angular', `${ng('HttpClient')}, ${ng('get')}, ${ng('post')}, ${ng('delete')} (also <code>put</code>, <code>patch</code>), ${ng('HttpParams')}, ${ng('provideHttpClient')}, ${ng('withFetch')}, the option key ${ng('params')}`, 'They are Angular’s API. The method names match the HTTP verbs: <code>get</code> sends GET, <code>post</code> sends POST.'],
            ar: ['أنجولار', `${ng('HttpClient')}، ${ng('get')}، ${ng('post')}، ${ng('delete')} (وكمان <code>put</code> و<code>patch</code>)، ${ng('HttpParams')}، ${ng('provideHttpClient')}، ${ng('withFetch')}، ومفتاح الإعداد ${ng('params')}`, 'دي API أنجولار. وأسماء الميثودز هي نفس أفعال الـ HTTP: <code>get</code> بتبعت GET، و<code>post</code> بتبعت POST.'] },
          { en: ['RxJS', `${ng('subscribe')}, ${ng('next')}, ${ng('error')} (and <code>complete</code>), ${ng('pipe')}, ${ng('map')}`, 'RxJS looks for exactly these keys in the object you pass to <code>subscribe</code>.'],
            ar: ['RxJS', `${ng('subscribe')}، ${ng('next')}، ${ng('error')} (و<code>complete</code>)، ${ng('pipe')}، ${ng('map')}`, 'RxJS بيدوّر على المفاتيح دي بالظبط في الـ object اللي بتبعته لـ <code>subscribe</code>.'] },
          { en: ['The server', `${ng('/api/products')}, ${ng('q')}, ${ng('id')}, ${ng('name')}, ${ng('price')}`, 'They are decided by whoever wrote the backend. Your code only copies them.'],
            ar: ['السيرفر', `${ng('/api/products')}، ${ng('q')}، ${ng('id')}، ${ng('name')}، ${ng('price')}`, 'اللي كتب الـ backend هو اللي قررهم. والكود بتاعك بينسخهم وبس.'] },
        ] },
      { t: 'p',
        en: 'A trailing <code>$</code>, as in <code>products$</code>, is not a rule of any of these owners. It is a habit people use to mark “this is an observable”. Angular does not read it.',
        ar: 'الـ <code>$</code> اللي في الآخر، زي <code>products$</code>، مش قاعدة عند أي حد من الأصحاب دول. دي عادة الناس بتستخدمها عشان تعلّم «ده observable». وأنجولار مش بيقراها.' }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'Your service method names are the only HTTP names most of your app ever sees. Make them read well from the component side.',
      ar: 'أسماء الميثودز في الـ service بتاعتك هي أسماء الـ HTTP الوحيدة اللي أغلب تطبيقك بيشوفها. خليها تتقري كويس من ناحية الـ component.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['service methods', '<code>getAll</code>, <code>getOne</code>, <code>create</code>, <code>remove</code>', '<code>httpGet</code>, <code>callApi</code>, <code>doRequest</code>', 'Name what the caller gets or changes. The component should not care that it is HTTP.'],
            ar: ['ميثودز الـ service', '<code>getAll</code>، <code>getOne</code>، <code>create</code>، <code>remove</code>', '<code>httpGet</code>، <code>callApi</code>، <code>doRequest</code>', 'سمّي اللي اللي بينادي هياخده أو هيغيّره. الـ component مش المفروض يهمه إنه HTTP.'] },
          { en: ['the service class', '<code>ProductService</code>, <code>ProductsApi</code>', '<code>HttpService</code>, <code>DataService</code>', 'One service per kind of data. A generic name ends up holding every URL in the app.'],
            ar: ['كلاس الـ service', '<code>ProductService</code>، <code>ProductsApi</code>', '<code>HttpService</code>، <code>DataService</code>', 'service لكل نوع داتا. والاسم العام بيخلص إنه شايل كل URL في التطبيق.'] },
          { en: ['the injected client', '<code>http</code>', '<code>httpClient</code>, <code>h</code>', 'Short and universal: every Angular reader expects <code>this.http.get</code>.'],
            ar: ['الـ client اللي اتعمله inject', '<code>http</code>', '<code>httpClient</code>، <code>h</code>', 'قصير ومعروف: أي حد بيقرا أنجولار متوقع <code>this.http.get</code>.'] },
          { en: ['interface fields', 'exactly what the JSON says, even <code>product_name</code>', 'a “nicer” name the server does not send', 'If you want nicer names, map them in the service (next section).'],
            ar: ['fields الـ interface', 'بالظبط اللي الـ JSON بيقوله، حتى لو <code>product_name</code>', 'اسم «أحلى» السيرفر مش بيبعته', 'لو عايز أسماء أحلى، اعمل لها map في الـ service (الجزء اللي جاي).'] },
          { en: ['an observable you store', '<code>products$</code>', 'the same name as the signal', 'The <code>$</code> habit tells readers to subscribe, not to call.'],
            ar: ['observable بتخزّنه', '<code>products$</code>', 'نفس اسم الـ signal', 'عادة الـ <code>$</code> بتقول للي بيقرا يعمل subscribe، مش ينادي.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Three places where the name is not free', ar: 'تلات أماكن الاسم فيها مش براحتك' },
    lead: {
      en: 'Each of these looks like a name you chose. Each one is forced.',
      ar: 'كل واحد من دول شكله اسم انت اخترته. وكل واحد فيهم مجبور.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'The <code>{ params }</code> shorthand', ar: 'اختصار <code>{ params }</code>' }, blocks: [
        { t: 'p',
          en: `<code>{ params }</code> means <code>{ params: params }</code>. The key must be ${ng('params')} because ${ng('HttpClient')} reads that key, and the shorthand makes your variable copy it. Want a different variable name? Write the key out: <code>{ params: query }</code>.`,
          ar: `<code>{ params }</code> معناها <code>{ params: params }</code>. المفتاح لازم يبقى ${ng('params')} عشان ${ng('HttpClient')} بيقرا المفتاح ده، والاختصار بيخلي المتغير بتاعك ينسخه. عايز اسم متغير تاني؟ اكتب المفتاح صريح: <code>{ params: query }</code>.` }
      ]},
      { t: 'step', n: 'B', title: { en: 'Interface fields copy the JSON', ar: 'fields الـ interface بتنسخ الـ JSON' }, blocks: [
        { t: 'p',
          en: 'If the server sends <code>product_name</code>, your interface must say <code>product_name</code>. To use your own name in the rest of the app, keep the server’s shape in a private type and translate it once, in the service:',
          ar: 'لو السيرفر بيبعت <code>product_name</code>، الـ interface بتاعك لازم يقول <code>product_name</code>. وعشان تستخدم اسمك انت في باقي التطبيق، خلي شكل السيرفر في type خاص وترجمه مرة واحدة، في الـ service:' },
        { t: 'code', name: DTO, lang: 'ts', tag: { en: 'translate once', ar: 'ترجم مرة واحدة' }, code: [
          'interface ProductDto { id: number; product_name: string; price: number; }',
          '',
          'getAll(search: string) {',
          "  const params = new HttpParams().set('q', search);",
          '  return this.http.get<ProductDto[]>(this.base, { params }).pipe(',
          '    map(list => list.map(d => ({ id: d.id, name: d.product_name, price: d.price }))),',
          '  );',
          '}' ] },
        { t: 'p',
          en: `Now ${mine('ProductDto')} and ${ng('product_name')} live only in the service. Components keep using ${pub('Product')} with <code>name</code>. You chose the translation; the server still chose its own key.`,
          ar: `دلوقتي ${mine('ProductDto')} و${ng('product_name')} عايشين جوه الـ service بس. والـ components بتفضل تستخدم ${pub('Product')} بـ <code>name</code>. انت اخترت الترجمة؛ والسيرفر لسه هو اللي اختار مفتاحه.` }
      ]},
      { t: 'step', n: 'C', title: { en: 'The observer keys', ar: 'مفاتيح الـ observer' }, blocks: [
        { t: 'p',
          en: `In <code>subscribe({ next: …, error: … })</code> the keys must be ${ng('next')}, ${ng('error')} or <code>complete</code>. RxJS only calls those three. The function <b>inside</b> each key is yours, and so are its parameter names, like ${mine('list')}.`,
          ar: `في <code>subscribe({ next: …, error: … })</code> المفاتيح لازم تبقى ${ng('next')} أو ${ng('error')} أو <code>complete</code>. RxJS بينادي التلاتة دول بس. والـ function اللي <b>جوه</b> كل مفتاح بتاعتك، وكمان أسماء الـ parameters بتاعتها، زي ${mine('list')}.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: 'Constructor injection and <code>HttpClientModule</code>', ar: 'الـ inject في الـ constructor و<code>HttpClientModule</code>' },
    lead: {
      en: 'Older services receive <code>HttpClient</code> through the constructor, and older apps switch HTTP on with <code>HttpClientModule</code>, which is now deprecated. The method names and the server’s names are identical.',
      ar: 'الـ services الأقدم بتاخد <code>HttpClient</code> عن طريق الـ constructor، والتطبيقات الأقدم بتشغّل الـ HTTP بـ <code>HttpClientModule</code>، واللي بقى deprecated. وأسماء الميثودز وأسماء السيرفر زي ما هي.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: OLDSVC, lang: 'ts', code: [
          '@Injectable({ providedIn: \'root\' })',
          'export class ProductService {',
          '  constructor(private http: HttpClient) {}',
          '',
          '  getAll(search: string) {',
          "    const params = new HttpParams().set('q', search);",
          '    return this.http.get<Product[]>(\'/api/products\', { params });',
          '  }',
          '}',
          '',
          '// app.module.ts:  imports: [BrowserModule, HttpClientModule]' ] },
        good: { name: 'product.service.ts — today', lang: 'ts', code: [
          '@Injectable({ providedIn: \'root\' })',
          'export class ProductService {',
          '  private readonly http = inject(HttpClient);',
          '',
          '  getAll(search: string) {',
          "    const params = new HttpParams().set('q', search);",
          '    return this.http.get<Product[]>(\'/api/products\', { params });',
          '  }',
          '}',
          '',
          '// app.config.ts:  providers: [provideHttpClient()]' ] } },
      { t: 'p',
        en: `In <code>constructor(private http: HttpClient)</code>, ${mine('http')} is still your name and ${ng('HttpClient')} is still Angular’s. The only difference is where the line sits. Every call after it reads <code>this.http</code> in both styles.`,
        ar: `في <code>constructor(private http: HttpClient)</code>، ${mine('http')} لسه اسمك و${ng('HttpClient')} لسه بتاع أنجولار. الفرق الوحيد مكان السطر. وكل نداء بعده بيقرا <code>this.http</code> في الأسلوبين.` }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, and says nothing', ar: 'مش بيعمل حاجة، ومش بيقول حاجة' },
    title: { en: 'Mistakes that fail silently or confusingly', ar: 'غلطات بتفشل في صمت أو بشكل ملخبط' },
    lead: {
      en: 'HTTP bugs hide in two places: the request that never leaves, and the answer whose names do not match. Keep the browser’s Network tab open while you read these.',
      ar: 'باجات الـ HTTP بتستخبى في مكانين: الطلب اللي عمره ما بيخرج، والإجابة اللي أسماءها مش مطابقة. خلي تاب الـ Network في المتصفح مفتوح وانت بتقرا دول.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'No subscribe, no request', ar: 'مفيش subscribe، مفيش طلب' }, blocks: [
        { t: 'pair',
          bad:  { name: 'products.ts', lang: 'ts', code: ['deleteProduct(productId: number) {', '  this.api.remove(productId);', '}'] },
          good: { name: 'products.ts', lang: 'ts', code: ['deleteProduct(productId: number) {', '  this.api.remove(productId).subscribe(() => { /* … */ });', '}'] } },
        { t: 'p', en: '<code>remove()</code> returns a recipe. Nothing reads it, so nothing is sent. The Network tab stays empty and the product is still there after a refresh.',
                  ar: '<code>remove()</code> بترجّع وصفة. محدش بيقراها، فمفيش حاجة بتتبعت. تاب الـ Network بيفضل فاضي والمنتج لسه موجود بعد الـ refresh.' }
      ]},
      { t: 'step', n: '2', title: { en: 'A field name the server does not send', ar: 'اسم field السيرفر مش بيبعته' }, blocks: [
        { t: 'pair',
          bad:  { name: 'product.ts', lang: 'ts', code: ['export interface Product {', '  id: number;', '  title: string;   // the JSON says "name"', '  price: number;', '}'] },
          good: { name: 'product.ts', lang: 'ts', code: ['export interface Product {', '  id: number;', '  name: string;', '  price: number;', '}'] } },
        { t: 'p', en: 'TypeScript believes you, so <code>{{ p.title }}</code> compiles. At runtime the object has <code>name</code>, not <code>title</code>, and every row shows a blank. Open the response in the Network tab and copy the keys from there.',
                  ar: 'TypeScript بيصدّقك، فـ <code>{{ p.title }}</code> بتعمل compile. ووقت التشغيل الـ object فيه <code>name</code> مش <code>title</code>، وكل صف بيعرض فراغ. افتح الـ response في تاب الـ Network وانسخ المفاتيح من هناك.' }
      ]},
      { t: 'step', n: '3', title: { en: 'Treating the recipe as the data', ar: 'إنك تعامل الوصفة كأنها الداتا' }, blocks: [
        { t: 'pair',
          bad:  { name: 'products.ts', lang: 'ts', code: ["this.products.set(this.api.getAll(''));"] },
          good: { name: 'products.ts', lang: 'ts', code: ["this.api.getAll('').subscribe(list => this.products.set(list));"] } },
        { t: 'p', en: 'This one is a compile error, but a confusing one: an <code>Observable&lt;Product[]&gt;</code> is not assignable to <code>Product[]</code>. It means: you passed the recipe, not the answer. The answer only exists inside <code>subscribe</code>.',
                  ar: 'دي compile error، بس ملخبط: <code>Observable&lt;Product[]&gt;</code> مينفعش يتحط مكان <code>Product[]</code>. ومعناه: انت بعت الوصفة، مش الإجابة. والإجابة موجودة بس جوه <code>subscribe</code>.' }
      ]},
      { t: 'step', n: '4', title: { en: 'Two subscribes, two requests', ar: 'اتنين subscribe، اتنين طلبات' }, blocks: [
        { t: 'pair',
          bad:  { name: 'products.ts', lang: 'ts', code: [
            "const request = this.api.getAll('');",
            'request.subscribe(list => this.products.set(list));',
            'request.subscribe(list => console.log(list.length));' ] },
          good: { name: 'products.ts', lang: 'ts', code: [
            "this.api.getAll('').subscribe(list => {",
            '  this.products.set(list);',
            '  console.log(list.length);',
            '});' ] } },
        { t: 'p', en: 'Every <code>subscribe</code> runs the recipe again, so the server gets the same GET twice. Nothing looks wrong on screen. Subscribe once and do everything inside.',
                  ar: 'كل <code>subscribe</code> بيشغّل الوصفة من الأول، فالسيرفر بياخد نفس الـ GET مرتين. ومفيش حاجة باينة غلط على الشاشة. اعمل subscribe مرة واحدة واعمل كل حاجة جواها.' }
      ]},
      { t: 'step', n: '5', title: { en: 'A query name the server does not know', ar: 'اسم query السيرفر مش عارفه' }, blocks: [
        { t: 'pair',
          bad:  { name: 'product.service.ts', lang: 'ts', code: ["const params = new HttpParams().set('search', search);"] },
          good: { name: 'product.service.ts', lang: 'ts', code: ["const params = new HttpParams().set('q', search);"] } },
        { t: 'p', en: 'The request goes out as <code>?search=kettle</code>, but this server reads <code>?q=</code>. Most servers ignore the unknown parameter and return everything. The search box “does nothing”. The API’s docs, not your taste, decide this name.',
                  ar: 'الطلب بيخرج <code>?search=kettle</code>، بس السيرفر ده بيقرا <code>?q=</code>. وأغلب السيرفرات بتتجاهل الـ parameter اللي مش عارفاه وبترجّع كل حاجة. وخانة البحث «مش بتعمل حاجة». docs الـ API، مش ذوقك، هي اللي بتقرر الاسم ده.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it does nothing', ar: 'لما مايعملش حاجة' },
    title: { en: 'Six questions, in this order', ar: 'ست أسئلة، بالترتيب ده' },
    lead: {
      en: 'Your request “does not work”. Open the browser’s Network tab, then ask these.',
      ar: 'الطلب بتاعك «مش شغال». افتح تاب الـ Network في المتصفح، وبعدين اسأل دول.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Is there a request in the Network tab at all? If not, nothing subscribed.',
                  ar: '<b>1.</b> فيه طلب في تاب الـ Network أصلًا؟ لو لأ، يبقى محدش عمل subscribe.' },
      { t: 'chk', en: '<b>2.</b> Does the app throw NG0201 about <code>HttpClient</code>? Then <code>provideHttpClient()</code> is missing from <code>app.config.ts</code>.',
                  ar: '<b>2.</b> التطبيق بيرمي NG0201 عن <code>HttpClient</code>؟ يبقى <code>provideHttpClient()</code> ناقصة في <code>app.config.ts</code>.' },
      { t: 'chk', en: '<b>3.</b> Is the URL and the query string exactly what the API expects (<code>/api/products?q=…</code>)? What status came back?',
                  ar: '<b>3.</b> الـ URL والـ query string بالظبط اللي الـ API مستنيه (<code>/api/products?q=…</code>)؟ ورجع status إيه؟' },
      { t: 'chk', en: '<b>4.</b> Open the response. Do its keys match your interface letter for letter, including case and underscores?',
                  ar: '<b>4.</b> افتح الـ response. المفاتيح بتاعته مطابقة للـ interface بتاعك حرف بحرف، بالـ capital والـ underscores؟' },
      { t: 'chk', en: '<b>5.</b> Do you have an <code>error</code> callback? Without one, a failed request shows nothing on screen, only in the console.',
                  ar: '<b>5.</b> عندك callback لـ <code>error</code>؟ من غيره، الطلب الفاشل مش بيبان على الشاشة، في الـ console بس.' },
      { t: 'chk', en: '<b>6.</b> Is the result written somewhere the template reads, like <code>this.products.set(list)</code>?',
                  ar: '<b>6.</b> النتيجة بتتكتب في حتة التمبلت بيقراها، زي <code>this.products.set(list)</code>؟' }
    ]
  }
  ]
};
