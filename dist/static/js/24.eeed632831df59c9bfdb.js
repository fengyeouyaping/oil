webpackJsonp([24],{

/***/ 402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addAggregationServer_vue__ = __webpack_require__(684);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addAggregationServer_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addAggregationServer_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addAggregationServer_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addAggregationServer_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1d02328d_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_addAggregationServer_vue__ = __webpack_require__(886);
function injectStyle (ssrContext) {
  __webpack_require__(884)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-1d02328d"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addAggregationServer_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1d02328d_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_addAggregationServer_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 684:
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


var _vuex = __webpack_require__(9);

exports.default = {
    data: function data() {
        return {
            show: false,
            //进行必填的验证
            rules: {
                as_no: [{ required: true, message: '请输入聚合层服务器编号', trigger: 'blur' }],
                as_name: [{ required: true, message: '请输入聚合层服务器名称', trigger: 'blur' }],
                as_ip: [{ required: true, message: '请输入聚合层服务器IP', trigger: 'blur' }],
                as_port: [{ required: true, message: '请输入聚合层服务器端口', trigger: 'blur' }],
                as_project_path: [{ required: true, message: '请输入服务项目目录', trigger: 'blur' }]

            }
        };
    },

    computed: _extends({}, (0, _vuex.mapState)({
        serverForm: function serverForm(state) {
            return state.AddAggregationServerModule.serverForm;
        }
    })),
    mounted: function mounted() {

        this.resetForm();
    },

    methods: _extends({}, (0, _vuex.mapMutations)(['clearForm', 'AddAggregationServerModule/clearForm']), {

        //提交信息
        submitForm: function submitForm(form) {
            var _this = this;

            this.$refs[form].validate(function (valid) {

                if (valid) {

                    var params = {

                        as_name: _this.serverForm.as_name,
                        as_no: _this.serverForm.as_no,
                        as_is_open: _this.serverForm.as_is_open == true ? "1" : "0",
                        as_ip: _this.serverForm.as_ip,
                        as_port: _this.serverForm.as_port,
                        as_project_path: _this.serverForm.as_project_path,
                        as_is_show: _this.serverForm.as_is_show == true ? "1" : "0"

                    };

                    _this.$myLoading.startLoading();
                    _this.$http.postHttp(_this.$API.sysAggregationServerAdd, params, function (rs) {

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
            this['AddAggregationServerModule/clearForm']();
        }
    })
};

/***/ }),

/***/ 884:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(885);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("cf8a6432", content, true, {});

/***/ }),

/***/ 885:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 886:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('el-form',{ref:"serverForm",attrs:{"model":_vm.serverForm,"rules":_vm.rules,"label-position":"right","label-width":"160px"}},[_c('el-form-item',{attrs:{"label":"聚合层服务器编号：","prop":"as_no"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"placeholder":"请输入聚合层服务器编号"},model:{value:(_vm.serverForm.as_no),callback:function ($$v) {_vm.$set(_vm.serverForm, "as_no", $$v)},expression:"serverForm.as_no"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"聚合层服务器名称：","prop":"as_name"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"placeholder":"请输入聚合层服务器名称"},model:{value:(_vm.serverForm.as_name),callback:function ($$v) {_vm.$set(_vm.serverForm, "as_name", $$v)},expression:"serverForm.as_name"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"聚合层服务器IP：","prop":"as_ip"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"placeholder":"请输入聚合层服务器IP"},model:{value:(_vm.serverForm.as_ip),callback:function ($$v) {_vm.$set(_vm.serverForm, "as_ip", $$v)},expression:"serverForm.as_ip"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"聚合层服务器端口：","prop":"as_port"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"placeholder":"请输入聚合层服务器端口"},model:{value:(_vm.serverForm.as_port),callback:function ($$v) {_vm.$set(_vm.serverForm, "as_port", $$v)},expression:"serverForm.as_port"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"服务项目目录：","prop":"as_project_path"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"placeholder":"请输入服务项目目录"},model:{value:(_vm.serverForm.as_project_path),callback:function ($$v) {_vm.$set(_vm.serverForm, "as_project_path", $$v)},expression:"serverForm.as_project_path"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"是否打开：","prop":"as_is_open"}},[_c('el-switch',{model:{value:(_vm.serverForm.as_is_open),callback:function ($$v) {_vm.$set(_vm.serverForm, "as_is_open", $$v)},expression:"serverForm.as_is_open"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"是否显示：","prop":"as_is_show"}},[_c('el-switch',{model:{value:(_vm.serverForm.as_is_show),callback:function ($$v) {_vm.$set(_vm.serverForm, "as_is_show", $$v)},expression:"serverForm.as_is_show"}})],1),_vm._v(" "),_c('el-form-item',[_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.submitForm('serverForm')}}},[_vm._v("提交")]),_vm._v(" "),_c('el-button',{on:{"click":function($event){_vm.resetForm()}}},[_vm._v("重置")])],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});