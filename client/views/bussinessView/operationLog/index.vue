<template>
    <div class="realTimeData">
        <div class="content">
            <div class="header">
                <div>
                    <el-input placeholder="请输入操作用户" v-model="filterText" size="small" suffix-icon="el-icon-search"></el-input>
                    <el-button @click="initDatas()" size="small" type="primary" style="margin-left:20px">搜索</el-button>
                </div>
            </div>
            <div class="figure">
                <el-table :data="tableData" class="tableData" style="width:100%" height="100%" :stripe="true">
                    <el-table-column prop="id" label="序号"></el-table-column>
                    <el-table-column prop="time" label="操作时间"></el-table-column>
                    <el-table-column prop="name" label="操作用户"></el-table-column>
                    <el-table-column prop="ip" label="IP地址"></el-table-column>
                    <el-table-column prop="operation" label="功能"></el-table-column>
                    <el-table-column prop="state" label="执行状态"></el-table-column>
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
        initDatas(){
            this.pageNum = 1
            this.initData()
        },
            //列表数据
        initData(){
            var params = {
                pageNum : this.pageNum,
                pageSize : this.$global.pageLimit,
                name: this.filterText
            }
        
            this.$myLoading.startLoading()
            this.$http.postHttp(this.$API.operationList,params,(data)=>{
            this.total = data.data.total
            this.tableData = data.data.list
            this.tableData.map((item) => {
                item.time = this.$common.dateFormat("YYYY-MM-dd",item.time/1000)
                item.state = item.state == 1 ? '成功' : '失败'
            })
            this.$myLoading.endLoading()

            })
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