export default {
  namespaced: true,
  state:{
    roleData : []
  },
  mutations:{
      updateRoleData(state,data){
        state.roleData = data
      }
  }
}