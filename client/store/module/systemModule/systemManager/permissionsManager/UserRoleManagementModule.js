export default {
  namespaced: true,
  state:{
      userData:[],
      roleData:[],
  },
  mutations:{
      //更新userData
      getuserData(state,userData){
          state.userData = userData
      },
      //更新roleData
      updateRoleData(state,roleData){
          state.roleData = roleData
      },

  }
}