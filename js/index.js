
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



var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?e8076c32ed95225fe476528d81818d1f";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();