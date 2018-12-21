const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const con = require('./Database/Connection/Connetion');

const indexRouter = require('./Api/Routing/Index/index');

const app = express();

// Middlware **********************************************************
app.use('/static', express.static(path.join(__dirname + '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(flash());
app.use(session({
    secret: 'Keep yout cash',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));

con.authenticate()
    .then(() => {
        console.log('Connection has been established successfully');
    })
    .catch(( err ) => {
        console.error('Unable to connect to the database:', err);
    });

//Routes **************************************************************
app.use('/', indexRouter);

module.exports = app; 