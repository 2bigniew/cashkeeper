const Sequalize = require('sequelize');
const sequalize = new Sequalize('cashkeeper', 'zbigniew', 'admin1989', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = sequalize;