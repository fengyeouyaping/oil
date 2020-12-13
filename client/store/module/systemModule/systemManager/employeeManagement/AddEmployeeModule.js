export default {
  namespaced: true,
  state:{
    employeeForm: {
        u_username       : "",    //用户帐号
        u_password       : "123456",    //用户密码
        u_nickname       : "",    //用户昵称
        u_phone          : '',    //绑定的手机号码
        u_email          : "",    //绑定的邮箱地址
        u_is_activation  : false,    //是否激活 0-否 1-是
        u_create_time    : "",    //创建时间
        u_status    : "0",    //状态
        u_sex    : "0",    //性别
        u_position    : "",    //职务
        u_desc    : "",    //描述
        u_salary    : "",    //工资
        u_hiredate    : "",    //入职时间
    },
  },
  mutations:{
      //清除数据
      clearForm(state){
        state.employeeForm.u_username = "";
        state.employeeForm.u_password = "123456";
        state.employeeForm.u_nickname = "";
        state.employeeForm.u_phone = '';
        state.employeeForm.u_email = "";
        state.employeeForm.u_create_time = "";
        state.employeeForm.u_is_activation = false;
        state.employeeForm.u_status = "0";
        state.employeeForm.u_sex = "0";
        state.employeeForm.u_position = "";
        state.employeeForm.u_desc = "";
        state.employeeForm.u_salary = "";
        state.employeeForm.u_hiredate = "";
      },

      //更新menuForm的值
      updateMenuForm(state,employeeForm){
          state.employeeForm  = employeeForm;
      }

  }
}