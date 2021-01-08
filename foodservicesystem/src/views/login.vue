<template>
  <div class="login">
    <div class="login_title">
      <p>餐饮管理系统NJFU</p>
      <p>v1.0</p>
      <p>byf zs</p>
    </div>
    <div class="login_content">
      <div class="form_image">
        <img class="img" src="~@/assets/img/login_image1.jpg" alt="login" />
      </div>
      <div class="form">
        <div class="tabs">
          <el-tabs v-model="activeName" :stretch="false" @tab-click="tabClick">
            <el-tab-pane label="登录" name="login" class="tab_login">
              <div class="login_info">
                <el-input
                  @focus="login_nj = false"
                  @blur="login.name ? (login_nj = false) : (login_nj = true)"
                  v-model="login.name"
                  type="text"
                  placeholder="请输入账号"
                  clearable
                ></el-input>
                <div v-show="login_nj" class="err_msg">账号不能为空</div>
              </div>
              <div class="login_info">
                <el-input
                  @focus="login_pj = false"
                  @blur="login.name ? (login_pj = false) : (login_pj = true)"
                  v-model="login.pwd"
                  type="password"
                  placeholder="请输入密码"
                  clearable
                ></el-input>
                <div v-show="login_pj" class="err_msg">密码不能为空</div>
              </div>
              <div class="button">
                <el-button type="primary" class="button" @click="loginUser"
                  >立即登录</el-button
                >
              </div>
            </el-tab-pane>
            <!-- 注册功能不需要改成超级管理员创建账号 -->
            <!-- <el-tab-pane label="注册" name="register">
              <div class="login_info">
                <el-input
                  @focus="register_nj = false"
                  @blur="
                    register.name ? (register_nj = false) : (register_nj = true)
                  "
                  v-model="register.name"
                  type="text"
                  placeholder="请输入账号"
                  clearable
                ></el-input>
                <div v-show="register_nj" class="err_msg">账号不能为空</div>
              </div>
              <div class="login_info">
                <el-input
                  @focus="register_pj = false"
                  @blur="
                    register.pwd ? (register_pj = false) : (register_pj = true)
                  "
                  v-model="register.pwd"
                  type="password"
                  placeholder="请输入密码"
                  clearable
                ></el-input>
                <div v-show="register_pj" class="err_msg">密码不能为空</div>
              </div>
              <div class="radios login_info">
                <el-radio-group v-model="register.role">
                  <el-radio :label="1">管理员</el-radio>
                  <el-radio :label="2">员工</el-radio>
                </el-radio-group>
              </div>
              <div class="button">
                <el-button @click="registerUser" type="primary" class="button">立即注册</el-button>
              </div>
            </el-tab-pane> -->
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import user from '@/api/user.js'

export default {
  name: 'login',
  data() {
    return {
      activeName: 'login',
      login: {
        name: '',
        pwd: '',
      },
      login_nj: false,
      login_pj: false,
      register: {
        name: '',
        pwd: '',
        role: 2,
      },
      register_nj: false,
      register_pj: false,
    }
  },
  created(){
    // 进入登录页面时清除信息
    sessionStorage.clear()
  },
  methods: {
    tabClick(tab) {
      if (tab.name === 'login') {
        this.register_nj = false
        this.register_pj = false
      } else {
        this.login_nj = false
        this.login_pj = false
      }
    },
    async loginUser() {
      if (this.login.name === '') {
        this.$message.error("请输入账号")
        return false
      }
      if (this.login.pwd === '') {
        this.$message.error("请输入密码")
        return false
      }
      let res=await user.search(this.login)
      if(res.code===0){
        if(res.data.length){
          let data=res.data[0]
          let id=data.userId
          user.updateRecords(id,{
            ip:returnCitySN['cip'],
            location:returnCitySN['cname']
          })
          this.$store.dispatch('login',{
            name:data.name,role:data.role,id:data.userId
          })
          this.$message.success('登录成功')
          this.$router.push('/app')
        }else{
          this.$message.error('用户名或密码不正确，请检查')
          return false
        }
      }
    },
    async registerUser(){
      if (this.register.name === '') {
        this.$message.error("请输入账号")
        return false
      }
      if (this.register.pwd === '') {
        this.$message.error("请输入密码")
        return false
      }
      let res=await user.add({
        ...this.register,records:[{
          ip:returnCitySN['cip'],
          location:returnCitySN['cname']
        }]
      })
      if(res.code===0){
        this.$message.success('注册成功')
        this.activeName='login'
        this.register.name=''
        this.register.pwd=''
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-image: url("~@/assets/img/background_image1.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
.login_title {
  position: absolute;
  top: 0;
  left: 0;
}
.login_content {
  display: flex;
  justify-content: center;
  align-items: center;
  .form_image {
    margin-right: 20px;
    width: 300px;
    height: 300px;
    .img {
      width: 100%;
      height: 100%;
    }
  }
  display: flex;
  justify-content: center;
  // align-items: center;
  // border: solid 1px red;
  padding: 20px 10px;
  .form {
    padding: 20px 20px;
    border-radius: 20px;
    background-color: white;
    .login_info {
      position: relative;
      margin-bottom: 25px;
      .err_msg {
        position: absolute;
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        color: red;
      }
    }
    .button {
      width: 100%;
    }
  }
  .radios {
    display: flex;
    justify-content: center;
  }
}
.tabs {
  width: 100%;
  align-self: start;
  /deep/ .el-tabs__item {
    padding: 0 10px;
    // color:#2980b9;
    font-weight: bold;
    font-size: 20px;
  }
  /deep/ .el-tabs__nav-wrap::after {
    width: 0;
  }
  /deep/ .el-tabs__nav-scroll {
    display: flex;
    justify-content: center;
  }
}
</style>
