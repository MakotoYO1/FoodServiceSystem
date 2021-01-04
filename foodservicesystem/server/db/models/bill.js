const mongoose = require('mongoose')

const billList=mongoose.Schema({
  billId:{
    type:mongoose.Types.ObjectId,
    default:mongoose.Types.ObjectId
  },
  // 'bill001','bill002'
  showId:String,
  // 桌台编号
  showId_t:String,
  // 服务人员编号
  showId_s:String,
  // 菜品消费信息
  dishInfo:[
    {
      showId:String,
      name:String,
      price:Number,
      count:Number,
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
  // 消费总金额
  cost_total:Number,
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

module.exports=mongoose.model('bill',billList,'bill')