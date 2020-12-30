<template>
    <div :id="id" class="bar" v-if="lineData.length>0">
        
    </div>
</template>
<script>
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
require('echarts/lib/chart/line');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

require('echarts/lib/component/dataZoom');

import {mapState} from 'vuex'

export default {
    props: {
        id : {
            type : String,
            required : ''
        },
        name:{
            type : String,
            required : ''
        },
    },
    data(){
        return{
            bLists:[],
            cLists:[],
            timeLists:[],
            nameLists:[],
            lineData:[],
            myChart:''
        }
    },
    computed: {
        ...mapState({
            newLineData : state => state.HomeModule.newLineData,
        })
    },
    watch:{
        newLineData(val){
            this.lineData = val
            if(this.lineData.length > 0){
                this.dealDate(this.lineData)
            }else{
                this.myChart = ''
            }
            
        }
    },
    mounted(){
        
    },
    methods:{
        //处理图表数据
      dealDate(data){
        this.bLists=[]
        this.cLists=[]
        this.nameLists=[]
        this.timeLists=[]
        if(data && data.length > 0){
            this.nameLists=[data[0]['devGuid']]
          for(let i=0;i<data.length;i++){
            let item = data[i]
            this.timeLists.push(this.$common.dateFormat("hh:mm:ss",item.time/1000))
            this.bLists.push(item.b)
            this.cLists.push(item.c)
          }
        }
        setTimeout(() => {
            
            if(!!this.myChart){
                this.refreshData(this.name=='B特征'? this.bLists : this.cLists,this.timeLists)
            }else{
                // 基于准备好的dom，初始化echarts实例
                
                this.myChart = echarts.init(document.getElementById(this.id));
                // 绘制图表
                this.myChart.setOption(this.options());
            }
        })
        
      },
 
        refreshData(data,nameData){
            
            //刷新数据
            var option = this.myChart.getOption();
            option.xAxis[0].data = nameData
            option.series[0].data = data;

            this.myChart.setOption(option);    
        },
         options(){
             let _self = this
            let option = {
            title: {
                text: _self.name
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: _self.nameLists
            },
            grid: {
                left: '10%',
                bottom: '15%',
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                data: _self.timeLists,
                boundaryGap:true,
                axisLabel:{  
                    interval: parseInt(_self.timeLists.length/12-1 < 0 ? 0 : _self.timeLists.length/12-1),  //控制坐标轴刻度标签的显示间隔.设置成 0 强制显示所有标签。设置为 1，隔一个标签显示一个标签。设置为2，间隔2个标签。以此类推
                    rotate:45,//倾斜度 -90 至 90 默认为0 
                    textStyle:{ 
                        fontWeight:"bold",  //加粗
                        color:"#000000",   //黑色
                        width:"30px",
                    },                 
                },
            },
            yAxis: {
                type: 'value',
            },
            series: [{
                data: _self.name=='B特征'? _self.bLists : _self.cLists ,
                type: 'line',
                smooth: true
            }],
            dataZoom:[
                {
                    type:"inside",//slider表示有滑动块的，
                    show:false,
                    xAxisIndex:[0],//表示x轴折叠
                    // zoomLock:true,
                    start:0,//数据窗口范围的起始百分比,表示1%
                    end:100//数据窗口范围的结束百分比,表示35%坐标
                }
            ]
            
        }
        return option
        }
    }
}
</script>
<style lang="stylus" scoped>
.bar{
    width 100%
    height 100%
}
</style>