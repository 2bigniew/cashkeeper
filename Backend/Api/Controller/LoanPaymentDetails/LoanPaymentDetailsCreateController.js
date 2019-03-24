const LoanPaymentDetails = require('../../../Database/Models/LoanPaymentDetails');
const Helpers = require('../../../Helpers/Helpers');
const validator = require('validator');
const RouteError = require('../../../Helpers/Classes/RouteError');

exports.crateNewPaymentForm = (req, res, next) => {
    res.render('createLoanPayment.ejs');
}

exports.createNewPayment = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.user.dataValues.user_id;
    };

    const errorMsg = [];
    const fileName = Helpers.getOnlyFileName(__filename);

    if(!validator.isDecimal(req.body.payment_value)) {
        errorMsg.push(Helpers.errorMsg.numberFieldMsg('Kwota'));
    };

    if(!req.body.payment_date) {
        errorMsg.push(Helpers.errorMsg.requireMsg('Data platnosci'));
    }

    if (errorMsg.length > 0) {
        throw new RouteError(errorMsg.length, fileName, 30, errorMsg.join('&&'));
    }

    const data = {
        user_id: userId,
        loan_id: req.body.loan,
        payment_date: req.body.payment_date,
        payment_value: req.body.payment_value,
        created_at: Helpers.getTimestamp()
    }

    const loanPayment = await LoanPaymentDetails.create(data);
    // console.log(loanPayment);

    const message = 'Loan payment successfully added';
    res.status(201);
    const response = {
        data: loanPayment,
        message: message 
    }
    res.json(response);
}