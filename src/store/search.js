import {
  reqList
} from "../api"

const state = {
  List: {}
}

const actions = {

  async getList({
    commit
  }, searchParams) {
    const result = await reqList(searchParams)
    if (result.code === 200) {
      commit('RESVELIST', result.data)
    }
  }


}
const mutations = {
  RESVELIST(state, List) {
    state.List = List
  }

}
const getters = {
  //这里的数据比较复杂，所以需要计算一下
  attrsList() {
    return state.List.attrsList || []
  },
  goodsList() {
    return state.List.goodsList || []
  },
  trademarkList() {
    return state.List.trademarkList || []
  },



}

//暴露出去一个对象
export default {
  state,
  actions,
  mutations,
  getters

}