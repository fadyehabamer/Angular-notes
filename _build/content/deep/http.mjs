/* ==================================================================
   HTTP, name by name — the companion page after the HTTP topic.
   One running example (a user page loaded from /users/42) followed
   from the route, through the interceptor, to the template, with every
   name coloured by who owns it. Model: content/deep/inputs-outputs.mjs.
   ================================================================== */

const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

const OLD_INT = 'auth.interceptor.ts — older style';
const OLD_PAGE = 'user-page.ts — older style';

export default {
  topic: 'http',
  tab: 'HTTP, name by name — The Angular Signal',
  title: { en: 'HTTP and interceptors, name by name', ar: 'الـ HTTP والـ interceptors، اسم اسم' },
  say: {
    en: 'One user page followed from the URL, through the route, the interceptor and the resource, to the template. Every name coloured: which ones are Angular’s, which are yours, and which two files must agree on. Then what breaks when you rename each one.',
    ar: 'صفحة user واحدة ماشيين وراها من الـ URL، للـ route، للـ interceptor، للـ resource، لحد التمبلت. كل اسم ملوّن: مين بتاع أنجولار، ومين بتاعك، ومين لازم ملفين يتفقوا عليه. وبعدين إيه اللي بيبوظ لما تغيّر كل واحد.'
  },
  lead: {
    en: 'The idea is simple: <b>the page asks for data, and every request passes one checkpoint on its way out.</b> The confusing part is the names. <code>req</code> and <code>next</code> look like Angular words but are not. <code>setHeaders</code> looks like a name you picked but is. And the route’s <code>:id</code> has to match a name in a completely different file. This page sorts every one of them.',
    ar: 'الفكرة بسيطة: <b>الصفحة بتطلب داتا، وكل request بيعدّي على نقطة تفتيش واحدة وهو خارج.</b> اللي بيلخبط هو الأسماء. <code>req</code> و<code>next</code> شكلهم كلمات أنجولار بس هما مش كده. و<code>setHeaders</code> شكلها اسم انت اخترته بس هي بتاعة أنجولار. و<code>:id</code> اللي في الـ route لازم يبقى زي اسم في ملف تاني خالص. الصفحة دي بترتّب كل واحد فيهم.'
  },
  names: {
    note: {
      en: 'Read the orange rows first: the route param and the input, the interceptor and the config, the interface and the template. Those are the pairs that must agree. <code>req</code>, <code>next</code> and <code>token</code> are green: Angular hands the request and the handler over by position, so their names are yours.',
      ar: 'اقرا الصفوف البرتقاني الأول: الـ route param والـ input، الـ interceptor والـ config، الـ interface والتمبلت. دول الأزواج اللي لازم يتفقوا. و<code>req</code> و<code>next</code> و<code>token</code> خُضر: أنجولار بيديك الـ request والـ handler بالترتيب، فأساميهم بتاعتك.'
    },
    names: [
      /* --- shared: two files must agree --- */
      { n:'id', k:'pub', re:'(?<![\\w$-])id(?![\\w$-])',
        w:{ en:'The route param <b>and</b> the page’s input. <code>withComponentInputBinding()</code> copies <code>:id</code> into the input with the same name, so rename both or the input is never filled.',
            ar:'الـ route param <b>و</b>الـ input بتاع الصفحة. <code>withComponentInputBinding()</code> بتنسخ <code>:id</code> في الـ input اللي ليه نفس الاسم، فغيّر الاتنين وإلا الـ input عمره ما هيتملي.' } },
      { n:'UserPage', k:'pub',
        w:{ en:'The page’s class. The routes file imports it and puts it in <code>component:</code>.', ar:'كلاس الصفحة. ملف الـ routes بيعمله import وبيحطه في <code>component:</code>.' } },
      { n:'routes', k:'pub', re:'(?<![\\w$.-])routes(?![\\w$-])',
        w:{ en:'Your array of routes, exported from <code>app.routes.ts</code> and handed to <code>provideRouter</code>.',
            ar:'الـ array بتاعة الـ routes، متعملها export من <code>app.routes.ts</code> ومتدّية لـ <code>provideRouter</code>.' } },
      { n:'appConfig', k:'pub',
        w:{ en:'Your config object. <code>main.ts</code> passes it to <code>bootstrapApplication</code>.', ar:'الـ config بتاعك. <code>main.ts</code> بيدّيه لـ <code>bootstrapApplication</code>.' } },
      { n:'authInterceptor', k:'pub',
        w:{ en:'Your interceptor. Exported from its file and listed in <code>withInterceptors([ ])</code>. Not listed means it never runs.',
            ar:'الـ interceptor بتاعك. متعمله export من ملفه ومكتوب في <code>withInterceptors([ ])</code>. لو مش مكتوب عمره ما هيشتغل.' } },
      { n:'AuthInterceptor', k:'pub',
        w:{ en:'The older class version of the same interceptor, registered with <code>useClass</code>.', ar:'نسخة الكلاس القديمة لنفس الـ interceptor، متسجلة بـ <code>useClass</code>.' } },
      { n:'Session', k:'pub',
        w:{ en:'Your service class. The interceptor injects it by this name.', ar:'كلاس الـ service بتاعك. الـ interceptor بيعمله inject بالاسم ده.' } },
      { n:'accessToken', k:'pub',
        w:{ en:'The service’s signal. The interceptor reads it, and your sign-in code would set it.', ar:'الـ signal بتاعة الـ service. الـ interceptor بيقراها، وكود الـ sign-in بتاعك هو اللي بيحط فيها.' } },
      { n:'User', k:'pub',
        w:{ en:'Your data type. The page imports it; the template reads its fields.', ar:'نوع الداتا بتاعك. الصفحة بتعمله import؛ والتمبلت بيقرا الـ fields بتاعته.' } },
      { n:'name', k:'pub',
        w:{ en:'A field of <code>User</code>, typed again in the template as <code>u.name</code>. It must also match what the server sends.',
            ar:'field في <code>User</code>، ومكتوب تاني في التمبلت كـ <code>u.name</code>. ولازم كمان يطابق اللي السيرفر بيبعته.' } },
      { n:'email', k:'pub',
        w:{ en:'Another field of <code>User</code>, read in the template.', ar:'field تاني في <code>User</code>، والتمبلت بيقراه.' } },

      /* --- yours, private to one file --- */
      { n:'req', k:'mine',
        w:{ en:'The interceptor’s first parameter: the request. Angular passes it by position, so any name works.',
            ar:'أول parameter في الـ interceptor: الـ request. أنجولار بيبعته بالترتيب، فأي اسم ينفع.' } },
      { n:'next', k:'mine',
        w:{ en:'The second parameter: “pass the request on”. Only a habit. Rename it and every call inside follows.',
            ar:'تاني parameter: “عدّي الـ request للي بعده”. مجرد عادة. غيّره وكل النداءات اللي جوه تتغير معاه.' } },
      { n:'token', k:'mine', re:'(?<![\\w$.-])token(?![\\w$-])',
        w:{ en:'A local variable in the interceptor.', ar:'variable محلي جوه الـ interceptor.' } },
      { n:'user', k:'mine', re:'(?<![\\w$/-])user(?![\\w$-])',
        w:{ en:'The page’s resource (or, in the older version, a plain field). Only this page and its template use it.',
            ar:'الـ resource بتاع الصفحة (أو في النسخة القديمة field عادي). الصفحة دي والتمبلت بتاعها بس اللي بيستخدموه.' } },
      { n:'u', k:'mine',
        w:{ en:'A template alias from <code>as u</code> (and, in the older version, a callback parameter). Exists only inside its block.',
            ar:'اسم مؤقت في التمبلت من <code>as u</code> (وفي النسخة القديمة parameter في callback). موجود جوه البلوك بتاعه بس.' } },
      { n:'session', k:'mine', only:[OLD_INT],
        w:{ en:'A private field holding the injected service, in the older class.', ar:'field خاص شايل الـ service المتعملها inject، في الكلاس القديم.' } },
      { n:'http', k:'mine', re:'(?<=this\\.|readonly )http(?![\\w$-])',
        w:{ en:'A private field holding the injected <code>HttpClient</code>. Any name works.', ar:'field خاص شايل الـ <code>HttpClient</code> المتعمله inject. أي اسم ينفع.' } },

      /* --- Angular's, the router's, the server's --- */
      { n:'Routes', k:'ng', w:{ en:'Angular’s type for a list of routes.', ar:'نوع أنجولار لقايمة routes.' } },
      { n:'path', k:'ng', w:{ en:'A route key Angular reads. The string after it is yours.', ar:'مفتاح في الـ route أنجولار بيقراه. النص اللي بعده بتاعك.' } },
      { n:'component', k:'ng', w:{ en:'A route key Angular reads: which page to show.', ar:'مفتاح في الـ route أنجولار بيقراه: أنهي صفحة تظهر.' } },
      { n:'ApplicationConfig', k:'ng', w:{ en:'Angular’s type for the app config.', ar:'نوع أنجولار للـ app config.' } },
      { n:'providers', k:'ng', w:{ en:'An option key Angular reads.', ar:'مفتاح إعداد أنجولار بيقراه.' } },
      { n:'provideRouter', k:'ng', w:{ en:'Angular’s function that switches the router on.', ar:'الـ function بتاعة أنجولار اللي بتشغّل الـ router.' } },
      { n:'withComponentInputBinding', k:'ng',
        w:{ en:'Angular’s router feature: copy route params into inputs <b>with the same name</b>.', ar:'feature في الـ router: انسخ الـ route params في الـ inputs <b>اللي ليها نفس الاسم</b>.' } },
      { n:'provideHttpClient', k:'ng', w:{ en:'Angular’s function that switches HTTP on.', ar:'الـ function بتاعة أنجولار اللي بتشغّل الـ HTTP.' } },
      { n:'withInterceptors', k:'ng', w:{ en:'Angular’s HTTP feature: run these interceptor functions, in this order.', ar:'feature في الـ HTTP: شغّل الـ interceptor functions دي، بالترتيب ده.' } },
      { n:'HttpInterceptorFn', k:'ng', w:{ en:'Angular’s type for an interceptor function. It fixes the order of the parameters, not their names.', ar:'نوع أنجولار لـ interceptor function. بيثبّت ترتيب الـ parameters، مش أساميهم.' } },
      { n:'inject', k:'ng', w:{ en:'Angular’s function that hands you a dependency.', ar:'الـ function بتاعة أنجولار اللي بتديك dependency.' } },
      { n:'clone', k:'ng', w:{ en:'A method on Angular’s request: make a changed copy. Requests cannot be edited in place.', ar:'ميثود في الـ request بتاع أنجولار: اعمل نسخة متعدلة. الـ request مينفعش يتعدل في مكانه.' } },
      { n:'setHeaders', k:'ng', w:{ en:'An option key <code>clone()</code> reads.', ar:'مفتاح إعداد <code>clone()</code> بيقراه.' } },
      { n:'headers', k:'ng', w:{ en:'The request’s headers. Read-only: <code>set</code> on them returns a copy.', ar:'الـ headers بتاعة الـ request. للقراية بس: <code>set</code> عليها بترجّع نسخة.' } },
      { n:'Authorization', k:'ng',
        w:{ en:'The standard HTTP header your server reads. Not Angular’s, but not yours to rename either.', ar:'الـ HTTP header القياسي اللي السيرفر بيقراه. مش بتاع أنجولار، بس برضه مش بتاعك تغيّره.' } },
      { n:'Bearer', k:'ng',
        w:{ en:'The standard word in front of the token. Your server expects it, followed by one space.', ar:'الكلمة القياسية اللي قبل التوكن. السيرفر مستنيها، وبعدها مسافة واحدة.' } },
      { n:'input', k:'ng', re:'(?<![\\w$<(-])input(?=[.(<,])', w:{ en:'Angular’s function that creates an input.', ar:'الـ function بتاعة أنجولار اللي بتعمل input.' } },
      { n:'required', k:'ng', w:{ en:'Part of <code>input.required</code>.', ar:'جزء من <code>input.required</code>.' } },
      { n:'httpResource', k:'ng', w:{ en:'Angular’s signal-based HTTP read.', ar:'قراية HTTP من أنجولار مبنية على signals.' } },
      { n:'value', k:'ng', w:{ en:'A signal every resource has: the loaded data.', ar:'signal موجودة في أي resource: الداتا اللي اتحمّلت.' } },
      { n:'isLoading', k:'ng', w:{ en:'A signal every resource has.', ar:'signal موجودة في أي resource.' } },
      { n:'error', k:'ng', w:{ en:'A signal every resource has.', ar:'signal موجودة في أي resource.' } },
      { n:'reload', k:'ng', w:{ en:'A method every resource has.', ar:'ميثود موجودة في أي resource.' } },
      { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
      { n:'@Injectable', k:'ng', w:{ en:'Angular’s decorator for a service.', ar:'الـ decorator بتاع أنجولار للـ service.' } },
      { n:'providedIn', k:'ng', w:{ en:'An option key Angular reads.', ar:'مفتاح إعداد أنجولار بيقراه.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator.', ar:'الـ decorator بتاع أنجولار.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key. The path after it points at your file.', ar:'مفتاح إعداد. المسار اللي بعده بيشاور على ملفك.' } },
      { n:'@if', k:'ng', w:{ en:'Angular’s template control flow.', ar:'الـ control flow بتاع أنجولار في التمبلت.' } },
      { n:'@else', k:'ng', w:{ en:'Angular’s template control flow.', ar:'الـ control flow بتاع أنجولار في التمبلت.' } },
      { n:'click', k:'ng', w:{ en:'The browser’s event name.', ar:'اسم الـ event بتاع المتصفح.' } },
      { n:'HttpInterceptor', k:'ng', w:{ en:'The older interface for a class interceptor. It forces the method name <code>intercept</code>.', ar:'الـ interface القديم لـ interceptor على شكل كلاس. هو اللي بيفرض اسم الميثود <code>intercept</code>.' } },
      { n:'intercept', k:'ng', w:{ en:'The method name <code>HttpInterceptor</code> requires. Angular calls exactly this.', ar:'اسم الميثود اللي <code>HttpInterceptor</code> بيطلبه. أنجولار بينادي ده بالظبط.' } },
      { n:'HttpRequest', k:'ng', w:{ en:'Angular’s request type.', ar:'نوع الـ request بتاع أنجولار.' } },
      { n:'HttpHandler', k:'ng', w:{ en:'The older handler type.', ar:'نوع الـ handler القديم.' } },
      { n:'handle', k:'ng', w:{ en:'The older handler’s method: pass the request on.', ar:'ميثود الـ handler القديم: عدّي الـ request.' } },
      { n:'withInterceptorsFromDi', k:'ng', w:{ en:'Angular’s HTTP feature for class interceptors.', ar:'feature في الـ HTTP للـ interceptors اللي على شكل كلاس.' } },
      { n:'HTTP_INTERCEPTORS', k:'ng', w:{ en:'Angular’s token that collects class interceptors.', ar:'الـ token بتاع أنجولار اللي بيلم الـ interceptors اللي على شكل كلاس.' } },
      { n:'provide', k:'ng', w:{ en:'A provider key Angular reads.', ar:'مفتاح provider أنجولار بيقراه.' } },
      { n:'useClass', k:'ng', w:{ en:'A provider key Angular reads.', ar:'مفتاح provider أنجولار بيقراه.' } },
      { n:'multi', k:'ng', w:{ en:'A provider key: add to the list instead of replacing it.', ar:'مفتاح provider: ضيف على القايمة بدل ما تستبدلها.' } },
      { n:'HttpClient', k:'ng', w:{ en:'Angular’s HTTP service.', ar:'الـ service بتاعة أنجولار للـ HTTP.' } },
      { n:'get', k:'ng', re:'(?<=\\.)get(?=<)', w:{ en:'An <code>HttpClient</code> method.', ar:'ميثود في <code>HttpClient</code>.' } },
      { n:'subscribe', k:'ng', w:{ en:'RxJS’s method that starts the request.', ar:'ميثود RxJS اللي بتبدأ الـ request.' } },
      { n:'OnInit', k:'ng', w:{ en:'Angular’s lifecycle interface.', ar:'الـ lifecycle interface بتاع أنجولار.' } },
      { n:'ngOnInit', k:'ng', w:{ en:'The lifecycle method name Angular calls.', ar:'اسم الـ lifecycle method اللي أنجولار بيناديها.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One URL, six stops', ar: 'URL واحد، ست محطات' },
    lead: {
      en: 'Someone opens <code>/users/42</code>. The page must load user 42 from the server, and every request must carry the sign-in token. Follow the id from the address bar to the screen:',
      ar: 'حد فتح <code>/users/42</code>. الصفحة لازم تجيب user رقم 42 من السيرفر، وكل request لازم يكون معاه توكن الـ sign-in. امشي ورا الـ id من شريط العنوان لحد الشاشة:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'app.routes.ts', lang: 'ts', who: { en: 'router · names the param', ar: 'الـ router · بيسمّي الـ param' },
          code: ["{ path: 'users/:id', component: UserPage },"],
          say: { en: `The router matches the URL. The colon makes <code>:id</code> a route param, and the name after it, ${pub('id')}, is yours. ${ng('path')} and ${ng('component')} are Angular’s keys. ${pub('UserPage')} is your class.`,
                 ar: `الـ router بيطابق الـ URL. النقطتين بيخلّوا <code>:id</code> route param، والاسم اللي بعدهم، ${pub('id')}، بتاعك. و${ng('path')} و${ng('component')} مفاتيح أنجولار. و${pub('UserPage')} الكلاس بتاعك.` } },
        { file: 'user-page.ts', lang: 'ts', who: { en: 'page · receives it', ar: 'الصفحة · بتستقبله' },
          code: ['readonly id = input.required<string>();'],
          say: { en: `The router drops <code>'42'</code> into the input with the <b>same name</b>. That is why ${pub('id')} is orange: the routes file and the page must spell it the same. This only happens because the config turned on ${ng('withComponentInputBinding')}.`,
                 ar: `الـ router بيحط <code>'42'</code> في الـ input اللي ليه <b>نفس الاسم</b>. وعشان كده ${pub('id')} برتقاني: ملف الـ routes والصفحة لازم يكتبوه زي بعض. وده بيحصل بس عشان الـ config مشغّل ${ng('withComponentInputBinding')}.` } },
        { file: 'user-page.ts', lang: 'ts', who: { en: 'page · declares the read', ar: 'الصفحة · بتعلن القراية' },
          code: ['readonly user = httpResource<User>(() => `/api/users/${this.id()}`);'],
          say: { en: `${ng('httpResource')} is Angular’s. ${mine('user')} is your name for the result, and ${pub('User')} is your data type. The arrow function builds the URL; because it calls <code>this.id()</code>, a new id means a new request.`,
                 ar: `${ng('httpResource')} بتاعة أنجولار. و${mine('user')} اسمك انت للنتيجة، و${pub('User')} نوع الداتا بتاعك. الـ arrow function بتبني الـ URL؛ وعشان بتنادي <code>this.id()</code>، أي id جديد معناه request جديد.` } },
        { file: 'app.config.ts', lang: 'ts', who: { en: 'config · the checkpoint list', ar: 'الـ config · قايمة نقط التفتيش' },
          code: ['provideHttpClient(withInterceptors([authInterceptor])),'],
          say: { en: `Before it leaves, the request goes through every interceptor in this list, in order. ${ng('provideHttpClient')} and ${ng('withInterceptors')} are Angular’s. ${pub('authInterceptor')} is the one name this file shares with the interceptor’s file.`,
                 ar: `قبل ما يخرج، الـ request بيعدّي على كل interceptor في القايمة دي، بالترتيب. ${ng('provideHttpClient')} و${ng('withInterceptors')} بتوع أنجولار. و${pub('authInterceptor')} هو الاسم الوحيد اللي الملف ده متشارك فيه مع ملف الـ interceptor.` } },
        { file: 'auth.interceptor.ts', lang: 'ts', who: { en: 'interceptor · adds the token', ar: 'الـ interceptor · بيضيف التوكن' },
          code: [
            'export const authInterceptor: HttpInterceptorFn = (req, next) => {',
            '  const token = inject(Session).accessToken();',
            '  return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));',
            '};'],
          say: { en: `${mine('req')} and ${mine('next')} are <b>not</b> Angular words. Angular calls your function with two things, in order: the request, then “whoever is next”. You name them. ${ng('clone')} and ${ng('setHeaders')} are Angular’s. ${ng('Authorization')} and ${ng('Bearer')} are what your server expects.`,
                 ar: `${mine('req')} و${mine('next')} <b>مش</b> كلمات أنجولار. أنجولار بينادي الـ function بتاعتك بحاجتين، بالترتيب: الـ request، وبعدين “اللي عليه الدور”. انت اللي بتسمّيهم. و${ng('clone')} و${ng('setHeaders')} بتوع أنجولار. و${ng('Authorization')} و${ng('Bearer')} دول اللي السيرفر مستنيهم.` } },
        { file: 'user-page.html', lang: 'html', who: { en: 'template · shows it', ar: 'التمبلت · بيعرضه' },
          code: ['@if (user.value(); as u) {', '  <h1>{{ u.name }}</h1>', '}'],
          say: { en: `The answer arrives in ${ng('value')}, a signal every resource has. ${mine('u')} is a short name you give it for this block only. ${pub('name')} is a field of your ${pub('User')} interface, so the interface and the template must agree.`,
                 ar: `الرد بيوصل في ${ng('value')}، signal موجودة في أي resource. و${mine('u')} اسم قصير بتديهوله للبلوك ده بس. و${pub('name')} field في الـ interface ${pub('User')} بتاعك، فالـ interface والتمبلت لازم يتفقوا.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: '<code>:id</code> in the route fills the <code>id</code> input, the resource builds <code>/api/users/42</code>, <code>authInterceptor</code> adds the header on the way out, and the template reads <code>user.value()</code>. Three pairs of names must match: <b>route ↔ input</b>, <b>interceptor ↔ config</b>, <b>interface ↔ template</b>.',
        ar: '<code>:id</code> اللي في الـ route بيملا الـ input <code>id</code>، والـ resource بيبني <code>/api/users/42</code>، و<code>authInterceptor</code> بيضيف الـ header وهو خارج، والتمبلت بيقرا <code>user.value()</code>. فيه تلات أزواج أسماء لازم يتطابقوا: <b>الـ route ↔ الـ input</b>، <b>الـ interceptor ↔ الـ config</b>، <b>الـ interface ↔ التمبلت</b>.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Which file?', ar: 'أنهي ملف؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'HTTP code is spread over more files than most topics. Each piece still has exactly one home, and most of them you write once for the whole app.',
      ar: 'كود الـ HTTP متوزع على ملفات أكتر من أغلب المواضيع. بس كل حتة لسه ليها بيت واحد، وأغلبهم بتكتبهم مرة واحدة للتطبيق كله.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ["<code>{ path: 'users/:id', component: UserPage }</code>", '<code>app.routes.ts</code>', 'you, once per page', `you pick ${pub('id')} (the page must match it); ${ng('path')} and ${ng('component')} are Angular’s`],
            ar: ["<code>{ path: 'users/:id', component: UserPage }</code>", '<code>app.routes.ts</code>', 'انت، مرة لكل صفحة', `انت بتختار ${pub('id')} (والصفحة لازم تطابقه)؛ و${ng('path')} و${ng('component')} بتوع أنجولار`] },
          { en: ['<code>provideHttpClient(withInterceptors([…]))</code>', '<code>app.config.ts</code>', 'you, once per app', `only ${pub('authInterceptor')} inside the brackets is yours`],
            ar: ['<code>provideHttpClient(withInterceptors([…]))</code>', '<code>app.config.ts</code>', 'انت، مرة للتطبيق كله', `${pub('authInterceptor')} اللي جوه الأقواس بس هو اللي بتاعك`] },
          { en: ['<code>authInterceptor = (req, next) =&gt; …</code>', '<code>auth.interceptor.ts</code>', 'you, once per app', `all three: ${pub('authInterceptor')}, ${mine('req')}, ${mine('next')}; ${ng('clone')} is Angular’s`],
            ar: ['<code>authInterceptor = (req, next) =&gt; …</code>', '<code>auth.interceptor.ts</code>', 'انت، مرة للتطبيق كله', `التلاتة: ${pub('authInterceptor')} و${mine('req')} و${mine('next')}؛ و${ng('clone')} بتاعة أنجولار`] },
          { en: ['<code>readonly id = input.required&lt;string&gt;()</code>', '<code>user-page.ts</code>', 'the page', `${pub('id')}, but the route decided it first`],
            ar: ['<code>readonly id = input.required&lt;string&gt;()</code>', '<code>user-page.ts</code>', 'الصفحة', `${pub('id')}، بس الـ route هو اللي قرره الأول`] },
          { en: ['<code>readonly user = httpResource&lt;User&gt;(…)</code>', '<code>user-page.ts</code>', 'the page', `you pick ${mine('user')}; ${pub('User')} comes from your interface file`],
            ar: ['<code>readonly user = httpResource&lt;User&gt;(…)</code>', '<code>user-page.ts</code>', 'الصفحة', `انت بتختار ${mine('user')}؛ و${pub('User')} جاي من ملف الـ interface بتاعك`] },
          { en: ['<code>user.value()</code>, <code>user.error()</code>, <code>user.reload()</code>', '<code>user-page.html</code>', 'the page’s template', `${mine('user')} is yours; ${ng('value')}, ${ng('error')}, ${ng('isLoading')}, ${ng('reload')} are Angular’s`],
            ar: ['<code>user.value()</code>، <code>user.error()</code>، <code>user.reload()</code>', '<code>user-page.html</code>', 'تمبلت الصفحة', `${mine('user')} بتاعك؛ و${ng('value')} و${ng('error')} و${ng('isLoading')} و${ng('reload')} بتوع أنجولار`] },
        ] },
      { t: 'ul',
        en: ['<b>The page never mentions the interceptor.</b> It does not import it and does not know it exists. The token is added in one place for every request.',
             '<b>The interceptor never mentions the page.</b> It sees every request in the app as <code>req</code>, whoever sent it.',
             '<b>Setup goes in <code>app.config.ts</code>, reading goes in the page.</b> If you are typing <code>provideHttpClient</code> inside a component, you are in the wrong file.'],
        ar: ['<b>الصفحة عمرها ما بتذكر الـ interceptor.</b> مش بتعمله import ومش عارفة إنه موجود أصلًا. التوكن بيتضاف في مكان واحد لكل الـ requests.',
             '<b>الـ interceptor عمره ما بيذكر الصفحة.</b> هو شايف كل request في التطبيق على إنه <code>req</code>، أيًا كان مين بعته.',
             '<b>الإعداد مكانه <code>app.config.ts</code>، والقراية مكانها الصفحة.</b> لو لقيت نفسك بتكتب <code>provideHttpClient</code> جوه component، يبقى انت في الملف الغلط.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All seven files, every name coloured', ar: 'السبع ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same example, complete. Hover a coloured name to light up everywhere else it appears. Then press <b>Rename test</b>: every name you own turns into a made-up word, Angular’s and the server’s words stay put, and the code is still correct.',
      ar: 'نفس المثال، كامل. قف بالماوس على أي اسم ملوّن وهتنوّر كل الأماكن التانية اللي هو فيها. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: كل اسم بتاعك هيبقى كلمة عشوائية، وكلمات أنجولار والسيرفر هتفضل مكانها، والكود لسه صح.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'app.routes.ts', lang: 'ts', tag: { en: 'the URL', ar: 'الـ URL' }, code: [
        "import { Routes } from '@angular/router';",
        "import { UserPage } from './user-page';",
        '',
        'export const routes: Routes = [',
        "  { path: 'users/:id', component: UserPage },",
        '];' ] },
      { t: 'code', name: 'app.config.ts', lang: 'ts', tag: { en: 'once per app', ar: 'مرة للتطبيق كله' }, code: [
        "import { ApplicationConfig } from '@angular/core';",
        "import { provideRouter, withComponentInputBinding } from '@angular/router';",
        "import { provideHttpClient, withInterceptors } from '@angular/common/http';",
        "import { routes } from './app.routes';",
        "import { authInterceptor } from './auth.interceptor';",
        '',
        'export const appConfig: ApplicationConfig = {',
        '  providers: [',
        '    provideRouter(routes, withComponentInputBinding()),',
        '    provideHttpClient(withInterceptors([authInterceptor])),',
        '  ],',
        '};' ] },
      { t: 'code', name: 'session.ts', lang: 'ts', tag: { en: 'holds the token', ar: 'شايل التوكن' }, code: [
        "import { Injectable, signal } from '@angular/core';",
        '',
        "@Injectable({ providedIn: 'root' })",
        'export class Session {',
        '  readonly accessToken = signal<string | null>(null);',
        '}' ] },
      { t: 'code', name: 'auth.interceptor.ts', lang: 'ts', tag: { en: 'the checkpoint', ar: 'نقطة التفتيش' }, code: [
        "import { inject } from '@angular/core';",
        "import { HttpInterceptorFn } from '@angular/common/http';",
        "import { Session } from './session';",
        '',
        'export const authInterceptor: HttpInterceptorFn = (req, next) => {',
        '  const token = inject(Session).accessToken();',
        '  if (!token) return next(req);          // not signed in: send it as it is',
        '',
        '  return next(req.clone({',
        '    setHeaders: { Authorization: `Bearer ${token}` },',
        '  }));',
        '};' ] },
      { t: 'code', name: 'user.ts', lang: 'ts', tag: { en: 'the data', ar: 'الداتا' }, code: [
        'export interface User {',
        '  name: string;',
        '  email: string;',
        '}' ] },
      { t: 'code', name: 'user-page.ts', lang: 'ts', tag: { en: 'the page', ar: 'الصفحة' }, code: [
        "import { Component, input } from '@angular/core';",
        "import { httpResource } from '@angular/common/http';",
        "import { User } from './user';",
        '',
        '@Component({',
        "  templateUrl: './user-page.html',",
        '})',
        'export class UserPage {',
        '  readonly id = input.required<string>();              // filled from :id',
        '  readonly user = httpResource<User>(() => `/api/users/${this.id()}`);',
        '}' ] },
      { t: 'code', name: 'user-page.html', lang: 'html', tag: { en: 'three states', ar: 'تلات حالات' }, code: [
        '@if (user.isLoading()) {',
        '  <p>Loading…</p>',
        '} @else if (user.error()) {',
        '  <p>Could not load the profile.</p>',
        '  <button (click)="user.reload()">Try again</button>',
        '} @else {',
        '  @if (user.value(); as u) {',
        '    <h1>{{ u.name }}</h1>',
        '    <p>{{ u.email }}</p>',
        '  }',
        '}' ] },
      { t: 'p',
        en: 'The page has no <code>selector</code>: the router places it, so no template ever types its tag. The template checks <code>error()</code> before it reads <code>value()</code>, which is the safe order for any resource.',
        ar: 'الصفحة ملهاش <code>selector</code>: الـ router هو اللي بيحطها، فمفيش تمبلت بيكتب التاج بتاعها. والتمبلت بيشيك على <code>error()</code> قبل ما يقرا <code>value()</code>، وده الترتيب الآمن مع أي resource.' },
      { t: 'nmtable' }
    ]
  },

  /* ------------------------------------------------------------ 4 */
  {
    id: 'rename',
    kicker: { en: 'Is it OK to change it?', ar: 'ينفع أغيّره؟' },
    title: { en: 'What breaks when you rename each name', ar: 'إيه اللي بيبوظ لما تغيّر كل اسم' },
    lead: {
      en: 'Every name you own can be renamed. What matters is <b>where else</b> you must follow. Most misses are compile errors. Two are not: the route param, and anything the server reads.',
      ar: 'أي اسم بتاعك ينفع يتغير. المهم <b>فين تاني</b> لازم تغيّر وراه. أغلب اللي بيتنسي بيطلع compile error. اتنين لأ: الـ route param، وأي حاجة السيرفر بيقراها.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [pub('id') + ' (route param and input)', 'the other one: <code>:id</code> in <code>app.routes.ts</code> or the input in <code>user-page.ts</code>', '<b>No compile error.</b> The router finds no input with that name, so <code>id</code> is never filled and the page does not load user 42. See “When a rule picks the name”.'],
            ar: [pub('id') + ' (الـ route param والـ input)', 'التاني: <code>:id</code> في <code>app.routes.ts</code> أو الـ input في <code>user-page.ts</code>', '<b>مفيش compile error.</b> الـ router مش هيلاقي input بالاسم ده، فـ <code>id</code> عمره ما هيتملي والصفحة مش هتجيب user 42. شوف “لما قاعدة هي اللي بتختار الاسم”.'] },
          { en: [pub('authInterceptor'), 'the <code>import</code> and the <code>withInterceptors([ ])</code> list in <code>app.config.ts</code>', 'Compile error on the import.'],
            ar: [pub('authInterceptor'), 'الـ <code>import</code> وقايمة <code>withInterceptors([ ])</code> في <code>app.config.ts</code>', 'Compile error في الـ import.'] },
          { en: [pub('Session') + ' or ' + pub('accessToken'), 'the interceptor’s <code>inject(Session).accessToken()</code>, and your sign-in code', 'Compile error.'],
            ar: [pub('Session') + ' أو ' + pub('accessToken'), '<code>inject(Session).accessToken()</code> في الـ interceptor، وكود الـ sign-in بتاعك', 'Compile error.'] },
          { en: [pub('UserPage') + ' or ' + pub('routes'), 'the file that imports it', 'Compile error on the import.'],
            ar: [pub('UserPage') + ' أو ' + pub('routes'), 'الملف اللي بيعمله import', 'Compile error في الـ import.'] },
          { en: [pub('User') + ', ' + pub('name') + ', ' + pub('email'), 'the page’s import and the template’s <code>u.name</code>, <code>u.email</code>', 'Compile error in the template. But a field must also match the JSON the server sends: rename it only on your side and it compiles, then shows nothing.'],
            ar: [pub('User') + ' و' + pub('name') + ' و' + pub('email'), 'الـ import في الصفحة و<code>u.name</code> و<code>u.email</code> في التمبلت', 'Compile error في التمبلت. بس الـ field لازم كمان يطابق الـ JSON اللي السيرفر بيبعته: لو غيّرته عندك بس، هيعمل compile عادي، وبعدين مش هيعرض حاجة.'] },
          { en: [mine('user'), 'every <code>user.</code> in the page’s template', 'Compile error in the template.'],
            ar: [mine('user'), 'كل <code>user.</code> في تمبلت الصفحة', 'Compile error في التمبلت.'] },
          { en: [`${mine('req')}, ${mine('next')}, ${mine('token')}`, 'only the lines inside the interceptor', 'Compile error inside the function.'],
            ar: [`${mine('req')} و${mine('next')} و${mine('token')}`, 'السطور اللي جوه الـ interceptor بس', 'Compile error جوه الـ function.'] },
          { en: [mine('u'), 'only inside that <code>@if</code> block', 'Compile error in the template.'],
            ar: [mine('u'), 'جوه بلوك الـ <code>@if</code> ده بس', 'Compile error في التمبلت.'] },
          { en: [`${ng('Authorization')}, ${ng('Bearer')}`, 'nothing: the server decides these', '<b>No error in Angular.</b> The server does not find the token and answers 401.'],
            ar: [`${ng('Authorization')} و${ng('Bearer')}`, 'ولا حاجة: السيرفر هو اللي بيحددهم', '<b>مفيش error في أنجولار.</b> السيرفر مش هيلاقي التوكن وهيرد بـ 401.'] },
          { en: [`${ng('clone')}, ${ng('setHeaders')}, ${ng('httpResource')}, ${ng('value')}`, 'nothing: you cannot rename these', 'They are Angular’s words.'],
            ar: [`${ng('clone')} و${ng('setHeaders')} و${ng('httpResource')} و${ng('value')}`, 'ولا حاجة: دول مينفعش يتغيروا', 'دي كلمات أنجولار.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b> above the files. Watch <code>id</code>: it changes in the route string <code>\'users/:id\'</code> and in the page at the same time. That is the one rename the compiler will not check for you.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b> فوق الملفات. بص على <code>id</code>: بيتغير في نص الـ route <code>\'users/:id\'</code> وفي الصفحة في نفس الوقت. ده التغيير الوحيد اللي الـ compiler مش هيراجعه عشانك.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتاعتك' },
    title: { en: 'The fixed names, and two that only look fixed', ar: 'الأسماء الثابتة، واتنين شكلهم بس ثابت' },
    lead: {
      en: 'Blue names come from three owners: Angular, the router, and the HTTP standard your server follows. You type them exactly. But two names in the interceptor are famous enough to look official, and they are not.',
      ar: 'الأسماء الزرقا ليها تلات أصحاب: أنجولار، والـ router، ومعيار الـ HTTP اللي السيرفر ماشي عليه. بتكتبهم زي ما هما بالظبط. بس فيه اسمين في الـ interceptor مشهورين لدرجة إن شكلهم رسمي، وهما مش كده.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Owner', 'Names', 'What they are'], ar: ['صاحبها', 'الأسماء', 'هي إيه'] },
        rows: [
          { en: ['Angular HTTP', `${ng('provideHttpClient')}, ${ng('withInterceptors')}, ${ng('HttpInterceptorFn')}, ${ng('clone')}, ${ng('setHeaders')}`, 'The setup functions, the interceptor type, and the request’s copy method and its option key.'],
            ar: ['HTTP بتاع أنجولار', `${ng('provideHttpClient')} و${ng('withInterceptors')} و${ng('HttpInterceptorFn')} و${ng('clone')} و${ng('setHeaders')}`, 'functions الإعداد، ونوع الـ interceptor، وميثود النسخ في الـ request ومفتاح الإعداد بتاعها.'] },
          { en: ['Angular resource', `${ng('httpResource')}, ${ng('value')}, ${ng('isLoading')}, ${ng('error')}, ${ng('reload')}`, 'Every resource has exactly these. You only pick the name of the resource itself.'],
            ar: ['الـ resource بتاع أنجولار', `${ng('httpResource')} و${ng('value')} و${ng('isLoading')} و${ng('error')} و${ng('reload')}`, 'أي resource فيه دول بالظبط. انت بتختار اسم الـ resource نفسه وبس.'] },
          { en: ['Angular router', `${ng('path')}, ${ng('component')}, ${ng('provideRouter')}, ${ng('withComponentInputBinding')}`, 'Route keys and router setup. The strings you put after the keys are yours.'],
            ar: ['الـ router بتاع أنجولار', `${ng('path')} و${ng('component')} و${ng('provideRouter')} و${ng('withComponentInputBinding')}`, 'مفاتيح الـ route وإعداد الـ router. النصوص اللي بتحطها بعد المفاتيح بتاعتك.'] },
          { en: ['The HTTP standard', `${ng('Authorization')}, ${ng('Bearer')}`, 'Your server reads this header name and this word. Neither Angular nor you chose them.'],
            ar: ['معيار الـ HTTP', `${ng('Authorization')} و${ng('Bearer')}`, 'السيرفر بتاعك بيقرا اسم الـ header ده والكلمة دي. لا أنجولار ولا انت اللي اخترتهم.'] },
        ] },
      { t: 'p',
        en: `Now the two that fool everyone: ${mine('req')} and ${mine('next')}. The type ${ng('HttpInterceptorFn')} only says <i>“a function whose first parameter is a request and whose second is a handler”</i>. It fixes the <b>order</b>, not the names. Angular calls your function by position, exactly like any callback.`,
        ar: `ودلوقتي الاتنين اللي بيضحكوا على الكل: ${mine('req')} و${mine('next')}. النوع ${ng('HttpInterceptorFn')} بيقول بس <i>«function أول parameter فيها request والتاني handler»</i>. بيثبّت <b>الترتيب</b>، مش الأسماء. أنجولار بينادي الـ function بتاعتك بالترتيب، زي أي callback بالظبط.` },
      { t: 'pair',
        bad:  { name: 'auth.interceptor.ts — swapped by mistake', lang: 'ts', code: [
          'export const authInterceptor: HttpInterceptorFn = (next, req) => {',
          '  // position 1 is still the request, even if you call it next',
          '  return next(req);   // error: a request cannot be called',
          '};' ] },
        good: { name: 'auth.interceptor.ts — any names, right order', lang: 'ts', code: [
          'export const authInterceptor: HttpInterceptorFn = (req, next) => {',
          '  // first: the request. second: the handler.',
          '  // call them whatever you like after that.',
          '  return next(req);',
          '};' ] } },
      { t: 'p',
        en: 'The left one fails because of <b>order</b>, not spelling. Calling the first parameter <code>next</code> does not make it the handler: it is still the request, and TypeScript says it “is not callable”. Press <b>Rename test</b> and both parameters on the right turn into fruit, and it still works.',
        ar: 'اللي على الشمال بيفشل بسبب <b>الترتيب</b>، مش بسبب الإملا. إنك تسمّي أول parameter <code>next</code> مش بيخليه الـ handler: هو لسه الـ request، وTypeScript بيقول إنه «is not callable». دوس <b>جرّب تغيّر الأسماء</b> والاتنين اللي على اليمين هيبقوا فواكه، ولسه شغال.' },
      { t: 'note', label: { en: 'Same idea in the template', ar: 'نفس الفكرة في التمبلت' },
        en: 'In <code>@if (user.value(); as u)</code>, <code>as</code> is Angular’s keyword and <code>u</code> is yours. <code>as user</code> or <code>as person</code> work just as well; the name only lives inside that block.',
        ar: 'في <code>@if (user.value(); as u)</code>، <code>as</code> كلمة أنجولار و<code>u</code> بتاعك. <code>as user</code> أو <code>as person</code> هيشتغلوا بنفس الشكل؛ الاسم عايش جوه البلوك ده بس.' }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'Angular accepts almost any name here. These habits make the config read like a list of jobs and the template read like the data it shows.',
      ar: 'أنجولار بيقبل أي اسم تقريبًا هنا. العادات دي بتخلي الـ config يتقري زي قايمة شغلانات، والتمبلت يتقري زي الداتا اللي بيعرضها.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['an interceptor', '<code>authInterceptor</code>, <code>loggingInterceptor</code>, <code>retryInterceptor</code>', '<code>interceptor1</code>, <code>myInterceptor</code>', 'The <code>withInterceptors([ ])</code> list then says what each step does, and in what order.'],
            ar: ['interceptor', '<code>authInterceptor</code>، <code>loggingInterceptor</code>، <code>retryInterceptor</code>', '<code>interceptor1</code>، <code>myInterceptor</code>', 'كده قايمة <code>withInterceptors([ ])</code> بتقول كل خطوة بتعمل إيه، وبأنهي ترتيب.'] },
          { en: ['its parameters', '<code>req</code>, <code>next</code>', 'anything clever', 'Not a rule, but every Angular example uses them. Other people read your interceptor faster.'],
            ar: ['الـ parameters بتاعته', '<code>req</code>، <code>next</code>', 'أي حاجة مفذلكة', 'مش قاعدة، بس كل أمثلة أنجولار بتستخدمهم. الناس التانية هتقرا الـ interceptor بتاعك أسرع.'] },
          { en: ['the resource', '<code>user</code>, <code>orders</code>: the thing it holds', '<code>getUser</code>, <code>user$</code>', 'It is not a function and not an Observable. The template reads <code>user.value()</code>, which already sounds right.'],
            ar: ['الـ resource', '<code>user</code>، <code>orders</code>: الحاجة اللي شايلها', '<code>getUser</code>، <code>user$</code>', 'هو مش function ومش Observable. والتمبلت بيقرا <code>user.value()</code>، وده أصلًا مفهوم لوحده.'] },
          { en: ['the route param', '<code>id</code>, or <code>userId</code> when a route has two ids', '<code>x</code>, <code>param1</code>', 'The input gets the same name, so pick one that reads well as a property of the page.'],
            ar: ['الـ route param', '<code>id</code>، أو <code>userId</code> لما الـ route يبقى فيه اتنين id', '<code>x</code>، <code>param1</code>', 'الـ input هياخد نفس الاسم، فاختار اسم يتقري كويس كـ property في الصفحة.'] },
          { en: ['the data type', '<code>User</code>, <code>Order</code>', '<code>IUser</code>, <code>UserData</code>', 'A common TypeScript habit: a plain noun. Its fields should copy the server’s JSON exactly.'],
            ar: ['نوع الداتا', '<code>User</code>، <code>Order</code>', '<code>IUser</code>، <code>UserData</code>', 'عادة منتشرة في TypeScript: اسم عادي. والـ fields بتاعته لازم تنسخ الـ JSON بتاع السيرفر بالظبط.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Two places where the name is not free', ar: 'مكانين الاسم فيهم مش براحتك' },
    lead: {
      en: 'Most names here are free. Two look free and are not, and neither gives you a compile error when you get it wrong.',
      ar: 'أغلب الأسماء هنا براحتك. فيه اتنين شكلهم براحتك وهما لأ، والاتنين مش بيدّوك compile error لو غلطت.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'The route param must equal the input name', ar: 'الـ route param لازم يساوي اسم الـ input' }, blocks: [
        { t: 'p',
          en: `${ng('withComponentInputBinding')} matches by name only. The text after the colon in the route is the name it looks for on the page. The page has ${pub('id')}, so the route must say <code>:id</code>.`,
          ar: `${ng('withComponentInputBinding')} بتطابق بالاسم بس. الكلام اللي بعد النقطتين في الـ route هو الاسم اللي بتدوّر عليه في الصفحة. الصفحة فيها ${pub('id')}، فالـ route لازم يقول <code>:id</code>.` },
        { t: 'pair',
          bad:  { name: 'app.routes.ts', lang: 'ts', code: ["{ path: 'users/:userId', component: UserPage },"] },
          good: { name: 'app.routes.ts', lang: 'ts', code: ["{ path: 'users/:id', component: UserPage },"] } },
        { t: 'p',
          en: 'The left one compiles. At runtime the router has a <code>userId</code> and the page has no input called that, so the <code>id</code> input stays empty. Rename one side, rename the other.',
          ar: 'اللي على الشمال بيعمل compile. وهو شغال الـ router معاه <code>userId</code> والصفحة معندهاش input بالاسم ده، فالـ input <code>id</code> بيفضل فاضي. غيّر ناحية، غيّر التانية.' }
      ]},
      { t: 'step', n: 'B', title: { en: 'The header name belongs to the server', ar: 'اسم الـ header بتاع السيرفر' }, blocks: [
        { t: 'p',
          en: `Inside ${ng('setHeaders')}, the key is the real HTTP header name. ${ng('Authorization')} is spelled the American way, and the value is ${ng('Bearer')}, one space, then the token. You could send a header called <code>MyToken</code> and Angular would happily send it. Whether anything works depends on what your server reads.`,
          ar: `جوه ${ng('setHeaders')}، المفتاح هو اسم الـ HTTP header الحقيقي. ${ng('Authorization')} مكتوبة بالطريقة الأمريكاني، والقيمة ${ng('Bearer')}، مسافة واحدة، وبعدين التوكن. تقدر تبعت header اسمه <code>MyToken</code> وأنجولار هيبعته عادي. بس هل حاجة هتشتغل ولا لأ، ده على حسب السيرفر بيقرا إيه.` },
        { t: 'pair',
          bad:  { name: 'auth.interceptor.ts', lang: 'ts', code: ['setHeaders: { Authorisation: `Bearer${token}` },'] },
          good: { name: 'auth.interceptor.ts', lang: 'ts', code: ['setHeaders: { Authorization: `Bearer ${token}` },'] } },
        { t: 'p',
          en: 'Two mistakes on the left: British spelling, and no space after <code>Bearer</code>. Both compile, both send a request, and the server answers 401.',
          ar: 'فيه غلطتين على الشمال: الإملا البريطاني، ومفيش مسافة بعد <code>Bearer</code>. الاتنين بيعملوا compile، والاتنين بيبعتوا request، والسيرفر بيرد بـ 401.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: 'Class interceptors and <code>subscribe</code>: same names, more of Angular’s', ar: 'الـ interceptors الكلاس و<code>subscribe</code>: نفس الأسماء، وكلمات أنجولار أكتر' },
    lead: {
      en: 'Tutorials and older projects write interceptors as classes and load data by subscribing. Your names barely change. What changes is how many names Angular forces on you.',
      ar: 'الشروحات والمشاريع الأقدم بتكتب الـ interceptors على شكل كلاسات وبتجيب الداتا بـ subscribe. أسماءك بالعافية بتتغير. اللي بيتغير هو عدد الأسماء اللي أنجولار بيفرضها عليك.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: OLD_INT, lang: 'ts', code: [
          '@Injectable()',
          'export class AuthInterceptor implements HttpInterceptor {',
          '  private readonly session = inject(Session);',
          '',
          '  intercept(req: HttpRequest<unknown>, next: HttpHandler) {',
          '    const token = this.session.accessToken();',
          '    if (!token) return next.handle(req);',
          '    return next.handle(req.clone({',
          '      setHeaders: { Authorization: `Bearer ${token}` },',
          '    }));',
          '  }',
          '}' ] },
        good: { name: 'auth.interceptor.ts — today', lang: 'ts', code: [
          'export const authInterceptor: HttpInterceptorFn = (req, next) => {',
          '  const token = inject(Session).accessToken();',
          '  if (!token) return next(req);',
          '  return next(req.clone({',
          '    setHeaders: { Authorization: `Bearer ${token}` },',
          '  }));',
          '};' ] } },
      { t: 'code', name: 'app.config.ts — older style', lang: 'ts', tag: { en: 'registering the class', ar: 'تسجيل الكلاس' }, code: [
        'providers: [',
        '  provideHttpClient(withInterceptorsFromDi()),',
        '  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },',
        '],' ] },
      { t: 'p',
        en: `In the class version, ${ng('intercept')} is <b>not</b> your choice: the ${ng('HttpInterceptor')} interface demands exactly that method name, and ${ng('handle')} is the older handler’s method. ${ng('HTTP_INTERCEPTORS')} is Angular’s token, and ${ng('multi')} must be <code>true</code> because that token collects a list. In the function version all of that disappears and only your names are left.`,
        ar: `في نسخة الكلاس، ${ng('intercept')} <b>مش</b> اختيارك: الـ interface ${ng('HttpInterceptor')} طالب اسم الميثود ده بالظبط، و${ng('handle')} ميثود الـ handler القديم. و${ng('HTTP_INTERCEPTORS')} token بتاع أنجولار، و${ng('multi')} لازم تبقى <code>true</code> عشان الـ token ده بيلم قايمة. في نسخة الـ function كل ده بيختفي ومبيفضلش غير أسماءك.` },
      { t: 'pair',
        bad:  { name: OLD_PAGE, lang: 'ts', code: [
          'export class UserPage implements OnInit {',
          '  readonly id = input.required<string>();',
          '  private readonly http = inject(HttpClient);',
          '  user?: User;',
          '',
          '  ngOnInit() {',
          '    this.http.get<User>(`/api/users/${this.id()}`)',
          '      .subscribe(u => this.user = u);',
          '  }',
          '}' ] },
        good: { name: 'user-page.ts — today', lang: 'ts', code: [
          'export class UserPage {',
          '  readonly id = input.required<string>();',
          '  readonly user = httpResource<User>(',
          '    () => `/api/users/${this.id()}`,',
          '  );',
          '}' ] } },
      { t: 'p',
        en: `Same ${pub('id')}, same ${pub('User')}, same ${mine('user')}. In the older version ${ng('ngOnInit')} is a fixed name Angular calls, ${mine('http')} is your field name, and ${mine('u')} is just the callback’s parameter. It also loads only once: a new id in the URL does not trigger a new request, which the resource does for you.`,
        ar: `نفس ${pub('id')}، ونفس ${pub('User')}، ونفس ${mine('user')}. في النسخة القديمة ${ng('ngOnInit')} اسم ثابت أنجولار بيناديه، و${mine('http')} اسم الـ field بتاعك، و${mine('u')} مجرد parameter في الـ callback. وكمان بيحمّل مرة واحدة بس: id جديد في الـ URL مش بيعمل request جديد، والـ resource بيعمل ده عشانك.` }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, and says nothing', ar: 'مش بيعمل حاجة، ومش بيقول حاجة' },
    title: { en: 'Mistakes that fail silently', ar: 'غلطات بتفشل في صمت' },
    lead: {
      en: 'HTTP mistakes rarely crash. The request still goes out, just without the header, or to the wrong URL, and you find out from a 401 or a 404 in the Network tab.',
      ar: 'غلطات الـ HTTP نادرًا ما بتوقّع التطبيق. الـ request لسه بيخرج، بس من غير الـ header، أو على URL غلط، وبتعرف من 401 أو 404 في تاب الـ Network.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'The interceptor is written but not listed', ar: 'الـ interceptor مكتوب بس مش متسجل' }, blocks: [
        { t: 'pair',
          bad:  { name: 'app.config.ts', lang: 'ts', code: ['provideHttpClient(),'] },
          good: { name: 'app.config.ts', lang: 'ts', code: ['provideHttpClient(withInterceptors([authInterceptor])),'] } },
        { t: 'p', en: 'A file that exports an interceptor does nothing by itself. Angular only runs the functions in <code>withInterceptors([ ])</code>. Every request leaves without the token.',
                  ar: 'ملف بيعمل export لـ interceptor مبيعملش حاجة لوحده. أنجولار بيشغّل بس الـ functions اللي في <code>withInterceptors([ ])</code>. وكل request بيخرج من غير التوكن.' }
      ]},
      { t: 'step', n: '2', title: { en: 'Editing the request instead of cloning it', ar: 'إنك تعدّل الـ request بدل ما تعمل له clone' }, blocks: [
        { t: 'pair',
          bad:  { name: 'auth.interceptor.ts', lang: 'ts', code: [
            "req.headers.set('Authorization', `Bearer ${token}`);",
            'return next(req);' ] },
          good: { name: 'auth.interceptor.ts', lang: 'ts', code: [
            'return next(req.clone({',
            '  setHeaders: { Authorization: `Bearer ${token}` },',
            '}));' ] } },
        { t: 'p', en: 'Requests and their headers cannot be changed. <code>set</code> on <code>headers</code> <b>returns a new copy</b>, and the left code throws that copy away. The original request goes out untouched.',
                  ar: 'الـ requests والـ headers بتاعتها مينفعش يتغيروا. <code>set</code> على <code>headers</code> <b>بترجّع نسخة جديدة</b>، والكود اللي على الشمال بيرمي النسخة دي. والـ request الأصلي بيخرج زي ما هو.' }
      ]},
      { t: 'step', n: '3', title: { en: 'Input binding not switched on', ar: 'ربط الـ inputs مش متشغّل' }, blocks: [
        { t: 'pair',
          bad:  { name: 'app.config.ts', lang: 'ts', code: ['provideRouter(routes),'] },
          good: { name: 'app.config.ts', lang: 'ts', code: ['provideRouter(routes, withComponentInputBinding()),'] } },
        { t: 'p', en: 'Without this feature the router never copies route params into inputs, however well the names match. <code>id</code> stays empty, and reading an empty <code>input.required</code> is a runtime error (NG0950) instead of a request.',
                  ar: 'من غير الـ feature دي الـ router عمره ما بينسخ الـ route params في الـ inputs، مهما الأسماء كانت متطابقة. <code>id</code> بيفضل فاضي، وقراية <code>input.required</code> فاضي بتطلع runtime error (NG0950) بدل الـ request.' }
      ]},
      { t: 'step', n: '4', title: { en: 'Forgetting the brackets on a signal inside the URL', ar: 'نسيان القوسين على signal جوه الـ URL' }, blocks: [
        { t: 'pair',
          bad:  { name: 'user-page.ts', lang: 'ts', code: ['readonly user = httpResource<User>(() => `/api/users/${this.id}`);'] },
          good: { name: 'user-page.ts', lang: 'ts', code: ['readonly user = httpResource<User>(() => `/api/users/${this.id()}`);'] } },
        { t: 'p', en: 'TypeScript is happy to put a function inside a string, so there is no error. The URL gets a text description of the signal instead of <code>42</code>, and the server answers 404. A signal is only read when you call it.',
                  ar: 'TypeScript مش عنده مشكلة يحط function جوه string، فمفيش error. الـ URL بياخد نص بيوصف الـ signal بدل <code>42</code>، والسيرفر بيرد بـ 404. الـ signal مبيتقريش غير لما تناديها.' }
      ]},
      { t: 'step', n: '5', title: { en: 'Forgetting to return', ar: 'نسيان الـ return' }, blocks: [
        { t: 'pair',
          bad:  { name: 'auth.interceptor.ts', lang: 'ts', code: [
            'export const authInterceptor: HttpInterceptorFn = (req, next) => {',
            '  next(req);',
            '};' ] },
          good: { name: 'auth.interceptor.ts', lang: 'ts', code: [
            'export const authInterceptor: HttpInterceptorFn = (req, next) => {',
            '  return next(req);',
            '};' ] } },
        { t: 'p', en: 'This one does give an error, thanks to the <code>HttpInterceptorFn</code> type, but it reads oddly: something like “<code>void</code> is not assignable to <code>Observable&lt;HttpEvent&lt;unknown&gt;&gt;</code>”. It means: you did not return anything. Every interceptor must hand back what <code>next</code> gives it.',
                  ar: 'دي بتدي error، بفضل النوع <code>HttpInterceptorFn</code>، بس صياغته غريبة: حاجة زي «<code>void</code> is not assignable to <code>Observable&lt;HttpEvent&lt;unknown&gt;&gt;</code>». معناها: انت مرجّعتش حاجة. أي interceptor لازم يرجّع اللي <code>next</code> بتديهوله.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it does nothing', ar: 'لما مايعملش حاجة' },
    title: { en: 'Six questions, in this order', ar: 'ست أسئلة، بالترتيب ده' },
    lead: {
      en: 'The page shows nothing, or the server says 401. Open the Network tab, click the request, and ask these.',
      ar: 'الصفحة مش بتعرض حاجة، أو السيرفر بيقول 401. افتح تاب الـ Network، دوس على الـ request، واسأل الأسئلة دي.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Is there a request at all, and is its URL right? A strange URL usually means a signal was used without <code>()</code>.',
                  ar: '<b>1.</b> فيه request أصلًا، والـ URL بتاعه صح؟ الـ URL الغريب غالبًا معناه إن فيه signal اتستخدمت من غير <code>()</code>.' },
      { t: 'chk', en: '<b>2.</b> Does the route say <code>:id</code> and the page have an input called exactly <code>id</code>? Is <code>withComponentInputBinding()</code> in <code>provideRouter</code>?',
                  ar: '<b>2.</b> الـ route فيه <code>:id</code> والصفحة فيها input اسمه <code>id</code> بالظبط؟ و<code>withComponentInputBinding()</code> موجودة في <code>provideRouter</code>؟' },
      { t: 'chk', en: '<b>3.</b> Is your interceptor inside <code>withInterceptors([ ])</code> in <code>app.config.ts</code>?',
                  ar: '<b>3.</b> الـ interceptor بتاعك جوه <code>withInterceptors([ ])</code> في <code>app.config.ts</code>؟' },
      { t: 'chk', en: '<b>4.</b> Does it <code>return next(req.clone(…))</code>, and not edit <code>req.headers</code> directly?',
                  ar: '<b>4.</b> بيعمل <code>return next(req.clone(…))</code>، ومش بيعدّل <code>req.headers</code> على طول؟' },
      { t: 'chk', en: '<b>5.</b> In the request headers, do you see <code>Authorization: Bearer …</code>, spelled exactly, with one space?',
                  ar: '<b>5.</b> في الـ headers بتاعة الـ request، شايف <code>Authorization: Bearer …</code>، مكتوبة بالظبط، وبمسافة واحدة؟' },
      { t: 'chk', en: '<b>6.</b> Do your interface fields match the JSON in the Response tab, letter for letter?',
                  ar: '<b>6.</b> الـ fields اللي في الـ interface بتاعك مطابقة للـ JSON اللي في تاب الـ Response، حرف بحرف؟' }
    ]
  }
  ]
};
