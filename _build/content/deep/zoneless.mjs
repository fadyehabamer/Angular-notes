/* ==================================================================
   Zoneless, name by name — a companion page after the zoneless topic.
   One running example (a clock) followed from main.ts to its test,
   with every name coloured by who owns it. Names list: inline.
   ================================================================== */

/* a name in running text, coloured like the code and linked on hover */
const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

export default {
  topic: 'zoneless',
  tab: 'Zoneless, name by name — The Angular Signal',
  title: { en: 'Zoneless, name by name', ar: 'Zoneless، اسم اسم' },
  say: {
    en: 'The page for when going zoneless feels like deleting something you do not understand. One clock followed from <code>main.ts</code> to its test, every name coloured by who owns it, and the quiet ways a screen freezes.',
    ar: 'الصفحة دي للي حاسس إن الـ zoneless معناه إنه بيمسح حاجة مش فاهمها. ساعة واحدة ماشيين وراها من <code>main.ts</code> لحد التست بتاعها، وكل اسم ملوّن حسب صاحبه، والطرق الهادية اللي الشاشة بتتجمد بيها.'
  },
  lead: {
    en: 'The idea is one sentence: <b>without zone.js, nobody guesses when to repaint; a signal write tells Angular directly.</b> The confusing part is the names. Going zoneless is mostly long Angular words you type once, one CLI key you empty, and a few names of your own that decide everything, because they are either signals or plain fields. This page separates them.',
    ar: 'الفكرة جملة واحدة: <b>من غير zone.js، محدش بيخمّن إمتى يرسم تاني؛ الكتابة في signal بتقول لأنجولار على طول.</b> اللي بيلخبط هو الأسماء. التحويل لـ zoneless أغلبه كلمات أنجولار طويلة بتكتبها مرة، ومفتاح CLI واحد بتفضّيه، وشوية أسماء بتاعتك هي اللي بتحدد كل حاجة، عشان يا إما signals يا إما fields عادية. الصفحة دي بتفصلهم عن بعض.'
  },

  names: {
    note: {
      en: 'Almost everything blue here is typed once and never touched again. The orange names are the ones two files share. The green ones are private, but look at what they <b>are</b>: a green signal keeps working zoneless, a green plain field freezes.',
      ar: 'تقريبًا كل حاجة زرقا هنا بتتكتب مرة ومحدش بيلمسها تاني. الأسماء البرتقاني هي اللي ملفين متشاركين فيها. الخضرا خاصة، بس بص هي <b>إيه</b>: الـ signal الخضرا بتفضل شغالة zoneless، والـ field العادي الأخضر بيتجمد.'
    },
    names: [
      /* --- shared: two files must agree --- */
      { n:'appConfig', k:'pub', w:{ en:'Your exported config. <code>main.ts</code> imports it by this name.', ar:'الـ config بتاعك المتصدّر. <code>main.ts</code> بيعمله import بالاسم ده.' } },
      { n:'App', k:'pub', w:{ en:'Your root component’s class, handed to <code>bootstrapApplication</code>.', ar:'كلاس الـ component الرئيسي بتاعك، بيتدّى لـ <code>bootstrapApplication</code>.' } },
      { n:'Clock', k:'pub', w:{ en:'The clock’s class: imported by <code>App</code> and by the test.', ar:'كلاس الساعة: <code>App</code> والتست بيعملوه import.' } },
      { n:'app-clock', k:'pub', w:{ en:'The clock’s selector: its <code>selector</code> string and the tag in <code>App</code> must match.', ar:'الـ selector بتاع الساعة: النص في <code>selector</code> والتاج في <code>App</code> لازم يبقوا زي بعض.' } },
      { n:'now', k:'pub', re:'(?<!Date\\.)(?<![\\w$-])now(?![\\w$-])', w:{ en:'The clock’s signal. Its template reads it and the test sets it, so three files type it.', ar:'الـ signal بتاعة الساعة. التمبلت بتاعها بيقراها والتست بيكتب فيها، فتلات ملفات بيكتبوها.' } },

      /* --- yours, private to one file --- */
      { n:'id', k:'mine', w:{ en:'A local variable holding the timer’s id, so it can be cleared.', ar:'متغير محلي شايل رقم التايمر، عشان يتلغي بعدين.' } },
      { n:'fixture', k:'mine', w:{ en:'The test’s variable for the created component. <code>fixture</code> is only the usual name.', ar:'متغير التست للـ component اللي اتعمل. <code>fixture</code> مجرد الاسم المعتاد.' } },
      { n:'zone', k:'mine', w:{ en:'Your field for the injected <code>NgZone</code> in older code.', ar:'الـ field بتاعك للـ <code>NgZone</code> اللي اتعمله inject في الكود القديم.' } },
      { n:'city', k:'mine', w:{ en:'A field the clock shows. Signal or plain field: that is the whole difference.', ar:'field الساعة بتعرضه. signal ولا field عادي: ده الفرق كله.' } },
      { n:'res', k:'mine', w:{ en:'A local variable holding the fetch response.', ar:'متغير محلي شايل رد الـ fetch.' } },

      /* --- Angular's, the CLI's, the browser's, the test runner's --- */
      { n:'bootstrapApplication', k:'ng', w:{ en:'Angular’s function that starts the app.', ar:'الـ function بتاعة أنجولار اللي بتشغّل التطبيق.' } },
      { n:'ApplicationConfig', k:'ng', w:{ en:'Angular’s type for the startup config.', ar:'نوع أنجولار لإعدادات التشغيل.' } },
      { n:'providers', k:'ng', w:{ en:'An option key Angular reads: the list of providers.', ar:'مفتاح إعداد أنجولار بيقراه: ليستة الـ providers.' } },
      { n:'provideZonelessChangeDetection', k:'ng', w:{ en:'Angular’s provider that turns zone-based change detection off (v20+ name).', ar:'الـ provider بتاع أنجولار اللي بيقفل الـ change detection المعتمد على الـ zone (اسم v20 وبعده).' } },
      { n:'provideExperimentalZonelessChangeDetection', k:'ng', w:{ en:'The same provider’s name in v18 and v19.', ar:'اسم نفس الـ provider في v18 وv19.' } },
      { n:'provideZoneChangeDetection', k:'ng', w:{ en:'Angular’s provider for the classic zone.js mode, with options.', ar:'الـ provider بتاع أنجولار للطريقة القديمة بـ zone.js، مع إعدادات.' } },
      { n:'eventCoalescing', k:'ng', w:{ en:'An option key Angular reads: group events from one moment into one check.', ar:'مفتاح إعداد أنجولار بيقراه: لمّ الـ events اللي في نفس اللحظة في تشييك واحد.' } },
      { n:'polyfills', k:'ng', w:{ en:'A key the Angular CLI reads in <code>angular.json</code>.', ar:'مفتاح الـ Angular CLI بيقراه في <code>angular.json</code>.' } },
      { n:'browser', k:'ng', w:{ en:'A CLI key: the app’s entry file.', ar:'مفتاح CLI: ملف الدخول بتاع التطبيق.' } },
      { n:'zone.js', k:'ng', w:{ en:'The zone.js package name. Zoneless means this entry goes away.', ar:'اسم باكدج zone.js. الـ zoneless معناه إن السطر ده يتشال.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator.', ar:'الـ decorator بتاع أنجولار.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The string after it is yours.', ar:'مفتاح إعداد. النص اللي بعده بتاعك.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key. The path after it points at your file.', ar:'مفتاح إعداد. المسار اللي بعده بيشاور على ملفك.' } },
      { n:'template', k:'ng', w:{ en:'An option key: an inline template.', ar:'مفتاح إعداد: تمبلت مكتوب جوه الكلاس.' } },
      { n:'imports', k:'ng', w:{ en:'An option key: what this template uses.', ar:'مفتاح إعداد: اللي التمبلت ده بيستخدمه.' } },
      { n:'DatePipe', k:'ng', w:{ en:'Angular’s date pipe class, imported so the template can use <code>date</code>.', ar:'كلاس الـ pipe بتاع التاريخ من أنجولار، بيتعمله import عشان التمبلت يستخدم <code>date</code>.' } },
      { n:'date', k:'ng', re:'(?<=\\| )date(?![\\w$-])', w:{ en:'The pipe’s name in a template. The format letters after it are Angular’s too.', ar:'اسم الـ pipe في التمبلت. وحروف الشكل اللي بعده بتاعة أنجولار برضه.' } },
      { n:'signal', k:'ng', w:{ en:'Angular’s writable signal. Writing it is what tells Angular to repaint.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب. الكتابة فيها هي اللي بتقول لأنجولار يرسم تاني.' } },
      { n:'set', k:'ng', w:{ en:'A signal method.', ar:'ميثود بتاعة الـ signal.' } },
      { n:'inject', k:'ng', w:{ en:'Angular’s function that hands you a service.', ar:'الـ function بتاعة أنجولار اللي بتديك سيرفس.' } },
      { n:'DestroyRef', k:'ng', w:{ en:'Angular’s handle on “this component is being destroyed”.', ar:'الـ handle بتاع أنجولار لـ «الـ component ده بيتشال».' } },
      { n:'onDestroy', k:'ng', w:{ en:'A <code>DestroyRef</code> method: run this cleanup at the end.', ar:'ميثود في <code>DestroyRef</code>: شغّل التنضيف ده في الآخر.' } },
      { n:'setInterval', k:'ng', w:{ en:'The browser’s timer.', ar:'التايمر بتاع المتصفح.' } },
      { n:'clearInterval', k:'ng', w:{ en:'The browser’s function that stops a timer.', ar:'function المتصفح اللي بتوقف تايمر.' } },
      { n:'Date', k:'ng', w:{ en:'JavaScript’s date class.', ar:'كلاس التاريخ بتاع JavaScript.' } },
      { n:'fetch', k:'ng', w:{ en:'The browser’s function for a network request.', ar:'function المتصفح لطلب من الشبكة.' } },
      { n:'text', k:'ng', w:{ en:'A method on the fetch response: read the body as text.', ar:'ميثود في رد الـ fetch: اقرا الـ body كنص.' } },
      { n:'ngOnInit', k:'ng', w:{ en:'Angular’s lifecycle hook name.', ar:'اسم الـ lifecycle hook بتاع أنجولار.' } },
      { n:'NgZone', k:'ng', w:{ en:'Angular’s zone.js service. Zoneless code does not need it.', ar:'سيرفس zone.js من أنجولار. الكود الـ zoneless مش محتاجه.' } },
      { n:'run', k:'ng', w:{ en:'An <code>NgZone</code> method: run this inside Angular’s zone.', ar:'ميثود في <code>NgZone</code>: شغّل ده جوه الـ zone بتاعة أنجولار.' } },
      { n:'runOutsideAngular', k:'ng', w:{ en:'An <code>NgZone</code> method: run this where the zone does not watch.', ar:'ميثود في <code>NgZone</code>: شغّل ده في حتة الـ zone مش بيراقبها.' } },
      { n:'TestBed', k:'ng', w:{ en:'Angular’s testing setup.', ar:'تجهيز التستات بتاع أنجولار.' } },
      { n:'configureTestingModule', k:'ng', w:{ en:'A <code>TestBed</code> method: providers for this test.', ar:'ميثود في <code>TestBed</code>: الـ providers بتوع التست ده.' } },
      { n:'createComponent', k:'ng', w:{ en:'A <code>TestBed</code> method: build the component.', ar:'ميثود في <code>TestBed</code>: ابني الـ component.' } },
      { n:'componentInstance', k:'ng', w:{ en:'The fixture’s field: your class instance.', ar:'field في الـ fixture: النسخة من الكلاس بتاعك.' } },
      { n:'whenStable', k:'ng', w:{ en:'A fixture method: wait until Angular has finished its pending work, including a scheduled repaint.', ar:'ميثود في الـ fixture: استنى لحد ما أنجولار يخلّص الشغل المعلّق، ومنه الرسم المتجدول.' } },
      { n:'nativeElement', k:'ng', w:{ en:'The fixture’s field: the real DOM element.', ar:'field في الـ fixture: عنصر الـ DOM الحقيقي.' } },
      { n:'textContent', k:'ng', w:{ en:'The DOM’s property: all the text inside.', ar:'property الـ DOM: كل النص اللي جوه.' } },
      { n:'describe', k:'ng', w:{ en:'The test runner’s function for a group of tests.', ar:'function الـ test runner لمجموعة تستات.' } },
      { n:'it', k:'ng', re:'(?<![\\w$.-])it(?=\\()', w:{ en:'The test runner’s function for one test.', ar:'function الـ test runner لتست واحد.' } },
      { n:'expect', k:'ng', w:{ en:'The test runner’s assertion.', ar:'الـ assertion بتاع الـ test runner.' } },
      { n:'toContain', k:'ng', w:{ en:'A test runner matcher.', ar:'matcher من الـ test runner.' } },
      { n:'fakeAsync', k:'ng', w:{ en:'Angular’s zone-based test helper. It needs zone.js.', ar:'helper تستات من أنجولار معتمد على الـ zone. محتاج zone.js.' } },
      { n:'tick', k:'ng', w:{ en:'The partner of <code>fakeAsync</code>. Also needs zone.js.', ar:'شريك <code>fakeAsync</code>. محتاج zone.js برضه.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One second passes, five stops', ar: 'ثانية بتعدّي، خمس محطات' },
    lead: {
      en: 'A clock that shows the time and ticks every second, in an app with no zone.js at all. Who tells Angular that the time changed? Follow it from the start of the app to the screen:',
      ar: 'ساعة بتعرض الوقت وبتتقدم كل ثانية، في تطبيق مفيهوش zone.js خالص. مين بيقول لأنجولار إن الوقت اتغير؟ امشي وراها من أول التطبيق لحد الشاشة:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'main.ts', lang: 'ts', who: { en: 'the start', ar: 'البداية' },
          code: ['bootstrapApplication(App, appConfig)'],
          say: { en: `${ng('bootstrapApplication')} is Angular’s. ${pub('App')} and ${pub('appConfig')} are yours, imported from other files, so each is typed in two places.`,
                 ar: `${ng('bootstrapApplication')} بتاعة أنجولار. و${pub('App')} و${pub('appConfig')} بتوعك، جايين import من ملفات تانية، فكل واحد مكتوب في مكانين.` } },
        { file: 'app.config.ts', lang: 'ts', who: { en: 'the switch', ar: 'السويتش' },
          code: ['providers: [provideZonelessChangeDetection()],'],
          say: { en: `The one line that makes the app zoneless. ${ng('provideZonelessChangeDetection')} is Angular’s, spelled exactly like this from v20 on. You add it once and never think about it again.`,
                 ar: `السطر الوحيد اللي بيخلي التطبيق zoneless. ${ng('provideZonelessChangeDetection')} بتاعة أنجولار، ومكتوبة كده بالظبط من v20 وطالع. بتضيفها مرة ومش بتفكر فيها تاني.` } },
        { file: 'angular.json', lang: 'json', who: { en: 'the build', ar: 'الـ build' },
          code: ['"polyfills": []'],
          say: { en: `${ng('polyfills')} is the CLI’s key. Taking ${ng('zone.js')} out of this list is what removes the library from your bundle. The provider and this list go together.`,
                 ar: `${ng('polyfills')} مفتاح الـ CLI. إنك تشيل ${ng('zone.js')} من الليستة دي هو اللي بيشيل المكتبة من الـ bundle بتاعك. الـ provider والليستة دي بيمشوا مع بعض.` } },
        { file: 'clock.ts', lang: 'ts', who: { en: 'the write', ar: 'الكتابة' },
          code: ['const id = setInterval(() => this.now.set(new Date()), 1000);'],
          say: { en: `${ng('setInterval')} is the browser’s. ${mine('id')} is a local name you picked. ${pub('now')} is your signal, and ${ng('set')} is Angular’s. <b>That <code>set</code> is the notification.</b> The timer itself tells Angular nothing.`,
                 ar: `${ng('setInterval')} بتاع المتصفح. و${mine('id')} اسم محلي انت اخترته. و${pub('now')} الـ signal بتاعتك، و${ng('set')} بتاعة أنجولار. <b>الـ <code>set</code> دي هي التبليغ.</b> التايمر نفسه مبيقولش لأنجولار حاجة.` } },
        { file: 'clock.html', lang: 'html', who: { en: 'the read', ar: 'القراية' },
          code: ["<time>{{ now() | date: 'HH:mm:ss' }}</time>"],
          say: { en: `The template reads ${pub('now')}, so Angular knows this clock depends on it and repaints it after every ${ng('set')}. ${ng('date')} and the letters <code>HH:mm:ss</code> are Angular’s date pipe and its format.`,
                 ar: `التمبلت بيقرا ${pub('now')}، فأنجولار عارف إن الساعة دي معتمدة عليها وبيرسمها تاني بعد كل ${ng('set')}. و${ng('date')} والحروف <code>HH:mm:ss</code> هما الـ date pipe بتاع أنجولار والشكل بتاعه.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'Provider in, polyfill out, and every value on screen lives in a signal: <code>now.set(new Date())</code> in the class, <code>now()</code> in the template. The only names files share are <b>appConfig</b>, <b>App</b>, <b>Clock</b>, <b>app-clock</b> and <b>now</b>.',
        ar: 'الـ provider يدخل، والـ polyfill يطلع، وكل قيمة على الشاشة عايشة في signal: <code>now.set(new Date())</code> في الكلاس، و<code>now()</code> في التمبلت. الأسماء الوحيدة اللي الملفات متشاركة فيها هي <b>appConfig</b> و<b>App</b> و<b>Clock</b> و<b>app-clock</b> و<b>now</b>.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Which file?', ar: 'أنهي ملف؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'Zoneless is spread over config files you rarely open and components you open every day. Each piece has one home.',
      ar: 'الـ zoneless متوزع على ملفات إعدادات نادرًا ما بتفتحها وcomponents بتفتحها كل يوم. كل حتة ليها بيت واحد.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>provideZonelessChangeDetection()</code>', '<code>app.config.ts</code>', 'you, once for the whole app', 'Angular'],
            ar: ['<code>provideZonelessChangeDetection()</code>', '<code>app.config.ts</code>', 'انت، مرة واحدة للتطبيق كله', 'أنجولار'] },
          { en: ['<code>"polyfills": []</code>', '<code>angular.json</code>', 'you, once', 'the Angular CLI'],
            ar: ['<code>"polyfills": []</code>', '<code>angular.json</code>', 'انت، مرة واحدة', 'الـ Angular CLI'] },
          { en: ['<code>export const appConfig</code>', '<code>app.config.ts</code>', 'you', `you pick ${pub('appConfig')}; <code>main.ts</code> must copy it`],
            ar: ['<code>export const appConfig</code>', '<code>app.config.ts</code>', 'انت', `انت بتختار ${pub('appConfig')}؛ و<code>main.ts</code> لازم ينسخه`] },
          { en: ['<code>readonly now = signal(new Date())</code>', '<code>clock.ts</code>', 'the clock', `you pick ${pub('now')}; ${ng('signal')} is Angular’s`],
            ar: ['<code>readonly now = signal(new Date())</code>', '<code>clock.ts</code>', 'الساعة', `انت بتختار ${pub('now')}؛ و${ng('signal')} بتاعة أنجولار`] },
          { en: ['<code>{{ now() | date: … }}</code>', '<code>clock.html</code>', 'the clock', `${pub('now')} must copy the class; ${ng('date')} is Angular’s`],
            ar: ['<code>{{ now() | date: … }}</code>', '<code>clock.html</code>', 'الساعة', `${pub('now')} لازم ينسخ الكلاس؛ و${ng('date')} بتاع أنجولار`] },
          { en: ['<code>await fixture.whenStable()</code>', '<code>clock.spec.ts</code>', 'the test', `you pick ${mine('fixture')}; ${ng('whenStable')} is Angular’s`],
            ar: ['<code>await fixture.whenStable()</code>', '<code>clock.spec.ts</code>', 'التست', `انت بتختار ${mine('fixture')}؛ و${ng('whenStable')} بتاعة أنجولار`] },
        ] },
      { t: 'ul',
        en: ['<b>The switch is app-wide; the risk is per component.</b> You flip zoneless in one config file, but each component decides for itself whether it keeps working, by how it holds its state.',
             '<b>Only a few things schedule a repaint now:</b> writing a signal a template reads, an event bound in a template, <code>markForCheck()</code> (the <code>async</code> pipe calls it for you), and a few Angular APIs like <code>setInput</code>. A timer, a <code>fetch</code> or an <code>await</code> on its own is not one of them.',
             '<b>The names of your fields do not matter; their kind does.</b> <code>now</code> as a signal works. <code>now</code> as a plain field freezes. Same name.'],
        ar: ['<b>السويتش للتطبيق كله؛ والخطر لكل component لوحده.</b> بتقلب الـ zoneless في ملف إعدادات واحد، بس كل component بيقرر لنفسه هيفضل شغال ولا لأ، حسب هو شايل الحالة بتاعته إزاي.',
             '<b>حاجات قليلة بس هي اللي بتجدول الرسم دلوقتي:</b> الكتابة في signal التمبلت بيقراها، وevent متربوط في التمبلت، و<code>markForCheck()</code> (والـ <code>async</code> pipe بيناديها بدالك)، وشوية APIs من أنجولار زي <code>setInput</code>. التايمر أو الـ <code>fetch</code> أو الـ <code>await</code> لوحدهم مش منهم.',
             '<b>أسماء الـ fields بتاعتك مش فارقة؛ نوعها هو اللي فارق.</b> <code>now</code> كـ signal بتشتغل. و<code>now</code> كـ field عادي بيتجمد. نفس الاسم.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All the files, every name coloured', ar: 'كل الملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same example, complete, including its test. Hover a coloured name to light up everywhere else it appears. Then press <b>Rename test</b>: every name you own becomes a made-up word, and the long Angular words do not move.',
      ar: 'نفس المثال، كامل، ومعاه التست بتاعه. قف بالماوس على أي اسم ملوّن وهتنوّر كل الأماكن التانية اللي هو فيها. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: كل اسم بتاعك هيبقى كلمة عشوائية، وكلمات أنجولار الطويلة مش هتتحرك.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'main.ts', lang: 'ts', tag: { en: 'the start', ar: 'البداية' }, code: [
        "import { bootstrapApplication } from '@angular/platform-browser';",
        "import { App } from './app/app';",
        "import { appConfig } from './app/app.config';",
        '',
        'bootstrapApplication(App, appConfig).catch(err => console.error(err));' ] },
      { t: 'code', name: 'app.config.ts', lang: 'ts', tag: { en: 'the switch', ar: 'السويتش' }, code: [
        "import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';",
        '',
        'export const appConfig: ApplicationConfig = {',
        '  providers: [',
        '    provideZonelessChangeDetection(),',
        '    // your other providers: router, http, …',
        '  ],',
        '};' ] },
      { t: 'code', name: 'angular.json', lang: 'json', tag: { en: 'an excerpt', ar: 'جزء منه' }, code: [
        '"build": {',
        '  "options": {',
        '    "browser": "src/main.ts",',
        '    "polyfills": []',
        '  }',
        '}' ] },
      { t: 'code', name: 'app.ts', lang: 'ts', tag: { en: 'the root', ar: 'الجذر' }, code: [
        "import { Component } from '@angular/core';",
        "import { Clock } from './clock';",
        '',
        '@Component({',
        "  selector: 'app-root',",
        '  imports: [Clock],',
        "  template: '<app-clock />',",
        '})',
        'export class App {}' ] },
      { t: 'code', name: 'clock.ts', lang: 'ts', tag: { en: 'works zoneless', ar: 'شغالة zoneless' }, code: [
        "import { DatePipe } from '@angular/common';",
        "import { Component, DestroyRef, inject, signal } from '@angular/core';",
        '',
        '@Component({',
        "  selector: 'app-clock',",
        '  imports: [DatePipe],',
        "  templateUrl: './clock.html',",
        '})',
        'export class Clock {',
        '  readonly now = signal(new Date());',
        '',
        '  constructor() {',
        '    const id = setInterval(() => this.now.set(new Date()), 1000);',
        '    inject(DestroyRef).onDestroy(() => clearInterval(id));',
        '  }',
        '}' ] },
      { t: 'code', name: 'clock.html', lang: 'html', tag: { en: 'the read', ar: 'القراية' }, code: [
        "<time>{{ now() | date: 'HH:mm:ss' }}</time>" ] },
      { t: 'code', name: 'clock.spec.ts', lang: 'ts', tag: { en: 'the test', ar: 'التست' }, code: [
        "import { provideZonelessChangeDetection } from '@angular/core';",
        "import { TestBed } from '@angular/core/testing';",
        "import { Clock } from './clock';",
        '',
        "describe('Clock', () => {",
        "  it('shows the time', async () => {",
        '    TestBed.configureTestingModule({',
        '      providers: [provideZonelessChangeDetection()],',
        '    });',
        '    const fixture = TestBed.createComponent(Clock);',
        '    fixture.componentInstance.now.set(new Date(2025, 0, 1, 9, 30, 0));',
        '    await fixture.whenStable();',
        "    expect(fixture.nativeElement.textContent).toContain('09:30:00');",
        '  });',
        '});' ] },
      { t: 'nmtable' }
    ]
  },

  /* ------------------------------------------------------------ 4 */
  {
    id: 'rename',
    kicker: { en: 'Is it OK to change it?', ar: 'ينفع أغيّره؟' },
    title: { en: 'What breaks when you rename each name', ar: 'إيه اللي بيبوظ لما تغيّر كل اسم' },
    lead: {
      en: 'Your own names are all caught by the compiler. The trouble here is not renaming; it is <b>changing what a name is</b>, from a signal to a plain field, or getting only one half of the switch.',
      ar: 'الأسماء بتاعتك كلها الـ compiler بيمسكها. المشكلة هنا مش في تغيير الاسم؛ المشكلة في <b>إنك تغيّر الاسم ده إيه</b>، من signal لـ field عادي، أو إنك تعمل نص السويتش بس.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename or change…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [pub('appConfig'), 'the import and the call in <code>main.ts</code>', 'Compile error on the import.'],
            ar: [pub('appConfig'), 'الـ import والنداء في <code>main.ts</code>', 'Compile error في الـ import.'] },
          { en: [pub('now') + ' (the name)', 'the template’s <code>now()</code> and the test’s <code>.now.set</code>', 'Compile error in the template or the test.'],
            ar: [pub('now') + ' (الاسم)', '<code>now()</code> في التمبلت و<code>.now.set</code> في التست', 'Compile error في التمبلت أو التست.'] },
          { en: [pub('now') + ' from a signal to a plain field', 'every read and write', '<b>If you fix every compile error the “easy” way (drop the <code>()</code>, assign with <code>=</code>), it compiles and the clock freezes.</b> See the last section.'],
            ar: [pub('now') + ' من signal لـ field عادي', 'كل قراية وكل كتابة', '<b>لو صلّحت كل compile error بالطريقة «السهلة» (تشيل الـ <code>()</code> وتكتب بـ <code>=</code>)، هيعدّي الـ compile والساعة هتتجمد.</b> شوف آخر جزء.'] },
          { en: [pub('Clock') + ', ' + pub('app-clock'), 'the import and <code>imports</code> in <code>App</code>, the tag, the test’s import', 'Compile error: unknown import or “is not a known element”.'],
            ar: [pub('Clock') + '، ' + pub('app-clock'), 'الـ import و<code>imports</code> في <code>App</code>، والتاج، والـ import في التست', 'Compile error: import مش معروف أو «is not a known element».'] },
          { en: [mine('id') + ', ' + mine('fixture'), 'only the lines in that one function', 'Compile error inside it.'],
            ar: [mine('id') + '، ' + mine('fixture'), 'السطور اللي جوه الـ function دي بس', 'Compile error جواها.'] },
          { en: ['remove the provider, keep zone.js out', 'put one of them back', 'A runtime error at startup: without the provider, Angular expects zone.js to be loaded.'],
            ar: ['شلت الـ provider، وسبت zone.js بره', 'رجّع واحد فيهم', 'Runtime error أول ما التطبيق يبدأ: من غير الـ provider، أنجولار متوقع إن zone.js متحمّل.'] },
          { en: ['add the provider, keep zone.js in', 'remove it from <code>polyfills</code>', 'It works, but the bundle still carries zone.js for nothing. Angular may warn about this in the console during development.'],
            ar: ['ضفت الـ provider، وسبت zone.js جوه', 'شيله من <code>polyfills</code>', 'بيشتغل، بس الـ bundle لسه شايل zone.js على الفاضي. وأنجولار ممكن ينبّهك في الكونسول وانت بتطوّر.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b> above the files. <code>now</code> changes in the class, the template and the test together; <code>provideZonelessChangeDetection</code>, <code>polyfills</code> and <code>whenStable</code> stay exactly as they are.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b> فوق الملفات. <code>now</code> بيتغير في الكلاس والتمبلت والتست مع بعض؛ و<code>provideZonelessChangeDetection</code> و<code>polyfills</code> و<code>whenStable</code> بيفضلوا زي ما هما بالظبط.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتوعك' },
    title: { en: 'The long words, and who owns them', ar: 'الكلمات الطويلة، ومين صاحبها' },
    lead: {
      en: 'Zoneless has the longest names in Angular, and four different owners. You type each one exactly, or copy it.',
      ar: 'الـ zoneless فيه أطول أسماء في أنجولار، وليهم أربع أصحاب مختلفين. بتكتب كل واحد بالظبط، أو بتنسخه.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Word', 'Whose', 'What it is'], ar: ['الكلمة', 'بتاعة مين', 'هي إيه'] },
        rows: [
          { en: [ng('provideZonelessChangeDetection'), 'Angular', 'The switch. Goes in <code>providers</code>, in the app config and in tests.'],
            ar: [ng('provideZonelessChangeDetection'), 'أنجولار', 'السويتش. بيتحط في <code>providers</code>، في إعدادات التطبيق وفي التستات.'] },
          { en: [`${ng('provideZoneChangeDetection')}, ${ng('eventCoalescing')}`, 'Angular', 'The zone.js mode with an option. A halfway step, not zoneless.'],
            ar: [`${ng('provideZoneChangeDetection')} و${ng('eventCoalescing')}`, 'أنجولار', 'طريقة zone.js مع إعداد. خطوة في النص، مش zoneless.'] },
          { en: [`${ng('NgZone')}, ${ng('run')}, ${ng('runOutsideAngular')}`, 'Angular', 'The zone service. Still exists zoneless, but running code “inside” or “outside” no longer changes anything.'],
            ar: [`${ng('NgZone')} و${ng('run')} و${ng('runOutsideAngular')}`, 'أنجولار', 'سيرفس الـ zone. لسه موجود في الـ zoneless، بس تشغيل الكود «جوه» أو «بره» مبقاش بيغيّر حاجة.'] },
          { en: [`${ng('polyfills')}, ${ng('browser')}`, 'the Angular CLI', 'Keys in <code>angular.json</code>.'],
            ar: [`${ng('polyfills')} و${ng('browser')}`, 'الـ Angular CLI', 'مفاتيح في <code>angular.json</code>.'] },
          { en: [ng('zone.js'), 'the zone.js package', 'The library’s npm name. It is the thing being removed.'],
            ar: [ng('zone.js'), 'باكدج zone.js', 'اسم المكتبة على npm. هي الحاجة اللي بتتشال.'] },
          { en: [`${ng('setInterval')}, ${ng('fetch')}`, 'the browser', 'Async APIs. zone.js used to watch them; now nobody does.'],
            ar: [`${ng('setInterval')} و${ng('fetch')}`, 'المتصفح', 'APIs async. zone.js كان بيراقبهم؛ دلوقتي محدش بيراقبهم.'] },
          { en: [`${ng('whenStable')}; ${ng('fakeAsync')}, ${ng('tick')}`, 'Angular’s testing', 'The first works zoneless. The other two need zone.js.'],
            ar: [`${ng('whenStable')}؛ و${ng('fakeAsync')} و${ng('tick')}`, 'تستات أنجولار', 'الأولانية شغالة zoneless. والاتنين التانيين محتاجين zone.js.'] },
          { en: [`${ng('describe')}, ${ng('it')}, ${ng('expect')}`, 'the test runner', 'Jasmine or Vitest. Not Angular at all.'],
            ar: [`${ng('describe')} و${ng('it')} و${ng('expect')}`, 'الـ test runner', 'Jasmine أو Vitest. مش أنجولار خالص.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'Nothing here is required. One habit, though, turns the most common zoneless bug into a compile error.',
      ar: 'مفيش حاجة هنا إجبارية. بس فيه عادة واحدة بتقلب أشهر bug في الـ zoneless لـ compile error.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['state on screen', '<code>readonly now = signal(…)</code>', '<code>now = new Date()</code>', '<b>A real safety net.</b> With <code>readonly</code>, writing <code>this.now = …</code> by mistake is a compile error instead of a frozen screen.'],
            ar: ['حالة على الشاشة', '<code>readonly now = signal(…)</code>', '<code>now = new Date()</code>', '<b>شبكة أمان حقيقية.</b> مع <code>readonly</code>، لو كتبت <code>this.now = …</code> غلط هتاخد compile error بدل شاشة متجمدة.'] },
          { en: ['the config export', '<code>appConfig</code>', '—', 'What the CLI generates. Keep it, so every tutorial matches your project.'],
            ar: ['الـ config المتصدّر', '<code>appConfig</code>', '—', 'ده اللي الـ CLI بيعمله. سيبه، عشان أي شرح يطابق مشروعك.'] },
          { en: ['a timer id', '<code>id</code>, <code>timer</code>', '—', 'A local name. Anything short works.'],
            ar: ['رقم تايمر', '<code>id</code>، <code>timer</code>', '—', 'اسم محلي. أي حاجة قصيرة تنفع.'] },
          { en: ['the test’s component handle', '<code>fixture</code>', '—', 'Pure habit, but so universal that readers look for it.'],
            ar: ['الـ handle بتاع الـ component في التست', '<code>fixture</code>', '—', 'عادة وبس، بس منتشرة لدرجة إن اللي بيقرا بيدوّر عليها.'] },
          { en: ['an injected <code>NgZone</code> (old code)', '<code>zone</code>, <code>ngZone</code>', '—', 'If you are going zoneless, the better name is none: delete the field.'],
            ar: ['<code>NgZone</code> متعمله inject (كود قديم)', '<code>zone</code>، <code>ngZone</code>', '—', 'لو رايح zoneless، أحسن اسم إنه ميبقاش موجود: امسح الـ field.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Where the name is not up to you', ar: 'فين الاسم مش بمزاجك' },
    lead: {
      en: 'These look like choices, but a version, a tool or a format decides them.',
      ar: 'دول شكلهم اختيارات، بس الإصدار أو الأداة أو الشكل هو اللي بيحددهم.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'Your Angular version picks the provider’s name', ar: 'إصدار أنجولار بتاعك هو اللي بيختار اسم الـ provider' }, blocks: [
        { t: 'pair',
          bad:  { name: 'app.config.ts — v18 and v19', lang: 'ts', code: [
            'providers: [provideExperimentalZonelessChangeDetection()],' ] },
          good: { name: 'app.config.ts — v20 and later', lang: 'ts', code: [
            'providers: [provideZonelessChangeDetection()],' ] } },
        { t: 'p',
          en: `Same feature, two names. Copy the one your version exports; the wrong one is simply not there, so it is a compile error, not a silent bug. The “avoid” side is only wrong on v20+. Recent CLI versions may set this up for new projects already, so look before you add it.`,
          ar: `نفس الميزة، باسمين. انسخ اللي الإصدار بتاعك بيصدّره؛ الغلط ببساطة مش موجود، فده compile error، مش bug صامت. ناحية «تجنّب» غلط بس في v20 وبعده. والإصدارات الجديدة من الـ CLI ممكن تكون ظبطت ده لمشروعك الجديد أصلًا، فبص قبل ما تضيفه.` }
      ]},
      { t: 'step', n: 'B', title: { en: 'The CLI picks the keys and the file suffix', ar: 'الـ CLI هو اللي بيختار المفاتيح ولاحقة الملف' }, blocks: [
        { t: 'pair',
          bad:  { name: 'angular.json — with zone.js', lang: 'json', code: [
            '"polyfills": ["zone.js"]' ] },
          good: { name: 'angular.json — zoneless', lang: 'json', code: [
            '"polyfills": []' ] } },
        { t: 'p',
          en: `${ng('polyfills')}, ${ng('browser')}, <code>options</code> and <code>build</code> are keys the CLI reads; you only change their values. In projects created before v15 the zone import lived in <code>src/polyfills.ts</code> as <code>import 'zone.js';</code>, so that is the line to delete there. And <code>clock.spec.ts</code> ends in <code>.spec.ts</code> because, by default, that is how the CLI’s test builder finds test files.`,
          ar: `${ng('polyfills')} و${ng('browser')} و<code>options</code> و<code>build</code> مفاتيح الـ CLI بيقراها؛ انت بتغيّر القيم بس. وفي المشاريع اللي اتعملت قبل v15 الـ import بتاع الـ zone كان في <code>src/polyfills.ts</code> كـ <code>import 'zone.js';</code>، فده السطر اللي تمسحه هناك. و<code>clock.spec.ts</code> بيخلص بـ <code>.spec.ts</code> عشان، افتراضيًا، دي الطريقة اللي الـ test builder بتاع الـ CLI بيلاقي بيها ملفات التست.` }
      ]},
      { t: 'step', n: 'C', title: { en: 'The date pipe picks the format letters', ar: 'الـ date pipe هو اللي بيختار حروف الشكل' }, blocks: [
        { t: 'p',
          en: `In <code>'HH:mm:ss'</code> every letter is Angular’s, and case matters: <code>HH</code> is the 24-hour hour, <code>hh</code> the 12-hour one, <code>mm</code> is minutes and <code>MM</code> is the <b>month</b>. A wrong letter is not an error; it just shows a different number.`,
          ar: `في <code>'HH:mm:ss'</code> كل حرف بتاع أنجولار، والكابيتال فارق: <code>HH</code> الساعة بنظام 24، و<code>hh</code> بنظام 12، و<code>mm</code> الدقايق و<code>MM</code> هو <b>الشهر</b>. الحرف الغلط مش error؛ هو بس بيعرض رقم تاني.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: '<code>NgZone.run()</code>: names you can now delete', ar: '<code>NgZone.run()</code>: أسماء تقدر تمسحها دلوقتي' },
    lead: {
      en: 'With zone.js, performance-minded code ran timers outside the zone and stepped back in to update the screen. You will meet this pattern in older projects. Zoneless, every zone name in it goes away.',
      ar: 'مع zone.js، الكود اللي مهتم بالأداء كان بيشغّل التايمرات بره الـ zone ويرجع جوه عشان يحدّث الشاشة. هتقابل الأسلوب ده في مشاريع أقدم. في الـ zoneless، كل أسماء الـ zone اللي فيه بتمشي.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'clock.ts — older style', lang: 'ts', code: [
          'now = new Date();',
          '',
          'constructor(private zone: NgZone) {',
          '  this.zone.runOutsideAngular(() => {',
          '    setInterval(() => {',
          '      this.zone.run(() => this.now = new Date());',
          '    }, 1000);',
          '  });',
          '}' ] },
        good: { name: 'clock.ts — today', lang: 'ts', code: [
          'readonly now = signal(new Date());',
          '',
          'constructor() {',
          '  const id = setInterval(() => this.now.set(new Date()), 1000);',
          '  inject(DestroyRef).onDestroy(() => clearInterval(id));',
          '}' ] } },
      { t: 'p',
        en: `${ng('NgZone')}, ${ng('runOutsideAngular')} and ${ng('run')} are Angular’s; ${mine('zone')} was your field name for it. Zoneless, the old version still compiles but <code>run</code> no longer makes anything repaint, and <code>now</code> is a plain field, so the clock freezes. Moving to a signal fixes that, and the zone names can simply be deleted. The halfway step, <code>provideZoneChangeDetection({ eventCoalescing: true })</code>, keeps zone.js loaded while you migrate:`,
        ar: `${ng('NgZone')} و${ng('runOutsideAngular')} و${ng('run')} بتوع أنجولار؛ و${mine('zone')} كان اسم الـ field بتاعك ليه. في الـ zoneless، النسخة القديمة لسه بتعدّي الـ compile بس <code>run</code> مبقتش بتخلي حاجة تترسم، و<code>now</code> field عادي، فالساعة بتتجمد. النقل لـ signal بيصلّح ده، وأسماء الـ zone تقدر تمسحها وخلاص. والخطوة اللي في النص، <code>provideZoneChangeDetection({ eventCoalescing: true })</code>، بتسيب zone.js متحمّل وانت بتنقل:` },
      { t: 'code', name: 'app.config.ts — halfway', lang: 'ts', tag: { en: 'zone.js still loaded', ar: 'zone.js لسه متحمّل' }, code: [
        'providers: [provideZoneChangeDetection({ eventCoalescing: true })],' ] }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It freezes, and says nothing', ar: 'بيتجمد، ومش بيقول حاجة' },
    title: { en: 'Mistakes that fail silently', ar: 'غلطات بتفشل في صمت' },
    lead: {
      en: 'Zoneless failures have no error message. A value just stops reaching the screen, or reaches it late when something else happens to repaint the component, which makes the bug look random.',
      ar: 'أعطال الـ zoneless ملهاش رسالة error. القيمة بتبطل توصل الشاشة وخلاص، أو بتوصل متأخر لما حاجة تانية بالصدفة ترسم الـ component، وده بيخلي الـ bug يبان عشوائي.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'A plain field changed by a timer', ar: 'field عادي بيغيّره تايمر' }, blocks: [
        { t: 'pair',
          bad:  { name: 'clock.ts — plain field', lang: 'ts', code: [
            'now = new Date();',
            '',
            'constructor() {',
            '  setInterval(() => this.now = new Date(), 1000);',
            '}' ] },
          good: { name: 'clock.ts — signal', lang: 'ts', code: [
            'readonly now = signal(new Date());',
            '',
            'constructor() {',
            '  setInterval(() => this.now.set(new Date()), 1000);',
            '}' ] } },
        { t: 'p', en: 'The timer runs and the field changes, but nothing tells Angular. With zone.js the timer itself triggered a check, which is why this worked for years. Zoneless, the time freezes until something else, like a click inside the clock, happens to repaint it.',
                  ar: 'التايمر بيشتغل والـ field بيتغير، بس محدش بيقول لأنجولار. مع zone.js التايمر نفسه كان بيعمل تشييك، وعشان كده ده كان شغال سنين. في الـ zoneless، الوقت بيتجمد لحد ما حاجة تانية، زي كليك جوه الساعة، ترسمها بالصدفة.' }
      ]},
      { t: 'step', n: '2', title: { en: 'A plain field set after an await', ar: 'field عادي بيتحط بعد await' }, blocks: [
        { t: 'pair',
          bad:  { name: 'clock.ts — after await', lang: 'ts', code: [
            "city = '';",
            '',
            'async ngOnInit() {',
            "  const res = await fetch('/api/city');",
            '  this.city = await res.text();',
            '}' ] },
          good: { name: 'clock.ts — after await, signal', lang: 'ts', code: [
            "readonly city = signal('');",
            '',
            'async ngOnInit() {',
            "  const res = await fetch('/api/city');",
            '  this.city.set(await res.text());',
            '}' ] } },
        { t: 'p', en: `zone.js used to notice the end of every <code>await</code>. Nothing does now. In this clock the city would still appear within a second, but only because ${pub('now')} ticks and repaints the same component. Move the same code to a component with no signal and the city never shows. Don’t rely on a neighbour’s repaint; make it a signal.`,
                  ar: `zone.js كان بياخد باله من آخر كل <code>await</code>. دلوقتي محدش بياخد باله. في الساعة دي المدينة كانت هتظهر برضه في خلال ثانية، بس عشان ${pub('now')} بتتقدم وبترسم نفس الـ component. انقل نفس الكود لـ component مفيهوش signal والمدينة عمرها ما هتظهر. متعتمدش على رسم جارك؛ خليها signal.` }
      ]},
      { t: 'step', n: '3', title: { en: 'Changing the object inside the signal', ar: 'تغيير الـ object اللي جوه الـ signal' }, blocks: [
        { t: 'pair',
          bad:  { name: 'clock.ts — mutate', lang: 'ts', code: [
            'setInterval(() => this.now().setTime(Date.now()), 1000);' ] },
          good: { name: 'clock.ts — replace', lang: 'ts', code: [
            'setInterval(() => this.now.set(new Date()), 1000);' ] } },
        { t: 'p', en: `<code>now()</code> hands you the same <code>Date</code> object, and changing it in place never calls ${ng('set')}. The signal has no idea anything happened. Always give a signal a new value.`,
                  ar: `<code>now()</code> بتديك نفس الـ <code>Date</code> object، وتغييره في مكانه عمره ما بينادي ${ng('set')}. الـ signal ماعندهاش أي فكرة إن حاجة حصلت. دايمًا ادّي الـ signal قيمة جديدة.` }
      ]},
      { t: 'step', n: '4', title: { en: 'Old tests that lean on the zone', ar: 'تستات قديمة ساندة على الـ zone' }, blocks: [
        { t: 'pair',
          bad:  { name: 'clock.spec.ts — zone-based', lang: 'ts', code: [
            "it('ticks', fakeAsync(() => {",
            '  // …',
            '  tick(1000);',
            '}));' ] },
          good: { name: 'clock.spec.ts — zoneless', lang: 'ts', code: [
            "it('ticks', async () => {",
            '  // …',
            '  await fixture.whenStable();',
            '});' ] } },
        { t: 'p', en: `Not silent, but confusing: ${ng('fakeAsync')} and ${ng('tick')} are built on zone.js, so once it is gone they fail with an error about the zone rather than about your code. ${ng('whenStable')} is the zoneless way to wait.`,
                  ar: `مش صامتة، بس ملخبطة: ${ng('fakeAsync')} و${ng('tick')} مبنيين على zone.js، فأول ما يمشي بيفشلوا بـ error عن الـ zone مش عن الكود بتاعك. و${ng('whenStable')} هي طريقة الـ zoneless إنك تستنى.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When the screen freezes', ar: 'لما الشاشة تتجمد' },
    title: { en: 'Five questions, in this order', ar: 'خمس أسئلة، بالترتيب ده' },
    lead: {
      en: 'Something stopped updating after going zoneless. Ask these first.',
      ar: 'حاجة بطّلت تتحدّث بعد الـ zoneless. اسأل دول الأول.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Is the value on screen a signal, read with <code>()</code> in the template?',
                  ar: '<b>1.</b> القيمة اللي على الشاشة signal، ومتقرية بـ <code>()</code> في التمبلت؟' },
      { t: 'chk', en: '<b>2.</b> Is it changed with <code>set</code> or <code>update</code>, not reassigned with <code>=</code> and not mutated in place?',
                  ar: '<b>2.</b> بتتغير بـ <code>set</code> أو <code>update</code>، مش بـ <code>=</code> ومش بتتعدّل في مكانها؟' },
      { t: 'chk', en: '<b>3.</b> Does it only update when you click something nearby? Then it is riding on someone else’s repaint. Go back to question 1.',
                  ar: '<b>3.</b> بتتحدّث بس لما تدوس على حاجة جنبها؟ يبقى هي راكبة على رسم حد تاني. ارجع للسؤال 1.' },
      { t: 'chk', en: '<b>4.</b> Are both halves done: the provider in <code>providers</code> and <code>zone.js</code> out of <code>polyfills</code>, for the build and the tests?',
                  ar: '<b>4.</b> النصين اتعملوا: الـ provider في <code>providers</code> و<code>zone.js</code> بره <code>polyfills</code>، للـ build وللتستات؟' },
      { t: 'chk', en: '<b>5.</b> Does a library you use still depend on zone.js? Check its docs for zoneless support.',
                  ar: '<b>5.</b> فيه مكتبة بتستخدمها لسه معتمدة على zone.js؟ شوف الـ docs بتاعتها بخصوص دعم الـ zoneless.' }
    ]
  }
  ]
};
