webpackJsonp([3],{

/***/ 361:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_info_vue__ = __webpack_require__(625);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_info_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_info_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_info_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_info_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0e260570_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_info_vue__ = __webpack_require__(745);
function injectStyle (ssrContext) {
  __webpack_require__(743)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-0e260570"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_info_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0e260570_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_info_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 517:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
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
        remarks: ''
      },
      fileList: {
        fileNum: '',
        dir: []
      },
      equipmentNewDate: [] //设备信息
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

      var wsuri = "ws://123.56.97.235:8080/server/" + userId;
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
        }
      }
    },
    websocketsend: function websocketsend(Data) {
      //数据发送
      this.websock.send(Data);
    },
    websocketclose: function websocketclose(e) {
      //关闭
      console.log('断开连接', e);
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

    //更新设备实时信息
    getEquipmentNewDate: function getEquipmentNewDate(data) {
      if (data.nodeId == this.newInfo.id) {
        this.equipmentNewDate = data.stakes;
      }
    }
  }
};

/***/ }),

/***/ 625:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ws = __webpack_require__(517);

var _ws2 = _interopRequireDefault(_ws);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    mixins: [_ws2.default],
    data: function data() {
        return {
            ifGetInfo: false,
            isSwitch: true,
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
                remarks: ''
            },
            newTime: '',
            fileList: {
                fileNum: '',
                dir: []
            },
            fillInput: {
                path: 1 //页码
            },
            multipleSelection: []
        };
    },
    mounted: function mounted() {
        // this.deviceFileList()
    },

    methods: {
        //保存
        submitForm: function submitForm(params) {

            this.$http.postHttp(this.$API.deviceUpdate, params, function (data) {});
        },

        // 命令字名称 含义 
        // deviceDirInfo data为空字符，获得设备上文件列表 
        // deviceFileInfo 获得设备上指定的数据文件 
        // deviceDeleteFiles data为空字符,清除设备上的数据文件 
        // deviceStartSaveFile data为空字符，启动设备保存数据文件 
        // deviceSettings data为空字符，获得设备配置信息 
        // deviceTestInfo 设置设备采集配置 
        // deviceNetInfo 设置设备网络配置 
        // deviceGisInfo 设置设备GIS配置 
        // deviceReset data为空字符，设备重启 
        // deviceUnregister 注销设备，data为空字符
        //发送命令
        deviceLogSend: function deviceLogSend(type) {
            var _this = this;

            this.ifGetInfo = true;
            var params = {
                cmd: type,
                data: '',
                targetDevice: this.$route.query.devGuid
            };
            if (type == 'deviceFileInfo') {
                params.data = {
                    page: this.fillInput.path
                };
            }

            this.$http.postHttp(this.$API.deviceLogSend, params, function (data) {
                _this.$notify({
                    title: '发送成功,请等待设备回复...',
                    message: '',
                    type: 'success'
                });
            });
        },

        //发送设置命令
        sendCommand: function sendCommand(type) {
            var _this2 = this;

            var devType = this.info.devType == '石油管道检测设备' ? 1 : 0;
            var info = {};
            if (type == 'deviceNetInfo') {
                info = {
                    netInfo: {
                        ip: this.info.ip,
                        port: this.info.port,
                        postIvl: this.info.postIvl
                    }

                };
            } else if (type == 'deviceTestInfo') {
                info = {
                    testInfo: {
                        freq: this.info.freq,
                        sample: this.info.fSample,
                        fileNum: this.info.fileNum,
                        threshold: this.info.threshold ? this.info.threshold : []

                    }
                };
            } else if (type == 'deviceGisInfo') {
                info = {
                    gisInfo: {
                        stake: this.info.stake,
                        lon: this.info.lon,
                        lat: this.info.lat,
                        remarks: this.info.remarks

                    }
                };
                var data = {
                    devGuid: this.$route.query.devGuid,
                    lat: this.info.lat,
                    lon: this.info.lon,
                    remarks: this.info.remarks,
                    stake: this.info.stake
                };
                this.submitForm(data);
            }

            var params = {
                cmd: type,
                data: info,
                targetDevice: this.$route.query.devGuid
            };

            this.$myLoading.startLoading();
            this.$http.postHttp(this.$API.deviceLogSend, params, function (data) {
                _this2.$notify({
                    title: '发送成功,请等待设备回复...',
                    message: '',
                    type: 'success'
                });
                _this2.$myLoading.endLoading();
            });
        },

        //获取文件列表
        handleSelectionChange: function handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        //文件列表
        getFileList: function getFileList(type, fileName) {
            var _this3 = this;

            var params = {};
            if (type == 'deviceDirInfo') {
                params = {
                    cmd: type,
                    targetDevice: this.$route.query.devGuid,
                    data: {
                        page: this.fillInput.path
                    }

                };
            } else {
                params = {
                    cmd: type,
                    targetDevice: this.$route.query.devGuid,
                    data: {
                        fileName: fileName
                    }

                };
            }

            this.$http.postHttp(this.$API.deviceLogSend, params, function (data) {
                _this3.$notify({
                    title: '发送成功,请等待设备回复...',
                    message: '',
                    type: 'success'
                });
            });
        },
        goToTop: function goToTop() {
            this.$router.go(-1);
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

/***/ 743:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(744);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("778c10c9", content, true, {});

/***/ }),

