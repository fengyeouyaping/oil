<template>
    <div class="loginBox" v-if="isShowLogin">
      <img class="loginImgBg" src="~BUSSINESS_IMAGE/images/login_bg.png" />
      <!-- 正常登录 -->
      <el-form ref="ruleForm" :model="ruleForm" label-width="65px" label-position="left" :rules="rules" v-if="isNoPassword">
        <div class="loginContent">
          <div class="loginTitleBox"><span>欢迎使用</span><span class="last">大数据监测系统</span><p>登录/Log In</p></div>
          
          <el-form-item label="账号：" prop="username">
            <el-input
              placeholder="请输入您的帐号"
              suffix-icon="fa fa-user-circle fa-lg"
              v-model="ruleForm.username"
              @keydown.enter.native="onSubmit('ruleForm')"
              >
            </el-input>
          </el-form-item>

          <el-form-item label="密码：" prop="password">
            <el-input
              placeholder="请输入您的密码"
              suffix-icon="fa fa-unlock-alt fa-lg"
              type="password"
              v-model="ruleForm.password"
              @keydown.enter.native="onSubmit('ruleForm')"
              >
            </el-input>
          </el-form-item>

          <div class="formItemBox">
              <el-button type="primary" style="width:100%" @click="onSubmit('ruleForm')">立即登录</el-button>
          </div>
          <!-- <div class="formItemBox bottom">
              <div>
                <el-checkbox v-model="ishiveInfo">记住密码</el-checkbox>
              </div>
              <div>
                <el-link type="primary" @click="isNoPassword = false">忘记密码?</el-link>
              </div>
          </div> -->
        </div>
       
      </el-form>
      <!-- 忘记密码 -->
      <el-form ref="newRuleForm" :model="newRuleForm" label-width="65px" label-position="left" :rules="newrules" v-else>
        <div class="loginContent">
          <div class="loginTitleBox"><span class="last">找回密码</span></div>
          
          <el-form-item label="账号：" prop="wusername">
            <el-input
              placeholder="请输入您的帐号"
              suffix-icon="fa fa-user-circle fa-lg"
              v-model="newRuleForm.wusername"
              @keydown.enter.native="onSubmit('newRuleForm')"
              >
            </el-input>
          </el-form-item>

          <el-form-item label="验证码:" prop="code">
            <el-input
              placeholder="请输入验证码"
              v-model="newRuleForm.code"
              @keydown.enter.native="onSubmit('newRuleForm')"
              >
            </el-input>
            <span class="code" v-if="isSendCode === 0" @click="sendCode()"><i class="el el-icon-loading loading"></i></span>
            <span class="code" v-else @click="sendCode()">{{isSendCode === -1 ? '发送验证码' : isSendCode}}</span>
          </el-form-item>
          <el-form-item label="新密码:" prop="wnewPassword">
            <el-input
              placeholder="请输入新密码"
              type="password"
              v-model="newRuleForm.wnewPassword"
              @keydown.enter.native="onSubmit('newRuleForm')"
              >
            </el-input>
          </el-form-item>

          <div class="formItemBox">
              <el-button type="primary" style="width:100%" @click="onSubmit('newRuleForm')">重置密码</el-button>
          </div>
          <div class="formItemBox bottom">
              <div></div>
              <div>
                <el-link type="primary" @click="isNoPassword = true">去登录</el-link>
              </div>
          </div>
        </div>
       
      </el-form>
      
      <!-- <div class="record">域名备案信息sc-000000000000000000 客服电话：029-88888888</div> -->
    </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
