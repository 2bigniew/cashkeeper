const LoanDetails = require('../../../Database/Models/LoanDetails');
const Helpers = require('../../../Helpers/Helpers');
const validator = require('validator');
const RouteError = require('../../../Helpers/Classes/RouteError');
const Sequalize = require('sequelize');

exports.createLoanForm = (req, res, next) => {
    res.render('createLoan.ejs');
}

exports.createLoan = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.user.dataValues.user_id;
    };

    const partnerId = req.body.partner;
    const errorMsg = [];
    const fileName = Helpers.getOnlyFileName(__filename);

    if(!partnerId) {
        throw new RouteError(1, fileName, 24, 'Nie okreslono partnera! Musisz wybrac partnera z listy');
    }

    if(!validator.isDecimal(req.body.value)) {
        errorMsg.push(Helpers.errorMsg.numberFieldMsg('Kwota'));
    }

    if(!req.body["loan-date"]) {
        errorMsg.push(Helpers.errorMsg.requireMsg('Data udzielenia pozyczki'));
    }

    if(!req.body.purpose) {
        errorMsg.push(Helpers.errorMsg.requireMsg('Cel udzielenia pozyczki'));
    }

    if (errorMsg.length > 0) {
        throw new RouteError(errorMsg.length, fileName, 40, errorMsg.join('&&'));
    }

    const loansCount = await LoanDetails.findAndCountAll({
        where: {
            user_id: userId,
            partner_id: partnerId
        }
    });

    const data = {
        loan_serial: Helpers.getLoanSerial(partnerId, loansCount.count),
        loan_date: req.body["loan-date"],
        purpose: req.body.purpose,
        value: req.body.value,
        is_completed: false,
        user_id: userId,
        partner_id: partnerId
    };

    const loans = await LoanDetails.create(data);
    const message = 'Loan successfully added';
    res.status(201);
    const response = {
        data: loans,
        message: message 
    }
    res.json(response);
}