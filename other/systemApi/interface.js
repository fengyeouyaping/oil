exports.useSystemInterface = function (app) {

  var bodyParser = require('body-parser');
  var fs = require('fs');
  var path = require('path');

  //设置参数以及返回值的解析方式
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ 
    extended: true 
  }));

  //设置通用返回值方法
  function responseResult(success,res,data){

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Accept,X-Requested-With,Is-Admin,Action-Ids");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS,HEAD");
    res.send({success:success,result:data})

  }

  //递归创建目录-异步方法  
  function mkdirs(dirname, callback) {  
    fs.exists(dirname, function (exists) {  
        if (exists) {  
            callback();  
        } else {  
            mkdirs(path.dirname(dirname), function () {  
                fs.mkdir(dirname, callback);  
            });  
        }
    });  
  } 
  
  //读取文件内容
  app.post('/getFileContent',function(req,res){

    //获取请求参数
    var bodyParams = req.body;

    fs.readFile(bodyParams.filePath,"utf-8",function(err,data){
      if(err){
        return responseResult(false,res)
      }

      //拷贝原文件一份作为还原备份
      fs.writeFileSync('./tmp/editCode_bak.vue',fs.readFileSync(bodyParams.filePath));

      return responseResult(true,res,data)
      
    })


  })

  //将内容写入文件
  app.post('/writeFileContent',function(req,res){

    //获取请求参数
    var bodyParams = req.body;

    fs.writeFile(bodyParams.filePath,bodyParams.textContent,function(err){
      if(err){
        return responseResult(false,res)
      }
      return responseResult(true,res)
    })

  })

  //创建菜单目录
  app.post('/createMenuDir',function(req,res){

    //获取请求参数
    var bodyParams = req.body;

    //创建目录
    if(bodyParams.level != 3 & bodyParams.level != 2){

      mkdirs(bodyParams.menuPath,function(){
        return responseResult(true,res)
      })

    //拷贝模板文件
    }else{
      
      //获取要创建的目录路径
      var createDir = path.dirname(bodyParams.menuPath)

      //创建目录
      mkdirs(createDir,function(){

        //创建文件
        fs.writeFileSync(bodyParams.menuPath,fs.readFileSync('./template/pageTemplate.vue'));
        return responseResult(true,res)

      })
    }

  })
}