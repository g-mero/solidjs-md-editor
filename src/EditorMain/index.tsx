import CodeMirror from '@/components/CodeMirror'
import { context } from '@/context'

import './editor-main.css'

export default function EditorMain(props: {
  width?: string
  height?: string
}) {
  const [state, actions] = context.useContext()

  return (
    <div>
      <CodeMirror theme={state.theme} height={props.height} width={props.width} setcm={actions.setCm} content={state.content} setContent={actions.setContent} />
    </div>
  )
}
