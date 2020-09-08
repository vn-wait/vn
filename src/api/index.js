/* 这里面定义的请求函数，引入2次封装的ajax */
import Ajax from '../ajax/Ajax'

//3.首页三级分类  /api/product/getBaseCategoryList  GET  记得暴露出去
export const reqCategoryList = () => {
  return Ajax({
    url: '/product/getBaseCategoryList',
    method: 'get'
  })
}