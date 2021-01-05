import http from '@/utils/request'




export default {
  add(params){
    return http.post('/user/add',params)
  },
  search(params){
    return http.get('/user/get',{
      params
    })
  },
  remove(id){
    return http.delete('/user/remove',{
      data:{
        id
      }
    })
  },
  updateInfo(id,params){
    return http.put('/user/update/info',{
      id,...params
    })
  },
  updateRecords(id,params){
    return http.put('/user/update/records',{
      id,...params
    })
  }
}