import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import home from '@p/Home'
import article from '@p/Article'
import error from '@p/404'
import about from '@p/About'
import board from '@p/Board'

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: error
    },
    {
      path: '/home',
      redirect: '/'
    },
    {
      path: '/',
      component: home
    },
    {
      path: '/about',
      component: about
    },
    {
      path: '/msgbd',
      component: board
    },
    {
      path: '/article/:name',
      name: 'article',
      component: article
    }
  ]
})