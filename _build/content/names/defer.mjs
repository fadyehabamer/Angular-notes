/* names for the @defer topic.
   n: the name exactly as typed in the code.   k: ng | mine | pub.
   w: what it is, and what has to change with it.   { en, ar }
   re / only / as: see _build/names.mjs.                                  */

/* a trigger word only counts right after "(on", "; on", "prefetch on" or "hydrate on",
   so the same word inside a comment that spans two lines is not coloured */
const TRIG = w => '(?<=[(;]\\s*(?:prefetch |hydrate )?on )' + w + '(?![\\w$-])';

export default {
'defer': {
  note: {
    en: 'Everything inside the parentheses of <code>@defer (…)</code> is Angular’s vocabulary: <code>on</code>, <code>when</code>, <code>prefetch</code>, <code>hydrate</code> and the trigger names. The only thing of yours in there is a template reference like <code>more</code> or a signal like <code>isAdmin()</code>. The components inside the block are ordinary components, with ordinary selectors and inputs.',
    ar: 'كل اللي جوه أقواس <code>@defer (…)</code> ده من قاموس أنجولار: <code>on</code> و<code>when</code> و<code>prefetch</code> و<code>hydrate</code> وأسماء الـ triggers. الحاجة الوحيدة اللي بتاعتك جوه هي template reference زي <code>more</code> أو signal زي <code>isAdmin()</code>. والـ components اللي جوه البلوك components عادية، بـ selectors وinputs عادية.'
  },
  names: [
    { n:'@defer', k:'ng', w:{ en:'Angular’s block: load this part’s code later, when a trigger fires.', ar:'البلوك بتاع أنجولار: حمّل كود الجزء ده بعدين، لما trigger يحصل.' } },
    { n:'@placeholder', k:'ng', w:{ en:'Angular’s block shown before loading starts. It is also what <code>on viewport</code> and <code>on interaction</code> watch.', ar:'البلوك بتاع أنجولار اللي بيظهر قبل ما التحميل يبدأ. وهو كمان اللي <code>on viewport</code> و<code>on interaction</code> بيراقبوه.' } },
    { n:'@loading', k:'ng', w:{ en:'Angular’s block shown while the chunk downloads.', ar:'البلوك بتاع أنجولار اللي بيظهر والـ chunk بيتحمّل.' } },
    { n:'@error', k:'ng', w:{ en:'Angular’s block shown if the download fails.', ar:'البلوك بتاع أنجولار اللي بيظهر لو التحميل فشل.' } },
    { n:'on', k:'ng', re:'(?<=[(;]\\s*(?:prefetch |hydrate )?)on(?= )', w:{ en:'Angular’s keyword that introduces a trigger.', ar:'الكلمة بتاعة أنجولار اللي بتبدأ بيها الـ trigger.' } },
    { n:'viewport', k:'ng', re:TRIG('viewport'), w:{ en:'A trigger: when the placeholder scrolls into view.', ar:'trigger: لما الـ placeholder يظهر على الشاشة.' } },
    { n:'idle', k:'ng', re:TRIG('idle'), w:{ en:'A trigger: when the browser has nothing else to do. The default.', ar:'trigger: لما المتصفح يفضى. ده الافتراضي.' } },
    { n:'interaction', k:'ng', re:TRIG('interaction'), w:{ en:'A trigger: the first click or key press on the placeholder, or on the element you name.', ar:'trigger: أول ضغطة أو زرار كيبورد على الـ placeholder، أو على الـ element اللي بتسميه.' } },
    { n:'hover', k:'ng', re:TRIG('hover'), w:{ en:'A trigger: the pointer enters the placeholder.', ar:'trigger: الماوس يدخل على الـ placeholder.' } },
    { n:'timer', k:'ng', re:TRIG('timer'), w:{ en:'A trigger: after a fixed delay.', ar:'trigger: بعد وقت محدد.' } },
    { n:'immediate', k:'ng', re:TRIG('immediate'), w:{ en:'A trigger: straight after the page renders.', ar:'trigger: على طول بعد ما الصفحة تترسم.' } },
    { n:'when', k:'ng', w:{ en:'Angular’s keyword for “once this expression is true”. The expression after it is yours.', ar:'الكلمة بتاعة أنجولار لـ “أول ما التعبير ده يبقى true”. التعبير اللي بعدها بتاعك.' } },
    { n:'prefetch', k:'ng', w:{ en:'Angular’s keyword: download early on this trigger, show later on the main one.', ar:'كلمة أنجولار: نزّل بدري على الـ trigger ده، واعرض بعدين على الـ trigger الأساسي.' } },
    { n:'hydrate', k:'ng', w:{ en:'Angular’s keyword for incremental hydration: the server already drew it, and this says when to wake it up.', ar:'كلمة أنجولار للـ incremental hydration: السيرفر رسمه خلاص، ودي بتقول إمتى يصحى.' } },
    { n:'never', k:'ng', re:'(?<=hydrate )never(?![\\w$-])', w:{ en:'With <code>hydrate</code>: keep the server HTML and never load its JavaScript.', ar:'مع <code>hydrate</code>: سيب الـ HTML اللي جه من السيرفر ومتحمّلش الـ JavaScript بتاعه أبداً.' } },
    { n:'minimum', k:'ng', w:{ en:'Angular’s option: keep this block on screen at least this long, so it does not flash.', ar:'اختيار من أنجولار: خلي البلوك ده ظاهر المدة دي على الأقل، عشان ميرمّشش.' } },
    { n:'after', k:'ng', w:{ en:'Angular’s option: only show the loading block if loading takes longer than this.', ar:'اختيار من أنجولار: متظهرش بلوك التحميل إلا لو التحميل أخد وقت أطول من كده.' } },
    { n:'@if', k:'ng', w:{ en:'Angular’s control-flow block.', ar:'بلوك الـ control flow بتاع أنجولار.' } },
    { n:'@for', k:'ng', w:{ en:'Angular’s control-flow loop.', ar:'الـ loop بتاعة الـ control flow في أنجولار.' } },
    { n:'@Component', k:'ng', w:{ en:'Angular’s decorator that turns a class into a component.', ar:'الـ decorator بتاع أنجولار اللي بيحوّل الكلاس لـ component.' } },
    { n:'input', k:'ng', re:'(?<![\\w$<(-])input(?=[.(<,])', w:{ en:'Angular’s function that creates an input.', ar:'الـ function بتاعة أنجولار اللي بتعمل input.' } },
    { n:'ChartLib', k:'ng', w:{ en:'The heavy library’s own export. Its name is whatever that library chose.', ar:'الـ export بتاع المكتبة التقيلة نفسها. اسمه اللي المكتبة اختارته.' } },

    { n:'app-reviews', k:'pub', w:{ en:'Selector: the string in <code>Reviews</code> and every tag that uses it must match.', ar:'الـ selector: النص اللي في <code>Reviews</code> وكل تاج بيستخدمه لازم يبقوا زي بعض.' } },
    { n:'Reviews', k:'pub', only:['chunk'], w:{ en:'The class name. The template only references it through its tag, which is why the whole file can be deferred.', ar:'اسم الكلاس. التمبلت بيشاور عليه من خلال التاج بس، وعشان كده الملف كله ينفع يتأجل.' } },
    { n:'productId', k:'pub', w:{ en:'An input. The page binds <code>[productId]</code>, so both files change together.', ar:'input. الصفحة بتربط <code>[productId]</code>، فالملفين بيتغيروا مع بعض.' } },
    { n:'product', k:'mine', re:'(?<![\\w$.\\[-])product(?=\\()',
      w:{ en:'The page’s own signal. <code>[product]</code> on <code>app-buy-box</code> is that child’s input, a separate name.', ar:'الـ signal بتاعة الصفحة نفسها. و<code>[product]</code> اللي على <code>app-buy-box</code> ده input الابن، اسم تاني.' } },
    { n:'images', k:'pub', re:'(?<=\\[)images(?=\\])', w:{ en:'The gallery’s input. <code>.images</code> on the right is a field on your product data.', ar:'الـ input بتاع الـ gallery. و<code>.images</code> اللي على اليمين field في داتا المنتج بتاعك.' } },
    { n:'app-gallery', k:'pub', w:{ en:'A child component’s selector.', ar:'الـ selector بتاع component ابن.' } },
    { n:'app-buy-box', k:'pub', w:{ en:'A child component’s selector.', ar:'الـ selector بتاع component ابن.' } },
    { n:'app-spinner', k:'pub', w:{ en:'A child component’s selector.', ar:'الـ selector بتاع component ابن.' } },
    { n:'more', k:'mine', w:{ en:'Your template reference, <code>#more</code>. <code>interaction(more)</code> must use the same name.', ar:'الـ template reference بتاعك، <code>#more</code>. و<code>interaction(more)</code> لازم يستخدم نفس الاسم.' } },
    { n:'isAdmin', k:'mine', w:{ en:'Your component’s own signal.', ar:'الـ signal بتاعة الـ component بتاعك.' } },
    { n:'StarRating', k:'pub', w:{ en:'Another of your components, imported here.', ar:'component تاني من بتوعك، بيتعمله import هنا.' } },
    { n:'app-comment-form', k:'pub', w:{ en:'A child component’s selector.', ar:'الـ selector بتاع component ابن.' } },
    { n:'postId', k:'pub', w:{ en:'The comment form’s input.', ar:'الـ input بتاع فورم الكومنتات.' } },
    { n:'post', k:'mine', w:{ en:'The page’s own signal.', ar:'الـ signal بتاعة الصفحة نفسها.' } },
    { n:'app-legal-footer', k:'pub', w:{ en:'A child component’s selector.', ar:'الـ selector بتاع component ابن.' } },
    { n:'tabs', k:'mine', w:{ en:'The dashboard’s own list.', ar:'الليستة بتاعة الداشبورد نفسه.' } },
    { n:'active', k:'mine', w:{ en:'The dashboard’s own signal: which tab is open.', ar:'الـ signal بتاعة الداشبورد نفسه: أنهي تاب مفتوح.' } },
    { n:'app-revenue-charts', k:'pub', w:{ en:'A child component’s selector.', ar:'الـ selector بتاع component ابن.' } },
    { n:'app-cohort-table', k:'pub', w:{ en:'A child component’s selector.', ar:'الـ selector بتاع component ابن.' } },
    { n:'skeleton', k:'mine', w:{ en:'Your CSS class, from your own stylesheet.', ar:'كلاس CSS بتاعك، من ملف الـ CSS بتاعك.' } },
  ]
}
};
