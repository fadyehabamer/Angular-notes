/* ==================================================================
   BEGINNER — one page, two projects: a to-do app, then a cart.
   ================================================================== */
export const beginner = {
  tab: 'Build: to-do app & shopping cart',
  say: {
    en: 'Two finished apps from zero: a to-do app in seven steps, then a shopping cart in six. Complete code at every step, a checkpoint after each one, and the habits that matter — standalone components, signals, <b>@for track()</b>, a store service with <b>computed</b> totals.',
    ar: 'اتنين تطبيقات متخلصين من الصفر: to-do في سبع خطوات، وعربة شراء في ست. الكود كامل في كل خطوة، ونقطة فحص بعد كل خطوة، والعادات المهمة — standalone components، وsignals، و<b>track</b> للـ @for، وservice بإجماليات <b>computed</b>.'
  },
  title: { en: 'Build a to-do app, then a shopping cart',
           ar: 'ابني تطبيق to-do، وبعدين عربة شراء' },
  lead: {
    en: `This is the "Build this" card from phase 01 of the learning path, turned into a real walkthrough: <b>complete code at every step</b>, and a checkpoint after each one so you always know whether you are on track. No server, no routing — components, signals and a service, which is exactly the right weight for a first app. Type every file by hand; pasting teaches nothing.`,
    ar: `دي بطاقة «ابني ده» من المرحلة 01 من خطة التعلّم، بس متحولة لشرح فعلي: <b>الكود كامل في كل خطوة</b>، ونقطة فحص بعد كل خطوة عشان تعرف إنت فين طول الوقت. من غير سيرفر ولا routing — components وsignals وservice، وده بالظبط الوزن المناسب لأول تطبيق. اكتب كل ملف بإيدك؛ واللصق ما بيعلّمش.`
  },

  sections: [

  /* ------------------------------------------------ part A header */
  {
    id: 'part-a', kicker: { en: 'Part A — 7 steps', ar: 'الجزء الأول — 7 خطوات' },
    title: { en: 'Part A: the to-do app', ar: 'الجزء الأول: تطبيق to-do' },
    lead: {
      en: `A task list sounds trivial. It is not: it is <b>state</b> (the list), <b>derived state</b> (how many are left), <b>user input</b> (add, toggle, remove) and <b>the screen following all of it</b>. Finish this and you have used every beginner topic at least once.`,
      ar: `قائمة مهام شكلها بسيط. هي مش كده: فيها <b>حالة</b> (الليستة)، و<b>حالة مشتقة</b> (فاضل كام)، و<b>إدخال من المستخدم</b> (ضيف، علّم، امسح)، و<b>الشاشة اللي بتحصلها كل ده</b>. لما تخلّصها تكون استخدمت كل موضوع في المستوى المبتدئ مرة على الأقل.`
    },
    blocks: [
      { t: 'code', name: 'terminal', lang: 'bash', tag: { en: 'start here', ar: 'ابدأ من هنا' }, code: [
        'npx @angular/cli@latest new todo --style=css --ssr=false',
        'cd todo && ng serve'
      ]}
    ]
  },

  {
    id: 'a1', kicker: { en: 'Step 01', ar: 'الخطوة 01' },
    title: { en: 'Look at what the CLI made you', ar: 'بُص على اللي الـ CLI عمله' },
    lead: {
      en: `Before writing anything, read the file that matters. This is the habit: <b>never edit a file you have not read</b>.`,
      ar: `قبل ما تكتب أي حاجة، اقرا الملف المهم. دي العادة: <b>عمرك ما تعدّل في ملف إنت ماقرتوش</b>.`
    },
    blocks: [
      { t: 'code', name: 'src/app/app.ts', lang: 'ts', tag: { en: 'read it', ar: 'اقراه' }, code: [
        "import { Component, signal } from '@angular/core';",
        '',
        '@Component({',
        "  selector: 'app-root',",
        '  imports: [],                     // standalone: nothing is global,',
        '  template: `',                   // every dependency is listed here',
        '    <h1>{{ title() }}</h1>',
        '  `',
        '})',
        'export class App {',
        "  title = signal('todo');",
        '}'
      ]},
      { t: 'p',
        en: `Three things to notice. The component is <b>standalone</b> — there is no NgModule anywhere, and <code>imports</code> is where you list directives and pipes you want in the template. The title is a <b>signal</b>, and the template reads it like a function: <code>title()</code>. And there is no separate <code>.html</code> or <code>.css</code> file yet — for small components, inline is fine.`,
        ar: `تلات حاجات تاخد بالك منهم. الـ component مستقل — مفيش NgModule في أي حتة، و<code>imports</code> هي المكان اللي بتكتب فيه أي directive أو pipe عايزها في التمبلت. الـ title بـ<b>signal</b>، والتمبلت بيقراها زي الدوال: <code>title()</code>. ومفيش ملف <code>.html</code> ولا <code>.css</code> منفصل لسه — في الـ components الصغيرة، السطر الواحد عادي.`
      },
      { t: 'chk', en: `The app runs at <code>localhost:4200</code> showing the word <em>todo</em>. Change the text inside <code>signal('todo')</code>, save, and watch the browser update without a reload — that loop is your whole day from now on.`,
        ar: `التطبيق شغال على <code>localhost:4200</code> وعارض كلمة <em>todo</em>. غيّر النص اللي جوه <code>signal('todo')</code> واحفظ، وشوف البراوزر بيتحدث من غير reload — دي اللوب اللي هتعيش فيه من دلوقتي.` }
    ]
  },

  {
    id: 'a2', kicker: { en: 'Step 02', ar: 'الخطوة 02' },
    title: { en: 'Model the data first', ar: 'ابنِ الداتا الأول' },
    lead: {
      en: `One task is a shape with an identity. The identity is not decoration: the template's <code>@for</code> will demand it in the next step.`,
      ar: `المهمة الواحدة شكل ليها هوية. والهوية دي مش زينة: الـ <code>@for</code> في التمبلت هتطلبها في الخطوة الجاية.`
    },
    blocks: [
      { t: 'code', name: 'src/app/app.ts', lang: 'ts', tag: { en: 'add a type', ar: 'ضيف نوع' }, code: [
        'export interface Task {',
        '  id: number;',
        '  title: string;',
        '  done: boolean;',
        '}',
        '',
        'export class App {',
        "  title = signal('todo');",
        '',
        '  tasks = signal<Task[]>([',
        "    { id: 1, title: 'Read topic 03: components', done: true },",
        "    { id: 2, title: 'Build the to-do app', done: false },",
        '  ]);',
        '}'
      ]},
      { t: 'note', label: { en: 'Best practice — export the shape', ar: 'عادة صح — صدّر الشكل' },
        en: `<code>export interface</code> even though nothing imports it yet. Types are documentation the compiler checks; exporting costs nothing and the file becomes importable the moment a second component needs the shape.`,
        ar: `<code>export interface</code> مع إن مفيش حاجة بتستوردها لسه. الأنواع توثيق الـ compiler بيتأكد منه؛ والتصدير مش بيكلف حاجة، والملف يبقى جاهز للاستيراد أول ما component تانية تحتاج الشكل.` },
      { t: 'chk', en: `No visible change — and that is the checkpoint. <code>ng serve</code> still compiles clean. If the terminal shows red, fix it <b>now</b>; never build on a red build.`,
        ar: `مفيش فرق باين — ودي بالظبط نقطة الفحص. <code>ng serve</code> لسه بيكومبايل من غير ما يزنّق. لو الترمنال أحمر، صلّح <b>دلوقتي</b>؛ ومتبنيش أبداً على بيلد أحمر.` }
    ]
  },

  {
    id: 'a3', kicker: { en: 'Step 03', ar: 'الخطوة 03' },
    title: { en: 'Render the list with @for — and track by id', ar: 'اعرض الليستة بـ @for — وtrack بـ id' },
    lead: {
      en: `The new control flow needs no import and no module. Its one rule people miss: <b>every <code>@for</code> needs a <code>track</code></b>.`,
      ar: `الـ control flow الجديد مش محتاج import ولا module. القاعدة الواحدة اللي الناس بتفوتها: <b>كل <code>@for</code> محتاجة <code>track</code></b>.`
    },
    blocks: [
      { t: 'code', name: 'src/app/app.ts (template)', lang: 'ts', tag: { en: 'template', ar: 'التمبلت' }, code: [
        "template: `",
        "  <h1>{{ title() }}</h1>",
        '  <ul>',
        '    @for (t of tasks(); track t.id) {',
        '      <li>{{ t.title }} @if (t.done) { ✓ }</li>',
        '    } @empty {',
        '      <li>Nothing yet.</li>',
        '    }',
        '  </ul>',
        "`"
      ]},
      { t: 'pair',
        bad: { name: 'the trap you will hit', code: [
          '@for (t of tasks(); track t) {',
          '  …',
          '}',
          '',
          '// track t tracks the object identity.',
          '// Replacing the array with new objects re-creates',
          '// every <li> and loses focus and animation state.'
        ]},
        good: { name: 'track something stable', code: [
          '@for (t of tasks(); track t.id) {',
          '  …',
          '}',
          '',
          '// track t.id: the DOM node survives because',
          '// the id survives. One line, and it is the',
          '// difference between fast and janky lists.'
        ]}},
      { t: 'chk', en: `Two tasks on screen, the finished one with a ✓. In DevTools, the list is real <code>&lt;li&gt;</code> elements, not text.`,
        ar: `اتنين مهام على الشاشة، والتانية خلصانة عليها ✓. في الـ DevTools، الليستة عناصر <code>&lt;li&gt;</code> حقيقية، مش نص.` }
    ]
  },

  {
    id: 'a4', kicker: { en: 'Step 04', ar: 'الخطوة 04' },
    title: { en: 'Add, toggle, remove — by replacing, not mutating', ar: 'ضيف، علّم، امسح — بالتبديل مش بالتعديل' },
    lead: {
      en: `This is the habit that separates people who struggle with Angular from people who do not: <b>signals want new references</b>. <code>push</code> and property assignment change the array's insides without telling anyone.`,
      ar: `دي العادة اللي بتفرّق اللي بيتعاونوا مع أنجولار عن اللي بيتعذبوا فيه: <b>الـ signals عايزة references جديدة</b>. الـ <code>push</code> وتعديل الخصائص بيغيّروا جوا المصفوفة من غير ما حد يعرف.`
    },
    blocks: [
      { t: 'code', name: 'src/app/app.ts', lang: 'ts', tag: { en: 'the three verbs', ar: 'الأفعال التلاتة' }, code: [
        "export class App {",
        "  title = signal('todo');",
        '  tasks = signal<Task[]>([ /* … */ ]);',
        '  nextId = 3;',
        '',
        '  add(input: HTMLInputElement) {',
        '    const title = input.value.trim();',
        '    if (!title) return;',
        '    this.tasks.update(list =>',
        '      [...list, { id: this.nextId++, title, done: false }]);',
        "    input.value = '';",
        '  }',
        '',
        '  toggle(id: number) {',
        '    this.tasks.update(list =>',
        '      list.map(t => t.id === id ? { ...t, done: !t.done } : t));',
        '  }',
        '',
        '  remove(id: number) {',
        '    this.tasks.update(list => list.filter(t => t.id !== id));',
        '  }',
        '}'
      ]},
      { t: 'code', name: 'src/app/app.ts (template)', lang: 'ts', tag: { en: 'wire the events', ar: 'وصّل الأحداث' }, code: [
        "template: `",
        '  <input #box placeholder="What needs doing?"',
        '         (keydown.enter)="add(box)">',
        '  <button (click)="add(box)">Add</button>',
        '',
        '  <ul>',
        '    @for (t of tasks(); track t.id) {',
        '      <li>',
        '        <input type="checkbox" [checked]="t.done"',
        '               (change)="toggle(t.id)">',
        '        {{ t.title }}',
        '        <button (click)="remove(t.id)">×</button>',
        '      </li>',
        '    }',
        '  </ul>',
        "`"
      ]},
      { t: 'note', label: { en: 'Best practice — one way to each side', ar: 'عادة صح — اتجاه واحد لكل ناحية' },
        en: `The checkbox is <code>[checked]</code> + <code>(change)</code>, not <code>[(ngModel)]</code>. Data flows down, events flow up, and the signal stays the single source of truth. ngModel arrives much later, with forms.`,
        ar: `الـ checkbox بـ<code>[checked]</code> مع <code>(change)</code>، مش <code>[(ngModel)]</code>. الداتا بتنزل والأحداث بتعلى، والـ signal بتفضل المصدر الوحيد للحقيقة. الـ ngModel هتيجي بعدين مع الفورمز.` },
      { t: 'chk', en: `You can add a task, tick it, and delete it, and the screen follows every action instantly. Also: <code>add</code> on an empty input does nothing — validation counts as part of the feature.`,
        ar: `تقدر تضيف مهمة، وتعلّم عليها، وتمسحها، والشاشة بتتابع كل حاجة فوراً. وكمان: <code>add</code> بإدخال فاضي مش بيعمل حاجة — الـ validation جزء من الفيتشر.` }
    ]
  },

  {
    id: 'a5', kicker: { en: 'Step 05', ar: 'الخطوة 05' },
    title: { en: 'Extract a TodoStore service', ar: 'استخرج خدمة TodoStore' },
    lead: {
      en: `Same behaviour, better shape. State that more than one component will ever need does not belong to a component — it belongs to an <b>injectable</b> in <code>providedIn: 'root'</code>.`,
      ar: `نفس السلوك، بشكل أحسن. الحالة اللي أكتر من component هيحتاجوها عمرها ما مكانها الصح في component — مكانها في <b>injectable</b> بـ<code>providedIn: 'root'</code>.`
    },
    blocks: [
      { t: 'code', name: 'src/app/todo-store.ts', lang: 'ts', tag: { en: 'new file', ar: 'ملف جديد' }, code: [
        "import { Injectable, signal, computed } from '@angular/core';",
        "import { Task } from './app';",
        '',
        "@Injectable({ providedIn: 'root' })",
        'export class TodoStore {',
        '  private tasks = signal<Task[]>([ /* move the seed here */ ]);',
        '  private nextId = 3;',
        '',
        '  readonly left = computed(() =>',
        '    this.tasks().filter(t => !t.done).length);',
        '',
        '  readonly all = this.tasks.asReadonly();',
        '',
        '  add(title: string) {',
        '    if (!title.trim()) return;',
        '    this.tasks.update(list =>',
        '      [...list, { id: this.nextId++, title: title.trim(), done: false }]);',
        '  }',
        '  toggle(id: number) { /* same as before */ }',
        '  remove(id: number) { /* same as before */ }',
        '}'
      ]},
      { t: 'code', name: 'src/app/app.ts', lang: 'ts', tag: { en: 'the component gets thin', ar: 'الـ component بيبقى رفيع' }, code: [
        "import { Component, inject } from '@angular/core';",
        "import { TodoStore } from './todo-store';",
        '',
        '@Component({ /* … */ })',
        'export class App {',
        "  title = signal('todo');",
        '  store = inject(TodoStore);',
        '',
        "  add(input: HTMLInputElement) { this.store.add(input.value); input.value = ''; }",
        '}'
      ]},
      { t: 'pair',
        bad: { name: 'constructor injection — the old way', code: [
          'constructor(',
          '  private store: TodoStore',
          ') {}',
          '',
          '// Works. But every field it feeds also needs',
          '// a constructor line, and classes grow.'
        ]},
        good: { name: 'inject() — the field you call', code: [
          'store = inject(TodoStore);',
          '',
          '// One line, no constructor, works in any',
          '// injection context, and reads left to right.'
        ]}},
      { t: 'note', label: { en: 'Best practice — readonly outside, writable inside', ar: 'عادة صح — readonly من بره، وكلاءة من جوه' },
        en: `The component reads <code>store.all()</code> and <code>store.left()</code> but can only <em>call methods</em> to change state. Exposing the raw writable signal would invite any component to <code>.set()</code> it — a bug factory. This in/out discipline is what code reviewers look for.`,
        ar: `الـ component بيقرا <code>store.all()</code> و<code>store.left()</code> بس مش يقدر يغيّر غير عن طريق <em>مناداة methods</em>. لو كشفت الـ signal القابلة للكتابة، أي component هيبقى يقدر يعملها <code>.set()</code> — مصنع باجات. دي الديسسيبلين اللي مراجعي الكود بيدوروا عليها.` },
      { t: 'chk', en: `Everything still works — add, tick, delete — and the component class is now mostly template concerns. <code>left</code> proves <code>computed</code>: tick a task and the count changes with zero extra code.`,
        ar: `كل حاجة شغالة زي ما هي — ضيف وعلّم وامسح — والـ component بقى خفيف ومش مسؤول عن المنطق. و<code>left</code> بتثبت فكرة الـ <code>computed</code>: علّم على مهمة والعدد بيتغير من غير سطر كود زيادة.` }
    ]
  },

  {
    id: 'a6', kicker: { en: 'Step 06', ar: 'الخطوة 06' },
    title: { en: 'The empty state, and the little a11y that matters', ar: 'الحالة الفاضية، والإتاحة البسيطة اللي مهمة' },
    lead: {
      en: `Finishing is a skill. An empty list that says so, a label on the input, and focus returned after a delete — this is the last 20% where the real learning hides.`,
      ar: `الإنهاء مهارة. ليستة فاضية بتقول إنها فاضية، ولابل للإدخال، والـ focus بيرجع بعد المسح — دي آخر 20% اللي التعلّم الحقيقي مخبي فيها.`
    },
    blocks: [
      { t: 'code', name: 'src/app/app.ts (template)', lang: 'ts', tag: { en: 'template', ar: 'التمبلت' }, code: [
        "template: `",
        '  <h1>{{ title() }}</h1>',
        '',
        '  <label for="new-task">New task</label>',
        '  <input id="new-task" #box placeholder="What needs doing?"',
        '         (keydown.enter)="add(box); box.focus()">',
        '',
        '  @if (store.left() > 0) {',
        '    <p>{{ store.left() }} left</p>',
        '  } @else {',
        '    <p>All done. Go outside.</p>',
        '  }',
        '',
        '  <ul>',
        '    @for (t of store.all(); track t.id) {',
        '      <li>',
        '        <input type="checkbox" [checked]="t.done"',
        '               (change)="store.toggle(t.id)"',
        '               [attr.aria-label]="t.title">',
        '        {{ t.title }}',
        '        <button (click)="remove(t.id); box.focus()">×</button>',
        '      </li>',
        '    } @empty {',
        '      <li>No tasks yet — add the first one.</li>',
        '    }',
        '  </ul>',
        "`"
      ]},
      { t: 'chk', en: `Delete the last task: the <code>@empty</code> message appears instead of a silent blank list. Tab into the app with the keyboard only: the input, every checkbox and every × is reachable, and a screen reader announces each checkbox by its task name.`,
        ar: `امسح آخر مهمة: رسالة الـ <code>@empty</code> بتظهر بدل ليستة فاضية من غير كلام. جرّب الـ tab بالإدخال على الكيبورد بس: الإدخال وكل checkbox وكل × واصلين، وقارئ الشاشة بينطق كل checkbox باسم مهمته.` }
    ]
  },

  {
    id: 'a7', kicker: { en: 'Step 07', ar: 'الخطوة 07' },
    title: { en: 'Ship it, then break it on purpose', ar: 'انشره، وبعدين كسّره بقصد' },
    lead: {
      en: `A project is not finished when it works; it is finished when it is <b>committed and running somewhere other than your laptop</b>.`,
      ar: `المشروع مش بياخد لما يشتغل؛ بياخد لما يكون <b>متسجل في git وشغال في حتة غير اللاب توب بتاعك</b>.`
    },
    blocks: [
      { t: 'code', name: 'terminal', lang: 'bash', tag: { en: 'the finishing line', ar: 'خط النهاية' }, code: [
        'ng build                    # dist/todo/ appears — open it once',
        'git init && git add -A && git commit -m "to-do app"',
        '# push to GitHub, then deploy the dist folder',
        '# to Netlify / Firebase / GitHub Pages'
      ]},
      { t: 'ul',
        en: [
          `<b>Break it:</b> delete the <code>track</code> clause and read the compile error. Pass <code>tasks</code> instead of <code>tasks()</code> in the template and see what renders. Mutate with <code>push</code> in <code>add()</code> and watch the screen ignore you. Each break teaches more than an hour of reading.`,
          `<b>Keep the repo:</b> this URL goes on your CV. Part B below becomes its own commit.`
        ],
        ar: [
          `<b>كسّره:</b> امسح جملة الـ <code>track</code> واقرا رسالة الكومبايل. اكتب <code>tasks</code> بدل <code>tasks()</code> في التمبلت وشوف هيظهر إيه. استخدم <code>push</code> في <code>add()</code> وشوف الشاشة بتتجاهلك. كل كسرة بتعلمك أكتر من ساعة قراية.`,
          `<b>سيب الـ repo:</b> اللينك ده يروح على الـ CV بتاعك. والجزء التاني تحت هيبقى commit لوحده.`
        ]
      },
      { t: 'chk', en: `The deployed URL opens from your phone. That is it — first Angular app, finished, in public.`,
        ar: `اللينك بعد النشر بيفتح من الموبايل. خلاص — أول تطبيق أنجولار، متخلص، ومنشور.` }
    ]
  },

  /* ------------------------------------------------ part B header */
  {
    id: 'part-b', kicker: { en: 'Part B — 6 steps', ar: 'الجزء التاني — 6 خطوات' },
    title: { en: 'Part B: the shopping cart', ar: 'الجزء التاني: عربة الشراء' },
    lead: {
      en: `A second app, in the same repo, that exercises the topics the to-do app could not: <b>components talking to each other</b> through <code>input()</code>/<code>output()</code>, quantities through <code>model()</code>, and totals through <code>computed()</code>. Make a fresh project: <code>ng new cart --style=css --ssr=false</code>.`,
      ar: `تطبيق تاني في نفس الـ repo، بيمر على المواضيع اللي تطبيق to-do معملهاش: <b>components بتتكلم مع بعضها</b> عن طريق <code>input()</code> و<code>output()</code>، وكميات بـ<code>model()</code>، وإجماليات بـ<code>computed()</code>. اعمل مشروع جديد: <code>ng new cart --style=css --ssr=false</code>.`
    },
    blocks: []
  },

  {
    id: 'b1', kicker: { en: 'Step 08', ar: 'الخطوة 08' },
    title: { en: 'Fake data, real shape', ar: 'داتا مزوّرة، شكل حقيقي' },
    lead: {
      en: `Hard-code products in a <code>ProductService</code>. In phase 02 the same service grows a real HTTP call inside — and <b>no component changes</b>. That is what the service boundary buys you.`,
      ar: `اكتب منتجات ثابتة جوه <code>ProductService</code>. في المرحلة 02 نفس الـ service هياخد نداء HTTP حقيقي جواه — و<b>ولا component هيتغير</b>. دي فايدة حد الـ service.`
    },
    blocks: [
      { t: 'code', name: 'src/app/product.ts', lang: 'ts', tag: { en: 'types + data', ar: 'أنواع + داتا' }, code: [
        'export interface Product {',
        '  id: number;',
        '  title: string;',
        '  price: number;',
        '  emoji: string;',
        '}',
        '',
        'export const PRODUCTS: Product[] = [',
        "  { id: 1, title: 'Coffee',     price: 40, emoji: '☕' },",
        "  { id: 2, title: 'Laptop',     price: 22000, emoji: '💻' },",
        "  { id: 3, title: 'Notebook',   price: 25, emoji: '📓' },",
        "  { id: 4, title: 'Headphones', price: 1500, emoji: '🎧' },",
        '];'
      ]},
      { t: 'code', name: 'src/app/product.service.ts', lang: 'ts', tag: { en: 'service', ar: 'الخدمة' }, code: [
        "import { Injectable } from '@angular/core';",
        "import { PRODUCTS, Product } from './product';",
        '',
        "@Injectable({ providedIn: 'root' })",
        'export class ProductService {',
        '  readonly all = PRODUCTS;',
        '  byId(id: number) {',
        '    return PRODUCTS.find(p => p.id === id);',
        '  }',
        '}'
      ]},
      { t: 'chk', en: `Compiles clean. Nothing renders yet — the next step is the first real component split.`,
        ar: `بيكومبايل من غير ما يزنّق. مفيش حاجة بتظهر لسه — الخطوة الجاية أول تقسيم حقيقي للـ components.` }
    ]
  },

  {
    id: 'b2', kicker: { en: 'Step 09', ar: 'الخطوة 09' },
    title: { en: 'A ProductCard component with input() and output()', ar: 'كومبوننت ProductCard بـ input() وoutput()' },
    lead: {
      en: `Your first real component split. The card owns nothing: data comes <b>down</b> as an input, decisions flow <b>up</b> as an output. Components that only talk like this are trivially reusable and trivially testable.`,
      ar: `أول تقسيم حقيقي للـ components. الكارت مش بيملك حاجة: الداتا بتنزل <b>input</b>، والقرارات بتطلع <b>output</b>. الـ components اللي بتتكلم بالشكل ده بس، إعادة استخدامها واختبارها حاجة سهلة جداً.`
    },
    blocks: [
      { t: 'code', name: 'src/app/product-card.ts', lang: 'ts', tag: { en: 'new component', ar: 'كومبوننت جديد' }, code: [
        "import { Component, input, output } from '@angular/core';",
        "import { Product } from './product';",
        '',
        '@Component({',
        "  selector: 'product-card',",
        '  template: `',
        '    <div class="card">',
        '      <span class="emoji">{{ product().emoji }}</span>',
        '      <b>{{ product().title }}</b>',
        '      <span>{{ product().price }} EGP</span>',
        '      <button (click)="add.emit(product())">Add to cart</button>',
        '    </div>',
        '  `,',
        "  styles: `.card{border:1px solid #ddd;border-radius:12px;padding:14px}`",
        '})',
        'export class ProductCard {',
        '  product = input.required<Product>();',
        '  add = output<Product>();',
        '}'
      ]},
      { t: 'code', name: 'src/app/app.ts', lang: 'ts', tag: { en: 'the parent listens', ar: 'الأب بيسمع' }, code: [
        "import { Component, inject, signal } from '@angular/core';",
        "import { ProductCard } from './product-card';",
        "import { ProductService } from './product.service';",
        "import { Product } from './product';",
        '',
        '@Component({',
        "  selector: 'app-root',",
        '  imports: [ProductCard],      // standalone: import what you use',
        '  template: `',
        '    <h1>Cart</h1>',
        '    @for (p of products.all; track p.id) {',
        '      <product-card [product]="p" (add)="addToCart($event)" />',
        '    }',
        '  `',
        '})',
        'export class App {',
        '  products = inject(ProductService);',
        '  cart = signal<Product[]>([]);',
        '',
        '  addToCart(p: Product) {',
        '    this.cart.update(c => [...c, p]);',
        '  }',
        '}'
      ]},
      { t: 'note', label: { en: 'Best practice — required inputs', ar: 'عادة صح — inputs إجبارية' },
        en: `<code>input.required&lt;Product&gt;()</code> makes the compiler enforce that every usage passes <code>[product]</code>. Forget it and the build fails, not the user. This one habit kills a whole class of bugs.`,
        ar: `<code>input.required&lt;Product&gt;()</code> بتخلي الـ compiler يلزمك إن أي استخدام يبعت <code>[product]</code>. لو نسيتها البيلد بيفشل، مش المستخدم. العادة دي بتقضي على نوع كامل من الباجات.` },
      { t: 'chk', en: `Four cards render from the parent's <code>@for</code>, and clicking "Add to cart" fires the output — visible for now with a temporary <code>console.log</code> in <code>addToCart</code>, removed before you commit.`,
        ar: `أربعة كروت بيظهروا من <code>@for</code> في الأب، والدوس على "Add to cart" بيشغّل الـ output — شوفها دلوقتي بـ<code>console.log</code> مؤقت في <code>addToCart</code>، وامسحه قبل ما تعمل commit.` }
    ]
  },

  {
    id: 'b3', kicker: { en: 'Step 10', ar: 'الخطوة 10' },
    title: { en: 'CartService with computed totals', ar: 'خدمة CartService بإجماليات computed' },
    lead: {
      en: `Move the cart into a service before it grows. Totals are <b>derived</b> state — they must be <code>computed</code>, never manually kept in sync.`,
      ar: `انقل الكارت لـ service قبل ما يكبر. الإجماليات حالة <b>مشتقة</b> — مكانها <code>computed</code>، وعمرها ما هتتظبط بالإيد.`
    },
    blocks: [
      { t: 'code', name: 'src/app/cart.service.ts', lang: 'ts', tag: { en: 'new file', ar: 'ملف جديد' }, code: [
        "import { Injectable, signal, computed } from '@angular/core';",
        "import { Product } from './product';",
        '',
        'export interface CartLine {',
        '  product: Product;',
        '  qty: number;',
        '}',
        '',
        "@Injectable({ providedIn: 'root' })",
        'export class CartService {',
        '  private lines = signal<CartLine[]>([]);',
        '',
        '  readonly all = this.lines.asReadonly();',
        '  readonly count = computed(() =>',
        '    this.lines().reduce((n, l) => n + l.qty, 0));',
        '  readonly total = computed(() =>',
        '    this.lines().reduce((sum, l) => sum + l.qty * l.product.price, 0));',
        '',
        '  add(p: Product) {',
        '    this.lines.update(list => {',
        '      const hit = list.find(l => l.product.id === p.id);',
        '      if (hit) {',
        '        return list.map(l =>',
        '          l.product.id === p.id ? { ...l, qty: l.qty + 1 } : l);',
        '      }',
        '      return [...list, { product: p, qty: 1 }];',
        '    });',
        '  }',
        '',
        '  setQty(productId: number, qty: number) {',
        '    this.lines.update(list =>',
        '      list.map(l => l.product.id === productId ? { ...l, qty } : l));',
        '  }',
        '',
        '  remove(productId: number) {',
        '    this.lines.update(list =>',
        '      list.filter(l => l.product.id !== productId));',
        '  }',
        '}'
      ]},
      { t: 'note', label: { en: 'Why merge instead of push', ar: 'ليه بندمج بدل الـ push' },
        en: `Adding the same product twice must become <b>one line with qty 2</b>, not two rows. Look how the update returns a new array in every branch — the reference-replacement habit from the to-do app, now carrying real logic.`,
        ar: `تضيف نفس المنتج مرتين لازم تبقى <b>سطر واحد بـ qty 2</b>، مش صفين. بص إزاي الـ update بترجع مصفوفة جديدة في كل حالة — عادة تبديل الـ reference من تطبيق to-do، بس بمنطق حقيقي المرة دي.`
      },
      { t: 'chk', en: `Wire the app to the service (inject it, call <code>cart.add(p)</code> from the card's output). Add coffee three times: the cart holds one line, <code>cart.count()</code> is 3.`,
        ar: `وصّل التطبيق بالـ service (اعمل inject وندّي <code>cart.add(p)</code> من الـ output بتاع الكارت). ضيف القهوة تلات مرات: الكارت فيه سطر واحد، و<code>cart.count()</code> بـ 3.` }
    ]
  },

  {
    id: 'b4', kicker: { en: 'Step 11', ar: 'الخطوة 11' },
    title: { en: 'The cart list, with a model() quantity', ar: 'ليستة الكارت، وكمية بـ model()' },
    lead: {
      en: `The quantity stepper is the textbook <code>model()</code> case: the child owns the control, the parent owns the value, and both stay honest.`,
      ar: `عداد الكمية هو المثال الكتابي لـ<code>model()</code>: الابن بيملك التحكم، والأب بيملك القيمة، والاتنين مفيش واحد بيكدب على التاني.`
    },
    blocks: [
      { t: 'code', name: 'src/app/cart-line.ts', lang: 'ts', tag: { en: 'new component', ar: 'كومبوننت جديد' }, code: [
        "import { Component, input, model } from '@angular/core';",
        "import { Product } from './product';",
        '',
        '@Component({',
        "  selector: 'cart-line',",
        '  template: `',
        '    <div class="line">',
        '      {{ product().emoji }} {{ product().title }}',
        '      <button (click)="dec()">−</button>',
        '      {{ qty() }}',
        '      <button (click)="inc()">+</button>',
        '      <span>{{ qty() * product().price }}</span>',
        '    </div>',
        '  `',
        '})',
        'export class CartLine {',
        '  product = input.required<Product>();',
        '  qty = model.required<number>();',
        '',
        '  inc() { this.qty.update(q => q + 1); }',
        '  dec() { this.qty.update(q => Math.max(1, q - 1)); }',
        '}'
      ]},
      { t: 'code', name: 'src/app/app.ts (template)', lang: 'ts', tag: { en: 'two-way in the parent', ar: 'اتجاهين في الأب' }, code: [
        "template: `",
        '  @for (l of cart.all(); track l.product.id) {',
        '    <cart-line [product]="l.product" [(qty)]="l.qty" />',
        '  }',
        '  <p>Total: {{ cart.total() }}</p>',
        "`"
      ]},
      { t: 'note', label: { en: 'Where the write actually lands', ar: 'الكتابة بتقع فين بالظبط' },
        en: `The signal itself stays in <code>CartService</code>; <code>[(qty)]="l.qty"</code> writes into the line object and <code>setQty()</code> remains the service's official channel. Two-way here means "child and parent agree", not "anyone mutates the store freely" — the readonly habit from step 05 still holds.`,
        ar: `الـ signal نفسها لسه في <code>CartService</code>؛ و<code>[(qty)]="l.qty"</code> بتكتب في جسم السطر، و<code>setQty()</code> تفضل القناة الرسمية للـ service. الاتجاهين هنا معناها "الابن والأب متفقين"، مش "أي حد يعدل في المخزن زي ما يحب" — عادة الـ readonly من الخطوة 05 لسه شغالة.`
      },
      { t: 'chk', en: `Steppers change the quantity, the line total and the grand total follow, and − never goes below 1. Two-way binding with no <code>ngModel</code> and no <code>EventEmitter</code> in sight.`,
        ar: `العداد بيغير الكمية، وإجمالي السطر والإجمالي الكلي بيتابعلها، والسالب عمروا ما بيقل عن 1. ربط باتجاهين من غير <code>ngModel</code> ولا <code>EventEmitter</code>.` }
    ]
  },

  {
    id: 'b5', kicker: { en: 'Step 12', ar: 'الخطوة 12' },
    title: { en: 'Pipes for money, because money is display logic', ar: 'Pipes للفلوس، لأن الفلوس عرض مش منطق' },
    lead: {
      en: `Format the price once, in a pipe, and no template ever concatenates a currency again. Reuse <code>CurrencyPipe</code> — then see how it composes.`,
      ar: `نسّق السعر مرة واحدة في pipe، وعمرك ما هتلاقي تمبلت بيلزق عملة تاني. استخدم <code>CurrencyPipe</code> الجاهز — وشوف بيتركّب إزاي.`
    },
    blocks: [
      { t: 'code', name: 'src/app/app.ts', lang: 'ts', tag: { en: 'import and use', ar: 'استورد واستخدم' }, code: [
        "import { CurrencyPipe } from '@angular/common';",
        '',
        '@Component({',
        '  imports: [ProductCard, CartLine, CurrencyPipe],',
        '  template: `',
        '    @for (l of cart.all(); track l.product.id) {',
        '      <cart-line [product]="l.product" [(qty)]="l.qty" />',
        '    }',
        '    <p>Total: {{ cart.total() | currency:"EGP":"symbol" }}</p>',
        '  `',
        '})'
      ]},
      { t: 'note', label: { en: 'The standalone discipline', ar: 'الديسسيبلين بتاع الـ standalone' },
        en: `Notice the loop you are in now: want a pipe → import it in <code>imports</code> → use it. Nothing is global, so every page declares exactly what it needs. That is <em>more</em> typing than ngModules, and exactly why reviewers can read your templates.`,
        ar: `خد بالك من اللوب اللي إنت فيه دلوقتي: عايز pipe → استوردها في <code>imports</code> → استخدمها. مفيش حاجة جلوبال، فكل صفحة بتعلن بالظبط اللي محتاجاه. ده <em>كتابة أكتر</em> من الـ ngModules، وده بالظبط سبب إن مراجعين الكود يقدروا يقراو تمبلتاتك.`
      },
      { t: 'chk', en: `The total renders as <code>EGP 4,500.00</code>-style text and follows the steppers. Change your browser language and notice the formatter follows too — the pipe was doing locale work you would have hand-rolled badly.`,
        ar: `الإجمالي بيظهر بنص زي <code>EGP 4,500.00</code> وبيتابع العدادات. غيّر لغة البراوزر ولاحظ إن التنسيق بيتابعها هي كمان — الـ pipe كانت بتعمل شغل الـ locale اللي كنت هتعمله بإيد وشويه.`
      }
    ]
  },

  {
    id: 'b6', kicker: { en: 'Step 13', ar: 'الخطوة 13' },
    title: { en: 'Finish Part B the way you finished Part A', ar: 'خلّص الجزء التاني زي ما خلّصت الأول' },
    lead: {
      en: `Same checklist as the to-do app: build, commit, deploy, break on purpose.`,
      ar: `نفس تشيك ليست تطبيق to-do: بيلد، وcommit، ونشر، وكسّره بقصد.`
    },
    blocks: [
      { t: 'ul',
        en: [
          `<b>Break:</b> remove <code>asReadonly()</code> from the cart and try <code>cart.all.set([])</code> from a component — then put it back. You just felt the encapsulation you wrote.`,
          `<b>Break:</b> change <code>qty = model.required</code> to a plain <code>input</code> and watch the stepper stop writing. Now you know what <code>model()</code> is actually for.`,
          `<b>Ship:</b> <code>ng build</code>, commit as "shopping cart", deploy.`
        ],
        ar: [
          `<b>كسّر:</b> شيل <code>asReadonly()</code> من الكارت وجرّب <code>cart.all.set([])</code> من جوه component — وبعدين رجّعها. لسه بتحس بالإنكابسوليشن اللي كتبته.`,
          `<b>كسّر:</b> غيّر <code>qty = model.required</code> لـ<code>input</code> عادي وشوف العداد بيقف عن الكتابة. دلوقتي عرفت <code>model()</code> بتاع إيه فعلاً.`,
          `<b>انشر:</b> <code>ng build</code>، وcommit باسم "shopping cart"، ونشر.`
        ]
      },
      { t: 'chk', en: `Two finished, deployed apps in one repo. That is phase 01 done — go read the roadmap again and see how different phase 02 looks from the other side.`,
        ar: `اتنين تطبيقات متخلصين ومنشورين في نفس الـ repo. المرحلة 01 خلصت — ارجع اقرا خطة التعلّم تاني وشوف المرحلة 02 شكلها إزاي من الناحية التانية.` }
    ]
  }
  ]
};

