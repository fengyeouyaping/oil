/** 
 * 提取本地相关数据信息
 **/
var LocalData = {}

//获取当前用户token
LocalData.userToken = function(){

  var userToken = JSON.parse(sessionStorage.getItem("userToken"))

  if(!userToken){
    return 0
  }

  return userToken

}

//获取当前用户ID
LocalData.getUsersID = function(){

  var userID = JSON.parse(sessionStorage.getItem("userID"))

  if(!userID){
    return 0
  }

  return userID

}

//获取当前用户ID
LocalData.userInfo = function(){

  var userInfo = JSON.parse(sessionStorage.getItem("userInfo"))
  
  if(!userInfo){
    return 0
  }

  return userInfo

}

//获取用户是否为超管身份
LocalData.getIsAdmin = function(){

  var userInfo = JSON.parse(sessionStorage.getItem("userInfo"))

  if(!userInfo){
    return 0
  }

  return userInfo.isAdmin

}

//获取用户当前的所有菜单信息
LocalData.getUseMenuData = function(){

  var menuData = sessionStorage.getItem("totalMenuBar")

  return JSON.parse(menuData);

}

//获取当前菜单的操作
LocalData.getActionIds = function(){

  var ids = sessionStorage.getItem("nowActionsIds")

  if(!ids){
    return 0
  }

  return ids

}

//根据当前所在菜单ID获取当前菜单的相关信息
LocalData.getNowMenuInfo = function(){

  var menuArr = JSON.parse(sessionStorage.getItem("totalMenuBar"))

  var mid = sessionStorage.getItem("nowMenuId")

  //获取当前选中的菜单
  var nowItem = menuArr.filter((item)=>{
    return item.m_id == mid
  })
  
  return nowItem[0]
  
}

//根据路由地址获取当前操作权限
LocalData.getNowMenuActionIds = function(url){

  var menuArr = JSON.parse(sessionStorage.getItem("totalMenuBar"))

  if(!menuArr){

    return 0

  }

  //获取当前选中的菜单
  var nowItem = menuArr.filter((item)=>{
      return "/" + item.m_url == url
  })  

  if(nowItem.length <= 0){
    return 0
  }

  return { ids : nowItem[0].rmm_apids, menuId : nowItem[0].m_id };

}

export default LocalData