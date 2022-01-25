import { defineConfig } from 'vite'

// @ts-ignore
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
  root: 'src',
  build: {
    outDir: '../../backend/public'
  }
})
