<template>
    <div class="firmware">
        <div class="header">
            <el-button @click="deviceLogSend('svrQuerySettings')" size="small" type="primary" >获取固件文件</el-button>
        </div>
        <div class="centent" v-if="filePath">
            <div class="file">
                <p class="left">文件名称:</p>
                <p class="right">{{fileName}}</p>
            </div>
            <div class="file">
                <p class="left">是否允许更新:</p>
                <el-switch v-model="isOpen" active-color="#13ce66" inactive-color="#999999"></el-switch>
            </div>
            <div class="file">
                <p class="left">文件地址:</p>
                <p class="right">{{filePath}}</p>
                <el-upload
                    v-if="isOpen"
                    ref="upload"
                    class="upload-demo"
                    :headers="myHeaders"
                    :show-file-list="false"
                    :action="$global.httpServer + $API.fileUpload"
                    :data="uploadData"
                    :on-success="updataSuccess"
                    :on-error="updataError">
                    <el-button size="small" type="primary" >文件替换</el-button>
                </el-upload>
            </div>
            
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import LocalData from '../../../localData/userData'
import ws from '../../../config/ws'
export default {
    mixins:[ws],
    data() {
      return {
          myHeaders:{token:LocalData.userToken()},
      };
    },
    computed: {
        uploadData(){
            return {
                filePath:this.filePath.replace(/\\/g,"/"),
                isOpen:this.isOpen?1:0
            }
        }
    },
    mounted(){
        
    },
    watch:{
        isOpen(val){
            let url = `${this.$global.httpServer}${this.$API.fileUpload }?isOpen=${this.isOpen?1:0}`
            this.$http.postHttp(url,{},(data)=>{}) 
        }
    },
    methods: {
    //发送命令
    deviceLogSend(type){
        let params = {
            cmd:type,
            data:'',
        }

        this.$http.postHttp(this.$API.deviceLogSend,params,(data)=>{
            this.$notify({
                title: '发送成功,请等待设备回复...',
                message: '',
                type: 'success'
            });
        })
    },
    //导入设备列表
    fileUploadImport(){

    this.$myLoading.startLoading()
    this.$http.postHttp(this.$API.fileUploadImport,{},(data)=>{
        
        this.$myLoading.endLoading()

    })
    },
    //导入成功
    updataSuccess(val){
        if(val.code == -1){
            this.$notify({
                title: val.msg,
                message:'',
                type: 'error'
            });
        }else{
            this.$notify({
                title: '文件导入成功',
                message:'',
                type: 'success'
            });
        }
        
    },
    //导入失败
    updataError(){
        this.$notify({
            title: '文件导入失败',
            message:'',
            type: 'error'
        });
    },
    },
}
</script>
<style lang="stylus" scoped>
.firmware
    .header
        text-align right
        margin 20px 50px 0 0
    .centent
        margin-top 20px
        font-size 14px
        margin-left 20px
        .file
            margin-top 10px
            height 36px
            line-height 36px
            display flex
            align-items center
            .left
                width 120px
                text-align right
                margin-right 20px
            .right
                border 1px solid #eeeeee
                border-radius 3px
                padding 0 10px
                min-width 200px
            .upload-demo
                margin-left 20px
</style>