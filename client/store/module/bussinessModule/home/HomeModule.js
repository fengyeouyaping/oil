export default {
  namespaced: true,
  state:{
    newInfo:[],//点的信息
    userInfo:JSON.parse(sessionStorage.getItem('userInfo')) || {
      imagePath:'',
      account:'',
      password:''
    },
    newLineData:[],
    leftMenuShow:false,
    bigImgNum:0,
    isOne:true
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
    },
    updata_leftMenuShow(state,type){
      state.leftMenuShow = type
    },
    updata_bigImgNum(state,type){
      state.bigImgNum = type
    },
    updata_isOne(state,type){
      state.isOne = type
    }
  }
}