webpackJsonp([4],{

/***/ 368:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(653);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0ab9ee4b_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(795);
function injectStyle (ssrContext) {
  __webpack_require__(793)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-0ab9ee4b"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0ab9ee4b_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 471:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _global = __webpack_require__(60);

var _global2 = _interopRequireDefault(_global);

var _aa = __webpack_require__(472);

var _aa2 = _interopRequireDefault(_aa);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var i = 0;
exports.default = {
  name: 'test',
  data: function data() {
    return {
      websock: null,
      info: {
        devType: '',
        devGuid: '',
        hardVer: '',
        softVer: '',
        ip: '',
        port: '',
        postIvl: '',
        freq: '',
        aSample: '',
        fSample: '',
        fileNum: '',
        threshold: '',
        stake: '',
        lon: '',
        lat: '',
        remarks: '',
        Channel: '',
        OS: '',
        Range: ''
      },
      fileList: {
        fileNum: '',
        dir: []
      },
      equipmentNewDate: [], //设备信息
      filePath: '',
      fileName: '',
      isOpen: true
    };
  },
  created: function created() {
    this.initWebSocket();
  },
  destroyed: function destroyed() {
    this.websock.close(); //离开路由之后断开websocket连接
  },

  methods: {
    initWebSocket: function initWebSocket() {
      //初始化weosocket
      var userId = JSON.parse(sessionStorage.getItem("userInfo")).id;

      var wsuri = _global2.default.wsAdd + "/server/" + userId;
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen: function websocketonopen() {//连接建立之后执行send方法发送数据

      // this.websocketsend(JSON.stringify(actions));
    },
    websocketonerror: function websocketonerror() {
      //连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage: function websocketonmessage(e) {
      //数据接收

      if (e.data == '连接成功') {
        return;
      } else {
        if (JSON.parse(e.data).cmd == 'deviceSettings') {
          //设备详情页面信息处理
          this.equipmentInfoPage(e);
        } else if (JSON.parse(e.data).cmd == 'deviceDirInfo') {
          //文件类型
          this.getDeviceDirInfo(e);
        } else if (JSON.parse(e.data).stakes) {
          this.getEquipmentNewDate(JSON.parse(e.data)); //大数据看版，设备数据
        } else if (JSON.parse(e.data).cmd == 'svrQuerySettings') {
          //固件上传
          this.getSvrSetSettings(e);
        }
      }
    },
    websocketsend: function websocketsend(Data) {
      //数据发送
      this.websock.send(Data);
    },
    websocketclose: function websocketclose(e) {
      //关闭
      // console.log('断开连接',e);
      this.initWebSocket();
    },

    //设备详情页面信息处理
    equipmentInfoPage: function equipmentInfoPage(val) {

      var item = JSON.parse(val.data);
      // 1：石油管道检测设备，其他设备类型待定
      var devType = item.data.basic.DevType == 1 ? '石油管道检测设备' : '其他设备类型';
      this.info = {
        devType: devType,
        devGuid: item.data.basic.DevGuid,
        hardVer: item.data.basic.HardVer,
        softVer: item.data.basic.SoftVer,
        ip: item.data.netInfo.IP,
        port: item.data.netInfo.Port,
        postIvl: item.data.netInfo.PostIvl,
        freq: item.data.testInfo.Freq,
        aSample: item.data.testInfo.ASample,
        fSample: item.data.testInfo.FSample,
        fileNum: item.data.testInfo.FileNum,
        threshold: item.data.testInfo.Threshold,
        OS: item.data.testInfo.OS,
        Range: item.data.testInfo.Range,
        Channel: item.data.testInfo.Channel,
        stake: item.data.gisInfo.Stake,
        lon: item.data.gisInfo.Lon,
        lat: item.data.gisInfo.Lat,
        remarks: item.data.gisInfo.Remarks
      };
    },

    //得到文件信息
    getDeviceDirInfo: function getDeviceDirInfo(val) {
      var item = JSON.parse(val.data);
      this.fileList.dir = item.data.dir;
      this.fileList.fileNum = item.data.fileNum;
    },

    //得到固件上传的数据
    getSvrSetSettings: function getSvrSetSettings(val) {
      var item = JSON.parse(val.data);
      this.isOpen = item.data.isOpen == 1;
      this.filePath = item.data.fileName;
      this.fileName = item.data.fileName.split("\\")[item.data.fileName.split("\\").length - 1];
    },

    //更新设备实时信息
    getEquipmentNewDate: function getEquipmentNewDate(data) {
      var _this = this;

      this.$store.commit('HomeModule/updata_isOne', false);
      var datas = data;
      // 测试代码 打开面几行，模拟管道运行

      // let datas = {}
      // datas.nodeId = 84
      // datas.stakes = aa[i]
      // i++
      // if(i == 5){
      //   i=0
      // }

      if (!this.newInfo || this.newInfo.modelFlag == 2) {
        return false;
      }

      if (datas.nodeId == this.newInfo.id) {
        if (this.newInfo.devices && this.newInfo.devices.length > 0) {
          for (var _i = 0; _i < datas.stakes.length; _i++) {
            for (var j = 0; j < this.newInfo.devices.length; j++) {

              if (datas.stakes[_i]['stakeNo'] == this.newInfo.devices[j]['stake']) {
                datas.stakes[_i]['devGuid'] = this.newInfo.devices[j]['devGuid'];
                this.newInfo.devices[j]['visitFlag'] = datas.stakes[_i]['visitFlag'] ? datas.stakes[_i]['visitFlag'] : false;
                this.newInfo.devices[j]['isOnline'] = datas.stakes[_i]['isOnline'] ? datas.stakes[_i]['isOnline'] : true;
                this.newInfo.devices[j]['actArrivedTime'] = datas.stakes[_i]['actArrivedTime'] ? datas.stakes[_i]['actArrivedTime'] : false;
                this.newInfo.devices[j]['deviceUpTime'] = datas.stakes[_i]['deviceUpTime'] ? datas.stakes[_i]['deviceUpTime'] : false;
                this.newInfo.devices[j]['velocity'] = datas.stakes[_i]['velocity'] ? datas.stakes[_i]['velocity'] : false;
              }
            }
          }
        }

        var result = [];

        for (var _i2 = 0; _i2 < datas.stakes.length; _i2++) {
          datas.stakes[_i2]['stake'] = datas.stakes[_i2]['stakeNo'];
          result.push(datas.stakes[_i2]);
        }

        result.reverse();
        this.equipmentNewDate = result;
      }
      if (this.equipmentLists.length > 0 && this.newInfo) {
        this.equipmentLists.map(function (itemss) {
          if (itemss.nodeList) {
            itemss.nodeList.map(function (items) {
              if (items.nodeList) {
                items.nodeList.map(function (item) {
                  if (item.id == _this.newInfo.id && item.devices.length > 0) {
                    for (var _i3 = 0; _i3 < item.devices.length; _i3++) {
                      for (var _j = 0; _j < _this.newInfo.length; _j++) {
                        if (item.devices[_i3]['devGuid'] == _this.newInfo[_j]['devGuid']) {
                          item.devices[_i3]['isOnline'] = _this.newInfo[_j]['isOnline'];
                        }
                      }
                    }
                  }
                });
              }
            });
          }
        });
      }
    }
  }
};

/***/ }),

/***/ 472:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var aa = {
    0: [{
        devGuid: "19854232",
        isArrived: 0,
        isOnline: true,
        lat: 34.3813667,
        lon: 108.945251,
        stake: "#1",
        stakeNo: "#1",
        status: 1,
        velocity: 0,
        visitFlag: false
    }, {
        devGuid: "28078207",
        isArrived: 0,
        isOnline: true,
        lat: 35.4,
        lon: 109.1,
        stake: "#2",
        stakeNo: "#2",
        status: 1,
        velocity: 0,
        visitFlag: false
    }, {
        devGuid: "21393013",
        deviceUpTime: "12:32:31.475",
        isArrived: 0,
        isOnline: true,
        lat: 35.8,
        lon: 109.4,
        stake: "#3",
        stakeNo: "#3",
        status: 1,
        tsDeviceUpTime: [],
        velocity: 0,
        visitFlag: false
    }, {
        devGuid: "38463144",
        deviceUpTime: "12:32:31.475",
        isArrived: 0,
        isOnline: true,
        lat: 35.8,
        lon: 109.4,
        stake: "#4",
        stakeNo: "#4",
        status: 1,
        tsDeviceUpTime: [],
        velocity: 0,
        visitFlag: false
    }],
    1: [{
        actArrivedTime: "12:12:04.296",
        devGuid: "19854232",
        deviceUpTime: "12:15:46.889",
        isArrived: 0,
        isOnline: true,
        lat: 34.3813667,
        lon: 108.945251,
        stake: "#1",
        stakeNo: "#1",
        status: 1,
        tsActArrivedTime: [],
        tsDeviceUpTime: [],
        velocity: 0,
        visitFlag: true
    }, {
        devGuid: "28078207",
        deviceUpTime: "12:15:52.070",
        isArrived: 0,
        isOnline: true,
        lat: 35.4,
        lon: 109.1,
        stakeNo: "#2",
        status: 1,
        tsDeviceUpTime: { Hour: 12, Min: 15, Second: 52 },
        velocity: 0,
        visitFlag: false
    }, {
        devGuid: "28078207",
        deviceUpTime: "12:15:52.070",
        isArrived: 0,
        isOnline: true,
        lat: 35.4,
        lon: 109.1,
        stakeNo: "#2",
        status: 1,
        tsDeviceUpTime: { Hour: 12, Min: 15, Second: 52 },
        velocity: 0,
        visitFlag: false
    }, {
        devGuid: "28078207",
        deviceUpTime: "12:15:52.070",
        isArrived: 0,
        isOnline: true,
        lat: 35.4,
        lon: 109.1,
        stakeNo: "#2",
        status: 1,
        tsDeviceUpTime: { Hour: 12, Min: 15, Second: 52 },
        velocity: 0,
        visitFlag: false
    }, {
        devGuid: "21393013",
        deviceUpTime: "12:15:47.159",
        isArrived: 0,
        isOnline: true,
        lat: 35.8,
        lon: 109.4,
        stakeNo: "#3",
        status: 1,
        tsDeviceUpTime: { Hour: 12, Min: 15, Second: 47 },
        velocity: 0,
        visitFlag: false
    }],

    2: [{
        actArrivedTime: "12:12:04.296",
        devGuid: "19854232",
        deviceUpTime: "12:17:46.822",
        isArrived: 0,
        isOnline: true,
        lat: 34.3813667,
        lon: 108.945251,
        stake: "#1",
        stakeNo: "#1",
        status: 1,
        tsActArrivedTime: [],
        tsDeviceUpTime: [],
        velocity: 0,
        visitFlag: true
    }, {
        actArrivedTime: "12:17:43.686",
        devGuid: "28078207",
        deviceUpTime: "12:17:43.686",
        evalArrivedTime: "12:21:34",
        isArrived: 1,
        isOnline: true,
        lat: 35.4,
        lon: 109.1,
        stakeNo: "#2",
        status: 1,
        tsActArrivedTime: { Hour: 12, Min: 17, Second: 43 },
        tsDeviceUpTime: { Hour: 12, Min: 17, Second: 43 },
        tsEstArrivedTime: { Hour: 12, Min: 21, Second: 34 },
        velocity: 203.5,
        visitFlag: true
    }, {
        devGuid: "21393013",
        deviceUpTime: "12:17:47.042",
        evalArrivedTime: "12:21:15",
        isArrived: 0,
        isOnline: true,
        lat: 35.8,
        lon: 109.4,
        stakeNo: "#3",
        status: 1,
        tsDeviceUpTime: { Hour: 12, Min: 17, Second: 47 },
        tsEstArrivedTime: { Hour: 12, Min: 21, Second: 15 },
        velocity: 0,
        visitFlag: false
    }, {
        devGuid: "38463144",
        deviceUpTime: "12:32:31.475",
        isArrived: 0,
        isOnline: true,
        lat: 35.8,
        lon: 109.4,
        stake: "#4",
        stakeNo: "#4",
        status: 1,
        tsDeviceUpTime: [],
        velocity: 0,
        visitFlag: false
    }],

    3: [{
        actArrivedTime: "12:12:04.296",
        devGuid: "19854232",
        deviceUpTime: "12:20:16.737",
        isArrived: 0,
        isOnline: true,
        lat: 34.3813667,
        lon: 108.945251,
        stake: "#1",
        stakeNo: "#1",
        status: 1,
        tsActArrivedTime: [],
        tsDeviceUpTime: [],
        velocity: 0,
        visitFlag: true
    }, {
        actArrivedTime: "12:18:14.682",
        devGuid: "28078207",
        deviceUpTime: "12:20:16.643",
        evalArrivedTime: "12:22:26",
        isArrived: 0,
        isOnline: true,
        lat: 35.4,
        lon: 109.1,
        stakeNo: "#2",
        status: 1,
        tsActArrivedTime: { Hour: 12, Min: 18, Second: 14 },
        tsDeviceUpTime: { Hour: 12, Min: 20, Second: 16 },
        tsEstArrivedTime: { Hour: 12, Min: 22, Second: 26 },
        velocity: 186.5,
        visitFlag: true
    }, {
        actArrivedTime: "12:19:28.943",
        devGuid: "21393013",
        deviceUpTime: "12:20:18.046",
        evalArrivedTime: "12:21:15",
        isArrived: 0,
        isOnline: true,
        lat: 35.8,
        lon: 109.4,
        stakeNo: "#3",
        status: 1,
        tsActArrivedTime: { Hour: 12, Min: 19, Second: 28 },
        tsDeviceUpTime: { Hour: 12, Min: 20, Second: 18 },
        tsEstArrivedTime: { Hour: 12, Min: 21, Second: 15 },
        velocity: 635.6,
        visitFlag: true
    }, {
        devGuid: "38463144",
        deviceUpTime: "12:32:31.475",
        isArrived: 0,
        isOnline: true,
        lat: 35.8,
        lon: 109.4,
        stake: "#4",
        stakeNo: "#4",
        status: 1,
        tsDeviceUpTime: [],
        velocity: 0,
        visitFlag: false
    }],
    4: [{
        devGuid: "19854232",
        isArrived: 0,
        isOnline: true,
        lat: 34.3813667,
        lon: 108.945251,
        stake: "#1",
        stakeNo: "#1",
        status: 1,
        velocity: 0,
        visitFlag: false
    }, {
        devGuid: "28078207",
        isArrived: 0,
        isOnline: true,
        lat: 35.4,
        lon: 109.1,
        stake: "#2",
        stakeNo: "#2",
        status: 1,
        velocity: 0,
        visitFlag: false
    }, {
        devGuid: "21393013",
        deviceUpTime: "12:32:31.475",
        isArrived: 0,
        isOnline: true,
        lat: 35.8,
        lon: 109.4,
        stake: "#3",
        stakeNo: "#3",
        status: 1,
        tsDeviceUpTime: [],
        velocity: 0,
        visitFlag: false
    }, {
        devGuid: "38463144",
        deviceUpTime: "12:32:31.475",
        isArrived: 0,
        isOnline: true,
        lat: 35.8,
        lon: 109.4,
        stake: "#4",
        stakeNo: "#4",
        status: 1,
        tsDeviceUpTime: [],
        velocity: 0,
        visitFlag: true
    }]
};

exports.default = aa;

/***/ }),

