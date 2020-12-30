import http from '@/utils/request'




export default {
  test1(){
    return http.get(`/api/test1/?m=3`)
  }
}