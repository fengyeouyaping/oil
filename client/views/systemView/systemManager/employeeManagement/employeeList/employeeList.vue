<template>
    <div>
        <div class="tableHeader">
                <div class="tableHeaderTitle">员工列表</div>
                <div class="tableHeaderMenu">
                    <el-button-group>
                        <el-button icon="el-icon-refresh" size="mini" @click="refreshData"></el-button>
                    </el-button-group>
                </div>
            </div> 
            <el-table
                    ref="multipleTable"
                    :data="employeeData"
                    tooltip-effect="dark"
                    style="width: 100%">
                <el-table-column
                        prop="u_id"
                        label="用户ID"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="u_nickname"
                        label="员工名称">
                </el-table-column>
                <el-table-column
                        prop="u_phone"
                        label="员工电话">
                </el-table-column>
                <el-table-column
                        prop="u_email"
                        label="邮箱地址">
                </el-table-column>
                <el-table-column
                        :formatter="isStatus"
                        prop="u_status"
                        label="状态"
                        width="80"> 
                </el-table-column>
                <el-table-column
                        :formatter="isSex"
                        prop="u_sex"
                        label="性别"
                        width="80"> 
                </el-table-column>
                
                <el-table-column
                        prop="u_position"
                        label="职务">
                </el-table-column>
                <el-table-column
                        prop="u_desc"
                        label="描述">
                </el-table-column>
                <el-table-column
                        prop="u_salary"
                        label="工资">
                </el-table-column>
                <el-table-column
                        prop="u_hiredate"
                        label="入职时间">
				       <template slot-scope="scope">
				            {{$common.dateFormat("YYYY年MM月dd日",scope.row.u_hiredate)}}
				        </template>
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
			this.initData();
        },
        //计算属性
        computed: {
            ...mapState({
                employeeData : state => state.EmployeeListModule.employeeData
            })
        },
        //组件方法
        methods: {
            ...mapMutations(['updateEmployeeData','EmployeeListModule/updateEmployeeData']),

            initData(){

	            //获取员工列表信息
	            this.$myLoading.startLoading()
	            this.$http.getHttp(this.$API.userSearch + "/u_is_delete/0/u_is_admin/0/skip/0/limit/1000", rs => {
	                
	                this.$myLoading.endLoading()
	                this['EmployeeListModule/updateEmployeeData'](rs.data)
	
	
	            });
	            
            },
            
            refreshData(){
       			this.initData();
            },

            handleEdit(index,item){

                this.$router.push({
                    path: "/editEmployee",
                    query : {
                        u_id : item.u_id
                    }
                });

            },

            handleDelete(index,item){


                this.$myPop.confirmBox("删除确认","确定要删除该用户吗？",() => {

                    var params = {
                        uid : item.u_id
                    }

                    this.$myLoading.startLoading()
                    this.$http.postHttp(this.$API.systemApiRemoveUser,params, rs => {
                        this.$myLoading.endLoading()
                        this.$myPop.SuccessMessage()

                        this.employeeData.splice(index,1)
                    });


                })

            },

            isStatus(row, column, cellValue, index){
                return cellValue == 0 ? "在职" : "离职"
            },

            isSex(row, column, cellValue, index){
                return cellValue == 0 ? "男" : "女"
            },

        }
    }
</script>

<style lang="stylus" scoped>

</style>