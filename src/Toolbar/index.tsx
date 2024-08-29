import type { JSX } from 'solid-js/jsx-runtime'
import type { EditorView } from 'codemirror'
import { context } from '@/context'
import Icon from '@/components/Icon'


export function ToolbarItem(props: {
  icon: string
  label: string
  action: (cm: EditorView) => void
  class?: string
}) {
  const [state] = context.useContext()

  return (
    <button
      onClick={() => {
        if (state.cm) {
          props.action(state.cm)
        }
      }}
      title={props.label}
      class={props.class}
    >
      <Icon name={props.icon} size="1.4em" />
    </button>
  )
}

export function Toolbar(props: {
  children?: JSX.Element
  class?: string
}) {

  return (
    <div class={props.class}>
      {props.children}
    </div>
  )
}
