const DishList = require('../db/db').Dish

// 增加
const addDish = async ctx=>{
  let {name=null,type=null,count=99999,provided=true,price=null,showId=null}=JSON.parse(ctx.body)
  let dish=new DishList({
    name,type,count,provided,price,showId
  })
  await new Promise((resolve,reject)=>{
    DishList.find({showId},(err,res)=>{
      if(err){
        ctx.body={
          code:-1,
          message:'服务器异常'
        }
        reject(err)
        return
      }
      if(res.length){
        ctx.body={
          code:-1,
          message:'编号已存在'
        }
        resolve(res)
      }else{
        dish.save((err,res)=>{
          if(err){
            ctx.body={
              code:-1,
              message:'服务器异常'
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
const findDish=async ctx=>{
  let {name=null,type=null,count=null,dishId=null,provided=null,price=null,showId=null}=ctx.query
  let params={name,type,count,dishId,provided,price,showId}
  for(let k in params){
    if(!params[k]&&params[k]!==false){
      delete params[k]
    }
  }
  await new Promise((resolve,reject)=>{
    DishList.find(params,(err,res)=>{
      if(err){
        ctx.body={
          code:-1,
          message:'服务器异常'
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
const removeDish=async ctx=>{
  let dishId=JSON.parse(ctx.body).id
  await new Promise((resolve,reject)=>{
    DishList.findOneAndRemove({dishId},(err,res)=>{
      if(err){
        ctx.body={
          code:-1,
          message:'服务器异常'
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
const updateDish=async ctx=>{
  let data=JSON.parse(ctx.body)
  let dishId=data.id
  delete data.id
  await new Promise((resolve,reject)=>{
    DishList.findOneAndUpdate({dishId},data,(err,res)=>{
      if(err){
        ctx.body={
          code:-1,
          message:'服务器异常'
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
  addDish,findDish,removeDish,updateDish
}