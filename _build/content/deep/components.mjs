/* ==================================================================
   @Component, name by name — the deep dive after "A component is a
   class with a label on it". One running example (a page that shows a
   list of user cards) followed through every file, every name coloured
   by who owns it. Model: content/deep/inputs-outputs.mjs.
   ================================================================== */

/* a name in running text, coloured like the code and linked on hover */
const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

const PERSON = 'person.ts', UC = 'user-card.ts', UCH = 'user-card.html', UCC = 'user-card.css',
      PG = 'page.ts', PGH = 'page.html', PGC = 'page.css',
      ALIAS = 'user-card.ts · with alias', ALIASH = 'user-card.html · with alias', PGA = 'page.html · with alias',
      OLD = 'user-card.component.ts — older style', NOW = 'user-card.ts — today';

export default {
  topic: 'components',
  tab: '@Component, name by name — The Angular Signal',
  title: { en: '<code>@Component</code>, name by name', ar: '<code>@Component</code>، اسم اسم' },
  say: {
    en: 'The page for when a component’s class name, selector, file names and inputs blur together. One user card followed from its own files into the page that shows it, every name coloured: <b>Angular’s</b>, <b>yours</b>, or <b>yours but shared</b>. Then what breaks when you rename each one.',
    ar: 'الصفحة دي للي اسم الكلاس والـ selector وأسماء الملفات والـ inputs بتاعة الـ component بيدخلوا في بعض عنده. كارت يوزر واحد ماشيين وراه من ملفاته لحد الصفحة اللي بتعرضه، وكل اسم ملوّن: <b>بتاع أنجولار</b>، ولا <b>بتاعك</b>، ولا <b>بتاعك بس متشارك</b>. وبعدين إيه اللي بيبوظ لما تغيّر كل واحد.'
  },
  lead: {
    en: 'The idea is simple: <b>a component is a class with a label that says which tag it answers to.</b> The confusing part is the names. One card has a class name, a selector, three file names, two inputs and a CSS class, and the parent types some of them again. Nobody tells you which ones the parent depends on, and why <code>[name]="p.name"</code> has the same word twice. This page answers exactly that.',
    ar: 'الفكرة بسيطة: <b>الـ component كلاس عليه لافتة بتقول هو بيرد على أنهي تاج.</b> اللي بيلخبط هو الأسماء. كارت واحد ليه اسم كلاس، وselector، وتلات أسماء ملفات، واتنين inputs، وCSS class، والأب بيكتب شوية منهم تاني. ومحدش بيقولك الأب معتمد على مين فيهم، وليه <code>[name]="p.name"</code> فيها نفس الكلمة مرتين. الصفحة دي بتجاوب على ده بالظبط.'
  },

  names: {
    note: {
      en: 'A component has three public faces: its <b>class name</b> (the parent lists it in <code>imports</code>), its <b>selector</b> (the parent types it as a tag) and its <b>inputs</b> (the parent sets them in <code>[ ]</code>). Those are orange. Everything green stays inside the component. Note the two <code>name</code> rows: the card’s input and the field in your data share a spelling, but they are different names.',
      ar: 'الـ component ليه تلات وشوش عمومية: <b>اسم الكلاس</b> (الأب بيحطه في <code>imports</code>)، و<b>الـ selector</b> (الأب بيكتبه كتاج)، و<b>الـ inputs</b> (الأب بيحطها في <code>[ ]</code>). دول البرتقاني. وكل حاجة خضرا بتفضل جوه الـ component. وخد بالك من صفين <code>name</code>: الـ input بتاع الكارت والـ field اللي في الداتا بتاعتك ليهم نفس الكتابة، بس هما اسمين مختلفين.'
    },
    names: [
      /* --- shared: two files must agree --- */
      { n:'UserCard', k:'pub', as:'Banana',
        w:{ en:'The card’s class. The page imports it and lists it in <code>imports</code>, so both files change together.',
            ar:'كلاس الكارت. الصفحة بتعمله import وبتحطه في <code>imports</code>، فالملفين بيتغيروا مع بعض.' } },
      { n:'app-user-card', k:'pub', as:'app-banana',
        w:{ en:'The card’s selector. The <code>selector</code> string and the tag in the page template must match.',
            ar:'الـ selector بتاع الكارت. النص في <code>selector</code> والتاج في تمبلت الصفحة لازم يبقوا زي بعض.' } },
      { n:'user-card', k:'pub', as:'banana', re:'(?<=[./])user-card(?=[.\'])',
        w:{ en:'The card’s file name. <code>templateUrl</code>, <code>styleUrl</code> and the page’s import path all point at it.',
            ar:'اسم ملف الكارت. <code>templateUrl</code> و<code>styleUrl</code> ومسار الـ import عند الصفحة كلهم بيشاوروا عليه.' } },
      { n:'name', k:'pub', only:[UC, UCH, PGH, OLD, NOW], re:'(?<![\\w$.-])name(?![\\w$-])',
        w:{ en:'The card’s <b>input</b>. The page sets it with <code>[name]</code>, so both files change together. Not the same as <code>p.name</code>.',
            ar:'الـ <b>input</b> بتاع الكارت. الصفحة بتحطه بـ <code>[name]</code>، فالملفين بيتغيروا مع بعض. مش هو نفس <code>p.name</code>.' } },
      { n:'email', k:'pub', only:[UC, UCH, PGH, PGA, OLD, NOW], re:'(?<![\\w$.-])email(?![\\w$-])',
        w:{ en:'The card’s second input, set with <code>[email]</code>. Not the same as <code>p.email</code>.',
            ar:'الـ input التاني بتاع الكارت، بيتحط بـ <code>[email]</code>. مش هو نفس <code>p.email</code>.' } },
      { n:'name', k:'pub', only:[PERSON, PG, PGH, PGA], re:'(?<=\\.)name(?![\\w$-])|(?<![\\w$.-])name(?=:)', as:'nickname',
        w:{ en:'A <b>field</b> of your <code>Person</code> data, read as <code>p.name</code>. Renaming it means changing the interface, the data and every <code>.name</code>. Same spelling as the input, different thing.',
            ar:'<b>field</b> في داتا <code>Person</code> بتاعتك، بيتقري كـ <code>p.name</code>. لو غيّرته لازم تغيّر الـ interface والداتا وكل <code>.name</code>. نفس كتابة الـ input، بس حاجة تانية.' } },
      { n:'email', k:'pub', only:[PERSON, PG, PGH, PGA], re:'(?<=\\.)email(?![\\w$-])|(?<![\\w$.-])email(?=:)', as:'inbox',
        w:{ en:'A field of your <code>Person</code> data, read as <code>p.email</code> (also in <code>track</code>).',
            ar:'field في داتا <code>Person</code> بتاعتك، بيتقري كـ <code>p.email</code> (وفي <code>track</code> برضه).' } },
      { n:'Person', k:'pub',
        w:{ en:'Your data type. Every file that imports it follows a rename.', ar:'نوع الداتا بتاعك. أي ملف بيعمله import بيتغير معاه.' } },
      { n:'Page', k:'pub',
        w:{ en:'The page’s class. Whatever shows this page (a route or a parent) imports it by this name.',
            ar:'كلاس الصفحة. أي حاجة بتعرض الصفحة دي (route أو أب) بتعملها import بالاسم ده.' } },
      { n:'app-page', k:'pub',
        w:{ en:'The page’s selector. Any parent that types it as a tag must match.', ar:'الـ selector بتاع الصفحة. أي أب بيكتبه كتاج لازم يبقى زيه.' } },
      { n:'fullName', k:'pub',
        w:{ en:'An alias. Once it exists, this is the name the page types in <code>[ ]</code>, and the class property behind it becomes private.',
            ar:'alias. أول ما يبقى موجود، ده الاسم اللي الصفحة بتكتبه في <code>[ ]</code>، والـ property اللي وراه بتبقى خاصة.' } },
      { n:'UserCardComponent', k:'pub', as:'BananaComponent',
        w:{ en:'The older name of the class. Same promise as <code>UserCard</code>.', ar:'الاسم القديم للكلاس. نفس وعد <code>UserCard</code>.' } },

      /* --- yours, private to one component --- */
      { n:'name', k:'mine', only:[ALIAS, ALIASH], re:'(?<![\\w$.-])name(?![\\w$-])',
        w:{ en:'With an alias, the property name is only used inside the card.', ar:'مع الـ alias، اسم الـ property بيتستخدم جوه الكارت بس.' } },
      { n:'people', k:'mine',
        w:{ en:'The page’s own data, read by its own template.', ar:'الداتا بتاعة الصفحة، والتمبلت بتاعها بيقراها.' } },
      { n:'p', k:'mine', only:[PGH, PGA], re:'(?<![\\w$.-])p(?=[ .])',
        w:{ en:'The loop variable: the name you give each item inside <code>@for</code>. It exists only inside that block.',
            ar:'متغير الـ loop: الاسم اللي بتدّيه لكل عنصر جوه <code>@for</code>. موجود بس جوه البلوك ده.' } },
      { n:'card', k:'mine', only:[UCH, UCC],
        w:{ en:'A CSS class. The card’s template and the card’s CSS must agree, and nothing checks that they do.',
            ar:'CSS class. تمبلت الكارت والـ CSS بتاعه لازم يتفقوا، ومفيش حاجة بتتأكد إنهم متفقين.' } },

      /* --- Angular's, the browser's --- */
      { n:'@Component', k:'ng',
        w:{ en:'Angular’s decorator: the label that turns a class into a component.', ar:'الـ decorator بتاع أنجولار: اللافتة اللي بتحوّل الكلاس لـ component.' } },
      { n:'selector', k:'ng',
        w:{ en:'An option key Angular reads. The tag name you give it is yours.', ar:'مفتاح إعداد أنجولار بيقراه. اسم التاج اللي بتحطه فيه بتاعك.' } },
      { n:'imports', k:'ng',
        w:{ en:'An option key Angular reads: the components this template may use. The class names inside it are yours.',
            ar:'مفتاح إعداد أنجولار بيقراه: الـ components اللي التمبلت ده مسموح له يستخدمها. أسماء الكلاسات اللي جواه بتاعتك.' } },
      { n:'templateUrl', k:'ng',
        w:{ en:'An option key Angular reads. The path is relative to this <code>.ts</code> file.', ar:'مفتاح إعداد أنجولار بيقراه. المسار بيتحسب من مكان ملف الـ <code>.ts</code> ده.' } },
      { n:'styleUrl', k:'ng',
        w:{ en:'An option key Angular reads, for the component’s CSS file.', ar:'مفتاح إعداد أنجولار بيقراه، لملف الـ CSS بتاع الـ component.' } },
      { n:'input', k:'ng', re:'(?<![\\w$<(-])input(?=[.(<])',
        w:{ en:'Angular’s function that creates an input. Only the property name on its left is yours.',
            ar:'الـ function بتاعة أنجولار اللي بتعمل input. اسم الـ property اللي على شمالها بس هو بتاعك.' } },
      { n:'required', k:'ng',
        w:{ en:'Part of Angular’s API: a required input must be set by the parent.', ar:'جزء من API أنجولار: الـ input الـ required لازم الأب يحطه.' } },
      { n:'alias', k:'ng',
        w:{ en:'An option key Angular reads. The string you give it is yours.', ar:'مفتاح إعداد أنجولار بيقراه. النص اللي بتديهوله بتاعك.' } },
      { n:'@for', k:'ng',
        w:{ en:'Angular’s loop in the template.', ar:'الـ loop بتاع أنجولار في التمبلت.' } },
      { n:'of', k:'ng', only:['html'], re:'(?<= )of(?= )',
        w:{ en:'Part of <code>@for</code>: <i>loop variable</i> <code>of</code> <i>list</i>.', ar:'جزء من <code>@for</code>: <i>متغير اللوب</i> <code>of</code> <i>الليستة</i>.' } },
      { n:'track', k:'ng',
        w:{ en:'Part of <code>@for</code>: how to tell the items apart. The expression after it is yours.',
            ar:'جزء من <code>@for</code>: إزاي يفرّق بين العناصر. اللي بعدها بتاعك.' } },
      { n:':host', k:'ng',
        w:{ en:'Angular’s CSS selector for the component’s own tag, <code>&lt;app-user-card&gt;</code>.', ar:'الـ CSS selector بتاع أنجولار للتاج بتاع الـ component نفسه، <code>&lt;app-user-card&gt;</code>.' } },
      { n:'class', k:'ng', only:['html'], re:'(?<![\\w$.-])class(?==)',
        w:{ en:'The HTML attribute. The class names inside the quotes are yours.', ar:'الـ attribute بتاعة الـ HTML. أسماء الـ classes اللي بين العلامات بتاعتك.' } },
      { n:'@Input', k:'ng',
        w:{ en:'The older decorator for an input.', ar:'الـ decorator القديم بتاع الـ input.' } },
      { n:'standalone', k:'ng',
        w:{ en:'An option key. <code>false</code> means the component belongs to an NgModule.', ar:'مفتاح إعداد. <code>false</code> معناها إن الـ component تبع NgModule.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One card, five stops', ar: 'كارت واحد، خمس محطات' },
    lead: {
      en: 'A page shows a list of people. Each person is drawn by a small reusable component, the user card. The card does not know where the people come from; the page tells it. Follow one card onto the screen:',
      ar: 'صفحة بتعرض ليستة ناس. كل شخص بيترسم بـ component صغير بيتستخدم كذا مرة، كارت اليوزر. الكارت ميعرفش الناس جايين منين؛ الصفحة هي اللي بتقوله. امشي ورا كارت واحد لحد ما يظهر على الشاشة:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: UC, lang: 'ts', who: { en: 'the card · names its tag', ar: 'الكارت · بيسمّي التاج بتاعه' },
          code: ['@Component({', "  selector: 'app-user-card',", "  templateUrl: './user-card.html',", '})', 'export class UserCard {'],
          say: { en: `The card gets two names from you: the tag ${pub('app-user-card')} and the class ${pub('UserCard')}. ${ng('@Component')} and ${ng('selector')} are Angular’s. The page will need <b>both</b> of your names, in two different files.`,
                 ar: `الكارت بياخد منك اسمين: التاج ${pub('app-user-card')} والكلاس ${pub('UserCard')}. و${ng('@Component')} و${ng('selector')} بتوع أنجولار. الصفحة هتحتاج الاسمين <b>الاتنين</b>، في ملفين مختلفين.` } },
        { file: UC, lang: 'ts', who: { en: 'the card · asks for data', ar: 'الكارت · بيطلب داتا' },
          code: ['  readonly name = input.required<string>();', "  readonly email = input('');"],
          say: { en: `The card declares what it needs: ${pub('name')} and ${pub('email')}. ${ng('input')} and ${ng('required')} are Angular’s. The names on the left are yours, and the page will type them.`,
                 ar: `الكارت بيعلن هو محتاج إيه: ${pub('name')} و${pub('email')}. و${ng('input')} و${ng('required')} بتوع أنجولار. والأسماء اللي على الشمال بتاعتك، والصفحة هتكتبها.` } },
        { file: PG, lang: 'ts', who: { en: 'the page · allows the tag', ar: 'الصفحة · بتسمح بالتاج' },
          code: ["import { UserCard } from './user-card';", '', '  imports: [UserCard],'],
          say: { en: `The page imports the card by its <b>class name</b> ${pub('UserCard')}, from its <b>file name</b> ${pub('user-card')}, and lists it in ${ng('imports')}. This line is what makes the tag exist in the page’s template.`,
                 ar: `الصفحة بتعمل import للكارت بـ <b>اسم الكلاس</b> ${pub('UserCard')}، من <b>اسم الملف</b> ${pub('user-card')}، وبتحطه في ${ng('imports')}. السطر ده هو اللي بيخلي التاج موجود في تمبلت الصفحة.` } },
        { file: PGH, lang: 'html', who: { en: 'the page · uses the tag', ar: 'الصفحة · بتستخدم التاج' },
          code: ['@for (p of people; track p.email) {', '  <app-user-card [name]="p.name" [email]="p.email" />', '}'],
          say: { en: `The page types the <b>selector</b> ${pub('app-user-card')} as a tag. Inside <code>[name]="p.name"</code>, the left ${pub('name')} is the card’s input, and the right ${pub('name')} (after <code>p.</code>) is a field of your data. ${mine('p')} is the loop variable, and you picked it.`,
                 ar: `الصفحة بتكتب الـ <b>selector</b> ${pub('app-user-card')} كتاج. وجوه <code>[name]="p.name"</code>، الـ ${pub('name')} اللي على الشمال هو الـ input بتاع الكارت، والـ ${pub('name')} اللي على اليمين (بعد <code>p.</code>) field في الداتا بتاعتك. و${mine('p')} متغير اللوب، وانت اللي اخترته.` } },
        { file: UCH, lang: 'html', who: { en: 'the card · draws', ar: 'الكارت · بيرسم' },
          code: ['<article class="card">', '  <h3>{{ name() }}</h3>', '</article>'],
          say: { en: `The card reads its own input, with brackets because it is a signal. ${mine('card')} is a CSS class that only this component’s template and CSS use.`,
                 ar: `الكارت بيقرا الـ input بتاعه، بالقوسين عشان هو signal. و${mine('card')} ده CSS class مستخدم بس في تمبلت الـ component ده والـ CSS بتاعه.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'The page uses <b>three</b> of the card’s names: the class in <code>imports: [UserCard]</code>, the selector in <code>&lt;app-user-card&gt;</code>, and the inputs in <code>[name]</code> and <code>[email]</code>. Everything else inside the card is private to it.',
        ar: 'الصفحة بتستخدم <b>تلاتة</b> من أسماء الكارت: الكلاس في <code>imports: [UserCard]</code>، والـ selector في <code>&lt;app-user-card&gt;</code>، والـ inputs في <code>[name]</code> و<code>[email]</code>. وكل حاجة تانية جوه الكارت خاصة بيه.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Card or page?', ar: 'الكارت ولا الصفحة؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'The card picks its public names. The page only copies them. Most of the confusion goes away once you see that the page never invents a name that belongs to the card.',
      ar: 'الكارت هو اللي بيختار أسماءه العمومية. والصفحة بتنسخها وبس. أغلب اللخبطة بتروح أول ما تشوف إن الصفحة عمرها ما بتألف اسم بتاع الكارت.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: [`<code>selector: 'app-user-card'</code>`, 'card <code>.ts</code>', 'card', `the card picks ${pub('app-user-card')}`],
            ar: [`<code>selector: 'app-user-card'</code>`, '<code>.ts</code> الكارت', 'الكارت', `الكارت بيختار ${pub('app-user-card')}`] },
          { en: ['<code>export class UserCard</code>', 'card <code>.ts</code>', 'card', `the card picks ${pub('UserCard')}`],
            ar: ['<code>export class UserCard</code>', '<code>.ts</code> الكارت', 'الكارت', `الكارت بيختار ${pub('UserCard')}`] },
          { en: ['<code>readonly name = input.required&lt;string&gt;()</code>', 'card <code>.ts</code>', 'card', `the card picks ${pub('name')}; ${ng('input')} is Angular’s`],
            ar: ['<code>readonly name = input.required&lt;string&gt;()</code>', '<code>.ts</code> الكارت', 'الكارت', `الكارت بيختار ${pub('name')}؛ و${ng('input')} بتاعة أنجولار`] },
          { en: ['<code>class="card"</code> and <code>.card { }</code>', 'card <code>.html</code> and <code>.css</code>', 'card', `the card picks ${mine('card')}; nobody outside sees it`],
            ar: ['<code>class="card"</code> و<code>.card { }</code>', '<code>.html</code> و<code>.css</code> الكارت', 'الكارت', `الكارت بيختار ${mine('card')}؛ ومحدش برّه بيشوفه`] },
          { en: ['<code>import { UserCard } from \'./user-card\'</code> and <code>imports: [UserCard]</code>', 'page <code>.ts</code>', 'page', `copied: ${pub('UserCard')} and the file name ${pub('user-card')}`],
            ar: ['<code>import { UserCard } from \'./user-card\'</code> و<code>imports: [UserCard]</code>', '<code>.ts</code> الصفحة', 'الصفحة', `منسوخين: ${pub('UserCard')} واسم الملف ${pub('user-card')}`] },
          { en: ['<code>&lt;app-user-card [name]="p.name" /&gt;</code>', 'page <code>.html</code>', 'page', `tag and input copied from the card; ${mine('p')} and ${mine('people')} are the page’s own`],
            ar: ['<code>&lt;app-user-card [name]="p.name" /&gt;</code>', '<code>.html</code> الصفحة', 'الصفحة', `التاج والـ input منسوخين من الكارت؛ و${mine('p')} و${mine('people')} بتوع الصفحة نفسها`] },
        ] },
      { t: 'ul',
        en: ['<b>The class name goes in TypeScript, the selector goes in HTML.</b> <code>UserCard</code> appears only in <code>.ts</code> files (<code>import</code>, <code>imports</code>). <code>app-user-card</code> appears only as a tag in templates. You never write <code>&lt;UserCard&gt;</code> or <code>imports: [app-user-card]</code>.',
             '<b>Inside <code>[ ]</code> on the card’s tag, the name is the card’s.</b> Inside the quotes, the names are the page’s. <code>[name]="p.name"</code> reads: “set the card’s <code>name</code> to the page’s <code>p.name</code>”.',
             '<b>The card never knows the page.</b> It has no idea where <code>name</code> comes from. That is why the same card works on any page.'],
        ar: ['<b>اسم الكلاس بيتكتب في TypeScript، والـ selector بيتكتب في HTML.</b> <code>UserCard</code> بيظهر في ملفات <code>.ts</code> بس (<code>import</code> و<code>imports</code>). و<code>app-user-card</code> بيظهر كتاج في التمبلتس بس. عمرك ما هتكتب <code>&lt;UserCard&gt;</code> ولا <code>imports: [app-user-card]</code>.',
             '<b>جوه <code>[ ]</code> على تاج الكارت، الاسم بتاع الكارت.</b> وجوه علامات التنصيص، الأسماء بتاعة الصفحة. <code>[name]="p.name"</code> بتتقري: «حط <code>name</code> بتاع الكارت يساوي <code>p.name</code> بتاع الصفحة».',
             '<b>الكارت عمره ما بيعرف الصفحة.</b> ميعرفش <code>name</code> جاي منين. وعشان كده نفس الكارت بيشتغل في أي صفحة.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All six files, every name coloured', ar: 'الست ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same example, complete. Hover a coloured name to light up everywhere else it appears. Then press <b>Rename test</b>: every name you own turns into a made-up word, Angular’s words stay put, and the code is still correct. Watch the two <code>name</code>s become two different words.',
      ar: 'نفس المثال، كامل. قف بالماوس على أي اسم ملوّن وهتنوّر كل الأماكن التانية اللي هو فيها. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: كل اسم بتاعك هيبقى كلمة عشوائية، وكلمات أنجولار هتفضل مكانها، والكود لسه صح. وبص إزاي الـ <code>name</code> الاتنين بيبقوا كلمتين مختلفتين.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: PERSON, lang: 'ts', tag: { en: 'the data', ar: 'الداتا' }, code: [
        'export interface Person {',
        '  name: string;',
        '  email: string;',
        '}' ] },
      { t: 'code', name: UC, lang: 'ts', tag: { en: 'the card', ar: 'الكارت' }, code: [
        "import { Component, input } from '@angular/core';",
        '',
        '@Component({',
        "  selector: 'app-user-card',",
        "  templateUrl: './user-card.html',",
        "  styleUrl: './user-card.css',",
        '})',
        'export class UserCard {',
        '  readonly name = input.required<string>();',
        "  readonly email = input('');",
        '}' ] },
      { t: 'code', name: UCH, lang: 'html', tag: { en: 'the card', ar: 'الكارت' }, code: [
        '<article class="card">',
        '  <h3>{{ name() }}</h3>',
        '  <p>{{ email() }}</p>',
        '</article>' ] },
      { t: 'code', name: UCC, lang: 'css', tag: { en: 'the card', ar: 'الكارت' }, code: [
        ':host {',
        '  display: block;',
        '}',
        '',
        '.card {',
        '  padding: 1rem;',
        '  border: 1px solid #ddd;',
        '}' ] },
      { t: 'code', name: PG, lang: 'ts', tag: { en: 'the page', ar: 'الصفحة' }, code: [
        "import { Component } from '@angular/core';",
        "import { Person } from './person';",
        "import { UserCard } from './user-card';",
        '',
        '@Component({',
        "  selector: 'app-page',",
        '  imports: [UserCard],',
        "  templateUrl: './page.html',",
        '})',
        'export class Page {',
        '  readonly people: Person[] = [',
        "    { name: 'Mona', email: 'mona@shop.eg' },",
        "    { name: 'Karim', email: 'karim@shop.eg' },",
        '  ];',
        '}' ] },
      { t: 'code', name: PGH, lang: 'html', tag: { en: 'the page', ar: 'الصفحة' }, code: [
        '@for (p of people; track p.email) {',
        '  <app-user-card [name]="p.name" [email]="p.email" />',
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
      en: 'Every name you own can be renamed. Almost every miss is a compile error, because Angular checks templates against classes. The exception is CSS: class names are just strings, and nothing checks them.',
      ar: 'أي اسم بتاعك ينفع يتغير. تقريبًا أي حاجة تنساها بتبقى compile error، عشان أنجولار بيراجع التمبلتس على الكلاسات. الاستثناء هو الـ CSS: أسماء الـ classes مجرد نصوص، ومحدش بيراجعها.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [mine('card') + ' (CSS class)', 'the same class in <code>user-card.css</code>', '<b>No error at all.</b> The card just loses its styling.'],
            ar: [mine('card') + ' (CSS class)', 'نفس الـ class في <code>user-card.css</code>', '<b>مفيش أي error.</b> الكارت بس بيفقد الاستايل بتاعه.'] },
          { en: [pub('UserCard') + ' (the class)', 'the page’s <code>import</code> line and <code>imports: [ ]</code>', 'Compile error on the import.'],
            ar: [pub('UserCard') + ' (الكلاس)', 'سطر الـ <code>import</code> عند الصفحة و<code>imports: [ ]</code>', 'Compile error في الـ import.'] },
          { en: [pub('app-user-card') + ' (the selector)', 'the tag in the page template', 'Compile error: “is not a known element”.'],
            ar: [pub('app-user-card') + ' (الـ selector)', 'التاج في تمبلت الصفحة', 'Compile error: «is not a known element».'] },
          { en: [pub('name') + ' (the input)', 'the page’s <code>[name]</code> and the card’s own <code>{{ name() }}</code>', 'Compile error: “Can’t bind to…”, or, because it is required, a missing required input.'],
            ar: [pub('name') + ' (الـ input)', '<code>[name]</code> عند الصفحة و<code>{{ name() }}</code> عند الكارت نفسه', 'Compile error: «Can’t bind to…»، أو، عشان هو required، إن فيه input مطلوب ناقص.'] },
          { en: [pub('name') + ' (the data field)', 'the <code>Person</code> interface, the data in <code>page.ts</code>, every <code>p.name</code>', 'Compile error wherever the old field is used.'],
            ar: [pub('name') + ' (الـ field بتاع الداتا)', 'الـ interface <code>Person</code>، والداتا في <code>page.ts</code>، وكل <code>p.name</code>', 'Compile error في كل حتة بتستخدم الـ field القديم.'] },
          { en: [pub('user-card') + ' (the file names)', '<code>templateUrl</code>, <code>styleUrl</code>, and the page’s import path', 'Compile error: the file cannot be found.'],
            ar: [pub('user-card') + ' (أسماء الملفات)', '<code>templateUrl</code> و<code>styleUrl</code> ومسار الـ import عند الصفحة', 'Compile error: الملف مش لاقيه.'] },
          { en: [mine('people') + ' (page data)', 'the page template', 'Compile error in the template.'],
            ar: [mine('people') + ' (داتا الصفحة)', 'تمبلت الصفحة', 'Compile error في التمبلت.'] },
          { en: [mine('p') + ' (loop variable)', 'only the lines inside that <code>@for</code> block', 'Compile error inside the block.'],
            ar: [mine('p') + ' (متغير اللوب)', 'السطور اللي جوه بلوك الـ <code>@for</code> ده بس', 'Compile error جوه البلوك.'] },
          { en: [`${ng('@Component')}, ${ng('selector')}, ${ng('imports')}, ${ng('input')}, ${ng(':host')}`, 'nothing: you cannot rename these', 'They are Angular’s words.'],
            ar: [`${ng('@Component')} و${ng('selector')} و${ng('imports')} و${ng('input')} و${ng(':host')}`, 'ولا حاجة: دول مينفعش يتغيروا', 'دي كلمات أنجولار.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b> in the bar above the files. <code>[name]="p.name"</code> turns into two <i>different</i> made-up words, proving the input and the field only look alike. <code>card</code> changes in the HTML and the CSS together; do that by hand, every time.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b> في الشريط اللي فوق الملفات. <code>[name]="p.name"</code> هتتحوّل لكلمتين عشوائيتين <i>مختلفتين</i>، وده الدليل إن الـ input والـ field شبه بعض في الشكل بس. و<code>card</code> بتتغير في الـ HTML والـ CSS مع بعض؛ اعمل ده بإيدك، كل مرة.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتوعك' },
    title: { en: 'The fixed names inside <code>@Component</code>', ar: 'الأسماء الثابتة جوه <code>@Component</code>' },
    lead: {
      en: 'The object you pass to <code>@Component</code> is a form Angular fills in. The keys are Angular’s, spelled exactly. The values are yours.',
      ar: 'الأوبجكت اللي بتبعته لـ <code>@Component</code> ده استمارة أنجولار بيملاها. المفاتيح بتاعة أنجولار، ومكتوبة بالظبط. والقيم بتاعتك.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Key (Angular’s)', 'Value (yours)', 'Watch out'], ar: ['المفتاح (بتاع أنجولار)', 'القيمة (بتاعتك)', 'خد بالك'] },
        rows: [
          { en: [ng('selector'), 'the tag, <code>\'app-user-card\'</code>', 'It is a CSS selector, so no spaces and no capitals.'],
            ar: [ng('selector'), 'التاج، <code>\'app-user-card\'</code>', 'ده CSS selector، فمفيش مسافات ولا كابيتال.'] },
          { en: [ng('imports'), 'class names: <code>[UserCard]</code>', 'Only what the <b>template</b> uses. Services never go here.'],
            ar: [ng('imports'), 'أسماء كلاسات: <code>[UserCard]</code>', 'اللي <b>التمبلت</b> بيستخدمه بس. الـ services عمرها ما بتتحط هنا.'] },
          { en: [ng('templateUrl') + ' / <code>template</code>', 'a path, or the HTML itself', 'Singular <code>templateUrl</code>. Use one or the other, not both.'],
            ar: [ng('templateUrl') + ' / <code>template</code>', 'مسار، أو الـ HTML نفسه', '<code>templateUrl</code> مفرد. استخدم واحد منهم بس، مش الاتنين.'] },
          { en: [ng('styleUrl') + ' / <code>styleUrls</code> / <code>styles</code>', 'a path, a list of paths, or the CSS itself', '<code>styleUrl</code> takes one path; <code>styleUrls</code> takes an array.'],
            ar: [ng('styleUrl') + ' / <code>styleUrls</code> / <code>styles</code>', 'مسار، أو ليستة مسارات، أو الـ CSS نفسه', '<code>styleUrl</code> بياخد مسار واحد؛ و<code>styleUrls</code> بياخد array.'] },
        ] },
      { t: 'p',
        en: `Outside the decorator: ${ng('input')} and ${ng('required')} are Angular’s functions. ${ng('@for')}, ${ng('of')} and ${ng('track')} are Angular’s template words. ${ng(':host')} in the CSS is Angular’s name for the component’s own tag. ${ng('class')} is the browser’s attribute, but the class names inside it are yours.`,
        ar: `برّه الـ decorator: ${ng('input')} و${ng('required')} functions بتاعة أنجولار. و${ng('@for')} و${ng('of')} و${ng('track')} كلمات أنجولار في التمبلت. و${ng(':host')} في الـ CSS اسم أنجولار للتاج بتاع الـ component نفسه. و${ng('class')} الـ attribute بتاعة المتصفح، بس أسماء الـ classes اللي جواها بتاعتك.` }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'Angular accepts almost any name. These habits make a component easy to find, and its tag easy to read.',
      ar: 'أنجولار بيقبل أي اسم تقريبًا. العادات دي بتخلي الـ component سهل تلاقيه، والتاج بتاعه سهل تقراه.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['the class', '<code>UserCard</code>', '<code>userCard</code>, <code>Card1</code>', 'A capitalised noun for what it shows. Older projects add <code>Component</code> (<code>UserCardComponent</code>); both are fine, just be consistent.'],
            ar: ['الكلاس', '<code>UserCard</code>', '<code>userCard</code>، <code>Card1</code>', 'اسم بحرف كابيتال للحاجة اللي بيعرضها. المشاريع الأقدم بتزوّد <code>Component</code> (<code>UserCardComponent</code>)؛ الاتنين تمام، بس خليك ثابت على واحد.'] },
          { en: ['the selector', '<code>app-user-card</code>', '<code>usercard</code>, <code>card</code>', 'A prefix, then lowercase words with dashes. The Angular style guide recommends a prefix; it keeps your tags apart from real HTML tags and from other libraries.'],
            ar: ['الـ selector', '<code>app-user-card</code>', '<code>usercard</code>، <code>card</code>', 'بادئة، وبعدها كلمات صغيرة بشَرط. دليل أنجولار بينصح بالبادئة؛ بتخلي التاجات بتاعتك بعيدة عن تاجات HTML الحقيقية وعن المكتبات التانية.'] },
          { en: ['the files', '<code>user-card.ts</code>, <code>.html</code>, <code>.css</code>', '<code>card.html</code> next to <code>user-card.ts</code>', 'The style guide recommends the same base name for a component’s TypeScript, template and styles, so they sort together.'],
            ar: ['الملفات', '<code>user-card.ts</code> و<code>.html</code> و<code>.css</code>', '<code>card.html</code> جنب <code>user-card.ts</code>', 'دليل الأسلوب بينصح بنفس الاسم لملفات الـ TypeScript والتمبلت والاستايل بتاعة الـ component، عشان يترتبوا جنب بعض.'] },
          { en: ['an input', '<code>name</code>, <code>email</code>, <code>user</code>', '<code>nameInput</code>, <code>inName</code>', 'Name the data, not the mechanism. The parent’s <code>[name]</code> then reads naturally.'],
            ar: ['input', '<code>name</code>، <code>email</code>، <code>user</code>', '<code>nameInput</code>، <code>inName</code>', 'سمّي الداتا، مش الطريقة. ساعتها <code>[name]</code> عند الأب بتتقري طبيعي.'] },
          { en: ['a CSS class', '<code>card</code>, <code>title</code>', '<code>user-card__card--main</code>', 'Component styles only apply inside the component, so short class names are safe.'],
            ar: ['CSS class', '<code>card</code>، <code>title</code>', '<code>user-card__card--main</code>', 'استايلات الـ component بتتطبق جوه الـ component بس، فأسماء الـ classes القصيرة آمنة.'] },
          { en: ['the loop variable', '<code>p</code> in a two-line loop, <code>person</code> in a longer one', '<code>item</code> for everything', 'It only lives inside the block. Clarity matters more as the block grows.'],
            ar: ['متغير اللوب', '<code>p</code> في لوب سطرين، و<code>person</code> في لوب أطول', '<code>item</code> لكل حاجة', 'ده عايش جوه البلوك بس. الوضوح بيفرق أكتر كل ما البلوك يكبر.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Three places where the name is not free', ar: 'تلات أماكن الاسم فيهم مش براحتك' },
    lead: {
      en: 'Usually the input’s name is whatever you typed left of <code>= input()</code>, and the tag is whatever you put in <code>selector</code>. A few rules bend that.',
      ar: 'عادةً اسم الـ input هو اللي كتبته على شمال <code>= input()</code>، والتاج هو اللي حطيته في <code>selector</code>. فيه كام قاعدة بتغيّر ده.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'An alias: the page uses a different name', ar: 'الـ alias: الصفحة بتستخدم اسم تاني' }, blocks: [
        { t: 'code', name: ALIAS, lang: 'ts', tag: { en: 'the card', ar: 'الكارت' }, code: [
          "readonly name = input.required<string>({ alias: 'fullName' });" ] },
        { t: 'code', name: ALIASH, lang: 'html', tag: { en: 'the card', ar: 'الكارت' }, code: [
          '<h3>{{ name() }}</h3>   <!-- inside: still name -->' ] },
        { t: 'code', name: PGA, lang: 'html', tag: { en: 'the page', ar: 'الصفحة' }, code: [
          '<app-user-card [fullName]="p.name" [email]="p.email" />' ] },
        { t: 'p',
          en: `With an ${ng('alias')}, the property ${mine('name')} becomes private to the card, and ${pub('fullName')} is the shared name. The page must type <code>[fullName]</code>. Use this rarely, for example to keep an old public name while renaming the inside.`,
          ar: `مع الـ ${ng('alias')}، الـ property ${mine('name')} بتبقى خاصة بالكارت، و${pub('fullName')} هو الاسم المتشارك. الصفحة لازم تكتب <code>[fullName]</code>. استخدمه نادر، مثلًا عشان تحافظ على اسم قديم برّه وانت بتغيّر اللي جوه.` }
      ]},
      { t: 'step', n: 'B', title: { en: 'A required input forces the page to type it', ar: 'الـ input الـ required بيجبر الصفحة تكتبه' }, blocks: [
        { t: 'p',
          en: `Because ${pub('name')} uses ${ng('required')}, a page that writes <code>&lt;app-user-card /&gt;</code> without <code>[name]</code> does not compile. So the input name is not only shared, it is <b>mandatory</b> on every tag. <code>email</code> has a default (<code>''</code>), so the page may leave it out.`,
          ar: `عشان ${pub('name')} بيستخدم ${ng('required')}، أي صفحة تكتب <code>&lt;app-user-card /&gt;</code> من غير <code>[name]</code> مش هتعمل compile. فاسم الـ input مش بس متشارك، ده <b>إجباري</b> على كل تاج. أما <code>email</code> فليه قيمة افتراضية (<code>''</code>)، فالصفحة ممكن تسيبه.` }
      ]},
      { t: 'step', n: 'C', title: { en: 'Paths are relative to the .ts file', ar: 'المسارات بتتحسب من ملف الـ .ts' }, blocks: [
        { t: 'p',
          en: `<code>'./user-card.html'</code> means “next to this <code>.ts</code> file”. Move the template into a subfolder and the path must say so. The same goes for the page’s <code>import</code> path: it is written from the page’s folder, and leaves out <code>.ts</code>.`,
          ar: `<code>'./user-card.html'</code> معناها «جنب ملف الـ <code>.ts</code> ده». لو نقلت التمبلت لفولدر جوه، المسار لازم يقول كده. ونفس الكلام لمسار الـ <code>import</code> عند الصفحة: بيتكتب من فولدر الصفحة، ومن غير <code>.ts</code>.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: 'The old <code>@Input()</code> and <code>.component</code> files', ar: '<code>@Input()</code> القديم وملفات <code>.component</code>' },
    lead: {
      en: 'Older projects add <code>.component</code> to file names and <code>Component</code> to class names, declare inputs with a decorator, and often belong to an NgModule. The selector and the input names are used exactly the same way by the page.',
      ar: 'المشاريع الأقدم بتزوّد <code>.component</code> لأسماء الملفات و<code>Component</code> لأسماء الكلاسات، وبتعلن الـ inputs بـ decorator، وكتير بتبقى تبع NgModule. لكن الصفحة بتستخدم الـ selector وأسماء الـ inputs بنفس الطريقة بالظبط.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: OLD, lang: 'ts', code: [
          '@Component({',
          "  selector: 'app-user-card',",
          '  standalone: false,',
          "  templateUrl: './user-card.component.html',",
          '})',
          'export class UserCardComponent {',
          '  @Input({ required: true }) name!: string;',
          "  @Input() email = '';",
          '}' ] },
        good: { name: NOW, lang: 'ts', code: [
          '@Component({',
          "  selector: 'app-user-card',",
          '',
          "  templateUrl: './user-card.html',",
          '})',
          'export class UserCard {',
          '  readonly name = input.required<string>();',
          "  readonly email = input('');",
          '}' ] } },
      { t: 'p',
        en: `The page’s template is identical: <code>&lt;app-user-card [name]="p.name" /&gt;</code>. Two differences inside the card: an old input is a plain property, so its template writes <code>{{ name }}</code> with no brackets; and ${ng('standalone')}<code>: false</code> means the class is listed in an NgModule’s <code>declarations</code> instead of the page’s <code>imports</code>. In today’s Angular, standalone is the default and you leave that line out.`,
        ar: `تمبلت الصفحة هو هو: <code>&lt;app-user-card [name]="p.name" /&gt;</code>. فيه فرقين جوه الكارت: الـ input القديم property عادية، فالتمبلت بتاعه بيكتب <code>{{ name }}</code> من غير قوسين؛ و${ng('standalone')}<code>: false</code> معناها إن الكلاس بيتكتب في <code>declarations</code> بتاعة NgModule بدل <code>imports</code> بتاعة الصفحة. في أنجولار النهارده، الـ standalone هو الافتراضي وبتشيل السطر ده خالص.` }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, and says nothing', ar: 'مش بيعمل حاجة، ومش بيقول حاجة' },
    title: { en: 'Mistakes that fail silently', ar: 'غلطات بتفشل في صمت' },
    lead: {
      en: 'Angular checks your template against your classes very strictly. It does not check strings: CSS class names, and anything you write without square brackets.',
      ar: 'أنجولار بيراجع التمبلت على الكلاسات بتاعتك بدقة جدًا. لكنه مش بيراجع النصوص: أسماء الـ CSS classes، وأي حاجة بتكتبها من غير أقواس مربعة.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'A CSS class typo', ar: 'غلطة إملائية في CSS class' }, blocks: [
        { t: 'pair',
          bad:  { name: UCH, lang: 'html', code: ['<article class="crad">'] },
          good: { name: UCH, lang: 'html', code: ['<article class="card">'] } },
        { t: 'p', en: 'The CSS says <code>.card</code>, the HTML says <code>crad</code>. No error anywhere; the card simply looks unstyled. When a style “does nothing”, compare the two spellings letter by letter.',
                  ar: 'الـ CSS بيقول <code>.card</code>، والـ HTML بيقول <code>crad</code>. مفيش error في أي حتة؛ الكارت بس شكله من غير استايل. لما استايل «مش بيعمل حاجة»، قارن الكتابتين حرف حرف.' }
      ]},
      { t: 'step', n: '2', title: { en: 'Forgetting the square brackets', ar: 'نسيان الأقواس المربعة' }, blocks: [
        { t: 'pair',
          bad:  { name: PGH, lang: 'html', code: ['<app-user-card name="p.name" />'] },
          good: { name: PGH, lang: 'html', code: ['<app-user-card [name]="p.name" />'] } },
        { t: 'p', en: 'Without brackets, the value is the literal text <code>p.name</code>. It is a string, the input wants a string, the required input is set, so nothing complains. Every card on the page says “p.name”.',
                  ar: 'من غير أقواس، القيمة هي الكلام الحرفي <code>p.name</code>. ده string، والـ input عايز string، والـ input الـ required اتحط، فمحدش بيشتكي. وكل كارت في الصفحة مكتوب عليه «p.name».' }
      ]},
      { t: 'step', n: '3', title: { en: 'Styling the card from the page', ar: 'إنك تعمل استايل للكارت من الصفحة' }, blocks: [
        { t: 'pair',
          bad:  { name: PGC, lang: 'css', code: ['.card h3 {', '  color: teal;', '}'] },
          good: { name: UCC, lang: 'css', code: ['.card h3 {', '  color: teal;', '}'] } },
        { t: 'p', en: `The page’s <code>.card</code> is <b>not</b> the card’s ${mine('card')}. Each component’s CSS only applies to its own template, so the page’s rule matches nothing inside the card. No error. Style the card in the card’s own CSS, or give it an input.`,
                  ar: `<code>.card</code> بتاعة الصفحة <b>مش</b> هي ${mine('card')} بتاعة الكارت. الـ CSS بتاع كل component بيتطبق على التمبلت بتاعه بس، فالقاعدة اللي في الصفحة مش بتلاقي حاجة جوه الكارت. من غير error. اعمل استايل للكارت في الـ CSS بتاعه هو، أو ادّيله input.` }
      ]},
      { t: 'step', n: '4', title: { en: 'Reading a signal input without brackets', ar: 'إنك تقرا signal input من غير قوسين' }, blocks: [
        { t: 'pair',
          bad:  { name: UCH, lang: 'html', code: ['  <h3>{{ name }}</h3>'] },
          good: { name: UCH, lang: 'html', code: ['  <h3>{{ name() }}</h3>'] } },
        { t: 'p', en: '<code>input()</code> gives you a signal, and a signal is read by calling it. Without the brackets you print the signal itself, not the text inside it. Angular may warn you about this, but it is not an error. (Old <code>@Input()</code> properties are the opposite: no brackets.)',
                  ar: '<code>input()</code> بتدّيك signal، والـ signal بتتقري بإنك تناديها. من غير القوسين انت بتطبع الـ signal نفسها، مش الكلام اللي جواها. أنجولار ممكن يحذّرك، بس ده مش error. (الـ properties بتاعة <code>@Input()</code> القديمة عكس كده: من غير قوسين.)' }
      ]},
      { t: 'step', n: '5', title: { en: 'The class in providers instead of imports', ar: 'الكلاس في providers بدل imports' }, blocks: [
        { t: 'pair',
          bad:  { name: PG, lang: 'ts', code: ['  providers: [UserCard],'] },
          good: { name: PG, lang: 'ts', code: ['  imports: [UserCard],'] } },
        { t: 'p', en: 'This gives an error, but a confusing one: “\'app-user-card\' is not a known element”, even though <code>UserCard</code> is right there. <code>providers</code> is for services. A component whose tag you use goes in <code>imports</code>.',
                  ar: 'دي بتدي error، بس error ملخبط: «\'app-user-card\' is not a known element»، مع إن <code>UserCard</code> موجود قدامك. <code>providers</code> للـ services. أي component بتستخدم التاج بتاعه بيتحط في <code>imports</code>.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When the card does not show', ar: 'لما الكارت مش بيظهر' },
    title: { en: 'Six questions, in this order', ar: 'ست أسئلة، بالترتيب ده' },
    lead: {
      en: 'Your component does not appear, or appears wrong. Ask these before anything else.',
      ar: 'الـ component بتاعك مش ظاهر، أو ظاهر غلط. اسأل الأسئلة دي قبل أي حاجة.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Is the class imported at the top of the parent’s <code>.ts</code> <b>and</b> listed in its <code>imports: [ ]</code>?',
                  ar: '<b>1.</b> الكلاس معموله import فوق في ملف الـ <code>.ts</code> بتاع الأب <b>و</b>متحط في <code>imports: [ ]</code> بتاعته؟' },
      { t: 'chk', en: '<b>2.</b> Is the tag spelled exactly like the <code>selector</code> string?',
                  ar: '<b>2.</b> التاج مكتوب بالظبط زي نص الـ <code>selector</code>؟' },
      { t: 'chk', en: '<b>3.</b> Does every <code>[input]</code> on the tag match an input name (or its alias) in the child?',
                  ar: '<b>3.</b> كل <code>[input]</code> على التاج بيطابق اسم input (أو الـ alias بتاعه) في الابن؟' },
      { t: 'chk', en: '<b>4.</b> Do the inputs have square brackets when the value is a variable?',
                  ar: '<b>4.</b> الـ inputs عليها أقواس مربعة لما القيمة متغير؟' },
      { t: 'chk', en: '<b>5.</b> Does the child read its signal inputs with brackets: <code>name()</code>?',
                  ar: '<b>5.</b> الابن بيقرا الـ signal inputs بتاعته بالقوسين: <code>name()</code>؟' },
      { t: 'chk', en: '<b>6.</b> For styling: is the CSS in the component that owns those elements, with the same class spelling?',
                  ar: '<b>6.</b> للاستايل: الـ CSS موجود في الـ component اللي العناصر دي بتاعته، وبنفس كتابة الـ class؟' }
    ]
  }
  ]
};
