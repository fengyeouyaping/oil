webpackJsonp([37],{

/***/ 410:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_inputTypePageSample_vue__ = __webpack_require__(674);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_inputTypePageSample_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_inputTypePageSample_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_inputTypePageSample_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_inputTypePageSample_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_095cd6f0_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_inputTypePageSample_vue__ = __webpack_require__(892);
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
var __vue_scopeId__ = "data-v-095cd6f0"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_inputTypePageSample_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_095cd6f0_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_inputTypePageSample_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 674:
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
            markdown_1: ['```javascript', '//表单容器', '<el-form :model="form" :rules="rules" label-position="right" ref="form" label-width="160px">', '', '   <!--单行录入示例-->', '   <el-form-item label="姓名：" prop="name">', '       <el-col :span="8">', '           <el-input v-model="form.name" placeholder="请输入名称"></el-input>', '       </el-col>', '   </el-form-item>', '', '   <!--多行录入示例-->', '   <el-form-item label="用户描述：" prop="desc">', '       <el-col :span="8">', '           <el-input type="textarea" v-model="form.desc" rows="5" placeholder="请输入用户描述"></el-input>', '       </el-col>', '   </el-form-item>', '', '   <!--下拉框选择示例-->', '   <el-form-item label="所属类别：" prop="category">', '       <el-col :span="8">', '           <el-select v-model="form.category" placeholder="请选择所属类别">', '               <el-option', '                   v-for="item in categoryData"', '                       :key="item.id"', '                       :label="item.name"', '                       :value="item.id">', '               </el-option>', '           </el-select>', '       </el-col>', '   </el-form-item>', '', '   <!--单选框示例-->', '   <el-form-item label="性别：" prop="sex">', '       <el-col :span="15">', '           <el-radio v-model="form.sex" label="0" >男</el-radio>', '           <el-radio v-model="form.sex" label="1" >女</el-radio>', '       </el-col>', '   </el-form-item>', '', '   <!--多选框示例-->', '   <el-form-item label="爱好" prop="hobby">', '       <el-checkbox-group v-model="form.hobby">', '           <el-checkbox label="篮球"></el-checkbox>', '           <el-checkbox label="足球"></el-checkbox>', '           <el-checkbox label="电竞"></el-checkbox>', '       </el-checkbox-group>', '   </el-form-item>', '', '   <!--图片上传示例-->', '   <el-form-item label="用户头像：" prop="headerImage">', '       <el-col :span="8">', '           <upload-image :preview="form.headerImage" v-on:cropperImage="cropperImageClick" v-on:uploadImageChange="uploadImageChange"></upload-image>', '       </el-col>', '   </el-form-item>', '', '   <!--富文本示例-->', '   <el-form-item label="用户详情：" prop="content">', '       <el-col :span="24">', '           <div id="editorElement" style="text-align:left"></div>', '       </el-col>', '   </el-form-item>', '', '   <!--提交和重置按钮示例-->', '   <el-form-item>', '       <el-button type="primary" @click="submitForm("form")">提交</el-button>', '       <el-button @click="resetForm">重置</el-button>', '   </el-form-item>', '', '</el-form>', '```'].join("\n"),

            markdown_2: ['```javascript', '//如果需要使用富文本框，需要引入该项，不使用无需引入', "import E from 'wangeditor'", '', '//输入框验证规则代码', 'data(){', '   return {', '       rules : {', '           name : [', "               { required: true, message: '请输入姓名', trigger: 'blur' }", '           ]', '       }', '   }', '}', '', '//全局变量映射代码', 'computed: {', '   ...mapState({ ', '       form  : state => state.ModuleName.form', '   })', '}', '', 'methods: {', '', '   //全局方法映射代码', '   ...mapMutations(["ModuleName/clearForm"])', '', '   //表单提交代码', '   submitForm(form){', '', '       this.$refs[form].validate((valid) => {', '', '           if (valid) {', '', '               //处理提交表单相关逻辑', '', '           }', '', '       }', '', '   },', '', '   //图片上传代码', '   uploadImageChange(e){', '', '      //自建文件服务,EasyD文件服务', '      var fileObj = e.target.files[0];', '      this.$http.EasyD_uploadImageHttp(fileObj, {}, rs => {', '         console.log(rs)', '      }', '', '      //阿里云OSS文件服务', '      var fileObj = e.target.files[0]', '      this.$http.Aliyun_uploadImageHttp(fileObj, { dir : "2018" } ,rsUrl => {', '         console.log(rs)', '      })', '', '   },', '', '   //裁切回调函数', '   cropperImageClick(){', '       var that = this', '       this.$cropperImage({', '           //裁切完成后回调函数', '           cropperImageResult(file){', '               //自建文件服务,EasyD文件服务', '               that.$http.EasyD_uploadImageHttp(file, {}, rs => {', '                   console.log(rs)', '               })', '               //阿里云OSS文件服务', '               that.$http.Aliyun_uploadImageHttp(file, { dir : "/2018" } ,rsUrl => {', '                   console.log(rsUrl)', '               })', '           },', '           //要裁切的图片', '           imgUrl:""', '       })', '   }', '', '}', '', 'mounted() {', '   //富文本初始化（如果需要使用富文本）', '   this.editor = new E("#editorElement")', '', '   //获取富文本输入框内容', '   this.editor.customConfig.onchange = (html) => {', '       this.form.content = html', '   }', '', '   //如果使用富文本图片上传按钮的监听回调', '   this.editor.customConfig.customUploadImg = (files, insert) => {', '', '       //自建文件服务,EasyD文件服务', '       var fileObj = files[0]', '       this.$http.EasyD_uploadImageHttp(fileObj, {}, rs => {', "           this.form.content = this.form.content + '<div><img src= + rs.result.url + /></div>'", '           this.editor.txt.html(this.form.content)', '       })', '', '       //阿里云OSS文件服务', '       var fileObj = files[0]', "       this.$http.Aliyun_uploadImageHttp(fileObj, { dir : '2018' } ,rs => {", "           this.form.content = this.form.content + '<div><img src= + rs + /></div>'", '           this.editor.txt.html(this.form.content)', '       })', '', '   }', '', '   //使用富文本', '   this.editor.create()', '}', '', '```'].join("\n")

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
var update = __webpack_require__(4)("7f1efdfa", content, true, {});

/***/ }),

