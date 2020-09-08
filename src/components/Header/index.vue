<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p>
            <span>请</span>
            <!-- 这里用router-link 来却换导航，在用router-view来显示 -->
            <router-link  to='/login'>登录</router-link>
            <!--   <a href="###">登录</a> -->
            <!--  <a href="###" class="register">免费注册</a> -->
            <router-link  to='/register' class="register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link to='/home' class="logo" title="尚品汇"> 
        <img src="./images/logo.png" alt="">
        </router-link>

        <!-- <a class="logo" title="尚品汇" href="###" target="_blank">
          <img src="./images/logo.png" alt="">
        </a> -->
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <!-- 这里需要收集客户传的值，带上一起去搜索页 -->
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
          <!-- 这里是一个按钮所以我们只能用编程式导航 -->
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="toSearch">搜索</button>
        </form>
      </div>
    </div>
  </header>

</template>

<script>
export default {
  name:'Header',
  data(){
    return {
      keyword:''
    }
  },
  methods:{
    //去搜索页
    toSearch(){
      //由于有能我们需要带关键字过去所以这里需要改一下
      //收集parmas参数
     let location = {
       //注意params参数它不能和path一起配合切换路由，这能和name配合,
       //解决完这个之后，会遇见一个bug，就是关键字为空的时候，会导致页面路径出问题， 1解决方式 1 要吗不设置params参数 2在可传可不传的前提下关键字为空的时候值为undifend

       //path:'/search',
       name:'Search',
       params:{
         keyword:this.keyword || undefined
       }

     }
     this.$router.push(location)
   
    }
  }
  
}
</script>

<style  lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>