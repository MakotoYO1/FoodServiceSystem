const { default: state } = require("./state");

const mutations={
  'LOGIN':(state,data)=>{
    sessionStorage.setItem('token',data.token)
    sessionStorage.setItem('name',data.name)
    sessionStorage.setItem('role',data.role)
    state.token=data.token
    state.name=data.name
    state.role=data.role
  },
  'LOGOUT':(state)=>{
    sessionStorage.clear()
    state.token=null
    state.name=null
    state.role=null
  }
}

export default mutations