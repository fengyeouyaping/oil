webpackJsonp([23],{

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addEmployee_vue__ = __webpack_require__(659);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addEmployee_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addEmployee_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addEmployee_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addEmployee_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b3d0d47e_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_addEmployee_vue__ = __webpack_require__(813);
function injectStyle (ssrContext) {
  __webpack_require__(811)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-b3d0d47e"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addEmployee_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b3d0d47e_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_addEmployee_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 659:
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
            //进行必填的验证
            rules: {
                u_username: [{ required: true, message: '请输入用户帐号', trigger: 'blur' }],
                u_password: [{ required: true, message: '请输入用户密码', trigger: 'blur' }],
                u_nickname: [{ required: true, message: '请输入用户昵称', trigger: 'blur' }],
                u_phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
                u_email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }]
            }
        };
    },

    computed: _extends({}, (0, _vuex.mapState)({
        employeeForm: function employeeForm(state) {
            return state.AddEmployeeModule.employeeForm;
        }
    })),
    mounted: function mounted() {

        this.employeeForm.u_hiredate = this.$common.dateFormat("YYYY-MM-dd", this.$common.currentTime());
    },

    methods: _extends({}, (0, _vuex.mapMutations)(['clearForm', 'AddEmployeeModule/clearForm']), {

        //提交信息
        submitForm: function submitForm(employeeForm) {
            var _this = this;

            this.$refs[employeeForm].validate(function (valid) {
                if (valid) {
                    //添加信息
                    var params = {
                        "u_username": _this.employeeForm.u_username, //用户帐号
                        "u_password": _this.employeeForm.u_password, //用户密码
                        "u_nickname": _this.employeeForm.u_nickname, //用户昵称
                        "u_phone": _this.employeeForm.u_phone, //绑定的手机号码
                        "u_email": _this.employeeForm.u_email, //绑定的邮箱地址
                        "u_is_activation": _this.employeeForm.u_is_activation ? 1 : 0, //是否激活 0-否 1-是
                        "u_create_time": _this.$common.currentTime(), //创建时间
                        "u_status": _this.employeeForm.u_status, //状态
                        "u_sex": _this.employeeForm.u_sex, //性别
                        "u_position": _this.employeeForm.u_position, //职务
                        "u_desc": _this.employeeForm.u_desc, //描述
                        "u_salary": _this.employeeForm.u_salary, //工资
                        "u_hiredate": new Date(_this.employeeForm.u_hiredate) / 1000 //入职时间

                    };

                    _this.$myLoading.startLoading();
                    _this.$http.postHttp(_this.$API.userAdd, params, function (rs) {
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
            this['AddEmployeeModule/clearForm']();
        }
    })
};

/***/ }),

/***/ 811:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(812);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("f8397f6e", content, true, {});

/***/ }),

/***/ 812:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 813:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('el-form',{ref:"employeeForm",attrs:{"model":_vm.employeeForm,"rules":_vm.rules,"label-position":"right","label-width":"160px"}},[_c('el-form-item',{attrs:{"label":"用户帐号：","prop":"u_username"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"placeholder":"请输入用户帐号"},model:{value:(_vm.employeeForm.u_username),callback:function ($$v) {_vm.$set(_vm.employeeForm, "u_username", $$v)},expression:"employeeForm.u_username"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"用户密码：","prop":"u_password"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"type":"password","placeholder":"请输入用户密码"},model:{value:(_vm.employeeForm.u_password),callback:function ($$v) {_vm.$set(_vm.employeeForm, "u_password", $$v)},expression:"employeeForm.u_password"}}),_vm._v(" "),_c('span',{staticStyle:{"color":"#999"}},[_vm._v("( 默认密码为：123456 )")])],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"用户昵称：","prop":"u_nickname"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"placeholder":"请输入用户昵称"},model:{value:(_vm.employeeForm.u_nickname),callback:function ($$v) {_vm.$set(_vm.employeeForm, "u_nickname", $$v)},expression:"employeeForm.u_nickname"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"手机号码：","prop":"u_phone"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"placeholder":"请输入手机号码"},model:{value:(_vm.employeeForm.u_phone),callback:function ($$v) {_vm.$set(_vm.employeeForm, "u_phone", $$v)},expression:"employeeForm.u_phone"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"邮箱地址：","prop":"u_email"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"placeholder":"请输入邮箱地址"},model:{value:(_vm.employeeForm.u_email),callback:function ($$v) {_vm.$set(_vm.employeeForm, "u_email", $$v)},expression:"employeeForm.u_email"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"是否激活：","prop":"u_is_activation"}},[_c('el-switch',{attrs:{"active-color":"#13ce66","inactive-color":"#ccc"},model:{value:(_vm.employeeForm.u_is_activation),callback:function ($$v) {_vm.$set(_vm.employeeForm, "u_is_activation", $$v)},expression:"employeeForm.u_is_activation"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"状态：","prop":"u_status"}},[_c('el-col',{attrs:{"span":15}},[_c('el-radio',{attrs:{"label":"0"},model:{value:(_vm.employeeForm.u_status),callback:function ($$v) {_vm.$set(_vm.employeeForm, "u_status", $$v)},expression:"employeeForm.u_status"}},[_vm._v("在职")]),_vm._v(" "),_c('el-radio',{attrs:{"label":"1"},model:{value:(_vm.employeeForm.u_status),callback:function ($$v) {_vm.$set(_vm.employeeForm, "u_status", $$v)},expression:"employeeForm.u_status"}},[_vm._v("离职")])],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"性别：","prop":"u_sex"}},[_c('el-col',{attrs:{"span":15}},[_c('el-radio',{attrs:{"label":"0"},model:{value:(_vm.employeeForm.u_sex),callback:function ($$v) {_vm.$set(_vm.employeeForm, "u_sex", $$v)},expression:"employeeForm.u_sex"}},[_vm._v("男")]),_vm._v(" "),_c('el-radio',{attrs:{"label":"1"},model:{value:(_vm.employeeForm.u_sex),callback:function ($$v) {_vm.$set(_vm.employeeForm, "u_sex", $$v)},expression:"employeeForm.u_sex"}},[_vm._v("女")])],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"职务：","prop":"u_position"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"placeholder":"请输入职务"},model:{value:(_vm.employeeForm.u_position),callback:function ($$v) {_vm.$set(_vm.employeeForm, "u_position", $$v)},expression:"employeeForm.u_position"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"描述：","prop":"u_desc"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"placeholder":"请输入描述"},model:{value:(_vm.employeeForm.u_desc),callback:function ($$v) {_vm.$set(_vm.employeeForm, "u_desc", $$v)},expression:"employeeForm.u_desc"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"工资：","prop":"u_salary"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"placeholder":"请输入工资"},model:{value:(_vm.employeeForm.u_salary),callback:function ($$v) {_vm.$set(_vm.employeeForm, "u_salary", $$v)},expression:"employeeForm.u_salary"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"入职时间：","prop":"u_hiredate"}},[_c('el-col',{attrs:{"span":8}},[_c('el-date-picker',{attrs:{"type":"date","placeholder":"选择入职日期"},model:{value:(_vm.employeeForm.u_hiredate),callback:function ($$v) {_vm.$set(_vm.employeeForm, "u_hiredate", $$v)},expression:"employeeForm.u_hiredate"}})],1)],1),_vm._v(" "),_c('el-form-item',[_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.submitForm('employeeForm')}}},[_vm._v("提交")]),_vm._v(" "),_c('el-button',{on:{"click":function($event){_vm.resetForm()}}},[_vm._v("重置")])],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});