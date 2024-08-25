import { EditorView, minimalSetup } from 'codemirror'
import { Compartment } from '@codemirror/state'
import { markdown } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import { watch } from 'solid-uses'
import { indentWithTab } from '@codemirror/commands'
import { keymap } from '@codemirror/view'
import { basicDark } from './theme-dark'
import { basicLight } from './theme-light'
import { colorQuote } from './md-colorquote'

export default function CodeMirror(props: {
  setcm: (cm: EditorView) => void
  content: string
  setContent: (content: string) => void
  theme?: 'light' | 'dark'
  height?: string
  width?: string
}) {
  let ref!: HTMLDivElement

  const themeConfig = new Compartment()

  onMount(() => {
    // The Markdown parser will dynamically load parsers
    // for code blocks, using @codemirror/language-data to
    // look up the appropriate dynamic import.
    const view = new EditorView({
      doc: '',
      extensions: [
        minimalSetup,
        keymap.of([indentWithTab]),
        markdown({ codeLanguages: languages, extensions: [
          colorQuote,
        ] }),
        // eslint-disable-next-line solid/reactivity
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            props.setContent(update.state.doc.toString())
          }
        }),
        themeConfig.of(props.theme === 'dark' ? basicDark : basicLight),
      ],
      parent: ref,
    })

    createEffect(() => {
      view.dom.style.height = props.height || '100%'
      view.dom.style.width = props.width || '100%'
    })

    watch([() => props.setcm], () => {
      props.setcm(view)
    })

    watch([() => props.theme], () => {
      view.dispatch({
        effects: themeConfig.reconfigure(props.theme === 'dark' ? basicDark : basicLight),
      })
    })

    createEffect(() => {
      if (props.content === view.state.doc.toString())
        return

      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: props.content },
      })
    })
  })

  return (
    <div
      ref={ref}
    />
  )
}
