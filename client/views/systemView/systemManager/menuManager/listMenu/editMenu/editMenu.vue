<template>
    <div>
        <el-form :model="menuForm" :rules="rules" label-position="right" ref="menuForm" label-width="160px">
            <el-form-item label="菜单名称：" prop="m_name">
                <el-col :span="8">
                    <el-input v-model="menuForm.m_name" placeholder="请输入菜单名称"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="图标类型：" prop="m_icon_type">
                <el-col :span="8">
                    <el-radio v-model="menuForm.m_icon_type" label="0">字体图标</el-radio>
                    <el-radio v-model="menuForm.m_icon_type" label="1" disabled >图片</el-radio>
                </el-col>
            </el-form-item>
            <el-form-item label="菜单图标：" prop="m_icon">
                <el-col :span="8">
                    <el-button @click="selectFontIconBox">请选择菜单的图标</el-button>
                    <i style="margin-left:10px" class="fa fa-lg" :class="['fa-'+menuForm.m_icon]"></i>
                </el-col>
            </el-form-item>
            <el-form-item label="是否显示：" prop="m_is_show">
                <el-switch v-model="menuForm.m_is_show"></el-switch><i class="el-icon-info more_info_icon"> 说明：是否在菜单栏显示。若为高级菜单不现实，则所属所有菜单都不显示</i>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('menuForm')">提交</el-button>
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
                    name: [
                        { required: true, message: '请输入菜单名称', trigger: 'blur' }
                    ],
                    iconType: [
                        { required: true, message: '请选择菜单的图标类型', trigger: 'change' }
                    ],
                    iconName: [
                        { required: true, message: '请选择菜单的图标', trigger: 'change' }
                    ]
                },
            }
        },
        //初始化函数
        mounted() {

            //获取菜单列表信息
            this.$myLoading.startLoading()
            this.$http.getHttp(this.$API.menuSearch + "/m_id/" + this.$route.query.m_id, rs => {
                this.$myLoading.endLoading()
                this['EditMenuModule/updateMenuForm'](rs.data[0])
            });

        },
        //计算属性
        computed: {
            ...mapState({ 
                menuForm : state => state.EditMenuModule.menuForm,
            })
        },
        //组件方法
        methods: {
            ...mapMutations(['updateMenuForm', 'EditMenuModule/updateMenuForm']),

            selectFontIconBox(){
                var that = this
                //回调函数
                this.$selectFontIcon({
                    selectFontValue(item){
                        that.$store.commit('EditMenuModule/updateMenuFormIconName',item.name)
                    }
                })
            },

            //提交信息
            submitForm(menuForm) {

                //菜单添加
                this.$refs[menuForm].validate((valid) => {

                    if (valid) {
                        //添加信息
                        var params = {
                            update_where : "m_id",
                            m_id : this.$route.query.m_id,
                            m_name : this.menuForm.m_name,
                            m_icon_type : this.menuForm.m_icon_type,
                            m_icon : this.menuForm.m_icon,
                            m_is_show : this.menuForm.m_is_show == true ? 1 : 0
                        }

                        this.$myLoading.startLoading()
                        this.$http.postHttp(this.$API.menuUpdate,params,(rs) => {
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