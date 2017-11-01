var mongoose = require('mongoose');
//mongoose.Promise = require('mpromise');
var config = require('config');

mongoose.connect(config.get('mongoose:uri'), {useMongoClient: true} /*config.get('mongoose:options')*/);

module.exports = mongoose;