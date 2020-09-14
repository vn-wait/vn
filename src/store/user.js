//在这里引入生成uuid的方法，在这里生成一个，方便等下去请求头中设置
import {
  getUserTempId
} from '../utils/userabouts'
const state = {
     //生成以后去请求头中添加
    userTempId: getUserTempId()
}
const actions = {}
const mutations = {}
const getters = {}

//暴露出去一个对象
export default {
  state,
  actions,
  mutations,
  getters

}