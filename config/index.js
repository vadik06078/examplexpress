var nconf = require('nconf');
var path = require('path');

nconf.argv()
   .env()
   .file({ file: path.join(__dirname, 'tsconfig.json') });

module.exports = nconf;