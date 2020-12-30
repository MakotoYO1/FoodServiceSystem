<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {test1} from '@/api/member.js'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  created(){
    test1().then(res=>{
      console.log(res)
    })
  }
}
</script>
