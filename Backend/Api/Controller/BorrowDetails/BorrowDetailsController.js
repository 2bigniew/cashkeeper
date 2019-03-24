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
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.user.dataValues.user_id;
    }

    const borrows = await BorrowDetails.findAll({
        where: {
            user_id: userId
        }
    });

    res.status(200);
    const response = {
        data: borrows
    }
    res.json(response);
}

exports.getBorrowsForPartner = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.user.dataValues.user_id;
    }
    
    const Op = Sequalize.Op;

    PartnerAccount.hasMany(BorrowDetails, {foreignKey: 'partner_id'});
    BorrowDetails.belongsTo(PartnerAccount, {foreignKey: 'partner_id'});

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

    res.status(200);
    const response = {
        data: borrows
    }
    res.json(response);
}

exports.getBorrowsForPartnerByDate = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.user.dataValues.user_id;
    }

    const Op = Sequalize.Op;

    PartnerAccount.hasMany(BorrowDetails, {foreignKey: 'partner_id'});
    BorrowDetails.belongsTo(PartnerAccount, {foreignKey: 'partner_id'});
    const dateFrom = req.query['date-from'] ? req.query['date-from'] : req.user.created_at;
    const dateTo = req.query['date-to']? req.query['date-to'] : Helpers.getTimestamp();
    
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

    res.status(200);
    const response = {
        data: borrows
    }
    res.json(response);
}

exports.getSumOfAll = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.user.dataValues.user_id;
    }

    const borrowsSum = await BorrowDetails.sum('value', {
        where: {
            user_id: userId
        }
    });

    res.status(200);
    const response = {
        data: borrowsSum
    }
    res.json(response);
}