export default {
  namespaced: true,
  state:{
    employeeData: []
  },
  mutations:{
      updateEmployeeData(state,data){
          state.employeeData  = data;
      }

  }
}