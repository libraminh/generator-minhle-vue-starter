import Vue from 'vue'
import Router from 'vue-router'
import About from 'components/About'
import HelloWorld from 'components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/home',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/about',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ 'components/About.vue')
    }
    // {
    //   path: '/about',
    //   name: 'About',
    //   component: About
    // },
  ]
})
