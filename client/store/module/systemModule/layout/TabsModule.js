export default {
  namespaced: true,
  state:{
      taskbars : [
        
      ],
      homeTab:{
          m_id:0,
          m_fid:3,
          m_level:0,//菜单级别 0-一级菜单 1-二级菜单 2-三级菜单
          m_name:'首页',
          m_url:'/home',
          m_icon_type:1,
          m_icon:"name",
          m_path:"0,",
          m_type:"2",
          rmm_apids:"0",
      },
      nowSelectedMenuItem : null
  },
  mutations:{

      //获取当前选中的菜单信息
      getNowSelectedItem(state){
        var nowSelectedItem = null
        for(var i = 0;i<state.taskbars.length;i++){
            if(state.taskbars[i].isSelected == true){
                nowSelectedItem = state.taskbars[i]
                break
            }
        }
        state.nowSelectedMenuItem = nowSelectedItem
      },

      //关闭其他菜单
      closeOtherTabs(state,item){
        this.commit('TabsModule/updateTabs',[])
        this.commit('TabsModule/updateTabs',item)
        sessionStorage.setItem("tabs", JSON.stringify(state.taskbars));
      },

      //获取本地数据
      getDataTabs(state,that){
          //判断vuex内是否有数据，若没有则取本地数据
          if(state.taskbars.length == 0){
              const taskbars = JSON.parse(sessionStorage.getItem("tabs"))
              this.commit('TabsModule/updateTabs',taskbars)
          }
      },
      //更改全局变量taskbars
      updateTabs(state,data){
          if(data == null){
              state.taskbars.unshift(state.homeTab)
              return
          }
          state.taskbars = data
          for(var i=0;i<data.length;i++){
              if(data[i].m_id == 0){
                  return
              }
          }
          state.taskbars.unshift(state.homeTab)
      },
      //存储数据到本地与vuex，为多任务栏做准备
      storeData(state,item){
          var tabs = [];
          if(sessionStorage.getItem("tabs")){
              tabs = JSON.parse(sessionStorage.getItem("tabs"))
          }
          for(var i=0;i<tabs.length;i++){
              if(tabs[i].m_id == item.m_id){
                  return false
              }
          }
          this.commit('TabsModule/updateTabs',[])
          tabs.push(item)
          this.commit('TabsModule/updateTabs',tabs)

          sessionStorage.setItem("tabs", JSON.stringify(tabs));

      },
      //点击关闭单个任务
      cloceTaskbar(state,item){
          if(item.m_id == 0){
              return
          }
          for(var i=0;i<state.taskbars.length;i++){
              if(state.taskbars[i].m_id == item.m_id){
                  state.taskbars.splice(i,1);
              }
          }
          sessionStorage.setItem("tabs", JSON.stringify(state.taskbars));
      },
      //关闭全部任务
      cloceTaskbarAll(state){
          this.commit('TabsModule/updateTabs',[])
          sessionStorage.setItem("tabs", JSON.stringify(state.taskbars));
      },

      //更新选中状态
      updateSelectedState(state,data){

        var taskbars = JSON.parse(sessionStorage.getItem("tabs"))

        for(var i = 0;i<taskbars.length;i++){
            state.taskbars[i].isSelected = false
            if(state.taskbars[i].m_id == data){
               state.taskbars[i].isSelected = true
            }
        }
        sessionStorage.setItem("tabs", JSON.stringify(state.taskbars));
      },

      //重置选中状态到首页
      updateResetState(state){
        var taskbars = JSON.parse(sessionStorage.getItem("tabs"))
        for(var i = 0;i<taskbars.length;i++){
            state.taskbars[i].isSelected = false
            if(state.taskbars[i].m_url == '/home'){
               state.taskbars[i].isSelected = true
            }
        }
        sessionStorage.setItem("tabs", JSON.stringify(state.taskbars));
      },

  }
}