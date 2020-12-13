<template>
  <div>
    <div class="organizationStructureTitleBox">
        <div class="DiagramItem">
            <i class="fa fa-arrow-circle-down fa-lg"></i>组织架构全图 <span style="color:red;">(可点击节点，查看局部节点信息)</span>
        </div>
        <div class="DiagramItem">
            <i class="fa fa-arrow-circle-down fa-lg"></i>组织架构局部
        </div>
    </div>  
    <div id="fullDiagram"></div>
    <div id="localDiagram"></div>
  </div>
</template>

<script>
var myLocalDiagram = null
var myFullDiagram = null
var highlighter = null
var _this = null
import { mapState, mapMutations } from "vuex";
export default {
  //数据源
  data() {
    return {
       
    };
  },
  //初始化函数
  mounted() {

      _this = this
    //获取组织架构信息
    this.initData();
    //organizationalStructureSearch
  },
  //计算属性
  computed: {
    ...mapState({
      organizationalData: state =>
        state.OrganizationalStructureGraphicalModule.organizationalData
    })
  },
  //组件方法
  methods: {
    ...mapMutations([
      "updateOrganziational",
      "OrganizationalStructureGraphicalModule/updateOrganziational"
    ]),

    //获取组织架构信息
    initData() {
      this.$myLoading.startLoading();
      this.$http.getHttp(
        this.$API.organizationalStructureSearch + "/skip/0/limit/1000",
        rs => {
          this.$myLoading.endLoading();
          this["OrganizationalStructureGraphicalModule/updateOrganziational"](
            rs.data
          );

          this.initNodeTree();
        }
      );
    },

    //初始化节点树
    initNodeTree() {
      function init() {
        if (window.goSamples) goSamples();
        var $ = go.GraphObject.make;
        myFullDiagram = $(
          go.Diagram,
          "fullDiagram",
          {
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
          }
        );
        myLocalDiagram = $(go.Diagram, "localDiagram", {
          autoScale: go.Diagram.UniformToFill,
          contentAlignment: go.Spot.Center,
          isReadOnly: true,
          layout: $(go.TreeLayout, {
            angle: 90,
            sorting: go.TreeLayout.SortingAscending
          }),
          LayoutCompleted: function(e) {
            var sel = e.diagram.selection.first();
            if (sel !== null) myLocalDiagram.scrollToRect(sel.actualBounds);
          },
          maxSelectionCount: 1,
          //当选择发生更改时，更新myLocalDiagram的内容
          ChangedSelection: showLocalOnLocalClick
        });
        //定义由两个图共享的节点模板
        var myNodeTemplate = $(
          go.Node,
          "Auto",
          { locationSpot: go.Spot.Center },
          new go.Binding("text", "key", go.Binding.toString),
          $(go.Shape, "Rectangle", new go.Binding("fill", "color"), {
            stroke: null
          }),
          $(
            go.TextBlock,
            { 
              margin:20
            },
            new go.Binding("text", "os_name" , function(k) {
              return "" + k;
            })
          )
        );
        myFullDiagram.nodeTemplate = myNodeTemplate;
        myLocalDiagram.nodeTemplate = myNodeTemplate;
        //定义一个基本的链接模板，不可选择，由两个图共享
        var myLinkTemplate = $(
          go.Link,
          { routing: go.Link.Normal, selectable: false },
          $(go.Shape, { strokeWidth: 1 })
        );
        myFullDiagram.linkTemplate = myLinkTemplate;
        myLocalDiagram.linkTemplate = myLinkTemplate;
        //创建完整的树形图
        setupDiagram();
        //在完整图的背景中创建一个部件以突出显示所选节点
        highlighter = $(
          go.Part,
          "Auto",
          {
            layerName: "Background",
            selectable: false,
            isInDocumentBounds: false,
            locationSpot: go.Spot.Center
          },
          $(go.Shape, "Ellipse", {
            fill: $(go.Brush, "Radial", { 0.0: "ORANGE", 1.0: "#FFF" }),
            stroke: null,
            desiredSize: new go.Size(150, 150)
          })
        );
        myFullDiagram.add(highlighter);
        // 首先将图集中在树顶部的节点上
        // 在选择根节点之前，请等待树已经布局好
        myFullDiagram.addDiagramListener("InitialLayoutCompleted", function(e) {
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
          myFullDiagram.select(
            myFullDiagram.findPartForKey(selectedLocal.data.key)
          );
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
          nearby.each(function(n) {
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

        for(var i=0;i<_this.organizationalData.length;i++){

            _this.organizationalData[i].key    = _this.organizationalData[i].os_id
            _this.organizationalData[i].color  = "#FFF"
            
            if(_this.organizationalData[i].os_fid != 0){
                _this.organizationalData[i].parent = _this.organizationalData[i].os_fid
            }
        }

        myFullDiagram.model = new go.TreeModel(_this.organizationalData);
      }

      init()
    }
  }
};
</script>

<style lang="stylus" scoped>
.organizationStructureTitleBox {
    width 100%
    height 30px
    line-height 30px
    margin-bottom 10px

    .DiagramItem {
        width 49.9999%
        height 30px
        font-size 14px
        float left

        i {
            margin-right 10px
        }
    }
}

#fullDiagram {
    float left
    height 500px
    width 49.45555% 
    background #eee
    border 1px solid #ccc
    margin 2px
    margin-bottom 15px
}

#localDiagram{
    float right
    height 500px
    width 49.45555% 
    background #eee
    border 1px solid #ccc
    margin 2px
}
</style>