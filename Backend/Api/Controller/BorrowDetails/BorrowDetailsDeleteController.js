const BorrowDetails = require('../../../Database/Models/BorrowDetails');
const ParterAccount = require('../../../Database/Models/PartnerAccount');
const Sequalize = require('sequelize');
const RouteError = require('../../../Helpers/Classes/RouteError');
const Helpers = require('../../../Helpers/Helpers');
const BorrowReadAndCountService = require('../../Service/Borrow/BorrowReadAndCountService'); // Zasada podstawienia Liskov
const BorrowDeleteService = require('../../Service/Borrow/BorrowDeleteService');

const borrowReadAndCount = new BorrowReadAndCountService(BorrowDetails, ParterAccount, Sequalize);
const borrowDelete = new BorrowDeleteService(BorrowDetails);

exports.deleteBorrow = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.user.dataValues.user_id;
    };

    const partnerId = req.body.partner;
    const borrowId = req.body.borrow;
    const errorMsg = [];
    const fileName = Helpers.getOnlyFileName(__filename);

    if(!partnerId) errorMsg.push('Nie okreslono partnera! Musisz wybrac partnera z listy');
    if(!borrowId) errorMsg.push('Nie okreslono pozyczki! Musisz wybrac pozyczke z listy');
    if(errorMsg.length > 0) throw new RouteError(errorMsg.length, fileName, 27, errorMsg.join('&&'), { status: 400 });

    const borrow = await borrowReadAndCount.getSingleBorrowByUserAndPartner(userId, partnerId, borrowId);
    const deletedBorrow = await borrowDelete.deleteBorrowHandler(borrow);

    res.status(200);
    const response = {
        message: 'Borrow deleted successfully',
        data: deletedBorrow
    }
    res.json(response);
}