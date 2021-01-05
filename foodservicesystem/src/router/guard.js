import router from './index'

router.beforeEach((to,from,next)=>{
  document.title=to.name
  next()
})