import Vue from 'vue'
import Router from 'vue-router'

import article from '@/client/article'
import home from '@/client/home'
import list from '@/client/list'
import about from '@/client/about'
import bbs from '@/client/bbs'
import error from '@/client/404'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: error
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: home
    },
    {
      path: '/list',
      component: list
    },
    {
      path: '/about',
      component: about
    },
    {
      path: '/msgboard',
      component: bbs
    },
    {
      path: '/article/:name',
      component: article
    }
  ]
})
