import GLOBAL from './global'
import aa from './aa'
let i=0
export default {
    name : 'test',
    data() {
      return {
        websock: null,
        info: {
          devType:'',
          devGuid:'',
          hardVer:'',
          softVer:'',
          ip:'',
          port:'',
          postIvl:'',
          freq:'',
          aSample:'',
          fSample:'',
          fileNum:'',
          threshold:'',
          stake:'',
          lon:'',
          lat:'',
          remarks:'',
          Channel:'',
          OS:'',
          Range:''
        },
        fileList:{
          fileNum:'',
          dir:[]
        },
        equipmentNewDate:[],//设备信息
        filePath:'',
        fileName:'',
        isOpen:true
      }
    },
    created() {
      this.initWebSocket();
    },
    destroyed() {
      this.websock.close() //离开路由之后断开websocket连接
    },
    methods: {
      initWebSocket(){ //初始化weosocket
        let userId = JSON.parse(sessionStorage.getItem("userInfo")).id
        
        const wsuri = GLOBAL.wsAdd + "/server/"+userId;
        this.websock = new WebSocket(wsuri);
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onopen = this.websocketonopen;
        this.websock.onerror = this.websocketonerror;
        this.websock.onclose = this.websocketclose;
      },
      websocketonopen(){ //连接建立之后执行send方法发送数据
       
        // this.websocketsend(JSON.stringify(actions));
      },
      websocketonerror(){//连接建立失败重连
        this.initWebSocket();
      },
      websocketonmessage(e){ //数据接收

        if(e.data == '连接成功'){
          return
        }else{
          if(JSON.parse(e.data).cmd == 'deviceSettings'){//设备详情页面信息处理
            this.equipmentInfoPage(e)
          }else if(JSON.parse(e.data).cmd == 'deviceDirInfo'){//文件类型
            this.getDeviceDirInfo(e)
          }else if(JSON.parse(e.data).stakes){
            this.getEquipmentNewDate(JSON.parse(e.data))//大数据看版，设备数据
          }else if(JSON.parse(e.data).cmd == 'svrQuerySettings'){//固件上传
            this.getSvrSetSettings(e)
          }
        }
        
        
        
      },
      websocketsend(Data){//数据发送
        this.websock.send(Data);
      },
      websocketclose(e){  //关闭
        // console.log('断开连接',e);
        this.initWebSocket();
      },
      //设备详情页面信息处理
      equipmentInfoPage(val){
        
        let item = JSON.parse(val.data)
        // 1：石油管道检测设备，其他设备类型待定
        let devType = item.data.basic.DevType == 1 ? '石油管道检测设备' : '其他设备类型'
        this.info = {
          devType:devType,
          devGuid:item.data.basic.DevGuid,
          hardVer:item.data.basic.HardVer,
          softVer:item.data.basic.SoftVer,
          ip:item.data.netInfo.IP,
          port:item.data.netInfo.Port,
          postIvl:item.data.netInfo.PostIvl,
          freq:item.data.testInfo.Freq,
          aSample:item.data.testInfo.ASample,
          fSample:item.data.testInfo.FSample,
          fileNum:item.data.testInfo.FileNum,
          threshold:item.data.testInfo.Threshold,
          OS:item.data.testInfo.OS,
          Range:item.data.testInfo.Range,
          Channel:item.data.testInfo.Channel,
          stake:item.data.gisInfo.Stake,
          lon:item.data.gisInfo.Lon,
          lat:item.data.gisInfo.Lat,
          remarks:item.data.gisInfo.Remarks,
        }
        
      },
      //得到文件信息
      getDeviceDirInfo(val){
        let item = JSON.parse(val.data)
        this.fileList.dir = item.data.dir
        this.fileList.fileNum = item.data.fileNum
      },
      //得到固件上传的数据
      getSvrSetSettings(val){
        let item = JSON.parse(val.data)
        this.isOpen = item.data.isOpen == 1
        this.filePath = item.data.fileName
        this.fileName = item.data.fileName.split("\\")[item.data.fileName.split("\\").length-1]
      },
      //更新设备实时信息
      getEquipmentNewDate(data){
        this.$store.commit('HomeModule/updata_isOne',false)
        let datas = data
        // 测试代码 打开面几行，模拟管道运行
        
        // let datas = {}
        // datas.nodeId = 84
        // datas.stakes = aa[i]
        // i++
        // if(i == 5){
        //   i=0
        // }

        if(!this.newInfo || this.newInfo.modelFlag == 2){
          return false
        }
        
        if(datas.nodeId == this.newInfo.id){
          if(this.newInfo.devices && this.newInfo.devices.length > 0){
            for(let i=0;i<datas.stakes.length;i++){
              for(let j=0;j<this.newInfo.devices.length;j++){
                
                if(datas.stakes[i]['stakeNo'] == this.newInfo.devices[j]['stake']){
                  datas.stakes[i]['devGuid'] = this.newInfo.devices[j]['devGuid']
                  this.newInfo.devices[j]['visitFlag'] = datas.stakes[i]['visitFlag'] ? datas.stakes[i]['visitFlag'] : false 
                  this.newInfo.devices[j]['isOnline'] = datas.stakes[i]['isOnline'] ? datas.stakes[i]['isOnline'] : true 
                  this.newInfo.devices[j]['actArrivedTime'] = datas.stakes[i]['actArrivedTime'] ? datas.stakes[i]['actArrivedTime'] : false 
                  this.newInfo.devices[j]['deviceUpTime'] = datas.stakes[i]['deviceUpTime'] ? datas.stakes[i]['deviceUpTime'] : false 
                  this.newInfo.devices[j]['velocity'] = datas.stakes[i]['velocity'] ? datas.stakes[i]['velocity'] : false
                  
                }
              }
            }
          }

          let result = []
          
          for(let i=0;i<datas.stakes.length;i++){
            datas.stakes[i]['stake'] = datas.stakes[i]['stakeNo']
            result.push(datas.stakes[i])
          }

          result.reverse()
          this.equipmentNewDate = result
        }
        if(this.equipmentLists.length > 0 && this.newInfo){
          this.equipmentLists.map((itemss) => {
            if(itemss.nodeList){
              itemss.nodeList.map((items) => {
                if(items.nodeList){
                  items.nodeList.map((item) => {
                    if(item.id == this.newInfo.id && item.devices.length > 0){
                      for(let i=0;i<item.devices.length;i++){
                        for(let j=0;j<this.newInfo.length;j++){
                          if(item.devices[i]['devGuid'] == this.newInfo[j]['devGuid']){
                            item.devices[i]['isOnline'] = this.newInfo[j]['isOnline']
                          }
                        }
                      }
                    }
                  })
                }
              })
            }
          })
        }
        
      },
    },
}
