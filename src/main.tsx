import { createSignal } from 'solid-js'
import { render } from 'solid-js/web'
import MdEditor from './editor/MdEditor'

interface params {
  target: HTMLElement
  height: string
  onChange: (v: string) => void
  handelPreview: (v: string) => string
  theme: 'light' | 'dark'
}

export function Editor(config: params) {
  if (!config.target) return
  const [theme, setTheme] = createSignal(config.theme)
  const [value, setVal] = createSignal('')
  render(
    () => (
      <MdEditor
        onChange={config.onChange}
        handelPreview={config.handelPreview}
        height={config.height}
        theme={theme()}
        value={value()}
      />
    ),
    config.target,
  )

  return {
    setTheme,
    setVal,
  }
}
