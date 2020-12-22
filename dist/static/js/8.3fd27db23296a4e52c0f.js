webpackJsonp([8],{

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_roleMenuManager_vue__ = __webpack_require__(639);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_roleMenuManager_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_roleMenuManager_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_roleMenuManager_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_roleMenuManager_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1683e6d1_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_roleMenuManager_vue__ = __webpack_require__(787);
function injectStyle (ssrContext) {
  __webpack_require__(785)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-1683e6d1"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_roleMenuManager_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1683e6d1_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_roleMenuManager_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 639:
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

var _vuex = __webpack_require__(9);

exports.default = {
    //数据源
    data: function data() {
        return {
            nowSelectedActionMenuId: 0, //当前所选操作的菜单
            parentId: [], //保存选中节点的父节点数组
            nowNodeData: [], //当前所选中的节点数组
            originalMenuData: [], //未经过树形转化的菜单数据
            nowRoleId: 0, //当前所选的角色
            nowMenuIds: [] //当前所选角色的菜单
        };
    },

    //初始化函数
    mounted: function mounted() {

        this.initData();
    },

    //计算属性
    computed: _extends({}, (0, _vuex.mapState)({

        roleData: function roleData(state) {
            return state.RoleMenuManagerModule.roleData;
        },
        actionData: function actionData(state) {
            return state.RoleMenuManagerModule.actionData;
        },
        menuData: function menuData(state) {
            return state.RoleMenuManagerModule.menuData;
        },
        selectMenuIds: function selectMenuIds(state) {
            return state.RoleMenuManagerModule.selectMenuIds;
        },
        nowMenuData: function nowMenuData(state) {
            return state.RoleMenuManagerModule.nowMenuData;
        }

    })),
    //组件方法
    methods: _extends({}, (0, _vuex.mapMutations)(['updateRoleData', 'RoleMenuManagerModule/updateRoleData']), (0, _vuex.mapMutations)(['updateActionData', 'RoleMenuManagerModule/updateActionData']), (0, _vuex.mapMutations)(['updateMenuData', 'RoleMenuManagerModule/updateMenuData']), (0, _vuex.mapMutations)(['updateSelectMenuIdsData', 'RoleMenuManagerModule/updateSelectMenuIdsData']), (0, _vuex.mapMutations)(['updateNowMenuData', 'RoleMenuManagerModule/updateNowMenuData']), (0, _vuex.mapMutations)(['updateRoleSelectedData', 'RoleMenuManagerModule/updateRoleSelectedData']), {
        //初始化
        initData: function initData() {
            var _this = this;

            //获取角色列表信息
            this.$myLoading.startLoading();
            this.$http.getHttp(this.$API.organizationalRoleSearch + "/no/or_is_all-1/skip/0/limit/1000", function (rs) {

                //新增角色选中操作属性
                rs.data.forEach(function (item) {
                    item.isSelected = false;
                });

                //更新角色列表
                _this['RoleMenuManagerModule/updateRoleData'](rs.data);
                _this.$http.getHttp(_this.$API.menuSearch + "/skip/0/limit/1000", function (rs) {

                    _this.$myLoading.endLoading();
                    _this.originalMenuData = rs.data;
                    _this['RoleMenuManagerModule/updateMenuData'](_this.$common.arrayReorganization(rs.data));
                });
            });
        },

        //节点选择时
        nodeCheck: function nodeCheck(data, checkData) {

            //获取当前选中的节点
            var mId = data.m_id;

            //查看是新增选中还是删除选中
            if (this.nowNodeData.indexOf(mId) != -1) {

                //删除节点
                this.removeChildNode(mId);

                //如无同胞节点则删除父节点
                this.removeParentNode(mId);

                this.$refs.tree.setCheckedKeys(this.nowNodeData);
            } else {

                //清空父节点存储数组    
                this.parentId = [];

                this.getParentNode(mId);

                this.getChildNode(mId);

                this.parentId.push(mId);

                this.nowNodeData = [];

                this.nowNodeData = this.$_.union(this.parentId, checkData.checkedKeys);

                this.$refs.tree.setCheckedKeys(this.nowNodeData);
            }
        },


        //判断同级是否有被选中的菜单
        removeParentNode: function removeParentNode(mid) {

            var nowFid = 0;

            //获取当前选中菜单的父菜单ID
            for (var i = 0; i < this.originalMenuData.length; i++) {

                if (this.originalMenuData[i].m_id == mid) {

                    nowFid = this.originalMenuData[i].m_fid;

                    break;
                }
            }

            //查看当前所选中的菜单中是否有和当前选择的父ID相同的
            for (var i = 0; i < this.nowNodeData.length; i++) {

                for (var k = 0; k < this.originalMenuData.length; k++) {

                    if (this.nowNodeData[i] == this.originalMenuData[k].m_id && this.originalMenuData[k].m_id != mid) {

                        var tempFid = this.originalMenuData[k].m_fid;

                        if (nowFid == tempFid) {

                            return true;
                        }
                    }
                }
            }

            this.$_.remove(this.nowNodeData, function (item) {
                return item == nowFid;
            });

            return false;
        },


        //删除的子节点
        removeChildNode: function removeChildNode(mid, isRemove) {

            //查看删除的菜单是否有子菜单
            for (var i = 0; i < this.originalMenuData.length; i++) {

                if (this.originalMenuData[i].m_id == mid) {

                    var childNode = this.originalMenuData[i].children;

                    //有子菜单
                    if (childNode != undefined && childNode.length > 0) {

                        //循环删除子菜单项 
                        for (var k = 0; k < childNode.length; k++) {

                            //循环从现有菜单中删除子菜单
                            this.$_.remove(this.nowNodeData, function (item) {
                                return item == childNode[k].m_id;
                            });

                            this.removeChildNode(childNode[k].m_id);
                        }
                    } else {

                        //循环从现有菜单中删除子菜单
                        this.$_.remove(this.nowNodeData, function (item) {
                            return item == mid;
                        });

                        break;
                    }
                }
            }

            //删除自身节点
            this.$_.remove(this.nowNodeData, function (item) {
                return item == mid;
            });
        },


        //获取所有子节点ID
        getChildNode: function getChildNode(mid) {

            //查看删除的菜单是否有子菜单
            for (var i = 0; i < this.originalMenuData.length; i++) {

                if (this.originalMenuData[i].m_id == mid) {

                    var childNode = this.originalMenuData[i].children;

                    //有子菜单
                    if (childNode != undefined && childNode.length > 0) {

                        //循环删除子菜单项 
                        for (var k = 0; k < childNode.length; k++) {

                            this.parentId.push(childNode[k].m_id);

                            this.getChildNode(childNode[k].m_id);
                        }
                    } else {

                        this.parentId.push(mid);

                        break;
                    }
                }
            }
        },


        //获取所有父节点ID
        getParentNode: function getParentNode(mid) {

            //是否继续执行递归
            var isRecursive = false;

            //递归时的mid
            var newMid = 0;

            for (var i = 0; i < this.originalMenuData.length; i++) {

                if (this.originalMenuData[i].m_id == mid) {

                    if (this.originalMenuData[i].m_fid != 0) {

                        this.parentId.push(this.originalMenuData[i].m_fid);

                        newMid = this.originalMenuData[i].m_fid;

                        isRecursive = true;
                    }

                    break;
                }
            }

            if (isRecursive) {
                this.getParentNode(newMid);
            }
        },


        //选择操作
        selectAction: function selectAction(item) {
            var _this2 = this;

            //获取当前选中的菜单ID
            var menuId = item.m_id;

            //保存当前选择操作的菜单
            this.nowSelectedActionMenuId = menuId;

            //根据选中的菜单ID获取当前菜单所拥有的操作
            var selectNowMenuData = this.nowMenuData.filter(function (item) {
                return item.m_id == menuId;
            });

            //当前菜单所拥有的操作
            var apids = [];

            if (selectNowMenuData.length > 0) {
                if (selectNowMenuData[0].rmm_apids) {
                    apids = selectNowMenuData[0].rmm_apids.split(",");
                }
            }

            //通过所选菜单获取操作权限
            this.$myLoading.startLoading();
            this.$http.getHttp(this.$API.menuMenuActionPermissionsInfoSearch + "/m_id/" + item.m_id + "/skip/0/limit/1000", function (rs) {

                _this2.$myLoading.endLoading();

                //设置选中状态
                rs.data.forEach(function (item) {
                    if (apids.indexOf(item.ap_id) > -1) {
                        item.isChecked = true;
                    } else {
                        item.isChecked = false;
                    }
                });

                _this2['RoleMenuManagerModule/updateActionData'](rs.data);
            });
        },


        //操作分配菜单
        actionMenuForm: function actionMenuForm() {
            var _this3 = this;

            if (this.nowRoleId == 0) {
                this.$myPop.WarningMessage("请选择要分配权限的角色");
                return;
            }

            if (this.nowSelectedActionMenuId == 0) {
                this.$myPop.WarningMessage("请选择要分配操作的菜单");
                return;
            }

            if (this.actionData <= 0) {
                this.$myPop.WarningMessage("该菜单下无可分配的操作");
                return;
            }

            //获取选中的操作ID
            var actionIds = "";
            this.actionData.forEach(function (item) {

                if (item.isChecked) {
                    actionIds += item.ap_id + ",";
                }
            });

            var updateParams = {
                "update_where": "rmm_orid,rmm_mid",
                "rmm_orid": this.nowRoleId,
                "rmm_mid": this.nowSelectedActionMenuId,
                "rmm_apids": this.$common.deleteLastStr(actionIds)
            };

            this.$myLoading.startLoading();
            this.$http.postHttp(this.$API.roleMenuMiddleUpdate, updateParams, function (rs) {
                _this3.$myLoading.endLoading();
                _this3.$myPop.SuccessMessage();
            });
        },


        //菜单分配角色    
        roleMenuForm: function roleMenuForm() {
            var _this4 = this;

            if (this.nowRoleId == 0) {
                this.$myPop.WarningMessage("请选择要分配权限的角色");
                return;
            }

            //获取当前角色所选菜单
            this.nowMenuIds = this.$refs.tree.getCheckedNodes(false, true);

            if (this.nowMenuIds.length <= 0) {

                var deleteParams = {
                    delete_where: "rmm_orid",
                    rmm_orid: this.nowRoleId,
                    isPhysicallyDelete: 1
                };

                this.$myLoading.startLoading();
                this.$http.postHttp(this.$API.roleMenuMiddleDelete, deleteParams, function (rs) {
                    _this4.$myLoading.endLoading();
                    _this4.$myPop.SuccessMessage();
                });
            } else {

                //构建请求参数
                var addParams = {};

                addParams.roleId = this.nowRoleId;
                addParams.roleMenuData = [];
                this.nowMenuIds.forEach(function (item) {
                    addParams.roleMenuData.push({
                        menuId: item.m_id,
                        actionIds: item.m_action_ids
                    });
                });

                //将所选菜单写入角色
                this.$myLoading.startLoading();
                this.$http.postHttp(this.$API.systemApiAddMenuToRole, addParams, function (rs) {
                    _this4.$myLoading.endLoading();
                    _this4.$myPop.SuccessMessage();
                });
            }
        },


        //选择角色
        selectRoleClick: function selectRoleClick(item, index) {
            var _this5 = this;

            this['RoleMenuManagerModule/updateRoleSelectedData'](index);

            this['RoleMenuManagerModule/updateActionData']([]);

            //获取当前选择的角色
            this.nowRoleId = item.or_id;

            //选中当前角色
            item.isSelected = true;

            //获取角色所拥有的菜单以及操作权限
            this.$myLoading.startLoading();
            this.$http.getHttp(this.$API.roleRoleMenuInfoSearch + "/rmm_orid/" + item.or_id + "/skip/0/limit/1000", function (rs) {

                _this5.$myLoading.endLoading();
                _this5.$refs.tree.setCheckedNodes(rs.data);

                //更新菜单列表
                _this5['RoleMenuManagerModule/updateNowMenuData'](rs.data);
            });
        }
    })
};

/***/ }),

/***/ 785:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(786);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("2b466d66", content, true, {});

/***/ }),

