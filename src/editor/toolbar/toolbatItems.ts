import type { MdEditorInstType } from '../MdEditor'
import { emoItem } from './toolbarItems/emotions'
import { previewItem } from './toolbarItems/preview'

export interface ToolbarItem {
  title: string
  icon: string
  action?: (inst: MdEditorInstType, itemInst: ToolbarItemInst) => void
  menu?:
    | ToolbarItem[]
    | { innerHTML: string; onMount: (inst: MdEditorInstType) => void }
}

export interface ToolbarItemInst {
  $element: HTMLElement
  active: (bool: boolean) => void
  changeTitle: (v: string) => void
}

export const undoItem: ToolbarItem = {
  title: '回退',
  icon: 'solar:undo-left-round-linear',
  action(inst) {
    const cm = inst.cm
    cm.undo()
    cm.refresh()
    cm.focus()
  },
}

export const redoItem: ToolbarItem = {
  title: '重做',
  icon: 'solar:undo-right-round-linear',
  action(inst) {
    const cm = inst.cm
    cm.redo()
    cm.refresh()
    cm.focus()
  },
}

export const emptyItem: ToolbarItem = {
  title: '清空',
  icon: 'solar:eraser-linear',
  action(inst) {
    const cm = inst.cm
    cm.setValue('')
    cm.refresh()
    cm.focus()
  },
}

export const divide: ToolbarItem = {
  title: '',
  icon: '',
}

export const defaultItems: ('|' | ToolbarItem)[] = [
  emoItem,
  '|',
  undoItem,
  redoItem,
  '|',
  emptyItem,
  '|',
  previewItem,
]
