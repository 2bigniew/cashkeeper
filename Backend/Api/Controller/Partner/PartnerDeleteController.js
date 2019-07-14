const PartnerAccount = require('../../../Database/Models/PartnerAccount');
const Sequalize = require('sequelize');
const PartnerReadService = require('../../Service/Partner/PartnerReadService');
const PartnerDeleteService = require('../../Service/Partner/PartnerDeleteService');
const RouteError = require('../../../Helpers/Classes/RouteError');
const Helpers = require('../../../Helpers/Helpers');

const partnerRead = new PartnerReadService(PartnerAccount, Sequalize);
const partnerDelete = new PartnerDeleteService(PartnerAccount, Sequalize);

exports.deletePartner = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.user.dataValues.user_id;
    };
    const fileName = Helpers.getOnlyFileName(__filename);
    const partnerId = req.body.partnerid;
    const partner = await partnerRead.getPartnerForUserById(userId, partnerId);
    if (!partner) {
        throw new RouteError(1, fileName, 20, 'Brak partnera w bazie danych');
    }

    const destroyedPartner = await partnerDelete.handlePartnerDelete(partner);

    res.status(200);
    const response = {
        message: 'Partner deleted successfully',
        data: destroyedPartner
    }
    res.json(response);
}

// destroy seq:
/*
function destroyParnerData(partner_id){
    1. usunięcie paymentów
    2. usunięcie loan i borrow
    3. usunięcie partnera
}
*/