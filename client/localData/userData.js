var UserData = {}

//获取用户信息对象
UserData.getUserInfo = () => {
  return JSON.parse(sessionStorage.getItem("userInfo"))
}
//获取用户信息对象
UserData.userToken = () => {
  return JSON.parse(sessionStorage.getItem("userToken"))
}

export default UserData