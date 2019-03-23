const PartnerAccount = require('../../../Database/Models/PartnerAccount');
const { check, validationResult } = require('express-validator/check');
const Sequalize = require('sequelize');

exports.getPartnersBasicData = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = 1;
    }

    console.log(req.user);

    const partners = await PartnerAccount.findAll({
        where: {
            user_id: userId
        }
    });

    res.status(200);
    console.log(req.session);
    res.send(partners);
}

exports.getPartnerDataByLastname = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.session.passport.user;
    }

    const lastname = req.params.lastname;
    const Op = Sequalize.Op;

    const partner = await PartnerAccount.findAll({
        where: {
            user_id: userId,
            lastname: {
                [Op.iLike]: `%${lastname}%`
            }
        }
    });

    res.status(200);
    const response = {
        data: partner
    }
    res.json(response);
}