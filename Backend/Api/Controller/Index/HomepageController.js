const MoneyQuotes = require('../../../Database/Models/MoneyQuotes');

exports.home = async(req, res, next) => {
    const quotes = await MoneyQuotes.findAll();
    const userLogin = req.flash('user-login');
    const flashMessage = req.flash('user-message');
    const responseData = {
        login: userLogin,
        message: flashMessage,
        data: quotes
    };
    res.json( responseData );
};