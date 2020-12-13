<template>
  <div class="main_tabs">
    <div class="tab_content">
      <div class="tab_item_box">
        
        <div class="tab_item" :class="{selected : taskbar.isSelected}" :key="taskbar.m_id" v-for="taskbar,index in taskbars" @click="contentRouter(taskbar)">
          {{taskbar.m_name}}
        <i class="fa fa-times-circle fa-lg" @click.stop="cloceTaskbar(taskbar)"></i>
        </div>
       
      </div>
      <div class="tab_menu_box" @mouseenter="showMoreLanguage" @mouseleave="hideMoreLanguage">菜单操作
        <div class="more_menu_box"  v-if="isShowMoreLanguage">
          <div class="more_menu_box_item" @click="cloceTaskbarAll" >全部关闭</div>
          <div class="more_menu_box_item" @click="cloceTaskbarOther" >关闭其他</div>
        </div>  
      </div>
    </div>
  </div>
</template>

<script>

    import { mapState,mapMutations } from 'vuex'

export default {
    data(){
      return {
        isShowMoreLanguage : false
      }
    },
    computed: {
        ...mapState({
            taskbars : state => state.TabsModule.taskbars,
            editCodeIsShow : state => state.ContentModule.editCodeIsShow
        })
    },
    mounted(){
        this.$store.commit('TabsModule/getDataTabs',this)
        
        //console.log("当前的开发模式：" + this.$isDev);

        // 临时开启
        // this.$router.push({ path: "/home" })
        // this.$store.commit('TabsModule/updateResetState')
    },
    methods:{

        //更改全局变量taskbars
        updateTabs(tabs) {
            this.$store.commit('TabsModule/updateTabs',tabs)
        },
        //关闭其他菜单
        cloceTaskbarOther(){

          if(this.editCodeIsShow){
            this.$myPop.WarningMessage("请先关闭编辑模式，在进行页面的相关操作")
            return
          }

          var taskbars = JSON.parse(sessionStorage.getItem("tabs"))

          //获取当前选中的菜单
          var nowItem = taskbars.filter((item)=>{
            return item.isSelected == true
          })

          this.$store.commit('TabsModule/closeOtherTabs',nowItem)

         

        },
        //点击关闭单个任务
        cloceTaskbar(item){

            this.$store.commit('TabsModule/cloceTaskbar',item)

            //说明关闭的不是自身，不需要跳转到首页
            if(item.isSelected){

              //跳转到首页
              this.$router.push({
                path: "/home"
              });

              this.$store.commit('ContentModule/updateRestMenuPath',item)
              this.$store.commit('TabsModule/updateResetState')

            }

        },
        //关闭全部任务
        cloceTaskbarAll(){  

            if(this.editCodeIsShow){
              this.$myPop.WarningMessage("请先关闭编辑模式，在进行页面的相关操作")
              return
            }

            this.$store.commit('TabsModule/cloceTaskbarAll')

            //跳转到首页
            this.$router.push({
              path: "/home"
            });

            this.$store.commit('ContentModule/updateRestMenuPath')
        },
        //点击任务进行路由的切换
        contentRouter(item){

            if(this.editCodeIsShow){
              this.$myPop.WarningMessage("请先关闭编辑模式，在进行页面的切换操作")
              return
            }

            this.$router.push({
                path: item.m_url,
            });

            this.$store.commit('TabsModule/updateSelectedState',item.m_id)
            this.$store.commit('ContentModule/updateMenuPath',item)
        },
        showMoreLanguage(){
            this.isShowMoreLanguage = true
        },
        hideMoreLanguage(){
            this.isShowMoreLanguage = false
        }
    }
}
</script>

<style lang="stylus" scoped>
.main_tabs {
  position absolute
  top 50px
  left 270px
  right 0px
  height 49px
  background #666
}

.more_menu_box {
    width 70px
    height auto
    background #fff
    position absolute
    z-index 99999
    right 0px
    top 30px
    border-bottom 1px solid #eee
}
    
.more_menu_box_item {
    width 100%
    height 30px
    line-height 30px
    font-size 12px
    border-top 1px solid #eee

   
    &:hover {
      background #e0e0e0
      cursor pointer
    }

    i {
        float left
        margin-top 14px
    }
}

.tab_content {
    width 100%
    height 50px
    
    position relative

    .tab_menu_box {
      width 70px
      height 30px
      cursor pointer
      position absolute
      right 10px 
      line-height 30px
      text-align center
      top 10px
      bottom 0px
      background #fff

    }

    .tab_item_box {
      position absolute
      overflow auto
      right 80px
      left 0px
      display flex
      top 0px
      bottom 0px

      .tab_item {
        width auto 
        height 30px
        box-shadow: 0 2px 5px 0 rgba(0,0,0,.5);
        background #fff
        margin-top 10px
        border-radius 2px
        line-height 30px
        margin-right 10px
        text-align center
        white-space: nowrap;
        text-overflow: ellipsis;
        display: block;
        padding-left 10px
        overflow hidden
        padding-right 30px
        position relative

        i {
          position absolute
          right 9px
          top 8px
          z-index 9
          color #000

          &:hover {
            color red
          }
        
        }

        &:hover {
          cursor pointer
          background #eee
        }

        &:first-child {
          margin-left 10px  
        }
      }
    }

    .tab_item.selected {
      background #333
      box-shadow: 0 2px 3px 0 rgba(255,255,255,.3);
      color #fff

      &:hover {
          cursor pointer
          background #000
      }

      i {
        color #fff
      }
    }
}
</style>
