import './index.css'
import { createApp } from 'vue'
import { plugin } from '@formkit/vue'
import config from '../formkit.config.ts'
import { createPinia } from 'pinia'
import 'iconify-icon'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(plugin, config)

app.mount('#app')
