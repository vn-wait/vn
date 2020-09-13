<template>
  <div class="spec-preview">
    <img :src="defaultImg.imgUrl" />
    <!-- 这里绑定鼠标移入事件 -->
    <div class="event" @mousemove="move"></div>
    <div class="big">
     <img :src="defaultImg.imgUrl"   ref="big"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['imgList'],
    data () {
      return {
        defaultIndex:0
      }
    },
    mounted(){
    this.$bus.$on('changeDefaultIndex',this.changeDefaultIndex)
    },

    methods:{
    //鼠标移入图片框是蒙版跟着移动
    move(event){
     //获取到蒙版
     let mask = this.$refs.mask
     //获取大图框
     let big = this.$refs.big
    //蒙版移动的距离等于的是鼠标在图片框的距离减去蒙版宽度的2分1，以为鼠标永远在蒙版中心
    //获取鼠标移动的x轴和y轴
     let mouseX = event.offsetX
     let mouseY = event.offsetY
     //计算出蒙版的移动的距离
      let maskX = mouseX - mask.offsetWidth / 2
      let maskY = mouseY - mask.offsetHeight / 2

    //还要判断边界值
    if(maskX<0){
      maskX = 0
    }else if(maskX > mask.offsetWidth  ){
      maskX =  mask.offsetWidth
    }

    if(maskY<0){
      maskY = 0
    }else if(maskY > mask.offsetWidth  ){
      maskY = mask.offsetHeight
    }
    
    mask.style.left = maskX + "px"
    mask.style.top = maskY + "px"
    //大图正好是蒙版-的2倍数
    big.style.left = -2 *maskX + "px"
    big.style.top = -2 * maskY + "px"
    },

    //这里一个方法获取小列表的index也就是当前选中的小图
    changeDefaultIndex(index){
      this.defaultIndex = index
    },

    
    },
    computed:{
      //计算一下避免a,b,c的错误
      defaultImg(){
        return this.imgList[this.defaultIndex] || {}
      }
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>