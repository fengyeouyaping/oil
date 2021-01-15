webpackJsonp([21],{

/***/ 393:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_employeeList_vue__ = __webpack_require__(677);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_employeeList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_employeeList_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_employeeList_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_employeeList_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_28ff7f36_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_employeeList_vue__ = __webpack_require__(869);
function injectStyle (ssrContext) {
  __webpack_require__(867)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-28ff7f36"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_employeeList_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_28ff7f36_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_employeeList_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 677:
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
        this.initData();
    },

    //计算属性
    computed: _extends({}, (0, _vuex.mapState)({
        employeeData: function employeeData(state) {
            return state.EmployeeListModule.employeeData;
        }
    })),
    //组件方法
    methods: _extends({}, (0, _vuex.mapMutations)(['updateEmployeeData', 'EmployeeListModule/updateEmployeeData']), {
        initData: function initData() {
            var _this = this;

            //获取员工列表信息
            this.$myLoading.startLoading();
            this.$http.getHttp(this.$API.userSearch + "/u_is_delete/0/u_is_admin/0/skip/0/limit/1000", function (rs) {

                _this.$myLoading.endLoading();
                _this['EmployeeListModule/updateEmployeeData'](rs.data);
            });
        },
        refreshData: function refreshData() {
            this.initData();
        },
        handleEdit: function handleEdit(index, item) {

            this.$router.push({
                path: "/editEmployee",
                query: {
                    u_id: item.u_id
                }
            });
        },
        handleDelete: function handleDelete(index, item) {
            var _this2 = this;

            this.$myPop.confirmBox("删除确认", "确定要删除该用户吗？", function () {

                var params = {
                    uid: item.u_id
                };

                _this2.$myLoading.startLoading();
                _this2.$http.postHttp(_this2.$API.systemApiRemoveUser, params, function (rs) {
                    _this2.$myLoading.endLoading();
                    _this2.$myPop.SuccessMessage();

                    _this2.employeeData.splice(index, 1);
                });
            });
        },
        isStatus: function isStatus(row, column, cellValue, index) {
            return cellValue == 0 ? "在职" : "离职";
        },
        isSex: function isSex(row, column, cellValue, index) {
            return cellValue == 0 ? "男" : "女";
        }
    })
};

/***/ }),

/***/ 867:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(868);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("3dbf06f3", content, true, {});

/***/ }),

/***/ 868:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 869:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"tableHeader"},[_c('div',{staticClass:"tableHeaderTitle"},[_vm._v("员工列表")]),_vm._v(" "),_c('div',{staticClass:"tableHeaderMenu"},[_c('el-button-group',[_c('el-button',{attrs:{"icon":"el-icon-refresh","size":"mini"},on:{"click":_vm.refreshData}})],1)],1)]),_vm._v(" "),_c('el-table',{ref:"multipleTable",staticStyle:{"width":"100%"},attrs:{"data":_vm.employeeData,"tooltip-effect":"dark"}},[_c('el-table-column',{attrs:{"prop":"u_id","label":"用户ID","width":"80"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"u_nickname","label":"员工名称"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"u_phone","label":"员工电话"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"u_email","label":"邮箱地址"}}),_vm._v(" "),_c('el-table-column',{attrs:{"formatter":_vm.isStatus,"prop":"u_status","label":"状态","width":"80"}}),_vm._v(" "),_c('el-table-column',{attrs:{"formatter":_vm.isSex,"prop":"u_sex","label":"性别","width":"80"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"u_position","label":"职务"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"u_desc","label":"描述"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"u_salary","label":"工资"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"u_hiredate","label":"入职时间"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_vm._v("\n\t\t\t\t            "+_vm._s(_vm.$common.dateFormat("YYYY年MM月dd日",scope.row.u_hiredate))+"\n\t\t\t\t        ")]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作","fixed":"right","width":"260"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('el-button',{attrs:{"size":"mini"},on:{"click":function($event){_vm.handleEdit(scope.$index, scope.row)}}},[_vm._v("编辑")]),_vm._v(" "),_c('el-button',{attrs:{"size":"mini","type":"danger"},on:{"click":function($event){_vm.handleDelete(scope.$index, scope.row)}}},[_vm._v("删除")])]}}])})],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});