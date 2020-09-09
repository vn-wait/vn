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