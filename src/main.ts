import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全局样式文件
import '@/assets/scss/index.scss'
import 'element-plus/es/components/message/style/css'

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')
