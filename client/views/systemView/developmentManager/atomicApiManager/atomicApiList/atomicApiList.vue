<template>
    <div>
        <div class="tableHeader">
            <div class="tableHeaderTitle">操作接口列表 - <b>数量：{{apiListData.length}}</b></div>
            <div class="tableHeaderMenu">
                <el-button-group>
                    <el-button size="mini" @click="rebuldApiConfig">重新生成接口配置</el-button>
                    <el-button icon="el-icon-refresh" size="mini"></el-button>
                </el-button-group>
            </div>
        </div>
        <el-table
                ref="multipleTable"
                :data="apiListData"
                tooltip-effect="dark"
                style="width: 100%">
            <el-table-column
                prop="ap_name"
                label="接口名称">
            </el-table-column>
            <el-table-column
                prop="ap_api"
                label="接口地址">
            </el-table-column>
            <el-table-column
                prop="ap_method"
                label="请求方式"
                width="120">
            </el-table-column>
            <el-table-column
                :formatter="isAutoFormatter"
                prop="ap_is_auto"
                label="是否自动构建"
                width="120">
            </el-table-column>
            <!-- <el-table-column
                :formatter="apiTypeFormatter"
                prop="ap_api_type"
                label="接口类型">
            </el-table-column> -->
            <el-table-column label="操作" fixed="right" width="260">
            <template slot-scope="scope">
                <el-button
                    size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button
                    size="mini"
                    type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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

            //获取接口分类信息
            this.$myLoading.startLoading()
            this.$http.getHttp(this.$API.actionPermissionsSearch + "/ap_api_type/BUSSINESS/sort_order/ap_id-desc/skip/0/limit/1000", rs => {
                this.$myLoading.endLoading()
                this['AtomicApiListModule/updateApiListData'](rs.data)
            });

        },
        //计算属性
        computed: {
            ...mapState({
                apiListData  : state => state.AtomicApiListModule.apiListData,
            })
        },
        //组件方法
        methods: {
            ...mapMutations(['updateApiListData', 'AtomicApiListModule/updateApiListData']),

            //删除原子层接口
            handleDelete(index,item){

                this.$myPop.confirmBox("确认操作","确定要删除该操作接口吗？",()=>{

                    var params = {
                        apid : item.ap_id
                    }

                    this.$myLoading.startLoading()
                    this.$http.postHttp(this.$API.systemApiRemoveActionPermissions,params,rs => {
                        this.$myLoading.endLoading()
                        this.$myPop.SuccessMessage()

                        this.apiListData.splice(index,1)
                        
                    });
                })

            },

            //编辑原子层接口
            handleEdit(index,item){

                this.$router.push({
                    path: "/editAtomicApi",
                    query : {
                        ap_id : item.ap_id
                    }
                });

            }, 

            //格式化自动构建显示内容
            isAutoFormatter(row, column, cellValue, index){
                return cellValue == 0 ? "否" : "是"
            },

            //重新构建接口配置
            rebuldApiConfig(){

                this.$myPop.confirmBox("确认操作","确定要重新构建接口配置？",()=>{

                    this.$myLoading.startLoading()
                    this.$http.postHttp(this.$API.systemApiRebuildBussinessApi,{},rs => {
                        this.$myLoading.endLoading()
                        this.$myPop.SuccessMessage()
                    });
                })
            },

            apiTypeFormatter(row, column, cellValue, index){
                if(cellValue == 'BUSSINESS'){
                    return "业务接口"
                }else if(cellValue == 'SYSTEM'){
                    return "系统接口"
                }else{  
                    return "扩展接口"
                }

            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>