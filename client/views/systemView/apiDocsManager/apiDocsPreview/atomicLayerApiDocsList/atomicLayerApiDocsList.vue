<template>
    <div class="atomicApiDocsListBox">
        <div class="atomicApiDocsMenuBox">
            <div style="width:100%;text-align:center;margin-top:30px;" v-if="apiDocsListData.length <= 0">暂无分类</div>
            <div class="atomicApiDocsItem" v-for="apiDocsListItem,index in apiDocsListData">
                <div class="atomicApiDocsMenuCategory" @click="apiMenuClick(index)">{{apiDocsListItem.apc_name}}</div>
                <el-collapse-transition>
                <div class="atomicApiDocsMenuContent" v-if="apiDocsListItem.isShow">
                    <div class="atomicApiDocsMenuItem" @click="apiDocsMenuItemClick(apiDocsMenuItem)"  v-for="apiDocsMenuItem in apiDocsListItem.apiList">
                        {{apiDocsMenuItem.ap_name}}
                    </div>
                </div>
                </el-collapse-transition>
            </div>
        </div>
        <div class="atomicApiDocsContentBox">
            <template v-if="apiDocsDetailData == ''">
                <div class="noApiDocsBox">
                    <div class="noApiDocsText"><i class="fa fa-sticky-note-o fa-fw"></i>暂无选择接口</div>
                </div>
            </template>
            <template v-else>

                <div class="apiDocTitleBox"><i class="fa fa-circle fa-fw"></i>接口名称</div>
                <div class="apiDocContentBox">{{apiDocsDetailData.ap_name}}</div>

                <div class="apiDocTitleBox"><i class="fa fa-circle fa-fw"></i>接口地址</div>
                <div class="apiDocContentBox">{{apiDocsDetailData.ap_api}}</div>

                <div class="apiDocTitleBox"><i class="fa fa-circle fa-fw"></i>请求方式</div>
                <div class="apiDocContentBox">{{apiDocsDetailData.ap_method}}</div>

                <div class="apiDocTitleBox"><i class="fa fa-circle fa-fw"></i>接口描述</div>
                <div class="apiDocContentBox">{{apiDocsDetailData.ap_desc}}</div>

                <div class="apiDocTitleBox"><i class="fa fa-circle fa-fw"></i>接口备注</div>
                <div class="apiDocContentBox">{{apiDocsDetailData.ap_note}}</div>
                

                <div class="apiDocTitleBox"><i class="fa fa-circle fa-fw"></i>GET请求参数</div>
                <div class="apiDocRequestBox">
                    <template v-if="apiDocsDetailData.getArr.length > 0">
                        <el-row :key="getRequestItem.rp_id" v-for="getRequestItem in apiDocsDetailData.getArr" style="margin-bottom:0px">
                            <template v-if="getRequestItem.rp_way == 'RESTFUL'">
                                <el-col :span="4"><div class="grid-content bg-purple">{{getRequestItem.rp_name}}</div></el-col>
                                <el-col :span="8"><div class="grid-content bg-purple">{{getRequestItem.rp_note}}</div></el-col>
                                <el-col :span="4"><div class="grid-content bg-purple">{{getRequestItem.rp_is_must}}</div></el-col>
                                <el-col :span="4"><div class="grid-content bg-purple">{{getRequestItem.rp_type}}</div></el-col>
                                <el-col :span="4"><div class="grid-content bg-purple">{{getRequestItem.rp_rule}}</div></el-col>
                            </template>
                            <template v-else>
                                <el-col :span="24"><div style="font-size:12px;" class="grid-content bg-purple">无GET请求参数</div></el-col>
                            </template>  
                        </el-row>    
                    </template>
                    <template v-else>
                        <el-row><el-col :span="24"><div style="font-size:12px;" class="grid-content bg-purple">无GET请求参数</div></el-col></el-row>
                    </template>
                </div>
                <div class="apiDocTitleBox"><i class="fa fa-circle fa-fw"></i>POST请求参数</div>
                <div class="apiDocRequestBox">
                    <template v-if="apiDocsDetailData.postArr.length > 0">
                        <el-row :key="getRequestItem.rp_id" v-for="getRequestItem in apiDocsDetailData.postArr" style="margin-bottom:0px">
                            <template v-if="getRequestItem.rp_way == 'BODY'">
                                    <el-col :span="4"><div class="grid-content bg-purple">{{getRequestItem.rp_name}}</div></el-col>
                                    <el-col :span="8"><div class="grid-content bg-purple">{{getRequestItem.rp_note}}</div></el-col>
                                    <el-col :span="4"><div class="grid-content bg-purple">{{getRequestItem.rp_is_must}}</div></el-col>
                                    <el-col :span="4"><div class="grid-content bg-purple">{{getRequestItem.rp_type}}</div></el-col>
                                    <el-col :span="4"><div class="grid-content bg-purple">{{getRequestItem.rp_rule}}</div></el-col>
                            </template>
                            <template v-else>
                                <el-col :span="24"><div style="font-size:12px;" class="grid-content bg-purple">无POST请求参数</div></el-col>
                            </template>  
                        </el-row>
                    </template>  
                    <template v-else>
                        <el-row><el-col :span="24"><div style="font-size:12px;" class="grid-content bg-purple">无POST请求参数</div></el-col></el-row>
                    </template>  
                </div>
                <div class="apiDocTitleBox"><i class="fa fa-circle fa-fw"></i>返回结果</div>
                <div class="apiDocContentBox" style="padding:0px;margin-right:0px;">
                    <mavon-editor v-model="apiDocsDetailData.ap_response_params" :toolbarsFlag="false" :subfield="false" :editable="false" defaultOpen="preview" :boxShadow="false" :placeholder="placeholder" />
                </div>

            </template>
            
        </div>
    </div>
