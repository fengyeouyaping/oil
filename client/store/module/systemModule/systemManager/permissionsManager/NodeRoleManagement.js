export default {
  namespaced: true,
  state:{
      companyNodeData:[],
      roleData:[],
  },
  mutations:{
      //更新companyNodeData
      getCompanyNodeData(state,companyNodeData){
          state.companyNodeData = companyNodeData
      },
      //更新roleData
      updateRoleData(state,roleData){
          state.roleData = roleData
      },

  }
}