webpackJsonp([44],{

/***/ 387:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editAggregationLayerApiDocs_vue__ = __webpack_require__(671);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editAggregationLayerApiDocs_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editAggregationLayerApiDocs_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editAggregationLayerApiDocs_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editAggregationLayerApiDocs_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3bcd2592_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_editAggregationLayerApiDocs_vue__ = __webpack_require__(851);
function injectStyle (ssrContext) {
  __webpack_require__(849)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3bcd2592"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editAggregationLayerApiDocs_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3bcd2592_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_editAggregationLayerApiDocs_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 671:
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    //数据源
    data: function data() {
        return {
            rules: {}
        };
    },

    //初始化函数
    mounted: function mounted() {
        var _this = this;

        //获取接口详细信息
        this.$myLoading.startLoading();
        this.$http.getHttp(this.$API.systemApiSearchAggregationApiDetail + "/bad_id/" + this.$route.query.bad_id, function (rs) {
            _this.$myLoading.endLoading();
            _this['EditAggregationLayerApiDocsModule/updateApiFormData'](rs.apiData);
            _this['EditAggregationLayerApiDocsModule/updateRequestGetParams'](rs.getArr);
            _this['EditAggregationLayerApiDocsModule/updateRequestPostParams'](rs.postArr);
        });

        //获取接口分类信息
        this.$http.getHttp(this.$API.bussinessApiDocsCategorySearch, function (rs) {
            _this['EditAggregationLayerApiDocsModule/updateCategoryData'](rs.data);
        });
    },

    //计算属性
    computed: _extends({}, (0, _vuex.mapState)({
        apiForm: function apiForm(state) {
            return state.EditAggregationLayerApiDocsModule.apiForm;
        },
        categoryData: function categoryData(state) {
            return state.EditAggregationLayerApiDocsModule.categoryData;
        },
        requestRule: function requestRule(state) {
            return state.EditAggregationLayerApiDocsModule.requestRule;
        },
        requestType: function requestType(state) {
            return state.EditAggregationLayerApiDocsModule.requestType;
        },
        requestPostParams: function requestPostParams(state) {
            return state.EditAggregationLayerApiDocsModule.requestPostParams;
        },
        requestGetParams: function requestGetParams(state) {
            return state.EditAggregationLayerApiDocsModule.requestGetParams;
        }
    })),
    //组件方法
    methods: _extends({}, (0, _vuex.mapMutations)(['updateCategoryData', 'EditAggregationLayerApiDocsModule/updateCategoryData']), (0, _vuex.mapMutations)(['updateRequestPostParams', 'EditAggregationLayerApiDocsModule/updateRequestPostParams']), (0, _vuex.mapMutations)(['updateRequestGetParams', 'EditAggregationLayerApiDocsModule/updateRequestGetParams']), (0, _vuex.mapMutations)(['updateApiFormData', 'EditAggregationLayerApiDocsModule/updateApiFormData']), {

        //新增POST请求参数
        addRequestPostParams: function addRequestPostParams() {
            this.requestPostParams.push({
                badrp_name: "",
                badrp_type: "",
                badrp_is_must: true,
                badrp_way: "BODY",
                badrp_note: "",
                badrp_rule: ""
            });
        },


        //新增GET请求参数
        addRequestGetParams: function addRequestGetParams() {
            this.requestGetParams.push({
                badrp_name: "",
                badrp_type: "",
                badrp_is_must: true,
                badrp_way: "RESTFUL",
                badrp_note: "",
                badrp_rule: ""
            });
        },


        //删除POST请求参数
        deleteRequestPostParams: function deleteRequestPostParams() {

            var newRequestPostParamsArr = this.$_.dropRight(this.requestPostParams);
            if (newRequestPostParamsArr <= 0) {
                return;
            }

            this['EditAggregationLayerApiDocsModule/updateRequestPostParams'](this.$_.dropRight(this.requestPostParams));
        },


        //删除GET请求参数
        deleteRequestGetParams: function deleteRequestGetParams() {

            var newRequestGetParamsArr = this.$_.dropRight(this.requestGetParams);
            if (newRequestGetParamsArr <= 0) {
                return;
            }

            this['EditAggregationLayerApiDocsModule/updateRequestGetParams'](this.$_.dropRight(this.requestGetParams));
        },
        submitForm: function submitForm(form) {
            var _this2 = this;

            //将参数为空的POST参数过滤掉
            var newRequestPostParams = this.requestPostParams.filter(function (item) {
                item.badrp_is_must = item.badrp_is_must == true ? 1 : 0;
                return item.badrp_name != '' && item.badrp_rule != '' && item.badrp_type != '';
            });

            //将参数为空的GET参数过滤掉
            var newRequestGetParams = this.requestGetParams.filter(function (item) {
                item.badrp_is_must = item.badrp_is_must == true ? 1 : 0;
                return item.badrp_name != '' && item.badrp_rule != '' && item.badrp_type != '';
            });

            //重新构建请求参数
            var params = this.apiForm;
            params.ap_request_params = newRequestPostParams.concat(newRequestGetParams);

            this.$myLoading.startLoading();
            this.$http.postHttp(this.$API.systemApiUpdateAggregationApiDocs, params, function (rs) {
                _this2.$myLoading.endLoading();
                _this2.$myPop.SuccessMessage();
                setTimeout(function () {
                    _this2.$router.go(-1);
                }, 1000);
            });
        }
    })
};

/***/ }),

