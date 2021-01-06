export default {
  login({commit},data){
    // 这里设置时间戳转化为token（后期可优化）
    let token=Date.now().toString(32)
    commit('LOGIN',{...data,token})
  },
  logout({commit}){
    commit('LOGOUT')
  }
}