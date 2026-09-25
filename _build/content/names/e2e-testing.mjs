/* names for the end-to-end testing (Playwright) topic.
   n: the name exactly as typed in the code.   k: ng | mine | pub.
   w: what it is, and what has to change with it.   { en, ar }
   re / only / as: see _build/names.mjs.                                  */
export default {
'e2e-testing': {
  note: {
    en: 'An E2E test knows nothing about your code. The orange names here are <b>what the user sees</b>: button labels, form labels, a <code>data-testid</code>. Rename the text on a button in the app and the test breaks, even though no TypeScript changed. The role words (<code>button</code>, <code>link</code>, <code>heading</code>) are fixed by the browser.',
    ar: 'تيست الـ E2E مايعرفش أي حاجة عن الكود بتاعك. الأسماء البرتقاني هنا هي <b>اللي اليوزر بيشوفه</b>: كلام الزراير، اللابلز بتاعة الفورم، و<code>data-testid</code>. لو غيّرت الكلام اللي على زرار في التطبيق التيست هيقع، مع إن ولا سطر TypeScript اتغير. وكلمات الـ role (<code>button</code> و<code>link</code> و<code>heading</code>) ثابتة من المتصفح.'
  },
  names: [
    { n:'test', k:'ng', only:['ts'], re:'(?<![\\w$.-])test(?=[(,])',
      w:{ en:'Playwright’s function for one test. The sentence inside is yours.', ar:'الـ function بتاعة Playwright لتيست واحد. الجملة اللي جواها بتاعتك.' } },
    { n:'expect', k:'ng', w:{ en:'Playwright’s assertion. It retries until the check passes or times out.', ar:'الـ assertion بتاعة Playwright. بتفضل تحاول لحد ما الشرط يتحقق أو الوقت يخلص.' } },
    { n:'page', k:'ng', only:['spec','stable'],
      w:{ en:'Playwright’s browser tab. Inside <code>({ page })</code> it is picked by name, so it must be spelled exactly. (In the page object, <code>this.page</code> is your own field that happens to reuse the word.)',
          ar:'تاب المتصفح بتاعة Playwright. جوه <code>({ page })</code> بيتختار بالاسم، فلازم يتكتب كده بالظبط. (في الـ page object، <code>this.page</code> ده field بتاعك صدفة واخد نفس الكلمة.)' } },
    { n:'Page', k:'ng', w:{ en:'Playwright’s type for a tab.', ar:'الـ type بتاع Playwright للتاب.' } },
    { n:'goto', k:'ng', w:{ en:'A Playwright <code>page</code> method.', ar:'ميثود في <code>page</code> بتاعة Playwright.' } },
    { n:'getByRole', k:'ng',
      w:{ en:'Playwright’s locator: find an element by its accessible role and name, the way a screen reader does.',
          ar:'locator من Playwright: بيلاقي الـ element بالـ role والاسم بتوعه، زي ما الـ screen reader بيعمل.' } },
    { n:'getByLabel', k:'ng', w:{ en:'Playwright’s locator: find a form field by its label text.', ar:'locator من Playwright: بيلاقي خانة الفورم باللابل بتاعها.' } },
    { n:'getByTestId', k:'ng', w:{ en:'Playwright’s locator: find an element by its <code>data-testid</code>.', ar:'locator من Playwright: بيلاقي الـ element بالـ <code>data-testid</code> بتاعه.' } },
    { n:'click', k:'ng', re:'(?<=\\.)click(?=\\()', w:{ en:'A Playwright action.', ar:'action من Playwright.' } },
    { n:'fill', k:'ng', w:{ en:'A Playwright action: type into a field.', ar:'action من Playwright: اكتب في خانة.' } },
    { n:'toHaveText', k:'ng', w:{ en:'A Playwright matcher.', ar:'matcher من Playwright.' } },
    { n:'toBeVisible', k:'ng', w:{ en:'A Playwright matcher.', ar:'matcher من Playwright.' } },
    { n:'toHaveURL', k:'ng', w:{ en:'A Playwright matcher.', ar:'matcher من Playwright.' } },
    { n:'waitForTimeout', k:'ng', w:{ en:'Playwright’s fixed sleep. It exists; do not use it.', ar:'الـ sleep الثابت بتاع Playwright. موجود؛ بس ماتستخدموش.' } },
    { n:'page.route', k:'ng',
      w:{ en:'Playwright’s network interceptor. <code>fulfill</code> answers the request with your data.',
          ar:'الـ interceptor بتاع Playwright للشبكة. و<code>fulfill</code> بترد على الـ request بالداتا بتاعتك.' } },
    { n:'fulfill', k:'ng', w:{ en:'A Playwright route method.', ar:'ميثود في الـ route بتاعة Playwright.' } },
    { n:'name', k:'ng', only:['spec','po','stable'],
      w:{ en:'An option key Playwright reads: the accessible name. The text you give it is the app’s, see below.',
          ar:'مفتاح إعداد Playwright بيقراه: الاسم اللي بيوصف الـ element. والنص اللي بتحطه فيه بتاع التطبيق، بص تحت.' } },
    { n:'button', k:'ng', only:['ts'],
      w:{ en:'An ARIA role, fixed by the browser. A <code>&lt;button&gt;</code> has it automatically.', ar:'role من ARIA، ثابت من المتصفح. أي <code>&lt;button&gt;</code> بياخده لوحده.' } },
    { n:'link', k:'ng', only:['ts'], w:{ en:'An ARIA role: an <code>&lt;a href&gt;</code>.', ar:'role من ARIA: <code>&lt;a href&gt;</code>.' } },
    { n:'heading', k:'ng', only:['ts'], w:{ en:'An ARIA role: <code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code>.', ar:'role من ARIA: من <code>&lt;h1&gt;</code> لـ <code>&lt;h6&gt;</code>.' } },
    { n:'status', k:'ng', only:['ts'], w:{ en:'An ARIA role for a live message, like a toast with <code>role="status"</code>.', ar:'role من ARIA لرسالة بتتحدّث، زي toast عليه <code>role="status"</code>.' } },
    { n:'webServer', k:'ng', w:{ en:'A Playwright config key: how to start your app before the tests.', ar:'مفتاح في إعدادات Playwright: إزاي يشغّل التطبيق قبل التستات.' } },
    { n:'reuseExistingServer', k:'ng', w:{ en:'A Playwright config key.', ar:'مفتاح في إعدادات Playwright.' } },

    { n:'Pay now', k:'pub',
      w:{ en:'The button’s visible text in your app. The test types it too, so a copy change in the template breaks the test.',
          ar:'الكلام اللي ظاهر على الزرار في التطبيق. التيست بيكتبه برضه، فلو غيّرت الكلام في التمبلت التيست هيقع.' } },
    { n:'Add to cart', k:'pub', w:{ en:'Button text in the app, typed again by the test.', ar:'كلام زرار في التطبيق، والتيست بيكتبه تاني.' } },
    { n:'Thank you', k:'pub', w:{ en:'The heading text on the success page, typed again by the test.', ar:'كلام العنوان في صفحة النجاح، والتيست بيكتبه تاني.' } },
    { n:'Email', k:'pub', w:{ en:'The form label in the app. <code>getByLabel</code> must match it.', ar:'اللابل بتاع الفورم في التطبيق. <code>getByLabel</code> لازم يطابقه.' } },
    { n:'Card number', k:'pub', w:{ en:'The form label in the app. <code>getByLabel</code> must match it.', ar:'اللابل بتاع الفورم في التطبيق. <code>getByLabel</code> لازم يطابقه.' } },
    { n:'cart-total', k:'pub',
      w:{ en:'A <code>data-testid</code> you added on purpose. The template and the test both type it.',
          ar:'<code>data-testid</code> انت حاطه بقصد. التمبلت والتيست الاتنين بيكتبوه.' } },
    { n:'CheckoutPage', k:'pub', w:{ en:'Your page object class. Every spec that uses it imports it by this name.', ar:'كلاس الـ page object بتاعك. أي spec بيستخدمه بيعمله import بالاسم ده.' } },
    { n:'email', k:'pub', w:{ en:'A page-object method the specs call.', ar:'ميثود في الـ page object الـ specs بتناديها.' } },
    { n:'pay', k:'pub', w:{ en:'A page-object method the specs call.', ar:'ميثود في الـ page object الـ specs بتناديها.' } },
    { n:'fillCard', k:'pub', w:{ en:'A page-object method the specs call.', ar:'ميثود في الـ page object الـ specs بتناديها.' } },
    { n:'expectSuccess', k:'pub', w:{ en:'A page-object method the specs call.', ar:'ميثود في الـ page object الـ specs بتناديها.' } },
    { n:'number', k:'mine', re:'(?<=\\()number(?=[:)])',
      w:{ en:'The parameter name. (<code>string</code> after it is TypeScript’s; the word in <code>\'Card number\'</code> is app text.)',
          ar:'اسم الـ parameter. (و<code>string</code> اللي بعده بتاع TypeScript؛ والكلمة اللي في <code>\'Card number\'</code> كلام التطبيق.)' } },
    { n:'route', k:'mine', only:['stable'], re:'(?<![\\w$.\\/-])route(?=[ .])',
      w:{ en:'Your name for the callback parameter. Playwright passes it by position.', ar:'اسمك للـ parameter بتاع الـ callback. Playwright بيبعته حسب الترتيب.' } },
    { n:'FIXTURE_PRODUCTS', k:'mine', w:{ en:'Your fake data constant.', ar:'الـ constant بتاعك اللي فيه داتا مزيفة.' } },
  ]
}
};
