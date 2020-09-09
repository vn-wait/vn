/* 创建mock文件，和请求数据的配置 */
import mock from 'mockjs'
import banner from './banner.json'
import floor from './floor.json'

//模拟数据的方法

mock.mock('/mock/banner', {
  code: 200,
  data: banner
})

mock.mock('/mock/floor', {
  code: 200,
  data: floor
})