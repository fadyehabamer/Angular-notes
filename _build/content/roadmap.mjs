export default {
title:{en:'Can I get expert from this?', ar:'أقدر أبقى محترف من ده؟'},
lead:{
  en:`Short answer: <b>not on its own — and nothing else does either.</b> What is here takes you from knowing nothing to shipping real features with confidence. Expert comes from building things and hitting problems. Here is the honest path, what this magazine covers, and what it does not.`,
  ar:`الإجابة المختصرة: <b>لأ لوحدها — ولا أي حاجة تانية هتعمل كده.</b> اللي موجود هنا بياخدك من إنك متعرفش حاجة لحد ما تبني فيتشرز حقيقية وإنت واثق. لكن الاحتراف بييجي من إنك تبني وتقابل مشاكل. وده الطريق بصراحة، وإيه اللي المجلة بتغطيه وإيه اللي لأ.`
},
verdict:[
  {k:{en:'What the 48 topics + TypeScript get you',ar:'الـ 48 موضوع مع الـ TypeScript بيدوك إيه'},
   v:{en:'Everything from “what is a component” to security, testing, performance and server rendering. Worked through in order, with the projects, this is the full path from zero to senior-level knowledge. Knowledge is not the same as experience — but you will not be missing any.',
      ar:'كل حاجة من «الـ component ده إيه» لحد الأمان والتستنج والأداء والرندرة على السيرفر. ولو مشيت فيهم بالترتيب مع المشاريع، دي الطريق الكامل من الصفر لمعرفة مستوى سينيور. والمعرفة مش نفس الخبرة — بس مش هيكون ناقصك حاجة منها.'}},
  {k:{en:'What it does not get you',ar:'مش هيدوك إيه'},
   v:{en:'Judgement. Knowing three valid approaches is not the same as knowing which one this codebase wants, or when a rule should be broken. That only comes from shipping things and living with the consequences.',
      ar:'الحُكم. إنك تعرف تلات حلول كلهم صح مش زي إنك تعرف أنهي واحد الكود ده عايزه، ولا إمتى القاعدة تتكسر. وده بييجي بس من إنك تنشر حاجات وتعيش مع نتايجها.'}},
  {k:{en:'The honest timeline',ar:'المدة بصراحة'},
   v:{en:'Four to six months of consistent work to be genuinely useful on a team. Two years or so of building real things before the word <em>expert</em> is fair. Anyone promising less is selling something.',
      ar:'من أربع لست شهور شغل منتظم عشان تبقى مفيد فعلاً في فريق. وحوالي سنتين وإنت بتبني حاجات حقيقية قبل ما كلمة <em>محترف</em> تبقى منصفة. وأي حد بيوعدك بأقل من كده بيبيعلك حاجة.'}}
],
phases:[
  {
    n:'00', source:'typescript',
    when:{en:'3–5 days', ar:'3–5 أيام'},
    title:{en:'Learn just enough TypeScript', ar:'اتعلم TypeScript على قد ما تحتاج'},
    goal:{en:'Every Angular file is a TypeScript file. Skip this and you will spend weeks confused by error messages instead of by Angular.',
          ar:'كل ملف أنجولار هو ملف TypeScript. لو عديت الجزء ده هتقضي أسابيع متلخبط من رسايل الأخطاء بدل ما تكون متلخبط من أنجولار.'},
    build:{en:'Nothing to build yet. Read it once, then keep it open in a tab for the first month.',
           ar:'مفيش حاجة تبنيها لسه. اقراها مرة، وبعدين سيبها مفتوحة في تاب طول أول شهر.'}
  },
  {
    n:'01', source:'beginner',
    when:{en:'3–4 weeks', ar:'3–4 أسابيع'},
    title:{en:'Foundations', ar:'الأساسيات'},
    goal:{en:'Understand how a page appears, how to make a component, how state and the screen stay in sync, and how two components share a fact.',
          ar:'تفهم إزاي الصفحة بتظهر، وإزاي تعمل component، وإزاي الحالة والشاشة بيفضلوا متزامنين، وإزاي اتنين components بيتشاركوا معلومة.'},
    build:{en:'Build a to-do app, then a shopping cart. No server, no routing — just components, signals and a service. Finish them.',
           ar:'ابني تطبيق to-do، وبعدين عربة شراء. من غير سيرفر ولا routing — components وsignals وservice بس. وخلّصهم للآخر.'}
  },
  {
    n:'02', source:'intermediate',
    when:{en:'5–8 weeks', ar:'5–8 أسابيع'},
    title:{en:'Real applications', ar:'تطبيقات حقيقية'},
    goal:{en:'Multiple pages, a real server, forms that validate, and the two chapters that decide whether your app is fast.',
          ar:'صفحات متعددة، وسيرفر حقيقي، وforms بتتحقق، والفصلين اللي بيحددوا هل تطبيقك سريع ولا لأ.'},
    build:{en:'Rebuild the cart as a real store: a product list, a detail page, a checkout form, data from a public API. This is the project you show people.',
           ar:'أعد بناء الكارت كمتجر حقيقي: لستة منتجات، وصفحة تفاصيل، وفورم دفع، وداتا من API عام. ده المشروع اللي هتوريه للناس.'}
  },
  {
    n:'03', source:'advanced',
    when:{en:'4–6 weeks', ar:'4–6 أسابيع'},
    title:{en:'Production concerns', ar:'حاجات الإنتاج'},
    goal:{en:'Making it fast, rendering it on the server, and composing behaviour instead of copying it. Do not start here — none of it makes sense without phase 02.',
          ar:'تخليه سريع، وترندره على السيرفر، وتركّب السلوك بدل ما تنسخه. ومتبدأش من هنا — ولا حاجة فيهم هتبقى مفهومة من غير المرحلة 02.'},
    build:{en:'Take the store from phase 02 and make it measurably faster. Measure first, then defer, then go zoneless. Write down the numbers.',
           ar:'خد المتجر بتاع المرحلة 02 وخليه أسرع بشكل مقيس. قِس الأول، وبعدين defer، وبعدين zoneless. واكتب الأرقام.'}
  }
],
missing:[
  {group:{en:'Genuinely not covered yet', ar:'لسه مش متغطي فعلاً'},
   items:[
     {en:'Internationalisation — <code>$localize</code>, translation files, and right-to-left layouts', ar:'التدويل — <code>$localize</code> وملفات الترجمة وتخطيطات اليمين لليسار'},
     {en:'Accessibility as its own topic — semantics, focus order, screen readers, the CDK a11y tools', ar:'إتاحة الوصول كموضوع مستقل — الدلالات وترتيب الـ focus وقارئات الشاشة وأدوات a11y في الـ CDK'},
     {en:'Angular animations — <code>@angular/animations</code> and the newer CSS-first approach', ar:'الأنيميشن في أنجولار — <code>@angular/animations</code> والطريقة الجديدة المعتمدة على CSS'},
     {en:'Monorepos with Nx — generators, affected builds, enforced boundaries', ar:'الـ monorepos بـ Nx — المولّدات وbuilds المتأثرة والحدود المفروضة'},
     {en:'Deployment and CI in practice — environments, caching, rollbacks', ar:'النشر والـ CI عملياً — البيئات والتخزين المؤقت والتراجع'}
   ]},
  {group:{en:'And the part no page can give you', ar:'والجزء اللي مفيش صفحة تديهولك'},
   items:[
     {en:'Reading a large codebase you did not write, and finding your way around it', ar:'تقرا كود كبير إنت مكتبتوش، وتعرف تتحرك فيه'},
     {en:'Reviewing someone else&rsquo;s pull request and having a useful opinion', ar:'تراجع pull request لحد تاني ويبقى عندك رأي مفيد'},
     {en:'Debugging something in production at speed, with real users waiting', ar:'تصلّح حاجة في الإنتاج بسرعة، ومستخدمين حقيقيين مستنيين'},
     {en:'Deciding <em>not</em> to add a library, and defending that decision', ar:'تقرر إنك <em>متضيفش</em> مكتبة، وتدافع عن القرار ده'},
     {en:'Estimating work honestly, and saying no to a bad requirement', ar:'تقدّر الشغل بصدق، وتقول لأ لمتطلب وحش'}
   ]}
],
advice:[
  {k:{en:'Build, do not collect',ar:'ابني، متجمّعش'},
   v:{en:'Reading a topic teaches you the words. Building something with it teaches you the thing. After every topic here, use it in a project the same day — even badly.',
      ar:'قراية الموضوع بتعلّمك الكلمات. وبناء حاجة بيه بيعلّمك الحاجة نفسها. بعد كل موضوع هنا، استخدمه في مشروع في نفس اليوم — حتى لو بشكل وحش.'}},
  {k:{en:'Finish things',ar:'خلّص اللي بتبدأه'},
   v:{en:'Three finished small apps teach more than ten abandoned ambitious ones. The last 20% — empty states, errors, loading, a real deploy — is where the actual learning hides.',
      ar:'تلات تطبيقات صغيرة خلّصتهم بيعلّموك أكتر من عشرة كبار سيبتهم. الـ 20% الأخيرة — الحالات الفاضية، والأخطاء، والتحميل، والنشر الحقيقي — هي اللي التعلّم الحقيقي مخبي فيها.'}},
  {k:{en:'Read the errors',ar:'اقرا الأخطاء'},
   v:{en:'Angular error messages have codes like <code>NG0304</code>. Search that code, not the whole sentence. Every gotcha box in this magazine is an error somebody lost hours to.',
      ar:'رسايل أخطاء أنجولار ليها أكواد زي <code>NG0304</code>. دوّر على الكود ده، مش على الجملة كلها. وكل مربع «خد بالك» في المجلة دي هو ايرور حد ضيّع فيه ساعات.'}},
  {k:{en:'Do not skip ahead',ar:'متقفزش'},
   v:{en:'Zoneless and SSR are genuinely interesting and completely useless to you right now. Phase 03 without phase 02 is memorising, not learning.',
      ar:'الـ zoneless والـ SSR مواضيع ممتعة فعلاً ومش نافعاك دلوقتي خالص. المرحلة 03 من غير 02 دي حفظ مش تعلّم.'}},
  {k:{en:'Use the official docs as reference',ar:'استعمل الدوكس الرسمية كمرجع'},
   v:{en:'<a href="https://angular.dev">angular.dev</a> is excellent and always current. This magazine explains <em>why</em>; the docs are the complete <em>what</em>. You need both.',
      ar:'<a href="https://angular.dev">angular.dev</a> ممتازة ودايماً محدّثة. المجلة دي بتشرح <em>ليه</em>؛ والدوكس هي <em>إيه</em> كاملة. محتاج الاتنين.'}},
  {k:{en:'Read code that is better than yours',ar:'اقرا كود أحسن من بتاعك'},
   v:{en:'Angular is open source. When something surprises you, open the source of that function — you will be surprised how readable it is, and you will stop guessing.',
      ar:'أنجولار مفتوح المصدر. وأول ما حاجة تفاجئك، افتح كود الدالة دي — هتتفاجئ إنها مقروءة، وهتبطّل تخمين.'}}
]};
