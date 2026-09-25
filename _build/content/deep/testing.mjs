/* ==================================================================
   Testing, name by name — the deep dive after the unit-testing topic.
   One running example (a cart component, its store, and its spec with
   a fake store) followed through every file.
   Model: content/deep/inputs-outputs.mjs.
   ================================================================== */

const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

export default {
  topic: 'testing',
  tab: 'Testing, name by name — The Angular Signal',
  title: { en: 'Component tests, name by name', ar: 'تستات الـ components، اسم اسم' },
  say: {
    en: 'The page for when a spec file feels like a wall of strange words. One cart and its test, every name coloured: the <b>test runner’s</b> and <b>Angular’s</b>, the ones <b>you</b> made up, and the ones the test <b>copies from the app</b>. Then what breaks when the app renames something and the test does not.',
    ar: 'الصفحة دي للي ملف الـ spec بيبانله حيطة كلمات غريبة. كارت واحد والتست بتاعه، وكل اسم ملوّن: بتاع <b>الـ test runner</b> و<b>أنجولار</b>، واللي <b>انت</b> ألفته، واللي التست <b>بينسخه من التطبيق</b>. وبعدين إيه اللي بيبوظ لما التطبيق يغيّر اسم والتست لأ.'
  },
  lead: {
    en: 'The idea of a component test is simple: <b>build the real component, give it fake neighbours, poke it like a user, and check what it did.</b> The confusing part is the names. A spec mixes the test runner’s words, Angular’s testing words, names you invent on the spot, and names copied from the app, sometimes inside strings where nothing checks them. This page tells you which is which.',
    ar: 'فكرة تست الـ component بسيطة: <b>ابني الـ component الحقيقي، ادّيله جيران مزيفين، اتعامل معاه زي اليوزر، وشوف عمل إيه.</b> اللي بيلخبط هو الأسماء. الـ spec بيخلط كلمات الـ test runner، وكلمات التستات بتاعة أنجولار، وأسماء بتألفها ساعتها، وأسماء منسوخة من التطبيق، وساعات جوه strings محدش بيشيّك عليها. الصفحة دي بتقولك مين مين.'
  },

  names: {
    note: {
      en: 'Read the orange rows first. They are the names a test <b>copies from the app</b>: the classes it imports, the members the component uses on the fake store, the input and output names, and the CSS classes it searches for. When the app renames one, the test must follow. Two of them sit inside strings, where TypeScript cannot help.',
      ar: 'اقرا الصفوف البرتقاني الأول. دي الأسماء اللي التست <b>بينسخها من التطبيق</b>: الكلاسات اللي بيعملها import، والحاجات اللي الـ component بيستخدمها من الـ store المزيف، وأسماء الـ input والـ output، والـ CSS classes اللي بيدوّر عليها. لما التطبيق يغيّر واحد منهم، التست لازم يمشي وراه. واتنين منهم جوه strings، وTypeScript مايقدرش يساعد هناك.'
    },
    names: [
      /* --- shared: the app and the test both type them --- */
      { n:'Cart', k:'pub', re:'(?<![\\w$\'-])Cart(?![\\w$\'-])(?! \\()',
        w:{ en:'The component class. The spec imports it and builds it. (<code>\'Cart\'</code> in <code>describe</code> and <code>Cart (</code> in the text are not this name.)',
            ar:'كلاس الـ component. الـ spec بيعمله import وبيبنيه. (<code>\'Cart\'</code> اللي في <code>describe</code> و<code>Cart (</code> اللي في النص مش الاسم ده.)' } },
      { n:'CartStore', k:'pub', re:'(?<![\\w$\'-])CartStore(?![\\w$\'-])',
        w:{ en:'The real store’s class. The component injects it; the test uses it as the token to replace.',
            ar:'كلاس الـ store الحقيقي. الـ component بيعمله inject؛ والتست بيستخدمه كـ token عشان يستبدله.' } },
      { n:'Item', k:'pub', w:{ en:'Your data type.', ar:'نوع الداتا بتاعك.' } },
      { n:'items', k:'pub',
        w:{ en:'The store’s signal. The component reads <code>store.items()</code>, so the fake must have a member with exactly this name.',
            ar:'الـ signal بتاعة الـ store. الـ component بيقرا <code>store.items()</code>، فالـ fake لازم يكون فيه member بالاسم ده بالظبط.' } },
      { n:'add', k:'pub', re:'(?<![\\w$\'.-])add(?![\\w$\'-])|(?<=(?:store|fakeStore)\\.)add(?![\\w$\'-])',
        w:{ en:'The store’s method. The component calls <code>store.add()</code>, so the fake needs the same name. <code>\'add\'</code> in <code>createSpy</code> is only a label.',
            ar:'ميثود الـ store. الـ component بينادي <code>store.add()</code>، فالـ fake محتاج نفس الاسم. و<code>\'add\'</code> اللي في <code>createSpy</code> مجرد اسم للعرض.' } },
      { n:'id', k:'pub', w:{ en:'A field on your data.', ar:'field في الداتا بتاعتك.' } },
      { n:'title', k:'pub', w:{ en:'A field on your data.', ar:'field في الداتا بتاعتك.' } },
      { n:'price', k:'pub', w:{ en:'A field on your data. The component adds them up.', ar:'field في الداتا بتاعتك. الـ component بيجمعهم.' } },
      { n:'currency', k:'pub',
        w:{ en:'An input. The test sets it as the <b>string</b> <code>\'currency\'</code>, so a rename in the component is not caught by TypeScript.',
            ar:'input. التست بيحطه كـ <b>string</b> <code>\'currency\'</code>، فلو اتغير في الـ component، TypeScript مش هيمسكها.' } },
      { n:'checkedOut', k:'pub',
        w:{ en:'An output. The test subscribes to it through <code>componentInstance</code>.', ar:'output. التست بيعمل subscribe عليه من خلال <code>componentInstance</code>.' } },
      { n:'cart-total', k:'pub',
        w:{ en:'A CSS class in the template. The test finds the element by it.', ar:'CSS class في التمبلت. التست بيلاقي الـ element بيه.' } },
      { n:'add-btn', k:'pub',
        w:{ en:'A CSS class on a button, typed again in the test’s <code>querySelector</code>.', ar:'CSS class على زرار، والتست بيكتبه تاني في <code>querySelector</code>.' } },
      { n:'pay-btn', k:'pub',
        w:{ en:'Same: a class in the template, searched for by the test.', ar:'نفس الكلام: class في التمبلت، والتست بيدوّر عليه.' } },
      { n:'app-cart', k:'pub', w:{ en:'The selector. Parents type it as a tag.', ar:'الـ selector. الأب بيكتبه كتاج.' } },

      /* --- yours, private to one file or component --- */
      { n:'store', k:'mine',
        w:{ en:'The component’s own name for the injected store. The test never types it: it connects by the class <code>CartStore</code>, not by this name.',
            ar:'الاسم اللي الـ component اختاره للـ store اللي عمله inject. التست عمره ما بيكتبه: بيتوصل بالكلاس <code>CartStore</code>، مش بالاسم ده.' } },
      { n:'total', k:'mine', re:'(?<![\\w$.-])total(?=\\()|(?<=\\.)total(?=\\()|(?<=readonly )total',
        w:{ en:'The component’s computed signal.', ar:'الـ computed signal بتاعة الـ component.' } },
      { n:'addMouse', k:'mine', w:{ en:'The component’s method, called by its own button.', ar:'ميثود الـ component، والزرار بتاعه هو اللي بيناديها.' } },
      { n:'checkout', k:'mine', w:{ en:'The component’s method.', ar:'ميثود الـ component.' } },
      { n:'sum', k:'mine', w:{ en:'A parameter of <code>reduce</code>.', ar:'parameter في <code>reduce</code>.' } },
      { n:'i', k:'mine', re:'(?<![\\w$.-])i(?=\\)|\\.)', w:{ en:'A parameter of <code>reduce</code>.', ar:'parameter في <code>reduce</code>.' } },
      { n:'list', k:'mine', w:{ en:'A parameter of <code>update</code>.', ar:'parameter في <code>update</code>.' } },
      { n:'item', k:'mine', re:'(?<![\\w$\\/.-])item(?![\\w$-])', w:{ en:'The store method’s parameter.', ar:'الـ parameter بتاع ميثود الـ store.' } },
      { n:'fakeStore', k:'mine',
        w:{ en:'The test’s own name for the fake. <code>useValue: fakeStore</code> is what connects it, so any name works.',
            ar:'الاسم اللي التست اختاره للـ fake. <code>useValue: fakeStore</code> هو اللي بيربطه، فأي اسم ينفع.' } },
      { n:'fixture', k:'mine', w:{ en:'Your name for what <code>createComponent</code> returns. <code>fixture</code> is the usual habit.', ar:'اسمك للي <code>createComponent</code> بترجّعه. <code>fixture</code> هي العادة المعروفة.' } },
      { n:'host', k:'mine', only:['cart.spec.ts'], w:{ en:'A local name for the component’s element.', ar:'اسم محلي للـ element بتاع الـ component.' } },
      { n:'paid', k:'mine', w:{ en:'A local variable.', ar:'متغير محلي.' } },
      { n:'amount', k:'mine', w:{ en:'The subscribe callback’s parameter.', ar:'الـ parameter بتاع الـ callback في الـ subscribe.' } },
      { n:'cartItems', k:'mine', w:{ en:'A “nicer” name in the mistake below. It no longer matches the store.', ar:'اسم «أشيك» في الغلطة اللي تحت. مبقاش مطابق للـ store.' } },

      /* --- the test runner's, Angular's, the browser's --- */
      { n:'describe', k:'ng', re:'(?<![\\w$.-])describe(?=\\()', w:{ en:'The test runner’s function that groups tests. The string is a free label.', ar:'function الـ test runner اللي بتجمّع التستات. والنص عنوان براحتك.' } },
      { n:'it', k:'ng', re:'(?<![\\w$.-])it(?=\\()', w:{ en:'The test runner’s function for one test. The sentence is yours; <code>it</code> is not.', ar:'function الـ test runner لتست واحد. الجملة بتاعتك؛ لكن <code>it</code> لأ.' } },
      { n:'beforeEach', k:'ng', w:{ en:'Runs before every test.', ar:'بيشتغل قبل كل تست.' } },
      { n:'expect', k:'ng', w:{ en:'The runner’s assertion.', ar:'الـ assertion بتاعة الـ runner.' } },
      { n:'toBe', k:'ng', w:{ en:'A matcher.', ar:'matcher.' } },
      { n:'toContain', k:'ng', w:{ en:'A matcher.', ar:'matcher.' } },
      { n:'toHaveBeenCalled', k:'ng', w:{ en:'A spy matcher.', ar:'matcher للـ spy.' } },
      { n:'jasmine.createSpy', k:'ng', w:{ en:'Jasmine’s fake function (Vitest: <code>vi.fn()</code>). The string is a label for messages.', ar:'function مزيفة من Jasmine (في Vitest: <code>vi.fn()</code>). والنص اسم بيظهر في الرسايل.' } },
      { n:'jasmine.Spy', k:'ng', w:{ en:'Jasmine’s type for a spy.', ar:'الـ type بتاع Jasmine للـ spy.' } },
      { n:'TestBed', k:'ng', w:{ en:'Angular’s testing environment.', ar:'بيئة التستات بتاعة أنجولار.' } },
      { n:'configureTestingModule', k:'ng', w:{ en:'Sets up <code>imports</code> and <code>providers</code> for the test.', ar:'بتجهّز الـ <code>imports</code> والـ <code>providers</code> للتست.' } },
      { n:'imports', k:'ng', re:'(?<![\\w$-])imports(?=:)', w:{ en:'An option key.', ar:'مفتاح إعداد.' } },
      { n:'providers', k:'ng', re:'(?<![\\w$-])providers(?=:)', w:{ en:'An option key.', ar:'مفتاح إعداد.' } },
      { n:'provide', k:'ng', re:'(?<![\\w$-])provide(?=:)', w:{ en:'A provider key: the token to replace.', ar:'مفتاح في الـ provider: الـ token اللي هيتبدّل.' } },
      { n:'useValue', k:'ng', w:{ en:'A provider key: “use this object instead”.', ar:'مفتاح في الـ provider: «استخدم الأوبجكت ده بداله».' } },
      { n:'provideZonelessChangeDetection', k:'ng', w:{ en:'Runs the test without zone.js, like modern apps.', ar:'بيشغّل التست من غير zone.js، زي التطبيقات الحديثة.' } },
      { n:'createComponent', k:'ng', w:{ en:'Builds the real component.', ar:'بتبني الـ component الحقيقي.' } },
      { n:'componentRef', k:'ng', w:{ en:'Angular’s handle on the created component.', ar:'المسكة اللي أنجولار بيديهالك على الـ component.' } },
      { n:'setInput', k:'ng', w:{ en:'Sets an input by its <b>name as a string</b>.', ar:'بتحط قيمة input بـ <b>اسمه كـ string</b>.' } },
      { n:'whenStable', k:'ng', w:{ en:'Waits until the screen is up to date.', ar:'بتستنى لحد ما الشاشة تتحدّث.' } },
      { n:'detectChanges', k:'ng', w:{ en:'The older, manual “render now”.', ar:'الطريقة القديمة اليدوية «ارسم دلوقتي».' } },
      { n:'declarations', k:'ng', w:{ en:'The older NgModule key for non-standalone components.', ar:'مفتاح الـ NgModule القديم للـ components اللي مش standalone.' } },
      { n:'nativeElement', k:'ng', w:{ en:'The component’s real DOM element.', ar:'الـ element الحقيقي بتاع الـ component في الـ DOM.' } },
      { n:'componentInstance', k:'ng', w:{ en:'The component’s class instance.', ar:'الـ instance بتاع كلاس الـ component.' } },
      { n:'subscribe', k:'ng', w:{ en:'Listens to an output from TypeScript.', ar:'بتسمع لـ output من الـ TypeScript.' } },
      { n:'querySelector', k:'ng', w:{ en:'The browser’s DOM search.', ar:'البحث في الـ DOM بتاع المتصفح.' } },
      { n:'textContent', k:'ng', w:{ en:'The browser’s DOM property: all the text inside.', ar:'property في الـ DOM: كل النص اللي جوه.' } },
      { n:'click', k:'ng', re:'(?<=\\.)click(?=\\()|(?<=\\()click(?=\\))', w:{ en:'The browser’s event, and the DOM method that fires it.', ar:'الـ event بتاع المتصفح، والميثود اللي بتطلقه.' } },
      { n:'HTMLElement', k:'ng', w:{ en:'The browser’s element type.', ar:'الـ type بتاع المتصفح للـ element.' } },
      { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
      { n:'WritableSignal', k:'ng', w:{ en:'Its type.', ar:'الـ type بتاعها.' } },
      { n:'set', k:'ng', re:'(?<=\\.)set(?=\\()', w:{ en:'A signal method.', ar:'ميثود في الـ signal.' } },
      { n:'update', k:'ng', w:{ en:'A signal method.', ar:'ميثود في الـ signal.' } },
      { n:'computed', k:'ng', w:{ en:'Angular’s derived signal.', ar:'الـ signal المشتقة بتاعة أنجولار.' } },
      { n:'input', k:'ng', re:'(?<![\\w$<(-])input(?=[.(<,])', w:{ en:'Angular’s function that creates an input.', ar:'الـ function بتاعة أنجولار اللي بتعمل input.' } },
      { n:'output', k:'ng', re:'(?<![\\w$<\\/-])output(?=[<(])', w:{ en:'Angular’s function that creates an output.', ar:'الـ function بتاعة أنجولار اللي بتعمل output.' } },
      { n:'emit', k:'ng', w:{ en:'Fires an output.', ar:'بتطلق الـ output.' } },
      { n:'inject', k:'ng', w:{ en:'Angular’s function that hands you a service.', ar:'الـ function بتاعة أنجولار اللي بتديك service.' } },
      { n:'@Injectable', k:'ng', w:{ en:'Angular’s decorator for services.', ar:'الـ decorator بتاع أنجولار للـ services.' } },
      { n:'providedIn', k:'ng', w:{ en:'An option key.', ar:'مفتاح إعداد.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator.', ar:'الـ decorator بتاع أنجولار.' } },
      { n:'selector', k:'ng', w:{ en:'An option key.', ar:'مفتاح إعداد.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key.', ar:'مفتاح إعداد.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One test, six stops', ar: 'تست واحد، ست محطات' },
    lead: {
      en: 'A cart component. It reads items from a store and has an “Add a mouse” button. The test wants to know: when the button is clicked, does the cart ask the store to add something? Follow the test through the files:',
      ar: 'component كارت. بيقرا الحاجات من store وفيه زرار «Add a mouse». التست عايز يعرف: لما الزرار يتداس، الكارت بيطلب من الـ store يضيف حاجة؟ امشي ورا التست في الملفات:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'cart.spec.ts', lang: 'ts', who: { en: 'test · makes a fake', ar: 'التست · بيعمل fake' },
          code: ["fakeStore = { items: signal<Item[]>([]), add: jasmine.createSpy('add') };"],
          say: { en: `${mine('fakeStore')} is a name you made up. Its members are not: the component uses ${pub('items')} and ${pub('add')} on the real store, so the fake needs exactly those names. The <code>'add'</code> string is just a label for error messages.`,
                 ar: `${mine('fakeStore')} اسم انت ألفته. بس الحاجات اللي جواه لأ: الـ component بيستخدم ${pub('items')} و${pub('add')} من الـ store الحقيقي، فالـ fake محتاج الأسماء دي بالظبط. والنص <code>'add'</code> مجرد اسم بيظهر في رسايل الإيرور.` } },
        { file: 'cart.spec.ts', lang: 'ts', who: { en: 'test · swaps it in', ar: 'التست · بيبدّله' },
          code: ['{ provide: CartStore, useValue: fakeStore },'],
          say: { en: `“Whoever asks for ${pub('CartStore')}, give them ${mine('fakeStore')} instead.” ${ng('provide')} and ${ng('useValue')} are Angular’s keys. The <b>class</b> is what connects the two sides, not any variable name.`,
                 ar: `«أي حد يطلب ${pub('CartStore')}، ادّيله ${mine('fakeStore')} بداله.» ${ng('provide')} و${ng('useValue')} مفاتيح أنجولار. و<b>الكلاس</b> هو اللي بيربط الناحيتين، مش أي اسم متغير.` } },
        { file: 'cart.ts', lang: 'ts', who: { en: 'app · asks for it', ar: 'التطبيق · بيطلبه' },
          code: ['protected readonly store = inject(CartStore);'],
          say: { en: `The component asks for ${pub('CartStore')} and, inside the test, receives the fake. It calls its field ${mine('store')}; the test calls the same object ${mine('fakeStore')}. Two names for one object, and neither side knows the other’s.`,
                 ar: `الـ component بيطلب ${pub('CartStore')} وجوه التست بياخد الـ fake. هو بيسمّي الـ field بتاعه ${mine('store')}؛ والتست بيسمّي نفس الأوبجكت ${mine('fakeStore')}. اسمين لأوبجكت واحد، ومحدش فيهم يعرف اسم التاني.` } },
        { file: 'cart.spec.ts', lang: 'ts', who: { en: 'test · builds it', ar: 'التست · بيبنيه' },
          code: ['const fixture = TestBed.createComponent(Cart);', 'await fixture.whenStable();'],
          say: { en: `${ng('TestBed')}, ${ng('createComponent')} and ${ng('whenStable')} are Angular’s. ${mine('fixture')} is your name, a habit everyone shares. ${pub('Cart')} is the app’s class.`,
                 ar: `${ng('TestBed')} و${ng('createComponent')} و${ng('whenStable')} بتوع أنجولار. و${mine('fixture')} اسمك، عادة الكل ماشي عليها. و${pub('Cart')} كلاس التطبيق.` } },
        { file: 'cart.spec.ts', lang: 'ts', who: { en: 'test · clicks', ar: 'التست · بيدوس' },
          code: ["fixture.nativeElement.querySelector('button.add-btn').click();"],
          say: { en: `The test finds the button by the class ${pub('add-btn')}, which lives in the component’s template. It is a string, so if the template renames the class, TypeScript says nothing.`,
                 ar: `التست بيلاقي الزرار بالـ class ${pub('add-btn')}، واللي عايش في تمبلت الـ component. ده string، فلو التمبلت غيّر الـ class، TypeScript مش هيقول حاجة.` } },
        { file: 'cart.spec.ts', lang: 'ts', who: { en: 'test · checks', ar: 'التست · بيتأكد' },
          code: ['expect(fakeStore.add).toHaveBeenCalled();'],
          say: { en: `The spy remembers it was called. ${ng('expect')} and ${ng('toHaveBeenCalled')} belong to the test runner, not to Angular.`,
                 ar: `الـ spy فاكر إنه اتنادى. و${ng('expect')} و${ng('toHaveBeenCalled')} بتوع الـ test runner، مش بتوع أنجولار.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'A test is joined to the app by <b>copied names</b>: the classes (<code>Cart</code>, <code>CartStore</code>), the members the component uses (<code>items</code>, <code>add</code>), the input and output names, and the CSS classes it searches for. Everything else in the spec is either the runner’s, Angular’s, or yours alone.',
        ar: 'التست متربط بالتطبيق بـ <b>أسماء منسوخة</b>: الكلاسات (<code>Cart</code> و<code>CartStore</code>)، والحاجات اللي الـ component بيستخدمها (<code>items</code> و<code>add</code>)، وأسماء الـ input والـ output، والـ CSS classes اللي بيدوّر عليها. أي حاجة تانية في الـ spec يا بتاعة الـ runner، يا بتاعة أنجولار، يا بتاعتك انت لوحدك.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'App or test?', ar: 'التطبيق ولا التست؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'The test is a second file that talks about the first. It chooses almost none of the important names; it copies them.',
      ar: 'التست ملف تاني بيتكلم عن الأولاني. هو تقريبًا مابيختارش ولا اسم من الأسماء المهمة؛ هو بينسخها.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>describe(\'Cart\', …)</code>, <code>it(\'…\', …)</code>', 'spec', 'you', `the runner picks ${ng('describe')} and ${ng('it')}; the strings are free labels`],
            ar: ['<code>describe(\'Cart\', …)</code> و<code>it(\'…\', …)</code>', 'الـ spec', 'انت', `الـ runner بيختار ${ng('describe')} و${ng('it')}؛ والنصوص عناوين براحتك`] },
          { en: ['<code>const fakeStore = { items, add }</code>', 'spec', 'you', `you pick ${mine('fakeStore')}; the <b>members</b> copy the real ${pub('CartStore')}`],
            ar: ['<code>const fakeStore = { items, add }</code>', 'الـ spec', 'انت', `انت بتختار ${mine('fakeStore')}؛ و<b>الحاجات اللي جواه</b> بتنسخ ${pub('CartStore')} الحقيقي`] },
          { en: ['<code>{ provide: CartStore, useValue: fakeStore }</code>', 'spec', 'you', `Angular’s keys; the token is the app’s class`],
            ar: ['<code>{ provide: CartStore, useValue: fakeStore }</code>', 'الـ spec', 'انت', `مفاتيح أنجولار؛ والـ token كلاس التطبيق`] },
          { en: ['<code>store = inject(CartStore)</code>', 'component', 'you', `you pick ${mine('store')}; the test never sees it`],
            ar: ['<code>store = inject(CartStore)</code>', 'الـ component', 'انت', `انت بتختار ${mine('store')}؛ والتست عمره ما بيشوفه`] },
          { en: ["<code>setInput('currency', …)</code>", 'spec', 'you', `the string copies the component’s input ${pub('currency')}`],
            ar: ["<code>setInput('currency', …)</code>", 'الـ spec', 'انت', `النص بينسخ الـ input ${pub('currency')} بتاع الـ component`] },
          { en: ["<code>querySelector('button.add-btn')</code>", 'spec', 'you', `the string copies the template’s class ${pub('add-btn')}`],
            ar: ["<code>querySelector('button.add-btn')</code>", 'الـ spec', 'انت', `النص بينسخ الـ class ${pub('add-btn')} اللي في التمبلت`] },
          { en: ['<code>fixture</code>, <code>paid</code>, <code>host</code>', 'spec', 'you', 'all yours'],
            ar: ['<code>fixture</code> و<code>paid</code> و<code>host</code>', 'الـ spec', 'انت', 'كلهم بتوعك'] },
        ] },
      { t: 'ul',
        en: ['<b>The test copies; the app decides.</b> If a name exists in both, the app’s version is the real one and the test follows it.',
             '<b>The fake is connected by the class, not by a variable name.</b> <code>provide: CartStore</code> is the link. Call the fake whatever you like.',
             '<b>Strings are where tests go stale.</b> <code>setInput(\'currency\')</code>, <code>\'.cart-total\'</code>, <code>\'Cart (1)\'</code>: TypeScript does not check any of them against the app.'],
        ar: ['<b>التست بينسخ؛ والتطبيق بيقرر.</b> لو اسم موجود في الاتنين، نسخة التطبيق هي الحقيقية والتست بيمشي وراها.',
             '<b>الـ fake متوصل بالكلاس، مش باسم متغير.</b> <code>provide: CartStore</code> هو الرابط. سمّي الـ fake اللي انت عايزه.',
             '<b>الـ strings هي المكان اللي التستات بتقدم فيه.</b> <code>setInput(\'currency\')</code> و<code>\'.cart-total\'</code> و<code>\'Cart (1)\'</code>: TypeScript مش بيشيّك على ولا واحد فيهم قدام التطبيق.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All five files, every name coloured', ar: 'الخمس ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The app’s four files and the spec, complete. Hover an orange name in the spec to see where the app defines it. Then press <b>Rename test</b>: every name you own changes in the app and the spec together, and the tests still pass.',
      ar: 'التلات ملفات بتوع التطبيق والـ spec، كاملين. قف بالماوس على اسم برتقاني في الـ spec وشوف التطبيق معرّفه فين. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: كل اسم بتاعك بيتغير في التطبيق والـ spec مع بعض، والتستات لسه بتنجح.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'item.ts', lang: 'ts', tag: { en: 'the data', ar: 'الداتا' }, code: [
        'export interface Item {',
        '  id: string;',
        '  title: string;',
        '  price: number;',
        '}' ] },
      { t: 'code', name: 'cart-store.ts', lang: 'ts', tag: { en: 'the real store', ar: 'الـ store الحقيقي' }, code: [
        "import { Injectable, signal } from '@angular/core';",
        "import { Item } from './item';",
        '',
        "@Injectable({ providedIn: 'root' })",
        'export class CartStore {',
        '  readonly items = signal<Item[]>([]);',
        '',
        '  add(item: Item) {',
        '    this.items.update(list => [...list, item]);',
        '  }',
        '}' ] },
      { t: 'code', name: 'cart.ts', lang: 'ts', tag: { en: 'the component', ar: 'الـ component' }, code: [
        "import { Component, computed, inject, input, output } from '@angular/core';",
        "import { CartStore } from './cart-store';",
        '',
        '@Component({',
        "  selector: 'app-cart',",
        "  templateUrl: './cart.html',",
        '})',
        'export class Cart {',
        '  protected readonly store = inject(CartStore);',
        "  readonly currency = input('EGP');",
        '  readonly checkedOut = output<number>();',
        '',
        '  protected readonly total = computed(() =>',
        '    this.store.items().reduce((sum, i) => sum + i.price, 0));',
        '',
        '  addMouse() {',
        "    this.store.add({ id: '9', title: 'Mouse', price: 100 });",
        '  }',
        '',
        '  checkout() {',
        '    this.checkedOut.emit(this.total());',
        '  }',
        '}' ] },
      { t: 'code', name: 'cart.html', lang: 'html', tag: { en: 'the component', ar: 'الـ component' }, code: [
        '<h2>Cart ({{ store.items().length }})</h2>',
        '<p class="cart-total">{{ total() }} {{ currency() }}</p>',
        '<button class="add-btn" (click)="addMouse()">Add a mouse</button>',
        '<button class="pay-btn" (click)="checkout()">Checkout</button>' ] },
      { t: 'code', name: 'cart.spec.ts', lang: 'ts', tag: { en: 'the test', ar: 'التست' }, code: [
        "import { TestBed } from '@angular/core/testing';",
        "import { WritableSignal, provideZonelessChangeDetection, signal } from '@angular/core';",
        "import { Cart } from './cart';",
        "import { CartStore } from './cart-store';",
        "import { Item } from './item';",
        '',
        "describe('Cart', () => {",
        '  let fakeStore: { items: WritableSignal<Item[]>; add: jasmine.Spy };',
        '',
        '  beforeEach(() => {',
        "    fakeStore = { items: signal<Item[]>([]), add: jasmine.createSpy('add') };",
        '    TestBed.configureTestingModule({',
        '      imports: [Cart],',
        '      providers: [',
        '        provideZonelessChangeDetection(),',
        '        { provide: CartStore, useValue: fakeStore },',
        '      ],',
        '    });',
        '  });',
        '',
        "  it('shows the count and the total', async () => {",
        "    fakeStore.items.set([{ id: '1', title: 'Mouse', price: 100 }]);",
        '    const fixture = TestBed.createComponent(Cart);',
        "    fixture.componentRef.setInput('currency', 'USD');",
        '    await fixture.whenStable();',
        '',
        '    const host: HTMLElement = fixture.nativeElement;',
        "    expect(host.textContent).toContain('Cart (1)');",
        "    expect(host.querySelector('.cart-total')?.textContent).toContain('100 USD');",
        '  });',
        '',
        "  it('asks for a mouse when the button is clicked', async () => {",
        '    const fixture = TestBed.createComponent(Cart);',
        '    await fixture.whenStable();',
        '',
        "    fixture.nativeElement.querySelector('button.add-btn').click();",
        '',
        '    expect(fakeStore.add).toHaveBeenCalled();',
        '  });',
        '',
        "  it('emits the total when paying', async () => {",
        "    fakeStore.items.set([{ id: '1', title: 'Mouse', price: 100 }]);",
        '    const fixture = TestBed.createComponent(Cart);',
        '    await fixture.whenStable();',
        '',
        '    let paid: number | undefined;',
        '    fixture.componentInstance.checkedOut.subscribe(amount => (paid = amount));',
        "    fixture.nativeElement.querySelector('button.pay-btn').click();",
        '',
        '    expect(paid).toBe(100);',
        '  });',
        '});' ] },
      { t: 'nmtable' }
    ]
  },

  /* ------------------------------------------------------------ 4 */
  {
    id: 'rename',
    kicker: { en: 'Is it OK to change it?', ar: 'ينفع أغيّره؟' },
    title: { en: 'What breaks when the app renames something', ar: 'إيه اللي بيبوظ لما التطبيق يغيّر اسم' },
    lead: {
      en: 'Renames that go through imports give a compile error: easy. Renames of names the test writes as strings, or on an untyped fake, only show up as a failing or confusing test.',
      ar: 'التغييرات اللي بتعدّي على الـ imports بتدّي compile error: سهلة. لكن تغيير أسماء التست كاتبها كـ strings، أو على fake من غير type، مابيظهرش غير كتست فاشل أو ملخبط.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If the app renames…', 'Also edit in the test…', 'If you forget'],
                ar: ['لو التطبيق غيّر…', 'غيّر كمان في التست…', 'لو نسيت'] },
        rows: [
          { en: [`${pub('Cart')}, ${pub('CartStore')}, ${pub('Item')}`, 'the <code>import</code> lines and every use', 'Compile error.'],
            ar: [`${pub('Cart')} و${pub('CartStore')} و${pub('Item')}`, 'سطور الـ <code>import</code> وكل استخدام', 'Compile error.'] },
          { en: [`${pub('items')}, ${pub('add')} on the store`, 'the fake’s members', 'Here: a compile error, because <code>fakeStore</code> has a written type. With an untyped fake: a runtime <code>TypeError</code> inside the component.'],
            ar: [`${pub('items')} و${pub('add')} في الـ store`, 'الحاجات اللي جوه الـ fake', 'هنا: compile error، عشان <code>fakeStore</code> ليه type مكتوب. ولو الـ fake من غير type: <code>TypeError</code> وقت التشغيل جوه الـ component.'] },
          { en: [pub('currency') + ' (input)', "the string in <code>setInput('currency', …)</code>", '<b>No compile error.</b> Angular reports an unknown input when the test runs, and the check for <code>USD</code> fails.'],
            ar: [pub('currency') + ' (input)', "النص في <code>setInput('currency', …)</code>", '<b>مفيش compile error.</b> أنجولار بيقول إن الـ input مش معروف لما التست يشتغل، والتشييك على <code>USD</code> بيفشل.'] },
          { en: [pub('checkedOut') + ' (output)', '<code>componentInstance.checkedOut</code>', 'Compile error: it is a property access.'],
            ar: [pub('checkedOut') + ' (output)', '<code>componentInstance.checkedOut</code>', 'Compile error: ده وصول لـ property.'] },
          { en: [`${pub('cart-total')}, ${pub('add-btn')}, ${pub('pay-btn')} (CSS classes)`, 'the strings in <code>querySelector</code>', '<b>No compile error.</b> <code>querySelector</code> returns <code>null</code> and the test fails with “Cannot read properties of null”.'],
            ar: [`${pub('cart-total')} و${pub('add-btn')} و${pub('pay-btn')} (CSS classes)`, 'النصوص في <code>querySelector</code>', '<b>مفيش compile error.</b> <code>querySelector</code> بترجّع <code>null</code> والتست بيفشل بـ «Cannot read properties of null».'] },
          { en: ['the text <code>Cart (</code> in the template', 'the expected string <code>\'Cart (1)\'</code>', 'The assertion fails. That one is at least honest: the screen really changed.'],
            ar: ['الكلام <code>Cart (</code> في التمبلت', 'النص المتوقع <code>\'Cart (1)\'</code>', 'الـ assertion بيفشل. ودي على الأقل صريحة: الشاشة فعلًا اتغيرت.'] },
          { en: [`${mine('store')}, ${mine('total')}, ${mine('addMouse')}, ${mine('checkout')}`, 'nothing: the test never types them', 'Nothing breaks. This is why good tests do not reach into private parts.'],
            ar: [`${mine('store')} و${mine('total')} و${mine('addMouse')} و${mine('checkout')}`, 'ولا حاجة: التست عمره ما بيكتبهم', 'مفيش حاجة بتبوظ. وعشان كده التستات الكويسة مابتدخلش في الحاجات الخاصة.'] },
          { en: [`${mine('fakeStore')}, ${mine('fixture')}, ${mine('paid')}`, 'only inside the spec', 'Compile error in the spec.'],
            ar: [`${mine('fakeStore')} و${mine('fixture')} و${mine('paid')}`, 'جوه الـ spec بس', 'Compile error في الـ spec.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b>. Watch <code>currency</code>: it changes in <code>input()</code> and inside the <code>setInput</code> string at the same time. When you rename by hand, your editor’s rename tool will fix the first and miss the second.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b>. بص على <code>currency</code>: بيتغير في <code>input()</code> وجوه النص بتاع <code>setInput</code> في نفس الوقت. لما تغيّر بإيدك، أداة الـ rename في الإديتور هتصلّح الأولانية وهتفوّت التانية.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتوعك' },
    title: { en: 'The fixed names: runner, Angular, browser', ar: 'الأسماء الثابتة: الـ runner وأنجولار والمتصفح' },
    lead: {
      en: 'A spec has three owners of fixed words, and it helps to know which is which, because only one of them is Angular.',
      ar: 'الـ spec فيه تلات أصحاب لكلمات ثابتة، ويفيدك تعرف مين مين، لإن واحد بس فيهم هو أنجولار.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Names', 'Whose', 'What to know'], ar: ['الأسماء', 'بتاعة مين', 'تعرف إيه'] },
        rows: [
          { en: [`${ng('describe')}, ${ng('it')}, ${ng('beforeEach')}, ${ng('expect')}, ${ng('toBe')}, ${ng('toContain')}, ${ng('toHaveBeenCalled')}`, 'the test runner', 'Global functions, not imported. Jasmine, Jest and Vitest all use these names.'],
            ar: [`${ng('describe')} و${ng('it')} و${ng('beforeEach')} و${ng('expect')} و${ng('toBe')} و${ng('toContain')} و${ng('toHaveBeenCalled')}`, 'الـ test runner', 'functions عامة، مش بتتعمل import. Jasmine وJest وVitest كلهم بيستخدموا الأسماء دي.'] },
          { en: [`${ng('jasmine.createSpy')}, ${ng('jasmine.Spy')}`, 'Jasmine only', 'Newer projects may run Vitest instead: there it is <code>vi.fn()</code>. The rest of the spec reads the same.'],
            ar: [`${ng('jasmine.createSpy')} و${ng('jasmine.Spy')}`, 'Jasmine بس', 'المشاريع الأحدث ممكن تشتغل بـ Vitest: هناك اسمها <code>vi.fn()</code>. وباقي الـ spec بيتقري زي ما هو.'] },
          { en: [`${ng('TestBed')}, ${ng('configureTestingModule')}, ${ng('createComponent')}, ${ng('whenStable')}, ${ng('componentRef')}, ${ng('setInput')}, ${ng('componentInstance')}`, 'Angular', 'Imported from <code>@angular/core/testing</code> or reached through the fixture.'],
            ar: [`${ng('TestBed')} و${ng('configureTestingModule')} و${ng('createComponent')} و${ng('whenStable')} و${ng('componentRef')} و${ng('setInput')} و${ng('componentInstance')}`, 'أنجولار', 'بتتعمل import من <code>@angular/core/testing</code> أو بتوصلها من خلال الـ fixture.'] },
          { en: [`${ng('nativeElement')}, ${ng('querySelector')}, ${ng('textContent')}, ${ng('click')}`, 'the browser (the DOM)', 'Plain DOM: the same words you would use in a browser console.'],
            ar: [`${ng('nativeElement')} و${ng('querySelector')} و${ng('textContent')} و${ng('click')}`, 'المتصفح (الـ DOM)', 'DOM عادي: نفس الكلمات اللي بتستخدمها في console المتصفح.'] },
        ] },
      { t: 'p',
        en: 'Two strings look like names but are only labels: the text in <code>describe(\'Cart\', …)</code> and in <code>it(\'…\', …)</code>, and the <code>\'add\'</code> passed to <code>createSpy</code>. They appear in the test report and nothing else reads them.',
        ar: 'فيه نصين شكلهم أسماء بس هما عناوين وخلاص: الكلام اللي في <code>describe(\'Cart\', …)</code> وفي <code>it(\'…\', …)</code>، و<code>\'add\'</code> اللي بتتبعت لـ <code>createSpy</code>. بيظهروا في تقرير التستات ومحدش تاني بيقراهم.' }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'Test names are read mostly when something fails. Pick them for that moment.',
      ar: 'أسماء التستات بتتقري غالبًا لما حاجة تفشل. اختارها عشان اللحظة دي.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['the <code>describe</code> label', "the class name: <code>'Cart'</code>", "<code>'test 1'</code>, <code>'misc'</code>", 'The report prints it before every failing test.'],
            ar: ['عنوان الـ <code>describe</code>', "اسم الكلاس: <code>'Cart'</code>", "<code>'test 1'</code> و<code>'misc'</code>", 'التقرير بيطبعه قبل أي تست فاشل.'] },
          { en: ['the <code>it</code> sentence', "what a user sees: <code>'shows the count and the total'</code>", "<code>'works'</code>, <code>'calls computed'</code>", 'Read with the describe label it becomes a sentence about behaviour.'],
            ar: ['جملة الـ <code>it</code>', "اللي اليوزر بيشوفه: <code>'shows the count and the total'</code>", "<code>'works'</code> و<code>'calls computed'</code>", 'لما تتقري مع عنوان الـ describe بتبقى جملة عن السلوك.'] },
          { en: ['the fake', '<code>fakeStore</code>, <code>storeStub</code>', '<code>store</code>, <code>cartStore</code>', 'The name should shout that it is not the real one.'],
            ar: ['الـ fake', '<code>fakeStore</code> و<code>storeStub</code>', '<code>store</code> و<code>cartStore</code>', 'الاسم لازم يصرّخ إنه مش الحقيقي.'] },
          { en: ['the fixture', '<code>fixture</code>', 'a new name in every test', 'The CLI’s generated specs use <code>fixture</code>; everyone recognises it.'],
            ar: ['الـ fixture', '<code>fixture</code>', 'اسم جديد في كل تست', 'الـ specs اللي الـ CLI بيولّدها بتستخدم <code>fixture</code>؛ والكل عارفه.'] },
          { en: ['classes the test searches for', 'a class meant as a hook: <code>add-btn</code>, <code>cart-total</code>', 'layout classes like <code>mt-2</code>, <code>flex</code>', 'A styling change should not break a test. Some teams add a <code>data-testid</code> attribute instead.'],
            ar: ['الـ classes اللي التست بيدوّر عليها', 'class معمول مخصوص كمسكة: <code>add-btn</code> و<code>cart-total</code>', 'classes بتاعة التنسيق زي <code>mt-2</code> و<code>flex</code>', 'تغيير في الشكل مايصحش يكسر تست. وفيه فرق بتضيف attribute اسمه <code>data-testid</code> بدل كده.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Four places where the name is not free', ar: 'أربع أماكن الاسم فيهم مش براحتك' },
    lead: {
      en: 'Some of what you type in a spec is dictated by the app, by Angular or by the tooling.',
      ar: 'شوية من اللي بتكتبه في الـ spec التطبيق أو أنجولار أو الأدوات هما اللي بيحددوه.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'The file name ends in <code>.spec.ts</code>', ar: 'اسم الملف بيخلص بـ <code>.spec.ts</code>' }, blocks: [
        { t: 'p',
          en: 'The CLI’s test setup looks for files ending in <code>.spec.ts</code> by default. Call it <code>cart.test.ts</code> or <code>cart-tests.ts</code> and it may simply never run, with no error. Keep it next to the file it tests, with the same base name.',
          ar: 'إعداد التستات بتاع الـ CLI بيدوّر افتراضيًا على الملفات اللي بتخلص بـ <code>.spec.ts</code>. لو سمّيته <code>cart.test.ts</code> أو <code>cart-tests.ts</code> ممكن ببساطة مايشتغلش خالص، من غير أي error. وخليه جنب الملف اللي بيختبره، بنفس الاسم.' }
      ]},
      { t: 'step', n: 'B', title: { en: 'The input’s public name, as a string', ar: 'اسم الـ input العام، كـ string' }, blocks: [
        { t: 'p',
          en: `${ng('setInput')} takes the name the <b>template</b> would use. Usually that is the property name, ${pub('currency')}. If the input has an alias, the alias is what you pass. Outputs are the opposite: ${ng('componentInstance')}.${pub('checkedOut')} is a class property, so you use the property name.`,
          ar: `${ng('setInput')} بتاخد الاسم اللي <b>التمبلت</b> كان هيستخدمه. غالبًا ده اسم الـ property، ${pub('currency')}. ولو الـ input ليه alias، الـ alias هو اللي تبعته. الـ outputs العكس: ${ng('componentInstance')}.${pub('checkedOut')} ده property في الكلاس، فبتستخدم اسم الـ property.` }
      ]},
      { t: 'step', n: 'C', title: { en: 'The token and the fake’s members', ar: 'الـ token والحاجات اللي جوه الـ fake' }, blocks: [
        { t: 'p',
          en: `${ng('provide')}: must be the <b>exact class</b> the component passes to ${ng('inject')}. And the fake’s members must be spelled like the members the component uses. Writing a type for the fake (as the spec does) turns spelling mistakes into compile errors.`,
          ar: `${ng('provide')}: لازم يبقى <b>نفس الكلاس بالظبط</b> اللي الـ component بيبعته لـ ${ng('inject')}. والحاجات اللي جوه الـ fake لازم تتكتب زي اللي الـ component بيستخدمها. لما تكتب type للـ fake (زي ما الـ spec عامل) الغلطات الإملائية بتبقى compile errors.` }
      ]},
      { t: 'step', n: 'D', title: { en: 'The runner’s globals', ar: 'الـ globals بتاعة الـ runner' }, blocks: [
        { t: 'p',
          en: 'You never import <code>describe</code>, <code>it</code> or <code>expect</code> with Jasmine. Their types come from <code>tsconfig.spec.json</code> (<code>"types": ["jasmine"]</code>). That is why they are fixed: they are the runner’s global names.',
          ar: 'مع Jasmine عمرك ما بتعمل import لـ <code>describe</code> أو <code>it</code> أو <code>expect</code>. الـ types بتاعتهم جاية من <code>tsconfig.spec.json</code> (<code>"types": ["jasmine"]</code>). وعشان كده هما ثابتين: دول أسماء عامة بتاعة الـ runner.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: 'Older specs use the same names, wired differently', ar: 'الـ specs القديمة بتستخدم نفس الأسماء، بتوصيل مختلف' },
    lead: {
      en: 'You will meet specs written for NgModules and <code>@Input()</code>. The component, store and fake names are identical; only the setup words change.',
      ar: 'هتقابل specs مكتوبة للـ NgModules و<code>@Input()</code>. أسماء الـ component والـ store والـ fake هي هي؛ كلمات التجهيز بس هي اللي بتتغير.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'cart.spec.ts — older style', lang: 'ts', code: [
          'TestBed.configureTestingModule({',
          '  declarations: [Cart],',
          '  providers: [{ provide: CartStore, useValue: fakeStore }],',
          '});',
          'const fixture = TestBed.createComponent(Cart);',
          "fixture.componentInstance.currency = 'USD';   // an old @Input() property",
          'fixture.detectChanges();' ] },
        good: { name: 'cart.spec.ts — today', lang: 'ts', code: [
          'TestBed.configureTestingModule({',
          '  imports: [Cart],',
          '  providers: [{ provide: CartStore, useValue: fakeStore }],',
          '});',
          'const fixture = TestBed.createComponent(Cart);',
          "fixture.componentRef.setInput('currency', 'USD');",
          'await fixture.whenStable();' ] } },
      { t: 'p',
        en: 'With <code>input()</code>, the old assignment line is a compile error: the property is <code>readonly</code> and holds a signal, not a string. Use <code>setInput</code>. Older specs also use <code>fakeAsync</code> and <code>tick()</code>; those rely on zone.js, so they do not fit a zoneless test like this one.',
        ar: 'مع <code>input()</code>، سطر الـ assignment القديم ده compile error: الـ property <code>readonly</code> وشايلة signal، مش string. استخدم <code>setInput</code>. والـ specs القديمة كمان بتستخدم <code>fakeAsync</code> و<code>tick()</code>؛ ودول معتمدين على zone.js، فمش مناسبين لتست zoneless زي ده.' }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'Red, but not why you think', ar: 'أحمر، بس مش للسبب اللي فاكره' },
    title: { en: 'Mistakes that fail silently or confusingly', ar: 'غلطات بتفشل في صمت أو بشكل ملخبط' },
    lead: {
      en: 'Most broken specs are not broken logic. They are a name the test copied that no longer matches the app, and the error message points somewhere else.',
      ar: 'أغلب الـ specs البايظة مش منطق بايظ. هي اسم التست نسخه ومبقاش مطابق للتطبيق، ورسالة الإيرور بتشاور على حتة تانية.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'A fake with a “nicer” member name', ar: 'fake فيه اسم «أشيك»' }, blocks: [
        { t: 'pair',
          bad:  { name: 'cart.spec.ts', lang: 'ts', code: ["const fakeStore = { cartItems: signal<Item[]>([]), add: jasmine.createSpy('add') };"] },
          good: { name: 'cart.spec.ts', lang: 'ts', code: ["const fakeStore = { items: signal<Item[]>([]), add: jasmine.createSpy('add') };"] } },
        { t: 'p', en: 'The fake has no written type, so TypeScript accepts it. The component then calls <code>store.items()</code> and the test fails with a <code>TypeError</code> saying <code>items</code> is not a function, pointing at the component, not the spec.',
                  ar: 'الـ fake ملوش type مكتوب، فـ TypeScript بيقبله. وبعدين الـ component بينادي <code>store.items()</code> والتست بيفشل بـ <code>TypeError</code> بيقول إن <code>items</code> مش function، وبيشاور على الـ component، مش الـ spec.' }
      ]},
      { t: 'step', n: '2', title: { en: 'A typo in the input string', ar: 'غلطة إملائية في نص الـ input' }, blocks: [
        { t: 'pair',
          bad:  { name: 'cart.spec.ts', lang: 'ts', code: ["fixture.componentRef.setInput('currancy', 'USD');"] },
          good: { name: 'cart.spec.ts', lang: 'ts', code: ["fixture.componentRef.setInput('currency', 'USD');"] } },
        { t: 'p', en: 'A string is never checked at compile time. When the test runs, Angular reports that the component has no input with that name (NG0303), the cart still shows <code>EGP</code>, and the real failure is the <code>100 USD</code> check further down.',
                  ar: 'الـ string عمره ما بيتشيّك عليه وقت الـ compile. لما التست يشتغل، أنجولار بيقول إن الـ component ملوش input بالاسم ده (NG0303)، والكارت لسه بيعرض <code>EGP</code>، والفشل الحقيقي بيظهر في تشييك <code>100 USD</code> اللي تحت.' }
      ]},
      { t: 'step', n: '3', title: { en: 'A string where the token should be', ar: 'string مكان الـ token' }, blocks: [
        { t: 'pair',
          bad:  { name: 'cart.spec.ts', lang: 'ts', code: ["providers: [{ provide: 'CartStore', useValue: fakeStore }],"] },
          good: { name: 'cart.spec.ts', lang: 'ts', code: ['providers: [{ provide: CartStore, useValue: fakeStore }],'] } },
        { t: 'p', en: 'The string <code>\'CartStore\'</code> is a different token from the class. The component asks for the class, gets the <b>real</b> store (it is <code>providedIn: \'root\'</code>), and no error appears. Only <code>expect(fakeStore.add)</code> fails, because the fake was never used.',
                  ar: 'النص <code>\'CartStore\'</code> token مختلف عن الكلاس. الـ component بيطلب الكلاس، وبياخد الـ store <b>الحقيقي</b> (عشان هو <code>providedIn: \'root\'</code>)، ومفيش أي error. بس <code>expect(fakeStore.add)</code> هو اللي بيفشل، لإن الـ fake عمره ما اتستخدم.' }
      ]},
      { t: 'step', n: '4', title: { en: 'A class the template no longer has', ar: 'class التمبلت مبقاش فيه' }, blocks: [
        { t: 'pair',
          bad:  { name: 'cart.spec.ts', lang: 'ts', code: ["fixture.nativeElement.querySelector('button.add').click();"] },
          good: { name: 'cart.spec.ts', lang: 'ts', code: ["fixture.nativeElement.querySelector('button.add-btn').click();"] } },
        { t: 'p', en: 'Someone renamed the class in <code>cart.html</code>. <code>querySelector</code> finds nothing and returns <code>null</code>, so the error is “Cannot read properties of null (reading \'click\')”. It sounds like a crash; it is a stale name.',
                  ar: 'حد غيّر الـ class في <code>cart.html</code>. <code>querySelector</code> مش بتلاقي حاجة وبترجّع <code>null</code>، فالإيرور بيبقى «Cannot read properties of null (reading \'click\')». شكله crash؛ بس هو اسم قديم.' }
      ]},
      { t: 'step', n: '5', title: { en: 'Checking before the screen is drawn', ar: 'تشيّك قبل ما الشاشة تترسم' }, blocks: [
        { t: 'pair',
          bad:  { name: 'cart.spec.ts', lang: 'ts', code: [
            'const fixture = TestBed.createComponent(Cart);',
            "expect(fixture.nativeElement.textContent).toContain('Cart (1)');" ] },
          good: { name: 'cart.spec.ts', lang: 'ts', code: [
            'const fixture = TestBed.createComponent(Cart);',
            'await fixture.whenStable();',
            "expect(fixture.nativeElement.textContent).toContain('Cart (1)');" ] } },
        { t: 'p', en: 'Right after <code>createComponent</code> the template has not been rendered yet, so the text is empty and the message reads like the count is wrong. Wait for <code>whenStable()</code> first.',
                  ar: 'بعد <code>createComponent</code> على طول التمبلت لسه ماترسمش، فالنص فاضي والرسالة بتتقري كأن العدد غلط. استنى <code>whenStable()</code> الأول.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it fails', ar: 'لما يفشل' },
    title: { en: 'Six questions, in this order', ar: 'ست أسئلة، بالترتيب ده' },
    lead: {
      en: 'Your spec is red, or never runs. Ask these before touching the component.',
      ar: 'الـ spec بتاعك أحمر، أو مابيشتغلش أصلًا. اسأل دول قبل ما تلمس الـ component.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Does the file end in <code>.spec.ts</code>, and does the report list it at all?',
                  ar: '<b>1.</b> الملف بيخلص بـ <code>.spec.ts</code>؟ والتقرير أصلًا بيذكره؟' },
      { t: 'chk', en: '<b>2.</b> Is <code>provide:</code> the same class the component passes to <code>inject()</code>, not a string?',
                  ar: '<b>2.</b> <code>provide:</code> هو نفس الكلاس اللي الـ component بيبعته لـ <code>inject()</code>، مش string؟' },
      { t: 'chk', en: '<b>3.</b> Does the fake have every member the component uses, spelled the same? Give it a type so TypeScript checks.',
                  ar: '<b>3.</b> الـ fake فيه كل الحاجات اللي الـ component بيستخدمها، بنفس الكتابة؟ ادّيله type عشان TypeScript يشيّك.' },
      { t: 'chk', en: '<b>4.</b> Do the strings in <code>setInput</code> and <code>querySelector</code> still match the component’s input names and the template’s classes?',
                  ar: '<b>4.</b> النصوص اللي في <code>setInput</code> و<code>querySelector</code> لسه مطابقة لأسماء الـ inputs بتاعة الـ component والـ classes اللي في التمبلت؟' },
      { t: 'chk', en: '<b>5.</b> Did you <code>await fixture.whenStable()</code> after creating the component and after changing its state?',
                  ar: '<b>5.</b> عملت <code>await fixture.whenStable()</code> بعد ما عملت الـ component وبعد ما غيّرت حالته؟' },
      { t: 'chk', en: '<b>6.</b> Is the expected text still what the template prints? Maybe the screen really changed and the test is right to fail.',
                  ar: '<b>6.</b> النص المتوقع لسه هو اللي التمبلت بيطبعه؟ يمكن الشاشة فعلًا اتغيرت والتست عنده حق يفشل.' }
    ]
  }
  ]
};
