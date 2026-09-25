/* ------------------------------------------------------------------
   "Which names are yours?" — the naming layer on every code sample.

   Every topic can list the names that appear in its code, each with a
   kind:
     ng    Angular's (or TypeScript's, or the browser's) word. Type it
           exactly; renaming it breaks the code.
     mine  a name you invented that only this component uses. Rename it
           freely, as long as every use inside the component follows.
     pub   a name you invented that another file also types: an output
           the parent listens to, a selector, a route param. Rename it on
           both sides together.

   From that list the build (1) colours every occurrence in the code,
   (2) makes a second copy of each line with every `mine`/`pub` name
   swapped for a made-up word — the "rename test" — and (3) builds the
   table of names, including which files each one appears in.

   Optional per name:
     re    a regex source to match instead of the whole word
     only  match only in these files (id or name) or languages
     not   never match in these files or languages
     as    the rename-test word, when a rule links spellings
           (size / sizeChange → banana / bananaChange)
   ------------------------------------------------------------------ */
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { hlLines, esc } from './hl.mjs';

export const KINDS = ['ng', 'mine', 'pub'];

/* made-up words for the rename test: obviously not Angular, obviously not meaningful */
const WORDS = ['banana', 'potato', 'mango', 'pickle', 'waffle', 'noodle', 'pumpkin', 'turnip',
  'muffin', 'taco', 'kiwi', 'donut', 'pepper', 'lemon', 'carrot', 'biscuit', 'olive', 'cookie',
  'melon', 'radish', 'falafel', 'koshary', 'feteer', 'basbousa'];

