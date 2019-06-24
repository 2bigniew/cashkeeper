const PartnerAccount = require('../../../Database/Models/PartnerAccount');
const Sequalize = require('sequelize');

class PartnerRead {
	constructor(PartnerAccount, Sequalize) {
		this.partnerAccount = PartnerAccount;
		this.sq = Sequalize;

		this.getAllPartnersData = this.getAllPartnersData.bind(this);
		this.getPartnersByLastname = this.getPartnersByLastname.bind(this);
		this.getPartnerById = this.getPartnerById.bind(this);
		this.getPartnerCount = this.getPartnerCount.bind(this);
	}

	async getAllPartnersData(userId) {
		const partners = await this.partnerAccount.findAll({
	        where: {
	            user_id: userId
	        }
	    });
	    return partners;
	}

	async getPartnersByLastname(userId, lastname) {
		const Op = this.sq.Op;
	    const partners = await this.partnerAccount.findAll({
	        where: {
	            user_id: userId,
	            lastname: {
	                [Op.iLike]: `%${lastname}%`
	            }
	        }
	    });
	    return partners;
	}

	async getPartnerById( partnerId ) {
		const partner = await this.partnerAccount.findByPk(partnerId);
		return partner;
	}

	async getPartnerCount(userId, firstname, lastname, email) {
		const Op = this.sq.Op;
		const partnerCount = await this.partnerAccount.findAndCountAll({
	        where: {
	            user_id: userId,
	            firstname: { [Op.iLike]: firstname },
	            lastname: { [Op.iLike]: lastname },
	            email: { [Op.iLike]: email },   
	        }
	    });
	    return partnerCount;
	}
}

module.exports.partnerRead = new PartnerRead(PartnerAccount, Sequalize);