import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { worker } from "@/mocks/browser";

import './assets/main.css'
import "@fontsource/roboto"
import "@fontsource/montserrat"
import {createPinia} from "pinia";

if (import.meta.env.DEV) {
    worker.start()
}

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')