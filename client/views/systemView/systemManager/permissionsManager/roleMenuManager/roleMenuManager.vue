<template>
    <div class="roleMenuManagerBox">
       <div class="roleMenuList">
           <div class="roleMenuTitle">所有角色</div>
           <div class="roleMenuItem" @click="selectRoleClick(roleItem,index)" :key="roleItem.or_id" v-for="roleItem,index in roleData">{{roleItem.or_name}}<i v-if="roleItem.isSelected" class="el-icon-circle-check"></i></div>
       </div>
       <div class="roleMenuContent">
           <div class="roleMenuTreeBox">
               <el-scrollbar>
               <p v-if="nowRoleId <= 0" style="padding:5px;padding-left:10px;color:#999">无菜单信息</p>
               <el-tree
                v-if="nowRoleId > 0"
                :data="menuData"
                :check-strictly="true"
                :expand-on-click-node="false"
                :default-checked-keys="selectMenuIds"
                show-checkbox
                @check="nodeCheck"
                ref="tree"
                node-key="m_id">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.label }}</span>
                    <span v-if="node.level == 3 || node.level == 4">
                        <el-button  
                            type="text"
                            size="mini"
                            @click="() => selectAction(data)">
                            选择操作
                        </el-button>
                    </span>
                </span>
                </el-tree>
                </el-scrollbar>
           </div>
           
           <div class="roleActionSubmit">
                <el-button type="primary" @click="roleMenuForm">确认将选中菜单分配给该角色</el-button>    
           </div> 
       </div>
       <div class="roleActionContent">
           <div class="roleActionBox">

               <p style="color:#999" v-if="actionData.length <= 0">无操作信息</p>
               <div class="roleActionItem" :key="actionItem.ap_id" v-for="actionItem in actionData">
                    <el-checkbox v-model="actionItem.isChecked">{{actionItem.ap_name}} {{actionItem.ap_api}}</el-checkbox> 
                    <p>{{actionItem.ap_desc}}</p>
                </div>
           </div>
           
           <div class="roleActionSubmit">
                <el-button type="primary" @click="actionMenuForm">确认将选中操作分配给该菜单</el-button>    
           </div> 
       </div>
       <!-- <div class="roleActionSubmit">
            <el-button type="primary" @click="roleMenuForm">确认分配</el-button>    
       </div>     -->
    </div>
</template>

