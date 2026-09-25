/* ==================================================================
   Performance, name by name — a companion page after the performance
   topic. One running example (an orders page made fast step by step)
   followed through every file, with every name coloured by who owns
   it. Names list: inline, below.
   ================================================================== */

/* a name in running text, coloured like the code and linked on hover */
const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

/* a trigger word only counts right after "(on", "; on" or "prefetch on" */
const TRIG = w => '(?<=[(;]\\s*(?:prefetch )?on )' + w + '(?![\\w$-])';
const WORKER = ['report.worker.ts', 'orders.ts · with a worker'];

export default {
  topic: 'performance',
  tab: 'Performance, name by name — The Angular Signal',
  title: { en: 'Performance, name by name', ar: 'الأداء، اسم اسم' },
  say: {
    en: 'One slow orders page made fast, followed through every file: a budget, an optimised image, OnPush with a computed total, a tracked list, a deferred chart and a web worker. Every name coloured by who owns it. Most of them turn out to be fixed.',
    ar: 'صفحة طلبات بطيئة واحدة بنخليها سريعة، ماشيين وراها في كل ملف: budget، وصورة متظبطة، وOnPush مع total محسوب بـ computed، وليستة متتبعة، ورسم متأجل، وweb worker. كل اسم ملوّن حسب صاحبه. وأغلبهم طلعوا ثابتين.'
  },
  lead: {
    en: 'Performance work is <b>measure first, then use the right built-in</b>. The confusing part is the names, but in a different way from other topics: almost every word you type here is somebody else’s. <code>budgets</code> and <code>maximumError</code> belong to the CLI, <code>ngSrc</code> and <code>priority</code> to Angular’s image directive, <code>track</code> and <code>OnPush</code> to Angular, <code>postMessage</code> and <code>onmessage</code> to the browser. This page shows which few names are yours, and where a rule quietly picks one for you.',
    ar: 'شغل الأداء هو <b>قيس الأول، وبعدين استخدم الحاجة الجاهزة الصح</b>. اللي بيلخبط هو الأسماء، بس بطريقة مختلفة عن باقي المواضيع: تقريبًا كل كلمة بتكتبها هنا بتاعة حد تاني. <code>budgets</code> و<code>maximumError</code> بتوع الـ CLI، و<code>ngSrc</code> و<code>priority</code> بتوع الـ directive بتاع الصور في أنجولار، و<code>track</code> و<code>OnPush</code> بتوع أنجولار، و<code>postMessage</code> و<code>onmessage</code> بتوع المتصفح. الصفحة دي بتوريك أنهي أسماء قليلة بتاعتك، وفين قاعدة بتختار لك اسم من غير ما تاخد بالك.'
  },

  names: {
    note: {
      en: 'Blue dominates this table, and that is the lesson: performance is mostly choosing the right built-in and typing its words exactly. The orange rows are your data type and the chart component, which other files copy. Watch <code>orders</code>: the one in square brackets is the chart’s input (shared), the one with brackets after it is the page’s signal (private).',
      ar: 'الأزرق هو الغالب في الجدول ده، ودي الفكرة: الأداء أغلبه إنك تختار الحاجة الجاهزة الصح وتكتب كلماتها بالظبط. والصفوف البرتقاني هي نوع الداتا بتاعك والـ component بتاع الرسم، واللي ملفات تانية بتنسخهم. خد بالك من <code>orders</code>: اللي بين أقواس مربعة ده الـ input بتاع الرسم (متشارك)، واللي بعده أقواس مدورة ده الـ signal بتاعة الصفحة (خاصة).'
    },
    names: [
      /* --- shared: another file types it too --- */
      { n:'Order', k:'pub', w:{ en:'Your data type, imported by the page, the chart and the worker.', ar:'نوع الداتا بتاعك، والصفحة والرسم والـ worker بيعملوه import.' } },
      { n:'id', k:'pub', re:'(?<=\\.)id(?![\\w$])|(?<=^  )id(?=:)', not:['json', 'css'],
        w:{ en:'A field of <code>Order</code>. The list tracks rows by it, so it must be unique.', ar:'field في <code>Order</code>. الليستة بتتتبع الصفوف بيه، فلازم يبقى مش متكرر.' } },
      { n:'customer', k:'pub', w:{ en:'A field of <code>Order</code>, read by the template.', ar:'field في <code>Order</code>، والتمبلت بيقراه.' } },
      { n:'placedAt', k:'pub', w:{ en:'A field of <code>Order</code>, formatted by the <code>date</code> pipe.', ar:'field في <code>Order</code>، والـ pipe <code>date</code> بيظبط شكله.' } },
      { n:'amount', k:'pub', w:{ en:'A field of <code>Order</code>, summed by the total and the worker.', ar:'field في <code>Order</code>، والـ total والـ worker بيجمعوه.' } },
      { n:'orders', k:'pub', re:'(?<=\\[)orders(?=\\])|(?<=readonly )orders(?= = input)|(?<=\\{\\{ )orders(?=\\(\\)\\.length)',
        w:{ en:'The chart’s input. The page binds <code>[orders]</code>, so the chart and the page change together. Same spelling as the page’s signal, different owner.',
            ar:'الـ input بتاع الرسم. الصفحة بتربط <code>[orders]</code>، فالرسم والصفحة بيتغيروا مع بعض. نفس حروف الـ signal بتاعة الصفحة، بس صاحبه مختلف.' } },
      { n:'SalesChart', k:'pub', w:{ en:'The chart’s class, imported by the page.', ar:'كلاس الرسم، والصفحة بتعمله import.' } },
      { n:'app-sales-chart', k:'pub', w:{ en:'The chart’s selector, typed inside the page’s <code>@defer</code> block.', ar:'الـ selector بتاع الرسم، مكتوب جوه بلوك الـ <code>@defer</code> في الصفحة.' } },
      { n:'Orders', k:'pub', w:{ en:'The page’s class. Whoever routes to it imports it.', ar:'كلاس الصفحة. أي حد بيعمل لها route بيعملها import.' } },
      { n:'app-orders', k:'pub', w:{ en:'The page’s selector.', ar:'الـ selector بتاع الصفحة.' } },

      /* --- yours, private to one file --- */
      { n:'orders', k:'mine', re:'(?<![\\w$/\\[-])orders(?![\\w$\\]-])', not:['sales-chart.ts'],
        w:{ en:'The page’s own signal holding the list. The <code>[orders]</code> on the chart’s tag is the chart’s input, a separate name.',
            ar:'الـ signal بتاعة الصفحة نفسها اللي شايلة الليستة. و<code>[orders]</code> اللي على تاج الرسم ده input الرسم، اسم تاني.' } },
      { n:'total', k:'mine', w:{ en:'The page’s computed signal. Only the page’s template reads it.', ar:'الـ computed signal بتاعة الصفحة. تمبلت الصفحة بس اللي بيقراها.' } },
      { n:'o', k:'mine', only:['ts', 'html'], re:'(?<![\\w$.\'-])o(?![\\w$\'-])', w:{ en:'A loop variable, and separately an arrow-function parameter. Both local.', ar:'متغير لوب، وبرضه parameter في arrow function. الاتنين محليين.' } },
      { n:'sum', k:'mine', w:{ en:'The running total inside <code>reduce</code>. Local.', ar:'المجموع اللي بيتراكم جوه <code>reduce</code>. محلي.' } },
      { n:'chart-skeleton', k:'mine', w:{ en:'Your CSS class, from the page’s own stylesheet.', ar:'كلاس CSS بتاعك، من ملف الـ CSS بتاع الصفحة.' } },
      { n:'list', k:'mine', w:{ en:'The arrow function’s parameter: the current array.', ar:'الـ parameter بتاع الـ arrow function: الـ array الحالية.' } },
      { n:'order', k:'mine', only:['ts'], re:'(?<![\\w$./-])order(?![\\w$-])', w:{ en:'A method parameter: the new order.', ar:'parameter في ميثود: الطلب الجديد.' } },
      { n:'addOrder', k:'mine', w:{ en:'The page’s own method.', ar:'ميثود الصفحة نفسها.' } },
      { n:'getTotal', k:'mine', w:{ en:'A method, the slower alternative to a computed.', ar:'ميثود، البديل الأبطأ للـ computed.' } },
      { n:'trackById', k:'mine', w:{ en:'The older style: your method, named in <code>trackBy</code>.', ar:'الأسلوب القديم: الميثود بتاعتك، مكتوبة في <code>trackBy</code>.' } },
      { n:'index', k:'mine', only:['ts'], w:{ en:'A parameter of the old track function. Unused here, but the position is required.', ar:'parameter في الـ track function القديمة. مش مستخدم هنا، بس مكانه لازم.' } },
      { n:'summarise', k:'mine', w:{ en:'Your function inside the worker file.', ar:'الـ function بتاعتك جوه ملف الـ worker.' } },
      { n:'rows', k:'mine', w:{ en:'Its parameter.', ar:'الـ parameter بتاعها.' } },
      { n:'summary', k:'mine', w:{ en:'A local in the worker, and separately a signal on the page. Unrelated; each is private.', ar:'متغير محلي في الـ worker، وبرضه signal في الصفحة. ملهمش علاقة ببعض؛ كل واحد خاص.' } },
      { n:'runReport', k:'mine', w:{ en:'The page’s method that starts the worker.', ar:'ميثود الصفحة اللي بتشغّل الـ worker.' } },
      { n:'worker', k:'mine', re:'(?<![\\w$./-])worker(?![\\w$-])', only:WORKER, w:{ en:'Your local name for the running worker. The <code>.worker</code> in the file path is a different thing.', ar:'الاسم المحلي بتاعك للـ worker الشغال. و<code>.worker</code> اللي في مسار الملف حاجة تانية.' } },

      /* --- the CLI's --- */
      { n:'configurations', k:'ng', only:['json'], w:{ en:'An <code>angular.json</code> key: one block of options per build configuration.', ar:'مفتاح في <code>angular.json</code>: بلوك إعدادات لكل configuration.' } },
      { n:'production', k:'ng', only:['json'], w:{ en:'The configuration name the CLI creates. <code>ng build</code> uses it by default.', ar:'اسم الـ configuration اللي الـ CLI بيعمله. و<code>ng build</code> بيستخدمه افتراضيًا.' } },
      { n:'budgets', k:'ng', only:['json'], w:{ en:'The <code>angular.json</code> key for size limits.', ar:'مفتاح <code>angular.json</code> لحدود الحجم.' } },
      { n:'type', k:'ng', only:['json'], w:{ en:'A budget key: what is measured.', ar:'مفتاح في الـ budget: إيه اللي بيتقاس.' } },
      { n:'initial', k:'ng', only:['json'], w:{ en:'A budget type: everything downloaded on first load.', ar:'نوع budget: كل اللي بيتنزّل في أول تحميل.' } },
      { n:'anyComponentStyle', k:'ng', only:['json'], w:{ en:'A budget type: the CSS of any single component.', ar:'نوع budget: الـ CSS بتاع أي component لوحده.' } },
      { n:'maximumWarning', k:'ng', only:['json'], w:{ en:'A budget key: warn above this size.', ar:'مفتاح في الـ budget: حذّر لو الحجم عدّى ده.' } },
      { n:'maximumError', k:'ng', only:['json'], w:{ en:'A budget key: fail the build above this size.', ar:'مفتاح في الـ budget: وقّع الـ build لو الحجم عدّى ده.' } },

      /* --- Angular's --- */
      { n:'NgOptimizedImage', k:'ng', w:{ en:'Angular’s image directive. It only applies to <code>&lt;img&gt;</code> tags that use <code>ngSrc</code>.', ar:'الـ directive بتاع الصور في أنجولار. بيشتغل بس على تاجات <code>&lt;img&gt;</code> اللي بتستخدم <code>ngSrc</code>.' } },
      { n:'ngSrc', k:'ng', w:{ en:'Its attribute, used instead of <code>src</code>. Without it the directive does not apply.', ar:'الـ attribute بتاعه، بيتكتب بدل <code>src</code>. من غيره الـ directive مش بيشتغل.' } },
      { n:'width', k:'ng', only:['html'], w:{ en:'The HTML attribute. <code>NgOptimizedImage</code> requires it, so the space is reserved.', ar:'الـ attribute بتاع HTML. <code>NgOptimizedImage</code> بيطلبه، عشان المساحة تتحجز.' } },
      { n:'height', k:'ng', only:['html'], w:{ en:'The HTML attribute, required for the same reason.', ar:'الـ attribute بتاع HTML، مطلوب لنفس السبب.' } },
      { n:'priority', k:'ng', w:{ en:'<code>NgOptimizedImage</code>’s flag for the most important image: load it first, not lazily.', ar:'علامة <code>NgOptimizedImage</code> لأهم صورة: حمّلها الأول، مش lazy.' } },
      { n:'alt', k:'ng', w:{ en:'The HTML attribute for the image’s text alternative.', ar:'الـ attribute بتاع HTML للنص البديل للصورة.' } },
      { n:'changeDetection', k:'ng', w:{ en:'A <code>@Component</code> option key.', ar:'مفتاح إعداد في <code>@Component</code>.' } },
      { n:'ChangeDetectionStrategy', k:'ng', w:{ en:'Angular’s enum of change detection modes.', ar:'الـ enum بتاع أنجولار لأنواع الـ change detection.' } },
      { n:'OnPush', k:'ng', w:{ en:'The mode that re-checks a component only when its inputs, events or signals say so.', ar:'النوع اللي بيعيد فحص الـ component بس لما الـ inputs أو الـ events أو الـ signals بتاعته تقول كده.' } },
      { n:'computed', k:'ng', w:{ en:'Angular’s derived signal, cached until what it reads changes.', ar:'الـ signal المشتقة بتاعة أنجولار، نتيجتها بتتحفظ لحد ما اللي بتقراه يتغير.' } },
      { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
      { n:'set', k:'ng', w:{ en:'A signal method.', ar:'ميثود بتاعة الـ signal.' } },
      { n:'update', k:'ng', w:{ en:'A signal method: compute the new value from the old one.', ar:'ميثود بتاعة الـ signal: احسب القيمة الجديدة من القديمة.' } },
      { n:'input', k:'ng', re:'(?<![\\w$<(-])input(?=[.(<,])', w:{ en:'Angular’s function that creates an input.', ar:'الـ function بتاعة أنجولار اللي بتعمل input.' } },
      { n:'required', k:'ng', w:{ en:'Part of <code>input.required</code>.', ar:'جزء من <code>input.required</code>.' } },
      { n:'@for', k:'ng', w:{ en:'Angular’s loop block.', ar:'بلوك اللوب بتاع أنجولار.' } },
      { n:'track', k:'ng', w:{ en:'Required in <code>@for</code>: how Angular tells rows apart between updates.', ar:'إجباري في <code>@for</code>: أنجولار بيفرّق بين الصفوف بيه بين تحديث والتاني.' } },
      { n:'*ngFor', k:'ng', re:'\\*ngFor', w:{ en:'The older loop directive.', ar:'الـ directive القديم للوب.' } },
      { n:'trackBy', k:'ng', w:{ en:'The older loop’s option, naming your track function.', ar:'اختيار اللوب القديم، بيسمّي الـ track function بتاعتك.' } },
      { n:'@defer', k:'ng', w:{ en:'Angular’s block: load this part’s code later.', ar:'البلوك بتاع أنجولار: حمّل كود الجزء ده بعدين.' } },
      { n:'@placeholder', k:'ng', w:{ en:'Shown until the deferred part loads, and watched by <code>on viewport</code>.', ar:'بيظهر لحد ما الجزء المتأجل يتحمّل، و<code>on viewport</code> بيراقبه.' } },
      { n:'on', k:'ng', re:'(?<=[(;]\\s*(?:prefetch )?)on(?= )', w:{ en:'The keyword that introduces a trigger.', ar:'الكلمة اللي بتبدأ بيها الـ trigger.' } },
      { n:'viewport', k:'ng', re:TRIG('viewport'), w:{ en:'A trigger: when the placeholder scrolls into view.', ar:'trigger: لما الـ placeholder يظهر على الشاشة.' } },
      { n:'idle', k:'ng', re:TRIG('idle'), w:{ en:'A trigger: when the browser is idle.', ar:'trigger: لما المتصفح يفضى.' } },
      { n:'prefetch', k:'ng', re:'(?<=; )prefetch(?= )', w:{ en:'Download early on this trigger, show later on the main one.', ar:'نزّل بدري على الـ trigger ده، واعرض بعدين على الأساسي.' } },
      { n:'date', k:'ng', re:'(?<=\\| )date(?![\\w$-])', w:{ en:'The <b>name</b> of Angular’s date pipe, as typed in templates.', ar:'<b>اسم</b> الـ pipe بتاع التاريخ في أنجولار، زي ما بيتكتب في التمبلتس.' } },
      { n:'DatePipe', k:'ng', w:{ en:'The <b>class</b> of the same pipe, as imported in TypeScript.', ar:'<b>كلاس</b> نفس الـ pipe، زي ما بيتعمله import في TypeScript.' } },
      { n:'currency', k:'ng', re:'(?<=\\| )currency(?![\\w$-])', w:{ en:'The name of Angular’s currency pipe.', ar:'اسم الـ pipe بتاع العملة في أنجولار.' } },
      { n:'CurrencyPipe', k:'ng', w:{ en:'Its class.', ar:'الكلاس بتاعه.' } },
      { n:'medium', k:'ng', re:'(?<=\')medium(?=\')', w:{ en:'A predefined format the <code>date</code> pipe knows.', ar:'شكل جاهز الـ pipe <code>date</code> بيعرفه.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator for a component.', ar:'الـ decorator بتاع أنجولار للـ component.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The string after it is yours.', ar:'مفتاح إعداد. النص اللي بعده بتاعك.' } },
      { n:'imports', k:'ng', w:{ en:'An option key: what this template uses.', ar:'مفتاح إعداد: الحاجات اللي التمبلت ده بيستخدمها.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key.', ar:'مفتاح إعداد.' } },
      { n:'styleUrl', k:'ng', w:{ en:'An option key.', ar:'مفتاح إعداد.' } },
      { n:'template', k:'ng', w:{ en:'An option key: the template, inline.', ar:'مفتاح إعداد: التمبلت، في نفس الملف.' } },

      /* --- JavaScript's and the browser's --- */
      { n:'reduce', k:'ng', w:{ en:'JavaScript’s array method that folds a list into one value.', ar:'ميثود الـ array في JavaScript اللي بتلم الليستة في قيمة واحدة.' } },
      { n:'push', k:'ng', w:{ en:'JavaScript’s array method. It changes the array in place.', ar:'ميثود الـ array في JavaScript. بتغيّر الـ array نفسها.' } },
      { n:'length', k:'ng', w:{ en:'JavaScript’s array property.', ar:'property الـ array في JavaScript.' } },
      { n:'addEventListener', k:'ng', w:{ en:'The browser’s way to listen. Inside a worker it listens for messages from the page.', ar:'طريقة المتصفح للاستماع. جوه الـ worker بيسمع الرسايل اللي جاية من الصفحة.' } },
      { n:'message', k:'ng', re:'(?<=\')message(?=\')', w:{ en:'The browser’s fixed event name for a message arriving.', ar:'اسم الـ event الثابت في المتصفح لما رسالة توصل.' } },
      { n:'data', k:'ng', w:{ en:'The message event’s own property. Destructuring <code>{ data }</code> only works with this exact name.', ar:'property بتاعة الـ message event نفسه. الـ destructuring <code>{ data }</code> بيشتغل بالاسم ده بالظبط بس.' } },
      { n:'postMessage', k:'ng', w:{ en:'The browser’s method that sends a copy of a value to the other side.', ar:'ميثود المتصفح اللي بتبعت نسخة من القيمة للناحية التانية.' } },
      { n:'Worker', k:'ng', w:{ en:'The browser’s class that starts a web worker.', ar:'الكلاس بتاع المتصفح اللي بيشغّل web worker.' } },
      { n:'URL', k:'ng', w:{ en:'The browser’s URL class. Part of the exact shape the bundler looks for.', ar:'كلاس الـ URL بتاع المتصفح. جزء من الشكل بالظبط اللي الـ bundler بيدوّر عليه.' } },
      { n:'import.meta.url', k:'ng', re:'import\\.meta\\.url', w:{ en:'JavaScript’s “the URL of this file”. Part of the same exact shape.', ar:'«الـ URL بتاع الملف ده» في JavaScript. جزء من نفس الشكل.' } },
      { n:'onmessage', k:'ng', w:{ en:'The worker’s property for “a message came back”. All lower case.', ar:'الـ property بتاعة الـ worker لما «رسالة ترجع». كلها حروف صغيرة.' } },
      { n:'terminate', k:'ng', w:{ en:'The worker’s method that stops it.', ar:'الميثود بتاعة الـ worker اللي بتوقّفه.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One slow page, five fixes', ar: 'صفحة بطيئة واحدة، خمس تصليحات' },
    lead: {
      en: 'An orders page: a big banner, a total, a long list and a sales chart. It is slow. Here are the five changes a profile would suggest, in order, and whose names each one uses:',
      ar: 'صفحة طلبات: بانر كبير، وtotal، وليستة طويلة، ورسم للمبيعات. وهي بطيئة. دي الخمس تغييرات اللي القياس هيقترحها، بالترتيب، وأسماء مين كل واحد فيهم بيستخدمها:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'angular.json', lang: 'json', who: { en: 'the build · a limit', ar: 'الـ build · حد' },
          code: ['"budgets": [', '  { "type": "initial", "maximumWarning": "500kB", "maximumError": "1MB" }', ']'],
          say: { en: `Before optimising anything, set a limit so the page cannot get slow again unnoticed. ${ng('budgets')}, ${ng('type')}, ${ng('initial')}, ${ng('maximumWarning')} and ${ng('maximumError')} are all the CLI’s words. Only the numbers are yours.`,
                 ar: `قبل ما تحسّن أي حاجة، حط حد عشان الصفحة متبطأش تاني من غير ما تاخد بالك. ${ng('budgets')} و${ng('type')} و${ng('initial')} و${ng('maximumWarning')} و${ng('maximumError')} كلهم كلمات الـ CLI. الأرقام بس هي اللي بتاعتك.` } },
        { file: 'orders.html', lang: 'html', who: { en: 'page · the banner', ar: 'الصفحة · البانر' },
          code: ['<img ngSrc="/banner.jpg" width="1200" height="300" priority alt="Spring sale" />'],
          say: { en: `The biggest win is usually an image. ${ng('ngSrc')} switches on Angular’s ${ng('NgOptimizedImage')}; ${ng('width')} and ${ng('height')} reserve the space; ${ng('priority')} loads this one first. Every attribute name is fixed. The file path and the numbers are yours.`,
                 ar: `أكبر مكسب غالبًا بيبقى صورة. ${ng('ngSrc')} بيشغّل ${ng('NgOptimizedImage')} بتاع أنجولار؛ و${ng('width')} و${ng('height')} بيحجزوا المساحة؛ و${ng('priority')} بيحمّل الصورة دي الأول. كل أسماء الـ attributes ثابتة. ومسار الملف والأرقام بتوعك.` } },
        { file: 'orders.ts', lang: 'ts', who: { en: 'page · less checking', ar: 'الصفحة · فحص أقل' },
          code: ['changeDetection: ChangeDetectionStrategy.OnPush,', '', 'readonly total = computed(() => this.orders().reduce((sum, o) => sum + o.amount, 0));'],
          say: { en: `${ng('changeDetection')}, ${ng('ChangeDetectionStrategy')} and ${ng('OnPush')} are Angular’s. ${ng('computed')} caches the total until the list changes. ${mine('total')}, ${mine('orders')}, ${mine('sum')} and ${mine('o')} are your names; ${pub('amount')} is a field of your ${pub('Order')} type.`,
                 ar: `${ng('changeDetection')} و${ng('ChangeDetectionStrategy')} و${ng('OnPush')} بتوع أنجولار. و${ng('computed')} بيحفظ الـ total لحد ما الليستة تتغير. و${mine('total')} و${mine('orders')} و${mine('sum')} و${mine('o')} أسماءك؛ و${pub('amount')} field في النوع ${pub('Order')} بتاعك.` } },
        { file: 'orders.html', lang: 'html', who: { en: 'page · the list', ar: 'الصفحة · الليستة' },
          code: ['@for (o of orders(); track o.id) {'],
          say: { en: `${ng('@for')} and ${ng('track')} are Angular’s. ${mine('o')} is your loop variable. ${pub('id')} is a field of your data: <code>track</code> uses it to keep each row’s DOM when the list is refreshed, instead of rebuilding all of them.`,
                 ar: `${ng('@for')} و${ng('track')} بتوع أنجولار. و${mine('o')} متغير اللوب بتاعك. و${pub('id')} field في الداتا بتاعتك: <code>track</code> بيستخدمه عشان يحافظ على الـ DOM بتاع كل صف لما الليستة تتحدث، بدل ما يبني كلهم من الأول.` } },
        { file: 'orders.html', lang: 'html', who: { en: 'page · the chart', ar: 'الصفحة · الرسم' },
          code: ['@defer (on viewport; prefetch on idle) {', '  <app-sales-chart [orders]="orders()" />', '}'],
          say: { en: `The chart library is heavy and sits below the fold, so it is deferred. Every word in the brackets after ${ng('@defer')} is Angular’s. Then look at <code>[orders]="orders()"</code>: the left ${pub('orders')} is the <b>chart’s</b> input name, the right ${mine('orders')} is <b>the page’s</b> signal. Same spelling, two owners.`,
                 ar: `مكتبة الرسم تقيلة وقاعدة تحت الشاشة، فهي متأجلة. كل كلمة بين الأقواس بعد ${ng('@defer')} بتاعة أنجولار. وبعدين بص على <code>[orders]="orders()"</code>: ${pub('orders')} اللي على الشمال اسم الـ input بتاع <b>الرسم</b>، و${mine('orders')} اللي على اليمين الـ signal بتاعة <b>الصفحة</b>. نفس الحروف، واتنين أصحاب.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'Budget, image, OnPush plus <code>computed</code>, <code>track</code>, <code>@defer</code>. In all five, the performance comes from Angular’s and the CLI’s words, typed exactly. Your names are the same ordinary ones as in any component: a signal, a loop variable, your data’s fields, a child’s input.',
        ar: 'budget، وصورة، وOnPush مع <code>computed</code>، و<code>track</code>، و<code>@defer</code>. في الخمسة، الأداء جاي من كلمات أنجولار والـ CLI، مكتوبة بالظبط. وأسماءك هي نفس الأسماء العادية اللي في أي component: signal، ومتغير لوب، وfields الداتا بتاعتك، وinput بتاع ابن.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Config, template or class?', ar: 'الإعدادات ولا التمبلت ولا الكلاس؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'Each fix lives in exactly one place. The last column is short on purpose: most of the names are picked for you.',
      ar: 'كل تصليح عايش في مكان واحد بس. والعمود الأخير قصير بالقصد: أغلب الأسماء بتتختار لك.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>"budgets": [ … ]</code>', '<code>angular.json</code>, under <code>production</code>', 'you, once', 'the CLI picks every key; you pick the sizes'],
            ar: ['<code>"budgets": [ … ]</code>', '<code>angular.json</code>، تحت <code>production</code>', 'انت، مرة واحدة', 'الـ CLI بيختار كل المفاتيح؛ وانت بتختار الأحجام'] },
          { en: ['<code>ngSrc</code>, <code>width</code>, <code>height</code>, <code>priority</code>', 'page <code>.html</code>', 'the page', 'Angular and HTML; you pick the path and the numbers'],
            ar: ['<code>ngSrc</code> و<code>width</code> و<code>height</code> و<code>priority</code>', '<code>.html</code> الصفحة', 'الصفحة', 'أنجولار وHTML؛ وانت بتختار المسار والأرقام'] },
          { en: ['<code>imports: [NgOptimizedImage, DatePipe, …]</code>', 'page <code>.ts</code>', 'the page', 'Angular’s class names'],
            ar: ['<code>imports: [NgOptimizedImage, DatePipe, …]</code>', '<code>.ts</code> الصفحة', 'الصفحة', 'أسماء كلاسات أنجولار'] },
          { en: ['<code>changeDetection: …OnPush</code>', 'page <code>.ts</code>', 'the page', 'Angular'],
            ar: ['<code>changeDetection: …OnPush</code>', '<code>.ts</code> الصفحة', 'الصفحة', 'أنجولار'] },
          { en: ['<code>readonly total = computed(…)</code>', 'page <code>.ts</code>', 'the page', `you pick ${mine('total')}; ${ng('computed')} is Angular’s`],
            ar: ['<code>readonly total = computed(…)</code>', '<code>.ts</code> الصفحة', 'الصفحة', `انت بتختار ${mine('total')}؛ و${ng('computed')} بتاعة أنجولار`] },
          { en: ['<code>@for (o of orders(); track o.id)</code>', 'page <code>.html</code>', 'the page', `you pick ${mine('o')}; ${pub('id')} is your data’s field`],
            ar: ['<code>@for (o of orders(); track o.id)</code>', '<code>.html</code> الصفحة', 'الصفحة', `انت بتختار ${mine('o')}؛ و${pub('id')} field في الداتا بتاعتك`] },
          { en: ['<code>[orders]="orders()"</code>', 'page <code>.html</code>', 'the page', `the left side copies the chart’s input; the right side is your signal`],
            ar: ['<code>[orders]="orders()"</code>', '<code>.html</code> الصفحة', 'الصفحة', 'الناحية الشمال بتنسخ input الرسم؛ واليمين الـ signal بتاعتك'] },
          { en: ['<code>{{ o.placedAt | date: \'medium\' }}</code>', 'page <code>.html</code>', 'the page', `${ng('date')} and ${ng('medium')} are Angular’s; ${pub('placedAt')} is your field`],
            ar: ['<code>{{ o.placedAt | date: \'medium\' }}</code>', '<code>.html</code> الصفحة', 'الصفحة', `${ng('date')} و${ng('medium')} بتوع أنجولار؛ و${pub('placedAt')} الـ field بتاعك`] },
        ] },
      { t: 'ul',
        en: ['<b>In <code>[x]="y"</code>, the left side belongs to the child and the right side to you.</b> That holds even when both say <code>orders</code>.',
             '<b>A pipe has two names.</b> You import the class (<code>DatePipe</code>) in TypeScript and type its name (<code>date</code>) in the template. Both are Angular’s.',
             '<b>Budgets live in <code>angular.json</code>, not in code.</b> They only apply to the configuration they sit under, which is why they go under <code>production</code>.'],
        ar: ['<b>في <code>[x]="y"</code>، الناحية الشمال بتاعة الابن واليمين بتاعتك.</b> وده صح حتى لو الاتنين مكتوب فيهم <code>orders</code>.',
             '<b>الـ pipe ليه اسمين.</b> بتعمل import للكلاس (<code>DatePipe</code>) في TypeScript وبتكتب اسمه (<code>date</code>) في التمبلت. والاتنين بتوع أنجولار.',
             '<b>الـ budgets عايشة في <code>angular.json</code>، مش في الكود.</b> وبتتطبق بس على الـ configuration اللي هي تحته، وعشان كده بتتحط تحت <code>production</code>.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All six files, every name coloured', ar: 'الست ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same example, complete. Hover a coloured name to light up everywhere else it appears. Then press <b>Rename test</b>: notice how little moves. That is the point of this topic.',
      ar: 'نفس المثال، كامل. قف بالماوس على أي اسم ملوّن وهتنوّر كل الأماكن التانية اللي هو فيها. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: خد بالك قد إيه حاجات قليلة اللي بتتحرك. ودي فكرة الموضوع ده.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'angular.json', lang: 'json', tag: { en: 'projects › app › architect › build', ar: 'projects › app › architect › build' }, code: [
        '"configurations": {',
        '  "production": {',
        '    "budgets": [',
        '      { "type": "initial", "maximumWarning": "500kB", "maximumError": "1MB" },',
        '      { "type": "anyComponentStyle", "maximumWarning": "4kB", "maximumError": "8kB" }',
        '    ]',
        '  }',
        '}' ] },
      { t: 'code', name: 'order.ts', lang: 'ts', tag: { en: 'the data', ar: 'الداتا' }, code: [
        'export interface Order {',
        '  id: number;',
        '  customer: string;',
        '  placedAt: Date;',
        '  amount: number;',
        '}' ] },
      { t: 'code', name: 'orders.ts', lang: 'ts', tag: { en: 'the page', ar: 'الصفحة' }, code: [
        "import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';",
        "import { CurrencyPipe, DatePipe, NgOptimizedImage } from '@angular/common';",
        "import { SalesChart } from './sales-chart';",
        "import { Order } from './order';",
        '',
        '@Component({',
        "  selector: 'app-orders',",
        '  imports: [NgOptimizedImage, DatePipe, CurrencyPipe, SalesChart],',
        "  templateUrl: './orders.html',",
        "  styleUrl: './orders.css',",
        '  changeDetection: ChangeDetectionStrategy.OnPush,',
        '})',
        'export class Orders {',
        '  readonly orders = signal<Order[]>([]);',
        '  readonly total = computed(() => this.orders().reduce((sum, o) => sum + o.amount, 0));',
        '',
        '  addOrder(order: Order) {',
        '    this.orders.update(list => [...list, order]);',
        '  }',
        '}' ] },
      { t: 'code', name: 'orders.html', lang: 'html', tag: { en: 'the page', ar: 'الصفحة' }, code: [
        '<img ngSrc="/banner.jpg" width="1200" height="300" priority alt="Spring sale" />',
        '',
        '<p>Total: {{ total() | currency }}</p>',
        '',
        '<ul>',
        '  @for (o of orders(); track o.id) {',
        "    <li>{{ o.customer }} · {{ o.placedAt | date: 'medium' }}</li>",
        '  }',
        '</ul>',
        '',
        '@defer (on viewport; prefetch on idle) {',
        '  <app-sales-chart [orders]="orders()" />',
        '} @placeholder {',
        '  <div class="chart-skeleton"></div>',
        '}' ] },
      { t: 'code', name: 'orders.css', lang: 'css', tag: { en: 'the page', ar: 'الصفحة' }, code: [
        '.chart-skeleton {',
        '  height: 280px;   /* the chart’s real height: nothing jumps */',
        '}' ] },
      { t: 'code', name: 'sales-chart.ts', lang: 'ts', tag: { en: 'deferred', ar: 'متأجل' }, code: [
        "import { Component, input } from '@angular/core';",
        "import { Order } from './order';",
        '',
        '@Component({',
        "  selector: 'app-sales-chart',",
        "  template: '<p>Chart of {{ orders().length }} sales</p>',",
        '})',
        'export class SalesChart {',
        '  readonly orders = input.required<Order[]>();',
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
      en: 'Your few names behave exactly as in any component: the compiler catches almost everything. The exception is, again, a CSS class.',
      ar: 'أسماءك القليلة بتتصرف بالظبط زي أي component: الـ compiler بيمسك تقريبًا كل حاجة. والاستثناء، تاني، كلاس CSS.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [mine('total') + ' / ' + mine('orders') + ' (the page’s signals)', 'the page’s template', 'Compile error in the template.'],
            ar: [mine('total') + ' / ' + mine('orders') + ' (الـ signals بتاعة الصفحة)', 'تمبلت الصفحة', 'Compile error في التمبلت.'] },
          { en: [pub('orders') + ' (the chart’s input)', '<code>[orders]</code> in the page', 'Compile error: the page binds an input the chart no longer has.'],
            ar: [pub('orders') + ' (الـ input بتاع الرسم)', '<code>[orders]</code> في الصفحة', 'Compile error: الصفحة بتربط input الرسم مبقاش عنده.'] },
          { en: [`${pub('id')}, ${pub('customer')}, ${pub('placedAt')}, ${pub('amount')}`, 'every file that reads the field', 'Compile error: <code>Order</code> is typed.'],
            ar: [`${pub('id')} و${pub('customer')} و${pub('placedAt')} و${pub('amount')}`, 'كل ملف بيقرا الـ field', 'Compile error: <code>Order</code> ليه نوع.'] },
          { en: [`${pub('SalesChart')}, ${pub('app-sales-chart')}`, 'the page’s <code>imports</code> and its tag', 'Compile error.'],
            ar: [`${pub('SalesChart')} و${pub('app-sales-chart')}`, '<code>imports</code> الصفحة والتاج بتاعها', 'Compile error.'] },
          { en: [mine('o') + ' (loop variable)', 'only inside that <code>@for</code>, including <code>track</code>', 'Compile error inside the block.'],
            ar: [mine('o') + ' (متغير اللوب)', 'جوه الـ <code>@for</code> ده بس، ومعاه <code>track</code>', 'Compile error جوه البلوك.'] },
          { en: [mine('chart-skeleton') + ' (the CSS class)', 'the rule in <code>orders.css</code>', '<b>No error at all.</b> The placeholder collapses and the page jumps when the chart arrives.'],
            ar: [mine('chart-skeleton') + ' (كلاس الـ CSS)', 'القاعدة في <code>orders.css</code>', '<b>مفيش أي error.</b> الـ placeholder بيقفل والصفحة بتنطّ لما الرسم يوصل.'] },
          { en: [`${ng('budgets')}, ${ng('maximumError')}…`, 'nothing: they are the CLI’s', 'Copy them from the docs rather than typing from memory. A budget that never fires is worth checking letter by letter, and checking that it sits under the configuration you build.'],
            ar: [`${ng('budgets')} و${ng('maximumError')}…`, 'ولا حاجة: دول بتوع الـ CLI', 'انسخهم من الـ docs بدل ما تكتبهم من دماغك. والـ budget اللي عمره ما بيشتغل يستاهل تراجعه حرف حرف، وتتأكد إنه تحت الـ configuration اللي بتعمله build.'] },
          { en: [`${ng('ngSrc')}, ${ng('priority')}, ${ng('track')}, ${ng('date')}`, 'nothing: they are Angular’s', 'See the silent mistakes below: <code>ngSrc</code> in particular fails quietly.'],
            ar: [`${ng('ngSrc')} و${ng('priority')} و${ng('track')} و${ng('date')}`, 'ولا حاجة: دول بتوع أنجولار', 'شوف الغلطات الصامتة تحت: <code>ngSrc</code> بالذات بيفشل من غير صوت.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b>. In <code>[orders]="orders()"</code> the two sides turn into <b>different</b> made-up words: proof that they are two different names that happen to be spelled alike.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b>. في <code>[orders]="orders()"</code> الناحيتين بيبقوا كلمتين عشوائيتين <b>مختلفتين</b>: وده الدليل إنهم اسمين مختلفين حروفهم صدفة زي بعض.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتاعتك' },
    title: { en: 'The fixed names: the CLI, Angular and the browser', ar: 'الأسماء الثابتة: الـ CLI وأنجولار والمتصفح' },
    lead: {
      en: 'The last fix, a web worker, is the clearest example of all. Almost every word in a worker file belongs to the browser.',
      ar: 'آخر تصليح، الـ web worker، أوضح مثال فيهم كلهم. تقريبًا كل كلمة في ملف الـ worker بتاعة المتصفح.'
    },
    blocks: [
      { t: 'code', name: 'report.worker.ts', lang: 'ts', tag: { en: 'runs on another thread', ar: 'بيشتغل على thread تاني' }, code: [
        '/// <reference lib="webworker" />',
        "import { Order } from './order';",
        '',
        "addEventListener('message', ({ data }) => {",
        '  const summary = summarise(data);',
        '  postMessage(summary);',
        '});',
        '',
        'function summarise(rows: Order[]): number {',
        '  // imagine seconds of real work here',
        '  return rows.reduce((sum, o) => sum + o.amount, 0);',
        '}' ] },
      { t: 'code', name: 'orders.ts · with a worker', lang: 'ts', tag: { en: 'the page starts it', ar: 'الصفحة بتشغّله' }, code: [
        'readonly summary = signal<number | null>(null);',
        '',
        'runReport() {',
        "  const worker = new Worker(new URL('./report.worker', import.meta.url));",
        '  worker.onmessage = ({ data }) => {',
        '    this.summary.set(data);',
        '    worker.terminate();',
        '  };',
        '  worker.postMessage(this.orders());',
        '}' ] },
      { t: 'p',
        en: `${ng('addEventListener')}, ${ng('message')}, ${ng('data')}, ${ng('postMessage')}, ${ng('Worker')}, ${ng('onmessage')} and ${ng('terminate')} are all the browser’s. <code>{ data }</code> is destructuring, so it only works because the event object really has a property called ${ng('data')}. Yours: ${mine('summarise')}, ${mine('rows')}, ${mine('runReport')}, ${mine('worker')} and the two unrelated ${mine('summary')} variables.`,
        ar: `${ng('addEventListener')} و${ng('message')} و${ng('data')} و${ng('postMessage')} و${ng('Worker')} و${ng('onmessage')} و${ng('terminate')} كلهم بتوع المتصفح. و<code>{ data }</code> ده destructuring، فبيشتغل بس عشان أوبجكت الـ event فيه فعلًا property اسمها ${ng('data')}. وبتوعك: ${mine('summarise')} و${mine('rows')} و${mine('runReport')} و${mine('worker')} والمتغيرين ${mine('summary')} اللي ملهمش علاقة ببعض.` },
      { t: 'tbl',
        head: { en: ['Owner', 'Names on this page'], ar: ['صاحبها', 'الأسماء في الصفحة دي'] },
        rows: [
          { en: ['the CLI (<code>angular.json</code>)', `${ng('budgets')}, ${ng('type')}, ${ng('initial')}, ${ng('anyComponentStyle')}, ${ng('maximumWarning')}, ${ng('maximumError')}`],
            ar: ['الـ CLI (<code>angular.json</code>)', `${ng('budgets')} و${ng('type')} و${ng('initial')} و${ng('anyComponentStyle')} و${ng('maximumWarning')} و${ng('maximumError')}`] },
          { en: ['Angular’s image directive', `${ng('NgOptimizedImage')}, ${ng('ngSrc')}, ${ng('priority')}`],
            ar: ['الـ directive بتاع الصور في أنجولار', `${ng('NgOptimizedImage')} و${ng('ngSrc')} و${ng('priority')}`] },
          { en: ['Angular’s rendering', `${ng('OnPush')}, ${ng('computed')}, ${ng('track')}, ${ng('@defer')}, ${ng('viewport')}, ${ng('prefetch')}`],
            ar: ['الرسم في أنجولار', `${ng('OnPush')} و${ng('computed')} و${ng('track')} و${ng('@defer')} و${ng('viewport')} و${ng('prefetch')}`] },
          { en: ['Angular’s pipes', `${ng('date')} / ${ng('DatePipe')}, ${ng('currency')} / ${ng('CurrencyPipe')}, ${ng('medium')}`],
            ar: ['الـ pipes بتاعة أنجولار', `${ng('date')} / ${ng('DatePipe')} و${ng('currency')} / ${ng('CurrencyPipe')} و${ng('medium')}`] },
          { en: ['HTML and the browser', `${ng('width')}, ${ng('height')}, ${ng('alt')}, and the whole worker API`],
            ar: ['HTML والمتصفح', `${ng('width')} و${ng('height')} و${ng('alt')}، والـ API بتاعة الـ worker كلها`] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'Your few names can still help or hurt. These habits make the fast version as readable as the slow one.',
      ar: 'أسماءك القليلة لسه ممكن تفيد أو تضر. العادات دي بتخلي النسخة السريعة سهلة في القراية زي البطيئة.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['a computed', '<code>total</code>, <code>visibleOrders</code>', '<code>getTotal</code>, <code>calcTotal</code>', 'It is a value you read, not an action you run. A verb makes it look like a method.'],
            ar: ['computed', '<code>total</code>، <code>visibleOrders</code>', '<code>getTotal</code>، <code>calcTotal</code>', 'دي قيمة بتقراها، مش فعل بتنفّذه. والفعل بيخليها شكلها ميثود.'] },
          { en: ['the loop variable', '<code>o</code>, <code>order</code>', '<code>item</code>, <code>x</code> in a long template', 'Short is fine in a short loop; in a long one, the singular of the list reads best.'],
            ar: ['متغير اللوب', '<code>o</code>، <code>order</code>', '<code>item</code>، <code>x</code> في تمبلت طويل', 'القصير كويس في لوب قصير؛ وفي الطويل، مفرد اسم الليستة بيتقري أحسن.'] },
          { en: ['what you <code>track</code>', 'a unique, stable field: <code>o.id</code>', '<code>$index</code> when rows can reorder or be replaced', 'Tracking by position makes Angular reuse the wrong row’s DOM when the order changes.'],
            ar: ['اللي بتعمله <code>track</code>', 'field مش متكرر وثابت: <code>o.id</code>', '<code>$index</code> لما الصفوف ممكن تتبدل أو تتغير', 'التتبع بالمكان بيخلي أنجولار يستخدم الـ DOM بتاع الصف الغلط لما الترتيب يتغير.'] },
          { en: ['a placeholder class', '<code>chart-skeleton</code>', '<code>ph</code>', 'Name it after what it stands in for: it must share that thing’s height.'],
            ar: ['كلاس placeholder', '<code>chart-skeleton</code>', '<code>ph</code>', 'سمّيه باسم الحاجة اللي ماسك مكانها: لازم ياخد نفس ارتفاعها.'] },
          { en: ['a child’s input', '<code>orders</code>, the same as the data', '<code>data</code>, <code>items</code>', '<code>[orders]="orders()"</code> is fine and common. Once you know the left side is the child’s, it reads clearly.'],
            ar: ['input ابن', '<code>orders</code>، نفس اسم الداتا', '<code>data</code>، <code>items</code>', '<code>[orders]="orders()"</code> مفيهاش حاجة ومنتشرة. أول ما تعرف إن الشمال بتاع الابن، بتتقري بوضوح.'] },
          { en: ['a worker file', '<code>report.worker.ts</code>', '<code>report-worker.ts</code>', 'The <code>.worker.ts</code> ending is what the CLI’s worker setup expects. See the next section.'],
            ar: ['ملف worker', '<code>report.worker.ts</code>', '<code>report-worker.ts</code>', 'النهاية <code>.worker.ts</code> هي اللي إعدادات الـ worker بتاعة الـ CLI مستنياها. شوف الجزء اللي جاي.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Four places where the name is not free', ar: 'أربع أماكن الاسم فيهم مش براحتك' },
    lead: {
      en: 'These look like choices, but a tool somewhere is matching on the exact text.',
      ar: 'دي شكلها اختيارات، بس فيه أداة في حتة بتطابق على النص بالظبط.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'Workers: the file ending and the exact shape', ar: 'الـ workers: نهاية الملف والشكل بالظبط' }, blocks: [
        { t: 'p',
          en: '<code>ng generate web-worker report</code> creates <code>report.worker.ts</code> and a <code>tsconfig.worker.json</code> that includes files ending in <code>.worker.ts</code> (the app’s own tsconfig excludes them). The bundler only builds the worker when it sees the exact shape <code>new Worker(new URL(\'./report.worker\', import.meta.url))</code>. The word <code>report</code> is yours; the <code>.worker</code> ending and the shape around it are not.',
          ar: '<code>ng generate web-worker report</code> بيعمل <code>report.worker.ts</code> و<code>tsconfig.worker.json</code> بيشمل الملفات اللي بتخلص بـ <code>.worker.ts</code> (والـ tsconfig بتاع التطبيق بيستبعدهم). والـ bundler بيبني الـ worker بس لما يشوف الشكل بالظبط <code>new Worker(new URL(\'./report.worker\', import.meta.url))</code>. كلمة <code>report</code> بتاعتك؛ لكن النهاية <code>.worker</code> والشكل اللي حواليها لأ.' }
      ]},
      { t: 'step', n: 'B', title: { en: 'A pipe’s template name is not its class name', ar: 'اسم الـ pipe في التمبلت مش اسم الكلاس بتاعه' }, blocks: [
        { t: 'p',
          en: `You import ${ng('DatePipe')} but type ${ng('date')}. The template name is set inside the pipe itself, so you cannot write <code>| datePipe</code> or <code>| DatePipe</code>. The same goes for ${ng('CurrencyPipe')} and ${ng('currency')}.`,
          ar: `بتعمل import لـ ${ng('DatePipe')} بس بتكتب ${ng('date')}. اسم التمبلت متحدد جوه الـ pipe نفسه، فمينفعش تكتب <code>| datePipe</code> ولا <code>| DatePipe</code>. ونفس الكلام على ${ng('CurrencyPipe')} و${ng('currency')}.` }
      ]},
      { t: 'step', n: 'C', title: { en: '<code>track</code> needs a field that really identifies a row', ar: '<code>track</code> محتاج field بيميّز الصف فعلًا' }, blocks: [
        { t: 'p',
          en: `The name ${pub('id')} is yours, but whatever you track must be unique and stable for each order. If your data has no such field, add one; do not track something that changes, like the amount.`,
          ar: `الاسم ${pub('id')} بتاعك، بس أي حاجة بتعملها track لازم تبقى مش متكررة وثابتة لكل طلب. لو الداتا بتاعتك مفيهاش field زي ده، زوّده؛ ومتعملش track لحاجة بتتغير، زي الـ amount.` }
      ]},
      { t: 'step', n: 'D', title: { en: '<code>NgOptimizedImage</code> requires its attributes', ar: '<code>NgOptimizedImage</code> بيطلب الـ attributes بتاعته' }, blocks: [
        { t: 'p',
          en: `Once ${ng('ngSrc')} is on an image, ${ng('width')} and ${ng('height')} are required (or the <code>fill</code> mode instead), and Angular reports an error in development if they are missing. And if it detects that an image is the page’s largest content (the LCP element) without ${ng('priority')}, it warns in development.`,
          ar: `أول ما ${ng('ngSrc')} يبقى على صورة، ${ng('width')} و${ng('height')} بيبقوا إجباريين (أو وضع <code>fill</code> بدالهم)، وأنجولار بيطلّع error وقت الـ development لو ناقصين. ولو اكتشف إن صورة هي أكبر محتوى في الصفحة (عنصر الـ LCP) ومن غير ${ng('priority')}، بيحذّر وقت الـ development.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: '<code>*ngFor</code> with <code>trackBy</code>: one more name of yours', ar: '<code>*ngFor</code> مع <code>trackBy</code>: اسم زيادة بتاعك' },
    lead: {
      en: 'Before <code>@for</code>, tracking was optional and needed a method in the class. That method was one more name you had to invent and keep in sync.',
      ar: 'قبل <code>@for</code>، الـ tracking كان اختياري ومحتاج ميثود في الكلاس. والميثود دي كانت اسم زيادة لازم تخترعه وتفضل ماسكه متزامن.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'orders.html + orders.ts — older style', lang: 'ts', code: [
          '// template:',
          '// <li *ngFor="let o of orders(); trackBy: trackById">…</li>',
          '',
          'trackById(index: number, o: Order) {',
          '  return o.id;',
          '}' ] },
        good: { name: 'orders.html — today', lang: 'html', code: [
          '@for (o of orders(); track o.id) {',
          '  <li>{{ o.customer }}</li>',
          '}' ] } },
      { t: 'code', name: 'orders.html · older template', lang: 'html', tag: { en: 'the template of the older style', ar: 'تمبلت الأسلوب القديم' }, code: [
        '<li *ngFor="let o of orders(); trackBy: trackById">{{ o.customer }}</li>' ] },
      { t: 'p',
        en: `In the old style ${ng('trackBy')} is Angular’s, but ${mine('trackById')} is your method, named in a template string: rename it in one place only and the template no longer compiles. And forgetting <code>trackBy</code> entirely was silent. With ${ng('@for')}, ${ng('track')} is required and takes the expression directly, so there is no extra name at all.`,
        ar: `في الأسلوب القديم ${ng('trackBy')} بتاع أنجولار، بس ${mine('trackById')} الميثود بتاعتك، مكتوبة في نص في التمبلت: لو غيّرتها في مكان واحد بس التمبلت مش هيعمل compile. ونسيان <code>trackBy</code> خالص كان بيعدّي في صمت. مع ${ng('@for')}، ${ng('track')} إجباري وبياخد التعبير على طول، فمفيش اسم زيادة خالص.` }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, and says nothing', ar: 'مش بيعمل حاجة، ومش بيقول حاجة' },
    title: { en: 'Mistakes that fail silently', ar: 'غلطات بتفشل في صمت' },
    lead: {
      en: 'Performance mistakes rarely throw. The page works; it is just slow, or it stops updating, and nothing tells you which name was wrong.',
      ar: 'غلطات الأداء نادرًا لما بترمي error. الصفحة شغالة؛ بس بطيئة، أو بتبطل تتحدث، ومفيش حاجة بتقولك أنهي اسم كان غلط.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: '<code>src</code> instead of <code>ngSrc</code>', ar: '<code>src</code> بدل <code>ngSrc</code>' }, blocks: [
        { t: 'pair',
          bad:  { name: 'orders.html', lang: 'html', code: ['<img src="/banner.jpg" width="1200" height="300" priority alt="Spring sale" />'] },
          good: { name: 'orders.html', lang: 'html', code: ['<img ngSrc="/banner.jpg" width="1200" height="300" priority alt="Spring sale" />'] } },
        { t: 'p', en: `${ng('NgOptimizedImage')} only attaches to images that use ${ng('ngSrc')}. With plain <code>src</code> the image loads as an ordinary image, and ${ng('priority')} is just an unused attribute. No error, no optimisation.`,
                  ar: `${ng('NgOptimizedImage')} بيتركّب بس على الصور اللي بتستخدم ${ng('ngSrc')}. ومع <code>src</code> العادي الصورة بتتحمّل كصورة عادية، و${ng('priority')} بيبقى attribute ملوش لازمة. لا error، ولا تحسين.` }
      ]},
      { t: 'step', n: '2', title: { en: '<code>ngSrc</code> without the import', ar: '<code>ngSrc</code> من غير الـ import' }, blocks: [
        { t: 'pair',
          bad:  { name: 'orders.ts', lang: 'ts', code: ['imports: [DatePipe, CurrencyPipe, SalesChart],'] },
          good: { name: 'orders.ts', lang: 'ts', code: ['imports: [NgOptimizedImage, DatePipe, CurrencyPipe, SalesChart],'] } },
        { t: 'p', en: 'Without the directive, <code>ngSrc="/banner.jpg"</code> is a plain attribute the browser ignores. The image has no real <code>src</code>, so nothing appears, and the compiler does not complain about a static attribute it does not know.',
                  ar: 'من غير الـ directive، <code>ngSrc="/banner.jpg"</code> attribute عادي المتصفح بيتجاهله. والصورة ملهاش <code>src</code> حقيقي، فمفيش حاجة بتظهر، والـ compiler مش بيشتكي من attribute ثابت ميعرفوش.' }
      ]},
      { t: 'step', n: '3', title: { en: 'Changing the array inside a signal', ar: 'إنك تغيّر الـ array اللي جوه الـ signal' }, blocks: [
        { t: 'pair',
          bad:  { name: 'orders.ts', lang: 'ts', code: ['addOrder(order: Order) {', '  this.orders().push(order);', '}'] },
          good: { name: 'orders.ts', lang: 'ts', code: ['addOrder(order: Order) {', '  this.orders.update(list => [...list, order]);', '}'] } },
        { t: 'p', en: `${ng('push')} changes the same array, so the signal still holds the same value and tells nobody. With ${ng('OnPush')}, the list and ${mine('total')} stay stale. ${ng('update')} with a <b>new</b> array is what makes the signal notify.`,
                  ar: `${ng('push')} بتغيّر نفس الـ array، فالـ signal لسه شايلة نفس القيمة ومش بتبلّغ حد. ومع ${ng('OnPush')}، الليستة و${mine('total')} بيفضلوا قدام. و${ng('update')} بـ array <b>جديدة</b> هو اللي بيخلي الـ signal تبلّغ.` }
      ]},
      { t: 'step', n: '4', title: { en: 'Tracking the object instead of its id', ar: 'التتبع بالأوبجكت بدل الـ id بتاعه' }, blocks: [
        { t: 'pair',
          bad:  { name: 'orders.html', lang: 'html', code: ['@for (o of orders(); track o) {'] },
          good: { name: 'orders.html', lang: 'html', code: ['@for (o of orders(); track o.id) {'] } },
        { t: 'p', en: 'Tracking the object itself works until the list is reloaded from the server. Every order is then a new object, so Angular destroys and rebuilds every row. Nothing breaks; the page just does far more work than it needs to.',
                  ar: 'التتبع بالأوبجكت نفسه شغال لحد ما الليستة تتحمّل تاني من السيرفر. ساعتها كل طلب بيبقى أوبجكت جديد، فأنجولار بيهد ويبني كل صف من الأول. مفيش حاجة بتبوظ؛ الصفحة بس بتعمل شغل أكتر بكتير من اللازم.' }
      ]},
      { t: 'step', n: '5', title: { en: 'A method where a computed belongs', ar: 'ميثود مكان computed' }, blocks: [
        { t: 'pair',
          bad:  { name: 'orders.ts', lang: 'ts', code: ['getTotal() {', '  return this.orders().reduce((sum, o) => sum + o.amount, 0);', '}'] },
          good: { name: 'orders.ts', lang: 'ts', code: ['readonly total = computed(() =>', '  this.orders().reduce((sum, o) => sum + o.amount, 0),', ');'] } },
        { t: 'p', en: `A method called from the template, <code>{{ getTotal() }}</code>, runs again every time the component is checked. A ${ng('computed')} remembers its result until ${mine('orders')} changes. Both show the right number, which is why the slow one survives code review.`,
                  ar: `ميثود متنادية من التمبلت، <code>{{ getTotal() }}</code>، بتشتغل تاني كل مرة الـ component بيتفحص. أما ${ng('computed')} فبتفتكر النتيجة لحد ما ${mine('orders')} تتغير. والاتنين بيطلّعوا الرقم الصح، وعشان كده البطيئة بتعدّي من الـ code review.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it is still slow', ar: 'لما لسه بطيء' },
    title: { en: 'Six questions, in this order', ar: 'ست أسئلة، بالترتيب ده' },
    lead: {
      en: 'The page is still slow, or a fix “did nothing”. Ask these before changing more code.',
      ar: 'الصفحة لسه بطيئة، أو تصليح «معملش حاجة». اسأل الأسئلة دي قبل ما تغيّر كود أكتر.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Are you measuring a production build? <code>ng build</code> uses the production configuration by default; <code>ng serve</code> does not.',
                  ar: '<b>1.</b> انت بتقيس build إنتاج؟ <code>ng build</code> بيستخدم الـ configuration بتاعة الإنتاج افتراضيًا؛ لكن <code>ng serve</code> لأ.' },
      { t: 'chk', en: '<b>2.</b> Are the budgets under the configuration you actually build, with the keys spelled exactly as the docs spell them?',
                  ar: '<b>2.</b> الـ budgets تحت الـ configuration اللي بتعمله build فعلًا، والمفاتيح مكتوبة بالظبط زي الـ docs؟' },
      { t: 'chk', en: '<b>3.</b> Does the main image use <code>ngSrc</code>, with <code>NgOptimizedImage</code> in <code>imports</code> and <code>priority</code> on it?',
                  ar: '<b>3.</b> الصورة الأساسية بتستخدم <code>ngSrc</code>، و<code>NgOptimizedImage</code> في <code>imports</code>، و<code>priority</code> عليها؟' },
      { t: 'chk', en: '<b>4.</b> Does every <code>@for</code> track a unique, stable field rather than the object or <code>$index</code>?',
                  ar: '<b>4.</b> كل <code>@for</code> بيعمل track لـ field مش متكرر وثابت بدل الأوبجكت أو <code>$index</code>؟' },
      { t: 'chk', en: '<b>5.</b> With <code>OnPush</code>, are signals updated with <code>set</code> or <code>update</code> and a new value, never changed in place?',
                  ar: '<b>5.</b> مع <code>OnPush</code>، الـ signals بتتحدث بـ <code>set</code> أو <code>update</code> وقيمة جديدة، ومش بتتغير في مكانها أبدًا؟' },
      { t: 'chk', en: '<b>6.</b> Does <code>ng build</code> list the chart under the lazy chunks? If not, something outside the <code>@defer</code> block uses it.',
                  ar: '<b>6.</b> <code>ng build</code> طالع فيه الرسم تحت الـ lazy chunks؟ لو لأ، يبقى فيه حاجة برّه بلوك الـ <code>@defer</code> بتستخدمه.' }
    ]
  }
  ]
};
