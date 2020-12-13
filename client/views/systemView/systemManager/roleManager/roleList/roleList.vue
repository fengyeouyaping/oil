<template>
    <div>
        <div class="tableHeader">
                <div class="tableHeaderTitle">角色列表</div>
                <div class="tableHeaderMenu">
                    <el-button-group>
                        <el-button icon="el-icon-refresh" size="mini" @click="refreshData"></el-button>
                    </el-button-group>
                </div>
            </div> 
            <el-table
                    ref="multipleTable"
                    :data="roleData"
                    tooltip-effect="dark"
                    style="width: 100%">
                
                <el-table-column
                        prop="or_id"
                        label="角色ID"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="or_name"
                        label="角色名称">
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="260">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
    </div>
</template>

<script>
    import { mapState,mapMutations } from 'vuex'
    export default {
        //数据源
        data(){
            return {

            }
        },
        //初始化函数
        mounted() {

            //获取角色列表信息
            this.$myLoading.startLoading()
            this.$http.getHttp(this.$API.organizationalRoleSearch + "/no/or_is_all-1/skip/0/limit/1000", rs => {
                
                this.$myLoading.endLoading()
                this['RoleListModule/updateRoleData'](rs.data)

            });

        },
        //计算属性
        computed: {
            ...mapState({
                roleData : state => state.RoleListModule.roleData,
                menuPath : state => state.ContentModule.menuPath
            })
        },
        //组件方法
        methods: {
            ...mapMutations(['updateRoleData', 'RoleListModule/updateRoleData']),
            ...mapMutations(['appendMenuPath', 'ContentModule/appendMenuPath']),
            
            //刷新数据
            refreshData(){

                //获取角色列表信息
                this.$myLoading.startLoading()
                this.$http.getHttp(this.$API.organizationalRoleSearch + "/no/or_is_all-1/skip/0/limit/1000", rs => {
                    
                    this.$myLoading.endLoading()
                    this['RoleListModule/updateRoleData'](rs.data)
                    
                });

            },

            handleEdit(index,item){

                this.$router.push({
                    path: "/editRole",
                    query : {
                        or_id : item.or_id
                    }
                });
            },
            handleDelete(index,item){

                this.$myPop.confirmBox("删除确认","确定要删除该角色吗？",() => {

                    //删除角色处理
                    this.$myLoading.startLoading()
                    this.$http.postHttp(this.$API.systemApiRemoveRole,{orid : item.or_id},rs => {
                    
                        this.$myLoading.endLoading()
                        this.$myPop.SuccessMessage()

                        this.roleData.splice(index,1)

                    });

                })

            },
            handleSelectionChange(){

            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>