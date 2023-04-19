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

// 暴露给原生js使用，这里其实也就是对MdEditor的原生化封装
export function Editor(config: params) {
  if (!config.target) return
  const [theme, setTheme] = createSignal(config.theme)
  const [value, setValue] = createSignal('')
  const onChange = (v: string) => {
    setValue(v)
    config.onChange(v)
  }
  render(
    () => (
      <MdEditor
        onChange={onChange}
        handelPreview={config.handelPreview}
        height={config.height}
        theme={theme()}
        value={value()}
      />
    ),
    config.target,
  )

  return {
    setTheme: (theme: 'light' | 'dark') => {
      setTheme(theme)
    },
    /* 设置编辑器的值 */
    setVal: (v: string) => {
      setValue(v)
    },
    getVal: () => {
      return value()
    },
  }
}
