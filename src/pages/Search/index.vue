<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 3级分类 -->
            <li class="with-x" v-show="searchParams.categoryName">
              {{searchParams.categoryName}}
              <i @click="removecategoryName">x</i>
            </li>
            <!-- 关键字 -->
            <li class="with-x" v-show="searchParams.keyword">
              {{searchParams.keyword}}
              <i @click="removekeyword">x</i>
            </li>
            <!-- 品牌 -->
            <li class="with-x" v-show="searchParams.trademark">
              {{(searchParams.trademark?searchParams.trademark:'').split(':')[1]}}
              <i @click="resveTrademark">x</i>
            </li>
            <!-- 点击属性 -->
            <!-- 属性可以添加多个所以需要遍历 如果为空的就不会显示，所以不限要使用v-show什么的-->
             <li v-for="(props,index) in searchParams.props" :key="index">
              {{props}}
              <i @click="removePRo(index)">x</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @searchForTrademark='searchForTrademark' @searchForAttrValue='searchForAttrValue' />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!--     order: '1:desc',综合    1: 综合,2: 价格 asc: 升序,desc: 降序  active  orderFlag   orderType    iconxiangxia iconxiangshang-->
                <li :class="{active:orderFlag==='1'}">
                  <a href="javascript:;" @click="changeOrder('1')">综合
                    <i class="iconfont" :class="{iconxiangxia:orderType==='desc',iconxiangshang:orderType==='asc'}" v-if="orderFlag==='1'"></i>
                  </a>
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li :class="{active:orderFlag==='2'}">
                  <a href="javascript:;" @click="changeOrder('2')">价格
                    <i class="iconfont" :class="{iconxiangxia:orderType==='desc',iconxiangshang:orderType==='asc'}" v-if="orderFlag==='2'"></i>
                  </a>
                </li>

              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">

                   <router-link :to="`/detail/${goods.id}`">
                   <img :src="goods.defaultImg" />
                   </router-link>

                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{goods.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                   <router-link  :to="`/detail/${goods.id}`">
                    {{goods.title}}
                  </router-link>


                   <!--  <a target="_blank" href="item.html">
                     
                    </a> -->
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>

            </ul>
          </div>
          <!-- 自定以的分页器 需要传几个参数 
          一共多少页
          一页多少条
          连续显示条
          当前在哪个页
          
          
           -->
          <pagination :Currentpage='searchParams.pageNo' :Displaynumber='searchParams.pageSize' :total="List.total" :continuitypage='5' @changePageNum='changePageNum' />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'Search',
  data() {
    return {
      //这里由于开始没有参数，需要自己来定义
      searchParams: {
        category1Id: '',
        category2Id: '',
        category3Id: '',
        categoryName: '',
        keyword: '',
        props: [],
        trademark: '',
        order: '1:desc',
        pageNo: 1,
        pageSize: 3
      }
    }
  },
  beforeMount() {
    //在页面挂在完毕之前就要把数据收集好
    this.OrganizeData()
  },
  mounted() {
    this.getList()
  },
  methods: {
    //删除属性
    removePRo(index){
       this.searchParams.pageNo = 1
       this.searchParams.props.splice(index,1)
        this.getList()
    },
    //商品属性的数组: ["属性ID:属性值:属性名"] 获取点击的是哪一个属性
    searchForAttrValue(attrValue, attrs) {
      let num = this.searchParams.props.indexOf(
        `${attrs.attrid}:${attrValue}:${attrs.attrName}`
      )
      if (num !== -1) return
      this.searchParams.pageNo = 1
      this.searchParams.props.push(
        `${attrs.attrid}:${attrValue}:${attrs.attrName}`
      )
      this.getList()
    },

    //删除品牌信息
    resveTrademark() {
      this.searchParams.pageNo = 1
      this.searchParams.trademark = ''
      this.getList()
    },
    //设置自定义事件去拿品牌的信息
    searchForTrademark(Trademark) {
      /* 品牌: "ID:品牌名称"   tmId  tmName*/
      this.searchParams.trademark = `${Trademark.tmId}:${Trademark.tmName}`
      this.getList()
    },

    //点击删除面包屑的关键字
    removekeyword() {
      this.searchParams.pageNo = 1
      this.searchParams.keyword = ''
      this.$router.push({ name: 'Search', query: this.$route.query })
      //这里我们要处理删除掉关键字，输入框的文字也要清除，使用全局事件总线
      this.$bus.$emit('clearKeyword') //通知头组件删除关键字
      this.getList()
    },

    //点击面包屑的x删除categoryName
    removecategoryName() {
      this.searchParams.pageNo = 1
      this.searchParams.categoryName = ''
      //删除了但是页面的路径没有改变这点需要处理一下
      this.$router.push({ name: 'Search', params: this.$route.params })
      //重新请求数据
      this.getList()
    },

    //绑定却换字体图片的下标
    changeOrder(orderFlag) {
      //首先获取到searchParams的order用于判断
      let oldorderFlag = this.orderFlag // 综合还是价格
      let oldorderType = this.orderType // 降序还是升序
      let neworder = '' //用于生成新的order
      //判断点击的是不是综合
      if (orderFlag === oldorderFlag) {
        //说明点击的是综合，我们呢只需要修改时降序还是升序

        neworder = `${oldorderFlag}:${oldorderType === 'desc' ? 'asc' : 'desc'}`
      } else {
        //说明点击的不是综合，而是价格,默认为降序
        neworder = `${orderFlag}:desc`
      }
      //最后赋值给总数据
      this.searchParams.order = neworder
      //重新请求数据
      this.getList()
    },

    //定义却换的页面的方法
    changePageNum(page) {
      this.searchParams.pageNo = page
      //跟新数据
      this.getList()
    },

    //这里为了方便整理参数方便复用，做成一个函数
    OrganizeData() {
      //首先获取到keyword
      let { keyword } = this.$route.params
      //获取从3级列表带过来的参数
      let {
        category1Id,
        category2Id,
        category3Id,
        categoryName
      } = this.$route.query

      let searchParams = {
        ...this.searchParams,
        keyword,
        category1Id,
        category2Id,
        category3Id,
        categoryName
      }
      //在把数据值为空的删除掉，不要带上
      Object.keys(searchParams).forEach(item => {
        if (searchParams[item] === '') {
          delete searchParams[item]
        }
      })
      this.searchParams = searchParams
    },

    //定义请求数据的函数
    getList() {
      this.$store.dispatch('getList', this.searchParams)
    }
  },
  computed: {
    ...mapState({
      List: state => state.search.List
    }),
    ...mapGetters(['goodsList']),

    //这里把order的升序或者降序计算出来，方便使用
    //orderFlag代表是综合，还是价格
    orderFlag() {
      return this.searchParams.order.split(':')[0]
    },
    //orderType代表是升序还是降序
    orderType() {
      return this.searchParams.order.split(':')[1]
    }
  },
  watch: {
    //这里解决不能2次发送请求的bug，应为请求时在mounted来请求的，所以只会请求一次，通过监视rout的路径来发送请求
    $route() {
      //如果route发生变化，就重新发送请求，当然要重新整理一次数据
      this.OrganizeData()
      this.getList()
    }
  },

  components: {
    SearchSelector
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>