/* ==================================================================
   [class] and [style], name by name — the deep dive after the
   built-in-directives topic. One running example (a product badge:
   its data, class, template and stylesheet) followed through every
   file. Model: content/deep/inputs-outputs.mjs.
   ================================================================== */

const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

export default {
  topic: 'built-in-directives',
  tab: '[class] and [style], name by name — The Angular Signal',
  title: { en: '<code>[class]</code> and <code>[style]</code>, name by name', ar: '<code>[class]</code> و<code>[style]</code>، اسم اسم' },
  say: {
    en: 'The page for when <code>[class.sold-out]="soldOut()"</code> looks like three names glued together. It is: one is the browser’s, one is shared with your stylesheet, one is your component’s. One badge followed through four files, then what breaks when you rename each part.',
    ar: 'الصفحة دي للي شايف <code>[class.sold-out]="soldOut()"</code> كأنها تلات أسماء لازقين في بعض. وهي فعلًا كده: واحد بتاع المتصفح، وواحد متشارك مع الـ stylesheet بتاعك، وواحد بتاع الـ component بتاعك. بادج واحد ماشيين وراه في أربع ملفات، وبعدين إيه اللي بيبوظ لما تغيّر كل حتة.'
  },
  lead: {
    en: 'The idea is simple: <b>your data decides which CSS classes and styles an element gets.</b> The confusing part is the names. One binding like <code>[class.sold-out]="soldOut()"</code> holds a word of the browser’s, a CSS class name your stylesheet must repeat, and a name from your component. And the word after the dot means something different for <code>class</code> than for <code>style</code>. This page untangles them.',
    ar: 'الفكرة بسيطة: <b>الداتا بتاعتك هي اللي بتقرر العنصر ياخد أنهي CSS classes وأنهي styles.</b> اللي بيلخبط هو الأسماء. binding واحد زي <code>[class.sold-out]="soldOut()"</code> جواه كلمة بتاعة المتصفح، واسم CSS class الـ stylesheet بتاعك لازم يكرره، واسم من الـ component بتاعك. والكلمة اللي بعد النقطة معناها مع <code>class</code> غير معناها مع <code>style</code>. الصفحة دي بتفك الربطة دي.'
  },

  names: {
    note: {
      en: 'The orange CSS class names (<code>sold-out</code>, <code>promo</code>, <code>badge</code>, <code>bar</code>) are the dangerous ones: the template and the stylesheet must spell them the same, and <b>nothing checks that for you</b>. Green names are your component’s. Blue ones belong to Angular, HTML or CSS.',
      ar: 'أسماء الـ CSS classes البرتقاني (<code>sold-out</code> و<code>promo</code> و<code>badge</code> و<code>bar</code>) هي الخطيرة: التمبلت والـ stylesheet لازم يكتبوها زي بعض، و<b>محدش بيراجع ده بدالك</b>. الأسماء الخضرا بتاعة الـ component بتاعك. والزرقا بتاعة أنجولار أو HTML أو CSS.'
    },
    names: [
      /* --- shared: two files must agree --- */
      { n:'sold-out', k:'pub',
        w:{ en:'Your CSS class name. The template adds it; the stylesheet styles it. Rename both, or the style silently stops applying.',
            ar:'اسم الـ CSS class بتاعك. التمبلت بيزوّده؛ والـ stylesheet بيدّيه الشكل. غيّر الاتنين، وإلا الشكل هيبطل يتطبق من غير ما حد يقولك.' } },
      { n:'promo', k:'pub',
        w:{ en:'Your CSS class name, shared with the stylesheet.', ar:'اسم الـ CSS class بتاعك، متشارك مع الـ stylesheet.' } },
      { n:'badge', k:'pub', re:'(?<![\\w$/-])badge(?![\\w$-])',
        w:{ en:'Your CSS class name, written as plain <code>class="badge"</code> and styled as <code>.badge</code>.', ar:'اسم الـ CSS class بتاعك، مكتوب <code>class="badge"</code> عادي، وشكله متعرّف في <code>.badge</code>.' } },
      { n:'bar', k:'pub',
        w:{ en:'Your CSS class name for the stock bar.', ar:'اسم الـ CSS class بتاعك لشريط المخزون.' } },
      { n:'product', k:'pub', re:'(?<![\\w$/-])product(?![\\w$-])',
        w:{ en:'The badge’s input. The parent sets it with <code>[product]</code>.', ar:'الـ input بتاع البادج. الأب بيحطه بـ <code>[product]</code>.' } },
      { n:'Product', k:'pub', only:['ts'],
        w:{ en:'Your data type. Every file that imports it follows a rename.', ar:'نوع الداتا بتاعك. أي ملف بيعمله import بيتغير معاه.' } },
      { n:'name', k:'pub', w:{ en:'A field on your data.', ar:'field في الداتا بتاعتك.' } },
      { n:'stock', k:'pub', w:{ en:'A field on your data: how many are left.', ar:'field في الداتا بتاعتك: فاضل كام.' } },
      { n:'featured', k:'pub',
        w:{ en:'A field on your data. It is not the CSS class; the CSS class is <code>promo</code>.', ar:'field في الداتا بتاعتك. ومش هو الـ CSS class؛ الـ CSS class اسمها <code>promo</code>.' } },
      { n:'Badge', k:'pub', only:['ts'],
        w:{ en:'The component’s class. Whoever shows it lists it in <code>imports</code>.', ar:'كلاس الـ component. أي حد بيعرضه بيكتبه في <code>imports</code>.' } },
      { n:'app-badge', k:'pub',
        w:{ en:'The badge’s selector: the tag the parent types.', ar:'الـ selector بتاع البادج: التاج اللي الأب بيكتبه.' } },

      /* --- yours, private to one component --- */
      { n:'soldOut', k:'mine',
        w:{ en:'A computed in the badge. Only its own template reads it. Not the same name as the CSS class <code>sold-out</code>, just similar.',
            ar:'computed في البادج. التمبلت بتاعه بس اللي بيقراه. ومش نفس اسم الـ CSS class <code>sold-out</code>، بس شبهه.' } },
      { n:'isFeatured', k:'mine', w:{ en:'A computed in the badge.', ar:'computed في البادج.' } },
      { n:'stockLevel', k:'mine',
        w:{ en:'A computed in the badge: a plain number. The unit lives in the binding, not here.', ar:'computed في البادج: رقم عادي. الوحدة مكتوبة في الـ binding، مش هنا.' } },

      /* --- Angular's, HTML's, CSS's --- */
      { n:'class', k:'ng', only:['html'], re:'(?<![\\w$-])class(?=[.=]|\\]=)',
        w:{ en:'The HTML <code>class</code> attribute. <code>[class.x]</code> and <code>[class]</code> are Angular’s ways to bind it.', ar:'الـ attribute <code>class</code> بتاع HTML. و<code>[class.x]</code> و<code>[class]</code> طرق أنجولار إنه يربطه.' } },
      { n:'style', k:'ng', only:['html'], re:'(?<![\\w$-])style(?=[.=]|\\]=)',
        w:{ en:'The HTML <code>style</code> attribute. After the dot comes a CSS property, not a name of yours.', ar:'الـ attribute <code>style</code> بتاع HTML. وبعد النقطة بييجي CSS property، مش اسم بتاعك.' } },
      { n:'width', k:'ng', only:['html'],
        w:{ en:'A CSS property. The browser owns the spelling.', ar:'CSS property. المتصفح هو صاحب الكتابة.' } },
      { n:'attr', k:'ng', w:{ en:'Angular’s prefix for binding an HTML attribute.', ar:'البادئة بتاعة أنجولار لربط attribute في HTML.' } },
      { n:'aria-label', k:'ng', w:{ en:'An HTML attribute, read by screen readers.', ar:'attribute في HTML، بتقراه برامج قراءة الشاشة.' } },
      { n:'opacity', k:'ng', only:['css'], w:{ en:'A CSS property.', ar:'CSS property.' } },
      { n:'ngClass', k:'ng', w:{ en:'The older class directive. Needs <code>NgClass</code> in <code>imports</code>.', ar:'الـ directive القديم للـ classes. محتاج <code>NgClass</code> في <code>imports</code>.' } },
      { n:'ngStyle', k:'ng', w:{ en:'The older style directive. Needs <code>NgStyle</code> in <code>imports</code>.', ar:'الـ directive القديم للـ styles. محتاج <code>NgStyle</code> في <code>imports</code>.' } },
      { n:'NgClass', k:'ng', w:{ en:'The class you import to use <code>[ngClass]</code>.', ar:'الكلاس اللي بتعمله import عشان تستخدم <code>[ngClass]</code>.' } },
      { n:'NgStyle', k:'ng', w:{ en:'The class you import to use <code>[ngStyle]</code>.', ar:'الكلاس اللي بتعمله import عشان تستخدم <code>[ngStyle]</code>.' } },
      { n:'input', k:'ng', re:'(?<![\\w$<(-])input(?=[.(<,])', w:{ en:'Angular’s function that creates an input.', ar:'الـ function بتاعة أنجولار اللي بتعمل input.' } },
      { n:'required', k:'ng', w:{ en:'Part of <code>input.required</code>.', ar:'جزء من <code>input.required</code>.' } },
      { n:'computed', k:'ng', w:{ en:'Angular’s derived signal.', ar:'الـ signal المشتقة بتاعة أنجولار.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator.', ar:'الـ decorator بتاع أنجولار.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The string after it is yours.', ar:'مفتاح إعداد. النص اللي بعده بتاعك.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key: which file is the template.', ar:'مفتاح إعداد: أنهي ملف هو التمبلت.' } },
      { n:'styleUrl', k:'ng', w:{ en:'An option key: which stylesheet belongs to this component, and only to it.', ar:'مفتاح إعداد: أنهي stylesheet تبع الـ component ده، وليه هو بس.' } },
      { n:'imports', k:'ng', w:{ en:'An option key: what this template uses.', ar:'مفتاح إعداد: التمبلت ده بيستخدم إيه.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One product, five stops', ar: 'منتج واحد، خمس محطات' },
    lead: {
      en: 'A shop badge. When a product is sold out, the badge fades. A thin bar under it shows how much stock is left. Follow a product from its data to its looks:',
      ar: 'بادج في محل. لما المنتج يخلص، البادج بيبهت. وتحته شريط رفيع بيوضح فاضل قد إيه في المخزن. امشي ورا منتج من الداتا بتاعته لحد شكله:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'product.ts', lang: 'ts', who: { en: 'the data', ar: 'الداتا' },
          code: ['stock: number;'],
          say: { en: `Your data has a field ${pub('stock')}. Every file that reads it types this exact name.`,
                 ar: `الداتا بتاعتك فيها field اسمه ${pub('stock')}. أي ملف بيقراه بيكتب الاسم ده بالظبط.` } },
        { file: 'badge.ts', lang: 'ts', who: { en: 'class · decides', ar: 'الكلاس · بيقرر' },
          code: ['readonly soldOut = computed(() => this.product().stock === 0);'],
          say: { en: `The class turns data into a yes/no. ${mine('soldOut')} is a name you picked, used only by this component. ${ng('computed')} is Angular’s.`,
                 ar: `الكلاس بيحوّل الداتا لآه/لأ. و${mine('soldOut')} اسم انت اخترته، والـ component ده بس اللي بيستخدمه. و${ng('computed')} بتاعة أنجولار.` } },
        { file: 'badge.html', lang: 'html', who: { en: 'template · binds', ar: 'التمبلت · بيربط' },
          code: ['<span class="badge" [class.sold-out]="soldOut()">'],
          say: { en: `Three owners in one binding. ${ng('class')} is HTML’s attribute. ${pub('sold-out')} is <b>your CSS class name</b>, which the stylesheet must repeat. ${mine('soldOut')} in the quotes is your computed. When it is true, Angular adds the class; when false, it removes it.`,
                 ar: `تلات أصحاب في binding واحد. ${ng('class')} الـ attribute بتاع HTML. و${pub('sold-out')} <b>اسم الـ CSS class بتاعك</b>، والـ stylesheet لازم يكرره. و${mine('soldOut')} اللي بين علامات التنصيص هو الـ computed بتاعك. لما يبقى صح أنجولار بيزوّد الـ class؛ ولما يبقى غلط بيشيلها.` } },
        { file: 'badge.css', lang: 'css', who: { en: 'stylesheet · styles', ar: 'الـ stylesheet · بيدّي الشكل' },
          code: ['.sold-out { opacity: 0.5; }'],
          say: { en: `The stylesheet spells ${pub('sold-out')} again. This is the pair nobody checks: misspell one side and the badge simply never fades. ${ng('opacity')} is a CSS property, the browser’s word.`,
                 ar: `الـ stylesheet بيكتب ${pub('sold-out')} تاني. ودي الجوز اللي محدش بيراجعه: اكتب ناحية غلط والبادج ببساطة عمره ما هيبهت. و${ng('opacity')} CSS property، كلمة المتصفح.` } },
        { file: 'badge.html', lang: 'html', who: { en: 'template · sizes', ar: 'التمبلت · بيحدد المقاس' },
          code: ['<div class="bar" [style.width.%]="stockLevel()"></div>'],
          say: { en: `Now the dot means something else. After ${ng('style')} comes ${ng('width')}, a <b>CSS property</b>, not a name of yours. Then <code>%</code>, the unit. ${mine('stockLevel')} is your number, with no unit in it.`,
                 ar: `هنا النقطة معناها حاجة تانية. بعد ${ng('style')} بييجي ${ng('width')}، <b>CSS property</b>، مش اسم بتاعك. وبعدين <code>%</code>، الوحدة. و${mine('stockLevel')} الرقم بتاعك، من غير وحدة جواه.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'In <code>[class.sold-out]="soldOut()"</code>: <code>class</code> is HTML’s, <code>sold-out</code> is shared with your CSS file, <code>soldOut</code> is your component’s. In <code>[style.width.%]="stockLevel()"</code>: <code>style</code>, <code>width</code> and <code>%</code> are fixed, and only <code>stockLevel</code> is yours.',
        ar: 'في <code>[class.sold-out]="soldOut()"</code>: <code>class</code> بتاعة HTML، و<code>sold-out</code> متشاركة مع ملف الـ CSS بتاعك، و<code>soldOut</code> بتاعة الـ component بتاعك. وفي <code>[style.width.%]="stockLevel()"</code>: <code>style</code> و<code>width</code> و<code>%</code> ثابتين، و<code>stockLevel</code> بس اللي بتاعك.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Class, template or stylesheet?', ar: 'الكلاس ولا التمبلت ولا الـ stylesheet؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'Here the “other side” is not another component. It is your stylesheet. The template and the CSS file are the two files that must agree.',
      ar: 'هنا «الناحية التانية» مش component تاني. هي الـ stylesheet بتاعك. التمبلت وملف الـ CSS هما الملفين اللي لازم يتفقوا.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>readonly soldOut = computed(…)</code>', '<code>badge.ts</code>', 'you', `you pick ${mine('soldOut')}`],
            ar: ['<code>readonly soldOut = computed(…)</code>', '<code>badge.ts</code>', 'انت', `انت بتختار ${mine('soldOut')}`] },
          { en: ['<code>[class.sold-out]</code>', '<code>badge.html</code>', 'you', `${ng('class')} is HTML’s; you pick ${pub('sold-out')}`],
            ar: ['<code>[class.sold-out]</code>', '<code>badge.html</code>', 'انت', `${ng('class')} بتاعة HTML؛ وانت بتختار ${pub('sold-out')}`] },
          { en: ['<code>.sold-out { … }</code>', '<code>badge.css</code>', 'you', `must copy ${pub('sold-out')} from the template`],
            ar: ['<code>.sold-out { … }</code>', '<code>badge.css</code>', 'انت', `لازم ينسخ ${pub('sold-out')} من التمبلت`] },
          { en: ['<code>="soldOut()"</code>', '<code>badge.html</code>', 'you', `must copy ${mine('soldOut')} from the class`],
            ar: ['<code>="soldOut()"</code>', '<code>badge.html</code>', 'انت', `لازم ينسخ ${mine('soldOut')} من الكلاس`] },
          { en: ['<code>[style.width.%]</code>', '<code>badge.html</code>', 'you', `nobody: ${ng('style')}, ${ng('width')} and <code>%</code> are fixed`],
            ar: ['<code>[style.width.%]</code>', '<code>badge.html</code>', 'انت', `محدش: ${ng('style')} و${ng('width')} و<code>%</code> ثابتين`] },
          { en: ['<code>[attr.aria-label]</code>', '<code>badge.html</code>', 'you', `nobody: ${ng('attr')} is Angular’s, ${ng('aria-label')} is HTML’s`],
            ar: ['<code>[attr.aria-label]</code>', '<code>badge.html</code>', 'انت', `محدش: ${ng('attr')} بتاعة أنجولار، و${ng('aria-label')} بتاعة HTML`] },
        ] },
      { t: 'ul',
        en: ['<b>After <code>class.</code> comes your word. After <code>style.</code> comes the browser’s.</b> <code>[class.sold-out]</code> names a CSS class you invented. <code>[style.width]</code> names a CSS property that already exists.',
             '<b>Inside the quotes is always your component.</b> Whatever the left side is, the right side is an expression over your class: <code>soldOut()</code>, <code>stockLevel()</code>, <code>product().name</code>.',
             '<b>The stylesheet belongs to the component.</b> <code>styleUrl</code> links <code>badge.css</code> to this component only. A <code>.sold-out</code> rule in some other component’s CSS will not reach the badge.'],
        ar: ['<b>بعد <code>class.</code> بتيجي كلمتك. وبعد <code>style.</code> بتيجي كلمة المتصفح.</b> <code>[class.sold-out]</code> بتسمّي CSS class انت اخترعتها. و<code>[style.width]</code> بتسمّي CSS property موجودة أصلًا.',
             '<b>اللي جوه علامات التنصيص دايمًا من الـ component بتاعك.</b> مهما كانت الناحية الشمال، الناحية اليمين expression على الكلاس بتاعك: <code>soldOut()</code>، <code>stockLevel()</code>، <code>product().name</code>.',
             '<b>الـ stylesheet تبع الـ component.</b> <code>styleUrl</code> بتربط <code>badge.css</code> بالـ component ده بس. وقاعدة <code>.sold-out</code> في CSS بتاع component تاني مش هتوصل للبادج.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All four files, every name coloured', ar: 'الأربع ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same example, complete. Hover a coloured name to light up everywhere else it appears, including the stylesheet. Then press <b>Rename test</b>: every name you own turns into a made-up word, the browser’s and Angular’s words stay put, and it all still works.',
      ar: 'نفس المثال، كامل. قف بالماوس على أي اسم ملوّن وهتنوّر كل الأماكن التانية اللي هو فيها، والـ stylesheet كمان. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: كل اسم بتاعك هيبقى كلمة عشوائية، وكلمات المتصفح وأنجولار هتفضل مكانها، وكله لسه شغال.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'product.ts', lang: 'ts', tag: { en: 'the data', ar: 'الداتا' }, code: [
        'export interface Product {',
        '  name: string;',
        '  stock: number;',
        '  featured: boolean;',
        '}' ] },
      { t: 'code', name: 'badge.ts', lang: 'ts', tag: { en: 'decides', ar: 'بيقرر' }, code: [
        "import { Component, computed, input } from '@angular/core';",
        "import { Product } from './product';",
        '',
        '@Component({',
        "  selector: 'app-badge',",
        "  templateUrl: './badge.html',",
        "  styleUrl: './badge.css',",
        '})',
        'export class Badge {',
        '  readonly product = input.required<Product>();',
        '',
        '  readonly soldOut = computed(() => this.product().stock === 0);',
        '  readonly isFeatured = computed(() => this.product().featured);',
        '  readonly stockLevel = computed(() => Math.min(this.product().stock, 100));',
        '}' ] },
      { t: 'code', name: 'badge.html', lang: 'html', tag: { en: 'binds', ar: 'بيربط' }, code: [
        '<span class="badge"',
        '      [class.sold-out]="soldOut()"',
        '      [class.promo]="isFeatured()"',
        '      [attr.aria-label]="product().name">',
        '  {{ product().name }}',
        '</span>',
        '<div class="bar" [style.width.%]="stockLevel()"></div>' ] },
      { t: 'code', name: 'badge.css', lang: 'css', tag: { en: 'styles', ar: 'بيدّي الشكل' }, code: [
        '.badge    { padding: 2px 8px; border-radius: 999px; }',
        '.sold-out { opacity: 0.5; text-decoration: line-through; }',
        '.promo    { border: 2px solid gold; }',
        '.bar      { height: 4px; background: teal; }' ] },
      { t: 'nmtable' }
    ]
  },

  /* ------------------------------------------------------------ 4 */
  {
    id: 'rename',
    kicker: { en: 'Is it OK to change it?', ar: 'ينفع أغيّره؟' },
    title: { en: 'What breaks when you rename each name', ar: 'إيه اللي بيبوظ لما تغيّر كل اسم' },
    lead: {
      en: 'Names between the class and the template are checked by the compiler. Names between the template and the stylesheet are <b>not</b>. That is the whole danger of this topic.',
      ar: 'الأسماء اللي بين الكلاس والتمبلت الـ compiler بيراجعها. لكن الأسماء اللي بين التمبلت والـ stylesheet <b>لأ</b>. ودي كل خطورة الموضوع ده.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [pub('sold-out') + ', ' + pub('promo') + ', ' + pub('badge') + ', ' + pub('bar') + ' (CSS classes)', 'the stylesheet: <code>.sold-out</code> and friends', '<b>No error at all.</b> The class is added to the element, but no rule matches it, so nothing changes on screen.'],
            ar: [pub('sold-out') + ' و' + pub('promo') + ' و' + pub('badge') + ' و' + pub('bar') + ' (CSS classes)', 'الـ stylesheet: <code>.sold-out</code> وأخواتها', '<b>مفيش أي error.</b> الـ class بتتزوّد على العنصر، بس مفيش قاعدة بتطابقها، فمفيش حاجة بتتغير على الشاشة.'] },
          { en: [`${mine('soldOut')}, ${mine('isFeatured')}, ${mine('stockLevel')}`, 'their uses in <code>badge.html</code>', 'Compile error in the template.'],
            ar: [`${mine('soldOut')} و${mine('isFeatured')} و${mine('stockLevel')}`, 'استخدامهم في <code>badge.html</code>', 'Compile error في التمبلت.'] },
          { en: [pub('product') + ' (the input)', 'the parent’s <code>[product]</code>, and this template', 'Compile error.'],
            ar: [pub('product') + ' (الـ input)', '<code>[product]</code> عند الأب، والتمبلت ده', 'Compile error.'] },
          { en: [`${pub('Product')}, ${pub('name')}, ${pub('stock')}, ${pub('featured')}`, 'every file that imports the type or reads the field', 'Compile error.'],
            ar: [`${pub('Product')} و${pub('name')} و${pub('stock')} و${pub('featured')}`, 'كل ملف بيعمل import للـ type أو بيقرا الـ field', 'Compile error.'] },
          { en: [pub('app-badge') + ' / ' + pub('Badge'), 'the parent’s tag / its <code>import</code> and <code>imports: [ ]</code>', 'Compile error.'],
            ar: [pub('app-badge') + ' / ' + pub('Badge'), 'التاج عند الأب / الـ <code>import</code> و<code>imports: [ ]</code>', 'Compile error.'] },
          { en: [`${ng('class')}, ${ng('style')}, ${ng('width')}, ${ng('attr')}, ${ng('aria-label')}`, 'nothing: you cannot rename these', 'They are HTML’s, CSS’s and Angular’s. A typo in the CSS property is silent too: see below.'],
            ar: [`${ng('class')} و${ng('style')} و${ng('width')} و${ng('attr')} و${ng('aria-label')}`, 'ولا حاجة: دول مينفعش يتغيروا', 'دول بتوع HTML وCSS وأنجولار. وغلطة إملائية في الـ CSS property صامتة برضه: شوف تحت.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b>. <code>sold-out</code> changes in <code>badge.html</code> and in <code>badge.css</code> at the same time. That is the rename you must do by hand, because no tool will remind you.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b>. <code>sold-out</code> هتتغير في <code>badge.html</code> وفي <code>badge.css</code> في نفس الوقت. ودي التغييرة اللي لازم تعملها بإيدك، عشان مفيش أداة هتفكّرك.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'dot',
    kicker: { en: 'The grammar', ar: 'القواعد' },
    title: { en: 'What goes after the dot', ar: 'إيه اللي بييجي بعد النقطة' },
    lead: {
      en: 'Every one of these bindings has the same shape: <code>[prefix.something]</code>. The prefix decides whether “something” is yours or the browser’s.',
      ar: 'كل الـ bindings دي ليها نفس الشكل: <code>[prefix.something]</code>. والـ prefix هو اللي بيحدد «something» دي بتاعتك ولا بتاعة المتصفح.'
    },
    blocks: [
      { t: 'code', name: 'badge.html · after the dot', lang: 'html', tag: { en: 'three prefixes', ar: 'تلات prefixes' }, code: [
        '<span [class.sold-out]="soldOut()">…</span>        <!-- your CSS class -->',
        '<div [style.width.%]="stockLevel()"></div>           <!-- CSS property, then unit -->',
        '<span [attr.aria-label]="product().name">…</span>   <!-- HTML attribute -->' ] },
      { t: 'tbl',
        head: { en: ['You write', 'After the dot', 'Whose', 'Example'], ar: ['بتكتب', 'بعد النقطة', 'بتاع مين', 'مثال'] },
        rows: [
          { en: ['<code>[class.X]</code>', 'a CSS class name', '<b>yours</b>, shared with the stylesheet', '<code>[class.sold-out]</code>'],
            ar: ['<code>[class.X]</code>', 'اسم CSS class', '<b>بتاعك</b>، متشارك مع الـ stylesheet', '<code>[class.sold-out]</code>'] },
          { en: ['<code>[style.X]</code>', 'a CSS property', 'the browser’s', '<code>[style.color]</code>, <code>[style.font-size]</code>'],
            ar: ['<code>[style.X]</code>', 'CSS property', 'بتاعة المتصفح', '<code>[style.color]</code>، <code>[style.font-size]</code>'] },
          { en: ['<code>[style.X.unit]</code>', 'a CSS property, then a unit', 'both the browser’s', '<code>[style.width.%]</code>, <code>[style.height.px]</code>'],
            ar: ['<code>[style.X.unit]</code>', 'CSS property، وبعدين وحدة', 'الاتنين بتوع المتصفح', '<code>[style.width.%]</code>، <code>[style.height.px]</code>'] },
          { en: ['<code>[attr.X]</code>', 'an HTML attribute', 'HTML’s', '<code>[attr.aria-label]</code>, <code>[attr.colspan]</code>'],
            ar: ['<code>[attr.X]</code>', 'attribute في HTML', 'بتاع HTML', '<code>[attr.aria-label]</code>، <code>[attr.colspan]</code>'] },
          { en: ['<code>[class]</code> / <code>[style]</code>', 'nothing: the value is an object or a string', 'keys follow the same rules', '<code>[class]="{ promo: isFeatured() }"</code>'],
            ar: ['<code>[class]</code> / <code>[style]</code>', 'ولا حاجة: القيمة object أو string', 'المفاتيح بتمشي على نفس القواعد', '<code>[class]="{ promo: isFeatured() }"</code>'] },
        ] },
      { t: 'p',
        en: 'In the object form, the <b>keys</b> are CSS class names (yours) for <code>[class]</code>, or CSS properties (the browser’s) for <code>[style]</code>. A key with a dash needs quotes, or the template does not compile:',
        ar: 'في شكل الـ object، <b>المفاتيح</b> بتبقى أسماء CSS classes (بتاعتك) مع <code>[class]</code>، أو CSS properties (بتاعة المتصفح) مع <code>[style]</code>. والمفتاح اللي فيه شرطة محتاج علامات تنصيص، وإلا التمبلت مش هيعمل compile:' },
      { t: 'code', name: 'badge.html · object form', lang: 'html', tag: { en: 'same names, one binding', ar: 'نفس الأسماء، في binding واحد' }, code: [
        "<span [class]=\"{ 'sold-out': soldOut(), promo: isFeatured() }\">…</span>",
        "<div [style]=\"{ width: stockLevel() + '%' }\"></div>" ] },
      { t: 'note', label: { en: 'Static and bound together', ar: 'الثابت والمربوط مع بعض' },
        en: '<code>class="badge"</code> and <code>[class.sold-out]</code> on the same element work together: Angular adds and removes only the bound class, and leaves <code>badge</code> alone.',
        ar: '<code>class="badge"</code> و<code>[class.sold-out]</code> على نفس العنصر بيشتغلوا مع بعض: أنجولار بيزوّد ويشيل الـ class المربوطة بس، ومبيلمسش <code>badge</code>.' }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتاعتك' },
    title: { en: 'The fixed names', ar: 'الأسماء الثابتة' },
    lead: {
      en: 'Three different owners here: HTML, CSS and Angular. You type all of them exactly.',
      ar: 'فيه تلات أصحاب مختلفين هنا: HTML وCSS وأنجولار. وكلهم بتكتبهم زي ما هما بالظبط.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Name', 'Whose', 'What it is'], ar: ['الاسم', 'بتاع مين', 'هو إيه'] },
        rows: [
          { en: [`${ng('class')}, ${ng('style')}`, 'HTML', 'Attributes every element has. Angular lets you bind them with <code>[ ]</code>.'],
            ar: [`${ng('class')} و${ng('style')}`, 'HTML', 'attributes موجودة في كل عنصر. أنجولار بيخليك تربطها بـ <code>[ ]</code>.'] },
          { en: [`${ng('aria-label')}, <code>colspan</code>`, 'HTML', 'Attributes that are not DOM properties, so they need <code>attr.</code>.'],
            ar: [`${ng('aria-label')}، <code>colspan</code>`, 'HTML', 'attributes مش DOM properties، فمحتاجة <code>attr.</code>.'] },
          { en: [ng('attr'), 'Angular', 'The prefix that means “set this as an HTML attribute”.'],
            ar: [ng('attr'), 'أنجولار', 'البادئة اللي معناها «حطها كـ attribute في HTML».'] },
          { en: [`${ng('width')}, ${ng('opacity')}, <code>color</code>`, 'CSS', 'Properties. <code>font-size</code> keeps its dash inside <code>[style.font-size]</code>.'],
            ar: [`${ng('width')} و${ng('opacity')} و<code>color</code>`, 'CSS', 'properties. و<code>font-size</code> بتفضل بالشرطة جوه <code>[style.font-size]</code>.'] },
          { en: ['<code>px</code>, <code>%</code>, <code>em</code>, <code>rem</code>', 'CSS', 'Units. In the binding name, so your value stays a plain number.'],
            ar: ['<code>px</code>، <code>%</code>، <code>em</code>، <code>rem</code>', 'CSS', 'وحدات. بتتكتب في اسم الـ binding، فالقيمة بتاعتك تفضل رقم عادي.'] },
          { en: [`${ng('ngClass')}, ${ng('ngStyle')}`, 'Angular', 'The older directives, used in the template.'],
            ar: [`${ng('ngClass')} و${ng('ngStyle')}`, 'أنجولار', 'الـ directives القديمة، بتتكتب في التمبلت.'] },
          { en: [`${ng('NgClass')}, ${ng('NgStyle')}`, 'Angular', 'Their class names, which go in <code>imports</code>. Capital N in the <code>.ts</code>, small n in the template.'],
            ar: [`${ng('NgClass')} و${ng('NgStyle')}`, 'أنجولار', 'أسماء الكلاسات بتاعتهم، وبتتكتب في <code>imports</code>. N كبيرة في الـ <code>.ts</code>، وn صغيرة في التمبلت.'] },
          { en: [ng('styleUrl'), 'Angular', 'Links one stylesheet to one component. That is why the CSS class names only need to match inside this component.'],
            ar: [ng('styleUrl'), 'أنجولار', 'بتربط stylesheet واحد بـ component واحد. وعشان كده أسماء الـ CSS classes لازم تطابق جوه الـ component ده بس.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'Angular accepts any CSS class name and any computed name. These habits keep the three files easy to match up.',
      ar: 'أنجولار بيقبل أي اسم CSS class وأي اسم computed. العادات دي بتخلي التلات ملفات سهل تطابقهم.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['a CSS class', '<code>sold-out</code>, <code>is-active</code> (lowercase, dashes)', '<code>soldOut</code>, <code>SoldOut</code>', 'Lowercase with dashes is the usual CSS style. It also makes the class easy to tell apart from the computed <code>soldOut</code>.'],
            ar: ['CSS class', '<code>sold-out</code>، <code>is-active</code> (حروف صغيرة وشرط)', '<code>soldOut</code>، <code>SoldOut</code>', 'الحروف الصغيرة بالشرط هي الشكل المعتاد في CSS. وكمان بتخلي الـ class سهل تفرّقها عن الـ computed <code>soldOut</code>.'] },
          { en: ['a class for a state', '<code>sold-out</code>, <code>promo</code>', '<code>grey</code>, <code>red-border</code>', 'Name the state, not the look. The look can change in the CSS without touching the template.'],
            ar: ['class لحالة', '<code>sold-out</code>، <code>promo</code>', '<code>grey</code>، <code>red-border</code>', 'سمّي الحالة، مش الشكل. الشكل ممكن يتغير في الـ CSS من غير ما تلمس التمبلت.'] },
          { en: ['the condition', '<code>soldOut</code>, <code>isFeatured</code>', 'a long <code>&amp;&amp;</code> / <code>?:</code> in the template', 'Decide in the class, bind a name in the template.'],
            ar: ['الشرط', '<code>soldOut</code>، <code>isFeatured</code>', '<code>&amp;&amp;</code> / <code>?:</code> طويلة في التمبلت', 'قرر في الكلاس، واربط اسم في التمبلت.'] },
          { en: ['a number for a style', '<code>stockLevel</code> (a plain number)', '<code>stockLevelPx</code> holding <code>\'40px\'</code>', 'Keep the unit in the binding: <code>[style.width.%]</code>.'],
            ar: ['رقم لـ style', '<code>stockLevel</code> (رقم عادي)', '<code>stockLevelPx</code> شايل <code>\'40px\'</code>', 'خلي الوحدة في الـ binding: <code>[style.width.%]</code>.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: '<code>ngClass</code> and <code>ngStyle</code> use the same names', ar: '<code>ngClass</code> و<code>ngStyle</code> بيستخدموا نفس الأسماء' },
    lead: {
      en: 'The older directives still work and are not deprecated. Your CSS class names and your computeds are exactly the same. Only Angular’s words change, and you need an import.',
      ar: 'الـ directives القديمة لسه شغالة ومش مهجورة. أسماء الـ CSS classes والـ computeds بتاعتك زي ما هي بالظبط. كلمات أنجولار بس اللي بتتغير، ومحتاج import.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'badge.html — with ngClass', lang: 'html', code: [
          "<span class=\"badge\" [ngClass]=\"{ 'sold-out': soldOut(), promo: isFeatured() }\">",
          '  {{ product().name }}',
          '</span>',
          "<div class=\"bar\" [ngStyle]=\"{ 'width.%': stockLevel() }\"></div>" ] },
        good: { name: 'badge.html — today', lang: 'html', code: [
          '<span class="badge" [class.sold-out]="soldOut()" [class.promo]="isFeatured()">',
          '  {{ product().name }}',
          '</span>',
          '<div class="bar" [style.width.%]="stockLevel()"></div>' ] } },
      { t: 'code', name: 'badge.ts — with ngClass', lang: 'ts', tag: { en: 'the older version also needs this', ar: 'النسخة القديمة محتاجة ده كمان' }, code: [
        "import { NgClass, NgStyle } from '@angular/common';",
        '',
        '@Component({',
        "  selector: 'app-badge',",
        '  imports: [NgClass, NgStyle],',
        "  templateUrl: './badge.html',",
        '})' ] },
      { t: 'p',
        en: `In ${ng('ngStyle')} the unit goes <b>inside the key</b>: <code>'width.%'</code>. In ${ng('style')} bindings it goes in the binding name: <code>[style.width.%]</code>. Same idea, different place.`,
        ar: `في ${ng('ngStyle')} الوحدة بتتكتب <b>جوه المفتاح</b>: <code>'width.%'</code>. وفي bindings الـ ${ng('style')} بتتكتب في اسم الـ binding: <code>[style.width.%]</code>. نفس الفكرة، مكان مختلف.` }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, and says nothing', ar: 'مش بيعمل حاجة، ومش بيقول حاجة' },
    title: { en: 'Mistakes that fail silently (and one that fails confusingly)', ar: 'غلطات بتفشل في صمت (وواحدة بتفشل بشكل ملخبط)' },
    lead: {
      en: 'CSS forgives everything. An unknown class, an unknown property or a missing unit is not an error; it is simply ignored.',
      ar: 'الـ CSS بيسامح في كل حاجة. class مش معروفة، أو property مش معروفة، أو وحدة ناقصة، مش error؛ ببساطة بتتجاهل.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'The template and the stylesheet disagree', ar: 'التمبلت والـ stylesheet مش متفقين' }, blocks: [
        { t: 'pair',
          bad:  { name: 'badge.html', lang: 'html', code: ['<span class="badge" [class.soldout]="soldOut()">'] },
          good: { name: 'badge.html', lang: 'html', code: ['<span class="badge" [class.sold-out]="soldOut()">'] } },
        { t: 'p', en: 'Angular adds <code>soldout</code> to the element exactly as asked. The stylesheet only has <code>.sold-out</code>. No rule matches, so the badge never fades. Open the browser’s element inspector: if the class is there but the style is not, the names disagree.',
                  ar: 'أنجولار بيزوّد <code>soldout</code> على العنصر زي ما طلبت بالظبط. والـ stylesheet فيه <code>.sold-out</code> بس. مفيش قاعدة بتطابق، فالبادج عمره ما هيبهت. افتح الـ inspector في المتصفح: لو الـ class موجودة والشكل مش موجود، يبقى الأسماء مش متفقة.' }
      ]},
      { t: 'step', n: '2', title: { en: 'A typo in the CSS property', ar: 'غلطة إملائية في الـ CSS property' }, blocks: [
        { t: 'pair',
          bad:  { name: 'badge.html', lang: 'html', code: ['<div class="bar" [style.widht.%]="stockLevel()"></div>'] },
          good: { name: 'badge.html', lang: 'html', code: ['<div class="bar" [style.width.%]="stockLevel()"></div>'] } },
        { t: 'p', en: 'Angular does not check CSS property names. It passes <code>widht</code> to the browser, and the browser ignores a property it does not know.',
                  ar: 'أنجولار مش بيراجع أسماء الـ CSS properties. بيبعت <code>widht</code> للمتصفح، والمتصفح بيتجاهل أي property مش عارفها.' }
      ]},
      { t: 'step', n: '3', title: { en: 'A number with no unit', ar: 'رقم من غير وحدة' }, blocks: [
        { t: 'pair',
          bad:  { name: 'badge.html', lang: 'html', code: ['<div class="bar" [style.width]="stockLevel()"></div>'] },
          good: { name: 'badge.html', lang: 'html', code: ['<div class="bar" [style.width.%]="stockLevel()"></div>'] } },
        { t: 'p', en: `${mine('stockLevel')} is a plain number, say <code>40</code>. <code>width: 40</code> is not valid CSS, so the browser drops it and the bar keeps its old width. Put the unit in the binding.`,
                  ar: `${mine('stockLevel')} رقم عادي، مثلًا <code>40</code>. و<code>width: 40</code> مش CSS سليم، فالمتصفح بيرميه والشريط بيفضل على عرضه القديم. حط الوحدة في الـ binding.` }
      ]},
      { t: 'step', n: '4', title: { en: 'Styling the class from the wrong stylesheet', ar: 'إنك تدّي الـ class شكل من الـ stylesheet الغلط' }, blocks: [
        { t: 'pair',
          bad:  { name: 'shop.css', lang: 'css', code: ['/* the parent page’s stylesheet */', '.sold-out { opacity: 0.5; }'] },
          good: { name: 'badge.css', lang: 'css', code: ['/* the badge’s own stylesheet */', '.sold-out { opacity: 0.5; }'] } },
        { t: 'p', en: 'By default, Angular scopes each component’s CSS to that component’s own template. A <code>.sold-out</code> rule in the parent’s stylesheet does not reach the <code>&lt;span&gt;</code> inside the badge. Same name, wrong file. Put the rule next to the template that adds the class.',
                  ar: 'أنجولار بشكل افتراضي بيحصر الـ CSS بتاع كل component على التمبلت بتاعه هو. فقاعدة <code>.sold-out</code> في الـ stylesheet بتاع الأب مش هتوصل للـ <code>&lt;span&gt;</code> اللي جوه البادج. نفس الاسم، بس الملف غلط. حط القاعدة جنب التمبلت اللي بيزوّد الـ class.' }
      ]},
      { t: 'step', n: '5', title: { en: 'The confusing one: <code>[ngClass]</code> without the import', ar: 'الملخبطة: <code>[ngClass]</code> من غير import' }, blocks: [
        { t: 'pair',
          bad:  { name: 'badge.ts — no import', lang: 'ts', code: ['@Component({', "  selector: 'app-badge',", "  templateUrl: './badge.html',", '})'] },
          good: { name: 'badge.ts — with ngClass', lang: 'ts', code: ['@Component({', "  selector: 'app-badge',", '  imports: [NgClass],', "  templateUrl: './badge.html',", '})'] } },
        { t: 'p', en: `This one does give an error, but it points at the wrong thing: “Can’t bind to ‘ngClass’ since it isn’t a known property of ‘span’”. The span is fine. The component is missing ${ng('NgClass')} in its ${ng('imports')}. <code>[class]</code> never has this problem, because it needs no import.`,
                  ar: `دي بتدّي error فعلًا، بس بيشاور على الحاجة الغلط: «Can’t bind to ‘ngClass’ since it isn’t a known property of ‘span’». الـ span مفيهوش حاجة. الـ component ناقصه ${ng('NgClass')} في الـ ${ng('imports')} بتاعته. و<code>[class]</code> عمرها ما بتقع في المشكلة دي، عشان مش محتاجة import.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it does nothing', ar: 'لما مايعملش حاجة' },
    title: { en: 'Five questions, in this order', ar: 'خمس أسئلة، بالترتيب ده' },
    lead: {
      en: 'The style does not show. Open the element in the browser’s inspector, then ask these.',
      ar: 'الشكل مش ظاهر. افتح العنصر في الـ inspector بتاع المتصفح، وبعدين اسأل دول.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Is the class on the element at all? If not, check the condition: does <code>soldOut()</code> really return true, brackets included?',
                  ar: '<b>1.</b> الـ class موجودة على العنصر أصلًا؟ لو لأ، بص على الشرط: <code>soldOut()</code> فعلًا بترجع صح، بالأقواس؟' },
      { t: 'chk', en: '<b>2.</b> If the class is there, is it spelled exactly like the rule in the stylesheet, dash and case included?',
                  ar: '<b>2.</b> لو الـ class موجودة، مكتوبة بالظبط زي القاعدة في الـ stylesheet، بالشرطة والحروف الكبيرة والصغيرة؟' },
      { t: 'chk', en: '<b>3.</b> Is the rule in <b>this</b> component’s stylesheet, the one named in its <code>styleUrl</code>?',
                  ar: '<b>3.</b> القاعدة موجودة في الـ stylesheet بتاع <b>الـ component ده</b>، اللي اسمه مكتوب في <code>styleUrl</code> بتاعه؟' },
      { t: 'chk', en: '<b>4.</b> For a style binding: is the CSS property spelled right, and is the unit in the binding name (<code>.px</code>, <code>.%</code>)?',
                  ar: '<b>4.</b> لو style binding: الـ CSS property مكتوبة صح، والوحدة في اسم الـ binding (<code>.px</code>، <code>.%</code>)؟' },
      { t: 'chk', en: '<b>5.</b> Using <code>[ngClass]</code> or <code>[ngStyle]</code>? Is <code>NgClass</code> or <code>NgStyle</code> in the component’s <code>imports</code>?',
                  ar: '<b>5.</b> بتستخدم <code>[ngClass]</code> أو <code>[ngStyle]</code>؟ <code>NgClass</code> أو <code>NgStyle</code> موجودين في <code>imports</code> بتاعة الـ component؟' }
    ]
  }
  ]
};
