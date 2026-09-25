/* names for the signals topic.
   n: the name exactly as typed in the code.   k: ng | mine | pub.
   w: what it is, and what has to change with it.   { en, ar }
   re / only / as: see _build/names.mjs.                                  */
export default {
'signals': {
  note: {
    en: 'A signal’s name is yours; <code>signal</code>, <code>computed</code>, <code>set</code>, <code>update</code> and <code>asReadonly</code> are Angular’s. A signal kept inside one component is private, but one a store exposes (and components read as <code>store.items</code> or <code>f.inStock</code>) is shared, so a rename reaches every reader.',
    ar: 'اسم الـ signal بتاعك؛ و<code>signal</code> و<code>computed</code> و<code>set</code> و<code>update</code> و<code>asReadonly</code> بتوع أنجولار. الـ signal اللي جوه component واحد خاصة بيه، بس اللي الـ store بيطلّعها (والـ components بتقراها كـ <code>store.items</code> أو <code>f.inStock</code>) متشاركة، فلو غيّرت اسمها لازم تغيّره عند كل اللي بيقروها.'
  },
  names: [
    { n:'@Injectable', k:'ng',
      w:{ en:'Angular’s decorator that makes a class injectable.', ar:'الـ decorator بتاع أنجولار اللي بيخلّي الكلاس ينفع يتعمله inject.' } },
    { n:'providedIn', k:'ng',
      w:{ en:'An option key Angular reads: where the one shared copy lives.', ar:'مفتاح إعداد أنجولار بيقراه: فين النسخة الواحدة المتشاركة عايشة.' } },
    { n:'root', k:'ng',
      w:{ en:'A value Angular recognises: one copy for the whole app.', ar:'قيمة أنجولار عارفها: نسخة واحدة للتطبيق كله.' } },
    { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
    { n:'computed', k:'ng', w:{ en:'Angular’s derived signal.', ar:'الـ signal المشتقة بتاعة أنجولار.' } },
    { n:'set', k:'ng', w:{ en:'A signal method: replace the value.', ar:'ميثود بتاعة الـ signal: بتستبدل القيمة.' } },
    { n:'update', k:'ng', w:{ en:'A signal method: compute the new value from the old one.', ar:'ميثود بتاعة الـ signal: بتحسب القيمة الجديدة من القديمة.' } },
    { n:'asReadonly', k:'ng',
      w:{ en:'A signal method: hand out a version nobody else can write to.', ar:'ميثود بتاعة الـ signal: بتطلّع نسخة محدش تاني يقدر يكتب فيها.' } },
    { n:'inject', k:'ng', w:{ en:'Angular’s function that hands you a service.', ar:'الـ function بتاعة أنجولار اللي بتدّيك الـ service.' } },
    { n:'@for', k:'ng', w:{ en:'Angular’s loop in the template.', ar:'الـ loop بتاع أنجولار في التمبلت.' } },
    { n:'track', k:'ng',
      w:{ en:'Angular’s word inside <code>@for</code>. The expression after it is yours.', ar:'كلمة أنجولار جوه <code>@for</code>. اللي بعدها بتاعك.' } },

    { n:'CartStore', k:'pub',
      w:{ en:'The store’s class name. <code>inject(CartStore)</code> in the component follows a rename.',
          ar:'اسم كلاس الـ store. <code>inject(CartStore)</code> في الـ component بيتغير معاه.' } },
    { n:'_items', k:'mine',
      w:{ en:'The store’s private, writable signal. The underscore is a habit, not a rule. Nobody outside the store can see it.',
          ar:'الـ signal الخاصة اللي بتتكتب جوه الـ store. الـ underscore عادة مش قاعدة. محدش برّه الـ store شايفها.' } },
    { n:'items', k:'pub', only:['store','cmp','tpl'],
      w:{ en:'The store’s public read-only signal; the component reads it as <code>store.items</code>, so both files change. The component then keeps its own property with the same name for its template, which is a separate, private choice.',
          ar:'الـ signal العمومية الـ read-only بتاعة الـ store؛ الـ component بيقراها كـ <code>store.items</code>، فالملفين بيتغيروا. وبعدين الـ component بيعمل property بنفس الاسم للتمبلت بتاعه، ودي حاجة تانية خاصة بيه.' } },
    { n:'add', k:'pub',
      w:{ en:'The store’s public method, called by components as <code>store.add()</code>. The component’s own <code>add</code> just happens to share the name.',
          ar:'الميثود العمومية بتاعة الـ store، والـ components بتناديها كـ <code>store.add()</code>. والـ <code>add</code> اللي في الـ component صدفة ليها نفس الاسم.' } },
    { n:'Item', k:'pub',
      w:{ en:'Your data type. Every file that imports it follows a rename.', ar:'نوع الداتا بتاعك. أي ملف بيعمله import بيتغير معاه.' } },
    { n:'store', k:'mine',
      w:{ en:'The component’s private name for the injected <code>CartStore</code>. Any name works.',
          ar:'الاسم الخاص اللي الـ component مدّيه للـ <code>CartStore</code> اللي اتعمله inject. أي اسم ينفع.' } },
    { n:'count', k:'mine', w:{ en:'A computed in the component, read by its own template.', ar:'computed في الـ component، والتمبلت بتاعه بيقراه.' } },
    { n:'subtotal', k:'mine', w:{ en:'A computed in the component.', ar:'computed في الـ component.' } },
    { n:'vat', k:'mine', w:{ en:'A computed in the component.', ar:'computed في الـ component.' } },
    { n:'addItem', k:'mine', w:{ en:'The component’s own method.', ar:'الميثود بتاعة الـ component.' } },
    { n:'total', k:'mine', w:{ en:'The component’s own signal or computed.', ar:'الـ signal أو الـ computed بتاعة الـ component.' } },

    { n:'Filters', k:'pub',
      w:{ en:'The filters store’s class name. <code>inject(Filters)</code> follows a rename.', ar:'اسم كلاس الـ store بتاع الفلاتر. <code>inject(Filters)</code> بيتغير معاه.' } },
    { n:'brand', k:'pub', re:'(?<=(?:this|f)\\.|readonly )brand(?![\\w$-])',
      w:{ en:'A public signal on <code>Filters</code>, read in other components as <code>f.brand()</code>. <code>p.brand</code> is a field on your product data, and <code>\'brand\'</code> is just text.',
          ar:'signal عمومية في <code>Filters</code>، والـ components التانية بتقراها كـ <code>f.brand()</code>. و<code>p.brand</code> field في داتا المنتج، و<code>\'brand\'</code> مجرد كلام.' } },
    { n:'inStock', k:'pub',
      w:{ en:'A public signal on <code>Filters</code>, read and set by the results list and the chip.', ar:'signal عمومية في <code>Filters</code>، الـ results والـ chip بيقروها ويغيّروها.' } },
    { n:'maxPrice', k:'pub', w:{ en:'A public signal on <code>Filters</code>.', ar:'signal عمومية في <code>Filters</code>.' } },
    { n:'active', k:'pub', re:'(?<![\\w$-])active(?=\\(| =)',
      w:{ en:'A public computed on <code>Filters</code>, read by the chip as <code>f.active()</code>.', ar:'computed عمومي في <code>Filters</code>، الـ chip بيقراه كـ <code>f.active()</code>.' } },
    { n:'f', k:'mine', only:['z2','z3'],
      w:{ en:'Each component’s private name for the injected <code>Filters</code>. Short, but any name works.',
          ar:'الاسم الخاص اللي كل component مدّيه للـ <code>Filters</code> اللي اتعمله inject. قصير، بس أي اسم ينفع.' } },
    { n:'Catalogue', k:'pub', w:{ en:'Another store’s class name, injected here.', ar:'اسم كلاس store تاني، متعمله inject هنا.' } },
    { n:'products', k:'pub',
      w:{ en:'A public signal on <code>Catalogue</code>. Renaming it there breaks this line.', ar:'signal عمومية في <code>Catalogue</code>. لو اتغيّر اسمها هناك السطر ده هيبوظ.' } },
    { n:'shown', k:'mine', w:{ en:'A computed in the results component.', ar:'computed في الـ results component.' } },
  ]
}
};
