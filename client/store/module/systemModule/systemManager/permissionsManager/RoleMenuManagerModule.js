export default {
  namespaced: true,
  state:{
    roleData      : [],
    menuData      : [],
    nowMenuData   : [], //当前所拥有的菜单权限
    actionData    : [],
    selectMenuIds : []
  },
  mutations:{
      
      //更新角色列表数据
      updateRoleData(state,data){
          state.roleData = data;
      },

      //更新操作列表数据
      updateActionData(state,data){
        state.actionData = data;
      },

      //更新当前选中的菜单数据
      updateSelectMenuIdsData(state,data){
        state.selectMenuIds = data;
      },

      //更新菜单数据
      updateMenuData(state,data){
        state.menuData = data;
      },

      //更新原菜单数据（未经过树状结构转化）
      updateNowMenuData(state,data){
        state.nowMenuData = data;
      },

      //更改角色的选中状态
      updateRoleSelectedData(state,index){

        state.roleData.forEach((item,idx)=>{
     
          if(idx == index){
            item.isSelected = true
          }else{
            item.isSelected = false
          }
        })

      }


  }
}