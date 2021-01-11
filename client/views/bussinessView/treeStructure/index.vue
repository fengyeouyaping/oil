<template>
    <div class="realTimeData">
        <div class="left">
            <!-- <el-input placeholder="输入关键字进行过滤" v-model="filterText" suffix-icon="el-icon-search"></el-input> -->
            <div class="left_title">
                <i class="el el-icon-circle-plus-outline" title="添加根群组" @click="isAddTree = 1" v-if="ifShow(0)"></i>
                <i class="el el-icon-share" title="添加节点群组" @click="isAddTree = 2" v-if="isCanAddSonTree && ifShow(0)"></i>
                <i class="el el-icon-delete-solid" title="删除群组" v-if="isCanAddSonTree && ifShow(1)" @click="deleteInfo()"></i>
                <i class="el el-icon-edit" title="编辑群组" v-if="isCanAddSonTree" @click="editorTree()"></i>
            </div>
            <el-tree class="filter-tree" :data="data" :props="defaultProps" default-expand-all :expand-on-click-node="false" :filter-node-method="filterNode" @node-click="change" ref="tree"></el-tree>
        </div>
        <div class="content">
            <div class="header">
                <el-input placeholder="输入关键字" v-model="filterText" size="small" suffix-icon="el-icon-search"></el-input>
                <el-button @click="initDatas()" size="small" type="primary" style="margin-left:20px">搜索</el-button>
            </div>
            <div class="figure">
                <el-table :data="tableData" class="tableData" height="100%" :stripe="true">
                    <el-table-column prop="id" label="序号"></el-table-column>
                    <el-table-column prop="name" label="节点名称"></el-table-column>
                    <el-table-column prop="comment" label="备注"></el-table-column>
                    <!-- <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.modelFlag" :active-value="1" :inactive-value="2" active-color="#13ce66" inactive-color="#999999" @change="getChange(scope.row)"></el-switch>
                        </template>
                    </el-table-column> -->
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
        <!-- 添加根群组 -->
        <div class="mask" v-if="isAddTree">
            <div class="margin">
                <i class="el el-icon-circle-close close" @click="isAddTree = false"></i>
                <div class="header">{{isAddTree === 1 ? `添加根群组` : `添加节点群组`}}</div>
                <div class="from">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="群组名称" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                         <el-form-item label="群组描述">
                            <el-input type="textarea" v-model="ruleForm.note"></el-input>
                        </el-form-item>
                        
                        <el-form-item class="button">
                            <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
                            <el-button @click="resetForm('ruleForm')">取消</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
        <!-- 编辑根群组 -->
        <div class="mask" v-if="isEditorTree">
            <div class="margin">
                <i class="el el-icon-circle-close close" @click="isEditorTree = false"></i>
                <div class="header">编辑群组</div>
                <div class="from">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="群组名称" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                         <el-form-item label="群组描述">
                            <el-input type="textarea" v-model="ruleForm.comment"></el-input>
                        </el-form-item>
                        
                        <el-form-item class="button">
                            <el-button type="primary" @click="submitEditor('ruleForm')">确认</el-button>
                            <el-button @click="resetForm('ruleForm')">取消</el-button>
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

        isAddTree:false,
        isEditorTree:false,
        isCanAddSonTree:false,
        filterText: '',
        tableData: [],
        data: [],
        defaultProps: {
          children: 'nodeList',
          label: 'name'
        },
        ruleForm: {
          name: '',
          note: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入群组名称', trigger: 'blur' },
            { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur' }
          ],
          note: [
            { required: true, message: '请输入群组描述', trigger: 'blur' },
            { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
          ],
        },
        newData:{}
      };
    },
    computed: {
        ...mapState({
            taskbars           : state => state.MenuModule.taskbars
        })
    },
    watch: {
      tableData(val) {
        this.total = val.length;
      },
    },
    mounted(){
      this.initData()
    },

    methods: {
        // getChange(data){
        //     var params = {
        //         comment : data.comment,
        //         name : data.name,
        //         id : data.id,
        //         modelFlag:data.modelFlag
        //     }
        
        //     this.$http.postHttp(this.$API.nodeUpdate,params,(data)=>{
        //         this.$notify({
        //             title: '树结构修改成功',
        //             message: '',
        //             type: 'success'
        //             });
        //         this.initData()

        //     })
        // },
        ifShow(index){
            return this.taskbars[1]['childMenus'][0]['childMenus'][index]['visible']
        },
      //列表数据
      initData(){
    
        this.$myLoading.startLoading()
        this.$http.postHttp(this.$API.deviceListAll,{},(rs)=>{
            this.data = rs.data.nodes
            this.tableData = this.data[0] && this.data[0].nodeList ? this.data[0].nodeList : []
            this.$myLoading.endLoading()

        })
      },
      //搜索列表页
      initDatas(){
          this.tableData = this.tableData.filter((item) => !this.filterText || item.name.indexOf(this.filterText) != -1)
      },
      //当前页数
        handleCurrentChange(val){
            this.pageNum = val
            this.initData()
        },
        change(data){
            this.newData = data
            this.tableData = this.newData.nodeList ? this.newData.nodeList : []
            this.isCanAddSonTree = true
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        //删除节点信息
        deleteInfo(){
            let title = "确定要删除"+this.newData.name+"和下属的节点吗？"
            this.$confirm(title, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$myLoading.startLoading()

                this.$http.getHttp(this.$API.nodeDelete+"?id="+this.newData.id,(data)=>{
                    this.newData = {}
                    this.isCanAddSonTree = false
                    this.$notify({
                        title: '删除成功',
                        message: '',
                        type: 'success'
                    });
                    this.initData()
                    this.$myLoading.endLoading()
                })
            }).catch(() => {});
        },
        //添加节点
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                if(this.isAddTree != 1 && this.newData.level + 1 > 2){
                    this.$notify({
                        title: '路线下面不可以添加节点，如想添加设备，请移步至设备列表',
                        message: '',
                        type: 'warning'
                    });
                    return false
                }
                var params = {
                    comment : this.ruleForm.note,
                    name : this.ruleForm.name,
                    parentId : this.isAddTree == 1 ? 0 : this.newData.id,
                    level : this.isAddTree == 1 ? 0 : this.newData.level + 1
                }

                this.$myLoading.startLoading()
                this.$http.postHttp(this.$API.nodeAdd,params,(data)=>{
                    this.$notify({
                        title: '树结构添加成功',
                        message: '',
                        type: 'success'
                    });
                    this.isAddTree = false
                    this.initData()
                    this.ruleForm= {
                        name: '',
                        note: '',
                    }
                    this.newData = {}
                    this.isCanAddSonTree = false
                    this.$myLoading.endLoading()

                })
                
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm() {
            this.isAddTree = false
            this.isEditorTree = false
            this.ruleForm= {
                name: '',
                note: '',
            }
        },
        //编辑群组信息
        editorTree(){
            this.ruleForm = {
                id: this.newData.id,
                name: this.newData.name,
                comment: this.newData.comment,
            }
            this.isEditorTree = true
        },
        submitEditor(formName){
            this.$refs[formName].validate((valid) => {
            if (valid) {
                var params = {
                    comment : this.ruleForm.comment,
                    name : this.ruleForm.name,
                    id : this.ruleForm.id
                }
            
                this.$myLoading.startLoading()
                this.$http.postHttp(this.$API.nodeUpdate,params,(data)=>{
                    this.$notify({
                        title: '树结构修改成功',
                        message: '',
                        type: 'success'
                        });
                    this.isEditorTree = false
                    this.initData()
                    this.ruleForm= {
                        name: '',
                        note: '',
                    }
                    this.newData = {}
                    this.isCanAddSonTree = false
                    this.$myLoading.endLoading()

                })
                
            } else {
                console.log('error submit!!');
                return false;
            }
            });
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
    right 0
    .margin{
        width 400px
        background #ffffff
        border-radius 5px
        margin 100px auto  
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
    overflow hidden
    .left{
        min-width 300px
        padding 20px 10px 20px 10px
        border-right 10px solid #f5f2f2
        overflow hidden
        .left_title{
            font-size 18px
            margin-bottom 20px
            display flex
            justify-content space-around
        }
    }
    .content{
        flex 1
        overflow auto
        .header{
            padding 20px 20px 10px
            .el-input{
                width 240px
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