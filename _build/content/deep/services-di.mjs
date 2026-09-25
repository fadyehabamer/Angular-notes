/* ==================================================================
   inject(), name by name — the deep dive after the services-di topic.
   One running example (a Session service written by the login page,
   read by the header and the route guard) followed through every file.
   Model: content/deep/inputs-outputs.mjs.
   ================================================================== */

const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

export default {
  topic: 'services-di',
  tab: 'inject(), name by name — The Angular Signal',
  title: { en: '<code>inject()</code>, name by name', ar: '<code>inject()</code>، اسم اسم' },
  say: {
    en: 'The page for when services make you wonder whose name <code>session</code> is. One Session service followed through eight files: who names the class, who names the field, and why the header, the login page and the guard can each call the same service something different.',
    ar: 'الصفحة دي للي الـ services مخلياه يسأل <code>session</code> دي اسم مين. service واحدة اسمها Session ماشيين وراها في تمن ملفات: مين بيسمّي الكلاس، ومين بيسمّي الـ field، وليه الهيدر وصفحة اللوجين والـ guard كل واحد ممكن يسمّي نفس الـ service باسم مختلف.'
  },
  lead: {
    en: 'The idea is simple: <b>a service is one shared object, and <code>inject()</code> hands the same one to everyone who asks.</b> The confusing part is the names. In <code>protected readonly session = inject(Session)</code> the same word appears twice, once small and once capital, and they are owned by different files. This page shows which names are the service’s contract, which are each component’s private choice, and which are Angular’s.',
    ar: 'الفكرة بسيطة: <b>الـ service دي object واحد متشارك، و<code>inject()</code> بتدّي نفس الـ object لأي حد يطلبه.</b> اللي بيلخبط هو الأسماء. في <code>protected readonly session = inject(Session)</code> نفس الكلمة ظاهرة مرتين، مرة صغيرة ومرة كابيتال، وكل واحدة بتاعة ملف مختلف. الصفحة دي بتوريك أنهي أسماء هي عقد الـ service، وأنهي اختيار خاص بكل component، وأنهي بتاعة أنجولار.'
  },

  names: {
    note: {
      en: 'The service’s class name and its public members are <b>orange</b>: every file that injects it types them. The field a component stores the service in (<code>session</code>, <code>auth</code>) is <b>green</b>: each component picks its own, and the service never knows it.',
      ar: 'اسم كلاس الـ service والحاجات الـ public اللي فيه <b>برتقاني</b>: أي ملف بيعمله inject بيكتبها. والـ field اللي الـ component بيحط فيه الـ service (<code>session</code>، <code>auth</code>) <b>أخضر</b>: كل component بيختار اسمه، والـ service عمرها ما بتعرفه.'
    },
    names: [
      /* --- shared: two files must agree --- */
      { n:'Session', k:'pub',
        w:{ en:'The service’s class name, and also the key <code>inject()</code> looks it up by. Every file that injects it follows a rename.',
            ar:'اسم كلاس الـ service، وهو كمان المفتاح اللي <code>inject()</code> بيدوّر بيه. أي ملف بيعمله inject بيتغير معاه.' } },
      { n:'user', k:'pub', re:'(?<![\\w$/-])user(?![\\w$-])',
        w:{ en:'Public and read-only. The header reads <code>session.user()</code>.', ar:'public وللقراية بس. الهيدر بيقرا <code>session.user()</code>.' } },
      { n:'isSignedIn', k:'pub',
        w:{ en:'Public. Read by the header and by the guard.', ar:'public. الهيدر والـ guard بيقروه.' } },
      { n:'signIn', k:'pub',
        w:{ en:'Public method, called by the login page.', ar:'ميثود public، صفحة اللوجين بتناديها.' } },
      { n:'signOut', k:'pub',
        w:{ en:'Public method, called from the header’s template.', ar:'ميثود public، بتتنادى من تمبلت الهيدر.' } },
      { n:'User', k:'pub', w:{ en:'Your data type. Every file that imports it follows a rename.', ar:'نوع الداتا بتاعك. أي ملف بيعمله import بيتغير معاه.' } },
      { n:'name', k:'pub', w:{ en:'A field on <code>User</code>.', ar:'field في <code>User</code>.' } },
      { n:'authGuard', k:'pub',
        w:{ en:'Your guard’s name. The routes file lists it in <code>canActivate</code>.', ar:'اسم الـ guard بتاعك. ملف الـ routes بيكتبه في <code>canActivate</code>.' } },
      { n:'sign-in', k:'pub',
        w:{ en:'A route path. The route, the header’s link and the guard’s redirect must spell it the same.', ar:'مسار route. الـ route ولينك الهيدر والـ redirect بتاع الـ guard لازم يكتبوه زي بعض.' } },
      { n:'orders', k:'pub', re:"(?<=path: '|'/)orders(?=')",
        w:{ en:'A route path, used by the route and by the login page’s redirect.', ar:'مسار route، بيستخدمه الـ route والـ redirect بتاع صفحة اللوجين.' } },
      { n:'routes', k:'pub',
        w:{ en:'Your routes array. <code>app.config.ts</code> imports it by this name.', ar:'الـ array بتاعة الـ routes. <code>app.config.ts</code> بيعملها import بالاسم ده.' } },
      { n:'Header', k:'pub', only:['ts'], w:{ en:'The header’s class.', ar:'كلاس الهيدر.' } },
      { n:'Login', k:'pub', only:['ts'], w:{ en:'The login page’s class. The routes file uses it.', ar:'كلاس صفحة اللوجين. ملف الـ routes بيستخدمه.' } },
      { n:'Orders', k:'pub', only:['ts'], w:{ en:'Another page’s class, imported by the routes file.', ar:'كلاس صفحة تانية، ملف الـ routes بيعمله import.' } },
      { n:'app-header', k:'pub', w:{ en:'The header’s selector.', ar:'الـ selector بتاع الهيدر.' } },
      { n:'app-login', k:'pub', w:{ en:'The login page’s selector.', ar:'الـ selector بتاع صفحة اللوجين.' } },
      { n:'API_URL', k:'pub',
        w:{ en:'Your token’s constant. The constant is the key; the text inside the brackets is only a label.', ar:'الـ constant بتاع الـ token بتاعك. الـ constant هو المفتاح؛ والنص اللي بين القوسين مجرد لافتة.' } },

      /* --- yours, private to one file --- */
      { n:'_user', k:'mine',
        w:{ en:'The private, writable signal inside the service. Nobody outside can see it.', ar:'الـ signal الخاصة اللي بتتكتب جوه الـ service. محدش برّه يقدر يشوفها.' } },
      { n:'u', k:'mine', w:{ en:'A parameter of <code>signIn</code>. Call it anything.', ar:'parameter في <code>signIn</code>. سمّيه أي حاجة.' } },
      { n:'session', k:'mine', re:'(?<![\\w$/-])session(?![\\w$-])',
        w:{ en:'The header’s own field for the injected <code>Session</code>. Any name works.', ar:'الـ field بتاع الهيدر للـ <code>Session</code> اللي اتعملها inject. أي اسم ينفع.' } },
      { n:'auth', k:'mine', re:'(?<![\\w$/-])auth(?![\\w$-])',
        w:{ en:'The login page’s own field for the <b>same</b> <code>Session</code>. A different name, the same instance.', ar:'الـ field بتاع صفحة اللوجين لـ <b>نفس</b> الـ <code>Session</code>. اسم مختلف، ونفس النسخة.' } },
      { n:'router', k:'mine', re:'(?<![\\w$/-])router(?![\\w$-])',
        w:{ en:'The login page’s field for Angular’s <code>Router</code>.', ar:'الـ field بتاع صفحة اللوجين للـ <code>Router</code> بتاع أنجولار.' } },
      { n:'signInAs', k:'mine', w:{ en:'The login page’s own method, called by its own button.', ar:'ميثود صفحة اللوجين، والزرار بتاعها هو اللي بيناديها.' } },
      { n:'person', k:'mine', w:{ en:'A parameter of <code>signInAs</code>.', ar:'parameter في <code>signInAs</code>.' } },
      { n:'apiUrl', k:'mine', w:{ en:'A component’s own field holding the injected token value.', ar:'field خاص بالـ component شايل قيمة الـ token اللي اتعملها inject.' } },

      /* --- Angular's --- */
      { n:'inject', k:'ng', w:{ en:'Angular’s function that hands you the shared instance.', ar:'الـ function بتاعة أنجولار اللي بتدّيك النسخة المتشاركة.' } },
      { n:'@Injectable', k:'ng', w:{ en:'Angular’s decorator for a class the injector can create.', ar:'الـ decorator بتاع أنجولار لكلاس الـ injector يقدر يعمله.' } },
      { n:'providedIn', k:'ng', w:{ en:'An option key Angular reads.', ar:'مفتاح إعداد أنجولار بيقراه.' } },
      { n:'root', k:'ng', w:{ en:'Angular’s fixed value: one instance for the whole app.', ar:'قيمة ثابتة من أنجولار: نسخة واحدة للتطبيق كله.' } },
      { n:'providers', k:'ng', w:{ en:'An option key: services this component (or the app) provides.', ar:'مفتاح إعداد: الـ services اللي الـ component ده (أو التطبيق) بيوفّرها.' } },
      { n:'provide', k:'ng', w:{ en:'A provider’s key: which token.', ar:'مفتاح في الـ provider: أنهي token.' } },
      { n:'useValue', k:'ng', w:{ en:'A provider’s key: which value.', ar:'مفتاح في الـ provider: أنهي قيمة.' } },
      { n:'InjectionToken', k:'ng', w:{ en:'Angular’s class for a key that is not a class.', ar:'كلاس أنجولار لمفتاح مش كلاس.' } },
      { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
      { n:'computed', k:'ng', w:{ en:'Angular’s derived signal.', ar:'الـ signal المشتقة بتاعة أنجولار.' } },
      { n:'asReadonly', k:'ng', w:{ en:'A signal method: a view nobody outside can <code>set</code>.', ar:'ميثود بتاعة الـ signal: نسخة محدش برّه يقدر يعمل عليها <code>set</code>.' } },
      { n:'set', k:'ng', w:{ en:'A signal method.', ar:'ميثود بتاعة الـ signal.' } },
      { n:'Router', k:'ng', w:{ en:'Angular’s router service.', ar:'الـ service بتاعة الراوتر في أنجولار.' } },
      { n:'navigateByUrl', k:'ng', w:{ en:'A <code>Router</code> method.', ar:'ميثود في الـ <code>Router</code>.' } },
      { n:'createUrlTree', k:'ng', w:{ en:'A <code>Router</code> method that builds a redirect.', ar:'ميثود في الـ <code>Router</code> بتبني redirect.' } },
      { n:'CanActivateFn', k:'ng', w:{ en:'Angular’s type for a guard function.', ar:'الـ type بتاع أنجولار لـ function الـ guard.' } },
      { n:'Routes', k:'ng', w:{ en:'Angular’s type for a routes array.', ar:'الـ type بتاع أنجولار لـ array الـ routes.' } },
      { n:'path', k:'ng', w:{ en:'A route’s key. The text after it is yours.', ar:'مفتاح في الـ route. النص اللي بعده بتاعك.' } },
      { n:'component', k:'ng', w:{ en:'A route’s key.', ar:'مفتاح في الـ route.' } },
      { n:'canActivate', k:'ng', w:{ en:'A route’s key: the guards to run first.', ar:'مفتاح في الـ route: الـ guards اللي تشتغل الأول.' } },
      { n:'RouterLink', k:'ng', w:{ en:'The class you import to use <code>routerLink</code>.', ar:'الكلاس اللي بتعمله import عشان تستخدم <code>routerLink</code>.' } },
      { n:'routerLink', k:'ng', w:{ en:'Angular’s link directive. The path after it is yours.', ar:'الـ directive بتاع أنجولار للينكات. المسار اللي بعده بتاعك.' } },
      { n:'@if', k:'ng', w:{ en:'Angular’s if block.', ar:'بلوك الـ if بتاع أنجولار.' } },
      { n:'@else', k:'ng', w:{ en:'Angular’s else block.', ar:'بلوك الـ else بتاع أنجولار.' } },
      { n:'click', k:'ng', w:{ en:'The browser’s event name.', ar:'اسم الـ event بتاع المتصفح.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator.', ar:'الـ decorator بتاع أنجولار.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The string after it is yours.', ar:'مفتاح إعداد. النص اللي بعده بتاعك.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key.', ar:'مفتاح إعداد.' } },
      { n:'imports', k:'ng', w:{ en:'An option key: what this template uses.', ar:'مفتاح إعداد: التمبلت ده بيستخدم إيه.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One sign-in, six stops', ar: 'تسجيل دخول واحد، ست محطات' },
    lead: {
      en: 'A login page, a header, and a guard that protects the orders page. None of them is the parent of another. They share one fact, “who is signed in?”, through one service. Follow a sign-in:',
      ar: 'صفحة لوجين، وهيدر، وguard بيحمي صفحة الأوردرات. ولا واحد فيهم أبو التاني. هما متشاركين في معلومة واحدة، «مين عامل sign in؟»، عن طريق service واحدة. امشي ورا تسجيل دخول:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'login.html', lang: 'html', who: { en: 'login · button', ar: 'اللوجين · الزرار' },
          code: ["<button (click)=\"signInAs('Mona')\">Sign in as Mona</button>"],
          say: { en: `The user clicks. ${ng('click')} is the browser’s event, and ${mine('signInAs')} is the login page’s own method.`,
                 ar: `المستخدم بيدوس. ${ng('click')} event بتاع المتصفح، و${mine('signInAs')} ميثود صفحة اللوجين نفسها.` } },
        { file: 'login.ts', lang: 'ts', who: { en: 'login · asks for the service', ar: 'اللوجين · بيطلب الـ service' },
          code: ['private readonly auth = inject(Session);', '', 'signInAs(person: string) {', '  this.auth.signIn({ name: person });'],
          say: { en: `${ng('inject')} is Angular’s. ${pub('Session')} is the service’s real class name: it is the <b>key</b> Angular looks up. ${mine('auth')} is only what the login page calls it. ${pub('signIn')} is the service’s public method, so it must match exactly.`,
                 ar: `${ng('inject')} بتاعة أنجولار. و${pub('Session')} اسم كلاس الـ service الحقيقي: وهو <b>المفتاح</b> اللي أنجولار بيدوّر بيه. و${mine('auth')} ده بس اللي صفحة اللوجين بتسمّيه بيه. و${pub('signIn')} ميثود الـ service الـ public، فلازم تطابق بالظبط.` } },
        { file: 'session.service.ts', lang: 'ts', who: { en: 'service · stores it', ar: 'الـ service · بتخزّنه' },
          code: ['signIn(u: User) {', '  this._user.set(u);', '}'],
          say: { en: `Only the service writes its own state. ${mine('_user')} is private; ${mine('u')} is a parameter, call it anything. ${ng('set')} is Angular’s.`,
                 ar: `الـ service بس هي اللي بتكتب الحالة بتاعتها. ${mine('_user')} خاصة؛ و${mine('u')} parameter، سمّيه أي حاجة. و${ng('set')} بتاعة أنجولار.` } },
        { file: 'session.service.ts', lang: 'ts', who: { en: 'service · publishes', ar: 'الـ service · بتنشر' },
          code: ['readonly isSignedIn = computed(() => this._user() !== null);'],
          say: { en: `${pub('isSignedIn')} is public, so every reader types this name. ${ng('computed')} is Angular’s.`,
                 ar: `${pub('isSignedIn')} public، فكل اللي بيقروا بيكتبوا الاسم ده. و${ng('computed')} بتاعة أنجولار.` } },
        { file: 'header.html', lang: 'html', who: { en: 'header · redraws', ar: 'الهيدر · بيترسم تاني' },
          code: ['@if (session.isSignedIn()) {'],
          say: { en: `The header injected the <b>same</b> service but named its field ${mine('session')}. The name after the dot, ${pub('isSignedIn')}, is the service’s. The header re-renders by itself, because it read a signal.`,
                 ar: `الهيدر عمل inject لـ <b>نفس</b> الـ service بس سمّى الـ field بتاعه ${mine('session')}. والاسم اللي بعد النقطة، ${pub('isSignedIn')}، بتاع الـ service. والهيدر بيترسم تاني لوحده، عشان قرا signal.` } },
        { file: 'auth.guard.ts', lang: 'ts', who: { en: 'guard · lets you in', ar: 'الـ guard · بيدخّلك' },
          code: ['if (inject(Session).isSignedIn()) return true;'],
          say: { en: `The guard is a plain function and does not even store the service in a field. ${ng('inject')} works here because the router runs guards inside an injection context.`,
                 ar: `الـ guard function عادية ومش بتخزّن الـ service في field أصلًا. و${ng('inject')} شغالة هنا عشان الراوتر بيشغّل الـ guards جوه injection context.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'Login: <code>this.auth.signIn(…)</code>. Header: <code>session.isSignedIn()</code>. Guard: <code>inject(Session).isSignedIn()</code>. Three different ways to hold the service, one shared class name <b>Session</b>, and the shared member names <b>signIn</b> and <b>isSignedIn</b>.',
        ar: 'اللوجين: <code>this.auth.signIn(…)</code>. الهيدر: <code>session.isSignedIn()</code>. الـ guard: <code>inject(Session).isSignedIn()</code>. تلات طرق مختلفة تمسك بيها الـ service، واسم كلاس واحد متشارك <b>Session</b>، وأسماء الحاجات المتشاركة <b>signIn</b> و<b>isSignedIn</b>.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Service or component?', ar: 'الـ service ولا الـ component؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'The service decides its class name and its public members. Each user of the service decides only what to call its own field.',
      ar: 'الـ service هي اللي بتحدد اسم الكلاس والحاجات الـ public بتاعتها. وكل اللي بيستخدم الـ service بيحدد بس يسمّي الـ field بتاعه إيه.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>export class Session</code>', '<code>session.service.ts</code>', 'the service', `you pick ${pub('Session')}; every injector copies it`],
            ar: ['<code>export class Session</code>', '<code>session.service.ts</code>', 'الـ service', `انت بتختار ${pub('Session')}؛ وكل اللي بيعمل inject بينسخه`] },
          { en: ['<code>private readonly _user = signal(…)</code>', '<code>session.service.ts</code>', 'the service only', `you pick ${mine('_user')}; nobody else sees it`],
            ar: ['<code>private readonly _user = signal(…)</code>', '<code>session.service.ts</code>', 'الـ service بس', `انت بتختار ${mine('_user')}؛ ومحدش تاني شايفها`] },
          { en: ['<code>readonly isSignedIn = computed(…)</code>, <code>signIn()</code>, <code>signOut()</code>', '<code>session.service.ts</code>', 'the service', `you pick ${pub('isSignedIn')}, ${pub('signIn')}, ${pub('signOut')}; callers copy them`],
            ar: ['<code>readonly isSignedIn = computed(…)</code>، <code>signIn()</code>، <code>signOut()</code>', '<code>session.service.ts</code>', 'الـ service', `انت بتختار ${pub('isSignedIn')} و${pub('signIn')} و${pub('signOut')}؛ واللي بينادوهم بينسخوهم`] },
          { en: ['<code>protected readonly session = inject(Session)</code>', '<code>header.ts</code>', 'the header', `you pick ${mine('session')}; ${ng('inject')} is Angular’s`],
            ar: ['<code>protected readonly session = inject(Session)</code>', '<code>header.ts</code>', 'الهيدر', `انت بتختار ${mine('session')}؛ و${ng('inject')} بتاعة أنجولار`] },
          { en: ['<code>private readonly auth = inject(Session)</code>', '<code>login.ts</code>', 'the login page', `you pick ${mine('auth')}, independently of the header`],
            ar: ['<code>private readonly auth = inject(Session)</code>', '<code>login.ts</code>', 'صفحة اللوجين', `انت بتختار ${mine('auth')}، من غير أي علاقة بالهيدر`] },
          { en: ['<code>export const authGuard: CanActivateFn</code>', '<code>auth.guard.ts</code>', 'the guard', `you pick ${pub('authGuard')}; the routes file copies it`],
            ar: ['<code>export const authGuard: CanActivateFn</code>', '<code>auth.guard.ts</code>', 'الـ guard', `انت بتختار ${pub('authGuard')}؛ وملف الـ routes بينسخه`] },
        ] },
      { t: 'ul',
        en: ['<b>The class name is the key.</b> <code>inject(Session)</code> finds the service by its class, not by any field name. That is why only the class name must match everywhere.',
             '<b>The field name is private.</b> <code>session</code>, <code>auth</code> or nothing at all: the service never learns what you called it.',
             '<b>Public members are the contract.</b> Whatever the service makes public, every caller types. Keep writable state private and expose methods and read-only signals.'],
        ar: ['<b>اسم الكلاس هو المفتاح.</b> <code>inject(Session)</code> بتلاقي الـ service بالكلاس بتاعها، مش بأي اسم field. وعشان كده اسم الكلاس بس هو اللي لازم يطابق في كل حتة.',
             '<b>اسم الـ field خاص.</b> <code>session</code> أو <code>auth</code> أو ولا حاجة خالص: الـ service عمرها ما بتعرف انت سمّيتها إيه.',
             '<b>الحاجات الـ public هي العقد.</b> أي حاجة الـ service بتخليها public، كل اللي بينادوها بيكتبوها. خلي الحالة اللي بتتكتب private، وطلّع ميثودز وsignals للقراية بس.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All eight files, every name coloured', ar: 'التمن ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same example, complete. Hover <code>Session</code> to see every file that depends on the class name. Hover <code>session</code> and <code>auth</code> to see that each lives in one component only. Then press <b>Rename test</b>.',
      ar: 'نفس المثال، كامل. قف بالماوس على <code>Session</code> وشوف كل ملف معتمد على اسم الكلاس. وقف على <code>session</code> و<code>auth</code> وشوف إن كل واحد عايش في component واحد بس. وبعدين دوس <b>جرّب تغيّر الأسماء</b>.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'user.ts', lang: 'ts', tag: { en: 'the data', ar: 'الداتا' }, code: [
        'export interface User {',
        '  name: string;',
        '}' ] },
      { t: 'code', name: 'session.service.ts', lang: 'ts', tag: { en: 'the service', ar: 'الـ service' }, code: [
        "import { Injectable, computed, signal } from '@angular/core';",
        "import { User } from './user';",
        '',
        "@Injectable({ providedIn: 'root' })",
        'export class Session {',
        '  private readonly _user = signal<User | null>(null);',
        '',
        '  readonly user = this._user.asReadonly();',
        '  readonly isSignedIn = computed(() => this._user() !== null);',
        '',
        '  signIn(u: User) {',
        '    this._user.set(u);',
        '  }',
        '',
        '  signOut() {',
        '    this._user.set(null);',
        '  }',
        '}' ] },
      { t: 'code', name: 'login.ts', lang: 'ts', tag: { en: 'writes', ar: 'بيكتب' }, code: [
        "import { Component, inject } from '@angular/core';",
        "import { Router } from '@angular/router';",
        "import { Session } from './session.service';",
        '',
        '@Component({',
        "  selector: 'app-login',",
        "  templateUrl: './login.html',",
        '})',
        'export class Login {',
        '  private readonly auth = inject(Session);',
        '  private readonly router = inject(Router);',
        '',
        '  signInAs(person: string) {',
        '    this.auth.signIn({ name: person });',
        "    this.router.navigateByUrl('/orders');",
        '  }',
        '}' ] },
      { t: 'code', name: 'login.html', lang: 'html', tag: { en: 'writes', ar: 'بيكتب' }, code: [
        "<button (click)=\"signInAs('Mona')\">Sign in as Mona</button>" ] },
      { t: 'code', name: 'header.ts', lang: 'ts', tag: { en: 'reads', ar: 'بيقرا' }, code: [
        "import { Component, inject } from '@angular/core';",
        "import { RouterLink } from '@angular/router';",
        "import { Session } from './session.service';",
        '',
        '@Component({',
        "  selector: 'app-header',",
        '  imports: [RouterLink],',
        "  templateUrl: './header.html',",
        '})',
        'export class Header {',
        '  protected readonly session = inject(Session);   // same instance as the login page’s',
        '}' ] },
      { t: 'code', name: 'header.html', lang: 'html', tag: { en: 'reads', ar: 'بيقرا' }, code: [
        '@if (session.isSignedIn()) {',
        '  <span>{{ session.user()?.name }}</span>',
        '  <button (click)="session.signOut()">Sign out</button>',
        '} @else {',
        '  <a routerLink="/sign-in">Sign in</a>',
        '}' ] },
      { t: 'code', name: 'auth.guard.ts', lang: 'ts', tag: { en: 'decides', ar: 'بيقرر' }, code: [
        "import { inject } from '@angular/core';",
        "import { CanActivateFn, Router } from '@angular/router';",
        "import { Session } from './session.service';",
        '',
        'export const authGuard: CanActivateFn = () => {',
        '  if (inject(Session).isSignedIn()) return true;',
        "  return inject(Router).createUrlTree(['/sign-in']);",
        '};' ] },
      { t: 'code', name: 'app.routes.ts', lang: 'ts', tag: { en: 'wires the guard', ar: 'بيوصّل الـ guard' }, code: [
        "import { Routes } from '@angular/router';",
        "import { authGuard } from './auth.guard';",
        "import { Login } from './login';",
        "import { Orders } from './orders';",
        '',
        'export const routes: Routes = [',
        "  { path: 'sign-in', component: Login },",
        "  { path: 'orders', component: Orders, canActivate: [authGuard] },",
        '];' ] },
      { t: 'nmtable' }
    ]
  },

  /* ------------------------------------------------------------ 4 */
  {
    id: 'rename',
    kicker: { en: 'Is it OK to change it?', ar: 'ينفع أغيّره؟' },
    title: { en: 'What breaks when you rename each name', ar: 'إيه اللي بيبوظ لما تغيّر كل اسم' },
    lead: {
      en: 'Every name you own can be renamed. Names in TypeScript and templates give compile errors when you miss one. Route paths are just text, and they are the ones that fail at runtime.',
      ar: 'أي اسم بتاعك ينفع يتغير. الأسماء اللي في TypeScript والتمبلتس بتدّي compile error لو نسيت واحد. لكن مسارات الـ routes مجرد نص، وهي اللي بتفشل وقت التشغيل.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [pub('Session') + ' (the class)', 'every <code>import</code> and every <code>inject(Session)</code>', 'Compile error in each of those files.'],
            ar: [pub('Session') + ' (الكلاس)', 'كل <code>import</code> وكل <code>inject(Session)</code>', 'Compile error في كل ملف منهم.'] },
          { en: [`${pub('isSignedIn')}, ${pub('user')}, ${pub('signIn')}, ${pub('signOut')}`, 'every caller: <code>.ts</code> files and templates', 'Compile error: “Property … does not exist on type ‘Session’”.'],
            ar: [`${pub('isSignedIn')} و${pub('user')} و${pub('signIn')} و${pub('signOut')}`, 'كل اللي بيناديهم: ملفات <code>.ts</code> والتمبلتس', 'Compile error: «Property … does not exist on type ‘Session’».'] },
          { en: [mine('_user'), 'only lines inside the service', 'Compile error inside the service.'],
            ar: [mine('_user'), 'السطور اللي جوه الـ service بس', 'Compile error جوه الـ service.'] },
          { en: [mine('session') + ' (the header’s field)', 'the header’s class and <code>header.html</code>', 'Compile error in the header’s template. The login page is not affected.'],
            ar: [mine('session') + ' (الـ field بتاع الهيدر)', 'كلاس الهيدر و<code>header.html</code>', 'Compile error في تمبلت الهيدر. وصفحة اللوجين مالهاش دعوة.'] },
          { en: [mine('auth') + ', ' + mine('router') + ' (the login page’s fields)', 'only <code>this.auth</code> / <code>this.router</code> in <code>login.ts</code>', 'Compile error in <code>login.ts</code>.'],
            ar: [mine('auth') + ' و' + mine('router') + ' (fields صفحة اللوجين)', '<code>this.auth</code> / <code>this.router</code> في <code>login.ts</code> بس', 'Compile error في <code>login.ts</code>.'] },
          { en: [pub('authGuard'), 'the <code>import</code> and <code>canActivate: [ ]</code> in the routes', 'Compile error in <code>app.routes.ts</code>.'],
            ar: [pub('authGuard'), 'الـ <code>import</code> و<code>canActivate: [ ]</code> في الـ routes', 'Compile error في <code>app.routes.ts</code>.'] },
          { en: [pub('sign-in') + ', ' + pub('orders') + ' (route paths)', 'the route, every <code>routerLink</code>, every <code>navigateByUrl</code> and <code>createUrlTree</code>', '<b>No compile error.</b> Paths are plain text. The link leads nowhere and the router reports “Cannot match any routes” in the console.'],
            ar: [pub('sign-in') + ' و' + pub('orders') + ' (مسارات routes)', 'الـ route، وكل <code>routerLink</code>، وكل <code>navigateByUrl</code> و<code>createUrlTree</code>', '<b>مفيش compile error.</b> المسارات نص عادي. اللينك مش بيودّي في حتة والراوتر بيكتب «Cannot match any routes» في الـ console.'] },
          { en: [`${ng('inject')}, ${ng('@Injectable')}, ${ng('providedIn')}, ${ng('root')}`, 'nothing: you cannot rename these', 'They are Angular’s words.'],
            ar: [`${ng('inject')} و${ng('@Injectable')} و${ng('providedIn')} و${ng('root')}`, 'ولا حاجة: دول مينفعش يتغيروا', 'دي كلمات أنجولار.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b>. <code>session</code> and <code>auth</code> become two different words, and the code still works: they were never shared. <code>Session</code> becomes one word in every file that uses it, all at once.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b>. <code>session</code> و<code>auth</code> هيبقوا كلمتين مختلفتين، والكود لسه شغال: عمرهم ما كانوا متشاركين. و<code>Session</code> هتبقى كلمة واحدة في كل ملف بيستخدمها، مرة واحدة.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'key',
    kicker: { en: 'The key, not the name', ar: 'المفتاح، مش الاسم' },
    title: { en: '<code>session</code> and <code>Session</code> are not the same word', ar: '<code>session</code> و<code>Session</code> مش نفس الكلمة' },
    lead: {
      en: 'Inside the brackets of <code>inject( )</code> goes the <b>key</b>: what to look up. On the left of <code>=</code> goes the <b>field</b>: where this component keeps it. Matching them in spelling is a habit, not a rule.',
      ar: 'جوه قوسين <code>inject( )</code> بيتحط <b>المفتاح</b>: تدوّر على إيه. وعلى شمال الـ <code>=</code> بيتحط <b>الـ field</b>: الـ component ده هيحطه فين. إنهم يبقوا نفس الكتابة عادة، مش قاعدة.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['File', 'The line', 'Field name', 'Key'], ar: ['الملف', 'السطر', 'اسم الـ field', 'المفتاح'] },
        rows: [
          { en: ['<code>header.ts</code>', '<code>protected readonly session = inject(Session)</code>', mine('session'), pub('Session')],
            ar: ['<code>header.ts</code>', '<code>protected readonly session = inject(Session)</code>', mine('session'), pub('Session')] },
          { en: ['<code>login.ts</code>', '<code>private readonly auth = inject(Session)</code>', mine('auth'), pub('Session')],
            ar: ['<code>login.ts</code>', '<code>private readonly auth = inject(Session)</code>', mine('auth'), pub('Session')] },
          { en: ['<code>auth.guard.ts</code>', '<code>inject(Session).isSignedIn()</code>', 'none: used straight away', pub('Session')],
            ar: ['<code>auth.guard.ts</code>', '<code>inject(Session).isSignedIn()</code>', 'مفيش: بيتستخدم على طول', pub('Session')] },
        ] },
      { t: 'p',
        en: 'All three get the <b>same</b> object, because the key is the same. The header could rename its field to <code>who</code> and nothing outside the header would notice.',
        ar: 'التلاتة بياخدوا <b>نفس</b> الـ object، عشان المفتاح واحد. والهيدر ممكن يغيّر اسم الـ field بتاعه لـ <code>who</code> ومحدش برّه الهيدر هياخد باله.' },
      { t: 'p',
        en: 'When the thing you want to inject is not a class, say a plain string like an API address, you make a key yourself with <code>InjectionToken</code>. Then the <b>constant</b> is the key, and the text in the brackets is only a label that shows up in error messages:',
        ar: 'لما الحاجة اللي عايز تعملها inject مش كلاس، زي نص عادي لعنوان API مثلًا، بتعمل مفتاح بنفسك بـ <code>InjectionToken</code>. ساعتها <b>الـ constant</b> هو المفتاح، والنص اللي بين القوسين مجرد لافتة بتظهر في رسايل الـ errors:' },
      { t: 'code', name: 'tokens.ts', lang: 'ts', tag: { en: 'you make the key', ar: 'انت بتعمل المفتاح' }, code: [
        "import { InjectionToken } from '@angular/core';",
        '',
        "export const API_URL = new InjectionToken<string>('the API base address');" ] },
      { t: 'code', name: 'app.config.ts', lang: 'ts', tag: { en: 'you give it a value', ar: 'انت بتدّيله قيمة' }, code: [
        "providers: [{ provide: API_URL, useValue: '/api' }],"] },
      { t: 'code', name: 'orders.ts', lang: 'ts', tag: { en: 'anyone reads it', ar: 'أي حد بيقراه' }, code: [
        'private readonly apiUrl = inject(API_URL);' ] },
      { t: 'p',
        en: `${pub('API_URL')} is shared: the config and every reader type it. ${mine('apiUrl')} is private to one component. The label <code>'the API base address'</code> is not a name at all; changing it breaks nothing.`,
        ar: `${pub('API_URL')} متشارك: الـ config وكل اللي بيقروا بيكتبوه. و${mine('apiUrl')} خاص بـ component واحد. واللافتة <code>'the API base address'</code> مش اسم أصلًا؛ تغييرها مش بيبوّظ حاجة.` }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتاعتك' },
    title: { en: 'The fixed names', ar: 'الأسماء الثابتة' },
    lead: {
      en: 'Everything that makes the sharing happen is Angular’s. Type these exactly.',
      ar: 'كل حاجة بتخلي المشاركة تحصل بتاعة أنجولار. اكتب دول زي ما هما بالظبط.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Name', 'What it does'], ar: ['الاسم', 'بيعمل إيه'] },
        rows: [
          { en: [ng('@Injectable'), 'Marks a class as something Angular’s injector can create.'], ar: [ng('@Injectable'), 'بيعلّم الكلاس إنه حاجة الـ injector بتاع أنجولار يقدر يعملها.'] },
          { en: [`${ng('providedIn')}: ${ng('root')}`, 'One instance for the whole app, created the first time someone asks. <code>\'root\'</code> is a fixed value, not a name you choose.'], ar: [`${ng('providedIn')}: ${ng('root')}`, 'نسخة واحدة للتطبيق كله، بتتعمل أول ما حد يطلبها. و<code>\'root\'</code> قيمة ثابتة، مش اسم انت بتختاره.'] },
          { en: [ng('inject'), 'Hands you the instance for a key. Works only while Angular is creating something: a field initializer, a constructor, a guard or interceptor function.'], ar: [ng('inject'), 'بتدّيك النسخة بتاعة مفتاح. بتشتغل بس وأنجولار بيعمل حاجة: عند تعريف field، أو في constructor، أو في function بتاعة guard أو interceptor.'] },
          { en: [`${ng('providers')}, ${ng('provide')}, ${ng('useValue')}`, 'Keys for registering something yourself.'], ar: [`${ng('providers')} و${ng('provide')} و${ng('useValue')}`, 'مفاتيح إنك تسجّل حاجة بنفسك.'] },
          { en: [ng('InjectionToken'), 'Makes a key for something that is not a class.'], ar: [ng('InjectionToken'), 'بيعمل مفتاح لحاجة مش كلاس.'] },
          { en: [`${ng('Router')}, ${ng('navigateByUrl')}, ${ng('createUrlTree')}`, 'Angular’s own service and its methods. You inject it exactly like yours.'], ar: [`${ng('Router')} و${ng('navigateByUrl')} و${ng('createUrlTree')}`, 'الـ service بتاعة أنجولار والميثودز بتاعتها. بتعملها inject زي بتاعتك بالظبط.'] },
          { en: [`${ng('CanActivateFn')}, ${ng('Routes')}, ${ng('path')}, ${ng('component')}, ${ng('canActivate')}`, 'The router’s type names and route keys.'], ar: [`${ng('CanActivateFn')} و${ng('Routes')} و${ng('path')} و${ng('component')} و${ng('canActivate')}`, 'أسماء الـ types ومفاتيح الـ routes بتاعة الراوتر.'] },
          { en: ['<code>private</code>, <code>protected</code>, <code>readonly</code>', 'TypeScript. A template can use <code>protected</code> and public members, but not <code>private</code> ones. That is why the header’s field is <code>protected</code>.'], ar: ['<code>private</code>، <code>protected</code>، <code>readonly</code>', 'TypeScript. التمبلت يقدر يستخدم الحاجات الـ <code>protected</code> والـ public، لكن مش الـ <code>private</code>. وعشان كده الـ field بتاع الهيدر <code>protected</code>.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'Angular accepts any class name and any field name. These habits make the code easy to follow from file to file.',
      ar: 'أنجولار بيقبل أي اسم كلاس وأي اسم field. العادات دي بتخلي الكود سهل تمشي وراه من ملف لملف.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['the service class', '<code>Session</code>, <code>SessionService</code>', '<code>Data</code>, <code>Helper</code>', 'Name what it holds or does. Recent Angular CLI versions generate <code>Session</code> in <code>session.ts</code>; older ones generated <code>SessionService</code> in <code>session.service.ts</code>. Both are just names; pick one style per project.'],
            ar: ['كلاس الـ service', '<code>Session</code>، <code>SessionService</code>', '<code>Data</code>، <code>Helper</code>', 'سمّي اللي بتشيله أو بتعمله. نسخ Angular CLI الجديدة بتعمل <code>Session</code> في <code>session.ts</code>؛ والقديمة كانت بتعمل <code>SessionService</code> في <code>session.service.ts</code>. الاتنين مجرد أسماء؛ اختار أسلوب واحد للمشروع.'] },
          { en: ['the injected field', '<code>session</code> (the class name, lowercased), or a role like <code>auth</code>', '<code>s</code>, <code>svc</code>', 'Say what it is at the place you use it. Consistency across components helps searching.'],
            ar: ['الـ field اللي فيه الـ inject', '<code>session</code> (اسم الكلاس بحروف صغيرة)، أو دور زي <code>auth</code>', '<code>s</code>، <code>svc</code>', 'قول هو إيه في المكان اللي بتستخدمه فيه. وإنك تبقى ثابت على اسم في كل الـ components بيسهّل البحث.'] },
          { en: ['the private writable state', '<code>_user</code>', 'a public writable <code>user</code>', 'Underscore for the private one, the clean name for the public read-only view.'],
            ar: ['الحالة الخاصة اللي بتتكتب', '<code>_user</code>', '<code>user</code> public وبيتكتب', 'underscore للخاصة، والاسم النضيف للنسخة الـ public اللي للقراية بس.'] },
          { en: ['public methods', '<code>signIn</code>, <code>signOut</code> (verbs)', '<code>setUser</code>, <code>update</code>', 'Name the action in your app’s words, not the mechanics.'],
            ar: ['الميثودز الـ public', '<code>signIn</code>، <code>signOut</code> (أفعال)', '<code>setUser</code>، <code>update</code>', 'سمّي الفعل بكلام التطبيق بتاعك، مش بالميكانيكا.'] },
          { en: ['a functional guard', '<code>authGuard</code>', '<code>AuthGuard</code>, <code>guard1</code>', 'It is a function constant, so camelCase. <code>ng generate guard auth</code> produces <code>authGuard</code>.'],
            ar: ['guard على شكل function', '<code>authGuard</code>', '<code>AuthGuard</code>، <code>guard1</code>', 'هو constant فيه function، فـ camelCase. و<code>ng generate guard auth</code> بيطلّع <code>authGuard</code>.'] },
          { en: ['an injection token', '<code>API_URL</code>', '<code>apiUrlToken</code> for the constant', 'Upper case marks it as a constant key, like <code>LOCALE_ID</code>.'],
            ar: ['injection token', '<code>API_URL</code>', '<code>apiUrlToken</code> للـ constant', 'الحروف الكابيتال بتعلّم إنه مفتاح ثابت، زي <code>LOCALE_ID</code>.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: 'Constructor injection uses the same names', ar: 'الـ inject في الـ constructor بيستخدم نفس الأسماء' },
    lead: {
      en: 'Before <code>inject()</code>, services came in through the constructor. The parameter name became the field name, and the <b>type</b> was the key. Same two names, different place.',
      ar: 'قبل <code>inject()</code>، الـ services كانت بتدخل من الـ constructor. اسم الـ parameter كان بيبقى اسم الـ field، والـ <b>type</b> كان هو المفتاح. نفس الاسمين، في مكان مختلف.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'header.ts — older style', lang: 'ts', code: [
          'export class Header {',
          '  constructor(protected readonly session: Session) {}',
          '}' ] },
        good: { name: 'header.ts — today', lang: 'ts', code: [
          'export class Header {',
          '  protected readonly session = inject(Session);',
          '}' ] } },
      { t: 'p',
        en: `In both, ${mine('session')} is the header’s field and ${pub('Session')} is the key. In the old style the key hides in the type annotation after the colon, which is why it looks like a type and not a lookup. <code>inject()</code> also works in plain functions like ${pub('authGuard')}, where there is no constructor.`,
        ar: `في الاتنين، ${mine('session')} الـ field بتاع الهيدر و${pub('Session')} هو المفتاح. في الأسلوب القديم المفتاح مستخبي في الـ type اللي بعد النقطتين، وعشان كده شكله type مش حاجة بتدوّر عليها. و<code>inject()</code> بتشتغل كمان في functions عادية زي ${pub('authGuard')}، اللي مفيهاش constructor.` }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, or fails at runtime', ar: 'مش بيعمل حاجة، أو بيفشل وقت التشغيل' },
    title: { en: 'Mistakes that fail silently (or confusingly)', ar: 'غلطات بتفشل في صمت (أو بشكل ملخبط)' },
    lead: {
      en: 'The compiler checks names. It cannot check <b>which instance</b> you get, whether a guard is actually wired in, or when you call <code>inject()</code>.',
      ar: 'الـ compiler بيراجع الأسماء. لكن مايقدرش يراجع انت واخد <b>أنهي نسخة</b>، ولا الـ guard متوصّل فعلًا ولا لأ، ولا انت بتنادي <code>inject()</code> إمتى.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'A second copy of the service', ar: 'نسخة تانية من الـ service' }, blocks: [
        { t: 'pair',
          bad:  { name: 'header.ts — with providers', lang: 'ts', code: ['@Component({', "  selector: 'app-header',", '  providers: [Session],', '})'] },
          good: { name: 'header.ts — without', lang: 'ts', code: ['@Component({', "  selector: 'app-header',", '', '})'] } },
        { t: 'p', en: 'Listing the service in a component’s <code>providers</code> gives that component its <b>own</b> new instance. The login page signs in on the app-wide one; the header reads its private one and keeps showing “Sign in”. No error. Leave it to <code>providedIn: \'root\'</code>.',
                  ar: 'لما تكتب الـ service في <code>providers</code> بتاعة component، الـ component ده بياخد نسخة <b>جديدة لوحده</b>. صفحة اللوجين بتعمل sign in على النسخة اللي على مستوى التطبيق؛ والهيدر بيقرا من النسخة الخاصة بيه ويفضل يعرض «Sign in». من غير أي error. سيبها لـ <code>providedIn: \'root\'</code>.' }
      ]},
      { t: 'step', n: '2', title: { en: 'A guard that is written but not wired', ar: 'guard مكتوب بس مش متوصّل' }, blocks: [
        { t: 'pair',
          bad:  { name: 'app.routes.ts', lang: 'ts', code: ["{ path: 'orders', component: Orders },"] },
          good: { name: 'app.routes.ts', lang: 'ts', code: ["{ path: 'orders', component: Orders, canActivate: [authGuard] },"] } },
        { t: 'p', en: `${pub('authGuard')} does nothing until a route lists it in ${ng('canActivate')}. Without it, anyone can open the orders page, and nothing warns you, because an unused export is perfectly valid code.`,
                  ar: `${pub('authGuard')} مش بيعمل حاجة لحد ما route يكتبه في ${ng('canActivate')}. من غيره، أي حد يقدر يفتح صفحة الأوردرات، ومحدش هينبّهك، عشان export مش مستخدم ده كود سليم تمامًا.` }
      ]},
      { t: 'step', n: '3', title: { en: 'A path spelled two ways (runtime error)', ar: 'مسار مكتوب بطريقتين (error وقت التشغيل)' }, blocks: [
        { t: 'pair',
          bad:  { name: 'auth.guard.ts', lang: 'ts', code: ["return inject(Router).createUrlTree(['/signin']);"] },
          good: { name: 'auth.guard.ts', lang: 'ts', code: ["return inject(Router).createUrlTree(['/sign-in']);"] } },
        { t: 'p', en: `The route is ${pub('sign-in')}; the redirect says <code>signin</code>. Paths are strings, so the compiler is happy. At runtime the router cannot find a match and reports “Cannot match any routes” in the console, unless a <code>**</code> route quietly catches it.`,
                  ar: `الـ route اسمه ${pub('sign-in')}؛ والـ redirect بيقول <code>signin</code>. المسارات نصوص، فالـ compiler مبسوط. وقت التشغيل الراوتر مش بيلاقي حاجة تطابق وبيكتب «Cannot match any routes» في الـ console، إلا لو فيه route <code>**</code> بيمسكها في السكوت.` }
      ]},
      { t: 'step', n: '4', title: { en: 'Calling <code>inject()</code> too late (runtime error)', ar: 'إنك تنادي <code>inject()</code> متأخر (error وقت التشغيل)' }, blocks: [
        { t: 'pair',
          bad:  { name: 'login.ts — inject in a method', lang: 'ts', code: ['signInAs(person: string) {', '  inject(Session).signIn({ name: person });', '}'] },
          good: { name: 'login.ts', lang: 'ts', code: ['private readonly auth = inject(Session);', '', 'signInAs(person: string) {', '  this.auth.signIn({ name: person });', '}'] } },
        { t: 'p', en: `This compiles, then throws <b>NG0203</b> on the click: ${ng('inject')} only works while Angular is creating the component. Grab the service in a field first, under any name you like, then use that field later.`,
                  ar: `ده بيعمل compile، وبعدين بيرمي <b>NG0203</b> مع الكليك: ${ng('inject')} بتشتغل بس وأنجولار بيعمل الـ component. خد الـ service في field الأول، بأي اسم يعجبك، وبعدين استخدم الـ field ده بعدين.` }
      ]},
      { t: 'step', n: '5', title: { en: 'A private field in the template (compile error)', ar: 'field private في التمبلت (compile error)' }, blocks: [
        { t: 'pair',
          bad:  { name: 'header.ts — private', lang: 'ts', code: ['private readonly session = inject(Session);'] },
          good: { name: 'header.ts — protected', lang: 'ts', code: ['protected readonly session = inject(Session);'] } },
        { t: 'p', en: `The name is right, but <code>header.html</code> uses ${mine('session')}, and a template cannot reach <code>private</code> members. The error mentions the field, not the service, which is confusing the first time. Use <code>protected</code> for anything the template reads.`,
                  ar: `الاسم صح، بس <code>header.html</code> بيستخدم ${mine('session')}، والتمبلت مايقدرش يوصل للحاجات الـ <code>private</code>. والـ error بيتكلم عن الـ field مش الـ service، وده بيلخبط أول مرة. استخدم <code>protected</code> لأي حاجة التمبلت بيقراها.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it does nothing', ar: 'لما مايعملش حاجة' },
    title: { en: 'Five questions, in this order', ar: 'خمس أسئلة، بالترتيب ده' },
    lead: {
      en: 'One component changes the service and another does not see it. Ask these first.',
      ar: 'component بيغيّر في الـ service وcomponent تاني مش شايف التغيير. اسأل دول الأول.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Is the service <code>providedIn: \'root\'</code>, and is it missing from every component’s <code>providers</code>?',
                  ar: '<b>1.</b> الـ service <code>providedIn: \'root\'</code>، ومش مكتوبة في <code>providers</code> بتاعة أي component؟' },
      { t: 'chk', en: '<b>2.</b> Does every file inject the same class, <code>inject(Session)</code>, spelled exactly?',
                  ar: '<b>2.</b> كل ملف بيعمل inject لنفس الكلاس، <code>inject(Session)</code>، مكتوب بالظبط؟' },
      { t: 'chk', en: '<b>3.</b> Does the reader read a signal (<code>isSignedIn()</code>) rather than a value copied once into a field?',
                  ar: '<b>3.</b> اللي بيقرا بيقرا signal (<code>isSignedIn()</code>)، مش قيمة اتنسخت مرة واحدة في field؟' },
      { t: 'chk', en: '<b>4.</b> Is <code>inject()</code> called in a field, the constructor, or a guard/interceptor function, and not inside a method?',
                  ar: '<b>4.</b> <code>inject()</code> بتتنادى في field، أو الـ constructor، أو function بتاعة guard/interceptor، ومش جوه ميثود؟' },
      { t: 'chk', en: '<b>5.</b> For a guard: is it listed in the route’s <code>canActivate</code>, and do the paths in the route, the links and the redirect match letter for letter?',
                  ar: '<b>5.</b> لو guard: هو مكتوب في <code>canActivate</code> بتاع الـ route، والمسارات في الـ route واللينكات والـ redirect مطابقة حرف حرف؟' }
    ]
  }
  ]
};
