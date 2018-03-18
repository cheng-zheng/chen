	
	
	
	var aSnake = cName(document, 'snake');//获取蛇 集合
	var oFood = Id('food');//获取食物
	var oBody = cName(document, 'body')[0];//
	var snake = new Snake(aSnake);//创建 蛇 对象
	var Timer = null;
	//构造 蛇 类 对象
	function Snake(o){
		
		this.o = o;//蛇 对象 集合
		//得分
		this.ofraction = Id('fraction');
		this.fra = 0;
		//方向属性 上0 右1 下2 左3
		this.direction = 3;
		
		
		/** 
			按了 ↑	↓ 锁住
			按了 ←	→ 锁住

			按了 ↓	↑ 锁住
			按了 →	← 锁住
		*/
		//不反(阻止反向移动)
		this.noBack = '左';
		//定时器
		this.time = null;
		//蛇 移动方法
		this.move = function(){
			//尾部
			for( var i=this.o.length-1; i>0; i-- ){
				this.o[i].style.left = this.o[i-1].style.left;
				this.o[i].style.top = this.o[i-1].style.top;
			}
			//判断方向
			switch(this.direction){
				case 0: //上
					this.o[0].style.top  = -10 + this.o[0].offsetTop +'px';
					this.noBack = '上';      
				break;                       
				case 1: //右                 
					this.o[0].style.left =  10 + this.o[0].offsetLeft +'px';
					this.noBack = '右';      
				break;                       
				case 2: //下                 
					this.o[0].style.top  =  10 + this.o[0].offsetTop +'px';
					this.noBack = '下';      
				break;                       
				case 3: //左                 
					this.o[0].style.left = -10 + this.o[0].offsetLeft +'px';
					this.noBack = '左';
				break;
			}
			//判断吃掉食物没有
			if(this.o[0].offsetLeft == oFood.offsetLeft && this.o[0].offsetTop == oFood.offsetTop){
				console.log('吃');
				this.ofraction.innerText = this.fra++;//得分 
				//删除节点
				oBody.removeChild(oFood);
				//添加身体
				oBody.innerHTML += '<div class="snake" style="top:-10px"></div>';
				
				//从新获取所有蛇体
				this.o = cName(document, 'snake'); 
				//随机生成食物 方法
				this.random();
				oFood = Id('food');//获取食物
			}
			
			//判断是否撞墙
			if(this.o[0].offsetLeft<0 || this.o[0].offsetTop<0 || this.o[0].offsetLeft>410 || this.o[0].offsetTop>410){
			//*	clearTimeout(this.time);//停止定时
				console.log('你撞墙了');
			}
			//判断是否撞到身体
			for(var i=this.o.length-1; i>1 ;i--){
				if(this.o[0].offsetLeft == this.o[i].offsetLeft && this.o[0].offsetTop == this.o[i].offsetTop){
					clearTimeout(this.time);//停止定时
					alert('撞身体了');
				}
			}
		}
		//随机生成食物 方法
		this.random = function(){
			//随机生成食物坐标
			var foodX = parseInt(Math.random()*40)*10;
			var foodY = parseInt(Math.random()*40)*10;
			
			for(var i=this.o.length-1; i>0 ;i--){
				//判断食物生成到蛇身去了
				if(foodX == this.o[i].offsetLeft && foodY == this.o[i].offsetTop){
					console.log('食物撞身体了！');
					//生成 不装身体的坐标
					foodX = parseInt(Math.random()*40)*10;
					foodY = parseInt(Math.random()*40)*10;
					/**
					何必那么麻烦 i给重置就好啦
					重新判断
					*/
					i=this.o.length-1;
				}
				
			}
			
			var oF = document.createElement('div');
			oF.id = 'food';
			oF.className = 'food';
			oF.style.left = foodX +'px';
			oF.style.top = foodY +'px';
			oBody.appendChild(oF);
		}
/***************************************************************/		
		this.random2 = function(){
			//随机生成食物坐标
			var foodX = new Array();
			var foodY = new Array();
			for(var i=0;i<10;i++){
				foodX[i]=10*i;
				foodY[i]=10*i;
			}
			//var foodX = [10,20,30,40,50,60,70,80,90,100];
			var X = Math.floor( Math.random()*foodX.length );
			//var foodY = [0,10,20,30,40,50,60,70,80,90,100];
			var Y = Math.floor( Math.random()*foodY.length );
			
			
			for(var i=this.o.length-1; i>0 ;i--){
				//判断食物生成到蛇身去了
				if(foodX[X] == this.o[i].offsetLeft && foodY[Y] == this.o[i].offsetTop){
					console.log('食物撞身体了！');
					//生成 不装身体的坐标
					foodX.splice(i,1);//删除数组
					foodY.splice(i,1);
					console.log('删除的数'+i);
					//重新生成食物
					X = Math.floor( Math.random()*foodX.length );
					Y = Math.floor( Math.random()*foodY.length );
				}
				
			}
			
			var oF = document.createElement('div');
			oF.id = 'food';
			oF.className = 'food';
			oF.style.left = foodX[X] +'px';
			oF.style.top = foodY[Y] +'px';
			oBody.appendChild(oF);
		}
/***************************************************************/			
	}
	//定时器
	snake.time = setInterval('snake.move()',300);//蛇移动
	
	//键盘 事件
	//按下触发
	onkeydown = function(){
	
		//var key = event.keyCode;//获得键码 值
		
		switch(event.keyCode){
			case 38: //上
				if(snake.noBack != '下'){//互锁
					snake.direction = 0;
				}
			break;
			case 39: //右
				if(snake.noBack != '左'){
					snake.direction = 1;
				}
			break;
			case 40: //下
				if(snake.noBack != '上'){
					snake.direction = 2;
				}
			break;
			case 37: //左
				if(snake.noBack != '右'){
					snake.direction = 3;
				}
			break;
		}
	}







function Id(arr){//获取Id
	return document.getElementById(arr);
}
function Name(obj,arr){
	return obj.getElementsByTagName(arr);
}	
function cName(obj,arr){
	return obj.getElementsByClassName(arr);
}