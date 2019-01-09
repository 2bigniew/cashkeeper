const BorrowDetails = require('../../../Database/Models/BorrowDetails');
const PartnerAccount = require('../../../Database/Models/PartnerAccount');

const Sequalize = require('sequelize');

exports.getBorrowsDetailsData = async(req, res, next) => {
    const userId = req.session.passport.user;

    const borrows = await BorrowDetails.findAll({
        where: {
            user_id: userId
        }
    });

    res.send(borrows);
}

exports.getBorrowsForPartner = async(req, res, next) => {
    const userId = req.session.passport.user;
    const Op = Sequalize.Op;

    PartnerAccount.hasMany(BorrowDetails, {foreignKey: 'user_id'});
    BorrowDetails.belongsTo(PartnerAccount, {foreignKey: 'user_id'});

    const borrows = await BorrowDetails.findAll({
        where: {
            user_id: userId,
            purpose: {
                [Op.iLike]: `%${req.params.purpose}%`
            },
        }, 
        include: [{
            model: PartnerAccount,
            where: {
                firstname: {
                    [Op.iLike]: `%${req.params.firstname}%`
                },
                lastname: {
                    [Op.iLike]: `%${req.params.lastname}%`
                } 
            }
        }]
    });

    res.send(borrows);
}