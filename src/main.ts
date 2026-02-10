import './assets/main.css'
import 'vuetify/styles' // Vuetify 기본 스타일

import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import App from './App.vue'
import router from './router'

// 앱/플러그인 초기화
const app = createApp(App)
const vuetify = createVuetify({
	components,
	directives,
})

app.use(router)
app.use(vuetify)

app.mount('#app')
