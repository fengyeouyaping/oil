webpackJsonp([16],{

/***/ 389:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_menuActionManager_vue__ = __webpack_require__(674);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_menuActionManager_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_menuActionManager_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_menuActionManager_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_menuActionManager_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7e8eeb1f_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_menuActionManager_vue__ = __webpack_require__(858);
function injectStyle (ssrContext) {
  __webpack_require__(856)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-7e8eeb1f"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_menuActionManager_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_7e8eeb1f_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_menuActionManager_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 674:
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

var _vuex = __webpack_require__(9);

exports.default = {
    //数据源
    data: function data() {
        return {
            nowMenuId: 0 //当前操作的菜单ID
        };
    },

    //初始化函数
    mounted: function mounted() {
        var _this = this;

        this.$myLoading.startLoading();

        //获取菜单
        this.$http.getHttp(this.$API.menuSearch + "/skip/0/limit/1000", function (rs) {

            _this['MenuActionManagerModule/updateMenuData'](_this.$common.arrayReorganization(rs.data));

            //获取所有操作信息
            _this.$http.getHttp(_this.$API.systemApiSearchApiDocsMenu + "/type/0", function (rs) {

                _this.$myLoading.endLoading();
                _this['MenuActionManagerModule/updateActionData'](rs.categoryArr);
            });
        });
    },

    //计算属性
    computed: _extends({}, (0, _vuex.mapState)({
        menuData: function menuData(state) {
            return state.MenuActionManagerModule.menuData;
        },
        actionData: function actionData(state) {
            return state.MenuActionManagerModule.actionData;
        },
        nowActionData: function nowActionData(state) {
            return state.MenuActionManagerModule.nowActionData;
        }
    })),
    //组件方法
    methods: _extends({}, (0, _vuex.mapMutations)(['updateMenuData', 'MenuActionManagerModule/updateMenuData']), (0, _vuex.mapMutations)(['updateActionData', 'MenuActionManagerModule/updateActionData']), (0, _vuex.mapMutations)(['updateNowActionData', 'MenuActionManagerModule/updateNowActionData']), (0, _vuex.mapMutations)(['addNowActionData', 'MenuActionManagerModule/addNowActionData']), (0, _vuex.mapMutations)(['removeNowActionData', 'MenuActionManagerModule/removeNowActionData']), {

        //点击菜单节点时
        nodeClick: function nodeClick(data, checkData) {
            var _this2 = this;

            //判断是否为三级菜单
            if (data.m_level < 2) {
                return;
            }

            //获取当前菜单ID
            var menuId = data.m_id;

            //保存当前要操作的菜单
            this.nowMenuId = menuId;

            var params = {
                fields: "ap_id,ap_name,ap_api"

                //获取当前菜单所拥有的操作
            };this.$myLoading.startLoading();
            this.$http.postHttp(this.$API.menuMenuActionPermissionsInfoSearch + "/m_id/" + menuId + "/skip/0/limit/1000", params, function (rs) {

                _this2.$myLoading.endLoading();
                _this2['MenuActionManagerModule/updateNowActionData'](rs.data);
            });
        },
        actionMenuForm: function actionMenuForm() {
            var _this3 = this;

            //判断是否选择了菜单
            if (this.nowMenuId == 0) {
                this.$myPop.WarningMessage("请选择要分配操作的菜单");
                return;
            }

            var params = {
                menuId: this.nowMenuId,
                actionData: this.nowActionData

                //获取当前菜单所拥有的操作
            };this.$myLoading.startLoading();
            this.$http.postHttp(this.$API.systemApiAddMenuToAction, params, function (rs) {

                _this3.$myLoading.endLoading();
                _this3.$myPop.SuccessMessage();
            });
        },


        //减少操作
        removeActionClick: function removeActionClick(index) {

            this['MenuActionManagerModule/removeNowActionData'](index);
        },


        //新增操作
        addActionClick: function addActionClick(item) {

            //判断是否选择了菜单
            if (this.nowMenuId == 0) {
                this.$myPop.WarningMessage("请选择要分配操作的菜单");
                return;
            }

            //判断当前所拥有的操作中是否包含该操作
            var isIn = this.nowActionData.find(function (data) {
                return data.ap_id == item.ap_id;
            });

            //没有找到该操作，进行添加操作
            if (isIn == undefined) {

                var addAction = {
                    ap_id: item.ap_id,
                    ap_name: item.ap_name,
                    ap_api: item.ap_api
                };

                this['MenuActionManagerModule/addNowActionData'](addAction);
            } else {

                this.$myPop.WarningMessage("该菜单已包含该操作");
            }
        },


        //点击分类菜单
        actionCategoryClick: function actionCategoryClick(item) {
            item.isShow = !item.isShow;
        }
    })
};

/***/ }),

/***/ 856:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(857);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("61dfbe6f", content, true, {});

/***/ }),

