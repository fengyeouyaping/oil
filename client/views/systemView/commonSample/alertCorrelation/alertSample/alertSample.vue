<template>
    <div>
        <div class="sampleItem">
            <div class="sampleTitleBox" style="margin:0px;">
                <div class="sampleTitle">示例一：普通弹出框</div>
            </div>
            <div class="sampleContentBox">
                <el-button @click="markdown_1_click">普通弹出窗</el-button>
            </div>
            <div class="sampleContentBox">
                <div class="sampleContent" id="markdown_1">
                    
                </div>
            </div>

            <div class="sampleTitleBox" style="margin-top:50px;">
                <div class="sampleTitle">示例二：带确认弹出框</div>
            </div>
            <div class="sampleContentBox">
                <el-button @click="markdown_2_click">带确认弹出框</el-button>
            </div>
             <div class="sampleContentBox">
                <div class="sampleContent" id="markdown_2">
                    
                </div>
            </div>

            <div class="sampleTitleBox" style="margin-top:50px;">
                <div class="sampleTitle">示例三：可以写HTML的普通弹出框</div>
            </div>
            <div class="sampleContentBox">
                <el-button @click="markdown_3_click">可以写HTML的普通弹出框</el-button>
            </div>
             <div class="sampleContentBox">
                <div class="sampleContent" id="markdown_3">
                    
                </div>
            </div>

            <div class="sampleTitleBox" style="margin-top:50px;">
                <div class="sampleTitle">示例四：可以写HTML的确认弹出框</div>
            </div>
            <div class="sampleContentBox">
                <el-button @click="markdown_4_click">可以写HTML的确认弹出框</el-button>
            </div>
             <div class="sampleContentBox">
                <div class="sampleContent" id="markdown_4">
                    
                </div>
            </div>

            <div class="sampleTitleBox" style="margin-top:50px;">
                <div class="sampleTitle">示例五：输入内容的提交弹框</div>
            </div>
            <div class="sampleContentBox">
                <el-button @click="markdown_5_click">输入内容的提交弹框</el-button>
            </div>
             <div class="sampleContentBox">
                <div class="sampleContent" id="markdown_5">
                    
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
                    'this.$myPop.alertBox("我是标题","我是内容",() => {',
                    '   console.log("点击了确认按钮...")',
                    '});',
                    '```',
                    '#### 参数说明：',
                    '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数1：弹窗的标题名称</p>',
                    '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数2：弹窗的内容文字（HTML标签不生效）</p>',
                    '<p style="margin-top:10px"><b style="color:grey">（非必传）</b>参数3：点击确认时的回调函数</p>'
                ].join("\n"),

                markdown_2 : [
                    '#### 调用方式：',
                    '```javascript',
                    'this.$myPop.confirmBox("确认提示","你确定要这么做吗？",()=>{',
                    '   console.log("我确定喔...")',
                    '},() => {',
                    '   console.log("点击了取消...")',   
                    '});',
                    '```',
                    '#### 参数说明：',
                    '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数1：弹窗的标题名称</p>',
                    '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数2：弹窗的内容文字（HTML标签不生效）</p>',
                    '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数3：点击确认时的回调函数</p>',
                    '<p style="margin-top:10px"><b style="color:grey">（非必传）</b>参数4：点击取消时的回调函数</p>'
                ].join("\n"),

                markdown_3 : [
                    '#### 调用方式：',
                    '```javascript',
                    'this.$myPop.confirmHTMLBox("确认提示","<h1>我是一个包含H1标签的内容</h1>",() => {',
                    '   console.log("点击了确认按钮...")',    
                    '});',
                    '```',
                    '#### 参数说明：',
                    '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数1：弹窗的标题名称</p>',
                    '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数2：弹窗的内容文字</p>',
                    '<p style="margin-top:10px"><b style="color:grey">（非必传）</b>参数3：点击确认时的回调函数</p>'
                ].join("\n"),

                markdown_4 : [
                    '#### 调用方式：',
                    '```javascript',
                    'this.$myPop.confirmHTMLBox("确认提示","<h1>我是一个H1标签的确认内容</h1>",() => {',
                    '   console.log("我确定喔...")',
                    '},() => {',
                    '   console.log("点击了取消...")',
                    '});',
                    '```',
                    '#### 参数说明：',
                    '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数1：弹窗的标题名称</p>',
                    '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数2：弹窗的内容文字</p>',
                    '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数3：点击确认时的回调函数</p>',
                    '<p style="margin-top:10px"><b style="color:grey">（非必传）</b>参数4：点击取消时的回调函数</p>'
                ].join("\n"),

                markdown_5 : [
                    '#### 调用方式：',
                    '```javascript',
                    'this.$myPop.submitPopBox("更新手机号码","您可以输入您的新手机号码，进行更新操作",/\d{11}$/,"手机号码格式不正确",(v) => {',
                    '   console.log("输入的手机号码为：" + v)',
                    '},() => {',
                    '   console.log("点击了取消...")',
                    '});',
                    '```',
                    '#### 参数说明：',
                    '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数1：弹窗的标题名称</p>',
                    '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数2：弹窗的提示文字</p>',
                    '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数3：输入框的正则验证规则</p>',
                    '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数4：输入框的默认提示内容</p>',
                    '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数5：点击确定时的回调函数，参数1：输入的内容</p>',
                    '<p style="margin-top:10px"><b style="color:grey">（非必传）</b>参数6：点击取消时的回调函数</p>'
                ].join("\n")

            }
        },
        //初始化函数
        mounted() {

            var converter = new showdown.Converter();
            var htmlcontent_1  = converter.makeHtml(this.markdown_1);
            var htmlcontent_2  = converter.makeHtml(this.markdown_2);
            var htmlcontent_3  = converter.makeHtml(this.markdown_3);
            var htmlcontent_4  = converter.makeHtml(this.markdown_4);
            var htmlcontent_5  = converter.makeHtml(this.markdown_5);
            $("#markdown_1").html(htmlcontent_1);
            $("#markdown_2").html(htmlcontent_2);
            $("#markdown_3").html(htmlcontent_3);
            $("#markdown_4").html(htmlcontent_4);
            $("#markdown_5").html(htmlcontent_5);
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
                this.$myPop.alertBox("我是标题","我是内容",() => {
                    console.log("点击了确认按钮");
                });
            },
            markdown_2_click(){
                this.$myPop.confirmBox("确认提示","你确定要这么做吗？",()=>{
                    console.log("我确定喔...");
                },() => {
                    console.log("点击了取消...");
                });
            },
            markdown_3_click(){
                this.$myPop.alertHtmlBox("我是标题","<h1>我是一个H1标签的内容</h1>",() => {
                    console.log("点击了确认按钮");
                });
            },
            markdown_4_click(){
                this.$myPop.confirmHTMLBox("确认提示","<h1>我是一个H1标签的确认内容</h1>",() => {
                    console.log("我确定喔...");
                },() => {
                    console.log("点击了取消...");
                });
            },
            markdown_5_click(){
                this.$myPop.submitPopBox("更新手机号码","您可以输入您的新手机号码，进行更新操作",/\d{11}$/,"手机号码格式不正确",(v) => {
                    console.log(v);
                },()=>{
                    console.log("点击了取消...");
                });
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