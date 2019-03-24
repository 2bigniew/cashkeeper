const PartnerAccount = require('../../../Database/Models/PartnerAccount');

exports.deletePartnerForm = (req, res, next) => {
    res.render('deletePartner.ejs');
}

exports.deletePartner = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.user.dataValues.user_id;
    };
    
    const partnerId = req.body.partnerid;

    const partner = await PartnerAccount.findOne({
        where: {
            user_id: userId,
            partner_id: partnerId
        }
    });

    partner.destroy();

    res.status(200);
    const response = {
        message: 'Partner deleted successfully',
        data: partner
    }
    res.json(response);
}

// destroy seq:
/*
function destroyParnerData(partner_id){
    1. usunięcie paymentów
    2. usunięcie loan i borrow
    3. usunięcie partnera
}
*/