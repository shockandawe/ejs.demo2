var express = require('express');
var router = express.Router();
var con = require('../sql.js');


router.post('/',function(req,res,next){

    //获取用户输入的内容
    var val = req.body;
    var userName = val.userName;
    var userPwd = val.userPwd;


    //加入user数据库
    con.query('INSERT into admin value (?,?,?)',[0,userName,userPwd],(err,results,fields)=>{
        if(err) throw err;
        res.render('register',{
            userName:userName
        });
    })
})
module.exports = router;