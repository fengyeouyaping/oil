<template>
    <div>
        <div class="sampleItem">
            <div class="sampleTitleBox" style="margin:0px;">
                <div class="sampleTitle">HTML部分：</div>
            </div>
            <div class="sampleContentBox">
                <div class="sampleContent" id="markdown_1">
                    
                </div>
            </div>

            <div class="sampleTitleBox" style="margin-top:50px;">
                <div class="sampleTitle">JS部分：</div>
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
                    '```javascript',
                    '//表头，在表头的菜单中可以添加多个按钮',
                    '<div class="tableHeader">',
                    '   <div class="tableHeaderTitle">新闻列表</div>',
                    '   <div class="tableHeaderMenu">',
                    '       <el-button-group>',
                    '           <el-button icon="el-icon-refresh" @click="refreshData" size="mini"></el-button>',
                    '       </el-button-group>',
                    '   </div>',
                    '</div>',
                    '',
                    "<!--表内容-->",
                    '<el-table ref="multipleTable" :data="newsInfoData" tooltip-effect="dark" style="width: 100%">',
                    '   <el-table-column prop="ni_id" label="新闻ID" width="80"></el-table-column>',
                    '   <el-table-column :show-overflow-tooltip="true" prop="ni_title" label="新闻标题"></el-table-column>',
                    '   <el-table-column prop="u_nickname" label="发布人"></el-table-column>',
                    '   <el-table-column prop="ni_status" label="状态">',
                    '       <template slot-scope="scope">',
                    '           <b v-if="scope.row.ni_status == 0" style="color:gery">未审核</b>',
                    '           <b v-if="scope.row.ni_status == 1" style="color:green">已通过</b>',
                    '           <b v-if="scope.row.ni_status == 2" style="color:red">未通过</b>',
                    '       </template>',
                    '   </el-table-column>',
                    '   <el-table-column prop="nc_name" label="所属类别"></el-table-column>',
                    '   <el-table-column label="操作" fixed="right" width="260">',
                    '       <template slot-scope="scope">',
                    '           <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>',
                    '           <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>',
                    '       </template>',
                    '   </el-table-column>',
                    '</el-table>',
                    '',
                    '<!--分页-->',
                    '<el-col :span="24">',
                    '   <el-pagination',
                    '       @size-change="handleSizeChange"',
                    '       @current-change="handleCurrentChange"',
                    '       :current-page="pagination.currentPage"',
                    '       :page-sizes="[20,50,100,200]"',
                    '       :page-size="pagination.pageSize"',
                    '       layout="total, sizes, prev, pager, next, jumper"',
                    '       :total="pagination.dataLength"',
                    '   ></el-pagination>',
                    '</el-col>',
                    '```'
                ].join("\n"),
                markdown_2 : [
                    '```javascript',
                    'mounted() {',
                    '   //获取新闻列表',
                    '   this.initData()',
                    '}',
                    'computed: {',
                    '   ...mapState({',
                    '       //参考代码（新闻列表数据）',
                    '       newsInfoData : state => state.listModule.newsInfoData,',
                    '       /**分页项变量（module中的对象）',
                    '           pagination   : {',
                    '               currentPage  : 1,',
                    '               pageSize     : 20,',
                    '               dataLength   : 0,',
                    '               skip         : 0',
                    '           }',
                    '       **/',
                    '       pagination   : state => state.listModule.pagination',
                    '   })',
                    '}',
                    'methods : {',
                    '',
                    '   //映射列表更新数据方法',
                    '   ...mapMutations(["newsInfoListModule/updateNewsInfoData"]),',
                    '',
                    '   //获取新闻列表数据（参考代码）',
                    '   initData() {',
                    '       this.$myLoading.startLoading()',
                    '       this.$http.getHttp(',
                    '           this.$API.newsSearchDetail +',
                    '           "/skip/" + this.pagination.skip +',
                    '           "/limit/" + this.pagination.pageSize +',
                    '           "/count/1/ni_is_delete/0/sort_order/ni_id-desc"',
                    '           rs => {',
                    '               this.$myLoading.endLoading()',
                    '               this["newsInfoListModule/updateNewsInfoData"](rs.data)',
                    '               this.pagination.dataLength = parseInt(rs.count)',
                    '           }',
                    '       )',
                    '   }',
                    '',
                    '   //刷新列表方法',
                    '   refreshData(){',
                    '       //重新获取数据方法',
                    '       this.initData()',
                    '   }',
                    '',
                    '   //编辑列表项（参考方法）',
                    '   handleEdit(index,item){',
                    '       this.$router.push({',
                    '           path: "/editNewsInfo",',
                    '           query : {',
                    '               ni_id : item.ni_id',
                    '           }',
                    '       })',
                    '   }',
                    '',
                    '   //删除列表项（参考方法）',
                    '   handleDelete(index,item){',
                    '       var params = {',
                    '           delete_where : "ni_id",',
                    '           ni_id        : item.ni_id,',
                    '           ni_is_delete : 1',
                    '       }',
                    '       this.$myPop.confirmBox("确认操作","确定要删除该新闻吗？",()=>{',
                    '           this.$myLoading.startLoading()',
                    '           this.$http.postHttp(',
                    '               this.$API.newsDelete,',
                    '               params,',
                    '               rs => {',
                    '                   this.$myLoading.endLoading()',
                    '                   this.$myPop.SuccessMessage()',
                    '                   this.initData()',
                    '               }',
                    '           )',
                    '       })',
                    '   }',
                    '',
                    '}',
                    '```',
                ].join("\n")
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
            // ...mapMutations()
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