/* ==================================================================
   Pipes, name by name — the deep dive after the built-in-pipes topic.
   One running example (an order page that loads an order over HTTP
   and formats it with async, date, currency and percent) followed
   through every file. Model: content/deep/inputs-outputs.mjs.
   ================================================================== */

const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

export default {
  topic: 'built-in-pipes',
  tab: 'Pipes, name by name — The Angular Signal',
  title: { en: 'Pipes, name by name', ar: 'الـ pipes، اسم اسم' },
  say: {
    en: 'The page for when <code>{{ order.placedAt | date:\'dd/MM/yyyy\' }}</code> looks like one long word. It is three owners: yours on the left, Angular’s after the <code>|</code>, and a tiny format language after the <code>:</code>. One order page followed through four files.',
    ar: 'الصفحة دي للي شايف <code>{{ order.placedAt | date:\'dd/MM/yyyy\' }}</code> كأنها كلمة واحدة طويلة. هي تلات أصحاب: بتاعك على الشمال، وبتاع أنجولار بعد الـ <code>|</code>، ولغة تنسيق صغيرة بعد الـ <code>:</code>. صفحة أوردر واحدة ماشيين وراها في أربع ملفات.'
  },
  lead: {
    en: 'The idea is simple: <b>a pipe changes how a value looks on screen, never the value itself.</b> The confusing part is the names. Every pipe has two of them (<code>DatePipe</code> in your imports, <code>date</code> in your template), the arguments are Angular’s vocabulary where one capital letter changes the meaning, and <code>async</code> invents a new name for you with <code>as</code>. This page sorts out which is which.',
    ar: 'الفكرة بسيطة: <b>الـ pipe بتغيّر شكل القيمة على الشاشة، عمرها ما بتغيّر القيمة نفسها.</b> اللي بيلخبط هو الأسماء. كل pipe ليها اسمين (<code>DatePipe</code> في الـ imports، و<code>date</code> في التمبلت)، والـ arguments مفردات أنجولار وحرف كابيتال واحد بيغيّر المعنى، و<code>async</code> بتألّفلك اسم جديد بـ <code>as</code>. الصفحة دي بترتّب مين إيه.'
  },

  names: {
    note: {
      en: 'In <code>{{ x | pipe:arg }}</code> only the <b>left side</b> is yours. The pipe name after <code>|</code> and the format words after <code>:</code> are Angular’s, or a world standard like <code>EGP</code> and <code>ar-EG</code>. The orange names are your data’s fields: the server sends them, so renaming them in TypeScript alone is not enough.',
      ar: 'في <code>{{ x | pipe:arg }}</code> <b>الناحية الشمال</b> بس هي اللي بتاعتك. اسم الـ pipe بعد <code>|</code> وكلمات التنسيق بعد <code>:</code> بتوع أنجولار، أو standard عالمي زي <code>EGP</code> و<code>ar-EG</code>. والأسماء البرتقاني هي fields الداتا بتاعتك: السيرفر هو اللي بيبعتها، فتغيير اسمها في TypeScript لوحده مش كفاية.'
    },
    names: [
      /* --- shared: two files must agree --- */
      { n:'Order', k:'pub', only:['ts'],
        w:{ en:'Your data type. Every file that imports it follows a rename.', ar:'نوع الداتا بتاعك. أي ملف بيعمله import بيتغير معاه.' } },
      { n:'id', k:'pub', w:{ en:'A field the server sends.', ar:'field السيرفر بيبعته.' } },
      { n:'placedAt', k:'pub',
        w:{ en:'A field the server sends, as ISO text. The type, the template <b>and the server</b> must agree on the name.',
            ar:'field السيرفر بيبعته، كنص ISO. الـ type والتمبلت <b>والسيرفر</b> لازم يتفقوا على الاسم.' } },
      { n:'total', k:'pub', w:{ en:'A field the server sends: a plain number.', ar:'field السيرفر بيبعته: رقم عادي.' } },
      { n:'discount', k:'pub',
        w:{ en:'A field the server sends: a fraction, <code>0.1</code> for 10%.', ar:'field السيرفر بيبعته: كسر، <code>0.1</code> يعني 10%.' } },
      { n:'OrderView', k:'pub', only:['ts'],
        w:{ en:'The component’s class. Whoever shows it lists it in <code>imports</code>.', ar:'كلاس الـ component. أي حد بيعرضه بيكتبه في <code>imports</code>.' } },
      { n:'app-order-view', k:'pub',
        w:{ en:'The component’s selector, typed by whoever shows it.', ar:'الـ selector بتاع الـ component، واللي بيعرضه بيكتبه.' } },
      { n:'appConfig', k:'pub',
        w:{ en:'Your config’s name. <code>main.ts</code> imports it and passes it to <code>bootstrapApplication</code>.',
            ar:'اسم الـ config بتاعك. <code>main.ts</code> بيعمله import وبيبعته لـ <code>bootstrapApplication</code>.' } },

      /* --- yours, private to one file --- */
      { n:'order$', k:'mine',
        w:{ en:'The component’s observable. The <code>$</code> is a habit for streams, not a rule.', ar:'الـ observable بتاع الـ component. الـ <code>$</code> عادة للـ streams، مش قاعدة.' } },
      { n:'order', k:'mine', re:'(?<![\\w$/-])order(?![\\w$-])',
        w:{ en:'The name you give the unwrapped value with <code>as order</code>. It exists only inside that <code>@if</code> block.',
            ar:'الاسم اللي بتدّيه للقيمة بعد ما اتفكت بـ <code>as order</code>. موجود جوه بلوك الـ <code>@if</code> ده بس.' } },
      { n:'http', k:'mine', re:'(?<=this\\.|readonly )http(?![\\w$-])',
        w:{ en:'The component’s private name for the injected <code>HttpClient</code>.', ar:'الاسم الخاص اللي الـ component مدّيه للـ <code>HttpClient</code> اللي اتعمله inject.' } },
      { n:'localeArEg', k:'mine',
        w:{ en:'A default import: <b>you</b> pick this name. Only this file uses it.', ar:'default import: <b>انت</b> اللي بتختار الاسم ده. والملف ده بس اللي بيستخدمه.' } },

      /* --- Angular's, the standards', RxJS's --- */
      { n:'date', k:'ng', only:['html'], w:{ en:'The template name of <code>DatePipe</code>.', ar:'اسم <code>DatePipe</code> في التمبلت.' } },
      { n:'currency', k:'ng', only:['html'], w:{ en:'The template name of <code>CurrencyPipe</code>.', ar:'اسم <code>CurrencyPipe</code> في التمبلت.' } },
      { n:'percent', k:'ng', only:['html'], w:{ en:'The template name of <code>PercentPipe</code>. It multiplies by 100.', ar:'اسم <code>PercentPipe</code> في التمبلت. بتضرب في 100.' } },
      { n:'number', k:'ng', only:['html'], w:{ en:'The template name of <code>DecimalPipe</code>. Not <code>decimal</code>.', ar:'اسم <code>DecimalPipe</code> في التمبلت. مش <code>decimal</code>.' } },
      { n:'async', k:'ng', only:['html'], w:{ en:'The template name of <code>AsyncPipe</code>: subscribes, unwraps, unsubscribes.', ar:'اسم <code>AsyncPipe</code> في التمبلت: بتعمل subscribe، وبتفك القيمة، وبتعمل unsubscribe.' } },
      { n:'as', k:'ng', only:['html'], re:'(?<=[;)] |async )as(?= )',
        w:{ en:'Angular’s word that gives the value a name. The name after it is yours.', ar:'كلمة أنجولار اللي بتدّي القيمة اسم. الاسم اللي بعدها بتاعك.' } },
      { n:'DatePipe', k:'ng', w:{ en:'The class you import. In the template it is called <code>date</code>.', ar:'الكلاس اللي بتعمله import. في التمبلت اسمه <code>date</code>.' } },
      { n:'CurrencyPipe', k:'ng', w:{ en:'The class you import. In the template: <code>currency</code>.', ar:'الكلاس اللي بتعمله import. في التمبلت: <code>currency</code>.' } },
      { n:'PercentPipe', k:'ng', w:{ en:'The class you import. In the template: <code>percent</code>.', ar:'الكلاس اللي بتعمله import. في التمبلت: <code>percent</code>.' } },
      { n:'DecimalPipe', k:'ng', w:{ en:'The class you import. In the template: <code>number</code>.', ar:'الكلاس اللي بتعمله import. في التمبلت: <code>number</code>.' } },
      { n:'AsyncPipe', k:'ng', w:{ en:'The class you import. In the template: <code>async</code>.', ar:'الكلاس اللي بتعمله import. في التمبلت: <code>async</code>.' } },
      { n:'CommonModule', k:'ng', w:{ en:'The older all-in-one import that brings every built-in pipe.', ar:'الـ import القديم اللي بيجيب كل الـ pipes الجاهزة مرة واحدة.' } },
      { n:'*ngIf', k:'ng', w:{ en:'The older if directive.', ar:'الـ directive القديم بتاع الـ if.' } },
      { n:'dd/MM/yyyy', k:'ng',
        w:{ en:'A pattern in Angular’s date language: <code>dd</code> day, <code>MM</code> month, <code>yyyy</code> year. Case matters.', ar:'pattern بلغة التواريخ بتاعة أنجولار: <code>dd</code> اليوم، <code>MM</code> الشهر، <code>yyyy</code> السنة. الحروف الكبيرة والصغيرة فارقة.' } },
      { n:'mediumDate', k:'ng', w:{ en:'A named date format Angular knows.', ar:'شكل تاريخ جاهز أنجولار عارفه.' } },
      { n:'short', k:'ng', w:{ en:'A named date format Angular knows.', ar:'شكل تاريخ جاهز أنجولار عارفه.' } },
      { n:'symbol', k:'ng', w:{ en:'A display option of <code>currency</code>: show the sign.', ar:'اختيار عرض في <code>currency</code>: اعرض العلامة.' } },
      { n:'1.0-0', k:'ng', w:{ en:'digitsInfo: at least 1 digit before the point, 0 to 0 after it.', ar:'digitsInfo: رقم واحد على الأقل قبل العلامة، ومن 0 لـ 0 بعدها.' } },
      { n:'EGP', k:'ng', w:{ en:'The ISO code for the Egyptian pound. A world standard.', ar:'كود ISO للجنيه المصري. standard عالمي.' } },
      { n:'ar-EG', k:'ng', w:{ en:'A standard locale id. Angular ships its data under exactly this name.', ar:'id قياسي للـ locale. أنجولار جايب الداتا بتاعته بالاسم ده بالظبط.' } },
      { n:'LOCALE_ID', k:'ng', w:{ en:'Angular’s token for the app’s locale. Every date, number, currency and percent pipe reads it.', ar:'الـ token بتاع أنجولار للـ locale بتاع التطبيق. كل pipe تاريخ ورقم وعملة ونسبة بتقراه.' } },
      { n:'registerLocaleData', k:'ng', w:{ en:'Angular’s function that loads a locale’s formatting rules.', ar:'الـ function بتاعة أنجولار اللي بتحمّل قواعد التنسيق بتاعة locale.' } },
      { n:'provide', k:'ng', w:{ en:'A provider’s key: which token.', ar:'مفتاح في الـ provider: أنهي token.' } },
      { n:'useValue', k:'ng', w:{ en:'A provider’s key: which value.', ar:'مفتاح في الـ provider: أنهي قيمة.' } },
      { n:'providers', k:'ng', w:{ en:'An option key Angular reads.', ar:'مفتاح إعداد أنجولار بيقراه.' } },
      { n:'ApplicationConfig', k:'ng', w:{ en:'Angular’s type for the app config.', ar:'الـ type بتاع أنجولار للـ config بتاع التطبيق.' } },
      { n:'provideHttpClient', k:'ng', w:{ en:'Angular’s function that makes <code>HttpClient</code> available.', ar:'الـ function بتاعة أنجولار اللي بتخلي <code>HttpClient</code> متاح.' } },
      { n:'HttpClient', k:'ng', w:{ en:'Angular’s HTTP service.', ar:'الـ service بتاعة أنجولار للـ HTTP.' } },
      { n:'get', k:'ng', w:{ en:'An <code>HttpClient</code> method. It returns an observable.', ar:'ميثود في <code>HttpClient</code>. بترجّع observable.' } },
      { n:'inject', k:'ng', w:{ en:'Angular’s function that hands you a service.', ar:'الـ function بتاعة أنجولار اللي بتدّيك service.' } },
      { n:'@if', k:'ng', w:{ en:'Angular’s if block.', ar:'بلوك الـ if بتاع أنجولار.' } },
      { n:'@else', k:'ng', w:{ en:'Angular’s else block.', ar:'بلوك الـ else بتاع أنجولار.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator.', ar:'الـ decorator بتاع أنجولار.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The string after it is yours.', ar:'مفتاح إعداد. النص اللي بعده بتاعك.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key.', ar:'مفتاح إعداد.' } },
      { n:'imports', k:'ng', w:{ en:'An option key: the pipes and components this template uses.', ar:'مفتاح إعداد: الـ pipes والـ components اللي التمبلت ده بيستخدمها.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One order, five stops', ar: 'أوردر واحد، خمس محطات' },
    lead: {
      en: 'An order page. The component asks the server for order 1042. The answer arrives later, as raw data: a date as ISO text, a total as a plain number, a discount as a fraction. Pipes turn those into something a person can read. Follow the order:',
      ar: 'صفحة أوردر. الـ component بيطلب من السيرفر أوردر 1042. الرد بيوصل بعدين، كداتا خام: تاريخ كنص ISO، وإجمالي كرقم عادي، وخصم ككسر. والـ pipes بتحوّلهم لحاجة الإنسان يقدر يقراها. امشي ورا الأوردر:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'order-view.ts', lang: 'ts', who: { en: 'class · asks', ar: 'الكلاس · بيطلب' },
          code: ["readonly order$ = this.http.get<Order>('/api/orders/1042');"],
          say: { en: `${ng('get')} is Angular’s and returns an observable: a value that will arrive later. ${mine('order$')} is your name for it; the <code>$</code> is only a habit. ${pub('Order')} is your type.`,
                 ar: `${ng('get')} بتاعة أنجولار وبترجّع observable: قيمة هتوصل بعدين. و${mine('order$')} الاسم بتاعك ليها؛ والـ <code>$</code> مجرد عادة. و${pub('Order')} الـ type بتاعك.` } },
        { file: 'order-view.html', lang: 'html', who: { en: 'template · waits', ar: 'التمبلت · بيستنى' },
          code: ['@if (order$ | async; as order) {'],
          say: { en: `${ng('async')} is Angular’s: it subscribes and hands over the value when it comes. ${ng('as')} is Angular’s too. ${mine('order')} is a <b>new name you invent here</b> for the arrived value. It lives only inside this block.`,
                 ar: `${ng('async')} بتاعة أنجولار: بتعمل subscribe وبتسلّم القيمة أول ما توصل. و${ng('as')} بتاعة أنجولار برضه. و${mine('order')} <b>اسم جديد انت بتألفه هنا</b> للقيمة اللي وصلت. عايش جوه البلوك ده بس.` } },
        { file: 'order-view.html', lang: 'html', who: { en: 'template · formats', ar: 'التمبلت · بينسّق' },
          code: ["<p>Placed {{ order.placedAt | date:'dd/MM/yyyy' }}</p>"],
          say: { en: `Left of the bar is yours: ${mine('order')} and your field ${pub('placedAt')}. Right of the bar is Angular’s: the pipe name ${ng('date')}. After the colon comes an argument in Angular’s own little language, ${ng('dd/MM/yyyy')}, where capitals matter.`,
                 ar: `شمال الشرطة بتاعك: ${mine('order')} والـ field بتاعك ${pub('placedAt')}. ويمين الشرطة بتاع أنجولار: اسم الـ pipe ${ng('date')}. وبعد النقطتين بييجي argument بلغة أنجولار الصغيرة، ${ng('dd/MM/yyyy')}، والحروف الكابيتال فيها فارقة.` } },
        { file: 'order-view.ts', lang: 'ts', who: { en: 'class · imports', ar: 'الكلاس · بيعمل import' },
          code: ['imports: [AsyncPipe, DatePipe, CurrencyPipe, PercentPipe],'],
          say: { en: `The same pipes under their <b>other</b> names. ${ng('DatePipe')} is the class you import; ${ng('date')} is what the template types. Both are Angular’s. Forget one here and the template does not compile.`,
                 ar: `نفس الـ pipes بأساميهم <b>التانية</b>. ${ng('DatePipe')} الكلاس اللي بتعمله import؛ و${ng('date')} اللي التمبلت بيكتبه. الاتنين بتوع أنجولار. انسى واحدة هنا والتمبلت مش هيعمل compile.` } },
        { file: 'app.config.ts', lang: 'ts', who: { en: 'app · picks the language', ar: 'التطبيق · بيختار اللغة' },
          code: ["{ provide: LOCALE_ID, useValue: 'ar-EG' },"],
          say: { en: `Not a single name of yours. ${ng('LOCALE_ID')} is Angular’s token and ${ng('ar-EG')} is a world-standard locale id. This one line decides how <b>every</b> ${ng('date')} and ${ng('currency')} in the app looks.`,
                 ar: `ولا اسم واحد بتاعك. ${ng('LOCALE_ID')} الـ token بتاع أنجولار، و${ng('ar-EG')} id عالمي للـ locale. السطر ده لوحده بيقرر شكل <b>كل</b> ${ng('date')} و${ng('currency')} في التطبيق.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'In <code>{{ order.placedAt | date:\'dd/MM/yyyy\' }}</code>: <code>order</code> is yours, <code>placedAt</code> is your data’s, <code>date</code> is Angular’s, and <code>\'dd/MM/yyyy\'</code> is written in Angular’s date language. Your part stops at the <code>|</code>.',
        ar: 'في <code>{{ order.placedAt | date:\'dd/MM/yyyy\' }}</code>: <code>order</code> بتاعك، و<code>placedAt</code> من الداتا بتاعتك، و<code>date</code> بتاعة أنجولار، و<code>\'dd/MM/yyyy\'</code> مكتوبة بلغة التواريخ بتاعة أنجولار. الجزء بتاعك بيخلص عند الـ <code>|</code>.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Left or right of the bar?', ar: 'شمال الشرطة ولا يمينها؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'A pipe expression reads left to right, and ownership changes at the <code>|</code>.',
      ar: 'الـ pipe expression بتتقري من الشمال لليمين، والملكية بتتغير عند الـ <code>|</code>.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>readonly order$ = …</code>', '<code>order-view.ts</code>', 'you', `you pick ${mine('order$')}`],
            ar: ['<code>readonly order$ = …</code>', '<code>order-view.ts</code>', 'انت', `انت بتختار ${mine('order$')}`] },
          { en: ['<code>as order</code>', '<code>order-view.html</code>', 'you', `${ng('as')} is Angular’s; you pick ${mine('order')}`],
            ar: ['<code>as order</code>', '<code>order-view.html</code>', 'انت', `${ng('as')} بتاعة أنجولار؛ وانت بتختار ${mine('order')}`] },
          { en: ['<code>order.placedAt</code> (left of <code>|</code>)', '<code>order-view.html</code>', 'you', `${mine('order')} is yours; ${pub('placedAt')} must match the type and the server`],
            ar: ['<code>order.placedAt</code> (شمال الـ <code>|</code>)', '<code>order-view.html</code>', 'انت', `${mine('order')} بتاعك؛ و${pub('placedAt')} لازم تطابق الـ type والسيرفر`] },
          { en: ['<code>| date</code>', '<code>order-view.html</code>', 'you type it', `Angular: ${ng('date')} is fixed`],
            ar: ['<code>| date</code>', '<code>order-view.html</code>', 'انت بتكتبها', `أنجولار: ${ng('date')} ثابتة`] },
          { en: ['<code>:\'dd/MM/yyyy\'</code>', '<code>order-view.html</code>', 'you type it', 'Angular’s date language: you combine the letters, but each letter’s meaning is fixed'],
            ar: ['<code>:\'dd/MM/yyyy\'</code>', '<code>order-view.html</code>', 'انت بتكتبها', 'لغة التواريخ بتاعة أنجولار: انت بتركّب الحروف، بس معنى كل حرف ثابت'] },
          { en: ['<code>imports: [DatePipe, …]</code>', '<code>order-view.ts</code>', 'you type it', `Angular: ${ng('DatePipe')} is fixed`],
            ar: ['<code>imports: [DatePipe, …]</code>', '<code>order-view.ts</code>', 'انت بتكتبها', `أنجولار: ${ng('DatePipe')} ثابت`] },
          { en: ['<code>{ provide: LOCALE_ID, … }</code>', '<code>app.config.ts</code>', 'you type it', `Angular and the standards: ${ng('LOCALE_ID')}, ${ng('ar-EG')}`],
            ar: ['<code>{ provide: LOCALE_ID, … }</code>', '<code>app.config.ts</code>', 'انت بتكتبها', `أنجولار والـ standards: ${ng('LOCALE_ID')}، ${ng('ar-EG')}`] },
        ] },
      { t: 'ul',
        en: ['<b>Left of <code>|</code> is yours, right of it is Angular’s.</b> The value and its fields come from your code. The pipe name and its arguments come from Angular.',
             '<b>Arguments go in a fixed order, after colons.</b> <code>currency:\'EGP\':\'symbol\':\'1.0-0\'</code> means code, then display, then digits. Skip one and the next moves into its place.',
             '<b>The class name goes in <code>imports</code>, the short name goes in the template.</b> <code>DatePipe</code> there, <code>date</code> here. You never type <code>DatePipe</code> in a template.'],
        ar: ['<b>شمال الـ <code>|</code> بتاعك، ويمينها بتاع أنجولار.</b> القيمة والـ fields بتاعتها جايين من الكود بتاعك. واسم الـ pipe والـ arguments بتوعها جايين من أنجولار.',
             '<b>الـ arguments ليها ترتيب ثابت، بعد نقطتين.</b> <code>currency:\'EGP\':\'symbol\':\'1.0-0\'</code> معناها الكود، وبعدين شكل العرض، وبعدين الأرقام. لو فوّت واحد، اللي بعده بياخد مكانه.',
             '<b>اسم الكلاس بيروح في <code>imports</code>، والاسم القصير بيروح في التمبلت.</b> <code>DatePipe</code> هناك، و<code>date</code> هنا. عمرك ما بتكتب <code>DatePipe</code> في تمبلت.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All four files, every name coloured', ar: 'الأربع ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same example, complete. Hover a coloured name to light up everywhere else it appears. Then press <b>Rename test</b>: your names change, and every pipe name, format word and standard code stays exactly where it was.',
      ar: 'نفس المثال، كامل. قف بالماوس على أي اسم ملوّن وهتنوّر كل الأماكن التانية اللي هو فيها. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: أساميك هتتغير، وكل اسم pipe وكلمة تنسيق وكود standard هيفضلوا مكانهم بالظبط.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'order.ts', lang: 'ts', tag: { en: 'the data, as the server sends it', ar: 'الداتا، زي ما السيرفر بيبعتها' }, code: [
        'export interface Order {',
        '  id: number;',
        '  placedAt: string;   // ISO text, e.g. 2026-08-21T21:14:00Z',
        '  total: number;      // a plain number: 1699.5',
        '  discount: number;   // a fraction: 0.1 means 10%',
        '}' ] },
      { t: 'code', name: 'order-view.ts', lang: 'ts', tag: { en: 'raw values only', ar: 'قيم خام بس' }, code: [
        "import { Component, inject } from '@angular/core';",
        "import { HttpClient } from '@angular/common/http';",
        "import { AsyncPipe, CurrencyPipe, DatePipe, PercentPipe } from '@angular/common';",
        "import { Order } from './order';",
        '',
        '@Component({',
        "  selector: 'app-order-view',",
        '  imports: [AsyncPipe, DatePipe, CurrencyPipe, PercentPipe],',
        "  templateUrl: './order-view.html',",
        '})',
        'export class OrderView {',
        '  private readonly http = inject(HttpClient);',
        "  readonly order$ = this.http.get<Order>('/api/orders/1042');",
        '}' ] },
      { t: 'code', name: 'order-view.html', lang: 'html', tag: { en: 'formats at the edge', ar: 'بينسّق عند الحافة' }, code: [
        '@if (order$ | async; as order) {',
        '  <h2>#{{ order.id }}</h2>',
        "  <p>Placed {{ order.placedAt | date:'dd/MM/yyyy' }}</p>",
        "  <p>Total {{ order.total | currency:'EGP' }}</p>",
        '  <p>Discount {{ order.discount | percent }}</p>',
        '} @else {',
        '  <p>Loading…</p>',
        '}' ] },
      { t: 'code', name: 'app.config.ts', lang: 'ts', tag: { en: 'one language for the app', ar: 'لغة واحدة للتطبيق' }, code: [
        "import { ApplicationConfig, LOCALE_ID } from '@angular/core';",
        "import { provideHttpClient } from '@angular/common/http';",
        "import { registerLocaleData } from '@angular/common';",
        "import localeArEg from '@angular/common/locales/ar-EG';",
        '',
        'registerLocaleData(localeArEg);',
        '',
        'export const appConfig: ApplicationConfig = {',
        '  providers: [',
        '    provideHttpClient(),',
        "    { provide: LOCALE_ID, useValue: 'ar-EG' },",
        '  ],',
        '};' ] },
      { t: 'nmtable' }
    ]
  },

  /* ------------------------------------------------------------ 4 */
  {
    id: 'rename',
    kicker: { en: 'Is it OK to change it?', ar: 'ينفع أغيّره؟' },
    title: { en: 'What breaks when you rename each name', ar: 'إيه اللي بيبوظ لما تغيّر كل اسم' },
    lead: {
      en: 'Your own names are checked by the compiler. The fields of your data are a different story: TypeScript checks your files against the <code>Order</code> type, but nothing checks the type against what the server really sends.',
      ar: 'أساميك الخاصة الـ compiler بيراجعها. لكن الـ fields بتاعة الداتا حكاية تانية: TypeScript بيراجع ملفاتك على الـ type <code>Order</code>، لكن محدش بيراجع الـ type على اللي السيرفر بيبعته فعلًا.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [mine('order$'), 'its use in the template: <code>order$ | async</code>', 'Compile error in the template.'],
            ar: [mine('order$'), 'استخدامه في التمبلت: <code>order$ | async</code>', 'Compile error في التمبلت.'] },
          { en: [mine('order') + ' (the <code>as</code> name)', 'every use inside that <code>@if</code> block', 'Compile error in the template.'],
            ar: [mine('order') + ' (الاسم بتاع <code>as</code>)', 'كل استخدام جوه بلوك الـ <code>@if</code> ده', 'Compile error في التمبلت.'] },
          { en: [`${pub('placedAt')}, ${pub('total')}, ${pub('discount')}, ${pub('id')} in the type`, 'the template <b>and the server’s JSON</b>', 'Template not updated: compile error. Server not updated: <b>no error</b>. The field is <code>undefined</code> at runtime and the pipe shows nothing.'],
            ar: [`${pub('placedAt')} و${pub('total')} و${pub('discount')} و${pub('id')} في الـ type`, 'التمبلت <b>والـ JSON بتاع السيرفر</b>', 'لو التمبلت متغيرش: compile error. لو السيرفر متغيرش: <b>مفيش error</b>. الـ field هيبقى <code>undefined</code> وقت التشغيل والـ pipe مش هتعرض حاجة.'] },
          { en: [mine('http'), 'only <code>this.http</code> in this class', 'Compile error in the class.'],
            ar: [mine('http'), '<code>this.http</code> في الكلاس ده بس', 'Compile error في الكلاس.'] },
          { en: [mine('localeArEg'), 'only the <code>registerLocaleData(…)</code> line', 'Compile error in <code>app.config.ts</code>.'],
            ar: [mine('localeArEg'), 'سطر <code>registerLocaleData(…)</code> بس', 'Compile error في <code>app.config.ts</code>.'] },
          { en: [pub('appConfig'), '<code>main.ts</code>', 'Compile error in <code>main.ts</code>.'],
            ar: [pub('appConfig'), '<code>main.ts</code>', 'Compile error في <code>main.ts</code>.'] },
          { en: [`${ng('date')}, ${ng('currency')}, ${ng('percent')}, ${ng('async')}`, 'nothing: you cannot rename these', 'Misspell one and you get a compile error: “No pipe found with name…”.'],
            ar: [`${ng('date')} و${ng('currency')} و${ng('percent')} و${ng('async')}`, 'ولا حاجة: دول مينفعش يتغيروا', 'اكتب واحدة غلط وهيطلعلك compile error: «No pipe found with name…».'] },
          { en: [`${ng('dd/MM/yyyy')}, ${ng('EGP')}, ${ng('ar-EG')}`, 'nothing: these are Angular’s and the world’s', 'Often <b>no error</b>: a wrong letter just prints something else. See the silent mistakes.'],
            ar: [`${ng('dd/MM/yyyy')} و${ng('EGP')} و${ng('ar-EG')}`, 'ولا حاجة: دول بتوع أنجولار والعالم', 'غالبًا <b>مفيش error</b>: حرف غلط بيطبع حاجة تانية وخلاص. شوف الغلطات الصامتة.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b>. Notice how little changes in <code>order-view.html</code>: only the words before each <code>|</code>. Everything after the bar is Angular’s.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b>. خد بالك قد إيه الحاجات اللي بتتغير في <code>order-view.html</code> قليلة: الكلمات اللي قبل كل <code>|</code> بس. وكل حاجة بعد الشرطة بتاعة أنجولار.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'two-names',
    kicker: { en: 'Two names, one pipe', ar: 'اسمين، pipe واحدة' },
    title: { en: 'The class name and the template name', ar: 'اسم الكلاس واسم التمبلت' },
    lead: {
      en: 'Every built-in pipe is a class with a long name, registered under a short name. You import the long one and type the short one. Both are fixed. Most pairs are easy to guess. One is not.',
      ar: 'كل pipe جاهزة هي كلاس باسم طويل، ومتسجلة باسم قصير. بتعمل import للطويل وبتكتب القصير. والاتنين ثابتين. أغلب الأزواج سهل تخمّنها. واحد لأ.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['In <code>imports</code> (the class)', 'In the template (the name)', 'Does'], ar: ['في <code>imports</code> (الكلاس)', 'في التمبلت (الاسم)', 'بتعمل إيه'] },
        rows: [
          { en: [ng('DatePipe'), ng('date'), 'Dates and times.'], ar: [ng('DatePipe'), ng('date'), 'تواريخ وأوقات.'] },
          { en: [ng('CurrencyPipe'), ng('currency'), 'Money.'], ar: [ng('CurrencyPipe'), ng('currency'), 'فلوس.'] },
          { en: [ng('PercentPipe'), ng('percent'), 'A fraction as a percentage.'], ar: [ng('PercentPipe'), ng('percent'), 'كسر كنسبة مئوية.'] },
          { en: [ng('DecimalPipe'), ng('number') + ' <b>(not <code>decimal</code>)</b>', 'Numbers with separators and digits.'], ar: [ng('DecimalPipe'), ng('number') + ' <b>(مش <code>decimal</code>)</b>', 'أرقام بفواصل وعدد أرقام.'] },
          { en: [ng('AsyncPipe'), ng('async'), 'Subscribes and unwraps.'], ar: [ng('AsyncPipe'), ng('async'), 'بتعمل subscribe وبتفك القيمة.'] },
          { en: ['<code>UpperCasePipe</code>, <code>LowerCasePipe</code>, <code>TitleCasePipe</code>', '<code>uppercase</code>, <code>lowercase</code>, <code>titlecase</code>', 'Text case. All lowercase in the template.'], ar: ['<code>UpperCasePipe</code>، <code>LowerCasePipe</code>، <code>TitleCasePipe</code>', '<code>uppercase</code>، <code>lowercase</code>، <code>titlecase</code>', 'حالة الحروف. كلها حروف صغيرة في التمبلت.'] },
          { en: ['<code>SlicePipe</code>, <code>JsonPipe</code>', '<code>slice</code>, <code>json</code>', 'Part of a list or text; debug output.'], ar: ['<code>SlicePipe</code>، <code>JsonPipe</code>', '<code>slice</code>، <code>json</code>', 'جزء من ليستة أو نص؛ عرض للـ debugging.'] },
        ] },
      { t: 'code', name: 'order-view.ts · number', lang: 'ts', tag: { en: 'the class name', ar: 'اسم الكلاس' }, code: [
        'imports: [AsyncPipe, DecimalPipe],' ] },
      { t: 'code', name: 'order-view.html · number', lang: 'html', tag: { en: 'the template name', ar: 'اسم التمبلت' }, code: [
        "<p>Total {{ order.total | number:'1.0-0' }}</p>" ] },
      { t: 'p',
        en: `To use ${ng('number')}, the component imports ${ng('DecimalPipe')}. Typing <code>| decimal</code> gives “No pipe found with name ‘decimal’”.`,
        ar: `عشان تستخدم ${ng('number')}، الـ component بيعمل import لـ ${ng('DecimalPipe')}. ولو كتبت <code>| decimal</code> هيطلعلك «No pipe found with name ‘decimal’».` }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتاعتك' },
    title: { en: 'The fixed words after the colon', ar: 'الكلمات الثابتة بعد النقطتين' },
    lead: {
      en: 'Pipe arguments look like free text in quotes. They are not. Each one is a word from a fixed list, or a pattern with fixed letters.',
      ar: 'الـ arguments بتاعة الـ pipes شكلها كلام حر بين علامات تنصيص. بس هي مش كده. كل واحدة كلمة من ليستة ثابتة، أو pattern حروفه ثابتة.'
    },
    blocks: [
      { t: 'code', name: 'order-view.html · arguments', lang: 'html', tag: { en: 'every quoted word is Angular’s', ar: 'كل كلمة بين علامات تنصيص بتاعة أنجولار' }, code: [
        "{{ order.placedAt | date:'short' }}",
        "{{ order.placedAt | date:'mediumDate' }}",
        "{{ order.placedAt | date:'dd/MM/yyyy' }}",
        "{{ order.total | currency:'EGP':'symbol':'1.0-0' }}" ] },
      { t: 'tbl',
        head: { en: ['Argument', 'Where the words come from', 'Examples'], ar: ['الـ argument', 'الكلمات جاية منين', 'أمثلة'] },
        rows: [
          { en: ['a named date format', 'Angular’s list', `${ng('short')}, ${ng('mediumDate')}, <code>longDate</code>, <code>shortTime</code>`],
            ar: ['شكل تاريخ جاهز', 'ليستة أنجولار', `${ng('short')}، ${ng('mediumDate')}، <code>longDate</code>، <code>shortTime</code>`] },
          { en: ['a date pattern', 'Angular’s letters; you choose the order and the separators', `${ng('dd/MM/yyyy')}, <code>HH:mm</code>`],
            ar: ['pattern تاريخ', 'حروف أنجولار؛ انت بتختار الترتيب والفواصل', `${ng('dd/MM/yyyy')}، <code>HH:mm</code>`] },
          { en: ['a currency code', 'ISO 4217, a world standard', `${ng('EGP')}, <code>USD</code>, <code>EUR</code>`],
            ar: ['كود عملة', 'ISO 4217، standard عالمي', `${ng('EGP')}، <code>USD</code>، <code>EUR</code>`] },
          { en: ['how to show the currency', 'Angular’s list', `<code>code</code>, ${ng('symbol')}, <code>symbol-narrow</code>`],
            ar: ['تعرض العملة إزاي', 'ليستة أنجولار', `<code>code</code>، ${ng('symbol')}، <code>symbol-narrow</code>`] },
          { en: ['digitsInfo', 'Angular’s pattern: min-integer.min-fraction-max-fraction', `${ng('1.0-0')}, <code>1.2-2</code>`],
            ar: ['digitsInfo', 'pattern أنجولار: min-integer.min-fraction-max-fraction', `${ng('1.0-0')}، <code>1.2-2</code>`] },
          { en: ['a locale id', 'a world standard; Angular ships data for each', `${ng('ar-EG')}, <code>en-US</code>, <code>de-DE</code>`],
            ar: ['id للـ locale', 'standard عالمي؛ وأنجولار جايب داتا لكل واحد', `${ng('ar-EG')}، <code>en-US</code>، <code>de-DE</code>`] },
        ] },
      { t: 'p', en: 'The date letters are case-sensitive, and the pairs below are the ones that bite:',
                ar: 'حروف التاريخ فارق معاها الكابيتال والسمول، والأزواج دي هي اللي بتعض:' },
      { t: 'tbl',
        head: { en: ['Letter', 'Means', 'Not to be confused with'], ar: ['الحرف', 'معناه', 'متتلخبطش مع'] },
        rows: [
          { en: ['<code>MM</code>', 'month', '<code>mm</code>: minutes'], ar: ['<code>MM</code>', 'الشهر', '<code>mm</code>: الدقايق'] },
          { en: ['<code>yyyy</code>', 'calendar year', '<code>YYYY</code>: week-numbering year, which differs in the last days of December and the first of January'], ar: ['<code>yyyy</code>', 'السنة العادية', '<code>YYYY</code>: سنة ترقيم الأسابيع، وبتختلف في آخر أيام ديسمبر وأول يناير'] },
          { en: ['<code>HH</code>', 'hour, 0–23', '<code>hh</code>: hour, 1–12 (add <code>a</code> for AM/PM)'], ar: ['<code>HH</code>', 'الساعة، 0–23', '<code>hh</code>: الساعة، 1–12 (زوّد <code>a</code> عشان AM/PM)'] },
          { en: ['<code>dd</code>', 'day of the month', '<code>EEE</code>: day of the week'], ar: ['<code>dd</code>', 'اليوم في الشهر', '<code>EEE</code>: اليوم في الأسبوع'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'The names you do own around pipes are few. These habits make them honest about what they hold.',
      ar: 'الأسماء اللي بتاعتك فعلًا حوالين الـ pipes قليلة. العادات دي بتخليها صريحة في اللي شايلاه.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['an observable', '<code>order$</code>', '<code>order</code>, <code>orderObs</code>', 'The <code>$</code> habit tells the reader “this needs <code>async</code> or a subscribe”. Angular does not require it.'],
            ar: ['observable', '<code>order$</code>', '<code>order</code>، <code>orderObs</code>', 'عادة الـ <code>$</code> بتقول للي بيقرا «ده محتاج <code>async</code> أو subscribe». أنجولار مش بيطلبها.'] },
          { en: ['the <code>as</code> name', '<code>order</code> (the stream’s name without <code>$</code>)', '<code>data</code>, <code>res</code>, <code>x</code>', 'It is the arrived value; name it like one.'],
            ar: ['اسم الـ <code>as</code>', '<code>order</code> (اسم الـ stream من غير <code>$</code>)', '<code>data</code>، <code>res</code>، <code>x</code>', 'دي القيمة اللي وصلت؛ سمّيها على الأساس ده.'] },
          { en: ['a raw value', '<code>total</code>, <code>placedAt</code>', '<code>totalText</code>, <code>formattedDate</code> stored in your data', 'Keep numbers and dates raw. Format in the template, at the edge.'],
            ar: ['قيمة خام', '<code>total</code>، <code>placedAt</code>', '<code>totalText</code>، <code>formattedDate</code> متخزنين في الداتا', 'سيب الأرقام والتواريخ خام. نسّق في التمبلت، عند الحافة.'] },
          { en: ['a fraction', '<code>discount</code> holding <code>0.1</code>', '<code>discountPercent</code> holding <code>10</code> and then piped with <code>percent</code>', '<code>percent</code> multiplies by 100. If the field holds 10, the page says 1,000%.'],
            ar: ['كسر', '<code>discount</code> شايل <code>0.1</code>', '<code>discountPercent</code> شايل <code>10</code> وبعدين تعدّيه على <code>percent</code>', '<code>percent</code> بتضرب في 100. لو الـ field شايل 10، الصفحة هتقول 1,000%.'] },
          { en: ['a locale import', '<code>localeArEg</code>', '<code>locale</code>, <code>data</code>', 'You pick this name, so make it say which locale.'],
            ar: ['import بتاع locale', '<code>localeArEg</code>', '<code>locale</code>، <code>data</code>', 'انت اللي بتختار الاسم ده، فخليه يقول أنهي locale.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: 'The older <code>*ngIf … as</code> and <code>CommonModule</code>', ar: '<code>*ngIf … as</code> و<code>CommonModule</code> القدام' },
    lead: {
      en: 'The pipes themselves have not changed. What changed is around them: <code>@if</code> instead of <code>*ngIf</code>, and importing the pipes you use instead of one big module.',
      ar: 'الـ pipes نفسها متغيرتش. اللي اتغير هو اللي حواليها: <code>@if</code> بدل <code>*ngIf</code>، وإنك تعمل import للـ pipes اللي بتستخدمها بدل module واحد كبير.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'order-view.html — older style', lang: 'html', code: [
          '<div *ngIf="order$ | async as order">',
          "  <p>Placed {{ order.placedAt | date:'dd/MM/yyyy' }}</p>",
          '</div>' ] },
        good: { name: 'order-view.html — today', lang: 'html', code: [
          '@if (order$ | async; as order) {',
          "  <p>Placed {{ order.placedAt | date:'dd/MM/yyyy' }}</p>",
          '}' ] } },
      { t: 'pair',
        bad:  { name: 'order-view.ts — older style', lang: 'ts', code: ['imports: [CommonModule],'] },
        good: { name: 'order-view.ts — today', lang: 'ts', code: ['imports: [AsyncPipe, DatePipe, CurrencyPipe, PercentPipe],'] } },
      { t: 'p',
        en: `Your names did not move: ${mine('order$')}, ${mine('order')}, ${pub('placedAt')}. The only visible difference in the template is the semicolon: <code>@if</code> needs <code>; as</code>, the old <code>*ngIf</code> did not. ${ng('CommonModule')} still works; importing each pipe just makes it clear what the template uses.`,
        ar: `أساميك متحركتش: ${mine('order$')} و${mine('order')} و${pub('placedAt')}. الفرق الوحيد اللي باين في التمبلت هو الـ semicolon: <code>@if</code> محتاجة <code>; as</code>، و<code>*ngIf</code> القديمة مكانتش محتاجاها. و${ng('CommonModule')} لسه شغال؛ بس إنك تعمل import لكل pipe بيوضّح التمبلت بيستخدم إيه.` }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, and says nothing', ar: 'مش بيعمل حاجة، ومش بيقول حاجة' },
    title: { en: 'Mistakes that fail silently (or at runtime)', ar: 'غلطات بتفشل في صمت (أو وقت التشغيل)' },
    lead: {
      en: 'A pipe with a wrong argument usually does not complain. It formats exactly what you asked for, which is not what you meant.',
      ar: 'الـ pipe اللي الـ argument بتاعها غلط غالبًا مش بتشتكي. بتنسّق اللي انت طلبته بالظبط، واللي هو مش اللي انت قصدته.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'Minutes where the month should be', ar: 'دقايق مكان الشهر' }, blocks: [
        { t: 'pair',
          bad:  { name: 'order-view.html', lang: 'html', code: ["{{ order.placedAt | date:'dd/mm/yyyy' }}"] },
          good: { name: 'order-view.html', lang: 'html', code: ["{{ order.placedAt | date:'dd/MM/yyyy' }}"] } },
        { t: 'p', en: 'Lowercase <code>mm</code> is minutes. An order placed at 21:14 on 21 August shows as <code>21/14/2026</code>. No error, and on some days it even looks plausible.',
                  ar: '<code>mm</code> الصغيرة معناها دقايق. أوردر اتعمل الساعة 21:14 يوم 21 أغسطس هيظهر <code>21/14/2026</code>. من غير أي error، وفي أيام كمان بيبان منطقي.' }
      ]},
      { t: 'step', n: '2', title: { en: 'A percentage that is already a percentage', ar: 'نسبة هي أصلًا نسبة' }, blocks: [
        { t: 'pair',
          bad:  { name: 'order-view.html', lang: 'html', code: ['<!-- discount arrives as 10 -->', '{{ order.discount | percent }}'] },
          good: { name: 'order-view.html', lang: 'html', code: ['<!-- discount arrives as 0.1 -->', '{{ order.discount | percent }}'] } },
        { t: 'p', en: `${ng('percent')} multiplies by 100. Feed it <code>10</code> and it prints <code>1,000%</code>. The code is identical on both sides; the difference is what ${pub('discount')} holds. Agree with the server on a fraction.`,
                  ar: `${ng('percent')} بتضرب في 100. ادّيها <code>10</code> وهتطبع <code>1,000%</code>. الكود نفسه في الناحيتين؛ الفرق في اللي ${pub('discount')} شايله. اتفق مع السيرفر إنه يبقى كسر.` }
      ]},
      { t: 'step', n: '3', title: { en: 'Currency with no code', ar: 'عملة من غير كود' }, blocks: [
        { t: 'pair',
          bad:  { name: 'order-view.html', lang: 'html', code: ['{{ order.total | currency }}'] },
          good: { name: 'order-view.html', lang: 'html', code: ["{{ order.total | currency:'EGP' }}"] } },
        { t: 'p', en: `Without a code, ${ng('currency')} uses the app’s default currency, which is US dollars unless you provide <code>DEFAULT_CURRENCY_CODE</code>. Your pounds silently become dollars.`,
                  ar: `من غير كود، ${ng('currency')} بتستخدم العملة الافتراضية بتاعة التطبيق، واللي هي الدولار الأمريكي إلا لو عملت provide لـ <code>DEFAULT_CURRENCY_CODE</code>. فالجنيهات بتاعتك بتتحول دولارات من غير ما حد يقولك.` }
      ]},
      { t: 'step', n: '4', title: { en: 'Two <code>| async</code> on the same stream', ar: 'اتنين <code>| async</code> على نفس الـ stream' }, blocks: [
        { t: 'pair',
          bad:  { name: 'order-view.html', lang: 'html', code: [
            '<h2>#{{ (order$ | async)?.id }}</h2>',
            '<p>{{ (order$ | async)?.total }}</p>' ] },
          good: { name: 'order-view.html', lang: 'html', code: [
            '@if (order$ | async; as order) {',
            '  <h2>#{{ order.id }}</h2>',
            '  <p>{{ order.total }}</p>',
            '}' ] } },
        { t: 'p', en: `Each ${ng('async')} is its own subscription, and each subscription to <code>http.get</code> sends its own request. The page looks fine and quietly calls the server twice. Unwrap once with ${ng('as')} and reuse the name.`,
                  ar: `كل ${ng('async')} subscription لوحدها، وكل subscription على <code>http.get</code> بتبعت request لوحدها. الصفحة شكلها تمام وهي بتكلم السيرفر مرتين في السر. فك القيمة مرة واحدة بـ ${ng('as')} واستخدم الاسم تاني.` }
      ]},
      { t: 'step', n: '5', title: { en: 'A date that is not ISO text (runtime error)', ar: 'تاريخ مش نص ISO (error وقت التشغيل)' }, blocks: [
        { t: 'pair',
          bad:  { name: 'order-view.html', lang: 'html', code: ['<!-- placedAt arrives as 21/08/2026 -->', "{{ order.placedAt | date:'mediumDate' }}"] },
          good: { name: 'order-view.html', lang: 'html', code: ['<!-- placedAt arrives as 2026-08-21T21:14:00Z -->', "{{ order.placedAt | date:'mediumDate' }}"] } },
        { t: 'p', en: `${ng('date')} accepts a <code>Date</code>, a number, or ISO text. <code>21/08/2026</code> is none of them, so it throws at runtime, not at compile time, because TypeScript only knows the field is a <code>string</code>.`,
                  ar: `${ng('date')} بتقبل <code>Date</code> أو رقم أو نص ISO. و<code>21/08/2026</code> مش أي واحد فيهم، فبترمي error وقت التشغيل، مش وقت الـ compile، عشان TypeScript كل اللي يعرفه إن الـ field ده <code>string</code>.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it shows the wrong thing', ar: 'لما يعرض حاجة غلط' },
    title: { en: 'Five questions, in this order', ar: 'خمس أسئلة، بالترتيب ده' },
    lead: {
      en: 'The value on screen is empty or wrong. Ask these first.',
      ar: 'القيمة اللي على الشاشة فاضية أو غلط. اسأل دول الأول.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Is the pipe’s class in the component’s <code>imports</code>, under its class name (<code>DecimalPipe</code> for <code>number</code>)?',
                  ar: '<b>1.</b> كلاس الـ pipe موجود في <code>imports</code> بتاعة الـ component، باسم الكلاس (<code>DecimalPipe</code> لـ <code>number</code>)؟' },
      { t: 'chk', en: '<b>2.</b> Does the field name on the left match what the server really sends? Log the raw response once.',
                  ar: '<b>2.</b> اسم الـ field اللي على الشمال مطابق للي السيرفر بيبعته فعلًا؟ اطبع الرد الخام مرة.' },
      { t: 'chk', en: '<b>3.</b> Is every format letter the right case: <code>MM</code> vs <code>mm</code>, <code>yyyy</code> vs <code>YYYY</code>, <code>HH</code> vs <code>hh</code>?',
                  ar: '<b>3.</b> كل حرف تنسيق بالحالة الصح: <code>MM</code> ولا <code>mm</code>، <code>yyyy</code> ولا <code>YYYY</code>، <code>HH</code> ولا <code>hh</code>؟' },
      { t: 'chk', en: '<b>4.</b> Is the raw value in the shape the pipe expects: a fraction for <code>percent</code>, ISO text or a <code>Date</code> for <code>date</code>, a currency code for <code>currency</code>?',
                  ar: '<b>4.</b> القيمة الخام بالشكل اللي الـ pipe مستنياه: كسر لـ <code>percent</code>، نص ISO أو <code>Date</code> لـ <code>date</code>، كود عملة لـ <code>currency</code>؟' },
      { t: 'chk', en: '<b>5.</b> Using a locale other than <code>en-US</code>? Is it both registered with <code>registerLocaleData</code> and provided as <code>LOCALE_ID</code>?',
                  ar: '<b>5.</b> بتستخدم locale غير <code>en-US</code>؟ هو متسجّل بـ <code>registerLocaleData</code> ومتعمله provide كـ <code>LOCALE_ID</code> الاتنين؟' }
    ]
  }
  ]
};
