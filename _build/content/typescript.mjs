export default {
title:{en:'TypeScript, only the parts Angular uses', ar:'TypeScript، بس الأجزاء اللي أنجولار بيستخدمها'},
lead:{
  en:`Angular is written in TypeScript, so every Angular file you open is a TypeScript file. The good news: you do not need the whole language. This page covers the parts that actually appear in Angular code, in the order you meet them — starting from <b>zero</b>. If you can read JavaScript, you can read this.`,
  ar:`أنجولار مكتوب بـ TypeScript، فأي ملف أنجولار هتفتحه هو ملف TypeScript. والخبر الحلو: مش محتاج اللغة كلها. الصفحة دي فيها الأجزاء اللي بتظهر فعلاً في كود أنجولار، بالترتيب اللي هتقابلهم بيه — من <b>الصفر</b>. لو بتعرف تقرا جافاسكريبت، تقدر تقرا ده.`
},
sections:[

/* ---------------------------------------------------------------- */
{
  id:'why', kicker:{en:'Start here', ar:'ابدأ من هنا'},
  title:{en:'TypeScript is JavaScript with labels', ar:'TypeScript هو جافاسكريبت مع لافتات'},
  lead:{
    en:`Every line of JavaScript you already know is valid TypeScript. TypeScript adds one thing: you can say what kind of value a variable holds, and the editor checks it <b>before you run the code</b>.`,
    ar:`كل سطر جافاسكريبت إنت عارفه هو TypeScript صحيح. TypeScript بيضيف حاجة واحدة: تقدر تقول القيمة نوعها إيه، والمحرر بيتأكد <b>قبل ما تشغّل الكود</b>.`
  },
  blocks:[
    {t:'code',name:'the whole idea',lang:'ts',tag:{en:'compare',ar:'قارن'},code:[
      "// JavaScript — nothing stops you until it explodes at runtime",
      "let price = 100;",
      "price = 'one hundred';        // fine today, crash tomorrow",
      "",
      "// TypeScript — the same line, caught while you type",
      "let price: number = 100;",
      "price = 'one hundred';        // Type 'string' is not assignable to type 'number'"
    ]},
    {t:'p',
      en:`That <code>: number</code> is a <b>type annotation</b>. It produces no code — the browser never sees it. It exists purely so the compiler and your editor can catch mistakes and offer autocomplete.`,
      ar:`الـ <code>: number</code> دي اسمها <b>type annotation</b>. مش بتنتج كود — البراوزر عمره ما بيشوفها. موجودة بس عشان الـ compiler والمحرر يمسكوا الغلطات ويقترحوا عليك.`},
    {t:'note',label:{en:'You will annotate less than you think',ar:'هتكتب أنواع أقل مما تتخيل'},
      en:`TypeScript <b>infers</b> most types. <code>let price = 100</code> is already a <code>number</code> — writing <code>: number</code> there adds nothing. Annotate function parameters and public APIs; let everything else be inferred.`,
      ar:`TypeScript بـ<b>يستنتج</b> معظم الأنواع. <code>let price = 100</code> هو أصلاً <code>number</code> — كتابة <code>: number</code> هنا مش بتضيف حاجة. اكتب الأنواع في معاملات الدوال والواجهات العامة، وسيب الباقي يتستنتج.`}
  ]
},

/* ---------------------------------------------------------------- */
{
  id:'basics', kicker:{en:'The vocabulary', ar:'المفردات'},
  title:{en:'The types you will actually type', ar:'الأنواع اللي هتكتبها فعلاً'},
  lead:{
    en:`There are about eight of these and they cover almost everything in an Angular app.`,
    ar:`فيه حوالي تمنية بس، وبيغطوا تقريباً كل حاجة في تطبيق أنجولار.`
  },
  blocks:[
    {t:'code',name:'basic-types.ts',lang:'ts',tag:{en:'the whole set',ar:'المجموعة كلها'},code:[
      "let name: string = 'Mona';",
      "let age: number = 30;              // no separate int/float — just number",
      "let isAdmin: boolean = false;",
      "",
      "let tags: string[] = ['sale', 'new'];        // array of strings",
      "let scores: Array<number> = [1, 2, 3];       // the same thing, other syntax",
      "",
      "let pair: [string, number] = ['age', 30];    // tuple: fixed length and order",
      "",
      "let nothing: null = null;",
      "let missing: undefined = undefined;",
      "",
      "let anything: any = 'whatever';    // turns OFF checking — avoid",
      "let safe: unknown = 'whatever';    // unknown until you check it — prefer this"
    ]},
    {t:'pair',
      bad:{name:'any switches the compiler off',code:[
        "function total(items: any) {",
        "  return items.redcue((a, b) => a + b);   // typo — nobody warns you",
        "}",
        "",
        "// any means \"stop checking\". Every bug downstream is now invisible."
      ]},
      good:{name:'say what you mean',code:[
        "function total(items: number[]) {",
        "  return items.reduce((a, b) => a + b, 0);   // typo would be caught",
        "}",
        "",
        "// if you genuinely do not know the type yet, use unknown,",
        "// which forces you to check before using it."
      ]}},
    {t:'note',label:{en:'The one rule about any',ar:'قاعدة واحدة عن any'},
      en:`Every <code>any</code> is a hole in the net. It is sometimes the pragmatic answer, but treat it as a note saying <em>I will come back to this</em> — not as a solution.`,
      ar:`كل <code>any</code> دي فتحة في الشبكة. أحياناً بتبقى الحل العملي، بس اعتبرها ملحوظة معناها <em>هرجعلها بعدين</em> — مش حل.`}
  ]
},

/* ---------------------------------------------------------------- */
{
  id:'shapes', kicker:{en:'Describing objects', ar:'وصف الـ objects'},
  title:{en:'<code>interface</code> and <code>type</code>: naming a shape', ar:'<code>interface</code> و <code>type</code>: تسمية الشكل'},
  lead:{
    en:`Almost every object in an Angular app has a name for its shape — a <code>User</code>, an <code>Order</code>, a <code>Product</code>. You write it once and use it everywhere.`,
    ar:`تقريباً كل object في تطبيق أنجولار ليه اسم لشكله — <code>User</code> أو <code>Order</code> أو <code>Product</code>. بتكتبه مرة وتستخدمه في كل حتة.`
  },
  blocks:[
    {t:'code',name:'models/user.ts',lang:'ts',tag:{en:'a real Angular file',ar:'ملف أنجولار حقيقي'},code:[
      "export interface User {",
      "  id: string;",
      "  name: string;",
      "  email: string;",
      "  age?: number;                    // ? = optional, may be missing",
      "  readonly createdAt: string;      // cannot be reassigned after creation",
      "  roles: string[];",
      "}",
      "",
      "// now the shape has a name you can use anywhere",
      "const mona: User = {",
      "  id: 'u1',",
      "  name: 'Mona',",
      "  email: 'mona@shop.eg',",
      "  createdAt: '2026-01-04',",
      "  roles: ['admin'],",
      "};                                 // age omitted — allowed, it is optional"
    ]},
    {t:'p',
      en:`<code>type</code> does the same job and a bit more. The practical rule: use <code>interface</code> for object shapes, and <code>type</code> when you need a union or an alias for something that is not an object.`,
      ar:`<code>type</code> بتعمل نفس الشغل وزيادة شوية. القاعدة العملية: استعمل <code>interface</code> لأشكال الـ objects، و<code>type</code> لما تحتاج union أو اسم بديل لحاجة مش object.`},
    {t:'code',name:'when to use type',lang:'ts',tag:{en:'unions',ar:'الاتحادات'},code:[
      "// a union: the value is exactly one of these, and nothing else",
      "type Status = 'idle' | 'loading' | 'ready' | 'error';",
      "",
      "let s: Status = 'loading';",
      "s = 'loadng';        // caught — typos in strings become compile errors",
      "",
      "// unions of objects work too",
      "type Result =",
      "  | { ok: true; data: User }",
      "  | { ok: false; error: string };",
      "",
      "// combine shapes",
      "type Timestamped = { createdAt: string; updatedAt: string };",
      "type Post = { title: string } & Timestamped;   // & = has both"
    ]},
    {t:'note',label:{en:'Why this matters in Angular',ar:'ليه ده مهم في أنجولار'},
      en:`A literal union like <code>Status</code> is how you get autocomplete on a component input and how the compiler stops you writing <code>'loadng'</code>. It replaces <code>enum</code> in most modern Angular code.`,
      ar:`الـ union النصي زي <code>Status</code> هو اللي بيديك اقتراحات في input الـ component، وبيمنعك تكتب <code>'loadng'</code>. وهو بديل <code>enum</code> في معظم كود أنجولار الحديث.`}
  ]
},

/* ---------------------------------------------------------------- */
{
  id:'null', kicker:{en:'The number one error', ar:'الايرور رقم واحد'},
  title:{en:'<code>null</code>, <code>undefined</code>, and “possibly undefined”', ar:'<code>null</code> و <code>undefined</code> و «possibly undefined»'},
  lead:{
    en:`Angular projects ship with <code>strict</code> mode on. That means TypeScript refuses to let you use a value that <em>might</em> be missing, until you prove it is there. This is the error every beginner meets on day one.`,
    ar:`مشاريع أنجولار بتيجي و<code>strict</code> mode مفتوح. ومعناها إن TypeScript مش هيسيبك تستخدم قيمة <em>ممكن</em> تكون ناقصة، لحد ما تثبت إنها موجودة. ودي الغلطة اللي كل مبتدئ بيقابلها أول يوم.`
  },
  blocks:[
    {t:'code',name:'the error, and the four ways out',lang:'ts',tag:{en:'read this twice',ar:'اقراها مرتين'},code:[
      "const user: User | undefined = findUser('u1');",
      "",
      "console.log(user.name);        // ✗ 'user' is possibly 'undefined'",
      "",
      "// 1. check first — the compiler follows your if statement",
      "if (user) {",
      "  console.log(user.name);      // ✓ inside here it cannot be undefined",
      "}",
      "",
      "// 2. optional chaining — returns undefined instead of throwing",
      "console.log(user?.name);       // ✓",
      "",
      "// 3. a fallback value with ??  (only fires on null/undefined)",
      "const label = user?.name ?? 'Guest';   // ✓",
      "",
      "// 4. the non-null assertion — you SWEAR it is there",
      "console.log(user!.name);       // ✓ compiles, and crashes if you were wrong"
    ]},
    {t:'note',label:{en:'About that exclamation mark',ar:'بخصوص علامة التعجب دي'},
      en:`<code>!</code> does not check anything — it silences the compiler. Every <code>!</code> you write is a promise you are making with no evidence. Use options 1–3 first; reach for <code>!</code> only when you can explain out loud why it can never be null.`,
      ar:`<code>!</code> مش بتتأكد من حاجة — بتسكّت الـ compiler بس. كل <code>!</code> بتكتبها هي وعد منك من غير دليل. استعمل الحلول 1 لـ 3 الأول؛ ومتلجأش لـ <code>!</code> غير لما تقدر تقول بصوت عالي ليه دي مستحيل تكون null.`},
    {t:'p',
      en:`Note the difference between <code>??</code> and <code>||</code>. <code>||</code> fires on any falsy value, so <code>0</code> and <code>''</code> get replaced too. <code>??</code> fires only on <code>null</code> and <code>undefined</code> — which is almost always what you meant.`,
      ar:`خد بالك من الفرق بين <code>??</code> و<code>||</code>. <code>||</code> بتشتغل مع أي قيمة falsy، فـ <code>0</code> و<code>''</code> بيتبدلوا كمان. أما <code>??</code> فبتشتغل بس مع <code>null</code> و<code>undefined</code> — وده تقريباً دايماً اللي كنت تقصده.`},
    {t:'code',name:'the difference that bites',lang:'ts',tag:{en:'?? vs ||',ar:'?? مقابل ||'},code:[
      "const qty = 0;",
      "",
      "qty || 1;     // → 1   … 0 is falsy, so it was replaced. Probably a bug.",
      "qty ?? 1;     // → 0   … 0 is a real value, kept. Probably what you wanted."
    ]}
  ]
},

/* ---------------------------------------------------------------- */
{
  id:'functions', kicker:{en:'Behaviour', ar:'السلوك'},
  title:{en:'Functions, parameters and return types', ar:'الدوال والمعاملات وأنواع الإرجاع'},
  lead:{
    en:`Parameters are where annotations earn their keep — TypeScript cannot infer what a caller will hand you.`,
    ar:`المعاملات هي المكان اللي الأنواع بتثبت فيه فايدتها — TypeScript مش بيقدر يستنتج المتصل هيديك إيه.`
  },
  blocks:[
    {t:'code',name:'functions.ts',lang:'ts',tag:{en:'every form',ar:'كل الأشكال'},code:[
      "// annotate the parameters; the return type is usually inferred",
      "function greet(name: string) {",
      "  return `Hello ${name}`;         // inferred as string",
      "}",
      "",
      "// optional parameter, and one with a default",
      "function price(amount: number, currency = 'EGP', discount?: number) {",
      "  const off = discount ?? 0;",
      "  return `${amount - off} ${currency}`;",
      "}",
      "",
      "// arrow function — the form you see most in Angular",
      "const double = (n: number): number => n * 2;",
      "",
      "// a function that returns nothing",
      "function log(message: string): void {",
      "  console.log(message);",
      "}",
      "",
      "// a function passed as a value — describe its shape",
      "function onEach(items: string[], fn: (item: string, index: number) => void) {",
      "  items.forEach(fn);",
      "}"
    ]},
    {t:'note',label:{en:'Where you meet this in Angular',ar:'هتقابل ده فين في أنجولار'},
      en:`<code>(item: string, index: number) =&gt; void</code> is exactly the shape you write for a route guard, an HTTP interceptor, or the callback in <code>.map()</code>. Angular is full of functions passed as values.`,
      ar:`<code>(item: string, index: number) =&gt; void</code> ده بالظبط الشكل اللي بتكتبه لـ route guard أو HTTP interceptor أو الـ callback جوه <code>.map()</code>. أنجولار مليان دوال بتتمرر كقيم.`}
  ]
},

/* ---------------------------------------------------------------- */
{
  id:'classes', kicker:{en:'Where components live', ar:'مكان الـ components'},
  title:{en:'Classes, and the parts Angular cares about', ar:'الكلاسات، والأجزاء اللي أنجولار بيهتم بيها'},
  lead:{
    en:`Every Angular component and service is a class. You need four things from classes: fields, a constructor, access modifiers, and <code>readonly</code>.`,
    ar:`كل component وservice في أنجولار هو كلاس. ومحتاج أربع حاجات من الكلاسات: الحقول، والـ constructor، ومحددات الوصول، و<code>readonly</code>.`
  },
  blocks:[
    {t:'code',name:'classes.ts',lang:'ts',tag:{en:'the four things',ar:'الأربع حاجات'},code:[
      "export class Cart {",
      "  // a field with an initial value — its type is inferred",
      "  items: Item[] = [];",
      "",
      "  // public (the default): anyone may read and write it",
      "  public currency = 'EGP';",
      "",
      "  // private: only code inside this class may touch it",
      "  private secret = 'abc';",
      "",
      "  // protected: this class and anything that extends it",
      "  protected internalId = 0;",
      "",
      "  // readonly: set once, never reassigned",
      "  readonly createdAt = new Date();",
      "",
      "  // a method",
      "  add(item: Item) {",
      "    this.items = [...this.items, item];",
      "  }",
      "",
      "  // a getter — reads like a field, runs like a method",
      "  get count() {",
      "    return this.items.length;",
      "  }",
      "}"
    ]},
    {t:'p',
      en:`Angular components use exactly this and little else. You will see <code>readonly</code> on almost every line of a modern component — because a signal, an input or an injected service is created once and never reassigned.`,
      ar:`الـ components في أنجولار بتستخدم ده بالظبط ومش أكتر. وهتشوف <code>readonly</code> في كل سطر تقريباً في component حديث — لإن الـ signal أو الـ input أو الـ service المحقونة بتتعمل مرة واحدة وعمرها ما بتتغير.`},
    {t:'code',name:'what it looks like in Angular',lang:'ts',tag:{en:'joining up',ar:'التوصيل'},code:[
      "@Component({ selector: 'app-cart', template: `…` })",
      "export class CartComponent {",
      "  // injected once, never reassigned → readonly",
      "  private readonly store = inject(CartStore);",
      "",
      "  // created once; the VALUE inside changes, the signal does not",
      "  readonly items = signal<Item[]>([]);",
      "",
      "  // a plain method, called from the template",
      "  add(item: Item) {",
      "    this.items.update(list => [...list, item]);",
      "  }",
      "}"
    ]},
    {t:'note',label:{en:'readonly is not the same as const',ar:'readonly مش زي const'},
      en:`<code>readonly items = signal([])</code> means you cannot do <code>this.items = somethingElse</code>. It does <b>not</b> freeze what is inside — <code>items.set([...])</code> still works, and that is exactly the point.`,
      ar:`<code>readonly items = signal([])</code> معناها إنك مش هتقدر تعمل <code>this.items = حاجة تانية</code>. لكنها <b>مش</b> بتجمّد اللي جوه — <code>items.set([...])</code> لسه شغالة، وده بالظبط المقصود.`}
  ]
},

/* ---------------------------------------------------------------- */
{
  id:'generics', kicker:{en:'The scary-looking one', ar:'اللي شكله مخيف'},
  title:{en:'Generics: the <code>&lt;angle brackets&gt;</code> everywhere in Angular', ar:'الـ Generics: الـ <code>&lt;أقواس&gt;</code> اللي في كل حتة في أنجولار'},
  lead:{
    en:`<code>signal&lt;Item[]&gt;([])</code>, <code>input.required&lt;string&gt;()</code>, <code>http.get&lt;User&gt;(…)</code> — the same idea three times. A generic is a <b>type you fill in later</b>, like a parameter but for types.`,
    ar:`<code>signal&lt;Item[]&gt;([])</code> و<code>input.required&lt;string&gt;()</code> و<code>http.get&lt;User&gt;(…)</code> — نفس الفكرة تلات مرات. الـ generic هو <b>نوع بتملاه بعدين</b>، زي المعامل بالظبط بس للأنواع.`
  },
  blocks:[
    {t:'code',name:'building the intuition',lang:'ts',tag:{en:'from scratch',ar:'من الصفر'},code:[
      "// a box that holds one thing. what thing? you decide when you use it.",
      "class Box<T> {",
      "  constructor(public value: T) {}",
      "}",
      "",
      "const a = new Box<string>('hello');   // T is string",
      "const b = new Box<number>(42);        // T is number",
      "",
      "a.value.toUpperCase();   // ✓ TypeScript knows it is a string",
      "b.value.toUpperCase();   // ✗ numbers do not have toUpperCase",
      "",
      "// T is just a name. You will also see U, K, V — no meaning, convention only."
    ]},
    {t:'code',name:'the same thing, in Angular',lang:'ts',tag:{en:'you already use these',ar:'إنت بتستخدمهم أصلاً'},code:[
      "// \"a signal holding an array of Item\"",
      "readonly items = signal<Item[]>([]);",
      "",
      "// \"a required input holding a string\"",
      "readonly name = input.required<string>();",
      "",
      "// \"this GET will return a User\" — so response.name autocompletes",
      "this.http.get<User>('/api/users/1');",
      "",
      "// \"an output that emits a string\" — so $event is typed in the parent",
      "readonly removed = output<string>();",
      "",
      "// often you can omit it, because it is inferred from the argument",
      "readonly count = signal(0);        // TypeScript already knows: number"
    ]},
    {t:'note',label:{en:'Read it out loud',ar:'اقراها بصوت عالي'},
      en:`<code>signal&lt;Item[]&gt;([])</code> reads as “a signal <em>of</em> Item array, starting empty”. Once you hear the word <em>of</em>, generics stop being intimidating.`,
      ar:`<code>signal&lt;Item[]&gt;([])</code> بتتقري «signal <em>بتاعة</em> array من Item، وبتبدأ فاضية». أول ما تسمع كلمة <em>بتاعة</em>، الـ generics بتبطّل تخوّف.`}
  ]
},

/* ---------------------------------------------------------------- */
{
  id:'utility', kicker:{en:'Free shortcuts', ar:'اختصارات ببلاش'},
  title:{en:'Utility types you will reach for', ar:'أنواع جاهزة هتحتاجها'},
  lead:{
    en:`TypeScript ships types that build new shapes out of existing ones. These five cover nearly every real case.`,
    ar:`TypeScript بييجي معاه أنواع بتبني أشكال جديدة من أشكال موجودة. الخمسة دول بيغطوا تقريباً كل حالة حقيقية.`
  },
  blocks:[
    {t:'code',name:'utility-types.ts',lang:'ts',tag:{en:'all five',ar:'الخمسة'},code:[
      "interface User { id: string; name: string; email: string; age: number; }",
      "",
      "// every field optional — the shape of a PATCH request body",
      "type UserPatch = Partial<User>;",
      "// { id?: string; name?: string; email?: string; age?: number }",
      "",
      "// keep only these fields — the shape of a list row",
      "type UserRow = Pick<User, 'id' | 'name'>;",
      "// { id: string; name: string }",
      "",
      "// everything except these — the shape of a create form",
      "type NewUser = Omit<User, 'id'>;",
      "// { name: string; email: string; age: number }",
      "",
      "// nothing can be reassigned",
      "type FrozenUser = Readonly<User>;",
      "",
      "// a dictionary: keys of one type, values of another",
      "type PricesBySku = Record<string, number>;",
      "// { 'sku-1': 100, 'sku-2': 250, … }"
    ]},
    {t:'p',
      en:`These matter because they keep one source of truth. When a field is added to <code>User</code>, every shape derived from it updates automatically — nothing to remember, nothing to forget.`,
      ar:`دي مهمة لإنها بتحافظ على مصدر واحد للحقيقة. لما حقل يتضاف لـ <code>User</code>، كل الأشكال المشتقة منه بتتحدث لوحدها — مفيش حاجة تفتكرها ولا حاجة تنساها.`}
  ]
},

/* ---------------------------------------------------------------- */
{
  id:'narrowing', kicker:{en:'Proving it', ar:'إثبات النوع'},
  title:{en:'Narrowing: convincing the compiler', ar:'التضييق: تقنع الـ compiler'},
  lead:{
    en:`When a value could be several things, TypeScript follows your <code>if</code> statements and works out which one it is inside each branch. This is called narrowing, and it is why you rarely need casts.`,
    ar:`لما القيمة تقدر تكون كذا حاجة، TypeScript بيتابع الـ <code>if</code> بتاعتك ويحدد هي إيه جوه كل فرع. ده اسمه narrowing، وعشان كده نادراً ما تحتاج تعمل cast.`
  },
  blocks:[
    {t:'code',name:'narrowing.ts',lang:'ts',tag:{en:'four ways',ar:'أربع طرق'},code:[
      "function show(value: string | number | null) {",
      "  if (value === null) return '—';",
      "  //  value is string | number from here on",
      "",
      "  if (typeof value === 'number') {",
      "    return value.toFixed(2);      // ✓ it is a number in this branch",
      "  }",
      "",
      "  return value.trim();            // ✓ only string is left",
      "}",
      "",
      "// discriminated union — one shared field decides which shape it is",
      "type Result =",
      "  | { ok: true;  data: User }",
      "  | { ok: false; error: string };",
      "",
      "function handle(r: Result) {",
      "  if (r.ok) return r.data.name;   // ✓ TypeScript knows data exists",
      "  return r.error;                 // ✓ and here, error exists",
      "}"
    ]},
    {t:'note',label:{en:'This is how resource status works',ar:'كده بتشتغل حالة الـ resource'},
      en:`Angular&rsquo;s <code>status()</code> being <code>'idle' | 'loading' | 'resolved' | 'error'</code> is a discriminated union. Checking it in a template with <code>&#64;if</code> narrows it exactly the same way.`,
      ar:`الـ <code>status()</code> في أنجولار لما تكون <code>'idle' | 'loading' | 'resolved' | 'error'</code> دي discriminated union. وفحصها في التمبلت بـ <code>&#64;if</code> بيضيّقها بنفس الطريقة بالظبط.`},
    {t:'pair',
      bad:{name:'casting past the problem',code:[
        "const el = document.querySelector('.chart') as HTMLCanvasElement;",
        "el.getContext('2d');",
        "",
        "// 'as' tells the compiler to trust you. If .chart is missing,",
        "// el is null at runtime and this line throws."
      ]},
      good:{name:'check, then use',code:[
        "const el = document.querySelector('.chart');",
        "",
        "if (el instanceof HTMLCanvasElement) {",
        "  el.getContext('2d');     // ✓ proven, not promised",
        "}"
      ]}}
  ]
},

/* ---------------------------------------------------------------- */
{
  id:'modules', kicker:{en:'Files talking', ar:'الملفات بتتكلم'},
  title:{en:'<code>import</code> and <code>export</code>', ar:'<code>import</code> و <code>export</code>'},
  lead:{
    en:`Every file is its own island. Nothing is shared unless you <code>export</code> it, and nothing arrives unless you <code>import</code> it. Angular files are almost entirely made of these two lines.`,
    ar:`كل ملف جزيرة لوحده. مفيش حاجة بتتشارك غير لما تعمل لها <code>export</code>، ومفيش حاجة بتوصل غير لما تعمل لها <code>import</code>. وملفات أنجولار كلها تقريباً مبنية على السطرين دول.`
  },
  blocks:[
    {t:'code',name:'models/user.ts',lang:'ts',tag:{en:'exporting',ar:'التصدير'},code:[
      "export interface User { id: string; name: string; }",
      "",
      "export function fullName(u: User) { return u.name.trim(); }",
      "",
      "export const MAX_USERS = 100;"
    ]},
    {t:'code',name:'user-list.component.ts',lang:'ts',tag:{en:'importing',ar:'الاستيراد'},code:[
      "// from a package installed in node_modules",
      "import { Component, signal } from '@angular/core';",
      "",
      "// from your own files — a relative path, no .ts extension",
      "import { User, fullName, MAX_USERS } from './models/user';",
      "import { UserCard } from '../shared/user-card.component';",
      "",
      "// rename on the way in, when two names collide",
      "import { User as ApiUser } from './api/types';"
    ]},
    {t:'note',label:{en:'Two names you will see',ar:'اسمين هتشوفهم'},
      en:`<code>&#64;angular/core</code> starts with <code>&#64;</code> because it is a <em>scoped package</em> — an npm naming convention, nothing to do with decorators. And <code>./</code> means “next to this file”, <code>../</code> means “one folder up”.`,
      ar:`<code>&#64;angular/core</code> بيبدأ بـ <code>&#64;</code> لإنه <em>scoped package</em> — ده اصطلاح تسمية في npm، ومالوش دعوة بالـ decorators. و<code>./</code> معناها «جنب الملف ده»، و<code>../</code> معناها «فولدر لفوق».`}
  ]
},

/* ---------------------------------------------------------------- */
{
  id:'decorators', kicker:{en:'The @ symbol', ar:'علامة @'},
  title:{en:'Decorators: what <code>&#64;Component</code> actually is', ar:'الـ Decorators: <code>&#64;Component</code> ده إيه بالظبط'},
  lead:{
    en:`A decorator is a function you attach to a class to add information about it. <code>&#64;Component({...})</code> does not change your class — it records metadata that Angular reads later.`,
    ar:`الـ decorator دالة بتلزقها على كلاس عشان تضيف معلومات عنه. <code>&#64;Component({...})</code> مش بيغيّر الكلاس بتاعك — بيسجّل metadata أنجولار بيقراها بعدين.`
  },
  blocks:[
    {t:'code',name:'what you write vs what it means',lang:'ts',tag:{en:'demystified',ar:'من غير غموض'},code:[
      "@Component({",
      "  selector: 'app-user-card',",
      "  template: '<h3>{{ name() }}</h3>',",
      "})",
      "export class UserCard {",
      "  readonly name = input.required<string>();",
      "}",
      "",
      "// Read it as: \"this is an ordinary class, AND Angular should know",
      "//  it answers to <app-user-card> and renders that template.\"",
      "//",
      "// The object inside the brackets is just an object. That is why",
      "// selector, template and imports are written with : and ,"
    ]},
    {t:'p',
      en:`The four you will meet: <code>&#64;Component</code> on a component, <code>&#64;Directive</code> on a directive, <code>&#64;Injectable</code> on a service, and <code>&#64;Pipe</code> on a pipe. Modern Angular has replaced most of the others — <code>&#64;Input</code> and <code>&#64;Output</code> are now the functions <code>input()</code> and <code>output()</code>.`,
      ar:`الأربعة اللي هتقابلهم: <code>&#64;Component</code> على الـ component، و<code>&#64;Directive</code> على الـ directive، و<code>&#64;Injectable</code> على الـ service، و<code>&#64;Pipe</code> على الـ pipe. وأنجولار الحديث استبدل معظم الباقي — <code>&#64;Input</code> و<code>&#64;Output</code> بقوا الدوال <code>input()</code> و<code>output()</code>.`}
  ]
},

/* ---------------------------------------------------------------- */
{
  id:'angular-types', kicker:{en:'Putting it together', ar:'نجمّعها مع بعض'},
  title:{en:'The same TypeScript, in real Angular files', ar:'نفس الـ TypeScript، في ملفات أنجولار حقيقية'},
  lead:{
    en:`Nothing new here — this is every idea above, in the places you will actually meet them.`,
    ar:`مفيش حاجة جديدة هنا — دي كل الأفكار اللي فوق، في الأماكن اللي هتقابلهم فيها فعلاً.`
  },
  blocks:[
    {t:'code',name:'typed HTTP',lang:'ts',tag:{en:'generic + interface',ar:'generic + interface'},code:[
      "export interface Product { id: string; title: string; price: number; }",
      "",
      "// the generic tells TypeScript what comes back,",
      "// so p.title autocompletes and p.titel is an error",
      "this.http.get<Product[]>('/api/products')",
      "    .subscribe(list => list.forEach(p => console.log(p.title)));"
    ]},
    {t:'code',name:'typed component API',lang:'ts',tag:{en:'generics + unions',ar:'generics + unions'},code:[
      "export class Badge {",
      "  // a literal union: only these four strings are accepted",
      "  readonly kind = input<'info' | 'success' | 'warning' | 'error'>('info');",
      "",
      "  // required, so the compiler forces the caller to pass it",
      "  readonly label = input.required<string>();",
      "",
      "  // the emitted value is typed, so $event is typed in the parent",
      "  readonly dismissed = output<void>();",
      "}"
    ]},
    {t:'code',name:'typed service',lang:'ts',tag:{en:'class + readonly + private',ar:'class + readonly + private'},code:[
      "@Injectable({ providedIn: 'root' })",
      "export class CartStore {",
      "  private readonly _items = signal<Item[]>([]);",
      "  readonly items = this._items.asReadonly();",
      "",
      "  readonly total = computed(() =>",
      "    this._items().reduce((sum, i) => sum + i.price, 0));",
      "",
      "  add(item: Item): void {",
      "    this._items.update(list => [...list, item]);",
      "  }",
      "}"
    ]}
  ]
},

/* ---------------------------------------------------------------- */
{
  id:'errors', kicker:{en:'Survival kit', ar:'شنطة الإسعافات'},
  title:{en:'The six errors you will actually hit', ar:'الست غلطات اللي هتقابلك فعلاً'},
  lead:{
    en:`TypeScript error messages are long but honest. Here is what each of the common ones is really telling you.`,
    ar:`رسايل أخطاء TypeScript طويلة بس صادقة. وده معنى كل واحدة من الشائعة فعلاً.`
  },
  blocks:[
    {t:'tbl',
      head:{en:['The message','What it means','The fix'], ar:['الرسالة','معناها','الحل']},
      rows:[
        {en:["Object is possibly 'undefined'","The value might not be there and you used it anyway","<code>if (x)</code>, or <code>x?.y</code>, or <code>x ?? fallback</code>"],
         ar:["Object is possibly 'undefined'","القيمة ممكن متكونش موجودة وإنت استخدمتها","<code>if (x)</code> أو <code>x?.y</code> أو <code>x ?? بديل</code>"]},
        {en:["Type 'string' is not assignable to type 'number'","You put the wrong kind of value in","Convert it (<code>Number(x)</code>) or fix the declared type"],
         ar:["Type 'string' is not assignable to type 'number'","حطيت نوع قيمة غلط","حوّلها (<code>Number(x)</code>) أو صلّح النوع المعلن"]},
        {en:["Property 'x' does not exist on type 'Y'","A typo, or the interface is missing that field","Check the spelling, then check the interface"],
         ar:["Property 'x' does not exist on type 'Y'","غلطة إملائية، أو الحقل ناقص من الـ interface","راجع الإملاء، وبعدين راجع الـ interface"]},
        {en:["Cannot find module './x' or its type declarations","Wrong path, wrong case, or the file does not exist","Paths are case-sensitive on CI even if not on your Mac"],
         ar:["Cannot find module './x' or its type declarations","مسار غلط، أو حروف كابيتال غلط، أو الملف مش موجود","المسارات حساسة لحالة الحروف على الـ CI حتى لو مش كده على الماك"]},
        {en:["Property 'x' has no initializer and is not definitely assigned","A strict-mode field with no starting value","Give it a value, mark it <code>?</code>, or use <code>input.required()</code>"],
         ar:["Property 'x' has no initializer and is not definitely assigned","حقل في strict mode من غير قيمة بداية","ادّيله قيمة، أو حطله <code>?</code>، أو استعمل <code>input.required()</code>"]},
        {en:["Argument of type 'X' is not assignable to parameter of type 'Y'","You passed the wrong thing into a function","Read the second half of the message — it names the missing field"],
         ar:["Argument of type 'X' is not assignable to parameter of type 'Y'","مرّرت حاجة غلط لدالة","اقرا النص التاني من الرسالة — بيقولك الحقل الناقص إيه"]}
      ]},
    {t:'note',label:{en:'How to read a long error',ar:'إزاي تقرا ايرور طويل'},
      en:`Read the <b>last</b> line first. TypeScript nests its explanation, and the innermost line is the actual mismatch — usually one field name.`,
      ar:`اقرا <b>آخر</b> سطر الأول. TypeScript بيعشّش الشرح، وأعمق سطر هو الاختلاف الحقيقي — وغالباً بيبقى اسم حقل واحد.`}
  ]
},

/* ---------------------------------------------------------------- */
{
  id:'config', kicker:{en:'The settings', ar:'الإعدادات'},
  title:{en:'The <code>tsconfig</code> lines that change your life', ar:'سطور الـ <code>tsconfig</code> اللي بتغيّر حياتك'},
  lead:{
    en:`<code>ng new</code> already sets these correctly. Know what they do so you understand why the compiler behaves the way it does — and so you never turn them off to make an error go away.`,
    ar:`<code>ng new</code> بيظبطهم صح أصلاً. اعرف بيعملوا إيه عشان تفهم الـ compiler بيتصرف كده ليه — وعشان عمرك ما تقفلهم بس عشان ايرور يختفي.`
  },
  blocks:[
    {t:'code',name:'tsconfig.json',lang:'json',tag:{en:'what matters',ar:'المهم'},code:[
      "{",
      "  \"compilerOptions\": {",
      "    \"strict\": true,                     // turns on all the checks below",
      "    \"noImplicitAny\": true,              // an untyped parameter is an error",
      "    \"strictNullChecks\": true,           // null and undefined are real types",
      "    \"noUnusedLocals\": true,             // dead variables are errors",
      "    \"paths\": {",
      "      \"@app/*\": [\"src/app/*\"]           // import from '@app/models/user'",
      "    }",
      "  },",
      "  \"angularCompilerOptions\": {",
      "    \"strictTemplates\": true             // type-checks your HTML too",
      "  }",
      "}"
    ]},
    {t:'note',label:{en:'strictTemplates is the good one',ar:'strictTemplates هي الحلوة'},
      en:`With it on, passing a <code>string</code> to an input declared as <code>number</code> is an error <b>in the HTML file</b>. Your templates get the same safety as your classes. Never turn it off.`,
      ar:`لما تكون مفتوحة، إنك تمرّر <code>string</code> لـ input معلن <code>number</code> بيبقى ايرور <b>في ملف الـ HTML</b>. فالتمبلتس بتاخد نفس الأمان بتاع الكلاسات. عمرك ما تقفلها.`},
    {t:'p',
      en:`If an error is annoying, the answer is almost never to relax the config. Strict mode is the reason a large Angular app stays refactorable — every rule you switch off is a category of bug you agreed to find at runtime instead.`,
      ar:`لو ايرور مضايقك، الحل تقريباً عمره ما بيكون إنك تخفف الإعدادات. الـ strict mode هو السبب إن تطبيق أنجولار الكبير يفضل قابل لإعادة الهيكلة — وكل قاعدة بتقفلها دي نوعية باجات وافقت تكتشفها وقت التشغيل بدل كده.`}
  ]
}

]};
