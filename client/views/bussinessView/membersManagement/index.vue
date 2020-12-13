<template>
    <div class="realTimeData">
        <div class="content">
            <div class="header">
                <div>
                    <el-input placeholder="请输入名称" v-model="filterText" size="small" suffix-icon="el-icon-search"></el-input>
                    <el-button @click="initDatas()" size="small" type="primary" style="margin-left:20px">搜索</el-button>
                </div>
                <div>
                    <i class="el el-icon-circle-plus-outline" title="添加成员" @click="operati(1)" v-if="ifShow(0)"></i>
                </div>
            </div>
            <div class="figure">
                <el-table :data="tableData" class="tableData" style="width:100%" height="100%" :stripe="true">
                    <el-table-column prop="id" label="序号"></el-table-column>
                    <el-table-column prop="account" label="账户"></el-table-column>
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column prop="roleName" label="角色"></el-table-column>
                    <el-table-column prop="phone" label="联系方式"></el-table-column>
                    <el-table-column prop="comment" label="备注"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button @click="operati(2,scope.row)" type="text" size="small" v-if="ifShow(2)">编辑</el-button>
                            <el-button @click="operati(3,scope.row)" type="text" size="small" v-if="ifShow(1)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination
                background
                :current-page="pageNum"
                :page-size="$global.pageLimit"
                @current-change="handleCurrentChange"
                layout="prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
        <!-- 添加角色 -->
        <div class="mask" v-if="isAddInfo">
            <div class="margin">
                <i class="el el-icon-circle-close close" @click="isAddInfo = false"></i>
                <div class="header">{{newTitle}}</div>
                <div class="from">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="账户名称" prop="account">
                            <el-input v-model="ruleForm.account" :disabled="newTitle == '编辑用户信息'"></el-input>
                        </el-form-item>
                        <el-form-item label="密   码" prop="password">
                            <el-input v-model="ruleForm.password" type="password"></el-input>
                        </el-form-item>
                        <el-form-item label="姓   名" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="选择角色" prop="roleId">
                            <el-select v-model="ruleForm.roleId" placeholder="请选择角色">
                                <el-option :label="item.name" :value="item.id" v-for="(item,index) in roleData" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="联系电话" prop="phone">
                            <el-input v-model="ruleForm.phone"></el-input>
                        </el-form-item>
                         <el-form-item label="备注" prop="comment">
                            <el-input type="textarea" v-model="ruleForm.comment"></el-input>
                        </el-form-item>
                        
                        <el-form-item class="button">
                            <!-- 新增 -->
                            <el-button v-if="newTitle == '添加用户'" type="primary" @click="submitForm('ruleForm')">确认</el-button>
                            <!-- 修改 -->
                            <el-button v-else type="primary" @click="updataForm('ruleForm')">确认</el-button>
                            <el-button @click="isAddInfo = false">取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {
      return {
          total:0,
          pageNum:1,


        isAddInfo:false,
        filterText: '',
        isCanOperate:false,
        newTitle:'',
        newDataInfo:[],
        roleData:[],
        tableData: [],
        ruleForm: {
            account: '',
            password: '',
            name:'',
            roleId:'',
            phone:'',
            comment: '',
        },
        rules: {
            account: [
                { required: true, message: '请输入账号', trigger: 'blur' },
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' },
            ],
            name: [
                { required: true, message: '请输入姓名', trigger: 'blur' },
            ],
            roleId: [
                { required: true},
            ],
        },
      };
    },
    computed: {
        ...mapState({
            taskbars           : state => state.MenuModule.taskbars
        })
    },
    mounted(){
        this.initData()
        this.getRoleLists()
    },

    methods: {
        ifShow(index){
            return this.taskbars[3]['childMenus'][1]['childMenus'][index]['visible']
        },
        initDatas(){
            this.pageNum = 1
            this.initData()
        },
        //当前页数
        handleCurrentChange(val){
            this.pageNum = val
            this.initData()
        },
        //获取列表
        initData(){
            
            let params = {
                pageNum : this.pageNum,
                pageSize : this.$global.pageLimit,
                userName : this.filterText
            }
        
            this.$myLoading.startLoading()

            this.$http.postHttp(this.$API.userList,params,(data)=>{
                this.total = data.data.total
                this.tableData = data.data.list
                this.$myLoading.endLoading()

            })
        },
        //添加用户
       submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {

                    let params = {
                        account : this.ruleForm.account,
                        comment : this.ruleForm.comment,
                        name: this.ruleForm.name,
                        password: this.ruleForm.password,
                        phone : this.ruleForm.phone,
                        roleId : this.ruleForm.roleId,
                        state:1,
                    }
                
                    this.$myLoading.startLoading()

                    this.$http.postHttp(this.$API.userAdd,params,(data)=>{
                        this.isAddInfo = false
                        this.$notify({
                                title: '用户添加成功',
                                message: '',
                                type: 'success'
                        });
                        this.$myLoading.endLoading()
                        this.initData()
                    })

                    
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
          
        },
        //修改用户信息用户
        updataForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {

                    let params = {
                        id: this.newDataInfo.id,
                        account : this.ruleForm.account,
                        comment : this.ruleForm.comment,
                        name: this.ruleForm.name,
                        password: this.ruleForm.password,
                        phone : this.ruleForm.phone,
                        roleId : this.ruleForm.roleId,
                        state:1,
                    }
                
                    this.$myLoading.startLoading()

                    this.$http.postHttp(this.$API.userUpdate,params,(data)=>{
                        this.isAddInfo = false
                        this.$notify({
                                title: '用户添加成功',
                                message: '',
                                type: 'success'
                        });
                        this.$myLoading.endLoading()
                        this.initData()
                    })

                    
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
          
        },
        //获取角色列表
        getRoleLists(){
            var params = {
                pageNum : 1,
                pageSize : 100,
            }
            this.$http.postHttp(this.$API.roleList,params,(data)=>{
                this.roleData = data.data.list
            })
        },
        operati(type,item){
            this.ruleForm= {
                account: '',
                password: '',
                name:'',
                roleId:'',
                phone:'',
                comment: '',
            }
            if(type == 1){
                this.newTitle = "添加用户"
                this.isAddInfo = true
            }else if(type == 2){
                this.newTitle = "编辑用户信息"
                this.newDataInfo = item
                this.$http.getHttp(this.$API.userDetail+"?id="+item.id,(data)=>{
                    this.ruleForm = data.data
                    this.isAddInfo = true
                    this.$myLoading.endLoading()
                })
            }else if(type == 3){
                this.$confirm('确定删除此成员吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$myLoading.startLoading()

                    this.$http.getHttp(this.$API.userDelete+"?id="+item.id,(data)=>{
                        this.initData()
                        this.$notify({
                            title: '删除成功',
                            message: '',
                            type: 'success'
                        });
                        this.$myLoading.endLoading()
                    })
                }).catch(() => {});
                
            }
            
        },
        getInfo(){

        }
    },
}
</script>
<style lang="stylus" scoped>
.mask{
    position absolute
    width 100%
    height 100%
    margin-left -10px
    background rgba(0,0,0,0.3)
    z-index 10
    .margin{
        width 400px
        background #ffffff
        border-radius 5px
        margin 20% auto  
        padding 20px 
        position relative
        .close{
            position absolute
            top 10px
            right 10px
            font-size 25px
            color #999
        } 
        .header{
            font-size 18px
            color #333
            font-weight bold
            text-align center
            
            &.bottom{
                display flex
                justify-content center
                padding 0 20%
                margin-top 10px
                border-top 1px solid #eeeeee
                p{
                    flex 1
                    margin 10px 0
                    font-size 14px
                    height 30px
                    font-weight 400
                    border-bottom 1px solid #eeeeee
                    cursor pointer
                    &.active{
                        color rgb(50, 79, 196)
                    }
                }
            }
            
        }
        .from{
            margin-top 20px
            
        }
        .bottom{
            .tree{
                text-align center
                padding-left 100px    
            }
            .button{
                margin-top 50px 
            }   
        }
    }
}
.realTimeData{
    display flex
    height 100%
    .content{
        flex 1
        .header{
            padding 20px 20px 10px
            display flex
            align-items center
            justify-content space-between
            .el-input{
                width 240px
            } 
            div{
                display flex
                i{
                    font-size 18px
                    margin-left 20px
                    cursor pointer
                }
                
            }   
        }
        .figure{
            height 85%  
            padding 10px 20px
            .block{
                text-align center    
            }
        }
        
    }
}
.el-pagination{
    float none 
    margin 0 auto
    text-align center   
}
</style>