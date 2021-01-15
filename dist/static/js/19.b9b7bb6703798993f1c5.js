webpackJsonp([19],{

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addMenu_vue__ = __webpack_require__(655);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addMenu_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addMenu_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addMenu_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addMenu_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b59a8d58_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_addMenu_vue__ = __webpack_require__(803);
function injectStyle (ssrContext) {
  __webpack_require__(801)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-b59a8d58"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_addMenu_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b59a8d58_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_addMenu_vue__["a" /* default */],
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    data: function data() {
        return {
            show: false,
            //进行必填的验证
            rules: {
                name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
                address: [{ required: true, message: '请输入菜单地址', trigger: 'blur' }],
                iconType: [{ required: true, message: '请选择菜单的图标类型', trigger: 'change' }],
                iconName: [{ required: true, message: '请选择菜单的图标', trigger: 'change' }],
                level: [{ required: true, message: '请选择菜单级别', trigger: 'change' }]
            },
            props: {
                value: 'valueLabel'
            }
        };
    },

    computed: _extends({}, (0, _vuex.mapState)({
        menuForm: function menuForm(state) {
            return state.AddMenuModule.menuForm;
        },
        temporaryFatherData: function temporaryFatherData(state) {
            return state.AddMenuModule.temporaryFatherData;
        },
        fontIco: function fontIco(state) {
            return state.FontIconModule.fontIcon;
        }
    })),
    mounted: function mounted() {
        var _this = this;

        //获取菜单列表信息
        this.$myLoading.startLoading();
        this.$http.getHttp(this.$API.menuSearch + "/skip/0/limit/1000", function (rs) {
            _this.$myLoading.endLoading();
            _this['AddMenuModule/updateTemporaryFatherData'](_this.$common.arrayReorganization(rs.data));
        });
    },

    methods: _extends({}, (0, _vuex.mapMutations)(['clearForm', 'AddMenuModule/clearForm']), (0, _vuex.mapMutations)(['updateTemporaryFatherData', 'AddMenuModule/updateTemporaryFatherData']), {

        //调用字体库
        selectFontIconBox: function selectFontIconBox() {
            var that = this;
            //回调函数
            this.$selectFontIcon({
                selectFontValue: function selectFontValue(item) {
                    that.$store.commit('AddMenuModule/updateMenuFormIconName', item.name);
                }
            });
        },

        //提交信息
        submitForm: function submitForm(menuForm) {
            var _this2 = this;

            if (!this.$isDev) {
                this.$myPop.alertBox("抱歉，该菜单只能在开发模式下使用");
                return;
            }

            //拼接全路径
            var menuFormFather = [];
            var front_route_url = [];
            var m_route_url = 0;

            for (var i = 0; i < this.menuForm.father.length; i++) {

                var arr = this.menuForm.father[i].split(",");

                menuFormFather.push(arr[0]);

                front_route_url.push(arr[1]);
            }

            if (this.menuForm.level == 2 || this.menuForm.level == 3) {
                this.menuForm.iconName = "no";
                m_route_url = front_route_url.join("/") + "/" + this.menuForm.address + "/" + this.menuForm.address + ".vue";
            }
            this.menuForm.father = menuFormFather;

            //菜单添加
            this.$refs[menuForm].validate(function (valid) {
                if (valid) {
                    //添加信息
                    var params = {
                        "m_name": _this2.menuForm.name, //菜单名称
                        "m_url": _this2.menuForm.address, //菜单地址
                        "m_icon_type": _this2.menuForm.iconType, // 菜单的图标类型 0-字体图标 1-图片
                        "m_icon": _this2.menuForm.iconName, //菜单图标
                        "m_level": _this2.menuForm.level, //菜单级别
                        "m_type": _this2.menuForm.m_type, //菜单类型
                        "m_fid": _this2.menuForm.father[_this2.menuForm.father.length - 1] ? _this2.menuForm.father[_this2.menuForm.father.length - 1] : 0, //父菜单ID 0-一级菜单
                        "m_path": _this2.menuForm.father[_this2.menuForm.father.length - 1] ? "0," + _this2.menuForm.father.join(',') + "," : "0, ", //菜单路径
                        "m_route_url": m_route_url, //菜单全路径
                        "m_is_show": _this2.menuForm.m_is_show == true ? 1 : 0 //是否在左侧菜单栏显示
                    };

                    _this2.$myLoading.startLoading();

                    _this2.$http.postHttp(_this2.$API.menuAdd, params, function (rs) {

                        _this2.$http.getHttp(_this2.$API.menuSearch + "/skip/0/limit/1000", function (rs) {

                            _this2.$myLoading.endLoading();

                            //把数据存储到本地
                            sessionStorage.setItem("totalMenuBar", JSON.stringify(rs.data));
                            //在本地创建相应的文件加以及文件
                            var menuPath = _this2.$common.newlyBuild(params, _this2.temporaryFatherData);
                            //创建本地目录
                            _this2.$http.systemApiPostHttp("/createMenuDir", { "menuPath": menuPath, "level": _this2.menuForm.level }, function (rs) {});
                            //更新父级下拉的数据
                            _this2.$store.commit('AddMenuModule/getFatherMenu', _this2);
                            //更新左侧菜单的信息
                            _this2.$store.commit('MenuModule/updateTaskbars', _this2.$common.arrayReorganization(rs.data));
                            _this2.$myPop.SuccessMessage();
                            //重置数据
                            _this2.resetForm();
                        });
                    });
                } else {
                    return false;
                }
            });
        },

        //重置信息
        resetForm: function resetForm() {
            this['AddMenuModule/clearForm']();
        },

        //开启三级联动 选择父级菜单
        parentMenuChanges: function parentMenuChanges() {

            this.$store.commit('AddMenuModule/fatherMenu', this);
        },

        //关闭字体库弹框
        closeFontIcon: function closeFontIcon(vl) {
            this.show = !this.show;
        }
    })
};

/***/ }),

