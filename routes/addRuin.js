var express = require('express');
var router = express.Router();
var con = require('../sql.js');
var multiparty =require('multiparty');

router.post('/', function(req, res, next) {
    var userName = req.session.userName;
    var form = new multiparty.Form();
    form.parse(req,function(err,fields,files){
    var ruinName = fields.ruinName[0];
    var location = fields.location[0];
    var integrity = fields.integrity[0];
    var level = fields.level[0];

        con.query('insert into ruininfo value (?,?,?,?,?,?)',[0,ruinName,location,integrity,level,userName],function(err,data){
            if(err){
                throw err;
            }else{
                con.query('select * from ruininfo',function(err,data){

                    var pager = {};
                    pager.maxNum = data.length;
                    //显示的总记录数
                    pager.pageCurrent = 1;
                    //声明当前页为当前页码数值，默认为1
                    pager.pageSize = 7;
                    //每页显示多少条记录
                    pager.pageCount = parseInt(Math.ceil(pager.maxNum / pager.pageSize));
                    //计算总共有多少页

                    var datalist = data.slice((pager.pageCurrent-1) * pager.pageSize , (pager.pageCurrent-1) * pager.pageSize + pager.pageSize);
                    //修改传递数据数量

                    if (err){
                        throw err;
                    }else{
                        res.render('ruininfo',{
                            ruininfo:datalist,
                            pager:pager,
                            userName:userName
                        });
                    }
                })
            }
        })
    })

});

module.exports = router;