<template>
    <div>
            <el-form :model="configForm" :rules="rules" label-position="right" ref="configForm" label-width="160px">
                <el-row><el-col :span="24" class="formTitleBox"><i class="fa fa-cog fa-fw"></i>基本配置：</el-col></el-row>    
                <el-form-item label="是否开启debug：" prop="ac_is_debug">
                    <el-switch v-model="configForm.ac_is_debug"></el-switch><i class="el-icon-info more_info_icon"> 说明：开启后可查看请求的方式，执行的SQL等接口执行时的一些查看信息</i> 
                </el-form-item>
                <el-form-item label="是否独立部署：" prop="ac_is_independent_deployment">
                    <el-switch v-model="configForm.ac_is_independent_deployment"></el-switch>
                </el-form-item>
                <el-form-item label="是否需要聚合层验权：" prop="ac_is_aggregation_server_validation">
                    <el-switch v-model="configForm.ac_is_aggregation_server_validation"></el-switch>
                </el-form-item>
                <el-form-item label="是否管理端创建接口：" prop="ac_is_web_manager_add_api">
                    <el-switch v-model="configForm.ac_is_web_manager_add_api"></el-switch>
                </el-form-item>
                
                <el-form-item label="是否开启物理删除：" prop="ac_is_physically_delete">
                    <el-switch v-model="configForm.ac_is_physically_delete"></el-switch>
                </el-form-item>
                <el-form-item label="是否开启跨域请求：" prop="ac_is_access_control_allow_origin">
                    <el-switch v-model="configForm.ac_is_access_control_allow_origin"></el-switch>
                </el-form-item>
                <el-form-item label="请求方式" prop="ac_method">
                    <el-checkbox-group v-model="configForm.ac_method">
                        <el-checkbox label="GET"></el-checkbox>
                        <el-checkbox label="POST"></el-checkbox>
                        <el-checkbox label="ALL"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="是否自动构建CURD：" prop="ac_is_curd">
                    <el-switch v-model="configForm.ac_is_curd"></el-switch>
                </el-form-item>
                <el-form-item label="是否开启数据过滤：" prop="ac_is_data_filter">
                    <el-switch v-model="configForm.ac_is_data_filter"></el-switch>
                </el-form-item>
                <el-form-item label="路由解析层级设置：" prop="ac_router_layer">
                    <el-col :span="4">
                        <el-input v-model="configForm.ac_router_layer" placeholder="请输入路由层级"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="内置接口访问地址：" prop="ac_built_in_url">
                    <el-col :span="4">
                        <el-input v-model="configForm.ac_built_in_url" placeholder="请输入内置接口地址"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="默认分页显示数量：" prop="ac_page_limit">
                    <el-col :span="4">
                        <el-input v-model="configForm.ac_page_limit" placeholder="请输入分页数量"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="是否开启白名单验证：" prop="ac_is_white_auth">
                    <el-switch v-model="configForm.ac_is_white_auth"></el-switch>
                </el-form-item>
                <el-form-item label="是否需要接入数据库：" prop="ac_noDatabaseUse">
                    <el-switch v-model="configForm.ac_noDatabaseUse"></el-switch>
                </el-form-item>

                <el-row><el-col :span="24" class="formTitleBox"><i class="fa fa-cog fa-fw"></i>缓存相关配置：</el-col></el-row>
                
                <el-form-item label="是否进行缓存：" prop="ac_is_cache">
                    <el-switch v-model="configForm.ac_is_cache"></el-switch>
                </el-form-item>
                <el-form-item label="缓存的类型：" prop="ac_cache_type">
                    <el-radio label="文件缓存" v-model="configForm.ac_cache_type"></el-radio>
                </el-form-item>
                <el-form-item label="缓存的目录：" prop="ac_cache_dir">
                    <el-col :span="4">
                        <el-input v-model="configForm.ac_cache_dir" placeholder="请输入目录名称"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="缓存的过期时间(秒)：" prop="ac_cache_validity">
                    <el-col :span="4">
                        <el-input v-model="configForm.ac_cache_validity" placeholder="请输入缓存过期时间"></el-input>
                    </el-col>
                </el-form-item>

              
                <el-row><el-col :span="24" class="formTitleBox"><i class="fa fa-cog fa-fw"></i>Mysql 数据库相关配置：<font color="red" style="float:right;">(注：更改错误的数据库配置，可能导致管理端连接失败，请谨慎修改）</font></el-col></el-row>
                
                <el-form-item label="用户帐号：" prop="ac_mysql_username">
                    <el-col :span="6">
                        <el-input v-model="configForm.ac_mysql_username" placeholder="请输入用户帐号"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="用户密码：" prop="ac_mysql_password">
                    <el-col :span="6">
                        <el-input v-model="configForm.ac_mysql_password" placeholder="请输入用户密码"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="端口号：" prop="ac_mysql_port">
                    <el-col :span="6">
                        <el-input v-model="configForm.ac_mysql_port" placeholder="请输入端口号"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="主机地址：" prop="ac_mysql_host">
                    <el-col :span="6">
                        <el-input v-model="configForm.ac_mysql_host" placeholder="请输入主机地址"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="数据库名：" prop="ac_mysql_dbname">
                    <el-col :span="6">
                        <el-input v-model="configForm.ac_mysql_dbname" placeholder="请输入数据库名"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('configForm')">重新生成配置</el-button>
                </el-form-item>
            </el-form>    
           
    </div>
</template>

<script>
    import { mapState,mapMutations } from 'vuex'
    export default {
        //数据源
        data(){
            return {
                rules: {

                }
            }
        },
        //初始化函数
        mounted() {

            //获取配置信息
            this.$myLoading.startLoading()
            this.$http.getHttp(this.$API.systemApiSearchConfiguration, rs => {
                console.log(rs);
                this.$myLoading.endLoading()
                this["ServerConfigurationModule/updateConfigForm"](rs.data[0]);
            });

        },
        //计算属性
        computed: {
            ...mapState({
                configForm : state => state.ServerConfigurationModule.configForm,
            })
        },
        //组件方法
        methods: {
            ...mapMutations(['updateConfigForm', 'ServerConfigurationModule/updateConfigForm']),
            submitForm(configForm){

                var params = this.$_.cloneDeep(this.configForm);

                //构建请求参数
                params.ac_cache_type                     = params.ac_cache_type == '文件缓存' ? 'file' : 'memory'
                params.ac_is_debug                       = params.ac_is_debug   == true ? 1 : 0
                params.ac_is_access_control_allow_origin = params.ac_is_access_control_allow_origin   == true ? 1 : 0
                params.ac_is_aggregation_server_validation = params.ac_is_aggregation_server_validation   == true ? 1 : 0
                params.ac_is_web_manager_add_api = params.ac_is_web_manager_add_api   == true ? 1 : 0
                params.ac_is_cache                       = params.ac_is_cache   == true ? 1 : 0
                params.ac_is_curd                        = params.ac_is_curd    == true ? 1 : 0
                params.ac_is_independent_deployment      = params.ac_is_independent_deployment   == true ? 1 : 0
                params.ac_is_physically_delete           = params.ac_is_physically_delete        == true ? 1 : 0
                params.ac_is_white_auth                  = params.ac_is_white_auth   == true ? 1 : 0
                params.ac_is_data_filter                 = params.ac_is_data_filter   == true ? 1 : 0
                params.ac_noDatabaseUse                  = params.ac_noDatabaseUse   == true ? 1 : 0
                params.update_where                      = "ac_id"
                params.ac_method                         = params.ac_method.join(",")

                this.$myLoading.startLoading()
                this.$http.postHttp(this.$API.systemApiUpdateConfiguration, params, rs => {
                    this.$myLoading.endLoading()
                    
                    //调用配置文件重新生成接口
                    this.$http.postHttp(this.$API.systemApiRebuildConfiguration, params, rs => {
                        this.$myPop.SuccessMessage()
                    })
                    
                })

            }
        }
    }
</script>

<style lang="stylus" scoped>


</style>