const BorrowPaymentDetails = require('../../../Database/Models/BorrowPaymentDetails');

exports.updateBorrowPaymentDetails = async(req, res, next) => {
    const userId = req.session.passport.user;

    const borrowPayment = await BorrowPaymentDetails.findOne({
        where: {
            user_id: userId,
            borrow_id: req.body.borrow
        }
    });

    if (req.body.payment_date) {
        borrowPayment.payment_date = req.body.payment_date;
    }

    if (req.body.payment_value) {
        borrowPayment.payment_value = req.body.payment_value
    }

    await borrowPayment.save();

    res.json(borrowPayments);
}