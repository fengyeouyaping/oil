webpackJsonp([36],{

/***/ 412:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_listTypePageSample_vue__ = __webpack_require__(696);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_listTypePageSample_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_listTypePageSample_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_listTypePageSample_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_listTypePageSample_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5c502864_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_listTypePageSample_vue__ = __webpack_require__(921);
function injectStyle (ssrContext) {
  __webpack_require__(919)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-5c502864"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_listTypePageSample_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5c502864_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_listTypePageSample_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 696:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vuex = __webpack_require__(9);

exports.default = {
    //数据源
    data: function data() {
        return {
            markdown_1: ['```javascript', '//表头，在表头的菜单中可以添加多个按钮', '<div class="tableHeader">', '   <div class="tableHeaderTitle">新闻列表</div>', '   <div class="tableHeaderMenu">', '       <el-button-group>', '           <el-button icon="el-icon-refresh" @click="refreshData" size="mini"></el-button>', '       </el-button-group>', '   </div>', '</div>', '', "<!--表内容-->", '<el-table ref="multipleTable" :data="newsInfoData" tooltip-effect="dark" style="width: 100%">', '   <el-table-column prop="ni_id" label="新闻ID" width="80"></el-table-column>', '   <el-table-column :show-overflow-tooltip="true" prop="ni_title" label="新闻标题"></el-table-column>', '   <el-table-column prop="u_nickname" label="发布人"></el-table-column>', '   <el-table-column prop="ni_status" label="状态">', '       <template slot-scope="scope">', '           <b v-if="scope.row.ni_status == 0" style="color:gery">未审核</b>', '           <b v-if="scope.row.ni_status == 1" style="color:green">已通过</b>', '           <b v-if="scope.row.ni_status == 2" style="color:red">未通过</b>', '       </template>', '   </el-table-column>', '   <el-table-column prop="nc_name" label="所属类别"></el-table-column>', '   <el-table-column label="操作" fixed="right" width="260">', '       <template slot-scope="scope">', '           <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>', '           <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>', '       </template>', '   </el-table-column>', '</el-table>', '', '<!--分页-->', '<el-col :span="24">', '   <el-pagination', '       @size-change="handleSizeChange"', '       @current-change="handleCurrentChange"', '       :current-page="pagination.currentPage"', '       :page-sizes="[20,50,100,200]"', '       :page-size="pagination.pageSize"', '       layout="total, sizes, prev, pager, next, jumper"', '       :total="pagination.dataLength"', '   ></el-pagination>', '</el-col>', '```'].join("\n"),
            markdown_2: ['```javascript', 'mounted() {', '   //获取新闻列表', '   this.initData()', '}', 'computed: {', '   ...mapState({', '       //参考代码（新闻列表数据）', '       newsInfoData : state => state.listModule.newsInfoData,', '       /**分页项变量（module中的对象）', '           pagination   : {', '               currentPage  : 1,', '               pageSize     : 20,', '               dataLength   : 0,', '               skip         : 0', '           }', '       **/', '       pagination   : state => state.listModule.pagination', '   })', '}', 'methods : {', '', '   //映射列表更新数据方法', '   ...mapMutations(["newsInfoListModule/updateNewsInfoData"]),', '', '   //获取新闻列表数据（参考代码）', '   initData() {', '       this.$myLoading.startLoading()', '       this.$http.getHttp(', '           this.$API.newsSearchDetail +', '           "/skip/" + this.pagination.skip +', '           "/limit/" + this.pagination.pageSize +', '           "/count/1/ni_is_delete/0/sort_order/ni_id-desc"', '           rs => {', '               this.$myLoading.endLoading()', '               this["newsInfoListModule/updateNewsInfoData"](rs.data)', '               this.pagination.dataLength = parseInt(rs.count)', '           }', '       )', '   }', '', '   //刷新列表方法', '   refreshData(){', '       //重新获取数据方法', '       this.initData()', '   }', '', '   //编辑列表项（参考方法）', '   handleEdit(index,item){', '       this.$router.push({', '           path: "/editNewsInfo",', '           query : {', '               ni_id : item.ni_id', '           }', '       })', '   }', '', '   //删除列表项（参考方法）', '   handleDelete(index,item){', '       var params = {', '           delete_where : "ni_id",', '           ni_id        : item.ni_id,', '           ni_is_delete : 1', '       }', '       this.$myPop.confirmBox("确认操作","确定要删除该新闻吗？",()=>{', '           this.$myLoading.startLoading()', '           this.$http.postHttp(', '               this.$API.newsDelete,', '               params,', '               rs => {', '                   this.$myLoading.endLoading()', '                   this.$myPop.SuccessMessage()', '                   this.initData()', '               }', '           )', '       })', '   }', '', '}', '```'].join("\n")
        };
    },

    //初始化函数
    mounted: function mounted() {
        var converter = new showdown.Converter();
        var htmlcontent_1 = converter.makeHtml(this.markdown_1);
        var htmlcontent_2 = converter.makeHtml(this.markdown_2);
        $("#markdown_1").html(htmlcontent_1);
        $("#markdown_2").html(htmlcontent_2);
        $('pre code').each(function (i, block) {
            hljs.highlightBlock(block);
        });
    },

    //计算属性
    computed: {
        // ...mapState({ })
    },
    //组件方法
    methods: {
        // ...mapMutations()
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)))

/***/ }),

/***/ 919:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(920);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("500bc726", content, true, {});

/***/ }),

/***/ 920:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".sampleItem[data-v-5c502864]{width:100%;height:auto;padding-left:5px;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-o-box-sizing:border-box;-ms-box-sizing:border-box}.sampleItem .sampleTitleBox[data-v-5c502864]{width:100%;margin-top:20px;height:auto}.sampleItem .sampleTitle[data-v-5c502864]{width:auto;font-size:16px;font-weight:700}.sampleItem .sampleTitle i[data-v-5c502864]{font-size:12px;color:orange;margin-right:5px;position:relative;top:-2px}.sampleItem .sampleContentBox[data-v-5c502864]{width:100%;height:auto;margin-top:10px}.sampleItem .sampleContentBox .sampleContent[data-v-5c502864]{width:100%;background:#f5f5f5;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-o-box-sizing:border-box;-ms-box-sizing:border-box;padding:10px;border-radius:5px}", ""]);

// exports


/***/ }),

/***/ 921:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"sampleItem"},[_c('div',{staticClass:"sampleTitleBox",staticStyle:{"margin":"0px"}},[_c('div',{staticClass:"sampleTitle"},[_vm._v("HTML部分：")])]),_vm._v(" "),_c('div',{staticClass:"sampleContentBox"},[_c('div',{staticClass:"sampleContent",attrs:{"id":"markdown_1"}})]),_vm._v(" "),_c('div',{staticClass:"sampleTitleBox",staticStyle:{"margin-top":"50px"}},[_c('div',{staticClass:"sampleTitle"},[_vm._v("JS部分：")])]),_vm._v(" "),_c('div',{staticClass:"sampleContentBox"},[_c('div',{staticClass:"sampleContent",attrs:{"id":"markdown_2"}})])])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});