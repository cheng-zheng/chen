window.onload=function(){
/*------�ֲ�------*/	
var timer=null;//��ʱ����
var timer2=null;
	var Rotate=document.getElementById('js_rotate1');//��ȡͼƬ����
	var RoLi=Rotate.getElementsByTagName('li');//��ȡͼƬ
	var RoDiv=document.getElementById('js_rotate2');//��ȡA����
	var oA=RoDiv.getElementsByTagName('a');//��ȡA�������
	
	timer=setInterval(fun_buff,15);//����_��ʱ��
	var Li_i=0;//ͼƬ��̬����
	var oA_i=0;//oA�ද̬����
	
	timer2=setInterval(fun_rot,5000);//�ֲ�ͼ
	function fun_rot(){
		clearInterval(timer);//ֹͣ��ʱ_��ն�ʱ
		clean_oA();//_����_���_oA��
		if( Rotate.offsetLeft==-780*oA_i && Rotate.offsetLeft!==-3120  ){//��һ����߾�0
			oA[oA_i+1].className='rot';//A�ำֵ
		}
		oA_i++;//oA�ද̬����
		if(Rotate.offsetLeft==-780*Li_i){
			clearInterval(timer);//ֹͣ��ʱ_��ն�ʱ
			Li_i++;//ͼƬ��̬����
		}
		if(Rotate.offsetLeft==-3120){//�ж�ͼƬ��β
			clearInterval(timer);//ֹͣ��ʱ_��ն�ʱ
			Li_i=0;//ͼƬ��̬����
			oA_i=0;//oA�ද̬����
			oA[0].className='rot';//oA�ำֵ
		}
		timer=setInterval(fun_buff,10);//����_��ʱ��
	}
	//����_����
	function fun_buff(){//����_���
		var is=-((780*Li_i+Rotate.offsetLeft)/8);//��̬����
		is=is<0 ? Math.floor(is):Math.ceil(is);//С���������ȡ��,��������
		//���� ��ǰ��߾� ��ǰ��̬����
		document.title=Rotate.offsetLeft+'-'+is;
		//��ǰ��߾౻��ֵ
		Rotate.style.left=Rotate.offsetLeft+is+'px';
	}
	for(var j=0;j<oA.length;j++){
		oA[j].onmouseover=function(){//���_����_oA����_ִ��
			clean_oA();//_����_���_oA��
			this.className='rot';//��ǰoA����ֵ
			clearInterval(timer2);//ֹͣ��ʱ_��ն�ʱ
			for(var x=0;x<oA.length;x++){
				if(oA[x].className=='rot'){//�жϵ�ǰ���ڵڼ���
					Li_i=x;//ͼƬ��̬����_����ֵ
					oA_i=x;//oA�ද̬����_����ֵ
					fun_buff();//����_����
				}
			}
		}
	}
	//_����_���_oA��
	function clean_oA(){//���oA����
		/*for(var j=0;j<oA.length;j++){
			oA[j].className='';
		}*/
		for(var j in oA){//��������
			oA[j].className='';
		}
	}
	RoDiv.onmouseout=function(){//oA��������,����Ƴ�������ʱ
		timer2=setInterval(fun_rot,2000);//�ֲ�ͼ
	}
	Rotate.onmouseover=function(){//ͼƬ��������,�������ֹͣ��ʱ
		clearInterval(timer2);//ֹͣ��ʱ_��ն�ʱ
	}
	Rotate.onmouseout=function(){//ͼƬ��������,����Ƴ�������ʱ
		timer2=setInterval(fun_rot,2000);//�ֲ�ͼ
	}
	
	
/*------��Ƶ����------*/
	var Video=document.getElementById('js_video');
	var oVideo=Video.getElementsByTagName('li');
	var Video2=document.getElementById('js_video2');
	var oVideo2=Video2.getElementsByTagName('ul');
	var vid_class='vid';//��ֵ
	trends(Video, oVideo, oVideo2, vid_class);//���ú���
	
/*------��������------*/	
	var Match1=document.getElementById('js_match1');
	var MaLi=Match1.getElementsByTagName('li');
	var Match2=document.getElementById('js_match2');
	var MaDiv=Match2.getElementsByTagName('div');
	var mat_class='mat';//��ֵ
	trends(Match1, MaLi, MaDiv , mat_class);
/*------�ͷ�ר��------*/	
	var Custom1=document.getElementById('js_custom1');
	var CuLi=Custom1.getElementsByTagName('li');
	var Custom2=document.getElementById('js_custom2');
	var CuDiv=Custom2.getElementsByTagName('div');
	var cus_class='cus';//��ֵ
	trends(Custom1, CuLi, CuDiv , cus_class);//���ú���
/*����*/
	var Board1=document.getElementById('js_board1');
	var BoLi=Board1.getElementsByTagName('li');
	var Board2=document.getElementById('js_board2');
	var BoDiv=Board2.getElementsByTagName('div');
	var boa_class='boa';//��ֵ
	trends(Board1, BoLi, BoDiv , boa_class);//���ú���
/*Ӣ��/Ƥ��*/
	var Hero1=document.getElementById('js_hero1');
	var HeLi=Hero1.getElementsByTagName('li');
	var Hero2=document.getElementById('js_hero2');
	var HeDiv=Hero2.getElementsByTagName('div');
	var her_class='her';//��ֵ
	trends(Hero1, HeLi, HeDiv , her_class);//���ú���
/*------����ʾ��Ƶ------*/	
	var Section=document.getElementsByClassName('section')[0];//������������
	var Display=document.getElementById('js_display');//����ʾ��Ƶ
	Display.onclick=function(){
		Video2.style.height=700+'px';
		Section.style.height=2117+'px';
	}
	/*
<Ҫ��װһ������_������ֵ>
���ⲿ���� Match1,
����Ķ��� MaLi,
����Ķ��� MaDiv,
var=this��ֵ,
var=��ǰli��ֵ,
��Ҫ���ĵ�class,
*/
//father������, ��ǰli����, son��Ҫ�ı��, class��, 
function trends( father , li , son , clas){//��װ����
	var _this;//����
	var j;//��ǰli��ֵ
	father.onmouseover = function (e) {/*�������_��ֹð��*/
		if (!e) e = window.event;
		var reltg = e.relatedTarget ? e.relatedTarget : e.fromElement;
		while (reltg && reltg != this) reltg = reltg.parentNode;
		if (reltg != this) {
			for(var i=0;i<li.length;i++){//��һ������div����
				li[i].className=' ';//��һ�����������
				son[i].style.display='none';//��һ��������none
			}		
			_this.className=clas;//��ֵ���һ���Ƴ�����
			for( j=0;j<li.length;j++){
				if(li[j].className==clas){//�жϵ�ǰli�Ƿ����
					son[j].style.display='inline';//��һ��li����ֵ
					break;//����ѭ��
				}
			}
			son[j].style.display='inline';//������ʼֵ
		}
	}
	for(var i=0;i<li.length;i++){
		li[i].onmouseover=function(){//�������li����
			this.className=clas;//��ǰ���� �� �� ��ֵ
			_this=this;//li����
			for( j=0;j<li.length;j++){
				if(li[j].className==clas){//�жϵ�ǰli�Ƿ����
					son[j].style.display='inline';//��һ��li����ֵ
					break;//����ѭ��
				}
			}
		}
		li[i].onmouseout=function(){//����Ƴ�
			this.className=' ';//��ǰ���� �� �� ��ֵ
			son[j].style.display='none';
		}
	}
	father.onmouseout=function(e){/*����Ƴ�_��ֹð��*/
		if (!e) e = window.event;
		var reltg = e.relatedTarget ? e.relatedTarget : e.toElement;
		while (reltg && reltg != this) reltg = reltg.parentNode;
		if (reltg != this) {
			_this.className=clas;//��һ���Ƴ�div
			son[j].style.display='inline';//��һ���Ƴ�div
		}
	}
}	

}