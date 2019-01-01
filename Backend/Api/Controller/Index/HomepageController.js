const Sequalize = require('sequelize');
const PartnerAccount = require('../../../Database/Models/PartnerAccount');

exports.home = async(req, res, next) => {
    console.log(req.session);
    const partners = await PartnerAccount.findAll();
    res.send( partners );
};

// napisac obsluge bledow w prawidlowy sposob!!!

// exports.home = (req, res, next) => {
//     PartnerAccount.findAll()
//     .then( partners => {
//         res.send( partners );
//     })
//     .catch(( err => {
//         console.error( 'Error: ' + err );
//     } ));
// };
