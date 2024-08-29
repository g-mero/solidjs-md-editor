import CodeMirror from '@/components/CodeMirror'
import { context } from '@/context'


export default function EditorMain(props: {
  width?: string
  height?: string
  content: string
  setContent: (content: string) => void
  theme?: 'light' | 'dark'
}) {
  const [state, actions] = context.useContext()

  return (
      <CodeMirror theme={props.theme} height={props.height} width={props.width} setcm={actions.setCm} content={props.content} setContent={props.setContent} />
  )
}
