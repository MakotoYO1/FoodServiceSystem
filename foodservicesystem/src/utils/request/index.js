import axios from 'axios'
import qs from 'qs'
import {Message} from 'element-ui'

const service=axios.create({
  timeout:20000,
  baseURL:'localhost:5000',
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
    return Promise.reject(error)
  }
)

export default service