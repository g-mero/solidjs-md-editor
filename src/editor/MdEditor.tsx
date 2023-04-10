import './global.scss'
import { createEffect, createSignal, onMount } from 'solid-js'

import { debounce } from 'lodash'
import CodeMirror from '../codemirror'
import styles from './mdeditor.module.scss'
import Toolbar from './toolbar/Toolbar.jsx'

export interface MdEditorInstType {
  cm: CodeMirror.Editor
  $element: HTMLElement
  $editor: HTMLElement
  $preview: HTMLElement
  getPreview: () => string
}

export default function MdEditor(props: {
  onChange: (v: string) => void
  handelPreview: (v: string) => string
  height: string
  theme: 'light' | 'dark'
  value: string
}) {
  const [inst, setInst] = createSignal<MdEditorInstType>()
  let $element!: HTMLDivElement
  onMount(() => {
    if (!$element) return
    const $editor = $element.querySelector(`.${styles.editor}`) as HTMLElement
    const $preview = $element.querySelector(
      `.${styles['preview-content']}`,
    ) as HTMLElement

    if ($editor && $preview) {
      const cm = CodeMirror($editor, {
        mode: 'markdown',
        lineWrapping: true,
        value: props.value,
        scrollbarStyle: 'overlay',
      })

      const editorInst: MdEditorInstType = {
        cm,
        $element,
        $editor,
        $preview,
        getPreview() {
          const value = cm.getValue()
          return props.handelPreview ? props.handelPreview(value) : value
        },
      }

      setInst(editorInst)

      cm.on(
        'change',
        debounce(() => {
          const value = cm.getValue()
          props.onChange(value)
        }, 200),
      )

      createEffect(() => {
        if (props.theme === 'dark') {
          cm.setOption('theme', 'blackboard')
        } else {
          cm.setOption('theme', 'default')
        }
      })

      createEffect(() => {
        cm.setValue(props.value)
        cm.refresh()
        cm.focus()
      })
    }
  })

  return (
    <div
      ref={$element}
      class={`${styles['out-wrapper']} ${
        props.theme === 'dark' ? styles.dark : ''
      }`}
    >
      <div class={styles.toolbar}>
        <Toolbar inst={inst()} />
      </div>
      <div
        class={styles['editor-wrapper']}
        style={{ height: props.height || '300px' }}
      >
        <div class={styles.editor} />
        <div class={styles.preview}>
          <div class={`${styles['preview-content']} markdown-body`} />
        </div>
      </div>
    </div>
  )
}
