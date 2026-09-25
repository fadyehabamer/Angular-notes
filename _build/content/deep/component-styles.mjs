/* ==================================================================
   Component styles, name by name — the companion page after the
   "why your CSS does not reach the child" topic. One running example
   (a shop showing product cards) followed through every file, every
   name coloured by who owns it. Names list: inline, below.
   ================================================================== */

/* a name in running text, coloured like the code and linked on hover */
const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

const OUT = 'what the browser receives';

export default {
  topic: 'component-styles',
  tab: 'Component styles, name by name — The Angular Signal',
  title: { en: 'Component styles, name by name', ar: 'ستايلات الـ component، اسم اسم' },
  say: {
    en: 'The page for when a class name works in one file and does nothing in another. One shop with product cards, followed through the template, the stylesheet and the parent, every name coloured by who owns it. Then what breaks, silently, when you rename each one.',
    ar: 'الصفحة دي لما اسم class يشتغل في ملف ومايعملش حاجة في ملف تاني. محل واحد فيه كروت منتجات، ماشيين وراه في التمبلت والـ stylesheet والأب، وكل اسم ملوّن حسب صاحبه. وبعدين إيه اللي بيبوظ، في صمت، لما تغيّر كل واحد.'
  },
  lead: {
    en: 'The idea is simple: <b>a component’s CSS only styles that component’s own template.</b> The confusing part is the names. A class name is a promise between two files, and nothing checks it. <code>sold-out</code> and <code>soldOut</code> sit on the same line and are two different names. <code>:host</code> looks like a class you made and is not. This page sorts out which names are yours, which are CSS’s, which are Angular’s, and which files have to agree.',
    ar: 'الفكرة بسيطة: <b>الـ CSS بتاع الـ component بيستايل التمبلت بتاعه هو بس.</b> اللي بيلخبط هو الأسماء. اسم الـ class وعد بين ملفين، ومحدش بيراجعه. <code>sold-out</code> و<code>soldOut</code> قاعدين على نفس السطر وهما اسمين مختلفين. و<code>:host</code> شكلها class انت عاملها وهي مش كده. الصفحة دي بتفرز أنهي أسماء بتاعتك، وأنهي بتاعة CSS، وأنهي بتاعة أنجولار، وأنهي ملفات لازم تتفق.'
  },

  names: {
    note: {
      en: 'In CSS almost every name you invent is orange, because a stylesheet is always read together with another file: the template that puts the class on, or the file that sets the variable. And none of these links is checked by the compiler. Anything starting with <code>:</code> or <code>::</code> is CSS’s or Angular’s.',
      ar: 'في الـ CSS تقريبًا كل اسم بتخترعه برتقاني، عشان الـ stylesheet دايمًا بيتقري مع ملف تاني: التمبلت اللي بيحط الـ class، أو الملف اللي بيحط قيمة الـ variable. ولا رابط من دول الـ compiler بيراجعه. وأي حاجة بتبدأ بـ <code>:</code> أو <code>::</code> بتاعة CSS أو أنجولار.'
    },
    names: [
      /* --- shared: two files must agree --- */
      { n:'title', k:'pub',
        w:{ en:'A CSS class. <code>class="title"</code> in the template and <code>.title</code> in the stylesheet must match. Nothing checks it.',
            ar:'CSS class. <code>class="title"</code> في التمبلت و<code>.title</code> في الـ stylesheet لازم يطابقوا. ومحدش بيراجع.' } },
      { n:'sold-out', k:'pub',
        w:{ en:'A CSS class the template switches on and off. The stylesheet’s <code>.sold-out</code> must use the same spelling.',
            ar:'CSS class التمبلت بيشغّلها ويطفيها. الـ <code>.sold-out</code> اللي في الـ stylesheet لازم تتكتب بنفس الطريقة.' } },
      { n:'featured', k:'pub',
        w:{ en:'A class the <b>parent</b> puts on <code>&lt;app-card&gt;</code>, read by the card’s <code>:host(.featured)</code>. Two components, one word.',
            ar:'class الـ <b>أب</b> بيحطها على <code>&lt;app-card&gt;</code>، والكارت بيقراها بـ <code>:host(.featured)</code>. اتنين components، كلمة واحدة.' } },
      { n:'dark-theme', k:'pub',
        w:{ en:'A class on <code>&lt;body&gt;</code>, styled in <code>styles.css</code> and read by the card’s <code>:host-context()</code>.',
            ar:'class على <code>&lt;body&gt;</code>، متستايلة في <code>styles.css</code> والكارت بيقراها بـ <code>:host-context()</code>.' } },
      { n:'shelf', k:'pub',
        w:{ en:'A CSS class in the shop: its template and its stylesheet must match.', ar:'CSS class في المحل: التمبلت والـ stylesheet بتوعه لازم يطابقوا.' } },
      { n:'--brand', k:'pub',
        w:{ en:'Your CSS variable, set in <code>styles.css</code> and read by the card. Rename it everywhere it is set and read.',
            ar:'الـ CSS variable بتاعتك، بتتحط في <code>styles.css</code> والكارت بيقراها. غيّرها في كل حتة بتتحط فيها وبتتقري.' } },
      { n:'--radius', k:'pub',
        w:{ en:'Your CSS variable, set globally and read by the card.', ar:'الـ CSS variable بتاعتك، بتتحط global والكارت بيقراها.' } },
      { n:'--card-title', k:'pub',
        w:{ en:'The card’s theming knob. The card reads it, the shop sets it. The one clean way through the wall.',
            ar:'زرار التحكم في شكل الكارت. الكارت بيقراها، والمحل بيحطها. الطريقة النضيفة الوحيدة لعبور الحيطة.' } },
      { n:'app-card', k:'pub',
        w:{ en:'The card’s selector: the tag the shop types. <code>:host</code> styles this tag without naming it.',
            ar:'الـ selector بتاع الكارت: التاج اللي المحل بيكتبه. و<code>:host</code> بيستايل التاج ده من غير ما يكتب اسمه.' } },
      { n:'Card', k:'pub',
        w:{ en:'The card’s class. The shop imports it by this name.', ar:'كلاس الكارت. المحل بيعمله import بالاسم ده.' } },
      { n:'app-shop', k:'pub',
        w:{ en:'The shop’s selector. Whoever shows the shop types this tag.', ar:'الـ selector بتاع المحل. أي حد بيعرض المحل بيكتب التاج ده.' } },
      { n:'Shop', k:'pub',
        w:{ en:'The shop’s class. Whoever uses it imports it by this name.', ar:'كلاس المحل. أي حد بيستخدمه بيعمله import بالاسم ده.' } },
      { n:'product', k:'pub', re:'(?<![\\w$/-])product(?![\\w$-])',
        w:{ en:'The card’s input. The shop sets it with <code>[product]</code>.', ar:'الـ input بتاع الكارت. المحل بيحطه بـ <code>[product]</code>.' } },
      { n:'Product', k:'pub',
        w:{ en:'Your data type. Every file that imports it follows a rename.', ar:'نوع الداتا بتاعك. أي ملف بيعمله import بيتغير معاه.' } },
      { n:'id', k:'pub', w:{ en:'A field on your data, read by <code>track</code>.', ar:'field في الداتا بتاعتك، و<code>track</code> بيقراه.' } },
      { n:'name', k:'pub', w:{ en:'A field on your data, printed by the card. (Not a CSS class.)', ar:'field في الداتا بتاعتك، والكارت بيطبعه. (مش CSS class.)' } },
      { n:'price', k:'pub', w:{ en:'A field on your data.', ar:'field في الداتا بتاعتك.' } },
      { n:'stock', k:'pub', w:{ en:'A field on your data, read by <code>soldOut</code>.', ar:'field في الداتا بتاعتك، و<code>soldOut</code> بيقراه.' } },
      { n:'promoted', k:'pub',
        w:{ en:'A field on your data. The shop turns it into the <code>featured</code> class.', ar:'field في الداتا بتاعتك. المحل بيحوّله للـ class اللي اسمها <code>featured</code>.' } },

      /* --- yours, private to one component --- */
      { n:'soldOut', k:'mine', re:'(?<![\\w$.-])soldOut(?![\\w$-])',
        w:{ en:'A TypeScript <code>computed</code>, read by the card’s own template. Not a CSS class: it only decides <b>whether</b> <code>sold-out</code> is on.',
            ar:'<code>computed</code> في TypeScript، والتمبلت بتاع الكارت بيقراه. مش CSS class: هو بيقرر بس <b>هل</b> <code>sold-out</code> تتحط ولا لأ.' } },
      { n:'products', k:'mine', w:{ en:'The shop’s own signal.', ar:'الـ signal بتاعة المحل نفسه.' } },
      { n:'item', k:'mine', w:{ en:'The loop variable. Local to the <code>@for</code>.', ar:'متغير اللوب. محلي جوه الـ <code>@for</code>.' } },

      /* --- Angular's, CSS's --- */
      { n:':host', k:'ng',
        w:{ en:'Angular’s selector for the component’s own tag, <code>&lt;app-card&gt;</code>. <code>:host(.x)</code> means “when my tag has class x”.',
            ar:'الـ selector بتاع أنجولار لتاج الـ component نفسه، <code>&lt;app-card&gt;</code>. و<code>:host(.x)</code> معناها «لما التاج بتاعي يبقى عليه class x».' } },
      { n:':host-context', k:'ng',
        w:{ en:'Angular’s selector for “when something above me has this class”.', ar:'الـ selector بتاع أنجولار لـ «لما حاجة فوقي يبقى عليها الـ class ده».' } },
      { n:'::ng-deep', k:'ng',
        w:{ en:'Angular’s deprecated escape hatch that switches scoping off for the rest of the rule.', ar:'مخرج الطوارئ بتاع أنجولار (deprecated) اللي بيقفل الـ scoping لباقي الـ rule.' } },
      { n:':root', k:'ng', w:{ en:'CSS’s selector for <code>&lt;html&gt;</code>: the usual home for global variables.', ar:'selector بتاع CSS لـ <code>&lt;html&gt;</code>: المكان المعتاد للـ variables العامة.' } },
      { n:'var', k:'ng', w:{ en:'CSS’s function that reads a custom property. The second value is the fallback.', ar:'الـ function بتاعة CSS اللي بتقرا custom property. القيمة التانية هي الـ fallback.' } },
      { n:'_nghost-ng-c123', k:'ng',
        w:{ en:'An attribute Angular generates and stamps on the host tag. You never type it; the number changes.',
            ar:'attribute أنجولار بيعمله لوحده وبيختمه على تاج الـ host. انت عمرك ما بتكتبه؛ والرقم بيتغير.' } },
      { n:'_ngcontent-ng-c123', k:'ng',
        w:{ en:'An attribute Angular stamps on every element of the card’s template and adds to every selector in the card’s CSS.',
            ar:'attribute أنجولار بيختمه على كل عنصر في تمبلت الكارت، وبيضيفه لكل selector في الـ CSS بتاع الكارت.' } },
      { n:'class', k:'ng', re:'(?<=\\[)class(?=[.\\]])',
        w:{ en:'Angular’s class binding: <code>[class.x]</code> for one class. The class name after the dot is yours.',
            ar:'الـ binding بتاع أنجولار للـ class: <code>[class.x]</code> لـ class واحدة. اسم الـ class بعد النقطة بتاعك.' } },
      { n:'style', k:'ng', re:'(?<=\\[)style(?=\\.)',
        w:{ en:'Angular’s style binding. The CSS property after it is CSS’s; a last part like <code>.px</code> or <code>.%</code> is the unit.',
            ar:'الـ binding بتاع أنجولار للـ style. الـ property اللي بعده بتاعة CSS؛ وجزء أخير زي <code>.px</code> أو <code>.%</code> هو الوحدة.' } },
      { n:'styleUrl', k:'ng',
        w:{ en:'An option key: the path to this component’s own CSS file. Only styles listed here get scoped to it.',
            ar:'مفتاح إعداد: مسار ملف الـ CSS الخاص بالـ component ده. الستايلات اللي هنا بس هي اللي بتتقفل عليه.' } },
      { n:'styleUrls', k:'ng', w:{ en:'The older array form of <code>styleUrl</code>. Still works.', ar:'شكل الـ array القديم من <code>styleUrl</code>. لسه شغال.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key: the path to the HTML file.', ar:'مفتاح إعداد: مسار ملف الـ HTML.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The tag name you put in it is yours.', ar:'مفتاح إعداد. اسم التاج اللي بتحطه فيه بتاعك.' } },
      { n:'imports', k:'ng', w:{ en:'An option key: what this template may use.', ar:'مفتاح إعداد: التمبلت ده مسموحله يستخدم إيه.' } },
      { n:'encapsulation', k:'ng', w:{ en:'An option key that picks the scoping mode.', ar:'مفتاح إعداد بيختار طريقة الـ scoping.' } },
      { n:'ViewEncapsulation', k:'ng', w:{ en:'Angular’s enum of scoping modes.', ar:'الـ enum بتاع أنجولار لطرق الـ scoping.' } },
      { n:'Emulated', k:'ng', w:{ en:'The default mode: the attribute trick.', ar:'الطريقة الافتراضية: حيلة الـ attribute.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator for a component.', ar:'الـ decorator بتاع أنجولار للـ component.' } },
      { n:'input', k:'ng', re:'(?<![\\w$<(-])input(?=[.(<,])',
        w:{ en:'Angular’s function that creates an input.', ar:'الـ function بتاعة أنجولار اللي بتعمل input.' } },
      { n:'required', k:'ng', w:{ en:'Part of <code>input.required</code>.', ar:'جزء من <code>input.required</code>.' } },
      { n:'computed', k:'ng', w:{ en:'Angular’s derived signal.', ar:'الـ signal المشتقة بتاعة أنجولار.' } },
      { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
      { n:'@for', k:'ng', w:{ en:'Angular’s loop block.', ar:'بلوك اللوب بتاع أنجولار.' } },
      { n:'track', k:'ng', w:{ en:'Part of <code>@for</code>.', ar:'جزء من <code>@for</code>.' } },
      { n:'ngClass', k:'ng', w:{ en:'The older directive for toggling several classes.', ar:'الـ directive القديم لتشغيل وقفل كذا class.' } },
      { n:'NgClass', k:'ng', w:{ en:'The class behind <code>ngClass</code>, which you had to import.', ar:'الكلاس اللي ورا <code>ngClass</code>، وكان لازم تعمله import.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One card on screen, six stops', ar: 'كارت واحد على الشاشة، ست محطات' },
    lead: {
      en: 'A shop shows a shelf of product cards. A sold-out product has its name crossed out, and a promoted one gets a red border. Follow how one card gets its look, and notice which file writes each name:',
      ar: 'محل بيعرض رف كروت منتجات. المنتج اللي خلص اسمه بيتشطب، والمنتج المميز بياخد برواز أحمر. امشي ورا كارت واحد وهو بياخد شكله، وخد بالك أنهي ملف بيكتب كل اسم:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'card.component.ts', lang: 'ts', who: { en: 'card · links its CSS', ar: 'الكارت · بيربط الـ CSS بتاعه' },
          code: ["styleUrl: './card.component.css',"],
          say: { en: `${ng('styleUrl')} is Angular’s key; the path is yours. This line is what makes the stylesheet <b>belong</b> to the card. Everything in that file will only ever style the card’s own template.`,
                 ar: `${ng('styleUrl')} مفتاح أنجولار؛ والمسار بتاعك. السطر ده هو اللي بيخلّي الـ stylesheet <b>ملك</b> الكارت. كل حاجة في الملف ده هتستايل تمبلت الكارت بس، ومفيش غيره.` } },
        { file: 'card.component.html', lang: 'html', who: { en: 'card · names the classes', ar: 'الكارت · بيسمّي الـ classes' },
          code: ['<h3 class="title" [class.sold-out]="soldOut()">{{ product().name }}</h3>'],
          say: { en: `Three different kinds of name on one line. ${pub('title')} and ${pub('sold-out')} are CSS class names you picked. ${ng('class')} in <code>[class.…]</code> is Angular’s. ${mine('soldOut')} on the right is a TypeScript value that decides whether the class is on.`,
                 ar: `تلات أنواع أسماء على سطر واحد. ${pub('title')} و${pub('sold-out')} أسماء CSS classes انت اخترتها. و${ng('class')} في <code>[class.…]</code> بتاعة أنجولار. و${mine('soldOut')} اللي على اليمين قيمة TypeScript بتقرر الـ class تتحط ولا لأ.` } },
        { file: 'card.component.css', lang: 'css', who: { en: 'card · styles them', ar: 'الكارت · بيستايلهم' },
          code: ['.title { margin: 0; color: var(--card-title, inherit); }', '.sold-out { opacity: 0.5; text-decoration: line-through; }'],
          say: { en: `The stylesheet types the same class names again. Nothing connects them except the spelling. ${ng('var')} is CSS’s; ${pub('--card-title')} is a variable name you invented so the parent can change the colour later.`,
                 ar: `الـ stylesheet بيكتب نفس أسماء الـ classes تاني. مفيش حاجة بتربطهم غير الكتابة. ${ng('var')} بتاعة CSS؛ و${pub('--card-title')} اسم variable انت اخترعته عشان الأب يقدر يغيّر اللون بعدين.` } },
        { file: OUT, lang: 'html', who: { en: 'the browser · the trick', ar: 'المتصفح · الحيلة' },
          code: ['<app-card _nghost-ng-c123 class="featured">', '  <h3 _ngcontent-ng-c123 class="title">Wireless mouse</h3>', '</app-card>'],
          say: { en: `Angular stamps an attribute like ${ng('_ngcontent-ng-c123')} on every element of the card’s template, and quietly rewrites your rule to <code>.title[_ngcontent-ng-c123]</code>. An <code>h3</code> in another component has a different number, so your rule cannot touch it. You never type these names.`,
                 ar: `أنجولار بيختم attribute زي ${ng('_ngcontent-ng-c123')} على كل عنصر في تمبلت الكارت، وبيعيد كتابة الـ rule بتاعتك في السر لـ <code>.title[_ngcontent-ng-c123]</code>. أي <code>h3</code> في component تاني عليه رقم تاني، فالـ rule بتاعتك مستحيل تلمسه. وانت عمرك ما بتكتب الأسماء دي.` } },
        { file: 'shop.component.html', lang: 'html', who: { en: 'shop · classes the tag', ar: 'المحل · بيحط class على التاج' },
          code: ['<app-card [product]="item" [class.featured]="item.promoted" />'],
          say: { en: `The shop cannot style what is <b>inside</b> the card, but it owns the <code>&lt;app-card&gt;</code> tag itself. So it puts a class on it: ${pub('featured')}, a word you picked. The data field is ${pub('promoted')}: a different name, on purpose.`,
                 ar: `المحل مايقدرش يستايل اللي <b>جوه</b> الكارت، بس هو صاحب تاج <code>&lt;app-card&gt;</code> نفسه. فبيحط عليه class: ${pub('featured')}، كلمة انت اخترتها. والـ field اللي في الداتا اسمه ${pub('promoted')}: اسم تاني، عن قصد.` } },
        { file: 'card.component.css', lang: 'css', who: { en: 'card · reacts to its tag', ar: 'الكارت · بيرد على التاج بتاعه' },
          code: [':host(.featured) {', '  border-color: var(--brand);', '}'],
          say: { en: `${ng(':host')} is Angular’s name for “my own tag”. <code>:host(.featured)</code> means “when my tag has the class ${pub('featured')}”. That word must match what the shop wrote. ${pub('--brand')} comes from the global <code>styles.css</code>.`,
                 ar: `${ng(':host')} اسم أنجولار لـ «التاج بتاعي». و<code>:host(.featured)</code> معناها «لما التاج بتاعي يبقى عليه الـ class اللي اسمها ${pub('featured')}». الكلمة دي لازم تطابق اللي المحل كتبه. و${pub('--brand')} جاية من <code>styles.css</code> العام.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'A class name is a promise between a template and a stylesheet <b>of the same component</b>. The only things that cross from one component to another are classes on the <b>host tag</b> (read with <code>:host(…)</code>) and <b>CSS variables</b>. And no compiler checks any of these names.',
        ar: 'اسم الـ class وعد بين تمبلت وstylesheet <b>لنفس الـ component</b>. والحاجات الوحيدة اللي بتعدّي من component لتاني هي الـ classes اللي على <b>تاج الـ host</b> (بتتقري بـ <code>:host(…)</code>) و<b>الـ CSS variables</b>. ومفيش compiler بيراجع أي اسم من دول.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Parent or child?', ar: 'الأب ولا الابن؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'Most “why doesn’t my style apply?” questions end the moment you ask: <b>which component’s template writes this element?</b> Its stylesheet is the only one that can style it.',
      ar: 'أغلب أسئلة «ليه الستايل مش بيتطبق؟» بتخلص أول ما تسأل: <b>تمبلت أنهي component هو اللي كاتب العنصر ده؟</b> الـ stylesheet بتاعه هو الوحيد اللي يقدر يستايله.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>class="title"</code>', 'card <code>.html</code>', 'the card', `you pick ${pub('title')}`],
            ar: ['<code>class="title"</code>', '<code>.html</code> الكارت', 'الكارت', `انت بتختار ${pub('title')}`] },
          { en: ['<code>.title { … }</code>', 'card <code>.css</code>', 'the card', 'copies the template'],
            ar: ['<code>.title { … }</code>', '<code>.css</code> الكارت', 'الكارت', 'بينسخ التمبلت'] },
          { en: ['<code>[class.sold-out]="soldOut()"</code>', 'card <code>.html</code>', 'the card', `${ng('class')} is Angular’s; ${pub('sold-out')} is a CSS name you pick; ${mine('soldOut')} is a TS name you pick`],
            ar: ['<code>[class.sold-out]="soldOut()"</code>', '<code>.html</code> الكارت', 'الكارت', `${ng('class')} بتاعة أنجولار؛ و${pub('sold-out')} اسم CSS بتختاره؛ و${mine('soldOut')} اسم TS بتختاره`] },
          { en: ['<code>:host(.featured) { … }</code>', 'card <code>.css</code>', 'the card', `${ng(':host')} is Angular’s; ${pub('featured')} must match the parents`],
            ar: ['<code>:host(.featured) { … }</code>', '<code>.css</code> الكارت', 'الكارت', `${ng(':host')} بتاعة أنجولار؛ و${pub('featured')} لازم تطابق الآباء`] },
          { en: ['<code>[class.featured]="item.promoted"</code>', 'shop <code>.html</code>', 'the parent', `copies ${pub('featured')} from the card’s CSS`],
            ar: ['<code>[class.featured]="item.promoted"</code>', '<code>.html</code> المحل', 'الأب', `بينسخ ${pub('featured')} من الـ CSS بتاع الكارت`] },
          { en: ['<code>--brand: #e40035;</code>', '<code>styles.css</code>', 'global', `you pick ${pub('--brand')}; every <code>var(--brand)</code> copies it`],
            ar: ['<code>--brand: #e40035;</code>', '<code>styles.css</code>', 'عام', `انت بتختار ${pub('--brand')}؛ وكل <code>var(--brand)</code> بتنسخه`] },
          { en: ['<code>--card-title: navy;</code>', 'shop <code>.css</code>', 'the parent', `copies ${pub('--card-title')} from the card’s CSS`],
            ar: ['<code>--card-title: navy;</code>', '<code>.css</code> المحل', 'الأب', `بينسخ ${pub('--card-title')} من الـ CSS بتاع الكارت`] },
        ] },
      { t: 'ul',
        en: ['<b>A stylesheet styles the template it is linked to with <code>styleUrl</code>.</b> Not the parent’s template, not the children’s. Put the rule where the element is written.',
             '<b>The host tag is the one element two components share.</b> The parent writes <code>&lt;app-card class="…"&gt;</code> and styles it from outside; the card styles the same tag from inside with <code>:host</code>.',
             '<b>Variables cross the wall; class names do not.</b> A <code>--variable</code> set on any ancestor is inherited by everything inside, whatever component wrote it.'],
        ar: ['<b>الـ stylesheet بيستايل التمبلت اللي مربوط بيه بـ <code>styleUrl</code>.</b> مش تمبلت الأب، ولا تمبلتس الأبناء. حط الـ rule مكان ما العنصر اتكتب.',
             '<b>تاج الـ host هو العنصر الوحيد اللي اتنين components بيشوفوه.</b> الأب بيكتب <code>&lt;app-card class="…"&gt;</code> وبيستايله من برّه؛ والكارت بيستايل نفس التاج من جوه بـ <code>:host</code>.',
             '<b>الـ variables بتعدّي الحيطة؛ أسماء الـ classes لأ.</b> أي <code>--variable</code> متحطوطة على أي جد، كل اللي جواه بيورثها، مهما كان مين الـ component اللي كتبه.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All eight files, every name coloured', ar: 'التمن ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same shop, complete. Hover a coloured name to light up everywhere else it appears. Then press <b>Rename test</b>: every class and variable you own turns into a made-up word, in the template and the stylesheet together, and the page still looks the same.',
      ar: 'نفس المحل، كامل. قف بالماوس على أي اسم ملوّن وهتنوّر كل الأماكن التانية اللي هو فيها. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: كل class وvariable بتوعك هيبقوا كلمات عشوائية، في التمبلت والـ stylesheet مع بعض، والصفحة لسه شكلها زي ما هو.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'product.ts', lang: 'ts', tag: { en: 'the data', ar: 'الداتا' }, code: [
        'export interface Product {',
        '  id: number;',
        '  name: string;',
        '  price: number;',
        '  stock: number;',
        '  promoted: boolean;',
        '}' ] },
      { t: 'code', name: 'card.component.ts', lang: 'ts', tag: { en: 'child', ar: 'الابن' }, code: [
        "import { Component, computed, input } from '@angular/core';",
        "import { Product } from './product';",
        '',
        '@Component({',
        "  selector: 'app-card',",
        "  templateUrl: './card.component.html',",
        "  styleUrl: './card.component.css',",
        '})',
        'export class Card {',
        '  readonly product = input.required<Product>();',
        '  readonly soldOut = computed(() => this.product().stock === 0);',
        '}' ] },
      { t: 'code', name: 'card.component.html', lang: 'html', tag: { en: 'child', ar: 'الابن' }, code: [
        '<h3 class="title" [class.sold-out]="soldOut()">{{ product().name }}</h3>',
        '<p>{{ product().price }} EGP</p>' ] },
      { t: 'code', name: 'card.component.css', lang: 'css', tag: { en: 'child, scoped', ar: 'الابن، مقفول عليه' }, code: [
        ':host {',
        '  display: block;',
        '  padding: 12px;',
        '  border: 1px solid #ddd;',
        '  border-radius: var(--radius);',
        '}',
        '',
        ':host(.featured) {',
        '  border-color: var(--brand);',
        '}',
        '',
        ':host-context(.dark-theme) .title {',
        '  color: white;',
        '}',
        '',
        '.title { margin: 0; color: var(--card-title, inherit); }',
        '.sold-out { opacity: 0.5; text-decoration: line-through; }' ] },
      { t: 'code', name: 'shop.component.ts', lang: 'ts', tag: { en: 'parent', ar: 'الأب' }, code: [
        "import { Component, signal } from '@angular/core';",
        "import { Card } from './card.component';",
        "import { Product } from './product';",
        '',
        '@Component({',
        "  selector: 'app-shop',",
        '  imports: [Card],',
        "  templateUrl: './shop.component.html',",
        "  styleUrl: './shop.component.css',",
        '})',
        'export class Shop {',
        '  readonly products = signal<Product[]>([',
        "    { id: 1, name: 'Wireless mouse', price: 450, stock: 12, promoted: true },",
        "    { id: 2, name: 'USB-C cable', price: 120, stock: 0, promoted: false },",
        '  ]);',
        '}' ] },
      { t: 'code', name: 'shop.component.html', lang: 'html', tag: { en: 'parent', ar: 'الأب' }, code: [
        '<section class="shelf">',
        '  @for (item of products(); track item.id) {',
        '    <app-card [product]="item" [class.featured]="item.promoted" />',
        '  }',
        '</section>' ] },
      { t: 'code', name: 'shop.component.css', lang: 'css', tag: { en: 'parent, scoped', ar: 'الأب، مقفول عليه' }, code: [
        '.shelf {',
        '  display: grid;',
        '  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));',
        '  gap: 16px;',
        '  --card-title: navy;',
        '}' ] },
      { t: 'code', name: 'styles.css', lang: 'css', tag: { en: 'global, not scoped', ar: 'عام، مش مقفول' }, code: [
        ':root {',
        '  --brand: #e40035;',
        '  --radius: 8px;',
        '}',
        '',
        'body { margin: 0; font-family: system-ui, sans-serif; }',
        '',
        '.dark-theme { background: #111; color: #eee; }' ] },
      { t: 'p',
        en: 'Something puts <code>class="dark-theme"</code> on <code>&lt;body&gt;</code>, for example <code>index.html</code> or a theme switch. The card only needs to know the word.',
        ar: 'فيه حاجة بتحط <code>class="dark-theme"</code> على <code>&lt;body&gt;</code>، زي <code>index.html</code> أو زرار تغيير الثيم. الكارت محتاج يعرف الكلمة بس.' },
      { t: 'nmtable' }
    ]
  },

  /* ------------------------------------------------------------ 4 */
  {
    id: 'rename',
    kicker: { en: 'Is it OK to change it?', ar: 'ينفع أغيّره؟' },
    title: { en: 'What breaks when you rename each name', ar: 'إيه اللي بيبوظ لما تغيّر كل اسم' },
    lead: {
      en: 'Here the usual rule turns upside down. TypeScript names give you compile errors, as always. <b>CSS names never do.</b> A class or a variable spelled differently on two sides is valid CSS and valid HTML, so the style just quietly disappears.',
      ar: 'هنا القاعدة المعتادة بتتقلب. أسماء TypeScript بتديك compile errors زي دايمًا. <b>أسماء الـ CSS عمرها ما بتدي.</b> class أو variable مكتوبين مختلف في ناحيتين ده CSS سليم وHTML سليم، فالستايل بيختفي في هدوء وخلاص.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [`${pub('title')}, ${pub('sold-out')} (classes)`, 'the card’s template <b>and</b> its stylesheet', '<b>No error.</b> The element keeps the class, no rule matches it, the style is gone.'],
            ar: [`${pub('title')} و${pub('sold-out')} (classes)`, 'تمبلت الكارت <b>و</b>الـ stylesheet بتاعه', '<b>مفيش error.</b> العنصر لسه عليه الـ class، ومفيش rule بتطابقها، والستايل راح.'] },
          { en: [pub('featured'), 'the card’s <code>:host(.featured)</code> and every parent that sets it', '<b>No error.</b> The border just stays grey.'],
            ar: [pub('featured'), '<code>:host(.featured)</code> بتاعة الكارت وكل أب بيحطها', '<b>مفيش error.</b> البرواز بيفضل رمادي وخلاص.'] },
          { en: [`${pub('--brand')}, ${pub('--radius')}, ${pub('--card-title')}`, 'every place that sets it and every <code>var(…)</code> that reads it', '<b>No error.</b> <code>var()</code> uses its fallback if you gave one, like <code>inherit</code> in <code>--card-title</code>. Without a fallback the property acts as if it had not been set.'],
            ar: [`${pub('--brand')} و${pub('--radius')} و${pub('--card-title')}`, 'كل مكان بيحطها وكل <code>var(…)</code> بتقراها', '<b>مفيش error.</b> <code>var()</code> بتستخدم الـ fallback لو ادّيتها واحد، زي <code>inherit</code> في <code>--card-title</code>. ومن غير fallback الـ property بتتصرف كأنها ماتحطتش أصلًا.'] },
          { en: [`${pub('dark-theme')}, ${pub('shelf')}`, 'every template and stylesheet that uses it', '<b>No error.</b> Same story.'],
            ar: [`${pub('dark-theme')} و${pub('shelf')}`, 'كل تمبلت وstylesheet بيستخدمها', '<b>مفيش error.</b> نفس الحكاية.'] },
          { en: [mine('soldOut') + ' (TS value)', 'the card’s template: <code>soldOut()</code>', 'Compile error in the card’s template.'],
            ar: [mine('soldOut') + ' (قيمة TS)', 'تمبلت الكارت: <code>soldOut()</code>', 'Compile error في تمبلت الكارت.'] },
          { en: ['the file <code>card.component.css</code>', 'the <code>styleUrl</code> path', 'Build error: the stylesheet file cannot be found.'],
            ar: ['ملف <code>card.component.css</code>', 'المسار في <code>styleUrl</code>', 'Build error: ملف الـ stylesheet مش لاقيه.'] },
          { en: [`${pub('app-card')}, ${pub('Card')}, ${pub('product')}`, 'the shop’s tag, <code>imports</code> and <code>[product]</code>', 'Compile error in the shop.'],
            ar: [`${pub('app-card')} و${pub('Card')} و${pub('product')}`, 'التاج اللي عند المحل و<code>imports</code> و<code>[product]</code>', 'Compile error عند المحل.'] },
          { en: [`${ng(':host')}, ${ng('var')}, ${ng('styleUrl')}`, 'nothing: you cannot rename these', 'They are Angular’s and CSS’s words.'],
            ar: [`${ng(':host')} و${ng('var')} و${ng('styleUrl')}`, 'ولا حاجة: دول مينفعش يتغيروا', 'دي كلمات أنجولار والـ CSS.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b> above the files and hover <code>featured</code>: it lights up in the shop’s template and in the card’s stylesheet, two different components. That pair is exactly what you must rename together, by hand, because no tool will tell you.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b> فوق الملفات وقف على <code>featured</code>: هتنوّر في تمبلت المحل وفي الـ stylesheet بتاع الكارت، اتنين components مختلفين. الاتنين دول بالظبط اللي لازم تغيّرهم مع بعض، بإيدك، عشان مفيش أداة هتقولك.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتاعتك' },
    title: { en: 'The fixed names: CSS’s, Angular’s, generated', ar: 'الأسماء الثابتة: بتاعة CSS، وبتاعة أنجولار، والمتولدة' },
    lead: {
      en: 'A stylesheet mixes three owners. Your class and variable names, CSS’s own words, and a few words only Angular understands.',
      ar: 'الـ stylesheet فيه تلات أصحاب مع بعض. أسماء الـ classes والـ variables بتاعتك، وكلمات CSS نفسها، وكام كلمة أنجولار بس اللي بيفهمها.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Word', 'Owner', 'What it means'], ar: ['الكلمة', 'صاحبها', 'معناها'] },
        rows: [
          { en: [`${ng(':host')}, <code>:host(.x)</code>`, 'Angular', 'The component’s own tag. What goes inside the brackets is a normal selector with your names.'],
            ar: [`${ng(':host')}، <code>:host(.x)</code>`, 'أنجولار', 'تاج الـ component نفسه. اللي جوه القوسين selector عادي بأسماءك.'] },
          { en: [ng(':host-context'), 'Angular', 'Match when an ancestor has the selector in brackets.'],
            ar: [ng(':host-context'), 'أنجولار', 'طابق لما حاجة فوق يبقى عليها الـ selector اللي بين القوسين.'] },
          { en: [ng('::ng-deep'), 'Angular (deprecated)', 'Turn scoping off for the rest of the rule. Avoid.'],
            ar: [ng('::ng-deep'), 'أنجولار (deprecated)', 'اقفل الـ scoping لباقي الـ rule. ابعد عنها.'] },
          { en: [`${ng('_nghost-ng-c123')}, ${ng('_ngcontent-ng-c123')}`, 'Angular, generated', 'The scoping attributes. Never type them: the number is generated and can change between builds.'],
            ar: [`${ng('_nghost-ng-c123')} و${ng('_ngcontent-ng-c123')}`, 'أنجولار، متولدة', 'attributes الـ scoping. أوعى تكتبهم: الرقم بيتولد لوحده وممكن يتغير من build لـ build.'] },
          { en: [`${ng(':root')}, ${ng('var')}, <code>display</code>, <code>border-color</code>, <code>inherit</code>`, 'CSS', 'Standard CSS. The same in any website.'],
            ar: [`${ng(':root')} و${ng('var')} و<code>display</code> و<code>border-color</code> و<code>inherit</code>`, 'CSS', 'CSS عادي. زي أي موقع.'] },
          { en: [`${ng('styleUrl')}, ${ng('encapsulation')}, ${ng('ViewEncapsulation')}`, 'Angular', 'Component options. The values after them are paths or Angular’s enum.'],
            ar: [`${ng('styleUrl')} و${ng('encapsulation')} و${ng('ViewEncapsulation')}`, 'أنجولار', 'إعدادات الـ component. القيم اللي بعدها مسارات أو الـ enum بتاع أنجولار.'] },
          { en: [`${ng('class')} and ${ng('style')} in <code>[class.x]</code>, <code>[style.width.px]</code>`, 'Angular', 'Binding prefixes. After <code>style.</code> comes a CSS property (CSS’s name), then an optional unit.'],
            ar: [`${ng('class')} و${ng('style')} في <code>[class.x]</code> و<code>[style.width.px]</code>`, 'أنجولار', 'بادئات ربط. بعد <code>style.</code> بتيجي CSS property (اسمها بتاع CSS)، وبعدها وحدة لو عايز.'] },
        ] },
      { t: 'code', name: 'card.component.html · style bindings', lang: 'html', tag: { en: 'only the value is yours', ar: 'القيمة بس اللي بتاعتك' }, code: [
        '<h3 [style.color]="soldOut() ? \'gray\' : null">{{ product().name }}</h3>',
        '<h3 [style.font-size.px]="20">{{ product().name }}</h3>',
        '<h3 [style.fontSize.px]="20">{{ product().name }}</h3>   <!-- the same -->' ] },
      { t: 'p',
        en: 'CSS property names can be written dash-case or camelCase in a style binding; Angular accepts both. <code>null</code> removes the style.',
        ar: 'أسماء الـ CSS properties ممكن تتكتب dash-case أو camelCase في الـ style binding؛ أنجولار بيقبل الاتنين. و<code>null</code> بتشيل الستايل.' },
      { t: 'code', name: 'card.component.ts · encapsulation', lang: 'ts', tag: { en: 'the default, spelled out', ar: 'الافتراضي، مكتوب' }, code: [
        '@Component({',
        "  selector: 'app-card',",
        "  styleUrl: './card.component.css',",
        '  encapsulation: ViewEncapsulation.Emulated,   // the default: no need to write it',
        '})' ] }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'CSS accepts any name. These habits make a mismatch less likely, and the one about variables is how components are meant to talk about looks.',
      ar: 'الـ CSS بيقبل أي اسم. العادات دي بتقلل احتمال عدم التطابق، والعادة بتاعة الـ variables هي الطريقة اللي الـ components المفروض تتكلم بيها عن الشكل.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['a CSS class', '<code>sold-out</code>, <code>title</code>', '<code>soldOut</code>, <code>SoldOut</code>', 'dash-case is the CSS habit, and it keeps class names visibly different from your TypeScript names.'],
            ar: ['CSS class', '<code>sold-out</code>، <code>title</code>', '<code>soldOut</code>، <code>SoldOut</code>', 'الـ dash-case هي عادة الـ CSS، وبتخلي أسماء الـ classes باينة إنها مختلفة عن أسماء الـ TypeScript.'] },
          { en: ['a class inside a component', 'short and plain: <code>title</code>', '<code>card__title--big</code>', 'Scoping already stops collisions, so you do not need long unique names like in a global stylesheet.'],
            ar: ['class جوه component', 'قصير وبسيط: <code>title</code>', '<code>card__title--big</code>', 'الـ scoping أصلًا بيمنع التصادم، فمش محتاج أسماء طويلة فريدة زي في stylesheet عام.'] },
          { en: ['a class a parent sets on your tag', 'a state or variant: <code>featured</code>, <code>compact</code>', 'a colour: <code>red</code>', 'Name the meaning; the card decides what it looks like.'],
            ar: ['class الأب بيحطها على التاج بتاعك', 'حالة أو نوع: <code>featured</code>، <code>compact</code>', 'لون: <code>red</code>', 'سمّي المعنى؛ والكارت هو اللي يقرر شكله.'] },
          { en: ['a theming variable', 'component prefix: <code>--card-title</code>', '<code>--color</code>', 'Variables inherit through the whole page, so a generic name can be set by accident from far away.'],
            ar: ['variable للثيم', 'بادئة الـ component: <code>--card-title</code>', '<code>--color</code>', 'الـ variables بتتورث في الصفحة كلها، فالاسم العام ممكن يتحط بالغلط من حتة بعيدة.'] },
          { en: ['a global variable', '<code>--brand</code>, <code>--radius</code>', 'many near-duplicates', 'Keep a small set in <code>styles.css</code> and read them everywhere.'],
            ar: ['variable عامة', '<code>--brand</code>، <code>--radius</code>', 'كتير شبه بعض', 'خلّي مجموعة صغيرة في <code>styles.css</code> واقراها في كل حتة.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Where the spelling is not free', ar: 'فين الكتابة مش براحتك' },
    lead: {
      en: 'Your names are free, but a few rules decide how they must be written.',
      ar: 'أسماءك براحتك، بس فيه كام قاعدة بتقرر لازم تتكتب إزاي.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'Variables need two dashes, and case matters', ar: 'الـ variables محتاجة شرطتين، والحروف الكبيرة فارقة' }, blocks: [
        { t: 'p',
          en: 'CSS decides that a custom property starts with <code>--</code>. After that the name is yours, but it is case-sensitive: <code>--Brand</code> and <code>--brand</code> are two different variables.',
          ar: 'الـ CSS هو اللي قرر إن الـ custom property بتبدأ بـ <code>--</code>. بعد كده الاسم بتاعك، بس الحروف الكبيرة والصغيرة فارقة: <code>--Brand</code> و<code>--brand</code> اتنين variables مختلفين.' }
      ]},
      { t: 'step', n: 'B', title: { en: 'Dashed class names need quotes in an object', ar: 'أسماء الـ classes اللي فيها شرطة محتاجة quotes في الـ object' }, blocks: [
        { t: 'code', name: 'card.component.html · several classes', lang: 'html', tag: { en: 'object form', ar: 'شكل الـ object' }, code: [
          '<h3 [class]="{ title: true, \'sold-out\': soldOut() }">{{ product().name }}</h3>' ] },
        { t: 'p',
          en: `In <code>[class.sold-out]</code> the name needs no quotes. Inside an object it is a JavaScript key, and a key with a dash must be quoted. <code>title</code> has no dash, so it may go without.`,
          ar: `في <code>[class.sold-out]</code> الاسم مش محتاج quotes. جوه object هو key بتاع JavaScript، والـ key اللي فيه شرطة لازم يتحط بين quotes. و<code>title</code> مفيهاش شرطة، فينفع من غيرها.` }
      ]},
      { t: 'step', n: 'C', title: { en: 'The <code>styleUrl</code> path is a real file name', ar: 'مسار <code>styleUrl</code> اسم ملف حقيقي' }, blocks: [
        { t: 'p',
          en: 'The path must point at the file that exists. Rename the file and forget the path, and the build stops with a “cannot find” error. That one, at least, is loud.',
          ar: 'المسار لازم يشاور على الملف الموجود فعلًا. لو غيّرت اسم الملف ونسيت المسار، الـ build بيقف بـ error «مش لاقي». دي على الأقل بتعلّي صوتها.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: '<code>ngClass</code>, <code>styleUrls</code> and <code>::ng-deep</code>', ar: '<code>ngClass</code> و<code>styleUrls</code> و<code>::ng-deep</code>' },
    lead: {
      en: 'Older code writes the same class names in different wrappers. The names themselves, and the rule that template and stylesheet must agree, did not change.',
      ar: 'الكود الأقدم بيكتب نفس أسماء الـ classes في أغلفة تانية. الأسماء نفسها، والقاعدة إن التمبلت والـ stylesheet لازم يتفقوا، ماتغيروش.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'card.component — older style', lang: 'ts', code: [
          '@Component({',
          "  selector: 'app-card',",
          '  imports: [NgClass],',
          "  styleUrls: ['./card.component.css'],",
          '  template: `',
          '    <h3 class="title" [ngClass]="{ \'sold-out\': soldOut() }">…</h3>',
          '  `,',
          '})' ] },
        good: { name: 'card.component — today', lang: 'ts', code: [
          '@Component({',
          "  selector: 'app-card',",
          '',
          "  styleUrl: './card.component.css',",
          '  template: `',
          '    <h3 class="title" [class.sold-out]="soldOut()">…</h3>',
          '  `,',
          '})' ] } },
      { t: 'p',
        en: 'The other old habit is reaching into a child with <code>::ng-deep</code>. It is deprecated, and once it pierces the wall the rule applies far more widely than you meant. The modern answer is a variable the child reads:',
        ar: 'العادة القديمة التانية إنك تمد إيدك جوه الابن بـ <code>::ng-deep</code>. دي deprecated، وأول ما تخترق الحيطة الـ rule بتتطبق على حاجات أكتر بكتير من اللي كنت عايزها. الحل الحديث variable الابن بيقراها:' },
      { t: 'pair',
        bad:  { name: 'shop.component.css — older style', lang: 'css', code: [
          ':host ::ng-deep .title {',
          '  color: navy;',
          '}' ] },
        good: { name: 'shop.component.css — today', lang: 'css', code: [
          '.shelf {',
          '  --card-title: navy;',
          '}' ] } }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, and says nothing', ar: 'مش بيعمل حاجة، ومش بيقول حاجة' },
    title: { en: 'Mistakes that fail silently', ar: 'غلطات بتفشل في صمت' },
    lead: {
      en: 'Every mistake on this list is valid CSS. The browser applies what matches and ignores the rest, without a word.',
      ar: 'كل غلطة في الليستة دي CSS سليم. المتصفح بيطبق اللي بيطابق وبيتجاهل الباقي، من غير ولا كلمة.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'Styling the child’s class from the parent', ar: 'تستايل class بتاعة الابن من الأب' }, blocks: [
        { t: 'pair',
          bad:  { name: 'shop.component.css', lang: 'css', code: ['.title { color: navy; }'] },
          good: { name: 'shop.component.css', lang: 'css', code: ['.shelf { --card-title: navy; }'] } },
        { t: 'p', en: 'The <code>h3.title</code> is written in the <b>card’s</b> template, so it carries the card’s attribute, not the shop’s. The shop’s rule becomes <code>.title[_ngcontent-…shop…]</code> and never matches. Set a variable the card reads instead.',
                  ar: 'الـ <code>h3.title</code> مكتوب في تمبلت <b>الكارت</b>، فعليه الـ attribute بتاع الكارت، مش بتاع المحل. الـ rule بتاعة المحل بتبقى <code>.title[_ngcontent-…shop…]</code> وعمرها ما بتطابق. حط variable الكارت بيقراها بدل كده.' }
      ]},
      { t: 'step', n: '2', title: { en: 'The TypeScript name used as the class name', ar: 'اسم الـ TypeScript مستخدم كاسم الـ class' }, blocks: [
        { t: 'pair',
          bad:  { name: 'card.component.html', lang: 'html', code: ['<h3 class="title" [class.soldOut]="soldOut()">…</h3>'] },
          good: { name: 'card.component.html', lang: 'html', code: ['<h3 class="title" [class.sold-out]="soldOut()">…</h3>'] } },
        { t: 'p', en: 'The left side names the CSS class; the right side is the TS value. Writing <code>soldOut</code> on both sides puts a class called <code>soldOut</code> on the heading, while the stylesheet waits for <code>sold-out</code>.',
                  ar: 'الناحية الشمال بتسمّي الـ CSS class؛ واليمين قيمة الـ TS. لو كتبت <code>soldOut</code> في الناحيتين، هتتحط class اسمها <code>soldOut</code> على العنوان، والـ stylesheet مستني <code>sold-out</code>.' }
      ]},
      { t: 'step', n: '3', title: { en: 'A space after <code>:host</code>', ar: 'مسافة بعد <code>:host</code>' }, blocks: [
        { t: 'pair',
          bad:  { name: 'card.component.css', lang: 'css', code: [':host .featured {', '  border-color: var(--brand);', '}'] },
          good: { name: 'card.component.css', lang: 'css', code: [':host(.featured) {', '  border-color: var(--brand);', '}'] } },
        { t: 'p', en: 'With a space, it means “an element with class <code>featured</code> <b>inside</b> my tag”. There is none. With brackets, it means “my tag itself has the class”.',
                  ar: 'بالمسافة، معناها «عنصر عليه class <code>featured</code> <b>جوه</b> التاج بتاعي». ومفيش. وبالقوسين، معناها «التاج بتاعي نفسه عليه الـ class».' }
      ]},
      { t: 'step', n: '4', title: { en: 'A variable spelled two ways', ar: 'variable مكتوبة بطريقتين' }, blocks: [
        { t: 'pair',
          bad:  { name: 'shop.component.css', lang: 'css', code: ['.shelf { --cardTitle: navy; }'] },
          good: { name: 'shop.component.css', lang: 'css', code: ['.shelf { --card-title: navy; }'] } },
        { t: 'p', en: 'The card reads <code>--card-title</code>. Nobody set that one, so <code>var()</code> falls back to <code>inherit</code> and the title keeps its normal colour.',
                  ar: 'الكارت بيقرا <code>--card-title</code>. ومحدش حط دي، فـ <code>var()</code> بترجع للـ fallback <code>inherit</code> والعنوان بيفضل بلونه العادي.' }
      ]},
      { t: 'step', n: '5', title: { en: 'Forgetting <code>display</code> on <code>:host</code>', ar: 'نسيان <code>display</code> على <code>:host</code>' }, blocks: [
        { t: 'pair',
          bad:  { name: 'card.component.css', lang: 'css', code: [':host {', '  width: 240px;', '}'] },
          good: { name: 'card.component.css', lang: 'css', code: [':host {', '  display: block;', '  width: 240px;', '}'] } },
        { t: 'p', en: 'Not a naming mistake, but it looks like one. A custom tag like <code>&lt;app-card&gt;</code> is <code>inline</code> by default, and inline elements ignore <code>width</code>. The rule matched; it just had no effect.',
                  ar: 'مش غلطة أسماء، بس شكلها كده. التاج المتألف زي <code>&lt;app-card&gt;</code> بيبقى <code>inline</code> افتراضيًا، والعناصر الـ inline بتتجاهل <code>width</code>. الـ rule طابقت؛ بس مالهاش تأثير.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it does nothing', ar: 'لما مايعملش حاجة' },
    title: { en: 'Five questions, in this order', ar: 'خمس أسئلة، بالترتيب ده' },
    lead: {
      en: 'Your style “does not apply”. Ask these before adding <code>!important</code> or <code>::ng-deep</code>.',
      ar: 'الستايل بتاعك «مش بيتطبق». اسأل الأسئلة دي قبل ما تزوّد <code>!important</code> أو <code>::ng-deep</code>.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Which component’s template writes this element? Is your rule in <b>that</b> component’s stylesheet?',
                  ar: '<b>1.</b> تمبلت أنهي component هو اللي كاتب العنصر ده؟ الـ rule بتاعتك في الـ stylesheet بتاع <b>الـ component ده</b>؟' },
      { t: 'chk', en: '<b>2.</b> Is the class spelled exactly the same in the template and the CSS: dashes, capitals, no TS name by mistake?',
                  ar: '<b>2.</b> الـ class مكتوبة بالظبط نفس الشكل في التمبلت والـ CSS: الشرط، والحروف الكبيرة، ومفيش اسم TS بالغلط؟' },
      { t: 'chk', en: '<b>3.</b> Styling the component’s own tag? Use <code>:host</code> or <code>:host(.x)</code> without a space, and give it a <code>display</code>.',
                  ar: '<b>3.</b> بتستايل تاج الـ component نفسه؟ استخدم <code>:host</code> أو <code>:host(.x)</code> من غير مسافة، وادّيله <code>display</code>.' },
      { t: 'chk', en: '<b>4.</b> Using a variable? Is it set on an ancestor of the element, with <code>--</code> and the same spelling and case?',
                  ar: '<b>4.</b> بتستخدم variable؟ متحطوطة على حاجة فوق العنصر، بـ <code>--</code> وبنفس الكتابة والحروف؟' },
      { t: 'chk', en: '<b>5.</b> In DevTools: does the element have the class? Is your rule listed, and is it crossed out by a stronger one?',
                  ar: '<b>5.</b> في الـ DevTools: العنصر عليه الـ class؟ الـ rule بتاعتك ظاهرة، ولا متشطبة عشان فيه واحدة أقوى منها؟' }
    ]
  }
  ]
};
