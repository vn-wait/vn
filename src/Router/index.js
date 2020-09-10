//引入router
import VueRouter from 'vue-router'
import Vue from "vue"
//注册
Vue.use(VueRouter)

//引入拆分出去routes
import routes from './routes'

//这里面我要解决一下，当使用编程式导航push和replace的时候，点击多次会报错的问题，这是因为vue3版本以后，这2个函数返回值是promise，所以
//才会除这个错，2个方法解决，1 then和catch  2我们从原型上解决它，也就是修改原型上这2个函数

 /* 解决的步骤  
   1 首先我们先保存原来push和replace这2个方法
   2 然后我们开始判断，是否判断成功或者的失败的回调函数是否有值
   3 如果没有值，那么我们就在里面给它处理一下，也就是处理promise ，注意这里有this问题，这里需要使用call来改变this指向，直接调用的话，this是windo
   4 如果有值，我们就把它传进来的函数，带上执行
   
   
   */
let storagepush = VueRouter.prototype.push
let storagereplace = VueRouter.prototype.replace
  

//之后我们重新设置push方法,3个参数 location ，成功的回调函数，失败的回调函数
VueRouter.prototype.push = function (location, onResolved, onRejected) {
  if (onResolved === undefined && onRejected === undefined) {
      //说明这2个回调函数没有传，那么我们自己在这里面处理,
     return storagepush.call(this, location).catch(()=>{})
  } else {
    //说明是处理了，那么我们带上它传进来的函数即可
       return storagepush.call(this, location, onResolved,onRejected)
   }
 }

 VueRouter.prototype.replace = function (location, onResolved, onRejected) {
   if (onResolved === undefined && onRejected === undefined) {
     //说明这2个回调函数没有传，那么我们自己在这里面处理,
     return storagereplace.call(this, location).catch(() => {})
   } else {
     //说明是处理了，那么我们带上它传进来的函数即可
     return storagereplace.call(this, location, onResolved, onRejected)
   }
 }

 



//使用
const router = new VueRouter({
  //在里面定义路由组件,
  //我们拆分一下
  routes,
  //解决进详情页的时候滚动条最下面的问题
 scrollBehavior(to, from, savedPosition) {
   return {
     x: 0,
     y: 0
   }
 }


})



export default router