/***/ 744:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".listTitle[data-v-0e260570]{border-bottom:1px solid #eee;border-left:1px solid #fff;margin-left:-1px;height:40px;line-height:40px;font-size:14px;font-weight:700;text-align:center}.excel_list[data-v-0e260570]{border-right:1px solid #eee}.excel_list .upload-demo[data-v-0e260570]{display:inline-block;margin-right:10px}.realTimeInfo[data-v-0e260570]{margin:20px}.realTimeInfo>div[data-v-0e260570]{border-top:1px solid #eee;border-left:1px solid #eee}.realTimeInfo>div ul[data-v-0e260570]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.realTimeInfo>div ul li[data-v-0e260570]{list-style:none;-webkit-box-flex:1;-ms-flex:1;flex:1;min-height:60px;line-height:60px;padding:0 20px;border-right:1px solid #eee;border-bottom:1px solid #eee;font-size:14px}.realTimeInfo>div ul li.title[data-v-0e260570]{font-weight:700;font-size:16px;text-align:center}.realTimeInfo>div ul li[data-v-0e260570]:nth-child(odd){font-weight:700}.realTimeInfo>div.btns[data-v-0e260570]{border-left:1px solid #fff;margin:20px 0 20px -1px;border-top:none}", ""]);

// exports


/***/ }),

