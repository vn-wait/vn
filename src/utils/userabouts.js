/* 
utils专门用来定义公共组件的，也就大家都可以用的插件，所以将uuid生成的方法
在这里定义，由于uuid在脚手架中，有引用它的数据，所以不需要下载，直接引入
*/
import {
  v4 as uuidv4
} from 'uuid';

//这里定义成一个方法，并且把这个方法暴露出去
export function getUserTempId () {
 //在函数内部首先判断uuid是否存在，而如何判断了，一般情况下，回家uuid在本地存储方案中永久保存，所以首先先去  localStorage里面去找看一看有没有
  //注意名字必须叫userTempId
  let userTempId = localStorage.getItem('UUID_KEY')
  //接下来判断这个值存在嘛
  if (!userTempId) {
    //取反进来说明没有，就要生成一个uuid并且在localStorage中存储一份
    userTempId = uuidv4()
    localStorage.setItem('UUID_KEY', userTempId)
  }
   //最后将uuid 返回出去
  return userTempId
}
