export default {
  namespaced: true,
  state:{
    categoryForm : {
      apc_name : ""
    }
  },
  mutations:{
    updateCategoryForm(state,data){
      state.categoryForm = data
    }
  }
}