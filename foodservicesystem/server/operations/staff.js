const StaffList = require('../db/db').Staff

// 增加
const addStaff = async ctx=>{
  let {name=null,sex=null,phone=null,age=null,role=null,showId=null}=JSON.parse(ctx.body)
  let staff=new StaffList({
    name,sex,phone,age,role,showId
  })
  await new Promise((resolve,reject)=>{
    StaffList.find({showId},(err,res)=>{
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
        staff.save((err,res)=>{
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
const findStaff=async ctx=>{
  let {name=null,sex=null,phone=null,staffId=null,age=null,role=null,showId=null}=ctx.query
  let params={name,sex,phone,staffId,age,role,showId}
  for(let k in params){
    if(!params[k]){
      delete params[k]
    }
  }
  await new Promise((resolve,reject)=>{
    StaffList.find(params,(err,res)=>{
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
const removeStaff=async ctx=>{
  let staffId=JSON.parse(ctx.body).id
  await new Promise((resolve,reject)=>{
    StaffList.findOneAndRemove({staffId},(err,res)=>{
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
const updateStaff=async ctx=>{
  let data=JSON.parse(ctx.body)
  let staffId=data.id
  delete data.id
  await new Promise((resolve,reject)=>{
    StaffList.findOneAndUpdate({staffId},data,(err,res)=>{
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
  addStaff,findStaff,removeStaff,updateStaff
}