const MoneyQuotes = require('../../../Database/Models/MoneyQuotes');

exports.getQuotes = async(req, res, next) => {
    const quotes = await MoneyQuotes.findAll();
    res.send(quotes);
}