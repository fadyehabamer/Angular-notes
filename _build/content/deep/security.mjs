/* ==================================================================
   Security, name by name — the deep dive after the security topic.
   One running example (a blog post with CMS HTML, a YouTube embed and
   user comments) followed through every file.
   Model: content/deep/inputs-outputs.mjs.
   ================================================================== */

const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

export default {
  topic: 'security',
  tab: 'Security, name by name — The Angular Signal',
  title: { en: 'Security, name by name', ar: 'الأمان، اسم اسم' },
  say: {
    en: 'The page for when <code>sanitize</code>, <code>bypass</code>, <code>SafeHtml</code> and your own pipe names start to sound alike. One blog post followed from the API to the screen, every name coloured: <b>Angular’s</b>, <b>yours</b>, or <b>yours but shared</b>. Then why no name you pick can make anything safe.',
    ar: 'الصفحة دي للي <code>sanitize</code> و<code>bypass</code> و<code>SafeHtml</code> وأسماء الـ pipes بتاعته بقوا بيرنّوا زي بعض في ودنه. بوست واحد ماشيين وراه من الـ API للشاشة، وكل اسم ملوّن: <b>بتاع أنجولار</b>، ولا <b>بتاعك</b>، ولا <b>بتاعك بس متشارك</b>. وبعدين ليه مفيش اسم تختاره يقدر يخلي حاجة آمنة.'
  },
  lead: {
    en: 'The idea is simple: <b>Angular decides how to clean a value by where it lands, and it only stops cleaning when you call a method with <code>bypass</code> in its name.</b> The confusing part is the names. Angular’s <code>sanitize</code> and <code>bypassSecurityTrust…</code> sound alike and do opposite things, and the names you pick (<code>safeHtml</code>, <code>trusted</code>, <code>clean</code>) sound like promises they cannot keep. This page sorts out which names are Angular’s, which are yours, and which ones two sides must agree on.',
    ar: 'الفكرة بسيطة: <b>أنجولار بيقرر ينضّف القيمة إزاي حسب هي هتتحط فين، ومابيبطلش ينضّف غير لما تنادي ميثود في اسمها <code>bypass</code>.</b> اللي بيلخبط هو الأسماء. <code>sanitize</code> و<code>bypassSecurityTrust…</code> بتوع أنجولار شبه بعض في الاسم وبيعملوا العكس، والأسماء اللي انت بتختارها (<code>safeHtml</code> و<code>trusted</code> و<code>clean</code>) بتبان كأنها وعود مش هتقدر توفي بيها. الصفحة دي بترتّب أنهي أسماء بتاعة أنجولار، وأنهي بتاعتك، وأنهي لازم ناحيتين يتفقوا عليها.'
  },

  names: {
    note: {
      en: 'Every dangerous word here is blue: Angular’s or the browser’s. That is why you can grep for them. The orange names are agreements: a pipe name the template types, data keys the API sends, and the XSRF cookie and header your server must use. Green names are harmless labels; renaming them changes nothing about safety.',
      ar: 'كل كلمة خطيرة هنا زرقا: بتاعة أنجولار أو المتصفح. وعشان كده تقدر تدوّر عليها بـ grep. الأسماء البرتقاني اتفاقات: اسم pipe التمبلت بيكتبه، ومفاتيح داتا الـ API بيبعتها، واسم الكوكي والـ header بتوع الـ XSRF اللي السيرفر لازم يستخدمهم. والأسماء الخضرا مجرد أسامي؛ لو غيّرتها مفيش حاجة في الأمان هتتغير.'
    },
    names: [
      /* --- shared: two sides must agree --- */
      { n:'youtubeEmbed', k:'pub',
        w:{ en:'The pipe’s name. Every template types it after <code>|</code>.', ar:'اسم الـ pipe. أي تمبلت بيكتبه بعد <code>|</code>.' } },
      { n:'YoutubeEmbedPipe', k:'pub',
        w:{ en:'The pipe’s class. Components import it and list it in <code>imports</code>.', ar:'كلاس الـ pipe. الـ components بتعمله import وبتكتبه في <code>imports</code>.' } },
      { n:'PostView', k:'pub',
        w:{ en:'The component’s class, imported by whoever shows it.', ar:'كلاس الـ component، واللي بيعرضه بيعمله import.' } },
      { n:'app-post-view', k:'pub',
        w:{ en:'The component’s selector, typed as a tag by the parent.', ar:'الـ selector بتاع الـ component، والأب بيكتبه كتاج.' } },
      { n:'post', k:'pub', re:'(?<![\\w$\\/.-])post(?![\\w$-])',
        w:{ en:'An input. The parent sets it with <code>[post]</code>.', ar:'input. الأب بيحطه بـ <code>[post]</code>.' } },
      { n:'comments', k:'pub',
        w:{ en:'An input. The parent sets it with <code>[comments]</code>.', ar:'input. الأب بيحطه بـ <code>[comments]</code>.' } },
      { n:'Post', k:'pub', w:{ en:'Your data type.', ar:'نوع الداتا بتاعك.' } },
      { n:'UserComment', k:'pub',
        w:{ en:'Your data type. Not <code>Comment</code>: that is already a browser type (a DOM comment node).', ar:'نوع الداتا بتاعك. مش <code>Comment</code>: ده type موجود أصلًا في المتصفح (comment node في الـ DOM).' } },
      { n:'title', k:'pub', re:'(?<![\\w$-])title(?![\\w$=-])',
        w:{ en:'A data key. The API’s JSON and the template must agree. (The <code>title="…"</code> on the iframe is an HTML attribute, not this.)', ar:'مفتاح في الداتا. الـ JSON بتاع الـ API والتمبلت لازم يتفقوا. (و<code>title="…"</code> اللي على الـ iframe ده attribute في HTML، مش هو.)' } },
      { n:'bodyHtml', k:'pub', w:{ en:'A data key holding HTML from the CMS.', ar:'مفتاح في الداتا شايل HTML جاي من الـ CMS.' } },
      { n:'videoId', k:'pub', w:{ en:'A data key: the YouTube id.', ar:'مفتاح في الداتا: الـ id بتاع يوتيوب.' } },
      { n:'author', k:'pub', w:{ en:'A data key on a comment.', ar:'مفتاح في داتا الكومنت.' } },
      { n:'website', k:'pub', w:{ en:'A data key on a comment: a URL a user typed.', ar:'مفتاح في داتا الكومنت: URL يوزر كتبه.' } },
      { n:'text', k:'pub', w:{ en:'A data key on a comment: text a user typed.', ar:'مفتاح في داتا الكومنت: نص يوزر كتبه.' } },
      { n:'appConfig', k:'pub', w:{ en:'The app config, imported by <code>main.ts</code>.', ar:'إعدادات التطبيق، و<code>main.ts</code> بيعملها import.' } },
      { n:'XSRF-TOKEN', k:'pub', as:'MY-CSRF-COOKIE',
        w:{ en:'Angular’s default cookie name, but really a deal with your server: the server must set a cookie with exactly this name.',
            ar:'اسم الكوكي الافتراضي عند أنجولار، بس هو في الحقيقة اتفاق مع السيرفر: السيرفر لازم يعمل كوكي بالاسم ده بالظبط.' } },
      { n:'X-XSRF-TOKEN', k:'pub', as:'X-MY-CSRF-HEADER',
        w:{ en:'The header Angular sends back. The server checks for this exact name.', ar:'الـ header اللي أنجولار بيرجّعه. السيرفر بيدوّر على الاسم ده بالظبط.' } },
      { n:'safeHtml', k:'pub',
        w:{ en:'A pipe name in the mistake below. Templates type it. The word “safe” in it protects nothing.', ar:'اسم pipe في الغلطة اللي تحت. التمبلتس بتكتبه. وكلمة «safe» اللي فيه مابتحميش حاجة.' } },
      { n:'SafeHtmlPipe', k:'pub',
        w:{ en:'That pipe’s class, listed in <code>imports</code>. Not Angular’s <code>SafeHtml</code> type.', ar:'كلاس الـ pipe دي، بيتكتب في <code>imports</code>. مش الـ type <code>SafeHtml</code> بتاع أنجولار.' } },

      /* --- yours, private to one file --- */
      { n:'c', k:'mine', re:'(?<![\\w$.-])c(?=\\.|\\s+of\\b)',
        w:{ en:'The loop variable. Only the <code>@for</code> block sees it.', ar:'متغير اللوب. بلوك الـ <code>@for</code> بس اللي شايفه.' } },
      { n:'sanitizer', k:'mine',
        w:{ en:'Your field holding <code>DomSanitizer</code>. The safety comes from the class and the method, never from this name.', ar:'الـ field بتاعك اللي شايل <code>DomSanitizer</code>. الأمان جاي من الكلاس والميثود، عمره ما بييجي من الاسم ده.' } },
      { n:'id', k:'mine', only:['youtube-embed-pipe.ts'],
        w:{ en:'The <code>transform</code> parameter. Angular passes the value by position, so the name is yours.', ar:'الـ parameter بتاع <code>transform</code>. أنجولار بيبعت القيمة حسب مكانها، فالاسم بتاعك.' } },
      { n:'url', k:'mine', only:['ts'],
        w:{ en:'A local name. <code>URL</code> in capitals is JavaScript’s class, a different name.', ar:'اسم محلي. و<code>URL</code> بالكابيتال ده كلاس JavaScript، اسم تاني خالص.' } },
      { n:'value', k:'mine', only:['safe-html-pipe.ts'],
        w:{ en:'That pipe’s parameter.', ar:'الـ parameter بتاع الـ pipe دي.' } },
      { n:'loadedPost', k:'mine', w:{ en:'The parent’s own signal.', ar:'الـ signal بتاعة الأب نفسه.' } },
      { n:'loadedComments', k:'mine', w:{ en:'The parent’s own signal.', ar:'الـ signal بتاعة الأب نفسه.' } },
      { n:'RawBox', k:'mine', w:{ en:'A class name in the example.', ar:'اسم كلاس في المثال.' } },
      { n:'host', k:'mine', only:['danger-zone.ts'], re:'(?<![\\w$\'-])host(?![\\w$\'-])',
        w:{ en:'Your field holding an <code>ElementRef</code>. <code>nativeElement</code> after the dot is Angular’s.', ar:'الـ field بتاعك اللي شايل <code>ElementRef</code>. و<code>nativeElement</code> اللي بعد النقطة بتاعة أنجولار.' } },
      { n:'showRaw', k:'mine', w:{ en:'Your method.', ar:'الميثود بتاعتك.' } },
      { n:'showClean', k:'mine', w:{ en:'Your method.', ar:'الميثود بتاعتك.' } },
      { n:'html', k:'mine', only:['danger-zone.ts'], w:{ en:'A parameter.', ar:'parameter.' } },
      { n:'embedFromUrl', k:'mine', w:{ en:'Your method.', ar:'الميثود بتاعتك.' } },
      { n:'ALLOWED_HOSTS', k:'mine', w:{ en:'Your allowlist constant.', ar:'الـ constant بتاعك اللي فيه القايمة المسموحة.' } },

      /* --- Angular's, the browser's, JavaScript's --- */
      { n:'innerHTML', k:'ng',
        w:{ en:'The browser’s DOM property. As <code>[innerHTML]</code> Angular sanitizes it; set on <code>nativeElement</code> nothing does.',
            ar:'property بتاعة المتصفح في الـ DOM. كـ <code>[innerHTML]</code> أنجولار بينضّفها؛ لكن لو حطيتها على <code>nativeElement</code> محدش بينضّف حاجة.' } },
      { n:'href', k:'ng', w:{ en:'The browser’s link property. Angular blocks <code>javascript:</code> URLs here.', ar:'property اللينك بتاعة المتصفح. أنجولار بيمنع لينكات <code>javascript:</code> هنا.' } },
      { n:'src', k:'ng', re:'(?<=\\[)src(?=\\])', w:{ en:'The browser’s property. On an <code>&lt;iframe&gt;</code> it loads a whole page, so Angular demands a trusted value.', ar:'property بتاعة المتصفح. على <code>&lt;iframe&gt;</code> بتحمّل صفحة كاملة، فأنجولار بيطلب قيمة موثوقة.' } },
      { n:'@Pipe', k:'ng', w:{ en:'Angular’s decorator for pipes.', ar:'الـ decorator بتاع أنجولار للـ pipes.' } },
      { n:'name', k:'ng', re:'(?<=\\{ )name(?=:)', w:{ en:'An option key. The string after it is yours.', ar:'مفتاح إعداد. النص اللي بعده بتاعك.' } },
      { n:'PipeTransform', k:'ng', w:{ en:'Angular’s interface: it promises a <code>transform</code> method.', ar:'الـ interface بتاعة أنجولار: بتوعد إن فيه ميثود <code>transform</code>.' } },
      { n:'transform', k:'ng', w:{ en:'The method Angular calls on every pipe. Spelled exactly like this.', ar:'الميثود اللي أنجولار بيناديها في أي pipe. بتتكتب كده بالظبط.' } },
      { n:'inject', k:'ng', w:{ en:'Angular’s function that hands you a service.', ar:'الـ function بتاعة أنجولار اللي بتديك service.' } },
      { n:'DomSanitizer', k:'ng', w:{ en:'Angular’s sanitizer service.', ar:'الـ service بتاعة أنجولار اللي بتنضّف.' } },
      { n:'SafeResourceUrl', k:'ng', w:{ en:'Angular’s type for a URL you vouched for.', ar:'الـ type بتاع أنجولار لـ URL انت ضامنه.' } },
      { n:'bypassSecurityTrustResourceUrl', k:'ng', w:{ en:'Angular’s switch that turns checking off for one URL. You now vouch for it.', ar:'مفتاح أنجولار اللي بيقفل التشييك لـ URL واحد. انت دلوقتي الضامن.' } },
      { n:'bypassSecurityTrustHtml', k:'ng', w:{ en:'The same switch for HTML. On user content it <b>is</b> the vulnerability.', ar:'نفس المفتاح للـ HTML. على محتوى يوزر هو <b>نفسه</b> الثغرة.' } },
      { n:'sanitize', k:'ng', w:{ en:'The method that really filters. The opposite of <code>bypass…</code>.', ar:'الميثود اللي بتفلتر بجد. عكس <code>bypass…</code>.' } },
      { n:'SecurityContext', k:'ng', re:'(?<![\\w$-])SecurityContext(?:\\.[A-Z_]+)?(?![\\w$-])', w:{ en:'Angular’s list of places a value can land: <code>HTML</code>, <code>STYLE</code>, <code>URL</code>, <code>RESOURCE_URL</code>, <code>SCRIPT</code>.', ar:'قايمة أنجولار للأماكن اللي القيمة ممكن تتحط فيها: <code>HTML</code> و<code>STYLE</code> و<code>URL</code> و<code>RESOURCE_URL</code> و<code>SCRIPT</code>.' } },
      { n:'ElementRef', k:'ng', w:{ en:'Angular’s wrapper around a real element.', ar:'الغلاف بتاع أنجولار حوالين element حقيقي.' } },
      { n:'nativeElement', k:'ng', w:{ en:'The real DOM element. Writing to it skips Angular completely.', ar:'الـ element الحقيقي في الـ DOM. الكتابة فيه بتعدّي أنجولار خالص.' } },
      { n:'encodeURIComponent', k:'ng', w:{ en:'JavaScript’s function that makes a value safe inside a URL.', ar:'function بتاعة JavaScript بتخلّي القيمة آمنة جوه URL.' } },
      { n:'URL', k:'ng', w:{ en:'JavaScript’s URL parser.', ar:'الـ parser بتاع JavaScript للـ URLs.' } },
      { n:'hostname', k:'ng', w:{ en:'A property of <code>URL</code>.', ar:'property في <code>URL</code>.' } },
      { n:'@for', k:'ng', w:{ en:'Angular’s loop block.', ar:'بلوك اللوب بتاع أنجولار.' } },
      { n:'track', k:'ng', w:{ en:'Part of <code>@for</code>.', ar:'جزء من <code>@for</code>.' } },
      { n:'$index', k:'ng', w:{ en:'Angular’s fixed loop variable.', ar:'متغير اللوب الثابت بتاع أنجولار.' } },
      { n:'input', k:'ng', re:'(?<![\\w$<(-])input(?=[.(<,])', w:{ en:'Angular’s function that creates an input.', ar:'الـ function بتاعة أنجولار اللي بتعمل input.' } },
      { n:'required', k:'ng', w:{ en:'Part of <code>input.required</code>.', ar:'جزء من <code>input.required</code>.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator.', ar:'الـ decorator بتاع أنجولار.' } },
      { n:'selector', k:'ng', w:{ en:'An option key.', ar:'مفتاح إعداد.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key.', ar:'مفتاح إعداد.' } },
      { n:'imports', k:'ng', re:'(?<![\\w$-])imports(?=:)', w:{ en:'An option key.', ar:'مفتاح إعداد.' } },
      { n:'ApplicationConfig', k:'ng', w:{ en:'Angular’s config type.', ar:'الـ type بتاع إعدادات أنجولار.' } },
      { n:'providers', k:'ng', re:'(?<![\\w$-])providers(?=:)', w:{ en:'An option key.', ar:'مفتاح إعداد.' } },
      { n:'provideHttpClient', k:'ng', w:{ en:'Angular’s HTTP client setup.', ar:'تجهيز الـ HTTP client بتاع أنجولار.' } },
      { n:'withXsrfConfiguration', k:'ng', w:{ en:'Angular’s XSRF option for <code>provideHttpClient</code>.', ar:'إعداد الـ XSRF من أنجولار لـ <code>provideHttpClient</code>.' } },
      { n:'cookieName', k:'ng', w:{ en:'An option key Angular reads. The value is the deal with your server.', ar:'مفتاح إعداد أنجولار بيقراه. والقيمة هي الاتفاق مع السيرفر.' } },
      { n:'headerName', k:'ng', w:{ en:'An option key Angular reads.', ar:'مفتاح إعداد أنجولار بيقراه.' } },
      { n:'HttpClientXsrfModule', k:'ng', w:{ en:'The older NgModule for the same thing.', ar:'الـ NgModule القديم لنفس الحاجة.' } },
      { n:'withOptions', k:'ng', w:{ en:'Its older configuration method. Same keys.', ar:'ميثود الإعداد القديمة بتاعته. نفس المفاتيح.' } },
      { n:'@NgModule', k:'ng', w:{ en:'The older module decorator.', ar:'الـ decorator القديم بتاع الموديول.' } },
      { n:'ngCspNonce', k:'ng', w:{ en:'Angular’s attribute for a Content-Security-Policy nonce.', ar:'الـ attribute بتاع أنجولار للـ nonce بتاع Content-Security-Policy.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One post, six doors', ar: 'بوست واحد، ست أبواب' },
    lead: {
      en: 'A blog post arrives from the API: a title, HTML from the CMS, a YouTube id, and comments users typed. Assume every string might contain <code>&lt;img src=x onerror=alert(1)&gt;</code>. Follow the data to the screen and watch what Angular does at each door:',
      ar: 'بوست جاي من الـ API: عنوان، وHTML من الـ CMS، وid يوتيوب، وكومنتات كتبها يوزرز. افترض إن أي نص فيهم ممكن يبقى فيه <code>&lt;img src=x onerror=alert(1)&gt;</code>. امشي ورا الداتا لحد الشاشة وشوف أنجولار بيعمل إيه عند كل باب:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'post.ts', lang: 'ts', who: { en: 'the data · untrusted', ar: 'الداتا · مش موثوقة' },
          code: ['export interface UserComment {', '  author: string;', '  website: string;', '  text: string;', '}'],
          say: { en: `The keys ${pub('author')}, ${pub('website')} and ${pub('text')} are yours, and the API must send the same ones. What is <b>inside</b> them is someone else’s, and that is the whole problem.`,
                 ar: `المفاتيح ${pub('author')} و${pub('website')} و${pub('text')} بتاعتك، والـ API لازم يبعت نفس الأسماء. اللي <b>جواهم</b> بتاع حد تاني، ودي المشكلة كلها.` } },
        { file: 'post-view.html', lang: 'html', who: { en: 'door 1 · text', ar: 'باب 1 · نص' },
          code: ['{{ c.text }}'],
          say: { en: `Interpolation. Angular writes the value as <b>text</b>, so a tag shows up as visible characters and nothing runs. ${mine('c')} is your loop variable; ${pub('text')} is the data key.`,
                 ar: `Interpolation. أنجولار بيكتب القيمة كـ <b>نص</b>، فالتاج بيظهر كحروف عادية ومفيش حاجة بتشتغل. ${mine('c')} متغير اللوب بتاعك؛ و${pub('text')} مفتاح الداتا.` } },
        { file: 'post-view.html', lang: 'html', who: { en: 'door 2 · HTML', ar: 'باب 2 · HTML' },
          code: ['<article [innerHTML]="post().bodyHtml"></article>'],
          say: { en: `${ng('innerHTML')} is the browser’s property, spelled its way. Bound like this, Angular <b>sanitizes</b> first: it keeps the bold and the links and strips scripts and <code>on…</code> handlers.`,
                 ar: `${ng('innerHTML')} property بتاعة المتصفح، ومكتوبة بطريقته. لما تتربط كده، أنجولار <b>بينضّف</b> الأول: بيسيب الـ bold واللينكات وبيشيل السكريبتات والـ handlers اللي بتبدأ بـ <code>on…</code>.` } },
        { file: 'post-view.html', lang: 'html', who: { en: 'door 3 · a link', ar: 'باب 3 · لينك' },
          code: ['<a [href]="c.website">{{ c.author }}</a>'],
          say: { en: `${ng('href')} is a URL context. A normal address passes; a <code>javascript:</code> one is rewritten to <code>unsafe:…</code> and does nothing when clicked.`,
                 ar: `${ng('href')} مكان للـ URLs. العنوان العادي بيعدّي؛ واللي بيبدأ بـ <code>javascript:</code> بيتكتب <code>unsafe:…</code> ومابيعملش حاجة لما تدوس عليه.` } },
        { file: 'post-view.html', lang: 'html', who: { en: 'door 4 · a whole page', ar: 'باب 4 · صفحة كاملة' },
          code: ['<iframe [src]="post().videoId | youtubeEmbed" title="Video"></iframe>'],
          say: { en: `An iframe’s ${ng('src')} loads a whole page, and there is no way to “clean” a page. Angular refuses plain strings here. So the value goes through your pipe ${pub('youtubeEmbed')} first.`,
                 ar: `${ng('src')} بتاع الـ iframe بيحمّل صفحة كاملة، ومفيش طريقة «تنضّف» بيها صفحة. أنجولار بيرفض النصوص العادية هنا. فالقيمة بتعدّي على الـ pipe بتاعتك ${pub('youtubeEmbed')} الأول.` } },
        { file: 'youtube-embed-pipe.ts', lang: 'ts', who: { en: 'door 5 · you vouch', ar: 'باب 5 · انت الضامن' },
          code: ["const url = 'https://www.youtube.com/embed/' + encodeURIComponent(id);", 'return this.sanitizer.bypassSecurityTrustResourceUrl(url);'],
          say: { en: `The only line on this page where <b>you</b> are responsible. The address is yours and fixed; only the id comes from data, and ${ng('encodeURIComponent')} makes sure it stays an id. ${ng('bypassSecurityTrustResourceUrl')} is Angular’s; ${mine('sanitizer')} is just your field name.`,
                 ar: `السطر الوحيد في الصفحة دي اللي <b>انت</b> المسؤول فيه. العنوان بتاعك وثابت؛ والـ id بس اللي جاي من الداتا، و${ng('encodeURIComponent')} بتتأكد إنه يفضل id. ${ng('bypassSecurityTrustResourceUrl')} بتاعة أنجولار؛ و${mine('sanitizer')} مجرد اسم الـ field بتاعك.` } },
        { file: 'app.config.ts', lang: 'ts', who: { en: 'door 6 · requests', ar: 'باب 6 · الطلبات' },
          code: ["cookieName: 'XSRF-TOKEN',", "headerName: 'X-XSRF-TOKEN',"],
          say: { en: `Not about showing data but about sending it. ${ng('cookieName')} and ${ng('headerName')} are Angular’s keys; the two strings are a deal with your server, so they are orange.`,
                 ar: `دي مش عن عرض الداتا، دي عن بعتها. ${ng('cookieName')} و${ng('headerName')} مفاتيح أنجولار؛ والنصين اتفاق مع السيرفر بتاعك، فهما برتقاني.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'Angular chooses how to protect a value by <b>where it lands</b> (<code>{{ }}</code>, <code>[innerHTML]</code>, <code>[href]</code>, <code>[src]</code>), never by what you named it. The only place you switch protection off is a method with <code>bypass</code> in its name.',
        ar: 'أنجولار بيختار يحمي القيمة إزاي حسب <b>هي هتتحط فين</b> (<code>{{ }}</code> و<code>[innerHTML]</code> و<code>[href]</code> و<code>[src]</code>)، عمره ما بيختار حسب انت سمّيتها إيه. والمكان الوحيد اللي بتقفل فيه الحماية هو ميثود في اسمها <code>bypass</code>.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'Yours or Angular’s?', ar: 'بتاعك ولا بتاع أنجولار؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'On a security page it matters more than anywhere who owns each word, because the owner of the word is the owner of the decision.',
      ar: 'في صفحة عن الأمان، مين صاحب كل كلمة بيفرق أكتر من أي مكان تاني، لإن صاحب الكلمة هو صاحب القرار.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>{{ c.text }}</code>', 'template', 'you', `you pick ${mine('c')}; the API and you agree on ${pub('text')}`],
            ar: ['<code>{{ c.text }}</code>', 'التمبلت', 'انت', `انت بتختار ${mine('c')}؛ وانت والـ API متفقين على ${pub('text')}`] },
          { en: ['<code>[innerHTML]</code>, <code>[href]</code>, <code>[src]</code>', 'template', 'you', 'the browser: these are DOM property names'],
            ar: ['<code>[innerHTML]</code> و<code>[href]</code> و<code>[src]</code>', 'التمبلت', 'انت', 'المتصفح: دي أسماء properties في الـ DOM'] },
          { en: ["<code>@Pipe({ name: 'youtubeEmbed' })</code>", 'the pipe file', 'you', `you pick ${pub('youtubeEmbed')}; every template copies it`],
            ar: ["<code>@Pipe({ name: 'youtubeEmbed' })</code>", 'ملف الـ pipe', 'انت', `انت بتختار ${pub('youtubeEmbed')}؛ وكل تمبلت بينسخه`] },
          { en: ['<code>transform(id)</code>', 'the pipe file', 'you', `Angular picks ${ng('transform')}; you pick ${mine('id')}`],
            ar: ['<code>transform(id)</code>', 'ملف الـ pipe', 'انت', `أنجولار بيختار ${ng('transform')}؛ وانت بتختار ${mine('id')}`] },
          { en: ['<code>sanitizer.bypassSecurityTrustResourceUrl(…)</code>', 'the pipe file', 'you', `you pick ${mine('sanitizer')}; the method is Angular’s`],
            ar: ['<code>sanitizer.bypassSecurityTrustResourceUrl(…)</code>', 'ملف الـ pipe', 'انت', `انت بتختار ${mine('sanitizer')}؛ والميثود بتاعة أنجولار`] },
          { en: ["<code>cookieName: 'XSRF-TOKEN'</code>", '<code>app.config.ts</code>', 'you, with the backend team', 'the server: Angular’s default only works if the server uses it too'],
            ar: ["<code>cookieName: 'XSRF-TOKEN'</code>", '<code>app.config.ts</code>', 'انت، مع فريق الباك إند', 'السيرفر: الافتراضي بتاع أنجولار بيشتغل بس لو السيرفر بيستخدمه هو كمان'] },
        ] },
      { t: 'ul',
        en: ['<b>Safety comes from where a value is bound and which method you call.</b> Never from a name. A pipe called <code>safeHtml</code> that calls <code>bypassSecurityTrustHtml</code> is unsafe.',
             '<b>Every dangerous word is Angular’s or the browser’s.</b> <code>bypassSecurityTrust…</code>, <code>innerHTML</code>, <code>nativeElement</code>, <code>document.write</code>. You cannot rename them, which is exactly why a search for them finds every risky line.',
             '<b>Your names are labels.</b> Rename <code>sanitizer</code> to <code>ds</code> and nothing about safety changes. Rename <code>XSRF-TOKEN</code> and the server has to change too.'],
        ar: ['<b>الأمان جاي من القيمة اتربطت فين، وانت ناديت أنهي ميثود.</b> عمره ما بييجي من اسم. pipe اسمها <code>safeHtml</code> وبتنادي <code>bypassSecurityTrustHtml</code> مش آمنة.',
             '<b>كل كلمة خطيرة بتاعة أنجولار أو المتصفح.</b> <code>bypassSecurityTrust…</code> و<code>innerHTML</code> و<code>nativeElement</code> و<code>document.write</code>. مينفعش تغيّر أسماءهم، وده بالظبط السبب إن البحث عنهم بيلاقي كل سطر فيه خطر.',
             '<b>أسماءك مجرد أسامي.</b> غيّر <code>sanitizer</code> لـ <code>ds</code> ومفيش حاجة في الأمان هتتغير. لكن غيّر <code>XSRF-TOKEN</code> والسيرفر لازم يتغير هو كمان.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'All six files, every name coloured', ar: 'الست ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'The same post page, complete. Hover a coloured name to light up everywhere else it appears. Then press <b>Rename test</b>: every name you own becomes a made-up word, and the blue words that decide safety do not move.',
      ar: 'نفس صفحة البوست، كاملة. قف بالماوس على أي اسم ملوّن وهتنوّر كل الأماكن التانية اللي هو فيها. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: كل اسم بتاعك هيبقى كلمة عشوائية، والكلمات الزرقا اللي بتقرر الأمان مش هتتحرك.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'post.ts', lang: 'ts', tag: { en: 'the data', ar: 'الداتا' }, code: [
        'export interface Post {',
        '  title: string;',
        '  bodyHtml: string;   // HTML from the CMS',
        '  videoId: string;',
        '}',
        '',
        'export interface UserComment {',
        '  author: string;',
        '  website: string;',
        '  text: string;',
        '}' ] },
      { t: 'code', name: 'youtube-embed-pipe.ts', lang: 'ts', tag: { en: 'the one trusted line', ar: 'السطر الموثوق الوحيد' }, code: [
        "import { Pipe, PipeTransform, inject } from '@angular/core';",
        "import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';",
        '',
        "@Pipe({ name: 'youtubeEmbed' })",
        'export class YoutubeEmbedPipe implements PipeTransform {',
        '  private readonly sanitizer = inject(DomSanitizer);',
        '',
        '  transform(id: string): SafeResourceUrl {',
        '    // the address is fixed and ours; only the id comes from data',
        "    const url = 'https://www.youtube.com/embed/' + encodeURIComponent(id);",
        '    return this.sanitizer.bypassSecurityTrustResourceUrl(url);',
        '  }',
        '}' ] },
      { t: 'code', name: 'post-view.ts', lang: 'ts', tag: { en: 'the component', ar: 'الـ component' }, code: [
        "import { Component, input } from '@angular/core';",
        "import { Post, UserComment } from './post';",
        "import { YoutubeEmbedPipe } from './youtube-embed-pipe';",
        '',
        '@Component({',
        "  selector: 'app-post-view',",
        '  imports: [YoutubeEmbedPipe],',
        "  templateUrl: './post-view.html',",
        '})',
        'export class PostView {',
        '  readonly post = input.required<Post>();',
        '  readonly comments = input.required<UserComment[]>();',
        '}' ] },
      { t: 'code', name: 'post-view.html', lang: 'html', tag: { en: 'four doors', ar: 'أربع أبواب' }, code: [
        '<h1>{{ post().title }}</h1>',
        '',
        '<!-- sanitized: scripts and on… handlers are removed -->',
        '<article [innerHTML]="post().bodyHtml"></article>',
        '',
        '<!-- a resource URL: must be a value you vouched for -->',
        '<iframe [src]="post().videoId | youtubeEmbed" title="Video"></iframe>',
        '',
        '@for (c of comments(); track $index) {',
        '  <p>',
        '    <a [href]="c.website">{{ c.author }}</a>',
        '    {{ c.text }}',
        '  </p>',
        '}' ] },
      { t: 'code', name: 'post-page.html', lang: 'html', tag: { en: 'the parent (its .ts holds two signals)', ar: 'الأب (الـ .ts بتاعه فيه اتنين signals)' }, code: [
        '<app-post-view [post]="loadedPost()" [comments]="loadedComments()" />' ] },
      { t: 'code', name: 'app.config.ts', lang: 'ts', tag: { en: 'requests', ar: 'الطلبات' }, code: [
        "import { ApplicationConfig } from '@angular/core';",
        "import { provideHttpClient, withXsrfConfiguration } from '@angular/common/http';",
        '',
        'export const appConfig: ApplicationConfig = {',
        '  providers: [',
        '    provideHttpClient(',
        '      withXsrfConfiguration({',
        "        cookieName: 'XSRF-TOKEN',     // the cookie your server sets",
        "        headerName: 'X-XSRF-TOKEN',   // the header your server checks",
        '      }),',
        '    ),',
        '  ],',
        '};' ] },
      { t: 'nmtable' }
    ]
  },

  /* ------------------------------------------------------------ 4 */
  {
    id: 'rename',
    kicker: { en: 'Is it OK to change it?', ar: 'ينفع أغيّره؟' },
    title: { en: 'What breaks when you rename each name', ar: 'إيه اللي بيبوظ لما تغيّر كل اسم' },
    lead: {
      en: 'Renaming never makes code more or less safe. It only decides whether something breaks, and where you find out.',
      ar: 'تغيير الاسم عمره ما بيخلي الكود أأمن أو أخطر. هو بس بيحدد حاجة هتبوظ ولا لأ، وهتعرف فين.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [pub('youtubeEmbed') + ' (pipe name)', 'every <code>| youtubeEmbed</code> in templates', 'Compile error: no pipe found with that name.'],
            ar: [pub('youtubeEmbed') + ' (اسم الـ pipe)', 'كل <code>| youtubeEmbed</code> في التمبلتس', 'Compile error: مفيش pipe بالاسم ده.'] },
          { en: [pub('YoutubeEmbedPipe') + ' (class)', 'the <code>import</code> line and <code>imports: [ ]</code>', 'Compile error on the import.'],
            ar: [pub('YoutubeEmbedPipe') + ' (الكلاس)', 'سطر الـ <code>import</code> و<code>imports: [ ]</code>', 'Compile error في الـ import.'] },
          { en: [`${pub('post')}, ${pub('comments')} (inputs)`, 'the parent’s <code>[post]</code>, <code>[comments]</code>', 'Compile error in the parent’s template.'],
            ar: [`${pub('post')} و${pub('comments')} (inputs)`, '<code>[post]</code> و<code>[comments]</code> عند الأب', 'Compile error في تمبلت الأب.'] },
          { en: [`${pub('title')}, ${pub('bodyHtml')}, ${pub('videoId')}, ${pub('text')}, …`, 'the template, <b>and the API</b>', 'The template gives a compile error. If the API still sends the old key, nothing fails: the field is just empty.'],
            ar: [`${pub('title')} و${pub('bodyHtml')} و${pub('videoId')} و${pub('text')} و…`, 'التمبلت، <b>والـ API</b>', 'التمبلت هيدّي compile error. ولو الـ API لسه بيبعت المفتاح القديم، مفيش حاجة هتفشل: الحقل هيبقى فاضي وخلاص.'] },
          { en: [`${pub('XSRF-TOKEN')}, ${pub('X-XSRF-TOKEN')}`, '<b>the server</b>', 'No Angular error. The header is not sent or not recognised, and the server rejects the request (typically 403).'],
            ar: [`${pub('XSRF-TOKEN')} و${pub('X-XSRF-TOKEN')}`, '<b>السيرفر</b>', 'مفيش error من أنجولار. الـ header مش هيتبعت أو مش هيتعرف عليه، والسيرفر هيرفض الطلب (غالبًا 403).'] },
          { en: [`${mine('sanitizer')}, ${mine('id')}, ${mine('url')}, ${mine('c')}`, 'only inside that file or block', 'Compile error in the same file.'],
            ar: [`${mine('sanitizer')} و${mine('id')} و${mine('url')} و${mine('c')}`, 'جوه الملف أو البلوك ده بس', 'Compile error في نفس الملف.'] },
          { en: [`${ng('innerHTML')}, ${ng('href')}, ${ng('src')}, ${ng('bypassSecurityTrustResourceUrl')}, ${ng('transform')}`, 'nothing: not yours', 'The browser’s and Angular’s words.'],
            ar: [`${ng('innerHTML')} و${ng('href')} و${ng('src')} و${ng('bypassSecurityTrustResourceUrl')} و${ng('transform')}`, 'ولا حاجة: مش بتوعك', 'كلمات المتصفح وأنجولار.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b>. The pipe name, the class, the data keys and the XSRF names all change, and <code>bypassSecurityTrustResourceUrl</code> stays exactly where it was. The risky line is still the risky line.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b>. اسم الـ pipe، والكلاس، ومفاتيح الداتا، وأسماء الـ XSRF كلهم هيتغيروا، و<code>bypassSecurityTrustResourceUrl</code> هتفضل مكانها بالظبط. السطر الخطير لسه هو السطر الخطير.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتوعك' },
    title: { en: 'The fixed names, and why you can grep for them', ar: 'الأسماء الثابتة، وليه تقدر تدوّر عليها بـ grep' },
    lead: {
      en: 'Two families of fixed names matter here: Angular’s sanitizer API, and the browser’s own DOM properties. The same word, <code>innerHTML</code>, is safe in a template binding and unprotected in TypeScript.',
      ar: 'فيه عيلتين أسماء ثابتة مهمين هنا: الـ API بتاع الـ sanitizer من أنجولار، والـ properties بتاعة الـ DOM من المتصفح. نفس الكلمة، <code>innerHTML</code>، آمنة في ربط التمبلت، ومن غير حماية في الـ TypeScript.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Name', 'Whose', 'What it does'], ar: ['الاسم', 'بتاع مين', 'بيعمل إيه'] },
        rows: [
          { en: [ng('sanitize'), 'Angular', 'Filters a value for one <code>SecurityContext</code>. Safe.'],
            ar: [ng('sanitize'), 'أنجولار', 'بيفلتر القيمة لـ <code>SecurityContext</code> معيّن. آمن.'] },
          { en: [`${ng('bypassSecurityTrustHtml')}, ${ng('bypassSecurityTrustResourceUrl')}, …Url, …Style, …Script`, 'Angular', 'Marks a value as trusted so Angular skips checking it. <b>You</b> are now the filter.'],
            ar: [`${ng('bypassSecurityTrustHtml')} و${ng('bypassSecurityTrustResourceUrl')} و…Url و…Style و…Script`, 'أنجولار', 'بيعلّم القيمة إنها موثوقة فأنجولار مابيشيّكش عليها. <b>انت</b> بقيت الفلتر.'] },
          { en: [`<code>SafeHtml</code>, ${ng('SafeResourceUrl')}`, 'Angular types', 'What the bypass methods return. The word “Safe” describes the type, not the content.'],
            ar: [`<code>SafeHtml</code> و${ng('SafeResourceUrl')}`, 'types من أنجولار', 'اللي ميثودز الـ bypass بترجّعه. كلمة «Safe» بتوصف الـ type، مش المحتوى.'] },
          { en: [`${ng('innerHTML')}, ${ng('href')}, ${ng('src')}`, 'the browser', 'DOM properties. In <code>[ ]</code> Angular guards them; in TypeScript nobody does.'],
            ar: [`${ng('innerHTML')} و${ng('href')} و${ng('src')}`, 'المتصفح', 'properties في الـ DOM. جوه <code>[ ]</code> أنجولار بيحرسهم؛ في الـ TypeScript محدش بيحرسهم.'] },
          { en: [`${ng('nativeElement')}, <code>document.write</code>, <code>eval</code>`, 'Angular / the browser', 'Doors that bypass Angular entirely.'],
            ar: [`${ng('nativeElement')} و<code>document.write</code> و<code>eval</code>`, 'أنجولار / المتصفح', 'أبواب بتعدّي أنجولار خالص.'] },
        ] },
      { t: 'code', name: 'danger-zone.ts', lang: 'ts', tag: { en: 'the same word, two meanings', ar: 'نفس الكلمة، معنيين' }, code: [
        "import { ElementRef, SecurityContext, inject } from '@angular/core';",
        "import { DomSanitizer } from '@angular/platform-browser';",
        '',
        'export class RawBox {',
        '  private readonly host = inject(ElementRef);',
        '  private readonly sanitizer = inject(DomSanitizer);',
        '',
        "  // ✗ the browser's innerHTML: no sanitizer runs here",
        '  showRaw(html: string) {',
        '    this.host.nativeElement.innerHTML = html;',
        '  }',
        '',
        '  // ✓ the same job, filtered first',
        '  showClean(html: string) {',
        '    this.host.nativeElement.innerHTML =',
        "      this.sanitizer.sanitize(SecurityContext.HTML, html) ?? '';",
        '  }',
        '}' ] },
      { t: 'note', label: { en: 'Grep for these', ar: 'دوّر على دول' },
        en: '<code>bypassSecurityTrust</code>, <code>innerHTML</code>, <code>nativeElement</code>, <code>document.write</code>, <code>eval(</code>. Because they are fixed names, one search finds every line where safety depends on you.',
        ar: '<code>bypassSecurityTrust</code> و<code>innerHTML</code> و<code>nativeElement</code> و<code>document.write</code> و<code>eval(</code>. وعشان هما أسماء ثابتة، بحث واحد بيلاقي كل سطر الأمان فيه معتمد عليك.' }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'Names cannot make code safe, but they can make it honest. These habits make the risky parts easy to spot in a review.',
      ar: 'الأسماء مش هتخلي الكود آمن، بس ممكن تخليه صريح. العادات دي بتخلي الأجزاء الخطيرة سهل تتشاف وانت بتراجع الكود.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['a pipe or function that bypasses', 'a name that says what it trusts: <code>youtubeEmbed</code>, <code>trustedEmbedUrl</code>', '<code>safeHtml</code>, <code>clean</code>, <code>sanitized</code>', 'A reassuring name hides the one line a reviewer should stop at.'],
            ar: ['pipe أو function بتعمل bypass', 'اسم بيقول هو بيثق في إيه: <code>youtubeEmbed</code> و<code>trustedEmbedUrl</code>', '<code>safeHtml</code> و<code>clean</code> و<code>sanitized</code>', 'الاسم المطمّن بيخبّي السطر الوحيد اللي المراجع لازم يقف عنده.'] },
          { en: ['your classes', '<code>YoutubeEmbedPipe</code>, <code>UserComment</code>', '<code>SafeHtml</code>, <code>Comment</code>', 'Those names already exist: Angular’s type and a browser DOM type. Same spelling, different thing.'],
            ar: ['الكلاسات بتاعتك', '<code>YoutubeEmbedPipe</code> و<code>UserComment</code>', '<code>SafeHtml</code> و<code>Comment</code>', 'الأسماء دي موجودة أصلًا: type من أنجولار وtype من الـ DOM في المتصفح. نفس الكتابة، حاجة تانية.'] },
          { en: ['a field that holds HTML', '<code>bodyHtml</code>', '<code>body</code>, <code>content</code>', 'Tells the reader this string is markup and belongs in <code>[innerHTML]</code>, not <code>{{ }}</code>.'],
            ar: ['field شايل HTML', '<code>bodyHtml</code>', '<code>body</code> و<code>content</code>', 'بيقول للي بيقرا إن النص ده markup ومكانه <code>[innerHTML]</code>، مش <code>{{ }}</code>.'] },
          { en: ['an allowlist', '<code>ALLOWED_HOSTS</code>', '<code>list</code>, <code>urls</code>', 'Say that it is a list of what is <b>allowed</b>.'],
            ar: ['قايمة مسموحات', '<code>ALLOWED_HOSTS</code>', '<code>list</code> و<code>urls</code>', 'قول إنها قايمة باللي <b>مسموح</b>.'] },
          { en: ['the sanitizer field', '<code>sanitizer</code>', '—', 'Any name works. The class decides what it does.'],
            ar: ['الـ field بتاع الـ sanitizer', '<code>sanitizer</code>', '—', 'أي اسم ينفع. الكلاس هو اللي بيحدد بيعمل إيه.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Three places where the name is not free', ar: 'تلات أماكن الاسم فيهم مش براحتك' },
    lead: {
      en: 'Some names look like yours but something else reads them by exact spelling.',
      ar: 'فيه أسماء شكلها بتاعتك، بس فيه حاجة تانية بتقراها بالكتابة بالظبط.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'A pipe: <code>transform</code>, and the name string', ar: 'الـ pipe: <code>transform</code>، ونص الاسم' }, blocks: [
        { t: 'p',
          en: `Angular always calls a method named ${ng('transform')}; ${ng('PipeTransform')} makes TypeScript check you wrote it. The string in ${ng('name')}: is what templates type after <code>|</code>, so ${pub('youtubeEmbed')} is shared. The class name ${pub('YoutubeEmbedPipe')} is a second, separate name that only <code>imports</code> uses.`,
          ar: `أنجولار دايمًا بينادي ميثود اسمها ${ng('transform')}؛ و${ng('PipeTransform')} بتخلي TypeScript يتأكد إنك كتبتها. والنص اللي في ${ng('name')}: هو اللي التمبلتس بتكتبه بعد <code>|</code>، فـ${pub('youtubeEmbed')} متشارك. واسم الكلاس ${pub('YoutubeEmbedPipe')} اسم تاني منفصل، الـ <code>imports</code> بس اللي بيستخدمه.` }
      ]},
      { t: 'step', n: 'B', title: { en: 'The XSRF cookie and header', ar: 'الكوكي والـ header بتوع الـ XSRF' }, blocks: [
        { t: 'p',
          en: `Angular reads a cookie called ${pub('XSRF-TOKEN')} and copies it into a header called ${pub('X-XSRF-TOKEN')}. Those are defaults, not laws: if your backend uses other names, put its names here. The rule is only that both sides agree. Angular adds the header only to requests that change data (POST, PUT, DELETE…) going to your own site.`,
          ar: `أنجولار بيقرا كوكي اسمها ${pub('XSRF-TOKEN')} وبينسخها في header اسمه ${pub('X-XSRF-TOKEN')}. دي قيم افتراضية، مش قوانين: لو الباك إند بتاعك بيستخدم أسماء تانية، حط أسماؤه هنا. القاعدة بس إن الناحيتين يتفقوا. وأنجولار بيضيف الـ header بس للطلبات اللي بتغيّر داتا (POST وPUT وDELETE…) ورايحة لموقعك انت.` }
      ]},
      { t: 'step', n: 'C', title: { en: 'A CSP nonce: <code>ngCspNonce</code>', ar: 'nonce للـ CSP: <code>ngCspNonce</code>' }, blocks: [
        { t: 'code', name: 'index.html', lang: 'html', tag: { en: 'served by your server', ar: 'السيرفر بتاعك بيبعته' }, code: [
          '<!-- the server writes a fresh random value here on every request -->',
          '<app-root ngCspNonce="r4nd0m-per-request"></app-root>' ] },
        { t: 'p',
          en: `If your Content-Security-Policy header only allows inline styles with a nonce, Angular needs to know that nonce. It looks for the attribute ${ng('ngCspNonce')} on the root element, spelled exactly like that. (There is also a <code>CSP_NONCE</code> token for doing it from code.) The value must match the one in the header.`,
          ar: `لو الـ header بتاع Content-Security-Policy بيسمح بالـ styles اللي جوه الصفحة بس لو معاها nonce، أنجولار محتاج يعرف الـ nonce ده. بيدوّر على الـ attribute ${ng('ngCspNonce')} على الـ element الرئيسي، مكتوب كده بالظبط. (وفيه كمان token اسمه <code>CSP_NONCE</code> لو عايز تعملها من الكود.) والقيمة لازم تطابق اللي في الـ header.` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: 'Older syntax, same names', ar: 'كتابة أقدم، نفس الأسماء' },
    lead: {
      en: 'In older projects the XSRF setup lives in an NgModule and the sanitizer arrives through the constructor. The keys and the methods are the same words.',
      ar: 'في المشاريع الأقدم، إعداد الـ XSRF بيبقى في NgModule والـ sanitizer بييجي من الـ constructor. المفاتيح والميثودز هي هي نفس الكلمات.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'app.module.ts — older style', lang: 'ts', code: [
          '@NgModule({',
          '  imports: [',
          '    HttpClientXsrfModule.withOptions({',
          "      cookieName: 'XSRF-TOKEN',",
          "      headerName: 'X-XSRF-TOKEN',",
          '    }),',
          '  ],',
          '})' ] },
        good: { name: 'app.config.ts — today', lang: 'ts', code: [
          'providers: [',
          '  provideHttpClient(',
          '    withXsrfConfiguration({',
          "      cookieName: 'XSRF-TOKEN',",
          "      headerName: 'X-XSRF-TOKEN',",
          '    }),',
          '  ),',
          ']' ] } },
      { t: 'pair',
        bad:  { name: 'youtube-embed-pipe.ts — older style', lang: 'ts', code: [
          'constructor(private sanitizer: DomSanitizer) {}' ] },
        good: { name: 'youtube-embed-pipe.ts — today', lang: 'ts', code: [
          'private readonly sanitizer = inject(DomSanitizer);' ] } },
      { t: 'p',
        en: `Either way, ${mine('sanitizer')} is your name and ${ng('DomSanitizer')} is Angular’s. Older pipes also needed <code>standalone: true</code> inside <code>@Pipe</code>; today that is the default.`,
        ar: `في الحالتين، ${mine('sanitizer')} اسمك و${ng('DomSanitizer')} بتاع أنجولار. والـ pipes القديمة كانت محتاجة <code>standalone: true</code> جوه <code>@Pipe</code>؛ النهاردة ده الافتراضي.` }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'It looks fine', ar: 'شكلها تمام' },
    title: { en: 'Mistakes that fail silently or confusingly', ar: 'غلطات بتفشل في صمت أو بشكل ملخبط' },
    lead: {
      en: 'Security mistakes are the worst kind of silent: the page works perfectly, and the hole only shows up when someone uses it.',
      ar: 'غلطات الأمان أوحش نوع من الصمت: الصفحة شغالة تمام، والثغرة مابتبانش غير لما حد يستغلها.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'A plain string in an iframe', ar: 'نص عادي في iframe' }, blocks: [
        { t: 'pair',
          bad:  { name: 'post-view.html', lang: 'html', code: ['<iframe [src]="\'https://www.youtube.com/embed/\' + post().videoId" title="Video"></iframe>'] },
          good: { name: 'post-view.html', lang: 'html', code: ['<iframe [src]="post().videoId | youtubeEmbed" title="Video"></iframe>'] } },
        { t: 'p', en: 'This compiles, then fails at runtime with NG0904: “unsafe value used in a resource URL context”. Angular will not guess whether a page address is safe. Build it from a fixed prefix and vouch for that one value, as the pipe does.',
                  ar: 'ده بيعدّي الـ compile، وبعدين بيفشل وقت التشغيل بـ NG0904: «unsafe value used in a resource URL context». أنجولار مش هيخمّن عنوان الصفحة آمن ولا لأ. ابنيه من بداية ثابتة واضمن القيمة دي بس، زي ما الـ pipe بتعمل.' }
      ]},
      { t: 'step', n: '2', title: { en: 'A pipe whose name promises safety', ar: 'pipe اسمها بيوعد بالأمان' }, blocks: [
        { t: 'pair',
          bad:  { name: 'safe-html-pipe.ts', lang: 'ts', code: [
            "@Pipe({ name: 'safeHtml' })",
            'export class SafeHtmlPipe implements PipeTransform {',
            '  private readonly sanitizer = inject(DomSanitizer);',
            '',
            '  transform(value: string) {',
            '    return this.sanitizer.bypassSecurityTrustHtml(value);',
            '  }',
            '}' ] },
          good: { name: 'post-view.html', lang: 'html', code: [
            '<!-- no pipe at all: the binding already sanitizes -->',
            '<article [innerHTML]="post().bodyHtml"></article>' ] } },
        { t: 'p', en: 'The name says <i>safe</i>; the method says <i>bypass</i>. Only the method counts: this pipe switches sanitizing off, and one stored comment with an <code>onerror</code> runs in every visitor’s browser. People usually write it to silence Angular’s dev-mode warning “sanitizing HTML stripped some content”. That warning means protection is working.',
                  ar: 'الاسم بيقول <i>safe</i>؛ والميثود بتقول <i>bypass</i>. الميثود بس هي اللي بتفرق: الـ pipe دي بتقفل التنضيف، وكومنت واحد متخزّن فيه <code>onerror</code> بيشتغل في متصفح كل زائر. الناس غالبًا بتكتبها عشان تسكّت تحذير أنجولار في الـ dev mode «sanitizing HTML stripped some content». والتحذير ده معناه إن الحماية شغالة.' }
      ]},
      { t: 'step', n: '3', title: { en: 'XSRF names that do not match the server', ar: 'أسماء XSRF مش مطابقة للسيرفر' }, blocks: [
        { t: 'pair',
          bad:  { name: 'app.config.ts', lang: 'ts', code: [
            '// the server sets a cookie called  csrftoken',
            "withXsrfConfiguration({ cookieName: 'XSRF-TOKEN', headerName: 'X-XSRF-TOKEN' })" ] },
          good: { name: 'app.config.ts', lang: 'ts', code: [
            '// the server sets  csrftoken  and checks  X-CSRFToken',
            "withXsrfConfiguration({ cookieName: 'csrftoken', headerName: 'X-CSRFToken' })" ] } },
        { t: 'p', en: 'Angular finds no cookie with the name it was given, so it sends no header. No Angular error; every POST comes back from the server as rejected. Copy both names from the backend’s configuration.',
                  ar: 'أنجولار مش بيلاقي كوكي بالاسم اللي اتقاله، فمش بيبعت header. مفيش error من أنجولار؛ وكل POST بيرجع من السيرفر مرفوض. انسخ الاسمين من إعدادات الباك إند.' }
      ]},
      { t: 'step', n: '4', title: { en: 'Checking an address with <code>includes</code>', ar: 'تشيّك على العنوان بـ <code>includes</code>' }, blocks: [
        { t: 'pair',
          bad:  { name: 'embeds.ts', lang: 'ts', code: [
            'embedFromUrl(url: string) {',
            "  if (!url.includes('youtube.com')) throw new Error('Not allowed');",
            '  return this.sanitizer.bypassSecurityTrustResourceUrl(url);',
            '}' ] },
          good: { name: 'embeds.ts', lang: 'ts', code: [
            "const ALLOWED_HOSTS = ['www.youtube.com', 'player.vimeo.com'];",
            '',
            'embedFromUrl(url: string) {',
            "  if (!ALLOWED_HOSTS.includes(new URL(url).hostname)) throw new Error('Not allowed');",
            '  return this.sanitizer.bypassSecurityTrustResourceUrl(url);',
            '}' ] } },
        { t: 'p', en: '<code>https://evil.example/?youtube.com</code> contains the text “youtube.com”. Parse the address with <code>URL</code> and compare the exact <code>hostname</code> against your list.',
                  ar: '<code>https://evil.example/?youtube.com</code> فيه كلمة «youtube.com». حلّل العنوان بـ <code>URL</code> وقارن الـ <code>hostname</code> بالظبط بالقايمة بتاعتك.' }
      ]},
      { t: 'step', n: '5', title: { en: 'A link that “does nothing”', ar: 'لينك «مابيعملش حاجة»' }, blocks: [
        { t: 'p', en: 'A comment’s <code>website</code> is <code>javascript:alert(1)</code>. The link renders, but its address becomes <code>unsafe:javascript:alert(1)</code> and Angular logs a “sanitizing unsafe URL value” warning in dev mode. That is not a bug to fix with a bypass. It is the protection doing its job.',
                  ar: 'الـ <code>website</code> بتاع كومنت قيمته <code>javascript:alert(1)</code>. اللينك بيظهر، بس العنوان بتاعه بيبقى <code>unsafe:javascript:alert(1)</code> وأنجولار بيكتب تحذير «sanitizing unsafe URL value» في الـ dev mode. ده مش bug تصلحه بـ bypass. دي الحماية بتعمل شغلها.' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'Before you ship', ar: 'قبل ما تنشر' },
    title: { en: 'Six questions, in this order', ar: 'ست أسئلة، بالترتيب ده' },
    lead: {
      en: 'Something renders wrong, or you are reviewing code that touches HTML. Ask these.',
      ar: 'فيه حاجة بتظهر غلط، أو بتراجع كود بيلمس HTML. اسأل دول.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Search for <code>bypassSecurityTrust</code>. For each hit: can any part of that value come from a user, a CMS or an API? If yes, it is a hole.',
                  ar: '<b>1.</b> دوّر على <code>bypassSecurityTrust</code>. لكل نتيجة: ممكن أي جزء من القيمة دي ييجي من يوزر أو CMS أو API؟ لو آه، يبقى دي ثغرة.' },
      { t: 'chk', en: '<b>2.</b> Search for <code>nativeElement</code>, <code>innerHTML</code> in <code>.ts</code> files, and <code>document.write</code>. Nothing sanitizes those lines.',
                  ar: '<b>2.</b> دوّر على <code>nativeElement</code>، و<code>innerHTML</code> في ملفات <code>.ts</code>، و<code>document.write</code>. محدش بينضّف السطور دي.' },
      { t: 'chk', en: '<b>3.</b> A “sanitizing … stripped some content” or “unsafe URL” warning? Angular is working. Fix the content, not the sanitizer.',
                  ar: '<b>3.</b> فيه تحذير «sanitizing … stripped some content» أو «unsafe URL»؟ أنجولار شغال. صلّح المحتوى، مش الـ sanitizer.' },
      { t: 'chk', en: '<b>4.</b> NG0904 on an iframe or script URL? Build the URL from a fixed prefix plus <code>encodeURIComponent</code>, and trust only that.',
                  ar: '<b>4.</b> NG0904 على URL بتاع iframe أو script؟ ابني الـ URL من بداية ثابتة و<code>encodeURIComponent</code>، واضمن ده بس.' },
      { t: 'chk', en: '<b>5.</b> POST requests rejected? Compare <code>cookieName</code> and <code>headerName</code> with what the server really sets and checks.',
                  ar: '<b>5.</b> طلبات الـ POST بتترفض؟ قارن <code>cookieName</code> و<code>headerName</code> باللي السيرفر فعلًا بيعمله وبيشيّك عليه.' },
      { t: 'chk', en: '<b>6.</b> Does any name you chose (<code>safe…</code>, <code>trusted…</code>, <code>clean…</code>) claim something the code does not do? Rename it to tell the truth.',
                  ar: '<b>6.</b> فيه اسم انت اخترته (<code>safe…</code> أو <code>trusted…</code> أو <code>clean…</code>) بيدّعي حاجة الكود مابيعملهاش؟ غيّره عشان يقول الحقيقة.' }
    ]
  }
  ]
};
