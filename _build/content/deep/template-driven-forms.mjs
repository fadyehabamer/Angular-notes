/* ==================================================================
   Template-driven forms, name by name — the companion page after the
   template-driven-forms topic. One running example (a contact form)
   followed from typing to sending, with every name coloured by who
   owns it. The star of the page is one input line that contains the
   word "email" five times, meaning five different things.
   Names list: inline below.
   ================================================================== */

/* a name in running text, coloured like the code and linked on hover */
const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

const REFWRONG = 'contact.html · ref without ngModel';

export default {
  topic: 'template-driven-forms',
  tab: 'ngModel forms, name by name — The Angular Signal',
  title: { en: '<code>ngModel</code> forms, name by name', ar: 'فورمز <code>ngModel</code>، اسم اسم' },
  say: {
    en: 'The page for when a form line like <code>name="email" [(ngModel)]="model.email" #email="ngModel"</code> makes your head spin. One contact form, every name coloured, and the proof that the five <code>email</code>s on one line are five different things.',
    ar: 'الصفحة دي للي بيدوخ من سطر فورم زي <code>name="email" [(ngModel)]="model.email" #email="ngModel"</code>. فورم تواصل واحد، وكل اسم ملوّن، والدليل إن الخمس <code>email</code> اللي في سطر واحد خمس حاجات مختلفة.'
  },
  lead: {
    en: 'The idea of a template-driven form is simple: <b>you write normal inputs, add <code>ngModel</code>, and Angular builds the form object for you.</b> The confusing part is the names. One input line can say <code>email</code> five times. Some are the browser’s, one is Angular’s validator, and the rest are yours, but you chose the same word for all of them. This page pulls them apart.',
    ar: 'فكرة الفورم اللي من التمبلت بسيطة: <b>بتكتب inputs عادية، وتضيف <code>ngModel</code>، وأنجولار بيبني الفورم object بدالك.</b> اللي بيلخبط هو الأسماء. سطر input واحد ممكن يقول <code>email</code> خمس مرات. شوية بتوع المتصفح، وواحدة الـ validator بتاع أنجولار، والباقي بتوعك، بس انت اخترت نفس الكلمة ليهم كلهم. الصفحة دي بتفكّهم عن بعض.'
  },

  names: {
    note: {
      en: 'Some rows here are labelled with where the word sits, like <code>name=\'email\'</code> or <code>email (validator)</code>, because the same spelling means different things. Hover a word in the code: only the places that must change <b>together</b> light up.',
      ar: 'فيه صفوف هنا متسمّية بمكان الكلمة، زي <code>name=\'email\'</code> أو <code>email (validator)</code>، عشان نفس الكتابة معناها حاجات مختلفة. قف بالماوس على كلمة في الكود: الأماكن اللي لازم تتغير <b>مع بعض</b> بس هي اللي هتنوّر.'
    },
    names: [
      /* --- shared: two files must agree --- */
      { n:'email', k:'pub', re:'(?<=model\\.)email(?![\\w$-])|(?<=^\\s*|[{,]\\s*)email(?=\\s*:)',
        w:{ en:'A field of your data type <code>ContactMessage</code>. The interface, the starting object and <code>model.email</code> in the template must agree. This is the value that gets sent.',
            ar:'field في نوع الداتا بتاعك <code>ContactMessage</code>. الـ interface، والـ object اللي بتبدأ بيه، و<code>model.email</code> في التمبلت لازم يتفقوا. ودي القيمة اللي بتتبعت.' } },
      { n:'message', k:'pub', re:'(?<=model\\.)message(?![\\w$-])|(?<=^\\s*|[{,]\\s*)message(?=\\s*:)',
        w:{ en:'A field of <code>ContactMessage</code>, bound with <code>model.message</code>.', ar:'field في <code>ContactMessage</code>، مربوط بـ <code>model.message</code>.' } },
      { n:'ContactMessage', k:'pub', w:{ en:'Your data type, shared by the form and the API service.', ar:'نوع الداتا بتاعك، متشارك بين الفورم والـ API service.' } },
      { n:'ContactApi', k:'pub', w:{ en:'Your service’s class. The form injects it by this name.', ar:'كلاس الـ service بتاعتك. الفورم بيعملها inject بالاسم ده.' } },
      { n:'sendMessage', k:'pub', w:{ en:'Your service method. The form calls it.', ar:'ميثود الـ service بتاعتك. الفورم بيناديها.' } },
      { n:'Contact', k:'pub', w:{ en:'The form component’s class. Whoever shows it imports it by this name.', ar:'كلاس الـ component بتاع الفورم. أي حد بيعرضه بيعمله import بالاسم ده.' } },
      { n:'app-contact', k:'pub', w:{ en:'The selector: the tag a parent types.', ar:'الـ selector: التاج اللي الأب بيكتبه.' } },
      { n:'err', k:'pub', w:{ en:'Your CSS class. The template and the stylesheet must use the same word.', ar:'الـ CSS class بتاعتك. التمبلت والـ stylesheet لازم يستخدموا نفس الكلمة.' } },

      /* --- yours, private to one component --- */
      { n:"name='email'", k:'mine', re:'(?<=name=")email(?=")',
        w:{ en:'The control’s name: its key inside the form (<code>f.value.email</code>). It happens to be the same word as the data field, but it is a separate name. It must be unique inside one form.',
            ar:'اسم الـ control: المفتاح بتاعه جوه الفورم (<code>f.value.email</code>). صدفة إنه نفس كلمة الـ field بتاع الداتا، بس هو اسم منفصل. ولازم يبقى مش متكرر جوه الفورم الواحد.' } },
      { n:"name='message'", k:'mine', re:'(?<=name=")message(?=")',
        w:{ en:'The message control’s key inside the form.', ar:'مفتاح الـ control بتاع الرسالة جوه الفورم.' } },
      { n:'#email', k:'mine', as:'pigeon', re:'(?<=#)email(?![\\w$-])|(?<![\\w$.#"\'\\[-])email(?=\\.(?:touched|invalid|errors))',
        w:{ en:'A template reference to that input’s <code>ngModel</code>, so you can ask <code>email.touched</code>. Rename <code>#email</code> and every <code>email.</code> after it; nothing else.',
            ar:'template reference للـ <code>ngModel</code> بتاع الـ input ده، عشان تسأل <code>email.touched</code>. غيّر <code>#email</code> وكل <code>email.</code> بعده؛ ومفيش حاجة تانية.' } },
      { n:'#msg', k:'mine', as:'parrot', re:'(?<=#)msg(?![\\w$-])|(?<![\\w$.#"\'-])msg(?=\\.)',
        w:{ en:'A template reference to the message’s <code>ngModel</code>. It does not have to match the control name.', ar:'template reference للـ <code>ngModel</code> بتاع الرسالة. مش لازم يطابق اسم الـ control.' } },
      { n:'f', k:'mine',
        w:{ en:'The template reference to the whole form, passed into <code>send(f)</code>.', ar:'الـ template reference للفورم كله، وبيتبعت لـ <code>send(f)</code>.' } },
      { n:'form', k:'mine', re:'(?<![\\w$.<\\/-])form(?![\\w$-])',
        w:{ en:'The method’s parameter. It receives <code>f</code> from the template, under a different name. The <code>&lt;form&gt;</code> tag is the browser’s.',
            ar:'الـ parameter بتاع الميثود. بيستقبل <code>f</code> من التمبلت، باسم تاني. وتاج <code>&lt;form&gt;</code> بتاع المتصفح.' } },
      { n:'model', k:'mine', w:{ en:'The component’s plain object that <code>[(ngModel)]</code> reads and writes.', ar:'الـ object العادي بتاع الـ component اللي <code>[(ngModel)]</code> بيقرا منه ويكتب فيه.' } },
      { n:'send', k:'mine', w:{ en:'The component’s method, called by its own template.', ar:'ميثود الـ component، والتمبلت بتاعه هو اللي بيناديها.' } },
      { n:'sending', k:'mine', w:{ en:'The component’s own signal.', ar:'الـ signal بتاعة الـ component نفسه.' } },
      { n:'api', k:'mine', re:'(?<![\\w$\\/-])api(?![\\w$\\/-])', w:{ en:'The field you store <code>ContactApi</code> in. <code>/api/</code> in the URL is the server’s path.', ar:'الـ field اللي بتحط فيه <code>ContactApi</code>. و<code>/api/</code> في الـ URL مسار السيرفر.' } },
      { n:'http', k:'mine', re:'(?<![\\w$\\/-])http(?![\\w$-])', w:{ en:'The field you store <code>HttpClient</code> in.', ar:'الـ field اللي بتحط فيه <code>HttpClient</code>.' } },
      { n:'body', k:'mine', w:{ en:'The service method’s parameter.', ar:'الـ parameter بتاع ميثود الـ service.' } },

      /* --- Angular's, the browser's --- */
      { n:'ngModel', k:'ng', w:{ en:'Angular’s directive, and also its export name in <code>#email="ngModel"</code>.', ar:'الـ directive بتاع أنجولار، وكمان اسم الـ export بتاعه في <code>#email="ngModel"</code>.' } },
      { n:'ngForm', k:'ng', w:{ en:'The export name of Angular’s form directive. <code>#f="ngForm"</code> means “put Angular’s form object in <code>f</code>”.', ar:'اسم الـ export بتاع directive الفورم في أنجولار. <code>#f="ngForm"</code> معناها «حط الفورم object بتاع أنجولار في <code>f</code>».' } },
      { n:'NgForm', k:'ng', w:{ en:'Angular’s type for that form object.', ar:'الـ type بتاع أنجولار للفورم object ده.' } },
      { n:'.form', k:'ng', re:'(?<=form\\.)form(?![\\w$-])', w:{ en:'A property of <code>NgForm</code>: the <code>FormGroup</code> inside it. In <code>form.form</code> the first word is yours, the second is Angular’s.', ar:'property في <code>NgForm</code>: الـ <code>FormGroup</code> اللي جواه. في <code>form.form</code> الكلمة الأولى بتاعتك، والتانية بتاعة أنجولار.' } },
      { n:'ngSubmit', k:'ng', w:{ en:'Angular’s form event.', ar:'الـ event بتاع أنجولار للفورم.' } },
      { n:'name', k:'ng', re:'(?<![\\w$.#"-])name(?==)', w:{ en:'The HTML <code>name</code> attribute. Inside a <code>&lt;form&gt;</code>, <code>ngModel</code> refuses to work without it. Its value is yours.', ar:'الـ attribute <code>name</code> بتاع HTML. جوه <code>&lt;form&gt;</code>، <code>ngModel</code> مش بيرضى يشتغل من غيره. وقيمته بتاعتك.' } },
      { n:"type='email'", k:'ng', re:'(?<=type=")email(?=")', w:{ en:'The browser’s input type: a keyboard with <code>@</code> on phones. Not Angular, not yours.', ar:'نوع الـ input بتاع المتصفح: كيبورد فيه <code>@</code> على الموبايل. مش أنجولار، ومش بتاعك.' } },
      { n:'email (validator)', k:'ng', re:'(?<=required )email(?=[\\s>])|(?<=\\[\')email(?=\'\\])',
        w:{ en:'The bare <code>email</code> attribute is Angular’s email validator, and <code>errors?.[\'email\']</code> is the fixed error key it sets.', ar:'الـ attribute <code>email</code> لوحده ده الـ validator بتاع أنجولار للإيميل، و<code>errors?.[\'email\']</code> مفتاح الـ error الثابت اللي بيحطه.' } },
      { n:'required', k:'ng', w:{ en:'Angular’s validator attribute, and the fixed error key it sets.', ar:'attribute الـ validator بتاع أنجولار، ومفتاح الـ error الثابت اللي بيحطه.' } },
      { n:'minlength', k:'ng', w:{ en:'Angular’s validator attribute, and its fixed error key. All lower case, in both places.', ar:'attribute الـ validator بتاع أنجولار، ومفتاح الـ error الثابت بتاعه. كله حروف صغيرة، في المكانين.' } },
      { n:'touched', k:'ng', w:{ en:'A state every control has: true once it was focused and left.', ar:'حالة موجودة في أي control: بتبقى true لما يتعمله focus ويتساب.' } },
      { n:'invalid', k:'ng', w:{ en:'A state every control and form has.', ar:'حالة موجودة في أي control وأي فورم.' } },
      { n:'errors', k:'ng', w:{ en:'The object where each failing validator puts its fixed key.', ar:'الـ object اللي كل validator فاشل بيحط فيه مفتاحه الثابت.' } },
      { n:'markAllAsTouched', k:'ng', w:{ en:'A form method from Angular: show every error now.', ar:'ميثود فورم من أنجولار: وري كل الأخطاء دلوقتي.' } },
      { n:'resetForm', k:'ng', w:{ en:'An <code>NgForm</code> method: clear the values and the touched/submitted state.', ar:'ميثود في <code>NgForm</code>: امسح القيم وحالة الـ touched والـ submitted.' } },
      { n:'FormsModule', k:'ng', w:{ en:'Angular’s package of <code>ngModel</code> and <code>ngForm</code>.', ar:'الـ package بتاعة أنجولار اللي فيها <code>ngModel</code> و<code>ngForm</code>.' } },
      { n:'ng-invalid', k:'ng', w:{ en:'A CSS class Angular adds by itself. You style it; you do not name it.', ar:'CSS class أنجولار بيحطها لوحده. انت بتستايلها؛ مش بتسمّيها.' } },
      { n:'ng-touched', k:'ng', w:{ en:'A CSS class Angular adds by itself.', ar:'CSS class أنجولار بيحطها لوحده.' } },
      { n:'disabled', k:'ng', w:{ en:'The button’s own DOM property.', ar:'الـ property بتاعة الزرار نفسه في الـ DOM.' } },
      { n:'HttpClient', k:'ng', w:{ en:'Angular’s HTTP service.', ar:'الـ service بتاعة أنجولار للـ HTTP.' } },
      { n:'post', k:'ng', w:{ en:'An <code>HttpClient</code> method.', ar:'ميثود في <code>HttpClient</code>.' } },
      { n:'firstValueFrom', k:'ng', w:{ en:'RxJS’s function that turns the request into a Promise you can <code>await</code>.', ar:'function من RxJS بتحوّل الطلب لـ Promise تقدر تعمله <code>await</code>.' } },
      { n:'inject', k:'ng', w:{ en:'Angular’s function that hands you a service.', ar:'الـ function بتاعة أنجولار اللي بتديك service.' } },
      { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
      { n:'set', k:'ng', w:{ en:'A signal method.', ar:'ميثود بتاعة الـ signal.' } },
      { n:'@Injectable', k:'ng', w:{ en:'Angular’s decorator for a service.', ar:'الـ decorator بتاع أنجولار للـ service.' } },
      { n:'providedIn', k:'ng', w:{ en:'An option key Angular reads.', ar:'مفتاح إعداد أنجولار بيقراه.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator.', ar:'الـ decorator بتاع أنجولار.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The string after it is yours.', ar:'مفتاح إعداد. النص اللي بعده بتاعك.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key pointing at your template.', ar:'مفتاح إعداد بيشاور على التمبلت بتاعك.' } },
      { n:'styleUrl', k:'ng', w:{ en:'An option key pointing at your stylesheet.', ar:'مفتاح إعداد بيشاور على الـ stylesheet بتاعك.' } },
      { n:'imports', k:'ng', w:{ en:'An option key: what this template uses.', ar:'مفتاح إعداد: الحاجات اللي التمبلت ده بيستخدمها.' } },
      { n:'@if', k:'ng', w:{ en:'Angular’s condition block.', ar:'بلوك الشرط بتاع أنجولار.' } },
      { n:'*ngIf', k:'ng', w:{ en:'The older condition directive.', ar:'الـ directive القديم للشرط.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One message, five stops', ar: 'رسالة واحدة، خمس محطات' },
    lead: {
      en: 'A contact form: an email and a message, and a Send button. Follow one message from the first keystroke to the server:',
      ar: 'فورم تواصل: إيميل ورسالة، وزرار Send. امشي ورا رسالة واحدة من أول حرف لحد السيرفر:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'contact.html', lang: 'html', who: { en: 'template · the input', ar: 'التمبلت · الـ input' },
          code: ['<input name="email" type="email" [(ngModel)]="model.email" required email #email="ngModel">'],
          say: { en: `The user types. Read the line left to right: ${ng('name')}<code>="email"</code> is the control’s key (<b>yours</b>). <code>type="email"</code> is the <b>browser’s</b>. ${ng('ngModel')} copies what is typed into ${mine('model')}<code>.</code>${pub('email')}, your data field. The bare <code>email</code> is <b>Angular’s</b> validator. <code>#email</code> is a <b>reference you named</b>. Same word, five owners.`,
                 ar: `المستخدم بيكتب. اقرا السطر من الشمال لليمين: ${ng('name')}<code>="email"</code> مفتاح الـ control (<b>بتاعك</b>). <code>type="email"</code> بتاع <b>المتصفح</b>. ${ng('ngModel')} بينسخ اللي بيتكتب في ${mine('model')}<code>.</code>${pub('email')}، الـ field بتاع الداتا بتاعتك. و<code>email</code> اللي لوحده ده الـ validator بتاع <b>أنجولار</b>. و<code>#email</code> <b>reference انت سمّيته</b>. نفس الكلمة، وخمس أصحاب.` } },
        { file: 'contact.html', lang: 'html', who: { en: 'template · the error', ar: 'التمبلت · الخطأ' },
          code: ["@if (email.touched && email.invalid) {", "  @if (email.errors?.['required']) { … }"],
          say: { en: `The user leaves the field empty. <code>email</code> here is your <code>#email</code> reference, not the data. ${ng('touched')}, ${ng('invalid')}, ${ng('errors')} and the key ${ng('required')} are Angular’s.`,
                 ar: `المستخدم ساب الخانة فاضية. <code>email</code> هنا هو الـ reference بتاعك <code>#email</code>، مش الداتا. و${ng('touched')} و${ng('invalid')} و${ng('errors')} والمفتاح ${ng('required')} بتوع أنجولار.` } },
        { file: 'contact.html', lang: 'html', who: { en: 'template · submit', ar: 'التمبلت · الإرسال' },
          code: ['<form #f="ngForm" (ngSubmit)="send(f)">'],
          say: { en: `The user presses Send. ${ng('ngSubmit')} is Angular’s event. ${mine('f')} is a name you gave the form; <code>"ngForm"</code> is Angular’s fixed word that means “the form object Angular built”. ${mine('send')} is your method.`,
                 ar: `المستخدم داس Send. ${ng('ngSubmit')} الـ event بتاع أنجولار. و${mine('f')} اسم انت اديته للفورم؛ و<code>"ngForm"</code> كلمة أنجولار الثابتة ومعناها «الفورم object اللي أنجولار بناه». و${mine('send')} الميثود بتاعتك.` } },
        { file: 'contact.ts', lang: 'ts', who: { en: 'class · checks', ar: 'الكلاس · بيتأكد' },
          code: ['async send(form: NgForm) {', '  if (form.invalid) {', '    form.form.markAllAsTouched();', '    return;', '  }'],
          say: { en: `The form arrives as a parameter, and you can call it anything: here ${mine('form')}, not <code>f</code>. In <code>form.form</code>, the first word is your parameter and the second (${ng('.form')}) is Angular’s property.`,
                 ar: `الفورم بيوصل كـ parameter، وتقدر تسمّيه أي حاجة: هنا ${mine('form')}، مش <code>f</code>. وفي <code>form.form</code>، الكلمة الأولى الـ parameter بتاعك والتانية (${ng('.form')}) property بتاعة أنجولار.` } },
        { file: 'contact.ts', lang: 'ts', who: { en: 'class · sends', ar: 'الكلاس · بيبعت' },
          code: ['await this.api.sendMessage(this.model);', 'form.resetForm();'],
          say: { en: `${mine('model')} already holds what the user typed, because ${ng('ngModel')} kept it up to date. ${pub('sendMessage')} is your service’s method. ${ng('resetForm')} is Angular’s.`,
                 ar: `${mine('model')} شايل خلاص اللي المستخدم كتبه، عشان ${ng('ngModel')} فضل يحدّثه. و${pub('sendMessage')} ميثود الـ service بتاعتك. و${ng('resetForm')} بتاعة أنجولار.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: '<code>name="email"</code> (the control’s key), <code>model.email</code> (your data) and <code>#email</code> (a handle for the template) are <b>three separate names you chose</b>. They are the same word only because that is easy to read. Change any one alone and the other two do not care.',
        ar: '<code>name="email"</code> (مفتاح الـ control)، و<code>model.email</code> (الداتا بتاعتك)، و<code>#email</code> (مسكة للتمبلت) <b>تلات أسماء منفصلة انت اخترتها</b>. هي نفس الكلمة بس عشان كده أسهل في القراية. غيّر واحد لوحده والاتنين التانيين مش هيفرق معاهم.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Template or class?', ar: 'التمبلت ولا الكلاس؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'In this kind of form almost everything lives in the template. The class holds one plain object and one method.',
      ar: 'في النوع ده من الفورمز تقريبًا كل حاجة عايشة في التمبلت. والكلاس شايل object عادي واحد وميثود واحدة.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>name="email"</code>', 'template', 'you', 'you pick the value; <code>name</code> itself is HTML’s'],
            ar: ['<code>name="email"</code>', 'التمبلت', 'انت', 'انت بتختار القيمة؛ و<code>name</code> نفسها بتاعة HTML'] },
          { en: ['<code>[(ngModel)]="model.email"</code>', 'template', 'you', `${ng('ngModel')} is Angular’s; you pick ${mine('model')} and ${pub('email')}`],
            ar: ['<code>[(ngModel)]="model.email"</code>', 'التمبلت', 'انت', `${ng('ngModel')} بتاع أنجولار؛ وانت بتختار ${mine('model')} و${pub('email')}`] },
          { en: ['<code>required email minlength="10"</code>', 'template', 'you add them', `Angular: ${ng('required')}, ${ng('minlength')} and the <code>email</code> validator`],
            ar: ['<code>required email minlength="10"</code>', 'التمبلت', 'انت بتضيفهم', `أنجولار: ${ng('required')} و${ng('minlength')} والـ validator <code>email</code>`] },
          { en: ['<code>#email="ngModel"</code>', 'template', 'you', 'you pick the left side; the right side must be <code>ngModel</code>'],
            ar: ['<code>#email="ngModel"</code>', 'التمبلت', 'انت', 'انت بتختار الناحية الشمال؛ والناحية اليمين لازم تبقى <code>ngModel</code>'] },
          { en: ['<code>#f="ngForm"</code>, <code>(ngSubmit)="send(f)"</code>', 'template', 'you', `you pick ${mine('f')} and ${mine('send')}; ${ng('ngForm')} and ${ng('ngSubmit')} are Angular’s`],
            ar: ['<code>#f="ngForm"</code>، <code>(ngSubmit)="send(f)"</code>', 'التمبلت', 'انت', `انت بتختار ${mine('f')} و${mine('send')}؛ و${ng('ngForm')} و${ng('ngSubmit')} بتوع أنجولار`] },
          { en: ['<code>model: ContactMessage = { … }</code>', 'class', 'you', `you pick ${mine('model')}; the fields come from ${pub('ContactMessage')}`],
            ar: ['<code>model: ContactMessage = { … }</code>', 'الكلاس', 'انت', `انت بتختار ${mine('model')}؛ والـ fields جاية من ${pub('ContactMessage')}`] },
          { en: ['<code>send(form: NgForm) { … }</code>', 'class', 'you', `you pick ${mine('send')} and ${mine('form')}; ${ng('NgForm')} is Angular’s type`],
            ar: ['<code>send(form: NgForm) { … }</code>', 'الكلاس', 'انت', `انت بتختار ${mine('send')} و${mine('form')}؛ و${ng('NgForm')} الـ type بتاع أنجولار`] },
        ] },
      { t: 'ul',
        en: ['<b>The class never sees the controls.</b> It only sees <code>model</code>, a plain object. Angular builds the controls from the template and keeps them to itself, unless you pass <code>f</code> in.',
             '<b>A <code>#reference</code> only exists in the template.</b> <code>#email</code> and <code>#f</code> cannot be used in the <code>.ts</code> file by name. To use one there, pass it as an argument, like <code>send(f)</code>.',
             '<b>Left of <code>=</code> is yours, right of <code>=</code> is Angular’s</b> in <code>#f="ngForm"</code> and <code>#email="ngModel"</code>.'],
        ar: ['<b>الكلاس عمره ما بيشوف الـ controls.</b> هو بيشوف <code>model</code> وبس، object عادي. أنجولار بيبني الـ controls من التمبلت وبيحتفظ بيهم لنفسه، إلا لو انت دخّلت <code>f</code>.',
             '<b>الـ <code>#reference</code> موجود في التمبلت بس.</b> <code>#email</code> و<code>#f</code> مينفعش تستخدمهم في ملف الـ <code>.ts</code> بالاسم. عشان تستخدم واحد هناك، ابعته كـ argument، زي <code>send(f)</code>.',
             '<b>شمال الـ <code>=</code> بتاعك، ويمين الـ <code>=</code> بتاع أنجولار</b> في <code>#f="ngForm"</code> و<code>#email="ngModel"</code>.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All four files, every name coloured', ar: 'الأربع ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same form, complete. Hover each <code>email</code> in the input line: they light up different places. Then press <b>Rename test</b>. The three names you own become three <b>different</b> made-up words, the browser’s and Angular’s <code>email</code> stay put, and the form still works.',
      ar: 'نفس الفورم، كامل. قف بالماوس على كل <code>email</code> في سطر الـ input: كل واحدة بتنوّر أماكن مختلفة. وبعدين دوس <b>جرّب تغيّر الأسماء</b>. التلات أسماء اللي بتوعك بيبقوا تلات كلمات عشوائية <b>مختلفة</b>، و<code>email</code> بتاعة المتصفح وبتاعة أنجولار بيفضلوا مكانهم، والفورم لسه شغال.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'contact-api.ts', lang: 'ts', tag: { en: 'the data and the service', ar: 'الداتا والـ service' }, code: [
        "import { Injectable, inject } from '@angular/core';",
        "import { HttpClient } from '@angular/common/http';",
        "import { firstValueFrom } from 'rxjs';",
        '',
        'export interface ContactMessage {',
        '  email: string;',
        '  message: string;',
        '}',
        '',
        "@Injectable({ providedIn: 'root' })",
        'export class ContactApi {',
        '  private readonly http = inject(HttpClient);',
        '',
        '  sendMessage(body: ContactMessage) {',
        "    return firstValueFrom(this.http.post<void>('/api/contact', body));",
        '  }',
        '}' ] },
      { t: 'code', name: 'contact.ts', lang: 'ts', tag: { en: 'the class', ar: 'الكلاس' }, code: [
        "import { Component, inject, signal } from '@angular/core';",
        "import { FormsModule, NgForm } from '@angular/forms';",
        "import { ContactApi, ContactMessage } from './contact-api';",
        '',
        '@Component({',
        "  selector: 'app-contact',",
        '  imports: [FormsModule],',
        "  templateUrl: './contact.html',",
        "  styleUrl: './contact.css',",
        '})',
        'export class Contact {',
        '  private readonly api = inject(ContactApi);',
        '  readonly sending = signal(false);',
        '',
        '  // a plain object. no FormGroup, no FormControl.',
        "  model: ContactMessage = { email: '', message: '' };",
        '',
        '  async send(form: NgForm) {',
        '    if (form.invalid) {',
        '      form.form.markAllAsTouched();   // show every error',
        '      return;',
        '    }',
        '    this.sending.set(true);',
        '    try {',
        '      await this.api.sendMessage(this.model);',
        '      form.resetForm();               // clear values and touched state',
        '    } finally {',
        '      this.sending.set(false);',
        '    }',
        '  }',
        '}' ] },
      { t: 'code', name: 'contact.html', lang: 'html', tag: { en: 'the template', ar: 'التمبلت' }, code: [
        '<form #f="ngForm" (ngSubmit)="send(f)">',
        '  <label>',
        '    Email',
        '    <input name="email" type="email" [(ngModel)]="model.email" required email #email="ngModel">',
        '  </label>',
        '  @if (email.touched && email.invalid) {',
        '    <p class="err">',
        "      @if (email.errors?.['required']) { We need it to reply. }",
        "      @else if (email.errors?.['email']) { That does not look like an address. }",
        '    </p>',
        '  }',
        '',
        '  <label>',
        '    Message',
        '    <textarea name="message" [(ngModel)]="model.message" required minlength="10" #msg="ngModel"></textarea>',
        '  </label>',
        "  @if (msg.touched && msg.errors?.['minlength']) {",
        '    <p class="err">At least 10 characters.</p>',
        '  }',
        '',
        '  <button [disabled]="f.invalid || sending()">Send</button>',
        '</form>' ] },
      { t: 'code', name: 'contact.css', lang: 'css', tag: { en: 'the styles', ar: 'الستايل' }, code: [
        '.err {',
        '  color: crimson;',
        '}',
        '',
        '/* classes Angular adds by itself */',
        'input.ng-invalid.ng-touched,',
        'textarea.ng-invalid.ng-touched {',
        '  border-color: crimson;',
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
      en: 'With strict template checking (the default in new projects), most renames you forget are compile errors. The control’s <code>name</code> value and the CSS class are the exceptions: they are plain strings.',
      ar: 'مع الـ strict template checking (الافتراضي في المشاريع الجديدة)، أغلب التغييرات اللي بتنساها compile errors. قيمة <code>name</code> بتاعة الـ control والـ CSS class هما الاستثناء: دول نصوص عادية.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: ['the value of <code>name="email"</code>', 'any code that reads <code>f.value.email</code> (none here)', '<b>No error.</b> <code>f.value</code> is loosely typed, so an old key just reads <code>undefined</code>.'],
            ar: ['قيمة <code>name="email"</code>', 'أي كود بيقرا <code>f.value.email</code> (مفيش هنا)', '<b>مفيش error.</b> <code>f.value</code> نوعه مش متحدد، فالمفتاح القديم بيقرا <code>undefined</code> وخلاص.'] },
          { en: [pub('email') + ' (the data field)', 'the interface, the starting object, <code>model.email</code> in the template', 'Compile error wherever the old name is still used.'],
            ar: [pub('email') + ' (field الداتا)', 'الـ interface، والـ object اللي بتبدأ بيه، و<code>model.email</code> في التمبلت', 'Compile error في كل مكان لسه بيستخدم الاسم القديم.'] },
          { en: ['<code>#email</code> (the reference)', 'every <code>email.touched</code>, <code>email.invalid</code>, <code>email.errors</code>', 'Compile error: the template looks for a class property called <code>email</code> and finds none.'],
            ar: ['<code>#email</code> (الـ reference)', 'كل <code>email.touched</code> و<code>email.invalid</code> و<code>email.errors</code>', 'Compile error: التمبلت بيدوّر على property في الكلاس اسمها <code>email</code> ومش لاقي.'] },
          { en: [mine('f') + ' (the form reference)', '<code>send(f)</code> and <code>f.invalid</code>', 'Compile error in the template.'],
            ar: [mine('f') + ' (reference الفورم)', '<code>send(f)</code> و<code>f.invalid</code>', 'Compile error في التمبلت.'] },
          { en: [`${mine('model')}, ${mine('send')}, ${mine('sending')}`, 'the class and the template', 'Compile error in the template.'],
            ar: [`${mine('model')}، ${mine('send')}، ${mine('sending')}`, 'الكلاس والتمبلت', 'Compile error في التمبلت.'] },
          { en: [mine('form') + ' (the parameter)', 'only inside <code>send()</code>', 'Compile error inside the method.'],
            ar: [mine('form') + ' (الـ parameter)', 'جوه <code>send()</code> بس', 'Compile error جوه الميثود.'] },
          { en: [pub('err') + ' (the CSS class)', 'the stylesheet', '<b>No error.</b> The message just loses its colour.'],
            ar: [pub('err') + ' (الـ CSS class)', 'الـ stylesheet', '<b>مفيش error.</b> الرسالة بس بتفقد لونها.'] },
          { en: [`${ng('ngModel')}, ${ng('ngForm')}, ${ng('required')}, ${ng('minlength')}, <code>email</code> (validator)`, 'nothing: you cannot rename these', 'They are Angular’s words.'],
            ar: [`${ng('ngModel')}، ${ng('ngForm')}، ${ng('required')}، ${ng('minlength')}، <code>email</code> (validator)`, 'ولا حاجة: دول مينفعش يتغيروا', 'دي كلمات أنجولار.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b> and look at the input line. <code>name="email"</code>, <code>model.email</code> and <code>#email</code> turn into three different words, because they are three different names. <code>type="email"</code> and the <code>email</code> validator do not move.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b> وبص على سطر الـ input. <code>name="email"</code> و<code>model.email</code> و<code>#email</code> بيبقوا تلات كلمات مختلفة، عشان هما تلات أسماء مختلفة. و<code>type="email"</code> والـ validator <code>email</code> مش بيتحركوا.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتوعك' },
    title: { en: 'The fixed names: HTML’s, the browser’s, Angular’s', ar: 'الأسماء الثابتة: بتاعة HTML والمتصفح وأنجولار' },
    lead: {
      en: 'Template-driven forms lean on words you already know from HTML, and Angular gives some of them extra meaning. That is why it is hard to tell whose word is whose.',
      ar: 'الفورمز اللي من التمبلت بتعتمد على كلمات انت عارفها من HTML، وأنجولار بيدي بعضها معنى زيادة. وعشان كده صعب تعرف كل كلمة بتاعة مين.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Word', 'Owner', 'What it does'], ar: ['الكلمة', 'صاحبها', 'بتعمل إيه'] },
        rows: [
          { en: ['<code>name</code>', 'HTML, required by Angular', 'Inside a form, <code>ngModel</code> uses it to register the control.'],
            ar: ['<code>name</code>', 'HTML، وأنجولار بيطلبها', 'جوه الفورم، <code>ngModel</code> بيستخدمها عشان يسجّل الـ control.'] },
          { en: ['<code>type="email"</code>', 'the browser', 'Changes the phone keyboard. It is not what shows your error message.'],
            ar: ['<code>type="email"</code>', 'المتصفح', 'بيغيّر كيبورد الموبايل. هو مش اللي بيطلّع رسالة الخطأ بتاعتك.'] },
          { en: ['<code>required</code>, <code>minlength</code>, <code>email</code>', 'HTML words, picked up by Angular', 'Angular turns them into validators and fills <code>errors</code> with the same keys.'],
            ar: ['<code>required</code>، <code>minlength</code>، <code>email</code>', 'كلمات HTML، وأنجولار بياخدها', 'أنجولار بيحوّلها validators وبيملا <code>errors</code> بنفس المفاتيح.'] },
          { en: ['<code>ngModel</code>, <code>ngForm</code>, <code>ngSubmit</code>', 'Angular', 'The two-way binding, the form object and its submit event.'],
            ar: ['<code>ngModel</code>، <code>ngForm</code>، <code>ngSubmit</code>', 'أنجولار', 'الربط في الاتجاهين، والفورم object، والـ event بتاع الإرسال.'] },
          { en: ['<code>touched</code>, <code>invalid</code>, <code>errors</code>, <code>resetForm</code>', 'Angular', 'State and methods on the control or form object.'],
            ar: ['<code>touched</code>، <code>invalid</code>، <code>errors</code>، <code>resetForm</code>', 'أنجولار', 'حالات وميثودز على الـ control أو الفورم object.'] },
          { en: ['<code>ng-invalid</code>, <code>ng-touched</code>, <code>ng-dirty</code>, …', 'Angular', 'CSS classes it puts on every control by itself. You style them, you never name them.'],
            ar: ['<code>ng-invalid</code>، <code>ng-touched</code>، <code>ng-dirty</code>، …', 'أنجولار', 'CSS classes بيحطها على كل control لوحده. انت بتستايلها، عمرك ما بتسمّيها.'] },
        ] },
      { t: 'note', label: { en: 'Remember', ar: 'افتكر' },
        en: 'The error keys are always <b>lower case</b>, exactly like the attributes: <code>errors?.[\'minlength\']</code>. Even in reactive forms, where the function is <code>Validators.minLength</code> with a capital L, the key it sets is still <code>minlength</code>.',
        ar: 'مفاتيح الأخطاء دايمًا <b>حروف صغيرة</b>، زي الـ attributes بالظبط: <code>errors?.[\'minlength\']</code>. حتى في الـ reactive forms، اللي الـ function فيها <code>Validators.minLength</code> بـ L كابيتال، المفتاح اللي بتحطه برضه <code>minlength</code>.' }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'Using the same word for the control, the field and the reference is normal and fine. These habits keep it readable, and tell you when to break the pattern.',
      ar: 'إنك تستخدم نفس الكلمة للـ control والـ field والـ reference ده عادي ومفيهوش مشكلة. العادات دي بتخليه مقروء، وبتقولك إمتى تكسر النمط.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['the control (<code>name</code>)', 'the same word as the field: <code>name="email"</code> for <code>model.email</code>', 'a different word for no reason', 'Then <code>f.value</code> has the same shape as your model.'],
            ar: ['الـ control (<code>name</code>)', 'نفس كلمة الـ field: <code>name="email"</code> لـ <code>model.email</code>', 'كلمة مختلفة من غير سبب', 'كده <code>f.value</code> بيبقى نفس شكل الموديل بتاعك.'] },
          { en: ['a reference to a control', '<code>#email</code>, or <code>#emailCtrl</code> if the same word confuses you', '<code>#x</code>, <code>#input1</code>', 'It is read as <code>email.touched</code>. The suffix makes clear it is the control, not the data.'],
            ar: ['reference لـ control', '<code>#email</code>، أو <code>#emailCtrl</code> لو نفس الكلمة بتلخبطك', '<code>#x</code>، <code>#input1</code>', 'بيتقري <code>email.touched</code>. واللاحقة بتوضّح إنه الـ control، مش الداتا.'] },
          { en: ['the form reference', '<code>#f</code>, <code>#contactForm</code>', '<code>#form</code>', '<code>#form</code> puts one more meaning on a word that is already the tag and, often, a parameter.'],
            ar: ['reference الفورم', '<code>#f</code>، <code>#contactForm</code>', '<code>#form</code>', '<code>#form</code> بيحط معنى زيادة على كلمة هي أصلًا التاج، وساعات parameter.'] },
          { en: ['the submit method', '<code>send</code>, <code>saveContact</code>', '<code>onSubmit</code>, <code>handleClick</code>', 'Angular’s style guide suggests naming event handlers for what they do, not for the event that triggers them.'],
            ar: ['ميثود الإرسال', '<code>send</code>، <code>saveContact</code>', '<code>onSubmit</code>، <code>handleClick</code>', 'دليل أنجولار بيقترح إنك تسمّي الـ event handlers باللي بتعمله، مش بالـ event اللي بيشغّلها.'] },
          { en: ['the model object', '<code>model</code>, <code>contact</code>', '<code>data</code>, <code>obj</code>', 'It is read on every input line, so a clear name pays off many times.'],
            ar: ['الـ object بتاع الموديل', '<code>model</code>، <code>contact</code>', '<code>data</code>، <code>obj</code>', 'بيتقري في كل سطر input، فالاسم الواضح بيفرق كتير.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Three places where the name is not free', ar: 'تلات أماكن الاسم فيها مش براحتك' },
    lead: {
      en: 'Most names on this page are yours. In these three spots, a rule decides.',
      ar: 'أغلب الأسماء في الصفحة دي بتاعتك. في التلات أماكن دول، فيه قاعدة هي اللي بتقرر.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'The right side of <code>#ref="…"</code>', ar: 'الناحية اليمين من <code>#ref="…"</code>' }, blocks: [
        { t: 'p',
          en: '<code>"ngModel"</code> and <code>"ngForm"</code> are export names Angular chose. They mean “give me the directive, not the element”. Left out, <code>#email</code> refers to the plain <code>&lt;input&gt;</code> element, which has no <code>touched</code> or <code>invalid</code>.',
          ar: '<code>"ngModel"</code> و<code>"ngForm"</code> أسماء export أنجولار اختارها. ومعناها «هاتلي الـ directive، مش العنصر». لو شلتها، <code>#email</code> بيشاور على عنصر <code>&lt;input&gt;</code> العادي، ومفيهوش <code>touched</code> ولا <code>invalid</code>.' }
      ]},
      { t: 'step', n: 'B', title: { en: 'The <code>name</code> attribute must exist, and be unique', ar: 'الـ attribute <code>name</code> لازم يبقى موجود، ومش متكرر' }, blocks: [
        { t: 'p',
          en: 'The value is yours, but inside a <code>&lt;form&gt;</code> it is required, and it is the control’s key. Two inputs with the same <code>name</code> end up registered under one key, so the form no longer sees them as two separate fields.',
          ar: 'القيمة بتاعتك، بس جوه <code>&lt;form&gt;</code> هي مطلوبة، وهي مفتاح الـ control. واتنين inputs بنفس الـ <code>name</code> بيتسجّلوا تحت مفتاح واحد، فالفورم مابقاش شايفهم كخانتين منفصلين.' }
      ]},
      { t: 'step', n: 'C', title: { en: 'Error keys and CSS classes', ar: 'مفاتيح الأخطاء والـ CSS classes' }, blocks: [
        { t: 'p',
          en: 'You only ever <b>read</b> these, so you cannot pick them: <code>errors?.[\'required\']</code>, <code>errors?.[\'minlength\']</code>, <code>errors?.[\'email\']</code>, and <code>.ng-invalid</code>, <code>.ng-touched</code> in CSS. A wrong spelling here is never an error; it is just never true.',
          ar: 'انت بس بـ<b>تقرا</b> دول، فمتقدرش تختارهم: <code>errors?.[\'required\']</code> و<code>errors?.[\'minlength\']</code> و<code>errors?.[\'email\']</code>، و<code>.ng-invalid</code> و<code>.ng-touched</code> في الـ CSS. والكتابة الغلط هنا عمرها ما بتبقى error؛ هي بس عمرها ما بتبقى true.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: '<code>*ngIf</code> and NgModules, same names', ar: '<code>*ngIf</code> والـ NgModules، نفس الأسماء' },
    lead: {
      en: 'Older templates show errors with <code>*ngIf</code>, and older apps import <code>FormsModule</code> in an NgModule instead of the component. Every form name is identical.',
      ar: 'التمبلتس الأقدم بتعرض الأخطاء بـ <code>*ngIf</code>، والتطبيقات الأقدم بتعمل import لـ <code>FormsModule</code> في NgModule بدل الـ component. وكل أسماء الفورم زي ما هي.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'contact.html — older style', lang: 'html', code: [
          '<p class="err" *ngIf="email.touched && email.invalid">',
          '  A valid email address, please.',
          '</p>' ] },
        good: { name: 'contact.html — today', lang: 'html', code: [
          '@if (email.touched && email.invalid) {',
          '  <p class="err">A valid email address, please.</p>',
          '}' ] } },
      { t: 'p',
        en: 'In a standalone component, <code>*ngIf</code> also needs <code>NgIf</code> in <code>imports</code>; <code>@if</code> needs nothing. The reference <code>email</code>, the class <code>err</code>, and <code>touched</code> / <code>invalid</code> are the same in both.',
        ar: 'في standalone component، <code>*ngIf</code> محتاجة كمان <code>NgIf</code> في <code>imports</code>؛ و<code>@if</code> مش محتاجة حاجة. والـ reference <code>email</code>، والـ class <code>err</code>، و<code>touched</code> / <code>invalid</code> زي ما هما في الاتنين.' }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, or it says something odd', ar: 'مش بيعمل حاجة، أو بيقول حاجة غريبة' },
    title: { en: 'Mistakes that fail silently or confusingly', ar: 'غلطات بتفشل في صمت أو بشكل ملخبط' },
    lead: {
      en: 'Forgetting <code>FormsModule</code> is loud: <code>[(ngModel)]</code> becomes a compile error. These five are the quiet or puzzling ones.',
      ar: 'نسيان <code>FormsModule</code> بيبان: <code>[(ngModel)]</code> بيبقى compile error. أما الخمسة دول فهما الهاديين أو المحيّرين.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'No <code>name</code> on an input inside a form', ar: 'مفيش <code>name</code> على input جوه فورم' }, blocks: [
        { t: 'pair',
          bad:  { name: 'contact.html', lang: 'html', code: ['<input type="email" [(ngModel)]="model.email" required>'] },
          good: { name: 'contact.html', lang: 'html', code: ['<input name="email" type="email" [(ngModel)]="model.email" required>'] } },
        { t: 'p', en: 'It compiles, then the page throws at runtime: inside a form tag, <code>ngModel</code> needs either a <code>name</code> or <code>[ngModelOptions]="{ standalone: true }"</code>. The message is long, but that is all it means.',
                  ar: 'بيعمل compile، وبعدين الصفحة بتضرب وقت التشغيل: جوه تاج form، <code>ngModel</code> محتاج يا إما <code>name</code> يا إما <code>[ngModelOptions]="{ standalone: true }"</code>. الرسالة طويلة، بس ده كل معناها.' }
      ]},
      { t: 'step', n: '2', title: { en: 'Square brackets without the round ones', ar: 'أقواس مربعة من غير المدورة' }, blocks: [
        { t: 'pair',
          bad:  { name: 'contact.html', lang: 'html', code: ['<input name="email" [ngModel]="model.email">'] },
          good: { name: 'contact.html', lang: 'html', code: ['<input name="email" [(ngModel)]="model.email">'] } },
        { t: 'p', en: '<code>[ngModel]</code> only copies the model <b>into</b> the input. Typing never flows back, so <code>model.email</code> stays empty and you send an empty message. The banana-in-a-box <code>[( )]</code> is what makes it two-way.',
                  ar: '<code>[ngModel]</code> بينسخ الموديل <b>جوه</b> الـ input بس. والكتابة عمرها ما بترجع، فـ <code>model.email</code> بيفضل فاضي وبتبعت رسالة فاضية. الموزة في العلبة <code>[( )]</code> هي اللي بتخليه في الاتجاهين.' }
      ]},
      { t: 'step', n: '3', title: { en: 'A reference without <code>="ngModel"</code>', ar: 'reference من غير <code>="ngModel"</code>' }, blocks: [
        { t: 'pair',
          bad:  { name: REFWRONG, lang: 'html', code: [
            '<input name="email" [(ngModel)]="model.email" required #email>',
            '@if (email.touched) { … }' ] },
          good: { name: 'contact.html', lang: 'html', code: [
            '<input name="email" [(ngModel)]="model.email" required #email="ngModel">',
            '@if (email.touched) { … }' ] } },
        { t: 'p', en: 'Without <code>="ngModel"</code>, <code>email</code> is the <code>&lt;input&gt;</code> element itself. The compiler then says something like “Property ‘touched’ does not exist on type ‘HTMLInputElement’”, which sounds unrelated. Add the export name.',
                  ar: 'من غير <code>="ngModel"</code>، <code>email</code> هو عنصر الـ <code>&lt;input&gt;</code> نفسه. والـ compiler ساعتها بيقول حاجة زي «Property ‘touched’ does not exist on type ‘HTMLInputElement’»، وده شكله ملوش علاقة. ضيف اسم الـ export.' }
      ]},
      { t: 'step', n: '4', title: { en: 'An error key with a capital letter', ar: 'مفتاح error فيه حرف كابيتال' }, blocks: [
        { t: 'pair',
          bad:  { name: 'contact.html', lang: 'html', code: ["@if (msg.errors?.['minLength']) { At least 10 characters. }"] },
          good: { name: 'contact.html', lang: 'html', code: ["@if (msg.errors?.['minlength']) { At least 10 characters. }"] } },
        { t: 'p', en: 'The key Angular sets is <code>minlength</code>. <code>minLength</code> is a different key that never exists, so the message never shows. No error, because <code>errors</code> accepts any string.',
                  ar: 'المفتاح اللي أنجولار بيحطه <code>minlength</code>. و<code>minLength</code> مفتاح تاني عمره ما بيبقى موجود، فالرسالة عمرها ما بتظهر. ومفيش error، عشان <code>errors</code> بيقبل أي نص.' }
      ]},
      { t: 'step', n: '5', title: { en: 'Two inputs with the same <code>name</code>', ar: 'اتنين inputs بنفس الـ <code>name</code>' }, blocks: [
        { t: 'pair',
          bad:  { name: 'contact.html', lang: 'html', code: [
            '<input name="email" [(ngModel)]="model.email">',
            '<textarea name="email" [(ngModel)]="model.message"></textarea>' ] },
          good: { name: 'contact.html', lang: 'html', code: [
            '<input name="email" [(ngModel)]="model.email">',
            '<textarea name="message" [(ngModel)]="model.message"></textarea>' ] } },
        { t: 'p', en: 'Usually a copy-paste slip. The form registers one control under <code>email</code>, and the two fields stop behaving like separate fields. No error is shown. Keep every <code>name</code> in a form unique.',
                  ar: 'غالبًا غلطة copy-paste. الفورم بيسجّل control واحد تحت <code>email</code>، والخانتين بيبطلوا يتصرفوا كخانتين منفصلين. ومفيش error بيظهر. خلي كل <code>name</code> في الفورم مش متكرر.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it does nothing', ar: 'لما مايعملش حاجة' },
    title: { en: 'Six questions, in this order', ar: 'ست أسئلة، بالترتيب ده' },
    lead: {
      en: 'Your form “does not work”: nothing binds, the error never shows, or the message arrives empty. Ask these first.',
      ar: 'الفورم بتاعك «مش شغال»: مفيش حاجة بتترابط، أو الخطأ عمره ما بيظهر، أو الرسالة بتوصل فاضية. اسأل دول الأول.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Is <code>FormsModule</code> in this component’s <code>imports</code>?',
                  ar: '<b>1.</b> <code>FormsModule</code> موجود في <code>imports</code> بتاعة الـ component ده؟' },
      { t: 'chk', en: '<b>2.</b> Does every <code>ngModel</code> inside the form have a <code>name</code>, and is each <code>name</code> unique?',
                  ar: '<b>2.</b> كل <code>ngModel</code> جوه الفورم ليه <code>name</code>، وكل <code>name</code> مش متكرر؟' },
      { t: 'chk', en: '<b>3.</b> Is it <code>[(ngModel)]</code>, with both kinds of brackets, and does it point at a real field like <code>model.email</code>?',
                  ar: '<b>3.</b> هو <code>[(ngModel)]</code>، بنوعين الأقواس، وبيشاور على field حقيقي زي <code>model.email</code>؟' },
      { t: 'chk', en: '<b>4.</b> Do your references say <code>="ngModel"</code> or <code>="ngForm"</code> on the right?',
                  ar: '<b>4.</b> الـ references بتاعتك كاتبة <code>="ngModel"</code> أو <code>="ngForm"</code> على اليمين؟' },
      { t: 'chk', en: '<b>5.</b> Are the error keys lower case and spelled like the attributes: <code>required</code>, <code>minlength</code>, <code>email</code>?',
                  ar: '<b>5.</b> مفاتيح الأخطاء حروف صغيرة ومكتوبة زي الـ attributes: <code>required</code>، <code>minlength</code>، <code>email</code>؟' },
      { t: 'chk', en: '<b>6.</b> Does the event say <code>(ngSubmit)</code>, and does the method it calls take the form you pass in?',
                  ar: '<b>6.</b> الـ event كاتب <code>(ngSubmit)</code>، والميثود اللي بينديها بتاخد الفورم اللي بتبعته؟' }
    ]
  }
  ]
};
