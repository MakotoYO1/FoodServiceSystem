const billList = require('../db/db').Bill

// 增加
const addBill = async ctx=>{
  let {showId=null,showId_t=null,showId_s=null,dishInfo=[],cost_total=null}=JSON.parse(ctx.body)
  let bill=new billList({
    showId,showId_t,showId_s,dishInfo,cost_total
  })
  await new Promise((resolve,reject)=>{
    billList.find({showId},(err,res)=>{
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
          message:'添加失败，账单编号已存在'
        }
        resolve(res)
      }else{
        bill.save((err,res)=>{
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
const findBill=async ctx=>{
  let {showId=null,showId_t=null,showId_s=null,cost_total=null}=ctx.query
  let params={showId,showId_t,showId_s,cost_total}
  for(let k in params){
    if(params[k]===null){
      delete params[k]
    }
  }
  await new Promise((resolve,reject)=>{
    billList.find(params,(err,res)=>{
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
const removeBill=async ctx=>{
  let billId=JSON.parse(ctx.body).id
  await new Promise((resolve,reject)=>{
    billList.findOneAndRemove({billId},(err,res)=>{
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
const updateBill=async ctx=>{
  let data=JSON.parse(ctx.body)
  let billId=data.id
  delete data.id
  await new Promise((resolve,reject)=>{
    billList.findOneAndUpdate({billId},data,(err,res)=>{
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
  addBill,findBill,removeBill,updateBill
}