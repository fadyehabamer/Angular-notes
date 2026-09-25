/* ==================================================================
   ControlValueAccessor, name by name — the deep dive after the custom
   form controls topic. One running example (a star rating inside a
   profile form) followed through every file, every name coloured.
   ================================================================== */

const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

export default {
  topic: 'control-value-accessor',
  tab: 'ControlValueAccessor, name by name — The Angular Signal',
  title: { en: '<code>ControlValueAccessor</code>, name by name', ar: '<code>ControlValueAccessor</code>، اسم اسم' },
  say: {
    en: 'One star rating used inside a profile form, followed from the form’s value to the stars and back. Every name coloured: the four method names Angular fixed, the callback fields you name yourself, and the control name the rating never even sees.',
    ar: 'تقييم بالنجوم واحد جوه فورم بروفايل، ماشيين وراه من قيمة الفورم للنجوم ورجوعًا. كل اسم ملوّن: الأربع أسماء ميثودز اللي أنجولار ثبّتها، والـ fields بتاعة الـ callbacks اللي انت بتسمّيها، واسم الكنترول اللي التقييم عمره ما بيشوفه أصلًا.'
  },
  lead: {
    en: 'The idea: <b>your component promises four methods, and in return the form treats it like a native input.</b> The confusing part is the names. Some methods you write are named by Angular, not by you. Angular hands you functions that you store under names you invent. And the control’s name, <code>rating</code>, is written on the form page but never inside your component. This page sorts all of that out.',
    ar: 'الفكرة: <b>الـ component بتاعك بيوعد بأربع ميثودز، وفي المقابل الفورم بيعامله زي input عادي.</b> اللي بيلخبط هو الأسماء. فيه ميثودز انت بتكتبها بس أنجولار هو اللي مسمّيها، مش انت. وأنجولار بيدّيك functions بتخزّنها تحت أسماء انت بتخترعها. واسم الكنترول، <code>rating</code>، بيتكتب في صفحة الفورم وعمره ما بيتكتب جوه الـ component بتاعك. الصفحة دي بترتّب كل ده.'
  },

  names: {
    note: {
      en: 'The strangest rows are the blue ones inside your own class: <code>writeValue</code>, <code>registerOnChange</code>, <code>registerOnTouched</code> and <code>setDisabledState</code>. You write their bodies, but the interface fixed their names, because the forms module calls them. Their parameters, and the fields you keep the callbacks in, are green.',
      ar: 'أغرب صفوف هي الزرقا اللي جوه الكلاس بتاعك: <code>writeValue</code> و<code>registerOnChange</code> و<code>registerOnTouched</code> و<code>setDisabledState</code>. انت بتكتب اللي جواها، بس الـ interface هو اللي ثبّت أسماءها، عشان الـ forms module بيناديها. والـ parameters بتاعتها، والـ fields اللي بتحفظ فيها الـ callbacks، خضرا.'
    },
    names: [
      /* --- shared --- */
      { n:'StarRating', k:'pub', w:{ en:'The class. <code>forwardRef</code> points at it, and the form page lists it in <code>imports</code>.', ar:'الكلاس. <code>forwardRef</code> بيشاور عليه، وصفحة الفورم بتكتبه في <code>imports</code>.' } },
      { n:'app-star-rating', k:'pub', w:{ en:'The selector. The form page types this tag.', ar:'الـ selector. صفحة الفورم بتكتب التاج ده.' } },
      { n:'max', k:'pub', re:'(?<![\\w$.-])max(?![\\w$-])', w:{ en:'An ordinary input. The form page sets it with <code>[max]</code>.', ar:'input عادي. صفحة الفورم بتحطه بـ <code>[max]</code>.' } },
      { n:'noStars', k:'pub', w:{ en:'The error key your validator returns. The form page checks it with <code>hasError(\'noStars\', …)</code>.', ar:'مفتاح الـ error اللي الـ validator بتاعك بيرجّعه. صفحة الفورم بتشيّك عليه بـ <code>hasError(\'noStars\', …)</code>.' } },
      { n:'Profile', k:'pub', w:{ en:'The form page’s class.', ar:'كلاس صفحة الفورم.' } },
      { n:'app-profile', k:'pub', w:{ en:'The form page’s selector.', ar:'الـ selector بتاع صفحة الفورم.' } },

      /* --- yours, inside one component --- */
      { n:'value', k:'mine', re:'(?<![\\w$-])(?<!control\\.)value(?![\\w$-])',
        w:{ en:'Your own signal with the number of stars. Angular never reads it; it reaches you through <code>writeValue</code>.', ar:'الـ signal بتاعتك اللي فيها عدد النجوم. أنجولار عمره ما بيقراها؛ القيمة بتوصلك عن طريق <code>writeValue</code>.' } },
      { n:'disabled', k:'mine', re:'(?<![\\w$\\[-])disabled(?![\\w$\\]-])',
        w:{ en:'Your own signal. In <code>[disabled]="…"</code> the left side is the button’s DOM property, not yours.', ar:'الـ signal بتاعتك. في <code>[disabled]="…"</code> الناحية الشمال property الزرار في الـ DOM، مش بتاعتك.' } },
      { n:'onChange', k:'mine', w:{ en:'The field where you keep the form’s “value changed” callback. Any name works: Angular never looks at it.', ar:'الـ field اللي بتحفظ فيه الـ callback بتاع «القيمة اتغيرت» بتاع الفورم. أي اسم ينفع: أنجولار عمره ما بيبص عليه.' } },
      { n:'onTouched', k:'mine', w:{ en:'The field for the “touched” callback, also called from your own template, so it is <code>protected</code>.', ar:'الـ field بتاع callback «اتلمس»، وبتناديه كمان من التمبلت بتاعك، فهو <code>protected</code>.' } },
      { n:'v', k:'mine', w:{ en:'A parameter name, including the one inside the function type. Pure decoration.', ar:'اسم parameter، حتى اللي جوه نوع الـ function. مجرد شكل.' } },
      { n:'fn', k:'mine', w:{ en:'The parameter that receives Angular’s callback. The method name is fixed; this is not.', ar:'الـ parameter اللي بيستقبل الـ callback بتاع أنجولار. اسم الميثود ثابت؛ ده لأ.' } },
      { n:'isDisabled', k:'mine', w:{ en:'The parameter of <code>setDisabledState</code>.', ar:'الـ parameter بتاع <code>setDisabledState</code>.' } },
      { n:'pick', k:'mine', w:{ en:'Your own method, called by your own buttons.', ar:'الميثود بتاعتك، والزراير بتاعتك هي اللي بتناديها.' } },
      { n:'n', k:'mine', w:{ en:'A loop variable in the template, and <code>pick</code>’s parameter.', ar:'متغير لوب في التمبلت، والـ parameter بتاع <code>pick</code>.' } },
      { n:'control', k:'mine', w:{ en:'The <code>validate</code> method’s parameter.', ar:'الـ parameter بتاع ميثود <code>validate</code>.' } },
      { n:'form', k:'mine', re:'(?<![\\w$</-])form(?![\\w$>-])', w:{ en:'The profile page’s form group, bound with <code>[formGroup]="form"</code>. The <code>&lt;form&gt;</code> tag is HTML’s.', ar:'الـ form group بتاع صفحة البروفايل، مربوط بـ <code>[formGroup]="form"</code>. والتاج <code>&lt;form&gt;</code> بتاع HTML.' } },
      { n:'rating', k:'mine', re:'(?<![\\w$-])rating(?![\\w$-])',
        w:{ en:'A control name. The key in <code>group({…})</code> and the string in <code>formControlName="rating"</code> must match. The star rating component never sees it.', ar:'اسم كنترول. المفتاح اللي في <code>group({…})</code> والنص اللي في <code>formControlName="rating"</code> لازم يطابقوا. و component التقييم عمره ما بيشوفه.' } },
      { n:'name', k:'mine', only:['profile.ts', 'profile.html'], w:{ en:'Another control name, same rule.', ar:'اسم كنترول تاني، نفس القاعدة.' } },
      { n:'fb', k:'mine', w:{ en:'The profile page’s field for the injected <code>FormBuilder</code>.', ar:'الـ field بتاع صفحة البروفايل للـ <code>FormBuilder</code>.' } },
      { n:'save', k:'mine', w:{ en:'The profile page’s own method.', ar:'ميثود صفحة البروفايل نفسها.' } },

      /* --- Angular’s, TypeScript’s, the browser’s --- */
      { n:'ControlValueAccessor', k:'ng', w:{ en:'Angular’s interface: the four-method contract.', ar:'الـ interface بتاع أنجولار: العقد بأربع ميثودز.' } },
      { n:'writeValue', k:'ng', w:{ en:'Required by the interface. The form calls it to push a value <b>into</b> your component.', ar:'الـ interface بيطلبها. الفورم بيناديها عشان يدخّل قيمة <b>جوه</b> الـ component بتاعك.' } },
      { n:'registerOnChange', k:'ng', w:{ en:'Required by the interface. The form hands you its “value changed” callback here, once.', ar:'الـ interface بيطلبها. الفورم بيدّيك هنا الـ callback بتاع «القيمة اتغيرت»، مرة واحدة.' } },
      { n:'registerOnTouched', k:'ng', w:{ en:'Required by the interface. The form hands you its “touched” callback here, once.', ar:'الـ interface بيطلبها. الفورم بيدّيك هنا الـ callback بتاع «اتلمس»، مرة واحدة.' } },
      { n:'setDisabledState', k:'ng', w:{ en:'<b>Optional</b> in the interface, but the name is fixed. The form calls it when the control is disabled or enabled.', ar:'<b>اختيارية</b> في الـ interface، بس الاسم ثابت. الفورم بيناديها لما الكنترول يتقفل أو يتفتح.' } },
      { n:'NG_VALUE_ACCESSOR', k:'ng', w:{ en:'Angular’s token. <code>formControlName</code> looks for exactly this to find your component.', ar:'الـ token بتاع أنجولار. <code>formControlName</code> بيدوّر عليه هو بالظبط عشان يلاقي الـ component بتاعك.' } },
      { n:'NG_VALIDATORS', k:'ng', w:{ en:'Angular’s token for validators that come with a control.', ar:'الـ token بتاع أنجولار للـ validators اللي جاية مع الكنترول.' } },
      { n:'Validator', k:'ng', w:{ en:'Angular’s interface for a class that validates.', ar:'الـ interface بتاع أنجولار لكلاس بيعمل validation.' } },
      { n:'validate', k:'ng', w:{ en:'The one method <code>Validator</code> requires. Fixed name.', ar:'الميثود الوحيدة اللي <code>Validator</code> بيطلبها. اسمها ثابت.' } },
      { n:'AbstractControl', k:'ng', w:{ en:'Angular’s base type for every form control.', ar:'النوع الأساسي بتاع أنجولار لأي form control.' } },
      { n:'ValidationErrors', k:'ng', w:{ en:'Angular’s type for the error object.', ar:'النوع بتاع أنجولار لـ object الأخطاء.' } },
      { n:'value', k:'ng', re:'(?<=control\\.)value', w:{ en:'<code>control.value</code>: the form control’s own value, Angular’s property.', ar:'<code>control.value</code>: قيمة الـ form control نفسه، property بتاعة أنجولار.' } },
      { n:'providers', k:'ng', w:{ en:'An option key Angular reads.', ar:'مفتاح إعداد أنجولار بيقراه.' } },
      { n:'provide', k:'ng', w:{ en:'A provider key: which token is being supplied.', ar:'مفتاح في الـ provider: أنهي token بيتقدّم.' } },
      { n:'useExisting', k:'ng', w:{ en:'A provider key: “use the instance that already exists”, this component.', ar:'مفتاح في الـ provider: «استخدم النسخة اللي موجودة»، اللي هي الـ component ده.' } },
      { n:'multi', k:'ng', w:{ en:'A provider key: add to a list instead of replacing it.', ar:'مفتاح في الـ provider: ضيف على ليستة بدل ما تبدّلها.' } },
      { n:'forwardRef', k:'ng', w:{ en:'Angular’s function for pointing at the class from inside its own decorator.', ar:'الـ function بتاعة أنجولار اللي بتشاور على الكلاس من جوه الـ decorator بتاعه.' } },
      { n:'formControlName', k:'ng', w:{ en:'Angular’s directive that connects a tag to one control of the group.', ar:'الـ directive بتاع أنجولار اللي بيربط تاج بكنترول واحد في الـ group.' } },
      { n:'formGroup', k:'ng', w:{ en:'Angular’s directive that connects a <code>&lt;form&gt;</code> to a group.', ar:'الـ directive بتاع أنجولار اللي بيربط <code>&lt;form&gt;</code> بـ group.' } },
      { n:'ReactiveFormsModule', k:'ng', w:{ en:'Angular’s module with the reactive form directives.', ar:'الـ module بتاع أنجولار اللي فيه directives الـ reactive forms.' } },
      { n:'FormBuilder', k:'ng', w:{ en:'Angular’s helper service for building forms.', ar:'السيرفس المساعدة بتاعة أنجولار لبناء الفورمز.' } },
      { n:'nonNullable', k:'ng', w:{ en:'A <code>FormBuilder</code> property: controls that reset to their initial value, not <code>null</code>.', ar:'property في <code>FormBuilder</code>: كنترولز بترجع لقيمتها الأولانية مع الـ reset، مش <code>null</code>.' } },
      { n:'group', k:'ng', w:{ en:'The <code>FormBuilder</code> method that makes a group. The keys inside are yours.', ar:'ميثود <code>FormBuilder</code> اللي بتعمل group. المفاتيح اللي جواها بتاعتك.' } },
      { n:'Validators', k:'ng', w:{ en:'Angular’s ready-made validators.', ar:'الـ validators الجاهزة بتاعة أنجولار.' } },
      { n:'required', k:'ng', w:{ en:'A built-in validator.', ar:'validator جاهز.' } },
      { n:'min', k:'ng', w:{ en:'A built-in validator.', ar:'validator جاهز.' } },
      { n:'getRawValue', k:'ng', w:{ en:'A form method: all values, including disabled controls.', ar:'ميثود في الفورم: كل القيم، حتى الكنترولز المقفولة.' } },
      { n:'hasError', k:'ng', w:{ en:'A form method: does this control have this error key?', ar:'ميثود في الفورم: الكنترول ده عنده مفتاح الـ error ده؟' } },
      { n:'invalid', k:'ng', w:{ en:'A form property.', ar:'property في الفورم.' } },
      { n:'ngSubmit', k:'ng', w:{ en:'Angular’s form submit event.', ar:'الـ event بتاع أنجولار لإرسال الفورم.' } },
      { n:'input', k:'ng', re:'(?<![\\w$<(-])input(?=[.(<,])', w:{ en:'Angular’s function that creates an input.', ar:'الـ function بتاعة أنجولار اللي بتعمل input.' } },
      { n:'@Input', k:'ng', w:{ en:'The older input decorator.', ar:'الـ decorator القديم للـ input.' } },
      { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
      { n:'set', k:'ng', w:{ en:'A signal method.', ar:'ميثود في الـ signal.' } },
      { n:'inject', k:'ng', w:{ en:'Angular’s function that hands you a service.', ar:'الـ function بتاعة أنجولار اللي بتديك service.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator.', ar:'الـ decorator بتاع أنجولار.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The string after it is yours.', ar:'مفتاح إعداد. النص اللي بعده بتاعك.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key.', ar:'مفتاح إعداد.' } },
      { n:'imports', k:'ng', w:{ en:'An option key: what the template uses.', ar:'مفتاح إعداد: الحاجات اللي التمبلت بيستخدمها.' } },
      { n:'click', k:'ng', w:{ en:'The browser’s event name.', ar:'اسم الـ event بتاع المتصفح.' } },
      { n:'blur', k:'ng', w:{ en:'The browser’s event: focus left the element.', ar:'الـ event بتاع المتصفح: الـ focus ساب الـ element.' } },
      { n:'slice', k:'ng', w:{ en:'JavaScript’s array method.', ar:'ميثود الـ array بتاعة JavaScript.' } },
      { n:'@for', k:'ng', w:{ en:'Angular’s loop block.', ar:'بلوك اللوب بتاع أنجولار.' } },
      { n:'@if', k:'ng', w:{ en:'Angular’s condition block.', ar:'بلوك الشرط بتاع أنجولار.' } },
      { n:'track', k:'ng', w:{ en:'Part of <code>@for</code>.', ar:'جزء من <code>@for</code>.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'A value in, a click out, seven stops', ar: 'قيمة داخلة، وكليك خارجة، سبع محطات' },
    lead: {
      en: 'A profile form with a name and a star rating. The form owns the number. The star rating only shows it and reports clicks. Follow the value into the stars, then a click back out:',
      ar: 'فورم بروفايل فيه اسم وتقييم بالنجوم. الفورم هو صاحب الرقم. والتقييم بس بيعرضه وبيبلّغ عن الكليكات. امشي ورا القيمة لحد النجوم، وبعدين كليك راجعة:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'profile.ts', lang: 'ts', who: { en: 'form page · owns the value', ar: 'صفحة الفورم · صاحبة القيمة' },
          code: ['rating: [0, Validators.min(1)],'],
          say: { en: `The form owns the number. ${mine('rating')} is a control name you picked on the form page. ${ng('Validators')} and ${ng('min')} are Angular’s.`,
                 ar: `الفورم هو صاحب الرقم. و${mine('rating')} اسم كنترول انت اخترته في صفحة الفورم. و${ng('Validators')} و${ng('min')} بتوع أنجولار.` } },
        { file: 'profile.html', lang: 'html', who: { en: 'form page · connects', ar: 'صفحة الفورم · بتربط' },
          code: ['<app-star-rating formControlName="rating" [max]="5" />'],
          say: { en: `${ng('formControlName')} is Angular’s directive, and the string after it must match the key ${mine('rating')}. ${pub('app-star-rating')} and ${pub('max')} belong to the star rating. Notice: the star rating is <b>never told</b> the control is called “rating”.`,
                 ar: `${ng('formControlName')} directive بتاع أنجولار، والنص اللي بعده لازم يطابق المفتاح ${mine('rating')}. و${pub('app-star-rating')} و${pub('max')} بتوع التقييم. خلي بالك: التقييم <b>عمره ما بيتقاله</b> إن الكنترول اسمه «rating».` } },
        { file: 'star-rating.ts', lang: 'ts', who: { en: 'rating · registers', ar: 'التقييم · بيسجّل نفسه' },
          code: ['providers: [{', '  provide: NG_VALUE_ACCESSOR,', '  useExisting: forwardRef(() => StarRating),', '  multi: true,', '}],'],
          say: { en: `How ${ng('formControlName')} finds your component: it asks for ${ng('NG_VALUE_ACCESSOR')}. Every word here is Angular’s except ${pub('StarRating')}, your class.`,
                 ar: `ده إزاي ${ng('formControlName')} بيلاقي الـ component بتاعك: بيطلب ${ng('NG_VALUE_ACCESSOR')}. كل كلمة هنا بتاعة أنجولار ما عدا ${pub('StarRating')}، الكلاس بتاعك.` } },
        { file: 'star-rating.ts', lang: 'ts', who: { en: 'rating · receives', ar: 'التقييم · بيستقبل' },
          code: ['writeValue(v: number | null): void {', '  this.value.set(v ?? 0);', '}'],
          say: { en: `The form pushes 0 in. You wrote this method, but ${ng('writeValue')} is a name the interface chose: the form calls it by that name. ${mine('v')} and ${mine('value')} are yours.`,
                 ar: `الفورم بيدخّل 0. انت اللي كتبت الميثود دي، بس ${ng('writeValue')} اسم الـ interface هو اللي اختاره: الفورم بيناديها بالاسم ده. و${mine('v')} و${mine('value')} بتوعك.` } },
        { file: 'star-rating.ts', lang: 'ts', who: { en: 'rating · keeps a callback', ar: 'التقييم · بيحتفظ بـ callback' },
          code: ['registerOnChange(fn: (v: number) => void): void {', '  this.onChange = fn;', '}'],
          say: { en: `Once, at the start, the form hands you a function: “call this when the value changes”. ${ng('registerOnChange')} is Angular’s name. Where you keep the function, ${mine('onChange')}, is entirely your choice.`,
                 ar: `مرة واحدة في الأول، الفورم بيدّيك function: «ناديني لما القيمة تتغير». ${ng('registerOnChange')} اسم أنجولار. والمكان اللي بتحفظ فيه الـ function، ${mine('onChange')}، اختيارك انت خالص.` } },
        { file: 'star-rating.html', lang: 'html', who: { en: 'rating · the user clicks', ar: 'التقييم · المستخدم بيدوس' },
          code: ['<button type="button" (click)="pick(n)" (blur)="onTouched()">★</button>'],
          say: { en: `${ng('click')} and ${ng('blur')} are the browser’s. ${mine('pick')} is your method, ${mine('n')} your loop variable, and ${mine('onTouched')} is the other callback you stored.`,
                 ar: `${ng('click')} و${ng('blur')} بتوع المتصفح. و${mine('pick')} الميثود بتاعتك، و${mine('n')} متغير اللوب بتاعك، و${mine('onTouched')} الـ callback التاني اللي خزّنته.` } },
        { file: 'star-rating.ts', lang: 'ts', who: { en: 'rating · reports out', ar: 'التقييم · بيبلّغ لبرّه' },
          code: ['protected pick(n: number) {', '  this.value.set(n);', '  this.onChange(n);', '  this.onTouched();', '}'],
          say: { en: `Now you call the form’s functions, by <b>your</b> names for them. After ${mine('onChange')}<code>(n)</code>, the form’s ${mine('rating')} holds 4.`,
                 ar: `دلوقتي انت بتنادي الـ functions بتاعة الفورم، بالأسماء <b>بتاعتك</b> ليها. بعد ${mine('onChange')}<code>(n)</code>، الـ ${mine('rating')} بتاع الفورم بقى فيه 4.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'Angular calls <b>your</b> methods by <b>its</b> names (<code>writeValue</code>, <code>registerOnChange</code>…). You call <b>its</b> functions by <b>your</b> names (<code>onChange</code>, <code>onTouched</code>). The control name <code>rating</code> lives only on the form page.',
        ar: 'أنجولار بينادي ميثودز <b>انت</b> كاتبها بأسماء <b>هو</b> اختارها (<code>writeValue</code> و<code>registerOnChange</code>…). وانت بتنادي functions <b>بتاعته</b> بأسماء <b>انت</b> اخترتها (<code>onChange</code> و<code>onTouched</code>). واسم الكنترول <code>rating</code> عايش في صفحة الفورم بس.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Form page or control?', ar: 'صفحة الفورم ولا الكنترول؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'The control and the form page share almost nothing: a selector, an input, and a class name. Everything else is either Angular’s or private to one side.',
      ar: 'الكنترول وصفحة الفورم متشاركين في حاجات قليلة جدًا: selector، وinput، واسم كلاس. أي حاجة تانية يا إما بتاعة أنجولار، يا إما خاصة بناحية واحدة.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'], ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>writeValue(v) { … }</code> and the other three', 'control', 'control (the body)', `<b>Angular</b> picks ${ng('writeValue')}; you pick ${mine('v')}`],
            ar: ['<code>writeValue(v) { … }</code> والتلاتة التانيين', 'الكنترول', 'الكنترول (اللي جوه)', `<b>أنجولار</b> بيختار ${ng('writeValue')}؛ وانت بتختار ${mine('v')}`] },
          { en: ['<code>private onChange = …</code>', 'control', 'control', `you pick ${mine('onChange')}; Angular never reads it`],
            ar: ['<code>private onChange = …</code>', 'الكنترول', 'الكنترول', `انت بتختار ${mine('onChange')}؛ وأنجولار عمره ما بيقراه`] },
          { en: ['<code>{ provide: NG_VALUE_ACCESSOR, … }</code>', 'control', 'control', `Angular, except ${pub('StarRating')}`],
            ar: ['<code>{ provide: NG_VALUE_ACCESSOR, … }</code>', 'الكنترول', 'الكنترول', `أنجولار، ما عدا ${pub('StarRating')}`] },
          { en: ['<code>readonly max = input(5)</code>', 'control', 'control', `you pick ${pub('max')}; the form page copies it`],
            ar: ['<code>readonly max = input(5)</code>', 'الكنترول', 'الكنترول', `انت بتختار ${pub('max')}؛ وصفحة الفورم بتنسخه`] },
          { en: ['<code>rating: [0, …]</code>', 'form page <code>.ts</code>', 'form page', `you pick ${mine('rating')} on the form page`],
            ar: ['<code>rating: [0, …]</code>', '<code>.ts</code> صفحة الفورم', 'صفحة الفورم', `انت بتختار ${mine('rating')} في صفحة الفورم`] },
          { en: ['<code>formControlName="rating"</code>', 'form page <code>.html</code>', 'form page', `${ng('formControlName')} is Angular’s; the string copies ${mine('rating')}`],
            ar: ['<code>formControlName="rating"</code>', '<code>.html</code> صفحة الفورم', 'صفحة الفورم', `${ng('formControlName')} بتاع أنجولار؛ والنص بينسخ ${mine('rating')}`] },
        ] },
      { t: 'ul',
        en: ['<b>Methods the form calls have Angular’s names. Functions you call have your names.</b> That one sentence explains every name in the class.',
             '<b>The control never knows its control name.</b> The same star rating can be <code>rating</code> in one form and <code>quality</code> in another.',
             '<b>The value lives in the form, not in your component.</b> Your <code>value</code> signal is only a copy for display. The form learns about changes only through the <code>onChange</code> you call.'],
        ar: ['<b>الميثودز اللي الفورم بيناديها أسماءها من أنجولار. والـ functions اللي انت بتناديها أسماءها منك.</b> الجملة دي لوحدها بتشرح كل اسم في الكلاس.',
             '<b>الكنترول عمره ما بيعرف اسم الكنترول بتاعه.</b> نفس التقييم ممكن يبقى <code>rating</code> في فورم و<code>quality</code> في فورم تاني.',
             '<b>القيمة عايشة في الفورم، مش في الـ component بتاعك.</b> الـ signal <code>value</code> بتاعتك مجرد نسخة للعرض. والفورم بيعرف بالتغييرات بس عن طريق الـ <code>onChange</code> اللي انت بتناديها.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All four files, every name coloured', ar: 'الأربع ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same star rating and form page, complete. Press <b>Rename test</b>: <code>onChange</code> and <code>pick</code> turn into made-up words, and the four interface methods do not move.',
      ar: 'نفس التقييم وصفحة الفورم، كاملين. دوس <b>جرّب تغيّر الأسماء</b>: <code>onChange</code> و<code>pick</code> هيبقوا كلمات عشوائية، والأربع ميثودز بتوع الـ interface مش هيتحركوا.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'star-rating.ts', lang: 'ts', tag: { en: 'the control', ar: 'الكنترول' }, code: [
        "import { Component, forwardRef, input, signal } from '@angular/core';",
        "import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';",
        '',
        '@Component({',
        "  selector: 'app-star-rating',",
        "  templateUrl: './star-rating.html',",
        '  providers: [{',
        '    provide: NG_VALUE_ACCESSOR,',
        '    useExisting: forwardRef(() => StarRating),',
        '    multi: true,',
        '  }],',
        '})',
        'export class StarRating implements ControlValueAccessor {',
        '  readonly max = input(5);',
        '',
        '  protected readonly value = signal(0);',
        '  protected readonly disabled = signal(false);',
        '',
        '  // Angular hands you these two; you only store and call them',
        '  private onChange: (v: number) => void = () => {};',
        '  protected onTouched: () => void = () => {};',
        '',
        '  // the four methods: bodies yours, names fixed by the interface',
        '  writeValue(v: number | null): void {',
        '    this.value.set(v ?? 0);',
        '  }',
        '  registerOnChange(fn: (v: number) => void): void {',
        '    this.onChange = fn;',
        '  }',
        '  registerOnTouched(fn: () => void): void {',
        '    this.onTouched = fn;',
        '  }',
        '  setDisabledState(isDisabled: boolean): void {',
        '    this.disabled.set(isDisabled);',
        '  }',
        '',
        '  // your own method: the user picked n stars',
        '  protected pick(n: number) {',
        '    this.value.set(n);',
        '    this.onChange(n);',
        '    this.onTouched();',
        '  }',
        '}' ] },
      { t: 'code', name: 'star-rating.html', lang: 'html', tag: { en: 'the control', ar: 'الكنترول' }, code: [
        '@for (n of [1, 2, 3, 4, 5].slice(0, max()); track n) {',
        '  <button type="button"',
        '          [class.on]="n <= value()"',
        '          [disabled]="disabled()"',
        '          (click)="pick(n)"',
        '          (blur)="onTouched()">★</button>',
        '}' ] },
      { t: 'code', name: 'profile.ts', lang: 'ts', tag: { en: 'the form page', ar: 'صفحة الفورم' }, code: [
        "import { Component, inject } from '@angular/core';",
        "import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';",
        "import { StarRating } from './star-rating';",
        '',
        '@Component({',
        "  selector: 'app-profile',",
        '  imports: [ReactiveFormsModule, StarRating],',
        "  templateUrl: './profile.html',",
        '})',
        'export class Profile {',
        '  private readonly fb = inject(FormBuilder);',
        '',
        '  protected readonly form = this.fb.nonNullable.group({',
        "    name: ['', Validators.required],",
        '    rating: [0, Validators.min(1)],',
        '  });',
        '',
        '  protected save() {',
        '    console.log(this.form.getRawValue());',
        '  }',
        '}' ] },
      { t: 'code', name: 'profile.html', lang: 'html', tag: { en: 'the form page', ar: 'صفحة الفورم' }, code: [
        '<form [formGroup]="form" (ngSubmit)="save()">',
        '  <input formControlName="name" />',
        '  <app-star-rating formControlName="rating" [max]="5" />',
        '  <button [disabled]="form.invalid">Save</button>',
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
      en: 'Most renames here are compile errors or harmless. Two are not: the control name, which fails at runtime, and <code>setDisabledState</code>, which fails silently.',
      ar: 'أغلب التغييرات هنا يا compile error يا مالهاش أي ضرر. اتنين بس لأ: اسم الكنترول، وده بيفشل وقت التشغيل، و<code>setDisabledState</code>، ودي بتفشل في صمت.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'], ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [`${ng('writeValue')}, ${ng('registerOnChange')}, ${ng('registerOnTouched')}`, 'you cannot: the forms module calls these names', 'With <code>implements ControlValueAccessor</code>: compile error, the class no longer fulfils the interface.'],
            ar: [`${ng('writeValue')} و${ng('registerOnChange')} و${ng('registerOnTouched')}`, 'مينفعش: الـ forms module بينادي الأسماء دي', 'مع <code>implements ControlValueAccessor</code>: compile error، الكلاس مبقاش بينفّذ الـ interface.'] },
          { en: [ng('setDisabledState'), 'you cannot', '<b>No error.</b> It is optional in the interface, so a misspelled one is just an extra method. <code>disable()</code> stops working.'],
            ar: [ng('setDisabledState'), 'مينفعش', '<b>مفيش error.</b> هي اختيارية في الـ interface، فلو اتكتبت غلط تبقى مجرد ميثود زيادة. و<code>disable()</code> بتبطل تشتغل.'] },
          { en: [mine('rating') + ' (control name)', '<code>formControlName="rating"</code> on the form page', '<b>Runtime error</b>: “Cannot find control with name: ’rating’”.'],
            ar: [mine('rating') + ' (اسم كنترول)', '<code>formControlName="rating"</code> في صفحة الفورم', '<b>Runtime error</b>: «Cannot find control with name: ’rating’».'] },
          { en: [`${mine('onChange')}, ${mine('onTouched')}`, 'every use inside the class, and <code>(blur)="onTouched()"</code>', 'Compile error.'],
            ar: [`${mine('onChange')} و${mine('onTouched')}`, 'كل مكان بيستخدمهم جوه الكلاس، و<code>(blur)="onTouched()"</code>', 'Compile error.'] },
          { en: [`${mine('value')}, ${mine('disabled')}, ${mine('pick')}`, 'the class and its own template', 'Compile error.'],
            ar: [`${mine('value')} و${mine('disabled')} و${mine('pick')}`, 'الكلاس والتمبلت بتاعه', 'Compile error.'] },
          { en: [`${mine('v')}, ${mine('fn')}, ${mine('isDisabled')}, ${mine('n')}`, 'only inside that method', 'Compile error right there.'],
            ar: [`${mine('v')} و${mine('fn')} و${mine('isDisabled')} و${mine('n')}`, 'جوه الميثود دي بس', 'Compile error في نفس المكان.'] },
          { en: [`${pub('StarRating')}, ${pub('app-star-rating')}, ${pub('max')}`, '<code>forwardRef</code>, the form page’s <code>imports</code>, its tag and <code>[max]</code>', 'Compile error.'],
            ar: [`${pub('StarRating')} و${pub('app-star-rating')} و${pub('max')}`, '<code>forwardRef</code>، و<code>imports</code> بتاعة صفحة الفورم، والتاج و<code>[max]</code>', 'Compile error.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b> and look at <code>registerOnChange(fn) { this.onChange = fn; }</code>. Both green names change, the blue method name stays. That line is the whole idea of this page.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b> وبص على <code>registerOnChange(fn) { this.onChange = fn; }</code>. الاسمين الخضر بيتغيروا، واسم الميثود الأزرق بيفضل مكانه. السطر ده هو فكرة الصفحة كلها.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتوعك' },
    title: { en: 'Four method names you write but do not own', ar: 'أربع أسماء ميثودز بتكتبها ومش بتاعتك' },
    lead: {
      en: 'Usually, if you write a method, you name it. Here the forms module calls these four from outside, so the interface decided their names in advance.',
      ar: 'عادةً، لو انت كاتب ميثود، انت اللي بتسمّيها. هنا الـ forms module بينادي الأربعة دول من برّه، فالـ interface حدد أسماءهم من الأول.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Method', 'Called by', 'When'], ar: ['الميثود', 'مين بيناديها', 'إمتى'] },
        rows: [
          { en: [ng('writeValue'), 'the form', 'At the start, and on <code>setValue</code>, <code>patchValue</code> and <code>reset</code>.'],
            ar: [ng('writeValue'), 'الفورم', 'في الأول، ومع <code>setValue</code> و<code>patchValue</code> و<code>reset</code>.'] },
          { en: [ng('registerOnChange'), 'the form', 'Once, while connecting. It hands you the “value changed” function.'],
            ar: [ng('registerOnChange'), 'الفورم', 'مرة واحدة، وقت الربط. بيدّيك function «القيمة اتغيرت».'] },
          { en: [ng('registerOnTouched'), 'the form', 'Once, while connecting. It hands you the “touched” function.'],
            ar: [ng('registerOnTouched'), 'الفورم', 'مرة واحدة، وقت الربط. بيدّيك function «اتلمس».'] },
          { en: [ng('setDisabledState'), 'the form', 'When the control is disabled or enabled.'],
            ar: [ng('setDisabledState'), 'الفورم', 'لما الكنترول يتقفل أو يتفتح.'] },
          { en: [mine('onChange') + ', ' + mine('onTouched'), '<b>you</b>', 'Whenever the user changes something, or leaves the control.'],
            ar: [mine('onChange') + ' و' + mine('onTouched'), '<b>انت</b>', 'كل ما المستخدم يغيّر حاجة، أو يسيب الكنترول.'] },
        ] },
      { t: 'p',
        en: `The provider object is Angular’s vocabulary too: ${ng('provide')}, ${ng('useExisting')} and ${ng('multi')} are keys Angular reads, ${ng('NG_VALUE_ACCESSOR')} is the token ${ng('formControlName')} asks for, and ${ng('forwardRef')} lets you mention ${pub('StarRating')} inside its own decorator. The only word you own in that block is the class name.`,
        ar: `object الـ provider برضه كلمات أنجولار: ${ng('provide')} و${ng('useExisting')} و${ng('multi')} مفاتيح أنجولار بيقراها، و${ng('NG_VALUE_ACCESSOR')} الـ token اللي ${ng('formControlName')} بيطلبه، و${ng('forwardRef')} بيخليك تذكر ${pub('StarRating')} جوه الـ decorator بتاعه. والكلمة الوحيدة اللي بتاعتك في البلوك ده هي اسم الكلاس.` },
      { t: 'note', label: { en: 'Remember', ar: 'افتكر' },
        en: '<code>[disabled]</code> on the button and your <code>disabled</code> signal are two different names that happen to match. The first is the DOM’s; the second you could call <code>locked</code>.',
        ar: '<code>[disabled]</code> اللي على الزرار والـ signal <code>disabled</code> بتاعتك اسمين مختلفين صادف إنهم زي بعض. الأول بتاع الـ DOM؛ والتاني ممكن تسمّيه <code>locked</code>.' }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'Nothing here is enforced. These are the names almost every custom control uses, so a reader recognises the pattern at once.',
      ar: 'ولا حاجة هنا إجبارية. دي الأسماء اللي تقريبًا كل كنترول custom بيستخدمها، فاللي بيقرا يعرف النمط على طول.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['the stored callbacks', '<code>onChange</code>, <code>onTouched</code>', '<code>cb1</code>, <code>changeFn2</code>', 'The names almost every example uses, including Angular’s own built-in accessors.'],
            ar: ['الـ callbacks المتخزّنة', '<code>onChange</code> و<code>onTouched</code>', '<code>cb1</code> و<code>changeFn2</code>', 'الأسماء اللي تقريبًا كل مثال بيستخدمها، حتى الـ accessors الجاهزة بتاعة أنجولار نفسها.'] },
          { en: ['the callback parameter', '<code>fn</code>', '<code>onChange</code>', 'Naming the parameter like the field makes <code>this.onChange = onChange</code>, which is easy to get backwards.'],
            ar: ['الـ parameter بتاع الـ callback', '<code>fn</code>', '<code>onChange</code>', 'لو سمّيت الـ parameter زي الـ field هيبقى عندك <code>this.onChange = onChange</code>، وسهل تقلبها بالغلط.'] },
          { en: ['the display copy', '<code>value</code>, <code>stars</code>', '<code>formValue</code>, <code>model</code>', 'It is only what you show. Do not suggest it is the form’s value.'],
            ar: ['النسخة اللي للعرض', '<code>value</code> و<code>stars</code>', '<code>formValue</code> و<code>model</code>', 'دي بس اللي بتعرضه. متوحيش إنها قيمة الفورم.'] },
          { en: ['the control name', '<code>rating</code>', '<code>starRatingControl</code>, <code>ctrl1</code>', 'Name the data, not the widget. The same data could later use a different control.'],
            ar: ['اسم الكنترول', '<code>rating</code>', '<code>starRatingControl</code> و<code>ctrl1</code>', 'سمّي الداتا، مش الـ widget. نفس الداتا ممكن بعدين تستخدم كنترول تاني.'] },
          { en: ['your own method', '<code>pick</code>, <code>select</code>', '<code>onClick</code>, <code>writeValue2</code>', 'Name what the user did. Never reuse an interface method name for your own logic.'],
            ar: ['الميثود بتاعتك', '<code>pick</code> و<code>select</code>', '<code>onClick</code> و<code>writeValue2</code>', 'سمّي اللي المستخدم عمله. وعمرك ما تستخدم اسم ميثود من الـ interface للّوجيك بتاعك.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Interfaces, tokens and error keys', ar: 'الـ interfaces والـ tokens ومفاتيح الأخطاء' },
    lead: {
      en: 'Three rules decide names for you here: the interface, the provider token, and the error key your validator returns.',
      ar: 'فيه تلات قواعد بتحدد الأسماء بدالك هنا: الـ interface، والـ token بتاع الـ provider، ومفتاح الـ error اللي الـ validator بتاعك بيرجّعه.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: '<code>implements</code> turns a typo into an error', ar: '<code>implements</code> بتحوّل الغلطة الإملائية لـ error' }, blocks: [
        { t: 'p', en: `Without <code>implements ControlValueAccessor</code>, the forms module still calls ${ng('writeValue')} by name, and a misspelled method just is not found. With it, TypeScript checks the three required names at compile time. It cannot check ${ng('setDisabledState')}, because that one is optional.`,
                  ar: `من غير <code>implements ControlValueAccessor</code>، الـ forms module برضه بينادي ${ng('writeValue')} بالاسم، والميثود المكتوبة غلط ببساطة مش بتتلاقي. ومعاها، TypeScript بيشيّك على التلات أسماء المطلوبين وقت الـ compile. بس مايقدرش يشيّك على ${ng('setDisabledState')}، عشان دي اختيارية.` }
      ]},
      { t: 'step', n: 'B', title: { en: 'The provider is how the name <code>formControlName</code> finds you', ar: 'الـ provider هو اللي بيخلي <code>formControlName</code> يلاقيك' }, blocks: [
        { t: 'p', en: `Forget the ${ng('NG_VALUE_ACCESSOR')} provider and the page compiles, then fails at runtime with “No value accessor for form control name: ’rating’”. Keep ${ng('multi')}<code>: true</code> as well: the forms module expects a list of accessors under that token.`,
                  ar: `لو نسيت الـ provider بتاع ${ng('NG_VALUE_ACCESSOR')} الصفحة بتعمل compile، وبعدين بتفشل وقت التشغيل بـ «No value accessor for form control name: ’rating’». وخلّي ${ng('multi')}<code>: true</code> كمان: الـ forms module مستني ليستة accessors تحت الـ token ده.` }
      ]},
      { t: 'step', n: 'C', title: { en: 'A control that validates itself', ar: 'كنترول بيعمل validation لنفسه' }, blocks: [
        { t: 'code', name: 'star-rating.ts · validates', lang: 'ts', tag: { en: 'the control', ar: 'الكنترول' }, code: [
          'providers: [',
          '  { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => StarRating), multi: true },',
          '  { provide: NG_VALIDATORS, useExisting: forwardRef(() => StarRating), multi: true },',
          '],',
          '',
          'export class StarRating implements ControlValueAccessor, Validator {',
          '  validate(control: AbstractControl): ValidationErrors | null {',
          '    return control.value >= 1 ? null : { noStars: true };',
          '  }',
          '}' ] },
        { t: 'code', name: 'profile.html · shows the error', lang: 'html', tag: { en: 'the form page', ar: 'صفحة الفورم' }, code: [
          "@if (form.hasError('noStars', 'rating')) {",
          '  <p>Pick at least one star.</p>',
          '}' ] },
        { t: 'p', en: `${ng('validate')} is fixed by the ${ng('Validator')} interface. ${mine('control')} is your parameter name, but ${ng('value')} on it is Angular’s. The error key ${pub('noStars')} is yours, and the form page types it as a string, so rename both together. A mismatch is silent: the message just never shows.`,
                  ar: `${ng('validate')} ثابتة من الـ interface ${ng('Validator')}. و${mine('control')} اسم الـ parameter بتاعك، بس ${ng('value')} اللي عليه بتاعة أنجولار. ومفتاح الـ error ${pub('noStars')} بتاعك، وصفحة الفورم بتكتبه كنص، فغيّر الاتنين مع بعض. ولو ماطابقوش مفيش صوت: الرسالة ببساطة عمرها ما بتظهر.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: 'Plain fields and <code>@Input()</code>: same four names', ar: 'fields عادية و<code>@Input()</code>: نفس الأربع أسماء' },
    lead: {
      en: 'Older controls keep their state in plain fields. The interface, the provider and the four method names are identical. Only how you store and read your own state changes.',
      ar: 'الكنترولز الأقدم بتحفظ الحالة في fields عادية. الـ interface والـ provider والأربع أسماء ميثودز زي ما هما بالظبط. اللي بيتغير بس طريقة حفظ وقراية الحالة بتاعتك.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'star-rating.ts — older style', lang: 'ts', code: [
          'export class StarRating implements ControlValueAccessor {',
          '  @Input() max = 5;',
          '  value = 0;',
          '  disabled = false;',
          '',
          '  writeValue(v: number | null): void {',
          '    this.value = v ?? 0;',
          '  }',
          '}' ] },
        good: { name: 'star-rating.ts — today', lang: 'ts', code: [
          'export class StarRating implements ControlValueAccessor {',
          '  readonly max = input(5);',
          '  protected readonly value = signal(0);',
          '  protected readonly disabled = signal(false);',
          '',
          '  writeValue(v: number | null): void {',
          '    this.value.set(v ?? 0);',
          '  }',
          '}' ] } },
      { t: 'p',
        en: 'In the old style the template reads <code>value</code>; today it reads <code>value()</code>. The same control also works with template-driven forms: <code>[(ngModel)]</code> calls exactly the same four methods.',
        ar: 'في الأسلوب القديم التمبلت بيقرا <code>value</code>؛ النهارده بيقرا <code>value()</code>. ونفس الكنترول بيشتغل كمان مع الـ template-driven forms: <code>[(ngModel)]</code> بينادي نفس الأربع ميثودز بالظبط.' }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, and says nothing', ar: 'مش بيعمل حاجة، ومش بيقول حاجة' },
    title: { en: 'Mistakes that fail silently', ar: 'غلطات بتفشل في صمت' },
    lead: {
      en: 'The stars light up, so it looks fine. These four mistakes are only visible in the form’s value, its state, or an unexpected submit.',
      ar: 'النجوم بتنوّر، فشكله تمام. الأربع غلطات دول بيبانوا بس في قيمة الفورم، أو في حالته، أو في submit مش متوقع.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'Never calling <code>onChange</code>', ar: 'إنك عمرك ما تنادي <code>onChange</code>' }, blocks: [
        { t: 'pair',
          bad:  { name: 'star-rating.ts', lang: 'ts', code: ['protected pick(n: number) {', '  this.value.set(n);', '}'] },
          good: { name: 'star-rating.ts', lang: 'ts', code: ['protected pick(n: number) {', '  this.value.set(n);', '  this.onChange(n);', '}'] } },
        { t: 'p', en: 'The stars change because your own signal changed. The form never heard about it: <code>rating</code> stays 0, the <code>min(1)</code> validator keeps the form invalid, and Save stays disabled.',
                  ar: 'النجوم بتتغير عشان الـ signal بتاعتك اتغيرت. والفورم عمره ما سمع: <code>rating</code> بيفضل 0، والـ validator <code>min(1)</code> بيخلّي الفورم invalid، وزرار Save بيفضل مقفول.' }
      ]},
      { t: 'step', n: '2', title: { en: 'A misspelled <code>setDisabledState</code>', ar: '<code>setDisabledState</code> مكتوبة غلط' }, blocks: [
        { t: 'pair',
          bad:  { name: 'star-rating.ts', lang: 'ts', code: ['setDisabled(isDisabled: boolean): void {', '  this.disabled.set(isDisabled);', '}'] },
          good: { name: 'star-rating.ts', lang: 'ts', code: ['setDisabledState(isDisabled: boolean): void {', '  this.disabled.set(isDisabled);', '}'] } },
        { t: 'p', en: 'Because the method is optional, <code>implements</code> does not catch this. <code>form.disable()</code> disables the control inside the form, but nobody tells your component, and the stars stay clickable.',
                  ar: 'عشان الميثود اختيارية، <code>implements</code> مش بتمسك دي. <code>form.disable()</code> بتقفل الكنترول جوه الفورم، بس محدش بيقول للـ component بتاعك، والنجوم بتفضل تتداس.' }
      ]},
      { t: 'step', n: '3', title: { en: 'Reporting back from <code>writeValue</code>', ar: 'إنك تبلّغ راجع من جوه <code>writeValue</code>' }, blocks: [
        { t: 'pair',
          bad:  { name: 'star-rating.ts', lang: 'ts', code: ['writeValue(v: number | null): void {', '  this.value.set(v ?? 0);', '  this.onChange(v ?? 0);', '}'] },
          good: { name: 'star-rating.ts', lang: 'ts', code: ['writeValue(v: number | null): void {', '  this.value.set(v ?? 0);', '', '}'] } },
        { t: 'p', en: '<code>writeValue</code> is the form talking to <b>you</b>. Calling <code>onChange</code> there tells the form the user changed it, so after <code>patchValue</code> or <code>reset</code> the control is marked dirty although nobody touched it.',
                  ar: '<code>writeValue</code> ده الفورم بيكلّمك <b>انت</b>. لو ناديت <code>onChange</code> هناك بتقول للفورم إن المستخدم غيّر القيمة، فبعد <code>patchValue</code> أو <code>reset</code> الكنترول بيتعلّم إنه dirty ومحدش لمسه.' }
      ]},
      { t: 'step', n: '4', title: { en: 'Buttons without <code>type="button"</code>', ar: 'زراير من غير <code>type="button"</code>' }, blocks: [
        { t: 'pair',
          bad:  { name: 'star-rating.html', lang: 'html', code: ['<button (click)="pick(n)" (blur)="onTouched()">★</button>'] },
          good: { name: 'star-rating.html', lang: 'html', code: ['<button type="button" (click)="pick(n)" (blur)="onTouched()">★</button>'] } },
        { t: 'p', en: 'Inside a <code>&lt;form&gt;</code>, a button submits by default. Without <code>type="button"</code>, every star click also fires <code>(ngSubmit)</code> on the profile page, and <code>save()</code> runs when the user only wanted to rate.',
                  ar: 'جوه <code>&lt;form&gt;</code>، الزرار بيعمل submit افتراضيًا. من غير <code>type="button"</code>، كل كليك على نجمة بتشغّل كمان <code>(ngSubmit)</code> في صفحة البروفايل، و<code>save()</code> بتشتغل والمستخدم كان عايز يقيّم بس.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it does nothing', ar: 'لما مايعملش حاجة' },
    title: { en: 'Five questions, in this order', ar: 'خمس أسئلة، بالترتيب ده' },
    lead: {
      en: 'The control shows one thing and the form holds another. Ask these first.',
      ar: 'الكنترول بيعرض حاجة والفورم ماسك حاجة تانية. اسأل دول الأول.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Is <code>NG_VALUE_ACCESSOR</code> provided, with <code>useExisting</code> pointing at your class and <code>multi: true</code>?',
                  ar: '<b>1.</b> <code>NG_VALUE_ACCESSOR</code> متعمله provide، و<code>useExisting</code> بيشاور على الكلاس بتاعك، و<code>multi: true</code>؟' },
      { t: 'chk', en: '<b>2.</b> Does <code>formControlName</code> match a key in the form group exactly?',
                  ar: '<b>2.</b> <code>formControlName</code> مطابق لمفتاح في الـ form group بالظبط؟' },
      { t: 'chk', en: '<b>3.</b> Does your code call <code>onChange(…)</code> every time the user changes the value? Log <code>form.getRawValue()</code> to check.',
                  ar: '<b>3.</b> الكود بتاعك بينادي <code>onChange(…)</code> كل ما المستخدم يغيّر القيمة؟ اطبع <code>form.getRawValue()</code> وشوف.' },
      { t: 'chk', en: '<b>4.</b> Does <code>writeValue</code> update what the template shows, so <code>patchValue</code> and <code>reset</code> appear on screen?',
                  ar: '<b>4.</b> <code>writeValue</code> بتحدّث اللي التمبلت بيعرضه، عشان <code>patchValue</code> و<code>reset</code> يبانوا على الشاشة؟' },
      { t: 'chk', en: '<b>5.</b> Disabling does nothing? Check the spelling of <code>setDisabledState</code> letter by letter.',
                  ar: '<b>5.</b> القفل مش بيعمل حاجة؟ راجع كتابة <code>setDisabledState</code> حرف حرف.' }
    ]
  }
  ]
};
