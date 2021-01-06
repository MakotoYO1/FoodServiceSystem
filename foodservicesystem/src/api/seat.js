import http from '@/utils/request'




export default {
  add(params){
    return http.post('/seat/add',params)
  },
  search(params){
    for(let k in params){
      if(params[k]===null||params[k]===undefined||params[k]===''){
        delete params[k]
      }
    }
    return http.get('/seat/get',{
      params
    })
  },
  remove(id){
    return http.delete('/seat/remove',{
      data:{
        id
      }
    })
  },
  update(id,params){
    return http.put('/seat/update',{
      id,...params
    })
  }
}