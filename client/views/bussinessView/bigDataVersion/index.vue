<template>
  <div class="bigNum">
    <div class="header">
      <img src="~BUSSINESS_IMAGE/images/1604237368117.jpg" alt="">
      <p class="newColorTop">油气管道监测大数据看版</p>
      <img src="~BUSSINESS_IMAGE/images/1604237434688.jpg" alt="">
    </div>
    <div class="big_content">
      <div class="left_list">
        <div class="left_top">
          <div class="top_header">
            <p class="newColorContent">油气管道监测点分布</p>
            <img src="~BUSSINESS_IMAGE/images/1604239617231.jpg" alt="">
          </div>
          <div class="top_content">
            <div class="num">
              <div class="top_header">
                <p>点位数<span>(个)</span></p>
                <img src="~BUSSINESS_IMAGE/images/1604239617231.jpg" alt="">
              </div>
              <div class="num_bottom">{{someDigits}}</div>
            </div>
            <!-- <div class="numBottom">
              <div class="top_header">
                <p>当前设备<span></span></p>
                <img src="~BUSSINESS_IMAGE/images/1604239617231.jpg" alt="">
              </div>
              <div class="num_bottom">{{pointInfo.basic.stake}}</div>
            </div> -->


            
            <div class="images">
              <Map ref="maps"></Map>
              <!-- <img src="~BUSSINESS_IMAGE/images/content.png" alt=""> -->
            </div>
          </div>
        </div>
        <div class="left_bottom">
          <div class="item">
            <div class="bottom_header">
              <p class="newColorContent">设备数据</p>
            </div>
            <div class="bottom_content_text">
              <ul>
                <li v-for="item in equipmentNewDate">
                  <p>设备{{item.stakeNo}}</p>
                  <div>
                    <p>预计到达时间:<span>{{getTime(item.evalArrivedTime)}}</span></p>
                    <p>实际到达时间:<span>{{getTime(item.actArrivedTime)}}</span></p>
                    <p>运行速度:<span>{{getVelocity(item.velocity)}}m/s</span></p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="right_list">
        <div class="right_top">
          <div class="top_header">
            <p class="newColorContent">油气管道监测点分布</p>
            <img src="~BUSSINESS_IMAGE/images/1604239617231.jpg" alt="">
          </div>
          <div class="info_list">
            <p>{{pointInfo.city.name}}</p>
            <ul>
              <li>
                <div class="info_item">
                  <img src="~BUSSINESS_IMAGE/images/1604237057196.jpg" alt="">
                  <span></span>
                </div>
                <p>经纬度</p>
                <p>{{pointInfo.basic.lon}}-{{pointInfo.basic.lat}}</p>
              </li>
              <li>
                <div class="info_item">
                  <img src="~BUSSINESS_IMAGE/images/1604237115030.jpg" alt="">
                  <img class="waterIcon" :src="pointInfo.condition.icon ? require('../../../assets/resources/bussiness/water/water/W'+pointInfo.condition.icon+'.png') : ''" alt="">
                  <span>{{pointInfo.condition.temp}}C</span>
                </div>
                <p>天气</p>
                <p>{{pointInfo.condition.condition}}</p>
              </li>
              <li>
                <div class="info_item">
                  <img src="~BUSSINESS_IMAGE/images/1604237241076.jpg" alt="">
                  <span>{{pointInfo.condition.windDir}}</span>
                </div>
                <p>风力</p>
                <p>{{pointInfo.condition.windLevel}}级</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="right_bottom">
          <div class="top_header">
            <p class="newColorContent">设备列表</p>
            <img src="~BUSSINESS_IMAGE/images/1604239617231.jpg" alt="">
          </div>
          <div class="right_bottom_info">
            <div v-for="(item,index) in equipmentLists" class="item" :key="index">
              <!-- <header >
                <i class="fontIconEl el" :class="!item.nodeList || (item.nodeList && item.nodeList.length == 0) ? 'left14' : item.isShow ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" @click="shouitem(item,index)"></i>
                  {{item.name}}
              </header> -->
              <div v-for="(ite,inde) in item.nodeList" :key="inde" v-show="item.isShow">
                <!-- <div class="title">
                  <i class="fontIconEl el" :class="!ite.nodeList || (ite.nodeList && ite.nodeList.length == 0) ? 'left14' : ite.isShow ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" @click="shouitem(ite,inde)"></i>
                  {{ite.name}}
                </div> -->
                <div v-for="(son,sonIndex) in ite.nodeList" :key="sonIndex" v-show="ite.isShow">
                  <div class="title" :class="newInfo.id == son.id ? 'active' : ''">
                    <div @click="newMap(son)">
                      <i class="fontIconEl el" :class="!son.devices || (son.devices && son.devices.length == 0) ? 'left14' : son.isShow ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" @click.stop="shouitem(son,sonIndex)"></i>
                      {{son.name}}
                    </div>
                    <el-switch v-model="son.modelFlag" :active-value="1" :inactive-value="2" active-color="#13ce66" inactive-color="#999999" @change="getChange(son)"></el-switch>
                  </div>
                  <ul>
                    <li v-for="(grandSon,grandSonIndex) in son.devices" @click="newMap(grandSon)" :key="grandSonIndex" v-show="son.isShow && grandSon.isShow">
                      <img src="~BUSSINESS_IMAGE/images/1.png" alt="" v-if="grandSon.status == 0">
                      <img src="~BUSSINESS_IMAGE/images/2.png" alt="" v-if="grandSon.status == 1">
                      <img src="~BUSSINESS_IMAGE/images/3.png" alt="" v-if="grandSon.status == 9">
                      <span :class="pointInfo.basic.devGuid == grandSon.devGuid ? 'grandSonActive' : ''">{{grandSon.stake}}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    

  </div>
