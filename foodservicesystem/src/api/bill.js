import http from '@/utils/request'




export default {
  add(params){
    return http.post('/bill/add',params)
  },
  search(params){
    return http.get('/bill/get',{
      params
    })
  },
  remove(id){
    return http.delete('/bill/remove',{
      data:{
        id
      }
    })
  },
  update(id,params){
    return http.put('/bill/update',{
      id,...params
    })
  }
}