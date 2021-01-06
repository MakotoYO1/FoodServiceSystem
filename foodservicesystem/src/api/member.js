import http from '@/utils/request'




export default {
  test1(){
    return http.get(`/member/test?m=3`)
  },
  add(params){
    // params.memberId=`member${Date.now().toString(16)}`
    return http.post('/member/add',params)
  },
  search(params){
    for(let k in params){
      if(params[k]===null||params[k]===undefined||params[k]===''){
        delete params[k]
      }
    }
    return http.get('/member/get',{
      params
    })
  },
  remove(id){
    return http.delete('/member/remove',{
      data:{
        id
      }
    })
  },
  update(id,params){
    return http.put('/member/update',{
      id,...params
    })
  }
}