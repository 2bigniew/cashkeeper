const MoneyQuotes = require('../../../Database/Models/MoneyQuotes');

exports.getQuotes = async(req, res, next) => {
    const quotes = await MoneyQuotes.findAll();
<<<<<<< HEAD
    res.status(200);
    const data = {
        quotes: quotes
    };
=======
    const data = {
        quotes: quotes,
    }
    console.log(req.session);
    res.status(200)
>>>>>>> BACKENDv1
    res.json(data);
}
