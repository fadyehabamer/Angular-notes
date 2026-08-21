/* build-time syntax highlighting — no runtime dependency */
const KW = new Set(['import','from','export','default','const','let','var','function','return',
  'class','extends','implements','interface','type','new','await','async','if','else','for','of',
  'in','while','switch','case','break','continue','this','null','undefined','true','false','void',
  'typeof','as','readonly','private','public','protected','static','get','set','throw','try',
  'catch','finally','delete','instanceof','enum','declare','abstract','super','satisfies','keyof',
  'string','number','boolean','any','unknown','never']);

const TS_RE = /(\/\/[^\n]*)|(\/\*[\s\S]*?\*\/)|(`(?:\\[\s\S]|[^`\\])*`)|('(?:\\[\s\S]|[^'\\])*')|("(?:\\[\s\S]|[^"\\])*")|(@[A-Za-z_$][\w$]*)|(\b\d[\w.]*)|([A-Za-z_$][\w$]*)/g;
const HTML_RE = /(<!--[\s\S]*?-->)|(\{\{[\s\S]*?\}\})|(@[a-z]+)|(<\/?[A-Za-z][\w.-]*)|(\[\([\w.$-]+\)\]|\[[\w.$@-]+\]|\([\w.$-]+\))|(\*[\w-]+|#[\w-]+)|(\b[a-zA-Z][\w:-]*(?==))|("[^"]*"|'[^']*')|(\/?>)/g;

export const esc = s => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

function tokenize(src, re, pick){
  let out = '', last = 0, m;
  re.lastIndex = 0;
  while((m = re.exec(src)) !== null){
    if(m.index > last) out += esc(src.slice(last, m.index));
    const cls = pick(m, src, re.lastIndex);
    out += cls ? '<i class="' + cls + '">' + esc(m[0]) + '</i>' : esc(m[0]);
    last = re.lastIndex;
    if(m[0] === '') re.lastIndex++;
  }
  return out + esc(src.slice(last));
}

function pickHtml(m){
  if(m[1]) return 't-com';
  if(m[2]) return 't-bind';
  if(m[3]) return 't-key';
  if(m[4]) return 't-tag';
  if(m[5]) return 't-bind';
  if(m[6]) return 't-bind';
  if(m[7]) return 't-attr';
  if(m[8]) return 't-str';
  if(m[9]) return 't-tag';
  return '';
}

function pickTs(m, src, end){
  if(m[1] || m[2]) return 't-com';
  if(m[3] || m[4] || m[5]) return 't-str';
  if(m[6]) return 't-dec';
  if(m[7]) return 't-num';
  const w = m[8];
  if(!w) return '';
  if(KW.has(w)) return 't-key';
  if(src.charAt(end) === '(') return 't-fn';
  if(/^[A-Z]/.test(w)) return 't-type';
  return '';
}

/* line-based, but aware of a template literal spanning several lines:
   inside `template: ` … ` ` we switch to the HTML tokenizer.            */
export function hlLines(lines, lang){
  if(lang === 'bash' || lang === 'json') return lines.map(l => esc(l));
  let inTpl = false;
  return lines.map(line => {
    if(lang === 'html') return tokenize(line, HTML_RE, pickHtml);
    if(inTpl){
      const close = line.indexOf('`');
      if(close === -1) return tokenize(line, HTML_RE, pickHtml);
      inTpl = false;
      return tokenize(line.slice(0, close), HTML_RE, pickHtml)
           + '<i class="t-str">`</i>'
           + tokenize(line.slice(close + 1), TS_RE, pickTs);
    }
    const ticks = (line.match(/`/g) || []).length;
    if(ticks % 2 === 1){
      const open = line.lastIndexOf('`');
      inTpl = true;
      return tokenize(line.slice(0, open), TS_RE, pickTs)
           + '<i class="t-str">`</i>'
           + tokenize(line.slice(open + 1), HTML_RE, pickHtml);
    }
    return tokenize(line, TS_RE, pickTs);
  });
}
