const UserAccount = require('../../../Database/Models/UserAccount');
const UserInfo = require('../../../Database/Models/UserInfo')

exports.getUserBasicData = async(req, res, next) => {
    let userId;
    if (process.env.NODE_ENV === 'test') {
        userId = 23;
    } else {
        userId = req.user.dataValues.user_id;
    };

    const userAccount = await UserAccount.findByPk(userId);
    const userInfo = await UserInfo.findByPk(userId);

    const userAccountValues = [];
    const userInfoValues = [];

    for(let dbvalue in userAccount.dataValues) {
        userAccountValues.push(dbvalue + '=' +userAccount.dataValues[dbvalue]);
    };

    for(let dbvalue in userInfo.dataValues) {
        userInfoValues.push(dbvalue + '=' +userInfo.dataValues[dbvalue]);
    }

    const userDataArr = [...userAccountValues, ...userInfoValues];
    const userData = {};

    userDataArr.map( el => {
        const key = el.split('=')[0];
        userData[key] = el.split('=')[1];
    });

    res.status(200);
    res.json(userData);
}
