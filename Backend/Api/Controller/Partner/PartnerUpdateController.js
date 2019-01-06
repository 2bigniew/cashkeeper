const PartnerAccount = require('../../../Database/Models/PartnerAccount');
const validator = require('validator');
const Sequalize = require('sequelize');

const Helpers = require('../../../Helpers/Helpers');
const ErrorMsg = Helpers.errorMsg;
const PartnerParams = require('../../../Helpers/Classes/PartnerParamsClass');

exports.updatePartnerAccountForm = (req, res, next) => {
    res.render('updatePartner.ejs');
}

exports.getPartnerAccountForm = (req, res, next) => {
    res.render('getPartner.ejs');
}

exports.getPartnerInfo = async(req, res, next) => {
    const partnerParams = new PartnerParams(req.session.passport.user, req.body.firstname, req.body.lastname, req.body.email);
    const Op = Sequalize.Op;
    const errorMsg = [];

    if (!validator.isAlpha(partnerParams.firstname)) {
        errorMsg.push(ErrorMsg.firstnameFieldMsg);
    }

    if (!validator.isAlpha(partnerParams.lastname)) {
        errorMsg.push(ErrorMsg.lastnameFieldMsg);
    }

    if(!validator.isEmail(partnerParams.email)) {
        errorMsg.push(ErrorMsg.emailFieldMsg);
    }

    if (errorMsg.length > 0) {
        return res.send(errorMsg);
    }

    const partner = await PartnerAccount.findAll({
        where: {
            user_id: partnerParams.userId,
            firstname: {
                [Op.iLike]: partnerParams.firstname
            },
            lastname: {
                [Op.iLike]: partnerParams.lastname
            },
            email: {
                [Op.iLike]: partnerParams.email
            },   
        }
    });
    res.send(partner);
}

exports.updatePatnerInfo = async(req, res, next) => {
    const userId = req.session.passport.user;
    const partnerId = req.body.partnerid;
    const reqBody = req.body;
    const updatedData = {};

    const partner = await PartnerAccount.findOne({
        where: {
            user_id: userId,
            partner_id: partnerId
        }
    });
    
    for (let key in reqBody) {
        if (reqBody[key] !== '') {
            updatedData[key] = reqBody[key];
        }
    }

    for (let column in updatedData) {
        partner[column] = updatedData[column];
    }

    await partner.save();

    res.send(partner);
}