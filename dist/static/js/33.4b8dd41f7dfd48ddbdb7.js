webpackJsonp([33],{

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addAtomicApi_vue__ = __webpack_require__(662);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addAtomicApi_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addAtomicApi_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addAtomicApi_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addAtomicApi_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5b794d53_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_addAtomicApi_vue__ = __webpack_require__(822);
function injectStyle (ssrContext) {
  __webpack_require__(820)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-5b794d53"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addAtomicApi_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5b794d53_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_addAtomicApi_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 662:
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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

        //获取接口分类信息
        this.$myLoading.startLoading();
        this.$http.getHttp(this.$API.menuActionPermissionsCategorySearch + "/apc_type/0", function (rs) {

            _this['AddAtomicApiModule/updateCategoryData'](rs.data);

            //获取菜单列表信息
            _this.$http.getHttp(_this.$API.menuSearch + "/skip/0/limit/1000", function (rs) {
                _this.$myLoading.endLoading();
                _this['AddAtomicApiModule/updateMenuData'](_this.$common.arrayReorganization(rs.data));
            });
        });
    },

    //计算属性
    computed: _extends({}, (0, _vuex.mapState)({
        addAtomicApiForm: function addAtomicApiForm(state) {
            return state.AddAtomicApiModule.addAtomicApiForm;
        },
        requestRule: function requestRule(state) {
            return state.AddAtomicApiModule.requestRule;
        },
        requestType: function requestType(state) {
            return state.AddAtomicApiModule.requestType;
        },
        requestPostParams: function requestPostParams(state) {
            return state.AddAtomicApiModule.requestPostParams;
        },
        requestGetParams: function requestGetParams(state) {
            return state.AddAtomicApiModule.requestGetParams;
        },
        actionCategory: function actionCategory(state) {
            return state.AddAtomicApiModule.actionCategory;
        },
        menuData: function menuData(state) {
            return state.AddAtomicApiModule.menuData;
        }
    })),
    //组件方法
    methods: _extends({}, (0, _vuex.mapMutations)(['updateRequestPostParams', 'AddAtomicApiModule/updateRequestPostParams']), (0, _vuex.mapMutations)(['updateRequestGetParams', 'AddAtomicApiModule/updateRequestGetParams']), (0, _vuex.mapMutations)(['updateCategoryData', 'AddAtomicApiModule/updateCategoryData']), (0, _vuex.mapMutations)(['updateMenuData', 'AddAtomicApiModule/updateMenuData']), (0, _vuex.mapMutations)(['clearForm', 'AddAtomicApiModule/clearForm']), {

        //新增POST请求参数
        addRequestPostParams: function addRequestPostParams() {
            this.requestPostParams.push({
                rp_name: "",
                rp_type: "",
                rp_is_must: true,
                rp_way: "BODY",
                rp_note: "",
                rp_rule: ""
            });
        },


        //新增GET请求参数
        addRequestGetParams: function addRequestGetParams() {
            this.requestGetParams.push({
                rp_name: "",
                rp_type: "",
                rp_is_must: true,
                rp_way: "RESTFUL",
                rp_note: "",
                rp_rule: ""
            });
        },


        //删除POST请求参数
        deleteRequestPostParams: function deleteRequestPostParams(index) {

            if (index == -1) {

                var newRequestPostParamsArr = this.$_.dropRight(this.requestPostParams);
                if (newRequestPostParamsArr <= 0) {
                    return;
                }

                this['AddAtomicApiModule/updateRequestPostParams'](this.$_.dropRight(this.requestPostParams));
            } else {

                this.requestPostParams.splice(index, 1);
                this['AddAtomicApiModule/updateRequestPostParams'](this.requestPostParams);
            }
        },


        //删除GET请求参数
        deleteRequestGetParams: function deleteRequestGetParams(index) {

            if (index == -1) {

                var newRequestGetParamsArr = this.$_.dropRight(this.requestGetParams);
                if (newRequestGetParamsArr <= 0) {
                    return;
                }

                this['AddAtomicApiModule/updateRequestGetParams'](this.$_.dropRight(this.requestGetParams));
            } else {

                this.requestGetParams.splice(index, 1);
                this['AddAtomicApiModule/updateRequestGetParams'](this.requestGetParams);
            }
        },


        //提交新增参数请求
        submitForm: function submitForm(addAtomicApiForm) {
            var _this2 = this;

            //将参数为空的POST参数过滤掉
            var newRequestPostParams = this.requestPostParams.filter(function (item) {
                return item.rp_name != '' && item.rp_rule != '' && item.rp_type != '';
            });

            //将参数为空的GET参数过滤掉
            var newRequestGetParams = this.requestGetParams.filter(function (item) {
                return item.rp_name != '' && item.rp_rule != '' && item.rp_type != '';
            });

            //重新构建请求参数
            var params = this.addAtomicApiForm;
            params.ap_request_params = newRequestPostParams.concat(newRequestGetParams);
            params.ap_is_control = params.ap_is_control ? 1 : 0;
            params.ap_is_auto = params.ap_is_auto ? 1 : 0;
            params.ap_is_cache = params.ap_is_cache ? 1 : 0;
            params.ap_is_get_cache = params.ap_is_get_cache ? 1 : 0;

            this.$myLoading.startLoading();
            this.$http.postHttp(this.$API.systemAddActionPermissions, params, function (rs) {

                _this2.$myLoading.endLoading();
                _this2.$myPop.SuccessMessage();

                _this2['AddAtomicApiModule/clearForm']();
            });
        },
        resetForm: function resetForm() {
            this['AddAtomicApiModule/clearForm']();
        }
    })
};

/***/ }),

