<template>
    <div class="menuActionBox">
        <!--左侧公司节点-->
        <div class="companyNodeDataList">
            <el-scrollbar>
            <el-tree
                    node-key="or_id"
                    :data="menuData"
                    :default-expand-all="true"
                    :expand-on-click-node="false"
                    ref="tree"
                    @node-click="nodeClick">
            </el-tree>
            </el-scrollbar>
        </div>
        <div class="menuActionContent">
            <div class="menuActionContentBox">
                <div class="nowMenuActionBox">
                     <p v-if="nowActionData.length <= 0">该菜单暂未分配操作</p>
                     <div class="actionAllTitle" v-if="nowActionData.length > 0">当前操作</div>
                     <div class="nowActionItem" v-for="(nowActionItem,index) in nowActionData" :key="index">{{nowActionItem.ap_name}}<i class="fa fa-lg fa-minus-circle" @click="removeActionClick(index)"></i></div>
                </div>
                <div class="allMenuActionBox">
                    <div class="actionAllTitle">全部操作</div>
                    <template v-for="actionCategoryItem in actionData">
                        <div class="actionCategoryBox" @click="actionCategoryClick(actionCategoryItem)">{{actionCategoryItem.apc_name}}</div>
                        <el-collapse-transition>
                            <div v-if="actionCategoryItem.isShow">
                                <div class="actionItem" v-for="actionItem in actionCategoryItem.apiList">
                                    <div class="actionTextContent contentEllipsis">
                                        <b>{{actionItem.ap_id}}</b>： {{actionItem.ap_name}} <span style="color:#999">[ {{actionItem.ap_api}} ]</span>
                                    </div>
                                    <i class="fa fa-lg fa-plus-circle" @click="addActionClick(actionItem)"></i>
                                </div>
                            </div>
                        </el-collapse-transition>
                    </template>
                </div>
            </div>
            <div class="menuActionSubmit">
                <el-button type="primary" @click="actionMenuForm">确认将选中操作分配给该菜单</el-button>    
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
                nowMenuId : 0 //当前操作的菜单ID
            }
        },
        //初始化函数
        mounted() {

            this.$myLoading.startLoading()

            //获取菜单
            this.$http.getHttp(this.$API.menuSearch + "/skip/0/limit/1000", rs => {

                
                this['MenuActionManagerModule/updateMenuData'](this.$common.arrayReorganization(rs.data))

                //获取所有操作信息
                this.$http.getHttp(this.$API.systemApiSearchApiDocsMenu  + "/type/0", rs => {

                    this.$myLoading.endLoading()
                    this['MenuActionManagerModule/updateActionData'](rs.categoryArr)
    
                });

            });

            
            

        },
        //计算属性
        computed: {
            ...mapState({ 
                menuData : state => state.MenuActionManagerModule.menuData,
                actionData : state => state.MenuActionManagerModule.actionData,
                nowActionData : state => state.MenuActionManagerModule.nowActionData,
            })
        },
        //组件方法
        methods: {
            ...mapMutations(['updateMenuData','MenuActionManagerModule/updateMenuData']),
            ...mapMutations(['updateActionData','MenuActionManagerModule/updateActionData']),
            ...mapMutations(['updateNowActionData','MenuActionManagerModule/updateNowActionData']),
            ...mapMutations(['addNowActionData','MenuActionManagerModule/addNowActionData']),
            ...mapMutations(['removeNowActionData','MenuActionManagerModule/removeNowActionData']),

            //点击菜单节点时
            nodeClick(data,checkData){

                //判断是否为三级菜单
                if(data.m_level < 2){
                    return
                }
             
                //获取当前菜单ID
                var menuId = data.m_id

                //保存当前要操作的菜单
                this.nowMenuId = menuId

                var params = {
                    fields : "ap_id,ap_name,ap_api"
                }

                //获取当前菜单所拥有的操作
                this.$myLoading.startLoading()
                this.$http.postHttp(this.$API.menuMenuActionPermissionsInfoSearch + "/m_id/"+menuId+"/skip/0/limit/1000", params,rs => {

                    
                    this.$myLoading.endLoading()
                    this['MenuActionManagerModule/updateNowActionData'](rs.data)

                });
                

            },

            actionMenuForm(){

                //判断是否选择了菜单
                if(this.nowMenuId == 0){
                    this.$myPop.WarningMessage("请选择要分配操作的菜单")
                    return
                }

                var params = {
                    menuId     : this.nowMenuId,
                    actionData : this.nowActionData
                }

                //获取当前菜单所拥有的操作
                this.$myLoading.startLoading()
                this.$http.postHttp(this.$API.systemApiAddMenuToAction, params,rs => {

                    this.$myLoading.endLoading()
                    this.$myPop.SuccessMessage()

                });
            },

            //减少操作
            removeActionClick(index){

                this['MenuActionManagerModule/removeNowActionData'](index)

            },

            //新增操作
            addActionClick(item){

                //判断是否选择了菜单
                if(this.nowMenuId == 0){
                    this.$myPop.WarningMessage("请选择要分配操作的菜单")
                    return
                }

                //判断当前所拥有的操作中是否包含该操作
                var isIn = this.nowActionData.find((data)=>{
                    return data.ap_id == item.ap_id
                })

                //没有找到该操作，进行添加操作
                if(isIn == undefined){

                    var addAction = {
                        ap_id   : item.ap_id,
                        ap_name : item.ap_name,
                        ap_api  : item.ap_api
                    };

                    this['MenuActionManagerModule/addNowActionData'](addAction)
                
                }else{

                    this.$myPop.WarningMessage("该菜单已包含该操作")
                 
                }
            },

            //点击分类菜单
            actionCategoryClick(item){
                item.isShow = !item.isShow
            }
        }
    }