/* esc() leaves " alone; inside an attribute it must not */
const attr = s => esc(s).replace(/"/g, '&quot;');
const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/* every *.mjs in content/names/ is one part; keys are base slugs (or a doc id) */
export async function loadNames(dir) {
  const all = {}, problems = [];
  for (const f of readdirSync(dir).filter(f => f.endsWith('.mjs')).sort()) {
    const part = (await import(pathToFileURL(join(dir, f)).href)).default;
    for (const [k, v] of Object.entries(part)) {
      if (all[k]) problems.push(`"${k}" is defined twice (again in ${f})`);
      all[k] = v;
      problems.push(...checkEntry(k, v));
    }
  }
  return { all, problems };
}

/* a names entry must have a kind and both languages on every row */
export function checkEntry(k, v) {
  const problems = [];
  if (!v || !Array.isArray(v.names)) return [k + ': names must be an array'];
  v.names.forEach((x, i) => {
    const at = `${k} #${i + 1} ${x && x.n ? '"' + x.n + '"' : ''}`;
    if (!x || !x.n) problems.push(at + ': missing n');
    else if (!KINDS.includes(x.k)) problems.push(at + ': k must be ng, mine or pub');
    else if (!x.w || !x.w.en || !x.w.ar) problems.push(at + ': w needs en and ar');
    if (x && x.re) { try { new RegExp(x.re); } catch (e) { problems.push(at + ': bad re'); } }
  });
  return problems;
}

/* compile one topic's list: a matcher per name and its rename-test word */
export function prepNames(entry, codeText) {
  const list = entry.names || [];
  /* explicit words are reserved first, so an automatic one never repeats them */
  const taken = new Set(list.filter(x => x.as).map(x => x.as.toLowerCase()));
  let wi = 0;
  const nextWord = () => {
    for (;;) {
      const round = Math.floor(wi / WORDS.length);
      const w = WORDS[wi++ % WORDS.length] + (round ? round + 1 : '');
      if (!taken.has(w) && !new RegExp('\\b' + w + '\\b', 'i').test(codeText)) { taken.add(w); return w; }
    }
  };
  return list.map(x => {
    const re = new RegExp(x.re || ('(?<![\\w$-])' + reEsc(x.n) + '(?![\\w$-])'), 'g');
    let as = null;
    if (x.k !== 'ng') {
      as = x.as;
      if (!as) {
        const w = nextWord();
        as = /^[A-Z]/.test(x.n) ? w[0].toUpperCase() + w.slice(1)
           : x.n.startsWith('--') ? '--' + w                 /* a CSS custom property */
           : x.n.startsWith('#') ? '#' + w                   /* a template reference */
           : x.n.includes('-') ? x.n.split('-')[0] + '-' + w
           : w;
        if (x.n.endsWith('$')) as += '$';          /* keep the stream convention */
      }
    }
    return { ...x, re, as, hits: new Set() };
  });
}

/* one highlighted line → { a: coloured, b: coloured + renamed } */
function markLine(raw, html, names, fileName, masked = []) {
  const ranges = [];
  for (const x of names) {
    x.re.lastIndex = 0;
    let m;
    while ((m = x.re.exec(raw)) !== null) {
      if (!m[0]) { x.re.lastIndex++; continue; }
      if (!masked.some(([a, b]) => m.index >= a && m.index < b)) ranges.push({ s: m.index, e: m.index + m[0].length, x, t: m[0] });
    }
  }
  if (!ranges.length) return { a: html, b: html };
  ranges.sort((p, q) => p.s - q.s || (q.e - q.s) - (p.e - p.s));
  const keep = [];
  let end = -1;
  for (const r of ranges) if (r.s >= end) { keep.push(r); end = r.e; }

  const tagOpen = x => `<b class="nm nm-${x.k}" data-nm="${attr(x.n)}">`;
  let a = '', b = '', pos = 0, ri = 0, inCom = false, open = null, i = 0;
  while (i < html.length) {
    if (html[i] === '<') {                       /* a highlighter tag: copy it through */
      const j = html.indexOf('>', i);
      const tag = html.slice(i, j + 1);
      if (tag.startsWith('<i ')) inCom = tag.includes('t-com');
      else if (tag === '</i>') inCom = false;
      if (open) { a += '</b>' + tag + tagOpen(open.x); b += open.skip ? tag : '</b>' + tag + tagOpen(open.x); }
      else { a += tag; b += tag; }
      i = j + 1;
      continue;
    }
    if (!open && ri < keep.length && pos === keep[ri].s) {
      const r = keep[ri++];
      if (!inCom) {                               /* names in comments stay plain */
        open = { x: r.x, e: r.e, skip: !!r.x.as };
        r.x.hits.add(fileName);
        a += tagOpen(r.x);
        /* '#box' also matched as the bare 'box' in viewChild('box'): no # there */
        const word = r.x.as && r.x.as.startsWith('#') && !r.t.startsWith('#') ? r.x.as.slice(1) : r.x.as;
        b += tagOpen(r.x) + (word ? esc(word) + '</b>' : '');
      }
    }
    while (ri < keep.length && keep[ri].s < pos) ri++;
    const len = html[i] === '&' ? html.indexOf(';', i) - i + 1 : 1;
    const ch = html.slice(i, i + len);
    a += ch;
    if (!(open && open.skip)) b += ch;
    i += len;
    pos++;
    if (open && pos === open.e) {
      a += '</b>';
      if (!open.skip) b += '</b>';
      open = null;
    }
  }
  return { a, b };
}

/* The highlighter works one line at a time, so it only knows a comment that
   opens and closes on the same line. This finds the rest: the inner lines of
   a multi-line /* … *\/ or <!-- … -->, and # comments in shell files.
   Returns, per line, the [start, end) ranges no name may start in. */
function commentMasks(lines, lang) {
  let close = null;
  return lines.map(line => {
    const out = [];
    let i = 0;
    if (close) {
      const e = line.indexOf(close);
      if (e === -1) return [[0, line.length]];
      out.push([0, e + close.length]);
      i = e + close.length;
      close = null;
    }
    if (lang === 'bash') {
      const h = line.search(/(^|\s)#/);
      if (h !== -1) out.push([h, line.length]);
      return out;
    }
    if (!['ts', 'js', 'html', 'css', 'scss'].includes(lang)) return out;
    /* an opener inside quotes ('/api/*') is text, not a comment */
    const quoted = at => ((line.slice(0, at).match(/'/g) || []).length % 2) || ((line.slice(0, at).match(/"/g) || []).length % 2);
    const find = (tok, from) => { let k = line.indexOf(tok, from); while (k !== -1 && quoted(k)) k = line.indexOf(tok, k + 1); return k; };
    while (i < line.length) {
      const o1 = lang === 'html' ? -1 : find('/*', i), o2 = lang === 'css' || lang === 'scss' ? -1 : find('<!--', i);
      const cands = [[o1, '*/', 2], [o2, '-->', 4]].filter(c => c[0] !== -1).sort((p, q) => p[0] - q[0]);
      if (!cands.length) break;
      const [o, c, len] = cands[0];
      const e = line.indexOf(c, o + len);
      if (e === -1) { out.push([o, line.length]); close = c; break; }
      out.push([o, e + c.length]);
      i = e + c.length;
    }
    return out;
  });
}

/* a file's lines, highlighted and marked. Returns ready-to-print line HTML. */
export function markLines(lines, lang, names, fileName, fileId) {
  const hl = hlLines(lines, lang);
  if (!names || !names.length) return hl;
  const hit = (list, ...keys) => keys.some(k => list.includes(k));
  const use = names.filter(x => (!x.only || hit(x.only, lang, fileId, fileName)) && !(x.not && hit(x.not, lang, fileId, fileName)));
  const masks = commentMasks(lines, lang);
  return hl.map((h, k) => {
    const { a, b } = markLine(lines[k], h, use, fileName, masks[k]);
    return a === b ? a : `<span class="v0">${a}</span><span class="v1">${b}</span>`;
  });
}

/* ---------- what the page prints ---------- */
const bi = o => `<span class="l-en">${o.en}</span><span class="l-ar" dir="auto">${o.ar}</span>`;

export const KIND_TXT = {
  ng:   { en: 'Angular’s word — type it exactly', ar: 'كلمة أنجولار — اكتبها زي ما هي بالظبط' },
  mine: { en: 'Your name — rename it freely', ar: 'اسمك انت — غيّره براحتك' },
  pub:  { en: 'Your name, but shared — rename both sides', ar: 'اسمك انت بس متشارك — غيّره في الناحيتين' },
};
const KIND_SHORT = {
  ng:   { en: 'No. It is Angular’s, TypeScript’s or the browser’s.', ar: 'لأ. ده بتاع أنجولار أو TypeScript أو المتصفح.' },
  mine: { en: 'Yes. Change every use inside this component.', ar: 'آه. غيّر كل مكان بيستخدمه جوه الـ component ده.' },
  pub:  { en: 'Yes, but the other file types it too. Change both.', ar: 'آه، بس الملف التاني كاتبه برضه. غيّر الاتنين.' },
};

/* the switch + legend that sits above the code */
export function namesBar() {
  return `
  <div class="nmbar">
    <div class="nmrow">
      <b class="nmlbl"><span class="l-en">Names in the code</span><span class="l-ar">الأسماء في الكود</span></b>
      <div class="seg nmseg" role="group" aria-label="Names in the code">
        <button data-nmode="off" aria-pressed="false"><span class="l-en">Plain</span><span class="l-ar">عادي</span></button>
        <button data-nmode="color" aria-pressed="true"><span class="l-en">Colour them</span><span class="l-ar">لوّنها</span></button>
        <button data-nmode="rename" aria-pressed="false"><span class="l-en">Rename test</span><span class="l-ar">جرّب تغيّر الأسماء</span></button>
      </div>
    </div>
    <div class="nmkey">
      <span><b class="nm nm-ng">output</b>${bi(KIND_TXT.ng)}</span>
      <span><b class="nm nm-mine">total</b>${bi(KIND_TXT.mine)}</span>
      <span><b class="nm nm-pub">deleted</b>${bi(KIND_TXT.pub)}</span>
    </div>
    <p class="nmhint nmh-color">${bi({
      en: 'Hover any coloured name to light up every other place it appears, in every file. Those places are what has to change together.',
      ar: 'قف بالماوس على أي اسم ملوّن وهتنوّر كل الأماكن التانية اللي هو فيها، في كل الملفات. الأماكن دي هي اللي لازم تتغير مع بعض.' })}</p>
    <p class="nmhint nmh-rename">${bi({
      en: 'Every name you own has been swapped for a made-up word. Angular’s words did not move. This code still compiles and still works. That is the proof of which names are yours.',
      ar: 'كل اسم انت اللي اخترته اتبدّل بكلمة عشوائية. كلمات أنجولار فضلت مكانها. الكود ده لسه بيشتغل عادي. وده الدليل إن الأسماء دي بتاعتك.' })}</p>
  </div>`;
}

/* the table of every name on the page */
export function namesTable(names, note) {
  const rows = names.filter(x => x.hits.size);
  if (!rows.length) return '';
  return `
  <p class="sechead"><span class="l-en">Every name on this page — yours or Angular’s?</span><span class="l-ar">كل اسم في الصفحة دي — بتاعك ولا بتاع أنجولار؟</span></p>
  ${note ? `<p class="nmnote">${bi(note)}</p>` : ''}
  <div class="dtbl-wrap"><table class="dtbl nmtbl">
    <thead><tr>
      <th><span class="l-en">Name</span><span class="l-ar">الاسم</span></th>
      <th><span class="l-en">Can you rename it?</span><span class="l-ar">ينفع تغيّره؟</span></th>
      <th><span class="l-en">What it is, and what changes with it</span><span class="l-ar">هو إيه، وإيه اللي بيتغير معاه</span></th>
      <th><span class="l-en">Appears in</span><span class="l-ar">موجود في</span></th>
    </tr></thead>
    <tbody>${rows.map(x => `
      <tr data-nmrow="${attr(x.n)}">
        <td><b class="nm nm-${x.k}" data-nm="${attr(x.n)}">${esc(x.n)}</b>${x.as ? `<span class="nmas">&rarr; <code>${esc(x.as)}</code></span>` : ''}</td>
        <td class="nmk nmk-${x.k}">${bi(KIND_SHORT[x.k])}</td>
        <td>${bi(x.w)}</td>
        <td class="nmfiles">${[...x.hits].map(f => `<code>${esc(f)}</code>`).join(' ')}</td>
      </tr>`).join('')}
    </tbody>
  </table></div>`;
}

/* runs on the page: remembers the mode, links hovers across files */
export const NAMES_JS = `
(function(){
  var r = document.documentElement;
  function setNames(m){
    r.dataset.names = m;
    try { localStorage.setItem('tas-names', m); } catch (e) {}
    document.querySelectorAll('[data-nmode]').forEach(function(b){ b.setAttribute('aria-pressed', String(b.dataset.nmode === m)); });
  }
  setNames(r.dataset.names || 'color');
  document.querySelectorAll('[data-nmode]').forEach(function(b){ b.addEventListener('click', function(){ setNames(b.dataset.nmode); }); });
  function light(n, on){
    document.querySelectorAll('[data-nm]').forEach(function(el){ if (el.dataset.nm === n) el.classList.toggle('on', on); });
    document.querySelectorAll('[data-nmrow]').forEach(function(el){ if (el.dataset.nmrow === n) el.classList.toggle('on', on); });
  }
  document.addEventListener('mouseover', function(e){
    var t = e.target.closest && e.target.closest('[data-nm],[data-nmrow]');
    if (!t) return;
    var n = t.dataset.nm || t.dataset.nmrow;
    light(n, true);
    t.addEventListener('mouseleave', function off(){ light(n, false); t.removeEventListener('mouseleave', off); });
  });
})();`;
