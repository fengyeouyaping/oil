export default {
  namespaced: true,
  state:{
      companyNodeData : [],
      employeeData : []
  },
  mutations:{

      //更新companyNodeData
      getCompanyNodeData(state,data){
          state.companyNodeData = data
      },

      updateEmployeeData(state,data){
        state.employeeData = data
    }
  }
}