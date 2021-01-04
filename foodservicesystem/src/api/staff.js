import http from '@/utils/request'




export default {
  add(params){
    return http.post('/staff/add',params)
  },
  search(params){
    return http.get('/staff/get',{
      params
    })
  },
  remove(id){
    return http.delete('/staff/remove',{
      data:{
        id
      }
    })
  },
  update(id,params){
    return http.put('/staff/update',{
      id,...params
    })
  }
}