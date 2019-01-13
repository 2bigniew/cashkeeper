const BorrowDetails = require('../../../Database/Models/BorrowDetails');

exports.updateBorrow = async(req, res, next) => {
    const userId = req.session.passport.user;
    const partnerId = req.body.partner;
    const borrowId = req.body.serial;

    const borrow = await BorrowDetails.findOne({
        where: {
            user_id: userId,
            partner_id: partnerId,
            borrow_id: borrowId
        }
    });

    borrow.is_completed = true;
    await borrow.save();

    res.json(borrow);
}