<script>
    import { mapState,mapMutations } from 'vuex'
    export default {
        //数据源
        data(){
            return {
                nowSelectedActionMenuId : 0,  //当前所选操作的菜单
                parentId                : [], //保存选中节点的父节点数组
                nowNodeData             : [], //当前所选中的节点数组
                originalMenuData        : [], //未经过树形转化的菜单数据
                nowRoleId               : 0,  //当前所选的角色
                nowMenuIds              : []  //当前所选角色的菜单
            }
        },
        //初始化函数
        mounted() {

            this.initData();
            

        },
        //计算属性
        computed: {
            ...mapState({ 
              
                roleData   : state => state.RoleMenuManagerModule.roleData,
                actionData : state => state.RoleMenuManagerModule.actionData,
                menuData   : state => state.RoleMenuManagerModule.menuData,
                selectMenuIds : state => state.RoleMenuManagerModule.selectMenuIds,
                nowMenuData : state => state.RoleMenuManagerModule.nowMenuData

            })
        },
        //组件方法
        methods: {
            ...mapMutations(['updateRoleData','RoleMenuManagerModule/updateRoleData']),
            ...mapMutations(['updateActionData','RoleMenuManagerModule/updateActionData']),
            ...mapMutations(['updateMenuData','RoleMenuManagerModule/updateMenuData']),
            ...mapMutations(['updateSelectMenuIdsData','RoleMenuManagerModule/updateSelectMenuIdsData']),
            ...mapMutations(['updateNowMenuData','RoleMenuManagerModule/updateNowMenuData']),
            ...mapMutations(['updateRoleSelectedData','RoleMenuManagerModule/updateRoleSelectedData']),
            //初始化
            initData(){

                //获取角色列表信息
                this.$myLoading.startLoading()
                this.$http.getHttp(this.$API.organizationalRoleSearch + "/no/or_is_all-1/skip/0/limit/1000", rs => {

                    //新增角色选中操作属性
                    rs.data.forEach((item)=>{
                        item.isSelected = false
                    })

                    //更新角色列表
                    this['RoleMenuManagerModule/updateRoleData'](rs.data)
                    this.$http.getHttp(this.$API.menuSearch + "/skip/0/limit/1000", rs => {

                        this.$myLoading.endLoading()
                        this.originalMenuData = rs.data
                        this['RoleMenuManagerModule/updateMenuData'](this.$common.arrayReorganization(rs.data))

                    
                    });
                });

            },
            //节点选择时
            nodeCheck(data,checkData){

                //获取当前选中的节点
                var mId = data.m_id

              
                //查看是新增选中还是删除选中
                if(this.nowNodeData.indexOf(mId) != -1){

                    //删除节点
                    this.removeChildNode(mId)

                    //如无同胞节点则删除父节点
                    this.removeParentNode(mId)

                    this.$refs.tree.setCheckedKeys(this.nowNodeData)

                }else{

                    //清空父节点存储数组    
                    this.parentId = []

                    this.getParentNode(mId)

                    this.getChildNode(mId)

                    this.parentId.push(mId)

                    this.nowNodeData = [];

                    this.nowNodeData = this.$_.union(this.parentId,checkData.checkedKeys)

                    this.$refs.tree.setCheckedKeys(this.nowNodeData)

                }


            },

            //判断同级是否有被选中的菜单
            removeParentNode(mid){

                var nowFid = 0

                //获取当前选中菜单的父菜单ID
                for(var i=0;i<this.originalMenuData.length;i++){

                    if(this.originalMenuData[i].m_id == mid){

                        nowFid = this.originalMenuData[i].m_fid

                        break

                    }

                }

                //查看当前所选中的菜单中是否有和当前选择的父ID相同的
                for(var i=0;i<this.nowNodeData.length;i++){

                    for(var k=0;k<this.originalMenuData.length;k++){

                        if(this.nowNodeData[i] == this.originalMenuData[k].m_id && this.originalMenuData[k].m_id != mid){

                            var tempFid = this.originalMenuData[k].m_fid

                            if(nowFid == tempFid){

                                return true

                            }

                        }

                    }

                }


                this.$_.remove(this.nowNodeData,(item)=>{
                        return item == nowFid
                })

                return false

            },

            //删除的子节点
            removeChildNode(mid,isRemove){

                //查看删除的菜单是否有子菜单
                for(var i=0;i<this.originalMenuData.length;i++){

                    if(this.originalMenuData[i].m_id == mid){

                        var childNode = this.originalMenuData[i].children

                        //有子菜单
                        if(childNode != undefined && childNode.length > 0){

                            //循环删除子菜单项 
                            for(var k=0;k<childNode.length;k++){

                                //循环从现有菜单中删除子菜单
                                this.$_.remove(this.nowNodeData,(item)=>{
                                    return item == childNode[k].m_id
                                })

                                this.removeChildNode(childNode[k].m_id)

                            }     

                        }else{


                            //循环从现有菜单中删除子菜单
                            this.$_.remove(this.nowNodeData,(item)=>{
                                return item == mid
                            })

                            break

                        }
                    }
                }

                //删除自身节点
                this.$_.remove(this.nowNodeData,(item)=>{
                    return item == mid
                })
              
            },

            //获取所有子节点ID
            getChildNode(mid){

                //查看删除的菜单是否有子菜单
                for(var i=0;i<this.originalMenuData.length;i++){

                    if(this.originalMenuData[i].m_id == mid){

                        var childNode = this.originalMenuData[i].children

                        //有子菜单
                        if(childNode != undefined && childNode.length > 0){

                            //循环删除子菜单项 
                            for(var k=0;k<childNode.length;k++){

                                this.parentId.push(childNode[k].m_id)

                                this.getChildNode(childNode[k].m_id)

                            }     

                        }else{


                            this.parentId.push(mid)

                            break

                        }
                    }
                }

            },

            //获取所有父节点ID
            getParentNode(mid){

                //是否继续执行递归
                var isRecursive = false

                //递归时的mid
                var newMid = 0

                for(var i=0;i<this.originalMenuData.length;i++){

                    if(this.originalMenuData[i].m_id == mid){

                        if(this.originalMenuData[i].m_fid != 0){

                            this.parentId.push(this.originalMenuData[i].m_fid)

                            newMid = this.originalMenuData[i].m_fid

                            isRecursive = true
 
                        }

                        break;

                    }

                }

                if(isRecursive){
                    this.getParentNode(newMid)
                }

            },
            
            //选择操作
            selectAction(item){

                //获取当前选中的菜单ID
                var menuId = item.m_id

                //保存当前选择操作的菜单
                this.nowSelectedActionMenuId = menuId

                //根据选中的菜单ID获取当前菜单所拥有的操作
                var selectNowMenuData = this.nowMenuData.filter((item)=>{
                    return item.m_id == menuId
                })

                //当前菜单所拥有的操作
                var apids = []

                if(selectNowMenuData.length > 0){
                    if(selectNowMenuData[0].rmm_apids){
                        apids = selectNowMenuData[0].rmm_apids.split(",")
                    }
                }

                //通过所选菜单获取操作权限
                this.$myLoading.startLoading()
                this.$http.getHttp(this.$API.menuMenuActionPermissionsInfoSearch + "/m_id/"+item.m_id+"/skip/0/limit/1000", rs => {

                    this.$myLoading.endLoading()

                    //设置选中状态
                    rs.data.forEach((item) => {
                        if(apids.indexOf(item.ap_id) > -1){
                            item.isChecked = true
                        }else{
                            item.isChecked = false
                        }
                    })

                    this['RoleMenuManagerModule/updateActionData'](rs.data)
                });
            },

            //操作分配菜单
            actionMenuForm(){

                if(this.nowRoleId == 0){
                    this.$myPop.WarningMessage("请选择要分配权限的角色")
                    return
                }

                if(this.nowSelectedActionMenuId == 0){
                    this.$myPop.WarningMessage("请选择要分配操作的菜单")
                    return
                }

                if(this.actionData <= 0){
                    this.$myPop.WarningMessage("该菜单下无可分配的操作")
                    return
                }

                //获取选中的操作ID
                var actionIds = ""
                this.actionData.forEach((item)=>{

                    if(item.isChecked) {
                        actionIds += item.ap_id + ","
                    }
                    
                })

                var updateParams = {
                    "update_where" : "rmm_orid,rmm_mid",
                    "rmm_orid"     : this.nowRoleId,
                    "rmm_mid"      : this.nowSelectedActionMenuId,
                    "rmm_apids"    : this.$common.deleteLastStr(actionIds)
                }
                
                this.$myLoading.startLoading()
                this.$http.postHttp(this.$API.roleMenuMiddleUpdate,updateParams,(rs) => {
                    this.$myLoading.endLoading()
                    this.$myPop.SuccessMessage()
                })

            },

            //菜单分配角色    
            roleMenuForm(){

                if(this.nowRoleId == 0){
                    this.$myPop.WarningMessage("请选择要分配权限的角色")
                    return
                }

                //获取当前角色所选菜单
                this.nowMenuIds = this.$refs.tree.getCheckedNodes(false,true)

                if(this.nowMenuIds.length <= 0){

                    var deleteParams = {
                        delete_where : "rmm_orid",
                        rmm_orid : this.nowRoleId,
                        isPhysicallyDelete : 1
                    }

                    this.$myLoading.startLoading()
                    this.$http.postHttp(this.$API.roleMenuMiddleDelete,deleteParams, rs => {
                        this.$myLoading.endLoading()
                        this.$myPop.SuccessMessage()
                    });

                }else{

                    //构建请求参数
                    var addParams = {}
                    
                    addParams.roleId       = this.nowRoleId
                    addParams.roleMenuData = []
                    this.nowMenuIds.forEach((item)=>{
                        addParams.roleMenuData.push({
                            menuId : item.m_id,
                            actionIds : item.m_action_ids
                        })
                    })

                    //将所选菜单写入角色
                    this.$myLoading.startLoading()
                    this.$http.postHttp(this.$API.systemApiAddMenuToRole,addParams,(rs) => {
                        this.$myLoading.endLoading()
                        this.$myPop.SuccessMessage()
                    })
                }
                
            },

            //选择角色
            selectRoleClick(item,index){

                this['RoleMenuManagerModule/updateRoleSelectedData'](index)

                this['RoleMenuManagerModule/updateActionData']([])

                //获取当前选择的角色
                this.nowRoleId = item.or_id

                //选中当前角色
                item.isSelected = true

                //获取角色所拥有的菜单以及操作权限
                this.$myLoading.startLoading()
                this.$http.getHttp(this.$API.roleRoleMenuInfoSearch + "/rmm_orid/"+item.or_id+"/skip/0/limit/1000", rs => {
                
                    this.$myLoading.endLoading()
                    this.$refs.tree.setCheckedNodes(rs.data);

                    //更新菜单列表
                    this['RoleMenuManagerModule/updateNowMenuData'](rs.data)

                });

            }
        }
    }
