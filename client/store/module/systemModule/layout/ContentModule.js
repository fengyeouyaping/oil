export default {
  namespaced: true,
  state:{
      menuPath : "首页",
      edtiActionIsShow : false,
      editCodeIsShow : false,
      editCodeText : "" //代码内容
  },
  mutations:{

      updateEdtiActionIsShow(state,data){
       
        state.edtiActionIsShow = data
      },

      updateEditCodeIsShow(state,data){
        state.editCodeIsShow = data
      },

      updateEditCodeText(state,data){
        state.editCodeText = data
      },

      updateRestMenuPath(state){
        state.menuPath = "首页"
      },

      //更新菜单路径
      updateMenuPath(state,data){

        var menuData = JSON.parse(sessionStorage.getItem("totalMenuBar"));

        //取出父菜单路径
        var pathValue = data.m_path.split(",")

        if(pathValue != 'NO_PATH'){

          //最终菜单名
          var menuStr = ""

          //去除开头和结尾
          pathValue.splice(0,1)
          pathValue.splice(pathValue.length - 1,1)

          //查询菜单名称
          pathValue.forEach((item) => {

            menuData.forEach((menuItem) => {

              if(item == menuItem.m_id){
                menuStr += menuItem.m_name + " / "
                return
              }

            })
          })
          menuStr += "<b>" + data.m_name + "</b>"

          //最终菜单名
          state.menuPath = menuStr

        }else{

          state.menuPath = "<b>" + data.m_name + "</b>";

        }
      }
  }
}