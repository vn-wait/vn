import Vue from 'vue'
import App from './App.vue'
//引入router
import router from './Router'
//引入vuex
import store from './store'
Vue.config.productionTip = false

//引入mock
import './mock/MockServer'

//定义全局组件, 引入 注册  使用
import TypeNav from './components/TypeNav'
Vue.component('TypeNav', TypeNav)
import SliderLoop from './components/SliderLoop'
Vue.component('SliderLoop', SliderLoop)
import pagination from './components/pagination'
Vue.component('pagination', pagination)



new Vue({
  render: h => h(App),
  beforeCreate () {
  Vue.prototype.$bus=this //配置全局事件总线

  },
  router, //注册全局，用this 可以调用
  store
}).$mount('#app')
