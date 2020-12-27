<template>
    <div class="realTimeData">
        <div class="left">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="small" suffix-icon="el-icon-search"></el-input>
            <div class="left_title">公司信息</div>
            <el-tree class="filter-tree" :data="data" :props="defaultProps" default-expand-all :filter-node-method="filterNode" :expand-on-click-node="false" ref="tree" @node-click="nodeClick"></el-tree>
        </div>
        <div class="content">
            <div class="figure" v-if="rightDate && rightDate.length > 0">
                <bar-top :id="`bar1`" :name="name1"></bar-top>
            </div>
            <div class="figure" v-if="rightDate && rightDate.length > 0">
                <bar-top :id="`bar2`" :name="name2"></bar-top>
            </div>
        </div>
        <div class="right" v-if="rightDate && rightDate.length > 0">
            <div class="margin">
                <div class="model top" v-for="(item,index) in rightDate" @click="getNewLists(item.devGuid,index)" :class="index == activeIndex ? 'active' : ''">
                    <ul>
                        <li><span>设备编码:</span><p>{{item.devGuid}}</p></li>
                        <li><span>设备状态:</span><p>{{item.status}}</p></li>
                        <li><span>位置:</span><p>{{item.info ? item.info.city.name : ''}}</p></li>
                        <li><span>天气:</span><p>{{item.info && item.info.condition ? item.info.condition.condition : ''}}</p></li>
                        <li><span>经纬度:</span><p>{{`${item.lat},${item.lon}`}}</p></li>
                        <li><span>风力:</span><p>{{item.info && item.info.condition ? item.info.condition.windLevel : ''}}</p></li>
                        <li><span>温度:</span><p>{{item.info && item.info.condition ? item.info.condition.temp : ''}}</p></li>
                        <li><span>湿度:</span><p>{{item.info && item.info.condition ? item.info.condition.humidity : ''}}</p></li>
                        <!-- <li><span>PM2.5:</span><p>{{item.status}}</p></li> -->
                        <li><span>启动检测时间:</span><p>{{item.bigData ? item.bigData.startTime : ''}}</p></li>
                        <li><span>预计到达时间:</span><p>{{item.bigData ? item.bigData.evalArrivedTime : ''}}</p></li>
                        <li><span>实际到达时间:</span><p>{{item.bigData ? item.bigData.actArrivedTime : ''}}</p></li>
                        <li><span>运行速度:</span><p>{{item.bigData ? item.bigData.dblVelocity  : ''}}</p></li>
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
        },
        lineData:[],
        name1:"B特征",
        name2:"C特征",
        getNum:'',
        nodeId:'',
        activeIndex:0
      };
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      },
      lineData(val){
          this.$store.commit('HomeModule/updata_newLineData',val)
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
                                if(childrenItem && childrenItem.devices && childrenItem.devices.length > 0 && this.rightDate.length == 0){
                                    this.nodeClick(childrenItem)
                                }
                            })
                        }
                    })
                }
            })
            })
        },
        //切换设备
        nodeClick(data){
            if(data.level == 2){
                this.nodeId = data.id
                this.rightDate = data.devices
                if(data.devices.length > 0){
                    let devGuid = data['devices'][0].devGuid
                    this.getNewLists(devGuid,0)
                    if(this.rightDate && this.rightDate.length > 0){
                        this.rightDate.map((item) => {
                            this.getDeviceWeather(item.lat,item.lon,(list) => {
                                item.info = list
                                this.$forceUpdate()
                            })
                        })
                    }
                    this.bigDataLists(this.nodeId)
                }
            }
            
            
        },
        //获取实时数据列表
        getNewLists(devGuid,index){
            this.activeIndex = index
            this.lineData = []
            let url = this.$API.nowList + "?devGuid="+devGuid+"&num=12"
            this.$http.getHttp(url,(rs)=>{
                if(rs.data && rs.data.length > 0){
                    rs.data.map((item) => {
                        item.devGuid = devGuid
                    })
                    this.lineData = rs.data
                    this.getNumDate(devGuid)
                }else{
                    clearInterval(this.getNum)
                }
                
            })
        },
        
        //获取城市、天气信息
        getDeviceWeather(lat,lon,cb){
            this.$http.getHttp(this.$API.deviceWeather+"?lat="+lat+"&lon="+lon,(data)=>{
                cb(data.data)
            }) 
        },
        //查询大数据数据
        bigDataLists(nodeId){
            this.$http.getHttp(this.$API.bigData+"?nodeId="+nodeId,(data)=>{
                if(data.data && data.data.length > 0){
                    for(let i=0;i<data.data.length;i++){
                        this.rightDate[i]['bigData'] = data.data[i]
                    }
                    this.$forceUpdate()
                }
            })
        },
        getNumDate(devGuid){
            clearInterval(this.getNum)

            this.getNum = setInterval(() => {
                let url = this.$API.nowList + "?devGuid="+devGuid+"&num=12"
                this.$http.getHttp(url,(rs)=>{
                    if(rs.data && rs.data.length > 0){
                        rs.data.map((item) => {
                            item.devGuid = devGuid
                        })
                        this.lineData = rs.data
                    }
                })
            },5000)
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        }
    },
    destroyed(){
        clearInterval(this.getNum)
    }
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
                cursor pointer
                &.active{
                    background #fefefe
                }
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