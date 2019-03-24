const LoanPaymentDetails = require('../../../Database/Models/LoanPaymentDetails');
const Helpers = require('../../../Helpers/Helpers');
const validator = require('validator');
const RouteError = require('../../../Helpers/Classes/RouteError');

exports.updateLoanPaymentDetails = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.user.dataValues.user_id;
    };

    const fileName = Helpers.getOnlyFileName(__filename);
    const loanPaymentId = req.body.loanPayment;

    const loanPayment = await LoanPaymentDetails.findOne({
        where: {
            user_id: userId,
            loan_payment_details_id: loanPaymentId
        }
    });

    if (req.body.payment_date) {
        loanPayment.payment_date = req.body.payment_date;
    }

    if (req.body.payment_value) {
        if(!validator.isDecimal(req.body.payment_value)) {
            throw new RouteError(1, fileName, 30, 'Kwota powinna skladac sie wylacznie z liczb oraz znaku kropki');
        };
        loanPayment.payment_value = req.body.payment_value
    }

    await loanPayment.save();

    const message = 'Loan payment updated successfully';
    res.status(200);
    const response = {
        data: loanPayment,
        message: message 
    }
    res.json(response);
}