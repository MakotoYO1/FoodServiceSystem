const Router=require('koa-router')
const childRouter=new Router()

const memberOperations=require('../operations/member')

// 会员
childRouter.post('/member/add',memberOperations.addMember)
childRouter.get('/member/get',memberOperations.findMember)
childRouter.delete('/member/remove',memberOperations.removeMember)
childRouter.put('/member/update',memberOperations.updateMember)
childRouter.get('/member/test',memberOperations.test)
module.exports=childRouter