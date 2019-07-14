const BorrowDetails = require('../../../Database/Models/BorrowDetails');
const PartnerAccount = require('../../../Database/Models/PartnerAccount');
const Helpers = require('../../../Helpers/Helpers');
const validator = require('validator');
const RouteError = require('../../../Helpers/Classes/RouteError');
const Sequalize = require('sequelize');
const BorrowReadAndCountService = require('../../Service/Borrow/BorrowReadAndCountService');
const BorrowCreateService = require('../../Service/Borrow/BorrowCreateService');

const borrowReadAndCountService = new BorrowReadAndCountService(BorrowDetails, PartnerAccount, Sequalize);
const borrowCreate = new BorrowCreateService(BorrowDetails, Sequalize);

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
    if (!partnerId || partnerId == 0) throw new RouteError(1, fileName, 23, 'Missed partner in request', { status: 400 });
    if (!req.body.value || !validator.isDecimal(req.body.value)) errorMsg.push(Helpers.errorMsg.numberFieldMsg('Kwota'));
    if (!req.body["borrow-date"]) errorMsg.push(Helpers.errorMsg.requireMsg('Data pozyczki'));
    if (!req.body.purpose) errorMsg.push(Helpers.errorMsg.requireMsg('Cel pozyczki'));
    if (errorMsg.length > 0) throw new RouteError(errorMsg.length, fileName, 39, errorMsg.join('&&'), { status: 422 });

    const borrowsCount = await borrowReadAndCountService.getBorrowsCount(userId, partnerId);
    const data = {
        borrow_serial: Helpers.getBorrowSerial(partnerId, borrowsCount),
        borrow_date: req.body["borrow-date"],
        purpose: req.body.purpose,
        value: req.body.value,
        is_completed: false,
        user_id: userId,
        partner_id: partnerId
    };

    const borrow = await borrowCreate.createBorrowHandler(data);
    const message = 'Borrow successfully added';
    res.status(201);
    const response = {
        data: borrow,
        message: message 
    }
    res.json(response);
}