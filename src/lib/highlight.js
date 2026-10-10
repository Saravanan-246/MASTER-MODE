// Small tokenizer for the code shown in notes: PHP, HTML with embedded PHP,
// and SQL. Returns [{ type, text }] where type is null for plain text.
// It only colours code; it is not a parser.

const PHP_KEYWORDS = new Set(
  (
    'echo print define const true false null if else elseif while do for foreach as function return ' +
    'and or xor new instanceof isset unset empty array list require include require_once include_once ' +
    'switch case break continue default declare global static class public private protected int float ' +
    'string bool boolean integer double object'
  ).split(' '),
)

const SQL_KEYWORDS = new Set(
  (
    'select from where insert into values update set delete create table database drop alter add ' +
    'primary key foreign references not null auto_increment unsigned int integer char varchar text ' +
    'date float double decimal order by group having limit and or as on join use show describe grant'
  ).split(' '),
)

const isIdentStart = (c) => /[A-Za-z_\x80-￿]/.test(c)
const isIdent = (c) => /[A-Za-z0-9_\x80-￿]/.test(c)

function readString(src, i, quote) {
  let j = i + 1
  while (j < src.length && src[j] !== quote) j += src[j] === '\\' ? 2 : 1
  return Math.min(j + 1, src.length)
}

function readUntil(src, i, end) {
  const j = src.indexOf(end, i)
  return j === -1 ? src.length : j + end.length
}

function tokenizePhp(src, start, out, standalone) {
  let i = start
  while (i < src.length) {
    const c = src[i]
    const rest2 = src.slice(i, i + 2)

    if (!standalone && rest2 === '?>') {
      out.push({ type: 'tag', text: '?>' })
      return i + 2
    }
    if (rest2 === '//' || c === '#') {
      let j = i
      while (j < src.length && src[j] !== '\n' && src.slice(j, j + 2) !== '?>') j++
      out.push({ type: 'comment', text: src.slice(i, j) })
      i = j
    } else if (rest2 === '/*') {
      const j = readUntil(src, i + 2, '*/')
      out.push({ type: 'comment', text: src.slice(i, j) })
      i = j
    } else if (c === "'" || c === '"' || c === '`') {
      const j = readString(src, i, c)
      out.push({ type: 'string', text: src.slice(i, j) })
      i = j
    } else if (c === '$' && (isIdentStart(src[i + 1] ?? '') || src[i + 1] === '$')) {
      let j = i + 1
      while (src[j] === '$') j++
      while (j < src.length && isIdent(src[j])) j++
      out.push({ type: 'variable', text: src.slice(i, j) })
      i = j
    } else if (/[0-9]/.test(c)) {
      let j = i
      while (j < src.length && /[0-9._]/.test(src[j])) j++
      out.push({ type: 'number', text: src.slice(i, j) })
      i = j
    } else if (isIdentStart(c)) {
      let j = i
      while (j < src.length && isIdent(src[j])) j++
      const word = src.slice(i, j)
      let k = j
      while (src[k] === ' ') k++
      let type = null
      if (PHP_KEYWORDS.has(word.toLowerCase())) type = 'keyword'
      else if (src[k] === '(') type = 'function'
      else if (/^[A-Z][A-Z0-9_]+$/.test(word)) type = 'constant'
      out.push({ type, text: word })
      i = j
    } else if (/[=+\-*/%.!<>&|^~?:]/.test(c)) {
      let j = i
      while (j < src.length && /[=+\-*/%.!<>&|^~?:]/.test(src[j]) && src.slice(j, j + 2) !== '?>') j++
      out.push({ type: 'operator', text: src.slice(i, Math.max(j, i + 1)) })
      i = Math.max(j, i + 1)
    } else {
      out.push({ type: null, text: c })
      i++
    }
  }
  return i
}

function tokenizeHtml(src, out) {
  let i = 0
  while (i < src.length) {
    if (src.startsWith('<?php', i) || src.startsWith('<?=', i)) {
      const open = src.startsWith('<?php', i) ? '<?php' : '<?='
      out.push({ type: 'tag', text: open })
      i = tokenizePhp(src, i + open.length, out, false)
    } else if (src.startsWith('<!--', i)) {
      const j = readUntil(src, i + 4, '-->')
      out.push({ type: 'comment', text: src.slice(i, j) })
      i = j
    } else if (src[i] === '<' && /[A-Za-z/!]/.test(src[i + 1] ?? '')) {
      let j = i + 1
      while (j < src.length && /[A-Za-z0-9/!-]/.test(src[j])) j++
      out.push({ type: 'markup', text: src.slice(i, j) })
      i = j
      // Attributes up to the closing '>'.
      while (i < src.length && src[i] !== '>') {
        const c = src[i]
        if (c === '"' || c === "'") {
          const k = readString(src, i, c)
          out.push({ type: 'string', text: src.slice(i, k) })
          i = k
        } else if (isIdentStart(c)) {
          let k = i
          while (k < src.length && /[A-Za-z0-9_-]/.test(src[k])) k++
          out.push({ type: 'attr', text: src.slice(i, k) })
          i = k
        } else {
          out.push({ type: null, text: c })
          i++
        }
      }
      if (i < src.length) {
        out.push({ type: 'markup', text: '>' })
        i++
      }
    } else {
      let j = i + 1
      while (j < src.length && src[j] !== '<') j++
      out.push({ type: null, text: src.slice(i, j) })
      i = j
    }
  }
}

function tokenizeSql(src, out) {
  const re = /(--[^\n]*)|('(?:[^'\\]|\\.)*')|(\b\d+(?:\.\d+)?\b)|([A-Za-z_][A-Za-z0-9_]*)|([\s\S])/g
  for (const [, comment, string, number, word, other] of src.matchAll(re)) {
    if (comment) out.push({ type: 'comment', text: comment })
    else if (string) out.push({ type: 'string', text: string })
    else if (number) out.push({ type: 'number', text: number })
    else if (word) out.push({ type: SQL_KEYWORDS.has(word.toLowerCase()) ? 'keyword' : null, text: word })
    else out.push({ type: null, text: other })
  }
}

export function tokenize(code, lang = 'php') {
  const out = []
  if (lang === 'sql') tokenizeSql(code, out)
  else if (lang === 'html' || (lang === 'php' && /<\?(php|=)/.test(code))) tokenizeHtml(code, out)
  else if (lang === 'php') tokenizePhp(code, 0, out, true)
  else out.push({ type: null, text: code })

  // Merge neighbours of the same type to keep the DOM small.
  return out.reduce((merged, token) => {
    const last = merged[merged.length - 1]
    if (last && last.type === token.type) last.text += token.text
    else merged.push({ ...token })
    return merged
  }, [])
}
