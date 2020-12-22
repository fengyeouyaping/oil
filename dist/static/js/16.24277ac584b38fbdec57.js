webpackJsonp([16],{

/***/ 391:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editMenu_vue__ = __webpack_require__(655);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editMenu_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editMenu_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editMenu_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editMenu_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_65c694c8_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_editMenu_vue__ = __webpack_require__(835);
function injectStyle (ssrContext) {
  __webpack_require__(833)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-65c694c8"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_editMenu_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_65c694c8_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_editMenu_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 655:
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

var _vuex = __webpack_require__(9);

exports.default = {
    //数据源
    data: function data() {
        return {
            //进行必填的验证
            rules: {
                name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
                iconType: [{ required: true, message: '请选择菜单的图标类型', trigger: 'change' }],
                iconName: [{ required: true, message: '请选择菜单的图标', trigger: 'change' }]
            }
        };
    },

    //初始化函数
    mounted: function mounted() {
        var _this = this;

        //获取菜单列表信息
        this.$myLoading.startLoading();
        this.$http.getHttp(this.$API.menuSearch + "/m_id/" + this.$route.query.m_id, function (rs) {
            _this.$myLoading.endLoading();
            _this['EditMenuModule/updateMenuForm'](rs.data[0]);
        });
    },

    //计算属性
    computed: _extends({}, (0, _vuex.mapState)({
        menuForm: function menuForm(state) {
            return state.EditMenuModule.menuForm;
        }
    })),
    //组件方法
    methods: _extends({}, (0, _vuex.mapMutations)(['updateMenuForm', 'EditMenuModule/updateMenuForm']), {
        selectFontIconBox: function selectFontIconBox() {
            var that = this;
            //回调函数
            this.$selectFontIcon({
                selectFontValue: function selectFontValue(item) {
                    that.$store.commit('EditMenuModule/updateMenuFormIconName', item.name);
                }
            });
        },


        //提交信息
        submitForm: function submitForm(menuForm) {
            var _this2 = this;

            //菜单添加
            this.$refs[menuForm].validate(function (valid) {

                if (valid) {
                    //添加信息
                    var params = {
                        update_where: "m_id",
                        m_id: _this2.$route.query.m_id,
                        m_name: _this2.menuForm.m_name,
                        m_icon_type: _this2.menuForm.m_icon_type,
                        m_icon: _this2.menuForm.m_icon,
                        m_is_show: _this2.menuForm.m_is_show == true ? 1 : 0
                    };

                    _this2.$myLoading.startLoading();
                    _this2.$http.postHttp(_this2.$API.menuUpdate, params, function (rs) {
                        _this2.$myLoading.endLoading();
                        _this2.$myPop.SuccessMessage();
                        setTimeout(function () {
                            _this2.$router.go(-1);
                        }, 1000);
                    });
                } else {
                    return false;
                }
            });
        }
    })
};

/***/ }),

/***/ 833:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(834);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("c31b1f5e", content, true, {});

/***/ }),

/***/ 834:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 835:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('el-form',{ref:"menuForm",attrs:{"model":_vm.menuForm,"rules":_vm.rules,"label-position":"right","label-width":"160px"}},[_c('el-form-item',{attrs:{"label":"菜单名称：","prop":"m_name"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"placeholder":"请输入菜单名称"},model:{value:(_vm.menuForm.m_name),callback:function ($$v) {_vm.$set(_vm.menuForm, "m_name", $$v)},expression:"menuForm.m_name"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"图标类型：","prop":"m_icon_type"}},[_c('el-col',{attrs:{"span":8}},[_c('el-radio',{attrs:{"label":"0"},model:{value:(_vm.menuForm.m_icon_type),callback:function ($$v) {_vm.$set(_vm.menuForm, "m_icon_type", $$v)},expression:"menuForm.m_icon_type"}},[_vm._v("字体图标")]),_vm._v(" "),_c('el-radio',{attrs:{"label":"1","disabled":""},model:{value:(_vm.menuForm.m_icon_type),callback:function ($$v) {_vm.$set(_vm.menuForm, "m_icon_type", $$v)},expression:"menuForm.m_icon_type"}},[_vm._v("图片")])],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"菜单图标：","prop":"m_icon"}},[_c('el-col',{attrs:{"span":8}},[_c('el-button',{on:{"click":_vm.selectFontIconBox}},[_vm._v("请选择菜单的图标")]),_vm._v(" "),_c('i',{staticClass:"fa fa-lg",class:['fa-'+_vm.menuForm.m_icon],staticStyle:{"margin-left":"10px"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"是否显示：","prop":"m_is_show"}},[_c('el-switch',{model:{value:(_vm.menuForm.m_is_show),callback:function ($$v) {_vm.$set(_vm.menuForm, "m_is_show", $$v)},expression:"menuForm.m_is_show"}}),_c('i',{staticClass:"el-icon-info more_info_icon"},[_vm._v(" 说明：是否在菜单栏显示。若为高级菜单不现实，则所属所有菜单都不显示")])],1),_vm._v(" "),_c('el-form-item',[_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.submitForm('menuForm')}}},[_vm._v("提交")])],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});