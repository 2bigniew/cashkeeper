const Sequalize = require('sequelize');
const con = require('../Connection/Connetion');
const UserAccount = require('./UserAccount');

const TemplateMail = con.define('TemplateMail', {
    template_id: { type: Sequalize.INTEGER, primaryKey: true },
    template_name: Sequalize.STRING,
    title: Sequalize.STRING,
    content: Sequalize.TEXT,
    end_line: Sequalize.STRING,
    is_default: Sequalize.BOOLEAN,
    user_id: {
        type: Sequalize.INTEGER,
        references: {
            model: UserAccount,
            key: 'user_id',
            deferrable: Sequalize.Deferrable.INITIALLY_IMMEDIATE
        }
    }
}, {
    tableName: 'template_mqil',
    createdAt: 'created_at',
    updatedAt: false,
    underscored: true
});

module.exports = TemplateMail;