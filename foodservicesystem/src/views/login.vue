<template>
  <div class="login">
    <div class="login_title">
      <p>餐饮管理系统</p>
      <p>v1.0</p>
    </div>
    <div class="login_content">
      <div class="form_image">
        <img src="11" alt="123" />
      </div>
      <div class="form">
        <div class="tabs">
          <el-tabs v-model="activeName" :stretch="false">
            <el-tab-pane label="登录" name="login" class="tab_login">
              <div class="login_info">
                <el-input v-model="login.name"
                 type="text" placeholder="请输入账号"
                clearable></el-input>
                <div v-show="true" class="err_msg">账号不能为空</div>
              </div>
              <div class="login_info">
                <el-input v-model="login.pwd" type="password" placeholder="请输入密码"
                clearable></el-input>
               <div v-show="true" class="err_msg">密码不能为空</div>
              </div>
              <div class="button">
                <el-button type="primary" class="button">立即登录</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="注册" name="register">
              <div class="login_info">
                <el-input v-model="login.name"
                 type="text" placeholder="请输入账号"
                clearable></el-input>
                <div v-show="true" class="err_msg">账号不能为空</div>
              </div>
              <div class="login_info">
                <el-input v-model="login.pwd" type="password" placeholder="请输入密码"
                clearable></el-input>
               <div v-show="true" class="err_msg">密码不能为空</div>
              </div>
              <div class="button">
                <el-button type="primary" class="button">立即注册</el-button>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      activeName:'login',
      login:{
        name:'',
        pwd:''
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
}
.login_title {
  position: absolute;
  top: 0;
  left: 0;
}
.login_content{
  width: 400px;
  height: 400px;
  display: flex;
  justify-content: center;
  // align-items: center;
  border: solid 1px red;
  padding: 20px 10px;
  .form {
    .login_info{
      position: relative;
      margin-bottom: 25px;
      .err_msg{
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
      width:0;
  }
  /deep/  .el-tabs__nav-scroll{
    display: flex;
    justify-content: center;
  }
}
</style>
