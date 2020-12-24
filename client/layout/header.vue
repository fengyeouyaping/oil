<template>
  <div class="header header_default_style">
    <div class="logo" @mouseenter="showMoreLanguage" @mouseleave="hideMoreLanguage">
      <img :src="imgSrc" class="image_center" v-if="userInfo.imagePath" @click="updatePass">
      <img src="~SYSTEM_IMAGE/test/test_header.jpeg" class="image_center" v-else @click="updatePass">
      <div class="more_menu_box" v-if="isShowMoreLanguage">
        <div class="more_menu_box_item" @click="updatePass">
          <i class="fa fa-key fa-lg"></i>修改信息
        </div>
        <div class="more_menu_box_item" @click="logOut">
          <i class="fa fa-sign-out fa-lg"></i>登出操作
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  mounted() {
    //检查当前是否为锁屏状态
    if (sessionStorage.getItem("isLockWindow") == 1) {
      this.$store.commit("HeaderModule/clearLockTimer");
      this.lockWindow();
    }
  },
  data() {
    return {
      isDev : process.env.NODE_ENV === 'development',
      searchValue: "",  
      searchData:[],
      nowAllMenuData : [],
      isShowMoreLanguage: false,
      headerData: this.$headerMenu //headerMenu
    };
  },
  watch: {
      //监听搜索框内容的变化
      searchValue(val){

          //获取当前的菜单信息
          this.nowAllMenuData = this.$localData.getUseMenuData();

          setTimeout(() => {

              if(val.length <= 0){
                this.searchData = [];
                return;
              }

              var tempMenuArr = [];

                //匹配包含当前值的菜单项
                for(var i=0;i<this.nowAllMenuData.length;i++){

                    if(this.nowAllMenuData[i].m_name.indexOf(val) != -1){
                        tempMenuArr.push(this.nowAllMenuData[i]);
                    }

                }

                this.searchData = tempMenuArr;

          },500);


      },
  },
  //计算属性
  computed: {
    ...mapState({
      lockTimer: state => state.HeaderModule.lockTimer,
      userInfo:state => state.HomeModule.userInfo
    }),
    imgSrc(){
      return this.$global.httpServerImg + this.userInfo.imagePath + "?time="+new Date().getTime()*1000/1000
    }
  },
  methods: {

    leaveSearch(){

      this.searchData  = [];  
      this.searchValue = "";

    },

    //数据初始化操作
    dataInit(){

      if(!this.isDev){

        this.$myPop.alertBox(
            "操作提示",
            "该操作只能在开发模式下使用",
            function() {}
          );

        return;

      }

      this.$myPop.confirmBox("提示操作（仅开发模式可用）", "该操作为数据初始化操作，将为您初始化基本的系统数据，已清除开发测试时的相关系统数据，例如：员工数据，相关权限数据，只保留超级管理员以及相关权限，回复到系统数据的初始安装状态", () => {

        //检测是否为超管
        if(!this.$localData.getIsAdmin()){

          this.$myPop.alertBox(
            "非法操作",
            "只有超级管理员才可进行相关操作",
            function() {}
          );

        }else{
          
          this.$myPop.alertBox(
            "提示信息",
            "暂时关闭",
            function() {}
          );
          // this.$myLoading.startLoading();
          // this.$http.postHttp(this.$API.systemApiInitData, {}, rs => {
          //   this.$myLoading.endLoading();
          //   this.$myPop.SuccessMessage();
          // });


          
        }


      });

    },

    //锁屏处理
    lockWindow() {
      this.$store.commit("HeaderModule/clearLockTimer");
      this.$store.commit("LockWindowModule/showLockWindow");
      this.$store.commit("LockWindowModule/lockLocalStore", 1);
      this.$store.commit("HeaderModule/startLockTimer", () => {
      
        //进行每隔3秒钟的查看

        var isLock = sessionStorage.getItem("isLockWindow");

        var lockwindowElement = $(".lockWindowsBox").length;

        //非法删除
        if (isLock == 1 && lockwindowElement == 0) {

          this.$myPop.alertBox(
            "非法操作",
            "检测到您正在进行非法解锁操作，为了保证安全，我们将为您退出系统",
            function() {}
          );

          setTimeout(()=>{

            //直接退出登录
            sessionStorage.clear();

            //刷新当页
            location.href = "/";

          },3000)  

        }
      });
    },

    goHeaderMenu(item) {
        
      this.searchData  = [];  
      this.searchValue = "";

      this.$store.commit("MenuModule/storeData", item);
      this.$store.commit("ContentModule/updateMenuPath", item);
      this.$store.commit("TabsModule/updateSelectedState", item.m_id);
    },
    showMoreLanguage() {
      this.isShowMoreLanguage = true;
    },
    hideMoreLanguage() {
      this.isShowMoreLanguage = false;
    },
    logOut() {
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
    },
    //修改用户信息
    updatePass() {
      this.$router.push({
        path: "/userInfo"
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../assets/style/global.styl';

.searchInputBox {
    width 286px
    height auto
    max-height 246px
    overflow auto
    position absolute
    top 41px
    left 0px
    z-index 999
    border 1px solid #ccc

    .searchInputItem {
        width 100%
        height 35px
        background #fff
        color #333
        line-height 35px
        text-indent 10px
        font-size 13px
        border-bottom 1px solid #eee

        &:hover {
            background #f5f5f5
            cursor pointer
        }
    }
}

.header {
  width: 160px;
  height: 50px;
  position: absolute;
  top: 0px;
  left: 0px;
}

.logo {
  width: 160px;
  height: 50px;
  text-align: center;
  position: relative;
  float: left;

  img {
    image-center(30px, 30px);
    border-radius 50px
    left 20%
    text-align left
  }
}

.title {
  with: auto;
  height: 50px;
  float: left;
  line-height: 50px;
  padding-right: 10px;
  padding-left: 10px;
  font-size: 15px;
}

.personal_information {
  width: 50px;
  height: 50px;
  float: right;
  position: relative;

  img {
    image-center(30px, 30px);
    border-radius(15px);
  }
}

.more_menu_box {
  width: 120px;
  height: auto;
  background: #000;
  position: absolute;
  z-index: 99999;
  left: 0px;
  top: 50px;
}

.more_menu_box_item {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-indent: 15px;
  font-size: 12px;
  border-bottom: 1px solid #666;

  &:hover {
    background: #333;
    cursor: pointer;
  }

  i {
    float: left;
    margin-top: 14px;
  }
}

.header_menus {
  width: auto;
  height: 50px;
  max-width: 600px;
  float: right;
  display: flex;

  .header_menus_item {
    padding-left: 15px;
    padding-right: 15px;
    line-height: 50px;
    cursor: pointer;

    &:hover {
      background: #000;
    }
  }
}

.search_input {
  width: 250px;
  height: 50px;
  float: right;
  margin-right: 45px;
  position: relative;

  input {
    width: 100%;
    height: 30px;
    float: left;
    margin-top: 10px;
    background: none;
    padding-left: 8px;
    padding-right: 28px;
    outline: none;
  }

  i {
    position: absolute;
    right: -30px;
    cursor pointer
    top: 20px;
  }
}
</style>

