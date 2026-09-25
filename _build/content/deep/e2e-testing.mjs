/* ==================================================================
   E2E testing, name by name — the deep dive after the Playwright topic.
   One running example (a checkout page, its page object and one
   journey test) followed through the app and the test files.
   Model: content/deep/inputs-outputs.mjs.
   ================================================================== */

const N = (k, n) => `<b class="nm nm-${k}" data-nm="${n}">${n}</b>`;
const ng = n => N('ng', n), mine = n => N('mine', n), pub = n => N('pub', n);

export default {
  topic: 'e2e-testing',
  tab: 'E2E tests, name by name — The Angular Signal',
  title: { en: 'E2E tests, name by name', ar: 'تستات الـ E2E، اسم اسم' },
  say: {
    en: 'The page for when a Playwright test and your Angular app seem to speak different languages. One checkout journey followed through the config, the test, the page object and the app, every name coloured. The surprise: the names the test shares with the app are not TypeScript names at all, but <b>words on the screen</b> and URLs.',
    ar: 'الصفحة دي للي حاسس إن تست Playwright والتطبيق بتاعه بيتكلموا لغتين مختلفين. رحلة checkout واحدة ماشيين وراها في الإعدادات والتست والـ page object والتطبيق، وكل اسم ملوّن. المفاجأة: الأسماء اللي التست متشارك فيها مع التطبيق مش أسماء TypeScript خالص، دي <b>كلام على الشاشة</b> وURLs.'
  },
  lead: {
    en: 'The idea of an end-to-end test is simple: <b>open the real app in a real browser and use it the way a person would.</b> The confusing part is the names. The test cannot see your classes or variables, so it connects to the app through button labels, form labels, a test id, and URL paths, all written as strings. Meanwhile words like <code>page</code>, <code>button</code> and <code>heading</code> look like yours but are fixed. This page sorts them out.',
    ar: 'فكرة الـ end-to-end test بسيطة: <b>افتح التطبيق الحقيقي في متصفح حقيقي واستخدمه زي أي إنسان.</b> اللي بيلخبط هو الأسماء. التست مش شايف الكلاسات ولا المتغيرات بتاعتك، فهو بيتوصل بالتطبيق عن طريق كلام الزراير، واللابلز بتاعة الفورم، وtest id، ومسارات الـ URL، وكلهم مكتوبين كـ strings. وفي نفس الوقت كلمات زي <code>page</code> و<code>button</code> و<code>heading</code> شكلها بتاعتك وهي ثابتة. الصفحة دي بترتّبهم.'
  },

  names: {
    note: {
      en: 'Read the orange rows first. Almost all of them are <b>strings</b>: text the user sees, a <code>data-testid</code>, a URL. TypeScript never checks them against the app, and Playwright does not type-check your tests at all, so every one of them fails at run time, usually as a timeout.',
      ar: 'اقرا الصفوف البرتقاني الأول. تقريبًا كلهم <b>strings</b>: كلام اليوزر بيشوفه، و<code>data-testid</code>، وURL. TypeScript عمره ما بيشيّك عليهم قدام التطبيق، وPlaywright أصلًا مابيعملش type-check للتستات بتاعتك، فكل واحد فيهم بيفشل وقت التشغيل، وغالبًا كـ timeout.'
    },
    names: [
      /* --- shared: the app and the test both type them --- */
      { n:'Pay now', k:'pub', w:{ en:'The button’s visible text. The page object types it too.', ar:'الكلام اللي ظاهر على الزرار. والـ page object بيكتبه برضه.' } },
      { n:'Email', k:'pub', w:{ en:'A label in the app. <code>getByLabel</code> must match it.', ar:'لابل في التطبيق. <code>getByLabel</code> لازم يطابقه.' } },
      { n:'Card number', k:'pub', w:{ en:'A label in the app.', ar:'لابل في التطبيق.' } },
      { n:'Thank you', k:'pub', w:{ en:'The heading on the order page.', ar:'العنوان في صفحة الأوردر.' } },
      { n:'cart-total', k:'pub', w:{ en:'A <code>data-testid</code> you added on purpose. Template and test both type it.', ar:'<code>data-testid</code> انت حاطه بقصد. التمبلت والتست الاتنين بيكتبوه.' } },
      { n:'/api/cart', k:'pub', as:'/api/basket',
        w:{ en:'The URL the app fetches. <code>page.route</code> must match it, or the fake answer is never used.', ar:'الـ URL اللي التطبيق بيطلبه. <code>page.route</code> لازم يطابقه، وإلا الرد المزيف عمره ما هيتستخدم.' } },
      { n:'checkout', k:'pub', re:'(?<=\')checkout(?=\')|(?<=\'\\/)checkout(?=\')',
        w:{ en:'A URL path: the client route, and the page object’s <code>goto</code>.', ar:'مسار URL: الـ route بتاع التطبيق، و<code>goto</code> بتاع الـ page object.' } },
      { n:'orders', k:'pub', w:{ en:'A URL path: the route, the app’s <code>navigate</code>, and the test’s <code>toHaveURL</code>.', ar:'مسار URL: الـ route، و<code>navigate</code> في التطبيق، و<code>toHaveURL</code> في التست.' } },
      { n:'items', k:'pub', w:{ en:'A JSON key. The app reads it; the fake response must send it.', ar:'مفتاح في الـ JSON. التطبيق بيقراه؛ والرد المزيف لازم يبعته.' } },
      { n:'title', k:'pub', w:{ en:'A JSON key on each cart line.', ar:'مفتاح في الـ JSON في كل سطر في الكارت.' } },
      { n:'price', k:'pub', w:{ en:'A JSON key the app adds up.', ar:'مفتاح في الـ JSON التطبيق بيجمعه.' } },
      { n:'Checkout', k:'pub', re:'(?<![\\w$\'-])Checkout(?![\\w$\'-])', w:{ en:'The page’s class, used by the routes.', ar:'كلاس الصفحة، والـ routes بتستخدمه.' } },
      { n:'Confirmation', k:'pub', w:{ en:'The order page’s class, used by the routes.', ar:'كلاس صفحة الأوردر، والـ routes بتستخدمه.' } },
      { n:'CheckoutPage', k:'pub', w:{ en:'Your page object class. Specs import it by this name.', ar:'كلاس الـ page object بتاعك. الـ specs بتعمله import بالاسم ده.' } },
      { n:'open', k:'pub', w:{ en:'A page-object method the spec calls.', ar:'ميثود في الـ page object الـ spec بتناديها.' } },
      { n:'payWith', k:'pub', w:{ en:'A page-object method the spec calls.', ar:'ميثود في الـ page object الـ spec بتناديها.' } },
      { n:'expectThankYou', k:'pub', w:{ en:'A page-object method the spec calls.', ar:'ميثود في الـ page object الـ spec بتناديها.' } },

      /* --- yours, private to one file --- */
      { n:'checkoutPage', k:'mine', w:{ en:'The spec’s own variable.', ar:'المتغير بتاع الـ spec نفسه.' } },
      { n:'route', k:'mine', only:['checkout.spec.ts'], re:'(?<![\\w$.\'\\/-])route(?![\\w$-])',
        w:{ en:'Your name for the callback parameter. Playwright passes it by position.', ar:'اسمك للـ parameter بتاع الـ callback. Playwright بيبعته حسب مكانه.' } },
      { n:'page', k:'mine', only:['checkout-page.ts'], re:'(?<![\\w$\'-])page(?![\\w$\'-])',
        w:{ en:'In the page object this is <b>your</b> field and parameter. It reuses the word <code>page</code>, but you could call it anything.', ar:'في الـ page object ده الـ field والـ parameter <b>بتوعك</b>. واخدين كلمة <code>page</code>، بس تقدر تسمّيهم أي حاجة.' } },
      { n:'email', k:'mine', only:['checkout-page.ts', 'checkout.ts'], w:{ en:'A parameter.', ar:'parameter.' } },
      { n:'card', k:'mine', only:['checkout-page.ts', 'checkout.ts'], w:{ en:'A parameter.', ar:'parameter.' } },
      { n:'emailInput', k:'mine', w:{ en:'A template reference variable. Only this template sees it.', ar:'template reference variable. التمبلت ده بس اللي شايفه.' } },
      { n:'cardInput', k:'mine', w:{ en:'A template reference variable.', ar:'template reference variable.' } },
      { n:'placeOrder', k:'mine', w:{ en:'The component’s method. The test never types it.', ar:'ميثود الـ component. التست عمره ما بيكتبها.' } },
      { n:'router', k:'mine', re:'(?<![\\w$\\/-])router(?![\\w$\'-])', w:{ en:'The component’s field for the injected router.', ar:'الـ field بتاع الـ component للـ router اللي اتعمله inject.' } },
      { n:'cart', k:'mine', only:['checkout.ts'], re:'(?<![\\w$\\/-])cart(?![\\w$-])', w:{ en:'The component’s resource.', ar:'الـ resource بتاع الـ component.' } },
      { n:'total', k:'mine', re:'(?<![\\w$.-])total(?=\\()|(?<=readonly )total', w:{ en:'The component’s computed signal.', ar:'الـ computed signal بتاعة الـ component.' } },
      { n:'sum', k:'mine', w:{ en:'A <code>reduce</code> parameter.', ar:'parameter في <code>reduce</code>.' } },
      { n:'line', k:'mine', w:{ en:'A <code>reduce</code> parameter.', ar:'parameter في <code>reduce</code>.' } },
      { n:'CartLine', k:'mine', w:{ en:'A type local to the component file.', ar:'type محلي في ملف الـ component.' } },
      { n:'app-checkout', k:'mine', w:{ en:'The selector of a routed page. Nothing types it as a tag.', ar:'الـ selector بتاع صفحة جاية من الـ router. محدش بيكتبه كتاج.' } },

      /* --- Playwright's, the browser's, Angular's --- */
      { n:'test', k:'ng', only:['ts'], re:'(?<![\\w$.-])test(?=\\()', w:{ en:'Playwright’s function for one test. The sentence is yours.', ar:'الـ function بتاعة Playwright لتست واحد. الجملة بتاعتك.' } },
      { n:'expect', k:'ng', w:{ en:'Playwright’s assertion. It retries until it passes or times out.', ar:'الـ assertion بتاعة Playwright. بتفضل تحاول لحد ما تنجح أو الوقت يخلص.' } },
      { n:'page', k:'ng', not:['checkout-page.ts'], re:'(?<![\\w$.\'-])page(?![\\w$\'-])',
        w:{ en:'Playwright’s browser tab, handed to the test <b>by name</b> inside <code>({ page })</code>.', ar:'التاب بتاعة Playwright، بتتدّى للتست <b>بالاسم</b> جوه <code>({ page })</code>.' } },
      { n:'Page', k:'ng', w:{ en:'Playwright’s type for a tab.', ar:'الـ type بتاع Playwright للتاب.' } },
      { n:'page.route', k:'ng', w:{ en:'Playwright’s network interceptor.', ar:'الـ interceptor بتاع Playwright للشبكة.' } },
      { n:'fulfill', k:'ng', w:{ en:'Answers an intercepted request.', ar:'بترد على طلب اتمسك.' } },
      { n:'json', k:'ng', re:'(?<![\\w$.-])json(?=:)', w:{ en:'An option key of <code>fulfill</code>.', ar:'مفتاح إعداد في <code>fulfill</code>.' } },
      { n:'goto', k:'ng', w:{ en:'Opens a URL in the tab.', ar:'بتفتح URL في التاب.' } },
      { n:'getByRole', k:'ng', w:{ en:'Finds an element by its role and accessible name.', ar:'بتلاقي الـ element بالـ role والاسم بتوعه.' } },
      { n:'getByLabel', k:'ng', w:{ en:'Finds a form field by its label text.', ar:'بتلاقي خانة الفورم باللابل بتاعها.' } },
      { n:'getByTestId', k:'ng', w:{ en:'Finds an element by its <code>data-testid</code>.', ar:'بتلاقي الـ element بالـ <code>data-testid</code> بتاعه.' } },
      { n:'data-testid', k:'ng', w:{ en:'The attribute <code>getByTestId</code> reads by default.', ar:'الـ attribute اللي <code>getByTestId</code> بيقراه افتراضيًا.' } },
      { n:'name', k:'ng', re:'(?<=\\{ )name(?=:)', w:{ en:'An option key: the accessible name. The text after it is the app’s.', ar:'مفتاح إعداد: الاسم اللي بيوصف الـ element. والنص اللي بعده بتاع التطبيق.' } },
      { n:'exact', k:'ng', w:{ en:'An option key: match the whole name, not part of it.', ar:'مفتاح إعداد: طابق الاسم كله، مش جزء منه.' } },
      { n:'button', k:'ng', only:['ts'], w:{ en:'An ARIA role, fixed by the browser.', ar:'role من ARIA، ثابت من المتصفح.' } },
      { n:'heading', k:'ng', only:['ts'], w:{ en:'An ARIA role: <code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code>.', ar:'role من ARIA: من <code>&lt;h1&gt;</code> لـ <code>&lt;h6&gt;</code>.' } },
      { n:'textbox', k:'ng', only:['ts'], w:{ en:'An ARIA role: a text input.', ar:'role من ARIA: خانة كتابة.' } },
      { n:'click', k:'ng', re:'(?<=\\.)click(?=\\()|(?<=\\()click(?=\\))', w:{ en:'A Playwright action, and the browser’s event.', ar:'action من Playwright، والـ event بتاع المتصفح.' } },
      { n:'fill', k:'ng', w:{ en:'Types into a field.', ar:'بتكتب في خانة.' } },
      { n:'toHaveText', k:'ng', w:{ en:'A Playwright matcher.', ar:'matcher من Playwright.' } },
      { n:'toBeVisible', k:'ng', w:{ en:'A Playwright matcher.', ar:'matcher من Playwright.' } },
      { n:'toHaveURL', k:'ng', w:{ en:'A Playwright matcher.', ar:'matcher من Playwright.' } },
      { n:'waitForTimeout', k:'ng', w:{ en:'A fixed sleep. It exists; do not use it.', ar:'sleep ثابت. موجود؛ بس ماتستخدموش.' } },
      { n:'textContent', k:'ng', w:{ en:'Reads the text once, with no retrying.', ar:'بتقرا النص مرة واحدة، من غير ما تعيد.' } },
      { n:'toBe', k:'ng', w:{ en:'A plain matcher: it does not retry.', ar:'matcher عادي: مابيعيدش.' } },
      { n:'defineConfig', k:'ng', w:{ en:'Playwright’s config helper.', ar:'الـ helper بتاع Playwright للإعدادات.' } },
      { n:'testDir', k:'ng', w:{ en:'A config key: where the test files are.', ar:'مفتاح إعداد: ملفات التستات فين.' } },
      { n:'use', k:'ng', re:'(?<![\\w$.-])use(?=:)', w:{ en:'A config key.', ar:'مفتاح إعداد.' } },
      { n:'baseURL', k:'ng', w:{ en:'A config key: what <code>goto(\'/…\')</code> is relative to.', ar:'مفتاح إعداد: <code>goto(\'/…\')</code> بيتحسب بالنسبة لإيه.' } },
      { n:'webServer', k:'ng', w:{ en:'A config key: how to start your app.', ar:'مفتاح إعداد: إزاي يشغّل التطبيق.' } },
      { n:'command', k:'ng', w:{ en:'A config key.', ar:'مفتاح إعداد.' } },
      { n:'url', k:'ng', only:['playwright.config.ts'], re:'(?<![\\w$.-])url(?=:)', w:{ en:'A config key: wait until this address answers.', ar:'مفتاح إعداد: استنى لحد ما العنوان ده يرد.' } },
      { n:'reuseExistingServer', k:'ng', w:{ en:'A config key.', ar:'مفتاح إعداد.' } },
      { n:'Routes', k:'ng', w:{ en:'Angular’s type for a route list.', ar:'النوع بتاع أنجولار لليستة routes.' } },
      { n:'path', k:'ng', re:'(?<![\\w$-])path(?=:)', w:{ en:'A route key.', ar:'مفتاح route.' } },
      { n:'component', k:'ng', re:'(?<![\\w$-])component(?=:)', w:{ en:'A route key.', ar:'مفتاح route.' } },
      { n:'@Component', k:'ng', w:{ en:'Angular’s decorator.', ar:'الـ decorator بتاع أنجولار.' } },
      { n:'selector', k:'ng', w:{ en:'An option key.', ar:'مفتاح إعداد.' } },
      { n:'templateUrl', k:'ng', w:{ en:'An option key.', ar:'مفتاح إعداد.' } },
      { n:'inject', k:'ng', w:{ en:'Angular’s function that hands you a service.', ar:'الـ function بتاعة أنجولار اللي بتديك service.' } },
      { n:'Router', k:'ng', w:{ en:'Angular’s router service.', ar:'الـ service بتاعة الـ router من أنجولار.' } },
      { n:'navigate', k:'ng', w:{ en:'A router method.', ar:'ميثود في الـ router.' } },
      { n:'httpResource', k:'ng', w:{ en:'Angular’s signal-based request.', ar:'طلب أنجولار المبني على الـ signals.' } },
      { n:'computed', k:'ng', w:{ en:'Angular’s derived signal.', ar:'الـ signal المشتقة بتاعة أنجولار.' } },
      { n:'value', k:'ng', re:'(?<=\\.)value(?![\\w$-])', w:{ en:'A resource’s value, or an input element’s value.', ar:'قيمة الـ resource، أو قيمة خانة الـ input.' } },
      { n:'browser', k:'ng', only:['checkout.spec.ts — Protractor'], w:{ en:'Protractor’s browser object.', ar:'أوبجكت المتصفح بتاع Protractor.' } },
      { n:'element', k:'ng', only:['checkout.spec.ts — Protractor'], w:{ en:'Protractor’s element finder.', ar:'اللي بيدوّر على الـ elements في Protractor.' } },
      { n:'by', k:'ng', only:['checkout.spec.ts — Protractor'], w:{ en:'Protractor’s locator helpers.', ar:'الـ helpers بتاعة Protractor للـ locators.' } },
      { n:'buttonText', k:'ng', w:{ en:'A Protractor locator: a button by its text.', ar:'locator من Protractor: زرار بالكلام اللي عليه.' } },
      { n:'getText', k:'ng', w:{ en:'A Protractor method.', ar:'ميثود من Protractor.' } },
      { n:'toEqual', k:'ng', w:{ en:'A plain matcher.', ar:'matcher عادي.' } },
    ]
  },

  sections: [

  /* ------------------------------------------------------------ 1 */
  {
    id: 'trip',
    kicker: { en: 'Start here', ar: 'ابدأ من هنا' },
    title: { en: 'One journey, six stops', ar: 'رحلة واحدة، ست محطات' },
    lead: {
      en: 'A visitor opens the checkout page, sees the total, fills in the form, clicks <b>Pay now</b> and lands on the order page. The test does exactly that, in a real browser. Follow it:',
      ar: 'زائر بيفتح صفحة الـ checkout، بيشوف الإجمالي، بيملا الفورم، بيدوس <b>Pay now</b> وبيوصل لصفحة الأوردر. التست بيعمل ده بالظبط، في متصفح حقيقي. امشي وراه:'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'chain', items: [
        { file: 'playwright.config.ts', lang: 'ts', who: { en: 'config · starts the app', ar: 'الإعدادات · بتشغّل التطبيق' },
          code: ["use: { baseURL: 'http://localhost:4200' },", "webServer: { command: 'npm run start', url: 'http://localhost:4200' },"],
          say: { en: `Every key here is Playwright’s: ${ng('webServer')} starts your Angular app, ${ng('baseURL')} lets tests write <code>'/checkout'</code> instead of the full address. The values are about your machine.`,
                 ar: `كل مفتاح هنا بتاع Playwright: ${ng('webServer')} بيشغّل تطبيق الأنجولار بتاعك، و${ng('baseURL')} بيخلي التستات تكتب <code>'/checkout'</code> بدل العنوان كله. والقيم بتاعة جهازك.` } },
        { file: 'checkout.spec.ts', lang: 'ts', who: { en: 'test · gets a tab', ar: 'التست · بياخد تاب' },
          code: ["test('a visitor can pay for their cart', async ({ page }) => {"],
          say: { en: `${ng('page')} is not a name you chose. Playwright reads the names inside <code>({ })</code> and hands over the fixture with that name. The sentence in quotes is yours.`,
                 ar: `${ng('page')} مش اسم انت اخترته. Playwright بيقرا الأسماء اللي جوه <code>({ })</code> وبيسلّمك الـ fixture اللي بالاسم ده. والجملة اللي بين علامات التنصيص بتاعتك.` } },
        { file: 'checkout.spec.ts', lang: 'ts', who: { en: 'test · fakes the network', ar: 'التست · بيزيّف الشبكة' },
          code: ["await page.route('**/api/cart', route =>", "  route.fulfill({ json: { items: [{ title: 'Mouse', price: 100 }] } }));"],
          say: { en: `${pub('/api/cart')} must match the URL the app really fetches, and ${pub('items')}, ${pub('title')}, ${pub('price')} must be the keys the app reads. ${mine('route')} is your parameter name.`,
                 ar: `${pub('/api/cart')} لازم يطابق الـ URL اللي التطبيق فعلًا بيطلبه، و${pub('items')} و${pub('title')} و${pub('price')} لازم يبقوا المفاتيح اللي التطبيق بيقراها. و${mine('route')} اسم الـ parameter بتاعك.` } },
        { file: 'checkout-page.ts', lang: 'ts', who: { en: 'page object · opens the page', ar: 'الـ page object · بيفتح الصفحة' },
          code: ["await this.page.goto('/checkout');"],
          say: { en: `${pub('checkout')} is the route path from <code>app.routes.ts</code>. Here ${mine('page')} is your own field in the page object; it just reuses Playwright’s word.`,
                 ar: `${pub('checkout')} هو مسار الـ route من <code>app.routes.ts</code>. وهنا ${mine('page')} ده الـ field بتاعك في الـ page object؛ واخد كلمة Playwright وخلاص.` } },
        { file: 'checkout-page.ts', lang: 'ts', who: { en: 'page object · acts like a user', ar: 'الـ page object · بيتصرف زي اليوزر' },
          code: ["await this.page.getByLabel('Email').fill(email);", "await this.page.getByRole('button', { name: 'Pay now' }).click();"],
          say: { en: `${pub('Email')} and ${pub('Pay now')} are copied from the <b>screen</b>: the label and the button text in <code>checkout.html</code>. ${ng('button')} is a fixed ARIA role, not a tag name you picked.`,
                 ar: `${pub('Email')} و${pub('Pay now')} منسوخين من <b>الشاشة</b>: اللابل وكلام الزرار في <code>checkout.html</code>. و${ng('button')} role ثابت من ARIA، مش اسم تاج انت اخترته.` } },
        { file: 'checkout.spec.ts', lang: 'ts', who: { en: 'test · checks', ar: 'التست · بيتأكد' },
          code: ['await checkoutPage.expectThankYou();', 'await expect(page).toHaveURL(/\\/orders\\/\\d+$/);'],
          say: { en: `${pub('expectThankYou')} is your page-object method. ${pub('orders')} is another route path, copied into a regular expression. ${ng('toHaveURL')} keeps retrying until it matches or times out.`,
                 ar: `${pub('expectThankYou')} ميثود في الـ page object بتاعك. و${pub('orders')} مسار route تاني، منسوخ جوه regular expression. و${ng('toHaveURL')} بتفضل تحاول لحد ما يطابق أو الوقت يخلص.` } },
      ]},
      { t: 'note', label: { en: 'The whole thing in one line', ar: 'الحكاية كلها في سطر' },
        en: 'An E2E test shares <b>no</b> TypeScript names with your Angular code. It shares what a user can see or type: labels, button text, a test id, URL paths, and the JSON shape of the API. Every one of those is a string.',
        ar: 'تست الـ E2E <b>مش</b> متشارك في ولا اسم TypeScript مع كود الأنجولار بتاعك. هو متشارك في اللي اليوزر يقدر يشوفه أو يكتبه: اللابلز، وكلام الزراير، وtest id، ومسارات الـ URL، وشكل الـ JSON بتاع الـ API. وكل واحد فيهم string.' }
    ]
  },

  /* ------------------------------------------------------------ 2 */
  {
    id: 'who',
    kicker: { en: 'App or test?', ar: 'التطبيق ولا التست؟' },
    title: { en: 'Who writes what, and who picks the name', ar: 'مين بيكتب إيه، ومين بيختار الاسم' },
    lead: {
      en: 'Two sides, two languages. The app side is Angular; the test side is Playwright. The shared words are the ones that appear on screen or in the address bar.',
      ar: 'ناحيتين، ولغتين. ناحية التطبيق أنجولار؛ وناحية التست Playwright. والكلمات المتشاركة هي اللي بتظهر على الشاشة أو في شريط العنوان.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Piece', 'Lives in', 'Written by', 'Who picks the name'],
                ar: ['الحتة', 'مكانها', 'مين بيكتبها', 'مين بيختار الاسم'] },
        rows: [
          { en: ['<code>&lt;button&gt;Pay now&lt;/button&gt;</code>', '<code>checkout.html</code> (app)', 'you, as app developer', `you pick ${pub('Pay now')}; the test copies it`],
            ar: ['<code>&lt;button&gt;Pay now&lt;/button&gt;</code>', '<code>checkout.html</code> (التطبيق)', 'انت، كمطوّر التطبيق', `انت بتختار ${pub('Pay now')}؛ والتست بينسخه`] },
          { en: ['<code>data-testid="cart-total"</code>', '<code>checkout.html</code> (app)', 'you, for the test', `${ng('data-testid')} is Playwright’s default attribute; you pick ${pub('cart-total')}`],
            ar: ['<code>data-testid="cart-total"</code>', '<code>checkout.html</code> (التطبيق)', 'انت، عشان التست', `${ng('data-testid')} الـ attribute الافتراضي بتاع Playwright؛ وانت بتختار ${pub('cart-total')}`] },
          { en: ["<code>path: 'checkout'</code>", '<code>app.routes.ts</code> (app)', 'you', `you pick ${pub('checkout')}; <code>goto</code> copies it`],
            ar: ["<code>path: 'checkout'</code>", '<code>app.routes.ts</code> (التطبيق)', 'انت', `انت بتختار ${pub('checkout')}؛ و<code>goto</code> بينسخه`] },
          { en: ['<code>async ({ page }) =&gt;</code>', '<code>checkout.spec.ts</code> (test)', 'you', `Playwright picks ${ng('page')}`],
            ar: ['<code>async ({ page }) =&gt;</code>', '<code>checkout.spec.ts</code> (التست)', 'انت', `Playwright بيختار ${ng('page')}`] },
          { en: ["<code>getByRole('button', { name: … })</code>", 'page object (test)', 'you', `ARIA picks ${ng('button')}; Playwright picks ${ng('name')}; the app picks the text`],
            ar: ["<code>getByRole('button', { name: … })</code>", 'الـ page object (التست)', 'انت', `ARIA بيختار ${ng('button')}؛ وPlaywright بيختار ${ng('name')}؛ والتطبيق بيختار النص`] },
          { en: ['<code>class CheckoutPage { payWith() … }</code>', '<code>checkout-page.ts</code> (test)', 'you', `you pick ${pub('CheckoutPage')} and ${pub('payWith')}; specs copy them`],
            ar: ['<code>class CheckoutPage { payWith() … }</code>', '<code>checkout-page.ts</code> (التست)', 'انت', `انت بتختار ${pub('CheckoutPage')} و${pub('payWith')}؛ والـ specs بتنسخهم`] },
          { en: ['<code>placeOrder()</code>, <code>emailInput</code>', 'the component (app)', 'you', `yours, and the test never sees them`],
            ar: ['<code>placeOrder()</code> و<code>emailInput</code>', 'الـ component (التطبيق)', 'انت', 'بتوعك، والتست عمره ما بيشوفهم'] },
        ] },
      { t: 'ul',
        en: ['<b>The test cannot see your code.</b> Method names, signals, template variables: rename them all and the E2E test does not notice.',
             '<b>The test can see your screen.</b> Change a button’s text, a label, a route path or a test id, and the test breaks, even though no TypeScript changed.',
             '<b>A word that looks like yours may be Playwright’s.</b> <code>page</code> in <code>({ page })</code>, the role names, and the option keys are fixed.'],
        ar: ['<b>التست مش شايف الكود بتاعك.</b> أسماء الميثودز، والـ signals، ومتغيرات التمبلت: غيّرهم كلهم وتست الـ E2E مش هياخد باله.',
             '<b>التست شايف الشاشة بتاعتك.</b> غيّر كلام زرار، أو لابل، أو مسار route، أو test id، والتست هيقع، مع إن ولا سطر TypeScript اتغير.',
             '<b>كلمة شكلها بتاعتك ممكن تبقى بتاعة Playwright.</b> <code>page</code> اللي في <code>({ page })</code>، وأسماء الـ roles، ومفاتيح الإعدادات، كلهم ثابتين.'] }
    ]
  },

  /* ------------------------------------------------------------ 3 */
  {
    id: 'files',
    kicker: { en: 'The real files', ar: 'الملفات الحقيقية' },
    title: { en: 'Seven files, every name coloured', ar: 'سبع ملفات، وكل اسم ملوّن' },
    lead: {
      en: 'Four app files and three test files. Hover an orange string in the test to see where the app has it. Then press <b>Rename test</b>: the labels, paths and test id change on both sides, and the journey still works.',
      ar: 'أربع ملفات للتطبيق وتلات ملفات للتست. قف بالماوس على string برتقاني في التست وشوف التطبيق حاطه فين. وبعدين دوس <b>جرّب تغيّر الأسماء</b>: اللابلز والمسارات والـ test id بيتغيروا في الناحيتين، والرحلة لسه شغالة.'
    },
    blocks: [
      { t: 'nmbar' },
      { t: 'code', name: 'app.routes.ts', lang: 'ts', tag: { en: 'app', ar: 'التطبيق' }, code: [
        "import { Routes } from '@angular/router';",
        "import { Checkout } from './checkout';",
        "import { Confirmation } from './confirmation';",
        '',
        'export const routes: Routes = [',
        "  { path: 'checkout', component: Checkout },",
        "  { path: 'orders/:id', component: Confirmation },",
        '];' ] },
      { t: 'code', name: 'checkout.ts', lang: 'ts', tag: { en: 'app', ar: 'التطبيق' }, code: [
        "import { Component, computed, inject } from '@angular/core';",
        "import { httpResource } from '@angular/common/http';",
        "import { Router } from '@angular/router';",
        '',
        'interface CartLine {',
        '  title: string;',
        '  price: number;',
        '}',
        '',
        '@Component({',
        "  selector: 'app-checkout',",
        "  templateUrl: './checkout.html',",
        '})',
        'export class Checkout {',
        '  private readonly router = inject(Router);',
        "  protected readonly cart = httpResource<{ items: CartLine[] }>(() => '/api/cart');",
        '  protected readonly total = computed(() =>',
        '    (this.cart.value()?.items ?? []).reduce((sum, line) => sum + line.price, 0));',
        '',
        '  placeOrder(email: string, card: string) {',
        '    // … send email and card to the server, then:',
        "    this.router.navigate(['/orders', 1042]);",
        '  }',
        '}' ] },
      { t: 'code', name: 'checkout.html', lang: 'html', tag: { en: 'app: what the user sees', ar: 'التطبيق: اللي اليوزر بيشوفه' }, code: [
        '<p data-testid="cart-total">{{ total() }} EGP</p>',
        '',
        '<label>Email <input #emailInput type="email" /></label>',
        '<label>Card number <input #cardInput /></label>',
        '',
        '<button (click)="placeOrder(emailInput.value, cardInput.value)">Pay now</button>' ] },
      { t: 'code', name: 'confirmation.html', lang: 'html', tag: { en: 'app: the Confirmation page', ar: 'التطبيق: صفحة Confirmation' }, code: [
        '<h1>Thank you</h1>' ] },
      { t: 'code', name: 'playwright.config.ts', lang: 'ts', tag: { en: 'test setup', ar: 'تجهيز التست' }, code: [
        "import { defineConfig } from '@playwright/test';",
        '',
        'export default defineConfig({',
        "  testDir: './e2e',",
        "  use: { baseURL: 'http://localhost:4200' },",
        '  webServer: {',
        "    command: 'npm run start',",
        "    url: 'http://localhost:4200',",
        '    reuseExistingServer: !process.env.CI,',
        '  },',
        '});' ] },
      { t: 'code', name: 'checkout-page.ts', lang: 'ts', tag: { en: 'test: the page object', ar: 'التست: الـ page object' }, code: [
        "import { Page, expect } from '@playwright/test';",
        '',
        'export class CheckoutPage {',
        '  readonly page: Page;',
        '',
        '  constructor(page: Page) {',
        '    this.page = page;',
        '  }',
        '',
        '  async open() {',
        "    await this.page.goto('/checkout');",
        '  }',
        '',
        '  async payWith(email: string, card: string) {',
        "    await this.page.getByLabel('Email').fill(email);",
        "    await this.page.getByLabel('Card number').fill(card);",
        "    await this.page.getByRole('button', { name: 'Pay now' }).click();",
        '  }',
        '',
        '  async expectThankYou() {',
        "    await expect(this.page.getByRole('heading', { name: 'Thank you' })).toBeVisible();",
        '  }',
        '}' ] },
      { t: 'code', name: 'checkout.spec.ts', lang: 'ts', tag: { en: 'test: the journey', ar: 'التست: الرحلة' }, code: [
        "import { test, expect } from '@playwright/test';",
        "import { CheckoutPage } from './checkout-page';",
        '',
        "test('a visitor can pay for their cart', async ({ page }) => {",
        "  await page.route('**/api/cart', route =>",
        "    route.fulfill({ json: { items: [{ title: 'Mouse', price: 100 }] } }));",
        '',
        '  const checkoutPage = new CheckoutPage(page);',
        '  await checkoutPage.open();',
        "  await expect(page.getByTestId('cart-total')).toHaveText('100 EGP');",
        '',
        "  await checkoutPage.payWith('mona@shop.eg', '4242424242424242');",
        '',
        '  await checkoutPage.expectThankYou();',
        '  await expect(page).toHaveURL(/\\/orders\\/\\d+$/);',
        '});' ] },
      { t: 'nmtable' }
    ]
  },

  /* ------------------------------------------------------------ 4 */
  {
    id: 'rename',
    kicker: { en: 'Is it OK to change it?', ar: 'ينفع أغيّره؟' },
    title: { en: 'What breaks when you rename each name', ar: 'إيه اللي بيبوظ لما تغيّر كل اسم' },
    lead: {
      en: 'Here almost nothing is a compile error. Playwright strips the types and runs your test without checking them, so a stale name shows up while the test runs, usually as a wait that ends in a timeout.',
      ar: 'هنا تقريبًا مفيش حاجة compile error. Playwright بيشيل الـ types ويشغّل التست من غير ما يشيّك عليها، فالاسم القديم بيظهر وقت التشغيل، وغالبًا كانتظار بيخلص بـ timeout.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['If you rename…', 'Also edit…', 'If you forget'],
                ar: ['لو غيّرت…', 'غيّر كمان…', 'لو نسيت'] },
        rows: [
          { en: [`${pub('Pay now')}, ${pub('Email')}, ${pub('Card number')}, ${pub('Thank you')} (text on screen)`, 'the page object', 'The test waits for an element that no longer exists, then fails with a timeout that names the locator.'],
            ar: [`${pub('Pay now')} و${pub('Email')} و${pub('Card number')} و${pub('Thank you')} (كلام على الشاشة)`, 'الـ page object', 'التست بيستنى element مبقاش موجود، وبعدين بيفشل بـ timeout وبيذكر الـ locator.'] },
          { en: [pub('cart-total') + ' (test id)', 'the <code>getByTestId</code> string', 'The assertion waits, then fails: no element found.'],
            ar: [pub('cart-total') + ' (test id)', 'النص في <code>getByTestId</code>', 'الـ assertion بيستنى، وبعدين بيفشل: مفيش element.'] },
          { en: [pub('/api/cart') + ' (the app’s URL)', 'the <code>page.route</code> pattern', '<b>Silent.</b> The fake never applies; the app calls the real backend. The test may pass or fail depending on real data.'],
            ar: [pub('/api/cart') + ' (الـ URL بتاع التطبيق)', 'الـ pattern في <code>page.route</code>', '<b>في صمت.</b> الرد المزيف عمره ما بيتطبّق؛ والتطبيق بيكلّم الباك إند الحقيقي. والتست ممكن ينجح أو يفشل حسب الداتا الحقيقية.'] },
          { en: [`${pub('items')}, ${pub('title')}, ${pub('price')} (JSON keys)`, 'the fake response', 'The app gets data it cannot read, the total shows <code>0</code>, and the check for <code>100 EGP</code> fails.'],
            ar: [`${pub('items')} و${pub('title')} و${pub('price')} (مفاتيح JSON)`, 'الرد المزيف', 'التطبيق بياخد داتا مش عارف يقراها، والإجمالي بيبان <code>0</code>، والتشييك على <code>100 EGP</code> بيفشل.'] },
          { en: [`${pub('checkout')}, ${pub('orders')} (route paths)`, '<code>goto</code>, <code>navigate</code>, and <code>toHaveURL</code>', 'The test opens a page the app does not have, or the URL check fails after waiting.'],
            ar: [`${pub('checkout')} و${pub('orders')} (مسارات routes)`, '<code>goto</code> و<code>navigate</code> و<code>toHaveURL</code>', 'التست بيفتح صفحة التطبيق معندوش، أو تشييك الـ URL بيفشل بعد الانتظار.'] },
          { en: [`${pub('CheckoutPage')}, ${pub('open')}, ${pub('payWith')}, ${pub('expectThankYou')}`, 'every spec that uses them', 'Your editor shows a red line. Playwright itself runs anyway and fails with “… is not a function”.'],
            ar: [`${pub('CheckoutPage')} و${pub('open')} و${pub('payWith')} و${pub('expectThankYou')}`, 'كل spec بيستخدمهم', 'الإديتور بيوريك خط أحمر. لكن Playwright نفسه بيشغّل عادي وبيفشل بـ «… is not a function».'] },
          { en: [`${mine('placeOrder')}, ${mine('emailInput')}, ${mine('cart')}, ${mine('total')}`, 'only inside the component', 'Angular gives a compile error if you miss one. The E2E test does not care.'],
            ar: [`${mine('placeOrder')} و${mine('emailInput')} و${mine('cart')} و${mine('total')}`, 'جوه الـ component بس', 'أنجولار بيدّي compile error لو نسيت واحد. وتست الـ E2E مش فارق معاه.'] },
          { en: [`${ng('page')} in <code>({ page })</code>, ${ng('button')}, ${ng('name')}`, 'nothing: not yours', 'Playwright’s and ARIA’s words.'],
            ar: [`${ng('page')} في <code>({ page })</code> و${ng('button')} و${ng('name')}`, 'ولا حاجة: مش بتوعك', 'كلمات Playwright وARIA.'] },
        ] },
      { t: 'note', label: { en: 'Try it', ar: 'جرّبها' },
        en: 'Press <b>Rename test</b>. The button text changes inside <code>checkout.html</code> and inside the page object’s string at the same moment. When a designer changes the copy in the app, that second change is the one nobody remembers.',
        ar: 'دوس <b>جرّب تغيّر الأسماء</b>. كلام الزرار بيتغير جوه <code>checkout.html</code> وجوه النص اللي في الـ page object في نفس اللحظة. ولما ديزاينر يغيّر الكلام في التطبيق، التغيير التاني ده هو اللي محدش بيفتكره.' }
    ]
  },

  /* ------------------------------------------------------------ 5 */
  {
    id: 'fixed',
    kicker: { en: 'Not yours', ar: 'مش بتوعك' },
    title: { en: 'The fixed names: Playwright, ARIA, the config', ar: 'الأسماء الثابتة: Playwright وARIA والإعدادات' },
    lead: {
      en: 'An E2E test has no Angular words in it at all. Its fixed words come from Playwright and from the accessibility roles the browser gives every element.',
      ar: 'تست الـ E2E مفيهوش ولا كلمة من أنجولار. الكلمات الثابتة فيه جاية من Playwright ومن الـ roles بتاعة الإتاحة اللي المتصفح بيدّيها لكل element.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Names', 'Whose', 'What to know'], ar: ['الأسماء', 'بتاعة مين', 'تعرف إيه'] },
        rows: [
          { en: [`${ng('test')}, ${ng('expect')}, ${ng('page')}`, 'Playwright', 'Imported from <code>@playwright/test</code>; <code>page</code> is a fixture handed over by name.'],
            ar: [`${ng('test')} و${ng('expect')} و${ng('page')}`, 'Playwright', 'بيتعملهم import من <code>@playwright/test</code>؛ و<code>page</code> fixture بتتسلّم بالاسم.'] },
          { en: [`${ng('getByRole')}, ${ng('getByLabel')}, ${ng('getByTestId')}, ${ng('fill')}, ${ng('click')}, ${ng('goto')}`, 'Playwright', 'Methods on <code>page</code> and on locators.'],
            ar: [`${ng('getByRole')} و${ng('getByLabel')} و${ng('getByTestId')} و${ng('fill')} و${ng('click')} و${ng('goto')}`, 'Playwright', 'ميثودز على <code>page</code> وعلى الـ locators.'] },
          { en: [`${ng('toHaveText')}, ${ng('toBeVisible')}, ${ng('toHaveURL')}`, 'Playwright', 'Web-first matchers: they retry until true or timeout.'],
            ar: [`${ng('toHaveText')} و${ng('toBeVisible')} و${ng('toHaveURL')}`, 'Playwright', 'matchers بتعيد المحاولة لحد ما تبقى صح أو الوقت يخلص.'] },
          { en: [`${ng('button')}, ${ng('heading')}, ${ng('textbox')}, <code>link</code>, <code>checkbox</code>`, 'ARIA (the browser)', 'Role names. A <code>&lt;button&gt;</code> has the role <code>button</code> without you writing anything.'],
            ar: [`${ng('button')} و${ng('heading')} و${ng('textbox')} و<code>link</code> و<code>checkbox</code>`, 'ARIA (المتصفح)', 'أسماء roles. أي <code>&lt;button&gt;</code> ليه الـ role <code>button</code> من غير ما تكتب حاجة.'] },
          { en: [`${ng('testDir')}, ${ng('use')}, ${ng('baseURL')}, ${ng('webServer')}, ${ng('command')}, ${ng('url')}`, 'Playwright config', 'Keys it reads. Only the values are about your project.'],
            ar: [`${ng('testDir')} و${ng('use')} و${ng('baseURL')} و${ng('webServer')} و${ng('command')} و${ng('url')}`, 'إعدادات Playwright', 'مفاتيح بيقراها. القيم بس هي اللي بتاعة مشروعك.'] },
        ] },
      { t: 'p',
        en: 'The role goes in the first argument; the text the user sees goes in <code>name</code>. The same field can be found two ways, and both use fixed words plus the app’s text:',
        ar: 'الـ role بيتكتب في أول argument؛ والكلام اللي اليوزر بيشوفه بيتكتب في <code>name</code>. ونفس الخانة ممكن تتلاقي بطريقتين، والاتنين بيستخدموا كلمات ثابتة ومعاها كلام التطبيق:' },
      { t: 'code', name: 'locators.ts', lang: 'ts', tag: { en: 'fixed role, app text', ar: 'role ثابت، وكلام التطبيق' }, code: [
        "page.getByLabel('Email');                        // by the label text",
        "page.getByRole('textbox', { name: 'Email' });   // by role + accessible name",
        "page.getByRole('heading', { name: 'Thank you' });" ] }
    ]
  },

  /* ------------------------------------------------------------ 6 */
  {
    id: 'habits',
    kicker: { en: 'Conventions, not rules', ar: 'عادات، مش قواعد' },
    title: { en: 'How to pick good names', ar: 'تختار أسماء كويسة إزاي' },
    lead: {
      en: 'Most of the names an E2E test depends on are chosen by whoever writes the app’s copy. These habits keep the test from breaking every time the copy changes.',
      ar: 'أغلب الأسماء اللي تست الـ E2E معتمد عليها بيختارها اللي بيكتب كلام التطبيق. العادات دي بتخلي التست مايقعش كل ما الكلام يتغير.'
    },
    blocks: [
      { t: 'tbl',
        head: { en: ['Naming', 'Good', 'Avoid', 'Why'], ar: ['بتسمّي', 'كويس', 'ابعد عن', 'ليه'] },
        rows: [
          { en: ['what you search for', 'role + visible text, or a label', 'CSS classes like <code>.mat-mdc-button</code>', 'Classes change with refactors; the text a user reads changes rarely, and on purpose.'],
            ar: ['اللي بتدوّر عليه', 'role والكلام الظاهر، أو لابل', 'CSS classes زي <code>.mat-mdc-button</code>', 'الـ classes بتتغير مع إعادة الهيكلة؛ لكن الكلام اللي اليوزر بيقراه نادرًا ما بيتغير، ولما بيتغير بيبقى بقصد.'] },
          { en: ['a test id', '<code>cart-total</code>, <code>order-number</code>', '<code>div1</code>, <code>test</code>', 'Only for things with no label or role. Name the thing, not the tag.'],
            ar: ['test id', '<code>cart-total</code> و<code>order-number</code>', '<code>div1</code> و<code>test</code>', 'بس للحاجات اللي ملهاش لابل أو role. سمّي الحاجة، مش التاج.'] },
          { en: ['page-object methods', 'user intentions: <code>payWith</code>, <code>open</code>', 'mechanics: <code>clickButton3</code>', 'The spec should read like the acceptance criteria.'],
            ar: ['ميثودز الـ page object', 'نية اليوزر: <code>payWith</code> و<code>open</code>', 'ميكانيكا: <code>clickButton3</code>', 'الـ spec لازم يتقري زي معايير القبول.'] },
          { en: ['the page-object class', '<code>CheckoutPage</code>', '<code>Checkout</code>', 'The app already has a component called <code>Checkout</code>. Different files, same spelling, easy confusion.'],
            ar: ['كلاس الـ page object', '<code>CheckoutPage</code>', '<code>Checkout</code>', 'التطبيق عنده أصلًا component اسمه <code>Checkout</code>. ملفات مختلفة ونفس الكتابة، واللخبطة سهلة.'] },
          { en: ['the <code>test(…)</code> sentence', "a journey: <code>'a visitor can pay for their cart'</code>", "<code>'checkout test'</code>", 'It is the line you read in the CI report.'],
            ar: ['جملة الـ <code>test(…)</code>', "رحلة: <code>'a visitor can pay for their cart'</code>", "<code>'checkout test'</code>", 'ده السطر اللي بتقراه في تقرير الـ CI.'] },
        ] }
    ]
  },

  /* ------------------------------------------------------------ 7 */
  {
    id: 'forced',
    kicker: { en: 'When a rule picks the name', ar: 'لما قاعدة هي اللي بتختار الاسم' },
    title: { en: 'Four places where the name is not free', ar: 'أربع أماكن الاسم فيهم مش براحتك' },
    lead: {
      en: 'Some of these look like ordinary JavaScript choices. They are not: Playwright reads them by exact spelling.',
      ar: 'شوية من دول شكلهم اختيارات JavaScript عادية. بس لأ: Playwright بيقراهم بالكتابة بالظبط.'
    },
    blocks: [
      { t: 'step', n: 'A', title: { en: 'The fixture name inside <code>({ })</code>', ar: 'اسم الـ fixture جوه <code>({ })</code>' }, blocks: [
        { t: 'pair',
          bad:  { name: 'checkout.spec.ts', lang: 'ts', code: ["test('a visitor can pay for their cart', async ({ tab }) => {"] },
          good: { name: 'checkout.spec.ts', lang: 'ts', code: ["test('a visitor can pay for their cart', async ({ page }) => {"] } },
        { t: 'p',
          en: 'In normal JavaScript a destructured name is up to you. Here Playwright looks at the names you destructure and provides the fixture with that name. There is no fixture called <code>tab</code>, so the run stops with an error about it. Inside a page object you receive the tab as an ordinary parameter, and there the name is yours.',
          ar: 'في JavaScript العادي الاسم اللي بتفكّه من الأوبجكت براحتك. هنا Playwright بيبص على الأسماء اللي انت بتفكّها وبيدّيك الـ fixture اللي بالاسم ده. مفيش fixture اسمها <code>tab</code>، فالتشغيل بيقف بـ error عنها. وجوه الـ page object بتستلم التاب كـ parameter عادي، وهناك الاسم بتاعك.' }
      ]},
      { t: 'step', n: 'B', title: { en: 'Where the spec file lives, and its suffix', ar: 'ملف الـ spec فين، وبيخلص بإيه' }, blocks: [
        { t: 'p',
          en: `Playwright runs files inside ${ng('testDir')} whose names end in <code>.spec.ts</code> or <code>.test.ts</code> by default. A file called <code>checkout.e2e.ts</code>, or one outside <code>./e2e</code>, is simply not run.`,
          ar: `Playwright افتراضيًا بيشغّل الملفات اللي جوه ${ng('testDir')} واللي أسماءها بتخلص بـ <code>.spec.ts</code> أو <code>.test.ts</code>. ملف اسمه <code>checkout.e2e.ts</code>، أو ملف برّه <code>./e2e</code>، ببساطة مش هيشتغل.` }
      ]},
      { t: 'step', n: 'C', title: { en: 'The <code>data-testid</code> attribute', ar: 'الـ attribute اللي اسمه <code>data-testid</code>' }, blocks: [
        { t: 'p',
          en: `${ng('getByTestId')} reads ${ng('data-testid')} by default. Write <code>data-test="cart-total"</code> or <code>data-qa</code> in the template and it finds nothing, unless you change <code>testIdAttribute</code> in the config. The value after it, ${pub('cart-total')}, is yours.`,
          ar: `${ng('getByTestId')} بيقرا ${ng('data-testid')} افتراضيًا. لو كتبت <code>data-test="cart-total"</code> أو <code>data-qa</code> في التمبلت مش هيلاقي حاجة، إلا لو غيّرت <code>testIdAttribute</code> في الإعدادات. والقيمة اللي بعده، ${pub('cart-total')}، بتاعتك.` }
      ]},
      { t: 'step', n: 'D', title: { en: 'Role names, and how <code>name</code> matches', ar: 'أسماء الـ roles، و<code>name</code> بيطابق إزاي' }, blocks: [
        { t: 'p',
          en: `Role names come from the ARIA list: ${ng('button')}, ${ng('heading')}, ${ng('textbox')}, <code>link</code>… you cannot invent one. And ${ng('name')} matches <b>part</b> of the accessible name, ignoring case, unless you add ${ng('exact')}<code>: true</code>. So <code>'Pay'</code> would also match “Pay with PayPal”.`,
          ar: `أسماء الـ roles جاية من ليستة ARIA: ${ng('button')} و${ng('heading')} و${ng('textbox')} و<code>link</code>… مينفعش تألف واحد. و${ng('name')} بيطابق <b>جزء</b> من الاسم، ومش فارق معاه الحروف الكبيرة والصغيرة، إلا لو ضفت ${ng('exact')}<code>: true</code>. فـ<code>'Pay'</code> هتطابق كمان «Pay with PayPal».` }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 8 */
  {
    id: 'old',
    kicker: { en: 'Older code', ar: 'كود أقدم' },
    title: { en: 'Protractor used the same shared names', ar: 'Protractor كان بيستخدم نفس الأسماء المتشاركة' },
    lead: {
      en: 'Older Angular projects came with Protractor. It is deprecated and the CLI no longer sets it up, but you will still read it. Every tool word changes; the words shared with the app do not.',
      ar: 'مشاريع أنجولار القديمة كانت جاية بـ Protractor. هو دلوقتي deprecated والـ CLI مبقاش بيجهّزه، بس لسه هتقراه. كل كلمة بتاعة الأداة بتتغير؛ لكن الكلمات المتشاركة مع التطبيق لأ.'
    },
    blocks: [
      { t: 'pair',
        bad:  { name: 'checkout.spec.ts — Protractor', lang: 'ts', code: [
          "import { browser, by, element } from 'protractor';",
          '',
          "await browser.get('/checkout');",
          "await element(by.buttonText('Pay now')).click();",
          "expect(await element(by.css('h1')).getText()).toEqual('Thank you');" ] },
        good: { name: 'checkout.spec.ts — Playwright', lang: 'ts', code: [
          "import { expect } from '@playwright/test';",
          '',
          "await page.goto('/checkout');",
          "await page.getByRole('button', { name: 'Pay now' }).click();",
          "await expect(page.getByRole('heading', { name: 'Thank you' })).toBeVisible();" ] } },
      { t: 'p',
        en: `${pub('checkout')}, ${pub('Pay now')} and ${pub('Thank you')} are in both versions because they belong to the app. Also notice the old assertion reads the text once, while ${ng('toBeVisible')} keeps retrying.`,
        ar: `${pub('checkout')} و${pub('Pay now')} و${pub('Thank you')} موجودين في النسختين لإنهم بتوع التطبيق. وخد بالك كمان إن الـ assertion القديم بيقرا النص مرة واحدة، لكن ${ng('toBeVisible')} بتفضل تعيد المحاولة.` }
    ]
  },

  /* ------------------------------------------------------------ 9 */
  {
    id: 'silent',
    kicker: { en: 'Red, or green for the wrong reason', ar: 'أحمر، أو أخضر للسبب الغلط' },
    title: { en: 'Mistakes that fail silently or confusingly', ar: 'غلطات بتفشل في صمت أو بشكل ملخبط' },
    lead: {
      en: 'An E2E failure usually says “timeout”, which tells you when it gave up, not why. Most of the time the why is a shared string that went stale.',
      ar: 'فشل الـ E2E غالبًا بيقول «timeout»، ودي بتقولك استسلم إمتى، مش ليه. وأغلب الوقت الـ «ليه» ده string متشارك بقى قديم.'
    },
    blocks: [
      { t: 'step', n: '1', title: { en: 'The button text changed in the app', ar: 'كلام الزرار اتغير في التطبيق' }, blocks: [
        { t: 'pair',
          bad:  { name: 'checkout-page.ts', lang: 'ts', code: [
            '// checkout.html now says: <button …>Place order</button>',
            "await this.page.getByRole('button', { name: 'Pay now' }).click();" ] },
          good: { name: 'checkout-page.ts', lang: 'ts', code: [
            '// checkout.html now says: <button …>Place order</button>',
            "await this.page.getByRole('button', { name: 'Place order' }).click();" ] } },
        { t: 'p', en: 'The click waits for a button that no longer exists until the test times out. The error names the locator it was waiting for; compare that text with the screen.',
                  ar: 'الكليك بتستنى زرار مبقاش موجود لحد ما وقت التست يخلص. والإيرور بيذكر الـ locator اللي كان مستنيه؛ قارن الكلام ده بالشاشة.' }
      ]},
      { t: 'step', n: '2', title: { en: 'A route pattern that matches nothing', ar: 'pattern للشبكة مش بيطابق حاجة' }, blocks: [
        { t: 'pair',
          bad:  { name: 'checkout.spec.ts', lang: 'ts', code: ["await page.route('**/api/carts', route => route.fulfill({ json: { items: [] } }));"] },
          good: { name: 'checkout.spec.ts', lang: 'ts', code: ["await page.route('**/api/cart', route => route.fulfill({ json: { items: [] } }));"] } },
        { t: 'p', en: 'No error at all. The handler is registered, nothing ever matches it, and the app talks to the real backend. The test now depends on whatever data is there today.',
                  ar: 'مفيش أي error. الـ handler اتسجّل، ومفيش حاجة بتطابقه، والتطبيق بيكلّم الباك إند الحقيقي. والتست بقى معتمد على أي داتا موجودة النهاردة.' }
      ]},
      { t: 'step', n: '3', title: { en: 'A page-object method renamed on one side', ar: 'ميثود في الـ page object اتغيرت من ناحية واحدة' }, blocks: [
        { t: 'pair',
          bad:  { name: 'checkout.spec.ts', lang: 'ts', code: ["await checkoutPage.pay('mona@shop.eg', '4242424242424242');"] },
          good: { name: 'checkout.spec.ts', lang: 'ts', code: ["await checkoutPage.payWith('mona@shop.eg', '4242424242424242');"] } },
        { t: 'p', en: 'Your editor underlines it, but Playwright does not type-check before running, so the run still starts and fails with “checkoutPage.pay is not a function”. If you want compile errors, run the TypeScript compiler over the test folder in CI.',
                  ar: 'الإديتور بيحط تحتها خط، بس Playwright مابيعملش type-check قبل التشغيل، فالتشغيل بيبدأ عادي ويفشل بـ «checkoutPage.pay is not a function». لو عايز compile errors، شغّل الـ TypeScript compiler على فولدر التستات في الـ CI.' }
      ]},
      { t: 'step', n: '4', title: { en: 'Sleeping instead of waiting for state', ar: 'تنام بدل ما تستنى الحالة' }, blocks: [
        { t: 'pair',
          bad:  { name: 'checkout.spec.ts', lang: 'ts', code: [
            'await page.waitForTimeout(2000);',
            "expect(await page.getByRole('heading').textContent()).toBe('Thank you');" ] },
          good: { name: 'checkout.spec.ts', lang: 'ts', code: [
            "await expect(page.getByRole('heading', { name: 'Thank you' })).toBeVisible();" ] } },
        { t: 'p', en: 'Two seconds is too long on your laptop and too short on a busy CI machine, and <code>textContent()</code> reads once with no retry. The good version retries until the heading appears.',
                  ar: 'تانيتين كتير على اللابتوب بتاعك وقليل على جهاز CI مشغول، و<code>textContent()</code> بتقرا مرة واحدة من غير ما تعيد. النسخة الكويسة بتعيد لحد ما العنوان يظهر.' }
      ]},
      { t: 'step', n: '5', title: { en: 'A name that matches two buttons', ar: 'اسم بيطابق زرارين' }, blocks: [
        { t: 'pair',
          bad:  { name: 'checkout-page.ts', lang: 'ts', code: ["await this.page.getByRole('button', { name: 'Pay' }).click();"] },
          good: { name: 'checkout-page.ts', lang: 'ts', code: ["await this.page.getByRole('button', { name: 'Pay now', exact: true }).click();"] } },
        { t: 'p', en: 'If the page also has “Pay with PayPal”, <code>\'Pay\'</code> matches both, because <code>name</code> matches part of the text. Playwright refuses to guess and fails with a “strict mode violation”.',
                  ar: 'لو الصفحة فيها كمان «Pay with PayPal»، <code>\'Pay\'</code> هتطابق الاتنين، لإن <code>name</code> بيطابق جزء من الكلام. Playwright بيرفض يخمّن وبيفشل بـ «strict mode violation».' }
      ]}
    ]
  },

  /* ------------------------------------------------------------ 10 */
  {
    id: 'check',
    kicker: { en: 'When it fails', ar: 'لما يفشل' },
    title: { en: 'Six questions, in this order', ar: 'ست أسئلة، بالترتيب ده' },
    lead: {
      en: 'Your E2E test is red, or green when it should not be. Ask these before changing anything.',
      ar: 'تست الـ E2E بتاعك أحمر، أو أخضر وهو مايصحش يبقى كده. اسأل دول قبل ما تغيّر أي حاجة.'
    },
    blocks: [
      { t: 'chk', en: '<b>1.</b> Open the trace or run <code>npx playwright test --ui</code>. Which locator was it waiting for, and what did the page look like at that moment?',
                  ar: '<b>1.</b> افتح الـ trace أو شغّل <code>npx playwright test --ui</code>. كان مستني أنهي locator، والصفحة كان شكلها إيه في اللحظة دي؟' },
      { t: 'chk', en: '<b>2.</b> Is every label, button text and heading in the test still exactly what the app shows?',
                  ar: '<b>2.</b> كل لابل وكلام زرار وعنوان في التست لسه هو بالظبط اللي التطبيق بيعرضه؟' },
      { t: 'chk', en: '<b>3.</b> Does the <code>page.route</code> pattern match the URL you see in the network log, and does the fake JSON use the keys the app reads?',
                  ar: '<b>3.</b> الـ pattern بتاع <code>page.route</code> بيطابق الـ URL اللي شايفه في لوج الشبكة؟ والـ JSON المزيف بيستخدم المفاتيح اللي التطبيق بيقراها؟' },
      { t: 'chk', en: '<b>4.</b> Do <code>goto</code> and <code>toHaveURL</code> still match the paths in <code>app.routes.ts</code>, and is the app running at <code>baseURL</code>?',
                  ar: '<b>4.</b> <code>goto</code> و<code>toHaveURL</code> لسه مطابقين للمسارات اللي في <code>app.routes.ts</code>؟ والتطبيق شغّال على <code>baseURL</code>؟' },
      { t: 'chk', en: '<b>5.</b> Did a page-object rename reach every spec? Playwright will not tell you before running; your editor or <code>tsc</code> will.',
                  ar: '<b>5.</b> تغيير اسم في الـ page object وصل لكل الـ specs؟ Playwright مش هيقولك قبل التشغيل؛ الإديتور أو <code>tsc</code> هما اللي هيقولوا.' },
      { t: 'chk', en: '<b>6.</b> Is the file inside <code>testDir</code> and named <code>*.spec.ts</code>? A test that never runs never fails.',
                  ar: '<b>6.</b> الملف جوه <code>testDir</code> واسمه <code>*.spec.ts</code>؟ التست اللي عمره ما بيشتغل عمره ما بيفشل.' }
    ]
  }
  ]
};