</script>

<style lang="stylus" scoped>
.menuActionBox {
    top 40px
    left 0px
    bottom 0px
    right 0px
    position absolute
}

.companyNodeDataList{
        width 280px
        position absolute
        left 0px
        padding 10px
        top 0px
        bottom 0px
        overflow auto
    }
    .menuActionContent {
        position absolute
        left 300px
        top 0px
        right 0px
        bottom 0px
        overflow auto
        border-left 1px solid #eee

        .menuActionContentBox {
            width 100%
            left 0px
            right 0px
            bottom 50px
            position absolute
            top 0px
        }

        .menuActionSubmit {
            bottom 0px
            left 0px
            right 0px
            height 50px
            position absolute
            background #eee 

            button {
                margin-top 5px
                margin-left 5px
            }
        }

        .nowMenuActionBox {
            width 40.88%
            height 100%
            overflow auto
            float left    
            border-right 1px solid #eee

            p {
                padding 12px
            }

            .nowActionItem {
                width 100%
                height 40px
                text-indent 15px
                line-height 40px
                border-bottom 1px solid #eee

                i {
                   position relative
                   float right
                   margin-right 10px
                   margin-top 13px
                   color red
                   cursor pointer
                }

                &:hover {
                    background #eee
                }
            }
        }

        .allMenuActionBox {
            width 59%
            overflow auto
            height 100%
            float right
        }
        
        .actionAllTitle {
            width 100%
            line-height 30px
            text-indent 15px
            background #ccc
            font-weight bold 
            height 30px    
        }

        .actionCategoryBox {
            width 100%
            height 40px
            background #333
            border-bottom 1px solid #fff
            color #fff
            text-indent 15px
            cursor pointer
            line-height 40px   
        }

        .actionItem {
            width 100%
            height 40px
            text-indent 15px
            line-height 40px
            background #fff    
            border-bottom 1px solid #eee

            .actionTextContent {
                width 90% 
                float left
            }

            i {
                position relative
                float right
                margin-right 10px
                margin-top 13px
                color green
                cursor pointer
            }

            &:hover {
                background #eee
            }
        }
    }
</style>