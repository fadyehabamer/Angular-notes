/* ==================================================================
   Dynamic components, name by name — the deep dive after the dynamic
   components topic. One running example (a dashboard whose widgets
   are chosen by data) followed through every file, every name coloured.
   ================================================================== */

const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

export default {
  topic: 'dynamic-components',
  tab: 'Dynamic components, name by name — The Angular Signal',
  title: { en: 'Dynamic components, name by name', ar: 'الـ dynamic components، اسم اسم' },
  say: {
    en: 'One dashboard whose widgets are picked by data, followed from the server’s <code>type</code> string to a component on screen. Every name coloured, with a warning on the three names the compiler can no longer check for you.',
    ar: 'داشبورد واحد الـ widgets بتاعته بتتختار من الداتا، ماشيين وراه من نص الـ <code>type</code> اللي جاي من السيرفر لحد component على الشاشة. كل اسم ملوّن، ومعاه تحذير على التلات أسماء اللي الـ compiler مبقاش يقدر يراجعها بدالك.'
  },
  lead: {
    en: 'The idea: <b>when the data decides which component to show, you look the class up in code instead of writing its tag in a template.</b> The confusing part is the names. The component you create has a selector nobody types, its input names travel as plain strings and object keys, and a string from the server has to match a key in your registry. This page shows every name, who owns it, and which ones fail silently when they do not match.',
    ar: 'الفكرة: <b>لما الداتا هي اللي بتقرر تعرض أنهي component، بتدوّر على الكلاس في الكود بدل ما تكتب التاج بتاعه في التمبلت.</b> اللي بيلخبط هو الأسماء. الـ component اللي بتعمله ليه selector محدش بيكتبه، وأسماء الـ inputs بتاعته بتتنقل كنصوص عادية ومفاتيح object، ونص جاي من السيرفر لازم يطابق مفتاح في الـ registry بتاعك. الصفحة دي بتوريك كل اسم، بتاع مين، وأنهي أسماء بتفشل في صمت لما ماتطابقش.'
  },

  names: {
    note: {
      en: 'When you create a component from code, the compiler stops checking some names for you. Watch the orange rows marked as strings or keys: <code>chart</code>, <code>config</code>, <code>anchor</code>. A typo in those gives no compile error.',
      ar: 'لما بتعمل component من الكود، الـ compiler بيبطّل يراجع شوية أسماء بدالك. خلي بالك من الصفوف البرتقاني اللي متوصوفة إنها نصوص أو مفاتيح: <code>chart</code> و<code>config</code> و<code>anchor</code>. أي غلطة إملائية فيهم مش هتديك compile error.'
    },
    names: [
      /* --- shared --- */
      { n:'WidgetConfig', k:'pub', w:{ en:'Your data type: one widget as the server describes it.', ar:'نوع الداتا بتاعك: widget واحد زي ما السيرفر بيوصفه.' } },
      { n:'id', k:'pub', w:{ en:'A field of <code>WidgetConfig</code>.', ar:'field في <code>WidgetConfig</code>.' } },
      { n:'type', k:'pub', w:{ en:'A field of <code>WidgetConfig</code>: the string that picks the widget.', ar:'field في <code>WidgetConfig</code>: النص اللي بيختار الـ widget.' } },
      { n:'title', k:'pub', w:{ en:'A field of <code>WidgetConfig</code>, shown by the widget.', ar:'field في <code>WidgetConfig</code>، والـ widget بيعرضه.' } },
      { n:'chart', k:'pub', re:'(?<![\\w$/.-])chart(?=:)|(?<=\')chart(?=\')',
        w:{ en:'A registry key, and the <code>type</code> value in the data. <b>Plain strings: nothing checks they match.</b>', ar:'مفتاح في الـ registry، وقيمة الـ <code>type</code> في الداتا. <b>نصوص عادية: محدش بيشيّك إنهم متطابقين.</b>' } },
      { n:'metric', k:'pub', re:'(?<![\\w$/.-])metric(?=:)|(?<=\')metric(?=\')',
        w:{ en:'Another registry key and <code>type</code> value.', ar:'مفتاح تاني في الـ registry وقيمة <code>type</code>.' } },
      { n:'WIDGETS', k:'pub', w:{ en:'Your registry, exported by one file and imported by the host.', ar:'الـ registry بتاعك، ملف بيعمله export والـ host بيعمله import.' } },
      { n:'ChartWidget', k:'pub', w:{ en:'The chart’s class. The registry and the dashboard read it from the module by this exact export name.', ar:'كلاس الـ chart. الـ registry والداشبورد بيقروه من الـ module باسم الـ export ده بالظبط.' } },
      { n:'MetricWidget', k:'pub', w:{ en:'Another widget class, exported by <code>./widgets/metric</code>.', ar:'كلاس widget تاني، و<code>./widgets/metric</code> بيعمله export.' } },
      { n:'config', k:'pub',
        w:{ en:'The widget’s input. The host passes it as the key <code>config:</code>, the dashboard as the string <code>\'config\'</code>. <b>Neither is checked at compile time.</b>', ar:'الـ input بتاع الـ widget. الـ host بيبعته كمفتاح <code>config:</code>، والداشبورد كنص <code>\'config\'</code>. <b>ولا واحد فيهم بيتشيّك وقت الـ compile.</b>' } },
      { n:'removed', k:'pub', w:{ en:'The widget’s output. The dashboard subscribes to <code>ref.instance.removed</code>.', ar:'الـ output بتاع الـ widget. الداشبورد بيعمل subscribe على <code>ref.instance.removed</code>.' } },
      { n:'widget', k:'pub', re:'(?<![\\w$/-])widget(?![\\w$-])', w:{ en:'The host’s input. The dashboard binds <code>[widget]</code>.', ar:'الـ input بتاع الـ host. الداشبورد بيربط <code>[widget]</code>.' } },
      { n:'WidgetHost', k:'pub', w:{ en:'The host’s class, listed in the dashboard’s <code>imports</code>.', ar:'كلاس الـ host، مكتوب في <code>imports</code> بتاعة الداشبورد.' } },
      { n:'app-widget-host', k:'pub', w:{ en:'The host’s selector, typed as a tag by the dashboard.', ar:'الـ selector بتاع الـ host، والداشبورد بيكتبه كتاج.' } },
      { n:'Dashboard', k:'pub', w:{ en:'The dashboard’s class. A route or a parent imports it.', ar:'كلاس الداشبورد. route أو أب بيعمله import.' } },
      { n:'app-dashboard', k:'pub', w:{ en:'The dashboard’s selector.', ar:'الـ selector بتاع الداشبورد.' } },

      /* --- yours, local --- */
      { n:'app-chart-widget', k:'mine', w:{ en:'The chart’s selector. Nobody types this tag: the widget is only ever created from code.', ar:'الـ selector بتاع الـ chart. محدش بيكتب التاج ده: الـ widget بيتعمل من الكود بس.' } },
      { n:'m', k:'mine', w:{ en:'The loaded module, a one-line parameter.', ar:'الـ module اللي اتحمّل، parameter عايش سطر واحد.' } },
      { n:'cmp', k:'mine', w:{ en:'The host’s signal holding the loaded class.', ar:'الـ signal بتاعة الـ host اللي شايلة الكلاس اللي اتحمّل.' } },
      { n:'c', k:'mine', w:{ en:'The <code>@if</code> alias for <code>cmp()</code>.', ar:'الـ alias بتاع <code>@if</code> لـ <code>cmp()</code>.' } },
      { n:'inputs', k:'mine', re:'(?<![\\w$.-])inputs(?![\\w$:-])', w:{ en:'The host’s computed with the inputs object. Only the key <code>inputs:</code> to its left is Angular’s.', ar:'الـ computed بتاعة الـ host اللي فيها object الـ inputs. المفتاح <code>inputs:</code> اللي على شمالها بس هو بتاع أنجولار.' } },
      { n:'load', k:'mine', w:{ en:'A local constant: the loader function for this type.', ar:'constant محلي: الـ function اللي بتحمّل النوع ده.' } },
      { n:'layout', k:'mine', w:{ en:'The dashboard’s signal with the widget list.', ar:'الـ signal بتاعة الداشبورد اللي فيها ليستة الـ widgets.' } },
      { n:'w', k:'mine', w:{ en:'The <code>@for</code> loop variable.', ar:'متغير اللوب بتاع <code>@for</code>.' } },
      { n:'slot', k:'mine', w:{ en:'The dashboard’s field holding the <code>ViewContainerRef</code>.', ar:'الـ field بتاع الداشبورد اللي شايل الـ <code>ViewContainerRef</code>.' } },
      { n:'#anchor', k:'mine', as:'turnip', re:'(?<=#|\')anchor(?![\\w$-])',
        w:{ en:'A template reference, and the string the query looks for. Both live in the dashboard, but they must match, and a mismatch shows up only at runtime.', ar:'template reference، والنص اللي الـ query بتدوّر عليه. الاتنين عايشين في الداشبورد، بس لازم يطابقوا بعض، ولو ماطابقوش هتعرف وقت التشغيل بس.' } },
      { n:'ref', k:'mine', w:{ en:'A local name for the returned <code>ComponentRef</code>.', ar:'اسم محلي للـ <code>ComponentRef</code> اللي رجع.' } },
      { n:'addChart', k:'mine', w:{ en:'The dashboard’s own method, called by its own button.', ar:'ميثود الداشبورد نفسه، والزرار بتاعه هو اللي بيناديها.' } },
      { n:'resolver', k:'mine', w:{ en:'The older code’s constructor parameter.', ar:'الـ parameter بتاع الـ constructor في الكود القديم.' } },
      { n:'factory', k:'mine', w:{ en:'The older code’s local constant.', ar:'الـ constant المحلي في الكود القديم.' } },

      /* --- Angular’s, TypeScript’s, JavaScript’s --- */
      { n:'NgComponentOutlet', k:'ng', w:{ en:'Angular’s directive class, listed in <code>imports</code>.', ar:'كلاس الـ directive بتاع أنجولار، بيتكتب في <code>imports</code>.' } },
      { n:'ngComponentOutlet', k:'ng', w:{ en:'The same directive as written in a template, with <code>*</code>.', ar:'نفس الـ directive بالشكل اللي بيتكتب في التمبلت، بـ <code>*</code>.' } },
      { n:'inputs:', k:'ng', re:'(?<![\\w$.-])inputs(?=:)', w:{ en:'The outlet’s own option key (short for <code>ngComponentOutletInputs</code>).', ar:'مفتاح الإعداد بتاع الـ outlet نفسه (اختصار لـ <code>ngComponentOutletInputs</code>).' } },
      { n:'ng-container', k:'ng', w:{ en:'Angular’s invisible wrapper tag.', ar:'تاج أنجولار الخفي.' } },
      { n:'ViewContainerRef', k:'ng', w:{ en:'Angular’s handle on a spot where components can be inserted.', ar:'الـ handle بتاع أنجولار على مكان ينفع تحط فيه components.' } },
      { n:'viewChild', k:'ng', w:{ en:'Angular’s signal query: find something in this component’s template.', ar:'الـ signal query بتاعة أنجولار: دوّر على حاجة في تمبلت الـ component ده.' } },
      { n:'@ViewChild', k:'ng', w:{ en:'The older decorator version of the same query.', ar:'نسخة الـ decorator القديمة من نفس الـ query.' } },
      { n:'read', k:'ng', w:{ en:'A query option key: what to hand back for the match.', ar:'مفتاح إعداد في الـ query: ترجّع إيه للحاجة اللي لقتها.' } },
      { n:'createComponent', k:'ng', w:{ en:'Angular’s method that builds the component and returns a <code>ComponentRef</code>.', ar:'ميثود أنجولار اللي بتبني الـ component وبترجّع <code>ComponentRef</code>.' } },
      { n:'setInput', k:'ng', w:{ en:'<code>ComponentRef</code>’s method. The string you pass is the created component’s input name.', ar:'ميثود في <code>ComponentRef</code>. النص اللي بتبعته هو اسم الـ input في الـ component اللي اتعمل.' } },
      { n:'instance', k:'ng', w:{ en:'<code>ComponentRef</code>’s property: the component object itself.', ar:'property في <code>ComponentRef</code>: الـ component نفسه.' } },
      { n:'destroy', k:'ng', w:{ en:'<code>ComponentRef</code>’s method that removes the component.', ar:'ميثود في <code>ComponentRef</code> بتشيل الـ component.' } },
      { n:'subscribe', k:'ng', w:{ en:'The output’s method to listen from code.', ar:'ميثود الـ output عشان تسمعه من الكود.' } },
      { n:'ComponentFactoryResolver', k:'ng', w:{ en:'The older Angular service you no longer need.', ar:'السيرفس القديمة بتاعة أنجولار اللي مبقتش محتاجها.' } },
      { n:'resolveComponentFactory', k:'ng', w:{ en:'Its method.', ar:'الميثود بتاعتها.' } },
      { n:'Type', k:'ng', w:{ en:'Angular’s type for “a component class”.', ar:'النوع بتاع أنجولار اللي معناه «كلاس component».' } },
      { n:'Record', k:'ng', w:{ en:'A TypeScript built-in type.', ar:'نوع جاهز في TypeScript.' } },
      { n:'Promise', k:'ng', w:{ en:'JavaScript’s type for a value that arrives later.', ar:'النوع بتاع JavaScript لقيمة هتيجي بعدين.' } },
      { n:'then', k:'ng', w:{ en:'The Promise method that runs once the file has loaded.', ar:'ميثود الـ Promise اللي بتشتغل أول ما الملف يتحمّل.' } },
      { n:'input', k:'ng', re:'(?<![\\w$<(-])input(?=[.(<,])', w:{ en:'Angular’s function that creates an input.', ar:'الـ function بتاعة أنجولار اللي بتعمل input.' } },
      { n:'required', k:'ng', w:{ en:'Part of <code>input.required</code> and <code>viewChild.required</code>.', ar:'جزء من <code>input.required</code> و<code>viewChild.required</code>.' } },
      { n:'alias', k:'ng', w:{ en:'An input option key. The string you give it is yours.', ar:'مفتاح إعداد في الـ input. النص اللي بتديهوله بتاعك.' } },
      { n:'output', k:'ng', w:{ en:'Angular’s function that creates an output.', ar:'الـ function بتاعة أنجولار اللي بتعمل output.' } },
      { n:'emit', k:'ng', w:{ en:'The output method that fires it.', ar:'ميثود الـ output اللي بتطلّعه.' } },
      { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
      { n:'computed', k:'ng', w:{ en:'Angular’s derived signal.', ar:'الـ signal المشتقة بتاعة أنجولار.' } },
      { n:'effect', k:'ng', w:{ en:'Angular’s function that re-runs when a signal it read changes.', ar:'الـ function بتاعة أنجولار اللي بتشتغل تاني لما signal قرتها تتغير.' } },
      { n:'set', k:'ng', w:{ en:'A signal method.', ar:'ميثود في الـ signal.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator.', ar:'الـ decorator بتاع أنجولار.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The string after it is yours.', ar:'مفتاح إعداد. النص اللي بعده بتاعك.' } },
      { n:'template', k:'ng', w:{ en:'An option key: the inline template.', ar:'مفتاح إعداد: التمبلت في نفس الملف.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key.', ar:'مفتاح إعداد.' } },
      { n:'imports', k:'ng', w:{ en:'An option key: what the template uses.', ar:'مفتاح إعداد: الحاجات اللي التمبلت بيستخدمها.' } },
      { n:'click', k:'ng', w:{ en:'The browser’s event name.', ar:'اسم الـ event بتاع المتصفح.' } },
      { n:'crypto', k:'ng', w:{ en:'The browser’s crypto object.', ar:'الـ object بتاع الـ crypto في المتصفح.' } },
      { n:'randomUUID', k:'ng', w:{ en:'The browser’s function for a unique id.', ar:'function المتصفح اللي بتعمل id فريد.' } },
      { n:'@if', k:'ng', w:{ en:'Angular’s condition block.', ar:'بلوك الشرط بتاع أنجولار.' } },
      { n:'@else', k:'ng', w:{ en:'Part of <code>@if</code>.', ar:'جزء من <code>@if</code>.' } },
      { n:'@for', k:'ng', w:{ en:'Angular’s loop block.', ar:'بلوك اللوب بتاع أنجولار.' } },
      { n:'track', k:'ng', w:{ en:'Part of <code>@for</code>.', ar:'جزء من <code>@for</code>.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'From a string to a widget, six stops', ar: 'من نص لـ widget، ست محطات' },
    lead: {
      en: 'A dashboard. The server sends a list of widgets, each with a <code>type</code> such as <code>\'chart\'</code>. The dashboard template does not know which widgets exist. Follow one of them from data to screen:',
      ar: 'داشبورد. السيرفر بيبعت ليستة widgets، كل واحد ليه <code>type</code> زي <code>\'chart\'</code>. وتمبلت الداشبورد مايعرفش أنهي widgets موجودة. امشي ورا واحد منهم من الداتا لحد الشاشة:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'dashboard.ts', lang: 'ts', who: { en: 'dashboard · the data', ar: 'الداشبورد · الداتا' },
          code: ["{ id: 'w1', type: 'chart', title: 'Sales' },"],
          say: { en: `One widget, as the server describes it. ${pub('type')} is a field you (and the server) named. Its value ${pub('chart')} is just a string, but it is about to be used as a <b>name</b>.`,
                 ar: `widget واحد، زي ما السيرفر بيوصفه. ${pub('type')} field انت (والسيرفر) سمّيتوه. والقيمة بتاعته ${pub('chart')} مجرد نص، بس هيتستخدم دلوقتي كـ <b>اسم</b>.` } },
        { file: 'dashboard.html', lang: 'html', who: { en: 'dashboard · one host each', ar: 'الداشبورد · host لكل واحد' },
          code: ['<app-widget-host [widget]="w" />'],
          say: { en: `The dashboard only knows one component: the host. ${pub('app-widget-host')} and its input ${pub('widget')} are ordinary, compile-checked names.`,
                 ar: `الداشبورد يعرف component واحد بس: الـ host. و${pub('app-widget-host')} والـ input بتاعه ${pub('widget')} أسماء عادية، الـ compiler بيراجعها.` } },
        { file: 'widget-host.ts', lang: 'ts', who: { en: 'host · looks it up', ar: 'الـ host · بيدوّر عليه' },
          code: ['const load = WIDGETS[this.widget().type];', 'this.cmp.set(load ? await load() : null);'],
          say: { en: `The string becomes a lookup key into ${pub('WIDGETS')}. ${mine('load')} and ${mine('cmp')} are the host’s own names. If no key matches, ${mine('load')} is <code>undefined</code> and nothing is shown. No error.`,
                 ar: `النص بيبقى مفتاح تدوّر بيه في ${pub('WIDGETS')}. و${mine('load')} و${mine('cmp')} أسماء الـ host نفسه. لو مفيش مفتاح مطابق، ${mine('load')} بتبقى <code>undefined</code> ومفيش حاجة بتظهر. من غير error.` } },
        { file: 'widget.registry.ts', lang: 'ts', who: { en: 'registry · string to class', ar: 'الـ registry · من نص لكلاس' },
          code: ["chart: () => import('./widgets/chart').then(m => m.ChartWidget),"],
          say: { en: `The key ${pub('chart')} must be spelled exactly like the server’s string. ${pub('ChartWidget')} must be exactly the name the file exports. ${ng('then')} is JavaScript’s, ${mine('m')} is yours.`,
                 ar: `المفتاح ${pub('chart')} لازم يتكتب بالظبط زي نص السيرفر. و${pub('ChartWidget')} لازم يبقى بالظبط الاسم اللي الملف بيعمله export. و${ng('then')} بتاعة JavaScript، و${mine('m')} بتاعك.` } },
        { file: 'widget-host.ts', lang: 'ts', who: { en: 'host · renders it', ar: 'الـ host · بيرسمه' },
          code: ['<ng-container *ngComponentOutlet="c; inputs: inputs()" />', '', 'protected readonly inputs = computed(() => ({ config: this.widget() }));'],
          say: { en: `${ng('ngComponentOutlet')} and its key ${ng('inputs:')} are Angular’s. The value after it, ${mine('inputs')}, is your computed. Inside it, the key ${pub('config')} must be the <b>widget’s</b> input name. It is only an object key, so the compiler cannot check it.`,
                 ar: `${ng('ngComponentOutlet')} والمفتاح بتاعه ${ng('inputs:')} بتوع أنجولار. والقيمة اللي بعده، ${mine('inputs')}، الـ computed بتاعتك. وجواها، المفتاح ${pub('config')} لازم يبقى اسم الـ input بتاع <b>الـ widget</b>. وهو مجرد مفتاح object، فالـ compiler مايقدرش يراجعه.` } },
        { file: 'widgets/chart.ts', lang: 'ts', who: { en: 'widget · receives', ar: 'الـ widget · بيستقبل' },
          code: ['readonly config = input.required<WidgetConfig>();'],
          say: { en: `The created component. Its ${pub('config')} input receives the value. Its selector, ${mine('app-chart-widget')}, is never typed anywhere: nobody writes that tag.`,
                 ar: `الـ component اللي اتعمل. الـ input ${pub('config')} بتاعه بيستقبل القيمة. والـ selector بتاعه، ${mine('app-chart-widget')}، عمره ما بيتكتب في أي حتة: محدش بيكتب التاج ده.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: '<code>type: \'chart\'</code> → <code>WIDGETS[\'chart\']</code> → <code>ChartWidget</code> → <code>{ config: … }</code> → <code>config = input.required()</code>. Three of these links are <b>strings or keys</b>: <code>chart</code>, <code>config</code> and the export name. They are yours, they must match, and only the export name is checked by the compiler.',
        ar: '<code>type: \'chart\'</code> ← <code>WIDGETS[\'chart\']</code> ← <code>ChartWidget</code> ← <code>{ config: … }</code> ← <code>config = input.required()</code>. تلاتة من الحلقات دي <b>نصوص أو مفاتيح</b>: <code>chart</code> و<code>config</code> واسم الـ export. كلهم بتوعك، ولازم يطابقوا، والـ compiler بيراجع اسم الـ export بس.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Host or widget?', ar: 'الـ host ولا الـ widget؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'The widget declares its names. The host and the dashboard repeat them, but as data, not as template syntax.',
      ar: 'الـ widget بيعلن الأسماء بتاعته. والـ host والداشبورد بيكرروها، بس كداتا، مش ككتابة تمبلت.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'], ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>readonly config = input.required()</code>', 'widget', 'widget', `the widget picks ${pub('config')}; host and dashboard copy it as a key or a string`],
            ar: ['<code>readonly config = input.required()</code>', 'الـ widget', 'الـ widget', `الـ widget بيختار ${pub('config')}؛ والـ host والداشبورد بينسخوه كمفتاح أو نص`] },
          { en: ['<code>readonly removed = output()</code>', 'widget', 'widget', `the widget picks ${pub('removed')}; the dashboard copies it`],
            ar: ['<code>readonly removed = output()</code>', 'الـ widget', 'الـ widget', `الـ widget بيختار ${pub('removed')}؛ والداشبورد بينسخه`] },
          { en: ['<code>selector: \'app-chart-widget\'</code>', 'widget', 'widget', `the widget picks ${mine('app-chart-widget')}, and nobody copies it`],
            ar: ['<code>selector: \'app-chart-widget\'</code>', 'الـ widget', 'الـ widget', `الـ widget بيختار ${mine('app-chart-widget')}، ومحدش بينسخه`] },
          { en: ['<code>chart: () =&gt; import(…)</code>', 'registry', 'registry', `you pick ${pub('chart')}, but it must equal the server’s <code>type</code> values`],
            ar: ['<code>chart: () =&gt; import(…)</code>', 'الـ registry', 'الـ registry', `انت بتختار ${pub('chart')}، بس لازم يساوي قيم الـ <code>type</code> اللي من السيرفر`] },
          { en: ['<code>*ngComponentOutlet="c; inputs: inputs()"</code>', 'host', 'host', `${ng('ngComponentOutlet')} and ${ng('inputs:')} are Angular’s; ${mine('c')} and ${mine('inputs')} are the host’s`],
            ar: ['<code>*ngComponentOutlet="c; inputs: inputs()"</code>', 'الـ host', 'الـ host', `${ng('ngComponentOutlet')} و${ng('inputs:')} بتوع أنجولار؛ و${mine('c')} و${mine('inputs')} بتوع الـ host`] },
          { en: ['<code>ref.setInput(\'config\', …)</code>', 'dashboard', 'dashboard', `${ng('setInput')} is Angular’s; the string copies the widget’s ${pub('config')}`],
            ar: ['<code>ref.setInput(\'config\', …)</code>', 'الداشبورد', 'الداشبورد', `${ng('setInput')} بتاعة أنجولار؛ والنص بينسخ ${pub('config')} بتاع الـ widget`] },
          { en: ['<code>&lt;ng-container #anchor /&gt;</code> + <code>viewChild.required(\'anchor\', …)</code>', 'dashboard', 'dashboard', `you pick ${mine('#anchor')}, twice, identically`],
            ar: ['<code>&lt;ng-container #anchor /&gt;</code> + <code>viewChild.required(\'anchor\', …)</code>', 'الداشبورد', 'الداشبورد', `انت بتختار ${mine('#anchor')}، مرتين، بنفس الشكل`] },
        ] },
      { t: 'ul',
        en: ['<b>The widget never knows who created it.</b> It declares an input and an output like any component. Being created dynamically does not change how you write it.',
             '<b>In a template, a wrong name is a compile error. In code, it is often just a string.</b> <code>[config]="…"</code> would be checked. <code>{ config: … }</code> and <code>setInput(\'config\', …)</code> are not.',
             '<b><code>NgComponentOutlet</code> can pass inputs but cannot listen to outputs.</b> When you need <code>removed</code>, create the widget yourself with <code>ViewContainerRef</code> and subscribe on <code>ref.instance</code>.'],
        ar: ['<b>الـ widget عمره ما بيعرف مين اللي عمله.</b> بيعلن input وoutput زي أي component. وإنه بيتعمل dynamic مش بيغيّر طريقة كتابته.',
             '<b>في التمبلت، الاسم الغلط compile error. في الكود، غالبًا مجرد نص.</b> <code>[config]="…"</code> كانت هتتراجع. لكن <code>{ config: … }</code> و<code>setInput(\'config\', …)</code> لأ.',
             '<b><code>NgComponentOutlet</code> بيقدر يبعت inputs بس مايقدرش يسمع outputs.</b> لما تحتاج <code>removed</code>، اعمل الـ widget بنفسك بـ <code>ViewContainerRef</code> واعمل subscribe على <code>ref.instance</code>.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All six files, every name coloured', ar: 'الست ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same dashboard, complete: widgets chosen by data through <code>NgComponentOutlet</code>, plus an “Add chart” button that creates one by hand with <code>ViewContainerRef</code>. Hover <code>config</code> to see the three different ways it is spelled.',
      ar: 'نفس الداشبورد، كامل: widgets بتتختار من الداتا عن طريق <code>NgComponentOutlet</code>، وزرار «Add chart» بيعمل واحد بإيده بـ <code>ViewContainerRef</code>. قف بالماوس على <code>config</code> عشان تشوف التلات أشكال اللي بيتكتب بيها.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'widget-config.ts', lang: 'ts', tag: { en: 'the data', ar: 'الداتا' }, code: [
        'export interface WidgetConfig {',
        '  id: string;',
        '  type: string;',
        '  title: string;',
        '}' ] },
      { t: 'code', name: 'widgets/chart.ts', lang: 'ts', tag: { en: 'the created component', ar: 'الـ component اللي بيتعمل' }, code: [
        "import { Component, input, output } from '@angular/core';",
        "import { WidgetConfig } from '../widget-config';",
        '',
        '@Component({',
        "  selector: 'app-chart-widget',",
        '  template: `',
        '    <h3>{{ config().title }}</h3>',
        '    <button (click)="removed.emit(config().id)">Remove</button>',
        '  `,',
        '})',
        'export class ChartWidget {',
        '  readonly config = input.required<WidgetConfig>();',
        '  readonly removed = output<string>();',
        '}' ] },
      { t: 'code', name: 'widget.registry.ts', lang: 'ts', tag: { en: 'string → class', ar: 'نص ← كلاس' }, code: [
        "import { Type } from '@angular/core';",
        '',
        'export const WIDGETS: Record<string, () => Promise<Type<unknown>>> = {',
        "  chart: () => import('./widgets/chart').then(m => m.ChartWidget),",
        "  metric: () => import('./widgets/metric').then(m => m.MetricWidget),",
        '};' ] },
      { t: 'code', name: 'widget-host.ts', lang: 'ts', tag: { en: 'the easy way', ar: 'الطريقة السهلة' }, code: [
        "import { Component, Type, computed, effect, input, signal } from '@angular/core';",
        "import { NgComponentOutlet } from '@angular/common';",
        "import { WIDGETS } from './widget.registry';",
        "import { WidgetConfig } from './widget-config';",
        '',
        '@Component({',
        "  selector: 'app-widget-host',",
        '  imports: [NgComponentOutlet],',
        '  template: `',
        '    @if (cmp(); as c) {',
        '      <ng-container *ngComponentOutlet="c; inputs: inputs()" />',
        '    } @else {',
        '      <p>Loading…</p>',
        '    }',
        '  `,',
        '})',
        'export class WidgetHost {',
        '  readonly widget = input.required<WidgetConfig>();',
        '',
        '  protected readonly cmp = signal<Type<unknown> | null>(null);',
        '  protected readonly inputs = computed(() => ({ config: this.widget() }));',
        '',
        '  constructor() {',
        '    effect(async () => {',
        '      const load = WIDGETS[this.widget().type];',
        '      this.cmp.set(load ? await load() : null);',
        '    });',
        '  }',
        '}' ] },
      { t: 'code', name: 'dashboard.ts', lang: 'ts', tag: { en: 'the page', ar: 'الصفحة' }, code: [
        "import { Component, ViewContainerRef, signal, viewChild } from '@angular/core';",
        "import { WidgetHost } from './widget-host';",
        "import { WidgetConfig } from './widget-config';",
        '',
        '@Component({',
        "  selector: 'app-dashboard',",
        '  imports: [WidgetHost],',
        "  templateUrl: './dashboard.html',",
        '})',
        'export class Dashboard {',
        '  protected readonly layout = signal<WidgetConfig[]>([',
        "    { id: 'w1', type: 'chart', title: 'Sales' },",
        "    { id: 'w2', type: 'metric', title: 'Visitors' },",
        '  ]);',
        '',
        "  private readonly slot = viewChild.required('anchor', { read: ViewContainerRef });",
        '',
        '  // the hard way: create one by hand, because we need its output',
        '  protected async addChart() {',
        "    const { ChartWidget } = await import('./widgets/chart');",
        '    const ref = this.slot().createComponent(ChartWidget);',
        "    ref.setInput('config', { id: crypto.randomUUID(), type: 'chart', title: 'New chart' });",
        '    ref.instance.removed.subscribe(() => ref.destroy());',
        '  }',
        '}' ] },
      { t: 'code', name: 'dashboard.html', lang: 'html', tag: { en: 'the page', ar: 'الصفحة' }, code: [
        '<button (click)="addChart()">Add chart</button>',
        '',
        '@for (w of layout(); track w.id) {',
        '  <app-widget-host [widget]="w" />',
        '}',
        '',
        '<ng-container #anchor />' ] },
      { t: 'nmtable' }
    ]
  },

  /* ------------------------------------------------------------ 4 */
  {
    id: 'rename',
    kicker: { en: 'Is it OK to change it?', ar: 'ينفع أغيّره؟' },
    title: { en: 'What breaks when you rename each name', ar: 'إيه اللي بيبوظ لما تغيّر كل اسم' },
    lead: {
      en: 'Here the answer depends on how a name travels. As a class, a field or a template binding, the compiler follows it. As a string or an object key, it does not.',
      ar: 'هنا الإجابة على حسب الاسم بيتنقل إزاي. ككلاس أو field أو binding في تمبلت، الـ compiler بيتابعه. كنص أو مفتاح object، لأ.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'], ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [pub('chart') + ' (registry key)', 'every <code>type</code> value in the data, and the server', '<b>No error.</b> The lookup finds nothing and the host shows “Loading…” forever.'],
            ar: [pub('chart') + ' (مفتاح في الـ registry)', 'كل قيمة <code>type</code> في الداتا، والسيرفر', '<b>مفيش error.</b> الـ lookup مابيلاقيش حاجة والـ host بيفضل يقول «Loading…» على طول.'] },
          { en: [pub('config') + ' (the widget’s input)', 'the host’s <code>{ config: … }</code> and every <code>setInput(\'config\', …)</code>', '<b>No compile error.</b> In development Angular logs that it cannot set the input, and the widget then fails when it reads its required input.'],
            ar: [pub('config') + ' (الـ input بتاع الـ widget)', '<code>{ config: … }</code> في الـ host وكل <code>setInput(\'config\', …)</code>', '<b>مفيش compile error.</b> في الـ development أنجولار بيكتب إنه مش قادر يحط الـ input، وبعدين الـ widget بيفشل لما يقرا الـ input المطلوب بتاعه.'] },
          { en: [pub('ChartWidget') + ' (the export)', '<code>m.ChartWidget</code> and <code>{ ChartWidget }</code>', 'Compile error: TypeScript knows what the file exports.'],
            ar: [pub('ChartWidget') + ' (الـ export)', '<code>m.ChartWidget</code> و<code>{ ChartWidget }</code>', 'Compile error: TypeScript عارف الملف بيعمل export لإيه.'] },
          { en: [pub('removed') + ' (the widget’s output)', '<code>ref.instance.removed</code>', 'Compile error: <code>ref</code> is typed with the widget’s class.'],
            ar: [pub('removed') + ' (الـ output بتاع الـ widget)', '<code>ref.instance.removed</code>', 'Compile error: <code>ref</code> متعرّف بنوع كلاس الـ widget.'] },
          { en: [`${pub('widget')}, ${pub('app-widget-host')}, ${pub('WidgetHost')}`, 'the dashboard’s template and <code>imports</code>', 'Compile error: these travel through a normal template.'],
            ar: [`${pub('widget')} و${pub('app-widget-host')} و${pub('WidgetHost')}`, 'تمبلت الداشبورد و<code>imports</code>', 'Compile error: دول بيتنقلوا عن طريق تمبلت عادي.'] },
          { en: [mine('#anchor'), 'the <code>\'anchor\'</code> string in <code>viewChild.required</code>', '<b>Runtime error</b> when you click “Add chart”: the required query found nothing.'],
            ar: [mine('#anchor'), 'النص <code>\'anchor\'</code> في <code>viewChild.required</code>', '<b>Runtime error</b> لما تدوس «Add chart»: الـ query المطلوبة مالقتش حاجة.'] },
          { en: [mine('app-chart-widget'), 'nothing', 'Nothing breaks. Nobody types this tag.'],
            ar: [mine('app-chart-widget'), 'ولا حاجة', 'مفيش حاجة بتبوظ. محدش بيكتب التاج ده.'] },
          { en: [`${mine('cmp')}, ${mine('inputs')}, ${mine('slot')}, ${mine('ref')}, ${mine('load')}, ${mine('m')}`, 'only inside their own component or line', 'Compile error right there.'],
            ar: [`${mine('cmp')} و${mine('inputs')} و${mine('slot')} و${mine('ref')} و${mine('load')} و${mine('m')}`, 'جوه الـ component أو السطر بتاعهم بس', 'Compile error في نفس المكان.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b>. <code>chart</code> changes in the registry <b>and</b> in the data, and <code>config</code> changes as a property, a key and a string. That is how many places you have to find by hand.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b>. <code>chart</code> بتتغير في الـ registry <b>و</b>في الداتا، و<code>config</code> بتتغير كـ property وكمفتاح وكنص. ده عدد الأماكن اللي لازم تلاقيها بإيدك.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتوعك' },
    title: { en: 'Angular’s words for creating components', ar: 'كلمات أنجولار لعمل الـ components' },
    lead: {
      en: 'Two small vocabularies: one for the template (<code>NgComponentOutlet</code>) and one for code (<code>ViewContainerRef</code> and <code>ComponentRef</code>).',
      ar: 'قاموسين صغيرين: واحد للتمبلت (<code>NgComponentOutlet</code>) وواحد للكود (<code>ViewContainerRef</code> و<code>ComponentRef</code>).'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Name', 'Owner', 'What it does'], ar: ['الاسم', 'صاحبه', 'بيعمل إيه'] },
        rows: [
          { en: [`${ng('NgComponentOutlet')} / ${ng('ngComponentOutlet')}`, 'Angular', 'The class you import, and the same directive as written in a template.'],
            ar: [`${ng('NgComponentOutlet')} / ${ng('ngComponentOutlet')}`, 'أنجولار', 'الكلاس اللي بتعمله import، ونفس الـ directive بالشكل اللي بيتكتب في التمبلت.'] },
          { en: [ng('inputs:'), 'Angular', 'The outlet’s option key. The value after the colon is yours.'],
            ar: [ng('inputs:'), 'أنجولار', 'مفتاح إعداد الـ outlet. والقيمة اللي بعد النقطتين بتاعتك.'] },
          { en: [`${ng('ViewContainerRef')}, ${ng('createComponent')}`, 'Angular', 'A place to insert components, and the method that inserts one.'],
            ar: [`${ng('ViewContainerRef')} و${ng('createComponent')}`, 'أنجولار', 'مكان تحط فيه components، والميثود اللي بتحط واحد.'] },
          { en: [`${ng('setInput')}, ${ng('instance')}, ${ng('destroy')}`, 'Angular', 'What a <code>ComponentRef</code> offers: set an input, reach the object, remove it.'],
            ar: [`${ng('setInput')} و${ng('instance')} و${ng('destroy')}`, 'أنجولار', 'اللي الـ <code>ComponentRef</code> بيقدّمه: تحط input، توصل للـ object، تشيله.'] },
          { en: [`${ng('viewChild')}, ${ng('read')}`, 'Angular', 'Find <code>#anchor</code>, and ask for it as a <code>ViewContainerRef</code>.'],
            ar: [`${ng('viewChild')} و${ng('read')}`, 'أنجولار', 'دوّر على <code>#anchor</code>، واطلبه كـ <code>ViewContainerRef</code>.'] },
          { en: [`${ng('Type')}, ${ng('Record')}, ${ng('Promise')}, ${ng('then')}`, 'Angular, TypeScript, JavaScript', 'Types for “a class” and “a lookup table”, and the dynamic import’s promise.'],
            ar: [`${ng('Type')} و${ng('Record')} و${ng('Promise')} و${ng('then')}`, 'أنجولار وTypeScript وJavaScript', 'أنواع لـ «كلاس» و«جدول بحث»، والـ promise بتاع الـ import الديناميكي.'] },
        ] },
      { t: 'p',
        en: 'The <code>\'./widgets/chart\'</code> inside <code>import(…)</code> is not a name at all: it is a file path. Move or rename the file and the path must follow, and the compiler will tell you if it does not.',
        ar: 'الـ <code>\'./widgets/chart\'</code> اللي جوه <code>import(…)</code> مش اسم أصلًا: ده مسار ملف. لو نقلت الملف أو غيّرت اسمه لازم المسار يتغير وراه، والـ compiler هيقولك لو ماتغيّرش.' }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'Because the compiler cannot check some links, good names here are about making a mismatch easy to spot by eye.',
      ar: 'عشان الـ compiler مايقدرش يراجع شوية روابط، الأسماء الكويسة هنا هدفها إن عدم التطابق يبان بالعين بسهولة.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['registry keys', 'exactly the server’s values: <code>chart</code>, <code>metric</code>', '<code>Chart</code>, <code>chartWidget</code>', 'The key is compared to a string from outside. Copy it, do not translate it.'],
            ar: ['مفاتيح الـ registry', 'قيم السيرفر بالظبط: <code>chart</code> و<code>metric</code>', '<code>Chart</code> و<code>chartWidget</code>', 'المفتاح بيتقارن بنص جاي من برّه. انسخه، متترجموش.'] },
          { en: ['the registry constant', '<code>WIDGETS</code>', '<code>map</code>, <code>data</code>', 'Upper case is a common habit for a fixed lookup table.'],
            ar: ['الـ constant بتاع الـ registry', '<code>WIDGETS</code>', '<code>map</code> و<code>data</code>', 'الحروف الكابيتال عادة منتشرة لجدول بحث ثابت.'] },
          { en: ['widget classes', '<code>ChartWidget</code>, <code>MetricWidget</code>', '<code>Chart</code>, <code>ChartComponent2</code>', 'One suffix for everything the registry can create.'],
            ar: ['كلاسات الـ widgets', '<code>ChartWidget</code> و<code>MetricWidget</code>', '<code>Chart</code> و<code>ChartComponent2</code>', 'لاحقة واحدة لكل حاجة الـ registry يقدر يعملها.'] },
          { en: ['inputs of created components', 'one shared name, e.g. <code>config</code> on every widget', 'a different input name per widget', 'Then one inputs object fits every widget the host might create.'],
            ar: ['inputs الـ components اللي بتتعمل', 'اسم واحد متشارك، زي <code>config</code> في كل widget', 'اسم input مختلف لكل widget', 'ساعتها object inputs واحد ينفع لأي widget الـ host ممكن يعمله.'] },
          { en: ['the anchor', '<code>#anchor</code>, <code>#slot</code>', '<code>#vc</code>, <code>#x</code>', 'It marks a place on the page; name the place.'],
            ar: ['الـ anchor', '<code>#anchor</code> و<code>#slot</code>', '<code>#vc</code> و<code>#x</code>', 'ده بيعلّم مكان في الصفحة؛ سمّي المكان.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Strings that must equal a name', ar: 'نصوص لازم تساوي اسم' },
    lead: {
      en: 'Three strings on this page look free. Each one is actually a copy of a name declared somewhere else.',
      ar: 'فيه تلات نصوص في الصفحة دي شكلهم براحتك. كل واحد فيهم في الحقيقة نسخة من اسم متعلن في مكان تاني.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'An input name is the <b>public</b> name', ar: 'اسم الـ input هو الاسم الـ <b>public</b>' }, blocks: [
        { t: 'code', name: 'widgets/chart.ts · with alias', lang: 'ts', tag: { en: 'widget', ar: 'الـ widget' }, code: [
          "readonly config = input.required<WidgetConfig>({ alias: 'settings' });" ] },
        { t: 'code', name: 'dashboard.ts · with alias', lang: 'ts', tag: { en: 'dashboard', ar: 'الداشبورد' }, code: [
          "ref.setInput('settings', { id: crypto.randomUUID(), type: 'chart', title: 'New chart' });" ] },
        { t: 'p', en: `With an ${ng('alias')}, the outside world uses the alias. <code>setInput</code> and the outlet’s inputs object must use <code>settings</code>, not ${pub('config')}. Inside the widget it is still called ${pub('config')}.`,
                  ar: `مع ${ng('alias')}، العالم اللي برّه بيستخدم الـ alias. <code>setInput</code> وobject الـ inputs بتاع الـ outlet لازم يستخدموا <code>settings</code>، مش ${pub('config')}. وجوه الـ widget لسه اسمه ${pub('config')}.` }
      ]},
      { t: 'step', n: 'B', title: { en: 'The query string is the template reference', ar: 'نص الـ query هو الـ template reference' }, blocks: [
        { t: 'code', name: 'dashboard.ts · the query', lang: 'ts', tag: { en: 'must match #anchor', ar: 'لازم يطابق #anchor' }, code: [
          "private readonly slot = viewChild.required('anchor', { read: ViewContainerRef });" ] },
        { t: 'p', en: `The string <code>'anchor'</code> is not a label you invent here; it points at ${mine('#anchor')} in the template. ${ng('read')} is Angular’s key. Without it you would get the element, not the container, and <code>createComponent</code> would not exist on it (a compile error).`,
                  ar: `النص <code>'anchor'</code> مش اسم بتخترعه هنا؛ ده بيشاور على ${mine('#anchor')} اللي في التمبلت. و${ng('read')} مفتاح أنجولار. من غيره هتاخد الـ element مش الـ container، و<code>createComponent</code> مش هتبقى موجودة عليه (compile error).` }
      ]},
      { t: 'step', n: 'C', title: { en: 'The export name is the module’s', ar: 'اسم الـ export بتاع الـ module' }, blocks: [
        { t: 'p', en: `In <code>.then(m =&gt; m.ChartWidget)</code> you pick ${mine('m')}, but ${pub('ChartWidget')} must be exactly what <code>widgets/chart.ts</code> exports. This one is safe: the dynamic import is typed, so a typo is a compile error.`,
                  ar: `في <code>.then(m =&gt; m.ChartWidget)</code> انت بتختار ${mine('m')}، بس ${pub('ChartWidget')} لازم يبقى بالظبط اللي <code>widgets/chart.ts</code> بيعمله export. ودي آمنة: الـ import الديناميكي ليه types، فالغلطة الإملائية compile error.` }
      ]},
      { t: 'note', label: { en: 'Newer API, same rule', ar: 'API أحدث، نفس القاعدة' },
        en: 'Angular 20 added <code>bindings</code> to <code>createComponent</code>, with helpers such as <code>inputBinding(\'config\', …)</code> and <code>outputBinding(\'removed\', …)</code>. The input and output names are still strings that must match the widget.',
        ar: 'أنجولار 20 ضاف <code>bindings</code> لـ <code>createComponent</code>، ومعاها helpers زي <code>inputBinding(\'config\', …)</code> و<code>outputBinding(\'removed\', …)</code>. أسماء الـ input والـ output لسه نصوص لازم تطابق الـ widget.' }
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: 'The factory resolver is gone; your names stay', ar: 'الـ factory resolver راح؛ وأسماءك فضلت' },
    lead: {
      en: 'Older tutorials use a decorator query and a <code>ComponentFactoryResolver</code>. Since Angular 13 you can pass the class straight to <code>createComponent</code>. Your names, <code>#anchor</code>, <code>config</code> and <code>removed</code>, do not change.',
      ar: 'الشروحات القديمة بتستخدم query بـ decorator و<code>ComponentFactoryResolver</code>. من أنجولار 13 تقدر تبعت الكلاس على طول لـ <code>createComponent</code>. وأسماءك، <code>#anchor</code> و<code>config</code> و<code>removed</code>، مابتتغيرش.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'dashboard.ts — older style', lang: 'ts', code: [
          "@ViewChild('anchor', { read: ViewContainerRef }) slot!: ViewContainerRef;",
          '',
          'constructor(private resolver: ComponentFactoryResolver) {}',
          '',
          'addChart() {',
          '  const factory = this.resolver.resolveComponentFactory(ChartWidget);',
          '  const ref = this.slot.createComponent(factory);',
          "  ref.setInput('config', { id: 'w3', type: 'chart', title: 'New chart' });",
          '}' ] },
        good: { name: 'dashboard.ts — today', lang: 'ts', code: [
          "private readonly slot = viewChild.required('anchor', { read: ViewContainerRef });",
          '',
          '',
          '',
          'addChart() {',
          '',
          '  const ref = this.slot().createComponent(ChartWidget);',
          "  ref.setInput('config', { id: 'w3', type: 'chart', title: 'New chart' });",
          '}' ] } },
      { t: 'p',
        en: `Note the brackets: the old ${ng('@ViewChild')} gives you the container directly (<code>this.slot</code>), the new ${ng('viewChild')} gives you a signal (<code>this.slot()</code>). ${mine('resolver')} and ${mine('factory')} were your names for Angular’s helper; they simply disappear.`,
        ar: `خلي بالك من القوسين: ${ng('@ViewChild')} القديم بيدّيك الـ container على طول (<code>this.slot</code>)، و${ng('viewChild')} الجديد بيدّيك signal (<code>this.slot()</code>). و${mine('resolver')} و${mine('factory')} كانوا أسماءك للـ helper بتاع أنجولار؛ وببساطة اختفوا.` }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, or something strange', ar: 'مش بيعمل حاجة، أو بيعمل حاجة غريبة' },
    title: { en: 'Mistakes that fail silently, or confusingly', ar: 'غلطات بتفشل في صمت، أو بشكل ملخبط' },
    lead: {
      en: 'Dynamic creation trades compile-time checks for flexibility. These are the places where you pay for it.',
      ar: 'الإنشاء الديناميكي بيبدّل مراجعة وقت الـ compile بالمرونة. ودي الأماكن اللي بتدفع فيها التمن.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'A registry key that differs from the server’s type', ar: 'مفتاح registry مختلف عن الـ type بتاع السيرفر' }, blocks: [
        { t: 'pair',
          bad:  { name: 'widget.registry.ts · capital C', lang: 'ts', code: ["Chart: () => import('./widgets/chart').then(m => m.ChartWidget),"] },
          good: { name: 'widget.registry.ts · exact', lang: 'ts', code: ["chart: () => import('./widgets/chart').then(m => m.ChartWidget),"] } },
        { t: 'p', en: 'The server says <code>\'chart\'</code>, the registry says <code>Chart</code>. The lookup returns <code>undefined</code>, the host keeps showing “Loading…”, and nothing is logged. Copy keys from real server data.',
                  ar: 'السيرفر بيقول <code>\'chart\'</code>، والـ registry بيقول <code>Chart</code>. الـ lookup بيرجّع <code>undefined</code>، والـ host بيفضل يعرض «Loading…»، ومفيش حاجة بتتكتب في الـ console. انسخ المفاتيح من داتا السيرفر الحقيقية.' }
      ]},
      { t: 'step', n: '2', title: { en: 'A typo in an input key', ar: 'غلطة إملائية في مفتاح input' }, blocks: [
        { t: 'pair',
          bad:  { name: 'widget-host.ts · typo', lang: 'ts', code: ['protected readonly inputs = computed(() => ({ confg: this.widget() }));'] },
          good: { name: 'widget-host.ts', lang: 'ts', code: ['protected readonly inputs = computed(() => ({ config: this.widget() }));'] } },
        { t: 'p', en: 'No compile error: the inputs object is just an object. At runtime, in development, Angular logs that it cannot set <code>confg</code>, and the widget then throws because its required <code>config</code> never got a value. The error points at the widget, but the mistake is in the host.',
                  ar: 'مفيش compile error: object الـ inputs مجرد object. وقت التشغيل، في الـ development، أنجولار بيكتب إنه مش قادر يحط <code>confg</code>، وبعدين الـ widget بيرمي error عشان الـ <code>config</code> المطلوب عمره ما اخد قيمة. الـ error بيشاور على الـ widget، بس الغلطة في الـ host.' }
      ]},
      { t: 'step', n: '3', title: { en: 'Assigning an input instead of setting it', ar: 'إنك تعمل assign للـ input بدل ما تعمله set' }, blocks: [
        { t: 'pair',
          bad:  { name: 'dashboard.ts · assign', lang: 'ts', code: ["ref.instance.config = { id: 'w3', type: 'chart', title: 'New chart' };"] },
          good: { name: 'dashboard.ts · setInput', lang: 'ts', code: ["ref.setInput('config', { id: 'w3', type: 'chart', title: 'New chart' });"] } },
        { t: 'p', en: 'With <code>input()</code> this does not compile: <code>config</code> is a read-only signal, not a plain field. With an older <code>@Input()</code> field it compiles, but Angular is not told, so an <code>OnPush</code> widget may not update and <code>ngOnChanges</code> does not run. Always use <code>setInput</code>.',
                  ar: 'مع <code>input()</code> ده مش بيعمل compile: <code>config</code> signal للقراية بس، مش field عادي. ومع field قديم بـ <code>@Input()</code> بيعمل compile، بس أنجولار مش بيعرف، فالـ widget اللي <code>OnPush</code> ممكن مايتحدثش و<code>ngOnChanges</code> مش بتشتغل. دايمًا استخدم <code>setInput</code>.' }
      ]},
      { t: 'step', n: '4', title: { en: 'Listening, but never removing', ar: 'إنك تسمع، بس عمرك ما تشيل' }, blocks: [
        { t: 'pair',
          bad:  { name: 'dashboard.ts · stays', lang: 'ts', code: ["ref.instance.removed.subscribe(id => console.log('removed', id));"] },
          good: { name: 'dashboard.ts · goes', lang: 'ts', code: ['ref.instance.removed.subscribe(() => ref.destroy());'] } },
        { t: 'p', en: 'A component you created by hand stays until you call <code>destroy()</code> (or clear the container), or until the dashboard itself goes away. Clicking “Remove” only emits an event. If nothing destroys the ref, the widget stays on screen.',
                  ar: 'الـ component اللي عملته بإيدك بيفضل موجود لحد ما تنادي <code>destroy()</code> (أو تفضّي الـ container)، أو لحد ما الداشبورد نفسه يمشي. دوسة «Remove» بتطلّع event وبس. لو مفيش حاجة بتعمل destroy للـ ref، الـ widget بيفضل على الشاشة.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it does nothing', ar: 'لما مايعملش حاجة' },
    title: { en: 'Five questions, in this order', ar: 'خمس أسئلة، بالترتيب ده' },
    lead: {
      en: 'The widget never appears, or appears empty. Ask these first.',
      ar: 'الـ widget مش بيظهر، أو بيظهر فاضي. اسأل دول الأول.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Does the <code>type</code> in the data match a registry key exactly, including case? Log <code>this.widget().type</code>.',
                  ar: '<b>1.</b> الـ <code>type</code> اللي في الداتا مطابق لمفتاح في الـ registry بالظبط، حتى الحروف الكابيتال؟ اطبع <code>this.widget().type</code>.' },
      { t: 'chk', en: '<b>2.</b> Does the import resolve to a class? Log what <code>await load()</code> returns.',
                  ar: '<b>2.</b> الـ import بيرجّع كلاس فعلًا؟ اطبع اللي <code>await load()</code> بترجّعه.' },
      { t: 'chk', en: '<b>3.</b> Is there a “Can’t set value of the … input” message in the console? Then a key in <code>inputs</code> or a <code>setInput</code> string does not match the widget’s input (or its alias).',
                  ar: '<b>3.</b> فيه رسالة «Can’t set value of the … input» في الـ console؟ يبقى مفتاح في <code>inputs</code> أو نص في <code>setInput</code> مش مطابق للـ input بتاع الـ widget (أو الـ alias بتاعه).' },
      { t: 'chk', en: '<b>4.</b> Creating by hand: is <code>#anchor</code> in the template, spelled exactly like the <code>viewChild</code> string?',
                  ar: '<b>4.</b> لو بتعمله بإيدك: <code>#anchor</code> موجود في التمبلت، ومكتوب بالظبط زي النص اللي في <code>viewChild</code>؟' },
      { t: 'chk', en: '<b>5.</b> A widget that will not go away: what calls <code>ref.destroy()</code>?',
                  ar: '<b>5.</b> widget مش راضي يمشي: إيه اللي بينادي <code>ref.destroy()</code>؟' }
    ]
  }
  ]
};
