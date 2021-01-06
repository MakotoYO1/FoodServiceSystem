import http from '@/utils/request'




export default {
  add(params){
    return http.post('/dish/add',params)
  },
  search(params){
    for(let k in params){
      if(params[k]===null||params[k]===undefined||params[k]===''){
        delete params[k]
      }
    }
    return http.get('/dish/get',{
      params
    })
  },
  remove(id){
    return http.delete('/dish/remove',{
      data:{
        id
      }
    })
  },
  update(id,params){
    return http.put('/dish/update',{
      id,...params
    })
  }
}