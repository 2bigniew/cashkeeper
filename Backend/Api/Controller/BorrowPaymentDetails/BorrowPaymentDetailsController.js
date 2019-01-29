const BorrowPaymentDetails = require('../../../Database/Models/BorrowPaymentDetails');
const Sequalize = require('sequelize');

exports.getBorrowPaymentDetailsData = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.session.passport.user;
    }

    const borrowPayments = await BorrowPaymentDetails.findAll({
        where: {
            user_id: userId
        }
    });

    res.status(200);
    const response = {
        data: borrowPayments
    }
    res.json(response);
}

exports.getBorrowPaymentDetailsByDate = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.session.passport.user;
    }

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

    res.status(200);
    const response = {
        data: borrowPayments
    }
    res.json(response);
}

exports.getSumById = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.session.passport.user;
    }
    
    const borrowPayments = await BorrowPaymentDetails.sum('payment_value', {
        where: {
            user_id: userId,
            borrow_id: req.query.borrow
        }
    });

    res.status(200);
    const response = {
        data: borrowPayments
    }
    res.json(response);
}

exports.getSumOfAll = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.session.passport.user;
    }
    
    const borrowPayments = await BorrowPaymentDetails.sum('payment_value', {
        where: {
            user_id: userId,
        }
    });


    res.status(200);
    const response = {
        data: borrowPayments ? borrowPayments : 0
    }
    res.json(response);
}