/* ==================================================================
   signal(), name by name — the deep dive after the signals topic.
   One running example (a cart store, a product card that writes to it,
   and a cart that reads it) followed through every file.
   Model: content/deep/inputs-outputs.mjs.
   ================================================================== */

const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

/* every block that is the store's file: the component's own `items` never lives there */
const STORE = ['cart.store.ts', 'cart.store.ts — older style', 'cart.store.ts — today'];

export default {
  topic: 'signals',
  tab: 'signal(), name by name — The Angular Signal',
  title: { en: '<code>signal()</code>, name by name', ar: '<code>signal()</code>، اسم اسم' },
  say: {
    en: 'The page for when signals make you lose track of who owns what. One cart followed through six files, every name coloured: <b>Angular’s</b>, <b>yours</b>, or <b>yours but shared</b>. Then what breaks when you rename each one, and the mistakes that fail without a word.',
    ar: 'الصفحة دي للي بيتوه في الـ signals ومش عارف مين بتاع مين. كارت واحد ماشيين وراه في ست ملفات، وكل اسم ملوّن: <b>بتاع أنجولار</b>، ولا <b>بتاعك</b>، ولا <b>بتاعك بس متشارك</b>. وبعدين إيه اللي بيبوظ لما تغيّر كل واحد، والغلطات اللي بتفشل من غير ولا كلمة.'
  },
  lead: {
    en: 'The idea of a signal is simple: <b>a box with a value in it that tells Angular when the value changes.</b> The confusing part is the names. There is <code>_items</code> and <code>items</code>, a store called <code>cart</code> in one component and <code>store</code> in another, and brackets that sometimes appear and sometimes do not. This page tells you which names are Angular’s, which are yours, and which ones two files must agree on.',
    ar: 'فكرة الـ signal بسيطة: <b>صندوق جواه قيمة، وبيقول لأنجولار لما القيمة تتغير.</b> اللي بيلخبط هو الأسماء. فيه <code>_items</code> وفيه <code>items</code>، وفيه store اسمه <code>cart</code> في component واسمه <code>store</code> في component تاني، وأقواس ساعات بتظهر وساعات لأ. الصفحة دي بتقولك أنهي أسماء بتاعة أنجولار، وأنهي بتاعتك، وأنهي لازم ملفين يتفقوا عليها.'
  },

  names: {
    note: {
      en: 'Read the orange rows first: the store’s class name, its public signal and its methods. Every component that injects the store types them. Green names are private: the writable <code>_items</code> inside the store, and the name each component gives the store it injected.',
      ar: 'اقرا الصفوف البرتقاني الأول: اسم كلاس الـ store، والـ signal العمومية بتاعته، والميثودز بتاعته. أي component بيعمل inject للـ store بيكتبهم. والأسماء الخضرا خاصة: الـ <code>_items</code> اللي بتتكتب جوه الـ store، والاسم اللي كل component بيدّيه للـ store اللي عمله inject.'
    },
    names: [
      /* --- shared: two files must agree --- */
      { n:'CartStore', k:'pub',
        w:{ en:'The store’s class name. Every <code>inject(CartStore)</code> and every <code>import</code> of it follows a rename.',
            ar:'اسم كلاس الـ store. كل <code>inject(CartStore)</code> وكل <code>import</code> ليه بيتغيروا معاه.' } },
      { n:'items', k:'pub', re:'(?<=store\\.)items(?![\\w$-])|(?<=readonly )items(?= = this\\._items)',
        w:{ en:'The store’s public, read-only signal. Readers type it as <code>store.items</code>, so the store and every reader change together.',
            ar:'الـ signal العمومية الـ read-only بتاعة الـ store. اللي بيقروها بيكتبوها <code>store.items</code>، فالـ store وكل اللي بيقروا بيتغيروا مع بعض.' } },
      { n:'add', k:'pub',
        w:{ en:'The store’s public method. The product card calls it as <code>cart.add(…)</code>.',
            ar:'ميثود الـ store العمومية. كارت المنتج بيناديها كـ <code>cart.add(…)</code>.' } },
      { n:'clear', k:'pub',
        w:{ en:'The store’s public method. The cart calls it as <code>store.clear()</code>.',
            ar:'ميثود الـ store العمومية. الكارت بيناديها كـ <code>store.clear()</code>.' } },
      { n:'items$', k:'pub',
        w:{ en:'The older, observable version of <code>items</code>. The <code>$</code> is a habit for streams, not a rule.',
            ar:'النسخة القديمة الـ observable من <code>items</code>. الـ <code>$</code> عادة للـ streams، مش قاعدة.' } },
      { n:'Item', k:'pub',
        w:{ en:'Your data type. Every file that imports it follows a rename.', ar:'نوع الداتا بتاعك. أي ملف بيعمله import بيتغير معاه.' } },
      { n:'id', k:'pub',
        w:{ en:'A field on your data. Every file that reads <code>.id</code> follows a rename.', ar:'field في الداتا بتاعتك. أي ملف بيقرا <code>.id</code> بيتغير معاه.' } },
      { n:'title', k:'pub',
        w:{ en:'A field on your data, read by both templates.', ar:'field في الداتا بتاعتك، والتمبلتين بيقروه.' } },
      { n:'price', k:'pub',
        w:{ en:'A field on your data, read by the cart.', ar:'field في الداتا بتاعتك، والكارت بيقراه.' } },
      { n:'product', k:'pub',
        w:{ en:'The product card’s input. The page that shows the card sets it with <code>[product]</code>.',
            ar:'الـ input بتاع كارت المنتج. الصفحة اللي بتعرض الكارت بتحطه بـ <code>[product]</code>.' } },
      { n:'ProductCard', k:'pub', only:['ts'],
        w:{ en:'The card’s class. Whoever shows it lists it in <code>imports</code>.', ar:'كلاس الكارت. أي حد بيعرضه بيكتبه في <code>imports</code>.' } },
      { n:'app-product-card', k:'pub',
        w:{ en:'The card’s selector: the tag the parent types.', ar:'الـ selector بتاع الكارت: التاج اللي الأب بيكتبه.' } },
      { n:'Cart', k:'pub', only:['ts'],
        w:{ en:'The cart component’s class. Whoever shows it lists it in <code>imports</code>.', ar:'كلاس الـ component بتاع الكارت. أي حد بيعرضه بيكتبه في <code>imports</code>.' } },
      { n:'app-cart', k:'pub',
        w:{ en:'The cart’s selector: the tag the parent types.', ar:'الـ selector بتاع الكارت: التاج اللي الأب بيكتبه.' } },

      /* --- yours, private to one file --- */
      { n:'_items', k:'mine',
        w:{ en:'The store’s private, writable signal. Only the store can see it or write to it. The underscore is a habit.',
            ar:'الـ signal الخاصة اللي بتتكتب جوه الـ store. الـ store بس اللي شايفها وبيكتب فيها. والـ underscore عادة.' } },
      { n:'items', k:'mine', not:STORE, re:'(?<![\\w$-])(?<!store\\.)items(?![\\w$-])',
        w:{ en:'The cart component’s own property. It points at the store’s signal, but the name is the component’s choice.',
            ar:'الـ property بتاعة الـ component بتاع الكارت. بتشاور على signal الـ store، بس الاسم اختيار الـ component.' } },
      { n:'cartItems', k:'mine',
        w:{ en:'The same property after a rename, to prove the name is the component’s.', ar:'نفس الـ property بعد ما اتغير اسمها، عشان نثبت إن الاسم بتاع الـ component.' } },
      { n:'cart', k:'mine', re:'(?<=this\\.|readonly )cart(?![\\w$-])',
        w:{ en:'The product card’s private name for the injected <code>CartStore</code>. Any name works.',
            ar:'الاسم الخاص اللي كارت المنتج مدّيه للـ <code>CartStore</code> اللي اتعمله inject. أي اسم ينفع.' } },
      { n:'store', k:'mine', re:'(?<=this\\.|readonly )store(?![\\w$-])',
        w:{ en:'The cart’s private name for the same <code>CartStore</code>. Different name, same instance.',
            ar:'الاسم الخاص اللي الكارت مدّيه لنفس الـ <code>CartStore</code>. اسم مختلف، ونفس النسخة.' } },
      { n:'count', k:'mine', w:{ en:'A computed in the cart, read by its own template.', ar:'computed في الكارت، والتمبلت بتاعه بيقراه.' } },
      { n:'subtotal', k:'mine', w:{ en:'A computed in the cart.', ar:'computed في الكارت.' } },
      { n:'vat', k:'mine', w:{ en:'A computed in the cart.', ar:'computed في الكارت.' } },
      { n:'total', k:'mine', w:{ en:'A computed in the cart, built from other computeds.', ar:'computed في الكارت، مبني من computeds تانية.' } },
      { n:'addToCart', k:'mine', w:{ en:'The product card’s own method, called by its own button.', ar:'ميثود كارت المنتج، والزرار بتاعه هو اللي بيناديها.' } },
      { n:'emptyCart', k:'mine', w:{ en:'The cart’s own method, called by its own button.', ar:'ميثود الكارت، والزرار بتاعه هو اللي بيناديها.' } },
      { n:'item', k:'mine', re:'(?<![\\w$/.-])item(?![\\w$-])',
        w:{ en:'A parameter of <code>add</code>. Call it anything.', ar:'parameter في <code>add</code>. سمّيه أي حاجة.' } },
      { n:'list', k:'mine', w:{ en:'An arrow function’s parameter: the current array.', ar:'الـ parameter بتاع الـ arrow function: الـ array الحالية.' } },
      { n:'sum', k:'mine', w:{ en:'An arrow function’s parameter: the running total.', ar:'الـ parameter بتاع الـ arrow function: المجموع لحد دلوقتي.' } },
      { n:'i', k:'mine',
        w:{ en:'A loop variable in the template, and separately an arrow-function parameter. Both are local.',
            ar:'متغير اللوب في التمبلت، وبرضه parameter في arrow function. الاتنين محليين.' } },

      /* --- Angular's, TypeScript's, JavaScript's, the browser's --- */
      { n:'signal', k:'ng', w:{ en:'Angular’s function that makes a writable signal.', ar:'الـ function بتاعة أنجولار اللي بتعمل signal بتتكتب.' } },
      { n:'computed', k:'ng', w:{ en:'Angular’s function that makes a signal derived from others.', ar:'الـ function بتاعة أنجولار اللي بتعمل signal مشتقة من غيرها.' } },
      { n:'set', k:'ng', w:{ en:'A writable signal’s method: replace the value.', ar:'ميثود الـ signal اللي بتتكتب: بتستبدل القيمة.' } },
      { n:'update', k:'ng', w:{ en:'A writable signal’s method: new value from the old one.', ar:'ميثود الـ signal اللي بتتكتب: قيمة جديدة من القديمة.' } },
      { n:'asReadonly', k:'ng', w:{ en:'A writable signal’s method: a view nobody can write through.', ar:'ميثود الـ signal اللي بتتكتب: نسخة محدش يقدر يكتب من خلالها.' } },
      { n:'inject', k:'ng', w:{ en:'Angular’s function that hands you the shared store.', ar:'الـ function بتاعة أنجولار اللي بتدّيك الـ store المتشارك.' } },
      { n:'input', k:'ng', re:'(?<![\\w$<(-])input(?=[.(<,])', w:{ en:'Angular’s function that creates an input.', ar:'الـ function بتاعة أنجولار اللي بتعمل input.' } },
      { n:'required', k:'ng', w:{ en:'Part of <code>input.required</code>.', ar:'جزء من <code>input.required</code>.' } },
      { n:'@Injectable', k:'ng', w:{ en:'Angular’s decorator for a class the injector can create.', ar:'الـ decorator بتاع أنجولار لكلاس الـ injector يقدر يعمله.' } },
      { n:'providedIn', k:'ng', w:{ en:'An option key Angular reads.', ar:'مفتاح إعداد أنجولار بيقراه.' } },
      { n:'root', k:'ng', w:{ en:'Angular’s fixed value: one instance for the whole app.', ar:'قيمة ثابتة من أنجولار: نسخة واحدة للتطبيق كله.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator.', ar:'الـ decorator بتاع أنجولار.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The string after it is yours.', ar:'مفتاح إعداد. النص اللي بعده بتاعك.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key. The path after it points at your file.', ar:'مفتاح إعداد. المسار اللي بعده بيشاور على ملفك.' } },
      { n:'@for', k:'ng', w:{ en:'Angular’s loop block.', ar:'بلوك اللوب بتاع أنجولار.' } },
      { n:'track', k:'ng', w:{ en:'Part of <code>@for</code>.', ar:'جزء من <code>@for</code>.' } },
      { n:'@if', k:'ng', w:{ en:'Angular’s if block.', ar:'بلوك الـ if بتاع أنجولار.' } },
      { n:'click', k:'ng', w:{ en:'The browser’s event name.', ar:'اسم الـ event بتاع المتصفح.' } },
      { n:'reduce', k:'ng', w:{ en:'JavaScript’s array method.', ar:'ميثود الـ array بتاعة JavaScript.' } },
      { n:'length', k:'ng', w:{ en:'JavaScript’s array property.', ar:'الـ property بتاعة الـ array في JavaScript.' } },
      { n:'push', k:'ng', w:{ en:'JavaScript’s array method. It changes the array in place, which a signal never notices.', ar:'ميثود الـ array بتاعة JavaScript. بتغيّر الـ array في مكانها، والـ signal عمرها ما بتاخد بالها.' } },
      { n:'BehaviorSubject', k:'ng', w:{ en:'RxJS’s class: the older way to hold a value that changes.', ar:'كلاس من RxJS: الطريقة القديمة إنك تشيل قيمة بتتغير.' } },
      { n:'asObservable', k:'ng', w:{ en:'RxJS’s method: the older <code>asReadonly</code>.', ar:'ميثود من RxJS: الـ <code>asReadonly</code> القديمة.' } },
      { n:'next', k:'ng', w:{ en:'RxJS’s method: the older <code>set</code>.', ar:'ميثود من RxJS: الـ <code>set</code> القديمة.' } },
      { n:'value', k:'ng', w:{ en:'<code>BehaviorSubject</code>’s property: the current value.', ar:'الـ property بتاعة <code>BehaviorSubject</code>: القيمة الحالية.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One click, six stops', ar: 'كليك واحدة، ست محطات' },
    lead: {
      en: 'A shop. A product card has an “Add to cart” button, and a cart somewhere else on the page shows how many items you have. The two components never talk to each other. They both talk to one <b>store</b>, and the store keeps the list in a signal. Follow the click:',
      ar: 'محل. كارت المنتج فيه زرار «Add to cart»، وفيه كارت مشتريات في حتة تانية في الصفحة بيعرض معاك كام حاجة. الاتنين components عمرهم ما بيكلموا بعض. الاتنين بيكلموا <b>store</b> واحد، والـ store ده شايل الليستة في signal. امشي ورا الكليك:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'product-card.html', lang: 'html', who: { en: 'card · button', ar: 'الكارت · الزرار' },
          code: ['<button (click)="addToCart()">Add to cart</button>'],
          say: { en: `The user clicks. ${ng('click')} is the browser’s event. ${mine('addToCart')} is the card’s own method; you picked that name and only the card uses it.`,
                 ar: `المستخدم بيدوس. ${ng('click')} event بتاع المتصفح. و${mine('addToCart')} ميثود الكارت نفسه؛ انت اللي اخترت الاسم ومحدش بيستخدمه غير الكارت.` } },
        { file: 'product-card.ts', lang: 'ts', who: { en: 'card · asks the store', ar: 'الكارت · بيطلب من الـ store' },
          code: ['private readonly cart = inject(CartStore);', '', 'addToCart() {', '  this.cart.add(this.product());', '}'],
          say: { en: `${ng('inject')} is Angular’s and hands the card the one shared store. ${pub('CartStore')} must be the store’s real class name. ${mine('cart')} is only the card’s nickname for it. ${pub('add')} is the store’s method, so it must match the store exactly.`,
                 ar: `${ng('inject')} بتاعة أنجولار وبتدّي الكارت الـ store الواحد المتشارك. ${pub('CartStore')} لازم يبقى اسم كلاس الـ store الحقيقي. و${mine('cart')} ده مجرد اسم الدلع اللي الكارت مدّيهوله. و${pub('add')} ميثود الـ store، فلازم تبقى زيها بالظبط.` } },
        { file: 'cart.store.ts', lang: 'ts', who: { en: 'store · writes', ar: 'الـ store · بيكتب' },
          code: ['private readonly _items = signal<Item[]>([]);', '', 'add(item: Item) {', '  this._items.update(list => [...list, item]);', '}'],
          say: { en: `The store owns the box. ${ng('signal')} makes it and ${ng('update')} changes it; both are Angular’s. ${mine('_items')} is private, so nobody outside the store can write to it. ${mine('item')} and ${mine('list')} are parameters: call them anything.`,
                 ar: `الـ store هو صاحب الصندوق. ${ng('signal')} بتعمله و${ng('update')} بتغيّره؛ الاتنين بتوع أنجولار. و${mine('_items')} خاصة، فمحدش برّه الـ store يقدر يكتب فيها. و${mine('item')} و${mine('list')} parameters: سمّيهم أي حاجة.` } },
        { file: 'cart.store.ts', lang: 'ts', who: { en: 'store · shows a read-only face', ar: 'الـ store · بيطلّع وش للقراية بس' },
          code: ['readonly items = this._items.asReadonly();'],
          say: { en: `${ng('asReadonly')} is Angular’s. It gives out a version of the same signal that can be read but not written. ${pub('items')} is the name every reader will type, so it is shared.`,
                 ar: `${ng('asReadonly')} بتاعة أنجولار. بتطلّع نسخة من نفس الـ signal تتقري بس متتكتبش. و${pub('items')} هو الاسم اللي كل اللي بيقروا هيكتبوه، فهو متشارك.` } },
        { file: 'cart.ts', lang: 'ts', who: { en: 'cart · reads', ar: 'الكارت · بيقرا' },
          code: ['private readonly store = inject(CartStore);', 'readonly items = this.store.items;', 'readonly count = computed(() => this.items().length);'],
          say: { en: `The cart injects the <b>same</b> store and calls it ${mine('store')}. Different nickname, same instance. It copies ${pub('items')} into its own property, also called ${mine('items')}; that second name is the cart’s choice. ${ng('computed')} is Angular’s; ${mine('count')} is yours.`,
                 ar: `الكارت بيعمل inject لـ <b>نفس</b> الـ store وبيسمّيه ${mine('store')}. اسم دلع مختلف، ونفس النسخة. وبينسخ ${pub('items')} في property بتاعته، اسمها برضه ${mine('items')}؛ الاسم التاني ده اختيار الكارت. و${ng('computed')} بتاعة أنجولار؛ و${mine('count')} بتاعك.` } },
        { file: 'cart.html', lang: 'html', who: { en: 'cart · shows it', ar: 'الكارت · بيعرضها' },
          code: ['<h2>Cart ({{ count() }})</h2>'],
          say: { en: `The template reads ${mine('count')} by <b>calling</b> it. That call is what registers the template as a reader, so when the store’s list changes, this number redraws by itself.`,
                 ar: `التمبلت بيقرا ${mine('count')} بإنه <b>يناديها</b>. النداية دي هي اللي بتسجّل التمبلت كقارئ، فلما ليستة الـ store تتغير، الرقم ده بيترسم تاني لوحده.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'Card: <code>this.cart.add(product)</code>. Store: <code>_items.update(…)</code>, shown as <code>items</code>. Cart: <code>this.store.items</code>. The names the files share are <b>CartStore</b>, <b>add</b> and <b>items</b>. <code>cart</code> and <code>store</code> are private nicknames for the same thing.',
        ar: 'الكارت: <code>this.cart.add(product)</code>. الـ store: <code>_items.update(…)</code>، وبيعرضها باسم <code>items</code>. كارت المشتريات: <code>this.store.items</code>. الأسماء اللي الملفات متشاركة فيها هي <b>CartStore</b> و<b>add</b> و<b>items</b>. و<code>cart</code> و<code>store</code> أسماء دلع خاصة لنفس الحاجة.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Store or component?', ar: 'الـ store ولا الـ component؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'Every piece has exactly one home. Once you see where each line lives, “where do I put the <code>set</code>?” answers itself.',
      ar: 'كل حتة ليها بيت واحد بس. أول ما تشوف كل سطر عايش فين، سؤال «أحط الـ <code>set</code> فين؟» بيجاوب نفسه.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>private readonly _items = signal&lt;Item[]&gt;([])</code>', '<code>cart.store.ts</code>', 'the store, and <b>only</b> the store', `you pick ${mine('_items')}; ${ng('signal')} is Angular’s`],
            ar: ['<code>private readonly _items = signal&lt;Item[]&gt;([])</code>', '<code>cart.store.ts</code>', 'الـ store، والـ store <b>بس</b>', `انت بتختار ${mine('_items')}؛ و${ng('signal')} بتاعة أنجولار`] },
          { en: ['<code>readonly items = this._items.asReadonly()</code>', '<code>cart.store.ts</code>', 'the store', `you pick ${pub('items')}, and every reader copies it; ${ng('asReadonly')} is Angular’s`],
            ar: ['<code>readonly items = this._items.asReadonly()</code>', '<code>cart.store.ts</code>', 'الـ store', `انت بتختار ${pub('items')}، وكل اللي بيقروا بينسخوه؛ و${ng('asReadonly')} بتاعة أنجولار`] },
          { en: ['<code>add(item: Item) { … }</code>', '<code>cart.store.ts</code>', 'the store', `you pick ${pub('add')}, and every caller copies it`],
            ar: ['<code>add(item: Item) { … }</code>', '<code>cart.store.ts</code>', 'الـ store', `انت بتختار ${pub('add')}، وكل اللي بينادوها بينسخوه`] },
          { en: ['<code>private readonly cart = inject(CartStore)</code>', '<code>product-card.ts</code>', 'the card', `you pick ${mine('cart')}; ${pub('CartStore')} must match the store’s class`],
            ar: ['<code>private readonly cart = inject(CartStore)</code>', '<code>product-card.ts</code>', 'الكارت', `انت بتختار ${mine('cart')}؛ و${pub('CartStore')} لازم يبقى زي كلاس الـ store`] },
          { en: ['<code>private readonly store = inject(CartStore)</code>', '<code>cart.ts</code>', 'the cart', `you pick ${mine('store')}; it can differ from the card’s ${mine('cart')}`],
            ar: ['<code>private readonly store = inject(CartStore)</code>', '<code>cart.ts</code>', 'كارت المشتريات', `انت بتختار ${mine('store')}؛ وينفع يختلف عن ${mine('cart')} بتاع كارت المنتج`] },
          { en: ['<code>readonly count = computed(() =&gt; …)</code>', '<code>cart.ts</code>', 'the cart', `you pick ${mine('count')}; ${ng('computed')} is Angular’s`],
            ar: ['<code>readonly count = computed(() =&gt; …)</code>', '<code>cart.ts</code>', 'كارت المشتريات', `انت بتختار ${mine('count')}؛ و${ng('computed')} بتاعة أنجولار`] },
          { en: ['<code>{{ count() }}</code>', '<code>cart.html</code>', 'the cart', `copies ${mine('count')} from its own class, with <code>()</code>`],
            ar: ['<code>{{ count() }}</code>', '<code>cart.html</code>', 'كارت المشتريات', `بينسخ ${mine('count')} من الكلاس بتاعه، بالقوسين <code>()</code>`] },
        ] },
      { t: 'ul',
        en: ['<b>Only the store writes.</b> The writable signal is <code>private</code>. Everyone else calls a store method like <code>add</code>, and the store does the <code>update</code>.',
             '<b>Reading is a call, writing is a method.</b> <code>items()</code> reads. <code>_items.set(…)</code> and <code>_items.update(…)</code> write, and only on the writable one.',
             '<b>Each component names the store it injected.</b> <code>cart</code> in one, <code>store</code> in the other. The store never knows those names. Only the class name <code>CartStore</code> has to match.'],
        ar: ['<b>الـ store بس هو اللي بيكتب.</b> الـ signal اللي بتتكتب <code>private</code>. أي حد تاني بينادي ميثود في الـ store زي <code>add</code>، والـ store هو اللي بيعمل <code>update</code>.',
             '<b>القراية نداية، والكتابة ميثود.</b> <code>items()</code> بتقرا. و<code>_items.set(…)</code> و<code>_items.update(…)</code> بيكتبوا، وعلى اللي بتتكتب بس.',
             '<b>كل component بيسمّي الـ store اللي عمله inject.</b> <code>cart</code> في واحد، و<code>store</code> في التاني. والـ store عمره ما بيعرف الأسماء دي. اسم الكلاس <code>CartStore</code> بس هو اللي لازم يطابق.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All six files, every name coloured', ar: 'الست ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same example, complete. Hover a coloured name to light up everywhere else it appears. Then press <b>Rename test</b>: every name you own turns into a made-up word, Angular’s words stay put, and the code is still correct.',
      ar: 'نفس المثال، كامل. قف بالماوس على أي اسم ملوّن وهتنوّر كل الأماكن التانية اللي هو فيها. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: كل اسم بتاعك هيبقى كلمة عشوائية، وكلمات أنجولار هتفضل مكانها، والكود لسه صح.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'item.ts', lang: 'ts', tag: { en: 'the data', ar: 'الداتا' }, code: [
        'export interface Item {',
        '  id: string;',
        '  title: string;',
        '  price: number;',
        '}' ] },
      { t: 'code', name: 'cart.store.ts', lang: 'ts', tag: { en: 'the store', ar: 'الـ store' }, code: [
        "import { Injectable, signal } from '@angular/core';",
        "import { Item } from './item';",
        '',
        "@Injectable({ providedIn: 'root' })",
        'export class CartStore {',
        '  private readonly _items = signal<Item[]>([]);   // writable, private',
        '  readonly items = this._items.asReadonly();     // read-only, public',
        '',
        '  add(item: Item) {',
        '    this._items.update(list => [...list, item]);',
        '  }',
        '',
        '  clear() {',
        '    this._items.set([]);',
        '  }',
        '}' ] },
      { t: 'code', name: 'product-card.ts', lang: 'ts', tag: { en: 'writes, through the store', ar: 'بيكتب، عن طريق الـ store' }, code: [
        "import { Component, inject, input } from '@angular/core';",
        "import { CartStore } from './cart.store';",
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
      { t: 'code', name: 'product-card.html', lang: 'html', tag: { en: 'writes', ar: 'بيكتب' }, code: [
        '<h3>{{ product().title }}</h3>',
        '<button (click)="addToCart()">Add to cart</button>' ] },
      { t: 'code', name: 'cart.ts', lang: 'ts', tag: { en: 'reads and derives', ar: 'بيقرا وبيشتق' }, code: [
        "import { Component, computed, inject } from '@angular/core';",
        "import { CartStore } from './cart.store';",
        '',
        '@Component({',
        "  selector: 'app-cart',",
        "  templateUrl: './cart.html',",
        '})',
        'export class Cart {',
        '  private readonly store = inject(CartStore);',
        '  readonly items = this.store.items;',
        '',
        '  readonly count = computed(() => this.items().length);',
        '  readonly subtotal = computed(() => this.items().reduce((sum, i) => sum + i.price, 0));',
        '  readonly vat = computed(() => this.subtotal() * 0.14);',
        '  readonly total = computed(() => this.subtotal() + this.vat());',
        '',
        '  emptyCart() {',
        '    this.store.clear();',
        '  }',
        '}' ] },
      { t: 'code', name: 'cart.html', lang: 'html', tag: { en: 'reads', ar: 'بيقرا' }, code: [
        '<h2>Cart ({{ count() }})</h2>',
        '',
        '@for (i of items(); track i.id) {',
        '  <p>{{ i.title }}: {{ i.price }}</p>',
        '}',
        '',
        '<p>VAT {{ vat() }}</p>',
        '<strong>{{ total() }}</strong>',
        '<button (click)="emptyCart()">Empty</button>' ] },
      { t: 'nmtable' }
    ]
  },

  /* ------------------------------------------------------------ 4 */
  {
    id: 'rename',
    kicker: { en: 'Is it OK to change it?', ar: 'ينفع أغيّره؟' },
    title: { en: 'What breaks when you rename each name', ar: 'إيه اللي بيبوظ لما تغيّر كل اسم' },
    lead: {
      en: 'Every name you own can be renamed. The question is only <b>where else</b> you must follow. With signals the good news is that almost every miss is a compile error, because everything goes through TypeScript and Angular checks templates against the class.',
      ar: 'أي اسم بتاعك ينفع يتغير. السؤال بس <b>فين تاني</b> لازم تغيّر وراه. والخبر الحلو مع الـ signals إن تقريبًا أي حاجة تنساها بتدّيك compile error، عشان كل حاجة بتعدي على TypeScript وأنجولار بيراجع التمبلت على الكلاس.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [pub('CartStore') + ' (the store class)', 'every <code>import</code> and every <code>inject(CartStore)</code>', 'Compile error: the old name no longer exists.'],
            ar: [pub('CartStore') + ' (كلاس الـ store)', 'كل <code>import</code> وكل <code>inject(CartStore)</code>', 'Compile error: الاسم القديم مبقاش موجود.'] },
          { en: [pub('items') + ' (the store’s public signal)', 'every reader: <code>this.store.items</code>', 'Compile error: “Property ‘items’ does not exist on type ‘CartStore’”.'],
            ar: [pub('items') + ' (الـ signal العمومية بتاعة الـ store)', 'كل اللي بيقروها: <code>this.store.items</code>', 'Compile error: «Property ‘items’ does not exist on type ‘CartStore’».'] },
          { en: [pub('add') + ', ' + pub('clear') + ' (store methods)', 'every caller: <code>this.cart.add(…)</code>, <code>this.store.clear()</code>', 'Compile error in the caller.'],
            ar: [pub('add') + ' و' + pub('clear') + ' (ميثودز الـ store)', 'كل اللي بينادوها: <code>this.cart.add(…)</code> و<code>this.store.clear()</code>', 'Compile error عند اللي بينادي.'] },
          { en: [mine('_items') + ' (the private signal)', 'only lines inside the store', 'Compile error inside the store. Nobody else can even see it.'],
            ar: [mine('_items') + ' (الـ signal الخاصة)', 'السطور اللي جوه الـ store بس', 'Compile error جوه الـ store. محدش تاني شايفها أصلًا.'] },
          { en: [mine('cart') + ' or ' + mine('store') + ' (the injected field)', 'only that component’s own <code>this.cart</code> / <code>this.store</code>', 'Compile error inside that component. The other component is not affected.'],
            ar: [mine('cart') + ' أو ' + mine('store') + ' (الـ field اللي فيه الـ inject)', '<code>this.cart</code> / <code>this.store</code> جوه الـ component ده بس', 'Compile error جوه الـ component ده. والـ component التاني مالوش دعوة.'] },
          { en: [`${mine('items')}, ${mine('count')}, ${mine('total')}… (the cart’s own)`, 'the other computeds that read it, and <code>cart.html</code>', 'Compile error in the class or the template.'],
            ar: [`${mine('items')} و${mine('count')} و${mine('total')}… (بتوع الكارت)`, 'الـ computeds التانية اللي بتقراه، و<code>cart.html</code>', 'Compile error في الكلاس أو التمبلت.'] },
          { en: [`${pub('Item')}, ${pub('id')}, ${pub('title')}, ${pub('price')}`, 'every file that imports the type or reads the field', 'Compile error wherever the old name is used.'],
            ar: [`${pub('Item')} و${pub('id')} و${pub('title')} و${pub('price')}`, 'كل ملف بيعمل import للـ type أو بيقرا الـ field', 'Compile error في أي حتة فيها الاسم القديم.'] },
          { en: [pub('product') + ' (the card’s input)', 'the parent’s <code>[product]</code>', 'Compile error: “Can’t bind to ‘product’”.'],
            ar: [pub('product') + ' (الـ input بتاع الكارت)', '<code>[product]</code> عند الأب', 'Compile error: «Can’t bind to ‘product’».'] },
          { en: [`${ng('signal')}, ${ng('computed')}, ${ng('set')}, ${ng('update')}, ${ng('asReadonly')}, ${ng('inject')}`, 'nothing: you cannot rename these', 'They are Angular’s words.'],
            ar: [`${ng('signal')} و${ng('computed')} و${ng('set')} و${ng('update')} و${ng('asReadonly')} و${ng('inject')}`, 'ولا حاجة: دول مينفعش يتغيروا', 'دي كلمات أنجولار.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b> in the bar above the files. Watch the two <code>items</code>: the store’s orange one and the cart’s green one turn into two <b>different</b> words. They were never the same name, they only looked alike.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b> في الشريط اللي فوق الملفات. بص على الـ <code>items</code> الاتنين: البرتقاني بتاع الـ store والأخضر بتاع الكارت هيبقوا كلمتين <b>مختلفتين</b>. عمرهم ما كانوا نفس الاسم، هما بس شبه بعض.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'twins',
    kicker: { en: 'Same spelling, two owners', ar: 'نفس الكتابة، واتنين أصحاب' },
    title: { en: 'Why there are two <code>items</code>', ar: 'ليه فيه اتنين <code>items</code>' },
    lead: {
      en: 'In <code>readonly items = this.store.items;</code> the word appears twice and means two different things. The right one is the store’s. The left one is a new property on the cart, and the cart could call it anything.',
      ar: 'في <code>readonly items = this.store.items;</code> الكلمة ظاهرة مرتين ومعناها حاجتين مختلفتين. اللي على اليمين بتاعة الـ store. واللي على الشمال property جديدة في الكارت، والكارت يقدر يسمّيها أي حاجة.'
    },
    blocks: [
      { t: 'code', name: 'cart.ts · renamed', lang: 'ts', tag: { en: 'the cart picks another name', ar: 'الكارت اختار اسم تاني' }, code: [
        'private readonly store = inject(CartStore);',
        'readonly cartItems = this.store.items;   // left: mine. right: the store’s',
        '',
        'readonly count = computed(() => this.cartItems().length);' ] },
      { t: 'code', name: 'cart.html · renamed', lang: 'html', tag: { en: 'the template follows the cart', ar: 'التمبلت بيمشي ورا الكارت' }, code: [
        '@for (i of cartItems(); track i.id) {',
        '  <p>{{ i.title }}: {{ i.price }}</p>',
        '}' ] },
      { t: 'p',
        en: `Nothing in the store changed. The store still calls it ${pub('items')}. Only the cart’s own name, now ${mine('cartItems')}, moved, and its template followed. Using the same word on both sides is common and fine; just know it is your choice.`,
        ar: `مفيش حاجة في الـ store اتغيرت. الـ store لسه بيسمّيها ${pub('items')}. اسم الكارت بس، اللي بقى ${mine('cartItems')}، هو اللي اتغير، والتمبلت بتاعه مشي وراه. إنك تستخدم نفس الكلمة في الناحيتين حاجة منتشرة ومفيهاش مشكلة؛ بس اعرف إنها اختيارك.` },
      { t: 'note', label: { en: 'Is it a copy?', ar: 'دي نسخة؟' },
        en: '<code>this.store.items</code> without brackets hands over the <b>signal itself</b>, not its current value. The cart’s property and the store’s point at the same box, so the cart always sees the latest list. With brackets, <code>this.store.items()</code>, you would take a one-time snapshot. More on that in the silent mistakes below.',
        ar: '<code>this.store.items</code> من غير أقواس بتدّي <b>الـ signal نفسها</b>، مش قيمتها دلوقتي. فالـ property بتاعة الكارت وبتاعة الـ store بيشاوروا على نفس الصندوق، والكارت دايمًا شايف آخر ليستة. بالأقواس، <code>this.store.items()</code>، هتاخد صورة مرة واحدة وخلاص. هنتكلم عن ده في الغلطات الصامتة تحت.' }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتاعتك' },
    title: { en: 'The fixed names', ar: 'الأسماء الثابتة' },
    lead: {
      en: 'These words belong to Angular, TypeScript or JavaScript. Type them exactly. The brackets <code>()</code> are not a name at all, but they are the part people forget most.',
      ar: 'الكلمات دي بتاعة أنجولار أو TypeScript أو JavaScript. اكتبها زي ما هي بالظبط. والأقواس <code>()</code> مش اسم أصلًا، بس هي أكتر حاجة الناس بتنساها.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Name', 'Whose', 'What it does'], ar: ['الاسم', 'بتاع مين', 'بيعمل إيه'] },
        rows: [
          { en: [ng('signal'), 'Angular', 'Makes a writable box: <code>signal(0)</code>, <code>signal&lt;Item[]&gt;([])</code>.'],
            ar: [ng('signal'), 'أنجولار', 'بتعمل صندوق بيتكتب فيه: <code>signal(0)</code>، <code>signal&lt;Item[]&gt;([])</code>.'] },
          { en: [ng('computed'), 'Angular', 'Makes a read-only box whose value is worked out from other signals.'],
            ar: [ng('computed'), 'أنجولار', 'بتعمل صندوق للقراية بس، قيمته محسوبة من signals تانية.'] },
          { en: [`${ng('set')}, ${ng('update')}`, 'Angular', 'The only two ways to write. They exist only on a writable signal, not on a <code>computed</code> and not on an <code>asReadonly()</code> view.'],
            ar: [`${ng('set')} و${ng('update')}`, 'أنجولار', 'الطريقتين الوحيدتين للكتابة. موجودين بس على signal بتتكتب، مش على <code>computed</code> ومش على نسخة <code>asReadonly()</code>.'] },
          { en: [ng('asReadonly'), 'Angular', 'Gives out the same signal without <code>set</code> and <code>update</code>.'],
            ar: [ng('asReadonly'), 'أنجولار', 'بتطلّع نفس الـ signal من غير <code>set</code> و<code>update</code>.'] },
          { en: [`${ng('inject')}, ${ng('@Injectable')}, ${ng('providedIn')}, ${ng('root')}`, 'Angular', 'How the store is created once and handed to everyone.'],
            ar: [`${ng('inject')} و${ng('@Injectable')} و${ng('providedIn')} و${ng('root')}`, 'أنجولار', 'إزاي الـ store بيتعمل مرة واحدة وبيتسلّم للكل.'] },
          { en: ['<code>private</code>, <code>readonly</code>', 'TypeScript', '<code>private</code> hides <code>_items</code> from other files. <code>readonly</code> stops anyone replacing the signal itself; the value inside can still change.'],
            ar: ['<code>private</code>، <code>readonly</code>', 'TypeScript', '<code>private</code> بتخبّي <code>_items</code> عن الملفات التانية. و<code>readonly</code> بتمنع حد يبدّل الـ signal نفسها؛ لكن القيمة اللي جواها لسه بتتغير.'] },
          { en: [`${ng('reduce')}, ${ng('length')}, ${ng('push')}`, 'JavaScript', 'Plain array tools. <code>push</code> is the dangerous one: see the silent mistakes.'],
            ar: [`${ng('reduce')} و${ng('length')} و${ng('push')}`, 'JavaScript', 'أدوات array عادية. و<code>push</code> هي الخطيرة: شوف الغلطات الصامتة.'] },
          { en: ['<code>()</code> after a signal', 'JavaScript', 'A signal is a function. Calling it reads the value <b>and</b> registers you as a reader.'],
            ar: ['<code>()</code> بعد الـ signal', 'JavaScript', 'الـ signal دي function. لما تناديها بتقرا القيمة <b>و</b>بتسجّلك كقارئ.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'Angular does not care what you call a signal. These habits make the code read well and tell the next person what kind of thing each name is.',
      ar: 'أنجولار مش فارق معاه تسمّي الـ signal إيه. العادات دي بتخلي الكود يتقري كويس، وبتقول للي بعدك كل اسم ده نوعه إيه.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['the private, writable signal', '<code>_items</code>', '<code>items2</code>, <code>itemsSignal</code>', 'The underscore says “private, the real one”. The public view then gets the clean name. It is a habit, not something Angular reads.'],
            ar: ['الـ signal الخاصة اللي بتتكتب', '<code>_items</code>', '<code>items2</code>، <code>itemsSignal</code>', 'الـ underscore بتقول «خاصة، ودي الأصلية». والنسخة العمومية بتاخد الاسم النضيف. دي عادة، مش حاجة أنجولار بيقراها.'] },
          { en: ['a signal', '<code>items</code>, <code>total</code>, <code>count</code>', '<code>itemsSignal</code>, <code>items$</code>', 'Name the value, not the container. A trailing <code>$</code> tells readers “this is an observable”, so it would mislead.'],
            ar: ['signal', '<code>items</code>، <code>total</code>، <code>count</code>', '<code>itemsSignal</code>، <code>items$</code>', 'سمّي القيمة، مش العلبة. والـ <code>$</code> في الآخر بتقول للي بيقرا «ده observable»، فهتضلّله.'] },
          { en: ['a computed', '<code>total</code>, <code>isEmpty</code>', '<code>getTotal</code>, <code>calculateTotal</code>', 'In the template it reads like a value, <code>total()</code>, so name it like one.'],
            ar: ['computed', '<code>total</code>، <code>isEmpty</code>', '<code>getTotal</code>، <code>calculateTotal</code>', 'في التمبلت بتتقري كقيمة، <code>total()</code>، فسمّيها كده.'] },
          { en: ['a true/false signal', '<code>isEmpty</code>, <code>hasDiscount</code>', '<code>empty</code>, <code>flag</code>', '<code>@if (isEmpty())</code> reads like a sentence.'],
            ar: ['signal صح/غلط', '<code>isEmpty</code>، <code>hasDiscount</code>', '<code>empty</code>، <code>flag</code>', '<code>@if (isEmpty())</code> بتتقري زي جملة.'] },
          { en: ['the injected store field', '<code>store</code>, <code>cart</code>, <code>cartStore</code>', 'a name that hides what it is', 'Private to the component. Pick what reads well there.'],
            ar: ['الـ field اللي فيه الـ store', '<code>store</code>، <code>cart</code>، <code>cartStore</code>', 'اسم بيخبّي هو إيه', 'خاص بالـ component. اختار اللي يتقري كويس هناك.'] },
          { en: ['the store class', '<code>CartStore</code>, <code>CartService</code>', '<code>Cart</code> when a component is already called <code>Cart</code>', 'Two classes with one name cannot both be imported into one file without an alias.'],
            ar: ['كلاس الـ store', '<code>CartStore</code>، <code>CartService</code>', '<code>Cart</code> لو فيه component اسمه <code>Cart</code> أصلًا', 'كلاسين بنفس الاسم مينفعش يتعملهم import في ملف واحد من غير alias.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: 'Before signals: <code>BehaviorSubject</code>, same shape', ar: 'قبل الـ signals: <code>BehaviorSubject</code>، ونفس الشكل' },
    lead: {
      en: 'Older stores used RxJS. The pattern is the same: a private writable thing, a public read-only face, and methods. Only Angular’s and RxJS’s words change. Your names stay.',
      ar: 'الـ stores القديمة كانت بتستخدم RxJS. الفكرة نفسها: حاجة خاصة بتتكتب، ووش عمومي للقراية بس، وميثودز. كلمات أنجولار وRxJS بس هي اللي بتتغير. أسماءك زي ما هي.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'cart.store.ts — older style', lang: 'ts', code: [
          'private readonly _items = new BehaviorSubject<Item[]>([]);',
          'readonly items$ = this._items.asObservable();',
          '',
          'add(item: Item) {',
          '  this._items.next([...this._items.value, item]);',
          '}' ] },
        good: { name: 'cart.store.ts — today', lang: 'ts', code: [
          'private readonly _items = signal<Item[]>([]);',
          'readonly items = this._items.asReadonly();',
          '',
          'add(item: Item) {',
          '  this._items.update(list => [...list, item]);',
          '}' ] } },
      { t: 'tbl',
        head: { en: ['Older (RxJS)', 'Today (signals)'], ar: ['القديم (RxJS)', 'النهارده (signals)'] },
        rows: [
          { en: [`${ng('BehaviorSubject')}`, ng('signal')], ar: [`${ng('BehaviorSubject')}`, ng('signal')] },
          { en: [ng('asObservable'), ng('asReadonly')], ar: [ng('asObservable'), ng('asReadonly')] },
          { en: [ng('next'), `${ng('set')} / ${ng('update')}`], ar: [ng('next'), `${ng('set')} / ${ng('update')}`] },
          { en: ['<code>items$ | async</code> in the template', '<code>items()</code> in the template'], ar: ['<code>items$ | async</code> في التمبلت', '<code>items()</code> في التمبلت'] },
        ] },
      { t: 'p',
        en: `The only name you would normally change is ${pub('items$')} to ${pub('items')}: the <code>$</code> is the habit for observables, and a signal is not one.`,
        ar: `الاسم الوحيد اللي عادةً هتغيّره هو ${pub('items$')} لـ ${pub('items')}: الـ <code>$</code> عادة للـ observables، والـ signal مش observable.` }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, and says nothing', ar: 'مش بيعمل حاجة، ومش بيقول حاجة' },
    title: { en: 'Mistakes that fail silently', ar: 'غلطات بتفشل في صمت' },
    lead: {
      en: 'Renames give compile errors. These do not. The code compiles, the page loads, and a number on screen is simply wrong or never moves.',
      ar: 'تغيير الأسماء بيدّي compile errors. دول لأ. الكود بيعمل compile، والصفحة بتفتح، ورقم على الشاشة يا غلط يا مش بيتحرك.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'Forgetting the brackets in <code>@if</code>', ar: 'نسيان القوسين في <code>@if</code>' }, blocks: [
        { t: 'pair',
          bad:  { name: 'cart.html', lang: 'html', code: ['@if (count) {', '  <button (click)="emptyCart()">Empty</button>', '}'] },
          good: { name: 'cart.html', lang: 'html', code: ['@if (count()) {', '  <button (click)="emptyCart()">Empty</button>', '}'] } },
        { t: 'p', en: 'Without brackets you test the signal itself, which is a function, and a function is always “true”. The button shows even when the cart is empty. With brackets you test the number, and <code>0</code> hides it.',
                  ar: 'من غير أقواس انت بتختبر الـ signal نفسها، ودي function، والـ function دايمًا «صح». الزرار هيظهر حتى لو الكارت فاضي. بالأقواس بتختبر الرقم، و<code>0</code> بيخفيه.' }
      ]},
      { t: 'step', n: '2', title: { en: 'Forgetting the brackets in <code>{{ }}</code>', ar: 'نسيان القوسين في <code>{{ }}</code>' }, blocks: [
        { t: 'pair',
          bad:  { name: 'cart.html', lang: 'html', code: ['<strong>{{ total }}</strong>'] },
          good: { name: 'cart.html', lang: 'html', code: ['<strong>{{ total() }}</strong>'] } },
        { t: 'p', en: 'This prints the signal, not the number. It is not a compile error. Recent Angular versions can warn about it at build time, so read your warnings, not only your errors.',
                  ar: 'ده بيطبع الـ signal، مش الرقم. ومش compile error. نسخ أنجولار الجديدة ممكن تحذّرك منه وقت الـ build، فاقرا الـ warnings، مش الـ errors بس.' }
      ]},
      { t: 'step', n: '3', title: { en: 'Changing the array instead of replacing it', ar: 'إنك تعدّل الـ array بدل ما تبدّلها' }, blocks: [
        { t: 'pair',
          bad:  { name: 'cart.store.ts', lang: 'ts', code: ['add(item: Item) {', '  this._items().push(item);', '}'] },
          good: { name: 'cart.store.ts', lang: 'ts', code: ['add(item: Item) {', '  this._items.update(list => [...list, item]);', '}'] } },
        { t: 'p', en: `${ng('push')} changes the array in place. The signal was never told, so ${mine('count')}, ${mine('total')} and everything else that depends on it keep their old answers. Calling <code>set</code> with that same array does not help either: a signal ignores a value that is the same object as before. Always hand it a <b>new</b> array.`,
                  ar: `${ng('push')} بتغيّر الـ array في مكانها. والـ signal محدش قالها، فـ ${mine('count')} و${mine('total')} وأي حاجة معتمدة عليها بتفضل على إجابتها القديمة. وإنك تنادي <code>set</code> بنفس الـ array مش هيفيد برضه: الـ signal بتتجاهل قيمة هي نفس الـ object اللي كان قبلها. ادّيها دايمًا array <b>جديدة</b>.` }
      ]},
      { t: 'step', n: '4', title: { en: 'Taking a snapshot instead of a computed', ar: 'إنك تاخد صورة بدل computed' }, blocks: [
        { t: 'pair',
          bad:  { name: 'cart.ts', lang: 'ts', code: ['readonly count = this.items().length;'] },
          good: { name: 'cart.ts', lang: 'ts', code: ['readonly count = computed(() => this.items().length);'] } },
        { t: 'p', en: `The first line runs once, when the cart is created, while the list is still empty. ${mine('count')} is the plain number <code>0</code> forever. Wrapped in ${ng('computed')}, the same expression runs again whenever the list changes.`,
                  ar: `السطر الأول بيتنفّذ مرة واحدة، لما الكارت بيتعمل، والليستة لسه فاضية. ${mine('count')} هيبقى الرقم <code>0</code> على طول. لما تلفّه في ${ng('computed')}، نفس الكلام بيتنفّذ تاني كل ما الليستة تتغير.` }
      ]},
      { t: 'step', n: '5', title: { en: 'Two stores when you wanted one', ar: 'اتنين stores وانت عايز واحد' }, blocks: [
        { t: 'pair',
          bad:  { name: 'cart.ts — with providers', lang: 'ts', code: ['@Component({', "  selector: 'app-cart',", '  providers: [CartStore],', '})'] },
          good: { name: 'cart.ts — without', lang: 'ts', code: ['@Component({', "  selector: 'app-cart',", '', '})'] } },
        { t: 'p', en: 'Listing the store in a component’s <code>providers</code> gives that component its <b>own</b> new store. The card adds to the app-wide one; the cart reads its private one, which stays empty. No error. Leave <code>providers</code> out and let <code>providedIn: \'root\'</code> give everyone the same instance.',
                  ar: 'لما تكتب الـ store في <code>providers</code> بتاعة component، الـ component ده بياخد store <b>جديد لوحده</b>. كارت المنتج بيضيف في اللي على مستوى التطبيق؛ وكارت المشتريات بيقرا من اللي خاص بيه، واللي بيفضل فاضي. من غير أي error. شيل <code>providers</code> وسيب <code>providedIn: \'root\'</code> تدّي الكل نفس النسخة.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it does nothing', ar: 'لما مايعملش حاجة' },
    title: { en: 'Five questions, in this order', ar: 'خمس أسئلة، بالترتيب ده' },
    lead: {
      en: 'The number on screen does not change. Ask these before anything else.',
      ar: 'الرقم اللي على الشاشة مش بيتغير. اسأل الأسئلة دي قبل أي حاجة.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Does every signal in the template have its brackets: <code>count()</code>, not <code>count</code>?',
                  ar: '<b>1.</b> كل signal في التمبلت ليها أقواسها: <code>count()</code>، مش <code>count</code>؟' },
      { t: 'chk', en: '<b>2.</b> Does the write go through <code>set</code> or <code>update</code>, with a <b>new</b> array or object, not <code>push</code>?',
                  ar: '<b>2.</b> الكتابة بتعدي على <code>set</code> أو <code>update</code>، بـ array أو object <b>جديد</b>، مش <code>push</code>؟' },
      { t: 'chk', en: '<b>3.</b> Is the derived value a <code>computed(() =&gt; …)</code>, or a snapshot taken once in a field?',
                  ar: '<b>3.</b> القيمة المشتقة دي <code>computed(() =&gt; …)</code>، ولا صورة اتاخدت مرة واحدة في field؟' },
      { t: 'chk', en: '<b>4.</b> Do the writer and the reader inject the <b>same</b> instance? Look for a stray <code>providers: [CartStore]</code>.',
                  ar: '<b>4.</b> اللي بيكتب واللي بيقرا بيعملوا inject لـ <b>نفس</b> النسخة؟ دوّر على <code>providers: [CartStore]</code> متنسية في حتة.' },
      { t: 'chk', en: '<b>5.</b> Does the reader hold the signal, <code>this.store.items</code>, rather than its value, <code>this.store.items()</code>, stored once?',
                  ar: '<b>5.</b> اللي بيقرا ماسك الـ signal، <code>this.store.items</code>، مش قيمتها، <code>this.store.items()</code>، متخزنة مرة واحدة؟' }
    ]
  }
  ]
};
