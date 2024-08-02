import { render } from 'solid-js/web'
import { Toolbar, ToolbarItem } from './Toolbar'
import EditorMain from './EditorMain'
import { Provider } from './context'
import { emptyItem, redoItem, undoItem } from './Toolbar/items'

// 暴露给原生js使用，这里其实也就是对MdEditor的原生化封装
export function Editor(config: {
  target: HTMLElement
}) {
  if (!config.target)
    return {}

  const toolbarItems = [undoItem, redoItem, emptyItem]

  render(
    () => (
      <Provider theme="dark">
        <Toolbar>
          <For each={toolbarItems}>
            {item => (
              <ToolbarItem {...item} />
            )}
          </For>
        </Toolbar>
        <EditorMain height="300px" />
      </Provider>
    ),
    config.target,
  )
  return {
  }
}
