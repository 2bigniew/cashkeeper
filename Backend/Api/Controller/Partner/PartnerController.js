const Helpers = require('../../../Helpers/Helpers');
const RouteError = require('../../../Helpers/Classes/RouteError');
const PartnerAccount = require('../../../Database/Models/PartnerAccount');
const Sequalize = require('sequelize');
const PartnerReadService = require('../../Service/Partner/PartnerReadService');

const partnerRead = new PartnerReadService(PartnerAccount, Sequalize);

exports.getPartnersBasicData = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.user.dataValues.user_id;
    }
    
    const partners = await partnerRead.getAllPartnersData(userId);
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
    const partners = await partnerRead.getPartnersByLastname(userId, lastname);
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
    const partner = await partnerRead.getPartnerById(partnerId);
    res.status(200);
    res.json(partner);
}