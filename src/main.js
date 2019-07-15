import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './assets/styles/icon.css'
// import './assets/fonts/daysOne.css'
import './assets/styles/global.scss'
import i18n from './lang/index.js'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
