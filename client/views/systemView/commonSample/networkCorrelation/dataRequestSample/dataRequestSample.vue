<template>
    <div>
        <div class="sampleItem">

            <div class="sampleTitleBox" style="margin:0px;">
                <div class="sampleTitle">示例一：GET请求</div>
            </div>
            <div class="sampleContentBox">
                <div class="sampleContent" id="markdown_1">
                    
                </div>
            </div>

            <div class="sampleTitleBox" style="margin-top:50px;">
                <div class="sampleTitle">示例二：POST请求</div>
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
                    'this.$http.getHttp(this.$API.apiName, rs => {',
                    '   //请求所做的事情',
                    '});',
                    '```',
                    '#### 参数说明：',
                    '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数1：接口名称，该接口请求名称需在 api.js 文件中进行配置，例如：</p>',
                    '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数2：请求完成后的回调函数，rs 为返回的请求结果</p>',
                    '<p style="margin-top:10px"><b style="color:grey">（非必传）</b>参数3：请求出现错误时的回调函数</p>'
                    
                ].join("\n"),

                markdown_2 : [
                    '#### 调用方式：',
                    '```javascript',
                    'this.$http.postHttp(this.$API.apiName, { a:100 , b:200 } rs => {',
                    '   //请求所做的事情',
                    '});',
                    '```',
                    '#### 参数说明：',
                    '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数1：接口名称，该接口请求名称需在 api.js 文件中进行配置，例如：</p>',
                    '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数2：post请求参数，json格式</p>',
                    '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数3：请求完成后的回调函数，rs 为返回的请求结果</p>',
                    '<p style="margin-top:10px"><b style="color:grey">（非必传）</b>参数4：请求出现错误时的回调函数</p>'
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