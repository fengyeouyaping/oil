<template>
  <div class="componentsUploadImageBox">
    <i class="fa fa-plus fa-lg"></i>
    <input type="file" @change="uploadImageChange($event)">
    <img v-if="preview.length > 0" :src="preview">
    <div v-if="preview.length > 0" class="uploadImageCropperBox" @click="cropperClick">裁切图片</div>
  </div>
</template>

<script>
export default {
  name: "UploadImage",
  props: {
    preview : {
      type     : String,
      default  : "",
      required : false
    }
  },
  data(){
    return {
      
    }  
  },
  mounted() {

  },
  methods: {
    uploadImageChange(e){

      if(e.target.files.length <= 0){
        this.$myPop.WarningMessage("上传图片不能为空");
        return;
      }

      this.$emit('uploadImageChange',e);
    },
    cropperClick(){
      if(this.preview.length <= 0){
        this.$myPop.WarningMessage("请先上传要裁切的图片");
        return;
      }
      this.$emit('cropperImage');
    }
  }
};
</script>

<style lang="stylus" scoped>

.uploadImageCropperBox {
  position absolute
  left 5px
  bottom 5px
  width 60px
  height 25px
  background-color rgba(0,0,0,0.5)
  border-radius 5px
  text-align center
  z-index 102
  box-shadow 0 2px 12px 0 rgba(255,255,255,.9)
  color #fff
  line-height 25px

  &:hover {
    background-color rgba(0,0,0,0.7)
  }
}

.componentsUploadImageBox {
        width 150px
        text-align center
        position relative
        line-height 160px
        cursor pointer
        height 150px
        border 1px dashed #eee
        background #f5f5f5
        border-radius 5px
        overflow hidden

        input {
            position absolute
            left 0px
            top 0px
            width 100%
            height 100%
            background red
            z-index 101
            cursor pointer
            opacity 0.01
        }

        img {
            width 100%
            height 100%
            object-fit cover
            position absolute
            
            z-index 100
            left 0px
        }

        i {
            font-size 50px
            color #ccc
        }
    }
</style>

