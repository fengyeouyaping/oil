var defaultRouteData = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('../../views/systemView/login/login.vue')
  },
]

var routeData = [
  //新增组织架构页面
  {
    path: '/addOrganizationalStructure',
    component: () => import('../../views/systemView/systemManager/organizationalStructureManager/addOrganizationalStructure/addOrganizationalStructure.vue')
  },
  //组织架构列表
  {
    path: '/organizationalStructureList',
    component: () => import('../../views/systemView/systemManager/organizationalStructureManager/organizationalStructureList/OrganizationalStructureList.vue')
  },
  //添加菜单页面
  {
    path: '/addMenu',
    component: () => import('../../views/systemView/systemManager/menuManager/addMenu/addMenu.vue')
  },
  //管理菜单页面
  {
    path: '/menuList',
    component: () => import('../../views/systemView/systemManager/menuManager/listMenu/listMenu.vue')
  },
  //添加角色页面
  {
    path: '/addRole',
    component: () => import('../../views/systemView/systemManager/roleManager/addRole/addRole.vue'),
  },
  //添加角色页面
  {
    path: '/addEmployee',
    component: () => import('../../views/systemView/systemManager/employeeManagement/addEmployee/addEmployee.vue')
  },
  //服务器配置
  {
    path: '/serverConfiguration',
    component: () => import('../../views/systemView/developmentManager/atomicLayerServiceManager/serverConfiguration/serverConfiguration.vue')
  },
  //角色菜单管理
  {
    path: '/roleMenuManager',
    component: () => import('../../views/systemView/systemManager/permissionsManager/roleMenuManager/roleMenuManager.vue')
  },
  //新增操作接口
  {
    path: '/addAtomicApi',
    component: () => import('../../views/systemView/developmentManager/atomicApiManager/addAtomicApi/addAtomicApi.vue')
  },
  //原子层接口列表
  {
    path: '/atomicApiList',
    component: () => import('../../views/systemView/developmentManager/atomicApiManager/atomicApiList/atomicApiList.vue')
  },
  //原子层文档列表
  {
    path: '/atomicLayerApiDocsList',
    component: () => import('../../views/systemView/apiDocsManager/apiDocsPreview/atomicLayerApiDocsList/atomicLayerApiDocsList.vue')
  },
  //新增原子层接口分类
  {
    path: '/addAtomicCategory',
    component: () => import('../../views/systemView/developmentManager/atomicApiManager/addAtomicCategory/addAtomicCategory.vue')
  },
  //角色用户管理
  {
      path: '/userRoleManagement',
      component: () => import('../../views/systemView/systemManager/permissionsManager/userRoleManagement/userRoleManagement.vue')
  },
  //节点角色管理
  {
      path: '/nodeRoleManagement',
      component: () => import('../../views/systemView/systemManager/permissionsManager/nodeRoleManagement/nodeRoleManagement.vue')
  },
  //员工节点管理
  {
    path: '/employeeNodeManager',
    component: () => import('../../views/systemView/systemManager/employeeManagement/employeeNodeManager/employeeNodeManager.vue')
  },
  //角色列表
  {
    path: '/roleList',
    component: () => import('../../views/systemView/systemManager/roleManager/roleList/roleList.vue')
  },
  //聚合层文档列表
  {
    path: '/aggregationLayerApiDocsList',
    component: () => import('../../views/systemView/apiDocsManager/apiDocsPreview/aggregationLayerApiDocsList/aggregationLayerApiDocsList.vue')
  },
  //新增聚合层文档
  {
    path: '/addAggregationApiDocs',
    component: () => import('../../views/systemView/apiDocsManager/apiDocsManager/addAggregationApiDocs/addAggregationApiDocs.vue')
  },
  //编辑聚合层文档
  {
    path: '/editAggregationLayerApiDocs',
    component: () => import('../../views/systemView/apiDocsManager/apiDocsManager/aggregationLayerApiDocsListManager/editAggregationLayerApiDocs/editAggregationLayerApiDocs.vue')
  },
  //聚合层文档列表管理
  {
    path: '/aggregationLayerApiDocsListManager',
    component: () => import('../../views/systemView/apiDocsManager/apiDocsManager/aggregationLayerApiDocsListManager/aggregationLayerApiDocsListManager.vue')
  },
  
  //菜单操作管理
  {
    path: '/menuActionManager',
    component: () => import('../../views/systemView/systemManager/menuManager/menuActionManager/menuActionManager.vue')
  },
  //编辑组织架构
  {
    path: '/editOrganizationalStructure',
    component: () => import('../../views/systemView/systemManager/organizationalStructureManager/organizationalStructureList/editOrganizationalStructure/editOrganizationalStructure.vue')
  },
  //编辑角色
  {
    path: '/editRole',
    component: () => import('../../views/systemView/systemManager/roleManager/roleList/editRole/editRole.vue')
  },
  //编辑菜单
  {
    path: '/editMenu',
    component: () => import('../../views/systemView/systemManager/menuManager/listMenu/editMenu/editMenu.vue')
  },
  //员工列表
  {
    path: '/employeeList',
    component: () => import('../../views/systemView/systemManager/employeeManagement/employeeList/employeeList.vue')
  },
  //编辑员工
  {
    path: '/editEmployee',
    component: () => import('../../views/systemView/systemManager/employeeManagement/employeeList/editEmployee/editEmployee.vue')
  },
  //编辑原子层接口
  {
    path: '/editAtomicApi',
    component: () => import('../../views/systemView/developmentManager/atomicApiManager/atomicApiList/editAtomicApi/editAtomicApi.vue')
  },
  //原子层接口分类列表
  {
    path: '/atomicApiCategoryList',
    component: () => import('../../views/systemView/developmentManager/atomicApiManager/atomicApiCategoryList/atomicApiCategoryList.vue')
  },
  //编辑原子层接口分类
  {
    path: '/editAtomicApiCategory',
    component: () => import('../../views/systemView/developmentManager/atomicApiManager/atomicApiCategoryList/editAtomicApiCategory/editAtomicApiCategory.vue')
  },
  //新增聚合层接口分类
  {
    path: '/addAggregationApiDocsCategory',
    component: () => import('../../views/systemView/apiDocsManager/apiDocsManager/addAggregationApiDocsCategory/addAggregationApiDocsCategory.vue')
  },
  //聚合层接口分类列表
  {
    path: '/aggregationApiDocsCategoryList',
    component: () => import('../../views/systemView/apiDocsManager/apiDocsManager/aggregationApiDocsCategoryList/aggregationApiDocsCategoryList.vue')
  },
  //编辑聚合层接口分类
  {
    path: '/editAggregationApiDocsCategory',
    component: () => import('../../views/systemView/apiDocsManager/apiDocsManager/aggregationApiDocsCategoryList/editAggregationApiDocsCategory/editAggregationApiDocsCategory.vue')
  },
  //组织架构图形
  {
    path: '/organizationalStructureGraphical',
    component: () => import('../../views/systemView/systemManager/organizationalStructureManager/organizationalStructureGraphical/organizationalStructureGraphical.vue')
  },
  //聚合层服务器列表
  {
    path: '/aggregationServerList',
    component: () => import('../../views/systemView/operationsManager/aggregationServerManager/aggregationServerList/aggregationServerList.vue')
  },
  //新增聚合层服务器列表
  {
    path: '/addAggregationServer',
    component: () => import('../../views/systemView/operationsManager/aggregationServerManager/addAggregationServer/addAggregationServer.vue')
  },
  //编辑聚合层服务器
  {
    path: '/editAggregationServer',
    component: () => import('../../views/systemView/operationsManager/aggregationServerManager/aggregationServerList/editAggregationServer/editAggregationServer.vue')
  },
  //弹窗封装示例
  {
    path: '/alertSample',
    component: () => import('../../views/systemView/commonSample/alertCorrelation/alertSample/alertSample.vue')
  },
  //提示框封装示例
  {
    path: '/promptSample',
    component: () => import('../../views/systemView/commonSample/alertCorrelation/promptSample/promptSample.vue')
  },
  //操作加载示例
  {
    path: '/actionLoadingSample',
    component: () => import('../../views/systemView/commonSample/loadingCorrelation/actionLoadingSample/actionLoadingSample.vue')
  },
  //数据请求示例
  {
    path: '/dataRequestSample',
    component: () => import('../../views/systemView/commonSample/networkCorrelation/dataRequestSample/dataRequestSample.vue')
  },
  //上传示例
  {
    path: '/uploadSamle',
    component: () => import('../../views/systemView/commonSample/uploadDownLoadSample/uploadSamle/uploadSamle.vue')
  },
  //下载示例
  {
    path: '/downloadSample',
    component: () => import('../../views/systemView/commonSample/uploadDownLoadSample/downloadSample/downloadSample.vue')
  },
  //录入类型界面模板
  {
    path: '/inputTypePageSample',
    component: () => import('../../views/systemView/commonSample/codeSnippet/inputTypePageSample/inputTypePageSample.vue')
  },
  //列表类型界面模板
  {
    path: '/listTypePageSample',
    component: () => import('../../views/systemView/commonSample/codeSnippet/listTypePageSample/listTypePageSample.vue')
  }
]

export default defaultRouteData.concat(routeData)