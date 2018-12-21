const Sequalize = require('sequelize');
const con = require('../Connection/Connetion');

const UserAccount = con.define('UserAccount', {
    user_id: { type: Sequalize.INTEGER, primaryKey: true },
    login: { type: Sequalize.STRING, is: ["^[a-z]+$",'i'] } ,
    password: { type: Sequalize.STRING, is: ["^[a-z]+$",'i'] },
    firstname: { type: Sequalize.STRING, is: ["^[a-z]+$",'i'] },
    lastname: { type: Sequalize.STRING, is: ["^[a-z]+$",'i'] },
    bank_account: Sequalize.STRING,
    is_deleted: Sequalize.BOOLEAN,
    deleted_date: Sequalize.DATE
});

module.exports = UserAccount;