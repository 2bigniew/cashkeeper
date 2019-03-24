const LoanPaymentDetails = require('../../../Database/Models/LoanPaymentDetails');
const RouteError = require('../../../Helpers/Classes/RouteError');
const Helpers = require('../../../Helpers/Helpers');

exports.deleteLoanPaymentDetails = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.user.dataValues.user_id;
    };

    const loanPaymentId = req.body.loanPayment;
    const fileName = Helpers.getOnlyFileName(__filename);

    if(!loanPaymentId) {
        throw new RouteError(1, fileName, 17, 'Nie okreslono platnosci! Musisz wybrac platnosc z listy');
    }

    const loanPayment = await LoanPaymentDetails.findOne({
        where: {
            user_id: userId,
            loan_payment_details_id: loanPaymentId
        }
    });

    await loanPayment.destroy();

    res.status(200);
    const response = {
        message: 'Loan payment deleted successfully',
        data: loanPayment
    }
    res.json(response);
}