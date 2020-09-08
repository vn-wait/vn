<template>
  <div>
    <!-- 这个组件在搜素页也要用所以我们，定义成全局公共组件 -->
   <TypeNav />
   <ListContainer/>
   <TodayRecommend/>
   <Rank/>
   <Like/>
   <Floor/>
   <Floor/>
  
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
export default {
  name:'Home',
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