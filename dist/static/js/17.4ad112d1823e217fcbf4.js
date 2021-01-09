webpackJsonp([17],{

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_listMenu_vue__ = __webpack_require__(657);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_listMenu_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_listMenu_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_listMenu_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_listMenu_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6ad08a7a_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_listMenu_vue__ = __webpack_require__(807);
function injectStyle (ssrContext) {
  __webpack_require__(805)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-6ad08a7a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_listMenu_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6ad08a7a_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_listMenu_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 657:
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
    mounted: function mounted() {

        //获取菜单列表信息
        this.initMenuData();
    },

    computed: _extends({}, (0, _vuex.mapState)({
        menuData: function menuData(state) {
            return state.MenuListModule.menuData;
        }
    }), {
        nodeData: function nodeData() {
            return this.nodeDataArr;
        }
    }),
    methods: _extends({}, (0, _vuex.mapMutations)(['updateOrganziational', 'MenuListModule/updateOrganziational']), (0, _vuex.mapMutations)(['updateMenuData', 'MenuListModule/updateMenuData']), {

        //编辑菜单
        handleEdit: function handleEdit(m_id) {

            this.$router.push({
                path: "/editMenu",
                query: {
                    m_id: m_id
                }
            });
        },
        initMenuData: function initMenuData() {
            var _this = this;

            //获取菜单列表信息
            this.$myLoading.startLoading();
            this.$http.getHttp(this.$API.menuSearch + "/skip/0/limit/1000", function (rs) {
                _this.$myLoading.endLoading();
                _this['MenuListModule/updateMenuData'](rs.data);
                _this.getNodeData(0, 0);
            });
        },
        refreshData: function refreshData() {
            this.initMenuData();
        },
        getNodeData: function getNodeData(m_fid) {
            var _this2 = this;

            if (m_fid == 0) {

                this.lastFid = -1;
            } else {

                //根据当前节点查询父节点ID
                this.menuData.forEach(function (item) {

                    if (item.m_id == m_fid) {
                        _this2.lastFid = item.m_fid;
                        return;
                    }
                });
            }

            //筛选满足条件的节点信息
            this.nodeDataArr = this.menuData.filter(function (item) {
                return item.m_fid == m_fid;
            });
        },
        goBackNode: function goBackNode() {
            if (this.lastFid == -1) {
                this.$myPop.WarningMessage("该节点已经是根菜单了，无法继续返回");
                return;
            }
            this.getNodeData(this.lastFid);
        },
        handleDelete: function handleDelete(index, item) {
            var _this3 = this;

            this.$myPop.confirmBox("删除提示", "确定要删除该菜单吗？", function () {

                var params = {
                    menuid: item.m_id
                };

                _this3.$myLoading.startLoading();
                _this3.$http.postHttp(_this3.$API.systemApiRemoveMenu, params, function (rs) {
                    _this3.$myLoading.endLoading();
                    _this3.$myPop.SuccessMessage();
                    _this3.initMenuData();
                });
            });
        },
        menuLevelFormatter: function menuLevelFormatter(row, column, cellValue, index) {
            if (cellValue == 0) {
                return "一级菜单";
            } else if (cellValue == 1) {
                return "二级菜单";
            } else if (cellValue == 2) {
                return "三级菜单";
            } else {
                return "其他菜单";
            }
        },
        menuTypeFormatter: function menuTypeFormatter(row, column, cellValue, index) {
            if (cellValue == 0) {
                return "系统模块菜单";
            } else if (cellValue == 1) {
                return "扩展模块菜单";
            } else {
                return "业务模块菜单";
            }
        }
    }),
    data: function data() {
        return {
            currentPage: "",
            nodeDataArr: [],
            skip: 0,
            lastFid: 0
        };
    }
};

/***/ }),

/***/ 805:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(806);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("34c8fec2", content, true, {});

/***/ }),

/***/ 806:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "@import url(\"\");.tableHeader[data-v-6ad08a7a]{width:100%;height:40px;line-height:40px;border-bottom:1px solid #eee}.tableHeader .tableHeaderTitle[data-v-6ad08a7a]{width:auto;height:16px;line-height:16px;float:left;margin-top:12px;font-size:15px;padding-left:10px;border-left:3px solid #88b7e0}.tableHeader .tableHeaderMenu[data-v-6ad08a7a]{width:200px;height:40px;float:right;text-align:right}.tableBottomMenu[data-v-6ad08a7a]{height:64px;padding-top:8px}", ""]);

// exports


/***/ }),

/***/ 807:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"tableHeader"},[_c('div',{staticClass:"tableHeaderTitle"},[_vm._v("菜单列表")]),_vm._v(" "),_c('div',{staticClass:"tableHeaderMenu"},[_c('el-button-group',[_c('el-button',{attrs:{"icon":"el-icon-arrow-left","size":"mini"},on:{"click":_vm.goBackNode}}),_vm._v(" "),_c('el-button',{attrs:{"icon":"el-icon-refresh","size":"mini"},on:{"click":_vm.refreshData}})],1)],1)]),_vm._v(" "),_c('el-table',{ref:"multipleTable",staticStyle:{"width":"100%"},attrs:{"data":_vm.nodeData,"tooltip-effect":"dark"}},[_c('el-table-column',{attrs:{"prop":"m_id","label":"菜单ID","width":"80"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"m_name","label":"菜单名称"}}),_vm._v(" "),_c('el-table-column',{attrs:{"formatter":_vm.menuTypeFormatter,"prop":"m_type","label":"菜单类型"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"m_url","label":"菜单地址"}}),_vm._v(" "),_c('el-table-column',{attrs:{"formatter":_vm.menuLevelFormatter,"prop":"m_level","label":"菜单级别"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作","fixed":"right","width":"260"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('el-button',{attrs:{"size":"mini"},on:{"click":function($event){_vm.getNodeData(scope.row.m_id)}}},[_vm._v("查看子菜单")]),_vm._v(" "),_c('el-button',{attrs:{"size":"mini"},on:{"click":function($event){_vm.handleEdit(scope.row.m_id)}}},[_vm._v("编辑")]),_vm._v(" "),_c('el-button',{attrs:{"size":"mini","type":"danger"},on:{"click":function($event){_vm.handleDelete(scope.$index, scope.row)}}},[_vm._v("删除")])]}}])})],1),_vm._v(" "),_c('el-row',[_c('el-col',{attrs:{"span":12}})],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});