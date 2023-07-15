import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "@/pages/HomePage/HomePage.vue";
import RoomPage from "@/pages/Room/RoomPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/room/:id',
      name: 'room',
      component: RoomPage
    }
  ]
})

export default router