/***/ 849:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(850);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("52efab94", content, true, {});

/***/ }),

/***/ 850:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 851:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('el-form',{ref:"apiForm",attrs:{"model":_vm.apiForm,"rules":_vm.rules,"label-position":"right","label-width":"160px"}},[_c('el-row',[_c('el-col',{staticClass:"formTitleBox",attrs:{"span":24}},[_c('i',{staticClass:"fa fa-cog fa-fw"}),_vm._v("基本信息：")])],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"所属类别：","prop":"bad_badcid"}},[_c('el-col',{attrs:{"span":8}},[_c('el-select',{attrs:{"placeholder":"请选择所属类别"},model:{value:(_vm.apiForm.bad_badcid),callback:function ($$v) {_vm.$set(_vm.apiForm, "bad_badcid", $$v)},expression:"apiForm.bad_badcid"}},_vm._l((_vm.categoryData),function(categoryItem){return _c('el-option',{key:categoryItem.badc_id,attrs:{"label":categoryItem.badc_name,"value":categoryItem.badc_id}})}))],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"接口名称：","prop":"bad_name"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"placeholder":"请输入接口名称"},model:{value:(_vm.apiForm.bad_name),callback:function ($$v) {_vm.$set(_vm.apiForm, "bad_name", $$v)},expression:"apiForm.bad_name"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"接口地址：","prop":"bad_api"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"placeholder":"请输入接口地址"},model:{value:(_vm.apiForm.bad_api),callback:function ($$v) {_vm.$set(_vm.apiForm, "bad_api", $$v)},expression:"apiForm.bad_api"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"请求方式：","prop":"bad_method"}},[_c('el-col',{attrs:{"span":15}},[_c('el-radio',{attrs:{"label":"GET"},model:{value:(_vm.apiForm.bad_method),callback:function ($$v) {_vm.$set(_vm.apiForm, "bad_method", $$v)},expression:"apiForm.bad_method"}},[_vm._v("GET")]),_vm._v(" "),_c('el-radio',{attrs:{"label":"POST"},model:{value:(_vm.apiForm.bad_method),callback:function ($$v) {_vm.$set(_vm.apiForm, "bad_method", $$v)},expression:"apiForm.bad_method"}},[_vm._v("POST")]),_vm._v(" "),_c('el-radio',{attrs:{"label":"ALL"},model:{value:(_vm.apiForm.bad_method),callback:function ($$v) {_vm.$set(_vm.apiForm, "bad_method", $$v)},expression:"apiForm.bad_method"}},[_vm._v("ALL")])],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"接口描述：","prop":"bad_desc"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"type":"textarea","rows":"5","placeholder":"请输入接口描述"},model:{value:(_vm.apiForm.bad_desc),callback:function ($$v) {_vm.$set(_vm.apiForm, "bad_desc", $$v)},expression:"apiForm.bad_desc"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"接口备注：","prop":"bad_note"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"type":"textarea","rows":"5","placeholder":"请输入接口备注"},model:{value:(_vm.apiForm.bad_note),callback:function ($$v) {_vm.$set(_vm.apiForm, "bad_note", $$v)},expression:"apiForm.bad_note"}})],1)],1),_vm._v(" "),_c('el-row',[_c('el-col',{staticClass:"formTitleBox",attrs:{"span":24}},[_c('i',{staticClass:"fa fa-cog fa-fw"}),_vm._v("GET 请求参数：\n                "),_c('i',{staticClass:"fa fa-minus-square fa-fw",staticStyle:{"float":"right","margin-top":"10px","font-size":"20px"},on:{"click":_vm.deleteRequestGetParams}}),_vm._v(" "),_c('i',{staticClass:"fa fa-plus-square fa-fw",staticStyle:{"float":"right","margin-top":"10px","font-size":"20px","margin-right":"0px"},on:{"click":_vm.addRequestGetParams}})])],1),_vm._v(" "),_vm._l((_vm.requestGetParams),function(requestItem,index){return _c('el-row',{key:index,attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":3}},[_c('el-input',{attrs:{"placeholder":"请输入参数名称"},model:{value:(requestItem.badrp_name),callback:function ($$v) {_vm.$set(requestItem, "badrp_name", $$v)},expression:"requestItem.badrp_name"}})],1),_vm._v(" "),_c('el-col',{attrs:{"span":5}},[_c('el-input',{attrs:{"placeholder":"请输入参数备注"},model:{value:(requestItem.badrp_note),callback:function ($$v) {_vm.$set(requestItem, "badrp_note", $$v)},expression:"requestItem.badrp_note"}})],1),_vm._v(" "),_c('el-col',{attrs:{"span":4}},[_vm._v("是否为必传参 \n                "),_c('el-switch',{model:{value:(requestItem.badrp_is_must),callback:function ($$v) {_vm.$set(requestItem, "badrp_is_must", $$v)},expression:"requestItem.badrp_is_must"}})],1),_vm._v(" "),_c('el-col',{attrs:{"span":6}},[_vm._v("参数类型 \n                "),_c('el-select',{attrs:{"placeholder":"请选择参数类型"},model:{value:(requestItem.badrp_type),callback:function ($$v) {_vm.$set(requestItem, "badrp_type", $$v)},expression:"requestItem.badrp_type"}},_vm._l((_vm.requestType),function(typeItem){return _c('el-option',{key:typeItem.value,attrs:{"label":typeItem.label,"value":typeItem.value}})}))],1),_vm._v(" "),_c('el-col',{staticStyle:{"text-align":"right"},attrs:{"span":6}},[_vm._v("验证规则  \n                "),_c('el-select',{attrs:{"placeholder":"请选择参数类型"},model:{value:(requestItem.badrp_rule),callback:function ($$v) {_vm.$set(requestItem, "badrp_rule", $$v)},expression:"requestItem.badrp_rule"}},_vm._l((_vm.requestRule),function(ruleItem){return _c('el-option',{key:ruleItem.value,attrs:{"label":ruleItem.label,"value":ruleItem.value}})}))],1)],1)}),_vm._v(" "),_c('el-row',[_c('el-col',{staticClass:"formTitleBox",attrs:{"span":24}},[_c('i',{staticClass:"fa fa-cog fa-fw"}),_vm._v("POST 请求参数：\n                "),_c('i',{staticClass:"fa fa-minus-square fa-fw",staticStyle:{"float":"right","margin-top":"10px","font-size":"20px"},on:{"click":_vm.deleteRequestPostParams}}),_vm._v(" "),_c('i',{staticClass:"fa fa-plus-square fa-fw",staticStyle:{"float":"right","margin-top":"10px","font-size":"20px","margin-right":"0px"},on:{"click":_vm.addRequestPostParams}})])],1),_vm._v(" "),_vm._l((_vm.requestPostParams),function(requestItem,index){return _c('el-row',{key:index,attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":3}},[_c('el-input',{attrs:{"placeholder":"请输入参数名称"},model:{value:(requestItem.badrp_name),callback:function ($$v) {_vm.$set(requestItem, "badrp_name", $$v)},expression:"requestItem.badrp_name"}})],1),_vm._v(" "),_c('el-col',{attrs:{"span":5}},[_c('el-input',{attrs:{"placeholder":"请输入参数备注"},model:{value:(requestItem.badrp_note),callback:function ($$v) {_vm.$set(requestItem, "badrp_note", $$v)},expression:"requestItem.badrp_note"}})],1),_vm._v(" "),_c('el-col',{attrs:{"span":4}},[_vm._v("是否为必传参 \n                "),_c('el-switch',{model:{value:(requestItem.badrp_is_must),callback:function ($$v) {_vm.$set(requestItem, "badrp_is_must", $$v)},expression:"requestItem.badrp_is_must"}})],1),_vm._v(" "),_c('el-col',{attrs:{"span":6}},[_vm._v("参数类型 \n                "),_c('el-select',{attrs:{"placeholder":"请选择参数类型"},model:{value:(requestItem.badrp_type),callback:function ($$v) {_vm.$set(requestItem, "badrp_type", $$v)},expression:"requestItem.badrp_type"}},_vm._l((_vm.requestType),function(typeItem){return _c('el-option',{key:typeItem.value,attrs:{"label":typeItem.label,"value":typeItem.value}})}))],1),_vm._v(" "),_c('el-col',{staticStyle:{"text-align":"right"},attrs:{"span":6}},[_vm._v("验证规则  \n                "),_c('el-select',{attrs:{"placeholder":"请选择参数类型"},model:{value:(requestItem.badrp_rule),callback:function ($$v) {_vm.$set(requestItem, "badrp_rule", $$v)},expression:"requestItem.badrp_rule"}},_vm._l((_vm.requestRule),function(ruleItem){return _c('el-option',{key:ruleItem.value,attrs:{"label":ruleItem.label,"value":ruleItem.value}})}))],1)],1)}),_vm._v(" "),_c('el-row',[_c('el-col',{staticClass:"formTitleBox",attrs:{"span":24}},[_c('i',{staticClass:"fa fa-cog fa-fw"}),_vm._v("返回参数：")])],1),_vm._v(" "),_c('el-row',[_c('mavon-editor',{attrs:{"toolbars":_vm.$global.markdownToolbars},model:{value:(_vm.apiForm.bad_response_params),callback:function ($$v) {_vm.$set(_vm.apiForm, "bad_response_params", $$v)},expression:"apiForm.bad_response_params"}})],1),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.submitForm('apiForm')}}},[_vm._v("提交")])],2)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});