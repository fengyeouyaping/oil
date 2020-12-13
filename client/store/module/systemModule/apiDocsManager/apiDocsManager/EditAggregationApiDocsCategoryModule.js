export default {
  namespaced: true,
  state:{
    categoryForm : {
      badc_name : ""
    }
  },
  mutations:{
      updateCategoryForm(state,data){
        state.categoryForm = data
      }
  }
}