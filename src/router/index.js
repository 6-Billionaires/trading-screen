import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Main from '@/components/Main'
import Filter from '@/components/trade/Filter'
import Bsa from '@/components/trade/Bsa'
import Boa from '@/components/trade/Boa'
import Ssa from '@/components/trade/Ssa'
import Soa from '@/components/trade/Soa'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        {
          path: '/trade/filter',
          name: 'Filter',
          component: Filter
        },
        {
          path: '/trade/bsa',
          name: 'Bsa',
          component: Bsa
        },
        {
          path: '/trade/boa',
          name: 'Boa',
          component: Boa
        },
        {
          path: '/trade/ssa',
          name: 'Ssa',
          component: Ssa
        },
        {
          path: '/trade/soa',
          name: 'Soa',
          component: Soa
        }
      ]
    }
  ]
})
