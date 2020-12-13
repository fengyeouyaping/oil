<template>
    <div>
        <el-form :model="serverForm" :rules="rules" label-position="right" ref="serverForm" label-width="160px">
            
            <el-form-item label="聚合层服务器编号：" prop="as_no">
                <el-col :span="8">
                    <el-input v-model="serverForm.as_no" placeholder="请输入聚合层服务器编号"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="聚合层服务器名称：" prop="as_name">
                <el-col :span="8">
                    <el-input v-model="serverForm.as_name" placeholder="请输入聚合层服务器名称"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="聚合层服务器IP：" prop="as_ip">
                <el-col :span="8">
                    <el-input v-model="serverForm.as_ip" placeholder="请输入聚合层服务器IP"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="聚合层服务器端口：" prop="as_port">
                <el-col :span="8">
                    <el-input v-model="serverForm.as_port" placeholder="请输入聚合层服务器端口"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="服务项目目录：" prop="as_project_path">
                <el-col :span="8">
                    <el-input v-model="serverForm.as_project_path" placeholder="请输入服务项目目录"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="是否打开：" prop="as_is_open">
                <el-switch v-model="serverForm.as_is_open"></el-switch>
            </el-form-item>
            <el-form-item label="是否显示：" prop="as_is_show">
                <el-switch v-model="serverForm.as_is_show"></el-switch>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('serverForm')">提交</el-button>
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
                    as_no: [
                        { required: true, message: '请输入聚合层服务器编号', trigger: 'blur' }
                    ],  
                    as_name: [
                        { required: true, message: '请输入聚合层服务器名称', trigger: 'blur' }
                    ],
                    as_ip: [
                        { required: true, message: '请输入聚合层服务器IP', trigger: 'blur' }
                    ],
                    as_port: [
                        { required: true, message: '请输入聚合层服务器端口', trigger: 'blur' }
                    ],
                    as_project_path: [
                        { required: true, message: '请输入服务项目目录', trigger: 'blur' }
                    ]

                }
            }
        },
        computed: {
            ...mapState({
                serverForm : state => state.AddAggregationServerModule.serverForm,
            })
        },
        mounted(){

           this.resetForm();

        },
        methods: {
            ...mapMutations(['clearForm', 'AddAggregationServerModule/clearForm']),

            //提交信息
            submitForm(form) {

                this.$refs[form].validate((valid) => {

                    if (valid) {

                      var params = {

                        as_name    : this.serverForm.as_name,
                        as_no      : this.serverForm.as_no,
                        as_is_open : this.serverForm.as_is_open == true ? "1" : "0",
                        as_ip      : this.serverForm.as_ip,
                        as_port    : this.serverForm.as_port,
                        as_project_path : this.serverForm.as_project_path,
                        as_is_show : this.serverForm.as_is_show == true ? "1" : "0"

                      }

                      this.$myLoading.startLoading()
                      this.$http.postHttp(this.$API.sysAggregationServerAdd,params,(rs) => {

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
                this['AddAggregationServerModule/clearForm']()
            },
        }
    };
</script>

<style lang="stylus" scoped>

</style>
