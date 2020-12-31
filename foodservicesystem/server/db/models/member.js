const mongoose = require('mongoose')

const memberList=mongoose.Schema({
  memberId:String,
  name:String,
  sex:String,
  phone:String,
  birthday:String
})

module.exports=mongoose.model('member',memberList,'member')