const MoneyQuotes = require('../../../Database/Models/MoneyQuotes');

exports.getQuotes = async(req, res, next) => {
    const quotes = await MoneyQuotes.findAll();
    const data = {
        quotes: quotes,
    }
    res.status(200)
    res.json(data);
}
