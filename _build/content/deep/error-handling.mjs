/* ==================================================================
   Error handling, name by name — the companion page after the error
   handling topic. One running example (an orders page whose request
   fails) followed through the interceptor, the toast service, the page
   and the global handler. Model: content/deep/inputs-outputs.mjs.
   ================================================================== */

const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

const OLD_INT = 'error.interceptor.ts — older style';

export default {
  topic: 'error-handling',
  tab: 'Error handling, name by name — The Angular Signal',
  title: { en: 'Error handling, name by name', ar: 'التعامل مع الأخطاء، اسم اسم' },
  say: {
    en: 'One failed request followed through the interceptor, the toast service and the page, plus the global handler for everything else. Every name coloured, including the word <code>error</code>, which means four different things. Then what breaks when you rename each one.',
    ar: 'request واحد فشل، ماشيين وراه في الـ interceptor والـ toast service والصفحة، وكمان الـ handler العام لأي حاجة تانية. كل اسم ملوّن، ومنهم كلمة <code>error</code> اللي ليها أربع معاني مختلفة. وبعدين إيه اللي بيبوظ لما تغيّر كل واحد.'
  },
  lead: {
    en: 'The idea is simple: <b>retry what might work, tell the person in words, and give them a way out.</b> The confusing part is the names. <code>handleError</code> looks like a name you chose, and it is not. <code>err</code> looks like an RxJS word, and it is yours. And <code>error</code> appears four times in one file with four owners. This page sorts every one of them.',
    ar: 'الفكرة بسيطة: <b>جرّب تاني اللي ممكن ينجح، وقول للشخص بكلام مفهوم، وادّيله مخرج.</b> اللي بيلخبط هو الأسماء. <code>handleError</code> شكله اسم انت اخترته، وهو مش كده. و<code>err</code> شكله كلمة RxJS، وهو بتاعك. و<code>error</code> بتظهر أربع مرات في ملف واحد وليها أربع أصحاب. الصفحة دي بترتّب كل واحد فيهم.'
  },
  names: {
    note: {
      en: 'Blue names you type exactly, and here that includes <code>handleError</code>: Angular calls that method by name. Orange names are yours but typed in more than one file, like <code>show</code>, which the interceptor and the handler both call. Green names live inside one function or one component.',
      ar: 'الأسماء الزرقا بتكتبها زي ما هي، وهنا منهم <code>handleError</code>: أنجولار بينادي الميثود دي بالاسم. البرتقاني بتاعك بس مكتوب في أكتر من ملف، زي <code>show</code> اللي الـ interceptor والـ handler الاتنين بينادوها. والأخضر عايش جوه function واحدة أو component واحد.'
    },
    names: [
      /* --- shared --- */
      { n:'errorInterceptor', k:'pub',
        w:{ en:'Your interceptor. Exported from its file and listed in <code>withInterceptors([ ])</code>.', ar:'الـ interceptor بتاعك. متعمله export من ملفه ومكتوب في <code>withInterceptors([ ])</code>.' } },
      { n:'ErrorInterceptor', k:'pub',
        w:{ en:'The older class version of the same interceptor.', ar:'نسخة الكلاس القديمة لنفس الـ interceptor.' } },
      { n:'GlobalErrorHandler', k:'pub',
        w:{ en:'Your class. The app config names it in <code>useClass</code>.', ar:'الكلاس بتاعك. الـ app config بيكتبه في <code>useClass</code>.' } },
      { n:'appConfig', k:'pub',
        w:{ en:'Your config object. <code>main.ts</code> passes it to <code>bootstrapApplication</code>.', ar:'الـ config بتاعك. <code>main.ts</code> بيدّيه لـ <code>bootstrapApplication</code>.' } },
      { n:'Toasts', k:'pub',
        w:{ en:'Your service class, injected by the interceptor, the handler and the toast outlet.', ar:'كلاس الـ service بتاعك، والـ interceptor والـ handler والـ toast outlet بيعملوه inject.' } },
      { n:'show', k:'pub',
        w:{ en:'Your service method. The interceptor and the handler both call it, so all three files change together.', ar:'ميثود الـ service بتاعتك. الـ interceptor والـ handler الاتنين بينادوها، فالتلات ملفات بيتغيروا مع بعض.' } },
      { n:'dismiss', k:'pub',
        w:{ en:'Your service method, called by the outlet’s close button.', ar:'ميثود الـ service بتاعتك، وزرار الإغلاق في الـ outlet بيناديها.' } },
      { n:'all', k:'pub', re:'(?<=\\.|readonly )all(?![\\w$-])',
        w:{ en:'The read-only list of toasts the outlet displays.', ar:'قايمة الـ toasts اللي للقراية بس، والـ outlet بيعرضها.' } },
      { n:'Toast', k:'pub', w:{ en:'Your data type for one message.', ar:'نوع الداتا بتاعك لرسالة واحدة.' } },
      { n:'id', k:'pub', w:{ en:'A field of <code>Toast</code>, read by the service and the outlet.', ar:'field في <code>Toast</code>، والـ service والـ outlet بيقروه.' } },
      { n:'text', k:'pub', w:{ en:'A field of <code>Toast</code>, shown by the outlet.', ar:'field في <code>Toast</code>، والـ outlet بيعرضه.' } },
      { n:'ToastOutlet', k:'pub', w:{ en:'Your component class, imported by the app shell.', ar:'كلاس الـ component بتاعك، والـ app shell بيعمله import.' } },
      { n:'app-toast-outlet', k:'pub', w:{ en:'Its selector. The app shell’s template types this tag once.', ar:'الـ selector بتاعه. تمبلت الـ app shell بيكتب التاج ده مرة واحدة.' } },
      { n:'OrdersPage', k:'pub', w:{ en:'Your page class, imported by the routes file.', ar:'كلاس الصفحة بتاعك، وملف الـ routes بيعمله import.' } },
      { n:'Order', k:'pub', w:{ en:'Your data type. Its fields must match the server’s JSON.', ar:'نوع الداتا بتاعك. الـ fields بتاعته لازم تطابق الـ JSON بتاع السيرفر.' } },
      { n:'ref', k:'pub', w:{ en:'A field of <code>Order</code>, read in the template.', ar:'field في <code>Order</code>، والتمبلت بيقراه.' } },
      { n:'total', k:'pub', w:{ en:'A field of <code>Order</code>, read in the template.', ar:'field في <code>Order</code>، والتمبلت بيقراه.' } },

      /* --- yours, one function or one component --- */
      { n:'req', k:'mine', w:{ en:'The interceptor’s first parameter. Angular passes it by position.', ar:'أول parameter في الـ interceptor. أنجولار بيبعته بالترتيب.' } },
      { n:'next', k:'mine', w:{ en:'The interceptor’s second parameter. A habit, not a rule.', ar:'تاني parameter في الـ interceptor. عادة، مش قاعدة.' } },
      { n:'err', k:'mine',
        w:{ en:'A parameter name, in several separate functions. RxJS and Angular pass the error by position, so the name is yours.',
            ar:'اسم parameter، في كذا function منفصلة. RxJS وأنجولار بيبعتوا الـ error بالترتيب، فالاسم بتاعك.' } },
      { n:'attempt', k:'mine',
        w:{ en:'The second parameter of <code>delay</code>: which retry this is, starting at 1. Passed by position.', ar:'تاني parameter في <code>delay</code>: دي المحاولة رقم كام، بتبدأ من 1. بيتبعت بالترتيب.' } },
      { n:'worthIt', k:'mine', w:{ en:'A local variable.', ar:'variable محلي.' } },
      { n:'toasts', k:'mine', re:'(?<![\\w$/-])toasts(?![\\w$-])',
        w:{ en:'The name each file gives the injected <code>Toasts</code> service. Each one is private to its own file.', ar:'الاسم اللي كل ملف بيدّيه للـ service <code>Toasts</code> المتعملها inject. كل واحد خاص بملفه.' } },
      { n:'msg', k:'mine', w:{ en:'The parameter of <code>show</code>.', ar:'الـ parameter بتاع <code>show</code>.' } },
      { n:'toastId', k:'mine', w:{ en:'A local variable in <code>show</code>, and separately the parameter of <code>dismiss</code>.', ar:'variable محلي في <code>show</code>، ولوحده الـ parameter بتاع <code>dismiss</code>.' } },
      { n:'nextId', k:'mine', w:{ en:'The service’s private counter.', ar:'العدّاد الخاص بالـ service.' } },
      { n:'_all', k:'mine', w:{ en:'The service’s private signal. Only the service writes to it.', ar:'الـ signal الخاصة بالـ service. الـ service بس اللي بتكتب فيها.' } },
      { n:'list', k:'mine', w:{ en:'An arrow function’s parameter: the current array.', ar:'parameter في arrow function: الـ array الحالية.' } },
      { n:'t', k:'mine', w:{ en:'A loop variable, and separately an arrow-function parameter.', ar:'متغير لوب، ولوحده parameter في arrow function.' } },
      { n:'orders', k:'mine', re:'(?<![\\w$/-])orders(?=\\.|\\s*=)',
        w:{ en:'The page’s resource. Only the page and its template use it.', ar:'الـ resource بتاع الصفحة. الصفحة والتمبلت بتاعها بس اللي بيستخدموه.' } },
      { n:'o', k:'mine', w:{ en:'The loop variable in <code>@for</code>.', ar:'متغير اللوب في <code>@for</code>.' } },

      /* --- Angular's, RxJS's, the browser's, the server's --- */
      { n:'ApplicationConfig', k:'ng', w:{ en:'Angular’s type for the app config.', ar:'نوع أنجولار للـ app config.' } },
      { n:'providers', k:'ng', w:{ en:'An option key Angular reads.', ar:'مفتاح إعداد أنجولار بيقراه.' } },
      { n:'provideHttpClient', k:'ng', w:{ en:'Angular’s function that switches HTTP on.', ar:'الـ function بتاعة أنجولار اللي بتشغّل الـ HTTP.' } },
      { n:'withInterceptors', k:'ng', w:{ en:'Angular’s HTTP feature: run these interceptors, in order.', ar:'feature في الـ HTTP: شغّل الـ interceptors دي، بالترتيب.' } },
      { n:'provide', k:'ng', w:{ en:'A provider key: which thing Angular is asking for.', ar:'مفتاح provider: أنجولار بيطلب أنهي حاجة.' } },
      { n:'useClass', k:'ng', w:{ en:'A provider key: which class to create instead.', ar:'مفتاح provider: أنهي كلاس يتعمل بدالها.' } },
      { n:'ErrorHandler', k:'ng',
        w:{ en:'Angular’s class for the app-wide last-resort catcher. It is also the key you provide your own under.', ar:'الكلاس بتاع أنجولار اللي بيمسك أي حاجة محدش مسكها في التطبيق كله. وهو كمان المفتاح اللي بتسجّل الـ handler بتاعك تحته.' } },
      { n:'handleError', k:'ng',
        w:{ en:'Fixed by <code>ErrorHandler</code>: Angular calls exactly this method.', ar:'ثابت بسبب <code>ErrorHandler</code>: أنجولار بينادي الميثود دي بالظبط.' } },
      { n:'HttpInterceptorFn', k:'ng', w:{ en:'Angular’s type for an interceptor function.', ar:'نوع أنجولار لـ interceptor function.' } },
      { n:'HttpErrorResponse', k:'ng', w:{ en:'Angular’s type for a failed HTTP response.', ar:'نوع أنجولار لـ HTTP response فاشل.' } },
      { n:'inject', k:'ng', w:{ en:'Angular’s function that hands you a dependency.', ar:'الـ function بتاعة أنجولار اللي بتديك dependency.' } },
      { n:'pipe', k:'ng', w:{ en:'RxJS’s method for chaining operators.', ar:'ميثود RxJS لتوصيل الـ operators ورا بعض.' } },
      { n:'retry', k:'ng', w:{ en:'An RxJS operator: try the request again after a failure.', ar:'operator من RxJS: جرّب الـ request تاني بعد ما يفشل.' } },
      { n:'count', k:'ng', w:{ en:'An option key <code>retry</code> reads: how many extra tries.', ar:'مفتاح إعداد <code>retry</code> بيقراه: كام محاولة زيادة.' } },
      { n:'delay', k:'ng', w:{ en:'An option key <code>retry</code> reads: a function that decides when, or whether, to try again.', ar:'مفتاح إعداد <code>retry</code> بيقراه: function بتقرر امتى، أو هل، نجرب تاني.' } },
      { n:'timer', k:'ng', w:{ en:'An RxJS function: emit once after a wait.', ar:'function من RxJS: تبعت قيمة واحدة بعد وقت.' } },
      { n:'catchError', k:'ng', w:{ en:'An RxJS operator that runs when the stream fails.', ar:'operator من RxJS بيشتغل لما الـ stream يفشل.' } },
      { n:'throwError', k:'ng', w:{ en:'An RxJS function that makes a stream that fails.', ar:'function من RxJS بتعمل stream بيفشل.' } },
      { n:'status', k:'ng', re:'(?<=\\.)status(?![\\w$-])',
        w:{ en:'A field of <code>HttpErrorResponse</code>: the HTTP status code. <code>0</code> means the request never reached a server.', ar:'field في <code>HttpErrorResponse</code>: الـ HTTP status code. و<code>0</code> معناها الـ request موصلش لأي سيرفر.' } },
      { n:'error', k:'ng', re:'(?<=\\.)error(?![\\w$-])',
        w:{ en:'Not yours anywhere: <code>err.error</code> is the body the server sent, <code>console.error</code> is the browser’s, <code>orders.error()</code> is a resource signal.',
            ar:'مش بتاعك في أي مكان: <code>err.error</code> هو الـ body اللي السيرفر بعته، و<code>console.error</code> بتاع المتصفح، و<code>orders.error()</code> signal في الـ resource.' } },
      { n:'message', k:'ng',
        w:{ en:'<code>err.message</code> is Angular’s technical sentence. <code>err.error.message</code> is a field in your server’s JSON: the server picks that one.',
            ar:'<code>err.message</code> جملة أنجولار التقنية. و<code>err.error.message</code> field في الـ JSON بتاع السيرفر: السيرفر هو اللي بيختاره.' } },
      { n:'@Injectable', k:'ng', w:{ en:'Angular’s decorator for a service.', ar:'الـ decorator بتاع أنجولار للـ service.' } },
      { n:'providedIn', k:'ng', w:{ en:'An option key Angular reads.', ar:'مفتاح إعداد أنجولار بيقراه.' } },
      { n:'signal', k:'ng', w:{ en:'Angular’s writable signal.', ar:'الـ signal بتاعة أنجولار اللي بتتكتب.' } },
      { n:'asReadonly', k:'ng', w:{ en:'A signal method: a read-only view of it.', ar:'ميثود في الـ signal: نسخة للقراية بس.' } },
      { n:'update', k:'ng', w:{ en:'A signal method.', ar:'ميثود بتاعة الـ signal.' } },
      { n:'filter', k:'ng', w:{ en:'JavaScript’s array method.', ar:'ميثود الـ array بتاعة JavaScript.' } },
      { n:'setTimeout', k:'ng', w:{ en:'The browser’s timer.', ar:'التايمر بتاع المتصفح.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator.', ar:'الـ decorator بتاع أنجولار.' } },
      { n:'selector', k:'ng', w:{ en:'An option key. The string after it is yours.', ar:'مفتاح إعداد. النص اللي بعده بتاعك.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key. The path after it points at your file.', ar:'مفتاح إعداد. المسار اللي بعده بيشاور على ملفك.' } },
      { n:'httpResource', k:'ng', w:{ en:'Angular’s signal-based HTTP read.', ar:'قراية HTTP من أنجولار مبنية على signals.' } },
      { n:'isLoading', k:'ng', w:{ en:'A signal every resource has.', ar:'signal موجودة في أي resource.' } },
      { n:'value', k:'ng', w:{ en:'A signal every resource has: the loaded data.', ar:'signal موجودة في أي resource: الداتا اللي اتحمّلت.' } },
      { n:'reload', k:'ng', w:{ en:'A method every resource has: try again.', ar:'ميثود موجودة في أي resource: جرّب تاني.' } },
      { n:'@if', k:'ng', w:{ en:'Angular’s template control flow.', ar:'الـ control flow بتاع أنجولار في التمبلت.' } },
      { n:'@else', k:'ng', w:{ en:'Angular’s template control flow.', ar:'الـ control flow بتاع أنجولار في التمبلت.' } },
      { n:'@for', k:'ng', w:{ en:'Angular’s loop block.', ar:'بلوك اللوب بتاع أنجولار.' } },
      { n:'track', k:'ng', w:{ en:'Part of <code>@for</code>.', ar:'جزء من <code>@for</code>.' } },
      { n:'@empty', k:'ng', w:{ en:'Part of <code>@for</code>: what to show when the list is empty.', ar:'جزء من <code>@for</code>: تعرض إيه لما القايمة فاضية.' } },
      { n:'click', k:'ng', w:{ en:'The browser’s event name.', ar:'اسم الـ event بتاع المتصفح.' } },
      { n:'HttpInterceptor', k:'ng', w:{ en:'The older interface for a class interceptor.', ar:'الـ interface القديم لـ interceptor على شكل كلاس.' } },
      { n:'intercept', k:'ng', w:{ en:'The method name <code>HttpInterceptor</code> requires.', ar:'اسم الميثود اللي <code>HttpInterceptor</code> بيطلبه.' } },
      { n:'HttpRequest', k:'ng', w:{ en:'Angular’s request type.', ar:'نوع الـ request بتاع أنجولار.' } },
      { n:'HttpHandler', k:'ng', w:{ en:'The older handler type.', ar:'نوع الـ handler القديم.' } },
      { n:'handle', k:'ng', w:{ en:'The older handler’s method.', ar:'ميثود الـ handler القديم.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One failed request, six stops', ar: 'request واحد فشل، ست محطات' },
    lead: {
      en: 'An orders page asks the server for your orders. The server is having a bad minute and answers 503. Follow the failure from the request to the <b>Try again</b> button, and then the other road, for errors that are not HTTP at all:',
      ar: 'صفحة orders بتطلب الـ orders بتاعتك من السيرفر. السيرفر عنده دقيقة وحشة وبيرد بـ 503. امشي ورا الفشل من الـ request لحد زرار <b>Try again</b>، وبعدين الطريق التاني، للأخطاء اللي مش HTTP خالص:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'orders-page.ts', lang: 'ts', who: { en: 'page · asks', ar: 'الصفحة · بتطلب' },
          code: ["readonly orders = httpResource<Order[]>(() => '/api/orders');"],
          say: { en: `The page declares a read. ${mine('orders')} is your name for it; ${ng('httpResource')} is Angular’s; ${pub('Order')} is your data type. The page has no error code of its own yet.`,
                 ar: `الصفحة بتعلن عن قراية. ${mine('orders')} اسمك انت ليها؛ و${ng('httpResource')} بتاعة أنجولار؛ و${pub('Order')} نوع الداتا بتاعك. الصفحة لسه معندهاش أي كود للأخطاء.` } },
        { file: 'error.interceptor.ts', lang: 'ts', who: { en: 'interceptor · tries again', ar: 'الـ interceptor · بيجرّب تاني' },
          code: ['retry({', '  count: 2,', '  delay: (err: HttpErrorResponse, attempt) => …,', '}),'],
          say: { en: `The 503 comes back through the interceptor first. ${ng('retry')}, ${ng('count')} and ${ng('delay')} are RxJS’s words. ${mine('err')} and ${mine('attempt')} are yours: RxJS hands the function the error and the attempt number, in that order.`,
                 ar: `الـ 503 بيرجع على الـ interceptor الأول. ${ng('retry')} و${ng('count')} و${ng('delay')} كلمات RxJS. و${mine('err')} و${mine('attempt')} بتوعك: RxJS بيدّي الـ function الـ error ورقم المحاولة، بالترتيب ده.` } },
        { file: 'error.interceptor.ts', lang: 'ts', who: { en: 'interceptor · tells the person', ar: 'الـ interceptor · بيقول للشخص' },
          code: ['catchError((err: HttpErrorResponse) => {', "  toasts.show('Our server had a problem. Try again shortly.');", '  return throwError(() => err);', '}),'],
          say: { en: `All tries failed. ${ng('catchError')} runs once. ${mine('toasts')} is this file’s name for your service, and ${pub('show')} is your method. ${ng('throwError')} passes the same error on, so the page still finds out.`,
                 ar: `كل المحاولات فشلت. ${ng('catchError')} بتشتغل مرة واحدة. ${mine('toasts')} اسم الملف ده للـ service بتاعتك، و${pub('show')} الميثود بتاعتك. و${ng('throwError')} بتعدّي نفس الـ error لقدام، فالصفحة برضه تعرف.` } },
        { file: 'toasts.ts', lang: 'ts', who: { en: 'service · shows the words', ar: 'الـ service · بتعرض الكلام' },
          code: ['show(msg: string) {', '  const toastId = this.nextId++;', '  this._all.update(list => [...list, { id: toastId, text: msg }]);'],
          say: { en: `One place decides how a message looks. ${pub('show')} is orange because other files call it. Inside, ${mine('msg')}, ${mine('toastId')} and ${mine('_all')} are private. ${pub('id')} and ${pub('text')} are the fields of your ${pub('Toast')} type.`,
                 ar: `مكان واحد بيقرر شكل الرسالة. ${pub('show')} برتقاني عشان ملفات تانية بتناديها. جوه، ${mine('msg')} و${mine('toastId')} و${mine('_all')} خاصين. و${pub('id')} و${pub('text')} الـ fields بتاعة النوع ${pub('Toast')} بتاعك.` } },
        { file: 'orders-page.html', lang: 'html', who: { en: 'page · offers a way out', ar: 'الصفحة · بتدّي مخرج' },
          code: ['} @else if (orders.error()) {', '  <button (click)="orders.reload()">Try again</button>'],
          say: { en: `Because the interceptor passed the error on, the resource’s ${ng('error')} signal is set. ${ng('error')} and ${ng('reload')} are Angular’s; only ${mine('orders')} is yours. The toast said what happened; this button is what to do next.`,
                 ar: `عشان الـ interceptor عدّى الـ error، الـ signal ${ng('error')} بتاعة الـ resource اتملت. ${ng('error')} و${ng('reload')} بتوع أنجولار؛ ${mine('orders')} بس اللي بتاعك. الـ toast قال إيه اللي حصل؛ والزرار ده هو الخطوة الجاية.` } },
        { file: 'global-error-handler.ts', lang: 'ts', who: { en: 'the other road · anything else', ar: 'الطريق التاني · أي حاجة تانية' },
          code: ['export class GlobalErrorHandler implements ErrorHandler {', '  handleError(err: unknown) {'],
          say: { en: `An error thrown in a component or a template never passes the interceptor. Angular sends it here. ${pub('GlobalErrorHandler')} is your name. ${ng('handleError')} is <b>not</b>: Angular calls exactly that method.`,
                 ar: `الـ error اللي بيترمي في component أو تمبلت عمره ما بيعدّي على الـ interceptor. أنجولار بيبعته هنا. ${pub('GlobalErrorHandler')} اسمك انت. أما ${ng('handleError')} <b>لأ</b>: أنجولار بينادي الميثود دي بالاسم ده بالظبط.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'HTTP failures: <code>retry</code> → <code>catchError</code> → <code>toasts.show(…)</code> → <code>throwError</code> → the page’s <code>orders.error()</code> → <b>Try again</b>. Everything else: Angular → <code>handleError</code>. The names files share are <b>show</b>, <b>Toasts</b>, <b>errorInterceptor</b> and <b>GlobalErrorHandler</b>.',
        ar: 'أخطاء الـ HTTP: <code>retry</code> ← <code>catchError</code> ← <code>toasts.show(…)</code> ← <code>throwError</code> ← <code>orders.error()</code> في الصفحة ← <b>Try again</b>. أي حاجة تانية: أنجولار ← <code>handleError</code>. الأسماء اللي الملفات متشاركة فيها هي <b>show</b> و<b>Toasts</b> و<b>errorInterceptor</b> و<b>GlobalErrorHandler</b>.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Which file?', ar: 'أنهي ملف؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'Error code is spread over four places, and each one has one job. Once you know the jobs, you know which file a line belongs in.',
      ar: 'كود الأخطاء متوزع على أربع أماكن، وكل واحد ليه شغلانة واحدة. أول ما تعرف الشغلانات، هتعرف كل سطر مكانه في أنهي ملف.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>retry({ count, delay })</code>', '<code>error.interceptor.ts</code>', 'you, once per app', `${ng('count')} and ${ng('delay')} are RxJS’s; you pick ${mine('err')} and ${mine('attempt')}`],
            ar: ['<code>retry({ count, delay })</code>', '<code>error.interceptor.ts</code>', 'انت، مرة للتطبيق كله', `${ng('count')} و${ng('delay')} بتوع RxJS؛ وانت بتختار ${mine('err')} و${mine('attempt')}`] },
          { en: ['<code>catchError(err =&gt; …)</code>', '<code>error.interceptor.ts</code>', 'you, once per app', `you pick ${mine('err')}; ${ng('status')} and ${ng('error')} on it are Angular’s`],
            ar: ['<code>catchError(err =&gt; …)</code>', '<code>error.interceptor.ts</code>', 'انت، مرة للتطبيق كله', `انت بتختار ${mine('err')}؛ و${ng('status')} و${ng('error')} اللي عليه بتوع أنجولار`] },
          { en: ['<code>show(msg)</code>, <code>dismiss(toastId)</code>', '<code>toasts.ts</code>', 'the service', `you pick ${pub('show')} and ${pub('dismiss')}, but every caller types them`],
            ar: ['<code>show(msg)</code>، <code>dismiss(toastId)</code>', '<code>toasts.ts</code>', 'الـ service', `انت بتختار ${pub('show')} و${pub('dismiss')}، بس كل اللي بينادوهم بيكتبوهم`] },
          { en: ['<code>handleError(err)</code>', '<code>global-error-handler.ts</code>', 'you, once per app', `the class name ${pub('GlobalErrorHandler')} is yours; ${ng('handleError')} is Angular’s`],
            ar: ['<code>handleError(err)</code>', '<code>global-error-handler.ts</code>', 'انت، مرة للتطبيق كله', `اسم الكلاس ${pub('GlobalErrorHandler')} بتاعك؛ و${ng('handleError')} بتاع أنجولار`] },
          { en: ['<code>{ provide: ErrorHandler, useClass: GlobalErrorHandler }</code>', '<code>app.config.ts</code>', 'you, once per app', `only ${pub('GlobalErrorHandler')} is yours`],
            ar: ['<code>{ provide: ErrorHandler, useClass: GlobalErrorHandler }</code>', '<code>app.config.ts</code>', 'انت، مرة للتطبيق كله', `${pub('GlobalErrorHandler')} بس اللي بتاعك`] },
          { en: ['<code>orders.error()</code>, <code>orders.reload()</code>', '<code>orders-page.html</code>', 'each page', `${mine('orders')} is yours; ${ng('error')} and ${ng('reload')} are Angular’s`],
            ar: ['<code>orders.error()</code>، <code>orders.reload()</code>', '<code>orders-page.html</code>', 'كل صفحة', `${mine('orders')} بتاعك؛ و${ng('error')} و${ng('reload')} بتوع أنجولار`] },
        ] },
      { t: 'ul',
        en: ['<b>The interceptor tells, the page recovers.</b> The interceptor shows the toast and passes the error on. The page decides what the screen looks like and offers <b>Try again</b>.',
             '<b>You never call <code>handleError</code> yourself.</b> Angular does, for errors nothing else caught. That is why its name is Angular’s and not yours.',
             '<b>Only the service knows what a toast looks like.</b> Everyone else just calls <code>show</code> with a sentence.'],
        ar: ['<b>الـ interceptor بيبلّغ، والصفحة بتتعافى.</b> الـ interceptor بيعرض الـ toast وبيعدّي الـ error. والصفحة بتقرر شكل الشاشة وبتعرض <b>Try again</b>.',
             '<b>عمرك ما بتنادي <code>handleError</code> بنفسك.</b> أنجولار هو اللي بيناديها، للأخطاء اللي محدش مسكها. وعشان كده اسمها بتاع أنجولار مش بتاعك.',
             '<b>الـ service بس هي اللي عارفة شكل الـ toast.</b> أي حد تاني بينادي <code>show</code> بجملة وخلاص.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All seven files, every name coloured', ar: 'السبع ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same example, complete. Hover a coloured name to light up everywhere else it appears. Then press <b>Rename test</b>: every name you own turns into a made-up word, and <code>handleError</code> stays exactly where it is.',
      ar: 'نفس المثال، كامل. قف بالماوس على أي اسم ملوّن وهتنوّر كل الأماكن التانية اللي هو فيها. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: كل اسم بتاعك هيبقى كلمة عشوائية، و<code>handleError</code> هيفضل مكانه بالظبط.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'app.config.ts', lang: 'ts', tag: { en: 'once per app', ar: 'مرة للتطبيق كله' }, code: [
        "import { ApplicationConfig, ErrorHandler } from '@angular/core';",
        "import { provideHttpClient, withInterceptors } from '@angular/common/http';",
        "import { errorInterceptor } from './error.interceptor';",
        "import { GlobalErrorHandler } from './global-error-handler';",
        '',
        'export const appConfig: ApplicationConfig = {',
        '  providers: [',
        '    provideHttpClient(withInterceptors([errorInterceptor])),',
        '    { provide: ErrorHandler, useClass: GlobalErrorHandler },',
        '  ],',
        '};' ] },
      { t: 'code', name: 'error.interceptor.ts', lang: 'ts', tag: { en: 'every HTTP failure', ar: 'أي فشل HTTP' }, code: [
        "import { inject } from '@angular/core';",
        "import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';",
        "import { catchError, retry, throwError, timer } from 'rxjs';",
        "import { Toasts } from './toasts';",
        '',
        'export const errorInterceptor: HttpInterceptorFn = (req, next) => {',
        '  const toasts = inject(Toasts);',
        '',
        '  return next(req).pipe(',
        '    retry({',
        '      count: 2,',
        '      delay: (err: HttpErrorResponse, attempt) => {',
        '        const worthIt = err.status === 0 || err.status >= 500;',
        '        return worthIt ? timer(attempt * 1000) : throwError(() => err);  // 1s, then 2s',
        '      },',
        '    }),',
        '    catchError((err: HttpErrorResponse) => {',
        "      if (err.status === 0) toasts.show('You seem to be offline.');",
        "      else if (err.status >= 500) toasts.show('Our server had a problem. Try again shortly.');",
        "      else if (err.status !== 404) toasts.show(err.error?.message ?? 'Something went wrong.');",
        '      return throwError(() => err);         // the page still hears about it',
        '    }),',
        '  );',
        '};' ] },
      { t: 'code', name: 'toasts.ts', lang: 'ts', tag: { en: 'one place to report', ar: 'مكان واحد للإبلاغ' }, code: [
        "import { Injectable, signal } from '@angular/core';",
        '',
        'export interface Toast {',
        '  id: number;',
        '  text: string;',
        '}',
        '',
        "@Injectable({ providedIn: 'root' })",
        'export class Toasts {',
        '  private readonly _all = signal<Toast[]>([]);',
        '  readonly all = this._all.asReadonly();',
        '  private nextId = 1;',
        '',
        '  show(msg: string) {',
        '    const toastId = this.nextId++;',
        '    this._all.update(list => [...list, { id: toastId, text: msg }]);',
        '    setTimeout(() => this.dismiss(toastId), 5000);',
        '  }',
        '',
        '  dismiss(toastId: number) {',
        '    this._all.update(list => list.filter(t => t.id !== toastId));',
        '  }',
        '}' ] },
      { t: 'code', name: 'toast-outlet.ts', lang: 'ts', tag: { en: 'shows them', ar: 'بيعرضهم' }, code: [
        "import { Component, inject } from '@angular/core';",
        "import { Toasts } from './toasts';",
        '',
        '@Component({',
        "  selector: 'app-toast-outlet',",
        '  template: `',
        '    @for (t of toasts.all(); track t.id) {',
        '      <p role="status">{{ t.text }} <button (click)="toasts.dismiss(t.id)">×</button></p>',
        '    }',
        '  `,',
        '})',
        'export class ToastOutlet {',
        '  protected readonly toasts = inject(Toasts);',
        '}' ] },
      { t: 'code', name: 'global-error-handler.ts', lang: 'ts', tag: { en: 'the last resort', ar: 'الملاذ الأخير' }, code: [
        "import { ErrorHandler, Injectable, inject } from '@angular/core';",
        "import { Toasts } from './toasts';",
        '',
        '@Injectable()',
        'export class GlobalErrorHandler implements ErrorHandler {',
        '  private readonly toasts = inject(Toasts);',
        '',
        '  handleError(err: unknown) {',
        '    console.error(err);                                   // for you',
        "    this.toasts.show('Something unexpected happened.');   // for the person",
        '  }',
        '}' ] },
      { t: 'code', name: 'orders-page.ts', lang: 'ts', tag: { en: 'the page', ar: 'الصفحة' }, code: [
        "import { Component } from '@angular/core';",
        "import { httpResource } from '@angular/common/http';",
        '',
        'export interface Order {',
        '  ref: string;',
        '  total: number;',
        '}',
        '',
        '@Component({',
        "  templateUrl: './orders-page.html',",
        '})',
        'export class OrdersPage {',
        "  readonly orders = httpResource<Order[]>(() => '/api/orders');",
        '}' ] },
      { t: 'code', name: 'orders-page.html', lang: 'html', tag: { en: 'every state', ar: 'كل الحالات' }, code: [
        '@if (orders.isLoading()) {',
        '  <p>Loading your orders…</p>',
        '} @else if (orders.error()) {',
        '  <p role="alert">We could not load your orders right now.</p>',
        '  <button (click)="orders.reload()">Try again</button>',
        '} @else {',
        '  @for (o of orders.value() ?? []; track o.ref) {',
        '    <p>{{ o.ref }}: {{ o.total }}</p>',
        '  } @empty {',
        '    <p>No orders yet.</p>',
        '  }',
        '}' ] },
      { t: 'p',
        en: 'The toast outlet goes once in the app shell’s template as <code>&lt;app-toast-outlet /&gt;</code>. The orders page has no selector: the router places it.',
        ar: 'الـ toast outlet بيتحط مرة واحدة في تمبلت الـ app shell كـ <code>&lt;app-toast-outlet /&gt;</code>. وصفحة الـ orders ملهاش selector: الـ router هو اللي بيحطها.' },
      { t: 'nmtable' }
    ]
  },

  /* ------------------------------------------------------------ 4 */
  {
    id: 'rename',
    kicker: { en: 'Is it OK to change it?', ar: 'ينفع أغيّره؟' },
    title: { en: 'What breaks when you rename each name', ar: 'إيه اللي بيبوظ لما تغيّر كل اسم' },
    lead: {
      en: 'Every name you own can be renamed, and almost every miss is a compile error. The dangerous one is a name you do <b>not</b> own but might think you do.',
      ar: 'أي اسم بتاعك ينفع يتغير، وتقريبًا أي حاجة تتنسي بتطلع compile error. الخطير هو اسم <b>مش</b> بتاعك بس ممكن تفتكره بتاعك.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [ng('handleError'), 'nothing: you may not rename it', '<b>With</b> <code>implements ErrorHandler</code>: a compile error, the class no longer fits. <b>Without</b> it: no error, and Angular never calls your code.'],
            ar: [ng('handleError'), 'ولا حاجة: مينفعش تغيّره', '<b>مع</b> <code>implements ErrorHandler</code>: compile error، الكلاس مبقاش مطابق. <b>من غيرها</b>: مفيش error، وأنجولار عمره ما هينادي الكود بتاعك.'] },
          { en: [pub('show'), 'every <code>toasts.show(…)</code>: the interceptor and the handler', 'Compile error in each caller.'],
            ar: [pub('show'), 'كل <code>toasts.show(…)</code>: في الـ interceptor والـ handler', 'Compile error في كل حتة بتناديها.'] },
          { en: [`${pub('dismiss')}, ${pub('all')}`, 'the outlet’s template', 'Compile error in the template.'],
            ar: [`${pub('dismiss')} و${pub('all')}`, 'تمبلت الـ outlet', 'Compile error في التمبلت.'] },
          { en: [pub('Toasts'), 'the import and <code>inject(Toasts)</code> in three files', 'Compile error on the imports.'],
            ar: [pub('Toasts'), 'الـ import و<code>inject(Toasts)</code> في تلات ملفات', 'Compile error في الـ imports.'] },
          { en: [`${pub('errorInterceptor')}, ${pub('GlobalErrorHandler')}`, 'the import and its place in <code>app.config.ts</code>', 'Compile error on the import.'],
            ar: [`${pub('errorInterceptor')} و${pub('GlobalErrorHandler')}`, 'الـ import ومكانه في <code>app.config.ts</code>', 'Compile error في الـ import.'] },
          { en: [`${pub('Order')}, ${pub('ref')}, ${pub('total')}`, 'the template, and the server’s JSON must still match', 'Compile error in the template. Rename a field only on your side and it compiles but shows nothing.'],
            ar: [`${pub('Order')} و${pub('ref')} و${pub('total')}`, 'التمبلت، والـ JSON بتاع السيرفر لازم يفضل مطابق', 'Compile error في التمبلت. لو غيّرت field عندك بس، هيعمل compile بس مش هيعرض حاجة.'] },
          { en: [mine('orders'), 'every <code>orders.</code> in the page’s template', 'Compile error in the template.'],
            ar: [mine('orders'), 'كل <code>orders.</code> في تمبلت الصفحة', 'Compile error في التمبلت.'] },
          { en: [`${mine('err')}, ${mine('attempt')}, ${mine('msg')}, ${mine('toastId')}, ${mine('toasts')}`, 'only inside that one function or class', 'Compile error inside it.'],
            ar: [`${mine('err')} و${mine('attempt')} و${mine('msg')} و${mine('toastId')} و${mine('toasts')}`, 'جوه الـ function أو الكلاس ده بس', 'Compile error جواه.'] },
          { en: [`${ng('count')}, ${ng('delay')}, ${ng('status')}, ${ng('error')}`, 'nothing: they are RxJS’s and Angular’s', 'A misspelled <code>retry</code> key is a compile error; see “When a rule picks the name”.'],
            ar: [`${ng('count')} و${ng('delay')} و${ng('status')} و${ng('error')}`, 'ولا حاجة: دول بتوع RxJS وأنجولار', 'مفتاح غلط في <code>retry</code> بيطلع compile error؛ شوف “لما قاعدة هي اللي بتختار الاسم”.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b> above the files. <code>err</code> becomes fruit in four different functions, and <code>handleError</code> does not move. That is the whole difference between a parameter name and a method Angular calls.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b> فوق الملفات. <code>err</code> هيبقى فاكهة في أربع functions مختلفة، و<code>handleError</code> مش هيتحرك. وده الفرق كله بين اسم parameter وميثود أنجولار بيناديها.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتاعتك' },
    title: { en: 'The word <code>error</code> has four owners', ar: 'كلمة <code>error</code> ليها أربع أصحاب' },
    lead: {
      en: 'Most of the confusion on this topic is one word. In the files above, <code>error</code> appears in four places and none of them is yours. The one error-ish name that <b>is</b> yours is <code>err</code>.',
      ar: 'أغلب اللخبطة في الموضوع ده كلمة واحدة. في الملفات اللي فوق، <code>error</code> ظاهرة في أربع أماكن ومفيش واحد فيهم بتاعك. والاسم الوحيد اللي شبه error و<b>بتاعك</b> هو <code>err</code>.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['You see', 'Whose', 'What it is'], ar: ['اللي بتشوفه', 'بتاع مين', 'هو إيه'] },
        rows: [
          { en: ['<code>err.error</code>', 'Angular (on <code>HttpErrorResponse</code>)', 'The body the server sent back, often JSON with its own <code>message</code>.'],
            ar: ['<code>err.error</code>', 'أنجولار (في <code>HttpErrorResponse</code>)', 'الـ body اللي السيرفر رجّعه، وغالبًا JSON فيه <code>message</code> بتاعه.'] },
          { en: ['<code>orders.error()</code>', 'Angular (on every resource)', 'A signal: the failure, or <code>undefined</code> when all is well.'],
            ar: ['<code>orders.error()</code>', 'أنجولار (في أي resource)', 'signal: الفشل، أو <code>undefined</code> لو كله تمام.'] },
          { en: ['<code>console.error(err)</code>', 'the browser', 'Prints in red in the console.'],
            ar: ['<code>console.error(err)</code>', 'المتصفح', 'بيطبع بالأحمر في الكونسول.'] },
          { en: [`${ng('catchError')}, ${ng('throwError')}, ${ng('ErrorHandler')}, ${ng('handleError')}`, 'RxJS and Angular', 'Operators, a class, and the method Angular calls on it.'],
            ar: [`${ng('catchError')} و${ng('throwError')} و${ng('ErrorHandler')} و${ng('handleError')}`, 'RxJS وأنجولار', 'operators، وكلاس، والميثود اللي أنجولار بيناديها عليه.'] },
          { en: [mine('err'), '<b>you</b>', 'Just a parameter. <code>error</code>, <code>e</code> or <code>failure</code> work the same.'],
            ar: [mine('err'), '<b>انت</b>', 'مجرد parameter. <code>error</code> أو <code>e</code> أو <code>failure</code> هيشتغلوا بنفس الشكل.'] },
        ] },
      { t: 'p',
        en: `Why is ${mine('err')} yours? Because RxJS passes values <b>by position</b>. ${ng('catchError')} calls your function with the error first. ${ng('delay')} calls it with the error first and the attempt number second. The names you give those positions are up to you, exactly like the parameters of any function.`,
        ar: `ليه ${mine('err')} بتاعك؟ عشان RxJS بيبعت القيم <b>بالترتيب</b>. ${ng('catchError')} بتنادي الـ function بتاعتك والـ error أول حاجة. و${ng('delay')} بتناديها والـ error الأول ورقم المحاولة تاني. الأسماء اللي بتديها للأماكن دي براحتك، زي parameters أي function بالظبط.` },
      { t: 'p',
        en: `${ng('status')} and ${ng('message')} on ${mine('err')} are Angular’s fields. <code>status</code> is the HTTP code; <code>0</code> means the request never reached a server (offline, blocked, or CORS). ${ng('count')} and ${ng('delay')} are the only keys ${ng('retry')} understands, apart from <code>resetOnSuccess</code>.`,
        ar: `${ng('status')} و${ng('message')} اللي على ${mine('err')} fields بتاعة أنجولار. <code>status</code> هو كود الـ HTTP؛ و<code>0</code> معناها الـ request موصلش لأي سيرفر (مفيش نت، أو اتمنع، أو CORS). و${ng('count')} و${ng('delay')} هما المفتاحين الوحيدين اللي ${ng('retry')} فاهمهم، غير <code>resetOnSuccess</code>.` }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'Angular accepts almost any name here. With four kinds of <code>error</code> around, the main habit is: do not add a fifth.',
      ar: 'أنجولار بيقبل أي اسم تقريبًا هنا. ومع أربع أنواع <code>error</code> حواليك، العادة الأهم: متضيفش خامس.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['the callback parameter', '<code>err</code>', '<code>error</code> inside <code>catchError</code>', 'Then you write <code>error.error.message</code>, which nobody can read. <code>err.error.message</code> is at least clear about which is which.'],
            ar: ['الـ parameter بتاع الـ callback', '<code>err</code>', '<code>error</code> جوه <code>catchError</code>', 'ساعتها هتكتب <code>error.error.message</code>، ومحدش هيعرف يقراها. <code>err.error.message</code> على الأقل واضح مين إيه.'] },
          { en: ['the toast method', '<code>show</code>, <code>dismiss</code>', '<code>error()</code>, <code>alert()</code>', '<code>toasts.error(err.error)</code> is a sixth <code>error</code>. <code>alert</code> reads like the browser’s popup.'],
            ar: ['ميثود الـ toast', '<code>show</code>، <code>dismiss</code>', '<code>error()</code>، <code>alert()</code>', '<code>toasts.error(err.error)</code> ده <code>error</code> سادس. و<code>alert</code> بتتقري زي popup المتصفح.'] },
          { en: ['the service', '<code>Toasts</code>, <code>ToastService</code>', '<code>Helper</code>, <code>Utils</code>', 'Say what it holds. Every file that injects it types this name.'],
            ar: ['الـ service', '<code>Toasts</code>، <code>ToastService</code>', '<code>Helper</code>، <code>Utils</code>', 'قول هي شايلة إيه. أي ملف بيعملها inject بيكتب الاسم ده.'] },
          { en: ['the handler class', '<code>GlobalErrorHandler</code>, <code>AppErrorHandler</code>', '<code>ErrorHandler</code>', 'Naming your class the same as Angular’s means importing two things with one name.'],
            ar: ['كلاس الـ handler', '<code>GlobalErrorHandler</code>، <code>AppErrorHandler</code>', '<code>ErrorHandler</code>', 'لو سمّيت الكلاس بتاعك زي بتاع أنجولار، هتعمل import لحاجتين بنفس الاسم.'] },
          { en: ['the message itself', '“We could not load your orders right now.”', '“Error 503”, “Oops!”', 'Say what happened and what to do next. Codes go to the console, not to people.'],
            ar: ['الرسالة نفسها', '“We could not load your orders right now.”', '“Error 503”، “Oops!”', 'قول إيه اللي حصل والخطوة الجاية. الأكواد مكانها الكونسول، مش قدام الناس.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Two places where the name is not free', ar: 'مكانين الاسم فيهم مش براحتك' },
    lead: {
      en: 'Two names on this page look like yours and are not. One of them can fail completely silently if you are not careful.',
      ar: 'فيه اسمين في الصفحة دي شكلهم بتوعك وهما لأ. واحد منهم ممكن يفشل في صمت تام لو مخدتش بالك.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: '<code>handleError</code> is Angular’s contract', ar: '<code>handleError</code> عقد بتاع أنجولار' }, blocks: [
        { t: 'p',
          en: `When something goes wrong, Angular takes whatever you registered as ${ng('ErrorHandler')} and calls its ${ng('handleError')} method. By name. Write <code>implements ErrorHandler</code> and TypeScript checks that name for you.`,
          ar: `لما حاجة تبوظ، أنجولار بياخد اللي انت مسجّله كـ ${ng('ErrorHandler')} وبينادي الميثود ${ng('handleError')} بتاعته. بالاسم. اكتب <code>implements ErrorHandler</code> وTypeScript هيراجع الاسم ده عشانك.` },
        { t: 'pair',
          bad:  { name: 'global-error-handler.ts — no contract', lang: 'ts', code: [
            '@Injectable()',
            'export class GlobalErrorHandler {',
            '  report(err: unknown) {        // Angular never calls this',
            '    console.error(err);',
            '  }',
            '}' ] },
          good: { name: 'global-error-handler.ts — with the contract', lang: 'ts', code: [
            '@Injectable()',
            'export class GlobalErrorHandler implements ErrorHandler {',
            '  handleError(err: unknown) {   // misspell it: compile error',
            '    console.error(err);',
            '  }',
            '}' ] } },
        { t: 'p',
          en: 'The left one compiles, because <code>useClass</code> accepts any class. Your method just never runs. <code>implements</code> turns that silent failure into a red line in your editor.',
          ar: 'اللي على الشمال بيعمل compile، عشان <code>useClass</code> بتقبل أي كلاس. الميثود بتاعتك بس عمرها ما بتشتغل. و<code>implements</code> بتحوّل الفشل الصامت ده لخط أحمر في الـ editor.' }
      ]},
      { t: 'step', n: 'B', title: { en: '<code>retry</code> only knows its own keys', ar: '<code>retry</code> فاهم المفاتيح بتاعته بس' }, blocks: [
        { t: 'pair',
          bad:  { name: 'error.interceptor.ts', lang: 'ts', code: ['retry({ times: 2, wait: 1000 }),'] },
          good: { name: 'error.interceptor.ts', lang: 'ts', code: ['retry({ count: 2, delay: 1000 }),'] } },
        { t: 'p',
          en: `This one is loud: TypeScript refuses <code>times</code> and <code>wait</code>. ${ng('delay')} can be a number of milliseconds, or a function like ours that decides per failure. Only the names of that function’s parameters are yours.`,
          ar: `دي بتعلّي صوتها: TypeScript بيرفض <code>times</code> و<code>wait</code>. و${ng('delay')} ممكن تبقى رقم بالـ milliseconds، أو function زي بتاعتنا بتقرر مع كل فشل. أسماء الـ parameters بتاعة الـ function دي بس هي اللي بتاعتك.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: 'Class interceptors and <code>throwError(err)</code>', ar: 'الـ interceptors الكلاس و<code>throwError(err)</code>' },
    lead: {
      en: 'Older projects write the same interceptor as a class, and older RxJS code passes the error straight to <code>throwError</code>. Your names do not change; a few of Angular’s and RxJS’s do.',
      ar: 'المشاريع الأقدم بتكتب نفس الـ interceptor على شكل كلاس، وكود RxJS الأقدم بيدّي الـ error لـ <code>throwError</code> على طول. أسماءك مش بتتغير؛ شوية من أسماء أنجولار وRxJS هما اللي بيتغيروا.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: OLD_INT, lang: 'ts', code: [
          '@Injectable()',
          'export class ErrorInterceptor implements HttpInterceptor {',
          '  private readonly toasts = inject(Toasts);',
          '',
          '  intercept(req: HttpRequest<unknown>, next: HttpHandler) {',
          '    return next.handle(req).pipe(',
          '      catchError((err: HttpErrorResponse) => {',
          "        this.toasts.show('Something went wrong.');",
          '        return throwError(err);',
          '      }),',
          '    );',
          '  }',
          '}' ] },
        good: { name: 'error.interceptor.ts — today', lang: 'ts', code: [
          'export const errorInterceptor: HttpInterceptorFn = (req, next) => {',
          '  const toasts = inject(Toasts);',
          '',
          '  return next(req).pipe(',
          '    catchError((err: HttpErrorResponse) => {',
          "      toasts.show('Something went wrong.');",
          '      return throwError(() => err);',
          '    }),',
          '  );',
          '};' ] } },
      { t: 'p',
        en: `In the class, ${ng('intercept')} is forced by ${ng('HttpInterceptor')} and ${ng('handle')} is the older handler’s method. <code>throwError(err)</code> with a plain value still works but is deprecated in RxJS 7; pass a function, <code>() =&gt; err</code>. You may also meet <code>retryWhen</code>, which RxJS 7 deprecated in favour of <code>retry({ delay })</code>. ${mine('toasts')}, ${mine('err')}, ${mine('req')} and ${mine('next')} are yours in both versions.`,
        ar: `في الكلاس، ${ng('intercept')} مفروض بسبب ${ng('HttpInterceptor')} و${ng('handle')} ميثود الـ handler القديم. و<code>throwError(err)</code> بقيمة عادية لسه شغالة بس deprecated في RxJS 7؛ ادّيها function، <code>() =&gt; err</code>. وممكن تقابل <code>retryWhen</code>، واللي RxJS 7 عملها deprecated لصالح <code>retry({ delay })</code>. و${mine('toasts')} و${mine('err')} و${mine('req')} و${mine('next')} بتوعك في النسختين.` }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It does nothing, and says nothing', ar: 'مش بيعمل حاجة، ومش بيقول حاجة' },
    title: { en: 'Mistakes that fail silently', ar: 'غلطات بتفشل في صمت' },
    lead: {
      en: 'Error code is the code you test least, because things rarely fail on your machine. These mistakes only show up on a bad day, in production.',
      ar: 'كود الأخطاء هو الكود اللي بتجرّبه أقل حاجة، عشان الحاجات نادرًا ما بتفشل على جهازك. الغلطات دي مش بتبان غير في يوم وحش، على الـ production.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'Registering the handler under its own name', ar: 'تسجيل الـ handler تحت اسمه هو' }, blocks: [
        { t: 'pair',
          bad:  { name: 'app.config.ts', lang: 'ts', code: ['providers: [GlobalErrorHandler],'] },
          good: { name: 'app.config.ts', lang: 'ts', code: ['providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandler }],'] } },
        { t: 'p', en: 'Angular asks for <code>ErrorHandler</code>, not for your class. The left line makes your class available, but nobody asks for it, so Angular keeps using its default handler, which only logs to the console.',
                  ar: 'أنجولار بيطلب <code>ErrorHandler</code>، مش الكلاس بتاعك. السطر اللي على الشمال بيخلي الكلاس بتاعك متاح، بس محدش بيطلبه، فأنجولار بيفضل يستخدم الـ handler الافتراضي بتاعه، اللي بيكتب في الكونسول وبس.' }
      ]},
      { t: 'step', n: '2', title: { en: '<code>catchError</code> before <code>retry</code>', ar: '<code>catchError</code> قبل <code>retry</code>' }, blocks: [
        { t: 'pair',
          bad:  { name: 'error.interceptor.ts', lang: 'ts', code: [
            'return next(req).pipe(',
            '  catchError((err: HttpErrorResponse) => { … }),',
            '  retry({ count: 2, delay: 1000 }),',
            ');' ] },
          good: { name: 'error.interceptor.ts', lang: 'ts', code: [
            'return next(req).pipe(',
            '  retry({ count: 2, delay: 1000 }),',
            '  catchError((err: HttpErrorResponse) => { … }),',
            ');' ] } },
        { t: 'p', en: 'Operators run top to bottom. On the left, every single failed attempt reaches <code>catchError</code> first, so the person gets three toasts for one problem.',
                  ar: 'الـ operators بتشتغل من فوق لتحت. على الشمال، كل محاولة فاشلة بتوصل لـ <code>catchError</code> الأول، فالشخص بياخد تلات toasts لمشكلة واحدة.' }
      ]},
      { t: 'step', n: '3', title: { en: 'Showing <code>err.message</code> to a person', ar: 'إنك تعرض <code>err.message</code> لإنسان' }, blocks: [
        { t: 'pair',
          bad:  { name: 'error.interceptor.ts', lang: 'ts', code: ['toasts.show(err.message);'] },
          good: { name: 'error.interceptor.ts', lang: 'ts', code: ["toasts.show(err.error?.message ?? 'Something went wrong.');"] } },
        { t: 'p', en: 'Both compile. <code>err.message</code> is Angular’s sentence for developers, something like “Http failure response for /api/orders: 500 …”. The server’s own words, if it sent any, are in <code>err.error</code>.',
                  ar: 'الاتنين بيعملوا compile. <code>err.message</code> جملة أنجولار للمبرمجين، حاجة زي «Http failure response for /api/orders: 500 …». وكلام السيرفر نفسه، لو بعت حاجة، موجود في <code>err.error</code>.' }
      ]},
      { t: 'step', n: '4', title: { en: 'Forgetting <code>return</code> in <code>catchError</code>', ar: 'نسيان <code>return</code> جوه <code>catchError</code>' }, blocks: [
        { t: 'pair',
          bad:  { name: 'error.interceptor.ts', lang: 'ts', code: [
            'catchError((err: HttpErrorResponse) => {',
            "  toasts.show('Something went wrong.');",
            '  throwError(() => err);',
            '}),' ] },
          good: { name: 'error.interceptor.ts', lang: 'ts', code: [
            'catchError((err: HttpErrorResponse) => {',
            "  toasts.show('Something went wrong.');",
            '  return throwError(() => err);',
            '}),' ] } },
        { t: 'p', en: 'This one gives an error, but a confusing one: the function “is not assignable” to what <code>catchError</code> expects. It means your function returned nothing. <code>catchError</code> must always return a stream: the error again, or something to use instead.',
                  ar: 'دي بتدي error، بس ملخبط: الـ function «is not assignable» للي <code>catchError</code> مستنياه. معناها إن الـ function بتاعتك مرجّعتش حاجة. <code>catchError</code> لازم دايمًا ترجّع stream: الـ error تاني، أو حاجة تستخدمها بداله.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it does nothing', ar: 'لما مايعملش حاجة' },
    title: { en: 'Six questions, in this order', ar: 'ست أسئلة، بالترتيب ده' },
    lead: {
      en: 'Something failed and the person saw nothing, or saw too much. Ask these before anything else.',
      ar: 'حاجة فشلت والشخص مشافش حاجة، أو شاف زيادة عن اللزوم. اسأل دول قبل أي حاجة.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Is your handler provided as <code>{ provide: ErrorHandler, useClass: … }</code>, and not just listed by its own name?',
                  ar: '<b>1.</b> الـ handler بتاعك متسجل كـ <code>{ provide: ErrorHandler, useClass: … }</code>، مش مكتوب باسمه وبس؟' },
      { t: 'chk', en: '<b>2.</b> Does the class say <code>implements ErrorHandler</code>, with a method spelled exactly <code>handleError</code>?',
                  ar: '<b>2.</b> الكلاس مكتوب فيه <code>implements ErrorHandler</code>، وفيه ميثود مكتوبة <code>handleError</code> بالظبط؟' },
      { t: 'chk', en: '<b>3.</b> Is the interceptor inside <code>withInterceptors([ ])</code>?',
                  ar: '<b>3.</b> الـ interceptor جوه <code>withInterceptors([ ])</code>؟' },
      { t: 'chk', en: '<b>4.</b> In the pipe, is <code>retry</code> above <code>catchError</code>?',
                  ar: '<b>4.</b> في الـ pipe، <code>retry</code> فوق <code>catchError</code>؟' },
      { t: 'chk', en: '<b>5.</b> Does <code>catchError</code> end with <code>return throwError(() =&gt; err)</code>, so the page’s <code>error()</code> is set?',
                  ar: '<b>5.</b> <code>catchError</code> بتخلص بـ <code>return throwError(() =&gt; err)</code>، عشان <code>error()</code> بتاعة الصفحة تتملي؟' },
      { t: 'chk', en: '<b>6.</b> Does the template check <code>error()</code> and offer <code>reload()</code>, separately from the empty state?',
                  ar: '<b>6.</b> التمبلت بيشيك على <code>error()</code> وبيعرض <code>reload()</code>، منفصل عن الحالة الفاضية؟' }
    ]
  }
  ]
};
