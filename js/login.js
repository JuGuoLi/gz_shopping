
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

	function user_login(){
		var xhr=createXhr();
		xhr.onreadystatechange=function(){
			if (xhr.readyState==4&&xhr.status==200)
			{
				var res=xhr.responseText;
				if (res=='0')
				{
					alert('用户名不能为空')
				}else if(res=='1'){
					alert('密码不能为空')	
				}else if (res=='2')
				{
					alert('登录成功')
				}else{
					alert('登录名或密码错误')	
				}
			}
		}
		xhr.open('post','/user/login',true);
		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		var uname=$('input1').value;
		var upwd=$('input2').value;
		var formdata='uname='+uname+'&upwd='+upwd;
		xhr.send(formdata);
	}