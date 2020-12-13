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
                    or_name: [
                        { required: true, message: '请输入角色名称', trigger: 'blur' }
                    ]
                }
            }
        },
        //初始化函数
        mounted() {

            //获取角色列表信息
            this.$myLoading.startLoading()
            this.$http.getHttp(this.$API.organizationalRoleSearch + "/or_id/" + this.$route.query.or_id, rs => {
                this.$myLoading.endLoading()
                this['EditRoleModule/updateRoleData'](rs.data[0])
            });

        },
        //计算属性
        computed: {
            ...mapState({
                roleForm : state => state.EditRoleModule.roleForm,
            })
        },
        //组件方法
        methods: {
            ...mapMutations(['updateRoleData', 'EditRoleModule/updateRoleData']),

            //提交信息
            submitForm(form) {

                this.$refs[form].validate((valid) => {

                    if (valid) {

                        //参数信息
                        var params = {
                            update_where : "or_id",
                            or_id : this.$route.query.or_id,
                            or_name : this.roleForm.or_name
                        }

                        this.$myLoading.startLoading()
                        this.$http.postHttp(this.$API.organizationalRoleUpdate,params,(rs) => {
                            this.$myLoading.endLoading()
                            this.$myPop.SuccessMessage()
                            setTimeout(()=>{
                                this.$router.go(-1)
                            },1000)
                        })
                    } else {
                        return false;
                    }
                });
            },
        }
    }
</script>

<style lang="stylus" scoped>

</style>