import App from './App.vue'
import globDirectives from './directives'
import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import { router } from './router'
import { store } from './store'
import { globSvgIcon } from '@/assets/icons/index'

import locale from 'element-plus/lib/locale/lang/zh-cn' // 中文语言

import 'element-plus/dist/index.css'
import '@/assets/styles/index.scss'
import './permission'

const app = createApp(App)

// Configure routing
app.use(router)

// Configure store
app.use(store)

// Configure ElementPlus
app.use(ElementPlus, { locale: locale, size: 'default', zIndex: 2000 })

// Register icon sprite
globSvgIcon(app)

// Register global directive
globDirectives(app)

app.mount('#app')
