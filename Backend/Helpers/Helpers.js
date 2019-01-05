exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()){
        next();
    } else {
        res.redirect('/home');
    };
};

exports.shouldShowLoginOrCreateAccout = (req, res, next) => {
    if (!req.isAuthenticated()){
        next();
    } else {
        res.redirect('/home');
    };
};

exports.errorMsg = {
    firstnameFieldMsg: 'Nieprawidlowy znak. Pole imie powinno zawierac jedynie litery',
    lastnameFieldMsg: 'Nieprawidlowy znak. Pole nazwisko powinno zawierac jedynie litery',
    emailFieldMsg: 'Blad w adresie email. Adres email powinien wygladac w nastepujacy sposob: \"prawidlowy@email.com\"',
    notMinMsg: (fieldname, min) => `Pole \"${fieldname}\" powinnno skladac sie z minimum ${min} znakow`,
    notMaxMsg: (fieldname, max) => `Pole \"${fieldname}\" powinnno skladac sie z maksymalnie ${max} znakow`
};

exports.getTimestamp = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? '0'+(date.getMonth() + 1) : date.getMonth() + 1;
    const day = date.getDate() < 10 ? '0'+date.getDate() : date.getDate(); 
    const hours = date.getHours() < 10 ? '0'+date.getHours() : date.getHours(); 
    const minutes = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes(); 
    const seconds = date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds(); 
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// exports.isName = (char, fieldname) => {
//     const regExpIn = /^[A-Z]{1}[a-z]{1,254}$/;
//     const isName = regExpIn.test(char);
//     return {
//         isName: isName,
//         msg: isName ? 'Ok' : `Pole \"${fieldname}\" powinno skladac sie wylacznie z liter, pierwszej wielkiej i reszty malych np: \"Zbigniew\"`
//     }
// }

// exports.isAlphaNumeric = (char, fieldname) => {
//     const regExpIan =  /^[a-zA-Z0-9]{1,}$/;
//     const isAlphaNum = regExpIan.test(char);
//     return {
//         isAlphaNum: isAlphaNum,
//         msg: isAlphaNum ? 'Ok' : `Pole \"${fieldname}\" powinnno skladac sie wylacznie z malych i wielkich liter oraz cyfr`
//     }
// };

// exports.isEmail = (mail) => {
//     const regExpIe = /^\S+@\S+\.+[a-z]{1,}$/;
//     const isEmail = regExpIe.test(mail);
//     return {
//         isEmail: isEmail,
//         msg: isEmail ? 'Ok' : 'Prosze popraw swoj adres email. Prawidlowy email, powinien wygladac w nastepujacy sposob: \"prawidlowy@email.com\"'
//     }
// }

// exports.isMinLength = (char, min, fieldname) => {
//     const isMin = char >= min;
//     return {
//         isMin: isMin,
//         msg: isMin ? 'Ok' : `Pole \"${fieldname}\" powinnno skladac sie z minimum ${min} znakow`
//     };
// };

// exports.isMaxLength = (char, max, fieldname) => {
//     const isMax = char <= max;
//     return {
//         isMax: isMax,
//         msg: isMax ? 'Ok' : `Pole \"${fieldname}\" powinnno skladac sie z maksymalnie ${max} znakow`
//     };
// };

