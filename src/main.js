// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueMaterial from 'vue-material'

import './assets/vue-material/vue-material.min.css'
// import 'vue-material/dist/theme/default-dark.css' // This line here
import './assets/vue-material/theme/default-dark.css'
import './assets/vue-material/theme/default.css'

import './assets/vue-material/base/theme.scss'

Vue.use(VueMaterial)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
