const Sequalize = require('sequelize');
const con = require('../Connection/Connetion');
const UserAccount = require('./UserAccount');
const PartnerAccount = require('./PartnerAccount');
const TemplateSms = require('./TemplateSms');

const SmsMessages = con.define('SmsMessages', {
    sms_id: { type: Sequalize.INTEGER, primaryKey: true },
    sms_title: Sequalize.STRING,
    sms_content: Sequalize.TEXT,
    date_of_send: Sequalize.DATE,
    load_details_serials: Sequalize.TEXT,
    user_id: {
        type: Sequalize.INTEGER,
        references: {
            model: UserAccount,
            key: 'user_id',
            deferrable: Sequalize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    partner_id: {
        type: Sequalize.INTEGER,
        references: {
            model: PartnerAccount,
            key: 'partner_id',
            deferrable: Sequalize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    sms_template_id: {
        type: Sequalize.INTEGER,
        references: {
            model: TemplateSms,
            key: 'template_id',
            deferrable: Sequalize.Deferrable.INITIALLY_IMMEDIATE
        }
    }
}, {
    tableName: 'sms_messages',
    createdAt: 'created_at',
    updatedAt: false,
    underscored: true
});

module.exports = SmsMessages;