const BorrowPaymentDetails = require('../../../Database/Models/BorrowPaymentDetails');


exports.getBorrowPaymentDetailsData = async(req, res, next) => {
    const userId = req.session.passport.user;

    const borrowPayments = await BorrowPaymentDetails.findAll({
        where: {
            user_id: userId
        }
    });

    res.send(borrowPayments);
}