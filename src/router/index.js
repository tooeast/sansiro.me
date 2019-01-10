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
      redirect: '/',
    },
    {
      path: '/',
      component: home,
      meta: {
        keepAlive: true,
        title: '我的圣西罗 ｜ 个人博客'
      }
    },
    {
      path: '/about',
      component: about,
      meta: {
        keepAlive: false,
        title: '关于'
      }
    },
    {
      path: '/msgbd',
      component: board,
      meta: {
        keepAlive: true,
        title: '留言板'
      }
    },
    {
      path: '/article/:name',
      name: 'article',
      component: article,
      meta: {
        keepAlive: false,
        title: 'xx'
      }
    }
  ]
});