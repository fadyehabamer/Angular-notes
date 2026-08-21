import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { hlLines, esc } from './hl.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..');
const CSS  = readFileSync(join(HERE, 'deck.css'), 'utf8');

/* lint the stylesheet before it is inlined into 30+ pages */
(function lintCss() {
  const stripped = CSS.replace(/\/\*[\s\S]*?\*\//g, '');
  const problems = [];
  if (stripped.split('{').length !== stripped.split('}').length)
    problems.push('unbalanced braces');
  let depth = 0, sel = '';
  for (const ch of stripped) {
    if (ch === '{') {
      if (depth === 0) {
        const t = sel.trim();
        if (t && !t.startsWith('@') && /:\s*$/.test(t))
          problems.push('selector ends in a bare colon: ' + t.slice(-40));
        sel = '';
      }
      depth++;
    } else if (ch === '}') {
      depth--; if (depth === 0) sel = '';
    } else if (depth === 0) sel += ch;
  }
  if (problems.length) {
    console.error('deck.css problems:\n  ' + problems.join('\n  '));
    process.exit(1);
  }
})();

const DOC = (await import('./content/typescript.mjs')).default;
const MAP = (await import('./content/roadmap.mjs')).default;

const TRACKS = [
  (await import('./content/beginner.mjs')).default,
  (await import('./content/intermediate.mjs')).default,
  (await import('./content/advanced.mjs')).default,
];

/* ---------- helpers ---------- */
const bi = o => typeof o === 'string'
  ? o
  : `<span class="l-en">${o.en}</span><span class="l-ar" dir="auto">${o.ar}</span>`;

/* ---------- line-art icons (24x24, stroked, no fills) ---------- */
const I = {
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2.2v2.3M12 19.5v2.3M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.2 12h2.3M19.5 12h2.3M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6"/>',
  moon:'<path d="M20.5 14.6A8.6 8.6 0 1 1 9.4 3.5a6.7 6.7 0 0 0 11.1 11.1z"/>',
  target:'<circle cx="12" cy="12" r="8.2"/><circle cx="12" cy="12" r="3"/>',
  compare:'<rect x="2.8" y="6" width="7.4" height="12" rx="2"/><rect x="13.8" y="6" width="7.4" height="12" rx="2"/><path d="M12 3.2v17.6" stroke-dasharray="2 3"/>',
  flag:'<path d="M5.2 21.5V3.2M5.2 4.5h11.4l-2.2 3.2 2.2 3.2H5.2"/>',
  star:'<path d="m12 3.2 2.6 5.6 6.1.8-4.5 4.3 1.1 6-5.3-3-5.3 3 1.1-6-4.5-4.3 6.1-.8z"/>',
  box:'<rect x="3.4" y="5" width="17.2" height="14" rx="2.6"/><path d="M3.4 9.4h17.2"/>',
  boxes:'<rect x="2.6" y="3.6" width="8.4" height="7" rx="1.8"/><rect x="13" y="3.6" width="8.4" height="7" rx="1.8"/><rect x="7.8" y="13.4" width="8.4" height="7" rx="1.8"/>',
  arrow:'<path d="M3.6 12h15.6M13.4 6.2 19.6 12l-6.2 5.8"/>',
  split:'<path d="M3.6 12h5.2M8.8 12l4.6-6h6.6M8.8 12l4.6 6h6.6M17.6 3.4 20.4 6l-2.8 2.6M17.6 15.4 20.4 18l-2.8 2.6"/>',
  merge:'<path d="M3.6 6h5.6l5 6h5.6M3.6 18h5.6l5-6M17.8 9.4 20.4 12l-2.6 2.6"/>',
  bell:'<path d="M18.2 9.4a6.2 6.2 0 1 0-12.4 0c0 5.2-2 6.2-2 6.2h16.4s-2-1-2-6.2"/><path d="M10.3 19.4a2.2 2.2 0 0 0 3.4 0"/>',
  eye:'<path d="M2.4 12S6 5.4 12 5.4 21.6 12 21.6 12 18 18.6 12 18.6 2.4 12 2.4 12z"/><circle cx="12" cy="12" r="2.8"/>',
  click:'<path d="M11 2.6v3M4.4 5.4l2.1 2.1M2.6 12h3M19.6 5.4l-2.1 2.1M12.6 10.8l8.4 3.2-3.8 1.4-1.4 3.8z"/>',
  filter:'<path d="M3 4.8h18l-7.2 8.4v6.4l-3.6 1.6v-8z"/>',
  clock:'<circle cx="12" cy="12" r="8.4"/><path d="M12 7.2V12l3.2 2"/>',
  net:'<circle cx="12" cy="12" r="8.4"/><path d="M3.6 12h16.8M12 3.6c2.4 2.6 3.6 5.4 3.6 8.4S14.4 18.2 12 20.4c-2.4-2.2-3.6-5.4-3.6-8.4S9.6 6.2 12 3.6z"/>',
  lock:'<rect x="4.4" y="10" width="15.2" height="10.4" rx="2.6"/><path d="M7.8 10V7.2a4.2 4.2 0 0 1 8.4 0V10"/>',
  key:'<circle cx="7.4" cy="15.6" r="3.6"/><path d="m10 13.2 10-10M17 5.8l2.6 2.6M14.6 8.2l2.6 2.6"/>',
  list:'<path d="M8.2 6h12.8M8.2 12h12.8M8.2 18h12.8M3.4 6h.02M3.4 12h.02M3.4 18h.02"/>',
  tree:'<rect x="8.8" y="2.6" width="6.4" height="5" rx="1.6"/><rect x="2.4" y="16.4" width="6.4" height="5" rx="1.6"/><rect x="15.2" y="16.4" width="6.4" height="5" rx="1.6"/><path d="M12 7.6v4.4M5.6 16.4V12h12.8v4.4"/>',
  swap:'<path d="M3.6 8h13.6l-3.2-3.2M20.4 16H6.8l3.2 3.2"/>',
  warn:'<path d="M12 3.2 21.6 20H2.4z"/><path d="M12 9.8v4.2M12 17.2h.02"/>',
  check:'<circle cx="12" cy="12" r="8.4"/><path d="m8.4 12 2.6 2.6 4.6-5.2"/>',
  cross:'<circle cx="12" cy="12" r="8.4"/><path d="m9 9 6 6M15 9l-6 6"/>',
  gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2.4v3M12 18.6v3M21.6 12h-3M5.4 12h-3M18.8 5.2l-2.1 2.1M7.3 16.7l-2.1 2.1M18.8 18.8l-2.1-2.1M7.3 7.3 5.2 5.2"/>',
  bolt:'<path d="M13.6 2.4 4 13.6h6.6L10 21.6 20 10.4h-6.6z"/>',
  doc:'<path d="M6 2.6h8.2L18.6 7v14.4H6z"/><path d="M14.2 2.6V7h4.4M9 12.4h6M9 16.4h6"/>',
  folder:'<path d="M3 6.4h6l2 2.6h10v10.6H3z"/>',
  screen:'<rect x="2.4" y="3.8" width="19.2" height="13" rx="2.2"/><path d="M8.4 21h7.2M12 16.8V21"/>',
  refresh:'<path d="M20.2 11.4a8.2 8.2 0 1 0-.7 4.2M20.2 5v6.4h-6.4"/>',
  layers:'<path d="m12 2.8 9.2 5-9.2 5-9.2-5z"/><path d="m3.4 13.2 8.6 4.8 8.6-4.8"/>',
  plug:'<path d="M9 2.8v6.2M15 2.8v6.2M6.4 9h11.2v3.2a5.6 5.6 0 0 1-11.2 0zM12 17.8v3.4"/>',
  route:'<circle cx="5.4" cy="5.8" r="2.6"/><circle cx="18.6" cy="18.2" r="2.6"/><path d="M8 5.8h5.6a4.2 4.2 0 0 1 0 8.4H10.4a4 4 0 0 0 0 8"/>',
  form:'<rect x="3.4" y="3.8" width="17.2" height="16.4" rx="2.6"/><path d="M7.4 8.8h9.2M7.4 12.8h9.2M7.4 16.8h4.4"/>',
  cart:'<circle cx="9.4" cy="19.6" r="1.6"/><circle cx="17.6" cy="19.6" r="1.6"/><path d="M2.4 3.6h2.6l2.6 12h11l2-8h-14"/>',
  user:'<circle cx="12" cy="8" r="3.8"/><path d="M4.6 20.6a7.4 7.4 0 0 1 14.8 0"/>',
  db:'<path d="M20 6c0 1.8-3.6 3.2-8 3.2S4 7.8 4 6s3.6-3.2 8-3.2S20 4.2 20 6z"/><path d="M4 6v12c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2V6M4 12c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2"/>',
  cloud:'<path d="M7 19a4.6 4.6 0 0 1-.3-9.2 6.2 6.2 0 0 1 11.8 1.7A4.1 4.1 0 0 1 17.6 19z"/>',
  bug:'<rect x="7.4" y="7.8" width="9.2" height="12.4" rx="4.6"/><path d="M9 6.8a3 3 0 0 1 6 0M3.8 11h3.6M16.6 11h3.6M3.8 16.2h3.6M16.6 16.2h3.6M6 5.6l2 2M18 5.6l-2 2"/>',
  test:'<path d="M9.4 2.6v7L3.9 19a2 2 0 0 0 1.8 3h12.6a2 2 0 0 0 1.8-3l-5.5-9.4v-7M7.8 2.6h8.4M6.4 15.2h11.2"/>',
  ship:'<path d="M3 16.6s2 1.9 4.5 1.9S12 16.6 12 16.6s2 1.9 4.5 1.9S21 16.6 21 16.6M5 13V7l7-3.4L19 7v6M5 13l7 3 7-3"/>',
  wand:'<path d="M3.6 20.4 14.8 9.2M13 2.8v3M18.6 5.4l-2.1 2.1M21.2 11h-3M17 2.4l.9 2 2 .9-2 .9-.9 2-.9-2-2-.9 2-.9z"/>',
  shield:'<path d="M12 2.6 20 6v6c0 5-3.4 8.5-8 9.6C7.4 20.5 4 17 4 12V6z"/>',
  timer:'<circle cx="12" cy="13.6" r="7.4"/><path d="M12 9.6v4M9.2 2.6h5.6"/>',
  sig:'<path d="M2.8 18c3 0 3-12 6-12s3 12 6 12 3-8 6.4-8"/>',
  hand:'<path d="M8.2 11.4V5.6a1.8 1.8 0 0 1 3.6 0v5M11.8 10.6V4.4a1.8 1.8 0 0 1 3.6 0v6.4M15.4 10.8V6.2a1.8 1.8 0 0 1 3.6 0v8.4c0 4-2.9 7-6.9 7-3.4 0-5-1.6-6.5-4.2l-1.5-2.5c-.7-1.2 1-2.6 2.2-1.4l1.7 1.8"/>',
  pin:'<path d="M12 21.4s7.2-6.3 7.2-11.2a7.2 7.2 0 1 0-14.4 0C4.8 15.1 12 21.4 12 21.4z"/><circle cx="12" cy="10" r="2.6"/>',
  wrench:'<path d="M15.4 2.8a5.6 5.6 0 0 0-5 8.3l-7 7a2 2 0 1 0 2.8 2.8l7-7a5.6 5.6 0 1 0 2.2-11.1z"/>',
  scale:'<path d="M12 3.2v17.6M6.4 5.4h11.2M4.2 15 7 8.4 9.8 15a2.8 2.8 0 0 1-5.6 0zM14.2 15 17 8.4 19.8 15a2.8 2.8 0 0 1-5.6 0zM8.4 20.8h7.2"/>',
  phone:'<rect x="6.4" y="2.4" width="11.2" height="19.2" rx="2.6"/><path d="M10.6 5.4h2.8M12 18.4h.02"/>',
};
const icon = n => `<svg viewBox="0 0 24 24" aria-hidden="true">${I[n] || I.box}</svg>`;

/* the two switches, identical on every page */
const SWITCHES = `<div class="seg" role="group" aria-label="Language">
        <button id="b-en" aria-pressed="true">EN</button>
        <button id="b-ar" aria-pressed="false" lang="ar">مصري</button>
      </div>
      <div class="seg ico" role="group" aria-label="Theme">
        <button id="b-lt" aria-pressed="true" title="Light">${icon('sun')}</button>
        <button id="b-dk" aria-pressed="false" title="Dark">${icon('moon')}</button>
      </div>`;

/* runs inside <head>, before first paint, so no page flashes the wrong skin */
const BOOT = `<script>
(function(){var r=document.documentElement;try{
if(localStorage.getItem('tas-lang')==='ar'){r.dataset.lang='ar';r.dir='rtl';r.lang='ar-EG';}
r.dataset.theme=localStorage.getItem('tas-theme')==='dark'?'dark':'light';
}catch(e){r.dataset.theme='light';}})();
</script>`;

const UI_JS = `/* ---------- language + theme, shared by every page ---------- */
function _g(id){ return document.getElementById(id); }
function syncUI(){
  const r = document.documentElement;
  const l = r.dataset.lang === 'ar' ? 'ar' : 'en';
  const t = r.dataset.theme === 'dark' ? 'dark' : 'light';
  const set = (id, on) => { const b = _g(id); if (b) b.setAttribute('aria-pressed', String(on)); };
  set('b-en', l === 'en'); set('b-ar', l === 'ar');
  set('b-lt', t === 'light'); set('b-dk', t === 'dark');
}
function setLang(l){
  const r = document.documentElement;
  r.dataset.lang = l;
  r.dir  = l === 'ar' ? 'rtl' : 'ltr';
  r.lang = l === 'ar' ? 'ar-EG' : 'en';
  try { localStorage.setItem('tas-lang', l); } catch (_) {}
  syncUI();
  if (typeof relayout === 'function') relayout();
}
function setTheme(t){
  document.documentElement.dataset.theme = t;
  try { localStorage.setItem('tas-theme', t); } catch (_) {}
  syncUI();
  if (typeof relayout === 'function') relayout();
}
_g('b-en').onclick = () => setLang('en');
_g('b-ar').onclick = () => setLang('ar');
_g('b-lt').onclick = () => setTheme('light');
_g('b-dk').onclick = () => setTheme('dark');
syncUI();`;

const FONTS = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=Cairo:wght@400;600;800&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Sans+Arabic:wght@400;500;600&display=swap';

const codeCard = f => `
      <div class="fc" data-file="${f.id}" data-lang="${f.lang}">
        <div class="fc-h"><span class="d"></span>${esc(f.name)}<span class="tag">${bi(f.tag || '')}</span></div>
        <pre>${hlLines(f.code, f.lang).map((l, i) => `<span class="ln" data-l="${i + 1}">${l || ' '}</span>`).join('')}</pre>
      </div>`;

const nodeBox = n => `
        <div class="node" data-node="${n.id}" data-kind="${n.kind}">
          <span class="role">${bi(n.role)}</span>
          <span class="file">${esc(n.file)}<b>${esc(n.ext)}</b></span>
        </div>`;

/* ---------------------------------------------------------------
   THE SYLLABUS. Track membership and reading order live here, not
   in the content files — so a topic can be written anywhere and
   placed anywhere. Numbering and filenames follow automatically.
   --------------------------------------------------------------- */
const PLAN = {
  beginner: [
    'how-an-app-starts',
    'cli-and-project-files',
    'components',
    'template-syntax',
    'data-binding',
    'signals',
    'control-flow',
    'built-in-directives',
    'built-in-pipes',
    'inputs-outputs',
    'services-di',
    'lifecycle',
    'basic-routing',
    'template-driven-forms',
    'http-basics',
  ],
  intermediate: [
    'forms',
    'directives-and-pipes',
    'component-styles',
    'content-projection',
    'queries',
    'routing',
    'http',
    'error-handling',
    'rxjs-fundamentals',
    'effects-vs-computed',
    'di-host-directives',
    'ui-libraries',
  ],
  advanced: [
    'change-detection',
    'zoneless',
    'rxjs-operators',
    'rxjs-combination',
    'rxjs-interop',
    'signal-state',
    'global-state',
    'dynamic-components',
    'control-value-accessor',
    'renderer2',
    'lazy-loading',
    'defer',
    'performance',
    'ssr-hydration',
    'security',
    'testing',
    'e2e-testing',
    'aot-tree-shaking',
    'pwa',
    'schematics',
    'micro-frontends',
  ],
};

const base = s => s.replace(/^\d+-/, '');
const POOL = new Map();
for (const t of TRACKS) for (const a of t.arts) POOL.set(base(a.slug), a);

const missing = [];
for (const t of TRACKS) {
  t.arts = PLAN[t.id].map(slug => {
    const a = POOL.get(slug);
    if (!a) { missing.push(t.id + '/' + slug); return null; }
    POOL.delete(slug);
    return a;
  }).filter(Boolean);
}
if (POOL.size) console.log('  ! not placed by PLAN: ' + [...POOL.keys()].join(', '));
if (missing.length) console.log('  … planned but not written yet (' + missing.length + '): ' + missing.join(', '));

let seq = 0;
for (const t of TRACKS) for (const a of t.arts) {
  a.num = String(++seq).padStart(2, '0');
  a.slug = a.num + '-' + base(a.slug);
}
const FLAT = TRACKS.flatMap(t => t.arts.map(a => ({ ...a, track: t })));
const href = (a, fromTrack) => (fromTrack ? '../' : '') + a.track.id + '/' + a.slug + '.html';

function trackNav(current, base) {
  const rows = TRACKS.map(t => {
    const first = t.arts[0];
    const cur = t.id === current ? ' aria-current="page"' : '';
    return `<a href="${base}${t.id}/${first.slug}.html" style="--c:var(${t.ink})"${cur}><i></i>${bi(t.name)}</a>`;
  });
  const mapCur = current === 'roadmap' ? ' aria-current="page"' : '';
  rows.unshift(`<a href="${base}roadmap.html" style="--c:var(--beg)"${mapCur}><i></i><span class="l-en">Learning path</span><span class="l-ar">خطة التعلّم</span></a>`);
  const tsCur = current === 'typescript' ? ' aria-current="page"' : '';
  rows.push(`<a href="${base}typescript-for-angular.html" style="--c:var(--ts)"${tsCur}><i></i><span class="l-en">TypeScript</span><span class="l-ar">TypeScript</span></a>`);
  return rows.join('');
}

function chrome(current, base = '../') {
  return `<header class="top"><div class="top-in">
    <a class="home" href="${base}index.html"><b>The Angular Signal</b><span class="l-en">contents</span><span class="l-ar">المحتويات</span></a>
    <nav class="tracknav">${trackNav(current, base)}</nav>
    <div class="top-right">
      ${SWITCHES}
    </div>
  </div></header>`;
}

/* ---------- the per-topic page ---------- */
function page(a, i) {
  const prev = FLAT[i - 1], next = FLAT[i + 1];
  const rows = a.nodes.map(r => `<div class="row">${r.map(nodeBox).join('')}</div>`).join('');
  const svg = `<svg aria-hidden="true"><g class="edges">${a.edges.map(e =>
        `<g class="edge" data-edge="${e.id}"><path class="wire"></path><path class="head"></path><path class="flow"></path><text></text></g>`).join('')}
        <g class="packet"><rect rx="7"></rect><text></text></g></g></svg>`;

  const jsonSafe = o => JSON.stringify(o)
    .replace(/</g, '\\u003c').replace(/>/g, '\\u003e')
    .replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');

  const runtime = jsonSafe({
    edges: a.edges.map(e => ({ id: e.id, from: e.from, to: e.to, a: e.a, b: e.b, label: e.label, packet: e.packet })),
    steps: a.steps.map(s => ({ t: s.t, edge: s.edge || null, hl: s.hl || {} })),
  });

  return `<!DOCTYPE html>
<html lang="en" data-lang="en" dir="ltr" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(a.title.en.replace(/<[^>]+>/g, ''))} — The Angular Signal</title>
<meta name="description" content="${esc(a.lead.en.replace(/<[^>]+>/g, '').slice(0, 180))}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${FONTS}" rel="stylesheet">
<style>
:root{--c:var(${a.track.ink})}
${CSS}</style>
${BOOT}
</head>
<body>
${chrome(a.track.id)}
<main class="page" id="page">

  <div class="eyebrow">
    <span class="num seq">${a.num} / ${String(FLAT.length).padStart(2, '0')}</span>
    <span class="badge">${bi(a.badge)}</span>
    <span class="num">${bi(a.track.name)}</span>
  </div>
  <h1 class="title">${bi(a.title)}</h1>
  <p class="lead">${bi(a.lead)}</p>

  <div class="stage">${svg}${rows}</div>

  <div class="stepbar">
    <div class="dots">${a.steps.map((_, k) => `<button class="dot" data-step="${k}" aria-label="step ${k + 1}"></button>`).join('')}</div>
    <div class="cap"></div>
    <button class="iconbtn" data-replay>&#9654;<span class="l-en"> Replay</span><span class="l-ar"> إعادة</span></button>
  </div>

  <p class="sechead"><span class="l-en">The files, line by line</span><span class="l-ar">الملفات، سطر سطر</span></p>
  <div class="files">${a.files.map(codeCard).join('')}</div>

  ${(Array.isArray(a.example) ? a.example : [a.example]).map((ex, k) => `
  <div class="example">
    <div class="exhead">
      <span class="extag"><span class="l-en">Real example${k ? ' ' + (k + 1) : ''}</span><span class="l-ar">مثال حقيقي${k ? ' ' + (k + 1) : ''}</span></span>
      <b>${bi(ex.name)}</b>
    </div>
    <p class="exlead">${bi(ex.what)}</p>
    <div class="files">${ex.files.map(codeCard).join('')}</div>
  </div>`).join('')}

  <div class="gotchas">
    <h4><span class="l-en">Watch out</span><span class="l-ar">خد بالك</span></h4>
    <ul>${a.gotchas.map(g => `<li>${bi(g)}</li>`).join('')}</ul>
  </div>

  <nav class="pager">
    ${prev ? `<a class="pv" href="${href(prev, true)}"><em>&larr; <span class="l-en">Previous</span><span class="l-ar">السابق</span></em><b>${bi(prev.title)}</b></a>` : '<div class="void"></div>'}
    ${next ? `<a class="nx" href="${href(next, true)}"><em><span class="l-en">Next</span><span class="l-ar">التالي</span> &rarr;</em><b>${bi(next.title)}</b></a>` : '<div class="void"></div>'}
  </nav>
</main>

<script>
const D = ${runtime};
const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const page = $('#page');
function relayout(){ requestAnimationFrame(layout); }

${UI_JS}

/* ---------- edge geometry ---------- */
function anchorPt(r, side, base){
  const x = r.left - base.left, y = r.top - base.top, w = r.width, h = r.height;
  if (side === 'left')  return { x: x,         y: y + h / 2, nx: -1, ny: 0 };
  if (side === 'right') return { x: x + w,     y: y + h / 2, nx:  1, ny: 0 };
  if (side === 'top')   return { x: x + w / 2, y: y,         nx: 0, ny: -1 };
  return                       { x: x + w / 2, y: y + h,     nx: 0, ny:  1 };
}

function layout(){
  const stage = $('.stage'), svg = $('.stage svg');
  if (!stage) return;
  const base = stage.getBoundingClientRect();
  svg.setAttribute('width', base.width);
  svg.setAttribute('height', base.height);
  D.edges.forEach(e => {
    const a = $('[data-node="' + e.from + '"]'), b = $('[data-node="' + e.to + '"]');
    if (!a || !b) return;
    const p1 = anchorPt(a.getBoundingClientRect(), e.a, base);
    const p2 = anchorPt(b.getBoundingClientRect(), e.b, base);
    const d = Math.hypot(p2.x - p1.x, p2.y - p1.y);
    const k = Math.max(40, Math.min(140, d * 0.45));
    const g = $('[data-edge="' + e.id + '"]');
    const wire = $('.wire', g), flow = $('.flow', g), head = $('.head', g), txt = $('text', g);
    const dd = 'M' + p1.x + ',' + p1.y + ' C' + (p1.x + p1.nx * k) + ',' + (p1.y + p1.ny * k) +
               ' ' + (p2.x + p2.nx * k) + ',' + (p2.y + p2.ny * k) + ' ' + p2.x + ',' + p2.y;
    wire.setAttribute('d', dd);
    flow.setAttribute('d', dd);
    const L = wire.getTotalLength();
    const end = wire.getPointAtLength(Math.max(0, L - 1));
    const pre = wire.getPointAtLength(Math.max(0, L - 12));
    const ang = Math.atan2(end.y - pre.y, end.x - pre.x), A = 0.42, r = 9;
    head.setAttribute('d',
      'M' + end.x + ',' + end.y +
      ' L' + (end.x - r * Math.cos(ang - A)) + ',' + (end.y - r * Math.sin(ang - A)) +
      ' L' + (end.x - r * Math.cos(ang + A)) + ',' + (end.y - r * Math.sin(ang + A)) + ' Z');
    const mid = wire.getPointAtLength(L * 0.5);
    txt.setAttribute('x', mid.x);
    txt.setAttribute('y', mid.y - 9);
    txt.setAttribute('text-anchor', 'middle');
    txt.textContent = e.label;
  });
}

/* ---------- steps ---------- */
let RUN = 0, step = 0;

function fly(edgeId, token){
  return new Promise(res => {
    const g = $('[data-edge="' + edgeId + '"]'), wire = $('.wire', g);
    const pk = $('.packet'), rect = $('rect', pk), txt = $('text', pk);
    const e = D.edges.find(x => x.id === edgeId);
    txt.textContent = e.packet || e.label;
    txt.setAttribute('text-anchor', 'middle');
    txt.setAttribute('x', 0); txt.setAttribute('y', 4);
    const w = Math.max(38, txt.getComputedTextLength() + 20);
    rect.setAttribute('x', -w / 2); rect.setAttribute('y', -12);
    rect.setAttribute('width', w);  rect.setAttribute('height', 24);
    const L = wire.getTotalLength();
    if (REDUCED || !L) { pk.style.opacity = 0; return res(); }
    const dur = 900, t0 = performance.now();
    (function frame(now){
      if (token !== RUN) { pk.style.opacity = 0; return res(); }
      const t = Math.min(1, (now - t0) / dur);
      const q = t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const p = wire.getPointAtLength(q * L);
      pk.setAttribute('transform', 'translate(' + p.x + ',' + p.y + ')');
      pk.style.opacity = t < .1 ? t / .1 : t > .9 ? (1 - t) / .1 : 1;
      if (t < 1) requestAnimationFrame(frame);
      else { pk.style.opacity = 0; res(); }
    })(performance.now());
  });
}

function paint(i){
  $$('.hl').forEach(n => n.classList.remove('hl'));
  $$('.fc.active,.node.active').forEach(n => n.classList.remove('active'));
  $$('.dot').forEach((d, k) => d.classList.toggle('on', k === i));
  const s = D.steps[i];
  $('.cap').innerHTML =
    '<span class="n">' + String(i + 1).padStart(2, '0') + '/' + String(D.steps.length).padStart(2, '0') + '</span>' +
    '<span class="l-en">' + s.t.en + '</span><span class="l-ar" dir="auto">' + s.t.ar + '</span>';
  D.edges.forEach(e => {
    const lit = D.steps.slice(0, i + 1).some(st => st.edge === e.id);
    $('[data-edge="' + e.id + '"]').classList.toggle('lit', lit);
  });
  const touched = new Set();
  Object.entries(s.hl).forEach(([fid, lines]) => {
    const card = $('[data-file="' + fid + '"]');
    if (card) {
      card.classList.add('active');
      lines.forEach(l => { const n = $('[data-l="' + l + '"]', card); if (n) n.classList.add('hl'); });
    }
    touched.add(fid);
  });
  if (s.edge) { const e = D.edges.find(x => x.id === s.edge); touched.add(e.from); touched.add(e.to); }
  touched.forEach(id => { const n = $('[data-node="' + id + '"]'); if (n) n.classList.add('active'); });
}

async function goStep(i, animate = true){
  step = Math.max(0, Math.min(D.steps.length - 1, i));
  const token = ++RUN;
  paint(step);
  if (animate && D.steps[step].edge) await fly(D.steps[step].edge, token);
}

async function play(){
  const token = ++RUN;
  for (let i = 0; i < D.steps.length; i++){
    if (token !== RUN) return;
    step = i; paint(i);
    if (D.steps[i].edge) await fly(D.steps[i].edge, token);
    else await new Promise(r => setTimeout(r, REDUCED ? 0 : 620));
    if (token !== RUN) return;
    if (i < D.steps.length - 1) await new Promise(r => setTimeout(r, REDUCED ? 0 : 520));
  }
}

document.addEventListener('click', e => {
  const dot = e.target.closest('.dot');
  if (dot) { RUN++; return goStep(+dot.dataset.step); }
  if (e.target.closest('[data-replay]')) play();
});
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') { RUN++; goStep(step + 1); }
  else if (e.key === 'ArrowLeft') { RUN++; goStep(step - 1, false); }
  else if (e.key.toLowerCase() === 'r') play();
});

let rt;
addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(layout, 140); });
if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);

layout();
paint(0);
new IntersectionObserver((en, o) => {
  if (en[0].isIntersecting) { o.disconnect(); layout(); play(); }
}, { threshold: .25 }).observe($('.stage'));
</script>
</body>
</html>`;
}


/* ---------- the TypeScript reference page ---------- */
function docBlock(b) {
  if (b.t === 'p')  return `<p>${bi(b)}</p>`;
  if (b.t === 'ul') return `<ul>${b.en.map((_, k) =>
      `<li><span class="l-en">${b.en[k]}</span><span class="l-ar" dir="auto">${b.ar[k]}</span></li>`).join('')}</ul>`;
  if (b.t === 'note') return `<div class="note">${b.label ? `<b class="lbl">${bi(b.label)}</b>` : ''}<p>${bi(b)}</p></div>`;
  if (b.t === 'code') return `
      <div class="code" data-lang="${b.lang}">
        <div class="fc-h"><span class="d"></span>${esc(b.name)}<span class="tag">${bi(b.tag || '')}</span></div>
        <pre>${hlLines(b.code, b.lang).map(l => `<span class="ln">${l || ' '}</span>`).join('')}</pre>
      </div>`;
  if (b.t === 'pair') return `<div class="pair">
      <div class="code bad" data-lang="ts">
        <div class="fc-h"><span class="d"></span>${esc(b.bad.name)}<span class="flag"><span class="l-en">avoid</span><span class="l-ar">تجنّب</span></span></div>
        <pre>${hlLines(b.bad.code, 'ts').map(l => `<span class="ln">${l || ' '}</span>`).join('')}</pre>
      </div>
      <div class="code good" data-lang="ts">
        <div class="fc-h"><span class="d"></span>${esc(b.good.name)}<span class="flag"><span class="l-en">do this</span><span class="l-ar">اعمل كده</span></span></div>
        <pre>${hlLines(b.good.code, 'ts').map(l => `<span class="ln">${l || ' '}</span>`).join('')}</pre>
      </div>
    </div>`;
  if (b.t === 'tbl') return `<div class="dtbl-wrap"><table class="dtbl">
      <thead><tr>${b.head.en.map((h, k) =>
        `<th><span class="l-en">${h}</span><span class="l-ar" dir="auto">${b.head.ar[k]}</span></th>`).join('')}</tr></thead>
      <tbody>${b.rows.map(r => `<tr>${r.en.map((c, k) =>
        `<td><span class="l-en">${c}</span><span class="l-ar" dir="auto">${r.ar[k]}</span></td>`).join('')}</tr>`).join('')}</tbody>
    </table></div>`;
  return '';
}

function docPage() {
  const rail = DOC.sections.map((sec, k) =>
    `<li><a href="#${sec.id}" data-rail="${sec.id}"><em>${String(k + 1).padStart(2, '0')}</em><span>${bi(sec.title).replace(/<code>|<\/code>/g, '')}</span></a></li>`).join('');

  const body = DOC.sections.map(sec => `
      <section class="sec" id="${sec.id}">
        <div class="sec-kick">${bi(sec.kicker)}</div>
        <h2>${bi(sec.title)}</h2>
        <p class="sec-lead">${bi(sec.lead)}</p>
        ${sec.blocks.map(docBlock).join('')}
      </section>`).join('');

  return `<!DOCTYPE html>
<html lang="en" data-lang="en" dir="ltr" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>TypeScript for Angular</title>
<meta name="description" content="${esc(DOC.lead.en.replace(/<[^>]+>/g, '').slice(0, 180))}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${FONTS}" rel="stylesheet">
<style>
:root{--c:var(--ts)}
${CSS}</style>
${BOOT}
</head>
<body>
${chrome('typescript', '')}
<main class="page" id="page">
  <div class="eyebrow">
    <span class="num seq">00</span>
    <span class="badge"><span class="l-en">Prerequisite</span><span class="l-ar">قبل ما تبدأ</span></span>
    <span class="num"><span class="l-en">Read this first</span><span class="l-ar">اقرا دي الأول</span></span>
  </div>
  <h1 class="title">${bi(DOC.title)}</h1>
  <p class="lead">${bi(DOC.lead)}</p>

  <div class="doc">
    <nav class="doc-rail">
      <b><span class="l-en">On this page</span><span class="l-ar">في الصفحة دي</span></b>
      <ol>${rail}</ol>
    </nav>
    <div>${body}</div>
  </div>

  <nav class="pager">
    <div class="void"></div>
    <a class="nx" href="${FLAT[0].track.id}/${FLAT[0].slug}.html">
      <em><span class="l-en">Start the magazine</span><span class="l-ar">ابدأ المجلة</span> &rarr;</em>
      <b>${bi(FLAT[0].title)}</b>
    </a>
  </nav>
</main>

<script>
const $ = (s, r = document) => r.querySelector(s);
${UI_JS}

/* highlight the section you are reading */
const links = new Map([...document.querySelectorAll('[data-rail]')].map(a => [a.dataset.rail, a]));
const secs = [...document.querySelectorAll('.sec')];
const seen = new Set();
const spy = new IntersectionObserver(entries => {
  for (const e of entries) {
    if (e.isIntersecting) seen.add(e.target.id); else seen.delete(e.target.id);
  }
  const first = secs.find(sec => seen.has(sec.id));
  links.forEach(a => a.classList.remove('on'));
  if (first) { const a = links.get(first.id); if (a) a.classList.add('on'); }
}, { rootMargin: '-70px 0px -60% 0px' });
secs.forEach(sec => spy.observe(sec));
</script>
</body>
</html>`;
}


/* ---------- the learning-path page ---------- */
function mapPage() {
  const phases = MAP.phases.map(ph => {
    let list;
    if (ph.source === 'typescript') {
      list = `<a href="typescript-for-angular.html"><em>00</em><span>${bi(DOC.title)}</span></a>`;
    } else {
      const t = TRACKS.find(x => x.id === ph.source);
      list = t.arts.map(a =>
        `<a href="${t.id}/${a.slug}.html"><em>${a.num}</em><span>${bi(a.title)}</span></a>`).join('');
    }
    const ink = ph.source === 'typescript' ? '--ts'
              : (TRACKS.find(x => x.id === ph.source) || {}).ink;
    return `
      <div class="phase" style="--c:var(${ink})">
        <div class="phase-h">
          <span class="phase-n">${ph.n}</span>
          <h3>${bi(ph.title)}</h3>
          <span class="phase-when">${bi(ph.when)}</span>
        </div>
        <p class="phase-goal">${bi(ph.goal)}</p>
        <div class="phase-list">${list}</div>
        <div class="phase-build">
          <b><span class="l-en">Build this</span><span class="l-ar">ابني ده</span></b>
          <p>${bi(ph.build)}</p>
        </div>
      </div>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en" data-lang="en" dir="ltr" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>The Angular learning path</title>
<meta name="description" content="An honest route from knowing nothing to being genuinely useful in Angular — what this magazine covers, what it does not, and how long it really takes.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${FONTS}" rel="stylesheet">
<style>
:root{--c:var(--beg)}
${CSS}</style>
${BOOT}
</head>
<body>
${chrome('roadmap', '')}
<main class="page" id="page">
  <div class="eyebrow">
    <span class="badge"><span class="l-en">Read me first</span><span class="l-ar">اقرا دي الأول</span></span>
  </div>
  <h1 class="title">${bi(MAP.title)}</h1>
  <p class="lead">${bi(MAP.lead)}</p>

  <div class="verdict">
    ${MAP.verdict.map(v => `<div><b>${bi(v.k)}</b><p>${bi(v.v)}</p></div>`).join('')}
  </div>

  <p class="sechead"><span class="l-en">The order to do it in</span><span class="l-ar">الترتيب اللي تمشي بيه</span></p>
  ${phases}

  <p class="sechead" style="margin-top:44px"><span class="l-en">The rest of the road</span><span class="l-ar">باقي الطريق</span></p>
  <p style="color:var(--mut);max-width:74ch;margin:0 0 4px">
    <span class="l-en">Every topic in the three tracks above is written. These are what is still open — the first group can be added in the same format on request; the second group cannot be written by anybody, only earned.</span>
    <span class="l-ar" dir="auto">كل موضوع في التلات مستويات اللي فوق مكتوب. ودي اللي لسه مفتوح — المجموعة الأولى تتضاف بنفس الشكل لو طلبت؛ والتانية محدش يقدر يكتبها، بتتكسب بس.</span>
  </p>
  <div class="gap">
    ${MAP.missing.map(g => `<section><h4>${bi(g.group)}</h4><ul>${g.items.map(i => `<li>${bi(i)}</li>`).join('')}</ul></section>`).join('')}
  </div>

  <p class="sechead" style="margin-top:44px"><span class="l-en">How to actually study this</span><span class="l-ar">إزاي تذاكر ده فعلاً</span></p>
  <div class="advice">
    ${MAP.advice.map(a => `<div><b>${bi(a.k)}</b><p>${bi(a.v)}</p></div>`).join('')}
  </div>

  <nav class="pager">
    <div class="void"></div>
    <a class="nx" href="typescript-for-angular.html">
      <em><span class="l-en">Start at phase 00</span><span class="l-ar">ابدأ من المرحلة 00</span> &rarr;</em>
      <b>${bi(DOC.title)}</b>
    </a>
  </nav>
</main>

<script>
const $ = (s, r = document) => r.querySelector(s);
${UI_JS}
</script>
</body>
</html>`;
}

/* ---------- the contents page ---------- */
function index() {
  const cols = TRACKS.map(t => `
      <section class="tcol" style="--c:var(${t.ink})">
        <div class="thead">
          <span class="tkick">${bi(t.kicker)}</span>
          <h2>${bi(t.name)}</h2>
          <p>${bi(t.dek)}</p>
        </div>
        <ol>${t.arts.map(a => `
          <li><a href="${t.id}/${a.slug}.html">
            <em>${a.num}</em>
            <span><b>${bi(a.title)}</b><i>${bi(a.badge)}</i></span>
          </a></li>`).join('')}
        </ol>
      </section>`).join('');

  return `<!DOCTYPE html>
<html lang="en" data-lang="en" dir="ltr" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>The Angular Signal — contents</title>
<meta name="description" content="A bilingual Angular magazine: fifteen topics across beginner, intermediate and advanced tracks, in English and Egyptian Arabic.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${FONTS}" rel="stylesheet">
<style>
:root{--c:var(--adv)}
${CSS}
.cover{max-width:1220px;margin:0 auto;padding:clamp(30px,6vw,74px) clamp(16px,3.4vw,40px) 0}
.cover .kick{font-family:var(--mono);font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--dim);display:flex;gap:22px;flex-wrap:wrap;margin-bottom:20px}
.cover h1{font-family:var(--disp);font-weight:800;font-size:clamp(38px,7.4vw,86px);line-height:.96;letter-spacing:-.04em;margin:0 0 18px;text-wrap:balance}
.cover h1 em{font-style:normal;background:linear-gradient(92deg,#e40035,#f20089 45%,#9717e2);-webkit-background-clip:text;background-clip:text;color:transparent}
:root[dir="rtl"] .cover h1{line-height:1.24;letter-spacing:0;font-size:clamp(32px,6vw,68px)}
.cover p.intro{color:var(--mut);font-size:17px;max-width:62ch;margin:0 0 8px;text-wrap:pretty}
.tgrid{max-width:1220px;margin:0 auto;padding:clamp(26px,4vw,52px) clamp(16px,3.4vw,40px) 60px;display:grid;gap:clamp(18px,2.4vw,30px);grid-template-columns:repeat(3,minmax(0,1fr))}
@media (max-width:900px){.tgrid{grid-template-columns:1fr}}
.tcol{border-top:3px solid var(--c);padding-top:16px;min-width:0}
.tcol .tkick{font-family:var(--mono);font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--dim)}
:root[dir="rtl"] .tcol .tkick{font-family:var(--body);letter-spacing:0;text-transform:none;font-size:12px}
.tcol h2{font-family:var(--disp);font-weight:800;font-size:26px;letter-spacing:-.025em;color:var(--c);margin:5px 0 7px;line-height:1.1}
:root[dir="rtl"] .tcol h2{letter-spacing:0;line-height:1.35}
.tcol > .thead p{margin:0 0 14px;font-size:13.5px;color:var(--dim);line-height:1.6;text-wrap:pretty}
.tcol ol{list-style:none;margin:0;padding:0}
.tcol li{border-top:1px solid var(--line2)}
.tcol a{display:grid;grid-template-columns:2rem 1fr;gap:10px;align-items:baseline;text-decoration:none;padding:11px 0;transition:.18s}
.tcol a em{font-family:var(--mono);font-style:normal;font-size:11px;color:var(--dim)}
.tcol a b{display:block;font-size:14.5px;font-weight:600;color:var(--ink);line-height:1.35;text-wrap:pretty}
.tcol a b code{font-family:var(--mono);font-size:.86em;color:var(--c)}
.tcol a i{display:block;font-style:normal;font-family:var(--mono);font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--dim);margin-top:3px}
:root[dir="rtl"] .tcol a i{font-family:var(--body);letter-spacing:0;text-transform:none;font-size:12px}
.tcol a:hover b{color:var(--c)}
.tcol a:hover em,.tcol a:hover i{color:var(--c)}
.prereq{max-width:1220px;margin:0 auto;padding:0 clamp(16px,3.4vw,40px) clamp(30px,4vw,52px);display:flex;flex-direction:column;gap:12px;align-items:stretch}
.prereq a{display:block;width:100%;text-decoration:none;border:1px solid var(--line2);border-left:3px solid var(--ts);border-radius:12px;padding:18px 22px;background:var(--card);transition:.22s;max-width:74ch}
:root[dir="rtl"] .prereq a{border-left:1px solid var(--line2);border-right:3px solid var(--ts)}
.prereq a:hover{background:var(--card2);border-color:color-mix(in srgb,var(--ts) 45%,transparent);border-left-color:var(--ts)}
.prereq .pk{display:block;font-family:var(--mono);font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--ts);margin-bottom:7px}
:root[dir="rtl"] .prereq .pk{font-family:var(--body);letter-spacing:0;text-transform:none;font-size:12px;font-weight:600}
.prereq b{display:block;font-family:var(--disp);font-weight:700;font-size:20px;letter-spacing:-.02em;color:var(--ink);margin-bottom:6px;line-height:1.25}
:root[dir="rtl"] .prereq b{letter-spacing:0;line-height:1.45}
.prereq .pw{display:block;color:var(--mut);font-size:14px;line-height:1.6}
.foot{max-width:1220px;margin:0 auto;padding:0 clamp(16px,3.4vw,40px) 60px;color:var(--dim);font-size:13px;border-top:1px solid var(--line2);padding-top:20px;display:grid;gap:14px 30px;grid-template-columns:repeat(auto-fit,minmax(230px,1fr))}
.foot b{display:block;font-family:var(--mono);font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--dim);margin-bottom:5px}
:root[dir="rtl"] .foot b{font-family:var(--body);letter-spacing:0;text-transform:none;font-size:12px}
.foot p{margin:0;color:var(--mut);line-height:1.6;text-wrap:pretty}
</style>
${BOOT}
</head>
<body>
<header class="top"><div class="top-in">
  <a class="home" href="index.html"><b>The Angular Signal</b><span class="l-en">issue 01</span><span class="l-ar">العدد 01</span></a>
  <nav class="tracknav">${TRACKS.map(t => `<a href="${t.id}/${t.arts[0].slug}.html" style="--c:var(${t.ink})"><i></i>${bi(t.name)}</a>`).join('')}</nav>
  <div class="top-right">
    ${SWITCHES}
  </div>
</div></header>

<div class="page" id="page">
  <div class="cover">
    <div class="kick">
      <span><span class="l-en">Issue 01 — the signals era</span><span class="l-ar">العدد 01 — عصر الـ signals</span></span>
      <span><span class="l-en">${FLAT.length} topics · 3 tracks</span><span class="l-ar">${FLAT.length} موضوع · 3 مستويات</span></span>
      <span dir="ltr">Angular v20+</span>
      <span dir="ltr">English / مصري</span>
    </div>
    <h1><span class="l-en">Angular, one <em>idea</em><br>at a time</span><span class="l-ar">أنجولار، <em>فكرة</em><br>واحدة في المرة</span></h1>
    <p class="intro l-en">Fifteen topics, each one its own page: the concept, an animated diagram of where the value actually travels, the real files line by line, a feature you would genuinely build, and the traps. Read it in English or flip to Egyptian Arabic — the switch is top right, and it stays switched.</p>
    <p class="intro l-ar" dir="auto">خمستاشر موضوع، كل واحد في صفحة لوحده: الفكرة، ورسمة متحركة بتوريك القيمة بتمشي فين بالظبط، والملفات الحقيقية سطر سطر، وفيتشر إنت فعلاً هتبنيه، والفخاخ اللي مستنياك. اقرا بالإنجليزي أو لُف على المصري — السويتش فوق على الشمال، وبيفضل محفوظ.</p>
  </div>

  <div class="tgrid">${cols}</div>

  <div class="prereq">
    <a href="roadmap.html" style="border-left-color:var(--beg)">
      <span class="pk" style="color:var(--beg)"><span class="l-en">New to Angular? Start here</span><span class="l-ar">جديد في أنجولار؟ ابدأ من هنا</span></span>
      <b><span class="l-en">The learning path — and how long it really takes</span><span class="l-ar">خطة التعلّم — وبتاخد قد إيه فعلاً</span></b>
      <span class="pw"><span class="l-en">Which topics to read in which order, what to build after each phase, and an honest list of what this magazine does <em>not</em> cover yet.</span><span class="l-ar" dir="auto">تقرا أنهي مواضيع وبأي ترتيب، وتبني إيه بعد كل مرحلة، ولستة صريحة باللي المجلة <em>لسه</em> مش بتغطيه.</span></span>
    </a>
    <a href="typescript-for-angular.html">
      <span class="pk"><span class="l-en">Before you start</span><span class="l-ar">قبل ما تبدأ</span></span>
      <b><span class="l-en">TypeScript, only the parts Angular uses</span><span class="l-ar">TypeScript، بس الأجزاء اللي أنجولار بيستخدمها</span></b>
      <span class="pw"><span class="l-en">Every Angular file is a TypeScript file. Fourteen sections, from zero — types, interfaces, generics, <code>strict</code> mode, and the six errors you will actually hit.</span><span class="l-ar" dir="auto">كل ملف أنجولار هو ملف TypeScript. أربعتاشر قسم من الصفر — الأنواع، والـ interfaces، والـ generics، و<code>strict</code> mode، والست غلطات اللي هتقابلك فعلاً.</span></span>
    </a>
  </div>

  <div class="foot">
    <div><b><span class="l-en">How to read a page</span><span class="l-ar">إزاي تقرا الصفحة</span></b>
      <p><span class="l-en">The diagram plays itself once. Click a dot, press &larr; / &rarr;, or hit R to replay — each step lights the wire and highlights the exact lines involved.</span><span class="l-ar" dir="auto">الرسمة بتشتغل لوحدها مرة. دوس على نقطة، أو استعمل &larr; / &rarr;، أو اضغط R للإعادة — كل خطوة بتنوّر السلك وبتعلّم على السطور المعنية بالظبط.</span></p></div>
    <div><b><span class="l-en">Both editions</span><span class="l-ar">النسختين</span></b>
      <p><span class="l-en">Every page carries the English and the Egyptian Arabic text. Code, file names and diagrams stay left to right in both.</span><span class="l-ar" dir="auto">كل صفحة فيها النص بالإنجليزي وبالمصري. الكود وأسماء الملفات والرسومات بتفضل من الشمال لليمين في الاتنين.</span></p></div>
    <div><b><span class="l-en">Companion</span><span class="l-ar">ملف مصاحب</span></b>
      <p><span class="l-en">Chasing a value between two components? <a href="angular-data-flow.html">Angular data flow</a> covers the nine communication channels in the same format.</span><span class="l-ar" dir="auto">بتدوّر على قيمة بين اتنين components؟ ملف <a href="angular-data-flow.html">Angular data flow</a> بيغطي التسع قنوات بنفس الشكل ده.</span></p></div>
  </div>
</div>

<script>
${UI_JS}
</script>
</body>
</html>`;
}

/* ---------- write ---------- */
for (const t of TRACKS) {
  rmSync(join(ROOT, t.id), { recursive: true, force: true });
  mkdirSync(join(ROOT, t.id), { recursive: true });
}
FLAT.forEach((a, i) => {
  writeFileSync(join(ROOT, a.track.id, a.slug + '.html'), page(a, i));
});
writeFileSync(join(ROOT, 'typescript-for-angular.html'), docPage());
writeFileSync(join(ROOT, 'roadmap.html'), mapPage());
writeFileSync(join(ROOT, 'index.html'), index());

console.log('built ' + FLAT.length + ' topic pages + roadmap.html + typescript-for-angular.html + index.html');
TRACKS.forEach(t => console.log('  ' + t.id + '/  → ' + t.arts.map(a => a.slug).join(', ')));
