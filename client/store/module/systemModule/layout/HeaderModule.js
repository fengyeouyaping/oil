export default {
  namespaced: true,
  state:{
    lockTimer : null,
    isShowMenu:true,
  },
  mutations:{
    clearLockTimer(state){
      clearInterval(state.lockTimer)
    },
    startLockTimer(state,cb){
      state.lockTimer = setInterval(() => {
        cb();
      },2000);
    },
    updataIsShow(state,str){
      state.isShowMenu = str
    }
  }
}