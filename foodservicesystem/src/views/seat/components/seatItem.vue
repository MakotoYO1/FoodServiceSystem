<template>
  <div class="seat_item">
    <div class="seat_title" :class="{reserved:datas.reserved}">
      <span>{{datas.showId}}</span>
    </div>
    <div class="seat_main" :class="{reserved:datas.reserved}" @click="editSeat">
      <div class="type_word">{{typeDict[datas.type]}}</div>
    </div>
    <div class="seat_footer">
      <el-button class="delete_button" type="danger" icon="el-icon-delete" circle @click="deleteSeat"></el-button>
    </div>
  </div>
</template>

<script>
export default {
  name:'seatItem',
  props:{
    datas:{
      type:Object,
      default:function(){
        return {}
      }
    }
  },
  data(){
    return {
      typeDict:{
        'small':'小',
        'middle':'中',
        'big':'大'
      }
    }
  },
  created(){
    // console.log(this.datas)
  },
  methods:{
    editSeat(){
      this.$emit('edit',this.datas)
    },
    deleteSeat(){
      this.$emit('delete',this.datas.seatId)
    }
  }
}
</script>

<style lang="scss" scoped>
.seat_item {
  margin-right: 10px;
  margin-bottom: 20px;
  width: 200px;
  height: 200px;
  background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);
  border-radius: 10px;
  position: relative;
  .seat_title{
    display: flex;
    align-items: center;
    position: absolute;
    top: 5px;
    left: 5px;
    &::before{
      content: '';
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: #8a8a8a;
    }
    &.reserved::before{
      background-color: #d81e06;
    }
    span{
      display: inline-block;
      color: #333333;
      font-weight: bold;
      margin-left: 8px;
    }
  }
  .seat_main {
    width: 60%;
    height: 40%;
    background-image: url("~@/assets/img/table_gray.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    position: relative;
    cursor: pointer;
    .type_word {
      font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
      position: absolute;
      font-size: 20px;
      font-weight: bold;
      top: 40%;
      left: 40%;
    }
  }
  .seat_main.reserved{
    background-image: url("~@/assets/img/table_red.png");
  }
  .seat_footer{
    position: absolute;
    bottom: 10px;
    right: 15px;
  }
}
</style>