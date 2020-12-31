const Koa=require('koa')
const Router=require('koa-router')
const cors = require('koa2-cors');

// 引入子路由
const childRouter=require('./routes/routes')

// 实例化koa
const app=new Koa()
const router=new Router()

// 加载子路由
router.use('/api',childRouter.routes(),childRouter.allowedMethods())


// 允许跨域访问
app.use(cors({
  origin: function (ctx) {
     // return "*"; // 允许来自所有域名请求
     // 允许多个跨域
     var allowCors = ['http://localhost:8080',  'http://localhost:8081']
      
     return allowCors.includes(ctx.header.origin)?ctx.header.origin:''
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE','PUT'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))

// 配置路由
app.use(router.routes(),router.allowedMethods())

// 设置端口号
const port= 5000

app.listen(port,()=>{
  console.log(`server started on ${port}`)
})