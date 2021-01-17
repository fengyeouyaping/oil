webpackJsonp([50],{

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(650);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_09f8b155_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(786);
function injectStyle (ssrContext) {
  __webpack_require__(784)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-09f8b155"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_09f8b155_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 650:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _userData = __webpack_require__(108);

var _userData2 = _interopRequireDefault(_userData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    data: function data() {
        return {
            imageUrl: '',
            ruleForm: {
                account: '',
                password: '',
                imagePath: ''
            },
            rules: {
                account: [{ required: true }],
                password: [{ required: true, message: '请输入正确的密码', trigger: 'change' }]
            },
            myHeaders: { token: _userData2.default.userToken() },
            isImagePath: false
        };
    },
    mounted: function mounted() {
        this.initData();
    },


    methods: {
        //获取用户信息
        initData: function initData() {
            this.ruleForm = JSON.parse(sessionStorage.getItem("userInfo"));
            if (this.ruleForm.imagePath) {
                this.ruleForm.imagePath = this.$global.httpServerImg + this.ruleForm.imagePath.split(":")[1] + "?time=" + new Date().getTime() * 1000 / 1000;
                this.isImagePath = true;
            }
        },
        handleAvatarSuccess: function handleAvatarSuccess(res, file) {
            var _this = this;

            this.$http.getHttp(this.$API.userDetail + "?id=" + this.ruleForm.id, function (rs) {
                sessionStorage.setItem("userInfo", JSON.stringify(rs.data));
                _this.$store.commit('HomeModule/UPDATA_USER_INFO', rs.data);
                _this.ruleForm.imagePath = _this.$global.httpServerImg + rs.data.imagePath.split(":")[1] + "?time=" + new Date().getTime() * 1000 / 1000;
                _this.isImagePath = true;
            });
        },
        beforeAvatarUpload: function beforeAvatarUpload(file) {
            var isJPG = file.type == 'image/jpeg' || file.type == 'image/png';
            var isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        submitForm: function submitForm() {
            var _this2 = this;

            if (this.ruleForm.password.length <= 0) {
                this.$myPop.WarningMessage("用户密码不能为空");
                return;
            }

            if (this.ruleForm.imagePath.length <= 0) {
                this.$myPop.WarningMessage("用户头像不能为空");
                return;
            }

            this.$myLoading.startLoading();
            var params = {
                id: this.ruleForm.id,
                account: this.ruleForm.account,
                password: this.ruleForm.password
            };
            this.$http.postHttp(this.$API.userUpdate, params, function (data) {
                sessionStorage.setItem("userInfo", JSON.stringify(_this2.ruleForm));
                _this2.$notify({
                    title: '修改成功',
                    message: '',
                    type: 'success'
                });
                _this2.$myLoading.endLoading();
            });
        },
        goToTop: function goToTop() {
            var _this3 = this;

            this.$myPop.confirmBox("确认操作", "确定要退出系统吗？", function () {
                _this3.$myLoading.startLoading();

                _this3.$http.postHttp(_this3.$API.userLogOut, {}, function (data) {
                    //清除本地所有数据，并退出到登录界面
                    sessionStorage.clear();
                    _this3.$myLoading.endLoading();
                    //刷新当页
                    _this3.$router.push({
                        path: "/"
                    });
                });
            });
        }
    }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ 784:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(785);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("37bb6031", content, true, {});

/***/ }),

/***/ 785:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".userInfo .header[data-v-09f8b155]{margin-top:30px;font-size:18px;font-weight:700;margin-bottom:30px;padding-left:10px}.avatar-uploader .el-upload[data-v-09f8b155]{border:1px dashed #d9d9d9;border-radius:6px;cursor:pointer;position:relative;overflow:hidden}.avatar-uploader .el-upload[data-v-09f8b155]:hover{border-color:#409eff}.avatar-uploader-icon[data-v-09f8b155]{font-size:28px;color:#8c939d;width:178px;height:178px;line-height:178px;text-align:center;background:#eee}.avatar[data-v-09f8b155]{width:178px;height:178px;display:block}", ""]);

// exports


/***/ }),

/***/ 786:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"userInfo"},[_c('div',{staticClass:"header"},[_vm._v("用户信息")]),_vm._v(" "),_c('el-form',{ref:"ruleForm",staticClass:"demo-dynamic",staticStyle:{"width":"500px"},attrs:{"model":_vm.ruleForm,"rules":_vm.rules,"label-width":"100px"}},[_c('el-form-item',{attrs:{"label":"头像","prop":""}},[_c('el-upload',{staticClass:"avatar-uploader",attrs:{"headers":_vm.myHeaders,"action":_vm.$global.httpServer + _vm.$API.fileUploadImage,"show-file-list":false,"on-success":_vm.handleAvatarSuccess,"before-upload":_vm.beforeAvatarUpload}},[(_vm.isImagePath)?_c('img',{staticClass:"avatar",attrs:{"src":_vm.ruleForm.imagePath}}):_c('i',{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"账号信息","prop":"account"}},[_c('el-input',{attrs:{"disabled":""},model:{value:(_vm.ruleForm.account),callback:function ($$v) {_vm.$set(_vm.ruleForm, "account", $$v)},expression:"ruleForm.account"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"密码","prop":"password"}},[_c('el-input',{attrs:{"type":"password"},model:{value:(_vm.ruleForm.password),callback:function ($$v) {_vm.$set(_vm.ruleForm, "password", $$v)},expression:"ruleForm.password"}})],1),_vm._v(" "),_c('el-form-item',[_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.submitForm()}}},[_vm._v("提交修改")]),_vm._v(" "),_c('el-button',{on:{"click":function($event){_vm.goToTop()}}},[_vm._v("退出")])],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});