export default {
  namespaced: true,
  state:{
    menuData : [],
    actionData : [],
    nowActionData : []
  },
  mutations:{
      //更新菜单数据
      updateMenuData(state,data){
        state.menuData = data;
      },

      //更新操作数据
      updateActionData(state,data){
        state.actionData = data;
      },

      //更新当前所拥有的操作数据
      updateNowActionData(state,data){
        state.nowActionData = data;
      },

      //新增当前操作数据
      addNowActionData(state,data){
        state.nowActionData.push(data)
      },

      //减少当前操作数据
      removeNowActionData(state,index){
        state.nowActionData.splice(index,1)
      }
  }
}