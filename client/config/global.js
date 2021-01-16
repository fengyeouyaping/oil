/** 
 * 全局常量配置文件
 **/
var GLOBAL = {}

//聚合层服务器地址
GLOBAL.httpServer = "http://127.0.0.1:9000"
//websocket地址
GLOBAL.wsAdd = 'ws://127.0.0.1:9000'
//图片文件地址
GLOBAL.httpServerImg = "http://127.0.0.1:9000"
//列表页每页显示的默认条数
GLOBAL.pageLimit  = 10
//网络请求超时时间
GLOBAL.networkTimeout = 30000










//底层服务 业务相关不需要修改一下内容

//是否记录操作日志
GLOBAL.isRecordLogs = false

//dev-server服务地址
GLOBAL.devServer  = "http://127.0.0.1:8000"

//文件服务器地址（当方式为EasyD时配置，文件服务的地址）
GLOBAL.fileServer  = "http://127.0.0.1:8008"

//阿里文件上传相关配置
GLOBAL.aliyunOssServer = ""
GLOBAL.aliyunOssRegion = ""
GLOBAL.aliyunOssBucket = ""

//编辑时markdown工具栏
GLOBAL.markdownToolbars = {
      bold: true, // 粗体
      italic: true, // 斜体
      header: true, // 标题
      underline: true, // 下划线
      strikethrough: true, // 中划线
      mark: true, // 标记
      superscript: true, // 上角标
      subscript: true, // 下角标
      quote: true, // 引用
      ol: true, // 有序列表
      ul: true, // 无序列表
      code: true, // code
      table: true, // 表格
      fullscreen: true, // 全屏编辑
      readmodel: true, // 沉浸式阅读
      htmlcode: true, // 展示html源码
      help: true, // 帮助
      undo: true, // 上一步
      redo: true, // 下一步
      trash: true, // 清空
      alignleft: true, // 左对齐
      aligncenter: true, // 居中
      alignright: true, // 右对齐
      subfield: true, // 单双栏模式
      preview: true, // 预览
}


export default GLOBAL