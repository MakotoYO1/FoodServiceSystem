import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ELEMENT from 'element-ui'
import '@/assets/css/element-variables.scss'
import '@/assets/css/global.scss'
import './router/guard'
import './components/'
Vue.use(ELEMENT,{})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
