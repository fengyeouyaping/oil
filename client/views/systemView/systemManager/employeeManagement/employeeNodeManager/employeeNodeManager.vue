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
        <!--右侧员工列表-->
        <div class="roleMenuList">
            <el-transfer 
                v-model="nowEmployeeData" 
                :data="employeeData"
                :props="{
                    key   : 'u_id',
                    label : 'u_nickname'
                }"
                :titles="['所有员工', '当前员工']">
                
            </el-transfer>

            <div class="nodeRoleSubmit">
                <el-button type="primary" @click="nodeEmployeeForm">将员工分配给节点</el-button>
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
                nowNodeId : 0, //当前选中的节点ID
                nowEmployeeData : []
            }
        },
        //初始化函数
        mounted() {

            //获取公司节点列表信息
            this.$myLoading.startLoading()
            this.$http.getHttp(this.$API.organizationalStructureSearch + "/skip/0/limit/1000", rs => {
                this['EmployeeNodeManagerModule/getCompanyNodeData'](this.$common.arrayOrganizationalStructure(rs.data))

                //获取所有员工信息
                this.$http.getHttp(this.$API.userSearch + "/u_is_admin/0/u_is_delete/0/skip/0/limit/1000", rs => {
                    this.$myLoading.endLoading()
                    this['EmployeeNodeManagerModule/updateEmployeeData'](rs.data)
                });
            });

            
            

        },
        //计算属性
        computed: {
           ...mapState({
                companyNodeData : state => state.EmployeeNodeManagerModule.companyNodeData,
                employeeData    : state => state.EmployeeNodeManagerModule.employeeData
            })
        },
        //组件方法
        methods: {
            ...mapMutations(['getCompanyNodeData','EmployeeNodeManagerModule/getCompanyNodeData']),
            ...mapMutations(['updateEmployeeData','EmployeeNodeManagerModule/updateEmployeeData']),

            nodeClick(data){

                //清除原有选择
                this.nowEmployeeData = []

                //当前选择的节点
                this.nowNodeId = data.os_id

                //获取该节点下的员工 
                this.$myLoading.startLoading()
                this.$http.getHttp(this.$API.userOrganizationalMiddleSearch + "/uom_osid/"+data.os_id+"/skip/0/limit/1000", rs => {
                    this.$myLoading.endLoading()

                    rs.data.forEach((item)=>{
                        this.nowEmployeeData.push(item.uom_uid)
                    })

                });
            },

            nodeEmployeeForm(){

                if(this.nowNodeId == 0){
                    this.$myPop.WarningMessage("请选择要分配员工的节点")
                    return
                }

                var datas = {}
                datas.employee = []
                datas.osid = this.nowNodeId
                for(let n in this.nowEmployeeData){
                    datas.employee.push({
                        "uom_uid" : this.nowEmployeeData[n]
                    })
                }

                //访问接口，进行分配
                this.$myLoading.startLoading()
                this.$http.postHttp(this.$API.systemApiOrganizationalToEmployee,datas,(rs) => {
                    this.nowNodeId = 0
                    this.$myLoading.endLoading()
                    this.$myPop.SuccessMessage()
                })

            }
        
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