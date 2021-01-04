const mongoose = require('mongoose')

const staffList=mongoose.Schema({
  staffId:{
    type:mongoose.Types.ObjectId,
    default:mongoose.Types.ObjectId
  },
  showId:String,
  name:String,
  sex:String,
  age:Number,
  phone:String,
  role:String,
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

module.exports=mongoose.model('staff',staffList,'staff')