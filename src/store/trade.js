import {
  reqTradeInfo
}from '../api'

const state = {
 tradeInfo: {}

}
const actions = {
  async getTradeInfo ({commit}) {
    const result = await reqTradeInfo()
    if (result.code === 200) {
      commit('RESVETRADEINFO',result.data)
    }
 }

}
const mutations = {
  RESVETRADEINFO (state, tradeInfo) {
    state.tradeInfo = tradeInfo
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