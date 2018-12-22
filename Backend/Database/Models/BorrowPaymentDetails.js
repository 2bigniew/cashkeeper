const Sequalize = require('sequelize');
const con = require('../Connection/Connetion');
const UserAccount = require('./UserAccount');
const BorrowDetails = require('./BorrowDetails');

const BorrowPaymentDetails = con.define('BorrowPaymentDetails', {
    borrow_payment_details_id: { type: Sequalize.INTEGER, primaryKey: true },
    payment_date: Sequalize.DATEONLY,
    payment_value: Sequalize.DOUBLE,
    user_id: {
        type: Sequalize.INTEGER,
        references: {
            model: UserAccount,
            key: 'user_id',
            deferrable: Sequalize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    borrow_id: {
        type: Sequalize.INTEGER,
        references: {
            model: BorrowDetails,
            key: 'borrow_id',
            deferrable: Sequalize.Deferrable.INITIALLY_IMMEDIATE
        }
    }
}, {
    tableName: 'borrow_payment_details',
    createdAt: 'created_at',
    updatedAt: false,
    underscored: true
});

module.exports = BorrowPaymentDetails;