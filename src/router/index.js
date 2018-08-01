import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Main from '@/components/Main'
import Bsa from '@/components/trade/Bsa'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {

          path: '/trade/bsa',
          name: 'Bsa',
          component: Bsa

        }
      ]
    }
  ]
})
