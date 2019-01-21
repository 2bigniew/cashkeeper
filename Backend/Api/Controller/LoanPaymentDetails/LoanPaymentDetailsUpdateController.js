const LoanPaymentDetails = require('../../../Database/Models/LoanPaymentDetails');

exports.updateLoanPaymentDetails = async(req, res, next) => {
    const userId = req.session.passport.user;

    const loanPayment = await LoanPaymentDetails.findOne({
        where: {
            user_id: userId,
            loan_id: req.body.loan
        }
    });

    if (req.body.payment_date) {
        loanPayment.payment_date = req.body.payment_date;
    }

    if (req.body.payment_value) {
        loanPayment.payment_value = req.body.payment_value
    }

    await loanPayment.save();

    res.json(loanPayment);
}