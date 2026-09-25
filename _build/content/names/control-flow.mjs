/* names for the control-flow topic.
   n: the name exactly as typed in the code.   k: ng | mine | pub.
   w: what it is, and what has to change with it.   { en, ar }
   re / only / as: see _build/names.mjs.                                  */
export default {
'control-flow': {
  note: {
    en: 'Every word that starts with <code>@</code>, plus <code>track</code>, is Angular’s. The loop variable you name in <code>@for (order of orders())</code> is yours and lives only inside that block.',
    ar: 'أي كلمة بتبدأ بـ <code>@</code>، ومعاهم <code>track</code>، بتاعة أنجولار. ومتغير الـ loop اللي بتسمّيه في <code>@for (order of orders())</code> بتاعك وعايش جوه البلوك ده بس.'
  },
  names: [
    { n:'@if', k:'ng', w:{ en:'Angular’s if in the template.', ar:'الـ if بتاعة أنجولار في التمبلت.' } },
    { n:'@else', k:'ng',
      w:{ en:'Angular’s else, and <code>@else if</code> for another condition.', ar:'الـ else بتاعة أنجولار، و<code>@else if</code> لشرط تاني.' } },
    { n:'@for', k:'ng', w:{ en:'Angular’s loop in the template.', ar:'الـ loop بتاع أنجولار في التمبلت.' } },
    { n:'track', k:'ng',
      w:{ en:'Angular’s required word inside <code>@for</code>: how to tell items apart. The expression after it is yours.',
          ar:'كلمة أنجولار الإجبارية جوه <code>@for</code>: إزاي يفرّق بين العناصر. اللي بعدها بتاعك.' } },
    { n:'@empty', k:'ng',
      w:{ en:'Angular’s block that shows when the <code>@for</code> list is empty.', ar:'بلوك أنجولار اللي بيظهر لما ليستة الـ <code>@for</code> تبقى فاضية.' } },
    { n:'@switch', k:'ng', w:{ en:'Angular’s switch in the template.', ar:'الـ switch بتاعة أنجولار في التمبلت.' } },
    { n:'@case', k:'ng',
      w:{ en:'One branch of <code>@switch</code>. The value in brackets is yours and must match your data.',
          ar:'فرع واحد من <code>@switch</code>. القيمة اللي بين القوسين بتاعتك ولازم تبقى زي الداتا بتاعتك.' } },
    { n:'@default', k:'ng', w:{ en:'The branch when no <code>@case</code> matched.', ar:'الفرع اللي بيشتغل لما مفيش <code>@case</code> طابق.' } },
    { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
    { n:'set', k:'ng', w:{ en:'A signal method: replace the value.', ar:'ميثود بتاعة الـ signal: بتستبدل القيمة.' } },
    { n:'update', k:'ng', w:{ en:'A signal method: compute the new value from the old one.', ar:'ميثود بتاعة الـ signal: بتحسب القيمة الجديدة من القديمة.' } },
    { n:'computed', k:'ng', w:{ en:'Angular’s derived signal.', ar:'الـ signal المشتقة بتاعة أنجولار.' } },
    { n:'input', k:'ng', only:['row'],
      w:{ en:'Angular’s function that creates an input.', ar:'الـ function بتاعة أنجولار اللي بتعمل input.' } },
    { n:'routerLink', k:'ng', w:{ en:'Angular’s link directive.', ar:'الـ directive بتاع أنجولار للينكات.' } },

    { n:'orders', k:'mine', re:'(?<![\\w$-])(?<!No )orders(?![\\w$-])',
      w:{ en:'The component’s own signal, read by its own template.', ar:'الـ signal بتاعة الـ component، والتمبلت بتاعه بيقراها.' } },
    { n:'loading', k:'mine', w:{ en:'The component’s own signal.', ar:'الـ signal بتاعة الـ component.' } },
    { n:'addFirst', k:'mine', w:{ en:'The component’s own method.', ar:'الميثود بتاعة الـ component.' } },
    { n:'Order', k:'pub',
      w:{ en:'Your data type. Every file that imports it follows a rename.', ar:'نوع الداتا بتاعك. أي ملف بيعمله import بيتغير معاه.' } },
    { n:'order', k:'pub', re:'(?<![\\w$.-])order(?=\\]|\\(\\)| = input)',
      w:{ en:'The row’s (and the badge’s) input: the parent sets it with <code>[order]</code>. The loop variable <code>order</code> in <code>@for (order of …)</code> is a separate, template-only name that happens to share the spelling.',
          ar:'الـ input بتاع الصف (وبتاع البادج): الأب بيحطه بـ <code>[order]</code>. ومتغير الـ loop <code>order</code> في <code>@for (order of …)</code> اسم تاني خاص بالتمبلت، صدفة ليه نفس الكتابة.' } },
    { n:'OrderRow', k:'pub',
      w:{ en:'The row’s class name. The list component lists it in <code>imports</code>.', ar:'اسم كلاس الصف. الـ component بتاع الليستة بيحطه في <code>imports</code>.' } },
    { n:'app-order-row', k:'pub',
      w:{ en:'The row’s selector: its <code>selector</code> string and this tag must match.', ar:'الـ selector بتاع الصف: النص في <code>selector</code> والتاج ده لازم يبقوا زي بعض.' } },
    { n:'expanded', k:'mine',
      w:{ en:'The row’s own signal. It is exactly the kind of state <code>track</code> protects.', ar:'الـ signal بتاعة الصف. وهي بالظبط نوع الحالة اللي <code>track</code> بيحميها.' } },
    { n:'app-spinner', k:'pub',
      w:{ en:'Another component’s selector.', ar:'الـ selector بتاع component تاني.' } },
    { n:'shop', k:'pub',
      w:{ en:'A route path. It must match a <code>path</code> in your routes.', ar:'مسار route. لازم يبقى زي <code>path</code> في الـ routes بتاعتك.' } },
    { n:'query', k:'mine', w:{ en:'The search component’s own signal.', ar:'الـ signal بتاعة الـ search component.' } },
    { n:'results', k:'mine', w:{ en:'A computed in the search component.', ar:'computed في الـ search component.' } },
    { n:'Product', k:'pub',
      w:{ en:'Your data type. Every file that imports it follows a rename.', ar:'نوع الداتا بتاعك. أي ملف بيعمله import بيتغير معاه.' } },
    { n:'app-product-card', k:'pub',
      w:{ en:'The product card’s selector.', ar:'الـ selector بتاع كارت المنتج.' } },
    { n:'product', k:'pub',
      w:{ en:'The product card’s input, set here with <code>[product]</code>.', ar:'الـ input بتاع كارت المنتج، بيتحط هنا بـ <code>[product]</code>.' } },
  ]
}
};