/***/ 653:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vuex = __webpack_require__(9);

var _userData = __webpack_require__(108);

var _userData2 = _interopRequireDefault(_userData);

var _ws = __webpack_require__(471);

var _ws2 = _interopRequireDefault(_ws);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    mixins: [_ws2.default],
    data: function data() {
        return {
            myHeaders: { token: _userData2.default.userToken() }
        };
    },

    computed: {
        uploadData: function uploadData() {
            return {
                filePath: this.filePath.replace(/\\/g, "/"),
                isOpen: this.isOpen ? 1 : 0
            };
        }
    },
    mounted: function mounted() {},

    watch: {
        isOpen: function isOpen(val) {
            var url = '' + this.$global.httpServer + this.$API.fileUpload + '?isOpen=' + (this.isOpen ? 1 : 0);
            this.$http.postHttp(url, {}, function (data) {});
        }
    },
    methods: {
        //发送命令
        deviceLogSend: function deviceLogSend(type) {
            var _this = this;

            var params = {
                cmd: type,
                data: ''
            };

            this.$http.postHttp(this.$API.deviceLogSend, params, function (data) {
                _this.$notify({
                    title: '发送成功,请等待设备回复...',
                    message: '',
                    type: 'success'
                });
            });
        },

        //导入设备列表
        fileUploadImport: function fileUploadImport() {
            var _this2 = this;

            this.$myLoading.startLoading();
            this.$http.postHttp(this.$API.fileUploadImport, {}, function (data) {

                _this2.$myLoading.endLoading();
            });
        },

        //导入成功
        updataSuccess: function updataSuccess(val) {
            if (val.code == -1) {
                this.$notify({
                    title: val.msg,
                    message: '',
                    type: 'error'
                });
            } else {
                this.$notify({
                    title: '文件导入成功',
                    message: '',
                    type: 'success'
                });
            }
        },

        //导入失败
        updataError: function updataError() {
            this.$notify({
                title: '文件导入失败',
                message: '',
                type: 'error'
            });
        }
    }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ 793:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(794);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("30bf3f72", content, true, {});

