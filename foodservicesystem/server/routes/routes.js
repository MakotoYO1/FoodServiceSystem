const Router=require('koa-router')
const childRouter=new Router()

const memberOperations=require('../operations/member')
const staffOperations=require('../operations/staff')
const seatOperations=require('../operations/seat')
const dishOperations=require('../operations/dish')
const billOperations=require('../operations/bill')


// 会员
childRouter.post('/member/add',memberOperations.addMember)
childRouter.get('/member/get',memberOperations.findMember)
childRouter.delete('/member/remove',memberOperations.removeMember)
childRouter.put('/member/update',memberOperations.updateMember)
childRouter.get('/member/test',memberOperations.test)

// 员工
childRouter.post('/staff/add',staffOperations.addStaff)
childRouter.get('/staff/get',staffOperations.findStaff)
childRouter.delete('/staff/remove',staffOperations.removeStaff)
childRouter.put('/staff/update',staffOperations.updateStaff)

// 桌台
childRouter.post('/seat/add',seatOperations.addSeat)
childRouter.get('/seat/get',seatOperations.findSeat)
childRouter.delete('/seat/remove',seatOperations.removeSeat)
childRouter.put('/seat/update',seatOperations.updateSeat)

// 菜品
childRouter.post('/dish/add',dishOperations.addDish)
childRouter.get('/dish/get',dishOperations.findDish)
childRouter.delete('/dish/remove',dishOperations.removeDish)
childRouter.put('/dish/update',dishOperations.updateDish)

// 账单
childRouter.post('/bill/add',billOperations.addBill)
childRouter.get('/bill/get',billOperations.findBill)
childRouter.delete('/bill/remove',billOperations.removeBill)
childRouter.put('/bill/update',billOperations.updateBill)

module.exports=childRouter