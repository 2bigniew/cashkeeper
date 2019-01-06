const PartnerAccount = require('../../../Database/Models/PartnerAccount');
const validator = require('validator');
const Sequalize = require('sequelize');

const Helpers = require('../../../Helpers/Helpers');
const ErrorMsg = Helpers.errorMsg;
const PartnerParams = require('../../../Helpers/Classes/PartnerParamsClass');

exports.deletePartnerForm = (req, res, next) => {
    res.render('deletePartner.ejs');
}

exports.deletePartner = async(req, res, next) => {
    const userId = req.session.passport.user;
    const partnerId = req.body.partnerid;

    const partner = await PartnerAccount.findOne({
        where: {
            user_id: userId,
            partner_id: partnerId
        }
    });

    partner.destroy();

    res.send(partner);
}