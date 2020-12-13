<template>
    <div>
        <el-form :model="roleForm" :rules="rules" label-position="right" ref="roleForm" label-width="160px">
            <el-form-item label="角色名称：" prop="or_name">
                <el-col :span="8">
                    <el-input v-model="roleForm.or_name" placeholder="请输入菜单名称"></el-input>
                </el-col>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('roleForm')">提交</el-button>
                <el-button @click="resetForm()">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    import { mapState,mapMutations } from 'vuex'

    export default {
        data() {
            return {
                show:false,
                //进行必填的验证
                rules: {
                    or_name: [
                        { required: true, message: '请输入角色名称', trigger: 'blur' }
                    ]
                }
            }
        },
        computed: {
            ...mapState({
                roleForm : state => state.AddRoleModule.roleForm,
            })
        },
        mounted(){

           this.resetForm();

        },
        methods: {
            ...mapMutations(['clearForm', 'AddRoleModule/clearForm']),
            ...mapMutations(['updateRoleData', 'AddRoleModule/updateRoleData']),

            //提交信息
            submitForm(form) {

                this.$refs[form].validate((valid) => {

                    if (valid) {

                        //参数信息
                        var params = {}
                        params.or_name = this.roleForm.or_name  //角色名称

                        //请求地址
                        var actionUrl = this.$API.organizationalRoleAdd

                        this.$myLoading.startLoading()
                        this.$http.postHttp(actionUrl,params,(rs) => {
                            this.$myLoading.endLoading()
                            this.$myPop.SuccessMessage()
                            this.resetForm();
                        })
                    } else {
                        return false;
                    }
                });
            },
            //重置信息
            resetForm() {
                this['AddRoleModule/clearForm']()
            },
        }
    };
</script>

<style lang="stylus" scoped>

</style>
