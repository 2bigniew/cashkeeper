require('dotenv').config({ path: './Config/.env' });

const express = require('express');
const passport   = require('passport');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cors = require('cors');
const corsConfig = require('./Config/corsConfig');
const con = require('./Database/Connection/Connetion');

const ErrorsHandler = require('./Api/Middleware/error');
const IndexRouter = require('./Api/Routing/Index/index');
const AuthRouter = require('./Api/Routing/Auth/auth');
const UserRouter = require('./Api/Routing/BasicData/User');
const PartnerRouter = require('./Api/Routing/BasicData/Partner');
const MoneyQuotesRouter = require('./Api/Routing/BasicData/MoneyQuotes');
const LoanDetailsRouter = require('./Api/Routing/BasicData/LoanDetails');
const LoanPaymentsDetailsRouter = require('./Api/Routing/BasicData/LoanPaymentDetails');
const BorrowDetailsRouter = require('./Api/Routing/BasicData/BorrowDetails');
const BorrowPaymentsDetailsRouter = require('./Api/Routing/BasicData/BorrowPaymentDetails');

const app = express();
app.set('view engine', 'ejs');

// Middlware **********************************************************

app.use('/static', express.static(path.join(__dirname + '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(flash());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));

app.use(passport.initialize());
app.use(passport.session());
// app.use(cors(corsConfig));
app.use((req, res, next) => {
    res.setHeader('origin', 'http://127.0.0.1:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('preflightContinue', false);
    res.setHeader('Accept-Charset', 'utf-8, iso-8859-13');
    res.setHeader('Accept-Language', 'pl, en-us');
    res.setHeader('Content-Language', 'en, pl');
    next();
});

// con.authenticate()
//     .then(() => {
//         console.log('Connection has been established successfully');
//     })
//     .catch(( err ) => {
//         console.error('Unable to connect to the database:', err);
//     });

//Routes **************************************************************

app.get('/', (req, res, next) => res.redirect('/home'));
app.use('/home', IndexRouter);
app.use('/', AuthRouter);
app.use('/user', UserRouter);
app.use('/partner', PartnerRouter);
app.use('/quotes', MoneyQuotesRouter);
app.use('/loan', LoanDetailsRouter);
app.use('/loan-payment', LoanPaymentsDetailsRouter);
app.use('/borrow', BorrowDetailsRouter);
app.use('/borrow-payment', BorrowPaymentsDetailsRouter);

//Errors **************************************************************

app.use(ErrorsHandler.notFound);
app.use(ErrorsHandler.catchErrors);

//Models **************************************************************

const UserAccount = require('./Database/Models/UserAccount');

//Passport Strategies *************************************************

require('./Passport/localCreateAccount')(passport, UserAccount);
require('./Passport/localLogIn')(passport, UserAccount);

// do testow:
// wszystkie akcje typu get zapisuja rezultat do pliku, 
// takze po skonconych testach mamy 1 wielki plik dla wszystkich akcji,
// z informacja czy test sie udal, oraz jakie wyniki zostaly zwrocone
// skorzystac z fs

module.exports = app; 