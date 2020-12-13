import { Loading } from 'element-ui'
/** 
 * 封装请求加载方法
 **/
var MyLoading = {}

MyLoading.loadingInstance = null

MyLoading.startLoading = function(content){
  var loadingText = content == undefined ? "数据正在加载..." : content;
  MyLoading.loadingInstance = Loading.service({
    lock: true,
    text: loadingText,
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

MyLoading.endLoading = function(){
  MyLoading.loadingInstance.close()
}


export default MyLoading
