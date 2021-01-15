webpackJsonp([45],{

/***/ 388:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_aggregationLayerApiDocsListManager_vue__ = __webpack_require__(672);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_aggregationLayerApiDocsListManager_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_aggregationLayerApiDocsListManager_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_aggregationLayerApiDocsListManager_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_aggregationLayerApiDocsListManager_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_32dc5900_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_aggregationLayerApiDocsListManager_vue__ = __webpack_require__(854);
function injectStyle (ssrContext) {
  __webpack_require__(852)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-32dc5900"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_aggregationLayerApiDocsListManager_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_32dc5900_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_aggregationLayerApiDocsListManager_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 672:
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

var _vuex = __webpack_require__(9);

exports.default = {
    //数据源
    data: function data() {
        return {};
    },

    //初始化函数
    mounted: function mounted() {
        var _this = this;

        //获取聚合层接口信息
        this.$myLoading.startLoading();
        this.$http.getHttp(this.$API.bussinessApiDocsSearch + "/skip/0/limit/1000", function (rs) {
            _this.$myLoading.endLoading();
            _this['AggregationLayerApiDocsListManagerModule/updateApiDocsListData'](rs.data);
        });
    },

    //计算属性
    computed: _extends({}, (0, _vuex.mapState)({
        apiDocsListData: function apiDocsListData(state) {
            return state.AggregationLayerApiDocsListManagerModule.apiDocsListData;
        }
    })),
    //组件方法
    methods: _extends({}, (0, _vuex.mapMutations)(['updateApiDocsListData', 'AggregationLayerApiDocsListManagerModule/updateApiDocsListData']), {
        handleEdit: function handleEdit(index, item) {

            this.$router.push({
                path: "/editAggregationLayerApiDocs",
                query: {
                    bad_id: item.bad_id
                }
            });
        },
        refreshData: function refreshData() {
            var _this2 = this;

            //获取聚合层接口信息
            this.$myLoading.startLoading();
            this.$http.getHttp(this.$API.bussinessApiDocsSearch + "/skip/0/limit/1000", function (rs) {
                _this2.$myLoading.endLoading();
                _this2['AggregationLayerApiDocsListManagerModule/updateApiDocsListData'](rs.data);
            });
        },
        handleDelete: function handleDelete(index, item) {
            var _this3 = this;

            this.$myPop.confirmBox("删除提示", "确定要删除该接口文档信息吗？", function () {

                var params = {
                    delete_where: "bad_id",
                    bad_id: item.bad_id,
                    isPhysicallyDelete: 1
                };

                _this3.$myLoading.startLoading();
                _this3.$http.postHttp(_this3.$API.bussinessApiDocsDelete, params, function (rs) {
                    _this3.$myLoading.endLoading();
                    _this3.$myPop.SuccessMessage();
                    _this3.apiDocsListData.splice(index, 1);
                });
            });
        },
        typeFormatter: function typeFormatter(row, column, cellValue, index) {
            return cellValue == 0 ? "自身业务接口" : "三方业务接口";
        }
    })
};

/***/ }),

/***/ 852:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(853);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("4b3ae1b5", content, true, {});

/***/ }),

/***/ 853:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 854:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"tableHeader"},[_c('div',{staticClass:"tableHeaderTitle"},[_vm._v("文档列表")]),_vm._v(" "),_c('div',{staticClass:"tableHeaderMenu"},[_c('el-button-group',[_c('el-button',{attrs:{"icon":"el-icon-refresh","size":"mini"},on:{"click":_vm.refreshData}})],1)],1)]),_vm._v(" "),_c('el-table',{ref:"multipleTable",staticStyle:{"width":"100%"},attrs:{"data":_vm.apiDocsListData,"tooltip-effect":"dark"}},[_c('el-table-column',{attrs:{"prop":"bad_id","label":"接口ID","width":"80"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"bad_name","label":"接口名称"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"bad_api","label":"接口地址"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"bad_method","label":"请求方式"}}),_vm._v(" "),_c('el-table-column',{attrs:{"formatter":_vm.typeFormatter,"prop":"bad_type","label":"接口类型"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作","fixed":"right","width":"260"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('el-button',{attrs:{"size":"mini"},on:{"click":function($event){_vm.handleEdit(scope.$index, scope.row)}}},[_vm._v("编辑")]),_vm._v(" "),_c('el-button',{attrs:{"size":"mini","type":"danger"},on:{"click":function($event){_vm.handleDelete(scope.$index, scope.row)}}},[_vm._v("删除")])]}}])})],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});