/***/ }),

/***/ 794:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".firmware .header[data-v-0ab9ee4b]{text-align:right;margin:20px 50px 0 0}.firmware .centent[data-v-0ab9ee4b]{margin-top:20px;font-size:14px;margin-left:20px}.firmware .centent .file[data-v-0ab9ee4b]{margin-top:10px;height:36px;line-height:36px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.firmware .centent .file .left[data-v-0ab9ee4b]{width:120px;text-align:right;margin-right:20px}.firmware .centent .file .right[data-v-0ab9ee4b]{border:1px solid #eee;border-radius:3px;padding:0 10px;min-width:200px}.firmware .centent .file .upload-demo[data-v-0ab9ee4b]{margin-left:20px}", ""]);

// exports


/***/ }),

/***/ 795:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"firmware"},[_c('div',{staticClass:"header"},[_c('el-button',{attrs:{"size":"small","type":"primary"},on:{"click":function($event){_vm.deviceLogSend('svrQuerySettings')}}},[_vm._v("获取固件文件")])],1),_vm._v(" "),(_vm.filePath)?_c('div',{staticClass:"centent"},[_c('div',{staticClass:"file"},[_c('p',{staticClass:"left"},[_vm._v("文件名称:")]),_vm._v(" "),_c('p',{staticClass:"right"},[_vm._v(_vm._s(_vm.fileName))])]),_vm._v(" "),_c('div',{staticClass:"file"},[_c('p',{staticClass:"left"},[_vm._v("是否允许更新:")]),_vm._v(" "),_c('el-switch',{attrs:{"active-color":"#13ce66","inactive-color":"#999999"},model:{value:(_vm.isOpen),callback:function ($$v) {_vm.isOpen=$$v},expression:"isOpen"}})],1),_vm._v(" "),_c('div',{staticClass:"file"},[_c('p',{staticClass:"left"},[_vm._v("文件地址:")]),_vm._v(" "),_c('p',{staticClass:"right"},[_vm._v(_vm._s(_vm.filePath))]),_vm._v(" "),(_vm.isOpen)?_c('el-upload',{ref:"upload",staticClass:"upload-demo",attrs:{"headers":_vm.myHeaders,"show-file-list":false,"action":_vm.$global.httpServer + _vm.$API.fileUpload,"data":_vm.uploadData,"on-success":_vm.updataSuccess,"on-error":_vm.updataError}},[_c('el-button',{attrs:{"size":"small","type":"primary"}},[_vm._v("文件替换")])],1):_vm._e()],1)]):_vm._e()])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});