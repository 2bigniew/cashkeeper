const Sequalize = require('sequelize');
const con = require('../Connection/Connetion');

const MoneyQuotes = con.define('MoneyQuotes', {
    id: { type: Sequalize.INTEGER, primaryKey: true },
    quote: Sequalize.STRING,
    author_or_source: Sequalize.STRING
}, {
    tableName: 'money_quotes',
    createdAt: false,
    updatedAt: false,
    underscored: true
});

module.exports = MoneyQuotes;