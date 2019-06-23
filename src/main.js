import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import { store } from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    this.$store.dispatch('loadPosts')
    this.$store.dispatch('loadAdminSettings')
    this.$store.dispatch('loadCalendar')
    this.$store.dispatch('loadPersons')
  }
}).$mount('#app')
