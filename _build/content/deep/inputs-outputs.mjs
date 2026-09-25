/* ==================================================================
   output(), name by name — a companion page after the inputs/outputs
   topic. One running example (a to-do list) followed through every
   file, with every name coloured by who owns it. Names list:
   content/names/output-names.mjs.
   This is the model for every other page in content/deep/.
   ================================================================== */

/* a name in running text, coloured like the code and linked on hover */
const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

export default {
  topic: 'inputs-outputs',          // the topic this page follows
  file: 'output-names.html',       // default would be <topic>-names.html
  tab: 'output(), name by name — The Angular Signal',
  names: 'output-names',           // a key in content/names/, or an inline { note, names }
  title: { en: '<code>output()</code>, name by name', ar: '<code>output()</code>، اسم اسم' },
  say: {
    en: 'The page for when outputs make you feel lost. One to-do list followed through all four files, every name coloured by who owns it: <b>Angular’s</b>, <b>yours</b>, or <b>yours but shared</b>. Then what breaks when you rename each one.',
    ar: 'الصفحة دي للي بيتوه في الـ outputs. ليستة to-do واحدة ماشيين وراها في الأربع ملفات، وكل اسم ملوّن حسب صاحبه: <b>بتاع أنجولار</b>، ولا <b>بتاعك</b>، ولا <b>بتاعك بس متشارك</b>. وبعدين إيه اللي بيبوظ لما تغيّر كل واحد.'
  },
  lead: {
    en: 'If outputs confuse you, it is almost never the idea. The idea is simple: <b>the child shouts, the parent decides what to do about it.</b> The confusing part is the names. Four or five of them appear across two components, and nobody tells you which ones are Angular’s, which ones you made up, and which ones must match. This page answers exactly that.',
    ar: 'لو الـ outputs ملخبطاك، فالمشكلة تقريبًا عمرها ما بتبقى في الفكرة. الفكرة بسيطة: <b>الابن بينادي، والأب هو اللي بيقرر يعمل إيه.</b> اللي بيلخبط هو الأسماء. فيه أربع أو خمس أسماء متوزعين على اتنين components، ومحدش بيقولك مين فيهم بتاع أنجولار، ومين انت اللي مألفه، ومين لازم يبقى زي التاني بالظبط. الصفحة دي بتجاوب على ده بالظبط.'
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One click, five stops', ar: 'كليك واحدة، خمس محطات' },
    lead: {
      en: 'A to-do list. Each row is a child component with a Delete button. The row cannot delete itself, because the list lives in the parent. So the row <b>tells</b> the parent, and the parent does the deleting. Follow the click:',
      ar: 'ليستة to-do. كل صف فيها component ابن فيه زرار Delete. الصف مايقدرش يمسح نفسه، عشان الليستة عايشة في الأب. فالصف <b>بيبلّغ</b> الأب، والأب هو اللي بيمسح. امشي ورا الكليك:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'todo-item.ts', lang: 'ts', who: { en: 'child · declares', ar: 'الابن · بيعلن' },
          code: ['readonly deleted = output<number>();'],
          say: { en: `The child announces: <i>“I can shout something called ${pub('deleted')}, and what I shout is a number.”</i> ${ng('output')} is Angular’s. ${pub('deleted')} is a name you chose. Nothing happens yet.`,
                 ar: `الابن بيعلن: <i>«أنا ممكن أنادي بحاجة اسمها ${pub('deleted')}، واللي هبعته رقم.»</i> ${ng('output')} بتاعة أنجولار. و${pub('deleted')} اسم انت اللي اخترته. لسه مفيش حاجة حصلت.` } },
        { file: 'todo-item.html', lang: 'html', who: { en: 'child · button', ar: 'الابن · الزرار' },
          code: ['<button (click)="remove()">Delete</button>'],
          say: { en: `The user clicks. ${ng('click')} is the browser’s event, so its name is fixed. ${mine('remove')} is the child’s own method; you picked that name, and only the child uses it.`,
                 ar: `المستخدم بيدوس. ${ng('click')} ده event بتاع المتصفح، فاسمه ثابت. و${mine('remove')} ميثود الابن نفسه؛ انت اللي اخترت الاسم ومحدش بيستخدمه غير الابن.` } },
        { file: 'todo-item.ts', lang: 'ts', who: { en: 'child · shouts', ar: 'الابن · بينادي' },
          code: ['remove() {', '  this.deleted.emit(this.todo().id);', '}'],
          say: { en: `Here is the shout. ${ng('emit')} is Angular’s and it is the <b>only</b> way to fire an output. Whatever you put in the brackets travels to the parent. Only the child ever calls ${ng('emit')}.`,
                 ar: `ودي النداية. ${ng('emit')} بتاعة أنجولار وهي الطريقة <b>الوحيدة</b> إنك تطلّع output. أي حاجة تحطها بين القوسين بتروح للأب. والابن بس هو اللي بينادي ${ng('emit')}.` } },
        { file: 'todo-list.html', lang: 'html', who: { en: 'parent · listens', ar: 'الأب · بيسمع' },
          code: ['<app-todo-item [todo]="t" (deleted)="removeTodo($event)" />'],
          say: { en: `The parent listens on the child’s tag. The name in round brackets must be <b>exactly</b> the child’s ${pub('deleted')}. ${ng('$event')} is Angular’s fixed name for “the thing the child emitted”, here the id. ${mine('removeTodo')} is the parent’s own method.`,
                 ar: `الأب بيسمع على تاج الابن. الاسم اللي بين القوسين لازم يبقى ${pub('deleted')} بتاع الابن <b>بالظبط</b>. و${ng('$event')} اسم ثابت من أنجولار معناه «الحاجة اللي الابن بعتها»، وهنا هي الـ id. و${mine('removeTodo')} ميثود الأب نفسه.` } },
        { file: 'todo-list.ts', lang: 'ts', who: { en: 'parent · acts', ar: 'الأب · بيتصرف' },
          code: ['removeTodo(todoId: number) {', '  this.todos.update(list => list.filter(t => t.id !== todoId));', '}'],
          say: { en: `The parent does the real work. Inside the TypeScript file there is no ${ng('$event')}: the value simply arrives as the parameter, and you can call that parameter anything. Here it is ${mine('todoId')}.`,
                 ar: `الأب بيعمل الشغل الحقيقي. جوه ملف الـ TypeScript مفيش ${ng('$event')}: القيمة بتوصل كـ parameter وخلاص، وتقدر تسمّيه أي اسم. هنا اسمه ${mine('todoId')}.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: `Child: <code>deleted.emit(id)</code>. Parent: <code>(deleted)="removeTodo($event)"</code>. The only name the two components share is <b>deleted</b>. Everything else is either Angular’s or private to one side.`,
        ar: `الابن: <code>deleted.emit(id)</code>. الأب: <code>(deleted)="removeTodo($event)"</code>. الاسم الوحيد اللي الاتنين components متشاركين فيه هو <b>deleted</b>. كل حاجة تانية يا إما بتاعة أنجولار، يا إما خاصة بناحية واحدة.` }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Child or parent?', ar: 'الابن ولا الأب؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'Most of the “which side does this go on?” confusion disappears once you see that every piece has exactly one home.',
      ar: 'أغلب لخبطة «دي تتكتب في أنهي ناحية؟» بتختفي أول ما تشوف إن كل حتة ليها بيت واحد بس.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>readonly deleted = output&lt;number&gt;()</code>', 'child <code>.ts</code>', 'child', `you pick ${pub('deleted')}; ${ng('output')} is Angular’s`],
            ar: ['<code>readonly deleted = output&lt;number&gt;()</code>', '<code>.ts</code> الابن', 'الابن', `انت بتختار ${pub('deleted')}؛ و${ng('output')} بتاعة أنجولار`] },
          { en: ['<code>this.deleted.emit(id)</code>', 'child <code>.ts</code>', 'child, and <b>only</b> the child', `${ng('emit')} is Angular’s`],
            ar: ['<code>this.deleted.emit(id)</code>', '<code>.ts</code> الابن', 'الابن، والابن <b>بس</b>', `${ng('emit')} بتاعة أنجولار`] },
          { en: ['<code>(click)="remove()"</code>', 'child <code>.html</code>', 'child', `${ng('click')} is the browser’s; you pick ${mine('remove')}`],
            ar: ['<code>(click)="remove()"</code>', '<code>.html</code> الابن', 'الابن', `${ng('click')} بتاع المتصفح؛ وانت بتختار ${mine('remove')}`] },
          { en: ['<code>(deleted)="removeTodo($event)"</code>', 'parent <code>.html</code>', 'parent', `${pub('deleted')} must copy the child; ${ng('$event')} is Angular’s; you pick ${mine('removeTodo')}`],
            ar: ['<code>(deleted)="removeTodo($event)"</code>', '<code>.html</code> الأب', 'الأب', `${pub('deleted')} لازم ينسخ الابن؛ و${ng('$event')} بتاعة أنجولار؛ وانت بتختار ${mine('removeTodo')}`] },
          { en: ['<code>removeTodo(todoId: number) { … }</code>', 'parent <code>.ts</code>', 'parent', `you pick both ${mine('removeTodo')} and ${mine('todoId')}`],
            ar: ['<code>removeTodo(todoId: number) { … }</code>', '<code>.ts</code> الأب', 'الأب', `انت بتختار ${mine('removeTodo')} و${mine('todoId')} الاتنين`] },
        ] },
      { t: 'ul',
        en: ['<b>The child never knows the parent’s method name.</b> It only knows its own output. That is why the same row works inside any list.',
             '<b>The parent never calls <code>emit</code>.</b> Emitting is the child’s job. The parent only listens, with round brackets on the child’s tag.',
             '<b>Round brackets <code>( )</code> mean “listen”.</b> On a button they listen to the browser. On your component’s tag they listen to your outputs. Same syntax, same direction: into the component that writes the template.'],
        ar: ['<b>الابن عمره ما بيعرف اسم ميثود الأب.</b> هو يعرف الـ output بتاعه وبس. وعشان كده نفس الصف بيشتغل جوه أي ليستة.',
             '<b>الأب عمره ما بينادي <code>emit</code>.</b> الـ emit شغلانة الابن. الأب بيسمع وبس، بالأقواس المدورة على تاج الابن.',
             '<b>الأقواس المدورة <code>( )</code> معناها «اسمع».</b> على زرار بتسمع المتصفح. على تاج الـ component بتاعك بتسمع الـ outputs بتاعتك. نفس الكتابة، ونفس الاتجاه: لجوه الـ component اللي كاتب التمبلت.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All five files, every name coloured', ar: 'الخمس ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same example, complete. Hover a coloured name to light up everywhere else it appears. Then press <b>Rename test</b>: every name you own turns into a made-up word, Angular’s words stay put, and the code is still correct.',
      ar: 'نفس المثال، كامل. قف بالماوس على أي اسم ملوّن وهتنوّر كل الأماكن التانية اللي هو فيها. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: كل اسم بتاعك هيبقى كلمة عشوائية، وكلمات أنجولار هتفضل مكانها، والكود لسه صح.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'todo.ts', lang: 'ts', tag: { en: 'the data', ar: 'الداتا' }, code: [
        'export interface Todo {',
        '  id: number;',
        '  title: string;',
        '}' ] },
      { t: 'code', name: 'todo-item.ts', lang: 'ts', tag: { en: 'child', ar: 'الابن' }, code: [
        "import { Component, input, output } from '@angular/core';",
        "import { Todo } from './todo';",
        '',
        '@Component({',
        "  selector: 'app-todo-item',",
        "  templateUrl: './todo-item.html',",
        '})',
        'export class TodoItem {',
        '  readonly todo = input.required<Todo>();   // in:  the parent gives me a todo',
        '  readonly deleted = output<number>();      // out: I tell the parent an id',
        '',
        '  remove() {',
        '    this.deleted.emit(this.todo().id);',
        '  }',
        '}' ] },
      { t: 'code', name: 'todo-item.html', lang: 'html', tag: { en: 'child', ar: 'الابن' }, code: [
        '<span>{{ todo().title }}</span>',
        '<button (click)="remove()">Delete</button>' ] },
      { t: 'code', name: 'todo-list.html', lang: 'html', tag: { en: 'parent', ar: 'الأب' }, code: [
        '@for (t of todos(); track t.id) {',
        '  <app-todo-item [todo]="t" (deleted)="removeTodo($event)" />',
        '}' ] },
      { t: 'code', name: 'todo-list.ts', lang: 'ts', tag: { en: 'parent', ar: 'الأب' }, code: [
        "import { Component, signal } from '@angular/core';",
        "import { TodoItem } from './todo-item';",
        "import { Todo } from './todo';",
        '',
        '@Component({',
        "  selector: 'app-todo-list',",
        '  imports: [TodoItem],',
        "  templateUrl: './todo-list.html',",
        '})',
        'export class TodoList {',
        '  readonly todos = signal<Todo[]>([',
        "    { id: 1, title: 'Buy milk' },",
        "    { id: 2, title: 'Learn outputs' },",
        '  ]);',
        '',
        '  removeTodo(todoId: number) {',
        '    this.todos.update(list => list.filter(t => t.id !== todoId));',
        '  }',
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
      en: 'Every name you own can be renamed. The question is only <b>where else</b> you have to follow. Most mistakes give you a compile error, which is good. One does not, and it is the output itself.',
      ar: 'أي اسم بتاعك ينفع يتغير. السؤال بس <b>فين تاني</b> لازم تغيّر وراه. أغلب الغلطات بتديك compile error، وده كويس. غلطة واحدة لأ، وهي الـ output نفسه.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [pub('deleted') + ' (the output)', 'the parent template: <code>(deleted)</code>', '<b>No error at all.</b> The parent’s listener quietly never fires, and Delete does nothing. See the last section.'],
            ar: [pub('deleted') + ' (الـ output)', 'تمبلت الأب: <code>(deleted)</code>', '<b>مفيش أي error.</b> الأب هيفضل مستني ومش هيسمع حاجة، وزرار Delete مش هيعمل حاجة. شوف آخر جزء.'] },
          { en: [pub('todo') + ' (the input)', 'the parent template: <code>[todo]</code>', 'Compile error: the child has no input with the old name.'],
            ar: [pub('todo') + ' (الـ input)', 'تمبلت الأب: <code>[todo]</code>', 'Compile error: الابن معندوش input بالاسم القديم.'] },
          { en: [pub('app-todo-item') + ' (the selector)', 'the tag in the parent template', 'Compile error: “is not a known element”.'],
            ar: [pub('app-todo-item') + ' (الـ selector)', 'التاج في تمبلت الأب', 'Compile error: «is not a known element».'] },
          { en: [pub('TodoItem') + ' (the class)', 'the parent’s <code>import</code> line and <code>imports: [ ]</code>', 'Compile error on the import.'],
            ar: [pub('TodoItem') + ' (الكلاس)', 'سطر الـ <code>import</code> عند الأب و<code>imports: [ ]</code>', 'Compile error في الـ import.'] },
          { en: [mine('remove') + ' (child method)', 'the child template: <code>(click)="remove()"</code>', 'Compile error in the child’s template.'],
            ar: [mine('remove') + ' (ميثود الابن)', 'تمبلت الابن: <code>(click)="remove()"</code>', 'Compile error في تمبلت الابن.'] },
          { en: [mine('removeTodo') + ' (parent method)', 'the parent template: <code>(deleted)="removeTodo($event)"</code>', 'Compile error in the parent’s template.'],
            ar: [mine('removeTodo') + ' (ميثود الأب)', 'تمبلت الأب: <code>(deleted)="removeTodo($event)"</code>', 'Compile error في تمبلت الأب.'] },
          { en: [mine('todoId') + ' (parameter)', 'only the lines inside that one method', 'Compile error inside the method.'],
            ar: [mine('todoId') + ' (parameter)', 'السطور اللي جوه الميثود دي بس', 'Compile error جوه الميثود.'] },
          { en: [`${ng('output')}, ${ng('emit')}, ${ng('$event')}, ${ng('click')}`, 'nothing: you cannot rename these', 'They are Angular’s and the browser’s words.'],
            ar: [`${ng('output')} و${ng('emit')} و${ng('$event')} و${ng('click')}`, 'ولا حاجة: دول مينفعش يتغيروا', 'دي كلمات أنجولار والمتصفح.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b> in the bar above the files. Every green and orange name becomes a random word, consistently, in every file at once. That is exactly what a correct rename looks like.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b> في الشريط اللي فوق الملفات. كل اسم أخضر وبرتقاني هيبقى كلمة عشوائية، بنفس الشكل، في كل الملفات مرة واحدة. وده بالظبط شكل التغيير الصح.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'event',
    kicker: { en: 'The one fixed name', ar: 'الاسم الثابت الوحيد' },
    title: { en: '<code>$event</code> is not a variable you made', ar: '<code>$event</code> مش متغير انت عامله' },
    lead: {
      en: '<code>$event</code> exists in exactly one place: inside the quotes of a <code>( )</code> binding in a template. It holds whatever the child passed to <code>emit()</code>. Its type comes from the angle brackets: <code>output&lt;number&gt;()</code> makes it a number.',
      ar: '<code>$event</code> موجود في مكان واحد بس: جوه علامات التنصيص بتاعة ربط <code>( )</code> في التمبلت. جواه أي حاجة الابن بعتها في <code>emit()</code>. ونوعه جاي من الأقواس المتلّتة: <code>output&lt;number&gt;()</code> بتخليه رقم.'
    },
    blocks: [
      { t: 'code', name: 'todo-list.html', lang: 'html', tag: { en: 'three ways to use it', ar: 'تلات طرق تستخدمه بيها' }, code: [
        '<!-- 1. hand it to a method (most common) -->',
        '<app-todo-item [todo]="t" (deleted)="removeTodo($event)" />',
        '',
        '<!-- 2. a one-line statement, no method needed -->',
        '<app-todo-item [todo]="t" (deleted)="lastDeletedId.set($event)" />',
        '',
        '<!-- 3. ignore it: the parent only cares that it happened -->',
        '<app-todo-item [todo]="t" (deleted)="showUndoBar()" />' ] },
      { t: 'p',
        en: 'Need to send more than one value? Emit <b>one object</b>. <code>emit</code> takes a single argument, so an object is how you carry several things, and <code>$event.id</code> reads them back.',
        ar: 'محتاج تبعت أكتر من قيمة؟ ابعت <b>object واحد</b>. <code>emit</code> بتاخد argument واحد بس، فالـ object هو الطريقة إنك تشيل كذا حاجة، و<code>$event.id</code> بتقراهم تاني.' },
      { t: 'code', name: 'todo-item.ts', lang: 'ts', tag: { en: 'child', ar: 'الابن' }, code: [
        'readonly moved = output<{ id: number; column: string }>();',
        '',
        'moveToDone() {',
        "  this.moved.emit({ id: this.todo().id, column: 'done' });",
        '}' ] },
      { t: 'code', name: 'todo-list.html', lang: 'html', tag: { en: 'parent', ar: 'الأب' }, code: [
        '<app-todo-item [todo]="t" (moved)="moveTodo($event.id, $event.column)" />' ] },
      { t: 'note', label: { en: 'Remember', ar: 'افتكر' },
        en: 'The field names inside the object, <code>id</code> and <code>column</code>, are yours, but the parent types them too. They are shared names, just like the output name.',
        ar: 'أسماء الحقول اللي جوه الـ object، <code>id</code> و<code>column</code>، بتاعتك، بس الأب بيكتبها هو كمان. فهي أسماء متشاركة، زي اسم الـ output بالظبط.' }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'Angular accepts almost any name. These habits just make the parent template read like a sentence, and one of them saves you from a real bug.',
      ar: 'أنجولار بيقبل أي اسم تقريبًا. العادات دي بس بتخلي تمبلت الأب يتقري زي جملة، وواحدة منهم بتنقذك من bug حقيقي.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['the output', '<code>deleted</code>, <code>saved</code>, <code>selected</code>, <code>closed</code>', '<code>onDelete</code>, <code>deleteEvent</code>', 'Name what <b>happened</b>. Angular’s style guide says not to start output names with <code>on</code>.'],
            ar: ['الـ output', '<code>deleted</code>، <code>saved</code>، <code>selected</code>، <code>closed</code>', '<code>onDelete</code>، <code>deleteEvent</code>', 'سمّي اللي <b>حصل</b>. دليل أنجولار بيقول متبدأش اسم الـ output بـ <code>on</code>.'] },
          { en: ['the output', 'anything that is not a browser event', '<code>click</code>, <code>change</code>, <code>submit</code>, <code>input</code>', '<b>A real bug.</b> <code>(click)</code> on your tag also catches the browser’s own clicks, so your handler runs twice and <code>$event</code> is sometimes a MouseEvent.'],
            ar: ['الـ output', 'أي اسم مش event بتاع المتصفح', '<code>click</code>، <code>change</code>، <code>submit</code>، <code>input</code>', '<b>bug حقيقي.</b> <code>(click)</code> على التاج بتاعك بتمسك كمان الكليك العادية بتاعة المتصفح، فالميثود بتاعتك تشتغل مرتين و<code>$event</code> ساعات يبقى MouseEvent.'] },
          { en: ['the parent’s method', '<code>removeTodo</code>, <code>saveOrder</code>', '<code>handle</code>, <code>doIt</code>', 'Name what it <b>does</b>. <code>onDeleted</code> is also common and perfectly fine.'],
            ar: ['ميثود الأب', '<code>removeTodo</code>، <code>saveOrder</code>', '<code>handle</code>، <code>doIt</code>', 'سمّي اللي <b>بتعمله</b>. و<code>onDeleted</code> منتشرة برضه ومفيهاش مشكلة.'] },
          { en: ['the method’s parameter', '<code>todoId</code>, <code>id</code>, anything', '—', 'An ordinary function parameter. <code>$event</code> is fixed; the parameter that receives it is not.'],
            ar: ['الـ parameter بتاع الميثود', '<code>todoId</code>، <code>id</code>، أي حاجة', '—', 'parameter عادي. <code>$event</code> ثابت؛ لكن الـ parameter اللي بيستقبله لأ.'] },
          { en: ['what you emit', 'the smallest thing the parent needs: an id, or a small object', 'the whole component, or nothing when the parent needs data', 'The parent should not have to reach back into the child.'],
            ar: ['اللي بتبعته', 'أصغر حاجة الأب محتاجها: id، أو object صغير', 'الـ component كله، أو ولا حاجة لما الأب محتاج داتا', 'الأب مش المفروض يرجع يدوّر جوه الابن.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Two places where the name is not free', ar: 'مكانين الاسم فيهم مش براحتك' },
    lead: {
      en: 'Almost always, the output name is whatever you typed on the left of <code>= output()</code>. Two features change that.',
      ar: 'تقريبًا دايمًا، اسم الـ output هو اللي انت كاتبه على شمال <code>= output()</code>. فيه ميزتين بيغيّروا ده.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'An alias: the parent uses a different name', ar: 'الـ alias: الأب بيستخدم اسم تاني' }, blocks: [
        { t: 'code', name: 'todo-item.ts · with alias', lang: 'ts', tag: { en: 'child', ar: 'الابن' }, code: [
          "readonly deleted = output<number>({ alias: 'removed' });",
          '',
          'remove() {',
          '  this.deleted.emit(this.todo().id);   // inside the class: still deleted',
          '}' ] },
        { t: 'code', name: 'todo-list.html', lang: 'html', tag: { en: 'parent', ar: 'الأب' }, code: [
          '<app-todo-item [todo]="t" (removed)="removeTodo($event)" />' ] },
        { t: 'p',
          en: `With an alias, the class property ${mine('deleted')} becomes private to the child, and the <b>alias</b> is the shared name. The parent must type ${pub('removed')}. Use this rarely, for example to keep an old public name while renaming the inside.`,
          ar: `مع الـ alias، الـ property ${mine('deleted')} بتبقى خاصة بالابن، والـ <b>alias</b> هو الاسم المتشارك. الأب لازم يكتب ${pub('removed')}. استخدمه نادر، مثلًا لو عايز تحافظ على اسم قديم برّه وانت بتغيّر اللي جوه.` }
      ]},
      { t: 'step', n: 'B', title: { en: 'Two-way binding: the name must end in Change', ar: 'الربط في الاتجاهين: الاسم لازم يخلص بـ Change' }, blocks: [
        { t: 'p',
          en: 'The banana-in-a-box syntax <code>[(checked)]</code> only works if the child has an input <code>checked</code> <b>and</b> an output named exactly <code>checkedChange</code>. Here the suffix is a rule, not a habit. Rename one without the other and <code>[(checked)]</code> silently stops updating the parent.',
          ar: 'الكتابة اللي شبه موزة في علبة <code>[(checked)]</code> بتشتغل بس لو الابن عنده input اسمه <code>checked</code> <b>و</b>output اسمه <code>checkedChange</code> بالظبط. هنا اللاحقة Change قاعدة، مش عادة. لو غيّرت واحد من غير التاني، <code>[(checked)]</code> هتبطل تحدّث الأب من غير ما تقولك.' },
        { t: 'pair',
          bad:  { name: 'switch.ts — by hand', lang: 'ts', code: [
            'readonly checked = input(false);',
            'readonly checkedChange = output<boolean>();',
            '',
            'flip() {',
            '  this.checkedChange.emit(!this.checked());',
            '}' ] },
          good: { name: 'switch.ts — with model()', lang: 'ts', code: [
            'readonly checked = model(false);',
            '',
            '',
            'flip() {',
            '  this.checked.set(!this.checked());',
            '}' ] } },
        { t: 'code', name: 'settings.html', lang: 'html', tag: { en: 'parent, same for both', ar: 'الأب، نفسه للاتنين' }, code: [
          '<app-switch [(checked)]="darkMode" />' ] },
        { t: 'p',
          en: '<code>model()</code> creates the input and the matching <code>checkedChange</code> output for you, so the rule cannot be broken. Prefer it.',
          ar: '<code>model()</code> بيعملك الـ input والـ output <code>checkedChange</code> اللي معاه، فمستحيل تكسر القاعدة. استخدمه هو.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: 'The old <code>@Output()</code> uses the same names', ar: '<code>@Output()</code> القديم بيستخدم نفس الأسماء' },
    lead: {
      en: 'You will meet the decorator version in tutorials and older projects. Only the declaration line changes. <code>emit</code>, the parent template and <code>$event</code> are identical.',
      ar: 'هتقابل نسخة الـ decorator في شروحات ومشاريع أقدم. سطر الإعلان بس هو اللي بيتغير. <code>emit</code> وتمبلت الأب و<code>$event</code> زي ما هما بالظبط.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'todo-item.ts — older style', lang: 'ts', code: [
          "import { Component, Output, EventEmitter } from '@angular/core';",
          '',
          '@Output() deleted = new EventEmitter<number>();',
          '',
          'remove() {',
          '  this.deleted.emit(this.todo().id);',
          '}' ] },
        good: { name: 'todo-item.ts — today', lang: 'ts', code: [
          "import { Component, output } from '@angular/core';",
          '',
          'readonly deleted = output<number>();',
          '',
          'remove() {',
          '  this.deleted.emit(this.todo().id);',
          '}' ] } },
      { t: 'p',
        en: 'In the old style the alias goes in the decorator: <code>@Output(\'removed\') deleted = …</code>. Same rule as before: the parent types the alias.',
        ar: 'في الأسلوب القديم الـ alias بيتكتب في الـ decorator: <code>@Output(\'removed\') deleted = …</code>. نفس القاعدة: الأب بيكتب الـ alias.' }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, and says nothing', ar: 'مش بيعمل حاجة، ومش بيقول حاجة' },
    title: { en: 'Mistakes that fail silently', ar: 'غلطات بتفشل في صمت' },
    lead: {
      en: 'Angular lets you listen to <b>any</b> event name on any tag, because browsers allow custom events. So a wrong name in <code>( )</code> is not an error. It is just a listener waiting for an event that never comes.',
      ar: 'أنجولار بيسيبك تسمع <b>أي</b> اسم event على أي تاج، عشان المتصفحات بتسمح بـ events متألفة. فاسم غلط جوه <code>( )</code> مش error. ده مجرد listener مستني event عمره ما هييجي.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'A typo in the output name', ar: 'غلطة إملائية في اسم الـ output' }, blocks: [
        { t: 'pair',
          bad:  { name: 'todo-list.html', lang: 'html', code: ['<app-todo-item [todo]="t" (delete)="removeTodo($event)" />'] },
          good: { name: 'todo-list.html', lang: 'html', code: ['<app-todo-item [todo]="t" (deleted)="removeTodo($event)" />'] } },
        { t: 'p', en: 'The child emits <code>deleted</code>; the parent listens for <code>delete</code>. No error, no click. Copy the name from the child’s <code>.ts</code> file instead of typing it from memory.',
                  ar: 'الابن بيبعت <code>deleted</code>؛ والأب بيسمع <code>delete</code>. لا error ولا حاجة بتحصل. انسخ الاسم من ملف الـ <code>.ts</code> بتاع الابن بدل ما تكتبه من دماغك.' }
      ]},
      { t: 'step', n: '2', title: { en: 'Forgetting the brackets after the method', ar: 'نسيان القوسين بعد الميثود' }, blocks: [
        { t: 'pair',
          bad:  { name: 'todo-list.html', lang: 'html', code: ['<app-todo-item [todo]="t" (deleted)="removeTodo" />'] },
          good: { name: 'todo-list.html', lang: 'html', code: ['<app-todo-item [todo]="t" (deleted)="removeTodo($event)" />'] } },
        { t: 'p', en: 'The text inside the quotes is a statement that Angular <b>runs</b>. <code>removeTodo</code> alone just mentions the method; it never calls it.',
                  ar: 'الكلام اللي جوه علامات التنصيص ده أمر أنجولار <b>بينفّذه</b>. <code>removeTodo</code> لوحدها بتذكر اسم الميثود بس؛ عمرها ما بتناديها.' }
      ]},
      { t: 'step', n: '3', title: { en: 'Listening on the wrong tag', ar: 'السمع على التاج الغلط' }, blocks: [
        { t: 'pair',
          bad:  { name: 'todo-list.html', lang: 'html', code: [
            '<div (deleted)="removeTodo($event)">',
            '  <app-todo-item [todo]="t" />',
            '</div>'] },
          good: { name: 'todo-list.html', lang: 'html', code: [
            '<div>',
            '  <app-todo-item [todo]="t" (deleted)="removeTodo($event)" />',
            '</div>'] } },
        { t: 'p', en: 'Outputs do <b>not</b> bubble up like browser clicks. You must listen on the exact tag of the component that declares the output.',
                  ar: 'الـ outputs <b>مش</b> بتطلع لفوق زي كليكات المتصفح. لازم تسمع على التاج بالظبط بتاع الـ component اللي معلن الـ output.' }
      ]},
      { t: 'step', n: '4', title: { en: 'Expecting the grandparent to hear it', ar: 'إنك تستنى الجد يسمعه' }, blocks: [
        { t: 'p', en: 'For the same reason, a component two levels up cannot listen to the row directly. Either the list declares its own output and passes the value on, or both sides share a service.',
                  ar: 'لنفس السبب، component فوق بمستويين مايقدرش يسمع الصف على طول. يا إما الليستة تعلن output بتاعها وتعدّي القيمة لفوق، يا إما الاتنين يتشاركوا service.' },
        { t: 'code', name: 'todo-list.ts', lang: 'ts', tag: { en: 'pass it on', ar: 'عدّيها لفوق' }, code: [
          'readonly todoRemoved = output<number>();',
          '',
          'removeTodo(todoId: number) {',
          '  this.todos.update(list => list.filter(t => t.id !== todoId));',
          '  this.todoRemoved.emit(todoId);   // now my parent can listen too',
          '}' ] }
      ]},
      { t: 'step', n: '5', title: { en: 'Calling the output like a signal', ar: 'إنك تنادي الـ output كأنه signal' }, blocks: [
        { t: 'pair',
          bad:  { name: 'todo-item.ts', lang: 'ts', code: ['this.deleted(this.todo().id);'] },
          good: { name: 'todo-item.ts', lang: 'ts', code: ['this.deleted.emit(this.todo().id);'] } },
        { t: 'p', en: 'This one does give an error, but a confusing one: “This expression is not callable”. <code>input()</code> and <code>signal()</code> are read by calling them. <code>output()</code> is not a signal. You only ever call <code>.emit()</code> on it.',
                  ar: 'دي بتدي error، بس error ملخبط: «This expression is not callable». الـ <code>input()</code> والـ <code>signal()</code> بتقراهم بإنك تناديهم. لكن <code>output()</code> مش signal. الحاجة الوحيدة اللي بتناديها عليه هي <code>.emit()</code>.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it does nothing', ar: 'لما مايعملش حاجة' },
    title: { en: 'Five questions, in this order', ar: 'خمس أسئلة، بالترتيب ده' },
    lead: {
      en: 'Your output “does not work”. Ask these before anything else. One of them is almost always the answer.',
      ar: 'الـ output بتاعك «مش شغال». اسأل الأسئلة دي قبل أي حاجة. واحد منهم تقريبًا دايمًا هو الإجابة.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Is the name in the parent’s <code>( )</code> spelled exactly like the child’s property, or its alias?',
                  ar: '<b>1.</b> الاسم اللي في <code>( )</code> عند الأب مكتوب بالظبط زي الـ property بتاعة الابن، أو الـ alias بتاعها؟' },
      { t: 'chk', en: '<b>2.</b> Is the <code>( )</code> on the child component’s own tag, not on a wrapper around it?',
                  ar: '<b>2.</b> الـ <code>( )</code> موجودة على تاج الـ component الابن نفسه، مش على حاجة ملفوفة حواليه؟' },
      { t: 'chk', en: '<b>3.</b> Does the child actually reach <code>.emit()</code>? Put a <code>console.log</code> right before it.',
                  ar: '<b>3.</b> الابن فعلًا بيوصل لـ <code>.emit()</code>؟ حط <code>console.log</code> قبلها على طول.' },
      { t: 'chk', en: '<b>4.</b> Does the parent’s statement <b>call</b> the method: <code>removeTodo($event)</code>, with brackets?',
                  ar: '<b>4.</b> الأمر اللي عند الأب <b>بينادي</b> الميثود فعلًا: <code>removeTodo($event)</code>، بالقوسين؟' },
      { t: 'chk', en: '<b>5.</b> Is the listener one level up, on the direct parent? Outputs do not skip levels.',
                  ar: '<b>5.</b> الـ listener فوق بمستوى واحد، عند الأب المباشر؟ الـ outputs مش بتنط مستويات.' }
    ]
  }
  ]
};
