webpackJsonp([12],{

/***/ 400:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_organizationalStructureGraphical_vue__ = __webpack_require__(682);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_organizationalStructureGraphical_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_organizationalStructureGraphical_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_organizationalStructureGraphical_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_organizationalStructureGraphical_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_03ff11d3_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_organizationalStructureGraphical_vue__ = __webpack_require__(880);
function injectStyle (ssrContext) {
  __webpack_require__(878)
}
var normalizeComponent = __webpack_require__(5)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-03ff11d3"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_organizationalStructureGraphical_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_03ff11d3_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_organizationalStructureGraphical_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 682:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _vuex = __webpack_require__(9);

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var myLocalDiagram = null;
var myFullDiagram = null;
var highlighter = null;
var _this = null;
exports.default = {
  //数据源
  data: function data() {
    return {};
  },

  //初始化函数
  mounted: function mounted() {

    _this = this;
    //获取组织架构信息
    this.initData();
    //organizationalStructureSearch
  },

  //计算属性
  computed: _extends({}, (0, _vuex.mapState)({
    organizationalData: function organizationalData(state) {
      return state.OrganizationalStructureGraphicalModule.organizationalData;
    }
  })),
  //组件方法
  methods: _extends({}, (0, _vuex.mapMutations)(["updateOrganziational", "OrganizationalStructureGraphicalModule/updateOrganziational"]), {

    //获取组织架构信息
    initData: function initData() {
      var _this2 = this;

      this.$myLoading.startLoading();
      this.$http.getHttp(this.$API.organizationalStructureSearch + "/skip/0/limit/1000", function (rs) {
        _this2.$myLoading.endLoading();
        _this2["OrganizationalStructureGraphicalModule/updateOrganziational"](rs.data);

        _this2.initNodeTree();
      });
    },


    //初始化节点树
    initNodeTree: function initNodeTree() {
      function init() {
        if (window.goSamples) goSamples();
        var $ = go.GraphObject.make;
        myFullDiagram = $(go.Diagram, "fullDiagram", {
          initialAutoScale: go.Diagram.UniformToFill, //自动缩放显示整个树
          maxScale: 0.8,
          contentAlignment: go.Spot.Center, //在视图中将树居中
          isReadOnly: true, //不允许用户更改图表
          "animationManager.isEnabled": false,
          layout: $(go.TreeLayout, {
            angle: 90,
            sorting: go.TreeLayout.SortingAscending
          }),
          maxSelectionCount: 1, //在每个图中每次只能选择一个节点
          //当选择发生更改时，更新myLocalDiagram视图
          ChangedSelection: showLocalOnFullClick
        });
        myLocalDiagram = $(go.Diagram, "localDiagram", {
          autoScale: go.Diagram.UniformToFill,
          contentAlignment: go.Spot.Center,
          isReadOnly: true,
          layout: $(go.TreeLayout, {
            angle: 90,
            sorting: go.TreeLayout.SortingAscending
          }),
          LayoutCompleted: function LayoutCompleted(e) {
            var sel = e.diagram.selection.first();
            if (sel !== null) myLocalDiagram.scrollToRect(sel.actualBounds);
          },
          maxSelectionCount: 1,
          //当选择发生更改时，更新myLocalDiagram的内容
          ChangedSelection: showLocalOnLocalClick
        });
        //定义由两个图共享的节点模板
        var myNodeTemplate = $(go.Node, "Auto", { locationSpot: go.Spot.Center }, new go.Binding("text", "key", go.Binding.toString), $(go.Shape, "Rectangle", new go.Binding("fill", "color"), {
          stroke: null
        }), $(go.TextBlock, {
          margin: 20
        }, new go.Binding("text", "os_name", function (k) {
          return "" + k;
        })));
        myFullDiagram.nodeTemplate = myNodeTemplate;
        myLocalDiagram.nodeTemplate = myNodeTemplate;
        //定义一个基本的链接模板，不可选择，由两个图共享
        var myLinkTemplate = $(go.Link, { routing: go.Link.Normal, selectable: false }, $(go.Shape, { strokeWidth: 1 }));
        myFullDiagram.linkTemplate = myLinkTemplate;
        myLocalDiagram.linkTemplate = myLinkTemplate;
        //创建完整的树形图
        setupDiagram();
        //在完整图的背景中创建一个部件以突出显示所选节点
        highlighter = $(go.Part, "Auto", {
          layerName: "Background",
          selectable: false,
          isInDocumentBounds: false,
          locationSpot: go.Spot.Center
        }, $(go.Shape, "Ellipse", {
          fill: $(go.Brush, "Radial", { 0.0: "ORANGE", 1.0: "#FFF" }),
          stroke: null,
          desiredSize: new go.Size(150, 150)
        }));
        myFullDiagram.add(highlighter);
        // 首先将图集中在树顶部的节点上
        // 在选择根节点之前，请等待树已经布局好
        myFullDiagram.addDiagramListener("InitialLayoutCompleted", function (e) {
          var node0 = myFullDiagram.findPartForKey(0);
          if (node0 !== null) node0.isSelected = true;
          showLocalOnFullClick();
        });
      }
      // 使全图中对应的节点与所选局部图中对应的节点相对应
      // 然后调用showLocalOnFullClick更新本地图
      function showLocalOnLocalClick() {
        var selectedLocal = myLocalDiagram.selection.first();
        if (selectedLocal !== null) {
          //有两个单独的节点，每个节点对应一个图，但是它们共享相同的键值
          myFullDiagram.select(myFullDiagram.findPartForKey(selectedLocal.data.key));
        }
      }
      function showLocalOnFullClick() {
        var node = myFullDiagram.selection.first();
        if (node !== null) {
          //确保选择的节点在视图中
          myFullDiagram.scrollToRect(node.actualBounds);
          //移动选定节点后面的黄色大节点以突出显示它
          highlighter.location = node.location;
          //为本地图创建一个新模型
          var model = new go.TreeModel();

          var nearby = node.findTreeParts(3); //子树的三个层次

          //添加父节点和祖父节点
          var parent = node.findTreeParentNode();
          if (parent !== null) {
            nearby.add(parent);
            var grandparent = parent.findTreeParentNode();
            if (grandparent !== null) {
              nearby.add(grandparent);
            }
          }
          //使用与myFullDiagram模型中相同的节点数据创建模型
          nearby.each(function (n) {
            if (n instanceof go.Node) model.addNodeData(n.data);
          });
          myLocalDiagram.model = model;
          //选择图焦点处的节点
          var selectedLocal = myLocalDiagram.findPartForKey(node.data.key);
          if (selectedLocal !== null) selectedLocal.isSelected = true;
        }
      }
      //创建包含总节点的树模型，每个节点具有可变数量的子节点
      function setupDiagram(total) {

        var nodeDataArray = [];

        for (var i = 0; i < _this.organizationalData.length; i++) {

          _this.organizationalData[i].key = _this.organizationalData[i].os_id;
          _this.organizationalData[i].color = "#FFF";

          if (_this.organizationalData[i].os_fid != 0) {
            _this.organizationalData[i].parent = _this.organizationalData[i].os_fid;
          }
        }

        myFullDiagram.model = new go.TreeModel(_this.organizationalData);
      }

      init();
    }
  })
};

/***/ }),

