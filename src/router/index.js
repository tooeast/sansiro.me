import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import home from '@/client/Home'
import article from '@/client/Article'
import error from '@/client/404'
import about from '@/client/About'
import board from '@/client/Board'

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