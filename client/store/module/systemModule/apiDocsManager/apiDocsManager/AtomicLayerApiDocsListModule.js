export default {
  namespaced: true,
  state:{
    apiDocsListData   : [],
    apiDocsDetailData : ""
  },
  mutations:{

      //更新接口文档信息
      updateApiDocsListData(state,data){
        state.apiDocsListData = data
      },

      //更新文档详细信息
      updateApiDocsDetailData(state,data){
        state.apiDocsDetailData = data
      },

      //更改分类菜单显示隐藏状态
      updateApiDocsMenuShow(state,index){
        state.apiDocsListData[index].isShow = !state.apiDocsListData[index].isShow
      }

  }
}