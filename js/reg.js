var isUname=false;
var isUpwd=false;
var isEmail=false;
var isPhone=false;
var isBox=false;
var yzm=false;
var arr=[];
var str='';
var b=[];
	function $(id){
		return document.getElementById(id);
	}

	function createXhr(){
		var xhr;
		if (window.XMLHttpRequest)
		{
			xhr=new XMLHttpRequest();
		}else{
			xhr=new ActiveXObject('Microsoft XMLHttp')
		}
			return xhr;
	}

	//检测用户名是否被占用
	function checkUname(){
		var xhr=createXhr();
		xhr.onreadystatechange=function(){
			if (xhr.readyState==4&&xhr.status==200)
			{
				var res=xhr.responseText;
				if (res=='0')
				{
					$('span_uname').innerHTML='用户名不能为空';
				}else if(res=='1'){
					$('span_uname').innerHTML='用户名未被注册';
					isUname=true;
				}else(
					$('span_uname').innerHTML='用户名已被注册'	
				)
			}
		}
		var uname=$('uname').value;
		xhr.open('get','/user/regCheckUname?uname='+uname,true);
		xhr.send(null);
	}

	//检测密码格式
	function mima(){
		var upwd=$('upwd').value;
		if (upwd=='')
		{
			$('span_upwd').innerHTML='密码不能为空';
		}else if (upwd.length<6||upwd.length>20)
		{
			$('span_upwd').innerHTML='密码过长或过短';
		}else if(upwd.length>=6&&upwd.length<=20){
			$('span_upwd').innerHTML='';
		}
	}


	//检测密码是否一致
	function checkUpwd(){
		var upwd=$('upwd').value;
		var cupwd=$('cupwd').value;
		if(upwd==''){
			$('span_upwd').innerHTML='密码不能为空'
		}else if(cupwd==''){
			$('span_cupwd').innerHTML='密码不能为空'
		}else	if (upwd==cupwd)
		{
			$('span_cupwd').innerHTML='密码一致';
			isUpwd=true;
		}else{
			$('span_cupwd').innerHTML='密码不一致,请重新输入'
		}
	}

	//检测邮箱是否被注册
	function checkEmail(){
		var xhr=createXhr();
		xhr.onreadystatechange=function(){
			if (xhr.readyState==4&&xhr.status==200)
			{
				var res=xhr.responseText;
				if (res=='0')
				{
					$('span_email').innerHTML='邮箱不能为空';
				}else if(res=='1'){
					$('span_email').innerHTML='邮箱未被注册';
					isEmail=true;
				}else(
					$('span_email').innerHTML='邮箱已被注册'	
				)
			}
		}
		var email=$('email').value;
		xhr.open('get','/user/regCheckEmail?email='+email,true);
		xhr.send(null);
	}

	//检测手机号是否被占用
	function checkPhone(){
		var xhr=createXhr();
		xhr.onreadystatechange=function(){
			if (xhr.readyState==4&&xhr.status==200)
			{
				var res=xhr.responseText;
				if (res=='0')
				{
					$('span_phone').innerHTML='手机号不能为空';
				}else if(res=='3'){
					$('span_phone').innerHTML='手机号格式不正确';
				}else if(res=='1'){
					$('span_phone').innerHTML='手机号未被注册';
					isPhone=true;
				}else(
					$('span_phone').innerHTML='手机号已被注册'	
				)
			}
		}
		var phone=$('phone').value;
		xhr.open('get','/user/regCheckPhone?phone='+phone,true);
		xhr.send(null);
	}
	
function checkBox(){
		if ($('hd').value=='1')
	{
		isBox=true;
	}
}
	

function a_yzm(){
	var name=['张三','李四','王五','赵六','李逵','王八','老六','刘七','关羽','张飞'];
		//随机取4个,放入数组中
		for (var i=0;i<4 ;i++ )
		{
			var a=Math.floor(Math.random()*10);
			arr[i]=name[a];
			str=str+name[a]+' ';
			b.push(name[a]);
		}	
	$('yzm_a').innerHTML=b[0]+b[1];
}
			
function a_yzm_load(){
	a_yzm();
}

function checkYZM(){
	var a=$('yzm_a').innerHTML;
	var b=$('yzm_input').value;
	if(b=='')
	{
		$('span_yzm').innerHTML='验证码不能为空';
	}else	if (a==b)
	{
		$('span_yzm').innerHTML='验证码正确';
		yzm=true;
	}else{
		$('span_yzm').innerHTML='验证码错误';
	}
	
}

	//注册方法
	function reg(){
		if (isUname==true&&isUpwd==true&&isEmail==true&&isPhone==true&&isBox==true&&yzm==true)
		{	
			
			var xhr=createXhr();
			xhr.onreadystatechange=function(){
			if (xhr.readyState==4&&xhr.status==200)
				{
				var res=xhr.responseText;
				console.log(res);
				}
			}
			xhr.open('post','/user/reg',true);
			xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			var uname=$('uname').value;
			var upwd=$('upwd').value;
			var email=$('email').value;
			var phone=$('phone').value;
			var formdata='uname='+uname+'&upwd='+upwd+'&email='+email+'&phone='+phone;
			xhr.send(formdata);
		}else{
			alert('注册信息有误，请重新填写')
		}
	}