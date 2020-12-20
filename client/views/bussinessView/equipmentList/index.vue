<template>
    <div class="realTimeData">
        <div class="left">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="small" suffix-icon="el-icon-search"></el-input>
            <div class="left_title">公司信息</div>
            <el-tree class="filter-tree" :data="data" :props="defaultProps" default-expand-all :expand-on-click-node="false" :filter-node-method="filterNode" ref="tree" @node-click="nodeClick"></el-tree>
        </div>
        <div class="content">
            <div class="header">
                <div>
                    <el-input placeholder="请输入设备编码" v-model="lastFilterText" size="small" suffix-icon="el-icon-search"></el-input>
                    <el-button @click="initDatas()" size="small" type="primary" style="margin-left:20px">搜索</el-button>
                </div>
                
                <div>
                    <i class="el el-icon-download" title="导出模版" v-if="ifShow(3)" @click="fileExport"></i>
                    <el-upload
                        class="upload-demo"
                        :show-file-list="false"
                        :action="$global.httpServer + $API.fileUploadImport"
                         v-if="ifShow(3)">
                        <i class="el el-icon-upload2" title="列表导入"></i>
                    </el-upload>
                    <i class="el el-icon-circle-plus-outline" title="添加设备" @click="isAddInfo = true;isAdd = true" v-if="ifShow(0)"></i>
                </div>
            </div>
            <div class="figure">
                <el-table :data="tableData" class="tableData" style="width:100%" height="100%" :stripe="true">
                    <el-table-column prop="sortId" label="序号"></el-table-column>
                    <el-table-column prop="devGuid" label="设备ID" width=150></el-table-column>
                    <el-table-column prop="stake" label="测试桩号"></el-table-column>
                    <el-table-column label="经纬度" width="200">
                        <template slot-scope="scope">
                            <span>{{`${scope.row.lon},${scope.row.lat}`}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="status" label="状态" width=80></el-table-column>
                    <el-table-column prop="batt" label="电量"></el-table-column>
                    <el-table-column prop="time" label="最后一次通信时间" width="180"></el-table-column>
                    <el-table-column prop="remark" label="备注"></el-table-column>
                    <el-table-column label="操作" fixed="right">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row,2)" type="text" size="small" v-if="ifShow(2)">编辑</el-button>
                            <el-button @click="handleClick(scope.row,1)" type="text" size="small" v-if="ifShow(2)">详情</el-button>
                            <el-button @click="handleClick(scope.row,3)" type="text" size="small" v-if="ifShow(1)">删除</el-button>
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
        <!-- 添加设备 -->
        <div class="mask" v-if="isAddInfo">
            <div class="margin">
                <i class="el el-icon-circle-close close" @click="isAddInfo = false"></i>
                <div class="header">{{isAdd ? '添加设备' : '编辑设备'}}</div>
                <div class="from">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="设备ID" prop="name">
                            <el-input v-model="ruleForm.id"></el-input>
                        </el-form-item>
                        <el-form-item label="测试桩号">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="序号">
                            <el-input v-model="ruleForm.sortId"></el-input>
                        </el-form-item>
                        <el-form-item label="经纬度">
                            <el-input v-model="ruleForm.latitudeLlongitude" placeholder="请以英文状态下的‘,’隔开，经度在前，纬度在后"></el-input>
                        </el-form-item>
                        <el-form-item label="选择路线" prop="name">
                            <el-cascader :options="options" :multiple="false" @change="cascaderChange" :show-all-levels="false"></el-cascader>
                        </el-form-item>
                         <el-form-item label="备注">
                            <el-input type="textarea" v-model="ruleForm.note"></el-input>
                        </el-form-item>
                        
                        <el-form-item class="button">
                            <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
                            <el-button @click="isAddInfo = !isAddInfo">取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {
      return {
          total:0,
          pageNum:1,
          isAddInfo:false,
          isAdd:true,//是否是编辑
        filterText: '',
        lastFilterText:'',
        isCanOperate:false,
        tableData: [],
        data: [],
        options: [],
        defaultProps: {
          children: 'nodeList',
          label: 'name'
        },
        ruleForm: {
            id: '',
            name: '',
            latitudeLlongitude:'',
            route:'',
            note: '',
            sortId:''
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
        lineList:[],
        nodeid:''
      };
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    computed: {
        ...mapState({
            taskbars           : state => state.MenuModule.taskbars
        }),
    },
    mounted(){
        this.company()
    },

    methods: {
        ifShow(index){
            return this.taskbars[1]['childMenus'][1]['childMenus'][index]['visible']
        },
        //搜索
        initDatas(){
            this.initData()
        },
        //列表数据
      company(){
    
        this.$http.postHttp(this.$API.deviceListAll,{},(rs)=>{
            this.data = rs.data.nodes
            this.data.map((item) => {
                if(item.nodeList){
                    item.nodeList.map((itemite) => {
                        if(itemite.nodeList){
                            itemite.nodeList.map((childrenItem) => {
                                this.lineList.push(childrenItem)
                            })
                        }
                    })
                }
            })
            
            this.getOptions()
            this.nodeid = this.lineList[0]['id']
            this.initData()

        })
      },
      getOptions(){
          let result = []
            
            if(this.data && this.data.length > 0){
                let menuItemsss = (froum,lists=[]) => {
                    for(let i=0;i<froum.length;i++){
                        lists[i] = {
                            comment: froum[i]['comment'],
                            devices: froum[i]['devices'],
                            id: froum[i]['id'],
                            level: froum[i]['level'],
                            label: froum[i]['name'],
                            value:froum[i]['id'],
                            parentId: froum[i]['parentId'],
                            $treeNodeId: froum[i]['$treeNodeId'],
                        }
                        if(froum[i]['nodeList'] && froum[i]['nodeList'].length > 0){
                            lists[i]['children'] = menuItemsss(froum[i]['nodeList'])
                        }
                    }
                    return lists
                }
                result = menuItemsss(this.data)
            }
            this.options =  result
      },
      cascaderChange(data){
          this.ruleForm.route = data[data.length-1]
      },
        //列表数据
      initData(){
        var params = {
            devGuid:this.lastFilterText,
            nodeid:this.nodeid,
            pageNum : this.pageNum,
            pageSize : this.$global.pageLimit
        }
    
        this.$myLoading.startLoading()
        this.$http.postHttp(this.$API.deviceList,params,(data)=>{
          this.total = data.data.total
          this.tableData = data.data.list
          this.tableData.map((item) => {
                item.time = item.time ? this.$common.dateFormat("YYYY-MM-dd",item.time/1000) : ''
            })
          this.$myLoading.endLoading()

        })
      },
      //导出
    fileExport(){
        window.location = this.$global.httpServer + "/file/download?fileName=template.xls"
    },
      //导入设备列表
      fileUploadImport(){
    
        this.$myLoading.startLoading()
        this.$http.postHttp(this.$API.fileUploadImport,{},(data)=>{
          
          this.$myLoading.endLoading()

        })
      },
        //当前页数
        handleCurrentChange(val){
            this.pageNum = val
            this.initData()
        },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      handleClick(data,type){
          if(type == 1){
              this.$router.push({
                path: "/equipmentInfo",
                query:{
                    devGuid:data.devGuid
                }
              });
          }else if(type === 2){
            this.isAddInfo = true
            this.isAdd = false
            this.ruleForm = {
                route:data.nodeId,
                id:data.devGuid,
                latitudeLlongitude: `${data.lon},${data.lat}`,
                note:data.remark,
                name:data.stake,
                sortId:data.sortId,
            }
          }else if(type === 3){
                this.$confirm('确定删除此设备吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$myLoading.startLoading()

                    this.$http.getHttp(this.$API.deviceListDelete+"?devGuid="+data.devGuid,(data)=>{
                        this.initData()
                        this.$notify({
                            title: '删除成功',
                            message: '',
                            type: 'success'
                        });
                        this.$myLoading.endLoading()
                    })
                }).catch(() => {});
          }
      },
      //切换线路
      nodeClick(data){
          if(this.lineList.indexOf(data) != -1){
              this.nodeid = data.id
              this.initData()
          }
      },
      submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                if(this.ruleForm.latitudeLlongitude && this.ruleForm.latitudeLlongitude.split(',').length < 2){
                    this.$notify({
                        title: '请输入正确的经纬度',
                        message: '',
                        type: 'warning'
                    });
                    return
                }   
                var params = {
                    'nodeId':this.ruleForm.route,
                    "devGuid": this.ruleForm.id,
                    "lat": this.ruleForm.latitudeLlongitude.split(',')[1],
                    "lon": this.ruleForm.latitudeLlongitude.split(',')[0],
                    "remark": this.ruleForm.note,
                    "stake": this.ruleForm.name,
                }

                let url =this.isAdd ? this.$API.deviceAdd : this.$API.deviceUpdate
                this.$myLoading.startLoading()
                this.$http.postHttp(url,params,(data)=>{
                this.$notify({
                  title: this.isAdd ? '设备添加成功' : '设备编辑成功',
                  message: '',
                  type: 'success'
                });
                this.initData()
                this.isAddInfo = false
                this.ruleForm= {
                    id: '',
                    name: '',
                    latitudeLlongitude:'',
                    route:'',
                    note: '',
                    sortId:''
                },
                this.$myLoading.endLoading()
                })
                
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
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
        }
        .from{
            margin-top 20px
        }
    }
}
.realTimeData{
    display flex
    height 100%
    .left{
        min-width 200px
        padding 20px 10px 20px 10px
        border-right 10px solid #f5f2f2
        .left_title{
            font-size 14px
            margin-top 20px
            font-weight bold
        }
    }
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