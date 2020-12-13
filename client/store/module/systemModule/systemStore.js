import TabsModule from './layout/TabsModule'
import MenuModule from './layout/MenuModule'
import ContentModule from './layout/ContentModule'
import HeaderModule from './layout/HeaderModule'
import LockWindowModule from './layout/LockWindowModule'
import LoginModule from './login/loginModule'
import AddOrganizationStructureModule from './systemManager/organizationalStructureManager/AddOrganizationStructureModule' 
import OrganizationStructureListModule from './systemManager/organizationalStructureManager/OrganizationStructureListModule'
import AddMenuModule from './systemManager/menuManager/AddMenuModule'
import EditMenuModule from './systemManager/menuManager/EditMenuModule'
import ServerConfigurationModule from './developmentManager/atomicLayerServiceManager/ServerConfigurationModule'
import AddRoleModule from './systemManager/roleManager/AddRoleModule'
import RoleListModule from './systemManager/roleManager/RoleListModule'
import AddEmployeeModule from './systemManager/employeeManagement/AddEmployeeModule'
import EmployeeListModule from './systemManager/employeeManagement/EmployeeListModule'
import EditEmployeeModule from './systemManager/employeeManagement/EditEmployeeModule'
import MenuListModule from './systemManager/menuManager/MenuListModule'
import AddAtomicApiModule from './developmentManager/atomicApiManager/AddAtomicApiModule'
import AddAtomicCategoryModule from './developmentManager/atomicApiManager/AddAtomicCategoryModule'
import AtomicApiCategoryListModule from './developmentManager/atomicApiManager/AtomicApiCategoryListModule'
import AtomicApiListModule from './developmentManager/atomicApiManager/AtomicApiListModule'
import AtomicLayerApiDocsListModule from './apiDocsManager/apiDocsManager/AtomicLayerApiDocsListModule'
import AggregationLayerApiDocsListModule from './apiDocsManager/apiDocsManager/AggregationLayerApiDocsListModule'
import RoleMenuManagerModule from './systemManager/permissionsManager/RoleMenuManagerModule'
import UserRoleManagementModule from './systemManager/permissionsManager/UserRoleManagementModule'
import NodeRoleManagement from './systemManager/permissionsManager/NodeRoleManagement'
import EmployeeNodeManagerModule from './systemManager/employeeManagement/EmployeeNodeManagerModule'
import AddAggregationApiDocsModule from './apiDocsManager/apiDocsManager/AddAggregationApiDocsModule'
import MenuActionManagerModule from './systemManager/menuManager/MenuActionManagerModule'
import EditOrganizationStructureModule from './systemManager/organizationalStructureManager/EditOrganizationStructureModule'
import EditRoleModule from './systemManager/roleManager/EditRoleModule'
import EditAtomicApiModule from './developmentManager/atomicApiManager/EditAtomicApiModule'
import EditAtomicApiCategoryModule from './developmentManager/atomicApiManager/EditAtomicApiCategoryModule'
import AggregationLayerApiDocsListManagerModule from './apiDocsManager/apiDocsManager/AggregationLayerApiDocsListManagerModule'
import EditAggregationLayerApiDocsModule from './apiDocsManager/apiDocsManager/EditAggregationLayerApiDocsModule'
import AddAggregationApiDocsCategoryModule from './apiDocsManager/apiDocsManager/AddAggregationApiDocsCategoryModule'
import AggregationApiDocsCategoryListModule from './apiDocsManager/apiDocsManager/AggregationApiDocsCategoryListModule'
import EditAggregationApiDocsCategoryModule from './apiDocsManager/apiDocsManager/EditAggregationApiDocsCategoryModule'
import OrganizationalStructureGraphicalModule from './systemManager/organizationalStructureManager/OrganizationalStructureGraphicalModule'
import AggregationServerListModule from './systemManager/operationsManager/AggregationServerListModule'
import AddAggregationServerModule from './systemManager/operationsManager/AddAggregationServerModule'
import EditAggregationServerModule from './systemManager/operationsManager/EditAggregationServerModule'



export default {
  TabsModule,
  MenuModule,
  HeaderModule,
  ContentModule,
  LoginModule,
  LockWindowModule,

  AddOrganizationStructureModule,
  OrganizationStructureListModule,
  AddMenuModule,
  ServerConfigurationModule,
  AddRoleModule,

  RoleListModule,
  AddEmployeeModule,
  MenuListModule,
  AddAtomicApiModule,
  AddAtomicCategoryModule,

  AtomicApiListModule,
  AtomicLayerApiDocsListModule,
  RoleMenuManagerModule,
  UserRoleManagementModule,
  NodeRoleManagement,

  EmployeeNodeManagerModule,
  AddAggregationApiDocsModule,
  MenuActionManagerModule,

  EditOrganizationStructureModule,
  EditRoleModule,
  EditMenuModule,
  EmployeeListModule,
  EditEmployeeModule,

  AggregationLayerApiDocsListModule,
  EditAtomicApiModule,
  AtomicApiCategoryListModule,
  EditAtomicApiCategoryModule,
  AggregationLayerApiDocsListManagerModule,

  EditAggregationLayerApiDocsModule,
  AddAggregationApiDocsCategoryModule,
  AggregationApiDocsCategoryListModule,
  EditAggregationApiDocsCategoryModule,
  OrganizationalStructureGraphicalModule,

  AggregationServerListModule,
  AddAggregationServerModule,
  EditAggregationServerModule
}