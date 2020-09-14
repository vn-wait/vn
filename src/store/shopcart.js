import {
  reqAddOrUpdateCart,
  reqcartList

} from '../api'


const state = {
  cartList:[]
}
const actions = {
//请求购物车数据的函数
  async getShopCartList ({ commit }) {
    const result = await reqcartList()
    if (result.code === 200) {
      commit('RESVECARTLIST',result.data)
    }

 },

//定义去购物车添加成功的函数
  async addOrUpdateCart({commit}, {skuId,skuNum}) {
    const result = await reqAddOrUpdateCart(skuId, skuNum)
    if (result.code === 200) {
      return "ok"
    } else {
     return Promise.reject(new Error('failed')) //返回的是失败的promise 结果就是这个return返回的失败的promise的原因
      
    }
  }
}
const mutations = {
  RESVECARTLIST (state,cartList) {
  state.cartList = cartList
}

}
const getters = {}

//暴露出去一个对象
export default {
  state,
  actions,
  mutations,
  getters

}