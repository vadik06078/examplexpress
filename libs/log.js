const winston = require('winston');
const ENV = process.env.NODE_ENV;    //окружение...ранее app.get('env');


function getLogger(module) {
     //var path = module.filename.split('/').slice(-2).join('/');

    return new winston.Logger({
        transports: [
            new winston.transports.Console({
                colorize: true,
                level: ENV == 'development' ? 'debug' : 'error',
                label: "unknown"//path
            })
        ]
    });
}

module.exports = getLogger();