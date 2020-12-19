<template>
  <div class="map">
        <div id='container'></div>
        <div class="topStart" v-if="isOk"></div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data() {
        return {
            isOk:true,
            dataList:[],
            lineList:[],
            textList:[],
            maps:''
        };
    },
    mounted() {
        // this.init()
    },
    computed:{
        ...mapState({
            newInfo:state => state.HomeModule.newInfo
        })
    },
    methods:{

        mapDestroy(maps){
            map.destroy( );
        },
        configTest(maps){
            let self = this
            for(let i = 0;i<this.lineList.length ; i++){
                let text = new AMap.Text({
                    text:self.textList[i],
                    anchor:'center', // 设置文本标记锚点
                    draggable:true,
                    cursor:'pointer',
                    angle:10,
                    style:{
                        'background-color':'rgba(0,0,0,0)',
                        'border':'0px',
                        'font-weight':'bold',
                        'margin-top':'20px',
                        'font-size': '12px',
                        'color': '#7dedfe'
                    },
                    position: self.lineList[i]
                });

                text.setMap(maps);
            }
        },
        configLineData(maps){
            let path = this.lineList
            let oneList = [],twoList = []
            for(let i=0;i<path.length;i++){
                if(i<3){
                    oneList.push(path[i])
                }else{
                    if(i != 0){
                        twoList.push(path[i-1])
                    }
                    twoList.push(path[i])
                }
            }
            
             let polylineOne = new AMap.Polyline({
                path: oneList,
                isOutline: true,
                outlineColor: '#f9d334',
                borderWeight: 2,
                strokeColor: "#f9d334", 
                strokeOpacity: 1,
                strokeWeight: 2,
                // 折线样式还支持 'dashed'
                strokeStyle: "solid",
                // strokeStyle是dashed时有效
                strokeDasharray: [10, 5],
                lineJoin: 'round',
                lineCap: 'round',
                zIndex: 50,
            })
            let polylineTwo = new AMap.Polyline({
                path: twoList,
                isOutline: true,
                outlineColor: '#04a0e9',
                borderWeight: 2,
                strokeColor: "#04a0e9", 
                strokeOpacity: 1,
                strokeWeight: 2,
                // 折线样式还支持 'dashed'
                strokeStyle: "solid",
                // strokeStyle是dashed时有效
                strokeDasharray: [10, 5],
                lineJoin: 'round',
                lineCap: 'round',
                zIndex: 50,
            })
            
            if(oneList.length > 0) polylineOne.setMap(maps)
            if(twoList.length > 0) polylineTwo.setMap(maps)
            // 缩放地图到合适的视野级别
            maps.setFitView([ polylineOne,polylineTwo ])


        },
        getData(maps,callback){
            // AMap.plugin('AMap.DistrictSearch', function() {
            //     let search = new AMap.DistrictSearch();
            //     search.search('中国', function(status, data) {
            //         if (status === 'complete') {
                        let positions = []
            //             let provinces = data['districtList'][0]['districtList']
                        let provinces = this.dataList
                        for (let i = 0; i < provinces.length; i += 1) {
                            positions.push({
                                center: provinces[i],
                                radius:Math.max(2, Math.floor(Math.random() * 10))
                            })
                        }
                        callback(maps,positions)
            //         }
            //     });
            // });
        },
        
        addLayer(maps,positions) {
            AMap.plugin('AMap.CustomLayer', () => {
	            let canvas = document.createElement('canvas');
                let customLayer = new AMap.CustomLayer(canvas, {
                    zooms: [3, 10],
                    alwaysRender:true,//缩放过程中是否重绘，复杂绘制建议设为false
                    zIndex: 120
                });
			let onRender = function(){
			    let retina = AMap.Browser.retina;
                let size = maps.getSize();//resize
                let width = size.width;
                let height = size.height;
                canvas.style.width = width+'px'
                canvas.style.height = height+'px'
                if(retina){//高清适配
                    width*=2;
                    height*=2;
                }
                canvas.width = width;
                canvas.height = height;//清除画布
                
			    for (let i = 0; i < positions.length; i += 1) {
                    let ctx = canvas.getContext("2d");
                    ctx.beginPath();
                    if(i < 3){
                        ctx.fillStyle = '#f9d334';
        		        ctx.strokeStyle = 'rgba(249,211,52,0.5)';
                    }else{
                        ctx.fillStyle = '#04a0e9';
        		        ctx.strokeStyle = 'rgba(4,160,233,0.5)';
                    }
			        let center = positions[i].center;
        			let pos = maps.lngLatToContainer(center);
        			let r = positions[i].radius;
        			if(retina){
        			    pos = pos.multiplyBy(2);
        			    r*=2
                    }
                    
        		
        			ctx.moveTo(pos.x+r, pos.y)
                    ctx.arc(pos.x, pos.y, 10, 0, 2*Math.PI);
                    ctx.lineWidth = 20
                    ctx.closePath();
                    ctx.stroke();
                    ctx.fill();
        		}
        		
			}
			customLayer.render = onRender;
            customLayer.setMap(maps);
            })
        },
        getData(){
            this.newInfo.map((item) => {
                
                this.dataList.push({
                    Q:item.lat,
                    R:item.lon
                })
                this.lineList.push([item.lon,item.lat])
                this.textList.push(item.devGuid)
            })
        },
        init(){
            this.dataList=[],
            this.lineList=[],
            this.textList=[],
            this.getData()
            
            if(!!this.maps) this.maps.destroy();
            this.isOk = true
            let self = this
            let maps = new AMap.Map('container', {
                zoomEnable:true,
                dragEnable: true,
                zooms: [3, 20],
                zoom: 4,
                center: [105.397428, 35.90923],
                mapStyle:'amap://styles/1efb475da4687bb48c752ca6db690e75',
                viewMode: '3D',
                resizeEnable: true
            })
            this.maps = maps
            maps.on('complete', function(){
                self.isOk = false
                // 地图图块加载完成后触发
            });
            //点
            this.getData(maps,(maps,positions) => {
                this.addLayer(maps,positions)
            })
            //线
            this.configLineData(maps)
            //字
            this.configTest(maps)
        },
    }
};
</script>


<style lang="stylus" scoped>
.map{
    width:100%;
    height:100%;
    position relative
    #container{
        width:100%;
        height:100%;
    }
    .topStart{
        width:100%;
        height:100%;
        background #010443
        position absolute
        top 0
        left 0
        z-index 5
        
    }
}

</style>