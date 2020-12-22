webpackJsonp([23],{

/***/ 401:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_aggregationServerList_vue__ = __webpack_require__(665);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_aggregationServerList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_aggregationServerList_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_aggregationServerList_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_aggregationServerList_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_9fff41b8_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_aggregationServerList_vue__ = __webpack_require__(865);
function injectStyle (ssrContext) {
  __webpack_require__(863)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-9fff41b8"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_aggregationServerList_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_9fff41b8_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_aggregationServerList_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 665:
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
    //数据源
    data: function data() {
        return {};
    },

    //初始化函数
    mounted: function mounted() {

        //获取服务器数据
        this.initServerData();
    },

    //计算属性
    computed: _extends({}, (0, _vuex.mapState)({
        serverData: function serverData(state) {
            return state.AggregationServerListModule.serverData;
        }
    })),
    //组件方法
    methods: _extends({}, (0, _vuex.mapMutations)(['updateServerData', 'AggregationServerListModule/updateServerData']), {
        initServerData: function initServerData() {
            var _this = this;

            this.$myLoading.startLoading();
            this.$http.getHttp(this.$API.systemApiSearchAggregationServer, function (rs) {

                _this.$myLoading.endLoading();
                _this['AggregationServerListModule/updateServerData'](rs.data);
            });
        },
        handleEdit: function handleEdit(index, item) {

            this.$router.push({
                path: "/editAggregationServer",
                query: {
                    as_id: item.as_id
                }
            });
        },
        handleDelete: function handleDelete(index, item) {
            var _this2 = this;

            this.$myPop.confirmBox("删除提示", "确定要删除聚合层服务吗？删除后，聚合层将无法访问原子层服务，如需访问需要重新进行添加注册操作", function () {

                var params = {
                    delete_where: "as_id",
                    as_id: item.as_id,
                    isPhysicallyDelete: "1"
                };

                _this2.$myLoading.startLoading();
                _this2.$http.postHttp(_this2.$API.sysAggregationServerDelete, params, function (rs) {

                    _this2.$myLoading.endLoading();
                    _this2.$myPop.SuccessMessage();

                    _this2.serverData.splice(index, 1);
                });
            });
        },
        restartServer: function restartServer(index, item) {
            var _this3 = this;

            this.$myPop.confirmBox("重启提示", "确定要重启该聚合层服务吗？", function () {

                var params = {
                    server_ip: item.as_ip,
                    server_dir: item.as_project_path
                };

                _this3.$myLoading.startLoading();
                _this3.$http.postHttp(_this3.$API.sshRestartServer, params, function (rs) {

                    _this3.$myLoading.endLoading();
                    _this3.$myPop.alertHtmlBox("服务器启动结果：", rs);

                    item.status = 'RUNNING';
                });
            });
        },
        startServer: function startServer(index, item) {
            var _this4 = this;

            this.$myPop.confirmBox("启动提示", "确定要启动该聚合层服务吗？启动后，该聚合层提供的接口可以对外进行服务。", function () {

                var params = {
                    server_ip: item.as_ip,
                    server_dir: item.as_project_path
                };

                _this4.$myLoading.startLoading();
                _this4.$http.postHttp(_this4.$API.sshStartServer, params, function (rs) {

                    _this4.$myLoading.endLoading();
                    _this4.$myPop.alertHtmlBox("服务器启动结果：", rs);

                    item.status = 'RUNNING';
                });
            });
        },
        stopServer: function stopServer(index, item) {
            var _this5 = this;

            this.$myPop.confirmBox("停止提示", "确定要停止该聚合层服务吗？停止后，该聚合层提供的接口服务的将不可使用。", function () {

                var params = {
                    server_ip: item.as_ip,
                    server_dir: item.as_project_path
                };

                _this5.$myLoading.startLoading();
                _this5.$http.postHttp(_this5.$API.sshStopServer, params, function (rs) {

                    _this5.$myLoading.endLoading();
                    _this5.$myPop.alertHtmlBox("服务器停止结果：", rs);

                    item.status = 'STOP';
                });
            });
        },
        gitPullServer: function gitPullServer(index, item) {
            var _this6 = this;

            this.$myPop.confirmBox("更新提示", "确定要更新聚合层服务吗？该操作仅对项目使用GIT管理的用户有效，如无GIT管理，该操作无效果。", function () {

                var params = {
                    server_ip: item.as_ip,
                    server_dir: item.as_project_path
                };

                _this6.$myLoading.startLoading();
                _this6.$http.postHttp(_this6.$API.sshGitPull, params, function (rs) {

                    _this6.$myLoading.endLoading();
                    _this6.$myPop.alertHtmlBox("服务更新结果：", rs);
                });
            });
        },
        refreshData: function refreshData() {

            //获取服务器数据
            this.initServerData();
        },
        isOpenFormatter: function isOpenFormatter(row, column, cellValue, index) {
            return cellValue == 0 ? "关闭" : "开启";
        },
        statusFormatter: function statusFormatter(row, column, cellValue, index) {
            return cellValue == "RUNNING" ? "运行中" : "已停止";
        }
    })
};

/***/ }),

