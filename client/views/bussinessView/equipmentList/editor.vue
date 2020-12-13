<template>
    <div class="realTimeInfo">
        <div>
            <ul>
                <li class="title">设备控制</li>
            </ul>
            <ul>
                <li style="text-align:center">
                    <el-button type="primary" size="mini" @click="deviceLogSend('deviceDeleteFiles')">清除数据文件</el-button>
                    <el-button type="primary" size="mini" @click="deviceLogSend('deviceDirInfo')">获取文件列表 </el-button>
                    <el-button type="primary" size="mini" @click="deviceLogSend('deviceSettings')">获取配置信息</el-button>
                    <el-button type="primary" size="mini" @click="deviceLogSend('deviceStartSaveFile')">启动</el-button>
                    <el-button type="primary" size="mini" @click="deviceLogSend('deviceReset')">重启</el-button>
                    <el-button type="primary" size="mini" @click="deviceLogSend('deviceUnregister')">注销</el-button>
                </li>
            </ul>
        </div>
        <div>
            <ul>
                <li class="title">设置设备采集配置</li>
            </ul>
            <ul>
                <li>采样频率</li>
                <li><el-input v-model="info.freq" placeholder="请输入内容"></el-input></li>
                <li>采样时长</li>
                <li><el-input v-model="info.length" placeholder="请输入内容"></el-input></li>
            </ul>
            <ul>
                <li>采样次数</li>
                <li><el-input v-model="info.number" placeholder="请输入内容"></el-input></li>
                <li>数据存储阀值</li>
                <li><el-input v-model="info.threshold" placeholder="请输入内容"></el-input></li>
            </ul>
            <ul>
                <li>单个文件存储时长</li>
                <li><el-input v-model="info.saveLong" placeholder="请输入内容"></el-input></li>
                <li>量程选择</li>
                <li><el-input v-model="info.freq" placeholder="请输入内容"></el-input></li>
            </ul>
        </div>
        <div class="btns">
            <el-button type="primary" size="mini" @click="sendCommand('deviceTestInfo')">设置设备采集配置</el-button>
        </div>
        <div>
            <ul>
                <li class="title">设置设备网络配置</li>
            </ul>
            <ul>
                <li>服务器IP地址</li>
                <li><el-input v-model="info.ip" placeholder="请输入内容"></el-input></li>
                <li>服务器端口</li>
                <li><el-input v-model="info.port" placeholder="请输入内容"></el-input></li>
            </ul>
            <ul>
                <li>自动上传时间间隔</li>
                <li><el-input v-model="info.postLvl" placeholder="请输入内容"></el-input></li>
                <li></li>
                <li></li>
            </ul>
        </div>
        <div class="btns">
            <el-button type="primary" size="mini" @click="sendCommand('deviceNetInfo')">设置设备网络配置</el-button>
        </div>
        <div>
            <ul>
                <li class="title">设置设备GIS配置</li>
            </ul>
            <ul>
                <li>测试桩号</li>
                <li><el-input v-model="info.stake" placeholder="请输入内容"></el-input></li>
                <li>备注</li>
                <li><el-input v-model="info.remarks" placeholder="请输入内容"></el-input></li>
            </ul>
            <ul>
                <li>经度</li>
                <li><el-input v-model="info.lon" placeholder="请输入内容"></el-input></li>
                <li>纬度</li>
                <li><el-input v-model="info.lat" placeholder="请输入内容"></el-input></li>
            </ul>
        </div>
        <div class="btns">
            <el-button type="primary" size="mini" @click="sendCommand('deviceGisInfo')">设置设备GIS配置</el-button>
            <el-button type="info" size="mini" @click="goToTop">返回</el-button>
        </div>
        <!-- <div class="listTitle">设备文件列表</div>
            <div class="excel_list">
                <el-table :data="fileList" style="width:100%">
                    <el-table-column prop="fileName" label="文件名称"></el-table-column>
                    <el-table-column label="操作" fixed="right">
                        <template slot-scope="scope,index">
                            {{index}}
                            <el-upload
                                class="upload-demo"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-change="handleChange">
                                <el-button size="small" type="primary">上传</el-button>
                            </el-upload>
                            <el-button type="primary" size="small">下载</el-button>
                            <el-button type="primary" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div> -->
    </div>