/***/ 801:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(802);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("6292fbec", content, true, {});

/***/ }),

/***/ 802:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".fontIconMaskBox[data-v-b59a8d58]{position:fixed;background:rgba(0,0,0,.5);left:0;top:0;bottom:0;right:0;z-index:99999999}.fontIconMaskBox .fontIconMainBox[data-v-b59a8d58]{position:relative;left:50%;width:820px;border:1px solid #ebeef5;-webkit-box-shadow:0 2px 12px 0 rgba(0,0,0,.1);box-shadow:0 2px 12px 0 rgba(0,0,0,.1);height:80%;border-radius:4px;background:#fff;margin-left:-400px;margin-top:5%;z-index:999}.fontIconMaskBox .fontIconHeaderBox[data-v-b59a8d58]{width:100%;height:50px;font-size:18px;line-height:50px;text-indent:15px}.fontIconMaskBox .fontIconHeaderBox i[data-v-b59a8d58]{float:right;margin-top:15px;margin-right:15px}.fontIconMaskBox .fontIconContentBox[data-v-b59a8d58]{width:100%;position:absolute;top:50px;left:0;bottom:0;right:0;overflow:auto}.fontIconMaskBox .fontIconTitleBox[data-v-b59a8d58]{height:40px;line-height:40px;text-indent:15px;font-size:14px}.fontIconMaskBox .fontIconItemBox[data-v-b59a8d58]{width:100%;height:auto;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start}.fontIconMaskBox .fontIconItemBox .fontIconItem[data-v-b59a8d58]{width:50px;height:50px;text-align:center;line-height:40px}", ""]);

// exports


/***/ }),

