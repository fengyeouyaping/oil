export default {
  namespaced: true,
  state:{
    menuForm: {
        name       : "",     //菜单名称
        address    : "",     //菜单地址
        iconType   : "0",    //图标类型
        iconName   : "",     //菜单图标
        level      : "0",    //菜单级别
        m_type     : "2",    //菜单所属类型
        father     : [],     //选择父菜单
        m_is_show  : true,   //是否显示 0-否 1-是
    },
    temporaryFatherData:[]//树状菜单列表
  },
  mutations:{
      //从本地获取父菜单的数据
      getFatherMenu(state,that){
          const temporaryFatherData = that.$common.arrayReorganization(JSON.parse(sessionStorage.getItem("totalMenuBar")))
          state.temporaryFatherData = temporaryFatherData
          for(var i=0;i<state.temporaryFatherData.length;i++){
              for(let n in state.temporaryFatherData[i].children){
                  state.temporaryFatherData[i].children[n].children = ""
              }
          }
      },

      //更新菜单信息
      updateTemporaryFatherData(state,data){
        state.temporaryFatherData = data
      },

      //清除数据
      clearForm(state){
        state.menuForm.name = "";
        state.menuForm.address = "";
        state.menuForm.iconType = "0";
        state.menuForm.iconName = "";
        state.menuForm.level = "0";
        state.menuForm.father = [];
        state.menuForm.m_type = "2";

      },

      //更新父菜单的结构
      fatherMenu(state,that){

          const level = state.menuForm.level
          const temporaryFatherData = that.$common.arrayReorganization(JSON.parse(sessionStorage.getItem("totalMenuBar")))
          state.temporaryFatherData = temporaryFatherData


          if(level == "1"){
              for(var i=0;i<state.temporaryFatherData.length;i++){
                  if(state.temporaryFatherData[i].children){
                      state.temporaryFatherData[i].children = "";
                  }
              }
          }
          if(level == "2"){
              for(var i=0;i<state.temporaryFatherData.length;i++){
                  for(let n in state.temporaryFatherData[i].children){
                      state.temporaryFatherData[i].children[n].children = ""
                  }
              }
          }

          if(level == "3"){
              for(var i=0;i<state.temporaryFatherData.length;i++){
                  for(let n in state.temporaryFatherData[i].children){
                      for(let m in state.temporaryFatherData[i].children[n].children){
                          state.temporaryFatherData[i].children[n].children[m].children = ""
                      }
                  }
              }
          }

          if(level == "0"){
              state.menuForm.father = []
          }


      },
      //更新menuForm.iconName的值
      updateMenuFormIconName(state,name){
          state.menuForm.iconName   = name;
      }

  }
}