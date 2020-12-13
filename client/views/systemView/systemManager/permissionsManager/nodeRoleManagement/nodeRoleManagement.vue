<template>
    <div class="nodeRoleBox">
        <!--左侧公司节点-->
        <div class="companyNodeDataList">
            <el-scrollbar>
            <el-tree
                    node-key="or_id"
                    :data="companyNodeData"
                    :default-expand-all="true"
                    :expand-on-click-node="false"
                    ref="tree"
                    @node-click="nodeClick">
            </el-tree>
            </el-scrollbar>
        </div>
        <!--右侧角色列表-->
        <div class="roleMenuList">
            <el-transfer 
                v-model="nowRoleData" 
                :data="roleData"
                :props="{
                    key   : 'or_id',
                    label : 'or_name'
                }"
                :titles="['所有角色', '当前角色']">
                
            </el-transfer>

            <div class="nodeRoleSubmit">
                <el-button type="primary" @click="nodeRoleForm">将角色分配给节点</el-button>
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
                nowRoleData       : [], //当前节点所拥有的角色
                nowNodeId         : 0,  //当前选中的节点ID
                nowNodeData       : {}, //当前选中的节点信息
                otherNodeRoleData : [] //其他要更新节点的参数信息
            }
        },
        //初始化函数
        mounted() {

            //获取公司节点列表信息
            this.$myLoading.startLoading()
            this.$http.getHttp(this.$API.organizationalStructureSearch + "/skip/0/limit/1000", rs => {

                this['NodeRoleManagement/getCompanyNodeData'](this.$common.arrayOrganizationalStructure(rs.data))

                this.$http.getHttp(this.$API.organizationalRoleSearch + "/no/or_is_all-1/skip/0/limit/1000", rs => {
                    this.$myLoading.endLoading()
                    for(let n in rs.data){
                        rs.data[n].roleMenu = false
                    }
                    this['NodeRoleManagement/updateRoleData'](rs.data)
                });
            });
            
            
        },
        //计算属性
        computed: {
            ...mapState({

                companyNodeData   : state => state.NodeRoleManagement.companyNodeData,
                roleData          : state => state.NodeRoleManagement.roleData,

            })
        },
        //组件方法
        methods: {
            ...mapMutations(['getCompanyNodeData','NodeRoleManagement/getCompanyNodeData']),
            ...mapMutations(['updateRoleData','NodeRoleManagement/updateRoleData']),

            //点击树形控件
            nodeClick(data) {
      
                this.nowNodeData = data

                this.$myLoading.startLoading()
                this.$http.getHttp(this.$API.organizationalRoleMiddleSearch + "/orm_osid/"+data.os_id+"/skip/0/limit/1000", rs => {
                    this.$myLoading.endLoading()

                    var tempRoleArr = []
                    //获取当前所拥有的权限,构建可用数据
                    rs.data.forEach((item)=>{
                        tempRoleArr.push(item.orm_orid)
                    })

                    this.nowNodeId   = data.os_id
                    this.nowRoleData = tempRoleArr
                    

                });
                  

            },

            //获取下层节点有继承关系的角色更新参数
            getChildNodeRole(data){

                //判断该节点的下层是否还有子节点
                if(data.children != undefined && data.children.length > 0){
           
                   //判断下层节点的是否继承上层
                   data.children.forEach((item)=>{
            
                       if(item.os_is_inherit == '1'){
                
                           var nodeRoleParams = {
                               osid : item.os_id
                           };

                           nodeRoleParams.node_role = []
                           for(var n=0;n<this.nowRoleData.length;n++){
                               nodeRoleParams.node_role.push({
                                   orm_orid : this.nowRoleData[n]
                               })
                           }

                           this.otherNodeRoleData.push(nodeRoleParams)

                           this.getChildNodeRole(item)
                           
                       }else{

                           return

                       }


                   })

                }else{

                    return false

                }


            },
            
            //点击进行分配
            nodeRoleForm(){

                if(this.nowNodeId == 0){
                    this.$myPop.WarningMessage("请选择要分配角色的节点")
                    return
                }

                var datas = {}
                datas.node_role = []
                datas.osid = this.nowNodeId
                for(let n in this.nowRoleData){
                    datas.node_role.push({
                        "orm_orid" : this.nowRoleData[n]
                    })
                }

                //访问接口，进行分配
                this.$myLoading.startLoading()
                this.$http.postHttp(this.$API.systemApiOrganizationalAllocationRole,datas,(rs) => {

                    //判断是否有需要更新权限的子节点
                    this.getChildNodeRole(this.nowNodeData)
                    if(this.otherNodeRoleData.length > 0){

                        this.$http.postHttp(this.$API.systemApiOrganizationalInheritRole,{ other_node_role :this.otherNodeRoleData },(rs) => {
                            this.$myLoading.endLoading()
                            this.$myPop.SuccessMessage()
                        })
                    }else{
                        this.$myLoading.endLoading()
                        this.$myPop.SuccessMessage()
                    }
                })

            },

        }
    }
</script>

<style lang="stylus" scoped>
    
    .nodeRoleBox {
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
    .roleMenuList {
        position absolute
        left 300px
        top 0px
        padding-left 15px
        padding-right 10px
        padding-top 15px
        right 0px
        bottom 0px
        overflow auto
        border-left 1px solid #eee
        
        .nodeRoleSubmit {
            position absolute
            bottom 0px
            height 50px
            background #eee
            z-index 99
            left 0px
            right 0px

            button {
                margin-top 5px
                margin-left 5px
            }
        }
    }
</style>