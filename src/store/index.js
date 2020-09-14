/* 这里定义vuex  */

import Vue from 'vue'
import Vuex from 'vuex'

//注册
Vue.use(Vuex)

const state = {}
const actions = {}
const mutations = {}
const getters= {}

//引入子模块
import home from './home'
import user from './user'
import search from './search'
import detail from './detail'
import shopcart from "./shopcart"

const store = new Vuex.Store({
 //里面有它的几个核心
  state,
  actions,
  mutations,
  getters,
  modules: {
    //里面定义的是组件化的数据,如果组件化了以后，state里面放着的是一个对象了，所以拿数据会不同
    home,
    user,
    search,
    detail,
    shopcart

  }




})

//暴露出去
export default store
