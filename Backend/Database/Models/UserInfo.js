const Sequalize = require('sequelize');
const con = require('../Connection/Connetion');
const UserAccount = require('./UserAccount');

const UserInfo = con.define('UserInfo', {
    u_info_id: { type: Sequalize.INTEGER, primaryKey: true },
    street: Sequalize.STRING,
    number: Sequalize.STRING(10),
    local: Sequalize.STRING(10),
    city: Sequalize.STRING(255),
    country: { type: Sequalize.STRING, is: ["^[a-z]+$",'i'] },
    mobile: Sequalize.STRING(15),
    email: { type: Sequalize.STRING, isEmail: true },
    user_id: {
        type: Sequalize.INTEGER,
        references: {
            model: UserAccount,
            key: 'user_id',
            deferrable: Sequalize.Deferrable.INITIALLY_IMMEDIATE
        }
    }
}, {
    tableName: 'user_info',
    createdAt: false,
    updatedAt: false,
    underscored: true
});

module.exports = UserInfo;