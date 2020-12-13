/**
 * 公共方法
 **/
var Publicethod = {}

//省市区节点扁平数组转树状数组
Publicethod.arrLocation = function(froum){
    for (let i in froum) {
        froum[i].value = froum[i].l_id;
        froum[i].label = froum[i].l_name;
    }
    let temp = {};
    let ans = [];
    for (let i in froum) {
        temp[froum[i].value] = froum[i];

    }
    for (let i in temp) {
        if (temp[i].l_fid != 0) {
            if (!temp[temp[i].l_fid].children) {
                temp[temp[i].l_fid].children = [];

            }
            temp[temp[i].l_fid].children.push(temp[i]);
        } else {
            ans.push(temp[i]);

        }
    }
    
    //加序号
    for(var ss=0;ss<ans.length;ss++){
	    	ans[ss].indexs = ss;
	    	
    	for(var sshi=0;sshi<ans[ss].children.length;sshi++){
    		if(ans[ss].children[sshi].children != undefined){
	    		ans[ss].children[sshi].indexs = sshi;
    			
		    	for(var squ=0;squ<ans[ss].children[sshi].children.length;squ++){
			    	ans[ss].children[sshi].children[squ].indexs = squ;
			    }
    			
    		}else{
	    		ans[ss].children[sshi].indexs = sshi;
    		}
	    }
    	
    }
    
    return ans;
}

//组织结构节点扁平数组转树状数组
Publicethod.arrayOrganizationalStructure = function(froum){
    for (let i in froum) {
        froum[i].value = froum[i].os_id;
        froum[i].label = froum[i].os_name;
    }
    let temp = {};
    let ans = [];
    for (let i in froum) {
        temp[froum[i].value] = froum[i];

    }
    for (let i in temp) {
        if (temp[i].os_fid != 0) {
            if (!temp[temp[i].os_fid].children) {
                temp[temp[i].os_fid].children = [];

            }
            temp[temp[i].os_fid].children.push(temp[i]);
        } else {
            ans.push(temp[i]);

        }
    }
    return ans;
}

//左侧菜单栏扁平数组转树状数组
Publicethod.arrayReorganization = function(froum){
    for (let i in froum) {
        froum[i].value = froum[i].m_id;
        froum[i].label = froum[i].m_name;
        froum[i].valueLabel = froum[i].m_id + ',' + froum[i].m_url;
    }
    let temp = {};
    let ans = [];
    for (let i in froum) {
        temp[froum[i].value] = froum[i];

    }
    for (let i in temp) {
        if (temp[i].m_fid != 0) {
            if (!temp[temp[i].m_fid].children) {
                temp[temp[i].m_fid].children = [];

            }
            temp[temp[i].m_fid].children.push(temp[i]);
        } else {
            ans.push(temp[i]);

        }
    }
    return ans;
}

//树结构节点扁平数组转树状数组
Publicethod.arrayOrganizationalNew = function(froum,id,name,parentId){
    for (let i in froum) {
        froum[i].value = froum[i][id];
        froum[i].label = froum[i][name];
    }
    let temp = {};
    let ans = [];
    for (let i in froum) {
        temp[froum[i].value] = froum[i];

    }
    for (let i in temp) {
        if (temp[i][parentId] != 0) {
            if (!temp[temp[i][parentId]].children) {
                temp[temp[i][parentId]].children = [];

            }
            temp[temp[i].parentId].children.push(temp[i]);
        } else {
            ans.push(temp[i]);

        }
    }
    return ans;
}

