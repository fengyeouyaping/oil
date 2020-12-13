<template>
    <div class="realTimeData">
        <div class="left">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="small" suffix-icon="el-icon-search"></el-input>
            <div class="left_title">公司信息</div>
            <el-tree class="filter-tree" :data="data" :props="defaultProps" default-expand-all :filter-node-method="filterNode" ref="tree"></el-tree>
        </div>
        <div class="content">
            <div class="figure1">
                <el-table :data="tableData" class="tableData" height="100%" :stripe="true">
                    <el-table-column prop="id" label="终端ID"></el-table-column>
                    <el-table-column prop="devGuid" label="测试桩编号"></el-table-column>
                    <el-table-column prop="stamp" label="时间"></el-table-column>
                    <el-table-column prop="a" label="特征A"></el-table-column>
                    <el-table-column prop="b" label="特征B"></el-table-column>
                    <el-table-column prop="c" label="特征C"></el-table-column>
                    <el-table-column prop="d" label="特征D"></el-table-column>
                    <el-table-column prop="e" label="特征E"></el-table-column>
                    <el-table-column prop="address" label="备注"></el-table-column>
                </el-table>
            </div>
            <div class="figure2">
                <div class="block">
                    <el-date-picker
                    v-model="time"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="-"
                    start-placeholder="起始时间"
                    end-placeholder="结束时间"
                    :picker-options="pickerOptions"
                    @change="timeChange">
                    </el-date-picker>
                </div>
                <div class="barLists">
                  <div>
                    <bar-top :id="`his1`"></bar-top>
                  </div>
                  <div>
                    <bar-top :id="`his2`"></bar-top>
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
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        time: ''
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
      //时间变化
      timeChange(){
        this.initData()
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