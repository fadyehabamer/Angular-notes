/* ==================================================================
   OnPush and change detection, name by name — a companion page after
   the change detection topic. One running example (a live price
   ticker: a table of rows, one store) followed through every file,
   with every name coloured by who owns it. Names list: inline.
   ================================================================== */

/* a name in running text, coloured like the code and linked on hover */
const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

const STORE = ['price-store.ts', 'price-store.ts — plain map'];
const OLD = ['ticker-row.ts — older style', 'ticker-row.ts — today'];

export default {
  topic: 'change-detection',
  tab: 'OnPush, name by name — The Angular Signal',
  title: { en: '<code>OnPush</code>, name by name', ar: '<code>OnPush</code>، اسم اسم' },
  say: {
    en: 'The page for when “why didn’t the screen update?” makes you feel lost. One live price table followed through every file, every name coloured by who owns it, and the few mistakes that leave the screen quietly wrong.',
    ar: 'الصفحة دي للي بيتوه في «ليه الشاشة متحدّثتش؟». جدول أسعار حي واحد ماشيين وراه في كل الملفات، وكل اسم ملوّن حسب صاحبه، والغلطات القليلة اللي بتسيب الشاشة غلط في صمت.'
  },
  lead: {
    en: 'The idea is small: <b>Angular only repaints a component when something tells it to, and with <code>OnPush</code> plus signals, the “something” is a signal its template read.</b> The confusing part is the names. There is a fixed line full of long Angular words, a store with methods other components call, inputs the parent must match, and data fields the server decides. This page tells you which is which.',
    ar: 'الفكرة صغيرة: <b>أنجولار مبيرسمش component تاني غير لما حاجة تقوله، ومع <code>OnPush</code> والـ signals، «الحاجة» دي هي signal التمبلت بتاعه قراها.</b> اللي بيلخبط هو الأسماء. فيه سطر ثابت مليان كلمات أنجولار طويلة، وstore فيه ميثودز components تانية بتناديها، وinputs الأب لازم يطابقها، وحقول داتا السيرفر هو اللي بيحددها. الصفحة دي بتقولك مين فيهم إيه.'
  },

  names: {
    note: {
      en: 'Read the orange rows first: those are the names two files must agree on. The blue ones are Angular’s, TypeScript’s or the browser’s, and <code>changeDetection: ChangeDetectionStrategy.OnPush</code> is one blue line you copy as is. Two spellings, <code>symbol</code> and <code>price</code>, appear with two different owners; the table says where each one lives.',
      ar: 'اقرا الصفوف البرتقاني الأول: دي الأسماء اللي ملفين لازم يتفقوا عليها. الزرقا بتاعة أنجولار أو TypeScript أو المتصفح، و<code>changeDetection: ChangeDetectionStrategy.OnPush</code> سطر أزرق واحد بتنسخه زي ما هو. فيه كلمتين، <code>symbol</code> و<code>price</code>، ظاهرين بصاحبين مختلفين؛ والجدول بيقولك كل واحد عايش فين.'
    },
    names: [
      /* --- shared: two files must agree --- */
      { n:'Row', k:'pub', w:{ en:'Your data type. Every file that imports it follows a rename.', ar:'نوع الداتا بتاعك. أي ملف بيعمله import بيتغير معاه.' } },
      { n:'id', k:'pub', w:{ en:'A field on <code>Row</code>. The table’s <code>track r.id</code> reads it.', ar:'field في <code>Row</code>. و<code>track r.id</code> في الجدول بيقراه.' } },
      { n:'symbol', k:'pub', not: STORE, re:'(?<!tick\\.)(?<![\\w$-])symbol(?![\\w$-])',
        w:{ en:'A field on <code>Row</code>, read by the row’s template. Not the same as <code>tick.symbol</code>, which is the server’s name.',
            ar:'field في <code>Row</code>، وتمبلت الصف بيقراه. مش هو <code>tick.symbol</code>، ده اسم السيرفر.' } },
      { n:'PriceStore', k:'pub', w:{ en:'Your service class. Every component that injects it types this name.', ar:'كلاس السيرفس بتاعك. أي component بيعمله inject بيكتب الاسم ده.' } },
      { n:'priceOf', k:'pub', w:{ en:'A store method the row’s template calls. Rename it in the store and in every template.', ar:'ميثود في الـ store تمبلت الصف بيناديها. غيّرها في الـ store وفي كل تمبلت.' } },
      { n:'setPrice', k:'pub', w:{ en:'A store method the table calls when a price arrives.', ar:'ميثود في الـ store الجدول بيناديها لما سعر يوصل.' } },
      { n:'row', k:'pub', re:'(?<![\\w$/-])row(?![\\w$-])',
        w:{ en:'The row’s input. The table sets it with <code>[row]</code>. Inside <code>changes[\'row\']</code> it is the same name, as a string.',
            ar:'الـ input بتاع الصف. الجدول بيحطه بـ <code>[row]</code>. وجوه <code>changes[\'row\']</code> هو نفس الاسم، بس كنص.' } },
      { n:'app-ticker-row', k:'pub', w:{ en:'The row’s selector: its <code>selector</code> string and the tag in the table must match.', ar:'الـ selector بتاع الصف: النص في <code>selector</code> والتاج في الجدول لازم يبقوا زي بعض.' } },
      { n:'TickerRow', k:'pub', w:{ en:'The row’s class, listed in the table’s <code>imports</code>.', ar:'كلاس الصف، مكتوب في <code>imports</code> بتاع الجدول.' } },
      { n:'app-ticker-table', k:'pub', w:{ en:'The table’s selector. Whoever shows the table types this tag.', ar:'الـ selector بتاع الجدول. أي حد بيعرض الجدول بيكتب التاج ده.' } },
      { n:'TickerTable', k:'pub', w:{ en:'The table’s class. Whoever shows the table imports it by this name.', ar:'كلاس الجدول. أي حد بيعرض الجدول بيعمله import بالاسم ده.' } },

      /* --- yours, private to one file --- */
      { n:'symbol', k:'mine', only: STORE, w:{ en:'A parameter inside the store. Same spelling as the <code>Row</code> field, but a separate local name.', ar:'parameter جوه الـ store. نفس هجاء الـ field بتاع <code>Row</code>، بس اسم محلي تاني خالص.' } },
      { n:'price', k:'mine', only: ['price-store.ts', ...OLD], w:{ en:'A local name: a parameter in the store, a field in the older row. Not <code>tick.price</code>, which is the server’s.', ar:'اسم محلي: parameter في الـ store، وfield في الصف القديم. مش <code>tick.price</code>، ده بتاع السيرفر.' } },
      { n:'prices', k:'mine', w:{ en:'The store’s private map. Only the store uses it.', ar:'الـ map الخاصة بالـ store. الـ store بس اللي بيستخدمها.' } },
      { n:'slot', k:'mine', w:{ en:'The store’s private helper that finds or creates one price signal.', ar:'helper خاص بالـ store بيلاقي أو بيعمل signal لسعر واحد.' } },
      { n:'s', k:'mine', only:['price-store.ts'], w:{ en:'A local variable inside <code>slot</code>.', ar:'متغير محلي جوه <code>slot</code>.' } },
      { n:'store', k:'mine', w:{ en:'Each component’s own field holding the store. The row’s template reads it, but that is still inside the row.', ar:'الـ field بتاع كل component اللي شايل الـ store. تمبلت الصف بيقراه، بس ده برضه جوه الصف.' } },
      { n:'rows', k:'mine', w:{ en:'The table’s signal holding the list. Only the table and its template read it.', ar:'الـ signal بتاعة الجدول اللي شايلة الليستة. الجدول وتمبلته بس اللي بيقروها.' } },
      { n:'r', k:'mine', only:['ticker-table.html'], w:{ en:'The loop variable in the table’s template.', ar:'متغير اللوب في تمبلت الجدول.' } },
      { n:'socket', k:'mine', w:{ en:'A local variable holding the WebSocket.', ar:'متغير محلي شايل الـ WebSocket.' } },
      { n:'e', k:'mine', only:['ts'], w:{ en:'The callback’s parameter: the message event. Any name works.', ar:'الـ parameter بتاع الـ callback: الـ event بتاع الرسالة. أي اسم ينفع.' } },
      { n:'tick', k:'mine', w:{ en:'Your variable for the parsed message. The fields you read on it (<code>.symbol</code>, <code>.price</code>) are the server’s.', ar:'المتغير بتاعك للرسالة بعد الـ parse. الحقول اللي بتقراها منه (<code>.symbol</code> و<code>.price</code>) بتاعة السيرفر.' } },
      { n:'addRow', k:'mine', w:{ en:'The table’s method, called by its own button.', ar:'ميثود الجدول، والزرار بتاعه هو اللي بيناديها.' } },
      { n:'code', k:'mine', w:{ en:'A parameter of <code>addRow</code>.', ar:'parameter بتاع <code>addRow</code>.' } },
      { n:'list', k:'mine', w:{ en:'The arrow function’s parameter: the current array.', ar:'الـ parameter بتاع الـ arrow function: الـ array الحالية.' } },
      { n:'lastUpdate', k:'mine', w:{ en:'A field on the table, shown by its template.', ar:'field في الجدول، والتمبلت بتاعه بيعرضه.' } },
      { n:'changes', k:'mine', w:{ en:'The hook’s parameter. Any name works; its type is Angular’s.', ar:'الـ parameter بتاع الـ hook. أي اسم ينفع؛ النوع بتاعه من أنجولار.' } },
      { n:'cdr', k:'mine', w:{ en:'Your field for the injected <code>ChangeDetectorRef</code>. <code>cdr</code> is only a habit.', ar:'الـ field بتاعك للـ <code>ChangeDetectorRef</code> اللي اتعمله inject. <code>cdr</code> مجرد عادة.' } },
      { n:'showPrice', k:'mine', w:{ en:'The older row’s own method.', ar:'ميثود الصف القديم نفسه.' } },
      { n:'value', k:'mine', w:{ en:'A parameter of <code>showPrice</code>.', ar:'parameter بتاع <code>showPrice</code>.' } },

      /* --- Angular's, TypeScript's, the browser's --- */
      { n:'changeDetection', k:'ng', w:{ en:'An option key Angular reads on <code>@Component</code>.', ar:'مفتاح إعداد أنجولار بيقراه في <code>@Component</code>.' } },
      { n:'ChangeDetectionStrategy', k:'ng', w:{ en:'Angular’s enum of strategies, imported from <code>@angular/core</code>.', ar:'الـ enum بتاع أنجولار للاستراتيجيات، جاي import من <code>@angular/core</code>.' } },
      { n:'OnPush', k:'ng', w:{ en:'Angular’s strategy: check this component only when an input reference, an event in it, or a signal it read says so.', ar:'استراتيجية أنجولار: شيّك على الـ component ده بس لما reference الـ input يتغير، أو event جواه، أو signal هو قراها.' } },
      { n:'ChangeDetectorRef', k:'ng', w:{ en:'Angular’s handle on one component’s checking.', ar:'الـ handle بتاع أنجولار على تشييك component واحد.' } },
      { n:'markForCheck', k:'ng', w:{ en:'Angular’s method: “check me on the next pass”. Rarely needed with signals.', ar:'ميثود أنجولار: «شيّك عليّا في اللفة الجاية». نادرًا ما تحتاجها مع الـ signals.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator.', ar:'الـ decorator بتاع أنجولار.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The string after it is yours.', ar:'مفتاح إعداد. النص اللي بعده بتاعك.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key. The path after it points at your file.', ar:'مفتاح إعداد. المسار اللي بعده بيشاور على ملفك.' } },
      { n:'imports', k:'ng', w:{ en:'An option key: the components this template uses.', ar:'مفتاح إعداد: الـ components اللي التمبلت ده بيستخدمها.' } },
      { n:'@Injectable', k:'ng', w:{ en:'Angular’s decorator for a service.', ar:'الـ decorator بتاع أنجولار للسيرفس.' } },
      { n:'providedIn', k:'ng', w:{ en:'An option key Angular reads. <code>\'root\'</code> means one shared instance.', ar:'مفتاح إعداد أنجولار بيقراه. <code>\'root\'</code> معناها نسخة واحدة متشاركة.' } },
      { n:'input', k:'ng', w:{ en:'Angular’s function that creates a signal input.', ar:'الـ function بتاعة أنجولار اللي بتعمل signal input.' } },
      { n:'required', k:'ng', w:{ en:'Part of Angular’s API: <code>input.required</code>, or the <code>required</code> option of <code>@Input</code>.', ar:'جزء من API أنجولار: <code>input.required</code>، أو إعداد <code>required</code> في <code>@Input</code>.' } },
      { n:'@Input', k:'ng', w:{ en:'The older decorator for an input: a plain field, not a signal.', ar:'الـ decorator القديم للـ input: field عادي، مش signal.' } },
      { n:'signal', k:'ng', w:{ en:'Angular’s writable signal. Writing it is what tells Angular to repaint.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب. الكتابة فيها هي اللي بتقول لأنجولار يرسم تاني.' } },
      { n:'WritableSignal', k:'ng', w:{ en:'Angular’s type for a signal you can <code>set</code>.', ar:'النوع بتاع أنجولار لـ signal تقدر تعملها <code>set</code>.' } },
      { n:'set', k:'ng', w:{ en:'Two built-ins with one spelling: a signal’s <code>set</code>, and <code>Map.set</code>.', ar:'حاجتين جاهزين بنفس الاسم: <code>set</code> بتاعة الـ signal، و<code>Map.set</code>.' } },
      { n:'update', k:'ng', w:{ en:'A signal method: compute the new value from the old one.', ar:'ميثود الـ signal: احسب القيمة الجديدة من القديمة.' } },
      { n:'get', k:'ng', w:{ en:'A <code>Map</code> method from JavaScript.', ar:'ميثود في <code>Map</code> من JavaScript.' } },
      { n:'Map', k:'ng', w:{ en:'JavaScript’s key → value collection.', ar:'الـ collection بتاعة JavaScript: مفتاح ← قيمة.' } },
      { n:'push', k:'ng', w:{ en:'JavaScript’s array method. It changes the array in place and keeps the same reference.', ar:'ميثود الـ array بتاعة JavaScript. بتغيّر الـ array مكانها وبتسيب نفس الـ reference.' } },
      { n:'inject', k:'ng', w:{ en:'Angular’s function that hands you a service.', ar:'الـ function بتاعة أنجولار اللي بتديك سيرفس.' } },
      { n:'DestroyRef', k:'ng', w:{ en:'Angular’s handle on “this component is being destroyed”.', ar:'الـ handle بتاع أنجولار لـ «الـ component ده بيتشال».' } },
      { n:'onDestroy', k:'ng', w:{ en:'A <code>DestroyRef</code> method: run this cleanup at the end.', ar:'ميثود في <code>DestroyRef</code>: شغّل التنضيف ده في الآخر.' } },
      { n:'WebSocket', k:'ng', w:{ en:'The browser’s WebSocket class.', ar:'كلاس الـ WebSocket بتاع المتصفح.' } },
      { n:'onmessage', k:'ng', w:{ en:'The browser’s property for “a message arrived”.', ar:'الـ property بتاعة المتصفح لـ «رسالة وصلت».' } },
      { n:'data', k:'ng', w:{ en:'The browser’s field on a message event: the raw text.', ar:'field المتصفح في event الرسالة: النص الخام.' } },
      { n:'close', k:'ng', w:{ en:'The browser’s WebSocket method.', ar:'ميثود الـ WebSocket بتاعة المتصفح.' } },
      { n:'JSON', k:'ng', w:{ en:'JavaScript’s built-in. <code>JSON.parse</code> returns <code>any</code>, so TypeScript cannot check the names you read from it.', ar:'حاجة جاهزة في JavaScript. <code>JSON.parse</code> بترجّع <code>any</code>، فـ TypeScript مايقدرش يشيّك على الأسماء اللي بتقراها منها.' } },
      { n:'@for', k:'ng', w:{ en:'Angular’s loop block.', ar:'بلوك اللوب بتاع أنجولار.' } },
      { n:'track', k:'ng', w:{ en:'Part of <code>@for</code>: how Angular tells rows apart.', ar:'جزء من <code>@for</code>: أنجولار بيفرّق بين الصفوف إزاي.' } },
      { n:'click', k:'ng', w:{ en:'The browser’s event name.', ar:'اسم الـ event بتاع المتصفح.' } },
      { n:'OnChanges', k:'ng', w:{ en:'Angular’s interface. Writing <code>implements OnChanges</code> makes TypeScript check the hook’s spelling.', ar:'الـ interface بتاع أنجولار. لما تكتب <code>implements OnChanges</code>، TypeScript بيشيّك على هجاء الـ hook.' } },
      { n:'ngOnChanges', k:'ng', w:{ en:'The hook’s method name. Angular looks for exactly this spelling.', ar:'اسم ميثود الـ hook. أنجولار بيدوّر على الهجاء ده بالظبط.' } },
      { n:'SimpleChanges', k:'ng', w:{ en:'Angular’s type for the hook’s parameter.', ar:'نوع أنجولار للـ parameter بتاع الـ hook.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One price ticks, one row repaints', ar: 'سعر واحد يتغير، صف واحد يترسم' },
    lead: {
      en: 'A table of stock prices. Each row is a child component. A WebSocket sends a new price for one symbol. Out of all the rows on screen, only that one should repaint. Follow the price:',
      ar: 'جدول أسعار أسهم. كل صف component ابن. الـ WebSocket بيبعت سعر جديد لرمز واحد. من كل الصفوف اللي على الشاشة، الصف ده بس اللي المفروض يترسم تاني. امشي ورا السعر:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'ticker-table.ts', lang: 'ts', who: { en: 'table · a message arrives', ar: 'الجدول · رسالة وصلت' },
          code: ['socket.onmessage = e => {', '  const tick = JSON.parse(e.data);', '  this.store.setPrice(tick.symbol, tick.price);', '};'],
          say: { en: `The price comes from outside Angular. ${ng('onmessage')} and ${ng('data')} are the browser’s. ${mine('socket')}, ${mine('e')} and ${mine('tick')} are local names you picked. But <code>.symbol</code> and <code>.price</code> after <code>tick</code> are <b>the server’s</b> names: they must match the JSON it sends.`,
                 ar: `السعر جاي من بره أنجولار. ${ng('onmessage')} و${ng('data')} بتوع المتصفح. و${mine('socket')} و${mine('e')} و${mine('tick')} أسماء محلية انت اخترتها. لكن <code>.symbol</code> و<code>.price</code> اللي بعد <code>tick</code> دول <b>أسماء السيرفر</b>: لازم يطابقوا الـ JSON اللي بيبعته.` } },
        { file: 'price-store.ts', lang: 'ts', who: { en: 'store · the write', ar: 'الـ store · الكتابة' },
          code: ['setPrice(symbol: string, price: number) {', '  this.slot(symbol).set(price);', '}'],
          say: { en: `${pub('setPrice')} is your store method, and the table calls it, so the name is shared. ${ng('set')} is Angular’s, and it is the whole trick: <b>writing a signal is the notification.</b> Nobody calls “re-render” by name.`,
                 ar: `${pub('setPrice')} ميثود الـ store بتاعك، والجدول بيناديها، فالاسم متشارك. و${ng('set')} بتاعة أنجولار، وهي الحكاية كلها: <b>الكتابة في signal هي نفسها التبليغ.</b> محدش بينادي «ارسم تاني» بالاسم.` } },
        { file: 'ticker-row.html', lang: 'html', who: { en: 'row · the read', ar: 'الصف · القراية' },
          code: ['<b>{{ store.priceOf(row().symbol) }}</b>'],
          say: { en: `Earlier, this template called ${pub('priceOf')}, which read that price signal. That read is how Angular knows <b>this</b> row cares about <b>this</b> price. ${mine('store')} is the row’s own field; ${pub('row')} is its input; ${pub('symbol')} is a field on your ${pub('Row')} type.`,
                 ar: `قبل كده، التمبلت ده نادى ${pub('priceOf')}، واللي قرت الـ signal بتاعة السعر ده. القراية دي هي اللي بتعرّف أنجولار إن الصف <b>ده</b> يهمه السعر <b>ده</b>. ${mine('store')} الـ field بتاع الصف نفسه؛ و${pub('row')} الـ input بتاعه؛ و${pub('symbol')} field في النوع ${pub('Row')} بتاعك.` } },
        { file: 'ticker-row.ts', lang: 'ts', who: { en: 'row · the strategy', ar: 'الصف · الاستراتيجية' },
          code: ['changeDetection: ChangeDetectionStrategy.OnPush,'],
          say: { en: `One fixed line, and every word in it is Angular’s: ${ng('changeDetection')}, ${ng('ChangeDetectionStrategy')}, ${ng('OnPush')}. It says “skip me unless something I depend on changed”. The signal write in stop 2 is one of those things, so this row repaints.`,
                 ar: `سطر ثابت واحد، وكل كلمة فيه بتاعة أنجولار: ${ng('changeDetection')} و${ng('ChangeDetectionStrategy')} و${ng('OnPush')}. بيقول «عدّيني إلا لو حاجة أنا معتمد عليها اتغيرت». والكتابة في الـ signal في المحطة 2 واحدة من الحاجات دي، فالصف ده بيترسم.` } },
        { file: 'ticker-table.html', lang: 'html', who: { en: 'table · left alone', ar: 'الجدول · محدش لمسه' },
          code: ['@for (r of rows(); track r.id) {', '  <app-ticker-row [row]="r" />', '}'],
          say: { en: `The table and the other rows read nothing that changed, so Angular does not re-check them. ${mine('rows')} and ${mine('r')} are the table’s own names. ${pub('app-ticker-row')} and ${pub('row')} are the row’s names, copied here exactly.`,
                 ar: `الجدول وباقي الصفوف مقروش حاجة اتغيرت، فأنجولار مبيشيّكش عليهم تاني. ${mine('rows')} و${mine('r')} أسماء الجدول نفسه. و${pub('app-ticker-row')} و${pub('row')} أسماء الصف، متنسوخين هنا بالظبط.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'Store: <code>signal.set(price)</code>. Row template: reads that signal through <code>priceOf()</code>. Row: <code>OnPush</code>. Angular connects the write to the read; <b>you never name a “re-render” anywhere</b>. The only names files share are your store’s methods, the row’s input, its selector and your data type.',
        ar: 'الـ store: <code>signal.set(price)</code>. تمبلت الصف: بيقرا الـ signal دي عن طريق <code>priceOf()</code>. الصف: <code>OnPush</code>. أنجولار بيوصّل الكتابة بالقراية؛ <b>عمرك ما بتكتب اسم «ارسم تاني» في أي حتة</b>. الأسماء الوحيدة اللي الملفات متشاركة فيها هي ميثودز الـ store بتاعك، والـ input بتاع الصف، والـ selector بتاعه، ونوع الداتا بتاعك.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Which file?', ar: 'أنهي ملف؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'Change detection has no “call this to update” function, which is exactly why it feels vague. Every piece still has one home.',
      ar: 'الـ change detection مفيهوش function «نادي دي عشان تحدّث»، وده بالظبط اللي بيخليه يبان مش واضح. بس كل حتة برضه ليها بيت واحد.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>changeDetection: ChangeDetectionStrategy.OnPush</code>', 'each component’s <code>@Component</code>', 'each component, for itself', `nobody: all three words are Angular’s`],
            ar: ['<code>changeDetection: ChangeDetectionStrategy.OnPush</code>', '<code>@Component</code> بتاع كل component', 'كل component لنفسه', 'محدش: التلات كلمات بتوع أنجولار'] },
          { en: ['<code>this.slot(symbol).set(price)</code>', 'the store <code>.ts</code>', 'the store', `you pick ${pub('setPrice')}, ${mine('slot')}; ${ng('set')} is Angular’s`],
            ar: ['<code>this.slot(symbol).set(price)</code>', '<code>.ts</code> الـ store', 'الـ store', `انت بتختار ${pub('setPrice')} و${mine('slot')}؛ و${ng('set')} بتاعة أنجولار`] },
          { en: ['<code>store.priceOf(row().symbol)</code>', 'the row’s <code>.html</code>', 'the row', `${pub('priceOf')} must copy the store; ${pub('row')} is the row’s input`],
            ar: ['<code>store.priceOf(row().symbol)</code>', '<code>.html</code> الصف', 'الصف', `${pub('priceOf')} لازم ينسخ الـ store؛ و${pub('row')} الـ input بتاع الصف`] },
          { en: ['<code>readonly row = input.required&lt;Row&gt;()</code>', 'the row’s <code>.ts</code>', 'the row', `you pick ${pub('row')}; ${ng('input')} is Angular’s`],
            ar: ['<code>readonly row = input.required&lt;Row&gt;()</code>', '<code>.ts</code> الصف', 'الصف', `انت بتختار ${pub('row')}؛ و${ng('input')} بتاعة أنجولار`] },
          { en: ['<code>&lt;app-ticker-row [row]="r" /&gt;</code>', 'the table’s <code>.html</code>', 'the table', `${pub('app-ticker-row')} and ${pub('row')} copy the row; ${mine('r')} is the table’s`],
            ar: ['<code>&lt;app-ticker-row [row]="r" /&gt;</code>', '<code>.html</code> الجدول', 'الجدول', `${pub('app-ticker-row')} و${pub('row')} بينسخوا الصف؛ و${mine('r')} بتاع الجدول`] },
          { en: ['<code>tick.symbol</code>, <code>tick.price</code>', 'the table’s <code>.ts</code>', 'the table', '<b>the server</b>: whatever its JSON calls them'],
            ar: ['<code>tick.symbol</code> و<code>tick.price</code>', '<code>.ts</code> الجدول', 'الجدول', '<b>السيرفر</b>: أي اسم الـ JSON بتاعه بيسمّيهم بيه'] },
        ] },
      { t: 'ul',
        en: ['<b>The strategy line is per component.</b> Each component says how <b>it</b> is checked, in its own <code>@Component</code>. Nothing is set once for the whole app in this example.',
             '<b>The writer never names the reader.</b> The store does not know which rows show a price. The row’s template read the signal; Angular remembers that link for you.',
             '<b>A template can only depend on what it reads.</b> If the row shows a value it did not read through a signal (or get as a new input), <code>OnPush</code> has no reason to repaint it.'],
        ar: ['<b>سطر الاستراتيجية لكل component لوحده.</b> كل component بيقول هو <b>نفسه</b> بيتشيّك عليه إزاي، في الـ <code>@Component</code> بتاعه. مفيش حاجة بتتظبط مرة واحدة للتطبيق كله في المثال ده.',
             '<b>اللي بيكتب عمره ما بيسمّي اللي بيقرا.</b> الـ store مايعرفش أنهي صفوف بتعرض السعر. تمبلت الصف قرا الـ signal؛ وأنجولار بيفتكر الربطة دي بدالك.',
             '<b>التمبلت بيعتمد بس على اللي بيقراه.</b> لو الصف بيعرض قيمة مقراهاش من signal (ومجاتلوش كـ input جديد)، <code>OnPush</code> ملوش سبب يرسمه تاني.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All six files, every name coloured', ar: 'الست ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same example, complete. Hover a coloured name to light up everywhere else it appears. Then press <b>Rename test</b>: every name you own becomes a made-up word, Angular’s and the browser’s words stay put, and the code still works. Notice that <code>tick.symbol</code> and <code>tick.price</code> do not move: they are the server’s.',
      ar: 'نفس المثال، كامل. قف بالماوس على أي اسم ملوّن وهتنوّر كل الأماكن التانية اللي هو فيها. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: كل اسم بتاعك هيبقى كلمة عشوائية، وكلمات أنجولار والمتصفح هتفضل مكانها، والكود لسه شغال. خد بالك إن <code>tick.symbol</code> و<code>tick.price</code> مش بيتحركوا: دول بتوع السيرفر.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'row.ts', lang: 'ts', tag: { en: 'the data', ar: 'الداتا' }, code: [
        'export interface Row {',
        '  id: number;',
        '  symbol: string;',
        '}' ] },
      { t: 'code', name: 'price-store.ts', lang: 'ts', tag: { en: 'one signal per symbol', ar: 'signal لكل رمز' }, code: [
        "import { Injectable, WritableSignal, signal } from '@angular/core';",
        '',
        "@Injectable({ providedIn: 'root' })",
        'export class PriceStore {',
        '  private readonly prices = new Map<string, WritableSignal<number>>();',
        '',
        '  priceOf(symbol: string) {',
        '    return this.slot(symbol)();          // a signal READ',
        '  }',
        '',
        '  setPrice(symbol: string, price: number) {',
        '    this.slot(symbol).set(price);        // a signal WRITE',
        '  }',
        '',
        '  private slot(symbol: string) {',
        '    let s = this.prices.get(symbol);',
        '    if (!s) {',
        '      s = signal(0);',
        '      this.prices.set(symbol, s);',
        '    }',
        '    return s;',
        '  }',
        '}' ] },
      { t: 'code', name: 'ticker-table.ts', lang: 'ts', tag: { en: 'parent', ar: 'الأب' }, code: [
        "import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';",
        "import { PriceStore } from './price-store';",
        "import { Row } from './row';",
        "import { TickerRow } from './ticker-row';",
        '',
        '@Component({',
        "  selector: 'app-ticker-table',",
        '  imports: [TickerRow],',
        '  changeDetection: ChangeDetectionStrategy.OnPush,',
        "  templateUrl: './ticker-table.html',",
        '})',
        'export class TickerTable {',
        '  private readonly store = inject(PriceStore);',
        '',
        '  readonly rows = signal<Row[]>([',
        "    { id: 1, symbol: 'ACME' },",
        "    { id: 2, symbol: 'GLOBEX' },",
        '  ]);',
        '',
        '  constructor() {',
        "    const socket = new WebSocket('wss://example.com/live');",
        '    socket.onmessage = e => {',
        '      const tick = JSON.parse(e.data);           // the server’s shape',
        '      this.store.setPrice(tick.symbol, tick.price);',
        '    };',
        '    inject(DestroyRef).onDestroy(() => socket.close());',
        '  }',
        '',
        '  addRow(code: string) {',
        '    this.rows.update(list => [...list, { id: Date.now(), symbol: code }]);',
        '  }',
        '}' ] },
      { t: 'code', name: 'ticker-table.html', lang: 'html', tag: { en: 'parent', ar: 'الأب' }, code: [
        '@for (r of rows(); track r.id) {',
        '  <app-ticker-row [row]="r" />',
        '}',
        `<button (click)="addRow('INITECH')">Add INITECH</button>` ] },
      { t: 'code', name: 'ticker-row.ts', lang: 'ts', tag: { en: 'child', ar: 'الابن' }, code: [
        "import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';",
        "import { PriceStore } from './price-store';",
        "import { Row } from './row';",
        '',
        '@Component({',
        "  selector: 'app-ticker-row',",
        '  changeDetection: ChangeDetectionStrategy.OnPush,',
        "  templateUrl: './ticker-row.html',",
        '})',
        'export class TickerRow {',
        '  readonly row = input.required<Row>();',
        '  protected readonly store = inject(PriceStore);',
        '}' ] },
      { t: 'code', name: 'ticker-row.html', lang: 'html', tag: { en: 'child', ar: 'الابن' }, code: [
        '<span>{{ row().symbol }}</span>',
        '<b>{{ store.priceOf(row().symbol) }}</b>' ] },
      { t: 'nmtable' }
    ]
  },

  /* ------------------------------------------------------------ 4 */
  {
    id: 'rename',
    kicker: { en: 'Is it OK to change it?', ar: 'ينفع أغيّره؟' },
    title: { en: 'What breaks when you rename each name', ar: 'إيه اللي بيبوظ لما تغيّر كل اسم' },
    lead: {
      en: 'Every name you own can be renamed, and here almost every forgotten spot is a compile error, which is good. The dangerous ones are the names you do <b>not</b> own but that look like yours.',
      ar: 'أي اسم بتاعك ينفع يتغير، وهنا تقريبًا كل مكان تنساه بيدّيك compile error، وده كويس. الخطر في الأسماء اللي <b>مش</b> بتاعتك بس شكلها بتاعتك.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [pub('row') + ' (the input)', 'the table: <code>[row]</code>; the row template: <code>row()</code>', 'Compile error: the table binds an input that does not exist, and a required input is missing.'],
            ar: [pub('row') + ' (الـ input)', 'الجدول: <code>[row]</code>؛ وتمبلت الصف: <code>row()</code>', 'Compile error: الجدول بيربط input مش موجود، وinput مطلوب ناقص.'] },
          { en: [pub('priceOf') + ' / ' + pub('setPrice'), 'every template or class that calls it', 'Compile error: the method does not exist on <code>PriceStore</code>.'],
            ar: [pub('priceOf') + ' / ' + pub('setPrice'), 'أي تمبلت أو كلاس بيناديها', 'Compile error: الميثود مش موجودة في <code>PriceStore</code>.'] },
          { en: [pub('symbol') + ' (a field on Row)', 'the starting data, <code>addRow</code>, the row template', 'Compile error wherever the old field is read or written.'],
            ar: [pub('symbol') + ' (field في Row)', 'الداتا اللي في الأول، و<code>addRow</code>، وتمبلت الصف', 'Compile error في أي مكان بيقرا أو بيكتب الـ field القديم.'] },
          { en: ['<code>tick.symbol</code> (the server’s)', 'nothing. Leave it alone', '<b>No error at all.</b> <code>JSON.parse</code> gives <code>any</code>, so a renamed <code>tick.ticker</code> is just <code>undefined</code> and the prices never show. See the last section.'],
            ar: ['<code>tick.symbol</code> (بتاع السيرفر)', 'ولا حاجة. سيبه في حاله', '<b>مفيش أي error.</b> <code>JSON.parse</code> بتدّي <code>any</code>، فـ <code>tick.ticker</code> بعد التغيير بيبقى <code>undefined</code> والأسعار عمرها ما تظهر. شوف آخر جزء.'] },
          { en: [pub('app-ticker-row') + ' (the selector)', 'the tag in the table’s template', 'Compile error: “is not a known element”.'],
            ar: [pub('app-ticker-row') + ' (الـ selector)', 'التاج في تمبلت الجدول', 'Compile error: «is not a known element».'] },
          { en: [pub('TickerRow') + ', ' + pub('PriceStore'), 'every <code>import</code> line, <code>imports: [ ]</code>, <code>inject( )</code>', 'Compile error on the import.'],
            ar: [pub('TickerRow') + '، ' + pub('PriceStore'), 'كل سطر <code>import</code>، و<code>imports: [ ]</code>، و<code>inject( )</code>', 'Compile error في الـ import.'] },
          { en: [mine('store') + ', ' + mine('rows') + ', ' + mine('addRow'), 'that component’s own class and template', 'Compile error in that component.'],
            ar: [mine('store') + '، ' + mine('rows') + '، ' + mine('addRow'), 'الكلاس والتمبلت بتوع الـ component ده بس', 'Compile error في الـ component ده.'] },
          { en: [`${ng('changeDetection')}, ${ng('ChangeDetectionStrategy')}, ${ng('OnPush')}`, 'nothing: you cannot rename these', 'A typo is a compile error: <code>@Component</code> only accepts keys Angular knows, and the enum has no other member by that name.'],
            ar: [`${ng('changeDetection')} و${ng('ChangeDetectionStrategy')} و${ng('OnPush')}`, 'ولا حاجة: دول مينفعش يتغيروا', 'أي غلطة إملائية compile error: <code>@Component</code> بيقبل بس المفاتيح اللي أنجولار يعرفها، والـ enum مفيهوش حاجة تانية بالاسم ده.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b> in the bar above the files. Every green and orange name becomes a random word in every file at once, and the <code>OnPush</code> line, <code>set</code>, <code>onmessage</code> and <code>tick.symbol</code> do not move. That is exactly what a correct rename looks like.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b> في الشريط اللي فوق الملفات. كل اسم أخضر وبرتقاني هيبقى كلمة عشوائية في كل الملفات مرة واحدة، وسطر الـ <code>OnPush</code> و<code>set</code> و<code>onmessage</code> و<code>tick.symbol</code> مش هيتحركوا. وده بالظبط شكل التغيير الصح.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتوعك' },
    title: { en: 'The words you copy, not choose', ar: 'الكلمات اللي بتنسخها، مش بتختارها' },
    lead: {
      en: 'The long words are the scary part, and none of them are yours. They come from three owners: Angular, the browser, and the server on the other end of the socket.',
      ar: 'الكلمات الطويلة هي الجزء اللي بيخوّف، ومفيش ولا واحدة فيهم بتاعتك. جايين من تلات أصحاب: أنجولار، والمتصفح، والسيرفر اللي على الناحية التانية من الـ socket.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Word', 'Whose', 'What it means'], ar: ['الكلمة', 'بتاعة مين', 'معناها'] },
        rows: [
          { en: [ng('changeDetection'), 'Angular', 'The key in <code>@Component</code> that picks a strategy.'],
            ar: [ng('changeDetection'), 'أنجولار', 'المفتاح في <code>@Component</code> اللي بيختار استراتيجية.'] },
          { en: [`${ng('ChangeDetectionStrategy')}.${ng('OnPush')}`, 'Angular', 'The strategy value. Imported from <code>@angular/core</code> like any other name.'],
            ar: [`${ng('ChangeDetectionStrategy')}.${ng('OnPush')}`, 'أنجولار', 'قيمة الاستراتيجية. بتتعمل import من <code>@angular/core</code> زي أي اسم تاني.'] },
          { en: [`${ng('signal')}, ${ng('set')}, ${ng('update')}`, 'Angular', 'Create, write, and write-from-the-old-value. A write is what schedules a repaint.'],
            ar: [`${ng('signal')} و${ng('set')} و${ng('update')}`, 'أنجولار', 'اعمل، واكتب، واكتب من القيمة القديمة. الكتابة هي اللي بتجدول الرسم.'] },
          { en: [`${ng('ChangeDetectorRef')}, ${ng('markForCheck')}`, 'Angular', 'The manual “check me” for code that is not on signals yet.'],
            ar: [`${ng('ChangeDetectorRef')} و${ng('markForCheck')}`, 'أنجولار', 'الـ «شيّك عليّا» اليدوي للكود اللي لسه مش على signals.'] },
          { en: [`${ng('WebSocket')}, ${ng('onmessage')}, ${ng('data')}, ${ng('close')}`, 'the browser', 'The socket API. The same names in every framework.'],
            ar: [`${ng('WebSocket')} و${ng('onmessage')} و${ng('data')} و${ng('close')}`, 'المتصفح', 'API الـ socket. نفس الأسماء في أي framework.'] },
          { en: ['<code>tick.symbol</code>, <code>tick.price</code>', 'the server', 'Fields of the JSON message. You read them; the server names them.'],
            ar: ['<code>tick.symbol</code> و<code>tick.price</code>', 'السيرفر', 'حقول رسالة الـ JSON. انت بتقراهم؛ السيرفر هو اللي بيسمّيهم.'] },
        ] },
      { t: 'note', label: { en: 'Same spelling, different owner', ar: 'نفس الهجاء، صاحب مختلف' },
        en: `The server’s <code>symbol</code>, the ${pub('symbol')} field on your ${pub('Row')}, and the ${mine('symbol')} parameter inside the store are three different names that happen to be spelled alike. Hover each one in the files: they light up separately.`,
        ar: `الـ <code>symbol</code> بتاع السيرفر، والـ field ${pub('symbol')} في الـ ${pub('Row')} بتاعك، والـ parameter ${mine('symbol')} جوه الـ store، تلات أسماء مختلفين صدفة مكتوبين زي بعض. قف بالماوس على كل واحد في الملفات: كل واحد بينوّر لوحده.` }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'Angular accepts any of these names. These habits just make it obvious, at a glance, what is a signal, what is a read and what is a write.',
      ar: 'أنجولار بيقبل أي اسم من دول. العادات دي بس بتخليك تعرف من أول نظرة إيه اللي signal، وإيه اللي قراية، وإيه اللي كتابة.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['a signal', '<code>rows</code>, <code>lastUpdate</code>', '<code>rowsSignal</code>, <code>rows$</code>', 'You call it with <code>()</code> anyway. A <code>$</code> on the end usually means an observable, so it would mislead.'],
            ar: ['signal', '<code>rows</code>، <code>lastUpdate</code>', '<code>rowsSignal</code>، <code>rows$</code>', 'انت بتناديها بـ <code>()</code> كده كده. والـ <code>$</code> في الآخر عادةً معناها observable، فهتضلّل.'] },
          { en: ['a store read', '<code>priceOf(symbol)</code>, <code>price(symbol)</code>', '<code>loadPrice</code>, <code>fetchPrice</code>', 'A template calls it on every check. It should sound cheap, and be cheap.'],
            ar: ['قراية من الـ store', '<code>priceOf(symbol)</code>، <code>price(symbol)</code>', '<code>loadPrice</code>، <code>fetchPrice</code>', 'التمبلت بيناديها في كل تشييك. لازم اسمها يبان رخيص، وتكون رخيصة فعلًا.'] },
          { en: ['a store write', '<code>setPrice</code>, <code>addRow</code>', '<code>price</code> for a write too', 'Keep reads and writes apart, so a template can never look like it is changing state.'],
            ar: ['كتابة في الـ store', '<code>setPrice</code>، <code>addRow</code>', '<code>price</code> للكتابة كمان', 'افصل القراية عن الكتابة، عشان التمبلت عمره ما يبان إنه بيغيّر الحالة.'] },
          { en: ['the component class', '<code>TickerRow</code>', '—', 'Angular v20’s style guide and CLI drop the <code>Component</code> suffix. <code>TickerRowComponent</code> still works fine.'],
            ar: ['كلاس الـ component', '<code>TickerRow</code>', '—', 'دليل أسلوب أنجولار v20 والـ CLI بيشيلوا لاحقة <code>Component</code>. و<code>TickerRowComponent</code> برضه شغالة عادي.'] },
          { en: ['the injected <code>ChangeDetectorRef</code>', '<code>cdr</code>, <code>changeDetector</code>', '—', 'Pure habit. <code>cdr</code> is so common that people think it is required. It is not.'],
            ar: ['الـ <code>ChangeDetectorRef</code> اللي اتعمله inject', '<code>cdr</code>، <code>changeDetector</code>', '—', 'عادة وبس. <code>cdr</code> منتشرة لدرجة إن الناس فاكراها إجبارية. هي مش كده.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Three places where you do not get a choice', ar: 'تلات أماكن مالكش فيها اختيار' },
    lead: {
      en: 'Most names on this page are free. These three look free and are not.',
      ar: 'أغلب الأسماء في الصفحة دي براحتك. التلاتة دول شكلهم براحتك وهما مش كده.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'Lifecycle hooks: Angular calls them by name', ar: 'الـ lifecycle hooks: أنجولار بيناديهم بالاسم' }, blocks: [
        { t: 'p',
          en: `Angular calls a hook only if the method is spelled exactly ${ng('ngOnChanges')}. A typo is not an error: it is just a method nobody calls. Writing <code>implements</code> ${ng('OnChanges')} turns that typo into a compile error. Inside, the key in ${mine('changes')}<code>['row']</code> is your input’s name as a string, so it follows a rename of ${pub('row')}.`,
          ar: `أنجولار بينادي الـ hook بس لو الميثود مكتوبة ${ng('ngOnChanges')} بالظبط. الغلطة الإملائية مش error: هي بس ميثود محدش بيناديها. لما تكتب <code>implements</code> ${ng('OnChanges')} الغلطة دي بتبقى compile error. وجوه، المفتاح في ${mine('changes')}<code>['row']</code> هو اسم الـ input بتاعك كنص، فبيتغير لو غيّرت ${pub('row')}.` },
        { t: 'pair',
          bad:  { name: 'ticker-row.ts — typo', lang: 'ts', code: [
            'export class TickerRow {',
            '  ngOnChange(changes: SimpleChanges) {   // never called',
            '    // …',
            '  }',
            '}' ] },
          good: { name: 'ticker-row.ts — with a hook', lang: 'ts', code: [
            'export class TickerRow implements OnChanges {',
            '  readonly row = input.required<Row>();',
            '',
            '  ngOnChanges(changes: SimpleChanges) {',
            "    if (changes['row']) console.log('new reference', this.row().symbol);",
            '  }',
            '}' ] } }
      ]},
      { t: 'step', n: 'B', title: { en: 'A field the template reads cannot be private', ar: 'الـ field اللي التمبلت بيقراه مينفعش يبقى private' }, blocks: [
        { t: 'p',
          en: `The name ${mine('store')} is yours, but in the row it is <code>protected</code>, not <code>private</code>, because the row’s template reads it. Make it <code>private</code> and the template gets a compile error saying the property is private. In the table, ${mine('store')} stays <code>private</code> because only the class uses it.`,
          ar: `الاسم ${mine('store')} بتاعك، بس في الصف هو <code>protected</code> مش <code>private</code>، عشان تمبلت الصف بيقراه. خليه <code>private</code> والتمبلت هيدّيك compile error بيقول إن الـ property دي private. وفي الجدول، ${mine('store')} بيفضل <code>private</code> عشان الكلاس بس اللي بيستخدمه.` }
      ]},
      { t: 'step', n: 'C', title: { en: 'Outside data: the sender picks the names', ar: 'الداتا اللي جاية من بره: اللي باعتها هو اللي بيختار الأسماء' }, blocks: [
        { t: 'p',
          en: `After ${ng('JSON')}<code>.parse</code>, every field name is whatever the server wrote. Your variable ${mine('tick')} is yours; <code>.symbol</code> and <code>.price</code> on it are not. You may <b>map</b> them into your own names (as <code>setPrice(tick.symbol, tick.price)</code> does), but you cannot rename them where you read them.`,
          ar: `بعد ${ng('JSON')}<code>.parse</code>، أي اسم field هو اللي السيرفر كتبه. المتغير ${mine('tick')} بتاعك؛ لكن <code>.symbol</code> و<code>.price</code> اللي عليه مش بتوعك. تقدر <b>تنقلهم</b> لأسماء بتاعتك (زي ما <code>setPrice(tick.symbol, tick.price)</code> بتعمل)، بس مينفعش تغيّر اسمهم في مكان ما بتقراهم.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: '<code>@Input</code> and <code>markForCheck()</code>: same idea, more names', ar: '<code>@Input</code> و<code>markForCheck()</code>: نفس الفكرة، أسماء أكتر' },
    lead: {
      en: 'Before signals, an <code>OnPush</code> component that changed a plain field from a callback had to ask to be checked, by name. You will meet this in older projects. The strategy line is identical.',
      ar: 'قبل الـ signals، أي component عليه <code>OnPush</code> بيغيّر field عادي من callback كان لازم يطلب إنه يتشيّك عليه، بالاسم. هتقابل ده في مشاريع أقدم. سطر الاستراتيجية زي ما هو.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'ticker-row.ts — older style', lang: 'ts', code: [
          '@Input({ required: true }) row!: Row;',
          'price = 0;',
          '',
          'constructor(private cdr: ChangeDetectorRef) {}',
          '',
          'showPrice(value: number) {',
          '  this.price = value;',
          '  this.cdr.markForCheck();   // “check me next time”',
          '}' ] },
        good: { name: 'ticker-row.ts — today', lang: 'ts', code: [
          'readonly row = input.required<Row>();',
          'readonly price = signal(0);',
          '',
          '',
          '',
          'showPrice(value: number) {',
          '  this.price.set(value);     // the write is the notice',
          '',
          '}' ] } },
      { t: 'p',
        en: `${ng('ChangeDetectorRef')} and ${ng('markForCheck')} are Angular’s. ${mine('cdr')} is yours; it is only the usual name. The input name ${pub('row')} and the type ${pub('Row')} did not change between the two versions, so the table’s template works with either.`,
        ar: `${ng('ChangeDetectorRef')} و${ng('markForCheck')} بتوع أنجولار. و${mine('cdr')} بتاعك؛ هو بس الاسم المعتاد. واسم الـ input ${pub('row')} والنوع ${pub('Row')} متغيروش بين النسختين، فتمبلت الجدول بيشتغل مع الاتنين.` }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, and says nothing', ar: 'مش بيعمل حاجة، ومش بيقول حاجة' },
    title: { en: 'Mistakes that fail silently', ar: 'غلطات بتفشل في صمت' },
    lead: {
      en: 'Change detection never throws because a screen is out of date. It simply does not know. Every mistake below compiles, runs, and shows an old value.',
      ar: 'الـ change detection عمره ما بيرمي error عشان الشاشة قديمة. هو ببساطة مايعرفش. كل غلطة تحت بتعدّي الـ compile، وبتشتغل، وبتعرض قيمة قديمة.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'Mutating the array instead of replacing it', ar: 'تعديل الـ array بدل ما تبدّلها' }, blocks: [
        { t: 'pair',
          bad:  { name: 'ticker-table.ts — mutate', lang: 'ts', code: [
            'addRow(code: string) {',
            '  this.rows.update(list => {',
            '    list.push({ id: Date.now(), symbol: code });',
            '    return list;              // the SAME array',
            '  });',
            '}' ] },
          good: { name: 'ticker-table.ts', lang: 'ts', code: [
            'addRow(code: string) {',
            '  this.rows.update(list => [...list, { id: Date.now(), symbol: code }]);',
            '}' ] } },
        { t: 'p', en: `A signal compares the new value with the old one. Same array in, same array out, so it decides nothing changed and tells nobody. ${ng('push')} is not wrong by itself; returning the same array is.`,
                  ar: `الـ signal بتقارن القيمة الجديدة بالقديمة. نفس الـ array داخلة ونفسها خارجة، فبتقرر إن مفيش حاجة اتغيرت ومبتقولش لحد. ${ng('push')} مش غلط في حد ذاته؛ الغلط إنك ترجّع نفس الـ array.` }
      ]},
      { t: 'step', n: '2', title: { en: 'A plain field changed from a callback', ar: 'field عادي بيتغير من callback' }, blocks: [
        { t: 'pair',
          bad:  { name: 'ticker-table.ts — plain field', lang: 'ts', code: [
            "lastUpdate = '';",
            '',
            'socket.onmessage = e => {',
            '  this.lastUpdate = new Date().toLocaleTimeString();',
            '};' ] },
          good: { name: 'ticker-table.ts — signal', lang: 'ts', code: [
            "readonly lastUpdate = signal('');",
            '',
            'socket.onmessage = e => {',
            '  this.lastUpdate.set(new Date().toLocaleTimeString());',
            '};' ] } },
        { t: 'p', en: 'The socket callback is not a template event, the field is not a signal, and the input did not change. An <code>OnPush</code> table has no reason to look at itself again, so the text stays old until something else happens to repaint the table, such as a click on its button. That is why it looks random. Without <code>OnPush</code> and with zone.js it would have happened to work, which is why this bug appears the day you add <code>OnPush</code>.',
                  ar: 'الـ callback بتاع الـ socket مش event في التمبلت، والـ field مش signal، والـ input متغيرش. الجدول اللي عليه <code>OnPush</code> ملوش سبب يبص على نفسه تاني، فالنص بيفضل قديم لحد ما حاجة تانية بالصدفة ترسم الجدول تاني، زي كليك على الزرار بتاعه. وعشان كده بيبان عشوائي. من غير <code>OnPush</code> ومع zone.js كان هيشتغل بالصدفة، وعشان كده الـ bug ده بيظهر يوم ما تضيف <code>OnPush</code>.' }
      ]},
      { t: 'step', n: '3', title: { en: 'Renaming the server’s field along with yours', ar: 'تغيير field السيرفر مع field بتاعك' }, blocks: [
        { t: 'pair',
          bad:  { name: 'ticker-table.ts — renamed too far', lang: 'ts', code: [
            'const tick = JSON.parse(e.data);',
            'this.store.setPrice(tick.ticker, tick.price);   // server still sends "symbol"' ] },
          good: { name: 'ticker-table.ts — the server’s names', lang: 'ts', code: [
            'const tick = JSON.parse(e.data);',
            'this.store.setPrice(tick.symbol, tick.price);' ] } },
        { t: 'p', en: 'You renamed the <code>Row</code> field with find-and-replace and it caught <code>tick.symbol</code> too. <code>JSON.parse</code> returns <code>any</code>, so TypeScript cannot object: <code>tick.ticker</code> is <code>undefined</code>, every price is stored under that, and no row ever updates.',
                  ar: 'غيّرت اسم الـ field في <code>Row</code> بـ find-and-replace ومسك معاه <code>tick.symbol</code>. <code>JSON.parse</code> بترجّع <code>any</code>، فـ TypeScript مايقدرش يعترض: <code>tick.ticker</code> بقى <code>undefined</code>، وكل سعر بيتخزن تحته، ومفيش صف بيتحدّث أبدًا.' }
      ]},
      { t: 'step', n: '4', title: { en: 'A store read that is not a signal', ar: 'قراية من الـ store مش signal' }, blocks: [
        { t: 'pair',
          bad:  { name: 'price-store.ts — plain map', lang: 'ts', code: [
            'private readonly prices = new Map<string, number>();',
            '',
            'priceOf(symbol: string) {',
            '  return this.prices.get(symbol) ?? 0;   // nothing to track',
            '}' ] },
          good: { name: 'price-store.ts', lang: 'ts', code: [
            'private readonly prices = new Map<string, WritableSignal<number>>();',
            '',
            'priceOf(symbol: string) {',
            '  return this.slot(symbol)();',
            '}' ] } },
        { t: 'p', en: `The template still calls ${pub('priceOf')}, and the first render looks fine. But the read touched no signal, so when the price changes there is nothing to connect it to the row. Through a method or not, an <code>OnPush</code> template only follows <b>signals</b> it reads.`,
                  ar: `التمبلت لسه بينادي ${pub('priceOf')}، وأول رسم بيبان سليم. بس القراية مالمستش أي signal، فلما السعر يتغير مفيش حاجة توصّله بالصف. سواء عن طريق ميثود أو لأ، تمبلت الـ <code>OnPush</code> بيتابع بس الـ <b>signals</b> اللي بيقراها.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When the screen lies', ar: 'لما الشاشة تكدب' },
    title: { en: 'Five questions, in this order', ar: 'خمس أسئلة، بالترتيب ده' },
    lead: {
      en: 'A value changed and the screen did not. Ask these before anything else.',
      ar: 'قيمة اتغيرت والشاشة لأ. اسأل الأسئلة دي قبل أي حاجة.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Does the template read the value through a signal, called with <code>()</code>, directly or inside a method like <code>priceOf()</code>?',
                  ar: '<b>1.</b> التمبلت بيقرا القيمة عن طريق signal، بالـ <code>()</code>، على طول أو جوه ميثود زي <code>priceOf()</code>؟' },
      { t: 'chk', en: '<b>2.</b> When you change it, do you call <code>set</code> or <code>update</code> with a <b>new</b> array or object, not the same one modified?',
                  ar: '<b>2.</b> لما بتغيّرها، بتنادي <code>set</code> أو <code>update</code> بـ array أو object <b>جديد</b>، مش نفس القديم بعد ما عدّلته؟' },
      { t: 'chk', en: '<b>3.</b> Is the change made to a plain field inside a callback (socket, timer, library)? Under <code>OnPush</code> that is invisible. Make it a signal.',
                  ar: '<b>3.</b> التغيير بيحصل في field عادي جوه callback (socket، تايمر، مكتبة)؟ تحت <code>OnPush</code> ده مش باين. خليه signal.' },
      { t: 'chk', en: '<b>4.</b> Are the names you read from outside data spelled exactly as the server sends them? Log the raw message once and compare.',
                  ar: '<b>4.</b> الأسماء اللي بتقراها من الداتا اللي جاية من بره مكتوبة بالظبط زي ما السيرفر بيبعتها؟ اطبع الرسالة الخام مرة وقارن.' },
      { t: 'chk', en: '<b>5.</b> Still stuck? Record a profile in Angular DevTools and look at which components were actually checked.',
                  ar: '<b>5.</b> لسه واقف؟ سجّل profile في Angular DevTools وبص أنهي components اتشيّك عليها فعلًا.' }
    ]
  }
  ]
};
