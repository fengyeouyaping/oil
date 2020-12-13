export default {
  namespaced: true,
  state:{
    menuData: [],
  },
  mutations:{

      //更新菜单信息
      updateMenuData(state,data){
        state.menuData = data
      },

      //从本地获取父菜单的数据
      getFatherMenu(state,that){
          const totalMenuBar = JSON.parse(sessionStorage.getItem("totalMenuBar"))
          state.menuData = totalMenuBar
      },
      //更新组织架构数据
      updateOrganziational(state,data){
          state.menuData = data;
      }

  }
}