<template>
    <div class="realTimeInfo">
        <div>
            <div class="listTitle">基础信息</div>
            <ul>
                <li>设备类型</li>
                <li>{{info.freq}}</li>
                <li>设备编号</li>
                <li>{{info.length}}</li>
            </ul>
            <ul>
                <li>硬件版本</li>
                <li>{{info.number}}</li>
                <li>软件版本</li>
                <li>{{info.threshold}}</li>
            </ul>
            <div class="listTitle">网络信息</div>
            <ul>
                <li>服务器IP地址</li>
                <li>{{info.svrIp}}</li>
                <li>服务器端口</li>
                <li>{{info.svrPort}}</li>
            </ul>
            <ul>
                <li>时间间隔</li>
                <li>{{info.postLvl}}</li>
                <li></li>
                <li></li>
            </ul>
            <div class="listTitle">测试参数</div>
            <ul>
                <li>采样频率</li>
                <li>{{info.stake}}</li>
                <li>分析需采样次数</li>
                <li>{{info.remarks}}</li>
            </ul>
            <ul>
                <li>采样次数</li>
                <li>{{info.lon}}</li>
                <li>文件个数</li>
                <li>{{info.lat}}</li>
            </ul>
             <ul>
                <li>阀值</li>
                <li>{{info.lon}}</li>
                <li></li>
                <li></li>
            </ul>
            <div class="listTitle">位置信息</div>
            <ul>
                <li>桩号</li>
                <li>{{info.stake}}</li>
                <li>经度</li>
                <li>{{info.remarks}}</li>
            </ul>
            <ul>
                <li>纬度</li>
                <li>{{info.lon}}</li>
                <li>备注</li>
                <li>{{info.lat}}</li>
            </ul>
            
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isSwitch:true,
            info: {},
            fileList: [{
                name: 'food.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
                }, {
                name: 'food2.jpeg',
                url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
            }]
        
        };
    },
    mounted(){
        this.getDateInfo()
        this.deviceFileList()
    },
    methods: {
        handleChange(file, fileList) {
            this.fileList = fileList.slice(-3);
        },
        getDateInfo(){
            this.$myLoading.startLoading()
            this.$http.getHttp(this.$API.deviceGet+"?devGuid="+this.$route.query.devGuid,(data)=>{
                this.info = data.data
                this.$myLoading.endLoading()
            })
        },
        //文件列表
        deviceFileList(){
            this.$http.getHttp(this.$API.deviceFileList+"?devGuid="+this.$route.query.devGuid,(data)=>{
                this.fileList = data.data
                
            })
        }
    },
}
</script>
<style lang="stylus" scoped>
.excel_list{
    border-right 1px solid #eeeeee
    .upload-demo{
        display inline-block
        margin-right 10px
    }

}
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
.realTimeInfo{
    margin 20px 20px
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
            padding-left 20px
            border-right 1px solid #eeeeee
            border-bottom 1px solid #eeeeee
            font-size 14px
            font-weight bold    
        }
    }
}
</style>