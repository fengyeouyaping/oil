<template>
    <div>
        <el-form :model="addAtomicApiForm" :rules="rules" label-position="right" ref="addAtomicApiForm" label-width="160px">
            <el-row><el-col :span="24" class="formTitleBox"><i class="fa fa-cog fa-fw"></i>基本信息：</el-col></el-row>    
            <el-form-item label="所属类别：" prop="ap_api">
                <el-col :span="8">
                    <el-select v-model="addAtomicApiForm.ap_apcid" placeholder="请选择所属类别">
                        <el-option
                        v-for="categoryItem in actionCategory"
                        :key="categoryItem.apc_id"
                        :label="categoryItem.apc_name"
                        :value="categoryItem.apc_id">
                        </el-option>
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="所属菜单：" prop="belongsMenu">
                <el-col :span="8">
                    <el-cascader style="width:338px;"
                            placeholder="选择父菜单"
                            v-model="addAtomicApiForm.belongsMenu"
                            :options="menuData"
                            :props="{ checkStrictly: true }"
                             clearable>
                    </el-cascader>
                </el-col>
            </el-form-item>
            <el-form-item label="接口名称：" prop="ap_name">
                <el-col :span="8">
                    <el-input v-model="addAtomicApiForm.ap_name" placeholder="请输入接口名称"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="接口地址：" prop="ap_api">
                <el-col :span="8">
                    <el-input v-model="addAtomicApiForm.ap_api" placeholder="请输入接口地址"></el-input>
                </el-col>
            </el-form-item>
            
            <el-form-item label="请求方式：" prop="ap_method">
                <el-col :span="15">
                    <el-radio v-model="addAtomicApiForm.ap_method" label="GET" >GET</el-radio>
                    <el-radio v-model="addAtomicApiForm.ap_method" label="POST" >POST</el-radio>
                    <el-radio v-model="addAtomicApiForm.ap_method" label="ALL" >ALL</el-radio>
                </el-col>
            </el-form-item>
            
            <el-form-item label="接口描述：" prop="ap_desc">
                <el-col :span="8">
                    <el-input type="textarea" v-model="addAtomicApiForm.ap_desc" rows="5" placeholder="请输入接口描述"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="接口备注：" prop="ap_note">
                <el-col :span="8">
                    <el-input type="textarea" v-model="addAtomicApiForm.ap_note" rows="5" placeholder="请输入接口备注"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="是否接受权限控制：" prop="ap_is_control">
                <el-switch v-model="addAtomicApiForm.ap_is_control"></el-switch>
            </el-form-item>
            <el-row><el-col :span="24" class="formTitleBox"><i class="fa fa-cog fa-fw"></i>自动构建信息：</el-col></el-row>    
            <el-form-item label="是否自动构建：" prop="ap_is_auto">
                <el-switch v-model="addAtomicApiForm.ap_is_auto"></el-switch>
            </el-form-item>
            <el-form-item label="自动构建类型：" prop="ap_type">
                <el-col :span="15">
                    <el-radio v-model="addAtomicApiForm.ap_type" label="C" >新增</el-radio>
                    <el-radio v-model="addAtomicApiForm.ap_type" label="U" >更新</el-radio>
                    <el-radio v-model="addAtomicApiForm.ap_type" label="R" >普通查询</el-radio>
                    <el-radio v-model="addAtomicApiForm.ap_type" label="D" >删除</el-radio>
                    <el-radio v-model="addAtomicApiForm.ap_type" label="V" >关联查询</el-radio>
                </el-col>
            </el-form-item>
            <el-form-item label="自动构建表名：" prop="ap_auto_table">
                <el-col :span="8">
                    <el-input v-model="addAtomicApiForm.ap_auto_table" placeholder="请输入自动构建表名称"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="构建视图条件：" prop="ap_more_table_where">
                <el-col :span="8">
                    <el-input v-model="addAtomicApiForm.ap_more_table_where" placeholder="请输入构建视图条件"></el-input>
                    <font color="red">注：选择关联查询类型时，在此指名多表关联条件</font>
                </el-col>
            </el-form-item>
            <el-row><el-col :span="24" class="formTitleBox"><i class="fa fa-cog fa-fw"></i>缓存配置：</el-col></el-row>
            <el-form-item label="是否开启缓存：" prop="ap_is_cache">
                <el-switch v-model="addAtomicApiForm.ap_is_cache"></el-switch>
            </el-form-item>    
            <el-form-item label="是否使用缓存：" prop="ap_is_get_cache">
                <el-switch v-model="addAtomicApiForm.ap_is_get_cache"></el-switch>
            </el-form-item>    
            <el-form-item label="缓存类型：" prop="ap_cache_type">
                <el-col :span="15">
                    <el-radio v-model="addAtomicApiForm.ap_cache_type" label="file" >文件缓存</el-radio>
                </el-col>
            </el-form-item>
            <el-row>
                <el-col :span="24" class="formTitleBox"><i class="fa fa-cog fa-fw"></i>GET 请求参数：
                    <i @click="deleteRequestGetParams(-1)" class="fa fa-minus-square fa-fw" style="float:right;margin-top:10px;font-size:20px;"></i>
                    <i @click="addRequestGetParams" class="fa fa-plus-square fa-fw" style="float:right;margin-top:10px;font-size:20px;margin-right:0px;"></i>
                </el-col>
            </el-row>
            <el-row :gutter="20" v-for="(requestItem,index) in requestGetParams" :key="'GET-' + index">
                <el-col :span="3"><el-input v-model="requestItem.rp_name" placeholder="请输入参数名称"></el-input></el-col>
                <el-col :span="4"><el-input v-model="requestItem.rp_note" placeholder="请输入参数备注"></el-input></el-col>
                <el-col :span="4">是否为必传参&nbsp;
                    <el-switch v-model="requestItem.rp_is_must"></el-switch>
                </el-col>
                <el-col :span="6">参数类型&nbsp;
                    <el-select v-model="requestItem.rp_type" placeholder="请选择参数类型">
                        <el-option
                        v-for="typeItem in requestType"
                        :key="typeItem.value"
                        :label="typeItem.label"
                        :value="typeItem.value">
                        </el-option>
                    </el-select>
                </el-col>    
                <el-col :span="6" style="text-align:right;">验证规则&nbsp;&nbsp;
                    <el-select v-model="requestItem.rp_rule" placeholder="请选择参数类型">
                        <el-option
                        v-for="ruleItem in requestRule"
                        :key="ruleItem.value"
                        :label="ruleItem.label"
                        :value="ruleItem.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="1"><i style="font-size:20px;color:red;" @click="deleteRequestGetParams(index)" class="fa fa-minus-square fa-fw" ></i></el-col>
            </el-row> 

            <el-row>
                <el-col :span="24" class="formTitleBox"><i class="fa fa-cog fa-fw"></i>POST 请求参数：
                    <i @click="deleteRequestPostParams(-1)" class="fa fa-minus-square fa-fw" style="float:right;margin-top:10px;font-size:20px;"></i>
                    <i @click="addRequestPostParams" class="fa fa-plus-square fa-fw" style="float:right;margin-top:10px;font-size:20px;margin-right:0px;"></i>
                </el-col>
            </el-row>
            <el-row :gutter="20" v-for="(requestItem,index) in requestPostParams" :key="index">
                <el-col :span="3"><el-input v-model="requestItem.rp_name" placeholder="请输入参数名称"></el-input></el-col>
                <el-col :span="4"><el-input v-model="requestItem.rp_note" placeholder="请输入参数备注"></el-input></el-col>
                <el-col :span="4">是否为必传参&nbsp;
                    <el-switch v-model="requestItem.rp_is_must"></el-switch>
                </el-col>
                <el-col :span="6">参数类型&nbsp;
                    <el-select v-model="requestItem.rp_type" placeholder="请选择参数类型">
                        <el-option
                        v-for="typeItem in requestType"
                        :key="typeItem.value"
                        :label="typeItem.label"
                        :value="typeItem.value">
                        </el-option>
                    </el-select>
                </el-col>    
                <el-col :span="6" style="text-align:right;">验证规则&nbsp;&nbsp;
                    <el-select v-model="requestItem.rp_rule" placeholder="请选择参数类型">
                        <el-option
                        v-for="ruleItem in requestRule"
                        :key="ruleItem.value"
                        :label="ruleItem.label"
                        :value="ruleItem.value">
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="1"><i style="font-size:20px;color:red;" @click="deleteRequestPostParams(index)" class="fa fa-minus-square fa-fw" ></i></el-col>
            </el-row>    
            <el-row><el-col :span="24" class="formTitleBox"><i class="fa fa-cog fa-fw"></i>返回参数：</el-col></el-row>
            <el-row>
                <mavon-editor :toolbars="$global.markdownToolbars" v-model="addAtomicApiForm.ap_response_params"/>
            </el-row>
            <el-button type="primary" @click="submitForm('addAtomicApiForm')">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
           
        </el-form>  
    </div>
