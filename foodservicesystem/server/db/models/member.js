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
  /**
   * {
        1:'青铜',
        2:'白银',
        3:'黄金',
        4:'白金',
        5:'钻石',
        6:'王者'
      }
   */
  rate:{
    type:Number,
    default: 1
  },
  // 积分
  integral:{
    type:Number,
    default:0
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

module.exports=mongoose.model('member',memberList,'member')