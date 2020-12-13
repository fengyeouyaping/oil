<template>
  <div class="main_content" :class="[isLeft ? 'active' : '',isUserInfo ? 'leftActive' : '']">
    <!-- <div class="nav_content">
      <div class="nav_title"><i class="fa fa-bookmark fa-lg"></i><span v-html="menuPath"></span></div>  
      <div class="editFileBox" @click="editCodeClick" v-if="!edtiActionIsShow && isDev">
        <i class="fa fa-edit fa-lg"></i>编辑内容（开发环境使用）
      </div>
      <div class="editFileActionBox" v-if="edtiActionIsShow">
        <div class="editFileActionItem" style="color:red;width:140px;">提示：当前处于编辑状态</div>
        <div class="editFileActionItem" @click="editResetClick"><i class="fa fa-reply-all fa-lg"></i>还原内容</div>
        <div class="editFileActionItem" @click="editSaveClick"><i class="fa fa-save fa-lg"></i>保存内容</div>
        <div class="editFileActionItem" @click="editEndClick"><i class="fa fa-stop-circle fa-lg"></i>关闭编辑</div>
      </div>  
    </div> -->
    <div class="content_box">
      <router-view />
    </div>

    <div class="editCodeBox" v-if="editCodeIsShow">
      <textarea style="font-size:14px;" v-model="editCodeText.editCodeText"></textarea>
    </div>
    
  </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'
export default {
  data(){
    return {
    isLeft:false,
    isUserInfo:false,
     isDev : process.env.NODE_ENV === 'development'
    }
  },
  mounted(){
    

  },
  computed: {
    ...mapState({
      menuPath : state => state.ContentModule.menuPath,
      edtiActionIsShow : state => state.ContentModule.edtiActionIsShow,
      editCodeIsShow : state => state.ContentModule.editCodeIsShow,
      editCodeText : state => state.ContentModule,
      nowSelectedMenuItem : state => state.TabsModule.nowSelectedMenuItem,
    })
  },
  watch:{
    '$route'(val){
        if(val.name === "bigDataVersion"){
          this.isLeft = true
        }else{
          this.isLeft = false
        }
        if(val.name === "userInfo"){
          this.isUserInfo = true
        }else{
          this.isUserInfo = false
        }
    }
  },
  methods: {

    //获取当前菜单所在的文件路径
    getMenuFilePath(){

      //获取当前菜单的文件路径
      var nowMenuInfo = this.$localData.getNowMenuInfo();

      //首页
      if(nowMenuInfo == null){
        return "./client/views/bussinessView/home/home.vue"
      }

      //判断菜单类型
      var menuTypeDir = "./client/views/"
      if(nowMenuInfo.m_type == 0){
        menuTypeDir += "systemView/"
      }else if(nowMenuInfo.m_type == 1){
        menuTypeDir += "extensionView/"
      }else{
        menuTypeDir += "bussinessView/"
      }

       //获取当前菜单的文件路径
      var nowMenuPath = menuTypeDir + nowMenuInfo.m_route_url

      return nowMenuPath

    },

    editCodeClick(){

      //获取当前的文件路径
      var nowMenuPath = this.getMenuFilePath()

      this.$http.systemApiPostHttp("/getFileContent",{filePath:nowMenuPath},(rs) => {

        this.$store.commit('ContentModule/updateEditCodeIsShow',true)
        this.$store.commit('ContentModule/updateEdtiActionIsShow',true)
        this.$store.commit('ContentModule/updateEditCodeText',rs)
    
      })

    },

    editEndClick(){
        this.$store.commit('ContentModule/updateEditCodeIsShow',false)
        this.$store.commit('ContentModule/updateEdtiActionIsShow',false)
    },

    //保存内容
    editSaveClick(){

      this.$myPop.confirmBox("写入提示","确定要用当前的内容覆盖之前的文件内容吗？",() => {

        //获取当前的文件路径
        var nowMenuPath = this.getMenuFilePath()

        this.$http.systemApiPostHttp("/writeFileContent",{filePath:nowMenuPath,textContent:this.editCodeText.editCodeText},(rs) => {
           this.$myPop.SuccessMessage()
        })

      })
    },

    //还原内容
    editResetClick(){

      this.$myPop.confirmBox("还原提示","确定要恢复到打开之前的内容吗？",() => {

          this.$http.systemApiPostHttp("/getFileContent",{filePath:'./tmp/editCode_bak.vue'},(rs) => {
            this.$store.commit('ContentModule/updateEditCodeText',rs)
          })


      })

    }
  }

}
</script>

<style lang="stylus" scoped>
.main_content {
  width auto
  height auto
  position absolute
  left 270px
  top 0
  right 0px
  bottom 0
  overflow auto
  background #ffffff
  &.active{
    left 60px  
  }
  &.leftActive{
    left 160px
  }
}

.nav_content {
  width 100%
  height 39px
  border-bottom 1px solid #ccc
  background #f0f0f0

  .nav_title {
    width auto 
    height 40px
    line-height 40px
    margin-left 10px
    float left

    i {
      margin-right 5px
      color #88B7E0
    }
  }
}

.content_box {
  padding 0
  background #fff
  height 100%
}

.editFileBox {
  float right
  width 180px
  height 39px
  background #eee
  line-height 40px
  text-align center
  cursor pointer

  &:hover {
    background #e0e0e0
  }

  i {
    margin-right 5px
  }
}

.editCodeBox {
  position absolute
  left 0px
  top 40px
  right 0px
  bottom 0px
  background #ccc
  z-index 999
  overflow hidden

  textarea {
    width 100%
    height 100%
    border none
    outline none
    resize none
    font 14px
  }
}

.editFileActionBox {
  float right
  width auto
  height 40px
  line-height 40px
  text-align center
  cursor pointer

  .editFileActionItem {
    width 100px
    height 40px
    float left

    &:hover {
      background #e0e0e0
    }

    i {
      margin-right 5px
    }
  }
}
</style>
