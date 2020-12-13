<template>
  <div>
    
        <div class="tableHeader">
          <div class="tableHeaderTitle">组织架构列表</div>
          <div class="tableHeaderMenu">
            <el-button-group>
              <el-button icon="el-icon-arrow-left" @click="goBackNode" size="mini"></el-button>
              <el-button icon="el-icon-refresh" size="mini"></el-button>
            </el-button-group>
          </div>
        </div>
          <el-table
            ref="multipleTable"
            :data="nodeData"
            tooltip-effect="dark"
            style="width: 100%">
          
          <el-table-column
            prop="os_id"
            label="节点ID"
            width="80">
          </el-table-column>
          <el-table-column
            prop="os_name"
            label="节点名称">
          </el-table-column>
          <el-table-column
            :formatter="inheritFormatter"
            prop="os_is_inherit"
            label="是否继承上级权限">
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="getNodeData(scope.row.os_id)">查看子节点</el-button>
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      <el-row>
       
        <el-col :span="12">
          <!-- <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
          </el-pagination> -->
        </el-col>
      </el-row>
   
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  mounted() {
    this.initNodeData()
  },
  computed: {
    ...mapState({
      organizationalData: state =>
        state.OrganizationStructureListModule.organizationalData
    }),
    nodeData() {
      return this.nodeDataArr;
    }
  },
  methods: {
    ...mapMutations([
      "updateOrganziational",
      "OrganizationStructureListModule/updateOrganziational"
    ]),

    inheritFormatter(row, column, cellValue, index){
       return cellValue == 0 ? "否" : "是"
     },

    //编辑组织架构
    handleEdit(index,item) {

      this.$router.push({
        path: "/editOrganizationalStructure",
        query : {
          os_id : item.os_id
        }
      });

    },
    getNodeData(fid) {
      if (fid == 0) {
        this.lastFid = -1;
      } else {
        //根据当前节点查询父节点ID
        this.organizationalData.forEach(item => {
          if (item.os_id == fid) {
            this.lastFid = item.os_fid;
            return;
          }
        });
      }

      //筛选满足条件的节点信息
      this.nodeDataArr = this.organizationalData.filter(item => {
        return item.os_fid == fid;
      });
    },
    goBackNode() {
      if (this.lastFid == -1) {
        this.$myPop.WarningMessage("该节点已经是根节点了，无法继续返回");
        return;
      }
      this.getNodeData(this.lastFid);
    },

    initNodeData(){

      //获取组织架构数据
      this.$myLoading.startLoading();
      this.$http.getHttp(
        this.$API.organizationalStructureSearch +
          "/skip/" +
          this.skip +
          "/limit/1000",
        rs => {
          this.$myLoading.endLoading();
          this["OrganizationStructureListModule/updateOrganziational"](rs.data);
          this.getNodeData(0, 0);
        }
      );
      
    },

    handleDelete(index, item) {

      this.$myPop.confirmBox(
        "删除提示",
        "确定要删除该节点吗？",
        ()=>{

          var params = {
            osid : item.os_id
          }

          this.$myLoading.startLoading()
          this.$http.postHttp(this.$API.systemApiRemoveNode,params, rs => {
            this.$myPop.SuccessMessage()
            this.initNodeData()
          });

        }
      );
    }
  },
  data() {
    return {
      currentPage: "",
      nodeDataArr: [],
      skip: 0,
      lastFid: 0
    };
  }
};
</script>

<style lang="stylus" scoped>
</style>