/* ==================================================================
   INTERMEDIATE — the real store. Public API, routes, forms, errors.
   ================================================================== */
export const intermediate = {
  tab: 'Build: the real store',
  say: {
    en: 'Ten steps on a real public API: lazy routes, a typed API service, a four-state product list, a detail page, a typed checkout form, a guard, an interceptor, Material polish — then the ship-it checklist.',
    ar: 'عشر خطوات على API حقيقي: routes محمّلة كسل، وAPI service بأنواع، وليستة بأربع حالات، وصفحة تفاصيل، وفورم دفع بأنواع، وguard وinterceptor، وتجميل بـ Material — وبعدين تشيك ليست النشر.'
  },
  title: { en: 'Rebuild the cart as a real store', ar: 'أعد بناء الكارت كمتجر حقيقي' },
  lead: {
    en: `The phase-02 project, as a walkthrough: the shopping cart from Part B grows up — a <b>real public API</b> instead of fake data, <b>routing</b> between pages, a <b>typed reactive form</b> at checkout, and errors handled before they surprise you. Every step ships complete code and a checkpoint. This is the project you show people.`,
    ar: `مشروع المرحلة 02 على هيئة شرح: عربة الشراء من الجزء التاني بتكبر — <b>API حقيقي</b> بدل الداتا المزوّرة، و<b>routing</b> بين الصفحات، و<b>فورم دفع بأنواع</b>، وأخطاء متعالجة قبل ما تفاجئك. كل خطوة بيجيلك معاها الكود كامل ونقطة فحص. ده المشروع اللي هتوريه للناس.`
  },

  sections: [

  {
    id: 'store', kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'The plan, and the API we will use', ar: 'الخطة، والـ API اللي هنستخدمه' },
    lead: {
      en: `Ten steps, plus the checklist. We build against <a href="https://fakestoreapi.com">fakestoreapi.com</a> — a free, real HTTP API with products, categories and cart endpoints. No key, no setup; it behaves like a real server, including being slow and failing sometimes, which is exactly what we want to practise.`,
      ar: `عشر خطوات، والتشيك ليست في الآخر. هنبني على <a href="https://fakestoreapi.com">fakestoreapi.com</a> — API حقيقي مجاني فيه منتجات وفئات وكارت. من غير مفتاح ولا إعداد؛ وبيتصرف زي سيرفر حقيقي، ببطء وفشل أحياناً، وده بالظبط اللي عايزين نتدرب عليه.`
    },
    blocks: [
      { t: 'code', name: 'terminal', lang: 'bash', tag: { en: 'scaffold', ar: 'الأساس' }, code: [
        'ng new store --style=css --ssr=false',
        'cd store',
        '# we wire the router ourselves in step 01, so you see every piece'
      ]},
      { t: 'tbl',
        head: { en: ['Route', 'Page', 'Topics used'], ar: ['المسار', 'الصفحة', 'المواضيع المستخدمة'] },
        rows: [
          { en: ['<code>/</code>', 'Product grid + category filter', 'HTTP, signals, control flow'], ar: ['<code>/</code>', 'جدول منتجات + فلتر فئات', 'HTTP وsignals وcontrol flow'] },
          { en: ['<code>/product/:id</code>', 'Product detail + add to cart', 'Route params'], ar: ['<code>/product/:id</code>', 'تفاصيل المنتج + إضافة للكارت', 'باراميترات المسار'] },
          { en: ['<code>/cart</code>', 'Cart with quantities', 'The Part B service, grown up'], ar: ['<code>/cart</code>', 'الكارت بالكميات', 'خدمة الجزء التاني وهي كبرت'] },
          { en: ['<code>/checkout</code>', 'Reactive form + review', 'Typed forms, validation, a guard'], ar: ['<code>/checkout</code>', 'فورم دفع + مراجعة', 'فورمز بأنواع وتحقق وguard'] }
        ]
      }
    ]
  },

  {
    id: 's1', kicker: { en: 'Step 01', ar: 'الخطوة 01' },
    title: { en: 'Lazy routing, function-first', ar: 'routing محمّل كسل، بالدوال' },
    lead: {
      en: `No NgModule, no <code>RouterModule.forRoot</code>. A <code>routes</code> array, <code>provideRouter</code>, and <b>every page lazy</b> from day one via <code>loadComponent</code>.`,
      ar: `من غير NgModule ولا <code>RouterModule.forRoot</code>. مصفوفة <code>routes</code> و<code>provideRouter</code> و<b>كل الصفحات محمّلة كسل</b> من أول يوم بـ<code>loadComponent</code>.`
    },
    blocks: [
      { t: 'code', name: 'src/app/app.routes.ts', lang: 'ts', tag: { en: 'new file', ar: 'ملف جديد' }, code: [
        "import { Routes } from '@angular/router';",
        '',
        'export const routes: Routes = [',
        '  {',
        "    path: '',",
        '    loadComponent: () =>',
        "      import('./pages/product-list/product-list').then(m => m.ProductList),",
        "    title: 'Store',",
        '  },',
        '  {',
        "    path: 'product/:id',",
        '    loadComponent: () =>',
        "      import('./pages/product-detail/product-detail').then(m => m.ProductDetail),",
        '  },',
        '  {',
        "    path: 'cart',",
        "    loadComponent: () => import('./pages/cart/cart').then(m => m.Cart),",
        '  },',
        '  {',
        "    path: 'checkout',",
        '    loadComponent: () =>',
        "      import('./pages/checkout/checkout').then(m => m.Checkout),",
        '    // canActivate: [checkoutGuard],   // arrives in step 07',
        '  },',
        "  { path: '**', redirectTo: '' },",
        '];'
      ]},
      { t: 'code', name: 'src/app/app.config.ts', lang: 'ts', tag: { en: 'wire it', ar: 'وصّله' }, code: [
        "import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';",
        "import { provideRouter } from '@angular/router';",
        '',
        'export const appConfig: ApplicationConfig = {',
        '  providers: [',
        '    provideZoneChangeDetection({ eventCoalescing: true }),',
        '    provideRouter(routes),',
        '  ],',
        '};'
      ]},
      { t: 'code', name: 'src/app/app.ts', lang: 'ts', tag: { en: 'shell + outlet', ar: 'الهيكل + outlet' }, code: [
        "import { Component } from '@angular/core';",
        "import { RouterOutlet, RouterLink } from '@angular/router';",
        '',
        '@Component({',
        "  selector: 'app-root',",
        '  imports: [RouterOutlet, RouterLink],',
        '  template: `',
        '    <nav>',
        '      <a routerLink="/">Products</a>',
        '      <a routerLink="/cart">Cart</a>',
        '    </nav>',
        '    <router-outlet />',
        '  `',
        '})',
        'export class App {}'
      ]},
      { t: 'chk', en: `The empty pages do not exist yet, so the build fails on the imports — that is expected. Comment out the four <code>loadComponent</code> routes, confirm the shell renders with a working empty outlet, then uncomment them one at a time as the next steps create each page.`,
        ar: `الصفحات الفاضية مش موجودة لسه، فالبيلد هيوجّع على الـ imports — وده متوقع. علّق على الـ routes الأربعة بتاعة <code>loadComponent</code>، اتأكد إن الهيكل بيظهر والـ outlet الفاضية شغالة، وبعدين فكّهم واحد واحد مع ما الخطوات الجاية هتعمل كل صفحة.` }
    ]
  },

  {
    id: 's2', kicker: { en: 'Step 02', ar: 'الخطوة 02' },
    title: { en: 'A typed API service', ar: 'خدمة API بأنواع' },
    lead: {
      en: `One file owns the server. Components never import <code>HttpClient</code>; they import <b>methods that return typed observables</b>. When the API changes — and it will — you change one file.`,
      ar: `ملف واحد هو اللي بيمسك السيرفر. الـ components عمرك ما هتستورد <code>HttpClient</code>؛ بتستورد <b>methods بترجّع observables بأنواع</b>. لما الـ API يتغير — وهي هتتغير — هتغير ملف واحد.`
    },
    blocks: [
      { t: 'code', name: 'src/app/api/product.ts', lang: 'ts', tag: { en: 'types', ar: 'أنواع' }, code: [
        'export interface ApiProduct {',
        '  id: number;',
        '  title: string;',
        '  price: number;',
        '  category: string;',
        '  description: string;',
        '  image: string;',
        '}'
      ]},
      { t: 'code', name: 'src/app/api/store-api.service.ts', lang: 'ts', tag: { en: 'new file', ar: 'ملف جديد' }, code: [
        "import { Injectable, inject } from '@angular/core';",
        "import { HttpClient } from '@angular/common/http';",
        "import { ApiProduct } from './product';",
        '',
        "@Injectable({ providedIn: 'root' })",
        'export class StoreApi {',
        '  private http = inject(HttpClient);',
        "  private base = 'https://fakestoreapi.com';",
        '',
        '  products(category?: string) {',
        '    const url = category',
        '      ? `${this.base}/products/category/${category}`',
        '      : `${this.base}/products`;',
        '    return this.http.get<ApiProduct[]>(url);',
        '  }',
        '',
        '  product(id: number) {',
        '    return this.http.get<ApiProduct>(`${this.base}/products/${id}`);',
        '  }',
        '',
        '  categories() {',
        "    return this.http.get<string[]>(`${this.base}/products/categories`);",
        '  }',
        '}'
      ]},
      { t: 'code', name: 'src/app/app.config.ts', lang: 'ts', tag: { en: 'register HTTP', ar: 'سجّل HTTP' }, code: [
        "import { provideHttpClient } from '@angular/common/http';",
        '',
        'export const appConfig: ApplicationConfig = {',
        '  providers: [',
        '    provideZoneChangeDetection({ eventCoalescing: true }),',
        '    provideRouter(routes),',
        '    provideHttpClient(),',
        '  ],',
        '};'
      ]},
      { t: 'note', label: { en: 'Best practice — one API service per backend', ar: 'عادة صح — خدمة API واحدة لكل backend' },
        en: `Notice what the service does <em>not</em> do: no caching policy, no retry, no error toasts. Those are cross-cutting concerns that arrive as an interceptor in step 08. The service stays a thin, typed mirror of the HTTP surface.`,
        ar: `خد بالك من اللي الـ service <em>مش</em> بتعمله: لا caching ولا retry ولا رسايل error. دي حاجات عرضية بتيجي كـ interceptor في الخطوة 08. الـ service تفضل مراية رفيعة ومكتوبة بأنواع لسطح الـ HTTP.`
      },
      { t: 'chk', en: `Compiles. Nothing calls it yet — we prove it the honest way in the next step, on screen.`,
        ar: `بيكومبايل. مفيش حد بيناديه لسا — هنثبته بالطريقة الصادقة في الخطوة الجاية، على الشاشة.` }
    ]
  },

  {
    id: 's3', kicker: { en: 'Step 03', ar: 'الخطوة 03' },
    title: { en: 'Product list: loading, ready, error, empty', ar: 'ليستة المنتجات: تحميل وجاهز وخطأ وفاضي' },
    lead: {
      en: `Four states on every screen that touches a server: <b>loading, ready, error, empty</b>. Amateurs render the ready state only; you will render all four, every time.`,
      ar: `أربع حالات في أي شاشة بتلمس سيرفر: <b>تحميل، وجاهز، وخطأ، وفاضي</b>. المبتدئين بيظهروا حالة الجاهز بس؛ وإنت هتظهر الأربعة كل مرة.`
    },
    blocks: [
      { t: 'code', name: 'src/app/pages/product-list/product-list.ts', lang: 'ts', tag: { en: 'new page', ar: 'صفحة جديدة' }, code: [
        "import { Component, inject, signal } from '@angular/core';",
        "import { RouterLink } from '@angular/router';",
        "import { toSignal } from '@angular/core/rxjs-interop';",
        "import { StoreApi } from '../../api/store-api.service';",
        "import { ApiProduct } from '../../api/product';",
        '',
        'type Load<T> =',
        "  | { state: 'loading' }",
        "  | { state: 'ready'; data: T }",
        "  | { state: 'error'; msg: string }",
        "  | { state: 'empty' };",
        '',
        '@Component({',
        "  selector: 'product-list',",
        '  imports: [RouterLink],',
        '  template: `',
        '    <h1>Products</h1>',
        '',
        '    @for (c of cats(); track c) {',
        '      <button (click)="pick(c)"',
        '              [class.on]="c === picked()">{{ c }}</button>',
        '    }',
        '',
        '    @switch (load().state) {',
        "      @case ('loading') { <p>Loading…</p> }",
        "      @case ('error')   { <p>{{ load().msg }}</p> }",
        "      @case ('empty')   { <p>No products in this category.</p> }",
        "      @case ('ready')   {",
        '        <ul>',
        '          @for (p of load().data; track p.id) {',
        '            <li>',
        '              <a [routerLink]="[\'/product\', p.id]">{{ p.title }}</a>',
        '              — {{ p.price }}',
        '            </li>',
        '          }',
        '        </ul>',
        '      }',
        '    }',
        '  `',
        '})',
        'export class ProductList {',
        '  private api = inject(StoreApi);',
        '',
        '  picked = signal<string | undefined>(undefined);',
        "  load = signal<Load<ApiProduct[]>>({ state: 'loading' });",
        '',
        '  cats = toSignal(this.api.categories(), { initialValue: [] as string[] });',
        '',
        '  pick(c: string) { this.picked.set(c); this.fetch(); }',
        '',
        '  private fetch() {',
        "    this.load.set({ state: 'loading' });",
        '    this.api.products(this.picked()).subscribe({',
        '      next: ps => this.load.set(ps.length',
        "        ? { state: 'ready', data: ps } : { state: 'empty' }),",
        '      error: () => this.load.set({',
        "        state: 'error',",
        "        msg: 'Could not reach the shop. Try again.' })",
        '    });',
        '  }',
        '}'
      ]},
      { t: 'note', label: { en: 'Best practice — model the states, do not improvise them', ar: 'عادة صح — اكتب الحالات كنوع، ومتخترعهاش في الطريق' },
        en: `The <code>Load&lt;T&gt;</code> union makes it <b>impossible to render data you do not have</b>: inside <code>@case ('ready')</code> the compiler knows <code>load().data</code> exists. A <code>loading: boolean</code> flag cannot give you that guarantee — it is the source of the classic undefined-list bug. Topic 22 showed <code>toSignal</code>; the union shape is what you graduate to when the states get real.`,
        ar: `اتحاد <code>Load&lt;T&gt;</code> بيخلي <b>عرض داتا معندكش فيها حاجة مستحيل</b>: جوه <code>@case ('ready')</code> الـ compiler عارف إن <code>load().data</code> موجودة. علم <code>loading: boolean</code> مش هيديك الضمانة دي — وهو مصدر باج الليستة undefined الكلاسيكي. الموضوع 22 وراك <code>toSignal</code>؛ وشكل الاتحاد ده اللي بتتدرّج ليه لما الحالات تبقى حقيقية.`
      },
      { t: 'chk', en: `Products render with working category buttons. Prove the error state: DevTools → Network → Offline, reload, and you see the friendly message instead of a blank page. Turn the network back on, click a category, and it recovers.`,
        ar: `المنتجات بتظهر وزار الفئات شغال. اثبت حالة الخطأ: DevTools ← Network ← Offline، واعمل reload، وهتشوف الرسالة اللطيفة بدل صفحة فاضية. رجّع النت ودوس على فئة، وهيرجع شغال.` }
    ]
  },

  {
    id: 's4', kicker: { en: 'Step 04', ar: 'الخطوة 04' },
    title: { en: 'Detail page from a route param', ar: 'صفحة التفاصيل من باراميتر المسار' },
    lead: {
      en: `The page reads <code>:id</code> from the URL, fetches, and renders. One new idea only: <code>input()</code> <b>binds route parameters</b> — no manual subscription.`,
      ar: `الصفحة بتقرا <code>:id</code> من الـ URL وتجيب وتعرض. فكرة واحدة جديدة بس: <code>input()</code> <b>بتقبل باراميترات المسار</b> — من غير subscription بالإيد.`
    },
    blocks: [
      { t: 'code', name: 'src/app/pages/product-detail/product-detail.ts', lang: 'ts', tag: { en: 'new page', ar: 'صفحة جديدة' }, code: [
        "import { Component, inject, input } from '@angular/core';",
        "import { RouterLink } from '@angular/router';",
        "import { toSignal } from '@angular/core/rxjs-interop';",
        "import { map } from 'rxjs';",
        "import { StoreApi } from '../../api/store-api.service';",
        "import { CartService } from '../../cart.service';",
        '',
        '@Component({',
        "  selector: 'product-detail',",
        '  imports: [RouterLink],',
        '  template: `',
        '    @if (product(); as p) {',
        '      <h1>{{ p.title }}</h1>',
        '      <img [src]="p.image" [alt]="p.title" width="160">',
        '      <p>{{ p.description }}</p>',
        '      <p>{{ p.price }}</p>',
        '      <button (click)="cart.add(p)">Add to cart</button>',
        '      <a routerLink="/">← back</a>',
        '    } @else {',
        '      <p>Loading…</p>',
        '    }',
        '  `',
        '})',
        'export class ProductDetail {',
        '  private api = inject(StoreApi);',
        '  cart = inject(CartService);',
        '',
        '  id = input.required<string>();    // ← route param, by name',
        '',
        '  product = toSignal(',
        '    toObservable(this.id).pipe(',
        '      map(id => Number(id)),',
        '      switchMap(id => this.api.product(id))',
        '    ),',
        '    { initialValue: null }',
        '  );',
        '}'
      ]},
      { t: 'code', name: 'src/app/app.config.ts (one change)', lang: 'ts', tag: { en: 'one provider', ar: 'بروڤايدر واحد' }, code: [
        "import { withComponentInputBinding } from '@angular/router';",
        '',
        'provideRouter(routes, withComponentInputBinding())',
        ''
      ]},
      { t: 'note', label: { en: 'Best practice — alt text is not optional', ar: 'عادة صح — النص البديل مش رفاهية' },
        en: `<code>[alt]="p.title"</code> on the image. Screen readers, broken images, and search engines all read it. It costs one attribute; skipping it costs real users.`,
        ar: `<code>[alt]="p.title"</code> على الصورة. قارئات الشاشة والصور المكسورة ومحركات البحث كلهم بيقراه. بياخد attribute واحد؛ والتفويت بيكلف مستخدمين حقيقيين.`
      },
      { t: 'chk', en: `Click any product in the list: the URL is <code>/product/7</code>-style, the page fetches and renders, and "Add to cart" works against the cart service you bring over in the next step.`,
        ar: `دوس على أي منتج في الليستة: الـ URL هيبقى بالشكل <code>/product/7</code>، والصفحة بتجيب وتعرض، و"Add to cart" هيشتغل مع خدمة الكارت اللي هتجيبها في الخطوة الجاية.` }
    ]
  },

  {
    id: 's5', kicker: { en: 'Step 05', ar: 'الخطوة 05' },
    title: { en: 'Bring the CartService over', ar: 'هات خدمة الكارت من الجزء التاني' },
    lead: {
      en: `Copy <code>cart.service.ts</code> from the cart project. The interface said cart state was never the components' business, so <b>nothing else moves</b>.`,
      ar: `انسخ <code>cart.service.ts</code> من مشروع الكارت. الواجهة كانت قالت إن حالة الكارت مش شغلانة الـ components، ف<b>ولا حاجة تانية بتتحرك</b>.`
    },
    blocks: [
      { t: 'ul',
        en: [
          `Copy <code>CartService</code> and <code>CartLine</code> unchanged; <code>Product</code> becomes <code>ApiProduct</code> (same fields plus two).`,
          `The cart page from Part B becomes <code>pages/cart/cart.ts</code> and keeps working with zero logic changes.`,
          `This is the payoff moment for the service boundary: the server changed from "hardcoded array" to "real HTTP API" and the cart did not notice.`
        ],
        ar: [
          `انسخ <code>CartService</code> و<code>CartLine</code> زي ما هما؛ <code>Product</code> هتبقى <code>ApiProduct</code> (نفس الحقول واثنين زيادة).`,
          `صفحة الكارت من الجزء التاني هتبقى <code>pages/cart/cart.ts</code> وهتفضل شغالة من غير أي تغيير في المنطق.`,
          `دي لحظة العوافض من حد الـ service: السيرفر اتغير من "مصفوفة ثابتة" لـ"API حقيقي" والكارت محسش.`
        ]
      },
      { t: 'chk', en: `<code>/cart</code> works exactly as before, now on top of real product data. Add from the list and from the detail page — one line per product, quantities preserved.`,
        ar: `<code>/cart</code> شغالة زي ما كانت بالظبط، بس فوق داتا حقيقية. ضيف من الليستة ومن صفحة التفاصيل — سطر واحد لكل منتج، والكميات محفوظة.` }
    ]
  },

  {
    id: 's6', kicker: { en: 'Step 06', ar: 'الخطوة 06' },
    title: { en: 'Checkout as a typed reactive form', ar: 'الدفع كفورم متجاوب بأنواع' },
    lead: {
      en: `The form topic 16 spent a whole page on, in full: typed controls, a phone pattern, conditional fields, and a disabled-until-valid submit.`,
      ar: `الفورم اللي الموضوع 16 قضى فيها صفحة كاملة، هنا كاملة: controls بأنواع، وباترون تليفون، وحقول شرطية، وsubmit متعطّل لحد ما يبقى صالح.`
    },
    blocks: [
      { t: 'code', name: 'src/app/pages/checkout/checkout.ts', lang: 'ts', tag: { en: 'new page', ar: 'صفحة جديدة' }, code: [
        "import { Component, inject } from '@angular/core';",
        "import { ReactiveFormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';",
        "import { Router } from '@angular/router';",
        "import { CartService } from '../../cart.service';",
        '',
        '@Component({',
        "  selector: 'checkout',",
        '  imports: [ReactiveFormsModule],',
        '  template: `',
        '    <h1>Checkout</h1>',
        '    <p>Total: {{ cart.total() }}</p>',
        '    <form [formGroup]="form" (ngSubmit)="placeOrder()">',
        '',
        '      <label for="name">Full name</label>',
        '      <input id="name" formControlName="name">',
        '      @if (form.controls.name.hasError(\'required\')) {',
        '        <small>Name is required.</small>',
        '      }',
        '',
        '      <label for="phone">Phone</label>',
        '      <input id="phone" formControlName="phone">',
        '      @if (form.controls.phone.hasError(\'pattern\')) {',
        '        <small>Egyptian phone: 11 digits starting 01.</small>',
        '      }',
        '',
        '      <label for="street">Street</label>',
        '      <input id="street" formControlName="street">',
        '',
        '      <label for="city">City</label>',
        '      <input id="city" formControlName="city">',
        '',
        '      <label for="payment">Payment</label>',
        '      <select id="payment" formControlName="payment">',
        '        <option value="cod">Cash on delivery</option>',
        '        <option value="card">Card</option>',
        '      </select>',
        '',
        '      @if (form.controls.payment.value === \'card\') {',
        '        <label for="card">Card number</label>',
        '        <input id="card" formControlName="card">',
        '      }',
        '',
        '      <button [disabled]="form.invalid">Place order</button>',
        '    </form>',
        '  `',
        '})',
        'export class Checkout {',
        '  cart = inject(CartService);',
        '  private router = inject(Router);',
        '  private fb = inject(NonNullableFormBuilder);',
        '',
        '  form = this.fb.group({',
        "    name:    ['', Validators.required],",
        "    phone:   ['', Validators.pattern(/^01[0125][0-9]{8}$/)],",
        "    street:  ['', Validators.required],",
        "    city:    ['', Validators.required],",
        "    payment: ['cod'],",
        "    card:    [''],",
        '  });',
        '',
        '  placeOrder() {',
        '    if (this.form.invalid) return;',
        '    // A real store would POST here (topics 22–23). We fake success:',
        '    this.cart.clear();',
        "    this.router.navigate(['/']);",
        '  }',
        '}'
      ]},
      { t: 'note', label: { en: 'The null that surprises everyone', ar: 'الـ null اللي بتفاجئ الكل' },
        en: `<code>NonNullableFormBuilder</code> is the whole trick: with the plain builder, <code>form.controls.name.value</code> is <code>string | null</code> and every consumer pays for it. Topic 16 explains why; here, just build the habit.`,
        ar: `<code>NonNullableFormBuilder</code> هو الحيلة كلها: مع الـ builder العادي، <code>form.controls.name.value</code> بتكون <code>string | null</code> وكل مستخدم بيغتسل الدنيا دي. الموضوع 16 بيشرح ليه؛ هنا، ابني العادة بس.`
      },
      { t: 'chk', en: `Submit is disabled until the required fields pass; the phone pattern rejects 10 digits; choosing "Card" reveals the card field. Add <code>clear()</code> to the cart service (one <code>set([])</code> line).`,
        ar: `الـ submit متعطّل لحد ما الحقول المطلوبة تعدي؛ والباترون بيرفض 10 أرقام؛ واختيار "Card" بيظهر خانة الكارت. ضيف <code>clear()</code> لخدمة الكارت (سطر <code>set([])</code> واحد).` }
    ]
  },

  {
    id: 's7', kicker: { en: 'Step 07', ar: 'الخطوة 07' },
    title: { en: 'A guard: no checkout with an empty cart', ar: 'Guard: مفيش دفع بكارت فاضي' },
    lead: {
      en: `A <b>function</b> that returns a decision. Routes are data, guards are functions — and this one is three lines because the cart exposes a signal.`,
      ar: `<b>دالة</b> بترجع قرار. الـ routes داتا والـ guards دوال — ودي تلات سطور لأن الكارت بيكشف signal.`
    },
    blocks: [
      { t: 'code', name: 'src/app/checkout.guard.ts', lang: 'ts', tag: { en: 'new file', ar: 'ملف جديد' }, code: [
        "import { inject } from '@angular/core';",
        "import { CanActivateFn, Router } from '@angular/router';",
        "import { CartService } from './cart.service';",
        '',
        'export const checkoutGuard: CanActivateFn = () => {',
        '  const cart = inject(CartService);',
        '  const router = inject(Router);',
        "  return cart.count() > 0 || router.parseUrl('/cart');",
        '};'
      ]},
      { t: 'code', name: 'src/app/app.routes.ts', lang: 'ts', tag: { en: 'attach it', ar: 'علّقه' }, code: [
        "import { checkoutGuard } from './checkout.guard';",
        '',
        '// in the checkout route:',
        '  canActivate: [checkoutGuard],',
        ''
      ]},
      { t: 'pair',
        bad: { name: 'the guard that reaches around DI', code: [
          'export const badGuard = () => {',
          '  const svc = new CartService();   // a NEW, empty instance!',
          '  return svc.count() > 0;          // always false',
          '};',
          '',
          '// Guards must ask the injector, never "new".'
        ]},
        good: { name: 'ask the injector', code: [
          'const cart = inject(CartService);  // the singleton',
          "return cart.count() > 0 || router.parseUrl('/cart');"
        ]}},
      { t: 'chk', en: `Type <code>/checkout</code> in the URL bar with an empty cart: you land on <code>/cart</code> instead. Add something, and checkout opens.`,
        ar: `اكتب <code>/checkout</code> في شريط العنوان والكارت فاضي: بتهبط على <code>/cart</code>. ضيف حاجة، والدفع بيفتح.` }
    ]
  },

  {
    id: 's8', kicker: { en: 'Step 08', ar: 'الخطوة 08' },
    title: { en: 'An interceptor: retry and a friendly message', ar: 'Interceptor: إعادة محاولة ورسالة لطيفة' },
    lead: {
      en: `One function through which <b>every</b> HTTP call flows. That is where cross-cutting concerns live: retrying flaky requests, normalising errors, logging.`,
      ar: `دالة واحدة بيمر عليها <b>كل</b> نداءات الـ HTTP. دي المكان اللي الحاجات العرضية بتعيش فيه: إعادة المحاولة، وتوحيد الأخطاء، والتسجيل.`
    },
    blocks: [
      { t: 'code', name: 'src/app/api/api.interceptor.ts', lang: 'ts', tag: { en: 'new file', ar: 'ملف جديد' }, code: [
        "import { HttpInterceptorFn } from '@angular/common/http';",
        "import { catchError, retry, throwError } from 'rxjs';",
        '',
        'export const apiInterceptor: HttpInterceptorFn = (req, next) =>',
        '  next(req).pipe(',
        '    retry({ count: 2, delay: 400 }),   // transient network hiccups',
        '    catchError(err => {',
        '      const msg = err.status === 404',
        "        ? 'Not found.'",
        "        : 'Network problem — try again.';",
        '      return throwError(() => new Error(msg));',
        '    })',
        '  );'
      ]},
      { t: 'code', name: 'src/app/app.config.ts', lang: 'ts', tag: { en: 'register it', ar: 'سجّله' }, code: [
        "import { provideHttpClient, withInterceptors } from '@angular/common/http';",
        "import { apiInterceptor } from './api/api.interceptor';",
        '',
        'provideHttpClient(withInterceptors([apiInterceptor]))',
        ''
      ]},
      { t: 'note', label: { en: 'Retry GETs, never blindly retry POSTs', ar: 'أعِد الـ GET، وعمرك ما تعيد POST بثقة' },
        en: `Public APIs fail transiently all the time; two quick retries fix most of it for three lines of code. But a retried POST can double an order — topics 22 and 23 draw that line. In real code, retry only idempotent requests.`,
        ar: `الـ APIs العامة بتفشل فجائي طول الوقت؛ ومحاولتين سريعين بيحلوا معظمها بثلاث سطور. بس الـ POST اللي بيتعاد ممكن يضاعف الأوردر — الموضوعين 22 و23 بيرسموا الخط ده. في الكود الحقيقي، أعِد بس الطلبات اللي مفيهاش ضرر لو اتكررت.`
      },
      { t: 'chk', en: `Kill your network during a category switch: the retry buys you a beat before the error lands, and the message is yours, not the browser's.`,
        ar: `قطّع النت أثناء تبديل الفئة: الـ retry بيشتريلك ثانية قبل ما الخطأ يوصل، والرسالة رسالتك إنت، مش رسالة البراوزر.` }
    ]
  },

  {
    id: 's9', kicker: { en: 'Step 09', ar: 'الخطوة 09' },
    title: { en: 'Material polish, the lazy way', ar: 'تجميل بـ Material، وبطريقة كسولة' },
    lead: {
      en: `Topic 27's library, applied with restraint: buttons and inputs get real components, and <b>each Material module rides the route that uses it</b> thanks to your lazy routes.`,
      ar: `مكتبة الموضوع 27، مع أولّة: الأزرار والإدخالات بياخدوا components حقيقية، و<b>كل موديول Material بيروح مع المسار اللي بيستخدمه</b> بفضل الـ lazy routes بتاعتك.`
    },
    blocks: [
      { t: 'code', name: 'terminal', lang: 'bash', tag: { en: 'install', ar: 'التثبيت' }, code: [
        'ng add @angular/material'
      ]},
      { t: 'code', name: 'src/app/pages/checkout/checkout.ts (excerpt)', lang: 'ts', tag: { en: 'only where used', ar: 'بس فين ما تستخدم' }, code: [
        "import { MatFormFieldModule } from '@angular/material/form-field';",
        "import { MatInputModule } from '@angular/material/input';",
        "import { MatButtonModule } from '@angular/material/button';",
        '',
        '@Component({',
        '  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],',
        '  // … template uses <mat-form-field>, <mat-label>, <input matInput>,',
        '})'
      ]},
      { t: 'chk', en: `Checkout looks like a product, not a science project, and the product list is still fast: Material's code ships only on routes that import it. Check the Network tab — <code>checkout</code> has its own chunk.`,
        ar: `صفحة الدفع بقت شكلها حاجة محترمة مش تجربة علمية، وليستة المنتجات لسه سريعة: كود Material بينزل بس على المسارات اللي بتستورده. افتح تاب Network — الـ <code>checkout</code> ليها chunk لوحدها.` }
    ]
  },

  {
    id: 's10', kicker: { en: 'Step 10', ar: 'الخطوة 10' },
    title: { en: 'The ship-it checklist', ar: 'تشيك ليست النشر' },
    lead: {
      en: `Phase 02 ends where professional work ends: <b>built, committed, deployed, and measurable</b>.`,
      ar: `المرحلة 02 بتقفل زي الشغل المحترف بيقفل: <b>مبني، ومتسجل، ومنشور، وقابل للقياس</b>.`
    },
    blocks: [
      { t: 'ul',
        en: [
          `<code>ng build</code> — read the size report: initial bundle, route chunks. You will compare against these numbers in phase 03.`,
          `<b>Commit</b> ("real store: api, routes, forms, guard, interceptor") and <b>push</b>.`,
          `<b>Deploy</b> — Netlify/Vercel take the <code>dist/store/browser</code> folder, or use Firebase Hosting. Write the URL into the repo README.`,
          `<b>Use it on your phone</b>: the store, the detail page, a full checkout. Every bug you find on mobile is a story for your interview.`
        ],
        ar: [
          `<code>ng build</code> — اقرا تقرير الأحجام: الباندل الأولي، وchunks المسارات. هتقارن بالأرقام دي في المرحلة 03.`,
          `<b>Commit</b> ("real store: api, routes, forms, guard, interceptor") و<b>push</b>.`,
          `<b>نشر</b> — Netlify/Vercel بياخدوا فولدر <code>dist/store/browser</code>، ولا Firebase Hosting. واكتب اللينك في README بتاع الـ repo.`,
          `<b>استخدمه من موبايلك</b>: المتجر، وصفحة التفاصيل، ودفع كامل. كل باج هتلاقيه على الموبايل هيبقى حكاية تقولها في الإنترفيو.`
        ]
      },
      { t: 'chk', en: `A public URL that runs a multi-page, real-API, validated, guarded store. This is the project you show people — and the repo shows how you built it.`,
        ar: `لينك عام شغال فيه متجر متعدد الصفحات على API حقيقي، بتحقق وحماية. ده المشروع اللي هتوريه للناس — والـ repo بيورّي إزاي بنيته.` }
    ]
  }
  ]
};

