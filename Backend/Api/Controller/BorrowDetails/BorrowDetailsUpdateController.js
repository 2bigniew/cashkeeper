const BorrowDetails = require('../../../Database/Models/BorrowDetails');
const RouteError = require('../../../Helpers/Classes/RouteError');
const Helpers = require('../../../Helpers/Helpers');

exports.updateBorrow = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.session.passport.user;
    };

    const partnerId = req.body.partner;
    const borrowId = req.body.borrow;
    const errorMsg = [];
    const fileName = Helpers.getOnlyFileName(__filename);

    if(!partnerId) {
        errorMsg.push('Nie okreslono partnera! Musisz wybrac partnera z listy');
    }

    if(!borrowId) {
        errorMsg.push('Nie okreslono pozyczki! Musisz wybrac pozyczke z listy');
    }

    if(errorMsg.length > 0){
        throw new RouteError(errorMsg.length, fileName, 27, errorMsg.join('&&'));
    }

    const borrow = await BorrowDetails.findOne({
        where: {
            user_id: userId,
            partner_id: partnerId,
            borrow_id: borrowId
        }
    });

    borrow.is_completed = true;
    await borrow.save();

    res.status(200);
    const response = {
        message: 'Borrow updated successfully',
        data: borrow
    }
    res.json(response);
}