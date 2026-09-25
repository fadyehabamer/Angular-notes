/* ==================================================================
   RxJS fundamentals, name by name — the companion page after the RxJS
   fundamentals topic. One running example (a cart store built on a
   BehaviorSubject, a product card that adds to it, a badge that reads
   it) with every name coloured. Model: content/deep/inputs-outputs.mjs.
   ================================================================== */

const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

export default {
  topic: 'rxjs-fundamentals',
  tab: 'RxJS basics, name by name — The Angular Signal',
  title: { en: 'Observables and Subjects, name by name', ar: 'الـ Observables والـ Subjects، اسم اسم' },
  say: {
    en: 'One cart followed from the Add button, into a BehaviorSubject, out through <code>items$</code> and <code>| async</code> to a badge. Every name coloured: which are RxJS’s, which are yours, and what the <code>$</code> really means. Then what breaks when you rename each one.',
    ar: 'كارت واحدة ماشيين وراها من زرار Add، لجوه BehaviorSubject، ولبرّه من <code>items$</code> و<code>| async</code> لحد badge. كل اسم ملوّن: مين بتاع RxJS، ومين بتاعك، والـ <code>$</code> معناها إيه بجد. وبعدين إيه اللي بيبوظ لما تغيّر كل واحد.'
  },
  lead: {
    en: 'The idea is simple: <b>the store pushes values in, readers subscribe to get them out.</b> The confusing part is the names. <code>next</code> means “push” on a Subject and “receive” in a subscribe object. The <code>$</code> on <code>items$</code> looks like syntax and is only a habit. And <code>async</code> in the template is not the class you import. This page sorts every one of them.',
    ar: 'الفكرة بسيطة: <b>الـ store بيدفع القيم لجوه، واللي عايز يقرا بيعمل subscribe عشان ياخدها.</b> اللي بيلخبط هو الأسماء. <code>next</code> معناها «ادفع» على الـ Subject و«استقبل» في object الـ subscribe. والـ <code>$</code> اللي على <code>items$</code> شكلها جزء من اللغة وهي مجرد عادة. و<code>async</code> اللي في التمبلت مش هو الكلاس اللي بتعمله import. الصفحة دي بترتّب كل واحد فيهم.'
  },
  names: {
    note: {
      en: 'The <code>$</code> at the end of <code>items$</code> is part of <b>your</b> name, nothing more; the rename test keeps it only to show the habit. <code>next</code>, <code>error</code> and <code>complete</code> are the opposite: they look like ordinary words, but RxJS uses exactly those names.',
      ar: 'الـ <code>$</code> اللي في آخر <code>items$</code> جزء من اسم<b>ك</b> انت، مش أكتر؛ وتجربة تغيير الأسماء بتسيبها بس عشان توضّح العادة. أما <code>next</code> و<code>error</code> و<code>complete</code> فالعكس: شكلهم كلمات عادية، بس RxJS بيستخدم الأسامي دي بالظبط.'
    },
    names: [
      /* --- shared --- */
      { n:'CartStore', k:'pub', w:{ en:'Your service class. Every component that injects it types this name.', ar:'كلاس الـ service بتاعك. أي component بيعمله inject بيكتب الاسم ده.' } },
      { n:'items$', k:'pub', as:'fattah$', w:{ en:'The store’s public, read-only stream of the cart.', ar:'الـ stream الـ public اللي للقراية بس بتاع الكارت في الـ store.' } },
      { n:'count$', k:'pub', as:'konafa$', w:{ en:'The store’s public stream of the item count. The badge reads it by this exact name, <code>$</code> included.', ar:'الـ stream الـ public بتاع عدد الحاجات في الـ store. الـ badge بيقراه بالاسم ده بالظبط، بالـ <code>$</code>.' } },
      { n:'add', k:'pub', w:{ en:'The store’s method. Components call it instead of touching the Subject.', ar:'ميثود الـ store. الـ components بتناديها بدل ما تلمس الـ Subject.' } },
      { n:'items', k:'pub', re:'(?<=readonly |\\.)items(?![\\w$-])', w:{ en:'The signal version’s public, read-only list.', ar:'القايمة الـ public اللي للقراية بس في نسخة الـ signals.' } },
      { n:'count', k:'pub', w:{ en:'The signal version’s public count, read as <code>count()</code>.', ar:'العدد الـ public في نسخة الـ signals، بيتقري كـ <code>count()</code>.' } },
      { n:'Item', k:'pub', w:{ en:'Your data type.', ar:'نوع الداتا بتاعك.' } },
      { n:'name', k:'pub', w:{ en:'A field of <code>Item</code>, read in the card’s template.', ar:'field في <code>Item</code>، وتمبلت الكارت بيقراه.' } },
      { n:'price', k:'pub', w:{ en:'A field of <code>Item</code>.', ar:'field في <code>Item</code>.' } },
      { n:'product', k:'pub', re:'(?<![\\w$-])product(?![\\w$-])',
        w:{ en:'The card’s input. The parent sets it with <code>[product]</code>.', ar:'الـ input بتاع الكارت. الأب بيحطه بـ <code>[product]</code>.' } },
      { n:'ProductCard', k:'pub', w:{ en:'Your component class, imported by the page that lists products.', ar:'كلاس الـ component بتاعك، والصفحة اللي بتعرض المنتجات بتعمله import.' } },
      { n:'app-product-card', k:'pub', w:{ en:'Its selector, typed by that page.', ar:'الـ selector بتاعه، والصفحة دي بتكتبه.' } },
      { n:'CartBadge', k:'pub', w:{ en:'Your component class, imported by the header.', ar:'كلاس الـ component بتاعك، والـ header بيعمله import.' } },
      { n:'app-cart-badge', k:'pub', w:{ en:'Its selector, typed by the header.', ar:'الـ selector بتاعه، والـ header بيكتبه.' } },

      /* --- yours, one file --- */
      { n:'_items', k:'mine', w:{ en:'The store’s private Subject. Only the store pushes into it. The underscore is a habit; <code>private</code> is what protects it.', ar:'الـ Subject الخاص بالـ store. الـ store بس اللي بيدفع فيه. الـ underscore عادة؛ و<code>private</code> هي اللي بتحميه.' } },
      { n:'item', k:'mine', re:'(?<![\\w$/-])item(?![\\w$-])', w:{ en:'The parameter of <code>add</code>.', ar:'الـ parameter بتاع <code>add</code>.' } },
      { n:'list', k:'mine', w:{ en:'An arrow function’s parameter: the current array.', ar:'parameter في arrow function: الـ array الحالية.' } },
      { n:'cart', k:'mine', re:'(?<=this\\.|readonly |\\{\\{ )cart(?![\\w$-])',
        w:{ en:'The name each component gives the injected store. Each one is private to its component.', ar:'الاسم اللي كل component بيدّيه للـ store المتعمله inject. كل واحد خاص بالـ component بتاعه.' } },
      { n:'addToCart', k:'mine', w:{ en:'The card’s own method, called by its own button.', ar:'ميثود الكارت نفسه، وزرار الكارت هو اللي بيناديها.' } },
      { n:'n', k:'mine', w:{ en:'A parameter or local variable, in separate places. RxJS passes the value by position, so the name is yours.', ar:'parameter أو variable محلي، في أماكن منفصلة. RxJS بيبعت القيمة بالترتيب، فالاسم بتاعك.' } },
      { n:'err', k:'mine', w:{ en:'The error callback’s parameter.', ar:'الـ parameter بتاع callback الـ error.' } },
      { n:'clock$', k:'mine', as:'kofta$', w:{ en:'Your variable. The <code>$</code> is only a habit.', ar:'الـ variable بتاعك. والـ <code>$</code> مجرد عادة.' } },
      { n:'observer', k:'mine', w:{ en:'The parameter RxJS hands your setup function. Any name works; the methods on it do not.', ar:'الـ parameter اللي RxJS بيدّيه للـ function بتاعتك. أي اسم ينفع؛ بس الميثودز اللي عليه لأ.' } },
      { n:'timerId', k:'mine', w:{ en:'A local variable.', ar:'variable محلي.' } },
      { n:'http', k:'mine', re:'(?<=this\\.|readonly )http(?![\\w$-])', w:{ en:'The store’s private field holding <code>HttpClient</code>.', ar:'الـ field الخاص بالـ store اللي شايل <code>HttpClient</code>.' } },
      { n:'checkout', k:'mine', re:'(?<![\\w$/-])checkout(?=\\()', w:{ en:'A store method (it would be shared once a component calls it).', ar:'ميثود في الـ store (هتبقى متشاركة أول ما component يناديها).' } },

      /* --- RxJS's, Angular's, the browser's --- */
      { n:'BehaviorSubject', k:'ng', w:{ en:'RxJS’s Subject that holds a current value.', ar:'الـ Subject بتاع RxJS اللي شايل قيمة حالية.' } },
      { n:'Observable', k:'ng', w:{ en:'RxJS’s stream type.', ar:'نوع الـ stream بتاع RxJS.' } },
      { n:'next', k:'ng',
        w:{ en:'RxJS’s word for “a value”: the method that pushes one (on a Subject or an observer), and the key that receives one in <code>subscribe({ })</code>.',
            ar:'كلمة RxJS لـ «قيمة»: الميثود اللي بتدفع قيمة (على Subject أو observer)، والمفتاح اللي بيستقبلها في <code>subscribe({ })</code>.' } },
      { n:'error', k:'ng', w:{ en:'RxJS’s key for the failure callback. (<code>console.error</code> is the browser’s.)', ar:'مفتاح RxJS للـ callback بتاع الفشل. (و<code>console.error</code> بتاع المتصفح.)' } },
      { n:'complete', k:'ng', w:{ en:'RxJS’s key for the “finished” callback.', ar:'مفتاح RxJS للـ callback بتاع «خلصت».' } },
      { n:'subscribe', k:'ng', w:{ en:'RxJS’s method that starts listening (and, for a cold stream, starts the work).', ar:'ميثود RxJS اللي بتبدأ تسمع (وفي الـ cold stream بتبدأ الشغل كمان).' } },
      { n:'value', k:'ng', re:'(?<=\\.)value(?![\\w$-])', w:{ en:'The current value of a <code>BehaviorSubject</code>, read directly.', ar:'القيمة الحالية في الـ <code>BehaviorSubject</code>، بتقراها على طول.' } },
      { n:'asObservable', k:'ng', w:{ en:'A Subject method: a read-only view of it.', ar:'ميثود في الـ Subject: نسخة للقراية بس.' } },
      { n:'pipe', k:'ng', w:{ en:'RxJS’s method for chaining operators.', ar:'ميثود RxJS لتوصيل الـ operators ورا بعض.' } },
      { n:'map', k:'ng', re:'(?<![\\w$.-])map(?![\\w$-])', w:{ en:'The RxJS operator that transforms each value.', ar:'الـ operator بتاع RxJS اللي بيحوّل كل قيمة.' } },
      { n:'async', k:'ng', re:'(?<=\\| )async(?![\\w$-])', w:{ en:'The template name of Angular’s <code>AsyncPipe</code>: subscribes and unsubscribes for you.', ar:'اسم الـ <code>AsyncPipe</code> بتاع أنجولار في التمبلت: بيعمل subscribe وunsubscribe عشانك.' } },
      { n:'AsyncPipe', k:'ng', w:{ en:'The class you import so the template can use <code>| async</code>.', ar:'الكلاس اللي بتعمله import عشان التمبلت يقدر يستخدم <code>| async</code>.' } },
      { n:'takeUntilDestroyed', k:'ng', w:{ en:'Angular’s operator: unsubscribe when the component goes away.', ar:'operator من أنجولار: اعمل unsubscribe لما الـ component يتشال.' } },
      { n:'setInterval', k:'ng', w:{ en:'The browser’s repeating timer.', ar:'التايمر المتكرر بتاع المتصفح.' } },
      { n:'clearInterval', k:'ng', w:{ en:'The browser’s way to stop it.', ar:'طريقة المتصفح لإيقافه.' } },
      { n:'post', k:'ng', w:{ en:'An <code>HttpClient</code> method.', ar:'ميثود في <code>HttpClient</code>.' } },
      { n:'HttpClient', k:'ng', w:{ en:'Angular’s HTTP service.', ar:'الـ service بتاعة أنجولار للـ HTTP.' } },
      { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
      { n:'computed', k:'ng', w:{ en:'Angular’s derived signal.', ar:'الـ signal المشتقة بتاعة أنجولار.' } },
      { n:'asReadonly', k:'ng', w:{ en:'A signal method: a read-only view of it.', ar:'ميثود في الـ signal: نسخة للقراية بس.' } },
      { n:'update', k:'ng', w:{ en:'A signal method.', ar:'ميثود بتاعة الـ signal.' } },
      { n:'inject', k:'ng', w:{ en:'Angular’s function that hands you a dependency.', ar:'الـ function بتاعة أنجولار اللي بتديك dependency.' } },
      { n:'input', k:'ng', re:'(?<![\\w$<(-])input(?=[.(<,])', w:{ en:'Angular’s function that creates an input.', ar:'الـ function بتاعة أنجولار اللي بتعمل input.' } },
      { n:'required', k:'ng', w:{ en:'Part of <code>input.required</code>.', ar:'جزء من <code>input.required</code>.' } },
      { n:'@Injectable', k:'ng', w:{ en:'Angular’s decorator for a service.', ar:'الـ decorator بتاع أنجولار للـ service.' } },
      { n:'providedIn', k:'ng', w:{ en:'An option key Angular reads.', ar:'مفتاح إعداد أنجولار بيقراه.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator.', ar:'الـ decorator بتاع أنجولار.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The string after it is yours.', ar:'مفتاح إعداد. النص اللي بعده بتاعك.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key.', ar:'مفتاح إعداد.' } },
      { n:'imports', k:'ng', w:{ en:'An option key: what this template may use.', ar:'مفتاح إعداد: التمبلت ده مسموح له يستخدم إيه.' } },
      { n:'click', k:'ng', w:{ en:'The browser’s event name.', ar:'اسم الـ event بتاع المتصفح.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One click, six stops', ar: 'كليك واحدة، ست محطات' },
    lead: {
      en: 'A shop. Each product card has an <b>Add to cart</b> button, and a badge in the header shows how many items are in the cart. The card and the badge never talk to each other: they both talk to one store. Follow the click:',
      ar: 'محل. كل كارت منتج فيه زرار <b>Add to cart</b>، وفيه badge في الـ header بيعرض الكارت فيها كام حاجة. الكارت والـ badge عمرهم ما بيكلموا بعض: الاتنين بيكلموا store واحد. امشي ورا الكليك:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'product-card.html', lang: 'html', who: { en: 'card · button', ar: 'الكارت · الزرار' },
          code: ['<button (click)="addToCart()">Add to cart</button>'],
          say: { en: `${ng('click')} is the browser’s. ${mine('addToCart')} is the card’s own method; nobody else knows it.`,
                 ar: `${ng('click')} بتاع المتصفح. و${mine('addToCart')} ميثود الكارت نفسه؛ محدش تاني يعرفها.` } },
        { file: 'product-card.ts', lang: 'ts', who: { en: 'card · calls the store', ar: 'الكارت · بينادي الـ store' },
          code: ['this.cart.add(this.product());'],
          say: { en: `${mine('cart')} is the card’s name for the injected ${pub('CartStore')}. ${pub('add')} is the store’s method, so the store and every caller share it. The card never touches a Subject.`,
                 ar: `${mine('cart')} اسم الكارت للـ ${pub('CartStore')} المتعمله inject. و${pub('add')} ميثود الـ store، فالـ store وكل اللي بينادوها متشاركين فيها. الكارت عمره ما بيلمس Subject.` } },
        { file: 'cart-store.ts', lang: 'ts', who: { en: 'store · pushes', ar: 'الـ store · بيدفع' },
          code: ['this._items.next([...this._items.value, item]);'],
          say: { en: `Here is the push. ${ng('next')} is RxJS’s, and on a Subject it means <b>“send this value to everyone listening”</b>. ${ng('value')} reads the current cart. ${mine('_items')} and ${mine('item')} are yours. Only the store ever calls ${ng('next')} on its Subject.`,
                 ar: `ودي الدفعة. ${ng('next')} بتاعة RxJS، وعلى الـ Subject معناها <b>«ابعت القيمة دي لكل اللي سامعين»</b>. و${ng('value')} بتقرا الكارت الحالية. و${mine('_items')} و${mine('item')} بتوعك. والـ store بس هو اللي بينادي ${ng('next')} على الـ Subject بتاعه.` } },
        { file: 'cart-store.ts', lang: 'ts', who: { en: 'store · derives', ar: 'الـ store · بيشتق' },
          code: ['readonly count$ = this.items$.pipe(map(list => list.length));'],
          say: { en: `A new stream made from the old one. ${ng('pipe')} and ${ng('map')} are RxJS’s. ${pub('count$')} is your name, and the <code>$</code> is part of it: a habit that says “this is a stream, subscribe to read it”. ${mine('list')} is a parameter.`,
                 ar: `stream جديد معمول من القديم. ${ng('pipe')} و${ng('map')} بتوع RxJS. و${pub('count$')} اسمك انت، والـ <code>$</code> جزء منه: عادة معناها «ده stream، اعمل subscribe عشان تقراه». و${mine('list')} parameter.` } },
        { file: 'cart-badge.ts', lang: 'ts', who: { en: 'badge · reads in the template', ar: 'الـ badge · بيقرا في التمبلت' },
          code: ['template: `<span class="badge">{{ cart.count$ | async }}</span>`,'],
          say: { en: `${ng('async')} subscribes for you and unsubscribes when the badge goes away. The name after the dot must be exactly the store’s ${pub('count$')}, dollar sign included.`,
                 ar: `${ng('async')} بيعمل subscribe عشانك وبيعمل unsubscribe لما الـ badge يتشال. والاسم اللي بعد النقطة لازم يبقى ${pub('count$')} بتاع الـ store بالظبط، بعلامة الدولار.` } },
        { file: 'cart-badge.ts', lang: 'ts', who: { en: 'badge · or by hand', ar: 'الـ badge · أو بإيدك' },
          code: ['this.cart.count$.pipe(takeUntilDestroyed()).subscribe({', "  next: n => console.log('items in cart:', n),", '});'],
          say: { en: `The same read, by hand. This ${ng('next')} is a <b>key</b>: “when a value arrives, call this”. Same RxJS word, other direction. ${mine('n')} is yours. ${ng('takeUntilDestroyed')} does the unsubscribing that ${ng('async')} did for free.`,
                 ar: `نفس القراية، بإيدك. الـ ${ng('next')} دي <b>مفتاح</b>: «لما قيمة توصل، نادي ده». نفس كلمة RxJS، بس في الاتجاه التاني. و${mine('n')} بتاعك. و${ng('takeUntilDestroyed')} بتعمل الـ unsubscribe اللي ${ng('async')} كان بيعمله ببلاش.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'Card: <code>cart.add(product)</code>. Store: <code>_items.next([...])</code>, published as <code>items$</code> and <code>count$</code>. Badge: <code>cart.count$ | async</code>. The names files share are <b>CartStore</b>, <b>add</b> and <b>count$</b>. <code>next</code> is RxJS’s, in both of its jobs.',
        ar: 'الكارت: <code>cart.add(product)</code>. الـ store: <code>_items.next([...])</code>، ومنشور كـ <code>items$</code> و<code>count$</code>. الـ badge: <code>cart.count$ | async</code>. الأسماء اللي الملفات متشاركة فيها هي <b>CartStore</b> و<b>add</b> و<b>count$</b>. و<code>next</code> بتاعة RxJS، في الشغلانتين بتوعها.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Push or read?', ar: 'تدفع ولا تقرا؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'Every line here is either <b>pushing</b> a value in or <b>reading</b> values out. Pushing happens in one place. Reading can happen anywhere.',
      ar: 'كل سطر هنا يا إما <b>بيدفع</b> قيمة لجوه، يا إما <b>بيقرا</b> قيم لبرّه. الدفع بيحصل في مكان واحد. والقراية ممكن تحصل في أي حتة.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>new BehaviorSubject&lt;Item[]&gt;([])</code>', '<code>cart-store.ts</code>', 'the store', `you pick ${mine('_items')}; ${ng('BehaviorSubject')} is RxJS’s`],
            ar: ['<code>new BehaviorSubject&lt;Item[]&gt;([])</code>', '<code>cart-store.ts</code>', 'الـ store', `انت بتختار ${mine('_items')}؛ و${ng('BehaviorSubject')} بتاع RxJS`] },
          { en: ['<code>this._items.next(…)</code>', '<code>cart-store.ts</code>', 'the store, and <b>only</b> the store', `${ng('next')} and ${ng('value')} are RxJS’s`],
            ar: ['<code>this._items.next(…)</code>', '<code>cart-store.ts</code>', 'الـ store، والـ store <b>بس</b>', `${ng('next')} و${ng('value')} بتوع RxJS`] },
          { en: ['<code>readonly items$ = this._items.asObservable()</code>', '<code>cart-store.ts</code>', 'the store', `you pick ${pub('items$')}, and readers type it; ${ng('asObservable')} is RxJS’s`],
            ar: ['<code>readonly items$ = this._items.asObservable()</code>', '<code>cart-store.ts</code>', 'الـ store', `انت بتختار ${pub('items$')}، واللي بيقروا بيكتبوه؛ و${ng('asObservable')} بتاعة RxJS`] },
          { en: ['<code>this.cart.add(…)</code>', '<code>product-card.ts</code>', 'any component', `${pub('add')} copies the store; you pick ${mine('cart')}`],
            ar: ['<code>this.cart.add(…)</code>', '<code>product-card.ts</code>', 'أي component', `${pub('add')} بينسخ الـ store؛ وانت بتختار ${mine('cart')}`] },
          { en: ['<code>cart.count$ | async</code>', '<code>cart-badge.ts</code>', 'any reader', `${pub('count$')} copies the store; ${ng('async')} is Angular’s`],
            ar: ['<code>cart.count$ | async</code>', '<code>cart-badge.ts</code>', 'أي حد بيقرا', `${pub('count$')} بينسخ الـ store؛ و${ng('async')} بتاع أنجولار`] },
          { en: ['<code>.subscribe({ next, error, complete })</code>', '<code>cart-badge.ts</code>', 'any reader', `the keys are RxJS’s; you pick ${mine('n')} and ${mine('err')}`],
            ar: ['<code>.subscribe({ next, error, complete })</code>', '<code>cart-badge.ts</code>', 'أي حد بيقرا', `المفاتيح بتاعة RxJS؛ وانت بتختار ${mine('n')} و${mine('err')}`] },
        ] },
      { t: 'ul',
        en: ['<b>Only the store calls <code>.next()</code> on its Subject.</b> Everyone else calls methods like <code>add</code>. That is why the Subject is <code>private</code> and the world only sees <code>items$</code>.',
             '<b>Nothing reaches a reader until it subscribes.</b> <code>| async</code> subscribes for you; <code>.subscribe()</code> is doing it by hand.',
             '<b><code>next</code> has two jobs, both RxJS’s.</b> <code>subject.next(v)</code> sends. <code>{ next: v =&gt; … }</code> receives. If you see it after a dot, it pushes; if you see it before a colon, it listens.'],
        ar: ['<b>الـ store بس هو اللي بينادي <code>.next()</code> على الـ Subject بتاعه.</b> أي حد تاني بينادي ميثودز زي <code>add</code>. وعشان كده الـ Subject <code>private</code> والدنيا بتشوف <code>items$</code> بس.',
             '<b>مفيش حاجة بتوصل لحد بيقرا غير لما يعمل subscribe.</b> <code>| async</code> بيعمل subscribe عشانك؛ و<code>.subscribe()</code> إنك تعملها بإيدك.',
             '<b><code>next</code> ليها شغلانتين، الاتنين بتوع RxJS.</b> <code>subject.next(v)</code> بتبعت. و<code>{ next: v =&gt; … }</code> بتستقبل. لو شفتها بعد نقطة، بتدفع؛ لو شفتها قبل نقطتين فوق بعض، بتسمع.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All five files, every name coloured', ar: 'الخمس ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same example, complete. Hover a coloured name to light up everywhere else it appears. Then press <b>Rename test</b>: every name you own turns into a made-up word, RxJS’s words stay put, and the code still works.',
      ar: 'نفس المثال، كامل. قف بالماوس على أي اسم ملوّن وهتنوّر كل الأماكن التانية اللي هو فيها. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: كل اسم بتاعك هيبقى كلمة عشوائية، وكلمات RxJS هتفضل مكانها، والكود لسه شغال.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'item.ts', lang: 'ts', tag: { en: 'the data', ar: 'الداتا' }, code: [
        'export interface Item {',
        '  name: string;',
        '  price: number;',
        '}' ] },
      { t: 'code', name: 'cart-store.ts', lang: 'ts', tag: { en: 'the only writer', ar: 'الكاتب الوحيد' }, code: [
        "import { Injectable } from '@angular/core';",
        "import { BehaviorSubject, map } from 'rxjs';",
        "import { Item } from './item';",
        '',
        "@Injectable({ providedIn: 'root' })",
        'export class CartStore {',
        '  private readonly _items = new BehaviorSubject<Item[]>([]);',
        '',
        '  readonly items$ = this._items.asObservable();              // read-only view',
        '  readonly count$ = this.items$.pipe(map(list => list.length));',
        '',
        '  add(item: Item) {',
        '    this._items.next([...this._items.value, item]);           // a NEW array',
        '  }',
        '}' ] },
      { t: 'code', name: 'product-card.ts', lang: 'ts', tag: { en: 'a writer’s client', ar: 'بيطلب كتابة' }, code: [
        "import { Component, inject, input } from '@angular/core';",
        "import { CartStore } from './cart-store';",
        "import { Item } from './item';",
        '',
        '@Component({',
        "  selector: 'app-product-card',",
        "  templateUrl: './product-card.html',",
        '})',
        'export class ProductCard {',
        '  readonly product = input.required<Item>();',
        '  private readonly cart = inject(CartStore);',
        '',
        '  addToCart() {',
        '    this.cart.add(this.product());',
        '  }',
        '}' ] },
      { t: 'code', name: 'product-card.html', lang: 'html', tag: { en: 'the button', ar: 'الزرار' }, code: [
        '<h3>{{ product().name }}</h3>',
        '<button (click)="addToCart()">Add to cart</button>' ] },
      { t: 'code', name: 'cart-badge.ts', lang: 'ts', tag: { en: 'a reader', ar: 'بيقرا' }, code: [
        "import { Component, inject } from '@angular/core';",
        "import { AsyncPipe } from '@angular/common';",
        "import { takeUntilDestroyed } from '@angular/core/rxjs-interop';",
        "import { CartStore } from './cart-store';",
        '',
        '@Component({',
        "  selector: 'app-cart-badge',",
        '  imports: [AsyncPipe],',
        '  template: `<span class="badge">{{ cart.count$ | async }}</span>`,',
        '})',
        'export class CartBadge {',
        '  protected readonly cart = inject(CartStore);',
        '',
        '  constructor() {',
        '    // the same stream, by hand: only for side effects like logging',
        '    this.cart.count$.pipe(takeUntilDestroyed()).subscribe({',
        "      next: n => console.log('items in cart:', n),",
        '      error: err => console.error(err),',
        "      complete: () => console.log('cart closed'),",
        '    });',
        '  }',
        '}' ] },
      { t: 'nmtable' }
    ]
  },

  /* ------------------------------------------------------------ 4 */
  {
    id: 'rename',
    kicker: { en: 'Is it OK to change it?', ar: 'ينفع أغيّره؟' },
    title: { en: 'What breaks when you rename each name', ar: 'إيه اللي بيبوظ لما تغيّر كل اسم' },
    lead: {
      en: 'Every name you own can be renamed, and here almost every miss is a compile error. The <code>$</code> is not special: it is a letter of your name like any other.',
      ar: 'أي اسم بتاعك ينفع يتغير، وهنا تقريبًا أي حاجة تتنسي بتطلع compile error. والـ <code>$</code> مش حاجة مميزة: هي حرف في اسمك زي أي حرف.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [`${pub('count$')}, ${pub('items$')}`, 'every reader: <code>cart.count$ | async</code>, every <code>.subscribe</code>', 'Compile error in the reader’s template or code.'],
            ar: [`${pub('count$')} و${pub('items$')}`, 'كل اللي بيقروا: <code>cart.count$ | async</code>، وكل <code>.subscribe</code>', 'Compile error في تمبلت أو كود اللي بيقرا.'] },
          { en: [pub('count$') + ' to <code>count</code> (dropping the <code>$</code>)', 'the same places', 'Also a compile error if you miss one: <code>count</code> and <code>count$</code> are simply two different names.'],
            ar: [pub('count$') + ' لـ <code>count</code> (من غير الـ <code>$</code>)', 'نفس الأماكن', 'برضه compile error لو نسيت واحدة: <code>count</code> و<code>count$</code> ببساطة اسمين مختلفين.'] },
          { en: [pub('add'), 'every component that calls <code>cart.add(…)</code>', 'Compile error in each caller.'],
            ar: [pub('add'), 'كل component بينادي <code>cart.add(…)</code>', 'Compile error في كل حتة بتناديها.'] },
          { en: [pub('CartStore'), 'every <code>import</code> and <code>inject(CartStore)</code>', 'Compile error on the import.'],
            ar: [pub('CartStore'), 'كل <code>import</code> و<code>inject(CartStore)</code>', 'Compile error في الـ import.'] },
          { en: [mine('_items'), 'only inside the store', 'Compile error inside the store. Nobody outside can see it anyway.'],
            ar: [mine('_items'), 'جوه الـ store بس', 'Compile error جوه الـ store. ومحدش برّه شايفه أصلًا.'] },
          { en: [mine('cart'), 'that component’s class and its own template', 'Compile error in that component.'],
            ar: [mine('cart'), 'كلاس الـ component ده والتمبلت بتاعه', 'Compile error في الـ component ده.'] },
          { en: [`${mine('n')}, ${mine('err')}, ${mine('list')}, ${mine('item')}`, 'only inside that one callback or method', 'Compile error inside it.'],
            ar: [`${mine('n')} و${mine('err')} و${mine('list')} و${mine('item')}`, 'جوه الـ callback أو الميثود دي بس', 'Compile error جواها.'] },
          { en: [`${ng('next')}, ${ng('error')}, ${ng('complete')} as keys`, 'nothing: RxJS reads these names', 'A misspelled key is a compile error. See “When a rule picks the name”.'],
            ar: [`${ng('next')} و${ng('error')} و${ng('complete')} كمفاتيح`, 'ولا حاجة: RxJS بيقرا الأسامي دي', 'مفتاح مكتوب غلط بيطلع compile error. شوف “لما قاعدة هي اللي بتختار الاسم”.'] },
          { en: [`${ng('async')}`, 'nothing: it is the pipe’s registered name', 'Compile error: no pipe with that name.'],
            ar: [`${ng('async')}`, 'ولا حاجة: ده الاسم المتسجل للـ pipe', 'Compile error: مفيش pipe بالاسم ده.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b> above the files. <code>count$</code> becomes another word ending in <code>$</code> in the store and in the badge together, and <code>next</code> does not move in either of its two jobs.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b> فوق الملفات. <code>count$</code> هيبقى كلمة تانية آخرها <code>$</code> في الـ store والـ badge مع بعض، و<code>next</code> مش هتتحرك في ولا شغلانة من الاتنين.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتاعتك' },
    title: { en: 'RxJS’s words, and one habit that looks like syntax', ar: 'كلمات RxJS، وعادة شكلها جزء من اللغة' },
    lead: {
      en: 'Blue names belong to RxJS, Angular or the browser. Type them exactly. The <code>$</code> is not one of them.',
      ar: 'الأسماء الزرقا بتاعة RxJS أو أنجولار أو المتصفح. اكتبها زي ما هي. والـ <code>$</code> مش منهم.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Owner', 'Names', 'What they are'], ar: ['صاحبها', 'الأسماء', 'هي إيه'] },
        rows: [
          { en: ['RxJS types', `${ng('Observable')}, <code>Subject</code>, ${ng('BehaviorSubject')}`, 'A stream; a stream you can push into; one that also remembers the latest value.'],
            ar: ['أنواع RxJS', `${ng('Observable')} و<code>Subject</code> و${ng('BehaviorSubject')}`, 'stream؛ وstream تقدر تدفع فيه؛ وواحد كمان بيفتكر آخر قيمة.'] },
          { en: ['RxJS methods', `${ng('subscribe')}, ${ng('pipe')}, ${ng('next')}, ${ng('asObservable')}, ${ng('value')}`, 'Start listening; chain operators; push; hide the push; read the latest.'],
            ar: ['ميثودز RxJS', `${ng('subscribe')} و${ng('pipe')} و${ng('next')} و${ng('asObservable')} و${ng('value')}`, 'ابدأ تسمع؛ وصّل operators؛ ادفع؛ خبّي الدفع؛ اقرا آخر قيمة.'] },
          { en: ['RxJS observer keys', `${ng('next')}, ${ng('error')}, ${ng('complete')}`, 'The only three things a stream can ever tell you.'],
            ar: ['مفاتيح الـ observer في RxJS', `${ng('next')} و${ng('error')} و${ng('complete')}`, 'التلات حاجات الوحيدة اللي أي stream ممكن يقولهالك.'] },
          { en: ['Angular', `${ng('async')}, ${ng('AsyncPipe')}, ${ng('takeUntilDestroyed')}`, 'The pipe (two names, one thing) and the auto-unsubscribe operator.'],
            ar: ['أنجولار', `${ng('async')} و${ng('AsyncPipe')} و${ng('takeUntilDestroyed')}`, 'الـ pipe (اسمين لحاجة واحدة) والـ operator اللي بيعمل unsubscribe لوحده.'] },
        ] },
      { t: 'p',
        en: 'The <code>$</code> at the end of <code>count$</code> is a naming habit, and Angular’s own documentation describes it that way: common, not enforced. TypeScript sees <code>count$</code> as a name like <code>count</code>. It is a note to the reader: “this is a stream, you have to subscribe”.',
        ar: 'الـ <code>$</code> اللي في آخر <code>count$</code> عادة في التسمية، والـ documentation بتاعة أنجولار نفسها بتوصفها كده: منتشرة، بس مش إجبارية. TypeScript شايف <code>count$</code> اسم زي <code>count</code>. هي ملحوظة للي بيقرا: «ده stream، لازم تعمل subscribe».' },
      { t: 'p',
        en: `When you build an Observable by hand, the same split applies. RxJS calls your function with one argument, and you name it: ${mine('observer')} here, <code>subscriber</code> in many docs. The methods on it are not yours.`,
        ar: `لما تبني Observable بإيدك، نفس التقسيمة. RxJS بينادي الـ function بتاعتك بـ argument واحد، وانت اللي بتسمّيه: ${mine('observer')} هنا، و<code>subscriber</code> في docs كتير. أما الميثودز اللي عليه فمش بتاعتك.` },
      { t: 'code', name: 'clock.ts', lang: 'ts', tag: { en: 'a stream by hand', ar: 'stream بإيدك' }, code: [
        "import { Observable } from 'rxjs';",
        '',
        'const clock$ = new Observable<number>(observer => {',
        '  let n = 0;',
        '  const timerId = setInterval(() => observer.next(n++), 1000);',
        '  return () => clearInterval(timerId);     // runs on unsubscribe',
        '});' ] },
      { t: 'p',
        en: `${mine('clock$')}, ${mine('observer')}, ${mine('n')} and ${mine('timerId')} are yours. ${ng('next')} is RxJS’s. The function you return has no name at all: RxJS keeps it and calls it when the last reader unsubscribes.`,
        ar: `${mine('clock$')} و${mine('observer')} و${mine('n')} و${mine('timerId')} بتوعك. و${ng('next')} بتاعة RxJS. والـ function اللي بترجّعها ملهاش اسم خالص: RxJS بيحتفظ بيها وبيناديها لما آخر واحد بيقرا يعمل unsubscribe.` }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'RxJS accepts any name. These habits tell the next reader, at a glance, what is a stream, what is private, and what they are allowed to call.',
      ar: 'RxJS بيقبل أي اسم. العادات دي بتقول للي هيقرا بعدك، من أول نظرة، إيه اللي stream، وإيه اللي خاص، وإيه اللي مسموح له ينادي عليه.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['a stream', '<code>items$</code>, <code>count$</code>', '<code>itemsObservable</code>, <code>$items</code>', 'A trailing <code>$</code> is the widely used habit; it tells the reader to subscribe or use <code>| async</code>.'],
            ar: ['stream', '<code>items$</code>، <code>count$</code>', '<code>itemsObservable</code>، <code>$items</code>', 'الـ <code>$</code> في الآخر هي العادة المنتشرة؛ بتقول للي بيقرا يعمل subscribe أو يستخدم <code>| async</code>.'] },
          { en: ['the private Subject', '<code>_items</code>, <code>itemsSubject</code>', 'making it public', 'Anyone who can reach a Subject can call <code>.next()</code> on your state from anywhere.'],
            ar: ['الـ Subject الخاص', '<code>_items</code>، <code>itemsSubject</code>', 'إنك تخليه public', 'أي حد يوصل للـ Subject يقدر ينادي <code>.next()</code> على الـ state بتاعتك من أي حتة.'] },
          { en: ['the store’s methods', '<code>add</code>, <code>remove</code>, <code>clear</code>', '<code>next</code>, <code>setItems</code>', 'Name the action. A method called <code>next</code> on a store is a trap: it reads like RxJS.'],
            ar: ['ميثودز الـ store', '<code>add</code>، <code>remove</code>، <code>clear</code>', '<code>next</code>، <code>setItems</code>', 'سمّي الفعل. ميثود اسمها <code>next</code> في store فخ: بتتقري كأنها RxJS.'] },
          { en: ['callback parameters', '<code>n</code>, <code>count</code>, <code>items</code>', '<code>data</code>, <code>res</code>, <code>x</code>', 'Name the value that arrives, so the line reads by itself.'],
            ar: ['الـ parameters بتاعة الـ callbacks', '<code>n</code>، <code>count</code>، <code>items</code>', '<code>data</code>، <code>res</code>، <code>x</code>', 'سمّي القيمة اللي بتوصل، عشان السطر يتقري لوحده.'] },
          { en: ['an event stream', '<code>saved$</code>, <code>clicks$</code>', '<code>save$</code>', 'Past tense for events: something that happened.'],
            ar: ['stream للأحداث', '<code>saved$</code>، <code>clicks$</code>', '<code>save$</code>', 'صيغة الماضي للأحداث: حاجة حصلت.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Two places where the name is not free', ar: 'مكانين الاسم فيهم مش براحتك' },
    lead: {
      en: 'Both of these are loud when you get them wrong, which is good. They are here because the error messages do not say “you used the wrong name”.',
      ar: 'الاتنين دول بيعلّوا صوتهم لما تغلط، وده كويس. هما هنا عشان رسايل الـ error مش بتقول «انت استخدمت اسم غلط».'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'The observer’s keys are RxJS’s', ar: 'مفاتيح الـ observer بتاعة RxJS' }, blocks: [
        { t: 'pair',
          bad:  { name: 'cart-badge.ts', lang: 'ts', code: [
            'this.cart.count$.subscribe({',
            '  onNext: n => console.log(n),',
            '  onError: err => console.error(err),',
            '});' ] },
          good: { name: 'cart-badge.ts', lang: 'ts', code: [
            'this.cart.count$.subscribe({',
            '  next: n => console.log(n),',
            '  error: err => console.error(err),',
            '});' ] } },
        { t: 'p',
          en: 'RxJS looks for exactly <code>next</code>, <code>error</code> and <code>complete</code>. TypeScript refuses the left one, but the message talks about types that do not match, not about a misspelled name. The values’ names, <code>n</code> and <code>err</code>, stay yours.',
          ar: 'RxJS بيدوّر على <code>next</code> و<code>error</code> و<code>complete</code> بالظبط. TypeScript بيرفض اللي على الشمال، بس الرسالة بتتكلم عن أنواع مش متطابقة، مش عن اسم مكتوب غلط. وأسماء القيم، <code>n</code> و<code>err</code>، لسه بتاعتك.' }
      ]},
      { t: 'step', n: 'B', title: { en: '<code>async</code> in the template, <code>AsyncPipe</code> in <code>imports</code>', ar: '<code>async</code> في التمبلت، و<code>AsyncPipe</code> في <code>imports</code>' }, blocks: [
        { t: 'pair',
          bad:  { name: 'cart-badge.ts — forgot the import', lang: 'ts', code: [
            '@Component({',
            "  selector: 'app-cart-badge',",
            '  template: `<span class="badge">{{ cart.count$ | async }}</span>`,',
            '})' ] },
          good: { name: 'cart-badge.ts — imported', lang: 'ts', code: [
            '@Component({',
            "  selector: 'app-cart-badge',",
            '  imports: [AsyncPipe],',
            '  template: `<span class="badge">{{ cart.count$ | async }}</span>`,',
            '})' ] } },
        { t: 'p',
          en: `One thing, two names. The class you import is ${ng('AsyncPipe')}; the name you type after <code>|</code> is ${ng('async')}. Forget the import and the compiler says it cannot find a pipe called <code>async</code>, even though you never wrote that word in <code>imports</code>.`,
          ar: `حاجة واحدة، باسمين. الكلاس اللي بتعمله import اسمه ${ng('AsyncPipe')}؛ والاسم اللي بتكتبه بعد <code>|</code> هو ${ng('async')}. انسى الـ import والـ compiler هيقول إنه مش لاقي pipe اسمه <code>async</code>، مع إنك عمرك ما كتبت الكلمة دي في <code>imports</code>.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older and newer', ar: 'أقدم وأحدث' },
    title: { en: 'The same store with signals: your names stay, RxJS’s change', ar: 'نفس الـ store بالـ signals: أسماءك بتفضل، وكلمات RxJS بتتغير' },
    lead: {
      en: 'Code written before signals uses a BehaviorSubject store like this one, and you will read it for years. New code often writes the same store with signals. Put side by side, only the blue words change.',
      ar: 'الكود اللي اتكتب قبل الـ signals بيستخدم store بـ BehaviorSubject زي ده، وهتقراه لسنين. والكود الجديد غالبًا بيكتب نفس الـ store بالـ signals. لو حطيتهم جنب بعض، الكلمات الزرقا بس هي اللي بتتغير.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'cart-store.ts — RxJS version', lang: 'ts', code: [
          'private readonly _items = new BehaviorSubject<Item[]>([]);',
          '',
          'readonly items$ = this._items.asObservable();',
          'readonly count$ = this.items$.pipe(map(list => list.length));',
          '',
          'add(item: Item) {',
          '  this._items.next([...this._items.value, item]);',
          '}' ] },
        good: { name: 'cart-store.ts — signal version', lang: 'ts', code: [
          'private readonly _items = signal<Item[]>([]);',
          '',
          'readonly items = this._items.asReadonly();',
          'readonly count = computed(() => this._items().length);',
          '',
          'add(item: Item) {',
          '  this._items.update(list => [...list, item]);',
          '}' ] } },
      { t: 'tbl',
        head: { en: ['RxJS store', 'Signal store'], ar: ['store بـ RxJS', 'store بالـ signals'] },
        rows: [
          { en: ['<code>new BehaviorSubject(…)</code>', '<code>signal(…)</code>'], ar: ['<code>new BehaviorSubject(…)</code>', '<code>signal(…)</code>'] },
          { en: ['<code>_items.next(newList)</code>', '<code>_items.set(newList)</code> or <code>_items.update(fn)</code>'], ar: ['<code>_items.next(newList)</code>', '<code>_items.set(newList)</code> أو <code>_items.update(fn)</code>'] },
          { en: ['<code>_items.value</code>', '<code>_items()</code>'], ar: ['<code>_items.value</code>', '<code>_items()</code>'] },
          { en: ['<code>asObservable()</code>', '<code>asReadonly()</code>'], ar: ['<code>asObservable()</code>', '<code>asReadonly()</code>'] },
          { en: ['<code>pipe(map(…))</code>', '<code>computed(() =&gt; …)</code>'], ar: ['<code>pipe(map(…))</code>', '<code>computed(() =&gt; …)</code>'] },
          { en: ['<code>{{ cart.count$ | async }}</code>', '<code>{{ cart.count() }}</code>'], ar: ['<code>{{ cart.count$ | async }}</code>', '<code>{{ cart.count() }}</code>'] },
        ] },
      { t: 'p',
        en: `The left side is not wrong; it is what you will read. ${mine('_items')}, ${pub('add')}, ${mine('item')} and ${mine('list')} did not change at all. The only name that did is the one that carried the <code>$</code> habit: ${pub('count$')} became ${pub('count')}, because a signal is not a stream and is read by calling it.`,
        ar: `اللي على الشمال مش غلط؛ ده اللي هتقراه. ${mine('_items')} و${pub('add')} و${mine('item')} و${mine('list')} متغيروش خالص. الاسم الوحيد اللي اتغير هو اللي كان شايل عادة الـ <code>$</code>: ${pub('count$')} بقى ${pub('count')}، عشان الـ signal مش stream وبتتقري بإنك تناديها.` }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, and says nothing', ar: 'مش بيعمل حاجة، ومش بيقول حاجة' },
    title: { en: 'Mistakes that fail silently', ar: 'غلطات بتفشل في صمت' },
    lead: {
      en: 'A stream that nobody listens to, or a value that was changed without being pushed, gives no error. The screen just does not move.',
      ar: 'stream محدش بيسمعه، أو قيمة اتغيرت من غير ما تتدفع، مش بيدّوا أي error. الشاشة بس مش بتتحرك.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'Nobody subscribed', ar: 'محدش عمل subscribe' }, blocks: [
        { t: 'pair',
          bad:  { name: 'cart-store.ts', lang: 'ts', code: [
            'private readonly http = inject(HttpClient);',
            '',
            'checkout() {',
            "  this.http.post('/api/orders', this._items.value);",
            '}' ] },
          good: { name: 'cart-store.ts', lang: 'ts', code: [
            'private readonly http = inject(HttpClient);',
            '',
            'checkout() {',
            "  this.http.post('/api/orders', this._items.value).subscribe();",
            '}' ] } },
        { t: 'p', en: 'An Observable is a recipe. <code>post</code> only writes it down; <code>subscribe</code> cooks it. On the left, no request ever leaves, and nothing tells you.',
                  ar: 'الـ Observable وصفة. <code>post</code> بتكتبها بس؛ و<code>subscribe</code> هي اللي بتطبخها. على الشمال، ولا request بيخرج، ومحدش بيقولك.' }
      ]},
      { t: 'step', n: '2', title: { en: 'Changing <code>.value</code> instead of pushing', ar: 'تغيير <code>.value</code> بدل الدفع' }, blocks: [
        { t: 'pair',
          bad:  { name: 'cart-store.ts', lang: 'ts', code: ['add(item: Item) {', '  this._items.value.push(item);', '}'] },
          good: { name: 'cart-store.ts', lang: 'ts', code: ['add(item: Item) {', '  this._items.next([...this._items.value, item]);', '}'] } },
        { t: 'p', en: '<code>value</code> is only for reading. Pushing into that array changes it, but nobody is told, so the badge keeps showing the old count. Listeners only hear about values sent with <code>next</code>.',
                  ar: '<code>value</code> للقراية بس. إنك تعمل push في الـ array دي بيغيّرها، بس محدش بيتقاله، فالـ badge بيفضل يعرض العدد القديم. اللي سامعين بيعرفوا بس بالقيم اللي اتبعتت بـ <code>next</code>.' }
      ]},
      { t: 'step', n: '3', title: { en: 'Forgetting <code>| async</code>', ar: 'نسيان <code>| async</code>' }, blocks: [
        { t: 'pair',
          bad:  { name: 'cart-badge.ts', lang: 'ts', code: ['template: `<span class="badge">{{ cart.count$ }}</span>`,'] },
          good: { name: 'cart-badge.ts', lang: 'ts', code: ['template: `<span class="badge">{{ cart.count$ | async }}</span>`,'] } },
        { t: 'p', en: 'Without the pipe, the template prints the stream object itself: the badge shows <code>[object Object]</code>. That odd text is the clue that a <code>$</code> name was read without subscribing.',
                  ar: 'من غير الـ pipe، التمبلت بيطبع الـ stream نفسه: الـ badge بيعرض <code>[object Object]</code>. الكلام الغريب ده هو العلامة إن اسم بـ <code>$</code> اتقري من غير subscribe.' }
      ]},
      { t: 'step', n: '4', title: { en: 'Subscribing by hand with no way out', ar: 'subscribe بإيدك من غير مخرج' }, blocks: [
        { t: 'pair',
          bad:  { name: 'cart-badge.ts', lang: 'ts', code: ["this.cart.count$.subscribe(n => console.log('items in cart:', n));"] },
          good: { name: 'cart-badge.ts', lang: 'ts', code: ["this.cart.count$.pipe(takeUntilDestroyed()).subscribe(n => console.log('items in cart:', n));"] } },
        { t: 'p', en: '<code>count$</code> comes from a store that lives as long as the app, so it never completes. On the left, every badge that is created and destroyed leaves one more subscription running. No error, just a slow leak and repeated logs.',
                  ar: '<code>count$</code> جاي من store عايش طول عمر التطبيق، فعمره ما بيخلص. على الشمال، كل badge بيتعمل وبيتشال بيسيب subscription زيادة شغالة. مفيش error، بس تسريب بطيء وlogs بتتكرر.' }
      ]},
      { t: 'step', n: '5', title: { en: 'Pushing from outside the store', ar: 'الدفع من برّه الـ store' }, blocks: [
        { t: 'pair',
          bad:  { name: 'product-card.ts', lang: 'ts', code: ['this.cart.items$.next([]);'] },
          good: { name: 'product-card.ts', lang: 'ts', code: ['this.cart.add(this.product());'] } },
        { t: 'p', en: 'This one is an error, and a good one: “Property <code>next</code> does not exist on type <code>Observable</code>”. <code>asObservable()</code> removed <code>next</code> on purpose. If you need a new kind of change, add a method to the store.',
                  ar: 'دي error، وكويسة: «Property <code>next</code> does not exist on type <code>Observable</code>». <code>asObservable()</code> شالت <code>next</code> بالقصد. لو محتاج نوع تغيير جديد، ضيف ميثود في الـ store.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it does nothing', ar: 'لما مايعملش حاجة' },
    title: { en: 'Six questions, in this order', ar: 'ست أسئلة، بالترتيب ده' },
    lead: {
      en: 'The badge does not update, or nothing happens at all. Ask these before anything else.',
      ar: 'الـ badge مش بيتحدّث، أو مفيش حاجة بتحصل خالص. اسأل دول قبل أي حاجة.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Is anything subscribed: <code>| async</code>, <code>.subscribe()</code> or <code>toSignal</code>?',
                  ar: '<b>1.</b> فيه حاجة عاملة subscribe: <code>| async</code> أو <code>.subscribe()</code> أو <code>toSignal</code>؟' },
      { t: 'chk', en: '<b>2.</b> In the template, is there <code>| async</code> after the stream, and <code>AsyncPipe</code> in <code>imports</code>?',
                  ar: '<b>2.</b> في التمبلت، فيه <code>| async</code> بعد الـ stream، و<code>AsyncPipe</code> في <code>imports</code>؟' },
      { t: 'chk', en: '<b>3.</b> Does the store push a new value with <code>.next(…)</code>, instead of changing <code>.value</code>?',
                  ar: '<b>3.</b> الـ store بيدفع قيمة جديدة بـ <code>.next(…)</code>، بدل ما يغيّر <code>.value</code>؟' },
      { t: 'chk', en: '<b>4.</b> Is it a <code>BehaviorSubject</code>? A plain <code>Subject</code> gives nothing to a reader who subscribes after the push.',
                  ar: '<b>4.</b> هو <code>BehaviorSubject</code>؟ الـ <code>Subject</code> العادي مش بيدّي حاجة للي بيعمل subscribe بعد الدفع.' },
      { t: 'chk', en: '<b>5.</b> Did the stream fail earlier? After an <code>error</code>, a stream never sends anything again.',
                  ar: '<b>5.</b> الـ stream فشل قبل كده؟ بعد <code>error</code>، الـ stream عمره ما بيبعت حاجة تاني.' },
      { t: 'chk', en: '<b>6.</b> For a hand-written <code>subscribe</code> on a stream that never completes: is <code>takeUntilDestroyed()</code> in the pipe?',
                  ar: '<b>6.</b> لو فيه <code>subscribe</code> بإيدك على stream عمره ما بيخلص: <code>takeUntilDestroyed()</code> موجودة في الـ pipe؟' }
    ]
  }
  ]
};