//新建文件及文件夹
Publicethod.newlyBuild = function(params,temporaryFatherData){

    var type = ''

    var m_path = params.m_path.split(",")

    m_path.splice(0, 1);

    m_path.splice(m_path.length-1, 1);

    var string = []

    if(m_path.length > 0){

        for (var i = 0; i < temporaryFatherData.length; i++) {

            if (temporaryFatherData[i].m_id == m_path[0]) {

                string.push(temporaryFatherData[i].m_url)

            }

            if (temporaryFatherData[i].children && temporaryFatherData[i].children.length > 0) {

                for (var v = 0; v < temporaryFatherData[i].children.length; v++) {

                    if (temporaryFatherData[i].children[v].m_id == m_path[1]) {

                        string.push(temporaryFatherData[i].children[v].m_url)

                    }

                    if (temporaryFatherData[i].children[v].children && temporaryFatherData[i].children[v].children.length > 0) {

                        for (var n = 0; n < temporaryFatherData[i].children[v].children.length; n++) {

                            if (temporaryFatherData[i].children[v].children[n].m_id == m_path[2]) {

                                string.push(temporaryFatherData[i].children[v].children[n].m_url)

                            }
                        }

                    }
                }

            }

        }

    }

    if(params.m_type == 0){

        type = './client/views/systemView/'

    }else if(params.m_type == 1){

        type = './client/views/extensionView/'

    }else if(params.m_type == 2){

        type = './client/views/bussinessView/'

    }
    

    if(string.length>0){

        type +=  string.join('/') + "/"

    }

    if(params.m_level == 0){

        type = type + params.m_url

    }else if(params.m_level == 1){

        type = type + params.m_url

    }else if(params.m_level == 2){

        type = type + params.m_url + "/" + params.m_url + ".vue"

    }else if(params.m_level == 3){

        type = type + params.m_url + "/" + params.m_url + ".vue"

    }

    return type;
}

//获取当前时间
Publicethod.currentTime = function(){
    var timestamp = Date.parse(new Date()) / 1000;
    return timestamp
}

//验证电话
Publicethod.vPhone = function(str) {
    var reg = /^1[3|4|5|7|8][0-9]{9}$/;
    return reg.test(str);
}

//去除字符串最后一位
Publicethod.deleteLastStr = function(str) {
    return str.substr(0, str.length - 1)
}

//获取年月日
Publicethod.getYMD = function(unix){
	if(!unix){
		unix = this.currentTime();
	}
	return this.dateFormat("YYYY-MM-dd",unix).split("-");
}

//格式化日期时间
Publicethod.dateFormat = function(format,unix) {

    var newDate = new Date(unix*1000);

    var date = {
           "M+": newDate.getMonth() + 1,
           "d+": newDate.getDate(),
           "h+": newDate.getHours(),
           "m+": newDate.getMinutes(),
           "s+": newDate.getSeconds(),
           "q+": Math.floor((newDate.getMonth() + 3) / 3),
           "S+": newDate.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
           format = format.replace(RegExp.$1, (newDate.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
           if (new RegExp("(" + k + ")").test(format)) {
                  format = format.replace(RegExp.$1, RegExp.$1.length == 1
                         ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
           }
    }
    return format;
}

//生成指定长度的随机字符串
Publicethod.randomString =  function(len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for(var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

//处理左侧菜单数据
Publicethod.menu = function(tab,froum){
    if(froum && froum.length > 0){
        let result = menuItems(tab,froum)
        return result
    }else{
        return []
    }
    

}
function menuItems(tab,froum){
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
                    "childMenus":tab[i]['childMenus']
                }
                if(tab[i]['childMenus']){
                    let tabItemss = tab[i]['childMenus'],froumItemss = froum[j]['childMenus']
                    menuItems(tabItemss,froumItemss)
                }
            }
        }
    }
    return tab
}

Publicethod.menuUpdata = function(tab,froum,type){
    if(froum && froum.length > 0){
        let result = menuItemsss(tab,froum,type)
        return result
    }else{
        return []
    }
}
function menuItemsss(tab,froum,type){
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
                    "disabled": nameType(froum[j]['menu'],type),
                    "childMenus":tab[i]['childMenus']
                }
                if(tab[i]['childMenus']){
                    let tabItemss = tab[i]['childMenus'],froumItemss = froum[j]['childMenus']
                    menuItemsss(tabItemss,froumItemss,type)
                }
            }
        }
    }
    return tab
}
function nameType(name,type)  {
    if(!type){
        return false
    }else{
        let names = ["编辑","删除","添加","给角色分配权限","列表导出","列表导入"]
        console.log("----",name,names.indexOf(name) != -1)
        if(names.indexOf(name) != -1){
            return true
        }else{
            return false
        }
    }
}

export default Publicethod
