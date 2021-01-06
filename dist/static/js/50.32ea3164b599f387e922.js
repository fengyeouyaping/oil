webpackJsonp([50],{

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__ = __webpack_require__(649);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2a92d369_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__ = __webpack_require__(780);
function injectStyle (ssrContext) {
  __webpack_require__(778)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-2a92d369"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_index_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2a92d369_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_index_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 649:
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

var _tab = __webpack_require__(109);

var _tab2 = _interopRequireDefault(_tab);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = {
  data: function data() {
    return {
      total: 0,
      pageNum: 1,

      tipTitle: '',
      isbtn: true,
      isAddInfo: false,
      isShowRote: false,
      filterText: '',
      isCanOperate: false,
      newUpdataInfo: [],
      tableData: [],
      ruleForm: {
        id: '',
        name: '',
        latitudeLlongitude: '',
        route: '',
        note: ''
      },
      rules: {
        id: [{ required: true, message: '请输入设备ID', trigger: 'blur' }, { min: 1, max: 14, message: '长度在 1 到 14 个字符', trigger: 'blur' }],
        name: [{ required: true, message: '请输入测试桩号', trigger: 'blur' }, { min: 1, max: 14, message: '长度在 1 到 14 个字符', trigger: 'blur' }],
        latitudeLlongitude: [{ required: true, message: '请输入经纬度', trigger: 'blur' }, { min: 1, max: 14, message: '长度在 1 到 14 个字符', trigger: 'blur' }],
        route: [{ required: true }],
        note: [{ required: true, message: '请输入群组描述', trigger: 'blur' }, { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }]
      },
      dataBtn: [],
      defaultProps: {
        children: 'childMenus',
        label: 'menu'
      },
      roleAuthList: [],
      cheacedIdShow: [],
      roleAuthListId: []

    };
  },
  mounted: function mounted() {
    this.initData();
  },

  computed: _extends({}, (0, _vuex.mapState)({
    taskbars: function taskbars(state) {
      return state.MenuModule.taskbars;
    }
  })),
  methods: {
    ifShow: function ifShow(index) {
      return this.taskbars[3]['childMenus'][0]['childMenus'][index]['visible'];
    },
    initDatas: function initDatas() {
      this.pageNum = 1;
      this.initData();
    },

    //列表数据
    initData: function initData() {
      var _this = this;

      var params = {
        pageNum: this.pageNum,
        pageSize: this.$global.pageLimit,
        roleName: this.filterText
      };

      this.$myLoading.startLoading();
      this.$http.postHttp(this.$API.roleList, params, function (data) {
        _this.total = data.data.total;
        _this.tableData = data.data.list;
        _this.tableData.map(function (item) {
          item.createDate = _this.$common.dateFormat("YYYY-MM-dd", item.createDate / 1000);
        });
        _this.$myLoading.endLoading();
      });
    },

    //当前页数
    handleCurrentChange: function handleCurrentChange(val) {
      this.pageNum = val;
      this.initData();
    },
    submitTop: function submitTop(formName) {
      var _this2 = this;

      this.$refs[formName].validate(function (valid) {
        if (valid) {

          if (_this2.tipTitle == "添加角色") {
            _this2.addInfo();
          } else if (_this2.tipTitle == "编辑角色") {
            _this2.updataInfo();
          }
        } else {
          return false;
        }
      });
    },
    treeChange: function treeChange(data, node) {
      this.roleAuthList = node.checkedNodes;
      this.roleAuthListId = [].concat(_toConsumableArray(node.checkedKeys), _toConsumableArray(node.halfCheckedKeys));
    },
    submitForm: function submitForm() {
      var _this3 = this;

      this.isbtn = true;

      var params = {
        roleAuthList: []
      };

      params.roleAuthList = this.roleAuthListId;

      this.$http.postHttp(this.$API.roleAuthUpdate, params, function (data) {
        if (data) {
          _this3.$notify({
            title: '权限分配成功',
            message: '',
            type: 'success'
          });
        }
        _this3.isShowRote = false;
      });
    },
    cloneTip: function cloneTip() {
      this.isShowRote = false;
      this.isbtn = true;
    },

    //编辑
    operati: function operati(type, item) {
      var _this4 = this;

      if (type == 1) {
        this.tipTitle = "添加角色";
        this.isAddInfo = true;
      } else if (type == 2) {
        this.getDatainfo(item);
        this.tipTitle = "编辑角色";
        this.newUpdataInfo = item;
        this.ruleForm.id = item.id;
        this.ruleForm.name = item.name;
        this.isAddInfo = true;
      } else if (type == 3) {
        this.$confirm('确定删除此角色吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          _this4.$myLoading.startLoading();

          _this4.$http.getHttp(_this4.$API.roleDelete + "?id=" + item.id, function (data) {
            _this4.initData();
            _this4.$notify({
              title: '删除成功',
              message: '',
              type: 'success'
            });
            _this4.$myLoading.endLoading();
          });
        }).catch(function () {});
      } else if (type == 4) {
        this.getDatainfo(item);
        this.isShowRote = true;
      }
    },

    //获取角色详情
    getDatainfo: function getDatainfo(item) {
      var _this5 = this;

      this.$http.getHttp(this.$API.roleDetail + "?id=" + item.id, function (data) {
        _this5.newUpdataInfo = data.data.role;
        _this5.dataBtn = data.data.roleAuthList;
        _this5.getShowTreeId(data.data.roleAuthList);
      });
    },
    getShowTreeId: function getShowTreeId(datas) {
      var list = [];
      for (var i in datas) {
        var items = datas[i];
        if (items.visible) {
          list.push(items.id);
        }
        if (items.childMenus && items.childMenus.length > 0) {
          for (var j in items.childMenus) {
            var item = items.childMenus[j];
            if (item.visible) {
              list.push(item.id);
            }
            if (item.childMenus && item.childMenus.length > 0) {
              for (var k in item.childMenus) {
                var ite = item.childMenus[k];
                if (ite.visible) {
                  list.push(ite.id);
                }
              }
            }
          }
        }
      }
      this.cheacedIdShow = list;
    },

    //修改角色信息
    updataInfo: function updataInfo() {
      var _this6 = this;

      var params = {
        id: this.newUpdataInfo.id,
        name: this.ruleForm.name,
        comment: this.ruleForm.note
      };

      this.$http.postHttp(this.$API.roleUpdate, params, function (data) {
        if (data) {
          _this6.isAddInfo = false;
          _this6.$notify({
            title: '角色修改成功',
            message: '',
            type: 'success'
          });
          _this6.initDatas();
        }
      });
    },

    //添加角色信息
    addInfo: function addInfo() {
      var _this7 = this;

      var params = {
        name: this.ruleForm.name,
        comment: this.ruleForm.note
      };

      this.$http.postHttp(this.$API.roleAdd, params, function (data) {
        if (data) {
          _this7.isAddInfo = false;
          _this7.$notify({
            title: '角色添加成功',
            message: '',
            type: 'success'
          });
          _this7.initDatas();
        }
      });
    }
  }
};

/***/ }),

