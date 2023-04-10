import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    solidPlugin(),
    dts({
      rollupTypes: true,
    }),
  ],
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
      formats: ['es'],
      fileName: (format) => `editor.${format}.js`, // 打包后的文件名
    },
  },
})
