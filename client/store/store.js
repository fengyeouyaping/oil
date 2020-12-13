import Vuex from 'vuex'

import systemStore from './module/systemModule/systemStore'
import bussinessStore from './module/bussinessModule/bussinessStore'

//合并对象
var storeObj = Object.assign(systemStore,bussinessStore);

export default () => {
  const store = new Vuex.Store({
    modules : storeObj
  })
  return store
}