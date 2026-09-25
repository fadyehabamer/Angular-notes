/* ==================================================================
   Injection tokens and host directives, name by name — the companion
   page after the DI tokens + host directives topic. One running example
   (a "Pay now" button that wears a click-tracking directive, configured
   by a token that the checkout overrides) with every name coloured.
   Model: content/deep/inputs-outputs.mjs.
   ================================================================== */

const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

const OLD_DIR = 'track-clicks.ts — older style';

export default {
  topic: 'di-host-directives',
  tab: 'Tokens and host directives, name by name — The Angular Signal',
  title: { en: 'Tokens and host directives, name by name', ar: 'الـ tokens والـ host directives، اسم اسم' },
  say: {
    en: 'One click on a “Pay now” button followed through a host directive, an injection token and a local override, to the analytics call. Every name coloured, including the strings that are secretly names. Then what breaks when you rename each one.',
    ar: 'كليك واحدة على زرار «Pay now» ماشيين وراها في host directive، وinjection token، وoverride محلي، لحد نداء الـ analytics. كل اسم ملوّن، ومنهم النصوص اللي هي في السر أسماء. وبعدين إيه اللي بيبوظ لما تغيّر كل واحد.'
  },
  lead: {
    en: 'The idea is simple: <b>a token is a named slot for a value, and a host directive is behaviour a component wears.</b> The confusing part is the names. A token has a constant <b>and</b> a string that look the same and are not. <code>\'appTrack: track\'</code> hides two names in one string. And the name the page types, <code>track</code>, is not the name the directive declares. This page sorts every one of them.',
    ar: 'الفكرة بسيطة: <b>الـ token خانة ليها اسم بتشيل قيمة، والـ host directive سلوك الـ component بيلبسه.</b> اللي بيلخبط هو الأسماء. الـ token ليه constant <b>و</b>نص شكلهم زي بعض وهما مش كده. و<code>\'appTrack: track\'</code> مخبي اسمين في نص واحد. والاسم اللي الصفحة بتكتبه، <code>track</code>، مش هو الاسم اللي الـ directive معلنه. الصفحة دي بترتّب كل واحد فيهم.'
  },
  names: {
    note: {
      en: 'Almost everything here is orange, because DI is about files agreeing on names: the file that creates a token, the ones that provide it and the ones that inject it. The option keys around them (<code>provide</code>, <code>useValue</code>, <code>hostDirectives</code>, <code>inputs</code>…) are Angular’s.',
      ar: 'تقريبًا كل حاجة هنا برتقاني، عشان الـ DI كله ملفات بتتفق على أسماء: الملف اللي بيعمل الـ token، واللي بيعملوه provide، واللي بيعملوه inject. ومفاتيح الإعداد اللي حواليهم (<code>provide</code> و<code>useValue</code> و<code>hostDirectives</code> و<code>inputs</code>…) بتاعة أنجولار.'
    },
    names: [
      /* --- shared --- */
      { n:'TRACK_CONFIG', k:'pub', as:'SESAME', re:"(?<![\\w$'-])TRACK_CONFIG(?![\\w$'-])",
        w:{ en:'Your token: a constant exported from one file, provided in <code>Checkout</code> and injected in the directive. All of them import it. (The quoted copy is only a label; see “The fixed names”.)',
            ar:'الـ token بتاعك: constant متعمله export من ملف، وبيتعمله provide في <code>Checkout</code> وinject في الـ directive. وكلهم بيعملوه import. (النسخة اللي بين علامات التنصيص مجرد label؛ شوف “الأسماء الثابتة”.)' } },
      { n:'TrackConfig', k:'pub', w:{ en:'Your interface: the shape every value for the token must have.', ar:'الـ interface بتاعك: الشكل اللي لازم أي قيمة للـ token تبقى عليه.' } },
      { n:'area', k:'pub', w:{ en:'A field of <code>TrackConfig</code>, typed in the default, in the override and in the directive.', ar:'field في <code>TrackConfig</code>، مكتوب في القيمة الافتراضية وفي الـ override وفي الـ directive.' } },
      { n:'enabled', k:'pub', w:{ en:'A field of <code>TrackConfig</code>, typed in the same three places.', ar:'field في <code>TrackConfig</code>، مكتوب في نفس التلات أماكن.' } },
      { n:'TrackClicks', k:'pub', w:{ en:'The directive’s class. <code>CtaButton</code> names it in <code>hostDirectives</code>.', ar:'كلاس الـ directive. <code>CtaButton</code> بيكتبه في <code>hostDirectives</code>.' } },
      { n:'appTrack', k:'pub',
        w:{ en:'The directive’s input, and its selector. The left side of <code>\'appTrack: track\'</code> must repeat it exactly.', ar:'الـ input بتاع الـ directive، والـ selector بتاعه. والناحية الشمال من <code>\'appTrack: track\'</code> لازم تكرره بالظبط.' } },
      { n:'track', k:'pub', re:'(?<![\\w$/-])track(?![\\w$-])',
        w:{ en:'The public name <code>CtaButton</code> gives that input. Pages that use the button type <code>track="…"</code>.', ar:'الاسم الـ public اللي <code>CtaButton</code> بيدّيه للـ input ده. والصفحات اللي بتستخدم الزرار بتكتب <code>track="…"</code>.' } },
      { n:'Analytics', k:'pub', w:{ en:'Your service class, injected by the directive.', ar:'كلاس الـ service بتاعك، والـ directive بيعمله inject.' } },
      { n:'send', k:'pub', w:{ en:'The service’s method. The directive calls it; a fake in a test must have the same name.', ar:'ميثود الـ service. الـ directive بيناديها؛ وأي fake في تست لازم يبقى فيه نفس الاسم.' } },
      { n:'CtaButton', k:'pub', w:{ en:'The button’s class. <code>Checkout</code> imports it.', ar:'كلاس الزرار. <code>Checkout</code> بيعمله import.' } },
      { n:'app-cta-button', k:'pub', w:{ en:'The button’s selector: the string here and the tag in <code>Checkout</code> must match.', ar:'الـ selector بتاع الزرار: النص هنا والتاج في <code>Checkout</code> لازم يتطابقوا.' } },
      { n:'Checkout', k:'pub', w:{ en:'The checkout’s class, imported by whatever shows it.', ar:'كلاس الـ checkout، وأي حتة بتعرضه بتعمله import.' } },
      { n:'app-checkout', k:'pub', w:{ en:'Its selector.', ar:'الـ selector بتاعه.' } },

      /* --- yours, one file --- */
      { n:'config', k:'mine', re:'(?<![\\w$/-])config(?![\\w$-])', w:{ en:'The directive’s private field holding the injected value.', ar:'الـ field الخاص بالـ directive اللي شايل القيمة المتعملها inject.' } },
      { n:'analytics', k:'mine', re:'(?<=this\\.|readonly |private )analytics(?![\\w$-])', w:{ en:'The directive’s private field holding the service.', ar:'الـ field الخاص بالـ directive اللي شايل الـ service.' } },
      { n:'onClick', k:'mine', w:{ en:'The directive’s method. The <code>host</code> string names it too, in the same file.', ar:'ميثود الـ directive. نص الـ <code>host</code> بيكتبها برضه، في نفس الملف.' } },
      { n:'eventName', k:'mine', w:{ en:'The parameter of <code>send</code>.', ar:'الـ parameter بتاع <code>send</code>.' } },

      /* --- Angular's, the browser's --- */
      { n:'InjectionToken', k:'ng', w:{ en:'Angular’s class for a key you can inject when there is no class to use as the key.', ar:'الكلاس بتاع أنجولار لمفتاح تقدر تعمله inject لما مفيش كلاس تستخدمه كمفتاح.' } },
      { n:'inject', k:'ng', w:{ en:'Angular’s function: ask the injector for a value by its token or class.', ar:'الـ function بتاعة أنجولار: اطلب من الـ injector قيمة بالـ token أو الكلاس بتاعها.' } },
      { n:'providedIn', k:'ng', w:{ en:'An option key: where the default lives.', ar:'مفتاح إعداد: القيمة الافتراضية عايشة فين.' } },
      { n:'root', k:'ng', re:"(?<=')root(?=')", w:{ en:'Angular’s value for <code>providedIn</code>: the whole app.', ar:'قيمة أنجولار لـ <code>providedIn</code>: التطبيق كله.' } },
      { n:'factory', k:'ng', w:{ en:'An option key: the function that builds the default value.', ar:'مفتاح إعداد: الـ function اللي بتبني القيمة الافتراضية.' } },
      { n:'providers', k:'ng', w:{ en:'Angular’s list of “when someone here asks for X, give Y” rules.', ar:'قايمة أنجولار بتاعة قواعد «لما حد هنا يطلب X، ادّيله Y».' } },
      { n:'provide', k:'ng', w:{ en:'A provider key: which token this rule answers.', ar:'مفتاح provider: القاعدة دي بترد على أنهي token.' } },
      { n:'useValue', k:'ng', w:{ en:'A provider key: hand out this exact object.', ar:'مفتاح provider: ادّي الـ object ده زي ما هو.' } },
      { n:'hostDirectives', k:'ng', w:{ en:'Angular’s key for attaching directives to a component from the inside.', ar:'مفتاح أنجولار اللي بيلزق directives على الـ component من جوه.' } },
      { n:'directive', k:'ng', re:'(?<![\\w$-])directive(?=:)', w:{ en:'A key inside <code>hostDirectives</code>: which directive class.', ar:'مفتاح جوه <code>hostDirectives</code>: أنهي كلاس directive.' } },
      { n:'inputs', k:'ng', w:{ en:'A key inside <code>hostDirectives</code>. The strings in it are yours: <code>\'directiveInput: publicName\'</code>.', ar:'مفتاح جوه <code>hostDirectives</code>. النصوص اللي جواه بتاعتك: <code>\'directiveInput: publicName\'</code>.' } },
      { n:'host', k:'ng', re:'(?<![\\w$-])host(?=:)', w:{ en:'An option key: bindings and listeners on the element the directive sits on.', ar:'مفتاح إعداد: bindings وlisteners على العنصر اللي الـ directive قاعد عليه.' } },
      { n:'click', k:'ng', w:{ en:'The browser’s event name.', ar:'اسم الـ event بتاع المتصفح.' } },
      { n:'@Directive', k:'ng', w:{ en:'Angular’s decorator for a directive.', ar:'الـ decorator بتاع أنجولار للـ directive.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator.', ar:'الـ decorator بتاع أنجولار.' } },
      { n:'@Injectable', k:'ng', w:{ en:'Angular’s decorator for a service.', ar:'الـ decorator بتاع أنجولار للـ service.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The string after it is yours.', ar:'مفتاح إعداد. النص اللي بعده بتاعك.' } },
      { n:'template', k:'ng', re:'(?<![\\w$-])template(?=:)', w:{ en:'An option key.', ar:'مفتاح إعداد.' } },
      { n:'imports', k:'ng', w:{ en:'An option key: what this template may use.', ar:'مفتاح إعداد: التمبلت ده مسموح له يستخدم إيه.' } },
      { n:'ng-content', k:'ng', w:{ en:'Angular’s tag for “put what the page wrote between my tags here”.', ar:'تاج أنجولار اللي معناه «حط هنا اللي الصفحة كتبته بين التاجات بتوعي».' } },
      { n:'input', k:'ng', re:'(?<![\\w$<(-])input(?=[.(<,])', w:{ en:'Angular’s function that creates an input.', ar:'الـ function بتاعة أنجولار اللي بتعمل input.' } },
      { n:'required', k:'ng', re:'(?<=\\.)required(?![\\w$-])|(?<=\\{ )required(?=:)', w:{ en:'Part of Angular’s input API: this input must be set.', ar:'جزء من API الـ inputs في أنجولار: الـ input ده لازم يتحط.' } },
      { n:'navigator', k:'ng', w:{ en:'The browser’s object for things about the browser itself.', ar:'الـ object بتاع المتصفح للحاجات اللي تخص المتصفح نفسه.' } },
      { n:'sendBeacon', k:'ng', w:{ en:'The browser’s fire-and-forget request, made for analytics.', ar:'request بتاع المتصفح بيتبعت ومبيستناش رد، معمول للـ analytics.' } },
      { n:'@Input', k:'ng', w:{ en:'The older input decorator.', ar:'الـ decorator القديم للـ input.' } },
      { n:'@Inject', k:'ng', w:{ en:'The older decorator that names a token for a constructor parameter.', ar:'الـ decorator القديم اللي بيحدد token لـ parameter في الـ constructor.' } },
      { n:'@HostListener', k:'ng', w:{ en:'The older decorator that listens to an event on the host element.', ar:'الـ decorator القديم اللي بيسمع event على العنصر الـ host.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One click, six stops', ar: 'كليك واحدة، ست محطات' },
    lead: {
      en: 'A checkout page shows a <b>Pay now</b> button. Every click on it must be reported to analytics as <code>checkout:pay_now</code>. The button does not track clicks itself: it wears a directive that does. The directive reads its settings from a token, and the checkout page overrides them. Follow the click:',
      ar: 'صفحة checkout فيها زرار <b>Pay now</b>. أي كليك عليه لازم يتبلّغ للـ analytics كـ <code>checkout:pay_now</code>. الزرار مش بيتتبع الكليكات بنفسه: هو لابس directive بيعمل كده. والـ directive بيقرا إعداداته من token، وصفحة الـ checkout بتغيّرها. امشي ورا الكليك:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'checkout.ts', lang: 'html', who: { en: 'page · uses the button', ar: 'الصفحة · بتستخدم الزرار' },
          code: ['<app-cta-button track="pay_now">Pay now</app-cta-button>'],
          say: { en: `The page types ${pub('app-cta-button')} and sets ${pub('track')}. It has no idea a directive is involved. ${pub('track')} is orange because the button decided that name, and the page must copy it.`,
                 ar: `الصفحة بتكتب ${pub('app-cta-button')} وبتحط ${pub('track')}. ومعندهاش أي فكرة إن فيه directive في الموضوع. و${pub('track')} برتقاني عشان الزرار هو اللي قرر الاسم ده، والصفحة لازم تنسخه.` } },
        { file: 'cta-button.ts', lang: 'ts', who: { en: 'button · wears the directive', ar: 'الزرار · لابس الـ directive' },
          code: ['hostDirectives: [', "  { directive: TrackClicks, inputs: ['appTrack: track'] },", '],'],
          say: { en: `${ng('hostDirectives')}, ${ng('directive')} and ${ng('inputs')} are Angular’s keys. The string holds <b>two</b> names: on the left the directive’s real input ${pub('appTrack')}, on the right the public name ${pub('track')} that pages use.`,
                 ar: `${ng('hostDirectives')} و${ng('directive')} و${ng('inputs')} مفاتيح أنجولار. والنص فيه <b>اسمين</b>: على الشمال الـ input الحقيقي بتاع الـ directive ${pub('appTrack')}، وعلى اليمين الاسم الـ public ${pub('track')} اللي الصفحات بتستخدمه.` } },
        { file: 'track-clicks.ts', lang: 'ts', who: { en: 'directive · hears the click', ar: 'الـ directive · بيسمع الكليك' },
          code: ["host: { '(click)': 'onClick()' },", '', 'readonly appTrack = input.required<string>();'],
          say: { en: `${ng('host')} listens on the element the directive sits on, here <code>&lt;app-cta-button&gt;</code>. ${ng('click')} is the browser’s; ${mine('onClick')} is the directive’s own method, named inside a string. ${pub('appTrack')} now holds <code>'pay_now'</code>.`,
                 ar: `${ng('host')} بيسمع على العنصر اللي الـ directive قاعد عليه، هنا <code>&lt;app-cta-button&gt;</code>. و${ng('click')} بتاع المتصفح؛ و${mine('onClick')} ميثود الـ directive نفسه، مكتوبة جوه نص. و${pub('appTrack')} دلوقتي شايل <code>'pay_now'</code>.` } },
        { file: 'track-clicks.ts', lang: 'ts', who: { en: 'directive · asks for settings', ar: 'الـ directive · بيطلب الإعدادات' },
          code: ['private readonly config = inject(TRACK_CONFIG);'],
          say: { en: `${ng('inject')} asks for whatever is registered under ${pub('TRACK_CONFIG')}. Angular looks upward from the button, and the first place it finds is the checkout page. ${mine('config')} is the directive’s own name for the answer.`,
                 ar: `${ng('inject')} بتطلب أي حاجة متسجلة تحت ${pub('TRACK_CONFIG')}. أنجولار بيدوّر لفوق من الزرار، وأول مكان بيلاقيه هو صفحة الـ checkout. و${mine('config')} اسم الـ directive نفسه للإجابة.` } },
        { file: 'checkout.ts', lang: 'ts', who: { en: 'page · the override', ar: 'الصفحة · الـ override' },
          code: ["{ provide: TRACK_CONFIG, useValue: { area: 'checkout', enabled: true } },"],
          say: { en: `${ng('provide')} and ${ng('useValue')} are Angular’s keys. ${pub('TRACK_CONFIG')} is the same imported constant. ${pub('area')} and ${pub('enabled')} are the fields of your ${pub('TrackConfig')} interface. Everything inside this page sees this value; nothing outside does.`,
                 ar: `${ng('provide')} و${ng('useValue')} مفاتيح أنجولار. و${pub('TRACK_CONFIG')} نفس الـ constant المتعمله import. و${pub('area')} و${pub('enabled')} الـ fields بتاعة الـ interface ${pub('TrackConfig')} بتاعك. كل حاجة جوه الصفحة دي بتشوف القيمة دي؛ ومفيش حاجة برّه بتشوفها.` } },
        { file: 'track-clicks.ts', lang: 'ts', who: { en: 'directive · reports', ar: 'الـ directive · بيبلّغ' },
          code: ['this.analytics.send(`${this.config.area}:${this.appTrack()}`);'],
          say: { en: `${mine('analytics')} is the directive’s field for your ${pub('Analytics')} service, and ${pub('send')} is its method. Out goes <code>checkout:pay_now</code>.`,
                 ar: `${mine('analytics')} الـ field بتاع الـ directive للـ service ${pub('Analytics')} بتاعتك، و${pub('send')} الميثود بتاعتها. وبيطلع <code>checkout:pay_now</code>.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'Page: <code>track="pay_now"</code>. Button: <code>\'appTrack: track\'</code> translates it. Directive: <code>inject(TRACK_CONFIG)</code>, answered by the page’s <code>provide: TRACK_CONFIG</code>. Two chains of names must match: <b>track → appTrack</b>, and <b>TRACK_CONFIG</b> everywhere it is created, provided and injected.',
        ar: 'الصفحة: <code>track="pay_now"</code>. الزرار: <code>\'appTrack: track\'</code> بيترجمه. الـ directive: <code>inject(TRACK_CONFIG)</code>، والإجابة من <code>provide: TRACK_CONFIG</code> بتاع الصفحة. فيه سلسلتين أسماء لازم يتطابقوا: <b>track ← appTrack</b>، و<b>TRACK_CONFIG</b> في كل مكان بيتعمل فيه وبيتعمله provide وinject.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Which file?', ar: 'أنهي ملف؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'A token lives in three kinds of place, and a host directive in three more. Each has one job.',
      ar: 'الـ token عايش في تلات أنواع أماكن، والـ host directive في تلاتة كمان. وكل واحد ليه شغلانة واحدة.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>new InjectionToken&lt;TrackConfig&gt;(…)</code>', '<code>track-config.ts</code>', 'you, once', `you pick ${pub('TRACK_CONFIG')}; ${ng('InjectionToken')}, ${ng('providedIn')}, ${ng('factory')} are Angular’s`],
            ar: ['<code>new InjectionToken&lt;TrackConfig&gt;(…)</code>', '<code>track-config.ts</code>', 'انت، مرة واحدة', `انت بتختار ${pub('TRACK_CONFIG')}؛ و${ng('InjectionToken')} و${ng('providedIn')} و${ng('factory')} بتوع أنجولار`] },
          { en: ['<code>{ provide: TRACK_CONFIG, useValue: … }</code>', '<code>checkout.ts</code>', 'whoever wants a different value below it', `${pub('TRACK_CONFIG')} is copied; ${ng('provide')} and ${ng('useValue')} are Angular’s`],
            ar: ['<code>{ provide: TRACK_CONFIG, useValue: … }</code>', '<code>checkout.ts</code>', 'أي حد عايز قيمة مختلفة للي تحته', `${pub('TRACK_CONFIG')} منسوخ؛ و${ng('provide')} و${ng('useValue')} بتوع أنجولار`] },
          { en: ['<code>inject(TRACK_CONFIG)</code>', '<code>track-clicks.ts</code>', 'whoever needs the value', `you pick ${mine('config')}; the token is copied`],
            ar: ['<code>inject(TRACK_CONFIG)</code>', '<code>track-clicks.ts</code>', 'أي حد محتاج القيمة', `انت بتختار ${mine('config')}؛ والـ token منسوخ`] },
          { en: ['<code>readonly appTrack = input.required()</code>', '<code>track-clicks.ts</code>', 'the directive', `you pick ${pub('appTrack')} and ${mine('onClick')}`],
            ar: ['<code>readonly appTrack = input.required()</code>', '<code>track-clicks.ts</code>', 'الـ directive', `انت بتختار ${pub('appTrack')} و${mine('onClick')}`] },
          { en: ["<code>inputs: ['appTrack: track']</code>", '<code>cta-button.ts</code>', 'the component wearing it', `left copies the directive; you pick the right, ${pub('track')}`],
            ar: ["<code>inputs: ['appTrack: track']</code>", '<code>cta-button.ts</code>', 'الـ component اللي لابسه', `الشمال بينسخ الـ directive؛ وانت بتختار اليمين، ${pub('track')}`] },
          { en: ['<code>track="pay_now"</code>', '<code>checkout.ts</code>', 'every page that uses the button', `${pub('track')} copies the button`],
            ar: ['<code>track="pay_now"</code>', '<code>checkout.ts</code>', 'كل صفحة بتستخدم الزرار', `${pub('track')} بينسخ الزرار`] },
        ] },
      { t: 'ul',
        en: ['<b>Everyone imports the same constant.</b> The file that creates the token, the ones that provide it and the ones that inject it all type <code>TRACK_CONFIG</code>, imported from one file.',
             '<b>Providers flow down.</b> A value in <code>Checkout</code>’s <code>providers</code> is seen by everything inside <code>Checkout</code>’s template, and by nothing outside it.',
             '<b>The page never sees the directive.</b> It types the button’s name for the input, <code>track</code>. The button translates it to <code>appTrack</code>.'],
        ar: ['<b>الكل بيعمل import لنفس الـ constant.</b> الملف اللي بيعمل الـ token، واللي بيعملوه provide، واللي بيعملوه inject، كلهم بيكتبوا <code>TRACK_CONFIG</code>، متعمله import من ملف واحد.',
             '<b>الـ providers بتنزل لتحت.</b> القيمة اللي في <code>providers</code> بتاعة <code>Checkout</code> بتشوفها كل حاجة جوه تمبلت <code>Checkout</code>، ومفيش حاجة برّه بتشوفها.',
             '<b>الصفحة عمرها ما بتشوف الـ directive.</b> هي بتكتب اسم الزرار للـ input، <code>track</code>. والزرار بيترجمه لـ <code>appTrack</code>.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All five files, every name coloured', ar: 'الخمس ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same example, complete. Hover a coloured name to light up everywhere else it appears. Then press <b>Rename test</b>: every name you own turns into a made-up word, including the two inside <code>\'appTrack: track\'</code>, and the code still works.',
      ar: 'نفس المثال، كامل. قف بالماوس على أي اسم ملوّن وهتنوّر كل الأماكن التانية اللي هو فيها. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: كل اسم بتاعك هيبقى كلمة عشوائية، ومنهم الاتنين اللي جوه <code>\'appTrack: track\'</code>، والكود لسه شغال.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'track-config.ts', lang: 'ts', tag: { en: 'the token', ar: 'الـ token' }, code: [
        "import { InjectionToken } from '@angular/core';",
        '',
        'export interface TrackConfig {',
        '  area: string;',
        '  enabled: boolean;',
        '}',
        '',
        "export const TRACK_CONFIG = new InjectionToken<TrackConfig>('TRACK_CONFIG', {",
        "  providedIn: 'root',",
        "  factory: () => ({ area: 'app', enabled: true }),   // the default",
        '});' ] },
      { t: 'code', name: 'analytics.ts', lang: 'ts', tag: { en: 'the service', ar: 'الـ service' }, code: [
        "import { Injectable } from '@angular/core';",
        '',
        "@Injectable({ providedIn: 'root' })",
        'export class Analytics {',
        '  send(eventName: string) {',
        "    navigator.sendBeacon('/api/track', eventName);",
        '  }',
        '}' ] },
      { t: 'code', name: 'track-clicks.ts', lang: 'ts', tag: { en: 'the behaviour', ar: 'السلوك' }, code: [
        "import { Directive, inject, input } from '@angular/core';",
        "import { Analytics } from './analytics';",
        "import { TRACK_CONFIG } from './track-config';",
        '',
        '@Directive({',
        "  selector: '[appTrack]',",
        "  host: { '(click)': 'onClick()' },",
        '})',
        'export class TrackClicks {',
        '  readonly appTrack = input.required<string>();      // the event name',
        '  private readonly config = inject(TRACK_CONFIG);',
        '  private readonly analytics = inject(Analytics);',
        '',
        '  onClick() {',
        '    if (!this.config.enabled) return;',
        '    this.analytics.send(`${this.config.area}:${this.appTrack()}`);',
        '  }',
        '}' ] },
      { t: 'code', name: 'cta-button.ts', lang: 'ts', tag: { en: 'wears it', ar: 'لابسه' }, code: [
        "import { Component } from '@angular/core';",
        "import { TrackClicks } from './track-clicks';",
        '',
        '@Component({',
        "  selector: 'app-cta-button',",
        '  hostDirectives: [',
        "    { directive: TrackClicks, inputs: ['appTrack: track'] },",
        '  ],',
        '  template: `<button><ng-content /></button>`,',
        '})',
        'export class CtaButton {}' ] },
      { t: 'code', name: 'checkout.ts', lang: 'ts', tag: { en: 'uses it, overrides the token', ar: 'بيستخدمه، وبيغيّر الـ token' }, code: [
        "import { Component } from '@angular/core';",
        "import { CtaButton } from './cta-button';",
        "import { TRACK_CONFIG } from './track-config';",
        '',
        '@Component({',
        "  selector: 'app-checkout',",
        '  imports: [CtaButton],',
        '  providers: [',
        "    { provide: TRACK_CONFIG, useValue: { area: 'checkout', enabled: true } },",
        '  ],',
        '  template: `<app-cta-button track="pay_now">Pay now</app-cta-button>`,',
        '})',
        'export class Checkout {}' ] },
      { t: 'nmtable' }
    ]
  },

  /* ------------------------------------------------------------ 4 */
  {
    id: 'rename',
    kicker: { en: 'Is it OK to change it?', ar: 'ينفع أغيّره؟' },
    title: { en: 'What breaks when you rename each name', ar: 'إيه اللي بيبوظ لما تغيّر كل اسم' },
    lead: {
      en: 'Imports protect most of these names. The ones inside strings and inside <code>useValue</code> are only as safe as your typing.',
      ar: 'الـ imports بتحمي أغلب الأسماء دي. أما اللي جوه نصوص وجوه <code>useValue</code> فأمانهم على قد دقتك في الكتابة.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [pub('TRACK_CONFIG') + ' (the constant)', 'every import, <code>provide:</code> and <code>inject()</code>', 'Compile error on the import.'],
            ar: [pub('TRACK_CONFIG') + ' (الـ constant)', 'كل import و<code>provide:</code> و<code>inject()</code>', 'Compile error في الـ import.'] },
          { en: ["<code>'TRACK_CONFIG'</code> (the label)", 'nothing', 'Nothing breaks. It only appears in error messages.'],
            ar: ["<code>'TRACK_CONFIG'</code> (الـ label)", 'ولا حاجة', 'مفيش حاجة بتبوظ. هو بيظهر بس في رسايل الـ error.'] },
          { en: [`${pub('area')}, ${pub('enabled')}`, 'the interface, the <code>factory</code>, the directive, <b>and</b> every <code>useValue</code>', 'Compile errors in the interface, factory and directive. <b>Not</b> in <code>useValue</code>, which accepts any object: the override silently sends <code>undefined</code>.'],
            ar: [`${pub('area')} و${pub('enabled')}`, 'الـ interface والـ <code>factory</code> والـ directive، <b>و</b>كل <code>useValue</code>', 'Compile errors في الـ interface والـ factory والـ directive. <b>مش</b> في <code>useValue</code>، اللي بيقبل أي object: الـ override بيبعت <code>undefined</code> في صمت.'] },
          { en: [pub('appTrack'), 'the selector string, and the left side of <code>\'appTrack: track\'</code>', 'Angular reports that the directive has no input with the old name.'],
            ar: [pub('appTrack'), 'نص الـ selector، والناحية الشمال من <code>\'appTrack: track\'</code>', 'أنجولار بيقول إن الـ directive معندوش input بالاسم القديم.'] },
          { en: [pub('track'), 'every page’s <code>track="…"</code>', 'The old attribute sets nothing, and since <code>appTrack</code> is required you get a required-input error instead of a click report.'],
            ar: [pub('track'), 'كل <code>track="…"</code> في الصفحات', 'الـ attribute القديم مش بيحط حاجة، وعشان <code>appTrack</code> required هتاخد error بتاع required input بدل تبليغ الكليك.'] },
          { en: [`${pub('TrackClicks')}, ${pub('CtaButton')}, ${pub('Checkout')}, ${pub('Analytics')}`, 'every import and every place that lists the class', 'Compile error on the import.'],
            ar: [`${pub('TrackClicks')} و${pub('CtaButton')} و${pub('Checkout')} و${pub('Analytics')}`, 'كل import وكل مكان مكتوب فيه الكلاس', 'Compile error في الـ import.'] },
          { en: [`${pub('app-cta-button')}, ${pub('app-checkout')}`, 'the tag in the templates that use them', 'Compile error: “is not a known element”.'],
            ar: [`${pub('app-cta-button')} و${pub('app-checkout')}`, 'التاج في التمبلتس اللي بتستخدمهم', 'Compile error: «is not a known element».'] },
          { en: [pub('send'), 'the directive’s call, and any fake service in tests', 'Compile error in the directive.'],
            ar: [pub('send'), 'النداء في الـ directive، وأي service مزيفة في التستات', 'Compile error في الـ directive.'] },
          { en: [mine('onClick'), 'the <code>\'onClick()\'</code> string in <code>host</code>', 'Depending on your Angular version and settings, a compile error or an error on the first click. Keep them together.'],
            ar: [mine('onClick'), 'النص <code>\'onClick()\'</code> في <code>host</code>', 'على حسب نسخة أنجولار والإعدادات، compile error أو error مع أول كليك. خلّيهم مع بعض.'] },
          { en: [`${mine('config')}, ${mine('analytics')}, ${mine('eventName')}`, 'only inside that class', 'Compile error inside it.'],
            ar: [`${mine('config')} و${mine('analytics')} و${mine('eventName')}`, 'جوه الكلاس ده بس', 'Compile error جواه.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b> above the files. Watch <code>\'appTrack: track\'</code>: both halves change, each one together with its partner in another file. The quoted <code>\'TRACK_CONFIG\'</code> label stays, because it is not a name anything looks up.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b> فوق الملفات. بص على <code>\'appTrack: track\'</code>: النصين بيتغيروا، كل واحد مع شريكه في ملف تاني. والـ label <code>\'TRACK_CONFIG\'</code> اللي بين علامات التنصيص بيفضل، عشان مش اسم حاجة بتدوّر عليه.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتاعتك' },
    title: { en: 'The fixed names, and two strings that are not what they look like', ar: 'الأسماء الثابتة، ونصين مش زي ما شكلهم' },
    lead: {
      en: 'The option keys are Angular’s and you type them exactly; a typo in any of them is a compile error. The strings are where it gets confusing.',
      ar: 'مفاتيح الإعداد بتاعة أنجولار وبتكتبها زي ما هي؛ وأي غلطة إملائية فيهم بتطلع compile error. النصوص هي اللي بتلخبط.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Owner', 'Names', 'What they are'], ar: ['صاحبها', 'الأسماء', 'هي إيه'] },
        rows: [
          { en: ['Angular DI', `${ng('InjectionToken')}, ${ng('inject')}, ${ng('providedIn')}, ${ng('factory')}, ${ng('providers')}, ${ng('provide')}, ${ng('useValue')}`, 'Make a token, give it a default, override it, ask for it.'],
            ar: ['الـ DI بتاع أنجولار', `${ng('InjectionToken')} و${ng('inject')} و${ng('providedIn')} و${ng('factory')} و${ng('providers')} و${ng('provide')} و${ng('useValue')}`, 'اعمل token، ادّيله قيمة افتراضية، غيّرها، اطلبه.'] },
          { en: ['Angular composition', `${ng('hostDirectives')}, ${ng('directive')}, ${ng('inputs')}, ${ng('host')}`, 'Attach a directive from inside a component, expose its inputs, listen on the host element.'],
            ar: ['التركيب في أنجولار', `${ng('hostDirectives')} و${ng('directive')} و${ng('inputs')} و${ng('host')}`, 'الزق directive من جوه component، طلّع الـ inputs بتاعته، واسمع على العنصر الـ host.'] },
          { en: ['The browser', `${ng('click')}, ${ng('navigator')}, ${ng('sendBeacon')}`, 'The event name, and the request made for analytics.'],
            ar: ['المتصفح', `${ng('click')} و${ng('navigator')} و${ng('sendBeacon')}`, 'اسم الـ event، والـ request المعمول للـ analytics.'] },
        ] },
      { t: 'step', n: '1', title: { en: 'The token’s label is not its name', ar: 'الـ label بتاع الـ token مش اسمه' }, blocks: [
        { t: 'p',
          en: `In <code>new InjectionToken&lt;TrackConfig&gt;('TRACK_CONFIG', …)</code> the quoted text is a <b>description</b>. Angular never looks anything up by it. The real key is the object stored in the constant ${pub('TRACK_CONFIG')}. The label only shows up when something goes wrong, for example “No provider for InjectionToken TRACK_CONFIG”. Keep it equal to the constant’s name so that message points at the right file.`,
          ar: `في <code>new InjectionToken&lt;TrackConfig&gt;('TRACK_CONFIG', …)</code> النص اللي بين علامات التنصيص <b>وصف</b>. أنجولار عمره ما بيدوّر على حاجة بيه. المفتاح الحقيقي هو الـ object المتخزن في الـ constant ${pub('TRACK_CONFIG')}. والـ label بيظهر بس لما حاجة تبوظ، مثلًا «No provider for InjectionToken TRACK_CONFIG». خلّيه زي اسم الـ constant عشان الرسالة دي تشاور على الملف الصح.` }
      ]},
      { t: 'step', n: '2', title: { en: 'Two names in one string', ar: 'اسمين في نص واحد' }, blocks: [
        { t: 'p',
          en: `<code>'appTrack: track'</code> is a tiny language Angular reads: <b>the directive’s input name, a colon, the name the host shows the world</b>. Angular checks the left half against ${pub('TrackClicks')}. The right half is yours to invent. With no colon, the input keeps its own name: <code>inputs: ['appTrack']</code>.`,
          ar: `<code>'appTrack: track'</code> لغة صغيرة أنجولار بيقراها: <b>اسم الـ input بتاع الـ directive، نقطتين فوق بعض، والاسم اللي الـ host بيطلّعه للدنيا</b>. أنجولار بيراجع النص الشمال على ${pub('TrackClicks')}. والنص اليمين انت اللي بتألفه. ومن غير النقطتين، الـ input بيفضل باسمه: <code>inputs: ['appTrack']</code>.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'Angular accepts any of these names. The habits below make a token look like a token and keep a directive’s name out of the pages that use it.',
      ar: 'أنجولار بيقبل أي اسم من دول. العادات اللي تحت بتخلي الـ token شكله token، وبتخلي اسم الـ directive بعيد عن الصفحات اللي بتستخدمه.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['a token', '<code>TRACK_CONFIG</code>, <code>API_URL</code>', '<code>trackConfig</code>, <code>TrackConfigToken</code>', 'Capitals with underscores, like Angular’s own <code>HTTP_INTERCEPTORS</code> and <code>DOCUMENT</code>. It also keeps it apart from the interface.'],
            ar: ['token', '<code>TRACK_CONFIG</code>، <code>API_URL</code>', '<code>trackConfig</code>، <code>TrackConfigToken</code>', 'حروف كابيتال وبينهم underscore، زي tokens أنجولار نفسها <code>HTTP_INTERCEPTORS</code> و<code>DOCUMENT</code>. وكمان بتفرّقه عن الـ interface.'] },
          { en: ['its label', 'the same text as the constant', '<code>\'\'</code>, <code>\'config\'</code>', 'The label is what an error message shows. Make it findable.'],
            ar: ['الـ label بتاعه', 'نفس نص الـ constant', '<code>\'\'</code>، <code>\'config\'</code>', 'الـ label هو اللي رسالة الـ error بتعرضه. خلّيه سهل تلاقيه.'] },
          { en: ['its type', '<code>TrackConfig</code>', '<code>ITrackConfig</code>', 'A plain noun, matching the token’s name.'],
            ar: ['النوع بتاعه', '<code>TrackConfig</code>', '<code>ITrackConfig</code>', 'اسم عادي، ماشي مع اسم الـ token.'] },
          { en: ['a directive’s selector and input', '<code>[appTrack]</code> and <code>appTrack</code>', 'different names for the two', 'Used directly, <code>&lt;button appTrack="x"&gt;</code> then applies the directive and sets the input in one attribute.'],
            ar: ['الـ selector والـ input بتوع الـ directive', '<code>[appTrack]</code> و<code>appTrack</code>', 'اسمين مختلفين للاتنين', 'لو اتستخدم على طول، <code>&lt;button appTrack="x"&gt;</code> بيطبّق الـ directive ويحط الـ input في attribute واحد.'] },
          { en: ['the name the host exposes', '<code>track</code>: short, plain', '<code>appTrack</code> again', 'Pages should not have to know which directive is inside the button.'],
            ar: ['الاسم اللي الـ host بيطلّعه', '<code>track</code>: قصير وبسيط', '<code>appTrack</code> تاني', 'الصفحات مش المفروض تعرف أنهي directive جوه الزرار.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Two places where the name is not free', ar: 'مكانين الاسم فيهم مش براحتك' },
    lead: {
      en: 'Inside the <code>inputs</code> string the order is the rule. And a name that looks important, the directive’s selector, turns out not to matter at all here.',
      ar: 'جوه نص الـ <code>inputs</code> الترتيب هو القاعدة. واسم شكله مهم، الـ selector بتاع الـ directive، طلع مالوش أي لازمة هنا.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'Directive’s name first, public name second', ar: 'اسم الـ directive الأول، والاسم الـ public تاني' }, blocks: [
        { t: 'pair',
          bad:  { name: 'cta-button.ts', lang: 'ts', code: ["{ directive: TrackClicks, inputs: ['track: appTrack'] },"] },
          good: { name: 'cta-button.ts', lang: 'ts', code: ["{ directive: TrackClicks, inputs: ['appTrack: track'] }," ] } },
        { t: 'p',
          en: `The left one is backwards. Angular looks for an input called <code>track</code> on ${pub('TrackClicks')}, finds none, and reports an error. Read it as “take ${pub('appTrack')} and call it ${pub('track')}”.`,
          ar: `اللي على الشمال بالمقلوب. أنجولار بيدوّر على input اسمه <code>track</code> في ${pub('TrackClicks')}، مش بيلاقي، وبيطلّع error. اقراها كده: «خد ${pub('appTrack')} وسمّيه ${pub('track')}».` }
      ]},
      { t: 'step', n: 'B', title: { en: 'A host directive’s selector is ignored', ar: 'الـ selector بتاع الـ host directive بيتجاهل' }, blocks: [
        { t: 'p',
          en: `The directive declares <code>selector: '[appTrack]'</code>, yet <code>&lt;app-cta-button&gt;</code> never has an <code>appTrack</code> attribute. That is fine: when a directive is listed in ${ng('hostDirectives')}, Angular ignores its selector and applies it to every instance of the component. The selector only matters when someone puts the directive on an element directly.`,
          ar: `الـ directive معلن <code>selector: '[appTrack]'</code>، ومع ذلك <code>&lt;app-cta-button&gt;</code> عمره ما بيبقى عليه attribute اسمه <code>appTrack</code>. وده عادي: لما directive يتكتب في ${ng('hostDirectives')}، أنجولار بيتجاهل الـ selector بتاعه وبيطبّقه على كل نسخة من الـ component. الـ selector بيفرق بس لما حد يحط الـ directive على عنصر على طول.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: 'Decorators and constructor injection: same names', ar: 'الـ decorators والـ injection في الـ constructor: نفس الأسماء' },
    lead: {
      en: 'Older directives use <code>@Input</code>, <code>@HostListener</code> and constructor parameters. Your names are identical; only Angular’s words move.',
      ar: 'الـ directives الأقدم بتستخدم <code>@Input</code> و<code>@HostListener</code> وparameters في الـ constructor. أسماءك هي هي؛ كلمات أنجولار بس اللي بتتحرك.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: OLD_DIR, lang: 'ts', code: [
          "@Directive({ selector: '[appTrack]' })",
          'export class TrackClicks {',
          '  @Input({ required: true }) appTrack!: string;',
          '',
          '  constructor(',
          '    @Inject(TRACK_CONFIG) private config: TrackConfig,',
          '    private analytics: Analytics,',
          '  ) {}',
          '',
          "  @HostListener('click')",
          '  onClick() {',
          '    if (!this.config.enabled) return;',
          '    this.analytics.send(`${this.config.area}:${this.appTrack}`);',
          '  }',
          '}' ] },
        good: { name: 'track-clicks.ts — today', lang: 'ts', code: [
          '@Directive({',
          "  selector: '[appTrack]',",
          "  host: { '(click)': 'onClick()' },",
          '})',
          'export class TrackClicks {',
          '  readonly appTrack = input.required<string>();',
          '  private readonly config = inject(TRACK_CONFIG);',
          '  private readonly analytics = inject(Analytics);',
          '',
          '  onClick() {',
          '    if (!this.config.enabled) return;',
          '    this.analytics.send(`${this.config.area}:${this.appTrack()}`);',
          '  }',
          '}' ] } },
      { t: 'p',
        en: `Same ${pub('appTrack')}, ${mine('config')}, ${mine('analytics')} and ${mine('onClick')}. Two differences worth knowing. First, ${ng('@Inject')}<code>(TRACK_CONFIG)</code> was needed because <code>TrackConfig</code> is an interface, and interfaces vanish when TypeScript compiles; the token is the only thing left to look up. Second, with ${ng('@HostListener')} the method name is not typed in any string, so renaming it is safe; with ${ng('host')} the string must follow.`,
        ar: `نفس ${pub('appTrack')} و${mine('config')} و${mine('analytics')} و${mine('onClick')}. فيه فرقين يستاهلوا تعرفهم. الأول، ${ng('@Inject')}<code>(TRACK_CONFIG)</code> كان لازم عشان <code>TrackConfig</code> ده interface، والـ interfaces بتختفي لما TypeScript يعمل compile؛ والـ token هو الحاجة الوحيدة اللي فاضلة يتدوّر بيها. التاني، مع ${ng('@HostListener')} اسم الميثود مش مكتوب في أي نص، فتغييره آمن؛ ومع ${ng('host')} النص لازم يتغير وراه.` }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, and says nothing', ar: 'مش بيعمل حاجة، ومش بيقول حاجة' },
    title: { en: 'Mistakes that fail silently', ar: 'غلطات بتفشل في صمت' },
    lead: {
      en: 'Because the token has a default, a broken override does not crash. The app keeps working with the default value, and the reports just say <code>app:pay_now</code> instead of <code>checkout:pay_now</code>.',
      ar: 'عشان الـ token ليه قيمة افتراضية، الـ override البايظ مش بيوقّع حاجة. التطبيق بيفضل شغال بالقيمة الافتراضية، والتقارير بس بتقول <code>app:pay_now</code> بدل <code>checkout:pay_now</code>.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'Providing a string instead of the token', ar: 'إنك تعمل provide لنص بدل الـ token' }, blocks: [
        { t: 'pair',
          bad:  { name: 'checkout.ts', lang: 'ts', code: ["{ provide: 'TRACK_CONFIG', useValue: { area: 'checkout', enabled: true } },"] },
          good: { name: 'checkout.ts', lang: 'ts', code: ["{ provide: TRACK_CONFIG, useValue: { area: 'checkout', enabled: true } },"] } },
        { t: 'p', en: 'The string <code>\'TRACK_CONFIG\'</code> is a different key from the token object, even though it matches the label. Nobody injects that string, so the directive keeps getting the default. Always import the constant.',
                  ar: 'النص <code>\'TRACK_CONFIG\'</code> مفتاح مختلف عن الـ object بتاع الـ token، حتى لو مطابق للـ label. محدش بيعمل inject للنص ده، فالـ directive بيفضل ياخد القيمة الافتراضية. دايمًا اعمل import للـ constant.' }
      ]},
      { t: 'step', n: '2', title: { en: 'A misspelled field in <code>useValue</code>', ar: 'field مكتوب غلط في <code>useValue</code>' }, blocks: [
        { t: 'pair',
          bad:  { name: 'checkout.ts', lang: 'ts', code: ["{ provide: TRACK_CONFIG, useValue: { areas: 'checkout', enabled: true } },"] },
          good: { name: 'checkout.ts', lang: 'ts', code: ["{ provide: TRACK_CONFIG, useValue: { area: 'checkout', enabled: true } satisfies TrackConfig },"] } },
        { t: 'p', en: '<code>useValue</code> accepts any object, so <code>areas</code> compiles and the report says <code>undefined:pay_now</code>. Adding <code>satisfies TrackConfig</code> makes TypeScript check the fields against your interface.',
                  ar: '<code>useValue</code> بيقبل أي object، فـ <code>areas</code> بتعمل compile والتقرير بيقول <code>undefined:pay_now</code>. لو ضفت <code>satisfies TrackConfig</code>، TypeScript هيراجع الـ fields على الـ interface بتاعك.' }
      ]},
      { t: 'step', n: '3', title: { en: 'Reading the token in a root service', ar: 'قراية الـ token في service على مستوى الـ root' }, blocks: [
        { t: 'pair',
          bad:  { name: 'analytics.ts', lang: 'ts', code: [
            "@Injectable({ providedIn: 'root' })",
            'export class Analytics {',
            '  private readonly config = inject(TRACK_CONFIG);   // always the root value',
            '}' ] },
          good: { name: 'track-clicks.ts', lang: 'ts', code: [
            '@Directive({ /* … */ })',
            'export class TrackClicks {',
            '  private readonly config = inject(TRACK_CONFIG);   // sees Checkout’s value',
            '}' ] } },
        { t: 'p', en: 'A service provided in <code>root</code> is created by the app-wide injector, so its <code>inject()</code> looks there and never sees <code>Checkout</code>’s <code>providers</code>. Read an overridable token in the directive or component that sits inside the subtree.',
                  ar: 'الـ service اللي متعملها provide في <code>root</code> بيعملها الـ injector بتاع التطبيق كله، فالـ <code>inject()</code> بتاعها بيدوّر هناك وعمره ما بيشوف <code>providers</code> بتاعة <code>Checkout</code>. اقرا الـ token اللي ممكن يتغير في الـ directive أو الـ component اللي قاعد جوه الفرع.' }
      ]},
      { t: 'step', n: '4', title: { en: 'Typing the directive’s name on the button', ar: 'إنك تكتب اسم الـ directive على الزرار' }, blocks: [
        { t: 'pair',
          bad:  { name: 'checkout.ts', lang: 'html', code: ['<app-cta-button appTrack="pay_now">Pay now</app-cta-button>'] },
          good: { name: 'checkout.ts', lang: 'html', code: ['<app-cta-button track="pay_now">Pay now</app-cta-button>'] } },
        { t: 'p', en: 'The button only exposes <code>track</code>. On the left, <code>appTrack</code> is just a plain HTML attribute that sets nothing, and because the input is required you get an error about a required input with no value, which does not mention the name you mistyped.',
                  ar: 'الزرار بيطلّع <code>track</code> بس. على الشمال، <code>appTrack</code> مجرد attribute HTML عادي مش بيحط حاجة، وعشان الـ input ده required هتاخد error عن required input ملوش قيمة، ومش هيذكر الاسم اللي كتبته غلط.' }
      ]},
      { t: 'step', n: '5', title: { en: 'A token with no default and no provider', ar: 'token من غير قيمة افتراضية ومن غير provider' }, blocks: [
        { t: 'pair',
          bad:  { name: 'track-config.ts', lang: 'ts', code: ["export const TRACK_CONFIG = new InjectionToken<TrackConfig>('TRACK_CONFIG');"] },
          good: { name: 'track-config.ts', lang: 'ts', code: [
            "export const TRACK_CONFIG = new InjectionToken<TrackConfig>('TRACK_CONFIG', {",
            "  providedIn: 'root',",
            "  factory: () => ({ area: 'app', enabled: true }),",
            '});' ] } },
        { t: 'p', en: 'This one is loud: every page that did not provide a value fails with NG0201, “No provider for InjectionToken TRACK_CONFIG”. That label in the message is the quoted string, which is exactly why it should match the constant.',
                  ar: 'دي بتعلّي صوتها: كل صفحة معملتش provide لقيمة بتفشل بـ NG0201، «No provider for InjectionToken TRACK_CONFIG». والـ label اللي في الرسالة هو النص اللي بين علامات التنصيص، وده بالظبط السبب إنه لازم يطابق الـ constant.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it does nothing', ar: 'لما مايعملش حاجة' },
    title: { en: 'Six questions, in this order', ar: 'ست أسئلة، بالترتيب ده' },
    lead: {
      en: 'The override is ignored, or the button reports the wrong thing. Ask these before anything else.',
      ar: 'الـ override بيتجاهل، أو الزرار بيبلّغ حاجة غلط. اسأل دول قبل أي حاجة.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Is <code>provide:</code> the imported constant, not a string that looks like it?',
                  ar: '<b>1.</b> <code>provide:</code> هو الـ constant المتعمله import، مش نص شبهه؟' },
      { t: 'chk', en: '<b>2.</b> Is the provider on a component <b>above</b> the thing that injects it?',
                  ar: '<b>2.</b> الـ provider موجود على component <b>فوق</b> الحاجة اللي بتعمل inject؟' },
      { t: 'chk', en: '<b>3.</b> Is the injecting code a directive or component inside that subtree, not a service provided in <code>root</code>?',
                  ar: '<b>3.</b> الكود اللي بيعمل inject هو directive أو component جوه الفرع ده، مش service متعملها provide في <code>root</code>؟' },
      { t: 'chk', en: '<b>4.</b> Does the value have exactly the interface’s field names? Add <code>satisfies TrackConfig</code> to be sure.',
                  ar: '<b>4.</b> القيمة فيها أسماء الـ fields بتاعة الـ interface بالظبط؟ ضيف <code>satisfies TrackConfig</code> عشان تتأكد.' },
      { t: 'chk', en: '<b>5.</b> Is the <code>inputs</code> string <code>\'directiveInput: publicName\'</code>, in that order, and does the page type the public name?',
                  ar: '<b>5.</b> نص الـ <code>inputs</code> مكتوب <code>\'directiveInput: publicName\'</code>، بالترتيب ده، والصفحة بتكتب الاسم الـ public؟' },
      { t: 'chk', en: '<b>6.</b> Does the <code>host</code> string name the method exactly, brackets included: <code>\'onClick()\'</code>?',
                  ar: '<b>6.</b> نص الـ <code>host</code> مكتوب فيه اسم الميثود بالظبط، بالقوسين: <code>\'onClick()\'</code>؟' }
    ]
  }
  ]
};
