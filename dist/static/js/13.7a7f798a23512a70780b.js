webpackJsonp([13],{

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addOrganizationalStructure_vue__ = __webpack_require__(653);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addOrganizationalStructure_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addOrganizationalStructure_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addOrganizationalStructure_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addOrganizationalStructure_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0ce89df6_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_addOrganizationalStructure_vue__ = __webpack_require__(792);
function injectStyle (ssrContext) {
  __webpack_require__(790)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addOrganizationalStructure_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0ce89df6_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_addOrganizationalStructure_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 653:
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


var _vuex = __webpack_require__(9);

exports.default = {
  data: function data() {
    return {
      rules: {
        nodeName: [{ required: true, message: '请输入节点名称', trigger: 'blur' }],
        nameParent: [{ required: true, message: '请选择所属节点', trigger: 'change' }]
      }
    };
  },

  computed: _extends({}, (0, _vuex.mapState)({
    ruleForm: function ruleForm(state) {
      return state.AddOrganizationStructureModule.ruleForm;
    },
    organizationalData: function organizationalData(state) {
      return state.AddOrganizationStructureModule.organizationalData;
    }
  })),
  mounted: function mounted() {

    //获取组织架构信息
    this.initOrganizationData();
  },

  methods: _extends({}, (0, _vuex.mapMutations)(['clearForm', 'AddOrganizationStructureModule/clearForm']), (0, _vuex.mapMutations)(['updateOrganziational', 'AddOrganizationStructureModule/updateOrganziational']), {
    initOrganizationData: function initOrganizationData() {
      var _this = this;

      //获取组织架构信息
      this.$http.getHttp(this.$API.organizationalStructureSearch, function (rs) {
        _this['AddOrganizationStructureModule/updateOrganziational'](_this.$common.arrayOrganizationalStructure(rs.data));
      });
    },
    submitForm: function submitForm(formName) {
      var _this2 = this;

      this.$refs[formName].validate(function (valid) {
        if (valid) {

          var addParams = null;

          //判断是否为根节点
          if (_this2.organizationalData.length <= 0) {

            addParams = {
              os_name: _this2.ruleForm.nodeName,
              os_is_inherit: "0",
              os_path: "0,",
              os_fid: "0"
            };
          } else {

            addParams = {
              os_name: _this2.ruleForm.nodeName,
              os_is_inherit: _this2.ruleForm.isInherit ? "1" : "0",
              os_path: _this2.ruleForm.nameParent[_this2.ruleForm.nameParent.length - 1] ? "0," + _this2.ruleForm.nameParent.join(',') + "," : "0,",
              os_fid: _this2.ruleForm.nameParent[_this2.ruleForm.nameParent.length - 1] ? _this2.ruleForm.nameParent[_this2.ruleForm.nameParent.length - 1] : 0
            };
          }

          _this2.$myLoading.startLoading();
          _this2.$http.postHttp(_this2.$API.organizationalStructureAdd, addParams, function (rs) {
            _this2.$myLoading.endLoading();
            _this2.$myPop.SuccessMessage();

            _this2['AddOrganizationStructureModule/clearForm']();
            _this2.initOrganizationData();
          });
        } else {
          return false;
        }
      });
    },
    resetForm: function resetForm() {
      this['AddOrganizationStructureModule/clearForm']();
    }
  })
};

/***/ }),

/***/ 790:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(791);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("b6dd7b40", content, true, {});

/***/ }),

/***/ 791:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 792:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('el-form',{ref:"ruleForm",attrs:{"model":_vm.ruleForm,"rules":_vm.rules,"label-position":"left","label-width":"160px"}},[(_vm.organizationalData.length > 0)?_c('el-form-item',{attrs:{"label":"选择节点：","prop":"nameParent"}},[_c('el-col',{attrs:{"span":8}},[_c('el-cascader',{attrs:{"placeholder":"请选择所属节点","options":_vm.organizationalData,"change-on-select":""},model:{value:(_vm.ruleForm.nameParent),callback:function ($$v) {_vm.$set(_vm.ruleForm, "nameParent", $$v)},expression:"ruleForm.nameParent"}})],1)],1):_vm._e(),_vm._v(" "),_c('el-form-item',{attrs:{"label":"节点名称：","prop":"nodeName"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"placeholder":"请输入节点名称"},model:{value:(_vm.ruleForm.nodeName),callback:function ($$v) {_vm.$set(_vm.ruleForm, "nodeName", $$v)},expression:"ruleForm.nodeName"}})],1),_vm._v(" "),_c('el-col',{attrs:{"span":12}},[(_vm.organizationalData.length <= 0)?_c('span',{staticStyle:{"color":"red","margin-left":"10px"}},[_vm._v("注：您当前创建的为根节点，例如：可以将公司名作为根节点")]):_vm._e()])],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"是否继承上级权限","prop":"isInherit"}},[_c('el-switch',{model:{value:(_vm.ruleForm.isInherit),callback:function ($$v) {_vm.$set(_vm.ruleForm, "isInherit", $$v)},expression:"ruleForm.isInherit"}})],1),_vm._v(" "),_c('el-form-item',[_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.submitForm('ruleForm')}}},[_vm._v("提交")]),_vm._v(" "),_c('el-button',{on:{"click":function($event){_vm.resetForm()}}},[_vm._v("重置")])],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});