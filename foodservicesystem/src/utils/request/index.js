import axios from 'axios'
import qs from 'qs'
import {Message} from 'element-ui'

const service=axios.create({
  timeout:20000,
  baseURL:'http://localhost:5000/api/',
  // get请求参数序列化
  paramsSerializer:function(params) {
    return qs.stringify(params,{arrayFormat:'repeat'})
  }
})
/**
 * 请求前拦截
 */
service.interceptors.request.use(
  config=>{
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * 请求后拦截
 */
service.interceptors.response.use(
  async response=>{
    return Promise.resolve(response)
  },
  error => {
    if(!error.response){
      // 请求超时状态
      if (error.message.includes('timeout')) {
        Message.error('请求超时，请检查网络是否连接正常')
      } else {
        Message.error('请求失败，请检查网络是否已连接')
      }
      return
    }
    const responseCode=error.response.status
    switch(responseCode.toString()[0]){
      case '4':
        Message.error('客户端请求异常')
        break
      case '5':
        Message.error('服务器异常')
        break
      // 其他错误，直接抛出错误提示
      default:
        Message.error(error.response.data.message)
    }
    return Promise.reject(error)
  }
)

export default service