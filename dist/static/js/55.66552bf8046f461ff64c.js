webpackJsonp([55],{

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(626);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1e795f8e_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(748);
function injectStyle (ssrContext) {
  __webpack_require__(746)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-1e795f8e"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1e795f8e_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 626:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
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

var _vuex = __webpack_require__(9);

exports.default = {
    data: function data() {
        return {
            total: 0,
            pageNum: 1,
            isAddInfo: false,
            filterText: '',
            isCanOperate: false,
            tableData: [],
            searchTime: [new Date() - 3600 * 24 * 1000, new Date() - 0]
        };
    },
    mounted: function mounted() {
        this.initData();
    },

    computed: _extends({}, (0, _vuex.mapState)({
        taskbars: function taskbars(state) {
            return state.MenuModule.taskbars;
        }
    })),
    methods: {
        //导出
        fileExport: function fileExport() {
            if (!this.searchTime) {
                this.searchTime = [new Date() - 3600 * 24 * 1000, new Date() - 0];
            }
            var startTime = this.searchTime[0] + 0;
            var endTime = this.searchTime[1] + 0;
            var devGuid = this.filterText;
            var url = this.$global.httpServer + this.$API.fileExport;
            url += "?startTime=" + startTime + "&endTime=" + endTime;
            if (devGuid) url += "&devGuid=" + devGuid;
            window.location = url;
        },
        ifShow: function ifShow(index) {
            return this.taskbars[2]['childMenus'][0]['childMenus'][index]['visible'];
        },
        initDatas: function initDatas() {
            this.pageNum = 1;
            this.initData();
        },

        //列表数据
        initData: function initData() {
            var _this = this;

            if (!this.searchTime) {
                this.searchTime = [new Date() - 3600 * 24 * 1000, new Date() - 0];
            }
            var params = {
                pageNum: this.pageNum,
                pageSize: this.$global.pageLimit,
                devGuid: this.filterText,
                startTime: this.searchTime[0] + 0,
                endTime: this.searchTime[1] + 0
            };

            this.$myLoading.startLoading();
            this.$http.postHttp(this.$API.deviceLogList, params, function (data) {
                _this.total = data.data.total;
                _this.tableData = data.data.list;
                _this.tableData.map(function (item) {
                    item.time = item.time ? _this.$common.dateFormat("YYYY-MM-dd", item.time / 1000) : '';
                });
                _this.data = _this.$common.arrayOrganizationalNew(_this.tableData);
                _this.$myLoading.endLoading();
            });
        },

        //删除日志信息
        daleteInfo: function daleteInfo(item) {
            var _this2 = this;

            this.$confirm('确定删除此日志信息吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                _this2.$myLoading.startLoading();

                _this2.$http.getHttp(_this2.$API.deviceLogDelete + "?id=" + item.id, function (data) {
                    _this2.initData();
                    _this2.$notify({
                        title: '删除成功',
                        message: '',
                        type: 'success'
                    });
                    _this2.$myLoading.endLoading();
                });
            }).catch(function () {});
        },

        //当前页数
        handleCurrentChange: function handleCurrentChange(val) {
            this.pageNum = val;
            this.initData();
        },
        handleClick: function handleClick(data, type) {
            if (type === 1) {
                this.$router.push({
                    path: "/equipmentInfo"
                });
            } else if (type === 2) {
                this.$router.push({
                    path: "/equipmentEditor"
                });
            }
        }
    }
};

/***/ }),

/***/ 746:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(747);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("16d44344", content, true, {});

/***/ }),

/***/ 747:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".mask[data-v-1e795f8e]{position:absolute;width:100%;height:100%;margin-left:-10px;background:rgba(0,0,0,.3);z-index:10}.mask .margin[data-v-1e795f8e]{width:400px;background:#fff;border-radius:5px;margin:20% auto;padding:20px;position:relative}.mask .margin .close[data-v-1e795f8e]{position:absolute;top:10px;right:10px;font-size:25px;color:#999}.mask .margin .header[data-v-1e795f8e]{font-size:18px;color:#333;font-weight:700;text-align:center}.mask .margin .from[data-v-1e795f8e]{margin-top:20px}.realTimeData[data-v-1e795f8e]{display:-webkit-box;display:-ms-flexbox;display:flex;height:100%}.realTimeData .content[data-v-1e795f8e]{-webkit-box-flex:1;-ms-flex:1;flex:1}.realTimeData .content .header[data-v-1e795f8e]{padding:20px 20px 10px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.realTimeData .content .header .el-input[data-v-1e795f8e]{width:240px}.realTimeData .content .header div[data-v-1e795f8e]{display:-webkit-box;display:-ms-flexbox;display:flex}.realTimeData .content .header div i[data-v-1e795f8e]{font-size:18px;margin-left:20px;cursor:pointer}.realTimeData .content .figure[data-v-1e795f8e]{height:85%;padding:10px 20px}.realTimeData .content .figure .block[data-v-1e795f8e]{text-align:center}.el-pagination[data-v-1e795f8e]{float:none;margin:0 auto;text-align:center}", ""]);

// exports


/***/ }),

/***/ 748:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"realTimeData"},[_c('div',{staticClass:"content"},[_c('div',{staticClass:"header"},[_c('div',[_c('el-input',{staticStyle:{"margin-right":"10px"},attrs:{"placeholder":"请输入设备编码","size":"small","suffix-icon":"el-icon-search"},model:{value:(_vm.filterText),callback:function ($$v) {_vm.filterText=$$v},expression:"filterText"}}),_vm._v(" "),_c('el-date-picker',{attrs:{"type":"daterange","size":"small","range-separator":"-","start-placeholder":"开始日期","end-placeholder":"结束日期","default-time":['00:00:00', '0:00:00']},model:{value:(_vm.searchTime),callback:function ($$v) {_vm.searchTime=$$v},expression:"searchTime"}}),_vm._v(" "),_c('el-button',{staticStyle:{"margin-left":"20px"},attrs:{"size":"small","type":"primary"},on:{"click":function($event){_vm.initDatas()}}},[_vm._v("搜索")])],1),_vm._v(" "),_c('div',[(_vm.ifShow(1))?_c('i',{staticClass:"el el-icon-download",attrs:{"title":"导出列表"},on:{"click":_vm.fileExport}}):_vm._e()])]),_vm._v(" "),_c('div',{staticClass:"figure"},[_c('el-table',{staticClass:"tableData",staticStyle:{"width":"100%"},attrs:{"data":_vm.tableData,"height":"100%","stripe":true}},[_c('el-table-column',{attrs:{"prop":"id","label":"序号"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"time","label":"上报时间"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"devGuid","label":"设备编码"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"告警类型"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('span',{class:scope.row.status == 9 ? 'red' : ''},[_vm._v(_vm._s(scope.row.status == 0 ? '待机' : scope.row.status == 1 ? '测试中' : scope.row.status == 9 ? scope.row.fault : ''))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"fault","label":"内容"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作","fixed":"right"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(_vm.ifShow(0))?_c('el-button',{attrs:{"type":"text","size":"small"},on:{"click":function($event){_vm.daleteInfo(scope.row)}}},[_vm._v("删除")]):_vm._e()]}}])})],1)],1),_vm._v(" "),_c('el-pagination',{attrs:{"background":"","current-page":_vm.pageNum,"page-size":_vm.$global.pageLimit,"layout":"prev, pager, next","total":_vm.total},on:{"current-change":_vm.handleCurrentChange}})],1)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});