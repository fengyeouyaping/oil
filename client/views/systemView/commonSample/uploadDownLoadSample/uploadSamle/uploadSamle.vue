<template>
  <div>
    <div class="sampleItem">
      <div class="sampleTitleBox" style="margin:0px;">
        <div class="sampleTitle">示例一：上传图片</div>
      </div>
      <div class="sampleContentBox">
        <upload-image :preview="previewImage" v-on:cropperImage="cropperImageClick" v-on:uploadImageChange="uploadImageChange"></upload-image>
      </div>
      <div class="sampleContentBox">
        <div class="sampleContent" id="markdown_1"></div>
      </div>

      <div class="sampleTitleBox" style="margin-top:50px;">
        <div class="sampleTitle">示例二：上传文件</div>
      </div>
      <div class="sampleContentBox">
        <upload-file :fileName="uploadFile" v-on:uploadFileChange="uploadFileChange"></upload-file>
      </div>
      <div class="sampleContentBox">
        <div class="sampleContent" id="markdown_2"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  //数据源
  data() {
    return {
      //预览图
      previewImage: "",
      uploadFile: "",
      isShowCropper : false,

      markdown_1: [
        "#### 调用方式：",
        "```HTML",
        '<upload-image :preview="previewImage" v-on:cropperImage="cropperImageClick" v-on:uploadImageChange="uploadChange"></upload-image>',
        "```",
        "#### 参数说明：",
        '<p style="margin-top:10px">事件 uploadImageChange ：点击上传后的事件函数 ，事件参数1：返回文件对象</p>',
        '<p style="margin-top:10px">事件 cropperImage ：点击触发裁切事件，如需要进行裁切操作，可以调用E-D提供的裁切组件，在回调事件中使用如下方法：</p>',
        '<p style="margin-top:10px">属性 preview：预览的图片地址</p>',
        '<p style="margin-top:10px"></p>',
        '#### 裁切调用方式：',
        '```javascript',
        'this.$cropperImage({',
        ' //裁切完成后回调函数',
        ' cropperImageResult(file){',
        '    //file为裁切完成后的图片对象',
        ' },',
        ' //要裁切的图片地址',
        ' imgUrl:"http://127.0.0.1:8008/images/1.png"',
        '})',
        '```'
      ].join("\n"),

        markdown_2: [
        "#### 调用方式：",
        "```HTML",
        '<upload-file :fileName="uploadFile" v-on:uploadFileChange="uploadFileChange"></upload-file>',
        "```",
        "#### 参数说明：",
        '<p style="margin-top:10px">事件 uploadFileChange：点击上传后的事件函数 ，事件参数1：返回文件对象</p>',
        '<p style="margin-top:10px">属性 fileName：上传后的文件名</p>'
      ].join("\n")

    };
  },
  //初始化函数
  mounted() {
    
    var converter = new showdown.Converter();
    var htmlcontent_1 = converter.makeHtml(this.markdown_1);
    var htmlcontent_2 = converter.makeHtml(this.markdown_2);
    $("#markdown_1").html(htmlcontent_1);
    $("#markdown_2").html(htmlcontent_2);
    $("pre code").each(function(i, block) {
      hljs.highlightBlock(block);
    });
  },
  //计算属性
  computed: {},
  //组件方法
  methods: {
    uploadImageChange(e) {

      var fileObj = e.target.files[0];
      this.$http.Aliyun_uploadImageHttp(fileObj, {}, rs => {
        this.previewImage = rs.result.url;
      });

    },

    uploadFileChange(e) {
      var fileObj = e.target.files[0];
      this.$http.ED_uploadFileHttp(fileObj, {}, rs => {
        this.uploadFile = fileObj.name;
      });
    },

    cropperImageClick(){
      
      var that = this;
      this.$cropperImage({
        //裁切完成后回调函数
        cropperImageResult(file){
          that.$http.EasyD_uploadImageHttp(file, {}, rs => {
            that.previewImage = rs.result.url;
          });
        },
        //要裁切的图片
        imgUrl:this.previewImage
      })

    },
    cropperImageChange(data){

      this.$http.EasyD_uploadImageHttp(data, {}, rs => {
        this.previewImage = rs.result.url;
      });

    }
  }
};
</script>

<style lang="stylus" scoped>
.sampleItem {
  width: 100%;
  height: auto;
  padding-left: 5px;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;

  .sampleTitleBox {
    width: 100%;
    margin-top: 20px;
    height: auto;
  }

  .sampleTitle {
    width: auto;
    font-size: 16px;
    font-weight: bold;

    i {
      font-size: 12px;
      color: orange;
      margin-right: 5px;
      position: relative;
      top: -2px;
    }
  }

  .sampleContentBox {
    width: 100%;
    height: auto;
    margin-top: 10px;

    .sampleContent {
      width: 100%;
      background: #f5f5f5;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
      -o-box-sizing: border-box;
      -ms-box-sizing: border-box;
      padding: 10px;
      border-radius: 5px;
    }
  }
}
</style>