webpackJsonp([9],{

/***/ 381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_nodeRoleManagement_vue__ = __webpack_require__(663);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_nodeRoleManagement_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_nodeRoleManagement_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_nodeRoleManagement_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_nodeRoleManagement_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_49d5c0d2_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_nodeRoleManagement_vue__ = __webpack_require__(823);
function injectStyle (ssrContext) {
  __webpack_require__(821)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-49d5c0d2"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_nodeRoleManagement_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_49d5c0d2_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_nodeRoleManagement_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 663:
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
            nowRoleData: [], //当前节点所拥有的角色
            nowNodeId: 0, //当前选中的节点ID
            nowNodeData: {}, //当前选中的节点信息
            otherNodeRoleData: [] //其他要更新节点的参数信息
        };
    },

    //初始化函数
    mounted: function mounted() {
        var _this = this;

        //获取公司节点列表信息
        this.$myLoading.startLoading();
        this.$http.getHttp(this.$API.organizationalStructureSearch + "/skip/0/limit/1000", function (rs) {

            _this['NodeRoleManagement/getCompanyNodeData'](_this.$common.arrayOrganizationalStructure(rs.data));

            _this.$http.getHttp(_this.$API.organizationalRoleSearch + "/no/or_is_all-1/skip/0/limit/1000", function (rs) {
                _this.$myLoading.endLoading();
                for (var n in rs.data) {
                    rs.data[n].roleMenu = false;
                }
                _this['NodeRoleManagement/updateRoleData'](rs.data);
            });
        });
    },

    //计算属性
    computed: _extends({}, (0, _vuex.mapState)({

        companyNodeData: function companyNodeData(state) {
            return state.NodeRoleManagement.companyNodeData;
        },
        roleData: function roleData(state) {
            return state.NodeRoleManagement.roleData;
        }

    })),
    //组件方法
    methods: _extends({}, (0, _vuex.mapMutations)(['getCompanyNodeData', 'NodeRoleManagement/getCompanyNodeData']), (0, _vuex.mapMutations)(['updateRoleData', 'NodeRoleManagement/updateRoleData']), {

        //点击树形控件
        nodeClick: function nodeClick(data) {
            var _this2 = this;

            this.nowNodeData = data;

            this.$myLoading.startLoading();
            this.$http.getHttp(this.$API.organizationalRoleMiddleSearch + "/orm_osid/" + data.os_id + "/skip/0/limit/1000", function (rs) {
                _this2.$myLoading.endLoading();

                var tempRoleArr = [];
                //获取当前所拥有的权限,构建可用数据
                rs.data.forEach(function (item) {
                    tempRoleArr.push(item.orm_orid);
                });

                _this2.nowNodeId = data.os_id;
                _this2.nowRoleData = tempRoleArr;
            });
        },


        //获取下层节点有继承关系的角色更新参数
        getChildNodeRole: function getChildNodeRole(data) {
            var _this3 = this;

            //判断该节点的下层是否还有子节点
            if (data.children != undefined && data.children.length > 0) {

                //判断下层节点的是否继承上层
                data.children.forEach(function (item) {

                    if (item.os_is_inherit == '1') {

                        var nodeRoleParams = {
                            osid: item.os_id
                        };

                        nodeRoleParams.node_role = [];
                        for (var n = 0; n < _this3.nowRoleData.length; n++) {
                            nodeRoleParams.node_role.push({
                                orm_orid: _this3.nowRoleData[n]
                            });
                        }

                        _this3.otherNodeRoleData.push(nodeRoleParams);

                        _this3.getChildNodeRole(item);
                    } else {

                        return;
                    }
                });
            } else {

                return false;
            }
        },


        //点击进行分配
        nodeRoleForm: function nodeRoleForm() {
            var _this4 = this;

            if (this.nowNodeId == 0) {
                this.$myPop.WarningMessage("请选择要分配角色的节点");
                return;
            }

            var datas = {};
            datas.node_role = [];
            datas.osid = this.nowNodeId;
            for (var n in this.nowRoleData) {
                datas.node_role.push({
                    "orm_orid": this.nowRoleData[n]
                });
            }

            //访问接口，进行分配
            this.$myLoading.startLoading();
            this.$http.postHttp(this.$API.systemApiOrganizationalAllocationRole, datas, function (rs) {

                //判断是否有需要更新权限的子节点
                _this4.getChildNodeRole(_this4.nowNodeData);
                if (_this4.otherNodeRoleData.length > 0) {

                    _this4.$http.postHttp(_this4.$API.systemApiOrganizationalInheritRole, { other_node_role: _this4.otherNodeRoleData }, function (rs) {
                        _this4.$myLoading.endLoading();
                        _this4.$myPop.SuccessMessage();
                    });
                } else {
                    _this4.$myLoading.endLoading();
                    _this4.$myPop.SuccessMessage();
                }
            });
        }
    })
};

/***/ }),

/***/ 821:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(822);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("deeffbba", content, true, {});

/***/ }),

/***/ 822:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".nodeRoleBox[data-v-49d5c0d2]{top:40px;left:0;bottom:0;right:0;position:absolute}.companyNodeDataList[data-v-49d5c0d2]{width:280px;position:absolute;left:0;padding:10px;top:0;bottom:0;overflow:auto}.roleMenuList[data-v-49d5c0d2]{position:absolute;left:300px;top:0;padding-left:15px;padding-right:10px;padding-top:15px;right:0;bottom:0;overflow:auto;border-left:1px solid #eee}.roleMenuList .nodeRoleSubmit[data-v-49d5c0d2]{position:absolute;bottom:0;height:50px;background:#eee;z-index:99;left:0;right:0}.roleMenuList .nodeRoleSubmit button[data-v-49d5c0d2]{margin-top:5px;margin-left:5px}", ""]);

// exports


/***/ }),

/***/ 823:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"nodeRoleBox"},[_c('div',{staticClass:"companyNodeDataList"},[_c('el-scrollbar',[_c('el-tree',{ref:"tree",attrs:{"node-key":"or_id","data":_vm.companyNodeData,"default-expand-all":true,"expand-on-click-node":false},on:{"node-click":_vm.nodeClick}})],1)],1),_vm._v(" "),_c('div',{staticClass:"roleMenuList"},[_c('el-transfer',{attrs:{"data":_vm.roleData,"props":{
                key   : 'or_id',
                label : 'or_name'
            },"titles":['所有角色', '当前角色']},model:{value:(_vm.nowRoleData),callback:function ($$v) {_vm.nowRoleData=$$v},expression:"nowRoleData"}}),_vm._v(" "),_c('div',{staticClass:"nodeRoleSubmit"},[_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.nodeRoleForm}},[_vm._v("将角色分配给节点")])],1)],1)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});