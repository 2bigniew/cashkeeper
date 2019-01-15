const LoanDetails = require('../../../Database/Models/LoanDetails');

exports.deleteLoan = async(req, res, next) => {
    const userId = req.session.passport.user;
    const partnerId = req.body.partner;
    const loanId = req.body.loan;

    const loan = await LoanDetails.findOne({
        where: {
            user_id: userId,
            partner_id: partnerId,
            loan_id: loanId
        }
    });

    await loan.destroy();

    res.json(loan);
}