<template>
    <div class="realTimeInfo">
        <div>
            <ul>
                <li style="text-align:center">
                    <el-button type="primary" size="mini" @click="deviceLogSend('deviceSettings')">获得设备参数</el-button>
                    <el-button type="primary" size="mini" @click="deviceLogSend('deviceReset')">复位设备</el-button>
                    <el-button type="primary" size="mini" @click="deviceLogSend('deviceUnregister')">注销设备</el-button>
                </li>
            </ul>
        </div>
        <div v-if="ifGetInfo">
            <ul>
                <li class="title">基础信息</li>
            </ul>
            <ul>
                <li>设备类型</li>
                <li><el-input v-model="info.devType" placeholder="请输入内容"></el-input></li>
                <li>设备编号</li>
                <li><el-input v-model="info.devGuid" placeholder="请输入内容"></el-input></li>
            </ul>
            <ul>
                <li>硬件版本</li>
                <li><el-input v-model="info.hardVer" placeholder="请输入内容"></el-input></li>
                <li>软件版本</li>
                <li><el-input v-model="info.softVer" placeholder="请输入内容"></el-input></li>
            </ul>
        </div>
        <div v-if="ifGetInfo">
            <ul>
                <li class="title">网络信息</li>
            </ul>
            <ul>
                <li>服务器IP地址</li>
                <li><el-input v-model="info.ip" placeholder="请输入内容"></el-input></li>
                <li>服务器端口</li>
                <li><el-input v-model="info.port" placeholder="请输入内容"></el-input></li>
            </ul>
            <ul>
                <li>时间间隔</li>
                <li><el-input v-model="info.postIvl" placeholder="请输入内容"></el-input></li>
                <li></li>
                <li><el-button type="primary" size="mini" @click="sendCommand('deviceNetInfo')">设置网络信息</el-button></li>
            </ul>
        </div>
        <div v-if="ifGetInfo">
            <ul>
                <li class="title">测试参数</li>
            </ul>
            <ul>
                <li>采样频率</li>
                <li><el-input v-model="info.freq" placeholder="请输入内容"></el-input></li>
                <li>分析需采样次数</li>
                <li><el-input v-model="info.aSample" placeholder="请输入内容"></el-input></li>
            </ul>
            <ul>
                <li>采样次数</li>
                <li><el-input v-model="info.fSample" placeholder="请输入内容"></el-input></li>
                <li>文件个数</li>
                <li><el-input v-model="info.fileNum" placeholder="请输入内容"></el-input></li>
            </ul>
            <ul>
                <li>阀值</li>
                <li><el-input v-model="info.threshold" placeholder="请输入内容"></el-input></li>
                <li></li>
                <li><el-button type="primary" size="mini" @click="sendCommand('deviceTestInfo')">设置测试参数</el-button></li>
            </ul>
            
        </div>
        <div v-if="ifGetInfo">
            <ul>
                <li class="title">位置信息</li>
            </ul>
            <ul>
                <li>桩号</li>
                <li><el-input v-model="info.stake" placeholder="请输入内容"></el-input></li>
                <li>经度</li>
                <li><el-input v-model="info.lon" placeholder="请输入内容"></el-input></li>
            </ul>
            <ul>
                <li>纬度</li>
                <li><el-input v-model="info.lat" placeholder="请输入内容"></el-input></li>
                <li>备注</li>
                <li><el-input v-model="info.remarks" placeholder="请输入内容"></el-input></li>
            </ul>
            <ul>
                <li></li>
                <li></li>
                <li></li>
                <li><el-button type="primary" size="mini" @click="sendCommand('deviceGisInfo')">设置位置信息</el-button></li>
            </ul>
            
        </div>
        <div v-if="ifGetInfo">
            <ul>
                <li class="title"></li>
            </ul>
            <ul>
                <li class="title" style="text-align:center;display:flex;justify-content: space-between;">
                    <div style="display:flex;white-space: nowrap;font-size: 14px;">页码：<el-input v-model="fillInput.path" placeholder="请输入内容"></el-input></div>
                    <div style="display:flex;white-space: nowrap;font-size: 14px;">文件数量：<el-input v-model="fileList.fileNum" disabled></el-input></div>
                    <div><el-button type="primary" size="mini" @click="getFileList('deviceDirInfo')">查询文件目录</el-button></div>
                    <div><el-button type="primary" size="mini" @click="deviceLogSend('deviceStartSaveFile')">启动保存</el-button></div>
                    <div><el-button type="primary" size="mini" @click="deviceLogSend('deviceDeleteFiles')">清空文件</el-button></div>
                </li>
            </ul>
            <ul style="min-height:200px;">
                <template>
                    <el-table :data="fileList.dir" border style="max-width: 80%;margin:20px 0 0 10%" @selection-change="handleSelectionChange">
                        <el-table-column label="文件名">
                            <template slot-scope="scope">
                                <span>{{scope.row}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <div><el-button type="primary" size="mini" @click="getFileList('deviceFileInfo',scope.row)">获取文件</el-button></div>
                            </template>
                        </el-table-column>
                        
                    </el-table>
                </template>
            </ul>
            <ul style="min-height:200px;"></ul>
        </div>
    </div>
</template>
<script>
import ws from '../../../config/ws'
export default {
    mixins:[ws],
    data() {
        return {
            ifGetInfo:false,
            isSwitch:true,
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
            newTime:'',
            fileList:{
                fileNum:'',
                dir:[]
            },
            fillInput:{
                path:1,//页码
            },
            multipleSelection:[]
        };
    },
    mounted(){
        // this.deviceFileList()
    },
    methods: {
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
            this.ifGetInfo = true
            let params = {
                cmd:type,
                data:'',
                targetDevice : this.$route.query.devGuid,
            }
            if(type == 'deviceFileInfo'){
                params.data = {
                    page:this.fillInput.path
                }
            }
        
            this.$http.postHttp(this.$API.deviceLogSend,params,(data)=>{
                this.$notify({
                  title: '发送成功,请等待设备回复...',
                  message: '',
                  type: 'success'
                });
            })
        },
        //发送设置命令
        sendCommand(type){

            let devType = this.info.devType == '石油管道检测设备' ? 1 : 0
            let info = {}
            if(type == 'deviceNetInfo'){
                info = {
                    netInfo:{
                        ip:this.info.ip,
                        port:this.info.port,
                        postIvl:this.info.postIvl,
                    }
                    
                }
            }else if(type == 'deviceTestInfo'){
                info = {
                    testInfo:{
                        freq:this.info.freq,
                        sample:this.info.fSample,
                        fileNum:this.info.fileNum,
                        threshold:this.info.threshold ? this.info.threshold.split(',') : [],

                    }
                }
            }else if(type == 'deviceGisInfo'){
                info = {
                    gisInfo:{
                        stake:this.info.stake,
                        lon:this.info.lon,
                        lat:this.info.lat,
                        remarks:this.info.remarks,

                    }
                }
            }

            var params = {
                cmd:type,
                data:info,
                targetDevice : this.$route.query.devGuid,
            }
            
            this.$myLoading.startLoading()
            this.$http.postHttp(this.$API.deviceLogSend,params,(data)=>{
                this.$notify({
                  title: '发送成功,请等待设备回复...',
                  message: '',
                  type: 'success'
                });
                this.$myLoading.endLoading()

            })
        },
        //获取文件列表
        handleSelectionChange(val){
            this.multipleSelection = val;
        },  
        //文件列表
        getFileList(type,fileName){
            var params = {}
            if(type == 'deviceDirInfo'){
                params = {
                    cmd:type,
                    targetDevice : this.$route.query.devGuid,
                    data:{
                        page:this.fillInput.path,
                    }
                    
                }
            }else{
                params = {
                    cmd:type,
                    targetDevice : this.$route.query.devGuid,
                    data:{
                        fileName:fileName
                    }
                    
                }
            }
            
            this.$http.postHttp(this.$API.deviceLogSend,params,(data)=>{
                this.$notify({
                  title: '发送成功,请等待设备回复...',
                  message: '',
                  type: 'success'
                });
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