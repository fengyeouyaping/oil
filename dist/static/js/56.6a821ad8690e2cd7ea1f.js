webpackJsonp([56],{

/***/ 360:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(624);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5a48bf34_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(742);
function injectStyle (ssrContext) {
  __webpack_require__(740)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-5a48bf34"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5a48bf34_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 624:
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

var _vuex = __webpack_require__(9);

exports.default = {
    data: function data() {
        return {
            total: 0,
            pageNum: 1,
            isAddInfo: false,
            isAdd: true, //是否是编辑
            filterText: '',
            lastFilterText: '',
            isCanOperate: false,
            tableData: [],
            data: [],
            options: [],
            defaultProps: {
                children: 'nodeList',
                label: 'name'
            },
            ruleForm: {
                id: '',
                name: '',
                latitudeLlongitude: '',
                route: '',
                note: '',
                sortId: ''
            },
            rules: {
                id: [{ required: true, message: '请输入设备ID', trigger: 'blur' }, { min: 1, max: 14, message: '长度在 1 到 14 个字符', trigger: 'blur' }],
                name: [{ required: true, message: '请输入测试桩号', trigger: 'blur' }, { min: 1, max: 14, message: '长度在 1 到 14 个字符', trigger: 'blur' }],
                latitudeLlongitude: [{ required: true, message: '请输入经纬度', trigger: 'blur' }, { min: 1, max: 14, message: '长度在 1 到 14 个字符', trigger: 'blur' }],
                route: [{ required: true, message: '请选择路线', trigger: 'change' }],
                note: [{ required: true, message: '请输入群组描述', trigger: 'blur' }, { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }]
            },
            lineList: [],
            nodeid: ''
        };
    },

    watch: {
        filterText: function filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    computed: _extends({}, (0, _vuex.mapState)({
        taskbars: function taskbars(state) {
            return state.MenuModule.taskbars;
        }
    })),
    mounted: function mounted() {
        this.company();
    },


    methods: {
        ifShow: function ifShow(index) {
            return this.taskbars[1]['childMenus'][1]['childMenus'][index]['visible'];
        },

        //搜索
        initDatas: function initDatas() {
            this.initData();
        },

        //列表数据
        company: function company() {
            var _this = this;

            this.$http.postHttp(this.$API.deviceListAll, {}, function (rs) {
                _this.data = rs.data.nodes;
                _this.data.map(function (item) {
                    if (item.nodeList) {
                        item.nodeList.map(function (itemite) {
                            if (itemite.nodeList) {
                                itemite.nodeList.map(function (childrenItem) {
                                    _this.lineList.push(childrenItem);
                                });
                            }
                        });
                    }
                });

                _this.getOptions();
                _this.nodeid = _this.lineList[0]['id'];
                _this.initData();
            });
        },
        getOptions: function getOptions() {
            var result = [];

            if (this.data && this.data.length > 0) {
                var menuItemsss = function menuItemsss(froum) {
                    var lists = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

                    for (var i = 0; i < froum.length; i++) {
                        lists[i] = {
                            comment: froum[i]['comment'],
                            devices: froum[i]['devices'],
                            id: froum[i]['id'],
                            level: froum[i]['level'],
                            label: froum[i]['name'],
                            value: froum[i]['id'],
                            parentId: froum[i]['parentId'],
                            $treeNodeId: froum[i]['$treeNodeId']
                        };
                        if (froum[i]['nodeList'] && froum[i]['nodeList'].length > 0) {
                            lists[i]['children'] = menuItemsss(froum[i]['nodeList']);
                        }
                    }
                    return lists;
                };
                result = menuItemsss(this.data);
            }
            this.options = result;
        },
        cascaderChange: function cascaderChange(data) {
            this.ruleForm.route = data[data.length - 1];
        },

        //列表数据
        initData: function initData() {
            var _this2 = this;

            var params = {
                devGuid: this.lastFilterText,
                nodeid: this.nodeid,
                pageNum: this.pageNum,
                pageSize: this.$global.pageLimit
            };

            this.$myLoading.startLoading();
            this.$http.postHttp(this.$API.deviceList, params, function (data) {
                _this2.total = data.data.total;
                _this2.tableData = data.data.list;
                _this2.tableData.map(function (item) {
                    item.time = item.time ? _this2.$common.dateFormat("YYYY-MM-dd", item.time / 1000) : '';
                });
                _this2.$myLoading.endLoading();
            });
        },

        //导出
        fileExport: function fileExport() {
            window.location = this.$global.httpServer + "/file/download?fileName=template.xls";
        },

        //导入设备列表
        fileUploadImport: function fileUploadImport() {
            var _this3 = this;

            this.$myLoading.startLoading();
            this.$http.postHttp(this.$API.fileUploadImport, {}, function (data) {

                _this3.$myLoading.endLoading();
            });
        },

        //当前页数
        handleCurrentChange: function handleCurrentChange(val) {
            this.pageNum = val;
            this.initData();
        },
        filterNode: function filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        handleClick: function handleClick(data, type) {
            var _this4 = this;

            if (type == 1) {
                this.$router.push({
                    path: "/equipmentInfo",
                    query: {
                        devGuid: data.devGuid
                    }
                });
            } else if (type === 2) {
                this.isAddInfo = true;
                this.isAdd = false;
                this.ruleForm = {
                    route: data.nodeId,
                    id: data.devGuid,
                    latitudeLlongitude: data.lon + ',' + data.lat,
                    note: data.remark,
                    name: data.stake,
                    sortId: data.sortId
                };
            } else if (type === 3) {
                this.$confirm('确定删除此设备吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function () {
                    _this4.$myLoading.startLoading();

                    _this4.$http.getHttp(_this4.$API.deviceListDelete + "?devGuid=" + data.devGuid, function (data) {
                        _this4.initData();
                        _this4.$notify({
                            title: '删除成功',
                            message: '',
                            type: 'success'
                        });
                        _this4.$myLoading.endLoading();
                    });
                }).catch(function () {});
            }
        },

        //切换线路
        nodeClick: function nodeClick(data) {
            if (this.lineList.indexOf(data) != -1) {
                this.nodeid = data.id;
                this.initData();
            }
        },
        submitForm: function submitForm(formName) {
            var _this5 = this;

            this.$refs[formName].validate(function (valid) {
                if (valid) {
                    if (_this5.ruleForm.latitudeLlongitude && _this5.ruleForm.latitudeLlongitude.split(',').length < 2) {
                        _this5.$notify({
                            title: '请输入正确的经纬度',
                            message: '',
                            type: 'warning'
                        });
                        return;
                    }
                    var params = {
                        'nodeId': _this5.ruleForm.route,
                        "devGuid": _this5.ruleForm.id,
                        "lat": _this5.ruleForm.latitudeLlongitude.split(',')[1],
                        "lon": _this5.ruleForm.latitudeLlongitude.split(',')[0],
                        "remark": _this5.ruleForm.note,
                        "stake": _this5.ruleForm.name,
                        "sortId": _this5.ruleForm.sortId
                    };

                    var url = _this5.isAdd ? _this5.$API.deviceAdd : _this5.$API.deviceUpdate;
                    _this5.$myLoading.startLoading();
                    _this5.$http.postHttp(url, params, function (data) {
                        _this5.$notify({
                            title: _this5.isAdd ? '设备添加成功' : '设备编辑成功',
                            message: '',
                            type: 'success'
                        });
                        _this5.initData();
                        _this5.isAddInfo = false;
                        _this5.ruleForm = {
                            id: '',
                            name: '',
                            latitudeLlongitude: '',
                            route: '',
                            note: '',
                            sortId: ''
                        }, _this5.$myLoading.endLoading();
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

/***/ 740:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(741);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("75944e96", content, true, {});

/***/ }),

/***/ 741:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".mask[data-v-5a48bf34]{position:absolute;width:100%;height:100%;margin-left:-10px;background:rgba(0,0,0,.3);z-index:10}.mask .margin[data-v-5a48bf34]{width:400px;background:#fff;border-radius:5px;margin:20% auto;padding:20px;position:relative}.mask .margin .close[data-v-5a48bf34]{position:absolute;top:10px;right:10px;font-size:25px;color:#999}.mask .margin .header[data-v-5a48bf34]{font-size:18px;color:#333;font-weight:700;text-align:center}.mask .margin .from[data-v-5a48bf34]{margin-top:20px}.realTimeData[data-v-5a48bf34]{display:-webkit-box;display:-ms-flexbox;display:flex;height:100%}.realTimeData .left[data-v-5a48bf34]{min-width:200px;padding:20px 10px;border-right:10px solid #f5f2f2}.realTimeData .left .left_title[data-v-5a48bf34]{font-size:14px;margin-top:20px;font-weight:700}.realTimeData .content[data-v-5a48bf34]{-webkit-box-flex:1;-ms-flex:1;flex:1}.realTimeData .content .header[data-v-5a48bf34]{padding:20px 20px 10px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.realTimeData .content .header .el-input[data-v-5a48bf34]{width:240px}.realTimeData .content .header div[data-v-5a48bf34]{display:-webkit-box;display:-ms-flexbox;display:flex}.realTimeData .content .header div i[data-v-5a48bf34]{font-size:18px;margin-left:20px;cursor:pointer}.realTimeData .content .figure[data-v-5a48bf34]{height:85%;padding:10px 20px}.realTimeData .content .figure .block[data-v-5a48bf34]{text-align:center}.el-pagination[data-v-5a48bf34]{float:none;margin:0 auto;text-align:center}", ""]);

// exports


/***/ }),

/***/ 742:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"realTimeData"},[_c('div',{staticClass:"left"},[_c('el-input',{attrs:{"placeholder":"输入关键字进行过滤","size":"small","suffix-icon":"el-icon-search"},model:{value:(_vm.filterText),callback:function ($$v) {_vm.filterText=$$v},expression:"filterText"}}),_vm._v(" "),_c('div',{staticClass:"left_title"},[_vm._v("公司信息")]),_vm._v(" "),_c('el-tree',{ref:"tree",staticClass:"filter-tree",attrs:{"data":_vm.data,"props":_vm.defaultProps,"default-expand-all":"","expand-on-click-node":false,"filter-node-method":_vm.filterNode},on:{"node-click":_vm.nodeClick}})],1),_vm._v(" "),_c('div',{staticClass:"content"},[_c('div',{staticClass:"header"},[_c('div',[_c('el-input',{attrs:{"placeholder":"请输入设备编码","size":"small","suffix-icon":"el-icon-search"},model:{value:(_vm.lastFilterText),callback:function ($$v) {_vm.lastFilterText=$$v},expression:"lastFilterText"}}),_vm._v(" "),_c('el-button',{staticStyle:{"margin-left":"20px"},attrs:{"size":"small","type":"primary"},on:{"click":function($event){_vm.initDatas()}}},[_vm._v("搜索")])],1),_vm._v(" "),_c('div',[(_vm.ifShow(3))?_c('i',{staticClass:"el el-icon-download",attrs:{"title":"导出模版"},on:{"click":_vm.fileExport}}):_vm._e(),_vm._v(" "),(_vm.ifShow(3))?_c('el-upload',{staticClass:"upload-demo",attrs:{"show-file-list":false,"action":_vm.$global.httpServer + _vm.$API.fileUploadImport}},[_c('i',{staticClass:"el el-icon-upload2",attrs:{"title":"列表导入"}})]):_vm._e(),_vm._v(" "),(_vm.ifShow(0))?_c('i',{staticClass:"el el-icon-circle-plus-outline",attrs:{"title":"添加设备"},on:{"click":function($event){_vm.isAddInfo = true;_vm.isAdd = true}}}):_vm._e()],1)]),_vm._v(" "),_c('div',{staticClass:"figure"},[_c('el-table',{staticClass:"tableData",staticStyle:{"width":"100%"},attrs:{"data":_vm.tableData,"height":"100%","stripe":true}},[_c('el-table-column',{attrs:{"prop":"sortId","label":"序号"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"devGuid","label":"设备ID","width":"150"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"stake","label":"测试桩号"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"经纬度","width":"200"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('span',[_vm._v(_vm._s(((scope.row.lon) + "," + (scope.row.lat))))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"status","label":"状态","width":"80"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"batt","label":"电量"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"time","label":"最后一次通信时间","width":"180"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"remark","label":"备注"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作","fixed":"right"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(_vm.ifShow(2))?_c('el-button',{attrs:{"type":"text","size":"small"},on:{"click":function($event){_vm.handleClick(scope.row,2)}}},[_vm._v("编辑")]):_vm._e(),_vm._v(" "),(_vm.ifShow(2))?_c('el-button',{attrs:{"type":"text","size":"small"},on:{"click":function($event){_vm.handleClick(scope.row,1)}}},[_vm._v("详情")]):_vm._e(),_vm._v(" "),(_vm.ifShow(1))?_c('el-button',{attrs:{"type":"text","size":"small"},on:{"click":function($event){_vm.handleClick(scope.row,3)}}},[_vm._v("删除")]):_vm._e()]}}])})],1)],1),_vm._v(" "),_c('el-pagination',{attrs:{"background":"","current-page":_vm.pageNum,"page-size":_vm.$global.pageLimit,"layout":"prev, pager, next","total":_vm.total},on:{"current-change":_vm.handleCurrentChange}})],1),_vm._v(" "),(_vm.isAddInfo)?_c('div',{staticClass:"mask"},[_c('div',{staticClass:"margin"},[_c('i',{staticClass:"el el-icon-circle-close close",on:{"click":function($event){_vm.isAddInfo = false}}}),_vm._v(" "),_c('div',{staticClass:"header"},[_vm._v(_vm._s(_vm.isAdd ? '添加设备' : '编辑设备'))]),_vm._v(" "),_c('div',{staticClass:"from"},[_c('el-form',{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{"model":_vm.ruleForm,"rules":_vm.rules,"label-width":"100px"}},[_c('el-form-item',{attrs:{"label":"设备ID","prop":"id"}},[_c('el-input',{model:{value:(_vm.ruleForm.id),callback:function ($$v) {_vm.$set(_vm.ruleForm, "id", $$v)},expression:"ruleForm.id"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"测试桩号","prop":"name"}},[_c('el-input',{model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"序号"}},[_c('el-input',{model:{value:(_vm.ruleForm.sortId),callback:function ($$v) {_vm.$set(_vm.ruleForm, "sortId", $$v)},expression:"ruleForm.sortId"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"经纬度"}},[_c('el-input',{attrs:{"placeholder":"请以英文状态下的‘,’隔开，经度在前，纬度在后"},model:{value:(_vm.ruleForm.latitudeLlongitude),callback:function ($$v) {_vm.$set(_vm.ruleForm, "latitudeLlongitude", $$v)},expression:"ruleForm.latitudeLlongitude"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"选择路线","prop":"route"}},[_c('el-cascader',{attrs:{"options":_vm.options,"multiple":false,"show-all-levels":false},on:{"change":_vm.cascaderChange}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"备注"}},[_c('el-input',{attrs:{"type":"textarea"},model:{value:(_vm.ruleForm.note),callback:function ($$v) {_vm.$set(_vm.ruleForm, "note", $$v)},expression:"ruleForm.note"}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"button"},[_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.submitForm('ruleForm')}}},[_vm._v("确认")]),_vm._v(" "),_c('el-button',{on:{"click":function($event){_vm.isAddInfo = !_vm.isAddInfo}}},[_vm._v("取消")])],1)],1)],1)])]):_vm._e()])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});