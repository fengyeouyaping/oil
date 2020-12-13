<template>
    <div>
            <div class="tableHeader">
                <div class="tableHeaderTitle">菜单列表</div>
                <div class="tableHeaderMenu">
                    <el-button-group>
                        <el-button icon="el-icon-arrow-left" @click="goBackNode" size="mini"></el-button>
                        <el-button icon="el-icon-refresh" @click="refreshData" size="mini"></el-button>
                    </el-button-group>
                </div>
            </div>
            <el-table
                    ref="multipleTable"
                    :data="nodeData"
                    tooltip-effect="dark"
                    style="width: 100%">
                <el-table-column
                        prop="m_id"
                        label="菜单ID"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="m_name"
                        label="菜单名称">
                </el-table-column>
                <el-table-column
                        :formatter="menuTypeFormatter"
                        prop="m_type"
                        label="菜单类型">
                </el-table-column>
                <el-table-column
                        prop="m_url"
                        label="菜单地址">
                </el-table-column>
                <el-table-column
                        :formatter="menuLevelFormatter"
                        prop="m_level"
                        label="菜单级别">
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="260">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="getNodeData(scope.row.m_id)">查看子菜单</el-button>
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.row.m_id)">编辑</el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-row>
                
                <el-col :span="12">
                    <!-- <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
                    </el-pagination> -->
                </el-col>
            </el-row>
       
    </div>
</template>

<script>

    import { mapState,mapMutations } from 'vuex'

    export default {
        mounted() {

            //获取菜单列表信息
            this.initMenuData()
        },
        computed:{
            ...mapState({
                menuData : state => state.MenuListModule.menuData
            }),
            nodeData(){
                return this.nodeDataArr
            }
        },
        methods: {
            ...mapMutations(['updateOrganziational', 'MenuListModule/updateOrganziational']),
            ...mapMutations(['updateMenuData', 'MenuListModule/updateMenuData']),
            
            //编辑菜单
            handleEdit(m_id) {

                this.$router.push({
                    path: "/editMenu",
                    query : {
                        m_id : m_id
                    }
                });

            },
            initMenuData(){

                //获取菜单列表信息
                this.$myLoading.startLoading()
                this.$http.getHttp(this.$API.menuSearch + "/skip/0/limit/1000", rs => {
                    this.$myLoading.endLoading()
                    this['MenuListModule/updateMenuData'](rs.data)
                    this.getNodeData(0,0)
                });

            },
            refreshData(){
                this.initMenuData()
            },
            getNodeData(m_fid){
                if(m_fid == 0){

                    this.lastFid = -1

                }else{

                    //根据当前节点查询父节点ID
                    this.menuData.forEach((item) => {

                        if(item.m_id == m_fid){
                            this.lastFid = item.m_fid
                            return
                        }
                    })

                }

                //筛选满足条件的节点信息
                this.nodeDataArr =  this.menuData.filter((item) => {
                    return item.m_fid == m_fid
                })

            },
            goBackNode(){
                if(this.lastFid == -1){
                    this.$myPop.WarningMessage("该节点已经是根菜单了，无法继续返回")
                    return
                }
                this.getNodeData(this.lastFid)

            },

            handleDelete(index,item){


                this.$myPop.confirmBox("删除提示","确定要删除该菜单吗？",() => {

                    var params = {
                        menuid : item.m_id
                    }

                    this.$myLoading.startLoading()
                    this.$http.postHttp(this.$API.systemApiRemoveMenu,params, rs => {
                        this.$myLoading.endLoading()
                        this.$myPop.SuccessMessage()
                        this.initMenuData()
                    });
                    

                })

            },

            menuLevelFormatter(row, column, cellValue, index){
                if(cellValue == 0){
                    return "一级菜单"
                }else if(cellValue == 1){
                    return "二级菜单"
                }else if(cellValue == 2){
                    return "三级菜单"
                }else{
                    return "其他菜单"
                }
            },

            menuTypeFormatter(row, column, cellValue, index){
                if(cellValue == 0){
                    return "系统模块菜单"
                }else if(cellValue == 1){
                    return "扩展模块菜单"
                }else{
                    return "业务模块菜单"
                }
            }

        },
        data() {
            return {
                currentPage: "",
                nodeDataArr:[],
                skip :0,
                lastFid: 0
            };
        }
    };
</script>

<style lang="stylus" scoped>
    @import url('');
    .tableHeader {
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #eee;

    .tableHeaderTitle {
        width: auto;
        height: 16px;
        line-height: 16px;
        float: left;
        margin-top: 12px;
        font-size: 15px;
        padding-left: 10px;
        border-left: 3px solid #88B7E0;
    }

    .tableHeaderMenu {
        width: 200px;
        height: 40px;
        float: right;
        text-align: right;
    }
    }

    .tableBottomMenu {
        height: 64px;
        padding-top: 8px;
    }
</style>
