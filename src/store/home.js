//引入请求函数
import {
  reqCategoryList,
  reqbannerList,
  reqfloorList
} from '../api'


const state = {
  //定义数据
  categoryList: [],
  bannerList: [],
  floorList:[]
}
const actions = {
 //这里面发送请求
  async getCategoryList ({ commit }) {
    
    const result = await reqCategoryList()
          console.log(result)
    if (result.code === 200) {
       console.log(result.data)
     commit('RECEIVECATEGORYLIST', result.data)
    }
  },
  
  async getbannerList ({ commit }) {
    
    const result = await reqbannerList()
    if (result.code === 200) {
      commit('RECEVEBANNERLIST',result.data)
    }
  },

  async getfloorList ({ commit }) {
    console.log(111)
    const result = await reqfloorList()
    if (result.code === 200) {
      console.log(121)
      commit('RECEIVEFLOORLIST',result.data)
    } else {
      alert('失败了')
    }
  }


}
const mutations = {
  RECEIVECATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },
  RECEVEBANNERLIST (state, bannerList) {
    state.bannerList = bannerList
  },
  RECEIVEFLOORLIST (state, floorList) {
     console.log(123)
    state.floorList = floorList
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