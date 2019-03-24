const BorrowDetails = require('../../../Database/Models/BorrowDetails');
const Helpers = require('../../../Helpers/Helpers');
const validator = require('validator');
const RouteError = require('../../../Helpers/Classes/RouteError');
const Sequalize = require('sequelize');

exports.createBorrowForm = (req, res, next) => {
    res.render('createBorrow.ejs');
}

exports.createBorrow = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.user.dataValues.user_id;
    }
    
    const partnerId = req.body.partner;
    const errorMsg = [];
    const fileName = Helpers.getOnlyFileName(__filename);

    if(!partnerId) {
        throw new RouteError(1, fileName, 25, 'Nie okreslono partnera! Musisz wybrac partnera z listy');
    }

    if(!validator.isDecimal(req.body.value)) {
        errorMsg.push(Helpers.errorMsg.numberFieldMsg('Kwota'));
    }

    if(!req.body["borrow-date"]) {
        errorMsg.push(Helpers.errorMsg.requireMsg('Data pozyczki'));
    }

    if(!req.body.purpose) {
        errorMsg.push(Helpers.errorMsg.requireMsg('Cel pozyczki'));
    }

    if (errorMsg.length > 0) {
        throw new RouteError(errorMsg.length, fileName, 40, errorMsg.join('&&'));
    }

    const borrowsCount = await BorrowDetails.findAndCountAll({
        where: {
            user_id: userId,
            partner_id: partnerId
        }
    });

    const data = {
        borrow_serial: Helpers.getBorrowSerial(partnerId, borrowsCount.count),
        borrow_date: req.body["borrow-date"],
        purpose: req.body.purpose,
        value: req.body.value,
        is_completed: false,
        user_id: userId,
        partner_id: partnerId
    };

    const borrows = await BorrowDetails.create(data);
    const message = 'Borrow successfully added';
    res.status(201);
    const response = {
        data: borrows,
        message: message 
    }
    res.json(response);
}