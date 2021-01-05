<template>
  <div class="error">
    <div class="error_title">
      <div>404</div>
    </div>
    <div class="error_content">
      <div class="pic">
        <img src="~@/assets/img/404cat.png" />
      </div>
      <div class="content">
        <h1>看来你来了不该来的地方喵</h1>
        <h2>那就让本喵带你出去吧！~</h2>
        <img src="~@/assets/icon/return-404.png" @click="$router.push('/')"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'error',
  data(){
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.error{
  color: #2c3e50;
  position: absolute;
  top: 100px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  .error_title {
    font-size: 200px;
    text-align: center;
  }
  .error_content{
    display: flex;
    justify-content: center;
    align-items: start;
    .content {
      padding-top: 30px;
      text-align: center;
      img {
        cursor:pointer;
        width: 20%;
        height: 20%;
      }
    }
  }
}

</style>