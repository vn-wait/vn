//这里面写的是定义路由
//引入要定义的路由组件
import Home from "../pages/Home"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Search from '../pages/Search'

//暴露出去时一个数组
export default [

  {
    /* 有时候需要携带关键字去搜索页，但是也可以不携带关键字，这里的处理 ?问好代表可传可不传 */
    path: '/search/:keyword?',
    component: Search,
    name:'Search'
  },
  {
    path: '/register',
    component: Register,
    //设置解决登录页不需要底部的问题
    meta: {
      isHideFooter: true
    }
  },
  {
    path: '/login',
    component: Login,
    //设置解决登录页不需要底部的问题
    meta: {
      isHideFooter: true
    }

  },
  {
    path: '/home',
    component: Home
  },
  //重置去home
  {
    path: '/',
    redirect: '/home'
  }




]
