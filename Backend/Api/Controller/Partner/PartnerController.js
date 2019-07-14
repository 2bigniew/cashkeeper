const Helpers = require('../../../Helpers/Helpers');
const RouteError = require('../../../Helpers/Classes/RouteError');
<<<<<<< HEAD
const PartnerAccount = require('../../../Database/Models/PartnerAccount');
const Sequalize = require('sequelize');
const PartnerReadService = require('../../Service/Partner/PartnerReadService');

const partnerRead = new PartnerReadService(PartnerAccount, Sequalize);
=======

const PartnerReadService = require('../../Service/Partner/PartnerReadService');
>>>>>>> e7222b59ca60091f42a7c038bee7c0e78cce189b

exports.getPartnersBasicData = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.user.dataValues.user_id;
    }
    
<<<<<<< HEAD
    const partners = await partnerRead.getAllPartnersData(userId);
=======
    const partners = await PartnerReadService.partnerRead.getAllPartnersData(userId);
>>>>>>> e7222b59ca60091f42a7c038bee7c0e78cce189b
    res.status(200);
    res.json(partners);
}

exports.getPartnerDataByLastname = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.user.dataValues.user_id;
    }

    const lastname = req.params.lastname;
<<<<<<< HEAD
    const partners = await partnerRead.getPartnersByLastname(userId, lastname);
=======
    const partners = await PartnerReadService.partnerRead.getPartnersByLastname(userId, lastname);
>>>>>>> e7222b59ca60091f42a7c038bee7c0e78cce189b
    res.status(200);
    const response = {
        data: partners
    }
    res.json(response);
}

exports.getSinglePartnerDataById = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.user.dataValues.user_id;
    }

    const fileName = Helpers.getOnlyFileName(__filename);
    if (!req.query.partner_id) {
        throw new RouteError(1, fileName, 63, 'Missed partner in request');
    }
    const partnerId = req.query.partner_id;
<<<<<<< HEAD
    const partner = await partnerRead.getPartnerById(partnerId);
=======
    const partner = await PartnerReadService.partnerRead.getPartnerById(partnerId);
>>>>>>> e7222b59ca60091f42a7c038bee7c0e78cce189b
    res.status(200);
    res.json(partner);
}