webpackJsonp([25],{

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_serverConfiguration_vue__ = __webpack_require__(659);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_serverConfiguration_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_serverConfiguration_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_serverConfiguration_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_serverConfiguration_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_05c9a2d0_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_serverConfiguration_vue__ = __webpack_require__(810);
function injectStyle (ssrContext) {
  __webpack_require__(808)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-05c9a2d0"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_serverConfiguration_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_05c9a2d0_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_serverConfiguration_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 659:
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

        //获取配置信息
        this.$myLoading.startLoading();
        this.$http.getHttp(this.$API.systemApiSearchConfiguration, function (rs) {
            console.log(rs);
            _this.$myLoading.endLoading();
            _this["ServerConfigurationModule/updateConfigForm"](rs.data[0]);
        });
    },

    //计算属性
    computed: _extends({}, (0, _vuex.mapState)({
        configForm: function configForm(state) {
            return state.ServerConfigurationModule.configForm;
        }
    })),
    //组件方法
    methods: _extends({}, (0, _vuex.mapMutations)(['updateConfigForm', 'ServerConfigurationModule/updateConfigForm']), {
        submitForm: function submitForm(configForm) {
            var _this2 = this;

            var params = this.$_.cloneDeep(this.configForm);

            //构建请求参数
            params.ac_cache_type = params.ac_cache_type == '文件缓存' ? 'file' : 'memory';
            params.ac_is_debug = params.ac_is_debug == true ? 1 : 0;
            params.ac_is_access_control_allow_origin = params.ac_is_access_control_allow_origin == true ? 1 : 0;
            params.ac_is_aggregation_server_validation = params.ac_is_aggregation_server_validation == true ? 1 : 0;
            params.ac_is_web_manager_add_api = params.ac_is_web_manager_add_api == true ? 1 : 0;
            params.ac_is_cache = params.ac_is_cache == true ? 1 : 0;
            params.ac_is_curd = params.ac_is_curd == true ? 1 : 0;
            params.ac_is_independent_deployment = params.ac_is_independent_deployment == true ? 1 : 0;
            params.ac_is_physically_delete = params.ac_is_physically_delete == true ? 1 : 0;
            params.ac_is_white_auth = params.ac_is_white_auth == true ? 1 : 0;
            params.ac_is_data_filter = params.ac_is_data_filter == true ? 1 : 0;
            params.ac_noDatabaseUse = params.ac_noDatabaseUse == true ? 1 : 0;
            params.update_where = "ac_id";
            params.ac_method = params.ac_method.join(",");

            this.$myLoading.startLoading();
            this.$http.postHttp(this.$API.systemApiUpdateConfiguration, params, function (rs) {
                _this2.$myLoading.endLoading();

                //调用配置文件重新生成接口
                _this2.$http.postHttp(_this2.$API.systemApiRebuildConfiguration, params, function (rs) {
                    _this2.$myPop.SuccessMessage();
                });
            });
        }
    })
};

/***/ }),

/***/ 808:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(809);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("411b2c29", content, true, {});

/***/ }),