/***/ 786:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".custom-tree-node[data-v-1683e6d1]{-webkit-box-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;font-size:14px;padding-right:8px}.roleMenuManagerBox[data-v-1683e6d1]{top:40px;left:0;bottom:0;right:0;position:absolute}.roleMenuManagerBox .roleMenuList[data-v-1683e6d1]{width:200px;height:100%;overflow:auto;float:left;border-right:1px solid #eee}.roleMenuManagerBox .roleMenuList .roleMenuTitle[data-v-1683e6d1]{width:100%;height:40px;line-height:40px;text-indent:12px;color:#fff;background:#666}.roleMenuManagerBox .roleMenuList .roleMenuItem[data-v-1683e6d1]{width:100%;height:40px;background:#fff;line-height:40px;text-indent:10px;border-bottom:1px solid #eee;position:relative}.roleMenuManagerBox .roleMenuList .roleMenuItem i[data-v-1683e6d1]{font-size:18px;position:absolute;top:9px;color:#409eff;right:10px}.roleMenuManagerBox .roleMenuList .roleMenuItem[data-v-1683e6d1]:hover{background:#eee;cursor:pointer}.roleMenuManagerBox .roleMenuContent[data-v-1683e6d1]{position:absolute;width:400px;left:202px;top:5px;right:0;bottom:0;overflow:auto;padding-bottom:5px}.roleMenuManagerBox .roleMenuContent .roleMenuTreeBox[data-v-1683e6d1]{position:absolute;top:0;left:0;right:0;bottom:50px;overflow:auto}.roleMenuManagerBox .roleActionContent[data-v-1683e6d1]{position:absolute;left:612px;top:0;right:10px;bottom:0;overflow:auto;padding-bottom:5px;border-left:1px solid #eee;padding-left:15px;padding-top:10px}.roleMenuManagerBox .roleActionContent .roleActionBox[data-v-1683e6d1]{position:absolute;top:0;left:0;right:0;bottom:50px;padding:10px;overflow:auto}.roleMenuManagerBox .roleActionContent .roleActionItem[data-v-1683e6d1]{width:100%;height:auto;float:left;margin-bottom:10px;border-bottom:1px solid #eee;padding-bottom:5px}.roleMenuManagerBox .roleActionContent .roleActionItem p[data-v-1683e6d1]{margin-top:5px;color:#999}.roleMenuManagerBox .roleActionSubmit[data-v-1683e6d1]{position:absolute;bottom:0;left:0;right:0;height:50px}.roleMenuManagerBox .roleActionSubmit button[data-v-1683e6d1]{margin-top:5px;margin-left:7px}", ""]);

