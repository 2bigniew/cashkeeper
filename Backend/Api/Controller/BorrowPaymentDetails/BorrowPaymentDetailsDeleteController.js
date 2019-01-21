const BorrowPaymentDetails = require('../../../Database/Models/BorrowPaymentDetails');

exports.deleteBorrowPaymentDetails = async(req, res, next) => {
    const userId = req.session.passport.user;

    const borrowPayment = await BorrowPaymentDetails.findOne({
        where: {
            user_id: userId,
            borrow_id: req.body.borrow
        }
    });

    await borrowPayment.destroy();

    res.json(borrowPayment);
}