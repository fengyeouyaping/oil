<template>
    <div>
        <el-form :model="menuForm" :rules="rules" label-position="right" ref="menuForm" label-width="160px">
            <el-form-item label="菜单名称：" prop="name">
                <el-col :span="8">
                    <el-input v-model="menuForm.name" placeholder="请输入菜单名称"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="菜单地址：" prop="address">
                <el-col :span="8">
                    <el-input v-model="menuForm.address" placeholder="请输入菜单地址"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="菜单级别：" prop="level">
                <el-col :span="15">
                    <el-radio v-model="menuForm.level" label="0" @change="parentMenuChanges">一级菜单</el-radio>
                    <el-radio v-model="menuForm.level" label="1" @change="parentMenuChanges">二级菜单</el-radio>
                    <el-radio v-model="menuForm.level" label="2" @change="parentMenuChanges">三级菜单</el-radio>
                    <el-radio v-model="menuForm.level" label="3" @change="parentMenuChanges">子级菜单</el-radio>
                </el-col>
            </el-form-item>
            <el-form-item label="父菜单：" prop="father" v-show="menuForm.level != 0">
                <el-col :span="8">
                    <el-cascader
                            placeholder="选择父菜单"
                            v-model="menuForm.father"
                            :options="temporaryFatherData"
                            :props="props">
                    </el-cascader>
                </el-col>
            </el-form-item>
            <el-form-item label="菜单类别：" prop="m_type">
                <el-col :span="15">
                    <el-radio v-model="menuForm.m_type" label="0">系统功能菜单</el-radio>
                    <el-radio v-model="menuForm.m_type" label="2">业务功能菜单</el-radio>
                </el-col>
            </el-form-item>
            <el-form-item label="图标类型：" prop="iconType" v-show="menuForm.level != 2">
                <el-col :span="8">
                    <el-radio v-model="menuForm.iconType" label="0">字体图标</el-radio>
                    <el-radio v-model="menuForm.iconType" label="1" disabled >图片</el-radio>
                </el-col>
            </el-form-item>
            <el-form-item label="菜单图标：" prop="iconName" v-show="menuForm.level != 2">
                <el-col :span="8">
                    <el-button @click="selectFontIconBox">请选择菜单的图标</el-button>
                    <i style="margin-left:10px" class="fa fa-lg" :class="['fa-'+menuForm.iconName]"></i>

                </el-col>
            </el-form-item>
            <el-form-item label="是否显示：" prop="m_is_show">
                <el-switch v-model="menuForm.m_is_show"></el-switch><i class="el-icon-info more_info_icon"> 说明：是否在菜单栏显示。若为高级菜单不现实，则所属所有菜单都不显示</i>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('menuForm')">提交</el-button>
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
                    name: [
                        { required: true, message: '请输入菜单名称', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '请输入菜单地址', trigger: 'blur' }
                    ],
                    iconType: [
                        { required: true, message: '请选择菜单的图标类型', trigger: 'change' }
                    ],
                    iconName: [
                        { required: true, message: '请选择菜单的图标', trigger: 'change' }
                    ],
                    level: [
                        { required: true, message: '请选择菜单级别', trigger: 'change' }
                    ],
                },
                props: {
                    value: 'valueLabel'
                }
            }
        },
        computed: {
            ...mapState({
                menuForm                    : state => state.AddMenuModule.menuForm,
                temporaryFatherData         : state => state.AddMenuModule.temporaryFatherData,
                fontIco                     : state => state.FontIconModule.fontIcon
            })
        },
        mounted(){

            //获取菜单列表信息
            this.$myLoading.startLoading()
            this.$http.getHttp(this.$API.menuSearch + "/skip/0/limit/1000", rs => {
                this.$myLoading.endLoading()
                this['AddMenuModule/updateTemporaryFatherData'](this.$common.arrayReorganization(rs.data))
            });

        },
        methods: {
            ...mapMutations(['clearForm', 'AddMenuModule/clearForm']),
            ...mapMutations(['updateTemporaryFatherData', 'AddMenuModule/updateTemporaryFatherData']),
            
            //调用字体库
            selectFontIconBox(){
                var that = this
                //回调函数
                this.$selectFontIcon({
                    selectFontValue(item){
                        that.$store.commit('AddMenuModule/updateMenuFormIconName',item.name)
                    }
                })
            },
            //提交信息
            submitForm(menuForm) {

                if(!this.$isDev){
                    this.$myPop.alertBox("抱歉，该菜单只能在开发模式下使用");
                    return
                }

                //拼接全路径
                var menuFormFather = []
                var front_route_url = []
                var m_route_url = 0

                for(var i=0;i<this.menuForm.father.length;i++){

                    var arr = this.menuForm.father[i].split(",")

                    menuFormFather.push(arr[0])

                    front_route_url.push(arr[1])

                }

                if(this.menuForm.level == 2 || this.menuForm.level == 3){
                    this.menuForm.iconName = "no"
                    m_route_url = front_route_url.join("/") + "/" + this.menuForm.address + "/" + this.menuForm.address + ".vue"

                }
                this.menuForm.father = menuFormFather

                

                //菜单添加
                this.$refs[menuForm].validate((valid) => {
                    if (valid) {
                        //添加信息
                        var params = {
                            "m_name":this.menuForm.name,      //菜单名称
                            "m_url":this.menuForm.address,       //菜单地址
                            "m_icon_type":this.menuForm.iconType,  // 菜单的图标类型 0-字体图标 1-图片
                            "m_icon":this.menuForm.iconName,      //菜单图标
                            "m_level":this.menuForm.level,     //菜单级别
                            "m_type":this.menuForm.m_type,     //菜单类型
                            "m_fid":this.menuForm.father[this.menuForm.father.length - 1] ? this.menuForm.father[this.menuForm.father.length - 1] : 0,       //父菜单ID 0-一级菜单
                            "m_path":this.menuForm.father[this.menuForm.father.length - 1] ? "0," + this.menuForm.father.join(',')+"," : "0, ",      //菜单路径
                            "m_route_url":m_route_url,      //菜单全路径
                            "m_is_show":this.menuForm.m_is_show == true ? 1 : 0,      //是否在左侧菜单栏显示
                        }
                        
                        this.$myLoading.startLoading()

                        this.$http.postHttp(this.$API.menuAdd,params,(rs) => {

                            this.$http.getHttp(this.$API.menuSearch + "/skip/0/limit/1000",(rs) => {
                    
                                this.$myLoading.endLoading()

                                //把数据存储到本地
                                sessionStorage.setItem("totalMenuBar", JSON.stringify(rs.data));
                                //在本地创建相应的文件加以及文件
                                var menuPath = this.$common.newlyBuild(params,this.temporaryFatherData)
                                //创建本地目录
                                this.$http.systemApiPostHttp("/createMenuDir",{"menuPath":menuPath,"level":this.menuForm.level},(rs) => {})
                                //更新父级下拉的数据
                                this.$store.commit('AddMenuModule/getFatherMenu',this)
                                //更新左侧菜单的信息
                                this.$store.commit('MenuModule/updateTaskbars',this.$common.arrayReorganization(rs.data))
                                this.$myPop.SuccessMessage()    
                                //重置数据
                                this.resetForm()
                            

                            })

                        })
                    } else {
                        return false;
                    }
                });
            },
            //重置信息
            resetForm() {
                this['AddMenuModule/clearForm']()
            },
            //开启三级联动 选择父级菜单
            parentMenuChanges(){

                this.$store.commit('AddMenuModule/fatherMenu',this)

            },
            //关闭字体库弹框
            closeFontIcon(vl){
               this.show = !this.show
            }
        }
    };
</script>

<style lang="stylus" scoped>

    .fontIconMaskBox {
        position fixed
        background rgba(0,0,0,0.5)
        left 0
        top 0
        bottom 0
        right 0
        z-index 99999999

        .fontIconMainBox {
            position relative
            left 50%
            width 820px
            border 1px solid #ebeef5
            box-shadow 0 2px 12px 0 rgba(0,0,0,.1)
            height 80%
            border-radius 4px
            background #fff 
            margin-left -400px
            margin-top 5%
            z-index 999
        }

        .fontIconHeaderBox {
            width 100%
            height 50px   
            font-size 18px
            line-height 50px
            text-indent 15px

            i {
                float right
                margin-top 15px
                margin-right 15px
            }
        }

        .fontIconContentBox {
            width 100%
            position absolute
            top 50px
            left 0px
            bottom 0px
            right 0px  
            overflow auto
        }

        .fontIconTitleBox {
            height 40px
            line-height 40px   
            text-indent 15px
            font-size 14px
        }

        .fontIconItemBox {
            width 100%
            height auto 
            display flex
            flex-wrap wrap
            justify-content flex-start

            .fontIconItem {
                width 50px
                height 50px
                text-align center
                line-height 40px
            }

        }
    }
</style>
