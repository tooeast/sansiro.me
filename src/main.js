import Vue from 'vue'
import App from '@p/App'
import router from './router'
import axios from 'axios'

import vdialog from 'vue-toast-confirm'
import vpicture from './libs/vpicture'
Vue.use(vdialog)

Vue.use(vpicture)


Vue.prototype.$http = axios;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
