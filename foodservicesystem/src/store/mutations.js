const { default: state } = require("./state");

const mutations={
  'LOGIN':(state,data)=>{
    sessionStorage.setItem('token',data.token)
    sessionStorage.setItem('name',data.name)
    sessionStorage.setItem('role',data.role)
    sessionStorage.setItem('uid',data.id)
    state.token=data.token
    state.name=data.name
    state.role=data.role
    state.uid=data.id
  },
  'LOGOUT':(state)=>{
    sessionStorage.clear()
    state.token=null
    state.name=null
    state.role=null
    state.uid=null
  }
}

export default mutations