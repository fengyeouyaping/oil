export default {
  namespaced: true,
  state:{
    newInfo:[],//点的信息
    userInfo:JSON.parse(sessionStorage.getItem('userInfo')) || {
      imagePath:'',
      account:'',
      password:''
    }
  },
  mutations:{
    UPDATE_POIN_INFO(state,list){
      state.newInfo = list
    },
    UPDATA_USER_INFO(state,list){
      state.userInfo = list
    }
  }
}