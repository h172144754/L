import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { initDomOpenCode } from 'dom-open-code'

initDomOpenCode()

createApp(App).mount('#app')
