/* ==================================================================
   Lifecycle, name by name — the companion page after the lifecycle
   topic. One running example (a sales chart drawn with Chart.js inside
   a dashboard) followed from "created" to "destroyed", with every name
   coloured by who owns it. Names list: inline below.
   ================================================================== */

/* a name in running text, coloured like the code and linked on hover */
const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

const OLD = 'chart-panel.ts — older style';
const SLIP = 'poller.ts · looks like a hook';

export default {
  topic: 'lifecycle',
  tab: 'Lifecycle, name by name — The Angular Signal',
  title: { en: 'Lifecycle, name by name', ar: 'دورة الحياة، اسم اسم' },
  say: {
    en: 'The page for when hooks make you feel lost. One chart component followed from the moment it is created to the moment it is destroyed, every name coloured: which ones Angular calls, which ones you invented, and which ones a library picked.',
    ar: 'الصفحة دي للي بيتوه في الـ hooks. component فيه chart واحد ماشيين وراه من لحظة ما بيتعمل للحظة ما بيتشال، وكل اسم ملوّن: مين فيهم أنجولار اللي بيناديه، ومين انت اللي مألفه، ومين مكتبة هي اللي اختارته.'
  },
  lead: {
    en: 'The idea of lifecycle is simple: <b>you never call these functions yourself. You hand them to Angular, and Angular calls them at the right moment.</b> The confusing part is the names. <code>ngOnDestroy</code>, <code>onDestroy</code>, <code>destroyRef</code>, <code>destroy()</code> all look alike, and only some of them are yours. Spell one of Angular’s wrong and nothing tells you. This page sorts every one of them.',
    ar: 'فكرة الـ lifecycle بسيطة: <b>انت عمرك ما بتنادي الـ functions دي بنفسك. انت بتسلّمها لأنجولار، وأنجولار هو اللي بيناديها في الوقت المظبوط.</b> اللي بيلخبط هو الأسماء. <code>ngOnDestroy</code> و<code>onDestroy</code> و<code>destroyRef</code> و<code>destroy()</code> شبه بعض، وبعضهم بس اللي بتاعك. ولو كتبت واحد من بتوع أنجولار غلط محدش هيقولك. الصفحة دي بتفرز كل واحد فيهم.'
  },

  names: {
    note: {
      en: 'Blue is the biggest group on this page, and that is the lesson: every hook name, every function you hand a callback to, and every Chart.js word is fixed. Your names are the fields, the template reference and the input. Only the orange ones are typed in a second file.',
      ar: 'الأزرق هو أكبر مجموعة في الصفحة دي، ودي هي الفكرة: كل اسم hook، وكل function بتديها callback، وكل كلمة من Chart.js ثابتة. أسماءك انت هي الـ fields والـ template reference والـ input. والبرتقاني بس هو اللي بيتكتب في ملف تاني.'
    },
    names: [
      /* --- shared: two files must agree --- */
      { n:'points', k:'pub',
        w:{ en:'The chart’s input. The parent binds it with <code>[points]</code>. In the older style the string <code>\'points\'</code> in <code>changes[…]</code> must match it too.',
            ar:'الـ input بتاع الـ chart. الأب بيربطه بـ <code>[points]</code>. وفي الأسلوب القديم النص <code>\'points\'</code> جوه <code>changes[…]</code> لازم يطابقه كمان.' } },
      { n:'ChartPanel', k:'pub',
        w:{ en:'The chart’s class. The dashboard imports it and lists it in <code>imports</code>.', ar:'كلاس الـ chart. الداشبورد بيعمله import وبيكتبه في <code>imports</code>.' } },
      { n:'app-chart-panel', k:'pub',
        w:{ en:'The chart’s selector. The tag in the dashboard’s template must match it.', ar:'الـ selector بتاع الـ chart. التاج في تمبلت الداشبورد لازم يطابقه.' } },
      { n:'Dashboard', k:'pub',
        w:{ en:'The dashboard’s class. Whatever shows the dashboard (a route, a parent) imports it by this name.', ar:'كلاس الداشبورد. أي حاجة بتعرض الداشبورد (route أو أب) بتعمله import بالاسم ده.' } },
      { n:'app-dashboard', k:'pub',
        w:{ en:'The dashboard’s selector.', ar:'الـ selector بتاع الداشبورد.' } },
      { n:'Point', k:'pub',
        w:{ en:'Your data type. Every file that imports it follows a rename.', ar:'نوع الداتا بتاعك. أي ملف بيعمله import بيتغير معاه.' } },
      { n:'day', k:'pub',
        w:{ en:'A field on your data: the dashboard writes it, the chart reads it.', ar:'field في الداتا بتاعتك: الداشبورد بيكتبه، والـ chart بيقراه.' } },
      { n:'total', k:'pub',
        w:{ en:'A field on your data: the dashboard writes it, the chart reads it.', ar:'field في الداتا بتاعتك: الداشبورد بيكتبه، والـ chart بيقراه.' } },

      /* --- yours, private to one component --- */
      { n:'salesCanvas', k:'mine',
        w:{ en:'The template reference <code>#salesCanvas</code>. The string in <code>viewChild.required(\'salesCanvas\')</code> must be the same word. Both live in the chart component.',
            ar:'الـ template reference <code>#salesCanvas</code>. النص في <code>viewChild.required(\'salesCanvas\')</code> لازم يبقى نفس الكلمة. والاتنين جوه الـ chart component.' } },
      { n:'canvas', k:'mine', re:'(?<![\\w$<\\/-])canvas(?![\\w$-])',
        w:{ en:'The field that holds the query result. The <code>&lt;canvas&gt;</code> tag is the browser’s and is left alone.',
            ar:'الـ field اللي شايل نتيجة الـ query. وتاج <code>&lt;canvas&gt;</code> بتاع المتصفح ومش بيتلمس.' } },
      { n:'destroyRef', k:'mine',
        w:{ en:'The field you store Angular’s <code>DestroyRef</code> in. Any name works; the type is what matters.', ar:'الـ field اللي بتحط فيه <code>DestroyRef</code> بتاع أنجولار. أي اسم ينفع؛ المهم الـ type.' } },
      { n:'chart', k:'mine', re:'(?<![\\w$\'-])chart(?![\\w$-])',
        w:{ en:'The field holding the Chart.js object. <code>\'chart.js/auto\'</code> is the package’s path and is left alone.',
            ar:'الـ field اللي شايل object الـ Chart.js. و<code>\'chart.js/auto\'</code> مسار الـ package ومش بيتلمس.' } },
      { n:'best', k:'mine',
        w:{ en:'A computed the chart reads in its own template.', ar:'computed الـ chart بيقراه في التمبلت بتاعه.' } },
      { n:'pts', k:'mine', w:{ en:'A local variable inside the effect.', ar:'متغير محلي جوه الـ effect.' } },
      { n:'p', k:'mine', w:{ en:'An arrow-function parameter: one point.', ar:'parameter في arrow function: نقطة واحدة.' } },
      { n:'showChart', k:'mine', w:{ en:'The dashboard’s signal that decides whether the chart exists at all.', ar:'الـ signal بتاعة الداشبورد اللي بتقرر الـ chart يبقى موجود أصلًا ولا لأ.' } },
      { n:'sales', k:'mine', w:{ en:'The dashboard’s signal holding the data.', ar:'الـ signal بتاعة الداشبورد اللي شايلة الداتا.' } },
      { n:'addDay', k:'mine', w:{ en:'The dashboard’s own method.', ar:'ميثود الداشبورد نفسه.' } },
      { n:'list', k:'mine', w:{ en:'An arrow-function parameter: the current array.', ar:'parameter في arrow function: الـ array الحالية.' } },
      { n:'changes', k:'mine', only:[OLD],
        w:{ en:'The parameter of <code>ngOnChanges</code>. Angular passes the value; you choose what to call it.', ar:'الـ parameter بتاع <code>ngOnChanges</code>. أنجولار بيبعت القيمة؛ وانت بتختار تسمّيها إيه.' } },
      { n:'stopPolling', k:'mine', w:{ en:'A method you named. Angular never calls it by itself.', ar:'ميثود انت اللي سمّيتها. أنجولار عمره ما بيناديها لوحده.' } },
      { n:'refresh', k:'mine', w:{ en:'The poller’s own method.', ar:'ميثود الـ poller نفسه.' } },
      { n:'Poller', k:'pub', w:{ en:'A small example class. Whoever uses it imports it by this name.', ar:'كلاس مثال صغير. أي حد بيستخدمه بيعمله import بالاسم ده.' } },
      { n:'timer', k:'mine', w:{ en:'A field holding a timer id.', ar:'field شايل رقم التايمر.' } },

      /* --- Angular's, TypeScript's, the browser's, the library's --- */
      { n:'afterNextRender', k:'ng',
        w:{ en:'Angular’s function: run this callback once, in the browser, after the next render.', ar:'function بتاعة أنجولار: شغّل الـ callback ده مرة واحدة، في المتصفح، بعد الرندر الجاي.' } },
      { n:'effect', k:'ng',
        w:{ en:'Angular’s function: re-run this callback whenever a signal it read changes.', ar:'function بتاعة أنجولار: عيد تشغيل الـ callback ده كل ما signal قراها تتغير.' } },
      { n:'computed', k:'ng', w:{ en:'Angular’s derived signal.', ar:'الـ signal المشتقة بتاعة أنجولار.' } },
      { n:'inject', k:'ng', w:{ en:'Angular’s function that hands you a service. Only works in the constructor or a field initializer.', ar:'الـ function بتاعة أنجولار اللي بتديك service. بتشتغل بس في الـ constructor أو في تعريف field.' } },
      { n:'DestroyRef', k:'ng', w:{ en:'Angular’s service that knows when this component is destroyed.', ar:'الـ service بتاعة أنجولار اللي عارفة إمتى الـ component ده هيتشال.' } },
      { n:'onDestroy', k:'ng', not:[SLIP],
        w:{ en:'The method on <code>DestroyRef</code> that registers cleanup. Lower-case <code>o</code>, no <code>ng</code>. A method with this name in <b>your</b> class is never called by Angular.',
            ar:'الميثود في <code>DestroyRef</code> اللي بتسجّل التنضيف. <code>o</code> صغيرة ومن غير <code>ng</code>. وميثود بالاسم ده في الكلاس <b>بتاعك</b> أنجولار عمره ما هيناديها.' } },
      { n:'viewChild', k:'ng', w:{ en:'Angular’s function that finds something in your own template by its <code>#name</code>.', ar:'الـ function بتاعة أنجولار اللي بتلاقي حاجة في التمبلت بتاعك بالـ <code>#name</code> بتاعها.' } },
      { n:'input', k:'ng', re:'(?<![\\w$<(-])input(?=[.(<,])', w:{ en:'Angular’s function that creates an input.', ar:'الـ function بتاعة أنجولار اللي بتعمل input.' } },
      { n:'required', k:'ng', w:{ en:'Part of Angular’s API: <code>input.required</code>, <code>viewChild.required</code>, and the <code>required</code> option of <code>@Input</code>.', ar:'جزء من API أنجولار: <code>input.required</code> و<code>viewChild.required</code>، وإعداد <code>required</code> في <code>@Input</code>.' } },
      { n:'ElementRef', k:'ng', w:{ en:'Angular’s wrapper around a real DOM element.', ar:'الغلاف بتاع أنجولار حوالين عنصر DOM حقيقي.' } },
      { n:'nativeElement', k:'ng', w:{ en:'The property on <code>ElementRef</code> holding the real element.', ar:'الـ property في <code>ElementRef</code> اللي شايلة العنصر الحقيقي.' } },
      { n:'HTMLCanvasElement', k:'ng', w:{ en:'The browser’s type for a <code>&lt;canvas&gt;</code>.', ar:'الـ type بتاع المتصفح لـ <code>&lt;canvas&gt;</code>.' } },
      { n:'constructor', k:'ng', w:{ en:'TypeScript’s word. It runs first, before anything is drawn.', ar:'كلمة TypeScript. بيشتغل الأول، قبل ما أي حاجة تترسم.' } },
      { n:'ngOnDestroy', k:'ng', w:{ en:'The classic hook. Angular calls a method with exactly this name; any other spelling is never called.', ar:'الـ hook الكلاسيكي. أنجولار بينادي ميثود بالاسم ده بالظبط؛ وأي كتابة تانية عمرها ما هتتنادى.' } },
      { n:'OnDestroy', k:'ng', w:{ en:'The interface. <code>implements OnDestroy</code> makes TypeScript check you spelled <code>ngOnDestroy</code> right.', ar:'الـ interface. <code>implements OnDestroy</code> بيخلّي TypeScript يتأكد إنك كتبت <code>ngOnDestroy</code> صح.' } },
      { n:'ngOnChanges', k:'ng', w:{ en:'The classic hook for input changes.', ar:'الـ hook الكلاسيكي لتغيير الـ inputs.' } },
      { n:'OnChanges', k:'ng', w:{ en:'The interface for <code>ngOnChanges</code>.', ar:'الـ interface بتاع <code>ngOnChanges</code>.' } },
      { n:'ngAfterViewInit', k:'ng', w:{ en:'The classic hook for “my template is on the page”.', ar:'الـ hook الكلاسيكي لـ «التمبلت بتاعي بقى في الصفحة».' } },
      { n:'AfterViewInit', k:'ng', w:{ en:'The interface for <code>ngAfterViewInit</code>.', ar:'الـ interface بتاع <code>ngAfterViewInit</code>.' } },
      { n:'SimpleChanges', k:'ng', w:{ en:'Angular’s type for what <code>ngOnChanges</code> receives.', ar:'الـ type بتاع أنجولار للي <code>ngOnChanges</code> بتستلمه.' } },
      { n:'@Input', k:'ng', w:{ en:'The older decorator for an input.', ar:'الـ decorator القديم للـ input.' } },
      { n:'@ViewChild', k:'ng', w:{ en:'The older decorator for a template query.', ar:'الـ decorator القديم للـ query في التمبلت.' } },
      { n:'implements', k:'ng', w:{ en:'TypeScript’s word: “this class promises to have these methods”.', ar:'كلمة TypeScript: «الكلاس ده بيوعد إن فيه الميثودز دي».' } },
      { n:'Chart', k:'ng', w:{ en:'The Chart.js class. The library picked this name, not Angular and not you.', ar:'الكلاس بتاع Chart.js. المكتبة هي اللي اختارت الاسم ده، مش أنجولار ومش انت.' } },
      { n:'type', k:'ng', re:'(?<![\\w$-])type(?=:)', w:{ en:'A Chart.js option key.', ar:'مفتاح إعداد في Chart.js.' } },
      { n:'line', k:'ng', re:'(?<=\')line(?=\')', w:{ en:'A chart type Chart.js knows. A value, but still the library’s word.', ar:'نوع chart الـ Chart.js عارفه. قيمة، بس برضه كلمة المكتبة.' } },
      { n:'data', k:'ng', w:{ en:'A Chart.js option key, and the chart’s own property.', ar:'مفتاح إعداد في Chart.js، والـ property بتاعة الـ chart نفسه.' } },
      { n:'labels', k:'ng', w:{ en:'A Chart.js key.', ar:'مفتاح في Chart.js.' } },
      { n:'datasets', k:'ng', w:{ en:'A Chart.js key.', ar:'مفتاح في Chart.js.' } },
      { n:'label', k:'ng', re:'(?<![\\w$<\\/-])label(?=:)', w:{ en:'A Chart.js key. The text <code>\'Sales\'</code> after it is yours.', ar:'مفتاح في Chart.js. والنص <code>\'Sales\'</code> اللي بعده بتاعك.' } },
      { n:'destroy', k:'ng', w:{ en:'The Chart.js method that frees the chart. Another library might call it <code>remove()</code> or <code>dispose()</code>.', ar:'ميثود Chart.js اللي بتشيل الـ chart. مكتبة تانية ممكن تسمّيها <code>remove()</code> أو <code>dispose()</code>.' } },
      { n:'update', k:'ng', w:{ en:'Two different owners, neither is you: Chart.js’s <code>chart.update()</code> redraws, and a signal’s <code>update()</code> changes its value.', ar:'ليها صاحبين، ومفيش فيهم انت: <code>chart.update()</code> بتاعة Chart.js بتعيد الرسم، و<code>update()</code> بتاعة الـ signal بتغيّر قيمتها.' } },
      { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
      { n:'set', k:'ng', w:{ en:'A signal method.', ar:'ميثود بتاعة الـ signal.' } },
      { n:'@if', k:'ng', w:{ en:'Angular’s block. When its condition turns false, the component inside is destroyed.', ar:'البلوك بتاع أنجولار. لما الشرط بتاعه يبقى false، الـ component اللي جواه بيتشال.' } },
      { n:'click', k:'ng', w:{ en:'The browser’s event name.', ar:'اسم الـ event بتاع المتصفح.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator.', ar:'الـ decorator بتاع أنجولار.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The string after it is yours.', ar:'مفتاح إعداد. النص اللي بعده بتاعك.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key. The path after it points at your file.', ar:'مفتاح إعداد. المسار اللي بعده بيشاور على ملفك.' } },
      { n:'imports', k:'ng', w:{ en:'An option key: the components this template uses.', ar:'مفتاح إعداد: الـ components اللي التمبلت ده بيستخدمها.' } },
      { n:'setInterval', k:'ng', w:{ en:'The browser’s timer function.', ar:'function التايمر بتاعة المتصفح.' } },
      { n:'clearInterval', k:'ng', w:{ en:'The browser’s function that stops a <code>setInterval</code>.', ar:'function المتصفح اللي بتوقّف <code>setInterval</code>.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One chart, from created to destroyed', ar: 'chart واحد، من ما يتعمل لحد ما يتشال' },
    lead: {
      en: 'A dashboard shows a sales chart. The chart is drawn by Chart.js, a library that knows nothing about Angular and needs a real <code>&lt;canvas&gt;</code> element. The dashboard has a button that hides the chart. Follow one chart through its whole life:',
      ar: 'داشبورد بيعرض chart للمبيعات. الـ chart بترسمه Chart.js، مكتبة مش عارفة حاجة عن أنجولار ومحتاجة عنصر <code>&lt;canvas&gt;</code> حقيقي. والداشبورد فيه زرار بيخفي الـ chart. امشي ورا chart واحد طول حياته:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'dashboard.html', lang: 'html', who: { en: 'parent · creates', ar: 'الأب · بيعمله' },
          code: ['@if (showChart()) {', '  <app-chart-panel [points]="sales()" />', '}'],
          say: { en: `Birth. While ${mine('showChart')} is true, Angular creates the chart component. You never write <code>new ChartPanel()</code>. ${ng('@if')} is Angular’s; ${pub('points')} is the chart’s input name, so the parent must copy it exactly.`,
                 ar: `الولادة. طول ما ${mine('showChart')} بـ true، أنجولار بيعمل الـ chart component. انت عمرك ما بتكتب <code>new ChartPanel()</code>. ${ng('@if')} بتاع أنجولار؛ و${pub('points')} اسم الـ input بتاع الـ chart، فالأب لازم ينسخه بالظبط.` } },
        { file: 'chart-panel.ts', lang: 'ts', who: { en: 'child · registers', ar: 'الابن · بيسجّل' },
          code: ['constructor() {', '  afterNextRender(() => { … });', '  effect(() => { … });', '}'],
          say: { en: `The ${ng('constructor')} runs first, and nothing is on the page yet. So it does not draw. It <b>registers</b>: it hands two callbacks to Angular. ${ng('afterNextRender')} and ${ng('effect')} are Angular’s names. The code inside the brackets is yours.`,
                 ar: `الـ ${ng('constructor')} بيشتغل الأول، ولسه مفيش حاجة في الصفحة. فمش بيرسم. هو <b>بيسجّل</b>: بيسلّم أنجولار اتنين callbacks. ${ng('afterNextRender')} و${ng('effect')} أسماء أنجولار. والكود اللي جوه القوسين بتاعك.` } },
        { file: 'chart-panel.html', lang: 'html', who: { en: 'child · rendered', ar: 'الابن · اترسم' },
          code: ['<canvas #salesCanvas></canvas>'],
          say: { en: `Angular draws the template. Only now does the element exist. ${mine('salesCanvas')} is a name you gave it so the class can find it. <code>canvas</code> in the tag is the browser’s word.`,
                 ar: `أنجولار بيرسم التمبلت. دلوقتي بس العنصر بقى موجود. ${mine('salesCanvas')} اسم انت اديته له عشان الكلاس يلاقيه. و<code>canvas</code> اللي في التاج كلمة المتصفح.` } },
        { file: 'chart-panel.ts', lang: 'ts', who: { en: 'child · after render', ar: 'الابن · بعد الرسم' },
          code: ['this.chart = new Chart(this.canvas().nativeElement, { … });'],
          say: { en: `Angular now calls your ${ng('afterNextRender')} callback, once. ${mine('chart')} and ${mine('canvas')} are your fields. ${ng('Chart')} is the library’s class and ${ng('nativeElement')} is Angular’s property. This is the first moment the library can safely measure the element.`,
                 ar: `أنجولار دلوقتي بينادي الـ callback بتاع ${ng('afterNextRender')}، مرة واحدة. ${mine('chart')} و${mine('canvas')} fields بتوعك. ${ng('Chart')} كلاس المكتبة و${ng('nativeElement')} property بتاعة أنجولار. ودي أول لحظة المكتبة تقدر تقيس فيها العنصر بأمان.` } },
        { file: 'chart-panel.ts', lang: 'ts', who: { en: 'child · input changed', ar: 'الابن · الـ input اتغير' },
          code: ['const pts = this.points();', '…', 'this.chart.update();'],
          say: { en: `The parent adds a day, so ${pub('points')} changes. The ${ng('effect')} read ${pub('points')} last time, so Angular runs it again. No ${ng('ngOnChanges')} needed. ${ng('update')} here is Chart.js’s method, not Angular’s.`,
                 ar: `الأب بيضيف يوم، فـ ${pub('points')} بيتغير. الـ ${ng('effect')} قرا ${pub('points')} المرة اللي فاتت، فأنجولار بيشغّله تاني. مش محتاج ${ng('ngOnChanges')}. و${ng('update')} هنا ميثود Chart.js، مش أنجولار.` } },
        { file: 'chart-panel.ts', lang: 'ts', who: { en: 'child · destroyed', ar: 'الابن · اتشال' },
          code: ['this.destroyRef.onDestroy(() => this.chart?.destroy());'],
          say: { en: `The user hides the chart, ${ng('@if')} turns false, and Angular destroys the component. It calls every callback you registered with ${ng('onDestroy')}. ${mine('destroyRef')} is your field name; ${ng('onDestroy')} is Angular’s; ${ng('destroy')} is Chart.js’s. Three look-alikes, three owners.`,
                 ar: `المستخدم بيخفي الـ chart، و${ng('@if')} بتبقى false، وأنجولار بيشيل الـ component. وبينادي كل callback سجّلته بـ ${ng('onDestroy')}. ${mine('destroyRef')} اسم الـ field بتاعك؛ و${ng('onDestroy')} بتاعة أنجولار؛ و${ng('destroy')} بتاعة Chart.js. تلاتة شبه بعض، وتلات أصحاب.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: `You never call a lifecycle function. You <b>give</b> Angular a callback (<code>afterNextRender</code>, <code>effect</code>, <code>onDestroy</code>) or a method with a fixed name (<code>ngOnDestroy</code>), and Angular calls it at the right moment. So the words that must be exact are Angular’s. Everything inside your callbacks is yours.`,
        ar: `انت عمرك ما بتنادي function من بتوع الـ lifecycle. انت <b>بتدي</b> أنجولار callback (<code>afterNextRender</code>، <code>effect</code>، <code>onDestroy</code>) أو ميثود باسم ثابت (<code>ngOnDestroy</code>)، وأنجولار بيناديها في الوقت المظبوط. فالكلمات اللي لازم تبقى مظبوطة هي بتاعة أنجولار. وكل حاجة جوه الـ callbacks بتاعتك.` }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Who calls what?', ar: 'مين بينادي مين؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'With lifecycle, “who writes it” and “who calls it” are two different people. You write the body; Angular decides when it runs. Keep that split in mind and the names sort themselves.',
      ar: 'في الـ lifecycle، «مين بيكتبها» و«مين بيناديها» اتنين مختلفين. انت بتكتب الجسم؛ وأنجولار بيقرر إمتى يشتغل. خلي التقسيمة دي في دماغك والأسماء هتترتب لوحدها.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>readonly points = input.required&lt;Point[]&gt;()</code>', 'chart <code>.ts</code>', 'you', `you pick ${pub('points')}; the parent copies it in <code>[points]</code>`],
            ar: ['<code>readonly points = input.required&lt;Point[]&gt;()</code>', '<code>.ts</code> الـ chart', 'انت', `انت بتختار ${pub('points')}؛ والأب بينسخه في <code>[points]</code>`] },
          { en: ['<code>&lt;canvas #salesCanvas&gt;</code> and <code>viewChild.required(\'salesCanvas\')</code>', 'chart <code>.html</code> and <code>.ts</code>', 'you', `you pick ${mine('salesCanvas')}; both spellings must match`],
            ar: ['<code>&lt;canvas #salesCanvas&gt;</code> و<code>viewChild.required(\'salesCanvas\')</code>', '<code>.html</code> و<code>.ts</code> الـ chart', 'انت', `انت بتختار ${mine('salesCanvas')}؛ والكتابتين لازم يطابقوا`] },
          { en: ['<code>afterNextRender(() => { … })</code>', 'chart <code>constructor</code>', 'you write the body; <b>Angular calls it</b>', `${ng('afterNextRender')} is Angular’s; nothing inside has a fixed name`],
            ar: ['<code>afterNextRender(() => { … })</code>', '<code>constructor</code> الـ chart', 'انت بتكتب الجسم؛ و<b>أنجولار بيناديه</b>', `${ng('afterNextRender')} بتاعة أنجولار؛ ومفيش حاجة جوه اسمها ثابت`] },
          { en: ['<code>effect(() => { … })</code>', 'chart <code>constructor</code>', 'you write the body; <b>Angular re-runs it</b>', `${ng('effect')} is Angular’s`],
            ar: ['<code>effect(() => { … })</code>', '<code>constructor</code> الـ chart', 'انت بتكتب الجسم؛ و<b>أنجولار بيعيد تشغيله</b>', `${ng('effect')} بتاعة أنجولار`] },
          { en: ['<code>this.destroyRef.onDestroy(() => …)</code>', 'chart <code>.ts</code>', 'you write the body; <b>Angular calls it</b>', `you pick ${mine('destroyRef')}; ${ng('onDestroy')} is Angular’s`],
            ar: ['<code>this.destroyRef.onDestroy(() => …)</code>', '<code>.ts</code> الـ chart', 'انت بتكتب الجسم؛ و<b>أنجولار بيناديه</b>', `انت بتختار ${mine('destroyRef')}؛ و${ng('onDestroy')} بتاعة أنجولار`] },
          { en: ['<code>ngOnDestroy() { … }</code> (older style)', 'chart <code>.ts</code>', 'you write the method; <b>Angular calls it</b>', `Angular: the method name ${ng('ngOnDestroy')} is fixed`],
            ar: ['<code>ngOnDestroy() { … }</code> (الأسلوب القديم)', '<code>.ts</code> الـ chart', 'انت بتكتب الميثود؛ و<b>أنجولار بيناديها</b>', `أنجولار: اسم الميثود ${ng('ngOnDestroy')} ثابت`] },
          { en: ['<code>chart.update()</code>, <code>chart.destroy()</code>', 'inside your callbacks', 'you call them', `Chart.js: ${ng('update')} and ${ng('destroy')} are the library’s`],
            ar: ['<code>chart.update()</code>، <code>chart.destroy()</code>', 'جوه الـ callbacks بتاعتك', 'انت بتناديهم', `Chart.js: ${ng('update')} و${ng('destroy')} بتوع المكتبة`] },
        ] },
      { t: 'ul',
        en: ['<b>If Angular calls it, Angular named it.</b> Hook methods (<code>ngOnDestroy</code>) and the functions you pass callbacks to (<code>afterNextRender</code>, <code>effect</code>, <code>onDestroy</code>) are all Angular’s spelling. The names <b>inside</b> the callback are yours.',
             '<b>The parent never touches the child’s lifecycle.</b> It only decides whether the child exists, with <code>@if</code>. Creating and destroying is Angular’s job; cleaning up is the child’s.',
             '<b>Register in the constructor, act later.</b> <code>inject()</code>, <code>afterNextRender()</code> and <code>effect()</code> are called in the constructor or a field. The work inside them happens later, when Angular decides.'],
        ar: ['<b>لو أنجولار هو اللي بيناديها، يبقى أنجولار هو اللي سمّاها.</b> ميثودز الـ hooks (<code>ngOnDestroy</code>) والـ functions اللي بتديها callbacks (<code>afterNextRender</code>، <code>effect</code>، <code>onDestroy</code>) كلها كتابة أنجولار. والأسماء اللي <b>جوه</b> الـ callback بتاعتك.',
             '<b>الأب عمره ما بيلمس الـ lifecycle بتاع الابن.</b> هو بيقرر بس الابن يبقى موجود ولا لأ، بـ <code>@if</code>. العمل والشيل شغلانة أنجولار؛ والتنضيف شغلانة الابن.',
             '<b>سجّل في الـ constructor، واشتغل بعدين.</b> <code>inject()</code> و<code>afterNextRender()</code> و<code>effect()</code> بيتنادوا في الـ constructor أو في field. والشغل اللي جواهم بيحصل بعدين، لما أنجولار يقرر.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All five files, every name coloured', ar: 'الخمس ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same example, complete. Hover a coloured name to light up everywhere else it appears. Then press <b>Rename test</b>: every name you own turns into a made-up word, and every Angular and Chart.js word stays exactly where it is.',
      ar: 'نفس المثال، كامل. قف بالماوس على أي اسم ملوّن وهتنوّر كل الأماكن التانية اللي هو فيها. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: كل اسم بتاعك هيبقى كلمة عشوائية، وكل كلمة من أنجولار ومن Chart.js هتفضل مكانها بالظبط.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'point.ts', lang: 'ts', tag: { en: 'the data', ar: 'الداتا' }, code: [
        'export interface Point {',
        '  day: string;',
        '  total: number;',
        '}' ] },
      { t: 'code', name: 'chart-panel.ts', lang: 'ts', tag: { en: 'child', ar: 'الابن' }, code: [
        "import { Component, DestroyRef, ElementRef, afterNextRender, computed,",
        "         effect, inject, input, viewChild } from '@angular/core';",
        "import { Chart } from 'chart.js/auto';",
        "import { Point } from './point';",
        '',
        '@Component({',
        "  selector: 'app-chart-panel',",
        "  templateUrl: './chart-panel.html',",
        '})',
        'export class ChartPanel {',
        '  readonly points = input.required<Point[]>();',
        '  readonly best = computed(() => Math.max(0, ...this.points().map(p => p.total)));',
        '',
        "  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('salesCanvas');",
        '  private readonly destroyRef = inject(DestroyRef);',
        "  private chart?: Chart<'line', number[], string>;",
        '',
        '  constructor() {',
        '    // once, in the browser, after the <canvas> is on the page',
        '    afterNextRender(() => {',
        '      this.chart = new Chart(this.canvas().nativeElement, {',
        "        type: 'line',",
        '        data: {',
        '          labels: this.points().map(p => p.day),',
        "          datasets: [{ label: 'Sales', data: this.points().map(p => p.total) }],",
        '        },',
        '      });',
        '      this.destroyRef.onDestroy(() => this.chart?.destroy());',
        '    });',
        '',
        '    // again every time the input changes',
        '    effect(() => {',
        '      const pts = this.points();    // read first, so the effect tracks it',
        '      if (!this.chart) return;      // not drawn yet: afterNextRender will do it',
        '      this.chart.data.labels = pts.map(p => p.day);',
        '      this.chart.data.datasets[0].data = pts.map(p => p.total);',
        '      this.chart.update();',
        '    });',
        '  }',
        '}' ] },
      { t: 'code', name: 'chart-panel.html', lang: 'html', tag: { en: 'child', ar: 'الابن' }, code: [
        '<h3>{{ points().length }} days, peak {{ best() }}</h3>',
        '<canvas #salesCanvas></canvas>' ] },
      { t: 'code', name: 'dashboard.ts', lang: 'ts', tag: { en: 'parent', ar: 'الأب' }, code: [
        "import { Component, signal } from '@angular/core';",
        "import { ChartPanel } from './chart-panel';",
        "import { Point } from './point';",
        '',
        '@Component({',
        "  selector: 'app-dashboard',",
        '  imports: [ChartPanel],',
        "  templateUrl: './dashboard.html',",
        '})',
        'export class Dashboard {',
        '  readonly showChart = signal(true);',
        '  readonly sales = signal<Point[]>([',
        "    { day: 'Sat', total: 12 },",
        "    { day: 'Sun', total: 19 },",
        '  ]);',
        '',
        '  addDay() {',
        "    this.sales.update(list => [...list, { day: 'Mon', total: 7 }]);",
        '  }',
        '}' ] },
      { t: 'code', name: 'dashboard.html', lang: 'html', tag: { en: 'parent', ar: 'الأب' }, code: [
        '<button (click)="showChart.set(!showChart())">Show / hide</button>',
        '<button (click)="addDay()">Add Monday</button>',
        '',
        '@if (showChart()) {',
        '  <app-chart-panel [points]="sales()" />',
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
      en: 'Every name you own can be renamed, and most mistakes give you a compile error. Two do not: the template reference, which fails when the page runs, and Angular’s own hook names, which fail by never running at all.',
      ar: 'أي اسم بتاعك ينفع يتغير، وأغلب الغلطات بتديك compile error. اتنين لأ: الـ template reference، اللي بيضرب وقت ما الصفحة تشتغل، وأسماء الـ hooks بتاعة أنجولار نفسها، اللي بتفشل بإنها ببساطة مش بتشتغل.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [mine('salesCanvas') + ' (the <code>#ref</code>)', 'the string in <code>viewChild.required(\'…\')</code>', '<b>No compile error.</b> The page crashes when the chart first reads <code>this.canvas()</code>: the required query has no value.'],
            ar: [mine('salesCanvas') + ' (الـ <code>#ref</code>)', 'النص في <code>viewChild.required(\'…\')</code>', '<b>مفيش compile error.</b> الصفحة بتضرب أول ما الـ chart يقرا <code>this.canvas()</code>: الـ query الـ required ملهاش قيمة.'] },
          { en: [pub('points') + ' (the input)', 'the dashboard template: <code>[points]</code>', 'Compile error: the chart has no input with the old name.'],
            ar: [pub('points') + ' (الـ input)', 'تمبلت الداشبورد: <code>[points]</code>', 'Compile error: الـ chart معندوش input بالاسم القديم.'] },
          { en: [pub('app-chart-panel') + ' (the selector)', 'the tag in the dashboard template', 'Compile error: “is not a known element”.'],
            ar: [pub('app-chart-panel') + ' (الـ selector)', 'التاج في تمبلت الداشبورد', 'Compile error: «is not a known element».'] },
          { en: [pub('ChartPanel') + ' (the class)', 'the dashboard’s <code>import</code> line and <code>imports: [ ]</code>', 'Compile error on the import.'],
            ar: [pub('ChartPanel') + ' (الكلاس)', 'سطر الـ <code>import</code> في الداشبورد و<code>imports: [ ]</code>', 'Compile error في الـ import.'] },
          { en: [`${pub('Point')}, ${pub('day')}, ${pub('total')}`, 'every file that uses the type or reads the field', 'Compile error in each file that still uses the old name.'],
            ar: [`${pub('Point')}، ${pub('day')}، ${pub('total')}`, 'كل ملف بيستخدم الـ type أو بيقرا الـ field', 'Compile error في كل ملف لسه بيستخدم الاسم القديم.'] },
          { en: [`${mine('canvas')}, ${mine('chart')}, ${mine('destroyRef')}`, 'every <code>this.…</code> in the chart class', 'Compile error inside the class.'],
            ar: [`${mine('canvas')}، ${mine('chart')}، ${mine('destroyRef')}`, 'كل <code>this.…</code> في كلاس الـ chart', 'Compile error جوه الكلاس.'] },
          { en: [mine('best') + ' (the computed)', 'the chart template: <code>{{ best() }}</code>', 'Compile error in the template.'],
            ar: [mine('best') + ' (الـ computed)', 'تمبلت الـ chart: <code>{{ best() }}</code>', 'Compile error في التمبلت.'] },
          { en: [`${ng('ngOnDestroy')}, ${ng('ngOnChanges')}, any hook`, 'nothing: you cannot rename these', '<b>No error, unless the class says <code>implements</code>.</b> A misspelled hook is just an ordinary method Angular never calls.'],
            ar: [`${ng('ngOnDestroy')}، ${ng('ngOnChanges')}، أي hook`, 'ولا حاجة: دول مينفعش يتغيروا', '<b>مفيش error، إلا لو الكلاس كاتب <code>implements</code>.</b> الـ hook المكتوب غلط مجرد ميثود عادية أنجولار عمره ما هيناديها.'] },
          { en: [`${ng('afterNextRender')}, ${ng('effect')}, ${ng('onDestroy')}, ${ng('destroy')}`, 'nothing: these belong to Angular and Chart.js', 'Compile error: TypeScript cannot find the function or method.'],
            ar: [`${ng('afterNextRender')}، ${ng('effect')}، ${ng('onDestroy')}، ${ng('destroy')}`, 'ولا حاجة: دول بتوع أنجولار وChart.js', 'Compile error: TypeScript مش لاقي الـ function أو الميثود.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b> in the bar above the files. Notice what does <b>not</b> move: every hook, every Chart.js key like <code>labels</code> and <code>datasets</code>, and the <code>&lt;canvas&gt;</code> tag. Only your words change, and they change the same way in every file.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b> في الشريط اللي فوق الملفات. خد بالك من اللي <b>مش</b> بيتحرك: كل hook، وكل مفتاح من Chart.js زي <code>labels</code> و<code>datasets</code>، وتاج <code>&lt;canvas&gt;</code>. كلماتك بس هي اللي بتتغير، وبتتغير بنفس الشكل في كل الملفات.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتوعك' },
    title: { en: 'The fixed names, and the <code>ng</code> rule', ar: 'الأسماء الثابتة، وقاعدة الـ <code>ng</code>' },
    lead: {
      en: 'The classic hooks follow one pattern: the method is <code>ng</code> plus the interface’s name. Learn the pattern and you never have to memorise the list. Angular only calls a method whose name matches exactly.',
      ar: 'الـ hooks الكلاسيكية ماشية على نمط واحد: الميثود هي <code>ng</code> وبعدها اسم الـ interface. اتعلم النمط ومش هتحتاج تحفظ الليستة. وأنجولار بينادي بس الميثود اللي اسمها مطابق بالظبط.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Interface', 'Method Angular calls', 'When', 'Today you usually use'],
                ar: ['الـ interface', 'الميثود اللي أنجولار بيناديها', 'إمتى', 'النهارده غالبًا بتستخدم'] },
        rows: [
          { en: ['<code>OnChanges</code>', '<code>ngOnChanges(changes)</code>', 'an input got a new value', '<code>computed()</code> or <code>effect()</code>'],
            ar: ['<code>OnChanges</code>', '<code>ngOnChanges(changes)</code>', 'input خد قيمة جديدة', '<code>computed()</code> أو <code>effect()</code>'] },
          { en: ['<code>OnInit</code>', '<code>ngOnInit()</code>', 'once, after the first inputs arrive', 'still fine; or <code>computed()</code> / <code>effect()</code> for anything that reads inputs'],
            ar: ['<code>OnInit</code>', '<code>ngOnInit()</code>', 'مرة واحدة، بعد ما أول inputs توصل', 'لسه تمام؛ أو <code>computed()</code> / <code>effect()</code> لأي حاجة بتقرا inputs'] },
          { en: ['<code>AfterViewInit</code>', '<code>ngAfterViewInit()</code>', 'once, after the template is created', '<code>afterNextRender()</code>, which never runs on the server'],
            ar: ['<code>AfterViewInit</code>', '<code>ngAfterViewInit()</code>', 'مرة واحدة، بعد ما التمبلت يتعمل', '<code>afterNextRender()</code>، اللي عمره ما بيشتغل على السيرفر'] },
          { en: ['<code>OnDestroy</code>', '<code>ngOnDestroy()</code>', 'once, just before the component is removed', '<code>inject(DestroyRef).onDestroy(fn)</code>'],
            ar: ['<code>OnDestroy</code>', '<code>ngOnDestroy()</code>', 'مرة واحدة، قبل ما الـ component يتشال على طول', '<code>inject(DestroyRef).onDestroy(fn)</code>'] },
          { en: ['<code>DoCheck</code>, <code>AfterContentInit</code>, <code>AfterContentChecked</code>, <code>AfterViewChecked</code>', '<code>ngDoCheck()</code>, <code>ngAfterContentInit()</code>, …', 'rare, specialised moments', 'you almost never need these'],
            ar: ['<code>DoCheck</code>، <code>AfterContentInit</code>، <code>AfterContentChecked</code>، <code>AfterViewChecked</code>', '<code>ngDoCheck()</code>، <code>ngAfterContentInit()</code>، …', 'لحظات نادرة ومتخصصة', 'تقريبًا عمرك ما هتحتاجهم'] },
        ] },
      { t: 'p',
        en: `The newer functions follow no <code>ng</code> rule, because you never write them as methods. You <b>call</b> them and pass a callback: ${ng('afterNextRender')}, <code>afterEveryRender</code> (called <code>afterRender</code> before v20), ${ng('effect')}, and ${ng('DestroyRef')}’s ${ng('onDestroy')}. Their parameters and the variables inside your callback are all yours.`,
        ar: `الـ functions الأحدث مش ماشية على قاعدة الـ <code>ng</code>، عشان انت عمرك ما بتكتبها كميثودز. انت <b>بتناديها</b> وبتديها callback: ${ng('afterNextRender')}، و<code>afterEveryRender</code> (كان اسمها <code>afterRender</code> قبل v20)، و${ng('effect')}، و${ng('onDestroy')} بتاعة ${ng('DestroyRef')}. والـ parameters بتاعتها والمتغيرات اللي جوه الـ callback بتاعك كلها بتاعتك.` },
      { t: 'p',
        en: `And the third owner on this page is the <b>library</b>. ${ng('Chart')}, ${ng('type')}, ${ng('data')}, ${ng('labels')}, ${ng('datasets')}, ${ng('update')} and ${ng('destroy')} are Chart.js’s words. They look like your names because they are not Angular’s, but you cannot change them either. Another library uses other words: Leaflet frees a map with <code>map.remove()</code>, ECharts with <code>chart.dispose()</code>. Read the library’s docs for its cleanup method; Angular cannot know it.`,
        ar: `والصاحب التالت في الصفحة دي هو <b>المكتبة</b>. ${ng('Chart')} و${ng('type')} و${ng('data')} و${ng('labels')} و${ng('datasets')} و${ng('update')} و${ng('destroy')} كلمات Chart.js. شكلها زي أسماءك عشان مش بتاعة أنجولار، بس برضه مينفعش تغيّرها. ومكتبة تانية بتستخدم كلمات تانية: Leaflet بتشيل الماب بـ <code>map.remove()</code>، وECharts بـ <code>chart.dispose()</code>. اقرا docs المكتبة عشان تعرف ميثود التنضيف بتاعتها؛ أنجولار مايقدرش يعرفها.` },
      { t: 'note', label: { en: 'Remember', ar: 'افتكر' },
        en: '<code>ngOnDestroy</code> (a hook method you write), <code>onDestroy</code> (a method you call on <code>DestroyRef</code>) and <code>destroy()</code> (the library’s cleanup) are three different things from three different owners. Only the field name, here <code>destroyRef</code>, is yours.',
        ar: '<code>ngOnDestroy</code> (ميثود hook انت بتكتبها)، و<code>onDestroy</code> (ميثود بتناديها على <code>DestroyRef</code>)، و<code>destroy()</code> (تنضيف المكتبة) تلات حاجات مختلفة من تلات أصحاب مختلفين. اسم الـ field بس، هنا <code>destroyRef</code>، هو اللي بتاعك.' }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'Angular accepts any name for your fields and references. These habits keep your names from being mistaken for Angular’s, which is the main source of confusion on this topic.',
      ar: 'أنجولار بيقبل أي اسم للـ fields والـ references بتاعتك. العادات دي بتمنع أسماءك إنها تتلخبط مع أسماء أنجولار، ودي أكبر مصدر لخبطة في الموضوع ده.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['your own methods', '<code>stopPolling</code>, <code>drawChart</code>', '<code>ngStop</code>, <code>onDestroy</code>', 'The <code>ng</code> prefix and hook-like names make readers think Angular calls the method. It does not.'],
            ar: ['الميثودز بتاعتك', '<code>stopPolling</code>، <code>drawChart</code>', '<code>ngStop</code>، <code>onDestroy</code>', 'البادئة <code>ng</code> والأسماء اللي شبه الـ hooks بتخلّي اللي بيقرا يفتكر إن أنجولار بينادي الميثود. وهو مش بيناديها.'] },
          { en: ['a hook method', 'call a named method from it: <code>ngOnDestroy() { this.stopPolling(); }</code>', 'thirty lines inside the hook', 'Angular’s style guide recommends keeping lifecycle methods simple and putting the logic in a well-named method.'],
            ar: ['ميثود hook', 'نادي ميثود ليها اسم منها: <code>ngOnDestroy() { this.stopPolling(); }</code>', 'تلاتين سطر جوه الـ hook', 'دليل أنجولار بينصح إنك تخلي ميثودز الـ lifecycle بسيطة وتحط المنطق في ميثود ليها اسم واضح.'] },
          { en: ['a class with classic hooks', '<code>implements OnDestroy</code>', 'no <code>implements</code>', 'The interface turns a misspelled hook into a compile error. The style guide recommends it.'],
            ar: ['كلاس فيه hooks كلاسيكية', '<code>implements OnDestroy</code>', 'من غير <code>implements</code>', 'الـ interface بيحوّل الـ hook المكتوب غلط لـ compile error. ودليل الأسلوب بينصح بيه.'] },
          { en: ['a template reference', '<code>#salesCanvas</code>, <code>#mapHost</code>', '<code>#canvas</code>, <code>#ref</code>, <code>#el</code>', 'Legal, but <code>#canvas</code> makes one word mean the tag, the reference and maybe the field. Say what is in it.'],
            ar: ['template reference', '<code>#salesCanvas</code>، <code>#mapHost</code>', '<code>#canvas</code>، <code>#ref</code>، <code>#el</code>', 'مسموح، بس <code>#canvas</code> بيخلّي كلمة واحدة معناها التاج والـ reference ويمكن الـ field. قول إيه اللي جواه.'] },
          { en: ['the <code>DestroyRef</code> field', '<code>destroyRef</code>', '<code>destroy</code>', 'A field called <code>destroy</code> reads like the library’s <code>destroy()</code> method.'],
            ar: ['الـ field بتاع <code>DestroyRef</code>', '<code>destroyRef</code>', '<code>destroy</code>', 'field اسمه <code>destroy</code> بيتقري كأنه ميثود <code>destroy()</code> بتاعة المكتبة.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Three places where a name must copy another', ar: 'تلات أماكن الاسم فيها لازم ينسخ اسم تاني' },
    lead: {
      en: 'Your names are free, until a string has to point at one of them. Strings are not checked by TypeScript, so these are the places to slow down.',
      ar: 'أسماءك حرة، لحد ما نص لازم يشاور على واحد منهم. والنصوص TypeScript مش بيتأكد منها، فدي الأماكن اللي لازم تهدى فيها.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'The query string must equal the <code>#ref</code>', ar: 'النص في الـ query لازم يساوي الـ <code>#ref</code>' }, blocks: [
        { t: 'p',
          en: `${mine('salesCanvas')} is written twice: after <code>#</code> in the template and inside quotes in <code>viewChild.required('salesCanvas')</code>. The two spellings must match, and the compiler does not check them against each other.`,
          ar: `${mine('salesCanvas')} مكتوب مرتين: بعد <code>#</code> في التمبلت وجوه علامات تنصيص في <code>viewChild.required('salesCanvas')</code>. والكتابتين لازم يطابقوا، والـ compiler مش بيقارنهم ببعض.` }
      ]},
      { t: 'step', n: 'B', title: { en: 'The hook method must be <code>ng</code> + the interface', ar: 'ميثود الـ hook لازم تبقى <code>ng</code> + الـ interface' }, blocks: [
        { t: 'p',
          en: 'In the classic style, you write the method, but Angular picked its name. <code>OnDestroy</code> means <code>ngOnDestroy</code>, capital letters included. This is a rule, not a habit.',
          ar: 'في الأسلوب الكلاسيكي، انت اللي بتكتب الميثود، بس أنجولار هو اللي اختار اسمها. <code>OnDestroy</code> معناها <code>ngOnDestroy</code>، بالحروف الكابيتال. ودي قاعدة، مش عادة.' }
      ]},
      { t: 'step', n: 'C', title: { en: 'The <code>changes</code> key must equal the input', ar: 'المفتاح في <code>changes</code> لازم يساوي الـ input' }, blocks: [
        { t: 'code', name: OLD, lang: 'ts', tag: { en: 'older style', ar: 'أسلوب أقدم' }, code: [
          'ngOnChanges(changes: SimpleChanges) {',
          "  if (changes['points']) {",
          '    // the string must be the input’s name, letter for letter',
          '  }',
          '}' ] },
        { t: 'p',
          en: `The key <code>'points'</code> is a plain string, and TypeScript does not check it against your inputs. Rename the input ${pub('points')} and forget this string, and the <code>if</code> is simply never true. Your ${mine('changes')} parameter, on the other hand, can be called anything.`,
          ar: `المفتاح <code>'points'</code> نص عادي، وTypeScript مش بيقارنه بالـ inputs بتاعتك. لو غيّرت الـ input ${pub('points')} ونسيت النص ده، الـ <code>if</code> ببساطة عمره ما هيبقى true. أما الـ parameter ${mine('changes')} فتقدر تسمّيه أي حاجة.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: 'The classic hooks, same component', ar: 'الـ hooks الكلاسيكية، نفس الـ component' },
    lead: {
      en: 'Tutorials and older projects write the same chart with decorators and hook methods. Nothing here is wrong, and it all still works. Your names (<code>points</code>, <code>salesCanvas</code>, <code>chart</code>) stay the same; only Angular’s words change.',
      ar: 'الشروحات والمشاريع الأقدم بتكتب نفس الـ chart بـ decorators وميثودز hooks. مفيش حاجة هنا غلط، وكله لسه شغال. أسماءك (<code>points</code>، <code>salesCanvas</code>، <code>chart</code>) زي ما هي؛ كلمات أنجولار بس هي اللي بتتغير.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: OLD, lang: 'ts', code: [
          'export class ChartPanel implements OnChanges, AfterViewInit, OnDestroy {',
          '  @Input({ required: true }) points!: Point[];',
          "  @ViewChild('salesCanvas') canvas!: ElementRef<HTMLCanvasElement>;",
          "  private chart?: Chart<'line', number[], string>;",
          '',
          '  ngAfterViewInit() {',
          '    this.chart = new Chart(this.canvas.nativeElement, { … });',
          '  }',
          '',
          '  ngOnChanges(changes: SimpleChanges) {',
          "    if (changes['points'] && this.chart) { /* … */ this.chart.update(); }",
          '  }',
          '',
          '  ngOnDestroy() {',
          '    this.chart?.destroy();',
          '  }',
          '}' ] },
        good: { name: 'chart-panel.ts — today', lang: 'ts', code: [
          'export class ChartPanel {',
          '  readonly points = input.required<Point[]>();',
          "  private readonly canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('salesCanvas');",
          "  private chart?: Chart<'line', number[], string>;",
          '  private readonly destroyRef = inject(DestroyRef);',
          '',
          '  constructor() {',
          '    afterNextRender(() => {',
          '      this.chart = new Chart(this.canvas().nativeElement, { … });',
          '      this.destroyRef.onDestroy(() => this.chart?.destroy());',
          '    });',
          '    effect(() => { /* read this.points(), then this.chart?.update() */ });',
          '  }',
          '}' ] } },
      { t: 'p',
        en: 'Two differences in how you <b>read</b> things: the old <code>@ViewChild</code> field is a plain value (<code>this.canvas.nativeElement</code>), while <code>viewChild()</code> is a signal you call (<code>this.canvas().nativeElement</code>). Same for the input: <code>this.points</code> versus <code>this.points()</code>.',
        ar: 'فيه فرقين في طريقة <b>القراية</b>: الـ field بتاع <code>@ViewChild</code> القديم قيمة عادية (<code>this.canvas.nativeElement</code>)، لكن <code>viewChild()</code> signal بتناديها (<code>this.canvas().nativeElement</code>). ونفس الكلام للـ input: <code>this.points</code> قصاد <code>this.points()</code>.' }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, or it crashes oddly', ar: 'مش بيعمل حاجة، أو بيضرب بشكل غريب' },
    title: { en: 'Mistakes that fail silently or confusingly', ar: 'غلطات بتفشل في صمت أو بشكل ملخبط' },
    lead: {
      en: 'Lifecycle bugs are about timing and spelling. Angular looks hooks up by name and runs callbacks when <b>it</b> decides, so a mistake often shows up far from where you made it.',
      ar: 'باجات الـ lifecycle بتبقى في التوقيت والإملاء. أنجولار بيدوّر على الـ hooks بالاسم وبيشغّل الـ callbacks لما <b>هو</b> يقرر، فالغلطة كتير بتظهر بعيد عن المكان اللي عملتها فيه.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'A misspelled hook', ar: 'hook مكتوب غلط' }, blocks: [
        { t: 'pair',
          bad:  { name: 'poller.ts', lang: 'ts', code: [
            'export class Poller {',
            '  private timer = setInterval(() => this.refresh(), 5000);',
            '',
            '  ngOnDestory() { this.stopPolling(); }',
            '  stopPolling() { clearInterval(this.timer); }',
            '  refresh() { /* … */ }',
            '}' ] },
          good: { name: 'poller.ts', lang: 'ts', code: [
            'export class Poller implements OnDestroy {',
            '  private timer = setInterval(() => this.refresh(), 5000);',
            '',
            '  ngOnDestroy() { this.stopPolling(); }',
            '  stopPolling() { clearInterval(this.timer); }',
            '  refresh() { /* … */ }',
            '}' ] } },
        { t: 'p', en: 'Without <code>implements</code>, <code>ngOnDestory</code> is just a method with a funny name. The timer keeps running after the component is gone. With <code>implements OnDestroy</code>, the same typo is a compile error.',
                  ar: 'من غير <code>implements</code>، <code>ngOnDestory</code> مجرد ميثود باسم غريب. والتايمر بيفضل شغال بعد ما الـ component يتشال. ومع <code>implements OnDestroy</code>، نفس الغلطة بتبقى compile error.' }
      ]},
      { t: 'step', n: '2', title: { en: 'A method called <code>onDestroy</code> in your class', ar: 'ميثود اسمها <code>onDestroy</code> في الكلاس بتاعك' }, blocks: [
        { t: 'pair',
          bad:  { name: SLIP, lang: 'ts', code: [
            'onDestroy() {',
            '  clearInterval(this.timer);',
            '}' ] },
          good: { name: 'poller.ts', lang: 'ts', code: [
            'constructor() {',
            '  inject(DestroyRef).onDestroy(() => clearInterval(this.timer));',
            '}' ] } },
        { t: 'p', en: '<code>onDestroy</code> is the name of a method <b>on <code>DestroyRef</code></b>, not a hook. A method with that name in your own class is never called. Either call <code>onDestroy</code> on <code>DestroyRef</code>, or name your method <code>ngOnDestroy</code>.',
                  ar: '<code>onDestroy</code> اسم ميثود <b>في <code>DestroyRef</code></b>، مش hook. وميثود بالاسم ده في الكلاس بتاعك عمرها ما هتتنادى. يا إما تنادي <code>onDestroy</code> على <code>DestroyRef</code>، يا إما تسمّي الميثود بتاعتك <code>ngOnDestroy</code>.' }
      ]},
      { t: 'step', n: '3', title: { en: '<code>inject()</code> inside a callback', ar: '<code>inject()</code> جوه callback' }, blocks: [
        { t: 'pair',
          bad:  { name: 'chart-panel.ts', lang: 'ts', code: [
            'afterNextRender(() => {',
            '  this.chart = new Chart(…);',
            '  inject(DestroyRef).onDestroy(() => this.chart?.destroy());',
            '});' ] },
          good: { name: 'chart-panel.ts', lang: 'ts', code: [
            'private readonly destroyRef = inject(DestroyRef);',
            '',
            'afterNextRender(() => {',
            '  this.chart = new Chart(…);',
            '  this.destroyRef.onDestroy(() => this.chart?.destroy());',
            '});' ] } },
        { t: 'p', en: 'The callback runs later, outside the constructor, where <code>inject()</code> no longer works. You get a runtime error, NG0203, about an injection context. Inject into a field first, then use the field inside the callback.',
                  ar: 'الـ callback بيشتغل بعدين، برّه الـ constructor، ومفيش <code>inject()</code> بيشتغل هناك. هتاخد runtime error، NG0203، بيتكلم عن injection context. اعمل inject في field الأول، وبعدين استخدم الـ field جوه الـ callback.' }
      ]},
      { t: 'step', n: '4', title: { en: 'Reading an input in the constructor', ar: 'قراية input في الـ constructor' }, blocks: [
        { t: 'pair',
          bad:  { name: 'chart-panel.ts', lang: 'ts', code: [
            'constructor() {',
            '  console.log(this.points().length);',
            '}' ] },
          good: { name: 'chart-panel.ts', lang: 'ts', code: [
            'constructor() {',
            '  effect(() => console.log(this.points().length));',
            '}' ] } },
        { t: 'p', en: 'The parent has not given the input a value yet when the constructor runs. Reading a required input that early is a runtime error saying no value is available yet. Read inputs inside <code>computed()</code>, <code>effect()</code> or the template, which all run later.',
                  ar: 'الأب لسه ماداش الـ input قيمة وقت ما الـ constructor بيشتغل. وقراية input required بدري كده runtime error بيقول إن مفيش قيمة لسه. اقرا الـ inputs جوه <code>computed()</code> أو <code>effect()</code> أو التمبلت، وكلهم بيشتغلوا بعدين.' }
      ]},
      { t: 'step', n: '5', title: { en: 'An effect that returns before reading the signal', ar: 'effect بيرجع قبل ما يقرا الـ signal' }, blocks: [
        { t: 'pair',
          bad:  { name: 'chart-panel.ts', lang: 'ts', code: [
            'effect(() => {',
            '  if (!this.chart) return;',
            '  this.chart.data.labels = this.points().map(p => p.day);',
            '  this.chart.update();',
            '});' ] },
          good: { name: 'chart-panel.ts', lang: 'ts', code: [
            'effect(() => {',
            '  const pts = this.points();',
            '  if (!this.chart) return;',
            '  this.chart.data.labels = pts.map(p => p.day);',
            '  this.chart.update();',
            '});' ] } },
        { t: 'p', en: 'An effect only re-runs for the signals it read <b>last time</b>. On its first run the chart does not exist yet, so the bad version returns before reading <code>points()</code>, and it never runs again. No error; the chart just never updates.',
                  ar: 'الـ effect بيتعاد بس عشان الـ signals اللي قراها <b>المرة اللي فاتت</b>. في أول مرة الـ chart لسه مش موجود، فالنسخة الغلط بترجع قبل ما تقرا <code>points()</code>، ومش هتشتغل تاني أبدًا. مفيش error؛ الـ chart بس عمره ما هيتحدّث.' }
      ]},
      { t: 'step', n: '6', title: { en: 'The query string does not match the <code>#ref</code>', ar: 'نص الـ query مش مطابق للـ <code>#ref</code>' }, blocks: [
        { t: 'pair',
          bad:  { name: 'chart-panel.ts', lang: 'ts', code: [
            "private readonly canvas = viewChild.required<ElementRef>('chartCanvas');" ] },
          good: { name: 'chart-panel.ts', lang: 'ts', code: [
            "private readonly canvas = viewChild.required<ElementRef>('salesCanvas');" ] } },
        { t: 'p', en: 'The template says <code>#salesCanvas</code>; the query looks for <code>canvas</code>. It compiles. Then the first <code>this.canvas()</code> throws at runtime, because a required query found nothing. Copy the word from the template.',
                  ar: 'التمبلت كاتب <code>#salesCanvas</code>؛ والـ query بتدوّر على <code>canvas</code>. بيعمل compile عادي. وبعدين أول <code>this.canvas()</code> بيضرب وقت التشغيل، عشان query required ملقتش حاجة. انسخ الكلمة من التمبلت.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it does nothing', ar: 'لما مايعملش حاجة' },
    title: { en: 'Six questions, in this order', ar: 'ست أسئلة، بالترتيب ده' },
    lead: {
      en: 'Your hook “does not run”, or your cleanup never happens. Ask these before anything else.',
      ar: 'الـ hook بتاعك «مش بيشتغل»، أو التنضيف بتاعك عمره ما بيحصل. اسأل الأسئلة دي قبل أي حاجة.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Is the hook spelled exactly, capitals included, and does the class <code>implements</code> its interface so the compiler checks it?',
                  ar: '<b>1.</b> الـ hook مكتوب بالظبط، بالحروف الكابيتال، والكلاس عامل <code>implements</code> للـ interface بتاعه عشان الـ compiler يتأكد؟' },
      { t: 'chk', en: '<b>2.</b> Is the code at the right moment? DOM and library work goes in <code>afterNextRender</code>, never in the constructor.',
                  ar: '<b>2.</b> الكود في اللحظة الصح؟ شغل الـ DOM والمكتبات مكانه <code>afterNextRender</code>، عمره ما يبقى في الـ constructor.' },
      { t: 'chk', en: '<b>3.</b> Are <code>inject()</code>, <code>effect()</code> and <code>afterNextRender()</code> called in the constructor or a field, not inside a callback or a method?',
                  ar: '<b>3.</b> <code>inject()</code> و<code>effect()</code> و<code>afterNextRender()</code> بيتنادوا في الـ constructor أو في field، مش جوه callback أو ميثود؟' },
      { t: 'chk', en: '<b>4.</b> Does your <code>effect</code> read the signal before any early <code>return</code>?',
                  ar: '<b>4.</b> الـ <code>effect</code> بتاعك بيقرا الـ signal قبل أي <code>return</code> بدري؟' },
      { t: 'chk', en: '<b>5.</b> Does the string in <code>viewChild(\'…\')</code> match the <code>#ref</code> in the template, letter for letter?',
                  ar: '<b>5.</b> النص في <code>viewChild(\'…\')</code> مطابق للـ <code>#ref</code> في التمبلت، حرف بحرف؟' },
      { t: 'chk', en: '<b>6.</b> For everything you started (a timer, a listener, a library object), is there a matching stop in <code>onDestroy</code>, using the library’s own cleanup method?',
                  ar: '<b>6.</b> كل حاجة بدأتها (تايمر، listener، object من مكتبة)، ليها إيقاف مقابل في <code>onDestroy</code>، بميثود التنضيف بتاعة المكتبة نفسها؟' }
    ]
  }
  ]
};
