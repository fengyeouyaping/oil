<template>
    <div>
        <el-form :model="employeeForm" :rules="rules" label-position="right" ref="employeeForm" label-width="160px">  
                
                <el-form-item label="用户帐号：" prop="u_username">
                    <el-col :span="8">
                        <el-input disabled v-model="employeeForm.u_username" placeholder="请输入用户帐号"></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item label="用户密码：" prop="u_password">
                    <el-col :span="8">
                        <el-input v-model="employeeForm.u_password" placeholder="请输入用户密码"></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item label="用户昵称：" prop="u_nickname">
                    <el-col :span="8">
                        <el-input v-model="employeeForm.u_nickname" placeholder="请输入用户昵称"></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item label="手机号码：" prop="u_phone">
                    <el-col :span="8">
                        <el-input v-model="employeeForm.u_phone" placeholder="请输入手机号码"></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item label="邮箱地址：" prop="u_email">
                    <el-col :span="8">
                        <el-input v-model="employeeForm.u_email" placeholder="请输入邮箱地址"></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item label="是否激活：" prop="u_is_activation">
                    <el-switch
                            v-model="employeeForm.u_is_activation"
                            active-color="#13ce66"
                            inactive-color="#ccc">
                    </el-switch>
                </el-form-item>

	            <el-form-item label="状态：" prop="u_status">
	                <el-col :span="15">
	                    <el-radio v-model="employeeForm.u_status" label="0" >在职</el-radio>
	                    <el-radio v-model="employeeForm.u_status" label="1" >离职</el-radio>
	                </el-col>
	            </el-form-item>

	            <el-form-item label="性别：" prop="u_sex">
	                <el-col :span="15">
	                    <el-radio v-model="employeeForm.u_sex" label="0" >男</el-radio>
	                    <el-radio v-model="employeeForm.u_sex" label="1" >女</el-radio>
	                </el-col>
	            </el-form-item>

                <el-form-item label="职务：" prop="u_position">
                    <el-col :span="8">
                        <el-input v-model="employeeForm.u_position" placeholder="请输入职务"></el-input>
                    </el-col>
                </el-form-item>
                

                <el-form-item label="描述：" prop="u_desc">
                    <el-col :span="8">
                        <el-input v-model="employeeForm.u_desc" placeholder="请输入描述"></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item label="工资：" prop="u_salary">
                    <el-col :span="8">
                        <el-input v-model="employeeForm.u_salary" placeholder="请输入工资"></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item label="入职时间：" prop="u_hiredate">
                    <el-col :span="8">
					    <el-date-picker
					      v-model="employeeForm.u_hiredate"
					      type="date"
					      placeholder="选择入职日期">
					    </el-date-picker>
                    </el-col>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('employeeForm')">提交</el-button>
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
                //进行必填的验证
                rules: {
                    u_username: [
                        { required: true, message: '请输入用户帐号', trigger: 'blur' }
                    ],
                    u_password: [
                        { required: true, message: '请输入用户密码', trigger: 'blur' }
                    ],
                    u_nickname: [
                        { required: true, message: '请输入用户昵称', trigger: 'blur' }
                    ],
                    u_phone: [
                        { required: true, message: '请输入手机号码', trigger: 'blur'},
                    ],
                    u_is_activation: [
                        { required: true, message: '是否激活', trigger: 'change'},
                    ],
                    u_status: [
                        { required: true, message: '请选择状态', trigger: 'change'},
                    ],
                    u_sex: [
                        { required: true, message: '请选择性别', trigger: 'change'},
                    ],
                    u_hiredate: [
                        { required: true, message: '请选择入职时间', trigger: 'blur'},
                    ],
                    u_email: [
                        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { message: '请输入正确的邮箱地址',type: 'email' }
                    ]
                }
            }
        },
        //初始化函数
        mounted() {

            //获取当前用户信息
            this.$myLoading.startLoading()
            this.$http.getHttp(this.$API.userSearch + "/u_id/" + this.$route.query.u_id, rs => {
                this.$myLoading.endLoading()
                this['EditEmployeeModule/updateEmployeeForm'](rs.data[0])
                this.employeeForm.u_hiredate = this.$common.dateFormat("YYYY-MM-dd",this.employeeForm.u_hiredate);
            });

        },
        //计算属性
        computed: {
            ...mapState({ 
                employeeForm : state => state.EditEmployeeModule.employeeForm
            })
        },
        //组件方法
        methods: {
            ...mapMutations(['updateEmployeeForm','EditEmployeeModule/updateEmployeeForm']),

            //提交信息
            submitForm(form) {

                //菜单添加
                this.$refs[form].validate((valid) => {

                    if (valid) {

                        //添加信息
                        var params = {
                            update_where    : "u_id",
                            u_id            : this.$route.query.u_id,
                            u_password      : this.employeeForm.u_password,
                            u_nickname      : this.employeeForm.u_nickname,
                            u_phone         : this.employeeForm.u_phone,
                            u_email         : this.employeeForm.u_email,
                            u_status         : this.employeeForm.u_status,
                            u_sex         : this.employeeForm.u_sex,
                            u_position         : this.employeeForm.u_position,
                            u_desc         : this.employeeForm.u_desc,
                            u_salary         : this.employeeForm.u_salary,
                            u_hiredate         : (new Date(this.employeeForm.u_hiredate))/1000,
                            u_is_activation : this.employeeForm.u_is_activation == true ? 1 : 0
                        }
                        
                        this.$myLoading.startLoading()
                        this.$http.postHttp(this.$API.userUpdate,params,(rs) => {
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
            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>