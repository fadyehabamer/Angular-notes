/* names for the RxJS combination operators topic.
   n: the name exactly as typed in the code.   k: ng | mine | pub.
   w: what it is, and what has to change with it.   { en, ar }
   re / only / as: see _build/names.mjs.                                  */
export default {
'rxjs-combination': {
  note: {
    en: 'The joiners (<code>forkJoin</code>, <code>combineLatest</code>, <code>withLatestFrom</code>…) are RxJS’s. The keys you put in a <code>forkJoin({ … })</code> object are yours, and the result comes back with the same keys. The words inside a URL (<code>/api/orders</code>, <code>&amp;sort=</code>) belong to the server.',
    ar: 'الحاجات اللي بتجمع (<code>forkJoin</code> و<code>combineLatest</code> و<code>withLatestFrom</code>…) بتاعة RxJS. المفاتيح اللي بتحطها في أوبجكت <code>forkJoin({ … })</code> بتاعتك، والنتيجة بترجع بنفس المفاتيح. والكلام اللي جوه الـ URL (<code>/api/orders</code> و<code>&amp;sort=</code>) بتاع السيرفر.'
  },
  names: [
    { n:'forkJoin', k:'ng', w:{ en:'An RxJS function: wait for every stream to complete, then emit once.', ar:'function من RxJS: استنى كل الـ streams تخلص، وبعدين ابعت مرة واحدة.' } },
    { n:'combineLatest', k:'ng', w:{ en:'An RxJS function: emit the latest of each, whenever any of them fires.', ar:'function من RxJS: ابعت آخر قيمة من كل واحد، كل ما أي واحد فيهم يبعت.' } },
    { n:'withLatestFrom', k:'ng', w:{ en:'An RxJS operator: one source drives, the others are only read.', ar:'operator من RxJS: مصدر واحد هو اللي بيحرّك، والباقي بيتقروا بس.' } },
    { n:'merge', k:'ng', w:{ en:'An RxJS function: pass everything through from all streams.', ar:'function من RxJS: عدّي كل حاجة من كل الـ streams.' } },
    { n:'zip', k:'ng', w:{ en:'An RxJS function: pair values one-with-one.', ar:'function من RxJS: جوّز القيم واحدة قصاد واحدة.' } },
    { n:'concat', k:'ng', w:{ en:'An RxJS function: all of the first, then all of the next.', ar:'function من RxJS: كل الأول، وبعدين كل اللي بعده.' } },
    { n:'race', k:'ng', w:{ en:'An RxJS function: the first to emit wins.', ar:'function من RxJS: أول واحد يبعت هو اللي يكسب.' } },
    { n:'startWith', k:'ng', w:{ en:'An RxJS operator: emit this value first.', ar:'operator من RxJS: ابعت القيمة دي الأول.' } },
    { n:'pairwise', k:'ng', w:{ en:'An RxJS operator: emit <code>[previous, current]</code>.', ar:'operator من RxJS: ابعت <code>[previous, current]</code>.' } },
    { n:'debounceTime', k:'ng', w:{ en:'An RxJS operator: wait for a pause.', ar:'operator من RxJS: استنى وقفة.' } },
    { n:'map', k:'ng', w:{ en:'The RxJS operator: transform each value.', ar:'الـ operator بتاع RxJS: حوّل كل قيمة.' } },
    { n:'switchMap', k:'ng', w:{ en:'An RxJS operator: cancel the previous request, keep the newest.', ar:'operator من RxJS: الغي الـ request اللي قبله، وخلّي الأحدث.' } },
    { n:'catchError', k:'ng', w:{ en:'An RxJS operator that handles an error.', ar:'operator من RxJS بيتعامل مع الـ error.' } },
    { n:'of', k:'ng', w:{ en:'An RxJS function that makes a stream from a plain value.', ar:'function من RxJS بتعمل stream من قيمة عادية.' } },
    { n:'EMPTY', k:'ng', w:{ en:'An RxJS constant: a stream that completes with no value.', ar:'ثابت من RxJS: stream بيخلص من غير ما يبعت أي قيمة.' } },
    { n:'pipe', k:'ng', w:{ en:'The observable method that chains operators.', ar:'ميثود الـ observable اللي بتركّب الـ operators ورا بعض.' } },
    { n:'subscribe', k:'ng', w:{ en:'The observable method that starts it running.', ar:'ميثود الـ observable اللي بتشغّله.' } },
    { n:'get', k:'ng', w:{ en:'An <code>HttpClient</code> method.', ar:'ميثود في <code>HttpClient</code>.' } },
    { n:'toSignal', k:'ng', w:{ en:'Angular’s bridge from an observable to a signal.', ar:'الكوبري بتاع أنجولار من observable لـ signal.' } },
    { n:'httpResource', k:'ng', w:{ en:'Angular’s signal-based HTTP request.', ar:'الـ HTTP request بتاع أنجولار المبني على signals.' } },
    { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
    { n:'computed', k:'ng', w:{ en:'Angular’s derived signal.', ar:'الـ signal المشتقة بتاعة أنجولار.' } },
    { n:'set', k:'ng', w:{ en:'A signal method.', ar:'ميثود بتاعة الـ signal.' } },

    { n:'http', k:'mine', w:{ en:'Your field name for the injected <code>HttpClient</code>.', ar:'اسم الـ field بتاعك للـ <code>HttpClient</code> اللي اتعمله inject.' } },
    { n:'api', k:'mine', re:'(?<![\\w$/-])api(?![\\w$-])', w:{ en:'Your field name for your API service. The <code>/api/</code> in the URLs is the server’s path, not this.', ar:'اسم الـ field بتاعك لسيرفس الـ API. والـ <code>/api/</code> اللي في الـ URLs ده مسار السيرفر، مش هو.' } },
    { n:'user', k:'mine', only:['op'],
      w:{ en:'Yours twice: a key in the <code>forkJoin</code> object (read back in <code>subscribe</code>), and separately a parameter name in the <code>withLatestFrom</code> callback. <code>user$</code> is a different name.',
          ar:'بتاعك مرتين: مفتاح في أوبجكت الـ <code>forkJoin</code> (بيتقري تاني في <code>subscribe</code>)، وكمان اسم باراميتر في الـ callback بتاع <code>withLatestFrom</code>. و<code>user$</code> اسم تاني خالص.' } },
    { n:'orders', k:'mine', re:'(?<![\\w$/-])orders(?![\\w$-])',
      w:{ en:'A key you chose in the <code>forkJoin</code> object. The result has the same key, so rename both. <code>/api/orders</code> is the server’s.',
          ar:'مفتاح انت اخترته في أوبجكت الـ <code>forkJoin</code>. النتيجة بترجع بنفس المفتاح، فغيّر الاتنين. و<code>/api/orders</code> بتاع السيرفر.' } },
    { n:'settings', k:'mine', re:'(?<![\\w$/-])settings(?![\\w$-])',
      w:{ en:'Another <code>forkJoin</code> key of yours, read back by the same name in <code>subscribe</code>.', ar:'مفتاح <code>forkJoin</code> تاني بتاعك، بيتقري بنفس الاسم في <code>subscribe</code>.' } },
    { n:'search$', k:'mine', as:'okra$', w:{ en:'Your stream. The <code>$</code> is only a habit; it is part of your name.', ar:'الـ stream بتاعك. الـ <code>$</code> مجرد عادة؛ هي جزء من اسمك.' } },
    { n:'submit$', k:'mine', as:'fig$', w:{ en:'Your stream of submits: the one that drives <code>withLatestFrom</code>.', ar:'الـ stream بتاعك بتاع الـ submit: هو اللي بيحرّك <code>withLatestFrom</code>.' } },
    { n:'search', k:'mine', only:['sig'], w:{ en:'Your signal, read inside <code>query</code>.', ar:'الـ signal بتاعتك، بتتقري جوه <code>query</code>.' } },
    { n:'sort', k:'mine', only:['sig'], re:'(?<![\\w$&?-])sort(?![\\w$=-])',
      w:{ en:'Your signal, and the key of the same name in <code>query</code>. The <code>sort=</code> in the URL is the server’s parameter and does not change.',
          ar:'الـ signal بتاعتك، والمفتاح اللي بنفس الاسم في <code>query</code>. و<code>sort=</code> اللي في الـ URL ده باراميتر السيرفر ومش بيتغير.' } },
    { n:'page', k:'mine', only:['sig'], re:'(?<![\\w$&?-])page(?![\\w$=-])',
      w:{ en:'Your signal and <code>query</code> key. The <code>page=</code> in the URL is the server’s.', ar:'الـ signal بتاعتك ومفتاح في <code>query</code>. و<code>page=</code> اللي في الـ URL بتاع السيرفر.' } },
    { n:'query', k:'mine', only:['sig'], w:{ en:'Your computed, read by <code>httpResource</code>.', ar:'الـ computed بتاعتك، و<code>httpResource</code> بيقراها.' } },
    { n:'results', k:'mine', w:{ en:'Your resource, read by this component’s template.', ar:'الـ resource بتاعك، والتمبلت بتاع الـ component ده بيقراه.' } },
    { n:'Dashboard', k:'pub', w:{ en:'Your component’s class name.', ar:'اسم كلاس الـ component بتاعك.' } },
    { n:'data', k:'mine', w:{ en:'Your signal, read by this component.', ar:'الـ signal بتاعتك، والـ component ده بيقراها.' } },
    { n:'error', k:'mine', w:{ en:'Your signal for “something failed”.', ar:'الـ signal بتاعتك لـ “حاجة فشلت”.' } },
    { n:'loading', k:'mine', w:{ en:'Your computed, read by this component’s template.', ar:'الـ computed بتاعتك، والتمبلت بتاع الـ component ده بيقراها.' } },
    { n:'User', k:'pub', w:{ en:'Your data type, imported from another file.', ar:'نوع الداتا بتاعك، جاي import من ملف تاني.' } },
    { n:'Order', k:'pub', w:{ en:'Your data type, imported from another file.', ar:'نوع الداتا بتاعك، جاي import من ملف تاني.' } },
    { n:'Product', k:'pub', w:{ en:'Your data type, imported from another file.', ar:'نوع الداتا بتاعك، جاي import من ملف تاني.' } },
  ]
}
};
