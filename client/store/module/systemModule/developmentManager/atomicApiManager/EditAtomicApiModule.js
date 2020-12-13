export default {
  namespaced: true,
  state:{
    atomicApiForm: {
      ap_name : "",
      ap_api  : "",
      ap_is_control  : true,
      ap_desc  : "",
      ap_method  : "GET",
      ap_note  : "",
      ap_response_params  : "",
      ap_is_auto  : true,
      ap_type  : "",
      ap_is_cache  : false,
      ap_is_get_cache  : false,
      ap_auto_table  : "",
      ap_cache_type  : "file",
      ap_apcid  : ""
    },
    menuData : [],
    actionCategory : [
      
    ],
    requestType : [
      {
        value : "int",
        label : "int（整型）"
      },
      {
        value : "varchar",
        label : "varchar（字符）"
      },
      {
        value : "array",
        label : "array（数组）"
      },
      {
        value : "boolean",
        label : "boolean（布尔）"
      }
    ],
    requestRule : [
      {
        value : "NOEMPTY",
        label : "非空"
      },
      {
        value : "NUMBER",
        label : "数字"
      }
    ],
    requestGetParams : [
      
    ],
    requestPostParams : [
      
    ]
  },
  mutations:{

      //清除数据
      clearForm(state){
        
      },

      //更新请求参数数组
      updateRequestPostParams(state,data){
        data.forEach((item)=>{
          item.rp_is_must = item.rp_is_must == 0 ? false : true
        })
        state.requestPostParams  = data
      },

      //更新请求参数数组
      updateRequestGetParams(state,data){
        data.forEach((item)=>{
          item.rp_is_must = item.rp_is_must == 0 ? false : true
        })
        state.requestGetParams  = data
      },

      //更新接口分类信息
      updateCategoryData(state,data){
        state.actionCategory = data
      },

      //更新表单信息
      updateAtomicApiForm(state,data){
        data.ap_is_control   = data.ap_is_control == 0 ? false : true
        data.ap_is_get_cache = data.ap_is_get_cache == 0 ? false : true
        data.ap_is_cache     = data.ap_is_cache == 0 ? false : true
        data.ap_is_auto      = data.ap_is_auto == 0 ? false : true
        state.atomicApiForm = data
      },

      //更新菜单信息
      updateMenuData(state,data){
        state.menuData = data
      }

  }
}