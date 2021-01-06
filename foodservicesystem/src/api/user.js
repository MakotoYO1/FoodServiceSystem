import http from '@/utils/request'




export default {
  add(params){
    return http.post('/user/add',params)
  },
  search(params){
    for(let k in params){
      if(params[k]===null||params[k]===undefined||params[k]===''){
        delete params[k]
      }
    }
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