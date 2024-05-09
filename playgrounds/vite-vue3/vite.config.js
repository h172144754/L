import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {domOpenCodePlugin} from 'dom-open-code/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),domOpenCodePlugin()],
})
