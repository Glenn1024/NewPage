import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/new-page/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'vue': "vue/dist/vue.esm-bundler.js",
      'bootstrap': "bootstrap/dist/css/bootstrap.css",
      'bootstrap-icons': "bootstrap-icons/font/bootstrap-icons.css"
    }
  },
  // server: {
  //   host: '192.168.0.100',
  //   port: 80,
  // },
})