/***/ 820:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(821);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("13a92641", content, true, {});

/***/ }),

/***/ 821:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 822:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('el-form',{ref:"addAtomicApiForm",attrs:{"model":_vm.addAtomicApiForm,"rules":_vm.rules,"label-position":"right","label-width":"160px"}},[_c('el-row',[_c('el-col',{staticClass:"formTitleBox",attrs:{"span":24}},[_c('i',{staticClass:"fa fa-cog fa-fw"}),_vm._v("基本信息：")])],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"所属类别：","prop":"ap_api"}},[_c('el-col',{attrs:{"span":8}},[_c('el-select',{attrs:{"placeholder":"请选择所属类别"},model:{value:(_vm.addAtomicApiForm.ap_apcid),callback:function ($$v) {_vm.$set(_vm.addAtomicApiForm, "ap_apcid", $$v)},expression:"addAtomicApiForm.ap_apcid"}},_vm._l((_vm.actionCategory),function(categoryItem){return _c('el-option',{key:categoryItem.apc_id,attrs:{"label":categoryItem.apc_name,"value":categoryItem.apc_id}})}))],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"所属菜单：","prop":"belongsMenu"}},[_c('el-col',{attrs:{"span":8}},[_c('el-cascader',{staticStyle:{"width":"338px"},attrs:{"placeholder":"选择父菜单","options":_vm.menuData,"props":{ checkStrictly: true },"clearable":""},model:{value:(_vm.addAtomicApiForm.belongsMenu),callback:function ($$v) {_vm.$set(_vm.addAtomicApiForm, "belongsMenu", $$v)},expression:"addAtomicApiForm.belongsMenu"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"接口名称：","prop":"ap_name"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"placeholder":"请输入接口名称"},model:{value:(_vm.addAtomicApiForm.ap_name),callback:function ($$v) {_vm.$set(_vm.addAtomicApiForm, "ap_name", $$v)},expression:"addAtomicApiForm.ap_name"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"接口地址：","prop":"ap_api"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"placeholder":"请输入接口地址"},model:{value:(_vm.addAtomicApiForm.ap_api),callback:function ($$v) {_vm.$set(_vm.addAtomicApiForm, "ap_api", $$v)},expression:"addAtomicApiForm.ap_api"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"请求方式：","prop":"ap_method"}},[_c('el-col',{attrs:{"span":15}},[_c('el-radio',{attrs:{"label":"GET"},model:{value:(_vm.addAtomicApiForm.ap_method),callback:function ($$v) {_vm.$set(_vm.addAtomicApiForm, "ap_method", $$v)},expression:"addAtomicApiForm.ap_method"}},[_vm._v("GET")]),_vm._v(" "),_c('el-radio',{attrs:{"label":"POST"},model:{value:(_vm.addAtomicApiForm.ap_method),callback:function ($$v) {_vm.$set(_vm.addAtomicApiForm, "ap_method", $$v)},expression:"addAtomicApiForm.ap_method"}},[_vm._v("POST")]),_vm._v(" "),_c('el-radio',{attrs:{"label":"ALL"},model:{value:(_vm.addAtomicApiForm.ap_method),callback:function ($$v) {_vm.$set(_vm.addAtomicApiForm, "ap_method", $$v)},expression:"addAtomicApiForm.ap_method"}},[_vm._v("ALL")])],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"接口描述：","prop":"ap_desc"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"type":"textarea","rows":"5","placeholder":"请输入接口描述"},model:{value:(_vm.addAtomicApiForm.ap_desc),callback:function ($$v) {_vm.$set(_vm.addAtomicApiForm, "ap_desc", $$v)},expression:"addAtomicApiForm.ap_desc"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"接口备注：","prop":"ap_note"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"type":"textarea","rows":"5","placeholder":"请输入接口备注"},model:{value:(_vm.addAtomicApiForm.ap_note),callback:function ($$v) {_vm.$set(_vm.addAtomicApiForm, "ap_note", $$v)},expression:"addAtomicApiForm.ap_note"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"是否接受权限控制：","prop":"ap_is_control"}},[_c('el-switch',{model:{value:(_vm.addAtomicApiForm.ap_is_control),callback:function ($$v) {_vm.$set(_vm.addAtomicApiForm, "ap_is_control", $$v)},expression:"addAtomicApiForm.ap_is_control"}})],1),_vm._v(" "),_c('el-row',[_c('el-col',{staticClass:"formTitleBox",attrs:{"span":24}},[_c('i',{staticClass:"fa fa-cog fa-fw"}),_vm._v("自动构建信息：")])],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"是否自动构建：","prop":"ap_is_auto"}},[_c('el-switch',{model:{value:(_vm.addAtomicApiForm.ap_is_auto),callback:function ($$v) {_vm.$set(_vm.addAtomicApiForm, "ap_is_auto", $$v)},expression:"addAtomicApiForm.ap_is_auto"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"自动构建类型：","prop":"ap_type"}},[_c('el-col',{attrs:{"span":15}},[_c('el-radio',{attrs:{"label":"C"},model:{value:(_vm.addAtomicApiForm.ap_type),callback:function ($$v) {_vm.$set(_vm.addAtomicApiForm, "ap_type", $$v)},expression:"addAtomicApiForm.ap_type"}},[_vm._v("新增")]),_vm._v(" "),_c('el-radio',{attrs:{"label":"U"},model:{value:(_vm.addAtomicApiForm.ap_type),callback:function ($$v) {_vm.$set(_vm.addAtomicApiForm, "ap_type", $$v)},expression:"addAtomicApiForm.ap_type"}},[_vm._v("更新")]),_vm._v(" "),_c('el-radio',{attrs:{"label":"R"},model:{value:(_vm.addAtomicApiForm.ap_type),callback:function ($$v) {_vm.$set(_vm.addAtomicApiForm, "ap_type", $$v)},expression:"addAtomicApiForm.ap_type"}},[_vm._v("普通查询")]),_vm._v(" "),_c('el-radio',{attrs:{"label":"D"},model:{value:(_vm.addAtomicApiForm.ap_type),callback:function ($$v) {_vm.$set(_vm.addAtomicApiForm, "ap_type", $$v)},expression:"addAtomicApiForm.ap_type"}},[_vm._v("删除")]),_vm._v(" "),_c('el-radio',{attrs:{"label":"V"},model:{value:(_vm.addAtomicApiForm.ap_type),callback:function ($$v) {_vm.$set(_vm.addAtomicApiForm, "ap_type", $$v)},expression:"addAtomicApiForm.ap_type"}},[_vm._v("关联查询")])],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"自动构建表名：","prop":"ap_auto_table"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"placeholder":"请输入自动构建表名称"},model:{value:(_vm.addAtomicApiForm.ap_auto_table),callback:function ($$v) {_vm.$set(_vm.addAtomicApiForm, "ap_auto_table", $$v)},expression:"addAtomicApiForm.ap_auto_table"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"构建视图条件：","prop":"ap_more_table_where"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"placeholder":"请输入构建视图条件"},model:{value:(_vm.addAtomicApiForm.ap_more_table_where),callback:function ($$v) {_vm.$set(_vm.addAtomicApiForm, "ap_more_table_where", $$v)},expression:"addAtomicApiForm.ap_more_table_where"}}),_vm._v(" "),_c('font',{attrs:{"color":"red"}},[_vm._v("注：选择关联查询类型时，在此指名多表关联条件")])],1)],1),_vm._v(" "),_c('el-row',[_c('el-col',{staticClass:"formTitleBox",attrs:{"span":24}},[_c('i',{staticClass:"fa fa-cog fa-fw"}),_vm._v("缓存配置：")])],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"是否开启缓存：","prop":"ap_is_cache"}},[_c('el-switch',{model:{value:(_vm.addAtomicApiForm.ap_is_cache),callback:function ($$v) {_vm.$set(_vm.addAtomicApiForm, "ap_is_cache", $$v)},expression:"addAtomicApiForm.ap_is_cache"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"是否使用缓存：","prop":"ap_is_get_cache"}},[_c('el-switch',{model:{value:(_vm.addAtomicApiForm.ap_is_get_cache),callback:function ($$v) {_vm.$set(_vm.addAtomicApiForm, "ap_is_get_cache", $$v)},expression:"addAtomicApiForm.ap_is_get_cache"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"缓存类型：","prop":"ap_cache_type"}},[_c('el-col',{attrs:{"span":15}},[_c('el-radio',{attrs:{"label":"file"},model:{value:(_vm.addAtomicApiForm.ap_cache_type),callback:function ($$v) {_vm.$set(_vm.addAtomicApiForm, "ap_cache_type", $$v)},expression:"addAtomicApiForm.ap_cache_type"}},[_vm._v("文件缓存")])],1)],1),_vm._v(" "),_c('el-row',[_c('el-col',{staticClass:"formTitleBox",attrs:{"span":24}},[_c('i',{staticClass:"fa fa-cog fa-fw"}),_vm._v("GET 请求参数：\n                "),_c('i',{staticClass:"fa fa-minus-square fa-fw",staticStyle:{"float":"right","margin-top":"10px","font-size":"20px"},on:{"click":function($event){_vm.deleteRequestGetParams(-1)}}}),_vm._v(" "),_c('i',{staticClass:"fa fa-plus-square fa-fw",staticStyle:{"float":"right","margin-top":"10px","font-size":"20px","margin-right":"0px"},on:{"click":_vm.addRequestGetParams}})])],1),_vm._v(" "),_vm._l((_vm.requestGetParams),function(requestItem,index){return _c('el-row',{key:'GET-' + index,attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":3}},[_c('el-input',{attrs:{"placeholder":"请输入参数名称"},model:{value:(requestItem.rp_name),callback:function ($$v) {_vm.$set(requestItem, "rp_name", $$v)},expression:"requestItem.rp_name"}})],1),_vm._v(" "),_c('el-col',{attrs:{"span":4}},[_c('el-input',{attrs:{"placeholder":"请输入参数备注"},model:{value:(requestItem.rp_note),callback:function ($$v) {_vm.$set(requestItem, "rp_note", $$v)},expression:"requestItem.rp_note"}})],1),_vm._v(" "),_c('el-col',{attrs:{"span":4}},[_vm._v("是否为必传参 \n                "),_c('el-switch',{model:{value:(requestItem.rp_is_must),callback:function ($$v) {_vm.$set(requestItem, "rp_is_must", $$v)},expression:"requestItem.rp_is_must"}})],1),_vm._v(" "),_c('el-col',{attrs:{"span":6}},[_vm._v("参数类型 \n                "),_c('el-select',{attrs:{"placeholder":"请选择参数类型"},model:{value:(requestItem.rp_type),callback:function ($$v) {_vm.$set(requestItem, "rp_type", $$v)},expression:"requestItem.rp_type"}},_vm._l((_vm.requestType),function(typeItem){return _c('el-option',{key:typeItem.value,attrs:{"label":typeItem.label,"value":typeItem.value}})}))],1),_vm._v(" "),_c('el-col',{staticStyle:{"text-align":"right"},attrs:{"span":6}},[_vm._v("验证规则  \n                "),_c('el-select',{attrs:{"placeholder":"请选择参数类型"},model:{value:(requestItem.rp_rule),callback:function ($$v) {_vm.$set(requestItem, "rp_rule", $$v)},expression:"requestItem.rp_rule"}},_vm._l((_vm.requestRule),function(ruleItem){return _c('el-option',{key:ruleItem.value,attrs:{"label":ruleItem.label,"value":ruleItem.value}})}))],1),_vm._v(" "),_c('el-col',{attrs:{"span":1}},[_c('i',{staticClass:"fa fa-minus-square fa-fw",staticStyle:{"font-size":"20px","color":"red"},on:{"click":function($event){_vm.deleteRequestGetParams(index)}}})])],1)}),_vm._v(" "),_c('el-row',[_c('el-col',{staticClass:"formTitleBox",attrs:{"span":24}},[_c('i',{staticClass:"fa fa-cog fa-fw"}),_vm._v("POST 请求参数：\n                "),_c('i',{staticClass:"fa fa-minus-square fa-fw",staticStyle:{"float":"right","margin-top":"10px","font-size":"20px"},on:{"click":function($event){_vm.deleteRequestPostParams(-1)}}}),_vm._v(" "),_c('i',{staticClass:"fa fa-plus-square fa-fw",staticStyle:{"float":"right","margin-top":"10px","font-size":"20px","margin-right":"0px"},on:{"click":_vm.addRequestPostParams}})])],1),_vm._v(" "),_vm._l((_vm.requestPostParams),function(requestItem,index){return _c('el-row',{key:index,attrs:{"gutter":20}},[_c('el-col',{attrs:{"span":3}},[_c('el-input',{attrs:{"placeholder":"请输入参数名称"},model:{value:(requestItem.rp_name),callback:function ($$v) {_vm.$set(requestItem, "rp_name", $$v)},expression:"requestItem.rp_name"}})],1),_vm._v(" "),_c('el-col',{attrs:{"span":4}},[_c('el-input',{attrs:{"placeholder":"请输入参数备注"},model:{value:(requestItem.rp_note),callback:function ($$v) {_vm.$set(requestItem, "rp_note", $$v)},expression:"requestItem.rp_note"}})],1),_vm._v(" "),_c('el-col',{attrs:{"span":4}},[_vm._v("是否为必传参 \n                "),_c('el-switch',{model:{value:(requestItem.rp_is_must),callback:function ($$v) {_vm.$set(requestItem, "rp_is_must", $$v)},expression:"requestItem.rp_is_must"}})],1),_vm._v(" "),_c('el-col',{attrs:{"span":6}},[_vm._v("参数类型 \n                "),_c('el-select',{attrs:{"placeholder":"请选择参数类型"},model:{value:(requestItem.rp_type),callback:function ($$v) {_vm.$set(requestItem, "rp_type", $$v)},expression:"requestItem.rp_type"}},_vm._l((_vm.requestType),function(typeItem){return _c('el-option',{key:typeItem.value,attrs:{"label":typeItem.label,"value":typeItem.value}})}))],1),_vm._v(" "),_c('el-col',{staticStyle:{"text-align":"right"},attrs:{"span":6}},[_vm._v("验证规则  \n                "),_c('el-select',{attrs:{"placeholder":"请选择参数类型"},model:{value:(requestItem.rp_rule),callback:function ($$v) {_vm.$set(requestItem, "rp_rule", $$v)},expression:"requestItem.rp_rule"}},_vm._l((_vm.requestRule),function(ruleItem){return _c('el-option',{key:ruleItem.value,attrs:{"label":ruleItem.label,"value":ruleItem.value}})}))],1),_vm._v(" "),_c('el-col',{attrs:{"span":1}},[_c('i',{staticClass:"fa fa-minus-square fa-fw",staticStyle:{"font-size":"20px","color":"red"},on:{"click":function($event){_vm.deleteRequestPostParams(index)}}})])],1)}),_vm._v(" "),_c('el-row',[_c('el-col',{staticClass:"formTitleBox",attrs:{"span":24}},[_c('i',{staticClass:"fa fa-cog fa-fw"}),_vm._v("返回参数：")])],1),_vm._v(" "),_c('el-row',[_c('mavon-editor',{attrs:{"toolbars":_vm.$global.markdownToolbars},model:{value:(_vm.addAtomicApiForm.ap_response_params),callback:function ($$v) {_vm.$set(_vm.addAtomicApiForm, "ap_response_params", $$v)},expression:"addAtomicApiForm.ap_response_params"}})],1),_vm._v(" "),_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.submitForm('addAtomicApiForm')}}},[_vm._v("提交")]),_vm._v(" "),_c('el-button',{on:{"click":_vm.resetForm}},[_vm._v("重置")])],2)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});