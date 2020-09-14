/* 在这里第2次封装ajax*/
import axios from 'axios'


/* 这里做一个功能就是加载条的功能，需要下载一个包 nprogress
nprogress.start(); 加载中
NProgress.done(); 加载结束
*/
//引入这个包还需要引入js文件和css问价
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
//引入store
import store from '../store'



//创建一个新的aiax的实列
const instance = axios.create({
  //设置基本的请求路径
  baseURL: '/api',
  //设置请求时间
  timeout:5000 

})
//设置请求拦截器，和响应拦截器

instance.interceptors.request.use((config) => {
  
 NProgress.start();

 //在请求头中添加uuid
 // 1拿到uuid
  let userTempId = store.state.user.userTempId
  //2添加到请求头中
  config.headers.userTempId = userTempId
  
  
  

 //config 请求报文，可以在这里设置请求头
  return config;
}
);

// Add a response interceptor
instance.interceptors.response.use((response) => {
  NProgress.done();
  
 //response请求报文我们请求回来的数据在这个里面的data 中如果我们只需要数据就可以返回response.data
  return response.data ;
},
  (error)=>{
   //这里2个选择，是否需要继续处理失败的信息，如果需要返回失败的promise跟下面的代码一下
   //return Promise.reject(error);
    
    //提示一下响应出错
    alert('请求失败了' +error.message || '未知错误')
    
    NProgress.done()
    //如果不想继续处理错误，就在这里同意处理错误 返回一个pending状态的promise即可
    return new Promise(()=>{})
});

export default instance
