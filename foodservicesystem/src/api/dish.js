import http from '@/utils/request'




export default {
  add(params){
    for(let k in params){
      if(params[k]===null||params[k]===undefined||params[k]===''){
        delete params[k]
      }
    }
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
    for(let k in params){
      if(params[k]===null||params[k]===undefined||params[k]===''){
        delete params[k]
      }
    }
    return http.put('/dish/update',{
      id,...params
    })
  }
}