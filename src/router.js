import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Calendar from './views/Calendar.vue'
import Contacts from './views/Contacts.vue'
import Gallery from './views/Gallery.vue'
import MurderGame from './views/MurderGame.vue'
import LogIn from './views/LogIn.vue'
import AdminSettings from './views/AdminSettings.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: Gallery
    },
    {
      path: '/murdergame',
      name: 'murdergame',
      component: MurderGame
    },
    {
      path: '/login',
      name: 'login',
      component: LogIn
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminSettings
    }
  ]
})
