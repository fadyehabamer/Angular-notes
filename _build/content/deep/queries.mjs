/* ==================================================================
   Queries, name by name — the companion page after the viewChild /
   contentChild topic. One running example (a search panel with a Clear
   button, a result list child, and a hint the page projects in)
   followed through every file, every name coloured by who owns it.
   Names list: inline, below.
   ================================================================== */

/* a name in running text, coloured like the code and linked on hover */
const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

export default {
  topic: 'queries',
  tab: 'viewChild, name by name — The Angular Signal',
  title: { en: '<code>viewChild</code> and <code>contentChild</code>, name by name', ar: '<code>viewChild</code> و<code>contentChild</code>، اسم اسم' },
  say: {
    en: 'The page for when <code>#box</code>, <code>\'box\'</code> and <code>this.box</code> feel like the same thing. One search panel followed through every file, every name coloured by who owns it: the reference names that must match, the property names that are only yours. Then what breaks when you rename each one.',
    ar: 'الصفحة دي لما <code>#box</code> و<code>\'box\'</code> و<code>this.box</code> يبانوا كأنهم حاجة واحدة. search panel واحد ماشيين وراه في كل الملفات، وكل اسم ملوّن حسب صاحبه: أسماء الـ references اللي لازم تطابق، وأسماء الـ properties اللي بتاعتك انت بس. وبعدين إيه اللي بيبوظ لما تغيّر كل واحد.'
  },
  lead: {
    en: 'The idea is simple: <b>label something in a template, then ask for it by that label in the class.</b> The confusing part is the names. Most examples write <code>#box</code>, <code>viewChild(\'box\')</code> and <code>readonly box = …</code>, so it looks like one name used three times. It is two names. The label and the string must match; the property is a separate name you can call anything. This page keeps them apart on purpose.',
    ar: 'الفكرة بسيطة: <b>علّم حاجة في التمبلت، وبعدين اطلبها بالعلامة دي في الكلاس.</b> اللي بيلخبط هو الأسماء. أغلب الأمثلة بتكتب <code>#box</code> و<code>viewChild(\'box\')</code> و<code>readonly box = …</code>، فيبان إنه اسم واحد متكرر تلات مرات. هو اسمين. العلامة والنص لازم يطابقوا؛ والـ property اسم تاني تقدر تسمّيه أي حاجة. الصفحة دي بتفصلهم عن قصد.'
  },

  names: {
    note: {
      en: 'The string inside <code>viewChild(\'box\')</code> is not a property name. It must match a <code>#box</code> in a template, so it is orange. The property on the left of <code>=</code> is a separate, green name. For <code>contentChild</code>, the <code>#hint</code> is written in the <b>parent’s</b> template, a different component from the one asking.',
      ar: 'النص اللي جوه <code>viewChild(\'box\')</code> مش اسم property. لازم يطابق <code>#box</code> في تمبلت، فهو برتقاني. والـ property اللي على شمال <code>=</code> اسم تاني منفصل، أخضر. وفي <code>contentChild</code>، الـ <code>#hint</code> مكتوب في تمبلت <b>الأب</b>، component غير اللي بيسأل.'
    },
    names: [
      /* --- shared: two places must agree --- */
      { n:'#box', k:'pub', as:'koshary', re:'(?<=#|\')box(?![\\w$-])',
        w:{ en:'A template reference name. <code>#box</code> in the template and <code>\'box\'</code> in the query must match, or the query finds nothing.',
            ar:'اسم template reference. الـ <code>#box</code> في التمبلت والـ <code>\'box\'</code> في الـ query لازم يطابقوا، وإلا الـ query مش هتلاقي حاجة.' } },
      { n:'#hint', k:'pub', as:'feteer', re:'(?<=#|\')(?<!\'#)hint(?![\\w$-])',
        w:{ en:'A reference written by the <b>page</b> on what it projects, and asked for by the panel’s <code>contentChild(\'hint\')</code>. Two components.',
            ar:'reference مكتوب عند <b>الصفحة</b> على الحاجة اللي بتسقطها، والـ panel بيطلبه بـ <code>contentChild(\'hint\')</code>. اتنين components.' } },
      { n:'ResultList', k:'pub',
        w:{ en:'The child’s class. <code>viewChild(ResultList)</code> finds the child by it, so no string is involved.',
            ar:'كلاس الابن. <code>viewChild(ResultList)</code> بتلاقي الابن بيه، فمفيش نص خالص.' } },
      { n:'scrollToTop', k:'pub',
        w:{ en:'A public method on the child that the panel calls. Rename it in both files.', ar:'ميثود public في الابن والـ panel بيناديها. غيّرها في الملفين.' } },
      { n:'items', k:'pub',
        w:{ en:'The child’s input, set by the panel with <code>[items]</code>.', ar:'الـ input بتاع الابن، والـ panel بيحطه بـ <code>[items]</code>.' } },
      { n:'app-result-list', k:'pub',
        w:{ en:'The child’s selector, typed as a tag by the panel.', ar:'الـ selector بتاع الابن، والـ panel بيكتبه كتاج.' } },
      { n:'app-search-panel', k:'pub',
        w:{ en:'The panel’s selector, typed as a tag by the page.', ar:'الـ selector بتاع الـ panel، والصفحة بتكتبه كتاج.' } },
      { n:'SearchPanel', k:'pub',
        w:{ en:'The panel’s class. The page imports it by this name.', ar:'كلاس الـ panel. الصفحة بتعمله import بالاسم ده.' } },
      { n:'SearchPage', k:'pub',
        w:{ en:'The page’s class. Whoever shows it imports it by this name.', ar:'كلاس الصفحة. أي حد بيعرضها بيعمله import بالاسم ده.' } },
      { n:'app-search-page', k:'pub',
        w:{ en:'The page’s selector.', ar:'الـ selector بتاع الصفحة.' } },

      /* --- yours, private to one component --- */
      { n:'searchBox', k:'mine',
        w:{ en:'The property holding the query result. Only this class reads it. It does <b>not</b> have to match <code>#box</code>.',
            ar:'الـ property اللي شايلة نتيجة الـ query. الكلاس ده بس اللي بيقراها. <b>مش</b> لازم تطابق <code>#box</code>.' } },
      { n:'list', k:'mine',
        w:{ en:'The property holding the <code>ResultList</code> instance.', ar:'الـ property اللي شايلة الـ instance بتاع <code>ResultList</code>.' } },
      { n:'customHint', k:'mine',
        w:{ en:'The property holding the <code>contentChild</code> result, read by the panel’s own template.', ar:'الـ property اللي شايلة نتيجة الـ <code>contentChild</code>، وتمبلت الـ panel نفسه بيقراها.' } },
      { n:'results', k:'mine', re:'(?<![\\w$\'#-])results(?![\\w$\'-])',
        w:{ en:'The panel’s own signal. It is passed into the child’s <code>items</code>: two different names on purpose.', ar:'الـ signal بتاعة الـ panel. بتتبعت للـ <code>items</code> بتاع الابن: اسمين مختلفين عن قصد.' } },
      { n:'listEl', k:'mine', w:{ en:'Your property name for the list’s tag as an element.', ar:'اسم الـ property بتاعك لتاج الليستة كعنصر.' } },
      { n:'chips', k:'mine', w:{ en:'Your property name for a plural query.', ar:'اسم الـ property بتاعك لـ query بالجمع.' } },
      { n:'#chip', k:'pub', as:'falafel', re:'(?<=#|\')chip(?![\\w$-])',
        w:{ en:'A label that must match <code>#chip</code> on every chip in the template.', ar:'علامة لازم تطابق <code>#chip</code> على كل chip في التمبلت.' } },
      { n:'clearAndFocus', k:'mine',
        w:{ en:'The panel’s own method, called from its own template.', ar:'ميثود الـ panel نفسه، بتتنادى من التمبلت بتاعه.' } },
      { n:'el', k:'mine',
        w:{ en:'The child’s private field holding its own element.', ar:'الـ field الخاص بالابن اللي شايل العنصر بتاعه.' } },
      { n:'item', k:'mine', w:{ en:'The loop variable in the child’s template.', ar:'متغير اللوب في تمبلت الابن.' } },

      /* --- Angular's, the browser's --- */
      { n:'viewChild', k:'ng',
        w:{ en:'Angular’s query for one thing in <b>this component’s own</b> template.', ar:'الـ query بتاعة أنجولار لحاجة واحدة في التمبلت <b>بتاع الـ component ده نفسه</b>.' } },
      { n:'viewChildren', k:'ng',
        w:{ en:'Angular’s query for every match in this component’s own template.', ar:'الـ query بتاعة أنجولار لكل الحاجات اللي بتطابق في تمبلت الـ component نفسه.' } },
      { n:'contentChild', k:'ng',
        w:{ en:'Angular’s query for one thing the <b>parent</b> wrote between this component’s tags.', ar:'الـ query بتاعة أنجولار لحاجة واحدة <b>الأب</b> كتبها بين التاجات بتاعة الـ component ده.' } },
      { n:'required', k:'ng',
        w:{ en:'Part of Angular’s API: <code>viewChild.required</code> promises the thing is always there.', ar:'جزء من API أنجولار: <code>viewChild.required</code> بتوعد إن الحاجة دايمًا موجودة.' } },
      { n:'read', k:'ng',
        w:{ en:'An option key: “give me this type instead of the default”.', ar:'مفتاح إعداد: «هاتلي النوع ده بدل الافتراضي».' } },
      { n:'@ViewChild', k:'ng', w:{ en:'The older decorator version of <code>viewChild</code>.', ar:'النسخة القديمة (decorator) من <code>viewChild</code>.' } },
      { n:'@ContentChild', k:'ng', w:{ en:'The older decorator version of <code>contentChild</code>.', ar:'النسخة القديمة (decorator) من <code>contentChild</code>.' } },
      { n:'ngAfterViewInit', k:'ng', w:{ en:'Angular’s lifecycle hook for “my template is ready”. The name is fixed.', ar:'lifecycle hook بتاع أنجولار لـ «التمبلت بتاعي جاهز». الاسم ثابت.' } },
      { n:'ElementRef', k:'ng', w:{ en:'Angular’s wrapper around a real DOM element.', ar:'الغلاف بتاع أنجولار حوالين عنصر DOM حقيقي.' } },
      { n:'nativeElement', k:'ng', w:{ en:'The property on <code>ElementRef</code> holding the DOM element.', ar:'الـ property في <code>ElementRef</code> اللي شايلة عنصر الـ DOM.' } },
      { n:'HTMLInputElement', k:'ng', w:{ en:'The browser’s type for an <code>&lt;input&gt;</code>.', ar:'النوع بتاع المتصفح لعنصر <code>&lt;input&gt;</code>.' } },
      { n:'value', k:'ng', w:{ en:'The DOM property holding what is typed in the box.', ar:'الـ property بتاعة الـ DOM اللي فيها المكتوب في الخانة.' } },
      { n:'focus', k:'ng', w:{ en:'The DOM method that puts the cursor in the element.', ar:'ميثود الـ DOM اللي بتحط المؤشر في العنصر.' } },
      { n:'scrollTo', k:'ng', w:{ en:'The DOM’s own scrolling method.', ar:'ميثود الـ DOM نفسه للـ scroll.' } },
      { n:'click', k:'ng', w:{ en:'The browser’s own event name.', ar:'اسم الـ event بتاع المتصفح نفسه.' } },
      { n:'ng-content', k:'ng', w:{ en:'Angular’s tag for “what the parent wrote goes here”.', ar:'تاج أنجولار لـ «اللي الأب كتبه يتحط هنا».' } },
      { n:'input', k:'ng', re:'(?<![\\w$<(-])input(?=[.(<,])',
        w:{ en:'Angular’s function that creates an input. The <code>&lt;input&gt;</code> tag is HTML’s.', ar:'الـ function بتاعة أنجولار اللي بتعمل input. وتاج <code>&lt;input&gt;</code> بتاع HTML.' } },
      { n:'inject', k:'ng', w:{ en:'Angular’s function that hands you a dependency.', ar:'الـ function بتاعة أنجولار اللي بتديك dependency.' } },
      { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
      { n:'afterNextRender', k:'ng', w:{ en:'Angular’s function: run once, in the browser, after the next render.', ar:'الـ function بتاعة أنجولار: شغّل مرة واحدة، في المتصفح، بعد الرسم الجاي.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator for a component.', ar:'الـ decorator بتاع أنجولار للـ component.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The tag name after it is yours.', ar:'مفتاح إعداد. اسم التاج اللي بعده بتاعك.' } },
      { n:'imports', k:'ng', w:{ en:'An option key: what this template may use.', ar:'مفتاح إعداد: التمبلت ده مسموحله يستخدم إيه.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key: the path to the HTML file.', ar:'مفتاح إعداد: مسار ملف الـ HTML.' } },
      { n:'template', k:'ng', w:{ en:'An option key: the HTML written inline.', ar:'مفتاح إعداد: الـ HTML مكتوب جوه الملف.' } },
      { n:'@if', k:'ng', w:{ en:'Angular’s template control flow.', ar:'الـ control flow بتاع أنجولار في التمبلت.' } },
      { n:'@for', k:'ng', w:{ en:'Angular’s loop block.', ar:'بلوك اللوب بتاع أنجولار.' } },
      { n:'track', k:'ng', w:{ en:'Part of <code>@for</code>.', ar:'جزء من <code>@for</code>.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One click on Clear, six stops', ar: 'كليك واحدة على Clear، ست محطات' },
    lead: {
      en: 'A search panel has a text box, a Clear button and a result list below. Clear must empty the box, put the cursor back in it, and scroll the list to the top. The class needs the real box and the real list to do that. Follow the click:',
      ar: 'search panel فيه خانة كتابة، وزرار Clear، وليستة نتايج تحت. Clear لازم يفضّي الخانة، ويرجّع المؤشر جواها، ويطلّع الليستة لفوق. الكلاس محتاج الخانة الحقيقية والليستة الحقيقية عشان يعمل كده. امشي ورا الكليك:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'search-panel.html', lang: 'html', who: { en: 'panel template · labels it', ar: 'تمبلت الـ panel · بيعلّمه' },
          code: ['<input #box placeholder="Search">'],
          say: { en: `${pub('#box')} is a label you stick on the element. The <code>#</code> is Angular’s syntax; the word after it is yours. On its own it does nothing yet.`,
                 ar: `${pub('#box')} علامة بتلزقها على العنصر. الـ <code>#</code> كتابة أنجولار؛ والكلمة اللي بعدها بتاعتك. لوحدها لسه مش بتعمل حاجة.` } },
        { file: 'search-panel.ts', lang: 'ts', who: { en: 'panel class · asks for it', ar: 'كلاس الـ panel · بيطلبه' },
          code: ["readonly searchBox = viewChild.required<ElementRef<HTMLInputElement>>('box');"],
          say: { en: `The string <code>'box'</code> must equal the label, without the <code>#</code>. ${mine('searchBox')} on the left is a <b>different</b> name, the property that holds the result. It could be <code>input</code>, <code>field</code>, anything. ${ng('viewChild')} is Angular’s.`,
                 ar: `النص <code>'box'</code> لازم يساوي العلامة، من غير الـ <code>#</code>. و${mine('searchBox')} اللي على الشمال اسم <b>تاني</b>، الـ property اللي شايلة النتيجة. ممكن تبقى <code>input</code> أو <code>field</code> أو أي حاجة. و${ng('viewChild')} بتاعة أنجولار.` } },
        { file: 'search-panel.html', lang: 'html', who: { en: 'panel template · the button', ar: 'تمبلت الـ panel · الزرار' },
          code: ['<button (click)="clearAndFocus()">Clear</button>'],
          say: { en: `${ng('click')} is the browser’s. ${mine('clearAndFocus')} is the panel’s own method.`,
                 ar: `${ng('click')} بتاع المتصفح. و${mine('clearAndFocus')} ميثود الـ panel نفسه.` } },
        { file: 'search-panel.ts', lang: 'ts', who: { en: 'panel class · uses it', ar: 'كلاس الـ panel · بيستخدمه' },
          code: ["this.searchBox().nativeElement.value = '';", 'this.searchBox().nativeElement.focus();'],
          say: { en: `A query is a signal, so you read it by <b>calling</b> it: ${mine('searchBox')}<code>()</code>. The rest is fixed: ${ng('nativeElement')} is Angular’s, ${ng('value')} and ${ng('focus')} are the browser’s.`,
                 ar: `الـ query دي signal، فبتقراها بإنك <b>تناديها</b>: ${mine('searchBox')}<code>()</code>. والباقي ثابت: ${ng('nativeElement')} بتاعة أنجولار، و${ng('value')} و${ng('focus')} بتوع المتصفح.` } },
        { file: 'search-panel.ts', lang: 'ts', who: { en: 'panel class · the child', ar: 'كلاس الـ panel · الابن' },
          code: ['readonly list = viewChild(ResultList);', '…', 'this.list()?.scrollToTop();'],
          say: { en: `Here there is no label at all. Asking by <b>class</b>, ${pub('ResultList')}, finds the child component and gives you its instance. The <code>?.</code> is there because this query is not <code>.required</code>, so it may be <code>undefined</code>.`,
                 ar: `هنا مفيش علامة خالص. لما تطلب بـ <b>الكلاس</b>، ${pub('ResultList')}، بتلاقي الـ component الابن وبتاخد الـ instance بتاعه. والـ <code>?.</code> موجودة عشان الـ query دي مش <code>.required</code>، فممكن تبقى <code>undefined</code>.` } },
        { file: 'result-list.ts', lang: 'ts', who: { en: 'child · the method', ar: 'الابن · الميثود' },
          code: ['scrollToTop() {', "  this.el.nativeElement.scrollTo({ top: 0, behavior: 'smooth' });", '}'],
          say: { en: `${pub('scrollToTop')} is a name the child picked and the panel types too: rename both. Keep methods like this few and small; they are the child’s public API.`,
                 ar: `${pub('scrollToTop')} اسم الابن اختاره والـ panel بيكتبه برضه: غيّر الاتنين. خلّي الميثودز اللي زي دي قليلة وصغيرة؛ دي الـ API اللي الابن بيعرضه برّه.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'Template: <code>#box</code>. Class: <code>viewChild(\'box\')</code>. Those two must match. <code>searchBox</code>, the property, is yours alone. Asking by a class, <code>viewChild(ResultList)</code>, needs no label at all.',
        ar: 'التمبلت: <code>#box</code>. الكلاس: <code>viewChild(\'box\')</code>. الاتنين دول لازم يطابقوا. و<code>searchBox</code>، الـ property، بتاعتك انت لوحدك. ولما تطلب بكلاس، <code>viewChild(ResultList)</code>، مش محتاج علامة خالص.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Which template?', ar: 'أنهي تمبلت؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'The question that settles viewChild versus contentChild: <b>in whose file is the <code>#label</code> written?</b>',
      ar: 'السؤال اللي بيحسم viewChild ولا contentChild: <b>الـ <code>#label</code> مكتوب في ملف مين؟</b>'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>&lt;input #box&gt;</code>', 'panel <code>.html</code>', 'the panel', `you pick ${pub('#box')}`],
            ar: ['<code>&lt;input #box&gt;</code>', '<code>.html</code> الـ panel', 'الـ panel', `انت بتختار ${pub('#box')}`] },
          { en: [`<code>searchBox = viewChild…('box')</code>`, 'panel <code>.ts</code>', 'the panel', `${ng('viewChild')} is Angular’s; the string copies the label; you pick ${mine('searchBox')}`],
            ar: [`<code>searchBox = viewChild…('box')</code>`, '<code>.ts</code> الـ panel', 'الـ panel', `${ng('viewChild')} بتاعة أنجولار؛ والنص بينسخ العلامة؛ وانت بتختار ${mine('searchBox')}`] },
          { en: ['<code>list = viewChild(ResultList)</code>', 'panel <code>.ts</code>', 'the panel', `copies the child’s class ${pub('ResultList')}; you pick ${mine('list')}`],
            ar: ['<code>list = viewChild(ResultList)</code>', '<code>.ts</code> الـ panel', 'الـ panel', `بينسخ كلاس الابن ${pub('ResultList')}؛ وانت بتختار ${mine('list')}`] },
          { en: ['<code>&lt;p #hint&gt;</code>', 'page <code>.html</code>', '<b>the page</b>, the parent', `you pick ${pub('#hint')}`],
            ar: ['<code>&lt;p #hint&gt;</code>', '<code>.html</code> الصفحة', '<b>الصفحة</b>، الأب', `انت بتختار ${pub('#hint')}`] },
          { en: [`<code>customHint = contentChild('hint')</code>`, 'panel <code>.ts</code>', 'the panel', `${ng('contentChild')} is Angular’s; the string copies the page’s label; you pick ${mine('customHint')}`],
            ar: [`<code>customHint = contentChild('hint')</code>`, '<code>.ts</code> الـ panel', 'الـ panel', `${ng('contentChild')} بتاعة أنجولار؛ والنص بينسخ علامة الصفحة؛ وانت بتختار ${mine('customHint')}`] },
          { en: ['<code>scrollToTop() { … }</code>', 'child <code>.ts</code>', 'the child', `you pick ${pub('scrollToTop')}; the panel copies it`],
            ar: ['<code>scrollToTop() { … }</code>', '<code>.ts</code> الابن', 'الابن', `انت بتختار ${pub('scrollToTop')}؛ والـ panel بينسخه`] },
        ] },
      { t: 'ul',
        en: ['<b>Label written in my own template → <code>viewChild</code>.</b> The <code>#box</code> and the query live in the same component.',
             '<b>Label written by whoever uses me, between my tags → <code>contentChild</code>.</b> The <code>#hint</code> is in the page’s file, the query in the panel’s.',
             '<b>A query never looks inside a child’s own template.</b> If <code>#x</code> is written in <code>result-list</code>’s template, the panel cannot find it. Ask the child for it through a method or an input instead.'],
        ar: ['<b>العلامة مكتوبة في التمبلت بتاعي → <code>viewChild</code>.</b> الـ <code>#box</code> والـ query عايشين في نفس الـ component.',
             '<b>العلامة مكتوبة عند اللي بيستخدمني، بين التاجات بتاعتي → <code>contentChild</code>.</b> الـ <code>#hint</code> في ملف الصفحة، والـ query في ملف الـ panel.',
             '<b>الـ query عمرها ما بتبص جوه التمبلت بتاع ابن.</b> لو <code>#x</code> مكتوب في تمبلت <code>result-list</code>، الـ panel مش هيلاقيه. اطلبه من الابن بميثود أو input بدل كده.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All five files, every name coloured', ar: 'الخمس ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same search panel, complete. Hover <code>box</code> to see the only two places that must agree. Then press <b>Rename test</b>: the label and the string change together, the property changes on its own, and it all still works.',
      ar: 'نفس الـ search panel، كامل. قف على <code>box</code> عشان تشوف المكانين الوحيدين اللي لازم يتفقوا. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: العلامة والنص بيتغيروا مع بعض، والـ property بتتغير لوحدها، وكله لسه شغال.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'search-panel.ts', lang: 'ts', tag: { en: 'asks for three things', ar: 'بيطلب تلات حاجات' }, code: [
        "import { Component, ElementRef, contentChild, signal, viewChild } from '@angular/core';",
        "import { ResultList } from './result-list';",
        '',
        '@Component({',
        "  selector: 'app-search-panel',",
        '  imports: [ResultList],',
        "  templateUrl: './search-panel.html',",
        '})',
        'export class SearchPanel {',
        '  // written in MY template:   <input #box>',
        "  readonly searchBox = viewChild.required<ElementRef<HTMLInputElement>>('box');",
        '  // written in MY template:   <app-result-list>',
        '  readonly list = viewChild(ResultList);',
        '  // written by the PARENT, between my tags:   <p #hint>',
        "  readonly customHint = contentChild<ElementRef>('hint');",
        '',
        "  readonly results = signal(['Angular', 'Signals', 'Queries']);",
        '',
        '  clearAndFocus() {',
        "    this.searchBox().nativeElement.value = '';",
        '    this.searchBox().nativeElement.focus();',
        '    this.list()?.scrollToTop();',
        '  }',
        '}' ] },
      { t: 'code', name: 'search-panel.html', lang: 'html', tag: { en: 'owns the targets', ar: 'صاحب الأهداف' }, code: [
        '<input #box placeholder="Search">',
        '<button (click)="clearAndFocus()">Clear</button>',
        '',
        '@if (!customHint()) {',
        '  <p>Type something to search.</p>',
        '}',
        '<ng-content />',
        '',
        '<app-result-list [items]="results()" />' ] },
      { t: 'code', name: 'result-list.ts', lang: 'ts', tag: { en: 'the child', ar: 'الابن' }, code: [
        "import { Component, ElementRef, inject, input } from '@angular/core';",
        '',
        '@Component({',
        "  selector: 'app-result-list',",
        '  template: `',
        '    <ul>',
        '      @for (item of items(); track item) { <li>{{ item }}</li> }',
        '    </ul>',
        '  `,',
        '})',
        'export class ResultList {',
        '  readonly items = input<string[]>([]);',
        '  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);',
        '',
        '  scrollToTop() {',
        "    this.el.nativeElement.scrollTo({ top: 0, behavior: 'smooth' });",
        '  }',
        '}' ] },
      { t: 'code', name: 'search-page.html', lang: 'html', tag: { en: 'the parent', ar: 'الأب' }, code: [
        '<app-search-panel>',
        '  <p #hint>Try “signals” or “queries”.</p>',
        '</app-search-panel>' ] },
      { t: 'code', name: 'search-page.ts', lang: 'ts', tag: { en: 'the parent', ar: 'الأب' }, code: [
        "import { Component } from '@angular/core';",
        "import { SearchPanel } from './search-panel';",
        '',
        '@Component({',
        "  selector: 'app-search-page',",
        '  imports: [SearchPanel],',
        "  templateUrl: './search-page.html',",
        '})',
        'export class SearchPage {}' ] },
      { t: 'nmtable' }
    ]
  },

  /* ------------------------------------------------------------ 4 */
  {
    id: 'rename',
    kicker: { en: 'Is it OK to change it?', ar: 'ينفع أغيّره؟' },
    title: { en: 'What breaks when you rename each name', ar: 'إيه اللي بيبوظ لما تغيّر كل اسم' },
    lead: {
      en: 'Property names give compile errors, as usual. The label strings do not: TypeScript cannot see from <code>\'box\'</code> whether a <code>#box</code> exists. What you get depends on <code>.required</code>.',
      ar: 'أسماء الـ properties بتدي compile errors زي العادة. نصوص العلامات لأ: TypeScript مايقدرش يعرف من <code>\'box\'</code> إن فيه <code>#box</code> موجود. واللي بيحصلك بيعتمد على <code>.required</code>.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [pub('#box') + ' (label)', 'the string in <code>viewChild(\'box\')</code>', 'The query finds nothing. Because it is <code>.required</code>, reading it throws a runtime error saying the required query has no value, the first time you click Clear.'],
            ar: [pub('#box') + ' (العلامة)', 'النص اللي في <code>viewChild(\'box\')</code>', 'الـ query مش بتلاقي حاجة. وعشان هي <code>.required</code>، قرايتها بترمي runtime error بيقول إن الـ query الـ required مالهاش قيمة، أول ما تدوس Clear.'] },
          { en: [pub('#hint') + ' (label, in the page)', 'the string in the panel’s <code>contentChild(\'hint\')</code>', '<b>No error.</b> The optional query is just <code>undefined</code>, so the panel shows its default text <b>and</b> the page’s hint.'],
            ar: [pub('#hint') + ' (العلامة، في الصفحة)', 'النص اللي في <code>contentChild(\'hint\')</code> بتاع الـ panel', '<b>مفيش error.</b> الـ query الاختيارية بتبقى <code>undefined</code> وخلاص، فالـ panel بيعرض النص الافتراضي بتاعه <b>و</b>الـ hint بتاع الصفحة.'] },
          { en: [`${mine('searchBox')}, ${mine('list')}, ${mine('customHint')} (properties)`, 'every use inside the panel: <code>this.searchBox()</code>, <code>customHint()</code> in its template', 'Compile error inside the panel. The label is not affected at all.'],
            ar: [`${mine('searchBox')} و${mine('list')} و${mine('customHint')} (properties)`, 'كل استخدام جوه الـ panel: <code>this.searchBox()</code>، و<code>customHint()</code> في التمبلت بتاعه', 'Compile error جوه الـ panel. والعلامة مالهاش دعوة خالص.'] },
          { en: [pub('ResultList') + ' (class)', 'the import, <code>imports</code> and <code>viewChild(ResultList)</code>', 'Compile error.'],
            ar: [pub('ResultList') + ' (الكلاس)', 'الـ import و<code>imports</code> و<code>viewChild(ResultList)</code>', 'Compile error.'] },
          { en: [pub('scrollToTop'), 'the panel’s <code>this.list()?.scrollToTop()</code>', 'Compile error: the query is typed as <code>ResultList</code>, so TypeScript knows the method is gone.'],
            ar: [pub('scrollToTop'), 'الـ <code>this.list()?.scrollToTop()</code> بتاعة الـ panel', 'Compile error: الـ query نوعها <code>ResultList</code>، فـ TypeScript عارف إن الميثود راحت.'] },
          { en: [pub('items') + ' (child input)', 'the panel’s <code>[items]</code>', 'Compile error: “Can’t bind to ‘items’…”.'],
            ar: [pub('items') + ' (input الابن)', 'الـ <code>[items]</code> بتاع الـ panel', 'Compile error: «Can’t bind to ‘items’…».'] },
          { en: [`${ng('viewChild')}, ${ng('contentChild')}, ${ng('nativeElement')}, ${ng('focus')}`, 'nothing: you cannot rename these', 'They are Angular’s and the browser’s words.'],
            ar: [`${ng('viewChild')} و${ng('contentChild')} و${ng('nativeElement')} و${ng('focus')}`, 'ولا حاجة: دول مينفعش يتغيروا', 'دي كلمات أنجولار والمتصفح.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b> above the files. <code>box</code> changes in <code>#box</code> and in <code>\'box\'</code>, and <code>searchBox</code> changes to a different word. That is the proof that they are two names.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b> فوق الملفات. <code>box</code> بيتغير في <code>#box</code> وفي <code>\'box\'</code>، و<code>searchBox</code> بيتغير لكلمة تانية خالص. وده الدليل إنهم اسمين.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتاعتك' },
    title: { en: 'The fixed names', ar: 'الأسماء الثابتة' },
    lead: {
      en: 'Four query functions, one option, and the DOM. Everything else in a query line is yours.',
      ar: 'أربع functions للـ queries، وإعداد واحد، والـ DOM. وأي حاجة تانية في سطر الـ query بتاعتك.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Word', 'Owner', 'What it means'], ar: ['الكلمة', 'صاحبها', 'معناها'] },
        rows: [
          { en: [`${ng('viewChild')}, ${ng('viewChildren')}`, 'Angular', 'One match, or all matches, in <b>my own</b> template.'],
            ar: [`${ng('viewChild')} و${ng('viewChildren')}`, 'أنجولار', 'حاجة واحدة، أو كل اللي بيطابق، في التمبلت <b>بتاعي</b>.'] },
          { en: [`${ng('contentChild')}, <code>contentChildren</code>`, 'Angular', 'One match, or all, in what the parent wrote <b>between my tags</b>.'],
            ar: [`${ng('contentChild')} و<code>contentChildren</code>`, 'أنجولار', 'حاجة واحدة، أو الكل، في اللي الأب كتبه <b>بين التاجات بتاعتي</b>.'] },
          { en: [ng('required'), 'Angular', 'Removes <code>undefined</code> from the type. Reading it when nothing matched throws.'],
            ar: [ng('required'), 'أنجولار', 'بتشيل <code>undefined</code> من النوع. ولو قريتها ومفيش حاجة طابقت بترمي error.'] },
          { en: [ng('read'), 'Angular', 'An option key: which type to hand back.'],
            ar: [ng('read'), 'أنجولار', 'مفتاح إعداد: ترجّع أنهي نوع.'] },
          { en: ['<code>#</code>', 'Angular', 'The syntax for a template reference. The word after it is yours.'],
            ar: ['<code>#</code>', 'أنجولار', 'الكتابة بتاعة الـ template reference. الكلمة اللي بعدها بتاعتك.'] },
          { en: [`${ng('ElementRef')}, ${ng('nativeElement')}`, 'Angular', 'The wrapper you get for a plain element, and the real DOM node inside it.'],
            ar: [`${ng('ElementRef')} و${ng('nativeElement')}`, 'أنجولار', 'الغلاف اللي بتاخده لعنصر عادي، وعنصر الـ DOM الحقيقي اللي جواه.'] },
          { en: [`${ng('value')}, ${ng('focus')}, ${ng('scrollTo')}, ${ng('HTMLInputElement')}`, 'the browser', 'Plain DOM. The same in any website.'],
            ar: [`${ng('value')} و${ng('focus')} و${ng('scrollTo')} و${ng('HTMLInputElement')}`, 'المتصفح', 'DOM عادي. زي أي موقع.'] },
        ] },
      { t: 'code', name: 'search-panel.ts · all of them', lang: 'ts', tag: { en: 'plural and read', ar: 'الجمع والـ read' }, code: [
        '// every element labelled #chip in my template',
        "readonly chips = viewChildren<ElementRef>('chip');",
        '',
        '// the <app-result-list> TAG as a DOM element, not the component instance',
        'readonly listEl = viewChild(ResultList, { read: ElementRef });' ] }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'Using the same word for the label and the property is common and legal. It is also the reason people think they are one name.',
      ar: 'إنك تستخدم نفس الكلمة للعلامة وللـ property شائع ومسموح. وهو برضه السبب إن الناس فاكرينهم اسم واحد.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['the <code>#label</code>', 'what the element is: <code>#box</code>, <code>#chart</code>', '<code>#ref1</code>, <code>#el</code>', 'Someone reading the template should guess why it is labelled.'],
            ar: ['الـ <code>#label</code>', 'العنصر ده إيه: <code>#box</code>، <code>#chart</code>', '<code>#ref1</code>، <code>#el</code>', 'اللي بيقرا التمبلت المفروض يخمّن هو متعلّم ليه.'] },
          { en: ['the property', 'same as the label, or clearer: <code>searchBox</code>', 'a name that suggests it is the value: <code>searchText</code>', 'It holds an element or a component, not the text typed in it.'],
            ar: ['الـ property', 'زي العلامة، أو أوضح: <code>searchBox</code>', 'اسم يوحي إنه القيمة: <code>searchText</code>', 'هي شايلة عنصر أو component، مش النص المكتوب جواه.'] },
          { en: ['a plural query', 'plural: <code>chips</code>, <code>tabs</code>', '<code>chip</code>', 'It is a list. The label on each element stays singular: <code>#chip</code>.'],
            ar: ['query بالجمع', 'جمع: <code>chips</code>، <code>tabs</code>', '<code>chip</code>', 'دي ليستة. والعلامة على كل عنصر بتفضل مفرد: <code>#chip</code>.'] },
          { en: ['a child’s public method', 'a clear verb: <code>scrollToTop</code>, <code>reset</code>', 'exposing internals: <code>setScrollState</code>', 'Whatever the parent calls is an API you must keep. Keep it small.'],
            ar: ['ميثود public في الابن', 'فعل واضح: <code>scrollToTop</code>، <code>reset</code>', 'إنك تكشف التفاصيل الداخلية: <code>setScrollState</code>', 'أي حاجة الأب بيناديها API لازم تحافظ عليه. خلّيه صغير.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Where the name is not free', ar: 'فين الاسم مش براحتك' },
    lead: {
      en: 'Two rules decide what goes inside the query’s brackets.',
      ar: 'قاعدتين بيقرروا إيه اللي يتكتب جوه أقواس الـ query.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'The string is the label without the <code>#</code>', ar: 'النص هو العلامة من غير الـ <code>#</code>' }, blocks: [
        { t: 'p',
          en: 'The template writes <code>#box</code>; the query writes <code>\'box\'</code>. Same letters, same capitals, no hash. Nothing else about the string is up to you once the label exists.',
          ar: 'التمبلت بيكتب <code>#box</code>؛ والـ query بتكتب <code>\'box\'</code>. نفس الحروف، ونفس الكبير والصغير، من غير الشباك. ومفيش حاجة تانية في النص براحتك بعد ما العلامة تبقى موجودة.' }
      ]},
      { t: 'step', n: 'B', title: { en: 'A class, not a string, finds a component', ar: 'كلاس، مش نص، هو اللي بيلاقي component' }, blocks: [
        { t: 'p',
          en: `<code>viewChild(ResultList)</code> takes the class itself, unquoted. Its name is whatever the child exported, so renaming the child’s class renames it here too. With a class you get the <b>component</b>; add ${ng('read')}<code>: ElementRef</code> to get its tag as a DOM element instead.`,
          ar: `<code>viewChild(ResultList)</code> بتاخد الكلاس نفسه، من غير quotes. واسمه هو اللي الابن عمله export، فلو غيّرت كلاس الابن بيتغير هنا كمان. بالكلاس بتاخد الـ <b>component</b>؛ وزوّد ${ng('read')}<code>: ElementRef</code> عشان تاخد التاج بتاعه كعنصر DOM بدل كده.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: 'The decorators use the same names', ar: 'الـ decorators بتستخدم نفس الأسماء' },
    lead: {
      en: 'Older code uses <code>@ViewChild</code> and <code>@ContentChild</code>. The label, the string and the property are the same three things. What changes: the result is a plain property, not a signal, and it is only filled in after a certain lifecycle hook.',
      ar: 'الكود الأقدم بيستخدم <code>@ViewChild</code> و<code>@ContentChild</code>. العلامة والنص والـ property هما نفس التلات حاجات. اللي بيتغير: النتيجة property عادية، مش signal، ومش بتتملي غير بعد lifecycle hook معين.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'search-panel.ts — older style', lang: 'ts', code: [
          "@ViewChild('box') searchBox!: ElementRef<HTMLInputElement>;",
          "@ContentChild('hint') customHint?: ElementRef;",
          '',
          'ngAfterViewInit() {',
          '  // only from here on is searchBox filled in',
          '  this.searchBox.nativeElement.focus();',
          '}' ] },
        good: { name: 'search-panel.ts — today', lang: 'ts', code: [
          "readonly searchBox = viewChild.required<ElementRef<HTMLInputElement>>('box');",
          "readonly customHint = contentChild<ElementRef>('hint');",
          '',
          'constructor() {',
          '  // runs once, after the first render',
          '  afterNextRender(() => this.searchBox().nativeElement.focus());',
          '}' ] } },
      { t: 'p',
        en: 'In the old style you read <code>this.searchBox</code> without brackets. In the new style you call <code>this.searchBox()</code>. Mixing the two up gives confusing type errors, see below.',
        ar: 'في الأسلوب القديم بتقرا <code>this.searchBox</code> من غير أقواس. وفي الجديد بتنادي <code>this.searchBox()</code>. لو خلطت الاتنين هتطلعلك type errors ملخبطة، شوف تحت.' }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, and says nothing', ar: 'مش بيعمل حاجة، ومش بيقول حاجة' },
    title: { en: 'Mistakes that fail silently, or confusingly', ar: 'غلطات بتفشل في صمت، أو بشكل ملخبط' },
    lead: {
      en: 'An optional query that finds nothing is just <code>undefined</code>, and <code>?.</code> swallows that without a word. Most bugs here hide behind that.',
      ar: 'الـ query الاختيارية اللي مش بتلاقي حاجة بتبقى <code>undefined</code> وخلاص، والـ <code>?.</code> بتبلع ده من غير ولا كلمة. أغلب الباجز هنا مستخبية ورا ده.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'The hash inside the string', ar: 'الشباك جوه النص' }, blocks: [
        { t: 'pair',
          bad:  { name: 'search-panel.ts', lang: 'ts', code: ["readonly customHint = contentChild<ElementRef>('#hint');"] },
          good: { name: 'search-panel.ts', lang: 'ts', code: ["readonly customHint = contentChild<ElementRef>('hint');"] } },
        { t: 'p', en: 'The query looks for a label literally called <code>#hint</code>, which cannot exist. It stays <code>undefined</code> forever and nothing complains.',
                  ar: 'الـ query بتدوّر على علامة اسمها حرفيًا <code>#hint</code>، ودي مستحيل تبقى موجودة. بتفضل <code>undefined</code> على طول ومحدش بيشتكي.' }
      ]},
      { t: 'step', n: '2', title: { en: '<code>viewChild</code> for projected content', ar: '<code>viewChild</code> لمحتوى متسقط' }, blocks: [
        { t: 'pair',
          bad:  { name: 'search-panel.ts', lang: 'ts', code: ["readonly customHint = viewChild<ElementRef>('hint');"] },
          good: { name: 'search-panel.ts', lang: 'ts', code: ["readonly customHint = contentChild<ElementRef>('hint');"] } },
        { t: 'p', en: 'The <code>#hint</code> is written in the page’s file, not in the panel’s template. <code>viewChild</code> only searches the panel’s own template, so it finds nothing.',
                  ar: 'الـ <code>#hint</code> مكتوب في ملف الصفحة، مش في تمبلت الـ panel. و<code>viewChild</code> بتدوّر في تمبلت الـ panel نفسه بس، فمش بتلاقي حاجة.' }
      ]},
      { t: 'step', n: '3', title: { en: 'Reading the query without calling it', ar: 'قراية الـ query من غير ما تناديها' }, blocks: [
        { t: 'pair',
          bad:  { name: 'search-panel.ts', lang: 'ts', code: ['this.searchBox.nativeElement.focus();'] },
          good: { name: 'search-panel.ts', lang: 'ts', code: ['this.searchBox().nativeElement.focus();'] } },
        { t: 'p', en: 'This one is a compile error, but a confusing one: <code>nativeElement</code> “does not exist on type Signal”. The query is a signal; call it to get what it found.',
                  ar: 'دي compile error، بس ملخبط: <code>nativeElement</code> «does not exist on type Signal». الـ query دي signal؛ ناديها عشان تاخد اللي لقته.' }
      ]},
      { t: 'step', n: '4', title: { en: 'A label on a component tag, typed as an element', ar: 'علامة على تاج component، ونوعها عنصر' }, blocks: [
        { t: 'pair',
          bad:  { name: 'search-panel.ts', lang: 'ts', code: ["readonly listEl = viewChild<ElementRef>('results');   // <app-result-list #results>"] },
          good: { name: 'search-panel.ts', lang: 'ts', code: ["readonly listEl = viewChild('results', { read: ElementRef });"] } },
        { t: 'p', en: 'On a component tag, a label gives you the <b>component instance</b> by default. The type in the angle brackets only tells TypeScript what to believe, so <code>.nativeElement</code> compiles and then is <code>undefined</code> at runtime. <code>read: ElementRef</code> asks for the element for real.',
                  ar: 'على تاج component، العلامة بتديك الـ <b>instance بتاع الـ component</b> افتراضيًا. والنوع اللي بين الأقواس المتلّتة بيقول لـ TypeScript يصدّق إيه وبس، فـ <code>.nativeElement</code> بتعدّي في الـ compile وبعدين تطلع <code>undefined</code> وقت التشغيل. و<code>read: ElementRef</code> بتطلب العنصر بجد.' }
      ]},
      { t: 'step', n: '5', title: { en: 'The element is inside a false <code>@if</code>', ar: 'العنصر جوه <code>@if</code> قيمتها false' }, blocks: [
        { t: 'p', en: 'An element that is not rendered right now does not exist, so the query has nothing to find. With an optional query that is <code>undefined</code>; with <code>.required</code> it throws when read. Use <code>.required</code> only for elements that are always in the template.',
                  ar: 'العنصر اللي مش مترسوم دلوقتي مش موجود، فالـ query مالهاش حاجة تلاقيها. مع query اختيارية ده <code>undefined</code>؛ ومع <code>.required</code> بترمي error لما تتقري. استخدم <code>.required</code> بس للعناصر اللي دايمًا موجودة في التمبلت.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it does nothing', ar: 'لما مايعملش حاجة' },
    title: { en: 'Five questions, in this order', ar: 'خمس أسئلة، بالترتيب ده' },
    lead: {
      en: 'Your query is <code>undefined</code>, or throws. Ask these first.',
      ar: 'الـ query بتاعتك <code>undefined</code>، أو بترمي error. اسأل دول الأول.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Is the string exactly the label without <code>#</code>, same capitals?',
                  ar: '<b>1.</b> النص هو العلامة بالظبط من غير <code>#</code>، وبنفس الحروف الكبيرة؟' },
      { t: 'chk', en: '<b>2.</b> In whose file is the label written? Mine → <code>viewChild</code>. The parent’s, between my tags → <code>contentChild</code>. A child’s own template → no query can reach it.',
                  ar: '<b>2.</b> العلامة مكتوبة في ملف مين؟ ملفي → <code>viewChild</code>. ملف الأب، بين التاجات بتاعتي → <code>contentChild</code>. تمبلت ابن → مفيش query توصلها.' },
      { t: 'chk', en: '<b>3.</b> Is the element rendered right now, or inside a false <code>@if</code>?',
                  ar: '<b>3.</b> العنصر مترسوم دلوقتي، ولا جوه <code>@if</code> قيمتها false؟' },
      { t: 'chk', en: '<b>4.</b> Are you calling the signal, <code>this.searchBox()</code>, and reading it after render, in <code>afterNextRender</code> or an event handler, not directly in the constructor?',
                  ar: '<b>4.</b> انت بتنادي الـ signal، <code>this.searchBox()</code>، وبتقراها بعد الرسم، في <code>afterNextRender</code> أو event handler، مش في الـ constructor على طول؟' },
      { t: 'chk', en: '<b>5.</b> Is the label on a component tag? Then you get the component; add <code>read: ElementRef</code> if you wanted the element.',
                  ar: '<b>5.</b> العلامة على تاج component؟ يبقى هتاخد الـ component؛ زوّد <code>read: ElementRef</code> لو كنت عايز العنصر.' }
    ]
  }
  ]
};