/***/ 803:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('el-form',{ref:"menuForm",attrs:{"model":_vm.menuForm,"rules":_vm.rules,"label-position":"right","label-width":"160px"}},[_c('el-form-item',{attrs:{"label":"菜单名称：","prop":"name"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"placeholder":"请输入菜单名称"},model:{value:(_vm.menuForm.name),callback:function ($$v) {_vm.$set(_vm.menuForm, "name", $$v)},expression:"menuForm.name"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"菜单地址：","prop":"address"}},[_c('el-col',{attrs:{"span":8}},[_c('el-input',{attrs:{"placeholder":"请输入菜单地址"},model:{value:(_vm.menuForm.address),callback:function ($$v) {_vm.$set(_vm.menuForm, "address", $$v)},expression:"menuForm.address"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"菜单级别：","prop":"level"}},[_c('el-col',{attrs:{"span":15}},[_c('el-radio',{attrs:{"label":"0"},on:{"change":_vm.parentMenuChanges},model:{value:(_vm.menuForm.level),callback:function ($$v) {_vm.$set(_vm.menuForm, "level", $$v)},expression:"menuForm.level"}},[_vm._v("一级菜单")]),_vm._v(" "),_c('el-radio',{attrs:{"label":"1"},on:{"change":_vm.parentMenuChanges},model:{value:(_vm.menuForm.level),callback:function ($$v) {_vm.$set(_vm.menuForm, "level", $$v)},expression:"menuForm.level"}},[_vm._v("二级菜单")]),_vm._v(" "),_c('el-radio',{attrs:{"label":"2"},on:{"change":_vm.parentMenuChanges},model:{value:(_vm.menuForm.level),callback:function ($$v) {_vm.$set(_vm.menuForm, "level", $$v)},expression:"menuForm.level"}},[_vm._v("三级菜单")]),_vm._v(" "),_c('el-radio',{attrs:{"label":"3"},on:{"change":_vm.parentMenuChanges},model:{value:(_vm.menuForm.level),callback:function ($$v) {_vm.$set(_vm.menuForm, "level", $$v)},expression:"menuForm.level"}},[_vm._v("子级菜单")])],1)],1),_vm._v(" "),_c('el-form-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.menuForm.level != 0),expression:"menuForm.level != 0"}],attrs:{"label":"父菜单：","prop":"father"}},[_c('el-col',{attrs:{"span":8}},[_c('el-cascader',{attrs:{"placeholder":"选择父菜单","options":_vm.temporaryFatherData,"props":_vm.props},model:{value:(_vm.menuForm.father),callback:function ($$v) {_vm.$set(_vm.menuForm, "father", $$v)},expression:"menuForm.father"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"菜单类别：","prop":"m_type"}},[_c('el-col',{attrs:{"span":15}},[_c('el-radio',{attrs:{"label":"0"},model:{value:(_vm.menuForm.m_type),callback:function ($$v) {_vm.$set(_vm.menuForm, "m_type", $$v)},expression:"menuForm.m_type"}},[_vm._v("系统功能菜单")]),_vm._v(" "),_c('el-radio',{attrs:{"label":"2"},model:{value:(_vm.menuForm.m_type),callback:function ($$v) {_vm.$set(_vm.menuForm, "m_type", $$v)},expression:"menuForm.m_type"}},[_vm._v("业务功能菜单")])],1)],1),_vm._v(" "),_c('el-form-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.menuForm.level != 2),expression:"menuForm.level != 2"}],attrs:{"label":"图标类型：","prop":"iconType"}},[_c('el-col',{attrs:{"span":8}},[_c('el-radio',{attrs:{"label":"0"},model:{value:(_vm.menuForm.iconType),callback:function ($$v) {_vm.$set(_vm.menuForm, "iconType", $$v)},expression:"menuForm.iconType"}},[_vm._v("字体图标")]),_vm._v(" "),_c('el-radio',{attrs:{"label":"1","disabled":""},model:{value:(_vm.menuForm.iconType),callback:function ($$v) {_vm.$set(_vm.menuForm, "iconType", $$v)},expression:"menuForm.iconType"}},[_vm._v("图片")])],1)],1),_vm._v(" "),_c('el-form-item',{directives:[{name:"show",rawName:"v-show",value:(_vm.menuForm.level != 2),expression:"menuForm.level != 2"}],attrs:{"label":"菜单图标：","prop":"iconName"}},[_c('el-col',{attrs:{"span":8}},[_c('el-button',{on:{"click":_vm.selectFontIconBox}},[_vm._v("请选择菜单的图标")]),_vm._v(" "),_c('i',{staticClass:"fa fa-lg",class:['fa-'+_vm.menuForm.iconName],staticStyle:{"margin-left":"10px"}})],1)],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"是否显示：","prop":"m_is_show"}},[_c('el-switch',{model:{value:(_vm.menuForm.m_is_show),callback:function ($$v) {_vm.$set(_vm.menuForm, "m_is_show", $$v)},expression:"menuForm.m_is_show"}}),_c('i',{staticClass:"el-icon-info more_info_icon"},[_vm._v(" 说明：是否在菜单栏显示。若为高级菜单不现实，则所属所有菜单都不显示")])],1),_vm._v(" "),_c('el-form-item',[_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.submitForm('menuForm')}}},[_vm._v("提交")]),_vm._v(" "),_c('el-button',{on:{"click":function($event){_vm.resetForm()}}},[_vm._v("重置")])],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});