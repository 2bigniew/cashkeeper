const LoanDetails = require('../../../Database/Models/LoanDetails');


exports.getLoanDetailsData = async(req, res, next) => {
    const userId = req.session.passport.user;

    const loans = await LoanDetails.findAll({
        where: {
            user_id: userId
        }
    });

    res.send(loans);
}