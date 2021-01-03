const MemberList = require('../db/db').Member

// 增加
const addMember = async ctx=>{
  let {name=null,sex=null,phone=null,birthday=null}=JSON.parse(ctx.body)
  let member=new MemberList({
    name,sex,phone,birthday
  })
  await new Promise((resolve,reject)=>{
    member.save((err,res)=>{
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
  })
}

// 查找
const findMember=async ctx=>{
  let {name=null,sex=null,phone=null,birthday=null,memberId=null}=ctx.query
  let params={name,sex,phone,birthday,memberId}
  for(let k in params){
    if(!params[k]){
      delete params[k]
    }
  }
  await new Promise((resolve,reject)=>{
    MemberList.find(params,(err,res)=>{
      if(err){
        ctx.body={
          code:-1,
          message:'服务器异常'
        }
        reject(err)
      }
      ctx.body={
        code:0,
        data:res
      }
      resolve(res)
    })
  })
}
const test=async ctx=>{
  ctx.body={
    msg:'test childRouter',
    m:ctx.query.m
  }
}

// 删除
const removeMember=async ctx=>{
  let memberId=JSON.parse(ctx.body).id
  await new Promise((resolve,reject)=>{
    MemberList.findOneAndRemove({memberId},(err,res)=>{
      if(err){
        ctx.body={
          code:-1,
          message:'服务器异常'
        }
        reject(err)
      }
      ctx.body={
        code:0,
        data:res
      }
      resolve(res)
    })
  })
}
// 修改
const updateMember=async ctx=>{
  let data=JSON.parse(ctx.body)
  let memberId=data.id
  delete data.id
  await new Promise((resolve,reject)=>{
    MemberList.findOneAndUpdate({memberId},data,(err,res)=>{
      if(err){
        ctx.body={
          code:-1,
          message:'服务器异常'
        }
        reject(err)
      }
      ctx.body={
        code:0,
        data:res
      }
      resolve(res)
    })
  })
}

module.exports={
  addMember,findMember,removeMember,updateMember,test
}