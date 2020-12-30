webpackJsonp([39],{

/***/ 404:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_alertSample_vue__ = __webpack_require__(686);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_alertSample_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_alertSample_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_alertSample_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_alertSample_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d11c0794_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_alertSample_vue__ = __webpack_require__(892);
function injectStyle (ssrContext) {
  __webpack_require__(890)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-d11c0794"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_alertSample_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_d11c0794_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_alertSample_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 686:
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
            markdown_1: ['#### 调用方式：', '```javascript', 'this.$myPop.alertBox("我是标题","我是内容",() => {', '   console.log("点击了确认按钮...")', '});', '```', '#### 参数说明：', '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数1：弹窗的标题名称</p>', '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数2：弹窗的内容文字（HTML标签不生效）</p>', '<p style="margin-top:10px"><b style="color:grey">（非必传）</b>参数3：点击确认时的回调函数</p>'].join("\n"),

            markdown_2: ['#### 调用方式：', '```javascript', 'this.$myPop.confirmBox("确认提示","你确定要这么做吗？",()=>{', '   console.log("我确定喔...")', '},() => {', '   console.log("点击了取消...")', '});', '```', '#### 参数说明：', '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数1：弹窗的标题名称</p>', '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数2：弹窗的内容文字（HTML标签不生效）</p>', '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数3：点击确认时的回调函数</p>', '<p style="margin-top:10px"><b style="color:grey">（非必传）</b>参数4：点击取消时的回调函数</p>'].join("\n"),

            markdown_3: ['#### 调用方式：', '```javascript', 'this.$myPop.confirmHTMLBox("确认提示","<h1>我是一个包含H1标签的内容</h1>",() => {', '   console.log("点击了确认按钮...")', '});', '```', '#### 参数说明：', '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数1：弹窗的标题名称</p>', '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数2：弹窗的内容文字</p>', '<p style="margin-top:10px"><b style="color:grey">（非必传）</b>参数3：点击确认时的回调函数</p>'].join("\n"),

            markdown_4: ['#### 调用方式：', '```javascript', 'this.$myPop.confirmHTMLBox("确认提示","<h1>我是一个H1标签的确认内容</h1>",() => {', '   console.log("我确定喔...")', '},() => {', '   console.log("点击了取消...")', '});', '```', '#### 参数说明：', '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数1：弹窗的标题名称</p>', '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数2：弹窗的内容文字</p>', '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数3：点击确认时的回调函数</p>', '<p style="margin-top:10px"><b style="color:grey">（非必传）</b>参数4：点击取消时的回调函数</p>'].join("\n"),

            markdown_5: ['#### 调用方式：', '```javascript', 'this.$myPop.submitPopBox("更新手机号码","您可以输入您的新手机号码，进行更新操作",/\d{11}$/,"手机号码格式不正确",(v) => {', '   console.log("输入的手机号码为：" + v)', '},() => {', '   console.log("点击了取消...")', '});', '```', '#### 参数说明：', '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数1：弹窗的标题名称</p>', '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数2：弹窗的提示文字</p>', '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数3：输入框的正则验证规则</p>', '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数4：输入框的默认提示内容</p>', '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数5：点击确定时的回调函数，参数1：输入的内容</p>', '<p style="margin-top:10px"><b style="color:grey">（非必传）</b>参数6：点击取消时的回调函数</p>'].join("\n")

        };
    },

    //初始化函数
    mounted: function mounted() {

        var converter = new showdown.Converter();
        var htmlcontent_1 = converter.makeHtml(this.markdown_1);
        var htmlcontent_2 = converter.makeHtml(this.markdown_2);
        var htmlcontent_3 = converter.makeHtml(this.markdown_3);
        var htmlcontent_4 = converter.makeHtml(this.markdown_4);
        var htmlcontent_5 = converter.makeHtml(this.markdown_5);
        $("#markdown_1").html(htmlcontent_1);
        $("#markdown_2").html(htmlcontent_2);
        $("#markdown_3").html(htmlcontent_3);
        $("#markdown_4").html(htmlcontent_4);
        $("#markdown_5").html(htmlcontent_5);
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
            this.$myPop.alertBox("我是标题", "我是内容", function () {
                console.log("点击了确认按钮");
            });
        },
        markdown_2_click: function markdown_2_click() {
            this.$myPop.confirmBox("确认提示", "你确定要这么做吗？", function () {
                console.log("我确定喔...");
            }, function () {
                console.log("点击了取消...");
            });
        },
        markdown_3_click: function markdown_3_click() {
            this.$myPop.alertHtmlBox("我是标题", "<h1>我是一个H1标签的内容</h1>", function () {
                console.log("点击了确认按钮");
            });
        },
        markdown_4_click: function markdown_4_click() {
            this.$myPop.confirmHTMLBox("确认提示", "<h1>我是一个H1标签的确认内容</h1>", function () {
                console.log("我确定喔...");
            }, function () {
                console.log("点击了取消...");
            });
        },
        markdown_5_click: function markdown_5_click() {
            this.$myPop.submitPopBox("更新手机号码", "您可以输入您的新手机号码，进行更新操作", /\d{11}$/, "手机号码格式不正确", function (v) {
                console.log(v);
            }, function () {
                console.log("点击了取消...");
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

/***/ 890:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(891);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("32cd34f0", content, true, {});

/***/ }),

/***/ 891:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".sampleItem[data-v-d11c0794]{width:100%;height:auto;padding-left:5px;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-o-box-sizing:border-box;-ms-box-sizing:border-box}.sampleItem .sampleTitleBox[data-v-d11c0794]{width:100%;margin-top:20px;height:auto}.sampleItem .sampleTitle[data-v-d11c0794]{width:auto;font-size:16px;font-weight:700}.sampleItem .sampleTitle i[data-v-d11c0794]{font-size:12px;color:orange;margin-right:5px;position:relative;top:-2px}.sampleItem .sampleContentBox[data-v-d11c0794]{width:100%;height:auto;margin-top:10px}.sampleItem .sampleContentBox .sampleContent[data-v-d11c0794]{width:100%;background:#f5f5f5;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-o-box-sizing:border-box;-ms-box-sizing:border-box;padding:10px;border-radius:5px}", ""]);

