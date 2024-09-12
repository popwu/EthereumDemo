import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { Buffer } from 'buffer';

// 将 Buffer 添加到全局对象中
window.Buffer = Buffer;

createApp(App).use(router).mount('#app')
