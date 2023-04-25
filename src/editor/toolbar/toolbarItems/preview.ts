import type { MdEditorInstType } from '../../MdEditor'
import styles from '../../mdeditor.module.scss'
import type { ToolbarItem, ToolbarItemInst } from '.'

function action(inst: MdEditorInstType, itemInst: ToolbarItemInst) {
  const editorWrapper = inst.$element.querySelector(
    `.${styles['editor-wrapper']}`,
  )
  const isPreview = editorWrapper?.classList.contains(styles['show-preview'])
  if (isPreview) {
    editorWrapper?.classList.remove(styles['show-preview'])
    itemInst.changeTitle('预览')
    itemInst.active(false)
  } else {
    inst.$preview.innerHTML = inst.getPreview()
    editorWrapper?.classList.add(styles['show-preview'])
    itemInst.changeTitle('取消预览')
    itemInst.active(true)
  }
}

export const previewItem: ToolbarItem = {
  title: '预览',
  icon: 'solar:eye-linear',
  action,
}
