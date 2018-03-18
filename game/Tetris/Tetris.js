var oBody = Id('js_body');
var oBydyR = Id('js_body_rigth');
var oSpan = Name(oBydyR,'span')[0];
var oFraction = Id('Fraction');//得分
//创建对象
var block = new Block();//方块 移动 对象
var blockNew = new Array();
blockNew[0] = new BlockNew_I();//新 I 方块 对象
blockNew[1] = new BlockNew_Z();//新 Z 方块 对象
blockNew[2] = new BlockNew_S();//新 S 方块 对象
blockNew[3] = new BlockNew_T();//新 T 方块 对象
blockNew[4] = new BlockNew_L();//新 L 方块 对象
blockNew[5] = new BlockNew_J();//新 J 方块 对象
blockNew[6] = new BlockNew_O();//新 O 方块 对象

//随机方块
block.blockRan = parseInt( Math.random()*6 );//取 0~5的随机数
//生成  方块
blockNew[ block.blockRan ].block(oBody);

block.decline();//定时

//*****创建 方块 移动类
function Block(){
	//得分 储存
	this.fraction=0;
	//底部 集合 
	this.oBlock_ = cName(oBody,'block_');
	//定时器暂存
	this.Time = null;
	//方向 属性
	this.direction = '';
	//下移 属性 互锁
	this.bottom_true = true;
	//左移 属性 互锁
	this.left_true = true;
	//右移 属性 互锁
	this.rigth_true = true;
	////移动方法
	this.move = function(){
		//判断方向
		switch(this.direction){
			case '上':
				blockNew[ this.blockRan ].rotate();//旋转方法
			break;
			case '右':
				if(this.rigth_true){this.rigth();}//右移方法
				this.rigth_true = true;//右移 属性 互锁
			break;
			case '下':
				if(this.bottom_true){this.bottom();}//下移方法
			break;
			case '左':
				if(this.left_true){this.left();}//左移方法
				this.left_true = true;//左移 属性 互锁
			break;
		}
	}
	//右边提醒方法
	this.bodyRigth = function(){
		//方块 缓存
		var x = parseInt( Math.random()*7 );//取 0~6的随机数
		//三目运算符 取 与上个方块不相同的数
		this.blockCache = (this.blockCache==x) ? ( x=(x==6)?0:(x+1) ) : x ;
		oSpan.innerHTML='';
		blockNew[ this.blockCache ].block(oSpan);//传入右边框对象
		for(var i=0;i<4;i++){
			blockNew[ this.blockCache ].o[i].style.top = 100+blockNew[ this.blockCache ].o[i].offsetTop+'px';
			blockNew[ this.blockCache ].o[i].style.left = -30 +blockNew[ this.blockCache ].o[i].offsetLeft+'px';
			
		}
		
	}
	////////////////////////////////////////////////////// 左右 移动 方法
	this.left = function(){//左移
		for(var i=0; i<4; i++){//循环 4个 方块
			for(var j=this.oBlock_.length-1; j>=0; j-- ){
				//判断 是否 碰到左边 的 底部 方块
				if(this.oBlock_[j].offsetTop == blockNew[ this.blockRan ].o[i].offsetTop && this.oBlock_[j].offsetLeft==blockNew[ this.blockRan ].o[i].offsetLeft-30){this.left_true = false;}
			}
			//判断 是否 碰到左边界
			if(blockNew[ this.blockRan ].o[i].offsetLeft == 0){this.left_true = false;}
		}
		if(this.left_true){
			for(var i=0; i<4; i++){
				//给每个方块 的左边距 减 30px 达到移动的效果
				blockNew[ this.blockRan ].o[i].style.left = -30 + blockNew[ this.blockRan ].o[i].offsetLeft + 'px';
			}
			for(var i=0; i<4; i++){}
		}
		//右移 方法 互锁
		this.rigth_true = true;
		//判断 是否 到底部 方法
		this.ifBottom();
	}
	this.rigth = function(){//右移
		for(var i=0; i<4; i++){//循环 4个 方块
			for(var j=this.oBlock_.length-1; j>=0; j-- ){///判断 是否 碰到右边 的 底部 方块
				if(this.oBlock_[j].offsetTop == blockNew[ this.blockRan ].o[i].offsetTop && this.oBlock_[j].offsetLeft==blockNew[ this.blockRan ].o[i].offsetLeft+30){ this.rigth_true = false;}
			}
			//判断 是否 碰到右边界
			if(blockNew[ this.blockRan ].o[i].offsetLeft == 270){this.rigth_true = false;}
		}
		if(this.rigth_true){
			for(var i=0; i<4; i++){
				//给每个方块 的左边距 加 30px 达到移动的效果
				blockNew[ this.blockRan ].o[i].style.left = 30 + blockNew[ this.blockRan ].o[i].offsetLeft + 'px';
			}
		}
		//左移 方法 互锁
		this.left_true = true;
		//判断 是否 到底部 方法
		this.ifBottom();
	}

	this.bottom = function(){//下移

		for(var i=0; i<blockNew[ this.blockRan ].o.length; i++){
			//给每个方块 的上边距 加 30px 达到移动的效果
			blockNew[ this.blockRan ].o[i].style.top = 30 + blockNew[ this.blockRan ].o[i].offsetTop + 'px';
		}
		//判断 是否 到底部 方法
		this.ifBottom();

	}

	//////////////////////////////////////////////////////定时器 方块缓慢下降
	this.decline = function(){
		//下移方法
		this.Time = setInterval('block.bottom()',1000);//间隔1S 下降
		
	}

	////////////////////////////////////////////////////// 定时器 判断 是否 到底部 方法
	this.ifBottom = function(){
		//判断到底部了没
		outerloop:for(var i=0; i<4; i++){//循环 4个 方块
			
			for(var jj=this.oBlock_.length-1; jj>=0; jj--){//循环 底部 方块
				//判断有没碰到 底部 方块
				if(this.oBlock_[jj].offsetLeft == blockNew[ this.blockRan ].o[i].offsetLeft && blockNew[ this.blockRan ].o[i].offsetTop == (this.oBlock_[jj].offsetTop-30) ){
					
					//停止定时 clearInterval
					clearInterval( this.Time );this.bottom_true = false; //下移 方法 互锁
					
					//判断到顶
					for(T in blockNew[ this.blockRan ].o){if(blockNew[ this.blockRan ].o[T].offsetTop<0){alert('碰顶了，你输了！');return;}}
					
					//延时定时
					this.TimeOut = setTimeout('block.yesTimeOut()',1000);//延时 1s 执行 方法
					break outerloop;//退出 最外层 循环
				}
			}
			
		}
	}
	//////////////////////////////////////////////////////延时执行 方法
	this.yesTimeOut = function(){
		clearTimeout(this.TimeOut);//清除 延时定时

		outerloop:for(var i=0; i<4; i++){//循环 4个 方块
			for(var jj=this.oBlock_.length-1; jj>=0; jj--){//循环 底部 方块

				if(this.oBlock_[jj].offsetLeft == blockNew[ this.blockRan ].o[i].offsetLeft && blockNew[ this.blockRan ].o[i].offsetTop == (this.oBlock_[jj].offsetTop-30) ){//判断有没碰到 底部 方块
					
					for(var j=blockNew[ this.blockRan ].o.length-1; j>=0; j--){
						//赋值 class 类值
						blockNew[ this.blockRan ].o[j].className = 'block_';
					}
					//**********重新获取 底部 集合 
					this.oBlock_ = cName(oBody,'block_');
					//**********得分
					var fen=0;
					for(var iii=19; iii>0; iii--){//循环高度
						for(var ii=0; ii<10; ii++){//循环左边距
							for(var i=0; i<this.oBlock_.length; i++){//遍历底部集合
								if(this.oBlock_[i].offsetTop==(30*iii) && this.oBlock_[i].offsetLeft==30*ii){//判断底部方块得分
									fen++;//console.log('10个底部方块才执行');
								}
							}
						}//console.log(fen);
						if(fen==10){
							for(var B=this.oBlock_.length-1;B>=0;B--){
								//所有底部方块 下移 
								this.oBlock_[B].style.top=30+this.oBlock_[B].offsetTop+'px';
							}
							oFraction.innerText = (this.fraction+fen);
						}fen=0;
					}
					
					//**********删除底部方块
					for(var BBB=0; BBB<10; BBB++){
						for(var BB=0; BB<this.oBlock_.length; BB++){
							if(this.oBlock_[BB].offsetTop==630 && this.oBlock_[BB].offsetLeft==30*BBB){//判断底部方块得分
								oBody.removeChild(this.oBlock_[BB]);
							}
						}
					}
					//初始化
					this.blockRan =  this.blockCache;//parseInt( Math.random()*7 );//取 0~6的随机数
					blockNew[ this.blockRan ].block(oBody);//生成方块
					this.bottom_true = true; //下移 方法 互锁
					this.left_true = true;//左移 方法 互锁
					this.rigth_true = true;//右移 方法 互锁
					this.decline();//开启循环定时
					this.bodyRigth();//右边提示方块
					break outerloop;//退出 最外层 循环
				}
			}
		}
		return;//退出函数
	}
	
}

