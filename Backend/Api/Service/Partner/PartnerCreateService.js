const PartnerAccount = require('../../../Database/Models/PartnerAccount');
const Sequalize = require('sequelize');

class PartnerCreate {
	constructor(PartnerAccount, Sequalize) {
		this.partnerAccount = PartnerAccount;
		this.sq = Sequalize;

		this.handlePartnerCreate = this.handlePartnerCreate.bind(this);
	}

	async handlePartnerCreate(partnerData) {
		const partner = await this.partnerAccount.create(partnerData);
		return partner;
	}
}

module.exports.partnerCreate = new PartnerCreate(PartnerAccount, Sequalize);