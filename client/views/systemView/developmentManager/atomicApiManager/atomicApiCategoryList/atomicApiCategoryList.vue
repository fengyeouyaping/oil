<template>
    <div>
       <div class="tableHeader">
                <div class="tableHeaderTitle">分类列表</div>
                <div class="tableHeaderMenu">
                    <el-button-group>
                        <el-button icon="el-icon-refresh" @click="refreshData" size="mini"></el-button>
                    </el-button-group>
                </div>
            </div>
            <el-table
                    ref="multipleTable"
                    :data="categoryData"
                    tooltip-effect="dark"
                    style="width: 100%">
                <el-table-column
                        prop="apc_id"
                        label="分类ID"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="apc_name"
                        label="分类名称">
                </el-table-column>
                <el-table-column
                        :formatter="categoryTypeFormatter"
                        prop="apc_type"
                        label="分类类型">
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

            //获取分类列表
            this.$myLoading.startLoading()
            this.$http.getHttp(this.$API.menuActionPermissionsCategorySearch + "/apc_type/0/skip/0/limit/1000", rs => {
                this.$myLoading.endLoading()
                this['AtomicApiCategoryListModule/updateCategoryData'](rs.data)
            });
            

        },
        //计算属性
        computed: {
            ...mapState({
                categoryData : state => state.AtomicApiCategoryListModule.categoryData
             })
        },
        //组件方法
        methods: {
            ...mapMutations(['updateCategoryData','AtomicApiCategoryListModule/updateCategoryData']),
            

            //编辑分类
            handleEdit(index,item){

                this.$router.push({
                    path: "/editAtomicApiCategory",
                    query : {
                        apc_id : item.apc_id
                    }
                });

            },

            //删除分类
            handleDelete(index,item){

                this.$myPop.confirmBox("确认操作","确定要删除该接口分类吗？",()=>{

                    var params = {
                        apcid : item.apc_id
                    }
                    
                    //获取分类列表
                    this.$myLoading.startLoading()
                    this.$http.postHttp(this.$API.systemApiRemoveActionPermissionsCategory, params,rs => {
                        this.$myLoading.endLoading()
                        this.$myPop.SuccessMessage()

                        this.categoryData.splice(index,1)
                    });

                })

            },

            refreshData(){

                //获取分类列表
                this.$myLoading.startLoading()
                this.$http.getHttp(this.$API.menuActionPermissionsCategorySearch + "/skip/0/limit/1000", rs => {
                    this.$myLoading.endLoading()
                    this['AtomicApiCategoryListModule/updateCategoryData'](rs.data)
                });

            },

            categoryTypeFormatter(row, column, cellValue, index){
                if(cellValue == 0){
                    return "业务接口分类"
                }else if(cellValue == 1){
                    return "内置系统接口"
                }else{
                    return "扩展接口分类"
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>