/***/ 863:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(864);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("4adb6096", content, true, {});

/***/ }),

/***/ 864:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 865:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"tableHeader"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"tableHeaderMenu"},[_c('el-button-group',[_c('el-button',{attrs:{"icon":"el-icon-refresh","size":"mini"},on:{"click":_vm.refreshData}})],1)],1)]),_vm._v(" "),_c('el-table',{ref:"multipleTable",staticStyle:{"width":"100%"},attrs:{"data":_vm.serverData,"tooltip-effect":"dark"}},[_c('el-table-column',{attrs:{"prop":"as_no","label":"服务器编号"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"as_name","label":"服务器名称"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"as_ip","label":"服务器地址"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"as_port","label":"端口号"}}),_vm._v(" "),_c('el-table-column',{attrs:{"formatter":_vm.isOpenFormatter,"prop":"as_is_open","label":"是否开启"}}),_vm._v(" "),_c('el-table-column',{attrs:{"formatter":_vm.statusFormatter,"prop":"status","label":"服务器状态"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作","fixed":"right","width":"450"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(scope.row.status == 'RUNNING')?_c('el-button',{attrs:{"size":"mini"},on:{"click":function($event){_vm.restartServer(scope.$index, scope.row)}}},[_vm._v("重新启动")]):_vm._e(),_vm._v(" "),(scope.row.status == 'STOP')?_c('el-button',{attrs:{"size":"mini"},on:{"click":function($event){_vm.startServer(scope.$index, scope.row)}}},[_vm._v("启动服务")]):_vm._e(),_vm._v(" "),(scope.row.status == 'RUNNING')?_c('el-button',{attrs:{"size":"mini","type":"danger"},on:{"click":function($event){_vm.stopServer(scope.$index, scope.row)}}},[_vm._v("停止服务")]):_vm._e(),_vm._v(" "),_c('el-button',{attrs:{"size":"mini"},on:{"click":function($event){_vm.gitPullServer(scope.$index, scope.row)}}},[_vm._v("更新项目(Git)")]),_vm._v(" "),_c('el-button',{attrs:{"size":"mini"},on:{"click":function($event){_vm.handleEdit(scope.$index, scope.row)}}},[_vm._v("编辑")]),_vm._v(" "),_c('el-button',{attrs:{"size":"mini","type":"danger"},on:{"click":function($event){_vm.handleDelete(scope.$index, scope.row)}}},[_vm._v("删除")])]}}])})],1)],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tableHeaderTitle"},[_vm._v("聚合层服务器列表"),_c('span',{staticStyle:{"color":"red"}},[_vm._v("（操作暂时只支持linux服务器）")])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});