/***/ 778:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(779);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("239e393e", content, true, {});

/***/ }),

/***/ 779:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".mask[data-v-2a92d369]{position:absolute;width:100%;height:100%;margin-left:-10px;background:rgba(0,0,0,.3);z-index:10;right:0}.mask .margin[data-v-2a92d369]{width:400px;background:#fff;border-radius:5px;margin:20% auto;padding:20px;position:relative}.mask .margin .close[data-v-2a92d369]{position:absolute;top:10px;right:10px;font-size:25px;color:#999}.mask .margin .header[data-v-2a92d369]{font-size:18px;color:#333;font-weight:700;text-align:center}.mask .margin .header.bottom[data-v-2a92d369]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;padding:0 20%;margin-top:10px;border-top:1px solid #eee}.mask .margin .header.bottom p[data-v-2a92d369]{-webkit-box-flex:1;-ms-flex:1;flex:1;margin:10px 0;font-size:14px;height:30px;font-weight:400;border-bottom:1px solid #eee;cursor:pointer}.mask .margin .header.bottom p.active[data-v-2a92d369]{color:#324fc4}.mask .margin .from[data-v-2a92d369]{margin-top:20px}.mask .margin .bottom .tree[data-v-2a92d369]{text-align:center;padding-left:100px}.mask .margin .bottom .button[data-v-2a92d369]{margin-top:50px}.realTimeData[data-v-2a92d369]{display:-webkit-box;display:-ms-flexbox;display:flex;height:100%;overflow:hidden}.realTimeData .content[data-v-2a92d369]{-webkit-box-flex:1;-ms-flex:1;flex:1;overflow:auto}.realTimeData .content .header[data-v-2a92d369]{padding:20px 20px 10px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.realTimeData .content .header .el-input[data-v-2a92d369]{width:240px}.realTimeData .content .header div[data-v-2a92d369]{display:-webkit-box;display:-ms-flexbox;display:flex}.realTimeData .content .header div i[data-v-2a92d369]{font-size:18px;margin-left:20px;cursor:pointer}.realTimeData .content .figure[data-v-2a92d369]{height:85%;padding:10px 20px}.realTimeData .content .figure .block[data-v-2a92d369]{text-align:center}.el-pagination[data-v-2a92d369]{float:none;margin:0 auto;text-align:center}", ""]);

// exports


/***/ }),

