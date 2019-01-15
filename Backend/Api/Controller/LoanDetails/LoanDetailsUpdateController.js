const LoanDetails = require('../../../Database/Models/LoanDetails');

exports.updateLoan = async(req, res, next) => {
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

    loan.is_completed = true;
    await loan.save();

    res.json(loan);
}