const LoanDetails = require('../../../Database/Models/LoanDetails');
const RouteError = require('../../../Helpers/Classes/RouteError');
const Helpers = require('../../../Helpers/Helpers');

exports.updateLoan = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.user.dataValues.user_id;
    };

    const partnerId = req.body.partner;
    const loanId = req.body.loan;
    const errorMsg = [];
    const fileName = Helpers.getOnlyFileName(__filename);

    if(!partnerId) {
        errorMsg.push('Nie okreslono partnera! Musisz wybrac partnera z listy');
    }

    if(!loanId) {
        errorMsg.push('Nie okreslono pozyczki! Musisz wybrac pozyczke z listy');
    }

    if(errorMsg.length > 0){
        throw new RouteError(errorMsg.length, fileName, 27, errorMsg.join('&&'));
    }


    const loan = await LoanDetails.findOne({
        where: {
            user_id: userId,
            partner_id: partnerId,
            loan_id: loanId
        }
    });

    loan.is_completed = true;
    await loan.save();

    res.status(200);
    const response = {
        message: 'Loan updated successfully',
        data: loan
    }
    res.json(response);
}