const mongoose = require('mongoose')

const memberList=mongoose.Schema({
  memberId:String,
  name:String,
  sex:String,
  phone:Number,
  birthday:Date
})

module.exports=mongoose.model('member',memberList,'member')