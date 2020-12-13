<template>
    <div>
        <div class="sampleItem">

            <div class="sampleTitleBox" style="margin:0px;">
                <div class="sampleTitle">示例一：开始加载</div>
            </div>
            <div class="sampleContentBox">
                <el-button @click="markdown_1_click">开始加载</el-button>
            </div>
             <div class="sampleContentBox">
                <div class="sampleContent" id="markdown_1">
                    
                </div>
            </div>

            <div class="sampleTitleBox" style="margin-top:50px;">
                <div class="sampleTitle">示例二：关闭加载</div>
            </div>
            <div class="sampleContentBox">
                <el-button @click="markdown_2_click">关闭加载</el-button>
            </div>
             <div class="sampleContentBox">
                <div class="sampleContent" id="markdown_2">
                    
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import { mapState,mapMutations } from 'vuex'
    export default {
        //数据源
        data(){
            return {
                markdown_1 : [
                    '#### 调用方式：',
                    '```javascript',
                    'this.$myLoading.startLoading("数据加载中...");',
                    '```',
                    '#### 参数说明：',
                    '<p style="margin-top:10px"><b style="color:grey">（非必传）</b>参数1：提示内容，（默认为：数据加载中...）</p>'
                ].join("\n"),

                markdown_2 : [
                    '#### 调用方式：',
                    '```javascript',
                    'this.$myLoading.endLoading();',
                    '```',
                    '#### 参数说明：',
                    '<p style="margin-top:10px"><b style="color:grey">无所需参数信息</p>'
                ].join("\n"),

            }
        },
        //初始化函数
        mounted() {

            var converter = new showdown.Converter();
            var htmlcontent_1  = converter.makeHtml(this.markdown_1);
            var htmlcontent_2  = converter.makeHtml(this.markdown_2);
            $("#markdown_1").html(htmlcontent_1);
            $("#markdown_2").html(htmlcontent_2);
            $('pre code').each(function(i, block) {
                hljs.highlightBlock(block);
            });


        },
        //计算属性
        computed: {
            // ...mapState({ })
        },
        //组件方法
        methods: {
            markdown_1_click(){
                this.$myLoading.startLoading();
                setTimeout(()=>{
                    this.$myLoading.endLoading();
                },2000)
            },
            markdown_2_click(){
                this.$myLoading.endLoading();
            }
        }
    }
</script>

<style lang="stylus" scoped>
.sampleItem {
    width 100%
    height auto
    padding-left 5px
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;

    .sampleTitleBox {
        width 100%
        margin-top 20px
        height auto
    }

    .sampleTitle {
        width auto
        font-size 16px
        font-weight bold

        i {
            font-size 12px
            color orange
            margin-right 5px
            position relative
            top -2px
        }
    }

    .sampleContentBox {
        width 100%
        height auto
        margin-top 10px

        
        .sampleContent {
            width 100%
            background #f5f5f5
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            -o-box-sizing: border-box;
            -ms-box-sizing: border-box;
            padding 10px
            border-radius 5px

        }
    }

}
</style>