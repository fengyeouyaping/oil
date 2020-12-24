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
            maps:'',
            visitFlag:0,
            text:[],
            polylineOne:'',
            polylineTwo:'',
            customLayer:''
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
                this.text.push(text)
            }
        },
        configLineData(maps){
            let path = this.lineList
            let oneList = [],twoList = []
            for(let i=0;i<path.length;i++){
                if(i<=this.visitFlag){
                    oneList.push(path[i])
                }else{
                    if(i != 0){
                        twoList.push(path[i-1])
                    }
                    twoList.push(path[i])
                }
            }
            
            this.polylineOne = new AMap.Polyline({
                path: oneList,
                isOutline: true,
                outlineColor: '#f9d334',
                borderWeight: 1,
                strokeColor: "#f9d334", 
                strokeOpacity: 1,
                strokeWeight: 1,
                // 折线样式还支持 'dashed'
                strokeStyle: "solid",
                // strokeStyle是dashed时有效
                strokeDasharray: [10, 5],
                lineJoin: 'round',
                lineCap: 'round',
                zIndex: 50,
            })
            this.polylineTwo = new AMap.Polyline({
                path: twoList,
                isOutline: true,
                outlineColor: '#04a0e9',
                borderWeight: 1,
                strokeColor: "#04a0e9", 
                strokeOpacity: 1,
                strokeWeight: 1,
                // 折线样式还支持 'dashed'
                strokeStyle: "dashed",
                // strokeStyle是dashed时有效
                strokeDasharray: [10, 5],
                lineJoin: 'round',
                lineCap: 'round',
                zIndex: 50,
            })
            
            if(oneList.length > 0) this.polylineOne.setMap(maps)
            if(twoList.length > 0) this.polylineTwo.setMap(maps)
            // 缩放地图到合适的视野级别
            maps.setFitView([ this.polylineOne,this.polylineTwo ])


        },
        getDatas(maps,callback){
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
            let _self = this
            AMap.plugin('AMap.CustomLayer', () => {
	            let canvas = document.createElement('canvas');
                this.customLayer = new AMap.CustomLayer(canvas, {
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
                    if(i <= _self.visitFlag){
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
			this.customLayer.render = onRender;
            this.customLayer.setMap(maps);
            })
        },
        getData(){
            this.newInfo.map((item,key) => {
                if(item.visitFlag){
                    this.visitFlag = key
                }
                if(item.lat && item.lon){
                    this.dataList.push({
                        Q:item.lat,
                        R:item.lon
                    })
                    this.lineList.push([item.lon,item.lat])
                    this.textList.push(item.devGuid)
                }
            })
            
        },
        init(){
            this.dataList=[],
            this.lineList=[],
            this.textList=[],
            this.getData()
            let self = this
            if(!this.maps){
                this.isOk = true
                
                this.maps = new AMap.Map('container', {
                    zoomEnable:true,
                    dragEnable: true,
                    zooms: [3, 20],
                    zoom: 4,
                    center: [105.397428, 35.90923],
                    mapStyle:'amap://styles/1efb475da4687bb48c752ca6db690e75',
                    viewMode: '3D',
                    resizeEnable: true
                })
            }else{
                if(this.text && this.text.length > 0){
                    for(let i=0;i<this.text.length;i++){
                        this.maps.remove(this.text[i])
                    }
                }
                this.maps.remove(this.polylineOne)
                this.maps.remove(this.polylineTwo)
                this.maps.remove(this.customLayer)
                this.text = []
                this.polylineOne = ''
                this.polylineTwo = ''
                this.customLayer = ''
            }
            
            this.maps.on('complete', function(){
                self.isOk = false
                // 地图图块加载完成后触发
            });
            //点
            this.getDatas(this.maps,(maps,positions) => {
                this.addLayer(maps,positions)
            })
            //线
            this.configLineData(this.maps)
            //字
            this.configTest(this.maps)
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