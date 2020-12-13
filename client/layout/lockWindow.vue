<template>
    <div class="lockWindowsBox" v-if="lockWindow">
      <div class="lockContent">
        <div class="lockTitle">当前正处于锁屏状态</div>
        <div class="lockInput">
          <input type="text" id="lock_pass" placeholder="请输入用户密码进行解锁" />
        </div>
        <div class="lockSubmit" @click="unlockClick">
          确定解锁
        </div>  
      </div>
    </div>
</template>
    
<script>
import { mapState,mapMutations } from 'vuex'
export default {
    mounted(){

     

    },
    computed: {
      ...mapState({
        lockWindow : state => state.LockWindowModule.lockWindow
      })
    },
    methods : {
      ...mapMutations(['clearLockTimer', 'HeaderModule/clearLockTimer']),
      ...mapMutations(['hideLockWindow', 'LockWindowModule/hideLockWindow']),
      unlockClick(){

        //查询解锁密码是否正确
        var u_pass = $("#lock_pass").val();

        if(u_pass.length <= 0){
           this.$myPop.WarningMessage("解锁密码不能为空");
           return;
        }

        //查询用户信息
        this.$myLoading.startLoading();
        this.$http.getHttp(this.$API.userSearch + "/u_id/" + this.$localData.getUserId() + "/u_password/" + u_pass, rs => {
          this.$myLoading.endLoading();

          if(rs.data.length <= 0){
             this.$myPop.ErrorMessage("抱歉，解锁密码错误");
          }else{
            this['HeaderModule/clearLockTimer']()
            this['LockWindowModule/hideLockWindow']()
            this.$store.commit("LockWindowModule/lockLocalStore",0);
          }
          
        });

      }
    }
}
</script>
    
<style lang="stylus" scoped>
.lockWindowsBox {
  width 100%
  height 100%
  position absolute
  background-color rgba(0,0,0,0.8)
  left 0px
  z-index 999
}

.lockContent {
  width 400px
  height 300px
  background #fff
  position absolute
  left 50%
  top 50%
  margin-left -200px
  box-shadow 0 2px 12px 0 rgba(255,255,255,.5)
  margin-top -150px
}

.lockTitle {
  width 100%
  height 50px
  background #eeeeee
  text-align center
  box-sizing border-box
  line-height 50px
}

.lockInput {
  width 80%
  height 45px
  margin-top 50px
  margin-left 40px

  input {
    width 100%
    height 100%
    border 1px solid #ccc
    outline none 
    background #eee
    box-sizing border-box
    padding 10px
  }
}

.lockSubmit {
  width 80%
  height 45px;
  background #2e82ff
  margin-left 40px
  margin-top 40px
  color #ffffff
  text-align center
  line-height 45px
  font-size 16px
  cursor pointer
  
}
</style>
      