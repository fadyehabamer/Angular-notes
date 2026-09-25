/* ==================================================================
   Content projection, name by name — the companion page after the
   <ng-content> topic. One running example (a collapsible panel used by
   a settings page) followed through every file, every name coloured by
   who owns it. Names list: inline, below.
   ================================================================== */

/* a name in running text, coloured like the code and linked on hover */
const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

export default {
  topic: 'content-projection',
  tab: 'ng-content, name by name — The Angular Signal',
  title: { en: '<code>&lt;ng-content&gt;</code>, name by name', ar: '<code>&lt;ng-content&gt;</code>، اسم اسم' },
  say: {
    en: 'The page for when you cannot tell whose button it is anymore. One panel and one settings page, every name coloured by who owns it: the slot names both sides must agree on, and the markup that stays the parent’s even inside the panel. Then what breaks when you rename each one.',
    ar: 'الصفحة دي لما متبقاش عارف الزرار ده بتاع مين. panel واحد وصفحة إعدادات واحدة، وكل اسم ملوّن حسب صاحبه: أسماء الـ slots اللي الناحيتين لازم يتفقوا عليها، والـ markup اللي بيفضل بتاع الأب حتى وهو جوه الـ panel. وبعدين إيه اللي بيبوظ لما تغيّر كل واحد.'
  },
  lead: {
    en: 'The idea is simple: <b>the panel leaves holes, the parent fills them.</b> The confusing part is the names. The button sits inside the panel on screen, yet it calls the <b>parent’s</b> method. The word <code>actions</code> appears in two components and neither one owns it alone. And nothing tells you when the two sides stop matching. This page sorts out every name.',
    ar: 'الفكرة بسيطة: <b>الـ panel بيسيب فتحات، والأب بيملاها.</b> اللي بيلخبط هو الأسماء. الزرار قاعد جوه الـ panel على الشاشة، ومع ذلك بينادي ميثود <b>الأب</b>. وكلمة <code>actions</code> موجودة في اتنين components ومحدش فيهم صاحبها لوحده. ومفيش حاجة بتقولك لما الناحيتين يبطلوا يطابقوا. الصفحة دي بتفرز كل اسم.'
  },

  names: {
    note: {
      en: 'Read the orange rows first. <code>slot</code> and <code>actions</code> are words you invented, and the panel’s <code>select</code> and the parent’s markup must spell them the same. Nothing checks that. Everything the parent writes between the tags, like <code>reset()</code>, stays the parent’s own.',
      ar: 'اقرا الصفوف البرتقاني الأول. <code>slot</code> و<code>actions</code> كلمات انت اخترعتها، والـ <code>select</code> بتاع الـ panel والـ markup بتاع الأب لازم يكتبوهم زي بعض. ومحدش بيراجع ده. وكل حاجة الأب بيكتبها بين التاجات، زي <code>reset()</code>، بتفضل بتاعة الأب.'
    },
    names: [
      /* --- shared: two files must agree --- */
      { n:'slot', k:'pub',
        w:{ en:'The attribute name you chose to label slots. The panel’s <code>select="[slot=…]"</code> and the parent’s <code>slot="…"</code> must agree.',
            ar:'اسم الـ attribute اللي اخترته عشان تعلّم بيه الـ slots. الـ <code>select="[slot=…]"</code> بتاع الـ panel والـ <code>slot="…"</code> بتاع الأب لازم يتفقوا.' } },
      { n:'actions', k:'pub', re:'(?<=slot="?)actions(?![\\w$-])',
        w:{ en:'A slot name. The panel selects it, the settings page labels its button with it. A mismatch is silent.',
            ar:'اسم slot. الـ panel بيختاره، وصفحة الإعدادات بتعلّم بيه الزرار. عدم التطابق بيعدّي في صمت.' } },
      { n:'heading', k:'pub',
        w:{ en:'The panel’s input. The parent sets it with <code>heading="…"</code>.', ar:'الـ input بتاع الـ panel. الأب بيحطه بـ <code>heading="…"</code>.' } },
      { n:'collapsible', k:'pub',
        w:{ en:'The panel’s input. The parent sets it with <code>[collapsible]</code>.', ar:'الـ input بتاع الـ panel. الأب بيحطه بـ <code>[collapsible]</code>.' } },
      { n:'app-panel', k:'pub',
        w:{ en:'The panel’s selector: the string in the class and the tag in the parent must match.', ar:'الـ selector بتاع الـ panel: النص في الكلاس والتاج عند الأب لازم يطابقوا.' } },
      { n:'Panel', k:'pub',
        w:{ en:'The panel’s class. The settings page imports it by this name.', ar:'كلاس الـ panel. صفحة الإعدادات بتعمله import بالاسم ده.' } },
      { n:'app-settings', k:'pub',
        w:{ en:'The settings page’s selector. Whoever shows it types this tag.', ar:'الـ selector بتاع صفحة الإعدادات. أي حد بيعرضها بيكتب التاج ده.' } },
      { n:'Settings', k:'pub',
        w:{ en:'The settings page’s class.', ar:'كلاس صفحة الإعدادات.' } },
      { n:'panel', k:'pub', re:'(?<=class="|^\\.)panel(?![\\w$-])',
        w:{ en:'A CSS class: the panel’s template and stylesheet must match.', ar:'CSS class: التمبلت والـ stylesheet بتوع الـ panel لازم يطابقوا.' } },
      { n:'body', k:'pub', re:'(?<=class="|^\\.)body(?![\\w$-])',
        w:{ en:'A CSS class: the panel’s template and stylesheet must match.', ar:'CSS class: التمبلت والـ stylesheet بتوع الـ panel لازم يطابقوا.' } },

      /* --- yours, private to one component --- */
      { n:'open', k:'mine',
        w:{ en:'The panel’s own signal, read and set only by the panel.', ar:'الـ signal بتاعة الـ panel نفسه، والـ panel بس اللي بيقراها ويغيّرها.' } },
      { n:'toggle', k:'mine',
        w:{ en:'The panel’s own method, called by the panel’s own button.', ar:'ميثود الـ panel نفسه، وزرار الـ panel هو اللي بيناديها.' } },
      { n:'reset', k:'mine',
        w:{ en:'The settings page’s own method. The Reset button is shown inside the panel, but it is written by, and belongs to, the settings page.',
            ar:'ميثود صفحة الإعدادات نفسها. زرار Reset بيظهر جوه الـ panel، بس اللي كاتبه وصاحبه صفحة الإعدادات.' } },
      { n:'emailOn', k:'mine',
        w:{ en:'The settings page’s own signal.', ar:'الـ signal بتاعة صفحة الإعدادات نفسها.' } },

      /* --- Angular's, the browser's --- */
      { n:'ng-content', k:'ng',
        w:{ en:'Angular’s placeholder tag: “put what the parent wrote between my tags here”.', ar:'تاج أنجولار اللي بيحجز مكان: «حط هنا اللي الأب كتبه بين التاجات بتاعتي».' } },
      { n:'select', k:'ng',
        w:{ en:'The attribute Angular reads on <code>&lt;ng-content&gt;</code>. Its value is a CSS selector with your names in it.',
            ar:'الـ attribute اللي أنجولار بيقراه على <code>&lt;ng-content&gt;</code>. قيمته CSS selector فيه أسماءك.' } },
      { n:'ngProjectAs', k:'ng',
        w:{ en:'Angular’s attribute that says “treat this as if it matched that selector”.', ar:'الـ attribute بتاع أنجولار اللي بيقول «اعتبر ده كأنه طابق الـ selector ده».' } },
      { n:'ng-container', k:'ng', w:{ en:'Angular’s invisible grouping tag.', ar:'تاج أنجولار اللي بيجمّع حاجات من غير ما يبان.' } },
      { n:'*ngIf', k:'ng', w:{ en:'The older “show if” directive. <code>@if</code> replaces it.', ar:'الـ directive القديم لـ «اظهر لو». و<code>@if</code> هو البديل.' } },
      { n:'@if', k:'ng', w:{ en:'Angular’s template control flow.', ar:'الـ control flow بتاع أنجولار في التمبلت.' } },
      { n:'hidden', k:'ng', w:{ en:'The DOM’s own property: hide this element.', ar:'الـ property بتاعة الـ DOM نفسه: خبّي العنصر ده.' } },
      { n:'click', k:'ng', w:{ en:'The browser’s own event name.', ar:'اسم الـ event بتاع المتصفح نفسه.' } },
      { n:'change', k:'ng', w:{ en:'The browser’s own event name.', ar:'اسم الـ event بتاع المتصفح نفسه.' } },
      { n:'checked', k:'ng', w:{ en:'The DOM’s own property on a checkbox.', ar:'الـ property بتاعة الـ DOM في الـ checkbox.' } },
      { n:'input', k:'ng', re:'(?<![\\w$<(-])input(?=[.(<,])',
        w:{ en:'Angular’s function that creates an input. The HTML <code>&lt;input&gt;</code> tag is a different thing.',
            ar:'الـ function بتاعة أنجولار اللي بتعمل input. وتاج <code>&lt;input&gt;</code> بتاع HTML حاجة تانية.' } },
      { n:'required', k:'ng', w:{ en:'Part of <code>input.required</code>.', ar:'جزء من <code>input.required</code>.' } },
      { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
      { n:'set', k:'ng', w:{ en:'A signal method.', ar:'ميثود بتاعة الـ signal.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator for a component.', ar:'الـ decorator بتاع أنجولار للـ component.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The tag name after it is yours.', ar:'مفتاح إعداد. اسم التاج اللي بعده بتاعك.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key: the path to the HTML file.', ar:'مفتاح إعداد: مسار ملف الـ HTML.' } },
      { n:'styleUrl', k:'ng', w:{ en:'An option key: the path to the CSS file.', ar:'مفتاح إعداد: مسار ملف الـ CSS.' } },
      { n:'imports', k:'ng', w:{ en:'An option key: what this template may use.', ar:'مفتاح إعداد: التمبلت ده مسموحله يستخدم إيه.' } },
      { n:':host', k:'ng', w:{ en:'Angular’s selector for the component’s own tag.', ar:'الـ selector بتاع أنجولار لتاج الـ component نفسه.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One Reset button, five stops', ar: 'زرار Reset واحد، خمس محطات' },
    lead: {
      en: 'A settings page shows its notification options inside a reusable panel. The panel draws the border, the heading and the Show/Hide button. The settings page supplies a Reset button for the header and the options for the body. Follow the Reset button:',
      ar: 'صفحة إعدادات بتعرض اختيارات الإشعارات جوه panel بيتستخدم في أكتر من مكان. الـ panel بيرسم البرواز والعنوان وزرار Show/Hide. وصفحة الإعدادات بتدّي زرار Reset للهيدر، والاختيارات للـ body. امشي ورا زرار Reset:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'settings.component.html', lang: 'html', who: { en: 'parent · opens the tag', ar: 'الأب · بيفتح التاج' },
          code: ['<app-panel heading="Notifications" [collapsible]="true">'],
          say: { en: `The settings page writes the panel’s tag. ${pub('heading')} and ${pub('collapsible')} are the panel’s inputs: plain values go in through attributes, like with any component.`,
                 ar: `صفحة الإعدادات بتكتب تاج الـ panel. و${pub('heading')} و${pub('collapsible')} الـ inputs بتوع الـ panel: القيم العادية بتدخل من الـ attributes، زي أي component.` } },
        { file: 'settings.component.html', lang: 'html', who: { en: 'parent · writes the content', ar: 'الأب · بيكتب المحتوى' },
          code: ['  <button slot="actions" (click)="reset()">Reset</button>'],
          say: { en: `<b>Markup</b> goes in between the tags. The parent labels this button <code>slot="actions"</code>. Both words, ${pub('slot')} and ${pub('actions')}, are yours; Angular gives them no meaning. ${mine('reset')} is the settings page’s own method.`,
                 ar: `الـ <b>markup</b> بيدخل بين التاجات. الأب بيعلّم الزرار ده بـ <code>slot="actions"</code>. الكلمتين، ${pub('slot')} و${pub('actions')}، بتوعك؛ أنجولار مش بيديهم أي معنى. و${mine('reset')} ميثود صفحة الإعدادات نفسها.` } },
        { file: 'panel.component.html', lang: 'html', who: { en: 'panel · named slot', ar: 'الـ panel · slot متسمّي' },
          code: ['    <ng-content select="[slot=actions]" />'],
          say: { en: `The panel leaves a hole in its header. ${ng('ng-content')} and ${ng('select')} are Angular’s. The value is a CSS selector: “children that have ${pub('slot')} equal to ${pub('actions')}”. It must match the parent letter for letter.`,
                 ar: `الـ panel بيسيب فتحة في الهيدر بتاعه. ${ng('ng-content')} و${ng('select')} بتوع أنجولار. والقيمة CSS selector: «الأبناء اللي عليهم ${pub('slot')} بيساوي ${pub('actions')}». لازم تطابق الأب حرف حرف.` } },
        { file: 'panel.component.html', lang: 'html', who: { en: 'panel · default slot', ar: 'الـ panel · الـ slot الافتراضي' },
          code: ['  <div class="body" [hidden]="!open()">', '    <ng-content />', '  </div>'],
          say: { en: `A bare ${ng('ng-content')} takes everything the named slots did not claim: the paragraph and the checkbox. ${mine('open')} is the panel’s own signal; the settings page never sees it.`,
                 ar: `${ng('ng-content')} من غير select بياخد كل اللي الـ slots المتسمّية ماخدتهوش: الفقرة والـ checkbox. و${mine('open')} الـ signal بتاعة الـ panel نفسه؛ صفحة الإعدادات عمرها ما بتشوفها.` } },
        { file: 'settings.component.ts', lang: 'ts', who: { en: 'parent · the click lands here', ar: 'الأب · الكليك بيوصل هنا' },
          code: ['reset() {', '  this.emailOn.set(true);', '}'],
          say: { en: `The user clicks Reset inside the panel’s header, and <b>the settings page’s</b> ${mine('reset')} runs. The panel only moved the button; it did not adopt it. That is why the panel can be reused by any page.`,
                 ar: `المستخدم بيدوس Reset جوه هيدر الـ panel، والـ ${mine('reset')} بتاعة <b>صفحة الإعدادات</b> هي اللي بتشتغل. الـ panel نقل الزرار بس؛ ماتبنّاهوش. وعشان كده الـ panel ينفع يتستخدم في أي صفحة.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'Parent: <code>slot="actions"</code>. Panel: <code>select="[slot=actions]"</code>. That pair is the only name projection makes the two components share. Everything written between the tags keeps belonging to the parent.',
        ar: 'الأب: <code>slot="actions"</code>. الـ panel: <code>select="[slot=actions]"</code>. الاتنين دول هما الاسم الوحيد اللي الـ projection بيخلي الاتنين components يتشاركوا فيه. وكل حاجة مكتوبة بين التاجات بتفضل بتاعة الأب.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Panel or parent?', ar: 'الـ panel ولا الأب؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'On screen the button is inside the panel. In the code it is in the parent’s file. The file decides, not the screen.',
      ar: 'على الشاشة الزرار جوه الـ panel. في الكود هو في ملف الأب. الملف هو اللي بيقرر، مش الشاشة.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>&lt;ng-content select="[slot=actions]" /&gt;</code>', 'panel <code>.html</code>', 'the panel', `${ng('ng-content')}, ${ng('select')} are Angular’s; you pick ${pub('slot')} and ${pub('actions')}`],
            ar: ['<code>&lt;ng-content select="[slot=actions]" /&gt;</code>', '<code>.html</code> الـ panel', 'الـ panel', `${ng('ng-content')} و${ng('select')} بتوع أنجولار؛ وانت بتختار ${pub('slot')} و${pub('actions')}`] },
          { en: ['<code>&lt;ng-content /&gt;</code>', 'panel <code>.html</code>', 'the panel', 'nothing to name'],
            ar: ['<code>&lt;ng-content /&gt;</code>', '<code>.html</code> الـ panel', 'الـ panel', 'مفيش حاجة تتسمّى'] },
          { en: ['<code>heading = input.required…</code>', 'panel <code>.ts</code>', 'the panel', `you pick ${pub('heading')}`],
            ar: ['<code>heading = input.required…</code>', '<code>.ts</code> الـ panel', 'الـ panel', `انت بتختار ${pub('heading')}`] },
          { en: ['<code>&lt;app-panel heading="…"&gt;</code>', 'settings <code>.html</code>', 'the parent', `copies ${pub('app-panel')} and ${pub('heading')}`],
            ar: ['<code>&lt;app-panel heading="…"&gt;</code>', '<code>.html</code> الإعدادات', 'الأب', `بينسخ ${pub('app-panel')} و${pub('heading')}`] },
          { en: ['<code>&lt;button slot="actions" (click)="reset()"&gt;</code>', 'settings <code>.html</code>', 'the parent', `copies ${pub('slot')}, ${pub('actions')}; you pick ${mine('reset')}`],
            ar: ['<code>&lt;button slot="actions" (click)="reset()"&gt;</code>', '<code>.html</code> الإعدادات', 'الأب', `بينسخ ${pub('slot')} و${pub('actions')}؛ وانت بتختار ${mine('reset')}`] },
          { en: ['<code>reset() { … }</code>', 'settings <code>.ts</code>', 'the parent', `you pick ${mine('reset')}`],
            ar: ['<code>reset() { … }</code>', '<code>.ts</code> الإعدادات', 'الأب', `انت بتختار ${mine('reset')}`] },
        ] },
      { t: 'ul',
        en: ['<b>Whoever writes the markup owns it.</b> Its bindings, its <code>(click)</code> handlers and its CSS all belong to the component whose file it is written in, even when it shows up inside another component.',
             '<b>Inputs carry values, projection carries markup.</b> A string heading goes through an input. A button, a paragraph or a whole form goes between the tags.',
             '<b>The panel never names the parent’s things.</b> It only knows its own slot names. That is what lets the settings page, the profile page and the billing page all reuse it.'],
        ar: ['<b>اللي بيكتب الـ markup هو صاحبه.</b> الـ bindings والـ <code>(click)</code> والـ CSS بتوعه كلهم بتوع الـ component اللي اتكتب في ملفه، حتى لو ظهر جوه component تاني.',
             '<b>الـ inputs بتشيل قيم، والـ projection بيشيل markup.</b> عنوان نصي بيعدّي من input. زرار أو فقرة أو فورم كامل بيدخلوا بين التاجات.',
             '<b>الـ panel عمره ما بيسمّي حاجات الأب.</b> هو يعرف أسماء الـ slots بتاعته بس. وده اللي بيخلي صفحة الإعدادات وصفحة البروفايل وصفحة الفواتير يستخدموه كلهم.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All five files, every name coloured', ar: 'الخمس ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same panel and settings page, complete. Hover a coloured name to light up everywhere else it appears. Then press <b>Rename test</b>: every name you own turns into a made-up word, including the slot names on both sides, and it still works.',
      ar: 'نفس الـ panel وصفحة الإعدادات، كاملين. قف بالماوس على أي اسم ملوّن وهتنوّر كل الأماكن التانية اللي هو فيها. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: كل اسم بتاعك هيبقى كلمة عشوائية، ومنهم أسماء الـ slots في الناحيتين، والكود لسه شغال.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'panel.component.ts', lang: 'ts', tag: { en: 'the wrapper', ar: 'الغلاف' }, code: [
        "import { Component, input, signal } from '@angular/core';",
        '',
        '@Component({',
        "  selector: 'app-panel',",
        "  templateUrl: './panel.component.html',",
        "  styleUrl: './panel.component.css',",
        '})',
        'export class Panel {',
        '  readonly heading = input.required<string>();',
        '  readonly collapsible = input(false);',
        '  readonly open = signal(true);',
        '',
        '  toggle() {',
        '    this.open.set(!this.open());',
        '  }',
        '}' ] },
      { t: 'code', name: 'panel.component.html', lang: 'html', tag: { en: 'the holes', ar: 'الفتحات' }, code: [
        '<section class="panel">',
        '  <header>',
        '    <h2>{{ heading() }}</h2>',
        '    <ng-content select="[slot=actions]" />',
        '    @if (collapsible()) {',
        '      <button (click)="toggle()">{{ open() ? \'Hide\' : \'Show\' }}</button>',
        '    }',
        '  </header>',
        '',
        '  <div class="body" [hidden]="!open()">',
        '    <ng-content />',
        '  </div>',
        '</section>' ] },
      { t: 'code', name: 'panel.component.css', lang: 'css', tag: { en: 'the chrome', ar: 'الإطار' }, code: [
        ':host { display: block; }',
        '.panel { border: 1px solid #ddd; border-radius: 8px; }',
        'header { display: flex; align-items: center; gap: 8px; padding: 8px 12px; }',
        'h2 { flex: 1; margin: 0; font-size: 16px; }',
        '.body { padding: 12px; color: #444; }' ] },
      { t: 'code', name: 'settings.component.ts', lang: 'ts', tag: { en: 'the parent', ar: 'الأب' }, code: [
        "import { Component, signal } from '@angular/core';",
        "import { Panel } from './panel.component';",
        '',
        '@Component({',
        "  selector: 'app-settings',",
        '  imports: [Panel],',
        "  templateUrl: './settings.component.html',",
        '})',
        'export class Settings {',
        '  readonly emailOn = signal(true);',
        '',
        '  reset() {',
        '    this.emailOn.set(true);',
        '  }',
        '}' ] },
      { t: 'code', name: 'settings.component.html', lang: 'html', tag: { en: 'the parent fills the holes', ar: 'الأب بيملا الفتحات' }, code: [
        '<app-panel heading="Notifications" [collapsible]="true">',
        '  <button slot="actions" (click)="reset()">Reset</button>',
        '',
        '  <p>Choose how you would like to hear from us.</p>',
        '  <label>',
        '    <input type="checkbox" [checked]="emailOn()" (change)="emailOn.set(!emailOn())">',
        '    Email me',
        '  </label>',
        '</app-panel>' ] },
      { t: 'nmtable' }
    ]
  },

  /* ------------------------------------------------------------ 4 */
  {
    id: 'rename',
    kicker: { en: 'Is it OK to change it?', ar: 'ينفع أغيّره؟' },
    title: { en: 'What breaks when you rename each name', ar: 'إيه اللي بيبوظ لما تغيّر كل اسم' },
    lead: {
      en: 'Every name you own can be renamed. Inputs, selectors and methods give compile errors when you forget a side. <b>Slot names never do</b>, because a CSS selector that matches nothing is still a valid selector.',
      ar: 'أي اسم بتاعك ينفع يتغير. الـ inputs والـ selectors والميثودز بيدوا compile errors لما تنسى ناحية. <b>أسماء الـ slots عمرها ما بتدي</b>، عشان CSS selector مش بيطابق حاجة لسه selector سليم.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [`${pub('actions')} or ${pub('slot')}`, 'the other side: the panel’s <code>select</code> or the parent’s attribute', '<b>No error.</b> The button stops matching the named slot and falls into the default <code>&lt;ng-content /&gt;</code>: it shows up in the body instead of the header.'],
            ar: [`${pub('actions')} أو ${pub('slot')}`, 'الناحية التانية: الـ <code>select</code> بتاع الـ panel أو الـ attribute بتاع الأب', '<b>مفيش error.</b> الزرار بيبطل يطابق الـ slot المتسمّي وبيقع في الـ <code>&lt;ng-content /&gt;</code> الافتراضي: بيظهر في الـ body بدل الهيدر.'] },
          { en: [pub('heading') + ' (input)', 'the parent’s <code>heading="…"</code>', 'Compile error here, but only because the input is <b>required</b>. A plain attribute that matches no input is allowed, so an optional input would silently keep its default.'],
            ar: [pub('heading') + ' (input)', 'الـ <code>heading="…"</code> بتاع الأب', 'Compile error هنا، بس عشان الـ input <b>required</b>. الـ attribute العادي اللي مش مطابق لأي input مسموح بيه، فلو الـ input اختياري كان هيفضل على الـ default بتاعه في صمت.'] },
          { en: [pub('collapsible') + ' (input)', 'the parent’s <code>[collapsible]</code>', 'Compile error: “Can’t bind to ‘collapsible’…”, because it uses <code>[ ]</code>.'],
            ar: [pub('collapsible') + ' (input)', 'الـ <code>[collapsible]</code> بتاع الأب', 'Compile error: «Can’t bind to ‘collapsible’…»، عشان مستخدم <code>[ ]</code>.'] },
          { en: [`${pub('app-panel')}, ${pub('Panel')}`, 'the parent’s tag, its <code>import</code> and <code>imports</code>', 'Compile error.'],
            ar: [`${pub('app-panel')} و${pub('Panel')}`, 'التاج عند الأب، والـ <code>import</code> و<code>imports</code>', 'Compile error.'] },
          { en: [`${mine('reset')}, ${mine('emailOn')}`, 'the settings template only', 'Compile error in the settings template. The panel is not involved at all.'],
            ar: [`${mine('reset')} و${mine('emailOn')}`, 'تمبلت الإعدادات بس', 'Compile error في تمبلت الإعدادات. الـ panel مالوش دعوة خالص.'] },
          { en: [`${mine('open')}, ${mine('toggle')}`, 'the panel template only', 'Compile error in the panel template.'],
            ar: [`${mine('open')} و${mine('toggle')}`, 'تمبلت الـ panel بس', 'Compile error في تمبلت الـ panel.'] },
          { en: [`${pub('panel')}, ${pub('body')} (CSS classes)`, 'the panel’s stylesheet', '<b>No error.</b> The style just disappears.'],
            ar: [`${pub('panel')} و${pub('body')} (CSS classes)`, 'الـ stylesheet بتاع الـ panel', '<b>مفيش error.</b> الستايل بيختفي وخلاص.'] },
          { en: [`${ng('ng-content')}, ${ng('select')}`, 'nothing: you cannot rename these', 'They are Angular’s words.'],
            ar: [`${ng('ng-content')} و${ng('select')}`, 'ولا حاجة: دول مينفعش يتغيروا', 'دي كلمات أنجولار.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b> above the files and watch <code>slot</code> and <code>actions</code>: they change inside the panel’s <code>select</code> and on the parent’s button at the same time. That pair is the one you must never rename on one side only.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b> فوق الملفات وبص على <code>slot</code> و<code>actions</code>: بيتغيروا جوه الـ <code>select</code> بتاع الـ panel وعلى زرار الأب في نفس الوقت. الاتنين دول هما اللي أوعى تغيّرهم في ناحية واحدة بس.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتاعتك' },
    title: { en: 'The fixed names', ar: 'الأسماء الثابتة' },
    lead: {
      en: 'Only a handful of words here are Angular’s. Everything inside the quotes of <code>select</code> is CSS selector syntax with your names in it.',
      ar: 'كام كلمة بس هنا بتاعة أنجولار. كل اللي جوه علامات تنصيص الـ <code>select</code> كتابة CSS selector فيها أسماءك.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Word', 'Owner', 'What it does'], ar: ['الكلمة', 'صاحبها', 'بتعمل إيه'] },
        rows: [
          { en: [ng('ng-content'), 'Angular', 'A placeholder. It never appears in the page; the projected nodes do.'],
            ar: [ng('ng-content'), 'أنجولار', 'حاجز مكان. عمره ما بيظهر في الصفحة؛ اللي بيظهر هو المحتوى اللي اتحط مكانه.'] },
          { en: [ng('select'), 'Angular', 'Which children go into this hole. Without it: everything left over.'],
            ar: [ng('select'), 'أنجولار', 'أنهي أبناء يروحوا للفتحة دي. من غيره: كل اللي فاضل.'] },
          { en: [ng('ngProjectAs'), 'Angular', 'Lets a wrapper, usually an <code>&lt;ng-container&gt;</code>, claim a slot as if it matched the selector.'],
            ar: [ng('ngProjectAs'), 'أنجولار', 'بيخلّي غلاف، غالبًا <code>&lt;ng-container&gt;</code>، ياخد slot كأنه طابق الـ selector.'] },
          { en: [ng('ng-container'), 'Angular', 'Groups nodes without adding an element to the page.'],
            ar: [ng('ng-container'), 'أنجولار', 'بيجمّع حاجات من غير ما يضيف عنصر للصفحة.'] },
          { en: ['<code>[ ]</code>, <code>=</code>, <code>.</code> inside <code>select</code>', 'CSS', 'Attribute, attribute value, class. Plain CSS selector syntax.'],
            ar: ['<code>[ ]</code> و<code>=</code> و<code>.</code> جوه <code>select</code>', 'CSS', 'attribute، وقيمة attribute، وclass. كتابة CSS selector عادية.'] },
          { en: [`${ng('click')}, ${ng('change')}, ${ng('checked')}, ${ng('hidden')}`, 'the browser', 'Real DOM events and properties.'],
            ar: [`${ng('click')} و${ng('change')} و${ng('checked')} و${ng('hidden')}`, 'المتصفح', 'events وproperties حقيقية بتاعة الـ DOM.'] },
        ] },
      { t: 'p',
        en: 'One thing that looks fixed but is not: <code>slot</code>. It happens to also be a real HTML attribute, used by Web Components with Shadow DOM, but here it is just a word this code chose. Any attribute name would work the same.',
        ar: 'حاجة واحدة شكلها ثابتة وهي مش كده: <code>slot</code>. هي صدفة كمان attribute حقيقي في HTML، بتستخدمه الـ Web Components مع الـ Shadow DOM، بس هنا هي مجرد كلمة الكود ده اختارها. أي اسم attribute تاني كان هيشتغل بنفس الطريقة.' }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'Slot names are a small public API. Pick them like you pick input names.',
      ar: 'أسماء الـ slots API صغير برّه. اختارها زي ما بتختار أسماء الـ inputs.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['a slot', 'where it goes: <code>actions</code>, <code>footer</code>, <code>title</code>', 'what is in it: <code>resetButton</code>', 'The panel does not know what the parent will put there. Name the place, not the content.'],
            ar: ['الـ slot', 'مكانه فين: <code>actions</code>، <code>footer</code>، <code>title</code>', 'فيه إيه: <code>resetButton</code>', 'الـ panel ميعرفش الأب هيحط إيه هناك. سمّي المكان، مش المحتوى.'] },
          { en: ['the slot marker', 'one convention for the whole library, e.g. always <code>slot="…"</code>', 'a CSS class: <code>select=".actions"</code>', 'A class used for styling can be renamed by someone cleaning up CSS, and the slot silently breaks.'],
            ar: ['علامة الـ slot', 'طريقة واحدة للمكتبة كلها، مثلًا دايمًا <code>slot="…"</code>', 'CSS class: <code>select=".actions"</code>', 'الـ class اللي بتتستخدم للستايل ممكن حد يغيّرها وهو بيروّق الـ CSS، والـ slot يبوظ في صمت.'] },
          { en: ['an input', '<code>heading</code>', '<code>title</code>', 'A static <code>title="…"</code> on the tag is also a real HTML attribute, so the browser can show it as a hover tooltip on the whole panel.'],
            ar: ['الـ input', '<code>heading</code>', '<code>title</code>', '<code>title="…"</code> ثابت على التاج هو كمان attribute حقيقي في HTML، فالمتصفح ممكن يعرضه كـ tooltip لما تقف على الـ panel كله.'] },
          { en: ['the wrapper', 'what it draws: <code>Panel</code>, <code>Card</code>, <code>Modal</code>', 'what it is used for: <code>SettingsBox</code>', 'It is meant for many pages. A page-specific name stops others from reusing it.'],
            ar: ['الغلاف', 'بيرسم إيه: <code>Panel</code>، <code>Card</code>، <code>Modal</code>', 'بيتستخدم في إيه: <code>SettingsBox</code>', 'هو معمول لصفحات كتير. الاسم الخاص بصفحة بيخلّي الباقيين مايستخدموهوش.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Where the name is not free', ar: 'فين الاسم مش براحتك' },
    lead: {
      en: 'Slot names are yours, but CSS and Angular decide how they are matched and whose names projected markup may use.',
      ar: 'أسماء الـ slots بتاعتك، بس الـ CSS وأنجولار بيقرروا بتتطابق إزاي، والـ markup المتسقط يستخدم أسماء مين.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: '<code>select</code> speaks CSS', ar: '<code>select</code> بيتكلم CSS' }, blocks: [
        { t: 'tbl',
          head: { en: ['The panel writes', 'The parent must write'], ar: ['الـ panel بيكتب', 'الأب لازم يكتب'] },
          rows: [
            { en: ['<code>select="[slot=actions]"</code>', '<code>slot="actions"</code>'], ar: ['<code>select="[slot=actions]"</code>', '<code>slot="actions"</code>'] },
            { en: ['<code>select="[panelActions]"</code>', 'the bare attribute <code>panelActions</code>'], ar: ['<code>select="[panelActions]"</code>', 'الـ attribute لوحده <code>panelActions</code>'] },
            { en: ['<code>select="h2"</code>', 'an <code>&lt;h2&gt;</code> element'], ar: ['<code>select="h2"</code>', 'عنصر <code>&lt;h2&gt;</code>'] },
          ] },
        { t: 'p',
          en: 'A made-up element like <code>select="panel-title"</code> also works on the panel side, but the parent then writes <code>&lt;panel-title&gt;</code>, which Angular rejects as an unknown element unless it is a real component or you allow custom elements. Attributes avoid that.',
          ar: 'عنصر متألف زي <code>select="panel-title"</code> بيشتغل برضه في ناحية الـ panel، بس الأب ساعتها بيكتب <code>&lt;panel-title&gt;</code>، وأنجولار بيرفضه كعنصر مش معروف إلا لو هو component حقيقي أو انت سامح بالـ custom elements. الـ attributes بتبعدك عن ده.' }
      ]},
      { t: 'step', n: 'B', title: { en: 'Only direct children are matched', ar: 'الأبناء المباشرين بس هما اللي بيتطابقوا' }, blocks: [
        { t: 'p',
          en: `The attribute must sit on an element written <b>directly</b> between <code>&lt;app-panel&gt;</code> and <code>&lt;/app-panel&gt;</code>. If you need a wrapper that should not render, ${ng('ngProjectAs')} tells Angular which slot it is aiming for:`,
          ar: `الـ attribute لازم يبقى على عنصر مكتوب <b>على طول</b> بين <code>&lt;app-panel&gt;</code> و<code>&lt;/app-panel&gt;</code>. ولو محتاج غلاف مش المفروض يترسم، ${ng('ngProjectAs')} بيقول لأنجولار هو رايح لأنهي slot:` },
        { t: 'code', name: 'settings.component.html · wrapper', lang: 'html', tag: { en: 'two buttons, one slot', ar: 'زرارين، slot واحد' }, code: [
          '<ng-container ngProjectAs="[slot=actions]">',
          '  <button (click)="reset()">Reset</button>',
          '  <button (click)="emailOn.set(false)">Mute</button>',
          '</ng-container>' ] }
      ]},
      { t: 'step', n: 'C', title: { en: 'Projected markup uses the parent’s names', ar: 'الـ markup المتسقط بيستخدم أسماء الأب' }, blocks: [
        { t: 'p',
          en: `Inside <code>&lt;app-panel&gt; … &lt;/app-panel&gt;</code> you are still in the settings template. ${mine('reset')} and ${mine('emailOn')} work there; the panel’s ${mine('toggle')} and ${mine('open')} do not. The file you write in decides which names you may use.`,
          ar: `جوه <code>&lt;app-panel&gt; … &lt;/app-panel&gt;</code> انت لسه في تمبلت الإعدادات. ${mine('reset')} و${mine('emailOn')} شغالين هناك؛ لكن ${mine('toggle')} و${mine('open')} بتوع الـ panel لأ. الملف اللي بتكتب فيه هو اللي بيقرر تستخدم أنهي أسماء.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: 'Older templates, same slot names', ar: 'تمبلتس أقدم، نفس أسماء الـ slots' },
    lead: {
      en: 'Content projection itself has not changed. Older templates just write a closing tag and use <code>*ngIf</code> around the rest. The slot names and the matching rules are identical.',
      ar: 'الـ content projection نفسه ماتغيرش. التمبلتس الأقدم بس بتكتب تاج قفل وبتستخدم <code>*ngIf</code> حوالين الباقي. أسماء الـ slots وقواعد المطابقة زي ما هي بالظبط.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'panel.component.html — older style', lang: 'html', code: [
          '<header>',
          '  <h2>{{ heading() }}</h2>',
          '  <ng-content select="[slot=actions]"></ng-content>',
          '  <button *ngIf="collapsible()" (click)="toggle()">…</button>',
          '</header>' ] },
        good: { name: 'panel.component.html — today', lang: 'html', code: [
          '<header>',
          '  <h2>{{ heading() }}</h2>',
          '  <ng-content select="[slot=actions]" />',
          '  @if (collapsible()) { <button (click)="toggle()">…</button> }',
          '</header>' ] } }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, and says nothing', ar: 'مش بيعمل حاجة، ومش بيقول حاجة' },
    title: { en: 'Mistakes that fail silently, or confusingly', ar: 'غلطات بتفشل في صمت، أو بشكل ملخبط' },
    lead: {
      en: 'Projection never complains about content that matches no slot. It puts it in the default slot, or, if there is none, leaves it out.',
      ar: 'الـ projection عمره ما بيشتكي من محتوى مش مطابق لأي slot. بيحطه في الـ slot الافتراضي، ولو مفيش، بيسيبه برّه.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'A typo in the slot name', ar: 'غلطة إملائية في اسم الـ slot' }, blocks: [
        { t: 'pair',
          bad:  { name: 'settings.component.html', lang: 'html', code: ['<button slot="action" (click)="reset()">Reset</button>'] },
          good: { name: 'settings.component.html', lang: 'html', code: ['<button slot="actions" (click)="reset()">Reset</button>'] } },
        { t: 'p', en: 'The panel asks for <code>actions</code>, the button says <code>action</code>. No error: the button appears in the body, under the text, and you go looking for a CSS bug that is not there.',
                  ar: 'الـ panel بيطلب <code>actions</code>، والزرار بيقول <code>action</code>. مفيش error: الزرار بيظهر في الـ body، تحت الكلام، وانت تقعد تدوّر على مشكلة CSS مش موجودة.' }
      ]},
      { t: 'step', n: '2', title: { en: 'The attribute on a wrapped element', ar: 'الـ attribute على عنصر ملفوف' }, blocks: [
        { t: 'pair',
          bad:  { name: 'settings.component.html', lang: 'html', code: ['<div class="tools">', '  <button slot="actions" (click)="reset()">Reset</button>', '</div>'] },
          good: { name: 'settings.component.html', lang: 'html', code: ['<div class="tools" slot="actions">', '  <button (click)="reset()">Reset</button>', '</div>'] } },
        { t: 'p', en: 'Only the direct child, the <code>div</code>, is checked against <code>select</code>. The attribute on the button inside is never seen. Put it on the outermost element.',
                  ar: 'الابن المباشر بس، الـ <code>div</code>، هو اللي بيتقارن بالـ <code>select</code>. الـ attribute اللي على الزرار اللي جواه عمره ما بيتشاف. حطه على العنصر اللي برّه خالص.' }
      ]},
      { t: 'step', n: '3', title: { en: 'Calling the panel’s method from projected markup', ar: 'إنك تنادي ميثود الـ panel من الـ markup المتسقط' }, blocks: [
        { t: 'pair',
          bad:  { name: 'settings.component.html', lang: 'html', code: ['<button slot="actions" (click)="toggle()">Hide</button>'] },
          good: { name: 'settings.component.html', lang: 'html', code: ['<button slot="actions" (click)="reset()">Reset</button>'] } },
        { t: 'p', en: 'This gives an error, but a confusing one: <code>toggle</code> “does not exist on type Settings”. You are in the settings file, so only the settings page’s names exist. If the parent must control the panel, give the panel an input.',
                  ar: 'دي بتدي error، بس ملخبط: <code>toggle</code> «does not exist on type Settings». انت في ملف الإعدادات، فأسماء صفحة الإعدادات بس هي اللي موجودة. لو الأب لازم يتحكم في الـ panel، ادّي الـ panel input.' }
      ]},
      { t: 'step', n: '4', title: { en: 'Styling projected markup from the panel', ar: 'تستايل الـ markup المتسقط من الـ panel' }, blocks: [
        { t: 'pair',
          bad:  { name: 'panel.component.css', lang: 'css', code: ['.body p { color: #444; }'] },
          good: { name: 'panel.component.css', lang: 'css', code: ['.body { color: #444; }'] } },
        { t: 'p', en: 'The <code>p</code> was written in the settings file, so it carries the settings page’s scoping attribute, not the panel’s. The panel’s <code>.body p</code> never matches it. Style the panel’s own <code>.body</code> and let properties like <code>color</code> inherit, or style the paragraph from the settings page.',
                  ar: 'الـ <code>p</code> اتكتب في ملف الإعدادات، فعليه الـ attribute بتاع الـ scoping الخاص بصفحة الإعدادات، مش بتاع الـ panel. فالـ <code>.body p</code> بتاعة الـ panel عمرها ما بتطابقه. استايل الـ <code>.body</code> بتاعة الـ panel نفسه وسيب properties زي <code>color</code> تتورث، أو استايل الفقرة من صفحة الإعدادات.' }
      ]},
      { t: 'step', n: '5', title: { en: 'No default slot', ar: 'مفيش slot افتراضي' }, blocks: [
        { t: 'p', en: 'If the panel only had <code>&lt;ng-content select="[slot=actions]" /&gt;</code> and no bare <code>&lt;ng-content /&gt;</code>, the paragraph and the checkbox would not render at all. No error, just missing content.',
                  ar: 'لو الـ panel فيه <code>&lt;ng-content select="[slot=actions]" /&gt;</code> بس ومفيش <code>&lt;ng-content /&gt;</code> من غير select، الفقرة والـ checkbox مش هيترسموا خالص. مفيش error، المحتوى بس ناقص.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it does nothing', ar: 'لما مايعملش حاجة' },
    title: { en: 'Five questions, in this order', ar: 'خمس أسئلة، بالترتيب ده' },
    lead: {
      en: 'Your content is in the wrong place, or missing. Ask these first.',
      ar: 'المحتوى بتاعك في المكان الغلط، أو ناقص. اسأل دول الأول.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Does the attribute name and value on the parent’s element match the <code>select</code> exactly, letter for letter?',
                  ar: '<b>1.</b> اسم الـ attribute وقيمته على عنصر الأب مطابقين الـ <code>select</code> بالظبط، حرف حرف؟' },
      { t: 'chk', en: '<b>2.</b> Is that element a <b>direct</b> child of the component’s tag, not wrapped in something else?',
                  ar: '<b>2.</b> العنصر ده ابن <b>مباشر</b> لتاج الـ component، مش ملفوف في حاجة تانية؟' },
      { t: 'chk', en: '<b>3.</b> Is there a bare <code>&lt;ng-content /&gt;</code> for everything that should not go into a named slot?',
                  ar: '<b>3.</b> فيه <code>&lt;ng-content /&gt;</code> من غير select لكل حاجة مش المفروض تروح slot متسمّي؟' },
      { t: 'chk', en: '<b>4.</b> Does every name used in the projected markup exist in the <b>parent’s</b> class?',
                  ar: '<b>4.</b> كل اسم مستخدم في الـ markup المتسقط موجود في كلاس <b>الأب</b>؟' },
      { t: 'chk', en: '<b>5.</b> Styling it? Write the rule in the stylesheet of the component whose file contains the markup.',
                  ar: '<b>5.</b> بتستايله؟ اكتب الـ rule في الـ stylesheet بتاع الـ component اللي الـ markup مكتوب في ملفه.' }
    ]
  }
  ]
};
