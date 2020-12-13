export default {
  namespaced: true,
  state:{
    configForm : {
      ac_is_debug : false,
      ac_is_independent_deployment : false,
      ac_is_physically_delete : false,
      ac_is_access_control_allow_origin : false,
      ac_is_aggregation_server_validation : false,
      ac_is_web_manager_add_api : false,
      ac_method : ["GET","POST","ALL"],
      ac_is_curd : true,
      ac_is_data_filter : false,
      ac_router_layer : 2,
      ac_built_in_url : "http://127.0.0.1",
      ac_page_limit : 20,
      ac_is_white_auth : false,
      ac_is_cache : false,
      ac_cache_type : "文件缓存",
      ac_cache_dir : "cache",
      ac_cache_validity : 60*60,
      ac_noDatabaseUse : false,
      ac_mysql_username : "",
      ac_mysql_password : "",
      ac_mysql_port : 3306,
      ac_mysql_host : "",
      ac_mysql_dbname : ""
    }   
  },
  mutations: {
     updateConfigForm(state,data){

      data.ac_method   = data.ac_method.split(",");
      state.configForm = data;
    }
  }
}