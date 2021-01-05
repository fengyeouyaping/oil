<template>
    <div class="realTimeData">
        <div class="content">
            <div class="header">
                <div>
                    <el-input placeholder="请输入测试桩号" v-model="filterText" size="small" suffix-icon="el-icon-search"></el-input>
                    <el-button @click="initDatas()" size="small" type="primary" style="margin-left:20px">搜索</el-button>
                </div>
                <div>
                    <i class="el el-icon-download" title="导出模版" @click="fileExport"></i>
                </div>
            </div>
            <div class="figure">
                <el-table :data="tableData" class="tableData" style="width:100%" height="100%" :stripe="true">
                    <el-table-column prop="id" label="序号"></el-table-column>
                    <el-table-column prop="stake" label="测试桩号"></el-table-column>
                    <el-table-column prop="estimatedTime" label="预计到达时间"></el-table-column>
                    <el-table-column prop="actTime" label="实际到达时间"></el-table-column>
                    <el-table-column prop="speed" label="运行速度"></el-table-column>
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
        this.initData()
    },
    methods: {
        //导出
        fileExport(){
            window.location = his.$global.httpServer+this.$API.recordExport + "?stake="+this.filterText
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
                stake: this.filterText
            }
        
            this.$myLoading.startLoading()
            this.$http.postHttp(this.$API.recordList,params,(data)=>{
            this.total = data.data.total
            this.tableData = data.data.list
            this.tableData.map((item) => {
                item.actTime = item.actTime ? this.$common.dateFormat("YYYY-MM-dd",item.actTime/1000) : ''
                item.createTime = item.createTime ? this.$common.dateFormat("YYYY-MM-dd",item.createTime/1000) : ''
                item.estimatedTime = item.estimatedTime ? this.$common.dateFormat("YYYY-MM-dd",item.estimatedTime/1000) : ''
            })
            this.$myLoading.endLoading()

            })
      },
        //当前页数
        handleCurrentChange(val){
            this.pageNum = val
            this.initData()
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