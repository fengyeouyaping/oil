var routerData = [
  {
    path: '/home',
    name:'home',
    component: () => import('../../views/bussinessView/home/home.vue')
  },
  //大数据看版
  {
    path: '/bigDataVersion',
    name:'bigDataVersion',
    component: () => import('../../views/bussinessView/bigDataVersion/index.vue')
  },
  //实时数据
  {
    path: '/realTimeData',
    name:'realTimeData',
    component: () => import('../../views/bussinessView/realTimeData/index.vue')
  },
  //历史数据
  {
    path: '/historicalData',
    name:'historicalData',
    component: () => import('../../views/bussinessView/historicalData/index.vue')
  },

  //树结构
  {
    path: '/treeStructure',
    name:'treeStructure',
    component: () => import('../../views/bussinessView/treeStructure/index.vue')
  },
  //设备列表
  {
    path: '/equipmentList',
    name:'equipmentList',
    component: () => import('../../views/bussinessView/equipmentList/index.vue')
  },
  //设备列表详情
  {
    path: '/equipmentInfo',
    name:'equipmentInfo',
    component: () => import('../../views/bussinessView/equipmentList/info.vue')
  },
  //设备列表编辑
  {
    path: '/equipmentEditor',
    name:'equipmentEditor',
    component: () => import('../../views/bussinessView/equipmentList/editor.vue')
  },
  //设备日志
  {
    path: '/equipmentLog',
    name:'equipmentLog',
    component: () => import('../../views/bussinessView/equipmentLog/index.vue')
  },
  //操作日志
  {
    path: '/operationLog',
    name:'operationLog',
    component: () => import('../../views/bussinessView/operationLog/index.vue')
  },
  //角色管理
  {
    path: '/roleManagement',
    name:'roleManagement',
    component: () => import('../../views/bussinessView/roleManagement/index.vue')
  },
  //成员管理
  {
    path: '/membersManagement',
    name:'membersManagement',
    component: () => import('../../views/bussinessView/membersManagement/index.vue')
  },
  //修改用户信息
  {
    path: '/userInfo',
    name:'userInfo',
    component: () => import('../../views/bussinessView/userInfo/index.vue')
  },
  //文件浏览
  {
    path: '/fileBrow',
    name:'fileBrow',
    component: () => import('../../views/bussinessView/fileBrow/index.vue')
  },
];

export default routerData

