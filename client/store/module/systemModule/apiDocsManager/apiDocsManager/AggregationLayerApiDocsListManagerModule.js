export default {
  namespaced: true,
  state:{
    apiDocsListData : []
  },
  mutations:{

      //更新接口文档信息
      updateApiDocsListData(state,data){
        state.apiDocsListData = data
      }

  }
}