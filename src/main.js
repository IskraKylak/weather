import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAxios from 'vue-axios'
import axios from 'axios'
import './assets/css/fonts.css'
import messagePlugin from './utils/message.plugin'

createApp(App).use(messagePlugin).use(VueAxios, axios).use(store).use(router).mount('#app')
