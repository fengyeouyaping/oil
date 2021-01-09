webpackJsonp([51],{

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(643);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_315076a7_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(763);
function injectStyle (ssrContext) {
  __webpack_require__(761)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-315076a7"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_315076a7_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 643:
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

var _vuex = __webpack_require__(9);

exports.default = {
    data: function data() {
        return {
            total: 0,
            pageNum: 1,

            isAddTree: false,
            isEditorTree: false,
            isCanAddSonTree: false,
            filterText: '',
            tableData: [],
            data: [],
            defaultProps: {
                children: 'nodeList',
                label: 'name'
            },
            ruleForm: {
                name: '',
                note: ''
            },
            rules: {
                name: [{ required: true, message: '请输入群组名称', trigger: 'blur' }, { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur' }],
                note: [{ required: true, message: '请输入群组描述', trigger: 'blur' }, { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }]
            },
            newData: {}
        };
    },

    computed: _extends({}, (0, _vuex.mapState)({
        taskbars: function taskbars(state) {
            return state.MenuModule.taskbars;
        }
    })),
    watch: {
        tableData: function tableData(val) {
            this.total = val.length;
        }
    },
    mounted: function mounted() {
        this.initData();
    },


    methods: {
        // getChange(data){
        //     var params = {
        //         comment : data.comment,
        //         name : data.name,
        //         id : data.id,
        //         modelFlag:data.modelFlag
        //     }

        //     this.$http.postHttp(this.$API.nodeUpdate,params,(data)=>{
        //         this.$notify({
        //             title: '树结构修改成功',
        //             message: '',
        //             type: 'success'
        //             });
        //         this.initData()

        //     })
        // },
        ifShow: function ifShow(index) {
            return this.taskbars[1]['childMenus'][0]['childMenus'][index]['visible'];
        },

        //列表数据
        initData: function initData() {
            var _this = this;

            this.$myLoading.startLoading();
            this.$http.postHttp(this.$API.deviceListAll, {}, function (rs) {
                _this.data = rs.data.nodes;
                _this.tableData = _this.data[0] && _this.data[0].nodeList ? _this.data[0].nodeList : [];
                _this.$myLoading.endLoading();
            });
        },

        //搜索列表页
        initDatas: function initDatas() {
            var _this2 = this;

            this.tableData = this.tableData.filter(function (item) {
                return !_this2.filterText || item.name.indexOf(_this2.filterText) != -1;
            });
        },

        //当前页数
        handleCurrentChange: function handleCurrentChange(val) {
            this.pageNum = val;
            this.initData();
        },
        change: function change(data) {
            this.newData = data;
            this.tableData = this.newData.nodeList ? this.newData.nodeList : [];
            this.isCanAddSonTree = true;
        },
        filterNode: function filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },

        //删除节点信息
        deleteInfo: function deleteInfo() {
            var _this3 = this;

            var title = "确定要删除" + this.newData.name + "和下属的节点吗？";
            this.$confirm(title, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                _this3.$myLoading.startLoading();

                _this3.$http.getHttp(_this3.$API.nodeDelete + "?id=" + _this3.newData.id, function (data) {
                    _this3.newData = {};
                    _this3.isCanAddSonTree = false;
                    _this3.$notify({
                        title: '删除成功',
                        message: '',
                        type: 'success'
                    });
                    _this3.initData();
                    _this3.$myLoading.endLoading();
                });
            }).catch(function () {});
        },

        //添加节点
        submitForm: function submitForm(formName) {
            var _this4 = this;

            this.$refs[formName].validate(function (valid) {
                if (valid) {
                    if (_this4.isAddTree != 1 && _this4.newData.level + 1 > 2) {
                        _this4.$notify({
                            title: '路线下面不可以添加节点，如想添加设备，请移步至设备列表',
                            message: '',
                            type: 'warning'
                        });
                        return false;
                    }
                    var params = {
                        comment: _this4.ruleForm.note,
                        name: _this4.ruleForm.name,
                        parentId: _this4.isAddTree == 1 ? 0 : _this4.newData.id,
                        level: _this4.isAddTree == 1 ? 0 : _this4.newData.level + 1
                    };

                    _this4.$myLoading.startLoading();
                    _this4.$http.postHttp(_this4.$API.nodeAdd, params, function (data) {
                        _this4.$notify({
                            title: '树结构添加成功',
                            message: '',
                            type: 'success'
                        });
                        _this4.isAddTree = false;
                        _this4.initData();
                        _this4.ruleForm = {
                            name: '',
                            note: ''
                        };
                        _this4.newData = {};
                        _this4.isCanAddSonTree = false;
                        _this4.$myLoading.endLoading();
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm: function resetForm() {
            this.isAddTree = false;
            this.isEditorTree = false;
            this.ruleForm = {
                name: '',
                note: ''
            };
        },

        //编辑群组信息
        editorTree: function editorTree() {
            this.ruleForm = {
                id: this.newData.id,
                name: this.newData.name,
                comment: this.newData.comment
            };
            this.isEditorTree = true;
        },
        submitEditor: function submitEditor(formName) {
            var _this5 = this;

            this.$refs[formName].validate(function (valid) {
                if (valid) {
                    var params = {
                        comment: _this5.ruleForm.comment,
                        name: _this5.ruleForm.name,
                        id: _this5.ruleForm.id
                    };

                    _this5.$myLoading.startLoading();
                    _this5.$http.postHttp(_this5.$API.nodeUpdate, params, function (data) {
                        _this5.$notify({
                            title: '树结构修改成功',
                            message: '',
                            type: 'success'
                        });
                        _this5.isEditorTree = false;
                        _this5.initData();
                        _this5.ruleForm = {
                            name: '',
                            note: ''
                        };
                        _this5.newData = {};
                        _this5.isCanAddSonTree = false;
                        _this5.$myLoading.endLoading();
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
};

/***/ }),

/***/ 761:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(762);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("4ee15677", content, true, {});

/***/ }),

/***/ 762:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".mask[data-v-315076a7]{position:absolute;width:100%;height:100%;margin-left:-10px;background:rgba(0,0,0,.3);z-index:10;right:0}.mask .margin[data-v-315076a7]{width:400px;background:#fff;border-radius:5px;margin:20% auto;padding:20px;position:relative}.mask .margin .close[data-v-315076a7]{position:absolute;top:10px;right:10px;font-size:25px;color:#999}.mask .margin .header[data-v-315076a7]{font-size:18px;color:#333;font-weight:700;text-align:center}.mask .margin .from[data-v-315076a7]{margin-top:20px}.realTimeData[data-v-315076a7]{display:-webkit-box;display:-ms-flexbox;display:flex;height:100%;overflow:hidden}.realTimeData .left[data-v-315076a7]{min-width:300px;padding:20px 10px;border-right:10px solid #f5f2f2;overflow:hidden}.realTimeData .left .left_title[data-v-315076a7]{font-size:18px;margin-bottom:20px;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-pack:distribute;justify-content:space-around}.realTimeData .content[data-v-315076a7]{-webkit-box-flex:1;-ms-flex:1;flex:1;overflow:auto}.realTimeData .content .header[data-v-315076a7]{padding:20px 20px 10px}.realTimeData .content .header .el-input[data-v-315076a7]{width:240px}.realTimeData .content .figure[data-v-315076a7]{height:85%;padding:10px 20px}.realTimeData .content .figure .block[data-v-315076a7]{text-align:center}.el-pagination[data-v-315076a7]{float:none;margin:0 auto;text-align:center}", ""]);

// exports


/***/ }),

/***/ 763:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"realTimeData"},[_c('div',{staticClass:"left"},[_c('div',{staticClass:"left_title"},[(_vm.ifShow(0))?_c('i',{staticClass:"el el-icon-circle-plus-outline",attrs:{"title":"添加根群组"},on:{"click":function($event){_vm.isAddTree = 1}}}):_vm._e(),_vm._v(" "),(_vm.isCanAddSonTree && _vm.ifShow(0))?_c('i',{staticClass:"el el-icon-share",attrs:{"title":"添加节点群组"},on:{"click":function($event){_vm.isAddTree = 2}}}):_vm._e(),_vm._v(" "),(_vm.isCanAddSonTree && _vm.ifShow(1))?_c('i',{staticClass:"el el-icon-delete-solid",attrs:{"title":"删除群组"},on:{"click":function($event){_vm.deleteInfo()}}}):_vm._e(),_vm._v(" "),(_vm.isCanAddSonTree)?_c('i',{staticClass:"el el-icon-edit",attrs:{"title":"编辑群组"},on:{"click":function($event){_vm.editorTree()}}}):_vm._e()]),_vm._v(" "),_c('el-tree',{ref:"tree",staticClass:"filter-tree",attrs:{"data":_vm.data,"props":_vm.defaultProps,"default-expand-all":"","expand-on-click-node":false,"filter-node-method":_vm.filterNode},on:{"node-click":_vm.change}})],1),_vm._v(" "),_c('div',{staticClass:"content"},[_c('div',{staticClass:"header"},[_c('el-input',{attrs:{"placeholder":"输入关键字","size":"small","suffix-icon":"el-icon-search"},model:{value:(_vm.filterText),callback:function ($$v) {_vm.filterText=$$v},expression:"filterText"}}),_vm._v(" "),_c('el-button',{staticStyle:{"margin-left":"20px"},attrs:{"size":"small","type":"primary"},on:{"click":function($event){_vm.initDatas()}}},[_vm._v("搜索")])],1),_vm._v(" "),_c('div',{staticClass:"figure"},[_c('el-table',{staticClass:"tableData",attrs:{"data":_vm.tableData,"height":"100%","stripe":true}},[_c('el-table-column',{attrs:{"prop":"id","label":"序号"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"name","label":"节点名称"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"comment","label":"备注"}})],1)],1),_vm._v(" "),_c('el-pagination',{attrs:{"background":"","current-page":_vm.pageNum,"page-size":_vm.$global.pageLimit,"layout":"prev, pager, next","total":_vm.total},on:{"current-change":_vm.handleCurrentChange}})],1),_vm._v(" "),(_vm.isAddTree)?_c('div',{staticClass:"mask"},[_c('div',{staticClass:"margin"},[_c('i',{staticClass:"el el-icon-circle-close close",on:{"click":function($event){_vm.isAddTree = false}}}),_vm._v(" "),_c('div',{staticClass:"header"},[_vm._v(_vm._s(_vm.isAddTree === 1 ? "添加根群组" : "添加节点群组"))]),_vm._v(" "),_c('div',{staticClass:"from"},[_c('el-form',{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{"model":_vm.ruleForm,"rules":_vm.rules,"label-width":"100px"}},[_c('el-form-item',{attrs:{"label":"群组名称","prop":"name"}},[_c('el-input',{model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"群组描述"}},[_c('el-input',{attrs:{"type":"textarea"},model:{value:(_vm.ruleForm.note),callback:function ($$v) {_vm.$set(_vm.ruleForm, "note", $$v)},expression:"ruleForm.note"}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"button"},[_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.submitForm('ruleForm')}}},[_vm._v("确认")]),_vm._v(" "),_c('el-button',{on:{"click":function($event){_vm.resetForm('ruleForm')}}},[_vm._v("取消")])],1)],1)],1)])]):_vm._e(),_vm._v(" "),(_vm.isEditorTree)?_c('div',{staticClass:"mask"},[_c('div',{staticClass:"margin"},[_c('i',{staticClass:"el el-icon-circle-close close",on:{"click":function($event){_vm.isEditorTree = false}}}),_vm._v(" "),_c('div',{staticClass:"header"},[_vm._v("编辑群组")]),_vm._v(" "),_c('div',{staticClass:"from"},[_c('el-form',{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{"model":_vm.ruleForm,"rules":_vm.rules,"label-width":"100px"}},[_c('el-form-item',{attrs:{"label":"群组名称","prop":"name"}},[_c('el-input',{model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"群组描述"}},[_c('el-input',{attrs:{"type":"textarea"},model:{value:(_vm.ruleForm.comment),callback:function ($$v) {_vm.$set(_vm.ruleForm, "comment", $$v)},expression:"ruleForm.comment"}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"button"},[_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.submitEditor('ruleForm')}}},[_vm._v("确认")]),_vm._v(" "),_c('el-button',{on:{"click":function($event){_vm.resetForm('ruleForm')}}},[_vm._v("取消")])],1)],1)],1)])]):_vm._e()])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});