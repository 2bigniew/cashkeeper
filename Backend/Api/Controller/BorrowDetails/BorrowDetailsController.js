const BorrowDetails = require('../../../Database/Models/BorrowDetails');
const PartnerAccount = require('../../../Database/Models/PartnerAccount');
const Helpers = require('../../../Helpers/Helpers');

const Sequalize = require('sequelize');

exports.getBorrowsForPartnerForm = (req, res, next) => {
    res.render('getBorrows.ejs');
}

exports.getBorrowsForPartnerByDateForm = (req, res, next) => {
    res.render('getBorrowsByDate.ejs');
}

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
                [Op.iLike]: `%${req.query.purpose}%`
            },
        }, 
        include: [{
            model: PartnerAccount,
            where: {
                firstname: {
                    [Op.iLike]: `%${req.query.firstname}%`
                },
                lastname: {
                    [Op.iLike]: `%${req.query.lastname}%`
                } 
            }
        }]
    });

    res.send(borrows);
}

exports.getBorrowsForPartnerByDate = async(req, res, next) => {
    const userId = req.session.passport.user;
    const Op = Sequalize.Op;

    PartnerAccount.hasMany(BorrowDetails, {foreignKey: 'partner_id'});
    BorrowDetails.belongsTo(PartnerAccount, {foreignKey: 'partner_id'});
    const dateFrom = req.query['date-from'] ? req.query['date-from'] : req.user.created_at;
    const dateTo = req.query['date-to']? req.query['date-to'] : Helpers.getTimestamp();
    console.log(dateFrom);
    console.log(dateTo);

    const borrows = await BorrowDetails.findAll({
        where: {
            user_id: userId,
            created_at: {
                [Op.gte]: dateFrom,
                [Op.lte]: dateTo
            },
        },
        include: [{
            model: PartnerAccount,
            where: {
                firstname: {
                    [Op.iLike]: `%${req.query.firstname}%`
                },
                lastname: {
                    [Op.iLike]: `%${req.query.lastname}%`
                } 
            }
        }]
    });

    res.send(borrows);
}

exports.getSumOfAll = async(req, res, next) => {
    const userId = req.session.passport.user;

    const borrowsSum = await BorrowDetails.sum('value', {
        where: {
            user_id: userId
        }
    });

    res.json(borrowsSum);
}