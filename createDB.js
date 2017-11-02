var User = require('models/user').User;

var user = new User({
    username: "Test223",
    password: "secret"
});

user.save(function (err, user, affected) {
    if (err) throw err;

    User.findOne({username: "Test8"}, function(err, tester){
        console.log(tester);
    })
})


/*var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/examplexpress', { useMongoClient: true });
mongoose.Promise = global.Promise;*/
/*
var Cat = mongoose.model('Cat', { name: String });

var kitty = new Cat({ name: 'Zildjian' });



kitty.save(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('meow');
    }
});

console.log(kitty);
*/



/*
var schema = mongoose.Schema({
    name: String
});
schema.methods.meow = function(){
    console.log(this.get('name'));
};

var Cat = mongoose.model('Cat', schema);

var kitty = new Cat({
    name: "Star"
})

kitty.save(function (err, kitty, affected) {
    kitty.meow();
});
*/