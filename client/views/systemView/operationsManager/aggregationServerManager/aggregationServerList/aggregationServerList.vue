<template>
    <div>
        <div class="tableHeader">
                <div class="tableHeaderTitle">聚合层服务器列表<span style="color:red">（操作暂时只支持linux服务器）</span></div>
                <div class="tableHeaderMenu">
                    <el-button-group>
                        <el-button icon="el-icon-refresh" size="mini" @click="refreshData"></el-button>
                    </el-button-group>
                </div>
            </div> 
            <el-table
                    ref="multipleTable"
                    :data="serverData"
                    tooltip-effect="dark"
                    style="width: 100%">
                <el-table-column
                        prop="as_no"
                        label="服务器编号">
                </el-table-column>
                <el-table-column
                        prop="as_name"
                        label="服务器名称">
                </el-table-column>
                <el-table-column
                        prop="as_ip"
                        label="服务器地址">
                </el-table-column>
                <el-table-column
                        prop="as_port"
                        label="端口号">
                </el-table-column>
                <el-table-column
                        :formatter="isOpenFormatter"
                        prop="as_is_open"
                        label="是否开启">
                </el-table-column>
                <el-table-column
                        :formatter="statusFormatter"
                        prop="status"
                        label="服务器状态">
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="450">
                    <template slot-scope="scope">
                        <el-button
                                v-if="scope.row.status == 'RUNNING'"
                                size="mini"
                                @click="restartServer(scope.$index, scope.row)">重新启动</el-button>
                        <el-button
                                v-if="scope.row.status == 'STOP'"
                                size="mini"
                                @click="startServer(scope.$index, scope.row)">启动服务</el-button>
                        <el-button
                                v-if="scope.row.status == 'RUNNING'"
                                size="mini"
                                type="danger"
                                @click="stopServer(scope.$index, scope.row)">停止服务</el-button>
                        <el-button
                                size="mini"
                                @click="gitPullServer(scope.$index, scope.row)">更新项目(Git)</el-button>
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

            //获取服务器数据
            this.initServerData()

        },
        //计算属性
        computed: {
            ...mapState({ 
                serverData : state => state.AggregationServerListModule.serverData,
            })
        },
        //组件方法
        methods: {
            ...mapMutations(['updateServerData','AggregationServerListModule/updateServerData']),


            initServerData(){

                this.$myLoading.startLoading()
                this.$http.getHttp(this.$API.systemApiSearchAggregationServer, rs => {
                    
                    this.$myLoading.endLoading()
                    this['AggregationServerListModule/updateServerData'](rs.data)
                    
                });
                
            },

            handleEdit(index,item){

                this.$router.push({
                    path: "/editAggregationServer",
                    query : {
                        as_id : item.as_id
                    }
                });

            },

            handleDelete(index,item){

                this.$myPop.confirmBox("删除提示","确定要删除聚合层服务吗？删除后，聚合层将无法访问原子层服务，如需访问需要重新进行添加注册操作",() => {

                    var params = {
                        delete_where : "as_id",
                        as_id : item.as_id,
                        isPhysicallyDelete : "1"
                    }

                    this.$myLoading.startLoading()
                    this.$http.postHttp(this.$API.sysAggregationServerDelete,params, rs => {
                        
                        this.$myLoading.endLoading()
                        this.$myPop.SuccessMessage()

                        this.serverData.splice(index,1)
                        
                    });
                    

                })

            },

            restartServer(index, item){
                
                this.$myPop.confirmBox("重启提示","确定要重启该聚合层服务吗？",() => {

                    var params = {
                        server_ip  : item.as_ip,
                        server_dir : item.as_project_path
                    }

                    this.$myLoading.startLoading()
                    this.$http.postHttp(this.$API.sshRestartServer,params, rs => {

                        this.$myLoading.endLoading()
                        this.$myPop.alertHtmlBox("服务器启动结果：",rs)

                        item.status = 'RUNNING'
                       
                        
                    });

                })

            },
            

            startServer(index,item){
                
                this.$myPop.confirmBox("启动提示","确定要启动该聚合层服务吗？启动后，该聚合层提供的接口可以对外进行服务。",() => {

                    var params = {
                        server_ip  : item.as_ip,
                        server_dir : item.as_project_path
                    }

                    this.$myLoading.startLoading()
                    this.$http.postHttp(this.$API.sshStartServer,params, rs => {

                        this.$myLoading.endLoading()
                        this.$myPop.alertHtmlBox("服务器启动结果：",rs)

                        item.status = 'RUNNING'
                       
                        
                    });

                })
                
            },

            stopServer(index,item){

                this.$myPop.confirmBox("停止提示","确定要停止该聚合层服务吗？停止后，该聚合层提供的接口服务的将不可使用。",() => {

                    var params = {
                        server_ip  : item.as_ip,
                        server_dir : item.as_project_path
                    }

                    this.$myLoading.startLoading()
                    this.$http.postHttp(this.$API.sshStopServer,params, rs => {
                        
                        this.$myLoading.endLoading()
                        this.$myPop.alertHtmlBox("服务器停止结果：",rs)

                        item.status = 'STOP'
                        
                    });

                })
            },

            gitPullServer(index,item){

                this.$myPop.confirmBox("更新提示","确定要更新聚合层服务吗？该操作仅对项目使用GIT管理的用户有效，如无GIT管理，该操作无效果。",() => {

                    var params = {
                        server_ip  : item.as_ip,
                        server_dir : item.as_project_path
                    }

                    this.$myLoading.startLoading()
                    this.$http.postHttp(this.$API.sshGitPull,params, rs => {
                        
                        this.$myLoading.endLoading()
                        this.$myPop.alertHtmlBox("服务更新结果：",rs)

                    });

                })

            },

            refreshData(){

                //获取服务器数据
                this.initServerData()

            },

            isOpenFormatter(row, column, cellValue, index){
                return cellValue == 0 ? "关闭" : "开启"
            },

            statusFormatter(row, column, cellValue, index){
                return cellValue == "RUNNING" ? "运行中" : "已停止"
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>