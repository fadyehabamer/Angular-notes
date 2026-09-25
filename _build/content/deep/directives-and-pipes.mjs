/* ==================================================================
   Directives and pipes, name by name — the companion page after the
   "writing your own directives and pipes" topic. One running example
   (a news feed with an autofocus search box, a tooltip directive and a
   timeAgo pipe) followed through every file, every name coloured by
   who owns it. Names list: inline, below.
   ================================================================== */

/* a name in running text, coloured like the code and linked on hover */
const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

const ALIAS = 'tooltip.directive.ts · with alias';

export default {
  topic: 'directives-and-pipes',
  tab: 'Directives and pipes, name by name — The Angular Signal',
  title: { en: 'Directives and pipes, name by name', ar: 'الـ directives والـ pipes، اسم اسم' },
  say: {
    en: 'The page for when <code>[appTooltip]</code>, <code>Tooltip</code>, <code>timeAgo</code> and <code>TimeAgo</code> all blur into one. One news feed followed through every file, every name coloured by who owns it, then what breaks when you rename each one.',
    ar: 'الصفحة دي للي بيتلخبط بين <code>[appTooltip]</code> و<code>Tooltip</code> و<code>timeAgo</code> و<code>TimeAgo</code>. feed أخبار واحد ماشيين وراه في كل الملفات، وكل اسم ملوّن حسب صاحبه، وبعدين إيه اللي بيبوظ لما تغيّر كل واحد.'
  },
  lead: {
    en: 'The idea is small: <b>a directive is behaviour you stick on an element, a pipe is a formatter you put after a value.</b> The confusing part is the names. Every directive and every pipe has <b>two</b> names: one the template types (<code>appTooltip</code>, <code>timeAgo</code>) and one TypeScript types (<code>Tooltip</code>, <code>TimeAgo</code>). They look almost the same, they live in different places, and mixing them up is the most common mistake here. This page sorts out which is which.',
    ar: 'الفكرة صغيرة: <b>الـ directive سلوك بتلزقه على عنصر، والـ pipe منسّق بتحطه بعد قيمة.</b> اللي بيلخبط هو الأسماء. كل directive وكل pipe ليه <b>اسمين</b>: اسم التمبلت بيكتبه (<code>appTooltip</code>، <code>timeAgo</code>) واسم TypeScript بيكتبه (<code>Tooltip</code>، <code>TimeAgo</code>). شكلهم تقريبًا واحد، وعايشين في أماكن مختلفة، واللخبطة بينهم أشهر غلطة هنا. الصفحة دي بتفرز مين فين.'
  },

  names: {
    note: {
      en: 'Read the orange rows first. A directive’s selector and a pipe’s <code>name</code> are words you invent, but every template that uses them types them too. The class names are a second, separate set of names that only TypeScript types. Blue words (<code>transform</code>, <code>host</code>, <code>mouseenter</code>) are Angular’s or the browser’s.',
      ar: 'اقرا الصفوف البرتقاني الأول. الـ selector بتاع الـ directive والـ <code>name</code> بتاع الـ pipe كلمات انت بتخترعها، بس أي تمبلت بيستخدمهم بيكتبهم برضه. أسماء الكلاسات مجموعة أسماء تانية منفصلة، وTypeScript بس اللي بيكتبها. والكلمات الزرقا (<code>transform</code>، <code>host</code>، <code>mouseenter</code>) بتاعة أنجولار أو المتصفح.'
    },
    names: [
      /* --- shared: two files must agree --- */
      { n:'appTooltip', k:'pub',
        w:{ en:'The attribute you invented. The selector <code>\'[appTooltip]\'</code>, the input of the same name, the <code>host</code> string and every template that uses it must spell it the same.',
            ar:'الـ attribute اللي انت اخترعته. الـ selector <code>\'[appTooltip]\'</code> والـ input اللي بنفس الاسم ونص الـ <code>host</code> وأي تمبلت بيستخدمه لازم يكتبوه زي بعض.' } },
      { n:'appAutofocus', k:'pub',
        w:{ en:'The attribute you invented for the autofocus directive. The selector and every template that writes it must match.',
            ar:'الـ attribute اللي اخترعته للـ directive بتاع الـ autofocus. الـ selector وأي تمبلت بيكتبه لازم يطابقوا.' } },
      { n:'timeAgo', k:'pub',
        w:{ en:'The pipe’s template name. The <code>name:</code> string and every <code>| timeAgo</code> must match. Templates never type the class name.',
            ar:'اسم الـ pipe في التمبلت. النص في <code>name:</code> وكل <code>| timeAgo</code> لازم يطابقوا. التمبلتس عمرها ما بتكتب اسم الكلاس.' } },
      { n:'Tooltip', k:'pub',
        w:{ en:'The directive’s class. Only TypeScript types it: the <code>import</code> line and <code>imports: [ ]</code>.',
            ar:'كلاس الـ directive. TypeScript بس اللي بيكتبه: سطر الـ <code>import</code> و<code>imports: [ ]</code>.' } },
      { n:'Autofocus', k:'pub',
        w:{ en:'The autofocus directive’s class, imported by the feed.', ar:'كلاس الـ directive بتاع الـ autofocus، والـ feed بيعمله import.' } },
      { n:'TimeAgo', k:'pub', not:['html'],
        w:{ en:'The pipe’s class. Imported and listed in <code>imports</code>, never typed in a template.',
            ar:'كلاس الـ pipe. بيتعمله import وبيتكتب في <code>imports</code>، وعمره ما بيتكتب في تمبلت.' } },
      { n:'tip-open', k:'pub',
        w:{ en:'A CSS class the directive puts on its element. The <code>host</code> string and the stylesheet must spell it the same.',
            ar:'CSS class الـ directive بيحطها على العنصر بتاعه. نص الـ <code>host</code> والـ stylesheet لازم يكتبوها زي بعض.' } },
      { n:'data-tip', k:'pub',
        w:{ en:'An HTML attribute the directive writes and the stylesheet reads with <code>attr()</code>. Both sides change together.',
            ar:'HTML attribute الـ directive بيكتبه والـ stylesheet بيقراه بـ <code>attr()</code>. الناحيتين بيتغيروا مع بعض.' } },
      { n:'Post', k:'pub',
        w:{ en:'Your data type. Every file that imports it follows a rename.', ar:'نوع الداتا بتاعك. أي ملف بيعمله import بيتغير معاه.' } },
      { n:'id', k:'pub',
        w:{ en:'A field on your data, read by <code>track</code>.', ar:'field في الداتا بتاعتك، و<code>track</code> بيقراه.' } },
      { n:'title', k:'pub',
        w:{ en:'A field on your data, printed by the feed’s template.', ar:'field في الداتا بتاعتك، وتمبلت الـ feed بيطبعه.' } },
      { n:'summary', k:'pub',
        w:{ en:'A field on your data, handed to the tooltip.', ar:'field في الداتا بتاعتك، بيتبعت للـ tooltip.' } },
      { n:'publishedAt', k:'pub',
        w:{ en:'A field on your data, sent through the pipe.', ar:'field في الداتا بتاعتك، بيعدّي على الـ pipe.' } },
      { n:'app-feed', k:'pub',
        w:{ en:'The feed’s selector. Whoever shows the feed types this tag.', ar:'الـ selector بتاع الـ feed. أي حد بيعرض الـ feed بيكتب التاج ده.' } },
      { n:'Feed', k:'pub',
        w:{ en:'The feed’s class. Whoever uses the feed imports it by this name.', ar:'كلاس الـ feed. أي حد بيستخدمه بيعمله import بالاسم ده.' } },

      /* --- yours, private to one file --- */
      { n:'open', k:'mine',
        w:{ en:'The tooltip’s own signal, read only by its own <code>host</code> string.', ar:'الـ signal بتاعة الـ tooltip نفسه، ونص الـ <code>host</code> بتاعه بس اللي بيقراها.' } },
      { n:'show', k:'mine',
        w:{ en:'The tooltip’s own method, called from its own <code>host</code> string.', ar:'ميثود الـ tooltip نفسه، بتتنادى من نص الـ <code>host</code> بتاعه.' } },
      { n:'hide', k:'mine',
        w:{ en:'The tooltip’s own method, called from its own <code>host</code> string.', ar:'ميثود الـ tooltip نفسه، بتتنادى من نص الـ <code>host</code> بتاعه.' } },
      { n:'tip', k:'mine',
        w:{ en:'A getter in the older version. Only its own decorator uses it.', ar:'getter في النسخة القديمة. الـ decorator بتاعه بس اللي بيستخدمه.' } },
      { n:'text', k:'mine', only:[ALIAS],
        w:{ en:'With an alias, the class property is private. Outside, the attribute is still <code>appTooltip</code>.',
            ar:'مع الـ alias، الـ property اللي في الكلاس بتبقى خاصة. برّه، الـ attribute لسه اسمه <code>appTooltip</code>.' } },
      { n:'el', k:'mine',
        w:{ en:'The autofocus directive’s private field holding its element.', ar:'الـ field الخاص بالـ directive بتاع الـ autofocus، شايل العنصر بتاعه.' } },
      { n:'value', k:'mine',
        w:{ en:'The first parameter of <code>transform</code>: whatever sits left of <code>|</code>. The name is yours.',
            ar:'أول parameter في <code>transform</code>: اللي على شمال الـ <code>|</code>. الاسم بتاعك.' } },
      { n:'format', k:'mine',
        w:{ en:'The second parameter: whatever comes after the colon, <code>timeAgo:\'short\'</code>. It arrives by position, so the name is yours.',
            ar:'تاني parameter: اللي جاي بعد النقطتين، <code>timeAgo:\'short\'</code>. بيوصل بالترتيب، فالاسم بتاعك.' } },
      { n:'mins', k:'mine', w:{ en:'A local variable inside <code>transform</code>.', ar:'متغير محلي جوه <code>transform</code>.' } },
      { n:'posts', k:'mine',
        w:{ en:'The feed’s own signal, read by its own template.', ar:'الـ signal بتاعة الـ feed، والتمبلت بتاعه بيقراها.' } },
      { n:'post', k:'mine', re:'(?<![\\w$/.-])post(?![\\w$-])',
        w:{ en:'The loop variable. Local to the <code>@for</code> block.', ar:'متغير اللوب. محلي جوه بلوك الـ <code>@for</code>.' } },

      /* --- Angular's, TypeScript's, CSS's, the browser's --- */
      { n:'@Directive', k:'ng', w:{ en:'Angular’s decorator for a directive.', ar:'الـ decorator بتاع أنجولار للـ directive.' } },
      { n:'@Pipe', k:'ng', w:{ en:'Angular’s decorator for a pipe.', ar:'الـ decorator بتاع أنجولار للـ pipe.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator for a component.', ar:'الـ decorator بتاع أنجولار للـ component.' } },
      { n:'selector', k:'ng',
        w:{ en:'An option key. The string after it is yours, and it is a CSS selector: <code>[x]</code> means “an element with the attribute x”.',
            ar:'مفتاح إعداد. النص اللي بعده بتاعك، وهو CSS selector: <code>[x]</code> معناها «عنصر عليه الـ attribute اللي اسمه x».' } },
      { n:'name', k:'ng', w:{ en:'An option key on <code>@Pipe</code>. The string after it is yours.', ar:'مفتاح إعداد في <code>@Pipe</code>. النص اللي بعده بتاعك.' } },
      { n:'host', k:'ng',
        w:{ en:'An option key: bindings and listeners on the element the directive sits on.', ar:'مفتاح إعداد: bindings وlisteners على العنصر اللي الـ directive قاعد عليه.' } },
      { n:'attr', k:'ng', only:['ts'],
        w:{ en:'Angular’s prefix for binding an HTML attribute: <code>[attr.x]</code>. The attribute after the dot is yours.',
            ar:'البادئة بتاعة أنجولار لربط HTML attribute: <code>[attr.x]</code>. الـ attribute اللي بعد النقطة بتاعك.' } },
      { n:'attr', k:'ng', only:['css'],
        w:{ en:'CSS’s function that reads an attribute from the element.', ar:'الـ function بتاعة CSS اللي بتقرا attribute من العنصر.' } },
      { n:'class', k:'ng', re:'(?<=\\[|\')class(?=\\.)',
        w:{ en:'Angular’s prefix for toggling one CSS class: <code>[class.x]</code>. The class name after the dot is yours.',
            ar:'البادئة بتاعة أنجولار لتشغيل وقفل CSS class واحدة: <code>[class.x]</code>. اسم الـ class بعد النقطة بتاعك.' } },
      { n:'mouseenter', k:'ng', w:{ en:'The browser’s own event name. All lowercase.', ar:'اسم الـ event بتاع المتصفح نفسه. كله حروف صغيرة.' } },
      { n:'mouseleave', k:'ng', w:{ en:'The browser’s own event name. All lowercase.', ar:'اسم الـ event بتاع المتصفح نفسه. كله حروف صغيرة.' } },
      { n:'PipeTransform', k:'ng',
        w:{ en:'Angular’s interface. It makes TypeScript check that you wrote <code>transform</code>.', ar:'الـ interface بتاع أنجولار. بيخلّي TypeScript يتأكد إنك كتبت <code>transform</code>.' } },
      { n:'transform', k:'ng',
        w:{ en:'The method name Angular calls on every pipe. It cannot be renamed.', ar:'اسم الميثود اللي أنجولار بيناديها في أي pipe. مينفعش تتغير.' } },
      { n:'input', k:'ng', re:'(?<![\\w$<(-])input(?=[.(<,])',
        w:{ en:'Angular’s function that creates an input. The HTML <code>&lt;input&gt;</code> tag is a different thing.',
            ar:'الـ function بتاعة أنجولار اللي بتعمل input. وتاج <code>&lt;input&gt;</code> بتاع HTML حاجة تانية.' } },
      { n:'required', k:'ng', w:{ en:'Part of Angular’s API: <code>input.required</code>.', ar:'جزء من API أنجولار: <code>input.required</code>.' } },
      { n:'alias', k:'ng', w:{ en:'An option key. The string you give it becomes the public name.', ar:'مفتاح إعداد. النص اللي بتديهوله بيبقى الاسم اللي برّه.' } },
      { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
      { n:'set', k:'ng', w:{ en:'A signal method.', ar:'ميثود بتاعة الـ signal.' } },
      { n:'inject', k:'ng', w:{ en:'Angular’s function that hands you a dependency.', ar:'الـ function بتاعة أنجولار اللي بتديك dependency.' } },
      { n:'ElementRef', k:'ng', w:{ en:'Angular’s wrapper around the element the directive sits on.', ar:'الغلاف بتاع أنجولار حوالين العنصر اللي الـ directive قاعد عليه.' } },
      { n:'nativeElement', k:'ng', w:{ en:'The property on <code>ElementRef</code> that holds the real DOM element.', ar:'الـ property في <code>ElementRef</code> اللي شايلة عنصر الـ DOM الحقيقي.' } },
      { n:'focus', k:'ng', w:{ en:'The DOM’s own method on every element.', ar:'ميثود الـ DOM نفسه في أي عنصر.' } },
      { n:'afterNextRender', k:'ng', w:{ en:'Angular’s function: run once, in the browser, after the next render.', ar:'الـ function بتاعة أنجولار: شغّل مرة واحدة، في المتصفح، بعد الرسم الجاي.' } },
      { n:'imports', k:'ng', w:{ en:'An option key: every directive, pipe and component this template may use.', ar:'مفتاح إعداد: كل directive وpipe وcomponent التمبلت ده مسموحله يستخدمه.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key. The path after it points at your file.', ar:'مفتاح إعداد. المسار اللي بعده بيشاور على ملفك.' } },
      { n:'@for', k:'ng', w:{ en:'Angular’s loop block.', ar:'بلوك اللوب بتاع أنجولار.' } },
      { n:'track', k:'ng', w:{ en:'Part of <code>@for</code>.', ar:'جزء من <code>@for</code>.' } },
      { n:'@Input', k:'ng', w:{ en:'The older input decorator.', ar:'الـ decorator القديم للـ input.' } },
      { n:'@HostBinding', k:'ng', w:{ en:'The older way to bind on the host element.', ar:'الطريقة القديمة للربط على عنصر الـ host.' } },
      { n:'@HostListener', k:'ng', w:{ en:'The older way to listen on the host element.', ar:'الطريقة القديمة للسمع على عنصر الـ host.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One post on screen, six stops', ar: 'بوست واحد على الشاشة، ست محطات' },
    lead: {
      en: 'A news feed. Each post has a heading that shows a tooltip on hover, and a date that reads “5 minutes ago”. Angular draws one post. Follow how it finds the directive and the pipe:',
      ar: 'feed أخبار. كل بوست فيه عنوان بيطلّع tooltip لما تقف عليه بالماوس، وتاريخ مكتوب «5 minutes ago». أنجولار بيرسم بوست واحد. امشي وراه وهو بيدوّر على الـ directive والـ pipe:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'feed.component.html', lang: 'html', who: { en: 'template · uses the attribute', ar: 'التمبلت · بيستخدم الـ attribute' },
          code: ['<h3 [appTooltip]="post.summary">{{ post.title }}</h3>'],
          say: { en: `The template writes an attribute, ${pub('appTooltip')}. Angular now asks: <i>“is there a directive whose selector matches this?”</i> The template never mentions a class. It only knows the attribute.`,
                 ar: `التمبلت بيكتب attribute، ${pub('appTooltip')}. أنجولار ساعتها بيسأل: <i>«فيه directive الـ selector بتاعه بيطابق ده؟»</i> التمبلت عمره ما بيذكر كلاس. هو يعرف الـ attribute وبس.` } },
        { file: 'feed.component.ts', lang: 'ts', who: { en: 'component · lists the classes', ar: 'الـ component · بيكتب الكلاسات' },
          code: ['imports: [Autofocus, Tooltip, TimeAgo],'],
          say: { en: `Angular only searches what is in ${ng('imports')}. This list holds <b>class names</b>: ${pub('Tooltip')}, not <code>appTooltip</code>. This is the only place the feed types them.`,
                 ar: `أنجولار بيدوّر بس في اللي جوه ${ng('imports')}. الليستة دي فيها <b>أسماء كلاسات</b>: ${pub('Tooltip')}، مش <code>appTooltip</code>. ده المكان الوحيد اللي الـ feed بيكتبهم فيه.` } },
        { file: 'tooltip.directive.ts', lang: 'ts', who: { en: 'directive · the selector matches', ar: 'الـ directive · الـ selector بيطابق' },
          code: ["selector: '[appTooltip]',", '…', 'readonly appTooltip = input.required<string>();'],
          say: { en: `The square brackets inside the ${ng('selector')} string are <b>CSS</b>: “any element that has an attribute called ${pub('appTooltip')}”. There is also an input with the <b>same name</b>, so the same attribute both switches the directive on and carries <code>post.summary</code> in.`,
                 ar: `الأقواس المربعة اللي جوه نص الـ ${ng('selector')} دي <b>CSS</b>: «أي عنصر عليه attribute اسمه ${pub('appTooltip')}». وفيه كمان input <b>بنفس الاسم</b>، فنفس الـ attribute بيشغّل الـ directive وبيدخّل <code>post.summary</code> كمان.` } },
        { file: 'feed.component.html', lang: 'html', who: { en: 'template · uses the pipe', ar: 'التمبلت · بيستخدم الـ pipe' },
          code: ["<small>{{ post.publishedAt | timeAgo:'short' }}</small>"],
          say: { en: `After the ${'<code>|</code>'} comes the pipe’s <b>template name</b>, ${pub('timeAgo')}, lowercase t. After the colon comes an extra argument. Again: no class name in the template.`,
                 ar: `بعد الـ <code>|</code> بييجي <b>اسم الـ pipe في التمبلت</b>، ${pub('timeAgo')}، بـ t صغيرة. وبعد النقطتين بييجي argument زيادة. تاني: مفيش اسم كلاس في التمبلت.` } },
        { file: 'time-ago.pipe.ts', lang: 'ts', who: { en: 'pipe · two names', ar: 'الـ pipe · اسمين' },
          code: ["@Pipe({ name: 'timeAgo' })", 'export class TimeAgo implements PipeTransform {'],
          say: { en: `Here are both names side by side. The ${ng('name')} string, ${pub('timeAgo')}, is what templates type. The class, ${pub('TimeAgo')}, is what ${ng('imports')} types. They look alike only because people choose them that way.`,
                 ar: `وهنا الاسمين جنب بعض. النص اللي في ${ng('name')}، ${pub('timeAgo')}، هو اللي التمبلتس بتكتبه. والكلاس، ${pub('TimeAgo')}، هو اللي ${ng('imports')} بتكتبه. شبه بعض بس عشان الناس بتختارهم كده.` } },
        { file: 'time-ago.pipe.ts', lang: 'ts', who: { en: 'pipe · Angular calls it', ar: 'الـ pipe · أنجولار بيناديها' },
          code: ["transform(value: string, format: 'long' | 'short' = 'long'): string {"],
          say: { en: `Angular calls ${ng('transform')}: that name is fixed. What sits left of the ${'<code>|</code>'} arrives as the first parameter, <code>'short'</code> as the second. They arrive <b>by position</b>, so ${mine('value')} and ${mine('format')} are names you picked.`,
                 ar: `أنجولار بينادي ${ng('transform')}: الاسم ده ثابت. اللي على شمال الـ <code>|</code> بيوصل كأول parameter، و<code>'short'</code> كتاني واحد. بيوصلوا <b>بالترتيب</b>، فـ ${mine('value')} و${mine('format')} أسماء انت اخترتها.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'Templates type the <b>selector</b> (<code>appTooltip</code>) and the <b>pipe name</b> (<code>timeAgo</code>). TypeScript types the <b>class names</b> (<code>Tooltip</code>, <code>TimeAgo</code>). Angular owns <code>transform</code>. Never mix the first two sets up.',
        ar: 'التمبلتس بتكتب الـ <b>selector</b> (<code>appTooltip</code>) و<b>اسم الـ pipe</b> (<code>timeAgo</code>). وTypeScript بيكتب <b>أسماء الكلاسات</b> (<code>Tooltip</code>، <code>TimeAgo</code>). وأنجولار صاحب <code>transform</code>. أوعى تخلط أول مجموعتين ببعض.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Which name goes where?', ar: 'أنهي اسم يروح فين؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'Every piece has exactly one home. Once you see the two sets of names, template names and class names, the “why doesn’t it find my pipe?” confusion goes away.',
      ar: 'كل حتة ليها بيت واحد بس. أول ما تشوف مجموعتين الأسماء، أسماء التمبلت وأسماء الكلاسات، لخبطة «ليه مش لاقي الـ pipe بتاعي؟» بتختفي.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: [`<code>selector: '[appTooltip]'</code>`, 'directive <code>.ts</code>', 'the directive', `you pick ${pub('appTooltip')}; the brackets are CSS’s`],
            ar: [`<code>selector: '[appTooltip]'</code>`, '<code>.ts</code> الـ directive', 'الـ directive', `انت بتختار ${pub('appTooltip')}؛ والأقواس بتاعة CSS`] },
          { en: ['<code>export class Tooltip</code>', 'directive <code>.ts</code>', 'the directive', `you pick ${pub('Tooltip')}`],
            ar: ['<code>export class Tooltip</code>', '<code>.ts</code> الـ directive', 'الـ directive', `انت بتختار ${pub('Tooltip')}`] },
          { en: [`<code>'(mouseenter)': 'show()'</code>`, 'directive <code>.ts</code>, in <code>host</code>', 'the directive', `${ng('mouseenter')} is the browser’s; you pick ${mine('show')}`],
            ar: [`<code>'(mouseenter)': 'show()'</code>`, '<code>.ts</code> الـ directive، جوه <code>host</code>', 'الـ directive', `${ng('mouseenter')} بتاع المتصفح؛ وانت بتختار ${mine('show')}`] },
          { en: [`<code>@Pipe({ name: 'timeAgo' })</code>`, 'pipe <code>.ts</code>', 'the pipe', `you pick ${pub('timeAgo')}`],
            ar: [`<code>@Pipe({ name: 'timeAgo' })</code>`, '<code>.ts</code> الـ pipe', 'الـ pipe', `انت بتختار ${pub('timeAgo')}`] },
          { en: ['<code>transform(value, format)</code>', 'pipe <code>.ts</code>', 'the pipe', `${ng('transform')} is Angular’s; you pick ${mine('value')} and ${mine('format')}`],
            ar: ['<code>transform(value, format)</code>', '<code>.ts</code> الـ pipe', 'الـ pipe', `${ng('transform')} بتاعة أنجولار؛ وانت بتختار ${mine('value')} و${mine('format')}`] },
          { en: ['<code>imports: [Tooltip, TimeAgo]</code>', 'component <code>.ts</code>', 'the component that uses them', 'copies the <b>class</b> names'],
            ar: ['<code>imports: [Tooltip, TimeAgo]</code>', '<code>.ts</code> الـ component', 'الـ component اللي بيستخدمهم', 'بينسخ أسماء <b>الكلاسات</b>'] },
          { en: ['<code>[appTooltip]="…"</code>, <code>| timeAgo</code>', 'component <code>.html</code>', 'the component that uses them', 'copies the <b>selector</b> and the <b>pipe name</b>'],
            ar: ['<code>[appTooltip]="…"</code>، <code>| timeAgo</code>', '<code>.html</code> الـ component', 'الـ component اللي بيستخدمهم', 'بينسخ الـ <b>selector</b> و<b>اسم الـ pipe</b>'] },
        ] },
      { t: 'ul',
        en: ['<b>HTML never types a class name, TypeScript never types a selector.</b> <code>imports</code> gets <code>TimeAgo</code>; the template gets <code>timeAgo</code>. If you catch yourself writing <code>| TimeAgo</code>, that is the mistake.',
             '<b>A directive never creates the element it sits on.</b> The template that writes <code>&lt;h3 appTooltip&gt;</code> owns the <code>h3</code>. The directive only adds behaviour to it.',
             '<b>Strings inside <code>host</code> are template code, run on the directive.</b> <code>\'show()\'</code> calls the directive’s own method, the same way <code>(click)="save()"</code> in a template calls the component’s.'],
        ar: ['<b>الـ HTML عمره ما بيكتب اسم كلاس، والـ TypeScript عمره ما بيكتب selector.</b> <code>imports</code> بياخد <code>TimeAgo</code>؛ والتمبلت بياخد <code>timeAgo</code>. لو لقيت نفسك بتكتب <code>| TimeAgo</code>، يبقى دي الغلطة.',
             '<b>الـ directive عمره ما بيعمل العنصر اللي قاعد عليه.</b> التمبلت اللي كاتب <code>&lt;h3 appTooltip&gt;</code> هو صاحب الـ <code>h3</code>. الـ directive بيضيفله سلوك وبس.',
             '<b>النصوص اللي جوه <code>host</code> كود تمبلت، بيتنفّذ على الـ directive.</b> <code>\'show()\'</code> بتنادي ميثود الـ directive نفسه، بالظبط زي ما <code>(click)="save()"</code> في تمبلت بتنادي ميثود الـ component.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All seven files, every name coloured', ar: 'السبع ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same feed, complete. Hover a coloured name to light up everywhere else it appears. Then press <b>Rename test</b>: every name you own turns into a made-up word, Angular’s words stay put, and the code still works.',
      ar: 'نفس الـ feed، كامل. قف بالماوس على أي اسم ملوّن وهتنوّر كل الأماكن التانية اللي هو فيها. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: كل اسم بتاعك هيبقى كلمة عشوائية، وكلمات أنجولار هتفضل مكانها، والكود لسه شغال.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'post.ts', lang: 'ts', tag: { en: 'the data', ar: 'الداتا' }, code: [
        'export interface Post {',
        '  id: number;',
        '  title: string;',
        '  summary: string;',
        '  publishedAt: string;',
        '}' ] },
      { t: 'code', name: 'autofocus.directive.ts', lang: 'ts', tag: { en: 'directive, no input', ar: 'directive، من غير input' }, code: [
        "import { Directive, ElementRef, afterNextRender, inject } from '@angular/core';",
        '',
        '@Directive({',
        "  selector: '[appAutofocus]',",
        '})',
        'export class Autofocus {',
        '  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);',
        '',
        '  constructor() {',
        '    afterNextRender(() => this.el.nativeElement.focus());',
        '  }',
        '}' ] },
      { t: 'code', name: 'tooltip.directive.ts', lang: 'ts', tag: { en: 'directive, with an input', ar: 'directive، بـ input' }, code: [
        "import { Directive, input, signal } from '@angular/core';",
        '',
        '@Directive({',
        "  selector: '[appTooltip]',",
        '  host: {',
        "    '[attr.data-tip]': 'appTooltip()',",
        "    '[class.tip-open]': 'open()',",
        "    '(mouseenter)': 'show()',",
        "    '(mouseleave)': 'hide()',",
        '  },',
        '})',
        'export class Tooltip {',
        '  readonly appTooltip = input.required<string>();',
        '  readonly open = signal(false);',
        '',
        '  show() { this.open.set(true); }',
        '  hide() { this.open.set(false); }',
        '}' ] },
      { t: 'code', name: 'time-ago.pipe.ts', lang: 'ts', tag: { en: 'pipe', ar: 'pipe' }, code: [
        "import { Pipe, PipeTransform } from '@angular/core';",
        '',
        "@Pipe({ name: 'timeAgo' })",
        'export class TimeAgo implements PipeTransform {',
        "  transform(value: string, format: 'long' | 'short' = 'long'): string {",
        '    const mins = Math.round((Date.now() - new Date(value).getTime()) / 60000);',
        "    return format === 'short' ? `${mins}m` : `${mins} minutes ago`;",
        '  }',
        '}' ] },
      { t: 'code', name: 'feed.component.ts', lang: 'ts', tag: { en: 'uses all three', ar: 'بيستخدم التلاتة' }, code: [
        "import { Component, signal } from '@angular/core';",
        "import { Autofocus } from './autofocus.directive';",
        "import { Tooltip } from './tooltip.directive';",
        "import { TimeAgo } from './time-ago.pipe';",
        "import { Post } from './post';",
        '',
        '@Component({',
        "  selector: 'app-feed',",
        '  imports: [Autofocus, Tooltip, TimeAgo],',
        "  templateUrl: './feed.component.html',",
        '})',
        'export class Feed {',
        '  readonly posts = signal<Post[]>([',
        "    { id: 1, title: 'Signals in practice', summary: 'A five-minute tour', publishedAt: '2026-09-24T08:00:00Z' },",
        '  ]);',
        '}' ] },
      { t: 'code', name: 'feed.component.html', lang: 'html', tag: { en: 'uses all three', ar: 'بيستخدم التلاتة' }, code: [
        '<input appAutofocus placeholder="Search the feed">',
        '',
        '@for (post of posts(); track post.id) {',
        '  <article>',
        '    <h3 [appTooltip]="post.summary">{{ post.title }}</h3>',
        '    <time>{{ post.publishedAt | timeAgo }}</time>',
        "    <small>{{ post.publishedAt | timeAgo:'short' }}</small>",
        '  </article>',
        '}' ] },
      { t: 'code', name: 'styles.css', lang: 'css', tag: { en: 'global styles', ar: 'الستايلات العامة' }, code: [
        '.tip-open { position: relative; }',
        '',
        '.tip-open::after {',
        '  content: attr(data-tip);',
        '  position: absolute;',
        '  top: 100%;',
        '  left: 0;',
        '  padding: 4px 8px;',
        '  background: #222;',
        '  color: #fff;',
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
      en: 'Every name you own can be renamed. The question is only <b>where else</b> you have to follow. Most mistakes here give a compile error. Three do not: a directive used as a plain attribute, a class name in a <code>host</code> string, and an attribute read by CSS.',
      ar: 'أي اسم بتاعك ينفع يتغير. السؤال بس <b>فين تاني</b> لازم تغيّر وراه. أغلب الغلطات هنا بتديك compile error. تلاتة لأ: directive مستخدم كـ attribute عادي، واسم class جوه نص في <code>host</code>، وattribute الـ CSS بيقراه.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [pub('appTooltip') + ' (selector)', 'the input of the same name, the <code>host</code> string, and every template', 'Where a template <b>binds</b> it, <code>[appTooltip]="…"</code>: compile error, “Can’t bind to ‘appTooltip’ since it isn’t a known property of ‘h3’”.'],
            ar: [pub('appTooltip') + ' (الـ selector)', 'الـ input اللي بنفس الاسم، ونص الـ <code>host</code>، وكل تمبلت', 'في أي تمبلت <b>بيربطه</b>، <code>[appTooltip]="…"</code>: compile error، «Can’t bind to ‘appTooltip’ since it isn’t a known property of ‘h3’».'] },
          { en: [pub('appAutofocus') + ' (selector)', 'every template that writes the attribute', '<b>No error.</b> <code>&lt;input appAutofocus&gt;</code> is now just an unknown HTML attribute. The box silently stops getting focus.'],
            ar: [pub('appAutofocus') + ' (الـ selector)', 'كل تمبلت بيكتب الـ attribute', '<b>مفيش error.</b> <code>&lt;input appAutofocus&gt;</code> بقى attribute HTML مش معروف وخلاص. الخانة بتبطل تاخد focus من غير ما حد يقولك.'] },
          { en: [pub('timeAgo') + ' (pipe name)', 'every <code>| timeAgo</code> in every template', 'Compile error: “No pipe found with name ‘timeAgo’”.'],
            ar: [pub('timeAgo') + ' (اسم الـ pipe)', 'كل <code>| timeAgo</code> في كل تمبلت', 'Compile error: «No pipe found with name ‘timeAgo’».'] },
          { en: [`${pub('Tooltip')}, ${pub('TimeAgo')}, ${pub('Autofocus')} (classes)`, 'the <code>import</code> line and <code>imports: [ ]</code> in every component that uses them', 'Compile error on the import.'],
            ar: [`${pub('Tooltip')} و${pub('TimeAgo')} و${pub('Autofocus')} (الكلاسات)`, 'سطر الـ <code>import</code> و<code>imports: [ ]</code> في كل component بيستخدمهم', 'Compile error في الـ import.'] },
          { en: [`${mine('show')}, ${mine('hide')}, ${mine('open')}`, 'the strings inside <code>host</code>, in the same file', 'Depends on your setup. Newer Angular versions can type-check <code>host</code> strings and give a compile error. Without that check you get an error in the console the first time the mouse enters.'],
            ar: [`${mine('show')} و${mine('hide')} و${mine('open')}`, 'النصوص اللي جوه <code>host</code>، في نفس الملف', 'حسب الإعداد عندك. نسخ أنجولار الأحدث تقدر تعمل type-check لنصوص الـ <code>host</code> وتديك compile error. من غير الفحص ده هيطلعلك error في الـ console أول ما الماوس يدخل.'] },
          { en: [`${pub('tip-open')}, ${pub('data-tip')}`, 'the stylesheet', '<b>No error.</b> The class or attribute is still set, but no CSS rule matches it. The tooltip simply never appears.'],
            ar: [`${pub('tip-open')} و${pub('data-tip')}`, 'الـ stylesheet', '<b>مفيش error.</b> الـ class أو الـ attribute لسه بيتحطوا، بس مفيش CSS rule بتطابقهم. الـ tooltip مش هيظهر وخلاص.'] },
          { en: [`${mine('value')}, ${mine('format')}, ${mine('mins')}`, 'only the lines inside <code>transform</code>', 'Compile error inside the method.'],
            ar: [`${mine('value')} و${mine('format')} و${mine('mins')}`, 'السطور اللي جوه <code>transform</code> بس', 'Compile error جوه الميثود.'] },
          { en: [`${ng('transform')}, ${ng('host')}, ${ng('selector')}, ${ng('mouseenter')}`, 'nothing: you cannot rename these', 'They are Angular’s and the browser’s words.'],
            ar: [`${ng('transform')} و${ng('host')} و${ng('selector')} و${ng('mouseenter')}`, 'ولا حاجة: دول مينفعش يتغيروا', 'دي كلمات أنجولار والمتصفح.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b> in the bar above the files. Watch <code>appTooltip</code> change in four places at once: the selector, the input, the <code>host</code> string and the template. That is exactly what a correct rename looks like.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b> في الشريط اللي فوق الملفات. بص على <code>appTooltip</code> وهو بيتغير في أربع أماكن مرة واحدة: الـ selector، والـ input، ونص الـ <code>host</code>، والتمبلت. وده بالظبط شكل التغيير الصح.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتاعتك' },
    title: { en: 'The fixed names, and the two meanings of <code>[ ]</code>', ar: 'الأسماء الثابتة، والمعنيين بتوع <code>[ ]</code>' },
    lead: {
      en: 'Square brackets appear twice and mean two different things. In the <code>selector</code> string they are a <b>CSS attribute selector</b>. In a template they are a <b>property binding</b>. The same word <code>appTooltip</code> sits inside both.',
      ar: 'الأقواس المربعة بتظهر مرتين وبمعنيين مختلفين. جوه نص الـ <code>selector</code> هي <b>CSS attribute selector</b>. وفي التمبلت هي <b>property binding</b>. ونفس الكلمة <code>appTooltip</code> قاعدة جوه الاتنين.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['You write', 'Where', 'It means'], ar: ['بتكتب', 'فين', 'معناها'] },
        rows: [
          { en: [`<code>'[appTooltip]'</code>`, 'the directive’s <code>selector</code>', 'CSS: “match any element that has this attribute”. No value involved.'],
            ar: [`<code>'[appTooltip]'</code>`, 'الـ <code>selector</code> بتاع الـ directive', 'CSS: «طابق أي عنصر عليه الـ attribute ده». مفيش قيمة هنا.'] },
          { en: ['<code>appTooltip="Hello"</code>', 'a template', 'The attribute is there, so the directive applies, and the input gets the plain text “Hello”.'],
            ar: ['<code>appTooltip="Hello"</code>', 'تمبلت', 'الـ attribute موجود، فالـ directive بيتطبق، والـ input بياخد النص «Hello» زي ما هو.'] },
          { en: ['<code>[appTooltip]="post.summary"</code>', 'a template', 'Still counts as the attribute for matching, and the input gets the <b>value</b> of <code>post.summary</code>.'],
            ar: ['<code>[appTooltip]="post.summary"</code>', 'تمبلت', 'لسه بيتحسب إنه الـ attribute في المطابقة، والـ input بياخد <b>قيمة</b> <code>post.summary</code>.'] },
          { en: [`<code>'[class.tip-open]'</code>`, 'the directive’s <code>host</code>', 'A binding on the host element, exactly like <code>[class.tip-open]</code> in a template.'],
            ar: [`<code>'[class.tip-open]'</code>`, 'الـ <code>host</code> بتاع الـ directive', 'binding على عنصر الـ host، بالظبط زي <code>[class.tip-open]</code> في تمبلت.'] },
        ] },
      { t: 'p',
        en: `The rest of the fixed words, grouped by owner:`,
        ar: `وباقي الكلمات الثابتة، متقسمة حسب صاحبها:` },
      { t: 'ul',
        en: [`<b>Angular’s decorators and keys:</b> ${ng('@Directive')}, ${ng('@Pipe')}, ${ng('selector')}, ${ng('name')}, ${ng('host')}, ${ng('imports')}. The <b>values</b> you put in them are yours.`,
             `<b>Angular’s pipe contract:</b> ${ng('transform')} and ${ng('PipeTransform')}. Angular looks the method up by that exact name.`,
             `<b>Angular’s binding prefixes:</b> ${ng('attr')} in <code>[attr.x]</code>, ${ng('class')} in <code>[class.x]</code>. What comes after the dot is yours.`,
             `<b>The browser’s:</b> event names like ${ng('mouseenter')} and ${ng('mouseleave')}, and DOM members like ${ng('nativeElement')} and ${ng('focus')}. Lowercase, exactly as the browser spells them.`,
             `<b>Angular’s helpers:</b> ${ng('inject')}, ${ng('ElementRef')}, ${ng('afterNextRender')}, ${ng('input')}, ${ng('signal')}.`],
        ar: [`<b>الـ decorators والمفاتيح بتوع أنجولار:</b> ${ng('@Directive')} و${ng('@Pipe')} و${ng('selector')} و${ng('name')} و${ng('host')} و${ng('imports')}. <b>القيم</b> اللي بتحطها فيهم بتاعتك.`,
             `<b>عقد الـ pipe بتاع أنجولار:</b> ${ng('transform')} و${ng('PipeTransform')}. أنجولار بيدوّر على الميثود بالاسم ده بالظبط.`,
             `<b>بادئات الربط بتاعة أنجولار:</b> ${ng('attr')} في <code>[attr.x]</code>، و${ng('class')} في <code>[class.x]</code>. اللي بعد النقطة بتاعك.`,
             `<b>بتوع المتصفح:</b> أسماء events زي ${ng('mouseenter')} و${ng('mouseleave')}، وحاجات الـ DOM زي ${ng('nativeElement')} و${ng('focus')}. حروف صغيرة، زي ما المتصفح بيكتبها بالظبط.`,
             `<b>أدوات أنجولار:</b> ${ng('inject')} و${ng('ElementRef')} و${ng('afterNextRender')} و${ng('input')} و${ng('signal')}.`] }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'Angular accepts almost any selector and any pipe name. These habits keep them from colliding with HTML and with other libraries, and make templates easy to read.',
      ar: 'أنجولار بيقبل أي selector وأي اسم pipe تقريبًا. العادات دي بتمنعهم يتخانقوا مع HTML ومع مكتبات تانية، وبتخلي التمبلتس سهلة في القراية.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['a directive selector', '<code>[appTooltip]</code>, <code>[appAutofocus]</code>', '<code>[tooltip]</code>, <code>[autofocus]</code>', 'A prefix keeps you clear of real HTML attributes. <code>autofocus</code> already <b>is</b> one. The CLI adds your project’s prefix (usually <code>app</code>) for you.'],
            ar: ['selector الـ directive', '<code>[appTooltip]</code>، <code>[appAutofocus]</code>', '<code>[tooltip]</code>، <code>[autofocus]</code>', 'البادئة بتبعدك عن attributes الـ HTML الحقيقية. <code>autofocus</code> <b>هو فعلًا</b> واحد منهم. الـ CLI بيحط البادئة بتاعة مشروعك (غالبًا <code>app</code>) لوحده.'] },
          { en: ['a directive selector', 'camelCase: <code>appTooltip</code>', '<code>app-tooltip</code>', 'camelCase is the usual Angular habit for attribute selectors, and it matches the input of the same name.'],
            ar: ['selector الـ directive', 'camelCase: <code>appTooltip</code>', '<code>app-tooltip</code>', 'الـ camelCase هي العادة المعروفة في أنجولار للـ attribute selectors، وبتطابق الـ input اللي بنفس الاسم.'] },
          { en: ['a pipe name', '<code>timeAgo</code>, <code>fileSize</code>', '<code>TimeAgo</code>, <code>time-ago</code>', 'camelCase, like the built-in <code>uppercase</code> and <code>currency</code>. A dash cannot work, because the template reads the name like a variable.'],
            ar: ['اسم الـ pipe', '<code>timeAgo</code>، <code>fileSize</code>', '<code>TimeAgo</code>، <code>time-ago</code>', 'camelCase، زي الـ <code>uppercase</code> والـ <code>currency</code> الجاهزين. الشرطة مش هتنفع، عشان التمبلت بيقرا الاسم كأنه متغير.'] },
          { en: ['a class', '<code>Tooltip</code>, <code>TimeAgo</code>', '—', 'Older code and many teams add a suffix: <code>TooltipDirective</code>, <code>TimeAgoPipe</code>. Either is fine. Pick one style per project.'],
            ar: ['الكلاس', '<code>Tooltip</code>، <code>TimeAgo</code>', '—', 'الكود الأقدم وفرق كتير بيضيفوا لاحقة: <code>TooltipDirective</code>، <code>TimeAgoPipe</code>. الاتنين ماشيين. اختار أسلوب واحد للمشروع.'] },
          { en: ['a <code>host</code> handler', '<code>show</code>, <code>hide</code>, <code>toggle</code>', '<code>mouseenter</code>', 'Name what it <b>does</b>. Calling the method after the event makes <code>\'(mouseenter)\': \'mouseenter()\'</code>, which reads like a typo.'],
            ar: ['ميثود في <code>host</code>', '<code>show</code>، <code>hide</code>، <code>toggle</code>', '<code>mouseenter</code>', 'سمّي اللي <b>بتعمله</b>. لو سمّيت الميثود على اسم الـ event هتطلع <code>\'(mouseenter)\': \'mouseenter()\'</code>، وده شكله غلطة إملائية.'] },
          { en: ['<code>transform</code>’s parameters', '<code>value</code>, then what the argument means: <code>format</code>', '<code>a</code>, <code>b</code>', 'They arrive by position. A clear name is the only thing telling the reader what <code>\'short\'</code> is for.'],
            ar: ['الـ parameters بتوع <code>transform</code>', '<code>value</code>، وبعدين معنى الـ argument: <code>format</code>', '<code>a</code>، <code>b</code>', 'بيوصلوا بالترتيب. الاسم الواضح هو الحاجة الوحيدة اللي بتقول للي بيقرا <code>\'short\'</code> دي بتاعة إيه.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Three places where the name is not free', ar: 'تلات أماكن الاسم فيهم مش براحتك' },
    lead: {
      en: 'Most names on this page are yours. In these three spots, a rule decides.',
      ar: 'أغلب الأسماء في الصفحة دي بتاعتك. في التلات أماكن دول، فيه قاعدة هي اللي بتقرر.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'The input takes the selector’s name, or an alias', ar: 'الـ input بياخد اسم الـ selector، أو alias' }, blocks: [
        { t: 'p',
          en: `For <code>[appTooltip]="post.summary"</code> to reach the directive, the directive needs an input whose public name is exactly ${pub('appTooltip')}. The simplest way is to call the property that. If you want a nicer name inside the class, give an ${ng('alias')}:`,
          ar: `عشان <code>[appTooltip]="post.summary"</code> توصل للـ directive، الـ directive محتاج input اسمه اللي برّه هو ${pub('appTooltip')} بالظبط. أسهل طريقة إنك تسمّي الـ property كده. ولو عايز اسم أحلى جوه الكلاس، ادّيه ${ng('alias')}:` },
        { t: 'code', name: ALIAS, lang: 'ts', tag: { en: 'same template, nicer property', ar: 'نفس التمبلت، property أحلى' }, code: [
          "  host: {",
          "    '[attr.data-tip]': 'text()',",
          '  },',
          '…',
          "  readonly text = input.required<string>({ alias: 'appTooltip' });" ] },
        { t: 'p',
          en: `Now ${mine('text')} is private to the directive, and ${pub('appTooltip')} is still the only word templates type.`,
          ar: `دلوقتي ${mine('text')} بقى خاص بالـ directive، و${pub('appTooltip')} لسه هو الكلمة الوحيدة اللي التمبلتس بتكتبها.` }
      ]},
      { t: 'step', n: 'B', title: { en: 'A pipe’s method is always <code>transform</code>', ar: 'ميثود الـ pipe دايمًا <code>transform</code>' }, blocks: [
        { t: 'p',
          en: `Angular calls ${ng('transform')} on every pipe. Call it <code>format</code> or <code>run</code> and Angular cannot find it. Keep <code>implements PipeTransform</code>: with it, a wrong method name becomes a compile error instead of a surprise.`,
          ar: `أنجولار بينادي ${ng('transform')} في أي pipe. لو سمّيتها <code>format</code> أو <code>run</code> أنجولار مش هيلاقيها. خلّي <code>implements PipeTransform</code>: بيها، اسم الميثود الغلط بيبقى compile error بدل مفاجأة.` }
      ]},
      { t: 'step', n: 'C', title: { en: 'Event names in <code>host</code> are the browser’s', ar: 'أسماء الـ events في <code>host</code> بتاعة المتصفح' }, blocks: [
        { t: 'p',
          en: `The part inside <code>( )</code> is an event the browser fires: ${ng('mouseenter')}, <code>focusin</code>, <code>keydown</code>. You cannot invent one, and the spelling is exact and lowercase. Only the method on the right side is yours.`,
          ar: `اللي جوه <code>( )</code> ده event المتصفح بيطلّعه: ${ng('mouseenter')}، <code>focusin</code>، <code>keydown</code>. مينفعش تخترع واحد، والكتابة لازم تبقى بالظبط وبحروف صغيرة. الميثود اللي على اليمين بس هي اللي بتاعتك.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: 'The decorator version uses the same names', ar: 'نسخة الـ decorators بتستخدم نفس الأسماء' },
    lead: {
      en: 'Tutorials and older projects use <code>@Input</code>, <code>@HostBinding</code> and <code>@HostListener</code> instead of <code>input()</code> and <code>host</code>. The selector, the event names and your method names are the same. Only where you write them moves.',
      ar: 'الشروحات والمشاريع الأقدم بتستخدم <code>@Input</code> و<code>@HostBinding</code> و<code>@HostListener</code> بدل <code>input()</code> و<code>host</code>. الـ selector وأسماء الـ events وأسماء الميثودز بتاعتك زي ما هي. اللي بيتغير بس هو مكان كتابتهم.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'tooltip.directive.ts — older style', lang: 'ts', code: [
          "import { Directive, HostBinding, HostListener, Input } from '@angular/core';",
          '',
          "@Directive({ selector: '[appTooltip]' })",
          'export class Tooltip {',
          '  @Input({ required: true }) appTooltip!: string;',
          '',
          "  @HostBinding('attr.data-tip') get tip() { return this.appTooltip; }",
          "  @HostBinding('class.tip-open') open = false;",
          '',
          "  @HostListener('mouseenter') show() { this.open = true; }",
          "  @HostListener('mouseleave') hide() { this.open = false; }",
          '}' ] },
        good: { name: 'tooltip.directive.ts — today', lang: 'ts', code: [
          "import { Directive, input, signal } from '@angular/core';",
          '',
          '@Directive({',
          "  selector: '[appTooltip]',",
          "  host: { '[attr.data-tip]': 'appTooltip()', '[class.tip-open]': 'open()',",
          "          '(mouseenter)': 'show()', '(mouseleave)': 'hide()' },",
          '})',
          'export class Tooltip {',
          '  readonly appTooltip = input.required<string>();',
          '  readonly open = signal(false);',
          '  show() { this.open.set(true); }',
          '  hide() { this.open.set(false); }',
          '}' ] } },
      { t: 'p',
        en: 'Very old code also declares directives and pipes in an NgModule’s <code>declarations</code> instead of a component’s <code>imports</code>. It is the same class name in a different list. The template side, <code>[appTooltip]</code> and <code>| timeAgo</code>, never changed.',
        ar: 'الكود القديم أوي كمان بيعلن الـ directives والـ pipes في <code>declarations</code> بتاعة NgModule بدل <code>imports</code> بتاعة الـ component. نفس اسم الكلاس في ليستة تانية. ناحية التمبلت، <code>[appTooltip]</code> و<code>| timeAgo</code>، عمرها ما اتغيرت.' }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, and says nothing', ar: 'مش بيعمل حاجة، ومش بيقول حاجة' },
    title: { en: 'Mistakes that fail silently, or confusingly', ar: 'غلطات بتفشل في صمت، أو بشكل ملخبط' },
    lead: {
      en: 'An unknown attribute on an element is legal HTML, and an unknown class or event is legal too. So when a directive does not match, Angular often has nothing to complain about.',
      ar: 'attribute مش معروف على عنصر ده HTML سليم، وclass أو event مش معروفين سليمين برضه. فلما directive ميطابقش، أنجولار غالبًا مالوش حاجة يشتكي منها.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'A selector without brackets', ar: 'selector من غير أقواس' }, blocks: [
        { t: 'pair',
          bad:  { name: 'autofocus.directive.ts', lang: 'ts', code: ["  selector: 'appAutofocus',"] },
          good: { name: 'autofocus.directive.ts', lang: 'ts', code: ["  selector: '[appAutofocus]',"] } },
        { t: 'p', en: 'Without brackets the selector means an <b>element</b> called <code>&lt;appAutofocus&gt;</code>. Your <code>&lt;input appAutofocus&gt;</code> is not that element, so the directive never applies and nothing complains.',
                  ar: 'من غير أقواس الـ selector معناه <b>عنصر</b> اسمه <code>&lt;appAutofocus&gt;</code>. والـ <code>&lt;input appAutofocus&gt;</code> بتاعك مش العنصر ده، فالـ directive عمره ما بيتطبق ومحدش بيشتكي.' }
      ]},
      { t: 'step', n: '2', title: { en: 'Forgetting to import a directive', ar: 'نسيان الـ import بتاع directive' }, blocks: [
        { t: 'pair',
          bad:  { name: 'feed.component.ts', lang: 'ts', code: ['  imports: [Tooltip, TimeAgo],'] },
          good: { name: 'feed.component.ts', lang: 'ts', code: ['  imports: [Autofocus, Tooltip, TimeAgo],'] } },
        { t: 'p', en: 'A missing <b>pipe</b> is a compile error. A missing directive used as a plain attribute, like <code>appAutofocus</code>, is not: the attribute just sits there. (A missing directive whose attribute is <b>bound</b>, like <code>[appTooltip]="…"</code>, does give “Can’t bind to…”.)',
                  ar: 'الـ <b>pipe</b> الناقص compile error. لكن الـ directive الناقص اللي مستخدم كـ attribute عادي، زي <code>appAutofocus</code>، لأ: الـ attribute بيفضل قاعد مكانه وخلاص. (أما الـ directive الناقص اللي الـ attribute بتاعه <b>مربوط</b>، زي <code>[appTooltip]="…"</code>، فبيدي «Can’t bind to…».)' }
      ]},
      { t: 'step', n: '3', title: { en: 'A camelCase event name', ar: 'اسم event بـ camelCase' }, blocks: [
        { t: 'pair',
          bad:  { name: 'tooltip.directive.ts', lang: 'ts', code: ["    '(mouseEnter)': 'show()',"] },
          good: { name: 'tooltip.directive.ts', lang: 'ts', code: ["    '(mouseenter)': 'show()',"] } },
        { t: 'p', en: 'Angular listens for whatever name you write. The browser fires <code>mouseenter</code>, never <code>mouseEnter</code>, so the listener waits forever. Browser event names are all lowercase.',
                  ar: 'أنجولار بيسمع لأي اسم تكتبه. والمتصفح بيطلّع <code>mouseenter</code>، عمره ما بيطلّع <code>mouseEnter</code>، فالـ listener بيفضل مستني على الفاضي. أسماء events المتصفح كلها حروف صغيرة.' }
      ]},
      { t: 'step', n: '4', title: { en: 'The class name differs between host and CSS', ar: 'اسم الـ class مختلف بين الـ host والـ CSS' }, blocks: [
        { t: 'pair',
          bad:  { name: 'styles.css', lang: 'css', code: ['.tooltip-open::after {'] },
          good: { name: 'styles.css', lang: 'css', code: ['.tip-open::after {'] } },
        { t: 'p', en: 'The directive puts <code>tip-open</code> on the heading; the stylesheet waits for <code>tooltip-open</code>. Both are valid, neither is an error, and the tooltip never shows. Copy class names, do not retype them.',
                  ar: 'الـ directive بيحط <code>tip-open</code> على العنوان؛ والـ stylesheet مستني <code>tooltip-open</code>. الاتنين سليمين، ولا واحد فيهم error، والـ tooltip عمره ما هيظهر. انسخ أسماء الـ classes، متكتبهاش من دماغك.' }
      ]},
      { t: 'step', n: '5', title: { en: 'The class name in the template', ar: 'اسم الكلاس في التمبلت' }, blocks: [
        { t: 'pair',
          bad:  { name: 'feed.component.html', lang: 'html', code: ['<time>{{ post.publishedAt | TimeAgo }}</time>'] },
          good: { name: 'feed.component.html', lang: 'html', code: ['<time>{{ post.publishedAt | timeAgo }}</time>'] } },
        { t: 'p', en: 'This one does give an error, but it confuses people: “No pipe found with name ‘TimeAgo’”. You <i>did</i> import <code>TimeAgo</code>. The template wants the <code>name:</code> string, not the class.',
                  ar: 'دي بتدي error، بس بيلخبط الناس: «No pipe found with name ‘TimeAgo’». انت <i>فعلًا</i> عامل import لـ <code>TimeAgo</code>. التمبلت عايز النص اللي في <code>name:</code>، مش الكلاس.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it does nothing', ar: 'لما مايعملش حاجة' },
    title: { en: 'Six questions, in this order', ar: 'ست أسئلة، بالترتيب ده' },
    lead: {
      en: 'Your directive or pipe “does not work”. Ask these before anything else.',
      ar: 'الـ directive أو الـ pipe بتاعك «مش شغال». اسأل الأسئلة دي قبل أي حاجة.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Is the <b>class</b> in the <code>imports</code> of the component whose template uses it?',
                  ar: '<b>1.</b> <b>الكلاس</b> موجود في <code>imports</code> بتاعة الـ component اللي التمبلت بتاعه بيستخدمه؟' },
      { t: 'chk', en: '<b>2.</b> Does the selector have square brackets: <code>\'[appTooltip]\'</code>, not <code>\'appTooltip\'</code>?',
                  ar: '<b>2.</b> الـ selector فيه أقواس مربعة: <code>\'[appTooltip]\'</code>، مش <code>\'appTooltip\'</code>؟' },
      { t: 'chk', en: '<b>3.</b> Is the attribute in the template spelled exactly like the selector, same capitals?',
                  ar: '<b>3.</b> الـ attribute اللي في التمبلت مكتوب بالظبط زي الـ selector، بنفس الحروف الكبيرة؟' },
      { t: 'chk', en: '<b>4.</b> For a pipe: does the template use the <code>name:</code> string, not the class name?',
                  ar: '<b>4.</b> لو pipe: التمبلت بيستخدم النص اللي في <code>name:</code>، مش اسم الكلاس؟' },
      { t: 'chk', en: '<b>5.</b> In <code>host</code>: are the event names real, lowercase browser events, and do the method names match the class?',
                  ar: '<b>5.</b> في <code>host</code>: أسماء الـ events دي events حقيقية بتاعة المتصفح وبحروف صغيرة، وأسماء الميثودز مطابقة للكلاس؟' },
      { t: 'chk', en: '<b>6.</b> In DevTools, is the class or attribute on the element? If yes, the directive works and the CSS name is wrong.',
                  ar: '<b>6.</b> في الـ DevTools، الـ class أو الـ attribute موجود على العنصر؟ لو آه، يبقى الـ directive شغال واسم الـ CSS هو الغلط.' }
    ]
  }
  ]
};
