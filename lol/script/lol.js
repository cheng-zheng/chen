window.onload=function(){
/*------轮播------*/	
var timer=null;//定时对象
var timer2=null;
	var Rotate=document.getElementById('js_rotate1');//获取图片容器
	var RoLi=Rotate.getElementsByTagName('li');//获取图片
	var RoDiv=document.getElementById('js_rotate2');//获取A容器
	var oA=RoDiv.getElementsByTagName('a');//获取A数组对象
	
	timer=setInterval(fun_buff,15);//缓冲_定时器
	var Li_i=0;//图片动态变量
	var oA_i=0;//oA类动态变量
	
	timer2=setInterval(fun_rot,5000);//轮播图
	function fun_rot(){
		clearInterval(timer);//停止定时_清空定时
		clean_oA();//_函数_清除_oA类
		if( Rotate.offsetLeft==-780*oA_i && Rotate.offsetLeft!==-3120  ){//第一次左边距0
			oA[oA_i+1].className='rot';//A类赋值
		}
		oA_i++;//oA类动态变量
		if(Rotate.offsetLeft==-780*Li_i){
			clearInterval(timer);//停止定时_清空定时
			Li_i++;//图片动态变量
		}
		if(Rotate.offsetLeft==-3120){//判断图片到尾
			clearInterval(timer);//停止定时_清空定时
			Li_i=0;//图片动态变量
			oA_i=0;//oA类动态变量
			oA[0].className='rot';//oA类赋值
		}
		timer=setInterval(fun_buff,10);//缓冲_定时器
	}
	//缓冲_函数
	function fun_buff(){//缓冲_框架
		var is=-((780*Li_i+Rotate.offsetLeft)/8);//动态变量
		is=is<0 ? Math.floor(is):Math.ceil(is);//小于零就向下取整,否则向上
		//标题 当前左边距 当前动态变量
		document.title=Rotate.offsetLeft+'-'+is;
		//当前左边距被赋值
		Rotate.style.left=Rotate.offsetLeft+is+'px';
	}
	for(var j=0;j<oA.length;j++){
		oA[j].onmouseover=function(){//鼠标_移入_oA对象_执行
			clean_oA();//_函数_清除_oA类
			this.className='rot';//当前oA对象赋值
			clearInterval(timer2);//停止定时_清空定时
			for(var x=0;x<oA.length;x++){
				if(oA[x].className=='rot'){//判断当前类在第几个
					Li_i=x;//图片动态变量_被赋值
					oA_i=x;//oA类动态变量_被赋值
					fun_buff();//缓冲_函数
				}
			}
		}
	}
	//_函数_清除_oA类
	function clean_oA(){//清除oA的类
		/*for(var j=0;j<oA.length;j++){
			oA[j].className='';
		}*/
		for(var j in oA){//遍历数组
			oA[j].className='';
		}
	}
	RoDiv.onmouseout=function(){//oA容器对象,鼠标移出开启定时
		timer2=setInterval(fun_rot,2000);//轮播图
	}
	Rotate.onmouseover=function(){//图片容器对象,鼠标移入停止定时
		clearInterval(timer2);//停止定时_清空定时
	}
	Rotate.onmouseout=function(){//图片容器对象,鼠标移出开启定时
		timer2=setInterval(fun_rot,2000);//轮播图
	}
	
	
/*------视频中心------*/
	var Video=document.getElementById('js_video');
	var oVideo=Video.getElementsByTagName('li');
	var Video2=document.getElementById('js_video2');
	var oVideo2=Video2.getElementsByTagName('ul');
	var vid_class='vid';//类值
	trends(Video, oVideo, oVideo2, vid_class);//调用函数
	
/*------赛事中心------*/	
	var Match1=document.getElementById('js_match1');
	var MaLi=Match1.getElementsByTagName('li');
	var Match2=document.getElementById('js_match2');
	var MaDiv=Match2.getElementsByTagName('div');
	var mat_class='mat';//类值
	trends(Match1, MaLi, MaDiv , mat_class);
/*------客服专区------*/	
	var Custom1=document.getElementById('js_custom1');
	var CuLi=Custom1.getElementsByTagName('li');
	var Custom2=document.getElementById('js_custom2');
	var CuDiv=Custom2.getElementsByTagName('div');
	var cus_class='cus';//类值
	trends(Custom1, CuLi, CuDiv , cus_class);//调用函数
/*公告*/
	var Board1=document.getElementById('js_board1');
	var BoLi=Board1.getElementsByTagName('li');
	var Board2=document.getElementById('js_board2');
	var BoDiv=Board2.getElementsByTagName('div');
	var boa_class='boa';//类值
	trends(Board1, BoLi, BoDiv , boa_class);//调用函数
/*英雄/皮肤*/
	var Hero1=document.getElementById('js_hero1');
	var HeLi=Hero1.getElementsByTagName('li');
	var Hero2=document.getElementById('js_hero2');
	var HeDiv=Hero2.getElementsByTagName('div');
	var her_class='her';//类值
	trends(Hero1, HeLi, HeDiv , her_class);//调用函数
/*------再显示视频------*/	
	var Section=document.getElementsByClassName('section')[0];//内容容器对象
	var Display=document.getElementById('js_display');//再显示视频
	Display.onclick=function(){
		Video2.style.height=700+'px';
		Section.style.height=2117+'px';
	}
	/*
<要封装一个函数_传以下值>
最外部对象 Match1,
里面的对象 MaLi,
里面的对象 MaDiv,
var=this的值,
var=当前li的值,
需要更改的class,
*/
//father父对象, 当前li对象, son需要改变的, class类, 
function trends( father , li , son , clas){//封装函数
	var _this;//对象
	var j;//当前li的值
	father.onmouseover = function (e) {/*鼠标移入_阻止冒泡*/
		if (!e) e = window.event;
		var reltg = e.relatedTarget ? e.relatedTarget : e.fromElement;
		while (reltg && reltg != this) reltg = reltg.parentNode;
		if (reltg != this) {
			for(var i=0;i<li.length;i++){//第一次移入div触发
				li[i].className=' ';//第一次移入清除类
				son[i].style.display='none';//第一次移入置none
			}		
			_this.className=clas;//赋值最后一次移出对象
			for( j=0;j<li.length;j++){
				if(li[j].className==clas){//判断当前li是否等于
					son[j].style.display='inline';//另一个li被赋值
					break;//结束循环
				}
			}
			son[j].style.display='inline';//保留初始值
		}
	}
	for(var i=0;i<li.length;i++){
		li[i].onmouseover=function(){//鼠标移入li触发
			this.className=clas;//当前对象 的 类 赋值
			_this=this;//li对象
			for( j=0;j<li.length;j++){
				if(li[j].className==clas){//判断当前li是否等于
					son[j].style.display='inline';//另一个li被赋值
					break;//结束循环
				}
			}
		}
		li[i].onmouseout=function(){//鼠标移出
			this.className=' ';//当前对象 的 类 赋值
			son[j].style.display='none';
		}
	}
	father.onmouseout=function(e){/*鼠标移出_阻止冒泡*/
		if (!e) e = window.event;
		var reltg = e.relatedTarget ? e.relatedTarget : e.toElement;
		while (reltg && reltg != this) reltg = reltg.parentNode;
		if (reltg != this) {
			_this.className=clas;//最一次移出div
			son[j].style.display='inline';//最一次移出div
		}
	}
}	

}