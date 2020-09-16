<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for=" cart in cartList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked='cart.isChecked===1' @click="updateOne(cart)">
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{ cart.skuName}}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{cart.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:;" class="mins" @click="updateCartNum(cart,-1)">-</a>
            <!-- 有时候顾客会直接输入数组，所以要向办法获取它数的值，而且是在原有的基础上加的  注意这里输入的是字符串需要改一下-->
            <input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt" @change="updateCartNum(cart, $event.target.value*1)">
            <a href="javascript:;" class="plus" @click="updateCartNum(cart,+1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.skuPrice * cart.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCart(cart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>

      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <!-- 这里的全选按钮是可以页面变化的，所以设置成响应式 -->
        <input class="chooseAll" type="checkbox" v-model="isCheckAll">
        <span>全选</span>
      </div>
      <div class="option">
       <a href="javascript:;" @click="deleteAllCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{checkNum}}</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{allMoney}}</i>
        </div>
        <div class="sumbtn">
        <router-link to="/trade" class="sum-btn">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'ShopCart',
  data() {
    return {}
  },
  mounted() {
    this.getShopCartList()
  },
  methods: {
    //定义按钮添加个数或者减少个数
   async updateCartNum(cart,disNum){
     //首先要判断顾客添加的个数会不会让个数小于1，如果小于1需要修正回来
     if (cart.skuNum + disNum < 1){
       disNum = 1-cart.skuNum //这样能最跟数就是1
     }
       try {
        await this.$store.dispatch('addOrUpdateCart', {
          skuId: cart.skuId,
          skuNum: disNum
        })
        this.getShopCartList()
      } catch (error) {
        alert(error.message)
      }

    },


    //定义删除选中的所有商品
    async deleteAllCart(){
      console.log(111)
     try{
       await this.$store.dispatch('deleteAllCart')
       //成功跟新
        this.getShopCartList()
     }catch(error){
         alert('失败了请求' + error.message)
     }


    },


    //定义删除单个商品的函数
    async deleteCart(cart){
     try{
     const result = await this.$store.dispatch('deleteCart',cart.skuId)
  
     this.getShopCartList()
     }catch(error){
       alert('失败了请求' + error.message)
     }
    },
    //定义跟新单个选框的isChecked属性
    async updateOne(cart) {
      console.log(cart.isChecked)
      try {
        await this.$store.dispatch('updateIsCheck', {
          skuID: cart.skuId,
          isChecked: cart.isChecked === 1 ? 0 : 1
        })
        //成功之后重新更新一下数据
        this.getShopCartList()
      } catch (error) {
        //失败了
        alert('失败了请求' + error.message)
      }
    },

    //定义拿数据的函数
    getShopCartList() {
      this.$store.dispatch('getShopCartList')
    }
  },
  computed: {
    //这里计算的是点击全选选框的打勾与否
    isCheckAll: {
      //这里的全选框需获取，和设置，所以需要设置成一个对象，如果只是获取的话，就可以设置为函数
      get() {
        //这里是获取，只有所有单选框都是选中的才可以选中
        return this.cartList.every(item => item.isChecked === 1)  && this.cartList.length > 0
      },
      /* 这里定义的写的设置全选按钮的时候所有的选框按钮的isChecked的值会跟全选的一样 */
      async set(val) {
        //注意这里的val的值式布尔值，所以真为1 否为0
        try {
          const reust=  await this.$store.dispatch('updateAllIsCheck', val ? 1 : 0)
             //成功之后重新请求数据
             this.getShopCartList()
        } catch (error) {
          alert('失败了' + error.message)
        }
      }
    },

    //这里计算的是总价
    allMoney() {
      //同样要计算每一个商品的总价
      return this.cartList.reduce((p, c) => {
        if (c.isChecked === 1) {
          p += c.skuNum * c.cartPrice
        }
        return p
      }, 0)
    },

    //这里计算有多少少选中的商品
    checkNum() {
      return this.cartList.reduce((p, c) => {
        //这里面p代表上一次的返回，c代表数组的每一个对象
        //判断isChecked是不是1 ，如果是1 就代表选中的状态
        if (c.isChecked === 1) {
          p += c.skuNum
        }
        return p
      }, 0)
    },
    ...mapState({
      cartList: state => state.shopcart.cartList
    })
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>