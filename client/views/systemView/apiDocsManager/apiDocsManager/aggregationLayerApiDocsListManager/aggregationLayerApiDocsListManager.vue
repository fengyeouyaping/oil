<template>
    <div>
        <div class="tableHeader">
                <div class="tableHeaderTitle">文档列表</div>
                <div class="tableHeaderMenu">
                    <el-button-group>
                        <el-button icon="el-icon-refresh" @click="refreshData" size="mini"></el-button>
                    </el-button-group>
                </div>
            </div>
            <el-table
                    ref="multipleTable"
                    :data="apiDocsListData"
                    tooltip-effect="dark"
                    style="width: 100%">
                <el-table-column
                        prop="bad_id"
                        label="接口ID"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="bad_name"
                        label="接口名称">
                </el-table-column>
                <el-table-column
                        prop="bad_api"
                        label="接口地址">
                </el-table-column>
                <el-table-column
                        prop="bad_method"
                        label="请求方式">
                </el-table-column>
                <el-table-column
                        :formatter="typeFormatter"
                        prop="bad_type"
                        label="接口类型">
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

            //获取聚合层接口信息
            this.$myLoading.startLoading()
            this.$http.getHttp(this.$API.bussinessApiDocsSearch + "/skip/0/limit/1000", rs => {
                this.$myLoading.endLoading()
                this['AggregationLayerApiDocsListManagerModule/updateApiDocsListData'](rs.data)
            });

        },
        //计算属性
        computed: {
            ...mapState({ 
                apiDocsListData : state => state.AggregationLayerApiDocsListManagerModule.apiDocsListData
            })
        },
        //组件方法
        methods: {
            ...mapMutations(['updateApiDocsListData','AggregationLayerApiDocsListManagerModule/updateApiDocsListData']),

            handleEdit(index,item){

                this.$router.push({
                    path: "/editAggregationLayerApiDocs",
                    query : {
                        bad_id : item.bad_id
                    }
                });
                
                
            },

            refreshData(){

                //获取聚合层接口信息
                this.$myLoading.startLoading()
                this.$http.getHttp(this.$API.bussinessApiDocsSearch + "/skip/0/limit/1000", rs => {
                    this.$myLoading.endLoading()
                    this['AggregationLayerApiDocsListManagerModule/updateApiDocsListData'](rs.data)
                });

            },

            handleDelete(index,item){

                this.$myPop.confirmBox("删除提示","确定要删除该接口文档信息吗？",() => {

                    var params = {
                        delete_where : "bad_id",
                        bad_id       : item.bad_id,
                        isPhysicallyDelete : 1
                    }

                    this.$myLoading.startLoading()
                    this.$http.postHttp(this.$API.bussinessApiDocsDelete,params, rs => {
                        this.$myLoading.endLoading()
                        this.$myPop.SuccessMessage()
                        this.apiDocsListData.splice(index,1)
                    });
                })

            },

            typeFormatter(row, column, cellValue, index){
               return cellValue == 0 ? "自身业务接口" : "三方业务接口"
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>