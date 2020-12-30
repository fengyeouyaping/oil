webpackJsonp([35],{

/***/ 406:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_actionLoadingSample_vue__ = __webpack_require__(688);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_actionLoadingSample_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_actionLoadingSample_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_actionLoadingSample_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_actionLoadingSample_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d7e95cec_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_actionLoadingSample_vue__ = __webpack_require__(898);
function injectStyle (ssrContext) {
  __webpack_require__(896)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-d7e95cec"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_actionLoadingSample_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d7e95cec_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_actionLoadingSample_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 688:
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
            markdown_1: ['#### 调用方式：', '```javascript', 'this.$myLoading.startLoading("数据加载中...");', '```', '#### 参数说明：', '<p style="margin-top:10px"><b style="color:grey">（非必传）</b>参数1：提示内容，（默认为：数据加载中...）</p>'].join("\n"),

            markdown_2: ['#### 调用方式：', '```javascript', 'this.$myLoading.endLoading();', '```', '#### 参数说明：', '<p style="margin-top:10px"><b style="color:grey">无所需参数信息</p>'].join("\n")

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
        markdown_1_click: function markdown_1_click() {
            var _this = this;

            this.$myLoading.startLoading();
            setTimeout(function () {
                _this.$myLoading.endLoading();
            }, 2000);
        },
        markdown_2_click: function markdown_2_click() {
            this.$myLoading.endLoading();
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
//
//
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)))

/***/ }),

/***/ 896:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(897);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("35d85314", content, true, {});

/***/ }),

/***/ 897:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".sampleItem[data-v-d7e95cec]{width:100%;height:auto;padding-left:5px;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-o-box-sizing:border-box;-ms-box-sizing:border-box}.sampleItem .sampleTitleBox[data-v-d7e95cec]{width:100%;margin-top:20px;height:auto}.sampleItem .sampleTitle[data-v-d7e95cec]{width:auto;font-size:16px;font-weight:700}.sampleItem .sampleTitle i[data-v-d7e95cec]{font-size:12px;color:orange;margin-right:5px;position:relative;top:-2px}.sampleItem .sampleContentBox[data-v-d7e95cec]{width:100%;height:auto;margin-top:10px}.sampleItem .sampleContentBox .sampleContent[data-v-d7e95cec]{width:100%;background:#f5f5f5;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-o-box-sizing:border-box;-ms-box-sizing:border-box;padding:10px;border-radius:5px}", ""]);

// exports


/***/ }),

/***/ 898:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"sampleItem"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"sampleContentBox"},[_c('el-button',{on:{"click":_vm.markdown_1_click}},[_vm._v("开始加载")])],1),_vm._v(" "),_vm._m(1),_vm._v(" "),_vm._m(2),_vm._v(" "),_c('div',{staticClass:"sampleContentBox"},[_c('el-button',{on:{"click":_vm.markdown_2_click}},[_vm._v("关闭加载")])],1),_vm._v(" "),_vm._m(3)])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sampleTitleBox",staticStyle:{"margin":"0px"}},[_c('div',{staticClass:"sampleTitle"},[_vm._v("示例一：开始加载")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sampleContentBox"},[_c('div',{staticClass:"sampleContent",attrs:{"id":"markdown_1"}})])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sampleTitleBox",staticStyle:{"margin-top":"50px"}},[_c('div',{staticClass:"sampleTitle"},[_vm._v("示例二：关闭加载")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sampleContentBox"},[_c('div',{staticClass:"sampleContent",attrs:{"id":"markdown_2"}})])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});