export default {
  namespaced: true,
  state:{
    functionModuleData : [],
    apiMenuData : [],
    apiDocsDetailData : ""
  },
  mutations:{

      //更新模块信息
      updateFunctionModuleData(state,data){
        state.functionModuleData = data
      },

      //更新文档详细信息
      updateApiDocsDetailData(state,data){
        state.apiDocsDetailData = data
      },

      //更新菜单信息
      updateApiMenuData(state,data){
        state.apiMenuData = data
      },

      //更改模块菜单显示隐藏状态
      updateFunctionModuleShow(state,index){
        state.functionModuleData[index].isShow = !state.functionModuleData[index].isShow
      },

      //更改分类菜单显示隐藏状态
      updateApiDocsMenuShow(state,index){
        state.apiMenuData[index].isShow = !state.apiMenuData[index].isShow
      }

  }
}