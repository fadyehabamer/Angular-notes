/* ==================================================================
   @if / @for / @switch, name by name — the deep dive after the
   control-flow topic. One running example (an orders list and its
   row component) followed through every file.
   Model: content/deep/inputs-outputs.mjs.
   ================================================================== */

const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

/* every block that is the list's template: the only place the loop variable exists */
const LIST = ['orders.html', 'orders.html · renamed', 'orders.html · the $ names',
  'orders.html — older style', 'orders.html — today'];

export default {
  topic: 'control-flow',
  tab: '@if and @for, name by name — The Angular Signal',
  title: { en: '<code>@if</code> and <code>@for</code>, name by name', ar: '<code>@if</code> و<code>@for</code>، اسم اسم' },
  say: {
    en: 'The page for when <code>@for (order of orders(); track order.id)</code> looks like one word repeated four times. One orders list followed through five files, every name coloured: <b>Angular’s</b>, <b>yours</b>, or <b>yours but shared</b>.',
    ar: 'الصفحة دي للي شايف <code>@for (order of orders(); track order.id)</code> كأنها كلمة واحدة متكررة أربع مرات. ليستة أوردرات واحدة ماشيين وراها في خمس ملفات، وكل اسم ملوّن: <b>بتاع أنجولار</b>، ولا <b>بتاعك</b>، ولا <b>بتاعك بس متشارك</b>.'
  },
  lead: {
    en: 'The idea is simple: <b><code>@if</code> shows or removes a block, <code>@for</code> repeats one, <code>@switch</code> picks one.</b> The confusing part is the names. In <code>&lt;app-order-row [order]="order"&gt;</code> the word <code>order</code> appears twice and means two different things, and a line like <code>track order.id</code> mixes a word of Angular’s, a name you just invented, and a field from your data. This page separates them.',
    ar: 'الفكرة بسيطة: <b><code>@if</code> بتظهر أو بتشيل بلوك، و<code>@for</code> بتكرّره، و<code>@switch</code> بتختار واحد.</b> اللي بيلخبط هو الأسماء. في <code>&lt;app-order-row [order]="order"&gt;</code> كلمة <code>order</code> ظاهرة مرتين ومعناها حاجتين مختلفتين، وسطر زي <code>track order.id</code> فيه كلمة بتاعة أنجولار، واسم انت لسه مألفه، وfield من الداتا بتاعتك. الصفحة دي بتفصلهم عن بعض.'
  },

  names: {
    note: {
      en: 'Everything that starts with <code>@</code> or <code>$</code>, plus <code>track</code>, is Angular’s. The loop variable (<code>order</code> in <code>@for (order of …)</code>) is green: you invent it in the template and it lives only inside that block. The row’s input <code>order</code> is orange, because the list types it too.',
      ar: 'أي حاجة بتبدأ بـ <code>@</code> أو <code>$</code>، ومعاهم <code>track</code>، بتاعة أنجولار. ومتغير اللوب (<code>order</code> في <code>@for (order of …)</code>) أخضر: انت بتألفه في التمبلت وعايش جوه البلوك ده بس. والـ input بتاع الصف <code>order</code> برتقاني، عشان الليستة بتكتبه هي كمان.'
    },
    names: [
      /* --- shared: two files must agree --- */
      { n:'order', k:'pub', re:'(?<=\\[)order(?=\\])|(?<![\\w$.-])order(?=\\(\\)| = input)',
        w:{ en:'The row’s input. The list sets it with <code>[order]</code>; the row reads it as <code>order()</code>.',
            ar:'الـ input بتاع الصف. الليستة بتحطه بـ <code>[order]</code>؛ والصف بيقراه كـ <code>order()</code>.' } },
      { n:'position', k:'pub',
        w:{ en:'The row’s second input, set with <code>[position]</code>.', ar:'الـ input التاني بتاع الصف، بيتحط بـ <code>[position]</code>.' } },
      { n:'OrderRow', k:'pub', only:['ts'],
        w:{ en:'The row’s class. The list imports it and lists it in <code>imports</code>.', ar:'كلاس الصف. الليستة بتعمله import وبتكتبه في <code>imports</code>.' } },
      { n:'app-order-row', k:'pub',
        w:{ en:'The row’s selector: its <code>selector</code> string and the tag in the list must match.', ar:'الـ selector بتاع الصف: النص في <code>selector</code> والتاج في الليستة لازم يبقوا زي بعض.' } },
      { n:'Orders', k:'pub', only:['ts'],
        w:{ en:'The list’s class. Whoever shows the list imports it by this name.', ar:'كلاس الليستة. أي حد بيعرض الليستة بيعمله import بالاسم ده.' } },
      { n:'app-orders', k:'pub',
        w:{ en:'The list’s selector, typed by whoever shows it.', ar:'الـ selector بتاع الليستة، واللي بيعرضها بيكتبه.' } },
      { n:'Order', k:'pub', only:['ts'],
        w:{ en:'Your data type. Every file that imports it follows a rename.', ar:'نوع الداتا بتاعك. أي ملف بيعمله import بيتغير معاه.' } },
      { n:'id', k:'pub',
        w:{ en:'A field on your data. <code>track order.id</code> reads it, so a rename reaches the template too.', ar:'field في الداتا بتاعتك. <code>track order.id</code> بيقراه، فلو غيّرته بيوصل للتمبلت كمان.' } },
      { n:'customer', k:'pub', w:{ en:'A field on your data.', ar:'field في الداتا بتاعتك.' } },
      { n:'status', k:'pub', w:{ en:'A field on your data. <code>@switch</code> reads it.', ar:'field في الداتا بتاعتك. <code>@switch</code> بيقراه.' } },
      { n:'tags', k:'pub', w:{ en:'A field on your data: a list inside each order.', ar:'field في الداتا بتاعتك: ليستة جوه كل أوردر.' } },
      { n:'paid', k:'pub', re:"(?<=')paid(?=')",
        w:{ en:'One of your status values. The type, the data and every <code>@case (\'paid\')</code> must spell it the same.',
            ar:'قيمة من قيم الـ status بتاعتك. الـ type والداتا وكل <code>@case (\'paid\')</code> لازم يكتبوها زي بعض.' } },
      { n:'pending', k:'pub', re:"(?<=')pending(?=')",
        w:{ en:'One of your status values, matched by a <code>@case</code>.', ar:'قيمة من قيم الـ status بتاعتك، و<code>@case</code> بتطابقها.' } },
      { n:'failed', k:'pub', re:"(?<=')failed(?=')",
        w:{ en:'One of your status values, matched by a <code>@case</code>.', ar:'قيمة من قيم الـ status بتاعتك، و<code>@case</code> بتطابقها.' } },

      /* --- yours, private to one file --- */
      { n:'order', k:'mine', only:LIST, re:'(?<![\\w$.\\[/-])order(?![\\w$\\]-])',
        w:{ en:'The loop variable. You invent it inside <code>@for ( … of …)</code>; it exists only inside that block. It just happens to share a spelling with the row’s input.',
            ar:'متغير اللوب. انت بتألفه جوه <code>@for ( … of …)</code>؛ وموجود جوه البلوك ده بس. وصدفة إن كتابته زي الـ input بتاع الصف.' } },
      { n:'o', k:'mine', only:['orders.html · renamed'],
        w:{ en:'The same loop variable after a rename, to prove it is yours.', ar:'نفس متغير اللوب بعد ما اتغير اسمه، عشان نثبت إنه بتاعك.' } },
      { n:'orders', k:'mine', re:'(?<![\\w$./-])orders(?![\\w$-])',
        w:{ en:'The list’s own signal, read by its own template.', ar:'الـ signal بتاعة الليستة، والتمبلت بتاعها بيقراها.' } },
      { n:'loading', k:'mine', w:{ en:'The list’s own signal.', ar:'الـ signal بتاعة الليستة.' } },
      { n:'i', k:'mine',
        w:{ en:'Your alias for <code>$index</code>, made with <code>let i = $index</code>. Template-only.', ar:'الاسم التاني اللي انت اديته لـ <code>$index</code>، بـ <code>let i = $index</code>. في التمبلت بس.' } },
      { n:'row', k:'mine',
        w:{ en:'Your alias for the outer loop’s <code>$index</code>, so the inner loop cannot hide it.', ar:'الاسم التاني بتاعك لـ <code>$index</code> بتاع اللوب البرّانية، عشان اللوب الجوّانية متخبّيهوش.' } },
      { n:'latest', k:'mine',
        w:{ en:'Your name for the value <code>@if</code> tested, made with <code>as latest</code>. Only inside that <code>@if</code> block.',
            ar:'الاسم بتاعك للقيمة اللي <code>@if</code> اختبرتها، بـ <code>as latest</code>. جوه بلوك الـ <code>@if</code> ده بس.' } },
      { n:'tag', k:'mine', w:{ en:'The inner loop’s variable.', ar:'متغير اللوب الجوّانية.' } },
      { n:'expanded', k:'mine',
        w:{ en:'The row’s own signal: exactly the state <code>track</code> protects.', ar:'الـ signal بتاعة الصف: وهي بالظبط الحالة اللي <code>track</code> بيحميها.' } },
      { n:'trackById', k:'mine',
        w:{ en:'The older style: a method you wrote in the class and named in <code>trackBy:</code>.', ar:'الأسلوب القديم: ميثود انت كتبتها في الكلاس وسمّيتها في <code>trackBy:</code>.' } },
      { n:'elseBlock', k:'mine',
        w:{ en:'The older style: a template reference, <code>#elseBlock</code>, named again after <code>else</code>.', ar:'الأسلوب القديم: template reference اسمه <code>#elseBlock</code>، واسمه بيتكتب تاني بعد <code>else</code>.' } },

      /* --- Angular's, TypeScript's, the browser's --- */
      { n:'@if', k:'ng', w:{ en:'Angular’s if block.', ar:'بلوك الـ if بتاع أنجولار.' } },
      { n:'@else', k:'ng', w:{ en:'Angular’s else block, attached right after <code>@if</code>.', ar:'بلوك الـ else بتاع أنجولار، ملزوق بعد <code>@if</code> على طول.' } },
      { n:'@for', k:'ng', w:{ en:'Angular’s loop block.', ar:'بلوك اللوب بتاع أنجولار.' } },
      { n:'track', k:'ng', w:{ en:'Angular’s required word in <code>@for</code>. The expression after it is yours.', ar:'كلمة أنجولار الإجبارية في <code>@for</code>. اللي بعدها بتاعك.' } },
      { n:'@empty', k:'ng', w:{ en:'Angular’s block for an empty list, attached to <code>@for</code>.', ar:'بلوك أنجولار لليستة الفاضية، ملزوق في <code>@for</code>.' } },
      { n:'@switch', k:'ng', w:{ en:'Angular’s switch block.', ar:'بلوك الـ switch بتاع أنجولار.' } },
      { n:'@case', k:'ng', w:{ en:'One branch of <code>@switch</code>. The value in brackets is yours.', ar:'فرع واحد من <code>@switch</code>. القيمة اللي بين القوسين بتاعتك.' } },
      { n:'@default', k:'ng', w:{ en:'The branch when no <code>@case</code> matched.', ar:'الفرع اللي بيشتغل لما مفيش <code>@case</code> طابق.' } },
      { n:'$index', k:'ng', w:{ en:'Angular’s fixed name for the item’s position, from 0.', ar:'اسم أنجولار الثابت لمكان العنصر، بيبدأ من 0.' } },
      { n:'$count', k:'ng', w:{ en:'Angular’s fixed name for how many items there are.', ar:'اسم أنجولار الثابت لعدد العناصر.' } },
      { n:'$last', k:'ng', w:{ en:'Angular’s fixed name: true on the last item.', ar:'اسم أنجولار الثابت: صح عند آخر عنصر.' } },
      { n:'as', k:'ng', only:['html'], re:'(?<=; )as(?= )',
        w:{ en:'Part of <code>@if</code>: gives the tested value a name. The name after it is yours.', ar:'جزء من <code>@if</code>: بيدّي القيمة اللي اتختبرت اسم. الاسم اللي بعده بتاعك.' } },
      { n:'*ngIf', k:'ng', w:{ en:'The older if directive.', ar:'الـ directive القديم بتاع الـ if.' } },
      { n:'*ngFor', k:'ng', w:{ en:'The older loop directive.', ar:'الـ directive القديم بتاع اللوب.' } },
      { n:'ng-template', k:'ng', w:{ en:'Angular’s tag for a block that is not shown until something asks for it.', ar:'تاج أنجولار لبلوك مش بيظهر لحد ما حاجة تطلبه.' } },
      { n:'trackBy', k:'ng', w:{ en:'The older loop’s option key. The method after it is yours.', ar:'مفتاح إعداد في اللوب القديمة. الميثود اللي بعده بتاعتك.' } },
      { n:'index', k:'ng', w:{ en:'The older loop’s name for the position, without the <code>$</code>.', ar:'اسم المكان في اللوب القديمة، من غير <code>$</code>.' } },
      { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
      { n:'set', k:'ng', w:{ en:'A signal method.', ar:'ميثود بتاعة الـ signal.' } },
      { n:'input', k:'ng', re:'(?<![\\w$<(-])input(?=[.(<,])', w:{ en:'Angular’s function that creates an input.', ar:'الـ function بتاعة أنجولار اللي بتعمل input.' } },
      { n:'required', k:'ng', w:{ en:'Part of <code>input.required</code>.', ar:'جزء من <code>input.required</code>.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator.', ar:'الـ decorator بتاع أنجولار.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The string after it is yours.', ar:'مفتاح إعداد. النص اللي بعده بتاعك.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key. The path after it points at your file.', ar:'مفتاح إعداد. المسار اللي بعده بيشاور على ملفك.' } },
      { n:'imports', k:'ng', w:{ en:'An option key: the components this template uses.', ar:'مفتاح إعداد: الـ components اللي التمبلت ده بيستخدمها.' } },
      { n:'click', k:'ng', w:{ en:'The browser’s event name.', ar:'اسم الـ event بتاع المتصفح.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One list, six stops', ar: 'ليستة واحدة، ست محطات' },
    lead: {
      en: 'An orders page. The list component holds the orders in a signal. Its template shows a loading message or the list, and draws one row component per order. The row shows a coloured status. Follow one order from the array to the screen:',
      ar: 'صفحة أوردرات. الـ component بتاع الليستة شايل الأوردرات في signal. التمبلت بتاعه بيعرض رسالة تحميل أو الليستة، وبيرسم component صف لكل أوردر. والصف بيعرض الـ status بلون. امشي ورا أوردر واحد من الـ array لحد الشاشة:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'orders.ts', lang: 'ts', who: { en: 'list · holds the data', ar: 'الليستة · شايلة الداتا' },
          code: ['readonly orders = signal<Order[]>([ … ]);', 'readonly loading = signal(false);'],
          say: { en: `The list’s class. ${mine('orders')} and ${mine('loading')} are names you picked; only this component and its template use them. ${ng('signal')} is Angular’s.`,
                 ar: `كلاس الليستة. ${mine('orders')} و${mine('loading')} أسماء انت اخترتها؛ الـ component ده والتمبلت بتاعه بس اللي بيستخدموها. و${ng('signal')} بتاعة أنجولار.` } },
        { file: 'orders.html', lang: 'html', who: { en: 'list · branches', ar: 'الليستة · بتفرّع' },
          code: ['@if (loading()) {', '  <p>Loading…</p>', '} @else {'],
          say: { en: `${ng('@if')} and ${ng('@else')} are Angular’s. What goes inside the brackets is yours: here ${mine('loading')}, copied exactly from the class, <b>with</b> <code>()</code> because it is a signal.`,
                 ar: `${ng('@if')} و${ng('@else')} بتوع أنجولار. اللي جوه القوسين بتاعك: هنا ${mine('loading')}، منسوخة بالظبط من الكلاس، <b>بالقوسين</b> <code>()</code> عشان هي signal.` } },
        { file: 'orders.html', lang: 'html', who: { en: 'list · loops', ar: 'الليستة · بتلف' },
          code: ['@for (order of orders(); track order.id; let i = $index) {'],
          say: { en: `Read it right to left. ${mine('orders')} must match the class. ${mine('order')} is a <b>brand-new name</b> you invent right here for “the current one”. ${ng('track')} is Angular’s, and ${pub('id')} is your data’s field. ${ng('$index')} is Angular’s fixed name, and ${mine('i')} is your nickname for it.`,
                 ar: `اقراها من اليمين للشمال. ${mine('orders')} لازم تبقى زي الكلاس. و${mine('order')} <b>اسم جديد خالص</b> انت بتألفه هنا حالًا معناه «اللي عليه الدور». و${ng('track')} بتاعة أنجولار، و${pub('id')} field في الداتا بتاعتك. و${ng('$index')} اسم أنجولار الثابت، و${mine('i')} اسم الدلع بتاعك ليه.` } },
        { file: 'orders.html', lang: 'html', who: { en: 'list · hands it to a row', ar: 'الليستة · بتسلّمه لصف' },
          code: ['<app-order-row [order]="order" [position]="i + 1" />'],
          say: { en: `The same spelling twice, two owners. Inside <code>[ ]</code> is the <b>row’s input</b>, ${pub('order')}: it must match the row’s class. Inside the quotes is <b>your loop variable</b>, ${mine('order')}. They only look alike because you chose the same word.`,
                 ar: `نفس الكتابة مرتين، واتنين أصحاب. اللي جوه <code>[ ]</code> هو <b>الـ input بتاع الصف</b>، ${pub('order')}: لازم يبقى زي كلاس الصف. واللي جوه علامات التنصيص هو <b>متغير اللوب بتاعك</b>، ${mine('order')}. هما شبه بعض بس عشان انت اخترت نفس الكلمة.` } },
        { file: 'order-row.ts', lang: 'ts', who: { en: 'row · receives', ar: 'الصف · بيستقبل' },
          code: ['readonly order = input.required<Order>();'],
          say: { en: `The row declares the input. ${pub('order')} is the name the list typed in <code>[order]</code>. The row never learns what the list called its loop variable.`,
                 ar: `الصف بيعلن الـ input. ${pub('order')} هو الاسم اللي الليستة كتبته في <code>[order]</code>. والصف عمره ما بيعرف الليستة سمّت متغير اللوب بتاعها إيه.` } },
        { file: 'order-row.html', lang: 'html', who: { en: 'row · picks a colour', ar: 'الصف · بيختار لون' },
          code: ['@switch (order().status) {', "  @case ('paid') { <span class=\"ok\">Paid</span> }", '  …', '}'],
          say: { en: `${ng('@switch')} and ${ng('@case')} are Angular’s. ${pub('status')} is your field, and ${pub('paid')} is one of <b>your</b> values: it must be spelled exactly like the data, because the match uses <code>===</code>.`,
                 ar: `${ng('@switch')} و${ng('@case')} بتوع أنجولار. و${pub('status')} field بتاعك، و${pub('paid')} قيمة من قيمك <b>انت</b>: لازم تتكتب زي الداتا بالظبط، عشان المقارنة بتبقى بـ <code>===</code>.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'In <code>@for (order of orders(); track order.id)</code>, <code>orders</code> comes from your class, <code>order</code> is born right there, <code>track</code> is Angular’s, and <code>id</code> is your data’s. Nothing else outside this template knows the name <code>order</code> that the loop created.',
        ar: 'في <code>@for (order of orders(); track order.id)</code>، <code>orders</code> جاية من الكلاس بتاعك، و<code>order</code> بتتولد هنا حالًا، و<code>track</code> بتاعة أنجولار، و<code>id</code> من الداتا بتاعتك. ومفيش أي حاجة برّه التمبلت ده تعرف اسم <code>order</code> اللي اللوب عمله.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Class or template?', ar: 'الكلاس ولا التمبلت؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'Control flow lives only in templates, but its names come from three places: your class, your data, and the template itself.',
      ar: 'الـ control flow عايش في التمبلت بس، لكن أسماءه جاية من تلات أماكن: الكلاس بتاعك، والداتا بتاعتك، والتمبلت نفسه.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>readonly orders = signal&lt;Order[]&gt;(…)</code>', '<code>orders.ts</code>', 'the list', `you pick ${mine('orders')}`],
            ar: ['<code>readonly orders = signal&lt;Order[]&gt;(…)</code>', '<code>orders.ts</code>', 'الليستة', `انت بتختار ${mine('orders')}`] },
          { en: ['<code>@for (order of orders(); …)</code>', '<code>orders.html</code>', 'the list', `${mine('orders')} copies the class; you invent ${mine('order')} here`],
            ar: ['<code>@for (order of orders(); …)</code>', '<code>orders.html</code>', 'الليستة', `${mine('orders')} بتنسخ الكلاس؛ و${mine('order')} انت بتألفه هنا`] },
          { en: ['<code>track order.id</code>', '<code>orders.html</code>', 'the list', `${ng('track')} is Angular’s; ${pub('id')} is your data’s field`],
            ar: ['<code>track order.id</code>', '<code>orders.html</code>', 'الليستة', `${ng('track')} بتاعة أنجولار؛ و${pub('id')} field في الداتا بتاعتك`] },
          { en: ['<code>let i = $index</code>', '<code>orders.html</code>', 'the list', `${ng('$index')} is Angular’s; you pick ${mine('i')}`],
            ar: ['<code>let i = $index</code>', '<code>orders.html</code>', 'الليستة', `${ng('$index')} بتاعة أنجولار؛ وانت بتختار ${mine('i')}`] },
          { en: ['<code>[order]="order"</code>', '<code>orders.html</code>', 'the list', `left: the row’s ${pub('order')}; right: your ${mine('order')}`],
            ar: ['<code>[order]="order"</code>', '<code>orders.html</code>', 'الليستة', `الشمال: ${pub('order')} بتاع الصف؛ اليمين: ${mine('order')} بتاعك`] },
          { en: ['<code>readonly order = input.required&lt;Order&gt;()</code>', '<code>order-row.ts</code>', 'the row', `you pick ${pub('order')}, and the list copies it`],
            ar: ['<code>readonly order = input.required&lt;Order&gt;()</code>', '<code>order-row.ts</code>', 'الصف', `انت بتختار ${pub('order')}، والليستة بتنسخه`] },
          { en: ['<code>@case (\'paid\')</code>', '<code>order-row.html</code>', 'the row', `${pub('paid')} must equal a value in your data`],
            ar: ['<code>@case (\'paid\')</code>', '<code>order-row.html</code>', 'الصف', `${pub('paid')} لازم تساوي قيمة في الداتا بتاعتك`] },
        ] },
      { t: 'ul',
        en: ['<b>Before <code>of</code> is new, after <code>of</code> is old.</b> The name on the left is created by the loop. The expression on the right must already exist in your class.',
             '<b>Template names stay in the template.</b> The loop variable, <code>let i = $index</code> and <code>@if (…; as x)</code> all make names that your <code>.ts</code> file cannot see, and that disappear at the closing <code>}</code>.',
             '<b>Nothing to import.</b> <code>@if</code>, <code>@for</code> and <code>@switch</code> are part of the template language. There is no class name to add to <code>imports</code>.'],
        ar: ['<b>اللي قبل <code>of</code> جديد، واللي بعدها قديم.</b> الاسم اللي على الشمال اللوب هي اللي بتعمله. واللي على اليمين لازم يكون موجود أصلًا في الكلاس بتاعك.',
             '<b>أسماء التمبلت بتفضل في التمبلت.</b> متغير اللوب، و<code>let i = $index</code>، و<code>@if (…; as x)</code> كلهم بيعملوا أسماء ملف الـ <code>.ts</code> مش شايفها، وبتختفي عند الـ <code>}</code> اللي بتقفل.',
             '<b>مفيش حاجة تعملها import.</b> <code>@if</code> و<code>@for</code> و<code>@switch</code> جزء من لغة التمبلت. مفيش اسم كلاس تزوّده في <code>imports</code>.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All five files, every name coloured', ar: 'الخمس ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same example, complete. Hover a coloured name to light up everywhere else it appears. Then press <b>Rename test</b>: every name you own turns into a made-up word, Angular’s words stay put, and the code is still correct.',
      ar: 'نفس المثال، كامل. قف بالماوس على أي اسم ملوّن وهتنوّر كل الأماكن التانية اللي هو فيها. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: كل اسم بتاعك هيبقى كلمة عشوائية، وكلمات أنجولار هتفضل مكانها، والكود لسه صح.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'order.ts', lang: 'ts', tag: { en: 'the data', ar: 'الداتا' }, code: [
        'export interface Order {',
        '  id: number;',
        '  customer: string;',
        "  status: 'paid' | 'pending' | 'failed';",
        '  tags: string[];',
        '}' ] },
      { t: 'code', name: 'orders.ts', lang: 'ts', tag: { en: 'the list', ar: 'الليستة' }, code: [
        "import { Component, signal } from '@angular/core';",
        "import { Order } from './order';",
        "import { OrderRow } from './order-row';",
        '',
        '@Component({',
        "  selector: 'app-orders',",
        '  imports: [OrderRow],',
        "  templateUrl: './orders.html',",
        '})',
        'export class Orders {',
        '  readonly loading = signal(false);',
        '  readonly orders = signal<Order[]>([',
        "    { id: 1042, customer: 'Mona', status: 'paid', tags: ['gift'] },",
        "    { id: 1043, customer: 'Karim', status: 'pending', tags: [] },",
        '  ]);',
        '}' ] },
      { t: 'code', name: 'orders.html', lang: 'html', tag: { en: 'the list', ar: 'الليستة' }, code: [
        '@if (loading()) {',
        '  <p>Loading…</p>',
        '} @else {',
        '  @if (orders()[0]; as latest) {',
        '    <h2>Latest: {{ latest.customer }}</h2>',
        '  }',
        '',
        '  @for (order of orders(); track order.id; let i = $index) {',
        '    <app-order-row [order]="order" [position]="i + 1" />',
        '  } @empty {',
        '    <p>Nothing here yet.</p>',
        '  }',
        '}' ] },
      { t: 'code', name: 'order-row.ts', lang: 'ts', tag: { en: 'one row', ar: 'صف واحد' }, code: [
        "import { Component, input, signal } from '@angular/core';",
        "import { Order } from './order';",
        '',
        '@Component({',
        "  selector: 'app-order-row',",
        "  templateUrl: './order-row.html',",
        '})',
        'export class OrderRow {',
        '  readonly order = input.required<Order>();',
        '  readonly position = input.required<number>();',
        '  readonly expanded = signal(false);   // the state track protects',
        '}' ] },
      { t: 'code', name: 'order-row.html', lang: 'html', tag: { en: 'one row', ar: 'صف واحد' }, code: [
        '<button (click)="expanded.set(!expanded())">',
        '  {{ position() }}. {{ order().customer }}',
        '</button>',
        '',
        '@switch (order().status) {',
        "  @case ('paid')    { <span class=\"ok\">Paid</span> }",
        "  @case ('pending') { <span class=\"warn\">Pending</span> }",
        "  @case ('failed')  { <span class=\"bad\">Failed</span> }",
        '  @default          { <span>{{ order().status }}</span> }',
        '}',
        '',
        '@if (expanded()) {',
        '  <p>Number {{ order().id }}</p>',
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
      en: 'Every name you own can be renamed. Angular type-checks templates against the class, so most misses are compile errors. The one that is not is a <code>@case</code> value.',
      ar: 'أي اسم بتاعك ينفع يتغير. أنجولار بيراجع التمبلت على الكلاس، فأغلب اللي بتنساه بيبقى compile error. اللي مش كده هو قيمة الـ <code>@case</code>.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [mine('order') + ' (the loop variable)', 'every use inside that <code>@for</code> block: <code>track order.id</code>, <code>="order"</code>', 'Compile error in the template: the old name does not exist.'],
            ar: [mine('order') + ' (متغير اللوب)', 'كل استخدام جوه بلوك الـ <code>@for</code> ده: <code>track order.id</code>، <code>="order"</code>', 'Compile error في التمبلت: الاسم القديم مش موجود.'] },
          { en: [mine('orders') + ', ' + mine('loading') + ' (class signals)', 'their uses in <code>orders.html</code>', 'Compile error in the template.'],
            ar: [mine('orders') + ' و' + mine('loading') + ' (signals الكلاس)', 'استخدامهم في <code>orders.html</code>', 'Compile error في التمبلت.'] },
          { en: [`${mine('i')}, ${mine('latest')} (template aliases)`, 'their uses inside the same block', 'Compile error in the template.'],
            ar: [`${mine('i')} و${mine('latest')} (أسماء في التمبلت)`, 'استخدامهم جوه نفس البلوك', 'Compile error في التمبلت.'] },
          { en: [pub('order') + ' (the row’s input)', 'the list’s <code>[order]</code>, and the row’s own template', 'Compile error: “Can’t bind to ‘order’”.'],
            ar: [pub('order') + ' (الـ input بتاع الصف)', '<code>[order]</code> في الليستة، وتمبلت الصف نفسه', 'Compile error: «Can’t bind to ‘order’».'] },
          { en: [pub('app-order-row') + ' / ' + pub('OrderRow'), 'the tag in the list / the <code>import</code> and <code>imports: [ ]</code>', 'Compile error: “is not a known element” / on the import.'],
            ar: [pub('app-order-row') + ' / ' + pub('OrderRow'), 'التاج في الليستة / الـ <code>import</code> و<code>imports: [ ]</code>', 'Compile error: «is not a known element» / في الـ import.'] },
          { en: [`${pub('id')}, ${pub('customer')}, ${pub('status')}`, 'every file that reads the field, templates included', 'Compile error wherever the old name is read.'],
            ar: [`${pub('id')} و${pub('customer')} و${pub('status')}`, 'كل ملف بيقرا الـ field، والتمبلتس كمان', 'Compile error في أي حتة بتقرا الاسم القديم.'] },
          { en: [pub('paid') + ' (a status value)', 'the type, the data, and every <code>@case (\'paid\')</code>', '<b>Maybe no error.</b> A <code>@case</code> that matches nothing is still valid code: the row falls through to <code>@default</code>. See the silent mistakes.'],
            ar: [pub('paid') + ' (قيمة status)', 'الـ type والداتا وكل <code>@case (\'paid\')</code>', '<b>ممكن ميبقاش فيه error.</b> <code>@case</code> مش بتطابق حاجة لسه كود سليم: الصف بيقع على <code>@default</code>. شوف الغلطات الصامتة.'] },
          { en: [`${ng('@if')}, ${ng('@for')}, ${ng('track')}, ${ng('$index')}, ${ng('@empty')}`, 'nothing: you cannot rename these', 'They are Angular’s words.'],
            ar: [`${ng('@if')} و${ng('@for')} و${ng('track')} و${ng('$index')} و${ng('@empty')}`, 'ولا حاجة: دول مينفعش يتغيروا', 'دي كلمات أنجولار.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b> above the files. In <code>[order]="order"</code> the two words turn into two <b>different</b> made-up words. That is the proof they were never the same name.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b> فوق الملفات. في <code>[order]="order"</code> الكلمتين هيبقوا كلمتين عشوائيتين <b>مختلفتين</b>. وده الدليل إنهم عمرهم ما كانوا نفس الاسم.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'twins',
    kicker: { en: 'Same spelling, two owners', ar: 'نفس الكتابة، واتنين أصحاب' },
    title: { en: 'The two <code>order</code>s in <code>[order]="order"</code>', ar: 'الاتنين <code>order</code> في <code>[order]="order"</code>' },
    lead: {
      en: 'Using the singular of the list for the loop variable is a good habit, and it is also why this line confuses everyone. Rename the loop variable to <code>o</code> and see what stays.',
      ar: 'إنك تسمّي متغير اللوب بمفرد اسم الليستة عادة كويسة، وهي برضه السبب إن السطر ده بيلخبط الكل. غيّر اسم متغير اللوب لـ <code>o</code> وشوف إيه اللي بيفضل.'
    },
    blocks: [
      { t: 'code', name: 'orders.html · renamed', lang: 'html', tag: { en: 'loop variable renamed', ar: 'متغير اللوب اتغير اسمه' }, code: [
        '@for (o of orders(); track o.id; let i = $index) {',
        '  <app-order-row [order]="o" [position]="i + 1" />',
        '}' ] },
      { t: 'p',
        en: `${pub('order')} inside <code>[ ]</code> did not move: it belongs to the row, and the row still calls its input <code>order</code>. Only your loop variable changed, to ${mine('o')}, together with its two uses in the same block. The row’s files are untouched.`,
        ar: `${pub('order')} اللي جوه <code>[ ]</code> متحركش: ده بتاع الصف، والصف لسه بيسمّي الـ input بتاعه <code>order</code>. متغير اللوب بتاعك بس اللي اتغير، لـ ${mine('o')}، ومعاه الاستخدامين بتوعه في نفس البلوك. وملفات الصف متلمستش.` },
      { t: 'tbl',
        head: { en: ['Where', 'Written', 'What it is'], ar: ['فين', 'مكتوب إزاي', 'هو إيه'] },
        rows: [
          { en: ['list template, left of <code>of</code>', '<code>@for (order of …)</code>', `${mine('order')}: your loop variable, born here`],
            ar: ['تمبلت الليستة، شمال <code>of</code>', '<code>@for (order of …)</code>', `${mine('order')}: متغير اللوب بتاعك، اتولد هنا`] },
          { en: ['list template, in square brackets', '<code>[order]</code>', `${pub('order')}: the row’s input name`],
            ar: ['تمبلت الليستة، بين أقواس مربعة', '<code>[order]</code>', `${pub('order')}: اسم الـ input بتاع الصف`] },
          { en: ['list template, in quotes', '<code>="order"</code>', `${mine('order')}: the loop variable again, the value being sent`],
            ar: ['تمبلت الليستة، بين علامات تنصيص', '<code>="order"</code>', `${mine('order')}: متغير اللوب تاني، القيمة اللي بتتبعت`] },
          { en: ['row class', '<code>readonly order = input…</code>', `${pub('order')}: the input’s declaration`],
            ar: ['كلاس الصف', '<code>readonly order = input…</code>', `${pub('order')}: إعلان الـ input`] },
          { en: ['row template', '<code>order()</code>', `${pub('order')}: the input, read as a signal`],
            ar: ['تمبلت الصف', '<code>order()</code>', `${pub('order')}: الـ input، بيتقري كـ signal`] },
        ] },
      { t: 'note', label: { en: 'Brackets tell you which one', ar: 'الأقواس بتقولك مين' },
        en: 'In the list, the loop variable is a plain value: <code>order.id</code>, no <code>()</code>. In the row, the input is a signal: <code>order().id</code>, with <code>()</code>. If you see brackets after <code>order</code>, you are looking at the input.',
        ar: 'في الليستة، متغير اللوب قيمة عادية: <code>order.id</code>، من غير <code>()</code>. في الصف، الـ input signal: <code>order().id</code>، بـ <code>()</code>. لو شفت أقواس بعد <code>order</code>، يبقى انت بتبص على الـ input.' }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتاعتك' },
    title: { en: 'The fixed names, and the rules they bring', ar: 'الأسماء الثابتة، والقواعد اللي جاية معاها' },
    lead: {
      en: 'Every block word and every <code>$</code> variable is Angular’s. You cannot rename them, but you can give the <code>$</code> ones a second name with <code>let</code>.',
      ar: 'كل كلمة بلوك وكل متغير بيبدأ بـ <code>$</code> بتاع أنجولار. مينفعش تغيّرهم، بس تقدر تدّي اللي بـ <code>$</code> اسم تاني بـ <code>let</code>.'
    },
    blocks: [
      { t: 'code', name: 'orders.html · the $ names', lang: 'html', tag: { en: 'Angular hands you these', ar: 'أنجولار بيدّيك دول' }, code: [
        '@for (order of orders(); track order.id) {',
        '  <p>',
        '    {{ $index + 1 }} / {{ $count }}: {{ order.customer }}',
        '    @if ($last) { <b>(end of list)</b> }',
        '  </p>',
        '}' ] },
      { t: 'tbl',
        head: { en: ['Name', 'What it holds'], ar: ['الاسم', 'شايل إيه'] },
        rows: [
          { en: [ng('$index'), 'The position, starting at 0.'], ar: [ng('$index'), 'المكان، بيبدأ من 0.'] },
          { en: [ng('$count'), 'How many items the list has.'], ar: [ng('$count'), 'الليستة فيها كام عنصر.'] },
          { en: [`<code>$first</code>, ${ng('$last')}`, 'True on the first / last item.'], ar: [`<code>$first</code>، ${ng('$last')}`, 'صح عند أول / آخر عنصر.'] },
          { en: ['<code>$even</code>, <code>$odd</code>', 'True on even / odd positions.'], ar: ['<code>$even</code>، <code>$odd</code>', 'صح عند الأماكن الزوجية / الفردية.'] },
          { en: [`${ng('@if')} ${ng('@else')} ${ng('@for')} ${ng('@empty')} ${ng('@switch')} ${ng('@case')} ${ng('@default')}`, 'The blocks themselves. <code>@else if</code> is written as two words.'],
            ar: [`${ng('@if')} ${ng('@else')} ${ng('@for')} ${ng('@empty')} ${ng('@switch')} ${ng('@case')} ${ng('@default')}`, 'البلوكات نفسها. و<code>@else if</code> بتتكتب كلمتين.'] },
          { en: [`<code>of</code>, ${ng('track')}, <code>let</code>, ${ng('as')}`, 'Keywords inside the brackets. They are part of the syntax, not names.'],
            ar: [`<code>of</code>، ${ng('track')}، <code>let</code>، ${ng('as')}`, 'كلمات محجوزة جوه القوسين. جزء من الكتابة، مش أسماء.'] },
        ] },
      { t: 'p',
        en: 'Where a rule picks the name for you:',
        ar: 'الأماكن اللي قاعدة فيها بتختار الاسم بدالك:' },
      { t: 'ul',
        en: ['<b><code>track</code> must use the loop variable.</b> Rename <code>order</code> to <code>o</code> and it becomes <code>track o.id</code>. <code>track</code> itself is required: leave it out and the template does not compile.',
             '<b>The <code>$</code> names are spelled exactly.</b> <code>$Index</code> or <code>index</code> is simply an unknown name. To use your own word, alias it: <code>let i = $index</code>. The alias is yours; <code>$index</code> keeps working too.',
             '<b><code>@case</code> values are your data’s words.</b> <code>@switch</code> compares with <code>===</code>, so <code>\'paid\'</code> must match the data letter for letter, lowercase included.',
             '<b><code>as</code> names a value for one block.</b> <code>@if (orders()[0]; as latest)</code> makes <code>latest</code>, usable only inside that <code>@if</code>.'],
        ar: ['<b><code>track</code> لازم يستخدم متغير اللوب.</b> غيّر <code>order</code> لـ <code>o</code> وهتبقى <code>track o.id</code>. و<code>track</code> نفسها إجبارية: لو شلتها التمبلت مش هيعمل compile.',
             '<b>أسماء الـ <code>$</code> بتتكتب بالظبط.</b> <code>$Index</code> أو <code>index</code> ببساطة اسم مش معروف. لو عايز كلمة بتاعتك، اعمل alias: <code>let i = $index</code>. الـ alias بتاعك؛ و<code>$index</code> لسه شغال برضه.',
             '<b>قيم الـ <code>@case</code> هي كلمات الداتا بتاعتك.</b> <code>@switch</code> بيقارن بـ <code>===</code>، فـ <code>\'paid\'</code> لازم تطابق الداتا حرف حرف، والحروف الصغيرة كمان.',
             '<b><code>as</code> بتسمّي قيمة لبلوك واحد.</b> <code>@if (orders()[0]; as latest)</code> بتعمل <code>latest</code>، وتنفع جوه الـ <code>@if</code> ده بس.'] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'Angular accepts any loop variable name. These habits make each line read like a sentence.',
      ar: 'أنجولار بيقبل أي اسم لمتغير اللوب. العادات دي بتخلي كل سطر يتقري زي جملة.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['the list', '<code>orders</code>, <code>results</code> (plural)', '<code>data</code>, <code>list</code>', '<code>@for (order of orders())</code> reads as English.'],
            ar: ['الليستة', '<code>orders</code>، <code>results</code> (جمع)', '<code>data</code>، <code>list</code>', '<code>@for (order of orders())</code> بتتقري كجملة إنجليزي.'] },
          { en: ['the loop variable', '<code>order</code> (singular), or <code>o</code> in a short block', '<code>item</code> everywhere, <code>x</code> in a long block', 'Say what one of them is. Just remember it is not the row’s input, even with the same spelling.'],
            ar: ['متغير اللوب', '<code>order</code> (مفرد)، أو <code>o</code> في بلوك قصير', '<code>item</code> في كل حتة، <code>x</code> في بلوك طويل', 'قول الواحد منهم هو إيه. بس افتكر إنه مش الـ input بتاع الصف، حتى لو نفس الكتابة.'] },
          { en: ['what you track', '<code>order.id</code>: something unique and stable', '<code>$index</code> on a list that changes, <code>order</code> itself for data that is re-fetched', 'A new object from the server is a different object, even with the same id.'],
            ar: ['اللي بتعمله track', '<code>order.id</code>: حاجة فريدة وثابتة', '<code>$index</code> في ليستة بتتغير، و<code>order</code> نفسه لداتا بتتجاب تاني', 'object جديد من السيرفر ده object تاني، حتى لو نفس الـ id.'] },
          { en: ['an index alias', '<code>i</code>, or <code>row</code> in nested loops', 'reusing <code>i</code> in both loops', 'The inner name hides the outer one.'],
            ar: ['alias للـ index', '<code>i</code>، أو <code>row</code> في اللوبس المتداخلة', 'إنك تستخدم <code>i</code> في اللوبتين', 'الاسم الجوّاني بيخبّي البرّاني.'] },
          { en: ['a true/false signal for <code>@if</code>', '<code>loading</code>, <code>isOpen</code>, <code>hasOrders</code>', '<code>state</code>, <code>flag</code>', '<code>@if (loading())</code> says what it tests.'],
            ar: ['signal صح/غلط لـ <code>@if</code>', '<code>loading</code>، <code>isOpen</code>، <code>hasOrders</code>', '<code>state</code>، <code>flag</code>', '<code>@if (loading())</code> بتقول هي بتختبر إيه.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: '<code>*ngIf</code> and <code>*ngFor</code> use almost the same names', ar: '<code>*ngIf</code> و<code>*ngFor</code> بيستخدموا تقريبًا نفس الأسماء' },
    lead: {
      en: 'You will meet the older directives everywhere. Your names barely change. Angular’s words do: <code>index</code> had no <code>$</code>, <code>trackBy</code> wanted a method, and <code>else</code> pointed at a named template.',
      ar: 'هتقابل الـ directives القديمة في كل حتة. أسماءك تقريبًا مش بتتغير. كلمات أنجولار هي اللي بتتغير: <code>index</code> مكانش فيها <code>$</code>، و<code>trackBy</code> كانت عايزة ميثود، و<code>else</code> كانت بتشاور على template ليه اسم.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'orders.html — older style', lang: 'html', code: [
          '<p *ngIf="loading(); else elseBlock">Loading…</p>',
          '<ng-template #elseBlock>',
          '  <app-order-row',
          '    *ngFor="let order of orders(); trackBy: trackById; let i = index"',
          '    [order]="order" [position]="i + 1" />',
          '</ng-template>' ] },
        good: { name: 'orders.html — today', lang: 'html', code: [
          '@if (loading()) {',
          '  <p>Loading…</p>',
          '} @else {',
          '  @for (order of orders(); track order.id; let i = $index) {',
          '    <app-order-row [order]="order" [position]="i + 1" />',
          '  }',
          '}' ] } },
      { t: 'p',
        en: `In the old style, ${mine('trackById')} was a method you had to write in the class, <code>trackById(index: number, order: Order) { return order.id; }</code>, and ${mine('elseBlock')} was a template reference you named twice. Both are gone. The old directives also needed <code>NgIf</code> and <code>NgFor</code> (or <code>CommonModule</code>) in <code>imports</code>; the blocks need nothing.`,
        ar: `في الأسلوب القديم، ${mine('trackById')} كانت ميثود لازم تكتبها في الكلاس، <code>trackById(index: number, order: Order) { return order.id; }</code>، و${mine('elseBlock')} كان template reference بتكتب اسمه مرتين. الاتنين راحوا. والـ directives القديمة كانت محتاجة <code>NgIf</code> و<code>NgFor</code> (أو <code>CommonModule</code>) في <code>imports</code>؛ البلوكات مش محتاجة حاجة.` },
      { t: 'note', label: { en: 'Moving an old project', ar: 'لو بتنقل مشروع قديم' },
        en: '<code>ng generate @angular/core:control-flow</code> rewrites the old directives into blocks for you.',
        ar: '<code>ng generate @angular/core:control-flow</code> بيحوّل الـ directives القديمة لبلوكات بدالك.' }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, and says nothing', ar: 'مش بيعمل حاجة، ومش بيقول حاجة' },
    title: { en: 'Mistakes that fail silently', ar: 'غلطات بتفشل في صمت' },
    lead: {
      en: 'These compile. The page loads. Something on it is just wrong.',
      ar: 'دول بيعملوا compile. والصفحة بتفتح. بس فيه حاجة فيها غلط وخلاص.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'Forgetting the brackets in <code>@if</code>', ar: 'نسيان القوسين في <code>@if</code>' }, blocks: [
        { t: 'pair',
          bad:  { name: 'orders.html', lang: 'html', code: ['@if (loading) {', '  <p>Loading…</p>', '}'] },
          good: { name: 'orders.html', lang: 'html', code: ['@if (loading()) {', '  <p>Loading…</p>', '}'] } },
        { t: 'p', en: `Without <code>()</code> you test the signal itself. A signal is a function, and a function is always “true”, so the page says “Loading…” forever and the list never shows.`,
                  ar: `من غير <code>()</code> انت بتختبر الـ signal نفسها. والـ signal دي function، والـ function دايمًا «صح»، فالصفحة هتفضل تقول «Loading…» على طول والليستة عمرها ما هتظهر.` }
      ]},
      { t: 'step', n: '2', title: { en: 'Tracking by position on a list that changes', ar: 'الـ track بالمكان في ليستة بتتغير' }, blocks: [
        { t: 'pair',
          bad:  { name: 'orders.html', lang: 'html', code: ['@for (order of orders(); track $index) {', '  <app-order-row [order]="order" [position]="$index + 1" />', '}'] },
          good: { name: 'orders.html', lang: 'html', code: ['@for (order of orders(); track order.id) {', '  <app-order-row [order]="order" [position]="$index + 1" />', '}'] } },
        { t: 'p', en: `With ${ng('$index')}, Angular ties each row component to a <b>position</b>, not to an order. Put a new order at the top and the first row component is reused for it: it gets the new ${pub('order')}, but keeps its own ${mine('expanded')}. The open panel now sits under the wrong order. Track something that belongs to the order, like ${pub('id')}.`,
                  ar: `مع ${ng('$index')}، أنجولار بيربط كل component صف بـ <b>مكان</b>، مش بأوردر. حط أوردر جديد فوق، وأول component صف هيتعاد استخدامه ليه: هياخد ${pub('order')} الجديد، بس هيحتفظ بـ ${mine('expanded')} بتاعته. فالجزء المفتوح هيبقى تحت الأوردر الغلط. اعمل track لحاجة تخص الأوردر نفسه، زي ${pub('id')}.` }
      ]},
      { t: 'step', n: '3', title: { en: 'A <code>@case</code> that never matches', ar: '<code>@case</code> عمرها ما بتطابق' }, blocks: [
        { t: 'pair',
          bad:  { name: 'order-row.html', lang: 'html', code: ["@case ('Paid') { <span class=\"ok\">Paid</span> }"] },
          good: { name: 'order-row.html', lang: 'html', code: ["@case ('paid') { <span class=\"ok\">Paid</span> }"] } },
        { t: 'p', en: `<code>@switch</code> compares with <code>===</code>, so <code>'Paid'</code> never equals <code>'paid'</code>. Every paid order falls through to ${ng('@default')}. When the field is typed as a list of exact strings, Angular’s template type-checking may point this out; when it is just <code>string</code>, for example from an untyped API response, nothing will. Copy the value from the type, not from the label on screen.`,
                  ar: `<code>@switch</code> بيقارن بـ <code>===</code>، فـ <code>'Paid'</code> عمرها ما هتساوي <code>'paid'</code>. وكل أوردر مدفوع هيقع على ${ng('@default')}. لو الـ field متعرّف بليستة نصوص محددة، الـ type-checking بتاع تمبلت أنجولار ممكن ينبّهك؛ لو هو مجرد <code>string</code>، زي رد API من غير types، محدش هيقولك حاجة. انسخ القيمة من الـ type، مش من الكلام اللي على الشاشة.` }
      ]},
      { t: 'step', n: '4', title: { en: 'The inner loop hides the outer <code>$index</code>', ar: 'اللوب الجوّانية بتخبّي <code>$index</code> البرّانية' }, blocks: [
        { t: 'pair',
          bad:  { name: 'orders.html', lang: 'html', code: [
            '@for (order of orders(); track order.id) {',
            '  @for (tag of order.tags; track tag) {',
            '    <span>{{ $index }}.{{ $index }} {{ tag }}</span>',
            '  }',
            '}' ] },
          good: { name: 'orders.html', lang: 'html', code: [
            '@for (order of orders(); track order.id; let row = $index) {',
            '  @for (tag of order.tags; track tag) {',
            '    <span>{{ row }}.{{ $index }} {{ tag }}</span>',
            '  }',
            '}' ] } },
        { t: 'p', en: `Inside the inner loop, ${ng('$index')} always means the <b>inner</b> position. Both numbers come out the same. Give the outer one your own name, ${mine('row')}, before you go in.`,
                  ar: `جوه اللوب الجوّانية، ${ng('$index')} دايمًا معناها المكان <b>الجوّاني</b>. والرقمين بيطلعوا زي بعض. ادّي البرّاني اسم بتاعك، ${mine('row')}، قبل ما تدخل.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it does nothing', ar: 'لما مايعملش حاجة' },
    title: { en: 'Five questions, in this order', ar: 'خمس أسئلة، بالترتيب ده' },
    lead: {
      en: 'A block does not show, or shows the wrong thing. Ask these first.',
      ar: 'بلوك مش ظاهر، أو ظاهر غلط. اسأل دول الأول.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Does every signal inside <code>@if ( )</code> and <code>@for ( … of … )</code> have its <code>()</code>?',
                  ar: '<b>1.</b> كل signal جوه <code>@if ( )</code> و<code>@for ( … of … )</code> ليها الـ <code>()</code> بتاعتها؟' },
      { t: 'chk', en: '<b>2.</b> Is the name after <code>of</code> the class’s, and the name before it a new one, used the same way in <code>track</code> and inside the block?',
                  ar: '<b>2.</b> الاسم اللي بعد <code>of</code> بتاع الكلاس، واللي قبلها اسم جديد، ومستخدم بنفس الشكل في <code>track</code> وجوه البلوك؟' },
      { t: 'chk', en: '<b>3.</b> Does each <code>@case</code> value match the data exactly, capital letters included?',
                  ar: '<b>3.</b> كل قيمة <code>@case</code> مطابقة للداتا بالظبط، بالحروف الكبيرة والصغيرة؟' },
      { t: 'chk', en: '<b>4.</b> Does state jump between rows? Then check <code>track</code>: it should name something unique to the item, not <code>$index</code>.',
                  ar: '<b>4.</b> الحالة بتنط بين الصفوف؟ يبقى بص على <code>track</code>: لازم تشاور على حاجة فريدة للعنصر، مش <code>$index</code>.' },
      { t: 'chk', en: '<b>5.</b> In nested loops, which <code>$index</code> do you mean? Alias the outer one with <code>let</code>.',
                  ar: '<b>5.</b> في اللوبس المتداخلة، انت قصدك أنهي <code>$index</code>؟ ادّي البرّاني اسم بـ <code>let</code>.' }
    ]
  }
  ]
};
