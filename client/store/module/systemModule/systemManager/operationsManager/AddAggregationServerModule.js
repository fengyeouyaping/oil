export default {
  namespaced: true,
  state:{
    serverForm: {
      as_no : "",
      as_name : "",
      as_is_open : true,
      as_ip : "",
      as_port : "",
      as_project_path : "",
      as_is_show : true
    }
  },
  mutations:{
    clearForm(state,data){
      state.serverForm.as_no = ""
      state.serverForm.as_name = ""
      state.serverForm.as_ip = ""
      state.serverForm.as_is_open = true
      state.serverForm.as_port = ""
      state.serverForm.as_project_path = ""
      state.serverForm.as_is_show = true
    }
  }
}