export default {
  namespaced: true,
  state:{
    organizationalData:[]
  },
  mutations:{

      //更新组织架构数据
      updateOrganziational(state,data){
        state.organizationalData = data;
      }

  }
}