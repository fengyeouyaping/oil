export default {
  namespaced: true,
  state:{
    ruleForm: {
      os_name   : "",
      os_is_inherit  : true
    }
  },
  mutations:{

      updateRuleForm(state,data){

        data.os_is_inherit = data.os_is_inherit == 0 ? false : true
        state.ruleForm = data
      },

      //清除数据
      clearForm(state){
        state.ruleForm.nodeName   = "";
      }

  }
}