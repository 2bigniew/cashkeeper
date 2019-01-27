let sequalize;
switch(process.env.NODE_ENV) {
    case 'development':
        sequalize = require('./DevConnection');
        console.log(process.env.NODE_ENV);
        break;
    case 'production':
        sequalize = require('./ProdConnection');
        console.log(process.env.NODE_ENV);
        break;
    case 'test':
        sequalize = require('./TestConnection');
        console.log(process.env.NODE_ENV);
        break;
    default:
        console.log('Please, choose enviroment type');
}

module.exports = sequalize;
