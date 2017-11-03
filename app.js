var express = require('express');
var router = require('router');
var Emitter = require("events");
var emitter = new Emitter();
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


var _ = require("lodash");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;


//////////////////////////


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


app.post('/signin', (req, res, next) => {
    console.log(req);
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

app.post("/hello",function(req, res) {
    if (req.body.name == "hi") {
        console.log(req.body.name);
    }
});
//******************************************






var server = http.createServer(app);
server.listen(config.get('port'),function(){
    log.info('Express server listening on port ' + config.get('port'));
});

var io = require('socket.io')(server);

var user = new User({
    username: ' ',
    password: ' '
});



io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });  //передаёт
    socket.on('my other event', function (data) {   //слушает
        var q = data;
        console.log(q);
        var user = new User({
            username: q[0],
            password: q[1]
        });

        user.save(function (err, user, affected) {
            if (err) throw err;
        });

        console.log(user);
    });



    socket.on('loginuser', function (data) {   //слушает
        User.findOne({username: data[0]}, function (err, tester) {
            console.log(tester);
        })

            var user = data
            var token = jwt.sign( { user }, "my_key");  //кодируем
           /* res.json({
                token: token
            })*/
            console.log(token);
            var l = jwt.decode(token);  //декодируем
            console.log(l);

         //  emitter.emit("request");

    });
/*
    emitter.on('request', function(req,res){
        res.cookie("qwerty");
        console.log('i am here');
    });
*/
/*

// создаем парсер для данных application/x-www-form-urlencoded
    var urlencodedParser = bodyParser.urlencoded({extended: false});

    app.use(express.static(__dirname + "/public"));

    app.post("/signin", urlencodedParser, function (request, response) {
        if(!request.body) return response.sendStatus(400);
        console.log(request.body);
        response.send(`${request.body.userName} - ${request.body.userAge}`);
    });

    app.get("/", function(request, response){

        response.send("<h1>Главная страница</h1>");
    });
/*
    app.use(passport.initialize());

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());




    var users = [
        {
            id:1,
            name: 'Kate',
            password: '123'
        },
        {
            id: 2,
            name: 'Kirill',
            password: '321'
        }
    ];

    var jwtOptions = {}
    jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    jwtOptions.secretOrKey = "key";

    var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next){
        console.log('payload received', jwt_payload);
        var user = users[_.findIndex(user, {id: jwt_payload.id})];
        console.log(user);
        if (user){
            next(null, user)
        } else {
            next(null, false);
        }
    });

    passport.use(strategy);

    var urlencodedParser = bodyParser.urlencoded({extended: false});

    app.post("/signin", urlencodedParser, function(req, res) {
        if (req.body.name && req.body.password) {
            var name = req.body.name;
            var password = req.body.password;
            console.log(req.body.name);
        }

        var user = users[_.findIndex(users, {name: name})];
        console.log(user);

        if (!user) {
            res.status(401).json({message: "no user"});
            console.log("no user");
        }


        if (user.password === req.body.password){
            var payload = {id: user.id};
            var token = jwt.sign(payload, jwtOptions.secretOrKey);
            res.json({message: "ok", token : token});
        }  else {
            res.status(401).json({message:"password wrong"});
        }
    });


   /* socket.on('message', function (text, cb) {   //слушает
        socket.broadcast.emit('message', text);
        cb(text);
    });*/
});






/*

// создаем парсер для данных application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.static(__dirname + "/public"));

app.post("/", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    response.send(`${request.body.userName} - ${request.body.userAge}`);
});

app.get("/", function(request, response){

    response.send("<h1>Главная страница</h1>");
});


*/



//--------JWT-----------
/*
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

*/












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