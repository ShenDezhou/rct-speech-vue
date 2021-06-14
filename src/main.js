import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import 'vue-awesome/icons'
// import Icon from 'vue-awesome/components/Icon'

import App from './App'
import router from './router'
import axios from 'axios'
Vue.prototype.axios = axios
axios.defaults.baseURL = ''

Vue.config.productionTip = false

Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
