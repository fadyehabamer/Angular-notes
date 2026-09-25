/* names for the PWA / service worker topic.
   n: the name exactly as typed in the code.   k: ng | mine | pub.
   w: what it is, and what has to change with it.   { en, ar }
   re / only / as: see _build/names.mjs.                                  */
export default {
'pwa': {
  note: {
    en: 'Almost every key in <code>ngsw-config.json</code> is Angular’s: the service worker ignores a key it does not know, so a typo there fails silently. The group <code>"name"</code> values are yours. In the TypeScript, <code>SwUpdate</code> and its members are Angular’s; the class and field names around them are yours.',
    ar: 'تقريباً كل مفتاح في <code>ngsw-config.json</code> بتاع أنجولار: الـ service worker بيتجاهل أي مفتاح مايعرفوش، فأي غلطة إملائية هناك بتعدّي من غير ما حد يقولك. وقيم <code>"name"</code> بتاعة الجروبات بتاعتك. وفي الـ TypeScript، <code>SwUpdate</code> وكل اللي فيه بتاع أنجولار؛ وأسماء الكلاس والـ fields اللي حواليه بتاعتك.'
  },
  names: [
    { n:'assetGroups', k:'ng', w:{ en:'An Angular service-worker config key: files that belong to this version of the app.', ar:'مفتاح في إعدادات الـ service worker بتاعة أنجولار: الملفات اللي تبع النسخة دي من التطبيق.' } },
    { n:'dataGroups', k:'ng', w:{ en:'An Angular service-worker config key: API responses to cache.', ar:'مفتاح في إعدادات الـ service worker بتاعة أنجولار: ردود الـ API اللي هتتكاش.' } },
    { n:'installMode', k:'ng', w:{ en:'An Angular service-worker config key.', ar:'مفتاح في إعدادات الـ service worker بتاعة أنجولار.' } },
    { n:'updateMode', k:'ng', w:{ en:'An Angular service-worker config key.', ar:'مفتاح في إعدادات الـ service worker بتاعة أنجولار.' } },
    { n:'prefetch', k:'ng', w:{ en:'Angular’s value: download now, before anyone asks.', ar:'قيمة من أنجولار: نزّل دلوقتي، قبل ما حد يطلب.' } },
    { n:'lazy', k:'ng', w:{ en:'Angular’s value: cache a file the first time it is used.', ar:'قيمة من أنجولار: كاش الملف أول مرة يتستخدم.' } },
    { n:'strategy', k:'ng', w:{ en:'An Angular service-worker config key.', ar:'مفتاح في إعدادات الـ service worker بتاعة أنجولار.' } },
    { n:'freshness', k:'ng', w:{ en:'Angular’s value: network first, cache as the fallback.', ar:'قيمة من أنجولار: الشبكة الأول، والكاش لو فشلت.' } },
    { n:'performance', k:'ng', only:['json'], w:{ en:'Angular’s value: cache first.', ar:'قيمة من أنجولار: الكاش الأول.' } },
    { n:'api-fresh', k:'mine', w:{ en:'A group name you chose. It only labels the cache.', ar:'اسم جروب انت اخترته. مجرد اسم للكاش.' } },
    { n:'api-static', k:'mine', w:{ en:'A group name you chose.', ar:'اسم جروب انت اخترته.' } },

    { n:'SwUpdate', k:'ng', w:{ en:'Angular’s service for service-worker updates.', ar:'الـ service بتاعة أنجولار لتحديثات الـ service worker.' } },
    { n:'VersionReadyEvent', k:'ng', w:{ en:'Angular’s type for “a new version is downloaded and waiting”.', ar:'الـ type بتاع أنجولار لـ “فيه نسخة جديدة نزلت ومستنية”.' } },
    { n:'VERSION_READY', k:'ng', w:{ en:'Angular’s event type string. It must be spelled exactly.', ar:'نص نوع الـ event بتاع أنجولار. لازم يتكتب بالظبط.' } },
    { n:'isEnabled', k:'ng', w:{ en:'A <code>SwUpdate</code> property: false in dev and in browsers without service workers.', ar:'property في <code>SwUpdate</code>: بتبقى false في الـ dev وفي المتصفحات اللي مافيهاش service workers.' } },
    { n:'versionUpdates', k:'ng', w:{ en:'A <code>SwUpdate</code> stream of update events.', ar:'stream في <code>SwUpdate</code> فيه أحداث التحديث.' } },
    { n:'activateUpdate', k:'ng', w:{ en:'A <code>SwUpdate</code> method: switch to the waiting version.', ar:'ميثود في <code>SwUpdate</code>: اتنقل للنسخة المستنية.' } },
    { n:'checkForUpdate', k:'ng', w:{ en:'A <code>SwUpdate</code> method: ask the server now.', ar:'ميثود في <code>SwUpdate</code>: اسأل السيرفر دلوقتي.' } },
    { n:'type', k:'ng', only:['ts'], w:{ en:'A property every update event has.', ar:'property موجودة في أي event تحديث.' } },
    { n:'takeUntilDestroyed', k:'ng', w:{ en:'Angular’s RxJS operator that unsubscribes when the class is destroyed.', ar:'operator من أنجولار للـ RxJS بيعمل unsubscribe لما الكلاس يتشال.' } },
    { n:'location.reload', k:'ng', w:{ en:'The browser’s page reload.', ar:'الـ reload بتاع الصفحة من المتصفح.' } },
    { n:'@Injectable', k:'ng', w:{ en:'Angular’s decorator for a service.', ar:'الـ decorator بتاع أنجولار للـ service.' } },
    { n:'providedIn', k:'ng', w:{ en:'An option key Angular reads.', ar:'مفتاح إعداد أنجولار بيقراه.' } },
    { n:'inject', k:'ng', only:['ts'], w:{ en:'Angular’s function that hands you a service.', ar:'الـ function بتاعة أنجولار اللي بتديك service.' } },

    { n:'Updates', k:'pub', w:{ en:'Your service class. Whoever injects it (usually the root component) types this name.', ar:'كلاس الـ service بتاعك. أي حد بيعمله inject (غالباً الـ component الرئيسي) بيكتب الاسم ده.' } },
    { n:'sw', k:'mine', w:{ en:'Your name for the injected <code>SwUpdate</code>.', ar:'اسمك للـ <code>SwUpdate</code> اللي عملته inject.' } },
    { n:'toasts', k:'mine', w:{ en:'Your field holding your own toast service.', ar:'الـ field بتاعك اللي شايل service الـ toast بتاعتك.' } },
    { n:'Toasts', k:'pub', w:{ en:'Your toast service class, defined in another file.', ar:'كلاس service الـ toast بتاعك، متعرّف في ملف تاني.' } },
    { n:'action', k:'pub', w:{ en:'A method on your <code>Toasts</code> service. Rename it there and here.', ar:'ميثود في service الـ <code>Toasts</code> بتاعتك. غيّرها هناك وهنا.' } },

    { n:'Network', k:'pub', w:{ en:'Your service class, injected by any component that shows the offline bar.', ar:'كلاس الـ service بتاعك، أي component بيعرض شريط الأوفلاين بيعمله inject.' } },
    { n:'online', k:'pub', re:'(?<![\\w$\'-])online(?![\\w$\'-])',
      w:{ en:'Your signal. Templates read <code>network.online()</code>, so they change with it. <code>\'online\'</code> in quotes is the browser’s event, a different name.',
          ar:'الـ signal بتاعتك. التمبلتس بتقرا <code>network.online()</code>، فبتتغير معاها. و<code>\'online\'</code> اللي بين علامات التنصيص ده الـ event بتاع المتصفح، اسم تاني.' } },
    { n:'\'online\'', k:'ng', w:{ en:'The browser’s event name for “the connection is back”.', ar:'اسم الـ event بتاع المتصفح لـ “النت رجع”.' } },
    { n:'\'offline\'', k:'ng', w:{ en:'The browser’s event name for “the connection dropped”.', ar:'اسم الـ event بتاع المتصفح لـ “النت قطع”.' } },
    { n:'navigator.onLine', k:'ng', w:{ en:'The browser’s current connection state.', ar:'حالة الاتصال الحالية من المتصفح.' } },
    { n:'addEventListener', k:'ng', w:{ en:'The browser’s way to listen for an event.', ar:'طريقة المتصفح إنك تسمع لـ event.' } },
    { n:'removeEventListener', k:'ng', w:{ en:'The browser’s way to stop listening. It needs the same function you added.', ar:'طريقة المتصفح إنك تبطّل تسمع. محتاجة نفس الـ function اللي ضفتها.' } },
    { n:'DestroyRef', k:'ng', w:{ en:'Angular’s handle for “when this is destroyed”. <code>onDestroy</code> is its method.', ar:'المسكة بتاعة أنجولار لـ “لما ده يتشال”. و<code>onDestroy</code> ميثود فيه.' } },
    { n:'onDestroy', k:'ng', w:{ en:'A <code>DestroyRef</code> method.', ar:'ميثود في <code>DestroyRef</code>.' } },
    { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
    { n:'on', k:'mine', only:['off'], w:{ en:'Your name for the handler. Add and remove must pass the same one.', ar:'اسمك للـ handler. الـ add والـ remove لازم ياخدوا نفس الواحد.' } },
    { n:'off', k:'mine', only:['off'], w:{ en:'Your name for the other handler.', ar:'اسمك للـ handler التاني.' } },
  ]
}
};
