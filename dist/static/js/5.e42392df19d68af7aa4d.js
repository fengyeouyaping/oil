webpackJsonp([5],{

/***/ 390:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editRole_vue__ = __webpack_require__(654);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editRole_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editRole_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editRole_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editRole_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_70a5d55d_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_editRole_vue__ = __webpack_require__(832);
function injectStyle (ssrContext) {
  __webpack_require__(830)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-70a5d55d"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editRole_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_70a5d55d_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_editRole_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 654:
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

var _vuex = __webpack_require__(9);

exports.default = {
    //数据源
    data: function data() {
        return {
            rules: {
                or_name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
            }
        };
    },

    //初始化函数
    mounted: function mounted() {
        var _this = this;

        //获取角色列表信息
        this.$myLoading.startLoading();
        this.$http.getHttp(this.$API.organizationalRoleSearch + "/or_id/" + this.$route.query.or_id, function (rs) {
            _this.$myLoading.endLoading();
            _this['EditRoleModule/updateRoleData'](rs.data[0]);
        });
    },

    //计算属性
    computed: _extends({}, (0, _vuex.mapState)({
        roleForm: function roleForm(state) {
            return state.EditRoleModule.roleForm;
        }
    })),
    //组件方法
    methods: _extends({}, (0, _vuex.mapMutations)(['updateRoleData', 'EditRoleModule/updateRoleData']), {

        //提交信息
        submitForm: function submitForm(form) {
            var _this2 = this;

            this.$refs[form].validate(function (valid) {

                if (valid) {

                    //参数信息
                    var params = {
                        update_where: "or_id",
                        or_id: _this2.$route.query.or_id,
                        or_name: _this2.roleForm.or_name
                    };

                    _this2.$myLoading.startLoading();
                    _this2.$http.postHttp(_this2.$API.organizationalRoleUpdate, params, function (rs) {
                        _this2.$myLoading.endLoading();
                        _this2.$myPop.SuccessMessage();
                        setTimeout(function () {
                            _this2.$router.go(-1);
                        }, 1000);
                    });
                } else {
                    return false;
                }
            });
        }
    })
};

/***/ }),

/***/ 830:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(831);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("f4ff17c6", content, true, {});

/***/ }),

/***/ 831:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 832:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('el-form',{ref:"roleForm",attrs:{"model":_vm.roleForm,"rules":_vm.rules,"label-position":"right","label-width":"160px"}},[_c('el-form-item',{attrs:{"label":"角色名称：","prop":"or_name"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"placeholder":"请输入菜单名称"},model:{value:(_vm.roleForm.or_name),callback:function ($$v) {_vm.$set(_vm.roleForm, "or_name", $$v)},expression:"roleForm.or_name"}})],1)],1),_vm._v(" "),_c('el-form-item',[_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.submitForm('roleForm')}}},[_vm._v("提交")])],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});