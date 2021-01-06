const mongoose = require('mongoose')

const dishList=mongoose.Schema({
  dishId:{
    type:mongoose.Types.ObjectId,
    default:mongoose.Types.ObjectId
  },
  showId:String,
  name:String,
  /**
   * 对应Dict：
   * {
   *  1:特色菜,2:凉菜,3:炒菜,4:汤羹,5:主食,6:饮料
   * }
   */
  type:Number,
  count:{
    type:Number,
    default:99999
  },
  // 是否供应
  provided:{
    type:Boolean,
    default:true
  },
  price:String,
  _id: {
    type: mongoose.Types.ObjectId, 
    select: false,
    default:mongoose.Types.ObjectId
  },
  __v: {
    type: Number,
    select: false
  }
})

module.exports=mongoose.model('dish',dishList,'dish')