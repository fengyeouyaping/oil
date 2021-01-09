webpackJsonp([12],{

/***/ 390:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editOrganizationalStructure_vue__ = __webpack_require__(675);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editOrganizationalStructure_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editOrganizationalStructure_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editOrganizationalStructure_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editOrganizationalStructure_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_e61be008_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_editOrganizationalStructure_vue__ = __webpack_require__(861);
function injectStyle (ssrContext) {
  __webpack_require__(859)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-e61be008"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editOrganizationalStructure_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_e61be008_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_editOrganizationalStructure_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 675:
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

var _vuex = __webpack_require__(9);

exports.default = {
    //数据源
    data: function data() {
        return {
            rules: {
                os_name: [{ required: true, message: '请输入节点名称', trigger: 'blur' }]
            }
        };
    },

    //初始化函数
    mounted: function mounted() {
        var _this = this;

        //获取参数信息
        var os_id = this.$route.query.os_id;

        //获取节点信息
        this.$myLoading.startLoading();
        this.$http.getHttp(this.$API.organizationalStructureSearch + "/os_id/" + os_id, function (rs) {
            _this.$myLoading.endLoading();
            _this['EditOrganizationStructureModule/updateRuleForm'](rs.data[0]);
        });
    },

    //计算属性
    computed: _extends({}, (0, _vuex.mapState)({
        ruleForm: function ruleForm(state) {
            return state.EditOrganizationStructureModule.ruleForm;
        }
    })),
    //组件方法
    methods: _extends({}, (0, _vuex.mapMutations)(['updateRuleForm', 'EditOrganizationStructureModule/updateRuleForm']), {
        submitForm: function submitForm(form) {
            var _this2 = this;

            this.$refs[form].validate(function (valid) {

                if (valid) {

                    //参数信息
                    var params = {
                        update_where: "os_id",
                        os_id: _this2.$route.query.os_id,
                        os_name: _this2.ruleForm.os_name,
                        os_is_inherit: _this2.ruleForm.os_is_inherit == true ? 1 : 0
                    };

                    _this2.$myLoading.startLoading();
                    _this2.$http.postHttp(_this2.$API.organizationalStructureUpdate, params, function (rs) {
                        _this2.$myLoading.endLoading();

                        _this2.$myPop.SuccessMessage();
                        setTimeout(function () {
                            _this2.$router.go(-1);
                        }, 1000);
                    });
                }
            });
        }
    })
};

/***/ }),

/***/ 859:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(860);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("eb1b20dc", content, true, {});

/***/ }),

/***/ 860:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 861:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('el-form',{ref:"ruleForm",attrs:{"model":_vm.ruleForm,"rules":_vm.rules,"label-position":"left","label-width":"160px"}},[_c('el-form-item',{attrs:{"label":"节点名称：","prop":"os_name"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"placeholder":"请输入节点名称"},model:{value:(_vm.ruleForm.os_name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "os_name", $$v)},expression:"ruleForm.os_name"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"是否继承上级权限","prop":"os_is_inherit"}},[_c('el-switch',{model:{value:(_vm.ruleForm.os_is_inherit),callback:function ($$v) {_vm.$set(_vm.ruleForm, "os_is_inherit", $$v)},expression:"ruleForm.os_is_inherit"}})],1),_vm._v(" "),_c('el-form-item',[_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.submitForm('ruleForm')}}},[_vm._v("提交")])],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});