const validator = require('validator');
const Helpers = require('../../../Helpers/Helpers');
const RouteError = require('../../../Helpers/Classes/RouteError');
const ErrorMsg = Helpers.errorMsg;
const PartnerReadService = require('../../Service/Partner/PartnerReadService');
const PartnerCreateService = require('../../Service/Partner/PartnerCreateService');
<<<<<<< HEAD
const PartnerAccount = require('../../../Database/Models/PartnerAccount');
const Sequalize = require('sequelize');

const partnerRead = new PartnerReadService(PartnerAccount, Sequalize);
const partnerCreate = new PartnerCreateService(PartnerAccount, Sequalize);
=======
>>>>>>> e7222b59ca60091f42a7c038bee7c0e78cce189b

exports.createPartnerAccount = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.user.dataValues.user_id;
    }
    const errorMsg = [];
    const fileName = Helpers.getOnlyFileName(__filename);
    if (!validator.isAlpha(req.body.firstname)) errorMsg.push(ErrorMsg.firstnameFieldMsg); 
    if (!validator.isAlpha(req.body.lastname)) errorMsg.push(ErrorMsg.lastnameFieldMsg);
    if (!validator.isEmail(req.body.email)) errorMsg.push(ErrorMsg.emailFieldMsg);
    if (errorMsg.length > 0) throw new RouteError(errorMsg.length, fileName, 38, errorMsg.join('&&'));
    const firstname = req.body.firstname, lastname = req.body.lastname, email = req.body.email;
<<<<<<< HEAD
    const partnerCount = await partnerRead.getPartnerCount(userId, firstname, lastname, email);
    
=======
    const partnerCount = await PartnerReadService.partnerRead.getPartnerCount(userId, firstname, lastname, email);

>>>>>>> e7222b59ca60091f42a7c038bee7c0e78cce189b
    if(partnerCount.count > 0) {
        throw new RouteError(1, fileName, 57, 'Istnieje juz osoba o takim imieniu, nazwisku i adresie email');
    }

    const partnerData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        street: req.body.street ? req.body.street : null,
        number: req.body.number ? req.body.number : null,
        local: req.body.local ? req.body.local : null,
        city: req.body.city ? req.body.city : null,
        country: req.body.country ? req.body.country : null,
        mobile: req.body.mobile ? req.body.mobile : null,
        email: req.body.email,
        bank_account: req.body.bank,
        is_active: 'false',
        is_deleted: 'false',
        deleted_date: null,
        created_at: Helpers.getTimestamp(),
        user_id: userId,
    };
<<<<<<< HEAD
    const partner = await partnerCreate.handlePartnerCreate(partnerData);
=======
    const partner = PartnerCreateService.partnerCreate.handlePartnerCreate(partnerData);
>>>>>>> e7222b59ca60091f42a7c038bee7c0e78cce189b
    const response = {
        message: 'Parter successfully added',
        data: partner
    };
    
    res.status(201);
    res.json(response);
}