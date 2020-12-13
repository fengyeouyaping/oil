var UserData = {}

//获取用户信息对象
UserData.getUserInfo = () => {
  return JSON.parse(sessionStorage.getItem("userInfo"))
}

export default UserData