const LoanPaymentDetails = require('../../../Database/Models/LoanPaymentDetails');

exports.deleteLoanPaymentDetails = async(req, res, next) => {
    const userId = req.session.passport.user;

    const loanPayment = await LoanPaymentDetails.findOne({
        where: {
            user_id: userId,
            loan_id: req.body.loan
        }
    });

    await loanPayment.destroy();

    res.json(loanPayment);
}