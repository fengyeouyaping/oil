webpackJsonp([54],{

/***/ 363:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(648);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3dad37ea_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(778);
function injectStyle (ssrContext) {
  __webpack_require__(776)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3dad37ea"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3dad37ea_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 648:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
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

exports.default = {
    data: function data() {
        return {
            total: 0,
            pageNum: 1,

            isAddInfo: false,
            filterText: '',
            isCanOperate: false,
            tableData: []
        };
    },
    mounted: function mounted() {
        this.initData();
    },

    methods: {
        //导出
        fileExport: function fileExport() {
            window.location = this.$global.httpServer + this.$API.recordExport + "?stake=" + this.filterText;
        },
        initDatas: function initDatas() {
            this.pageNum = 1;
            this.initData();
        },

        //列表数据
        initData: function initData() {
            var _this = this;

            var params = {
                pageNum: this.pageNum,
                pageSize: this.$global.pageLimit,
                stake: this.filterText
            };

            this.$myLoading.startLoading();
            this.$http.postHttp(this.$API.recordList, params, function (data) {
                _this.total = data.data.total;
                _this.tableData = data.data.list;
                _this.tableData.map(function (item) {
                    item.actTime = item.actTime ? _this.getTime(item.actTime) : '';
                    item.estimatedTime = item.estimatedTime ? _this.getTime(item.estimatedTime) : '';
                });
                _this.$myLoading.endLoading();
            });
        },

        //当前页数
        handleCurrentChange: function handleCurrentChange(val) {
            this.pageNum = val;
            this.initData();
        },

        //时间精确到秒
        getTime: function getTime(time) {
            return time ? time.split('.')[0] : '';
        }
    }

};

/***/ }),

/***/ 776:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(777);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("2d9b1838", content, true, {});

/***/ }),

/***/ 777:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".mask[data-v-3dad37ea]{position:absolute;width:100%;height:100%;margin-left:-10px;background:rgba(0,0,0,.3);z-index:10;right:0}.mask .margin[data-v-3dad37ea]{width:400px;background:#fff;border-radius:5px;margin:20% auto;padding:20px;position:relative}.mask .margin .close[data-v-3dad37ea]{position:absolute;top:10px;right:10px;font-size:25px;color:#999}.mask .margin .header[data-v-3dad37ea]{font-size:18px;color:#333;font-weight:700;text-align:center}.mask .margin .from[data-v-3dad37ea]{margin-top:20px}.realTimeData[data-v-3dad37ea]{display:-webkit-box;display:-ms-flexbox;display:flex;height:100%;overflow:hidden}.realTimeData .content[data-v-3dad37ea]{-webkit-box-flex:1;-ms-flex:1;flex:1;overflow:auto}.realTimeData .content .header[data-v-3dad37ea]{padding:20px 20px 10px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.realTimeData .content .header .el-input[data-v-3dad37ea]{width:240px}.realTimeData .content .header div[data-v-3dad37ea]{display:-webkit-box;display:-ms-flexbox;display:flex}.realTimeData .content .header div i[data-v-3dad37ea]{font-size:18px;margin-left:20px;cursor:pointer}.realTimeData .content .figure[data-v-3dad37ea]{height:85%;padding:10px 20px}.realTimeData .content .figure .block[data-v-3dad37ea]{text-align:center}.el-pagination[data-v-3dad37ea]{float:none;margin:0 auto;text-align:center}", ""]);

// exports


/***/ }),

/***/ 778:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"realTimeData"},[_c('div',{staticClass:"content"},[_c('div',{staticClass:"header"},[_c('div',[_c('el-input',{attrs:{"placeholder":"请输入测试桩号","size":"small","suffix-icon":"el-icon-search"},model:{value:(_vm.filterText),callback:function ($$v) {_vm.filterText=$$v},expression:"filterText"}}),_vm._v(" "),_c('el-button',{staticStyle:{"margin-left":"20px"},attrs:{"size":"small","type":"primary"},on:{"click":function($event){_vm.initDatas()}}},[_vm._v("搜索")])],1),_vm._v(" "),_c('div',[_c('i',{staticClass:"el el-icon-download",attrs:{"title":"导出模版"},on:{"click":_vm.fileExport}})])]),_vm._v(" "),_c('div',{staticClass:"figure"},[_c('el-table',{staticClass:"tableData",staticStyle:{"width":"100%"},attrs:{"data":_vm.tableData,"height":"100%","stripe":true}},[_c('el-table-column',{attrs:{"prop":"id","label":"序号"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"stake","label":"测试桩号"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"estimatedTime","label":"预计到达时间"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"actTime","label":"实际到达时间"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"speed","label":"运行速度"}})],1)],1),_vm._v(" "),_c('el-pagination',{attrs:{"background":"","current-page":_vm.pageNum,"page-size":_vm.$global.pageLimit,"layout":"prev, pager, next","total":_vm.total},on:{"current-change":_vm.handleCurrentChange}})],1)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});