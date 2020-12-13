export default {
  namespaced: true,
  state:{
    serverData : []
  },
  mutations:{
      updateServerData(state,data){
        state.serverData = data
      }
  }
}