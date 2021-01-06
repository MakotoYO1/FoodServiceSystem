<template>
  <div class="layout">
    <lay-header></lay-header>
    <el-container class="content">
      <router-view></router-view>
    </el-container>
  </div>
</template>

<script>
export default {
  name:'layout',
  data(){
    return {}
  },
  created(){
    console.log(this.$router)
  }
}
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  .content {
    height: calc(100% - 60px);
    min-height: calc(100vh - 60px);
    background-color: #f9fafc;
    padding: 30px 30px;
  }
}
</style>