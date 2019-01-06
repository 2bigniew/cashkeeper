const PartnerAccount = require('../../../Database/Models/PartnerAccount');
const validator = require('validator');
const Sequalize = require('sequelize');

const Helpers = require('../../../Helpers/Helpers');
const ErrorMsg = Helpers.errorMsg;
const PartnerParams = require('../../../Helpers/Classes/PartnerParamsClass');

exports.createPartnerAccountForm = (req, res, next) => {
    res.render('createPartner.ejs');
}

exports.createPartnerAccount = async(req, res, next) => {
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
    console.log(errorMsg);
    const partnerCount = await PartnerAccount.findAndCountAll({
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

    if(partnerCount.count > 0) {
        return res.send('Istnieje juz osoba o takim imieniu, nazwisku i adresie email');
    }

    const partnerData = {
        firstname: partnerParams.firstname,
        lastname: partnerParams.lastname,
        street: req.body.street ? req.body.street : null,
        number: req.body.number ? req.body.number : null,
        local: req.body.local ? req.body.local : null,
        city: req.body.city ? req.body.city : null,
        country: req.body.country ? req.body.country : null,
        mobile: req.body.mobile ? req.body.mobile : null,
        email: partnerParams.email,
        bank_account: req.body.bank,
        is_active: 'false',
        is_deleted: 'false',
        deleted_date: null,
        created_at: Helpers.getTimestamp(),
        user_id: partnerParams.userId,
    };

    const partner = await PartnerAccount.create(partnerData);
    res.send(partner);
}