var API = {}

API.apiName = "/demo/helloED"

//用户
API.userList = "/user/list"//用户列表
API.userAdd = "/user/add"//添加用户
API.userLogin = "/user/login"//登录
API.userUpdate = "/user/update"//修改用户信息
API.userLogOut = "/user/logOut"//退出登录
API.userDetail = "/user/detail"//用户信息
API.userDelete = "/user/delete"//删除用户

//角色
API.roleAdd = "/role/add"//添加角色
API.roleList = "/role/list"//角色列表
API.roleUpdate = "/role/update"//修改角色信息
API.roleDetail = "/role/detail"//角色详情
API.roleDelete = "/role/delete"//删除角色
API.roleAuthUpdate = "/role/auth/update"//修改权限

//日志
API.operationList = "/operation/list"//操作日志
API.deviceLogList = "/device/log/list"//设备日志列表
API.deviceLogSend = "/device/log/send"//发送消息
API.deviceLogDelete = "/device/log/delete"//删除日志
API.fileExport = "/file/log/export"//导出日志

//节点
API.nodeAdd = "/node/add"//添加节点
API.nodeList = "/node/list"//节点列表
API.nodeUpdate = "/node/update"//编辑节点信息
API.nodeDelete = "/node/delete"//删除节点信息

//设备
API.deviceAdd = "/device/add"//添加设备
API.deviceGet = "/device/get"//设备详情
API.deviceList = "/device/list"//设备列表
API.deviceUpdate = "/device/update"//修改设备信息
API.fileUploadImport = "/file/upload/import"//导入设备列表
API.deviceListAll = "/device/list/all"//全部设备列表
API.deviceListDelete = "/device/delete"//删除设备
API.deviceFileList = "/device/fileList"//设备详情--文件列表

//文件
API.fileList = "/file/list"//查询目录列表
API.fileDownload = "/file/download"//下载文件




//数据
API.deviceDataList = "/device/log/data/list"//设备检测数据列表

//城市、天气
API.deviceWeather = "/device/weather"//获取城市、天气信息

//上传图片
API.fileUploadImage = "/file/upload/image"








export default API