import menus from '../../../config/menu.js'
export default {
  data(){
    return {
      ruleForm: {
        username : "",
        password : "",
      },
      newRuleForm:{
        code:"",
        wnewPassword : "",
        wusername:"",
      },
      rules: {
          username: [
            {  validator: this.validatorUsername, trigger: 'blur' },
          ],
          password: [
            {  validator: this.validatorPassword, trigger: 'blur' }
          ],
        },
      newrules: {
          wusername: [
            {  validator: this.validatorwUsername, trigger: 'blur' },
          ],
          code: [
            {  validator: this.validatorCode, trigger: 'blur' }
          ],
          wnewPassword: [
            {  validator: this.validatorwPassword, trigger: 'blur' }
          ],
        },
      ishiveInfo:false,
      isNoPassword:true,
      isSendCode:-1
    }
  },
  mounted(){
    //判断是否为非法退出到登录界面
    if(this.$route.query.action){

      this.$myPop.alertBox(
        "非法操作",
        "检测到您正在进行非法解锁操作，为了保证安全，我们已将您退出系统，请您重新登录",
        function() {}
      );

    }
    
    //判断是否登录
    if(!this.$userData.getUserInfo()){

      
      //显示登录遮罩
      this['LoginModule/updateLogin'](true)

    }else{

      //消除登录遮罩
      this['LoginModule/updateLogin'](false)

    }
  },
  computed: {
    ...mapState({
        isShowLogin : state => state.LoginModule.isShowLogin
    }),
    
  },
  methods: {
    ...mapMutations(['updateLogin', 'LoginModule/updateLogin']),
    //账号验证
    validatorUsername(rule, value, callback){
      var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/
//  && phoneReg.test(value)
      if (value) {
        callback()
      } else {
        callback(new Error('请输入正确的账号'))
      }
    },
    validatorwUsername(rule, value, callback){
      var phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/

      if (value && phoneReg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的账号'))
      }
    },
    //验证码验证
    validatorCode(rule, value, callback){
      var codeReg = /^[0-9]{6}$/

      if (value && codeReg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的验证码'))
      }
    },
    //密码验证
    validatorPassword(rule, value, callback){
      var pwdReg = /^[A-Za-z\d$]{6,}$/;

      if (value && pwdReg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的密码'))
      }
    },
    validatorwPassword(rule, value, callback){
      var pwdReg = /^[A-Za-z\d$]{6,}$/;

      if (value && pwdReg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的密码'))
      }
    },
    //发送验证码
    sendCode(){
      if(this.isSendCode >= 0){
        this.$notify({
          title: '请勿重复发送',
          message: '',
          type: 'warning'
        });
      }
      
      if(this.isSendCode === -1){
        //验证码发送成功
        this.$notify({
            title: '验证码发送成功',
            message: '',
            type: 'warning'
          });
          this.isSendCode = 0
          setTimeout(()=>{
            this.isSendCode = 60
            let setTime = setInterval(() => {
              this.isSendCode --
              if(this.isSendCode === 1){
                clearInterval(setTime)
                setTimeout(() => {
                  this.isSendCode = -1
                },1000)
              }
            },1000)
          },1000)
      }
    },
   
    onSubmitPassword(){
      this.$refs.newRuleForm.validate((valid) => {
        if (valid) {


        }
      })
    },

    onSubmit(){

      if(this.ruleForm.username.length <= 0){
        this.$myPop.WarningMessage("用户帐号不能为空");
        return;
      }

      if(this.ruleForm.password.length <= 0){
        this.$myPop.WarningMessage("用户密码不能为空");
        return;
      }
      
      //登录请求参数
      var params = {
        account : this.ruleForm.username,
        password : this.ruleForm.password
      }
  
      this.$myLoading.startLoading()
      //登录接口
      this.$http.postHttp(this.$API.userLogin,params,(data)=>{

        sessionStorage.setItem("userToken",JSON.stringify(data.data.token))
        //获取用户信息，以及用户权限

        //将权限信息存储在本地
        sessionStorage.setItem("totalMenuBar",JSON.stringify(data.data.roleAuthList))
        //更新菜单数据
        this.$store.commit('MenuModule/getDataTabs',this)
        
        //获取当前用户信息
        this.$http.getHttp(this.$API.userDetail+"?id="+data.data.id,(rs)=>{
          sessionStorage.setItem("userInfo",JSON.stringify(rs.data))
          this.$store.commit('HomeModule/UPDATA_USER_INFO',rs.data)
          this.$notify({
            title: '登录成功',
            message: '',
            type: 'success'
          });
          
          
          setTimeout(() => {
            this.$myLoading.endLoading()
            //消除登录遮罩
            this['LoginModule/updateLogin'](false)

            let tabs = this.$store.state.MenuModule.taskbars
            let url = '/home'
            for(let i=0;i<tabs.length;i++){
              if(tabs[i]['visible']){
                this.$store.commit('MenuModule/changeIndex', i+'')
                let item = tabs[i]['childMenus']
                for(let j=0;j<item.length;j++){
                  if(item[j]['visible']){
                    this.$store.commit('MenuModule/changeSonIndex', j+'')
                    url = item[j]['url']
                    break;
                  }
                }
                if(url != '/home'){
                  break;
                }
                
              }
            }

            //进入首页
            this.$router.push({
              path: url
            });
          },1000)
        })

      })
      
    }
  }
}
</script>

<style lang="stylus" scoped>

.loginRegister {
  text-align center
  color #999

  a {
    color #999

    &:hover {
      color #333
    }
  }
}

.loginFootBox {
  width 100%
  height 60px
  background-color rgba(0,0,0,0.2)
  position absolute
  color #fff
  text-align center
  font-size 12px
  line-height 60px
  bottom 0px

  a {
    text-decoration:underline
  }
}
.loginBox {
  position absolute
  left 0px
  right 0px 
  overflow  none
  top 0px 
  bottom 0px
  background #fff
  z-index 999

  .loginImgBg{
    position absolute
    left 0px
    top 0px
    width 100%
    height 100%
    object-fit: cover;
  }

  .loginContent {
    width:30%
    min-width 700px
    padding 230px 10% 0
    float right
    .loginTitleBox{
      position relative
      color #000000
      span {
        display block
        font-size 28px;
        font-weight bold;
        color #000
        &.last{
          margin-bottom 40px  
        }
      }
      p{
        margin-bottom 15px
        font-size 18px
      }
    }

    .code{
      position absolute
      right 10px
      top 0  
      color #324fc4
      cursor pointer
      font-size 12px
    }

    .loginLogo {
      width 60px
      height 60px
      margin-top 10px
    }

    .loginiIput{
      width 300px  
    }
    .loading{
      color #324fc4
    }
  }

  .formItemBox {
    position relative
    width 100%
    height 40px
    margin-bottom 20px
    text-align center
    .el-button--primary{
      border-radius 20px
      background #324fc4
    }
    &.bottom{
      display flex
      justify-content space-between  
      .el-link.el-link--primary{
        color #324fc4
      }
    }
    
  }
  .record{
    font-size: 12px;
    position: absolute;
    z-index: 10;
    right: 0;
    width: 50%;
    text-align: center;
    bottom: 20px; 
  }
}
</style>
