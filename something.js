var express = require('express');
var router = express.Router();

router.post('/test/submit', function(req, res, next) {
    var id =req.body.id;
   res.redirect("/test/" + id);
});