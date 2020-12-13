import Router from 'vue-router'
import bussionessRoutes from './bussiness/routes'
import systemRoutes from './system/routes'
import LocalData from '../common/localData'

//合并三类路由
var routes = bussionessRoutes.concat(systemRoutes);

export default () => {
  var routerObj = new Router({
    routes,
    linkActiveClass: 'active-link'
  })

  routerObj.beforeEach((to, from, next) => {  

    //获取当前要进入的路由地址
    var goRouterUrl = to.path

    //根据当前地址获取当前的菜单信息
    var menuInfo =  LocalData.getNowMenuActionIds(goRouterUrl);

    //将当前菜单的操作权限存储为全局
    sessionStorage.setItem("nowActionsIds",menuInfo.ids)
    sessionStorage.setItem("nowMenuId",menuInfo.menuId)

    next()
  })

  return routerObj
}
