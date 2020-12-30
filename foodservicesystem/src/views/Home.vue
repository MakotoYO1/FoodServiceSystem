<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <el-button>默认按钮</el-button>
    <el-button type="primary">123</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import test from '@/api/member.js'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  async created(){
    let res=await test.test1()
    if(res.status===200){
      console.log(res.data.msg)
    }
  }
}
</script>
