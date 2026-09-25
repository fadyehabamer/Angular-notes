/* names for the micro frontends (Native Federation) topic.
   n: the name exactly as typed in the code.   k: ng | mine | pub.
   w: what it is, and what has to change with it.   { en, ar }
   re / only / as: see _build/names.mjs.                                  */
export default {
'micro-frontends': {
  note: {
    en: 'Federation is held together by plain strings that two separately deployed apps must agree on: the remote’s name, the exposed path <code>./routes</code>, and the exported <code>CHECKOUT_ROUTES</code>. No compiler checks them across the two builds. A mismatch shows up only at runtime, in front of a user.',
    ar: 'الـ federation متماسك بـ strings عادية لازم تطبيقين بيتعملهم deploy كل واحد لوحده يتفقوا عليها: اسم الـ remote، والمسار المكشوف <code>./routes</code>، و<code>CHECKOUT_ROUTES</code> اللي متعمله export. مفيش كومبايلر بيشيّكهم بين البيلدين. لو مش متطابقين هتعرف بس وقت التشغيل، قدام اليوزر.'
  },
  names: [
    { n:'module.exports', k:'ng', w:{ en:'Node’s CommonJS way to export the config object.', ar:'طريقة Node (CommonJS) إنك تعمل export لأوبجكت الإعدادات.' } },
    { n:'withNativeFederation', k:'ng', w:{ en:'Native Federation’s config helper.', ar:'الـ helper بتاع Native Federation للإعدادات.' } },
    { n:'name', k:'ng', only:['remote'], w:{ en:'A config key Native Federation reads. The value is yours, see <code>checkout</code>.', ar:'مفتاح إعداد Native Federation بيقراه. القيمة بتاعتك، بص على <code>checkout</code>.' } },
    { n:'exposes', k:'ng', w:{ en:'A config key: what this remote offers to others. The keys inside it are yours.', ar:'مفتاح إعداد: الحاجات اللي الـ remote ده بيقدّمها للباقيين. المفاتيح اللي جواه بتاعتك.' } },
    { n:'shared', k:'ng', only:['remote'], w:{ en:'A config key: which packages the apps share instead of each loading its own copy.', ar:'مفتاح إعداد: أنهي باكدجات التطبيقات بتتشاركها بدل ما كل واحد يحمّل نسخته.' } },
    { n:'shareAll', k:'ng', w:{ en:'Native Federation’s helper: share every dependency in <code>package.json</code>.', ar:'helper من Native Federation: شارك كل الـ dependencies اللي في <code>package.json</code>.' } },
    { n:'singleton', k:'ng', w:{ en:'A sharing option: exactly one copy at runtime.', ar:'option للمشاركة: نسخة واحدة بس وقت التشغيل.' } },
    { n:'strictVersion', k:'ng', w:{ en:'A sharing option: fail if the versions do not match.', ar:'option للمشاركة: افشل لو الفيرجنز مش متطابقة.' } },
    { n:'requiredVersion', k:'ng', w:{ en:'A sharing option. <code>\'auto\'</code> reads it from <code>package.json</code>.', ar:'option للمشاركة. <code>\'auto\'</code> بيقراها من <code>package.json</code>.' } },
    { n:'loadRemoteModule', k:'ng', w:{ en:'Native Federation’s function that fetches a remote at runtime.', ar:'الـ function بتاعة Native Federation اللي بتجيب الـ remote وقت التشغيل.' } },
    { n:'remoteName', k:'ng', w:{ en:'An option key <code>loadRemoteModule</code> reads.', ar:'مفتاح إعداد <code>loadRemoteModule</code> بيقراه.' } },
    { n:'exposedModule', k:'ng', w:{ en:'An option key <code>loadRemoteModule</code> reads.', ar:'مفتاح إعداد <code>loadRemoteModule</code> بيقراه.' } },
    { n:'Routes', k:'ng', w:{ en:'Angular’s type for a route list.', ar:'الـ type بتاع أنجولار لقايمة routes.' } },
    { n:'path', k:'ng', only:['shell'], w:{ en:'A route key Angular reads. The URL text you give it is yours.', ar:'مفتاح route أنجولار بيقراه. نص الـ URL اللي بتحطه فيه بتاعك.' } },
    { n:'component', k:'ng', only:['shell'], w:{ en:'A route key Angular reads.', ar:'مفتاح route أنجولار بيقراه.' } },
    { n:'loadChildren', k:'ng', w:{ en:'A route key Angular reads: load these child routes lazily.', ar:'مفتاح route أنجولار بيقراه: حمّل الـ routes الفرعية دي lazy.' } },
    { n:'depConstraints', k:'ng', w:{ en:'A key the Nx boundaries lint rule reads.', ar:'مفتاح قاعدة الـ lint بتاعة Nx للحدود بتقراه.' } },
    { n:'sourceTag', k:'ng', w:{ en:'A key the Nx boundaries lint rule reads.', ar:'مفتاح قاعدة الـ lint بتاعة Nx للحدود بتقراه.' } },
    { n:'onlyDependOnLibsWithTags', k:'ng', w:{ en:'A key the Nx boundaries lint rule reads.', ar:'مفتاح قاعدة الـ lint بتاعة Nx للحدود بتقراه.' } },

    { n:'checkout', k:'pub', re:'(?<=(?:name|remoteName): \')checkout(?=\')',
      w:{ en:'The remote’s name. The shell asks for it with <code>remoteName</code> (and lists it in its federation manifest). Rename it in both apps together. The other <code>checkout</code> words (the URL path, the folder) are separate.',
          ar:'اسم الـ remote. الـ shell بيطلبه بـ <code>remoteName</code> (وبيكتبه في الـ federation manifest بتاعه). غيّره في التطبيقين مع بعض. وكلمات <code>checkout</code> التانية (مسار الـ URL والفولدر) حاجات تانية.' } },
    { n:'./routes', k:'pub', as:'./entry',
      w:{ en:'The exposed key. The shell types it again as <code>exposedModule</code>. A mismatch fails only at runtime.',
          ar:'المفتاح المكشوف. الـ shell بيكتبه تاني في <code>exposedModule</code>. لو مش زي بعض هيفشل بس وقت التشغيل.' } },
    { n:'CHECKOUT_ROUTES', k:'pub',
      w:{ en:'The constant exported from the remote’s <code>checkout.routes.ts</code>. The shell reads <code>m.CHECKOUT_ROUTES</code>, so both sides change together.',
          ar:'الـ constant المتعمله export من <code>checkout.routes.ts</code> في الـ remote. الـ shell بيقرا <code>m.CHECKOUT_ROUTES</code>، فالناحيتين بيتغيروا مع بعض.' } },
    { n:'routes', k:'pub', re:'(?<=const )routes(?![\\w$-])',
      w:{ en:'The shell’s route list, imported by <code>app.config.ts</code> for <code>provideRouter(routes)</code>.', ar:'قايمة الـ routes بتاعة الـ shell، و<code>app.config.ts</code> بيعملها import عشان <code>provideRouter(routes)</code>.' } },
    { n:'Home', k:'pub', w:{ en:'Your component class, imported from its own file.', ar:'كلاس الـ component بتاعك، متعمله import من الملف بتاعه.' } },
    { n:'scope:checkout', k:'pub', as:'scope:pickup',
      w:{ en:'A tag you invented. Each library declares its tags in its own project config, and this rule must type them the same way.',
          ar:'tag انت اخترعته. كل library بتعلن الـ tags بتاعتها في إعدادات المشروع بتاعها، والقاعدة دي لازم تكتبها بنفس الشكل.' } },
    { n:'scope:catalogue', k:'pub', as:'scope:shelf', w:{ en:'Another tag you invented, shared with the libraries’ config.', ar:'tag تاني انت اخترعته، متشارك مع إعدادات الـ libraries.' } },
    { n:'scope:shared', k:'pub', as:'scope:common', w:{ en:'Another tag you invented, shared with the libraries’ config.', ar:'tag تاني انت اخترعته، متشارك مع إعدادات الـ libraries.' } },
  ]
}
};
