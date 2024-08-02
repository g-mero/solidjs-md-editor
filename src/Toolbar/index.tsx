import type { JSX } from 'solid-js/jsx-runtime'
import type { EditorView } from 'codemirror'
import { context } from '@/context'
import Icon from '@/components/Icon'

import './toolbar.css'

export function ToolbarItem(props: {
  icon: string
  label: string
  action: (cm: EditorView) => void
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
      class="sme-toolbar-item"

    >
      <Icon name={props.icon} size="1.4em" />
    </button>
  )
}

export function Toolbar(props: {
  children?: JSX.Element
}) {
  const [, actions] = context.useContext()

  console.log(actions.getThemeCn())

  return (
    <div class={`sme-toolbar ${actions.getThemeCn()}`}>
      {props.children}
    </div>
  )
}
