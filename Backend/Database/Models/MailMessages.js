const Sequalize = require('sequelize');
const con = require('../Connection/Connetion');
const UserAccount = require('./UserAccount');
const PartnerAccount = require('./PartnerAccount');
const TemplateMail = require('./TemplateMail');

const MailMessages = con.define('MailMessages', {
    mail_id: { type: Sequalize.INTEGER, primaryKey: true },
    mail_title: Sequalize.STRING,
    mail_content: Sequalize.TEXT,
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
    mail_template_id: {
        type: Sequalize.INTEGER,
        references: {
            model: TemplateMail,
            key: 'template_id',
            deferrable: Sequalize.Deferrable.INITIALLY_IMMEDIATE
        }
    }
}, {
    tableName: 'mail_messages',
    createdAt: 'created_at',
    updatedAt: false,
    underscored: true
});

module.exports = MailMessages;