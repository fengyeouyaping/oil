export default {
  namespaced: true,
  state:{
    categoryForm : {
      name : ""
    }
  },
  mutations:{
      //清除数据
      clearForm(state){
        state.categoryForm.name = ""
      }
  }
}