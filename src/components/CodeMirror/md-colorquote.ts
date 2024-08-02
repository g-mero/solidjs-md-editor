import type { Line, MarkdownConfig } from '@lezer/markdown'
import { tags as t } from '@lezer/highlight'

// > >? >! >x >y
function isBlockquote(line: Line) {
  const okChars = [
    32 /* ' ' */,
    63 /* '?' */,
    33 /* '!' */,
    120 /* 'x' */,
    121 /* 'y' */,
  ]
  return line.next !== 62 /* '>' */ ? -1 : okChars.includes(line.text.charCodeAt(line.pos + 1)) ? 1 : 0
}

export const colorQuote: MarkdownConfig = {
  defineNodes: [
    { name: 'QuoteMark2', style: t.processingInstruction },
  ],
  parseBlock: [{
    name: 'Blockquote',
    parse(cx, line) {
      const size = isBlockquote(line)
      if (size <= 0)
        return false

      cx.startComposite('Blockquote', cx.lineStart + line.pos)

      cx.addElement(cx.elt('QuoteMark2', cx.lineStart + line.pos, cx.lineStart + line.pos + 2))
      line.moveBase(size)
      return null
    },
    before: 'FencedCode',
  }],
}
