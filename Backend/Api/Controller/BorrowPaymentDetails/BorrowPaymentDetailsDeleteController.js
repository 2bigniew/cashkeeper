const BorrowPaymentDetails = require('../../../Database/Models/BorrowPaymentDetails');
const RouteError = require('../../../Helpers/Classes/RouteError');
const Helpers = require('../../../Helpers/Helpers');

exports.deleteBorrowPaymentDetails = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.user.dataValues.user_id;
    }

    const borrowPaymentId = req.body.borrowPayment;
    const fileName = Helpers.getOnlyFileName(__filename);

    if(!borrowPaymentId) {
        throw new RouteError(1, fileName, 17, 'Nie okreslono platnosci! Musisz wybrac platnosc z listy');
    }

    const borrowPayment = await BorrowPaymentDetails.findOne({
        where: {
            user_id: userId,
            borrow_payment_details_id: borrowPaymentId
        }
    });

    await borrowPayment.destroy();

    res.status(200);
    const response = {
        message: 'Borrow payment deleted successfully',
        data: borrowPayment
    }
    res.json(response);
}