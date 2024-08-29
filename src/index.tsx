import { Toolbar, ToolbarItem } from './Toolbar'
import EditorMain from './EditorMain'
import { Provider } from './context'
import { emptyItem, redoItem, undoItem } from './Toolbar/items'

const MdEditor = Object.assign(Provider, {
  Main: EditorMain,
  Toolbar,
  ToolbarItem,
})

export default MdEditor

export { emptyItem, redoItem, undoItem, Provider, EditorMain, Toolbar, ToolbarItem }
