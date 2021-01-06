import http from '@/utils/request'




export default {
  add(params){
    return http.post('/staff/add',params)
  },
  search(params){
    for(let k in params){
      if(params[k]===null||params[k]===undefined||params[k]===''){
        delete params[k]
      }
    }
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