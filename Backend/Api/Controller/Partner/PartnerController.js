const PartnerAccount = require('../../../Database/Models/PartnerAccount');
const { check, validationResult } = require('express-validator/check');
const Sequalize = require('sequelize');

exports.getPartnersBasicData = async(req, res, next) => {
    const userId = req.session.passport.user;

    const partners = await PartnerAccount.findAll({
        where: {
            user_id: userId
        }
    });

    res.send(partners);
}

exports.getPartnerDataByLastname = async(req, res, next) => {
    const userId = req.session.passport.user;
    const lastname = req.params.lastname;
    const Op = Sequalize.Op;

    // if(!check(lastname).isAlpha) {
    //     // return err; uzyc jako middleware
    // }

    //console.log(check(lastname).isAlpha());
    const partner = await PartnerAccount.findAll({
        where: {
            user_id: userId,
            lastname: {
                [Op.iLike]: `%${lastname}%`
            }
        }
    });

    res.send(partner);
}