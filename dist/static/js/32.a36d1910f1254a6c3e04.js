webpackJsonp([32],{

/***/ 408:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_uploadSamle_vue__ = __webpack_require__(690);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_uploadSamle_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_uploadSamle_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_uploadSamle_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_uploadSamle_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a479181c_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_uploadSamle_vue__ = __webpack_require__(904);
function injectStyle (ssrContext) {
  __webpack_require__(902)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-a479181c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_uploadSamle_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a479181c_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_uploadSamle_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 690:
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
      //预览图
      previewImage: "",
      uploadFile: "",
      isShowCropper: false,

      markdown_1: ["#### 调用方式：", "```HTML", '<upload-image :preview="previewImage" v-on:cropperImage="cropperImageClick" v-on:uploadImageChange="uploadChange"></upload-image>', "```", "#### 参数说明：", '<p style="margin-top:10px">事件 uploadImageChange ：点击上传后的事件函数 ，事件参数1：返回文件对象</p>', '<p style="margin-top:10px">事件 cropperImage ：点击触发裁切事件，如需要进行裁切操作，可以调用E-D提供的裁切组件，在回调事件中使用如下方法：</p>', '<p style="margin-top:10px">属性 preview：预览的图片地址</p>', '<p style="margin-top:10px"></p>', '#### 裁切调用方式：', '```javascript', 'this.$cropperImage({', ' //裁切完成后回调函数', ' cropperImageResult(file){', '    //file为裁切完成后的图片对象', ' },', ' //要裁切的图片地址', ' imgUrl:"http://127.0.0.1:8008/images/1.png"', '})', '```'].join("\n"),

      markdown_2: ["#### 调用方式：", "```HTML", '<upload-file :fileName="uploadFile" v-on:uploadFileChange="uploadFileChange"></upload-file>', "```", "#### 参数说明：", '<p style="margin-top:10px">事件 uploadFileChange：点击上传后的事件函数 ，事件参数1：返回文件对象</p>', '<p style="margin-top:10px">属性 fileName：上传后的文件名</p>'].join("\n")

    };
  },

  //初始化函数
  mounted: function mounted() {

    var converter = new showdown.Converter();
    var htmlcontent_1 = converter.makeHtml(this.markdown_1);
    var htmlcontent_2 = converter.makeHtml(this.markdown_2);
    $("#markdown_1").html(htmlcontent_1);
    $("#markdown_2").html(htmlcontent_2);
    $("pre code").each(function (i, block) {
      hljs.highlightBlock(block);
    });
  },

  //计算属性
  computed: {},
  //组件方法
  methods: {
    uploadImageChange: function uploadImageChange(e) {
      var _this = this;

      var fileObj = e.target.files[0];
      this.$http.Aliyun_uploadImageHttp(fileObj, {}, function (rs) {
        _this.previewImage = rs.result.url;
      });
    },
    uploadFileChange: function uploadFileChange(e) {
      var _this2 = this;

      var fileObj = e.target.files[0];
      this.$http.ED_uploadFileHttp(fileObj, {}, function (rs) {
        _this2.uploadFile = fileObj.name;
      });
    },
    cropperImageClick: function cropperImageClick() {

      var that = this;
      this.$cropperImage({
        //裁切完成后回调函数
        cropperImageResult: function cropperImageResult(file) {
          that.$http.EasyD_uploadImageHttp(file, {}, function (rs) {
            that.previewImage = rs.result.url;
          });
        },

        //要裁切的图片
        imgUrl: this.previewImage
      });
    },
    cropperImageChange: function cropperImageChange(data) {
      var _this3 = this;

      this.$http.EasyD_uploadImageHttp(data, {}, function (rs) {
        _this3.previewImage = rs.result.url;
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)))

/***/ }),

/***/ 902:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(903);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("56282efb", content, true, {});

/***/ }),

/***/ 903:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".sampleItem[data-v-a479181c]{width:100%;height:auto;padding-left:5px;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-o-box-sizing:border-box;-ms-box-sizing:border-box}.sampleItem .sampleTitleBox[data-v-a479181c]{width:100%;margin-top:20px;height:auto}.sampleItem .sampleTitle[data-v-a479181c]{width:auto;font-size:16px;font-weight:700}.sampleItem .sampleTitle i[data-v-a479181c]{font-size:12px;color:orange;margin-right:5px;position:relative;top:-2px}.sampleItem .sampleContentBox[data-v-a479181c]{width:100%;height:auto;margin-top:10px}.sampleItem .sampleContentBox .sampleContent[data-v-a479181c]{width:100%;background:#f5f5f5;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-o-box-sizing:border-box;-ms-box-sizing:border-box;padding:10px;border-radius:5px}", ""]);

// exports


/***/ }),

/***/ 904:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"sampleItem"},[_vm._m(0),_vm._v(" "),_c('div',{staticClass:"sampleContentBox"},[_c('upload-image',{attrs:{"preview":_vm.previewImage},on:{"cropperImage":_vm.cropperImageClick,"uploadImageChange":_vm.uploadImageChange}})],1),_vm._v(" "),_vm._m(1),_vm._v(" "),_vm._m(2),_vm._v(" "),_c('div',{staticClass:"sampleContentBox"},[_c('upload-file',{attrs:{"fileName":_vm.uploadFile},on:{"uploadFileChange":_vm.uploadFileChange}})],1),_vm._v(" "),_vm._m(3)])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sampleTitleBox",staticStyle:{"margin":"0px"}},[_c('div',{staticClass:"sampleTitle"},[_vm._v("示例一：上传图片")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sampleContentBox"},[_c('div',{staticClass:"sampleContent",attrs:{"id":"markdown_1"}})])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sampleTitleBox",staticStyle:{"margin-top":"50px"}},[_c('div',{staticClass:"sampleTitle"},[_vm._v("示例二：上传文件")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sampleContentBox"},[_c('div',{staticClass:"sampleContent",attrs:{"id":"markdown_2"}})])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});