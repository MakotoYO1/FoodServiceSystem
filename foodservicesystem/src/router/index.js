import Vue from 'vue'
import VueRouter from 'vue-router'
import LayOut from '../views/layout/LayOut.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name:'foodservicesystem',
    redirect:'/login'
  },
  {
    path:'/login',
    name:'登录',
    component:()=>import('@/views/login.vue')
  },
  {
    path:'*',
    name:'404',
    component:()=>import('@/views/error/404')
  },
  {
    path: '/app',
    name: '餐饮管理系统',
    component: LayOut,
    children:[
      {
        path:'member',
        name:'会员管理',
        meta:{
          title:'会员管理',
          hidden:false
        },
        component:()=>import('@/views/member/Index.vue')
      },
      {
        path:'seat',
        name:'桌台管理',
        meta:{
          title:'桌台管理',
          hidden:false
        },
        component:()=>import('@/views/seat/Index.vue')
      },
      {
        path:'dish',
        name:'菜品管理',
        meta:{
          title:'菜品管理',
          hidden:false
        },
        component:()=>import('@/views/dish/Index.vue')
      },
      {
        path:'bill',
        name:'账单管理',
        meta:{
          title:'账单管理',
          hidden:false
        },
        component:()=>import('@/views/bill/Index.vue')
      },
      {
        path:'staff',
        name:'员工管理',
        meta:{
          title:'员工管理',
          hidden:false
        },
        component:()=>import('@/views/staff/Index.vue')
      },
      {
        path:'user',
        name:'用户管理',
        meta:{
          title:'用户管理',
          hidden:false
        },
        component:()=>import('@/views/user/Index.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode:'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  routes
})

export default router
