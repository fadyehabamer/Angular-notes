/* ==================================================================
   Renderer2, name by name — a companion page after the renderer2
   topic. One running example (the tooltip directive from the topic)
   followed through every file, with every name coloured by who owns
   it. Names list: inline, below.
   ================================================================== */

/* a name in running text, coloured like the code and linked on hover */
const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

/* code blocks that need their own names */
const TXT_BAD = 'tooltip.ts — input named text';
const TXT_HTML = 'save-bar.html · if the input were text';
const TXT_ALIAS = 'tooltip.ts · with alias';

export default {
  topic: 'renderer2',
  tab: 'Renderer2, name by name — The Angular Signal',
  title: { en: '<code>Renderer2</code>, name by name', ar: '<code>Renderer2</code>، اسم اسم' },
  say: {
    en: 'One tooltip directive followed from the button that uses it to the element it creates. Every name coloured by who owns it: <b>Angular’s</b> (or the browser’s), <b>yours</b>, or <b>yours but shared</b> with a template or a stylesheet. Then what breaks when you rename each one.',
    ar: 'directive واحد بتاع tooltip ماشيين وراه من الزرار اللي بيستخدمه لحد الـ element اللي بيعمله. كل اسم ملوّن حسب صاحبه: <b>بتاع أنجولار</b> (أو المتصفح)، ولا <b>بتاعك</b>، ولا <b>بتاعك بس متشارك</b> مع تمبلت أو ملف CSS. وبعدين إيه اللي بيبوظ لما تغيّر كل واحد.'
  },
  lead: {
    en: 'The idea behind <code>Renderer2</code> is small: <b>instead of touching the DOM yourself, you ask Angular’s renderer to do it</b>, so the same code also runs on the server. The confusing part is the names. One small directive mixes Angular’s method names, the browser’s event names, HTML tag and attribute names, an ARIA word and a CSS class, most of them inside quotes where they all look the same. This page sorts out which of those words are yours, and which ones another file has to copy.',
    ar: 'الفكرة ورا <code>Renderer2</code> صغيرة: <b>بدل ما تلمس الـ DOM بإيدك، بتطلب من الـ renderer بتاع أنجولار يعملها</b>، فنفس الكود يشتغل على السيرفر كمان. اللي بيلخبط هو الأسماء. directive صغير واحد بيخلط أسماء ميثودز أنجولار، وأسماء events المتصفح، وأسماء تاجات وattributes من HTML، وكلمة من ARIA، وكلاس CSS، وأغلبهم بين علامات تنصيص فشكلهم كلهم واحد. الصفحة دي بتفرز أنهي كلمة فيهم بتاعتك، وأنهي واحدة ملف تاني لازم ينسخها.'
  },

  names: {
    note: {
      en: 'Almost every quoted string here belongs to someone else: HTML (<code>\'span\'</code>, <code>\'role\'</code>), ARIA (<code>\'tooltip\'</code> as a role), the DOM (<code>\'keydown\'</code>, <code>\'Escape\'</code>) or the renderer itself (<code>\'document\'</code>). Read the orange rows first: the selector (which is also the input), the class name, and the CSS class. Those are the names a template or a stylesheet has to copy.',
      ar: 'تقريبًا كل نص بين علامات تنصيص هنا بتاع حد تاني: HTML (<code>\'span\'</code> و<code>\'role\'</code>)، أو ARIA (<code>\'tooltip\'</code> كـ role)، أو الـ DOM (<code>\'keydown\'</code> و<code>\'Escape\'</code>)، أو الـ renderer نفسه (<code>\'document\'</code>). اقرا الصفوف البرتقاني الأول: الـ selector (اللي هو كمان الـ input)، واسم الكلاس، وكلاس الـ CSS. دول الأسماء اللي تمبلت أو ملف CSS لازم ينسخها.'
    },
    names: [
      /* --- shared: another file types it too --- */
      { n:'appTooltip', k:'pub', as:'appBubble',
        w:{ en:'The selector <b>and</b> the input, on purpose: <code>appTooltip="Save"</code> both attaches the directive and sets the text. Rename the selector, the input, every template and the CSS rule together.',
            ar:'الـ selector <b>و</b>الـ input في نفس الوقت، بالقصد: <code>appTooltip="Save"</code> بيركّب الـ directive وبيحط النص مع بعض. غيّر الـ selector والـ input وكل تمبلت وقاعدة الـ CSS مع بعض.' } },
      { n:'Tooltip', k:'pub', re:'(?<![\\w$\'-])Tooltip(?![\\w$\'-])',
        w:{ en:'The directive’s class. Whoever uses it imports it and lists it in <code>imports</code>.',
            ar:'كلاس الـ directive. أي حد بيستخدمه بيعمله import وبيكتبه في <code>imports</code>.' } },
      { n:'.tooltip', k:'pub', re:'(?<=addClass\\(\\w+, \')tooltip(?=\')|(?<=^\\.)tooltip(?![\\w-])',
        w:{ en:'Your CSS class. The directive adds it with <code>addClass</code> and <code>styles.css</code> styles it, so the two must match. No error if they do not.',
            ar:'كلاس الـ CSS بتاعك. الـ directive بيضيفه بـ <code>addClass</code> و<code>styles.css</code> بيدّيله الشكل، فالاتنين لازم يبقوا زي بعض. ومفيش error لو مش زي بعض.' } },
      { n:'SaveBar', k:'pub',
        w:{ en:'The component that uses the tooltip. Whoever shows it imports it by this name.', ar:'الـ component اللي بيستخدم الـ tooltip. أي حد بيعرضه بيعمله import بالاسم ده.' } },
      { n:'app-save-bar', k:'pub',
        w:{ en:'That component’s selector. Whoever shows it types this tag.', ar:'الـ selector بتاع الـ component ده. أي حد بيعرضه بيكتب التاج ده.' } },
      { n:'text', k:'pub', only:[TXT_BAD, TXT_HTML],
        w:{ en:'An input named differently from the selector. Now every template has to type it as a second attribute.',
            ar:'input اسمه مختلف عن الـ selector. كده كل تمبلت لازم يكتبه كـ attribute تاني.' } },

      /* --- yours, private to one file --- */
      { n:'text', k:'mine', only:[TXT_ALIAS],
        w:{ en:'With an alias, the property name is only used inside the directive. Templates type the alias.',
            ar:'مع الـ alias، اسم الـ property بيتستخدم جوه الـ directive بس. والتمبلتس بتكتب الـ alias.' } },
      { n:'r', k:'mine', only:['ts'], re:'(?<![\\w$\'-])r(?![\\w$\'-])',
        w:{ en:'Your short field name for the renderer. <code>renderer</code> is just as good.', ar:'اسم الـ field القصير بتاعك للـ renderer. و<code>renderer</code> كويس برضه.' } },
      { n:'host', k:'mine', re:'(?<![\\w$\'-])host(?![\\w$\'-])(?!: \\{)',
        w:{ en:'Your field name for the <code>ElementRef</code>. The <code>host:</code> key in the decorator is Angular’s and a different thing.',
            ar:'اسم الـ field بتاعك للـ <code>ElementRef</code>. والمفتاح <code>host:</code> اللي في الـ decorator بتاع أنجولار وحاجة تانية خالص.' } },
      { n:'node', k:'mine',
        w:{ en:'Your field that remembers the tooltip element, so <code>hide()</code> can remove it.', ar:'الـ field بتاعك اللي فاكر الـ element بتاع الـ tooltip، عشان <code>hide()</code> تقدر تشيله.' } },
      { n:'n', k:'mine', only:['ts'], re:'(?<![\\w$.\'-])n(?![\\w$\'-])',
        w:{ en:'A local variable for the new element. Lives only inside <code>show()</code>.', ar:'متغير محلي للـ element الجديد. عايش جوه <code>show()</code> بس.' } },
      { n:'stopKeys', k:'mine',
        w:{ en:'Your name for the function <code>listen()</code> returned. Calling it removes the listener.', ar:'الاسم بتاعك للـ function اللي <code>listen()</code> رجّعتها. لما تناديها بتشيل الـ listener.' } },
      { n:'e', k:'mine', only:['ts'], re:'(?<![\\w$.\'-])e(?=[:.])',
        w:{ en:'The callback’s parameter. Any name works; its type, <code>KeyboardEvent</code>, is the browser’s.', ar:'الـ parameter بتاع الـ callback. أي اسم ينفع؛ ونوعه، <code>KeyboardEvent</code>، بتاع المتصفح.' } },
      { n:'show', k:'mine',
        w:{ en:'Your method. It is named inside the <code>host</code> strings, so those strings follow a rename.', ar:'الميثود بتاعتك. اسمها مكتوب جوه نصوص الـ <code>host</code>، فالنصوص دي بتتغير معاها.' } },
      { n:'hide', k:'mine',
        w:{ en:'Your method, named in the <code>host</code> strings and called from <code>onDestroy</code>.', ar:'الميثود بتاعتك، مكتوبة في نصوص الـ <code>host</code> وبتتنادى من <code>onDestroy</code>.' } },
      { n:'save', k:'mine', w:{ en:'The component’s own method, called by its own button.', ar:'ميثود الـ component نفسه، والزرار بتاعه هو اللي بيناديها.' } },
      { n:'discard', k:'mine', w:{ en:'The component’s own method.', ar:'ميثود الـ component نفسه.' } },
      { n:'edits', k:'mine', w:{ en:'The component’s own signal.', ar:'الـ signal بتاعة الـ component نفسه.' } },

      /* --- Angular's, the browser's, HTML's, ARIA's --- */
      { n:'Renderer2', k:'ng', w:{ en:'Angular’s class for changing the DOM in a way that also works on the server.', ar:'الكلاس بتاع أنجولار اللي بتعدّل بيه الـ DOM بطريقة بتشتغل على السيرفر كمان.' } },
      { n:'ElementRef', k:'ng', w:{ en:'Angular’s wrapper around the element the directive sits on.', ar:'الـ wrapper بتاع أنجولار حوالين الـ element اللي الـ directive قاعد عليه.' } },
      { n:'nativeElement', k:'ng', w:{ en:'<code>ElementRef</code>’s property: the real DOM element inside. The renderer’s methods want this, not the wrapper.', ar:'property في <code>ElementRef</code>: الـ DOM element الحقيقي اللي جواه. ميثودز الـ renderer عايزة ده، مش الـ wrapper.' } },
      { n:'DestroyRef', k:'ng', w:{ en:'Angular’s handle for “run this when I am destroyed”.', ar:'الـ handle بتاع أنجولار لـ «شغّل ده لما أتشال».' } },
      { n:'onDestroy', k:'ng', w:{ en:'<code>DestroyRef</code>’s method that registers the cleanup.', ar:'ميثود في <code>DestroyRef</code> بتسجّل التنضيف.' } },
      { n:'inject', k:'ng', w:{ en:'Angular’s function that hands you a service.', ar:'الـ function بتاعة أنجولار اللي بتجيبلك service.' } },
      { n:'input', k:'ng', re:'(?<![\\w$<(-])input(?=[.(<,])', w:{ en:'Angular’s function that creates an input.', ar:'الـ function بتاعة أنجولار اللي بتعمل input.' } },
      { n:'required', k:'ng', w:{ en:'Part of <code>input.required</code> (and an option of the old <code>@Input</code>).', ar:'جزء من <code>input.required</code> (واختيار في <code>@Input</code> القديم).' } },
      { n:'alias', k:'ng', w:{ en:'An option key Angular reads. The string you give it is yours.', ar:'مفتاح إعداد أنجولار بيقراه. النص اللي بتديهوله بتاعك.' } },
      { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
      { n:'set', k:'ng', w:{ en:'A signal method.', ar:'ميثود بتاعة الـ signal.' } },
      { n:'@Directive', k:'ng', w:{ en:'Angular’s decorator for a directive: behaviour you attach to an existing element.', ar:'الـ decorator بتاع أنجولار للـ directive: سلوك بتركّبه على element موجود.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator for a component.', ar:'الـ decorator بتاع أنجولار للـ component.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The string after it is yours.', ar:'مفتاح إعداد. النص اللي بعده بتاعك.' } },
      { n:'host:', k:'ng', re:'(?<![\\w$.-])host(?=: \\{)',
        w:{ en:'Angular’s metadata key for listeners and bindings on the element the directive sits on. Not the same word as your <code>host</code> field.',
            ar:'مفتاح الـ metadata بتاع أنجولار للـ listeners والـ bindings على الـ element اللي الـ directive قاعد عليه. مش نفس كلمة الـ field <code>host</code> بتاعك.' } },
      { n:'imports', k:'ng', w:{ en:'An option key: the components and directives this template uses.', ar:'مفتاح إعداد: الـ components والـ directives اللي التمبلت ده بيستخدمها.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key. The path after it points at your file.', ar:'مفتاح إعداد. المسار اللي بعده بيشاور على ملفك.' } },
      { n:'createElement', k:'ng', w:{ en:'A <code>Renderer2</code> method. The tag name you pass is HTML’s.', ar:'ميثود في <code>Renderer2</code>. اسم التاج اللي بتديهوله بتاع HTML.' } },
      { n:'createText', k:'ng', w:{ en:'A <code>Renderer2</code> method that makes a text node.', ar:'ميثود في <code>Renderer2</code> بتعمل text node.' } },
      { n:'addClass', k:'ng', w:{ en:'A <code>Renderer2</code> method. The class name you pass is yours.', ar:'ميثود في <code>Renderer2</code>. اسم الكلاس اللي بتديهوله بتاعك.' } },
      { n:'setAttribute', k:'ng', w:{ en:'A <code>Renderer2</code> method: sets an HTML attribute. The attribute name is HTML’s.', ar:'ميثود في <code>Renderer2</code>: بتحط attribute في HTML. واسم الـ attribute بتاع HTML.' } },
      { n:'setProperty', k:'ng', w:{ en:'A <code>Renderer2</code> method: sets a DOM property. The property name is the DOM’s.', ar:'ميثود في <code>Renderer2</code>: بتحط property في الـ DOM. واسم الـ property بتاع الـ DOM.' } },
      { n:'appendChild', k:'ng', w:{ en:'A <code>Renderer2</code> method: parent first, then the child.', ar:'ميثود في <code>Renderer2</code>: الأب الأول، وبعدين الابن.' } },
      { n:'removeChild', k:'ng', w:{ en:'A <code>Renderer2</code> method.', ar:'ميثود في <code>Renderer2</code>.' } },
      { n:'listen', k:'ng', w:{ en:'A <code>Renderer2</code> method. It returns the function that stops listening.', ar:'ميثود في <code>Renderer2</code>. بترجّع الـ function اللي بتوقّف الاستماع.' } },
      { n:'document', k:'ng',
        w:{ en:'In <code>listen(\'document\', …)</code> and <code>(document:…)</code>: a fixed target name (<code>\'window\'</code> and <code>\'body\'</code> also work). Written bare, it is the browser’s global page object, which does not exist on the server.',
            ar:'في <code>listen(\'document\', …)</code> و<code>(document:…)</code>: اسم هدف ثابت (و<code>\'window\'</code> و<code>\'body\'</code> بيشتغلوا كمان). ولو اتكتب لوحده يبقى أوبجكت الصفحة العام بتاع المتصفح، وده مش موجود على السيرفر.' } },
      { n:'role', k:'ng', re:'(?<=\')role(?=\')', w:{ en:'An HTML attribute name.', ar:'اسم attribute في HTML.' } },
      { n:'tooltip', k:'ng', re:'(?<=\'role\', \')tooltip(?=\')',
        w:{ en:'An ARIA role value, fixed by the ARIA spec. Same spelling as your CSS class, completely different owner: renaming your class must not touch this one.',
            ar:'قيمة role من ARIA، ثابتة بالمواصفات بتاعة ARIA. نفس حروف كلاس الـ CSS بتاعك، بس صاحبها مختلف خالص: لو غيّرت الكلاس بتاعك متلمسش دي.' } },
      { n:'textContent', k:'ng', re:'(?<=\')textContent(?=\')', w:{ en:'A DOM property name. It is a property, not an attribute.', ar:'اسم property في الـ DOM. هي property، مش attribute.' } },
      { n:'mouseenter', k:'ng', w:{ en:'The browser’s event name. All lower case.', ar:'اسم الـ event بتاع المتصفح. كله حروف صغيرة.' } },
      { n:'mouseleave', k:'ng', w:{ en:'The browser’s event name.', ar:'اسم الـ event بتاع المتصفح.' } },
      { n:'focus', k:'ng', w:{ en:'The browser’s event name.', ar:'اسم الـ event بتاع المتصفح.' } },
      { n:'blur', k:'ng', w:{ en:'The browser’s event name.', ar:'اسم الـ event بتاع المتصفح.' } },
      { n:'click', k:'ng', w:{ en:'The browser’s event name.', ar:'اسم الـ event بتاع المتصفح.' } },
      { n:'keydown', k:'ng', w:{ en:'The browser’s event name.', ar:'اسم الـ event بتاع المتصفح.' } },
      { n:'escape', k:'ng', re:'(?<=keydown\\.)escape(?![\\w-])', w:{ en:'Angular’s key filter in <code>(keydown.escape)</code>.', ar:'فلتر الزرار بتاع أنجولار في <code>(keydown.escape)</code>.' } },
      { n:'key', k:'ng', re:'(?<=\\.)key(?![\\w$])', w:{ en:'The keyboard event’s property: which key was pressed.', ar:'property في event الكيبورد: أنهي زرار اتداس.' } },
      { n:'Escape', k:'ng', w:{ en:'The browser’s fixed value of <code>key</code> for the Esc key.', ar:'القيمة الثابتة بتاعة <code>key</code> من المتصفح لزرار Esc.' } },
      { n:'KeyboardEvent', k:'ng', w:{ en:'The browser’s type for a keyboard event.', ar:'النوع بتاع المتصفح لـ event الكيبورد.' } },
      { n:'HTMLElement', k:'ng', w:{ en:'The browser’s type for any HTML element.', ar:'النوع بتاع المتصفح لأي element في HTML.' } },
      { n:'@Input', k:'ng', w:{ en:'The older input decorator.', ar:'الـ decorator القديم للـ input.' } },
      { n:'@HostListener', k:'ng', w:{ en:'The older decorator for listening on the host element.', ar:'الـ decorator القديم للاستماع على الـ host element.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One hover, six stops', ar: 'هوفر واحد، ست محطات' },
    lead: {
      en: 'A Save button that shows a small tooltip when you point at it. The tooltip is a directive: it creates a <code>&lt;span&gt;</code>, puts it inside the button, and removes it again. Follow one hover:',
      ar: 'زرار Save بيظهر tooltip صغير لما تقف عليه بالماوس. الـ tooltip ده directive: بيعمل <code>&lt;span&gt;</code>، ويحطه جوه الزرار، وبعدين يشيله تاني. امشي ورا هوفر واحد:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'save-bar.html', lang: 'html', who: { en: 'the user · a template', ar: 'اللي بيستخدمه · تمبلت' },
          code: ['<button appTooltip="Save your changes" (click)="save()">Save</button>'],
          say: { en: `A component’s template puts the directive on a button. ${pub('appTooltip')} is the name you gave the directive, typed here as an attribute. Its value, <i>“Save your changes”</i>, is the text to show. ${ng('click')} is the browser’s; ${mine('save')} is this component’s own method, unrelated to the tooltip.`,
                 ar: `تمبلت component بيحط الـ directive على زرار. ${pub('appTooltip')} ده الاسم اللي انت اديته للـ directive، ومكتوب هنا كـ attribute. وقيمته، <i>«Save your changes»</i>، هي النص اللي هيظهر. ${ng('click')} بتاع المتصفح؛ و${mine('save')} ميثود الـ component ده نفسه، ملهاش علاقة بالـ tooltip.` } },
        { file: 'tooltip.ts', lang: 'ts', who: { en: 'directive · matches', ar: 'الـ directive · بيتطابق' },
          code: ["selector: '[appTooltip]',", '', 'readonly appTooltip = input.required<string>();'],
          say: { en: `The square brackets in the selector mean <i>“any element with this attribute”</i>. The input has the <b>same name</b> as the selector on purpose, so one attribute both attaches the directive and fills the input. ${ng('selector')} and ${ng('input')} are Angular’s; ${pub('appTooltip')} is yours, typed in both places.`,
                 ar: `الأقواس المربعة في الـ selector معناها <i>«أي element عليه الـ attribute ده»</i>. والـ input اسمه <b>نفس اسم</b> الـ selector بالقصد، عشان attribute واحد يركّب الـ directive ويملا الـ input مع بعض. ${ng('selector')} و${ng('input')} بتوع أنجولار؛ و${pub('appTooltip')} بتاعك، ومكتوب في المكانين.` } },
        { file: 'tooltip.ts', lang: 'ts', who: { en: 'directive · listens', ar: 'الـ directive · بيسمع' },
          code: ['host: {', "  '(mouseenter)': 'show()',", "  '(mouseleave)': 'hide()',", '},'],
          say: { en: `The pointer enters the button. ${ng('host:')} is Angular’s key for “listen on the element I sit on”. Inside the quotes, ${ng('mouseenter')} is the browser’s event name, and ${mine('show')} is your method. Both are just text in a string, so nothing highlights a typo for you.`,
                 ar: `الماوس دخل على الزرار. ${ng('host:')} مفتاح أنجولار لـ «اسمع على الـ element اللي أنا قاعد عليه». وجوه علامات التنصيص، ${ng('mouseenter')} اسم الـ event بتاع المتصفح، و${mine('show')} الميثود بتاعتك. الاتنين مجرد كلام جوه string، فمحدش هيعلّم لك على غلطة إملائية.` } },
        { file: 'tooltip.ts', lang: 'ts', who: { en: 'directive · builds', ar: 'الـ directive · بيبني' },
          code: ["const n: HTMLElement = this.r.createElement('span');", "this.r.addClass(n, 'tooltip');", "this.r.setAttribute(n, 'role', 'tooltip');", 'this.r.appendChild(this.host.nativeElement, n);'],
          say: { en: `${mine('show')} asks the renderer, which you called ${mine('r')}, to build the element. Every method (${ng('createElement')}, ${ng('addClass')}, ${ng('setAttribute')}, ${ng('appendChild')}) is Angular’s. Look at the two <code>'tooltip'</code> strings: the first is ${pub('.tooltip')}, <b>your</b> CSS class; the second is ${ng('tooltip')}, an ARIA role that you cannot rename. ${mine('n')} and ${mine('host')} are your own variable names.`,
                 ar: `${mine('show')} بتطلب من الـ renderer، اللي انت سمّيته ${mine('r')}، إنه يبني الـ element. كل الميثودز (${ng('createElement')} و${ng('addClass')} و${ng('setAttribute')} و${ng('appendChild')}) بتاعة أنجولار. بص على الـ <code>'tooltip'</code> الاتنين: الأولانية ${pub('.tooltip')}، كلاس الـ CSS <b>بتاعك</b>؛ والتانية ${ng('tooltip')}، role من ARIA مينفعش تغيّره. و${mine('n')} و${mine('host')} أسماء متغيرات بتاعتك.` } },
        { file: 'styles.css', lang: 'css', who: { en: 'global stylesheet · styles', ar: 'ملف الـ CSS العام · بيدّي الشكل' },
          code: ['.tooltip {', '  position: absolute;', '}'],
          say: { en: `The span now has a class, and this rule gives it its look. The class name must be <b>exactly</b> the string you passed to ${ng('addClass')}. A directive has no stylesheet of its own, so the rule lives in the global <code>styles.css</code>.`,
                 ar: `الـ span بقى عليه كلاس، والقاعدة دي بتديله شكله. اسم الكلاس لازم يبقى <b>بالظبط</b> النص اللي اديته لـ ${ng('addClass')}. والـ directive مالوش ملف CSS خاص بيه، فالقاعدة عايشة في <code>styles.css</code> العام.` } },
        { file: 'tooltip.ts', lang: 'ts', who: { en: 'directive · cleans up', ar: 'الـ directive · بينضّف' },
          code: ['this.stopKeys?.();', 'this.r.removeChild(this.host.nativeElement, this.node);'],
          say: { en: `The pointer leaves, so ${mine('hide')} runs. ${mine('stopKeys')} is the function ${ng('listen')} handed back when the tooltip opened; calling it removes that listener. ${ng('removeChild')} takes the span out again. ${mine('node')} is the field where ${mine('show')} kept it.`,
                 ar: `الماوس خرج، فـ ${mine('hide')} بتشتغل. ${mine('stopKeys')} هي الـ function اللي ${ng('listen')} رجّعتها لما الـ tooltip اتفتح؛ ولما تناديها بتشيل الـ listener ده. و${ng('removeChild')} بتطلّع الـ span تاني. و${mine('node')} الـ field اللي ${mine('show')} حفظته فيه.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'Template: <code>&lt;button appTooltip="…"&gt;</code>. Directive: <code>selector: \'[appTooltip]\'</code> plus <code>addClass(n, \'tooltip\')</code>. Stylesheet: <code>.tooltip { … }</code>. The names other files copy are <b>appTooltip</b>, the class <b>Tooltip</b> and the CSS class <b>tooltip</b>. Every other word is Angular’s, the browser’s, or private to the directive.',
        ar: 'التمبلت: <code>&lt;button appTooltip="…"&gt;</code>. الـ directive: <code>selector: \'[appTooltip]\'</code> و<code>addClass(n, \'tooltip\')</code>. ملف الـ CSS: <code>.tooltip { … }</code>. الأسماء اللي ملفات تانية بتنسخها هي <b>appTooltip</b>، والكلاس <b>Tooltip</b>، وكلاس الـ CSS <b>tooltip</b>. أي كلمة تانية يا بتاعة أنجولار، يا بتاعة المتصفح، يا خاصة بالـ directive.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Directive, template or stylesheet?', ar: 'الـ directive ولا التمبلت ولا الـ CSS؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'Three files are involved, and each piece has exactly one home. Once you see where each line lives, most of the “where does this go?” feeling goes away.',
      ar: 'فيه تلات ملفات داخلين في الحكاية، وكل حتة ليها بيت واحد بس. أول ما تشوف كل سطر عايش فين، أغلب إحساس «دي تتكتب فين؟» بيختفي.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>selector: \'[appTooltip]\'</code>', '<code>tooltip.ts</code>', 'the directive', `you pick ${pub('appTooltip')}; ${ng('selector')} is Angular’s`],
            ar: ['<code>selector: \'[appTooltip]\'</code>', '<code>tooltip.ts</code>', 'الـ directive', `انت بتختار ${pub('appTooltip')}؛ و${ng('selector')} بتاع أنجولار`] },
          { en: ['<code>readonly appTooltip = input.required…</code>', '<code>tooltip.ts</code>', 'the directive', `you, but you copy the selector on purpose`],
            ar: ['<code>readonly appTooltip = input.required…</code>', '<code>tooltip.ts</code>', 'الـ directive', 'انت، بس بتنسخ الـ selector بالقصد'] },
          { en: ['<code>\'(mouseenter)\': \'show()\'</code>', '<code>tooltip.ts</code>, in <code>host</code>', 'the directive', `the browser picks ${ng('mouseenter')}; you pick ${mine('show')}`],
            ar: ['<code>\'(mouseenter)\': \'show()\'</code>', '<code>tooltip.ts</code>، في <code>host</code>', 'الـ directive', `المتصفح بيختار ${ng('mouseenter')}؛ وانت بتختار ${mine('show')}`] },
          { en: ['<code>private readonly r = inject(Renderer2)</code>', '<code>tooltip.ts</code>', 'the directive', `you pick ${mine('r')}; ${ng('Renderer2')} is Angular’s`],
            ar: ['<code>private readonly r = inject(Renderer2)</code>', '<code>tooltip.ts</code>', 'الـ directive', `انت بتختار ${mine('r')}؛ و${ng('Renderer2')} بتاع أنجولار`] },
          { en: ['<code>this.r.addClass(n, \'tooltip\')</code>', '<code>tooltip.ts</code>', 'the directive', `${ng('addClass')} is Angular’s; you pick ${pub('.tooltip')}, and the stylesheet copies it`],
            ar: ['<code>this.r.addClass(n, \'tooltip\')</code>', '<code>tooltip.ts</code>', 'الـ directive', `${ng('addClass')} بتاعة أنجولار؛ وانت بتختار ${pub('.tooltip')}، وملف الـ CSS بينسخه`] },
          { en: ['<code>.tooltip { … }</code>', '<code>styles.css</code>', 'you, globally', `copies ${pub('.tooltip')} exactly`],
            ar: ['<code>.tooltip { … }</code>', '<code>styles.css</code>', 'انت، في الملف العام', `بينسخ ${pub('.tooltip')} بالظبط`] },
          { en: ['<code>&lt;button appTooltip="…"&gt;</code>', '<code>save-bar.html</code>', 'whoever uses the tooltip', `copies ${pub('appTooltip')}; the text is theirs`],
            ar: ['<code>&lt;button appTooltip="…"&gt;</code>', '<code>save-bar.html</code>', 'أي حد بيستخدم الـ tooltip', `بينسخ ${pub('appTooltip')}؛ والنص بتاعه هو`] },
          { en: ['<code>imports: [Tooltip]</code>', '<code>save-bar.ts</code>', 'whoever uses the tooltip', `copies the class name ${pub('Tooltip')}`],
            ar: ['<code>imports: [Tooltip]</code>', '<code>save-bar.ts</code>', 'أي حد بيستخدم الـ tooltip', `بينسخ اسم الكلاس ${pub('Tooltip')}`] },
        ] },
      { t: 'ul',
        en: ['<b>The template never calls <code>show()</code>.</b> It only puts the attribute on the button. The directive listens for the events itself, through <code>host</code>.',
             '<b>Every string you hand the renderer belongs to someone.</b> Tag names are HTML’s, attribute names are HTML’s, role values are ARIA’s, event names are the DOM’s. The one exception is a class name: that one is yours and your stylesheet’s.',
             '<b>The renderer wants real elements.</b> You pass <code>n</code> or <code>this.host.nativeElement</code>, never the <code>ElementRef</code> wrapper itself.'],
        ar: ['<b>التمبلت عمره ما بينادي <code>show()</code>.</b> هو بيحط الـ attribute على الزرار وبس. والـ directive بيسمع الـ events بنفسه، عن طريق <code>host</code>.',
             '<b>أي نص بتديه للـ renderer بتاع حد.</b> أسماء التاجات بتاعة HTML، وأسماء الـ attributes بتاعة HTML، وقيم الـ role بتاعة ARIA، وأسماء الـ events بتاعة الـ DOM. الاستثناء الوحيد اسم الكلاس: ده بتاعك وبتاع ملف الـ CSS بتاعك.',
             '<b>الـ renderer عايز elements حقيقية.</b> بتدّيله <code>n</code> أو <code>this.host.nativeElement</code>، عمرك ما تدّيله الـ <code>ElementRef</code> نفسه.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All four files, every name coloured', ar: 'الأربع ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same example, complete. Hover a coloured name to light up everywhere else it appears. Then press <b>Rename test</b>: every name you own turns into a made-up word, Angular’s and the browser’s words stay put, and the code still works. Watch the two <code>\'tooltip\'</code> strings: only one of them changes.',
      ar: 'نفس المثال، كامل. قف بالماوس على أي اسم ملوّن وهتنوّر كل الأماكن التانية اللي هو فيها. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: كل اسم بتاعك هيبقى كلمة عشوائية، وكلمات أنجولار والمتصفح هتفضل مكانها، والكود لسه شغال. بص على الـ <code>\'tooltip\'</code> الاتنين: واحدة بس اللي بتتغير.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'tooltip.ts', lang: 'ts', tag: { en: 'the directive', ar: 'الـ directive' }, code: [
        "import { Directive, ElementRef, Renderer2, DestroyRef, inject, input } from '@angular/core';",
        '',
        '@Directive({',
        "  selector: '[appTooltip]',",
        '  host: {',
        "    '(mouseenter)': 'show()',",
        "    '(mouseleave)': 'hide()',",
        "    '(focus)': 'show()',",
        "    '(blur)': 'hide()',",
        '  },',
        '})',
        'export class Tooltip {',
        '  readonly appTooltip = input.required<string>();',
        '',
        '  private readonly r = inject(Renderer2);',
        '  private readonly host = inject(ElementRef<HTMLElement>);',
        '  private node: HTMLElement | null = null;',
        '  private stopKeys: (() => void) | null = null;',
        '',
        '  constructor() {',
        '    inject(DestroyRef).onDestroy(() => this.hide());',
        '  }',
        '',
        '  show() {',
        '    if (this.node) return;',
        "    const n: HTMLElement = this.r.createElement('span');",
        "    this.r.addClass(n, 'tooltip');",
        "    this.r.setAttribute(n, 'role', 'tooltip');",
        '    this.r.appendChild(n, this.r.createText(this.appTooltip()));',
        '    this.r.appendChild(this.host.nativeElement, n);',
        '    this.node = n;',
        '',
        '    // Esc closes it. listen() hands back the function that stops listening.',
        "    this.stopKeys = this.r.listen('document', 'keydown', (e: KeyboardEvent) => {",
        "      if (e.key === 'Escape') this.hide();",
        '    });',
        '  }',
        '',
        '  hide() {',
        '    this.stopKeys?.();',
        '    this.stopKeys = null;',
        '    if (!this.node) return;',
        '    this.r.removeChild(this.host.nativeElement, this.node);',
        '    this.node = null;',
        '  }',
        '}' ] },
      { t: 'code', name: 'styles.css', lang: 'css', tag: { en: 'global styles', ar: 'الـ CSS العام' }, code: [
        '[appTooltip] {',
        '  position: relative;',
        '}',
        '',
        '.tooltip {',
        '  position: absolute;',
        '  bottom: 100%;',
        '  left: 0;',
        '  padding: 4px 8px;',
        '  background: #222;',
        '  color: #fff;',
        '  white-space: nowrap;',
        '}' ] },
      { t: 'code', name: 'save-bar.ts', lang: 'ts', tag: { en: 'uses it', ar: 'بيستخدمه' }, code: [
        "import { Component, signal } from '@angular/core';",
        "import { Tooltip } from './tooltip';",
        '',
        '@Component({',
        "  selector: 'app-save-bar',",
        '  imports: [Tooltip],',
        "  templateUrl: './save-bar.html',",
        '})',
        'export class SaveBar {',
        '  readonly edits = signal(3);',
        '',
        "  save() { console.log('saved'); }",
        '  discard() { this.edits.set(0); }',
        '}' ] },
      { t: 'code', name: 'save-bar.html', lang: 'html', tag: { en: 'uses it', ar: 'بيستخدمه' }, code: [
        '<!-- a fixed text: a plain attribute -->',
        '<button appTooltip="Save your changes" (click)="save()">Save</button>',
        '',
        '<!-- a computed text: square brackets, an expression -->',
        `<button [appTooltip]="edits() + ' unsaved changes'" (click)="discard()">Discard</button>` ] },
      { t: 'nmtable' }
    ]
  },

  /* ------------------------------------------------------------ 4 */
  {
    id: 'rename',
    kicker: { en: 'Is it OK to change it?', ar: 'ينفع أغيّره؟' },
    title: { en: 'What breaks when you rename each name', ar: 'إيه اللي بيبوظ لما تغيّر كل اسم' },
    lead: {
      en: 'Every name you own can be renamed. The question is where else you have to follow. Two of them sit inside strings, where the compiler cannot help much, and one sits in a stylesheet, where nothing ever complains.',
      ar: 'أي اسم بتاعك ينفع يتغير. السؤال بس فين تاني لازم تغيّر وراه. اتنين منهم قاعدين جوه strings، والـ compiler مش بيقدر يساعد فيها كتير، وواحد قاعد في ملف CSS، ومحدش هناك بيشتكي أبدًا.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [pub('appTooltip') + ' in the selector', 'the input, every template, the CSS <code>[appTooltip]</code> rule', 'A template that still types the plain attribute <code>appTooltip="…"</code> now has an ordinary HTML attribute: <b>no error</b>, and no tooltip. A bound <code>[appTooltip]</code> is a compile error (“Can’t bind to…”). The CSS rule silently stops matching.'],
            ar: [pub('appTooltip') + ' في الـ selector', 'الـ input، وكل تمبلت، وقاعدة الـ CSS <code>[appTooltip]</code>', 'التمبلت اللي لسه كاتب الـ attribute العادي <code>appTooltip="…"</code> بقى عنده attribute HTML عادي: <b>مفيش error</b>، ومفيش tooltip. أما <code>[appTooltip]</code> المربوط فبيبقى compile error («Can’t bind to…»). وقاعدة الـ CSS بتبطل تمسك من غير ما تقول.'] },
          { en: [pub('appTooltip') + ' in the input only', 'the selector', 'Compile error: the required input is not set by any template.'],
            ar: [pub('appTooltip') + ' في الـ input بس', 'الـ selector', 'Compile error: الـ input الإجباري محدش من التمبلتس بيحطه.'] },
          { en: [pub('Tooltip') + ' (the class)', 'the <code>import</code> line and <code>imports: [ ]</code> of every user', 'Compile error on the import.'],
            ar: [pub('Tooltip') + ' (الكلاس)', 'سطر الـ <code>import</code> و<code>imports: [ ]</code> عند كل حد بيستخدمه', 'Compile error في الـ import.'] },
          { en: [pub('.tooltip') + ' (the CSS class)', 'the rule in <code>styles.css</code>', '<b>No error at all.</b> The span appears with no styling, as plain text inside the button.'],
            ar: [pub('.tooltip') + ' (كلاس الـ CSS)', 'القاعدة في <code>styles.css</code>', '<b>مفيش أي error.</b> الـ span بيظهر من غير أي شكل، كلام عادي جوه الزرار.'] },
          { en: [mine('show') + ' / ' + mine('hide'), 'the strings in <code>host</code>, and the call in <code>onDestroy</code>', 'The name is inside a string, so by default there is no compile error. The first hover throws a <code>TypeError</code> in the console. (Recent Angular versions can type-check host bindings with the <code>typeCheckHostBindings</code> compiler option; then it is a compile error.)'],
            ar: [mine('show') + ' / ' + mine('hide'), 'النصوص اللي في <code>host</code>، والنداء اللي في <code>onDestroy</code>', 'الاسم جوه string، فافتراضيًا مفيش compile error. أول هوفر هيرمي <code>TypeError</code> في الـ console. (نسخ أنجولار الجديدة تقدر تشيّك على الـ host bindings بالاختيار <code>typeCheckHostBindings</code> في الـ compiler؛ ساعتها بيبقى compile error.)'] },
          { en: [`${mine('r')}, ${mine('host')}, ${mine('node')}, ${mine('stopKeys')}`, 'every <code>this.…</code> inside the directive', 'Compile error inside the class.'],
            ar: [`${mine('r')} و${mine('host')} و${mine('node')} و${mine('stopKeys')}`, 'كل <code>this.…</code> جوه الـ directive', 'Compile error جوه الكلاس.'] },
          { en: [`${mine('n')}, ${mine('e')}`, 'only the lines of that one method or callback', 'Compile error in that method.'],
            ar: [`${mine('n')} و${mine('e')}`, 'السطور بتاعة الميثود أو الـ callback ده بس', 'Compile error في الميثود دي.'] },
          { en: [`${ng('createElement')}, ${ng('mouseenter')}, ${ng('tooltip')} (the role), ${ng('Escape')}`, 'nothing: you cannot rename these', 'They are Angular’s, the DOM’s and ARIA’s words. A misspelled method is a compile error; a misspelled string usually is not. See the silent mistakes below.'],
            ar: [`${ng('createElement')} و${ng('mouseenter')} و${ng('tooltip')} (الـ role) و${ng('Escape')}`, 'ولا حاجة: دول مينفعش يتغيروا', 'دي كلمات أنجولار والـ DOM وARIA. ميثود مكتوبة غلط يبقى compile error؛ لكن string مكتوب غلط غالبًا لأ. شوف الغلطات الصامتة تحت.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b> in the bar above the files. The class <code>\'tooltip\'</code> in <code>addClass</code> and <code>.tooltip</code> in the stylesheet turn into the same made-up word; the role <code>\'tooltip\'</code> next to it does not move. That is exactly what a correct rename looks like.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b> في الشريط اللي فوق الملفات. الكلاس <code>\'tooltip\'</code> اللي في <code>addClass</code> و<code>.tooltip</code> اللي في ملف الـ CSS بيبقوا نفس الكلمة العشوائية؛ والـ role <code>\'tooltip\'</code> اللي جنبهم مش بيتحرك. وده بالظبط شكل التغيير الصح.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتاعتك' },
    title: { en: 'Every string you pass the renderer is someone else’s word', ar: 'أي string بتديه للـ renderer كلمة حد تاني' },
    lead: {
      en: '<code>Renderer2</code> has a small set of methods, and almost all of them take a string. That string is never Angular’s invention: it is the web platform’s vocabulary, and it must be spelled the way the platform spells it.',
      ar: '<code>Renderer2</code> عنده شوية ميثودز صغيرين، وتقريبًا كلهم بياخدوا string. والـ string ده عمره ما بيبقى من اختراع أنجولار: ده قاموس الويب نفسه، ولازم يتكتب زي ما الويب بيكتبه بالظبط.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Method', 'The string you pass', 'Whose word it is'], ar: ['الميثود', 'الـ string اللي بتدّيه', 'الكلمة دي بتاعة مين'] },
        rows: [
          { en: ['<code>createElement(\'span\')</code>', 'a tag name', 'HTML’s'], ar: ['<code>createElement(\'span\')</code>', 'اسم تاج', 'HTML'] },
          { en: ['<code>setAttribute(n, \'role\', \'tooltip\')</code>', 'an attribute name, then its value', 'HTML’s, then ARIA’s'], ar: ['<code>setAttribute(n, \'role\', \'tooltip\')</code>', 'اسم attribute، وبعدين قيمته', 'HTML، وبعدين ARIA'] },
          { en: ['<code>setProperty(n, \'textContent\', …)</code>', 'a DOM property name', 'the DOM’s (camelCase, like in JavaScript)'], ar: ['<code>setProperty(n, \'textContent\', …)</code>', 'اسم property في الـ DOM', 'الـ DOM (camelCase، زي JavaScript)'] },
          { en: ['<code>setStyle(n, \'max-width\', \'240px\')</code>', 'a CSS property and value', 'CSS’s'], ar: ['<code>setStyle(n, \'max-width\', \'240px\')</code>', 'property وقيمة في CSS', 'CSS'] },
          { en: ['<code>listen(\'document\', \'keydown\', …)</code>', 'a target, then an event name', 'the renderer’s (<code>\'window\'</code>, <code>\'document\'</code>, <code>\'body\'</code>), then the DOM’s'], ar: ['<code>listen(\'document\', \'keydown\', …)</code>', 'هدف، وبعدين اسم event', 'الـ renderer (<code>\'window\'</code> و<code>\'document\'</code> و<code>\'body\'</code>)، وبعدين الـ DOM'] },
          { en: ['<code>addClass(n, \'tooltip\')</code>', 'a class name', '<b>yours</b>, shared with your stylesheet'], ar: ['<code>addClass(n, \'tooltip\')</code>', 'اسم كلاس', '<b>بتاعك</b>، ومتشارك مع ملف الـ CSS بتاعك'] },
        ] },
      { t: 'p',
        en: `The same is true of the ${ng('host:')} strings. <code>(mouseenter)</code> uses the browser’s event name. Angular adds two extras you can use there: a target prefix like <code>document:</code>, and key filters like <code>keydown.escape</code>. With them, the Esc listener needs no ${ng('listen')} call and no ${mine('stopKeys')} field at all, because Angular removes host listeners for you:`,
        ar: `ونفس الكلام على نصوص ${ng('host:')}. <code>(mouseenter)</code> بيستخدم اسم الـ event بتاع المتصفح. وأنجولار بيزوّد حاجتين تقدر تستخدمهم هناك: بادئة للهدف زي <code>document:</code>، وفلاتر للزراير زي <code>keydown.escape</code>. بيهم، الـ listener بتاع Esc مش محتاج نداء ${ng('listen')} ولا field ${mine('stopKeys')} خالص، عشان أنجولار بيشيل الـ host listeners بنفسه:` },
      { t: 'code', name: 'tooltip.ts · host only', lang: 'ts', tag: { en: 'the declarative way', ar: 'الطريقة الـ declarative' }, code: [
        'host: {',
        "  '(mouseenter)': 'show()',",
        "  '(mouseleave)': 'hide()',",
        "  '(document:keydown.escape)': 'hide()',",
        '},' ] },
      { t: 'note', label: { en: 'Two words that look like yours', ar: 'كلمتين شكلهم بتوعك' },
        en: `${ng('host:')} (the key in the decorator) is Angular’s. ${mine('host')} (the field holding the <code>ElementRef</code>) is yours, and could be called <code>el</code>. Same letters, two owners. And ${ng('nativeElement')} is always Angular’s: it is the property on <code>ElementRef</code> that holds the real element.`,
        ar: `${ng('host:')} (المفتاح اللي في الـ decorator) بتاع أنجولار. و${mine('host')} (الـ field اللي شايل الـ <code>ElementRef</code>) بتاعك، وممكن تسمّيه <code>el</code>. نفس الحروف، واتنين أصحاب. و${ng('nativeElement')} دايمًا بتاع أنجولار: دي الـ property اللي في <code>ElementRef</code> وشايلة الـ element الحقيقي.` }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'Angular accepts almost any name here. These habits keep a directive easy to use, and keep your CSS from colliding with somebody else’s.',
      ar: 'أنجولار بيقبل أي اسم تقريبًا هنا. العادات دي بتخلي الـ directive سهل الاستخدام، وبتمنع الـ CSS بتاعك إنه يتخبط في CSS حد تاني.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['the selector', '<code>appTooltip</code>: a prefix, then camelCase', '<code>tooltip</code>, <code>title</code>', 'A prefix keeps it from clashing with real HTML attributes (<code>title</code> is one) and with other libraries.'],
            ar: ['الـ selector', '<code>appTooltip</code>: بادئة، وبعدين camelCase', '<code>tooltip</code>، <code>title</code>', 'البادئة بتمنعه يتخبط في attributes HTML حقيقية (<code>title</code> واحد منهم) وفي مكتبات تانية.'] },
          { en: ['the main input', 'the same name as the selector', '<code>text</code>, <code>tooltipText</code>', 'Then one attribute does both jobs: <code>appTooltip="Save"</code>.'],
            ar: ['الـ input الأساسي', 'نفس اسم الـ selector', '<code>text</code>، <code>tooltipText</code>', 'كده attribute واحد بيعمل الشغلانتين: <code>appTooltip="Save"</code>.'] },
          { en: ['the renderer field', '<code>renderer</code>, <code>r</code>', '<code>dom</code>, <code>document</code>', 'It is not the DOM. Naming it <code>document</code> hides the global and misleads the reader.'],
            ar: ['الـ field بتاع الـ renderer', '<code>renderer</code>، <code>r</code>', '<code>dom</code>، <code>document</code>', 'ده مش الـ DOM. لو سمّيته <code>document</code> بتغطّي على الـ global وبتضلّل اللي بيقرا.'] },
          { en: ['the <code>ElementRef</code> field', '<code>host</code>, <code>el</code>', '<code>nativeElement</code>', 'You would end up writing <code>this.nativeElement.nativeElement</code>.'],
            ar: ['الـ field بتاع <code>ElementRef</code>', '<code>host</code>، <code>el</code>', '<code>nativeElement</code>', 'هتلاقي نفسك بتكتب <code>this.nativeElement.nativeElement</code>.'] },
          { en: ['what <code>listen()</code> returns', '<code>stopKeys</code>, <code>removeKeyListener</code>', '<code>listener</code>, <code>keys</code>', 'It is a <b>stopper</b>. Name it after what calling it does.'],
            ar: ['اللي <code>listen()</code> بترجّعه', '<code>stopKeys</code>، <code>removeKeyListener</code>', '<code>listener</code>، <code>keys</code>', 'دي حاجة <b>بتوقّف</b>. سمّيها باللي بيحصل لما تناديها.'] },
          { en: ['the CSS class', '<code>tooltip</code>, or prefixed: <code>app-tooltip</code>', '<code>show</code>, <code>active</code>, <code>box</code>', 'It lives in the global stylesheet, so a generic name can clash with any other rule in the app.'],
            ar: ['كلاس الـ CSS', '<code>tooltip</code>، أو ببادئة: <code>app-tooltip</code>', '<code>show</code>، <code>active</code>، <code>box</code>', 'ده عايش في ملف الـ CSS العام، فاسم عام ممكن يتخبط في أي قاعدة تانية في التطبيق.'] },
          { en: ['the methods', '<code>show</code>, <code>hide</code>', '<code>onMouseEnter</code>', 'Name what it does, not what triggers it. <code>show()</code> also runs on <code>focus</code>.'],
            ar: ['الميثودز', '<code>show</code>، <code>hide</code>', '<code>onMouseEnter</code>', 'سمّي اللي بتعمله، مش اللي بيشغّلها. <code>show()</code> بتشتغل مع <code>focus</code> كمان.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Three places where the name is not free', ar: 'تلات أماكن الاسم فيهم مش براحتك' },
    lead: {
      en: 'Some names look like your choice but are forced by how Angular matches things.',
      ar: 'فيه أسماء شكلها اختيارك، بس هي مفروضة عليك بسبب الطريقة اللي أنجولار بيطابق بيها الحاجات.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'The input copies the selector', ar: 'الـ input بينسخ الـ selector' }, blocks: [
        { t: 'p',
          en: 'An attribute on the element sets the input with the <b>same name</b>. If you call the input something else, the template has to type two attributes, and forgetting the second is a compile error, because the input is required.',
          ar: 'الـ attribute اللي على الـ element بيحط قيمة الـ input اللي <b>بنفس الاسم</b>. لو سمّيت الـ input اسم تاني، التمبلت لازم يكتب اتنين attributes، ولو نسيت التاني يبقى compile error، عشان الـ input إجباري.' },
        { t: 'pair',
          bad:  { name: TXT_BAD, lang: 'ts', code: ["selector: '[appTooltip]',", '', 'readonly text = input.required<string>();'] },
          good: { name: 'tooltip.ts — input named like the selector', lang: 'ts', code: ["selector: '[appTooltip]',", '', 'readonly appTooltip = input.required<string>();'] } },
        { t: 'code', name: TXT_HTML, lang: 'html', tag: { en: 'two attributes', ar: 'اتنين attributes' }, code: [
          '<button appTooltip text="Save your changes">Save</button>' ] },
        { t: 'p',
          en: `If you want a nicer name inside the class, keep ${pub('appTooltip')} as the public name with an ${ng('alias')}. Then ${mine('text')} is private to the directive:`,
          ar: `لو عايز اسم أحلى جوه الكلاس، سيب ${pub('appTooltip')} هو الاسم اللي برّه بـ ${ng('alias')}. كده ${mine('text')} بيبقى خاص بالـ directive:` },
        { t: 'code', name: TXT_ALIAS, lang: 'ts', tag: { en: 'directive', ar: 'الـ directive' }, code: [
          "readonly text = input.required<string>({ alias: 'appTooltip' });",
          '',
          '// inside the class: this.text()   in templates: appTooltip="…"' ] }
      ]},
      { t: 'step', n: 'B', title: { en: 'Event names in <code>host</code> are the browser’s', ar: 'أسماء الـ events في <code>host</code> بتاعة المتصفح' }, blocks: [
        { t: 'p',
          en: `The part in round brackets must be a real DOM event, spelled exactly: ${ng('mouseenter')}, ${ng('focus')}, ${ng('keydown')}. You may add a target prefix (<code>document:</code>, <code>window:</code>, <code>body:</code>) or a key filter (<code>.escape</code>). The part after the colon, <code>'show()'</code>, is your code.`,
          ar: `الجزء اللي بين الأقواس المدورة لازم يبقى event حقيقي في الـ DOM، مكتوب بالظبط: ${ng('mouseenter')} و${ng('focus')} و${ng('keydown')}. تقدر تزوّد بادئة للهدف (<code>document:</code> و<code>window:</code> و<code>body:</code>) أو فلتر زرار (<code>.escape</code>). والجزء اللي بعد النقطتين، <code>'show()'</code>، ده الكود بتاعك.` }
      ]},
      { t: 'step', n: 'C', title: { en: 'Targets for <code>listen()</code>', ar: 'الأهداف بتاعة <code>listen()</code>' }, blocks: [
        { t: 'p',
          en: `${ng('listen')} takes either a real element, or one of three fixed strings: <code>'window'</code>, <code>'document'</code>, <code>'body'</code>. Those three are the renderer’s vocabulary. Any other string is not a target it knows, and the browser renderer throws an error when <code>listen()</code> runs.`,
          ar: `${ng('listen')} بتاخد يا element حقيقي، يا واحد من تلات strings ثابتين: <code>'window'</code> و<code>'document'</code> و<code>'body'</code>. التلاتة دول من قاموس الـ renderer. أي string تاني مش هدف يعرفه، والـ renderer بتاع المتصفح بيرمي error لما <code>listen()</code> تشتغل.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: 'The decorator style uses the same names', ar: 'أسلوب الـ decorators بيستخدم نفس الأسماء' },
    lead: {
      en: 'You will meet this version in tutorials and older projects: the renderer arrives through the constructor, the input is <code>@Input</code>, and listeners are <code>@HostListener</code>. The renderer calls, the selector and the CSS class are identical.',
      ar: 'هتقابل النسخة دي في شروحات ومشاريع أقدم: الـ renderer بيوصل عن طريق الـ constructor، والـ input بيبقى <code>@Input</code>، والـ listeners بتبقى <code>@HostListener</code>. نداءات الـ renderer والـ selector وكلاس الـ CSS زي ما هما بالظبط.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'tooltip.ts — older style', lang: 'ts', code: [
          "@Directive({ selector: '[appTooltip]' })",
          'export class Tooltip {',
          '  @Input({ required: true }) appTooltip!: string;',
          '',
          '  constructor(private r: Renderer2, private host: ElementRef<HTMLElement>) {}',
          '',
          "  @HostListener('mouseenter')",
          '  show() {',
          "    const n: HTMLElement = this.r.createElement('span');",
          "    this.r.addClass(n, 'tooltip');",
          '    this.r.appendChild(n, this.r.createText(this.appTooltip));',
          '    this.r.appendChild(this.host.nativeElement, n);',
          '  }',
          '}' ] },
        good: { name: 'tooltip.ts — today', lang: 'ts', code: [
          "@Directive({ selector: '[appTooltip]', host: { '(mouseenter)': 'show()' } })",
          'export class Tooltip {',
          '  readonly appTooltip = input.required<string>();',
          '  private readonly r = inject(Renderer2);',
          '  private readonly host = inject(ElementRef<HTMLElement>);',
          '',
          '',
          '',
          '  show() {',
          "    const n: HTMLElement = this.r.createElement('span');",
          "    this.r.addClass(n, 'tooltip');",
          '    this.r.appendChild(n, this.r.createText(this.appTooltip()));',
          '    this.r.appendChild(this.host.nativeElement, n);',
          '  }',
          '}' ] } },
      { t: 'p',
        en: 'Two differences to notice. In the old style the input is a plain property, so you read <code>this.appTooltip</code> without brackets; with <code>input()</code> it is a signal and you call it. And in the old style the field names <code>r</code> and <code>host</code> are the constructor’s parameter names: still yours, still free.',
        ar: 'فيه فرقين خد بالك منهم. في الأسلوب القديم الـ input بيبقى property عادية، فبتقرا <code>this.appTooltip</code> من غير أقواس؛ ومع <code>input()</code> بيبقى signal فبتناديه. وفي الأسلوب القديم أسماء الـ fields <code>r</code> و<code>host</code> هي أسماء الـ parameters بتاعة الـ constructor: لسه بتاعتك، ولسه براحتك.' }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, and says nothing', ar: 'مش بيعمل حاجة، ومش بيقول حاجة' },
    title: { en: 'Mistakes that fail silently', ar: 'غلطات بتفشل في صمت' },
    lead: {
      en: 'The renderer’s parameters are loosely typed and most of its arguments are strings, so the compiler lets a lot through. These are the ones that cost people an afternoon.',
      ar: 'الـ parameters بتاعة الـ renderer أنواعها مش متشددة، وأغلب الـ arguments بتاعته strings، فالـ compiler بيعدّي حاجات كتير. ودي الغلطات اللي بتضيّع على الناس بعد الضهر كله.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'A capital letter in an event name', ar: 'حرف كابيتال في اسم event' }, blocks: [
        { t: 'pair',
          bad:  { name: 'tooltip.ts', lang: 'ts', code: ["'(mouseEnter)': 'show()',"] },
          good: { name: 'tooltip.ts', lang: 'ts', code: ["'(mouseenter)': 'show()',"] } },
        { t: 'p', en: 'DOM event names are case-sensitive and all lower case. <code>mouseEnter</code> is a perfectly legal name for an event that never happens, so the listener waits forever and nothing reports it.',
                  ar: 'أسماء events الـ DOM حساسة لحالة الحروف وكلها صغيرة. <code>mouseEnter</code> اسم مسموح بيه تمامًا لـ event عمره ما بيحصل، فالـ listener بيستنى على طول ومحدش بيبلّغ عن حاجة.' }
      ]},
      { t: 'step', n: '2', title: { en: 'Throwing away what <code>listen()</code> returns', ar: 'إنك ترمي اللي <code>listen()</code> بترجّعه' }, blocks: [
        { t: 'pair',
          bad:  { name: 'tooltip.ts', lang: 'ts', code: [
            "this.r.listen('document', 'keydown', (e: KeyboardEvent) => {",
            "  if (e.key === 'Escape') this.hide();",
            '});' ] },
          good: { name: 'tooltip.ts', lang: 'ts', code: [
            "this.stopKeys = this.r.listen('document', 'keydown', (e: KeyboardEvent) => {",
            "  if (e.key === 'Escape') this.hide();",
            '});' ] } },
        { t: 'p', en: `A listener you add by hand stays until you remove it, even after the directive is destroyed. Every hover adds one more. Keep the returned function (${mine('stopKeys')}) and call it in ${mine('hide')}. Or use the <code>host</code> form from above, which Angular cleans up for you.`,
                  ar: `الـ listener اللي بتضيفه بإيدك بيفضل لحد ما تشيله، حتى بعد ما الـ directive يتشال. وكل هوفر بيزوّد واحد كمان. امسك الـ function اللي راجعة (${mine('stopKeys')}) وناديها في ${mine('hide')}. أو استخدم شكل الـ <code>host</code> اللي فوق، وأنجولار بينضّفه بنفسه.` }
      ]},
      { t: 'step', n: '3', title: { en: 'An attribute where you meant a property', ar: 'attribute وانت قصدك property' }, blocks: [
        { t: 'pair',
          bad:  { name: 'tooltip.ts', lang: 'ts', code: ["this.r.setAttribute(n, 'textContent', this.appTooltip());"] },
          good: { name: 'tooltip.ts', lang: 'ts', code: ["this.r.setProperty(n, 'textContent', this.appTooltip());"] } },
        { t: 'p', en: `${ng('setAttribute')} writes an HTML attribute; there is no such attribute as <code>textContent</code>, so the span gets a useless attribute and stays empty. ${ng('setProperty')} sets the DOM property. Or build a text node with ${ng('createText')}, as the full example does.`,
                  ar: `${ng('setAttribute')} بتكتب attribute في HTML؛ ومفيش attribute اسمه <code>textContent</code>، فالـ span بياخد attribute ملوش لازمة ويفضل فاضي. أما ${ng('setProperty')} فبتحط الـ property بتاعة الـ DOM. أو اعمل text node بـ ${ng('createText')}، زي المثال الكامل.` }
      ]},
      { t: 'step', n: '4', title: { en: 'The CSS class renamed on one side', ar: 'كلاس الـ CSS اتغيّر في ناحية واحدة' }, blocks: [
        { t: 'pair',
          bad:  { name: 'styles.css', lang: 'css', code: ['.tip {', '  position: absolute;', '}'] },
          good: { name: 'styles.css', lang: 'css', code: ['.tooltip {', '  position: absolute;', '}'] } },
        { t: 'p', en: 'The directive still adds <code>tooltip</code>; the stylesheet now styles <code>tip</code>. Nothing connects the two except the spelling, so nothing complains. Open DevTools: the class is on the span, and no rule matches it.',
                  ar: 'الـ directive لسه بيضيف <code>tooltip</code>؛ وملف الـ CSS بقى بيدّي شكل لـ <code>tip</code>. مفيش حاجة بتربط الاتنين غير الحروف، فمحدش بيشتكي. افتح الـ DevTools: الكلاس موجود على الـ span، ومفيش قاعدة بتمسكه.' }
      ]},
      { t: 'step', n: '5', title: { en: 'Passing the wrapper instead of the element', ar: 'إنك تدّي الـ wrapper بدل الـ element' }, blocks: [
        { t: 'pair',
          bad:  { name: 'tooltip.ts', lang: 'ts', code: ['this.r.appendChild(this.host, n);'] },
          good: { name: 'tooltip.ts', lang: 'ts', code: ['this.r.appendChild(this.host.nativeElement, n);'] } },
        { t: 'p', en: `This one does fail, but only at runtime: the renderer’s parameters are typed <code>any</code>, so it compiles, and the first hover throws a <code>TypeError</code> in the console. ${mine('host')} is Angular’s wrapper; the element is its ${ng('nativeElement')}.`,
                  ar: `دي بتفشل فعلًا، بس وقت التشغيل: الـ parameters بتاعة الـ renderer نوعها <code>any</code>، فالكود بيعدّي من الـ compiler، وأول هوفر بيرمي <code>TypeError</code> في الـ console. ${mine('host')} هو الـ wrapper بتاع أنجولار؛ والـ element هو الـ ${ng('nativeElement')} بتاعه.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it does nothing', ar: 'لما مايعملش حاجة' },
    title: { en: 'Six questions, in this order', ar: 'ست أسئلة، بالترتيب ده' },
    lead: {
      en: 'Your directive “does not work”. Ask these before anything else.',
      ar: 'الـ directive بتاعك «مش شغال». اسأل الأسئلة دي قبل أي حاجة.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Is the directive’s class in the <code>imports</code> of the component whose template uses it? Without it, <code>appTooltip="…"</code> is an ordinary attribute and nothing happens.',
                  ar: '<b>1.</b> كلاس الـ directive موجود في <code>imports</code> بتاع الـ component اللي التمبلت بتاعه بيستخدمه؟ من غيره، <code>appTooltip="…"</code> attribute عادي ومش هيحصل حاجة.' },
      { t: 'chk', en: '<b>2.</b> Is the attribute in the template spelled exactly like the selector, capitals included?',
                  ar: '<b>2.</b> الـ attribute اللي في التمبلت مكتوب بالظبط زي الـ selector، بالحروف الكابيتال كمان؟' },
      { t: 'chk', en: '<b>3.</b> Is every event name in <code>host</code> a real DOM event, all lower case?',
                  ar: '<b>3.</b> كل اسم event في <code>host</code> event حقيقي في الـ DOM، وكله حروف صغيرة؟' },
      { t: 'chk', en: '<b>4.</b> Does <code>show()</code> run at all? Put a <code>console.log</code> in it, then check the Elements panel for the new span.',
                  ar: '<b>4.</b> <code>show()</code> بتشتغل أصلًا؟ حط فيها <code>console.log</code>، وبعدين دوّر في تاب Elements على الـ span الجديد.' },
      { t: 'chk', en: '<b>5.</b> The span is there but looks wrong? Check that <code>styles.css</code> has a rule for exactly the class you passed to <code>addClass</code>.',
                  ar: '<b>5.</b> الـ span موجود بس شكله غلط؟ اتأكد إن <code>styles.css</code> فيه قاعدة للكلاس اللي اديته لـ <code>addClass</code> بالظبط.' },
      { t: 'chk', en: '<b>6.</b> Things get slower the more you use it? Look for a <code>listen()</code> whose returned function is never called.',
                  ar: '<b>6.</b> الحاجات بتبطأ كل ما تستخدمه أكتر؟ دوّر على <code>listen()</code> الـ function اللي راجعة منها عمرها ما بتتنادى.' }
    ]
  }
  ]
};
