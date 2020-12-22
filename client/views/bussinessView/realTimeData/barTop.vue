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
    },
    data(){
        return{

        }
    },
    mounted(){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById(this.id));
        // 绘制图表
        myChart.setOption(this.options());
    },
    methods:{
         options(){
            let option = {
            title: {
                text: '特征B'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
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
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '邮件营销',
                    type: 'line',
                    data: [1220, 1132, 1011, 1134, 1190,500,300,100,90, 2130, 2101]
                },
                {
                    name: '联盟广告',
                    type: 'line',
                    data: [2112, 182, 191, 234, 290, 330, 310]
                },
                {
                    name: '视频广告',
                    type: 'line',
                    data: [1510, 232, 201, 154, 190, 330, 410]
                },
                {
                    name: '直接访问',
                    type: 'line',
                    data: [320, 332, 301, 334, 390, 330, 320]
                },
                {
                    name: '搜索引擎',
                    type: 'line',
                    data: [820, 932, 901, 934, 1290, 1330, 1320]
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