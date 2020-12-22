<template>
    <div class="realTimeData">
        <div class="content">
            <div class="header">
                <div>
                    <el-input placeholder="请输入角色名称" v-model="filterText" size="small" suffix-icon="el-icon-search"></el-input>
                    <el-button @click="initDatas()" size="small" type="primary" style="margin-left:20px">搜索</el-button>
                </div>
                
                <div v-if="ifShow(0)">
                    <i class="el el-icon-circle-plus-outline" title="添加角色" @click="operati(1)"></i>
                </div>
            </div>
            <div class="figure">
                <el-table :data="tableData" class="tableData" style="width:100%" height="100%" :stripe="true">
                    <el-table-column prop="id" label="序号"></el-table-column>
                    <el-table-column prop="name" label="角色名称"></el-table-column>
                    <el-table-column prop="createDate" label="创建时间"></el-table-column>
                    <el-table-column prop="createName" label="创建人"></el-table-column>
                    <el-table-column label="操作" fixed="right">
                        <template slot-scope="scope">
                            <el-button @click="operati(2,scope.row)" type="text" size="small" v-if="ifShow(2)">编辑</el-button>
                            <el-button @click="operati(3,scope.row)" type="text" size="small" v-if="ifShow(1)">删除</el-button>
                            <el-button @click="operati(4,scope.row)" type="text" size="small" v-if="ifShow(3)">权限分配</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-pagination
                background
                :current-page="pageNum"
                :page-size="$global.pageLimit"
                @current-change="handleCurrentChange"
                layout="prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
        <!-- 添加角色 -->
        <div class="mask" v-if="isAddInfo">
            <div class="margin">
                <i class="el el-icon-circle-close close" @click="isAddInfo = false"></i>
                <div class="header">{{tipTitle}}</div>
                <div class="from">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForms" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="角色名称" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                         <el-form-item label="备注">
                            <el-input type="textarea" v-model="ruleForm.note"></el-input>
                        </el-form-item>
                        
                        <el-form-item class="button">
                            <el-button type="primary" @click="submitTop('ruleForms')">确认</el-button>
                            <el-button @click="isAddInfo = !isAddInfo">取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
        <div class="mask" v-if="isShowRote">
            <div class="margin">
                <i class="el el-icon-circle-close close" @click="cloneTip"></i>
                <div class="header">权限分配 -- 超级管理员</div>
                <!-- <div class="header bottom">
                    <p :class="isbtn ? 'active' : ''">系统功能</p>
                    <p :class="isbtn ? 'active' : ''">系统按钮</p>
                </div> -->
                <div class="from bottom">
                    
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <div class="tree">
                            <el-tree
                                :data="dataBtn"
                                show-checkbox
                                :props="defaultProps"
                                accordion
                                node-key="id"
                                :check-strictly="true"
                                :default-checked-keys="cheacedIdShow"
                                ref="tree"
                                @check="treeChange">
                            </el-tree>
                        </div>
                        
                        <el-form-item class="button">
                            <!-- <el-button type="primary" @click="lastData()" v-if='isbtn'>下一步</el-button> -->
                            <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
                            <el-button @click="cloneTip">取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import tab from "../../../config/tab.json"