// exports


/***/ }),

/***/ 787:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"roleMenuManagerBox"},[_c('div',{staticClass:"roleMenuList"},[_c('div',{staticClass:"roleMenuTitle"},[_vm._v("所有角色")]),_vm._v(" "),_vm._l((_vm.roleData),function(roleItem,index){return _c('div',{key:roleItem.or_id,staticClass:"roleMenuItem",on:{"click":function($event){_vm.selectRoleClick(roleItem,index)}}},[_vm._v(_vm._s(roleItem.or_name)),(roleItem.isSelected)?_c('i',{staticClass:"el-icon-circle-check"}):_vm._e()])})],2),_vm._v(" "),_c('div',{staticClass:"roleMenuContent"},[_c('div',{staticClass:"roleMenuTreeBox"},[_c('el-scrollbar',[(_vm.nowRoleId <= 0)?_c('p',{staticStyle:{"padding":"5px","padding-left":"10px","color":"#999"}},[_vm._v("无菜单信息")]):_vm._e(),_vm._v(" "),(_vm.nowRoleId > 0)?_c('el-tree',{ref:"tree",attrs:{"data":_vm.menuData,"check-strictly":true,"expand-on-click-node":false,"default-checked-keys":_vm.selectMenuIds,"show-checkbox":"","node-key":"m_id"},on:{"check":_vm.nodeCheck},scopedSlots:_vm._u([{key:"default",fn:function(ref){
var node = ref.node;
var data = ref.data;
return _c('span',{staticClass:"custom-tree-node"},[_c('span',[_vm._v(_vm._s(node.label))]),_vm._v(" "),(node.level == 3 || node.level == 4)?_c('span',[_c('el-button',{attrs:{"type":"text","size":"mini"},on:{"click":function () { return _vm.selectAction(data); }}},[_vm._v("\n                        选择操作\n                    ")])],1):_vm._e()])}}])}):_vm._e()],1)],1),_vm._v(" "),_c('div',{staticClass:"roleActionSubmit"},[_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.roleMenuForm}},[_vm._v("确认将选中菜单分配给该角色")])],1)]),_vm._v(" "),_c('div',{staticClass:"roleActionContent"},[_c('div',{staticClass:"roleActionBox"},[(_vm.actionData.length <= 0)?_c('p',{staticStyle:{"color":"#999"}},[_vm._v("无操作信息")]):_vm._e(),_vm._v(" "),_vm._l((_vm.actionData),function(actionItem){return _c('div',{key:actionItem.ap_id,staticClass:"roleActionItem"},[_c('el-checkbox',{model:{value:(actionItem.isChecked),callback:function ($$v) {_vm.$set(actionItem, "isChecked", $$v)},expression:"actionItem.isChecked"}},[_vm._v(_vm._s(actionItem.ap_name)+" "+_vm._s(actionItem.ap_api))]),_vm._v(" "),_c('p',[_vm._v(_vm._s(actionItem.ap_desc))])],1)})],2),_vm._v(" "),_c('div',{staticClass:"roleActionSubmit"},[_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.actionMenuForm}},[_vm._v("确认将选中操作分配给该菜单")])],1)])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});