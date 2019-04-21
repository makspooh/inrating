import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import store from './store'
import VueRouter from 'vue-router'
import router from './routes'
import VueLocalStorage from 'vue-localstorage'

Vue.use(VueRouter)
Vue.use(VueLocalStorage, {
  name: 'ls',
  bind: true //created computed members from your variable declarations
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  render: h => h(App),
  router
})