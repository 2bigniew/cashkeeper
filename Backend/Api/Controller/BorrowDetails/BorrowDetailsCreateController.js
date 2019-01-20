const BorrowDetails = require('../../../Database/Models/BorrowDetails');
const Helpers = require('../../../Helpers/Helpers');
const validator = require('validator');
const Sequalize = require('sequelize');

exports.createBorrowForm = (req, res, next) => {
    res.render('createBorrow.ejs');
}

exports.createBorrow = async(req, res, next) => {
    const userId = req.session.passport.user;
    const partnerId = req.body.partner;
    const errorMsg = [];

    if(!partnerId) {
        res.send("Nie okreslono partnera! Musisz wybrac partnera z listy");
    }

    const borrowsCount = await BorrowDetails.findAndCountAll({
        where: {
            user_id: userId,
            partner_id: partnerId
        }
    });

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
        return res.json(errorMsg);
    }

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
    res.json(borrows);
}