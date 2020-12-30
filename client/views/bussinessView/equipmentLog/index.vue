<template>
    <div class="realTimeData">
        <div class="content">
            <div class="header">
                <div>
                    <el-input placeholder="请输入设备编码" v-model="filterText" size="small" suffix-icon="el-icon-search" style="margin-right:10px"></el-input>
                    <el-date-picker
                        v-model="searchTime"
                        type="daterange"
                        size="small"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:00', '0:00:00']"
                        >
                    </el-date-picker>
                    <el-button @click="initDatas()" size="small" type="primary" style="margin-left:20px">搜索</el-button>
                </div>
                <div>
                    <i class="el el-icon-download" title="导出列表" v-if="ifShow(1)" @click="fileExport"></i>
                </div>
            </div>
            <div class="figure">
                <el-table :data="tableData" class="tableData" style="width:100%" height="100%" :stripe="true">
                    <el-table-column prop="id" label="序号"></el-table-column>
                    <el-table-column prop="time" label="上报时间"></el-table-column>
                    <el-table-column prop="devGuid" label="设备编码"></el-table-column>
                    <el-table-column label="告警类型">
                        <template slot-scope="scope">
                            <span :class="scope.row.status == 9 ? 'red' : ''">{{scope.row.status == 0 ? '待机' : scope.row.status == 1 ? '测试中' : scope.row.status == 9 ? scope.row.fault : ''}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="fault" label="内容"></el-table-column>
                    <el-table-column label="操作" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="daleteInfo(scope.row)" v-if="ifShow(0)">删除</el-button>
                        </template>
                    </el-table-column>
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
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {
      return {
            total:0,
            pageNum:1,
            isAddInfo:false,
            filterText: '',
            isCanOperate:false,
            tableData: [],
            searchTime:[new Date()-3600*24*1000,new Date()-0]
      };
    },

    mounted(){
      this.initData()
    },
    computed: {
        ...mapState({
            taskbars           : state => state.MenuModule.taskbars
        })
    },
    methods: {
        //导出
        fileExport(){
            if(!this.searchTime){
              this.searchTime = [new Date()-3600*24*1000,new Date()-0]
            }
            let startTime = this.searchTime[0]+0
            let endTime =  this.searchTime[1]+0
            let devGuid = this.filterText
            let url = this.$global.httpServer + this.$API.fileExport
            url += "?startTime="+startTime+"&endTime="+endTime
            if(devGuid) url += "&devGuid="+devGuid
            window.location = url
        },
        ifShow(index){
            return this.taskbars[2]['childMenus'][0]['childMenus'][index]['visible']
        },
        initDatas(){
            this.pageNum = 1
            this.initData()
        },
        //列表数据
      initData(){
          if(!this.searchTime){
              this.searchTime = [new Date()-3600*24*1000,new Date()-0]
          }
        var params = {
          pageNum : this.pageNum,
          pageSize : this.$global.pageLimit,
          devGuid : this.filterText,
          startTime : this.searchTime[0]+0,
          endTime :  this.searchTime[1]+0
        }
    
        this.$myLoading.startLoading()
        this.$http.postHttp(this.$API.deviceLogList,params,(data)=>{
          this.total = data.data.total
          this.tableData = data.data.list
          this.tableData.map((item) => {
                item.time = item.time ? this.$common.dateFormat("YYYY-MM-dd",item.time/1000) : ''
            })
          this.data = this.$common.arrayOrganizationalNew(this.tableData)
          this.$myLoading.endLoading()

        })
      },
        //删除日志信息
        daleteInfo(item){
            this.$confirm('确定删除此日志信息吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$myLoading.startLoading()

                this.$http.getHttp(this.$API.deviceLogDelete+"?id="+item.id,(data)=>{
                    this.initData()
                    this.$notify({
                        title: '删除成功',
                        message: '',
                        type: 'success'
                    });
                    this.$myLoading.endLoading()
                })
            }).catch(() => {});
        },
        //当前页数
        handleCurrentChange(val){
            this.pageNum = val
            this.initData()
        },
      handleClick(data,type){
          if(type === 1){
              this.$router.push({
                path: "/equipmentInfo"
              });
          }else if(type === 2){
              this.$router.push({
                path: "/equipmentEditor"
              });
          }
      }
    },
}
</script>
<style lang="stylus" scoped>
.mask{
    position absolute
    width 100%
    height 100%
    margin-left -10px
    background rgba(0,0,0,0.3)
    z-index 10
    right 0
    .margin{
        width 400px
        background #ffffff
        border-radius 5px
        margin 20% auto  
        padding 20px 
        position relative
        .close{
            position absolute
            top 10px
            right 10px
            font-size 25px
            color #999
        } 
        .header{
            font-size 18px
            color #333
            font-weight bold
            text-align center
        }
        .from{
            margin-top 20px
        }
    }
}
.realTimeData{
    display flex
    height 100%
    overflow hidden
    .content{
        flex 1
        overflow auto
        .header{
            padding 20px 20px 10px
            display flex
            align-items center
            justify-content space-between
            .el-input{
                width 240px
            } 
            div{
                display flex
                i{
                    font-size 18px
                    margin-left 20px
                    cursor pointer
                }
                
            }   
        }
        .figure{
            height 85%  
            padding 10px 20px
            .block{
                text-align center    
            }
        }
        
    }
}
.el-pagination{
    float none 
    margin 0 auto
    text-align center   
}
</style>