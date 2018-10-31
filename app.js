const express=require('express');
const userRouter=require('./routers/user.js');
const bodyParser=require('body-parser');
var app=express();
app.listen(3000);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended:false
}));
app.use('/user',userRouter);
