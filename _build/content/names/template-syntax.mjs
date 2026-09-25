/* names for the template-syntax topic.
   n: the name exactly as typed in the code.   k: ng | mine | pub.
   w: what it is, and what has to change with it.   { en, ar }
   re / only / as: see _build/names.mjs.                                  */
export default {
'template-syntax': {
  note: {
    en: 'A template can only read names its own class declares, plus the few it declares itself (<code>#box</code>, <code>@let sub</code>). So almost every name inside <code>{{ }}</code> is yours; the brackets, the <code>@</code> words and the pipes are Angular’s, and the property names in <code>[ ]</code> and <code>( )</code> are the browser’s.',
    ar: 'التمبلت يقدر يقرا بس الأسماء اللي الكلاس بتاعه معلنها، زائد شوية بيعلنهم هو بنفسه (<code>#box</code> و<code>@let sub</code>). فتقريباً كل اسم جوه <code>{{ }}</code> بتاعك؛ والأقواس وكلمات الـ <code>@</code> والـ pipes بتاعة أنجولار، وأسماء الـ properties اللي جوه <code>[ ]</code> و<code>( )</code> بتاعة المتصفح.'
  },
  names: [
    { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
    { n:'set', k:'ng', w:{ en:'A signal method: replace the value.', ar:'ميثود بتاعة الـ signal: بتستبدل القيمة.' } },
    { n:'computed', k:'ng', w:{ en:'Angular’s derived signal.', ar:'الـ signal المشتقة بتاعة أنجولار.' } },
    { n:'toUpperCase', k:'ng',
      w:{ en:'JavaScript’s own string method. Allowed in a template because it is cheap and changes nothing.',
          ar:'ميثود الـ string بتاعة JavaScript نفسها. مسموحة في التمبلت عشان خفيفة ومش بتغيّر حاجة.' } },
    { n:'src', k:'ng',
      w:{ en:'A real DOM property of <code>&lt;img&gt;</code>. The browser owns the name.',
          ar:'property حقيقية في الـ DOM بتاعة <code>&lt;img&gt;</code>. الاسم بتاع المتصفح.' } },
    { n:'click', k:'ng',
      w:{ en:'The browser’s own event name.', ar:'اسم الـ event بتاع المتصفح نفسه.' } },
    { n:'value', k:'ng',
      w:{ en:'The DOM property that holds what was typed into the <code>&lt;input&gt;</code>. The browser owns it.',
          ar:'الـ property في الـ DOM اللي فيها اللي اتكتب في الـ <code>&lt;input&gt;</code>. بتاعة المتصفح.' } },
    { n:'@let', k:'ng',
      w:{ en:'Angular’s keyword for a read-only variable in the template. The name after it is yours.',
          ar:'كلمة أنجولار لمتغير read-only في التمبلت. الاسم اللي بعدها بتاعك.' } },
    { n:'@if', k:'ng', w:{ en:'Angular’s if in the template.', ar:'الـ if بتاعة أنجولار في التمبلت.' } },
    { n:'currency', k:'ng',
      w:{ en:'A built-in Angular pipe. The <code>\'EGP\'</code> after it is your choice of currency.',
          ar:'pipe جاهزة من أنجولار. و<code>\'EGP\'</code> اللي بعدها اختيارك انت للعملة.' } },

    { n:'name', k:'mine', only:['ts','tpl'],
      w:{ en:'The component’s own signal, read and set by its own template.', ar:'الـ signal بتاعة الـ component، والتمبلت بتاعه بيقراها ويغيّرها.' } },
    { n:'age', k:'mine', w:{ en:'The component’s own signal.', ar:'الـ signal بتاعة الـ component.' } },
    { n:'user', k:'mine',
      w:{ en:'The component’s own signal. It may be <code>null</code>, hence the <code>?.</code>.',
          ar:'الـ signal بتاعة الـ component. ممكن تبقى <code>null</code>، عشان كده الـ <code>?.</code>.' } },
    { n:'tags', k:'mine', w:{ en:'The component’s own signal.', ar:'الـ signal بتاعة الـ component.' } },
    { n:'greet', k:'mine', w:{ en:'The component’s own method.', ar:'الميثود بتاعة الـ component.' } },
    { n:'box', k:'mine',
      w:{ en:'A template reference: <code>#box</code> names the element, and only this template can use the name.',
          ar:'template reference: <code>#box</code> بيسمّي العنصر، والتمبلت ده بس اللي يقدر يستخدم الاسم.' } },
    { n:'sub', k:'mine',
      w:{ en:'The name you gave with <code>@let</code>. It exists only inside this template block.',
          ar:'الاسم اللي ادّيته بـ <code>@let</code>. موجود بس جوه البلوك ده في التمبلت.' } },
    { n:'User', k:'pub',
      w:{ en:'Your data type. Every file that imports it follows a rename.', ar:'نوع الداتا بتاعك. أي ملف بيعمله import بيتغير معاه.' } },
    { n:'email', k:'pub', re:'(?<=\\?\\.)email(?![\\w$-])',
      w:{ en:'A field on your <code>User</code> type. Renaming it means changing the type and everything that reads it. The word in <code>\'no email on file\'</code> is just text.',
          ar:'field في الـ type بتاع <code>User</code>. لو غيّرته لازم تغيّر الـ type وكل حاجة بتقراه. والكلمة اللي في <code>\'no email on file\'</code> مجرد كلام.' } },
    { n:'order', k:'mine', re:'(?<![\\w$-])order(?=\\()',
      w:{ en:'The component’s own signal holding the order.', ar:'الـ signal بتاعة الـ component اللي فيها الأوردر.' } },
    { n:'isBulk', k:'mine', w:{ en:'A computed in the class, named so the template reads well.', ar:'computed في الكلاس، متسمّي عشان التمبلت يتقري بسهولة.' } },
    { n:'needsApproval', k:'mine', w:{ en:'A computed in the class.', ar:'computed في الكلاس.' } },
    { n:'withVat', k:'mine', w:{ en:'A computed in the class.', ar:'computed في الكلاس.' } },
    { n:'label', k:'mine', w:{ en:'A computed in the class.', ar:'computed في الكلاس.' } },
  ]
}
};
