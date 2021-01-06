<template>
  <div class="lay_header">
    <div class="logo"><img src="~@/assets/img/layheader_1.png" /></div>
    <div class="info">
     <el-menu
        :router="true"
        mode="horizontal"
        :default-active="currentPath"
        class="menu"
        text-color="white"
        active-text-color='rgb(255, 208, 75)'
      >
      <template v-for="(route,index) in routesMenu">
        <el-menu-item  :key="index" :index="currentRoutes.path+'/'+route.path" v-if="!route.meta.hidden">
          <span slot="title">{{route.name}}</span>
        </el-menu-item>
      </template>
      </el-menu>
      <div class="user_info">
        <span>欢迎你，<span class="user_name">{{userInfo.name}}</span></span>
        <div class="user_exit">
          <div class="img"><img src="~@/assets/icon/exit.png" /></div>
          <span @click="logout">退出</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'layHeader',
  data(){
    return{
      userInfo:this.$store.state
    }
  },
  computed:{
    currentRoutes(){
      for(let k of this.$router.options.routes){
        if(k.path==='/app'){
          return k
        }
      }
    },
    routesMenu(){
      return this.currentRoutes.children.filter(item=>{
        if(item.path==='user'&&Number(this.userInfo.role)!==1){
          return false
        }
        return !item.meta.hidden
      })
    },
    currentPath(){
      return this.$route.path
    }
  },
  watch:{
    '$route.path':{
      immediate:true,
      handler:function(path){
        if(path==='/app'){
          this.$router.push(path+'/'+this.routesMenu[0].path)
        }
      }
    }
  },
  methods:{
    logout(){
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.lay_header {
  width: 100%;
  height: 60px;
  display:  flex;
  align-items: flex-end;
  background-color: rgb(84, 92, 100);;
  .logo{
    width: 50px;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .info {
    width: calc(100% - 100px);
    height: 60px;
    display: flex;
    align-items: flex-end;
    .menu {
      height: 100%;
      border-bottom: none;
      padding-top: 4px;
      box-sizing: border-box;
      border: 0;
      .el-menu-item {
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        height: 56px !important;
        &:hover{
          background-color: #303133;
        }
        &.is-active{
          background-color: rgb(84, 92, 100);
        }
      }
      background-color: rgb(84, 92, 100);
    }
    .user_info {
      margin-left: auto;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      span{
        display: inline-block;
        height: 30px;
      }
      .user_name{
        color: #ffd04b;
      }
      .user_exit {
        margin-left: 20px;
        margin-right: 20px;
        display: flex;
        cursor: pointer;
        .img {
          width: 20px;
          height: 20px;
          margin-right: 10px;
          img{
            width:100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>