// exports


/***/ }),

/***/ 892:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"sampleItem"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"sampleContentBox"},[_c('el-button',{on:{"click":_vm.markdown_1_click}},[_vm._v("普通弹出窗")])],1),_vm._v(" "),_vm._m(1),_vm._v(" "),_vm._m(2),_vm._v(" "),_c('div',{staticClass:"sampleContentBox"},[_c('el-button',{on:{"click":_vm.markdown_2_click}},[_vm._v("带确认弹出框")])],1),_vm._v(" "),_vm._m(3),_vm._v(" "),_vm._m(4),_vm._v(" "),_c('div',{staticClass:"sampleContentBox"},[_c('el-button',{on:{"click":_vm.markdown_3_click}},[_vm._v("可以写HTML的普通弹出框")])],1),_vm._v(" "),_vm._m(5),_vm._v(" "),_vm._m(6),_vm._v(" "),_c('div',{staticClass:"sampleContentBox"},[_c('el-button',{on:{"click":_vm.markdown_4_click}},[_vm._v("可以写HTML的确认弹出框")])],1),_vm._v(" "),_vm._m(7),_vm._v(" "),_vm._m(8),_vm._v(" "),_c('div',{staticClass:"sampleContentBox"},[_c('el-button',{on:{"click":_vm.markdown_5_click}},[_vm._v("输入内容的提交弹框")])],1),_vm._v(" "),_vm._m(9)])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sampleTitleBox",staticStyle:{"margin":"0px"}},[_c('div',{staticClass:"sampleTitle"},[_vm._v("示例一：普通弹出框")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sampleContentBox"},[_c('div',{staticClass:"sampleContent",attrs:{"id":"markdown_1"}})])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sampleTitleBox",staticStyle:{"margin-top":"50px"}},[_c('div',{staticClass:"sampleTitle"},[_vm._v("示例二：带确认弹出框")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sampleContentBox"},[_c('div',{staticClass:"sampleContent",attrs:{"id":"markdown_2"}})])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sampleTitleBox",staticStyle:{"margin-top":"50px"}},[_c('div',{staticClass:"sampleTitle"},[_vm._v("示例三：可以写HTML的普通弹出框")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sampleContentBox"},[_c('div',{staticClass:"sampleContent",attrs:{"id":"markdown_3"}})])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sampleTitleBox",staticStyle:{"margin-top":"50px"}},[_c('div',{staticClass:"sampleTitle"},[_vm._v("示例四：可以写HTML的确认弹出框")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sampleContentBox"},[_c('div',{staticClass:"sampleContent",attrs:{"id":"markdown_4"}})])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sampleTitleBox",staticStyle:{"margin-top":"50px"}},[_c('div',{staticClass:"sampleTitle"},[_vm._v("示例五：输入内容的提交弹框")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sampleContentBox"},[_c('div',{staticClass:"sampleContent",attrs:{"id":"markdown_5"}})])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});