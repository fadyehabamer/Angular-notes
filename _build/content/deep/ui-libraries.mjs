/* ==================================================================
   Material and the CDK, name by name — a companion page after the UI
   libraries topic. One running example (a booking form with a date
   picker, a draggable guest list and a confirm dialog) followed
   through every file, with every name coloured by who owns it.
   Names list: inline.
   ================================================================== */

/* a name in running text, coloured like the code and linked on hover */
const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

const DLG = ['confirm-dialog.ts', 'confirm-dialog.ts — older style', 'confirm-dialog.ts — today'];

export default {
  topic: 'ui-libraries',
  tab: 'Material, name by name — The Angular Signal',
  title: { en: 'Angular Material, name by name', ar: 'Angular Material، اسم اسم' },
  say: {
    en: 'The page for when <code>mat-</code>, <code>Mat</code> and <code>cdk</code> words make it impossible to see your own code. One booking form followed from the Book button through a dialog and back, every name coloured: <b>the library’s</b>, <b>yours</b>, or <b>yours but shared</b>.',
    ar: 'الصفحة دي للي كلمات <code>mat-</code> و<code>Mat</code> و<code>cdk</code> مخلياه مش شايف الكود بتاعه. فورم حجز واحدة ماشيين وراها من زرار Book لحد الـ dialog ورجوع، وكل اسم ملوّن: <b>بتاع المكتبة</b>، ولا <b>بتاعك</b>، ولا <b>بتاعك بس متشارك</b>.'
  },
  lead: {
    en: 'The idea is simple: <b>the library gives you finished pieces, and you wire them to your own data.</b> The confusing part is the names. A Material template is mostly the library’s words, with a few of yours tucked in between: a <code>#picker</code>, a control name in quotes, a key inside <code>data</code>. Some of the library’s words even look like yours, like the output <code>cdkDropListDropped</code>. This page pulls them apart.',
    ar: 'الفكرة بسيطة: <b>المكتبة بتديك حتت جاهزة، وانت بتوصّلها بالداتا بتاعتك.</b> اللي بيلخبط هو الأسماء. تمبلت Material أغلبه كلمات المكتبة، وفي النص شوية كلمات بتاعتك: <code>#picker</code>، واسم control بين علامات تنصيص، ومفتاح جوه <code>data</code>. وفيه كلمات من المكتبة شكلها بتاعك كمان، زي الـ output <code>cdkDropListDropped</code>. الصفحة دي بتفصلهم عن بعض.'
  },

  names: {
    note: {
      en: 'Anything starting with <code>mat</code>, <code>Mat</code>, <code>MAT_</code> or <code>cdk</code> is the library’s, and so are the fields on <code>$event</code>. The orange names are the ones the booking form and the dialog both type. Two spellings, <code>data</code> and <code>checkIn</code>, deserve a second look: <code>data</code> is Material’s key in <code>open()</code> but your own field in the dialog, and <code>checkIn</code> appears once as a string that TypeScript cannot check.',
      ar: 'أي حاجة بتبدأ بـ <code>mat</code> أو <code>Mat</code> أو <code>MAT_</code> أو <code>cdk</code> بتاعة المكتبة، وكمان الحقول اللي على <code>$event</code>. الأسماء البرتقاني هي اللي فورم الحجز والـ dialog الاتنين بيكتبوها. وفيه كلمتين، <code>data</code> و<code>checkIn</code>، يستاهلوا نظرة تانية: <code>data</code> مفتاح Material في <code>open()</code> بس field بتاعك في الـ dialog، و<code>checkIn</code> ظاهر مرة كنص TypeScript مايقدرش يشيّك عليه.'
    },
    names: [
      /* --- shared --- */
      { n:'Booking', k:'pub', w:{ en:'The form component’s class. Whoever shows or routes to it imports this name.', ar:'كلاس component الفورم. أي حد بيعرضه أو بيعمله route بيعمل import للاسم ده.' } },
      { n:'app-booking', k:'pub', w:{ en:'The form’s selector. A parent template types this tag.', ar:'الـ selector بتاع الفورم. تمبلت الأب بيكتب التاج ده.' } },
      { n:'ConfirmDialog', k:'pub', w:{ en:'The dialog’s class. The form opens it by class, never by tag.', ar:'كلاس الـ dialog. الفورم بتفتحه بالكلاس، عمرها ما بتفتحه بالتاج.' } },
      { n:'ConfirmData', k:'pub', w:{ en:'Your type for what the dialog receives. Both files import it.', ar:'النوع بتاعك للي الـ dialog بيستقبله. الملفين بيعملوه import.' } },
      { n:'name', k:'pub', w:{ en:'A key inside <code>data</code>. The form writes it; the dialog reads <code>data.name</code>.', ar:'مفتاح جوه <code>data</code>. الفورم بتكتبه؛ والـ dialog بيقرا <code>data.name</code>.' } },

      /* --- yours, private --- */
      { n:'data', k:'mine', only: DLG, w:{ en:'In the dialog, your field holding what was sent. Any name works; <code>data</code> is only the habit.', ar:'في الـ dialog، الـ field بتاعك اللي شايل اللي اتبعت. أي اسم ينفع؛ <code>data</code> مجرد عادة.' } },
      { n:'app-confirm-dialog', k:'mine', w:{ en:'The dialog’s selector. Nobody types it as a tag, because the dialog is opened by class.', ar:'الـ selector بتاع الـ dialog. محدش بيكتبه كتاج، عشان الـ dialog بيتفتح بالكلاس.' } },
      { n:'dialog', k:'mine', only:['booking.ts', 'booking.ts — untyped', 'booking.ts — typed'], re:'(?<![\\w$/-])dialog(?![\\w$-])', w:{ en:'Your field holding <code>MatDialog</code>.', ar:'الـ field بتاعك اللي شايل <code>MatDialog</code>.' } },
      { n:'form', k:'mine', re:'(?<![\\w$<\\/-])form(?![\\w$-])', w:{ en:'Your <code>FormGroup</code> field. The <code>&lt;form&gt;</code> tag is HTML’s, not this.', ar:'الـ field بتاع الـ <code>FormGroup</code> بتاعك. وتاج <code>&lt;form&gt;</code> بتاع HTML، مش هو.' } },
      { n:'checkIn', k:'mine', w:{ en:'Your control’s name: a key in the <code>FormGroup</code>, a string in <code>formControlName</code>, a field in <code>form.controls</code>. All three must match.', ar:'اسم الـ control بتاعك: مفتاح في الـ <code>FormGroup</code>، ونص في <code>formControlName</code>، وfield في <code>form.controls</code>. التلاتة لازم يبقوا زي بعض.' } },
      { n:'picker', k:'mine', w:{ en:'Your template reference, <code>#picker</code>. The input and the toggle point to it by this name.', ar:'الـ template reference بتاعك، <code>#picker</code>. الـ input والـ toggle بيشاوروا عليه بالاسم ده.' } },
      { n:'guests', k:'mine', w:{ en:'Your signal holding the guest names.', ar:'الـ signal بتاعتك اللي شايلة أسماء الضيوف.' } },
      { n:'g', k:'mine', only:['booking.html'], w:{ en:'The loop variable.', ar:'متغير اللوب.' } },
      { n:'reorder', k:'mine', w:{ en:'Your method, called by the CDK’s output in your own template.', ar:'الميثود بتاعتك، والـ output بتاع الـ CDK في التمبلت بتاعك هو اللي بيناديها.' } },
      { n:'e', k:'mine', only:['ts'], w:{ en:'The parameter that receives <code>$event</code>. Any name works.', ar:'الـ parameter اللي بيستقبل <code>$event</code>. أي اسم ينفع.' } },
      { n:'list', k:'mine', w:{ en:'The arrow function’s parameter: the current array.', ar:'الـ parameter بتاع الـ arrow function: الـ array الحالية.' } },
      { n:'copy', k:'mine', w:{ en:'A local copy of the array.', ar:'نسخة محلية من الـ array.' } },
      { n:'confirm', k:'mine', w:{ en:'Your method, run when the form is submitted.', ar:'الميثود بتاعتك، بتشتغل لما الفورم يتبعت.' } },
      { n:'ref', k:'mine', w:{ en:'A local variable for the opened dialog.', ar:'متغير محلي للـ dialog اللي اتفتح.' } },
      { n:'ok', k:'mine', w:{ en:'A local variable for the dialog’s answer.', ar:'متغير محلي لرد الـ dialog.' } },
      { n:'save', k:'mine', w:{ en:'Your private method.', ar:'الميثود الخاصة بتاعتك.' } },

      /* --- the library's --- */
      { n:'@angular/material', k:'ng', w:{ en:'Angular Material’s package name. Every import path starts with it.', ar:'اسم باكدج Angular Material. أي مسار import بيبدأ بيه.' } },
      { n:'@angular/cdk', k:'ng', w:{ en:'The CDK’s package name.', ar:'اسم باكدج الـ CDK.' } },
      { n:'MatButtonModule', k:'ng', w:{ en:'Material’s button directives.', ar:'الـ directives بتوع زراير Material.' } },
      { n:'MatFormFieldModule', k:'ng', w:{ en:'Material’s form field.', ar:'الـ form field بتاع Material.' } },
      { n:'MatInputModule', k:'ng', w:{ en:'Material’s <code>matInput</code>.', ar:'الـ <code>matInput</code> بتاع Material.' } },
      { n:'MatDatepickerModule', k:'ng', w:{ en:'Material’s date picker.', ar:'الـ date picker بتاع Material.' } },
      { n:'MatDialogModule', k:'ng', w:{ en:'Material’s dialog directives.', ar:'الـ directives بتوع الـ dialog في Material.' } },
      { n:'MatDialog', k:'ng', w:{ en:'Material’s service that opens dialogs.', ar:'سيرفس Material اللي بتفتح dialogs.' } },
      { n:'MAT_DIALOG_DATA', k:'ng', w:{ en:'Material’s token for “what was passed in <code>data</code>”.', ar:'الـ token بتاع Material لـ «اللي اتبعت في <code>data</code>».' } },
      { n:'provideNativeDateAdapter', k:'ng', w:{ en:'Material’s provider that tells the date picker how to handle dates.', ar:'الـ provider بتاع Material اللي بيقول للـ date picker يتعامل مع التواريخ إزاي.' } },
      { n:'open', k:'ng', w:{ en:'A <code>MatDialog</code> method.', ar:'ميثود في <code>MatDialog</code>.' } },
      { n:'data', k:'ng', not: DLG, w:{ en:'In <code>open()</code>, Material’s option key. What you put inside it is yours.', ar:'في <code>open()</code>، مفتاح إعداد Material. اللي بتحطه جواه بتاعك.' } },
      { n:'afterClosed', k:'ng', w:{ en:'A method on the dialog reference.', ar:'ميثود في الـ reference بتاع الـ dialog.' } },
      { n:'mat-form-field', k:'ng', w:{ en:'Material’s wrapper tag for a field.', ar:'التاج الغلاف بتاع Material للـ field.' } },
      { n:'mat-label', k:'ng', w:{ en:'Material’s label tag.', ar:'تاج الـ label بتاع Material.' } },
      { n:'matInput', k:'ng', w:{ en:'Material’s attribute for an input inside a form field.', ar:'الـ attribute بتاع Material لـ input جوه form field.' } },
      { n:'matDatepicker', k:'ng', w:{ en:'Material’s input linking a text box to a picker.', ar:'input من Material بيربط التكست بوكس بالـ picker.' } },
      { n:'mat-datepicker-toggle', k:'ng', w:{ en:'Material’s calendar button.', ar:'زرار الكالندر بتاع Material.' } },
      { n:'matIconSuffix', k:'ng', w:{ en:'Material’s attribute: put this at the end of the field.', ar:'attribute من Material: حط ده في آخر الـ field.' } },
      { n:'for', k:'ng', re:'(?<=\\[)for(?=\\])', w:{ en:'An input of <code>mat-datepicker-toggle</code>: which picker it opens.', ar:'input في <code>mat-datepicker-toggle</code>: هيفتح أنهي picker.' } },
      { n:'mat-datepicker', k:'ng', w:{ en:'Material’s calendar popup.', ar:'الكالندر اللي بيطلع من Material.' } },
      { n:'mat-error', k:'ng', w:{ en:'Material’s error message tag.', ar:'تاج رسالة الـ error بتاع Material.' } },
      { n:'mat-flat-button', k:'ng', w:{ en:'Material’s button style attribute.', ar:'attribute ستايل الزرار بتاع Material.' } },
      { n:'mat-button', k:'ng', w:{ en:'Material’s plain button style.', ar:'ستايل الزرار العادي بتاع Material.' } },
      { n:'mat-dialog-title', k:'ng', w:{ en:'Material’s dialog title attribute.', ar:'attribute عنوان الـ dialog بتاع Material.' } },
      { n:'mat-dialog-content', k:'ng', w:{ en:'Material’s dialog body tag.', ar:'تاج جسم الـ dialog بتاع Material.' } },
      { n:'mat-dialog-actions', k:'ng', w:{ en:'Material’s dialog button row.', ar:'صف زراير الـ dialog بتاع Material.' } },
      { n:'mat-dialog-close', k:'ng', w:{ en:'Material’s input: close the dialog with this value.', ar:'input من Material: اقفل الـ dialog بالقيمة دي.' } },
      { n:'DragDropModule', k:'ng', w:{ en:'The CDK’s drag-and-drop directives.', ar:'الـ directives بتوع السحب والإفلات في الـ CDK.' } },
      { n:'cdkDropList', k:'ng', w:{ en:'A CDK directive: a list you can drop into.', ar:'directive من الـ CDK: ليستة تقدر ترمي فيها.' } },
      { n:'cdkDropListDropped', k:'ng', w:{ en:'The CDK’s output name. The library chose it; you type it exactly.', ar:'اسم الـ output بتاع الـ CDK. المكتبة اختارته؛ وانت بتكتبه بالظبط.' } },
      { n:'cdkDrag', k:'ng', w:{ en:'A CDK directive: this element can be dragged.', ar:'directive من الـ CDK: العنصر ده ينفع يتسحب.' } },
      { n:'CdkDragDrop', k:'ng', w:{ en:'The CDK’s type for the drop event.', ar:'نوع الـ CDK لـ event الإفلات.' } },
      { n:'previousIndex', k:'ng', w:{ en:'A field the CDK puts on the event.', ar:'field الـ CDK بيحطه على الـ event.' } },
      { n:'currentIndex', k:'ng', w:{ en:'A field the CDK puts on the event.', ar:'field الـ CDK بيحطه على الـ event.' } },
      { n:'moveItemInArray', k:'ng', w:{ en:'A CDK helper that moves one item inside an array, in place.', ar:'helper من الـ CDK بيحرّك عنصر جوه array، في مكانها.' } },

      /* --- Angular's, RxJS's, the browser's --- */
      { n:'$event', k:'ng', w:{ en:'Angular’s fixed name for what the output sent.', ar:'اسم أنجولار الثابت للي الـ output بعته.' } },
      { n:'ReactiveFormsModule', k:'ng', w:{ en:'Angular’s forms directives.', ar:'الـ directives بتوع الفورمز في أنجولار.' } },
      { n:'FormGroup', k:'ng', w:{ en:'Angular’s group of controls.', ar:'مجموعة الـ controls بتاعة أنجولار.' } },
      { n:'FormControl', k:'ng', w:{ en:'Angular’s single control.', ar:'الـ control الواحد بتاع أنجولار.' } },
      { n:'Validators', k:'ng', w:{ en:'Angular’s built-in validators.', ar:'الـ validators الجاهزين في أنجولار.' } },
      { n:'required', k:'ng', w:{ en:'The validator, and the error key it sets. Spelled exactly.', ar:'الـ validator، ومفتاح الـ error اللي بيحطه. بيتكتب بالظبط.' } },
      { n:'formGroup', k:'ng', w:{ en:'Angular’s directive binding a <code>&lt;form&gt;</code> to your group.', ar:'الـ directive بتاع أنجولار اللي بيربط <code>&lt;form&gt;</code> بالمجموعة بتاعتك.' } },
      { n:'formControlName', k:'ng', w:{ en:'Angular’s directive. The string after it is your control’s name.', ar:'الـ directive بتاع أنجولار. والنص اللي بعده اسم الـ control بتاعك.' } },
      { n:'ngSubmit', k:'ng', w:{ en:'Angular’s form output.', ar:'الـ output بتاع الفورم في أنجولار.' } },
      { n:'controls', k:'ng', w:{ en:'A <code>FormGroup</code> field.', ar:'field في <code>FormGroup</code>.' } },
      { n:'hasError', k:'ng', w:{ en:'A control method.', ar:'ميثود في الـ control.' } },
      { n:'invalid', k:'ng', w:{ en:'A form field: true while something fails validation.', ar:'field في الفورم: true طول ما فيه حاجة مش صحيحة.' } },
      { n:'firstValueFrom', k:'ng', w:{ en:'RxJS: turn a stream into a promise of its first value.', ar:'RxJS: حوّل stream لـ promise بأول قيمة فيه.' } },
      { n:'inject', k:'ng', w:{ en:'Angular’s function that hands you a service or token.', ar:'الـ function بتاعة أنجولار اللي بتديك سيرفس أو token.' } },
      { n:'@Inject', k:'ng', w:{ en:'The older decorator for injecting a token in a constructor.', ar:'الـ decorator القديم لعمل inject لـ token في الـ constructor.' } },
      { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
      { n:'update', k:'ng', w:{ en:'A signal method.', ar:'ميثود بتاعة الـ signal.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator.', ar:'الـ decorator بتاع أنجولار.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The string after it is yours.', ar:'مفتاح إعداد. النص اللي بعده بتاعك.' } },
      { n:'imports', k:'ng', w:{ en:'An option key: what this template uses.', ar:'مفتاح إعداد: اللي التمبلت ده بيستخدمه.' } },
      { n:'providers', k:'ng', w:{ en:'An option key: services for this component.', ar:'مفتاح إعداد: سيرفسز للـ component ده.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key.', ar:'مفتاح إعداد.' } },
      { n:'template', k:'ng', w:{ en:'An option key: an inline template.', ar:'مفتاح إعداد: تمبلت مكتوب جوه الكلاس.' } },
      { n:'@if', k:'ng', w:{ en:'Angular’s condition block.', ar:'بلوك الشرط بتاع أنجولار.' } },
      { n:'@for', k:'ng', w:{ en:'Angular’s loop block.', ar:'بلوك اللوب بتاع أنجولار.' } },
      { n:'track', k:'ng', w:{ en:'Part of <code>@for</code>.', ar:'جزء من <code>@for</code>.' } },
      { n:'disabled', k:'ng', w:{ en:'The DOM property of a button.', ar:'الـ property بتاعة الزرار في الـ DOM.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One click on “Book”, five stops', ar: 'كليك واحدة على «Book»، خمس محطات' },
    lead: {
      en: 'A booking form: a check-in date, a guest list you can drag to reorder, and a <b>Book</b> button that asks “are you sure?” in a Material dialog. Follow the click there and back:',
      ar: 'فورم حجز: تاريخ الدخول، وليستة ضيوف تقدر تسحبها ترتّبها، وزرار <b>Book</b> بيسأل «متأكد؟» في dialog من Material. امشي ورا الكليك رايح جاي:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'booking.html', lang: 'html', who: { en: 'form · submitted', ar: 'الفورم · اتبعتت' },
          code: ['<form [formGroup]="form" (ngSubmit)="confirm()">'],
          say: { en: `${ng('formGroup')} and ${ng('ngSubmit')} are Angular’s forms words. ${mine('form')} and ${mine('confirm')} are yours. No Material yet: Material styles the pieces, Angular still runs the form.`,
                 ar: `${ng('formGroup')} و${ng('ngSubmit')} كلمات الفورمز بتاعة أنجولار. و${mine('form')} و${mine('confirm')} بتوعك. لسه مفيش Material: Material بيعمل الستايل للحتت، وأنجولار لسه هو اللي بيشغّل الفورم.` } },
        { file: 'booking.ts', lang: 'ts', who: { en: 'form · opens the dialog', ar: 'الفورم · بتفتح الـ dialog' },
          code: ['const ref = this.dialog.open<ConfirmDialog, ConfirmData, boolean>(ConfirmDialog, {', '  data: { name: this.guests()[0] },', '});'],
          say: { en: `${ng('open')} and the key ${ng('data')} are Material’s. Everything <b>inside</b> <code>data</code> is yours: here ${pub('name')}, which the dialog will read. ${pub('ConfirmDialog')} is opened by its class, and ${pub('ConfirmData')} types what travels.`,
                 ar: `${ng('open')} والمفتاح ${ng('data')} بتوع Material. وكل حاجة <b>جوه</b> <code>data</code> بتاعتك: هنا ${pub('name')}، اللي الـ dialog هيقراه. و${pub('ConfirmDialog')} بيتفتح بالكلاس بتاعه، و${pub('ConfirmData')} بيحدد نوع اللي رايح.` } },
        { file: 'confirm-dialog.ts', lang: 'ts', who: { en: 'dialog · receives', ar: 'الـ dialog · بيستقبل' },
          code: ['readonly data = inject<ConfirmData>(MAT_DIALOG_DATA);'],
          say: { en: `${ng('MAT_DIALOG_DATA')} is Material’s fixed token. The field name on the left, ${mine('data')}, is <b>yours</b>: the same spelling as Material’s key, but you could call it <code>booking</code>. The template then reads <code>data.name</code>.`,
                 ar: `${ng('MAT_DIALOG_DATA')} الـ token الثابت بتاع Material. واسم الـ field اللي على الشمال، ${mine('data')}، <b>بتاعك</b>: نفس هجاء مفتاح Material، بس ممكن تسمّيه <code>booking</code>. والتمبلت بعد كده بيقرا <code>data.name</code>.` } },
        { file: 'confirm-dialog.ts', lang: 'html', who: { en: 'dialog · answers', ar: 'الـ dialog · بيرد' },
          code: ['<button mat-flat-button [mat-dialog-close]="true">Book</button>'],
          say: { en: `${ng('mat-flat-button')} and ${ng('mat-dialog-close')} are Material’s. The square brackets matter: <code>[mat-dialog-close]="true"</code> sends the boolean <code>true</code> back to whoever opened the dialog.`,
                 ar: `${ng('mat-flat-button')} و${ng('mat-dialog-close')} بتوع Material. والأقواس المربعة فارقة: <code>[mat-dialog-close]="true"</code> بتبعت الـ boolean <code>true</code> لللي فتح الـ dialog.` } },
        { file: 'booking.ts', lang: 'ts', who: { en: 'form · reads the answer', ar: 'الفورم · بتقرا الرد' },
          code: ['const ok = await firstValueFrom(ref.afterClosed());', 'if (ok) this.save();'],
          say: { en: `${ng('afterClosed')} is Material’s, ${ng('firstValueFrom')} is RxJS’s. ${mine('ref')} and ${mine('ok')} are local names you picked, and ${mine('save')} is your method.`,
                 ar: `${ng('afterClosed')} بتاعة Material، و${ng('firstValueFrom')} بتاعة RxJS. و${mine('ref')} و${mine('ok')} أسماء محلية انت اخترتها، و${mine('save')} الميثود بتاعتك.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'Form: <code>open(ConfirmDialog, { data: { name } })</code>. Dialog: <code>inject(MAT_DIALOG_DATA).name</code>, then <code>[mat-dialog-close]="true"</code>. Form: <code>afterClosed()</code>. The only names the two files share are <b>ConfirmDialog</b>, <b>ConfirmData</b> and the key <b>name</b>; everything with <code>mat</code> in it is the library’s.',
        ar: 'الفورم: <code>open(ConfirmDialog, { data: { name } })</code>. الـ dialog: <code>inject(MAT_DIALOG_DATA).name</code>، وبعدين <code>[mat-dialog-close]="true"</code>. الفورم: <code>afterClosed()</code>. الأسماء الوحيدة اللي الملفين متشاركين فيها هي <b>ConfirmDialog</b> و<b>ConfirmData</b> والمفتاح <b>name</b>؛ وأي حاجة فيها <code>mat</code> بتاعة المكتبة.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Yours or the library’s?', ar: 'بتاعك ولا بتاع المكتبة؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'In a Material template, most words are the library’s. The trick is to spot the few that are yours, because those are the ones that must match something else.',
      ar: 'في تمبلت Material، أغلب الكلمات بتاعة المكتبة. الشطارة إنك تلمح القليلين اللي بتوعك، عشان دول اللي لازم يطابقوا حاجة تانية.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'The library picks', 'You pick'],
                ar: ['الحتة', 'مكانها', 'المكتبة بتختار', 'انت بتختار'] },
        rows: [
          { en: ['<code>&lt;mat-datepicker #picker /&gt;</code>', 'form <code>.html</code>', `${ng('mat-datepicker')}`, `${mine('picker')}, and <code>[matDatepicker]</code> and <code>[for]</code> must use it`],
            ar: ['<code>&lt;mat-datepicker #picker /&gt;</code>', '<code>.html</code> الفورم', `${ng('mat-datepicker')}`, `${mine('picker')}، و<code>[matDatepicker]</code> و<code>[for]</code> لازم يستخدموه`] },
          { en: ['<code>formControlName="checkIn"</code>', 'form <code>.html</code>', `${ng('formControlName')} (Angular)`, `${mine('checkIn')}, which must match the <code>FormGroup</code> key`],
            ar: ['<code>formControlName="checkIn"</code>', '<code>.html</code> الفورم', `${ng('formControlName')} (أنجولار)`, `${mine('checkIn')}، ولازم يطابق مفتاح الـ <code>FormGroup</code>`] },
          { en: ['<code>(cdkDropListDropped)="reorder($event)"</code>', 'form <code>.html</code>', `${ng('cdkDropListDropped')}, ${ng('$event')}`, `${mine('reorder')}`],
            ar: ['<code>(cdkDropListDropped)="reorder($event)"</code>', '<code>.html</code> الفورم', `${ng('cdkDropListDropped')} و${ng('$event')}`, `${mine('reorder')}`] },
          { en: ['<code>open(ConfirmDialog, { data: { name } })</code>', 'form <code>.ts</code>', `${ng('open')}, ${ng('data')}`, `${pub('ConfirmDialog')}, ${pub('name')}`],
            ar: ['<code>open(ConfirmDialog, { data: { name } })</code>', '<code>.ts</code> الفورم', `${ng('open')} و${ng('data')}`, `${pub('ConfirmDialog')} و${pub('name')}`] },
          { en: ['<code>readonly data = inject(MAT_DIALOG_DATA)</code>', 'dialog <code>.ts</code>', `${ng('MAT_DIALOG_DATA')}`, `the field name ${mine('data')}`],
            ar: ['<code>readonly data = inject(MAT_DIALOG_DATA)</code>', '<code>.ts</code> الـ dialog', `${ng('MAT_DIALOG_DATA')}`, `اسم الـ field ${mine('data')}`] },
          { en: ['<code>imports: [MatButtonModule, …]</code>', 'each component', 'every module name', 'nothing, but you must list what the template uses'],
            ar: ['<code>imports: [MatButtonModule, …]</code>', 'كل component', 'كل أسماء الـ modules', 'ولا حاجة، بس لازم تكتب اللي التمبلت بيستخدمه'] },
        ] },
      { t: 'ul',
        en: ['<b>Library outputs work exactly like your own.</b> <code>(cdkDropListDropped)</code> is just an output someone else named, so the same rules apply: exact spelling, on the right tag, and <code>$event</code> is what it emits.',
             '<b>Every component imports its own library pieces.</b> The dialog uses <code>mat-flat-button</code> too, so it imports <code>MatButtonModule</code> itself. Importing it in the form does not help the dialog.',
             '<b>Your names sit in the values.</b> In <code>[matDatepicker]="picker"</code> the part in brackets is the library’s and the part in quotes is yours. That pattern holds almost everywhere.'],
        ar: ['<b>الـ outputs بتاعة المكتبة بتشتغل زي بتوعك بالظبط.</b> <code>(cdkDropListDropped)</code> ده مجرد output حد تاني سمّاه، فنفس القواعد: الهجاء بالظبط، على التاج الصح، و<code>$event</code> هو اللي بيبعته.',
             '<b>كل component بيعمل import لحتت المكتبة بتاعته.</b> الـ dialog بيستخدم <code>mat-flat-button</code> برضه، فبيعمل import لـ <code>MatButtonModule</code> بنفسه. إنك تعمله import في الفورم مش بيفيد الـ dialog.',
             '<b>أسماءك قاعدة في القيم.</b> في <code>[matDatepicker]="picker"</code> اللي بين الأقواس بتاع المكتبة واللي بين علامات التنصيص بتاعك. والنمط ده ماشي تقريبًا في كل حتة.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All three files, every name coloured', ar: 'التلات ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same example, complete. Hover a coloured name to light it up everywhere. Then press <b>Rename test</b>: the green and orange words change, and the wall of <code>mat</code> and <code>cdk</code> words stays exactly where it is. That wall is the library; what moves is you.',
      ar: 'نفس المثال، كامل. قف بالماوس على أي اسم ملوّن وهينوّر في كل مكان. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: الكلمات الخضرا والبرتقاني بتتغير، وحيطة كلمات <code>mat</code> و<code>cdk</code> بتفضل مكانها بالظبط. الحيطة دي هي المكتبة؛ واللي بيتحرك هو انت.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'booking.ts', lang: 'ts', tag: { en: 'the form', ar: 'الفورم' }, code: [
        "import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';",
        "import { Component, inject, signal } from '@angular/core';",
        "import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';",
        "import { MatButtonModule } from '@angular/material/button';",
        "import { provideNativeDateAdapter } from '@angular/material/core';",
        "import { MatDatepickerModule } from '@angular/material/datepicker';",
        "import { MatDialog } from '@angular/material/dialog';",
        "import { MatFormFieldModule } from '@angular/material/form-field';",
        "import { MatInputModule } from '@angular/material/input';",
        "import { firstValueFrom } from 'rxjs';",
        "import { ConfirmData, ConfirmDialog } from './confirm-dialog';",
        '',
        '@Component({',
        "  selector: 'app-booking',",
        '  imports: [',
        '    ReactiveFormsModule, DragDropModule,',
        '    MatButtonModule, MatFormFieldModule, MatInputModule, MatDatepickerModule,',
        '  ],',
        '  providers: [provideNativeDateAdapter()],',
        "  templateUrl: './booking.html',",
        '})',
        'export class Booking {',
        '  private readonly dialog = inject(MatDialog);',
        '',
        "  readonly guests = signal(['Mona', 'Karim', 'Laila']);",
        '  readonly form = new FormGroup({',
        '    checkIn: new FormControl<Date | null>(null, Validators.required),',
        '  });',
        '',
        '  reorder(e: CdkDragDrop<string[]>) {',
        '    this.guests.update(list => {',
        '      const copy = [...list];',
        '      moveItemInArray(copy, e.previousIndex, e.currentIndex);',
        '      return copy;',
        '    });',
        '  }',
        '',
        '  async confirm() {',
        '    const ref = this.dialog.open<ConfirmDialog, ConfirmData, boolean>(ConfirmDialog, {',
        '      data: { name: this.guests()[0] },',
        '    });',
        '    const ok = await firstValueFrom(ref.afterClosed());',
        '    if (ok) this.save();',
        '  }',
        '',
        '  private save() {',
        "    console.log('booked', this.form.value, this.guests());",
        '  }',
        '}' ] },
      { t: 'code', name: 'booking.html', lang: 'html', tag: { en: 'the form', ar: 'الفورم' }, code: [
        '<form [formGroup]="form" (ngSubmit)="confirm()">',
        '  <mat-form-field>',
        '    <mat-label>Check-in date</mat-label>',
        '    <input matInput [matDatepicker]="picker" formControlName="checkIn" />',
        '    <mat-datepicker-toggle matIconSuffix [for]="picker" />',
        '    <mat-datepicker #picker />',
        "    @if (form.controls.checkIn.hasError('required')) {",
        '      <mat-error>Pick a date</mat-error>',
        '    }',
        '  </mat-form-field>',
        '',
        '  <ul cdkDropList (cdkDropListDropped)="reorder($event)">',
        '    @for (g of guests(); track g) {',
        '      <li cdkDrag>{{ g }}</li>',
        '    }',
        '  </ul>',
        '',
        '  <button mat-flat-button type="submit" [disabled]="form.invalid">Book</button>',
        '</form>' ] },
      { t: 'code', name: 'confirm-dialog.ts', lang: 'ts', tag: { en: 'the dialog', ar: 'الـ dialog' }, code: [
        "import { Component, inject } from '@angular/core';",
        "import { MatButtonModule } from '@angular/material/button';",
        "import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';",
        '',
        'export interface ConfirmData {',
        '  name: string;',
        '}',
        '',
        '@Component({',
        "  selector: 'app-confirm-dialog',",
        '  imports: [MatDialogModule, MatButtonModule],',
        '  template: `',
        '    <h2 mat-dialog-title>Book this stay?</h2>',
        '    <mat-dialog-content>First guest: {{ data.name }}</mat-dialog-content>',
        '    <mat-dialog-actions>',
        '      <button mat-button [mat-dialog-close]="false">Cancel</button>',
        '      <button mat-flat-button [mat-dialog-close]="true">Book</button>',
        '    </mat-dialog-actions>',
        '  `,',
        '})',
        'export class ConfirmDialog {',
        '  readonly data = inject<ConfirmData>(MAT_DIALOG_DATA);',
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
      en: 'Most of your names are checked. One of them lives in a string that only fails when the page runs, and one of the library’s words fails with no message at all.',
      ar: 'أغلب أسماءك بتتشيّك. واحد منهم عايش في نص مبيفشلش غير لما الصفحة تشتغل، وكلمة من كلمات المكتبة بتفشل من غير أي رسالة خالص.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [mine('checkIn') + ' (the FormGroup key)', '<code>formControlName="checkIn"</code> and <code>form.controls.checkIn</code>', 'The <code>controls</code> read is a compile error. The <code>formControlName</code> string is a <b>runtime</b> error: “Cannot find control with name”.'],
            ar: [mine('checkIn') + ' (مفتاح الـ FormGroup)', '<code>formControlName="checkIn"</code> و<code>form.controls.checkIn</code>', 'قراية <code>controls</code> بتبقى compile error. أما نص <code>formControlName</code> فبيبقى error <b>وقت التشغيل</b>: «Cannot find control with name».'] },
          { en: [mine('picker') + ' (#picker)', '<code>[matDatepicker]="picker"</code> and <code>[for]="picker"</code>', 'Compile error: the template looks for a property of that name and finds none.'],
            ar: [mine('picker') + ' (#picker)', '<code>[matDatepicker]="picker"</code> و<code>[for]="picker"</code>', 'Compile error: التمبلت بيدوّر على property بالاسم ده ومش لاقيها.'] },
          { en: [pub('name') + ' (in ConfirmData)', 'the key in <code>open()</code> and <code>data.name</code> in the dialog', 'Compile error, <b>because</b> <code>open&lt;…, ConfirmData, …&gt;</code> is typed. Without those generics it would be silent.'],
            ar: [pub('name') + ' (في ConfirmData)', 'المفتاح في <code>open()</code> و<code>data.name</code> في الـ dialog', 'Compile error، <b>عشان</b> <code>open&lt;…, ConfirmData, …&gt;</code> متعرّفله نوع. من غير الـ generics دي كان هيبقى صامت.'] },
          { en: [mine('data') + ' (the dialog’s field)', 'the dialog template’s <code>data.name</code>', 'Compile error in the dialog. Material’s <code>data:</code> key in <code>open()</code> does <b>not</b> change.'],
            ar: [mine('data') + ' (الـ field بتاع الـ dialog)', '<code>data.name</code> في تمبلت الـ dialog', 'Compile error في الـ dialog. ومفتاح <code>data:</code> بتاع Material في <code>open()</code> <b>مش</b> بيتغير.'] },
          { en: [mine('reorder') + ', ' + mine('confirm') + ', ' + mine('guests'), 'the form’s template', 'Compile error in the template.'],
            ar: [mine('reorder') + '، ' + mine('confirm') + '، ' + mine('guests'), 'تمبلت الفورم', 'Compile error في التمبلت.'] },
          { en: [pub('ConfirmDialog') + ', ' + pub('ConfirmData'), 'the import and the <code>open</code> call in the form', 'Compile error on the import.'],
            ar: [pub('ConfirmDialog') + '، ' + pub('ConfirmData'), 'الـ import ونداء <code>open</code> في الفورم', 'Compile error في الـ import.'] },
          { en: ['a <code>mat-</code> tag like <code>mat-form-field</code>', 'nothing: it is the library’s', 'Compile error: “is not a known element”.'],
            ar: ['تاج <code>mat-</code> زي <code>mat-form-field</code>', 'ولا حاجة: ده بتاع المكتبة', 'Compile error: «is not a known element».'] },
          { en: ['a <code>mat-</code> attribute like <code>mat-flat-button</code>', 'nothing: it is the library’s', '<b>No error.</b> A misspelled attribute on a plain <code>&lt;button&gt;</code> is just an attribute. The button renders unstyled.'],
            ar: ['attribute <code>mat-</code> زي <code>mat-flat-button</code>', 'ولا حاجة: ده بتاع المكتبة', '<b>مفيش error.</b> attribute مكتوب غلط على <code>&lt;button&gt;</code> عادي مجرد attribute. الزرار بيطلع من غير ستايل.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b> above the files. <code>checkIn</code> changes in the <code>FormGroup</code>, inside the <code>formControlName</code> quotes and in <code>form.controls</code> at once. That quoted one is the copy people forget.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b> فوق الملفات. <code>checkIn</code> بيتغير في الـ <code>FormGroup</code> وجوه علامات تنصيص <code>formControlName</code> وفي <code>form.controls</code> مرة واحدة. واللي بين علامات التنصيص ده هو النسخة اللي الناس بتنساها.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتوعك' },
    title: { en: 'How to recognise the library’s words', ar: 'تعرف كلمات المكتبة إزاي' },
    lead: {
      en: 'Material and the CDK mark almost every name with a prefix. Learn the four spellings and you can read any Material template.',
      ar: 'Material والـ CDK بيعلّموا تقريبًا كل اسم ببادئة. اتعلم الأربع أشكال دول وهتقدر تقرا أي تمبلت Material.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Looks like', 'Is', 'Examples here'], ar: ['شكله', 'هو', 'أمثلة هنا'] },
        rows: [
          { en: ['<code>mat-something</code>', 'a Material tag or attribute', `${ng('mat-form-field')}, ${ng('mat-flat-button')}, ${ng('mat-dialog-close')}`],
            ar: ['<code>mat-something</code>', 'تاج أو attribute من Material', `${ng('mat-form-field')} و${ng('mat-flat-button')} و${ng('mat-dialog-close')}`] },
          { en: ['<code>matSomething</code>', 'a Material directive or input', `${ng('matInput')}, ${ng('matDatepicker')}, ${ng('matIconSuffix')}`],
            ar: ['<code>matSomething</code>', 'directive أو input من Material', `${ng('matInput')} و${ng('matDatepicker')} و${ng('matIconSuffix')}`] },
          { en: ['<code>MatSomething</code>, <code>MAT_SOMETHING</code>', 'a Material class, module or token (in TypeScript)', `${ng('MatDialog')}, ${ng('MatButtonModule')}, ${ng('MAT_DIALOG_DATA')}`],
            ar: ['<code>MatSomething</code>، <code>MAT_SOMETHING</code>', 'كلاس أو module أو token من Material (في TypeScript)', `${ng('MatDialog')} و${ng('MatButtonModule')} و${ng('MAT_DIALOG_DATA')}`] },
          { en: ['<code>cdkSomething</code>, <code>CdkSomething</code>', 'the CDK: behaviour, no styles', `${ng('cdkDropList')}, ${ng('cdkDrag')}, ${ng('CdkDragDrop')}`],
            ar: ['<code>cdkSomething</code>، <code>CdkSomething</code>', 'الـ CDK: سلوك، من غير ستايل', `${ng('cdkDropList')} و${ng('cdkDrag')} و${ng('CdkDragDrop')}`] },
          { en: ['fields on <code>$event</code>', 'whatever the library emits', `${ng('previousIndex')}, ${ng('currentIndex')}`],
            ar: ['حقول على <code>$event</code>', 'أي حاجة المكتبة بتبعتها', `${ng('previousIndex')} و${ng('currentIndex')}`] },
        ] },
      { t: 'note', label: { en: 'The exception that looks like yours', ar: 'الاستثناء اللي شكله بتاعك' },
        en: `A few library words carry no prefix: ${ng('open')}, ${ng('data')}, ${ng('afterClosed')}, ${ng('moveItemInArray')}. They are just as fixed. When in doubt, check the import line: anything imported from <code>@angular/material/…</code> or <code>@angular/cdk/…</code> is the library’s.`,
        ar: `فيه شوية كلمات من المكتبة من غير بادئة: ${ng('open')} و${ng('data')} و${ng('afterClosed')} و${ng('moveItemInArray')}. ودول ثابتين برضه. لو مش متأكد، بص على سطر الـ import: أي حاجة جاية من <code>@angular/material/…</code> أو <code>@angular/cdk/…</code> بتاعة المكتبة.` }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'Material does not care what you call your things. These habits keep the dialog and the form easy to connect.',
      ar: 'Material مش فارق معاه بتسمّي حاجاتك إيه. العادات دي بتخلي الـ dialog والفورم سهل توصّلهم ببعض.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['a dialog component', '<code>ConfirmDialog</code>', '<code>Popup1</code>', 'Say what it asks. The class name is how the dialog is opened.'],
            ar: ['component dialog', '<code>ConfirmDialog</code>', '<code>Popup1</code>', 'قول هو بيسأل إيه. واسم الكلاس هو اللي الـ dialog بيتفتح بيه.'] },
          { en: ['what a dialog receives', 'an exported interface: <code>ConfirmData</code>', 'an untyped object', 'Both files import it, so a renamed key becomes a compile error.'],
            ar: ['اللي الـ dialog بيستقبله', 'interface متصدّر: <code>ConfirmData</code>', 'object من غير نوع', 'الملفين بيعملوه import، فأي مفتاح يتغير اسمه بيبقى compile error.'] },
          { en: ['a template reference', '<code>#picker</code>, <code>#checkInPicker</code>', '<code>#p</code>', 'It is referenced from other attributes; a readable name shows what they point at.'],
            ar: ['template reference', '<code>#picker</code>، <code>#checkInPicker</code>', '<code>#p</code>', 'بيتشاور عليه من attributes تانية؛ والاسم الواضح بيبيّن هما بيشاوروا على إيه.'] },
          { en: ['a form control', '<code>checkIn</code>', '<code>field1</code>', 'It is typed three times, once in quotes. A meaningful name is easier to copy correctly.'],
            ar: ['form control', '<code>checkIn</code>', '<code>field1</code>', 'بيتكتب تلات مرات، مرة منهم بين علامات تنصيص. والاسم اللي ليه معنى أسهل تنسخه صح.'] },
          { en: ['the dialog’s data field', '<code>data</code>', '—', 'Any name works. <code>data</code> matches Material’s key and the docs, which helps readers.'],
            ar: ['الـ field بتاع داتا الـ dialog', '<code>data</code>', '—', 'أي اسم ينفع. و<code>data</code> بتطابق مفتاح Material والـ docs، وده بيساعد اللي بيقرا.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Three places where the library decides', ar: 'تلات أماكن المكتبة هي اللي بتقرر فيها' },
    lead: {
      en: 'These look like your choices, but the library or Angular has already decided.',
      ar: 'دول شكلهم اختياراتك، بس المكتبة أو أنجولار قرروا خلاص.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'The output’s name and its event’s fields', ar: 'اسم الـ output وحقول الـ event بتاعه' }, blocks: [
        { t: 'p',
          en: `${ng('cdkDropListDropped')} is an output the CDK named, and ${ng('$event')} is a ${ng('CdkDragDrop')} object whose fields, ${ng('previousIndex')} and ${ng('currentIndex')}, are fixed too. Only the method (${mine('reorder')}) and its parameter (${mine('e')}) are yours.`,
          ar: `${ng('cdkDropListDropped')} output الـ CDK هو اللي سمّاه، و${ng('$event')} object من نوع ${ng('CdkDragDrop')} وحقوله، ${ng('previousIndex')} و${ng('currentIndex')}، ثابتة برضه. الميثود (${mine('reorder')}) والـ parameter بتاعها (${mine('e')}) بس اللي بتوعك.` }
      ]},
      { t: 'step', n: 'B', title: { en: 'A control’s name must match its key', ar: 'اسم الـ control لازم يطابق المفتاح بتاعه' }, blocks: [
        { t: 'p',
          en: `You chose ${mine('checkIn')}, but once chosen, <code>formControlName="checkIn"</code> must repeat it exactly. It is a string, so TypeScript does not check it; Angular does when the form is created, and throws if it is missing.`,
          ar: `انت اخترت ${mine('checkIn')}، بس بعد ما اخترته، <code>formControlName="checkIn"</code> لازم يكرره بالظبط. ده نص، فـ TypeScript مش بيشيّك عليه؛ أنجولار هو اللي بيشيّك لما الفورم يتعمل، وبيرمي error لو مش موجود.` }
      ]},
      { t: 'step', n: 'C', title: { en: 'The date picker needs a provider with a fixed name', ar: 'الـ date picker محتاج provider باسم ثابت' }, blocks: [
        { t: 'pair',
          bad:  { name: 'booking.ts — no adapter', lang: 'ts', code: [
            '@Component({',
            "  selector: 'app-booking',",
            '  imports: [MatDatepickerModule],',
            '})' ] },
          good: { name: 'booking.ts — with adapter', lang: 'ts', code: [
            '@Component({',
            "  selector: 'app-booking',",
            '  imports: [MatDatepickerModule],',
            '  providers: [provideNativeDateAdapter()],',
            '})' ] } },
        { t: 'p',
          en: `The date picker needs a date adapter, and ${ng('provideNativeDateAdapter')} is Material’s name for the simplest one. Without any adapter the page compiles, then fails at runtime with an error saying no provider was found for <code>DateAdapter</code>. You can also provide it once in the app config instead.`,
          ar: `الـ date picker محتاج date adapter، و${ng('provideNativeDateAdapter')} اسم Material لأبسط واحد. من غير أي adapter الصفحة بتعدّي الـ compile، وبعدين بتفشل وقت التشغيل بـ error بيقول إن مفيش provider لـ <code>DateAdapter</code>. وتقدر تحطه مرة واحدة في إعدادات التطبيق بدل كده.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: '<code>@Inject(MAT_DIALOG_DATA)</code>: same token, same names', ar: '<code>@Inject(MAT_DIALOG_DATA)</code>: نفس الـ token، ونفس الأسماء' },
    lead: {
      en: 'Most Material tutorials still show the constructor style. Only the line that receives the data changes; the token, the field name and the template stay the same.',
      ar: 'أغلب شروحات Material لسه بتوري أسلوب الـ constructor. السطر اللي بيستقبل الداتا بس هو اللي بيتغير؛ والـ token واسم الـ field والتمبلت زي ما هما.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'confirm-dialog.ts — older style', lang: 'ts', code: [
          'export class ConfirmDialog {',
          '  constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmData) {}',
          '}' ] },
        good: { name: 'confirm-dialog.ts — today', lang: 'ts', code: [
          'export class ConfirmDialog {',
          '  readonly data = inject<ConfirmData>(MAT_DIALOG_DATA);',
          '}' ] } },
      { t: 'p',
        en: `${ng('@Inject')} and ${ng('inject')} are Angular’s, ${ng('MAT_DIALOG_DATA')} is Material’s, and ${mine('data')} is your name in both. In older code the component also lived in an <code>NgModule</code>’s <code>imports</code> instead of its own; the module names, like ${ng('MatButtonModule')}, are identical.`,
        ar: `${ng('@Inject')} و${ng('inject')} بتوع أنجولار، و${ng('MAT_DIALOG_DATA')} بتاع Material، و${mine('data')} اسمك في الاتنين. وفي الكود الأقدم الـ component كان متسجّل في <code>imports</code> بتاعة <code>NgModule</code> بدل بتاعته هو؛ وأسماء الـ modules، زي ${ng('MatButtonModule')}، هي هي.` }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, and says nothing', ar: 'مش بيعمل حاجة، ومش بيقول حاجة' },
    title: { en: 'Mistakes that fail silently', ar: 'غلطات بتفشل في صمت' },
    lead: {
      en: 'A library adds its own quiet failures: attributes that are ignored, outputs nobody fires, and strings that are not the values you meant.',
      ar: 'المكتبة بتضيف غلطات صامتة بتاعتها: attributes بتتجاهل، وoutputs محدش بيطلقها، ونصوص مش هي القيم اللي انت قصدها.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'Forgetting to import the button module', ar: 'نسيان import لـ module الزرار' }, blocks: [
        { t: 'pair',
          bad:  { name: 'confirm-dialog.ts — missing import', lang: 'ts', code: [ '  imports: [MatDialogModule],' ] },
          good: { name: 'confirm-dialog.ts — imported', lang: 'ts', code: [ '  imports: [MatDialogModule, MatButtonModule],' ] } },
        { t: 'p', en: `Without ${ng('MatButtonModule')}, <code>mat-flat-button</code> on a <code>&lt;button&gt;</code> is just an unknown attribute. Angular does not complain; the button simply looks plain. The same goes for ${ng('cdkDrag')} without ${ng('DragDropModule')}: nothing drags. Tags are different: an unknown <code>&lt;mat-…&gt;</code> <b>tag</b> is a compile error.`,
                  ar: `من غير ${ng('MatButtonModule')}، <code>mat-flat-button</code> على <code>&lt;button&gt;</code> مجرد attribute مش معروف. أنجولار مبيشتكيش؛ الزرار بيطلع عادي وخلاص. ونفس الكلام لـ ${ng('cdkDrag')} من غير ${ng('DragDropModule')}: مفيش حاجة بتتسحب. التاجات حاجة تانية: <b>تاج</b> <code>&lt;mat-…&gt;</code> مش معروف بيبقى compile error.` }
      ]},
      { t: 'step', n: '2', title: { en: 'Guessing the output’s name', ar: 'تخمين اسم الـ output' }, blocks: [
        { t: 'pair',
          bad:  { name: 'booking.html — guessed', lang: 'html', code: [ '<ul cdkDropList (dropped)="reorder($event)">' ] },
          good: { name: 'booking.html — the CDK’s name', lang: 'html', code: [ '<ul cdkDropList (cdkDropListDropped)="reorder($event)">' ] } },
        { t: 'p', en: `Just like your own outputs, a wrong name in <code>( )</code> is not an error; it is a listener for an event that never comes. The item drags, then snaps back, because ${mine('reorder')} never runs. Copy output names from the library’s docs.`,
                  ar: `زي الـ outputs بتاعتك بالظبط، الاسم الغلط جوه <code>( )</code> مش error؛ ده listener لـ event عمره ما هييجي. العنصر بيتسحب، وبعدين بيرجع مكانه، عشان ${mine('reorder')} عمرها ما بتشتغل. انسخ أسماء الـ outputs من الـ docs بتاعة المكتبة.` }
      ]},
      { t: 'step', n: '3', title: { en: 'Forgetting the brackets on mat-dialog-close', ar: 'نسيان الأقواس على mat-dialog-close' }, blocks: [
        { t: 'pair',
          bad:  { name: 'confirm-dialog.ts — a string', lang: 'html', code: [ '<button mat-button mat-dialog-close="false">Cancel</button>' ] },
          good: { name: 'confirm-dialog.ts — a boolean', lang: 'html', code: [ '<button mat-button [mat-dialog-close]="false">Cancel</button>' ] } },
        { t: 'p', en: 'Without brackets the value is the <b>text</b> <code>"false"</code>, and any non-empty text is truthy. So <code>if (ok)</code> passes and Cancel books the stay. The input accepts any value, so the compiler does not warn you.',
                  ar: 'من غير أقواس القيمة بتبقى <b>النص</b> <code>"false"</code>، وأي نص مش فاضي بيتحسب true. فـ <code>if (ok)</code> بتعدّي وزرار Cancel بيحجز. والـ input بيقبل أي قيمة، فالـ compiler مش بينبّهك.' }
      ]},
      { t: 'step', n: '4', title: { en: 'An untyped dialog call', ar: 'نداء dialog من غير أنواع' }, blocks: [
        { t: 'pair',
          bad:  { name: 'booking.ts — untyped', lang: 'ts', code: [
            'this.dialog.open(ConfirmDialog, {',
            '  data: { guest: this.guests()[0] },',
            '});' ] },
          good: { name: 'booking.ts — typed', lang: 'ts', code: [
            'this.dialog.open<ConfirmDialog, ConfirmData, boolean>(ConfirmDialog, {',
            '  data: { name: this.guests()[0] },',
            '});' ] } },
        { t: 'p', en: `Without the generics, <code>data</code> accepts anything, so a wrong key compiles. The dialog reads <code>data.name</code>, gets <code>undefined</code>, and shows an empty space. <code>inject&lt;ConfirmData&gt;</code> on the other side is only a promise; it does not check what arrived.`,
                  ar: `من غير الـ generics، <code>data</code> بتقبل أي حاجة، فالمفتاح الغلط بيعدّي الـ compile. والـ dialog بيقرا <code>data.name</code>، وبياخد <code>undefined</code>، وبيعرض مكان فاضي. و<code>inject&lt;ConfirmData&gt;</code> في الناحية التانية مجرد وعد؛ مش بيشيّك على اللي وصل.` }
      ]},
      { t: 'step', n: '5', title: { en: 'Two loud ones that confuse beginners', ar: 'اتنين بصوت عالي بيلخبطوا المبتدئين' }, blocks: [
        { t: 'p', en: `Not silent, but the messages are puzzling. A <code>&lt;mat-form-field&gt;</code> whose input lacks ${ng('matInput')} (or whose ${ng('MatInputModule')} is not imported) throws “mat-form-field must contain a MatFormFieldControl”. And a date picker with no adapter throws the <code>DateAdapter</code> error from section 7. Both are about a missing library word, not your code.`,
                  ar: `مش صامتين، بس الرسايل بتحيّر. <code>&lt;mat-form-field&gt;</code> والـ input اللي جواه ناقصه ${ng('matInput')} (أو ${ng('MatInputModule')} مش متعمله import) بيرمي «mat-form-field must contain a MatFormFieldControl». والـ date picker من غير adapter بيرمي error الـ <code>DateAdapter</code> اللي في جزء 7. الاتنين سببهم كلمة ناقصة من المكتبة، مش الكود بتاعك.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it does nothing', ar: 'لما مايعملش حاجة' },
    title: { en: 'Five questions, in this order', ar: 'خمس أسئلة، بالترتيب ده' },
    lead: {
      en: 'A Material piece looks wrong or does nothing. Ask these first.',
      ar: 'حتة من Material شكلها غلط أو مش بتعمل حاجة. اسأل دول الأول.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Does <b>this</b> component’s <code>imports</code> list the module for every <code>mat</code> or <code>cdk</code> word in its template?',
                  ar: '<b>1.</b> الـ <code>imports</code> بتاعة الـ component <b>ده</b> فيها الـ module لكل كلمة <code>mat</code> أو <code>cdk</code> في التمبلت بتاعه؟' },
      { t: 'chk', en: '<b>2.</b> Is every output name copied exactly from the docs, and placed on the element that has the directive?',
                  ar: '<b>2.</b> كل اسم output متنسوخ بالظبط من الـ docs، ومتحط على العنصر اللي عليه الـ directive؟' },
      { t: 'chk', en: '<b>3.</b> Is each value in square brackets when it should be a boolean, number or variable, not a string?',
                  ar: '<b>3.</b> كل قيمة بين أقواس مربعة لما المفروض تبقى boolean أو رقم أو متغير، مش نص؟' },
      { t: 'chk', en: '<b>4.</b> Do your own names match their other copy: <code>formControlName</code> and the <code>FormGroup</code> key, <code>#picker</code> and its users, the <code>data</code> keys and the dialog?',
                  ar: '<b>4.</b> أسماءك مطابقة النسخة التانية بتاعتها: <code>formControlName</code> ومفتاح الـ <code>FormGroup</code>، و<code>#picker</code> واللي بيستخدموه، ومفاتيح <code>data</code> والـ dialog؟' },
      { t: 'chk', en: '<b>5.</b> For a drag list: does your handler replace the array in the signal, using <code>previousIndex</code> and <code>currentIndex</code>?',
                  ar: '<b>5.</b> في ليستة السحب: الميثود بتاعتك بتبدّل الـ array اللي في الـ signal، باستخدام <code>previousIndex</code> و<code>currentIndex</code>؟' }
    ]
  }
  ]
};
