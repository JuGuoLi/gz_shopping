const express=require('express');
const pool=require('../pool.js');
var router=express.Router();

//注册

//检测用户名是否被占用的端口
router.get('/regCheckUname',function(req,res){
	var $uname=req.query.uname;
	if (!$uname)
	{
		res.send('0');
		return;
	}
	var sql='select * from gz_user where uname=?'
	pool.query(sql,$uname,function(err,result){
		if(err) throw err;
		if (result.length>0)
		{
			res.send('2');
		}else{
			res.send('1');
		}
	})
})

//检测邮箱是否被占用的端口
router.get('/regCheckEmail',function(req,res){
	var $email=req.query.email;
	if (!$email)
	{
		res.send('0');
		return;
	}
	var sql='select * from gz_user where email=?'
	pool.query(sql,$email,function(err,result){
		if(err) throw err;
		if (result.length>0)
		{
			res.send('2');
		}else{
			res.send('1');
		}
	})
})

//检测手机是否被占用的端口
router.get('/regCheckPhone',function(req,res){
	var $phone=req.query.phone;
	if (!$phone)
	{
		res.send('0');
		return;
	}else if($phone.length<11 || $phone.length>11){
		res.send('3');
		return;
	}
	var sql='select * from gz_user where phone=?'
	pool.query(sql,$phone,function(err,result){
		if(err) throw err;
		if (result.length>0)
		{
			res.send('2');
		}else{
			res.send('1');
		}
	})
})

//注册端口
router.post('/reg',function(req,res){
	var obj=req.body;
	var $uname=obj.uname;
	var $upwd=obj.upwd;
	var $email=obj.upwd;
	var $phone=obj.phone;

	var sql='insert into gz_user values (null,?,?,?,?,null,null,null)';
	pool.query(sql,[$uname,$upwd,$email,$phone],function(err,result){
		if (result.affectedRows>0)
		{
			res.send('1');
		}else{
			res.send('0');
		}
	})
});

//登录

router.post('/login',function(req,res){
	var obj=req.body;
	var $uname=obj.uname;
	var $upwd=obj.upwd;
	if (!$uname)
	{
		res.send('0');
		return;
	}
	if (!$upwd)
	{
		res.send('1');
		return
	}
	var sql='select * from gz_user where uname=? and upwd=?'
	pool.query(sql,[$uname,$upwd],function(err,result){
		if(err) throw err;
		if (result.length>0)
		{
			res.send('2');
		}else{
			res.send('3');
		}
	})
})

module.exports=router;