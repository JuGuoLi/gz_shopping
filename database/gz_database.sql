SET NAMES UTF8;
DROP DATABASE IF EXISTS gz;
CREATE DATABASE gz CHARSET=UTF8;
USE gz;

#品牌表
CREATE TABLE gz_laptop_trademark(				
	ltid	INT PRIMARY KEY AUTO_INCREMENT,#————品牌表gz_laptop_trademark主键为tid
	tname		VARCHAR(32)
); 

#系列表
CREATE TABLE gz_laptop_series(				
	lsid		INT PRIMARY KEY AUTO_INCREMENT,#————系列表 gz_laptop_series 主键为sid
	tid	INT,
	sname				VARCHAR(64),
	FOREIGN KEY(tid) REFERENCES gz_laptop_trademark(ltid)	#laptop_p_id为品牌表laptop_pid的外键
);

#商品表
CREATE TABLE gz_laptop(				
	lid				INT PRIMARY KEY AUTO_INCREMENT,#————laptop表的主键为lid
	trademark_id		INT,
	series_id		INT,
	biao_ti		VARCHAR(128),
	fu_biao_ti	VARCHAR(128),
	lname	VARCHAR(32),
	bao_zheng			VARCHAR(128),
	shuo_ming		VARCHAR(128),
	price			DECIMAL(10,2),
	vip_price		DECIMAL(10,2),
	count			SMALLINT,
	gift			VARCHAR(64),
	fen_lei			VARCHAR(32),
	product_date	BIGINT, 	
	isOnsale	TINYINT,
	color			VARCHAR(32),
	OS	VARCHAR(64),
	gu_tai_ying_pan	VARCHAR(32),
	ji_xie_ying_pan	VARCHAR(32),
	memory			VARCHAR(64),
	fen_bian_lv		VARCHAR(32),
	xian_shi_ping		VARCHAR(64),
	xian_shi_qi		VARCHAR(128),
	xian_ka	VARCHAR(64),
	guang_qu			TINYINT,	
	she_xiang_tou		VARCHAR(64),
	shu_ru	VARCHAR(64),
	dian_chi			VARCHAR(64),
	hou_du			VARCHAR(32),
	zhong_liang			VARCHAR(32),
	jie_kou			VARCHAR(128),
	yin_pin			VARCHAR(64),
	wang_luo			VARCHAR(64),
	mai_ke_feng		VARCHAR(64),
	lan_ya			VARCHAR(32),
	yu_zhuang_ruan_jian	VARCHAR(64),
	FOREIGN KEY(trademark_id) REFERENCES gz_laptop_trademark(ltid),#trademark_id为品牌表tid的外键
	FOREIGN KEY(series_id) REFERENCES gz_laptop_series(lsid) #series_id为系列表sid的外键
);

#用户表
CREATE TABLE gz_user(				
	uid				INT PRIMARY KEY AUTO_INCREMENT,	#————user表的主键是uid
	uname		VARCHAR(32),
	upwd			VARCHAR(32),
	email			VARCHAR(64),
	phone		CHAR(11),
	user_name	VARCHAR(32) DEFAULT null,
	shen_fen_zheng	CHAR(18) DEFAULT null,
	gender			TINYINT DEFAULT null
);

#地点表
CREATE TABLE gz_address(				
	aid				INT PRIMARY KEY AUTO_INCREMENT,#————address的表的主键是aid
	user_id		INT,
	sheng				VARCHAR(16),
	cheng_shi			VARCHAR(16),
	xian				VARCHAR(16),
	ju_ti_wei_zhi	VARCHAR(128),
	you_bian	VARCHAR(12),
	biao_qian			VARCHAR(32),
	isOnDefault	TINYINT,
	FOREIGN KEY(user_id) REFERENCES gz_user(uid)	#user_id是user表uid的外键
);

#订单表
CREATE TABLE gz_order(				
	oid					INT PRIMARY KEY AUTO_INCREMENT,#——order表的主键为oid
	user_id			INT,
	address_id	INT,
	state				INT,
	ding_dan_shi_jian		date,
	jiao_fu_shi_jian		date,
	shou_huo_shi_jian		date,
	FOREIGN KEY(user_id) REFERENCES gz_user(uid),		#user_id为address表uid的外键
	FOREIGN KEY(address_id) REFERENCES gz_address(aid)		#address_id为user表aid的外键
);

#评价表
CREATE TABLE gz_order_evaluate(				
	order_eid		INT PRIMARY KEY AUTO_INCREMENT,#(评价表)————order_evaluate表的主键为order_eid	, 订单_id为order表oid 的外键
	order_id			INT,
	isBest		TINYINT,
	isMiddle		TINYINT,
	isBad		TINYINT,
	evaluate				VARCHAR(128),
	image				VARCHAR(128) DEFAULT NULL,
	FOREIGN KEY(order_id) REFERENCES gz_order(oid)
);

#订单详情
CREATE TABLE gz_order_detail(				
	did					INT PRIMARY KEY AUTO_INCREMENT,#————order_detail表的主键为did
	order_id		INT,
	product_id	INT,
	shou_huo_ren  varchar(32),
	count				INT,
	phone		CHAR(11),
	gu_hua	VARCHAR(32),
	FOREIGN KEY(order_id) REFERENCES gz_order(oid),		#order_id 为order表oid的外键
	FOREIGN KEY(product_id) REFERENCES gz_laptop(lid)		#product_id 为laptop表lid的外键
);

#购物车
CREATE TABLE gz_shopping(				#————shopping表的主键是 购物车_id
	sid			INT PRIMARY KEY AUTO_INCREMENT,
	user_id				INT,
	laptop_id				INT,
	count					INT,
	FOREIGN KEY(user_id) REFERENCES gz_user(uid),		#user_id为user表uid 的外键
	FOREIGN KEY(laptop_id) REFERENCES gz_laptop(lid)		#laptop_id为laptop表lid 的外键
);

#收藏夹
CREATE TABLE gz_shoucang(				#————收藏夹表的主键是 收藏夹_id
	shoucang_id			INT PRIMARY KEY AUTO_INCREMENT,
	user_id				INT,
	laptop_id				INT,
	count					INT,
	FOREIGN KEY(user_id) REFERENCES gz_user(uid),		#user_id为user表uid 的外键
	FOREIGN KEY(laptop_id) REFERENCES gz_laptop(lid)		#laptop_id为laptop表lid 的外键
);
