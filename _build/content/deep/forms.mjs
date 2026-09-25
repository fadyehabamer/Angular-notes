/* ==================================================================
   Reactive forms, name by name — the companion page after the forms
   topic. One running example (a sign-up form with a "passwords match"
   rule) followed from the group in TypeScript to the error on screen,
   with every name coloured by who owns it. The star of the page is the
   control name, which is typed in four or five places.
   Names list: inline below.
   ================================================================== */

/* a name in running text, coloured like the code and linked on hover */
const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

const OLD = 'signup.ts — older style';
const NOW = 'signup.ts — today';
const CTRL = ['signup.ts', 'signup.html', 'match-fields.ts', OLD, NOW, 'signup.ts · no nonNullable', 'signup.ts · with nonNullable'];

export default {
  topic: 'forms',
  tab: 'Reactive forms, name by name — The Angular Signal',
  title: { en: 'Reactive forms, name by name', ar: 'الـ reactive forms، اسم اسم' },
  say: {
    en: 'The page for when <code>formControlName</code>, <code>controls.email</code> and <code>errors?.[\'mismatch\']</code> feel like three different languages. One sign-up form, every name coloured, and the places where one control name must be typed the same four times with nothing to check it.',
    ar: 'الصفحة دي لما <code>formControlName</code> و<code>controls.email</code> و<code>errors?.[\'mismatch\']</code> يبانوا كأنهم تلات لغات مختلفة. فورم تسجيل واحد، وكل اسم ملوّن، والأماكن اللي اسم control واحد لازم يتكتب فيها نفس الكتابة أربع مرات ومحدش بيتأكد.'
  },
  lead: {
    en: 'The idea of reactive forms is simple: <b>you build the form in TypeScript, then point the HTML at it.</b> The confusing part is the names. The word <code>email</code> is a key in <code>group({ … })</code>, a string in <code>formControlName</code>, a property in <code>controls.email</code>, and also Angular’s <code>Validators.email</code> and its error key. Some of these are checked by the compiler, some only at runtime, some never. This page shows which is which.',
    ar: 'فكرة الـ reactive forms بسيطة: <b>بتبني الفورم في TypeScript، وبعدين توجّه الـ HTML عليه.</b> اللي بيلخبط هو الأسماء. كلمة <code>email</code> مفتاح في <code>group({ … })</code>، ونص في <code>formControlName</code>، وproperty في <code>controls.email</code>، وكمان <code>Validators.email</code> بتاعة أنجولار ومفتاح الـ error بتاعها. شوية منهم الـ compiler بيتأكد منهم، وشوية وقت التشغيل بس، وشوية عمره ما حد بيتأكد. الصفحة دي بتوريك مين فيهم إيه.'
  },

  names: {
    note: {
      en: 'The orange control names are the glue of a reactive form. The group key, <code>formControlName</code>, <code>controls.x</code>, <code>raw.x</code> and the strings passed to <code>matchFields</code> must all be the same word. The table’s “Appears in” column is your checklist for a rename.',
      ar: 'أسماء الـ controls البرتقاني هي الصمغ بتاع الـ reactive form. مفتاح الـ group، و<code>formControlName</code>، و<code>controls.x</code>، و<code>raw.x</code>، والنصوص اللي بتتبعت لـ <code>matchFields</code>، لازم كلهم يبقوا نفس الكلمة. وعمود «موجود في» في الجدول هو الـ checklist بتاعك لو هتغيّر اسم.'
    },
    names: [
      /* --- shared: must agree across places --- */
      { n:'email', k:'pub', only:CTRL,
        re:'(?<=^\\s*)email(?=\\s*:)|(?<=formControlName=")email(?=")|(?<=controls\\.)email(?![\\w$-])|(?<=raw\\.)email(?![\\w$-])',
        w:{ en:'A control name: the key in the group, <code>formControlName="email"</code>, <code>controls.email</code> and <code>raw.email</code>. <code>Validators.email</code>, <code>type="email"</code> and the error key <code>e[\'email\']</code> are other owners’ words that happen to share it.',
            ar:'اسم control: المفتاح في الـ group، و<code>formControlName="email"</code>، و<code>controls.email</code>، و<code>raw.email</code>. و<code>Validators.email</code> و<code>type="email"</code> ومفتاح الـ error <code>e[\'email\']</code> كلمات أصحاب تانيين صدفة شبهها.' } },
      { n:'password', k:'pub', only:CTRL,
        re:'(?<=^\\s*)password(?=\\s*:)|(?<=formControlName=")password(?=")|(?<=controls\\.)password(?![\\w$-])|(?<=raw\\.)password(?![\\w$-])|(?<=\')password(?=\')',
        w:{ en:'A control name. The string <code>\'password\'</code> passed to <code>matchFields</code> must match it too, and nothing checks that string.',
            ar:'اسم control. والنص <code>\'password\'</code> اللي بيتبعت لـ <code>matchFields</code> لازم يطابقه كمان، ومحدش بيتأكد من النص ده.' } },
      { n:'confirm', k:'pub', only:CTRL,
        re:'(?<=^\\s*)confirm(?=\\s*:)|(?<=formControlName=")confirm(?=")|(?<=controls\\.)confirm(?![\\w$-])|(?<=\')confirm(?=\')',
        w:{ en:'A control name, also passed as a string to <code>matchFields</code>.', ar:'اسم control، وبيتبعت كنص لـ <code>matchFields</code> كمان.' } },
      { n:'mismatch', k:'pub',
        w:{ en:'An error key <b>you</b> invented in your validator. The template must ask for exactly the same key.', ar:'مفتاح error <b>انت</b> اخترعته في الـ validator بتاعك. والتمبلت لازم يسأل على نفس المفتاح بالظبط.' } },
      { n:'matchFields', k:'pub', w:{ en:'Your exported validator. Every file that imports it follows a rename.', ar:'الـ validator بتاعك اللي بتعمله export. أي ملف بيعمله import بيتغير معاه.' } },
      { n:'AuthApi', k:'pub', w:{ en:'Your service’s class.', ar:'كلاس الـ service بتاعتك.' } },
      { n:'signUp', k:'pub', w:{ en:'Your service method. The form calls it.', ar:'ميثود الـ service بتاعتك. الفورم بيناديها.' } },
      { n:'Signup', k:'pub', w:{ en:'The form component’s class.', ar:'كلاس الـ component بتاع الفورم.' } },
      { n:'app-signup', k:'pub', w:{ en:'The form component’s selector.', ar:'الـ selector بتاع component الفورم.' } },

      /* --- yours, private to one component or file --- */
      { n:'form', k:'mine', re:'(?<![\\w$<\\/-])form(?![\\w$-])',
        w:{ en:'The component’s property holding the group. <code>[formGroup]="form"</code> points at it. The <code>&lt;form&gt;</code> tag is the browser’s.', ar:'الـ property بتاعة الـ component اللي شايلة الـ group. و<code>[formGroup]="form"</code> بيشاور عليها. وتاج <code>&lt;form&gt;</code> بتاع المتصفح.' } },
      { n:'fb', k:'mine', w:{ en:'The field you store <code>FormBuilder</code> in.', ar:'الـ field اللي بتحط فيه <code>FormBuilder</code>.' } },
      { n:'auth', k:'mine', w:{ en:'The field you store <code>AuthApi</code> in.', ar:'الـ field اللي بتحط فيه <code>AuthApi</code>.' } },
      { n:'submit', k:'mine', w:{ en:'The component’s method, called by its own template.', ar:'ميثود الـ component، والتمبلت بتاعه هو اللي بيناديها.' } },
      { n:'raw', k:'mine', w:{ en:'A local variable holding the form’s value.', ar:'متغير محلي شايل قيمة الفورم.' } },
      { n:'emailCtrl', k:'mine', w:{ en:'An <code>@let</code> template variable: a short name for <code>form.controls.email</code>.', ar:'متغير تمبلت بـ <code>@let</code>: اسم قصير لـ <code>form.controls.email</code>.' } },
      { n:'passCtrl', k:'mine', w:{ en:'An <code>@let</code> template variable for the password control.', ar:'متغير تمبلت بـ <code>@let</code> للـ control بتاع الباسورد.' } },
      { n:'e', k:'mine', w:{ en:'The <code>@if … as</code> alias for the errors object.', ar:'الـ alias بتاع <code>@if … as</code> لـ object الأخطاء.' } },
      { n:'tooShort', k:'mine', w:{ en:'The <code>@if … as</code> alias for the <code>minlength</code> error.', ar:'الـ alias بتاع <code>@if … as</code> لـ error الـ <code>minlength</code>.' } },
      { n:'first', k:'mine', w:{ en:'A parameter of your validator: the first control’s name.', ar:'parameter في الـ validator بتاعك: اسم أول control.' } },
      { n:'second', k:'mine', w:{ en:'A parameter of your validator: the second control’s name.', ar:'parameter في الـ validator بتاعك: اسم تاني control.' } },
      { n:'control', k:'mine', w:{ en:'The parameter Angular fills with the group. Call it anything.', ar:'الـ parameter اللي أنجولار بيملاه بالـ group. سمّيه أي حاجة.' } },
      { n:'login', k:'mine', w:{ en:'A parameter of the service method.', ar:'parameter في ميثود الـ service.' } },
      { n:'secret', k:'mine', w:{ en:'A parameter of the service method.', ar:'parameter في ميثود الـ service.' } },
      { n:'http', k:'mine', re:'(?<![\\w$\\/-])http(?![\\w$-])', w:{ en:'The field you store <code>HttpClient</code> in.', ar:'الـ field اللي بتحط فيه <code>HttpClient</code>.' } },

      /* --- Angular's, the browser's --- */
      { n:'FormBuilder', k:'ng', w:{ en:'Angular’s service that builds forms with less typing.', ar:'الـ service بتاعة أنجولار اللي بتبني الفورمز بكتابة أقل.' } },
      { n:'ReactiveFormsModule', k:'ng', w:{ en:'Angular’s package of <code>formGroup</code> and <code>formControlName</code>.', ar:'الـ package بتاعة أنجولار اللي فيها <code>formGroup</code> و<code>formControlName</code>.' } },
      { n:'nonNullable', k:'ng', w:{ en:'A <code>FormBuilder</code> property: controls reset to their first value, not <code>null</code>.', ar:'property في <code>FormBuilder</code>: الـ controls بترجع لأول قيمة ليها، مش <code>null</code>.' } },
      { n:'group', k:'ng', re:'(?<=\\.)group(?=\\()', w:{ en:'The <code>FormBuilder</code> method that makes a group.', ar:'الميثود في <code>FormBuilder</code> اللي بتعمل group.' } },
      { n:'Validators', k:'ng', w:{ en:'Angular’s ready-made validators.', ar:'الـ validators الجاهزة بتاعة أنجولار.' } },
      { n:'required', k:'ng', w:{ en:'Angular’s validator, and the fixed error key it sets: <code>e[\'required\']</code>.', ar:'الـ validator بتاع أنجولار، ومفتاح الـ error الثابت اللي بيحطه: <code>e[\'required\']</code>.' } },
      { n:'email (validator)', k:'ng', re:'(?<=Validators\\.)email(?![\\w$-])|(?<=\\[\')email(?=\'\\])',
        w:{ en:'<code>Validators.email</code>, and the fixed error key <code>\'email\'</code> it sets. Angular’s, not your control name.', ar:'<code>Validators.email</code>، ومفتاح الـ error الثابت <code>\'email\'</code> اللي بيحطه. بتوع أنجولار، مش اسم الـ control بتاعك.' } },
      { n:'minLength', k:'ng', re:'(?<=\\.)minLength(?![\\w$-])', w:{ en:'Angular’s validator function, with a capital <code>L</code>.', ar:'function الـ validator بتاعة أنجولار، بـ <code>L</code> كابيتال.' } },
      { n:'minlength', k:'ng', w:{ en:'The error key <code>Validators.minLength</code> sets: all lower case.', ar:'مفتاح الـ error اللي <code>Validators.minLength</code> بتحطه: كله حروف صغيرة.' } },
      { n:'requiredLength', k:'ng', w:{ en:'A field Angular puts inside the <code>minlength</code> error.', ar:'field أنجولار بيحطه جوه error الـ <code>minlength</code>.' } },
      { n:'validators', k:'ng', w:{ en:'The option key for group-level validators. Lower case, plural.', ar:'مفتاح الإعداد للـ validators اللي على مستوى الـ group. حروف صغيرة، وجمع.' } },
      { n:'formGroup', k:'ng', w:{ en:'Angular’s directive connecting a <code>&lt;form&gt;</code> to your group.', ar:'الـ directive بتاع أنجولار اللي بيوصّل <code>&lt;form&gt;</code> بالـ group بتاعك.' } },
      { n:'formControlName', k:'ng', w:{ en:'Angular’s directive. The string you give it must be a key of the group.', ar:'الـ directive بتاع أنجولار. النص اللي بتديهوله لازم يبقى مفتاح في الـ group.' } },
      { n:'ngSubmit', k:'ng', w:{ en:'Angular’s form event.', ar:'الـ event بتاع أنجولار للفورم.' } },
      { n:'controls', k:'ng', w:{ en:'The property holding a group’s controls by name. Typed, so typos after it are compile errors.', ar:'الـ property اللي شايلة الـ controls بتاعة الـ group بأساميها. ليها type، فالغلط اللي بعدها compile error.' } },
      { n:'touched', k:'ng', w:{ en:'A state every control and group has.', ar:'حالة موجودة في أي control وأي group.' } },
      { n:'invalid', k:'ng', w:{ en:'A state every control and group has.', ar:'حالة موجودة في أي control وأي group.' } },
      { n:'errors', k:'ng', w:{ en:'The object where failing validators put their keys.', ar:'الـ object اللي الـ validators الفاشلة بتحط فيه مفاتيحها.' } },
      { n:'markAllAsTouched', k:'ng', w:{ en:'A form method: show every error now.', ar:'ميثود فورم: وري كل الأخطاء دلوقتي.' } },
      { n:'getRawValue', k:'ng', w:{ en:'A form method: every value, typed, disabled controls included.', ar:'ميثود فورم: كل القيم، بأنواعها، حتى الـ controls المعطّلة.' } },
      { n:'reset', k:'ng', w:{ en:'A form method.', ar:'ميثود فورم.' } },
      { n:'get', k:'ng', w:{ en:'A group method that finds a control by its name, as a string.', ar:'ميثود في الـ group بتلاقي control باسمه، كنص.' } },
      { n:'value', k:'ng', w:{ en:'The property every control has.', ar:'الـ property اللي موجودة في أي control.' } },
      { n:'AbstractControl', k:'ng', w:{ en:'Angular’s base type for any control or group.', ar:'الـ type الأساسي في أنجولار لأي control أو group.' } },
      { n:'ValidationErrors', k:'ng', w:{ en:'Angular’s type for an errors object.', ar:'الـ type بتاع أنجولار لـ object الأخطاء.' } },
      { n:'ValidatorFn', k:'ng', w:{ en:'Angular’s type for a validator function.', ar:'الـ type بتاع أنجولار لـ function الـ validator.' } },
      { n:'FormGroup', k:'ng', w:{ en:'Angular’s group class.', ar:'كلاس الـ group بتاع أنجولار.' } },
      { n:'ngOnInit', k:'ng', w:{ en:'The classic “inputs are ready” hook.', ar:'الـ hook الكلاسيكي بتاع «الـ inputs جاهزة».' } },
      { n:'@let', k:'ng', w:{ en:'Angular’s template syntax for a local variable. The name after it is yours.', ar:'الـ syntax بتاع أنجولار لمتغير محلي في التمبلت. الاسم اللي بعده بتاعك.' } },
      { n:'@if', k:'ng', w:{ en:'Angular’s condition block.', ar:'بلوك الشرط بتاع أنجولار.' } },
      { n:'disabled', k:'ng', w:{ en:'The button’s own DOM property.', ar:'الـ property بتاعة الزرار نفسه في الـ DOM.' } },
      { n:'inject', k:'ng', w:{ en:'Angular’s function that hands you a service.', ar:'الـ function بتاعة أنجولار اللي بتديك service.' } },
      { n:'HttpClient', k:'ng', w:{ en:'Angular’s HTTP service.', ar:'الـ service بتاعة أنجولار للـ HTTP.' } },
      { n:'post', k:'ng', w:{ en:'An <code>HttpClient</code> method.', ar:'ميثود في <code>HttpClient</code>.' } },
      { n:'subscribe', k:'ng', w:{ en:'RxJS’s method: the request is sent now.', ar:'ميثود RxJS: الطلب بيتبعت دلوقتي.' } },
      { n:'@Injectable', k:'ng', w:{ en:'Angular’s decorator for a service.', ar:'الـ decorator بتاع أنجولار للـ service.' } },
      { n:'providedIn', k:'ng', w:{ en:'An option key Angular reads.', ar:'مفتاح إعداد أنجولار بيقراه.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator.', ar:'الـ decorator بتاع أنجولار.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The string after it is yours.', ar:'مفتاح إعداد. النص اللي بعده بتاعك.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key pointing at your template.', ar:'مفتاح إعداد بيشاور على التمبلت بتاعك.' } },
      { n:'imports', k:'ng', w:{ en:'An option key: what this template uses.', ar:'مفتاح إعداد: الحاجات اللي التمبلت ده بيستخدمها.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One control name, six stops', ar: 'اسم control واحد، ست محطات' },
    lead: {
      en: 'A sign-up form: email, password, and “repeat password”. Follow the control names from the moment you create them to the moment the value is sent:',
      ar: 'فورم تسجيل: إيميل، وباسورد، و«كرر الباسورد». امشي ورا أسماء الـ controls من لحظة ما بتعملها للحظة ما القيمة بتتبعت:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'signup.ts', lang: 'ts', who: { en: 'class · names the control', ar: 'الكلاس · بيسمّي الـ control' },
          code: ["email: ['', [Validators.required, Validators.email]],"],
          say: { en: `This is where the name is <b>born</b>. The key ${pub('email')} is a word you chose. On the same line, ${ng('Validators')}<code>.</code>${ng('email (validator)')} is Angular’s validator. Same spelling, different owners.`,
                 ar: `هنا الاسم بيتـ<b>ولد</b>. المفتاح ${pub('email')} كلمة انت اخترتها. وفي نفس السطر، ${ng('Validators')}<code>.</code>${ng('email (validator)')} الـ validator بتاع أنجولار. نفس الكتابة، وأصحاب مختلفين.` } },
        { file: 'signup.html', lang: 'html', who: { en: 'template · connects', ar: 'التمبلت · بيوصّل' },
          code: ['<form [formGroup]="form" (ngSubmit)="submit()">', '  <input formControlName="email" type="email">'],
          say: { en: `${ng('formGroup')} points the <code>&lt;form&gt;</code> at your ${mine('form')} property. ${ng('formControlName')} connects the input by <b>string</b>, so <code>"email"</code> must copy the key exactly. The compiler does not check this string; a typo fails when the page runs.`,
                 ar: `${ng('formGroup')} بيوجّه الـ <code>&lt;form&gt;</code> على الـ property ${mine('form')} بتاعتك. و${ng('formControlName')} بيوصّل الـ input <b>بنص</b>، فـ <code>"email"</code> لازم تنسخ المفتاح بالظبط. والـ compiler مش بيتأكد من النص ده؛ الغلطة بتضرب لما الصفحة تشتغل.` } },
        { file: 'signup.html', lang: 'html', who: { en: 'template · shows errors', ar: 'التمبلت · بيعرض الأخطاء' },
          code: ['@let emailCtrl = form.controls.email;', '@if (emailCtrl.touched && emailCtrl.errors; as e) {', "  @if (e['required']) { … }"],
          say: { en: `${ng('controls')}<code>.</code>${pub('email')} is the same name again, but this time <b>typed</b>: a typo is a compile error. ${mine('emailCtrl')} and ${mine('e')} are short names you made up. ${ng('required')} is Angular’s fixed error key.`,
                 ar: `${ng('controls')}<code>.</code>${pub('email')} نفس الاسم تاني، بس المرة دي <b>ليه type</b>: الغلطة compile error. و${mine('emailCtrl')} و${mine('e')} أسماء قصيرة انت ألفتها. و${ng('required')} مفتاح الـ error الثابت بتاع أنجولار.` } },
        { file: 'signup.ts', lang: 'ts', who: { en: 'class · the group rule', ar: 'الكلاس · قاعدة الـ group' },
          code: ["}, { validators: matchFields('password', 'confirm') });"],
          say: { en: `A rule about two fields goes on the group. ${ng('validators')} is Angular’s option key. <code>'password'</code> and <code>'confirm'</code> are your control names again, as plain strings nobody checks.`,
                 ar: `القاعدة اللي بتخص حقلين بتتحط على الـ group. و${ng('validators')} مفتاح الإعداد بتاع أنجولار. و<code>'password'</code> و<code>'confirm'</code> أسماء الـ controls بتاعتك تاني، كنصوص عادية محدش بيتأكد منها.` } },
        { file: 'match-fields.ts', lang: 'ts', who: { en: 'validator · invents a key', ar: 'الـ validator · بيخترع مفتاح' },
          code: ['return a === b ? null : { mismatch: true };'],
          say: { en: `Your validator reports a problem by returning an object. The key ${pub('mismatch')} is <b>yours</b>, invented right here. <code>null</code> means “no problem”.`,
                 ar: `الـ validator بتاعك بيبلّغ عن مشكلة بإنه يرجّع object. والمفتاح ${pub('mismatch')} <b>بتاعك</b>، اتخترع هنا. و<code>null</code> معناها «مفيش مشكلة».` } },
        { file: 'signup.html', lang: 'html', who: { en: 'template · reads that key', ar: 'التمبلت · بيقرا المفتاح ده' },
          code: ["@if (form.touched && form.errors?.['mismatch']) {"],
          say: { en: `The template asks for ${pub('mismatch')} by string, on ${mine('form')} (the group), not on a control. Spell it differently and the message just never shows.`,
                 ar: `التمبلت بيسأل على ${pub('mismatch')} بنص، على ${mine('form')} (الـ group)، مش على control. اكتبه بشكل مختلف والرسالة ببساطة عمرها ما هتظهر.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'You name a control once, in <code>group({ email: … })</code>. Then you repeat that exact word in <code>formControlName="email"</code>, <code>controls.email</code>, <code>raw.email</code>, and any string like <code>\'password\'</code>. Every other <code>email</code> on the page belongs to Angular or the browser.',
        ar: 'بتسمّي الـ control مرة واحدة، في <code>group({ email: … })</code>. وبعدين بتكرر نفس الكلمة بالظبط في <code>formControlName="email"</code>، و<code>controls.email</code>، و<code>raw.email</code>، وأي نص زي <code>\'password\'</code>. وأي <code>email</code> تانية في الصفحة بتاعة أنجولار أو المتصفح.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Class or template?', ar: 'الكلاس ولا التمبلت؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'In reactive forms the class owns the form and the template only points at it. That one rule tells you where every piece goes.',
      ar: 'في الـ reactive forms الكلاس هو صاحب الفورم والتمبلت بيشاور عليه وبس. القاعدة دي لوحدها بتقولك كل حتة تتحط فين.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>form = this.fb.nonNullable.group({ … })</code>', 'class', 'you', `you pick ${mine('form')}, ${mine('fb')} and every key; ${ng('group')} is Angular’s`],
            ar: ['<code>form = this.fb.nonNullable.group({ … })</code>', 'الكلاس', 'انت', `انت بتختار ${mine('form')} و${mine('fb')} وكل مفتاح؛ و${ng('group')} بتاعة أنجولار`] },
          { en: ['<code>[Validators.required, Validators.minLength(8)]</code>', 'class', 'you choose them', 'Angular'],
            ar: ['<code>[Validators.required, Validators.minLength(8)]</code>', 'الكلاس', 'انت بتختارهم', 'أنجولار'] },
          { en: ['<code>matchFields(\'password\', \'confirm\')</code>', 'its own file', 'you', `you pick ${pub('matchFields')} and ${pub('mismatch')}; the strings must copy the keys`],
            ar: ['<code>matchFields(\'password\', \'confirm\')</code>', 'ملفه لوحده', 'انت', `انت بتختار ${pub('matchFields')} و${pub('mismatch')}؛ والنصوص لازم تنسخ المفاتيح`] },
          { en: ['<code>[formGroup]="form"</code>, <code>formControlName="email"</code>', 'template', 'you', `${ng('formGroup')} and ${ng('formControlName')} are Angular’s; the values copy your names`],
            ar: ['<code>[formGroup]="form"</code>، <code>formControlName="email"</code>', 'التمبلت', 'انت', `${ng('formGroup')} و${ng('formControlName')} بتوع أنجولار؛ والقيم بتنسخ أسماءك`] },
          { en: ['<code>@let emailCtrl = form.controls.email;</code>', 'template', 'you', `you pick ${mine('emailCtrl')}; ${ng('@let')} and ${ng('controls')} are Angular’s`],
            ar: ['<code>@let emailCtrl = form.controls.email;</code>', 'التمبلت', 'انت', `انت بتختار ${mine('emailCtrl')}؛ و${ng('@let')} و${ng('controls')} بتوع أنجولار`] },
          { en: ['<code>e[\'required\']</code>, <code>errors?.[\'minlength\']</code>', 'template', 'you read them', 'Angular: the validator that fails picks the key'],
            ar: ['<code>e[\'required\']</code>، <code>errors?.[\'minlength\']</code>', 'التمبلت', 'انت بتقراهم', 'أنجولار: الـ validator اللي بيفشل هو اللي بيختار المفتاح'] },
        ] },
      { t: 'ul',
        en: ['<b>The class owns every control.</b> The template never creates one; <code>formControlName</code> only points at a key that already exists.',
             '<b>Error keys are chosen by whoever reports the error.</b> Angular’s validators pick <code>required</code>, <code>minlength</code>, <code>email</code>. Your validator picks <code>mismatch</code>. The template only reads them.',
             '<b>Group errors live on the group.</b> <code>mismatch</code> is on <code>form.errors</code>, not on <code>form.controls.confirm.errors</code>.'],
        ar: ['<b>الكلاس هو صاحب كل control.</b> التمبلت عمره ما بيعمل واحد؛ <code>formControlName</code> بيشاور بس على مفتاح موجود أصلًا.',
             '<b>مفاتيح الأخطاء بيختارها اللي بيبلّغ عن الخطأ.</b> الـ validators بتاعة أنجولار بتختار <code>required</code> و<code>minlength</code> و<code>email</code>. والـ validator بتاعك بيختار <code>mismatch</code>. والتمبلت بيقراهم وبس.',
             '<b>أخطاء الـ group عايشة على الـ group.</b> <code>mismatch</code> موجود في <code>form.errors</code>، مش في <code>form.controls.confirm.errors</code>.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All four files, every name coloured', ar: 'الأربع ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same form, complete. Hover <code>password</code> and watch it light up in the group, the template, the <code>matchFields</code> call and the submit. Then press <b>Rename test</b>: every control name changes everywhere at once, and <code>Validators.email</code> does not move.',
      ar: 'نفس الفورم، كامل. قف بالماوس على <code>password</code> وشوفها بتنوّر في الـ group، والتمبلت، ونداء <code>matchFields</code>، والإرسال. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: كل اسم control بيتغير في كل حتة مرة واحدة، و<code>Validators.email</code> مش بتتحرك.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'match-fields.ts', lang: 'ts', tag: { en: 'your validator', ar: 'الـ validator بتاعك' }, code: [
        "import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';",
        '',
        '// a rule about two controls lives on the GROUP',
        'export function matchFields(first: string, second: string): ValidatorFn {',
        '  return (control: AbstractControl): ValidationErrors | null => {',
        '    const a = control.get(first)?.value;',
        '    const b = control.get(second)?.value;',
        '    return a === b ? null : { mismatch: true };',
        '  };',
        '}' ] },
      { t: 'code', name: 'auth-api.ts', lang: 'ts', tag: { en: 'the service', ar: 'الـ service' }, code: [
        "import { Injectable, inject } from '@angular/core';",
        "import { HttpClient } from '@angular/common/http';",
        '',
        "@Injectable({ providedIn: 'root' })",
        'export class AuthApi {',
        '  private readonly http = inject(HttpClient);',
        '',
        '  signUp(login: string, secret: string) {',
        "    return this.http.post<void>('/api/sign-up', { email: login, password: secret });",
        '  }',
        '}' ] },
      { t: 'code', name: 'signup.ts', lang: 'ts', tag: { en: 'the form', ar: 'الفورم' }, code: [
        "import { Component, inject } from '@angular/core';",
        "import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';",
        "import { AuthApi } from './auth-api';",
        "import { matchFields } from './match-fields';",
        '',
        '@Component({',
        "  selector: 'app-signup',",
        '  imports: [ReactiveFormsModule],',
        "  templateUrl: './signup.html',",
        '})',
        'export class Signup {',
        '  private readonly fb = inject(FormBuilder);',
        '  private readonly auth = inject(AuthApi);',
        '',
        '  readonly form = this.fb.nonNullable.group({',
        "    email:    ['', [Validators.required, Validators.email]],",
        "    password: ['', [Validators.required, Validators.minLength(8)]],",
        "    confirm:  ['', Validators.required],",
        "  }, { validators: matchFields('password', 'confirm') });",
        '',
        '  submit() {',
        '    if (this.form.invalid) {',
        '      this.form.markAllAsTouched();',
        '      return;',
        '    }',
        '    const raw = this.form.getRawValue();',
        '    this.auth.signUp(raw.email, raw.password).subscribe(() => this.form.reset());',
        '  }',
        '}' ] },
      { t: 'code', name: 'signup.html', lang: 'html', tag: { en: 'the view', ar: 'العرض' }, code: [
        '<form [formGroup]="form" (ngSubmit)="submit()">',
        '  <label>',
        '    Email',
        '    <input formControlName="email" type="email">',
        '  </label>',
        '  @let emailCtrl = form.controls.email;',
        '  @if (emailCtrl.touched && emailCtrl.errors; as e) {',
        '    <p class="err">',
        "      @if (e['required']) { We need an address. }",
        "      @else if (e['email']) { That does not look like an address. }",
        '    </p>',
        '  }',
        '',
        '  <label>',
        '    Password',
        '    <input formControlName="password" type="password">',
        '  </label>',
        '  @let passCtrl = form.controls.password;',
        "  @if (passCtrl.touched && passCtrl.errors?.['minlength']; as tooShort) {",
        '    <p class="err">At least {{ tooShort.requiredLength }} characters.</p>',
        '  }',
        '',
        '  <label>',
        '    Repeat it',
        '    <input formControlName="confirm" type="password">',
        '  </label>',
        "  @if (form.touched && form.errors?.['mismatch']) {",
        '    <p class="err">The two do not match.</p>',
        '  }',
        '',
        '  <button [disabled]="form.invalid">Create account</button>',
        '</form>' ] },
      { t: 'nmtable' }
    ]
  },

  /* ------------------------------------------------------------ 4 */
  {
    id: 'rename',
    kicker: { en: 'Is it OK to change it?', ar: 'ينفع أغيّره؟' },
    title: { en: 'What breaks when you rename each name', ar: 'إيه اللي بيبوظ لما تغيّر كل اسم' },
    lead: {
      en: 'A control name is checked in some places and not in others. That is why renaming one is the most confusing edit in reactive forms: you get a compile error in one spot and silence in the next.',
      ar: 'اسم الـ control بيتأكد منه في أماكن ومش بيتأكد منه في أماكن تانية. وعشان كده تغييره هو أكتر تعديل بيلخبط في الـ reactive forms: بتاخد compile error في مكان وسكوت في اللي بعده.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [`a control: ${pub('email')}`, '<code>formControlName="email"</code>', '<b>No compile error.</b> The page throws at runtime: “Cannot find control with name: ‘email’”.'],
            ar: [`control: ${pub('email')}`, '<code>formControlName="email"</code>', '<b>مفيش compile error.</b> الصفحة بتضرب وقت التشغيل: «Cannot find control with name: ‘email’».'] },
          { en: [`a control: ${pub('email')}`, '<code>controls.email</code> and <code>raw.email</code>', 'Compile error: the form is typed, so TypeScript knows the keys.'],
            ar: [`control: ${pub('email')}`, '<code>controls.email</code> و<code>raw.email</code>', 'Compile error: الفورم ليه types، فـ TypeScript عارف المفاتيح.'] },
          { en: [`a control: ${pub('password')} or ${pub('confirm')}`, 'the strings in <code>matchFields(\'password\', \'confirm\')</code>', '<b>No error at all.</b> <code>control.get(\'old\')</code> finds nothing, so the passwords either always “match” or never do.'],
            ar: [`control: ${pub('password')} أو ${pub('confirm')}`, 'النصوص في <code>matchFields(\'password\', \'confirm\')</code>', '<b>مفيش أي error.</b> <code>control.get(\'old\')</code> مش بتلاقي حاجة، فالباسوردات يا إما «متطابقة» دايمًا يا إما عمرها ما هتتطابق.'] },
          { en: [pub('mismatch') + ' (your error key)', 'the template’s <code>errors?.[\'mismatch\']</code>', '<b>No error.</b> The message never appears.'],
            ar: [pub('mismatch') + ' (مفتاح الـ error بتاعك)', '<code>errors?.[\'mismatch\']</code> في التمبلت', '<b>مفيش error.</b> الرسالة عمرها ما بتظهر.'] },
          { en: [`${pub('matchFields')}, ${pub('AuthApi')}, ${pub('signUp')}`, 'every import and call', 'Compile error.'],
            ar: [`${pub('matchFields')}، ${pub('AuthApi')}، ${pub('signUp')}`, 'كل import وكل نداء', 'Compile error.'] },
          { en: [`${mine('form')}, ${mine('submit')}`, 'the template', 'Compile error in the template.'],
            ar: [`${mine('form')}، ${mine('submit')}`, 'التمبلت', 'Compile error في التمبلت.'] },
          { en: [`${mine('emailCtrl')}, ${mine('e')}, ${mine('tooShort')}`, 'the lines below them in the template', 'Compile error in the template.'],
            ar: [`${mine('emailCtrl')}، ${mine('e')}، ${mine('tooShort')}`, 'السطور اللي تحتهم في التمبلت', 'Compile error في التمبلت.'] },
          { en: [`${ng('required')}, ${ng('minlength')}, ${ng('formControlName')}, ${ng('validators')}`, 'nothing: you cannot rename these', 'They are Angular’s words.'],
            ar: [`${ng('required')}، ${ng('minlength')}، ${ng('formControlName')}، ${ng('validators')}`, 'ولا حاجة: دول مينفعش يتغيروا', 'دي كلمات أنجولار.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b>. Count how many places <code>password</code> changes: the group key, <code>formControlName</code>, <code>controls.password</code>, <code>raw.password</code> and the string in <code>matchFields</code>. Missing the last one is the bug nobody catches.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b>. عدّ <code>password</code> بتتغير في كام مكان: مفتاح الـ group، و<code>formControlName</code>، و<code>controls.password</code>، و<code>raw.password</code>، والنص في <code>matchFields</code>. ونسيان الأخير هو الباج اللي محدش بيمسكه.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتوعك' },
    title: { en: 'Validators and the keys they set', ar: 'الـ validators والمفاتيح اللي بيحطوها' },
    lead: {
      en: 'Every built-in validator has two names: the function you call in the class, and the error key you read in the template. They are not always spelled the same.',
      ar: 'كل validator جاهز ليه اسمين: الـ function اللي بتناديها في الكلاس، ومفتاح الـ error اللي بتقراه في التمبلت. ومش دايمًا بيتكتبوا زي بعض.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['In the class', 'Error key in the template', 'Extra info inside the error'],
                ar: ['في الكلاس', 'مفتاح الـ error في التمبلت', 'معلومات زيادة جوه الـ error'] },
        rows: [
          { en: ['<code>Validators.required</code>', '<code>\'required\'</code>', '—'], ar: ['<code>Validators.required</code>', '<code>\'required\'</code>', '—'] },
          { en: ['<code>Validators.email</code>', '<code>\'email\'</code>', '—'], ar: ['<code>Validators.email</code>', '<code>\'email\'</code>', '—'] },
          { en: ['<code>Validators.minLength(8)</code>', '<code>\'minlength\'</code> (lower case!)', '<code>requiredLength</code>, <code>actualLength</code>'], ar: ['<code>Validators.minLength(8)</code>', '<code>\'minlength\'</code> (حروف صغيرة!)', '<code>requiredLength</code>، <code>actualLength</code>'] },
          { en: ['<code>Validators.maxLength(20)</code>', '<code>\'maxlength\'</code>', '<code>requiredLength</code>, <code>actualLength</code>'], ar: ['<code>Validators.maxLength(20)</code>', '<code>\'maxlength\'</code>', '<code>requiredLength</code>، <code>actualLength</code>'] },
          { en: ['<code>Validators.min(1)</code>', '<code>\'min\'</code>', '<code>min</code>, <code>actual</code>'], ar: ['<code>Validators.min(1)</code>', '<code>\'min\'</code>', '<code>min</code>، <code>actual</code>'] },
          { en: ['<code>Validators.pattern(…)</code>', '<code>\'pattern\'</code>', '<code>requiredPattern</code>, <code>actualValue</code>'], ar: ['<code>Validators.pattern(…)</code>', '<code>\'pattern\'</code>', '<code>requiredPattern</code>، <code>actualValue</code>'] },
          { en: ['your <code>matchFields(…)</code>', `${pub('mismatch')}: whatever <b>you</b> return`, 'whatever you put in the object'], ar: ['<code>matchFields(…)</code> بتاعك', `${pub('mismatch')}: أي حاجة <b>انت</b> بترجّعها`, 'أي حاجة بتحطها في الـ object'] },
        ] },
      { t: 'p',
        en: `The rest of the vocabulary is Angular’s too: the builder (${ng('FormBuilder')}, ${ng('nonNullable')}, ${ng('group')}), the directives (${ng('formGroup')}, ${ng('formControlName')}, ${ng('ngSubmit')}), the state (${ng('touched')}, ${ng('invalid')}, ${ng('errors')}, ${ng('value')}) and the methods (${ng('getRawValue')}, ${ng('markAllAsTouched')}, ${ng('reset')}, ${ng('get')}).`,
        ar: `وباقي الكلمات بتاعة أنجولار برضه: الـ builder (${ng('FormBuilder')}، ${ng('nonNullable')}، ${ng('group')})، والـ directives (${ng('formGroup')}، ${ng('formControlName')}، ${ng('ngSubmit')})، والحالة (${ng('touched')}، ${ng('invalid')}، ${ng('errors')}، ${ng('value')})، والميثودز (${ng('getRawValue')}، ${ng('markAllAsTouched')}، ${ng('reset')}، ${ng('get')}).` },
      { t: 'note', label: { en: 'Remember', ar: 'افتكر' },
        en: 'In <code>fb.group(…)</code>, <code>group</code> is Angular’s method. In <code>matchFields</code>, the parameter that receives the group is yours; here it is called <code>control</code>, and it could be called <code>group</code> too without touching Angular’s word.',
        ar: 'في <code>fb.group(…)</code>، <code>group</code> ميثود أنجولار. وفي <code>matchFields</code>، الـ parameter اللي بيستقبل الـ group بتاعك؛ هنا اسمه <code>control</code>، وممكن يتسمّى <code>group</code> كمان من غير ما يلمس كلمة أنجولار.' }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'Angular accepts any control name and any error key. These habits keep the many copies of each name easy to find.',
      ar: 'أنجولار بيقبل أي اسم control وأي مفتاح error. العادات دي بتخلي النسخ الكتير من كل اسم سهل تلاقيها.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['a control', '<code>email</code>, <code>password</code>, <code>confirmPassword</code>', '<code>field1</code>, <code>input_a</code>', 'Use the names your data already has, so <code>getRawValue()</code> looks like what the API expects.'],
            ar: ['control', '<code>email</code>، <code>password</code>، <code>confirmPassword</code>', '<code>field1</code>، <code>input_a</code>', 'استخدم الأسماء اللي الداتا بتاعتك فيها أصلًا، عشان <code>getRawValue()</code> يبقى شكلها زي اللي الـ API مستنيه.'] },
          { en: ['your error key', '<code>mismatch</code>, <code>passwordsDiffer</code>', '<code>error</code>, <code>invalid</code>, <code>bad</code>', 'Name what is wrong. <code>invalid</code> already means something on every control.'],
            ar: ['مفتاح الـ error بتاعك', '<code>mismatch</code>، <code>passwordsDiffer</code>', '<code>error</code>، <code>invalid</code>، <code>bad</code>', 'سمّي اللي غلط. و<code>invalid</code> ليها معنى أصلًا في كل control.'] },
          { en: ['an <code>@let</code> for a control', '<code>emailCtrl</code>', '<code>email</code>', 'Legal, but then <code>email</code> is a control name, a template variable and an Angular validator on the same screen.'],
            ar: ['<code>@let</code> لـ control', '<code>emailCtrl</code>', '<code>email</code>', 'مسموح، بس ساعتها <code>email</code> هتبقى اسم control ومتغير تمبلت و validator بتاع أنجولار في نفس الشاشة.'] },
          { en: ['the form property', '<code>form</code>, <code>signupForm</code>', '<code>fg</code>, <code>myForm</code>', 'It is typed in the template often. <code>form</code> is fine while a component has one form.'],
            ar: ['الـ property بتاعة الفورم', '<code>form</code>، <code>signupForm</code>', '<code>fg</code>، <code>myForm</code>', 'بتتكتب في التمبلت كتير. و<code>form</code> تمام طول ما الـ component فيه فورم واحد.'] },
          { en: ['the <code>FormBuilder</code> field', '<code>fb</code>', '<code>builder1</code>', 'Almost every Angular codebase uses <code>fb</code>; readers recognise it at once.'],
            ar: ['الـ field بتاع <code>FormBuilder</code>', '<code>fb</code>', '<code>builder1</code>', 'تقريبًا كل كود أنجولار بيستخدم <code>fb</code>؛ واللي بيقرا بيعرفه على طول.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Three places where a string must copy a name', ar: 'تلات أماكن النص فيها لازم ينسخ اسم' },
    lead: {
      en: 'Reactive forms are typed, but three spots still take the name as a plain string. Those are where to slow down.',
      ar: 'الـ reactive forms ليها types، بس لسه فيه تلات أماكن بتاخد الاسم كنص عادي. ودي الأماكن اللي لازم تهدى فيها.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: '<code>formControlName="…"</code>', ar: '<code>formControlName="…"</code>' }, blocks: [
        { t: 'p',
          en: 'The value must be a key of the group. It is checked when the page runs, not when you build. <code>form.controls.email</code> in the same template, by contrast, is checked at build time.',
          ar: 'القيمة لازم تبقى مفتاح في الـ group. وبيتأكد منها لما الصفحة تشتغل، مش وقت الـ build. أما <code>form.controls.email</code> في نفس التمبلت فبيتأكد منها وقت الـ build.' }
      ]},
      { t: 'step', n: 'B', title: { en: 'Strings passed to a validator, and <code>get(\'…\')</code>', ar: 'النصوص اللي بتتبعت لـ validator، و<code>get(\'…\')</code>' }, blocks: [
        { t: 'p',
          en: `<code>matchFields('password', 'confirm')</code> hands two control names to ${ng('get')}. Nothing compares those strings to the group’s keys. Inside the validator, ${mine('first')} and ${mine('second')} are yours; the <b>values</b> they carry must be real control names.`,
          ar: `<code>matchFields('password', 'confirm')</code> بتدي اسمين controls لـ ${ng('get')}. ومحدش بيقارن النصوص دي بمفاتيح الـ group. وجوه الـ validator، ${mine('first')} و${mine('second')} بتوعك؛ لكن <b>القيم</b> اللي شايلينها لازم تبقى أسماء controls حقيقية.` }
      ]},
      { t: 'step', n: 'C', title: { en: 'Error keys in the template', ar: 'مفاتيح الأخطاء في التمبلت' }, blocks: [
        { t: 'p',
          en: `<code>errors</code> is an object with string keys, so <code>e['anything']</code> compiles. Angular’s keys are fixed (${ng('required')}, ${ng('minlength')}). Your own key, ${pub('mismatch')}, is chosen in the validator; the template must copy it.`,
          ar: `<code>errors</code> object مفاتيحه نصوص، فـ <code>e['anything']</code> بتعمل compile. ومفاتيح أنجولار ثابتة (${ng('required')}، ${ng('minlength')}). والمفتاح بتاعك، ${pub('mismatch')}، بيتختار في الـ validator؛ والتمبلت لازم ينسخه.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: 'Untyped groups and constructor injection', ar: 'groups من غير types والـ inject في الـ constructor' },
    lead: {
      en: 'Older code builds the form in <code>ngOnInit</code>, receives <code>FormBuilder</code> through the constructor, and stores it in a plain <code>FormGroup</code>. The control names are identical. What you lose is the checking.',
      ar: 'الكود الأقدم بيبني الفورم في <code>ngOnInit</code>، وبياخد <code>FormBuilder</code> عن طريق الـ constructor، وبيخزنه في <code>FormGroup</code> عادي. أسماء الـ controls هي هي. اللي بتخسره هو التأكد.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: OLD, lang: 'ts', code: [
          'form!: FormGroup;',
          '',
          'constructor(private fb: FormBuilder) {}',
          '',
          'ngOnInit() {',
          '  this.form = this.fb.group({',
          "    email:    ['', [Validators.required, Validators.email]],",
          "    password: ['', [Validators.required, Validators.minLength(8)]],",
          "    confirm:  ['', Validators.required],",
          "  }, { validators: matchFields('password', 'confirm') });",
          '}' ] },
        good: { name: NOW, lang: 'ts', code: [
          'private readonly fb = inject(FormBuilder);',
          '',
          'readonly form = this.fb.nonNullable.group({',
          "  email:    ['', [Validators.required, Validators.email]],",
          "  password: ['', [Validators.required, Validators.minLength(8)]],",
          "  confirm:  ['', Validators.required],",
          "}, { validators: matchFields('password', 'confirm') });" ] } },
      { t: 'p',
        en: 'Declared as a bare <code>FormGroup</code>, the form is <code>FormGroup&lt;any&gt;</code>, so <code>form.controls.emial</code> is no longer a compile error. Older templates also read controls by string, <code>form.get(\'email\')</code>, which adds one more unchecked copy of the name.',
        ar: 'لما يتعلن كـ <code>FormGroup</code> من غير حاجة، الفورم بيبقى <code>FormGroup&lt;any&gt;</code>، فـ <code>form.controls.emial</code> مابقتش compile error. والتمبلتس الأقدم كمان بتقرا الـ controls بنص، <code>form.get(\'email\')</code>، وده بيزوّد نسخة كمان من الاسم محدش بيتأكد منها.' }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, or it says something odd', ar: 'مش بيعمل حاجة، أو بيقول حاجة غريبة' },
    title: { en: 'Mistakes that fail silently or confusingly', ar: 'غلطات بتفشل في صمت أو بشكل ملخبط' },
    lead: {
      en: 'Most of these come from a name typed twice, once in a checked place and once in an unchecked one.',
      ar: 'أغلب دول جايين من اسم متكتب مرتين، مرة في مكان بيتأكد منه ومرة في مكان مش بيتأكد منه.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'A typo in <code>formControlName</code>', ar: 'غلطة إملائية في <code>formControlName</code>' }, blocks: [
        { t: 'pair',
          bad:  { name: 'signup.html', lang: 'html', code: ['<input formControlName="emial" type="email">'] },
          good: { name: 'signup.html', lang: 'html', code: ['<input formControlName="email" type="email">'] } },
        { t: 'p', en: 'It builds fine. When the page opens, Angular throws “Cannot find control with name: ‘emial’”. The message is accurate; just copy the key from the group.',
                  ar: 'بيعمل build عادي. ولما الصفحة تفتح، أنجولار بيرمي «Cannot find control with name: ‘emial’». الرسالة مظبوطة؛ انسخ المفتاح من الـ group وخلاص.' }
      ]},
      { t: 'step', n: '2', title: { en: 'A validator string that is not a control name', ar: 'نص في الـ validator مش اسم control' }, blocks: [
        { t: 'pair',
          bad:  { name: 'signup.ts', lang: 'ts', code: ["}, { validators: matchFields('password', 'confirmPassword') });"] },
          good: { name: 'signup.ts', lang: 'ts', code: ["}, { validators: matchFields('password', 'confirm') });"] } },
        { t: 'p', en: 'The group has no <code>confirmPassword</code>, so <code>get()</code> returns <code>null</code> and its value is <code>undefined</code>. A real password never equals <code>undefined</code>, so “do not match” shows forever and the form can never be sent. No error anywhere.',
                  ar: 'الـ group مفيهوش <code>confirmPassword</code>، فـ <code>get()</code> بترجّع <code>null</code> وقيمتها <code>undefined</code>. وأي باسورد حقيقي عمره ما يساوي <code>undefined</code>، فـ«مش متطابقين» بتفضل ظاهرة على طول والفورم عمره ما هيتبعت. ومفيش error في أي حتة.' }
      ]},
      { t: 'step', n: '3', title: { en: 'The function name used as the error key', ar: 'اسم الـ function مستخدم كمفتاح error' }, blocks: [
        { t: 'pair',
          bad:  { name: 'signup.html', lang: 'html', code: ["@if (passCtrl.errors?.['minLength']; as tooShort) { … }"] },
          good: { name: 'signup.html', lang: 'html', code: ["@if (passCtrl.errors?.['minlength']; as tooShort) { … }"] } },
        { t: 'p', en: 'You call <code>Validators.minLength</code>, but the key it sets is <code>minlength</code>. The capital-L key never exists, so the message never shows, and <code>errors</code> accepts any string without complaint.',
                  ar: 'انت بتنادي <code>Validators.minLength</code>، بس المفتاح اللي بتحطه <code>minlength</code>. والمفتاح اللي بـ L كابيتال عمره ما بيبقى موجود، فالرسالة عمرها ما بتظهر، و<code>errors</code> بيقبل أي نص من غير ما يشتكي.' }
      ]},
      { t: 'step', n: '4', title: { en: 'Reading a group error on a control', ar: 'قراية error الـ group من على control' }, blocks: [
        { t: 'pair',
          bad:  { name: 'signup.html', lang: 'html', code: ["@if (form.controls.confirm.errors?.['mismatch']) { … }"] },
          good: { name: 'signup.html', lang: 'html', code: ["@if (form.errors?.['mismatch']) { … }"] } },
        { t: 'p', en: 'The validator is attached to the group, so its key lands on <code>form.errors</code>. The <code>confirm</code> control only has its own errors, like <code>required</code>. Right key, wrong place: silence.',
                  ar: 'الـ validator متعلّق على الـ group، فالمفتاح بتاعه بيقع في <code>form.errors</code>. والـ control <code>confirm</code> فيه الأخطاء بتاعته هو بس، زي <code>required</code>. المفتاح صح، والمكان غلط: سكوت.' }
      ]},
      { t: 'step', n: '5', title: { en: 'Forgetting <code>nonNullable</code>', ar: 'نسيان <code>nonNullable</code>' }, blocks: [
        { t: 'pair',
          bad:  { name: 'signup.ts · no nonNullable', lang: 'ts', code: [
            'readonly form = this.fb.group({',
            "  email: ['', Validators.required],",
            '});',
            '// raw.email is string | null' ] },
          good: { name: 'signup.ts · with nonNullable', lang: 'ts', code: [
            'readonly form = this.fb.nonNullable.group({',
            "  email: ['', Validators.required],",
            '});',
            '// raw.email is string' ] } },
        { t: 'p', en: 'Without it, each control can be reset to <code>null</code>, so its type is <code>string | null</code>. Then <code>signUp(raw.email, …)</code> fails with “<code>string | null</code> is not assignable to <code>string</code>”, an error that never mentions forms. The name <code>email</code> is fine; the missing word is <code>nonNullable</code>.',
                  ar: 'من غيرها، كل control ممكن يرجع لـ <code>null</code> في الـ reset، فنوعه بيبقى <code>string | null</code>. وساعتها <code>signUp(raw.email, …)</code> بتفشل بـ «<code>string | null</code> is not assignable to <code>string</code>»، error عمره ما بيجيب سيرة الفورمز. الاسم <code>email</code> تمام؛ الكلمة الناقصة هي <code>nonNullable</code>.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it does nothing', ar: 'لما مايعملش حاجة' },
    title: { en: 'Six questions, in this order', ar: 'ست أسئلة، بالترتيب ده' },
    lead: {
      en: 'Your form “does not work”: an input is not connected, an error never shows, or the button never enables. Ask these first.',
      ar: 'الفورم بتاعك «مش شغال»: input مش متوصّل، أو error عمره ما بيظهر، أو الزرار عمره ما بيتفعّل. اسأل دول الأول.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Is <code>ReactiveFormsModule</code> in <code>imports</code>? Without it you get “Can’t bind to ‘formGroup’ since it isn’t a known property of ‘form’”.',
                  ar: '<b>1.</b> <code>ReactiveFormsModule</code> موجود في <code>imports</code>؟ من غيره هتاخد «Can’t bind to ‘formGroup’ since it isn’t a known property of ‘form’».' },
      { t: 'chk', en: '<b>2.</b> Does every <code>formControlName</code> value exactly match a key in <code>group({ … })</code>?',
                  ar: '<b>2.</b> كل قيمة <code>formControlName</code> مطابقة بالظبط لمفتاح في <code>group({ … })</code>؟' },
      { t: 'chk', en: '<b>3.</b> Do the strings you pass to your own validators (<code>matchFields(\'…\', \'…\')</code>) name real controls?',
                  ar: '<b>3.</b> النصوص اللي بتبعتها للـ validators بتاعتك (<code>matchFields(\'…\', \'…\')</code>) أسماء controls حقيقية؟' },
      { t: 'chk', en: '<b>4.</b> Are you reading the right error key, lower case for Angular’s (<code>minlength</code>), and the exact key your validator returns?',
                  ar: '<b>4.</b> بتقرا مفتاح الـ error الصح، حروف صغيرة لبتوع أنجولار (<code>minlength</code>)، والمفتاح بالظبط اللي الـ validator بتاعك بيرجّعه؟' },
      { t: 'chk', en: '<b>5.</b> Are you reading it in the right place: <code>form.errors</code> for group rules, <code>form.controls.x.errors</code> for control rules?',
                  ar: '<b>5.</b> بتقراه من المكان الصح: <code>form.errors</code> لقواعد الـ group، و<code>form.controls.x.errors</code> لقواعد الـ control؟' },
      { t: 'chk', en: '<b>6.</b> Did you build the group with <code>fb.nonNullable</code>, so values are <code>string</code> and not <code>string | null</code>?',
                  ar: '<b>6.</b> بنيت الـ group بـ <code>fb.nonNullable</code>، عشان القيم تبقى <code>string</code> مش <code>string | null</code>؟' }
    ]
  }
  ]
};