</template>
<script>
export default {
    data() {
        return {
            isSwitch:true,
            info: {},
            newTime:'',
            fileList:[]
        };
    },
    mounted(){
        this.getDateInfo()
        this.deviceFileList()
    },
    methods: {
        //获取信息
        getDateInfo(){
            this.$myLoading.startLoading()
            this.$http.getHttp(this.$API.deviceGet+"?devGuid="+this.$route.query.devGuid,(data)=>{
                
                data.data.port = data.data.svrPort
                data.data.ip = data.data.svrIp
                this.info = data.data
                this.$myLoading.endLoading()
            })
        },
        //保存
        submitForm(){
            var params = this.info
        
            this.$myLoading.startLoading()
            this.$http.postHttp(this.$API.deviceUpdate,params,(data)=>{
                this.$notify({
                  title: '设备编辑成功',
                  message: '',
                  type: 'success'
                });

                setTimeout(()=>this.goToTop(),1000)
                this.$myLoading.endLoading()
            })
        },
                    // 命令字名称 含义 
                    // deviceDirInfo data为空字符，获得设备上文件列表 
                    // deviceFileInfo 获得设备上指定的数据文件 
                    // deviceDeleteFiles data为空字符,清除设备上的数据文件 
                    // deviceStartSaveFile data为空字符，启动设备保存数据文件 
                    // deviceSettings data为空字符，获得设备配置信息 
                    // deviceTestInfo 设置设备采集配置 
                    // deviceNetInfo 设置设备网络配置 
                    // deviceGisInfo 设置设备GIS配置 
                    // deviceReset data为空字符，设备重启 
                    // deviceUnregister 注销设备，data为空字符
        //发送命令
        deviceLogSend(type){
            let params = {
                cmd:type,
                data:'',
                targetDevice : this.$route.query.devGuid,
            }
        
            this.$myLoading.startLoading()
            this.$http.postHttp(this.$API.deviceLogSend,params,(data)=>{
            this.getDateInfo()

            })
        },
        //发送设置命令
        sendCommand(type){
            let info = 
            {
                devGuid: this.info.devGuid,
                hardVer: this.info.hardVer,
                ip: this.info.ip,
                nodeId: this.info.nodeId,
                port: this.info.port,
                remark: this.info.remark,
                softVer: this.info.softVer,
                stake: this.info.stake,
                status: this.info.status,
                svrIp: this.info.svrIp,
                svrPort: this.info.svrPort,
                threshold: this.info.threshold.split(','),
                freq:this.info.freq,
                lat:this.info.lat,
                length:this.info.length,
                lon:this.info.lon,
                number:this.info.number,
                postLvl:this.info.postLvl,
                remarks:this.info.remarks,
                saveLong:this.info.saveLong,
            }

            var params = {
                cmd:type,
                data:info,
                targetDevice : this.$route.query.devGuid,
            }
            
            this.$myLoading.startLoading()
            this.$http.postHttp(this.$API.deviceLogSend,params,(data)=>{

            this.$myLoading.endLoading()

            })
        },
        //文件列表
        deviceFileList(){
            this.$http.getHttp(this.$API.deviceFileList+"?devGuid="+this.$route.query.devGuid,(data)=>{
                this.fileList = data.data
                
            })
        },
        goToTop(){
          this.$router.go(-1)
        }
    },
}
</script>
<style lang="stylus" scoped>
.listTitle{
    border-bottom 1px solid #eeeeee
    border-left 1px solid #ffffff
    margin-left -1px
    height 40px
    line-height 40px
    font-size 14px
    font-weight bold
    text-align center
}
.excel_list{
    border-right 1px solid #eeeeee
    .upload-demo{
        display inline-block
        margin-right 10px
    }

}
.realTimeInfo{
    margin 20px 20px
    &>div{
        border-top 1px solid #eeeeee
        border-left 1px solid #eeeeee
        ul{
            display flex
            justify-content space-between
            li{
                list-style none
                flex 1
                height 60px
                line-height 60px
                padding 0 20px
                border-right 1px solid #eeeeee
                border-bottom 1px solid #eeeeee
                font-size 14px
                &.title{
                    font-weight bold  
                    font-size 16px
                    text-align center  
                }
                &:nth-child(odd){
                    font-weight bold    
                }
            }
        }
        &.btns{
            border-left 1px solid #ffffff
            margin 20px 0 20px -1px
            border-top none
        }
    } 
}
</style>