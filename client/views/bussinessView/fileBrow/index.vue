<template>
    <div class="realTimeData">
        <div class="content">
            <div class="header">
                <div style="font-size:18px;cursor:pointer;">
                    <span>返回上一级</span>/<span>全部文件</span>
                </div>
            </div>
            <div class="figure">
                <el-table :data="tableData" class="tableData" style="width:100%" height="100%" :stripe="true">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column label="文件">
                        <template slot-scope="scope">
                            <i class="el-icon-folder"></i>
                            <i class="el-icon-document"></i>
                            <span>1234556</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="time" label="日期"></el-table-column>
                    <el-table-column label="操作" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="daleteInfo(scope.row)" v-if="ifShow(0)">下载</el-button>
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
      };
    },

    mounted(){
    //   this.initData()
    },
    computed: {
        ...mapState({
            taskbars           : state => state.MenuModule.taskbars
        })
    },
    methods: {
        //导出
        fileExport(){
            window.location = this.$global.httpServer + this.$API.fileExport
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
        var params = {
          pageNum : this.pageNum,
          pageSize : this.$global.pageLimit,
          devGuid : this.filterText
        }
    
        this.$myLoading.startLoading()
        this.$http.postHttp(this.$API.deviceLogList,params,(data)=>{
          this.total = data.data.total
          this.tableData = data.data.list
          this.tableData.map((item) => {
                item.time = this.$common.dateFormat("YYYY-MM-dd",item.time/1000)
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
    .content{
        flex 1
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