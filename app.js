var express = require('express');
var router = require('router')
var app = express();
var http = require("http");
var path = require('path');
var config = require('config');
var log = require('libs/log');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');
var User = require('models/user').User;

var passport = require('passport');
var localStrategy = require('passport-local');
var jwtStrategy = require('passport-jwt');
var extractJwt = require('passport-jwt');

app.use(passport.initialize());





//app.set('port',config.get('port'));


app.engine('ejs', require('ejs-locals'));  //файлы ejs надо обрабатывать с помощью 'ejs-local'
app.set('views', path.join(__dirname, 'templates'));  //настройки для системы шаблонизации
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json());  //you can find data by req.body...
app.use(cookieParser());



app.get('/', function(req, res, next){
    res.render("index", {
       // body: '<b>Hiii<b>'
    });
});

app.get('/signin', function(req, res, next){
    res.render("signin", {
    });
});

app.get('/signup', function(req, res, next){
    res.render("signup", {
    });
});

app.use(express.static(path.join(__dirname, 'public')));


//*****************ERRORS************
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
//******************************************






var server = http.createServer(app);
server.listen(config.get('port'),function(){
    log.info('Express server listening on port ' + config.get('port'));
});

var io = require('socket.io')(server);

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });  //передаёт
    socket.on('my other event', function (data) {   //слушает
        console.log(data);
    });
    socket.on('message', function (text, cb) {   //слушает
        socket.broadcast.emit('message', text);
        cb(text);
    });
});

/*
var user = new User({
    username: "Test38",
    password: "secret"
});

user.save(function (err, user, affected) {
    if (err) throw err;

    User.findOne({username: "Test30"}, function(err, tester){
        console.log(tester);
    })
});
*/
//--------JWT-----------
app.post('/', function(req, res) {
    var user = {name: 'Kate'};
    var token = jwt.sign({ user }, "my_key");
    res.json({
        token: token
    });
    console.log(token);
    var l = jwt.decode(token);  //декодируем
    console.log(l);
});


function somefunc(){
    var name = document.getElementById("login").value;
    var password = document.getElementById("password").value;
    alert(name + "    " +password);
}











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