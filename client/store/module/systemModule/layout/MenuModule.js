import tab from "../../../../config/tab.json"
export default {
  namespaced: true,
  state:{
      taskbars : [],
      taskbarsIndex:sessionStorage.getItem('taskbarsIndex') || '0',//左侧菜单 一级菜单的索引
      taskbarsSonIndex:sessionStorage.getItem('taskbarsSonIndex') || '0',//左侧菜单 二级菜单的索引
  },
  mutations:{
      //改变taskbarsIndex的值
      changeIndex(state,index){
          state.taskbarsIndex = index
          sessionStorage.setItem('taskbarsIndex',index)
      },
      //改变taskbarsSonIndex的值
      changeSonIndex(state,index){
        state.taskbarsSonIndex = index
        sessionStorage.setItem('taskbarsSonIndex',index)
    },
      //获取本地数据（树形结构）
      getDataTabs(state,that){
            const taskbars = that.$common.menu(tab,JSON.parse(sessionStorage.getItem("totalMenuBar")))
            state.taskbars = taskbars
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
      //改变taskbars的值
      updateTaskbars(state,item){
          state.taskbars = item
      }
  }
}