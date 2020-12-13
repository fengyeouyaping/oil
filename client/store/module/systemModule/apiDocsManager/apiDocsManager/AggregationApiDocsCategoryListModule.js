export default {
  namespaced: true,
  state:{
    categoryData : []
  },
  mutations:{
      updateCategoryData(state,data){
        state.categoryData = data
      }
  }
}