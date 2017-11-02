var express = require('express');
var jwt = require('jsonwebtoken');
var _ = require("lodash");
var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');

var passport = require('passport');
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;


var app = express();

app.use(passport.initialize());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());



app.get("/", function(req, res){
    res.json({message: "Express is up!"})
});

app.listen(3000, function(){
    console.log("Express running");
})



const jwtsecret = 'key';


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

app.post("/login", function(req, res) {
    if (req.body.name && req.body.password) {
        var name = req.body.name;
        var password = req.body.password;
        console.log(req.body.name);
    }

    var user = users[_.findIndex(users, {name: name})];
    console.log(user);

    if (!user) {
        res.status(401).json({message: "no user"});
    }


      if (user.password === req.body.password){
      var payload = {id: user.id};
      var token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({message: "ok", token : token});
  }  else {
      res.status(401).json({message:"password wrong"});
  }
});
/*
{
        id:1,
        name: 'Kate',
        password: '123'
    };


const app = express();
app.use(passport.initialize());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.get("/", function(req, res){
  res.json({message: "Express is up!"})
});


app.post("/login", function(req, res){
  if(req.body.name && req.body.password){
      var name = req.body.name;
      var password = req.body.password;
  }

  var user = users[_.findIndex(user,{name : name})];

  if (!user){
      res.status(401).json({message: "no user"})
  }

/*     if (user.password === req.body.password){
      var payload = {id: user.id};
      var token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({message: "ok", token : token});
  }  else {
      res.status(401).json({message:"password wrong"});
  }
});

*/
/*
var user = {
    name: 'Kate',
    password: '123'
};

app.use(passport.initialize());

passport.use(new LocalStrategy( {
    username: 'login',
    password: 'password'
},
    function(login, password, done){
        if ((login === 'Kate') & (password === '123')){
            console.log('Верные данные');
        } else {
            console.log('Ошибка');
        }
    }
)

*/




/*
app.get('/api/jwt', function(req,res){


    var user = {name: 'Kate'};
    var token = jwt.sign({ user }, "my_key");  //кодируем
    res.json({
        token: token
    })
    console.log(token);
    var l = jwt.decode(token);  //декодируем
    console.log(l);
});



app.listen(3000, function (){
    console.log('App listening on port 3000!')
});*/