export default {
  namespaced: true,
  state:{
    menuForm: {
        m_name      : "",    //菜单名称
        m_icon_type : "0",   //图标类型
        m_icon      : "",    //菜单图标
        m_is_show   : true   //是否显示 0-否 1-是
    }
  },
  mutations:{
     
    //更新menuForm
    updateMenuForm(state,data){
        data.m_is_show = data.m_is_show == 0 ? false : true
        state.menuForm = data;
    },

    //更新menuForm.iconName的值
    updateMenuFormIconName(state,name){
        state.menuForm.m_icon = name;
    }

  }
}