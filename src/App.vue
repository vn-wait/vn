<template>
  <div >
  <Header></Header>
  <!-- 这里显示我们要却换的路由 -->
   <router-view></router-view>
   <!-- 判断当前的路由的meta 里面是否有isHideFooter然后我们取反， -->
  <Footer v-show="!$route.meta.isHideFooter"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header"
import Footer from './components/Footer'
export default {
  name: 'App',
 components:{
  Header,
  Footer
 }
}
</script>

<style  >

</style>
