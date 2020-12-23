export default {
  namespaced: true,
  state:{
    newInfo:[],//点的信息
    userInfo:JSON.parse(sessionStorage.getItem('userInfo')) || {
      imagePath:'',
      account:'',
      password:''
    },
    newLineData:[]
  },
  mutations:{
    UPDATE_POIN_INFO(state,list){
      state.newInfo = list
    },
    UPDATA_USER_INFO(state,list){
      state.userInfo = list
    },
    updata_newLineData(state,list){
      state.newLineData = list
    }
  }
}