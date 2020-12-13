export default {
  namespaced: true,
  state:{
    addAtomicApiForm: {
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
      ap_apcid  : "",
      belongsMenu : [] //所属菜单
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
      {
        rp_name : "",
        rp_type : "",
        rp_is_must : true,
        rp_way : "RESTFUL",
        rp_note : "",
        rp_rule : ""
      }
    ],
    requestPostParams : [
      {
        rp_name : "",
        rp_type : "",
        rp_is_must : true,
        rp_way : "BODY",
        rp_note : "",
        rp_rule : ""
      }
    ]
  },
  mutations:{

      //清除数据
      clearForm(state){

        state.addAtomicApiForm.ap_name            = "";
        state.addAtomicApiForm.ap_api             = "";
        state.addAtomicApiForm.ap_is_control      = true;
        state.addAtomicApiForm.ap_desc            = "";
        state.addAtomicApiForm.ap_method          = "GET";
        state.addAtomicApiForm.ap_note            = "";
        state.addAtomicApiForm.ap_response_params = "";
        state.addAtomicApiForm.ap_is_auto         = true;
        state.addAtomicApiForm.ap_type            = "";
        state.addAtomicApiForm.ap_is_cache        = false;
        state.addAtomicApiForm.ap_is_get_cache    = false;
        state.addAtomicApiForm.ap_auto_table      = "";
        state.addAtomicApiForm.ap_cache_type      = "file";
        state.addAtomicApiForm.ap_apcid           =  "";
        state.addAtomicApiForm.belongsMenu        = [];
        state.requestGetParams  = [
          {
            rp_name : "",
            rp_type : "",
            rp_is_must : true,
            rp_way : "RESTFUL",
            rp_note : "",
            rp_rule : ""
          }
        ];
        state.requestPostParams = [
          {
            rp_name : "",
            rp_type : "",
            rp_is_must : true,
            rp_way : "BODY",
            rp_note : "",
            rp_rule : ""
          }
        ];
        
      },

      //更新菜单数据
      updateMenuData(state,data){
        state.menuData = data
      },

      //更新请求参数数组
      updateRequestPostParams(state,data){
        state.requestPostParams  = data
      },

      //更新请求参数数组
      updateRequestGetParams(state,data){
        state.requestGetParams  = data
      },

      //更新接口分类信息
      updateCategoryData(state,data){
        state.actionCategory = data
      }

  }
}