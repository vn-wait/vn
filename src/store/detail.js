import {
  reqdetails,
  reqAddOrUpdateCart
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
const getters = {
 //这是由于数据复杂，先把它计算出来
  categoryView (state) {
    return state.detailsInfo.categoryView || {}
  },


  skuInfo (state) {
      return state.detailsInfo.skuInfo || {}
  },

  spuSaleAttrList (state) {
      return state.detailsInfo.spuSaleAttrList || []
  }
 




}

//暴露出去一个对象
export default {
  state,
  actions,
  mutations,
  getters

}