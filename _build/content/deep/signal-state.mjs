/* ==================================================================
   A signal store, name by name — the deep dive after the signal-based
   state topic. One running example (a to-do store read by two
   components) followed through every file, every name coloured.
   ================================================================== */

const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

export default {
  topic: 'signal-state',
  tab: 'A signal store, name by name — The Angular Signal',
  title: { en: 'A signal store, name by name', ar: 'الـ signal store، اسم اسم' },
  say: {
    en: 'One to-do store followed from a click in one component to a number changing in another. Every name coloured by who owns it, and the one keyword that decides whether a name is private or shared: <code>private</code>.',
    ar: 'store واحد للـ to-do ماشيين وراه من كليك في component لحد رقم بيتغير في component تاني. كل اسم ملوّن حسب صاحبه، والكلمة الوحيدة اللي بتحدد الاسم خاص ولا متشارك: <code>private</code>.'
  },
  lead: {
    en: 'The idea is simple: <b>the data lives in one service, components read it, and only the service’s own methods change it.</b> The confusing part is the names. The same word shows up as <code>_todos</code> and <code>todos</code>, the component calls the service <code>store</code>, and a method you wrote in one file is called from a template in another. This page shows which names are yours alone, which ones every component types, and which ones are Angular’s.',
    ar: 'الفكرة بسيطة: <b>الداتا عايشة في service واحدة، والـ components بتقراها، وميثودز الـ service نفسها بس هي اللي بتغيّرها.</b> اللي بيلخبط هو الأسماء. نفس الكلمة بتظهر كـ <code>_todos</code> وكـ <code>todos</code>، والـ component بيسمّي الـ service <code>store</code>، وميثود انت كاتبها في ملف بتتنادى من تمبلت في ملف تاني. الصفحة دي بتوريك أنهي أسماء بتاعتك لوحدك، وأنهي أسماء كل component بيكتبها، وأنهي أسماء بتاعة أنجولار.'
  },

  names: {
    note: {
      en: 'In a store the line between <b>green</b> and <b>orange</b> is the word <code>private</code>. Private signals are the store’s alone. Every public signal, computed and method is typed by the components that use it, so renaming one means renaming it in every template that calls it.',
      ar: 'في الـ store الحد بين <b>الأخضر</b> و<b>البرتقاني</b> هو كلمة <code>private</code>. الـ signals الخاصة بتاعة الـ store لوحده. وأي signal أو computed أو ميثود public الـ components اللي بتستخدمها بتكتبها، فلو غيّرت اسم واحدة لازم تغيّره في كل تمبلت بيناديها.'
    },
    names: [
      /* --- shared: the store and its components must agree --- */
      { n:'TodosStore', k:'pub', w:{ en:'Your store class. Every component that injects it types this name.', ar:'كلاس الـ store بتاعك. أي component بيعمله inject بيكتب الاسم ده.' } },
      { n:'Todo', k:'pub', w:{ en:'Your data type, imported by the store.', ar:'نوع الداتا بتاعك، والـ store بيعمله import.' } },
      { n:'Filter', k:'pub', w:{ en:'Your type for the filter values. Templates must pass one of its strings.', ar:'النوع بتاعك لقيم الفلتر. التمبلتس لازم تبعت واحد من النصوص بتاعته.' } },
      { n:'todos', k:'pub', re:'(?<![\\w$/#-])todos(?![\\w$-])', w:{ en:'The public read-only view. Components read <code>store.todos()</code>.', ar:'الـ view الـ public اللي للقراية بس. الـ components بتقرا <code>store.todos()</code>.' } },
      { n:'todos$', k:'pub', w:{ en:'The older store’s public stream. Components read it with the <code>async</code> pipe.', ar:'الـ stream الـ public بتاع الـ store القديم. الـ components بتقراه بالـ pipe <code>async</code>.' } },
      { n:'visible', k:'pub', w:{ en:'A public computed: the todos that pass the filter. The list template reads it.', ar:'computed public: الـ todos اللي بتعدّي الفلتر. تمبلت الليستة بيقراها.' } },
      { n:'openCount', k:'pub', w:{ en:'A public computed, read by the counter component.', ar:'computed public، والـ component بتاع العدّاد بيقراها.' } },
      { n:'setFilter', k:'pub', w:{ en:'A public method. The list template calls <code>store.setFilter(…)</code>.', ar:'ميثود public. تمبلت الليستة بينادي <code>store.setFilter(…)</code>.' } },
      { n:'add', k:'pub', w:{ en:'A public method, called by the list template.', ar:'ميثود public، وتمبلت الليستة بيناديها.' } },
      { n:'toggle', k:'pub', w:{ en:'A public method, called by the list template.', ar:'ميثود public، وتمبلت الليستة بيناديها.' } },
      { n:'id', k:'pub', w:{ en:'A field of <code>Todo</code>, read by the store and by <code>track</code>.', ar:'field في <code>Todo</code>، الـ store والـ <code>track</code> بيقروه.' } },
      { n:'title', k:'pub', w:{ en:'A field of <code>Todo</code>, shown by the list template.', ar:'field في <code>Todo</code>، وتمبلت الليستة بيعرضه.' } },
      { n:'done', k:'pub', re:'(?<![\\w$\'-])done(?![\\w$\'-])',
        w:{ en:'A field of <code>Todo</code>. The string <code>\'done\'</code> is a filter value, a different thing.', ar:'field في <code>Todo</code>. والنص <code>\'done\'</code> قيمة فلتر، حاجة تانية.' } },
      { n:'TodoList', k:'pub', w:{ en:'The list component’s class. Whoever shows it imports this name.', ar:'كلاس component الليستة. أي حد بيعرضه بيعمل import بالاسم ده.' } },
      { n:'TodoCount', k:'pub', w:{ en:'The counter component’s class.', ar:'كلاس component العدّاد.' } },
      { n:'app-todo-list', k:'pub', w:{ en:'The list’s selector, typed by a parent template.', ar:'الـ selector بتاع الليستة، وتمبلت الأب بيكتبه.' } },
      { n:'app-todo-count', k:'pub', w:{ en:'The counter’s selector, typed by a parent template.', ar:'الـ selector بتاع العدّاد، وتمبلت الأب بيكتبه.' } },

      /* --- yours, private to one file or one component --- */
      { n:'_todos', k:'mine', w:{ en:'The private writable signal. Only the store touches it. The <code>_</code> is just a habit.', ar:'الـ signal الخاصة اللي بتتكتب. الـ store بس اللي بيلمسها. والـ <code>_</code> مجرد عادة.' } },
      { n:'#todos', k:'mine', w:{ en:'The same private signal, using JavaScript’s own <code>#</code> private field instead of the <code>private</code> keyword.', ar:'نفس الـ signal الخاصة، بس بالـ <code>#</code> بتاع JavaScript نفسه بدل كلمة <code>private</code>.' } },
      { n:'_filter', k:'mine', w:{ en:'A private writable signal.', ar:'signal خاصة بتتكتب.' } },
      { n:'store', k:'mine', re:'(?<![\\w$-])(?<!todos\\.)store(?![\\w$-])', w:{ en:'Each component’s own field name for the injected store. Its template reads <code>store.…</code>, still inside that component.', ar:'اسم الـ field اللي كل component مسمّي بيه الـ store. والتمبلت بتاعه بيقرا <code>store.…</code>، وده برضه جوه نفس الـ component.' } },
      { n:'todoId', k:'mine', w:{ en:'The parameter of <code>toggle</code>. The template passes <code>t.id</code>; the store calls it whatever it likes.', ar:'الـ parameter بتاع <code>toggle</code>. التمبلت بيبعت <code>t.id</code>؛ والـ store بيسمّيه اللي هو عايزه.' } },
      { n:'text', k:'mine', w:{ en:'The parameter of <code>add</code>.', ar:'الـ parameter بتاع <code>add</code>.' } },
      { n:'f', k:'mine', w:{ en:'A local name for the filter value.', ar:'اسم محلي لقيمة الفلتر.' } },
      { n:'list', k:'mine', w:{ en:'The arrow function’s parameter: the current array.', ar:'الـ parameter بتاع الـ arrow function: الـ array الحالية.' } },
      { n:'t', k:'mine', w:{ en:'A loop variable in the template, and an arrow parameter in the store. Both local.', ar:'متغير لوب في التمبلت، وparameter في arrow جوه الـ store. الاتنين محليين.' } },
      { n:'count', k:'mine', w:{ en:'A field on the counter component.', ar:'field في component العدّاد.' } },
      { n:'#box', k:'mine', as:'pickle', re:'(?<=#)box(?![\\w$-])|(?<![\\w$.#-])box(?=\\.)',
        w:{ en:'A template reference to the text box. Rename <code>#box</code> and every <code>box.</code> in the same template.', ar:'template reference لخانة الكتابة. غيّر <code>#box</code> وكل <code>box.</code> في نفس التمبلت.' } },

      /* --- Angular’s, TypeScript’s, JavaScript’s, the browser’s --- */
      { n:'@Injectable', k:'ng', w:{ en:'Angular’s decorator for a service.', ar:'الـ decorator بتاع أنجولار للـ service.' } },
      { n:'providedIn', k:'ng', w:{ en:'An option key Angular reads.', ar:'مفتاح إعداد أنجولار بيقراه.' } },
      { n:'root', k:'ng', re:'(?<=\')root(?=\')', w:{ en:'Angular’s fixed value: one shared store for the whole app.', ar:'قيمة ثابتة من أنجولار: store واحد متشارك للتطبيق كله.' } },
      { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
      { n:'computed', k:'ng', w:{ en:'Angular’s derived, read-only signal.', ar:'الـ signal المشتقة بتاعة أنجولار، للقراية بس.' } },
      { n:'asReadonly', k:'ng', w:{ en:'A signal method: the same value, without <code>set</code> or <code>update</code>.', ar:'ميثود في الـ signal: نفس القيمة، من غير <code>set</code> ولا <code>update</code>.' } },
      { n:'set', k:'ng', w:{ en:'A signal method: replace the value.', ar:'ميثود في الـ signal: بدّل القيمة.' } },
      { n:'update', k:'ng', w:{ en:'A signal method: compute the new value from the old one.', ar:'ميثود في الـ signal: احسب القيمة الجديدة من القديمة.' } },
      { n:'inject', k:'ng', w:{ en:'Angular’s function that hands you a service.', ar:'الـ function بتاعة أنجولار اللي بتديك service.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator.', ar:'الـ decorator بتاع أنجولار.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The string after it is yours.', ar:'مفتاح إعداد. النص اللي بعده بتاعك.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key. The path after it points at your file.', ar:'مفتاح إعداد. المسار اللي بعده بيشاور على ملفك.' } },
      { n:'template', k:'ng', w:{ en:'An option key: the template written inline.', ar:'مفتاح إعداد: التمبلت مكتوب في نفس الملف.' } },
      { n:'providers', k:'ng', w:{ en:'An option key: services this component creates its own copy of.', ar:'مفتاح إعداد: services الـ component ده بيعمل نسخة خاصة بيه منها.' } },
      { n:'filter', k:'ng', re:'(?<=\\.)filter(?=\\()', w:{ en:'JavaScript’s array method.', ar:'ميثود الـ array بتاعة JavaScript.' } },
      { n:'map', k:'ng', re:'(?<=\\.)map(?=\\()', w:{ en:'JavaScript’s array method.', ar:'ميثود الـ array بتاعة JavaScript.' } },
      { n:'crypto', k:'ng', w:{ en:'The browser’s crypto object.', ar:'الـ object بتاع الـ crypto في المتصفح.' } },
      { n:'randomUUID', k:'ng', w:{ en:'The browser’s function for a unique id.', ar:'الـ function بتاعة المتصفح اللي بتعمل id فريد.' } },
      { n:'BehaviorSubject', k:'ng', w:{ en:'RxJS’s stream that always holds a current value.', ar:'الـ stream بتاع RxJS اللي دايمًا شايل قيمة حالية.' } },
      { n:'asObservable', k:'ng', w:{ en:'The RxJS method that hides <code>next</code> from outsiders.', ar:'ميثود RxJS اللي بتخبّي <code>next</code> عن اللي برّه.' } },
      { n:'next', k:'ng', w:{ en:'The RxJS method that pushes a new value.', ar:'ميثود RxJS اللي بتدخّل قيمة جديدة.' } },
      { n:'value', k:'ng', w:{ en:'Not yours either way: the DOM input’s text, or a <code>BehaviorSubject</code>’s current value.', ar:'مش بتاعك في الحالتين: الكلام اللي في الـ input في الـ DOM، أو القيمة الحالية في <code>BehaviorSubject</code>.' } },
      { n:'click', k:'ng', w:{ en:'The browser’s event name.', ar:'اسم الـ event بتاع المتصفح.' } },
      { n:'@for', k:'ng', w:{ en:'Angular’s loop block.', ar:'بلوك اللوب بتاع أنجولار.' } },
      { n:'track', k:'ng', w:{ en:'Part of <code>@for</code>.', ar:'جزء من <code>@for</code>.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One click, six stops, two components', ar: 'كليك واحدة، ست محطات، اتنين components' },
    lead: {
      en: 'A to-do list and, somewhere else on the page, a counter that says how many are still open. They never talk to each other. Both talk to the same store. Follow one click on a to-do:',
      ar: 'ليستة to-do، وفي حتة تانية في الصفحة عدّاد بيقول لسه كام واحدة مفتوحة. الاتنين عمرهم ما بيكلموا بعض. الاتنين بيكلموا نفس الـ store. امشي ورا كليك واحدة على to-do:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'todo-list.html', lang: 'html', who: { en: 'list · asks', ar: 'الليستة · بتطلب' },
          code: ['<li (click)="store.toggle(t.id)">{{ t.title }}</li>'],
          say: { en: `${ng('click')} is the browser’s. ${mine('store')} is the list’s own name for the store. ${pub('toggle')} is a method <b>the store</b> wrote, so the list must copy its name exactly. The list does not change anything itself; it asks.`,
                 ar: `${ng('click')} بتاعة المتصفح. ${mine('store')} الاسم اللي الليستة مسمّية بيه الـ store. و${pub('toggle')} ميثود <b>الـ store</b> هو اللي كتبها، فالليستة لازم تنسخ اسمها بالظبط. الليستة مش بتغيّر حاجة بنفسها؛ هي بتطلب.` } },
        { file: 'todo-list.ts', lang: 'ts', who: { en: 'list · gets the store', ar: 'الليستة · بتجيب الـ store' },
          code: ['protected readonly store = inject(TodosStore);'],
          say: { en: `${ng('inject')} is Angular’s. ${pub('TodosStore')} is the class name you gave the store; every component that uses it types it. ${mine('store')} is a field name the list picked. Another component may call it something else.`,
                 ar: `${ng('inject')} بتاعة أنجولار. و${pub('TodosStore')} اسم الكلاس اللي انت اديته للـ store؛ أي component بيستخدمه بيكتبه. و${mine('store')} اسم field الليستة اختارته. component تاني ممكن يسمّيه اسم تاني.` } },
        { file: 'todos.store.ts', lang: 'ts', who: { en: 'store · the only writer', ar: 'الـ store · الكاتب الوحيد' },
          code: ['toggle(todoId: string) {', '  this._todos.update(list => list.map(t =>', '    t.id === todoId ? { ...t, done: !t.done } : t));', '}'],
          say: { en: `Inside the store. ${mine('todoId')} is the parameter’s name here; the list passed <code>t.id</code>, and that is fine. ${ng('update')} is Angular’s. ${mine('_todos')} is private, so only this file ever types it.`,
                 ar: `جوه الـ store. ${mine('todoId')} اسم الـ parameter هنا؛ الليستة بعتت <code>t.id</code>، وده عادي. و${ng('update')} بتاعة أنجولار. و${mine('_todos')} private، فالملف ده بس اللي بيكتبها.` } },
        { file: 'todos.store.ts', lang: 'ts', who: { en: 'store · the source', ar: 'الـ store · المصدر' },
          code: ['private readonly _todos = signal<Todo[]>([]);'],
          say: { en: `The one writable source. <code>private</code> is TypeScript’s keyword that keeps every other file out. That is exactly why ${mine('_todos')} is green: rename it and only this file changes.`,
                 ar: `المصدر الوحيد اللي بيتكتب. <code>private</code> كلمة TypeScript اللي بتمنع أي ملف تاني يوصله. وده بالظبط السبب إن ${mine('_todos')} أخضر: غيّره وهيتغير الملف ده بس.` } },
        { file: 'todos.store.ts', lang: 'ts', who: { en: 'store · derives', ar: 'الـ store · بيشتق' },
          code: ['readonly openCount = computed(() => this._todos().filter(t => !t.done).length);'],
          say: { en: `${ng('computed')} is Angular’s and recalculates by itself. ${pub('openCount')} is public, so it is orange: the counter component types it.`,
                 ar: `${ng('computed')} بتاعة أنجولار وبتتحسب لوحدها تاني. و${pub('openCount')} public، فهي برتقاني: component العدّاد بيكتبها.` } },
        { file: 'todo-count.ts', lang: 'ts', who: { en: 'counter · reads', ar: 'العدّاد · بيقرا' },
          code: ['template: `{{ store.openCount() }} of {{ store.todos().length }} open`,'],
          say: { en: `A different component, with its own ${mine('store')} field. It reads ${pub('openCount')} and ${pub('todos')} with brackets and updates on its own. It never heard about the click.`,
                 ar: `component تاني، ليه الـ field ${mine('store')} بتاعه. بيقرا ${pub('openCount')} و${pub('todos')} بالقوسين وبيتحدث لوحده. وعمره ما سمع عن الكليك.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'List: <code>store.toggle(t.id)</code>. Store: <code>_todos.update(…)</code>. Counter: <code>store.openCount()</code>. The components only share <b>public</b> names with the store: the class, its methods and its read-only signals. <code>_todos</code> never leaves the store.',
        ar: 'الليستة: <code>store.toggle(t.id)</code>. الـ store: <code>_todos.update(…)</code>. العدّاد: <code>store.openCount()</code>. الـ components متشاركين مع الـ store في الأسماء الـ <b>public</b> بس: الكلاس، والميثودز، والـ signals اللي للقراية. و<code>_todos</code> عمرها ما بتخرج برّه الـ store.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Store or component?', ar: 'الـ store ولا الـ component؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'The store picks every name that components use. Components only pick their own field for the store, and their own local variables.',
      ar: 'الـ store هو اللي بيختار كل اسم الـ components بتستخدمه. والـ components بتختار بس اسم الـ field بتاعها للـ store، والمتغيرات المحلية بتاعتها.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'], ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>private readonly _todos = signal(…)</code>', 'store', 'store', `the store picks ${mine('_todos')}; nobody else ever types it`],
            ar: ['<code>private readonly _todos = signal(…)</code>', 'الـ store', 'الـ store', `الـ store بيختار ${mine('_todos')}؛ ومحدش غيره بيكتبه`] },
          { en: ['<code>readonly todos = this._todos.asReadonly()</code>', 'store', 'store', `the store picks ${pub('todos')}; every reader copies it. ${ng('asReadonly')} is Angular’s`],
            ar: ['<code>readonly todos = this._todos.asReadonly()</code>', 'الـ store', 'الـ store', `الـ store بيختار ${pub('todos')}؛ وكل اللي بيقرا بينسخه. و${ng('asReadonly')} بتاعة أنجولار`] },
          { en: ['<code>readonly openCount = computed(…)</code>', 'store', 'store', `the store picks ${pub('openCount')}; every reader copies it`],
            ar: ['<code>readonly openCount = computed(…)</code>', 'الـ store', 'الـ store', `الـ store بيختار ${pub('openCount')}؛ وكل اللي بيقرا بينسخه`] },
          { en: ['<code>toggle(todoId: string) { … }</code>', 'store', 'store', `the store picks ${pub('toggle')} (shared) and ${mine('todoId')} (local)`],
            ar: ['<code>toggle(todoId: string) { … }</code>', 'الـ store', 'الـ store', `الـ store بيختار ${pub('toggle')} (متشارك) و${mine('todoId')} (محلي)`] },
          { en: ['<code>protected readonly store = inject(TodosStore)</code>', 'each component', 'each component', `each component picks its own ${mine('store')}; ${pub('TodosStore')} is copied`],
            ar: ['<code>protected readonly store = inject(TodosStore)</code>', 'كل component', 'كل component', `كل component بيختار ${mine('store')} بتاعه؛ و${pub('TodosStore')} منسوخ`] },
          { en: ['<code>(click)="store.toggle(t.id)"</code>', 'list <code>.html</code>', 'list', `copies ${pub('toggle')}; picks ${mine('t')}`],
            ar: ['<code>(click)="store.toggle(t.id)"</code>', '<code>.html</code> الليستة', 'الليستة', `بتنسخ ${pub('toggle')}؛ وبتختار ${mine('t')}`] },
        ] },
      { t: 'ul',
        en: ['<b>The store writes, components ask.</b> Only the store calls <code>set</code> or <code>update</code> on its signals. A component calls a method with a name the store chose.',
             '<b><code>private</code> is the line between green and orange.</b> Private names can be renamed inside one file. Public names are typed by every component that uses them.',
             '<b>The field name is each component’s own business.</b> The list calls it <code>store</code>; another component could call it <code>todos</code>. The store never knows.'],
        ar: ['<b>الـ store بيكتب، والـ components بتطلب.</b> الـ store بس اللي بينادي <code>set</code> أو <code>update</code> على الـ signals بتاعته. والـ component بينادي ميثود باسم الـ store اختاره.',
             '<b><code>private</code> هي الحد بين الأخضر والبرتقاني.</b> الأسماء الخاصة ينفع تتغير جوه ملف واحد. والأسماء الـ public كل component بيستخدمها بيكتبها.',
             '<b>اسم الـ field ده شغل كل component لوحده.</b> الليستة بتسمّيه <code>store</code>؛ وcomponent تاني ممكن يسمّيه <code>todos</code>. والـ store عمره ما بيعرف.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All five files, every name coloured', ar: 'الخمس ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same store and its two readers, complete. Hover a name to light up every place it appears. Then press <b>Rename test</b>: the private names change in one file only, the public ones in every file at once.',
      ar: 'نفس الـ store واللي بيقروه الاتنين، كاملين. قف بالماوس على أي اسم عشان تنوّر كل مكان هو فيه. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: الأسماء الخاصة بتتغير في ملف واحد بس، والـ public في كل الملفات مرة واحدة.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'todo.ts', lang: 'ts', tag: { en: 'the data', ar: 'الداتا' }, code: [
        'export interface Todo {',
        '  id: string;',
        '  title: string;',
        '  done: boolean;',
        '}' ] },
      { t: 'code', name: 'todos.store.ts', lang: 'ts', tag: { en: 'the store', ar: 'الـ store' }, code: [
        "import { Injectable, computed, signal } from '@angular/core';",
        "import { Todo } from './todo';",
        '',
        "export type Filter = 'all' | 'open' | 'done';",
        '',
        "@Injectable({ providedIn: 'root' })",
        'export class TodosStore {',
        '  // private: only this class can write',
        '  private readonly _todos = signal<Todo[]>([]);',
        "  private readonly _filter = signal<Filter>('all');",
        '',
        '  // public, read-only: components read these',
        '  readonly todos = this._todos.asReadonly();',
        '  readonly visible = computed(() => {',
        '    const f = this._filter();',
        "    return this._todos().filter(t => f === 'all' ? true : f === 'done' ? t.done : !t.done);",
        '  });',
        '  readonly openCount = computed(() => this._todos().filter(t => !t.done).length);',
        '',
        '  // public methods: the only ways to change anything',
        '  setFilter(f: Filter) {',
        '    this._filter.set(f);',
        '  }',
        '',
        '  add(text: string) {',
        '    this._todos.update(list => [...list, { id: crypto.randomUUID(), title: text, done: false }]);',
        '  }',
        '',
        '  toggle(todoId: string) {',
        '    this._todos.update(list => list.map(t =>',
        '      t.id === todoId ? { ...t, done: !t.done } : t));',
        '  }',
        '}' ] },
      { t: 'code', name: 'todo-list.ts', lang: 'ts', tag: { en: 'reader 1', ar: 'القارئ 1' }, code: [
        "import { Component, inject } from '@angular/core';",
        "import { TodosStore } from './todos.store';",
        '',
        '@Component({',
        "  selector: 'app-todo-list',",
        "  templateUrl: './todo-list.html',",
        '})',
        'export class TodoList {',
        '  protected readonly store = inject(TodosStore);',
        '}' ] },
      { t: 'code', name: 'todo-list.html', lang: 'html', tag: { en: 'reader 1', ar: 'القارئ 1' }, code: [
        '<input #box placeholder="What needs doing?" />',
        '<button (click)="store.add(box.value)">Add</button>',
        '',
        `<button (click)="store.setFilter('all')">All</button>`,
        `<button (click)="store.setFilter('open')">Open</button>`,
        `<button (click)="store.setFilter('done')">Done</button>`,
        '',
        '<ul>',
        '  @for (t of store.visible(); track t.id) {',
        '    <li (click)="store.toggle(t.id)">{{ t.title }}</li>',
        '  }',
        '</ul>' ] },
      { t: 'code', name: 'todo-count.ts', lang: 'ts', tag: { en: 'reader 2', ar: 'القارئ 2' }, code: [
        "import { Component, inject } from '@angular/core';",
        "import { TodosStore } from './todos.store';",
        '',
        '@Component({',
        "  selector: 'app-todo-count',",
        '  template: `{{ store.openCount() }} of {{ store.todos().length }} open`,',
        '})',
        'export class TodoCount {',
        '  protected readonly store = inject(TodosStore);',
        '}' ] },
      { t: 'nmtable' }
    ]
  },

  /* ------------------------------------------------------------ 4 */
  {
    id: 'rename',
    kicker: { en: 'Is it OK to change it?', ar: 'ينفع أغيّره؟' },
    title: { en: 'What breaks when you rename each name', ar: 'إيه اللي بيبوظ لما تغيّر كل اسم' },
    lead: {
      en: 'Good news: a store is one of the safest places to rename things. Templates are type-checked, so a public name you forgot to follow is a compile error, not a silent bug.',
      ar: 'خبر حلو: الـ store من أأمن الأماكن اللي تغيّر فيها أسماء. التمبلتس بيتعملها type-check، فالاسم الـ public اللي نسيت تغيّره وراه بيدي compile error، مش bug ساكت.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'], ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [`${pub('toggle')}, ${pub('add')}, ${pub('setFilter')} (methods)`, 'every template that calls <code>store.…</code>', 'Compile error in that template (with the default strict template checking).'],
            ar: [`${pub('toggle')} و${pub('add')} و${pub('setFilter')} (ميثودز)`, 'كل تمبلت بينادي <code>store.…</code>', 'Compile error في التمبلت ده (مع الـ strict template checking اللي شغال افتراضيًا).'] },
          { en: [`${pub('visible')}, ${pub('openCount')}, ${pub('todos')} (public signals)`, 'every template that reads them', 'Compile error in that template.'],
            ar: [`${pub('visible')} و${pub('openCount')} و${pub('todos')} (signals public)`, 'كل تمبلت بيقراهم', 'Compile error في التمبلت ده.'] },
          { en: [pub('TodosStore'), 'every <code>import</code> and <code>inject(…)</code>', 'Compile error on the import.'],
            ar: [pub('TodosStore'), 'كل <code>import</code> و<code>inject(…)</code>', 'Compile error في الـ import.'] },
          { en: [`${pub('id')}, ${pub('title')}, ${pub('done')} (fields)`, 'the store and every template that reads <code>t.…</code>', 'Compile error.'],
            ar: [`${pub('id')} و${pub('title')} و${pub('done')} (fields)`, 'الـ store وكل تمبلت بيقرا <code>t.…</code>', 'Compile error.'] },
          { en: ['a <code>Filter</code> value like <code>\'done\'</code>', 'every <code>setFilter(\'…\')</code> in templates', 'Compile error in the template: the string is not one of the allowed values.'],
            ar: ['قيمة في <code>Filter</code> زي <code>\'done\'</code>', 'كل <code>setFilter(\'…\')</code> في التمبلتس', 'Compile error في التمبلت: النص مش من القيم المسموحة.'] },
          { en: [`${mine('_todos')}, ${mine('_filter')} (private)`, 'only inside the store', 'Compile error inside the store. No other file can even see them.'],
            ar: [`${mine('_todos')} و${mine('_filter')} (خاصين)`, 'جوه الـ store بس', 'Compile error جوه الـ store. ومفيش ملف تاني يقدر يشوفهم أصلًا.'] },
          { en: [mine('store') + ' (a component’s field)', 'that one component’s template', 'Compile error in that template. Other components are not affected.'],
            ar: [mine('store') + ' (field في component)', 'تمبلت الـ component ده بس', 'Compile error في التمبلت ده. والـ components التانية مالهاش دعوة.'] },
          { en: [`${mine('todoId')}, ${mine('text')}, ${mine('f')}, ${mine('list')}, ${mine('t')}`, 'only the method or block they live in', 'Compile error right there.'],
            ar: [`${mine('todoId')} و${mine('text')} و${mine('f')} و${mine('list')} و${mine('t')}`, 'الميثود أو البلوك اللي عايشين فيه بس', 'Compile error في نفس المكان.'] },
          { en: [`${ng('signal')}, ${ng('computed')}, ${ng('asReadonly')}, ${ng('update')}`, 'nothing: you cannot rename these', 'They are Angular’s words.'],
            ar: [`${ng('signal')} و${ng('computed')} و${ng('asReadonly')} و${ng('update')}`, 'ولا حاجة: دول مينفعش يتغيروا', 'دي كلمات أنجولار.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b>. <code>_todos</code> changes only in <code>todos.store.ts</code>. <code>openCount</code> changes in the store <b>and</b> in <code>todo-count.ts</code>. That difference is the whole point of <code>private</code>.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b>. <code>_todos</code> بتتغير في <code>todos.store.ts</code> بس. و<code>openCount</code> بتتغير في الـ store <b>و</b>في <code>todo-count.ts</code>. والفرق ده هو كل فايدة <code>private</code>.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتوعك' },
    title: { en: 'Borrowed words, and the underscore that is only a habit', ar: 'كلمات مستلفة، والـ underscore اللي هي مجرد عادة' },
    lead: {
      en: 'A store is mostly your names. The borrowed ones are few, and each belongs to someone specific.',
      ar: 'الـ store أغلبه أسماء بتاعتك. والمستلفة قليلة، وكل واحدة ليها صاحب معيّن.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Name', 'Owner', 'What it means here'], ar: ['الاسم', 'صاحبه', 'معناه هنا'] },
        rows: [
          { en: [`${ng('signal')}, ${ng('computed')}, ${ng('asReadonly')}, ${ng('set')}, ${ng('update')}`, 'Angular', 'Create, derive, hide the setters, write.'],
            ar: [`${ng('signal')} و${ng('computed')} و${ng('asReadonly')} و${ng('set')} و${ng('update')}`, 'أنجولار', 'اعمل، اشتق، خبّي الـ setters، اكتب.'] },
          { en: [`${ng('@Injectable')}, ${ng('providedIn')}, ${ng('root')}`, 'Angular', 'One shared instance for the whole app.'],
            ar: [`${ng('@Injectable')} و${ng('providedIn')} و${ng('root')}`, 'أنجولار', 'نسخة واحدة متشاركة للتطبيق كله.'] },
          { en: ['<code>private</code>, <code>readonly</code>, <code>protected</code>', 'TypeScript', 'Keywords, not names. They decide who may touch a name.'],
            ar: ['<code>private</code> و<code>readonly</code> و<code>protected</code>', 'TypeScript', 'كلمات محجوزة، مش أسماء. هي اللي بتحدد مين يقدر يلمس الاسم.'] },
          { en: [`${ng('filter')}, ${ng('map')}`, 'JavaScript', 'Array methods. They return a <b>new</b> array, which is what signals need.'],
            ar: [`${ng('filter')} و${ng('map')}`, 'JavaScript', 'ميثودز الـ array. بترجّع array <b>جديدة</b>، ودي اللي الـ signals محتاجاها.'] },
          { en: [`${ng('crypto')}.${ng('randomUUID')}`, 'the browser', 'A unique id for each new to-do.'],
            ar: [`${ng('crypto')}.${ng('randomUUID')}`, 'المتصفح', 'id فريد لكل to-do جديدة.'] },
        ] },
      { t: 'p',
        en: 'The <b><code>_</code> in <code>_todos</code> belongs to nobody.</b> It is a habit that means “internal”. What actually protects the signal is the <code>private</code> keyword. JavaScript also has its own private fields, written with <code>#</code>. That is a real part of the name, not a habit:',
        ar: 'الـ <b><code>_</code> اللي في <code>_todos</code> مش بتاعة حد.</b> دي عادة معناها «داخلي». اللي بيحمي الـ signal فعلًا هي كلمة <code>private</code>. وJavaScript عنده كمان private fields بتاعته، بتتكتب بـ <code>#</code>. ودي جزء حقيقي من الاسم، مش عادة:' },
      { t: 'code', name: 'todos.store.ts · with #', lang: 'ts', tag: { en: 'same idea, JavaScript’s private', ar: 'نفس الفكرة، بالـ private بتاع JavaScript' }, code: [
        'readonly #todos = signal<Todo[]>([]);',
        'readonly todos = this.#todos.asReadonly();   // #todos and todos are two different names' ] },
      { t: 'note', label: { en: 'Remember', ar: 'افتكر' },
        en: 'With <code>#</code> you must type the <code>#</code> every time: <code>this.#todos</code>. With <code>_</code> the underscore is just a letter of the name, and <code>private</code> does the protecting.',
        ar: 'مع <code>#</code> لازم تكتب الـ <code>#</code> كل مرة: <code>this.#todos</code>. ومع <code>_</code> الـ underscore مجرد حرف في الاسم، و<code>private</code> هي اللي بتحمي.' }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'Angular accepts any of these. Good names make every change to your state easy to find with a search.',
      ar: 'أنجولار بيقبل أي حاجة فيهم. الأسماء الكويسة بتخلي أي تغيير في الحالة سهل تلاقيه بـ search.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['the store class', '<code>TodosStore</code>, <code>CartStore</code>', '<code>AppStore</code>, <code>DataService</code>', 'One store per feature, named for what it holds.'],
            ar: ['كلاس الـ store', '<code>TodosStore</code> و<code>CartStore</code>', '<code>AppStore</code> و<code>DataService</code>', 'store لكل feature، واسمه على اللي شايله.'] },
          { en: ['the private writable signal', '<code>_todos</code> or <code>#todos</code>', '<code>todosSignal</code>, <code>privateTodos</code>', 'Same word as the public view, plus a mark that says “internal”.'],
            ar: ['الـ signal الخاصة اللي بتتكتب', '<code>_todos</code> أو <code>#todos</code>', '<code>todosSignal</code> و<code>privateTodos</code>', 'نفس كلمة الـ view الـ public، وعلامة بتقول «داخلي».'] },
          { en: ['the public read-only view', '<code>todos</code>', '<code>getTodos()</code>, <code>todos$</code>', 'Components read <code>store.todos()</code>. A <code>$</code> would promise an observable.'],
            ar: ['الـ view الـ public اللي للقراية', '<code>todos</code>', '<code>getTodos()</code> و<code>todos$</code>', 'الـ components بتقرا <code>store.todos()</code>. والـ <code>$</code> هتوعد بـ observable.'] },
          { en: ['a computed', '<code>visible</code>, <code>openCount</code>, <code>isEmpty</code>', '<code>getOpenCount()</code>, <code>calcVisible</code>', 'It is a value, so name it like one. Booleans read well with <code>is</code> or <code>has</code>.'],
            ar: ['computed', '<code>visible</code> و<code>openCount</code> و<code>isEmpty</code>', '<code>getOpenCount()</code> و<code>calcVisible</code>', 'دي قيمة، فسمّيها زي القيمة. والـ booleans بتتقري أحسن بـ <code>is</code> أو <code>has</code>.'] },
          { en: ['a method', '<code>add</code>, <code>toggle</code>, <code>setFilter</code>', '<code>setTodos</code>, <code>updateState</code>', 'Name what the user did. <code>setTodos(anything)</code> is a public setter with extra steps.'],
            ar: ['ميثود', '<code>add</code> و<code>toggle</code> و<code>setFilter</code>', '<code>setTodos</code> و<code>updateState</code>', 'سمّي اللي المستخدم عمله. <code>setTodos(anything)</code> ده setter public بخطوات زيادة.'] },
          { en: ['the component’s field', '<code>store</code>', '<code>todosStoreService</code>', 'Short, because the template reads it on every line.'],
            ar: ['الـ field في الـ component', '<code>store</code>', '<code>todosStoreService</code>', 'قصير، عشان التمبلت بيقراه في كل سطر.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Three places where the name is not free', ar: 'تلات أماكن الاسم فيهم مش براحتك' },
    lead: {
      en: 'Most store names are pure choice. Three are pushed on you by TypeScript, by Angular, or by a type you wrote yourself.',
      ar: 'أغلب أسماء الـ store اختيار بحت. تلاتة منهم مفروضين عليك من TypeScript، أو من أنجولار، أو من type انت كاتبه بنفسك.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'Private and public need two different names', ar: 'الخاص والـ public محتاجين اسمين مختلفين' }, blocks: [
        { t: 'pair',
          bad:  { name: 'todos.store.ts · one name', lang: 'ts', code: [
            'private readonly todos = signal<Todo[]>([]);',
            'readonly todos = this.todos.asReadonly();' ] },
          good: { name: 'todos.store.ts · two names', lang: 'ts', code: [
            'private readonly _todos = signal<Todo[]>([]);',
            'readonly todos = this._todos.asReadonly();' ] } },
        { t: 'p', en: 'A class cannot have two members with the same name: “Duplicate identifier” at compile time. That rule is the only reason the underscore exists. The public name is the one you care about; the private one just needs to be different.',
                  ar: 'الكلاس مايقدرش يبقى فيه اتنين members بنفس الاسم: «Duplicate identifier» وقت الـ compile. والقاعدة دي هي السبب الوحيد إن الـ underscore موجودة. الاسم الـ public هو اللي يهمك؛ والخاص محتاج بس يبقى مختلف.' }
      ]},
      { t: 'step', n: 'B', title: { en: '<code>\'root\'</code> is Angular’s word', ar: '<code>\'root\'</code> كلمة أنجولار' }, blocks: [
        { t: 'p', en: `In <code>@Injectable({ providedIn: 'root' })</code> both the key ${ng('providedIn')} and the value ${ng('root')} are fixed. The value is a string, but not a free one: TypeScript only accepts the few values Angular allows, so <code>'Root'</code> is a compile error.`,
                  ar: `في <code>@Injectable({ providedIn: 'root' })</code> المفتاح ${ng('providedIn')} والقيمة ${ng('root')} الاتنين ثابتين. القيمة نص، بس مش نص براحتك: TypeScript بيقبل بس القيم القليلة اللي أنجولار بيسمح بيها، فـ <code>'Root'</code> تبقى compile error.` }
      ]},
      { t: 'step', n: 'C', title: { en: 'Your own type becomes the rule', ar: 'الـ type بتاعك بيبقى هو القاعدة' }, blocks: [
        { t: 'code', name: 'todos.store.ts · the type', lang: 'ts', tag: { en: 'you wrote the rule', ar: 'انت اللي كاتب القاعدة' }, code: [
          "export type Filter = 'all' | 'open' | 'done';",
          '',
          'setFilter(f: Filter) {',
          '  this._filter.set(f);',
          '}' ] },
        { t: 'p', en: `Once ${pub('Filter')} exists, <code>store.setFilter('finished')</code> in a template is a compile error. The strings looked free, but you fenced them in yourself. That is a good thing: a typo in a template cannot sneak past.`,
                  ar: `أول ما ${pub('Filter')} يبقى موجود، <code>store.setFilter('finished')</code> في تمبلت تبقى compile error. النصوص كان شكلها براحتك، بس انت اللي حطيت حواليها سور. وده حاجة كويسة: غلطة إملائية في التمبلت مش هتعدّي.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: 'The <code>BehaviorSubject</code> store uses the same shape', ar: 'الـ store بـ <code>BehaviorSubject</code> بيستخدم نفس الشكل' },
    lead: {
      en: 'Before signals, the same pattern was built with RxJS. Private writable source, public read-only view, methods to change it. Only the Angular and RxJS words change.',
      ar: 'قبل الـ signals، نفس النمط كان بيتعمل بـ RxJS. مصدر خاص بيتكتب، وview public للقراية، وميثودز للتغيير. اللي بيتغير بس كلمات أنجولار وRxJS.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'todos.store.ts · older', lang: 'ts', code: [
          'private readonly _todos = new BehaviorSubject<Todo[]>([]);',
          'readonly todos$ = this._todos.asObservable();',
          '',
          'toggle(todoId: string) {',
          '  this._todos.next(this._todos.value.map(t =>',
          '    t.id === todoId ? { ...t, done: !t.done } : t));',
          '}' ] },
        good: { name: 'todos.store.ts · today', lang: 'ts', code: [
          'private readonly _todos = signal<Todo[]>([]);',
          'readonly todos = this._todos.asReadonly();',
          '',
          'toggle(todoId: string) {',
          '  this._todos.update(list => list.map(t =>',
          '    t.id === todoId ? { ...t, done: !t.done } : t));',
          '}' ] } },
      { t: 'p',
        en: `${ng('BehaviorSubject')} plays ${ng('signal')}. ${ng('asObservable')} plays ${ng('asReadonly')}. ${ng('next')} plays ${ng('set')}. Your names stay where they were, except that the public view picks up a <code>$</code>: ${pub('todos$')}, read in templates with <code>store.todos$ | async</code> instead of <code>store.todos()</code>.`,
        ar: `${ng('BehaviorSubject')} بيلعب دور ${ng('signal')}. و${ng('asObservable')} دور ${ng('asReadonly')}. و${ng('next')} دور ${ng('set')}. والأسماء بتاعتك في مكانها، غير إن الـ view الـ public بياخد <code>$</code>: ${pub('todos$')}، وبيتقري في التمبلتس بـ <code>store.todos$ | async</code> بدل <code>store.todos()</code>.` }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, and says nothing', ar: 'مش بيعمل حاجة، ومش بيقول حاجة' },
    title: { en: 'Mistakes that fail silently', ar: 'غلطات بتفشل في صمت' },
    lead: {
      en: 'Renaming is safe in a store. These are the mistakes that are not: they compile, run, and quietly show the wrong thing.',
      ar: 'تغيير الأسماء آمن في الـ store. دي الغلطات اللي مش آمنة: بتعمل compile، وبتشتغل، وبتعرض الحاجة الغلط من غير صوت.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'Changing the array instead of replacing it', ar: 'إنك تعدّل الـ array بدل ما تبدّلها' }, blocks: [
        { t: 'pair',
          bad:  { name: 'todos.store.ts', lang: 'ts', code: [
            'add(text: string) {',
            '  this._todos.update(list => {',
            '    list.push({ id: crypto.randomUUID(), title: text, done: false });',
            '    return list;',
            '  });',
            '}' ] },
          good: { name: 'todos.store.ts', lang: 'ts', code: [
            'add(text: string) {',
            '  this._todos.update(list =>',
            '    [...list, { id: crypto.randomUUID(), title: text, done: false }]);',
            '}' ] } },
        { t: 'p', en: 'A signal compares the old value with the new one. <code>push</code> changes the same array and hands it back, so the signal sees “no change” and nothing re-renders. Always return a new array or object.',
                  ar: 'الـ signal بتقارن القيمة القديمة بالجديدة. <code>push</code> بتعدّل في نفس الـ array وترجّعها، فالـ signal بتشوف «مفيش تغيير» ومفيش حاجة بتترسم تاني. دايمًا رجّع array أو object جديد.' }
      ]},
      { t: 'step', n: '2', title: { en: 'Taking a copy once', ar: 'إنك تاخد نسخة مرة واحدة' }, blocks: [
        { t: 'pair',
          bad:  { name: 'todo-count.ts', lang: 'ts', code: ['readonly count = this.store.openCount();'] },
          good: { name: 'todo-count.ts', lang: 'ts', code: ['readonly count = this.store.openCount;'] } },
        { t: 'p', en: 'With brackets you read the number <b>once</b>, when the component is created, and store it. It never changes again. Keep the signal itself (no brackets) and call it in the template, or just read <code>store.openCount()</code> in the template directly.',
                  ar: 'بالقوسين انت بتقرا الرقم <b>مرة واحدة</b>، وقت ما الـ component بيتعمل، وبتخزّنه. وعمره ما بيتغير تاني. احتفظ بالـ signal نفسها (من غير قوسين) وناديها في التمبلت، أو اقرا <code>store.openCount()</code> في التمبلت على طول.' }
      ]},
      { t: 'step', n: '3', title: { en: 'Providing the store a second time', ar: 'إنك تعمل provide للـ store مرة تانية' }, blocks: [
        { t: 'pair',
          bad:  { name: 'todo-count.ts · own copy', lang: 'ts', code: [
            '@Component({',
            "  selector: 'app-todo-count',",
            '  providers: [TodosStore],',
            '  template: `{{ store.openCount() }} open`,',
            '})' ] },
          good: { name: 'todo-count.ts · shared', lang: 'ts', code: [
            '@Component({',
            "  selector: 'app-todo-count',",
            '',
            '  template: `{{ store.openCount() }} open`,',
            '})' ] } },
        { t: 'p', en: '<code>providers</code> on a component creates a <b>new</b> store for that component. The counter reads its own empty store and says “0 open” while the list has five. The store already says <code>providedIn: \'root\'</code>; do not provide it again.',
                  ar: '<code>providers</code> على component بتعمل store <b>جديد</b> للـ component ده. فالعدّاد بيقرا الـ store الفاضي بتاعه وبيقول «0 open» والليستة فيها خمسة. الـ store أصلًا مكتوب فيه <code>providedIn: \'root\'</code>؛ متعملوش provide تاني.' }
      ]},
      { t: 'step', n: '4', title: { en: 'Storing what you could compute', ar: 'إنك تخزّن حاجة كان ممكن تتحسب' }, blocks: [
        { t: 'pair',
          bad:  { name: 'todos.store.ts · stored count', lang: 'ts', code: [
            'readonly openCount = signal(0);',
            '',
            'toggle(todoId: string) {',
            '  // …update _todos, then remember to fix the count',
            '}' ] },
          good: { name: 'todos.store.ts · computed count', lang: 'ts', code: [
            'readonly openCount = computed(() =>',
            '  this._todos().filter(t => !t.done).length);',
            '',
            '' ] } },
        { t: 'p', en: 'A stored count is correct until the day one method forgets to update it. Then the counter drifts, silently. A <code>computed</code> cannot drift, because there is nothing to forget.',
                  ar: 'العدد المخزّن صح لحد اليوم اللي ميثود واحدة تنسى تحدّثه. وساعتها العدّاد بيبعد عن الحقيقة، من غير صوت. أما <code>computed</code> فمستحيل تبعد، عشان مفيش حاجة تتنسي.' }
      ]},
      { t: 'step', n: '5', title: { en: 'A public writable signal', ar: 'signal public بتتكتب' }, blocks: [
        { t: 'pair',
          bad:  { name: 'todos.store.ts · open door', lang: 'ts', code: ['readonly todos = signal<Todo[]>([]);'] },
          good: { name: 'todos.store.ts · read-only door', lang: 'ts', code: ['private readonly _todos = signal<Todo[]>([]);', 'readonly todos = this._todos.asReadonly();'] } },
        { t: 'p', en: 'Nothing fails, and that is the problem. Any component can now write <code>store.todos.set([])</code>, and when the list empties itself you have no method name to search for.',
                  ar: 'مفيش حاجة بتفشل، ودي المشكلة. أي component دلوقتي يقدر يكتب <code>store.todos.set([])</code>، ولما الليستة تفضى لوحدها مش هيبقى عندك اسم ميثود تدوّر عليه.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it does nothing', ar: 'لما مايعملش حاجة' },
    title: { en: 'Five questions, in this order', ar: 'خمس أسئلة، بالترتيب ده' },
    lead: {
      en: 'A component shows old data, or a click changes nothing on screen. Ask these first.',
      ar: 'component بيعرض داتا قديمة، أو كليك مش بتغيّر حاجة على الشاشة. اسأل دول الأول.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Does the template call the signal with brackets: <code>store.openCount()</code>?',
                  ar: '<b>1.</b> التمبلت بينادي الـ signal بالقوسين: <code>store.openCount()</code>؟' },
      { t: 'chk', en: '<b>2.</b> Does the component read the store live, or a value it copied once in a field?',
                  ar: '<b>2.</b> الـ component بيقرا من الـ store على طول، ولا من قيمة نسخها مرة واحدة في field؟' },
      { t: 'chk', en: '<b>3.</b> Does every <code>update</code> return a <b>new</b> array or object, never the old one changed in place?',
                  ar: '<b>3.</b> كل <code>update</code> بترجّع array أو object <b>جديد</b>، مش القديم بعد ما اتعدّل؟' },
      { t: 'chk', en: '<b>4.</b> Is there exactly one store? Search the project for <code>providers: [TodosStore]</code>.',
                  ar: '<b>4.</b> فيه store واحد بس؟ دوّر في المشروع على <code>providers: [TodosStore]</code>.' },
      { t: 'chk', en: '<b>5.</b> Does the method run at all? Put a <code>console.log</code> as its first line. Every change goes through a method, so there is always one place to look.',
                  ar: '<b>5.</b> الميثود أصلًا بتشتغل؟ حط <code>console.log</code> في أول سطر فيها. كل تغيير بيعدّي من ميثود، فدايمًا فيه مكان واحد تبص فيه.' }
    ]
  }
  ]
};