/***/ 780:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"realTimeData"},[_c('div',{staticClass:"content"},[_c('div',{staticClass:"header"},[_c('div',[_c('el-input',{attrs:{"placeholder":"请输入角色名称","size":"small","suffix-icon":"el-icon-search"},model:{value:(_vm.filterText),callback:function ($$v) {_vm.filterText=$$v},expression:"filterText"}}),_vm._v(" "),_c('el-button',{staticStyle:{"margin-left":"20px"},attrs:{"size":"small","type":"primary"},on:{"click":function($event){_vm.initDatas()}}},[_vm._v("搜索")])],1),_vm._v(" "),(_vm.ifShow(0))?_c('div',[_c('i',{staticClass:"el el-icon-circle-plus-outline",attrs:{"title":"添加角色"},on:{"click":function($event){_vm.operati(1)}}})]):_vm._e()]),_vm._v(" "),_c('div',{staticClass:"figure"},[_c('el-table',{staticClass:"tableData",staticStyle:{"width":"100%"},attrs:{"data":_vm.tableData,"height":"100%","stripe":true}},[_c('el-table-column',{attrs:{"prop":"id","label":"序号"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"name","label":"角色名称"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"createDate","label":"创建时间"}}),_vm._v(" "),_c('el-table-column',{attrs:{"prop":"createName","label":"创建人"}}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作","fixed":"right"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(_vm.ifShow(2))?_c('el-button',{attrs:{"type":"text","size":"small"},on:{"click":function($event){_vm.operati(2,scope.row)}}},[_vm._v("编辑")]):_vm._e(),_vm._v(" "),(_vm.ifShow(1))?_c('el-button',{attrs:{"type":"text","size":"small"},on:{"click":function($event){_vm.operati(3,scope.row)}}},[_vm._v("删除")]):_vm._e(),_vm._v(" "),(_vm.ifShow(3))?_c('el-button',{attrs:{"type":"text","size":"small"},on:{"click":function($event){_vm.operati(4,scope.row)}}},[_vm._v("权限分配")]):_vm._e()]}}])})],1)],1),_vm._v(" "),_c('el-pagination',{attrs:{"background":"","current-page":_vm.pageNum,"page-size":_vm.$global.pageLimit,"layout":"prev, pager, next","total":_vm.total},on:{"current-change":_vm.handleCurrentChange}})],1),_vm._v(" "),(_vm.isAddInfo)?_c('div',{staticClass:"mask"},[_c('div',{staticClass:"margin"},[_c('i',{staticClass:"el el-icon-circle-close close",on:{"click":function($event){_vm.isAddInfo = false}}}),_vm._v(" "),_c('div',{staticClass:"header"},[_vm._v(_vm._s(_vm.tipTitle))]),_vm._v(" "),_c('div',{staticClass:"from"},[_c('el-form',{ref:"ruleForms",staticClass:"demo-ruleForm",attrs:{"model":_vm.ruleForm,"rules":_vm.rules,"label-width":"100px"}},[_c('el-form-item',{attrs:{"label":"角色名称","prop":"name"}},[_c('el-input',{model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"备注"}},[_c('el-input',{attrs:{"type":"textarea"},model:{value:(_vm.ruleForm.note),callback:function ($$v) {_vm.$set(_vm.ruleForm, "note", $$v)},expression:"ruleForm.note"}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"button"},[_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.submitTop('ruleForms')}}},[_vm._v("确认")]),_vm._v(" "),_c('el-button',{on:{"click":function($event){_vm.isAddInfo = !_vm.isAddInfo}}},[_vm._v("取消")])],1)],1)],1)])]):_vm._e(),_vm._v(" "),(_vm.isShowRote)?_c('div',{staticClass:"mask"},[_c('div',{staticClass:"margin"},[_c('i',{staticClass:"el el-icon-circle-close close",on:{"click":_vm.cloneTip}}),_vm._v(" "),_c('div',{staticClass:"header"},[_vm._v("权限分配 -- 超级管理员")]),_vm._v(" "),_c('div',{staticClass:"from bottom"},[_c('el-form',{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{"model":_vm.ruleForm,"rules":_vm.rules,"label-width":"100px"}},[_c('div',{staticClass:"tree"},[_c('el-tree',{ref:"tree",attrs:{"data":_vm.dataBtn,"show-checkbox":"","props":_vm.defaultProps,"accordion":"","node-key":"id","check-strictly":false,"default-checked-keys":_vm.cheacedIdShow},on:{"check":_vm.treeChange}})],1),_vm._v(" "),_c('el-form-item',{staticClass:"button"},[_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.submitForm('ruleForm')}}},[_vm._v("确认")]),_vm._v(" "),_c('el-button',{on:{"click":_vm.cloneTip}},[_vm._v("取消")])],1)],1)],1)])]):_vm._e()])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});