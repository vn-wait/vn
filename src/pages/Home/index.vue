<template>
  <div>
    <!-- 这个组件在搜素页也要用所以我们，定义成全局公共组件 -->
   <TypeNav />
   <ListContainer/>
   <TodayRecommend/>
   <Rank/>
   <Like/>
   <Floor v-for="floor in floorList" :key="floor.id" :floor="floor"/>
   
  
   <Brand/>
  </div>
</template>

<script>

import ListContainer from './ListContainer'
import TodayRecommend from "./TodayRecommend"
import Like from "./Like"
import Rank from "./Rank"
import Floor from './Floor'
import Brand from './Brand'
import { mapState } from 'vuex'
export default {
  name:'Home',
 mounted(){
   this.getfloorList()
 },
 methods:{
 //这里请求小图的数据，应为我们要通过这个来生成楼层
 getfloorList(){
   this.$store.dispatch('getfloorList')
 }
 },
 computed:{
 ...mapState({
   floorList:state=>state.home.floorList
 })

 },


  components:{
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand
  

  }
}
</script>

<style  lang="less" scoped>

</style>