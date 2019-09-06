import Vue from 'vue'
import App from '@p/App'
import router from './router'
import request from './plugins/request'

import vdialog from 'vue-toast-confirm'
import vpicture from './libs/vpicture'
Vue.use(vdialog)

Vue.use(vpicture)


Vue.prototype.$http = request;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    to.meta.title == 'xx' && (to.meta.title = window.articleInfo.title);
    document.title = 'SANSIRO.ME － ' + to.meta.title;
  }
  next();
})
