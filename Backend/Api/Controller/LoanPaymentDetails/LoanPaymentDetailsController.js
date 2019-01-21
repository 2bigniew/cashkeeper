const LoanPaymentDetails = require('../../../Database/Models/LoanPaymentDetails');


exports.getLoanPaymentDetailsData = async(req, res, next) => {
    const userId = req.session.passport.user;

    const loanPayments = await LoanPaymentDetails.findAll({
        where: {
            user_id: userId
        }
    });

    res.send(loanPayments);
}

exports.getLoanPaymentDetailsByDate = async(req, res, next) => {
    const userId = req.session.passport.user;
    const Op = Sequalize.Op;

    const dateFrom = req.query['date-from'] ? req.query['date-from'] : req.user.created_at;
    const dateTo = req.query['date-to'] ? req.query['date-to'] : Helpers.getTimestamp();

    const loanPayments = await LoanPaymentDetails.findAll({
        where: {
          user_id: userId,
          loan_id: req.query.loan,
          payment_date: {
              [Op.gte]: dateFrom,
              [Op.lte]: dateTo
          }
        }
    });

    res.json(loanPayments);
}

exports.getSumById = async(req, res, next) => {
    const userId = req.session.passport.user;
    
    const loanPayments = await LoanPaymentDetails.sum('payment_value', {
        where: {
            user_id: userId,
            loan_id: req.query.loan
        }
    });

    res.json(loanPayments);
}

exports.getSumOfAll = async(req, res, next) => {
    const userId = req.session.passport.user;
    
    const loanPayments = await LoanPaymentDetails.sum('payment_value', {
        where: {
            user_id: userId,
        }
    });

    res.json(loanPayments);
}