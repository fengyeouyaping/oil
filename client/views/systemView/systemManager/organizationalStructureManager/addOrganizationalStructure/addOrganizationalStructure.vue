<template>
   <div>
     <el-form :model="ruleForm" :rules="rules" label-position="left" ref="ruleForm" label-width="160px">
       <el-form-item label="选择节点：" prop="nameParent" v-if="organizationalData.length > 0">
          <el-col :span="8">
            <el-cascader
              placeholder="请选择所属节点"
              v-model="ruleForm.nameParent"
              :options="organizationalData"
              change-on-select>
           </el-cascader>
          </el-col>
       </el-form-item>
       <el-form-item label="节点名称：" prop="nodeName">
          <el-col :span="8">
            <el-input v-model="ruleForm.nodeName" placeholder="请输入节点名称"></el-input>
          </el-col>
          <el-col :span="12">
            <span style="color:red;margin-left:10px;" v-if="organizationalData.length <= 0">注：您当前创建的为根节点，例如：可以将公司名作为根节点</span>
          </el-col>
       </el-form-item>
       <el-form-item label="是否继承上级权限" prop="isInherit">
          <el-switch v-model="ruleForm.isInherit"></el-switch>
       </el-form-item>
       <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
     </el-form>
   </div>
</template>

<script>

import { mapState,mapMutations } from 'vuex'

export default {
  data() {
    return {
      rules: {
          nodeName: [
            { required: true, message: '请输入节点名称', trigger: 'blur' }
          ],
          nameParent: [
            { required: true, message: '请选择所属节点', trigger: 'change' }
          ],
      }
    }
  },
  computed: {
    ...mapState({
       ruleForm           : state => state.AddOrganizationStructureModule.ruleForm,
       organizationalData : state => state.AddOrganizationStructureModule.organizationalData
    })
  },
  mounted(){

    //获取组织架构信息
    this.initOrganizationData()

  },
  methods: {
    ...mapMutations(['clearForm', 'AddOrganizationStructureModule/clearForm']),
    ...mapMutations(['updateOrganziational', 'AddOrganizationStructureModule/updateOrganziational']),
    
    initOrganizationData(){

      //获取组织架构信息
      this.$http.getHttp(this.$API.organizationalStructureSearch,(rs) => {
          this['AddOrganizationStructureModule/updateOrganziational'](this.$common.arrayOrganizationalStructure(rs.data))
      })

    },
    
    submitForm(formName) {

      this.$refs[formName].validate((valid) => {
          if (valid) {

            var addParams = null;

            //判断是否为根节点
            if(this.organizationalData.length <= 0){

              addParams = {
                os_name : this.ruleForm.nodeName,
                os_is_inherit : "0",
                os_path : "0,",
                os_fid  : "0"
              }
              
            }else{

              addParams = {
                os_name : this.ruleForm.nodeName,
                os_is_inherit : this.ruleForm.isInherit ? "1" : "0",
                os_path : this.ruleForm.nameParent[this.ruleForm.nameParent.length - 1] ? "0," + this.ruleForm.nameParent.join(',')+"," : "0,",
                os_fid  : this.ruleForm.nameParent[this.ruleForm.nameParent.length - 1] ? this.ruleForm.nameParent[this.ruleForm.nameParent.length - 1] : 0
              }

            }

            
            this.$myLoading.startLoading()
            this.$http.postHttp(this.$API.organizationalStructureAdd,addParams,(rs) => {
              this.$myLoading.endLoading()
              this.$myPop.SuccessMessage()

               this['AddOrganizationStructureModule/clearForm']()
               this.initOrganizationData()

            })
            
          } else {
            return false;
          }
        })

    },
    resetForm() {
        this['AddOrganizationStructureModule/clearForm']()
    }
  }
};
</script>

<style>

</style>
