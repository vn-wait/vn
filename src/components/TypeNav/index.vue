<template>
  <div class="type-nav">
    <div class="container" @click="toSearch">
      <div @mouseenter="movelist" @mouseleave="moveoutlist">
        <h2 class="all">全部商品分类</h2>
        <transition name="isshow">
          <div class="sort" v-show="show">
            <div class="all-sort-list2">
              <div class="item bo" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{item_on:currentIndex === index}" @mouseenter="movein(index)" @mouseleave="moveout">
                <h3>
                  <a href="javascript:;"
                   :data-categoryName ='c1.categoryName'
                   :data-category1Id ='c1.categoryId'
                  >{{c1.categoryName}}</a>
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                      <dt>
                        <a href="javascript:;"
                          :data-categoryName ='c2.categoryName'
                          :data-category2Id ='c2.categoryId'
                        >{{c2.categoryName}}</a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a href="javascript:;"
                           :data-categoryName ='c3.categoryName'
                           :data-category3Id ='c3.categoryId'
                            >{{c3.categoryName}}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
//引入_.throttle函数我们只引入这一个
import throttled from 'lodash/throttle'
export default {
  name: 'TypeNav',
  data() {
    return {
      show: true,
      currentIndex: -1 //这里添加一个属性，用来确定鼠标移入 移出的时候
    }
  },
  mounted() {
    //在页面挂在完成之后判断，是在哪个页面，如果不是在home页让3级列表隐藏
    if (this.$route.path !== '/home') {
      this.show = false
    }
  },
  methods: {
    /* 
     category1Id
      category2Id
      category3Id
      categoryName
      keyword
       props
       trademark
    
    
    */
   //这里是做点击3级列表的a条转去搜索页，这里使用的是事件代理，这里我们使用自定义属性来获取要的数据(注意是个a设置的)
      toSearch(event){
      
       //通过event事件对象我们可以拿到点击的是哪一个a
       let target = event.target //拿到触发事件的元素
       let data =target.dataset //拿到触发事件元素上的自定义属性
        console.log(data)  //注意拿过来的东西是小写哦
       //这里拿需要的数据
        let {categoryname,category1id,category2id,category3id} = data
      //判断是否点击了a
       if(categoryname){
       //说明点击的是a，应为只有a才有这个categoryname属性
     
      let location = {
        name:'Search'
      }
      let query = {
        categoryName:categoryname
      }
       
      if(category1id){
        query.category1Id =category1id
      }else if(category2id) {
         query.category2Id =category2id
      }else{
         query.category3Id =category3id
      }

      location.query=query
      //这里要判断一下有没有parmas参数有要带上
      if(this.$route.params){
        location.params=this.$route.params
      }
      this.$router.push(location)
      }

    

      

      },
    //移出列表列表要隐藏3级列表在搜索页
    moveoutlist() {
      if (this.$route.path !== '/home') {
        this.show = false
      }
    },

    //移进3级列表展开列表
    movelist() {
      this.show = true
    },

    //鼠标移出li的时候
    moveout() {
      this.currentIndex = -1
    },
    //引入li的函数,我们需要做个节流，一段时间只能触发一次
    /*   movein(index) {
      console.log(index)
      //用下标来来确定给哪个添加高亮显示
      this.currentIndex = index
    } */
    movein: throttled(
      function(index) {
        console.log(index)
        this.currentIndex = index
      },
      30,
      { trailing: false }
    )
  },
  computed: {
    ...mapState({
      categoryList: state => state.home.categoryList
    })
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      &.isshow-enter {
        height: 0;
        opacity: 0;
      }
      &.isshow-enter-to {
        height: 416px;
        opacity: 1;
      }
      &.isshow-enter-active {
        transition: all 0.5s;
      }
      &.isshow-leave {
        height: 426px;
        opacity: 1;
      }
      &.isshow-leave-to {
        height: 0;
        opacity: 0;
      }
      &.isshow-leave-active {
        transition: all 0.5s;
      }

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.item_on {
            background-color: skyblue;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>