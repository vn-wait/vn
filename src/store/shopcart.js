import {
  reqAddOrUpdateCart,
  reqcartList,
  reqUpdateIsCheck,
  reqDeleteCart


} from '../api'


const state = {
  cartList: []
}
const actions = {
  //删除选中的所有商品，原理跟allischacked相同,这里不用传参，
  async deleteAllCart({
    commit,
    state,
    dispatch
  }) {
    //生成一个数组
    let promises = []
    state.cartList.forEach(item => {
      if (item.isChecked === 0)return
      //上面就是筛选没有选中的下来的都是选中的
      let promise = dispatch("deleteCart", item.skuId)
      promises.push(promise)
    })
    return Promise.all(promises)
  },



  //定义删除单个商品
  async deleteCart({
    commit
  }, skuId) {
    const result = await reqDeleteCart(skuId)
    if (result.code === 200) {
      return 'ok'
    } else {
      //删除失败了
      Promise.reject(new Error('failed'))
    }
  },


  //这里设置全选按钮的函数，由于后台没有给怎么一次行修改多个选框的地址，所以这里只能自己写
  /* 
  步骤： 1 在actions对象中定义的函数有2个参数， 第一个参数式一个对象其实里面还有2个属性 state, dispatch，不过一般情况都没有用
        2 在这里可以看见cartList数组， 也就可以通过遍历它来获取所以的值， 找他们的isChecked值，
  */
  async updateAllIsCheck({
    commit,
    state,
    dispatch
  }, isChecked) {
    //首先生成一个数组
    let promises = []
    //遍历数组，找cartList数组中每一个对象的isChecked不等于全选按钮的isChecked值的对象修改isChecked的值
    state.cartList.forEach(item => {
      if (item.isChecked === isChecked) return //说明式一样的不用改
      //而下来的都是不一样的，那就调用修改单个isChecked的函数,
      let promise = dispatch('updateIsCheck', {
        skuID: item.skuId,
        isChecked, //这里的isChecked是传进来的isChecked
      })
      //然后将这个单个的promises添加到数组中
      promises.push(promise)
    })

    //最后调用promise.all方法面来判断是不是执行都成功，如果成功，就都成功如果失败就返回返回第一个失败的promise
    return Promise.all(promises)


  },

  //更改单个选框的选中与否
  async updateIsCheck({
    commit
  }, {
    skuID,
    isChecked
  }) {
    const result = await reqUpdateIsCheck(skuID, isChecked)
    if (result.code === 200) {
      //修改成功
      return "ok"
    } else {
      return Promise.reject(new Error('failed'))
    }
  },


  //请求购物车数据的函数
  async getShopCartList({
    commit
  }) {
    const result = await reqcartList()
    if (result.code === 200) {
      commit('RESVECARTLIST', result.data)
    }

  },

  //定义去购物车添加成功的函数
  async addOrUpdateCart({
    commit
  }, {
    skuId,
    skuNum
  }) {
    const result = await reqAddOrUpdateCart(skuId, skuNum)
    if (result.code === 200) {
      return "ok"
    } else {
      return Promise.reject(new Error('failed')) //返回的是失败的promise 结果就是这个return返回的失败的promise的原因

    }
  }
}
const mutations = {
  RESVECARTLIST(state, cartList) {
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