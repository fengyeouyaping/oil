export default {
  namespaced: true,
  state:{
    lockTimer : null
  },
  mutations:{
    clearLockTimer(state){
      clearInterval(state.lockTimer)
    },
    startLockTimer(state,cb){
      state.lockTimer = setInterval(() => {
        cb();
      },2000);
    }
  }
}