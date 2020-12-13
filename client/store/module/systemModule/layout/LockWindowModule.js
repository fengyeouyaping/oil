export default {
  namespaced: true,
  state:{
    lockWindow : false
  },
  mutations:{
    showLockWindow(state){
      state.lockWindow = true
    },
    hideLockWindow(state){
      state.lockWindow = false
    },
    //将锁屏状态，保存在本地信息中，防止刷新
    lockLocalStore(state,status){
      sessionStorage.setItem("isLockWindow",status);
    }
  }
}