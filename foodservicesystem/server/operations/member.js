const MemberList = require('../db/db').Member

const addMember = async ctx=>{
  // let {memberId,name,sex,phone,birthday}=ctx.request.body
  // let member=new MemberList({
  //   memberId,name,sex,phone,birthday
  // })
  // await member.save(function(err,res){
  //   if(err){
  //     ctx.body={
  //       code:-1,
  //       message:'服务器异常'
  //     }
  //   }
  //   ctx.body={
  //     code:0,
  //     message:'添加成功'
  //   }
  // })
}

const findMember=async ctx=>{
  let {name=null,sex=null,phone=null,birthday=null,memberId=null}=ctx.request.body
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
module.exports={
  addMember,findMember,test
}