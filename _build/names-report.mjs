/* Show where every listed name matched, line by line, for one topic:
     node _build/names-report.mjs inputs-outputs
   Use it to catch false matches (a DOM .value coloured as yours, a word in
   a string that is not the name). Names inside comments are never matched. */
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadNames, prepNames, markLines } from './names.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
/* node _build/names-report.mjs <slug>          the topic page
   node _build/names-report.mjs --deep <slug>   its name-by-name page (content/deep/<slug>.mjs) */
const deep = process.argv[2] === '--deep';
const slug = process.argv[deep ? 3 : 2];
if (!slug) { console.error('usage: node _build/names-report.mjs [--deep] <base-slug>'); process.exit(1); }
const { all, problems } = await loadNames(join(HERE, 'content', 'names'));
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
let files, entry;
if (deep) {
  const d = (await import('./content/deep/' + slug + '.mjs')).default;
  entry = typeof d.names === 'string' ? all[d.names] : d.names;
  /* every code-carrying block, in page order, the way the build walks them */
  files = [];
  const walk = b => {
    if (b.t === 'code') files.push({ id: b.name, name: b.name, lang: b.lang, code: b.code });
    if (b.t === 'pair') for (const side of [b.bad, b.good]) files.push({ id: side.name, name: side.name, lang: side.lang || 'ts', code: side.code });
    if (b.t === 'chain') for (const it of b.items) files.push({ id: it.file, name: it.file, lang: it.lang, code: it.code });
    (b.blocks || []).forEach(walk);
  };
  d.sections.forEach(sec => sec.blocks.forEach(walk));
  entry = entry && { ...entry };
  if (entry) entry.__text = JSON.stringify(d);
} else {
  const tracks = await Promise.all(['beginner', 'intermediate', 'advanced'].map(t => import('./content/' + t + '.mjs')));
  const art = tracks.flatMap(t => t.default.arts).find(a => a.slug.replace(/^\d+-/, '') === slug);
  if (!art) { console.error('no topic with base slug ' + slug); process.exit(1); }
  entry = all[slug];
  files = [...art.files, ...(Array.isArray(art.example) ? art.example : [art.example]).flatMap(e => e.files)];
}
if (!entry) { console.error('no names entry for ' + slug); process.exit(1); }
const nm = prepNames(entry, entry.__text || files.map(f => f.code.join('\n')).join('\n'));
const strip = h => h.replace(/<span class="v1">.*?<\/span><\/span>|<span class="v1">[\s\S]*$/, '');
for (const f of files) {
  const out = markLines(f.code, f.lang, nm, f.name, f.id);
  console.log('\n== ' + f.name + '  [id ' + f.id + ']');
  out.forEach((h, i) => {
    const v0 = h.startsWith('<span class="v0">') ? h.slice(17, h.indexOf('</span><span class="v1">')) : h;
    const hits = [...v0.matchAll(/<b class="nm nm-(\w+)" data-nm="([^"]+)">/g)].map(m => m[2] + ':' + m[1]);
    if (hits.length) console.log(String(i + 1).padStart(3) + '  ' + f.code[i].trim().slice(0, 70).padEnd(72) + hits.join('  '));
  });
}
console.log('\n== rename test words');
for (const x of nm) console.log('  ' + x.k.padEnd(5) + x.n.padEnd(28) + (x.as ? '-> ' + x.as : '') + (x.hits.size ? '' : '   !! NEVER MATCHED'));
