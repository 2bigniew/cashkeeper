const BorrowDetails = require('../../../Database/Models/BorrowDetails');
const PartnerAccount = require('../../../Database/Models/PartnerAccount');
const RouteError = require('../../../Helpers/Classes/RouteError');
const Helpers = require('../../../Helpers/Helpers');
const ErrorMsg = Helpers.errorMsg;
const Sequalize = require('sequelize');
const BorrowReadService = require('../../Service/Borrow/BorrowReadService');
const validator = require('validator');

const borrowRead = new BorrowReadService(BorrowDetails, PartnerAccount, Sequalize);

exports.getBorrowsDetailsData = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.user.dataValues.user_id;
    }

    const borrows = await borrowRead.getAllBorrowsForUser(userId);
    console.log(req.query);

    res.status(200);
    const response = { data: borrows };
    res.json(response);
}

exports.getBorrowsForPartner = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.user.dataValues.user_id;
    }

    const fileName = Helpers.getOnlyFileName(__filename);
    const partnerId = req.params.partner_id;

    if (!partnerId || partnerId == 0) {
        throw new RouteError(1, fileName, 41, 'Missed partner in request', { status: 400 });
    }

    if(isNaN(partnerId)) {
        throw new RouteError(1, fileName, 37, 'Partner id should be number', { status: 422 });
    }

    const borrows = await borrowRead.getAllBorrowsForPartner(userId, partnerId);

    res.status(200);
    const response = {
        data: borrows
    }
    res.json(response);
}

exports.getBorrowsByCriteria = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.user.dataValues.user_id;
    }

    const errorMsg = [];
    const fileName = Helpers.getOnlyFileName(__filename);
    const firstname = req.query.firstname, lastname = req.query.lastname, purpose = req.query.purpose;
    if (firstname) {
        if (!validator.isAlpha(firstname)) errorMsg.push(ErrorMsg.firstnameFieldMsg);
    }
    if (lastname) {
        if (!validator.isAlpha(lastname)) errorMsg.push(ErrorMsg.lastnameFieldMsg);
    }
    if (errorMsg.length > 0) throw new RouteError(errorMsg.length, fileName, 71, errorMsg.join('. '), { status: 422 });

    const borrows = await borrowRead.getBorrowsByCriteriaHandler(userId, firstname, lastname, purpose);

    res.status(200);
    const response = {
        data: borrows
    }
    res.json(response);
}

exports.getBorrowsForPartnerByDate = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.user.dataValues.user_id;
    }

    const errorMsg = [];
    const fileName = Helpers.getOnlyFileName(__filename);
    const firstname = req.query.firstname, 
        lastname = req.query.lastname, 
        dateFrom = req.query['date-from'] ? req.query['date-from'] : req.user.created_at,
        dateTo = req.query['date-to']? req.query['date-to'] : Helpers.getTimestamp();
    
    if (firstname) {
        if (!validator.isAlpha(firstname)) errorMsg.push(ErrorMsg.firstnameFieldMsg);
    }
    if (lastname) {
        if (!validator.isAlpha(lastname)) errorMsg.push(ErrorMsg.lastnameFieldMsg);
    }
    if (errorMsg.length > 0) throw new RouteError(errorMsg.length, fileName, 71, errorMsg.join('. '), { status: 422 });
    
    const borrows = await borrowRead.getBorrowsForPartnerByDateHndler( userId, firstname, lastname, dateFrom, dateTo );
    res.status(200);
    const response = {
        data: borrows
    }
    res.json(response);
}

exports.getSumOfAll = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.user.dataValues.user_id;
    }

    const borrowsSum = await borrowRead.getBorrowsSumForUser(userId);

    res.status(200);
    const response = {
        data: borrowsSum
    }
    res.json(response);
}