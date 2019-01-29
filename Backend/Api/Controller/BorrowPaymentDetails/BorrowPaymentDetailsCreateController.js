const BorrowPaymentDetail = require('../../../Database/Models/BorrowPaymentDetails');
const Helpers = require('../../../Helpers/Helpers');
const validator = require('validator');
const RouteError = require('../../../Helpers/Classes/RouteError');

exports.crateNewPaymentForm = (req, res, next) => {
    res.render('createBorrowPayment.ejs');
}

exports.createNewPayment = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.session.passport.user;
    }

    const errorMsg = [];
    const fileName = Helpers.getOnlyFileName(__filename);

    if(!validator.isDecimal(req.body.payment_value)) {
        errorMsg.push(Helpers.errorMsg.numberFieldMsg('Kwota'));
    };

    if(!req.body.payment_date) {
        errorMsg.push(Helpers.errorMsg.requireMsg('Data platnosci'));
    }

    if (errorMsg.length > 0) {
        throw new RouteError(errorMsg.length, fileName, 30, errorMsg.join('&&'));
    }

    const data = {
        user_id: userId,
        borrow_id: req.body.borrow,
        payment_date: req.body.payment_date,
        payment_value: req.body.payment_value,
        created_at: Helpers.getTimestamp()
    }

    const borrowPayment = await BorrowPaymentDetail.create(data);

    const message = 'Borrow payment successfully added';
    res.status(201);
    const response = {
        data: borrowPayment,
        message: message 
    }
    res.json(response);
}