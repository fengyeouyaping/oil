<template>
    <div>
        <el-form :model="categoryForm" :rules="rules" label-position="right" ref="categoryForm" label-width="160px">
            <el-form-item label="分类名称：" prop="badc_name">
                <el-col :span="8">
                    <el-input v-model="categoryForm.badc_name" placeholder="请输入分类名称"></el-input>
                </el-col>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('categoryForm')">提交</el-button>
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
                    badc_name: [
                        { required: true, message: '请输入分类名称', trigger: 'blur' }
                    ],
                }
            }
        },
        //初始化函数
        mounted() {

            //获取分类信息
            this.$myLoading.startLoading()
            this.$http.getHttp(this.$API.bussinessApiDocsCategorySearch + "/badc_id/" + this.$route.query.badc_id, rs => {
                this.$myLoading.endLoading()
                this['EditAggregationApiDocsCategoryModule/updateCategoryForm'](rs.data[0])
            });

        },
        //计算属性
        computed: {
            ...mapState({ 
                categoryForm : state => state.EditAggregationApiDocsCategoryModule.categoryForm
            })
        },
        //组件方法
        methods: {
            ...mapMutations(['updateCategoryForm','EditAggregationApiDocsCategoryModule/updateCategoryForm']),

            submitForm(form){

                this.$refs[form].validate((valid) => {

                    if (valid) {

                        var params = {
                            update_where : "badc_id",
                            badc_id : this.$route.query.badc_id,
                            badc_name : this.categoryForm.badc_name
                        }

                        this.$myLoading.startLoading()
                        this.$http.postHttp(this.$API.bussinessApiDocsCategoryUpdate,params,(rs) => {
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