/***/ 745:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"realTimeInfo"},[_c('div',[_c('ul',[_c('li',{staticStyle:{"text-align":"center"}},[_c('el-button',{attrs:{"type":"primary","size":"mini"},on:{"click":function($event){_vm.deviceLogSend('deviceSettings')}}},[_vm._v("获得设备参数")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary","size":"mini"},on:{"click":function($event){_vm.deviceLogSend('deviceReset')}}},[_vm._v("复位设备")]),_vm._v(" "),_c('el-button',{attrs:{"type":"primary","size":"mini"},on:{"click":function($event){_vm.deviceLogSend('deviceUnregister')}}},[_vm._v("注销设备")])],1)])]),_vm._v(" "),(_vm.ifGetInfo)?_c('div',[_vm._m(0),_vm._v(" "),_c('ul',[_c('li',[_vm._v("设备类型")]),_vm._v(" "),_c('li',[_c('el-input',{attrs:{"placeholder":"请输入内容"},model:{value:(_vm.info.devType),callback:function ($$v) {_vm.$set(_vm.info, "devType", $$v)},expression:"info.devType"}})],1),_vm._v(" "),_c('li',[_vm._v("设备编号")]),_vm._v(" "),_c('li',[_c('el-input',{attrs:{"placeholder":"请输入内容"},model:{value:(_vm.info.devGuid),callback:function ($$v) {_vm.$set(_vm.info, "devGuid", $$v)},expression:"info.devGuid"}})],1)]),_vm._v(" "),_c('ul',[_c('li',[_vm._v("硬件版本")]),_vm._v(" "),_c('li',[_c('el-input',{attrs:{"placeholder":"请输入内容"},model:{value:(_vm.info.hardVer),callback:function ($$v) {_vm.$set(_vm.info, "hardVer", $$v)},expression:"info.hardVer"}})],1),_vm._v(" "),_c('li',[_vm._v("软件版本")]),_vm._v(" "),_c('li',[_c('el-input',{attrs:{"placeholder":"请输入内容"},model:{value:(_vm.info.softVer),callback:function ($$v) {_vm.$set(_vm.info, "softVer", $$v)},expression:"info.softVer"}})],1)])]):_vm._e(),_vm._v(" "),(_vm.ifGetInfo)?_c('div',[_vm._m(1),_vm._v(" "),_c('ul',[_c('li',[_vm._v("服务器IP地址")]),_vm._v(" "),_c('li',[_c('el-input',{attrs:{"placeholder":"请输入内容"},model:{value:(_vm.info.ip),callback:function ($$v) {_vm.$set(_vm.info, "ip", $$v)},expression:"info.ip"}})],1),_vm._v(" "),_c('li',[_vm._v("服务器端口")]),_vm._v(" "),_c('li',[_c('el-input',{attrs:{"placeholder":"请输入内容"},model:{value:(_vm.info.port),callback:function ($$v) {_vm.$set(_vm.info, "port", $$v)},expression:"info.port"}})],1)]),_vm._v(" "),_c('ul',[_c('li',[_vm._v("时间间隔")]),_vm._v(" "),_c('li',[_c('el-input',{attrs:{"placeholder":"请输入内容"},model:{value:(_vm.info.postIvl),callback:function ($$v) {_vm.$set(_vm.info, "postIvl", $$v)},expression:"info.postIvl"}})],1),_vm._v(" "),_c('li'),_vm._v(" "),_c('li',[_c('el-button',{attrs:{"type":"primary","size":"mini"},on:{"click":function($event){_vm.sendCommand('deviceNetInfo')}}},[_vm._v("设置网络信息")])],1)])]):_vm._e(),_vm._v(" "),(_vm.ifGetInfo)?_c('div',[_vm._m(2),_vm._v(" "),_c('ul',[_c('li',[_vm._v("采样频率")]),_vm._v(" "),_c('li',[_c('el-input',{attrs:{"placeholder":"请输入内容"},model:{value:(_vm.info.freq),callback:function ($$v) {_vm.$set(_vm.info, "freq", $$v)},expression:"info.freq"}})],1),_vm._v(" "),_c('li',[_vm._v("分析需采样次数")]),_vm._v(" "),_c('li',[_c('el-input',{attrs:{"placeholder":"请输入内容"},model:{value:(_vm.info.aSample),callback:function ($$v) {_vm.$set(_vm.info, "aSample", $$v)},expression:"info.aSample"}})],1)]),_vm._v(" "),_c('ul',[_c('li',[_vm._v("采样次数")]),_vm._v(" "),_c('li',[_c('el-input',{attrs:{"placeholder":"请输入内容"},model:{value:(_vm.info.fSample),callback:function ($$v) {_vm.$set(_vm.info, "fSample", $$v)},expression:"info.fSample"}})],1),_vm._v(" "),_c('li',[_vm._v("文件个数")]),_vm._v(" "),_c('li',[_c('el-input',{attrs:{"placeholder":"请输入内容"},model:{value:(_vm.info.fileNum),callback:function ($$v) {_vm.$set(_vm.info, "fileNum", $$v)},expression:"info.fileNum"}})],1)]),_vm._v(" "),_c('ul',[_c('li',[_vm._v("阀值")]),_vm._v(" "),_c('li',[_c('div',[_c('el-input',{attrs:{"placeholder":"请输入内容"},model:{value:(_vm.info.threshold[0]),callback:function ($$v) {_vm.$set(_vm.info.threshold, 0, $$v)},expression:"info.threshold[0]"}})],1),_vm._v(" "),_c('div',[_c('el-input',{attrs:{"placeholder":"请输入内容"},model:{value:(_vm.info.threshold[1]),callback:function ($$v) {_vm.$set(_vm.info.threshold, 1, $$v)},expression:"info.threshold[1]"}})],1),_vm._v(" "),_c('div',[_c('el-input',{attrs:{"placeholder":"请输入内容"},model:{value:(_vm.info.threshold[2]),callback:function ($$v) {_vm.$set(_vm.info.threshold, 2, $$v)},expression:"info.threshold[2]"}})],1),_vm._v(" "),_c('div',[_c('el-input',{attrs:{"placeholder":"请输入内容"},model:{value:(_vm.info.threshold[3]),callback:function ($$v) {_vm.$set(_vm.info.threshold, 3, $$v)},expression:"info.threshold[3]"}})],1)]),_vm._v(" "),_c('li'),_vm._v(" "),_c('li',[_c('el-button',{attrs:{"type":"primary","size":"mini"},on:{"click":function($event){_vm.sendCommand('deviceTestInfo')}}},[_vm._v("设置测试参数")])],1)])]):_vm._e(),_vm._v(" "),(_vm.ifGetInfo)?_c('div',[_vm._m(3),_vm._v(" "),_c('ul',[_c('li',[_vm._v("桩号")]),_vm._v(" "),_c('li',[_c('el-input',{attrs:{"placeholder":"请输入内容"},model:{value:(_vm.info.stake),callback:function ($$v) {_vm.$set(_vm.info, "stake", $$v)},expression:"info.stake"}})],1),_vm._v(" "),_c('li',[_vm._v("经度")]),_vm._v(" "),_c('li',[_c('el-input',{attrs:{"placeholder":"请输入内容"},model:{value:(_vm.info.lon),callback:function ($$v) {_vm.$set(_vm.info, "lon", $$v)},expression:"info.lon"}})],1)]),_vm._v(" "),_c('ul',[_c('li',[_vm._v("纬度")]),_vm._v(" "),_c('li',[_c('el-input',{attrs:{"placeholder":"请输入内容"},model:{value:(_vm.info.lat),callback:function ($$v) {_vm.$set(_vm.info, "lat", $$v)},expression:"info.lat"}})],1),_vm._v(" "),_c('li',[_vm._v("备注")]),_vm._v(" "),_c('li',[_c('el-input',{attrs:{"placeholder":"请输入内容"},model:{value:(_vm.info.remarks),callback:function ($$v) {_vm.$set(_vm.info, "remarks", $$v)},expression:"info.remarks"}})],1)]),_vm._v(" "),_c('ul',[_c('li'),_vm._v(" "),_c('li'),_vm._v(" "),_c('li'),_vm._v(" "),_c('li',[_c('el-button',{attrs:{"type":"primary","size":"mini"},on:{"click":function($event){_vm.sendCommand('deviceGisInfo')}}},[_vm._v("设置位置信息")])],1)])]):_vm._e(),_vm._v(" "),(_vm.ifGetInfo)?_c('div',[_vm._m(4),_vm._v(" "),_c('ul',[_c('li',{staticClass:"title",staticStyle:{"text-align":"center","display":"flex","justify-content":"space-between"}},[_c('div',{staticStyle:{"display":"flex","white-space":"nowrap","font-size":"14px"}},[_vm._v("页码："),_c('el-input',{attrs:{"placeholder":"请输入内容"},model:{value:(_vm.fillInput.path),callback:function ($$v) {_vm.$set(_vm.fillInput, "path", $$v)},expression:"fillInput.path"}})],1),_vm._v(" "),_c('div',{staticStyle:{"display":"flex","white-space":"nowrap","font-size":"14px"}},[_vm._v("文件数量："),_c('el-input',{attrs:{"disabled":""},model:{value:(_vm.fileList.fileNum),callback:function ($$v) {_vm.$set(_vm.fileList, "fileNum", $$v)},expression:"fileList.fileNum"}})],1),_vm._v(" "),_c('div',[_c('el-button',{attrs:{"type":"primary","size":"mini"},on:{"click":function($event){_vm.getFileList('deviceDirInfo')}}},[_vm._v("查询文件目录")])],1),_vm._v(" "),_c('div',[_c('el-button',{attrs:{"type":"primary","size":"mini"},on:{"click":function($event){_vm.deviceLogSend('deviceStartSaveFile')}}},[_vm._v("启动保存")])],1),_vm._v(" "),_c('div',[_c('el-button',{attrs:{"type":"primary","size":"mini"},on:{"click":function($event){_vm.deviceLogSend('deviceDeleteFiles')}}},[_vm._v("清空文件")])],1)])]),_vm._v(" "),_c('ul',{staticStyle:{"min-height":"200px"}},[[_c('el-table',{staticStyle:{"max-width":"80%","margin":"20px 0 0 10%"},attrs:{"data":_vm.fileList.dir,"border":""},on:{"selection-change":_vm.handleSelectionChange}},[_c('el-table-column',{attrs:{"label":"文件名"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('span',[_vm._v(_vm._s(scope.row))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('div',[_c('el-button',{attrs:{"type":"primary","size":"mini"},on:{"click":function($event){_vm.getFileList('deviceFileInfo',scope.row)}}},[_vm._v("获取文件")])],1)]}}])})],1)]],2),_vm._v(" "),_c('ul',{staticStyle:{"min-height":"200px"}})]):_vm._e()])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',[_c('li',{staticClass:"title"},[_vm._v("基础信息")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',[_c('li',{staticClass:"title"},[_vm._v("网络信息")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',[_c('li',{staticClass:"title"},[_vm._v("测试参数")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',[_c('li',{staticClass:"title"},[_vm._v("位置信息")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ul',[_c('li',{staticClass:"title"})])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});