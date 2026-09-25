/* ==================================================================
   Bindings, name by name — the deep dive after "Property, attribute,
   event and two-way binding". One running example (a search box with a
   star rating) followed through every binding, every name coloured by
   who owns it. Model: content/deep/inputs-outputs.mjs.
   ================================================================== */

/* a name in running text, coloured like the code and linked on hover */
const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

const SR = 'search.ts', SRH = 'search.html', RT = 'rating.ts', SHOP = 'shop-page.html',
      TWO = 'what [(stars)] becomes', OLDR = 'rating.ts — older style', NOWR = 'rating.ts — today';

export default {
  topic: 'data-binding',
  tab: 'Bindings, name by name — The Angular Signal',
  title: { en: '<code>[ ]</code> and <code>( )</code>, name by name', ar: '<code>[ ]</code> و<code>( )</code>، اسم اسم' },
  say: {
    en: 'The page for when you cannot tell whose name goes inside the brackets and whose goes inside the quotes. One search box followed through every kind of binding, every name coloured: <b>Angular’s</b>, <b>the browser’s</b>, <b>yours</b>, or <b>yours but shared</b>. Then what breaks when you rename each one.',
    ar: 'الصفحة دي للي مش عارف اسم مين بيتكتب جوه الأقواس واسم مين جوه علامات التنصيص. خانة بحث واحدة ماشيين وراها في كل أنواع الـ binding، وكل اسم ملوّن: <b>بتاع أنجولار</b>، ولا <b>بتاع المتصفح</b>، ولا <b>بتاعك</b>، ولا <b>بتاعك بس متشارك</b>. وبعدين إيه اللي بيبوظ لما تغيّر كل واحد.'
  },
  lead: {
    en: 'The idea is simple: <b><code>[ ]</code> sends a value in, <code>( )</code> sends an event out, <code>[( )]</code> does both.</b> The confusing part is the names. In <code>[value]="term()"</code> the two words have different owners, and in <code>[(stars)]="minStars"</code> one of them lives in another component. Once you can read every binding as <b>target = source</b>, and say who owns each side, bindings stop being guesswork. This page shows exactly that.',
    ar: 'الفكرة بسيطة: <b><code>[ ]</code> بتدخّل قيمة، و<code>( )</code> بتطلّع event، و<code>[( )]</code> بتعمل الاتنين.</b> اللي بيلخبط هو الأسماء. في <code>[value]="term()"</code> الكلمتين ليهم أصحاب مختلفين، وفي <code>[(stars)]="minStars"</code> واحدة منهم عايشة في component تاني. أول ما تعرف تقرا أي binding كـ <b>الهدف = المصدر</b>، وتقول مين صاحب كل ناحية، الـ bindings بتبطل تبقى تخمين. الصفحة دي بتوريك ده بالظبط.'
  },

  names: {
    note: {
      en: 'Read every binding as <b>target = source</b>. The target (inside <code>[ ]</code> or <code>( )</code>) belongs to whoever owns the element: the browser for <code>&lt;input&gt;</code> and <code>&lt;button&gt;</code> (blue), your other component for <code>&lt;app-rating&gt;</code> (orange). The source (inside the quotes) is your own component’s name (green).',
      ar: 'اقرا أي binding كده: <b>الهدف = المصدر</b>. الهدف (جوه <code>[ ]</code> أو <code>( )</code>) بتاع اللي يملك العنصر: المتصفح في <code>&lt;input&gt;</code> و<code>&lt;button&gt;</code> (أزرق)، والـ component التاني بتاعك في <code>&lt;app-rating&gt;</code> (برتقاني). والمصدر (جوه علامات التنصيص) اسم من الـ component بتاعك (أخضر).'
    },
    names: [
      /* --- shared: two components must agree --- */
      { n:'stars', k:'pub', as:'apricot',
        w:{ en:'The rating’s <code>model()</code>. The rating declares it; the search types it inside <code>[( )]</code>. Rename both sides.',
            ar:'الـ <code>model()</code> بتاع الـ rating. الـ rating بيعلنه؛ والـ search بيكتبه جوه <code>[( )]</code>. غيّر الناحيتين.' } },
      { n:'starsChange', k:'pub', as:'apricotChange',
        w:{ en:'The matching output. The <code>Change</code> ending is Angular’s rule; the part before it must equal the input’s name. <code>model()</code> creates it for you.',
            ar:'الـ output اللي معاه. النهاية <code>Change</code> قاعدة من أنجولار؛ والجزء اللي قبلها لازم يبقى زي اسم الـ input بالظبط. و<code>model()</code> بيعمله لك.' } },
      { n:'app-rating', k:'pub',
        w:{ en:'The rating’s selector. Its <code>selector</code> string and the tag in the search template must match.',
            ar:'الـ selector بتاع الـ rating. النص في <code>selector</code> والتاج في تمبلت الـ search لازم يبقوا زي بعض.' } },
      { n:'Rating', k:'pub',
        w:{ en:'The rating’s class. The search lists it in <code>imports</code>.', ar:'كلاس الـ rating. الـ search بيحطه في <code>imports</code>.' } },
      { n:'section', k:'pub',
        w:{ en:'The search’s input. The shop page sets it with <code>section="books"</code>.', ar:'الـ input بتاع الـ search. صفحة المحل بتحطه بـ <code>section="books"</code>.' } },
      { n:'app-search', k:'pub',
        w:{ en:'The search’s selector, typed as a tag by the shop page.', ar:'الـ selector بتاع الـ search، وصفحة المحل بتكتبه كتاج.' } },
      { n:'Search', k:'pub', only:['ts'],
        w:{ en:'The search’s class. Whoever shows it imports it by this name.', ar:'كلاس الـ search. أي حد بيعرضه بيعمله import بالاسم ده.' } },

      /* --- yours, private to one component --- */
      { n:'term', k:'mine', re:'(?<![\\w$.-])(?<!\\svalue=")term(?![\\w$-])',
        w:{ en:'The search’s own signal: what is typed. In <code>value="term()"</code> (no brackets) it is not coloured, because there it is just text.',
            ar:'الـ signal بتاعة الـ search: اللي اتكتب. في <code>value="term()"</code> (من غير أقواس) مش ملوّنة، عشان هناك هي مجرد كلام.' } },
      { n:'minStars', k:'mine',
        w:{ en:'The search’s own signal, kept in sync with the rating by <code>[( )]</code>.', ar:'الـ signal بتاعة الـ search، و<code>[( )]</code> بتخليها متزامنة مع الـ rating.' } },
      { n:'busy', k:'mine', w:{ en:'The search’s own signal.', ar:'الـ signal بتاعة الـ search.' } },
      { n:'canSubmit', k:'mine', w:{ en:'A computed in the search.', ar:'computed في الـ search.' } },
      { n:'search', k:'mine', re:'(?<![\\w$./-])search(?![\\w$-])',
        w:{ en:'The search’s own method, called by the button and by Enter.', ar:'الميثود بتاعة الـ search، والزرار وزرار Enter بينادوها.' } },
      { n:'n', k:'mine', only:[RT, OLDR, NOWR], re:'(?<![\\w$.-])n(?![\\w$-])',
        w:{ en:'The rating’s loop variable, and separately a method parameter. Both local.', ar:'متغير اللوب بتاع الـ rating، ولوحده parameter في ميثود. الاتنين محليين.' } },
      { n:'on', k:'mine', only:[RT],
        w:{ en:'A CSS class name. The template’s <code>[class.on]</code> and the style <code>.on</code> must agree, and nothing checks that.',
            ar:'اسم CSS class. <code>[class.on]</code> في التمبلت و<code>.on</code> في الاستايل لازم يتفقوا، ومفيش حاجة بتتأكد.' } },
      { n:'rate', k:'mine', w:{ en:'The rating’s own method.', ar:'الميثود بتاعة الـ rating.' } },

      /* --- Angular's --- */
      { n:'attr', k:'ng', re:'(?<![\\w$-])attr(?=\\.)',
        w:{ en:'Angular’s prefix: bind an HTML attribute instead of a DOM property.', ar:'البادئة بتاعة أنجولار: اربط attribute في الـ HTML بدل property في الـ DOM.' } },
      { n:'class', k:'ng', re:'(?<![\\w$-])class(?=\\.)',
        w:{ en:'Angular’s prefix: add or remove one CSS class. The class name after the dot is yours.', ar:'البادئة بتاعة أنجولار: ضيف أو شيل CSS class واحد. اسم الـ class اللي بعد النقطة بتاعك.' } },
      { n:'$event', k:'ng',
        w:{ en:'Angular’s fixed name, only inside <code>( )="…"</code>, for whatever the event carried.', ar:'اسم ثابت من أنجولار، جوه <code>( )="…"</code> بس، لأي حاجة الـ event جايبها معاه.' } },
      { n:'$any', k:'ng',
        w:{ en:'Angular’s template helper that switches off type checking for one value.', ar:'مساعد في التمبلت من أنجولار بيقفل الـ type checking لقيمة واحدة.' } },
      { n:'keydown.enter', k:'ng',
        w:{ en:'The browser’s <code>keydown</code> event plus Angular’s key filter: only the Enter key.', ar:'الـ event <code>keydown</code> بتاع المتصفح زائد فلتر أنجولار للزراير: زرار Enter بس.' } },
      { n:'model', k:'ng',
        w:{ en:'Angular’s input and <code>…Change</code> output in one, for two-way binding.', ar:'الـ input والـ output <code>…Change</code> في واحدة، من أنجولار، للـ two-way binding.' } },
      { n:'input()', k:'ng', only:['ts'], re:'(?<![\\w$<(-])input(?=\\()',
        w:{ en:'Angular’s function that creates an input. Same spelling as the <code>(input)</code> event, completely different thing.', ar:'الـ function بتاعة أنجولار اللي بتعمل input. نفس كتابة الـ event <code>(input)</code>، بس حاجة تانية خالص.' } },
      { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
      { n:'computed', k:'ng', w:{ en:'Angular’s derived signal.', ar:'الـ signal المشتقة بتاعة أنجولار.' } },
      { n:'set', k:'ng', w:{ en:'A signal method: replace the value.', ar:'ميثود بتاعة الـ signal: بتستبدل القيمة.' } },
      { n:'@if', k:'ng', w:{ en:'Angular’s if block.', ar:'بلوك الـ if بتاع أنجولار.' } },
      { n:'@for', k:'ng', w:{ en:'Angular’s loop block.', ar:'بلوك اللوب بتاع أنجولار.' } },
      { n:'track', k:'ng', w:{ en:'Part of <code>@for</code>.', ar:'جزء من <code>@for</code>.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator.', ar:'الـ decorator بتاع أنجولار.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The tag after it is yours.', ar:'مفتاح إعداد. التاج اللي بعده بتاعك.' } },
      { n:'imports', k:'ng', w:{ en:'An option key: what this template may use.', ar:'مفتاح إعداد: الحاجات اللي التمبلت ده مسموح له يستخدمها.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key: the template file.', ar:'مفتاح إعداد: ملف التمبلت.' } },
      { n:'template', k:'ng', re:'(?<![\\w$-])template(?=:)', w:{ en:'An option key: the template written inline.', ar:'مفتاح إعداد: التمبلت مكتوب في نفس الملف.' } },
      { n:'styles', k:'ng', re:'(?<![\\w$-])styles(?=:)', w:{ en:'An option key: the CSS written inline.', ar:'مفتاح إعداد: الـ CSS مكتوب في نفس الملف.' } },
      { n:'@Input', k:'ng', w:{ en:'The older input decorator.', ar:'الـ decorator القديم بتاع الـ input.' } },
      { n:'@Output', k:'ng', w:{ en:'The older output decorator.', ar:'الـ decorator القديم بتاع الـ output.' } },
      { n:'EventEmitter', k:'ng', w:{ en:'The older output class.', ar:'كلاس الـ output القديم.' } },
      { n:'emit', k:'ng', w:{ en:'The method that fires an output.', ar:'الميثود اللي بتطلّع الـ output.' } },

      /* --- the browser's --- */
      { n:'value', k:'ng', not:[SHOP],
        w:{ en:'The DOM property of an <code>&lt;input&gt;</code>: the text in the box. The browser owns the name.', ar:'الـ property بتاعة الـ <code>&lt;input&gt;</code> في الـ DOM: الكلام اللي في الخانة. الاسم بتاع المتصفح.' } },
      { n:'input', k:'ng', re:'(?<=\\()input(?=\\))',
        w:{ en:'Here, the browser’s event that fires on every keystroke. Not Angular’s <code>input()</code> function.', ar:'هنا ده الـ event بتاع المتصفح اللي بيشتغل مع كل حرف. مش الـ function <code>input()</code> بتاعة أنجولار.' } },
      { n:'target', k:'ng',
        w:{ en:'The DOM event’s property: the element the event happened on.', ar:'property في الـ event بتاع الـ DOM: العنصر اللي الـ event حصل عليه.' } },
      { n:'disabled', k:'ng',
        w:{ en:'The DOM property of a <code>&lt;button&gt;</code>. The browser owns the name.', ar:'الـ property بتاعة الـ <code>&lt;button&gt;</code> في الـ DOM. الاسم بتاع المتصفح.' } },
      { n:'click', k:'ng', w:{ en:'The browser’s event name.', ar:'اسم الـ event بتاع المتصفح.' } },
      { n:'aria-label', k:'ng',
        w:{ en:'An HTML attribute name, read by screen readers. The browser owns it.', ar:'اسم attribute في الـ HTML، بتقراه برامج قراءة الشاشة. بتاع المتصفح.' } },
      { n:'colSpan', k:'ng',
        w:{ en:'The DOM property of a table cell. Note the capital S.', ar:'الـ property بتاعة خلية الجدول في الـ DOM. خد بالك من الـ S الكابيتال.' } },
      { n:'colspan', k:'ng',
        w:{ en:'The HTML attribute of a table cell. All lowercase, and only reachable with <code>attr.</code>.', ar:'الـ attribute بتاعة خلية الجدول في الـ HTML. كلها حروف صغيرة، وبتوصلها بـ <code>attr.</code> بس.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One keystroke, six stops', ar: 'حرف واحد، ست محطات' },
    lead: {
      en: 'A search box with a minimum-star filter. You type a letter; the box, the Go button and the rating all stay in step with one signal. Follow the value:',
      ar: 'خانة بحث وفلتر لأقل عدد نجوم. بتكتب حرف؛ والخانة وزرار Go والـ rating كلهم بيفضلوا ماشيين مع signal واحدة. امشي ورا القيمة:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: SR, lang: 'ts', who: { en: 'the source', ar: 'المصدر' },
          code: ["protected readonly term = signal('');"],
          say: { en: `Everything starts with ${mine('term')}, a name you picked in your class. Every binding below uses it on the <b>right-hand side</b>, inside the quotes.`,
                 ar: `كل حاجة بتبدأ من ${mine('term')}، اسم انت اخترته في الكلاس بتاعك. وكل binding تحت بيستخدمه في <b>الناحية اليمين</b>، جوه علامات التنصيص.` } },
        { file: SRH, lang: 'html', who: { en: 'in · [ ]', ar: 'لجوه · [ ]' },
          code: ['<input [value]="term()">'],
          say: { en: `Square brackets send the value <b>in</b>. The left side, ${ng('value')}, is the input element’s DOM property: the browser owns that name. The right side is yours.`,
                 ar: `الأقواس المربعة بتدخّل القيمة <b>لجوه</b>. الناحية الشمال، ${ng('value')}، هي الـ property بتاعة عنصر الـ input في الـ DOM: الاسم ده بتاع المتصفح. والناحية اليمين بتاعتك.` } },
        { file: SRH, lang: 'html', who: { en: 'out · ( )', ar: 'لبرّه · ( )' },
          code: ['<input (input)="term.set($any($event.target).value)">'],
          say: { en: `Round brackets listen. ${ng('input')} here is the browser’s event, fired on every keystroke. ${ng('$event')} is Angular’s name for that event; ${ng('target')} and ${ng('value')} are the browser’s. ${ng('$any')} tells the type checker “trust me”. Only ${mine('term')} is yours.`,
                 ar: `الأقواس المدورة بتسمع. ${ng('input')} هنا الـ event بتاع المتصفح، بيشتغل مع كل حرف. و${ng('$event')} اسم أنجولار للـ event ده؛ و${ng('target')} و${ng('value')} بتوع المتصفح. و${ng('$any')} بتقول للـ type checker «ثق فيّا». و${mine('term')} بس هو بتاعك.` } },
        { file: SRH, lang: 'html', who: { en: 'in · reacts', ar: 'لجوه · بيتفاعل' },
          code: ['<button [disabled]="!canSubmit()" (click)="search()">Go</button>'],
          say: { en: `One button, one value in, one event out. ${ng('disabled')} and ${ng('click')} are the browser’s. ${mine('canSubmit')} and ${mine('search')} are yours. When ${mine('term')} changes, ${mine('canSubmit')} changes, and the button follows.`,
                 ar: `زرار واحد، قيمة داخلة وevent طالع. ${ng('disabled')} و${ng('click')} بتوع المتصفح. و${mine('canSubmit')} و${mine('search')} بتوعك. لما ${mine('term')} تتغير، ${mine('canSubmit')} بتتغير، والزرار بيمشي وراها.` } },
        { file: SRH, lang: 'html', who: { en: 'both · [( )]', ar: 'الاتنين · [( )]' },
          code: ['<app-rating [(stars)]="minStars" />'],
          say: { en: `On <b>your</b> component’s tag the target is not the browser’s any more. ${pub('stars')} belongs to the rating component, so the two files must agree on it. ${mine('minStars')} is the search’s own signal, written <b>without</b> brackets because the binding writes back into it.`,
                 ar: `على تاج الـ component <b>بتاعك</b> الهدف مبقاش بتاع المتصفح. ${pub('stars')} بتاع الـ rating component، فالملفين لازم يتفقوا عليه. و${mine('minStars')} الـ signal بتاعة الـ search، ومكتوبة <b>من غير</b> قوسين عشان الـ binding بيكتب فيها تاني.` } },
        { file: RT, lang: 'ts', who: { en: 'the other side', ar: 'الناحية التانية' },
          code: ['readonly stars = model(0);'],
          say: { en: `Here ${pub('stars')} is declared. ${ng('model')} is Angular’s: it creates an input called ${pub('stars')} <b>and</b> an output called ${pub('starsChange')}, which is exactly the pair <code>[( )]</code> needs.`,
                 ar: `هنا ${pub('stars')} بيتعلن. و${ng('model')} بتاعة أنجولار: بتعمل input اسمه ${pub('stars')} <b>و</b>output اسمه ${pub('starsChange')}، ودول بالظبط الاتنين اللي <code>[( )]</code> محتاجهم.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: '<code>[target]="source"</code> and <code>(target)="statement"</code>. The <b>target</b> is named by whoever owns the element: the browser for HTML tags, your other component for your tags. The <b>source</b> is always named by you.',
        ar: '<code>[target]="source"</code> و<code>(target)="statement"</code>. الـ <b>target</b> بيسمّيه اللي يملك العنصر: المتصفح في تاجات HTML، والـ component التاني بتاعك في التاجات بتاعتك. والـ <b>source</b> دايمًا انت اللي بتسمّيه.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Left or right?', ar: 'شمال ولا يمين؟' },
    title: { en: 'Who owns each side of a binding', ar: 'مين صاحب كل ناحية في الـ binding' },
    lead: {
      en: 'Every binding has two names in it. Most confusion comes from assuming both are yours.',
      ar: 'كل binding فيه اسمين. وأغلب اللخبطة جاية من إنك تفتكر الاتنين بتوعك.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Binding', 'Target (left) is named by', 'Source (right) is named by', 'Direction'],
                ar: ['الـ binding', 'الهدف (شمال) اسمه من', 'المصدر (يمين) اسمه من', 'الاتجاه'] },
        rows: [
          { en: ['<code>[value]="term()"</code>', `the browser: ${ng('value')}`, `you: ${mine('term')}`, 'in'],
            ar: ['<code>[value]="term()"</code>', `المتصفح: ${ng('value')}`, `انت: ${mine('term')}`, 'لجوه'] },
          { en: ['<code>[attr.aria-label]="…"</code>', `Angular’s ${ng('attr')} + HTML’s ${ng('aria-label')}`, `you: ${pub('section')}`, 'in'],
            ar: ['<code>[attr.aria-label]="…"</code>', `${ng('attr')} بتاعة أنجولار + ${ng('aria-label')} بتاعة HTML`, `انت: ${pub('section')}`, 'لجوه'] },
          { en: ['<code>(input)="term.set(…)"</code>', `the browser: ${ng('input')}`, `you: ${mine('term')}; plus ${ng('$event')}, ${ng('target')}, ${ng('value')}`, 'out'],
            ar: ['<code>(input)="term.set(…)"</code>', `المتصفح: ${ng('input')}`, `انت: ${mine('term')}؛ زائد ${ng('$event')} و${ng('target')} و${ng('value')}`, 'لبرّه'] },
          { en: ['<code>(click)="search()"</code>', `the browser: ${ng('click')}`, `you: ${mine('search')}`, 'out'],
            ar: ['<code>(click)="search()"</code>', `المتصفح: ${ng('click')}`, `انت: ${mine('search')}`, 'لبرّه'] },
          { en: ['<code>[(stars)]="minStars"</code>', `your rating component: ${pub('stars')}`, `you: ${mine('minStars')}`, 'both'],
            ar: ['<code>[(stars)]="minStars"</code>', `الـ rating component بتاعك: ${pub('stars')}`, `انت: ${mine('minStars')}`, 'الاتنين'] },
          { en: ['<code>section="books"</code> (no brackets)', `your search component: ${pub('section')}`, 'nobody: <code>books</code> is plain text', 'in, once'],
            ar: ['<code>section="books"</code> (من غير أقواس)', `الـ search component بتاعك: ${pub('section')}`, 'محدش: <code>books</code> كلام عادي', 'لجوه، مرة واحدة'] },
        ] },
      { t: 'ul',
        en: ['<b>On an HTML tag, the target is looked up, never invented.</b> <code>value</code>, <code>disabled</code>, <code>click</code>, <code>input</code> come from the browser. If you are unsure, look the element up on MDN.',
             '<b>On your own component’s tag, the target is that component’s input or output.</b> It is yours, but shared: the child declares it, the parent types it. That is the only orange name in a binding.',
             '<b>Brackets decide whether the quotes are code.</b> <code>[x]="term()"</code> runs <code>term()</code>. <code>x="term()"</code> is the text “term()”. <code>( )</code> quotes are always code: a statement that runs when the event fires.'],
        ar: ['<b>على تاج HTML، الهدف بتدوّر عليه، عمرك ما بتألفه.</b> <code>value</code> و<code>disabled</code> و<code>click</code> و<code>input</code> جايين من المتصفح. لو مش متأكد، دوّر على العنصر في MDN.',
             '<b>على تاج الـ component بتاعك، الهدف هو الـ input أو الـ output بتاع الـ component ده.</b> هو بتاعك، بس متشارك: الابن بيعلنه والأب بيكتبه. ودي الأسماء البرتقاني الوحيدة في الـ binding.',
             '<b>الأقواس هي اللي بتقرر علامات التنصيص كود ولا لأ.</b> <code>[x]="term()"</code> بتشغّل <code>term()</code>. و<code>x="term()"</code> هي الكلام «term()». وعلامات <code>( )</code> دايمًا كود: أمر بيشتغل لما الـ event يحصل.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All four files, every name coloured', ar: 'الأربع ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same search box, complete, with every kind of binding. Hover a coloured name to light up everywhere else it appears. Then press <b>Rename test</b>: every name you own turns into a made-up word, the browser’s and Angular’s words stay put, and the code still works.',
      ar: 'نفس خانة البحث، كاملة، وفيها كل أنواع الـ binding. قف بالماوس على أي اسم ملوّن وهتنوّر كل الأماكن التانية اللي هو فيها. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: كل اسم بتاعك هيبقى كلمة عشوائية، وكلمات المتصفح وأنجولار هتفضل مكانها، والكود لسه شغال.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: SR, lang: 'ts', tag: { en: 'the search', ar: 'الـ search' }, code: [
        "import { Component, computed, input, signal } from '@angular/core';",
        "import { Rating } from './rating';",
        '',
        '@Component({',
        "  selector: 'app-search',",
        '  imports: [Rating],',
        "  templateUrl: './search.html',",
        '})',
        'export class Search {',
        "  readonly section = input('products');",
        '',
        "  protected readonly term = signal('');",
        '  protected readonly minStars = signal(3);',
        '  protected readonly busy = signal(false);',
        '  protected readonly canSubmit = computed(() => this.term().trim().length > 1 && !this.busy());',
        '',
        '  protected search() {',
        '    this.busy.set(true);   // a real app would call a service here',
        '  }',
        '}' ] },
      { t: 'code', name: SRH, lang: 'html', tag: { en: 'the search', ar: 'الـ search' }, code: [
        '<input',
        '  [value]="term()"',
        '  (input)="term.set($any($event.target).value)"',
        '  (keydown.enter)="search()"',
        "  [attr.aria-label]=\"'Find ' + section()\">",
        '',
        '<app-rating [(stars)]="minStars" />',
        '',
        '<button [disabled]="!canSubmit()" (click)="search()">Go</button>',
        '',
        '@if (term()) {',
        "  <button (click)=\"term.set('')\" aria-label=\"Clear\">×</button>",
        '}' ] },
      { t: 'code', name: RT, lang: 'ts', tag: { en: 'the rating', ar: 'الـ rating' }, code: [
        "import { Component, model } from '@angular/core';",
        '',
        '@Component({',
        "  selector: 'app-rating',",
        '  template: `',
        '    @for (n of [1, 2, 3, 4, 5]; track n) {',
        '      <button (click)="stars.set(n)" [class.on]="n <= stars()">★</button>',
        '    }',
        '  `,',
        '  styles: `.on { color: gold; }`,',
        '})',
        'export class Rating {',
        '  readonly stars = model(0);',
        '}' ] },
      { t: 'code', name: SHOP, lang: 'html', tag: { en: 'whoever shows the search', ar: 'اللي بيعرض الـ search' }, code: [
        '<app-search section="books" />' ] },
      { t: 'nmtable' }
    ]
  },

  /* ------------------------------------------------------------ 4 */
  {
    id: 'rename',
    kicker: { en: 'Is it OK to change it?', ar: 'ينفع أغيّره؟' },
    title: { en: 'What breaks when you rename each name', ar: 'إيه اللي بيبوظ لما تغيّر كل اسم' },
    lead: {
      en: 'The right-hand names are checked against your class: a miss is a compile error. The left-hand names are only partly checked. Properties are checked; events, attributes and plain text are not.',
      ar: 'أسماء الناحية اليمين بتتراجع على الكلاس بتاعك: أي حاجة ناقصة compile error. أما أسماء الناحية الشمال فبتتراجع جزئيًا بس. الـ properties بتتراجع؛ لكن الـ events والـ attributes والكلام العادي لأ.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [`${mine('term')}, ${mine('minStars')}, ${mine('canSubmit')}, ${mine('search')}`, 'every use in <code>search.html</code>', 'Compile error in the template.'],
            ar: [`${mine('term')} و${mine('minStars')} و${mine('canSubmit')} و${mine('search')}`, 'كل استخدام في <code>search.html</code>', 'Compile error في التمبلت.'] },
          { en: [pub('stars') + ' (a <code>model()</code>)', '<code>[(stars)]</code> in the search template', 'Compile error: <i>Can’t bind to \'stars\'…</i>'],
            ar: [pub('stars') + ' (<code>model()</code>)', '<code>[(stars)]</code> في تمبلت الـ search', 'Compile error: <i>Can’t bind to \'stars\'…</i>'] },
          { en: [pub('starsChange') + ' (hand-written output)', 'rename it together with the input, as <i>name</i> + <code>Change</code>', '<b>No error.</b> <code>[(stars)]</code> still sets the rating, but choosing stars never updates <code>minStars</code>.'],
            ar: [pub('starsChange') + ' (output مكتوب بالإيد)', 'غيّره مع الـ input، كـ <i>الاسم</i> + <code>Change</code>', '<b>مفيش error.</b> <code>[(stars)]</code> لسه بتحط القيمة في الـ rating، بس اختيار النجوم عمره ما بيحدّث <code>minStars</code>.'] },
          { en: [pub('section') + ' (input)', 'the shop page’s <code>section="books"</code>', '<b>No error</b>, because there are no brackets: <code>section</code> becomes a plain HTML attribute and the input keeps its default. With <code>[section]</code> it would be a compile error.'],
            ar: [pub('section') + ' (input)', '<code>section="books"</code> في صفحة المحل', '<b>مفيش error</b>، عشان مفيش أقواس: <code>section</code> بتبقى attribute HTML عادية والـ input بيفضل على قيمته الافتراضية. لو كانت <code>[section]</code> كانت هتبقى compile error.'] },
          { en: [pub('app-rating') + ' / ' + pub('Rating'), 'the tag / the <code>import</code> and <code>imports</code>', 'Compile error.'],
            ar: [pub('app-rating') + ' / ' + pub('Rating'), 'التاج / الـ <code>import</code> و<code>imports</code>', 'Compile error.'] },
          { en: [mine('on') + ' (CSS class)', 'the <code>.on</code> rule in <code>styles</code>', '<b>No error.</b> The chosen stars just stop turning gold.'],
            ar: [mine('on') + ' (CSS class)', 'قاعدة <code>.on</code> في <code>styles</code>', '<b>مفيش error.</b> النجوم المختارة بس بتبطل تبقى دهبي.'] },
          { en: [mine('n') + ' (loop variable)', 'the rest of that <code>@for</code> block', 'Compile error inside the block.'],
            ar: [mine('n') + ' (متغير اللوب)', 'باقي بلوك الـ <code>@for</code> ده', 'Compile error جوه البلوك.'] },
          { en: ['a browser <b>property</b>: <code>[valeu]</code>', '—', 'Compile error: <i>Can’t bind to \'valeu\' since it isn’t a known property of \'input\'</i>.'],
            ar: ['<b>property</b> بتاعة المتصفح: <code>[valeu]</code>', '—', 'Compile error: <i>Can’t bind to \'valeu\' since it isn’t a known property of \'input\'</i>.'] },
          { en: ['a browser <b>event</b>: <code>(inptu)</code>', '—', '<b>No error.</b> A listener for an event that never fires.'],
            ar: ['<b>event</b> بتاع المتصفح: <code>(inptu)</code>', '—', '<b>مفيش error.</b> listener مستني event عمره ما هيحصل.'] },
          { en: ['an attribute: <code>[attr.aria-lable]</code>', '—', '<b>No error.</b> Angular writes a useless attribute that no screen reader reads.'],
            ar: ['attribute: <code>[attr.aria-lable]</code>', '—', '<b>مفيش error.</b> أنجولار بيكتب attribute ملهاش لازمة ومفيش قارئ شاشة بيقراها.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b> above the files. <code>stars</code> and <code>starsChange</code> turn into <code>apricot</code> and <code>apricotChange</code> together, because the <code>Change</code> ending is a rule. <code>value</code>, <code>disabled</code>, <code>click</code> and <code>$event</code> never move.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b> اللي فوق الملفات. <code>stars</code> و<code>starsChange</code> بيبقوا <code>apricot</code> و<code>apricotChange</code> مع بعض، عشان النهاية <code>Change</code> قاعدة. و<code>value</code> و<code>disabled</code> و<code>click</code> و<code>$event</code> عمرهم ما بيتحركوا.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتوعك' },
    title: { en: 'The fixed names in a binding', ar: 'الأسماء الثابتة في الـ binding' },
    lead: {
      en: 'Four kinds of words in bindings are never yours to choose.',
      ar: 'فيه أربع أنواع كلمات في الـ bindings عمرك ما بتختارهم.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Word', 'Owner', 'What to know'], ar: ['الكلمة', 'صاحبها', 'تعرف إيه'] },
        rows: [
          { en: [`${ng('attr')}<code>.</code>, ${ng('class')}<code>.</code>, <code>style.</code>`, 'Angular', 'Prefixes. What comes after the dot is an attribute name, <b>your</b> CSS class name, or a CSS property.'],
            ar: [`${ng('attr')}<code>.</code> و${ng('class')}<code>.</code> و<code>style.</code>`, 'أنجولار', 'بادئات. اللي بعد النقطة اسم attribute، أو اسم CSS class <b>بتاعك</b>، أو CSS property.'] },
          { en: [`${ng('$event')}, ${ng('$any')}`, 'Angular', '<code>$event</code> exists only inside <code>( )="…"</code>. In the class method, the same value arrives as a parameter you name yourself.'],
            ar: [`${ng('$event')} و${ng('$any')}`, 'أنجولار', '<code>$event</code> موجود جوه <code>( )="…"</code> بس. وفي ميثود الكلاس، نفس القيمة بتوصل كـ parameter انت اللي بتسمّيه.'] },
          { en: [`${ng('keydown.enter')}`, 'the browser + Angular', '<code>keydown</code> is the browser’s event; <code>.enter</code> is Angular’s key filter.'],
            ar: [`${ng('keydown.enter')}`, 'المتصفح + أنجولار', '<code>keydown</code> الـ event بتاع المتصفح؛ و<code>.enter</code> فلتر الزراير بتاع أنجولار.'] },
          { en: [`${ng('value')}, ${ng('disabled')}, ${ng('input')}, ${ng('click')}, ${ng('target')}, ${ng('aria-label')}`, 'the browser', 'Properties, events and attributes defined by HTML and the DOM. Look them up; do not guess.'],
            ar: [`${ng('value')} و${ng('disabled')} و${ng('input')} و${ng('click')} و${ng('target')} و${ng('aria-label')}`, 'المتصفح', 'properties وevents وattributes معرّفة في HTML والـ DOM. دوّر عليهم؛ متخمّنش.'] },
        ] },
      { t: 'note', label: { en: 'Same spelling, two owners', ar: 'نفس الكتابة، صاحبين' },
        en: `<code>input</code> appears in three roles on this page: the <code>&lt;input&gt;</code> tag (HTML), the ${ng('input')} event in <code>(input)</code> (the browser), and the ${ng('input()')} function in <code>search.ts</code> (Angular). None of them is yours, and none has anything to do with the others.`,
        ar: `<code>input</code> بتظهر بتلات أدوار في الصفحة دي: التاج <code>&lt;input&gt;</code> (HTML)، والـ event ${ng('input')} في <code>(input)</code> (المتصفح)، والـ function ${ng('input()')} في <code>search.ts</code> (أنجولار). ولا واحدة فيهم بتاعتك، وملهمش أي علاقة ببعض.` }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names for bindings', ar: 'تختار أسماء كويسة للـ bindings إزاي' },
    lead: {
      en: 'You only name the right-hand side, and the inputs and outputs of your own components. These habits keep templates readable.',
      ar: 'انت بتسمّي الناحية اليمين بس، والـ inputs والـ outputs بتاعة الـ components بتاعتك. العادات دي بتخلي التمبلتس سهلة القراية.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['a boolean you bind to <code>[disabled]</code>', '<code>canSubmit</code>, <code>isBusy</code>', '<code>flag</code>, <code>check</code>', 'Then <code>[disabled]="!canSubmit()"</code> reads as a sentence.'],
            ar: ['boolean بتربطه بـ <code>[disabled]</code>', '<code>canSubmit</code>، <code>isBusy</code>', '<code>flag</code>، <code>check</code>', 'ساعتها <code>[disabled]="!canSubmit()"</code> بتتقري زي جملة.'] },
          { en: ['an event handler', '<code>search()</code>, <code>save()</code>, <code>onSubmit()</code>', '<code>click()</code>, <code>handle()</code>', 'Name what it does. <code>on…</code> for handlers is common and fine. Do not name a method after a browser event.'],
            ar: ['event handler', '<code>search()</code>، <code>save()</code>، <code>onSubmit()</code>', '<code>click()</code>، <code>handle()</code>', 'سمّي اللي بتعمله. و<code>on…</code> للـ handlers منتشرة ومفيهاش مشكلة. متسمّيش ميثود باسم event بتاع المتصفح.'] },
          { en: ['a two-way input', '<code>stars</code>, <code>checked</code>, <code>value</code>', '<code>starsInput</code>, <code>starsModel</code>', 'Name the value. The <code>Change</code> output follows from it.'],
            ar: ['input في الاتجاهين', '<code>stars</code>، <code>checked</code>، <code>value</code>', '<code>starsInput</code>، <code>starsModel</code>', 'سمّي القيمة. والـ output اللي بـ <code>Change</code> بيمشي وراها.'] },
          { en: ['an output', 'anything that is not a browser event', '<code>click</code>, <code>input</code>, <code>change</code>', 'An output called <code>click</code> on your tag is mixed up with real clicks.'],
            ar: ['output', 'أي اسم مش event بتاع المتصفح', '<code>click</code>، <code>input</code>، <code>change</code>', 'output اسمه <code>click</code> على التاج بتاعك بيتلخبط مع الكليكات الحقيقية.'] },
          { en: ['reading the typed value', '<code>#box</code> then <code>box.value</code>', '<code>$any($event.target).value</code> everywhere', 'Both work. A template reference is shorter and keeps its type. <code>$any</code> switches type checking off.'],
            ar: ['قراية القيمة اللي اتكتبت', '<code>#box</code> وبعدين <code>box.value</code>', '<code>$any($event.target).value</code> في كل حتة', 'الاتنين شغالين. الـ template reference أقصر وبيحافظ على النوع. و<code>$any</code> بتقفل الـ type checking.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Three places where the name is not free', ar: 'تلات أماكن الاسم فيهم مش براحتك' },
    lead: {
      en: 'Two of these are rules of Angular, one is a rule of the browser.',
      ar: 'اتنين منهم قواعد أنجولار، وواحدة قاعدة المتصفح.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: '[(x)] needs x and xChange', ar: '[(x)] محتاجة x وxChange' }, blocks: [
        { t: 'code', name: TWO, lang: 'html', tag: { en: 'roughly', ar: 'تقريبًا' }, code: [
          '<!-- you write -->',
          '<app-rating [(stars)]="minStars" />',
          '',
          '<!-- Angular treats it like this pair -->',
          '<app-rating [stars]="minStars()" (starsChange)="minStars.set($event)" />' ] },
        { t: 'p',
          en: `The banana-in-a-box is a property binding plus an event binding. The event’s name is not free: it must be the input’s name plus ${pub('starsChange')}’s ending, <code>Change</code>. ${ng('model')} creates both with matching names, so the rule cannot be broken.`,
          ar: `الموزة في العلبة دي property binding مع event binding. واسم الـ event مش براحتك: لازم يبقى اسم الـ input وبعده نهاية ${pub('starsChange')}، <code>Change</code>. و${ng('model')} بتعمل الاتنين بأسماء متطابقة، فمستحيل تكسر القاعدة.` }
      ]},
      { t: 'step', n: 'B', title: { en: 'The property name is not always the attribute name', ar: 'اسم الـ property مش دايمًا زي اسم الـ attribute' }, blocks: [
        { t: 'pair',
          bad:  { name: 'table.html', lang: 'html', code: ['<td [colspan]="2">Total</td>'] },
          good: { name: 'table.html', lang: 'html', code: ['<td [attr.colspan]="2">Total</td>', '<td [colSpan]="2">Total</td>'] } },
        { t: 'p',
          en: `<code>[x]</code> binds a <b>DOM property</b>, and the browser picked its spelling. The HTML attribute is ${ng('colspan')}; the DOM property is ${ng('colSpan')}, with a capital S. <code>[colspan]</code> is a compile error (<i>Can’t bind to \'colspan\'</i>). Either bind the attribute with <code>attr.</code>, or use the property’s real name.`,
          ar: `<code>[x]</code> بتربط <b>DOM property</b>، والمتصفح هو اللي اختار كتابتها. الـ attribute في HTML اسمها ${ng('colspan')}؛ والـ property في الـ DOM اسمها ${ng('colSpan')}، بـ S كابيتال. <code>[colspan]</code> compile error (<i>Can’t bind to \'colspan\'</i>). يا تربط الـ attribute بـ <code>attr.</code>، يا تستخدم اسم الـ property الحقيقي.` }
      ]},
      { t: 'step', n: 'C', title: { en: 'The event name decides what $event is', ar: 'اسم الـ event بيحدد $event يبقى إيه' }, blocks: [
        { t: 'p',
          en: `You never pick ${ng('$event')}’s name, and you never pick its type either. <code>(click)</code> gives a <code>MouseEvent</code>, <code>(keydown.enter)</code> a <code>KeyboardEvent</code>, <code>(input)</code> a plain <code>Event</code>, and <code>(starsChange)</code> a <code>number</code>, because that is what the rating emits. In your method, give the parameter any name and that type.`,
          ar: `عمرك ما بتختار اسم ${ng('$event')}، ولا بتختار نوعه كمان. <code>(click)</code> بتدّي <code>MouseEvent</code>، و<code>(keydown.enter)</code> بتدّي <code>KeyboardEvent</code>، و<code>(input)</code> بتدّي <code>Event</code> عادي، و<code>(starsChange)</code> بتدّي <code>number</code>، عشان ده اللي الـ rating بيبعته. وفي الميثود بتاعتك، ادّي الـ parameter أي اسم والنوع ده.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: 'Two-way by hand with <code>@Input</code> and <code>@Output</code>', ar: 'الاتجاهين بالإيد بـ <code>@Input</code> و<code>@Output</code>' },
    lead: {
      en: 'Before <code>model()</code>, a component supported <code>[( )]</code> by declaring the pair itself. The parent’s template, <code>[(stars)]="minStars"</code>, is identical either way.',
      ar: 'قبل <code>model()</code>، الـ component كان بيدعم <code>[( )]</code> بإنه يعلن الاتنين بنفسه. وتمبلت الأب، <code>[(stars)]="minStars"</code>، هو هو في الحالتين.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: OLDR, lang: 'ts', code: [
          '@Input() stars = 0;',
          '@Output() starsChange = new EventEmitter<number>();',
          '',
          'rate(n: number) {',
          '  this.stars = n;',
          '  this.starsChange.emit(n);',
          '}' ] },
        good: { name: NOWR, lang: 'ts', code: [
          'readonly stars = model(0);',
          '',
          '',
          'rate(n: number) {',
          '  this.stars.set(n);',
          '}' ] } },
      { t: 'p',
        en: `In the old version you type the ${pub('starsChange')} name yourself, and you must remember to ${ng('emit')}. That is two places to get wrong. You will also meet <code>[(ngModel)]</code> on form inputs: the same rule, with Angular’s own pair <code>ngModel</code> and <code>ngModelChange</code>.`,
        ar: `في النسخة القديمة انت اللي بتكتب اسم ${pub('starsChange')} بنفسك، ولازم تفتكر تعمل ${ng('emit')}. يعني مكانين ممكن تغلط فيهم. وهتقابل كمان <code>[(ngModel)]</code> على خانات الفورم: نفس القاعدة، بالاتنين بتوع أنجولار <code>ngModel</code> و<code>ngModelChange</code>.` }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, and says nothing', ar: 'مش بيعمل حاجة، ومش بيقول حاجة' },
    title: { en: 'Mistakes that fail silently', ar: 'غلطات بتفشل في صمت' },
    lead: {
      en: 'The compiler checks your names on the right and DOM properties on the left. Everything else is up to you.',
      ar: 'الـ compiler بيراجع أسماءك على اليمين والـ DOM properties على الشمال. وأي حاجة تانية عليك انت.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'No brackets: your code shows on screen', ar: 'من غير أقواس: الكود بتاعك بيظهر على الشاشة' }, blocks: [
        { t: 'pair',
          bad:  { name: SRH, lang: 'html', code: ['<input value="term()">'] },
          good: { name: SRH, lang: 'html', code: ['<input [value]="term()">'] } },
        { t: 'p', en: 'Without brackets, <code>value</code> is a plain attribute and the box literally contains <code>term()</code>. If a binding shows your code on screen, this is why.',
                  ar: 'من غير أقواس، <code>value</code> بتبقى attribute عادية والخانة فيها حرفيًا <code>term()</code>. لو binding بيوريك الكود بتاعك على الشاشة، ده السبب.' }
      ]},
      { t: 'step', n: '2', title: { en: 'disabled="false" is still disabled', ar: 'disabled="false" لسه disabled' }, blocks: [
        { t: 'pair',
          bad:  { name: SRH, lang: 'html', code: ['<button disabled="false">Go</button>'] },
          good: { name: SRH, lang: 'html', code: ['<button [disabled]="false">Go</button>'] } },
        { t: 'p', en: 'For the browser, the mere presence of the <code>disabled</code> attribute disables the button; the text <code>"false"</code> does not matter. With brackets, Angular sets the property to the real boolean <code>false</code>.',
                  ar: 'بالنسبة للمتصفح، مجرد وجود الـ attribute <code>disabled</code> بيقفل الزرار؛ والكلام <code>"false"</code> ملوش لازمة. بالأقواس، أنجولار بيحط الـ property بالـ boolean الحقيقي <code>false</code>.' }
      ]},
      { t: 'step', n: '3', title: { en: '(change) instead of (input)', ar: '(change) بدل (input)' }, blocks: [
        { t: 'pair',
          bad:  { name: SRH, lang: 'html', code: ['<input (change)="term.set($any($event.target).value)">'] },
          good: { name: SRH, lang: 'html', code: ['<input (input)="term.set($any($event.target).value)">'] } },
        { t: 'p', en: 'Both are real browser events, so no error. But on a text box, <code>change</code> fires only when the box loses focus, so the Go button seems to ignore your typing until you click away. <code>input</code> fires on every keystroke.',
                  ar: 'الاتنين events حقيقية في المتصفح، فمفيش error. بس في خانة الكتابة، <code>change</code> بيشتغل بس لما الخانة تفقد الـ focus، فزرار Go يبان كأنه متجاهل الكتابة لحد ما تدوس برّه. أما <code>input</code> فبيشتغل مع كل حرف.' }
      ]},
      { t: 'step', n: '4', title: { en: 'A typo after attr.', ar: 'غلطة إملائية بعد attr.' }, blocks: [
        { t: 'pair',
          bad:  { name: SRH, lang: 'html', code: ["<input [attr.aria-lable]=\"'Find ' + section()\">"] },
          good: { name: SRH, lang: 'html', code: ["<input [attr.aria-label]=\"'Find ' + section()\">"] } },
        { t: 'p', en: 'Angular does not check attribute names: <code>attr.</code> writes whatever you typed. Everything looks fine, and only a screen-reader user notices the box has no label.',
                  ar: 'أنجولار مش بيراجع أسماء الـ attributes: <code>attr.</code> بتكتب أي حاجة انت كتبتها. كل حاجة شكلها تمام، ومحدش بياخد باله إن الخانة ملهاش label غير اللي بيستخدم قارئ شاشة.' }
      ]},
      { t: 'step', n: '5', title: { en: '$event.target.value without $any', ar: '$event.target.value من غير $any' }, blocks: [
        { t: 'pair',
          bad:  { name: SRH, lang: 'html', code: ['<input (input)="term.set($event.target.value)">'] },
          good: { name: SRH, lang: 'html', code: ['<input (input)="term.set($any($event.target).value)">'] } },
        { t: 'p', en: 'This one is an error, but a confusing one: <i>Property \'value\' does not exist on type \'EventTarget\'</i>. The browser types <code>target</code> as “some element”, which might not have a <code>value</code>. <code>$any()</code>, or a template reference like <code>#box</code>, gets you past it.',
                  ar: 'دي error، بس error ملخبط: <i>Property \'value\' does not exist on type \'EventTarget\'</i>. المتصفح بيعرّف <code>target</code> كـ «أي عنصر»، وممكن ميكونش فيه <code>value</code>. <code>$any()</code>، أو template reference زي <code>#box</code>، بيعدّيك منها.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When a binding does nothing', ar: 'لما binding مايعملش حاجة' },
    title: { en: 'Six questions, in this order', ar: 'ست أسئلة، بالترتيب ده' },
    lead: {
      en: 'Your binding “does not work”. Ask these before anything else.',
      ar: 'الـ binding بتاعك «مش شغال». اسأل الأسئلة دي قبل أي حاجة.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Are there brackets around the target? No brackets means the quotes are plain text.',
                  ar: '<b>1.</b> فيه أقواس حوالين الهدف؟ من غير أقواس يبقى اللي جوه العلامات كلام عادي.' },
      { t: 'chk', en: '<b>2.</b> On an HTML tag: is the target the browser’s real property or event name, spelled exactly (<code>colSpan</code>, not <code>colspan</code>; <code>input</code>, not <code>inptu</code>)?',
                  ar: '<b>2.</b> على تاج HTML: الهدف هو اسم الـ property أو الـ event الحقيقي بتاع المتصفح، مكتوب بالظبط (<code>colSpan</code> مش <code>colspan</code>؛ <code>input</code> مش <code>inptu</code>)؟' },
      { t: 'chk', en: '<b>3.</b> On your component’s tag: does the target match an input or output declared in that component?',
                  ar: '<b>3.</b> على تاج الـ component بتاعك: الهدف بيطابق input أو output متعلن في الـ component ده؟' },
      { t: 'chk', en: '<b>4.</b> For <code>[( )]</code>: does the child have <code>model()</code>, or an input <code>x</code> and an output exactly <code>xChange</code>?',
                  ar: '<b>4.</b> لـ <code>[( )]</code>: الابن عنده <code>model()</code>، أو input اسمه <code>x</code> وoutput اسمه <code>xChange</code> بالظبط؟' },
      { t: 'chk', en: '<b>5.</b> Is it the right event: <code>input</code> for every keystroke, <code>change</code> only on leaving the box?',
                  ar: '<b>5.</b> ده الـ event الصح: <code>input</code> مع كل حرف، و<code>change</code> بس لما تسيب الخانة؟' },
      { t: 'chk', en: '<b>6.</b> Is the source a signal that you read with <code>()</code> in <code>[ ]</code>, but pass without <code>()</code> in <code>[( )]</code>?',
                  ar: '<b>6.</b> المصدر signal بتقراها بـ <code>()</code> في <code>[ ]</code>، بس بتبعتها من غير <code>()</code> في <code>[( )]</code>؟' }
    ]
  }
  ]
};