</template>

<script>
import Map from './map/map.vue'
import ws from '../../../config/ws'
export default {
  mixins:[ws],
  components:{
    Map
  },
  data() {
    return {
      reportUrl: '',
      equipmentLists:[],
      newInfo:{},
      someDigits:0,//点位数
      pointInfo:{
        basic:{},
        city:{},
        condition:{}
      },//点的信息
      equipmentNewDate:[],//设备信息
    }
  },
  watch: {
    '$route': function() {
      // 监听路由变化
      this.reportUrl = this.$route.meta.pathUrl
    },
    equipmentNewDate(val){
      if(val && val.length > 0){
          for(let i=0;i<val.length;i++){
            for(let j=0;j<this.newInfo.devices.length;j++){
              
              if(val[i]['stakeNo'] == this.newInfo.devices[j]['stake']){
                val[i]['devGuid'] = this.newInfo.devices[j]['devGuid'] 
                this.newInfo.devices[j]['visitFlag'] = val[i]['visitFlag'] ? val[i]['visitFlag'] : false 
                this.newInfo.devices[j]['isOnline'] = val[i]['isOnline'] ? val[i]['isOnline'] : true 
              }
            }
          }
      }
      setTimeout(() => {
        this.$store.commit('HomeModule/UPDATE_POIN_INFO',this.newInfo.devices ? this.newInfo.devices : [])
        this.$refs.maps.init()
      },500)
    }
  },
  mounted() {
    this.equipmentList()
  },
  methods: {
    //时间精确到秒
    getTime(time){
      return time ? time.split('.')[0] : ''
    },
    //处理速度
    getVelocity(velocity){
      return Math.floor( Number(velocity) * 10) / 10
    },
      getChange(data){
        
        var params = {
            comment : data.comment,
            name : data.name,
            id : data.id,
            modelFlag:data.modelFlag
        }
    
        this.$http.postHttp(this.$API.nodeUpdate,params,(res)=>{
          if(res){
            this.$notify({
                title: '树结构修改成功',
                message: '',
                type: 'success'
            });
          }else{
            data.modelFlag = data.modelFlag==1?2:1
          }
          this.$store.commit('HomeModule/updata_isOne',true)
          this.equipmentList()
        })
      },
      newMap(item){
        
        this.newInfo = item
        if(item.devices && item.devices.length > 0 && item.modelFlag == 1){
          this.bigDataLists(this.newInfo.id)
          this.$store.commit('HomeModule/updata_isOne',true)
          this.pointInfo.basic = item.devices[0]
          this.someDigits = item.devices.length || 0
          this.getPointInfo(item['devices'][0] ? item['devices'][0]['devGuid'] : '')
          
        }else if(item.devices && item.modelFlag == 2){

        }else{
          this.pointInfo.basic = item
          this.getDeviceWeather(item.lat,item.lon)
          if(!item.devGuid){
            this.$store.commit('HomeModule/UPDATE_POIN_INFO',[])
            this.$refs.maps.init()
          }
          
        }
        
        
      },
      //设备列表
      equipmentList(){
    
        this.$myLoading.startLoading()
        this.$http.postHttp(this.$API.deviceListAll,{},(data)=>{
          this.newInfo = false
          this.equipmentLists = data.data.nodes
          let forList = (list) => {
            list.map((item) => {
              item.isShow = true
              if(item.devices && item.devices.length > 0 && item.modelFlag == 1 && !this.newInfo){
                this.newInfo = item
              }
              if(item.nodeList){
                forList(item.nodeList)
              }
              if(item.devices){
                forList(item.devices)
              }
            })
          }

          if(this.equipmentLists.length > 0){
            forList(this.equipmentLists)

            if(this.newInfo){
              this.bigDataLists(this.newInfo.id)
            
              this.someDigits = this.newInfo.devices.length || 0
              
              this.getPointInfo(this.newInfo['devices'][0] ? this.newInfo['devices'][0]['devGuid'] : '')
          
            }else{
              this.$store.commit('HomeModule/UPDATE_POIN_INFO',[])
              this.equipmentNewDate = []
              this.$refs.maps.init()
            }
          }else{
            this.$store.commit('HomeModule/UPDATE_POIN_INFO',[])
            this.$refs.maps.init()
          }
          
          this.$myLoading.endLoading()

        })
      },
      //点击展开
      shouitem(items,index){

        let newInfo = {}
        if(items.devices && items.devices.length > 0){
          this.someDigits = items.devices.length || 0
        }else{
          let forList = (list) => {
            
            list.map((item) => {
              
              if(item.devices && item.devices.length > 0){

                newInfo = item
              }
              if(item.nodeList){
                forList(item.nodeList)
              }
            })
          }
          
          forList([items])
          this.someDigits = newInfo.devices ? newInfo.devices.length : 0
        }

        items.isShow = !items.isShow
        this.$forceUpdate();
      },
      //获取点的信息
      getPointInfo(devGuid){
        
        this.$http.getHttp(this.$API.deviceGet+"?devGuid="+devGuid,(data)=>{
          
            this.pointInfo.basic = data.data
            this.getDeviceWeather(data.data.lat,data.data.lon)
        })
      },
      //查询大数据数据
      bigDataLists(nodeId){
        if(nodeId){
          
          this.$http.getHttp(this.$API.bigData+"?nodeId="+nodeId,(data)=>{
            
            this.equipmentNewDate = data.data ? data.data : []
            this.equipmentNewDate.reverse()
            
          })
        }
          
      },
      //获取城市、天气信息
      getDeviceWeather(lat,lon){
        if(lat && lon){
          this.$http.getHttp(this.$API.deviceWeather+"?lat="+lat+"&lon="+lon,(data)=>{
            this.pointInfo.city = data.data.city
            this.pointInfo.condition = data.data.condition || []
            this.$myLoading.endLoading()
          })
        } 
        
      }
  }
}
</script>
<style lang="stylus" scoped>
.grandSonActive{
  font-size 16px !important
  font-weight bold !important
}
.top_header{
  height 50px
  width 80%
  position relative
  
  p{
    color #FFFFFF
    font-weight bold
    font-size 18px
    height 100%
    line-height 50px
    padding-left 20px
  }
  img{
    width 100%
    position absolute
    bottom 0
    left 0
  }
}
.bigNum{
  width 100%
  height 100%
  position relative
  background #010443
  position relative
  .header{
    height 80px
    width 100%
    display flex
    justify-content space-between
    align-items flex-end
    border-bottom 1px solid #1a38b5
    position absolute
    top 0
    left 0
    img{
      height 35px
    }
    p{
      color #FFFFFF
      font-size 32px
      letter-spacing 10px
      font-weight bold
    }
  }
  .big_content{
    // background rgba(100,100,100,0.1)
    border 2px solid rgba(100,100,100,0.2)
    border-radius 3px
    position absolute
    top 100px
    right 20px
    bottom 20px
    left 20px
    display flex
    .left_list{
      width 72%
      .left_top{
        height 80%
        display flex
        flex-direction column
        .top_content{
          position relative
          width 100%
          height 100%
          overflow auto
          .num,.numBottom{
            position absolute
            left 150px
            top 20px
            z-index 10
            .top_header{
              width 100%
              p{
                width 100%
                font-size 14px
                padding-left 0px
                letter-spacing 2px
                span{
                  font-size 12px
                }
              }
              img{
                bottom 8px
                height 2px
              }
            }
            
            .num_bottom{
              width 130px
              height 25px
              line-height 28px
              font-size 18px
              font-weight bold
              color #ffffff
              background:linear-gradient(to right,#1349ad,rgba(0,0,0,0))
              padding-left 20px
            }
          }
          .numBottom{
            left 300px
          }
          .images{
            width 100%
            height 100%
            img{
              width 100%
              height 100%
            }
          }
        }
      }
      .left_bottom{
        height 20%
        width 100%
        display flex
        color #ffffff
        .item{
          width 100%
          height 100%
          .bottom_header{
            height 25px
            line-height 25px
            font-size 12px
            padding-left 20px
            border-top 1px solid #1a38b5
            color #14c5c2
            background:linear-gradient(to right,#1349ad,rgba(0,0,0,0))
          }
          .bottom_content_text{
            height 147px
            overflow auto
            padding 20px 20px 0 20px
            li{
              margin-bottom 10px
              list-style none
              &>p{
                padding 5px 0
              }
              &>div{
                padding-left 80px
                display flex
                font-size 12px
                justify-content space-between
                p{
                  flex 1
                  display inline
                  span{
                    color #14c5c2
                    padding-left 5px
                  }
                }
              }
              &.right{
                padding-top 15px
              }
            }
            
          }
        }
      }
    }
    .right_list{
      width 28%
      display flex
      flex-direction column
      .right_top{
        margin-bottom 30px
        .top_header{
          p{
            padding-left 0
          }
          img{
            height 3px
          }
        }
        .info_list{
          display flex
          justify-content space-between
          align-items center
          margin-top 40px
          height 140px
          &>p{
            width 80px
            font-size 14px
            font-weight bold
            color: #7dedfe !important;
            text-align center
          }
          ul{
            display flex
            justify-content space-between
            flex 1
            li{
              list-style none 
              color #ffffff
              font-size 12px
              text-align center
              flex 1
              .info_item{
                position relative
                text-align center
                img{
                  width 80px
                  height 80px
                }
                .waterIcon{
                  position absolute
                  z-index 10
                  width 40px
                  height 40px 
                  top 10px 
                  left 50%
                  margin-left -20px
                  background #010443
                  border-radius 10px
                }
                span{
                  position absolute
                  width 100%
                  left 0
                  bottom 15px
                  color #ffffff
                  font-size 10px
                }
              }
            }
          }
        }
      }
      .right_bottom{
        display flex
        flex-direction column
        overflow-y auto
        .top_header{
          p{
            padding-left 0
          }
          img{
            height 3px
          }
        }
        .right_bottom_info{
            padding 20px 0 0 0
            overflow-y auto
            .item{
              position relative
              min-height 38px
              .fontIconEl{
                font-size 16px
                color #999999  
                margin-right 5px
                
              }
              .left14{
                margin-left 22px  
              }
              header{
                color #7dedfe
                font-weight bold
                font-size 18px
                cursor pointer
                opacity 0.9
              }
              .title{
                // font-size 14px
                // padding-top 4px
                padding-bottom 10px
                // color #ffffff
                // cursor pointer
                // opacity 0.7
                padding-right 10px
                color #7dedfe
                font-weight bold
                font-size 18px
                cursor pointer
                opacity 0.9
                display flex
                justify-content space-between
                &.active{
                  opacity 1
                  font-weight bold
                }
              }
              ul{
                padding-left 50px
                li{
                  margin-bottom 4px
                  background:linear-gradient(to right,#1349ad,rgba(0,0,0,0))
                  list-style none
                  display flex
                  align-items center
                  height 40px
                  font-size 14px
                  color #ffffff
                  cursor pointer
                  img{
                    margin-right 25px
                    margin-left 25px
                    width 25px
                    height 25px
                  }
                }
              }
            }
        }
      }
    }
  }
}
.newColorTop{
  background: linear-gradient(to bottom, #7dedfe, #0c2676) !important;
  -webkit-background-clip: text !important;
  color: transparent !important;
}
.newColorContent{
  background: linear-gradient(to right, #7dedfe, #0c2676) !important;
  -webkit-background-clip: text !important;
  color: transparent !important;
}
</style>

