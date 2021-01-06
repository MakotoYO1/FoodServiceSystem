import router from './index'
import store from '@/store/index'
import {Message} from 'element-ui'

router.beforeEach((to,from,next)=>{
  document.title=to.name
  let token=store.state.token
  let role=store.state.role
  // console.log(token)
  let whitelist=['/login','/error']
  if(token){
    // 管理员才可进行用户管理
    if(to.path==='/app/user'&&Number(role)!==1){
      next('/error')
      return
    }
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