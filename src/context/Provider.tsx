import type { EditorView } from 'codemirror'
import { createComponentState, watch } from 'solid-uses'

const context = createComponentState(() => ({
  content: '',
  cm: null as EditorView | null,
  theme: 'light' as 'light' | 'dark',
}))

export function Provider(props: { children: any, class?: string, theme?: 'light' | 'dark' }) {
  const Context = context.initial()
  const [,actions] = Context.value

  watch(() => props.theme, () => {
    props.theme && actions.setTheme(props.theme)
  })

  return (
    <Context.Provider>
      <div class={props.class}>
        {props.children}
      </div>
    </Context.Provider>
  )
}

export { context }
