# solidjs-md-editor

这是一个基于solidjs的markdown编辑器，也可以兼容原生js

## Getting Started

```bash
pnpm i solidjs-md-editor
```

### 原生js

```typescript
import { Editor } from 'solidjs-md-editor'

const editor = Editor({
  target: document.querySelector('#app'),
  onChange(v) {
    console.log(v)
  },
  theme: 'dark',
})

editor.setTheme('') // 切换主题只有light跟dark 默认是light
editor.setVal('初始化数据') // 设置值
```
