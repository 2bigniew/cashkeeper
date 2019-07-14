const PartnerAccount = require('../../../Database/Models/PartnerAccount');
const validator = require('validator');
const Sequalize = require('sequelize');
const Helpers = require('../../../Helpers/Helpers');
const ErrorMsg = Helpers.errorMsg;
<<<<<<< HEAD
const PartnerReadService = require('../../Service/Partner/PartnerReadService');
const PartnerUpdateService = require('../../Service/Partner/PartnerUpdateService');

const partnerRead = new PartnerReadService(PartnerAccount, Sequalize);
const partnerUpdate = new PartnerUpdateService(PartnerAccount, Sequalize);
=======
const PartnerParams = require('../../../Helpers/Classes/PartnerParamsClass');

//
const PartnerReadService = require('../../Service/Partner/PartnerReadService');
>>>>>>> e7222b59ca60091f42a7c038bee7c0e78cce189b

exports.updatePatnerInfo = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.user.dataValues.user_id;
    };

    const errorMsg = [];
    const fileName = Helpers.getOnlyFileName(__filename);

    if (req.body.firstname) {
        if (!validator.isAlpha(req.body.firstname)) errorMsg.push(ErrorMsg.firstnameFieldMsg);
    }
    
    if (req.body.lastname) {
        if (!validator.isAlpha(req.body.lastname)) errorMsg.push(ErrorMsg.lastnameFieldMsg);
    }

    if (req.body.email) {
        if(!validator.isEmail(req.body.email)) errorMsg.push(ErrorMsg.emailFieldMsg);
    }

    if (errorMsg.length > 0) {
        throw new RouteError(errorMsg.length, fileName, 38, errorMsg.join('&&'));
    }

    const partnerId = req.body.partnerid;
    const reqBody = req.body;
    const updatedData = {};
    const partner = await partnerRead.getPartnerForUserById(userId, partnerId);

    if (!partner) {
        throw new RouteError(1, fileName, 45, 'Brak partnera w bazie danych');
    }
    
    for (let key in reqBody) {
        if (reqBody[key] !== '' && key !== 'partnerid') {
            updatedData[key] = reqBody[key];
        }
    }

    for (let column in updatedData) {
        partner[column] = updatedData[column];
    }

    const updatedPartner = await partnerUpdate.handlePartnerUpdate(partner);

    res.status(200);
    const response = {
        message: 'Partner updated successfully',
        data: updatedPartner
    }
    res.json(response);
}

// exports.getPartnerInfo = async(req, res, next) => {
//     const partnerParams = new PartnerParams(req.user.dataValues.user_id, req.body.firstname, req.body.lastname, req.body.email);
//     const Op = Sequalize.Op;
//     const errorMsg = [];

//     if (!validator.isAlpha(partnerParams.firstname)) {
//         errorMsg.push(ErrorMsg.firstnameFieldMsg);
//     }

//     if (!validator.isAlpha(partnerParams.lastname)) {
//         errorMsg.push(ErrorMsg.lastnameFieldMsg);
//     }

//     if(!validator.isEmail(partnerParams.email)) {
//         errorMsg.push(ErrorMsg.emailFieldMsg);
//     }

//     if (errorMsg.length > 0) {
//         return res.send(errorMsg);
//     }

//     const partner = await PartnerAccount.findAll({
//         where: {
//             user_id: partnerParams.userId,
//             firstname: {
//                 [Op.iLike]: partnerParams.firstname
//             },
//             lastname: {
//                 [Op.iLike]: partnerParams.lastname
//             },
//             email: {
//                 [Op.iLike]: partnerParams.email
//             },   
//         }
//     });
//     res.send(partner);
// }

