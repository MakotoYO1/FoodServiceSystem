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
import teststaff from '@/api/staff.js'
import testSeat from '@/api/seat.js'
import testDish from '@/api/dish.js'
import testBill from '@/api/bill.js'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  async created(){
    // let res=await test.add({
    //   name:'abc22',
    //   sex:'male',
    //   phone:'15252803267',
    //   birthday:'2020-05-27',
    //   rate:'gold',
    //   integral:50
    // })
    // if(res.status===200){
    //   console.log(res.data.msg)
    // }
    // let res1=await test.search()
    // console.log(res1)
    // let rest=await test.test1()
    // console.log(rest)
    // let res=await test.remove('5ff1fe449d29ff591cc8bb2b')
    // console.log(res)
    // let res2=await test.update('5ff1fc4f1cbf34215c1ba7ba',{
    //   name:"ttt",
    //   sex:"女"
    // })
    // console.log(res2)
    //     let res3=await test.search()
    // console.log(res3)
    // let res1=await teststaff.add({
    //   name:'li',
    //   sex:'male',
    //   age:18,
    //   phone:15252475083,
    //   role:'cook'
    // })
    // console.log(res1)
    // let res3=await teststaff.remove('5ff290095e8ea41a0c50bffc')
    // let res2=await teststaff.search()
    // console.log(res2)
    // let res=await testSeat.remove('5ff2b480c4a8ab15cc994d24')
    // let res=await testSeat.add({
    //   showId:'002',
    //   reserved:true
    // })
    // let res1=await testSeat.search()
    // console.log(res1)
    // let res=await testDish.add({
    //   showId:'002',
    //   name:'tangcu',
    //   type:1
    // })
    // let res1=await testDish.search()
    // console.log(res1)
    // let res2=await testDish.update('5ff2d0d8d2c11e09509f2af2',{
    //   price:100,
    //   provided:true
    // })
    //     let res1=await testDish.search()
    // console.log(res1)
    // let res2=await testDish.remove('5ff2d0d8d2c11e09509f2af2')
    let res=await testBill.add({
      showId:'001',
      showId_t:'001',
      showId_s:'002',
      dishInfo:[
        {
          showId:'001',
          name:'tangcu',
          price:12,
          count:2
        }
      ]
    })
    let res2=await testBill.update('5ff33445c110d82f14f57e3e',{
      showId_t:'002'
    })
    let res3=await testBill.remove('5ff33445c110d82f14f57e3e')
    let res1=await testBill.search()

  }
}
</script>
