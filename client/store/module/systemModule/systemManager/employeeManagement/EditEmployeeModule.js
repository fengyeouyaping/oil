export default {
  namespaced: true,
  state:{
    employeeForm: {
        u_username       : "", //用户帐号
        u_password       : "", //用户密码
        u_nickname       : "", //用户昵称
        u_phone          : '', //绑定的手机号码
        u_email          : "",  //绑定的邮箱地址
        u_is_activation  : false //是否激活 0-否 1-是
    },
  },
  mutations:{
      
      //更新menuForm的值
      updateEmployeeForm(state,data){
          data.u_is_activation = data.u_is_activation == 1 ? true : false
          state.employeeForm  = data;
      }

  }
}