/* ==================================================================
   NgRx, name by name — the deep dive after the global state topic.
   One running example (a to-do SignalStore, then the same feature in
   classic NgRx) with every name coloured by who owns it.
   ================================================================== */

const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

export default {
  topic: 'global-state',
  tab: 'NgRx, name by name — The Angular Signal',
  title: { en: 'NgRx SignalStore, name by name', ar: 'NgRx SignalStore، اسم اسم' },
  say: {
    en: 'One to-do store written with NgRx SignalStore, then the same feature in classic NgRx. Every name coloured: which words are NgRx’s, which keys you invent, and which names three files must spell the same way.',
    ar: 'store واحد للـ to-do مكتوب بـ NgRx SignalStore، وبعدين نفس الفيتشر بـ NgRx الكلاسيك. كل اسم ملوّن: أنهي كلمات بتاعة NgRx، وأنهي مفاتيح انت بتخترعها، وأنهي أسماء لازم تلات ملفات يكتبوها بنفس الشكل.'
  },
  lead: {
    en: 'The idea: <b>a library gives every store the same shape, so a big team writes state the same way.</b> The confusing part is the names. <code>signalStore</code> is full of functions whose names start with <code>with</code>, you invent keys inside them, NgRx turns those keys into signals, and suddenly a word you typed once in <code>withState</code> is called as <code>store.todos()</code> in a template. This page follows each name from where you invent it to everywhere it has to match.',
    ar: 'الفكرة: <b>المكتبة بتدّي كل store نفس الشكل، فالفريق الكبير بيكتب الحالة بنفس الطريقة.</b> اللي بيلخبط هو الأسماء. <code>signalStore</code> مليان functions أسماءها بتبدأ بـ <code>with</code>، وانت بتخترع مفاتيح جواها، وNgRx بيحوّل المفاتيح دي لـ signals، وفجأة كلمة كتبتها مرة واحدة في <code>withState</code> بتتنادى كـ <code>store.todos()</code> في تمبلت. الصفحة دي ماشية ورا كل اسم من المكان اللي اخترعته فيه لحد كل مكان لازم يطابقه.'
  },

  names: {
    note: {
      en: 'Every function that starts with <code>with</code>, <code>create</code>, <code>patch</code> or <code>provide</code> belongs to NgRx or Angular. The keys <i>inside</i> them (state keys, computed names, method names, action names) are yours, but other places type them too, so they are orange.',
      ar: 'أي function بتبدأ بـ <code>with</code> أو <code>create</code> أو <code>patch</code> أو <code>provide</code> بتاعة NgRx أو أنجولار. والمفاتيح اللي <i>جواها</i> (مفاتيح الـ state، وأسماء الـ computed، وأسماء الميثودز، وأسماء الـ actions) بتاعتك، بس أماكن تانية بتكتبها برضه، فهي برتقاني.'
    },
    names: [
      /* --- shared --- */
      { n:'TodosStore', k:'pub', w:{ en:'Your store. It is a constant, but components use it like a class: <code>inject(TodosStore)</code>.', ar:'الـ store بتاعك. هو constant، بس الـ components بتستخدمه زي الكلاس: <code>inject(TodosStore)</code>.' } },
      { n:'todos', k:'pub', re:'(?<![\\w$/\'-])todos(?![\\w$\'-])',
        w:{ en:'A state key. <code>withState</code> turns it into a signal, <code>withComputed</code> destructures it, <code>patchState</code> writes it, templates read <code>store.todos()</code>. One name, many places. In classic NgRx it is also the key in the action’s <code>props</code>.',
            ar:'مفتاح في الـ state. <code>withState</code> بيحوّله لـ signal، و<code>withComputed</code> بيفكّه، و<code>patchState</code> بيكتب فيه، والتمبلتس بتقرا <code>store.todos()</code>. اسم واحد، أماكن كتير. وفي NgRx الكلاسيك هو كمان المفتاح اللي في <code>props</code> بتاعة الـ action.' } },
      { n:'filter', k:'pub', re:'(?<![\\w$.-])filter(?![\\w$-])',
        w:{ en:'A state key, and (through shorthand) the name of <code>setFilter</code>’s parameter. The <code>.filter(</code> on arrays is JavaScript’s.', ar:'مفتاح في الـ state، و(بالاختصار) اسم الـ parameter بتاع <code>setFilter</code>. و<code>.filter(</code> اللي على الـ arrays بتاعة JavaScript.' } },
      { n:'busy', k:'pub', w:{ en:'A state key. Templates read <code>store.busy()</code>.', ar:'مفتاح في الـ state. التمبلتس بتقرا <code>store.busy()</code>.' } },
      { n:'visible', k:'pub', w:{ en:'Your computed. Templates read <code>store.visible()</code>.', ar:'الـ computed بتاعتك. التمبلتس بتقرا <code>store.visible()</code>.' } },
      { n:'openCount', k:'pub', w:{ en:'Your computed. Templates read <code>store.openCount()</code>.', ar:'الـ computed بتاعتك. التمبلتس بتقرا <code>store.openCount()</code>.' } },
      { n:'setFilter', k:'pub', w:{ en:'Your method. Templates call <code>store.setFilter(…)</code>.', ar:'الميثود بتاعتك. التمبلتس بتنادي <code>store.setFilter(…)</code>.' } },
      { n:'load', k:'pub', w:{ en:'Your method. The component calls <code>store.load()</code>.', ar:'الميثود بتاعتك. الـ component بينادي <code>store.load()</code>.' } },
      { n:'TodoApi', k:'pub', w:{ en:'Your HTTP service class.', ar:'كلاس الـ service بتاعك للـ HTTP.' } },
      { n:'getAll', k:'pub', w:{ en:'A method on <code>TodoApi</code>, called from the store or the effect.', ar:'ميثود في <code>TodoApi</code>، بتتنادى من الـ store أو من الـ effect.' } },
      { n:'Todo', k:'pub', re:'(?<![\\w$\\[-])Todo(?![\\w$-])', w:{ en:'Your data type.', ar:'نوع الداتا بتاعك.' } },
      { n:'Filter', k:'pub', w:{ en:'Your type for the filter values.', ar:'النوع بتاعك لقيم الفلتر.' } },
      { n:'id', k:'pub', w:{ en:'A field of <code>Todo</code>.', ar:'field في <code>Todo</code>.' } },
      { n:'title', k:'pub', w:{ en:'A field of <code>Todo</code>, shown in the template.', ar:'field في <code>Todo</code>، بيظهر في التمبلت.' } },
      { n:'done', k:'pub', re:'(?<![\\w$\'-])done(?![\\w$\'-])', w:{ en:'A field of <code>Todo</code>. The string <code>\'done\'</code> is a filter value.', ar:'field في <code>Todo</code>. والنص <code>\'done\'</code> قيمة فلتر.' } },
      { n:'TodoList', k:'pub', w:{ en:'The component’s class.', ar:'كلاس الـ component.' } },
      { n:'app-todo-list', k:'pub', w:{ en:'The component’s selector, typed by a parent template.', ar:'الـ selector بتاع الـ component، وتمبلت الأب بيكتبه.' } },
      { n:'loadTodos', k:'pub', w:{ en:'A classic action creator. The component dispatches it, the reducer and the effect react to it.', ar:'action creator كلاسيك. الـ component بيبعته، والـ reducer والـ effect بيردّوا عليه.' } },
      { n:'loadTodosSuccess', k:'pub', w:{ en:'A classic action creator: made by the effect, handled by the reducer.', ar:'action creator كلاسيك: الـ effect بيعمله، والـ reducer بيتعامل معاه.' } },
      { n:'TodosState', k:'pub', w:{ en:'Your type for this slice of the classic store.', ar:'النوع بتاعك للجزء ده من الـ store الكلاسيك.' } },
      { n:'todosReducer', k:'pub', w:{ en:'Your reducer, registered in the app config.', ar:'الـ reducer بتاعك، بيتسجل في إعدادات التطبيق.' } },
      { n:'todoPage', k:'pub', w:{ en:'The feature key. The key in <code>provideStore</code> and the string in <code>createFeatureSelector</code> must match, and nothing checks it at compile time.', ar:'الـ feature key. المفتاح اللي في <code>provideStore</code> والنص اللي في <code>createFeatureSelector</code> لازم يطابقوا بعض، ومفيش حاجة بتشيّك ده وقت الـ compile.' } },
      { n:'selectTodosState', k:'pub', w:{ en:'A selector for the whole slice.', ar:'selector للجزء كله.' } },
      { n:'selectTodos', k:'pub', w:{ en:'A selector. Components pass it to <code>selectSignal</code>.', ar:'selector. الـ components بتدّيه لـ <code>selectSignal</code>.' } },
      { n:'selectOpenCount', k:'pub', w:{ en:'A selector. Components pass it to <code>selectSignal</code>.', ar:'selector. الـ components بتدّيه لـ <code>selectSignal</code>.' } },
      { n:'loadTodosEffect', k:'pub', w:{ en:'Your effect, registered with <code>provideEffects</code>.', ar:'الـ effect بتاعك، بيتسجل بـ <code>provideEffects</code>.' } },

      /* --- yours, local --- */
      { n:'store', k:'mine', re:'(?<![\\w$-])(?<!todos\\.)store(?![\\w$-])',
        w:{ en:'Two local names: the parameter NgRx hands to <code>withMethods</code>, and each component’s own field. Both yours.', ar:'اسمين محليين: الـ parameter اللي NgRx بيدّيه لـ <code>withMethods</code>، والـ field بتاع كل component. الاتنين بتوعك.' } },
      { n:'api', k:'mine', re:'(?<![\\w$/-])api(?![\\w$/-])', w:{ en:'A local name for the injected <code>TodoApi</code>.', ar:'اسم محلي للـ <code>TodoApi</code> اللي اتعمله inject.' } },
      { n:'http', k:'mine', re:'(?<![\\w$/-])http(?![\\w$-])', w:{ en:'The API service’s field holding <code>HttpClient</code>.', ar:'الـ field بتاع سيرفس الـ API اللي شايل <code>HttpClient</code>.' } },
      { n:'t', k:'mine', w:{ en:'An arrow parameter or loop variable: one to-do.', ar:'parameter في arrow أو متغير لوب: to-do واحدة.' } },
      { n:'state', k:'mine', w:{ en:'The reducer’s and selector’s parameter: the current slice.', ar:'الـ parameter بتاع الـ reducer والـ selector: الجزء الحالي.' } },
      { n:'initialState', k:'mine', w:{ en:'A constant used only by the reducer file.', ar:'constant بيستخدمه ملف الـ reducer بس.' } },
      { n:'actions$', k:'mine', w:{ en:'A local name for the injected <code>Actions</code> stream.', ar:'اسم محلي للـ stream بتاع <code>Actions</code> اللي اتعمله inject.' } },
      { n:'items', k:'mine', w:{ en:'The classic component’s own signal field.', ar:'الـ signal field بتاع الـ component الكلاسيك.' } },
      { n:'items$', k:'mine', w:{ en:'The older component’s observable field.', ar:'الـ observable field بتاع الـ component القديم.' } },
      { n:'remaining', k:'mine', w:{ en:'The classic component’s own signal field.', ar:'الـ signal field بتاع الـ component الكلاسيك.' } },

      /* --- NgRx’s, Angular’s, RxJS’s, the browser’s --- */
      { n:'signalStore', k:'ng', w:{ en:'NgRx’s function that builds a store out of the <code>with…</code> pieces.', ar:'الـ function بتاعة NgRx اللي بتبني store من حتت الـ <code>with…</code>.' } },
      { n:'withState', k:'ng', w:{ en:'NgRx’s piece for the starting state. The keys inside are yours.', ar:'حتة NgRx للـ state الأولانية. المفاتيح اللي جواها بتاعتك.' } },
      { n:'withComputed', k:'ng', w:{ en:'NgRx’s piece for derived values.', ar:'حتة NgRx للقيم المشتقة.' } },
      { n:'withMethods', k:'ng', w:{ en:'NgRx’s piece for the methods components call.', ar:'حتة NgRx للميثودز اللي الـ components بتناديها.' } },
      { n:'patchState', k:'ng', w:{ en:'NgRx’s way to change SignalStore state: the store, then the keys that changed.', ar:'طريقة NgRx لتغيير state الـ SignalStore: الـ store، وبعده المفاتيح اللي اتغيرت.' } },
      { n:'createAction', k:'ng', w:{ en:'Classic NgRx: declares an action.', ar:'NgRx الكلاسيك: بتعلن action.' } },
      { n:'props', k:'ng', w:{ en:'Classic NgRx: the data an action carries.', ar:'NgRx الكلاسيك: الداتا اللي الـ action شايلها.' } },
      { n:'createReducer', k:'ng', w:{ en:'Classic NgRx: builds the reducer.', ar:'NgRx الكلاسيك: بتبني الـ reducer.' } },
      { n:'on', k:'ng', re:'(?<![\\w$-])on(?=\\()', w:{ en:'Classic NgRx: “when this action happens, do this”.', ar:'NgRx الكلاسيك: «لما الـ action ده يحصل، اعمل كده».' } },
      { n:'createFeatureSelector', k:'ng', w:{ en:'Classic NgRx: selects one feature slice by its key.', ar:'NgRx الكلاسيك: بتختار جزء feature بالمفتاح بتاعه.' } },
      { n:'createSelector', k:'ng', w:{ en:'Classic NgRx: a memoised read.', ar:'NgRx الكلاسيك: قراية نتيجتها بتتحفظ.' } },
      { n:'createEffect', k:'ng', w:{ en:'Classic NgRx: where side effects live.', ar:'NgRx الكلاسيك: المكان اللي الـ side effects عايشة فيه.' } },
      { n:'functional', k:'ng', w:{ en:'An option key NgRx reads: this effect is a plain function.', ar:'مفتاح إعداد NgRx بيقراه: الـ effect ده function عادية.' } },
      { n:'Actions', k:'ng', w:{ en:'NgRx’s stream of every dispatched action.', ar:'الـ stream بتاع NgRx اللي فيه كل action اتبعت.' } },
      { n:'ofType', k:'ng', w:{ en:'NgRx’s operator: let only these actions through.', ar:'الـ operator بتاع NgRx: عدّي الـ actions دي بس.' } },
      { n:'Store', k:'ng', w:{ en:'Classic NgRx’s store service. Capital <code>S</code>; your field <code>store</code> is a different name.', ar:'سيرفس الـ store في NgRx الكلاسيك. بحرف <code>S</code> كابيتال؛ والـ field بتاعك <code>store</code> اسم تاني.' } },
      { n:'selectSignal', k:'ng', w:{ en:'Classic NgRx: read a selector as a signal.', ar:'NgRx الكلاسيك: اقرا selector كـ signal.' } },
      { n:'select', k:'ng', w:{ en:'Classic NgRx: read a selector as an observable.', ar:'NgRx الكلاسيك: اقرا selector كـ observable.' } },
      { n:'dispatch', k:'ng', w:{ en:'Classic NgRx: send an action.', ar:'NgRx الكلاسيك: ابعت action.' } },
      { n:'provideStore', k:'ng', w:{ en:'NgRx’s provider function for the classic store.', ar:'الـ provider function بتاعة NgRx للـ store الكلاسيك.' } },
      { n:'provideEffects', k:'ng', w:{ en:'NgRx’s provider function that starts your effects.', ar:'الـ provider function بتاعة NgRx اللي بتشغّل الـ effects بتاعتك.' } },
      { n:'ApplicationConfig', k:'ng', w:{ en:'Angular’s type for the app config.', ar:'النوع بتاع أنجولار لإعدادات التطبيق.' } },
      { n:'providers', k:'ng', w:{ en:'An option key Angular reads.', ar:'مفتاح إعداد أنجولار بيقراه.' } },
      { n:'computed', k:'ng', w:{ en:'Angular’s derived signal.', ar:'الـ signal المشتقة بتاعة أنجولار.' } },
      { n:'inject', k:'ng', w:{ en:'Angular’s function that hands you a service.', ar:'الـ function بتاعة أنجولار اللي بتديك service.' } },
      { n:'OnInit', k:'ng', w:{ en:'Angular’s interface. It makes TypeScript check that <code>ngOnInit</code> is spelled right.', ar:'الـ interface بتاع أنجولار. بيخلي TypeScript يتأكد إن <code>ngOnInit</code> مكتوبة صح.' } },
      { n:'ngOnInit', k:'ng', w:{ en:'Angular’s lifecycle hook. Angular calls it by this exact name.', ar:'الـ lifecycle hook بتاع أنجولار. أنجولار بيناديه بالاسم ده بالظبط.' } },
      { n:'firstValueFrom', k:'ng', w:{ en:'RxJS: turns an observable into a promise you can <code>await</code>.', ar:'RxJS: بيحوّل الـ observable لـ promise تقدر تعملها <code>await</code>.' } },
      { n:'switchMap', k:'ng', w:{ en:'An RxJS operator.', ar:'operator من RxJS.' } },
      { n:'map', k:'ng', re:'(?<![\\w$.-])map(?=\\()', w:{ en:'The RxJS operator.', ar:'الـ operator بتاع RxJS.' } },
      { n:'pipe', k:'ng', w:{ en:'The observable method that chains operators.', ar:'ميثود الـ observable اللي بتركّب الـ operators.' } },
      { n:'@Injectable', k:'ng', w:{ en:'Angular’s decorator for a service.', ar:'الـ decorator بتاع أنجولار للـ service.' } },
      { n:'providedIn', k:'ng', w:{ en:'An option key Angular reads.', ar:'مفتاح إعداد أنجولار بيقراه.' } },
      { n:'root', k:'ng', re:'(?<=\')root(?=\')', w:{ en:'Angular’s fixed value: one shared instance.', ar:'قيمة ثابتة من أنجولار: نسخة واحدة متشاركة.' } },
      { n:'HttpClient', k:'ng', w:{ en:'Angular’s HTTP service.', ar:'سيرفس الـ HTTP بتاعة أنجولار.' } },
      { n:'get', k:'ng', re:'(?<=\\.)get(?=<)', w:{ en:'An <code>HttpClient</code> method.', ar:'ميثود في <code>HttpClient</code>.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator.', ar:'الـ decorator بتاع أنجولار.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The string after it is yours.', ar:'مفتاح إعداد. النص اللي بعده بتاعك.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key.', ar:'مفتاح إعداد.' } },
      { n:'click', k:'ng', w:{ en:'The browser’s event name.', ar:'اسم الـ event بتاع المتصفح.' } },
      { n:'async', k:'ng', only:['html'], w:{ en:'Angular’s pipe that subscribes for you.', ar:'الـ pipe بتاع أنجولار اللي بيعمل subscribe بدالك.' } },
      { n:'@if', k:'ng', w:{ en:'Angular’s condition block.', ar:'بلوك الشرط بتاع أنجولار.' } },
      { n:'@for', k:'ng', w:{ en:'Angular’s loop block.', ar:'بلوك اللوب بتاع أنجولار.' } },
      { n:'track', k:'ng', w:{ en:'Part of <code>@for</code>.', ar:'جزء من <code>@for</code>.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One call to <code>load()</code>, six stops', ar: 'نداية واحدة لـ <code>load()</code>، ست محطات' },
    lead: {
      en: 'A to-do list that loads its items from the server. The component asks the store to load. The store asks the API, writes the result into its state, and a computed count updates the template. Follow the call:',
      ar: 'ليستة to-do بتحمّل الحاجات بتاعتها من السيرفر. الـ component بيطلب من الـ store يحمّل. الـ store بيطلب من الـ API، ويكتب النتيجة في الـ state بتاعته، وعدد محسوب بيحدّث التمبلت. امشي ورا النداية:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'todo-list.ts', lang: 'ts', who: { en: 'component · asks', ar: 'الـ component · بيطلب' },
          code: ['ngOnInit() {', '  this.store.load();', '}'],
          say: { en: `${ng('ngOnInit')} is Angular’s name; Angular calls it, so you cannot pick it. ${mine('store')} is the component’s own field. ${pub('load')} is a method name <b>you</b> chose inside the store, so the component copies it.`,
                 ar: `${ng('ngOnInit')} اسم أنجولار؛ أنجولار هو اللي بيناديه، فمش انت اللي بتختاره. و${mine('store')} الـ field بتاع الـ component نفسه. و${pub('load')} اسم ميثود <b>انت</b> اخترته جوه الـ store، فالـ component بينسخه.` } },
        { file: 'todos.store.ts', lang: 'ts', who: { en: 'store · methods', ar: 'الـ store · الميثودز' },
          code: ['withMethods((store, api = inject(TodoApi)) => ({', '  async load() {'],
          say: { en: `${ng('withMethods')} is NgRx’s. NgRx hands your function the store as its first argument; you name that parameter (${mine('store')} here). ${mine('api')} is a second parameter you added yourself, with ${ng('inject')} as its default.`,
                 ar: `${ng('withMethods')} بتاعة NgRx. NgRx بيدّي الـ function بتاعتك الـ store كأول argument؛ وانت اللي بتسمّي الـ parameter ده (هنا ${mine('store')}). و${mine('api')} parameter تاني انت ضفته بنفسك، وقيمته الافتراضية ${ng('inject')}.` } },
        { file: 'todos.store.ts', lang: 'ts', who: { en: 'store · writes', ar: 'الـ store · بيكتب' },
          code: ['patchState(store, { busy: true });', 'const todos = await firstValueFrom(api.getAll());', 'patchState(store, { todos, busy: false });'],
          say: { en: `${ng('patchState')} is NgRx’s. The keys in its object must be <b>state keys</b>: ${pub('busy')}, ${pub('todos')}. ${pub('getAll')} is the API service’s method name. <code>{ todos }</code> is shorthand for <code>{ todos: todos }</code>, so the local constant has to be called ${pub('todos')} too.`,
                 ar: `${ng('patchState')} بتاعة NgRx. المفاتيح اللي في الـ object بتاعها لازم تبقى <b>مفاتيح state</b>: ${pub('busy')} و${pub('todos')}. و${pub('getAll')} اسم ميثود سيرفس الـ API. و<code>{ todos }</code> اختصار لـ <code>{ todos: todos }</code>، فالـ constant المحلي لازم يبقى اسمه ${pub('todos')} هو كمان.` } },
        { file: 'todos.store.ts', lang: 'ts', who: { en: 'store · the state', ar: 'الـ store · الـ state' },
          code: ["withState({ todos: [] as Todo[], filter: 'all' as Filter, busy: false }),"],
          say: { en: `This is where ${pub('todos')}, ${pub('filter')} and ${pub('busy')} were <b>invented</b>. ${ng('withState')} is NgRx’s; the keys are yours. NgRx turns each key into a signal on the store, with the same name.`,
                 ar: `هنا المكان اللي ${pub('todos')} و${pub('filter')} و${pub('busy')} <b>اتخرعوا</b> فيه. ${ng('withState')} بتاعة NgRx؛ والمفاتيح بتاعتك. وNgRx بيحوّل كل مفتاح لـ signal على الـ store، بنفس الاسم.` } },
        { file: 'todos.store.ts', lang: 'ts', who: { en: 'store · derives', ar: 'الـ store · بيشتق' },
          code: ['withComputed(({ todos, filter }) => ({', '  openCount: computed(() => todos().filter(t => !t.done).length),'],
          say: { en: `${ng('withComputed')} hands you the state signals; the names you destructure must be the state keys. ${pub('openCount')} is a new name you invent here, and it becomes <code>store.openCount()</code>.`,
                 ar: `${ng('withComputed')} بيدّيك الـ signals بتاعة الـ state؛ والأسماء اللي بتفكّها لازم تبقى مفاتيح الـ state. و${pub('openCount')} اسم جديد انت بتخترعه هنا، وبيبقى <code>store.openCount()</code>.` } },
        { file: 'todo-list.html', lang: 'html', who: { en: 'component · reads', ar: 'الـ component · بيقرا' },
          code: ['<p>{{ store.openCount() }} left</p>'],
          say: { en: `The template reads a signal, with brackets. It types ${pub('openCount')} exactly as the store spelled it. Nothing in the template knows NgRx exists.`,
                 ar: `التمبلت بيقرا signal، بالقوسين. وبيكتب ${pub('openCount')} بالظبط زي ما الـ store كتبها. ومفيش حاجة في التمبلت تعرف إن NgRx موجود.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'You invent <code>todos</code> in <code>withState</code>, destructure it in <code>withComputed</code>, write it with <code>patchState</code>, and read it as <code>store.todos()</code>. <b>Same spelling in all four places.</b> Every <code>with…</code> and <code>patch…</code> word is NgRx’s.',
        ar: 'انت بتخترع <code>todos</code> في <code>withState</code>، وبتفكّها في <code>withComputed</code>، وبتكتب فيها بـ <code>patchState</code>، وبتقراها كـ <code>store.todos()</code>. <b>نفس الكتابة في الأربع أماكن.</b> وكل كلمة <code>with…</code> و<code>patch…</code> بتاعة NgRx.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'NgRx or you?', ar: 'NgRx ولا انت؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'NgRx gives you the frame. Every name inside the frame is yours, but some of them you pick once and then must copy everywhere.',
      ar: 'NgRx بيدّيك البرواز. وكل اسم جوه البرواز بتاعك، بس فيه منهم بتختاره مرة واحدة وبعدين لازم تنسخه في كل حتة.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'], ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: [`${ng('signalStore')}, ${ng('withState')}, ${ng('withComputed')}, ${ng('withMethods')}`, 'store', 'store', 'NgRx. Type them exactly.'],
            ar: [`${ng('signalStore')} و${ng('withState')} و${ng('withComputed')} و${ng('withMethods')}`, 'الـ store', 'الـ store', 'NgRx. اكتبهم بالظبط.'] },
          { en: ['<code>withState({ todos: …, busy: … })</code>', 'store', 'store', `<b>you invent</b> ${pub('todos')}, ${pub('busy')}; everything else copies them`],
            ar: ['<code>withState({ todos: …, busy: … })</code>', 'الـ store', 'الـ store', `<b>انت بتخترع</b> ${pub('todos')} و${pub('busy')}؛ وكل حاجة تانية بتنسخهم`] },
          { en: ['<code>withComputed(({ todos, filter }) =&gt; …)</code>', 'store', 'store', 'nobody: these must copy the state keys'],
            ar: ['<code>withComputed(({ todos, filter }) =&gt; …)</code>', 'الـ store', 'الـ store', 'محدش: دول لازم ينسخوا مفاتيح الـ state'] },
          { en: ['<code>openCount: computed(…)</code>', 'store', 'store', `<b>you invent</b> ${pub('openCount')}`],
            ar: ['<code>openCount: computed(…)</code>', 'الـ store', 'الـ store', `<b>انت بتخترع</b> ${pub('openCount')}`] },
          { en: ['<code>(store, api = inject(TodoApi))</code>', 'store', 'store', `NgRx passes the value; you pick ${mine('store')} and ${mine('api')}`],
            ar: ['<code>(store, api = inject(TodoApi))</code>', 'الـ store', 'الـ store', `NgRx بيبعت القيمة؛ وانت بتختار ${mine('store')} و${mine('api')}`] },
          { en: ['<code>load() { … }</code>, <code>setFilter(…)</code>', 'store', 'store', `<b>you invent</b> ${pub('load')}, ${pub('setFilter')}; components copy them`],
            ar: ['<code>load() { … }</code> و<code>setFilter(…)</code>', 'الـ store', 'الـ store', `<b>انت بتخترع</b> ${pub('load')} و${pub('setFilter')}؛ والـ components بتنسخهم`] },
          { en: ['<code>patchState(store, { busy: true })</code>', 'store', 'store', 'the keys copy the state keys'],
            ar: ['<code>patchState(store, { busy: true })</code>', 'الـ store', 'الـ store', 'المفاتيح بتنسخ مفاتيح الـ state'] },
          { en: ['<code>protected readonly store = inject(TodosStore)</code>', 'component', 'component', `you pick ${mine('store')}; ${pub('TodosStore')} is copied`],
            ar: ['<code>protected readonly store = inject(TodosStore)</code>', 'الـ component', 'الـ component', `انت بتختار ${mine('store')}؛ و${pub('TodosStore')} منسوخ`] },
        ] },
      { t: 'ul',
        en: ['<b>Every <code>with…</code> is NgRx’s; everything inside is yours.</b> If you are unsure, ask “did I type this word first, or did I import it?”.',
             '<b>A state key is one name, not four.</b> <code>todos</code> in <code>withState</code>, <code>todos()</code> in <code>withComputed</code>, <code>{ todos }</code> in <code>patchState</code> and <code>store.todos()</code> in a template are the same name. Rename one, rename all.',
             '<b>Components call methods, not <code>patchState</code>.</b> Writing state is the store’s job. In recent NgRx versions the state is protected by default, so a component cannot patch it at all.'],
        ar: ['<b>كل <code>with…</code> بتاعة NgRx؛ وكل حاجة جواها بتاعتك.</b> لو مش متأكد، اسأل «أنا اللي كتبت الكلمة دي الأول، ولا عملتها import؟».',
             '<b>مفتاح الـ state اسم واحد، مش أربعة.</b> <code>todos</code> في <code>withState</code>، و<code>todos()</code> في <code>withComputed</code>، و<code>{ todos }</code> في <code>patchState</code>، و<code>store.todos()</code> في التمبلت، كلهم نفس الاسم. غيّر واحد، غيّر الكل.',
             '<b>الـ components بتنادي ميثودز، مش <code>patchState</code>.</b> كتابة الـ state شغلانة الـ store. وفي نسخ NgRx الحديثة الـ state محمية افتراضيًا، فالـ component مايقدرش يعمل patch خالص.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All five files, every name coloured', ar: 'الخمس ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same store, complete, with its API service and one component. Hover <code>todos</code> and watch how many places light up. Then press <b>Rename test</b>.',
      ar: 'نفس الـ store، كامل، مع سيرفس الـ API وcomponent واحد. قف بالماوس على <code>todos</code> وشوف كام مكان بينوّر. وبعدين دوس <b>جرّب تغيّر الأسماء</b>.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'todo.ts', lang: 'ts', tag: { en: 'the data', ar: 'الداتا' }, code: [
        'export interface Todo {',
        '  id: string;',
        '  title: string;',
        '  done: boolean;',
        '}',
        '',
        "export type Filter = 'all' | 'open' | 'done';" ] },
      { t: 'code', name: 'todo-api.ts', lang: 'ts', tag: { en: 'the server', ar: 'السيرفر' }, code: [
        "import { Injectable, inject } from '@angular/core';",
        "import { HttpClient } from '@angular/common/http';",
        "import { Todo } from './todo';",
        '',
        "@Injectable({ providedIn: 'root' })",
        'export class TodoApi {',
        '  private readonly http = inject(HttpClient);',
        '',
        '  getAll() {',
        "    return this.http.get<Todo[]>('/api/todos');",
        '  }',
        '}' ] },
      { t: 'code', name: 'todos.store.ts', lang: 'ts', tag: { en: 'the store', ar: 'الـ store' }, code: [
        "import { computed, inject } from '@angular/core';",
        "import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';",
        "import { firstValueFrom } from 'rxjs';",
        "import { Filter, Todo } from './todo';",
        "import { TodoApi } from './todo-api';",
        '',
        'export const TodosStore = signalStore(',
        "  { providedIn: 'root' },",
        '',
        "  withState({ todos: [] as Todo[], filter: 'all' as Filter, busy: false }),",
        '',
        '  withComputed(({ todos, filter }) => ({',
        '    visible: computed(() => todos().filter(t =>',
        "      filter() === 'all' ? true : filter() === 'done' ? t.done : !t.done)),",
        '    openCount: computed(() => todos().filter(t => !t.done).length),',
        '  })),',
        '',
        '  withMethods((store, api = inject(TodoApi)) => ({',
        '    setFilter(filter: Filter) {',
        '      patchState(store, { filter });',
        '    },',
        '    async load() {',
        '      patchState(store, { busy: true });',
        '      const todos = await firstValueFrom(api.getAll());',
        '      patchState(store, { todos, busy: false });',
        '    },',
        '  })),',
        ');' ] },
      { t: 'code', name: 'todo-list.ts', lang: 'ts', tag: { en: 'the component', ar: 'الـ component' }, code: [
        "import { Component, OnInit, inject } from '@angular/core';",
        "import { TodosStore } from './todos.store';",
        '',
        '@Component({',
        "  selector: 'app-todo-list',",
        "  templateUrl: './todo-list.html',",
        '})',
        'export class TodoList implements OnInit {',
        '  protected readonly store = inject(TodosStore);',
        '',
        '  ngOnInit() {',
        '    this.store.load();',
        '  }',
        '}' ] },
      { t: 'code', name: 'todo-list.html', lang: 'html', tag: { en: 'the component', ar: 'الـ component' }, code: [
        '@if (store.busy()) {',
        '  <p>Loading…</p>',
        '}',
        `<button (click)="store.setFilter('open')">Open only</button>`,
        '',
        '<ul>',
        '  @for (t of store.visible(); track t.id) {',
        '    <li>{{ t.title }}</li>',
        '  }',
        '</ul>',
        '<p>{{ store.openCount() }} left</p>' ] },
      { t: 'nmtable' }
    ]
  },

  /* ------------------------------------------------------------ 4 */
  {
    id: 'rename',
    kicker: { en: 'Is it OK to change it?', ar: 'ينفع أغيّره؟' },
    title: { en: 'What breaks when you rename each name', ar: 'إيه اللي بيبوظ لما تغيّر كل اسم' },
    lead: {
      en: 'SignalStore is fully typed, so a rename you did not follow is almost always a compile error. The places to follow are simply more numerous than you expect.',
      ar: 'الـ SignalStore متكتب بالـ types كامل، فالتغيير اللي ماكملتوش تقريبًا دايمًا بيدي compile error. بس الأماكن اللي لازم تغيّر فيها أكتر من اللي متوقعه.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'], ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [pub('todos') + ' (a state key)', '<code>withComputed</code>’s destructuring, every <code>patchState</code> that sets it, every template that reads it', 'Compile error in each place you missed.'],
            ar: [pub('todos') + ' (مفتاح state)', 'الفك في <code>withComputed</code>، وكل <code>patchState</code> بيكتب فيه، وكل تمبلت بيقراه', 'Compile error في كل مكان نسيته.'] },
          { en: [`${pub('openCount')}, ${pub('visible')} (computeds)`, 'every template', 'Compile error in the template (with the default strict template checking).'],
            ar: [`${pub('openCount')} و${pub('visible')} (computeds)`, 'كل تمبلت', 'Compile error في التمبلت (مع الـ strict template checking اللي شغال افتراضيًا).'] },
          { en: [`${pub('load')}, ${pub('setFilter')} (methods)`, 'every component and template that calls them', 'Compile error.'],
            ar: [`${pub('load')} و${pub('setFilter')} (ميثودز)`, 'كل component وتمبلت بيناديهم', 'Compile error.'] },
          { en: [pub('TodosStore'), 'every <code>import</code> and <code>inject(…)</code>', 'Compile error.'],
            ar: [pub('TodosStore'), 'كل <code>import</code> و<code>inject(…)</code>', 'Compile error.'] },
          { en: [`${pub('TodoApi')}, ${pub('getAll')}`, 'the store (or the effect)', 'Compile error.'],
            ar: [`${pub('TodoApi')} و${pub('getAll')}`, 'الـ store (أو الـ effect)', 'Compile error.'] },
          { en: [`${mine('store')}, ${mine('api')} (parameters)`, 'only inside that <code>withMethods</code>', 'Compile error right there.'],
            ar: [`${mine('store')} و${mine('api')} (parameters)`, 'جوه الـ <code>withMethods</code> ده بس', 'Compile error في نفس المكان.'] },
          { en: [mine('store') + ' (the component’s field)', 'that component’s <code>.ts</code> and template', 'Compile error.'],
            ar: [mine('store') + ' (الـ field في الـ component)', 'الـ <code>.ts</code> والتمبلت بتوع الـ component ده', 'Compile error.'] },
          { en: [ng('ngOnInit'), 'nothing: it is Angular’s', 'With <code>implements OnInit</code>: compile error. Without it: <b>no error</b>, the method is just never called and nothing loads.'],
            ar: [ng('ngOnInit'), 'ولا حاجة: ده بتاع أنجولار', 'مع <code>implements OnInit</code>: compile error. من غيره: <b>مفيش error</b>، الميثود ببساطة عمرها ما بتتنادى ومفيش حاجة بتتحمّل.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b> and look at <code>patchState(store, { todos, busy: false })</code>. The shorthand key and the local constant change together, which is exactly why the code stays valid.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b> وبص على <code>patchState(store, { todos, busy: false })</code>. المفتاح المختصر والـ constant المحلي بيتغيروا مع بعض، وده بالظبط سبب إن الكود بيفضل صح.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتوعك' },
    title: { en: 'Whose word is it? NgRx, Angular or RxJS', ar: 'الكلمة دي بتاعة مين؟ NgRx ولا أنجولار ولا RxJS' },
    lead: {
      en: 'A store file imports from three packages. The import lines tell you who owns each word.',
      ar: 'ملف الـ store بيعمل import من تلات packages. وسطور الـ import بتقولك كل كلمة بتاعة مين.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Name', 'Owner', 'Imported from'], ar: ['الاسم', 'صاحبه', 'جاي منين'] },
        rows: [
          { en: [`${ng('signalStore')}, ${ng('withState')}, ${ng('withComputed')}, ${ng('withMethods')}, ${ng('patchState')}`, 'NgRx SignalStore', '<code>@ngrx/signals</code>'],
            ar: [`${ng('signalStore')} و${ng('withState')} و${ng('withComputed')} و${ng('withMethods')} و${ng('patchState')}`, 'NgRx SignalStore', '<code>@ngrx/signals</code>'] },
          { en: [`${ng('createAction')}, ${ng('createReducer')}, ${ng('on')}, ${ng('createSelector')}, ${ng('Store')}`, 'classic NgRx', '<code>@ngrx/store</code>'],
            ar: [`${ng('createAction')} و${ng('createReducer')} و${ng('on')} و${ng('createSelector')} و${ng('Store')}`, 'NgRx الكلاسيك', '<code>@ngrx/store</code>'] },
          { en: [`${ng('createEffect')}, ${ng('Actions')}, ${ng('ofType')}`, 'classic NgRx', '<code>@ngrx/effects</code>'],
            ar: [`${ng('createEffect')} و${ng('Actions')} و${ng('ofType')}`, 'NgRx الكلاسيك', '<code>@ngrx/effects</code>'] },
          { en: [`${ng('computed')}, ${ng('inject')}, ${ng('ngOnInit')}`, 'Angular', '<code>@angular/core</code>'],
            ar: [`${ng('computed')} و${ng('inject')} و${ng('ngOnInit')}`, 'أنجولار', '<code>@angular/core</code>'] },
          { en: [`${ng('firstValueFrom')}, ${ng('switchMap')}, ${ng('map')}`, 'RxJS', '<code>rxjs</code>'],
            ar: [`${ng('firstValueFrom')} و${ng('switchMap')} و${ng('map')}`, 'RxJS', '<code>rxjs</code>'] },
        ] },
      { t: 'p',
        en: 'One trap: <b><code>Store</code> and <code>store</code> are different names.</b> <code>Store</code> (capital S) is classic NgRx’s service, imported and fixed. <code>store</code> (small s) is whatever you named your field or parameter. And <code>TodosStore</code> is a third name, yours and shared.',
        ar: 'فخ واحد: <b><code>Store</code> و<code>store</code> اسمين مختلفين.</b> <code>Store</code> (بحرف S كابيتال) سيرفس NgRx الكلاسيك، معمولها import وثابتة. و<code>store</code> (بحرف s صغير) أي اسم انت سمّيت بيه الـ field أو الـ parameter. و<code>TodosStore</code> اسم تالت، بتاعك ومتشارك.' },
      { t: 'note', label: { en: 'Remember', ar: 'افتكر' },
        en: 'The <code>with</code> prefix is NgRx’s pattern for store features. If you write your own reusable feature, naming it <code>withSomething</code> is the usual habit, but that name is then yours.',
        ar: 'البادئة <code>with</code> هي نمط NgRx لحتت الـ store. لو كتبت حتة خاصة بيك تتكرر، تسميتها <code>withSomething</code> هي العادة المنتشرة، بس الاسم ساعتها بيبقى بتاعك.' }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'NgRx accepts any names. These habits are the ones you will see in most NgRx code, so following them makes your store look familiar to the next person.',
      ar: 'NgRx بيقبل أي أسماء. العادات دي هي اللي هتشوفها في أغلب كود NgRx، فلما تمشي عليها الـ store بتاعك هيبان مألوف للي بعدك.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['the SignalStore constant', '<code>TodosStore</code>', '<code>todosStore</code>, <code>todoSignalStore</code>', 'It is used like a class (<code>inject(TodosStore)</code>), so it gets a capital letter.'],
            ar: ['الـ constant بتاع الـ SignalStore', '<code>TodosStore</code>', '<code>todosStore</code> و<code>todoSignalStore</code>', 'بيتستخدم زي الكلاس (<code>inject(TodosStore)</code>)، فبياخد حرف كابيتال.'] },
          { en: ['a state key', '<code>todos</code>, <code>filter</code>, <code>busy</code>', '<code>todosList</code>, <code>isBusyFlag</code>', 'Templates will say <code>store.todos()</code>. Read it aloud.'],
            ar: ['مفتاح state', '<code>todos</code> و<code>filter</code> و<code>busy</code>', '<code>todosList</code> و<code>isBusyFlag</code>', 'التمبلتس هتقول <code>store.todos()</code>. اقراها بصوت عالي.'] },
          { en: ['a method', '<code>load</code>, <code>setFilter</code>, <code>toggle</code>', '<code>setState</code>, <code>patch</code>', 'Name the intent. A method that patches anything is <code>patchState</code> with extra steps.'],
            ar: ['ميثود', '<code>load</code> و<code>setFilter</code> و<code>toggle</code>', '<code>setState</code> و<code>patch</code>', 'سمّي النية. ميثود بتعمل patch لأي حاجة هي <code>patchState</code> بخطوات زيادة.'] },
          { en: ['an action’s type string', '<code>\'[Todo List] Load Todos\'</code>', '<code>\'LOAD\'</code>', 'NgRx recommends <code>[Source] Event</code>: where it came from, and what happened. Easy to read in the devtools timeline.'],
            ar: ['نص الـ type بتاع action', '<code>\'[Todo List] Load Todos\'</code>', '<code>\'LOAD\'</code>', 'NgRx بينصح بـ <code>[Source] Event</code>: جه منين، وإيه اللي حصل. سهل تقراه في الخط الزمني بتاع الـ devtools.'] },
          { en: ['a selector', '<code>selectTodos</code>, <code>selectOpenCount</code>', '<code>getTodos</code>, <code>todosSelector</code>', 'The <code>select</code> prefix is the common NgRx habit.'],
            ar: ['selector', '<code>selectTodos</code> و<code>selectOpenCount</code>', '<code>getTodos</code> و<code>todosSelector</code>', 'البادئة <code>select</code> هي العادة المنتشرة في NgRx.'] },
          { en: ['the injected actions stream', '<code>actions$</code>', '<code>actions</code>', 'It is an observable; the <code>$</code> says so. Only a habit.'],
            ar: ['الـ stream بتاع الـ actions', '<code>actions$</code>', '<code>actions</code>', 'ده observable؛ والـ <code>$</code> بتقول كده. مجرد عادة.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Where a name looks free but must copy another', ar: 'فين الاسم شكله براحتك بس لازم ينسخ اسم تاني' },
    lead: {
      en: 'Three spots in a SignalStore look like you are choosing a name. You are not; you are repeating one.',
      ar: 'فيه تلات أماكن في الـ SignalStore شكلك فيهم بتختار اسم. انت مش بتختار؛ انت بتكرر اسم.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'Destructuring in <code>withComputed</code>', ar: 'الفك في <code>withComputed</code>' }, blocks: [
        { t: 'pair',
          bad:  { name: 'todos.store.ts · not a key', lang: 'ts', code: ['withComputed(({ items }) => ({', '  openCount: computed(() => items().filter(t => !t.done).length),', '})),'] },
          good: { name: 'todos.store.ts · the key', lang: 'ts', code: ['withComputed(({ todos }) => ({', '  openCount: computed(() => todos().filter(t => !t.done).length),', '})),'] } },
        { t: 'p', en: 'The object NgRx passes has one signal per state key. There is no <code>items</code>, so the first version is a compile error. If you want another local name, write <code>({ todos: items })</code>.',
                  ar: 'الـ object اللي NgRx بيبعته فيه signal لكل مفتاح state. مفيش <code>items</code>، فالنسخة الأولى compile error. لو عايز اسم محلي تاني، اكتب <code>({ todos: items })</code>.' }
      ]},
      { t: 'step', n: 'B', title: { en: 'Keys in <code>patchState</code>', ar: 'المفاتيح في <code>patchState</code>' }, blocks: [
        { t: 'pair',
          bad:  { name: 'todos.store.ts · unknown key', lang: 'ts', code: ['patchState(store, { loading: true });'] },
          good: { name: 'todos.store.ts · state key', lang: 'ts', code: ['patchState(store, { busy: true });'] } },
        { t: 'p', en: '<code>patchState</code> only accepts keys that exist in <code>withState</code>. <code>loading</code> is not one of them: compile error. You cannot add state by patching it; add the key to <code>withState</code> first.',
                  ar: '<code>patchState</code> بيقبل بس المفاتيح اللي موجودة في <code>withState</code>. و<code>loading</code> مش منهم: compile error. مينفعش تضيف state عن طريق الـ patch؛ ضيف المفتاح في <code>withState</code> الأول.' }
      ]},
      { t: 'step', n: 'C', title: { en: 'Shorthand ties a parameter to a key', ar: 'الاختصار بيربط parameter بمفتاح' }, blocks: [
        { t: 'pair',
          bad:  { name: 'todos.store.ts · renamed parameter', lang: 'ts', code: ['setFilter(f: Filter) {', '  patchState(store, { f });', '},'] },
          good: { name: 'todos.store.ts · explicit key', lang: 'ts', code: ['setFilter(f: Filter) {', '  patchState(store, { filter: f });', '},'] } },
        { t: 'p', en: '<code>{ filter }</code> means <code>{ filter: filter }</code>. It only works while the parameter has the same name as the key. Rename the parameter and you must spell the key out. The first version is a compile error, because <code>f</code> is not a state key.',
                  ar: '<code>{ filter }</code> معناها <code>{ filter: filter }</code>. بتشتغل بس طول ما الـ parameter اسمه زي المفتاح. غيّر اسم الـ parameter ولازم تكتب المفتاح صريح. والنسخة الأولى compile error، عشان <code>f</code> مش مفتاح state.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: 'Classic NgRx: more files, same rule', ar: 'NgRx الكلاسيك: ملفات أكتر، ونفس القاعدة' },
    lead: {
      en: 'Before SignalStore, the same feature took actions, a reducer, selectors and an effect. There are more names, and more of them are shared between files, but the rule does not change: NgRx’s words are blue, and every name you invent is typed wherever it is used.',
      ar: 'قبل الـ SignalStore، نفس الفيتشر كان محتاج actions وreducer وselectors وeffect. الأسماء أكتر، وأكتر منها متشارك بين الملفات، بس القاعدة مابتتغيرش: كلمات NgRx زرقا، وأي اسم انت بتخترعه بيتكتب في كل مكان بيتستخدم فيه.'
    },
    blocks: [
      { t: 'code', name: 'todos.actions.ts', lang: 'ts', tag: { en: 'what happened', ar: 'اللي حصل' }, code: [
        "export const loadTodos = createAction('[Todo List] Load Todos');",
        'export const loadTodosSuccess = createAction(',
        "  '[Todo API] Load Todos Success',",
        '  props<{ todos: Todo[] }>(),',
        ');' ] },
      { t: 'code', name: 'todos.reducer.ts', lang: 'ts', tag: { en: 'the new state', ar: 'الـ state الجديدة' }, code: [
        'export interface TodosState {',
        '  todos: Todo[];',
        '  busy: boolean;',
        '}',
        '',
        'const initialState: TodosState = { todos: [], busy: false };',
        '',
        'export const todosReducer = createReducer(',
        '  initialState,',
        '  on(loadTodos, state => ({ ...state, busy: true })),',
        '  on(loadTodosSuccess, (state, { todos }) => ({ ...state, todos, busy: false })),',
        ');' ] },
      { t: 'code', name: 'todos.selectors.ts', lang: 'ts', tag: { en: 'the reads', ar: 'القراية' }, code: [
        "export const selectTodosState = createFeatureSelector<TodosState>('todoPage');",
        'export const selectTodos = createSelector(selectTodosState, state => state.todos);',
        'export const selectOpenCount = createSelector(',
        '  selectTodos,',
        '  todos => todos.filter(t => !t.done).length,',
        ');' ] },
      { t: 'code', name: 'todos.effects.ts', lang: 'ts', tag: { en: 'the server call', ar: 'نداية السيرفر' }, code: [
        'export const loadTodosEffect = createEffect(',
        '  (actions$ = inject(Actions), api = inject(TodoApi)) =>',
        '    actions$.pipe(',
        '      ofType(loadTodos),',
        '      switchMap(() => api.getAll().pipe(',
        '        map(todos => loadTodosSuccess({ todos })),',
        '      )),',
        '    ),',
        '  { functional: true },',
        ');' ] },
      { t: 'code', name: 'app.config.ts', lang: 'ts', tag: { en: 'registration', ar: 'التسجيل' }, code: [
        'export const appConfig: ApplicationConfig = {',
        '  providers: [',
        '    provideStore({ todoPage: todosReducer }),',
        '    provideEffects({ loadTodosEffect }),',
        '  ],',
        '};' ] },
      { t: 'code', name: 'todo-list.ts · classic', lang: 'ts', tag: { en: 'the component', ar: 'الـ component' }, code: [
        'export class TodoList implements OnInit {',
        '  private readonly store = inject(Store);',
        '  protected readonly items = this.store.selectSignal(selectTodos);',
        '  protected readonly remaining = this.store.selectSignal(selectOpenCount);',
        '',
        '  ngOnInit() {',
        '    this.store.dispatch(loadTodos());',
        '  }',
        '}' ] },
      { t: 'tbl',
        head: { en: ['Name you invent', 'Typed again in'], ar: ['الاسم اللي بتخترعه', 'بيتكتب تاني في'] },
        rows: [
          { en: [pub('loadTodos'), 'the reducer’s <code>on</code>, the effect’s <code>ofType</code>, the component’s <code>dispatch</code>'],
            ar: [pub('loadTodos'), '<code>on</code> في الـ reducer، و<code>ofType</code> في الـ effect، و<code>dispatch</code> في الـ component'] },
          { en: [pub('loadTodosSuccess'), 'the reducer (handles it) and the effect (creates it)'],
            ar: [pub('loadTodosSuccess'), 'الـ reducer (بيتعامل معاه) والـ effect (بيعمله)'] },
          { en: [pub('todoPage'), 'the key in <code>provideStore</code> and the string in <code>createFeatureSelector</code>'],
            ar: [pub('todoPage'), 'المفتاح في <code>provideStore</code> والنص في <code>createFeatureSelector</code>'] },
          { en: [`${pub('selectTodos')}, ${pub('selectOpenCount')}`, 'each component’s <code>selectSignal</code>'],
            ar: [`${pub('selectTodos')} و${pub('selectOpenCount')}`, '<code>selectSignal</code> في كل component'] },
          { en: [`${pub('todosReducer')}, ${pub('loadTodosEffect')}`, 'the app config'],
            ar: [`${pub('todosReducer')} و${pub('loadTodosEffect')}`, 'إعدادات التطبيق'] },
        ] },
      { t: 'p', en: 'Inside classic NgRx there is an older reading style too. Only the component line and the template change:',
                ar: 'وجوه NgRx الكلاسيك فيه طريقة قراية أقدم كمان. اللي بيتغير بس سطر الـ component والتمبلت:' },
      { t: 'pair',
        bad:  { name: 'todo-list · with async', lang: 'html', code: [
          '<!-- ts: readonly items$ = this.store.select(selectTodos); -->',
          '@for (t of (items$ | async) ?? []; track t.id) {',
          '  <li>{{ t.title }}</li>',
          '}' ] },
        good: { name: 'todo-list · with selectSignal', lang: 'html', code: [
          '<!-- ts: readonly items = this.store.selectSignal(selectTodos); -->',
          '@for (t of items(); track t.id) {',
          '  <li>{{ t.title }}</li>',
          '}' ] } },
      { t: 'code', name: 'todo-list.ts · with async', lang: 'ts', tag: { en: 'the older field', ar: 'الـ field القديم' }, code: [
        'protected readonly items$ = this.store.select(selectTodos);' ] }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, or something strange', ar: 'مش بيعمل حاجة، أو بيعمل حاجة غريبة' },
    title: { en: 'Mistakes that fail silently, or confusingly', ar: 'غلطات بتفشل في صمت، أو بشكل ملخبط' },
    lead: {
      en: 'The types catch most renames. They cannot catch a name held in a string, a missing registration, or a hook Angular never calls.',
      ar: 'الـ types بتمسك أغلب التغييرات. بس مابتقدرش تمسك اسم محطوط في نص، ولا تسجيل ناقص، ولا hook أنجولار عمره ما بيناديه.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'A misspelled lifecycle hook', ar: 'lifecycle hook مكتوب غلط' }, blocks: [
        { t: 'pair',
          bad:  { name: 'todo-list.ts · no interface', lang: 'ts', code: ['export class TodoList {', '  ngOninit() {', '    this.store.load();', '  }', '}'] },
          good: { name: 'todo-list.ts · with OnInit', lang: 'ts', code: ['export class TodoList implements OnInit {', '  ngOnInit() {', '    this.store.load();', '  }', '}'] } },
        { t: 'p', en: 'Angular only calls a method named exactly <code>ngOnInit</code>. <code>ngOninit</code> is just a method nobody calls, so the list stays empty and nothing complains. Adding <code>implements OnInit</code> turns the typo into a compile error.',
                  ar: 'أنجولار بينادي بس ميثود اسمها <code>ngOnInit</code> بالظبط. <code>ngOninit</code> مجرد ميثود محدش بيناديها، فالليستة بتفضل فاضية ومحدش بيشتكي. ولما تضيف <code>implements OnInit</code> الغلطة الإملائية بتبقى compile error.' }
      ]},
      { t: 'step', n: '2', title: { en: 'An effect you never registered', ar: 'effect عمرك ما سجّلته' }, blocks: [
        { t: 'pair',
          bad:  { name: 'app.config.ts · missing', lang: 'ts', code: ['providers: [', '  provideStore({ todoPage: todosReducer }),', '],'] },
          good: { name: 'app.config.ts · registered', lang: 'ts', code: ['providers: [', '  provideStore({ todoPage: todosReducer }),', '  provideEffects({ loadTodosEffect }),', '],'] } },
        { t: 'p', en: 'The component dispatches <code>loadTodos</code>, the reducer sets <code>busy: true</code>, and then nothing. The effect that would call the server is just an unused constant. The page says “Loading…” forever.',
                  ar: 'الـ component بيبعت <code>loadTodos</code>، والـ reducer بيخلّي <code>busy: true</code>، وبعدين ولا حاجة. الـ effect اللي كان المفروض ينادي السيرفر مجرد constant محدش بيستخدمه. والصفحة بتقول «Loading…» على طول.' }
      ]},
      { t: 'step', n: '3', title: { en: 'A feature key that does not match', ar: 'feature key مش مطابق' }, blocks: [
        { t: 'pair',
          bad:  { name: 'todos.selectors.ts · wrong key', lang: 'ts', code: ["createFeatureSelector<TodosState>('todos');"] },
          good: { name: 'todos.selectors.ts · same key', lang: 'ts', code: ["createFeatureSelector<TodosState>('todoPage');"] } },
        { t: 'p', en: 'The string is not checked against <code>provideStore</code>. The feature selector returns <code>undefined</code> (NgRx logs a warning in development), and the next selector that reads <code>state.todos</code> throws at runtime, far away from the real mistake.',
                  ar: 'النص ده مش بيتشيّك قصاد <code>provideStore</code>. الـ feature selector بيرجّع <code>undefined</code> (وNgRx بيكتب warning في الـ development)، وأول selector بعده بيقرا <code>state.todos</code> بيرمي error وقت التشغيل، بعيد خالص عن الغلطة الحقيقية.' }
      ]},
      { t: 'step', n: '4', title: { en: 'Dispatching the creator instead of an action', ar: 'إنك تبعت الـ creator بدل الـ action' }, blocks: [
        { t: 'pair',
          bad:  { name: 'todo-list.ts', lang: 'ts', code: ['this.store.dispatch(loadTodos);'] },
          good: { name: 'todo-list.ts', lang: 'ts', code: ['this.store.dispatch(loadTodos());'] } },
        { t: 'p', en: '<code>loadTodos</code> is a function that <b>makes</b> an action; <code>loadTodos()</code> is the action. NgRx’s types reject the first one, but the compile error reads “Functions are not allowed to be dispatched”, which is confusing until you know it means “you forgot the brackets”.',
                  ar: '<code>loadTodos</code> function <b>بتعمل</b> action؛ و<code>loadTodos()</code> هي الـ action نفسها. الـ types بتاعة NgRx بترفض الأولى، بس الـ compile error بيقول «Functions are not allowed to be dispatched»، وده ملخبط لحد ما تعرف إن معناه «نسيت القوسين».' }
      ]},
      { t: 'step', n: '5', title: { en: 'A second copy of the store', ar: 'نسخة تانية من الـ store' }, blocks: [
        { t: 'pair',
          bad:  { name: 'todo-list.ts · own copy', lang: 'ts', code: ['@Component({', "  selector: 'app-todo-list',", '  providers: [TodosStore],', '})'] },
          good: { name: 'todo-list.ts · shared', lang: 'ts', code: ['@Component({', "  selector: 'app-todo-list',", '', '})'] } },
        { t: 'p', en: 'The store says <code>providedIn: \'root\'</code>. Listing it again in a component’s <code>providers</code> gives that component its own, separate store. Two parts of the page then show different data, with no error.',
                  ar: 'الـ store مكتوب فيه <code>providedIn: \'root\'</code>. لو كتبته تاني في <code>providers</code> بتاعة component، الـ component ده بياخد store خاص بيه، منفصل. وساعتها جزئين من الصفحة بيعرضوا داتا مختلفة، من غير أي error.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it does nothing', ar: 'لما مايعملش حاجة' },
    title: { en: 'Five questions, in this order', ar: 'خمس أسئلة، بالترتيب ده' },
    lead: {
      en: 'The list stays empty, or the spinner never stops. Ask these first.',
      ar: 'الليستة فاضية، أو الـ loading مش بيقف. اسأل دول الأول.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Does the loading method run at all? Check the hook is spelled <code>ngOnInit</code> and the class says <code>implements OnInit</code>.',
                  ar: '<b>1.</b> ميثود التحميل أصلًا بتشتغل؟ اتأكد إن الـ hook مكتوب <code>ngOnInit</code> والكلاس مكتوب فيه <code>implements OnInit</code>.' },
      { t: 'chk', en: '<b>2.</b> Does the template call the signals with brackets: <code>store.openCount()</code>?',
                  ar: '<b>2.</b> التمبلت بينادي الـ signals بالقوسين: <code>store.openCount()</code>؟' },
      { t: 'chk', en: '<b>3.</b> Classic NgRx: is the effect listed in <code>provideEffects</code>, and is <code>dispatch</code> given <code>loadTodos()</code> with brackets?',
                  ar: '<b>3.</b> في NgRx الكلاسيك: الـ effect مكتوب في <code>provideEffects</code>، و<code>dispatch</code> واخدة <code>loadTodos()</code> بالقوسين؟' },
      { t: 'chk', en: '<b>4.</b> Classic NgRx: does the string in <code>createFeatureSelector</code> match the key in <code>provideStore</code>?',
                  ar: '<b>4.</b> في NgRx الكلاسيك: النص اللي في <code>createFeatureSelector</code> مطابق للمفتاح اللي في <code>provideStore</code>؟' },
      { t: 'chk', en: '<b>5.</b> Is there only one store? Search for <code>providers: [TodosStore]</code> in components.',
                  ar: '<b>5.</b> فيه store واحد بس؟ دوّر على <code>providers: [TodosStore]</code> في الـ components.' }
    ]
  }
  ]
};
