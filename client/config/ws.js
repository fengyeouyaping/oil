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
        },
        fileList:{
          fileNum:'',
          dir:[]
        },
        equipmentNewDate:[],//设备信息
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
        
        const wsuri = "ws://123.56.97.235/server/"+userId;
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
          }
        }
        
        
        
      },
      websocketsend(Data){//数据发送
        this.websock.send(Data);
      },
      websocketclose(e){  //关闭
        console.log('断开连接',e);
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
      //更新设备实时信息
      getEquipmentNewDate(data){
        let datas = data
        if(datas.nodeId == this.newInfo.id){
          let lists = datas.stakes.filter((item)=>item.visitFlag)
          let result = []
          if(lists.length > 0){
            for(let i=0;i<datas.stakes.length;i++){
              result.push(datas.stakes[i])
              if(datas.stakes[i]['visitFlag']){
                break;
              }
            }
          }else{
            result = datas.stakes[0]
          }
          this.equipmentNewDate = result
        }
        
      },
    },
}
