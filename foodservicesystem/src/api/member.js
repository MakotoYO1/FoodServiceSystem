import http from '@/utils/request'


function test1(){
  return http.get(`/api/test1/`)
}

export {test1}