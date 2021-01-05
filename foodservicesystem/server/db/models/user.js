const mongoose = require('mongoose')

const userList=mongoose.Schema({
  userId:{
    type:mongoose.Types.ObjectId,
    default:mongoose.Types.ObjectId
  },
  name:String,
  pwd:String,
  // 1 管理员  2 职工
  role:{
    type:Number,
    default:2
  },
  records:[
    {
      ip:String,
      location:String,
      created_time:{
        type:String,
        default:new Date().toLocaleString()
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
    }
  ],
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

module.exports=mongoose.model('user',userList,'user')