<template>
    <div class="realTimeData">
        <div class="left">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="small" suffix-icon="el-icon-search"></el-input>
            <div class="left_title">公司信息</div>
            <el-tree class="filter-tree" :data="data" :props="defaultProps" default-expand-all :filter-node-method="filterNode" ref="tree" @node-click="nodeClick"></el-tree>
        </div>
        <div class="content">
          <div class="seach">
            <el-input placeholder="请输入设备编码" v-model="devGuid" size="small" suffix-icon="el-icon-search" style="width:300px"></el-input>
            <div class="block">
                    <el-date-picker
                      v-model="time"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                    <el-button type="primary" size="small" style="margin-left:20px" @click="getscheat()">查询</el-button>
                </div>
          </div>
            <div class="figure1">
              <div style="height:90%">
                <el-table :data="tableData" class="tableData" height="100%" :stripe="true">
                    <el-table-column prop="id" label="终端ID"></el-table-column>
                    <el-table-column prop="devGuid" label="测试桩编号"></el-table-column>
                    <el-table-column prop="stamp" label="时间"></el-table-column>
                    <el-table-column prop="a" label="特征A"></el-table-column>
                    <el-table-column prop="b" label="特征B"></el-table-column>
                    <el-table-column prop="c" label="特征C"></el-table-column>
                    <el-table-column prop="d" label="特征D"></el-table-column>
                    <el-table-column prop="e" label="特征E"></el-table-column>
                    <el-table-column prop="fault" label="备注"></el-table-column>
                </el-table>
              </div>
                <el-pagination
                background
                :current-page="pageNum"
                :page-size="$global.pageLimit"
                @current-change="handleCurrentChange"
                layout="prev, pager, next"
                :total="total">
            </el-pagination>
            </div>
            <div class="figure2">
                <div class="barLists">
                  <div>
                    <bar-top :id="`his1`" :lineData="lineData" :name="name1" v-if="lineData.length > 0"></bar-top>
                  </div>
                  <div>
                    <bar-top :id="`his2`" :lineData="lineData" :name="name2" v-if="lineData.length > 0"></bar-top>
                  </div>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
import barTop from './barTop.vue'
export default {
    components:{
        barTop
    },
    data() {
      return {
        filterText: '',
        devGuid:'',
        tableData: [],
        data: [],
        defaultProps: {
          children: 'nodeList',
          label: 'name'
        },
        pageNum:1,
        total:0,
        time: [new Date().getTime() - 3600 * 1000 * 0.5,new Date().getTime()],
        devGuid:'',
        nodeId:'',
        lineData:[],
        name1:"B特征",
        name2:"C特征",
      };
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    mounted(){
        this.company()
    },
    methods: {
      //当前页数
      handleCurrentChange(val){
          this.pageNum = val
          this.getscheat()
      },
      //点击搜索
      getscheat(){
        if(this.time[1] - this.time[0] > 3600 * 1000 * 0.5){
          this.$notify({
              title: '选择时间范围不能超过0.5小时',
              message: '',
              type: 'warning'
          });
          return false
        }
        this.getListData()
      },
      //切换设备
      nodeClick(data){
        this.nodeId = data.id
        this.getscheat()
      },
      //时间变化
      timeChange(){
        this.initData()
      },

      //得到列表数据
      getListData(){
        this.lineData = []
        var params = {
            nodeId:this.nodeId,
            startTime:this.time[0]/1000*1000,
            endTime :this.time[1]/1000*1000,
            pageNum : this.pageNum,
            pageSize : this.$global.pageLimit,
            devGuid:this.devGuid
        }
          this.$http.postHttp(this.$API.historyList,params,(rs)=>{
            this.tableData = rs.data.list
            this.total = rs.data.total
            this.getimgData(this.tableData[0]['devGuid'])
          })
      },
      //得到图表数据
      getimgData(devGuid){
        var params = {
            // devGuids:[devGuid],
            nodeId:this.nodeId,
            startTime:this.time[0]/1000*1000,
            endTime :this.time[1]/1000*1000,
        }
          this.$http.postHttp(this.$API.historyData,params,(rs)=>{
            this.lineData = rs.data
          })
      },
      //列表数据
      company(){
        this.$http.postHttp(this.$API.deviceListAll,{},(rs)=>{
          this.data = rs.data.nodes
          this.data.map((item) => {
              if(item.nodeList){
                  item.nodeList.map((itemite) => {
                      if(itemite.nodeList){
                          itemite.nodeList.map((childrenItem) => {
                              this.lineList.push(childrenItem)
                          })
                      }
                  })
              }
          })
          this.devGuid = this.lineList[0]['id']
          this.initData()

        })
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      initData(){
        var params = {
            devGuid:this.devGuid,
            startTime:this.time[0]/1000*1000,
            endTime :this.time[1]/1000*1000,
        }
    
        this.$myLoading.startLoading()
        this.$http.postHttp(this.$API.deviceDataList,params,(data)=>{
            this.tableData = data.data
            this.$myLoading.endLoading()

        })
      }
    },
}
</script>
<style lang="stylus" scoped>
.realTimeData{
    display flex
    height 100%
    .left{
        width 200px
        padding 20px 10px 20px 10px
        border-right 10px solid #f5f2f2
        .left_title{
            font-size 14px
            margin-top 20px
            font-weight bold
        }
    }
    .content{
        flex 1
        .seach{
          margin 18px
          display flex
          justify-content space-around
          align-items center
        }
        .figure1{
            height 55%  
            padding 10px 20px
        }
        .figure2{
            height 40%  
            padding 10px 20px
            .block{
                margin-top 20px
                text-align center    
            }
            .barLists{
                display flex
                height 100%
                &>div{
                  width 100%
                  height 80%  
                }  
            }
        }
        
        
    }
}
</style>