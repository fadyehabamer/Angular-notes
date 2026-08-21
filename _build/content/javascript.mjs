/* ---------------------------------------------------------------
   The JavaScript you need BEFORE Angular. Same block vocabulary as
   typescript.mjs: p / ul / note / code / pair / tbl.
   --------------------------------------------------------------- */
export default {
title:{en:'JavaScript, the parts Angular is built on', ar:'جافاسكريبت، الأجزاء اللي أنجولار متبني عليها'},
lead:{
  en:`Angular does not replace JavaScript — it is a large JavaScript program that you write more JavaScript inside. Nearly every "Angular is confusing" moment is really a JavaScript gap. This page is that gap, in the order it bites: values, references, arrow functions, copying without mutating, and <b>async</b>. Read it before the TypeScript page.`,
  ar:`أنجولار مش بديل لجافاسكريبت — هو برنامج جافاسكريبت كبير وإنت بتكتب جواه جافاسكريبت كمان. تقريباً كل لحظة «أنجولار ملخبط» هي في الحقيقة نقص في جافاسكريبت. الصفحة دي هي النقص ده، بالترتيب اللي بيعضّ بيه: القيم، والمراجع، والدوال السهمية، والنسخ من غير تعديل، و<b>الـ async</b>. اقراها قبل صفحة TypeScript.`
},
sections:[

{
  id:'why', kicker:{en:'Start here', ar:'ابدأ من هنا'},
  title:{en:'You are already writing JavaScript', ar:'إنت بتكتب جافاسكريبت أصلاً'},
  lead:{
    en:`An Angular component is a JavaScript class. A service is a JavaScript class. A signal is a JavaScript function that returns a value. There is no separate Angular language to learn.`,
    ar:`الـ component في أنجولار هو class جافاسكريبت. والـ service هو class جافاسكريبت. والـ signal هو دالة جافاسكريبت بترجّع قيمة. مفيش لغة تانية اسمها أنجولار تتعلمها.`
  },
  blocks:[
    {t:'code',name:'the same thing, twice',lang:'ts',tag:{en:'look closely',ar:'بص كويس'},code:[
      "// plain JavaScript you already understand",
      "class Cart {",
      "  items = [];",
      "  add(item) { this.items = [...this.items, item]; }",
      "  get total() { return this.items.reduce((s, i) => s + i.price, 0); }",
      "}",
      "",
      "// the Angular version — the SAME class, with a label and a signal",
      "@Injectable({ providedIn: 'root' })",
      "export class CartService {",
      "  items = signal([]);",
      "  add(item) { this.items.update(list => [...list, item]); }",
      "  total = computed(() => this.items().reduce((s, i) => s + i.price, 0));",
      "}"
    ]},
    {t:'p',
      en:`Every idea on the right exists on the left: a class, a field, a method, spread syntax, <code>reduce</code>. Angular added a decorator and swapped a plain array for a signal. <b>If the left side is not comfortable, the right side will never be.</b>`,
      ar:`كل فكرة على اليمين موجودة على الشمال: class، وproperty، وmethod، وspread، و<code>reduce</code>. أنجولار ضاف decorator وبدّل الـ array بـ signal. <b>لو الشمال مش مريح ليك، اليمين عمره ما هيبقى مريح.</b>`},
    {t:'note',label:{en:'How to use this page',ar:'إزاي تستعمل الصفحة دي'},
      en:`Do not memorise it. Read it once, then come back to a section the day something confuses you. Sections <b>04</b> (references), <b>09</b> (copying) and <b>11</b> (async) are the three that cause the most Angular bugs.`,
      ar:`ماتحفظهاش. اقراها مرة، وارجع للقسم اللي يخصك يوم ما حاجة تلخبطك. الأقسام <b>04</b> (المراجع) و<b>09</b> (النسخ) و<b>11</b> (الـ async) هما التلاتة اللي بيسببوا أكتر مشاكل في أنجولار.`}
  ]
},

{
  id:'values', kicker:{en:'The basics', ar:'الأساسيات'},
  title:{en:'let, const, and never var', ar:'let و const، وماتستعملش var'},
  lead:{
    en:`Three ways to make a variable, and you should only ever use two of them.`,
    ar:`تلات طرق تعمل بيهم متغيّر، وإنت المفروض تستعمل اتنين بس منهم.`
  },
  blocks:[
    {t:'code',name:'scope.js',lang:'ts',tag:{en:'the rule',ar:'القاعدة'},code:[
      "const name = 'Mona';     // cannot be reassigned. Use this by default.",
      "let count = 0;           // can be reassigned. Use when it must change.",
      "var old = 'avoid';       // legacy. Ignores block scope. Never write it.",
      "",
      "count = 1;               // fine",
      "// name = 'Ali';         // TypeError: Assignment to constant variable",
      "",
      "// const protects the BINDING, not the contents:",
      "const user = { name: 'Mona' };",
      "user.name = 'Ali';       // allowed — the object itself is still mutable",
      "// user = {};            // not allowed — you cannot repoint the name",
      "",
      "// block scope: a variable lives inside its { }",
      "if (true) { let inside = 1; }",
      "// console.log(inside);  // ReferenceError — it never escaped the braces"
    ]},
    {t:'p',
      en:`<code>const</code> is the default in Angular code. You will see it on every <code>inject()</code>, every signal, every service field. Reach for <code>let</code> only when a value genuinely changes in place — a loop counter, an accumulator.`,
      ar:`<code>const</code> هو الافتراضي في كود أنجولار. هتلاقيه في كل <code>inject()</code>، وكل signal، وكل property في service. وماتستعملش <code>let</code> غير لما القيمة فعلاً بتتغيّر — عدّاد لوب أو مجمّع.`},
    {t:'note',label:{en:'The const trap',ar:'فخ الـ const'},
      en:`<code>const items = []</code> then <code>items.push(x)</code> works. That surprises beginners, and in Angular it is worse than surprising — mutating an array in place is exactly what stops the screen updating. Section <b>09</b> is about this.`,
      ar:`<code>const items = []</code> وبعدين <code>items.push(x)</code> بتشتغل. ده بيفاجئ المبتدئين، وفي أنجولار المشكلة أكبر — تعديل الـ array في مكانه هو بالظبط اللي بيمنع الشاشة إنها تتحدّث. القسم <b>09</b> عن ده.`}
  ]
},

{
  id:'types', kicker:{en:'The basics', ar:'الأساسيات'},
  title:{en:'Values, truthiness, and === ', ar:'القيم، والصح والغلط، و==='},
  lead:{
    en:`JavaScript has seven kinds of simple value and one kind of everything-else. And it has two equality operators, one of which you should never use.`,
    ar:`جافاسكريبت فيها سبع أنواع قيم بسيطة، ونوع واحد لكل حاجة تانية. وفيها معاملين مساواة، واحد فيهم ماينفعش تستعمله.`
  },
  blocks:[
    {t:'code',name:'values.js',lang:'ts',tag:{en:'what exists',ar:'اللي موجود'},code:[
      "// primitives — copied by VALUE",
      "'text'        // string",
      "42            // number  (there is no int/float, just number)",
      "true          // boolean",
      "null          // 'deliberately empty'",
      "undefined     // 'never given a value'",
      "Symbol()      // rare",
      "10n           // bigint, rare",
      "",
      "// everything else is an object — copied by REFERENCE",
      "{ name: 'Mona' }   // object",
      "[1, 2, 3]          // array (an object)",
      "() => {}           // function (an object)",
      "new Date()         // date (an object)"
    ]},
    {t:'code',name:'truthy.js',lang:'ts',tag:{en:'the falsy eight',ar:'التمنية الغلط'},code:[
      "// these EIGHT values are falsy. Everything else is truthy.",
      "if (false)     {}",
      "if (0)         {}",
      "if (-0)        {}",
      "if (0n)        {}",
      "if ('')        {}   // empty string",
      "if (null)      {}",
      "if (undefined) {}",
      "if (NaN)       {}",
      "",
      "// so these are ALL truthy, which catches people out:",
      "if ([])        {}   // empty array  -> runs!",
      "if ({})        {}   // empty object -> runs!",
      "if ('0')       {}   // string zero  -> runs!",
      "",
      "// to test an empty array, test its length",
      "if (items.length === 0) {}"
    ]},
    {t:'pair',
      bad:{name:'== coerces',code:[
        "0 == '';          // true   (!)",
        "0 == '0';         // true   (!)",
        "'' == '0';        // false  (!!)",
        "null == undefined;// true",
        "[] == false;      // true   (!)",
        "// the rules are real, and nobody remembers them"
      ]},
      good:{name:'=== compares',code:[
        "0 === '';          // false",
        "0 === '0';         // false",
        "null === undefined;// false",
        "",
        "// the one useful exception:",
        "if (value == null) {}",
        "// true for null AND undefined, which is often what you mean"
      ]}},
    {t:'note',label:{en:'In an Angular template',ar:'في template أنجولار'},
      en:`<code>&#64;if (user)</code> is a truthiness test. If <code>user</code> is <code>0</code> or <code>''</code> the block does not render, which is almost never what you meant. Write <code>&#64;if (user !== null)</code> when you mean "exists".`,
      ar:`<code>&#64;if (user)</code> دي اختبار truthiness. لو <code>user</code> كانت <code>0</code> أو <code>''</code> البلوك مش هيترسم، وده تقريباً مش اللي إنت قصدك. اكتب <code>&#64;if (user !== null)</code> لما تقصد «موجود».`}
  ]
},

{
  id:'refs', kicker:{en:'The one that causes bugs', ar:'اللي بيسبب المشاكل'},
  title:{en:'Objects and arrays are references', ar:'الـ objects والـ arrays مراجع'},
  lead:{
    en:`This is the single most important section on the page. Primitives are copied. Objects are <b>not</b> — you copy the address, not the thing.`,
    ar:`ده أهم قسم في الصفحة كلها. القيم البسيطة بتتنسخ. والـ objects <b>لأ</b> — إنت بتنسخ العنوان، مش الحاجة نفسها.`
  },
  blocks:[
    {t:'code',name:'references.js',lang:'ts',tag:{en:'the whole problem',ar:'المشكلة كلها'},code:[
      "// primitives: a real copy",
      "let a = 1;",
      "let b = a;",
      "b = 2;",
      "console.log(a);        // 1  — untouched",
      "",
      "// objects: the SAME object, two names",
      "const user1 = { name: 'Mona' };",
      "const user2 = user1;              // NOT a copy — same address",
      "user2.name = 'Ali';",
      "console.log(user1.name);          // 'Ali'  — you changed both",
      "",
      "// arrays are objects, so the same thing happens",
      "const listA = [1, 2];",
      "const listB = listA;",
      "listB.push(3);",
      "console.log(listA);               // [1, 2, 3]",
      "",
      "// and identity is by address, not by contents",
      "{ id: 1 } === { id: 1 };          // false — two different objects",
      "[1, 2]   === [1, 2];              // false"
    ]},
    {t:'p',
      en:`Angular leans on that last line. Change detection asks <b>is this the same object as last time?</b> — using <code>===</code>. If you mutate an object in place, the answer is still "yes, same object", so Angular concludes nothing changed and the screen does not update.`,
      ar:`أنجولار بيعتمد على السطر الأخير ده. الـ change detection بيسأل <b>ده نفس الـ object بتاع المرة اللي فاتت؟</b> — باستخدام <code>===</code>. لو عدّلت الـ object في مكانه، الإجابة هتفضل «أيوة نفسه»، فأنجولار بيستنتج إن مفيش حاجة اتغيّرت والشاشة مابتتحدّثش.`},
    {t:'note',label:{en:'Remember this sentence',ar:'احفظ الجملة دي'},
      en:`<b>Assigning an object does not copy it.</b> Every "I changed the data but the screen did not update" bug in Angular starts here.`,
      ar:`<b>إنك تسند object مش معناه إنك نسخته.</b> كل مشكلة «غيّرت الداتا والشاشة ماتغيرتش» في أنجولار بتبدأ من هنا.`}
  ]
},

{
  id:'functions', kicker:{en:'Everyday syntax', ar:'صيغة يومية'},
  title:{en:'Arrow functions, and what <code>this</code> means', ar:'الدوال السهمية، ومعنى <code>this</code>'},
  lead:{
    en:`You will write arrow functions hundreds of times a day. The important part is not the shorter syntax — it is that they do not bring their own <code>this</code>.`,
    ar:`هتكتب دوال سهمية مئات المرات في اليوم. والمهم مش إنها أقصر — المهم إنها مابتجيبش <code>this</code> خاص بيها.`
  },
  blocks:[
    {t:'code',name:'arrows.js',lang:'ts',tag:{en:'four ways, one meaning',ar:'أربع صيغ بمعنى واحد'},code:[
      "function double(n) { return n * 2; }        // declaration",
      "const double = function (n) { return n * 2; };  // expression",
      "const double = (n) => { return n * 2; };    // arrow, with a body",
      "const double = n => n * 2;                  // arrow, implicit return",
      "",
      "// returning an object needs parentheses, or JS reads { } as a body",
      "const wrap = n => ({ value: n });",
      "",
      "// functions are values: pass them around like any other",
      "[1, 2, 3].map(double);          // [2, 4, 6]",
      "setTimeout(() => save(), 500);"
    ]},
    {t:'pair',
      bad:{name:'function loses this',code:[
        "class Cart {",
        "  total = 0;",
        "  start() {",
        "    setTimeout(function () {",
        "      this.total = 5;   // 'this' is NOT the Cart",
        "    }, 100);            // undefined, or the window",
        "  }",
        "}"
      ]},
      good:{name:'arrow keeps this',code:[
        "class Cart {",
        "  total = 0;",
        "  start() {",
        "    setTimeout(() => {",
        "      this.total = 5;   // 'this' is still the Cart",
        "    }, 100);            // arrows inherit it",
        "  }",
        "}"
      ]}},
    {t:'p',
      en:`A regular <code>function</code> decides <code>this</code> by <b>how it is called</b>. An arrow function decides it by <b>where it is written</b>. Inside a class — which is every Angular component and service — you almost always want the second.`,
      ar:`الدالة العادية بتحدّد <code>this</code> حسب <b>طريقة نداءها</b>. والدالة السهمية بتحدّده حسب <b>مكان كتابتها</b>. وجوه class — وده كل component وservice في أنجولار — إنت تقريباً دايماً عايز التانية.`},
    {t:'note',label:{en:'The practical rule',ar:'القاعدة العملية'},
      en:`Inside a class, use arrow functions for every callback: <code>subscribe(...)</code>, <code>setTimeout(...)</code>, <code>map(...)</code>, <code>addEventListener(...)</code>. Use <code>function</code> only for standalone top-level helpers.`,
      ar:`جوه أي class، استعمل دوال سهمية في كل callback: <code>subscribe(...)</code> و<code>setTimeout(...)</code> و<code>map(...)</code> و<code>addEventListener(...)</code>. وماتستعملش <code>function</code> غير في دوال مساعدة مستقلة برة.`}
  ]
},

{
  id:'destructuring', kicker:{en:'Everyday syntax', ar:'صيغة يومية'},
  title:{en:'Destructuring, spread and rest', ar:'التفكيك، والنشر، والباقي'},
  lead:{
    en:`Three uses of the same two symbols. They are everywhere in Angular code, so they must read as fast as a full stop.`,
    ar:`تلات استخدامات لنفس الرمزين. موجودين في كل حتة في كود أنجولار، فلازم تقراهم بسرعة النقطة.`
  },
  blocks:[
    {t:'code',name:'destructure.js',lang:'ts',tag:{en:'pulling apart',ar:'التفكيك'},code:[
      "const user = { name: 'Mona', age: 30, city: 'Cairo' };",
      "",
      "const { name, age } = user;          // two variables, one line",
      "const { city: town } = user;         // rename while unpacking",
      "const { country = 'EG' } = user;     // default when the key is missing",
      "",
      "const [first, second] = [10, 20];    // arrays destructure by position",
      "const [, third] = [1, 2, 3];         // skip one with a bare comma",
      "",
      "// straight in a parameter list — very common in Angular",
      "function greet({ name }) { return 'Hi ' + name; }",
      "items.map(({ id, price }) => id + ':' + price);"
    ]},
    {t:'code',name:'spread-rest.js',lang:'ts',tag:{en:'the same dots, both ways',ar:'نفس النقط في الاتجاهين'},code:[
      "// SPREAD — unpack into a new thing (this is how you copy)",
      "const copy    = { ...user };                 // shallow copy of an object",
      "const older   = { ...user, age: 31 };        // copy, with one field changed",
      "const listCopy= [...items];                  // shallow copy of an array",
      "const appended= [...items, newItem];         // copy plus one at the end",
      "const merged  = [...listA, ...listB];        // two into one",
      "",
      "// REST — collect the leftovers (looks identical, opposite job)",
      "const { name, ...everythingElse } = user;",
      "const [head, ...tail] = [1, 2, 3];           // head = 1, tail = [2, 3]",
      "",
      "function sum(...numbers) {                   // any number of arguments",
      "  return numbers.reduce((a, b) => a + b, 0);",
      "}"
    ]},
    {t:'note',label:{en:'How to tell them apart',ar:'إزاي تفرّق بينهم'},
      en:`Dots on the <b>right</b> of the <code>=</code>, or inside a new <code>[ ]</code> / <code>{ }</code>, means <b>spread</b> — unpacking. Dots on the <b>left</b>, or in a parameter list, means <b>rest</b> — collecting.`,
      ar:`النقط على <b>يمين</b> الـ <code>=</code>، أو جوه <code>[ ]</code> أو <code>{ }</code> جديدة، معناها <b>spread</b> — تفكيك. والنقط على <b>الشمال</b>، أو في قايمة المعاملات، معناها <b>rest</b> — تجميع.`}
  ]
},

{
  id:'arrays', kicker:{en:'The daily tools', ar:'أدوات يومية'},
  title:{en:'The array methods you will use every day', ar:'ميثودز الـ array اللي هتستعملها كل يوم'},
  lead:{
    en:`Roughly eight of these cover nearly all list work in an Angular app. Learn which ones return a new array and which ones change the original — that distinction is the whole game.`,
    ar:`حوالي تمنية منهم بيغطوا تقريباً كل شغل القوايم في أنجولار. المهم تعرف مين بيرجّع array جديدة ومين بيغيّر الأصلية — الفرق ده هو اللعبة كلها.`
  },
  blocks:[
    {t:'code',name:'array-methods.js',lang:'ts',tag:{en:'safe: return a new array',ar:'آمنة: بترجّع array جديدة'},code:[
      "const items = [{ id: 1, price: 10 }, { id: 2, price: 20 }];",
      "",
      "items.map(i => i.price);                // [10, 20]  transform each",
      "items.filter(i => i.price > 15);        // [{id:2..}] keep some",
      "items.reduce((sum, i) => sum + i.price, 0);   // 30  fold to one value",
      "",
      "items.find(i => i.id === 2);            // the item, or undefined",
      "items.findIndex(i => i.id === 2);       // 1, or -1",
      "items.some(i => i.price > 15);          // true  — any?",
      "items.every(i => i.price > 5);          // true  — all?",
      "items.includes(x);                      // true/false, by ===",
      "",
      "items.slice(0, 2);                      // a copy of part of it",
      "[...items].sort((a, b) => a.price - b.price);  // sort a COPY"
    ]},
    {t:'code',name:'mutating.js',lang:'ts',tag:{en:'these change the original',ar:'دول بيغيّروا الأصلية'},code:[
      "const list = [3, 1, 2];",
      "",
      "list.push(4);        // adds at the end     -> list changed",
      "list.pop();          // removes from end    -> list changed",
      "list.shift();        // removes from front  -> list changed",
      "list.unshift(0);     // adds at the front   -> list changed",
      "list.splice(1, 1);   // cuts a piece out    -> list changed",
      "list.sort();         // sorts IN PLACE      -> list changed",
      "list.reverse();      // reverses IN PLACE   -> list changed",
      "",
      "// in Angular these are the dangerous eight. See section 09."
    ]},
    {t:'tbl',
      head:{en:['You want','Reach for','Returns'], ar:['إنت عايز','استعمل','بترجّع']},
      rows:[
        {en:['Change every item','<code>map</code>','a new array'], ar:['تغيّر كل عنصر','<code>map</code>','array جديدة']},
        {en:['Keep some items','<code>filter</code>','a new array'], ar:['تسيب بعض العناصر','<code>filter</code>','array جديدة']},
        {en:['One value from many','<code>reduce</code>','one value'], ar:['قيمة واحدة من كتير','<code>reduce</code>','قيمة واحدة']},
        {en:['One matching item','<code>find</code>','the item or <code>undefined</code>'], ar:['عنصر واحد مطابق','<code>find</code>','العنصر أو <code>undefined</code>']},
        {en:['A yes/no answer','<code>some</code> / <code>every</code>','a boolean'], ar:['إجابة أيوة/لأ','<code>some</code> / <code>every</code>','boolean']},
        {en:['Add an item (in Angular)','<code>[...list, item]</code>','a new array'], ar:['تضيف عنصر (في أنجولار)','<code>[...list, item]</code>','array جديدة']},
        {en:['Remove an item (in Angular)','<code>list.filter(...)</code>','a new array'], ar:['تشيل عنصر (في أنجولار)','<code>list.filter(...)</code>','array جديدة']},
      ]},
    {t:'note',label:{en:'reduce, in one sentence',ar:'reduce، في جملة واحدة'},
      en:`<code>reduce</code> walks the list carrying a running total. The first argument is <em>(what I have so far, the current item)</em>, and the second argument is <b>where the total starts</b>. Forgetting that starting value is the usual bug.`,
      ar:`<code>reduce</code> بتمشي على اللستة شايلة مجموع جاري. أول معامل هو <em>(اللي معايا لحد دلوقتي، العنصر الحالي)</em>، وتاني معامل هو <b>المجموع بيبدأ من كام</b>. ونسيان القيمة الابتدائية دي هي الغلطة المعتادة.`}
  ]
},

{
  id:'safe-access', kicker:{en:'The daily tools', ar:'أدوات يومية'},
  title:{en:'?. and ?? — reaching into things that may not be there', ar:'?. و ?? — الوصول لحاجات ممكن ماتكونش موجودة'},
  lead:{
    en:`Two small operators that remove most <code>Cannot read properties of undefined</code> crashes.`,
    ar:`معاملين صغيرين بيشيلوا أغلب أخطاء <code>Cannot read properties of undefined</code>.`
  },
  blocks:[
    {t:'code',name:'optional.js',lang:'ts',tag:{en:'stop at the first gap',ar:'وقف عند أول فراغ'},code:[
      "const user = { profile: { city: 'Cairo' } };",
      "",
      "user.address.city;      // TypeError — crashes the whole render",
      "user.address?.city;     // undefined — stops safely, no crash",
      "",
      "user.profile?.city;                 // 'Cairo'",
      "user.friends?.[0];                  // safe array index",
      "user.save?.();                      // call it only if it exists",
      "",
      "// ?? uses the fallback ONLY for null / undefined",
      "const nick = user.nick ?? 'guest';",
      "",
      "// || uses the fallback for ANY falsy value — including 0 and ''",
      "const qty  = order.qty || 1;        // BUG: 0 becomes 1",
      "const qty2 = order.qty ?? 1;        // correct: 0 stays 0"
    ]},
    {t:'p',
      en:`In Angular you will see <code>?.</code> constantly in templates, because data arrives from the server <em>after</em> the template first renders. For that first render, the object genuinely is <code>undefined</code>.`,
      ar:`في أنجولار هتشوف <code>?.</code> كتير جداً في الـ templates، لأن الداتا بتوصل من السيرفر <em>بعد</em> ما الـ template يترسم أول مرة. وفي الرسمة الأولى دي، الـ object فعلاً بيكون <code>undefined</code>.`},
    {t:'note',label:{en:'?? beats || — always',ar:'?? أحسن من || — دايماً'},
      en:`Prices, quantities, counts and search strings are all legitimately <code>0</code> or <code>''</code>. Using <code>||</code> for their defaults silently replaces real values. Default to <code>??</code>.`,
      ar:`الأسعار والكميات والأعداد ونصوص البحث ممكن تكون <code>0</code> أو <code>''</code> بشكل صحيح. استخدام <code>||</code> للقيم الافتراضية بيستبدل قيم حقيقية من غير ما تحس. خلي <code>??</code> هي الافتراضي.`}
  ]
},

{
  id:'immutability', kicker:{en:'The Angular-critical one', ar:'الأهم لأنجولار'},
  title:{en:'Changing data without mutating it', ar:'تغيير الداتا من غير ما تعدّلها في مكانها'},
  lead:{
    en:`Angular decides whether to redraw by comparing references. So the rule is: <b>never edit in place — build a new value and assign it.</b> This one habit prevents more Angular bugs than anything else on this page.`,
    ar:`أنجولار بيقرر يعيد الرسم ولا لأ بمقارنة المراجع. فالقاعدة: <b>ماتعدّلش في المكان — ابني قيمة جديدة وأسندها.</b> العادة دي لوحدها بتمنع مشاكل في أنجولار أكتر من أي حاجة تانية في الصفحة.`
  },
  blocks:[
    {t:'pair',
      bad:{name:'mutating — screen freezes',code:[
        "// arrays",
        "this.items.push(item);",
        "this.items.splice(i, 1);",
        "this.items.sort();",
        "",
        "// objects",
        "this.user.name = 'Ali';",
        "",
        "// signals",
        "this.items().push(item);   // worst of all",
        "// same reference every time -> Angular",
        "// sees no change -> nothing redraws"
      ]},
      good:{name:'replacing — screen updates',code:[
        "// arrays",
        "this.items = [...this.items, item];",
        "this.items = this.items.filter(x => x.id !== id);",
        "this.items = [...this.items].sort(byName);",
        "",
        "// objects",
        "this.user = { ...this.user, name: 'Ali' };",
        "",
        "// signals",
        "this.items.update(l => [...l, item]);",
        "// new reference every time -> Angular",
        "// sees the change -> redraws"
      ]}},
    {t:'code',name:'recipes.js',lang:'ts',tag:{en:'the five you need',ar:'الخمسة اللي محتاجهم'},code:[
      "// 1. add to the end",
      "const added = [...items, newItem];",
      "",
      "// 2. remove by id",
      "const removed = items.filter(i => i.id !== id);",
      "",
      "// 3. update one item, leave the rest alone",
      "const updated = items.map(i => i.id === id ? { ...i, done: true } : i);",
      "",
      "// 4. change one field on an object",
      "const next = { ...user, name: 'Ali' };",
      "",
      "// 5. change something nested — spread at EVERY level you touch",
      "const deep = { ...user, address: { ...user.address, city: 'Giza' } };"
    ]},
    {t:'note',label:{en:'Spread is shallow',ar:'الـ spread سطحي'},
      en:`<code>{ ...user }</code> copies the top level only. Nested objects are still shared with the original. That is why recipe 5 spreads at every level. For a genuine deep copy use <code>structuredClone(user)</code> — and <code>JSON.parse(JSON.stringify(x))</code> is the old trick that silently destroys <code>Date</code>, <code>Map</code> and <code>undefined</code>.`,
      ar:`<code>{ ...user }</code> بتنسخ المستوى الأول بس. والـ objects المتداخلة بتفضل مشتركة مع الأصل. وعشان كده الوصفة 5 بتعمل spread في كل مستوى. ولو عايز نسخة عميقة حقيقية استعمل <code>structuredClone(user)</code> — و<code>JSON.parse(JSON.stringify(x))</code> هي الحيلة القديمة اللي بتدمّر <code>Date</code> و<code>Map</code> و<code>undefined</code> من غير ما تقول.`}
  ]
},

{
  id:'modules', kicker:{en:'File structure', ar:'تنظيم الملفات'},
  title:{en:'import and export', ar:'import و export'},
  lead:{
    en:`Every Angular file is a module. Nothing is global; if you want something from another file, you say so at the top.`,
    ar:`كل ملف أنجولار هو module. مفيش حاجة عامة؛ لو عايز حاجة من ملف تاني، بتقول كده في أول الملف.`
  },
  blocks:[
    {t:'code',name:'modules.js',lang:'ts',tag:{en:'named vs default',ar:'مسمّى مقابل افتراضي'},code:[
      "// cart.service.ts — named exports (what Angular uses)",
      "export class CartService {}",
      "export const TAX = 0.14;",
      "export function format(n) { return n.toFixed(2); }",
      "",
      "// somewhere else — the names must match exactly, braces required",
      "import { CartService, TAX } from './cart.service';",
      "import { CartService as Cart } from './cart.service';   // rename",
      "",
      "// default export — at most one per file, name is yours to pick",
      "export default class Thing {}",
      "import AnythingIWant from './thing';                    // no braces",
      "",
      "// from a package instead of a path",
      "import { Component, signal } from '@angular/core';"
    ]},
    {t:'note',label:{en:'The error you will hit',ar:'الغلطة اللي هتقابلك'},
      en:`<code>has no exported member 'X'</code> almost always means a typo or a missing <code>export</code> keyword — not a broken install. And a path starting <code>./</code> is <em>your</em> file; no dot means a package in <code>node_modules</code>.`,
      ar:`رسالة <code>has no exported member 'X'</code> تقريباً دايماً معناها غلطة إملائية أو <code>export</code> ناقصة — مش تسطيب باظ. والمسار اللي بيبدأ بـ <code>./</code> ده ملف <em>بتاعك</em>؛ ولو مفيش نقطة يبقى package في <code>node_modules</code>.`}
  ]
},

{
  id:'async', kicker:{en:'The hard one', ar:'الجزء الصعب'},
  title:{en:'Promises and async / await', ar:'الـ Promises و async / await'},
  lead:{
    en:`Anything that takes time — a network call, a file, a timer — does not return a value. It returns a <b>promise of a value later</b>, and your code keeps running in the meantime.`,
    ar:`أي حاجة بتاخد وقت — نداء شبكة، أو ملف، أو تايمر — مابترجعش قيمة. بترجّع <b>وعد بقيمة بعدين</b>، وكودك بيكمّل شغل في الوقت ده.`
  },
  blocks:[
    {t:'code',name:'promises.js',lang:'ts',tag:{en:'three shapes of the same thing',ar:'تلات أشكال لنفس الحاجة'},code:[
      "// 1. callback — the old way. Nesting gets ugly fast.",
      "getUser(id, (user) => {",
      "  getOrders(user, (orders) => {",
      "    render(orders);",
      "  });",
      "});",
      "",
      "// 2. promise — flat, chainable",
      "getUser(id)",
      "  .then(user => getOrders(user))",
      "  .then(orders => render(orders))",
      "  .catch(err => show(err))",
      "  .finally(() => stopSpinner());",
      "",
      "// 3. async / await — the same promise, written like normal code",
      "async function load(id) {",
      "  try {",
      "    const user   = await getUser(id);",
      "    const orders = await getOrders(user);",
      "    render(orders);",
      "  } catch (err) {",
      "    show(err);",
      "  } finally {",
      "    stopSpinner();",
      "  }",
      "}"
    ]},
    {t:'code',name:'gotchas.js',lang:'ts',tag:{en:'the three that catch everyone',ar:'التلاتة اللي بيقعوا الكل'},code:[
      "// 1. an async function ALWAYS returns a promise",
      "async function five() { return 5; }",
      "const x = five();          // Promise, not 5",
      "const y = await five();    // 5",
      "",
      "// 2. await inside a loop runs them one after another — slowly",
      "for (const id of ids) { await load(id); }        // serial",
      "await Promise.all(ids.map(id => load(id)));      // parallel",
      "",
      "// 3. forgetting await swallows the error silently",
      "save();          // if it rejects, nothing catches it",
      "await save();    // now try/catch can see it"
    ]},
    {t:'note',label:{en:'How this meets Angular',ar:'علاقة ده بأنجولار'},
      en:`Angular mostly hands you <b>Observables</b> rather than promises — an Observable is a stream that can emit many times, a promise resolves once. The mental model transfers: <em>the value is not here yet, so give me a place to put it when it arrives.</em>`,
      ar:`أنجولار في الغالب بيديك <b>Observables</b> مش promises — الـ Observable مجرى ممكن يطلق قيم كتير، والـ promise بتحل مرة واحدة. بس نفس طريقة التفكير: <em>القيمة لسه مجاتش، فادّيني مكان أحطها فيه لما توصل.</em>`}
  ]
},

{
  id:'eventloop', kicker:{en:'The hard one', ar:'الجزء الصعب'},
  title:{en:'Why your logs print in the wrong order', ar:'ليه الـ logs بتطبع بترتيب غلط'},
  lead:{
    en:`JavaScript runs one thing at a time. Anything asynchronous is put in a queue and picked up only when the current work is completely finished.`,
    ar:`جافاسكريبت بتشغّل حاجة واحدة في المرة. وأي حاجة غير متزامنة بتتحط في طابور وبتتاخد بس لما الشغل الحالي يخلص تماماً.`
  },
  blocks:[
    {t:'code',name:'order.js',lang:'ts',tag:{en:'guess, then read',ar:'خمّن، وبعدين اقرا'},code:[
      "console.log('1');",
      "setTimeout(() => console.log('2'), 0);",
      "Promise.resolve().then(() => console.log('3'));",
      "console.log('4');",
      "",
      "// prints: 1, 4, 3, 2",
      "//",
      "// 1 and 4  — synchronous, run immediately, in order",
      "// 3        — a microtask; runs as soon as the sync code finishes",
      "// 2        — a macrotask; runs after ALL microtasks, even with 0ms"
    ]},
    {t:'ul',
      en:['<b>Synchronous code</b> runs first, top to bottom, without interruption.',
          '<b>Microtasks</b> (promise callbacks, <code>await</code> resumptions) run next — all of them.',
          '<b>Macrotasks</b> (<code>setTimeout</code>, events, network callbacks) run after that, one per turn.',
          '<code>setTimeout(fn, 0)</code> does not mean "now". It means "after everything currently queued".'],
      ar:['<b>الكود المتزامن</b> بيشتغل الأول، من فوق لتحت، من غير مقاطعة.',
          '<b>الـ microtasks</b> (callbacks الـ promise واستكمال الـ <code>await</code>) بتيجي بعده — كلهم.',
          '<b>الـ macrotasks</b> (<code>setTimeout</code> والأحداث وردود الشبكة) بتيجي بعد كده، واحدة في كل دورة.',
          '<code>setTimeout(fn, 0)</code> مش معناها «دلوقتي». معناها «بعد كل اللي في الطابور».']},
    {t:'note',label:{en:'Where this shows up in Angular',ar:'ده بيظهر فين في أنجولار'},
      en:`Reading a DOM element right after changing a signal gives you the <em>old</em> DOM — Angular has not redrawn yet. That is why measuring belongs in <code>afterNextRender</code> or a <code>setTimeout</code>, not on the line after the change.`,
      ar:`لما تقرا عنصر DOM بعد ما تغيّر signal على طول، بتاخد الـ DOM <em>القديم</em> — أنجولار لسه ماعادش الرسم. وعشان كده القياس بيتعمل في <code>afterNextRender</code> أو <code>setTimeout</code>، مش في السطر اللي بعد التغيير.`}
  ]
},

{
  id:'classes', kicker:{en:'Structure', ar:'البنية'},
  title:{en:'Classes, the way Angular uses them', ar:'الـ classes، بالطريقة اللي أنجولار بيستعملها بيها'},
  lead:{
    en:`Every component, service, directive, pipe and guard is a class. You need the same five features every time.`,
    ar:`كل component وservice وdirective وpipe وguard هو class. وهتحتاج نفس الخمس خصايص في كل مرة.`
  },
  blocks:[
    {t:'code',name:'classes.js',lang:'ts',tag:{en:'the five you need',ar:'الخمسة اللي محتاجهم'},code:[
      "class Cart {",
      "  // 1. fields — initialised before the constructor body runs",
      "  items = [];",
      "  #secret = 'private';        // # means truly private",
      "",
      "  // 2. constructor — runs once, when you write `new Cart()`",
      "  constructor(taxRate = 0.14) {",
      "    this.taxRate = taxRate;",
      "  }",
      "",
      "  // 3. methods",
      "  add(item) { this.items = [...this.items, item]; }",
      "",
      "  // 4. getters — read like a property, computed on access",
      "  get total() { return this.items.reduce((s, i) => s + i.price, 0); }",
      "",
      "  // 5. static — belongs to the class, not to an instance",
      "  static empty() { return new Cart(); }",
      "}",
      "",
      "const cart = new Cart();",
      "cart.add({ price: 10 });",
      "cart.total;                  // 10  — no parentheses, it is a getter"
    ]},
    {t:'note',label:{en:'You will rarely write new',ar:'نادراً هتكتب new'},
      en:`Angular constructs your services for you through dependency injection, so <code>new CartService()</code> almost never appears in application code. You still need to understand <code>this</code>, fields and getters — you write those constantly.`,
      ar:`أنجولار بيعمل الـ services بدالك عن طريق الـ dependency injection، فـ <code>new CartService()</code> تقريباً مش بتظهر في كود التطبيق. بس لسه محتاج تفهم <code>this</code> والـ fields والـ getters — دول بتكتبهم على طول.`}
  ]
},

{
  id:'closures', kicker:{en:'Structure', ar:'البنية'},
  title:{en:'Closures — why callbacks remember things', ar:'الـ Closures — ليه الـ callbacks بتفتكر'},
  lead:{
    en:`A function written inside another function keeps access to that outer function's variables, even long after the outer one has returned. That is a closure, and it is how nearly every callback you write actually works.`,
    ar:`الدالة المكتوبة جوه دالة تانية بتفضل شايفة متغيرات الدالة البرّانية، حتى بعد ما البرّانية تخلص بزمان. دي الـ closure، وهي إزاي تقريباً كل callback بتكتبه بيشتغل فعلاً.`
  },
  blocks:[
    {t:'code',name:'closure.js',lang:'ts',tag:{en:'the whole idea',ar:'الفكرة كلها'},code:[
      "function counter() {",
      "  let count = 0;                 // lives on, because...",
      "  return () => ++count;          // ...this function still points at it",
      "}",
      "",
      "const next = counter();",
      "next();   // 1",
      "next();   // 2      — count survived, and is unreachable any other way",
      "",
      "const other = counter();",
      "other();  // 1      — a separate call, a separate count",
      "",
      "// this is why callbacks see variables from where they were WRITTEN",
      "function watch(label) {",
      "  setTimeout(() => console.log(label), 1000);   // label still here",
      "}"
    ]},
    {t:'note',label:{en:'This is what a signal is',ar:'ده بالظبط إيه الـ signal'},
      en:`<code>signal(0)</code> returns a function that closes over a hidden value, plus <code>set</code> and <code>update</code> that change it. Once closures make sense, signals stop looking like magic and start looking like ten lines of ordinary JavaScript.`,
      ar:`<code>signal(0)</code> بترجّع دالة قافلة على قيمة مخفية، ومعاها <code>set</code> و<code>update</code> بيغيّروها. أول ما الـ closures تبقى مفهومة، الـ signals هتبطل تبان سحر وتبان عشر سطور جافاسكريبت عادية.`}
  ]
},

{
  id:'errors', kicker:{en:'Reality', ar:'الواقع'},
  title:{en:'Errors, and where they go', ar:'الأخطاء، وبتروح فين'},
  lead:{
    en:`An uncaught error stops the current call stack dead. In a component that usually means half a screen renders and the rest silently does not.`,
    ar:`الخطأ اللي مامتمسكش بيوقف سلسلة النداءات الحالية فوراً. وفي الـ component ده غالباً معناه إن نص الشاشة بيترسم والباقي لأ من غير أي رسالة.`
  },
  blocks:[
    {t:'code',name:'errors.js',lang:'ts',tag:{en:'catching, and missing',ar:'المسك، والتفويت'},code:[
      "try {",
      "  risky();",
      "} catch (err) {",
      "  console.error(err.message);   // err is unknown until you check it",
      "} finally {",
      "  cleanup();                    // runs either way",
      "}",
      "",
      "throw new Error('Cart is empty');   // always throw an Error object",
      "",
      "// try/catch does NOT catch an error thrown later, in a callback",
      "try {",
      "  setTimeout(() => { throw new Error('boom'); }, 0);",
      "} catch (e) {",
      "  // never runs — the callback ran on a later turn",
      "}",
      "",
      "// with promises the error travels down the chain instead",
      "load().catch(e => show(e));",
      "try { await load(); } catch (e) { show(e); }   // this one works"
    ]},
    {t:'note',label:{en:'In Angular',ar:'في أنجولار'},
      en:`HTTP failures do not throw where you called them — they arrive as an error <em>on the stream</em>, which is why you handle them with <code>catchError</code> or an interceptor rather than <code>try</code>/<code>catch</code>.`,
      ar:`أخطاء الـ HTTP مابترميش في مكان النداء — بتوصل كخطأ <em>على المجرى</em>، وعشان كده بتتعامل معاها بـ <code>catchError</code> أو interceptor مش بـ <code>try</code>/<code>catch</code>.`}
  ]
},

{
  id:'dom', kicker:{en:'Reality', ar:'الواقع'},
  title:{en:'The DOM you still need to recognise', ar:'الـ DOM اللي لازم تعرف تعرفه'},
  lead:{
    en:`Angular writes the DOM for you, so you will rarely touch it. You still need to read it — in a tutorial, a library, or a Stack Overflow answer.`,
    ar:`أنجولار بيكتب الـ DOM بدالك، فنادراً هتلمسه. بس لسه محتاج تعرف تقراه — في شرح، أو مكتبة، أو إجابة على Stack Overflow.`
  },
  blocks:[
    {t:'code',name:'dom.js',lang:'ts',tag:{en:'read it, do not write it',ar:'اقراه، ماتكتبوش'},code:[
      "document.querySelector('.card');        // first match, or null",
      "document.querySelectorAll('.card');     // a NodeList (not an array)",
      "[...document.querySelectorAll('.card')] // now it is an array",
      "",
      "el.textContent = 'Hi';                 // safe: text only",
      "el.innerHTML   = userInput;            // DANGEROUS: injects markup",
      "",
      "el.classList.add('active');",
      "el.classList.toggle('open', isOpen);",
      "el.addEventListener('click', e => e.preventDefault());",
      "",
      "el.getBoundingClientRect();            // position and size — real numbers"
    ]},
    {t:'note',label:{en:'What Angular replaces',ar:'أنجولار بيستبدل إيه'},
      en:`<code>textContent</code> becomes <code>{{ }}</code>. <code>classList</code> becomes <code>[class.active]</code>. <code>addEventListener</code> becomes <code>(click)</code>. If you find yourself calling <code>querySelector</code> in a component, there is almost certainly a binding that does it better.`,
      ar:`<code>textContent</code> بتبقى <code>{{ }}</code>. و<code>classList</code> بتبقى <code>[class.active]</code>. و<code>addEventListener</code> بتبقى <code>(click)</code>. ولو لقيت نفسك بتنادي <code>querySelector</code> جوه component، تقريباً أكيد في binding بيعمل نفس الحاجة أحسن.`}
  ]
},

{
  id:'checklist', kicker:{en:'Before you move on', ar:'قبل ما تكمّل'},
  title:{en:'The honest checklist', ar:'اللستة الصريحة'},
  lead:{
    en:`If you can answer these without looking anything up, you are ready for the TypeScript page and then the magazine. If not, the section number tells you where to go back to.`,
    ar:`لو تقدر تجاوب على دول من غير ما تدوّر على حاجة، إنت جاهز لصفحة TypeScript وبعدين للمجلة. ولو لأ، رقم القسم بيقولك ترجع لفين.`
  },
  blocks:[
    {t:'ul',
      en:['Why does changing <code>b</code> also change <code>a</code> after <code>const b = a</code>? <b>(04)</b>',
          'What does <code>[...items, x]</code> do, and why not <code>items.push(x)</code>? <b>(09)</b>',
          'Why is <code>this</code> different inside <code>function(){}</code> and <code>() => {}</code>? <b>(05)</b>',
          'What is the difference between <code>|| 1</code> and <code>?? 1</code> when the value is <code>0</code>? <b>(08)</b>',
          'What does an <code>async</code> function return? <b>(11)</b>',
          'Why does <code>setTimeout(fn, 0)</code> not run immediately? <b>(12)</b>',
          'What are the eight falsy values? <b>(03)</b>',
          'Why can a callback still see a variable from a function that already returned? <b>(14)</b>'],
      ar:['ليه لما أغيّر <code>b</code> بيتغيّر <code>a</code> كمان بعد <code>const b = a</code>؟ <b>(04)</b>',
          'الـ <code>[...items, x]</code> بتعمل إيه، وليه مش <code>items.push(x)</code>؟ <b>(09)</b>',
          'ليه <code>this</code> بتختلف جوه <code>function(){}</code> و<code>() => {}</code>؟ <b>(05)</b>',
          'إيه الفرق بين <code>|| 1</code> و<code>?? 1</code> لما القيمة تكون <code>0</code>؟ <b>(08)</b>',
          'الدالة الـ <code>async</code> بترجّع إيه؟ <b>(11)</b>',
          'ليه <code>setTimeout(fn, 0)</code> مابتشتغلش فوراً؟ <b>(12)</b>',
          'إيه هي التمن قيم الـ falsy؟ <b>(03)</b>',
          'ليه الـ callback لسه شايفة متغيّر من دالة خلصت خلاص؟ <b>(14)</b>']},
    {t:'note',label:{en:'You do not need more than this',ar:'مش محتاج أكتر من كده'},
      en:`Generators, proxies, <code>WeakMap</code>, prototypes, <code>bind</code>/<code>call</code>/<code>apply</code> — all real JavaScript, none of it needed to write good Angular. Learn them later, out of curiosity, not out of fear.`,
      ar:`الـ generators والـ proxies و<code>WeakMap</code> والـ prototypes و<code>bind</code>/<code>call</code>/<code>apply</code> — كلها جافاسكريبت حقيقي، ومحدش منهم محتاج عشان تكتب أنجولار كويس. اتعلمهم بعدين، من الفضول، مش من الخوف.`}
  ]
},

]};
