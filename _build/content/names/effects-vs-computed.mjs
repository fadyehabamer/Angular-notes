/* names for the effects vs computed topic.
   n: the name exactly as typed in the code.   k: ng | mine | pub.
   w: what it is, and what has to change with it.   { en, ar }
   re / only / as: see _build/names.mjs.                                  */
export default {
'effects-vs-computed': {
  note: {
    en: '<code>signal</code>, <code>computed</code>, <code>effect</code> and <code>untracked</code> are Angular’s. Everything they are assigned to is yours. Even <code>onCleanup</code> is only the usual parameter name: Angular passes the cleanup function by position.',
    ar: '<code>signal</code> و<code>computed</code> و<code>effect</code> و<code>untracked</code> بتوع أنجولار. وأي حاجة بتتحط فيها بتاعتك. حتى <code>onCleanup</code> ده مجرد اسم الـ parameter المعتاد: أنجولار بيبعت الـ cleanup function بالترتيب.'
  },
  names: [
    { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
    { n:'computed', k:'ng',
      w:{ en:'Angular’s derived signal: lazy, cached, read-only.', ar:'الـ signal المشتقة بتاعة أنجولار: lazy، ومتخزنة، وللقراية بس.' } },
    { n:'effect', k:'ng',
      w:{ en:'Angular’s function for side effects: code that reaches outside the signal graph.',
          ar:'الـ function بتاعة أنجولار للـ side effects: كود بيوصل لحاجات برّه شبكة الـ signals.' } },
    { n:'untracked', k:'ng',
      w:{ en:'Angular’s function: read a signal without making it a dependency.',
          ar:'function من أنجولار: اقرا signal من غير ما تبقى dependency.' } },
    { n:'set', k:'ng', w:{ en:'A signal method.', ar:'ميثود بتاعة الـ signal.' } },
    { n:'@Injectable', k:'ng', w:{ en:'Angular’s decorator for a service.', ar:'الـ decorator بتاع أنجولار للـ service.' } },
    { n:'providedIn', k:'ng', w:{ en:'An option key Angular reads.', ar:'مفتاح إعداد أنجولار بيقراه.' } },
    { n:'dataset', k:'ng', w:{ en:'The DOM’s property for <code>data-*</code> attributes.', ar:'الـ property بتاعة الـ DOM للـ attributes اللي بتبدأ بـ <code>data-</code>.' } },
    { n:'localStorage', k:'ng', w:{ en:'The browser’s storage.', ar:'التخزين بتاع المتصفح.' } },
    { n:'setItem', k:'ng', w:{ en:'A <code>localStorage</code> method.', ar:'ميثود في <code>localStorage</code>.' } },
    { n:'disabled', k:'ng', w:{ en:'The DOM property of a button.', ar:'الـ property بتاعة الـ DOM في الزرار.' } },
    { n:'click', k:'ng', w:{ en:'The browser’s own event name.', ar:'اسم الـ event بتاع المتصفح نفسه.' } },

    { n:'items', k:'mine', w:{ en:'The component’s own signal.', ar:'الـ signal بتاعة الـ component نفسه.' } },
    { n:'total', k:'mine',
      w:{ en:'The component’s own value: first stored by mistake, then derived.', ar:'قيمة الـ component نفسه: الأول متخزنة غلط، وبعدين مشتقة.' } },
    { n:'Item', k:'pub', w:{ en:'Your data type.', ar:'نوع الداتا بتاعك.' } },
    { n:'ThemeService', k:'pub',
      w:{ en:'Your service class. Every component that injects it follows a rename.', ar:'كلاس الـ service بتاعك. أي component بيعمله inject بيتغير معاه.' } },
    { n:'theme', k:'pub', re:'(?<=readonly |this\\.)theme(?![\\w$-])',
      w:{ en:'The service’s public signal that other components read and set. (The <code>\'theme\'</code> strings are a data attribute and a storage key, different things.)',
          ar:'الـ signal الـ public بتاعة الـ service، والـ components التانية بتقراها وتغيّرها. (والنصوص <code>\'theme\'</code> دي data attribute ومفتاح تخزين، حاجات تانية.)' } },
    { n:'onCleanup', k:'mine',
      w:{ en:'The name Angular’s docs use, but it is just a parameter. Angular passes it by position, so rename it freely.',
          ar:'الاسم اللي في الـ docs بتاعة أنجولار، بس هو مجرد parameter. أنجولار بيبعته بالترتيب، فغيّره براحتك.' } },
    { n:'value', k:'mine', w:{ en:'A local variable inside the effect.', ar:'variable محلي جوه الـ effect.' } },
    { n:'DraftStore', k:'pub', w:{ en:'Your store class.', ar:'كلاس الـ store بتاعك.' } },
    { n:'Draft', k:'pub', w:{ en:'Your data type.', ar:'نوع الداتا بتاعك.' } },
    { n:'EMPTY', k:'pub',
      w:{ en:'Your own constant for a blank draft (not RxJS’s <code>EMPTY</code>).', ar:'الـ constant بتاعك لـ draft فاضي (مش <code>EMPTY</code> بتاعة RxJS).' } },
    { n:'draft', k:'pub', re:'(?<![\\w$\'-])draft(?![\\w$\'-])',
      w:{ en:'The store’s public signal. The <code>\'draft\'</code> string is the storage key, a different name.',
          ar:'الـ signal الـ public بتاعة الـ store. والنص <code>\'draft\'</code> ده مفتاح التخزين، اسم تاني.' } },
    { n:'saved', k:'pub', w:{ en:'The store’s public signal, set by whatever saves the draft.', ar:'الـ signal الـ public بتاعة الـ store، واللي بيحفظ الـ draft هو اللي بيغيّرها.' } },
    { n:'dirty', k:'pub', re:'(?<![\\w$-])(?<!class\\.)dirty(?![\\w$-])',
      w:{ en:'A computed the draft bar reads, so both files change together. (<code>class.dirty</code> is a CSS class.)',
          ar:'computed الـ draft bar بيقراه، فالملفين بيتغيروا مع بعض. (و<code>class.dirty</code> دي CSS class.)' } },
    { n:'canSave', k:'pub', w:{ en:'A computed the draft bar reads.', ar:'computed الـ draft bar بيقراه.' } },
    { n:'status', k:'pub', re:'(?<![\\w$"-])status(?![\\w$-])',
      w:{ en:'A computed the draft bar reads. (<code>class="status"</code> is a CSS class.)',
          ar:'computed الـ draft bar بيقراه. (و<code>class="status"</code> دي CSS class.)' } },
    { n:'save', k:'mine', w:{ en:'The draft bar’s own method.', ar:'ميثود الـ draft bar نفسه.' } },
  ]
}
};
