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
    updateServerForm(state,data){
      data.as_is_open  = data.as_is_open == 1 ? true : false
      data.as_is_show  = data.as_is_show == 1 ? true : false
      state.serverForm = data
    }
  }
}