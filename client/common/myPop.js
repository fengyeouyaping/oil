import { Message,MessageBox,Notification } from 'element-ui'

/** 
 * 封装请求加载方法
 **/
var MyPop = {}

MyPop.myPopInstance = null

MyPop.alertBox = function(title,content,cb){

  MessageBox.alert(content, title, {
    confirmButtonText: '确定',
    callback: action => {
      if(cb != undefined){
        cb()
      }
    }
  })
}

MyPop.submitPopBox = function(title,content,pattern,error,cb,cancelCb){

  MessageBox.prompt(content,title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: pattern,
    inputErrorMessage: error
  }).then(({ value }) => {
    cb(value)
  }).catch(() => {
    if(cancelCb!=undefined){
      cancelCb();
    }
  });
}

MyPop.alertHtmlBox = function(title,content,cb){

  MessageBox.alert(content, title, {
    dangerouslyUseHTMLString: true,
    callback: action => {
      if(cb != undefined){
        cb()
      }
    }
  })
}

MyPop.confirmBox = function(title,content,cb,cancelCb){

  MessageBox.confirm(content, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
    }).then(() => {
      if(cb) { 
        cb() 
      }
    }).catch(() => {
      if(cancelCb!=undefined){
        cancelCb();
      }
    })
}

MyPop.confirmHTMLBox = function(title,content,cb,cancelCb){

  MessageBox.confirm(content, title, {
    dangerouslyUseHTMLString: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    }).then(() => {
      if(cb) { 
        cb() 
      }
    }).catch(() => {
      if(cancelCb!=undefined){
        cancelCb();
      }  
    })
}

MyPop.SuccessMessage = function(content) {
  Message.success({
    showClose: true,
    message: content == undefined ? "恭喜您，操作成功" : content
  })
}

MyPop.WarningMessage = function(content) {
  Message.warning({
    showClose: true,
    message: content
  })
}

MyPop.ErrorMessage = function(content) {
  Message.error({
    showClose: true,
    message: content == undefined ? "对不起，操作失败" : content
  })
}

MyPop.HTMLMessage = function(content) {
  Message.error({
    showClose: true,
    dangerouslyUseHTMLString: true,
    message: content
  })
}

MyPop.WarningNotification = function(content) {
  Notification.warning({
    message: content,
    type: 'warning'
  })
}


export default MyPop