/***/ 809:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 810:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('el-form',{ref:"configForm",attrs:{"model":_vm.configForm,"rules":_vm.rules,"label-position":"right","label-width":"160px"}},[_c('el-row',[_c('el-col',{staticClass:"formTitleBox",attrs:{"span":24}},[_c('i',{staticClass:"fa fa-cog fa-fw"}),_vm._v("基本配置：")])],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"是否开启debug：","prop":"ac_is_debug"}},[_c('el-switch',{model:{value:(_vm.configForm.ac_is_debug),callback:function ($$v) {_vm.$set(_vm.configForm, "ac_is_debug", $$v)},expression:"configForm.ac_is_debug"}}),_c('i',{staticClass:"el-icon-info more_info_icon"},[_vm._v(" 说明：开启后可查看请求的方式，执行的SQL等接口执行时的一些查看信息")])],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"是否独立部署：","prop":"ac_is_independent_deployment"}},[_c('el-switch',{model:{value:(_vm.configForm.ac_is_independent_deployment),callback:function ($$v) {_vm.$set(_vm.configForm, "ac_is_independent_deployment", $$v)},expression:"configForm.ac_is_independent_deployment"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"是否需要聚合层验权：","prop":"ac_is_aggregation_server_validation"}},[_c('el-switch',{model:{value:(_vm.configForm.ac_is_aggregation_server_validation),callback:function ($$v) {_vm.$set(_vm.configForm, "ac_is_aggregation_server_validation", $$v)},expression:"configForm.ac_is_aggregation_server_validation"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"是否管理端创建接口：","prop":"ac_is_web_manager_add_api"}},[_c('el-switch',{model:{value:(_vm.configForm.ac_is_web_manager_add_api),callback:function ($$v) {_vm.$set(_vm.configForm, "ac_is_web_manager_add_api", $$v)},expression:"configForm.ac_is_web_manager_add_api"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"是否开启物理删除：","prop":"ac_is_physically_delete"}},[_c('el-switch',{model:{value:(_vm.configForm.ac_is_physically_delete),callback:function ($$v) {_vm.$set(_vm.configForm, "ac_is_physically_delete", $$v)},expression:"configForm.ac_is_physically_delete"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"是否开启跨域请求：","prop":"ac_is_access_control_allow_origin"}},[_c('el-switch',{model:{value:(_vm.configForm.ac_is_access_control_allow_origin),callback:function ($$v) {_vm.$set(_vm.configForm, "ac_is_access_control_allow_origin", $$v)},expression:"configForm.ac_is_access_control_allow_origin"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"请求方式","prop":"ac_method"}},[_c('el-checkbox-group',{model:{value:(_vm.configForm.ac_method),callback:function ($$v) {_vm.$set(_vm.configForm, "ac_method", $$v)},expression:"configForm.ac_method"}},[_c('el-checkbox',{attrs:{"label":"GET"}}),_vm._v(" "),_c('el-checkbox',{attrs:{"label":"POST"}}),_vm._v(" "),_c('el-checkbox',{attrs:{"label":"ALL"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"是否自动构建CURD：","prop":"ac_is_curd"}},[_c('el-switch',{model:{value:(_vm.configForm.ac_is_curd),callback:function ($$v) {_vm.$set(_vm.configForm, "ac_is_curd", $$v)},expression:"configForm.ac_is_curd"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"是否开启数据过滤：","prop":"ac_is_data_filter"}},[_c('el-switch',{model:{value:(_vm.configForm.ac_is_data_filter),callback:function ($$v) {_vm.$set(_vm.configForm, "ac_is_data_filter", $$v)},expression:"configForm.ac_is_data_filter"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"路由解析层级设置：","prop":"ac_router_layer"}},[_c('el-col',{attrs:{"span":4}},[_c('el-input',{attrs:{"placeholder":"请输入路由层级"},model:{value:(_vm.configForm.ac_router_layer),callback:function ($$v) {_vm.$set(_vm.configForm, "ac_router_layer", $$v)},expression:"configForm.ac_router_layer"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"内置接口访问地址：","prop":"ac_built_in_url"}},[_c('el-col',{attrs:{"span":4}},[_c('el-input',{attrs:{"placeholder":"请输入内置接口地址"},model:{value:(_vm.configForm.ac_built_in_url),callback:function ($$v) {_vm.$set(_vm.configForm, "ac_built_in_url", $$v)},expression:"configForm.ac_built_in_url"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"默认分页显示数量：","prop":"ac_page_limit"}},[_c('el-col',{attrs:{"span":4}},[_c('el-input',{attrs:{"placeholder":"请输入分页数量"},model:{value:(_vm.configForm.ac_page_limit),callback:function ($$v) {_vm.$set(_vm.configForm, "ac_page_limit", $$v)},expression:"configForm.ac_page_limit"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"是否开启白名单验证：","prop":"ac_is_white_auth"}},[_c('el-switch',{model:{value:(_vm.configForm.ac_is_white_auth),callback:function ($$v) {_vm.$set(_vm.configForm, "ac_is_white_auth", $$v)},expression:"configForm.ac_is_white_auth"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"是否需要接入数据库：","prop":"ac_noDatabaseUse"}},[_c('el-switch',{model:{value:(_vm.configForm.ac_noDatabaseUse),callback:function ($$v) {_vm.$set(_vm.configForm, "ac_noDatabaseUse", $$v)},expression:"configForm.ac_noDatabaseUse"}})],1),_vm._v(" "),_c('el-row',[_c('el-col',{staticClass:"formTitleBox",attrs:{"span":24}},[_c('i',{staticClass:"fa fa-cog fa-fw"}),_vm._v("缓存相关配置：")])],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"是否进行缓存：","prop":"ac_is_cache"}},[_c('el-switch',{model:{value:(_vm.configForm.ac_is_cache),callback:function ($$v) {_vm.$set(_vm.configForm, "ac_is_cache", $$v)},expression:"configForm.ac_is_cache"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"缓存的类型：","prop":"ac_cache_type"}},[_c('el-radio',{attrs:{"label":"文件缓存"},model:{value:(_vm.configForm.ac_cache_type),callback:function ($$v) {_vm.$set(_vm.configForm, "ac_cache_type", $$v)},expression:"configForm.ac_cache_type"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"缓存的目录：","prop":"ac_cache_dir"}},[_c('el-col',{attrs:{"span":4}},[_c('el-input',{attrs:{"placeholder":"请输入目录名称"},model:{value:(_vm.configForm.ac_cache_dir),callback:function ($$v) {_vm.$set(_vm.configForm, "ac_cache_dir", $$v)},expression:"configForm.ac_cache_dir"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"缓存的过期时间(秒)：","prop":"ac_cache_validity"}},[_c('el-col',{attrs:{"span":4}},[_c('el-input',{attrs:{"placeholder":"请输入缓存过期时间"},model:{value:(_vm.configForm.ac_cache_validity),callback:function ($$v) {_vm.$set(_vm.configForm, "ac_cache_validity", $$v)},expression:"configForm.ac_cache_validity"}})],1)],1),_vm._v(" "),_c('el-row',[_c('el-col',{staticClass:"formTitleBox",attrs:{"span":24}},[_c('i',{staticClass:"fa fa-cog fa-fw"}),_vm._v("Mysql 数据库相关配置："),_c('font',{staticStyle:{"float":"right"},attrs:{"color":"red"}},[_vm._v("(注：更改错误的数据库配置，可能导致管理端连接失败，请谨慎修改）")])],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"用户帐号：","prop":"ac_mysql_username"}},[_c('el-col',{attrs:{"span":6}},[_c('el-input',{attrs:{"placeholder":"请输入用户帐号"},model:{value:(_vm.configForm.ac_mysql_username),callback:function ($$v) {_vm.$set(_vm.configForm, "ac_mysql_username", $$v)},expression:"configForm.ac_mysql_username"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"用户密码：","prop":"ac_mysql_password"}},[_c('el-col',{attrs:{"span":6}},[_c('el-input',{attrs:{"placeholder":"请输入用户密码"},model:{value:(_vm.configForm.ac_mysql_password),callback:function ($$v) {_vm.$set(_vm.configForm, "ac_mysql_password", $$v)},expression:"configForm.ac_mysql_password"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"端口号：","prop":"ac_mysql_port"}},[_c('el-col',{attrs:{"span":6}},[_c('el-input',{attrs:{"placeholder":"请输入端口号"},model:{value:(_vm.configForm.ac_mysql_port),callback:function ($$v) {_vm.$set(_vm.configForm, "ac_mysql_port", $$v)},expression:"configForm.ac_mysql_port"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"主机地址：","prop":"ac_mysql_host"}},[_c('el-col',{attrs:{"span":6}},[_c('el-input',{attrs:{"placeholder":"请输入主机地址"},model:{value:(_vm.configForm.ac_mysql_host),callback:function ($$v) {_vm.$set(_vm.configForm, "ac_mysql_host", $$v)},expression:"configForm.ac_mysql_host"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"数据库名：","prop":"ac_mysql_dbname"}},[_c('el-col',{attrs:{"span":6}},[_c('el-input',{attrs:{"placeholder":"请输入数据库名"},model:{value:(_vm.configForm.ac_mysql_dbname),callback:function ($$v) {_vm.$set(_vm.configForm, "ac_mysql_dbname", $$v)},expression:"configForm.ac_mysql_dbname"}})],1)],1),_vm._v(" "),_c('el-form-item',[_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.submitForm('configForm')}}},[_vm._v("重新生成配置")])],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});