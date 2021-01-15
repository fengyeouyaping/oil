webpackJsonp([29],{

/***/ 378:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_atomicApiList_vue__ = __webpack_require__(662);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_atomicApiList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_atomicApiList_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_atomicApiList_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_atomicApiList_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_30715232_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_atomicApiList_vue__ = __webpack_require__(824);
function injectStyle (ssrContext) {
  __webpack_require__(822)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-30715232"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_atomicApiList_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_30715232_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_atomicApiList_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 662:
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

var _vuex = __webpack_require__(9);

exports.default = {
    //数据源
    data: function data() {
        return {};
    },

    //初始化函数
    mounted: function mounted() {
        var _this = this;

        //获取接口分类信息
        this.$myLoading.startLoading();
        this.$http.getHttp(this.$API.actionPermissionsSearch + "/ap_api_type/BUSSINESS/sort_order/ap_id-desc/skip/0/limit/1000", function (rs) {
            _this.$myLoading.endLoading();
            _this['AtomicApiListModule/updateApiListData'](rs.data);
        });
    },

    //计算属性
    computed: _extends({}, (0, _vuex.mapState)({
        apiListData: function apiListData(state) {
            return state.AtomicApiListModule.apiListData;
        }
    })),
    //组件方法
    methods: _extends({}, (0, _vuex.mapMutations)(['updateApiListData', 'AtomicApiListModule/updateApiListData']), {

        //删除原子层接口
        handleDelete: function handleDelete(index, item) {
            var _this2 = this;

            this.$myPop.confirmBox("确认操作", "确定要删除该操作接口吗？", function () {

                var params = {
                    apid: item.ap_id
                };

                _this2.$myLoading.startLoading();
                _this2.$http.postHttp(_this2.$API.systemApiRemoveActionPermissions, params, function (rs) {
                    _this2.$myLoading.endLoading();
                    _this2.$myPop.SuccessMessage();

                    _this2.apiListData.splice(index, 1);
                });
            });
        },


        //编辑原子层接口
        handleEdit: function handleEdit(index, item) {

            this.$router.push({
                path: "/editAtomicApi",
                query: {
                    ap_id: item.ap_id
                }
            });
        },


        //格式化自动构建显示内容
        isAutoFormatter: function isAutoFormatter(row, column, cellValue, index) {
            return cellValue == 0 ? "否" : "是";
        },


        //重新构建接口配置
        rebuldApiConfig: function rebuldApiConfig() {
            var _this3 = this;

            this.$myPop.confirmBox("确认操作", "确定要重新构建接口配置？", function () {

                _this3.$myLoading.startLoading();
                _this3.$http.postHttp(_this3.$API.systemApiRebuildBussinessApi, {}, function (rs) {
                    _this3.$myLoading.endLoading();
                    _this3.$myPop.SuccessMessage();
                });
            });
        },
        apiTypeFormatter: function apiTypeFormatter(row, column, cellValue, index) {
            if (cellValue == 'BUSSINESS') {
                return "业务接口";
            } else if (cellValue == 'SYSTEM') {
                return "系统接口";
            } else {
                return "扩展接口";
            }
        }
    })
};

/***/ }),

/***/ 822:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(823);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("4f80a2f4", content, true, {});

/***/ }),

/***/ 823:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 824:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"tableHeader"},[_c('div',{staticClass:"tableHeaderTitle"},[_vm._v("操作接口列表 - "),_c('b',[_vm._v("数量："+_vm._s(_vm.apiListData.length))])]),_vm._v(" "),_c('div',{staticClass:"tableHeaderMenu"},[_c('el-button-group',[_c('el-button',{attrs:{"size":"mini"},on:{"click":_vm.rebuldApiConfig}},[_vm._v("重新生成接口配置")]),_vm._v(" "),_c('el-button',{attrs:{"icon":"el-icon-refresh","size":"mini"}})],1)],1)]),_vm._v(" "),_c('el-table',{ref:"multipleTable",staticStyle:{"width":"100%"},attrs:{"data":_vm.apiListData,"tooltip-effect":"dark"}},[_c('el-table-column',{attrs:{"prop":"ap_name","label":"接口名称"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"ap_api","label":"接口地址"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"ap_method","label":"请求方式","width":"120"}}),_vm._v(" "),_c('el-table-column',{attrs:{"formatter":_vm.isAutoFormatter,"prop":"ap_is_auto","label":"是否自动构建","width":"120"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作","fixed":"right","width":"260"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('el-button',{attrs:{"size":"mini"},on:{"click":function($event){_vm.handleEdit(scope.$index, scope.row)}}},[_vm._v("编辑")]),_vm._v(" "),_c('el-button',{attrs:{"size":"mini","type":"danger"},on:{"click":function($event){_vm.handleDelete(scope.$index, scope.row)}}},[_vm._v("删除")])]}}])})],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});