/***/ 891:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".sampleItem[data-v-095cd6f0]{width:100%;height:auto;padding-left:5px;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-o-box-sizing:border-box;-ms-box-sizing:border-box}.sampleItem .sampleTitleBox[data-v-095cd6f0]{width:100%;margin-top:20px;height:auto}.sampleItem .sampleTitle[data-v-095cd6f0]{width:auto;font-size:16px;font-weight:700}.sampleItem .sampleTitle i[data-v-095cd6f0]{font-size:12px;color:orange;margin-right:5px;position:relative;top:-2px}.sampleItem .sampleContentBox[data-v-095cd6f0]{width:100%;height:auto;margin-top:10px}.sampleItem .sampleContentBox .sampleContent[data-v-095cd6f0]{width:100%;background:#f5f5f5;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;-o-box-sizing:border-box;-ms-box-sizing:border-box;padding:10px;border-radius:5px}", ""]);

// exports


/***/ }),

/***/ 892:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"sampleItem"},[_c('div',{staticClass:"sampleTitleBox",staticStyle:{"margin":"0px"}},[_c('div',{staticClass:"sampleTitle"},[_vm._v("HTML部分：")])]),_vm._v(" "),_c('div',{staticClass:"sampleContentBox"},[_c('div',{staticClass:"sampleContent",attrs:{"id":"markdown_1"}})]),_vm._v(" "),_c('div',{staticClass:"sampleTitleBox",staticStyle:{"margin-top":"50px"}},[_c('div',{staticClass:"sampleTitle"},[_vm._v("JS部分：")])]),_vm._v(" "),_c('div',{staticClass:"sampleContentBox"},[_c('div',{staticClass:"sampleContent",attrs:{"id":"markdown_2"}})])])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});