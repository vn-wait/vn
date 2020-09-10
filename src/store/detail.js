import {
  reqdetails
} from '../api'

const state = {
 detailsInfo:{}

}
const actions = {
  async getdetailsInfo ({ commit }, skuId) {
    
    const result = await reqdetails(skuId)
   
    if (result.code === 200) {
      commit('RESVEDETAILSINFO', result.data)
       console.log(6666)
    }
 }

}
const mutations = {
  RESVEDETAILSINFO(state, detailsInfo) {
    state.detailsInfo = detailsInfo
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