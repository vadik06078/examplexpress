var express = require('express');
var http = require("http");
var path = require('path');

var app = express();
app.set('port',3000);

http.createServer(app).listen(app.get('port'),function(){
  console.log('Express server listening on port ' + app.get('port'));
});


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


app.use(function (err, req, res, next) {
    if (app.get('env') == development){
      app.use(express.errorHandler());
    }
});
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