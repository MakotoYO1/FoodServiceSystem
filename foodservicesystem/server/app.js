const Koa=require('koa')
const Router=require('koa-router')
const cors = require('koa2-cors');

// 实例化koa
const app=new Koa()
const router=new Router()

router.get('/api/test1',async(ctx)=>{
  ctx.body={
    msg:'hello koa'
  }
})

// 配置路由
app.use(router.routes(),router.allowedMethods())

// 允许跨域访问
app.use(cors({
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
  maxAge: 100,
  credentials: true,
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}));
// 设置端口号
const port= 5000

app.listen(port,()=>{
  console.log(`server started on ${port}`)
})