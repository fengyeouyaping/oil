export default {
  namespaced: true,
  state:{
    apiListData : []
  },
  mutations:{

    //更新操作接口信息
    updateApiListData(state,data){
      state.apiListData = data
    }

  }
}