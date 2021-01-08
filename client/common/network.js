import axios from 'axios'
import Global from '../config/global'
import CustomLoading from '../common/myLoading'
import MyPop from './myPop'
import Common from '../common/common'
import LocalData from './localData'
var qs = require('qs');



/** 
 * 封装网络请求相关操作方法 
 **/
var NetTool = {}
axios.defaults.timeout = Global.networkTimeout;
axios.defaults.baseURL = Global.httpServer
// axios.defaults.baseURL = '/api'
axios.interceptors.request.use(function (config) {
  config.headers = {
    'Content-Type': 'application/json',
    'token': LocalData.userToken()
  }

  return config;
}, function (error) {
  return Promise.reject(error)
});

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {

  if (response.data.code == 0) {
    return response.data
  } else {
    if(response.data.code == -1){
      CustomLoading.endLoading()
      MyPop.WarningNotification(response.data.msg)
      return false
    }

    var messageStr = ""

    if (typeof (response) == 'string') {
      response = JSON.parse(response)
    }

    if (response.data.result.message == undefined) {
      messageStr = "网络请求失败"
    } else {
      messageStr = response.data.result.message
    }

    MyPop.WarningNotification(messageStr)
    CustomLoading.endLoading()

    return Promise.reject(0)
  }

}, function (error) {

  CustomLoading.endLoading()

  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
    MyPop.alertBox("请求失败", "失败原因：请求已超时，请重新尝试") 
  }else{
    MyPop.alertBox("请求失败", "失败原因：网络请求返回错误，请检测服务器是否有响应")
  }
  return Promise.reject(error);
})

//标准GET请求
NetTool.getHttp = function (apiName, cb, errCb) {
  axios.get(apiName).then(function (response) {
    if(response && response.code == 0){
      cb(response)
    }
    
  }).catch((err) => {
    if (errCb != undefined) {
      errCb();
    }
  })
}

//标准POST请求
NetTool.postHttp = function (apiName, params, cb, errCb) {
  axios.post(apiName, JSON.stringify(params)).then(function (response) {
    if(response && response.code == 0){
      cb(response)
    }
  }).catch((err) => {
    if (errCb != undefined) {
      errCb();
    }
  })
}

//开发时系统内部POST请求
NetTool.systemApiPostHttp = function (apiName, params, cb) {
  axios.post(Global.devServer + apiName, JSON.stringify(params)).then(function (response) {
    cb(response)
  }).catch((err) => {

  })
}

//上传图片阿里OSS
NetTool.Aliyun_uploadImageHttp = function(fileObj, params, cb) {

  this.postHttp("/aliyun/getTSTToken",{},(res)=>{

    var client = new OSS.Wrapper({
      region          : Global.aliyunOssRegion,
      accessKeyId     : res.AccessKeyId,
      accessKeySecret : res.AccessKeySecret,
      stsToken        : res.SecurityToken,
      bucket          : Global.aliyunOssBucket
    });

    var fileName = Date.parse(new Date());
    var fileExt = fileObj.name.toLowerCase().split('.').splice(-1);
    var randStr = Common.randomString(6);
    var newFilename = fileName + "-" + randStr + "." + fileExt[0];

		client.multipartUpload("/" + params.dir + "/" + newFilename, fileObj).then(function(result) {

      if(result.url != undefined){
        cb(result.url)
      }else{
        cb(Global.aliyunOssServer + result.name)
      }

		}).catch(function(err) {
      cb(err);
    });
    
  })

}

//上传图片
NetTool.EasyD_uploadImageHttp = function (fileObj, params, cb) {

  var formData = new FormData();
  formData.append("files", fileObj);

  for (var j in params) {
    formData.append(j, params[j]);
  }

  $.ajax({
    url: Global.fileServer + "/systemApi/uploadImageFile",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {
      cb(data.result.url)
    }
  })
}

//上传文件
NetTool.EasyD_uploadFileHttp = function (fileObj, params, cb) {

  var formData = new FormData();
  formData.append("files", fileObj);

  for (var j in params) {
    formData.append(j, params[j]);
  }

  $.ajax({
    url: Global.fileServer + "/systemApi/uploadFile",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (data) {
      cb(data.result.url)
    }
  })
}

//文件下载
NetTool.downLoadFile = function (url) {

  var oldImgName = url.split("/");
  var newImgName = oldImgName[oldImgName.length - 1];
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = "blob";
  xhr.onload = function () {
    if (this.status === 200) {
      var blob = this.response;
      var a = document.createElement('a');
      a.download = newImgName;
      a.href = window.URL.createObjectURL(blob);
      a.click();
    }
  };
  // 发送ajax请求
  xhr.send();

}

//添加操作日志
NetTool.addLogs = function (name, rs) {

  if (Global.isRecordLogs) {

    var params = {
      al_name: name,
      al_uid: LocalData.getUserId(),
      al_result: rs == undefined ? 1 : rs
    };
    axios.post(Global.httpServer + "/systemApi/addActionLog", JSON.stringify(params)).then(function (response) {

    }).catch((err) => {

    })

  }

}


export default NetTool