import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('@/components/App')
    },
    {
      path: '/tts',
      name: 'tts',
      component: () => import('@/components/App')
    }
  ]
})
