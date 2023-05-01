var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

//前台主页
var indexRouter = require('./routes/index');
//后台账户登录
var adminRouter = require('./routes/admin');
//后台左边栏
var left = require('./routes/left');
//后台右边栏
var right = require('./routes/right');
//后台banner图表格
var bannerlist = require('./routes/bannerlist');
//添加banner图功能
var addBanner = require('./routes/addBanner');
//删除banner图功能
var del = require('./routes/del');
//编辑banner图功能
var update = require('./routes/update');
//注册功能
var register = require('./routes/register');
//查找bannerlist功能
var search = require('./routes/search');
//后台ruininfo表格
var ruininfo = require('./routes/ruininfo');
//添加ruininfo
var addRuin = require('./routes/addRuin');
//删除ruininfo
var delRuin = require('./routes/delRuin');
//搜索ruininfo
var searchRuin = require('./routes/searchRuin');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'mysecretkey', // 用于加密session信息的密钥
  resave: false,
  saveUninitialized: true
}));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/left', left);
app.use('/right',right);
app.use('/bannerlist',bannerlist);
app.use('/addBanner',addBanner);
app.use('/del',del);
app.use('/update',update);
app.use('/register',register);
app.use('/search',search);
app.use('/ruininfo',ruininfo);
app.use('/addRuin',addRuin);
app.use('/delRuin',delRuin);
app.use('/searchRuin',searchRuin);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
