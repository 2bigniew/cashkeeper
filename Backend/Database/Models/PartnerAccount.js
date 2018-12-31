const Sequalize = require('sequelize');
const con = require('../Connection/Connetion');
const UserAccount = require('./UserAccount');

const PartnerAccount = con.define('PartnerAccount', {
    partner_id: { type: Sequalize.INTEGER, primaryKey: true, autoIncrement: true },
    firstname: { type: Sequalize.STRING, is: ["^[a-z]+$",'i'] },
    lastname: { type: Sequalize.STRING, is: ["^[a-z]+$",'i'] },
    street: Sequalize.STRING,
    number: Sequalize.STRING(10),
    local: Sequalize.STRING(10),
    city: Sequalize.STRING(255),
    country: { type: Sequalize.STRING, is: ["^[a-z]+$",'i'] },
    mobile: Sequalize.STRING(15),
    email: { type: Sequalize.STRING, isEmail: true },
    bank_account: Sequalize.STRING,
    is_active: Sequalize.BOOLEAN,
    is_deleted: Sequalize.BOOLEAN,
    deleted_date: Sequalize.DATE,
    user_id: {
        type: Sequalize.INTEGER,
        references: {
            model: UserAccount,
            key: 'user_id',
            deferrable: Sequalize.Deferrable.INITIALLY_IMMEDIATE
        }
    }
},
{
    tableName: 'partner_account',
    createdAt: 'created_at',
    updatedAt: false,
    underscored: true
});

module.exports = PartnerAccount;