const BorrowDetails = require('../../../Database/Models/BorrowDetails');

exports.deleteBorrow = async(req, res, next) => {
    const userId = req.session.passport.user;
    const partnerId = req.body.partner;
    const borrowId = req.body.borrow;

    const borrow = await BorrowDetails.findOne({
        where: {
            user_id: userId,
            partner_id: partnerId,
            borrow_id: borrowId
        }
    });

    await borrow.destroy();

    res.json(borrow);
}