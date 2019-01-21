const LoanPaymentDetails = require('../../../Database/Models/LoanPaymentDetails');
const Helpers = require('../../../Helpers/Helpers');
const validator = require('validator');

exports.crateNewPaymentForm = (req, res, next) => {
    res.render('createLoanPayment.ejs');
}

exports.createNewPayment = async(req, res, next) => {
    const userId = req.session.passport.user;
    const errorMsg = [];

    if(!validator.isDecimal(req.body.payment_value)) {
        errorMsg.push(Helpers.errorMsg.numberFieldMsg('Kwota'));
    };

    if(!req.body.payment_date) {
        errorMsg.push(Helpers.errorMsg.requireMsg('Data platnosci'));
    }

    if (errorMsg.length > 0) {
        return res.json(errorMsg);
    }

    const data = {
        user_id: userId,
        loan_id: req.body.loan,
        payment_date: req.body.payment_date,
        payment_value: req.body.payment_value,
        created_at: Helpers.getTimestamp()
    }

    const loanPayment = await LoanPaymentDetails.create(data);
    res.json(loanPayment);
}