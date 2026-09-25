/* ==================================================================
   @defer, name by name — a companion page after the defer topic.
   One running example (a product page whose reviews are deferred)
   followed through every file, with every name coloured by who owns
   it. Names list: inline, below.
   ================================================================== */

/* a name in running text, coloured like the code and linked on hover */
const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

/* a trigger word only counts right after "(on", "; on", "prefetch on" or "hydrate on" */
const TRIG = w => '(?<=[(;]\\s*(?:prefetch |hydrate )?on )' + w + '(?![\\w$-])';
const PAGE = ['product-page.ts', 'product-page.html', 'product-page.html · button trigger', 'product-page.html · a flag', 'product-page.html · with SSR'];

export default {
  topic: 'defer',
  tab: '@defer, name by name — The Angular Signal',
  title: { en: '<code>@defer</code>, name by name', ar: '<code>@defer</code>، اسم اسم' },
  say: {
    en: 'One product page whose reviews load later, followed through all five files. Every name coloured by who owns it: <b>Angular’s</b> (every word inside <code>@defer ( )</code>), <b>yours</b>, or <b>yours but shared</b>. Then what breaks when you rename each one.',
    ar: 'صفحة منتج واحدة الـ reviews بتاعتها بتتحمّل بعدين، ماشيين وراها في الخمس ملفات. كل اسم ملوّن حسب صاحبه: <b>بتاع أنجولار</b> (كل كلمة جوه <code>@defer ( )</code>)، ولا <b>بتاعك</b>، ولا <b>بتاعك بس متشارك</b>. وبعدين إيه اللي بيبوظ لما تغيّر كل واحد.'
  },
  lead: {
    en: 'The idea is simple: <b>wrap part of a template in <code>@defer</code>, and its code is downloaded later, when a trigger fires.</b> The confusing part is the names. The line <code>@defer (on viewport; prefetch on idle)</code> is five words, and all of them are Angular’s. Inside the block, the component looks completely normal. And at the top of the file you still write a normal <code>import</code>, which looks like it should load everything straight away. This page sorts out which words are yours and which are fixed.',
    ar: 'الفكرة بسيطة: <b>لف جزء من التمبلت في <code>@defer</code>، والكود بتاعه يتنزّل بعدين، لما trigger يحصل.</b> اللي بيلخبط هو الأسماء. السطر <code>@defer (on viewport; prefetch on idle)</code> خمس كلمات، وكلهم بتوع أنجولار. وجوه البلوك، الـ component شكله عادي خالص. وفوق في الملف لسه بتكتب <code>import</code> عادي، شكله كده المفروض يحمّل كل حاجة على طول. الصفحة دي بتفرز أنهي كلمات بتاعتك وأنهي ثابتة.'
  },

  names: {
    note: {
      en: 'Everything inside the parentheses of <code>@defer (…)</code> and after <code>@placeholder</code> / <code>@loading</code> is Angular’s vocabulary. The only things of yours in there are a template reference like <code>more</code> or an expression like <code>reviewsOpen()</code>. The component inside the block is an ordinary component: its selector, class and inputs are shared names, exactly as without <code>@defer</code>.',
      ar: 'كل حاجة جوه أقواس <code>@defer (…)</code> وبعد <code>@placeholder</code> / <code>@loading</code> من قاموس أنجولار. الحاجات الوحيدة اللي بتاعتك جوه هي template reference زي <code>more</code> أو تعبير زي <code>reviewsOpen()</code>. والـ component اللي جوه البلوك component عادي: الـ selector والكلاس والـ inputs بتوعه أسماء متشاركة، بالظبط زي من غير <code>@defer</code>.'
    },
    names: [
      /* --- shared: another file types it too --- */
      { n:'Reviews', k:'pub', only:['ts'],
        w:{ en:'The deferred component’s class. The page imports it and lists it in <code>imports</code>, and the compiler still moves it into its own chunk, as long as it is used only inside <code>@defer</code>.',
            ar:'كلاس الـ component المتأجل. الصفحة بتعمله import وبتكتبه في <code>imports</code>، والـ compiler برضه بيطلّعه في chunk لوحده، طالما مستخدم جوه <code>@defer</code> بس.' } },
      { n:'app-reviews', k:'pub', w:{ en:'Its selector: the string in <code>reviews.ts</code> and the tag inside the block must match.', ar:'الـ selector بتاعه: النص اللي في <code>reviews.ts</code> والتاج اللي جوه البلوك لازم يبقوا زي بعض.' } },
      { n:'productId', k:'pub', w:{ en:'Its input. The page binds <code>[productId]</code>, so both files change together.', ar:'الـ input بتاعه. الصفحة بتربط <code>[productId]</code>، فالملفين بيتغيروا مع بعض.' } },
      { n:'Spinner', k:'pub', only:['ts'], w:{ en:'The loading indicator’s class, also only used inside the <code>@defer</code> blocks.', ar:'كلاس علامة التحميل، وبرضه مستخدم جوه بلوكات الـ <code>@defer</code> بس.' } },
      { n:'app-spinner', k:'pub', w:{ en:'Its selector.', ar:'الـ selector بتاعه.' } },
      { n:'ProductPage', k:'pub', w:{ en:'The page’s class. Whoever routes to it or shows it imports it.', ar:'كلاس الصفحة. أي حد بيعمل لها route أو بيعرضها بيعملها import.' } },
      { n:'app-product-page', k:'pub', w:{ en:'The page’s selector.', ar:'الـ selector بتاع الصفحة.' } },
      { n:'app-legal-footer', k:'pub', w:{ en:'Another component’s selector.', ar:'الـ selector بتاع component تاني.' } },

      /* --- yours, private to one component --- */
      { n:'product', k:'mine', re:'(?<![\\w$.\\[-])product(?![\\w$-])',
        w:{ en:'The page’s own signal.', ar:'الـ signal بتاعة الصفحة نفسها.' } },
      { n:'id', k:'mine', only:PAGE, re:'(?<=\\.)id(?![\\w$])|(?<=\\{ )id(?=:)',
        w:{ en:'A field of the page’s own product object.', ar:'field في أوبجكت المنتج بتاع الصفحة نفسها.' } },
      { n:'name', k:'mine', only:PAGE, re:'(?<=\\.)name(?![\\w$])|(?<=, )name(?=:)',
        w:{ en:'Another field of that object.', ar:'field تاني في نفس الأوبجكت.' } },
      { n:'reviews-skeleton', k:'mine',
        w:{ en:'Your CSS class, from the page’s own stylesheet. It gives the placeholder the height of what is coming.', ar:'كلاس CSS بتاعك، من ملف الـ CSS بتاع الصفحة. بيدّي الـ placeholder ارتفاع الحاجة اللي جاية.' } },
      { n:'more', k:'mine',
        w:{ en:'Your template reference, <code>#more</code>. <code>interaction(more)</code> must use the same name.', ar:'الـ template reference بتاعك، <code>#more</code>. و<code>interaction(more)</code> لازم يستخدم نفس الاسم.' } },
      { n:'reviewsOpen', k:'mine', w:{ en:'A signal on the page, used as a <code>when</code> condition.', ar:'signal في الصفحة، مستخدمة كشرط <code>when</code>.' } },
      { n:'reviewsRef', k:'mine', w:{ en:'A query result on the page. Its mere existence makes <code>Reviews</code> eager.', ar:'نتيجة query في الصفحة. مجرد وجودها بيخلي <code>Reviews</code> يتحمّل على طول.' } },

      /* --- Angular's --- */
      { n:'@defer', k:'ng', w:{ en:'Angular’s block: load this part’s code later, when a trigger fires.', ar:'البلوك بتاع أنجولار: حمّل كود الجزء ده بعدين، لما trigger يحصل.' } },
      { n:'@placeholder', k:'ng', w:{ en:'Shown before loading starts. Also what <code>on viewport</code>, <code>on interaction</code> and <code>on hover</code> watch when you give them no reference.', ar:'بيظهر قبل ما التحميل يبدأ. وهو كمان اللي <code>on viewport</code> و<code>on interaction</code> و<code>on hover</code> بيراقبوه لما متدّيهمش reference.' } },
      { n:'@loading', k:'ng', w:{ en:'Shown while the chunk downloads.', ar:'بيظهر والـ chunk بيتنزّل.' } },
      { n:'@error', k:'ng', w:{ en:'Shown if the download fails.', ar:'بيظهر لو التحميل فشل.' } },
      { n:'on', k:'ng', re:'(?<=[(;]\\s*(?:prefetch |hydrate )?)on(?= )', w:{ en:'Angular’s keyword that introduces a trigger.', ar:'الكلمة بتاعة أنجولار اللي بتبدأ بيها الـ trigger.' } },
      { n:'viewport', k:'ng', re:TRIG('viewport'), w:{ en:'A trigger: when the watched element scrolls into view.', ar:'trigger: لما الـ element المتراقب يظهر على الشاشة.' } },
      { n:'idle', k:'ng', re:TRIG('idle'), w:{ en:'A trigger: when the browser is idle. The default if you name none.', ar:'trigger: لما المتصفح يفضى. وده الافتراضي لو مسمّيتش ولا واحد.' } },
      { n:'interaction', k:'ng', re:TRIG('interaction'), w:{ en:'A trigger: the first click or key press on the watched element.', ar:'trigger: أول ضغطة أو زرار كيبورد على الـ element المتراقب.' } },
      { n:'hover', k:'ng', re:TRIG('hover'), w:{ en:'A trigger: the pointer enters the watched element.', ar:'trigger: الماوس يدخل على الـ element المتراقب.' } },
      { n:'timer', k:'ng', re:TRIG('timer'), w:{ en:'A trigger: after a fixed delay.', ar:'trigger: بعد وقت محدد.' } },
      { n:'immediate', k:'ng', re:TRIG('immediate'), w:{ en:'A trigger: right after the page renders.', ar:'trigger: على طول بعد ما الصفحة تترسم.' } },
      { n:'when', k:'ng', re:'(?<=\\()when(?= )', w:{ en:'Angular’s keyword for “once this expression is true”. The expression after it is yours.', ar:'الكلمة بتاعة أنجولار لـ «أول ما التعبير ده يبقى true». والتعبير اللي بعدها بتاعك.' } },
      { n:'prefetch', k:'ng', re:'(?<=[(;]\\s*)prefetch(?= )', w:{ en:'Angular’s keyword: download early on this trigger, show later on the main one.', ar:'كلمة أنجولار: نزّل بدري على الـ trigger ده، واعرض بعدين على الأساسي.' } },
      { n:'hydrate', k:'ng', re:'(?<=\\()hydrate(?= )', w:{ en:'Angular’s keyword for incremental hydration: the server already drew it; this says when to wake it up.', ar:'كلمة أنجولار للـ incremental hydration: السيرفر رسمه خلاص؛ ودي بتقول إمتى يصحى.' } },
      { n:'never', k:'ng', re:'(?<=hydrate )never(?![\\w$-])', w:{ en:'With <code>hydrate</code>: keep the server HTML and never load its JavaScript.', ar:'مع <code>hydrate</code>: سيب الـ HTML اللي جه من السيرفر ومتحمّلش الـ JavaScript بتاعه أبدًا.' } },
      { n:'minimum', k:'ng', w:{ en:'An option: keep this block on screen at least this long, so it does not flash.', ar:'اختيار: خلي البلوك ده ظاهر المدة دي على الأقل، عشان ميرمّشش.' } },
      { n:'after', k:'ng', re:'(?<=\\()after(?= )', w:{ en:'An option on <code>@loading</code>: show it only if loading takes longer than this.', ar:'اختيار في <code>@loading</code>: متظهرهوش إلا لو التحميل أخد وقت أطول من كده.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator for a component.', ar:'الـ decorator بتاع أنجولار للـ component.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The string after it is yours.', ar:'مفتاح إعداد. النص اللي بعده بتاعك.' } },
      { n:'imports', k:'ng', w:{ en:'An option key: what this template uses, deferred or not.', ar:'مفتاح إعداد: الحاجات اللي التمبلت ده بيستخدمها، متأجلة أو لأ.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key. The path after it points at your file.', ar:'مفتاح إعداد. المسار اللي بعده بيشاور على ملفك.' } },
      { n:'styleUrl', k:'ng', w:{ en:'An option key. The path after it points at your stylesheet.', ar:'مفتاح إعداد. المسار اللي بعده بيشاور على ملف الـ CSS بتاعك.' } },
      { n:'template', k:'ng', w:{ en:'An option key: the template, written inline.', ar:'مفتاح إعداد: التمبلت، مكتوب في نفس الملف.' } },
      { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
      { n:'input', k:'ng', re:'(?<![\\w$<(-])input(?=[.(<,])', w:{ en:'Angular’s function that creates an input.', ar:'الـ function بتاعة أنجولار اللي بتعمل input.' } },
      { n:'required', k:'ng', w:{ en:'Part of <code>input.required</code>.', ar:'جزء من <code>input.required</code>.' } },
      { n:'viewChild', k:'ng', w:{ en:'Angular’s query for one child in the template.', ar:'الـ query بتاعة أنجولار لابن واحد في التمبلت.' } },
      { n:'provideClientHydration', k:'ng', w:{ en:'Angular’s provider that turns on hydration after server rendering.', ar:'الـ provider بتاع أنجولار اللي بيشغّل الـ hydration بعد الرسم على السيرفر.' } },
      { n:'withIncrementalHydration', k:'ng', w:{ en:'The feature that makes <code>hydrate</code> triggers work.', ar:'الميزة اللي بتخلي triggers الـ <code>hydrate</code> تشتغل.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One scroll, six stops', ar: 'سكرول واحد، ست محطات' },
    lead: {
      en: 'A product page. The title and the price show at once. The reviews, lower down, are heavy, so they are deferred: their code downloads while the browser is idle and appears when the user scrolls to them. Follow it:',
      ar: 'صفحة منتج. العنوان والسعر بيظهروا على طول. أما الـ reviews، اللي تحت، فتقيلة، فمتأجلة: الكود بتاعها بيتنزّل والمتصفح فاضي، وبتظهر لما المستخدم ينزل لها. امشي وراها:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'product-page.ts', lang: 'ts', who: { en: 'page · imports', ar: 'الصفحة · بتعمل import' },
          code: ["import { Reviews } from './reviews';", '', 'imports: [Reviews, Spinner],'],
          say: { en: `This looks eager, but it is not. ${pub('Reviews')} is imported and listed exactly like any other component. Because the template uses it <b>only</b> inside ${ng('@defer')}, the compiler removes this import from the main bundle and loads the file later instead.`,
                 ar: `شكله بيتحمّل على طول، بس لأ. ${pub('Reviews')} بيتعمله import وبيتكتب بالظبط زي أي component تاني. وعشان التمبلت بيستخدمه جوه ${ng('@defer')} <b>بس</b>، الـ compiler بيشيل الـ import ده من الـ bundle الأساسي وبيحمّل الملف بعدين بدله.` } },
        { file: 'product-page.html', lang: 'html', who: { en: 'page · the block', ar: 'الصفحة · البلوك' },
          code: ['@defer (on viewport; prefetch on idle) {'],
          say: { en: `Every word here is Angular’s: ${ng('@defer')}, ${ng('on')}, ${ng('viewport')}, ${ng('prefetch')}, ${ng('idle')}. It reads: <i>download while idle, show when it scrolls into view.</i> You choose which words, but you cannot invent new ones.`,
                 ar: `كل كلمة هنا بتاعة أنجولار: ${ng('@defer')} و${ng('on')} و${ng('viewport')} و${ng('prefetch')} و${ng('idle')}. معناها: <i>نزّل والمتصفح فاضي، واعرض لما يظهر على الشاشة.</i> انت بتختار أنهي كلمات، بس مينفعش تخترع كلمات جديدة.` } },
        { file: 'product-page.html', lang: 'html', who: { en: 'page · meanwhile', ar: 'الصفحة · في الوقت ده' },
          code: ['} @placeholder (minimum 300ms) {', '  <div class="reviews-skeleton"></div>'],
          say: { en: `Until then, the ${ng('@placeholder')} shows. It is also the element ${ng('viewport')} watches. ${ng('minimum')} is Angular’s option. ${mine('reviews-skeleton')} is your CSS class, which gives the empty box the height of the real reviews.`,
                 ar: `لحد ساعتها، الـ ${ng('@placeholder')} هو اللي ظاهر. وهو كمان الـ element اللي ${ng('viewport')} بيراقبه. ${ng('minimum')} اختيار من أنجولار. و${mine('reviews-skeleton')} كلاس الـ CSS بتاعك، اللي بيدّي الصندوق الفاضي ارتفاع الـ reviews الحقيقية.` } },
        { file: 'product-page.html', lang: 'html', who: { en: 'page · while downloading', ar: 'الصفحة · والتحميل شغال' },
          code: ['} @loading (after 100ms; minimum 500ms) {', '  <app-spinner />'],
          say: { en: `If the download is still running when the user arrives, ${ng('@loading')} shows. ${ng('after')} and ${ng('minimum')} stop it from flashing. ${pub('app-spinner')} is an ordinary component, and it is deferred too.`,
                 ar: `لو التحميل لسه شغال لما المستخدم يوصل، ${ng('@loading')} بيظهر. ${ng('after')} و${ng('minimum')} بيمنعوه يرمّش. و${pub('app-spinner')} component عادي، وهو كمان متأجل.` } },
        { file: 'product-page.html', lang: 'html', who: { en: 'page · the real thing', ar: 'الصفحة · الحاجة الحقيقية' },
          code: ['  <app-reviews [productId]="product().id" />'],
          say: { en: `The chunk has arrived, so the block’s content replaces the placeholder. Inside the block nothing is special: ${pub('app-reviews')} is the child’s selector, ${pub('productId')} is its input, and ${mine('product')} is the page’s own signal.`,
                 ar: `الـ chunk وصل، فمحتوى البلوك بياخد مكان الـ placeholder. وجوه البلوك مفيش حاجة مختلفة: ${pub('app-reviews')} الـ selector بتاع الابن، و${pub('productId')} الـ input بتاعه، و${mine('product')} الـ signal بتاعة الصفحة نفسها.` } },
        { file: 'reviews.ts', lang: 'ts', who: { en: 'the deferred component', ar: 'الـ component المتأجل' },
          code: ['export class Reviews {', '  readonly productId = input.required<string>();', '}'],
          say: { en: `The deferred component does not know it is deferred. Nothing in this file mentions ${ng('@defer')}. ${pub('Reviews')} and ${pub('productId')} are shared with the page, exactly as they would be without deferring.`,
                 ar: `الـ component المتأجل ميعرفش إنه متأجل. مفيش حاجة في الملف ده بتذكر ${ng('@defer')}. و${pub('Reviews')} و${pub('productId')} متشاركين مع الصفحة، بالظبط زي ما كانوا هيبقوا من غير تأجيل.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: '<code>@defer (on viewport; prefetch on idle) { &lt;app-reviews [productId]="…" /&gt; } @placeholder { … }</code>. Everything outside the curly braces is Angular’s vocabulary. Everything inside is your ordinary template. The deferring happens because <code>Reviews</code> is used <b>only</b> in there.',
        ar: '<code>@defer (on viewport; prefetch on idle) { &lt;app-reviews [productId]="…" /&gt; } @placeholder { … }</code>. كل حاجة برّه الأقواس المعووجة من قاموس أنجولار. وكل حاجة جوه التمبلت العادي بتاعك. والتأجيل بيحصل عشان <code>Reviews</code> مستخدم هناك <b>بس</b>.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Page or child?', ar: 'الصفحة ولا الابن؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'Deferring is entirely the page’s decision. The child is written as usual.',
      ar: 'التأجيل قرار الصفحة لوحدها. والابن بيتكتب عادي.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>@defer (on viewport; prefetch on idle)</code>', 'page <code>.html</code>', 'the page', 'Angular: every word'],
            ar: ['<code>@defer (on viewport; prefetch on idle)</code>', '<code>.html</code> الصفحة', 'الصفحة', 'أنجولار: كل كلمة'] },
          { en: ['<code>@placeholder (minimum 300ms)</code>', 'page <code>.html</code>', 'the page', `Angular picks the words; you pick the content and ${mine('reviews-skeleton')}`],
            ar: ['<code>@placeholder (minimum 300ms)</code>', '<code>.html</code> الصفحة', 'الصفحة', `أنجولار بيختار الكلمات؛ وانت بتختار المحتوى و${mine('reviews-skeleton')}`] },
          { en: ['<code>&lt;app-reviews [productId]="…"&gt;</code>', 'page <code>.html</code>, inside the block', 'the page', `copies the child’s ${pub('app-reviews')} and ${pub('productId')}`],
            ar: ['<code>&lt;app-reviews [productId]="…"&gt;</code>', '<code>.html</code> الصفحة، جوه البلوك', 'الصفحة', `بتنسخ ${pub('app-reviews')} و${pub('productId')} بتوع الابن`] },
          { en: ['<code>imports: [Reviews, Spinner]</code>', 'page <code>.ts</code>', 'the page', `copies the class names ${pub('Reviews')} and ${pub('Spinner')}`],
            ar: ['<code>imports: [Reviews, Spinner]</code>', '<code>.ts</code> الصفحة', 'الصفحة', `بتنسخ أسماء الكلاسات ${pub('Reviews')} و${pub('Spinner')}`] },
          { en: ['<code>export class Reviews</code>, its selector and input', '<code>reviews.ts</code>', 'the child', `you pick ${pub('Reviews')}, ${pub('app-reviews')}, ${pub('productId')}`],
            ar: ['<code>export class Reviews</code> والـ selector والـ input بتوعه', '<code>reviews.ts</code>', 'الابن', `انت بتختار ${pub('Reviews')} و${pub('app-reviews')} و${pub('productId')}`] },
          { en: ['<code>#more</code> and <code>on interaction(more)</code>', 'page <code>.html</code>', 'the page', `you pick ${mine('more')}; both spots must match`],
            ar: ['<code>#more</code> و<code>on interaction(more)</code>', '<code>.html</code> الصفحة', 'الصفحة', `انت بتختار ${mine('more')}؛ والمكانين لازم يبقوا زي بعض`] },
          { en: ['<code>when reviewsOpen()</code>', 'page <code>.html</code>', 'the page', `${ng('when')} is Angular’s; ${mine('reviewsOpen')} is your signal`],
            ar: ['<code>when reviewsOpen()</code>', '<code>.html</code> الصفحة', 'الصفحة', `${ng('when')} بتاعة أنجولار؛ و${mine('reviewsOpen')} الـ signal بتاعتك`] },
        ] },
      { t: 'ul',
        en: ['<b>The child never changes.</b> Deferring is written only in the template that uses it.',
             '<b>Inside <code>( )</code>, only Angular’s words</b>, plus a reference name in <code>interaction(more)</code> or an expression after <code>when</code>.',
             '<b>The normal <code>import</code> at the top is fine.</b> The compiler decides what to split by where the class is used, not by the import line.'],
        ar: ['<b>الابن عمره ما بيتغير.</b> التأجيل بيتكتب في التمبلت اللي بيستخدمه بس.',
             '<b>جوه <code>( )</code>، كلمات أنجولار بس</b>، ومعاها اسم reference في <code>interaction(more)</code> أو تعبير بعد <code>when</code>.',
             '<b>الـ <code>import</code> العادي اللي فوق مفيهوش مشكلة.</b> الـ compiler بيقرر يقسّم إيه حسب الكلاس مستخدم فين، مش حسب سطر الـ import.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All five files, every name coloured', ar: 'الخمس ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same example, complete. Hover a coloured name to light up everywhere else it appears. Then press <b>Rename test</b>: every word inside <code>@defer ( )</code> stays put, because none of it is yours.',
      ar: 'نفس المثال، كامل. قف بالماوس على أي اسم ملوّن وهتنوّر كل الأماكن التانية اللي هو فيها. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: كل كلمة جوه <code>@defer ( )</code> بتفضل مكانها، عشان ولا واحدة فيهم بتاعتك.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'product-page.ts', lang: 'ts', tag: { en: 'the page', ar: 'الصفحة' }, code: [
        "import { Component, signal } from '@angular/core';",
        "import { Reviews } from './reviews';",
        "import { Spinner } from './spinner';",
        '',
        '@Component({',
        "  selector: 'app-product-page',",
        '  imports: [Reviews, Spinner],     // deferred: only used inside @defer',
        "  templateUrl: './product-page.html',",
        "  styleUrl: './product-page.css',",
        '})',
        'export class ProductPage {',
        "  readonly product = signal({ id: 'p-42', name: 'Desk lamp' });",
        '}' ] },
      { t: 'code', name: 'product-page.html', lang: 'html', tag: { en: 'the page', ar: 'الصفحة' }, code: [
        '<h1>{{ product().name }}</h1>',
        '',
        '@defer (on viewport; prefetch on idle) {',
        '  <app-reviews [productId]="product().id" />',
        '} @placeholder (minimum 300ms) {',
        '  <div class="reviews-skeleton"></div>',
        '} @loading (after 100ms; minimum 500ms) {',
        '  <app-spinner />',
        '} @error {',
        '  <p>This part could not load. Please try again later.</p>',
        '}' ] },
      { t: 'code', name: 'product-page.css', lang: 'css', tag: { en: 'the page', ar: 'الصفحة' }, code: [
        '.reviews-skeleton {',
        '  height: 320px;      /* the height of the real thing */',
        '  background: #eee;',
        '}' ] },
      { t: 'code', name: 'reviews.ts', lang: 'ts', tag: { en: 'deferred', ar: 'متأجل' }, code: [
        "import { Component, input } from '@angular/core';",
        '',
        '@Component({',
        "  selector: 'app-reviews',",
        "  template: '<h2>What buyers say about {{ productId() }}</h2>',",
        '})',
        'export class Reviews {',
        '  readonly productId = input.required<string>();',
        '}' ] },
      { t: 'code', name: 'spinner.ts', lang: 'ts', tag: { en: 'deferred too', ar: 'متأجل هو كمان' }, code: [
        "import { Component } from '@angular/core';",
        '',
        "@Component({ selector: 'app-spinner', template: '<p>Loading…</p>' })",
        'export class Spinner {}' ] },
      { t: 'nmtable' }
    ]
  },

  /* ------------------------------------------------------------ 4 */
  {
    id: 'rename',
    kicker: { en: 'Is it OK to change it?', ar: 'ينفع أغيّره؟' },
    title: { en: 'What breaks when you rename each name', ar: 'إيه اللي بيبوظ لما تغيّر كل اسم' },
    lead: {
      en: 'Templates inside <code>@defer</code> are checked like any other template, so most renames give a compile error. The one that does not is the CSS class.',
      ar: 'التمبلتس اللي جوه <code>@defer</code> بتتشيّك زي أي تمبلت تاني، فأغلب التغييرات بتدي compile error. واللي مش بيدي هو كلاس الـ CSS.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [pub('Reviews') + ' (the class)', 'the page’s <code>import</code> line and <code>imports: [ ]</code>', 'Compile error on the import.'],
            ar: [pub('Reviews') + ' (الكلاس)', 'سطر الـ <code>import</code> و<code>imports: [ ]</code> في الصفحة', 'Compile error في الـ import.'] },
          { en: [pub('app-reviews') + ' (the selector)', 'the tag inside the block', 'Compile error: “is not a known element”.'],
            ar: [pub('app-reviews') + ' (الـ selector)', 'التاج اللي جوه البلوك', 'Compile error: «is not a known element».'] },
          { en: [pub('productId') + ' (the input)', '<code>[productId]</code> in the block', 'Compile error: the page binds an input that does not exist.'],
            ar: [pub('productId') + ' (الـ input)', '<code>[productId]</code> في البلوك', 'Compile error: الصفحة بتربط input مش موجود.'] },
          { en: [mine('product') + ' (the page’s signal)', 'the page’s template', 'Compile error in the template.'],
            ar: [mine('product') + ' (الـ signal بتاعة الصفحة)', 'تمبلت الصفحة', 'Compile error في التمبلت.'] },
          { en: [mine('more') + ' (a template reference)', '<code>interaction(more)</code>', 'The compiler reports that the trigger cannot find the reference.'],
            ar: [mine('more') + ' (template reference)', '<code>interaction(more)</code>', 'الـ compiler بيقول إن الـ trigger مش لاقي الـ reference.'] },
          { en: [mine('reviews-skeleton') + ' (the CSS class)', 'the rule in <code>product-page.css</code>', '<b>No error at all.</b> The placeholder has no height, and the page jumps when the reviews arrive.'],
            ar: [mine('reviews-skeleton') + ' (كلاس الـ CSS)', 'القاعدة في <code>product-page.css</code>', '<b>مفيش أي error.</b> الـ placeholder ملوش ارتفاع، والصفحة بتنطّ لما الـ reviews توصل.'] },
          { en: [`${ng('viewport')}, ${ng('idle')}, ${ng('minimum')}…`, 'nothing: you cannot rename these', 'A misspelled trigger or option is a compile error: Angular does not recognise it.'],
            ar: [`${ng('viewport')} و${ng('idle')} و${ng('minimum')}…`, 'ولا حاجة: دول مينفعش يتغيروا', 'trigger أو اختيار مكتوب غلط يبقى compile error: أنجولار مش بيعرفه.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b> in the bar above the files. <code>app-reviews</code>, <code>Reviews</code> and <code>productId</code> change in both files at once; the whole <code>@defer (on viewport; prefetch on idle)</code> line does not move.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b> في الشريط اللي فوق الملفات. <code>app-reviews</code> و<code>Reviews</code> و<code>productId</code> بيتغيروا في الملفين مرة واحدة؛ وسطر <code>@defer (on viewport; prefetch on idle)</code> كله مش بيتحرك.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتاعتك' },
    title: { en: 'The fixed vocabulary of <code>@defer</code>', ar: 'القاموس الثابت بتاع <code>@defer</code>' },
    lead: {
      en: 'Four block names, a handful of triggers, and two keywords that change what a trigger does. Learn them once; they are the same on every page.',
      ar: 'أربع أسماء بلوكات، وشوية triggers، وكلمتين بيغيّروا الـ trigger بيعمل إيه. اتعلمهم مرة؛ هما نفسهم في كل صفحة.'
    },
    blocks: [
      { t: 'code', name: 'the triggers', lang: 'html', tag: { en: 'pick one', ar: 'اختار واحد' }, code: [
        '@defer (on idle)              <!-- the default: when the browser is idle -->',
        '@defer (on viewport)          <!-- the placeholder scrolls into view -->',
        '@defer (on interaction)       <!-- first click or key press on the placeholder -->',
        '@defer (on hover)             <!-- the pointer enters the placeholder -->',
        '@defer (on timer(2s))         <!-- after a delay -->',
        '@defer (on immediate)         <!-- right after the page renders -->',
        '@defer (when reviewsOpen())   <!-- your expression turns true -->' ] },
      { t: 'tbl',
        head: { en: ['Trigger', 'Fires when', 'What it watches'], ar: ['الـ trigger', 'بيحصل إمتى', 'بيراقب إيه'] },
        rows: [
          { en: [`on ${ng('idle')}`, 'the browser is idle (the default)', '—'], ar: [`on ${ng('idle')}`, 'المتصفح فاضي (ده الافتراضي)', '—'] },
          { en: [`on ${ng('viewport')}`, 'an element scrolls into view', 'the placeholder, or a reference you name'], ar: [`on ${ng('viewport')}`, 'element يظهر على الشاشة', 'الـ placeholder، أو reference انت بتسمّيه'] },
          { en: [`on ${ng('interaction')}`, 'the first click or key press', 'the placeholder, or a reference'], ar: [`on ${ng('interaction')}`, 'أول ضغطة أو زرار كيبورد', 'الـ placeholder، أو reference'] },
          { en: [`on ${ng('hover')}`, 'the pointer enters (or focus arrives)', 'the placeholder, or a reference'], ar: [`on ${ng('hover')}`, 'الماوس يدخل (أو الـ focus يوصل)', 'الـ placeholder، أو reference'] },
          { en: [`on ${ng('timer')}(2s)`, 'after a delay, in <code>ms</code> or <code>s</code>', '—'], ar: [`on ${ng('timer')}(2s)`, 'بعد وقت، بالـ <code>ms</code> أو الـ <code>s</code>', '—'] },
          { en: [`on ${ng('immediate')}`, 'right after the page renders', '—'], ar: [`on ${ng('immediate')}`, 'على طول بعد ما الصفحة تترسم', '—'] },
          { en: [`${ng('when')} <i>expression</i>`, 'your expression becomes true (once)', 'your signal or value'], ar: [`${ng('when')} <i>تعبير</i>`, 'التعبير بتاعك يبقى true (مرة واحدة)', 'الـ signal أو القيمة بتاعتك'] },
        ] },
      { t: 'p',
        en: `Put ${ng('prefetch')} in front of a trigger to <b>download</b> early without showing. Put ${ng('hydrate')} in front of one (with server rendering) to decide when server-drawn HTML becomes interactive. The block names ${ng('@placeholder')}, ${ng('@loading')} and ${ng('@error')} are fixed too, and each has its own options: ${ng('minimum')} on the first two, ${ng('after')} only on ${ng('@loading')}.`,
        ar: `حط ${ng('prefetch')} قبل أي trigger عشان <b>تنزّل</b> بدري من غير ما تعرض. وحط ${ng('hydrate')} قبل واحد (مع الرسم على السيرفر) عشان تحدد إمتى الـ HTML اللي السيرفر رسمه يبقى تفاعلي. وأسماء البلوكات ${ng('@placeholder')} و${ng('@loading')} و${ng('@error')} ثابتة برضه، وكل واحد ليه اختياراته: ${ng('minimum')} في الاتنين الأولانيين، و${ng('after')} في ${ng('@loading')} بس.` },
      { t: 'note', label: { en: 'The one reference word', ar: 'كلمة الـ reference الوحيدة' },
        en: 'The only thing of yours that can appear inside <code>on …( )</code> is the name of a template reference, like <code>more</code> in <code>on interaction(more)</code>. It is not a string and not a class: it is the <code>#more</code> written on an element in the same template.',
        ar: 'الحاجة الوحيدة بتاعتك اللي ممكن تظهر جوه <code>on …( )</code> هي اسم template reference، زي <code>more</code> في <code>on interaction(more)</code>. ده مش string ومش كلاس: ده الـ <code>#more</code> المكتوب على element في نفس التمبلت.' }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'There are only a few names of your own around a <code>@defer</code> block. These habits keep them readable.',
      ar: 'فيه أسماء قليلة بس بتاعتك حوالين بلوك <code>@defer</code>. العادات دي بتخليهم سهلين في القراية.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['the placeholder class', '<code>reviews-skeleton</code>', '<code>ph</code>, <code>box</code>', 'Name it after what it stands in for; its height must match that thing.'],
            ar: ['كلاس الـ placeholder', '<code>reviews-skeleton</code>', '<code>ph</code>، <code>box</code>', 'سمّيه باسم الحاجة اللي هو ماسك مكانها؛ وارتفاعه لازم يطابقها.'] },
          { en: ['a trigger reference', '<code>#more</code>, <code>#showReviews</code>', '<code>#b</code>, <code>#ref1</code>', '<code>on interaction(showReviews)</code> should read like a sentence.'],
            ar: ['reference للـ trigger', '<code>#more</code>، <code>#showReviews</code>', '<code>#b</code>، <code>#ref1</code>', '<code>on interaction(showReviews)</code> المفروض يتقري زي جملة.'] },
          { en: ['a <code>when</code> signal', '<code>reviewsOpen</code>, <code>isAdmin</code>', '<code>flag</code>, <code>load</code>', 'A yes/no question reads naturally after <code>when</code>.'],
            ar: ['signal بتاعة <code>when</code>', '<code>reviewsOpen</code>، <code>isAdmin</code>', '<code>flag</code>، <code>load</code>', 'سؤال إجابته آه أو لأ بيتقري طبيعي بعد <code>when</code>.'] },
          { en: ['the deferred component', 'the same name as always: <code>Reviews</code>', '<code>LazyReviews</code>, <code>DeferredReviews</code>', 'Deferring is the page’s choice. Another page may use the same component eagerly.'],
            ar: ['الـ component المتأجل', 'نفس الاسم العادي: <code>Reviews</code>', '<code>LazyReviews</code>، <code>DeferredReviews</code>', 'التأجيل اختيار الصفحة. وصفحة تانية ممكن تستخدم نفس الـ component على طول.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Three places where your name must match', ar: 'تلات أماكن اسمك لازم يطابق فيهم' },
    lead: {
      en: 'You pick these names, but once picked, something else has to copy them exactly.',
      ar: 'انت بتختار الأسماء دي، بس أول ما تختارها، فيه حاجة تانية لازم تنسخها بالظبط.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'A reference and its trigger', ar: 'الـ reference والـ trigger بتاعه' }, blocks: [
        { t: 'code', name: 'product-page.html · button trigger', lang: 'html', tag: { en: 'page', ar: 'الصفحة' }, code: [
          '<button #more>Show what buyers say</button>',
          '',
          '@defer (on interaction(more)) {',
          '  <app-reviews [productId]="product().id" />',
          '} @placeholder {',
          '  <p>Press the button above.</p>',
          '}' ] },
        { t: 'p',
          en: `${mine('more')} is yours, but it is written twice: once after <code>#</code> on the button, once inside ${ng('interaction')}<code>( )</code>. They must match, and the element must be in the same template.`,
          ar: `${mine('more')} بتاعك، بس بيتكتب مرتين: مرة بعد <code>#</code> على الزرار، ومرة جوه ${ng('interaction')}<code>( )</code>. لازم يبقوا زي بعض، والـ element لازم يبقى في نفس التمبلت.` }
      ]},
      { t: 'step', n: 'B', title: { en: 'No reference means the placeholder is watched', ar: 'من غير reference يبقى الـ placeholder هو اللي بيتراقب' }, blocks: [
        { t: 'p',
          en: `Plain ${ng('viewport')}, ${ng('interaction')} and ${ng('hover')} watch the ${ng('@placeholder')}. So when you use them without a reference, you need a placeholder, and it should contain exactly one root element for Angular to watch: here, the single <code>&lt;div class="reviews-skeleton"&gt;</code>.`,
          ar: `${ng('viewport')} و${ng('interaction')} و${ng('hover')} لوحدهم بيراقبوا الـ ${ng('@placeholder')}. فلما تستخدمهم من غير reference، محتاج placeholder، ولازم يكون جواه element رئيسي واحد بس أنجولار يراقبه: هنا، الـ <code>&lt;div class="reviews-skeleton"&gt;</code> الوحيد.` }
      ]},
      { t: 'step', n: 'C', title: { en: '<code>when</code> takes your expression, called', ar: '<code>when</code> بياخد التعبير بتاعك، متنادي' }, blocks: [
        { t: 'code', name: 'product-page.html · a flag', lang: 'html', tag: { en: 'page', ar: 'الصفحة' }, code: [
          '@defer (when reviewsOpen()) {',
          '  <app-reviews [productId]="product().id" />',
          '}' ] },
        { t: 'p',
          en: `After ${ng('when')} comes an ordinary template expression, so ${mine('reviewsOpen')} is a signal on the page and you call it with <code>()</code>. The block loads once, the first time it is true; setting it back to false does not unload it.`,
          ar: `بعد ${ng('when')} بييجي تعبير تمبلت عادي، فـ ${mine('reviewsOpen')} signal في الصفحة وبتناديها بـ <code>()</code>. البلوك بيتحمّل مرة واحدة، أول مرة يبقى true؛ ولو رجّعته false مش بيتشال.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'hydrate',
    kicker: { en: 'With server rendering', ar: 'مع الرسم على السيرفر' },
    title: { en: '<code>hydrate</code> reuses the same trigger words', ar: '<code>hydrate</code> بيستخدم نفس كلمات الـ triggers' },
    lead: {
      en: 'There is no older syntax for <code>@defer</code>. But with SSR there is a second use of the same block, and it adds one keyword and nothing else.',
      ar: 'مفيش كتابة أقدم لـ <code>@defer</code>. بس مع الـ SSR فيه استخدام تاني لنفس البلوك، وبيزوّد كلمة واحدة ومفيش غيرها.'
    },
    blocks: [
      { t: 'code', name: 'app.config.ts · with SSR', lang: 'ts', tag: { en: 'switch it on once', ar: 'شغّله مرة واحدة' }, code: [
        'providers: [provideClientHydration(withIncrementalHydration())],' ] },
      { t: 'code', name: 'product-page.html · with SSR', lang: 'html', tag: { en: 'page', ar: 'الصفحة' }, code: [
        '@defer (hydrate on viewport) {',
        '  <app-reviews [productId]="product().id" />',
        '}',
        '',
        '@defer (hydrate never) {',
        '  <app-legal-footer />',
        '}' ] },
      { t: 'p',
        en: `The server draws the reviews as real HTML. ${ng('hydrate')} ${ng('on')} ${ng('viewport')} means: download their JavaScript and make them interactive when they scroll into view. ${ng('hydrate')} ${ng('never')} keeps the server HTML and never ships the code. The trigger words are exactly the ones from the table above; ${pub('app-reviews')} and ${pub('productId')} are still your shared names.`,
        ar: `السيرفر بيرسم الـ reviews كـ HTML حقيقي. و${ng('hydrate')} ${ng('on')} ${ng('viewport')} معناها: نزّل الـ JavaScript بتاعها وخليها تفاعلية لما تظهر على الشاشة. و${ng('hydrate')} ${ng('never')} بتسيب الـ HTML اللي جه من السيرفر ومش بتبعت الكود أبدًا. كلمات الـ triggers هي نفسها اللي في الجدول اللي فوق؛ و${pub('app-reviews')} و${pub('productId')} لسه أسماءك المتشاركة.` }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, and says nothing', ar: 'مش بيعمل حاجة، ومش بيقول حاجة' },
    title: { en: 'Mistakes that fail silently', ar: 'غلطات بتفشل في صمت' },
    lead: {
      en: 'The page still works in every case below. It is just not deferred any more, or it jumps, or it loads at the wrong time.',
      ar: 'الصفحة لسه شغالة في كل الحالات اللي تحت. بس مبقتش متأجلة، أو بتنطّ، أو بتتحمّل في الوقت الغلط.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'Using the class outside the block', ar: 'استخدام الكلاس برّه البلوك' }, blocks: [
        { t: 'pair',
          bad:  { name: 'product-page.ts', lang: 'ts', code: [
            'export class ProductPage {',
            "  readonly product = signal({ id: 'p-42', name: 'Desk lamp' });",
            '  readonly reviewsRef = viewChild(Reviews);',
            '}' ] },
          good: { name: 'product-page.ts', lang: 'ts', code: [
            'export class ProductPage {',
            "  readonly product = signal({ id: 'p-42', name: 'Desk lamp' });",
            '',
            '}' ] } },
        { t: 'p', en: `Any use of ${pub('Reviews')} outside ${ng('@defer')} in the same component (a ${ng('viewChild')} query, or an <code>&lt;app-reviews&gt;</code> tag outside the block) makes it an ordinary dependency. It is then loaded straight away, with no warning. The block still shows its placeholder first, so it looks deferred when it is not.`,
                  ar: `أي استخدام لـ ${pub('Reviews')} برّه ${ng('@defer')} في نفس الـ component (query بـ ${ng('viewChild')}، أو تاج <code>&lt;app-reviews&gt;</code> برّه البلوك) بيخليه dependency عادية. فبيتحمّل على طول، من غير أي تنبيه. والبلوك لسه بيعرض الـ placeholder الأول، فشكله متأجل وهو مش متأجل.` }
      ]},
      { t: 'step', n: '2', title: { en: 'Another file imports it normally', ar: 'ملف تاني بيعمله import عادي' }, blocks: [
        { t: 'p', en: 'If any eagerly loaded component also imports <code>Reviews</code> and uses it in its template, the file ends up in the main bundle anyway, and deferring it here saves nothing. Check <code>ng build</code>: is there a lazy chunk for it?',
                  ar: 'لو أي component بيتحمّل على طول بيعمل import لـ <code>Reviews</code> برضه وبيستخدمه في التمبلت بتاعه، يبقى الملف هيقع في الـ bundle الأساسي في كل الأحوال، والتأجيل هنا مش هيوفّر حاجة. بص على <code>ng build</code>: فيه lazy chunk ليه؟' }
      ]},
      { t: 'step', n: '3', title: { en: 'A placeholder with no height', ar: 'placeholder ملوش ارتفاع' }, blocks: [
        { t: 'pair',
          bad:  { name: 'product-page.css', lang: 'css', code: ['.reviews-skeleton {', '  background: #eee;', '}'] },
          good: { name: 'product-page.css', lang: 'css', code: ['.reviews-skeleton {', '  height: 320px;', '  background: #eee;', '}'] } },
        { t: 'p', en: 'An empty <code>div</code> is zero pixels tall. When the reviews arrive, everything below them jumps down. That is layout shift, a Core Web Vital, and no tool warns you about it while you write the code.',
                  ar: 'الـ <code>div</code> الفاضي طوله صفر. ولما الـ reviews توصل، كل اللي تحتها بينزل لتحت فجأة. ده layout shift، واحد من الـ Core Web Vitals، ومفيش أداة بتنبّهك وانت بتكتب الكود.' }
      ]},
      { t: 'step', n: '4', title: { en: 'A signal without brackets after <code>when</code>', ar: 'signal من غير أقواس بعد <code>when</code>' }, blocks: [
        { t: 'pair',
          bad:  { name: 'product-page.html', lang: 'html', code: ['@defer (when reviewsOpen) {'] },
          good: { name: 'product-page.html', lang: 'html', code: ['@defer (when reviewsOpen()) {'] } },
        { t: 'p', en: 'Without brackets you pass the signal function itself, and a function is always “truthy”. The compiler may not catch it, and the block loads at once instead of waiting.',
                  ar: 'من غير أقواس انت بتدّي الـ signal نفسها كـ function، والـ function دايمًا بتتحسب true. والـ compiler ممكن ميمسكهاش، فالبلوك بيتحمّل على طول بدل ما يستنى.' }
      ]},
      { t: 'step', n: '5', title: { en: 'Only a <code>prefetch</code> trigger', ar: 'trigger الـ <code>prefetch</code> بس' }, blocks: [
        { t: 'pair',
          bad:  { name: 'product-page.html', lang: 'html', code: ['@defer (prefetch on idle) {'] },
          good: { name: 'product-page.html', lang: 'html', code: ['@defer (on viewport; prefetch on idle) {'] } },
        { t: 'p', en: '<code>prefetch</code> only decides when to download. With no main trigger, the block falls back to the default, <code>on idle</code>, so it is <b>shown</b> as soon as the browser is idle, not when the user scrolls to it.',
                  ar: '<code>prefetch</code> بيحدد بس إمتى يتنزّل. ومن غير trigger أساسي، البلوك بيرجع للافتراضي، <code>on idle</code>، فبـ<b>يظهر</b> أول ما المتصفح يفضى، مش لما المستخدم ينزل له.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it is not deferred', ar: 'لما مايبقاش متأجل' },
    title: { en: 'Five questions, in this order', ar: 'خمس أسئلة، بالترتيب ده' },
    lead: {
      en: 'Your block “does not defer”, or loads at the wrong moment. Ask these before anything else.',
      ar: 'البلوك بتاعك «مش بيتأجل»، أو بيتحمّل في الوقت الغلط. اسأل الأسئلة دي قبل أي حاجة.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Does <code>ng build</code> list a lazy chunk for the component? If not, it is used somewhere outside a <code>@defer</code> block.',
                  ar: '<b>1.</b> <code>ng build</code> طالع فيه lazy chunk للـ component؟ لو لأ، يبقى مستخدم في حتة برّه بلوك <code>@defer</code>.' },
      { t: 'chk', en: '<b>2.</b> In the same file, is the class used only inside <code>@defer</code>: no query, no second tag outside the block?',
                  ar: '<b>2.</b> في نفس الملف، الكلاس مستخدم جوه <code>@defer</code> بس: مفيش query، ولا تاج تاني برّه البلوك؟' },
      { t: 'chk', en: '<b>3.</b> Is there a main trigger, not only a <code>prefetch</code> one? And if it is <code>when</code>, is the signal called with <code>()</code>?',
                  ar: '<b>3.</b> فيه trigger أساسي، مش <code>prefetch</code> بس؟ ولو هو <code>when</code>، الـ signal متنادية بـ <code>()</code>؟' },
      { t: 'chk', en: '<b>4.</b> For <code>viewport</code>, <code>interaction</code> or <code>hover</code>: is there a placeholder with one root element, or a <code>#reference</code> spelled the same in both places?',
                  ar: '<b>4.</b> لـ <code>viewport</code> أو <code>interaction</code> أو <code>hover</code>: فيه placeholder بـ element رئيسي واحد، أو <code>#reference</code> مكتوب نفس الشكل في المكانين؟' },
      { t: 'chk', en: '<b>5.</b> Does the page jump when it loads? Give the placeholder’s class the height of the real content.',
                  ar: '<b>5.</b> الصفحة بتنطّ لما يتحمّل؟ ادّي كلاس الـ placeholder ارتفاع المحتوى الحقيقي.' }
    ]
  }
  ]
};