</script>

<style lang="stylus" scoped>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
}
.roleMenuManagerBox {
    top 40px
    left 0px
    bottom 0px
    right 0px
    position absolute

    .roleMenuList {
        width 200px
        height 100%
        overflow auto
        float left
        border-right 1px solid #eee

        .roleMenuTitle {
            width 100%
            height 40px
            line-height 40px
            text-indent 12px
            color #fff
            background #666
        }

        .roleMenuItem {
            width 100%
            height 40px
            background #fff
            line-height 40px
            text-indent 10px
            border-bottom 1px solid #eee 
            position relative

            i {
                font-size 18px
                position absolute
                top 9px
                color #409EFF
                right 10px
            }


            &:hover {
                background #eee
                cursor pointer
            }
        }
    }

    .roleMenuContent {
        position absolute
        width 400px
        left 202px
        top 5px
        right 0px
        bottom 0px
        overflow auto
        padding-bottom 5px

        .roleMenuTreeBox {
            position absolute
            top 0px
            left 0px
            right 0px
            bottom 50px
            overflow auto
        }
    }

    .roleActionContent {
        position absolute
        left 612px
        top 0px
        right 10px
        bottom 0px
        overflow auto
        padding-bottom 5px
        border-left 1px solid #eee
        padding-left 15px
        padding-top 10px

        .roleActionBox {
            position absolute
            top 0px
            left 0px
            right 0px
            bottom 50px
            padding 10px
            overflow auto
        }

        .roleActionItem {
            width 100%
            height auto
            float left
            margin-bottom 10px
            border-bottom 1px solid #eee
            padding-bottom 5px

            p{
                margin-top 5px
                color #999
            }
        }
    }

    .roleActionSubmit {
        position absolute
        bottom 0px
        left 0px
        right 0px
        height 50px

        button {
            margin-top 5px
            margin-left 7px
        }
    }
}

</style>