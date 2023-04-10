import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [solidPlugin(), dts({ include: './src' })],
  css: {
    modules: {
      scopeBehaviour: 'local',
      generateScopedName: 'gedi_[hash:5]',
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'MdEditor',
      fileName: (format) => `editor.${format}.js`, // 打包后的文件名
    },
  },
})
