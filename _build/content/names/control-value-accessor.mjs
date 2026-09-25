/* names for the ControlValueAccessor topic.
   n: the name exactly as typed in the code.   k: ng | mine | pub.
   w: what it is, and what has to change with it.   { en, ar }
   re / only / as: see _build/names.mjs.                                  */
export default {
'control-value-accessor': {
  note: {
    en: 'The four methods <code>writeValue</code>, <code>registerOnChange</code>, <code>registerOnTouched</code> and <code>setDisabledState</code> sit in your class, but the interface fixed their names: the forms module calls them by exactly those names. Their parameter names, and the fields you store the callbacks in, are yours.',
    ar: 'الأربع ميثودز <code>writeValue</code> و<code>registerOnChange</code> و<code>registerOnTouched</code> و<code>setDisabledState</code> قاعدين في الكلاس بتاعك، بس الـ interface هو اللي حدد أسماءهم: الـ forms module بيناديهم بالأسماء دي بالظبط. أسماء الـ parameters، والـ fields اللي بتحفظ فيها الـ callbacks، دي بتاعتك.'
  },
  names: [
    { n:'ControlValueAccessor', k:'ng', w:{ en:'Angular’s interface that lets a component act as a form control.', ar:'الـ interface بتاع أنجولار اللي بيخلي الـ component يشتغل كـ form control.' } },
    { n:'NG_VALUE_ACCESSOR', k:'ng', w:{ en:'Angular’s token. The forms module looks up exactly this token to find your component.', ar:'الـ token بتاع أنجولار. الـ forms module بيدوّر على الـ token ده بالظبط عشان يلاقي الـ component بتاعك.' } },
    { n:'NG_VALIDATORS', k:'ng', w:{ en:'Angular’s token for validators that come with a control.', ar:'الـ token بتاع أنجولار للـ validators اللي جاية مع الكنترول.' } },
    { n:'providers', k:'ng', w:{ en:'An option key Angular reads.', ar:'مفتاح إعداد أنجولار بيقراه.' } },
    { n:'provide', k:'ng', w:{ en:'A provider key: which token is being supplied.', ar:'مفتاح في الـ provider: أنهي token اللي بنقدّمه.' } },
    { n:'useExisting', k:'ng', w:{ en:'A provider key: “use the instance that already exists”, which is this component.', ar:'مفتاح في الـ provider: “استخدم النسخة اللي موجودة أصلاً”، اللي هي الـ component ده.' } },
    { n:'forwardRef', k:'ng', w:{ en:'Angular’s function for pointing at a class that is not defined yet at that line.', ar:'الـ function بتاعة أنجولار اللي بتشاور على كلاس لسه متعرّفش في السطر ده.' } },
    { n:'multi', k:'ng', w:{ en:'A provider key: add to the list, do not replace it. Forget it and you replace Angular’s built-in accessors.', ar:'مفتاح في الـ provider: ضيف على الليستة متبدّلهاش. لو نسيته هتبدّل الـ accessors الجاهزة بتاعة أنجولار.' } },
    { n:'writeValue', k:'ng', w:{ en:'Required by the interface. The form calls it to push a value into your component.', ar:'الـ interface بيطلبها. الفورم بيناديها عشان يحط قيمة جوه الـ component بتاعك.' } },
    { n:'registerOnChange', k:'ng', w:{ en:'Required by the interface. The form hands you its “value changed” callback here.', ar:'الـ interface بيطلبها. الفورم بيديك هنا الـ callback بتاع “القيمة اتغيرت”.' } },
    { n:'registerOnTouched', k:'ng', w:{ en:'Required by the interface. The form hands you its “touched” callback here.', ar:'الـ interface بيطلبها. الفورم بيديك هنا الـ callback بتاع “اتلمس”.' } },
    { n:'setDisabledState', k:'ng', w:{ en:'Optional in the interface, but the name is fixed. The form calls it on <code>disable()</code> and <code>enable()</code>.', ar:'اختيارية في الـ interface، بس الاسم ثابت. الفورم بيناديها مع <code>disable()</code> و<code>enable()</code>.' } },
    { n:'Validator', k:'ng', w:{ en:'Angular’s interface for a class that validates.', ar:'الـ interface بتاع أنجولار لكلاس بيعمل validation.' } },
    { n:'validate', k:'ng', w:{ en:'The one method the <code>Validator</code> interface requires.', ar:'الميثود الوحيدة اللي الـ interface <code>Validator</code> بيطلبها.' } },
    { n:'AbstractControl', k:'ng', w:{ en:'Angular’s base type for every form control.', ar:'النوع الأساسي بتاع أنجولار لأي form control.' } },
    { n:'ValidationErrors', k:'ng', w:{ en:'Angular’s type for the error object a validator returns.', ar:'النوع بتاع أنجولار لأوبجكت الأخطاء اللي الـ validator بيرجّعه.' } },
    { n:'Validators', k:'ng', w:{ en:'Angular’s ready-made validators, like <code>required</code> and <code>min</code>.', ar:'الـ validators الجاهزة بتاعة أنجولار، زي <code>required</code> و<code>min</code>.' } },
    { n:'input', k:'ng', re:'(?<![\\w$<(-])input(?=[.(<,])', w:{ en:'Angular’s function that creates an input.', ar:'الـ function بتاعة أنجولار اللي بتعمل input.' } },
    { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
    { n:'set', k:'ng', w:{ en:'A signal method.', ar:'ميثود بتاعة الـ signal.' } },
    { n:'@Component', k:'ng', w:{ en:'Angular’s decorator that turns a class into a component.', ar:'الـ decorator بتاع أنجولار اللي بيحوّل الكلاس لـ component.' } },
    { n:'click', k:'ng', w:{ en:'The browser’s own event name.', ar:'اسم الـ event بتاع المتصفح نفسه.' } },
    { n:'blur', k:'ng', w:{ en:'The browser’s event for “focus left this element”. The usual moment to report touched.', ar:'الـ event بتاع المتصفح لما الـ focus يسيب الـ element. ده الوقت المعتاد اللي بتقول فيه إنه اتلمس.' } },

    { n:'StarRating', k:'pub', w:{ en:'The class name. <code>forwardRef</code> points at it, and whoever lists it in <code>imports</code> follows a rename.', ar:'اسم الكلاس. <code>forwardRef</code> بيشاور عليه، وأي حد كاتبه في <code>imports</code> بيتغير معاه.' } },
    { n:'app-star-rating', k:'pub', w:{ en:'Selector: the string here and the tag in the form’s template must match.', ar:'الـ selector: النص هنا والتاج في تمبلت الفورم لازم يبقوا زي بعض.' } },
    { n:'max', k:'pub', re:'(?<![\\w$.-])max(?![\\w$-])', w:{ en:'An input. The parent sets it with <code>[max]</code>.', ar:'input. الأب بيحطه بـ <code>[max]</code>.' } },
    { n:'value', k:'mine', only:['cva','ui'],
      w:{ en:'Your own signal holding the stars. <code>c.value</code> in the validator is Angular’s control value, a different thing.',
          ar:'الـ signal بتاعتك اللي شايلة عدد النجوم. و<code>c.value</code> اللي في الـ validator دي قيمة الكنترول بتاعة أنجولار، حاجة تانية.' } },
    { n:'disabled', k:'mine', re:'(?<![\\w$\\[-])disabled(?![\\w$\\]-])',
      w:{ en:'Your own signal. In <code>[disabled]="disabled()"</code> the left side is the button’s DOM property, not yours.',
          ar:'الـ signal بتاعتك. في <code>[disabled]="disabled()"</code> الناحية الشمال دي property الـ DOM بتاعة الزرار، مش بتاعتك.' } },
    { n:'onChange', k:'mine', w:{ en:'The field where you keep Angular’s callback. Any name works; Angular never reads it.', ar:'الـ field اللي بتحفظ فيه الـ callback بتاع أنجولار. أي اسم ينفع؛ أنجولار عمره ما بيقراه.' } },
    { n:'onTouched', k:'mine', w:{ en:'The field for the touched callback, called from your own template on <code>(blur)</code>.', ar:'الـ field بتاع الـ callback بتاع اللمس، وبتناديه من التمبلت بتاعك في <code>(blur)</code>.' } },
    { n:'fn', k:'mine', w:{ en:'The parameter name. The method name is fixed; this is not.', ar:'اسم الـ parameter. اسم الميثود ثابت؛ ده لأ.' } },
    { n:'isDisabled', k:'mine', w:{ en:'The parameter name of <code>setDisabledState</code>. Yours to rename.', ar:'اسم الـ parameter بتاع <code>setDisabledState</code>. تقدر تغيّره.' } },
    { n:'pick', k:'mine', w:{ en:'Your own method, called from your own template.', ar:'الميثود بتاعتك، بتناديها من التمبلت بتاعك.' } },
    { n:'Profile', k:'pub', w:{ en:'The form page’s class name.', ar:'اسم كلاس صفحة الفورم.' } },
    { n:'form', k:'mine', only:['form'], w:{ en:'The page’s own form group, bound with <code>[formGroup]="form"</code> in its template.', ar:'الـ form group بتاع الصفحة، بيتربط بـ <code>[formGroup]="form"</code> في التمبلت بتاعها.' } },
    { n:'rating', k:'mine', only:['form'], w:{ en:'A control name. <code>formControlName="rating"</code> in the same component’s template must match it.', ar:'اسم كنترول. <code>formControlName="rating"</code> في تمبلت نفس الـ component لازم يطابقه.' } },
    { n:'Iban', k:'pub', w:{ en:'Your control’s class name, referenced by both <code>forwardRef</code>s.', ar:'اسم كلاس الكنترول بتاعك، والـ <code>forwardRef</code> الاتنين بيشاوروا عليه.' } },
    { n:'isValidIban', k:'pub', w:{ en:'Your helper function, written in another file.', ar:'الـ helper function بتاعتك، مكتوبة في ملف تاني.' } },
    { n:'iban', k:'pub', w:{ en:'The error key you return. Templates check it with <code>hasError(\'iban\')</code>, so both change together.', ar:'مفتاح الـ error اللي بترجّعه. التمبلتس بتشيّك عليه بـ <code>hasError(\'iban\')</code>، فالاتنين بيتغيروا مع بعض.' } },
    { n:'MoneyInput', k:'pub', w:{ en:'Another control’s class name.', ar:'اسم كلاس كنترول تاني.' } },
    { n:'text', k:'mine', w:{ en:'Your own signal with what the user sees on screen.', ar:'الـ signal بتاعتك اللي فيها اللي اليوزر شايفه على الشاشة.' } },
    { n:'onInput', k:'mine', w:{ en:'Your own method, called from your template on <code>(input)</code>. The <code>on</code> prefix is only a habit.', ar:'الميثود بتاعتك، بتناديها من التمبلت على <code>(input)</code>. البادئة <code>on</code> مجرد عادة.' } },
    { n:'onBlur', k:'mine', w:{ en:'Your own method, called on <code>(blur)</code>.', ar:'الميثود بتاعتك، بتتنادى على <code>(blur)</code>.' } },
  ]
}
};
