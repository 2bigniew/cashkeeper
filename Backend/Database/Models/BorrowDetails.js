const Sequalize = require('sequelize');
const con = require('../Connection/Connetion');
const UserAccount = require('./UserAccount');
const PartnerAccount = require('./PartnerAccount');

const BorrowDetails = con.define('BorrowDetails', {
    borrow_id: { type: Sequalize.INTEGER, primaryKey: true, autoIncrement: true  },
    borrow_serial: Sequalize.STRING,
    borrow_date: Sequalize.DATEONLY,
    purpose: Sequalize.TEXT,
    value: Sequalize.DOUBLE,
    is_completed: Sequalize.BOOLEAN,
    user_id: {
        type: Sequalize.INTEGER,
        references: {
            model: UserAccount,
            key: 'user_id',
            deferrable: Sequalize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    partner_id: {
        type: Sequalize.INTEGER,
        references: {
            model: PartnerAccount,
            key: 'partner_id',
            deferrable: Sequalize.Deferrable.INITIALLY_IMMEDIATE
        }
    }
}, {
    tableName: 'borrow_details',
    createdAt: 'created_at',
    updatedAt: false,
    underscored: true
});

module.exports = BorrowDetails;