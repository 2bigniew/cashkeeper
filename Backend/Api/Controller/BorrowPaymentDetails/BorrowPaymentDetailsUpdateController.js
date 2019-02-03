const BorrowPaymentDetails = require('../../../Database/Models/BorrowPaymentDetails');
const Helpers = require('../../../Helpers/Helpers');
const validator = require('validator');
const RouteError = require('../../../Helpers/Classes/RouteError');

exports.updateBorrowPaymentDetails = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.session.passport.user;
    };

    const fileName = Helpers.getOnlyFileName(__filename);
    const borrowPaymentId = req.body.borrowPayment;

    const borrowPayment = await BorrowPaymentDetails.findOne({
        where: {
            user_id: userId,
            borrow_payment_details_id: borrowPaymentId
        }
    });

    if (req.body.payment_date) {
        borrowPayment.payment_date = req.body.payment_date;
    }

    if (req.body.payment_value) {
        if(!validator.isDecimal(req.body.payment_value)) {
            throw new RouteError(1, fileName, 30, 'Kwota powinna skladac sie wylacznie z liczb oraz znaku kropki');
        };
        borrowPayment.payment_value = req.body.payment_value
    }

    await borrowPayment.save();

    const message = 'Borrow payment updated successfully';
    res.status(200);
    const response = {
        data: borrowPayment,
        message: message 
    }
    res.json(response);
}