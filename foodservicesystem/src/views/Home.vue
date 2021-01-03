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
    // let res=await test.add({
    //   name:'abc22',
    //   sex:'男',
    //   phone:'15252803267',
    //   birthday:'2020-05-27'
    // })
    // if(res.status===200){
    //   console.log(res.data.msg)
    // }
    let res1=await test.search()
    console.log(res1)
    // let rest=await test.test1()
    // console.log(rest)
    // let res=await test.remove('5ff1fe449d29ff591cc8bb2b')
    // console.log(res)
    let res2=await test.update('5ff1fc4f1cbf34215c1ba7ba',{
      name:"ttt",
      sex:"女"
    })
    console.log(res2)
        let res3=await test.search()
    console.log(res3)
  }
}
</script>
