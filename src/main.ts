import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { worker } from "@/mocks/browser";

import './assets/main.css'
import "@fontsource/roboto"
import "@fontsource/montserrat"
import {createPinia} from "pinia";
import {createManager} from "@vue-youtube/core";
import ToastPlugin from "vue-toast-notification";
import 'vue-toast-notification/dist/theme-default.css';

if (import.meta.env.DEV) {
    worker.start()
}

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(createManager())
app.use(ToastPlugin);
app.mount('#app')