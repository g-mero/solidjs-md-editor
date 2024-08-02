import type { EditorView } from 'codemirror'
import { createComponentState, watch } from 'solid-uses'

const context = createComponentState(() => ({
  content: '',
  cm: null as EditorView | null,
  theme: 'light' as 'light' | 'dark',
}), {
  getThemeCn() {
    return this.state.theme === 'dark' ? 'sme-dark' : ''
  },
})

export function Provider(props: { children: any, theme?: 'light' | 'dark' }) {
  const Context = context.initial()

  const [,actions] = Context.value

  watch([() => props.theme], () => {
    actions.setTheme(props.theme || 'light')
  })

  return (
    <Context.Provider>
      {props.children}
    </Context.Provider>
  )
}

export { context }
