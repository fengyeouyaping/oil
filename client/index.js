//引入vue库
import Vue from 'vue'
import Vuex from 'vuex'

//引入UI组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//引入图标选择组件
import SelectFontIcon from './components/selectFontIcon'

//引入图片上传组件
import UploadImage from './components/uploadImage'

//引入文件上传组件
import UploadFile from './components/uploadFile'

//引入markdown编辑工具
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import VueCropper from 'vue-cropper'

//引入裁切组件
import CropperImage from './components/cropperImage'

//使用组件
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(mavonEditor)
Vue.use(SelectFontIcon)
Vue.use(UploadImage)
Vue.use(UploadFile)
Vue.use(VueCropper)
Vue.use(CropperImage)

//引入入口模板文件
import App from './app.vue' 

//引入路由库
import VueRouter from 'vue-router'

//引入全局常量配置
import Global from './config/global'
Vue.prototype.$global = Global

//引入网络操作库
import Network from './common/network'
Vue.prototype.$http = Network

//引入本地用户数据对象
import UserData from './localData/userData'
Vue.prototype.$userData = UserData

//引入本地数据操作对象
import LocalData from './common/localData'
Vue.prototype.$localData = LocalData

//引入JS工具集
import * as _ from 'lodash';
Vue.prototype.$_ = _

//引入加载请求操作库
import MyLoading from './common/myLoading'
Vue.prototype.$myLoading = MyLoading

//引入弹窗操作库
import MyPop from './common/myPop'
Vue.prototype.$myPop = MyPop

//引入gojs图形库
import Gojs from 'gojs'
Vue.prototype.$GoJs = Gojs

//引入API接口配置文件
import Api from './api/api'
Vue.prototype.$API = Api

//引入公共CSS文件库
import './assets/style/global.styl'
import './assets/font/font-awesome/css/font-awesome.min.css'

//引入路由配置
import createRouter from './config/router'
import createStore from './store/store'

//引入Velocity动画
import '../node_modules/velocity-animate/velocity.min'

//引入公共方法文件
import Common from './common/common'
Vue.prototype.$common = Common

//保存当前环境
Vue.prototype.$isDev = process.env.NODE_ENV === 'development'


//初始化相关对象
const store  = createStore()
const router = createRouter()

import otherConfig from './config/otherConfig'
Vue.prototype.$headerMenu = otherConfig.headerMenu

//引入额外文件处理
var otherFile = otherConfig.otherFile;

var requireStr = "";
for(var i =0;i<otherFile.length;i++){
  if(otherFile[i].type == 'css'){
    requireStr += '<link rel="stylesheet" href="' + otherFile[i].url + '" />';
  }

  if(otherFile[i].type == 'js'){
    requireStr += '<script type="text/javascript" src="' + otherFile[i].url +'"></script>'
  }
}
$("head").append(requireStr);

new Vue({
  router,
  store,
  render : (h) => h(App),
  components: {
    'remote-js': {
    render(createElement) {
     return createElement('script', { attrs: { type: 'text/javascript', src: this.src }});
    },
    props: {
     src: { type: String, required: true },
    },
   },
   },
}).$mount('#root')





