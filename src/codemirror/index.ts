import CodeMirror from 'codemirror'

import 'codemirror/addon/scroll/simplescrollbars' // 滚动条

import './codemirror.scss' // 核心样式
import './light.scss'
import './blackboard.scss' // 暗色模式的样式
import './simplescrollbars.scss' // 滚动条的样式

// mode
import './markdown.js'
// edit
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/matchbrackets'
// placeholder
import 'codemirror/addon/display/placeholder'
// active-line
import 'codemirror/addon/selection/active-line'

export default CodeMirror
