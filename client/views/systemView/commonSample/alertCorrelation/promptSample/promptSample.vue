<template>
    <div>
        <div class="sampleItem">

            <div class="sampleTitleBox" style="margin:0px;">
                <div class="sampleTitle">示例一：操作成功提示框</div>
            </div>
            <div class="sampleContentBox">
                <el-button @click="markdown_1_click">操作成功提示框</el-button>
            </div>
             <div class="sampleContentBox">
                <div class="sampleContent" id="markdown_1">
                    
                </div>
            </div>

            <div class="sampleTitleBox" style="margin-top:50px;">
                <div class="sampleTitle">示例二：操作失败提示框</div>
            </div>
            <div class="sampleContentBox">
                <el-button @click="markdown_2_click">操作失败提示框</el-button>
            </div>
             <div class="sampleContentBox">
                <div class="sampleContent" id="markdown_2">
                    
                </div>
            </div>


            <div class="sampleTitleBox" style="margin-top:50px;">
                <div class="sampleTitle">示例三：信息警告提示框</div>
            </div>
            <div class="sampleContentBox">
                <el-button @click="markdown_3_click">信息警告提示框</el-button>
            </div>
             <div class="sampleContentBox">
                <div class="sampleContent" id="markdown_3">
                    
                </div>
            </div>

            <div class="sampleTitleBox" style="margin-top:50px;">
                <div class="sampleTitle">示例四：带HTML的信息提示框</div>
            </div>
            <div class="sampleContentBox">
                <el-button @click="markdown_4_click">带HTML的信息提示框</el-button>
            </div>
             <div class="sampleContentBox">
                <div class="sampleContent" id="markdown_4">
                    
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
                    'this.$myPop.SuccessMessage("成功提示信息");',
                    '```',
                    '#### 参数说明：',
                    '<p style="margin-top:10px"><b style="color:grey">（非必传）</b>参数1：提示内容，（默认为：恭喜您，操作成功）</p>'
                ].join("\n"),

                markdown_2 : [
                    '#### 调用方式：',
                    '```javascript',
                    'this.$myPop.ErrorMessage("失败提示信息");',
                    '```',
                    '#### 参数说明：',
                    '<p style="margin-top:10px"><b style="color:grey">（非必传）</b>参数1：提示内容，（默认为：对不起，操作失败）</p>'
                ].join("\n"),

                markdown_3 : [
                    '#### 调用方式：',
                    '```javascript',
                    'this.$myPop.WarningMessage("警告提示信息");',
                    '```',
                    '#### 参数说明：',
                    '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数1：提示内容</p>'
                ].join("\n"),

                markdown_4 : [
                    '#### 调用方式：',
                    '```javascript',
                    'this.$myPop.HTMLMessage("<h1>HTML标签的提示</h1>");',
                    '```',
                    '#### 参数说明：',
                    '<p style="margin-top:10px"><b style="color:red">（必&nbsp;&nbsp;&nbsp;传）</b>参数1：提示内容</p>'
                ].join("\n"),
            }
        },
        //初始化函数
        mounted() {

            var converter = new showdown.Converter();
            var htmlcontent_1  = converter.makeHtml(this.markdown_1);
            var htmlcontent_2  = converter.makeHtml(this.markdown_2);
            var htmlcontent_3  = converter.makeHtml(this.markdown_3);
            var htmlcontent_4  = converter.makeHtml(this.markdown_4);
            $("#markdown_1").html(htmlcontent_1);
            $("#markdown_2").html(htmlcontent_2);
            $("#markdown_3").html(htmlcontent_3);
            $("#markdown_4").html(htmlcontent_4);
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
                this.$myPop.SuccessMessage("成功提示信息")
            },
            markdown_2_click(){
                this.$myPop.ErrorMessage("失败提示信息")
            },
            markdown_3_click(){
                this.$myPop.WarningMessage("警告提示信息")
            },
            markdown_4_click(){
                this.$myPop.HTMLMessage("<h1>HTML标签的提示</h1>")
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