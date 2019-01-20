const Sequalize = require('sequelize');
const con = require('../Connection/Connetion');
const UserAccount = require('./UserAccount');
const LoanDetails = require('./LoanDetails');

const LoanPaymentDetails = con.define('LoanPaymentDetails', {
    loan_payment_details_id: { type: Sequalize.INTEGER, primaryKey: true, autoIncrement: true },
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
    loan_id: {
        type: Sequalize.INTEGER,
        references: {
            model: LoanDetails,
            key: 'loan_id',
            deferrable: Sequalize.Deferrable.INITIALLY_IMMEDIATE
        }
    }
}, {
    tableName: 'loan_payment_details',
    createdAt: 'created_at',
    updatedAt: false,
    underscored: true
});

module.exports = LoanPaymentDetails;