/***/ 878:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(879);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("2115baee", content, true, {});

/***/ }),

/***/ 879:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, ".organizationStructureTitleBox[data-v-03ff11d3]{width:100%;height:30px;line-height:30px;margin-bottom:10px}.organizationStructureTitleBox .DiagramItem[data-v-03ff11d3]{width:49.9999%;height:30px;font-size:14px;float:left}.organizationStructureTitleBox .DiagramItem i[data-v-03ff11d3]{margin-right:10px}#fullDiagram[data-v-03ff11d3]{float:left;margin:2px;margin-bottom:15px}#fullDiagram[data-v-03ff11d3],#localDiagram[data-v-03ff11d3]{height:500px;width:49.45555%;background:#eee;border:1px solid #ccc}#localDiagram[data-v-03ff11d3]{float:right;margin:2px}", ""]);

// exports


/***/ }),

/***/ 880:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"organizationStructureTitleBox"},[_c('div',{staticClass:"DiagramItem"},[_c('i',{staticClass:"fa fa-arrow-circle-down fa-lg"}),_vm._v("组织架构全图 "),_c('span',{staticStyle:{"color":"red"}},[_vm._v("(可点击节点，查看局部节点信息)")])]),_vm._v(" "),_c('div',{staticClass:"DiagramItem"},[_c('i',{staticClass:"fa fa-arrow-circle-down fa-lg"}),_vm._v("组织架构局部\n      ")])]),_vm._v(" "),_c('div',{attrs:{"id":"fullDiagram"}}),_vm._v(" "),_c('div',{attrs:{"id":"localDiagram"}})])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});