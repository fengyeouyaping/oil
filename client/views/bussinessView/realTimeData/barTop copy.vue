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