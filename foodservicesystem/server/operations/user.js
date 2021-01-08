const UserList = require('../db/db').User


// 预先构建超级管理员账号，其他账号需管理员身份登录后自行去用户管理中添加
UserList.find({name:'admin'},(err,res)=>{
    if(err){
      console.log('添加失败，服务器异常')
      return
    }
    if(res.length){
      console.log('超级管理员已存在，name:admin,pwd:123')
    }else{
      new UserList({name:'admin',pwd:'123',role:1,records:[]}).save((err,res)=>{
        if(err){
          console.log(err)
        }else{
          console.log('超级管理员建立成功,name:admin,pwd:123')
        }
      })
    }
  }
)


// 增加
const addUser = async ctx=>{
  let {name=null,pwd=null,role=2,records=[]}=JSON.parse(ctx.body)
  let user=new UserList({
    name,pwd,role,records
  })
  await new Promise((resolve,reject)=>{
    UserList.find({name},(err,res)=>{
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
          message:'添加失败，用户名已存在'
        }
        resolve(res)
      }else{
        user.save((err,res)=>{
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
const findUser=async ctx=>{
  let {name=null,pwd=null,role=null,userId=null}=ctx.query
  let params={name,pwd,role,userId}
  for(let k in params){
    if(!params[k]){
      delete params[k]
    }
  }
  await new Promise((resolve,reject)=>{
    UserList.find(params,(err,res)=>{
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
const removeUser=async ctx=>{
  let userId=JSON.parse(ctx.body).id
  await new Promise((resolve,reject)=>{
    UserList.findOneAndRemove({userId},(err,res)=>{
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
// 修改基本信息
const updateUserInfo=async ctx=>{
  let {name=null,pwd=null,role=null,id:userId}=JSON.parse(ctx.body)
  let data={name,pwd,role}
  for(let k in data){
    if(data[k]===null){
      delete data[k]
    }
  }
  await new Promise((resolve,reject)=>{
    UserList.findOneAndUpdate({userId},data,(err,res)=>{
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

// 添加records
const updateUserRecords=async ctx=>{
  let {ip=null,location=null,id:userId}=JSON.parse(ctx.body)
  let params={ip,location}
  for(let k in params){
    if(params[k]===null){
      delete params[k]
    }
  }
  if(!Object.keys(params).length){
    ctx.body={
      code:-1,
      message:'添加记录失败，请检查信息'
    }
    return
  }
  await new Promise((resolve,reject)=>{
    UserList.update({userId},{
      '$push':{
          records:{
            $each:[{ip,location,created_time:new Date().toLocaleString()}],
            $position:0
          }
        }
      },(err,res)=>{
        if(err){
          ctx.body={
            code:-1,
            message:'添加记录失败，服务器异常'
          }
          reject(err)
          return
        }
        ctx.body={
          code:0,
          message:'添加记录成功'
        }
        resolve(res)
    })
  })
}
module.exports={
  addUser,findUser,removeUser,updateUserInfo,updateUserRecords
}