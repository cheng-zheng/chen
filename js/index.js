
function Id(obj){
	return document.getElementById(obj);
}
function List(obj,arr){
	return obj.getElementsByTagName(arr);
}
function cName(obj,arr){
	return obj.getElementsByClassName(arr);
}
//窗口或框架被重新调整大小
onresize = Resize;
function Resize(){
	/*作品高度图片高度跟 宽一致*/
	var aSpan = List(Id('porject'),'span');//获取 span
	var width = aSpan[0].offsetWidth;//获取宽
	for(var i=0; i<aSpan.length; i++){
		aSpan[i].style.height = width+'px';//给高赋值
	}
}Resize();
//是否要跳转页面
function onConfirm(){
	if(confirm("您确定要跳转吗？")){
		return true;
	}
	return false;
}

function porjectText(){
	var porject = [
		{
			href:'http://o2o.chen666.top',
			src:'img/project/o2o.png',
			title:'O2O 商城',
			content:'2018-5-... ThinkPHP5、O2O团购网。商家平台、主平台、前端模块、email、地图API、'
		},{
			href:'down/index.html',
			src:' ',
			title:'45届世界技能大赛',
			content:'2018-3-... 负责《公交路线查询系统》开发 和 指导学弟，《Wordpress CMS内容管理系统》我开发插件，《游戏》 学弟开发。'
		},{
			href:'http://opt.chen666.top/',
			src:'img/project/opt_admin.jpg',
			title:'题库管理系统',
			content:'2017-12-... Vue-cli + ThinkPHP5 考证用的模拟考试测试。 18-2月增加后台 可以添加管理员,管理题库。 18-4增加用户登录'
		},{
			href:'http://size.chen666.top',
			src:'img/project/cosmic-scale.png',
			title:'宇宙的刻度',
			content:'2018-1-20 宇宙的刻度2的 flash对手机浏览器不友好。用canvas支持手机浏览器'
		},{
			href:'http://hungry.chen666.top',
			src:'img/project/sell.png',
			title:'饿了么前端',
			content:'2017-11-16 . 在校跟着视频一星期敲出来的，教程用的是Vue1，npm安装的是Vue2 途中也是要各种百度。'
		},{
			href:'http://discuss.chen666.top',
			src:'img/project/discuss_project.jpg',
			title:'Discuss',
			content:'2017-08-.. . vue+laravel，讨论社区，有登陆 注册 发帖 回帖功能。 '
		},{
			href:'javascript:;',
			src:'img/project/tianna.jpg',
			title:'校园项目',
			content:'2017-06-12 2017-04-20 . 加入校园(天哪来啦)团队。做校园商城项目。俺负责前端,后端的计算机学长教我了很多东西'
		},{
			href:'lol/lol.html',
			src:'img/project/lol.png',
			title:'仿英雄联盟官网(前端)',
			content:'2016.11左右，在校一星期做出来的，这次做的轻松多了。可以ajax获取本地json数据'
		},{
			href:'tao/tao.html',
			src:'img/project/tao.png',
			title:'仿淘宝官网(静态)',
			content:'2016.8月学了两个多星期html+ccc 一星期js后，开始仿淘宝静态。用了一个多星期，才完成上半部分。html写了1700行,css写了600行。现在回去看都是冗余文本。'
		},{
			href:'game/Snake/tcs.html',
			src:'img/project/tcs.png',
			title:'JavaScript贪吃蛇',
			content:'2017.1月左右。寒假时练习js 用两天时间做出来。'
		},{
			href:'game/Tetris/Tetris.html',
			src:'img/project/e.png',
			title:'JavaScript俄罗斯方块',
			content:'2017.1 月左右。做完贪吃蛇，做俄罗斯方块。耗时一个多星期。'
		},{
			href:'javascript:;',
			src:'img/project/lol-info-min.png',
			title:'英雄信息查询',
			content:'2016.12左右。丑陋的界面，耗了很多时间弄图片的路径...。'
		},
	];
	var tmp = '<div class="col-sm-6"><div class=" pull-left body"><span class="center-block pull-left" ><a onclick="return onConfirm();" href="http://o2o.chen666.top"><img class="img-responsive center-block img-rounded img-thumbnail"  src="img/project/o2o.png" /></a></span><p ><strong>O2O 商城</strong></p><tt>2018-5-... ThinkPHP5、O2O团购网。商家平台、主平台、前端模块、email、地图API、</tt></div></div>';
	var _html = '';

	for(i=0; i<porject.length; i++){
		_html += '<div class="col-sm-6"><div class=" pull-left body"><span class="center-block pull-left" ><a onclick="return onConfirm();" href="'+porject[i].href+'"><img class="img-responsive center-block img-rounded img-thumbnail"  src="'+porject[i].src+'" /></a></span><p ><strong>'+porject[i].title+'</strong></p><tt>'+porject[i].content+'</tt></div></div>';
	}

	document.getElementById('porject').innerHTML += _html;

	Resize();
}
//porjectText();






// 百度统计
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?e8076c32ed95225fe476528d81818d1f";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();