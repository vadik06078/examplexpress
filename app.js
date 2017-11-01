var express = require('express');
var http = require("http");
var path = require('path');
var config = require('config');
var log = require('libs/log');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');


const app = express();
//app.set('port',config.get('port'));


app.engine('ejs', require('ejs-locals'));  //файлы ejs надо обрабатывать с помощью 'ejs-local'
app.set('views', path.join(__dirname, 'templates'));  //настройки для системы шаблонизации
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json());  //you can find data by req.body...
app.use(cookieParser());
/*app.use(app.router);
app.get('/', function(req, res, next){
    res.end("TeSt");
});*/




app.get('/', function(req, res, next){
    res.render("index", {
       // body: '<b>Hiii<b>'
    });
});


app.use(express.static(path.join(__dirname, 'public')));



app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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


//--------JWT-----------
app.post('/api', function(req, res) {
    var user = {name: 'Kate'};
    var token = jwt.sign({ user }, "my_key");
    res.json({
        token: token
    })
});

http.createServer(app).listen(config.get('port'),function(){
    log.info('Express server listening on port ' + config.get('port'));
});




/*
//middleware

app.use(function (req,res,next) {
  if(req.url =='/'){
      res.end("Hi");
  }  else {
    next();
  }
});



app.use(function (req,res,next) {
    if(req.url =='/test'){
        res.end("Hiiiiiii");
    }  else {
        next();
    }
});

app.use(function (req,res,next) {
    if(req.url =='/error'){
        next ( new Error('aaaaaa'));
    }  else {
        next();
    }
});



app.use(function(req, res){
  res.send(404, "Page not found");
});

*/





/*
// view engine setup
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
*/