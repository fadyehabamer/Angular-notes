/* names for the schematics and builders topic.
   n: the name exactly as typed in the code.   k: ng | mine | pub.
   w: what it is, and what has to change with it.   { en, ar }
   re / only / as: see _build/names.mjs.                                  */
export default {
'schematics': {
  note: {
    en: 'A schematic is wired together by strings: <code>collection.json</code> points at your function with <code>#feature</code>, and the templates read the option <code>name</code> that the CLI passes in. Those orange names must match across files. Everything imported from <code>@angular-devkit</code> is fixed.',
    ar: 'الـ schematic متوصّل ببعضه بـ strings: <code>collection.json</code> بيشاور على الـ function بتاعتك بـ <code>#feature</code>، والتمبلتس بتقرا الـ option اللي اسمه <code>name</code> اللي الـ CLI بيبعته. الأسماء البرتقاني دي لازم تبقى زي بعض في كل الملفات. وأي حاجة جاية من <code>@angular-devkit</code> ثابتة.'
  },
  names: [
    { n:'$schema', k:'ng', w:{ en:'A standard JSON key: where the editor finds the file’s rules.', ar:'مفتاح JSON معروف: المكان اللي الإديتور بيلاقي فيه قواعد الملف.' } },
    { n:'schematics', k:'ng', only:['coll'], re:'(?<=")schematics(?=")',
      w:{ en:'A key Angular DevKit reads: the list of schematics in this collection.', ar:'مفتاح Angular DevKit بيقراه: قايمة الـ schematics اللي في الـ collection دي.' } },
    { n:'factory', k:'ng', w:{ en:'A key DevKit reads: “file path <code>#</code> exported function name”.', ar:'مفتاح DevKit بيقراه: “مسار الملف <code>#</code> اسم الـ function المتعملها export”.' } },
    { n:'schema', k:'ng', only:['coll'], re:'(?<=")schema(?=")',
      w:{ en:'A key DevKit reads: the file that lists the options, like <code>name</code>.', ar:'مفتاح DevKit بيقراه: الملف اللي فيه الـ options، زي <code>name</code>.' } },
    { n:'feature', k:'pub', re:'(?<=#|function )feature(?![\\w$-])',
      w:{ en:'Your factory function. <code>collection.json</code> names it after the <code>#</code>, so rename the export and that string together.',
          ar:'الـ factory function بتاعتك. <code>collection.json</code> بيكتب اسمها بعد الـ <code>#</code>، فغيّر الـ export والنص ده مع بعض.' } },
    { n:'Rule', k:'ng', w:{ en:'DevKit’s type: a step that changes the file tree.', ar:'type من DevKit: خطوة بتغيّر شجرة الملفات.' } },
    { n:'Tree', k:'ng', w:{ en:'DevKit’s type: the project’s files, held in memory until the end.', ar:'type من DevKit: ملفات المشروع، محفوظة في الميموري لحد الآخر.' } },
    { n:'chain', k:'ng', w:{ en:'DevKit’s function: run these rules in order.', ar:'function من DevKit: شغّل الـ rules دي بالترتيب.' } },
    { n:'mergeWith', k:'ng', w:{ en:'DevKit’s function: add generated files to the tree.', ar:'function من DevKit: ضيف الملفات اللي اتعملت للشجرة.' } },
    { n:'apply', k:'ng', only:['fac'], w:{ en:'DevKit’s function: run rules over a set of template files.', ar:'function من DevKit: شغّل rules على مجموعة ملفات تمبلت.' } },
    { n:'url', k:'ng', only:['fac'], w:{ en:'DevKit’s function: read the template files from this folder.', ar:'function من DevKit: اقرا ملفات التمبلت من الفولدر ده.' } },
    { n:'applyTemplates', k:'ng', only:['fac'], w:{ en:'DevKit’s function: fill in the <code>&lt;%= %&gt;</code> parts and drop the <code>.template</code> ending from each file name.', ar:'function من DevKit: املا أجزاء الـ <code>&lt;%= %&gt;</code> وشيل النهاية <code>.template</code> من اسم كل ملف.' } },
    { n:'move', k:'ng', only:['fac'], w:{ en:'DevKit’s function: put the files in this folder.', ar:'function من DevKit: حط الملفات في الفولدر ده.' } },
    { n:'strings', k:'ng', w:{ en:'DevKit’s helpers for names: <code>dasherize</code>, <code>classify</code>, <code>camelize</code>.', ar:'مساعدين DevKit للأسماء: <code>dasherize</code> و<code>classify</code> و<code>camelize</code>.' } },
    { n:'dasherize', k:'ng', w:{ en:'A DevKit helper: <code>OrderHistory</code> → <code>order-history</code>.', ar:'مساعد من DevKit: <code>OrderHistory</code> ← <code>order-history</code>.' } },
    { n:'classify', k:'ng', w:{ en:'A DevKit helper: <code>order-history</code> → <code>OrderHistory</code>.', ar:'مساعد من DevKit: <code>order-history</code> ← <code>OrderHistory</code>.' } },
    { n:'read', k:'ng', only:['fac'], w:{ en:'A <code>Tree</code> method.', ar:'ميثود في <code>Tree</code>.' } },
    { n:'overwrite', k:'ng', w:{ en:'A <code>Tree</code> method.', ar:'ميثود في <code>Tree</code>.' } },
    { n:'<%=', k:'ng', re:'<%=',
      w:{ en:'The template engine’s tag: “print this here”. It closes with <code>%&gt;</code>.', ar:'التاج بتاع الـ template engine: “اطبع ده هنا”. وبيتقفل بـ <code>%&gt;</code>.' } },
    { n:'name', k:'pub', re:'(?<=options\\.|\\{ )name(?![\\w$-])|(?<=<%= \\w+\\()name(?=\\))',
      w:{ en:'The option the CLI fills from <code>ng generate … checkout</code>. <code>schema.json</code> declares it and the templates read it, so all of them change together. (The <code>name</code> parameter of <code>addRoute</code> is a separate, private name.)',
          ar:'الـ option اللي الـ CLI بيملاه من <code>ng generate … checkout</code>. <code>schema.json</code> بيعلنه والتمبلتس بتقراه، فكلهم بيتغيروا مع بعض. (والـ parameter اللي اسمه <code>name</code> في <code>addRoute</code> اسم تاني خاص.)' } },
    { n:'options', k:'mine', w:{ en:'Your parameter name. DevKit passes the options object by position.', ar:'اسم الـ parameter بتاعك. DevKit بيبعت أوبجكت الـ options حسب الترتيب.' } },
    { n:'addRoute', k:'mine', w:{ en:'Your helper, not exported, so only this file knows it.', ar:'function مساعدة بتاعتك، مش متعملها export، فمحدش يعرفها غير الملف ده.' } },
    { n:'tree', k:'mine', w:{ en:'Your parameter name for the <code>Tree</code>.', ar:'اسم الـ parameter بتاعك للـ <code>Tree</code>.' } },

    { n:'@Component', k:'ng', w:{ en:'Angular’s decorator. The template generates it as-is.', ar:'الـ decorator بتاع أنجولار. التمبلت بيطلّعه زي ما هو.' } },
    { n:'selector', k:'ng', w:{ en:'An option key Angular reads.', ar:'مفتاح إعداد أنجولار بيقراه.' } },
    { n:'ChangeDetectionStrategy', k:'ng', only:['tpl'], re:'(?<![\\w$-])ChangeDetectionStrategy(?:\\.OnPush)?(?![\\w$-])', w:{ en:'Angular’s enum. <code>OnPush</code> is one of its values.', ar:'enum من أنجولار. و<code>OnPush</code> واحدة من قيمه.' } },
    { n:'inject', k:'ng', only:['tpl'], w:{ en:'Angular’s function that hands you a service.', ar:'الـ function بتاعة أنجولار اللي بتديك service.' } },

    { n:'createBuilder', k:'ng', w:{ en:'Architect’s function that turns your function into a builder.', ar:'function من Architect بتحوّل الـ function بتاعتك لـ builder.' } },
    { n:'BuilderOutput', k:'ng', w:{ en:'Architect’s result type. <code>success</code> and <code>error</code> are its keys.', ar:'الـ type بتاع النتيجة في Architect. و<code>success</code> و<code>error</code> مفاتيحه.' } },
    { n:'success', k:'ng', w:{ en:'A key Architect reads.', ar:'مفتاح Architect بيقراه.' } },
    { n:'logger', k:'ng', w:{ en:'The builder context’s logger.', ar:'الـ logger بتاع الـ context في الـ builder.' } },
    { n:'ctx', k:'mine', w:{ en:'Your parameter name for the builder context.', ar:'اسم الـ parameter بتاعك للـ context بتاع الـ builder.' } },
    { n:'manifest', k:'pub', re:'(?<![\\w$-])manifest(?=[:)])',
      w:{ en:'A builder option. <code>angular.json</code> passes it under <code>"options"</code>, so both names match.',
          ar:'option في الـ builder. <code>angular.json</code> بيبعته جوه <code>"options"</code>، فالاسمين لازم يبقوا زي بعض.' } },
    { n:'verify', k:'mine', w:{ en:'Your own checking function.', ar:'الـ function بتاعتك اللي بتشيّك.' } },
  ]
}
};
