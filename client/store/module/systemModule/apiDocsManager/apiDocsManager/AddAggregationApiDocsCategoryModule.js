export default {
  namespaced: true,
  state:{
    categoryForm : {
      badc_name : ""
    }
  },
  mutations:{
      //清除数据
      clearForm(state){
        state.categoryForm.badc_name = ""
      }
  }
}