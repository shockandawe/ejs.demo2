var express = require('express');
var router = express.Router();
var con = require('../sql.js');

router.get('/', function(req, res, next) {
    res.render('admin');
});

router.post('/main',function(req,res,next){

   //获取用户输入的内容
    var val = req.body;
    var userName = val.userName;
    var userPwd = val.userPwd;
    //查询数据库
    con.query("SELECT * from admin where userName=? and userPwd=?", [userName, userPwd], function(err,data){
        if(err){throw err;
        }
        else if(data.length > 0){
            req.session.userName = userName;
            res.render("main",{
            });
        }
        else{
            res.end("Failed");
        }
        //如果有则输出登录成功
    })

})
module.exports = router;