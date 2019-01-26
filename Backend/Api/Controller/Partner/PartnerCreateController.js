const PartnerAccount = require('../../../Database/Models/PartnerAccount');
const validator = require('validator');
const Sequalize = require('sequelize');

const Helpers = require('../../../Helpers/Helpers');
const RouteError = require('../../../Helpers/Classes/RouteError');
const ErrorMsg = Helpers.errorMsg;
const PartnerParams = require('../../../Helpers/Classes/PartnerParamsClass');

exports.createPartnerAccountForm = (req, res, next) => {
    res.render('createPartner.ejs');
}

exports.createPartnerAccount = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.session.passport.user;
    }

    // const partnerParams = new PartnerParams(userId, req.body.firstname, req.body.lastname, req.body.email);
    const Op = Sequalize.Op;
    const errorMsg = [];
    const fileName = Helpers.getOnlyFileName(__filename);

    if (!validator.isAlpha(req.body.firstname)) {
        errorMsg.push(ErrorMsg.firstnameFieldMsg);
    }

    if (!validator.isAlpha(req.body.lastname)) {
        errorMsg.push(ErrorMsg.lastnameFieldMsg);
    }

    if(!validator.isEmail(req.body.email)) {
        errorMsg.push(ErrorMsg.emailFieldMsg);
    }

    if (errorMsg.length > 0) {
        throw new RouteError(errorMsg.length, fileName, 38, errorMsg.join('&&'));
    }

    const partnerCount = await PartnerAccount.findAndCountAll({
        where: {
            user_id: userId,
            firstname: {
                [Op.iLike]: req.body.firstname
            },
            lastname: {
                [Op.iLike]: req.body.lastname
            },
            email: {
                [Op.iLike]: req.body.email
            },   
        }
    });

    if(partnerCount.count > 0) {
        throw new RouteError(1, fileName, 57, 'Istnieje juz osoba o takim imieniu, nazwisku i adresie email');
    }

    const partnerData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        street: req.body.street ? req.body.street : null,
        number: req.body.number ? req.body.number : null,
        local: req.body.local ? req.body.local : null,
        city: req.body.city ? req.body.city : null,
        country: req.body.country ? req.body.country : null,
        mobile: req.body.mobile ? req.body.mobile : null,
        email: req.body.email,
        bank_account: req.body.bank,
        is_active: 'false',
        is_deleted: 'false',
        deleted_date: null,
        created_at: Helpers.getTimestamp(),
        user_id: userId,
    };

    const partner = await PartnerAccount.create(partnerData);
    const response = {
        message: 'Parter successfully added',
        data: partner
    };
    
    res.status(201);
    res.send(response);
}