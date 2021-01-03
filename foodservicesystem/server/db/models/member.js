const mongoose = require('mongoose')

const memberList=mongoose.Schema({
  memberId:{
    type:mongoose.Types.ObjectId,
    default:mongoose.Types.ObjectId
  },
  name:String,
  sex:String,
  phone:String,
  birthday:String,
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

module.exports=mongoose.model('member',memberList,'member')