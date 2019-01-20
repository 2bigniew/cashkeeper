const BorrowPaymentDetails = require('../../../Database/Models/BorrowPaymentDetails');
const Sequalize = require('sequelize');

exports.getBorrowPaymentDetailsData = async(req, res, next) => {
    const userId = req.session.passport.user;

    const borrowPayments = await BorrowPaymentDetails.findAll({
        where: {
            user_id: userId
        }
    });

    res.send(borrowPayments);
}

exports.getBorrowPaymentDetailsByDate = async(req, res, next) => {
    const userId = req.session.passport.user;
    const Op = Sequalize.Op;

    const dateFrom = req.query['date-from'] ? req.query['date-from'] : req.user.created_at;
    const dateTo = req.query['date-to'] ? req.query['date-to'] : Helpers.getTimestamp();

    const borrowPayments = await BorrowPaymentDetails.findAll({
        where: {
          user_id: userId,
          borrow_id: req.query.borrow,
          payment_date: {
              [Op.gte]: dateFrom,
              [Op.lte]: dateTo
          }
        }
    });

    res.json(borrowPayments);
}

exports.getSumById = async(req, res, next) => {
    const userId = req.session.passport.user;
    
    const borrowPayments = await BorrowPaymentDetails.sum('payment_value', {
        where: {
            user_id: userId,
            borrow_id: req.query.borrow
        }
    });

    res.json(borrowPayments);
}

exports.getSumOfAll = async(req, res, next) => {
    const userId = req.session.passport.user;
    
    const borrowPayments = await BorrowPaymentDetails.sum('payment_value', {
        where: {
            user_id: userId,
        }
    });

    res.json(borrowPayments);
}