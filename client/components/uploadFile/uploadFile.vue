<template>
  <div class="componentsUploadFileBox">
    <i class="fa fa-plus fa-lg"></i>
    <input type="file" @change="uploadFileChange($event)">
    <span v-if="fileName.length > 0">{{fileName}}</span>
    <span v-if="fileName.length <= 0">请选择要上传的文件内容</span>
  </div>
</template>
<script>
export default {
  name: "UploadFile",
  props: {
   fileName : {
    type     : String,
    required : true
   }
  },
  data(){
    return {
      
    }  
  },
  mounted() {

  },
  methods: {
    uploadFileChange(e){
      this.$emit('uploadFileChange',e);
    }
  }
};
</script>

<style lang="stylus" scoped>
.componentsUploadFileBox {
        width 240px
        text-align center
        position relative
        cursor pointer
        height 50px
        border 1px dashed #eee
        background #f5f5f5
        border-radius 5px
        overflow hidden

        span {
          display block
          width 170px
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          height 50px
          padding-left 10px
          padding-right 20px
          text-align center
          line-height 50px
          background #e5e5e5
          font-size 14px
          font-weight bold
          position absolute
          top 0px
          left 50px
        }

        i {
          position absolute
          left 15px
          top 15px
          font-size 30px
          color #ccc
        }

        input {
            position absolute
            left 0px
            top 0px
            width 100%
            height 100%
            background red
            z-index 9999
            cursor pointer
            opacity 0.01
        }

    }
</style>

