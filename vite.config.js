import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
//export default defineConfig({
//  plugins: [
//    vue(),
//  ],
//  resolve: {
//    alias: {
//      '@': fileURLToPath(new URL('./src', import.meta.url))
//    }
//  },
//  base: '/',
//})

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config = {
    plugins: [vue()],
    base: '/dist/',
  }

  if (command !== 'serve') {
    config.base = '/vue3-crash-course/dist/'
  }

  return config
})
