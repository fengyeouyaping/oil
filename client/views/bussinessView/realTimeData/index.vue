<template>
    <div class="realTimeData">
        <div class="left">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="small" suffix-icon="el-icon-search"></el-input>
            <div class="left_title">公司信息</div>
            <el-tree class="filter-tree" :data="data" :props="defaultProps" default-expand-all :filter-node-method="filterNode" ref="tree" @node-click="nodeClick"></el-tree>
        </div>
        <div class="content">
            <div class="figure">
                <bar-top :id="`bar1`"></bar-top>
            </div>
            <div class="figure">
                <bar-top :id="`bar2`"></bar-top>
            </div>
        </div>
        <div class="right">
            <div class="margin">
                <div class="model top" v-for="item in rightDate">
                    <ul>
                        <li><span>设备编码:</span><p>{{item.device.devGuid}}</p></li>
                        <li><span>设备状态:</span><p>{{item.device.status}}</p></li>
                        <li><span>位置:</span><p>{{item.device.status}}</p></li>
                        <li><span>天气:</span><p>{{item.device.status}}</p></li>
                        <li><span>经纬度:</span><p>{{`${item.device.lat},${item.device.lon}`}}</p></li>
                        <li><span>风力:</span><p>{{item.device.status}}</p></li>
                        <li><span>温度:</span><p>{{item.device.status}}</p></li>
                        <li><span>湿度:</span><p>{{item.device.status}}</p></li>
                        <li><span>PM2.5:</span><p>{{item.device.status}}</p></li>
                        <li><span>启动检测时间:</span><p>{{item.device.status}}</p></li>
                        <li><span>预计到达时间:</span><p>{{item.device.status}}</p></li>
                        <li><span>实际到达时间:</span><p>{{item.device.status}}</p></li>
                        <li><span>运行速度:</span><p>{{item.device.status}}</p></li>
                    </ul>
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
        rightDate:[],
        data: [],
        defaultProps: {
          children: 'nodeList',
          label: 'name'
        }
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
            })
        },
        //切换设备
        nodeClick(data){
            let nodeId = data.id
            this.getNewLists(nodeId,)
        },
        //获取实时数据列表
        getNewLists(nodeId,num=12){
            let url = this.$API.nowList + "?nodeId="+nodeId+"&num="+num
            this.$http.getHttp(url,(rs)=>{
                console.log(rs.data.deviceAndLogs)
                this.rightDate = rs.data.deviceAndLogs
            })
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
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
        padding 20px 0
        flex 1
        .figure{
            width 100%
            height 50%   
        }
        .data{
            height 29%   
            overflow-y auto
            border-top 1px solid #ddd
            padding 10px 
            li{
                list-style none 
                height 30px
                line-height 30px
                font-size 14px
                letter-spacing 4px
                text-align center
                &.active{
                    background #f5f2f2
                }
                span{
                    display inline-block
                    width 120px
                }
            }
        }
    }
    .right{
        width 400px
        min-width 400px
        height 100%
        background #f5f2f2
        .margin{
            width 100%
            height 100%
            overflow-y auto    
            .model{
                border-bottom 1px solid #ddd
                font-weight bold
                padding 20px 20px 
                ul{
                    display flex
                    flex-wrap wrap
                    justify-content space-between
                    li{
                        display flex 
                        margin-bottom 15px
                        width 45%
                        span{
                            min-width 105px
                        }
                    }
                }      
                &.top li span{
                    min-width 65px
                }
            }
        }
    }
}
</style>