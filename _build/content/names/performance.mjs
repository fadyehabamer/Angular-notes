/* names for the performance topic.
   n: the name exactly as typed in the code.   k: ng | mine | pub.
   w: what it is, and what has to change with it.   { en, ar }
   re / only / as: see _build/names.mjs.                                  */

/* a trigger word only counts right after "(on", "; on" or "prefetch on" */
const TRIG = w => '(?<=[(;]\\s*(?:prefetch )?on )' + w + '(?![\\w$-])';

export default {
'performance': {
  note: {
    en: 'Almost every name on this page is fixed: <code>angular.json</code> keys, route keys, <code>@defer</code> triggers, image attributes, worker events. Performance work is mostly about choosing the right built-in, not naming things. The few names that are yours are the ones you would find in any component.',
    ar: 'تقريباً كل اسم في الصفحة دي ثابت: مفاتيح <code>angular.json</code>، مفاتيح الـ routes، الـ triggers بتاعة <code>@defer</code>، attributes الصور، events الـ worker. شغل الـ performance أغلبه إنك تختار الحاجة الجاهزة الصح، مش إنك تسمّي حاجات. والأسماء القليلة اللي بتاعتك هي نفس اللي بتلاقيها في أي component.'
  },
  names: [
    { n:'timeChangeDetection', k:'ng', only:['measure'], w:{ en:'A debugging helper Angular puts on the global <code>ng</code> object in development builds.', ar:'helper للـ debugging أنجولار بيحطه على الأوبجكت العام <code>ng</code> في نسخ الـ development.' } },
    { n:'budgets', k:'ng', only:['budget'], w:{ en:'An <code>angular.json</code> key the CLI reads. Type it exactly: the CLI checks this file’s keys against its own schema.', ar:'مفتاح في <code>angular.json</code> الـ CLI بيقراه. اكتبه بالظبط: الـ CLI بيراجع مفاتيح الملف ده على الـ schema بتاعته.' } },
    { n:'type', k:'ng', only:['budget'], w:{ en:'A budget key: what is being measured.', ar:'مفتاح في الـ budget: إيه اللي بيتقاس.' } },
    { n:'initial', k:'ng', only:['budget'], w:{ en:'A fixed budget type: everything downloaded on first load.', ar:'نوع budget ثابت: كل اللي بيتنزّل في أول تحميل.' } },
    { n:'anyComponentStyle', k:'ng', only:['budget'], w:{ en:'A fixed budget type: the CSS of any single component.', ar:'نوع budget ثابت: الـ CSS بتاع أي component لوحده.' } },
    { n:'maximumWarning', k:'ng', only:['budget'], w:{ en:'A budget key: warn above this size.', ar:'مفتاح في الـ budget: حذّر لو الحجم عدّى ده.' } },
    { n:'maximumError', k:'ng', only:['budget'], w:{ en:'A budget key: fail the build above this size.', ar:'مفتاح في الـ budget: وقّع الـ build لو الحجم عدّى ده.' } },
    { n:'loadComponent', k:'ng', w:{ en:'A route key: download this component only when the route is visited.', ar:'مفتاح route: نزّل الـ component ده بس لما حد يزور الـ route.' } },
    { n:'loadChildren', k:'ng', w:{ en:'A route key: download a whole list of child routes only when needed.', ar:'مفتاح route: نزّل ليستة routes كاملة بس لما تحتاجها.' } },
    { n:'canMatch', k:'ng', w:{ en:'A route key for guards that run before the chunk downloads.', ar:'مفتاح route للـ guards اللي بتشتغل قبل ما الـ chunk يتنزّل.' } },
    { n:'path', k:'ng', only:['ts'], w:{ en:'A route key. The URL text is yours.', ar:'مفتاح route. نص الـ URL بتاعك.' } },
    { n:'then', k:'ng', w:{ en:'The Promise method that runs once the file has downloaded.', ar:'ميثود الـ Promise اللي بتشتغل أول ما الملف يخلص تحميل.' } },
    { n:'@defer', k:'ng', w:{ en:'Angular’s block: load this part’s code later.', ar:'البلوك بتاع أنجولار: حمّل كود الجزء ده بعدين.' } },
    { n:'@placeholder', k:'ng', w:{ en:'Angular’s block shown until the deferred part loads.', ar:'البلوك بتاع أنجولار اللي بيظهر لحد ما الجزء المتأجل يتحمّل.' } },
    { n:'on', k:'ng', only:['ts'], re:'(?<=[(;]\\s*(?:prefetch )?)on(?= )', w:{ en:'Angular’s keyword that introduces a <code>@defer</code> trigger.', ar:'الكلمة بتاعة أنجولار اللي بتبدأ بيها trigger الـ <code>@defer</code>.' } },
    { n:'viewport', k:'ng', re:TRIG('viewport'), w:{ en:'A trigger: when the placeholder scrolls into view.', ar:'trigger: لما الـ placeholder يظهر على الشاشة.' } },
    { n:'interaction', k:'ng', re:TRIG('interaction'), w:{ en:'A trigger: the first click or key press on the placeholder.', ar:'trigger: أول ضغطة أو زرار كيبورد على الـ placeholder.' } },
    { n:'hover', k:'ng', re:TRIG('hover'), w:{ en:'A trigger: the pointer enters the placeholder.', ar:'trigger: الماوس يدخل على الـ placeholder.' } },
    { n:'prefetch', k:'ng', only:['ts'], w:{ en:'Angular’s keyword: download early on this trigger, show later on the main one.', ar:'كلمة أنجولار: نزّل بدري على الـ trigger ده، واعرض بعدين على الأساسي.' } },
    { n:'ngSrc', k:'ng', w:{ en:'<code>NgOptimizedImage</code>’s attribute, used instead of <code>src</code>. It turns on lazy loading, size checks and preloading.', ar:'الـ attribute بتاع <code>NgOptimizedImage</code>، بيتكتب بدل <code>src</code>. بيشغّل الـ lazy loading وفحص المقاسات والـ preload.' } },
    { n:'width', k:'ng', only:['wins'], w:{ en:'The HTML attribute. <code>NgOptimizedImage</code> requires it so the layout does not jump.', ar:'الـ attribute بتاع HTML. <code>NgOptimizedImage</code> بيطلبه عشان الصفحة متتنططش.' } },
    { n:'height', k:'ng', only:['wins'], w:{ en:'The HTML attribute, required for the same reason.', ar:'الـ attribute بتاع HTML، مطلوب لنفس السبب.' } },
    { n:'priority', k:'ng', w:{ en:'<code>NgOptimizedImage</code>’s flag for the hero image: load it first, not lazily.', ar:'علامة <code>NgOptimizedImage</code> للصورة الرئيسية: حمّلها الأول، مش lazy.' } },
    { n:'changeDetection', k:'ng', w:{ en:'A <code>@Component</code> option key.', ar:'مفتاح إعداد في <code>@Component</code>.' } },
    { n:'ChangeDetectionStrategy', k:'ng', w:{ en:'Angular’s enum of change detection modes.', ar:'الـ enum بتاع أنجولار لأنواع الـ change detection.' } },
    { n:'OnPush', k:'ng', w:{ en:'The mode that checks a component only when its inputs or signals change.', ar:'النوع اللي بيشيّك على الـ component بس لما الـ inputs أو الـ signals بتاعته تتغير.' } },
    { n:'@for', k:'ng', w:{ en:'Angular’s control-flow loop.', ar:'الـ loop بتاعة الـ control flow في أنجولار.' } },
    { n:'track', k:'ng', w:{ en:'Angular’s required <code>@for</code> keyword: how to tell rows apart.', ar:'كلمة أنجولار الإجبارية في <code>@for</code>: إزاي يفرّق بين الصفوف.' } },
    { n:'cdk-virtual-scroll-viewport', k:'ng', w:{ en:'The Angular CDK’s virtual scroll component.', ar:'الـ component بتاع الـ virtual scroll في الـ Angular CDK.' } },
    { n:'itemSize', k:'ng', w:{ en:'Its input: the height of one row in pixels.', ar:'الـ input بتاعه: ارتفاع الصف الواحد بالـ pixels.' } },
    { n:'computed', k:'ng', w:{ en:'Angular’s derived signal, cached until what it reads changes.', ar:'الـ signal المشتقة بتاعة أنجولار، نتيجتها بتتحفظ لحد ما اللي بتقراه يتغير.' } },
    { n:'provideZonelessChangeDetection', k:'ng', w:{ en:'Angular’s provider that removes zone.js.', ar:'الـ provider بتاع أنجولار اللي بيشيل zone.js.' } },
    { n:'addEventListener', k:'ng', w:{ en:'The browser’s way to listen; inside a worker it listens for messages from the page.', ar:'طريقة المتصفح للاستماع؛ جوه الـ worker بيسمع الرسايل اللي جاية من الصفحة.' } },
    { n:'message', k:'ng', w:{ en:'The browser’s fixed event name for a message arriving.', ar:'اسم الـ event الثابت في المتصفح لما رسالة توصل.' } },
    { n:'data', k:'ng', only:['worker'], w:{ en:'The message event’s own property. Destructuring <code>{ data }</code> only works with this exact name.', ar:'property بتاعة الـ message event نفسه. الـ destructuring <code>{ data }</code> بيشتغل بالاسم ده بالظبط بس.' } },
    { n:'postMessage', k:'ng', w:{ en:'The browser’s method that sends a copy of a value to the other thread.', ar:'ميثود المتصفح اللي بتبعت نسخة من القيمة للـ thread التاني.' } },
    { n:'Worker', k:'ng', w:{ en:'The browser’s class that starts a web worker.', ar:'الكلاس بتاع المتصفح اللي بيشغّل web worker.' } },
    { n:'onmessage', k:'ng', w:{ en:'The worker’s property for “a message came back”. All lower-case.', ar:'الـ property بتاعة الـ worker لما “رسالة ترجع”. كلها حروف صغيرة.' } },
    { n:'terminate', k:'ng', w:{ en:'The worker’s method that stops it.', ar:'الميثود بتاعة الـ worker اللي بتوقّفه.' } },
    { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
    { n:'date', k:'ng', only:['pf2'], w:{ en:'Angular’s built-in date pipe.', ar:'الـ pipe الجاهز بتاع التاريخ في أنجولار.' } },

    { n:'Admin', k:'pub', w:{ en:'Must match the class that <code>./admin</code> exports.', ar:'لازم يطابق الكلاس اللي <code>./admin</code> بيعمله export.' } },
    { n:'ADMIN', k:'pub', w:{ en:'Must match the constant that <code>./admin/routes</code> exports.', ar:'لازم يطابق الثابت اللي <code>./admin/routes</code> بيعمله export.' } },
    { n:'isAdmin', k:'pub', w:{ en:'Your guard function, exported from its own file.', ar:'الـ guard function بتاعتك، بيتعملها export من ملفها.' } },
    { n:'app-reviews', k:'pub', w:{ en:'A child component’s selector.', ar:'الـ selector بتاع component ابن.' } },
    { n:'app-revenue-chart', k:'pub', w:{ en:'A child component’s selector.', ar:'الـ selector بتاع component ابن.' } },
    { n:'sk', k:'mine', w:{ en:'Your CSS class for the skeleton.', ar:'كلاس الـ CSS بتاعك للـ skeleton.' } },
    { n:'rows', k:'mine', only:['ts'], w:{ en:'Your own signal, and later a parameter name. Both are local.', ar:'الـ signal بتاعتك، وبعدين اسم parameter. الاتنين محليين.' } },
    { n:'total', k:'mine', only:['ts'], w:{ en:'Your computed.', ar:'الـ computed بتاعك.' } },
    { n:'crunchTenThousandRows', k:'mine', w:{ en:'Your function inside the worker file.', ar:'الـ function بتاعتك جوه ملف الـ worker.' } },
    { n:'result', k:'mine', only:['ts'], w:{ en:'A local name in the worker, and a signal in the component. Unrelated; each is local.', ar:'اسم محلي في الـ worker، وsignal في الـ component. ملهمش علاقة ببعض؛ كل واحد محلي.' } },
    { n:'Report', k:'pub', w:{ en:'The component’s class name.', ar:'اسم كلاس الـ component.' } },
    { n:'Row', k:'pub', w:{ en:'Your data type.', ar:'نوع الداتا بتاعك.' } },
    { n:'run', k:'mine', w:{ en:'Your own method.', ar:'الميثود بتاعتك.' } },
    { n:'order', k:'mine', only:['pf2'], w:{ en:'The component’s own data. <code>placedAt</code> is a field on it.', ar:'الداتا بتاعة الـ component. و<code>placedAt</code> field فيها.' } },
  ]
}
};
