<template>
    <div class="userInfo">
        <div class="header">用户信息</div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" style="width:500px" class="demo-dynamic">
            <el-form-item label="头像" prop="">
                <el-upload
                    class="avatar-uploader"
                    :headers="myHeaders"
                    :action="$global.httpServer + $API.fileUploadImage"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="isImagePath" :src="ruleForm.imagePath" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="账号信息" prop="account">
                <el-input v-model="ruleForm.account" disabled></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="ruleForm.password"></el-input>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="submitForm()">提交修改</el-button>
                <el-button @click="goToTop()">退出</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import LocalData from '../../../localData/userData'
export default {
    data(){
        return{
            imageUrl: '',
            ruleForm: {
                account: '',
                password: '',
                imagePath:'',
            },
            rules: {
                account: [
                    { required: true }
                ],
                password: [
                    { required: true, message: '请输入正确的密码', trigger: 'change' }
                ],
            },
            myHeaders:{token:LocalData.userToken()},
            isImagePath:false
        }
    },
    mounted(){
      this.initData()
    },

    methods: {
        //获取用户信息
        initData(){
            this.ruleForm = JSON.parse(sessionStorage.getItem("userInfo"))
            if(this.ruleForm.imagePath){
                this.ruleForm.imagePath = this.$global.httpServerImg + this.ruleForm.imagePath.split(":")[1] + "?time="+new Date().getTime()*1000/1000
                this.isImagePath = true
            }
            
        },
        handleAvatarSuccess(res, file) {

            this.$http.getHttp(this.$API.userDetail+"?id="+this.ruleForm.id,(rs)=>{
                if(rs.code == 0){
                    sessionStorage.setItem("userInfo",JSON.stringify(rs.data))
                    this.$store.commit('HomeModule/UPDATA_USER_INFO',rs.data)
                    this.ruleForm.imagePath =  this.$global.httpServerImg + rs.data.imagePath.split(":")[1] + "?time="+new Date().getTime()*1000/1000
                    this.isImagePath = true
                }else{
                    this.$notify({
                        title: rs.msg,
                        message: '',
                        type: 'warning'
                    });
                }
                
            })
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type == 'image/jpeg' || file.type == 'image/png';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$notify({
                        title: '上传头像图片只能是 JPG/PNG 格式!',
                        message: '',
                        type: 'warning'
                    });
            }
            if (!isLt2M) {
                this.$notify({
                        title: '上传头像图片大小不能超过 2MB!',
                        message: '',
                        type: 'warning'
                    });
            }
            return isJPG && isLt2M;
        },
        submitForm(){

            if(this.ruleForm.password.length <= 0){
                this.$myPop.WarningMessage("用户密码不能为空");
                return;
            }

            if(this.ruleForm.imagePath.length <= 0){
                this.$myPop.WarningMessage("用户头像不能为空");
                return;
            }
            
            this.$myLoading.startLoading()
            let params = {
                id:this.ruleForm.id,
                account:this.ruleForm.account,
                password:this.ruleForm.password,
            }
            this.$http.postHttp(this.$API.userUpdate,params,(data)=>{
                sessionStorage.setItem("userInfo",JSON.stringify(this.ruleForm))
                this.$notify({
                    title: '修改成功',
                    message: '',
                    type: 'success'
                });
                this.$myLoading.endLoading()
            })
        },
        goToTop(){
            this.$myPop.confirmBox("确认操作", "确定要退出系统吗？", () => {
                this.$myLoading.startLoading()

                this.$http.postHttp(this.$API.userLogOut,{},(data)=>{
                    //清除本地所有数据，并退出到登录界面
                    sessionStorage.clear();
                    this.$myLoading.endLoading();
                    //刷新当页
                    this.$router.push({
                    path: "/"
                    });
                })
                
            });
        }
    }
}
</script>
<style lang="stylus" scoped>
.userInfo{
    .header{
        margin-top 30px
        font-size 18px
        font-weight bold
        margin-bottom 30px
        padding-left 10px
    }    
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    background #eeeeee
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>