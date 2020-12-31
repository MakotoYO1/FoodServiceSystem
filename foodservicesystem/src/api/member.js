import http from '@/utils/request'




export default {
  test1(){
    return http.get(`/member/test?m=3`)
  },
  add(params){
    params.memberId=`member${Date.now().toString(16)}`
    return http.post('/member/add',params)
  },
  search(params){
    return http.get('/member/get',params)
  }
}