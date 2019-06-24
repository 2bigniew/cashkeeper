const MoneyQuotes = require('../../../Database/Models/MoneyQuotes');   

class MoneyQuotesRead {
	constructor(MoneyQuotes){
		this.MoneyQuotes = MoneyQuotes;
		this.getAllQuotes = this.getAllQuotes.bind(this);
	}

	async getAllQuotes() {
		const quotes = await this.MoneyQuotes.findAll();
		const data = quotes.map( (q) => q.dataValues);
		return data;
	}
}

module.exports.moneyQuotesRead = new MoneyQuotesRead(MoneyQuotes);