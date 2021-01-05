const mongoose=require('mongoose')

mongoose.connection.on('error',function(err){
  console.log('error')
})
.on('disconnect',function(){

})
.once('open',function(){
  console.log('database connect successfully!')
})

mongoose.connect('mongodb://localhost/test',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false
})

const memberSchema=require('./models/member')
const staffSchema=require('./models/staff')
const seatSchema=require('./models/seat')
const dishSchema=require('./models/dish')
const billSchema=require('./models/bill')
const userSchema=require('./models/user')

const models={
  Member:memberSchema,
  Staff:staffSchema,
  Seat:seatSchema,
  Dish:dishSchema,
  Bill:billSchema,
  User:userSchema
}

module.exports=models