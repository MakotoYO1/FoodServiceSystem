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
  useUnifiedTopology: true
})

const memberSchema=require('./models/member')

const models={
  Member:memberSchema
}

module.exports=models