export default {
    data() {
      return {
          total:0,
          pageNum:1,

          tipTitle:'',
          isbtn:true,
          isAddInfo:false,
          isShowRote:false,
          filterText: '',
          isCanOperate:false,
          newUpdataInfo:[],
          tableData: [],
          ruleForm: {
              id: '',
              name: '',
              latitudeLlongitude:'',
              route:'',
              note: '',
          },
          rules: {
              id: [
                  { required: true, message: '请输入设备ID', trigger: 'blur' },
                  { min: 1, max: 14, message: '长度在 1 到 14 个字符', trigger: 'blur' }
              ],
              name: [
                  { required: true, message: '请输入测试桩号', trigger: 'blur' },
                  { min: 1, max: 14, message: '长度在 1 到 14 个字符', trigger: 'blur' }
              ],
              latitudeLlongitude: [
                  { required: true, message: '请输入经纬度', trigger: 'blur' },
                  { min: 1, max: 14, message: '长度在 1 到 14 个字符', trigger: 'blur' }
              ],
              route: [
                  { required: true},
              ],
              note: [
                  { required: true, message: '请输入群组描述', trigger: 'blur' },
                  { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
              ],
          },
          dataBtn: [],
          defaultProps: {
            children: 'childMenus',
            label: 'menu'
          },
          roleAuthList:[],
          cheacedIdShow:[]

      };
    },
    mounted(){
      this.initData()
    },
    computed: {
        ...mapState({
            taskbars           : state => state.MenuModule.taskbars
        }),
    },
    methods: {
      ifShow(index){
          return this.taskbars[3]['childMenus'][0]['childMenus'][index]['visible']
      },
      initDatas(){
          this.pageNum = 1
          this.initData()
      },
      //列表数据
      initData(){
        var params = {
          pageNum : this.pageNum,
          pageSize : this.$global.pageLimit,
          roleName: this.filterText
        }
    
        this.$myLoading.startLoading()
        this.$http.postHttp(this.$API.roleList,params,(data)=>{
          this.total = data.data.total
          this.tableData = data.data.list
          this.tableData.map((item) => {
            item.createDate = this.$common.dateFormat("YYYY-MM-dd",item.createDate/1000)
          })
          this.$myLoading.endLoading()

        })
      },
      //当前页数
      handleCurrentChange(val){
          this.pageNum = val
          this.initData()
      },
      submitTop(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {

              if(this.tipTitle == "添加角色"){
                this.addInfo()
              }else if(this.tipTitle == "编辑角色"){
                this.updataInfo()
              }
                
            } else {
                return false;
            }
          });
          
        },
      treeChange(data,node){
        this.roleAuthList = node.checkedNodes
      },
      submitForm() {
        this.isbtn = true
        
        let params = {
          roleAuthList:[]
        }
        if(this.roleAuthList.length > 0){
          this.roleAuthList.map((item) => {
            params.roleAuthList.push(item.id)
          })
        }

        this.$http.postHttp(this.$API.roleAuthUpdate,params,(data)=>{
          this.$notify({
              title: '权限分配成功',
              message: '',
              type: 'success'
          });
          this.isShowRote = false
        })
        
      },
      cloneTip(){
          this.isShowRote = false
          this.isbtn = true
      },
      //编辑
      operati(type,item){
        if(type == 1){
          this.tipTitle = "添加角色"
          this.isAddInfo = true
        }else if(type == 2){
          this.getDatainfo(item)
          this.tipTitle = "编辑角色"
          this.newUpdataInfo = item
          this.ruleForm.id = item.id
          this.ruleForm.name = item.name
          this.isAddInfo = true
        }else if(type == 3){
          this.$confirm('确定删除此角色吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              this.$myLoading.startLoading()

              this.$http.getHttp(this.$API.roleDelete+"?id="+item.id,(data)=>{
                  this.initData()
                  this.$notify({
                      title: '删除成功',
                      message: '',
                      type: 'success'
                  });
                  this.$myLoading.endLoading()
              })
          }).catch(() => {});
        }else if(type == 4){
          this.getDatainfo(item)
          this.isShowRote = true
        }
        
      },
      //获取角色详情
      getDatainfo(item){
        this.$http.getHttp(this.$API.roleDetail+"?id="+item.id,(data)=>{
          this.newUpdataInfo = data.data.role
          this.getShowTreeId(data.data.roleAuthList)
          this.dataBtn =  this.menuUpdata(tab,data.data.roleAuthList,false)
        })
      },
      getShowTreeId(datas){
        let list = []
        for(let i in datas){
          let items = datas[i]
          if(items.visible){
            list.push(items.id)
          }
          if(items.childMenus && items.childMenus.length > 0){
            for(let j in items.childMenus){
              let item = items.childMenus[j]
              if(item.visible){
                list.push(item.id)
              }
              if(item.childMenus && item.childMenus.length > 0){
                for(let k in item.childMenus){
                  let ite = item.childMenus[k]
                  if(ite.visible){
                    list.push(ite.id)
                  }
                }
              }
            }
          }
        }
        this.cheacedIdShow = list

      },
      //修改角色信息
      updataInfo(){
        let params = {
          id:this.newUpdataInfo.id,
          name:this.ruleForm.name,
          comment:this.ruleForm.note
        }

        this.$http.postHttp(this.$API.roleUpdate,params,(data)=>{
          this.isAddInfo = false
          this.$notify({
              title: '角色修改成功',
              message: '',
              type: 'success'
          });
          this.initDatas()
        })
      },
      //添加角色信息
      addInfo(){
        let params = {
          name:this.ruleForm.name,
          comment:this.ruleForm.note,
        }

        this.$http.postHttp(this.$API.roleAdd,params,(data)=>{
          this.isAddInfo = false
          this.$notify({
              title: '角色添加成功',
              message: '',
              type: 'success'
          });
          this.initDatas()

        })
      },
      menuUpdata(tab,froum,type){
          if(froum && froum.length > 0){
              let result = this.menuItemsss(tab,froum,type)
              return result
          }else{
              return []
          }
      },
      menuItemsss(tab,froum,type){
          for(let i=0;i<tab.length;i++){
              for(let j=0;j<froum.length;j++){
                  if(tab[i]['menu'] == froum[j]['menu']){
                      tab[i] = {
                          "fatherId": froum[j]['fatherId'],
                          "id": froum[j]['id'],
                          "level": froum[j]['level'],
                          "menu": froum[j]['menu'],
                          "roleId": froum[j]['roleId'],
                          "visible": froum[j]['visible'],
                          "url":tab[i]['url'],
                          "m_icon":tab[i]['m_icon'],
                          "disabled": this.nameType(froum[j]['menu'],type),
                          "childMenus":tab[i]['childMenus']
                      }
                      if(tab[i]['childMenus']){
                          let tabItemss = tab[i]['childMenus'],froumItemss = froum[j]['childMenus']
                          this.menuItemsss(tabItemss,froumItemss,type)
                      }
                  }
              }
          }
          return tab
      },
      nameType(name,type)  {
          if(!type){
              return false
          }else{
              let names = ["编辑","删除","添加","给角色分配权限","列表导出","列表导入"]
              if(names.indexOf(name) != -1){
                  return true
              }else{
                  return false
              }
          }
      }
    },
}
</script>
<style lang="stylus" scoped>
.mask{
    position absolute
    width 100%
    height 100%
    margin-left -10px
    background rgba(0,0,0,0.3)
    z-index 10
    .margin{
        width 400px
        background #ffffff
        border-radius 5px
        margin 20% auto  
        padding 20px 
        position relative
        .close{
            position absolute
            top 10px
            right 10px
            font-size 25px
            color #999
        } 
        .header{
            font-size 18px
            color #333
            font-weight bold
            text-align center
            
            &.bottom{
                display flex
                justify-content center
                padding 0 20%
                margin-top 10px
                border-top 1px solid #eeeeee
                p{
                    flex 1
                    margin 10px 0
                    font-size 14px
                    height 30px
                    font-weight 400
                    border-bottom 1px solid #eeeeee
                    cursor pointer
                    &.active{
                        color rgb(50, 79, 196)
                    }
                }
            }
            
        }
        .from{
            margin-top 20px
            
        }
        .bottom{
            .tree{
                text-align center
                padding-left 100px    
            }
            .button{
                margin-top 50px 
            }   
        }
    }
}
.realTimeData{
    display flex
    height 100%
    .content{
        flex 1
        .header{
            padding 20px 20px 10px
            display flex
            align-items center
            justify-content space-between
            .el-input{
                width 240px
            } 
            div{
                display flex
                i{
                    font-size 18px
                    margin-left 20px
                    cursor pointer
                }
                
            }   
        }
        .figure{
            height 85%  
            padding 10px 20px
            .block{
                text-align center    
            }
        }
        
    }
}
.el-pagination{
    float none 
    margin 0 auto
    text-align center   
}
</style>