</template>

<script>
    import { mapState,mapMutations } from 'vuex'
    export default {
        data(){
            return {
                placeholder:" "
            }
        },
        mounted(){

            //获取接口文档信息
            this.$myLoading.startLoading()
            this.$http.getHttp(this.$API.systemApiSearchApiDocsMenu + "/type/1",rs => {
                this.$myLoading.endLoading()
                this['AtomicLayerApiDocsListModule/updateApiDocsListData'](rs.categoryArr)
            });

        },
        computed: {
            ...mapState({
                apiDocsListData  : state => state.AtomicLayerApiDocsListModule.apiDocsListData,
                apiDocsDetailData  : state => state.AtomicLayerApiDocsListModule.apiDocsDetailData
            })
        },
        methods : {
            ...mapMutations(['updateApiDocsListData','AtomicLayerApiDocsListModule/updateApiDocsListData']),
            ...mapMutations(['updateApiDocsMenuShow','AtomicLayerApiDocsListModule/updateApiDocsMenuShow']),
            ...mapMutations(['updateApiDocsDetailData','AtomicLayerApiDocsListModule/updateApiDocsDetailData']),
            
            //点击分类菜单
            apiMenuClick(index){
                this['AtomicLayerApiDocsListModule/updateApiDocsMenuShow'](index)
            },

            apiDocsMenuItemClick(item){

                this.$myLoading.startLoading()
                this.$http.getHttp(this.$API.systemApiSearchApiDocsDetail + "/ap_id/" + item.ap_id,rs => {
                    this.$myLoading.endLoading()
                    this['AtomicLayerApiDocsListModule/updateApiDocsDetailData'](rs.apiData)
                });

            }
        }
    }
</script>

<style lang="stylus" scoped>


.atomicApiDocsListBox {
    position absolute  
    background #f0f0f0
    top 40px
    bottom 0px
    left 0px
    right 0px

    .noApiDocsBox {
        width 100%
        height 100%  
        position relative

        .noApiDocsText {
            width auto
            height auto
            position absolute
            top 50% 
            left 50%
            margin-top -15px
            margin-left -90px
            font-size 24px
            padding-right 10px
            color #999
        }
    }

    .atomicApiDocsMenuBox {
        width 200px
        height 100% 

        .atomicApiDocsItem {
            width 200px
            height auto  
            border-bottom 1px solid #666
            cursor pointer

            &:last-child  {
                border-bottom none
            }
        }

        .atomicApiDocsMenuCategory {
            width 100%
            height 40px
            line-height 40px
            text-indent 15px
            color #fff
            background #333
            

        }

        .atomicApiDocsMenuContent {
            width 100%
            height auto
        }

        .atomicApiDocsMenuItem {
            width 100%
            height 40px
            line-height 40px
            text-indent 15px

            &:hover {
                background #ccc
            }
        }
    }

    .atomicApiDocsContentBox {
        position absolute
        left 200px
        right 0px
        border-left:1px solid #ccc;
        top 0px
        bottom 0px
        background #fff    
        overflow auto
    }

    .apiDocTitleBox {
        width 100%
        height 40px
        background #f5f5f5
        font-weight bold
        border-bottom:1px solid #eee
        border-top:1px solid #ccc
        color #333 
        line-height 40px

        i {
            margin-right 5px
            color #666
            margin-left 15px
        }
    }

    .apiDocContentBox {
        width auto
        height auto   
        padding-top 10px
        padding-bottom 10px
        padding-left 15px
        margin-right 15px
        line-height 20px
    }

    .apiDocRequestBox {
        width auto
        height auto
        padding-left 15px
    }
}
</style>