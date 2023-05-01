var express = require('express');
var router = express.Router();
var con = require('../sql.js');
var multiparty =require('multiparty');

router.post('/', function(req, res, next) {

    var form = new multiparty.Form();
    //上传的图片需要保存在目录
    form.uploadDir = './public/upload';
    form.parse(req,function(err,fields,files){
        var upid = fields.upid[0];
        //编辑后更新的id
        var pic = files.pic[0].path;
        //上传图片的路径
        var imgName = fields.imgName[0];
        //上传图片名称

        con.query(`update banner set ID=?,name=?,imgurl=? where ID=${upid}`,[upid,imgName,pic],function(err,data){
            if(err){
                throw err;
            }else{
                con.query('select * from banner',function(err,data){

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
                        res.render('bannerlist',{
                            bannerlist:datalist,
                            pager:pager
                        });
                    }
                })
            }
        })

    })

});

module.exports = router;