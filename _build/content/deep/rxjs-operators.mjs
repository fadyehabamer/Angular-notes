/* ==================================================================
   switchMap & co, name by name — a companion page after the RxJS
   operators topic. One running example (a checkout: address lookup
   + place order) followed through every file, with every name
   coloured by who owns it. Names list: inline.
   ================================================================== */

/* a name in running text, coloured like the code and linked on hover */
const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

const API = ['address-api.ts', 'address-api.ts — shorthand', 'address-api.ts — explicit'];

export default {
  topic: 'rxjs-operators',
  tab: 'switchMap & co, name by name — The Angular Signal',
  title: { en: '<code>switchMap</code> and friends, name by name', ar: '<code>switchMap</code> وصحابها، اسم اسم' },
  say: {
    en: 'The page for when a <code>pipe()</code> looks like a wall of words. One checkout page followed from the button to the server and back, every name coloured: <b>RxJS’s</b>, <b>Angular’s</b>, <b>yours</b>, or <b>the server’s</b>.',
    ar: 'الصفحة دي للي بيشوف الـ <code>pipe()</code> حيطة كلام. صفحة دفع واحدة ماشيين وراها من الزرار للسيرفر ورجوع، وكل اسم ملوّن: <b>بتاع RxJS</b>، ولا <b>بتاع أنجولار</b>، ولا <b>بتاعك</b>، ولا <b>بتاع السيرفر</b>.'
  },
  lead: {
    en: 'The idea behind the four maps is one question: <b>a new value arrived while the last one is still busy — cancel, ignore, queue, or run both?</b> The confusing part is the names. A single <code>pipe()</code> mixes operator names from RxJS, bridge functions from Angular, arrow parameters you invent on the spot, a <code>$</code> that looks like syntax, and field names the server chose. This page sorts every one of them.',
    ar: 'الفكرة ورا الأربع maps سؤال واحد: <b>قيمة جديدة وصلت واللي قبلها لسه شغالة — ألغي، ولا أطنّش، ولا أحط في طابور، ولا أشغّل الاتنين؟</b> اللي بيلخبط هو الأسماء. <code>pipe()</code> واحدة فيها أسماء operators من RxJS، وfunctions كوبري من أنجولار، وparameters في arrow functions بتألّفها في ساعتها، و<code>$</code> شكلها syntax، وأسماء حقول السيرفر هو اللي اختارها. الصفحة دي بترتّبهم واحد واحد.'
  },

  names: {
    note: {
      en: 'Every operator is imported from <code>\'rxjs\'</code> by its exact name, so all of them are blue. The <code>$</code> at the end of <code>place$</code> is part of <b>your</b> name, not syntax. The arrow parameters (<code>p</code>, <code>order</code>) are yours and live for one line. Orange means another file types the same name, and for <code>id</code> and <code>label</code> that other side is the server.',
      ar: 'كل operator بيتعمله import من <code>\'rxjs\'</code> باسمه بالظبط، فكلهم أزرق. والـ <code>$</code> اللي في آخر <code>place$</code> جزء من اسم<b>ك</b>، مش syntax. والـ parameters بتوع الـ arrow functions (<code>p</code> و<code>order</code>) بتوعك وعايشين سطر واحد. البرتقاني معناه إن ملف تاني بيكتب نفس الاسم، وفي حالة <code>id</code> و<code>label</code> الناحية التانية دي هي السيرفر.'
    },
    names: [
      /* --- shared --- */
      { n:'AddressApi', k:'pub', w:{ en:'Your service class. The checkout injects it by this name.', ar:'كلاس السيرفس بتاعك. صفحة الدفع بتعمله inject بالاسم ده.' } },
      { n:'lookup', k:'pub', w:{ en:'A service method the checkout calls. Rename it in both files.', ar:'ميثود في السيرفس صفحة الدفع بتناديها. غيّرها في الملفين.' } },
      { n:'placeOrder', k:'pub', w:{ en:'A service method the checkout calls.', ar:'ميثود في السيرفس صفحة الدفع بتناديها.' } },
      { n:'Address', k:'pub', w:{ en:'Your data type, imported by the service.', ar:'نوع الداتا بتاعك، والسيرفس بيعمله import.' } },
      { n:'Order', k:'pub', w:{ en:'Your data type for the server’s reply.', ar:'نوع الداتا بتاعك لرد السيرفر.' } },
      { n:'id', k:'pub', w:{ en:'A field on your types, read in the template and after the order is placed. It must also match the JSON the server sends: TypeScript cannot check that.', ar:'field في الأنواع بتاعتك، بيتقري في التمبلت وبعد ما الأوردر يتعمل. ولازم كمان يطابق الـ JSON اللي السيرفر بيبعته: TypeScript مايقدرش يشيّك على ده.' } },
      { n:'label', k:'pub', re:'(?<![\\w$</-])label(?![\\w$-])', w:{ en:'A field on <code>Address</code>, shown by the template. Must match the server’s JSON too.', ar:'field في <code>Address</code>، والتمبلت بيعرضه. ولازم يطابق الـ JSON بتاع السيرفر برضه.' } },
      { n:'Checkout', k:'pub', w:{ en:'The component’s class. Whoever shows or routes to it imports it by this name.', ar:'كلاس الـ component. أي حد بيعرضه أو بيعمله route بيعمله import بالاسم ده.' } },
      { n:'app-checkout', k:'pub', w:{ en:'The selector. A parent template types this tag.', ar:'الـ selector. تمبلت الأب بيكتب التاج ده.' } },

      /* --- yours, private --- */
      { n:'api', k:'mine', re:'(?<![\\w$/-])api(?![\\w$/-])', w:{ en:'Your field for the injected service. The <code>/api/</code> in URLs is the server’s path, not this.', ar:'الـ field بتاعك للسيرفس اللي اتعمله inject. و<code>/api/</code> اللي في الـ URLs مسار السيرفر، مش هو.' } },
      { n:'router', k:'mine', re:'(?<![\\w$/-])router(?![\\w$-])', w:{ en:'Your field for the injected <code>Router</code>.', ar:'الـ field بتاعك للـ <code>Router</code> اللي اتعمله inject.' } },
      { n:'http', k:'mine', re:'(?<![\\w$/-])http(?![\\w$-])', w:{ en:'Your field for the injected <code>HttpClient</code>. <code>http</code> is only a habit.', ar:'الـ field بتاعك للـ <code>HttpClient</code> اللي اتعمله inject. <code>http</code> مجرد عادة.' } },
      { n:'place$', k:'mine', as:'leek$', w:{ en:'Your private <code>Subject</code> of clicks. The <code>$</code> is part of your name.', ar:'الـ <code>Subject</code> الخاص بتاعك للكليكات. الـ <code>$</code> جزء من اسمك.' } },
      { n:'destroy$', k:'mine', as:'okra$', w:{ en:'The older pattern’s <code>Subject</code>, fired when the component dies.', ar:'الـ <code>Subject</code> بتاع الأسلوب القديم، بيتبعت لما الـ component يموت.' } },
      { n:'postcode', k:'mine', not: API, re:'(?<![\\w$-])postcode(?![\\w$-])', w:{ en:'Your signal holding what the user typed.', ar:'الـ signal بتاعتك اللي شايلة اللي اليوزر كتبه.' } },
      { n:'addressId', k:'mine', not: API, w:{ en:'Your signal for the chosen address.', ar:'الـ signal بتاعتك للعنوان اللي اتختار.' } },
      { n:'busy', k:'mine', w:{ en:'Your signal for “an order is being placed”.', ar:'الـ signal بتاعتك لـ «فيه أوردر بيتعمل».' } },
      { n:'addresses', k:'mine', re:'(?<![\\w$/-])addresses(?![\\w$-])', w:{ en:'Your signal of lookup results, read by the template. <code>/api/addresses</code> is the server’s.', ar:'الـ signal بتاعتك لنتايج البحث، والتمبلت بيقراها. و<code>/api/addresses</code> بتاع السيرفر.' } },
      { n:'place', k:'mine', w:{ en:'Your method, called by the button in this component’s template.', ar:'الميثود بتاعتك، والزرار في تمبلت الـ component ده هو اللي بيناديها.' } },
      { n:'p', k:'mine', only:['ts'], w:{ en:'An arrow parameter: the value coming down the pipe. Its name is yours and lasts one line.', ar:'parameter في arrow function: القيمة اللي نازلة في الـ pipe. اسمه بتاعك وعايش سطر واحد.' } },
      { n:'order', k:'mine', only:['ts'], w:{ en:'An arrow parameter: the value <code>subscribe</code> hands you.', ar:'parameter في arrow function: القيمة اللي <code>subscribe</code> بتديهالك.' } },
      { n:'code', k:'mine', w:{ en:'The service method’s parameter.', ar:'الـ parameter بتاع ميثود السيرفس.' } },
      { n:'chosen', k:'mine', w:{ en:'The service method’s parameter.', ar:'الـ parameter بتاع ميثود السيرفس.' } },
      { n:'a', k:'mine', only:['checkout.html'], w:{ en:'The loop variable in the template.', ar:'متغير اللوب في التمبلت.' } },
      { n:'box', k:'mine', w:{ en:'A template reference (<code>#box</code>) to the input element.', ar:'template reference (<code>#box</code>) لعنصر الـ input.' } },

      /* --- RxJS's --- */
      { n:'switchMap', k:'ng', w:{ en:'RxJS: cancel the previous inner request, keep the newest.', ar:'RxJS: الغي الـ request الجوّاني اللي قبله، وخلّي الأحدث.' } },
      { n:'exhaustMap', k:'ng', w:{ en:'RxJS: ignore new values while the current one is running.', ar:'RxJS: طنّش القيم الجديدة طول ما الحالية شغالة.' } },
      { n:'debounceTime', k:'ng', w:{ en:'RxJS: wait for a pause.', ar:'RxJS: استنى وقفة.' } },
      { n:'distinctUntilChanged', k:'ng', w:{ en:'RxJS: drop a value equal to the last one.', ar:'RxJS: ارمي القيمة لو زي اللي قبلها.' } },
      { n:'filter', k:'ng', w:{ en:'RxJS: let only some values through.', ar:'RxJS: عدّي بعض القيم بس.' } },
      { n:'finalize', k:'ng', w:{ en:'RxJS: run this when the stream ends, fails or is cancelled.', ar:'RxJS: شغّل ده لما الـ stream يخلص أو يفشل أو يتلغي.' } },
      { n:'catchError', k:'ng', w:{ en:'RxJS: handle an error. Must return a stream.', ar:'RxJS: اتعامل مع الـ error. لازم يرجّع stream.' } },
      { n:'EMPTY', k:'ng', w:{ en:'RxJS: a stream that completes with no value.', ar:'RxJS: stream بيخلص من غير أي قيمة.' } },
      { n:'of', k:'ng', not:['html'], w:{ en:'RxJS: a stream of the values you give it.', ar:'RxJS: stream من القيم اللي بتديهاله.' } },
      { n:'takeUntil', k:'ng', w:{ en:'RxJS: stop when another stream fires.', ar:'RxJS: وقّف لما stream تاني يبعت.' } },
      { n:'Subject', k:'ng', w:{ en:'RxJS: a stream you push values into yourself.', ar:'RxJS: stream انت بنفسك اللي بتحط فيه القيم.' } },
      { n:'next', k:'ng', w:{ en:'A <code>Subject</code> method: push a value in.', ar:'ميثود في <code>Subject</code>: حط قيمة جوه.' } },
      { n:'complete', k:'ng', w:{ en:'A <code>Subject</code> method: end the stream.', ar:'ميثود في <code>Subject</code>: قفّل الـ stream.' } },
      { n:'pipe', k:'ng', w:{ en:'The observable method that chains operators.', ar:'ميثود الـ observable اللي بتركّب الـ operators ورا بعض.' } },
      { n:'subscribe', k:'ng', w:{ en:'The observable method that starts it running. Without it, nothing happens.', ar:'ميثود الـ observable اللي بتشغّله. من غيرها، مفيش حاجة بتحصل.' } },
      { n:'length', k:'ng', w:{ en:'JavaScript’s string length.', ar:'طول النص في JavaScript.' } },

      /* --- Angular's, the browser's --- */
      { n:'toSignal', k:'ng', w:{ en:'Angular’s bridge: observable → signal. It subscribes for you.', ar:'كوبري أنجولار: observable ← signal. بيعمل subscribe بدالك.' } },
      { n:'toObservable', k:'ng', w:{ en:'Angular’s bridge: signal → observable. Takes the signal itself, not its value.', ar:'كوبري أنجولار: signal ← observable. بياخد الـ signal نفسها، مش قيمتها.' } },
      { n:'initialValue', k:'ng', w:{ en:'An option key <code>toSignal</code> reads.', ar:'مفتاح إعداد <code>toSignal</code> بيقراه.' } },
      { n:'takeUntilDestroyed', k:'ng', w:{ en:'Angular’s operator: unsubscribe when the component is destroyed.', ar:'الـ operator بتاع أنجولار: اعمل unsubscribe لما الـ component يتشال.' } },
      { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
      { n:'set', k:'ng', w:{ en:'A signal method.', ar:'ميثود بتاعة الـ signal.' } },
      { n:'inject', k:'ng', w:{ en:'Angular’s function that hands you a service.', ar:'الـ function بتاعة أنجولار اللي بتديك سيرفس.' } },
      { n:'HttpClient', k:'ng', w:{ en:'Angular’s HTTP service.', ar:'سيرفس الـ HTTP بتاع أنجولار.' } },
      { n:'get', k:'ng', w:{ en:'An <code>HttpClient</code> method.', ar:'ميثود في <code>HttpClient</code>.' } },
      { n:'post', k:'ng', w:{ en:'An <code>HttpClient</code> method.', ar:'ميثود في <code>HttpClient</code>.' } },
      { n:'params', k:'ng', w:{ en:'An <code>HttpClient</code> option key: the query string. The keys inside it are the server’s.', ar:'مفتاح إعداد في <code>HttpClient</code>: الـ query string. والمفاتيح اللي جواه بتاعة السيرفر.' } },
      { n:'Router', k:'ng', w:{ en:'Angular’s router service.', ar:'سيرفس الراوتر بتاع أنجولار.' } },
      { n:'navigate', k:'ng', w:{ en:'A <code>Router</code> method.', ar:'ميثود في <code>Router</code>.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator.', ar:'الـ decorator بتاع أنجولار.' } },
      { n:'@Injectable', k:'ng', w:{ en:'Angular’s decorator for a service.', ar:'الـ decorator بتاع أنجولار للسيرفس.' } },
      { n:'providedIn', k:'ng', w:{ en:'An option key Angular reads.', ar:'مفتاح إعداد أنجولار بيقراه.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The string after it is yours.', ar:'مفتاح إعداد. النص اللي بعده بتاعك.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key. The path points at your file.', ar:'مفتاح إعداد. المسار بيشاور على ملفك.' } },
      { n:'ngOnDestroy', k:'ng', w:{ en:'Angular’s lifecycle hook name.', ar:'اسم الـ lifecycle hook بتاع أنجولار.' } },
      { n:'@for', k:'ng', w:{ en:'Angular’s loop block.', ar:'بلوك اللوب بتاع أنجولار.' } },
      { n:'track', k:'ng', w:{ en:'Part of <code>@for</code>.', ar:'جزء من <code>@for</code>.' } },
      { n:'click', k:'ng', w:{ en:'The browser’s event.', ar:'الـ event بتاع المتصفح.' } },
      { n:'change', k:'ng', w:{ en:'The browser’s event.', ar:'الـ event بتاع المتصفح.' } },
      { n:'input', k:'ng', re:'(?<=\\()input(?=\\))', w:{ en:'The browser’s event, fired on every keystroke.', ar:'الـ event بتاع المتصفح، بيحصل مع كل حرف.' } },
      { n:'value', k:'ng', w:{ en:'The DOM property of an input.', ar:'الـ property بتاعة الـ input في الـ DOM.' } },
      { n:'disabled', k:'ng', w:{ en:'The DOM property of a button.', ar:'الـ property بتاعة الزرار في الـ DOM.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One click on “Place order”, five stops', ar: 'كليك واحدة على «Place order»، خمس محطات' },
    lead: {
      en: 'A checkout page. The user picks an address and clicks <b>Place order</b>, maybe twice, because people double-click. There must be exactly one order. Follow the click:',
      ar: 'صفحة دفع. اليوزر بيختار عنوان ويدوس <b>Place order</b>، ويمكن مرتين، عشان الناس بتدبل كليك. لازم يبقى فيه أوردر واحد بالظبط. امشي ورا الكليك:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'checkout.html', lang: 'html', who: { en: 'template · the click', ar: 'التمبلت · الكليك' },
          code: ['<button (click)="place()" [disabled]="busy()">Place order</button>'],
          say: { en: `${ng('click')} and ${ng('disabled')} are the browser’s. ${mine('place')} and ${mine('busy')} are yours. Nothing RxJS yet.`,
                 ar: `${ng('click')} و${ng('disabled')} بتوع المتصفح. و${mine('place')} و${mine('busy')} بتوعك. لسه مفيش RxJS.` } },
        { file: 'checkout.ts', lang: 'ts', who: { en: 'class · push it in', ar: 'الكلاس · حطها جوه' },
          code: ['place() {', '  this.busy.set(true);', '  this.place$.next();', '}'],
          say: { en: `${mine('place$')} is a ${ng('Subject')} you named. The <code>$</code> is just part of the name, a habit meaning “this is a stream”. ${ng('next')} is RxJS’s: it pushes the click into the stream.`,
                 ar: `${mine('place$')} ده ${ng('Subject')} انت اللي سمّيته. الـ <code>$</code> جزء من الاسم وبس، عادة معناها «ده stream». و${ng('next')} بتاعة RxJS: بتحط الكليك جوه الـ stream.` } },
        { file: 'checkout.ts', lang: 'ts', who: { en: 'class · the decision', ar: 'الكلاس · القرار' },
          code: ['this.place$.pipe(', '  exhaustMap(() => this.api.placeOrder(this.addressId())),'],
          say: { en: `${ng('pipe')} and ${ng('exhaustMap')} are RxJS’s. <code>exhaustMap</code> answers the one question: a second click while the first order is in flight is <b>ignored</b>. ${mine('api')} is your field; ${pub('placeOrder')} is your service’s method.`,
                 ar: `${ng('pipe')} و${ng('exhaustMap')} بتوع RxJS. <code>exhaustMap</code> بتجاوب على السؤال الوحيد: كليك تانية والأوردر الأولاني لسه رايح <b>بتتطنّش</b>. و${mine('api')} الـ field بتاعك؛ و${pub('placeOrder')} ميثود السيرفس بتاعك.` } },
        { file: 'address-api.ts', lang: 'ts', who: { en: 'service · the request', ar: 'السيرفس · الطلب' },
          code: ['placeOrder(chosen: number | null) {', "  return this.http.post<Order>('/api/orders', { addressId: chosen });", '}'],
          say: { en: `${mine('chosen')} is a parameter you named. ${ng('post')} is Angular’s. The URL and the body key <code>addressId</code> are <b>the server’s</b> names. <code>&lt;Order&gt;</code> is your promise about what comes back; nobody checks it.`,
                 ar: `${mine('chosen')} parameter انت سمّيته. و${ng('post')} بتاعة أنجولار. والـ URL ومفتاح الـ body <code>addressId</code> <b>أسماء السيرفر</b>. و<code>&lt;Order&gt;</code> وعد منك باللي هيرجع؛ محدش بيشيّك عليه.` } },
        { file: 'checkout.ts', lang: 'ts', who: { en: 'class · the answer', ar: 'الكلاس · الرد' },
          code: [").subscribe(order => this.router.navigate(['/orders', order.id]));"],
          say: { en: `${ng('subscribe')} is what makes the whole pipe run. ${mine('order')} is an arrow parameter you named on the spot; call it <code>o</code> or <code>result</code> if you like. ${pub('id')} is a field of your ${pub('Order')} type, and it must match the server’s JSON.`,
                 ar: `${ng('subscribe')} هي اللي بتخلي الـ pipe كله يشتغل. و${mine('order')} parameter في arrow function سمّيته في ساعتها؛ سمّيه <code>o</code> أو <code>result</code> لو تحب. و${pub('id')} field في النوع ${pub('Order')} بتاعك، ولازم يطابق الـ JSON بتاع السيرفر.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'Button → <code>place()</code> → <code>place$.next()</code> → <code>exhaustMap(() => api.placeOrder(…))</code> → <code>subscribe(order => …)</code>. The operator names are RxJS’s, the stream and the arrow parameters are yours, and the only names another file must copy are your service’s methods and your data fields.',
        ar: 'الزرار ← <code>place()</code> ← <code>place$.next()</code> ← <code>exhaustMap(() => api.placeOrder(…))</code> ← <code>subscribe(order => …)</code>. أسماء الـ operators بتاعة RxJS، والـ stream والـ parameters بتوعك، والأسماء الوحيدة اللي ملف تاني لازم ينسخها هي ميثودز السيرفس وحقول الداتا بتاعتك.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Which file?', ar: 'أنهي ملف؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'The component decides <b>when</b> and <b>how often</b>; the service only knows <b>how</b> to make one request. Keep that split and the operator always lands in the right file.',
      ar: 'الـ component بيقرر <b>إمتى</b> و<b>كام مرة</b>؛ والسيرفس يعرف بس <b>إزاي</b> يعمل request واحد. حافظ على التقسيمة دي والـ operator دايمًا هيقع في الملف الصح.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>private readonly place$ = new Subject&lt;void&gt;()</code>', 'the component <code>.ts</code>', 'the component', `you pick ${mine('place$')}, <code>$</code> included; ${ng('Subject')} is RxJS’s`],
            ar: ['<code>private readonly place$ = new Subject&lt;void&gt;()</code>', '<code>.ts</code> الـ component', 'الـ component', `انت بتختار ${mine('place$')}، بالـ <code>$</code>؛ و${ng('Subject')} بتاع RxJS`] },
          { en: ['<code>exhaustMap(…)</code>, <code>switchMap(…)</code>', 'the component <code>.ts</code>', 'the component', 'RxJS: import the exact name'],
            ar: ['<code>exhaustMap(…)</code>، <code>switchMap(…)</code>', '<code>.ts</code> الـ component', 'الـ component', 'RxJS: اعمل import بالاسم بالظبط'] },
          { en: ['<code>p =&gt; this.api.lookup(p)</code>', 'inside an operator', 'the component', `you pick ${mine('p')}; it lives for one line`],
            ar: ['<code>p =&gt; this.api.lookup(p)</code>', 'جوه operator', 'الـ component', `انت بتختار ${mine('p')}؛ وعايش سطر واحد`] },
          { en: ['<code>lookup(code)</code>, <code>placeOrder(chosen)</code>', 'the service <code>.ts</code>', 'the service', `you pick ${pub('lookup')} and ${pub('placeOrder')}; the component copies them`],
            ar: ['<code>lookup(code)</code>، <code>placeOrder(chosen)</code>', '<code>.ts</code> السيرفس', 'السيرفس', `انت بتختار ${pub('lookup')} و${pub('placeOrder')}؛ والـ component بينسخهم`] },
          { en: ['<code>\'/api/orders\'</code>, <code>{ postcode: code }</code>', 'the service <code>.ts</code>', 'the service', '<b>the server</b>: its URL and its query and body keys'],
            ar: ['<code>\'/api/orders\'</code>، <code>{ postcode: code }</code>', '<code>.ts</code> السيرفس', 'السيرفس', '<b>السيرفر</b>: الـ URL بتاعه ومفاتيح الـ query والـ body بتاعته'] },
          { en: ['<code>toSignal(…, { initialValue: [] })</code>', 'the component <code>.ts</code>', 'the component', `Angular: ${ng('toSignal')} and ${ng('initialValue')}`],
            ar: ['<code>toSignal(…, { initialValue: [] })</code>', '<code>.ts</code> الـ component', 'الـ component', `أنجولار: ${ng('toSignal')} و${ng('initialValue')}`] },
        ] },
      { t: 'ul',
        en: ['<b>The service returns one request; it never picks an operator.</b> Whether a new postcode cancels the old lookup is a decision about the page, so it lives in the page.',
             '<b>An arrow parameter is a brand-new name every time.</b> The <code>p</code> in <code>filter(p =&gt; …)</code> and the <code>p</code> in <code>switchMap(p =&gt; …)</code> are two separate variables that happen to share a letter. Each receives whatever the previous step let through.',
             '<b>Something must subscribe.</b> Either you call <code>.subscribe()</code>, or <code>toSignal()</code> does it for you. A pipe with neither is a recipe nobody cooks.'],
        ar: ['<b>السيرفس بيرجّع request واحد؛ عمره ما بيختار operator.</b> إن كان postcode جديد يلغي البحث القديم ده قرار بتاع الصفحة، فمكانه في الصفحة.',
             '<b>الـ parameter في الـ arrow function اسم جديد خالص كل مرة.</b> الـ <code>p</code> اللي في <code>filter(p =&gt; …)</code> والـ <code>p</code> اللي في <code>switchMap(p =&gt; …)</code> متغيرين منفصلين صدفة بنفس الحرف. كل واحد بيستقبل اللي الخطوة اللي قبله عدّته.',
             '<b>لازم حد يعمل subscribe.</b> يا إما انت تنادي <code>.subscribe()</code>، يا إما <code>toSignal()</code> تعملها بدالك. pipe من غير الاتنين وصفة محدش بيطبخها.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All four files, every name coloured', ar: 'الأربع ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same checkout, complete: a <b>read</b> with <code>switchMap</code> and a <b>write</b> with <code>exhaustMap</code>. Hover a coloured name to light it up everywhere. Then press <b>Rename test</b>: your names turn into made-up words, while every operator, the URLs and the server’s keys stay put.',
      ar: 'نفس صفحة الدفع، كاملة: <b>قراية</b> بـ <code>switchMap</code> و<b>كتابة</b> بـ <code>exhaustMap</code>. قف بالماوس على أي اسم ملوّن وهينوّر في كل مكان. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: أسماءك هتبقى كلمات عشوائية، وكل operator والـ URLs ومفاتيح السيرفر هيفضلوا مكانهم.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'models.ts', lang: 'ts', tag: { en: 'the data', ar: 'الداتا' }, code: [
        'export interface Address {',
        '  id: number;',
        '  label: string;',
        '}',
        '',
        'export interface Order {',
        '  id: number;',
        '}' ] },
      { t: 'code', name: 'address-api.ts', lang: 'ts', tag: { en: 'one request each', ar: 'request واحد لكل واحدة' }, code: [
        "import { HttpClient } from '@angular/common/http';",
        "import { Injectable, inject } from '@angular/core';",
        "import { Address, Order } from './models';",
        '',
        "@Injectable({ providedIn: 'root' })",
        'export class AddressApi {',
        '  private readonly http = inject(HttpClient);',
        '',
        '  lookup(code: string) {',
        "    return this.http.get<Address[]>('/api/addresses', { params: { postcode: code } });",
        '  }',
        '',
        '  placeOrder(chosen: number | null) {',
        "    return this.http.post<Order>('/api/orders', { addressId: chosen });",
        '  }',
        '}' ] },
      { t: 'code', name: 'checkout.ts', lang: 'ts', tag: { en: 'read + write', ar: 'قراية + كتابة' }, code: [
        "import { Component, inject, signal } from '@angular/core';",
        "import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';",
        "import { Router } from '@angular/router';",
        "import { EMPTY, Subject, catchError, debounceTime, distinctUntilChanged, exhaustMap, filter, finalize, switchMap } from 'rxjs';",
        "import { AddressApi } from './address-api';",
        '',
        '@Component({',
        "  selector: 'app-checkout',",
        "  templateUrl: './checkout.html',",
        '})',
        'export class Checkout {',
        '  private readonly api = inject(AddressApi);',
        '  private readonly router = inject(Router);',
        '  private readonly place$ = new Subject<void>();',
        '',
        "  readonly postcode = signal('');",
        '  readonly addressId = signal<number | null>(null);',
        '  readonly busy = signal(false);',
        '',
        '  // READ: only the newest postcode matters → switchMap',
        '  readonly addresses = toSignal(',
        '    toObservable(this.postcode).pipe(',
        '      debounceTime(400),',
        '      filter(p => p.length >= 3),',
        '      distinctUntilChanged(),',
        '      switchMap(p => this.api.lookup(p).pipe(catchError(() => EMPTY))),',
        '    ),',
        '    { initialValue: [] },',
        '  );',
        '',
        '  // WRITE: a double-click must not order twice → exhaustMap',
        '  constructor() {',
        '    this.place$.pipe(',
        '      exhaustMap(() => this.api.placeOrder(this.addressId()).pipe(',
        '        catchError(() => EMPTY),',
        '        finalize(() => this.busy.set(false)),',
        '      )),',
        '      takeUntilDestroyed(),',
        "    ).subscribe(order => this.router.navigate(['/orders', order.id]));",
        '  }',
        '',
        '  place() {',
        '    this.busy.set(true);',
        '    this.place$.next();',
        '  }',
        '}' ] },
      { t: 'code', name: 'checkout.html', lang: 'html', tag: { en: 'the page', ar: 'الصفحة' }, code: [
        '<input #box [value]="postcode()" (input)="postcode.set(box.value)" placeholder="Postcode" />',
        '',
        '@for (a of addresses(); track a.id) {',
        '  <label>',
        '    <input type="radio" name="address" (change)="addressId.set(a.id)" />',
        '    {{ a.label }}',
        '  </label>',
        '}',
        '',
        '<button (click)="place()" [disabled]="busy()">Place order</button>' ] },
      { t: 'nmtable' }
    ]
  },

  /* ------------------------------------------------------------ 4 */
  {
    id: 'rename',
    kicker: { en: 'Is it OK to change it?', ar: 'ينفع أغيّره؟' },
    title: { en: 'What breaks when you rename each name', ar: 'إيه اللي بيبوظ لما تغيّر كل اسم' },
    lead: {
      en: 'Your own names are well guarded: forget one and TypeScript tells you. The names that bite are the ones that <b>look</b> like yours but belong to the server.',
      ar: 'الأسماء بتاعتك محروسة كويس: تنسى واحد وTypeScript يقولك. الأسماء اللي بتعضّ هي اللي <b>شكلها</b> بتاعتك بس هي بتاعة السيرفر.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [mine('place$'), 'every <code>this.place$</code> in the class', 'Compile error.'],
            ar: [mine('place$'), 'كل <code>this.place$</code> في الكلاس', 'Compile error.'] },
          { en: [mine('place') + ', ' + mine('busy') + ', ' + mine('postcode') + ', ' + mine('addresses'), 'the template', 'Compile error in the template.'],
            ar: [mine('place') + '، ' + mine('busy') + '، ' + mine('postcode') + '، ' + mine('addresses'), 'التمبلت', 'Compile error في التمبلت.'] },
          { en: [mine('p') + ', ' + mine('order'), 'only inside that one arrow function', 'Compile error on the same line.'],
            ar: [mine('p') + '، ' + mine('order'), 'جوه الـ arrow function دي بس', 'Compile error في نفس السطر.'] },
          { en: [pub('lookup') + ', ' + pub('placeOrder'), 'the calls in <code>checkout.ts</code>', 'Compile error: no such method on <code>AddressApi</code>.'],
            ar: [pub('lookup') + '، ' + pub('placeOrder'), 'الندايات في <code>checkout.ts</code>', 'Compile error: مفيش ميثود كده في <code>AddressApi</code>.'] },
          { en: [pub('id') + ', ' + pub('label') + ' (your types)', 'every reader, <b>and</b> the server’s JSON must use the new name', 'If only your side changes, it compiles, and the value is <code>undefined</code> at runtime. The generic <code>&lt;Order&gt;</code> is trusted, not checked.'],
            ar: [pub('id') + '، ' + pub('label') + ' (الأنواع بتاعتك)', 'كل حد بيقراهم، <b>و</b>الـ JSON بتاع السيرفر لازم يستخدم الاسم الجديد', 'لو ناحيتك بس اللي اتغيرت، بيعدّي الـ compile، والقيمة بتبقى <code>undefined</code> وقت التشغيل. الـ <code>&lt;Order&gt;</code> بيتصدّق، مش بيتشيّك.'] },
          { en: ['<code>postcode</code> in <code>params</code>, <code>addressId</code> in the body', 'nothing on your side: the server decides', 'No error. The server gets a key it does not know and answers with an error or an empty list.'],
            ar: ['<code>postcode</code> في <code>params</code>، و<code>addressId</code> في الـ body', 'ولا حاجة عندك: السيرفر هو اللي بيقرر', 'مفيش error. السيرفر بيوصله مفتاح مايعرفوش وبيرد بـ error أو ليستة فاضية.'] },
          { en: [`${ng('switchMap')}, ${ng('exhaustMap')}, ${ng('pipe')}…`, 'nothing: they are RxJS’s', 'A typo is a compile error on the import.'],
            ar: [`${ng('switchMap')} و${ng('exhaustMap')} و${ng('pipe')}…`, 'ولا حاجة: دول بتوع RxJS', 'الغلطة الإملائية compile error في الـ import.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b> above the files. Watch <code>place$</code> keep its <code>$</code> and become another word, the arrow parameters change, and <code>\'/api/orders\'</code>, <code>postcode:</code> in the params and <code>addressId:</code> in the body stay exactly as the server wants them.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b> فوق الملفات. بص إزاي <code>place$</code> بيفضل بالـ <code>$</code> بتاعته ويبقى كلمة تانية، والـ parameters بتتغير، و<code>\'/api/orders\'</code> و<code>postcode:</code> في الـ params و<code>addressId:</code> في الـ body بيفضلوا زي ما السيرفر عايزهم بالظبط.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتوعك' },
    title: { en: 'Where each fixed name comes from', ar: 'كل اسم ثابت جاي منين' },
    lead: {
      en: 'A pipe is where RxJS, Angular and the browser meet, so the fixed names come from three places. The import line tells you which.',
      ar: 'الـ pipe هو المكان اللي RxJS وأنجولار والمتصفح بيتقابلوا فيه، فالأسماء الثابتة جاية من تلات أماكن. وسطر الـ import بيقولك مين.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Names', 'Imported from', 'Whose'], ar: ['الأسماء', 'جاية import من', 'بتاعة مين'] },
        rows: [
          { en: [`${ng('switchMap')}, ${ng('exhaustMap')}, ${ng('debounceTime')}, ${ng('filter')}, ${ng('catchError')}, ${ng('finalize')}, ${ng('Subject')}, ${ng('EMPTY')}`, '<code>\'rxjs\'</code>', 'RxJS'],
            ar: [`${ng('switchMap')} و${ng('exhaustMap')} و${ng('debounceTime')} و${ng('filter')} و${ng('catchError')} و${ng('finalize')} و${ng('Subject')} و${ng('EMPTY')}`, '<code>\'rxjs\'</code>', 'RxJS'] },
          { en: [`${ng('pipe')}, ${ng('subscribe')}, ${ng('next')}`, 'nothing to import: methods on a stream', 'RxJS'],
            ar: [`${ng('pipe')} و${ng('subscribe')} و${ng('next')}`, 'مفيش import: ميثودز على الـ stream', 'RxJS'] },
          { en: [`${ng('toSignal')}, ${ng('toObservable')}, ${ng('takeUntilDestroyed')}`, '<code>\'@angular/core/rxjs-interop\'</code>', 'Angular: the bridges between signals and streams'],
            ar: [`${ng('toSignal')} و${ng('toObservable')} و${ng('takeUntilDestroyed')}`, '<code>\'@angular/core/rxjs-interop\'</code>', 'أنجولار: الكباري بين الـ signals والـ streams'] },
          { en: [`${ng('HttpClient')}, ${ng('get')}, ${ng('post')}, ${ng('params')}`, '<code>\'@angular/common/http\'</code>', 'Angular'],
            ar: [`${ng('HttpClient')} و${ng('get')} و${ng('post')} و${ng('params')}`, '<code>\'@angular/common/http\'</code>', 'أنجولار'] },
          { en: [`${ng('input')}, ${ng('change')}, ${ng('click')}, ${ng('value')}`, 'nothing: the DOM', 'the browser'],
            ar: [`${ng('input')} و${ng('change')} و${ng('click')} و${ng('value')}`, 'ولا حاجة: الـ DOM', 'المتصفح'] },
          { en: ['<code>/api/orders</code>, <code>postcode</code>, <code>addressId</code>', 'nowhere: they are strings and keys', 'the server'],
            ar: ['<code>/api/orders</code>، <code>postcode</code>، <code>addressId</code>', 'من مكان: دي نصوص ومفاتيح', 'السيرفر'] },
        ] },
      { t: 'note', label: { en: 'The dollar sign', ar: 'علامة الدولار' },
        en: 'RxJS does not care about <code>$</code>. <code>place$</code>, <code>placeClicks</code> and <code>banana</code> all work. The <code>$</code> is a community habit that says “subscribe to me, don’t call me”. That is why signals usually do <b>not</b> get one.',
        ar: 'RxJS مش فارق معاه الـ <code>$</code>. <code>place$</code> و<code>placeClicks</code> و<code>banana</code> كلهم شغالين. الـ <code>$</code> عادة منتشرة معناها «اعمل subscribe عليّا، متنادينيش». وعشان كده الـ signals عادةً <b>مش</b> بياخدوها.' }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'RxJS accepts any name. These habits make a long pipe readable at a glance.',
      ar: 'RxJS بيقبل أي اسم. العادات دي بتخلي الـ pipe الطويل يتقري من أول نظرة.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['a stream', '<code>place$</code>, <code>postcode$</code>', '<code>placeSubject</code>, <code>data$</code>', 'The <code>$</code> says “stream”; the word says what flows in it.'],
            ar: ['stream', '<code>place$</code>، <code>postcode$</code>', '<code>placeSubject</code>، <code>data$</code>', 'الـ <code>$</code> بتقول «stream»؛ والكلمة بتقول إيه اللي ماشي فيه.'] },
          { en: ['a signal', '<code>postcode</code>, <code>busy</code>', '<code>postcode$</code> for a signal', 'A <code>$</code> on a signal makes readers try to subscribe to it.'],
            ar: ['signal', '<code>postcode</code>، <code>busy</code>', '<code>postcode$</code> لـ signal', 'الـ <code>$</code> على signal بتخلي اللي بيقرا يحاول يعمل subscribe عليها.'] },
          { en: ['a one-line arrow parameter', '<code>p</code>, <code>q</code>, <code>order</code>', '<code>x</code> in a long function', 'Short is fine when the name lives for one line. Longer arrows deserve a real word.'],
            ar: ['parameter في arrow من سطر واحد', '<code>p</code>، <code>q</code>، <code>order</code>', '<code>x</code> في function طويلة', 'الاسم القصير كويس لما يعيش سطر واحد. الـ arrows الأطول تستاهل كلمة حقيقية.'] },
          { en: ['a service method', '<code>lookup</code>, <code>placeOrder</code>', '<code>lookup$</code>', 'It returns a stream, but it is a method you call. Most code does not put <code>$</code> on methods.'],
            ar: ['ميثود في سيرفس', '<code>lookup</code>، <code>placeOrder</code>', '<code>lookup$</code>', 'بترجّع stream، بس هي ميثود بتناديها. أغلب الكود مش بيحط <code>$</code> على الميثودز.'] },
          { en: ['the injected service field', '<code>api</code>, <code>addressApi</code>', '—', 'Any name. It is a private field of this component.'],
            ar: ['الـ field بتاع السيرفس', '<code>api</code>، <code>addressApi</code>', '—', 'أي اسم. ده field خاص بالـ component ده.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Three places where you do not get a choice', ar: 'تلات أماكن مالكش فيها اختيار' },
    lead: {
      en: 'Most names in a pipe are free. These three are decided for you.',
      ar: 'أغلب الأسماء في الـ pipe براحتك. التلاتة دول متحددين بدالك.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'Option keys: the function reads them by name', ar: 'مفاتيح الإعدادات: الـ function بتقراها بالاسم' }, blocks: [
        { t: 'p',
          en: `${ng('initialValue')} in <code>toSignal(…, { initialValue: [] })</code> and ${ng('params')} in <code>get(url, { params })</code> are keys the function looks for. The values are yours; the keys are not. A misspelled key is a compile error, because the options object is typed.`,
          ar: `${ng('initialValue')} في <code>toSignal(…, { initialValue: [] })</code> و${ng('params')} في <code>get(url, { params })</code> مفاتيح الـ function بتدوّر عليها. القيم بتاعتك؛ المفاتيح لأ. المفتاح المكتوب غلط compile error، عشان الـ object بتاع الإعدادات متعرّفله نوع.` }
      ]},
      { t: 'step', n: 'B', title: { en: 'Shorthand makes your name the server’s key', ar: 'الاختصار بيخلي اسمك مفتاح السيرفر' }, blocks: [
        { t: 'pair',
          bad:  { name: 'address-api.ts — shorthand', lang: 'ts', code: [
            'lookup(code: string) {',
            "  return this.http.get<Address[]>('/api/addresses', { params: { code } });",
            '}' ] },
          good: { name: 'address-api.ts — explicit', lang: 'ts', code: [
            'lookup(code: string) {',
            "  return this.http.get<Address[]>('/api/addresses', { params: { postcode: code } });",
            '}' ] } },
        { t: 'p',
          en: `<code>{ code }</code> means <code>{ code: code }</code>. Your parameter name ${mine('code')} just became the query key the server reads, so the request goes out as <code>?code=…</code> and the server, which expects <code>postcode</code>, finds nothing. Write the server’s key out in full and your parameter stays free to rename.`,
          ar: `<code>{ code }</code> معناها <code>{ code: code }</code>. اسم الـ parameter بتاعك ${mine('code')} بقى مفتاح الـ query اللي السيرفر بيقراه، فالطلب بيطلع <code>?code=…</code> والسيرفر، اللي مستني <code>postcode</code>، مش لاقي حاجة. اكتب مفتاح السيرفر كامل والـ parameter بتاعك يفضل حر تغيّر اسمه.` }
      ]},
      { t: 'step', n: 'C', title: { en: 'The import path is fixed too', ar: 'مسار الـ import ثابت برضه' }, blocks: [
        { t: 'p',
          en: `Operators come from <code>'rxjs'</code>. The bridges ${ng('toSignal')}, ${ng('toObservable')} and ${ng('takeUntilDestroyed')} come from <code>'@angular/core/rxjs-interop'</code>, not from <code>'@angular/core'</code>. Older code imports operators from <code>'rxjs/operators'</code>; that path still works, and since RxJS 7.2 plain <code>'rxjs'</code> is enough.`,
          ar: `الـ operators جاية من <code>'rxjs'</code>. والكباري ${ng('toSignal')} و${ng('toObservable')} و${ng('takeUntilDestroyed')} جاية من <code>'@angular/core/rxjs-interop'</code>، مش من <code>'@angular/core'</code>. والكود الأقدم بيعمل import للـ operators من <code>'rxjs/operators'</code>؛ المسار ده لسه شغال، ومن RxJS 7.2 <code>'rxjs'</code> لوحدها كفاية.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: '<code>destroy$</code> and <code>takeUntil</code>: the same job, more names', ar: '<code>destroy$</code> و<code>takeUntil</code>: نفس الشغلانة، أسماء أكتر' },
    lead: {
      en: 'Before <code>takeUntilDestroyed()</code>, every component that subscribed made its own “I’m dying” stream. You will see this everywhere in older projects.',
      ar: 'قبل <code>takeUntilDestroyed()</code>، كل component بيعمل subscribe كان بيعمل stream «أنا بموت» بتاعه. هتشوف ده في كل حتة في المشاريع الأقدم.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'checkout.ts — older style', lang: 'ts', code: [
          'private readonly destroy$ = new Subject<void>();',
          '',
          'constructor() {',
          '  this.place$.pipe(',
          '    exhaustMap(() => this.api.placeOrder(this.addressId())),',
          '    takeUntil(this.destroy$),',
          '  ).subscribe(order => this.router.navigate([\'/orders\', order.id]));',
          '}',
          '',
          'ngOnDestroy() {',
          '  this.destroy$.next();',
          '  this.destroy$.complete();',
          '}' ] },
        good: { name: 'checkout.ts — today', lang: 'ts', code: [
          '',
          '',
          'constructor() {',
          '  this.place$.pipe(',
          '    exhaustMap(() => this.api.placeOrder(this.addressId())),',
          '    takeUntilDestroyed(),',
          '  ).subscribe(order => this.router.navigate([\'/orders\', order.id]));',
          '}' ] } },
      { t: 'p',
        en: `${mine('destroy$')} was always your name (people also wrote <code>unsubscribe$</code> or <code>destroyed$</code>). ${ng('takeUntil')}, ${ng('ngOnDestroy')}, ${ng('next')} and ${ng('complete')} are fixed. ${ng('takeUntilDestroyed')} replaces all of it; with no argument it must be called in an injection context, such as the constructor or a field initializer.`,
        ar: `${mine('destroy$')} طول عمره اسمك انت (والناس كانت بتكتب <code>unsubscribe$</code> أو <code>destroyed$</code> برضه). و${ng('takeUntil')} و${ng('ngOnDestroy')} و${ng('next')} و${ng('complete')} ثابتين. و${ng('takeUntilDestroyed')} بتستبدل ده كله؛ ومن غير argument لازم تتنادى في injection context، زي الـ constructor أو تعريف field.` }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, and says nothing', ar: 'مش بيعمل حاجة، ومش بيقول حاجة' },
    title: { en: 'Mistakes that fail silently', ar: 'غلطات بتفشل في صمت' },
    lead: {
      en: 'A stream that is wired wrong does not complain. It just never produces a value, or stops producing them after one bad moment.',
      ar: 'الـ stream المتوصّل غلط مش بيشتكي. هو بس عمره ما بيطلّع قيمة، أو بيبطّل يطلّع بعد لحظة وحشة واحدة.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'No subscribe, so nothing runs', ar: 'مفيش subscribe، فمفيش حاجة بتشتغل' }, blocks: [
        { t: 'pair',
          bad:  { name: 'checkout.ts — never subscribed', lang: 'ts', code: [
            'this.place$.pipe(',
            '  exhaustMap(() => this.api.placeOrder(this.addressId())),',
            ');' ] },
          good: { name: 'checkout.ts — subscribed', lang: 'ts', code: [
            'this.place$.pipe(',
            '  exhaustMap(() => this.api.placeOrder(this.addressId())),',
            ').subscribe();' ] } },
        { t: 'p', en: 'A pipe only describes what should happen. Until something subscribes, the button pushes clicks into a stream nobody listens to, and no request is ever sent. No error, and nothing in the network tab.',
                  ar: 'الـ pipe بيوصف بس اللي المفروض يحصل. لحد ما حد يعمل subscribe، الزرار بيحط كليكات في stream محدش سامعه، ومفيش request بيطلع خالص. لا error، ولا حاجة في الـ network tab.' }
      ]},
      { t: 'step', n: '2', title: { en: 'Catching the error in the wrong place', ar: 'مسك الـ error في المكان الغلط' }, blocks: [
        { t: 'pair',
          bad:  { name: 'checkout.ts — outer catch', lang: 'ts', code: [
            'this.place$.pipe(',
            '  exhaustMap(() => this.api.placeOrder(this.addressId())),',
            '  catchError(() => EMPTY),',
            ').subscribe();' ] },
          good: { name: 'checkout.ts — inner catch', lang: 'ts', code: [
            'this.place$.pipe(',
            '  exhaustMap(() => this.api.placeOrder(this.addressId()).pipe(',
            '    catchError(() => EMPTY),',
            '  )),',
            ').subscribe();' ] } },
        { t: 'p', en: 'On the outside, <code>catchError</code> swaps the <b>whole</b> click stream for <code>EMPTY</code> after the first failure. The button still looks alive, but every later click goes nowhere. Inside, only that one request is replaced, and the next click works.',
                  ar: 'من بره، <code>catchError</code> بتبدّل stream الكليكات <b>كله</b> بـ <code>EMPTY</code> بعد أول فشل. الزرار لسه شكله شغال، بس كل كليك بعد كده بتروح في الفاضي. من جوه، الـ request ده بس اللي بيتبدّل، والكليك اللي بعدها بتشتغل.' }
      ]},
      { t: 'step', n: '3', title: { en: 'Returning an array from catchError', ar: 'إنك ترجّع array من catchError' }, blocks: [
        { t: 'pair',
          bad:  { name: 'checkout.ts — array', lang: 'ts', code: [
            'switchMap(p => this.api.lookup(p).pipe(catchError(() => []))),' ] },
          good: { name: 'checkout.ts — of([])', lang: 'ts', code: [
            'switchMap(p => this.api.lookup(p).pipe(catchError(() => of([])))),' ] } },
        { t: 'p', en: `This compiles, because RxJS accepts an array as a source. But an array is read as “emit each item”, and an empty array emits nothing. So the old addresses stay on screen after a failed lookup. ${ng('of')}<code>([])</code> emits one empty list and clears them.`,
                  ar: `ده بيعدّي الـ compile، عشان RxJS بيقبل الـ array كمصدر. بس الـ array بتتقري كـ «ابعت كل عنصر»، والـ array الفاضية مبتبعتش حاجة. فالعناوين القديمة بتفضل على الشاشة بعد بحث فاشل. و${ng('of')}<code>([])</code> بتبعت ليستة فاضية واحدة وبتمسحهم.` }
      ]},
      { t: 'step', n: '4', title: { en: 'The wrong one of the four', ar: 'الغلط من الأربعة' }, blocks: [
        { t: 'pair',
          bad:  { name: 'checkout.ts — switchMap on a write', lang: 'ts', code: [
            'switchMap(() => this.api.placeOrder(this.addressId())),' ] },
          good: { name: 'checkout.ts — exhaustMap on a write', lang: 'ts', code: [
            'exhaustMap(() => this.api.placeOrder(this.addressId())),' ] } },
        { t: 'p', en: 'On a double-click, <code>switchMap</code> cancels the first request in the browser, but the server may already have created that order, and the second request creates another. Two orders, no error. Reads cancel; writes ignore.',
                  ar: 'مع الدبل كليك، <code>switchMap</code> بتلغي الـ request الأولاني في المتصفح، بس السيرفر ممكن يكون عمل الأوردر ده خلاص، والـ request التاني بيعمل واحد كمان. أوردرين، ومفيش error. القراية بتلغي؛ والكتابة بتطنّش.' }
      ]},
      { t: 'step', n: '5', title: { en: 'Calling the signal inside toObservable', ar: 'إنك تنادي الـ signal جوه toObservable' }, blocks: [
        { t: 'pair',
          bad:  { name: 'checkout.ts — value', lang: 'ts', code: [ 'toObservable(this.postcode())' ] },
          good: { name: 'checkout.ts — the signal', lang: 'ts', code: [ 'toObservable(this.postcode)' ] } },
        { t: 'p', en: `Not silent, but confusing: this one is a compile error, because ${ng('toObservable')} wants the signal itself so it can watch it, not today’s string. In templates you call signals with <code>()</code>; when you hand one to a bridge, you don’t.`,
                  ar: `مش صامتة، بس ملخبطة: دي compile error، عشان ${ng('toObservable')} عايزة الـ signal نفسها عشان تراقبها، مش النص بتاع النهارده. في التمبلت بتنادي الـ signals بـ <code>()</code>؛ لما تدّي واحدة لكوبري، لأ.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it does nothing', ar: 'لما مايعملش حاجة' },
    title: { en: 'Five questions, in this order', ar: 'خمس أسئلة، بالترتيب ده' },
    lead: {
      en: 'Your pipe “does nothing”. Ask these before rewriting it.',
      ar: 'الـ pipe بتاعك «مش بيعمل حاجة». اسأل دول قبل ما تعيد كتابته.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Does anything subscribe: a <code>.subscribe()</code> or a <code>toSignal()</code>?',
                  ar: '<b>1.</b> فيه حاجة بتعمل subscribe: <code>.subscribe()</code> أو <code>toSignal()</code>؟' },
      { t: 'chk', en: '<b>2.</b> Do values reach each step? Put <code>tap(v =&gt; console.log(v))</code> between operators and watch where they stop. <code>filter</code> and <code>debounceTime</code> are the usual suspects.',
                  ar: '<b>2.</b> القيم بتوصل لكل خطوة؟ حط <code>tap(v =&gt; console.log(v))</code> بين الـ operators وبص بتقف فين. <code>filter</code> و<code>debounceTime</code> هما المتهمين المعتادين.' },
      { t: 'chk', en: '<b>3.</b> Did one error kill the stream? Move <code>catchError</code> inside the inner request.',
                  ar: '<b>3.</b> error واحد موّت الـ stream؟ انقل <code>catchError</code> جوه الـ request الجوّاني.' },
      { t: 'chk', en: '<b>4.</b> Do the URL, query keys and body keys match what the server expects? Check the request in the network tab.',
                  ar: '<b>4.</b> الـ URL ومفاتيح الـ query والـ body مطابقين اللي السيرفر مستنيه؟ بص على الـ request في الـ network tab.' },
      { t: 'chk', en: '<b>5.</b> Is it the right operator? Reads: <code>switchMap</code>. Writes: <code>exhaustMap</code>. Order matters: <code>concatMap</code>. Independent work: <code>mergeMap</code>.',
                  ar: '<b>5.</b> ده الـ operator الصح؟ القراية: <code>switchMap</code>. الكتابة: <code>exhaustMap</code>. الترتيب مهم: <code>concatMap</code>. شغل مستقل: <code>mergeMap</code>.' }
    ]
  }
  ]
};
