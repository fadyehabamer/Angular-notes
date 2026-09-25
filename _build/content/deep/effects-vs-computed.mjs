/* ==================================================================
   computed() and effect(), name by name — the companion page after the
   effects vs computed topic. One running example (a draft editor with
   a status bar and autosave) with every name coloured.
   Model: content/deep/inputs-outputs.mjs.
   ================================================================== */

const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

export default {
  topic: 'effects-vs-computed',
  tab: 'computed() and effect(), name by name — The Angular Signal',
  title: { en: '<code>computed()</code> and <code>effect()</code>, name by name', ar: '<code>computed()</code> و<code>effect()</code>، اسم اسم' },
  say: {
    en: 'One keystroke in a draft editor followed through a signal, three computeds, a status bar and one effect that saves to storage. Every name coloured, including the ones that are only strings. Then what breaks when you rename each one.',
    ar: 'حرف واحد في محرر draft ماشيين وراه في signal، وتلات computeds، وstatus bar، وeffect واحد بيحفظ في التخزين. كل اسم ملوّن، ومنهم الأسماء اللي هي مجرد نصوص. وبعدين إيه اللي بيبوظ لما تغيّر كل واحد.'
  },
  lead: {
    en: 'The idea is simple: <b>a <code>computed</code> gives you a value back; an <code>effect</code> does something and gives nothing back.</b> The confusing part is the names. A computed gets a name because someone reads it; an effect usually has none. <code>onCleanup</code> looks like Angular’s and is yours. And <code>\'draft\'</code> the string is not <code>draft</code> the signal. This page sorts every one of them.',
    ar: 'الفكرة بسيطة: <b>الـ <code>computed</code> بيرجّعلك قيمة؛ والـ <code>effect</code> بيعمل حاجة ومبيرجّعش حاجة.</b> اللي بيلخبط هو الأسماء. الـ computed بياخد اسم عشان فيه حد بيقراه؛ والـ effect غالبًا ملوش اسم. و<code>onCleanup</code> شكله بتاع أنجولار وهو بتاعك. و<code>\'draft\'</code> النص مش هو <code>draft</code> الـ signal. الصفحة دي بترتّب كل واحد فيهم.'
  },
  names: {
    note: {
      en: '<code>signal</code>, <code>computed</code> and <code>effect</code> are Angular’s; the name on the left of each is yours. Two orange names are not TypeScript at all: <code>unsaved</code> is shared with the CSS file, and the storage key <code>\'draft\'</code> is a plain string that TypeScript never checks.',
      ar: '<code>signal</code> و<code>computed</code> و<code>effect</code> بتوع أنجولار؛ والاسم اللي على شمال كل واحد بتاعك. فيه اسمين برتقاني مش TypeScript أصلًا: <code>unsaved</code> متشارك مع ملف الـ CSS، ومفتاح التخزين <code>\'draft\'</code> نص عادي TypeScript عمره ما بيراجعه.'
    },
    names: [
      /* --- shared --- */
      { n:'DraftStore', k:'pub', w:{ en:'Your service class, injected by the editor and the bar.', ar:'كلاس الـ service بتاعك، والـ editor والـ bar بيعملوه inject.' } },
      { n:'Draft', k:'pub', w:{ en:'Your data type.', ar:'نوع الداتا بتاعك.' } },
      { n:'EMPTY_DRAFT', k:'pub', as:'BLANK_PITA', w:{ en:'Your constant for a blank draft, imported by the store.', ar:'الـ constant بتاعك لـ draft فاضي، والـ store بيعمله import.' } },
      { n:'title', k:'pub', w:{ en:'A field of <code>Draft</code>, read and written in three files. Drafts already in storage still use the old name after a rename.', ar:'field في <code>Draft</code>، بيتقري ويتكتب في تلات ملفات. والـ drafts اللي متخزنة فعلًا هتفضل بالاسم القديم بعد التغيير.' } },
      { n:'body', k:'pub', w:{ en:'A field of <code>Draft</code>.', ar:'field في <code>Draft</code>.' } },
      { n:'draft', k:'pub', re:'(?<![\\w$\'-])draft(?![\\w$\'-])',
        w:{ en:'The store’s writable signal. The editor reads it. (The <code>\'draft\'</code> string is the storage key, a different name.)', ar:'الـ signal اللي بتتكتب في الـ store. الـ editor بيقراها. (والنص <code>\'draft\'</code> ده مفتاح التخزين، اسم تاني.)' } },
      { n:'saved', k:'pub', re:'(?<=readonly |this\\.|^)saved(?![\\w$-])', w:{ en:'The store’s signal for the last saved version.', ar:'الـ signal بتاعة الـ store لآخر نسخة اتحفظت.' } },
      { n:'dirty', k:'pub', w:{ en:'A computed the bar reads.', ar:'computed الـ bar بيقراه.' } },
      { n:'canSave', k:'pub', w:{ en:'A computed the bar reads.', ar:'computed الـ bar بيقراه.' } },
      { n:'status', k:'pub', w:{ en:'A computed the bar reads.', ar:'computed الـ bar بيقراه.' } },
      { n:'setTitle', k:'pub', w:{ en:'The store’s method, called by the editor.', ar:'ميثود الـ store، والـ editor بيناديها.' } },
      { n:'save', k:'pub', re:'(?<![\\w$-])save(?=\\()', w:{ en:'The store’s method, called by the bar’s button.', ar:'ميثود الـ store، وزرار الـ bar بيناديها.' } },
      { n:'unsaved', k:'pub', w:{ en:'A CSS class. The template’s <code>[class.unsaved]</code> and the CSS file’s <code>.unsaved</code> must match; TypeScript checks neither.', ar:'CSS class. <code>[class.unsaved]</code> في التمبلت و<code>.unsaved</code> في ملف الـ CSS لازم يتطابقوا؛ وTypeScript مش بيراجع ولا واحد فيهم.' } },
      { n:'\'draft\'', k:'pub', as:'\'bamia\'', re:"'draft'",
        w:{ en:'The storage key. A string, so the compiler never checks that <code>getItem</code> and <code>setItem</code> spell it the same.', ar:'مفتاح التخزين. نص، فالـ compiler عمره ما بيراجع إن <code>getItem</code> و<code>setItem</code> كاتبينه زي بعض.' } },
      { n:'DraftEditor', k:'pub', w:{ en:'Your component class.', ar:'كلاس الـ component بتاعك.' } },
      { n:'app-draft-editor', k:'pub', w:{ en:'Its selector, typed by the page that shows it.', ar:'الـ selector بتاعه، والصفحة اللي بتعرضه بتكتبه.' } },
      { n:'DraftBar', k:'pub', w:{ en:'Your component class.', ar:'كلاس الـ component بتاعك.' } },
      { n:'app-draft-bar', k:'pub', w:{ en:'Its selector, typed by the page that shows it.', ar:'الـ selector بتاعه، والصفحة اللي بتعرضه بتكتبه.' } },

      /* --- yours, one file --- */
      { n:'store', k:'mine', re:'(?<![\\w$/-])store(?![\\w$-])', w:{ en:'The name each component gives the injected store, private to that component and its template.', ar:'الاسم اللي كل component بيدّيه للـ store المتعمله inject، خاص بالـ component ده والتمبلت بتاعه.' } },
      { n:'box', k:'mine', w:{ en:'A template reference (<code>#box</code>) to the input element. Only this template sees it.', ar:'template reference (<code>#box</code>) لعنصر الـ input. التمبلت ده بس اللي شايفه.' } },
      { n:'text', k:'mine', w:{ en:'The parameter of <code>setTitle</code>.', ar:'الـ parameter بتاع <code>setTitle</code>.' } },
      { n:'d', k:'mine', w:{ en:'An arrow function’s parameter: the current draft.', ar:'parameter في arrow function: الـ draft الحالي.' } },
      { n:'raw', k:'mine', w:{ en:'A local variable.', ar:'variable محلي.' } },
      { n:'loadDraft', k:'mine', w:{ en:'A helper function in the store’s file.', ar:'function مساعدة في ملف الـ store.' } },
      { n:'onCleanup', k:'mine', w:{ en:'The name Angular’s docs use, but it is only a parameter. Angular passes the cleanup function by position.', ar:'الاسم اللي في docs أنجولار، بس هو مجرد parameter. أنجولار بيبعت الـ cleanup function بالترتيب.' } },
      { n:'timerId', k:'mine', w:{ en:'A local variable.', ar:'variable محلي.' } },
      { n:'current', k:'mine', w:{ en:'A local variable.', ar:'variable محلي.' } },
      { n:'lastSaved', k:'mine', w:{ en:'A local variable.', ar:'variable محلي.' } },

      /* --- Angular's, the browser's --- */
      { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
      { n:'computed', k:'ng', w:{ en:'Angular’s derived signal: lazy, cached, read-only.', ar:'الـ signal المشتقة بتاعة أنجولار: lazy، ومتخزنة، وللقراية بس.' } },
      { n:'effect', k:'ng', w:{ en:'Angular’s function for side effects: code that reaches outside the signals.', ar:'الـ function بتاعة أنجولار للـ side effects: كود بيوصل لبرّه الـ signals.' } },
      { n:'untracked', k:'ng', w:{ en:'Angular’s function: read a signal without depending on it.', ar:'function من أنجولار: اقرا signal من غير ما تعتمد عليها.' } },
      { n:'set', k:'ng', re:'(?<=\\.)set(?=\\()', w:{ en:'A writable signal’s method: replace the value.', ar:'ميثود في الـ signal اللي بتتكتب: بدّل القيمة.' } },
      { n:'update', k:'ng', w:{ en:'A writable signal’s method: new value from the old one.', ar:'ميثود في الـ signal اللي بتتكتب: قيمة جديدة من القديمة.' } },
      { n:'@Injectable', k:'ng', w:{ en:'Angular’s decorator for a service.', ar:'الـ decorator بتاع أنجولار للـ service.' } },
      { n:'providedIn', k:'ng', w:{ en:'An option key Angular reads.', ar:'مفتاح إعداد أنجولار بيقراه.' } },
      { n:'inject', k:'ng', w:{ en:'Angular’s function that hands you a dependency.', ar:'الـ function بتاعة أنجولار اللي بتديك dependency.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator.', ar:'الـ decorator بتاع أنجولار.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The string after it is yours.', ar:'مفتاح إعداد. النص اللي بعده بتاعك.' } },
      { n:'template', k:'ng', re:'(?<![\\w$-])template(?=:)', w:{ en:'An option key.', ar:'مفتاح إعداد.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key.', ar:'مفتاح إعداد.' } },
      { n:'styleUrl', k:'ng', w:{ en:'An option key: this component’s CSS file.', ar:'مفتاح إعداد: ملف الـ CSS بتاع الـ component ده.' } },
      { n:'localStorage', k:'ng', w:{ en:'The browser’s storage.', ar:'التخزين بتاع المتصفح.' } },
      { n:'getItem', k:'ng', w:{ en:'A <code>localStorage</code> method.', ar:'ميثود في <code>localStorage</code>.' } },
      { n:'setItem', k:'ng', w:{ en:'A <code>localStorage</code> method.', ar:'ميثود في <code>localStorage</code>.' } },
      { n:'JSON', k:'ng', w:{ en:'JavaScript’s built-in for turning objects into text and back.', ar:'حاجة جاهزة في JavaScript بتحوّل الـ objects لنص وبالعكس.' } },
      { n:'setTimeout', k:'ng', w:{ en:'The browser’s timer.', ar:'التايمر بتاع المتصفح.' } },
      { n:'clearTimeout', k:'ng', w:{ en:'The browser’s way to cancel it.', ar:'طريقة المتصفح لإلغائه.' } },
      { n:'value', k:'ng', w:{ en:'The input element’s own property: its current text.', ar:'الـ property بتاعة عنصر الـ input نفسه: النص اللي فيه دلوقتي.' } },
      { n:'input', k:'ng', re:'(?<=\\()input(?=\\))', w:{ en:'The browser’s event: fires on every keystroke.', ar:'event بتاع المتصفح: بيشتغل مع كل حرف.' } },
      { n:'class', k:'ng', re:'(?<=\\[)class(?=\\.)', w:{ en:'Angular’s class binding: <code>[class.name]</code> adds the class when the value is true.', ar:'ربط الـ class في أنجولار: <code>[class.name]</code> بيضيف الـ class لما القيمة تبقى true.' } },
      { n:'disabled', k:'ng', w:{ en:'The button’s own property.', ar:'الـ property بتاعة الزرار نفسه.' } },
      { n:'click', k:'ng', w:{ en:'The browser’s event name.', ar:'اسم الـ event بتاع المتصفح.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One keystroke, six stops', ar: 'حرف واحد، ست محطات' },
    lead: {
      en: 'A draft editor. You type a title; a status bar says “Unsaved changes” and enables <b>Save</b>; and the draft is kept in the browser’s storage so a reload does not lose it. Follow one keystroke:',
      ar: 'محرر draft. بتكتب عنوان؛ والـ status bar بيقول «Unsaved changes» وبيفتح زرار <b>Save</b>؛ والـ draft بيتحفظ في تخزين المتصفح عشان الـ reload ميضيّعوش. امشي ورا حرف واحد:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'draft-editor.ts', lang: 'html', who: { en: 'editor · the keystroke', ar: 'الـ editor · الحرف' },
          code: ['<input #box [value]="store.draft().title" (input)="store.setTitle(box.value)" />'],
          say: { en: `${ng('input')} is the browser’s event and ${ng('value')} the element’s own property. ${mine('box')} is your name for the element. ${mine('store')} is this component’s name for the injected store, and ${pub('setTitle')} is the store’s method.`,
                 ar: `${ng('input')} event بتاع المتصفح و${ng('value')} الـ property بتاعة العنصر نفسه. و${mine('box')} اسمك انت للعنصر. و${mine('store')} اسم الـ component ده للـ store المتعمله inject، و${pub('setTitle')} ميثود الـ store.` } },
        { file: 'draft-store.ts', lang: 'ts', who: { en: 'store · writes the signal', ar: 'الـ store · بيكتب في الـ signal' },
          code: ['setTitle(text: string) {', '  this.draft.update(d => ({ ...d, title: text }));', '}'],
          say: { en: `The only write. ${ng('update')} is Angular’s. ${pub('draft')} is your signal, ${mine('text')} and ${mine('d')} are parameters, and ${pub('title')} is a field of your ${pub('Draft')} type. The <code>{ ...d }</code> makes a <b>new</b> object, which is how the signal knows something changed.`,
                 ar: `الكتابة الوحيدة. ${ng('update')} بتاعة أنجولار. و${pub('draft')} الـ signal بتاعتك، و${mine('text')} و${mine('d')} parameters، و${pub('title')} field في النوع ${pub('Draft')} بتاعك. و<code>{ ...d }</code> بتعمل object <b>جديد</b>، وده اللي بيخلي الـ signal تعرف إن حاجة اتغيرت.` } },
        { file: 'draft-store.ts', lang: 'ts', who: { en: 'store · derives a value', ar: 'الـ store · بيشتق قيمة' },
          code: ['readonly dirty = computed(() =>', '  JSON.stringify(this.draft()) !== JSON.stringify(this.saved()));'],
          say: { en: `${ng('computed')} is Angular’s; ${pub('dirty')} is your name for the result. It reads ${pub('draft')} and ${pub('saved')}, and that reading is the whole dependency list: nothing to declare. It gives a <b>value</b> back, so it gets a name.`,
                 ar: `${ng('computed')} بتاعة أنجولار؛ و${pub('dirty')} اسمك انت للنتيجة. بيقرا ${pub('draft')} و${pub('saved')}، والقراية دي هي قايمة الـ dependencies كلها: مفيش حاجة تعلنها. بيرجّع <b>قيمة</b>، فبياخد اسم.` } },
        { file: 'draft-store.ts', lang: 'ts', who: { en: 'store · derives from a derived', ar: 'الـ store · بيشتق من حاجة مشتقة' },
          code: ["readonly status = computed(() => (this.dirty() ? 'Unsaved changes' : 'All changes saved'));"],
          say: { en: `A computed can read another computed. ${pub('status')} depends on ${pub('dirty')}, which depends on ${pub('draft')}. You never wire this up; the names you call inside are the wiring.`,
                 ar: `الـ computed ممكن يقرا computed تاني. ${pub('status')} معتمد على ${pub('dirty')}، اللي معتمد على ${pub('draft')}. انت عمرك ما بتوصّل ده؛ الأسماء اللي بتناديها جوه هي التوصيل.` } },
        { file: 'draft-bar.html', lang: 'html', who: { en: 'bar · reads', ar: 'الـ bar · بيقرا' },
          code: ['<span class="bar-text" [class.unsaved]="store.dirty()">{{ store.status() }}</span>'],
          say: { en: `The template reads by calling: ${pub('status')} with brackets. ${ng('class')} with a dot is Angular’s class binding; ${pub('unsaved')} after the dot is a CSS class name, shared with the CSS file.`,
                 ar: `التمبلت بيقرا بالنداء: ${pub('status')} بالقوسين. و${ng('class')} بنقطة ده ربط الـ class بتاع أنجولار؛ و${pub('unsaved')} اللي بعد النقطة اسم CSS class، متشارك مع ملف الـ CSS.` } },
        { file: 'draft-store.ts', lang: 'ts', who: { en: 'store · the one effect', ar: 'الـ store · الـ effect الوحيد' },
          code: ['effect(() => {', "  localStorage.setItem('draft', JSON.stringify(this.draft()));", '});'],
          say: { en: `The only job the signals cannot do: write to the browser’s storage. ${ng('effect')} returns nothing useful here, so it has <b>no name</b>. ${pub("'draft'")} is a storage key, a plain string: it is <b>not</b> the signal ${pub('draft')}.`,
                 ar: `الشغلانة الوحيدة اللي الـ signals متقدرش تعملها: الكتابة في تخزين المتصفح. ${ng('effect')} مش بيرجّع حاجة مفيدة هنا، فـ<b>ملوش اسم</b>. و${pub("'draft'")} مفتاح تخزين، نص عادي: <b>مش</b> هو الـ signal ${pub('draft')}.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'Write: <code>draft.update(…)</code>. Derive: <code>dirty</code>, <code>canSave</code>, <code>status</code>, each a <code>computed</code> with a name. Leave the signal world: one nameless <code>effect</code>. Read: <code>store.status()</code>. If you want a value at the end, it is a computed.',
        ar: 'اكتب: <code>draft.update(…)</code>. اشتق: <code>dirty</code> و<code>canSave</code> و<code>status</code>، كل واحد <code>computed</code> ليه اسم. اخرج من عالم الـ signals: <code>effect</code> واحد من غير اسم. اقرا: <code>store.status()</code>. لو عايز قيمة في الآخر، يبقى computed.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Value or action?', ar: 'قيمة ولا فعل؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'Everything here lives in the store except the reading. The only real question is which of the three Angular functions a line uses.',
      ar: 'كل حاجة هنا عايشة في الـ store ما عدا القراية. السؤال الحقيقي الوحيد هو السطر ده بيستخدم أنهي function من التلاتة بتوع أنجولار.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>readonly draft = signal&lt;Draft&gt;(…)</code>', '<code>draft-store.ts</code>', 'the store', `you pick ${pub('draft')}; readers type it`],
            ar: ['<code>readonly draft = signal&lt;Draft&gt;(…)</code>', '<code>draft-store.ts</code>', 'الـ store', `انت بتختار ${pub('draft')}؛ واللي بيقروا بيكتبوه`] },
          { en: ['<code>readonly dirty = computed(() =&gt; …)</code>', '<code>draft-store.ts</code>', 'the store', `you pick ${pub('dirty')}, ${pub('canSave')}, ${pub('status')}; templates type them`],
            ar: ['<code>readonly dirty = computed(() =&gt; …)</code>', '<code>draft-store.ts</code>', 'الـ store', `انت بتختار ${pub('dirty')} و${pub('canSave')} و${pub('status')}؛ والتمبلتس بتكتبهم`] },
          { en: ['<code>effect(() =&gt; …)</code>', '<code>draft-store.ts</code>, in the constructor', 'the store', 'nobody: an effect usually has no name'],
            ar: ['<code>effect(() =&gt; …)</code>', '<code>draft-store.ts</code>، جوه الـ constructor', 'الـ store', 'محدش: الـ effect غالبًا ملوش اسم'] },
          { en: ['<code>setTitle(text)</code>, <code>save()</code>', '<code>draft-store.ts</code>', 'the store', `you pick ${pub('setTitle')} and ${pub('save')}; components call them`],
            ar: ['<code>setTitle(text)</code>، <code>save()</code>', '<code>draft-store.ts</code>', 'الـ store', `انت بتختار ${pub('setTitle')} و${pub('save')}؛ والـ components بتناديهم`] },
          { en: ['<code>store.status()</code>, <code>store.canSave()</code>', '<code>draft-bar.html</code>', 'any reader', `${mine('store')} is yours; the rest copies the store`],
            ar: ['<code>store.status()</code>، <code>store.canSave()</code>', '<code>draft-bar.html</code>', 'أي حد بيقرا', `${mine('store')} بتاعك؛ والباقي بينسخ الـ store`] },
          { en: ["<code>'draft'</code> in <code>getItem</code> / <code>setItem</code>", '<code>draft-store.ts</code>', 'the store', `you pick ${pub("'draft'")}; it must match itself`],
            ar: ["<code>'draft'</code> في <code>getItem</code> / <code>setItem</code>", '<code>draft-store.ts</code>', 'الـ store', `انت بتختار ${pub("'draft'")}؛ ولازم يطابق نفسه`] },
        ] },
      { t: 'ul',
        en: ['<b>A computed has a name because someone reads it.</b> An effect usually has none, because nothing reads it: it only makes something happen.',
             '<b>Templates read, methods write.</b> Templates call signals with <code>()</code>. Only the store’s methods call <code>set</code> or <code>update</code>.',
             '<b>Ask: do I want a value at the end?</b> Yes: <code>computed</code>. No, I want something to happen outside Angular (storage, a log, a chart library): <code>effect</code>.'],
        ar: ['<b>الـ computed ليه اسم عشان فيه حد بيقراه.</b> والـ effect غالبًا ملوش، عشان محدش بيقراه: هو بس بيخلي حاجة تحصل.',
             '<b>التمبلتس بتقرا، والميثودز بتكتب.</b> التمبلتس بتنادي الـ signals بـ <code>()</code>. وميثودز الـ store بس هي اللي بتنادي <code>set</code> أو <code>update</code>.',
             '<b>اسأل: أنا عايز قيمة في الآخر؟</b> آه: <code>computed</code>. لأ، عايز حاجة تحصل برّه أنجولار (تخزين، log، مكتبة رسوم): <code>effect</code>.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All six files, every name coloured', ar: 'الست ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same example, complete. Hover a coloured name to light up everywhere else it appears. Then press <b>Rename test</b>: every name you own turns into a made-up word, including the CSS class and the storage key, and the code still works.',
      ar: 'نفس المثال، كامل. قف بالماوس على أي اسم ملوّن وهتنوّر كل الأماكن التانية اللي هو فيها. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: كل اسم بتاعك هيبقى كلمة عشوائية، ومنهم الـ CSS class ومفتاح التخزين، والكود لسه شغال.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'draft.ts', lang: 'ts', tag: { en: 'the data', ar: 'الداتا' }, code: [
        'export interface Draft {',
        '  title: string;',
        '  body: string;',
        '}',
        '',
        "export const EMPTY_DRAFT: Draft = { title: '', body: '' };" ] },
      { t: 'code', name: 'draft-store.ts', lang: 'ts', tag: { en: 'signals, computeds, one effect', ar: 'signals وcomputeds وeffect واحد' }, code: [
        "import { Injectable, computed, effect, signal } from '@angular/core';",
        "import { Draft, EMPTY_DRAFT } from './draft';",
        '',
        'function loadDraft(): Draft {',
        "  const raw = localStorage.getItem('draft');",
        '  return raw ? JSON.parse(raw) : EMPTY_DRAFT;',
        '}',
        '',
        "@Injectable({ providedIn: 'root' })",
        'export class DraftStore {',
        '  readonly draft = signal<Draft>(loadDraft());',
        '  readonly saved = signal<Draft>(EMPTY_DRAFT);',
        '',
        '  // derived: never stored, never out of date',
        '  readonly dirty = computed(() =>',
        '    JSON.stringify(this.draft()) !== JSON.stringify(this.saved()));',
        '  readonly canSave = computed(() => this.dirty() && this.draft().title.length > 0);',
        "  readonly status = computed(() => (this.dirty() ? 'Unsaved changes' : 'All changes saved'));",
        '',
        '  constructor() {',
        '    // the ONE effect: storage is outside the signal world',
        '    effect(() => {',
        "      localStorage.setItem('draft', JSON.stringify(this.draft()));",
        '    });',
        '  }',
        '',
        '  setTitle(text: string) {',
        '    this.draft.update(d => ({ ...d, title: text }));',
        '  }',
        '',
        '  save() {',
        '    this.saved.set(this.draft());',
        '  }',
        '}' ] },
      { t: 'code', name: 'draft-editor.ts', lang: 'ts', tag: { en: 'writes through the store', ar: 'بيكتب عن طريق الـ store' }, code: [
        "import { Component, inject } from '@angular/core';",
        "import { DraftStore } from './draft-store';",
        '',
        '@Component({',
        "  selector: 'app-draft-editor',",
        '  template: `',
        '    <input #box [value]="store.draft().title" (input)="store.setTitle(box.value)" />',
        '  `,',
        '})',
        'export class DraftEditor {',
        '  protected readonly store = inject(DraftStore);',
        '}' ] },
      { t: 'code', name: 'draft-bar.ts', lang: 'ts', tag: { en: 'reads only', ar: 'بيقرا بس' }, code: [
        "import { Component, inject } from '@angular/core';",
        "import { DraftStore } from './draft-store';",
        '',
        '@Component({',
        "  selector: 'app-draft-bar',",
        "  templateUrl: './draft-bar.html',",
        "  styleUrl: './draft-bar.css',",
        '})',
        'export class DraftBar {',
        '  protected readonly store = inject(DraftStore);',
        '}' ] },
      { t: 'code', name: 'draft-bar.html', lang: 'html', tag: { en: 'reads by calling', ar: 'بيقرا بالنداء' }, code: [
        '<span class="bar-text" [class.unsaved]="store.dirty()">{{ store.status() }}</span>',
        '<button [disabled]="!store.canSave()" (click)="store.save()">Save</button>' ] },
      { t: 'code', name: 'draft-bar.css', lang: 'css', tag: { en: 'shares one name', ar: 'متشارك في اسم واحد' }, code: [
        '.unsaved {',
        '  color: crimson;',
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
      en: 'Every TypeScript name you own is checked for you. The two names that live in strings and CSS are not, and both fail silently.',
      ar: 'أي اسم TypeScript بتاعك بيتراجع عشانك. أما الاسمين اللي عايشين في نصوص وفي CSS فلأ، والاتنين بيفشلوا في صمت.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [`${pub('draft')}, ${pub('saved')}`, 'every <code>this.draft()</code> in the store and <code>store.draft()</code> in templates', 'Compile error.'],
            ar: [`${pub('draft')} و${pub('saved')}`, 'كل <code>this.draft()</code> في الـ store و<code>store.draft()</code> في التمبلتس', 'Compile error.'] },
          { en: [`${pub('dirty')}, ${pub('canSave')}, ${pub('status')}`, 'the other computeds that read them, and the bar’s template', 'Compile error.'],
            ar: [`${pub('dirty')} و${pub('canSave')} و${pub('status')}`, 'الـ computeds التانية اللي بتقراهم، وتمبلت الـ bar', 'Compile error.'] },
          { en: [`${pub('setTitle')}, ${pub('save')}`, 'the templates that call them', 'Compile error in the template.'],
            ar: [`${pub('setTitle')} و${pub('save')}`, 'التمبلتس اللي بتناديهم', 'Compile error في التمبلت.'] },
          { en: [pub("'draft'") + ' (the storage key)', 'the other string: <code>getItem</code> or <code>setItem</code>', '<b>No error.</b> The draft is saved under one key and looked for under another, so every reload starts blank.'],
            ar: [pub("'draft'") + ' (مفتاح التخزين)', 'النص التاني: <code>getItem</code> أو <code>setItem</code>', '<b>مفيش error.</b> الـ draft بيتحفظ بمفتاح وبيتدوّر عليه بمفتاح تاني، فكل reload بيبدأ فاضي.'] },
          { en: [pub('unsaved') + ' (the CSS class)', 'the <code>.unsaved</code> rule in <code>draft-bar.css</code>', '<b>No error.</b> The class is added, but no rule matches it, so nothing turns red.'],
            ar: [pub('unsaved') + ' (الـ CSS class)', 'الـ rule <code>.unsaved</code> في <code>draft-bar.css</code>', '<b>مفيش error.</b> الـ class بيتضاف، بس مفيش rule مطابقة، فمفيش حاجة بتبقى حمرا.'] },
          { en: [`${pub('Draft')}, ${pub('title')}, ${pub('body')}`, 'every file that uses them', 'Compile error. But drafts already in the browser’s storage still carry the old field name.'],
            ar: [`${pub('Draft')} و${pub('title')} و${pub('body')}`, 'كل ملف بيستخدمهم', 'Compile error. بس الـ drafts اللي متخزنة فعلًا في المتصفح لسه شايلة اسم الـ field القديم.'] },
          { en: [pub('DraftStore'), 'every import and <code>inject(DraftStore)</code>', 'Compile error on the import.'],
            ar: [pub('DraftStore'), 'كل import و<code>inject(DraftStore)</code>', 'Compile error في الـ import.'] },
          { en: [`${mine('store')}, ${mine('box')}`, 'that one component and its template', 'Compile error in the template.'],
            ar: [`${mine('store')} و${mine('box')}`, 'الـ component ده والتمبلت بتاعه', 'Compile error في التمبلت.'] },
          { en: [`${mine('text')}, ${mine('d')}, ${mine('raw')}, ${mine('onCleanup')}`, 'only inside that function', 'Compile error inside it.'],
            ar: [`${mine('text')} و${mine('d')} و${mine('raw')} و${mine('onCleanup')}`, 'جوه الـ function دي بس', 'Compile error جواها.'] },
          { en: [`${ng('signal')}, ${ng('computed')}, ${ng('effect')}, ${ng('set')}, ${ng('update')}`, 'nothing: they are Angular’s', 'They are Angular’s words.'],
            ar: [`${ng('signal')} و${ng('computed')} و${ng('effect')} و${ng('set')} و${ng('update')}`, 'ولا حاجة: دول بتوع أنجولار', 'دي كلمات أنجولار.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b> above the files. Watch the two <code>\'draft\'</code> strings change together, and <code>unsaved</code> change in the HTML and the CSS together. Those are the renames nobody checks but you.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b> فوق الملفات. بص على النصين <code>\'draft\'</code> وهما بيتغيروا مع بعض، و<code>unsaved</code> بيتغير في الـ HTML والـ CSS مع بعض. دول التغييرات اللي محدش بيراجعها غيرك.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتاعتك' },
    title: { en: 'Angular’s words, and one that only looks like Angular’s', ar: 'كلمات أنجولار، وواحدة شكلها بس بتاعة أنجولار' },
    lead: {
      en: 'The signal API is small: a handful of blue words, and you type them exactly. Around them sit the browser’s words. And one name from Angular’s docs is really just a parameter.',
      ar: 'الـ API بتاع الـ signals صغير: شوية كلمات زرقا، وبتكتبهم زي ما هما. وحواليهم كلمات المتصفح. وفيه اسم من docs أنجولار هو في الحقيقة مجرد parameter.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Owner', 'Names', 'What they are'], ar: ['صاحبها', 'الأسماء', 'هي إيه'] },
        rows: [
          { en: ['Angular signals', `${ng('signal')}, ${ng('computed')}, ${ng('effect')}, ${ng('untracked')}`, 'Make a value; derive a value; do something; read without depending.'],
            ar: ['الـ signals بتاعة أنجولار', `${ng('signal')} و${ng('computed')} و${ng('effect')} و${ng('untracked')}`, 'اعمل قيمة؛ اشتق قيمة؛ اعمل حاجة؛ اقرا من غير اعتماد.'] },
          { en: ['Writable signal methods', `${ng('set')}, ${ng('update')}`, 'Only a <code>signal()</code> has them. A <code>computed</code> has neither.'],
            ar: ['ميثودز الـ signal اللي بتتكتب', `${ng('set')} و${ng('update')}`, '<code>signal()</code> بس اللي فيها دول. الـ <code>computed</code> مفيهوش ولا واحدة.'] },
          { en: ['Angular template', `${ng('class')} in <code>[class.unsaved]</code>`, 'The binding is Angular’s; the class name after the dot is yours.'],
            ar: ['تمبلت أنجولار', `${ng('class')} في <code>[class.unsaved]</code>`, 'الربط بتاع أنجولار؛ واسم الـ class اللي بعد النقطة بتاعك.'] },
          { en: ['The browser', `${ng('localStorage')}, ${ng('getItem')}, ${ng('setItem')}, ${ng('JSON')}, ${ng('input')}, ${ng('value')}, ${ng('disabled')}`, 'Storage, JSON, the input event and element properties.'],
            ar: ['المتصفح', `${ng('localStorage')} و${ng('getItem')} و${ng('setItem')} و${ng('JSON')} و${ng('input')} و${ng('value')} و${ng('disabled')}`, 'التخزين، والـ JSON، وevent الـ input، وproperties العناصر.'] },
        ] },
      { t: 'p',
        en: `Now the one that fools people. When an effect needs to undo something before it runs again, Angular passes it a cleanup function as its first argument. The docs call that parameter ${mine('onCleanup')}, so it looks official. It is not: Angular passes it by position, and you may call it anything.`,
        ar: `ودلوقتي اللي بيضحك على الناس. لما effect يبقى محتاج يلغي حاجة قبل ما يشتغل تاني، أنجولار بيدّيله cleanup function كأول argument. الـ docs بتسمّي الـ parameter ده ${mine('onCleanup')}، فشكله رسمي. بس هو مش كده: أنجولار بيبعته بالترتيب، وتقدر تسمّيه أي حاجة.` },
      { t: 'code', name: 'draft-store.ts · wait before saving', lang: 'ts', tag: { en: 'onCleanup', ar: 'onCleanup' }, code: [
        'effect(onCleanup => {',
        '  const d = this.draft();',
        "  const timerId = setTimeout(() => localStorage.setItem('draft', JSON.stringify(d)), 500);",
        '  onCleanup(() => clearTimeout(timerId));   // typed again? cancel the old save',
        '});' ] },
      { t: 'p',
        en: `The same goes for reading without depending. ${ng('untracked')} is Angular’s; the variables around it are yours.`,
        ar: `ونفس الكلام للقراية من غير اعتماد. ${ng('untracked')} بتاعة أنجولار؛ والـ variables اللي حواليها بتاعتك.` },
      { t: 'code', name: 'draft-store.ts · untracked', lang: 'ts', tag: { en: 'read, but do not re-run for it', ar: 'اقرا، بس متشتغلش تاني عشانه' }, code: [
        'effect(() => {',
        '  const current = this.draft().title;                     // re-runs when this changes',
        '  const lastSaved = untracked(() => this.saved().title);  // read only, no re-run',
        '  console.log(`editing "${current}", last saved "${lastSaved}"`);',
        '});' ] }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'Angular accepts any name on the left of <code>=</code>. Good names make templates read like sentences, and one habit protects you from the storage-key bug.',
      ar: 'أنجولار بيقبل أي اسم على شمال الـ <code>=</code>. الأسماء الكويسة بتخلي التمبلتس تتقري زي جمل، وفيه عادة بتحميك من bug مفتاح التخزين.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['a computed', '<code>dirty</code>, <code>total</code>, <code>status</code>', '<code>getDirty</code>, <code>computeTotal</code>, <code>dirtySignal</code>', 'Name the value, not the work. <code>store.total()</code> already says “read it”.'],
            ar: ['computed', '<code>dirty</code>، <code>total</code>، <code>status</code>', '<code>getDirty</code>، <code>computeTotal</code>، <code>dirtySignal</code>', 'سمّي القيمة، مش الشغل. <code>store.total()</code> أصلًا بتقول «اقراها».'] },
          { en: ['a yes/no computed', '<code>canSave</code>, <code>isDirty</code>, <code>hasItems</code>', '<code>saveFlag</code>, <code>check</code>', '<code>[disabled]="!store.canSave()"</code> reads as English.'],
            ar: ['computed آه/لأ', '<code>canSave</code>، <code>isDirty</code>، <code>hasItems</code>', '<code>saveFlag</code>، <code>check</code>', '<code>[disabled]="!store.canSave()"</code> بتتقري زي جملة إنجليزي.'] },
          { en: ['an effect', 'usually nothing; if you keep it, what it does: <code>autosave</code>', '<code>effect1</code>, <code>myEffect</code>', 'You only keep the result if you need to <code>destroy()</code> it early.'],
            ar: ['effect', 'غالبًا ولا حاجة؛ ولو احتفظت بيه، سمّي اللي بيعمله: <code>autosave</code>', '<code>effect1</code>، <code>myEffect</code>', 'بتحتفظ بالنتيجة بس لو محتاج تعمل لها <code>destroy()</code> بدري.'] },
          { en: ['the cleanup parameter', '<code>onCleanup</code>', 'anything else', 'Not a rule, but it is what every reader expects.'],
            ar: ['parameter الـ cleanup', '<code>onCleanup</code>', 'أي حاجة تانية', 'مش قاعدة، بس هو اللي أي حد بيقرا مستنيه.'] },
          { en: ['the storage key', 'one constant: <code>const DRAFT_KEY = \'draft\'</code>', 'typing <code>\'draft\'</code> in two places', 'A constant is a TypeScript name, so a typo becomes a compile error instead of a blank page.'],
            ar: ['مفتاح التخزين', 'constant واحد: <code>const DRAFT_KEY = \'draft\'</code>', 'إنك تكتب <code>\'draft\'</code> في مكانين', 'الـ constant اسم TypeScript، فالغلطة الإملائية بتبقى compile error بدل صفحة فاضية.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Two names TypeScript cannot see', ar: 'اسمين TypeScript مش شايفهم' },
    lead: {
      en: 'You pick both of these names freely. But once picked, each must be repeated exactly somewhere TypeScript does not look.',
      ar: 'انت بتختار الاسمين دول براحتك. بس أول ما تختارهم، كل واحد لازم يتكرر بالظبط في مكان TypeScript مش بيبص فيه.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'The class name after <code>[class.</code> must match the CSS', ar: 'اسم الـ class اللي بعد <code>[class.</code> لازم يطابق الـ CSS' }, blocks: [
        { t: 'pair',
          bad:  { name: 'draft-bar.css', lang: 'css', code: ['.not-saved {', '  color: crimson;', '}'] },
          good: { name: 'draft-bar.css', lang: 'css', code: ['.unsaved {', '  color: crimson;', '}'] } },
        { t: 'p',
          en: `The template adds a class called ${pub('unsaved')}. The CSS on the left styles a class nobody adds. Both files are valid, so nothing complains; the text just never turns red.`,
          ar: `التمبلت بيضيف class اسمه ${pub('unsaved')}. والـ CSS اللي على الشمال بيلوّن class محدش بيضيفه. الملفين صح، فمحدش بيشتكي؛ الكلام بس عمره ما بيبقى أحمر.` }
      ]},
      { t: 'step', n: 'B', title: { en: 'The storage key must match itself', ar: 'مفتاح التخزين لازم يطابق نفسه' }, blocks: [
        { t: 'pair',
          bad:  { name: 'draft-store.ts', lang: 'ts', code: [
            "const raw = localStorage.getItem('drafts');",
            '// …',
            "localStorage.setItem('draft', JSON.stringify(this.draft()));" ] },
          good: { name: 'draft-store.ts', lang: 'ts', code: [
            "const raw = localStorage.getItem('draft');",
            '// …',
            "localStorage.setItem('draft', JSON.stringify(this.draft()));" ] } },
        { t: 'p',
          en: 'One letter apart. The effect saves under <code>\'draft\'</code>, the loader looks under <code>\'drafts\'</code>, finds nothing, and starts blank. The fix that lasts is the constant from the habits table.',
          ar: 'فرق حرف واحد. الـ effect بيحفظ تحت <code>\'draft\'</code>، والـ loader بيدوّر تحت <code>\'drafts\'</code>، مش بيلاقي حاجة، وبيبدأ فاضي. والحل اللي بيدوم هو الـ constant اللي في جدول العادات.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: 'Getters did this job before, with the same names', ar: 'الـ getters كانت بتعمل الشغلانة دي قبل كده، بنفس الأسماء' },
    lead: {
      en: 'Before signals, a derived value was usually a getter. The names are identical. The difference is the brackets, and how often the work runs.',
      ar: 'قبل الـ signals، القيمة المشتقة كانت غالبًا getter. الأسماء هي هي. الفرق في القوسين، وفي الشغل بيتعمل كام مرة.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'draft-store.ts — before signals', lang: 'ts', code: [
          'draft: Draft = loadDraft();',
          'saved: Draft = EMPTY_DRAFT;',
          '',
          'get dirty() {',
          '  return JSON.stringify(this.draft) !== JSON.stringify(this.saved);',
          '}' ] },
        good: { name: 'draft-store.ts — today', lang: 'ts', code: [
          'readonly draft = signal<Draft>(loadDraft());',
          'readonly saved = signal<Draft>(EMPTY_DRAFT);',
          '',
          'readonly dirty = computed(() =>',
          '  JSON.stringify(this.draft()) !== JSON.stringify(this.saved()));',
          '' ] } },
      { t: 'p',
        en: `Same ${pub('draft')}, ${pub('saved')} and ${pub('dirty')}. With a getter the template writes <code>store.dirty</code> with no brackets, and the getter runs again every time Angular checks the template. A ${ng('computed')} is read as <code>store.dirty()</code> and only recalculates when ${pub('draft')} or ${pub('saved')} changed.`,
        ar: `نفس ${pub('draft')} و${pub('saved')} و${pub('dirty')}. مع الـ getter التمبلت بيكتب <code>store.dirty</code> من غير قوسين، والـ getter بيشتغل تاني كل مرة أنجولار بيراجع التمبلت. أما ${ng('computed')} فبيتقري <code>store.dirty()</code> ومبيتحسبش تاني غير لما ${pub('draft')} أو ${pub('saved')} يتغيروا.` },
      { t: 'note', label: { en: 'You may also see', ar: 'ممكن تشوف كمان' },
        en: '<code>effect(() =&gt; …, { allowSignalWrites: true })</code>. That option key comes from the Angular versions before 19, when writing a signal inside an effect was blocked by default. Since Angular 19 it is deprecated and does nothing. Needing it was usually a sign the effect should have been a computed.',
        ar: '<code>effect(() =&gt; …, { allowSignalWrites: true })</code>. مفتاح الإعداد ده من أيام نسخ أنجولار اللي قبل 19، لما الكتابة في signal جوه effect كانت ممنوعة افتراضيًا. من Angular 19 بقى deprecated ومبيعملش حاجة. ولو كنت محتاجه، ده غالبًا كان معناه إن الـ effect كان المفروض يبقى computed.' }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, and says nothing', ar: 'مش بيعمل حاجة، ومش بيقول حاجة' },
    title: { en: 'Mistakes that fail silently', ar: 'غلطات بتفشل في صمت' },
    lead: {
      en: 'Signal mistakes rarely crash. The screen shows an old value, or shows nothing new, and nothing in the console says why.',
      ar: 'غلطات الـ signals نادرًا ما بتوقّع التطبيق. الشاشة بتعرض قيمة قديمة، أو مش بتعرض حاجة جديدة، ومفيش حاجة في الكونسول بتقول ليه.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'Storing what you could derive', ar: 'إنك تخزّن حاجة كنت تقدر تشتقها' }, blocks: [
        { t: 'pair',
          bad:  { name: 'draft-store.ts', lang: 'ts', code: [
            'readonly dirty = signal(false);',
            '',
            'constructor() {',
            '  effect(() => {',
            '    this.dirty.set(JSON.stringify(this.draft()) !== JSON.stringify(this.saved()));',
            '  });',
            '}' ] },
          good: { name: 'draft-store.ts', lang: 'ts', code: [
            'readonly dirty = computed(() =>',
            '  JSON.stringify(this.draft()) !== JSON.stringify(this.saved()));',
            '',
            '',
            '',
            '',
            '' ] } },
        { t: 'p', en: 'The left one mostly works, which is the problem. Effects run a little later, not at the moment you write. Read <code>dirty()</code> right after <code>setTitle</code> and you get the old answer. Two copies of one truth, and a window where they disagree.',
                  ar: 'اللي على الشمال شغال في أغلب الوقت، وده المشكلة. الـ effects بتشتغل بعدها بشوية، مش في لحظة ما بتكتب. اقرا <code>dirty()</code> بعد <code>setTitle</code> على طول وهتاخد الإجابة القديمة. نسختين من حقيقة واحدة، وشباك بيختلفوا فيه.' }
      ]},
      { t: 'step', n: '2', title: { en: 'Changing the object instead of replacing it', ar: 'إنك تغيّر الـ object بدل ما تبدّله' }, blocks: [
        { t: 'pair',
          bad:  { name: 'draft-store.ts', lang: 'ts', code: [
            'setTitle(text: string) {',
            '  this.draft.update(d => { d.title = text; return d; });',
            '}' ] },
          good: { name: 'draft-store.ts', lang: 'ts', code: [
            'setTitle(text: string) {',
            '  this.draft.update(d => ({ ...d, title: text }));',
            '}' ] } },
        { t: 'p', en: 'A signal compares the old value with the new one. On the left it is the <b>same object</b>, so the signal decides nothing changed: <code>dirty</code>, <code>status</code> and the effect never run again.',
                  ar: 'الـ signal بتقارن القيمة القديمة بالجديدة. على الشمال هو <b>نفس الـ object</b>، فالـ signal بتقرر إن مفيش حاجة اتغيرت: <code>dirty</code> و<code>status</code> والـ effect عمرهم ما بيشتغلوا تاني.' }
      ]},
      { t: 'step', n: '3', title: { en: 'Forgetting the brackets in the template', ar: 'نسيان القوسين في التمبلت' }, blocks: [
        { t: 'pair',
          bad:  { name: 'draft-bar.html', lang: 'html', code: ['<span class="bar-text">{{ store.status }}</span>'] },
          good: { name: 'draft-bar.html', lang: 'html', code: ['<span class="bar-text">{{ store.status() }}</span>'] } },
        { t: 'p', en: 'Without <code>()</code> the template prints a description of the signal instead of its text. Recent Angular versions warn about this at build time, so read your warnings.',
                  ar: 'من غير <code>()</code> التمبلت بيطبع وصف للـ signal بدل النص اللي فيها. نسخ أنجولار الحديثة بتحذّرك من ده وقت الـ build، فاقرا الـ warnings بتاعتك.' }
      ]},
      { t: 'step', n: '4', title: { en: 'Creating an effect in a method', ar: 'إنك تعمل effect جوه ميثود' }, blocks: [
        { t: 'pair',
          bad:  { name: 'draft-store.ts', lang: 'ts', code: [
            'startAutosave() {',
            "  effect(() => localStorage.setItem('draft', JSON.stringify(this.draft())));",
            '}' ] },
          good: { name: 'draft-store.ts', lang: 'ts', code: [
            'constructor() {',
            "  effect(() => localStorage.setItem('draft', JSON.stringify(this.draft())));",
            '}' ] } },
        { t: 'p', en: 'This one does fail, at runtime, with NG0203: <code>effect()</code> needs an injection context, like a constructor or a field. The message talks about injection, not about effects, which is why it confuses people.',
                  ar: 'دي بتفشل فعلًا، وهو شغال، بـ NG0203: <code>effect()</code> محتاج injection context، زي constructor أو field. والرسالة بتتكلم عن الـ injection، مش عن الـ effects، وعشان كده بتلخبط الناس.' }
      ]},
      { t: 'step', n: '5', title: { en: 'Setting a computed', ar: 'إنك تعمل set لـ computed' }, blocks: [
        { t: 'pair',
          bad:  { name: 'draft-store.ts', lang: 'ts', code: ['save() {', '  this.dirty.set(false);', '}'] },
          good: { name: 'draft-store.ts', lang: 'ts', code: ['save() {', '  this.saved.set(this.draft());', '}'] } },
        { t: 'p', en: 'A compile error: “Property <code>set</code> does not exist”. A computed is read-only. To change what it says, change what it reads: saving makes <code>saved</code> equal <code>draft</code>, and <code>dirty</code> becomes false by itself.',
                  ar: 'Compile error: «Property <code>set</code> does not exist». الـ computed للقراية بس. عشان تغيّر اللي بيقوله، غيّر اللي بيقراه: الحفظ بيخلي <code>saved</code> تساوي <code>draft</code>، و<code>dirty</code> بيبقى false لوحده.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it does nothing', ar: 'لما مايعملش حاجة' },
    title: { en: 'Six questions, in this order', ar: 'ست أسئلة، بالترتيب ده' },
    lead: {
      en: 'The screen does not update, or the draft is gone after a reload. Ask these before anything else.',
      ar: 'الشاشة مش بتتحدّث، أو الـ draft راح بعد الـ reload. اسأل دول قبل أي حاجة.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Is every signal and computed called with <code>()</code>, in the TypeScript and in the template?',
                  ar: '<b>1.</b> كل signal وcomputed متنادية بـ <code>()</code>، في الـ TypeScript وفي التمبلت؟' },
      { t: 'chk', en: '<b>2.</b> Does every <code>update</code> return a <b>new</b> object or array, not the old one changed?',
                  ar: '<b>2.</b> كل <code>update</code> بترجّع object أو array <b>جديدة</b>، مش القديمة متعدلة؟' },
      { t: 'chk', en: '<b>3.</b> Is any effect writing a signal? If the result is a value, make it a <code>computed</code>.',
                  ar: '<b>3.</b> فيه effect بيكتب في signal؟ لو النتيجة قيمة، خليها <code>computed</code>.' },
      { t: 'chk', en: '<b>4.</b> Is every <code>effect()</code> created in a constructor or a field?',
                  ar: '<b>4.</b> كل <code>effect()</code> متعمل جوه constructor أو field؟' },
      { t: 'chk', en: '<b>5.</b> Do <code>getItem</code> and <code>setItem</code> use the exact same key? Does the CSS file have the exact class the template adds?',
                  ar: '<b>5.</b> <code>getItem</code> و<code>setItem</code> بيستخدموا نفس المفتاح بالظبط؟ وملف الـ CSS فيه نفس الـ class اللي التمبلت بيضيفه بالظبط؟' },
      { t: 'chk', en: '<b>6.</b> Does an effect re-run too often? It depends on everything it reads; wrap the reads you do not care about in <code>untracked</code>.',
                  ar: '<b>6.</b> فيه effect بيشتغل أكتر من اللازم؟ هو معتمد على كل حاجة بيقراها؛ لف القرايات اللي مش فارقة معاك في <code>untracked</code>.' }
    ]
  }
  ]
};
