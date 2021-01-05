const SeatList = require('../db/db').Seat

// 增加
const addSeat = async ctx=>{
  let {showId=null,type='middle',reserved=false}=JSON.parse(ctx.body)
  let seat=new SeatList({
    showId,type,reserved
  })
  await new Promise((resolve,reject)=>{
    SeatList.find({showId},(err,res)=>{
      if(err){
        ctx.body={
          code:-1,
          message:'添加失败，服务器异常'
        }
        reject(err)
        return
      }
      if(res.length){
        ctx.body={
          code:-1,
          message:'添加失败，编号已存在'
        }
        resolve(res)
      }else{
        seat.save((err,res)=>{
          if(err){
            ctx.body={
              code:-1,
              message:'添加失败，服务器异常'
            }
            reject(err)
          }else{
            ctx.body={
              code:0,
              message:'添加成功'
            }
            resolve(res)
          }
        })
      }
    })
  })
}

// 查找
const findSeat=async ctx=>{
  let {seatId=null,showId=null,type=null,reserved=null}=ctx.query
  let params={seatId,showId,type,reserved}
  for(let k in params){
    if(!params[k]&&params[k]!==false){
      delete params[k]
    }
  }
  await new Promise((resolve,reject)=>{
    SeatList.find(params,(err,res)=>{
      if(err){
        ctx.body={
          code:-1,
          message:'查找失败，服务器异常'
        }
        reject(err)
        return
      }
      ctx.body={
        code:0,
        data:res
      }
      resolve(res)
    })
  })
}

// 删除
const removeSeat=async ctx=>{
  let seatId=JSON.parse(ctx.body).id
  await new Promise((resolve,reject)=>{
    SeatList.findOneAndRemove({seatId},(err,res)=>{
      if(err){
        ctx.body={
          code:-1,
          message:'删除失败，服务器异常'
        }
        reject(err)
        return
      }
      ctx.body={
        code:0,
        message:'删除成功'
      }
      resolve(res)
    })
  })
}
// 修改
const updateSeat=async ctx=>{
  let data=JSON.parse(ctx.body)
  let seatId=data.id
  delete data.id
  await new Promise((resolve,reject)=>{
    SeatList.findOneAndUpdate({seatId},data,(err,res)=>{
      if(err){
        ctx.body={
          code:-1,
          message:'修改失败，服务器异常'
        }
        reject(err)
        return
      }
      ctx.body={
        code:0,
        message:'修改成功'
      }
      resolve(res)
    })
  })
}

module.exports={
  addSeat,findSeat,removeSeat,updateSeat
}