import http from '@/utils/request'




export default {
  add(params){
    return http.post('/bill/add',params)
  },
  search(params){
    for(let k in params){
      if(params[k]===null||params[k]===undefined||params[k]===''){
        delete params[k]
      }
    }
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