//*****************************************************************************新 I 方块 对象
function BlockNew_I(){// I
	//生成 I 方块 方法
	this.block = function(obj){//传入的对象 左边框 或者 右边框
		for(var i=3;i<7;i++){
			var I = document.createElement('div');//创建div元素 
			I.className = 'block_I';
			I.style.left = i*30+'px';I.style.top = -60+'px';
			obj.appendChild(I);//添加 到一个元素中
		}
		this.o = cName(obj,'block_I');//获取 I 方块 集合 对象		之后要改 不是这里获取
		//旋转 互锁
		this.true_ = true;
	}
	//旋转方法
	this.rotate = function(){
		if(this.true_){
			for(var i=1;i<4;i++){//旋转成 竖 着
				this.o[i].style.top = -30*i + this.o[i].offsetTop + 'px';
				this.o[i].style.left = this.o[0].offsetLeft + 'px';
			}
			this.true_ = false;
		}else{
			for(var i=1;i<4;i++){//旋转成 横 着
				this.o[i].style.top = 30*i + this.o[i].offsetTop + 'px';
				this.o[i].style.left = 30*i + this.o[i].offsetLeft + 'px';
			}
			this.true_ = true;
		}
	}
}
//****************************************************************************新 Z 方块 对象
function BlockNew_Z(){// Z
	//生成 Z 方块 方法
	this.block = function(obj){//传入的对象 左边框 或者 右边框
		for(var i=3;i<7;i++){
			var Z = document.createElement('div');//创建div元素 
			Z.className = 'block_Z';
			if(i < 5){
				Z.style.left = 30*i+'px';
				Z.style.top = -60+'px';
			}else{
				Z.style.left = 30*(i-1)+'px';
				Z.style.top = -30+'px';
			}
			obj.appendChild(Z);//添加 到一个元素中
		}
		this.o = cName(obj,'block_Z');//获取 Z 方块 集合 对象
		//旋转 互锁
		this.true_ = true;
	}
	//旋转方法
	this.rotate = function(){
		if(this.true_){
			this.o[0].style.left = 60+this.o[0].offsetLeft + 'px';
			this.o[3].style.top = -60 + this.o[3].offsetTop + 'px';
			this.true_ = false;
		}else{
			this.o[0].style.left = -60+this.o[0].offsetLeft + 'px';
			this.o[3].style.top = 60 + this.o[3].offsetTop + 'px';
			this.true_ = true;
		}
	}
}
//**************************************************************************** 新 S 方块 对象
function BlockNew_S(){
	//生成 S 方块 方法
	this.block = function(obj){//传入的对象 左边框 或者 右边框
		for(var i=0;i<4;i++){
			var S = document.createElement('div');//创建div元素 
			S.className = 'block_S';
			if(i < 2){
				S.style.left = 30*(i+4)+'px';
				S.style.top = -60+'px';
			}else{
				S.style.left = 30*(i+1)+'px';
				S.style.top = -30+'px';
			}
			obj.appendChild(S);//添加 到一个元素中
		}
		this.o = cName(obj,'block_S');//获取 S 方块 集合 对象
		//旋转 互锁
		this.true_ = true;
	}
	//旋转方法
	this.rotate = function(){
		if(this.true_){
			this.o[1].style.left = -60+this.o[1].offsetLeft + 'px';
			this.o[2].style.top = -60 + this.o[2].offsetTop + 'px';
			this.true_ = false;
		}else{
			this.o[1].style.left = 60+this.o[1].offsetLeft + 'px';
			this.o[2].style.top = 60 + this.o[2].offsetTop + 'px';
			this.true_ = true;
		}
	}
}
//**************************************************************************** 新 T 方块 对象
function BlockNew_T(){
	//生成 T 方块 方法
	this.block = function(obj){//传入的对象 左边框 或者 右边框
		for(var i=0;i<4;i++){
			var T = document.createElement('div');//创建div元素 
			T.className = 'block_T';
			if(i<1){
				T.style.left = 120+'px';
				T.style.top = -30+'px';
			}else{
				T.style.left = 30*(i+2)+'px';
				T.style.top = -60+'px';
			}
			obj.appendChild(T);//添加 到一个元素中
		}
		this.o = cName(obj,'block_T');//获取 T 方块 集合 对象
		//旋转互锁
		this.t = 0;
	}
	//旋转方法 
	this.rotate = function(){//待优化旋转 算法
		// 第 0 个方块 始终不变
		if(this.t == 0){
			this.o[2].style.left = -30 + this.o[2].offsetLeft +'px';
			this.o[3].style.left = -60 + this.o[3].offsetLeft +'px';
			this.o[2].style.top = 30 + this.o[2].offsetTop +'px';
			this.o[3].style.top = 60 + this.o[3].offsetTop +'px';
			this.t = 1;
		}else if(this.t==1){
			this.o[2].style.left = 30 + this.o[2].offsetLeft +'px';
			this.o[1].style.left = 60 + this.o[1].offsetLeft +'px';
			this.o[2].style.top = +30 + this.o[2].offsetTop +'px';
			this.o[1].style.top = 60 + this.o[1].offsetTop +'px';
			this.t = 2;
		}else if(this.t==2){
			this.o[2].style.left = 30 + this.o[2].offsetLeft +'px';
			this.o[3].style.left = 60 + this.o[3].offsetLeft +'px';
			this.o[2].style.top = -30 + this.o[2].offsetTop +'px';
			this.o[3].style.top = -60 + this.o[3].offsetTop +'px';
			this.t = 3;
		}else {
			this.o[2].style.left = -30 + this.o[2].offsetLeft +'px';
			this.o[1].style.left = -60 + this.o[1].offsetLeft +'px';
			this.o[2].style.top = -30 + this.o[2].offsetTop +'px';
			this.o[1].style.top = -60 + this.o[1].offsetTop +'px';
			this.t = 0;
		}
	}
}
//**************************************************************************** 新 L 方块 对象
function BlockNew_L(){
	//生成 L 方块 方法
	this.block = function(obj){//传入的对象 左边框 或者 右边框
		for(var i=0;i<4;i++){
			var L = document.createElement('div');//创建div元素 
			L.className = 'block_L';
			if(i<3){
				L.style.left = 120+'px';
				L.style.top = -30*(i+1)+'px';
			}else{
				L.style.left = 150+'px';
				L.style.top = -30+'px';
			}
			obj.appendChild(L);//添加 到一个元素中
		}
		this.o = cName(obj,'block_L');//获取 L 方块 集合 对象
		//旋转互锁
		this.t = 0;
	}
	//旋转方法
	this.rotate = function(){
		if(this.t == 0){
			this.o[1].style.top = 30 + this.o[1].offsetTop+'px';
			this.o[1].style.left = -30 + this.o[1].offsetLeft+'px';
			this.o[2].style.top = 30 + this.o[2].offsetTop+'px';
			this.o[2].style.left = 30 + this.o[2].offsetLeft+'px';
			this.t = 1;
		}else if(this.t == 1){
			this.o[1].style.top = 60 + this.o[1].offsetTop+'px';
			this.o[1].style.left = 60 + this.o[1].offsetLeft+'px';
			this.o[2].style.top = 60 + this.o[2].offsetTop+'px';
			this.t = 2;
		}else if(this.t == 2){
			this.o[1].style.top = -60 + this.o[1].offsetTop+'px';
			this.o[1].style.left = 30 + this.o[1].offsetLeft+'px';
			this.o[2].style.left = -30 + this.o[2].offsetLeft+'px';
			this.t = 3;
		}else{
			this.o[1].style.top = -30 + this.o[1].offsetTop+'px';
			this.o[1].style.left = -60 + this.o[1].offsetLeft+'px';
			this.o[2].style.top = -90 + this.o[2].offsetTop+'px';
			this.t = 0;
		}
	}
}
//**************************************************************************** 新 J 方块 对象
function BlockNew_J(){
	//生成 J 方块 方法
	this.block = function(obj){//传入的对象 左边框 或者 右边框
		for(var i=0;i<4;i++){
			var J = document.createElement('div');//创建div元素 
			J.className = 'block_J';
			if(i<3){
				J.style.left = 150+'px';
				J.style.top = -30*(i+1)+'px';
			}else{
				J.style.left = 120+'px';
				J.style.top = -30+'px';
			}
			obj.appendChild(J);//添加 到一个元素中
		}
		this.o = cName(obj,'block_J');//获取 J 方块 集合 对象
		//旋转互锁
		this.t = 0;
	}
	//旋转方法
	this.rotate = function(){
		if(this.t == 0){
			this.o[1].style.top = 60 + this.o[1].offsetTop+'px';
			this.o[2].style.top = 60 + this.o[2].offsetTop+'px';
			this.o[2].style.left = -60 + this.o[2].offsetLeft+'px';
			this.t = 1;
		}else if(this.t == 1){
			this.o[1].style.left = -30 + this.o[1].offsetLeft+'px';
			this.o[2].style.left = 30 + this.o[2].offsetLeft+'px';
			this.o[2].style.top = 60 + this.o[2].offsetTop+'px';
			this.t = 2;
		}else if(this.t == 2){
			this.o[1].style.top = -60 + this.o[1].offsetTop+'px';
			this.o[2].style.top = -60 + this.o[2].offsetTop+'px';
			this.o[2].style.left = 60 + this.o[2].offsetLeft+'px';
			this.t = 3;
		}else{
			this.o[1].style.left = 30 + this.o[1].offsetLeft+'px';
			this.o[2].style.left = -30 + this.o[2].offsetLeft+'px';
			this.o[2].style.top = -60 + this.o[2].offsetTop+'px';
			this.t = 0;
		}
	}
}
//**************************************************************************** 新 O 方块 对象
function BlockNew_O(){
	//生成 O 方块 方法
	this.block = function(obj){//传入的对象 左边框 或者 右边框
		for(var i=3; i<7; i++){
			var O = document.createElement('div');//创建div元素 
			O.className = 'block_O';
			if(i < 5){
				O.style.left = 30*i+'px';
				O.style.top = -60+'px';
			}else{
				O.style.left = 30*(i-2)+'px';
				O.style.top = -30+'px';
			}
			obj.appendChild(O);//添加 到一个元素中
		}
		this.o = cName(obj,'block_O');//获取 O 方块 集合 对象
	}
	this.rotate = function(){}
}
//键盘事件
document.onkeydown = function(){

	switch(event.keyCode){
		case 38: //上
			block.direction = '上';
			block.move();//执行移动方法
		break;
		case 39: //右
			block.direction = '右';
			block.move();//执行移动方法
		break;
		case 40: //下
			block.direction = '下';
			block.move();//执行移动方法
		break;
		case 37: //左
			block.direction = '左';
			block.move();//执行移动方法
		break;
	}
}
window.onload = function(){
	setTimeout(function(){
		block.bodyRigth();//右边 方框 方法
	},100);
	
}








function Id(obj){//获取Id
	return document.getElementById(obj);
}
function Name(obj, arr){
	return obj.getElementsByTagName(arr);
}
function cName(obj, arr){//获取类
	return obj.getElementsByClassName(arr);
}



















