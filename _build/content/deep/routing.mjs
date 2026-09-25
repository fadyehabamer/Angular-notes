/* ==================================================================
   Routing, name by name — the companion page after the "routes are
   data, guards are functions" topic. One running example (an orders
   list, an order page behind a sign-in guard) followed through every
   file, every name coloured by who owns it. Names list: inline, below.
   ================================================================== */

/* a name in running text, coloured like the code and linked on hover */
const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

export default {
  topic: 'routing',
  tab: 'Routing, name by name — The Angular Signal',
  title: { en: 'Routing, name by name', ar: 'الـ routing، اسم اسم' },
  say: {
    en: 'The page for when <code>:id</code>, <code>id()</code>, <code>?tab=</code> and <code>queryParams</code> stop making sense. One click on an order followed through the routes, the guard and the pages, every name coloured by who owns it. Then which renames fail loudly and which ones fail in total silence.',
    ar: 'الصفحة دي لما <code>:id</code> و<code>id()</code> و<code>?tab=</code> و<code>queryParams</code> يبطلوا يبقى ليهم معنى. كليك واحدة على أوردر ماشيين وراها في الـ routes والـ guard والصفحات، وكل اسم ملوّن حسب صاحبه. وبعدين أنهي تغييرات بتفشل بصوت عالي وأنهي بتفشل في صمت تام.'
  },
  lead: {
    en: 'The idea is simple: <b>a URL comes in, the first matching route decides which component to show, and guards can say no.</b> The confusing part is the names. The URL itself carries names: the <code>:id</code> in a path, the <code>tab</code> in <code>?tab=</code>. They are written in one file and read in a completely different one, often only by spelling, and no compiler checks that they match. This page sorts out every name between the link and the page.',
    ar: 'الفكرة بسيطة: <b>URL بييجي، وأول route بيطابقه بيقرر أنهي component يظهر، والـ guards تقدر تقول لأ.</b> اللي بيلخبط هو الأسماء. الـ URL نفسه شايل أسماء: الـ <code>:id</code> في الـ path، والـ <code>tab</code> في <code>?tab=</code>. بيتكتبوا في ملف وبيتقروا في ملف تاني خالص، وغالبًا بالكتابة بس، ومفيش compiler بيراجع إنهم زي بعض. الصفحة دي بتفرز كل اسم بين اللينك والصفحة.'
  },

  names: {
    note: {
      en: 'Read the orange rows first. URL segments, <code>:params</code>, query keys and <code>data</code> keys are words you invent, but a link, a guard or a page types them too, and nothing checks the spelling. Every <b>key</b> of a route object (<code>path</code>, <code>canActivate</code>…) is Angular’s.',
      ar: 'اقرا الصفوف البرتقاني الأول. أجزاء الـ URL والـ <code>:params</code> ومفاتيح الـ query ومفاتيح الـ <code>data</code> كلمات انت بتخترعها، بس فيه لينك أو guard أو صفحة بيكتبوها برضه، ومحدش بيراجع الكتابة. وكل <b>مفتاح</b> في الـ route object (<code>path</code>، <code>canActivate</code>…) بتاع أنجولار.'
    },
    names: [
      /* --- shared: written in one file, read in another --- */
      { n:'orders', k:'pub', re:'(?<=[\'"]/?)orders(?=[/\'"])',
        w:{ en:'A URL segment. Every <code>path</code>, <code>redirectTo</code>, <code>routerLink</code> and <code>navigateByUrl</code> that means this page must use the same text.',
            ar:'جزء من الـ URL. أي <code>path</code> أو <code>redirectTo</code> أو <code>routerLink</code> أو <code>navigateByUrl</code> قصده الصفحة دي لازم يستخدم نفس النص.' } },
      { n:'sign-in', k:'pub', re:'(?<=\'/?)sign-in(?![\\w$-])',
        w:{ en:'The sign-in route’s path. The guard’s <code>[\'/sign-in\']</code> must match it.', ar:'الـ path بتاع route الـ sign-in. الـ <code>[\'/sign-in\']</code> اللي في الـ guard لازم يطابقه.' } },
      { n:'id', k:'pub', re:'(?<=:|readonly |\\{\\{ |\')id(?![\\w$-])',
        w:{ en:'The route parameter. The <code>:id</code> in the path and the page’s <code>id</code> input must be spelled the same, or the input never gets the value.',
            ar:'الـ parameter بتاع الـ route. الـ <code>:id</code> اللي في الـ path والـ input اللي اسمه <code>id</code> في الصفحة لازم يتكتبوا زي بعض، وإلا الـ input عمره ما هياخد القيمة.' } },
      { n:'tab', k:'pub',
        w:{ en:'A query parameter. The link writes <code>{ tab: … }</code>, the page’s <code>tab</code> input reads it. Same word on both sides.',
            ar:'query parameter. اللينك بيكتب <code>{ tab: … }</code>، والـ input اللي اسمه <code>tab</code> في الصفحة بيقراه. نفس الكلمة في الناحيتين.' } },
      { n:'section', k:'pub',
        w:{ en:'A key inside the route’s <code>data</code>, and the input that receives it.', ar:'مفتاح جوه <code>data</code> بتاعة الـ route، والـ input اللي بيستقبله.' } },
      { n:'next', k:'pub',
        w:{ en:'A query parameter the guard writes and the sign-in page’s input reads.', ar:'query parameter الـ guard بيكتبه والـ input بتاع صفحة الـ sign-in بيقراه.' } },
      { n:'routes', k:'pub', re:'(?<![\\w$./-])routes(?![\\w$-])',
        w:{ en:'Your exported array. <code>app.config.ts</code> imports it by this name.', ar:'الـ array اللي انت عامله export. <code>app.config.ts</code> بيعمله import بالاسم ده.' } },
      { n:'authGuard', k:'pub',
        w:{ en:'Your guard function, exported from one file and listed in the routes.', ar:'الـ guard function بتاعتك، معمولها export من ملف ومكتوبة في الـ routes.' } },
      { n:'Session', k:'pub', w:{ en:'Your service class, injected by the guard and the sign-in page.', ar:'كلاس الـ service بتاعك، والـ guard وصفحة الـ sign-in بيعملوله inject.' } },
      { n:'signedIn', k:'pub', w:{ en:'A signal on <code>Session</code>, read by the guard and set by the sign-in page.', ar:'signal في <code>Session</code>، الـ guard بيقراها وصفحة الـ sign-in بتغيّرها.' } },
      { n:'OrdersList', k:'pub', w:{ en:'The list page’s class, imported by the routes.', ar:'كلاس صفحة الليستة، والـ routes بتعمله import.' } },
      { n:'OrderPage', k:'pub',
        w:{ en:'The order page’s class. The lazy <code>.then(m => m.OrderPage)</code> picks it out of the file by this exact name.',
            ar:'كلاس صفحة الأوردر. الـ <code>.then(m => m.OrderPage)</code> الـ lazy بيطلّعه من الملف بالاسم ده بالظبط.' } },
      { n:'SignIn', k:'pub', w:{ en:'The sign-in page’s class, picked out by its lazy import.', ar:'كلاس صفحة الـ sign-in، والـ lazy import بيطلّعه.' } },
      { n:'appConfig', k:'pub', w:{ en:'Your config object. <code>main.ts</code> imports it by this name.', ar:'الـ config object بتاعك. <code>main.ts</code> بيعمله import بالاسم ده.' } },

      /* --- yours, private to one file --- */
      { n:'route', k:'mine',
        w:{ en:'The guard’s first parameter; in the older example, a private property. Unrelated names that happen to match. Both are yours.',
            ar:'أول parameter في الـ guard؛ وفي المثال القديم، property خاصة. أسماء ملهاش علاقة ببعض بالصدفة شبه بعض. الاتنين بتوعك.' } },
      { n:'state', k:'mine',
        w:{ en:'The guard’s second parameter. Angular passes it by position, so the name is yours.', ar:'تاني parameter في الـ guard. أنجولار بيبعته بالترتيب، فالاسم بتاعك.' } },
      { n:'m', k:'mine',
        w:{ en:'The arrow function’s parameter: the loaded file’s exports. Any name works.', ar:'الـ parameter بتاع الـ arrow function: الـ exports بتوع الملف اللي اتحمّل. أي اسم ينفع.' } },
      { n:'recentOrders', k:'mine', w:{ en:'The list page’s own signal.', ar:'الـ signal بتاعة صفحة الليستة نفسها.' } },
      { n:'order', k:'mine', w:{ en:'The loop variable in the list’s template.', ar:'متغير اللوب في تمبلت الليستة.' } },
      { n:'code', k:'mine',
        w:{ en:'A field on the list’s own data. It fills the <code>:id</code> slot of the URL, but its name has nothing to do with <code>id</code>.',
            ar:'field في الداتا الخاصة بالليستة. بيملا مكان الـ <code>:id</code> في الـ URL، بس اسمه مالوش أي علاقة بـ <code>id</code>.' } },
      { n:'session', k:'mine', re:'(?<![\\w$/-])session(?![\\w$-])', w:{ en:'The sign-in page’s private field.', ar:'الـ field الخاص بصفحة الـ sign-in.' } },
      { n:'router', k:'mine', re:'(?<![\\w$/-])router(?![\\w$-])', w:{ en:'The sign-in page’s private field holding the <code>Router</code>.', ar:'الـ field الخاص بصفحة الـ sign-in اللي شايل الـ <code>Router</code>.' } },
      { n:'signIn', k:'mine', w:{ en:'The sign-in page’s own method.', ar:'ميثود صفحة الـ sign-in نفسها.' } },
      { n:'orderId', k:'mine', only:['order-page.ts · with alias'],
        w:{ en:'With an alias, the property name is private; the router still matches the public name <code>id</code>.',
            ar:'مع الـ alias، اسم الـ property بيبقى خاص؛ والـ router لسه بيطابق الاسم اللي برّه <code>id</code>.' } },
      { n:'app-orders-list', k:'mine',
        w:{ en:'The list’s selector. A routed component is created by the router, so nobody types this tag: rename it freely.',
            ar:'الـ selector بتاع الليستة. الـ component اللي بيتعرض بالـ router الـ router هو اللي بيعمله، فمحدش بيكتب التاج ده: غيّره براحتك.' } },
      { n:'app-order-page', k:'mine', w:{ en:'A routed component’s selector. Nobody types it.', ar:'الـ selector بتاع component بيتعرض بالـ router. محدش بيكتبه.' } },
      { n:'app-sign-in', k:'mine', w:{ en:'A routed component’s selector. Nobody types it.', ar:'الـ selector بتاع component بيتعرض بالـ router. محدش بيكتبه.' } },

      /* --- Angular's, the browser's --- */
      { n:'Routes', k:'ng', w:{ en:'Angular’s type for a list of routes.', ar:'النوع بتاع أنجولار لقايمة routes.' } },
      { n:'path', k:'ng', w:{ en:'A route key. The text after it is yours.', ar:'مفتاح route. النص اللي بعده بتاعك.' } },
      { n:'pathMatch', k:'ng', w:{ en:'A route key: <code>\'full\'</code> means the whole URL must match.', ar:'مفتاح route: <code>\'full\'</code> معناها إن الـ URL كله لازم يطابق.' } },
      { n:'redirectTo', k:'ng', w:{ en:'A route key: go to this URL instead.', ar:'مفتاح route: روح للـ URL ده بدل كده.' } },
      { n:'component', k:'ng', w:{ en:'A route key: show this component, loaded up front.', ar:'مفتاح route: اعرض الـ component ده، متحمّل من الأول.' } },
      { n:'loadComponent', k:'ng', w:{ en:'A route key: download this component only when the route is visited.', ar:'مفتاح route: نزّل الـ component ده بس لما حد يروح للـ route.' } },
      { n:'canActivate', k:'ng', w:{ en:'A route key for guards that run before entering.', ar:'مفتاح route للـ guards اللي بتشتغل قبل الدخول.' } },
      { n:'data', k:'ng', w:{ en:'A route key for static values. The keys inside are yours.', ar:'مفتاح route لقيم ثابتة. المفاتيح اللي جواه بتاعتك.' } },
      { n:'title', k:'ng', w:{ en:'A route key: the browser tab text.', ar:'مفتاح route: نص تاب المتصفح.' } },
      { n:'**', k:'ng', re:'\\*\\*', w:{ en:'Angular’s wildcard path: anything no earlier route matched.', ar:'الـ wildcard path بتاع أنجولار: أي حاجة مفيش route قبلها طابقها.' } },
      { n:'CanActivateFn', k:'ng', w:{ en:'Angular’s type for a guard function.', ar:'النوع بتاع أنجولار لـ guard function.' } },
      { n:'Router', k:'ng', w:{ en:'Angular’s navigation service.', ar:'الـ service بتاعة أنجولار للتنقل.' } },
      { n:'createUrlTree', k:'ng', w:{ en:'A <code>Router</code> method: build a URL to redirect to.', ar:'ميثود في الـ <code>Router</code>: بتبني URL تعمل له redirect.' } },
      { n:'navigateByUrl', k:'ng', w:{ en:'A <code>Router</code> method: go to this URL.', ar:'ميثود في الـ <code>Router</code>: روح للـ URL ده.' } },
      { n:'queryParams', k:'ng',
        w:{ en:'An option key and a <code>routerLink</code> input. The keys inside become <code>?key=</code>, and those keys are yours.',
            ar:'مفتاح إعداد وinput في <code>routerLink</code>. المفاتيح اللي جواه بتبقى <code>?key=</code>، والمفاتيح دي بتاعتك.' } },
      { n:'url', k:'ng', w:{ en:'A property on the guard’s state: the URL being visited.', ar:'property في الـ state بتاع الـ guard: الـ URL اللي رايحينله.' } },
      { n:'routerLink', k:'ng', w:{ en:'Angular’s link directive.', ar:'الـ directive بتاع أنجولار للينكات.' } },
      { n:'RouterLink', k:'ng', w:{ en:'The class behind <code>routerLink</code>, listed in <code>imports</code>.', ar:'الكلاس اللي ورا <code>routerLink</code>، مكتوب في <code>imports</code>.' } },
      { n:'router-outlet', k:'ng', w:{ en:'Angular’s tag: where the routed component appears.', ar:'تاج أنجولار: المكان اللي الـ component بتاع الـ route بيظهر فيه.' } },
      { n:'provideRouter', k:'ng', w:{ en:'Angular’s function that switches the router on.', ar:'الـ function بتاعة أنجولار اللي بتشغّل الـ router.' } },
      { n:'withComponentInputBinding', k:'ng',
        w:{ en:'The router feature that fills inputs from the URL and <code>data</code>, by matching names.', ar:'الـ feature في الـ router اللي بتملا الـ inputs من الـ URL والـ <code>data</code>، لو الأسامي زي بعض.' } },
      { n:'ApplicationConfig', k:'ng', w:{ en:'Angular’s type for the app’s config.', ar:'النوع بتاع أنجولار للـ config بتاع التطبيق.' } },
      { n:'providers', k:'ng', w:{ en:'An option key Angular reads.', ar:'مفتاح إعداد أنجولار بيقراه.' } },
      { n:'ActivatedRoute', k:'ng', w:{ en:'Angular’s service describing the current route.', ar:'الـ service بتاعة أنجولار اللي بتوصف الـ route الحالي.' } },
      { n:'snapshot', k:'ng', w:{ en:'The route as it was at one moment. It does not update.', ar:'الـ route زي ما كان في لحظة واحدة. مش بيتحدّث.' } },
      { n:'paramMap', k:'ng', w:{ en:'Angular’s map of route parameters.', ar:'الـ map بتاعة أنجولار للـ route parameters.' } },
      { n:'get', k:'ng', w:{ en:'The map’s method. The string you pass must match the <code>:param</code>.', ar:'ميثود الـ map. النص اللي بتديهوله لازم يطابق الـ <code>:param</code>.' } },
      { n:'inject', k:'ng', w:{ en:'Angular’s function that hands you a dependency.', ar:'الـ function بتاعة أنجولار اللي بتديك dependency.' } },
      { n:'@Injectable', k:'ng', w:{ en:'Angular’s decorator for a service.', ar:'الـ decorator بتاع أنجولار للـ service.' } },
      { n:'providedIn', k:'ng', w:{ en:'An option key: <code>\'root\'</code> means one shared instance.', ar:'مفتاح إعداد: <code>\'root\'</code> معناها نسخة واحدة متشاركة.' } },
      { n:'input', k:'ng', re:'(?<![\\w$<(-])input(?=[.(<,])', w:{ en:'Angular’s function that creates an input.', ar:'الـ function بتاعة أنجولار اللي بتعمل input.' } },
      { n:'required', k:'ng', w:{ en:'Part of <code>input.required</code>.', ar:'جزء من <code>input.required</code>.' } },
      { n:'alias', k:'ng', w:{ en:'An option key: the input’s public name.', ar:'مفتاح إعداد: الاسم اللي برّه للـ input.' } },
      { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
      { n:'set', k:'ng', w:{ en:'A signal method.', ar:'ميثود بتاعة الـ signal.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator for a component.', ar:'الـ decorator بتاع أنجولار للـ component.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The tag name after it is yours.', ar:'مفتاح إعداد. اسم التاج اللي بعده بتاعك.' } },
      { n:'imports', k:'ng', w:{ en:'An option key: what this template may use.', ar:'مفتاح إعداد: التمبلت ده مسموحله يستخدم إيه.' } },
      { n:'template', k:'ng', w:{ en:'An option key: the HTML written inline.', ar:'مفتاح إعداد: الـ HTML مكتوب جوه الملف.' } },
      { n:'@for', k:'ng', w:{ en:'Angular’s loop block.', ar:'بلوك اللوب بتاع أنجولار.' } },
      { n:'track', k:'ng', w:{ en:'Part of <code>@for</code>.', ar:'جزء من <code>@for</code>.' } },
      { n:'click', k:'ng', w:{ en:'The browser’s own event name.', ar:'اسم الـ event بتاع المتصفح نفسه.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One click on an order, six stops', ar: 'كليك واحدة على أوردر، ست محطات' },
    lead: {
      en: 'An orders list. Each order links to its own page, opened on the Payments tab. The order page is only for signed-in users, so a guard sends everyone else to sign in first, and then back. Follow one click by someone who is not signed in yet:',
      ar: 'ليستة أوردرات. كل أوردر ليه لينك لصفحته، بتفتح على تاب Payments. وصفحة الأوردر للمسجّلين بس، فالـ guard بيبعت أي حد تاني يعمل sign in الأول، وبعدين يرجعه. امشي ورا كليك واحدة من حد لسه ماعملش sign in:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'orders-list.ts', lang: 'html', who: { en: 'list · builds the URL', ar: 'الليستة · بتبني الـ URL' },
          code: [`<a [routerLink]="['/orders', order.code]" [queryParams]="{ tab: 'payments' }">`],
          say: { en: `The link produces <code>/orders/A-42?tab=payments</code>. ${ng('routerLink')} and ${ng('queryParams')} are Angular’s. ${pub('orders')} must match a route’s path. ${pub('tab')} is a key you just invented; some page has to read it by exactly that name. ${mine('code')} is only the list’s own field.`,
                 ar: `اللينك بيطلّع <code>/orders/A-42?tab=payments</code>. ${ng('routerLink')} و${ng('queryParams')} بتوع أنجولار. و${pub('orders')} لازم يطابق path بتاع route. و${pub('tab')} مفتاح انت لسه مخترعه؛ وفيه صفحة لازم تقراه بالاسم ده بالظبط. و${mine('code')} مجرد field خاص بالليستة.` } },
        { file: 'app.routes.ts', lang: 'ts', who: { en: 'routes · the match', ar: 'الـ routes · المطابقة' },
          code: ["path: 'orders/:id',"],
          say: { en: `The router walks the array top to bottom. This path matches, and the colon means “whatever is here, call it ${pub('id')}”. So <code>A-42</code> is now the parameter ${pub('id')}. You chose that name here, in the routes file.`,
                 ar: `الـ router بيمشي على الـ array من فوق لتحت. الـ path ده بيطابق، والنقطتين معناها «أي حاجة هنا، سمّيها ${pub('id')}». فـ <code>A-42</code> بقت الـ parameter اللي اسمه ${pub('id')}. انت اللي اخترت الاسم ده هنا، في ملف الـ routes.` } },
        { file: 'app.routes.ts', lang: 'ts', who: { en: 'routes · the gate', ar: 'الـ routes · البوابة' },
          code: ['canActivate: [authGuard],'],
          say: { en: `${ng('canActivate')} is Angular’s key. ${pub('authGuard')} is your function, imported from its own file. It runs before the page is shown.`,
                 ar: `${ng('canActivate')} مفتاح أنجولار. و${pub('authGuard')} الـ function بتاعتك، متعمله import من ملفه. بيشتغل قبل ما الصفحة تظهر.` } },
        { file: 'auth.guard.ts', lang: 'ts', who: { en: 'guard · says no', ar: 'الـ guard · بيقول لأ' },
          code: ['export const authGuard: CanActivateFn = (route, state) => {', '  …', "  return inject(Router).createUrlTree(['/sign-in'], {", '    queryParams: { next: state.url },', '  });'],
          say: { en: `Angular calls the guard with two arguments <b>by position</b>, so ${mine('route')} and ${mine('state')} are your names. Not signed in, so it redirects to ${pub('sign-in')}, adding a query key you invented, ${pub('next')}, holding the URL they wanted.`,
                 ar: `أنجولار بينادي الـ guard بـ two arguments <b>بالترتيب</b>، فـ ${mine('route')} و${mine('state')} أسماءك. ومش عامل sign in، فبيعمل redirect لـ ${pub('sign-in')}، وبيزوّد مفتاح query انت اخترعته، ${pub('next')}، شايل الـ URL اللي كان عايزه.` } },
        { file: 'sign-in.ts', lang: 'ts', who: { en: 'sign-in · reads next', ar: 'الـ sign-in · بيقرا next' },
          code: ['readonly next = input<string>();', '…', "this.router.navigateByUrl(this.next() ?? '/orders');"],
          say: { en: `The sign-in page has an input called ${pub('next')}, so <code>withComponentInputBinding()</code> fills it from <code>?next=</code>. The link between the guard and this page is <b>only the spelling</b>. After signing in, it goes back.`,
                 ar: `صفحة الـ sign-in فيها input اسمه ${pub('next')}، فـ <code>withComponentInputBinding()</code> بيملاه من <code>?next=</code>. الرابط بين الـ guard والصفحة دي هو <b>الكتابة بس</b>. وبعد الـ sign in، بترجع.` } },
        { file: 'order-page.ts', lang: 'ts', who: { en: 'order page · reads the URL', ar: 'صفحة الأوردر · بتقرا الـ URL' },
          code: ['readonly id = input.required<string>();', 'readonly tab = input<string>();'],
          say: { en: `This time the guard says yes. The page gets <code>A-42</code> in ${pub('id')} and <code>payments</code> in ${pub('tab')}, because the input names match <code>:id</code> and <code>?tab=</code>. Nothing else connects them.`,
                 ar: `المرة دي الـ guard بيقول آه. الصفحة بتاخد <code>A-42</code> في ${pub('id')} و<code>payments</code> في ${pub('tab')}، عشان أسماء الـ inputs بتطابق <code>:id</code> و<code>?tab=</code>. ومفيش حاجة تانية بتربطهم.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'The URL is the message. <code>orders</code>, <code>:id</code>, <code>?tab=</code> and <code>?next=</code> are names inside it, written in one file and read in another. Each must be spelled exactly like the path or the input on the other end.',
        ar: 'الـ URL هو الرسالة. <code>orders</code> و<code>:id</code> و<code>?tab=</code> و<code>?next=</code> أسماء جواه، بتتكتب في ملف وبتتقري في ملف تاني. وكل واحد لازم يتكتب بالظبط زي الـ path أو الـ input اللي في الناحية التانية.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Which file?', ar: 'أنهي ملف؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'Every name in a URL has one file that <b>defines</b> it and at least one that <b>uses</b> it. Knowing which is which ends most routing confusion.',
      ar: 'كل اسم في الـ URL ليه ملف واحد بيـ<b>عرّفه</b> وملف واحد على الأقل بيـ<b>ستخدمه</b>. لما تعرف مين فين، أغلب لخبطة الـ routing بتخلص.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: [`<code>path: 'orders/:id'</code>`, '<code>app.routes.ts</code>', 'you, once', `you pick ${pub('orders')} and ${pub('id')}; ${ng('path')} and the <code>:</code> are Angular’s`],
            ar: [`<code>path: 'orders/:id'</code>`, '<code>app.routes.ts</code>', 'انت، مرة واحدة', `انت بتختار ${pub('orders')} و${pub('id')}؛ و${ng('path')} والـ <code>:</code> بتوع أنجولار`] },
          { en: [`<code>data: { section: 'sales' }</code>`, '<code>app.routes.ts</code>', 'you', `you pick ${pub('section')}; ${ng('data')} is Angular’s`],
            ar: [`<code>data: { section: 'sales' }</code>`, '<code>app.routes.ts</code>', 'انت', `انت بتختار ${pub('section')}؛ و${ng('data')} بتاعة أنجولار`] },
          { en: [`<code>[routerLink]="['/orders', …]"</code>, <code>{ tab: … }</code>`, 'the list’s template', 'the page that links', `copies ${pub('orders')}; invents ${pub('tab')}`],
            ar: [`<code>[routerLink]="['/orders', …]"</code>، <code>{ tab: … }</code>`, 'تمبلت الليستة', 'الصفحة اللي فيها اللينك', `بينسخ ${pub('orders')}؛ وبيخترع ${pub('tab')}`] },
          { en: ['<code>(route, state) => …</code>', '<code>auth.guard.ts</code>', 'the guard', `you pick ${pub('authGuard')}, ${mine('route')}, ${mine('state')}`],
            ar: ['<code>(route, state) => …</code>', '<code>auth.guard.ts</code>', 'الـ guard', `انت بتختار ${pub('authGuard')} و${mine('route')} و${mine('state')}`] },
          { en: [`<code>queryParams: { next: … }</code>`, '<code>auth.guard.ts</code>', 'the guard', `invents ${pub('next')}; copies ${pub('sign-in')}`],
            ar: [`<code>queryParams: { next: … }</code>`, '<code>auth.guard.ts</code>', 'الـ guard', `بيخترع ${pub('next')}؛ وبينسخ ${pub('sign-in')}`] },
          { en: ['<code>id</code>, <code>tab</code>, <code>section</code>, <code>next</code> inputs', 'the page components', 'the pages', 'copy the URL and <code>data</code> names, letter for letter'],
            ar: ['الـ inputs <code>id</code> و<code>tab</code> و<code>section</code> و<code>next</code>', 'الـ components بتاعة الصفحات', 'الصفحات', 'بتنسخ أسماء الـ URL والـ <code>data</code>، حرف حرف'] },
        ] },
      { t: 'ul',
        en: ['<b>The routes file names the path pieces; the page copies them.</b> <code>:id</code> is defined in <code>app.routes.ts</code>; the <code>id</code> input only receives it.',
             '<b>Query keys have no home at all.</b> Nobody declares <code>tab</code> in advance. The link invents it and the page reads it. Keep them in sync yourself.',
             '<b>A routed page never types a tag.</b> The router creates it from the class in the routes file, so its selector is effectively private.'],
        ar: ['<b>ملف الـ routes بيسمّي حتت الـ path؛ والصفحة بتنسخهم.</b> الـ <code>:id</code> متعرّف في <code>app.routes.ts</code>؛ والـ input اللي اسمه <code>id</code> بيستقبله وبس.',
             '<b>مفاتيح الـ query مالهاش بيت خالص.</b> محدش بيعلن <code>tab</code> من الأول. اللينك بيخترعه والصفحة بتقراه. خلّيهم متزامنين بنفسك.',
             '<b>الصفحة اللي بتتعرض بالـ router عمرها ما بتتكتب كتاج.</b> الـ router بيعملها من الكلاس اللي في ملف الـ routes، فالـ selector بتاعها عمليًا خاص.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All seven files, every name coloured', ar: 'السبع ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same app, complete. Hover <code>next</code> or <code>tab</code> to see the two files that must agree on a word no compiler checks. Then press <b>Rename test</b>: every name you own changes on both sides, and the app still works.',
      ar: 'نفس التطبيق، كامل. قف على <code>next</code> أو <code>tab</code> عشان تشوف الملفين اللي لازم يتفقوا على كلمة مفيش compiler بيراجعها. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: كل اسم بتاعك بيتغير في الناحيتين، والتطبيق لسه شغال.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'app.config.ts', lang: 'ts', tag: { en: 'switches it on', ar: 'بيشغّله' }, code: [
        "import { ApplicationConfig } from '@angular/core';",
        "import { provideRouter, withComponentInputBinding } from '@angular/router';",
        "import { routes } from './app.routes';",
        '',
        'export const appConfig: ApplicationConfig = {',
        '  providers: [provideRouter(routes, withComponentInputBinding())],',
        '};' ] },
      { t: 'code', name: 'app.routes.ts', lang: 'ts', tag: { en: 'the map', ar: 'الخريطة' }, code: [
        "import { Routes } from '@angular/router';",
        "import { authGuard } from './auth.guard';",
        "import { OrdersList } from './orders/orders-list';",
        '',
        'export const routes: Routes = [',
        "  { path: '', pathMatch: 'full', redirectTo: 'orders' },",
        "  { path: 'orders', component: OrdersList, title: 'Orders' },",
        '  {',
        "    path: 'orders/:id',",
        "    loadComponent: () => import('./orders/order-page').then(m => m.OrderPage),",
        '    canActivate: [authGuard],',
        "    data: { section: 'sales' },",
        "    title: 'Order details',",
        '  },',
        "  { path: 'sign-in', loadComponent: () => import('./sign-in').then(m => m.SignIn) },",
        "  { path: '**', redirectTo: 'orders' },",
        '];' ] },
      { t: 'code', name: 'auth.guard.ts', lang: 'ts', tag: { en: 'the gate', ar: 'البوابة' }, code: [
        "import { inject } from '@angular/core';",
        "import { CanActivateFn, Router } from '@angular/router';",
        "import { Session } from './session';",
        '',
        'export const authGuard: CanActivateFn = (route, state) => {',
        '  if (inject(Session).signedIn()) return true;',
        "  return inject(Router).createUrlTree(['/sign-in'], {",
        '    queryParams: { next: state.url },',
        '  });',
        '};' ] },
      { t: 'code', name: 'session.ts', lang: 'ts', tag: { en: 'shared state', ar: 'حالة متشاركة' }, code: [
        "import { Injectable, signal } from '@angular/core';",
        '',
        "@Injectable({ providedIn: 'root' })",
        'export class Session {',
        '  readonly signedIn = signal(false);',
        '}' ] },
      { t: 'code', name: 'orders-list.ts', lang: 'ts', tag: { en: 'writes the URL', ar: 'بيكتب الـ URL' }, code: [
        "import { Component, signal } from '@angular/core';",
        "import { RouterLink } from '@angular/router';",
        '',
        '@Component({',
        "  selector: 'app-orders-list',",
        '  imports: [RouterLink],',
        '  template: `',
        '    @for (order of recentOrders(); track order.code) {',
        `      <a [routerLink]="['/orders', order.code]" [queryParams]="{ tab: 'payments' }">`,
        '        Order {{ order.code }}',
        '      </a>',
        '    }',
        '  `,',
        '})',
        'export class OrdersList {',
        "  readonly recentOrders = signal([{ code: 'A-41' }, { code: 'A-42' }]);",
        '}' ] },
      { t: 'code', name: 'order-page.ts', lang: 'ts', tag: { en: 'reads the URL', ar: 'بيقرا الـ URL' }, code: [
        "import { Component, input } from '@angular/core';",
        '',
        '@Component({',
        "  selector: 'app-order-page',",
        '  template: `',
        '    <h1>Order {{ id() }}</h1>',
        "    <p>Tab: {{ tab() ?? 'items' }} · Section: {{ section() }}</p>",
        '  `,',
        '})',
        'export class OrderPage {',
        '  readonly id = input.required<string>();   // from :id in the path',
        '  readonly tab = input<string>();           // from ?tab= in the URL',
        '  readonly section = input<string>();       // from data: { section }',
        '}' ] },
      { t: 'code', name: 'sign-in.ts', lang: 'ts', tag: { en: 'reads ?next=', ar: 'بيقرا ?next=' }, code: [
        "import { Component, inject, input } from '@angular/core';",
        "import { Router } from '@angular/router';",
        "import { Session } from './session';",
        '',
        '@Component({',
        "  selector: 'app-sign-in',",
        '  template: `<button (click)="signIn()">Sign in</button>`,',
        '})',
        'export class SignIn {',
        '  readonly next = input<string>();   // from ?next= in the URL',
        '  private readonly session = inject(Session);',
        '  private readonly router = inject(Router);',
        '',
        '  signIn() {',
        '    this.session.signedIn.set(true);',
        "    this.router.navigateByUrl(this.next() ?? '/orders');",
        '  }',
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
      en: 'TypeScript names, like guards, classes and exports, give compile errors. The names that live <b>inside strings</b>, URL segments, <code>:params</code> and query keys, give none. Those are where routing bugs hide.',
      ar: 'أسماء الـ TypeScript، زي الـ guards والكلاسات والـ exports، بتدي compile errors. أما الأسماء اللي عايشة <b>جوه نصوص</b>، أجزاء الـ URL والـ <code>:params</code> ومفاتيح الـ query، فمش بتدي حاجة. وهناك بالظبط الباجز بتاعة الـ routing بتستخبى.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [pub('orders') + ' (a path)', 'every <code>routerLink</code>, <code>redirectTo</code> and <code>navigateByUrl</code> that points there', '<b>No compile error.</b> The old URL matches no route, so the <code>**</code> route catches it. Without a <code>**</code> route, navigation fails with a “Cannot match any routes” error in the console.'],
            ar: [pub('orders') + ' (path)', 'كل <code>routerLink</code> و<code>redirectTo</code> و<code>navigateByUrl</code> بيشاور هناك', '<b>مفيش compile error.</b> الـ URL القديم مش بيطابق أي route، فالـ route اللي فيه <code>**</code> بيمسكه. ومن غير route <code>**</code>، التنقل بيفشل بـ error «Cannot match any routes» في الـ console.'] },
          { en: [pub('id') + ' (the <code>:param</code>)', 'the page’s <code>id</code> input', '<b>No compile error.</b> The input just does not receive the URL value.'],
            ar: [pub('id') + ' (الـ <code>:param</code>)', 'الـ input اللي اسمه <code>id</code> في الصفحة', '<b>مفيش compile error.</b> الـ input ببساطة مش بياخد القيمة اللي في الـ URL.'] },
          { en: [`${pub('tab')}, ${pub('next')} (query keys)`, 'the page’s input of the same name', '<b>No error.</b> The input stays <code>undefined</code>, so the page quietly shows its fallback.'],
            ar: [`${pub('tab')} و${pub('next')} (مفاتيح query)`, 'الـ input اللي بنفس الاسم في الصفحة', '<b>مفيش error.</b> الـ input بيفضل <code>undefined</code>، فالصفحة بتعرض الـ fallback بتاعها في هدوء.'] },
          { en: [pub('section') + ' (a <code>data</code> key)', 'the page’s <code>section</code> input', '<b>No error.</b> Same: the input stays empty.'],
            ar: [pub('section') + ' (مفتاح <code>data</code>)', 'الـ input اللي اسمه <code>section</code> في الصفحة', '<b>مفيش error.</b> نفس الحكاية: الـ input بيفضل فاضي.'] },
          { en: [pub('sign-in') + ' (a path)', 'the guard’s <code>[\'/sign-in\']</code>', '<b>No compile error.</b> The redirect lands on <code>**</code>, which sends you to the orders list.'],
            ar: [pub('sign-in') + ' (path)', 'الـ <code>[\'/sign-in\']</code> اللي في الـ guard', '<b>مفيش compile error.</b> الـ redirect بيقع على <code>**</code>، اللي بيوديك لليستة الأوردرات.'] },
          { en: [`${pub('authGuard')}, ${pub('Session')}, ${pub('routes')}, ${pub('appConfig')}`, 'every import of it', 'Compile error on the import.'],
            ar: [`${pub('authGuard')} و${pub('Session')} و${pub('routes')} و${pub('appConfig')}`, 'كل import ليه', 'Compile error في الـ import.'] },
          { en: [`${pub('OrderPage')}, ${pub('SignIn')}`, 'the <code>.then(m => m.OrderPage)</code> in the routes', 'Compile error: the loaded module has no export by that name.'],
            ar: [`${pub('OrderPage')} و${pub('SignIn')}`, 'الـ <code>.then(m => m.OrderPage)</code> اللي في الـ routes', 'Compile error: الـ module اللي اتحمّل مفيهوش export بالاسم ده.'] },
          { en: [`${mine('route')}, ${mine('state')}, ${mine('m')}, ${mine('app-order-page')}`, 'only inside their own function or file', 'Compile error inside that function, or nothing at all for a routed component’s selector.'],
            ar: [`${mine('route')} و${mine('state')} و${mine('m')} و${mine('app-order-page')}`, 'جوه الـ function أو الملف بتاعهم بس', 'Compile error جوه الـ function دي، أو ولا حاجة خالص للـ selector بتاع component بيتعرض بالـ router.'] },
          { en: [`${ng('path')}, ${ng('canActivate')}, ${ng('routerLink')}, ${ng('queryParams')}`, 'nothing: you cannot rename these', 'They are Angular’s words.'],
            ar: [`${ng('path')} و${ng('canActivate')} و${ng('routerLink')} و${ng('queryParams')}`, 'ولا حاجة: دول مينفعش يتغيروا', 'دي كلمات أنجولار.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b> above the files and follow <code>next</code>: it changes inside the guard’s <code>queryParams</code> and on the sign-in page’s input together. Nothing but you keeps those two in step.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b> فوق الملفات وامشي ورا <code>next</code>: بيتغير جوه <code>queryParams</code> بتاعة الـ guard وعلى الـ input بتاع صفحة الـ sign-in مع بعض. ومفيش حد غيرك بيخلّي الاتنين دول ماشيين مع بعض.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتاعتك' },
    title: { en: 'The fixed names: keys, not values', ar: 'الأسماء الثابتة: المفاتيح، مش القيم' },
    lead: {
      en: 'A simple rule covers almost everything: in a route object, the <b>keys</b> are Angular’s and the <b>values</b> are yours. Beyond that, a handful of router pieces have fixed names.',
      ar: 'قاعدة بسيطة بتغطي تقريبًا كل حاجة: في الـ route object، الـ <b>مفاتيح</b> بتاعة أنجولار والـ <b>قيم</b> بتاعتك. وغير كده، فيه كام حتة في الـ router أسماءها ثابتة.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Word', 'Owner', 'Notes'], ar: ['الكلمة', 'صاحبها', 'ملاحظات'] },
        rows: [
          { en: [`${ng('path')}, ${ng('component')}, ${ng('loadComponent')}, ${ng('redirectTo')}, ${ng('pathMatch')}, ${ng('canActivate')}, ${ng('data')}, ${ng('title')}`, 'Angular', 'Route keys. A typo in a key is a compile error, because <code>Routes</code> is typed.'],
            ar: [`${ng('path')} و${ng('component')} و${ng('loadComponent')} و${ng('redirectTo')} و${ng('pathMatch')} و${ng('canActivate')} و${ng('data')} و${ng('title')}`, 'أنجولار', 'مفاتيح الـ route. الغلطة الإملائية في مفتاح compile error، عشان <code>Routes</code> ليها type.'] },
          { en: ['<code>:</code> in a path, <code>**</code>', 'Angular', '<code>:</code> marks a parameter; the word after it is yours. <code>**</code> means “anything”.'],
            ar: ['<code>:</code> في الـ path، و<code>**</code>', 'أنجولار', 'الـ <code>:</code> بتعلّم parameter؛ والكلمة اللي بعدها بتاعتك. و<code>**</code> معناها «أي حاجة».'] },
          { en: [`<code>'full'</code>`, 'Angular', 'One of the two allowed values of <code>pathMatch</code>. Not every value is free.'],
            ar: [`<code>'full'</code>`, 'أنجولار', 'واحدة من القيمتين المسموحين لـ <code>pathMatch</code>. مش كل القيم براحتك.'] },
          { en: [`${ng('routerLink')}, ${ng('queryParams')}, ${ng('router-outlet')}`, 'Angular', 'Template names. The <b>keys inside</b> <code>queryParams</code> are yours.'],
            ar: [`${ng('routerLink')} و${ng('queryParams')} و${ng('router-outlet')}`, 'أنجولار', 'أسماء في التمبلت. <b>المفاتيح اللي جوه</b> <code>queryParams</code> بتاعتك.'] },
          { en: [`${ng('CanActivateFn')}, ${ng('Router')}, ${ng('createUrlTree')}, ${ng('navigateByUrl')}, ${ng('url')}`, 'Angular', 'Router API. The guard’s <b>parameter</b> names are not part of it.'],
            ar: [`${ng('CanActivateFn')} و${ng('Router')} و${ng('createUrlTree')} و${ng('navigateByUrl')} و${ng('url')}`, 'أنجولار', 'API الـ router. أسماء <b>الـ parameters</b> بتاعة الـ guard مش جزء منه.'] },
          { en: [`${ng('provideRouter')}, ${ng('withComponentInputBinding')}`, 'Angular', 'Setup functions.'],
            ar: [`${ng('provideRouter')} و${ng('withComponentInputBinding')}`, 'أنجولار', 'functions الإعداد.'] },
        ] },
      { t: 'code', name: 'app.html', lang: 'html', tag: { en: 'the app shell', ar: 'هيكل التطبيق' }, code: [
        '<nav><a routerLink="/orders">Orders</a></nav>',
        '',
        '<!-- the routed page appears here. Import RouterOutlet and RouterLink. -->',
        '<router-outlet />' ] }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'URLs are public: people bookmark them and paste them into chats. Name them for people, and keep code names in sync with them.',
      ar: 'الـ URLs حاجة عامة: الناس بتعملها bookmark وبتلزقها في الشات. سمّيها للناس، وخلّي أسماء الكود ماشية معاها.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['a path segment', 'lowercase, dashes: <code>orders</code>, <code>sign-in</code>', '<code>signIn</code>, <code>Orders</code>', 'URLs are read by people and are case-sensitive in the router. One lowercase style avoids near-duplicates.'],
            ar: ['جزء من الـ path', 'حروف صغيرة وشرط: <code>orders</code>، <code>sign-in</code>', '<code>signIn</code>، <code>Orders</code>', 'الـ URLs الناس بتقراها، والـ router بيفرّق بين الكبير والصغير. أسلوب واحد بحروف صغيرة بيمنع نسخ شبه بعض.'] },
          { en: ['a <code>:param</code>', 'what it is: <code>id</code>, <code>slug</code>', '<code>x</code>, <code>param1</code>', 'It becomes an input name in the page, so choose one you are happy to read in TypeScript.'],
            ar: ['الـ <code>:param</code>', 'هو إيه: <code>id</code>، <code>slug</code>', '<code>x</code>، <code>param1</code>', 'هيبقى اسم input في الصفحة، فاختار اسم مرتاح تقراه في TypeScript.'] },
          { en: ['a query key', 'short and stable: <code>tab</code>, <code>page</code>, <code>next</code>', 'renaming it later', 'Old bookmarks still carry the old key. Renaming it silently breaks them.'],
            ar: ['مفتاح query', 'قصير وثابت: <code>tab</code>، <code>page</code>، <code>next</code>', 'إنك تغيّره بعدين', 'الـ bookmarks القديمة لسه شايلة المفتاح القديم. لو غيّرته بتبوظهم في صمت.'] },
          { en: ['a guard', 'what it checks + <code>Guard</code>: <code>authGuard</code>', '<code>check</code>, <code>guard1</code>', 'It is listed next to other guards in the routes file; the name should say what it protects.'],
            ar: ['الـ guard', 'بيتأكد من إيه + <code>Guard</code>: <code>authGuard</code>', '<code>check</code>، <code>guard1</code>', 'بيتكتب جنب guards تانية في ملف الـ routes؛ والاسم المفروض يقول بيحمي إيه.'] },
          { en: ['guard parameters', '<code>route, state</code>, or <code>_route</code> when unused', 'anything that suggests another order', 'They arrive by position. Swapping the names does not swap the values.'],
            ar: ['الـ parameters بتوع الـ guard', '<code>route, state</code>، أو <code>_route</code> لو مش مستخدم', 'أي اسم يوحي بترتيب تاني', 'بيوصلوا بالترتيب. لو بدّلت الأسماء القيم مش هتتبدّل.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Four places where the name is not free', ar: 'أربع أماكن الاسم فيهم مش براحتك' },
    lead: {
      en: 'Your names are free, until the router has to connect them to something.',
      ar: 'أسماءك براحتك، لحد ما الـ router يحتاج يوصّلها بحاجة.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'Input names must equal the URL names, or use an alias', ar: 'أسماء الـ inputs لازم تساوي أسماء الـ URL، أو استخدم alias' }, blocks: [
        { t: 'p',
          en: `With <code>withComponentInputBinding()</code>, the router fills an input only if its public name equals a <code>:param</code>, a query key or a <code>data</code> key. If you want a different property name, keep the public name with ${ng('alias')}:`,
          ar: `مع <code>withComponentInputBinding()</code>، الـ router بيملا الـ input بس لو اسمه اللي برّه بيساوي <code>:param</code> أو مفتاح query أو مفتاح <code>data</code>. ولو عايز اسم property تاني، حافظ على الاسم اللي برّه بـ ${ng('alias')}:` },
        { t: 'code', name: 'order-page.ts · with alias', lang: 'ts', tag: { en: 'same URL, nicer property', ar: 'نفس الـ URL، property أحلى' }, code: [
          "readonly orderId = input.required<string>({ alias: 'id' });" ] }
      ]},
      { t: 'step', n: 'B', title: { en: 'No leading slash in a route’s path', ar: 'مفيش slash في أول الـ path بتاع الـ route' }, blocks: [
        { t: 'pair',
          bad:  { name: 'app.routes.ts', lang: 'ts', code: ["  { path: '/orders', component: OrdersList },"] },
          good: { name: 'app.routes.ts', lang: 'ts', code: ["  { path: 'orders', component: OrdersList },"] } },
        { t: 'p', en: 'In the routes file, paths never start with <code>/</code>; the router rejects that with an error when the app starts. In a <b>link</b> it is the opposite: <code>/orders</code> means “from the root”, and <code>orders</code> means “relative to where I am now”.',
                  ar: 'في ملف الـ routes، الـ paths عمرها ما بتبدأ بـ <code>/</code>؛ والـ router بيرفض ده بـ error أول ما التطبيق يشتغل. أما في <b>اللينك</b> فالعكس: <code>/orders</code> معناها «من الأول خالص»، و<code>orders</code> معناها «نسبةً للمكان اللي أنا فيه دلوقتي».' }
      ]},
      { t: 'step', n: 'C', title: { en: 'The lazy import picks an export by name', ar: 'الـ lazy import بيطلّع export بالاسم' }, blocks: [
        { t: 'p',
          en: `<code>.then(m => m.OrderPage)</code> reads the export called ${pub('OrderPage')} from the file. ${mine('m')} is yours, <code>OrderPage</code> is not free: it must be the exported class name. If the file uses <code>export default class OrderPage</code>, you can drop the <code>.then(…)</code> entirely: <code>loadComponent: () => import('./orders/order-page')</code>.`,
          ar: `<code>.then(m => m.OrderPage)</code> بيقرا الـ export اللي اسمه ${pub('OrderPage')} من الملف. ${mine('m')} بتاعك، لكن <code>OrderPage</code> مش براحتك: لازم يبقى اسم الكلاس اللي معمول له export. ولو الملف فيه <code>export default class OrderPage</code>، تقدر تشيل الـ <code>.then(…)</code> خالص: <code>loadComponent: () => import('./orders/order-page')</code>.` }
      ]},
      { t: 'step', n: 'D', title: { en: 'Guard parameters arrive by position', ar: 'الـ parameters بتوع الـ guard بيوصلوا بالترتيب' }, blocks: [
        { t: 'p',
          en: `A <code>CanActivateFn</code> receives the route first and the router state second. You may call them anything, but not in a different order: <code>(state, route)</code> would put the route in a variable called <code>state</code>.`,
          ar: `الـ <code>CanActivateFn</code> بتاخد الـ route الأول والـ router state تاني. تقدر تسمّيهم أي حاجة، بس مش بترتيب تاني: <code>(state, route)</code> هتحط الـ route في متغير اسمه <code>state</code>.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: '<code>ActivatedRoute</code> reads the same names', ar: '<code>ActivatedRoute</code> بيقرا نفس الأسماء' },
    lead: {
      en: 'Before input binding, pages read the URL through <code>ActivatedRoute</code>. The rule is the same: the string <code>\'id\'</code> must match <code>:id</code>. It is just written in a different place.',
      ar: 'قبل الـ input binding، الصفحات كانت بتقرا الـ URL من خلال <code>ActivatedRoute</code>. القاعدة نفسها: النص <code>\'id\'</code> لازم يطابق <code>:id</code>. هو بس مكتوب في مكان تاني.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'order-page.ts — older style', lang: 'ts', code: [
          "import { ActivatedRoute } from '@angular/router';",
          '',
          'export class OrderPage {',
          '  private readonly route = inject(ActivatedRoute);',
          '',
          '  // read once: stays the same when you go from A-41 to A-42',
          "  readonly id = this.route.snapshot.paramMap.get('id');",
          '}' ] },
        good: { name: 'order-page.ts — today', lang: 'ts', code: [
          '',
          '',
          'export class OrderPage {',
          '',
          '',
          '  // a signal: updates when you go from A-41 to A-42',
          '  readonly id = input.required<string>();',
          '}' ] } },
      { t: 'p',
        en: 'The <code>snapshot</code> version has a second trap: going from one order to another reuses the same component, so a value read once never changes. Older guards were also classes with a <code>canActivate()</code> method; that method name was fixed by an interface, the class name was yours.',
        ar: 'نسخة الـ <code>snapshot</code> فيها فخ تاني: التنقل من أوردر لأوردر بيعيد استخدام نفس الـ component، فالقيمة اللي اتقرت مرة عمرها ما بتتغير. والـ guards القديمة كانت كلاسات فيها ميثود <code>canActivate()</code>؛ اسم الميثود دي كان ثابت بسبب interface، واسم الكلاس بتاعك.' }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, and says nothing', ar: 'مش بيعمل حاجة، ومش بيقول حاجة' },
    title: { en: 'Mistakes that fail silently, or confusingly', ar: 'غلطات بتفشل في صمت، أو بشكل ملخبط' },
    lead: {
      en: 'The router is forgiving: an unknown URL goes to <code>**</code>, an unused query key is ignored, an unmatched input stays empty. That is friendly to users and hard on you.',
      ar: 'الـ router متسامح: الـ URL المش معروف بيروح لـ <code>**</code>، ومفتاح الـ query اللي محدش بيستخدمه بيتجاهل، والـ input اللي مش مطابق بيفضل فاضي. ده لطيف مع المستخدمين وصعب عليك انت.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'The input is not named like the parameter', ar: 'الـ input مش متسمّي زي الـ parameter' }, blocks: [
        { t: 'pair',
          bad:  { name: 'order-page.ts', lang: 'ts', code: ['readonly orderId = input.required<string>();'] },
          good: { name: 'order-page.ts', lang: 'ts', code: ['readonly id = input.required<string>();'] } },
        { t: 'p', en: 'The path says <code>:id</code>. Nothing connects <code>orderId</code> to it, and the compiler cannot know it should. The input never gets the URL value; depending on your Angular version you see an empty value or an error that a required input has no value.',
                  ar: 'الـ path بيقول <code>:id</code>. مفيش حاجة بتربط <code>orderId</code> بيه، والـ compiler مايقدرش يعرف إنه المفروض يترابط. الـ input عمره ما بياخد القيمة اللي في الـ URL؛ وحسب نسخة أنجولار عندك هتشوف قيمة فاضية أو error إن input الـ required مالوش قيمة.' }
      ]},
      { t: 'step', n: '2', title: { en: 'Forgetting to switch input binding on', ar: 'نسيان تشغيل الـ input binding' }, blocks: [
        { t: 'pair',
          bad:  { name: 'app.config.ts', lang: 'ts', code: ['  providers: [provideRouter(routes)],'] },
          good: { name: 'app.config.ts', lang: 'ts', code: ['  providers: [provideRouter(routes, withComponentInputBinding())],'] } },
        { t: 'p', en: 'Without this feature, the router fills no inputs at all. Every name can be spelled perfectly and <code>tab</code>, <code>section</code> and <code>next</code> still stay <code>undefined</code>.',
                  ar: 'من غير الـ feature دي، الـ router مش بيملا ولا input خالص. كل الأسماء ممكن تبقى مكتوبة صح بالظبط و<code>tab</code> و<code>section</code> و<code>next</code> لسه <code>undefined</code>.' }
      ]},
      { t: 'step', n: '3', title: { en: 'A relative link where you meant an absolute one', ar: 'لينك نسبي وانت قصدك لينك من الأول' }, blocks: [
        { t: 'pair',
          bad:  { name: 'orders-list.ts', lang: 'html', code: [`<a [routerLink]="['orders', order.code]">`] },
          good: { name: 'orders-list.ts', lang: 'html', code: [`<a [routerLink]="['/orders', order.code]">`] } },
        { t: 'p', en: 'The list lives at <code>/orders</code>. Without the slash, the link is relative to it and becomes <code>/orders/orders/A-42</code>. No route matches, <code>**</code> sends you back to the list, and it looks like the click did nothing.',
                  ar: 'الليستة عايشة على <code>/orders</code>. من غير الـ slash، اللينك بيبقى نسبي ليها ويطلع <code>/orders/orders/A-42</code>. مفيش route بيطابق، و<code>**</code> بيرجّعك لليستة، ويبان كأن الكليك ماعملتش حاجة.' }
      ]},
      { t: 'step', n: '4', title: { en: 'A parameter route above a fixed one', ar: 'route فيه parameter فوق route ثابت' }, blocks: [
        { t: 'pair',
          bad:  { name: 'app.routes.ts', lang: 'ts', code: ["  { path: 'orders/:id', component: OrderPage },", "  { path: 'orders/new', component: NewOrder },"] },
          good: { name: 'app.routes.ts', lang: 'ts', code: ["  { path: 'orders/new', component: NewOrder },", "  { path: 'orders/:id', component: OrderPage },"] } },
        { t: 'p', en: 'The router takes the <b>first</b> match. <code>/orders/new</code> matches <code>orders/:id</code> with <code>id</code> = <code>"new"</code>, so the order page tries to load an order called “new”. Put fixed paths above parameter paths, and <code>**</code> last.',
                  ar: 'الـ router بياخد <b>أول</b> مطابقة. <code>/orders/new</code> بيطابق <code>orders/:id</code> و<code>id</code> = <code>"new"</code>، فصفحة الأوردر بتحاول تحمّل أوردر اسمه «new». حط الـ paths الثابتة فوق الـ paths اللي فيها parameters، و<code>**</code> في الآخر.' }
      ]},
      { t: 'step', n: '5', title: { en: 'A query key spelled differently', ar: 'مفتاح query مكتوب بشكل مختلف' }, blocks: [
        { t: 'pair',
          bad:  { name: 'orders-list.ts', lang: 'html', code: [`<a [routerLink]="['/orders', order.code]" [queryParams]="{ tabs: 'payments' }">`] },
          good: { name: 'orders-list.ts', lang: 'html', code: [`<a [routerLink]="['/orders', order.code]" [queryParams]="{ tab: 'payments' }">`] } },
        { t: 'p', en: 'The URL now says <code>?tabs=payments</code>, which is perfectly valid. The page has no input called <code>tabs</code>, so <code>tab()</code> is <code>undefined</code> and the page opens on the Items tab. Nobody complains.',
                  ar: 'الـ URL بقى <code>?tabs=payments</code>، وده سليم تمامًا. والصفحة مفيهاش input اسمه <code>tabs</code>، فـ <code>tab()</code> بيبقى <code>undefined</code> والصفحة بتفتح على تاب Items. ومحدش بيشتكي.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it does nothing', ar: 'لما مايعملش حاجة' },
    title: { en: 'Six questions, in this order', ar: 'ست أسئلة، بالترتيب ده' },
    lead: {
      en: 'The wrong page shows up, or the right page shows empty values. Ask these first.',
      ar: 'الصفحة الغلط بتظهر، أو الصفحة الصح بتظهر بقيم فاضية. اسأل دول الأول.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Look at the address bar. Is the URL exactly what you expected, with or without that leading slash?',
                  ar: '<b>1.</b> بص على شريط العنوان. الـ URL هو بالظبط اللي كنت متوقعه، بالـ slash اللي في الأول أو من غيرها؟' },
      { t: 'chk', en: '<b>2.</b> Which route matches it <b>first</b>, reading the array top to bottom? Is a <code>:param</code> route or <code>**</code> catching it early?',
                  ar: '<b>2.</b> أنهي route بيطابقه <b>الأول</b>، وانت بتقرا الـ array من فوق لتحت؟ فيه route بـ <code>:param</code> أو <code>**</code> بيمسكه بدري؟' },
      { t: 'chk', en: '<b>3.</b> Is a guard redirecting you? Put a <code>console.log</code> at the top of it.',
                  ar: '<b>3.</b> فيه guard بيعمل لك redirect؟ حط <code>console.log</code> في أوله.' },
      { t: 'chk', en: '<b>4.</b> Is <code>withComponentInputBinding()</code> in <code>provideRouter(…)</code>?',
                  ar: '<b>4.</b> <code>withComponentInputBinding()</code> موجودة جوه <code>provideRouter(…)</code>؟' },
      { t: 'chk', en: '<b>5.</b> Is every input spelled exactly like its <code>:param</code>, query key or <code>data</code> key, or aliased to it?',
                  ar: '<b>5.</b> كل input مكتوب بالظبط زي الـ <code>:param</code> أو مفتاح الـ query أو مفتاح الـ <code>data</code> بتاعه، أو معمول له alias؟' },
      { t: 'chk', en: '<b>6.</b> Do all links, redirects and <code>navigateByUrl</code> calls use the same path text as the routes file?',
                  ar: '<b>6.</b> كل اللينكات والـ redirects ونداءات <code>navigateByUrl</code> بتستخدم نفس نص الـ path اللي في ملف الـ routes؟' }
    ]
  }
  ]
};
