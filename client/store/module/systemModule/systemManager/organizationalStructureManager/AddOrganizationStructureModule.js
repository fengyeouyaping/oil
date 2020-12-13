export default {
  namespaced: true,
  state:{
    ruleForm: {
      nodeName   : "",
      isInherit  : false,
      nameParent : []
    },
    organizationalData:[
      {
        
      }
    ]
  },
  mutations:{

      //清除数据
      clearForm(state){
        state.ruleForm.nodeName   = "";
      },

      //更新组织架构数据
      updateOrganziational(state,data){
        state.organizationalData = data;
      }

  }
}