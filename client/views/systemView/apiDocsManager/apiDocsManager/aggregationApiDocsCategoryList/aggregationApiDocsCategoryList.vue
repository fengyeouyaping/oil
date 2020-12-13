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
                        prop="badc_id"
                        label="分类ID"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="badc_name"
                        label="分类名称">
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
            //获取分类列表信息
            this.$myLoading.startLoading()
            this.$http.getHttp(this.$API.bussinessApiDocsCategorySearch + "/skip/0/limit/1000", rs => {
                this.$myLoading.endLoading()
                this['AggregationApiDocsCategoryListModule/updateCategoryData'](rs.data)
            });
        },
        //计算属性
        computed: {
            ...mapState({
                categoryData : state => state.AggregationApiDocsCategoryListModule.categoryData
             })
        },
        //组件方法
        methods: {
            ...mapMutations(['updateCategoryData', 'AggregationApiDocsCategoryListModule/updateCategoryData']),

            handleEdit(index,item){

                this.$router.push({
                    path: "/editAggregationApiDocsCategory",
                    query : {
                        badc_id : item.badc_id
                    }
                });

            },

            handleDelete(index,item){

                this.$myPop.confirmBox("删除提示","确定要删除该分类吗？",() => {

                    var params = {
                        badcid : item.badc_id
                    }

                    this.$myLoading.startLoading()
                    this.$http.postHttp(this.$API.systemApiRemoveAggregationApiDocsCategory,params,rs => {
                        this.$myLoading.endLoading()
                        this.$myPop.SuccessMessage()
                        this.categoryData.splice(index,1)
                    });

                })

            },

            refreshData(){
                //获取分类列表信息
                this.$myLoading.startLoading()
                this.$http.getHttp(this.$API.bussinessApiDocsCategorySearch + "/skip/0/limit/1000", rs => {
                    this.$myLoading.endLoading()
                    this['AggregationApiDocsCategoryListModule/updateCategoryData'](rs.data)
                });
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>