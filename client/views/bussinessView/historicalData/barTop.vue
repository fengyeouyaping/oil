<template>
    <div :id="id" class="bar">
        
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
        lineData:{
            type : Array,
            required : ''
        }
    },
    data(){
        return{
            bLists:[],
            cLists:[],
            timeLists:[],
            nameLists:[]
        }
    },
    mounted(){
        this.dealDate(this.lineData)
        
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
        
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById(this.id));
        // 绘制图表
        myChart.setOption(this.options());
        
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
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                data: _self.timeLists
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: _self.name=='B特征'? _self.bLists : _self.cLists ,
                type: 'line',
                smooth: true
            }]
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