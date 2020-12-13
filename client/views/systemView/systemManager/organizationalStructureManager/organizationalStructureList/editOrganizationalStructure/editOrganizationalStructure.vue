<template>
    <div>
       <el-form :model="ruleForm" :rules="rules" label-position="left" ref="ruleForm" label-width="160px">
       <el-form-item label="节点名称：" prop="os_name">
          <el-col :span="8">
            <el-input v-model="ruleForm.os_name" placeholder="请输入节点名称"></el-input>
          </el-col>
       </el-form-item>
       <el-form-item label="是否继承上级权限" prop="os_is_inherit">
          <el-switch v-model="ruleForm.os_is_inherit"></el-switch>
       </el-form-item>
       <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
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
                    os_name: [
                        { required: true, message: '请输入节点名称', trigger: 'blur' }
                    ]
                }
            }
        },
        //初始化函数
        mounted() {

            //获取参数信息
            var os_id = this.$route.query.os_id 

            //获取节点信息
            this.$myLoading.startLoading()
            this.$http.getHttp(this.$API.organizationalStructureSearch + "/os_id/" + os_id, rs => {
                this.$myLoading.endLoading()
                this['EditOrganizationStructureModule/updateRuleForm'](rs.data[0])
            });

        },
        //计算属性
        computed: {
            ...mapState({
                ruleForm  : state => state.EditOrganizationStructureModule.ruleForm,
             })
        },
        //组件方法
        methods: {
            ...mapMutations(['updateRuleForm','EditOrganizationStructureModule/updateRuleForm']),

            submitForm(form){

                this.$refs[form].validate((valid) => {

                    if (valid) {

                        //参数信息
                        var params = {
                            update_where : "os_id",
                            os_id : this.$route.query.os_id,
                            os_name : this.ruleForm.os_name,
                            os_is_inherit : this.ruleForm.os_is_inherit == true ? 1 : 0
                        }

                        this.$myLoading.startLoading()
                        this.$http.postHttp(this.$API.organizationalStructureUpdate,params,(rs) => {
                            this.$myLoading.endLoading()

                            this.$myPop.SuccessMessage()
                            setTimeout(()=>{
                                this.$router.go(-1)
                            },1000)
                           
                        })
                    }

                })

            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>