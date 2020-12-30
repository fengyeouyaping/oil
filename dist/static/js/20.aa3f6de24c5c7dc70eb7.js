webpackJsonp([20],{

/***/ 393:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editEmployee_vue__ = __webpack_require__(675);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editEmployee_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editEmployee_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editEmployee_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editEmployee_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3c8b2fad_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_editEmployee_vue__ = __webpack_require__(859);
function injectStyle (ssrContext) {
  __webpack_require__(857)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3c8b2fad"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editEmployee_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3c8b2fad_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_editEmployee_vue__["a" /* default */],
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
                u_is_activation: [{ required: true, message: '是否激活', trigger: 'change' }],
                u_status: [{ required: true, message: '请选择状态', trigger: 'change' }],
                u_sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
                u_hiredate: [{ required: true, message: '请选择入职时间', trigger: 'blur' }],
                u_email: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' }, { message: '请输入正确的邮箱地址', type: 'email' }]
            }
        };
    },

    //初始化函数
    mounted: function mounted() {
        var _this = this;

        //获取当前用户信息
        this.$myLoading.startLoading();
        this.$http.getHttp(this.$API.userSearch + "/u_id/" + this.$route.query.u_id, function (rs) {
            _this.$myLoading.endLoading();
            _this['EditEmployeeModule/updateEmployeeForm'](rs.data[0]);
            _this.employeeForm.u_hiredate = _this.$common.dateFormat("YYYY-MM-dd", _this.employeeForm.u_hiredate);
        });
    },

    //计算属性
    computed: _extends({}, (0, _vuex.mapState)({
        employeeForm: function employeeForm(state) {
            return state.EditEmployeeModule.employeeForm;
        }
    })),
    //组件方法
    methods: _extends({}, (0, _vuex.mapMutations)(['updateEmployeeForm', 'EditEmployeeModule/updateEmployeeForm']), {

        //提交信息
        submitForm: function submitForm(form) {
            var _this2 = this;

            //菜单添加
            this.$refs[form].validate(function (valid) {

                if (valid) {

                    //添加信息
                    var params = {
                        update_where: "u_id",
                        u_id: _this2.$route.query.u_id,
                        u_password: _this2.employeeForm.u_password,
                        u_nickname: _this2.employeeForm.u_nickname,
                        u_phone: _this2.employeeForm.u_phone,
                        u_email: _this2.employeeForm.u_email,
                        u_status: _this2.employeeForm.u_status,
                        u_sex: _this2.employeeForm.u_sex,
                        u_position: _this2.employeeForm.u_position,
                        u_desc: _this2.employeeForm.u_desc,
                        u_salary: _this2.employeeForm.u_salary,
                        u_hiredate: new Date(_this2.employeeForm.u_hiredate) / 1000,
                        u_is_activation: _this2.employeeForm.u_is_activation == true ? 1 : 0
                    };

                    _this2.$myLoading.startLoading();
                    _this2.$http.postHttp(_this2.$API.userUpdate, params, function (rs) {
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

/***/ 857:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(858);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("f5967036", content, true, {});

/***/ }),

/***/ 858:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 859:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('el-form',{ref:"employeeForm",attrs:{"model":_vm.employeeForm,"rules":_vm.rules,"label-position":"right","label-width":"160px"}},[_c('el-form-item',{attrs:{"label":"用户帐号：","prop":"u_username"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"disabled":"","placeholder":"请输入用户帐号"},model:{value:(_vm.employeeForm.u_username),callback:function ($$v) {_vm.$set(_vm.employeeForm, "u_username", $$v)},expression:"employeeForm.u_username"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"用户密码：","prop":"u_password"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"placeholder":"请输入用户密码"},model:{value:(_vm.employeeForm.u_password),callback:function ($$v) {_vm.$set(_vm.employeeForm, "u_password", $$v)},expression:"employeeForm.u_password"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"用户昵称：","prop":"u_nickname"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"placeholder":"请输入用户昵称"},model:{value:(_vm.employeeForm.u_nickname),callback:function ($$v) {_vm.$set(_vm.employeeForm, "u_nickname", $$v)},expression:"employeeForm.u_nickname"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"手机号码：","prop":"u_phone"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"placeholder":"请输入手机号码"},model:{value:(_vm.employeeForm.u_phone),callback:function ($$v) {_vm.$set(_vm.employeeForm, "u_phone", $$v)},expression:"employeeForm.u_phone"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"邮箱地址：","prop":"u_email"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"placeholder":"请输入邮箱地址"},model:{value:(_vm.employeeForm.u_email),callback:function ($$v) {_vm.$set(_vm.employeeForm, "u_email", $$v)},expression:"employeeForm.u_email"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"是否激活：","prop":"u_is_activation"}},[_c('el-switch',{attrs:{"active-color":"#13ce66","inactive-color":"#ccc"},model:{value:(_vm.employeeForm.u_is_activation),callback:function ($$v) {_vm.$set(_vm.employeeForm, "u_is_activation", $$v)},expression:"employeeForm.u_is_activation"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"状态：","prop":"u_status"}},[_c('el-col',{attrs:{"span":15}},[_c('el-radio',{attrs:{"label":"0"},model:{value:(_vm.employeeForm.u_status),callback:function ($$v) {_vm.$set(_vm.employeeForm, "u_status", $$v)},expression:"employeeForm.u_status"}},[_vm._v("在职")]),_vm._v(" "),_c('el-radio',{attrs:{"label":"1"},model:{value:(_vm.employeeForm.u_status),callback:function ($$v) {_vm.$set(_vm.employeeForm, "u_status", $$v)},expression:"employeeForm.u_status"}},[_vm._v("离职")])],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"性别：","prop":"u_sex"}},[_c('el-col',{attrs:{"span":15}},[_c('el-radio',{attrs:{"label":"0"},model:{value:(_vm.employeeForm.u_sex),callback:function ($$v) {_vm.$set(_vm.employeeForm, "u_sex", $$v)},expression:"employeeForm.u_sex"}},[_vm._v("男")]),_vm._v(" "),_c('el-radio',{attrs:{"label":"1"},model:{value:(_vm.employeeForm.u_sex),callback:function ($$v) {_vm.$set(_vm.employeeForm, "u_sex", $$v)},expression:"employeeForm.u_sex"}},[_vm._v("女")])],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"职务：","prop":"u_position"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"placeholder":"请输入职务"},model:{value:(_vm.employeeForm.u_position),callback:function ($$v) {_vm.$set(_vm.employeeForm, "u_position", $$v)},expression:"employeeForm.u_position"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"描述：","prop":"u_desc"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"placeholder":"请输入描述"},model:{value:(_vm.employeeForm.u_desc),callback:function ($$v) {_vm.$set(_vm.employeeForm, "u_desc", $$v)},expression:"employeeForm.u_desc"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"工资：","prop":"u_salary"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"placeholder":"请输入工资"},model:{value:(_vm.employeeForm.u_salary),callback:function ($$v) {_vm.$set(_vm.employeeForm, "u_salary", $$v)},expression:"employeeForm.u_salary"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"入职时间：","prop":"u_hiredate"}},[_c('el-col',{attrs:{"span":8}},[_c('el-date-picker',{attrs:{"type":"date","placeholder":"选择入职日期"},model:{value:(_vm.employeeForm.u_hiredate),callback:function ($$v) {_vm.$set(_vm.employeeForm, "u_hiredate", $$v)},expression:"employeeForm.u_hiredate"}})],1)],1),_vm._v(" "),_c('el-form-item',[_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.submitForm('employeeForm')}}},[_vm._v("提交")])],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});