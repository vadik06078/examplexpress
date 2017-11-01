var express = require('express');
const app = express();
var jwt = require('jsonwebtoken');

app.get('/api/jwt', function(req,res){
   /* res.json({
        text: 'my api'
    })*/

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
});