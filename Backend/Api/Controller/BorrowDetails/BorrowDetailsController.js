const BorrowDetails = require('../../../Database/Models/BorrowDetails');

exports.getBorrowsDetailsData = async(req, res, next) => {
    const userId = req.session.passport.user;

    const borrows = await BorrowDetails.findAll({
        where: {
            user_id: userId
        }
    });

    res.send(borrows);
}