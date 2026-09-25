/* names for the RxJS operators topic.
   n: the name exactly as typed in the code.   k: ng | mine | pub.
   w: what it is, and what has to change with it.   { en, ar }
   re / only / as: see _build/names.mjs.                                  */
export default {
'rxjs-operators': {
  note: {
    en: 'Every operator name (<code>switchMap</code>, <code>debounceTime</code>…) is RxJS’s and is imported from <code>\'rxjs\'</code> by that exact name. What you name is the stream itself, and the <code>$</code> on the end of <code>place$</code> is only a habit: it is part of your name, not a rule.',
    ar: 'أي اسم operator (<code>switchMap</code> و<code>debounceTime</code>…) بتاع RxJS وبيتعمله import من <code>\'rxjs\'</code> بالاسم ده بالظبط. اللي انت بتسمّيه هو الـ stream نفسه، والـ <code>$</code> اللي في آخر <code>place$</code> مجرد عادة: جزء من اسمك، مش قاعدة.'
  },
  names: [
    { n:'switchMap', k:'ng', w:{ en:'An RxJS operator: cancel the previous inner request, keep only the newest.', ar:'operator من RxJS: الغي الـ request اللي قبله، وخلّي الأحدث بس.' } },
    { n:'exhaustMap', k:'ng', w:{ en:'An RxJS operator: ignore new values while the current one is still running.', ar:'operator من RxJS: طنّش القيم الجديدة طول ما اللي شغال لسه مخلصش.' } },
    { n:'concatMap', k:'ng', w:{ en:'An RxJS operator: queue them and run one at a time, in order.', ar:'operator من RxJS: حطهم في طابور وشغّلهم واحد واحد بالترتيب.' } },
    { n:'mergeMap', k:'ng', w:{ en:'An RxJS operator: run them all at once. The <code>3</code> is its concurrency limit.', ar:'operator من RxJS: شغّلهم كلهم مع بعض. والـ <code>3</code> هو أقصى عدد شغال في نفس الوقت.' } },
    { n:'debounceTime', k:'ng', w:{ en:'An RxJS operator: wait for a pause before passing the value on.', ar:'operator من RxJS: استنى لحد ما يحصل وقفة قبل ما تعدّي القيمة.' } },
    { n:'distinctUntilChanged', k:'ng', w:{ en:'An RxJS operator: drop a value that equals the last one.', ar:'operator من RxJS: ارمي القيمة لو هي زي اللي قبلها.' } },
    { n:'map', k:'ng', w:{ en:'The RxJS operator: transform each value.', ar:'الـ operator بتاع RxJS: حوّل كل قيمة.' } },
    { n:'filter', k:'ng', w:{ en:'The RxJS operator: let only some values through.', ar:'الـ operator بتاع RxJS: عدّي بعض القيم بس.' } },
    { n:'tap', k:'ng', w:{ en:'An RxJS operator for side effects.', ar:'operator من RxJS للـ side effects.' } },
    { n:'startWith', k:'ng', w:{ en:'An RxJS operator: emit this first.', ar:'operator من RxJS: ابعت دي الأول.' } },
    { n:'catchError', k:'ng', w:{ en:'An RxJS operator that handles an error.', ar:'operator من RxJS بيتعامل مع الـ error.' } },
    { n:'retry', k:'ng', w:{ en:'An RxJS operator: try again on failure.', ar:'operator من RxJS: جرّب تاني لو فشل.' } },
    { n:'count', k:'ng', w:{ en:'An option key <code>retry</code> reads.', ar:'مفتاح إعداد <code>retry</code> بيقراه.' } },
    { n:'delay', k:'ng', w:{ en:'An option key <code>retry</code> reads.', ar:'مفتاح إعداد <code>retry</code> بيقراه.' } },
    { n:'finalize', k:'ng', w:{ en:'An RxJS operator that runs on complete, error or cancel.', ar:'operator من RxJS بيشتغل لما الـ stream يخلص أو يضرب error أو يتلغي.' } },
    { n:'combineLatest', k:'ng', w:{ en:'An RxJS function that joins streams.', ar:'function من RxJS بتجمع streams.' } },
    { n:'forkJoin', k:'ng', w:{ en:'An RxJS function that waits for all streams to complete.', ar:'function من RxJS بتستنى كل الـ streams تخلص.' } },
    { n:'of', k:'ng', w:{ en:'An RxJS function that makes a stream from plain values.', ar:'function من RxJS بتعمل stream من قيم عادية.' } },
    { n:'from', k:'ng', w:{ en:'An RxJS function that makes a stream from an array.', ar:'function من RxJS بتعمل stream من array.' } },
    { n:'Subject', k:'ng', w:{ en:'An RxJS class: a stream you push values into yourself.', ar:'كلاس من RxJS: stream انت بنفسك اللي بتحط فيه القيم.' } },
    { n:'next', k:'ng', w:{ en:'A <code>Subject</code> method: push a value in.', ar:'ميثود في <code>Subject</code>: حط قيمة جوه.' } },
    { n:'pipe', k:'ng', w:{ en:'The observable method that chains operators.', ar:'ميثود الـ observable اللي بتركّب الـ operators ورا بعض.' } },
    { n:'subscribe', k:'ng', w:{ en:'The observable method that starts it running.', ar:'ميثود الـ observable اللي بتشغّله.' } },
    { n:'toSignal', k:'ng', w:{ en:'Angular’s bridge from an observable to a signal.', ar:'الكوبري بتاع أنجولار من observable لـ signal.' } },
    { n:'toObservable', k:'ng', w:{ en:'Angular’s bridge from a signal to an observable.', ar:'الكوبري بتاع أنجولار من signal لـ observable.' } },
    { n:'initialValue', k:'ng', w:{ en:'An option key <code>toSignal</code> reads.', ar:'مفتاح إعداد <code>toSignal</code> بيقراه.' } },
    { n:'takeUntilDestroyed', k:'ng', w:{ en:'Angular’s operator that unsubscribes when the component is destroyed.', ar:'الـ operator بتاع أنجولار اللي بيعمل unsubscribe لما الـ component يتشال.' } },
    { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
    { n:'set', k:'ng', w:{ en:'A signal method.', ar:'ميثود بتاعة الـ signal.' } },
    { n:'get', k:'ng', w:{ en:'An <code>HttpClient</code> method.', ar:'ميثود في <code>HttpClient</code>.' } },
    { n:'post', k:'ng', w:{ en:'An <code>HttpClient</code> method.', ar:'ميثود في <code>HttpClient</code>.' } },
    { n:'patch', k:'ng', w:{ en:'An <code>HttpClient</code> method.', ar:'ميثود في <code>HttpClient</code>.' } },
    { n:'navigate', k:'ng', w:{ en:'A <code>Router</code> method from Angular.', ar:'ميثود في <code>Router</code> من أنجولار.' } },

    { n:'results', k:'mine', w:{ en:'Your signal, read by this component’s template.', ar:'الـ signal بتاعتك، والتمبلت بتاع الـ component ده بيقراها.' } },
    { n:'term', k:'mine', w:{ en:'Your signal holding what the user typed.', ar:'الـ signal بتاعتك اللي شايلة اللي اليوزر كتبه.' } },
    { n:'http', k:'mine', w:{ en:'Your field name for the injected <code>HttpClient</code>. <code>http</code> is only a habit.', ar:'اسم الـ field بتاعك للـ <code>HttpClient</code> اللي اتعمله inject. <code>http</code> مجرد عادة.' } },
    { n:'router', k:'mine', w:{ en:'Your field name for the injected <code>Router</code>.', ar:'اسم الـ field بتاعك للـ <code>Router</code> اللي اتعمله inject.' } },
    { n:'Product', k:'pub', w:{ en:'Your data type, imported from another file.', ar:'نوع الداتا بتاعك، جاي import من ملف تاني.' } },
    { n:'saveClicks$', k:'mine', as:'okra$', w:{ en:'Your stream of clicks. The <code>$</code> is part of your name.', ar:'الـ stream بتاعك بتاع الكليكات. الـ <code>$</code> جزء من اسمك.' } },
    { n:'draft', k:'mine', w:{ en:'Your signal holding the order being built.', ar:'الـ signal بتاعتك اللي شايلة الأوردر اللي بيتبني.' } },
    { n:'edits$', k:'mine', as:'fig$', w:{ en:'Your stream of edits.', ar:'الـ stream بتاعك بتاع التعديلات.' } },
    { n:'upload', k:'mine', w:{ en:'Your method that uploads one file.', ar:'الميثود بتاعتك اللي بترفع ملف واحد.' } },
    { n:'busy', k:'mine', w:{ en:'Your signal for “a request is running”.', ar:'الـ signal بتاعتك لـ “فيه request شغال”.' } },
    { n:'Checkout', k:'pub', w:{ en:'Your component’s class name, imported by whatever shows it.', ar:'اسم كلاس الـ component بتاعك، بيتعمله import في أي حتة بتعرضه.' } },
    { n:'postcode', k:'mine', w:{ en:'Your signal, filled from this component’s template.', ar:'الـ signal بتاعتك، بتتملي من تمبلت الـ component ده.' } },
    { n:'place$', k:'mine', as:'leek$', w:{ en:'Your private <code>Subject</code>. Only this class pushes into it and listens to it.', ar:'الـ <code>Subject</code> الخاص بتاعك. الكلاس ده بس اللي بيحط فيه وبيسمعه.' } },
    { n:'addresses', k:'mine', w:{ en:'Your signal, read by this component’s template.', ar:'الـ signal بتاعتك، والتمبلت بتاع الـ component ده بيقراها.' } },
    { n:'api', k:'mine', re:'(?<![\\w$/-])api(?![\\w$-])', w:{ en:'Your field name for the injected API service.', ar:'اسم الـ field بتاعك لسيرفس الـ API اللي اتعمله inject.' } },
    { n:'lookup', k:'pub', w:{ en:'A method of your API service. Rename it in the service and in every caller.', ar:'ميثود في سيرفس الـ API بتاعك. غيّرها في السيرفس وفي كل حد بيناديها.' } },
    { n:'placeOrder', k:'pub', w:{ en:'A method of your API service, defined in another file.', ar:'ميثود في سيرفس الـ API بتاعك، متعرّفة في ملف تاني.' } },
    { n:'place', k:'mine', w:{ en:'Your method, called from this component’s own template.', ar:'الميثود بتاعتك، بتتنادى من تمبلت الـ component نفسه.' } },
  ]
}
};
