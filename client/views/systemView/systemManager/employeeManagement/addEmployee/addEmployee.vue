<template>
    <div>
           
            <el-form :model="employeeForm" :rules="rules" label-position="right" ref="employeeForm" label-width="160px">  
                <el-form-item label="用户帐号：" prop="u_username">
                    <el-col :span="8">
                        <el-input v-model="employeeForm.u_username" placeholder="请输入用户帐号"></el-input>
                    </el-col>
                </el-form-item>

                <el-form-item label="用户密码：" prop="u_password">
                    <el-col :span="8">
                        <el-input type="password" v-model="employeeForm.u_password" placeholder="请输入用户密码"></el-input>
                        <span style="color:#999">( 默认密码为：123456 )</span>
                        
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
                    <el-button @click="resetForm()">重置</el-button>
                </el-form-item>
            </el-form>
    </div>
</template>

<script>
    import { mapState,mapMutations } from 'vuex'
    export default {
        //数据源
        data() {
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
                    u_email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur'},
                    ]
                }
            }
        },
        computed: {
            ...mapState({
                employeeForm : state => state.AddEmployeeModule.employeeForm,
            })
        },
        mounted(){
        	
        	this.employeeForm.u_hiredate = this.$common.dateFormat("YYYY-MM-dd",this.$common.currentTime());

        },
        methods: {
            ...mapMutations(['clearForm', 'AddEmployeeModule/clearForm']),

            //提交信息
            submitForm(employeeForm) {
                
                this.$refs[employeeForm].validate((valid) => {
                    if (valid) {
                        //添加信息
                        var params = {
                            "u_username"       	: this.employeeForm.u_username,    //用户帐号
                            "u_password"       	: this.employeeForm.u_password,    //用户密码
                            "u_nickname"       	: this.employeeForm.u_nickname,    //用户昵称
                            "u_phone"          	: this.employeeForm.u_phone,    //绑定的手机号码
                            "u_email"          	: this.employeeForm.u_email,    //绑定的邮箱地址
                            "u_is_activation"	: this.employeeForm.u_is_activation ? 1 : 0,    //是否激活 0-否 1-是
                            "u_create_time"   	: this.$common.currentTime(),    //创建时间
					        "u_status"			: this.employeeForm.u_status,    //状态
					        "u_sex"				: this.employeeForm.u_sex,    //性别
					        "u_position"		: this.employeeForm.u_position,    //职务
					        "u_desc"    		: this.employeeForm.u_desc,    //描述
					        "u_salary"  		: this.employeeForm.u_salary,    //工资
					        "u_hiredate"    	: (new Date(this.employeeForm.u_hiredate))/1000 ,    //入职时间
                            
                        }

                        this.$myLoading.startLoading()
                        this.$http.postHttp(this.$API.userAdd,params,(rs) => {
                            this.$myLoading.endLoading()
                            this.$myPop.SuccessMessage()
                            this.resetForm()
                        })
                    } else {
                        return false;
                    }
                });
            },
            //重置信息
            resetForm() {
                this['AddEmployeeModule/clearForm']()
            },
        }
    }
</script>

<style lang="stylus" scoped>

</style>