const Sequalize = require('sequelize');
const PartnerAccount = require('../../../Database/Models/PartnerAccount');

exports.home = (req, res, next) => {
    PartnerAccount.findAll()
    .then( partners => {
        res.send( partners );
    })
    .catch(( err => {
        console.error( 'Error: ' + err );
    } ));
};
