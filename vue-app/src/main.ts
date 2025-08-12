import './index.css'
import { createApp } from 'vue'
import { plugin } from '@formkit/vue'
import config from '../formkit.config.ts'
import { createPinia } from 'pinia'
import 'iconify-icon'

import { StoryblokVue, apiPlugin } from '@storyblok/vue'

import App from './App.vue'
import router from './router'

// Import Storyblok components
import Page from './components/storyblok/Page.vue'
import Teaser from './components/storyblok/Teaser.vue'

const app = createApp(App)

// Register Storyblok components globally
app.component('page', Page)
app.component('teaser', Teaser)

app.use(StoryblokVue, {
  accessToken: 'Rn3u6OrJR9DMzHvGj6dnQwtt',
  use: [apiPlugin],
})

app.use(createPinia())
app.use(router)
app.use(plugin, config)

app.mount('#app')
