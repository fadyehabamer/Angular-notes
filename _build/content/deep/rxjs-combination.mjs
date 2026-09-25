/* ==================================================================
   forkJoin & combineLatest, name by name — a companion page after the
   RxJS combination topic. One running example (a product page: load
   once, filter live, save a search) followed through every file, with
   every name coloured by who owns it. Names list: inline.
   ================================================================== */

/* a name in running text, coloured like the code and linked on hover */
const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

/* a field name, but never inside quotes ('price' is a Sort value, not the field) */
const FIELD = n => `(?<![\\w$'/-])${n}(?![\\w$'-])`;

export default {
  topic: 'rxjs-combination',
  tab: 'forkJoin & combineLatest, name by name — The Angular Signal',
  title: { en: '<code>forkJoin</code> and <code>combineLatest</code>, name by name', ar: '<code>forkJoin</code> و<code>combineLatest</code>، اسم اسم' },
  say: {
    en: 'The page for when <code>([, f])</code> and <code>{ me, categories }</code> look like a puzzle. One product page followed from the keyboard to the server and back, every name coloured, and the rule that decides every one of them: <b>keys come back by name, arrays come back by position</b>.',
    ar: 'الصفحة دي للي شايف <code>([, f])</code> و<code>{ me, categories }</code> فزورة. صفحة منتجات واحدة ماشيين وراها من الكيبورد للسيرفر ورجوع، وكل اسم ملوّن، والقاعدة اللي بتحدد كل واحد فيهم: <b>المفاتيح بترجع بالاسم، والـ arrays بترجع بالترتيب</b>.'
  },
  lead: {
    en: 'The idea: <b>you have several streams and want one answer.</b> <code>forkJoin</code> waits for all of them to finish, <code>combineLatest</code> answers again whenever any of them changes, and <code>withLatestFrom</code> lets one of them decide when. The confusing part is the names on the way out: object keys you invented, tuple slots you name however you like, a leading comma that skips a slot, and query keys that belong to the server. This page shows who owns each one.',
    ar: 'الفكرة: <b>عندك كذا stream وعايز إجابة واحدة.</b> <code>forkJoin</code> بتستنى كلهم يخلصوا، و<code>combineLatest</code> بترد تاني كل ما أي واحد فيهم يتغير، و<code>withLatestFrom</code> بتخلي واحد منهم هو اللي يقرر إمتى. اللي بيلخبط هو الأسماء وهي خارجة: مفاتيح object انت ألّفتها، وخانات tuple بتسمّيها زي ما تحب، وفاصلة في الأول بتنط خانة، ومفاتيح query بتاعة السيرفر. الصفحة دي بتوريك مين صاحب كل واحد.'
  },

  names: {
    note: {
      en: 'The joiners are RxJS’s, so they are blue. The orange ones are your types, fields and service methods, shared by several files. Watch the green ones in the component: the <code>forkJoin</code> keys (<code>me</code>, <code>categories</code>) are read back by name, while the tuple names (<code>search</code>, <code>sort</code> inside <code>([search, sort])</code>) only borrow a position. The server’s query keys, <code>q</code> and the one in <code>sort: f.sort</code>, are not listed at all: they are not yours to rename.',
      ar: 'الحاجات اللي بتجمع بتاعة RxJS، فهي زرقا. البرتقاني هو الأنواع والحقول وميثودز السيرفس بتاعتك، ومتشاركين بين كذا ملف. بص على الأخضر في الـ component: مفاتيح الـ <code>forkJoin</code> (<code>me</code> و<code>categories</code>) بتتقري تاني بالاسم، أما أسماء الـ tuple (<code>search</code> و<code>sort</code> جوه <code>([search, sort])</code>) فهي بتستلف مكان بس. ومفاتيح الـ query بتاعة السيرفر، <code>q</code> واللي في <code>sort: f.sort</code>، مش في الليستة خالص: مش بتاعتك عشان تغيّرها.'
    },
    names: [
      /* --- shared --- */
      { n:'ShopApi', k:'pub', w:{ en:'Your service class. The component injects it by this name.', ar:'كلاس السيرفس بتاعك. الـ component بيعمله inject بالاسم ده.' } },
      { n:'currentUser', k:'pub', w:{ en:'A service method the component calls.', ar:'ميثود في السيرفس الـ component بيناديها.' } },
      { n:'listCategories', k:'pub', w:{ en:'A service method the component calls.', ar:'ميثود في السيرفس الـ component بيناديها.' } },
      { n:'findProducts', k:'pub', w:{ en:'A service method the component calls with the filters.', ar:'ميثود في السيرفس الـ component بيناديها بالفلاتر.' } },
      { n:'saveSearch', k:'pub', w:{ en:'A service method the component calls on Save.', ar:'ميثود في السيرفس الـ component بيناديها لما يتداس Save.' } },
      { n:'Sort', k:'pub', w:{ en:'Your type: the allowed sort values. The component imports it.', ar:'النوع بتاعك: قيم الترتيب المسموحة. الـ component بيعمله import.' } },
      { n:'User', k:'pub', w:{ en:'Your data type.', ar:'نوع الداتا بتاعك.' } },
      { n:'Category', k:'pub', w:{ en:'Your data type.', ar:'نوع الداتا بتاعك.' } },
      { n:'Product', k:'pub', w:{ en:'Your data type.', ar:'نوع الداتا بتاعك.' } },
      { n:'Filters', k:'pub', w:{ en:'Your type for what the page filters by.', ar:'النوع بتاعك للي الصفحة بتفلتر بيه.' } },
      { n:'search', k:'pub', only:['ts'], re: FIELD('search'),
        w:{ en:'A field on <code>Filters</code>. In <code>([search, sort]) =&gt; ({ search, sort })</code> the tuple name is also the key, so they move together. Not <code>search$</code>, which is a different name.',
            ar:'field في <code>Filters</code>. في <code>([search, sort]) =&gt; ({ search, sort })</code> اسم الـ tuple هو نفسه المفتاح، فبيتحركوا مع بعض. مش <code>search$</code>، ده اسم تاني.' } },
      { n:'sort', k:'pub', re:"(?<![\\w$'/-])sort(?![\\w$'-])(?!:\\s*(?:f|this)\\.)",
        w:{ en:'A field on <code>Filters</code>. The <code>sort:</code> key sent to the server is the server’s, and is not this.',
            ar:'field في <code>Filters</code>. ومفتاح <code>sort:</code> اللي رايح للسيرفر بتاع السيرفر، ومش هو ده.' } },
      { n:'name', k:'pub', re: FIELD('name'), w:{ en:'A field on <code>User</code>. <code>\'name\'</code> in quotes is a <code>Sort</code> value, not this.', ar:'field في <code>User</code>. و<code>\'name\'</code> اللي بين علامات تنصيص قيمة من <code>Sort</code>، مش هو.' } },
      { n:'price', k:'pub', re: FIELD('price'), w:{ en:'A field on <code>Product</code>. <code>\'price\'</code> in quotes is a <code>Sort</code> value.', ar:'field في <code>Product</code>. و<code>\'price\'</code> بين علامات تنصيص قيمة من <code>Sort</code>.' } },
      { n:'id', k:'pub', w:{ en:'A field on your types, used by <code>track</code>.', ar:'field في الأنواع بتاعتك، و<code>track</code> بيستخدمه.' } },
      { n:'title', k:'pub', w:{ en:'A field on your types, shown by the template.', ar:'field في الأنواع بتاعتك، والتمبلت بيعرضه.' } },
      { n:'Products', k:'pub', w:{ en:'The component’s class.', ar:'كلاس الـ component.' } },
      { n:'app-products', k:'pub', w:{ en:'The selector. A parent template types this tag.', ar:'الـ selector. تمبلت الأب بيكتب التاج ده.' } },

      /* --- yours, private --- */
      { n:'api', k:'mine', re:'(?<![\\w$/-])api(?![\\w$/-])', w:{ en:'Your field for the injected service. <code>/api/</code> in a URL is the server’s.', ar:'الـ field بتاعك للسيرفس. و<code>/api/</code> في الـ URL بتاع السيرفر.' } },
      { n:'http', k:'mine', re:'(?<![\\w$/-])http(?![\\w$-])', w:{ en:'Your field for the injected <code>HttpClient</code>.', ar:'الـ field بتاعك للـ <code>HttpClient</code>.' } },
      { n:'search$', k:'mine', as:'okra$', w:{ en:'Your stream of typed text. Its template pushes into it.', ar:'الـ stream بتاعك للنص اللي بيتكتب. التمبلت بتاعه بيحط فيه.' } },
      { n:'sort$', k:'mine', as:'fig$', w:{ en:'Your stream of sort choices.', ar:'الـ stream بتاعك لاختيارات الترتيب.' } },
      { n:'saveClicks$', k:'mine', as:'leek$', w:{ en:'Your stream of Save clicks: the one that drives <code>withLatestFrom</code>.', ar:'الـ stream بتاعك لكليكات Save: هو اللي بيحرّك <code>withLatestFrom</code>.' } },
      { n:'filters$', k:'mine', as:'yam$', w:{ en:'Your combined stream of the current filters.', ar:'الـ stream المجمّع بتاعك للفلاتر الحالية.' } },
      { n:'start', k:'mine', w:{ en:'Your signal holding the <code>forkJoin</code> result.', ar:'الـ signal بتاعتك اللي شايلة نتيجة الـ <code>forkJoin</code>.' } },
      { n:'me', k:'mine', re:'(?<![\\w$/-])me(?![\\w$-])', w:{ en:'A key you chose in the <code>forkJoin</code> object. The result has the same key: <code>s.me</code>. <code>/api/me</code> is the server’s.', ar:'مفتاح انت اخترته في object الـ <code>forkJoin</code>. النتيجة بترجع بنفس المفتاح: <code>s.me</code>. و<code>/api/me</code> بتاع السيرفر.' } },
      { n:'categories', k:'mine', re:'(?<=\\.)categories(?![\\w$-])|(?<![\\w$/-])categories(?=:)', w:{ en:'Another <code>forkJoin</code> key, read back as <code>s.categories</code>.', ar:'مفتاح <code>forkJoin</code> تاني، بيتقري تاني كـ <code>s.categories</code>.' } },
      { n:'results', k:'mine', w:{ en:'Your signal of products, read by the template.', ar:'الـ signal بتاعتك للمنتجات، والتمبلت بيقراها.' } },
      { n:'f', k:'mine', only:['ts'], w:{ en:'A parameter: the current filters. One letter is fine for one line.', ar:'parameter: الفلاتر الحالية. حرف واحد كفاية لسطر واحد.' } },
      { n:'s', k:'mine', only:['html'], w:{ en:'The <code>@if … as s</code> alias for the loaded data.', ar:'الـ alias بتاع <code>@if … as s</code> للداتا اللي اتحمّلت.' } },
      { n:'p', k:'mine', only:['products.html'], re:'(?<![\\w$<\\/-])p(?![\\w$-])', w:{ en:'The loop variable. The <code>&lt;p&gt;</code> tag is HTML’s, not this.', ar:'متغير اللوب. وتاج <code>&lt;p&gt;</code> بتاع HTML، مش هو.' } },
      { n:'trigger', k:'mine', w:{ en:'A name for the skipped slot, if you choose to name it.', ar:'اسم للخانة المتنطوطة، لو حبيت تسمّيها.' } },
      { n:'typed', k:'mine', w:{ en:'A <code>forkJoin</code> key in the broken example.', ar:'مفتاح <code>forkJoin</code> في المثال البايظ.' } },
      { n:'box', k:'mine', w:{ en:'A template reference (<code>#box</code>) to the input.', ar:'template reference (<code>#box</code>) للـ input.' } },
      { n:'searchText', k:'mine', w:{ en:'The signal version’s own name for the search.', ar:'الاسم بتاع نسخة الـ signals للبحث.' } },
      { n:'sortBy', k:'mine', w:{ en:'The signal version’s own name for the sort.', ar:'الاسم بتاع نسخة الـ signals للترتيب.' } },

      /* --- RxJS's --- */
      { n:'forkJoin', k:'ng', w:{ en:'RxJS: wait for every stream to complete, then emit once.', ar:'RxJS: استنى كل الـ streams تخلص، وبعدين ابعت مرة واحدة.' } },
      { n:'combineLatest', k:'ng', w:{ en:'RxJS: emit the latest of each, whenever any of them fires.', ar:'RxJS: ابعت آخر قيمة من كل واحد، كل ما أي واحد يبعت.' } },
      { n:'withLatestFrom', k:'ng', w:{ en:'RxJS: the source drives; the others are only read.', ar:'RxJS: المصدر هو اللي بيحرّك؛ والباقي بيتقروا بس.' } },
      { n:'BehaviorSubject', k:'ng', w:{ en:'RxJS: a stream that always has a current value.', ar:'RxJS: stream عنده دايمًا قيمة حالية.' } },
      { n:'Subject', k:'ng', w:{ en:'RxJS: a stream with no value until you push one.', ar:'RxJS: stream مالوش قيمة لحد ما تحط فيه.' } },
      { n:'debounceTime', k:'ng', w:{ en:'RxJS: wait for a pause. <code>0</code> merges changes from the same moment.', ar:'RxJS: استنى وقفة. و<code>0</code> بتلمّ التغييرات اللي في نفس اللحظة.' } },
      { n:'map', k:'ng', w:{ en:'RxJS: transform each value.', ar:'RxJS: حوّل كل قيمة.' } },
      { n:'switchMap', k:'ng', w:{ en:'RxJS: cancel the previous request, keep the newest.', ar:'RxJS: الغي الـ request اللي قبله، وخلّي الأحدث.' } },
      { n:'exhaustMap', k:'ng', w:{ en:'RxJS: ignore new clicks while a save is running.', ar:'RxJS: طنّش الكليكات الجديدة طول ما الحفظ شغال.' } },
      { n:'catchError', k:'ng', w:{ en:'RxJS: handle an error. Must return a stream.', ar:'RxJS: اتعامل مع الـ error. لازم يرجّع stream.' } },
      { n:'of', k:'ng', not:['html'], w:{ en:'RxJS: a stream of the values you give it.', ar:'RxJS: stream من القيم اللي بتديهاله.' } },
      { n:'pipe', k:'ng', w:{ en:'The observable method that chains operators.', ar:'ميثود الـ observable اللي بتركّب الـ operators.' } },
      { n:'subscribe', k:'ng', w:{ en:'The observable method that starts it running.', ar:'ميثود الـ observable اللي بتشغّله.' } },
      { n:'next', k:'ng', w:{ en:'A <code>Subject</code> method: push a value in.', ar:'ميثود في <code>Subject</code>: حط قيمة جوه.' } },

      /* --- Angular's, the browser's --- */
      { n:'toSignal', k:'ng', w:{ en:'Angular’s bridge: observable → signal. It subscribes for you.', ar:'كوبري أنجولار: observable ← signal. بيعمل subscribe بدالك.' } },
      { n:'initialValue', k:'ng', w:{ en:'An option key <code>toSignal</code> reads.', ar:'مفتاح إعداد <code>toSignal</code> بيقراه.' } },
      { n:'takeUntilDestroyed', k:'ng', w:{ en:'Angular’s operator: unsubscribe when the component dies.', ar:'الـ operator بتاع أنجولار: اعمل unsubscribe لما الـ component يموت.' } },
      { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
      { n:'httpResource', k:'ng', w:{ en:'Angular’s signal-based HTTP request.', ar:'الـ HTTP request بتاع أنجولار المبني على signals.' } },
      { n:'url', k:'ng', w:{ en:'An option key <code>httpResource</code> reads.', ar:'مفتاح إعداد <code>httpResource</code> بيقراه.' } },
      { n:'params', k:'ng', w:{ en:'An option key: the query string. The keys inside it are the server’s.', ar:'مفتاح إعداد: الـ query string. والمفاتيح اللي جواه بتاعة السيرفر.' } },
      { n:'inject', k:'ng', w:{ en:'Angular’s function that hands you a service.', ar:'الـ function بتاعة أنجولار اللي بتديك سيرفس.' } },
      { n:'HttpClient', k:'ng', w:{ en:'Angular’s HTTP service.', ar:'سيرفس الـ HTTP بتاع أنجولار.' } },
      { n:'get', k:'ng', w:{ en:'An <code>HttpClient</code> method.', ar:'ميثود في <code>HttpClient</code>.' } },
      { n:'post', k:'ng', w:{ en:'An <code>HttpClient</code> method.', ar:'ميثود في <code>HttpClient</code>.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator.', ar:'الـ decorator بتاع أنجولار.' } },
      { n:'@Injectable', k:'ng', w:{ en:'Angular’s decorator for a service.', ar:'الـ decorator بتاع أنجولار للسيرفس.' } },
      { n:'providedIn', k:'ng', w:{ en:'An option key Angular reads.', ar:'مفتاح إعداد أنجولار بيقراه.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The string after it is yours.', ar:'مفتاح إعداد. النص اللي بعده بتاعك.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key. The path points at your file.', ar:'مفتاح إعداد. المسار بيشاور على ملفك.' } },
      { n:'@if', k:'ng', w:{ en:'Angular’s condition block. <code>as</code> gives the value a local name.', ar:'بلوك الشرط بتاع أنجولار. و<code>as</code> بتدّي القيمة اسم محلي.' } },
      { n:'@for', k:'ng', w:{ en:'Angular’s loop block.', ar:'بلوك اللوب بتاع أنجولار.' } },
      { n:'track', k:'ng', w:{ en:'Part of <code>@for</code>.', ar:'جزء من <code>@for</code>.' } },
      { n:'input', k:'ng', re:'(?<=\\()input(?=\\))', w:{ en:'The browser’s event, fired on every keystroke.', ar:'الـ event بتاع المتصفح، بيحصل مع كل حرف.' } },
      { n:'click', k:'ng', w:{ en:'The browser’s event.', ar:'الـ event بتاع المتصفح.' } },
      { n:'value', k:'ng', only:['html'], w:{ en:'The DOM property of an input.', ar:'الـ property بتاعة الـ input في الـ DOM.' } },
      { n:'length', k:'ng', w:{ en:'JavaScript’s array length.', ar:'طول الـ array في JavaScript.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One keystroke, six stops', ar: 'حرف واحد، ست محطات' },
    lead: {
      en: 'A product page with a search box and two sort buttons. The user types “lamp”. The list must reflect the new text <b>and</b> whatever sort is already chosen. Follow the keystroke:',
      ar: 'صفحة منتجات فيها خانة بحث وزرارين ترتيب. اليوزر كتب «lamp». الليستة لازم تعكس النص الجديد <b>و</b>الترتيب اللي متختار أصلًا. امشي ورا الحرف:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'products.html', lang: 'html', who: { en: 'template · the keystroke', ar: 'التمبلت · الحرف' },
          code: ['<input #box (input)="search$.next(box.value)" placeholder="Search" />'],
          say: { en: `${ng('input')} and ${ng('value')} are the browser’s. ${mine('box')} and ${mine('search$')} are yours. ${ng('next')} pushes the text into your stream.`,
                 ar: `${ng('input')} و${ng('value')} بتوع المتصفح. و${mine('box')} و${mine('search$')} بتوعك. و${ng('next')} بتحط النص في الـ stream بتاعك.` } },
        { file: 'products.ts', lang: 'ts', who: { en: 'component · the join', ar: 'الـ component · الجمع' },
          code: ['combineLatest([this.search$, this.sort$])'],
          say: { en: `${ng('combineLatest')} is RxJS’s. It hands out an <b>array</b> with the latest value of each stream, <b>in the order you listed them</b>: search first, sort second. Nothing about your stream names survives this step, only their positions.`,
                 ar: `${ng('combineLatest')} بتاعة RxJS. بتطلّع <b>array</b> فيها آخر قيمة من كل stream، <b>بنفس الترتيب اللي انت كتبتهم بيه</b>: البحث الأول، والترتيب التاني. مفيش حاجة من أسماء الـ streams بتاعتك بتعدّي من الخطوة دي، غير أماكنهم.` } },
        { file: 'products.ts', lang: 'ts', who: { en: 'component · naming the slots', ar: 'الـ component · تسمية الخانات' },
          code: ['map(([search, sort]) => ({ search, sort })),'],
          say: { en: `Here you <b>give the slots names</b>. ${pub('search')} and ${pub('sort')} are yours, picked to match the streams and your ${pub('Filters')} type. Because <code>{ search, sort }</code> is shorthand, the same words become the object’s keys.`,
                 ar: `هنا انت <b>بتسمّي الخانات</b>. ${pub('search')} و${pub('sort')} بتوعك، واخترتهم عشان يطابقوا الـ streams والنوع ${pub('Filters')} بتاعك. وعشان <code>{ search, sort }</code> اختصار، نفس الكلمات بتبقى مفاتيح الـ object.` } },
        { file: 'products.ts', lang: 'ts', who: { en: 'component · the request', ar: 'الـ component · الطلب' },
          code: ['this.filters$.pipe(switchMap(f => this.api.findProducts(f)))'],
          say: { en: `${mine('filters$')} is your combined stream, ${mine('f')} a one-line parameter, ${pub('findProducts')} your service’s method. ${ng('switchMap')} cancels the request for “lam” when “lamp” arrives.`,
                 ar: `${mine('filters$')} الـ stream المجمّع بتاعك، و${mine('f')} parameter لسطر واحد، و${pub('findProducts')} ميثود السيرفس بتاعك. و${ng('switchMap')} بتلغي طلب «lam» لما «lamp» توصل.` } },
        { file: 'shop-api.ts', lang: 'ts', who: { en: 'service · the server’s names', ar: 'السيرفس · أسماء السيرفر' },
          code: ["return this.http.get<Product[]>('/api/products', { params: { q: f.search, sort: f.sort } });"],
          say: { en: `${ng('params')} is Angular’s. Inside it, <code>q</code> and the first <code>sort</code> are <b>the server’s</b> query keys. <code>f.search</code> and <code>f.sort</code> after them are your ${pub('Filters')} fields. Same spelling, different owner.`,
                 ar: `${ng('params')} بتاعة أنجولار. جواها، <code>q</code> وأول <code>sort</code> دول مفاتيح الـ query <b>بتاعة السيرفر</b>. و<code>f.search</code> و<code>f.sort</code> اللي بعدهم حقول ${pub('Filters')} بتاعتك. نفس الهجاء، صاحب مختلف.` } },
        { file: 'products.html', lang: 'html', who: { en: 'template · the list', ar: 'التمبلت · الليستة' },
          code: ['@for (p of results(); track p.id) {'],
          say: { en: `${mine('results')} is your signal, filled by ${ng('toSignal')}. ${mine('p')} is the loop’s own name; ${pub('id')} is a field on your ${pub('Product')} type.`,
                 ar: `${mine('results')} الـ signal بتاعتك، و${ng('toSignal')} هي اللي بتملاها. و${mine('p')} اسم اللوب نفسه؛ و${pub('id')} field في النوع ${pub('Product')} بتاعك.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: '<code>combineLatest([search$, sort$])</code> gives <code>[text, sort]</code> <b>by position</b>; <code>([search, sort]) =&gt;</code> is where you name them; the server gets them under its own keys, <code>q</code> and <code>sort</code>.',
        ar: '<code>combineLatest([search$, sort$])</code> بتدّي <code>[النص، الترتيب]</code> <b>بالترتيب</b>؛ و<code>([search, sort]) =&gt;</code> هو المكان اللي بتسمّيهم فيه؛ والسيرفر بياخدهم تحت مفاتيحه هو، <code>q</code> و<code>sort</code>.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Which joiner, which shape?', ar: 'أنهي واحدة، وشكلها إيه؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'Each joiner gives its answer a different shape, and the shape decides how you name what comes out.',
      ar: 'كل واحدة بتدّي الإجابة بتاعتها شكل مختلف، والشكل هو اللي بيحدد إزاي تسمّي اللي طالع.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Shape of the answer', 'Who picks the names', 'Read back as'],
                ar: ['الحتة', 'شكل الإجابة', 'مين بيختار الأسماء', 'بيتقري تاني كـ'] },
        rows: [
          { en: ['<code>forkJoin({ me: …, categories: … })</code>', 'an object, once', `you pick the keys ${mine('me')}, ${mine('categories')}`, '<code>s.me</code>, <code>s.categories</code>: <b>by name</b>'],
            ar: ['<code>forkJoin({ me: …, categories: … })</code>', 'object، مرة واحدة', `انت بتختار المفاتيح ${mine('me')} و${mine('categories')}`, '<code>s.me</code> و<code>s.categories</code>: <b>بالاسم</b>'] },
          { en: ['<code>combineLatest([search$, sort$])</code>', 'an array, every time either changes', 'nobody: the slots have no names', '<code>([search, sort])</code>: <b>by position</b>, names are yours'],
            ar: ['<code>combineLatest([search$, sort$])</code>', 'array، كل ما واحد فيهم يتغير', 'محدش: الخانات ملهاش أسماء', '<code>([search, sort])</code>: <b>بالترتيب</b>، والأسماء بتاعتك'] },
          { en: ['<code>saveClicks$.pipe(withLatestFrom(filters$))</code>', 'an array: the trigger’s value first', 'nobody', '<code>([, f])</code>: slot 1 skipped, slot 2 named <code>f</code>'],
            ar: ['<code>saveClicks$.pipe(withLatestFrom(filters$))</code>', 'array: قيمة المشغّل الأول', 'محدش', '<code>([, f])</code>: الخانة 1 متنطوطة، والخانة 2 اسمها <code>f</code>'] },
          { en: ['<code>findProducts(f)</code>, <code>saveSearch(f)</code>', 'a request', `you, in the service; the component copies ${pub('findProducts')}`, '—'],
            ar: ['<code>findProducts(f)</code>، <code>saveSearch(f)</code>', 'request', `انت، في السيرفس؛ والـ component بينسخ ${pub('findProducts')}`, '—'] },
          { en: ['<code>{ q: f.search, sort: f.sort }</code>', 'the query string', '<b>the server</b> picks <code>q</code> and <code>sort</code>', '—'],
            ar: ['<code>{ q: f.search, sort: f.sort }</code>', 'الـ query string', '<b>السيرفر</b> بيختار <code>q</code> و<code>sort</code>', '—'] },
        ] },
      { t: 'ul',
        en: ['<b>Object in, object out; array in, array out.</b> Give <code>forkJoin</code> an object and you read the result by the keys you chose. Give anything an array and you read it by position.',
             '<b>Tuple names are labels you stick on positions.</b> <code>([search, sort])</code> could be <code>([a, b])</code>. What decides which value lands where is the order inside <code>combineLatest([ … ])</code>.',
             '<b><code>withLatestFrom</code> always puts the trigger first.</b> Here the trigger is a click with no value, so its slot is skipped with a bare comma.'],
        ar: ['<b>object داخل، object خارج؛ array داخلة، array خارجة.</b> ادّي <code>forkJoin</code> object وهتقرا النتيجة بالمفاتيح اللي انت اخترتها. ادّي أي حاجة array وهتقراها بالترتيب.',
             '<b>أسماء الـ tuple ليبلز بتلزقها على أماكن.</b> <code>([search, sort])</code> ممكن تبقى <code>([a, b])</code>. اللي بيحدد أنهي قيمة تقع فين هو الترتيب جوه <code>combineLatest([ … ])</code>.',
             '<b><code>withLatestFrom</code> دايمًا بتحط المشغّل الأول.</b> هنا المشغّل كليك مالهاش قيمة، فالخانة بتاعتها بتتنط بفاصلة لوحدها.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All four files, every name coloured', ar: 'الأربع ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same page, complete: <code>forkJoin</code> for what loads once, <code>combineLatest</code> for the live filters, <code>withLatestFrom</code> for Save. Hover a coloured name to light it up everywhere, then press <b>Rename test</b>: your names change, the server’s <code>q</code> and <code>sort</code> keys and the <code>\'name\'</code> / <code>\'price\'</code> values do not.',
      ar: 'نفس الصفحة، كاملة: <code>forkJoin</code> للي بيتحمّل مرة، و<code>combineLatest</code> للفلاتر الحية، و<code>withLatestFrom</code> للحفظ. قف بالماوس على أي اسم ملوّن وهينوّر في كل مكان، وبعدين دوس <b>جرّب تغيّر الأسماء</b>: أسماءك بتتغير، ومفاتيح السيرفر <code>q</code> و<code>sort</code> والقيم <code>\'name\'</code> / <code>\'price\'</code> لأ.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'models.ts', lang: 'ts', tag: { en: 'the data', ar: 'الداتا' }, code: [
        "export type Sort = 'name' | 'price';",
        '',
        'export interface User { name: string; }',
        'export interface Category { id: number; title: string; }',
        'export interface Product { id: number; title: string; price: number; }',
        'export interface Filters { search: string; sort: Sort; }' ] },
      { t: 'code', name: 'shop-api.ts', lang: 'ts', tag: { en: 'one request each', ar: 'request واحد لكل واحدة' }, code: [
        "import { HttpClient } from '@angular/common/http';",
        "import { Injectable, inject } from '@angular/core';",
        "import { Category, Filters, Product, User } from './models';",
        '',
        "@Injectable({ providedIn: 'root' })",
        'export class ShopApi {',
        '  private readonly http = inject(HttpClient);',
        '',
        "  currentUser() { return this.http.get<User>('/api/me'); }",
        "  listCategories() { return this.http.get<Category[]>('/api/categories'); }",
        '',
        '  findProducts(f: Filters) {',
        "    return this.http.get<Product[]>('/api/products', { params: { q: f.search, sort: f.sort } });",
        '  }',
        '',
        '  saveSearch(f: Filters) {',
        "    return this.http.post('/api/saved-searches', { q: f.search, sort: f.sort });",
        '  }',
        '}' ] },
      { t: 'code', name: 'products.ts', lang: 'ts', tag: { en: 'the three joins', ar: 'التلات طرق' }, code: [
        "import { Component, inject } from '@angular/core';",
        "import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';",
        "import { BehaviorSubject, Subject, combineLatest, debounceTime, exhaustMap, forkJoin, map, switchMap, withLatestFrom } from 'rxjs';",
        "import { Sort } from './models';",
        "import { ShopApi } from './shop-api';",
        '',
        '@Component({',
        "  selector: 'app-products',",
        "  templateUrl: './products.html',",
        '})',
        'export class Products {',
        '  private readonly api = inject(ShopApi);',
        '',
        "  readonly search$ = new BehaviorSubject('');",
        "  readonly sort$ = new BehaviorSubject<Sort>('name');",
        '  readonly saveClicks$ = new Subject<void>();',
        '',
        '  // forkJoin: two requests, one answer, once. Keys come back by name.',
        '  readonly start = toSignal(',
        '    forkJoin({',
        '      me: this.api.currentUser(),',
        '      categories: this.api.listCategories(),',
        '    }),',
        '  );',
        '',
        '  // combineLatest: latest of each, whenever either changes. By position.',
        '  private readonly filters$ = combineLatest([this.search$, this.sort$]).pipe(',
        '    debounceTime(0),',
        '    map(([search, sort]) => ({ search, sort })),',
        '  );',
        '',
        '  readonly results = toSignal(',
        '    this.filters$.pipe(switchMap(f => this.api.findProducts(f))),',
        '    { initialValue: [] },',
        '  );',
        '',
        '  // withLatestFrom: only the click triggers; the filters ride along.',
        '  constructor() {',
        '    this.saveClicks$.pipe(',
        '      withLatestFrom(this.filters$),',
        '      exhaustMap(([, f]) => this.api.saveSearch(f)),',
        '      takeUntilDestroyed(),',
        '    ).subscribe();',
        '  }',
        '}' ] },
      { t: 'code', name: 'products.html', lang: 'html', tag: { en: 'the page', ar: 'الصفحة' }, code: [
        '@if (start(); as s) {',
        '  <h1>Hi {{ s.me.name }}</h1>',
        '  <p>{{ s.categories.length }} categories</p>',
        '}',
        '',
        '<input #box (input)="search$.next(box.value)" placeholder="Search" />',
        `<button (click)="sort$.next('name')">A–Z</button>`,
        `<button (click)="sort$.next('price')">Cheapest</button>`,
        '',
        '<ul>',
        '  @for (p of results(); track p.id) {',
        '    <li>{{ p.title }}: {{ p.price }}</li>',
        '  }',
        '</ul>',
        '',
        '<button (click)="saveClicks$.next()">Save this search</button>' ] },
      { t: 'nmtable' }
    ]
  },

  /* ------------------------------------------------------------ 4 */
  {
    id: 'rename',
    kicker: { en: 'Is it OK to change it?', ar: 'ينفع أغيّره؟' },
    title: { en: 'What breaks when you rename each name', ar: 'إيه اللي بيبوظ لما تغيّر كل اسم' },
    lead: {
      en: 'TypeScript tracks object keys and types well, so most renames fail loudly. Positions and server keys it cannot check.',
      ar: 'TypeScript بيتابع مفاتيح الـ objects والأنواع كويس، فأغلب التغييرات بتفشل بصوت عالي. أما الأماكن ومفاتيح السيرفر فمايقدرش يشيّك عليهم.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [mine('me') + ' (a forkJoin key)', 'the template’s <code>s.me</code>', 'Compile error in the template: the result has no such key.'],
            ar: [mine('me') + ' (مفتاح forkJoin)', '<code>s.me</code> في التمبلت', 'Compile error في التمبلت: النتيجة مفيهاش المفتاح ده.'] },
          { en: [pub('search') + ' (the tuple name + Filters field)', 'the <code>Filters</code> field and <code>f.search</code> in the service', 'Compile error: the object no longer fits <code>Filters</code>.'],
            ar: [pub('search') + ' (اسم الـ tuple + field في Filters)', 'الـ field في <code>Filters</code> و<code>f.search</code> في السيرفس', 'Compile error: الـ object مبقاش مطابق لـ <code>Filters</code>.'] },
          { en: ['the order inside <code>combineLatest([ … ])</code>', 'the order of the tuple names', 'Compile error <b>only if</b> the types differ. Two streams of the same type swap silently.'],
            ar: ['الترتيب جوه <code>combineLatest([ … ])</code>', 'ترتيب أسماء الـ tuple', 'Compile error <b>بس لو</b> الأنواع مختلفة. اتنين streams من نفس النوع بيتبدّلوا في صمت.'] },
          { en: [mine('search$') + ', ' + mine('sort$') + ', ' + mine('saveClicks$'), 'this class and its template', 'Compile error in the template.'],
            ar: [mine('search$') + '، ' + mine('sort$') + '، ' + mine('saveClicks$'), 'الكلاس ده والتمبلت بتاعه', 'Compile error في التمبلت.'] },
          { en: [pub('findProducts') + ', ' + pub('saveSearch') + ', …', 'the calls in <code>products.ts</code>', 'Compile error.'],
            ar: [pub('findProducts') + '، ' + pub('saveSearch') + '، …', 'الندايات في <code>products.ts</code>', 'Compile error.'] },
          { en: ['<code>q</code> or the <code>sort:</code> key (the server’s)', 'nothing on your side', 'No error. The server gets a key it does not read and ignores your filter.'],
            ar: ['<code>q</code> أو مفتاح <code>sort:</code> (بتوع السيرفر)', 'ولا حاجة عندك', 'مفيش error. السيرفر بيوصله مفتاح مش بيقراه وبيتجاهل الفلتر بتاعك.'] },
          { en: [`${ng('forkJoin')}, ${ng('combineLatest')}, ${ng('withLatestFrom')}`, 'nothing: they are RxJS’s', 'A typo is a compile error on the import.'],
            ar: [`${ng('forkJoin')} و${ng('combineLatest')} و${ng('withLatestFrom')}`, 'ولا حاجة: دول بتوع RxJS', 'الغلطة الإملائية compile error في الـ import.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b> above the files. <code>me</code> changes in the <code>forkJoin</code> and in <code>s.me</code> together; <code>search</code> changes in the tuple, the shorthand object, <code>Filters</code> and <code>f.search</code> together; <code>q:</code> and <code>sort:</code> in the query stay put.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b> فوق الملفات. <code>me</code> بيتغير في الـ <code>forkJoin</code> وفي <code>s.me</code> مع بعض؛ و<code>search</code> بيتغير في الـ tuple والـ object المختصر و<code>Filters</code> و<code>f.search</code> مع بعض؛ و<code>q:</code> و<code>sort:</code> في الـ query بيفضلوا مكانهم.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتوعك' },
    title: { en: 'The fixed names, and one fixed comma', ar: 'الأسماء الثابتة، وفاصلة ثابتة' },
    lead: {
      en: 'The joiners and their helpers are RxJS’s; the bridges are Angular’s. And one piece of syntax looks like a typo but is standard JavaScript.',
      ar: 'الحاجات اللي بتجمع والمساعدين بتوعها بتوع RxJS؛ والكباري بتاعة أنجولار. وفيه حتة syntax شكلها غلطة إملائية بس هي JavaScript عادي.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Names', 'Whose', 'Note'], ar: ['الأسماء', 'بتاعة مين', 'ملحوظة'] },
        rows: [
          { en: [`${ng('forkJoin')}, ${ng('combineLatest')}, ${ng('withLatestFrom')}`, 'RxJS', 'Imported from <code>\'rxjs\'</code> by exactly these names.'],
            ar: [`${ng('forkJoin')} و${ng('combineLatest')} و${ng('withLatestFrom')}`, 'RxJS', 'بتتعمل import من <code>\'rxjs\'</code> بالأسماء دي بالظبط.'] },
          { en: [`${ng('BehaviorSubject')}, ${ng('Subject')}`, 'RxJS', 'The first has a value from the start; the second does not. That difference matters a lot for <code>combineLatest</code>.'],
            ar: [`${ng('BehaviorSubject')} و${ng('Subject')}`, 'RxJS', 'الأول عنده قيمة من الأول؛ والتاني لأ. والفرق ده بيفرق جامد مع <code>combineLatest</code>.'] },
          { en: [`${ng('toSignal')}, ${ng('initialValue')}, ${ng('takeUntilDestroyed')}`, 'Angular', 'From <code>\'@angular/core/rxjs-interop\'</code>.'],
            ar: [`${ng('toSignal')} و${ng('initialValue')} و${ng('takeUntilDestroyed')}`, 'أنجولار', 'من <code>\'@angular/core/rxjs-interop\'</code>.'] },
          { en: [`${ng('params')}; <code>q</code>, <code>sort</code> inside it`, 'Angular; the server', 'The option key is Angular’s; the keys inside belong to the API you call.'],
            ar: [`${ng('params')}؛ و<code>q</code> و<code>sort</code> جواه`, 'أنجولار؛ السيرفر', 'مفتاح الإعداد بتاع أنجولار؛ والمفاتيح اللي جواه بتاعة الـ API اللي بتكلمه.'] },
        ] },
      { t: 'code', name: 'the skipped slot', lang: 'ts', tag: { en: 'plain JavaScript', ar: 'JavaScript عادي' }, code: [
        'exhaustMap(([, f]) => this.api.saveSearch(f))',
        '',
        '// the same thing, with the first slot named:',
        'exhaustMap(([trigger, f]) => this.api.saveSearch(f))' ] },
      { t: 'p',
        en: `<code>[, f]</code> is array destructuring with the first slot left empty. <code>withLatestFrom</code> puts the click first; the click carries nothing useful, so it is skipped. ${mine('f')} is your name for the second slot.`,
        ar: `<code>[, f]</code> ده destructuring لـ array والخانة الأولى سايبينها فاضية. <code>withLatestFrom</code> بتحط الكليك الأول؛ والكليك مش شايلة حاجة مفيدة، فبتتنط. و${mine('f')} اسمك للخانة التانية.` }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'RxJS accepts any name. These habits make positions and keys hard to mix up.',
      ar: 'RxJS بيقبل أي اسم. العادات دي بتخلي الأماكن والمفاتيح صعب تتلخبط.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['tuple slots', 'the stream’s name without <code>$</code>: <code>[search, sort]</code> for <code>[search$, sort$]</code>', '<code>[a, b]</code>, <code>[x, y]</code>', 'Matching names make a swapped order easy to spot.'],
            ar: ['خانات الـ tuple', 'اسم الـ stream من غير <code>$</code>: <code>[search, sort]</code> لـ <code>[search$, sort$]</code>', '<code>[a, b]</code>، <code>[x, y]</code>', 'الأسماء المتطابقة بتخلي الترتيب المقلوب سهل تلاحظه.'] },
          { en: ['<code>forkJoin</code> keys', '<code>me</code>, <code>categories</code>', '<code>res1</code>, <code>data2</code>', 'You read them back by name, so name what they hold.'],
            ar: ['مفاتيح <code>forkJoin</code>', '<code>me</code>، <code>categories</code>', '<code>res1</code>، <code>data2</code>', 'بتقراهم تاني بالاسم، فسمّي اللي شايلينه.'] },
          { en: ['<code>forkJoin</code> itself', 'the object form <code>forkJoin({ … })</code>', 'the array form for more than two', 'Keys cannot be swapped by accident. Positions can.'],
            ar: ['<code>forkJoin</code> نفسها', 'شكل الـ object <code>forkJoin({ … })</code>', 'شكل الـ array لأكتر من اتنين', 'المفاتيح مينفعش تتبدّل بالغلط. الأماكن تنفع.'] },
          { en: ['a stream', '<code>search$</code>, <code>saveClicks$</code>', '<code>searchSubject</code>', 'The <code>$</code> is a habit meaning “stream”. It is part of your name.'],
            ar: ['stream', '<code>search$</code>، <code>saveClicks$</code>', '<code>searchSubject</code>', 'الـ <code>$</code> عادة معناها «stream». وهي جزء من اسمك.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Where the name, or the place, is decided for you', ar: 'فين الاسم، أو المكان، متحدد بدالك' },
    lead: {
      en: 'Three rules decide things here. Only the first one is checked by the compiler.',
      ar: 'تلات قواعد بتحدد حاجات هنا. الأولى بس هي اللي الـ compiler بيشيّك عليها.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'forkJoin keys come back unchanged', ar: 'مفاتيح forkJoin بترجع زي ما هي' }, blocks: [
        { t: 'p',
          en: `Whatever key you write in <code>forkJoin({ … })</code> is the key on the result. You chose ${mine('me')}, so the template must read <code>s.me</code>. Rename one side and TypeScript tells you, because the result is typed from the object you passed.`,
          ar: `أي مفتاح تكتبه في <code>forkJoin({ … })</code> هو المفتاح اللي في النتيجة. انت اخترت ${mine('me')}، فالتمبلت لازم يقرا <code>s.me</code>. غيّر ناحية وTypeScript هيقولك، عشان النتيجة نوعها طالع من الـ object اللي بعته.` }
      ]},
      { t: 'step', n: 'B', title: { en: 'The array order is the only thing that matters', ar: 'ترتيب الـ array هو الحاجة الوحيدة اللي فارقة' }, blocks: [
        { t: 'p',
          en: `In <code>combineLatest([this.search$, this.sort$])</code> the first slot is the search and the second the sort, whatever you call them later. With ${ng('withLatestFrom')}, the source (the click) is always slot one and the streams you pass follow in order.`,
          ar: `في <code>combineLatest([this.search$, this.sort$])</code> الخانة الأولى هي البحث والتانية الترتيب، مهما سمّيتهم بعد كده. ومع ${ng('withLatestFrom')}، المصدر (الكليك) دايمًا الخانة الأولى والـ streams اللي بتبعتها بتيجي وراه بالترتيب.` }
      ]},
      { t: 'step', n: 'C', title: { en: 'The server names the query', ar: 'السيرفر هو اللي بيسمّي الـ query' }, blocks: [
        { t: 'p',
          en: `<code>{ q: f.search, sort: f.sort }</code> maps your names onto the server’s. Keep that mapping in the service, in one place. If you ever write <code>{ params: { ...f } }</code>, your field names become the query keys and every rename of ${pub('search')} quietly breaks the search.`,
          ar: `<code>{ q: f.search, sort: f.sort }</code> بتنقل أسماءك لأسماء السيرفر. خلّي النقلة دي في السيرفس، في مكان واحد. لو كتبت في يوم <code>{ params: { ...f } }</code>، أسماء الحقول بتاعتك هتبقى مفاتيح الـ query وأي تغيير لـ ${pub('search')} هيبوّظ البحث في صمت.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'signals',
    kicker: { en: 'The signal version', ar: 'نسخة الـ signals' },
    title: { en: 'Streams vs signals: the same join, fewer names', ar: 'streams قصاد signals: نفس الجمع، أسماء أقل' },
    lead: {
      en: '<code>combineLatest</code> exists because a stream has no current value. Signals do, so “combining” is just reading two of them in one function. You will see both styles; the names you own shrink to the signals themselves.',
      ar: '<code>combineLatest</code> موجودة عشان الـ stream مالوش قيمة حالية. الـ signals ليها، فـ «الجمع» بقى مجرد إنك تقرا اتنين منهم في function واحدة. هتشوف الأسلوبين؛ والأسماء اللي بتاعتك بتقل لحد الـ signals نفسها.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'products.ts — streams', lang: 'ts', code: [
          "readonly search$ = new BehaviorSubject('');",
          "readonly sort$ = new BehaviorSubject<Sort>('name');",
          '',
          'readonly results = toSignal(',
          '  combineLatest([this.search$, this.sort$]).pipe(',
          '    map(([search, sort]) => ({ search, sort })),',
          '    switchMap(f => this.api.findProducts(f)),',
          '  ),',
          '  { initialValue: [] },',
          ');' ] },
        good: { name: 'products.ts — signals', lang: 'ts', code: [
          "readonly searchText = signal('');",
          "readonly sortBy = signal<Sort>('name');",
          '',
          'readonly results = httpResource<Product[]>(() => ({',
          "  url: '/api/products',",
          '  params: { q: this.searchText(), sort: this.sortBy() },',
          '}));',
          '',
          '',
          '' ] } },
      { t: 'p',
        en: `No tuple, no positions: the function reads ${mine('searchText')} and ${mine('sortBy')} by name, and ${ng('httpResource')} runs again when either changes. ${ng('url')} and ${ng('params')} are Angular’s option keys; <code>q</code> and <code>sort</code> are still the server’s. In the template you read <code>results.value()</code>. <code>forkJoin</code> has no signal twin: for “fire these requests and wait for all of them”, it is still the tool.`,
        ar: `مفيش tuple ولا أماكن: الـ function بتقرا ${mine('searchText')} و${mine('sortBy')} بالاسم، و${ng('httpResource')} بيشتغل تاني لما أي واحد فيهم يتغير. ${ng('url')} و${ng('params')} مفاتيح إعداد أنجولار؛ و<code>q</code> و<code>sort</code> لسه بتوع السيرفر. وفي التمبلت بتقرا <code>results.value()</code>. و<code>forkJoin</code> مالهاش توأم signal: لـ «ابعت الطلبات دي واستنى كلهم»، لسه هي الأداة.` }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, and says nothing', ar: 'مش بيعمل حاجة، ومش بيقول حاجة' },
    title: { en: 'Mistakes that fail silently', ar: 'غلطات بتفشل في صمت' },
    lead: {
      en: 'A join that is wired wrong usually just waits. Forever, or until the user happens to touch the one control you forgot.',
      ar: 'الجمع المتوصّل غلط غالبًا بيستنى وبس. للأبد، أو لحد ما اليوزر بالصدفة يلمس الحاجة الوحيدة اللي انت نسيتها.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'A plain Subject inside combineLatest', ar: 'Subject عادي جوه combineLatest' }, blocks: [
        { t: 'pair',
          bad:  { name: 'products.ts — Subject', lang: 'ts', code: [
            'readonly sort$ = new Subject<Sort>();' ] },
          good: { name: 'products.ts — BehaviorSubject', lang: 'ts', code: [
            "readonly sort$ = new BehaviorSubject<Sort>('name');" ] } },
        { t: 'p', en: `${ng('combineLatest')} emits nothing until <b>every</b> stream has emitted once. A plain ${ng('Subject')} has no value until someone clicks a sort button, so the list stays empty while the user types. A ${ng('BehaviorSubject')} (or <code>startWith</code>) gives it a value from the start.`,
                  ar: `${ng('combineLatest')} مبتبعتش حاجة لحد ما <b>كل</b> stream يبعت مرة. والـ ${ng('Subject')} العادي مالوش قيمة لحد ما حد يدوس زرار ترتيب، فالليستة بتفضل فاضية واليوزر بيكتب. والـ ${ng('BehaviorSubject')} (أو <code>startWith</code>) بيدّيله قيمة من الأول.` }
      ]},
      { t: 'step', n: '2', title: { en: 'Swapping the tuple names', ar: 'قلب أسماء الـ tuple' }, blocks: [
        { t: 'pair',
          bad:  { name: 'products.ts — swapped', lang: 'ts', code: [
            'map(([sort, search]) => ({ search, sort })),' ] },
          good: { name: 'products.ts — in order', lang: 'ts', code: [
            'map(([search, sort]) => ({ search, sort })),' ] } },
        { t: 'p', en: `The names do not pick the values; the positions do. Here you happen to get a compile error, only because ${mine('sort$')} carries a ${pub('Sort')} and the search is any string. If both streams carried plain strings, this would compile and quietly search for the sort value.`,
                  ar: `الأسماء مش هي اللي بتختار القيم؛ الأماكن هي اللي بتختار. هنا بالصدفة هتاخد compile error، بس عشان ${mine('sort$')} شايل ${pub('Sort')} والبحث أي نص. لو الاتنين streams شايلين نصوص عادية، ده كان هيعدّي الـ compile ويدوّر في هدوء على قيمة الترتيب.` }
      ]},
      { t: 'step', n: '3', title: { en: 'forkJoin with a stream that never completes', ar: 'forkJoin مع stream عمره ما بيخلص' }, blocks: [
        { t: 'pair',
          bad:  { name: 'products.ts — never completes', lang: 'ts', code: [
            'forkJoin({',
            '  me: this.api.currentUser(),',
            '  typed: this.search$,',
            '})' ] },
          good: { name: 'products.ts — requests only', lang: 'ts', code: [
            'forkJoin({',
            '  me: this.api.currentUser(),',
            '  categories: this.api.listCategories(),',
            '})' ] } },
        { t: 'p', en: `${ng('forkJoin')} emits when every source <b>completes</b>. HTTP requests complete; a ${ng('BehaviorSubject')} never does. So <code>start()</code> stays <code>undefined</code> and the <code>@if</code> never shows. No error at all.`,
                  ar: `${ng('forkJoin')} بتبعت لما كل مصدر <b>يخلص</b>. طلبات الـ HTTP بتخلص؛ والـ ${ng('BehaviorSubject')} عمره ما بيخلص. فـ <code>start()</code> بتفضل <code>undefined</code> والـ <code>@if</code> عمره ما بيظهر. ومفيش أي error.` }
      ]},
      { t: 'step', n: '4', title: { en: 'One failing request takes the whole forkJoin down', ar: 'طلب واحد فاشل بيوقّع الـ forkJoin كله' }, blocks: [
        { t: 'pair',
          bad:  { name: 'products.ts — all or nothing', lang: 'ts', code: [
            'forkJoin({',
            '  me: this.api.currentUser(),',
            '  categories: this.api.listCategories(),',
            '})' ] },
          good: { name: 'products.ts — optional part', lang: 'ts', code: [
            'forkJoin({',
            '  me: this.api.currentUser(),',
            '  categories: this.api.listCategories().pipe(catchError(() => of([]))),',
            '})' ] } },
        { t: 'p', en: `Not silent, but surprising: if the categories request fails, the whole ${ng('forkJoin')} errors and the user’s name is lost too. Through ${ng('toSignal')}, reading <code>start()</code> then throws that error. Catch the optional parts inside, so one badge cannot break the page.`,
                  ar: `مش صامتة، بس بتفاجئ: لو طلب الـ categories فشل، الـ ${ng('forkJoin')} كله بيضرب error واسم اليوزر بيضيع هو كمان. وعن طريق ${ng('toSignal')}، قراية <code>start()</code> بترمي الـ error ده. امسك الأجزاء الاختيارية من جوه، عشان حاجة صغيرة متكسرش الصفحة.` }
      ]},
      { t: 'step', n: '5', title: { en: 'withLatestFrom with no subscribe', ar: 'withLatestFrom من غير subscribe' }, blocks: [
        { t: 'pair',
          bad:  { name: 'products.ts — not subscribed', lang: 'ts', code: [
            'this.saveClicks$.pipe(',
            '  withLatestFrom(this.filters$),',
            '  exhaustMap(([, f]) => this.api.saveSearch(f)),',
            ');' ] },
          good: { name: 'products.ts — subscribed', lang: 'ts', code: [
            'this.saveClicks$.pipe(',
            '  withLatestFrom(this.filters$),',
            '  exhaustMap(([, f]) => this.api.saveSearch(f)),',
            ').subscribe();' ] } },
        { t: 'p', en: 'The Save button pushes clicks into a pipe nobody runs. Nothing is sent and nothing complains. A pipe needs <code>.subscribe()</code>, or <code>toSignal()</code>, to do anything.',
                  ar: 'زرار Save بيحط كليكات في pipe محدش بيشغّله. مفيش حاجة بتتبعت ومحدش بيشتكي. الـ pipe محتاج <code>.subscribe()</code>، أو <code>toSignal()</code>، عشان يعمل أي حاجة.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it does nothing', ar: 'لما مايعملش حاجة' },
    title: { en: 'Five questions, in this order', ar: 'خمس أسئلة، بالترتيب ده' },
    lead: {
      en: 'Your combined stream “never fires”, or fires with the wrong values. Ask these first.',
      ar: 'الـ stream المجمّع بتاعك «عمره ما بيشتغل»، أو بيشتغل بقيم غلط. اسأل دول الأول.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> With <code>combineLatest</code>: has <b>every</b> source emitted at least once? Plain <code>Subject</code>s need a <code>BehaviorSubject</code> or <code>startWith</code>.',
                  ar: '<b>1.</b> مع <code>combineLatest</code>: <b>كل</b> مصدر بعت مرة على الأقل؟ الـ <code>Subject</code> العادي محتاج <code>BehaviorSubject</code> أو <code>startWith</code>.' },
      { t: 'chk', en: '<b>2.</b> With <code>forkJoin</code>: does every source <b>complete</b>? HTTP yes, subjects and form <code>valueChanges</code> no.',
                  ar: '<b>2.</b> مع <code>forkJoin</code>: كل مصدر <b>بيخلص</b>؟ الـ HTTP آه، والـ subjects و<code>valueChanges</code> بتاعة الفورم لأ.' },
      { t: 'chk', en: '<b>3.</b> Do the tuple names line up with the order inside the array? Read them side by side.',
                  ar: '<b>3.</b> أسماء الـ tuple ماشية مع الترتيب اللي جوه الـ array؟ اقراهم جنب بعض.' },
      { t: 'chk', en: '<b>4.</b> Is anything subscribed: <code>.subscribe()</code> or <code>toSignal()</code>?',
                  ar: '<b>4.</b> فيه حاجة عاملة subscribe: <code>.subscribe()</code> أو <code>toSignal()</code>؟' },
      { t: 'chk', en: '<b>5.</b> Does the request carry the server’s keys? Check the query string in the network tab.',
                  ar: '<b>5.</b> الـ request شايل مفاتيح السيرفر؟ بص على الـ query string في الـ network tab.' }
    ]
  }
  ]
};
