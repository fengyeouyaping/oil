<template>
    <div>
        <el-form :model="apiForm" :rules="rules" label-position="right" ref="apiForm" label-width="160px">
            <el-row><el-col :span="24" class="formTitleBox"><i class="fa fa-cog fa-fw"></i>基本信息：</el-col></el-row>
            <el-form-item label="所属类别：" prop="bad_badcid">
                <el-col :span="8">
                    <el-select v-model="apiForm.bad_badcid" placeholder="请选择所属类别">
                        <el-option
                        v-for="categoryItem in categoryData"
                        :key="categoryItem.badc_id"
                        :label="categoryItem.badc_name"
                        :value="categoryItem.badc_id">
                        </el-option>
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item label="接口名称：" prop="bad_name">
                <el-col :span="8">
                    <el-input v-model="apiForm.bad_name" placeholder="请输入接口名称"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="接口地址：" prop="bad_api">
                <el-col :span="8">
                    <el-input v-model="apiForm.bad_api" placeholder="请输入接口地址"></el-input>
                </el-col>
            </el-form-item>
            
            <el-form-item label="请求方式：" prop="bad_method">
                <el-col :span="15">
                    <el-radio v-model="apiForm.bad_method" label="GET" >GET</el-radio>
                    <el-radio v-model="apiForm.bad_method" label="POST" >POST</el-radio>
                    <el-radio v-model="apiForm.bad_method" label="ALL" >ALL</el-radio>
                </el-col>
            </el-form-item>
            
            <el-form-item label="接口描述：" prop="bad_desc">
                <el-col :span="8">
                    <el-input type="textarea" v-model="apiForm.bad_desc" rows="5" placeholder="请输入接口描述"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="接口备注：" prop="bad_note">
                <el-col :span="8">
                    <el-input type="textarea" v-model="apiForm.bad_note" rows="5" placeholder="请输入接口备注"></el-input>
                </el-col>
            </el-form-item>
            <el-row>
                <el-col :span="24" class="formTitleBox"><i class="fa fa-cog fa-fw"></i>GET 请求参数：
                    <i @click="deleteRequestGetParams" class="fa fa-minus-square fa-fw" style="float:right;margin-top:10px;font-size:20px;"></i>
                    <i @click="addRequestGetParams" class="fa fa-plus-square fa-fw" style="float:right;margin-top:10px;font-size:20px;margin-right:0px;"></i>
                </el-col>
            </el-row>
            <el-row :gutter="20" v-for="(requestItem,index) in requestGetParams" :key="index">
                <el-col :span="3"><el-input v-model="requestItem.badrp_name" placeholder="请输入参数名称"></el-input></el-col>
                <el-col :span="5"><el-input v-model="requestItem.badrp_note" placeholder="请输入参数备注"></el-input></el-col>
                <el-col :span="4">是否为必传参&nbsp;
                    <el-switch v-model="requestItem.badrp_is_must"></el-switch>
                </el-col>
                <el-col :span="6">参数类型&nbsp;
                    <el-select v-model="requestItem.badrp_type" placeholder="请选择参数类型">
                        <el-option
                        v-for="typeItem in requestType"
                        :key="typeItem.value"
                        :label="typeItem.label"
                        :value="typeItem.value">
                        </el-option>
                    </el-select>
                </el-col>    
                <el-col :span="6" style="text-align:right;">验证规则&nbsp;&nbsp;
                    <el-select v-model="requestItem.badrp_rule" placeholder="请选择参数类型">
                        <el-option
                        v-for="ruleItem in requestRule"
                        :key="ruleItem.value"
                        :label="ruleItem.label"
                        :value="ruleItem.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row> 

            <el-row>
                <el-col :span="24" class="formTitleBox"><i class="fa fa-cog fa-fw"></i>POST 请求参数：
                    <i @click="deleteRequestPostParams" class="fa fa-minus-square fa-fw" style="float:right;margin-top:10px;font-size:20px;"></i>
                    <i @click="addRequestPostParams" class="fa fa-plus-square fa-fw" style="float:right;margin-top:10px;font-size:20px;margin-right:0px;"></i>
                </el-col>
            </el-row>
            <el-row :gutter="20" v-for="(requestItem,index) in requestPostParams" :key="index">
                <el-col :span="3"><el-input v-model="requestItem.badrp_name" placeholder="请输入参数名称"></el-input></el-col>
                <el-col :span="5"><el-input v-model="requestItem.badrp_note" placeholder="请输入参数备注"></el-input></el-col>
                <el-col :span="4">是否为必传参&nbsp;
                    <el-switch v-model="requestItem.badrp_is_must"></el-switch>
                </el-col>
                <el-col :span="6">参数类型&nbsp;
                    <el-select v-model="requestItem.badrp_type" placeholder="请选择参数类型">
                        <el-option
                        v-for="typeItem in requestType"
                        :key="typeItem.value"
                        :label="typeItem.label"
                        :value="typeItem.value">
                        </el-option>
                    </el-select>
                </el-col>    
                <el-col :span="6" style="text-align:right;">验证规则&nbsp;&nbsp;
                    <el-select v-model="requestItem.badrp_rule" placeholder="请选择参数类型">
                        <el-option
                        v-for="ruleItem in requestRule"
                        :key="ruleItem.value"
                        :label="ruleItem.label"
                        :value="ruleItem.value">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>    
            <el-row><el-col :span="24" class="formTitleBox"><i class="fa fa-cog fa-fw"></i>返回参数：</el-col></el-row>
            <el-row>
                <mavon-editor :toolbars="$global.markdownToolbars" v-model="apiForm.bad_response_params"/>
            </el-row>
            <el-button type="primary" @click="submitForm('apiForm')">提交</el-button>
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

            //获取接口详细信息
            this.$myLoading.startLoading()
            this.$http.getHttp(this.$API.systemApiSearchAggregationApiDetail + "/bad_id/" + this.$route.query.bad_id, rs => {
                this.$myLoading.endLoading()
                this['EditAggregationLayerApiDocsModule/updateApiFormData'](rs.apiData)
                this['EditAggregationLayerApiDocsModule/updateRequestGetParams'](rs.getArr)
                this['EditAggregationLayerApiDocsModule/updateRequestPostParams'](rs.postArr)
            });

            //获取接口分类信息
            this.$http.getHttp(this.$API.bussinessApiDocsCategorySearch, rs => {
                this['EditAggregationLayerApiDocsModule/updateCategoryData'](rs.data)
            });

        },
        //计算属性
        computed: {
            ...mapState({
                apiForm  : state => state.EditAggregationLayerApiDocsModule.apiForm,
                categoryData  : state => state.EditAggregationLayerApiDocsModule.categoryData,
                requestRule       : state => state.EditAggregationLayerApiDocsModule.requestRule,
                requestType       : state => state.EditAggregationLayerApiDocsModule.requestType,
                requestPostParams : state => state.EditAggregationLayerApiDocsModule.requestPostParams,
                requestGetParams  : state => state.EditAggregationLayerApiDocsModule.requestGetParams
             })
        },
        //组件方法
        methods: {
            ...mapMutations(['updateCategoryData','EditAggregationLayerApiDocsModule/updateCategoryData']),
            ...mapMutations(['updateRequestPostParams','EditAggregationLayerApiDocsModule/updateRequestPostParams']),
            ...mapMutations(['updateRequestGetParams','EditAggregationLayerApiDocsModule/updateRequestGetParams']),
            ...mapMutations(['updateApiFormData','EditAggregationLayerApiDocsModule/updateApiFormData']),
    
            //新增POST请求参数
            addRequestPostParams(){
                this.requestPostParams.push({
                    badrp_name : "",
                    badrp_type : "",
                    badrp_is_must : true,
                    badrp_way : "BODY",
                    badrp_note : "",
                    badrp_rule : ""
                })
            },

            //新增GET请求参数
            addRequestGetParams(){
                this.requestGetParams.push({
                    badrp_name : "",
                    badrp_type : "",
                    badrp_is_must : true,
                    badrp_way : "RESTFUL",
                    badrp_note : "",
                    badrp_rule : ""
                })
            },

            //删除POST请求参数
            deleteRequestPostParams(){

                let newRequestPostParamsArr = this.$_.dropRight(this.requestPostParams)
                if(newRequestPostParamsArr <= 0){
                    return
                }

                this['EditAggregationLayerApiDocsModule/updateRequestPostParams'](this.$_.dropRight(this.requestPostParams))
            }, 

            //删除GET请求参数
            deleteRequestGetParams(){

                let newRequestGetParamsArr = this.$_.dropRight(this.requestGetParams)
                if(newRequestGetParamsArr <= 0){
                    return
                }

                this['EditAggregationLayerApiDocsModule/updateRequestGetParams'](this.$_.dropRight(this.requestGetParams))
            },

            submitForm(form){

                //将参数为空的POST参数过滤掉
                var newRequestPostParams = this.requestPostParams.filter((item) => {
                    item.badrp_is_must = item.badrp_is_must == true ? 1 : 0
                    return item.badrp_name != '' && item.badrp_rule != '' && item.badrp_type != ''
                })

                //将参数为空的GET参数过滤掉
                var newRequestGetParams = this.requestGetParams.filter((item) => {
                    item.badrp_is_must = item.badrp_is_must == true ? 1 : 0
                    return item.badrp_name != '' && item.badrp_rule != '' && item.badrp_type != ''
                })

                //重新构建请求参数
                var params = this.apiForm
                params.ap_request_params = newRequestPostParams.concat(newRequestGetParams)

                this.$myLoading.startLoading()
                this.$http.postHttp(this.$API.systemApiUpdateAggregationApiDocs,params,(rs) => {
                    this.$myLoading.endLoading()
                    this.$myPop.SuccessMessage()
                    setTimeout(()=>{
                        this.$router.go(-1)
                    },1000)
                })

            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>