/***/ 857:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".menuActionBox[data-v-7e8eeb1f]{top:40px;left:0;bottom:0;right:0;position:absolute}.companyNodeDataList[data-v-7e8eeb1f]{width:280px;position:absolute;left:0;padding:10px;top:0;bottom:0;overflow:auto}.menuActionContent[data-v-7e8eeb1f]{position:absolute;left:300px;top:0;right:0;bottom:0;overflow:auto;border-left:1px solid #eee}.menuActionContent .menuActionContentBox[data-v-7e8eeb1f]{width:100%;left:0;right:0;bottom:50px;position:absolute;top:0}.menuActionContent .menuActionSubmit[data-v-7e8eeb1f]{bottom:0;left:0;right:0;height:50px;position:absolute;background:#eee}.menuActionContent .menuActionSubmit button[data-v-7e8eeb1f]{margin-top:5px;margin-left:5px}.menuActionContent .nowMenuActionBox[data-v-7e8eeb1f]{width:40.88%;height:100%;overflow:auto;float:left;border-right:1px solid #eee}.menuActionContent .nowMenuActionBox p[data-v-7e8eeb1f]{padding:12px}.menuActionContent .nowMenuActionBox .nowActionItem[data-v-7e8eeb1f]{width:100%;height:40px;text-indent:15px;line-height:40px;border-bottom:1px solid #eee}.menuActionContent .nowMenuActionBox .nowActionItem i[data-v-7e8eeb1f]{position:relative;float:right;margin-right:10px;margin-top:13px;color:red;cursor:pointer}.menuActionContent .nowMenuActionBox .nowActionItem[data-v-7e8eeb1f]:hover{background:#eee}.menuActionContent .allMenuActionBox[data-v-7e8eeb1f]{width:59%;overflow:auto;height:100%;float:right}.menuActionContent .actionAllTitle[data-v-7e8eeb1f]{width:100%;line-height:30px;text-indent:15px;background:#ccc;font-weight:700;height:30px}.menuActionContent .actionCategoryBox[data-v-7e8eeb1f]{width:100%;height:40px;background:#333;border-bottom:1px solid #fff;color:#fff;text-indent:15px;cursor:pointer;line-height:40px}.menuActionContent .actionItem[data-v-7e8eeb1f]{width:100%;height:40px;text-indent:15px;line-height:40px;background:#fff;border-bottom:1px solid #eee}.menuActionContent .actionItem .actionTextContent[data-v-7e8eeb1f]{width:90%;float:left}.menuActionContent .actionItem i[data-v-7e8eeb1f]{position:relative;float:right;margin-right:10px;margin-top:13px;color:green;cursor:pointer}.menuActionContent .actionItem[data-v-7e8eeb1f]:hover{background:#eee}", ""]);

// exports


/***/ }),

/***/ 858:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"menuActionBox"},[_c('div',{staticClass:"companyNodeDataList"},[_c('el-scrollbar',[_c('el-tree',{ref:"tree",attrs:{"node-key":"or_id","data":_vm.menuData,"default-expand-all":true,"expand-on-click-node":false},on:{"node-click":_vm.nodeClick}})],1)],1),_vm._v(" "),_c('div',{staticClass:"menuActionContent"},[_c('div',{staticClass:"menuActionContentBox"},[_c('div',{staticClass:"nowMenuActionBox"},[(_vm.nowActionData.length <= 0)?_c('p',[_vm._v("该菜单暂未分配操作")]):_vm._e(),_vm._v(" "),(_vm.nowActionData.length > 0)?_c('div',{staticClass:"actionAllTitle"},[_vm._v("当前操作")]):_vm._e(),_vm._v(" "),_vm._l((_vm.nowActionData),function(nowActionItem,index){return _c('div',{key:index,staticClass:"nowActionItem"},[_vm._v(_vm._s(nowActionItem.ap_name)),_c('i',{staticClass:"fa fa-lg fa-minus-circle",on:{"click":function($event){_vm.removeActionClick(index)}}})])})],2),_vm._v(" "),_c('div',{staticClass:"allMenuActionBox"},[_c('div',{staticClass:"actionAllTitle"},[_vm._v("全部操作")]),_vm._v(" "),_vm._l((_vm.actionData),function(actionCategoryItem){return [_c('div',{staticClass:"actionCategoryBox",on:{"click":function($event){_vm.actionCategoryClick(actionCategoryItem)}}},[_vm._v(_vm._s(actionCategoryItem.apc_name))]),_vm._v(" "),_c('el-collapse-transition',[(actionCategoryItem.isShow)?_c('div',_vm._l((actionCategoryItem.apiList),function(actionItem){return _c('div',{staticClass:"actionItem"},[_c('div',{staticClass:"actionTextContent contentEllipsis"},[_c('b',[_vm._v(_vm._s(actionItem.ap_id))]),_vm._v("： "+_vm._s(actionItem.ap_name)+" "),_c('span',{staticStyle:{"color":"#999"}},[_vm._v("[ "+_vm._s(actionItem.ap_api)+" ]")])]),_vm._v(" "),_c('i',{staticClass:"fa fa-lg fa-plus-circle",on:{"click":function($event){_vm.addActionClick(actionItem)}}})])})):_vm._e()])]})],2)]),_vm._v(" "),_c('div',{staticClass:"menuActionSubmit"},[_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.actionMenuForm}},[_vm._v("确认将选中操作分配给该菜单")])],1)])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});