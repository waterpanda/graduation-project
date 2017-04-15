//是否登陆
var key = 0;
//是否是老师
var character = 1;
//是否可以提交作业
var commit = 0;
//是否提交过作业
var commited = 1;
//登录判断
var login = document.getElementById("login");
var loginBox = document.getElementById("loginBox");
var logshow = document.getElementById("logshow");
var storage = window.localStorage;
if(login){
	login.addEventListener("tap",function(){
		var account = document.getElementById("account").value;
		var pass = document.getElementById("password").value;
		mui.ajax('http://123.207.119.157:3000/users?num='+account,{
			dataType:'json',//服务器返回json格式数据
			type:'get',//HTTP请求类型
			timeout:10000,//超时时间设置为10秒；
			headers:{'Content-Type':'application/json'},	              
			success:function(data){
				if(pass == data[0].password){
					storage.id = data[0].id;
					mui.ajax('http://123.207.119.157:3000/users/'+data[0].id,{
						data:{
							num : account,
							name : data[0].name,
							password : data[0].password,
							key : 1,
							pic : data[0].pic,
							character : data[0].character
						},
						dataType:'json',//服务器返回json格式数据
						type:'put',//HTTP请求类型
						timeout:10000,//超时时间设置为10秒；
						headers:{'Content-Type':'application/json'},	
						success:function(data2){
						}
					});
					mui.toast('登陆成功',{ duration:'long', type:'div' });
					loginBox.style.display = "none";
					logshow.style.display = "block";
					
				}else{ 
					mui.toast('密码错误',{ duration:'long', type:'div' });
				}
			},
			error:function(xhr,type,errorThrown){
				//异常处理；
				mui.toast('用户名不正确',{ duration:'long', type:'div' });
			}
		});
	})
}
