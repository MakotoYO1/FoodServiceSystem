import router from './index'
import store from '@/store/index'
import {Message} from 'element-ui'

router.beforeEach((to,from,next)=>{
  document.title=to.name
  let token=store.state.token
  console.log(token)
  let whitelist=['/login','/error']
  if(token){
    next()
  }else{
    if(whitelist.includes(to.path)){
      next()
      return
    }
    Message.error('请先登录！')
    // token不存在除非是登录页面，不然跳转404
    next('/error')
  }
})