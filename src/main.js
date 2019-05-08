import Vue from 'vue'
import App from './App.vue'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import querystring from 'querystring'
Vue.prototype.$qs = querystring
Vue.config.productionTip = false
Vue.use(iView)

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
