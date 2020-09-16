//在这里引入生成uuid的方法，在这里生成一个，方便等下去请求头中设置
import {
  getUserTempId
} from '../utils/userabouts'
import {
  reqRegiste,
  reqLogin,
  reqLogout
} from '../api'
const state = {
  //生成以后去请求头中添加
  userTempId: getUserTempId(),
  //定义用户数据,
  //userInfo: {}
  //为了实现自动登录 不能直接写出空对象
  userInfo: JSON.parse(localStorage.getItem("USER-TOKEN")) || {}


}
const actions = {
  //定义退出登录的函数
  async logout({
    commit
  }) {
    const result = await reqLogout()
    if (result.code === 200) {
      //说明成功了我们要把自动登录里面的数据，和userInfo都修改成空
      localStorage.removeItem("USER-TOKEN")
      commit("RESETUSERINFO")
      return "ok"
    } else {
      return Promise.reject(new Error('失败了'))
    }
  },


  //定义登录请求函数
  async login({
    commit
  }, userInfo) {
    const result = await reqLogin(userInfo)
    if (result.code === 200) {
      commit('RESVEUSERINFO', result.data)
      //这里为了做自动登录，也就是刷新页面之后，依然是登录的状态，这里就要保存一份token在本地永久保存
      localStorage.setItem('USER-TOKEN', JSON.stringify(result.data))
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  },

  //定义注册的请求函数
  async register({
    commit
  }, userInfo) {
    const result = await reqRegiste(userInfo)
    if (result.code === 200) {
      //说明成功了
      return "ok"
    } else {
      return Promise.reject('失败了')
    }
  }
}
const mutations = {
  RESVEUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  RESETUSERINFO(state) {
    state.userInfo = {}
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