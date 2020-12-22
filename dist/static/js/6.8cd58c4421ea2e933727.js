webpackJsonp([6],{

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addRole_vue__ = __webpack_require__(636);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addRole_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addRole_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addRole_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addRole_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_db9786a8_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_addRole_vue__ = __webpack_require__(778);
function injectStyle (ssrContext) {
  __webpack_require__(776)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-db9786a8"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addRole_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_db9786a8_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_addRole_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 636:
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


var _vuex = __webpack_require__(9);

exports.default = {
    data: function data() {
        return {
            show: false,
            //进行必填的验证
            rules: {
                or_name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
            }
        };
    },

    computed: _extends({}, (0, _vuex.mapState)({
        roleForm: function roleForm(state) {
            return state.AddRoleModule.roleForm;
        }
    })),
    mounted: function mounted() {

        this.resetForm();
    },

    methods: _extends({}, (0, _vuex.mapMutations)(['clearForm', 'AddRoleModule/clearForm']), (0, _vuex.mapMutations)(['updateRoleData', 'AddRoleModule/updateRoleData']), {

        //提交信息
        submitForm: function submitForm(form) {
            var _this = this;

            this.$refs[form].validate(function (valid) {

                if (valid) {

                    //参数信息
                    var params = {};
                    params.or_name = _this.roleForm.or_name; //角色名称

                    //请求地址
                    var actionUrl = _this.$API.organizationalRoleAdd;

                    _this.$myLoading.startLoading();
                    _this.$http.postHttp(actionUrl, params, function (rs) {
                        _this.$myLoading.endLoading();
                        _this.$myPop.SuccessMessage();
                        _this.resetForm();
                    });
                } else {
                    return false;
                }
            });
        },

        //重置信息
        resetForm: function resetForm() {
            this['AddRoleModule/clearForm']();
        }
    })
};

/***/ }),

/***/ 776:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(777);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("33096dd1", content, true, {});

/***/ }),

/***/ 777:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 778:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('el-form',{ref:"roleForm",attrs:{"model":_vm.roleForm,"rules":_vm.rules,"label-position":"right","label-width":"160px"}},[_c('el-form-item',{attrs:{"label":"角色名称：","prop":"or_name"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"placeholder":"请输入菜单名称"},model:{value:(_vm.roleForm.or_name),callback:function ($$v) {_vm.$set(_vm.roleForm, "or_name", $$v)},expression:"roleForm.or_name"}})],1)],1),_vm._v(" "),_c('el-form-item',[_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.submitForm('roleForm')}}},[_vm._v("提交")]),_vm._v(" "),_c('el-button',{on:{"click":function($event){_vm.resetForm()}}},[_vm._v("重置")])],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});