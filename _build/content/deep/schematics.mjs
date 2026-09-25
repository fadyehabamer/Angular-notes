/* ==================================================================
   Schematics, name by name — the companion page after the schematics
   topic. One running example (a my-tools:feature schematic that writes
   a feature folder and adds a route) followed from the command line to
   the generated files, every name coloured by who owns it. A small
   builder shows that the other half is wired the same way.
   ================================================================== */

/* a name in running text, coloured like the code and linked on hover */
const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

const TREE = 'the folder';
const TPL = '__name@dasherize__.ts.template';
const HTPL = '__name@dasherize__.html.template';

export default {
  topic: 'schematics',
  tab: 'Schematics, name by name — The Angular Signal',
  title: { en: 'Schematics, name by name', ar: 'الـ schematics، اسم اسم' },
  say: {
    en: 'A schematic is held together by strings in JSON files, and no compiler checks them. One <code>my-tools:feature</code> schematic followed from the command you type to the files it writes, every name coloured, and exactly which strings must match.',
    ar: 'الـ schematic متماسك بـ strings في ملفات JSON، ومفيش كومبايلر بيشيّكها. schematic واحد <code>my-tools:feature</code> ماشيين وراه من الأمر اللي بتكتبه لحد الملفات اللي بيكتبها، وكل اسم ملوّن، وبالظبط أنهي strings لازم تبقى زي بعض.'
  },
  lead: {
    en: 'The idea is simple: <b>a command name points at a function, and the function writes files from templates.</b> The confusing part is the names. <code>name</code> alone means three different things in the same small package, the word <code>feature</code> shows up as a command, a folder and a function, and the links between them are strings that TypeScript never sees. This page untangles every one.',
    ar: 'الفكرة بسيطة: <b>اسم أمر بيشاور على function، والـ function بتكتب ملفات من قوالب.</b> اللي بيلخبط هو الأسماء. كلمة <code>name</code> لوحدها معناها تلات حاجات مختلفة في نفس الباكدج الصغيرة، وكلمة <code>feature</code> بتظهر كأمر وكفولدر وكـ function، والروابط اللي بينهم strings عمر TypeScript ما بيشوفها. الصفحة دي بتفك كل واحدة فيهم.'
  },

  names: {
    note: {
      en: 'Read the orange rows first. In a schematic most shared names are joined by <b>strings</b>: a file path, a <code>#export</code> after a path, a key in <code>schema.json</code>. TypeScript checks none of them, so a mismatch only shows up when someone runs <code>ng generate</code>. Everything imported from <code>@angular-devkit</code> is fixed.',
      ar: 'اقرا الصفوف البرتقاني الأول. في الـ schematic أغلب الأسماء المتشاركة متوصّلة بـ <b>strings</b>: مسار ملف، أو <code>#export</code> بعد مسار، أو مفتاح في <code>schema.json</code>. TypeScript مابيشيّكش ولا واحدة فيهم، فأي اختلاف بيظهر بس لما حد يشغّل <code>ng generate</code>. وأي حاجة جاية من <code>@angular-devkit</code> ثابتة.'
    },
    names: [
      /* --- shared: two files must agree --- */
      { n:'my-tools', k:'pub', not:[TREE],
        w:{ en:'Your package name. It is the part before the colon in <code>ng generate my-tools:feature</code>, and in <code>angular.json</code>.',
            ar:'اسم الباكدج بتاعك. هو الجزء اللي قبل النقطتين في <code>ng generate my-tools:feature</code>، وفي <code>angular.json</code>.' } },
      { n:'collection.json', k:'pub', as:'recipes.json',
        w:{ en:'The collection file. <code>package.json</code> points at it with <code>"schematics"</code>.', ar:'ملف الـ collection. <code>package.json</code> بيشاور عليه بـ <code>"schematics"</code>.' } },
      { n:'feature', k:'pub', re:'(?<=")feature(?=")|(?<=:)feature(?![\\w$-])',
        w:{ en:'The schematic’s name: the key in <code>collection.json</code> and the part after the colon in the command. (The folder <code>feature/</code> is a separate name.)',
            ar:'اسم الـ schematic: المفتاح في <code>collection.json</code> والجزء اللي بعد النقطتين في الأمر. (والفولدر <code>feature/</code> اسم تاني.)' } },
      { n:'f', k:'pub', re:'(?<=")f(?=")|(?<=:)f(?![\\w$-])',
        w:{ en:'An alias for the schematic, declared in <code>aliases</code>. People can type <code>my-tools:f</code>.', ar:'alias للـ schematic، متعلن في <code>aliases</code>. الناس ممكن تكتب <code>my-tools:f</code>.' } },
      { n:'generateFeature', k:'pub',
        w:{ en:'Your factory function. <code>collection.json</code> names it after the <code>#</code>, so the export and that string change together.',
            ar:'الـ factory function بتاعتك. <code>collection.json</code> بيكتب اسمها بعد الـ <code>#</code>، فالـ export والنص ده بيتغيروا مع بعض.' } },
      { n:'schema.json', k:'pub', as:'inputs.json', not:['builders.json'],
        w:{ en:'The options file. <code>collection.json</code> points at it with <code>"schema"</code>.', ar:'ملف الـ options. <code>collection.json</code> بيشاور عليه بـ <code>"schema"</code>.' } },
      { n:'name', k:'pub', not:['package.json', 'package.json · builders'],
        re:'(?<=")name(?=")|(?<=options\\.)name(?![\\w$-])|(?<=\\{ )name(?=:)|(?<=\\()name(?=\\))|(?<=__)name(?=@|__)',
        w:{ en:'The option. <code>schema.json</code> declares it, the CLI fills it from the first word after the command, the factory reads <code>options.name</code>, and the templates read <code>name</code>, even in their file names. All of them change together.',
            ar:'الـ option. <code>schema.json</code> بيعلنه، والـ CLI بيملاه من أول كلمة بعد الأمر، والـ factory بتقرا <code>options.name</code>، والقوالب بتقرا <code>name</code>، حتى في أسماء الملفات بتاعتها. كلهم بيتغيروا مع بعض.' } },
      { n:'path', k:'pub', re:'(?<=")path(?=")|(?<=options\\.)path(?![\\w$-])|(?<=; )path(?=\\?)',
        w:{ en:'A second option: declared in <code>schema.json</code>, read as <code>options.path</code>, typed as <code>--path</code>.', ar:'option تاني: متعلن في <code>schema.json</code>، وبيتقري كـ <code>options.path</code>، وبيتكتب كـ <code>--path</code>.' } },
      { n:'files', k:'pub', as:'stencils', re:"(?<=\\./)files(?=')|(?<=^\\s*)files(?=/)",
        w:{ en:'The templates folder. <code>url(\'./files\')</code> must name it exactly.', ar:'فولدر القوالب. <code>url(\'./files\')</code> لازم يكتب اسمه بالظبط.' } },
      { n:'verify', k:'pub', re:'(?<=")verify(?=")|(?<=:)verify(?![\\w$-])',
        w:{ en:'The builder’s name: the key in <code>builders.json</code> and the part after the colon in <code>"builder"</code>.', ar:'اسم الـ builder: المفتاح في <code>builders.json</code> والجزء اللي بعد النقطتين في <code>"builder"</code>.' } },
      { n:'check-release', k:'pub',
        w:{ en:'The target name in <code>angular.json</code>. It is what <code>ng run shop:check-release</code> types, and it is not the builder’s name.',
            ar:'اسم الـ target في <code>angular.json</code>. هو اللي <code>ng run shop:check-release</code> بيكتبه، ومش هو اسم الـ builder.' } },
      { n:'manifest', k:'pub', re:'(?<=")manifest(?=")|(?<=options\\.)manifest(?![\\w$-])|(?<=\\{ )manifest(?=:)',
        w:{ en:'A builder option: set in <code>angular.json</code>, read as <code>options.manifest</code>.', ar:'option في الـ builder: بيتحط في <code>angular.json</code>، وبيتقري كـ <code>options.manifest</code>.' } },

      /* --- yours, private to one file --- */
      { n:'options', k:'mine', only:['ts'],
        w:{ en:'Your parameter name. DevKit passes the options object by position, so any name works.', ar:'اسم الـ parameter بتاعك. DevKit بيبعت أوبجكت الـ options حسب الترتيب، فأي اسم ينفع.' } },
      { n:'folder', k:'mine', only:['ts'], w:{ en:'A local variable: where the files go.', ar:'متغير محلي: الملفات هتتحط فين.' } },
      { n:'addRoute', k:'mine',
        w:{ en:'Your helper. Not exported, so only this file knows it.', ar:'function مساعدة بتاعتك. مش متعملها export، فمحدش يعرفها غير الملف ده.' } },
      { n:'featureName', k:'mine',
        w:{ en:'The helper’s parameter. A different name from the <code>name</code> option on purpose.', ar:'الـ parameter بتاع الـ function المساعدة. اسم مختلف عن الـ option اللي اسمه <code>name</code> بقصد.' } },
      { n:'tree', k:'mine', w:{ en:'Your parameter name for the <code>Tree</code>.', ar:'اسم الـ parameter بتاعك للـ <code>Tree</code>.' } },
      { n:'file', k:'mine', only:['ts'], w:{ en:'A local variable: the file to edit.', ar:'متغير محلي: الملف اللي هيتعدّل.' } },
      { n:'text', k:'mine', only:['ts'], w:{ en:'A local variable: that file’s contents.', ar:'متغير محلي: محتوى الملف ده.' } },
      { n:'marker', k:'mine', w:{ en:'A local variable: the line to insert after.', ar:'متغير محلي: السطر اللي هنضيف بعده.' } },
      { n:'context', k:'mine', w:{ en:'Your parameter name for the builder context.', ar:'اسم الـ parameter بتاعك للـ context بتاع الـ builder.' } },

      /* --- package.json, collection.json, schema.json, builders.json: fixed keys --- */
      { n:'name', k:'ng', only:['package.json', 'package.json · builders'], re:'(?<=")name(?=")',
        w:{ en:'npm’s key for the package name. The value after it, <code>my-tools</code>, is yours.', ar:'مفتاح npm لاسم الباكدج. والقيمة اللي بعده، <code>my-tools</code>، بتاعتك.' } },
      { n:'schematics', k:'ng', re:'(?<=")schematics(?=")',
        w:{ en:'A fixed key, twice: in <code>package.json</code> it points at the collection, in <code>collection.json</code> it holds the list.', ar:'مفتاح ثابت، مرتين: في <code>package.json</code> بيشاور على الـ collection، وفي <code>collection.json</code> شايل الليستة.' } },
      { n:'builders', k:'ng', re:'(?<=")builders(?=")',
        w:{ en:'The same idea for builders: in <code>package.json</code> and in <code>builders.json</code>.', ar:'نفس الفكرة للـ builders: في <code>package.json</code> وفي <code>builders.json</code>.' } },
      { n:'$schema', k:'ng', w:{ en:'A standard JSON key: where your editor finds the rules for this file.', ar:'مفتاح JSON معروف: المكان اللي الإديتور بيلاقي فيه قواعد الملف ده.' } },
      { n:'description', k:'ng', w:{ en:'A key DevKit reads: the help text.', ar:'مفتاح DevKit بيقراه: نص المساعدة.' } },
      { n:'factory', k:'ng', w:{ en:'A key DevKit reads: “file path <code>#</code> exported function name”.', ar:'مفتاح DevKit بيقراه: «مسار الملف <code>#</code> اسم الـ function المتعملها export».' } },
      { n:'schema', k:'ng', re:'(?<=")schema(?=")', w:{ en:'A key DevKit reads: the file that lists the options.', ar:'مفتاح DevKit بيقراه: الملف اللي فيه الـ options.' } },
      { n:'aliases', k:'ng', w:{ en:'A key DevKit reads: other names for the same schematic.', ar:'مفتاح DevKit بيقراه: أسماء تانية لنفس الـ schematic.' } },
      { n:'implementation', k:'ng', w:{ en:'The builder’s key for its file. The file’s default export is used.', ar:'مفتاح الـ builder لملفه. وبيستخدم الـ default export بتاع الملف.' } },
      { n:'properties', k:'ng', w:{ en:'A JSON Schema key: the list of options.', ar:'مفتاح في JSON Schema: ليستة الـ options.' } },
      { n:'$default', k:'ng', w:{ en:'A schematics schema key: where the CLI gets the value when you do not type <code>--name</code>.', ar:'مفتاح في schema الـ schematics: الـ CLI بيجيب القيمة منين لما ماتكتبش <code>--name</code>.' } },
      { n:'$source', k:'ng', w:{ en:'Part of <code>$default</code>.', ar:'جزء من <code>$default</code>.' } },
      { n:'argv', k:'ng', w:{ en:'The value “the words typed on the command line”.', ar:'القيمة اللي معناها «الكلمات اللي اتكتبت في الأمر».' } },
      { n:'index', k:'ng', re:'(?<=")index(?=")', w:{ en:'Which word: <code>0</code> is the first one after the schematic name.', ar:'أنهي كلمة: <code>0</code> يعني أول كلمة بعد اسم الـ schematic.' } },
      { n:'x-prompt', k:'ng', w:{ en:'A schematics schema key: the question the CLI asks when the value is missing.', ar:'مفتاح في schema الـ schematics: السؤال اللي الـ CLI بيسأله لما القيمة مش موجودة.' } },
      { n:'required', k:'ng', w:{ en:'A JSON Schema key.', ar:'مفتاح في JSON Schema.' } },
      { n:'schematicCollections', k:'ng', w:{ en:'An <code>angular.json</code> key: collections to search when you type no prefix.', ar:'مفتاح في <code>angular.json</code>: الـ collections اللي يدوّر فيها لما ماتكتبش prefix.' } },
      { n:'defaultCollection', k:'ng', w:{ en:'The older, deprecated key that did something similar.', ar:'المفتاح القديم اللي بقى deprecated وكان بيعمل حاجة شبهه.' } },
      { n:'builder', k:'ng', re:'(?<=")builder(?=")', w:{ en:'An <code>angular.json</code> key: “package<code>:</code>builder name”.', ar:'مفتاح في <code>angular.json</code>: «الباكدج<code>:</code>اسم الـ builder».' } },

      /* --- DevKit's TypeScript API --- */
      { n:'Rule', k:'ng', w:{ en:'DevKit’s type: a step that changes the file tree.', ar:'type من DevKit: خطوة بتغيّر شجرة الملفات.' } },
      { n:'Tree', k:'ng', w:{ en:'DevKit’s type: the project’s files, held in memory until the end.', ar:'type من DevKit: ملفات المشروع، محفوظة في الميموري لحد الآخر.' } },
      { n:'SchematicsException', k:'ng', w:{ en:'DevKit’s error class: stop and tell the user why.', ar:'كلاس الـ error بتاع DevKit: وقّف وقول لليوزر ليه.' } },
      { n:'chain', k:'ng', w:{ en:'DevKit’s function: run these rules in order.', ar:'function من DevKit: شغّل الـ rules دي بالترتيب.' } },
      { n:'mergeWith', k:'ng', w:{ en:'DevKit’s function: add generated files to the tree.', ar:'function من DevKit: ضيف الملفات اللي اتعملت للشجرة.' } },
      { n:'apply', k:'ng', w:{ en:'DevKit’s function: run rules over a set of template files.', ar:'function من DevKit: شغّل rules على مجموعة ملفات تمبلت.' } },
      { n:'url', k:'ng', w:{ en:'DevKit’s function: read the template files from this folder.', ar:'function من DevKit: اقرا ملفات التمبلت من الفولدر ده.' } },
      { n:'applyTemplates', k:'ng', w:{ en:'DevKit’s function: fill in <code>&lt;%= %&gt;</code> and <code>__x__</code> in files ending in <code>.template</code>, then drop that suffix.', ar:'function من DevKit: املا <code>&lt;%= %&gt;</code> و<code>__x__</code> في الملفات اللي آخرها <code>.template</code>، وبعدين شيل اللاحقة دي.' } },
      { n:'template', k:'ng', only:['ts'], w:{ en:'DevKit’s older function: fills in the templates but keeps the file name’s <code>.template</code>.', ar:'function أقدم من DevKit: بتملا القوالب بس بتسيب <code>.template</code> في اسم الملف.' } },
      { n:'move', k:'ng', w:{ en:'DevKit’s function: put the files in this folder.', ar:'function من DevKit: حط الملفات في الفولدر ده.' } },
      { n:'strings', k:'ng', w:{ en:'DevKit’s helpers for names: <code>dasherize</code>, <code>classify</code>, <code>camelize</code>.', ar:'مساعدين DevKit للأسماء: <code>dasherize</code> و<code>classify</code> و<code>camelize</code>.' } },
      { n:'dasherize', k:'ng', w:{ en:'A DevKit helper: <code>OrderHistory</code> → <code>order-history</code>.', ar:'مساعد من DevKit: <code>OrderHistory</code> ← <code>order-history</code>.' } },
      { n:'classify', k:'ng', w:{ en:'A DevKit helper: <code>order-history</code> → <code>OrderHistory</code>.', ar:'مساعد من DevKit: <code>order-history</code> ← <code>OrderHistory</code>.' } },
      { n:'read', k:'ng', only:['ts'], w:{ en:'A <code>Tree</code> method: the file’s contents, or <code>null</code>.', ar:'ميثود في <code>Tree</code>: محتوى الملف، أو <code>null</code>.' } },
      { n:'overwrite', k:'ng', w:{ en:'A <code>Tree</code> method: replace the file’s contents.', ar:'ميثود في <code>Tree</code>: بدّل محتوى الملف.' } },
      { n:'<%=', k:'ng', re:'<%=', w:{ en:'The template engine’s tag: “print this here”.', ar:'التاج بتاع الـ template engine: «اطبع ده هنا».' } },
      { n:'%>', k:'ng', re:'%>', w:{ en:'Closes the template tag.', ar:'بيقفل تاج التمبلت.' } },
      { n:'createBuilder', k:'ng', w:{ en:'Architect’s function that turns your function into a builder.', ar:'function من Architect بتحوّل الـ function بتاعتك لـ builder.' } },
      { n:'BuilderContext', k:'ng', w:{ en:'Architect’s type for the second parameter.', ar:'الـ type بتاع Architect للـ parameter التاني.' } },
      { n:'BuilderOutput', k:'ng', w:{ en:'Architect’s result type. <code>success</code> is its key.', ar:'الـ type بتاع النتيجة في Architect. و<code>success</code> مفتاحه.' } },
      { n:'success', k:'ng', w:{ en:'A key Architect reads.', ar:'مفتاح Architect بيقراه.' } },
      { n:'logger', k:'ng', w:{ en:'The builder context’s logger.', ar:'الـ logger بتاع الـ context في الـ builder.' } },

      /* --- Angular's, in the generated component --- */
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator. The template writes it as-is.', ar:'الـ decorator بتاع أنجولار. القالب بيكتبه زي ما هو.' } },
      { n:'selector', k:'ng', w:{ en:'An option key Angular reads.', ar:'مفتاح إعداد أنجولار بيقراه.' } },
      { n:'ChangeDetectionStrategy', k:'ng', w:{ en:'Angular’s enum. <code>OnPush</code> is one of its values.', ar:'enum من أنجولار. و<code>OnPush</code> واحدة من قيمه.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One command, six stops', ar: 'أمر واحد، ست محطات' },
    lead: {
      en: 'Your team keeps building feature folders by hand, each slightly different. So you write a schematic, and a teammate types one command. Follow that command until files appear:',
      ar: 'فريقك بيعمل فولدرات الـ features بإيده، وكل واحد مختلف شوية. فانت كتبت schematic، وزميلك كتب أمر واحد. امشي ورا الأمر ده لحد ما الملفات تظهر:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'terminal', lang: 'bash', who: { en: 'a teammate · types', ar: 'زميل · بيكتب' },
          code: ['ng generate my-tools:feature checkout'],
          say: { en: `Two names, joined by a colon. ${pub('my-tools')} is your package. ${pub('feature')} is the schematic inside it. <code>checkout</code> is not a name in your code at all: it is a <b>value</b> that will land in the ${pub('name')} option.`,
                 ar: `اسمين، بينهم نقطتين. ${pub('my-tools')} الباكدج بتاعتك. و${pub('feature')} الـ schematic اللي جواها. و<code>checkout</code> مش اسم في كودك خالص: دي <b>قيمة</b> هتروح للـ option اللي اسمه ${pub('name')}.` } },
        { file: 'package.json', lang: 'json', who: { en: 'the CLI · finds the package', ar: 'الـ CLI · بيلاقي الباكدج' },
          code: ['"name": "my-tools",', '"schematics": "./collection.json"'],
          say: { en: `The CLI finds the package called ${pub('my-tools')}. The key ${ng('schematics')} is npm-level and fixed; its value is the path to your ${pub('collection.json')}.`,
                 ar: `الـ CLI بيلاقي الباكدج اللي اسمها ${pub('my-tools')}. والمفتاح ${ng('schematics')} ثابت؛ وقيمته مسار ${pub('collection.json')} بتاعك.` } },
        { file: 'collection.json', lang: 'json', who: { en: 'the CLI · finds the schematic', ar: 'الـ CLI · بيلاقي الـ schematic' },
          code: ['"feature": {', '  "factory": "./feature/index#generateFeature",', '  "schema": "./feature/schema.json"', '}'],
          say: { en: `The key ${pub('feature')} must equal what was typed after the colon. ${ng('factory')} says: open <code>./feature/index</code> and call the export named ${pub('generateFeature')}. That <code>#name</code> is a string; TypeScript never checks it.`,
                 ar: `المفتاح ${pub('feature')} لازم يساوي اللي اتكتب بعد النقطتين. و${ng('factory')} بيقول: افتح <code>./feature/index</code> ونادي الـ export اللي اسمه ${pub('generateFeature')}. والـ <code>#name</code> ده string؛ TypeScript عمره ما بيشيّكه.` } },
        { file: 'schema.json', lang: 'json', who: { en: 'the CLI · fills the options', ar: 'الـ CLI · بيملا الـ options' },
          code: ['"name": {', '  "type": "string",', '  "$default": { "$source": "argv", "index": 0 }', '}'],
          say: { en: `You declare an option called ${pub('name')}. ${ng('$default')} with ${ng('argv')} and ${ng('index')} <code>0</code> tells the CLI: take the first word after the schematic name. That is how <code>checkout</code> becomes <code>name: 'checkout'</code>.`,
                 ar: `انت بتعلن option اسمه ${pub('name')}. و${ng('$default')} مع ${ng('argv')} و${ng('index')} <code>0</code> بيقولوا للـ CLI: خد أول كلمة بعد اسم الـ schematic. وكده <code>checkout</code> بتبقى <code>name: 'checkout'</code>.` } },
        { file: 'index.ts', lang: 'ts', who: { en: 'your factory · runs', ar: 'الـ factory بتاعتك · بتشتغل' },
          code: ['export function generateFeature(options: { name: string; path?: string }): Rule {', "  const folder = options.path ?? `src/app/features/${strings.dasherize(options.name)}`;"],
          say: { en: `DevKit calls ${pub('generateFeature')} with the options object. You may call the parameter anything (${mine('options')} here), but the property names inside it, ${pub('name')} and ${pub('path')}, must match <code>schema.json</code>.`,
                 ar: `DevKit بينادي ${pub('generateFeature')} ومعاها أوبجكت الـ options. تقدر تسمّي الـ parameter أي حاجة (هنا ${mine('options')})، بس أسماء الـ properties اللي جواه، ${pub('name')} و${pub('path')}، لازم تطابق <code>schema.json</code>.` } },
        { file: TPL, lang: 'ts', who: { en: 'your template · fills in', ar: 'القالب بتاعك · بيتملي' },
          code: ['export class <%= classify(name) %> {}'],
          say: { en: `The template reads ${pub('name')} again, and ${ng('classify')} turns <code>checkout</code> into <code>Checkout</code>. Even the file’s own name uses it: <code>__name@dasherize__</code> becomes <code>checkout</code>, and ${ng('applyTemplates')} drops <code>.template</code>. Result: <code>checkout.ts</code>.`,
                 ar: `القالب بيقرا ${pub('name')} تاني، و${ng('classify')} بتحوّل <code>checkout</code> لـ <code>Checkout</code>. حتى اسم الملف نفسه بيستخدمه: <code>__name@dasherize__</code> بيبقى <code>checkout</code>، و${ng('applyTemplates')} بتشيل <code>.template</code>. والنتيجة: <code>checkout.ts</code>.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: '<code>my-tools</code> finds the package, <code>feature</code> finds the entry, <code>#generateFeature</code> finds the function, and <code>name</code> carries the value into the templates. Four links, all strings, all yours, and nothing checks them until someone runs the command.',
        ar: '<code>my-tools</code> بيلاقي الباكدج، و<code>feature</code> بيلاقي المدخل، و<code>#generateFeature</code> بيلاقي الـ function، و<code>name</code> بيشيل القيمة للقوالب. أربع روابط، كلها strings، وكلها بتاعتك، ومحدش بيشيّكها لحد ما حد يشغّل الأمر.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Which file?', ar: 'أنهي ملف؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'You write every file here, but you do not pick every name. The keys belong to npm, JSON Schema and DevKit.',
      ar: 'انت اللي بتكتب كل ملف هنا، بس مش انت اللي بتختار كل اسم. المفاتيح بتاعة npm وJSON Schema وDevKit.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['the package name', '<code>package.json</code>', 'you', `you pick ${pub('my-tools')}; the key ${ng('name')} is npm’s`],
            ar: ['اسم الباكدج', '<code>package.json</code>', 'انت', `انت بتختار ${pub('my-tools')}؛ والمفتاح ${ng('name')} بتاع npm`] },
          { en: ['the command name', '<code>collection.json</code>', 'you', `you pick ${pub('feature')} and aliases like ${pub('f')}`],
            ar: ['اسم الأمر', '<code>collection.json</code>', 'انت', `انت بتختار ${pub('feature')} والـ aliases زي ${pub('f')}`] },
          { en: ['the link to the code', '<code>collection.json</code>', 'you', `${ng('factory')} is DevKit’s; the path and ${pub('generateFeature')} must copy your file`],
            ar: ['الرابط للكود', '<code>collection.json</code>', 'انت', `${ng('factory')} بتاع DevKit؛ والمسار و${pub('generateFeature')} لازم ينسخوا ملفك`] },
          { en: ['the options', '<code>schema.json</code>', 'you', `you pick ${pub('name')} and ${pub('path')}; ${ng('properties')}, ${ng('$default')}, ${ng('x-prompt')} are fixed`],
            ar: ['الـ options', '<code>schema.json</code>', 'انت', `انت بتختار ${pub('name')} و${pub('path')}؛ و${ng('properties')} و${ng('$default')} و${ng('x-prompt')} ثابتين`] },
          { en: ['the factory', '<code>feature/index.ts</code>', 'you', `you pick ${pub('generateFeature')}, ${mine('options')}, ${mine('addRoute')}; ${ng('Rule')}, ${ng('chain')}, ${ng('applyTemplates')} are DevKit’s`],
            ar: ['الـ factory', '<code>feature/index.ts</code>', 'انت', `انت بتختار ${pub('generateFeature')} و${mine('options')} و${mine('addRoute')}؛ و${ng('Rule')} و${ng('chain')} و${ng('applyTemplates')} بتوع DevKit`] },
          { en: ['the templates', '<code>feature/files/</code>', 'you', `they can only use names you passed in: ${pub('name')}, ${ng('classify')}, ${ng('dasherize')}`],
            ar: ['القوالب', '<code>feature/files/</code>', 'انت', `مايقدروش يستخدموا غير الأسماء اللي انت بعتّها: ${pub('name')} و${ng('classify')} و${ng('dasherize')}`] },
        ] },
      { t: 'ul',
        en: ['<b>The command line never reaches your function directly.</b> It goes package → collection → <code>#export</code>. If any link is wrong, your function is never called.',
             '<b>Option names live in three places:</b> <code>schema.json</code>, the <code>options</code> type in TypeScript, and the templates. The type is only your promise; TypeScript cannot compare it with the JSON.',
             '<b>A template only knows what you hand it.</b> It has no access to your factory’s variables. It sees the keys of the object you pass to <code>applyTemplates</code>, nothing else.'],
        ar: ['<b>سطر الأوامر عمره ما بيوصل للـ function بتاعتك على طول.</b> هو بيمشي باكدج ← collection ← <code>#export</code>. لو أي رابط غلط، الـ function بتاعتك عمرها ما هتتنادى.',
             '<b>أسماء الـ options عايشة في تلات أماكن:</b> <code>schema.json</code>، والـ type بتاع <code>options</code> في TypeScript، والقوالب. والـ type ده مجرد وعد منك؛ TypeScript مايقدرش يقارنه بالـ JSON.',
             '<b>القالب مايعرفش غير اللي انت بتديهوله.</b> مالوش أي وصول لمتغيرات الـ factory بتاعتك. هو شايف مفاتيح الأوبجكت اللي بتبعته لـ <code>applyTemplates</code>، ومفيش غيرها.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'The whole package, every name coloured', ar: 'الباكدج كلها، وكل اسم ملوّن' },
    lead: {
      en: 'The same schematic, complete, plus the line in the app’s <code>angular.json</code> and what the command prints. Hover a name to light it up in every file. Then press <b>Rename test</b>: watch <code>name</code> change inside the templates and inside the template <b>file names</b>.',
      ar: 'نفس الـ schematic، كامل، ومعاه السطر اللي في <code>angular.json</code> بتاع التطبيق واللي الأمر بيطبعه. قف بالماوس على أي اسم وهينوّر في كل الملفات. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: بص على <code>name</code> وهو بيتغير جوه القوالب وجوه <b>أسماء ملفات</b> القوالب.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: TREE, lang: 'bash', tag: { en: 'the layout', ar: 'الشكل' }, code: [
        'my-tools/',
        '  package.json',
        '  collection.json',
        '  feature/',
        '    index.ts',
        '    schema.json',
        '    files/',
        '      __name@dasherize__.ts.template',
        '      __name@dasherize__.html.template' ] },
      { t: 'code', name: 'package.json', lang: 'json', tag: { en: 'the package', ar: 'الباكدج' }, code: [
        '{',
        '  "name": "my-tools",',
        '  "version": "1.0.0",',
        '  "schematics": "./collection.json"',
        '}' ] },
      { t: 'code', name: 'collection.json', lang: 'json', tag: { en: 'the menu', ar: 'المنيو' }, code: [
        '{',
        '  "$schema": "./node_modules/@angular-devkit/schematics/collection-schema.json",',
        '  "schematics": {',
        '    "feature": {',
        '      "description": "Generate a feature folder the way we do it here",',
        '      "factory": "./feature/index#generateFeature",',
        '      "schema": "./feature/schema.json",',
        '      "aliases": ["f"]',
        '    }',
        '  }',
        '}' ] },
      { t: 'code', name: 'schema.json', lang: 'json', tag: { en: 'the options', ar: 'الـ options' }, code: [
        '{',
        '  "$schema": "http://json-schema.org/schema",',
        '  "$id": "MyToolsFeature",',
        '  "type": "object",',
        '  "properties": {',
        '    "name": {',
        '      "type": "string",',
        '      "description": "The feature name",',
        '      "$default": { "$source": "argv", "index": 0 },',
        '      "x-prompt": "What is the feature called?"',
        '    },',
        '    "path": {',
        '      "type": "string",',
        '      "description": "Where to create it"',
        '    }',
        '  },',
        '  "required": ["name"]',
        '}' ] },
      { t: 'code', name: 'index.ts', lang: 'ts', tag: { en: 'the factory', ar: 'الـ factory' }, code: [
        "import { Rule, SchematicsException, Tree, apply, applyTemplates, chain, mergeWith, move, url } from '@angular-devkit/schematics';",
        "import { strings } from '@angular-devkit/core';",
        '',
        'export function generateFeature(options: { name: string; path?: string }): Rule {',
        '  const folder = options.path ?? `src/app/features/${strings.dasherize(options.name)}`;',
        '  return chain([',
        "    mergeWith(apply(url('./files'), [",
        '      applyTemplates({ ...strings, ...options }),',
        '      move(folder),',
        '    ])),',
        '    addRoute(options.name),',
        '  ]);',
        '}',
        '',
        'function addRoute(featureName: string): Rule {',
        '  return (tree: Tree) => {',
        "    const file = 'src/app/app.routes.ts';",
        "    const text = tree.read(file)?.toString('utf-8');",
        "    const marker = 'routes: Routes = [';",
        '    if (!text || !text.includes(marker)) {',
        '      throw new SchematicsException(`Could not find "${marker}" in ${file}`);',
        '    }',
        '    const slug = strings.dasherize(featureName);',
        "    const route = `  { path: '${slug}', loadComponent: () => import('./features/${slug}/${slug}').then(m => m.${strings.classify(featureName)}) },`;",
        "    tree.overwrite(file, text.replace(marker, marker + '\\n' + route));",
        '    return tree;',
        '  };',
        '}' ] },
      { t: 'code', name: TPL, lang: 'ts', tag: { en: 'a template', ar: 'قالب' }, code: [
        "import { ChangeDetectionStrategy, Component } from '@angular/core';",
        '',
        '@Component({',
        "  selector: 'app-<%= dasherize(name) %>',",
        '  changeDetection: ChangeDetectionStrategy.OnPush,',
        "  templateUrl: './<%= dasherize(name) %>.html',",
        '})',
        'export class <%= classify(name) %> {}' ] },
      { t: 'code', name: HTPL, lang: 'html', tag: { en: 'a template', ar: 'قالب' }, code: [
        '<h2><%= classify(name) %> works</h2>' ] },
      { t: 'code', name: 'angular.json', lang: 'json', tag: { en: 'in the app (excerpt)', ar: 'في التطبيق (جزء)' }, code: [
        '"cli": {',
        '  "schematicCollections": ["my-tools", "@schematics/angular"]',
        '}' ] },
      { t: 'code', name: 'terminal', lang: 'bash', tag: { en: 'running it', ar: 'تشغيله' }, code: [
        'ng generate my-tools:feature checkout --dry-run',
        'ng generate my-tools:feature checkout',
        '# CREATE src/app/features/checkout/checkout.ts',
        '# CREATE src/app/features/checkout/checkout.html',
        '# UPDATE src/app/app.routes.ts' ] },
      { t: 'nmtable' }
    ]
  },

  /* ------------------------------------------------------------ 4 */
  {
    id: 'rename',
    kicker: { en: 'Is it OK to change it?', ar: 'ينفع أغيّره؟' },
    title: { en: 'What breaks when you rename each name', ar: 'إيه اللي بيبوظ لما تغيّر كل اسم' },
    lead: {
      en: 'This is where schematics differ from ordinary Angular code. The TypeScript compiles fine after almost any rename, because the links are strings in JSON. The failure waits until someone runs <code>ng generate</code>.',
      ar: 'هنا الـ schematics بتختلف عن كود أنجولار العادي. الـ TypeScript بيتكومبايل عادي بعد أي تغيير تقريبًا، عشان الروابط strings في JSON. والفشل بيستنى لحد ما حد يشغّل <code>ng generate</code>.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [pub('my-tools') + ' (the package)', 'every command, and <code>schematicCollections</code> in each app', 'The CLI stops: it cannot find a collection by that name.'],
            ar: [pub('my-tools') + ' (الباكدج)', 'كل أمر، و<code>schematicCollections</code> في كل تطبيق', 'الـ CLI بيقف: مش لاقي collection بالاسم ده.'] },
          { en: [pub('collection.json') + ' (the file)', '<code>"schematics"</code> in <code>package.json</code>', 'The CLI cannot load the collection when someone runs a command.'],
            ar: [pub('collection.json') + ' (الملف)', '<code>"schematics"</code> في <code>package.json</code>', 'الـ CLI مش هيعرف يحمّل الـ collection لما حد يشغّل أمر.'] },
          { en: [pub('feature') + ' (the schematic)', 'the commands people type, your docs', 'The CLI stops: no schematic with that name in the collection.'],
            ar: [pub('feature') + ' (الـ schematic)', 'الأوامر اللي الناس بتكتبها، والـ docs بتاعتك', 'الـ CLI بيقف: مفيش schematic بالاسم ده في الـ collection.'] },
          { en: [pub('generateFeature') + ' (the export)', 'the <code>#generateFeature</code> in <code>"factory"</code>', '<b>TypeScript is happy.</b> The error appears only when the command runs and DevKit cannot find that export.'],
            ar: [pub('generateFeature') + ' (الـ export)', 'الـ <code>#generateFeature</code> في <code>"factory"</code>', '<b>TypeScript مبسوط.</b> الـ error بيظهر بس لما الأمر يشتغل وDevKit مايلاقيش الـ export ده.'] },
          { en: [pub('name') + ' (the option)', '<code>schema.json</code>, the <code>options</code> type, <code>options.name</code>, every <code>&lt;%= … name %&gt;</code>, and every <code>__name@…__</code> file name', '<b>Nothing checks this before it runs.</b> TypeScript only compares <code>options.name</code> with the type you wrote. A template that still says the old name fails when the schematic runs.'],
            ar: [pub('name') + ' (الـ option)', '<code>schema.json</code>، والـ type بتاع <code>options</code>، و<code>options.name</code>، وكل <code>&lt;%= … name %&gt;</code>، وكل اسم ملف <code>__name@…__</code>', '<b>مفيش حاجة بتشيّك ده قبل التشغيل.</b> TypeScript بيقارن <code>options.name</code> بالـ type اللي انت كتبته وبس. والقالب اللي لسه كاتب الاسم القديم بيفشل لما الـ schematic يشتغل.'] },
          { en: [pub('path') + ' (the option)', '<code>schema.json</code> and <code>options.path</code>', 'The CLI no longer knows <code>--path</code>; the option cannot reach your code.'],
            ar: [pub('path') + ' (الـ option)', '<code>schema.json</code> و<code>options.path</code>', 'الـ CLI مابقاش يعرف <code>--path</code>؛ والـ option مش هيوصل لكودك.'] },
          { en: [pub('files') + ' (the folder)', "<code>url('./files')</code>", 'Fails when the schematic runs, not when it compiles.'],
            ar: [pub('files') + ' (الفولدر)', "<code>url('./files')</code>", 'بيفشل لما الـ schematic يشتغل، مش لما يتكومبايل.'] },
          { en: [mine('options') + ', ' + mine('addRoute') + ', ' + mine('featureName') + ', ' + mine('tree') + ', ' + mine('marker'), 'only inside <code>index.ts</code>', 'Compile error inside the file. The one comfortable case.'],
            ar: [mine('options') + '، ' + mine('addRoute') + '، ' + mine('featureName') + '، ' + mine('tree') + '، ' + mine('marker'), 'جوه <code>index.ts</code> بس', 'Compile error جوه الملف. الحالة المريحة الوحيدة.'] },
          { en: [`${ng('factory')}, ${ng('$default')}, ${ng('applyTemplates')}, ${ng('classify')}`, 'you cannot rename these', 'They belong to DevKit and JSON Schema.'],
            ar: [`${ng('factory')}، ${ng('$default')}، ${ng('applyTemplates')}، ${ng('classify')}`, 'دول مينفعش يتغيروا', 'دول بتوع DevKit وJSON Schema.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b> above the files. <code>name</code> changes in <code>schema.json</code>, in <code>index.ts</code>, inside <code>&lt;%= %&gt;</code>, and in the file names in the folder listing, all at once. That is how much has to move for one rename.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b> فوق الملفات. <code>name</code> بيتغير في <code>schema.json</code>، وفي <code>index.ts</code>، وجوه <code>&lt;%= %&gt;</code>، وفي أسماء الملفات في شكل الفولدر، كله مرة واحدة. ده حجم اللي لازم يتحرك عشان تغيير اسم واحد.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتاعتك' },
    title: { en: 'Three different things called <code>name</code>, and the other fixed names', ar: 'تلات حاجات مختلفة اسمها <code>name</code>، والأسماء الثابتة التانية' },
    lead: {
      en: 'The single most confusing word in a schematic is <code>name</code>. It appears three times with three owners.',
      ar: 'أكتر كلمة بتلخبط في الـ schematic هي <code>name</code>. بتظهر تلات مرات، وليها تلات أصحاب.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Where', 'Whose', 'Can you rename it?'], ar: ['فين', 'بتاع مين', 'ينفع تغيّره؟'] },
        rows: [
          { en: ['<code>"name": "my-tools"</code> in <code>package.json</code>', `npm’s key ${ng('name')}`, 'No. The value <code>my-tools</code> is yours.'],
            ar: ['<code>"name": "my-tools"</code> في <code>package.json</code>', `مفتاح npm ${ng('name')}`, 'لأ. والقيمة <code>my-tools</code> بتاعتك.'] },
          { en: ['<code>"name": { … }</code> in <code>schema.json</code>, and everywhere it is read', `your option ${pub('name')}`, 'Yes, in every place at once. Keeping <code>name</code> is a strong habit, though: Angular’s own schematics use it.'],
            ar: ['<code>"name": { … }</code> في <code>schema.json</code>، وكل مكان بيتقري فيه', `الـ option بتاعك ${pub('name')}`, 'آه، في كل الأماكن مرة واحدة. بس إنك تسيبه <code>name</code> عادة قوية: الـ schematics بتاعة أنجولار نفسها بتستخدمه.'] },
          { en: ['the parameter of <code>addRoute</code>', `yours, private: ${mine('featureName')}`, 'Yes, freely. It is deliberately not called <code>name</code>, so it cannot be confused with the option.'],
            ar: ['الـ parameter بتاع <code>addRoute</code>', `بتاعك، خاص: ${mine('featureName')}`, 'آه، براحتك. واسمه مش <code>name</code> بقصد، عشان مايتلخبطش مع الـ option.'] },
        ] },
      { t: 'p',
        en: 'The rest of the fixed names come from four owners:',
        ar: 'وباقي الأسماء الثابتة جاية من أربع أصحاب:' },
      { t: 'ul',
        en: [`<b>npm:</b> ${ng('name')}, and the pointer keys ${ng('schematics')} and ${ng('builders')} in <code>package.json</code>.`,
             `<b>DevKit’s JSON:</b> ${ng('factory')}, ${ng('schema')}, ${ng('description')}, ${ng('aliases')}, ${ng('$default')}, ${ng('$source')}, ${ng('argv')}, ${ng('x-prompt')}; for builders, ${ng('implementation')}.`,
             `<b>JSON Schema:</b> ${ng('$schema')}, ${ng('properties')}, ${ng('required')}, and <code>type</code>.`,
             `<b>DevKit’s TypeScript:</b> ${ng('Rule')}, ${ng('Tree')}, ${ng('chain')}, ${ng('mergeWith')}, ${ng('apply')}, ${ng('url')}, ${ng('applyTemplates')}, ${ng('move')}, ${ng('strings')}, ${ng('read')}, ${ng('overwrite')}, and the template tags ${ng('<%=')} … ${ng('%>')}.`],
        ar: [`<b>npm:</b> ${ng('name')}، ومفاتيح الإشارة ${ng('schematics')} و${ng('builders')} في <code>package.json</code>.`,
             `<b>الـ JSON بتاع DevKit:</b> ${ng('factory')}، ${ng('schema')}، ${ng('description')}، ${ng('aliases')}، ${ng('$default')}، ${ng('$source')}، ${ng('argv')}، ${ng('x-prompt')}؛ وللـ builders، ${ng('implementation')}.`,
             `<b>JSON Schema:</b> ${ng('$schema')}، ${ng('properties')}، ${ng('required')}، و<code>type</code>.`,
             `<b>الـ TypeScript بتاع DevKit:</b> ${ng('Rule')}، ${ng('Tree')}، ${ng('chain')}، ${ng('mergeWith')}، ${ng('apply')}، ${ng('url')}، ${ng('applyTemplates')}، ${ng('move')}، ${ng('strings')}، ${ng('read')}، ${ng('overwrite')}، وتاجات القوالب ${ng('<%=')} … ${ng('%>')}.`] }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'People will type these names in a terminal for years. Choose for them.',
      ar: 'الناس هتكتب الأسماء دي في الـ terminal لسنين. اختار عشانهم.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['the schematic', '<code>feature</code>, <code>data-service</code>', '<code>createFeatureSchematic</code>', 'It follows <code>ng generate</code>, like <code>component</code> does. A short noun reads naturally there.'],
            ar: ['الـ schematic', '<code>feature</code>، <code>data-service</code>', '<code>createFeatureSchematic</code>', 'بييجي بعد <code>ng generate</code>، زي <code>component</code>. اسم قصير بيتقري طبيعي هناك.'] },
          { en: ['the main option', '<code>name</code>', '<code>featureName</code>, <code>n</code>', 'Angular’s own schematics take <code>name</code> as the first word. Your teammates will expect the same.'],
            ar: ['الـ option الأساسي', '<code>name</code>', '<code>featureName</code>، <code>n</code>', 'الـ schematics بتاعة أنجولار نفسها بتاخد <code>name</code> كأول كلمة. وزمايلك هيتوقعوا نفس الحاجة.'] },
          { en: ['the factory function', '<code>generateFeature</code>, or a default export', 'the same word as the schematic when it causes confusion', 'The command name and the function name are different links. A different word makes that visible.'],
            ar: ['الـ factory function', '<code>generateFeature</code>، أو default export', 'نفس كلمة الـ schematic لو هتلخبط', 'اسم الأمر واسم الـ function رابطين مختلفين. كلمة مختلفة بتخلّي ده واضح.'] },
          { en: ['a helper’s parameter', '<code>featureName</code>', '<code>name</code>', 'Keep <code>name</code> for the option only, so a search for it finds only the option.'],
            ar: ['الـ parameter بتاع function مساعدة', '<code>featureName</code>', '<code>name</code>', 'سيب <code>name</code> للـ option بس، عشان لما تدوّر عليه تلاقي الـ option بس.'] },
          { en: ['template file names', '<code>__name@dasherize__.ts.template</code>', '<code>__name__.ts.template</code>', 'Without <code>@dasherize</code>, the file is named exactly as typed, so <code>OrderHistory</code> gives <code>OrderHistory.ts</code>.'],
            ar: ['أسماء ملفات القوالب', '<code>__name@dasherize__.ts.template</code>', '<code>__name__.ts.template</code>', 'من غير <code>@dasherize</code>، الملف بياخد الاسم زي ما اتكتب بالظبط، فـ <code>OrderHistory</code> بتدّي <code>OrderHistory.ts</code>.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Four places where the name is not free', ar: 'أربع أماكن الاسم فيهم مش براحتك' },
    lead: {
      en: 'These names look like choices, but a rule has already made them.',
      ar: 'الأسماء دي شكلها اختيار، بس فيه قاعدة خدت القرار خلاص.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'The template file name syntax', ar: 'طريقة كتابة أسماء ملفات القوالب' }, blocks: [
        { t: 'p',
          en: `A file name like <code>__name@dasherize__.ts.template</code> has three fixed parts: double underscores around a value, <code>@</code> before a helper to apply, and the <code>.template</code> suffix. Only the words inside are names, and they must be keys you passed to ${ng('applyTemplates')}: ${pub('name')} from your options, ${ng('dasherize')} from ${ng('strings')}. The suffix also keeps TypeScript from compiling your templates as source.`,
          ar: `اسم ملف زي <code>__name@dasherize__.ts.template</code> فيه تلات حتت ثابتة: underscore مزدوجة حوالين القيمة، و<code>@</code> قبل الـ helper اللي هيتطبّق، واللاحقة <code>.template</code>. الكلمات اللي جوه بس هي الأسماء، ولازم تكون مفاتيح انت بعتّها لـ ${ng('applyTemplates')}: ${pub('name')} من الـ options بتاعتك، و${ng('dasherize')} من ${ng('strings')}. واللاحقة كمان بتمنع TypeScript إنه يكومبايل القوالب كأنها كود.` }
      ]},
      { t: 'step', n: 'B', title: { en: 'Template variables are the keys you spread in', ar: 'متغيرات القالب هي المفاتيح اللي انت فردتها' }, blocks: [
        { t: 'pair',
          bad:  { name: 'index.ts · forgot the options', lang: 'ts', code: ['applyTemplates({ ...strings }),'] },
          good: { name: 'index.ts · both', lang: 'ts', code: ['applyTemplates({ ...strings, ...options }),'] } },
        { t: 'p',
          en: 'Inside a template, <code>name</code> exists only because <code>...options</code> put a key called <code>name</code> in that object, and <code>classify</code> exists only because of <code>...strings</code>. Leave one out and the templates refer to something that is not there, which fails when the schematic runs.',
          ar: 'جوه القالب، <code>name</code> موجود بس عشان <code>...options</code> حطت مفتاح اسمه <code>name</code> في الأوبجكت ده، و<code>classify</code> موجودة بس بسبب <code>...strings</code>. لو سيبت واحد فيهم، القوالب هتشاور على حاجة مش موجودة، وده بيفشل لما الـ schematic يشتغل.' }
      ]},
      { t: 'step', n: 'C', title: { en: 'Special schematic names the CLI looks for', ar: 'أسماء schematics خاصة الـ CLI بيدوّر عليها' }, blocks: [
        { t: 'p',
          en: 'Two schematic names are chosen for you. A schematic called <code>ng-add</code> in your collection is what <code>ng add my-tools</code> runs. And <code>ng update my-tools</code> runs the migrations listed under an <code>"ng-update"</code> key in <code>package.json</code>. Spell them any other way and those commands will not find them.',
          ar: 'فيه اسمين لـ schematics متختارين عنك. الـ schematic اللي اسمه <code>ng-add</code> في الـ collection بتاعتك هو اللي <code>ng add my-tools</code> بيشغّله. و<code>ng update my-tools</code> بيشغّل الـ migrations اللي مكتوبة تحت مفتاح <code>"ng-update"</code> في <code>package.json</code>. لو كتبتهم بأي شكل تاني، الأوامر دي مش هتلاقيهم.' },
        { t: 'code', name: 'terminal · alias', lang: 'bash', tag: { en: 'also allowed', ar: 'مسموح برضه' }, code: [
          'ng generate my-tools:f checkout',
          'ng generate feature checkout' ] },
        { t: 'p',
          en: `The first line works because of ${ng('aliases')}: ${pub('f')} is a second name for ${pub('feature')}. The second works because the app lists ${pub('my-tools')} in ${ng('schematicCollections')}, so the CLI searches it without a prefix.`,
          ar: `السطر الأول شغال بسبب ${ng('aliases')}: ${pub('f')} اسم تاني لـ ${pub('feature')}. والتاني شغال عشان التطبيق كاتب ${pub('my-tools')} في ${ng('schematicCollections')}، فالـ CLI بيدوّر فيها من غير prefix.` }
      ]},
      { t: 'step', n: 'D', title: { en: 'Builders: the same wiring, two names that look alike', ar: 'الـ builders: نفس التوصيل، واسمين شبه بعض' }, blocks: [
        { t: 'p',
          en: 'A builder <b>runs</b> something instead of writing files, and it is found the same way: package → <code>builders.json</code> → file. The trap is that <code>angular.json</code> has two names on one line: the <b>target</b> you run, and the <b>builder</b> it uses.',
          ar: 'الـ builder بي<b>شغّل</b> حاجة بدل ما يكتب ملفات، وبيتلاقي بنفس الطريقة: باكدج ← <code>builders.json</code> ← ملف. والفخ إن <code>angular.json</code> فيه اسمين في نفس المكان: الـ <b>target</b> اللي بتشغّله، والـ <b>builder</b> اللي بيستخدمه.' },
        { t: 'code', name: 'package.json · builders', lang: 'json', tag: { en: 'the package', ar: 'الباكدج' }, code: [
          '{',
          '  "name": "my-tools",',
          '  "schematics": "./collection.json",',
          '  "builders": "./builders.json"',
          '}' ] },
        { t: 'code', name: 'builders.json', lang: 'json', tag: { en: 'the builder menu', ar: 'منيو الـ builders' }, code: [
          '{',
          '  "builders": {',
          '    "verify": {',
          '      "implementation": "./verify/index",',
          '      "schema": "./verify/schema.json",',
          '      "description": "Check the release manifest"',
          '    }',
          '  }',
          '}' ] },
        { t: 'code', name: 'verify/index.ts', lang: 'ts', tag: { en: 'the builder', ar: 'الـ builder' }, code: [
          "import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';",
          "import { readFile } from 'node:fs/promises';",
          '',
          'export default createBuilder(async (options: { manifest: string }, context: BuilderContext): Promise<BuilderOutput> => {',
          '  context.logger.info(`Checking ${options.manifest}`);',
          "  const raw = await readFile(options.manifest, 'utf-8');",
          "  return { success: raw.includes('\"version\"') };",
          '});' ] },
        { t: 'code', name: 'angular.json · target', lang: 'json', tag: { en: 'in the app', ar: 'في التطبيق' }, code: [
          '"check-release": {',
          '  "builder": "my-tools:verify",',
          '  "options": { "manifest": "release.json" }',
          '}' ] },
        { t: 'code', name: 'terminal · run', lang: 'bash', tag: { en: 'running it', ar: 'تشغيله' }, code: [
          'ng run shop:check-release' ] },
        { t: 'p',
          en: `${pub('check-release')} is the target: you type it after the project name. ${pub('verify')} is the builder: it appears only after <code>my-tools:</code>. ${ng('implementation')} uses the file’s <b>default export</b>, so there is no <code>#name</code> to keep in sync here. ${pub('manifest')} must match between <code>angular.json</code>, the builder’s <code>schema.json</code>, and <code>options.manifest</code>.`,
          ar: `${pub('check-release')} هو الـ target: بتكتبه بعد اسم المشروع. و${pub('verify')} هو الـ builder: بيظهر بس بعد <code>my-tools:</code>. و${ng('implementation')} بيستخدم الـ <b>default export</b> بتاع الملف، فمفيش <code>#name</code> تفضل تظبطه هنا. و${pub('manifest')} لازم يبقى زي بعض في <code>angular.json</code>، و<code>schema.json</code> بتاع الـ builder، و<code>options.manifest</code>.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: 'Older setups, same names', ar: 'إعدادات أقدم، نفس الأسماء' },
    lead: {
      en: 'Two older spellings you will meet in existing tools and blog posts.',
      ar: 'كتابتين أقدم هتقابلهم في أدوات موجودة ومقالات.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'angular.json — older', lang: 'json', code: [
          '"cli": {',
          '  "defaultCollection": "my-tools"',
          '}' ] },
        good: { name: 'angular.json — today', lang: 'json', code: [
          '"cli": {',
          '  "schematicCollections": ["my-tools", "@schematics/angular"]',
          '}' ] } },
      { t: 'p',
        en: '<code>defaultCollection</code> was deprecated in Angular 14 in favour of <code>schematicCollections</code>, which takes a list searched in order. Your package name <code>my-tools</code> is the same in both.',
        ar: '<code>defaultCollection</code> بقى deprecated في أنجولار 14 وحل مكانه <code>schematicCollections</code>، اللي بياخد ليستة بيدوّر فيها بالترتيب. واسم الباكدج بتاعك <code>my-tools</code> هو هو في الاتنين.' },
      { t: 'pair',
        bad:  { name: 'index.ts — older helper', lang: 'ts', code: [
          "mergeWith(apply(url('./files'), [",
          '  template({ ...strings, ...options }),',
          '  move(folder),',
          ']))' ] },
        good: { name: 'index.ts — today', lang: 'ts', code: [
          "mergeWith(apply(url('./files'), [",
          '  applyTemplates({ ...strings, ...options }),',
          '  move(folder),',
          ']))' ] } },
      { t: 'p',
        en: 'Older schematics and tutorials use <code>template()</code>. It fills in the same <code>&lt;%= %&gt;</code> and <code>__name__</code> parts, with the same names, but it does not remove the <code>.template</code> suffix. That is fine for template files without the suffix, and a silent bug with it (see the next section).',
        ar: 'الـ schematics والشروحات الأقدم بتستخدم <code>template()</code>. بتملا نفس حتت <code>&lt;%= %&gt;</code> و<code>__name__</code>، بنفس الأسماء، بس مابتشيلش اللاحقة <code>.template</code>. ده مفيهوش مشكلة لملفات قوالب من غير اللاحقة، وbug صامت لو فيها اللاحقة (شوف الجزء اللي جاي).' }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It runs, and does the wrong thing', ar: 'بيشتغل، وبيعمل الحاجة الغلط' },
    title: { en: 'Mistakes that fail silently', ar: 'غلطات بتفشل في صمت' },
    lead: {
      en: 'A schematic that crashes is easy: you see the message. These ones finish happily and leave the wrong result behind.',
      ar: 'الـ schematic اللي بيقع سهل: بتشوف الرسالة. أما دول بيخلصوا وهما مبسوطين ويسيبوا نتيجة غلط.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'Files that still end in .template', ar: 'ملفات لسه آخرها .template' }, blocks: [
        { t: 'pair',
          bad:  { name: 'index.ts', lang: 'ts', code: ['template({ ...strings, ...options }),'] },
          good: { name: 'index.ts', lang: 'ts', code: ['applyTemplates({ ...strings, ...options }),'] } },
        { t: 'p', en: 'With <code>template()</code>, the command reports <code>CREATE …/checkout.ts.template</code>. The contents are right, the name is wrong, and the app ignores the file. Use <code>applyTemplates()</code> with <code>.template</code> files.',
                  ar: 'مع <code>template()</code>، الأمر بيقول <code>CREATE …/checkout.ts.template</code>. المحتوى صح، والاسم غلط، والتطبيق بيتجاهل الملف. استخدم <code>applyTemplates()</code> مع ملفات <code>.template</code>.' }
      ]},
      { t: 'step', n: '2', title: { en: 'Running the old build of your schematic', ar: 'إنك تشغّل الـ build القديم من الـ schematic بتاعك' }, blocks: [
        { t: 'pair',
          bad:  { name: 'terminal · stale', lang: 'bash', code: ['# edit index.ts, then straight away:', 'ng generate my-tools:feature checkout'] },
          good: { name: 'terminal · rebuilt', lang: 'bash', code: ['npm run build        # in my-tools: compile index.ts', 'ng generate my-tools:feature checkout'] } },
        { t: 'p', en: 'The CLI runs the compiled JavaScript, not your <code>.ts</code> file. Forget to compile and your rename, your fix, your new file all seem to “not work”, because the old code is what runs.',
                  ar: 'الـ CLI بيشغّل الجافاسكريبت المتكومبايل، مش ملف الـ <code>.ts</code> بتاعك. لو نسيت تكومبايل، التغيير والتصليح والملف الجديد كلهم هيبانوا «مش شغالين»، عشان اللي بيشتغل هو الكود القديم.' }
      ]},
      { t: 'step', n: '3', title: { en: 'A text search that finds nothing', ar: 'بحث في النص مابيلاقيش حاجة' }, blocks: [
        { t: 'pair',
          bad:  { name: 'index.ts · hopes', lang: 'ts', code: [
            "const text = tree.read(file)?.toString('utf-8') ?? '';",
            'tree.overwrite(file, text.replace(marker, marker + route));' ] },
          good: { name: 'index.ts · checks', lang: 'ts', code: [
            "const text = tree.read(file)?.toString('utf-8');",
            'if (!text || !text.includes(marker)) {',
            '  throw new SchematicsException(`Could not find "${marker}" in ${file}`);',
            '}',
            'tree.overwrite(file, text.replace(marker, marker + route));' ] } },
        { t: 'p', en: 'If someone’s <code>app.routes.ts</code> says <code>routes:Routes = [</code> without the spaces, <code>replace</code> finds nothing and returns the text unchanged. The files are created, the route is not, and nobody is told. Check, and throw a clear error.',
                  ar: 'لو <code>app.routes.ts</code> عند حد مكتوب فيه <code>routes:Routes = [</code> من غير المسافات، <code>replace</code> مش هتلاقي حاجة وهترجّع النص زي ما هو. الملفات بتتعمل، والـ route لأ، ومحدش بيعرف. شيّك، وارمي error واضح.' }
      ]},
      { t: 'step', n: '4', title: { en: 'A placeholder without its helper', ar: 'placeholder من غير الـ helper بتاعه' }, blocks: [
        { t: 'pair',
          bad:  { name: 'files/ · raw', lang: 'bash', code: ['__name__.ts.template', 'ng generate my-tools:feature OrderHistory', '# CREATE …/OrderHistory.ts'] },
          good: { name: 'files/ · dasherized', lang: 'bash', code: ['__name@dasherize__.ts.template', 'ng generate my-tools:feature OrderHistory', '# CREATE …/order-history.ts'] } },
        { t: 'p', en: 'Both work, so nothing complains. But without <code>@dasherize</code> the file name depends on how each person typed the value, and the folder slowly fills with mixed styles: exactly what the schematic was meant to stop.',
                  ar: 'الاتنين شغالين، فمحدش بيشتكي. بس من غير <code>@dasherize</code> اسم الملف بيعتمد على كل واحد كتب القيمة إزاي، والفولدر بيتملي شوية بشوية بأشكال مختلفة: بالظبط اللي الـ schematic كان المفروض يمنعه.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it does nothing', ar: 'لما مايعملش حاجة' },
    title: { en: 'Six questions, in this order', ar: 'ست أسئلة، بالترتيب ده' },
    lead: {
      en: 'The command fails, or finishes with the wrong files. Walk the chain from the command to the template.',
      ar: 'الأمر بيفشل، أو بيخلص بملفات غلط. امشي على السلسلة من الأمر لحد القالب.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Did I compile the schematic after my last edit?',
                  ar: '<b>1.</b> كومبايلت الـ schematic بعد آخر تعديل؟' },
      { t: 'chk', en: '<b>2.</b> Is the part before the colon exactly my package name, and does <code>"schematics"</code> in its <code>package.json</code> point at the collection file?',
                  ar: '<b>2.</b> الجزء اللي قبل النقطتين هو اسم الباكدج بتاعتي بالظبط، و<code>"schematics"</code> في الـ <code>package.json</code> بتاعها بيشاور على ملف الـ collection؟' },
      { t: 'chk', en: '<b>3.</b> Is the part after the colon a key (or an alias) in <code>collection.json</code>?',
                  ar: '<b>3.</b> الجزء اللي بعد النقطتين مفتاح (أو alias) في <code>collection.json</code>؟' },
      { t: 'chk', en: '<b>4.</b> Does the <code>#name</code> in <code>"factory"</code> match an exported function in that file?',
                  ar: '<b>4.</b> الـ <code>#name</code> اللي في <code>"factory"</code> بيطابق function متعملها export في الملف ده؟' },
      { t: 'chk', en: '<b>5.</b> Is each option spelled the same in <code>schema.json</code>, in <code>options.x</code>, in <code>&lt;%= %&gt;</code> and in <code>__x@…__</code>, and did I spread <code>...options</code> into <code>applyTemplates</code>?',
                  ar: '<b>5.</b> كل option مكتوب بنفس الشكل في <code>schema.json</code>، وفي <code>options.x</code>، وفي <code>&lt;%= %&gt;</code>، وفي <code>__x@…__</code>، وفردت <code>...options</code> جوه <code>applyTemplates</code>؟' },
      { t: 'chk', en: '<b>6.</b> What does <code>--dry-run</code> say it would create? Wrong paths or a leftover <code>.template</code> show up there first.',
                  ar: '<b>6.</b> <code>--dry-run</code> بيقول هيعمل إيه؟ المسارات الغلط أو <code>.template</code> اللي فضلت بتبان هناك الأول.' }
    ]
  }
  ]
};
