const mongoose = require('mongoose')

const seatList=mongoose.Schema({
  seatId:{
    type:mongoose.Types.ObjectId,
    default:mongoose.Types.ObjectId
  },
  // '001','002'
  showId:String,
  type:{
    type:String,
    default:'middle'
  },
  // 预约状态
  reserved:{
    type:Boolean,
    default:false
  },
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

module.exports=mongoose.model('seat',seatList,'seat')