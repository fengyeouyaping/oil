<template>
    <div class="realTimeData">
        <div class="left">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="small" suffix-icon="el-icon-search"></el-input>
            <div class="left_title">公司信息</div>
            <el-tree class="filter-tree" :data="data" :props="defaultProps" default-expand-all :filter-node-method="filterNode" :expand-on-click-node="false" ref="tree" @node-click="nodeClick"></el-tree>
        </div>
        <div class="content">
            <div class="seach">
                <el-input type="number" placeholder="请输入要展示的点的个数" v-model="num" size="small" suffix-icon="el-icon-search" style="width:150px" @mousemove="clear()" @mouseleave="state()"></el-input>
                <el-button type="primary" size="small" style="margin-left:20px" @click="getscheat()">查询</el-button>
            </div>
            <div class="figure" v-if="rightDate && rightDate.length > 0" @mousemove="clear()" @mouseleave="state()" @click="bigImg(1)">
                <bar-top :id="`bar1`" :name="name1"></bar-top>
            </div>
            <div class="figure" v-if="rightDate && rightDate.length > 0" @mousemove="clear()" @mouseleave="state()" @click="bigImg(2)">
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
                        <li><span>经纬度:</span><p>{{item.lat && item.lon ? `${item.lat},${item.lon}` : ''}}</p></li>
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
        <div v-if="!!bigImgNum" class="big_img">
            <div class="big_img_top">
                <div class="seach">
                    <el-input type="number" placeholder="请输入要展示的点的个数" v-model="num" size="small" suffix-icon="el-icon-search" style="width:150px" @mousemove="clear()" @mouseleave="state()"></el-input>
                    <el-button type="primary" size="small" style="margin-left:20px" @click="getscheat()">查询</el-button>
                </div>
                <i class="el-icon-circle-close big_img_i" @click="clearBigImg(0)"></i>
            </div>
            <div class="figure" v-if="rightDate && rightDate.length > 0" @mousemove="clear()" @mouseleave="state()">
                <bar-top :id="`bar3`" :name="name1" class="bigImg" v-if="bigImgNum == 1"></bar-top>
                <bar-top :id="`bar4`" :name="name2" class="bigImg" v-if="bigImgNum == 2"></bar-top>
            </div>
            <div class="figure loading" v-else 
            v-loading="true"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0.8)"
            >
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
        activeIndex:0,
        devGuid:'',
        num:12,
        time: new Date(),
        timeDate: [new Date()-3600 * 1000 * 0.5,new Date()],
        bigImgNum:0
      };
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      },
      lineData(val){
          let result = []
          if(val && val.length > 0){
            for(let i=0;i<val.length;i++){
                result.push(val[i])
            }
            result.reverse()
          }else{
              result = val
          }
          
          this.$store.commit('HomeModule/updata_newLineData',result)
      },
      time(val){
        this.timeDate = [val,val]
      }
    },
    mounted(){
        this.company()
    },
    methods: {
        //放大图
        bigImg(num){
            this.bigImgNum = num
            this.getNewLists(this.devGuid,this.activeIndex)
        },
        clearBigImg(num){
            this.bigImgNum = num
            this.getNewLists(this.devGuid,this.activeIndex)
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
        getscheat(){
            this.getNewLists(this.devGuid,0)
        },
        //获取实时数据列表
        getNewLists(devGuid,index){
            this.devGuid = devGuid
            this.activeIndex = index
            this.lineData = []
            let url = this.$API.nowList + "?devGuid="+devGuid+"&num="+this.num
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
        //结束轮询
        clear(){
            clearInterval(this.getNum)
        },
        //开始轮询
        state(){
            this.getNumDate(this.devGuid)
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
                let url = this.$API.nowList + "?devGuid="+devGuid+"&num="+this.num
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
    overflow hidden
    position relative
    .big_img{
        position absolute
        width 100%
        height 100%
        top 0
        bottom 0
        left 0
        right 0
        z-index 101
        background rgba(0,0,0,0.8)
        .loading{
          top 121px
          width 100%
        }
        .big_img_top{
            position relative
            z-index 210
            .big_img_i{
                position absolute
                top 121px
                right 15%
                font-size 30px
                color #000000
                z-index 210
            }
        }
        .bigImg{
            position fixed !important
            z-index 200
            top 100px
            left 10%
            right 0
            bottom 0
            width 80%
            height 70%
            padding 15px 0 0 15px
            background #ffffff
        } 
    }
    .seach{
        position absolute
        top 21px
        right 15%
        display flex
    }
    .left{
        min-width 300px
        padding 20px 10px 20px 10px
        border-right 10px solid #f5f2f2
        .left_title{
            font-size 14px
            margin-top 20px
            font-weight bold
        }
    }
    .content{
        padding 80px 0
        flex 1
        overflow auto
        position relative
        .seach{
            position absolute
            top 21px
            right 0
            display block
            left 10px
        }
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