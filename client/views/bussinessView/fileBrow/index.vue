<template>
    <div class="realTimeData">
        <div class="content">
            <div class="header">
                <div style="font-size:18px;cursor:pointer;">
                    <span @click="getBeforeLists()">返回上一级</span>/<span @click="initData()">全部文件</span>
                </div>
            </div>
            <div class="figure">
                <el-table :data="tableData" class="tableData" style="width:100%" height="100%" :stripe="true" @row-click="getNewLists">
                    <el-table-column label="文件">
                        <template slot-scope="scope">
                            <i v-if="scope.row.fileType == 'dir'" class="el-icon-folder"></i>
                            <i v-else class="el-icon-document"></i>
                            <span>{{scope.row.fileName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="updateTime" label="日期"></el-table-column>
                    <el-table-column label="操作" fixed="right">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click.stop="fileDownload(scope.row.filePath)" v-if="scope.row.fileType != 'dir'">下载</el-button>
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
        newPath:''
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
            window.location = this.$global.httpServer + this.$API.fileExport
        },
        //下载
        fileDownload(filePath){
            window.location = this.$global.httpServer + this.$API.fileListDownload + "?filePath=" + filePath
        },
        //点击获取上一级
        getBeforeLists(){
            let lists = this.newPath.split('/')
            lists.pop()
            this.initData(lists.join('/')+'/')
        },
        //点击获取下一级
        getNewLists(row){
            if(row.fileType == 'dir'){
                this.initData(row.filePath)
            }
        },
        //列表数据
      initData(filePath = ''){
        this.lastPath = filePath
        let path = filePath
    
        this.$myLoading.startLoading()
        this.$http.getHttp(this.$API.fileList+"?path=" + path,(data)=>{
          this.tableData = data.data.files
          this.newPath = data.data.dirPath
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
        margin 100px auto  
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
<style lang="stylus">
.tableData{
    .el-table__row{
        cursor pointer
    }
}
</style>