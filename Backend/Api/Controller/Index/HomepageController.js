const HomepageService = require('../../Service/Index/HomepageService');

exports.home = async(req, res, next) => {
    const quotes = await HomepageService.moneyQuotesRead.getAllQuotes();
    const responseData = { data: quotes };
    res.json( responseData );
};