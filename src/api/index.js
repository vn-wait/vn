/* 这里面定义的请求函数，引入2次封装的ajax */
import Ajax from '../ajax/Ajax'
import Mork from '../ajax/Mork'
import { method } from 'lodash'

//3.首页三级分类  /api/product/getBaseCategoryList  GET  记得暴露出去
export const reqCategoryList = () => {
  return Ajax({
    url: '/product/getBaseCategoryList',
    method: 'get'
  })
}

//获取bannerList列表
export const reqbannerList = () => {
  return Mork({
    url: '/banner',
    method:'GET'
  })
}
//获取floorList列表
export const reqfloorList = () => {
   return Mork({
     url: '/floor',
     method: 'GET'
   })

}

//4.搜索商品  /api/list  POST  需要请求体参数



/* 
category1Id
category2Id 
category3Id 
categoryName
keyword string 
props 

trademark 

order string N 排序方式
1: 综合, 2: 价格 asc: 升序, desc: 降序
示例: "1:desc"
pageNo number N 页码
pageSize number N 每页数量

*/


export const reqList = (searchParams) => {
  return Ajax({
    url: '/list',
    method: 'POST',
    data: searchParams
  })
}

// /api/item/{ skuId }   GET  

export const reqdetails = (skuId) => {
  return Ajax({
    url: `/item/${skuId}`,
    method:'get'
  })
}
//7.添加到购物车(对已有物品进行数量改动)
///api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateCart = (skuId, skuNum) => {
  return Ajax({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'POST'
})

}
//6.获取购物车列表
///api/cart/cartList  grt请求 没有参数

export const reqcartList = () => {
  return Ajax({
    url: '/cart/cartList',
    method:'GET'
  })
} 

//7.切换商品选中状态  /api/cart/checkCart/{skuID}/{isChecked}   GET
export const reqUpdateIsCheck = (skuID,isChecked) => {
  return Ajax({
    url: `/cart/checkCart/${skuID}/${isChecked} `,
    method:'get'
  })
}
//8.删除购物车商品  /api/cart/deleteCart/{skuId} 
export const reqDeleteCart = (skuId) => {
  return Ajax({
    url: `/cart/deleteCart/${skuId}`,
    method: 'DELETE'
   })


}
