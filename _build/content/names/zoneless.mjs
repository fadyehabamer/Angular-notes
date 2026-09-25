/* names for the zoneless change detection topic.
   n: the name exactly as typed in the code.   k: ng | mine | pub.
   w: what it is, and what has to change with it.   { en, ar }
   re / only / as: see _build/names.mjs.                                  */
export default {
'zoneless': {
  note: {
    en: 'Going zoneless is almost all fixed words: one provider to add and one polyfill entry to remove. The names you own here are ordinary fields; what matters is whether they are <b>signals</b> (the screen updates) or plain fields (it freezes).',
    ar: 'التحويل لـ zoneless تقريباً كله كلمات ثابتة: provider واحد تضيفه وسطر polyfill واحد تشيله. الأسامي اللي بتاعتك هنا fields عادية؛ المهم هي <b>signals</b> (الشاشة بتتحدث) ولا fields عادية (الشاشة بتتجمد).'
  },
  names: [
    { n:'provideZonelessChangeDetection', k:'ng',
      w:{ en:'Angular’s provider that turns zone.js-based change detection off. Type it exactly.',
          ar:'الـ provider بتاع أنجولار اللي بيقفل الـ change detection المعتمد على zone.js. اكتبه بالظبط.' } },
    { n:'ApplicationConfig', k:'ng', w:{ en:'Angular’s type for the app’s startup config.', ar:'النوع بتاع أنجولار لإعدادات تشغيل التطبيق.' } },
    { n:'providers', k:'ng', w:{ en:'Angular’s list of app-wide providers.', ar:'قايمة أنجولار بالـ providers بتاعة التطبيق كله.' } },
    { n:'provideRouter', k:'ng', w:{ en:'Angular’s router provider.', ar:'الـ provider بتاع الراوتر من أنجولار.' } },
    { n:'provideHttpClient', k:'ng', w:{ en:'Angular’s HTTP provider.', ar:'الـ provider بتاع HTTP من أنجولار.' } },
    { n:'withFetch', k:'ng', w:{ en:'An Angular option for <code>provideHttpClient</code>: use the browser’s <code>fetch</code>.', ar:'إعداد من أنجولار لـ <code>provideHttpClient</code>: استخدم <code>fetch</code> بتاع المتصفح.' } },
    { n:'polyfills', k:'ng', w:{ en:'A key the Angular CLI reads in <code>angular.json</code>.', ar:'مفتاح الـ Angular CLI بيقراه في <code>angular.json</code>.' } },
    { n:'zone.js', k:'ng', w:{ en:'The zone.js library’s package name. Zoneless means this entry goes away.', ar:'اسم باكدج مكتبة zone.js. الـ zoneless معناه إن السطر ده يتشال.' } },
    { n:'provideZoneChangeDetection', k:'ng',
      w:{ en:'Angular’s provider for the classic zone.js mode, with options.', ar:'الـ provider بتاع أنجولار للطريقة القديمة بـ zone.js، مع إعدادات.' } },
    { n:'eventCoalescing', k:'ng', w:{ en:'An option key Angular reads: group events from one tick into one check.', ar:'مفتاح إعداد أنجولار بيقراه: لمّ الـ events اللي في نفس اللحظة في تشييك واحد.' } },
    { n:'signal', k:'ng', w:{ en:'Angular’s writable signal. Writing it is what tells Angular to repaint.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب. الكتابة فيها هي اللي بتقول لأنجولار يعيد الرسم.' } },
    { n:'set', k:'ng', w:{ en:'A signal method.', ar:'ميثود بتاعة الـ signal.' } },
    { n:'inject', k:'ng', w:{ en:'Angular’s function that hands you a service.', ar:'الـ function بتاعة أنجولار اللي بتديك سيرفس.' } },
    { n:'DestroyRef', k:'ng', w:{ en:'Angular’s handle on “this component is being destroyed”.', ar:'الـ handle بتاع أنجولار لـ “الـ component ده بيتشال”.' } },
    { n:'onDestroy', k:'ng', w:{ en:'A <code>DestroyRef</code> method: run this cleanup at the end.', ar:'ميثود في <code>DestroyRef</code>: شغّل التنضيف ده في الآخر.' } },
    { n:'setInterval', k:'ng', w:{ en:'The browser’s timer function.', ar:'function التايمر بتاعة المتصفح.' } },
    { n:'clearInterval', k:'ng', w:{ en:'The browser’s function that stops a timer.', ar:'function المتصفح اللي بتوقف تايمر.' } },
    { n:'Date', k:'ng', w:{ en:'JavaScript’s date class.', ar:'كلاس التاريخ بتاع JavaScript.' } },
    { n:'NgZone', k:'ng', w:{ en:'Angular’s zone.js service. Zoneless code does not need it.', ar:'سيرفس zone.js من أنجولار. الكود الـ zoneless مش محتاجه.' } },
    { n:'run', k:'ng', w:{ en:'An <code>NgZone</code> method: run this inside Angular’s zone so it notices.', ar:'ميثود في <code>NgZone</code>: شغّل ده جوه الـ zone بتاعة أنجولار عشان ياخد باله.' } },
    { n:'MapSdk', k:'ng', w:{ en:'The map library’s class. Not yours, not Angular’s: the library decides the name.', ar:'كلاس مكتبة الخرايط. مش بتاعك ولا بتاع أنجولار: المكتبة هي اللي بتحدد الاسم.' } },
    { n:'LatLng', k:'ng', w:{ en:'The map library’s coordinate type.', ar:'نوع الإحداثيات بتاع مكتبة الخرايط.' } },
    { n:'on', k:'ng', re:'(?<=\\.)on(?=\\()', w:{ en:'The map library’s method for listening to its events.', ar:'ميثود مكتبة الخرايط عشان تسمع الـ events بتاعتها.' } },
    { n:'moveend', k:'ng', w:{ en:'The map library’s own event name.', ar:'اسم الـ event بتاع مكتبة الخرايط نفسها.' } },
    { n:'getCenter', k:'ng', w:{ en:'A map library method.', ar:'ميثود في مكتبة الخرايط.' } },
    { n:'destroy', k:'ng', w:{ en:'A map library method that cleans the map up.', ar:'ميثود في مكتبة الخرايط بتنضّف الخريطة.' } },

    { n:'appConfig', k:'pub', w:{ en:'Your exported config. <code>main.ts</code> imports it by this name, so both files change together.', ar:'الـ config بتاعك المتصدّر. <code>main.ts</code> بيعمله import بالاسم ده، فالملفين بيتغيروا مع بعض.' } },
    { n:'routes', k:'pub', w:{ en:'Your route list, imported from <code>app.routes.ts</code>.', ar:'ليستة الـ routes بتاعتك، جاية import من <code>app.routes.ts</code>.' } },
    { n:'Clock', k:'pub', w:{ en:'Your component’s class name.', ar:'اسم كلاس الـ component بتاعك.' } },
    { n:'Legacy', k:'pub', w:{ en:'Your component’s class name.', ar:'اسم كلاس الـ component بتاعك.' } },
    { n:'now', k:'mine', w:{ en:'The component’s own field (a signal in <code>Clock</code>, a plain field in <code>Legacy</code>). Only its template reads it.', ar:'الـ field بتاع الـ component نفسه (signal في <code>Clock</code>، وfield عادي في <code>Legacy</code>). التمبلت بتاعه بس اللي بيقراه.' } },
    { n:'id', k:'mine', w:{ en:'A local variable holding the timer id.', ar:'متغير محلي شايل رقم التايمر.' } },
    { n:'zone', k:'mine', w:{ en:'Your field name for the injected <code>NgZone</code>.', ar:'اسم الـ field بتاعك للـ <code>NgZone</code> اللي اتعمله inject.' } },
    { n:'center', k:'mine', w:{ en:'The component’s own field, read by its template.', ar:'الـ field بتاع الـ component، والتمبلت بتاعه بيقراه.' } },
    { n:'map', k:'mine', re:'(?<![\\w$#-])map(?![\\w$-])',
      w:{ en:'Your variable holding the map. <code>\'#map\'</code> is the id of the element in the page, a different name.', ar:'المتغير بتاعك اللي شايل الخريطة. و<code>\'#map\'</code> ده id العنصر في الصفحة، اسم تاني.' } },
  ]
}
};
