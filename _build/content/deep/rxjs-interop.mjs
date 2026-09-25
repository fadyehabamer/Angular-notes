/* ==================================================================
   toSignal() / toObservable(), name by name — the deep dive after the
   signals ↔ RxJS interop topic. One running example (a product search
   box) followed through every file, every name coloured by who owns it.
   ================================================================== */

const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

export default {
  topic: 'rxjs-interop',
  tab: 'toSignal(), name by name — The Angular Signal',
  title: { en: '<code>toSignal()</code> and <code>toObservable()</code>, name by name', ar: '<code>toSignal()</code> و<code>toObservable()</code>، اسم اسم' },
  say: {
    en: 'One search box followed from the keystroke to the list on screen: signal in, stream in the middle, signal out. Every name coloured by who owns it: Angular, RxJS, the browser, the server, or you.',
    ar: 'خانة بحث واحدة ماشيين وراها من أول ضغطة زرار لحد الليستة اللي على الشاشة: signal داخلة، stream في النص، signal خارجة. وكل اسم ملوّن حسب صاحبه: أنجولار، ولا RxJS، ولا المتصفح، ولا السيرفر، ولا انت.'
  },
  lead: {
    en: 'The idea fits in one line: <b>signals hold what is true now, observables handle what happens over time, and two small functions carry a value across.</b> The confusing part is the names. In one short component you meet Angular’s bridges, RxJS’s operators, the browser’s events, the server’s query parameter, and your own signals with and without a <code>$</code>. This page tells you whose each one is and which ones you may rename.',
    ar: 'الفكرة في سطر واحد: <b>الـ signals شايلة اللي صحيح دلوقتي، والـ observables بتتعامل مع اللي بيحصل على مدار الوقت، وفيه اتنين functions صغيرين بيعدّوا القيمة من ناحية للتانية.</b> اللي بيلخبط هو الأسماء. في component واحد صغير هتقابل كباري أنجولار، وoperators بتاعة RxJS، وevents المتصفح، والـ query parameter بتاع السيرفر، والـ signals بتاعتك بـ <code>$</code> ومن غيرها. الصفحة دي بتقولك كل اسم بتاع مين، وأنهي أسماء ينفع تغيّرها.'
  },

  names: {
    note: {
      en: 'Blue is everybody else’s: Angular’s bridges from <code>@angular/core/rxjs-interop</code>, RxJS’s operators, the browser’s tag and event. Green lives inside one component. Orange is what the component and the service both type. One name is not coloured at all: the <code>q</code> in <code>{ q: text }</code> belongs to the server.',
      ar: 'الأزرق بتاع ناس تانية: كباري أنجولار من <code>@angular/core/rxjs-interop</code>، والـ operators بتاعة RxJS، والتاج والـ event بتوع المتصفح. الأخضر عايش جوه component واحد. والبرتقاني هو اللي الـ component والـ service الاتنين بيكتبوه. وفيه اسم واحد مش ملوّن خالص: الـ <code>q</code> اللي في <code>{ q: text }</code> ده بتاع السيرفر.'
    },
    names: [
      /* --- shared: two files must agree --- */
      { n:'search', k:'pub', re:'(?<![\\w$/-])search(?![\\w$-])',
        w:{ en:'The service’s method. The component calls <code>this.api.search(…)</code>, so both files change together.',
            ar:'ميثود الـ service. الـ component بينادي <code>this.api.search(…)</code>، فالملفين بيتغيروا مع بعض.' } },
      { n:'ProductApi', k:'pub',
        w:{ en:'The service class. The component imports it and passes it to <code>inject</code>.',
            ar:'كلاس الـ service. الـ component بيعمله import وبيدّيه لـ <code>inject</code>.' } },
      { n:'Product', k:'pub',
        w:{ en:'Your data type. The service and the component both import it.', ar:'نوع الداتا بتاعك. الـ service والـ component الاتنين بيعملوه import.' } },
      { n:'id', k:'pub',
        w:{ en:'A field of <code>Product</code>, read by the template’s <code>track</code>.', ar:'field في <code>Product</code>، والـ <code>track</code> في التمبلت بيقراه.' } },
      { n:'name', k:'pub',
        w:{ en:'A field of <code>Product</code>, shown by the template.', ar:'field في <code>Product</code>، والتمبلت بيعرضه.' } },
      { n:'Search', k:'pub',
        w:{ en:'The component class. Whoever shows it (a route, a parent’s <code>imports</code>) types this name.', ar:'كلاس الـ component. أي حد بيعرضه (route، أو <code>imports</code> بتاعة أب) بيكتب الاسم ده.' } },
      { n:'app-search', k:'pub',
        w:{ en:'The selector. A parent template types this tag.', ar:'الـ selector. تمبلت الأب بيكتب التاج ده.' } },

      /* --- yours, private to one file or one component --- */
      { n:'term', k:'mine',
        w:{ en:'Your writable signal: the text in the box. Written by the template, read by <code>toObservable</code>.', ar:'الـ signal بتاعتك اللي بتتكتب: الكلام اللي في الخانة. التمبلت بيكتب فيها، و<code>toObservable</code> بيقراها.' } },
      { n:'term$', k:'mine',
        w:{ en:'Your stream made from <code>term</code>. The <code>$</code> is a habit that says “observable”, nothing more.', ar:'الـ stream بتاعك المعمول من <code>term</code>. الـ <code>$</code> عادة معناها «observable»، مش أكتر.' } },
      { n:'results', k:'mine',
        w:{ en:'Your signal made by <code>toSignal</code>. The template reads <code>results()</code>.', ar:'الـ signal بتاعتك اللي <code>toSignal</code> عملها. التمبلت بيقرا <code>results()</code>.' } },
      { n:'results$', k:'mine',
        w:{ en:'The older version’s stream, read in the template with the <code>async</code> pipe.', ar:'الـ stream بتاع النسخة القديمة، والتمبلت بيقراه بالـ pipe <code>async</code>.' } },
      { n:'api', k:'mine', re:'(?<![\\w$/-])api(?![\\w$/-])',
        w:{ en:'The component’s field holding the injected <code>ProductApi</code>. <code>/api/products</code> is the server’s path, a different thing.', ar:'الـ field بتاع الـ component اللي شايل الـ <code>ProductApi</code>. و<code>/api/products</code> مسار السيرفر، حاجة تانية.' } },
      { n:'http', k:'mine', re:'(?<![\\w$/-])http(?![\\w$-])',
        w:{ en:'The service’s field holding <code>HttpClient</code>. The <code>/http</code> in the import path is Angular’s.', ar:'الـ field بتاع الـ service اللي شايل <code>HttpClient</code>. و<code>/http</code> اللي في مسار الـ import بتاع أنجولار.' } },
      { n:'q', k:'mine', not:['product-api.ts'],
        w:{ en:'The arrow function’s parameter: the latest search text. Lives for one line.', ar:'الـ parameter بتاع الـ arrow function: آخر كلام اتكتب في البحث. عايش سطر واحد.' } },
      { n:'text', k:'mine',
        w:{ en:'The service method’s parameter. It receives the component’s <code>q</code> under its own name.', ar:'الـ parameter بتاع ميثود الـ service. بيستقبل <code>q</code> بتاع الـ component باسمه هو.' } },
      { n:'#box', k:'mine', as:'pickle', re:'(?<=#)box(?![\\w$-])|(?<![\\w$.#-])box(?=\\.)',
        w:{ en:'A template reference to the <code>&lt;input&gt;</code>. Rename <code>#box</code> and every <code>box.</code> after it in the same template.', ar:'template reference للـ <code>&lt;input&gt;</code>. غيّر <code>#box</code> وكل <code>box.</code> بعده في نفس التمبلت.' } },
      { n:'p', k:'mine', re:'(?<![\\w$</-])p(?![\\w$>-])',
        w:{ en:'The <code>@for</code> loop variable: one product.', ar:'متغير اللوب بتاع <code>@for</code>: منتج واحد.' } },
      { n:'query', k:'mine',
        w:{ en:'A key you chose inside <code>params</code>, read back as <code>params.query</code>.', ar:'مفتاح انت اخترته جوه <code>params</code>، وبتقراه تاني كـ <code>params.query</code>.' } },
      { n:'args', k:'mine',
        w:{ en:'A local name for Angular’s <code>params</code>, made with <code>{ params: args }</code>.', ar:'اسم محلي لـ <code>params</code> بتاعة أنجولار، معمول بـ <code>{ params: args }</code>.' } },

      /* --- Angular’s, RxJS’s, the browser’s --- */
      { n:'toSignal', k:'ng', w:{ en:'Angular’s bridge: observable in, signal out. It subscribes for you and unsubscribes when the component is destroyed.', ar:'كوبري أنجولار: observable داخل، signal خارجة. بيعمل subscribe بدالك وبيلغيه لما الـ component يتشال.' } },
      { n:'toObservable', k:'ng', w:{ en:'Angular’s bridge: signal in, observable out.', ar:'كوبري أنجولار: signal داخلة، observable خارج.' } },
      { n:'initialValue', k:'ng', w:{ en:'An option key <code>toSignal</code> reads: the value before the first emission. The value after it is yours.', ar:'مفتاح إعداد <code>toSignal</code> بيقراه: القيمة قبل أول emission. القيمة اللي بعده بتاعتك.' } },
      { n:'rxResource', k:'ng', w:{ en:'Angular’s resource whose <code>stream</code> returns an observable.', ar:'الـ resource بتاع أنجولار اللي الـ <code>stream</code> بتاعه بيرجّع observable.' } },
      { n:'params', k:'ng',
        w:{ en:'Two Angular option keys with the same spelling: <code>HttpClient</code>’s query-parameter option, and <code>rxResource</code>’s input function (also the property it hands to <code>stream</code>).',
            ar:'مفتاحين إعداد لأنجولار بنفس الكتابة: الـ option بتاع الـ query parameters في <code>HttpClient</code>، والـ function اللي بتدخل في <code>rxResource</code> (وبرضه الـ property اللي بيدّيها لـ <code>stream</code>).' } },
      { n:'stream', k:'ng', w:{ en:'An <code>rxResource</code> option key: the function that returns the observable.', ar:'مفتاح إعداد في <code>rxResource</code>: الـ function اللي بترجّع الـ observable.' } },
      { n:'takeUntilDestroyed', k:'ng', w:{ en:'Angular’s operator: complete the stream when the component is destroyed.', ar:'الـ operator بتاع أنجولار: اقفل الـ stream لما الـ component يتشال.' } },
      { n:'pipe', k:'ng', w:{ en:'The observable method that chains operators.', ar:'ميثود الـ observable اللي بتركّب الـ operators ورا بعض.' } },
      { n:'subscribe', k:'ng', w:{ en:'The observable method that starts it running.', ar:'ميثود الـ observable اللي بتشغّله.' } },
      { n:'debounceTime', k:'ng', w:{ en:'An RxJS operator: wait for a pause in the values.', ar:'operator من RxJS: استنى لما القيم تهدا.' } },
      { n:'distinctUntilChanged', k:'ng', w:{ en:'An RxJS operator: drop a value equal to the previous one.', ar:'operator من RxJS: ارمي القيمة لو هي زي اللي قبلها.' } },
      { n:'switchMap', k:'ng', w:{ en:'An RxJS operator: start a new inner request and cancel the old one.', ar:'operator من RxJS: ابدأ request جديد والغي القديم.' } },
      { n:'catchError', k:'ng', w:{ en:'An RxJS operator: replace an error with a fallback stream.', ar:'operator من RxJS: بدّل الـ error بـ stream احتياطي.' } },
      { n:'of', k:'ng', only:['ts'], re:'(?<![\\w$-])of(?=\\()', w:{ en:'An RxJS function: a stream of the values you give it. (The <code>of</code> in <code>@for</code> is a different word.)', ar:'function من RxJS: stream فيه القيم اللي بتدّيهاله. (والـ <code>of</code> اللي في <code>@for</code> كلمة تانية.)' } },
      { n:'fromEvent', k:'ng', w:{ en:'An RxJS function: a stream of DOM events.', ar:'function من RxJS: stream من events الـ DOM.' } },
      { n:'window', k:'ng', w:{ en:'The browser’s global window object.', ar:'الـ object العام بتاع المتصفح، الـ window.' } },
      { n:'online', k:'ng', re:'(?<=\')online(?=\')', w:{ en:'The browser’s event name for “the network is back”.', ar:'اسم الـ event بتاع المتصفح لما النت يرجع.' } },
      { n:'Observable', k:'ng', w:{ en:'RxJS’s type for a stream.', ar:'النوع بتاع RxJS للـ stream.' } },
      { n:'Subject', k:'ng', w:{ en:'RxJS’s stream you push values into by hand.', ar:'الـ stream بتاع RxJS اللي بتدخّل فيه القيم بإيدك.' } },
      { n:'next', k:'ng', w:{ en:'The <code>Subject</code> method that pushes a value.', ar:'ميثود الـ <code>Subject</code> اللي بتدخّل قيمة.' } },
      { n:'HttpClient', k:'ng', w:{ en:'Angular’s HTTP service.', ar:'سيرفس الـ HTTP بتاعة أنجولار.' } },
      { n:'get', k:'ng', w:{ en:'An <code>HttpClient</code> method. It returns an observable.', ar:'ميثود في <code>HttpClient</code>. بترجّع observable.' } },
      { n:'inject', k:'ng', w:{ en:'Angular’s function that hands you a service.', ar:'الـ function بتاعة أنجولار اللي بتديك service.' } },
      { n:'@Injectable', k:'ng', w:{ en:'Angular’s decorator for a service.', ar:'الـ decorator بتاع أنجولار للـ service.' } },
      { n:'providedIn', k:'ng', w:{ en:'An option key Angular reads.', ar:'مفتاح إعداد أنجولار بيقراه.' } },
      { n:'root', k:'ng', re:'(?<=\')root(?=\')', w:{ en:'Angular’s fixed value: one shared service for the whole app.', ar:'قيمة ثابتة من أنجولار: service واحدة متشاركة للتطبيق كله.' } },
      { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
      { n:'set', k:'ng', w:{ en:'The signal method that writes a new value.', ar:'ميثود الـ signal اللي بتكتب قيمة جديدة.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator.', ar:'الـ decorator بتاع أنجولار.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The string after it is yours.', ar:'مفتاح إعداد. النص اللي بعده بتاعك.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key. The path after it points at your file.', ar:'مفتاح إعداد. المسار اللي بعده بيشاور على ملفك.' } },
      { n:'async', k:'ng', only:['html'], w:{ en:'The same pipe as written in a template: it subscribes and unsubscribes for you.', ar:'نفس الـ pipe بالشكل اللي بيتكتب في التمبلت: بيعمل subscribe وبيلغيه بدالك.' } },
      { n:'input', k:'ng', only:['html'], w:{ en:'The browser’s word, twice: the <code>&lt;input&gt;</code> tag and its <code>(input)</code> event.', ar:'كلمة المتصفح، مرتين: التاج <code>&lt;input&gt;</code> والـ event بتاعه <code>(input)</code>.' } },
      { n:'value', k:'ng', only:['html'], w:{ en:'The input element’s DOM property: what is typed in it.', ar:'الـ property بتاعة الـ input في الـ DOM: اللي مكتوب فيه.' } },
      { n:'@for', k:'ng', w:{ en:'Angular’s loop block.', ar:'بلوك اللوب بتاع أنجولار.' } },
      { n:'track', k:'ng', w:{ en:'Part of <code>@for</code>.', ar:'جزء من <code>@for</code>.' } },
      { n:'@empty', k:'ng', w:{ en:'Part of <code>@for</code>: shown when the list is empty.', ar:'جزء من <code>@for</code>: بيظهر لما الليستة فاضية.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One keystroke, seven stops', ar: 'ضغطة زرار واحدة، سبع محطات' },
    lead: {
      en: 'A product search box. The typed text is <b>state</b>, so it is a signal. Waiting for the user to stop typing and cancelling old requests are about <b>time</b>, so that part is RxJS. The list on screen is state again. Follow one keystroke:',
      ar: 'خانة بحث عن منتجات. الكلام اللي بيتكتب ده <b>حالة</b>، فهو signal. إنك تستنى المستخدم يبطّل كتابة وتلغي الـ requests القديمة ده موضوع <b>وقت</b>، فالحتة دي RxJS. والليستة اللي على الشاشة حالة تاني. امشي ورا ضغطة زرار واحدة:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'search.html', lang: 'html', who: { en: 'template · you type', ar: 'التمبلت · انت بتكتب' },
          code: ['<input #box (input)="term.set(box.value)" />'],
          say: { en: `${ng('input')} is the browser’s word twice: the tag and its event. ${mine('#box')} is a name you gave the element, so you can read its ${ng('value')}. ${mine('term')} is your signal, and ${ng('set')} is how Angular lets you write it.`,
                 ar: `${ng('input')} كلمة المتصفح مرتين: التاج والـ event بتاعه. ${mine('#box')} اسم انت اديته للـ element، عشان تقرا الـ ${ng('value')} بتاعته. ${mine('term')} الـ signal بتاعتك، و${ng('set')} هي الطريقة اللي أنجولار بيخليك تكتب بيها فيها.` } },
        { file: 'search.ts', lang: 'ts', who: { en: 'component · state', ar: 'الـ component · الحالة' },
          code: ["readonly term = signal('');"],
          say: { en: `The state. ${ng('signal')} is Angular’s; ${mine('term')} is a name you picked. There is always an answer to “what is typed now?”.`,
                 ar: `الحالة. ${ng('signal')} بتاعة أنجولار؛ و${mine('term')} اسم انت اخترته. ودايمًا فيه إجابة لسؤال «إيه المكتوب دلوقتي؟».` } },
        { file: 'search.ts', lang: 'ts', who: { en: 'component · bridge out', ar: 'الـ component · الكوبري لبرّه' },
          code: ['private readonly term$ = toObservable(this.term);'],
          say: { en: `${ng('toObservable')} is Angular’s bridge from signal to stream. ${mine('term$')} is your name for the stream. The <code>$</code> is only a habit that says “this is an observable”; the code works without it.`,
                 ar: `${ng('toObservable')} كوبري أنجولار من signal لـ stream. و${mine('term$')} اسمك انت للـ stream. والـ <code>$</code> مجرد عادة معناها «ده observable»؛ الكود بيشتغل من غيرها.` } },
        { file: 'search.ts', lang: 'ts', who: { en: 'component · time', ar: 'الـ component · الوقت' },
          code: ['this.term$.pipe(', '  debounceTime(300),', '  distinctUntilChanged(),', '  switchMap(q => this.api.search(q)),', ')'],
          say: { en: `Every blue word here is RxJS’s: ${ng('pipe')}, ${ng('debounceTime')}, ${ng('distinctUntilChanged')}, ${ng('switchMap')}. ${mine('q')} is a parameter you named; it lives for one line. ${pub('search')} is the service’s method, so this is the one name the component shares with another file.`,
                 ar: `كل كلمة زرقا هنا بتاعة RxJS: ${ng('pipe')} و${ng('debounceTime')} و${ng('distinctUntilChanged')} و${ng('switchMap')}. و${mine('q')} parameter انت سمّيته؛ عايش سطر واحد. و${pub('search')} ميثود الـ service، فده الاسم الوحيد اللي الـ component متشارك فيه مع ملف تاني.` } },
        { file: 'product-api.ts', lang: 'ts', who: { en: 'service · the request', ar: 'الـ service · الـ request' },
          code: ['search(text: string): Observable<Product[]> {', "  return this.http.get<Product[]>('/api/products', { params: { q: text } });", '}'],
          say: { en: `The service picked the name ${pub('search')}. Its parameter is ${mine('text')}: the component’s ${mine('q')} arrives here under a different name, and that is fine. The <code>q</code> inside <code>{ q: text }</code> is <b>not yours</b>: it is the query parameter the server expects.`,
                 ar: `الـ service هي اللي اختارت اسم ${pub('search')}. والـ parameter بتاعها اسمه ${mine('text')}: الـ ${mine('q')} بتاع الـ component بيوصل هنا باسم تاني، وده عادي. أما الـ <code>q</code> اللي جوه <code>{ q: text }</code> <b>مش بتاعك</b>: ده الـ query parameter اللي السيرفر مستنيه.` } },
        { file: 'search.ts', lang: 'ts', who: { en: 'component · bridge back', ar: 'الـ component · الكوبري لجوه' },
          code: ['readonly results = toSignal(', '  this.term$.pipe(/* the operators above */),', '  { initialValue: [] as Product[] },', ');'],
          say: { en: `${ng('toSignal')} is Angular’s bridge back. It subscribes for you and unsubscribes when the component goes away. ${ng('initialValue')} is its option key, so its spelling is fixed. ${mine('results')} is your name.`,
                 ar: `${ng('toSignal')} كوبري أنجولار للرجوع. بيعمل subscribe بدالك وبيلغيه لما الـ component يمشي. و${ng('initialValue')} مفتاح الإعداد بتاعه، فكتابته ثابتة. و${mine('results')} اسمك انت.` } },
        { file: 'search.html', lang: 'html', who: { en: 'template · read', ar: 'التمبلت · القراية' },
          code: ['@for (p of results(); track p.id) {', '  <li>{{ p.name }}</li>', '}'],
          say: { en: `The template reads a plain signal, with brackets: ${mine('results')}<code>()</code>. No <code>async</code> pipe, no subscribe. ${mine('p')} is your loop variable; ${pub('id')} and ${pub('name')} are fields of your ${pub('Product')} type.`,
                 ar: `التمبلت بيقرا signal عادية، بالقوسين: ${mine('results')}<code>()</code>. من غير pipe <code>async</code> ومن غير subscribe. و${mine('p')} متغير اللوب بتاعك؛ و${pub('id')} و${pub('name')} fields في النوع ${pub('Product')} بتاعك.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: '<code>term</code> (signal) → <code>toObservable</code> → RxJS operators → <code>toSignal</code> → <code>results</code> (signal). You name the two ends and the stream in the middle. Angular names the two bridges. RxJS names the operators. The only name you share with another file is <b>search</b>.',
        ar: '<code>term</code> (signal) ← <code>toObservable</code> ← operators بتوع RxJS ← <code>toSignal</code> ← <code>results</code> (signal). انت بتسمّي الطرفين والـ stream اللي في النص. أنجولار بيسمّي الكوبرين. وRxJS بيسمّي الـ operators. والاسم الوحيد اللي متشارك مع ملف تاني هو <b>search</b>.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Component or service?', ar: 'الـ component ولا الـ service؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'Every piece has one home. The service speaks observables. The template speaks signals. The component is the only place where the two meet.',
      ar: 'كل حتة ليها بيت واحد. الـ service بتتكلم observables. والتمبلت بيتكلم signals. والـ component هو المكان الوحيد اللي الاتنين بيتقابلوا فيه.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>(input)="term.set(box.value)"</code>', 'component <code>.html</code>', 'component', `${ng('input')} and ${ng('value')} are the browser’s; you pick ${mine('#box')} and ${mine('term')}`],
            ar: ['<code>(input)="term.set(box.value)"</code>', '<code>.html</code> الـ component', 'الـ component', `${ng('input')} و${ng('value')} بتوع المتصفح؛ وانت بتختار ${mine('#box')} و${mine('term')}`] },
          { en: ['<code>readonly term = signal(\'\')</code>', 'component <code>.ts</code>', 'component', `you pick ${mine('term')}; ${ng('signal')} is Angular’s`],
            ar: ['<code>readonly term = signal(\'\')</code>', '<code>.ts</code> الـ component', 'الـ component', `انت بتختار ${mine('term')}؛ و${ng('signal')} بتاعة أنجولار`] },
          { en: ['<code>term$ = toObservable(this.term)</code>', 'component <code>.ts</code>', 'component', `you pick ${mine('term$')}; ${ng('toObservable')} is Angular’s`],
            ar: ['<code>term$ = toObservable(this.term)</code>', '<code>.ts</code> الـ component', 'الـ component', `انت بتختار ${mine('term$')}؛ و${ng('toObservable')} بتاعة أنجولار`] },
          { en: ['<code>.pipe(debounceTime(300), …)</code>', 'component <code>.ts</code>', 'component', 'nobody: every word is RxJS’s'],
            ar: ['<code>.pipe(debounceTime(300), …)</code>', '<code>.ts</code> الـ component', 'الـ component', 'محدش: كل كلمة بتاعة RxJS'] },
          { en: ['<code>search(text: string)</code>', 'service', 'service', `the service picks ${pub('search')}; the component must copy it. ${mine('text')} is the service’s alone`],
            ar: ['<code>search(text: string)</code>', 'الـ service', 'الـ service', `الـ service بتختار ${pub('search')}؛ والـ component لازم ينسخه. و${mine('text')} بتاع الـ service لوحدها`] },
          { en: ['<code>{ params: { q: text } }</code>', 'service', 'service', `${ng('params')} is Angular’s, <code>q</code> is the <b>server’s</b>`],
            ar: ['<code>{ params: { q: text } }</code>', 'الـ service', 'الـ service', `${ng('params')} بتاع أنجولار، و<code>q</code> بتاع <b>السيرفر</b>`] },
          { en: ['<code>results = toSignal(…, { initialValue: [] })</code>', 'component <code>.ts</code>', 'component', `you pick ${mine('results')}; ${ng('toSignal')} and ${ng('initialValue')} are Angular’s`],
            ar: ['<code>results = toSignal(…, { initialValue: [] })</code>', '<code>.ts</code> الـ component', 'الـ component', `انت بتختار ${mine('results')}؛ و${ng('toSignal')} و${ng('initialValue')} بتوع أنجولار`] },
          { en: ['<code>@for (p of results(); track p.id)</code>', 'component <code>.html</code>', 'component', `you pick ${mine('p')}; ${pub('id')} comes from ${pub('Product')}`],
            ar: ['<code>@for (p of results(); track p.id)</code>', '<code>.html</code> الـ component', 'الـ component', `انت بتختار ${mine('p')}؛ و${pub('id')} جاي من ${pub('Product')}`] },
        ] },
      { t: 'ul',
        en: ['<b>The service does not know signals exist.</b> It returns an <code>Observable</code> and that is all. Where to cross into signals is the component’s decision.',
             '<b>The template never sees a stream here.</b> It writes one signal (<code>term</code>) and reads another (<code>results</code>). That is why there is no <code>async</code> pipe and no subscribe in the HTML.',
             '<b>The bridges are called once, on a field.</b> <code>toObservable</code> and <code>toSignal</code> go on a class field (or in the constructor), never in the template and never inside a click handler.'],
        ar: ['<b>الـ service متعرفش إن فيه signals أصلًا.</b> بترجّع <code>Observable</code> وخلاص. وإمتى تعدّي للـ signals ده قرار الـ component.',
             '<b>التمبلت عمره ما بيشوف stream هنا.</b> بيكتب في signal واحدة (<code>term</code>) وبيقرا واحدة تانية (<code>results</code>). وعشان كده مفيش pipe <code>async</code> ولا subscribe في الـ HTML.',
             '<b>الكباري بتتنادى مرة واحدة، على field.</b> <code>toObservable</code> و<code>toSignal</code> بيتكتبوا على field في الكلاس (أو في الـ constructor)، عمرهم ما يتكتبوا في التمبلت ولا جوه ميثود بتاعة click.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All four files, every name coloured', ar: 'الأربع ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same search, complete. Hover a name to see everywhere else it appears. Then press <b>Rename test</b>: every green and orange name becomes a made-up word, and the code still compiles.',
      ar: 'نفس البحث، كامل. قف بالماوس على أي اسم عشان تشوف كل مكان تاني هو فيه. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: كل اسم أخضر وبرتقاني هيبقى كلمة عشوائية، والكود لسه بيعمل compile.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'product.ts', lang: 'ts', tag: { en: 'the data', ar: 'الداتا' }, code: [
        'export interface Product {',
        '  id: number;',
        '  name: string;',
        '}' ] },
      { t: 'code', name: 'product-api.ts', lang: 'ts', tag: { en: 'service · speaks observables', ar: 'الـ service · بتتكلم observables' }, code: [
        "import { Injectable, inject } from '@angular/core';",
        "import { HttpClient } from '@angular/common/http';",
        "import { Observable } from 'rxjs';",
        "import { Product } from './product';",
        '',
        "@Injectable({ providedIn: 'root' })",
        'export class ProductApi {',
        '  private readonly http = inject(HttpClient);',
        '',
        '  search(text: string): Observable<Product[]> {',
        "    return this.http.get<Product[]>('/api/products', { params: { q: text } });",
        '  }',
        '}' ] },
      { t: 'code', name: 'search.ts', lang: 'ts', tag: { en: 'component · where they meet', ar: 'الـ component · مكان المقابلة' }, code: [
        "import { Component, inject, signal } from '@angular/core';",
        "import { toObservable, toSignal } from '@angular/core/rxjs-interop';",
        "import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';",
        "import { ProductApi } from './product-api';",
        "import { Product } from './product';",
        '',
        '@Component({',
        "  selector: 'app-search',",
        "  templateUrl: './search.html',",
        '})',
        'export class Search {',
        '  private readonly api = inject(ProductApi);',
        '',
        "  readonly term = signal('');                        // state in",
        '  private readonly term$ = toObservable(this.term);  // signal → stream',
        '',
        '  readonly results = toSignal(                        // stream → signal',
        '    this.term$.pipe(',
        '      debounceTime(300),',
        '      distinctUntilChanged(),',
        '      switchMap(q => this.api.search(q)),',
        '    ),',
        '    { initialValue: [] as Product[] },',
        '  );',
        '}' ] },
      { t: 'code', name: 'search.html', lang: 'html', tag: { en: 'template · speaks signals', ar: 'التمبلت · بيتكلم signals' }, code: [
        '<input #box (input)="term.set(box.value)" placeholder="Type here" />',
        '',
        '<ul>',
        '  @for (p of results(); track p.id) {',
        '    <li>{{ p.name }}</li>',
        '  } @empty {',
        '    <li>Nothing found</li>',
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
      en: 'Every name you own can be renamed, and here almost every mistake is a compile error. The dangerous one is a name that looks like yours but is not: the server’s <code>q</code>.',
      ar: 'أي اسم بتاعك ينفع يتغير، وهنا تقريبًا كل غلطة بتديك compile error. الخطير هو اسم شكله بتاعك وهو مش بتاعك: الـ <code>q</code> بتاع السيرفر.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'], ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [pub('search') + ' (service method)', 'the component: <code>this.api.search(q)</code>', 'Compile error: the property does not exist on <code>ProductApi</code>.'],
            ar: [pub('search') + ' (ميثود الـ service)', 'الـ component: <code>this.api.search(q)</code>', 'Compile error: الـ property مش موجودة في <code>ProductApi</code>.'] },
          { en: [pub('ProductApi') + ' / ' + pub('Product'), 'every <code>import</code> line and every use', 'Compile error on the import.'],
            ar: [pub('ProductApi') + ' / ' + pub('Product'), 'كل سطر <code>import</code> وكل مكان بيستخدمه', 'Compile error في الـ import.'] },
          { en: [pub('id') + ' / ' + pub('name') + ' (fields)', 'the template: <code>p.id</code>, <code>p.name</code>', 'Compile error in the template (with the default strict template checking).'],
            ar: [pub('id') + ' / ' + pub('name') + ' (fields)', 'التمبلت: <code>p.id</code> و<code>p.name</code>', 'Compile error في التمبلت (مع الـ strict template checking اللي شغال افتراضيًا).'] },
          { en: [mine('term'), 'the template’s <code>term.set(…)</code> and <code>toObservable(this.term)</code>', 'Compile error.'],
            ar: [mine('term'), '<code>term.set(…)</code> في التمبلت و<code>toObservable(this.term)</code>', 'Compile error.'] },
          { en: [mine('term$'), 'the line that pipes it', 'Compile error.'], ar: [mine('term$'), 'السطر اللي بيعمله pipe', 'Compile error.'] },
          { en: [mine('results'), 'the template’s <code>results()</code>', 'Compile error in the template.'], ar: [mine('results'), '<code>results()</code> في التمبلت', 'Compile error في التمبلت.'] },
          { en: [mine('#box'), 'every <code>box.</code> in the same template', 'Compile error: Angular looks for <code>box</code> on the component and does not find it.'],
            ar: [mine('#box'), 'كل <code>box.</code> في نفس التمبلت', 'Compile error: أنجولار بيدوّر على <code>box</code> في الـ component ومش بيلاقيه.'] },
          { en: [`${mine('q')}, ${mine('text')}, ${mine('p')}`, 'only the one line or block they live in', 'Compile error right there.'],
            ar: [`${mine('q')} و${mine('text')} و${mine('p')}`, 'السطر أو البلوك اللي عايشين فيه بس', 'Compile error في نفس المكان.'] },
          { en: ['the <code>q</code> in <code>{ q: text }</code>', 'nothing in your code: the <b>server</b> would have to change', '<b>No error.</b> The request goes out with a parameter the server does not know, and what you get back depends on the server.'],
            ar: ['الـ <code>q</code> اللي في <code>{ q: text }</code>', 'ولا حاجة في الكود بتاعك: <b>السيرفر</b> هو اللي لازم يتغير', '<b>مفيش error.</b> الـ request بيطلع بـ parameter السيرفر مايعرفوش، واللي هيرجع على حسب السيرفر.'] },
          { en: [`${ng('toSignal')}, ${ng('toObservable')}, ${ng('initialValue')}, ${ng('switchMap')}…`, 'nothing: you cannot rename these', 'They are Angular’s and RxJS’s words.'],
            ar: [`${ng('toSignal')} و${ng('toObservable')} و${ng('initialValue')} و${ng('switchMap')}…`, 'ولا حاجة: دول مينفعش يتغيروا', 'دي كلمات أنجولار وRxJS.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b> above the files. Watch the <code>q</code> in <code>{ q: text }</code>: it does not move, because it was never yours.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b> فوق الملفات. وبص على الـ <code>q</code> اللي في <code>{ q: text }</code>: مش هيتحرك، عشان عمره ما كان بتاعك.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتوعك' },
    title: { en: 'Four owners besides you', ar: 'أربع أصحاب غيرك' },
    lead: {
      en: 'In most topics “not yours” means “Angular’s”. Here the fixed words come from four places, and knowing which is which tells you where to look them up.',
      ar: 'في أغلب المواضيع «مش بتاعك» معناها «بتاع أنجولار». هنا الكلمات الثابتة جاية من أربع أماكن، ولما تعرف مين فيهم بتاع مين هتعرف تدوّر عليه فين.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Name', 'Owner', 'Imported from'], ar: ['الاسم', 'صاحبه', 'جاي منين'] },
        rows: [
          { en: [`${ng('toSignal')}, ${ng('toObservable')}, ${ng('rxResource')}, ${ng('takeUntilDestroyed')}`, 'Angular', '<code>@angular/core/rxjs-interop</code>'],
            ar: [`${ng('toSignal')} و${ng('toObservable')} و${ng('rxResource')} و${ng('takeUntilDestroyed')}`, 'أنجولار', '<code>@angular/core/rxjs-interop</code>'] },
          { en: [`${ng('signal')}, ${ng('inject')}, ${ng('initialValue')}`, 'Angular', '<code>@angular/core</code> (the option key is part of <code>toSignal</code>)'],
            ar: [`${ng('signal')} و${ng('inject')} و${ng('initialValue')}`, 'أنجولار', '<code>@angular/core</code> (ومفتاح الإعداد جزء من <code>toSignal</code>)'] },
          { en: [`${ng('pipe')}, ${ng('debounceTime')}, ${ng('switchMap')}, ${ng('Observable')}`, 'RxJS', '<code>rxjs</code>'],
            ar: [`${ng('pipe')} و${ng('debounceTime')} و${ng('switchMap')} و${ng('Observable')}`, 'RxJS', '<code>rxjs</code>'] },
          { en: [`${ng('input')}, ${ng('value')}`, 'the browser', 'nothing to import: it is HTML and the DOM'],
            ar: [`${ng('input')} و${ng('value')}`, 'المتصفح', 'مفيش import: دي HTML والـ DOM'] },
          { en: ['<code>q</code>, <code>/api/products</code>', 'the server', 'the backend’s API documentation'],
            ar: ['<code>q</code> و<code>/api/products</code>', 'السيرفر', 'التوثيق بتاع الـ API في الباك إند'] },
        ] },
      { t: 'p',
        en: 'And one thing that looks official but belongs to nobody: the <b><code>$</code> at the end</b> of <code>term$</code>. It is a common community habit meaning “this is an observable”. TypeScript does not care, Angular does not care, and removing it changes nothing.',
        ar: 'وفيه حاجة واحدة شكلها رسمي وهي مش بتاعة حد: <b>الـ <code>$</code> اللي في الآخر</b> في <code>term$</code>. دي عادة منتشرة في المجتمع معناها «ده observable». TypeScript مايهموش، وأنجولار مايهموش، ولو شلتها مفيش حاجة هتتغير.' },
      { t: 'code', name: 'search.ts · without the $', lang: 'ts', tag: { en: 'works exactly the same', ar: 'بيشتغل بالظبط زي ما هو' }, code: [
        'private readonly termStream = toObservable(this.term);   // legal, just less common' ] },
      { t: 'note', label: { en: 'Remember', ar: 'افتكر' },
        en: 'Never put a <code>$</code> on a signal. <code>results$</code> tells the next reader “subscribe to me”, and they will write <code>results$ | async</code> on something that is not an observable.',
        ar: 'عمرك ما تحط <code>$</code> على signal. <code>results$</code> بتقول للي بعدك «اعمل subscribe عليّا»، وهيكتب <code>results$ | async</code> على حاجة مش observable.' }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'None of these is enforced. They make it obvious, at a glance, which world a value lives in.',
      ar: 'ولا واحدة من دول إجبارية. هي بس بتخليك تعرف من أول نظرة القيمة دي عايشة في أنهي عالم.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['a stream field', '<code>term$</code>, <code>results$</code>', '<code>termObservable</code>, <code>obs</code>', 'The <code>$</code> is short and widely understood.'],
            ar: ['field فيه stream', '<code>term$</code> و<code>results$</code>', '<code>termObservable</code> و<code>obs</code>', 'الـ <code>$</code> قصيرة والكل فاهمها.'] },
          { en: ['a signal field', '<code>term</code>, <code>results</code>', '<code>termSignal</code>, <code>results$</code>', 'A signal reads like a value, so name it like one.'],
            ar: ['field فيه signal', '<code>term</code> و<code>results</code>', '<code>termSignal</code> و<code>results$</code>', 'الـ signal بتتقري زي القيمة، فسمّيها زي القيمة.'] },
          { en: ['the same data in both forms', '<code>term</code> and <code>term$</code>', '<code>term</code> and <code>search$</code>', 'Same word, different suffix: the reader sees at once they are one value in two shapes.'],
            ar: ['نفس الداتا في الشكلين', '<code>term</code> و<code>term$</code>', '<code>term</code> و<code>search$</code>', 'نفس الكلمة بلاحقة مختلفة: اللي بيقرا يفهم على طول إنهم قيمة واحدة بشكلين.'] },
          { en: ['a service method that returns an observable', '<code>search(text)</code>, <code>getAll()</code>', '<code>searchObservable()</code>', 'Name what it does. Its return type already says “observable”.'],
            ar: ['ميثود في service بترجّع observable', '<code>search(text)</code> و<code>getAll()</code>', '<code>searchObservable()</code>', 'سمّي اللي بتعمله. نوع الـ return بيقول «observable» أصلًا.'] },
          { en: ['an operator’s arrow parameter', '<code>q</code>, <code>text</code>, <code>query</code>', '—', 'It lives for one line. Short is fine.'],
            ar: ['الـ parameter بتاع arrow في operator', '<code>q</code> و<code>text</code> و<code>query</code>', '—', 'عايش سطر واحد. القصير كويس.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Option keys, and the name Angular hands you', ar: 'مفاتيح الإعداد، والاسم اللي أنجولار بيدّيهولك' },
    lead: {
      en: 'Some names sit in your code but are read by Angular. You type them, Angular decides them.',
      ar: 'فيه أسماء قاعدة في الكود بتاعك بس أنجولار هو اللي بيقراها. انت بتكتبها، وأنجولار هو اللي بيحددها.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'Option keys are fixed; their values are yours', ar: 'مفاتيح الإعداد ثابتة؛ والقيم بتاعتك' }, blocks: [
        { t: 'pair',
          bad:  { name: 'search.ts · typo', lang: 'ts', code: ['{ initalValue: [] as Product[] }'] },
          good: { name: 'search.ts', lang: 'ts', code: ['{ initialValue: [] as Product[] }'] } },
        { t: 'p', en: 'A misspelled key in an object literal passed straight to <code>toSignal</code> is a compile error: TypeScript knows the allowed keys. Same for <code>params</code> and <code>stream</code> below.',
                  ar: 'مفتاح مكتوب غلط في object literal داخل على طول لـ <code>toSignal</code> بيدي compile error: TypeScript عارف المفاتيح المسموحة. ونفس الكلام لـ <code>params</code> و<code>stream</code> تحت.' }
      ]},
      { t: 'step', n: 'B', title: { en: '<code>rxResource</code> hands you an object named <code>params</code>', ar: '<code>rxResource</code> بيدّيك object اسمه <code>params</code>' }, blocks: [
        { t: 'code', name: 'search.ts · with rxResource', lang: 'ts', tag: { en: 'no debounce, but no subscribe either', ar: 'من غير debounce، بس من غير subscribe برضه' }, code: [
          'readonly results = rxResource({',
          '  params: () => ({ query: this.term() }),',
          '  stream: ({ params }) => this.api.search(params.query),',
          '});' ] },
        { t: 'p',
          en: `${ng('params')} and ${ng('stream')} are Angular’s keys. Inside ${ng('stream')}, Angular passes an object, and the destructured <code>{ params }</code> must use that exact property name. ${mine('query')} is yours: you invented it on the line above and read it back on this one. (Before Angular 20 these keys were called <code>request</code> and <code>loader</code>.)`,
          ar: `${ng('params')} و${ng('stream')} مفاتيح أنجولار. جوه ${ng('stream')}، أنجولار بيبعت object، والـ <code>{ params }</code> اللي بتفكّه لازم يستخدم اسم الـ property ده بالظبط. أما ${mine('query')} فبتاعك: انت اخترعته في السطر اللي فوق وبتقراه تاني في السطر ده. (قبل أنجولار 20 المفاتيح دي كان اسمها <code>request</code> و<code>loader</code>.)` },
        { t: 'pair',
          bad:  { name: 'search.ts · wrong property', lang: 'ts', code: ['stream: ({ args }) => this.api.search(args.query),'] },
          good: { name: 'search.ts · renamed locally', lang: 'ts', code: ['stream: ({ params: args }) => this.api.search(args.query),'] } },
        { t: 'p', en: 'Want a different local name? Rename while destructuring: <code>{ params: args }</code>. The left side is Angular’s, the right side is yours. The first version is a compile error, because the object has no property called <code>args</code>.',
                  ar: 'عايز اسم محلي تاني؟ غيّره وانت بتفك: <code>{ params: args }</code>. الشمال بتاع أنجولار، واليمين بتاعك. النسخة الأولى compile error، عشان الـ object مفيهوش property اسمها <code>args</code>.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: 'Before <code>toSignal</code>: a Subject and the <code>async</code> pipe', ar: 'قبل <code>toSignal</code>: Subject والـ pipe <code>async</code>' },
    lead: {
      en: 'You will meet this version everywhere. The operators and the service are identical. What changes is which names end in <code>$</code> and who subscribes.',
      ar: 'هتقابل النسخة دي في كل حتة. الـ operators والـ service زي ما هما. اللي بيتغير هو أنهي أسماء بتخلص بـ <code>$</code>، ومين اللي بيعمل subscribe.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'search.ts · older', lang: 'ts', code: [
          'private readonly term$ = new Subject<string>();',
          '',
          'readonly results$ = this.term$.pipe(',
          '  debounceTime(300),',
          '  distinctUntilChanged(),',
          '  switchMap(q => this.api.search(q)),',
          ');' ] },
        good: { name: 'search.ts · today', lang: 'ts', code: [
          "readonly term = signal('');",
          'private readonly term$ = toObservable(this.term);',
          'readonly results = toSignal(this.term$.pipe(',
          '  debounceTime(300),',
          '  distinctUntilChanged(),',
          '  switchMap(q => this.api.search(q)),',
          '), { initialValue: [] as Product[] });' ] } },
      { t: 'pair',
        bad:  { name: 'search.html · older', lang: 'html', code: [
          '<input #box (input)="term$.next(box.value)" />',
          '@for (p of (results$ | async) ?? []; track p.id) {',
          '  <li>{{ p.name }}</li>',
          '}' ] },
        good: { name: 'search.html · today', lang: 'html', code: [
          '<input #box (input)="term.set(box.value)" />',
          '@for (p of results(); track p.id) {',
          '  <li>{{ p.name }}</li>',
          '}' ] } },
      { t: 'p',
        en: `In the older version the template talks to streams: it pushes with ${ng('next')} and reads with the ${ng('async')} pipe (and the component must list <code>AsyncPipe</code> in <code>imports</code>). ${ng('async')} gives <code>null</code> before the first value, hence the <code>?? []</code>. Today the template talks to signals, and ${ng('initialValue')} covers the “before the first value” moment.`,
        ar: `في النسخة القديمة التمبلت بيكلّم streams: بيدخّل قيمة بـ ${ng('next')} وبيقرا بالـ pipe ${ng('async')} (والـ component لازم يكتب <code>AsyncPipe</code> في <code>imports</code>). و${ng('async')} بيدّي <code>null</code> قبل أول قيمة، وعشان كده <code>?? []</code>. النهارده التمبلت بيكلّم signals، و${ng('initialValue')} بتغطي لحظة «قبل أول قيمة».` }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, or something strange', ar: 'مش بيعمل حاجة، أو بيعمل حاجة غريبة' },
    title: { en: 'Mistakes that fail silently, or confusingly', ar: 'غلطات بتفشل في صمت، أو بشكل ملخبط' },
    lead: {
      en: 'Most interop mistakes are loud. These five are not, or they fail far from where the mistake is.',
      ar: 'أغلب غلطات الـ interop بتبان. الخمسة دول لأ، أو بيفشلوا في مكان بعيد عن الغلطة.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'Reading the signal without brackets', ar: 'قراية الـ signal من غير قوسين' }, blocks: [
        { t: 'pair',
          bad:  { name: 'search.html', lang: 'html', code: ['<p>{{ results.length }} found</p>'] },
          good: { name: 'search.html', lang: 'html', code: ['<p>{{ results().length }} found</p>'] } },
        { t: 'p', en: 'A signal is a function, and every function has a <code>length</code>: the number of parameters it takes. For a signal that is 0. So the page says “0 found” forever, and nothing complains.',
                  ar: 'الـ signal عبارة عن function، وأي function ليها <code>length</code>: عدد الـ parameters اللي بتاخدها. وفي الـ signal ده 0. فالصفحة هتقول «0 found» على طول، ومحدش هيشتكي.' }
      ]},
      { t: 'step', n: '2', title: { en: 'One failed request ends the search for good', ar: 'request واحد فاشل بيقفل البحث خالص' }, blocks: [
        { t: 'pair',
          bad:  { name: 'search.ts', lang: 'ts', code: ['switchMap(q => this.api.search(q)),'] },
          good: { name: 'search.ts', lang: 'ts', code: ['switchMap(q => this.api.search(q).pipe(', '  catchError(() => of([] as Product[])),', ')),'] } },
        { t: 'p', en: 'An error travels down the stream and ends it. <code>toSignal</code> then throws that error whenever <code>results()</code> is read, and later keystrokes search nothing. Catch the error on the <b>inner</b> request, inside <code>switchMap</code>, so only that one request fails and the outer stream keeps going.',
                  ar: 'الـ error بيمشي في الـ stream وبيقفله. وبعدها <code>toSignal</code> بيرمي الـ error ده كل ما حد يقرا <code>results()</code>، والكتابة اللي بعد كده مش بتدوّر على حاجة. امسك الـ error على الـ request <b>الداخلي</b>، جوه <code>switchMap</code>، عشان الـ request ده بس اللي يفشل والـ stream الكبير يكمّل.' }
      ]},
      { t: 'step', n: '3', title: { en: 'Calling <code>toSignal</code> inside a method', ar: 'إنك تنادي <code>toSignal</code> جوه ميثود' }, blocks: [
        { t: 'pair',
          bad:  { name: 'search.ts · in a click handler', lang: 'ts', code: [
            'refresh() {',
            '  const fresh = toSignal(this.api.search(this.term()));',
            '}' ] },
          good: { name: 'search.ts · on a field', lang: 'ts', code: [
            'readonly results = toSignal(',
            '  this.term$.pipe(switchMap(q => this.api.search(q))),',
            '  { initialValue: [] as Product[] },',
            ');' ] } },
        { t: 'p', en: 'This compiles, then throws at runtime when the method runs: <code>toSignal()</code> can only be used within an injection context (NG0203). It needs to know which component’s lifetime to clean up with, and it only knows that on a field or in the constructor. To react to a click, change a signal (<code>term</code>) and let the existing pipeline do the rest.',
                  ar: 'ده بيعمل compile، وبعدين بيرمي error وقت التشغيل لما الميثود تشتغل: <code>toSignal()</code> ينفع يتستخدم بس جوه injection context (NG0203). هو محتاج يعرف ينضّف مع عمر أنهي component، ومش بيعرف ده غير على field أو في الـ constructor. عشان ترد على click، غيّر signal (<code>term</code>) وسيب الـ pipeline الموجود يكمّل الباقي.' }
      ]},
      { t: 'step', n: '4', title: { en: 'Subscribing by hand to a stream that never ends', ar: 'subscribe بإيدك على stream عمره ما بيخلص' }, blocks: [
        { t: 'pair',
          bad:  { name: 'search.ts · leaks', lang: 'ts', code: [
            'constructor() {',
            "  fromEvent(window, 'online')",
            "    .subscribe(() => console.log('back online'));",
            '}' ] },
          good: { name: 'search.ts · cleans up', lang: 'ts', code: [
            'constructor() {',
            "  fromEvent(window, 'online')",
            '    .pipe(takeUntilDestroyed())',
            "    .subscribe(() => console.log('back online'));",
            '}' ] } },
        { t: 'p', en: 'The window’s events never complete. Each time the search page is opened and closed, one more listener stays behind. No error, ever. <code>takeUntilDestroyed()</code> ends the subscription with the component; with no argument it must be called in the constructor or on a field, like <code>toSignal</code>.',
                  ar: 'الـ events بتاعة الـ window عمرها ما بتخلص. كل مرة صفحة البحث تتفتح وتتقفل، listener زيادة بيفضل موجود. ومفيش error خالص. <code>takeUntilDestroyed()</code> بيقفل الـ subscription مع الـ component؛ ومن غير argument لازم يتنادى في الـ constructor أو على field، زي <code>toSignal</code> بالظبط.' }
      ]},
      { t: 'step', n: '5', title: { en: 'Expecting one emission per <code>set()</code>', ar: 'إنك تستنى emission لكل <code>set()</code>' }, blocks: [
        { t: 'code', name: 'search.ts · two sets in a row', lang: 'ts', tag: { en: 'surprising, not broken', ar: 'غريب، بس مش بايظ' }, code: [
          "this.term.set('ang');",
          "this.term.set('angular');   // term$ emits once, with 'angular'" ] },
        { t: 'p', en: '<code>toObservable</code> sends the signal’s <b>latest</b> value a moment later, not every value you set. For a search box that is exactly what you want. If you need every single event, it was never state: use a <code>Subject</code> or an output.',
                  ar: '<code>toObservable</code> بيبعت <b>آخر</b> قيمة في الـ signal بعد لحظة، مش كل قيمة عملتها set. ولخانة بحث ده بالظبط اللي انت عايزه. لو محتاج كل event لوحده، يبقى دي عمرها ما كانت حالة: استخدم <code>Subject</code> أو output.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it does nothing', ar: 'لما مايعملش حاجة' },
    title: { en: 'Five questions, in this order', ar: 'خمس أسئلة، بالترتيب ده' },
    lead: {
      en: 'The list stays empty or never updates. Ask these first.',
      ar: 'الليستة فاضية أو مش بتتحدث. اسأل دول الأول.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Does the template call the signal with brackets: <code>results()</code>, not <code>results</code>?',
                  ar: '<b>1.</b> التمبلت بينادي الـ signal بالقوسين: <code>results()</code>، مش <code>results</code>؟' },
      { t: 'chk', en: '<b>2.</b> Is there an error in the console from an earlier request? Then the stream is over. Put <code>catchError</code> inside <code>switchMap</code>.',
                  ar: '<b>2.</b> فيه error في الـ console من request قبل كده؟ يبقى الـ stream خلص. حط <code>catchError</code> جوه <code>switchMap</code>.' },
      { t: 'chk', en: '<b>3.</b> Are <code>toSignal</code> and <code>toObservable</code> on a field or in the constructor, not inside a method?',
                  ar: '<b>3.</b> <code>toSignal</code> و<code>toObservable</code> على field أو في الـ constructor، مش جوه ميثود؟' },
      { t: 'chk', en: '<b>4.</b> Is an operator holding the value back? Add <code>tap(v =&gt; console.log(v))</code> before and after <code>debounceTime</code> and <code>distinctUntilChanged</code>.',
                  ar: '<b>4.</b> فيه operator ماسك القيمة؟ حط <code>tap(v =&gt; console.log(v))</code> قبل وبعد <code>debounceTime</code> و<code>distinctUntilChanged</code>.' },
      { t: 'chk', en: '<b>5.</b> Open the Network tab. Does the request go out, with the query parameter name the server expects?',
                  ar: '<b>5.</b> افتح تاب الـ Network. الـ request بيطلع، وبالاسم اللي السيرفر مستنيه للـ query parameter؟' }
    ]
  }
  ]
};
