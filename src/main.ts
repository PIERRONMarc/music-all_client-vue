import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { worker } from "@/mocks/browser";

import './assets/main.css'
import "@fontsource/roboto"
import "@fontsource/montserrat"

if (import.meta.env.DEV) {
    worker.start()
}

const app = createApp(App)

app.use(router)
app.mount('#app')