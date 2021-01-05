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
  /**
   * {
      1:'大堂经理',
      2:'服务员',
      3:'收银',
      4:'传菜员',
      5:'采购',
      6:'洗碗工',
      7:'保洁'
    }
   */
  role:Number,
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