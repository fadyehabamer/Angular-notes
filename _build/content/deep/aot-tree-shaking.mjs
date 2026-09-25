/* ==================================================================
   AOT and tree shaking, name by name — the companion page after the
   aot-tree-shaking topic. One running example (an orders app with a
   Card, a Button and a ReportService) followed from the template you
   write, through what the compiler emits, to what the bundler keeps.
   ================================================================== */

/* a name in running text, coloured like the code and linked on hover */
const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

const OUT = 'card.js · compiled';

export default {
  topic: 'aot-tree-shaking',
  tab: 'AOT and tree shaking, name by name — The Angular Signal',
  title: { en: 'AOT and tree shaking, name by name', ar: 'الـ AOT والـ tree shaking، اسم اسم' },
  say: {
    en: 'Your template becomes JavaScript before it ships, and the bundler keeps only what is imported. One small app followed from the template to the bundle, every name coloured: which ones the compiler copies, which ones it invents, and which ones decide what stays.',
    ar: 'التمبلت بتاعك بيتحوّل لجافاسكريبت قبل ما يتشحن، والـ bundler بيسيب بس اللي متعمله import. تطبيق صغير ماشيين وراه من التمبلت لحد الـ bundle، وكل اسم ملوّن: مين الكومبايلر بينقله، ومين هو اللي بيألفه، ومين بيقرر إيه اللي يفضل.'
  },
  lead: {
    en: 'The idea fits in one line: <b>the compiler turns your template into a function at build time, and the bundler deletes anything nothing imports.</b> The confusing part is the names. The compiled code is full of strange words like <code>ɵɵtext</code> and <code>Card_Template</code>, and it is not obvious which of them came from you, which ones you are allowed to touch, and why a class you never use is still in the bundle. This page sorts every name into its owner.',
    ar: 'الفكرة في سطر واحد: <b>الكومبايلر بيحوّل التمبلت بتاعك لـ function وقت الـ build، والـ bundler بيمسح أي حاجة محدش بيعملها import.</b> اللي بيلخبط هو الأسماء. الكود المتكومبايل مليان كلمات غريبة زي <code>ɵɵtext</code> و<code>Card_Template</code>، ومش واضح مين فيهم جاي منك، ومين مسموحلك تلمسه، وليه كلاس عمرك ما استخدمته لسه موجود في الـ bundle. الصفحة دي بتقسّم كل اسم على صاحبه.'
  },

  names: {
    note: {
      en: 'Every <code>ɵ</code> word is Angular’s private runtime: you never type it. The compiler copies <b>your</b> names (<code>title</code>, <code>isOpen</code>) into its output as they are, and builds some names from your class name. Tree shaking ignores spelling completely. It only asks one question: does any file import or reference this?',
      ar: 'أي كلمة فيها <code>ɵ</code> دي الـ runtime الخاص بأنجولار: عمرك ما هتكتبها. الكومبايلر بينقل أسماءك <b>انت</b> (<code>title</code> و<code>isOpen</code>) في الكود اللي بيطلّعه زي ما هي، وبيعمل شوية أسماء من اسم الكلاس بتاعك. والـ tree shaking مش فارق معاه الإملا خالص. هو بيسأل سؤال واحد بس: فيه ملف بيعمل import للحاجة دي أو بيشاور عليها؟'
    },
    names: [
      /* --- shared: another file types it too --- */
      { n:'Card', k:'pub', re:'(?<![\\w$-])Card(?=_|(?![\\w$-]))',
        w:{ en:'Your component class. <code>home.ts</code> imports it by this name. The compiler also builds <code>Card_Template</code> and <code>Card_Factory</code> from it, so those follow a rename by themselves.',
            ar:'كلاس الـ component بتاعك. <code>home.ts</code> بيعمله import بالاسم ده. والكومبايلر كمان بيعمل منه <code>Card_Template</code> و<code>Card_Factory</code>، فدول بيتغيروا لوحدهم لو غيّرت الاسم.' } },
      { n:'app-card', k:'pub',
        w:{ en:'The card’s selector. The string in <code>selector</code> and the tag in <code>home.html</code> must match. The compiler copies it into <code>selectors</code>.',
            ar:'الـ selector بتاع الكارت. النص اللي في <code>selector</code> والتاج اللي في <code>home.html</code> لازم يبقوا زي بعض. والكومبايلر بينقله في <code>selectors</code>.' } },
      { n:'Button', k:'pub',
        w:{ en:'A component class exported from <code>ui/button.ts</code>. Every <code>import { Button }</code> must use this exact name.',
            ar:'كلاس component متعمله export من <code>ui/button.ts</code>. أي <code>import { Button }</code> لازم يستخدم الاسم ده بالظبط.' } },
      { n:'app-button', k:'pub',
        w:{ en:'The button’s selector, typed again as a tag in <code>home.html</code>.', ar:'الـ selector بتاع الزرار، ومكتوب تاني كتاج في <code>home.html</code>.' } },
      { n:'ReportService', k:'pub',
        w:{ en:'Your service class. <code>home.ts</code> injects it by name, and that reference is exactly what keeps it in the bundle.',
            ar:'كلاس الـ service بتاعك. <code>home.ts</code> بيعمله inject بالاسم، والإشارة دي بالظبط هي اللي بتخلّيه يفضل في الـ bundle.' } },
      { n:'download', k:'pub',
        w:{ en:'A method on <code>ReportService</code>, called from <code>home.ts</code>. Rename it in both files.',
            ar:'ميثود في <code>ReportService</code>، بتتنادى من <code>home.ts</code>. غيّرها في الملفين.' } },

      /* --- yours, private to one component or file --- */
      { n:'title', k:'mine',
        w:{ en:'The card’s signal. Its own template reads it, and the compiler copies the name as <code>ctx.title()</code>.',
            ar:'الـ signal بتاعة الكارت. التمبلت بتاعها بيقراها، والكومبايلر بينقل الاسم زي ما هو <code>ctx.title()</code>.' } },
      { n:'isOpen', k:'mine',
        w:{ en:'The card’s signal, read by <code>@if</code> and copied into the compiled code as-is.', ar:'الـ signal بتاعة الكارت، <code>@if</code> بيقراها وبتتنقل للكود المتكومبايل زي ما هي.' } },
      { n:'reports', k:'mine',
        w:{ en:'Home’s field holding the injected service. Only <code>home.ts</code> uses it.', ar:'الـ field اللي في Home شايل الـ service. <code>home.ts</code> بس اللي بيستخدمه.' } },
      { n:'exportReport', k:'mine',
        w:{ en:'Home’s own method, called by its own template.', ar:'ميثود Home نفسه، والتمبلت بتاعه هو اللي بيناديها.' } },
      { n:'unusedHelper', k:'mine',
        w:{ en:'An exported function nobody imports. The bundler deletes it, whatever you call it.', ar:'function متعملها export ومحدش بيعملها import. الـ bundler بيمسحها، مهما كان اسمها.' } },
      { n:'myGlobal', k:'mine',
        w:{ en:'A name you stuck on <code>window</code>. The assignment is a side effect, so the file stays.', ar:'اسم انت حطيته على <code>window</code>. الإسناد ده side effect، فالملف بيفضل.' } },

      /* --- the compiler's output: generated, never typed --- */
      { n:'ɵcmp', k:'ng', w:{ en:'The static field where the compiler stores the component definition.', ar:'الـ field الـ static اللي الكومبايلر بيحط فيه تعريف الـ component.' } },
      { n:'ɵfac', k:'ng', w:{ en:'The static field holding the factory that creates your class.', ar:'الـ field الـ static اللي فيه الـ factory اللي بتعمل الكلاس بتاعك.' } },
      { n:'ɵɵdefineComponent', k:'ng', w:{ en:'An Angular runtime function: register this component definition.', ar:'function من الـ runtime بتاع أنجولار: سجّل تعريف الـ component ده.' } },
      { n:'ɵɵelementStart', k:'ng', w:{ en:'An Angular runtime instruction: open an element.', ar:'instruction من الـ runtime بتاع أنجولار: افتح element.' } },
      { n:'ɵɵelementEnd', k:'ng', w:{ en:'An Angular runtime instruction: close the element.', ar:'instruction من الـ runtime بتاع أنجولار: اقفل الـ element.' } },
      { n:'ɵɵtext', k:'ng', w:{ en:'An Angular runtime instruction: create a text node.', ar:'instruction من الـ runtime بتاع أنجولار: اعمل text node.' } },
      { n:'ɵɵtextInterpolate', k:'ng', w:{ en:'An Angular runtime instruction: update the text if the value changed. This is <code>{{ }}</code> after compiling.', ar:'instruction من الـ runtime بتاع أنجولار: حدّث النص لو القيمة اتغيرت. ده <code>{{ }}</code> بعد الكومبايل.' } },
      { n:'ɵɵconditionalCreate', k:'ng', w:{ en:'An Angular runtime instruction: prepare an <code>@if</code> block.', ar:'instruction من الـ runtime بتاع أنجولار: جهّز بلوك <code>@if</code>.' } },
      { n:'ɵɵconditional', k:'ng', w:{ en:'An Angular runtime instruction: show or hide the <code>@if</code> branch.', ar:'instruction من الـ runtime بتاع أنجولار: اظهر أو اخفي فرع الـ <code>@if</code>.' } },
      { n:'ɵɵadvance', k:'ng', w:{ en:'An Angular runtime instruction: move to the next node before updating it.', ar:'instruction من الـ runtime بتاع أنجولار: اتنقل للـ node اللي بعدها قبل ما تحدّثها.' } },
      { n:'rf', k:'ng', only:[OUT],
        w:{ en:'The compiler’s parameter: render flags. <code>1</code> means create, <code>2</code> means update.', ar:'parameter من الكومبايلر: render flags. <code>1</code> يعني create و<code>2</code> يعني update.' } },
      { n:'ctx', k:'ng', only:[OUT],
        w:{ en:'The compiler’s parameter: your component instance. Everything after <code>ctx.</code> is a name from your class.', ar:'parameter من الكومبايلر: الـ instance بتاع الـ component بتاعك. أي حاجة بعد <code>ctx.</code> اسم من الكلاس بتاعك.' } },
      { n:'selectors', k:'ng', w:{ en:'A key in the compiled definition. Your selector string ends up inside it.', ar:'مفتاح في التعريف المتكومبايل. نص الـ selector بتاعك بيتحط جواه.' } },

      /* --- Angular's, TypeScript's, the browser's, the libraries' --- */
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator. The compiler replaces it with <code>ɵcmp</code>.', ar:'الـ decorator بتاع أنجولار. الكومبايلر بيبدّله بـ <code>ɵcmp</code>.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The string after it is yours.', ar:'مفتاح إعداد. النص اللي بعده بتاعك.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key. The path after it points at your file.', ar:'مفتاح إعداد. المسار اللي بعده بيشاور على ملفك.' } },
      { n:'template', k:'ng', only:['ts'], w:{ en:'An option key (and, in the compiled code, the key holding the template function).', ar:'مفتاح إعداد (وفي الكود المتكومبايل، المفتاح اللي شايل function التمبلت).' } },
      { n:'imports', k:'ng', only:['ts'], w:{ en:'An option key: the components this template uses. Listing a class here references it.', ar:'مفتاح إعداد: الـ components اللي التمبلت ده بيستخدمها. كتابة كلاس هنا معناها إنك بتشاور عليه.' } },
      { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
      { n:'inject', k:'ng', only:['ts'], w:{ en:'Angular’s function that hands you a service. Calling it with a class references that class.', ar:'الـ function بتاعة أنجولار اللي بتديك service. لما تناديها بكلاس تبقى بتشاور عليه.' } },
      { n:'@Injectable', k:'ng', w:{ en:'Angular’s decorator for a service.', ar:'الـ decorator بتاع أنجولار للـ service.' } },
      { n:'@NgModule', k:'ng', w:{ en:'The older way to group providers and components.', ar:'الطريقة القديمة لتجميع الـ providers والـ components.' } },
      { n:'providedIn', k:'ng', w:{ en:'An option key Angular reads.', ar:'مفتاح إعداد أنجولار بيقراه.' } },
      { n:'root', k:'ng', re:"(?<=')root(?=')",
        w:{ en:'Angular’s value for “one copy for the whole app”. It is also what makes the service tree-shakable.', ar:'قيمة أنجولار لـ «نسخة واحدة للتطبيق كله». وهي كمان اللي بتخلّي الـ service ينفع يتشال بالـ tree shaking.' } },
      { n:'providers', k:'ng', only:['ts'], w:{ en:'An option key. Listing a class here references it, so it stays in the bundle.', ar:'مفتاح إعداد. لو كتبت كلاس هنا تبقى بتشاور عليه، فبيفضل في الـ bundle.' } },
      { n:'@if', k:'ng', w:{ en:'Angular’s conditional block.', ar:'بلوك الشرط بتاع أنجولار.' } },
      { n:'Chart', k:'ng', w:{ en:'The Chart.js class. Its name comes from the library.', ar:'الكلاس بتاع Chart.js. اسمه جاي من المكتبة.' } },
      { n:'registerables', k:'ng', w:{ en:'A Chart.js export: every chart type, ready to register.', ar:'export من Chart.js: كل أنواع الرسومات، جاهزة تتسجّل.' } },
      { n:'register', k:'ng', w:{ en:'A Chart.js method. Called at the top of a file, it is a side effect.', ar:'ميثود من Chart.js. لو اتنادت في أول الملف تبقى side effect.' } },
      { n:'console.log', k:'ng', w:{ en:'The browser’s console. A top-level call is a side effect.', ar:'الكونسول بتاع المتصفح. لو اتنادى في أول الملف يبقى side effect.' } },
      { n:'window', k:'ng', only:['ts'], w:{ en:'The browser’s global object.', ar:'الأوبجكت العام بتاع المتصفح.' } },
      { n:'angularCompilerOptions', k:'ng', w:{ en:'The Angular compiler’s section in <code>tsconfig.json</code>. Exact spelling.', ar:'القسم بتاع كومبايلر أنجولار في <code>tsconfig.json</code>. لازم يتكتب بالظبط.' } },
      { n:'strictTemplates', k:'ng', w:{ en:'An Angular compiler option: type-check templates fully.', ar:'إعداد في كومبايلر أنجولار: اعمل type-check كامل للتمبلتس.' } },
      { n:'strictInjectionParameters', k:'ng', w:{ en:'An Angular compiler option.', ar:'إعداد في كومبايلر أنجولار.' } },
      { n:'sideEffects', k:'ng',
        w:{ en:'A <code>package.json</code> key that bundlers read: “importing my files does nothing by itself”.', ar:'مفتاح في <code>package.json</code> الـ bundlers بتقراه: «الملفات بتاعتي مابتعملش حاجة لمجرد إنها اتعملها import».' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One name, from your editor to the bundle', ar: 'اسم واحد، من الإديتور لحد الـ bundle' },
    lead: {
      en: 'A card that shows a title. Follow the name <code>title</code> through the build, then see what decides whether a piece of code ships at all:',
      ar: 'كارت بيعرض عنوان. امشي ورا الاسم <code>title</code> جوه الـ build، وبعدين شوف إيه اللي بيقرر إن حتة كود تتشحن أصلًا ولا لأ:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'card.ts', lang: 'ts', who: { en: 'you · the class', ar: 'انت · الكلاس' },
          code: ["readonly title = signal('Orders');"],
          say: { en: `You pick the name ${mine('title')}. ${ng('signal')} is Angular’s. Nothing about AOT changes how you name things here.`,
                 ar: `انت اللي بتختار الاسم ${mine('title')}. و${ng('signal')} بتاعة أنجولار. الـ AOT مش بيغيّر أي حاجة في طريقة تسميتك هنا.` } },
        { file: 'card.html', lang: 'html', who: { en: 'you · the template', ar: 'انت · التمبلت' },
          code: ['<h1>{{ title() }}</h1>'],
          say: { en: `The template types ${mine('title')} again. It is the same component, so the name is still yours alone, but the two spellings must match. Because the template is compiled ahead of time, a mismatch is a <b>build error</b>, not a blank heading.`,
                 ar: `التمبلت بيكتب ${mine('title')} تاني. ده نفس الـ component، فالاسم لسه بتاعك لوحدك، بس الكتابتين لازم يبقوا زي بعض. وعشان التمبلت بيتكومبايل مسبقًا، أي اختلاف بيبقى <b>error في الـ build</b>، مش عنوان فاضي.` } },
        { file: OUT, lang: 'ts', who: { en: 'the compiler · writes', ar: 'الكومبايلر · بيكتب' },
          code: ['template: function Card_Template(rf, ctx) {', '  if (rf & 2) {', '    ɵɵtextInterpolate(ctx.title());', '  }', '}'],
          say: { en: `Your <code>{{ }}</code> became a function call. ${ng('ɵɵtextInterpolate')}, ${ng('rf')} and ${ng('ctx')} are the compiler’s words. ${ng('ctx')} is your component instance, so <code>ctx.title()</code> is <b>your</b> name, copied as-is. The function name is built from your class name ${pub('Card')}.`,
                 ar: `الـ <code>{{ }}</code> بتاعك بقت نداء function. ${ng('ɵɵtextInterpolate')} و${ng('rf')} و${ng('ctx')} كلمات الكومبايلر. و${ng('ctx')} هو الـ instance بتاع الـ component بتاعك، فـ <code>ctx.title()</code> ده اسمك <b>انت</b>، متنقل زي ما هو. واسم الـ function معمول من اسم الكلاس بتاعك ${pub('Card')}.` } },
        { file: 'home.ts', lang: 'ts', who: { en: 'another file · imports', ar: 'ملف تاني · بيعمل import' },
          code: ["import { Card } from '../card/card';", '', '  imports: [Card],'],
          say: { en: `Another file names ${pub('Card')}. That import is a <b>reference</b>, and a reference is the only thing tree shaking cares about. Because Home imports Card, Card ships.`,
                 ar: `ملف تاني بيذكر ${pub('Card')}. الـ import ده <b>إشارة</b>، والإشارة هي الحاجة الوحيدة اللي الـ tree shaking فارق معاه. وعشان Home بيعمل import لـ Card، الـ Card بيتشحن.` } },
        { file: 'report.service.ts', lang: 'ts', who: { en: 'the bundler · deletes', ar: 'الـ bundler · بيمسح' },
          code: ['export function unusedHelper() {', '  return 42;', '}'],
          say: { en: `No file imports ${mine('unusedHelper')}, so the bundler deletes it from the production build. Its name played no part: rename it to anything and the result is the same.`,
                 ar: `مفيش ملف بيعمل import لـ ${mine('unusedHelper')}، فالـ bundler بيمسحها من build الإنتاج. اسمها ملوش أي دور: سمّيها أي حاجة والنتيجة هي هي.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'AOT copies your template’s names into JavaScript, so a wrong name fails the <b>build</b>. Tree shaking keeps whatever is <b>imported or referenced</b>, and deletes the rest. Names decide the first; imports decide the second.',
        ar: 'الـ AOT بينقل أسماء التمبلت بتاعك لجافاسكريبت، فأي اسم غلط بيوقّع الـ <b>build</b>. والـ tree shaking بيسيب أي حاجة <b>متعملها import أو حد بيشاور عليها</b>، وبيمسح الباقي. الأسماء بتقرر الأولى؛ والـ imports بتقرر التانية.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'You or the compiler?', ar: 'انت ولا الكومبايلر؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'Three writers touch this code: you, the Angular compiler, and the bundler. Only one of them picks names you can change.',
      ar: 'فيه تلات كتّاب بيلمسوا الكود ده: انت، وكومبايلر أنجولار، والـ bundler. واحد بس فيهم هو اللي بيختار أسماء تقدر تغيّرها.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>readonly title = signal(…)</code>', '<code>card.ts</code>', 'you', `you pick ${mine('title')}; ${ng('signal')} is Angular’s`],
            ar: ['<code>readonly title = signal(…)</code>', '<code>card.ts</code>', 'انت', `انت بتختار ${mine('title')}؛ و${ng('signal')} بتاعة أنجولار`] },
          { en: ['<code>{{ title() }}</code>', '<code>card.html</code>', 'you', `must copy the class: ${mine('title')}`],
            ar: ['<code>{{ title() }}</code>', '<code>card.html</code>', 'انت', `لازم ينسخ الكلاس: ${mine('title')}`] },
          { en: ['<code>Card_Template</code>, <code>Card_Factory</code>', 'the build output', 'the compiler', `the compiler, built from your ${pub('Card')}`],
            ar: ['<code>Card_Template</code>، <code>Card_Factory</code>', 'ناتج الـ build', 'الكومبايلر', `الكومبايلر، من اسم ${pub('Card')} بتاعك`] },
          { en: [`${ng('ɵɵtext')}, ${ng('rf')}, ${ng('ctx')}, ${ng('ɵcmp')}`, 'the build output', 'the compiler', 'Angular. You never type these.'],
            ar: [`${ng('ɵɵtext')}، ${ng('rf')}، ${ng('ctx')}، ${ng('ɵcmp')}`, 'ناتج الـ build', 'الكومبايلر', 'أنجولار. عمرك ما هتكتبهم.'] },
          { en: ['<code>import { Card } from …</code>', '<code>home.ts</code>', 'you', `must copy the export: ${pub('Card')}`],
            ar: ['<code>import { Card } from …</code>', '<code>home.ts</code>', 'انت', `لازم ينسخ الـ export: ${pub('Card')}`] },
          { en: ['what stays in <code>main.js</code>', 'the bundle', 'the bundler', 'nobody: it follows imports, not names'],
            ar: ['اللي بيفضل في <code>main.js</code>', 'الـ bundle', 'الـ bundler', 'ولا حد: هو ماشي ورا الـ imports، مش الأسماء'] },
          { en: [`${ng('angularCompilerOptions')}, ${ng('sideEffects')}`, '<code>tsconfig.json</code>, <code>package.json</code>', 'you', 'the tools: exact keys'],
            ar: [`${ng('angularCompilerOptions')}، ${ng('sideEffects')}`, '<code>tsconfig.json</code>، <code>package.json</code>', 'انت', 'الأدوات: مفاتيح لازم تتكتب بالظبط'] },
        ] },
      { t: 'ul',
        en: ['<b>You never edit the compiled code.</b> If a name in it looks wrong, fix your class or your template and build again. The compiled file is thrown away and rewritten every build.',
             '<b>Anything after <code>ctx.</code> is yours.</b> Everything else in the compiled template is Angular’s. That one rule lets you read any compiled component.',
             '<b>Tree shaking has no idea what things are called.</b> It keeps a class because some file imports or references it. To find out why something stayed, search for who <i>uses</i> it, not for its name in a config.'],
        ar: ['<b>عمرك ما بتعدّل الكود المتكومبايل.</b> لو اسم فيه شكله غلط، صلّح الكلاس أو التمبلت بتاعك واعمل build تاني. الملف المتكومبايل بيترمي ويتكتب من جديد في كل build.',
             '<b>أي حاجة بعد <code>ctx.</code> بتاعتك.</b> وكل حاجة تانية في التمبلت المتكومبايل بتاعة أنجولار. القاعدة دي لوحدها بتخليك تقرا أي component متكومبايل.',
             '<b>الـ tree shaking مايعرفش الحاجات اسمها إيه.</b> هو بيسيب كلاس عشان فيه ملف بيعمله import أو بيشاور عليه. عشان تعرف حاجة فضلت ليه، دوّر مين <i>بيستخدمها</i>، مش على اسمها في config.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'Every file, every name coloured', ar: 'كل الملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same small app, complete: the card, what the compiler makes of it, the page that uses it, a tiny UI folder with a barrel, a service, and the two config files. Hover a name to light it up everywhere. Then press <b>Rename test</b>: your names change everywhere at once, including inside the compiled code, and Angular’s words stay put.',
      ar: 'نفس التطبيق الصغير، كامل: الكارت، واللي الكومبايلر بيعمله منه، والصفحة اللي بتستخدمه، وفولدر UI صغير فيه barrel، وservice، وملفين الإعدادات. قف بالماوس على أي اسم وهينوّر في كل مكان. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: أسماءك هتتغير في كل حتة مرة واحدة، حتى جوه الكود المتكومبايل، وكلمات أنجولار هتفضل مكانها.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'card.ts', lang: 'ts', tag: { en: 'you write', ar: 'انت بتكتب' }, code: [
        "import { Component, signal } from '@angular/core';",
        '',
        '@Component({',
        "  selector: 'app-card',",
        "  templateUrl: './card.html',",
        '})',
        'export class Card {',
        "  readonly title = signal('Orders');",
        '  readonly isOpen = signal(true);',
        '}' ] },
      { t: 'code', name: 'card.html', lang: 'html', tag: { en: 'you write', ar: 'انت بتكتب' }, code: [
        '<h1>{{ title() }}</h1>',
        '@if (isOpen()) {',
        '  <p>open</p>',
        '}' ] },
      { t: 'code', name: OUT, lang: 'ts', tag: { en: 'the compiler writes (simplified)', ar: 'الكومبايلر بيكتب (مبسّط)' }, code: [
        'class Card {',
        "  title = signal('Orders');",
        '  isOpen = signal(true);',
        '',
        '  static ɵfac = function Card_Factory(t) { return new (t || Card)(); };',
        '  static ɵcmp = ɵɵdefineComponent({',
        '    type: Card,',
        "    selectors: [['app-card']],",
        '    template: function Card_Template(rf, ctx) {',
        '      if (rf & 1) {                 // create: runs once',
        "        ɵɵelementStart(0, 'h1');",
        '        ɵɵtext(1);',
        '        ɵɵelementEnd();',
        '        ɵɵconditionalCreate(2, Card_Conditional_2_Template, …);',
        '      }',
        '      if (rf & 2) {                 // update: runs on every check',
        '        ɵɵadvance();',
        '        ɵɵtextInterpolate(ctx.title());',
        '        ɵɵadvance();',
        '        ɵɵconditional(ctx.isOpen() ? 2 : -1);',
        '      }',
        '    },',
        '  });',
        '}' ] },
      { t: 'code', name: 'home.ts', lang: 'ts', tag: { en: 'uses the card', ar: 'بيستخدم الكارت' }, code: [
        "import { Component, inject } from '@angular/core';",
        "import { Card } from '../card/card';",
        "import { Button } from '../ui/button';",
        "import { ReportService } from '../data/report.service';",
        '',
        '@Component({',
        "  selector: 'app-home',",
        '  imports: [Card, Button],',
        "  templateUrl: './home.html',",
        '})',
        'export class Home {',
        '  private readonly reports = inject(ReportService);',
        '',
        '  exportReport() {',
        '    this.reports.download();',
        '  }',
        '}' ] },
      { t: 'code', name: 'home.html', lang: 'html', tag: { en: 'uses the card', ar: 'بيستخدم الكارت' }, code: [
        '<app-card />',
        '<app-button (click)="exportReport()">Export</app-button>' ] },
      { t: 'code', name: 'ui/button.ts', lang: 'ts', tag: { en: 'a UI component', ar: 'component للـ UI' }, code: [
        "import { Component } from '@angular/core';",
        '',
        '@Component({',
        "  selector: 'app-button',",
        "  template: '<button type=\"button\"><ng-content /></button>',",
        '})',
        'export class Button {}' ] },
      { t: 'code', name: 'ui/chart.ts', lang: 'ts', tag: { en: 'a heavy one', ar: 'واحد تقيل' }, code: [
        "import { Chart, registerables } from 'chart.js';",
        '',
        'Chart.register(...registerables);   // runs the moment anyone imports this file',
        '',
        "export { Chart } from 'chart.js';" ] },
      { t: 'code', name: 'ui/index.ts', lang: 'ts', tag: { en: 'the barrel', ar: 'الـ barrel' }, code: [
        "export * from './button';",
        "export * from './chart';" ] },
      { t: 'code', name: 'report.service.ts', lang: 'ts', tag: { en: 'the service', ar: 'الـ service' }, code: [
        "import { Injectable } from '@angular/core';",
        '',
        "@Injectable({ providedIn: 'root' })",
        'export class ReportService {',
        '  download() {',
        "    return fetch('/api/report');",
        '  }',
        '}',
        '',
        'export function unusedHelper() {',
        '  return 42;',
        '}' ] },
      { t: 'code', name: 'tsconfig.json', lang: 'json', tag: { en: 'the compiler’s settings', ar: 'إعدادات الكومبايلر' }, code: [
        '{',
        '  "compilerOptions": { "strict": true },',
        '  "angularCompilerOptions": {',
        '    "strictTemplates": true,',
        '    "strictInjectionParameters": true',
        '  }',
        '}' ] },
      { t: 'code', name: 'package.json', lang: 'json', tag: { en: 'for the bundler', ar: 'للـ bundler' }, code: [
        '{',
        '  "name": "orders-app",',
        '  "sideEffects": false',
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
      en: 'Good news first: AOT turns most naming mistakes into <b>build errors</b>, because it reads your template like code. The quiet failures are in the config files, where a misspelt key is just a key nobody reads.',
      ar: 'الخبر الحلو الأول: الـ AOT بيحوّل أغلب غلطات الأسماء لـ <b>errors في الـ build</b>، عشان بيقرا التمبلت بتاعك كأنه كود. الغلطات اللي بتعدّي في صمت موجودة في ملفات الإعدادات، لأن المفتاح المكتوب غلط بيبقى مجرد مفتاح محدش بيقراه.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [mine('title') + ' or ' + mine('isOpen') + ' (in the class)', 'the same component’s template', 'Build error: the template is type-checked against the class. <code>ng serve</code> compiles ahead of time too, so you see it there.'],
            ar: [mine('title') + ' أو ' + mine('isOpen') + ' (في الكلاس)', 'تمبلت نفس الـ component', 'Error في الـ build: التمبلت بيتعمله type-check قصاد الكلاس. و<code>ng serve</code> بيكومبايل مسبقًا هو كمان، فهتشوفه هناك.'] },
          { en: [pub('Card') + ' (the class)', 'every <code>import { Card }</code> and <code>imports: [ ]</code>', 'Compile error on the import. <code>Card_Template</code> and <code>Card_Factory</code> follow by themselves.'],
            ar: [pub('Card') + ' (الكلاس)', 'كل <code>import { Card }</code> و<code>imports: [ ]</code>', 'Compile error في الـ import. و<code>Card_Template</code> و<code>Card_Factory</code> بيتغيروا لوحدهم.'] },
          { en: [pub('app-card') + ' (the selector)', 'every tag in other templates', 'Build error: “is not a known element”.'],
            ar: [pub('app-card') + ' (الـ selector)', 'كل التاجات في التمبلتس التانية', 'Error في الـ build: «is not a known element».'] },
          { en: [pub('Button') + ' (an export)', 'every file that imports it', 'Compile error: the module has no exported member with the old name.'],
            ar: [pub('Button') + ' (export)', 'كل ملف بيعمله import', 'Compile error: الـ module ملوش export بالاسم القديم.'] },
          { en: ['<code>ui/button.ts</code> (the file)', 'every import path that points at it', 'Compile error: cannot find module.'],
            ar: ['<code>ui/button.ts</code> (الملف)', 'كل مسار import بيشاور عليه', 'Compile error: مش لاقي الـ module.'] },
          { en: [pub('ReportService') + ' (the class)', 'every <code>inject()</code> and every <code>providers</code> list', 'Compile error.'],
            ar: [pub('ReportService') + ' (الكلاس)', 'كل <code>inject()</code> وكل ليستة <code>providers</code>', 'Compile error.'] },
          { en: [pub('download') + ' (a service method)', 'every caller, here <code>home.ts</code>', 'Compile error in the caller.'],
            ar: [pub('download') + ' (ميثود في الـ service)', 'كل حد بيناديها، هنا <code>home.ts</code>', 'Compile error عند اللي بيناديها.'] },
          { en: [mine('reports') + ', ' + mine('exportReport'), 'only inside Home (its class and its template)', 'Compile or build error inside Home.'],
            ar: [mine('reports') + '، ' + mine('exportReport'), 'جوه Home بس (الكلاس والتمبلت بتوعه)', 'Compile أو build error جوه Home.'] },
          { en: [mine('unusedHelper'), 'nothing: nobody imports it', 'Nothing. That is exactly why it gets deleted.'],
            ar: [mine('unusedHelper'), 'ولا حاجة: محدش بيعملها import', 'ولا حاجة. وده بالظبط سبب إنها بتتمسح.'] },
          { en: [`a key like ${ng('strictTemplates')} or ${ng('sideEffects')}`, 'you cannot rename these; you can only misspell them', '<b>Do not count on an error.</b> A misspelt key is simply not read: templates get checked less strictly, or the bundler keeps more code.'],
            ar: [`مفتاح زي ${ng('strictTemplates')} أو ${ng('sideEffects')}`, 'دول مينفعش يتغيروا؛ ممكن بس تكتبهم غلط', '<b>متعتمدش إن هيطلع error.</b> المفتاح المكتوب غلط مابيتقريش وخلاص: التمبلتس بتتفحص بشكل أخف، أو الـ bundler بيسيب كود أكتر.'] },
          { en: [`${ng('ɵɵtext')}, ${ng('ctx')}, ${ng('ɵcmp')}`, 'nothing: they only exist in the output', 'You never typed them, so there is nothing to rename.'],
            ar: [`${ng('ɵɵtext')}، ${ng('ctx')}، ${ng('ɵcmp')}`, 'ولا حاجة: دول موجودين في الناتج بس', 'انت عمرك ما كتبتهم، فمفيش حاجة تغيّرها.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b> above the files and look at the compiled code. <code>Card_Template</code> becomes <i>your new name</i> + <code>_Template</code>, and <code>ctx.title()</code> follows your signal. That is the proof that those parts came from you.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b> فوق الملفات وبص على الكود المتكومبايل. <code>Card_Template</code> هيبقى <i>اسمك الجديد</i> + <code>_Template</code>، و<code>ctx.title()</code> هيمشي ورا الـ signal بتاعتك. وده الدليل إن الحتت دي جاية منك.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتاعتك' },
    title: { en: 'The fixed names, and where they come from', ar: 'الأسماء الثابتة، وجاية منين' },
    lead: {
      en: 'Every fixed name on this page belongs to one of four owners. Knowing the owner tells you where to look it up, and that you should never invent a variation of it.',
      ar: 'كل اسم ثابت في الصفحة دي ليه صاحب من أربعة. لما تعرف صاحبه، هتعرف تدوّر عليه فين، وإنك عمرك ما تألّف نسخة تانية منه.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Owner', 'Names', 'What to know'], ar: ['صاحبه', 'الأسماء', 'تعرف إيه'] },
        rows: [
          { en: ['Angular’s compiler output', `${ng('ɵcmp')}, ${ng('ɵfac')}, ${ng('ɵɵdefineComponent')}, ${ng('ɵɵelementStart')}, ${ng('ɵɵtextInterpolate')}, ${ng('rf')}, ${ng('ctx')}`, 'The <code>ɵ</code> prefix means “private to Angular”. You read these when debugging; you never import or call them.'],
            ar: ['ناتج كومبايلر أنجولار', `${ng('ɵcmp')}، ${ng('ɵfac')}، ${ng('ɵɵdefineComponent')}، ${ng('ɵɵelementStart')}، ${ng('ɵɵtextInterpolate')}، ${ng('rf')}، ${ng('ctx')}`, 'البادئة <code>ɵ</code> معناها «خاص بأنجولار». بتقراهم وانت بتدوّر على مشكلة؛ عمرك ما بتعملهم import أو بتناديهم.'] },
          { en: ['Angular’s API', `${ng('@Component')}, ${ng('selector')}, ${ng('imports')}, ${ng('@Injectable')}, ${ng('providedIn')}, ${ng('root')}, ${ng('providers')}, ${ng('inject')}`, 'The keys are fixed; the values you put in them (<code>\'app-card\'</code>, <code>ReportService</code>) are yours.'],
            ar: ['الـ API بتاع أنجولار', `${ng('@Component')}، ${ng('selector')}، ${ng('imports')}، ${ng('@Injectable')}، ${ng('providedIn')}، ${ng('root')}، ${ng('providers')}، ${ng('inject')}`, 'المفاتيح ثابتة؛ والقيم اللي بتحطها فيها (<code>\'app-card\'</code>، <code>ReportService</code>) بتاعتك.'] },
          { en: ['Tool configs', `${ng('angularCompilerOptions')}, ${ng('strictTemplates')}, ${ng('strictInjectionParameters')}, ${ng('sideEffects')}`, 'Read by the Angular compiler and by bundlers. Exact spelling, exact place in the file.'],
            ar: ['إعدادات الأدوات', `${ng('angularCompilerOptions')}، ${ng('strictTemplates')}، ${ng('strictInjectionParameters')}، ${ng('sideEffects')}`, 'كومبايلر أنجولار والـ bundlers بيقروها. إملا مظبوط، ومكان مظبوط في الملف.'] },
          { en: ['Libraries and the browser', `${ng('Chart')}, ${ng('registerables')}, ${ng('register')}, ${ng('console.log')}, ${ng('window')}`, 'Named by Chart.js and by the browser. Calling them at the top of a file is what makes that file a side effect.'],
            ar: ['المكتبات والمتصفح', `${ng('Chart')}، ${ng('registerables')}، ${ng('register')}، ${ng('console.log')}، ${ng('window')}`, 'Chart.js والمتصفح هما اللي سمّوهم. ولما تناديهم في أول الملف، ده اللي بيخلّي الملف side effect.'] },
        ] },
      { t: 'p',
        en: 'One group sits in between: <code>Card_Template</code>, <code>Card_Factory</code> and <code>Card_Conditional_2_Template</code>. You did not type them, but they are made from <b>your</b> class name, which is why the rename test changes their first half and leaves <code>_Template</code> alone.',
        ar: 'فيه مجموعة في النص: <code>Card_Template</code> و<code>Card_Factory</code> و<code>Card_Conditional_2_Template</code>. انت ماكتبتهمش، بس معمولين من اسم الكلاس <b>بتاعك</b>، وعشان كده تجربة تغيير الأسماء بتغيّر النص الأولاني بتاعهم وبتسيب <code>_Template</code> زي ما هي.' }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'Naming and importing habits that keep bundles small', ar: 'عادات في التسمية والـ import بتخلّي الـ bundle صغير' },
    lead: {
      en: 'None of these is enforced. They just make it easy to see what is used, and hard to pull in code by accident.',
      ar: 'ولا واحدة من دول إجبارية. هي بس بتخلّي سهل تشوف إيه اللي مستخدم، وصعب تجيب كود بالغلط.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['an import path', "<code>'../ui/button'</code>", "<code>'../ui'</code> when the folder is a big barrel", 'Importing the file names exactly what you use. A folder import runs through <code>index.ts</code> and everything it re-exports.'],
            ar: ['مسار الـ import', "<code>'../ui/button'</code>", "<code>'../ui'</code> لما الفولدر يبقى barrel كبير", 'الـ import من الملف بيسمّي بالظبط اللي بتستخدمه. أما import الفولدر بيعدّي على <code>index.ts</code> وكل اللي بيعيد تصديره.'] },
          { en: ['template members', '<code>protected</code> or public: <code>title</code>, <code>isOpen</code>', '<code>private</code> for anything the template reads', 'The compiled template reads them from outside the class, through <code>ctx</code>.'],
            ar: ['الأعضاء اللي التمبلت بيستخدمها', '<code>protected</code> أو public: <code>title</code>، <code>isOpen</code>', '<code>private</code> لأي حاجة التمبلت بيقراها', 'التمبلت المتكومبايل بيقراها من برّه الكلاس، عن طريق <code>ctx</code>.'] },
          { en: ['a service', '<code>ReportService</code> with <code>providedIn: \'root\'</code>', 'also listing it in a <code>providers</code> array “just in case”', 'The <code>providers</code> entry is a reference, so the class ships even if nobody injects it.'],
            ar: ['service', '<code>ReportService</code> مع <code>providedIn: \'root\'</code>', 'إنك تكتبه كمان في <code>providers</code> «احتياطي»', 'السطر في <code>providers</code> ده إشارة، فالكلاس بيتشحن حتى لو محدش عمله inject.'] },
          { en: ['a file with setup code', 'a clear name: <code>setup-charts.ts</code>', 'hiding <code>Chart.register(…)</code> in a file named like a component', 'A file that does work on import is a side effect. Its name should warn the reader.'],
            ar: ['ملف فيه كود تجهيز', 'اسم واضح: <code>setup-charts.ts</code>', 'إنك تخبّي <code>Chart.register(…)</code> في ملف اسمه شبه component', 'الملف اللي بيعمل شغل لمجرد الـ import يبقى side effect. واسمه لازم ينبّه اللي بيقرا.'] },
          { en: ['the compiled output', '—', 'searching your source for <code>Card_Template</code>', 'It does not exist in your source. Search for <code>Card</code>.'],
            ar: ['الناتج المتكومبايل', '—', 'إنك تدوّر في الكود بتاعك على <code>Card_Template</code>', 'ده مش موجود في الكود بتاعك. دوّر على <code>Card</code>.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Three places where the name is not free', ar: 'تلات أماكن الاسم فيهم مش براحتك' },
    lead: {
      en: 'Most names here are yours. These three look free but are decided by a rule.',
      ar: 'أغلب الأسماء هنا بتاعتك. التلاتة دول شكلهم براحتك، بس فيه قاعدة هي اللي بتحددهم.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'index.ts: the file a folder import finds', ar: 'index.ts: الملف اللي import الفولدر بيلاقيه' }, blocks: [
        { t: 'code', name: 'home.ts · barrel import', lang: 'ts', tag: { en: 'imports the folder', ar: 'بيعمل import للفولدر' }, code: [
          "import { Button } from '../ui';   // really means ../ui/index.ts" ] },
        { t: 'p',
          en: 'When you import a folder, module resolution looks for a file called <code>index.ts</code> inside it. That file name is the rule, not a habit. Rename it to <code>all.ts</code> and <code>\'../ui\'</code> stops resolving: a compile error. It is also the reason a barrel is expensive: to give you <code>Button</code>, the bundler has to load <code>index.ts</code>, which loads <code>chart.ts</code>, which runs <code>Chart.register</code>.',
          ar: 'لما تعمل import لفولدر، الـ module resolution بيدوّر جواه على ملف اسمه <code>index.ts</code>. اسم الملف ده قاعدة، مش عادة. غيّره لـ <code>all.ts</code> و<code>\'../ui\'</code> مش هيلاقي حاجة: compile error. وده كمان سبب إن الـ barrel غالي: عشان يديك <code>Button</code>، الـ bundler لازم يحمّل <code>index.ts</code>، اللي بيحمّل <code>chart.ts</code>، اللي بيشغّل <code>Chart.register</code>.' }
      ]},
      { t: 'step', n: 'B', title: { en: 'Generated names follow your class name', ar: 'الأسماء المتولّدة بتمشي ورا اسم الكلاس' }, blocks: [
        { t: 'p',
          en: `The compiler names things after ${pub('Card')}: <code>Card_Factory</code>, <code>Card_Template</code>, and <code>Card_Conditional_2_Template</code> for the <code>@if</code> branch (the number is the slot in the template). You cannot pick these names directly. You pick the class name, and they follow. This is why stack traces from a production build still mention your class names.`,
          ar: `الكومبايلر بيسمّي حاجات على اسم ${pub('Card')}: <code>Card_Factory</code>، و<code>Card_Template</code>، و<code>Card_Conditional_2_Template</code> لفرع الـ <code>@if</code> (الرقم ده مكانه في التمبلت). مينفعش تختار الأسماء دي بنفسك. انت بتختار اسم الكلاس، وهي بتمشي وراه. وعشان كده الـ stack traces من build الإنتاج لسه فيها أسماء الكلاسات بتاعتك.` }
      ]},
      { t: 'step', n: 'C', title: { en: 'A template can only see names it is allowed to see', ar: 'التمبلت بيشوف بس الأسماء المسموحله بيها' }, blocks: [
        { t: 'pair',
          bad:  { name: 'card.ts · private', lang: 'ts', code: [
            'export class Card {',
            "  private readonly title = signal('Orders');",
            '}' ] },
          good: { name: 'card.ts · protected', lang: 'ts', code: [
            'export class Card {',
            "  protected readonly title = signal('Orders');",
            '}' ] } },
        { t: 'p',
          en: 'The compiled template reads <code>ctx.title()</code> from outside the class, and the type checker treats it that way. A <code>private</code> member used in the template is a build error with <code>strictTemplates</code> on (the default in new projects). <code>protected</code> works and still keeps the name out of other components’ reach.',
          ar: 'التمبلت المتكومبايل بيقرا <code>ctx.title()</code> من برّه الكلاس، والـ type checker بيتعامل معاه كده. أي عضو <code>private</code> بتستخدمه في التمبلت بيبقى error في الـ build لما <code>strictTemplates</code> تبقى شغالة (وهي شغالة في المشاريع الجديدة). <code>protected</code> بتشتغل وبرضه بتخلّي الاسم بعيد عن الـ components التانية.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: 'Older NgModule code, same names, bigger bundle', ar: 'كود الـ NgModule الأقدم، نفس الأسماء، bundle أكبر' },
    lead: {
      en: 'In older projects a service is registered in a module’s <code>providers</code>. The class name <code>ReportService</code> is the same in both versions. What changes is who references it.',
      ar: 'في المشاريع الأقدم الـ service بيتسجّل في <code>providers</code> بتاعة module. اسم الكلاس <code>ReportService</code> هو هو في النسختين. اللي بيتغير هو مين بيشاور عليه.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'reports.module.ts — older style', lang: 'ts', code: [
          "import { Injectable, NgModule } from '@angular/core';",
          '',
          '@Injectable()',
          'export class ReportService { }',
          '',
          '@NgModule({',
          '  providers: [ReportService],',
          '})',
          'export class ReportsModule {}' ] },
        good: { name: 'report.service.ts — today', lang: 'ts', code: [
          "import { Injectable } from '@angular/core';",
          '',
          "@Injectable({ providedIn: 'root' })",
          'export class ReportService { }' ] } },
      { t: 'p',
        en: 'On the left, the module’s <code>providers</code> array references the class, so it ships whenever the module does, even if no component injects it. On the right, nothing references it except the <code>inject(ReportService)</code> calls. No callers means no class in the bundle.',
        ar: 'على الشمال، ليستة <code>providers</code> بتاعة الـ module بتشاور على الكلاس، فبيتشحن طول ما الـ module بيتشحن، حتى لو مفيش component عمله inject. على اليمين، محدش بيشاور عليه غير نداءات <code>inject(ReportService)</code>. مفيش حد بيناديه يعني مفيش كلاس في الـ bundle.' },
      { t: 'note', label: { en: 'Also old', ar: 'وكمان قديم' },
        en: 'Tutorials older than Angular 9 talk about “turning on AOT” or a JIT build. AOT is the only mode now, for <code>ng build</code> and for <code>ng serve</code>. There is no switch left to forget.',
        ar: 'الشروحات اللي أقدم من أنجولار 9 بتتكلم عن «تشغيل الـ AOT» أو build بالـ JIT. الـ AOT هو الوضع الوحيد دلوقتي، في <code>ng build</code> وفي <code>ng serve</code>. مفيش مفتاح فاضل تنساه.' }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It works, but ships too much', ar: 'شغال، بس بيشحن زيادة' },
    title: { en: 'Mistakes that fail silently', ar: 'غلطات بتفشل في صمت' },
    lead: {
      en: 'AOT is loud: it stops the build. Tree shaking is silent: the app works perfectly, it is just heavier than it should be. None of these gives an error.',
      ar: 'الـ AOT صوته عالي: بيوقّف الـ build. أما الـ tree shaking ساكت: التطبيق شغال تمام، بس أتقل من اللازم. ولا واحدة من دول بتدي error.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'Importing one thing from a barrel', ar: 'import لحاجة واحدة من barrel' }, blocks: [
        { t: 'pair',
          bad:  { name: 'home.ts', lang: 'ts', code: ["import { Button } from '../ui';"] },
          good: { name: 'home.ts', lang: 'ts', code: ["import { Button } from '../ui/button';"] } },
        { t: 'p', en: 'Both lines give you the same <code>Button</code>. The left one also loads <code>ui/chart.ts</code>, and that file runs <code>Chart.register</code> at the top, so the bundler cannot prove it is safe to drop. The chart library now ships on the home page.',
                  ar: 'السطرين بيدّوك نفس الـ <code>Button</code>. بس اللي على الشمال بيحمّل كمان <code>ui/chart.ts</code>، والملف ده بيشغّل <code>Chart.register</code> في أوله، فالـ bundler مايقدرش يثبت إن شيله آمن. ومكتبة الرسومات بقت بتتشحن في الصفحة الرئيسية.' }
      ]},
      { t: 'step', n: '2', title: { en: 'Adding a root service to providers “just in case”', ar: 'إضافة service الـ root لـ providers «احتياطي»' }, blocks: [
        { t: 'pair',
          bad:  { name: 'home.ts · extra provider', lang: 'ts', code: [
            '@Component({',
            "  selector: 'app-home',",
            '  providers: [ReportService],',
            '})' ] },
          good: { name: 'home.ts · no provider', lang: 'ts', code: [
            '@Component({',
            "  selector: 'app-home',",
            '})' ] } },
        { t: 'p', en: 'The class is already <code>providedIn: \'root\'</code>. The extra line references it, so it can never be tree-shaken. On a component it is worse: every Home gets its <b>own</b> new <code>ReportService</code>, so any state in it is no longer shared with the rest of the app.',
                  ar: 'الكلاس أصلًا <code>providedIn: \'root\'</code>. السطر الزيادة بيشاور عليه، فعمره ما هيتشال بالـ tree shaking. وعلى component الموضوع أوحش: كل Home بياخد <code>ReportService</code> جديد <b>خاص بيه</b>، فأي state جواه مابقاش متشارك مع باقي التطبيق.' }
      ]},
      { t: 'step', n: '3', title: { en: 'Code at the top of a module', ar: 'كود في أول الـ module' }, blocks: [
        { t: 'pair',
          bad:  { name: 'report.service.ts · top level', lang: 'ts', code: [
            "console.log('loaded');",
            'window.myGlobal = 42;',
            '',
            "@Injectable({ providedIn: 'root' })",
            'export class ReportService { }' ] },
          good: { name: 'report.service.ts · quiet', lang: 'ts', code: [
            "@Injectable({ providedIn: 'root' })",
            'export class ReportService {',
            '  download() {',
            "    console.log('downloading');",
            "    return fetch('/api/report');",
            '  }',
            '}' ] } },
        { t: 'p', en: 'Code that runs just because the file was imported is a side effect. The bundler has to keep it, and often the file around it. Inside a method it only runs when called, and the file can be dropped when unused. (With <code>strict</code> TypeScript, <code>window.myGlobal</code> also needs a type declaration; that error is a hint, too.)',
                  ar: 'الكود اللي بيشتغل لمجرد إن الملف اتعمله import ده side effect. الـ bundler لازم يسيبه، وغالبًا يسيب الملف اللي حواليه. لكن جوه ميثود بيشتغل بس لما حد يناديها، والملف ممكن يتشال لو مش مستخدم. (ومع TypeScript في الوضع <code>strict</code>، <code>window.myGlobal</code> محتاجة type declaration كمان؛ والـ error ده تلميح برضه.)' }
      ]},
      { t: 'step', n: '4', title: { en: 'Measuring a development build', ar: 'إنك تقيس build التطوير' }, blocks: [
        { t: 'pair',
          bad:  { name: 'terminal · dev', lang: 'bash', code: ['ng build --configuration development'] },
          good: { name: 'terminal · prod', lang: 'bash', code: ['ng build', 'npx source-map-explorer dist/**/*.js'] } },
        { t: 'p', en: 'A development build skips minifying and much of the optimisation, so the sizes look huge and <code>unusedHelper</code> may still be there. <code>ng build</code> uses the production configuration by default in current CLI projects. Judge the bundle only from that.',
                  ar: 'build التطوير مابيعملش minify ولا أغلب التحسينات، فالأحجام بتبان ضخمة و<code>unusedHelper</code> ممكن يكون لسه موجود. <code>ng build</code> بيستخدم إعدادات الإنتاج بشكل افتراضي في مشاريع الـ CLI الحالية. احكم على الـ bundle منه هو بس.' }
      ]},
      { t: 'step', n: '5', title: { en: 'Promising “no side effects” when a file has one', ar: 'إنك توعد «مفيش side effects» وفيه ملف عنده' }, blocks: [
        { t: 'pair',
          bad:  { name: 'package.json · too broad', lang: 'json', code: ['{', '  "sideEffects": false', '}'] },
          good: { name: 'package.json · with exceptions', lang: 'json', code: ['{', '  "sideEffects": ["./src/app/setup-charts.ts", "*.css"]', '}'] } },
        { t: 'p', en: 'This is the opposite mistake. <code>"sideEffects": false</code> tells the bundler it may drop a file that is imported only for what it does, like <code>import \'./setup-charts\';</code>. If it drops it, the charts are never registered and break at runtime. You may only get a build warning, which is easy to miss. List the files that really do work on import.',
                  ar: 'دي الغلطة العكسية. <code>"sideEffects": false</code> بتقول للـ bundler إنه مسموحله يشيل ملف متعمله import عشان الشغل اللي بيعمله بس، زي <code>import \'./setup-charts\';</code>. ولو شاله، الرسومات عمرها ما هتتسجّل وهتبوظ وقت التشغيل. ويمكن كل اللي تاخده warning في الـ build، وده سهل يفوتك. اكتب الملفات اللي فعلًا بتعمل شغل وقت الـ import.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When the bundle is too big', ar: 'لما الـ bundle يبقى كبير' },
    title: { en: 'Six questions, in this order', ar: 'ست أسئلة، بالترتيب ده' },
    lead: {
      en: 'Something you expected to disappear is still in the bundle, or a template error makes no sense. Ask these first.',
      ar: 'حاجة كنت متوقع تختفي لسه في الـ bundle، أو error في التمبلت مش مفهوم. اسأل دول الأول.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Am I looking at a production build (<code>ng build</code>), not a development one?',
                  ar: '<b>1.</b> أنا باصص على build إنتاج (<code>ng build</code>)، مش build تطوير؟' },
      { t: 'chk', en: '<b>2.</b> Who references it? Search for the class name in <code>src</code>: every <code>import</code>, <code>inject()</code> and array entry is a reason to keep it.',
                  ar: '<b>2.</b> مين بيشاور عليه؟ دوّر على اسم الكلاس في <code>src</code>: كل <code>import</code> و<code>inject()</code> وسطر في array سبب إنه يفضل.' },
      { t: 'chk', en: '<b>3.</b> Is it listed in a <code>providers</code> array anywhere, on top of <code>providedIn: \'root\'</code>?',
                  ar: '<b>3.</b> هو مكتوب في ليستة <code>providers</code> في أي حتة، فوق <code>providedIn: \'root\'</code>؟' },
      { t: 'chk', en: '<b>4.</b> Is anything imported from a folder (<code>\'../ui\'</code>) instead of a file, pulling in a whole barrel?',
                  ar: '<b>4.</b> فيه حاجة متعملها import من فولدر (<code>\'../ui\'</code>) بدل ملف، فبتجيب الـ barrel كله؟' },
      { t: 'chk', en: '<b>5.</b> Does any file in the chain run code at the top, outside a class or function?',
                  ar: '<b>5.</b> فيه ملف في السلسلة بيشغّل كود في أوله، برّه أي كلاس أو function؟' },
      { t: 'chk', en: '<b>6.</b> For a template error: is the name spelled exactly like the class member, and is that member not <code>private</code>?',
                  ar: '<b>6.</b> لو error في التمبلت: الاسم مكتوب بالظبط زي العضو اللي في الكلاس، والعضو ده مش <code>private</code>؟' }
    ]
  }
  ]
};