/* ==================================================================
   ADVANCED — the production pass on the store from phase 02.
   ================================================================== */
export const advanced = {
  tab: 'Build: the production pass',
  say: {
    en: 'Eight steps on the store you built: baseline numbers, OnPush, zoneless, @defer, budgets, unit and Playwright tests, deploy and CI — with every before/after number written down.',
    ar: 'تمنية خطوات على المتجر اللي بنيته: أرقام أساسية، وOnPush، وzoneless، وdefer، وbudgets، وتستات وPlaywright، ونشر وCI — وكل رقم قبل وبعد مكتوب.'
  },
  title: { en: 'Make the store measurably faster', ar: 'خلي المتجر أسرع بشكل مقيس' },
  lead: {
    en: `The phase-03 project: the store you built in phase 02 goes through a <b>production pass</b>. Measure first, change one thing, measure again — and write every number down. That last part is what makes this a senior exercise instead of a box-ticking one, and it is what you will talk about in interviews.`,
    ar: `مشروع المرحلة 03: المتجر اللي بنيته في المرحلة 02 بيعدي على <b>بَسّة إنتاجية</b>. قِس الأول، وغيّر حاجة واحدة، وقِس تاني — واكتب كل رقم. الجزء الأخير ده هو اللي بيفرّق التمرين ده عن تعبئة استمارة، وهو اللي هتحكي عنه في الإنترفيوهات.`
  },

  sections: [

  {
    id: 'prod', kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'The rule: numbers or it did not happen', ar: 'القاعدة: من غير أرقام، مفيش حاجة حصلت' },
    lead: {
      en: `Eight steps. You need the phase-02 store, its repo, and a text file called <code>PERF.md</code>. Every step ends with a number in that file. Fast is not a feeling.`,
      ar: `تمنية خطوات. محتاج متجر المرحلة 02 والـ repo بتاعه وملف اسمه <code>PERF.md</code>. كل خطوة بتقفل برقم مكتوب في الملف ده. السرعة مش إحساس.`
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Step', 'Change', 'What you measure'], ar: ['الخطوة', 'التغيير', 'اللي بتقيسه'] },
        rows: [
          { en: ['01', 'nothing — the baseline', 'Lighthouse, bundle size, runtime profile'], ar: ['01', 'ولا حاجة — الخط الأساسي', 'Lighthouse وحجم الباندل وprofile التشغيل'] },
          { en: ['02–03', 'OnPush, then zoneless', 'change-detection time, CPU on idle'], ar: ['02–03', 'OnPush وبعدين zoneless', 'وقت الـ change detection والـ CPU وهو واقف'] },
          { en: ['04–05', '@defer, then budgets', 'initial bundle, first paint'], ar: ['04–05', '@defer وبعدين budgets', 'الباندل الأولي وأول رسمة'] },
          { en: ['06–07', 'tests, then deploy', 'test pass, live URL'], ar: ['06–07', 'تستات وبعدين نشر', 'نجاح التستات ولينك شغال'] },
          { en: ['08', 'CI', 'green check on every push'], ar: ['08', 'CI', 'علامة خضرا على كل push'] }
        ]
      }
    ]
  },

  {
    id: 'p1', kicker: { en: 'Step 01', ar: 'الخطوة 01' },
    title: { en: 'Record the baseline', ar: 'سجّل الخط الأساسي' },
    lead: {
      en: `Before touching anything, capture three numbers. Optimising without a baseline is how people make apps <em>slower</em> while feeling productive.`,
      ar: `قبل ما تلمس أي حاجة، ثبّت تلات أرقام. التحسين من غير خط أساسي هو الطريقة اللي الناس بتبطّل بيها التطبيقات <em>وكمان</em> حاسة إنها بتشتغل.`
    },
    blocks: [
      { t: 'code', name: 'terminal', lang: 'bash', tag: { en: 'the size number', ar: 'رقم الحجم' }, code: [
        'ng build',
        '# read the summary: Initial total, Lazy chunks'
      ]},
      { t: 'code', name: 'PERF.md', lang: 'bash', tag: { en: 'the log begins', ar: 'بداية السجل' }, code: [
        '# Store — production pass log',
        '',
        '## Baseline (before any change)',
        '- Lighthouse mobile (prod build, served):  __',
        '  - FCP __  LCP __  TBT __',
        '- ng build initial bundle: __ KB',
        '- DevTools profile, idle after load: __ ms change-detection / 10 s',
        '- Playwright smoke: none yet'
      ]},
      { t: 'ul',
        en: [
          `Lighthouse must run against the <b>production build served locally</b> (<code>ng build</code> then serve <code>dist/store/browser</code>), never against <code>ng serve</code> — dev builds are unoptimised and lie.`,
          `For the runtime number: Angular DevTools → Profiler → record 10 seconds of the app idling. Under zone.js the number is usually <em>not</em> zero — that is your step 03 payoff.`
        ],
        ar: [
          `الـ Lighthouse لازم يشتغل على <b>بيلد الإنتاج والمُقدَّم محلياً</b> (<code>ng build</code> وبعدين قدّم <code>dist/store/browser</code>)، عمره ما على <code>ng serve</code> — بيلدات التطوير مش محسّنة وبتكدب.`,
          `لرقم التشغيل: Angular DevTools ← Profiler ← سجّل 10 ثواني والتطبيق واقف مبيعملش حاجة. تحت zone.js الرقم غالباً <em>مش</em> صفر — ودي الفايدة اللي هتظهر في الخطوة 03.`
        ]
      },
      { t: 'chk', en: `<code>PERF.md</code> has five real numbers in it, and the repo is committed in this state — the diff at the end will be your evidence.`,
        ar: `<code>PERF.md</code> فيه خمس أرقام حقيقية، والـ repo متسجل بالحالة دي — والـ diff في الآخر هيبقى دليلك.` }
    ]
  },

  {
    id: 'p2', kicker: { en: 'Step 02', ar: 'الخطوة 02' },
    title: { en: 'OnPush everywhere', ar: 'OnPush في كل حتة' },
    lead: {
      en: `One line per component, and it is safe <b>because</b> you built on signals from the start — inputs are signals, state is signals, so every component already knows when its inputs change.`,
      ar: `سطر واحد لكل component، وهو آمن <b>لأنك</b> بنيته على signals من الأول — الـ inputs هي signals والحالة هي signals، فكل component عارفة أصلاً إمتى inputs بتاعتها بتتغير.`
    },
    blocks: [
      { t: 'code', name: 'one line per component', lang: 'ts', tag: { en: 'repeat 5×', ar: 'كررها 5 مرات' }, code: [
        '@Component({',
        "  selector: 'product-list',",
        '  changeDetection: ChangeDetectionStrategy.OnPush,',
        '  // …',
        '})'
      ]},
      { t: 'note', label: { en: 'Why this never breaks your app', ar: 'ليه دي عمرك ما هتبوّظ تطبيقك' },
        en: `The classic OnPush bugs come from mutating fields the template reads — <code>push()</code>, <code>splice()</code>, property writes. Your store replaced the reference on every update, exactly as the beginner project drilled. If something <em>does</em> stop updating after this step, that is not an OnPush bug to work around; it is a mutation bug you just discovered. Fix the mutation, not the symptom.`,
        ar: `باجات الـ OnPush الكلاسيكية بتيجي من تعديل حقول التمبلت بيقراها — <code>push()</code> و<code>splice()</code> وتعديل خصائص. المخزن بتاعك كان ببدّل الـ reference مع كل تحديث، بالظبط زي ما مشروع المبتدئ درّبك. لو حاجة <em>بقت</em> مش بتتحدث بعد الخطوة دي، دي مش باج OnPush تعالجه — دي باج mutation لسه بتكتشفها. صلّح الـ mutation، مش العرَض.`
      },
      { t: 'chk', en: `Everything still works, and the DevTools Profiler now shows <b>far fewer</b> components checked per interaction. Number into <code>PERF.md</code>.`,
        ar: `كل حاجة شغالة، والـ Profiler في DevTools دلوقتي بيعرض <b>أقل بكتير</b> من الـ components بتتفحص في كل تفاعل. الرقم في <code>PERF.md</code>.` }
    ]
  },

  {
    id: 'p3', kicker: { en: 'Step 03', ar: 'الخطوة 03' },
    title: { en: 'Go zoneless', ar: 'دخل عالم zoneless' },
    lead: {
      en: `Delete the thing that guessed for you. Zoneless is stable in Angular v20+, and your signal-based app is already the shape it requires.`,
      ar: `شيل الحاجة اللي كانت بتخمّن بدالك. الـ zoneless مستقر في أنجولار v20+، وتطبيقك المعتمد على signals أصلاً هو الشكل اللي بطلبه.`
    },
    blocks: [
      { t: 'code', name: 'src/app/app.config.ts', lang: 'ts', tag: { en: 'swap the provider', ar: 'بدّل الـ provider' }, code: [
        "import { provideZonelessChangeDetection } from '@angular/core';",
        '',
        'export const appConfig: ApplicationConfig = {',
        '  providers: [',
        '    provideZonelessChangeDetection(),',
        '    provideRouter(routes, withComponentInputBinding()),',
        '    provideHttpClient(withInterceptors([apiInterceptor])),',
        '  ],',
        '};'
      ]},
      { t: 'code', name: 'angular.json (polyfills)', lang: 'json', tag: { en: 'remove zone.js', ar: 'شيل zone.js' }, code: [
        '"polyfills": [',
        '  // "zone.js"   ← delete this line',
        ']'
      ]},
      { t: 'pair',
        bad: { name: 'the pattern that breaks zoneless', code: [
          '// a callback from outside Angular:',
          'chartLib.onUpdate(v => {',
          '  this.price = v;        // plain field — nobody notices',
          '});'
        ]},
        good: { name: 'the pattern that cannot break', code: [
          'chartLib.onUpdate(v => {',
          '  this.price.set(v);     // signal — update is scheduled',
          '});'
        ]}},
      { t: 'note', label: { en: 'Measure, then compare', ar: 'قِس، وبعدين قارن' },
        en: `Re-run the idle profile. Under zone.js, every macrotask — timers, XHR, third-party callbacks — triggered a full tree walk. Zoneless with signals does targeted updates, and the idle number should drop to roughly zero. The app <em>works identically</em>; the machinery underneath got honest.`,
        ar: `أعد قياس الـ profile وهو واقف. تحت zone.js، كل macrotask — تايمرات وXHR وcallbacks من مكتبات — كان بيخلي لفة كاملة على الشجرة. الـ zoneless مع الـ signals بيعمل تحديثات موجهة، والرقم الموقوف المفروض ينزل لحوالي الصفر. التطبيق <em>شغال بنفس الشكل</em>؛ والماكينة اللي تحته بقت بتقول الحقيقة.`
      },
      { t: 'chk', en: `Full manual pass — list, categories, detail, cart, checkout, the fake order — behaves exactly as before. Idle change-detection time into <code>PERF.md</code>, next to the baseline.`,
        ar: `لفة يدوية كاملة — ليستة وفئات وتفاصيل وكارت ودفع والأوردر المزوّر — شغالة بنفس الشكل بالظبط. وقت الـ change detection وهو واقف في <code>PERF.md</code>، جانب الخط الأساسي.` }
    ]
  },

  {
    id: 'p4', kicker: { en: 'Step 04', ar: 'الخطوة 04' },
    title: { en: '@defer the heavy parts', ar: '@defer للحاجات التقيلة' },
    lead: {
      en: `The product list does not need every card's weight in the first paint. <code>@defer</code> ships the below-the-fold parts when they approach the viewport — declaratively, no IntersectionObserver code.`,
      ar: `ليستة المنتجات مش محتاجة وزن كل الكروت في أول رسمة. الـ <code>@defer</code> بيشحن الأجزاء اللي تحت لما تقرب من الشاشة — تعريفي، ومن غير كود IntersectionObserver.`
    },
    blocks: [
      { t: 'code', name: 'product-list.html (extracted)', lang: 'html', tag: { en: 'defer on scroll', ar: 'defer مع السكرول' }, code: [
        '@defer (on viewport) {',
        '  <ul class="grid">',
        '    @for (p of load().data; track p.id) {',
        '      <li>…</li>',
        '    }',
        '  </ul>',
        '} @placeholder (minimum 200px) {',
        '  <p>Product list is loading…</p>',
        '}'
      ]},
      { t: 'note', label: { en: 'Best practice — a real placeholder, always', ar: 'عادة صح — placeholder حقيقي، دايماً' },
        en: `<code>@placeholder</code> is not decoration: it reserves layout space so the deferred chunk loading does not shift the page (CLS), and it is what users on slow networks actually see. Give it real height.`,
        ar: `<code>@placeholder</code> مش زينة: بيحجز مساحة في التخطيط عشان تحميل الـ chunk ما يزحلقش الصفحة (CLS)، وهو اللي المستخدم على شبكات بطيئة بيشوفه فعلاً. اديله ارتفاع حقيقي.`
      },
      { t: 'chk', en: `Network tab, throttled to Slow 4G: the main chunk loads first, and a separate <code>chunk-*.js</code> arrives only as the list scrolls into view. Lighthouse FCP/TBT into <code>PERF.md</code>.`,
        ar: `تاب Network، مضبوط على Slow 4G: الـ chunk الرئيسي بينزل الأول، و<code>chunk-*.js</code> منفصل بينزل بس لما الليستة تدخل الشاشة. أرقام FCP وTBT من Lighthouse في <code>PERF.md</code>.` }
    ]
  },

  {
    id: 'p5', kicker: { en: 'Step 05', ar: 'الخطوة 05' },
    title: { en: 'Budgets: make regressions impossible', ar: 'Budgets: امنع الرجوع للور' },
    lead: {
      en: `You have good numbers now. Budgets are how you <b>keep</b> them: the build itself fails when a bundle grows past the line you set.`,
      ar: `عندك أرقام كويسة دلوقتي. الـ budgets هي الطريقة اللي <b>هتحافظ</b> بيها عليهم: البيلد نفسه بيفشل لما الباندل يكبر عن الخط اللي حددته.`
    },
    blocks: [
      { t: 'code', name: 'angular.json', lang: 'json', tag: { en: 'your lines in the sand', ar: 'خطوطك اللي محددها' }, code: [
        '"budgets": [',
        '  {',
        '    "type": "initial",',
        '    "maximumWarning": "450kB",',
        '    "maximumError": "550kB"',
        '  },',
        '  {',
        '    "type": "anyComponentStyle",',
        '    "maximumWarning": "4kB",',
        '    "maximumError": "8kB"',
        '  }',
        ']'
      ]},
      { t: 'ul',
        en: [
          `Set the warning about 10% above today's number, and the error another 10% up — tight enough to catch slop, loose enough not to nag every week.`,
          `Prove it works: temporarily drop <code>maximumError</code> below your current size and watch <code>ng build</code> fail. Then restore. You now have a build that refuses to get fat.`,
          `This is the deployment gap in the roadmap's "not covered" list, met head-on — budget enforcement is a CI concern too, and step 08 wires it there.`
        ],
        ar: [
          `حدد التحذير حوالي 10% فوق رقم النهاردة، والخطأ 10% كمان — قريب كفاية إنه يمسك أي تضخيم، ومتسع كفاية إنه مايزنّقش كل أسبوع.`,
          `اثبت إنه شغال: نزّل <code>maximumError</code> مؤقتاً تحت حجمك الحالي وشوف <code>ng build</code> بيفشل. وبعدين رجّعه. دلوقتي عندك بيلد بيرفض يتسمّن.`,
          `دي المرة الأولى اللي بنقفل فيها من فجوة "النشر والـ CI" اللي خطة التعلّم سجلتها — فرض الـ budgets موضوع CI كمان، والخطوة 08 هتوصله هناك.`
        ]
      },
      { t: 'chk', en: `A deliberately-over-budget build fails with a clear error, a normal build passes. Initial bundle number into <code>PERF.md</code> beside the baseline.`,
        ar: `بيلد متضخم بقصد بيفشل بخطأ واضح، والبيلد العادي بيعدي. رقم الباندل الأولي في <code>PERF.md</code> جانب الخط الأساسي.` }
    ]
  },

  {
    id: 'p6', kicker: { en: 'Step 06', ar: 'الخطوة 06' },
    title: { en: 'Unit tests for the cart service', ar: 'تستات وحدية لخدمة الكارت' },
    lead: {
      en: `The cart is pure logic — which means <b>every rule you wrote can be proven</b> in milliseconds. This is where the readonly/computed discipline pays interest.`,
      ar: `الكارت منطق نقي — يعني <b>كل قاعدة كتبتها ممكن تتثبت</b> في أجزاء من الثانية. هنا عادة الـ readonly والـ computed بتدّي عوايدها.`
    },
    blocks: [
      { t: 'code', name: 'src/app/cart.service.spec.ts', lang: 'ts', tag: { en: 'new file', ar: 'ملف جديد' }, code: [
        "import { TestBed } from '@angular/core/testing';",
        "import { CartService } from './cart.service';",
        "import { ApiProduct } from './api/product';",
        '',
        "const p = (id: number, price: number): ApiProduct => ({",
        '  id, price,',
        "  title: 'x', category: 'c', description: 'd', image: 'i',",
        '});',
        '',
        "describe('CartService', () => {",
        '  let cart: CartService;',
        '',
        '  beforeEach(() => {',
        '    TestBed.configureTestingModule({});',
        '    cart = TestBed.inject(CartService);',
        '  });',
        '',
        "  it('merges the same product into one line', () => {",
        '    cart.add(p(1, 40));',
        '    cart.add(p(1, 40));',
        "    expect(cart.all().length).toBe(1);",
        "    expect(cart.all()[0].qty).toBe(2);",
        '  });',
        '',
        "  it('totals from qty × price, reactively', () => {",
        '    cart.add(p(1, 40));',
        '    cart.add(p(2, 25));',
        "    expect(cart.total()).toBe(65);",
        '    cart.setQty(2, 3);',
        "    expect(cart.total()).toBe(115);   // computed re-ran, no hand sync",
        '  });',
        '',
        "  it('removes cleanly', () => {",
        '    cart.add(p(1, 40));',
        '    cart.remove(1);',
        "    expect(cart.count()).toBe(0);",
        '  });',
        '});'
      ]},
      { t: 'note', label: { en: 'Test the contract, not the implementation', ar: 'اختبر العقد، مش التنفيذ' },
        en: `Notice what is asserted: merge behaviour, reactive totals, clean removal — the <em>contract</code> a store page depends on. No test peeks at private fields. When you refactor the service next month, these tests stay green and that is the whole point.`,
        ar: `خد بالك من اللي بتتأكد منه: سلوك الدمج، والإجماليات المتفاعلة، والمسح النضيف — <em>العقد</em> اللي صفحات المتجر معتمدة عليه. ولا تست بيدخل في الحقول الخاصة. لما تعمل refactor للـ service الشهر الجاي، التستات دي هتفضل خضرا، وده كل المقصود.`
      },
      { t: 'chk', en: `<code>ng test</code> passes, including the third test that would have failed before <code>computed()</code> existed. Test count into <code>PERF.md</code>.`,
        ar: `<code>ng test</code> ناجح، بما فيه التست التالت اللي كان هيقع قبل ما <code>computed()</code> تظهر. عدد التستات في <code>PERF.md</code>.` }
    ]
  },

  {
    id: 'p7', kicker: { en: 'Step 07', ar: 'الخطوة 07' },
    title: { en: 'A Playwright smoke test', ar: 'تست دخان بـ Playwright' },
    lead: {
      en: `One test, the user's whole journey: see a product, add it, guard-checkout it. Topic 44 in miniature — and the test that would have caught your worst bug.`,
      ar: `تست واحد، لرحلة المستخدم كلها: شوف منتج، ضيفه، وجرّب الدفع والـ guard. الموضوع 44 مصغّر — والتست اللي كان هي مسك وحش باجاتك.`
    },
    blocks: [
      { t: 'code', name: 'terminal', lang: 'bash', tag: { en: 'install once', ar: 'تثبيت مرة واحدة' }, code: [
        'npm i -D @playwright/test',
        'npx playwright install chromium'
      ]},
      { t: 'code', name: 'e2e/smoke.spec.ts', lang: 'ts', tag: { en: 'new file', ar: 'ملف جديد' }, code: [
        "import { test, expect } from '@playwright/test';",
        '',
        "test('a shopper can add to cart and checkout', async ({ page }) => {",
        "  await page.goto('/');",
        '  await expect(page.getByRole(\'heading\', { name: /products/i })).toBeVisible();',
        '',
        '  // first product: open it and add',
        "  await page.getByRole('link').nth(1).click();",
        "  await page.getByRole('button', { name: /add to cart/i }).click();",
        '',
        '  // cart shows one line',
        "  await page.getByRole('link', { name: /cart/i }).click();",
        "  await expect(page.getByText(/total/i)).toBeVisible();",
        '',
        '  // checkout is now allowed by the guard',
        "  await page.goto('/checkout');",
        "  await expect(page.getByRole('heading', { name: /checkout/i })).toBeVisible();",
        '});',
        '',
        "test('an empty cart is turned away from checkout', async ({ page }) => {",
        "  await page.goto('/checkout');",
        "  await expect(page).toHaveURL(/\\/cart/);",
        '});'
      ]},
      { t: 'code', name: 'terminal', lang: 'bash', tag: { en: 'run against the prod build', ar: 'شغّله على بيلد الإنتاج' }, code: [
        'ng build',
        'npx playwright test   # config points webServer at dist via a static server'
      ]},
      { t: 'note', label: { en: 'Best practice — test roles, not CSS', ar: 'عادة صح — اختبر الأدوار، مش الـ CSS' },
        en: `<code>getByRole</code>, never <code>.css-1x2y</code>. Role queries survive restyling, they fail when <em>accessibility</em> breaks — which is exactly what you want a test to catch. A passing role-based smoke test is also an a11y statement.`,
        ar: `<code>getByRole</code>، عمرك ما <code>.css-1x2y</code>. الاستعلامات بالأدوار بتنجو من تغيير الشكل، وبتفشل لما <em>الإتاحة</em> تتكسر — وده بالظبط اللي عايز التست يمسكه. تست دخان ناجح بالأدوار هو كمان إعلان إتاحة.`
      },
      { t: 'chk', en: `Both tests pass headless. The second one is your step-07 guard from phase 02, now permanently proven.`,
        ar: `التستين ناجحين من غير واجهة. التست التاني هو الـ guard بتاعك من المرحلة 02، دلوقتي متثبت للأبد.` }
    ]
  },

  {
    id: 'p8', kicker: { en: 'Step 08', ar: 'الخطوة 08' },
    title: { en: 'Deploy, then let CI protect it', ar: 'انشر، وبعدين خلي الـ CI يحميه' },
    lead: {
      en: `Two moves: a real host, and a pipeline that re-proves the build, the budgets and the tests on every push. This closes the roadmap's deployment/CI gap for your own projects.`,
      ar: `حركتين: هوست حقيقي، وخط أنابيب بيعيد إثبات البيلد والـ budgets والتستات مع كل push. بدها بتقفل فجوة النشر والـ CI بتاعة خطة التعلّم في مشاريعك إنت.`
    },
    blocks: [
      { t: 'code', name: 'terminal (Firebase Hosting)', lang: 'bash', tag: { en: 'deploy', ar: 'النشر' }, code: [
        'npm i -g firebase-tools',
        'firebase login',
        'firebase init hosting   # public dir: dist/store/browser, SPA rewrite: yes',
        'ng build && firebase deploy'
      ]},
      { t: 'code', name: '.github/workflows/ci.yml', lang: 'bash', tag: { en: 'new file', ar: 'ملف جديد' }, code: [
        'name: ci',
        'on: [push, pull_request]',
        'jobs:',
        '  build-test:',
        '    runs-on: ubuntu-latest',
        '    steps:',
        '      - uses: actions/checkout@v4',
        '      - uses: actions/setup-node@v4',
        '        with:',
        '          node-version: 22',
        '          cache: npm',
        '      - run: npm ci',
        '      - run: npx playwright install --with-deps chromium',
        '      - run: npm run build      # budgets run here — a fat bundle fails CI',
        '      - run: npm test -- --watch=false --browsers=ChromeHeadless',
        '      - run: npx playwright test'
      ]},
      { t: 'note', label: { en: 'Why this one yaml is a career move', ar: 'ليه الملف ده تحفة كاريير' },
        en: `This is exactly the loop a team runs: push → build with budgets → unit tests → e2e → green. You have now personally owned every stage of it, and "I set up the CI that enforced our bundle budgets" is an interview sentence most juniors cannot say. Serve the SPA rewrite (<code>index.html</code> fallback) or deep links like <code>/product/7</code> will 404.`,
        ar: `دي بالظبط اللوب اللي الفرق بتشتغل بيه: push ← بيلد بالـ budgets ← تستات وحدية ← e2e ← علامة خضرا. إنت دلوقتي مسيطر على كل مرحلة فيه بإيدك، وجملة "أنا اللي عملت الـ CI اللي بيلزم الباندل بالـ budgets" جملة إنترفيو مش كلjuniorنيور يقدر يقولها. ومتسربش إعادة التوجيه للـ SPA (fallback لـ<code>index.html</code>) — من غيرها لينكات زي <code>/product/7</code> هتدي 404.`
      },
      { t: 'chk', en: `The Actions tab shows a green check; the deployed URL serves a deep link directly. Fill in the final row of <code>PERF.md</code> — before and after, every number side by side.`,
        ar: `تاب Actions فيه علامة خضرا؛ واللينك المنشور بيفتح deep link مباشرة. كمّل آخر سطر في <code>PERF.md</code> — قبل وبعد، كل رقم جنب بعضه.` }
    ]
  }
  ]
};
