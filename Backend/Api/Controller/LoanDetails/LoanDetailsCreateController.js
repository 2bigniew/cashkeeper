const LoanDetails = require('../../../Database/Models/LoanDetails');
const Helpers = require('../../../Helpers/Helpers');
const validator = require('validator');
const Sequalize = require('sequelize');

exports.createLoanForm = (req, res, next) => {
    res.render('createLoan.ejs');
}

exports.createLoan = async(req, res, next) => {
    const userId = req.session.passport.user;
    const partnerId = req.body.partner;
    const errorMsg = [];

    if(!partnerId) {
        res.send("Nie okreslono partnera! Musisz wybrac partnera z listy");
    }

    const loansCount = await LoanDetails.findAndCountAll({
        where: {
            user_id: userId,
            partner_id: partnerId
        }
    });

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
        return res.json(errorMsg);
    }

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
    res.json(loans);
}