const Sequalize = require('sequelize');

const sequalize = new Sequalize(process.env.TEST_DB_NAME, process.env.TEST_DB_USER, process.env.TEST_DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false
});

module.exports = sequalize;