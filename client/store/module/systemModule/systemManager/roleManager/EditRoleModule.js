export default {
  namespaced: true,
  state:{
    roleForm: {
        or_name : "",    //角色名称
    },
  },
  mutations:{

      //更新角色信息
      updateRoleData(state,data){
        state.roleForm = data
      }

  }
}