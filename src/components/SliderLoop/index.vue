<template>
  <div class="swiper-container" id="mySwiper" ref="banner">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for=" banner in bannerList" :key=" banner.id">
        <img :src="banner.imgUrl" />
      </div>

    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'
export default {
  name: '',
  props:["bannerList"],
  
  watch: {
   bannerList: {
     //这里加immediate是为了小轮播图因为数据结构事先都已经到位了，根本不会放生变化，所以我们让它自动掉用一次，才能让watch
     immediate:true,
      /* 轮播图只能在数据结构完成的时候才能生效，所以在这里面写，写在页面挂在后，由于请求也在哪个时候发的所以结构没有好 */
      handler(newval, oldval) {
        //加nextTick保证页面最近一次跟新完才使用录播图
        this.$nextTick(() => {
         new Swiper(this.$refs.banner, {
           
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination'
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            },

           
          })
        })
      }
    }
  }
  
  
}
</script>

<style scoped>
</style>