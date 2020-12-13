export default {
  namespaced: true,
  state:{
      isShowLogin : false
  },
  mutations:{
      updateLogin(state,data){
        state.isShowLogin = data
      }
  }
}