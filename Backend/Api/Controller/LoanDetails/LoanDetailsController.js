const LoanDetails = require('../../../Database/Models/LoanDetails');
const PartnerAccount = require('../../../Database/Models/PartnerAccount');
const Helpers = require('../../../Helpers/Helpers');

const Sequalize = require('sequelize');

exports.getLoansForPartnerForm = (req, res, next) => {
    res.render('getLoans.ejs');
}

exports.getLoansForPartnerByDateForm = (req, res, next) => {
    res.render('getLoansByDate.ejs');
}

exports.getLoanDetailsData = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.user.dataValues.user_id;
    }

    const loans = await LoanDetails.findAll({
        where: {
            user_id: userId
        }
    });

    res.status(200);
    const response = {
        data: loans
    }
    res.json(response);
}

exports.getLoansForPartner = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.user.dataValues.user_id;
    };

    const Op = Sequalize.Op;

    PartnerAccount.hasMany(LoanDetails, {foreignKey: 'partner_id'});
    LoanDetails.belongsTo(PartnerAccount, {foreignKey: 'partner_id'});

    const loans = await LoanDetails.findAll({
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
        data: loans
    }
    res.json(response);
}

exports.getLoansForPartnerByDate = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.user.dataValues.user_id;
    };

    const Op = Sequalize.Op;

    PartnerAccount.hasMany(LoanDetails, {foreignKey: 'partner_id'});
    LoanDetails.belongsTo(PartnerAccount, {foreignKey: 'partner_id'});
    const dateFrom = req.query['date-from'] ? req.query['date-from'] : req.user.created_at;
    const dateTo = req.query['date-to']? req.query['date-to'] : Helpers.getTimestamp();

    const loans = await LoanDetails.findAll({
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
        data: loans
    }
    res.json(response);
}

exports.getSumOfAll = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.user.dataValues.user_id;
    };

    const loanSum = await LoanDetails.sum('value', {
        where: {
            user_id: userId
        }
    });

    res.status(200);
    const response = {
        data: loanSum
    }
    res.json(response);
}