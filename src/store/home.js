//引入请求函数
import {
  reqCategoryList
} from '../api'


const state = {
  //定义数据
  categoryList: []
}
const actions = {
 //这里面发送请求
  async getCategoryList ({ commit }) {
    
    const result = await reqCategoryList()
   console.log(result)
    if (result.data.code === 200) {
     commit('RECEIVECATEGORYLIST', result.data.data)
    }
  }

}
const mutations = {
  RECEIVECATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },


}
const getters = {}

//暴露出去一个对象
export default {
  state,
  actions,
  mutations,
  getters

}