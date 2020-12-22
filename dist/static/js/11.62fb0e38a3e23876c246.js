webpackJsonp([11],{

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_OrganizationalStructureList_vue__ = __webpack_require__(633);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_OrganizationalStructureList_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_OrganizationalStructureList_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_OrganizationalStructureList_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_OrganizationalStructureList_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_60962bb8_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_OrganizationalStructureList_vue__ = __webpack_require__(769);
function injectStyle (ssrContext) {
  __webpack_require__(767)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-60962bb8"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_OrganizationalStructureList_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_60962bb8_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_OrganizationalStructureList_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 633:
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

var _vuex = __webpack_require__(9);

exports.default = {
  mounted: function mounted() {
    this.initNodeData();
  },

  computed: _extends({}, (0, _vuex.mapState)({
    organizationalData: function organizationalData(state) {
      return state.OrganizationStructureListModule.organizationalData;
    }
  }), {
    nodeData: function nodeData() {
      return this.nodeDataArr;
    }
  }),
  methods: _extends({}, (0, _vuex.mapMutations)(["updateOrganziational", "OrganizationStructureListModule/updateOrganziational"]), {
    inheritFormatter: function inheritFormatter(row, column, cellValue, index) {
      return cellValue == 0 ? "否" : "是";
    },


    //编辑组织架构
    handleEdit: function handleEdit(index, item) {

      this.$router.push({
        path: "/editOrganizationalStructure",
        query: {
          os_id: item.os_id
        }
      });
    },
    getNodeData: function getNodeData(fid) {
      var _this = this;

      if (fid == 0) {
        this.lastFid = -1;
      } else {
        //根据当前节点查询父节点ID
        this.organizationalData.forEach(function (item) {
          if (item.os_id == fid) {
            _this.lastFid = item.os_fid;
            return;
          }
        });
      }

      //筛选满足条件的节点信息
      this.nodeDataArr = this.organizationalData.filter(function (item) {
        return item.os_fid == fid;
      });
    },
    goBackNode: function goBackNode() {
      if (this.lastFid == -1) {
        this.$myPop.WarningMessage("该节点已经是根节点了，无法继续返回");
        return;
      }
      this.getNodeData(this.lastFid);
    },
    initNodeData: function initNodeData() {
      var _this2 = this;

      //获取组织架构数据
      this.$myLoading.startLoading();
      this.$http.getHttp(this.$API.organizationalStructureSearch + "/skip/" + this.skip + "/limit/1000", function (rs) {
        _this2.$myLoading.endLoading();
        _this2["OrganizationStructureListModule/updateOrganziational"](rs.data);
        _this2.getNodeData(0, 0);
      });
    },
    handleDelete: function handleDelete(index, item) {
      var _this3 = this;

      this.$myPop.confirmBox("删除提示", "确定要删除该节点吗？", function () {

        var params = {
          osid: item.os_id
        };

        _this3.$myLoading.startLoading();
        _this3.$http.postHttp(_this3.$API.systemApiRemoveNode, params, function (rs) {
          _this3.$myPop.SuccessMessage();
          _this3.initNodeData();
        });
      });
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

/***/ 767:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(768);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("2ae35256", content, true, {});

/***/ }),

/***/ 768:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 769:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"tableHeader"},[_c('div',{staticClass:"tableHeaderTitle"},[_vm._v("组织架构列表")]),_vm._v(" "),_c('div',{staticClass:"tableHeaderMenu"},[_c('el-button-group',[_c('el-button',{attrs:{"icon":"el-icon-arrow-left","size":"mini"},on:{"click":_vm.goBackNode}}),_vm._v(" "),_c('el-button',{attrs:{"icon":"el-icon-refresh","size":"mini"}})],1)],1)]),_vm._v(" "),_c('el-table',{ref:"multipleTable",staticStyle:{"width":"100%"},attrs:{"data":_vm.nodeData,"tooltip-effect":"dark"}},[_c('el-table-column',{attrs:{"prop":"os_id","label":"节点ID","width":"80"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"os_name","label":"节点名称"}}),_vm._v(" "),_c('el-table-column',{attrs:{"formatter":_vm.inheritFormatter,"prop":"os_is_inherit","label":"是否继承上级权限"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作","fixed":"right"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('el-button',{attrs:{"size":"mini"},on:{"click":function($event){_vm.getNodeData(scope.row.os_id)}}},[_vm._v("查看子节点")]),_vm._v(" "),_c('el-button',{attrs:{"size":"mini"},on:{"click":function($event){_vm.handleEdit(scope.$index, scope.row)}}},[_vm._v("编辑")]),_vm._v(" "),_c('el-button',{attrs:{"size":"mini","type":"danger"},on:{"click":function($event){_vm.handleDelete(scope.$index, scope.row)}}},[_vm._v("删除")])]}}])})],1),_vm._v(" "),_c('el-row',[_c('el-col',{attrs:{"span":12}})],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});