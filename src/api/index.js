/* 这里面定义的请求函数，引入2次封装的ajax */
import Ajax from '../ajax/Ajax'
import Mork from '../ajax/Mork'

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