const LoanPaymentDetails = require('../../../Database/Models/LoanPaymentDetails');


exports.getLoanPaymentDetailsData = async(req, res, next) => {
    const userId = req.session.passport.user;

    const loanPayments = await LoanPaymentDetails.findAll({
        where: {
            user_id: userId
        }
    });

    res.send(loanPayments);
}