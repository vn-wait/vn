import Vue from 'vue'
import App from './App.vue'
//引入router
import router from './Router'
Vue.config.productionTip = false


//定义全局组件, 引入 注册  使用
import TypeNav from './components/TypeNav'
Vue.component('TypeNav',TypeNav)


new Vue({
  render: h => h(App),
  router, //注册全局，用this 可以调用
}).$mount('#app')
