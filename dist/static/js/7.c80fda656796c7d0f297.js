webpackJsonp([7],{

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_userRoleManagement_vue__ = __webpack_require__(662);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_userRoleManagement_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_userRoleManagement_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_userRoleManagement_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_userRoleManagement_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6b59629c_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_userRoleManagement_vue__ = __webpack_require__(820);
function injectStyle (ssrContext) {
  __webpack_require__(818)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6b59629c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_userRoleManagement_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6b59629c_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_userRoleManagement_vue__["a" /* default */],
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

var _vuex = __webpack_require__(9);

exports.default = {
    //数据源
    data: function data() {
        return {
            nowRoleData: [], //当前节点所拥有的角色
            nowUserId: 0, //当前选中的用户ID
            nowNodeData: {}, //当前选中的用户信息
            otherNodeRoleData: [] //其他要更新节点的参数信息
        };
    },

    //初始化函数
    mounted: function mounted() {
        var _this = this;

        //获取用户列表信息
        this.$myLoading.startLoading();
        this.$http.getHttp(this.$API.userSearch + "/skip/0/limit/1000", function (rs) {

            for (var n in rs.data) {
                rs.data[n].isSelected = false;
            }
            _this['UserRoleManagementModule/getuserData'](rs.data);

            //获取角色列表信息
            _this.$http.getHttp(_this.$API.organizationalRoleSearch + "/no/or_is_all-1/skip/0/limit/1000", function (rs) {
                _this.$myLoading.endLoading();

                for (var _n in rs.data) {
                    rs.data[_n].roleMenu = false;
                }
                _this['UserRoleManagementModule/updateRoleData'](rs.data);
            });
        });
    },

    //计算属性
    computed: _extends({}, (0, _vuex.mapState)({

        userData: function userData(state) {
            return state.UserRoleManagementModule.userData;
        },
        roleData: function roleData(state) {
            return state.UserRoleManagementModule.roleData;
        }

    })),
    //组件方法
    methods: _extends({}, (0, _vuex.mapMutations)(['getuserData', 'UserRoleManagementModule/getuserData']), (0, _vuex.mapMutations)(['updateRoleData', 'UserRoleManagementModule/updateRoleData']), {
        //点击进行分配
        nodeRoleForm: function nodeRoleForm() {
            var _this2 = this;

            if (this.nowUserId == 0) {
                this.$myPop.WarningMessage("请选择要分配角色的节点");
                return;
            }

            var datas = {};
            datas.node_role = [];
            datas.u_id = this.nowUserId;
            for (var n in this.nowRoleData) {
                datas.node_role.push({
                    "urm_orid": this.nowRoleData[n]
                });
            }

            //访问接口，进行分配
            this.$myLoading.startLoading();
            this.$http.postHttp(this.$API.userAllocationRole, datas, function (rs) {
                _this2.$myLoading.endLoading();
                _this2.$myPop.SuccessMessage();
            });
        },

        //选择用户
        selectRoleClick: function selectRoleClick(item, index) {
            var _this3 = this;

            var arr = this.userData;

            arr.map(function (ar) {
                ar.isSelected = false;
                return ar;
            });

            this['UserRoleManagementModule/getuserData'](arr);

            //获取当前选择的用户
            this.nowUserId = item.u_id;

            //选中当前用户
            item.isSelected = true;

            //获取当前用户所拥有的角色信息
            this.$myLoading.startLoading();
            this.$http.getHttp(this.$API.userRoleMiddleSearch + "/urm_uid/" + this.nowUserId + "/skip/0/limit/1000", function (rs) {
                _this3.$myLoading.endLoading();

                var tempRoleArr = [];
                for (var i = 0; i < rs.data.length; i++) {
                    tempRoleArr.push(rs.data[i].urm_orid);
                }

                _this3.nowRoleData = tempRoleArr;
            });
        }
    })
};

/***/ }),

/***/ 818:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(819);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("6f0bfb96", content, true, {});

/***/ }),

/***/ 819:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".nodeRoleBox[data-v-6b59629c]{top:40px;left:0;bottom:0;right:0;position:absolute}.userMenuList[data-v-6b59629c]{width:200px;height:100%;float:left;border-right:1px solid #eee}.userMenuList .userMenuTitle[data-v-6b59629c]{width:100%;height:40px;line-height:40px;text-indent:12px;color:#fff;background:#666}.userMenuList .userMenuItem[data-v-6b59629c]{width:100%;height:40px;background:#fff;line-height:40px;text-indent:10px;border-bottom:1px solid #eee;position:relative}.userMenuList .userMenuItem i[data-v-6b59629c]{font-size:18px;position:absolute;top:9px;color:#409eff;right:10px}.userMenuList .userMenuItem[data-v-6b59629c]:hover{background:#eee;cursor:pointer}.roleMenuList[data-v-6b59629c]{position:absolute;left:200px;top:0;padding-left:15px;padding-right:10px;padding-top:15px;right:0;bottom:0;overflow:auto}.roleMenuList .nodeRoleSubmit[data-v-6b59629c]{position:absolute;bottom:0;height:50px;background:#eee;z-index:99;left:0;right:0}.roleMenuList .nodeRoleSubmit button[data-v-6b59629c]{margin-top:5px;margin-left:5px}", ""]);

// exports


/***/ }),

/***/ 820:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"nodeRoleBox"},[_c('div',{staticClass:"userMenuList"},[_c('div',{staticClass:"userMenuTitle"},[_vm._v("所有用户")]),_vm._v(" "),_vm._l((_vm.userData),function(userItem,index){return _c('div',{key:userItem.u_id,staticClass:"userMenuItem",on:{"click":function($event){_vm.selectRoleClick(userItem,index)}}},[_vm._v(_vm._s(userItem.u_nickname)),(userItem.isSelected)?_c('i',{staticClass:"el-icon-circle-check"}):_vm._e()])})],2),_vm._v(" "),_c('div',{staticClass:"roleMenuList"},[_c('el-transfer',{attrs:{"data":_vm.roleData,"props":{
                key   : 'or_id',
                label : 'or_name'
            },"titles":['所有角色', '当前角色']},model:{value:(_vm.nowRoleData),callback:function ($$v) {_vm.nowRoleData=$$v},expression:"nowRoleData"}}),_vm._v(" "),_c('div',{staticClass:"nodeRoleSubmit"},[_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.nodeRoleForm}},[_vm._v("将角色分配给用户")])],1)],1)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});