</template>

<script>
    import { mapState,mapMutations } from 'vuex'
    export default {
        //数据源
        data(){
            return {
               rules : {
                   
                }
            }
        },
        //初始化函数
        mounted() {

            //获取接口分类信息
            this.$myLoading.startLoading()
            this.$http.getHttp(this.$API.menuActionPermissionsCategorySearch + "/apc_type/0", rs => {
                
                this['AddAtomicApiModule/updateCategoryData'](rs.data)

                //获取菜单列表信息
                this.$http.getHttp(this.$API.menuSearch + "/skip/0/limit/1000", rs => {
                    this.$myLoading.endLoading()
                    this['AddAtomicApiModule/updateMenuData'](this.$common.arrayReorganization(rs.data))
                });
            });

            
            

        },
        //计算属性
        computed: {
            ...mapState({
                addAtomicApiForm  : state => state.AddAtomicApiModule.addAtomicApiForm,
                requestRule       : state => state.AddAtomicApiModule.requestRule,
                requestType       : state => state.AddAtomicApiModule.requestType,
                requestPostParams : state => state.AddAtomicApiModule.requestPostParams,
                requestGetParams  : state => state.AddAtomicApiModule.requestGetParams,
                actionCategory    : state => state.AddAtomicApiModule.actionCategory,
                menuData          : state => state.AddAtomicApiModule.menuData
             })
        },
        //组件方法
        methods: {
            ...mapMutations(['updateRequestPostParams','AddAtomicApiModule/updateRequestPostParams']),
            ...mapMutations(['updateRequestGetParams','AddAtomicApiModule/updateRequestGetParams']),
            ...mapMutations(['updateCategoryData','AddAtomicApiModule/updateCategoryData']),
            ...mapMutations(['updateMenuData','AddAtomicApiModule/updateMenuData']),
            ...mapMutations(['clearForm','AddAtomicApiModule/clearForm']),
            
            //新增POST请求参数
            addRequestPostParams(){
                this.requestPostParams.push({
                    rp_name : "",
                    rp_type : "",
                    rp_is_must : true,
                    rp_way : "BODY",
                    rp_note : "",
                    rp_rule : ""
                })
            },

            //新增GET请求参数
            addRequestGetParams(){
                this.requestGetParams.push({
                    rp_name : "",
                    rp_type : "",
                    rp_is_must : true,
                    rp_way : "RESTFUL",
                    rp_note : "",
                    rp_rule : ""
                })
            },

            //删除POST请求参数
            deleteRequestPostParams(index){

                if(index == -1){

                    let newRequestPostParamsArr = this.$_.dropRight(this.requestPostParams)
                    if(newRequestPostParamsArr <= 0){
                        return
                    }

                    this['AddAtomicApiModule/updateRequestPostParams'](this.$_.dropRight(this.requestPostParams))

                }else{

                    this.requestPostParams.splice(index,1)
                    this['AddAtomicApiModule/updateRequestPostParams'](this.requestPostParams);

                }

            }, 

            //删除GET请求参数
            deleteRequestGetParams(index){

                if(index == -1){

                    let newRequestGetParamsArr = this.$_.dropRight(this.requestGetParams)
                    if(newRequestGetParamsArr <= 0){
                        return
                    }

                    this['AddAtomicApiModule/updateRequestGetParams'](this.$_.dropRight(this.requestGetParams))

                }else{

               
                    this.requestGetParams.splice(index,1)
                    this['AddAtomicApiModule/updateRequestGetParams'](this.requestGetParams);

                }

                
            }, 

            //提交新增参数请求
            submitForm(addAtomicApiForm){
                

                //将参数为空的POST参数过滤掉
                var newRequestPostParams = this.requestPostParams.filter((item) => {
                    return item.rp_name != '' && item.rp_rule != '' && item.rp_type != ''
                })

                //将参数为空的GET参数过滤掉
                var newRequestGetParams = this.requestGetParams.filter((item) => {
                    return item.rp_name != '' && item.rp_rule != '' && item.rp_type != ''
                })

                //重新构建请求参数
                var params = this.addAtomicApiForm
                params.ap_request_params = newRequestPostParams.concat(newRequestGetParams)
                params.ap_is_control     = params.ap_is_control ? 1 : 0
                params.ap_is_auto        = params.ap_is_auto ? 1 : 0
                params.ap_is_cache       = params.ap_is_cache ? 1 : 0
                params.ap_is_get_cache   = params.ap_is_get_cache ? 1 : 0

                this.$myLoading.startLoading()
                this.$http.postHttp(this.$API.systemAddActionPermissions,params,(rs) => {

                    this.$myLoading.endLoading()
                    this.$myPop.SuccessMessage()
                    
                    this['AddAtomicApiModule/clearForm']()
                    
                })
            },

            resetForm(){
                this['AddAtomicApiModule/clearForm']()
            }
            
        }
    }
</script>

<style lang="stylus" scoped>

</style>