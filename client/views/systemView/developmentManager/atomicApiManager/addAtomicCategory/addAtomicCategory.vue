<template>
    <div>
        <el-form :model="categoryForm" :rules="rules" label-position="right" ref="categoryForm" label-width="160px">
            <el-form-item label="分类名称：" prop="name">
                <el-col :span="8">
                    <el-input v-model="categoryForm.name" placeholder="请输入分类名称"></el-input>
                </el-col>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('categoryForm')">提交</el-button>
                <el-button @click="resetForm()">重置</el-button>
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
                rules : {
                    name: [
                        { required: true, message: '请输入分类名称', trigger: 'blur' }
                    ],
                }
            }
        },
        //初始化函数
        mounted() {

        },
        //计算属性
        computed: {
            ...mapState({
                categoryForm : state => state.AddAtomicCategoryModule.categoryForm,
            })
        },
        //组件方法
        methods: {
            ...mapMutations(['clearForm','AddAtomicCategoryModule/clearForm']),
            
            //提交信息
            submitForm(form) {

                this.$refs[form].validate((valid) => {

                    if (valid) {

                        var params = {
                            apc_name : this.categoryForm.name
                        }

                        this.$myLoading.startLoading()
                        this.$http.postHttp(this.$API.menuActionPermissionsCategoryAdd,params,(rs) => {
                            this.$myLoading.endLoading()
                            this.$myPop.SuccessMessage()
                            this['AddAtomicCategoryModule/clearForm']()
                        })

                    }

                })

            }
        }
    }
</script>

<style lang="stylus" scoped>

</style>