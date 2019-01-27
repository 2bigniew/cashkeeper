const Sequalize = require('sequelize');

const sequalize = new Sequalize(process.env.DEV_DB_NAME, process.env.DEV_DB_USER, process.env.DEV_DB_PASSWORD, {
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