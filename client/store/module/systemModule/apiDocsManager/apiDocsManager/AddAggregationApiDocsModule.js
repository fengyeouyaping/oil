export default {
  namespaced: true,
  state:{
    apiForm : {
      bad_badcid : "",
      bad_name : "",
      bad_api : "",
      bad_desc : "",
      bad_method : "",
      bad_note : "",
      bad_response_params : ""
    },
    categoryData : [],
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
        badrp_name : "",
        badrp_type : "",
        badrp_is_must : true,
        badrp_way : "RESTFUL",
        badrp_note : "",
        badrp_rule : ""
      }
    ],
    requestPostParams : [
      {
        badrp_name : "",
        badrp_type : "",
        badrp_is_must : true,
        badrp_way : "BODY",
        badrp_note : "",
        badrp_rule : ""
      }
    ]
  },
  mutations:{

    updateCategoryData(state,data){
      state.categoryData = data
    },

    //更新请求参数数组
    updateRequestPostParams(state,data){
      state.requestPostParams  = data
    },

    //更新请求参数数组
    updateRequestGetParams(state,data){
      state.requestGetParams  = data
    }

  }
}