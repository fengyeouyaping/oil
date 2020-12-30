webpackJsonp([52],{

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(647);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5c12711f_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(775);
function injectStyle (ssrContext) {
  __webpack_require__(773)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-5c12711f"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5c12711f_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 647:
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

var _vuex = __webpack_require__(9);

exports.default = {
    data: function data() {
        return {
            total: 0,
            pageNum: 1,

            isAddInfo: false,
            filterText: '',
            isCanOperate: false,
            newTitle: '',
            newDataInfo: [],
            roleData: [],
            tableData: [],
            ruleForm: {
                account: '',
                password: '',
                name: '',
                roleId: '',
                phone: '',
                comment: ''
            },
            rules: {
                account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
                roleId: [{ required: true }]
            }
        };
    },

    computed: _extends({}, (0, _vuex.mapState)({
        taskbars: function taskbars(state) {
            return state.MenuModule.taskbars;
        }
    })),
    mounted: function mounted() {
        this.initData();
        this.getRoleLists();
    },


    methods: {
        ifShow: function ifShow(index) {
            return this.taskbars[3]['childMenus'][1]['childMenus'][index]['visible'];
        },
        initDatas: function initDatas() {
            this.pageNum = 1;
            this.initData();
        },

        //当前页数
        handleCurrentChange: function handleCurrentChange(val) {
            this.pageNum = val;
            this.initData();
        },

        //获取列表
        initData: function initData() {
            var _this = this;

            var params = {
                pageNum: this.pageNum,
                pageSize: this.$global.pageLimit,
                userName: this.filterText
            };

            this.$myLoading.startLoading();

            this.$http.postHttp(this.$API.userList, params, function (data) {
                _this.total = data.data.total;
                _this.tableData = data.data.list;
                _this.$myLoading.endLoading();
            });
        },

        //添加用户
        submitForm: function submitForm(formName) {
            var _this2 = this;

            this.$refs[formName].validate(function (valid) {
                if (valid) {

                    var params = {
                        account: _this2.ruleForm.account,
                        comment: _this2.ruleForm.comment,
                        name: _this2.ruleForm.name,
                        password: _this2.ruleForm.password,
                        phone: _this2.ruleForm.phone,
                        roleId: _this2.ruleForm.roleId,
                        state: 1
                    };

                    _this2.$myLoading.startLoading();

                    _this2.$http.postHttp(_this2.$API.userAdd, params, function (data) {
                        _this2.isAddInfo = false;
                        _this2.$notify({
                            title: '用户添加成功',
                            message: '',
                            type: 'success'
                        });
                        _this2.$myLoading.endLoading();
                        _this2.initData();
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        //修改用户信息用户
        updataForm: function updataForm(formName) {
            var _this3 = this;

            this.$refs[formName].validate(function (valid) {
                if (valid) {

                    var params = {
                        id: _this3.newDataInfo.id,
                        account: _this3.ruleForm.account,
                        comment: _this3.ruleForm.comment,
                        name: _this3.ruleForm.name,
                        password: _this3.ruleForm.password,
                        phone: _this3.ruleForm.phone,
                        roleId: _this3.ruleForm.roleId,
                        state: 1
                    };

                    _this3.$myLoading.startLoading();

                    _this3.$http.postHttp(_this3.$API.userUpdate, params, function (data) {
                        _this3.isAddInfo = false;
                        _this3.$notify({
                            title: '用户添加成功',
                            message: '',
                            type: 'success'
                        });
                        _this3.$myLoading.endLoading();
                        _this3.initData();
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },

        //获取角色列表
        getRoleLists: function getRoleLists() {
            var _this4 = this;

            var params = {
                pageNum: 1,
                pageSize: 100
            };
            this.$http.postHttp(this.$API.roleList, params, function (data) {
                _this4.roleData = data.data.list;
            });
        },
        operati: function operati(type, item) {
            var _this5 = this;

            this.ruleForm = {
                account: '',
                password: '',
                name: '',
                roleId: '',
                phone: '',
                comment: ''
            };
            if (type == 1) {
                this.newTitle = "添加用户";
                this.isAddInfo = true;
            } else if (type == 2) {
                this.newTitle = "编辑用户信息";
                this.newDataInfo = item;
                this.$http.getHttp(this.$API.userDetail + "?id=" + item.id, function (data) {
                    _this5.ruleForm = data.data;
                    _this5.isAddInfo = true;
                    _this5.$myLoading.endLoading();
                });
            } else if (type == 3) {
                this.$confirm('确定删除此成员吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function () {
                    _this5.$myLoading.startLoading();

                    _this5.$http.getHttp(_this5.$API.userDelete + "?id=" + item.id, function (data) {
                        _this5.initData();
                        _this5.$notify({
                            title: '删除成功',
                            message: '',
                            type: 'success'
                        });
                        _this5.$myLoading.endLoading();
                    });
                }).catch(function () {});
            }
        },
        getInfo: function getInfo() {}
    }
};

/***/ }),

/***/ 773:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(774);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("fe716ce4", content, true, {});

/***/ }),

/***/ 774:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".mask[data-v-5c12711f]{position:absolute;width:100%;height:100%;margin-left:-10px;background:rgba(0,0,0,.3);z-index:10;right:0;overflow:auto}.mask .margin[data-v-5c12711f]{width:400px;background:#fff;border-radius:5px;margin:20% auto;padding:20px;position:relative}.mask .margin .close[data-v-5c12711f]{position:absolute;top:10px;right:10px;font-size:25px;color:#999}.mask .margin .header[data-v-5c12711f]{font-size:18px;color:#333;font-weight:700;text-align:center}.mask .margin .header.bottom[data-v-5c12711f]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;padding:0 20%;margin-top:10px;border-top:1px solid #eee}.mask .margin .header.bottom p[data-v-5c12711f]{-webkit-box-flex:1;-ms-flex:1;flex:1;margin:10px 0;font-size:14px;height:30px;font-weight:400;border-bottom:1px solid #eee;cursor:pointer}.mask .margin .header.bottom p.active[data-v-5c12711f]{color:#324fc4}.mask .margin .from[data-v-5c12711f]{margin-top:20px}.mask .margin .bottom .tree[data-v-5c12711f]{text-align:center;padding-left:100px}.mask .margin .bottom .button[data-v-5c12711f]{margin-top:50px}.realTimeData[data-v-5c12711f]{display:-webkit-box;display:-ms-flexbox;display:flex;height:100%;overflow:hidden}.realTimeData .content[data-v-5c12711f]{-webkit-box-flex:1;-ms-flex:1;flex:1;overflow:auto}.realTimeData .content .header[data-v-5c12711f]{padding:20px 20px 10px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.realTimeData .content .header .el-input[data-v-5c12711f]{width:240px}.realTimeData .content .header div[data-v-5c12711f]{display:-webkit-box;display:-ms-flexbox;display:flex}.realTimeData .content .header div i[data-v-5c12711f]{font-size:18px;margin-left:20px;cursor:pointer}.realTimeData .content .figure[data-v-5c12711f]{height:85%;padding:10px 20px}.realTimeData .content .figure .block[data-v-5c12711f]{text-align:center}.el-pagination[data-v-5c12711f]{float:none;margin:0 auto;text-align:center}", ""]);

// exports


/***/ }),

/***/ 775:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"realTimeData"},[_c('div',{staticClass:"content"},[_c('div',{staticClass:"header"},[_c('div',[_c('el-input',{attrs:{"placeholder":"请输入名称","size":"small","suffix-icon":"el-icon-search"},model:{value:(_vm.filterText),callback:function ($$v) {_vm.filterText=$$v},expression:"filterText"}}),_vm._v(" "),_c('el-button',{staticStyle:{"margin-left":"20px"},attrs:{"size":"small","type":"primary"},on:{"click":function($event){_vm.initDatas()}}},[_vm._v("搜索")])],1),_vm._v(" "),_c('div',[(_vm.ifShow(0))?_c('i',{staticClass:"el el-icon-circle-plus-outline",attrs:{"title":"添加成员"},on:{"click":function($event){_vm.operati(1)}}}):_vm._e()])]),_vm._v(" "),_c('div',{staticClass:"figure"},[_c('el-table',{staticClass:"tableData",staticStyle:{"width":"100%"},attrs:{"data":_vm.tableData,"height":"100%","stripe":true}},[_c('el-table-column',{attrs:{"prop":"id","label":"序号"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"account","label":"账户"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"name","label":"姓名"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"roleName","label":"角色"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"phone","label":"联系方式"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"comment","label":"备注"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(_vm.ifShow(2))?_c('el-button',{attrs:{"type":"text","size":"small"},on:{"click":function($event){_vm.operati(2,scope.row)}}},[_vm._v("编辑")]):_vm._e(),_vm._v(" "),(_vm.ifShow(1))?_c('el-button',{attrs:{"type":"text","size":"small"},on:{"click":function($event){_vm.operati(3,scope.row)}}},[_vm._v("删除")]):_vm._e()]}}])})],1)],1),_vm._v(" "),_c('el-pagination',{attrs:{"background":"","current-page":_vm.pageNum,"page-size":_vm.$global.pageLimit,"layout":"prev, pager, next","total":_vm.total},on:{"current-change":_vm.handleCurrentChange}})],1),_vm._v(" "),(_vm.isAddInfo)?_c('div',{staticClass:"mask"},[_c('div',{staticClass:"margin"},[_c('i',{staticClass:"el el-icon-circle-close close",on:{"click":function($event){_vm.isAddInfo = false}}}),_vm._v(" "),_c('div',{staticClass:"header"},[_vm._v(_vm._s(_vm.newTitle))]),_vm._v(" "),_c('div',{staticClass:"from"},[_c('el-form',{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{"model":_vm.ruleForm,"rules":_vm.rules,"label-width":"100px"}},[_c('el-form-item',{attrs:{"label":"账户名称","prop":"account"}},[_c('el-input',{attrs:{"disabled":_vm.newTitle == '编辑用户信息'},model:{value:(_vm.ruleForm.account),callback:function ($$v) {_vm.$set(_vm.ruleForm, "account", $$v)},expression:"ruleForm.account"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"密   码","prop":"password"}},[_c('el-input',{attrs:{"type":"password"},model:{value:(_vm.ruleForm.password),callback:function ($$v) {_vm.$set(_vm.ruleForm, "password", $$v)},expression:"ruleForm.password"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"姓   名","prop":"name"}},[_c('el-input',{model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"选择角色","prop":"roleId"}},[_c('el-select',{attrs:{"placeholder":"请选择角色"},model:{value:(_vm.ruleForm.roleId),callback:function ($$v) {_vm.$set(_vm.ruleForm, "roleId", $$v)},expression:"ruleForm.roleId"}},_vm._l((_vm.roleData),function(item,index){return _c('el-option',{key:index,attrs:{"label":item.name,"value":item.id}})}))],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"联系电话","prop":"phone"}},[_c('el-input',{model:{value:(_vm.ruleForm.phone),callback:function ($$v) {_vm.$set(_vm.ruleForm, "phone", $$v)},expression:"ruleForm.phone"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"备注","prop":"comment"}},[_c('el-input',{attrs:{"type":"textarea"},model:{value:(_vm.ruleForm.comment),callback:function ($$v) {_vm.$set(_vm.ruleForm, "comment", $$v)},expression:"ruleForm.comment"}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"button"},[(_vm.newTitle == '添加用户')?_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.submitForm('ruleForm')}}},[_vm._v("确认")]):_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.updataForm('ruleForm')}}},[_vm._v("确认")]),_vm._v(" "),_c('el-button',{on:{"click":function($event){_vm.isAddInfo = false}}},[_vm._v("取消")])],1)],1)],1)])]):_vm._e()])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});