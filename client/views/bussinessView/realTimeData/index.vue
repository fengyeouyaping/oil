<template>
    <div class="realTimeData">
        <div class="left">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="small" suffix-icon="el-icon-search"></el-input>
            <div class="left_title">公司信息</div>
            <el-tree class="filter-tree" :data="data" :props="defaultProps" default-expand-all :filter-node-method="filterNode" ref="tree"></el-tree>
        </div>
        <div class="content">
            <div class="figure">
                <bar-top :id="`bar1`"></bar-top>
            </div>
            <div class="figure">
                <bar-top :id="`bar2`"></bar-top>
            </div>
            <div class="data">
                <ul>
                    <li><span>启动监控:</span>2020.10.10 15:00</li>
                    <li v-for="(ite,index) in 15" :key="index" :class="index%2 === 0 ? 'active' : ''"><span>到达xp6-{{ite}}:</span>2020.10.10 15:00</li>
                </ul>
            </div>
        </div>
        <div class="right">
            <div class="margin">
                <div class="model top">
                    <ul>
                        <li><span>位置:</span><p>{{right.location}}</p></li>
                        <li><span>经纬度:</span><p>{{right.latitudeLlongitude}}</p></li>
                        <li><span>天气:</span><p>{{right.weather}}</p></li>
                        <li><span>风力:</span><p>{{right.wind}}</p></li>
                        <li><span>温度:</span><p>{{right.temperature}}</p></li>
                        <li><span>湿度:</span><p>{{right.humidity}}</p></li>
                        <li><span>PM2.5:</span><p>{{right.PM25}}</p></li>
                    </ul>
                </div>
                <div class="model" v-for="(item,index) in right['equipmentList']" :key="index" v-if="right['equipmentList'].length > 0">
                    <ul>
                        <li><span>设备编码:</span><p>{{item.coding}}</p></li>
                        <li><span>设备状态:</span><p>{{item.state}}</p></li>
                        <li><span>预计到达时间:</span><p>{{item.planTime}}</p></li>
                        <li><span>实际到达时间:</span><p>{{item.actualTime}}</p></li>
                        <li><span>运行速度:</span><p>{{item.speed}}</p></li>
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
        right:{
            location:'富平县',
            latitudeLlongitude:"116.39，39.91",
            weather:"晴",
            wind:"3级",
            temperature:"25度",
            humidity:"50%",
            PM25:"50",
            equipmentList:[{
                id:1,
                coding:"XS9527",
                state:'正常',
                planTime:"2020.10.20 15:20:00",
                actualTime:"2020.10.20 15:20:00",
                speed:"50 m/s"
            },{
                id:2,
                coding:"XS9528",
                state:'正常',
                planTime:"2020.10.20 15:20:00",
                actualTime:"2020.10.20 15:20:00",
                speed:"50 m/s"
            }]
        },
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
            height 35%   
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
        width 200px
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
                li{
                    display flex 
                    margin-bottom 15px
                    span{
                        min-width 105px
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