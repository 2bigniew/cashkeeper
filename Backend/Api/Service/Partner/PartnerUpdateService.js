const PartnerAccount = require('../../../Database/Models/PartnerAccount');
const Sequalize = require('sequelize');

class PartnerUpdate {
	constructor(PartnerAccount, Sequalize) {
		this.partnerAccount = PartnerAccount;
		this.sq = Sequalize;

		this.handlePartnerUpdate = this.handlePartnerUpdate.bind(this);
	}

	async handlePartnerUpdate(partnerData) {
		const partner = await this.partnerAccount.create(partnerData);
		return partner;
	}
}

module.exports.partnerUpdate = new PartnerUpdate(PartnerAccount, Sequalize);