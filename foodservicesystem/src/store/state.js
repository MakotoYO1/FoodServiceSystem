const state={
  token:sessionStorage.getItem('token'),
  name:sessionStorage.getItem('name'),
  role:sessionStorage.getItem('role'),
  uid:sessionStorage.getItem('uid')
}

export default state