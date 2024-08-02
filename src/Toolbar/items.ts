import type { EditorView } from 'codemirror'
import { redo, undo } from '@codemirror/commands'

interface ItemProp {
  icon: string
  label: string
  action: (cm: EditorView) => void
}

const emptyItem: ItemProp = {
  icon: 'ri:eraser-fill',
  label: '清空',
  action: (cm) => {
    cm.dispatch({ changes: { from: 0, to: cm.state.doc.length, insert: '' } })
  },
}

const undoItem: ItemProp = {
  icon: 'ri:arrow-go-back-line',
  label: '撤销',
  action: (cm) => {
    undo(cm)
  },
}

const redoItem: ItemProp = {
  icon: 'ri:arrow-go-forward-line',
  label: '重做',
  action: (cm) => {
    redo(cm)
  },
}

export { undoItem, redoItem, emptyItem }
