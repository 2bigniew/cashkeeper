const PartnerAccount = require('../../../Database/Models/PartnerAccount');
const validator = require('validator');
const Sequalize = require('sequelize');

const Helpers = require('../../../Helpers/Helpers');
const ErrorMsg = Helpers.errorMsg;
const PartnerParams = require('../../../Helpers/Classes/PartnerParamsClass');

exports.createPartnerAccount = async(req, res, next) => {
    const partnerParams = new PartnerParams(req.session.passport.user, req.params.firstname, req.params.lastname, req.params.email);
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

    const partnerCount = await PartnerAccount.findAndCountAll({
        where: {
            user_id: partnerParams.userId,
            firstname: {
                [Op.like]: partnerParams.firstname
            },
            lastname: {
                [Op.like]: partnerParams.lastname
            },
            email: {
                [Op.like]: partnerParams.email
            },   
        }
    });

    if(partnerCount.count > 0) {
        return res.send('Istnieje juz osoba o takim imieniu, nazwisku i adresie email');
    }

    const partnerData = {
        firstname: partnerParams.firstname,
        lastname: partnerParams.lastname,
        street: req.params ? req.params : null,
        number: req.params ? req.params : null,
        local: req.params ? req.params : null,
        city: req.params ? req.params : null,
        country: req.params ? req.params : null,
        mobile: req.params ? req.params : null,
        email: partnerParams.email,
        bank_account: req.params ? req.params : null,
        is_active: 'false',
        is_deleted: 'false',
        deleted_date: null,
        created_at: Helpers.getTimestamp,
        user_id: partnerParams.userId,
    };

    const partner = await PartnerAccount.create({partnerData});
    res.send(patner);
}