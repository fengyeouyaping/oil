webpackJsonp([18],{

/***/ 382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_employeeNodeManager_vue__ = __webpack_require__(664);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_employeeNodeManager_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_employeeNodeManager_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_employeeNodeManager_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_employeeNodeManager_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_9eebb4fa_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_employeeNodeManager_vue__ = __webpack_require__(826);
function injectStyle (ssrContext) {
  __webpack_require__(824)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-9eebb4fa"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_employeeNodeManager_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_9eebb4fa_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_employeeNodeManager_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 664:
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

var _vuex = __webpack_require__(9);

exports.default = {
    //数据源
    data: function data() {
        return {
            nowNodeId: 0, //当前选中的节点ID
            nowEmployeeData: []
        };
    },

    //初始化函数
    mounted: function mounted() {
        var _this = this;

        //获取公司节点列表信息
        this.$myLoading.startLoading();
        this.$http.getHttp(this.$API.organizationalStructureSearch + "/skip/0/limit/1000", function (rs) {
            _this['EmployeeNodeManagerModule/getCompanyNodeData'](_this.$common.arrayOrganizationalStructure(rs.data));

            //获取所有员工信息
            _this.$http.getHttp(_this.$API.userSearch + "/u_is_admin/0/u_is_delete/0/skip/0/limit/1000", function (rs) {
                _this.$myLoading.endLoading();
                _this['EmployeeNodeManagerModule/updateEmployeeData'](rs.data);
            });
        });
    },

    //计算属性
    computed: _extends({}, (0, _vuex.mapState)({
        companyNodeData: function companyNodeData(state) {
            return state.EmployeeNodeManagerModule.companyNodeData;
        },
        employeeData: function employeeData(state) {
            return state.EmployeeNodeManagerModule.employeeData;
        }
    })),
    //组件方法
    methods: _extends({}, (0, _vuex.mapMutations)(['getCompanyNodeData', 'EmployeeNodeManagerModule/getCompanyNodeData']), (0, _vuex.mapMutations)(['updateEmployeeData', 'EmployeeNodeManagerModule/updateEmployeeData']), {
        nodeClick: function nodeClick(data) {
            var _this2 = this;

            //清除原有选择
            this.nowEmployeeData = [];

            //当前选择的节点
            this.nowNodeId = data.os_id;

            //获取该节点下的员工 
            this.$myLoading.startLoading();
            this.$http.getHttp(this.$API.userOrganizationalMiddleSearch + "/uom_osid/" + data.os_id + "/skip/0/limit/1000", function (rs) {
                _this2.$myLoading.endLoading();

                rs.data.forEach(function (item) {
                    _this2.nowEmployeeData.push(item.uom_uid);
                });
            });
        },
        nodeEmployeeForm: function nodeEmployeeForm() {
            var _this3 = this;

            if (this.nowNodeId == 0) {
                this.$myPop.WarningMessage("请选择要分配员工的节点");
                return;
            }

            var datas = {};
            datas.employee = [];
            datas.osid = this.nowNodeId;
            for (var n in this.nowEmployeeData) {
                datas.employee.push({
                    "uom_uid": this.nowEmployeeData[n]
                });
            }

            //访问接口，进行分配
            this.$myLoading.startLoading();
            this.$http.postHttp(this.$API.systemApiOrganizationalToEmployee, datas, function (rs) {
                _this3.nowNodeId = 0;
                _this3.$myLoading.endLoading();
                _this3.$myPop.SuccessMessage();
            });
        }
    })
};

/***/ }),

/***/ 824:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(825);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("51a0be52", content, true, {});

/***/ }),

/***/ 825:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".nodeRoleBox[data-v-9eebb4fa]{top:40px;left:0;bottom:0;right:0;position:absolute}.companyNodeDataList[data-v-9eebb4fa]{width:280px;position:absolute;left:0;padding:10px;top:0;bottom:0;overflow:auto}.roleMenuList[data-v-9eebb4fa]{position:absolute;left:300px;top:0;padding-left:15px;padding-right:10px;padding-top:15px;right:0;bottom:0;overflow:auto;border-left:1px solid #eee}.roleMenuList .nodeRoleSubmit[data-v-9eebb4fa]{position:absolute;bottom:0;height:50px;background:#eee;z-index:99;left:0;right:0}.roleMenuList .nodeRoleSubmit button[data-v-9eebb4fa]{margin-top:5px;margin-left:5px}", ""]);

// exports


/***/ }),

/***/ 826:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"nodeRoleBox"},[_c('div',{staticClass:"companyNodeDataList"},[_c('el-scrollbar',[_c('el-tree',{ref:"tree",attrs:{"node-key":"or_id","data":_vm.companyNodeData,"default-expand-all":true,"expand-on-click-node":false},on:{"node-click":_vm.nodeClick}})],1)],1),_vm._v(" "),_c('div',{staticClass:"roleMenuList"},[_c('el-transfer',{attrs:{"data":_vm.employeeData,"props":{
                key   : 'u_id',
                label : 'u_nickname'
            },"titles":['所有员工', '当前员工']},model:{value:(_vm.nowEmployeeData),callback:function ($$v) {_vm.nowEmployeeData=$$v},expression:"nowEmployeeData"}}),_vm._v(" "),_c('div',{staticClass:"nodeRoleSubmit"},[_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.nodeEmployeeForm}},[_vm._v("将员工分配给节点")])],1)],1)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});