import { createApp } from 'vue'
import App from './App.vue'
import { worker } from "@/mocks/browser";

import './assets/main.css'
import "@fontsource/roboto"
import "@fontsource/montserrat"

if (import.meta.env.DEV) {
    worker.start()
}

createApp(App).mount('#app')
