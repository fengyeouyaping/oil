<template>
<transition name="el-fade-in-linear">
  <div class="componentsCropperImageBox" v-if="isShowCropperImageBox">
    <div class="componentsCropperCloseBtn" @click="componentsCropperCloseClick"><i class="fa fa-times-circle fa-lg"></i></div>
    <div class="cropperImageMain">
      <div class="cropperImageContent">
        <vue-cropper ref="cropper" 
          :img="imgUrl" 
          :output-size="option.size" 
          :output-type="option.outputType" 
          :info="true" 
          :full="option.full"
          :can-move="option.canMove" 
          :can-move-box="option.canMoveBox" 
          :fixed-box="option.fixedBox" 
          :original="option.original"
          :auto-crop="option.autoCrop" 
          :auto-crop-width="option.autoCropWidth" 
          :auto-crop-height="option.autoCropHeight" 
          :center-box="option.centerBox"
          :high="option.high"
        ></vue-cropper>
      </div>
      <div class="cropperImageActionBox">
        <div class="cropperImagePreview">
          <div class="cropperImagePreviewContent">
            <img v-if="modelSrc" :src="modelSrc" />
            <span v-if="!modelSrc">您还未对图片进行裁切操作</span>
          </div>
        </div>
        <div class="cropperImageBtn">
          <div class="cropperImageToolBox">
            <div class="cropperImageToolItem" @click="cropperDownLoadClick">下载图片</div>
            <div class="cropperImageToolItem" @click="refreshCropClick">刷新裁切</div>
            <div class="cropperImageToolItem" @click="positiveRotaClick">正向旋转</div>
            <div class="cropperImageToolItem" @click="reverseRotaClick">反向旋转</div>
            <div class="cropperImageToolItem" @click="changeScaleClick(1)">放大图片</div>
            <div class="cropperImageToolItem" @click="changeScaleClick(-1)">缩小图片</div>
          </div>
          <div class="cropperImageEndBtn">
            <div class="cropperImageEndBtnItem" @click="cropperImageClick" style="border-right:1px solid #eee">裁切图片</div>
            <div class="cropperImageEndBtnItem" @click="submitCropperImage">确认使用</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</transition>  
</template>

<script>
export default {
  name: "CropperImage",
  props: {
    imgUrl : {
      type : String,
      required : true
    },
    cropperImageResult : {
      type: Function,
      required: true
    }
  },
  data(){
    return {
        isShowCropperImageBox:true,
        modelSrc: '',
        crap: false,
        previews: {},
        option: {
          img : "http://127.0.0.1:8008/images/duanxinfuwu.png",
          size: 1,
          full: false,
          outputType: 'png',
          canMove: true,
          fixedBox: false,
          original: false,
          canMoveBox: true,
          autoCrop: true,
          autoCropWidth: 200,
          autoCropHeight: 200,
          centerBox: false,
          high: true
        },
        show: true
    }  
  },
  mounted() {},
  methods: {
    componentsCropperCloseClick(){
      this.isShowCropperImageBox = false;
    },
    //裁切执行
    cropperImageClick(){
      this.$refs.cropper.getCropBlob((data) => {
        var img = window.URL.createObjectURL(data)
        this.modelSrc = img
      })
    },
    //下载图片
    cropperDownLoadClick(){

       //判断是否执行了裁切
       if(this.modelSrc == ''){
         this.$myPop.WarningMessage("请先对图片进行裁切操作");
         return;
       }

       var aLink = document.createElement('a')
       aLink.download = 'E-D'
       this.$refs.cropper.getCropBlob((data) => {
        this.downImg = window.URL.createObjectURL(data)
        aLink.href = window.URL.createObjectURL(data)
        aLink.click()
      })
    },
    //刷新裁切
    refreshCropClick(){
      this.$refs.cropper.refresh()
    },
    //正向旋转
    positiveRotaClick(){
      this.$refs.cropper.rotateLeft()
    },
    //反向旋转
    reverseRotaClick(){
      this.$refs.cropper.rotateRight()
    },
    //图片大小
    changeScaleClick(num){
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    //确认使用
    submitCropperImage(){

      //获取原始图片的名称
      var oldImgName = this.option.img.split("/");
      var newImgName = oldImgName[oldImgName.length - 1];

      //判断是否执行了裁切
      if(this.modelSrc == ''){
        this.$myPop.WarningMessage("请先对图片进行裁切操作");
        return;
      }

      this.$refs.cropper.getCropData((dataurl) => {

        //将base64格式转化为file格式  
        var arr = dataurl.split(','),mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
          u8arr[n] = bstr.charCodeAt(n);
        }

        //获取当前时间戳
        var timestamp = (new Date()).valueOf();

        var imageFile = new File([u8arr], timestamp + "_cropper_" + newImgName, {type:mime});
        this.isShowCropperImageBox = false;
        this.$emit("cropperImageResult",imageFile);
        
      })
    }
  }
};
</script>

<style lang="stylus" scoped>

  .componentsCropperCloseBtn {
    width 50px
    height 50px
    position absolute
    left 50%
    bottom 10%
    text-align center
    line-height 50px
    margin-left -25px

    i {
      font-size 50px
      cursor pointer
      color #fff

      &:hover {
        color #ccc
      }
    }

  }

  .componentsCropperImageBox {
    position fixed
    left 0px
    top 0px
    width 100%
    height 100%
    background-color rgba(0,0,0,0.7)
    z-index 999999
  }

  .cropperImageMain {
    width 900px
    height 520px
    background #fff
    position absolute
    left 50%
    top 50%
    margin-left -450px
    margin-top -300px
    box-shadow: 0 2px 12px 0 rgba(255,255,255,.2);
    overflow hidden
  }

  .cropperImageContent {
    width 600px
    height 520px
    background red
    float left
  }

  .cropperImageActionBox{
    width 300px
    height 520px
    background #ccc
    border-left 2px solid #ccc
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    float right
  }

  .cropperImagePreview {
    width 300px
    height 260px
    text-align center
    background red
  }

  .cropperImagePreviewContent {
    width 100%
    height 100%
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC");

    span {
      font-size 14px
      float left
      margin-left 18%
      background-color rgba(0,0,0,0.4)
      color #fff
      padding 20px
      margin-top 30%
      border-radius 5px
    }

    img {
      width 90%
      height 90%
      float left 
      object-fit contain
      margin-left 6%
      margin-top 4%
    }
  }

  .cropperImageBtn {
    width 300px
    height 260px
    border-top 2px solid #ccc
    background #fff
    position relative
  }

  .cropperImageToolBox {
    width 100%
    height 180px
  }

  .cropperImageToolItem {
    width 42%
    height 45px
    cursor pointer
    background #f5f5f5
    border-radius 5px
    border 1px solid #eee
    float left
    margin 3.3%
    text-align center
    line-height 45px
    margin-top 4%
    font-weight bold

    &:hover {
      background #eee
    }
  }

  .cropperImageEndBtn {
    width 100%
    height 50px
    background #3385ff
    color #fff
    bottom 0px
    line-height 50px
    cursor pointer
    text-align center
    font-size 14px
    letter-spacing 1px
    position absolute

    
  }

  .cropperImageEndBtnItem {
    width 50%
    float left 
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -o-box-sizing: border-box;
    -ms-box-sizing: border-box;
    height 50px

    &:hover {
      background #1f66dc
    }
  }
</style>