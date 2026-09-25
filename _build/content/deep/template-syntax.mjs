/* ==================================================================
   Template syntax, name by name — the deep dive after "Template syntax
   and interpolation". One running example (a profile component)
   followed from the class into the template and back, every name
   coloured by who owns it. Model: content/deep/inputs-outputs.mjs.
   ================================================================== */

/* a name in running text, coloured like the code and linked on hover */
const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

/* a data field: after a dot, or declared with "name:" / "name?:" */
const fld = n => '(?<=\\.)' + n + '(?![\\w$-])|(?<![\\w$.-])' + n + '(?=\\??:)';

const USER = 'user.ts', PR = 'profile.ts', PRH = 'profile.html',
      OLD = 'profile.html — older style', NOW = 'profile.html — today';

export default {
  topic: 'template-syntax',
  tab: 'Template syntax, name by name — The Angular Signal',
  title: { en: 'Template syntax, name by name', ar: 'صياغة التمبلت، اسم اسم' },
  say: {
    en: 'The page for when you cannot tell, inside a template, which words come from your class, which the template made up, and which belong to the browser. One profile component followed from class to screen and back, every name coloured. Then what breaks when you rename each one.',
    ar: 'الصفحة دي للي مش عارف يفرّق، جوه التمبلت، أنهي كلمات جاية من الكلاس بتاعه، وأنهي التمبلت هو اللي عملها، وأنهي بتاعة المتصفح. component بروفايل واحد ماشيين وراه من الكلاس للشاشة وبالعكس، وكل اسم ملوّن. وبعدين إيه اللي بيبوظ لما تغيّر كل واحد.'
  },
  lead: {
    en: 'The idea is simple: <b>a template is HTML that can read your class.</b> <code>{{ }}</code> prints, <code>[ ]</code> sets, <code>( )</code> listens, <code>#</code> labels. The confusing part is the names. In one line like <code>(click)="rename(box.value)"</code> there are four words from three different owners, and nobody tells you which is which. This page answers exactly that.',
    ar: 'الفكرة بسيطة: <b>التمبلت ده HTML بيقدر يقرا الكلاس بتاعك.</b> <code>{{ }}</code> بتطبع، و<code>[ ]</code> بتحط، و<code>( )</code> بتسمع، و<code>#</code> بتسمّي. اللي بيلخبط هو الأسماء. في سطر واحد زي <code>(click)="rename(box.value)"</code> فيه أربع كلمات من تلات أصحاب مختلفين، ومحدش بيقولك مين بتاع مين. الصفحة دي بتجاوب على ده بالظبط.'
  },

  names: {
    note: {
      en: 'A template can read three kinds of names: members of its own class (green, declared in <code>profile.ts</code>), names the template declares itself (green too: <code>#box</code>, <code>@let sub</code>, the loop’s <code>tag</code>), and fields of your data types (orange, because <code>user.ts</code> declares them). Blue is Angular’s syntax and the browser’s properties and events.',
      ar: 'التمبلت يقدر يقرا تلات أنواع أسماء: members في الكلاس بتاعه (أخضر، متعلنة في <code>profile.ts</code>)، وأسماء التمبلت بيعلنها بنفسه (أخضر برضه: <code>#box</code> و<code>@let sub</code> و<code>tag</code> بتاع اللوب)، والـ fields بتاعة أنواع الداتا بتاعتك (برتقاني، عشان <code>user.ts</code> هو اللي معلنها). والأزرق هو صياغة أنجولار والـ properties والـ events بتاعة المتصفح.'
    },
    names: [
      /* --- shared: two files must agree --- */
      { n:'User', k:'pub',
        w:{ en:'Your data type. Every file that imports it follows a rename.', ar:'نوع الداتا بتاعك. أي ملف بيعمله import بيتغير معاه.' } },
      { n:'email', k:'pub', re: fld('email'),
        w:{ en:'A field of <code>User</code>. The template reads it as <code>user()?.email</code>. The word inside <code>\'no email on file\'</code> is just text.',
            ar:'field في <code>User</code>. التمبلت بيقراه كـ <code>user()?.email</code>. والكلمة اللي جوه <code>\'no email on file\'</code> مجرد كلام.' } },
      { n:'avatar', k:'pub', re: fld('avatar'),
        w:{ en:'A field of <code>User</code>, bound to the image’s <code>src</code>.', ar:'field في <code>User</code>، مربوط بالـ <code>src</code> بتاع الصورة.' } },
      { n:'subscription', k:'pub', re: fld('subscription'),
        w:{ en:'A field of <code>User</code>. It may be missing, hence the <code>?</code>.', ar:'field في <code>User</code>. ممكن يبقى مش موجود، عشان كده الـ <code>?</code>.' } },
      { n:'plan', k:'pub', re: fld('plan'),
        w:{ en:'A field inside <code>subscription</code>. The plain word “plan” in the text is not this name.', ar:'field جوه <code>subscription</code>. كلمة «plan» العادية اللي في الكلام مش هي الاسم ده.' } },
      { n:'renewsAt', k:'pub', re: fld('renewsAt'),
        w:{ en:'A field inside <code>subscription</code>.', ar:'field جوه <code>subscription</code>.' } },
      { n:'Profile', k:'pub',
        w:{ en:'The component’s class. Whoever shows it imports it by this name.', ar:'كلاس الـ component. أي حد بيعرضه بيعمله import بالاسم ده.' } },
      { n:'app-profile', k:'pub',
        w:{ en:'The component’s selector. A parent types it as a tag.', ar:'الـ selector بتاع الـ component. الأب بيكتبه كتاج.' } },

      /* --- yours: the class's members --- */
      { n:'name', k:'mine', not:['profile.html · clash'], re:'(?<![\\w$-])(?<! alt=")name(?![\\w$-])',
        w:{ en:'The component’s own signal. The template reads it with <code>name()</code>.', ar:'الـ signal بتاعة الـ component. التمبلت بيقراها بـ <code>name()</code>.' } },
      { n:'age', k:'mine', w:{ en:'The component’s own signal.', ar:'الـ signal بتاعة الـ component.' } },
      { n:'tags', k:'mine', w:{ en:'The component’s own signal: a list.', ar:'الـ signal بتاعة الـ component: ليستة.' } },
      { n:'user', k:'mine', re:'(?<![\\w$./-])user(?![\\w$-])',
        w:{ en:'The component’s own signal. It may be <code>null</code>, hence the <code>?.</code>.', ar:'الـ signal بتاعة الـ component. ممكن تبقى <code>null</code>، عشان كده الـ <code>?.</code>.' } },
      { n:'rename', k:'mine',
        w:{ en:'The component’s own method, called from the template’s <code>(click)</code>.', ar:'الميثود بتاعة الـ component، والـ <code>(click)</code> في التمبلت هو اللي بيناديها.' } },
      { n:'newName', k:'mine',
        w:{ en:'The method’s parameter. It receives <code>box.value</code>, but you can call it anything.', ar:'الـ parameter بتاع الميثود. بيستقبل <code>box.value</code>، بس تقدر تسمّيه أي حاجة.' } },

      /* --- yours: names the template declares --- */
      { n:'box', k:'mine',
        w:{ en:'A template reference: <code>#box</code> names the <code>&lt;input&gt;</code>. Only this template knows it; the class does not.',
            ar:'template reference: <code>#box</code> بيسمّي الـ <code>&lt;input&gt;</code>. التمبلت ده بس اللي يعرفه؛ الكلاس ميعرفوش.' } },
      { n:'sub', k:'mine',
        w:{ en:'The name you gave with <code>@let</code>. It exists only after that line, inside the same block.', ar:'الاسم اللي ادّيته بـ <code>@let</code>. موجود بس بعد السطر ده، وجوه نفس البلوك.' } },
      { n:'tag', k:'mine',
        w:{ en:'The loop variable: each item of <code>tags()</code>. It exists only inside the <code>@for</code> block.', ar:'متغير اللوب: كل عنصر في <code>tags()</code>. موجود بس جوه بلوك الـ <code>@for</code>.' } },
      { n:'i', k:'mine', only:[OLD],
        w:{ en:'In the old syntax, the name you gave the index. You picked <code>i</code>; <code>index</code> is Angular’s.', ar:'في الصياغة القديمة، الاسم اللي ادّيته للـ index. انت اخترت <code>i</code>؛ و<code>index</code> بتاعة أنجولار.' } },

      /* --- Angular's, TypeScript's, JavaScript's, the browser's --- */
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator.', ar:'الـ decorator بتاع أنجولار.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The tag after it is yours.', ar:'مفتاح إعداد. التاج اللي بعده بتاعك.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key. The path after it points at your template.', ar:'مفتاح إعداد. المسار اللي بعده بيشاور على التمبلت بتاعك.' } },
      { n:'protected', k:'ng',
        w:{ en:'A TypeScript keyword. A <code>protected</code> member can be read by the template; a <code>private</code> one cannot.', ar:'كلمة من TypeScript. الـ member الـ <code>protected</code> التمبلت يقدر يقراه؛ والـ <code>private</code> لأ.' } },
      { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
      { n:'set', k:'ng', w:{ en:'A signal method: replace the value.', ar:'ميثود بتاعة الـ signal: بتستبدل القيمة.' } },
      { n:'trim', k:'ng', w:{ en:'JavaScript’s string method.', ar:'ميثود الـ string بتاعة JavaScript.' } },
      { n:'@for', k:'ng', w:{ en:'Angular’s loop block.', ar:'بلوك اللوب بتاع أنجولار.' } },
      { n:'of', k:'ng', only:['html'], re:'(?<= )of(?= )',
        w:{ en:'Part of <code>@for</code>.', ar:'جزء من <code>@for</code>.' } },
      { n:'track', k:'ng', w:{ en:'Part of <code>@for</code>. The expression after it is yours.', ar:'جزء من <code>@for</code>. التعبير اللي بعدها بتاعك.' } },
      { n:'$index', k:'ng',
        w:{ en:'Angular’s fixed name for the position inside <code>@for</code>, starting at 0. You never declare it.', ar:'اسم أنجولار الثابت لمكان العنصر جوه <code>@for</code>، بيبدأ من 0. عمرك ما بتعلنه.' } },
      { n:'@let', k:'ng', w:{ en:'Angular’s keyword for a read-only name in the template.', ar:'كلمة أنجولار لاسم read-only في التمبلت.' } },
      { n:'@if', k:'ng', w:{ en:'Angular’s if block.', ar:'بلوك الـ if بتاع أنجولار.' } },
      { n:'src', k:'ng', w:{ en:'The browser’s DOM property of <code>&lt;img&gt;</code>.', ar:'الـ property بتاعة <code>&lt;img&gt;</code> في الـ DOM، بتاعة المتصفح.' } },
      { n:'alt', k:'ng', w:{ en:'The browser’s DOM property of <code>&lt;img&gt;</code>.', ar:'الـ property بتاعة <code>&lt;img&gt;</code> في الـ DOM، بتاعة المتصفح.' } },
      { n:'click', k:'ng', w:{ en:'The browser’s event name.', ar:'اسم الـ event بتاع المتصفح.' } },
      { n:'value', k:'ng',
        w:{ en:'The browser’s property of an <code>&lt;input&gt;</code>: what was typed.', ar:'الـ property بتاعة الـ <code>&lt;input&gt;</code> في المتصفح: اللي اتكتب.' } },
      { n:'*ngFor', k:'ng', w:{ en:'The older loop directive.', ar:'الـ directive القديم بتاع اللوب.' } },
      { n:'index', k:'ng', only:[OLD], re:'(?<== )index(?![\\w$-])',
        w:{ en:'In the old syntax, Angular’s word for the position. You give it your own name with <code>let i = index</code>.', ar:'في الصياغة القديمة، كلمة أنجولار لمكان العنصر. بتدّيها اسم من عندك بـ <code>let i = index</code>.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One rename, five stops', ar: 'تغيير اسم واحد، خمس محطات' },
    lead: {
      en: 'A profile page shows a name. You type a new one in a box and press a button, and the heading changes. Follow the value from the class, through the template, and back:',
      ar: 'صفحة بروفايل بتعرض اسم. بتكتب اسم جديد في خانة وتدوس زرار، والعنوان بيتغير. امشي ورا القيمة من الكلاس، للتمبلت، وبالعكس:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: PR, lang: 'ts', who: { en: 'the class · owns it', ar: 'الكلاس · صاحبها' },
          code: ["protected readonly name = signal('Mona');"],
          say: { en: `Everything the template shows starts in the class. ${mine('name')} is yours; ${ng('signal')} is Angular’s. ${ng('protected')} means “the template may read this, other classes may not”.`,
                 ar: `كل حاجة التمبلت بيعرضها بتبدأ في الكلاس. ${mine('name')} بتاعك؛ و${ng('signal')} بتاعة أنجولار. و${ng('protected')} معناها «التمبلت يقدر يقرا ده، والكلاسات التانية لأ».` } },
        { file: PRH, lang: 'html', who: { en: 'the template · prints', ar: 'التمبلت · بيطبع' },
          code: ['<h1>{{ name() }}</h1>'],
          say: { en: `Inside <code>{{ }}</code>, Angular looks up ${mine('name')} <b>on the class</b>. No <code>this.</code> in templates: every bare name means “my component’s”. The brackets read the signal.`,
                 ar: `جوه <code>{{ }}</code>، أنجولار بيدوّر على ${mine('name')} <b>في الكلاس</b>. مفيش <code>this.</code> في التمبلتس: أي اسم لوحده معناه «بتاع الـ component بتاعي». والقوسين بيقروا الـ signal.` } },
        { file: PRH, lang: 'html', who: { en: 'the template · labels', ar: 'التمبلت · بيسمّي' },
          code: ['<input #box>'],
          say: { en: `The <code>#</code> gives this element a name, ${mine('box')}. You picked it, and it exists <b>only in this template</b>. The class has no idea it exists.`,
                 ar: `الـ <code>#</code> بتدّي العنصر ده اسم، ${mine('box')}. انت اللي اخترته، وموجود <b>في التمبلت ده بس</b>. الكلاس ميعرفش إنه موجود أصلًا.` } },
        { file: PRH, lang: 'html', who: { en: 'the template · listens', ar: 'التمبلت · بيسمع' },
          code: ['<button (click)="rename(box.value)">Use what I typed</button>'],
          say: { en: `Four words, three owners. ${ng('click')} is the browser’s event. ${mine('rename')} is your class’s method. ${mine('box')} is the template’s label. ${ng('value')} is the browser’s property of an input.`,
                 ar: `أربع كلمات، تلات أصحاب. ${ng('click')} الـ event بتاع المتصفح. و${mine('rename')} الميثود بتاعة الكلاس بتاعك. و${mine('box')} الاسم اللي التمبلت ادّاه. و${ng('value')} الـ property بتاعة الـ input في المتصفح.` } },
        { file: PR, lang: 'ts', who: { en: 'the class · updates', ar: 'الكلاس · بيحدّث' },
          code: ['protected rename(newName: string) {', '  this.name.set(newName.trim());', '}'],
          say: { en: `Back in the class, the value arrives as a parameter. You can call it anything; here it is ${mine('newName')}. ${ng('set')} changes the signal, and the <code>&lt;h1&gt;</code> updates by itself.`,
                 ar: `ورجعنا للكلاس، القيمة بتوصل كـ parameter. تقدر تسمّيه أي حاجة؛ هنا اسمه ${mine('newName')}. و${ng('set')} بتغيّر الـ signal، والـ <code>&lt;h1&gt;</code> بيتحدّث لوحده.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'In a template, a bare name is <b>yours</b>: first the template’s own names (<code>#box</code>, <code>@let</code>, loop variables), then your class’s members. After a dot on an element, or inside <code>[ ]</code> and <code>( )</code> on a plain HTML tag, the name is <b>the browser’s</b>. A name starting with <code>$</code> or <code>@</code> is <b>Angular’s</b>.',
        ar: 'في التمبلت، الاسم اللي لوحده <b>بتاعك</b>: الأول أسماء التمبلت نفسه (<code>#box</code> و<code>@let</code> ومتغيرات اللوب)، وبعدين members الكلاس بتاعك. وبعد نقطة على عنصر، أو جوه <code>[ ]</code> و<code>( )</code> على تاج HTML عادي، الاسم <b>بتاع المتصفح</b>. وأي اسم بيبدأ بـ <code>$</code> أو <code>@</code> <b>بتاع أنجولار</b>.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Class or template?', ar: 'الكلاس ولا التمبلت؟' },
    title: { en: 'Who declares what, and who picks the name', ar: 'مين بيعلن إيه، ومين بيختار الاسم' },
    lead: {
      en: 'Every name in a template was declared somewhere. Find where, and you know who owns it and how far it reaches.',
      ar: 'كل اسم في التمبلت اتعلن في حتة. اعرف فين، وهتعرف مين صاحبه ولحد فين بيوصل.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Declared in', 'Reaches', 'Who picks the name'],
                ar: ['الحتة', 'اتعلن في', 'بيوصل لحد', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>{{ name() }}</code>', 'the class', 'the whole template', `you pick ${mine('name')}`],
            ar: ['<code>{{ name() }}</code>', 'الكلاس', 'التمبلت كله', `انت بتختار ${mine('name')}`] },
          { en: ['<code>[src]="user()?.avatar"</code>', 'left: the browser; right: your class and your type', '—', `${ng('src')} is the browser’s; ${mine('user')} and ${pub('avatar')} are yours`],
            ar: ['<code>[src]="user()?.avatar"</code>', 'الشمال: المتصفح؛ اليمين: الكلاس والـ type بتوعك', '—', `${ng('src')} بتاع المتصفح؛ و${mine('user')} و${pub('avatar')} بتوعك`] },
          { en: ['<code>(click)="rename(box.value)"</code>', 'left: the browser; right: your class and the template', '—', `${ng('click')} and ${ng('value')} are the browser’s; ${mine('rename')} and ${mine('box')} are yours`],
            ar: ['<code>(click)="rename(box.value)"</code>', 'الشمال: المتصفح؛ اليمين: الكلاس والتمبلت', '—', `${ng('click')} و${ng('value')} بتوع المتصفح؛ و${mine('rename')} و${mine('box')} بتوعك`] },
          { en: ['<code>#box</code>', 'the template', 'the whole template, not the class', `you pick ${mine('box')}`],
            ar: ['<code>#box</code>', 'التمبلت', 'التمبلت كله، مش الكلاس', `انت بتختار ${mine('box')}`] },
          { en: ['<code>@let sub = …</code>', 'the template', 'the lines after it, in the same block', `you pick ${mine('sub')}; ${ng('@let')} is Angular’s`],
            ar: ['<code>@let sub = …</code>', 'التمبلت', 'السطور اللي بعده، في نفس البلوك', `انت بتختار ${mine('sub')}؛ و${ng('@let')} بتاعة أنجولار`] },
          { en: ['<code>@for (tag of tags(); …)</code>', 'the template', 'inside the <code>@for</code> block only', `you pick ${mine('tag')}; ${ng('$index')} is Angular’s`],
            ar: ['<code>@for (tag of tags(); …)</code>', 'التمبلت', 'جوه بلوك الـ <code>@for</code> بس', `انت بتختار ${mine('tag')}؛ و${ng('$index')} بتاعة أنجولار`] },
        ] },
      { t: 'ul',
        en: ['<b>No <code>this.</code> in a template.</b> <code>name()</code> in the template and <code>this.name()</code> in the class are the same thing. Writing <code>this.</code> in a template works but is never needed.',
             '<b>The left side of <code>[ ]</code> and <code>( )</code> belongs to the element.</b> On <code>&lt;img&gt;</code> and <code>&lt;button&gt;</code> that is the browser. You never invent <code>src</code> or <code>click</code>; you look them up.',
             '<b>The class cannot see template names.</b> <code>box</code>, <code>sub</code> and <code>tag</code> do not exist in <code>profile.ts</code>. To use their values there, pass them to a method, as <code>rename(box.value)</code> does.'],
        ar: ['<b>مفيش <code>this.</code> في التمبلت.</b> <code>name()</code> في التمبلت و<code>this.name()</code> في الكلاس هما نفس الحاجة. لو كتبت <code>this.</code> في التمبلت هتشتغل، بس عمرك ما هتحتاجها.',
             '<b>الناحية الشمال من <code>[ ]</code> و<code>( )</code> بتاعة العنصر.</b> على <code>&lt;img&gt;</code> و<code>&lt;button&gt;</code> ده المتصفح. عمرك ما بتألف <code>src</code> ولا <code>click</code>؛ بتدوّر عليهم.',
             '<b>الكلاس مش شايف أسماء التمبلت.</b> <code>box</code> و<code>sub</code> و<code>tag</code> مش موجودين في <code>profile.ts</code>. عشان تستخدم قيمهم هناك، ابعتهم لميثود، زي ما <code>rename(box.value)</code> بتعمل.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All three files, every name coloured', ar: 'التلات ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same profile, complete, with all four powers and the two template-only names. Hover a coloured name to light up everywhere else it appears. Then press <b>Rename test</b>: every name you own turns into a made-up word, Angular’s and the browser’s words stay put, and the code is still correct.',
      ar: 'نفس البروفايل، كامل، بالأربع قدرات والاسمين اللي التمبلت بس بيعلنهم. قف بالماوس على أي اسم ملوّن وهتنوّر كل الأماكن التانية اللي هو فيها. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: كل اسم بتاعك هيبقى كلمة عشوائية، وكلمات أنجولار والمتصفح هتفضل مكانها، والكود لسه صح.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: USER, lang: 'ts', tag: { en: 'the data', ar: 'الداتا' }, code: [
        'export interface User {',
        '  email: string;',
        '  avatar: string;',
        '  subscription?: { plan: string; renewsAt: string };',
        '}' ] },
      { t: 'code', name: PR, lang: 'ts', tag: { en: 'the class', ar: 'الكلاس' }, code: [
        "import { Component, signal } from '@angular/core';",
        "import { User } from './user';",
        '',
        '@Component({',
        "  selector: 'app-profile',",
        "  templateUrl: './profile.html',",
        '})',
        'export class Profile {',
        "  protected readonly name = signal('Mona');",
        '  protected readonly age = signal(30);',
        "  protected readonly tags = signal(['admin', 'beta']);",
        '  protected readonly user = signal<User | null>(null);',
        '',
        '  protected rename(newName: string) {',
        '    this.name.set(newName.trim());',
        '  }',
        '}' ] },
      { t: 'code', name: PRH, lang: 'html', tag: { en: 'the template', ar: 'التمبلت' }, code: [
        '<!-- 1. {{ }} prints -->',
        '<h1>{{ name() }}</h1>',
        "<p>{{ age() }} years old, {{ age() >= 18 ? 'adult' : 'minor' }}</p>",
        "<p>{{ user()?.email ?? 'no email on file' }}</p>",
        '',
        '@for (tag of tags(); track tag) {',
        '  <span>{{ $index + 1 }}. {{ tag }}</span>',
        '}',
        '',
        '<!-- 2. [ ] sets a property -->',
        '<img [src]="user()?.avatar" [alt]="name()">',
        '',
        '@let sub = user()?.subscription;',
        '@if (sub) {',
        '  <p>{{ sub.plan }} plan, renews {{ sub.renewsAt }}</p>',
        '}',
        '',
        '<!-- 3. # labels, 4. ( ) listens -->',
        '<input #box>',
        '<button (click)="rename(box.value)">Use what I typed</button>' ] },
      { t: 'nmtable' }
    ]
  },

  /* ------------------------------------------------------------ 4 */
  {
    id: 'rename',
    kicker: { en: 'Is it OK to change it?', ar: 'ينفع أغيّره؟' },
    title: { en: 'What breaks when you rename each name', ar: 'إيه اللي بيبوظ لما تغيّر كل اسم' },
    lead: {
      en: 'Angular type-checks templates against the class, so almost every missed rename is a compile error, which is good. The dangerous ones are the browser’s <b>event</b> names: a wrong one is not an error.',
      ar: 'أنجولار بيعمل type-check للتمبلتس على الكلاس، فتقريبًا أي تغيير اسم نسيته بيبقى compile error، وده كويس. الخطيرين هما أسماء الـ <b>events</b> بتاعة المتصفح: الاسم الغلط فيهم مش error.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [`${mine('name')}, ${mine('age')}, ${mine('tags')}, ${mine('user')}`, 'every use in the template', 'Compile error: the property does not exist on the class.'],
            ar: [`${mine('name')} و${mine('age')} و${mine('tags')} و${mine('user')}`, 'كل استخدام في التمبلت', 'Compile error: الـ property مش موجودة في الكلاس.'] },
          { en: [mine('rename') + ' (method)', '<code>(click)="rename(…)"</code>', 'Compile error in the template.'],
            ar: [mine('rename') + ' (ميثود)', '<code>(click)="rename(…)"</code>', 'Compile error في التمبلت.'] },
          { en: [mine('newName') + ' (parameter)', 'only the body of that method', 'Compile error inside the method.'],
            ar: [mine('newName') + ' (parameter)', 'جسم الميثود دي بس', 'Compile error جوه الميثود.'] },
          { en: [mine('box') + ' (<code>#box</code>)', 'every <code>box.</code> in the same template', 'Compile error: Angular then looks for <code>box</code> on the class and does not find it.'],
            ar: [mine('box') + ' (<code>#box</code>)', 'كل <code>box.</code> في نفس التمبلت', 'Compile error: أنجولار ساعتها بيدوّر على <code>box</code> في الكلاس ومش بيلاقيه.'] },
          { en: [mine('sub') + ' (<code>@let</code>)', 'the uses after it, in the same block', 'Compile error in the template.'],
            ar: [mine('sub') + ' (<code>@let</code>)', 'الاستخدامات اللي بعده، في نفس البلوك', 'Compile error في التمبلت.'] },
          { en: [mine('tag') + ' (loop variable)', 'the <code>track</code> expression and the block’s body', 'Compile error inside the block.'],
            ar: [mine('tag') + ' (متغير اللوب)', 'تعبير الـ <code>track</code> وجسم البلوك', 'Compile error جوه البلوك.'] },
          { en: [`${pub('email')}, ${pub('avatar')}, ${pub('plan')} (fields)`, 'the <code>User</code> interface and every template that reads them', 'Compile error wherever the old field is read.'],
            ar: [`${pub('email')} و${pub('avatar')} و${pub('plan')} (fields)`, 'الـ interface <code>User</code> وكل تمبلت بيقراهم', 'Compile error في كل حتة بتقرا الـ field القديم.'] },
          { en: [ng('src') + ' (a browser property)', 'you cannot: <code>[scr]</code> is a typo, not a rename', 'Compile error: <i>Can’t bind to \'scr\' since it isn’t a known property of \'img\'</i>.'],
            ar: [ng('src') + ' (property بتاعة المتصفح)', 'مينفعش: <code>[scr]</code> غلطة إملائية، مش تغيير اسم', 'Compile error: <i>Can’t bind to \'scr\' since it isn’t a known property of \'img\'</i>.'] },
          { en: [ng('click') + ' (a browser event)', 'you cannot: <code>(clik)</code> is a typo', '<b>No error at all.</b> Angular listens for an event called <code>clik</code>, which never comes.'],
            ar: [ng('click') + ' (event بتاع المتصفح)', 'مينفعش: <code>(clik)</code> غلطة إملائية', '<b>مفيش أي error.</b> أنجولار بيسمع لـ event اسمه <code>clik</code>، وده عمره ما هييجي.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b> in the bar above the files. <code>name</code>, <code>box</code>, <code>sub</code> and <code>tag</code> all change, but <code>src</code>, <code>alt</code>, <code>click</code>, <code>value</code> and <code>$index</code> do not move. That is the line between your names and everyone else’s.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b> في الشريط اللي فوق الملفات. <code>name</code> و<code>box</code> و<code>sub</code> و<code>tag</code> كلهم بيتغيروا، لكن <code>src</code> و<code>alt</code> و<code>click</code> و<code>value</code> و<code>$index</code> مش بيتحركوا. ده الخط اللي بين أسماءك وأسماء كل الناس التانية.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتوعك' },
    title: { en: 'The fixed names: <code>@</code>, <code>$</code>, and the browser', ar: 'الأسماء الثابتة: <code>@</code> و<code>$</code> والمتصفح' },
    lead: {
      en: 'Three families of names in a template are never yours. Two of them are easy to spot because of their first character.',
      ar: 'فيه تلات عائلات أسماء في التمبلت عمرها ما بتبقى بتاعتك. اتنين منهم سهل تعرفهم من أول حرف.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Family', 'Examples', 'Rule'], ar: ['العيلة', 'أمثلة', 'القاعدة'] },
        rows: [
          { en: ['<b>Starts with <code>@</code></b>: Angular’s blocks', `${ng('@if')}, ${ng('@for')}, ${ng('@let')}, <code>@switch</code>, <code>@defer</code>`, 'Only Angular defines these. The names you put <i>after</i> them (<code>@let sub</code>) are yours.'],
            ar: ['<b>بيبدأ بـ <code>@</code></b>: بلوكات أنجولار', `${ng('@if')} و${ng('@for')} و${ng('@let')} و<code>@switch</code> و<code>@defer</code>`, 'أنجولار بس اللي بيعرّفهم. والأسماء اللي بتحطها <i>بعدهم</i> (<code>@let sub</code>) بتاعتك.'] },
          { en: ['<b>Starts with <code>$</code></b>: Angular’s special values', `${ng('$index')}, <code>$first</code>, <code>$last</code>, <code>$count</code> in <code>@for</code>; <code>$event</code> in <code>( )</code>; <code>$any()</code>`, 'They exist without you declaring them, only in their place: <code>$index</code> only inside <code>@for</code>, <code>$event</code> only inside <code>( )="…"</code>.'],
            ar: ['<b>بيبدأ بـ <code>$</code></b>: قيم أنجولار الخاصة', `${ng('$index')} و<code>$first</code> و<code>$last</code> و<code>$count</code> في <code>@for</code>؛ و<code>$event</code> في <code>( )</code>؛ و<code>$any()</code>`, 'موجودين من غير ما تعلنهم، بس في مكانهم: <code>$index</code> جوه <code>@for</code> بس، و<code>$event</code> جوه <code>( )="…"</code> بس.'] },
          { en: ['<b>The browser’s</b>: tags, properties, events', `${ng('src')}, ${ng('alt')}, ${ng('value')}, ${ng('click')}, <code>&lt;img&gt;</code>, <code>&lt;input&gt;</code>`, 'Look them up (MDN), never invent them. A wrong property is a compile error; a wrong event is silent.'],
            ar: ['<b>بتوع المتصفح</b>: تاجات، properties، events', `${ng('src')} و${ng('alt')} و${ng('value')} و${ng('click')} و<code>&lt;img&gt;</code> و<code>&lt;input&gt;</code>`, 'دوّر عليهم (MDN)، ومتألفهمش. الـ property الغلط compile error؛ والـ event الغلط ساكت.'] },
        ] },
      { t: 'p',
        en: `Plain JavaScript methods work inside expressions, and they are JavaScript’s names: ${ng('trim')} in the class, <code>toUpperCase()</code> or <code>join()</code> in a template. What a template cannot reach are <b>globals</b> like <code>window</code>, <code>Math</code> or <code>console</code>: if you need one, expose it from the class.`,
        ar: `ميثودز JavaScript العادية بتشتغل جوه التعبيرات، وأسماءها بتاعة JavaScript: ${ng('trim')} في الكلاس، أو <code>toUpperCase()</code> أو <code>join()</code> في التمبلت. اللي التمبلت مايقدرش يوصله هو الـ <b>globals</b> زي <code>window</code> و<code>Math</code> و<code>console</code>: لو محتاج واحد منهم، اعرضه من الكلاس.` }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names for a template', ar: 'تختار أسماء كويسة للتمبلت إزاي' },
    lead: {
      en: 'A template is read far more often than it is written. These habits make it read like a sentence.',
      ar: 'التمبلت بيتقري أكتر بكتير ما بيتكتب. العادات دي بتخليه يتقري زي جملة.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['a class member the template reads', '<code>name</code>, <code>user</code>, <code>isAdult</code>', '<code>data</code>, <code>val</code>, <code>x</code>', 'The template shows it; the name should say what the user sees.'],
            ar: ['member في الكلاس التمبلت بيقراه', '<code>name</code>، <code>user</code>، <code>isAdult</code>', '<code>data</code>، <code>val</code>، <code>x</code>', 'التمبلت بيعرضه؛ فالاسم المفروض يقول المستخدم شايف إيه.'] },
          { en: ['a template reference', '<code>#box</code>, <code>#searchInput</code>', '<code>#input</code>, <code>#name</code>', 'Do not reuse a class member’s name, or a tag name. The template name wins and hides the other one (see below).'],
            ar: ['template reference', '<code>#box</code>، <code>#searchInput</code>', '<code>#input</code>، <code>#name</code>', 'متستخدمش اسم member في الكلاس، ولا اسم تاج. اسم التمبلت بيكسب وبيخبّي التاني (بص تحت).'] },
          { en: ['a loop variable', '<code>tag</code> for <code>tags()</code>', '<code>item</code> for everything, <code>tags</code> for one tag', 'Singular of the list’s name. It reads as “for each tag of tags”.'],
            ar: ['متغير اللوب', '<code>tag</code> لـ <code>tags()</code>', '<code>item</code> لكل حاجة، <code>tags</code> لتاج واحد', 'مفرد اسم الليستة. بتتقري «لكل tag في tags».'] },
          { en: ['an <code>@let</code>', '<code>sub</code>, <code>total</code>', 'long names copied from the chain', 'It exists to shorten a long expression. Short and clear.'],
            ar: ['<code>@let</code>', '<code>sub</code>، <code>total</code>', 'أسماء طويلة منسوخة من السلسلة', 'هو معمول عشان يختصر تعبير طويل. قصير وواضح.'] },
          { en: ['members only the template uses', '<code>protected</code>', '<code>public</code> by default, or <code>private</code>', 'The Angular style guide suggests <code>protected</code> for members used only by the template. <code>private</code> ones the template cannot read at all.'],
            ar: ['members التمبلت بس بيستخدمها', '<code>protected</code>', '<code>public</code> على طول، أو <code>private</code>', 'دليل أنجولار بينصح بـ <code>protected</code> للـ members اللي التمبلت بس بيستخدمها. والـ <code>private</code> التمبلت مايقدرش يقراها خالص.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Three rules about what a template can see', ar: 'تلات قواعد عن التمبلت يقدر يشوف إيه' },
    lead: {
      en: 'A name being yours does not mean the template can use it anywhere. Three rules decide.',
      ar: 'إن الاسم بتاعك مش معناه إن التمبلت يقدر يستخدمه في أي حتة. فيه تلات قواعد هي اللي بتحكم.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'private members are invisible to the template', ar: 'الـ members الـ private مش ظاهرة للتمبلت' }, blocks: [
        { t: 'pair',
          bad:  { name: PR, lang: 'ts', code: ["  private readonly name = signal('Mona');"] },
          good: { name: PR, lang: 'ts', code: ["  protected readonly name = signal('Mona');"] } },
        { t: 'p', en: 'The template is checked like code outside the class, so a <code>private</code> member used in it is a compile error. <code>protected</code> and <code>public</code> both work.',
                  ar: 'التمبلت بيتراجع كأنه كود برّه الكلاس، فأي member <code>private</code> مستخدم فيه بيبقى compile error. <code>protected</code> و<code>public</code> الاتنين شغالين.' }
      ]},
      { t: 'step', n: 'B', title: { en: 'A template name hides a class name', ar: 'اسم التمبلت بيخبّي اسم الكلاس' }, blocks: [
        { t: 'pair',
          bad:  { name: 'profile.html · clash', lang: 'html', code: ['<h1>{{ name() }}</h1>', '<input #name>'] },
          good: { name: 'profile.html · no clash', lang: 'html', code: ['<h1>{{ name() }}</h1>', '<input #box>'] } },
        { t: 'p', en: 'When a template name (a <code>#ref</code>, a loop variable, an <code>@let</code>) and a class member share a spelling, the template name wins everywhere in its scope. Here <code>name</code> suddenly means the <code>&lt;input&gt;</code> element, and <code>name()</code> fails with a confusing “not callable” error.',
                  ar: 'لما اسم في التمبلت (<code>#ref</code>، أو متغير لوب، أو <code>@let</code>) وmember في الكلاس يبقوا نفس الكتابة، اسم التمبلت بيكسب في كل مكان جوه النطاق بتاعه. هنا <code>name</code> فجأة بقى معناه عنصر الـ <code>&lt;input&gt;</code>، و<code>name()</code> بتفشل بـ error ملخبط «not callable».' }
      ]},
      { t: 'step', n: 'C', title: { en: 'Template names have a scope', ar: 'أسماء التمبلت ليها نطاق' }, blocks: [
        { t: 'p', en: `${mine('tag')} exists only inside its <code>@for</code> block. ${mine('sub')} exists only after its <code>@let</code> line, inside the same block, and can never be reassigned. ${mine('box')} is visible in the whole template (unless it sits inside a block like <code>@if</code>, then only in that block). None of them exist in the class.`,
                  ar: `${mine('tag')} موجود بس جوه بلوك الـ <code>@for</code> بتاعه. و${mine('sub')} موجود بس بعد سطر الـ <code>@let</code> بتاعه، وجوه نفس البلوك، ومينفعش يتغير أبدًا. و${mine('box')} ظاهر في التمبلت كله (إلا لو هو جوه بلوك زي <code>@if</code>، ساعتها جوه البلوك ده بس). ولا واحد فيهم موجود في الكلاس.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: '<code>*ngFor</code>: you had to name the index yourself', ar: '<code>*ngFor</code>: كان لازم تسمّي الـ index بنفسك' },
    lead: {
      en: 'Older templates use <code>*ngFor</code> and <code>*ngIf</code>. The loop variable works the same, but the extras are the other way round: you invent a name and point it at Angular’s word.',
      ar: 'التمبلتس الأقدم بتستخدم <code>*ngFor</code> و<code>*ngIf</code>. متغير اللوب بيشتغل بنفس الطريقة، بس الحاجات الزيادة بالعكس: انت بتألف اسم وتربطه بكلمة أنجولار.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: OLD, lang: 'html', code: [
          '<span *ngFor="let tag of tags(); let i = index">',
          '  {{ i + 1 }}. {{ tag }}',
          '</span>' ] },
        good: { name: NOW, lang: 'html', code: [
          '@for (tag of tags(); track tag) {',
          '  <span>{{ $index + 1 }}. {{ tag }}</span>',
          '}' ] } },
      { t: 'p',
        en: `In <code>let i = index</code>, ${mine('i')} is yours and ${ng('index')} is Angular’s. With ${ng('@for')} you skip that step: ${ng('$index')} is already there. The old form also needs <code>NgFor</code> (or <code>CommonModule</code>) in <code>imports</code>, which <code>@for</code> does not.`,
        ar: `في <code>let i = index</code>، ${mine('i')} بتاعك و${ng('index')} بتاعة أنجولار. مع ${ng('@for')} بتنط الخطوة دي: ${ng('$index')} موجودة جاهزة. والشكل القديم محتاج كمان <code>NgFor</code> (أو <code>CommonModule</code>) في <code>imports</code>، و<code>@for</code> لأ.` }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, and says nothing', ar: 'مش بيعمل حاجة، ومش بيقول حاجة' },
    title: { en: 'Mistakes that fail silently', ar: 'غلطات بتفشل في صمت' },
    lead: {
      en: 'Most template mistakes are caught at compile time. These are the ones that are not, or that give an error you would not connect to the cause.',
      ar: 'أغلب غلطات التمبلت بتتمسك وقت الـ compile. دول اللي مش بيتمسكوا، أو اللي بيدّوا error مش هتربطه بالسبب.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'A typo in an event name', ar: 'غلطة إملائية في اسم event' }, blocks: [
        { t: 'pair',
          bad:  { name: PRH, lang: 'html', code: ['<button (clik)="rename(box.value)">Use what I typed</button>'] },
          good: { name: PRH, lang: 'html', code: ['<button (click)="rename(box.value)">Use what I typed</button>'] } },
        { t: 'p', en: 'Browsers allow custom events with any name, so Angular accepts <code>(clik)</code> and waits for an event that never fires. No error. Property names are checked; event names are not.',
                  ar: 'المتصفحات بتسمح بـ events متألفة بأي اسم، فأنجولار بيقبل <code>(clik)</code> ويستنى event عمره ما هيحصل. مفيش error. أسماء الـ properties بتتراجع؛ أسماء الـ events لأ.' }
      ]},
      { t: 'step', n: '2', title: { en: 'Forgetting the square brackets', ar: 'نسيان الأقواس المربعة' }, blocks: [
        { t: 'pair',
          bad:  { name: PRH, lang: 'html', code: ['<img [src]="user()?.avatar" alt="name()">'] },
          good: { name: PRH, lang: 'html', code: ['<img [src]="user()?.avatar" [alt]="name()">'] } },
        { t: 'p', en: 'Without brackets, <code>alt</code> is a plain HTML attribute, and its value is the literal text <code>name()</code>. Valid HTML, so nothing complains. Brackets are what make the quotes mean “an expression”.',
                  ar: 'من غير أقواس، <code>alt</code> بتبقى attribute HTML عادية، وقيمتها الكلام الحرفي <code>name()</code>. HTML سليم، فمحدش بيشتكي. الأقواس هي اللي بتخلي علامات التنصيص معناها «تعبير».' }
      ]},
      { t: 'step', n: '3', title: { en: 'A signal without its brackets', ar: 'signal من غير القوسين بتوعها' }, blocks: [
        { t: 'pair',
          bad:  { name: PRH, lang: 'html', code: ['<h1>{{ name }}</h1>'] },
          good: { name: PRH, lang: 'html', code: ['<h1>{{ name() }}</h1>'] } },
        { t: 'p', en: 'A signal is a function. <code>{{ name }}</code> prints the signal itself instead of <code>Mona</code>, and <code>@if (name)</code> is always true. Angular may show a warning for this, but it is not an error.',
                  ar: 'الـ signal دي function. <code>{{ name }}</code> بتطبع الـ signal نفسها بدل <code>Mona</code>، و<code>@if (name)</code> بتبقى true دايمًا. أنجولار ممكن يطلّع warning، بس ده مش error.' }
      ]},
      { t: 'step', n: '4', title: { en: 'Missing ?. on data that is not there yet', ar: 'نسيان ?. على داتا لسه موصلتش' }, blocks: [
        { t: 'pair',
          bad:  { name: PRH, lang: 'html', code: ['<p>{{ user().email }}</p>'] },
          good: { name: PRH, lang: 'html', code: ["<p>{{ user()?.email ?? 'no email on file' }}</p>"] } },
        { t: 'p', en: '<code>user()</code> starts as <code>null</code>. Angular’s strict checking usually catches this at compile time, because the type says <code>User | null</code>. If the type is too loose (say, <code>any</code>), it slips through and becomes <i>Cannot read properties of null</i> in the browser console.',
                  ar: '<code>user()</code> بتبدأ <code>null</code>. الـ strict checking بتاع أنجولار غالبًا بيمسك ده وقت الـ compile، عشان الـ type بيقول <code>User | null</code>. لو الـ type واسع أوي (زي <code>any</code>)، بيعدّي ويبقى <i>Cannot read properties of null</i> في الـ console بتاع المتصفح.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it shows the wrong thing', ar: 'لما بيعرض حاجة غلط' },
    title: { en: 'Six questions, in this order', ar: 'ست أسئلة، بالترتيب ده' },
    lead: {
      en: 'Your template shows nothing, shows your code, or ignores a click. Ask these first.',
      ar: 'التمبلت بتاعك مش بيعرض حاجة، أو بيعرض الكود بتاعك، أو بيتجاهل كليك. اسأل دول الأول.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Is every bare name either a non-<code>private</code> member of this component’s class, or declared in this template (<code>#</code>, <code>@let</code>, loop variable)?',
                  ar: '<b>1.</b> كل اسم لوحده يا إما member مش <code>private</code> في كلاس الـ component ده، يا إما متعلن في التمبلت ده (<code>#</code> أو <code>@let</code> أو متغير لوب)؟' },
      { t: 'chk', en: '<b>2.</b> Are signals called with brackets: <code>name()</code>?',
                  ar: '<b>2.</b> الـ signals متنادية بالقوسين: <code>name()</code>؟' },
      { t: 'chk', en: '<b>3.</b> Does every attribute that should hold an expression have <code>[ ]</code> around its name?',
                  ar: '<b>3.</b> كل attribute المفروض فيها تعبير عليها <code>[ ]</code> حوالين اسمها؟' },
      { t: 'chk', en: '<b>4.</b> Is the event name in <code>( )</code> the browser’s real event name?',
                  ar: '<b>4.</b> اسم الـ event اللي في <code>( )</code> هو اسم الـ event الحقيقي بتاع المتصفح؟' },
      { t: 'chk', en: '<b>5.</b> Does a <code>#ref</code>, loop variable or <code>@let</code> accidentally share a name with a class member?',
                  ar: '<b>5.</b> فيه <code>#ref</code> أو متغير لوب أو <code>@let</code> واخد نفس اسم member في الكلاس بالغلط؟' },
      { t: 'chk', en: '<b>6.</b> Is there a <code>?.</code> wherever the data may still be <code>null</code>?',
                  ar: '<b>6.</b> فيه <code>?.</code> في كل حتة الداتا ممكن تكون لسه <code>null</code>؟' }
    ]
  }
  ]
};
