require('dotenv').config({ path: './Config/.env' });

const express = require('express');
const passport   = require('passport');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const con = require('./Database/Connection/Connetion');

const indexRouter = require('./Api/Routing/Index/index');
const authRouter = require('./Api/Routing/Auth/auth');

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
    cookie: {
        userId: null,
        loggedIn: false
    }
}));
app.use(passport.initialize());
app.use(passport.session())

con.authenticate()
    .then(() => {
        console.log('Connection has been established successfully');
    })
    .catch(( err ) => {
        console.error('Unable to connect to the database:', err);
    });

//Routes **************************************************************

app.use('/home', indexRouter);
app.use('/', authRouter);

//Models **************************************************************

const UserAccount = require('./Database/Models/UserAccount');

//Passport Strategies *************************************************

require('./Passport/localCreateAccount')(passport, UserAccount);
require('./Passport/localLogIn')(passport, UserAccount);

module.exports = app; 